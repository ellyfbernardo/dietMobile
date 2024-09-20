import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Header } from '../../components/header';

import { colors } from '../../constants/colors';
import { z } from 'zod';
import{ zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Select } from '../../components/input/select'
import { useDataStore } from '../../store/data'
import {router} from 'expo-router'

const schema = z.object({
     gender: z.string().min(1,{ message: "O sexo é Obrigatório" }),
     objective: z.string().min(1,{ message: "O objetivo é Obrigatório" }),
     level: z.string().min(1,{ message: "Selecione seu Nível" }),
})

type FormData = z.infer<typeof schema>



export default function Create() {

     const {control, handleSubmit, formState: {errors, isValid}} = useForm< FormData >({
          resolver: zodResolver(schema)
     });

     const setPageTwo = useDataStore(state => state.setPageTwo)

     const genderOptions = [
          {label: "Masculino", value: "masculino"},
          {label: "Feminino", value: "feminino"},

     ]
     const levelOptions = [
          {label: "Sedentário (pouco ou nenhuma ativida física)", value: "Sedentário"},
          {label: "Levemente Ativo (exercícios 1 a 3 vezes na semana)", value: "Levemente Ativo (exercícios 1 a 3 vezes na semana)"},
          {label: "Moderadamente Ativo (exercícios 3 a 5 vezes na semana)", value: "Levemente Ativo (exercícios 3 a 5 vezes na semana)"},
          {label: "Altamente Ativo (exercícios 5 a 7 vezes na semana)", value: "Levemente Ativo (exercícios 5 a 7 vezes na semana)"},

     ]
     const objectiveOptions = [
          {label: "Emagrecer", value: "Emagrecer"},
          {label: "Hipertrofia", value: "Hipertrofia"},
          {label: "Hipertrofia + Definição", value: "Hipertrofia e Definição"},
          {label: "Definição", value: "Definição"},

  

     ]

     function HandleCreate(data: FormData){
          setPageTwo({
               level: data.level,
               gender: data.gender,
               objective: data.objective,

          })

          router.push("/nutrition")
     }

 return (
   <View style={styles.container}>
          <Header
               step='Passo 2'
               title='Finalizando Dieta'
          />

               <ScrollView style={styles.content}>
                    <Text style={styles.label}>Sexo:</Text>
                    <Select
                         control={control}
                         name="gender"
                         placeholder="Selecione o seu sexo..."
                         error={errors.gender?.message}
                         options={genderOptions}
                    />

                    <Text style={styles.label}>Selecione seu Nível de atividade física:</Text>
                    <Select
                         control={control}
                         name="level"
                         placeholder="Selecione seu Nível de atividade fisica"
                         error={errors.level?.message}
                         options={levelOptions}
                    />
                    <Text style={styles.label}>Selecione seu objetivo:</Text>
                    <Select
                         control={control}
                         name="objective"
                         placeholder="Selecione seu Nível de atividade fisica"
                         error={errors.objective?.message}
                         options={objectiveOptions}
                    />

                    
                                   <Pressable style={styles.button} onPress={handleSubmit(HandleCreate)}>
                                   <Text style={styles.buttonText}>Avançar</Text>
                         </Pressable>
                    
               </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
     container:{
          flex: 1,
          backgroundColor: colors.background,
     },     
     label:{
          fontSize: 16,
          color: colors.white,
          fontWeight: 'bold',
          marginBottom: 8,
     },
     content:{
          paddingLeft: 16,
          paddingRight: 16,
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
})