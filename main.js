

// GET CANVAS

const canvasP1 = document.getElementById('player1')
const ctxP1 = canvasP1.getContext('2d')
// ctxP1.fillRect(0,0,600,400)

const canvasP2 = document.getElementById('player2')
const ctxP2 = canvasP2.getContext('2d')
// ctxP2.fillStyle = "grey"
// ctxP2.fillRect(0,0,600,400)

// ON LOAD



// VARIABLES GRAL
let gameStarted = false
let interval
let frames = 0
let images = {
  bisketo: "./images/bisketo.png",
  farahChoose: "./images/farah-choose.png",
  tomasaChoose: "./images/tomasa-choose.png",
  planet1Bg:"./images/planet1Bg.png",
  alien: "./images/alien.png",
  mannPlanet: "./images/mann-planet-pixel.png",
  mannFloor: "./images/manns-floor-pixel.gif",
  mannPlanetFlip: "./images/mann-planet-pixel-flip.png",
  edmundPlanet: "./images/edmunds-planet-pixel.gif",
  edmundPlanetFlip: "./images/edmunds-planet-pixel-flip.png",
  edmundFloor: "./images/edmunds-planet-floor-pixel.gif",
  gargantua: "./images/Gargantua.gif",
  snowball8bit: "./images/Snowball-8.png",
  rock8bit: "./images/rock8bit.png",
  cooperStation: "./images/cooper-station-pixel.gif",
}
let sounds = {
  bgMusic: "./sounds/InterstellarTrim.mp3",
  bisketoSound: "./sounds/bisketo.mp3",
  endGameSound: "./sounds/end.mp3",
  enemyHitSound: "./sounds/enemy.mp3",
  jumpSound: "./sounds/jump.mp3",
  buttonSound: "./sounds/button.mp3",
}
let gravityMann = .781
let gravityEdmund = .981
let frictionMann = .8
let frictionEdmund = .84
let secMann = 60
let secEdmund = 60
let keys = {}
let bisketoP1Counter = 0
let bisketoP2Counter = 0

// SOUNDS

let jump = new Audio()
jump.src = sounds.jumpSound

let hit = new Audio()
hit.src = sounds.enemyHitSound

let grab = new Audio()
grab.src = sounds.bisketoSound

let button = new Audio()
button.src = sounds.buttonSound

let end = new Audio()
end.src = sounds.endGameSound

let backgroundMusic = new Audio()
backgroundMusic.src = sounds.bgMusic

// VARIABLES P1
let p1 = ""
let enemiesP1 = []
let bisketosP1 = []


// VARIABLES P2
let p2 = ""
let enemiesP2 = []
let bisketosP2 = []


// CLASSES

class FloorP1 {
  constructor () {
    this.x = 0
    this.y = 302
    this.width = canvasP1.width
    this.height = 50
    this.image = new Image()
    this.image.src = images.mannFloor
    this.image.onload = this.draw()
  }
  
    draw() {
      ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
  }
  
class FloorP2 {
  constructor () {
    this.x = 0
    this.y = 302
    this.width = canvasP1.width
    this.height = 50
    this.image = new Image()
    this.image.src = images.edmundFloor
    this.image.onload = this.draw()
  }
  
    draw() {
      ctxP2.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
  }

  class Planet1 {
    constructor () {
      this.x = 0
      this.y = 0
      this.width = canvasP1.width
      this.height = canvasP1.height
      this.image = new Image()
      this.image.src = images.mannPlanet 
      this.image2 = new Image()
      this.image2.src = images.mannPlanetFlip
      this.image.onload = this.draw.bind(this)
    }
  
    draw () {
      ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)    
      ctxP1.drawImage(this.image2, this.x - this.width, this.y, this.width, this.height)
      ctxP1.drawImage(this.image2, this.x + this.width, this.y, this.width, this.height)
  
      if (this.x < -canvasP1.width) {
        this.x = 0
      } 
      
