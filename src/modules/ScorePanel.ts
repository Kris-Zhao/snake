class ScorePanel {
  score = 0

  level = 1

  scoreEle: HTMLElement

  levelEle: HTMLElement

  maxLevel: number

  upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.querySelector('#score')!
    this.levelEle = document.querySelector('#level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  increaseScore() {
    this.score++
    this.scoreEle.innerHTML = this.score.toString()

    if (this.score % this.upScore === 0) {
      this.increaseLevel()
    }
  }

  increaseLevel() {
    if (this.level < this.maxLevel) {
      this.level++
      this.levelEle.innerHTML = this.level.toString()
    }
  }
}

export default ScorePanel