import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Redirect dev server api calls into localhost instace of backend
            // /FilesDetails -> http://localhost:8080/FilesDetails
            '/FilesDetails': 'http://localhost:8080',
            // /FilesDetails/DirectoryDetails -> http://localhost:8080/FilesDetails/DirectoryDetails
            '/FilesDetails/DirectoryDetails': 'http://localhost:8080',
            // /vids/ -> http://localhost:8080/vids/
            '^/vids/*': 'http://localhost:8080',
        },
    },
    build: {
        outDir: '../src/wwwroot'
    }
})
