import { Text, View, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from '../../constants/colors';
import { Header } from '../../components/header';
import { Input } from '../../components/input'; 

import { z } from 'zod';
import{ zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { router } from "expo-router";
import { useDataStore } from "@/store/data";

const schema = z.object({
     name: z.string().min(1,{ message: "O nome é Obrigatório" }),
     weight: z.string().min(1,{ message: "O peso é Obrigatório" }),
     age: z.string().min(1,{ message: "A Idade é Obrigatória" }),
     height: z.string().min(1,{ message: "A altura é Obrigatória" }),

})

type FormData = z.infer<typeof schema>

export default function Step(){

     const {control, handleSubmit, formState: {errors, isValid}} = useForm< FormData >({
          resolver: zodResolver(schema)
     });

     const setPageOne = useDataStore(state => state.setPageOne)

     function HandleCreate(data: FormData) {
          console.log("passando dados da página 1");
          setPageOne({
               name: data.name,
               weight: data.weight,
               age: data.age,
               height: data.height,
          })
          router.push("/create")
     }

     return(
          <>
               <View style={styles.container}>
                   <Header
                   step='Passo 1'
                   title='Vamos Começar'
                   />

                    <ScrollView style={styles.content}>
                         <Text style={styles.label}>Nome:</Text>
                         <Input
                              name='name'
                              control={control}
                              placeholder="Digite seu Nome..."
                              error={errors.name?.message}
                              keyboardType="default"
                         />
                         <Text style={styles.label}>Seu Peso Atual:</Text>
                         <Input
                              name='weight'
                              control={control}
                              placeholder="Ex: 60"
                              error={errors.weight?.message}
                              keyboardType="numeric"
                         />
                         <Text style={styles.label}>Sua Altura Atual:</Text>
                         <Input
                              name='height'
                              control={control}
                              placeholder="Ex: 1.55"
                              error={errors.height?.message}
                              keyboardType="numeric"
                         />
                         <Text style={styles.label}>Sua Idade Atual:</Text>
                         <Input
                              name='age'
                              control={control}
                              placeholder="Ex: 22"
                              error={errors.age?.message}
                              keyboardType="numeric"
                         />

                         <Pressable style={styles.button} onPress={handleSubmit(HandleCreate)}>
                                   <Text style={styles.buttonText}>Avançar</Text>
                         </Pressable>
                    </ScrollView>

               </View>
          </>
     )
}



const styles = StyleSheet.create({
     container:{
          flex: 1,
          backgroundColor: colors.background,

     },
     content:{
          paddingLeft: 16,
          paddingRight: 16,
     },
     label:{
          fontSize: 16,
          color: colors.white,
          fontWeight: 'bold',
          marginBottom: 8,
     },
     button:{
          backgroundColor: colors.blue,
          height: 44,
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
     },
     buttonText:{
          color: colors.white,
          fontSize: 16,
          fontWeight: 'bold',
     }
   
});