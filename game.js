// Iteration 1: Declare variables required for this game
let gameBody = document.getElementById('game-body')
let timerBox = document.getElementById('timer')
let zombieID = 0;


// Iteration 1.2: Add shotgun sound
let shotgun = new Audio('./assets/shotgun.wav')
gameBody.addEventListener('click', ()=>{
    shotgun.pause()
    shotgun.currentTime = 0
    shotgun.play()
})

// Iteration 1.3: Add background sound
let bgm = new Audio('./assets/bgm.mp3')
bgm.play()
bgm.loop = true

// Iteration 1.4: Add lives
let lives = 4

// Iteration 2: Write a function to make a zombie
function makeZombie(){
    let zombie = document.createElement("img")
    let zomImg = getRandInt(1,7)
    zombie.src = `./assets/zombie-${zomImg}.png`
    zombie.classList.add("zombie-image")
    zombie.id = `zombie${zombieID}`
    let transx = getRandInt(10,90)
    zombie.style.transform = `translateX(${transx}vw)`
    gameBody.append(zombie)
    zombie.style.animationDuration = `${getRandInt(3,6)}s`

    zombie.onclick = ()=>{
        killzombie(zombie)
    }
}

// Iteration 3: Write a function to check if the player missed a zombie
function check(){
    let zombie = document.getElementById(`zombie${zombieID}`)
    if (zombie.getBoundingClientRect().top <= 0){
        lives--
        killzombie(zombie)
    }
    console.log(lives)
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function killzombie(zombie){
    zombie.style.display = "none"
    zombieID++
    makeZombie()
}

// Iteration 5: Creating timer
function startTimer(){
    let time = 20
    timerBox.textContent = time
    setInterval(() => {
        time--
        timerBox.textContent = time
        check()
        if (lives == 0){
            window.location.href = "./game-over.html"
        }
        if (time==0){
            window.location.href = "./win.html"
        }
    }, 1000);
}
startTimer()

// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie()

// Iteration 7: Write the helper function to get random integer
function getRandInt(min, max){
    return Math.floor(Math.random()*(max-min) + min)
}   