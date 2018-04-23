# webpack4_demo

webpack练习学习代码

代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 。

文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。

代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。

模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。

自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。

代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。

自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

###概念

Entry：入口，webpack执行构建的第一步将从Entry开始，可抽象理解为输入
output： 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件
loader： 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
plugins： loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务