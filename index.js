const secondsEl = document.querySelector("#seconds")
const minutesEl = document.querySelector("#minutes")
const hoursEl = document.querySelector("#hours")
const daysEl = document.querySelector("#days")
//ds a leading zero to a number if it is between 0 and 9
const padZeros = (num) => {
 return num >= 0 && num < 10 ? `0${num}` : num
}
const flipCard = (el, card) => {
 card.addEventListener("transitionend", () => {
  //the flipped class is removed from the clone, and the old card is replaced by the new one
  const clonedCard = card.cloneNode(true)
  clonedCard.classList.remove("flipped")

  try {
   el.replaceChild(clonedCard, card)
  } catch (e) {
   console.log(e)
  }
  card = clonedCard
 })
 //If the card isn't already flipped, it adds the flipped class to start the flip animation
 if (!card.classList.contains("flipped")) {
  card.classList.add("flipped")
 }
}

// setup card
const setupCard = (el, currentTime, nextTime, resetTime) => {
 currentTime = padZeros(currentTime)
 nextTime = padZeros(nextTime)
 //The .card, .card-face__front, and .card-face__back elements are selected
 const card = el.querySelector(".card")
 const cardFaceFront = el.querySelector(".card-face__front")
 const cardFaceBack = el.querySelector(".card-face__back")
 // data-current-number and data-next-number are set on the card container (el)
 el.setAttribute("data-current-number", currentTime)
 el.setAttribute("data-next-number", nextTime)
 //The current time is set on the front face of the card, and the next time is set on the back face
 cardFaceFront.innerText = currentTime
 cardFaceBack.innerText = nextTime
 //if resetTime is true, it calls the flipCard function to flip the card
 resetTime && flipCard(el, card)
}

const updateDOM = (el, currentTime, resetTime) => {
 let nextTime = currentTime - 1
 //Initially, the next time is one less than the current time (5,4,3,..)
 if (resetTime) {
  // If resetTime is provided and the current time reaches zero or goes negative, it adjusts currentTime and nextTime based on the reset values. For example, if seconds reach zero, they are reset to 59
  if (currentTime === 0) {
   nextTime = resetTime
  } else if (currentTime === -1) {
   currentTime = resetTime
   nextTime = resetTime - 1
  }
 }
 //setupCard to update the DOM and trigger the flip animation
 setupCard(el, currentTime, nextTime, resetTime)
}

const HOURS = 24 // 1 day
const MINUTES = 60 // 1 hr
const SECONDS = 60 // 1 min
//initialized to some starting point
let days = 18
let hours = 23
let minutes = 59
let seconds = 59//until 1/novmber

let interval
//This function handles the countdown for days/hours/seconds/ When called, it decreases days/hours/seconds/ by 1 and updates the DOM. If days/hours/seconds/ is already at zero, the countdown stops
const countdownDays = () => {
 if (days > 0) {
  days--
  updateDOM(daysEl, days, days)
 } else {
  return
 }
}
//hours
const countdownHours = () => {
 hours--
 updateDOM(hoursEl, hours, HOURS)

 if (hours < 0) {
  countdownDays()
  hours = HOURS
 }
}
//mins
const countdownMinutes = () => {
 minutes--
 updateDOM(minutesEl, minutes, MINUTES)

 if (minutes < 0) {
  countdownHours()
  minutes = MINUTES
 }
}
///seconds
const countdownSeconds = () => {
 seconds--
 updateDOM(secondsEl, seconds, SECONDS)

 if (seconds < 0) {
  countdownMinutes()
  seconds = SECONDS
 }
}
//If all time units (days, hours, minutes, seconds) reach zero, it logs "END!!" and clears the countdown interval (stopping the countdown)/Otherwise, it decrements the seconds by calling countdownSeconds()
const countdown = () => {
 if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
  console.log("END!!")
  clearInterval(interval)
  return
 }

 countdownSeconds()
}
//sets up an interval to call the countdown function every second (1000 milliseconds)
const startCountdown = () => {
 interval = setInterval(countdown, 1000)
}
//Before starting the countdown, it initializes the DOM by calling updateDOM() for each time unit (days, hours, minutes, and seconds) to set the initial values in the UI//It then starts the countdown by calling startCountdown().

updateDOM(secondsEl, seconds)
updateDOM(minutesEl, minutes)
updateDOM(hoursEl, hours)
updateDOM(daysEl, days)

startCountdown()
