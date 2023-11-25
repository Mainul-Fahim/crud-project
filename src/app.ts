import cors from 'cors';
import express, { Application } from 'express'
import { userRoutes } from './app/modules/user/user.route';
const app:Application = express()

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users',userRoutes)

export default app