import { GoogleSignin, statusCodes } from
    '@react-native-google-signin/google-signin';
import * as SecureStorage from "expo-secure-store"
import { Pressable, Text } from 'react-native'
import stylesheet from './styles';

type LoginButtonProps = {
    user: string;
    setUser: (user: string) => void;
}

export default function LoginButton({
    user,
    setUser
}: LoginButtonProps) {
    const signOut = async() => {
      await GoogleSignin.signOut();
      setUser("")
      await SecureStorage.setItemAsync("user", "")
      console.log("user after signOut: ", user)
    }

    const signIn = async () => {
          try {
    
              await GoogleSignin.hasPlayServices();
              const sign_in_data = await GoogleSignin.signIn();
              const allInfo = sign_in_data["data"]
    
              const userInfo = (allInfo == null) ? null : allInfo["user"]["email"]
              setUser(userInfo == null ? "" : userInfo)

              await SecureStorage.setItemAsync("user", user)
              
              // signOut()
          } catch (error) {
    
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
                  // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                  console.log(error)
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                  console.log(error)
              } else {
                  console.log(error)
              }
          }
    
      };

      return (
        <Pressable style={[stylesheet.buttons,
            {
                justifyContent: 'center',
                backgroundColor: '#33691E',
                marginTop: 25,
                alignItems: 'center',
            }
        ]}
                onPress={() => {
                  if (user) {
                    signOut();
                    console.log('Signing out...');
                  } else {
                    signIn();
                    console.log('Signing in...');
                  }
                  }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        {user ? 'Sign Out' : 'Sign In with Google'}
                    </Text>
        </Pressable>
      )
}