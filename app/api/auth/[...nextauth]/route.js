import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: '/auth/login',

  },
  providers: [
    CredentialsProvider({
        name: "Credentials",
        id: 'credentials',
        
        async authorize(credentials, req) {
            const res = await fetch( "https://host.docker.internal/back/api/v1/login" , {

            });

            const user = await res.json();

            return null
        },      
    }),    
  ],
  callbacks: {
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}