      if (keys[65]) {
        this.x++
        
      }
      if (keys[68]) {
        this.x--
      }

    }

    drawScore () {
      this.bisketoP1 = new Image()
      this.bisketoP1.src = images.bisketo 
      ctxP1.drawImage(this.bisketoP1, 500, 20, 30, 30)
      ctxP1.font = "20px 'Major Mono Display'"
      ctxP1.fillStyle = "khaki"  
      ctxP1.fillText(bisketoP1Counter, 540, 42)
    }
  }

  class Planet2 {
    constructor () {
      this.x = 0
      this.y = 0
      this.width = canvasP2.width
      this.height = canvasP2.height
      this.imageP2 = new Image()
      this.imageP2.src = images.edmundPlanet
      this.imageP22 = new Image()
      this.imageP22.src = images.edmundPlanetFlip
      this.imageP2.onload = this.draw()
    }
  
    draw () {
      ctxP2.drawImage(this.imageP2, this.x, this.y, this.width, this.height)    
      ctxP2.drawImage(this.imageP22, this.x - this.width, this.y, this.width, this.height)
      ctxP2.drawImage(this.imageP22, this.x + this.width, this.y, this.width, this.height)
  
      if (this.x < -canvasP2.width) {
        this.x = 0
      } 
      
      if (keys[39]) {
        this.x--
        
      }
      if (keys[37]) {
        this.x++
      }
  
    }

    drawScore () {
      this.bisketoP2 = new Image()
      this.bisketoP2.src = images.bisketo 
      ctxP2.drawImage(this.bisketoP2, 500, 20, 30, 30)
      ctxP2.font = "20px 'Major Mono Display'"
      ctxP2.fillStyle = "khaki"  
      ctxP2.fillText(bisketoP2Counter, 540, 42)
    }
  }

class BisketoP1 {
  constructor () {
    this.x = Math.floor(Math.random() * canvasP1.width)
    this.y = -40
    this.width = 40
    this.height = 40
    this.imageBisketo = new Image()
    this.imageBisketo.src = "./images/bisketo.png"
    this.imageBisketo.onload = this.draw.bind(this)
  }

  draw () {
    this.y += 5
    ctxP1.drawImage(this.imageBisketo, this.x, this.y, this.width, this.height)
  }
}

class BisketoP2 {
  constructor () {
    this.x = Math.floor(Math.random() * canvasP2.width)
    this.y = -40
    this.width = 40
    this.height = 40
    this.imageBisketo = new Image()
    this.imageBisketo.src = "./images/bisketo.png"
    this.imageBisketo.onload = this.draw.bind(this)
  }

  draw () {
    this.y += 5
    ctxP2.drawImage(this.imageBisketo, this.x, this.y, this.width, this.height)
  }
}

class Snowball {
  constructor () {
    this.x = -20
    this.y = 230
    this.width = 20
    this.height = 20
    this.imageSnowball = new Image()
    this.imageSnowball.src = images.snowball8bit
    this.imageSnowball.onload = this.draw.bind(this)
  }
  draw () {
    this.x += 3
    ctxP1.drawImage(this.imageSnowball, this.x, this.y, this.width, this.height)
  }  
}

class Rock {
  constructor () {
    this.x = -20
    this.y = 230
    this.width = 20
    this.height = 20
    this.image = new Image()
    this.image.src = images.rock8bit
    this.image.onload = this.draw.bind(this)
  }
  draw () {
    this.x += 3
    ctxP2.drawImage(this.image, this.x, this.y, this.width, this.height)
  }  
}

class Farah {
  constructor () {
    this.x = 180
    this.y = 250
    this.width = 40
    this.height = 60
    this.image = new Image()
    this.image.src = images.farahChoose
    this.image.onload = this.draw()
    // vertical physics
    this.velY = 0
    this.grounded = true
    this.jumping = false
    this.jumpStrength = 9
    //horizontal
    this.velX = 0
    this.hp = 100
  }

