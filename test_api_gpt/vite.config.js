import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import express from './express_plugin' //Add this
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  //plugins: [vue(), express('server/server_app.js'), basicSsl({})],
  plugins: [vue(),  basicSsl({
      /** name of certification */
      name: 'test',
      /** custom trust domains */
      //domains: ['*.custom.com'],
      /** custom certification directory */
      certDir: '.',
    })],

    server: {
      headers: {
        'Access-Control-Allow-Origin': '*'            
      },
      // open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 8090, // CHANGE YOUR PORT HERE!
      https: true,
      //hotOnly: false,
      //hmr: true,
      watch: {
        usePolling: true,
        interval: 100,
        poll: 101, // Check for changes every second
      },
      watchFiles: [
      ]
    },

})
