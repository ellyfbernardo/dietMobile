import { View, Text, StyleSheet, Pressable, ScrollView, Share } from 'react-native';
import { useDataStore } from '@/store/data';
import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { colors } from '@/constants/colors';
import { Data } from '@/types/data';
import { Link, router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';


interface ResponseData{
     data: Data;
}

export default function Nutrition() {

     const user = useDataStore(state => state.user)

     const {data, isFetching, error} = useQuery({
          queryKey: ['nutrition'],
          queryFn: async () => {
                try{
                    if(!user){
                         throw new Error("Filed load nutrition")
                    }

                    const response = await api.post<ResponseData>('/create', {
                         name: user.name,
                         age: user.age,
                         gender: user.gender,
                         height: user.height,
                         weight: user.weight,
                         level: user.level,
                         objective: user.objective
                       });

               
                         return response.data.data;

                }catch(err){
                    console.log(err)
 
                }
          
     }});

     async function handleShare(){
          try{
               if(data && Object.keys(data).length === 0) return;

               const supplements = `${data?.suplementos.map( item =>` ${item}`)}`;

               // const foods = `${data?.refeicoes.map( item => `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos:\n ${item.alimentos.map(alimento =>`  - ${alimento}\n`)} `)}`
               const foods = `${data?.refeicoes.map(item => 
                    `\n- Nome: ${item.nome}\n
                     - Horário: *${item.horario}*
                     \n- Alimentos:\n ${item.alimentos.map(alimento => `  - ${alimento}\n`)}
                     \n- Calorias: ${item.calorias ? item.calorias : 'N/A'}kcal\n`)}`;

               const message = ` Dieta: ${data?.nome} \n- Objetivo: ${data?.objetivo}\n\n${foods}\n\n - *Dica de Suplementos:*\n ${supplements}\n `

               await Share.share({
                    message: message
               })

          }catch(err){
                console.log(err)
          }
     }

     if(isFetching){
          return(
               <View style={styles.loading}>
                    <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
                    <Text style={styles.loadingText}>Consultando IA...</Text>
               </View>
          )
     }


     if(error){
          return(
               <View style={styles.loading}>
                    <Text style={styles.loadingText}>Falha ao Gerar Dieta:</Text>
                    <Link
                    href="/step"
                    style={styles.loadingText}>Tente novamente</Link>
               </View>
          )
     }
 return (
   <View style={styles.container}>
     <View style={styles.containerHeader}>
          <View style={styles.contentHeader}>
               <Text style={styles.title}>Minha Dieta</Text>
               <Pressable style={styles.buttonShare} onPress={handleShare}>
                    <Text style={styles.buttonShareText}>Compartilhar</Text>
               </Pressable>
          </View>
     </View>

     <View style={{paddingLeft: 16, paddingRight: 16, flex: 1}}>
          {data && Object.keys(data).length > 0 &&(
               <>
                    <Text style={styles.name}>Nome: {data.nome}</Text>
                    <Text style={styles.objective}>Foco: {data.objetivo}</Text>

                    <Text style={styles.label}>Refeições: </Text>

                    <ScrollView>
                         <View style={styles.foods}>
                         {data.refeicoes.map((refeicao) =>(
                              <View key={refeicao.nome} style={styles.food}>
                                   <View style={styles.foodHeader}>
                                        <Text style={styles.foodName}>{refeicao.nome}</Text>
                                        <Ionicons name='restaurant'
                                        color='#000'/>
                                   </View>

                              <View style={styles.foodContent}>
                                   <Feather name='clock' size={14} color="#000"/>
                                   <Text>Horário: {refeicao.horario}</Text>
                              </View>

                              <Text style={styles.foodText}>Alimentos:{'\n'}{refeicao.alimentos.map(alimento => (
                                   <Text key={alimento}>{alimento}{'\n'}</Text>
                                   
                              ))}
                              </Text>
                              <Text style={styles.foodText}>Total de Calorias: {refeicao.calorias ? refeicao.calorias : 'N/A'}
                              </Text>


                              </View>
                         ))}
                         </View>

                         <View style={styles.supplements}>
                              <Text style={styles.foodName}>Dica Suplementos: 
                                   {data.suplementos.map( item =>(
                                        <Text key={item}>{'\n'}- {item}</Text>
                                   ))}
                              </Text>
                         </View>

                                   <Pressable style={styles.button} onPress={()=> router.replace("/")}>
                                        <Text style={styles.buttonText}>Gerar Nova Dieta</Text>
                                   </Pressable>

                    </ScrollView>
               </>
          )}

     </View>


   </View>
  );
}

const styles = StyleSheet.create({
     loading:{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',

     },
     loadingText:{
          fontSize: 18,
          color: colors.white,
          marginBottom: 4,
          justifyContent: 'center',
          alignItems: 'center',
     },
     container:{
          backgroundColor: colors.background,
          flex: 1,
     },
     containerHeader:{
          backgroundColor: colors.white,
          borderBottomLeftRadius: 14,
          borderBottomRightRadius: 14,
          paddingTop: 60,
          paddingBottom: 20,
          marginBottom: 16

     },
     contentHeader:{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:'space-between',
          paddingLeft: 16,
          paddingRight: 16,
     },
     title:{
          fontSize: 28,
          color: colors.background,
          fontWeight: 'bold',

     },
     buttonShare:{
          backgroundColor: colors.blue,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
          borderRadius: 4,
     },
     buttonShareText:{
          color: colors.white,
          fontWeight: '500'
     },
     name:{
          fontSize: 20,
          color: colors.white,
          fontWeight: 'bold',

     },
     objective:{
          color: colors.white,
          fontSize: 16,
          marginBottom: 24,

     },
     label:{
          color: colors.white,
          fontSize: 16,
          fontWeight:'bold'
     },
     foods:{
          backgroundColor: colors.white,
          padding: 14,
          borderRadius: 8,
          marginTop: 8,
          gap: 8,

     },
     food:{
          backgroundColor: 'rgba(208, 208, 208, 0.40)',
          padding: 8,
          borderRadius: 4,
     },
     foodHeader:{
          flexDirection: 'row',
          justifyContent:'space-between',
          alignItems: 'center',
          marginBottom: 4,
     },
     foodName:{
          fontSize: 16,
          fontWeight:'bold',
     },
     foodContent:{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
     },
     foodText:{
          fontSize: 16,
          marginBottom: 4,
          marginTop: 14,
     },
     supplements:{
          backgroundColor: colors.white,
          marginTop: 14,
          marginBottom: 14,
          padding: 14,
          borderRadius: 8,

     },
     button:{
          backgroundColor: colors.blue,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          marginBottom: 24,
          
     },
     buttonText:{
          color: colors.white,
          fontSize: 16,
          fontWeight: 'bold',
     }


     
})