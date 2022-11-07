import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons"
import { Center, Icon, Text } from "native-base";
import Logo from "../assets/logo.svg"
import { useAuth } from "../hooks/useAuth";

export function Signin(){
  const { signIn, user } = useAuth();

  console.log('DADOS DO USUÁRIO', user)

  return (
    <Center flex={1} bgColor="gray.900">
      <Logo width={212} height={40} />
      
      <Button 
        type="SECONDARY"
        title="ENTRAR COM O GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        onPress={signIn}
      />

      <Text
        color="white"
        textAlign="center"
        mt={4}
      >
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}