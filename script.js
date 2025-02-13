
const yearsEl = document.querySelector("#Years");
const daysEl = document.querySelector("#Days");
const hoursEl = document.querySelector("#Hours");
const minutesEl = document.querySelector("#Minutes");
const secondsEl = document.querySelector("#seconds");


const startDate = new Date("May 24, 2023 10:00:00").getTime();

function updateTime() {
    const now = new Date().getTime();

    const elapsed = now - startDate;

    const years = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor((elapsed % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    yearsEl.textContent = years.toString().padStart(2, '0');
    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateTime, 1000);

updateTime();

document.addEventListener("scroll", function() {
    let cards = document.querySelectorAll(".flip-inner");
    let windowHeight = window.innerHeight;
    let scrollPosition = window.scrollY + windowHeight / 2;

    cards.forEach(card => {
        let cardTop = card.parentElement.getBoundingClientRect().top + window.scrollY;
        
        if (scrollPosition >= cardTop && scrollPosition < cardTop + windowHeight) {
            card.style.transform = "rotateY(180deg)";
        } else {
            card.style.transform = "rotateY(0deg)";
        }
    });
});


const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const slider = document.querySelector('#myRange')


const songs = ['Palagi', 'Paninindigan Kita', 'Nothing', 'Ikot', 'Sinta', 'bad']
let songIndex = 0;

loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}


// Event Listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    }
    else {
        playSong()
    }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)

slider.oninput = function () {
    audio.volume = this.value / 100 - 0.2;
}


const envelope = document.querySelector('.envelope-wrapper');
envelope.addEventListener('click', () => {
    envelope.classList.toggle('flap');
});