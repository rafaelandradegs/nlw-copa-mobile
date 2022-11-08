import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { FlatList, Icon, useToast, VStack } from "native-base";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { Loading } from "../components/Loading";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useCallback, useState } from "react";
import {Octicons} from "@expo/vector-icons"
import { api } from "../services/api";

export function Pools(){
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<PoolCardProps[]>([])
  const { navigate } = useNavigation();
  const toast = useToast()

  async function fetchPools(){
    try {
      setIsLoading(true);
      const response = await api.get('pools');
      setPools(response.data.pools);

    } catch (error) {
      console.log(error);
      
      toast.show({
        title: 'Não foi possivel carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
      
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools()
  }, []))
  
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões"/>

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button 
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md"/>}
          onPress={() => navigate('find')}
        />
      </VStack>

      {isLoading 
        ? <Loading /> 
        : <FlatList 
          data={pools}
          keyExtractor={item => item.id}
          renderItem={({item}) => <PoolCard data={item} />}
          ListEmptyComponent={() => <EmptyPoolList />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          px={5}
        />
      }      
    </VStack>
  )
}