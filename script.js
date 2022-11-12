var preloader = document.getElementById("preloader");
window.addEventListener('load', function () {
    preloader.style.display = 'none';
})

// Homepage script
var myDate = new Date();
var hrs = myDate.getHours();
var greet;

if (hrs < 12)
    greet = 'Good Morning';
else if (hrs >= 12 && hrs < 17)
    greet = 'Good Afternoon';
else if (hrs >= 17 && hrs < 24)
    greet = 'Good Evening';

let greeting = document.getElementById('greeting');
if (greeting != null)
    greeting.innerHTML = greet;

// Navigation Code
function navigateAlbum(ele) {
    window.location.href = `album.html?albumSelected=${ele.id}`;
}
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
albumSelected = params.albumSelected;


// Album Page Script
let songs = new Array();
if (albumSelected === 'rrr_ost') {
    myAlbumTitle = 'RRR OST Vol - 1';
    myAlbumCover = `covers/${albumSelected}.png`;
    songs.push({ songName: 'Raamam Bheemam', filePath: 'songs/RRR_OST/1.mp3', duration: '5:33' },
        { songName: 'Together We Rock', filePath: 'songs/RRR_OST/2.mp3', duration: '3:35' },
        { songName: 'The Fire', filePath: 'songs/RRR_OST/3.mp3', duration: '0:37' },
        { songName: 'The Water', filePath: 'songs/RRR_OST/4.mp3', duration: '0:52' },
        { songName: 'Please Forgive Me', filePath: 'songs/RRR_OST/5.mp3', duration: '1:02' },
        { songName: 'New Attire', filePath: 'songs/RRR_OST/6.mp3', duration: '0:34' },
        { songName: 'Prodigious Precision', filePath: 'songs/RRR_OST/7.mp3', duration: '1:47' },
        { songName: 'Spirit of RRR', filePath: 'songs/RRR_OST/8.mp3', duration: '0:38' });
    document.getElementById("containerBgColor").style.backgroundColor = "rgba(102, 90, 37, 0.76)";
} else if (albumSelected === 'rrr') {
    myAlbumTitle = 'RRR';
    myAlbumCover = `covers/${albumSelected}.png`;
    songs.push({ songName: 'Dosti', filePath: 'songs/R3/1.mp3', duration: '5:40' },
        { songName: 'Naatu Naatu', filePath: 'songs/R3/2.mp3', duration: '3:28' },
        { songName: 'Janani', filePath: 'songs/R3/3.mp3', duration: '3:09' },
        { songName: 'Komuram Bheemudo', filePath: 'songs/R3/4.mp3', duration: '4:08' },
        { songName: 'Raamam Raaghavam', filePath: 'songs/R3/5.mp3', duration: '3:51' },
        { songName: 'Etthara Jenda', filePath: 'songs/R3/6.mp3', duration: '4:22' },
        { songName: 'Komma Uyyala', filePath: 'songs/R3/7.mp3', duration: '4:44' });
    document.getElementById("containerBgColor").style.backgroundColor = "rgba(114, 86, 59, 0.76)";
} else if (albumSelected === 'pushpa') {
    myAlbumTitle = 'Pushpa - The Rise';
    myAlbumCover = `covers/${albumSelected}.png`;
    songs.push({ songName: 'Jaago Jaago Bakre', filePath: 'songs/Pushpa/1.mp3', duration: '4:57' },
        { songName: 'Srivalli', filePath: 'songs/Pushpa/2.mp3', duration: '3:44' },
        { songName: 'Oo Bolega Ya Oo Oo Bolega', filePath: 'songs/Pushpa/3.mp3', duration: '3:46' },
        { songName: 'Saami Saami', filePath: 'songs/Pushpa/4.mp3', duration: '3:47' },
        { songName: 'Eyy Bidda Ye Mera Adda', filePath: 'songs/Pushpa/5.mp3', duration: '3:56' });
    document.getElementById("containerBgColor").style.backgroundColor = "rgba(47, 107, 77, 0.76)";
} else if (albumSelected === 'sita_ramam') {
    myAlbumTitle = 'Sita Ramam';
    myAlbumCover = `covers/${albumSelected}.png`;
    songs.push({ songName: 'Oh Sita Hey Rama', filePath: 'songs/Sita_Ramam/1.mp3', duration: '4:12' },
        { songName: 'Inthandham', filePath: 'songs/Sita_Ramam/2.mp3', duration: '3:44' },
        { songName: 'Kaanunna Kalyanam', filePath: 'songs/Sita_Ramam/3.mp3', duration: '3:58' },
        { songName: 'Oh Prema', filePath: 'songs/Sita_Ramam/4.mp3', duration: '3:34' });
    document.getElementById("containerBgColor").style.backgroundColor = "rgba(26, 45, 73, 0.76)";
}

let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath);
let masterPlay = document.getElementById('masterPlay');
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let masterSongCover = document.getElementById('masterSongCover');
let masterSongDuration = document.getElementById('masterSongDuration');
let masterSongProgressDuration = document.getElementById('masterSongProgressDuration');

document.getElementById('albumTitle').innerText = myAlbumTitle;
document.getElementById('albumCover').src = myAlbumCover;

songs.forEach((element, i) => {
    songItemContainer.innerHTML += `<div class="songItem">
    <img src="${myAlbumCover}" alt="${i + 1}">
    <span class="songName">${element.songName}</span>
    <span class="songListPlay">
        <span class="timestamp">${element.duration}</span>
        <i id='${i}'class="songItemPlay fa-solid fa-circle-play"></i>
    </span>
    </div>`
})

let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

const makeSongIndexPause = () => {
    songItemPlay[songIndex].classList.remove('fa-circle-play');
    songItemPlay[songIndex].classList.add('fa-circle-pause');
}

const zeroPad = (num) => String(num).padStart(2, '0');
masterSongName.innerText = songs[songIndex].songName;
masterSongDuration.innerText = songs[songIndex].duration;
masterSongProgressDuration.innerText = '0.00';
masterSongCover.src = myAlbumCover;

// Handle play pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        makeSongIndexPause();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.currentTime == audioElement.duration) {
        // For autoplay songs
        next.click();
    } else {
        progress = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = progress;
        seconds = parseInt(audioElement.currentTime);
        minutes = 0;
        if (seconds >= 60) {
            minutes = parseInt(seconds / 60);
            seconds -= minutes * 60;
        }
        masterSongProgressDuration.innerText = minutes + ':' + zeroPad(seconds);
    }
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

songItemPlay.forEach((element) => {
    element.addEventListener('click', () => {
        makeAllPlays();
        songIndex = parseInt(element.id);
        element.classList.remove('fa-circle-play');
        element.classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex].songName;
        masterSongDuration.innerText = songs[songIndex].duration;
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    })
})

next.addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    makeAllPlays();
    songItemPlay[songIndex].classList.remove('fa-circle-play');
    songItemPlay[songIndex].classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex].songName;
    masterSongDuration.innerText = songs[songIndex].duration;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
})

previous.addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 0;
    } else {
        songIndex--;
    }
    makeAllPlays();
    songItemPlay[songIndex].classList.remove('fa-circle-play');
    songItemPlay[songIndex].classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    masterSongDuration.innerText = songs[songIndex].duration;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
})