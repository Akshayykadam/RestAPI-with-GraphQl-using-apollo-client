import { View, Text, StyleSheet, TextInput, Button,TouchableOpacity } from 'react-native';
import React from 'react'
import { useState } from 'react';

const CustomButton = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);



const NewSetInput = () => {
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const addSet = () => {
        console.log('Set Added: reps',reps , 'weight' ,weight);
    
        //Save data in database
    
        setReps('');
        setWeight('')
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TextInput
                    value={reps}
                    onChangeText={setReps}
                    placeholder="Reps"
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="Weight"
                    style={styles.input}
                    keyboardType="numeric"
                />
                <CustomButton title='Add' onPress={addSet} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 15,
    },

    row: {
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 15,
    },

    input: {
        borderWidth: 0.1,
        borderColor: 'gainsboro',
        padding: 10,
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#f7f7f7',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default NewSetInput



//akshay11kadam11 qwwULO7NIsc2I9sW
//Apollo 7fsEg5mJY9T0bxq2YMMOBaL3PQv3SQals6gu0oeEOSZIKt342uwlCvGfRYzkg8YU


// curl --location --request POST 'https://ap-south-1.aws.data.mongodb-api.com/app/data-mlrhqng/endpoint/data/v1/action/findOne' \
// --header 'Content-Type: application/json' \
// --header 'Access-Control-Request-Headers: *' \
// --header 'api-key: 7fsEg5mJY9T0bxq2YMMOBaL3PQv3SQals6gu0oeEOSZIKt342uwlCvGfRYzkg8YU' \
// --data-raw '{
//     "collection":"sets",
//     "database":"workouts",
//     "dataSource":"Cluster2"
// }'
