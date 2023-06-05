const server = require("./backend/server");

const PORT = process.env.PORT || 9001;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
