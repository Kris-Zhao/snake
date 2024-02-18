class Snake {
  element: HTMLElement

  head: HTMLElement

  body: HTMLCollection

  constructor() {
    this.element = document.querySelector('#snake')!
    this.head = document.querySelector('#snake > div:first-child')!
    this.body = this.element.getElementsByTagName('div')
  }

  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(value: number) {
    if (value === this.X) {
      return
    }

    if (value < 0 || value > 290) {
      throw new Error('Snake hits the boundary!')
    }

    if (this.head.nextSibling && (this.head.nextSibling as HTMLElement).offsetLeft === value) {
      value = 2 * this.X - value
    }

    this.moveBody()

    this.head.style.left = value + 'px'

    this.checkHitMyself()
  }

  set Y(value: number) {
    if (value === this.Y) {
      return
    }

    if (value < 0 || value > 290) {
      throw new Error('Snake hits the boundary!')
    }

    if (this.head.nextSibling && (this.head.nextSibling as HTMLElement).offsetTop === value) {
      value = 2 * this.Y - value
    }

    this.moveBody()

    this.head.style.top = value + 'px'

    this.checkHitMyself()
  }

  grow() {
    const divElement = document.createElement('div')
    this.element.appendChild(divElement)
  }

  moveBody() {
    for (let i = this.body.length - 1; i > 0; i--) {
      (this.body[i] as HTMLElement).style.left = (this.body[i - 1] as HTMLElement).offsetLeft + 'px';
      (this.body[i] as HTMLElement).style.top = (this.body[i - 1] as HTMLElement).offsetTop + 'px';
    }
  }

  checkHitMyself() {
    for (let i = 1; i < this.body.length; i++) {
      if (this.X === (this.body[i] as HTMLElement).offsetLeft && this.Y === (this.body[i] as HTMLElement).offsetTop) {
        throw new Error('Hits myself!')
      }
    }
  }
}

export default Snake