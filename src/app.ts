import express from 'express';
import { PORT } from './common/constants';
import apiRoutes from './routes/apiRoutes';

const app = express();

app.use(express.json());
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
