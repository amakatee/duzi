import { z } from "zod"; 
import { createTRPCRouter, publicProcedure } from "../trpc";

export const charactersRouter = createTRPCRouter({
    newCharacter: publicProcedure
    .input (z.object ({
        characters: z.string(),
        pianyin:z.string(),
        rus: z.string(),
        eng:z.string(),
        tone: z.number(),
        audio: z.string(),
        visible: z.boolean(),
        level: z.string()
    })) 
    .mutation(async({ctx, input}) => {
        try {
            return await ctx.prisma.character.create({
                data: {
                    character: input.characters,
                    pianyin: input.pianyin,
                    rus: input.rus,
                    eng: input.eng,
                    tone: input.tone,
                    audio: input.audio,
                    visible: input.visible,
                    level: input.level

                }
            })

        }catch(err) {
            console.log(err)
        }

    }),

    allCharacters: publicProcedure.query(async({ ctx }) => {
        try {
            return await ctx?.prisma?.character.findMany({
                // select: {
                //     character:true,
                //     id: true
                // },
            })
        } catch(err) {
            console.log(err)
        }
    }),

    deleteCharacter: publicProcedure.input(z.object({
        id:z.string()
    })).mutation(async ({ctx, input}) => {
        const {id} = input
        try {
            return await ctx?.prisma?.character.delete({
                where: {
                    id
                }
            })


        } catch (err) {
            console.log(err)
        }
    })
})