  drawHP() {
    ctxP1.fillStyle = "darkred"
    ctxP1.fillRect(20, 20, this.hp * 2, 20)
  }

  draw () {
    ctxP1.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  checkIfTouch(obstacle) { //A clase's method can receive another object
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
      )
  }

}

//TOMASA'S MISSING CHECK IF TOUCH W/ BISKETO P2
class Tomasa {
  constructor () {
    this.x = 180
    this.y = 250
    this.width = 50
    this.height = 70
    this.image = new Image()
    this.image.src = images.tomasaChoose
    this.image.onload = this.draw()
    // vertical physics
    this.velY = 0
    this.grounded = true
    this.jumping = false
    this.jumpStrength = 11
    //horizontal
    this.velX = 0
    this.hp = 100
  }

  drawHP() {
    ctxP2.fillStyle = "darkred"
    ctxP2.fillRect(20, 20, this.hp * 2, 20)
  }

  draw() {
    ctxP2.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  checkIfTouch(obstacle) { //A clase's method can receive another object
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
      )
  }
}


//MAIN FUNCTIONS
  // window.onload(gameCover())

  function startGame () {
    gameStarted = true
    clearCanvas()
    setInterval(update, 1000/60)
  }

  function update () {
    ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
    ctxP2.clearRect(0, 0, canvasP2.width, canvasP2.height)
    if(didGameEnd()) {
      return gameOver()
    }
    frames++
    planet1.draw()
    floorP1.draw()
    planet2.draw()
    floorP2.draw()
    player1.draw()
    player1.drawHP()
    planet1.drawScore()
    player2.draw()
    player2.drawHP()
    planet2.drawScore()
    moveP1()
    moveP2()
    drawTimeP1()
    drawTimeP2()
    generateBisketoP1()
    generateBisketoP2()
    drawBisketosP1()
    drawBisketosP2()
    if (frames % Math.floor(Math.random() * 4) === 0) {
      generateSnowballP1()
      generateSnowballP2()
    }
    drawSnowballP1()
    snowballCollitionP1()
    drawSnowballP2()
    snowballCollitionP2()
  }

  function didGameEnd () {
    if (player1.hp <= 0 && player2.hp <= 0) return true
    if (player1.hp <= 0) return true
    if (player2.hp <= 0) return true
    if (drawTimeP1() <= 0 || drawTimeP2() <= 0) return true
  }

