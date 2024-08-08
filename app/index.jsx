import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, SafeAreaView, ActivityIndicator,Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import ExerciseItemList from '../src/components/ExerciseListItem';

// Define your GraphQL query
const EXERCISES_QUERY = gql`
  query GetExercises($muscle: String!) {
    exercises(muscle: $muscle) {
      name
      muscle
      equipment
    }
  }
`;

export default function ExerciseScreen() {
  const { data, loading, error } = useQuery(EXERCISES_QUERY, {
    variables: { muscle: 'biceps'}, 
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="medium"/>
      </View>
    );
  }
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={data.exercises} 
        contentContainerStyle={{ gap: 5, padding: 10 }}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ExerciseItemList item={item} />}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa', 
  },
});
