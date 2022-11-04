import { Component, Prop, h, Watch } from '@stencil/core'
import * as echarts from 'echarts/core'
import {
  DatasetComponent,
  DatasetComponentOption,
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
} from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
// import type { DatasetOption } from 'echarts/types/dist/shared'

echarts.use([
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
])

type EChartsOption = echarts.ComposeOption<
  | DatasetComponentOption
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DataZoomComponentOption
  | LineSeriesOption
>

// https://blog.csdn.net/weixin_39503495/article/details/116987982
export type Dimensions = string[]
export type Source = { [key in Dimensions[number]]: string | number }[]

const defaultOptions: EChartsOption = {
  backgroundColor: '#fdfdfd', // 图形背景色
  title: {
    text: '', // 图形标题
  },
  legend: {},
  dataZoom: [
    {
      startValue: '0', // 从开始
    },
    // {
    //   type: 'inside'
    // }
  ],
  toolbox: {
    // 是否有工具盒子
    // ['dataZoom','restore','saveAsImage','dataView']
    right: 10,
    feature: {
      // dataZoom: {
      //   yAxisIndex: 'none',
      //   title: {
      //     zoom: '观察局部',
      //     back: '还原',
      //   },
      // },
      // restore: {
      //   title: '刷新',
      // },
      dataView: {
        title: '原始数据',
        show: true,
        readOnly: true,
      },
      saveAsImage: {
        title: '保存图片',
        name: '折线图', // 导出图片的名字， 有标题，使用标题作为图片名字，否则使用折线图
      },
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '10%',
  },
  dataset: {
    // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
    // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
    // 如果不指定 dimensions，也可以通过指定 series.encode
    // 完成映射，参见后文。
    dimensions: null,
    source: null,
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
    nameLocation: null, // start  middle end
    name: null,
    nameTextStyle: { color: null },
    max: 'dataMax',
  },
  series: [
    { type: 'line', smooth: true },
    { type: 'line', smooth: true },
    { type: 'line', smooth: true },
  ],
}
@Component({
  tag: 'e-line-chart',
  shadow: true,
})
export class ELineChart {
  option: EChartsOption
  myChart: ReturnType<typeof echarts.init>
  div: HTMLElement
  innerWidth: string
  innerHeight: string

  @Prop() dimensions: Dimensions
  @Prop() source: Source
  @Prop() height?: string | number = '700px'
  @Prop() width?: string | number = '700px'
  @Prop() backgroundColor?: string = '#fdfdfd'
  @Prop() chartTitle?: string | TitleComponentOption = ''
  @Prop() yName?: string = ''
  @Prop() yNameLocation?: 'start' | 'middle' | 'end' = 'end'
  @Prop() yNameColor?: string = '#000'

  @Watch('source')
  sourceChange(newSource: Source) {
    this.source = newSource
  }

  @Watch('dimensions')
  dimensionsChange(newDimensions: Dimensions) {
    this.dimensions = newDimensions
  }

  componentWillRender() {
    this.option = defaultOptions
    // @ts-ignore
    this.option.dataset.dimensions = this.dimensions
    // @ts-ignore
    this.option.dataset.source = this.source
    if (this.chartTitle && typeof this.chartTitle === 'string') {
      // @ts-ignore
      this.option.title.text = this.chartTitle
    } else if (this.chartTitle && typeof this.chartTitle === 'object') {
      this.option.title = this.chartTitle
    }

    if (this.backgroundColor && typeof this.backgroundColor === 'string') {
      this.option.backgroundColor = this.backgroundColor
    }

    if (this.yName && typeof this.yName === 'string') {
      // @ts-ignore
      this.option.yAxis.name = this.yName
      if (this.yNameLocation && ['start', 'middle', 'end'].includes(this.yName)) {
        // @ts-ignore
        this.option.yAxis.nameLocation = this.yNameLocation
      } else {
        // @ts-ignore
        this.option.yAxis.nameLocation = 'end'
      }
    }

    if (this.yNameColor && typeof this.yNameColor === 'string') {
      // @ts-ignore
      this.option.yAxis.nameTextStyle.color = this.yNameColor
    } else {
      // @ts-ignore
      this.option.yAxis.nameTextStyle.color = '#000'
    }

    if (typeof this.width === 'number') {
      this.innerWidth = this.width + 'px'
    } else {
      this.innerWidth = this.width
    }
    if (typeof this.height === 'number') {
      this.innerHeight = this.height + 'px'
    } else {
      this.innerHeight = this.height
    }
  }
  componentDidLoad() {
    this.myChart = echarts.init(this.div)
    this.myChart.setOption(this.option)
  }
  render() {
    return (
      <div
        ref={div => (this.div = div)}
        style={{ width: this.innerWidth, height: this.innerHeight }}
      ></div>
    )
  }
}
