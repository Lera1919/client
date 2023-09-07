import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  pages: {
    signIn: '/auth/login',

  },
  providers: [
    CredentialsProvider({
        name: "Credentials",
        id: 'credentials',
        
        async authorize(credentials, req) {
            const res = await fetch( `${process.env.URL_INTERNAL}/back/api/v1/login` , {
              method: 'POST',
              headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),


            });

            if (res.status !==200) return null;
            

            const user = await res.json();

            if (user) {
              return {
                email: user.email,
                name: user.firstName + ' ' + user.lastName,
                image: user.avatar,
                token: user.token,
                jti: user.jti
              };
            } else {
              return null;
            }
        },      
    }),    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      return {...token, ...user};
    },
    async session({session, token, user}) {
      session.user = token;
      return session;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}