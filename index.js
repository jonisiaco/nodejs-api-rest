const express = require('express');
const app = express();
const routes = require('./routes/routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running server: http://localhost:${PORT}`);
});

