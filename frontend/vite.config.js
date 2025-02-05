import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:4300,
    // get rid of the CORS error
    proxy:{
      "/api":{
        target:"http://localhost:4300",
        changeOrigin:true,
        secure:false,
      }
    }
  },
})
