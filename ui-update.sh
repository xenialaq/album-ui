pm2 del album-server || true
cd ~/app/album-ui
npm ci
npm run build
mv ~/app/album-ui/build ~/app/album-server/ui
cd ~/app/album-server
DEBUG=album-server pm2 start index.js --name album-server
