import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

enum snakeMoveDirction {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
}

class GameControl {
  snake: Snake

  food: Food

  scorePanel: ScorePanel

  direction: string = ''

  isAlive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 5)

    this.init()
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this))

    this.move()
  }

  keydownHandler(event: KeyboardEvent) {
    if (event.key in snakeMoveDirction) {
      this.direction = event.key
    }
  }

  move() {
    let X = this.snake.X
    let Y = this.snake.Y

    switch (this.direction) {
      case snakeMoveDirction.ArrowUp:
        Y -= 10
        break
      case snakeMoveDirction.ArrowDown:
        Y += 10
        break
      case snakeMoveDirction.ArrowLeft:
        X -= 10
        break
      case snakeMoveDirction.ArrowRight:
        X += 10
        break
    }

    this.checkEat()

    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (error) {
      alert((error as Error).message + ' GAME OVER!')
      this.isAlive = false
    }

    this.isAlive && setTimeout(this.move.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  checkEat() {
    if (this.snake.X === this.food.X && this.snake.Y === this.food.Y) {
      this.food.change()
      this.scorePanel.increaseScore()
      this.snake.grow()
    }
  }
}

export default GameControl