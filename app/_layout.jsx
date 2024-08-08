import { Stack } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name='index' options={{ title: 'Exercises' }} />
      </Stack>
    </ApolloProvider>
  );
}
