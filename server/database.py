from dotenv import load_dotenv
import mysql.connector
import os
import datetime
from random import randrange

load_dotenv()

def clean_database():
    print("CLEANING DATABASE")
    try:
        
        conn = get_connection()
        with conn.cursor() as cursor:
            now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            delete_sql = """
                DELETE FROM food_options
                WHERE time_expires IS NOT NULL AND time_expires < %s
            """

            cursor.execute(delete_sql, (now, ))
            conn.commit()
        conn.close()

        print("Cleaning database completed at ", now)

    except Exception as e:
        conn.close()
        print("Cleaning failed due to : ", e)

def run_sql():
    conn = get_connection()

    with conn.cursor() as cursor:
        sql = ""
        cursor.execute(sql)
        results = cursor.fetchall()

        print(results)

def get_connection():
    try:
        conn = mysql.connector.connect(
            host= os.environ['DB_HOST'],
            user= os.environ['DB_USER'],
            passwd= os.environ['PASSWORD'],
            database= os.environ['DATABASE'],
        )
    except Exception as ex:
        print("Database connection failed due to {}".format(ex))

    return conn

def get_by_id(id):
    conn = get_connection()

    with conn.cursor() as cursor:
        message = "SELECT * FROM food_options WHERE id={}".format(id)

        cursor.execute(message)
        results = cursor.fetchall()
    
    return results

def can_edit(id, editing_email):
    if editing_email == os.environ['ADMIN_EMAIL']:
        return True
    
    conn = get_connection()

    with conn.cursor() as cursor:
        sql = "SELECT * FROM food_options WHERE id={}".format(id)

        cursor.execute(sql)
        results = cursor.fetchall()
        added_by = results[0][13]

    conn.close()

    if added_by == editing_email:
        return True
    else:
        return False

def add(
    title: str,
    location: str,
    time_added: datetime,
    time_expires: datetime,
    message: str,
    provider: str,
    vegetarian: bool,
    vegan: bool,
    pescatarian: bool,
    gluten_free: bool,
    number_meals: int,
    meals_claimed: int,
    added_by_user: str,
    continuous: bool
):
    conn = get_connection()

    try:
        with conn.cursor() as cursor:
            exists = True

            print("got here")

            while(exists == True):
                id = randrange(100000, 1000000)

                if (get_by_id(id) == []):
                    exists = False

            sql = """
            INSERT INTO food_options (id, title, location, time_added, time_expires, message, 
            provider, vegetarian, vegan, pescatarian, gluten_free, number_meals, 
            meals_claimed, added_by_user, continuous) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """

            new_time_added = None
            new_time_expires = None

            if(time_added != None and time_expires != None):
                new_time_added = datetime.datetime.fromisoformat(time_added.replace("Z", "+00:00"))
                new_time_expires = datetime.datetime.fromisoformat(time_expires.replace("Z", "+00:00"))
           
            # if time_expires != None:
            #     expire_time = time_added + datetime.timedelta(minutes=time_expires)
            # else:
            #     expire_time = time_expires
            values = (id, title, location, new_time_added, new_time_expires, message, provider, vegetarian, vegan, pescatarian, gluten_free, number_meals, meals_claimed, added_by_user, continuous)
            cursor.execute(sql, values)
            conn.commit()
            conn.close()
            return ("success", id)
    except Exception as e:
            conn.close()
            print("Failure with exception : ", e)
            return ("failure", e)

def edit(id, change_column, new_value): 
    sql = f"UPDATE food_options SET {change_column} = %s WHERE id = %s"
    conn = get_connection()

    try:
        with conn.cursor() as cursor:
            cursor.execute(sql, [new_value, id])
            conn.commit()

            conn.close()

            return ("success", id)
    
    except Exception as e:
        conn.close()
        print("Failure with exception : ", e)
        return ("failure", str(e))

def delete(delete_id):
    sql = "DELETE FROM food_options WHERE id=%s"
    conn = get_connection()

    try:
        with conn.cursor() as cursor:
            cursor.execute(sql, [delete_id])
            conn.commit()

            results = cursor.fetchall()

            conn.close()

            return ("success", delete_id)
        
    except Exception as e:
        conn.close()
        print("Failure with exception : ", e)
        return ("failure", e)

def isContinuous(id):
    results = get_by_id(id)
    results = results[0]
    return bool(results[14])

def get_options(queries):
    conn = get_connection()

    with conn.cursor() as cursor:
        formated_results = []
        sql = "SELECT * FROM food_options"
        values = []

        if queries != []:
            sql += ' WHERE '
            for index in range(len(queries)):
                print(index)
                # Need to incorporate wildcards
                sql += '(id LIKE %s OR '
                sql += 'title LIKE %s OR '
                sql += 'location LIKE %s OR '
                sql += 'time_added LIKE %s OR '
                sql += 'time_expires LIKE %s OR '
                sql += 'message LIKE %s OR '
                sql += 'provider LIKE %s OR '
                sql += 'vegetarian LIKE %s OR '
                sql += 'vegan LIKE %s OR '
                sql += 'pescatarian LIKE %s OR '
                sql += 'gluten_free LIKE %s OR '
                sql += 'number_meals LIKE %s OR '
                sql += 'meals_claimed LIKE %s OR '
                sql += 'added_by_user LIKE %s OR '
                sql += 'continuous LIKE %s)'

                values.extend([queries[index], queries[index], queries[index], queries[index], queries[index], queries[index], queries[index], queries[index], queries[index], queries[index], queries[index], queries[index], queries[index], queries[index], queries[index]])
                if index < len(queries) - 1:
                    sql += " AND "

        print(sql, values)
        cursor.execute(sql, values)
        results = cursor.fetchall()

        for result in results:
            new_dict = {
                "id":result[0],
                "title": result[1],
                "location":result[2],
                "time_added":result[3],
                "time_expires":result[4],
                "message":result[5],
                "provider":result[6],
                "vegetarian":bool(result[7]),
                "vegan":bool(result[8]),
                "pescatarian":bool(result[9]),
                "gluten_free":bool(result[10]),
                "number_meals":result[11],
                "meals_claimed":result[12],
                "added_by_user":result[13],
                "continuous":bool(result[14]),
                "photo_links":result[15]
            }
            formated_results.append(new_dict)

    conn.close()

    print(formated_results)

    return formated_results

def claim_meal(id):
    conn = get_connection()

    # old_value = get_by_id(id)
    # old_value = old_value[12]

    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM food_options WHERE id=%s;", [id])
        results = cursor.fetchall()

        conn.close()

        return edit(id, "meals_claimed", results[0][12] + 1)

if __name__ == "__main__":
#     add(
#         "test1",
#         "my house",
#         datetime.datetime.now(),
#         120,
#         "one piece is awesome Allow me to introduce you, thank you, at ease, anti-doflamingo coop. There's no way we'll lose the battle now",
#         "Bartolomeo the Cannibal",
#         False,
#         False,
#         False,
#         False,
#         40,
#         4,
#         "asparks@princeton.edu",
#         False
#     )
    # ids = [752902, 465354, 557188, 641908, 786218, 582548, 873207, 666359, 837465, 965691, 214625, 232047, 720211]
    # for id in ids:
    #     delete(id)
    print(isContinuous(185812))
    print(isContinuous(123456))
    print(isContinuous(537652))
    print(isContinuous(688791))