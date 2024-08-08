import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import exercises from '../assets/data/exercises.json';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import NewSetInput from '../src/components/NewSetInput';

// Capitalzie first letter
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// GraphQL query
const GET_EXERCISE_BY_NAME = gql`
  query GetExerciseByName($name: String!) {
    exercise(name: $name) {
      equipment
      instructions
      muscle
    }
  }
`;

export default function ExerciseDetailsScreen() {
    const { name } = useLocalSearchParams();
    const { data, loading, error } = useQuery(GET_EXERCISE_BY_NAME, {
        variables: { name },
    });
    const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="medium" />
            </View>
        );
    }
    if (error) return <Text>Error: {error.message}</Text>;
    if (!data?.exercise) return <Text>Not Found</Text>;

    const exercise = data.exercise;

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: name ? name.substring(0, 12) + '...' : ''
                }}
            />

            {/* Exercise Name Header*/}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.innerContainer}>
                    <Text style={styles.exerciseName}>
                        {name}
                    </Text>

                    <Text style={styles.exerciseSubtitle}>
                        Muscle: {capitalizeFirstLetter(exercise.muscle)} | Equipment: {capitalizeFirstLetter(exercise.equipment)}
                    </Text>
                </View>

                {/* Exercise Instructions */}
                <View style={styles.mainContainer}>
                    <View style={styles.iconViewContainer}>
                        <Image source={require('../src/components/Icons/barbell.png')} style={styles.icon} />
                    </View>
                    <Text style={styles.instructions}>Instructions: </Text>
                    <Text style={styles.exerciseInstructions} numberOfLines={isInstructionsExpanded ? 0 : 5}>
                        {exercise.instructions}
                    </Text>
                    <Text
                        onPress={() => setIsInstructionsExpanded(!isInstructionsExpanded)}
                        style={styles.seeMore}
                    >
                        {isInstructionsExpanded ? 'See less' : 'See more'}
                    </Text>
                </View>

                {/* Exercise Input */}
                <View>
                    <NewSetInput />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',

    },
    exerciseName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
        textAlign: 'center',
    },
    instructions: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
    },
    exerciseSubtitle: {
        color: '#7f8c8d',
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 8,
        textAlign: 'center',
    },
    exerciseInstructions: {
        color: '#34495e',
        fontSize: 14,
        lineHeight: 24,
        marginBottom: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#e1e1e1',
        marginVertical: 16,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    mainContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 15,
        marginBottom: 10,
    },
    innerContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 10,

    },
    iconViewContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 200,
        height: 200,
    },
    seeMore: {
        fontSize: 15,
        fontWeight: '500',
        color: '#007BFF',
        padding: 5,
        textAlign: 'center',
    }

});

