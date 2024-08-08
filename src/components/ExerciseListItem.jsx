import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function ExerciseItemList({ item }) {
  return (
    <Link href={`/${item.name}`} asChild>
      <Pressable style={styles.exerciseContainer}>
        <Image source={require('../components/Icons/barbell.png')} style={styles.icon} />
        <View>
          <Text style={styles.exerciseName}>
            {capitalizeFirstLetter(item.name)}
          </Text>
          <Text style={styles.exerciseSubtitle}>
            Muscle: {capitalizeFirstLetter(item.muscle)} | Equipment: {capitalizeFirstLetter(item.equipment)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}


// Capitalzie first letter
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    padding: 10,
  },
  exerciseContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#e9ecef',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  exerciseName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    paddingRight: 50
    
  },
  exerciseSubtitle: {
    color: '#6c757d',
    fontSize: 12,
    fontStyle: 'italic',
  },
});