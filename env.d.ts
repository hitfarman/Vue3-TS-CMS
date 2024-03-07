/// <reference types="vite/client" />

// declare module "*.vue" {
//   /** 意思是: 从.vue文件导出的所有东西都是src, 而这个src是string类型 */
//   const src: string
//   export default src
// }

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // 意思是: 从.vue文件导出的所有东西都是component, 而这个component是DefineComponent类型
  const component: DefineComponent
  export default component
}

declare module '*.mjs'
