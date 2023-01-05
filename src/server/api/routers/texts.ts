import { Input } from "postcss";
import { z } from "zod"; 
import { createTRPCRouter, publicProcedure } from "../trpc";


export const textRouter = createTRPCRouter ({
    newText: publicProcedure
    .input(z.object({
        
        text: z.string()

    }))
    .mutation(async({ctx, input }) => {
        try {
            // return await ctx.prisma
      
             return await ctx?.prisma?.text.create({
                 data: {
                     text: input.text
                 }
             })
            
           
        } catch(err) {
            console.log(err)
        }
    }),
    allTexts: publicProcedure.query(async({ctx}) => {
        try {
            return await ctx?.prisma?.text.findMany()

        } catch(err) {
            console.log(err)
        }
    }),
    deleteText: publicProcedure.input(z.object({
        id:z.string()
    })).mutation(async({ctx, input}) => {
        const {id} = input
        try {
            return await ctx?.prisma?.text.delete({
                where: {
                    id: input.id
                }
            })

        }catch(err) {
            console.log(err)

        }
    })
})