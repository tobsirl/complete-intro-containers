const hapi = require('@hapi/hapi');

async function start() {
  const server = hapi.server({
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler() {
      return { success: true };
    },
  });

  server.route({
    method: 'GET',
    path: '/code',
    handler() {
      return { code: process.env.CODE };
    },
  });

  await server.start();

  return server;
}

start().catch((err) => {
  console.log(err);
  process.exit(1);
});
