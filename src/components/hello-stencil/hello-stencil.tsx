import {
  Component,
  Host,
  State,
  h,
  Prop,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core'

export type Person = {
  name: string
  age: string
}
@Component({
  tag: 'hello-stencil',
  shadow: true,
})
export class HelloStencil {
  @Event() myClick: EventEmitter<Person>
  onClick() {
    this.myClick.emit(this.person)
  }

  @Event({ eventName: 'my-click' }) myClick2: EventEmitter<Person>
  onClick2() {
    this.myClick2.emit(this.person)
  }

  @Event({ eventName: 'myclick' }) myClick3: EventEmitter<Person>
  onClick3() {
    this.myClick3.emit(this.person)
  }

  @Prop() name: string
  @Prop({ mutable: true }) attrArray: Person[]
  @Prop() array: Person[]
  @State() innerArray: Person[]

  @Prop({ mutable: false }) attrPerson: Person
  @Prop() person: Person
  @State() innerPerson: Person

  @Watch('array')
  watchArray(value) {
    console.log('watchArray')
    console.log(value)
    this.innerArray = value
  }
  @Watch('attrArray')
  watchAttrArray(value) {
    console.log('watchAttrArray')
    console.log(value)
    this.attrArray = value
  }

  @Watch('person')
  watchPerson(value) {
    console.log('watchPerson', value)
    this.innerPerson = value
  }

  render() {
    return (
      <Host>
        <h2>{this.name}</h2>
        <h3>attrArray</h3>
        <ul>
          <li>
            {this.attrArray?.map(peron => {
              return <span>{peron?.name}</span>
            })}
          </li>
        </ul>
        <hr />
        <h3>innerArray</h3>
        <ul>
          <li>
            {this.innerArray?.map(peron => {
              return <span>{peron?.name}</span>
            })}
          </li>
        </ul>
        <hr />
        <h3>attrPerson</h3>
        <p>{this.attrPerson?.name}</p>
        <hr />
        <h3>innerPerson</h3>
        <p>{this.innerPerson?.name}</p>
        <hr />
        <h3>测试事件</h3>
        <button onClick={() => this.onClick()}>不设置事件名字</button>
        <button onClick={() => this.onClick2()}>设置事件名字my-click</button>
        <button onClick={() => this.onClick3()}>设置事件名字myclick</button>
      </Host>
    )
  }
}
