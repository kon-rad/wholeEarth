#!/bin/bash
sudo git reset --hard
sudo git pull
npm install
npm run build
pm2 stop wholeearth
pm2 delete wholeearth
pm2 start npm --name=wholeearth -- run prod