import { initTRPC } from '@trpc/server';
import axios from 'axios';
import { z } from 'zod';

export const t = initTRPC.create();

export const appRouter = t.router({
  assets: t.procedure.query(() => {
    return axios.get('http://api.coincap.io/v2/assets')
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
  }),
  history: t.procedure
    .input(z.object({ id: z.string(), interval: z.string() }))
    .query(async (opts) => {
      const id = opts.input.id;
      const interval = opts.input.interval;
      return axios.get(`https://api.coincap.io/v2/assets/${id}/history${interval && `?interval=${interval}`}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
    }),
  currensyInfo: t.procedure
    .input(z.string())
    .query(async (opts) => {
      const id = opts.input;
      return axios.get(`https://api.coincap.io/v2/assets/${id && `${id}`}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
    }),
});

export type AppRouter = typeof appRouter;