  function gameOver () {
    clearInterval(interval)
    if (player1.hp <= 0 && player2.hp <= 0) {
      end.play()
      ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
      ctxP2.clearRect(0, 0, canvasP2.width, canvasP2.height)
      clearInterval(interval)
      youLoseP1()
      youLoseP2()

    }

    if (player1.hp <= 0) {
      end.play()
      ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
      ctxP2.clearRect(0, 0, canvasP2.width, canvasP2.height)
      clearInterval(interval)
      youWinP2() 
      youLoseP1()
    }

    if (player2.hp <= 0) {
      end.play()
      ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
      ctxP2.clearRect(0, 0, canvasP2.width, canvasP2.height)
      clearInterval(interval)
      youWinP1()
      youLoseP2()
    }

    if (drawTimeP1() <= 0 || drawTimeP2() <= 0) {
      end.play()
      if (bisketoP1Counter < bisketoP2Counter) {
        ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
        ctxP2.clearRect(0, 0, canvasP2.width, canvasP2.height)
        clearInterval(interval)
        youLoseP1()
        youWinP2()
      }

      if (bisketoP2Counter < bisketoP1Counter) {
        end.play()
        ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
        ctxP2.clearRect(0, 0, canvasP2.width, canvasP2.height)
        clearInterval(interval)
        youWinP1()
        youLoseP2()
      }
    }
  }


// AUX FUNCTIONS

function restart ()  {
  ctxP1.clearRect(0,0,canvasP1.width, canvasP1.height)
  clearInterval(interval)
  bisketoP1Counter = 0
  bisketoP2Counter = 0
  enemiesP1 = []
  enemiesP2 = []
  bisketosP1 = []
  bisketosP2 = []
  window.location.reload(true)
}

function youWinP1() {
  ctxP1.clearRect(0,0,canvasP1.width, canvasP1.height)
  clearInterval(interval)
  let winP1 = new Image()
  winP1.src = "./images/cooper-station-pixel.gif"
  ctxP1.drawImage(winP1, 0, 0, canvasP1.width, canvasP1.height)
  ctxP1.font = "30px 'Major Mono Display'"
  ctxP1.fillStyle = "#000"
  ctxP1.textAlign = "center"
  ctxP1.fillText("arrived to cooper station",290,300)
  ctxP1.fillText("press h to restart",300,50)
}

function youLoseP1() {
  ctxP1.clearRect(0,0,canvasP1.width, canvasP1.height)
  clearInterval(interval)
  let winP1 = new Image()
  winP1.src = "./images/Gargantua.gif"
  ctxP1.drawImage(winP1, 0, 0, canvasP1.width, canvasP1.height)
  ctxP1.font = "30px 'Major Mono Display'"
  ctxP1.fillStyle = "#fff"
  ctxP1.textAlign = "center"
  ctxP1.fillText("you lost",300,300)
  ctxP1.fillText("press h to restart",300,50)
}

function youWinP2() {
  ctxP2.clearRect(0,0,canvasP2.width, canvasP2.height)
  clearInterval(interval)
  let winP2 = new Image()
  winP2.src = "./images/cooper-station-pixel.gif"
  ctxP2.drawImage(winP2, 0, 0, canvasP2.width, canvasP2.height)
  ctxP2.font = "30px 'Major Mono Display'"
  ctxP2.fillStyle = "#000"
  ctxP2.textAlign = "center"
  ctxP2.fillText("arrived to cooper station",290,300)
  ctxP2.fillText("press h to restart",300,50)
}

function youLoseP2() {
  ctxP2.clearRect(0,0,canvasP2.width, canvasP2.height)
  clearInterval(interval)
  let winP2 = new Image()
  winP2.src = "./images/Gargantua.gif"
  ctxP2.drawImage(winP2, 0, 0, canvasP2.width, canvasP2.height)
  ctxP2.font = "30px 'Major Mono Display'"
  ctxP2.fillStyle = "#fff"
  ctxP2.textAlign = "center"
  ctxP2.fillText("you lost",300,300)
  ctxP2.fillText("press h to restart",300,50)
}

function clearCanvas () {
  ctxP1.clearRect(0, 0, canvasP1.width, canvasP1.height)
  ctxP2.clearRect(0, 0, canvasP2.width, canvasP2.height)
}

function intro_screen() {
  let bgIntro = new Image()
  bgIntro.src = "./images/Gargantua.gif"
  ctxP1.drawImage(bgIntro, 0, 0, canvasP1.width, canvasP1.height)
  ctxP2.drawImage(bgIntro, 0, 0, canvasP2.width, canvasP2.height)
  ctxP1.font = "30px 'Major Mono Display'"
  ctxP1.fillStyle = "#fff"
  ctxP1.textAlign = "center"
  ctxP1.fillText("press G to start",300,300)
  ctxP2.font = "30px 'Major Mono Display'"
  ctxP2.fillStyle = "#fff"
  ctxP2.textAlign = "center"
  ctxP2.fillText("press G to start",300,300)
}

function generateBisketoP1 () {
  if (frames % 100 !== 0) return
  let bisketo = new BisketoP1()
  bisketosP1.push(bisketo)
}

function generateBisketoP2 () {
  if (frames % 100 !== 0) return
  let bisketoP2 = new BisketoP2()
  bisketosP2.push(bisketoP2)
}

function generateSnowballP1 () {
  if (frames % 70 !== 0) return
  let oneSnowball = new Snowball()
  enemiesP1.push(oneSnowball)
  
}

function generateSnowballP2 () {
  if (frames % 70 !== 0) return
  let oneSnowballP2 = new Rock()
  enemiesP2.push(oneSnowballP2)
  console.log("lol")
}

function drawBisketosP1 () {
  bisketosP1.forEach((bisketo, index) => {
    if (bisketo.y > 352) {
      bisketosP1.splice(index,1)
    }
    bisketo.draw()
  })
}

function drawBisketosP2 () {
  bisketosP2.forEach((bisketoP2, index) => {
    if (bisketoP2.y > 352) {
      bisketosP2.splice(index,1)
    }
    bisketoP2.draw()
  })
}

function drawSnowballP1 () {
  enemiesP1.forEach((oneSnowball, index) => {
    if (oneSnowball.x > 700) {
      enemiesP1.splice(index,1)
    }
    oneSnowball.draw()
  })
}

function drawSnowballP2 () {
  enemiesP2.forEach((oneSnowballP2, index) => {
    if (oneSnowballP2.x > 700) {
      enemiesP2.splice(index,1)
    }
    oneSnowballP2.draw()
  })
}

function bisketoCollitionP1() {
  bisketosP1.forEach((bisketo, index) => {
    if (player1.checkIfTouch(bisketo)) {
      bisketoP1Counter++
      bisketosP1.splice(index, 1)
      return true
    }
  })
}

function bisketoCollitionP2() {
  bisketosP2.forEach((bisketoP2, index) => {
    if (player2.checkIfTouch(bisketoP2)) {
      bisketoP2Counter++
      bisketosP2.splice(index, 1)
    }
  })
}

function snowballCollitionP1 () {
  enemiesP1.forEach((oneSnowball, index) => {
    if (player1.checkIfTouch(oneSnowball)) {
      hit.play()
      enemiesP1.splice(index, 1)
      player1.hp -= 20
    }
  })
}

function snowballCollitionP2 () {
  enemiesP2.forEach((oneSnowballP2, index) => {
    if (player2.checkIfTouch(oneSnowballP2)) {
      hit.play()
      enemiesP2.splice(index, 1)
      player2.hp -= 20
    }
  })
}

function drawTimeP1() {
  let timeP1 = 60 - Math.floor(frames/secMann)
  let timePrintP1 = "T-" + timeP1 + " sec"
  document.getElementById('timeP1').textContent = timePrintP1
  return timeP1
}

function drawTimeP2(){
  let timeP2 = 60 - Math.floor(frames/secEdmund)
  let timePrintP2 = "T-" + timeP2 + " sec"
  document.getElementById('timeP2').textContent = timePrintP2
  return timeP2
}

function moveP1() {
  if (!player1.grounded) {
    player1.y += player1.velY
    player1.velY += gravityMann
  }
  if (player1.y > floorP1.y - player1.height) {
    player1.grounded = true
    player1.jumping = false
    player1.y = floorP1.y - player1.height
  }
  player1.x += player1.velX
  player1.velX *= frictionMann

  // Horizontal

  if (keys[68]) {
    if (player1.x >= canvasP1.width - 40) {
      player1.velX--
    }
    else player1.velX++
  }
  if (keys[65]) {
    if (player1.x < 40) {
      player1.velX++
    }
    else player1.velX--
  }
  if (keys[87]) {
    
    if (!player1.jumping) {
      jump.play()
      player1.velY = 0
      player1.grounded = false
      player1.jumping = true
      player1.velY += -player1.jumpStrength * 2
    }
  }
}

function moveP2 () {
  if(!player2.grounded){
    player2.y += player2.velY
    player2.velY += gravityEdmund
  }
  if(player2.y > floorP2.y - player2.height ){
    player2.grounded = true
    player2.jumping = false
    player2.y = floorP2.y - player2.height
  }
  player2.x += player2.velX
  player2.velX *= frictionEdmund

  //horizontal

  if(keys[39]){
    if (player2.x >= canvasP2.width - 40) {
      player2.velX--
    }
    else player2.velX++
  }
  if(keys[37]){
    if (player2.x < 40) {
      player2.velX++
    }
    else player2.velX--
  }
  if(keys[38]){
    if(!player2.jumping){
      jump.play()
      player2.velY = 0
      player2.grounded = false
      player2.jumping = true
      player2.velY += -player2.jumpStrength * 2
      
    } 
  }
}


// INSTANCES 

let planet1 = new Planet1()
let planet2 = new Planet2()
let floorP1 = new FloorP1()
let floorP2 = new FloorP2()
let player1 = new Farah()
let player2 = new Tomasa()


// LISTENERS


addEventListener('keydown', e => {
  
  keys[e.keyCode] = true
  if (e.keyCode === 83) {
    grab.play()
    bisketoCollitionP1() 
  }
  if (e.keyCode === 40) {
    grab.play()
    bisketoCollitionP2() 
  }

  if (e.keyCode === 190) {
    backgroundMusic.play()
  }

  if (e.keyCode === 71) {
    button.play()
    startGame()
  }

  if (e.keyCode === 72) {
    button.play()
    restart()
  }

  //DOM
  if (e.keyCode === 49) {
    document.getElementById('player1').classList.remove('off')
    document.getElementById('onePlayer').classList.add('off')
    document.getElementById('twoPlayer').classList.add('off')
    document.getElementById('keys-left').classList.remove('off')
    document.getElementById('keys-left').classList.add('on')
    button.play()
    intro_screen()
  }

  if (e.keyCode === 50) {
    document.getElementById('player1').classList.remove('off')
    document.getElementById('player2').classList.remove('off')
    document.getElementById('onePlayer').classList.add('off')
    document.getElementById('twoPlayer').classList.add('off')
    document.getElementById('keys-left').classList.remove('off')
    document.getElementById('keys-left').classList.add('on')
    document.getElementById('keys-right').classList.remove('off')
    document.getElementById('keys-right').classList.add('on')
    button.play()
    intro_screen()
  }

  //DOM 2
  if (e.keyCode === 87) { document.getElementById('w-key').classList.add('key-press') }
  if (e.keyCode === 68) { document.getElementById("d-key").classList.add("key-press") }
  if (e.keyCode === 65) { document.getElementById('a-key').classList.add('key-press') }
  if (e.keyCode === 83) { document.getElementById('s-key').classList.add('key-press') }
  if (e.keyCode === 38) { document.getElementById('up-key').classList.add('key-press') }
  if (e.keyCode === 37) { document.getElementById('left-key').classList.add('key-press') }
  if (e.keyCode === 40) { document.getElementById('down-key').classList.add('key-press') }
  if (e.keyCode === 39) { document.getElementById('right-key').classList.add('key-press') }
})

addEventListener('keyup', e=>{
  keys[e.keyCode] = false
  if (e.keyCode === 87) { document.getElementById('w-key').classList.remove('key-press') }
  if (e.keyCode === 68) { document.getElementById("d-key").classList.remove("key-press") }
  if (e.keyCode === 65) { document.getElementById('a-key').classList.remove('key-press') }
  if (e.keyCode === 83) { document.getElementById('s-key').classList.remove('key-press') }
  if (e.keyCode === 38) { document.getElementById('up-key').classList.remove('key-press') }
  if (e.keyCode === 37) { document.getElementById('left-key').classList.remove('key-press') }
  if (e.keyCode === 40) { document.getElementById('down-key').classList.remove('key-press') }
  if (e.keyCode === 39) { document.getElementById('right-key').classList.remove('key-press') }
})


// ACTIONS 




