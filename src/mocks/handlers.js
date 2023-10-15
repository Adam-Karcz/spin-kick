import { rest } from "msw";

export const handlers = [
     rest.get('https://api.chucknorris.io/jokes/random',
      (req, res, ctx) =>{
        return res(ctx.json(
            {value: 'A random joke'}
        ));
    }),
      rest.get('https://api.chucknorris.io/jokes/categories',
      (req, res, ctx) => {
        return res(ctx.json(
            ['political', 'sport', 'food']
            ));
    }),

    ]