
document.body.style.background="#111"
document.body.style.textAlign="center"
document.body.style.fontFamily="Arial"
document.body.style.color="white"

let piano=document.createElement("div")
piano.style.display="flex"
piano.style.justifyContent="center"
piano.style.marginTop="40px"
document.body.appendChild(piano)

const notes={
a:261.63,
s:293.66,
d:329.63,
f:349.23,
g:392.00,
h:440.00,
j:493.88
}

const audioCtx=new (window.AudioContext||window.webkitAudioContext)()

let recording=false
let melody=[]
let startTime=0

function play(freq,element){

let osc=audioCtx.createOscillator()
let gain=audioCtx.createGain()

osc.frequency.value=freq
osc.type="sine"

osc.connect(gain)
gain.connect(audioCtx.destination)

osc.start()

gain.gain.setValueAtTime(1,audioCtx.currentTime)
gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+1)

osc.stop(audioCtx.currentTime+1)

element.style.background="orange"

setTimeout(()=>{
element.style.background="white"
},150)

}

for(let key in notes){

let btn=document.createElement("div")

btn.style.width="60px"
btn.style.height="220px"
btn.style.background="white"
btn.style.border="1px solid black"
btn.style.margin="2px"
btn.style.display="flex"
btn.style.alignItems="flex-end"
btn.style.justifyContent="center"
btn.style.fontWeight="bold"
btn.innerText=key.toUpperCase()

piano.appendChild(btn)

notes[key]={freq:notes[key],element:btn}

btn.onclick=()=>handleKey(key)

}

function handleKey(k){

let key=notes[k]

play(key.freq,key.element)

if(recording){
melody.push({
key:k,
time:Date.now()-startTime
})
}

}

document.addEventListener("keydown",e=>{
if(notes[e.key]) handleKey(e.key)
})

document.getElementById("record").onclick=()=>{

melody=[]
recording=true
startTime=Date.now()

}

document.getElementById("play").onclick=()=>{

recording=false

melody.forEach(note=>{
setTimeout(()=>{
handleKey(note.key)
},note.time)
})

}