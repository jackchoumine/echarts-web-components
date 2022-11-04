# echarts-web-components

基于 echarts 封装的 web component，可使用在任何框架中。

## 用法

安装依赖

```bash
npm i echarts-web-components
```

### vue3

`main.js`

```js
import { ELineChart } from 'echarts-web-components/dist/components'
customElements.define('line-chart', ELineChart)
```

在 vue 组件中使用:

```html
<template>
  <line-chart
    :dimensions="dimensions"
    :source="source"
    :chartTitle="chartTitle"
    :y-name="yName"
  ></line-chart>
</template>

<script setup>
  const dimensions = ['product', '2015', '2016', '2017']
  const source = [
    { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
    { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
    { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
    { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 },
  ]
  const chartTitle = 'lineChart'
  const yName = 'lineChart'
</script>
```

### Script tag

- Put a script tag similar to this `<script type='module' src='https://unpkg.com/echarts-web-components'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

```html
<e-line-chart></e-line-chart>
<script>
  const eLintChart = document.querySelector('e-line-chart')
  eLintChart.dimensions = ['product', '2015', '2016', '2017']
  eLintChart.source = [
    { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
    { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
    { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
    { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 },
  ]
  eLintChart.chartTitle = 'lineChart'
  eLintChart.yName = 'lineChart'
  // 图表自动刷新
  setTimeout(function () {
    eLintChart.chartTitle = 'hello'
    eLintChart.dimensions = ['product', '2015', '2016']
  }, 2000)
</script>
```

### Node Modules

- Run `npm install echarts-web-components --save`
- Put a script tag similar to this `<script type='module' src='node_modules/echarts-web-components/dist/echarts-web-components.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app

- Run `npm install echarts-web-components --save`
- Add an import to the npm packages `import echarts-web-components;`
- Then you can use the element anywhere in your template, JSX, html etc
