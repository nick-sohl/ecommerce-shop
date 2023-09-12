import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Stripe from 'stripe'

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      // TypeScript treats env files as potentially undefined. Because of that we get this warning.
      // To get rid of it, we use "as string" behind it.
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // You can add another provider here
  ],
  events: {
    createUser: async ( {user} ) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15'
      })
      // Let's create a stripe
      if (user.name && user.email) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        })
        // Also update our prisma user with the stripecustomerid
        await prisma.user.update({
          where: {id: user.id},
          data: {stripeCustomerId: customer.id},
        })
      }
    },
  },
};

export default NextAuth(authOptions)