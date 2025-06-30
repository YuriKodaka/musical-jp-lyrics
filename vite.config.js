import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  return {
    plugins: [react()],
    // baseプロパティをbase変数で指定
    base: '/musical-jp-lyrics/',
  };
})