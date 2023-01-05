// import { textRouter } from './routers/texts';
import { createTRPCRouter } from "./trpc";
// import { exampleRouter } from "./routers/example";
import { charactersRouter } from "./routers/character";
import { textRouter } from './routers/texts';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  // example: exampleRouter,
  characters: charactersRouter,
  texts: textRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
