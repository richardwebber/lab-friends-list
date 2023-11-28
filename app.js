import express from 'express';
import ViteExpress from 'vite-express';
import morgan from 'morgan';

const app = express();
const port = 8000;
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

const SAVED_FRIENDS = [
  { name: 'Beach Cat', picture: 'https://http.cat/images/301.jpg' },
  { name: 'Grumpy Cat', picture: 'https://http.cat/images/205.jpg' },
  { name: 'Toilet Goblin', picture: 'https://http.cat/images/403.jpg' },
];

app.get('/api/friends', (req, res) => {
  res.json(SAVED_FRIENDS);
});

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));
