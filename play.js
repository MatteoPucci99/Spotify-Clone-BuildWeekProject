

// js del player da collegare


function espandi() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}


function playA() {
    let song = JSON.parse(window.localStorage.getItem("traccia"))

    let aux = document.querySelector(".player");
    if (aux.paused || aux.currentTime === 0 || aux.ended) {
        avviaTraccia(aux, song)
    } else {
        fermaTraccia(aux)
        avviaTraccia(aux, song)
    }
}

function avviaTraccia(player, traccia) {
    player.src = traccia.preview;
    player.play();
    seconds = 1;
    let fillerBarElement = document.querySelector("#filler_bar-time");
    fillerBarElement.style.animation = 'none';
    fillerBarElement.offsetHeight; /* trigger reflow */
    fillerBarElement.style.animation = null;

    setStartFillerBar();
    setNameArtistSong(traccia);
}

function fermaTraccia(player) {
    player.pause();
    setPauseFillerBar();
}



function selectedHeart() {
    let btnHeart = document.getElementById("heart");
    let btnHeartFill = document.getElementById("heart-fill");
    let modalPlaceholder = document.getElementById("modal-placeholder");
    let replaceTxtAdded = document.querySelector("#replace-txt-added");
    let replaceTxtRemoved = document.querySelector("#replace-txt-removed");

    btnHeart.classList.toggle("d-none");
    btnHeartFill.classList.toggle("d-none");

}

function selectedPlayPause() {
    let btnPlay = document.getElementById("btn_play");
    let btnPause = document.getElementById("btn_pause");
    let aux = document.querySelector(".player");

    if (!aux.paused) {
        fermaTraccia(aux)
    } else {
        aux.play()
        setStartFillerBar();
    }

    btnPlay.classList.toggle("d-none");
    btnPause.classList.toggle("d-none");
}

function selectedBtnMuteAudio() {
    let btnVolumeUp = document.querySelector("#btn_volume-up");
    let btnVolumeMute = document.querySelector("#btn_volume-mute");

    btnVolumeMute.classList.toggle("d-none");
    btnVolumeUp.classList.toggle("d-none");
}

function selectedBtnAudioColorizeGreen(event) {
    let btnSelected = event.querySelector(".bi");
    btnSelected.classList.toggle("btn_colorize-green");
}

function selectedModalControlDevic() {
    let modalElement = document.getElementById("modal_control-device");

    modalElement.classList.toggle("d-none");
}

let seconds = 1;
let clearIntervalID = 0;

function setStartFillerBar() {
    const progressTimeElement = document.querySelector("#progress-time");
    const fillerBarElement = document.querySelector("#filler_bar-time");

    fillerBarElement.classList.add("animation_filler-bar");

    const changeSeconds = setInterval(() => {
        if (seconds < 10) {
            seconds = "0" + `${seconds}`;
        }

        progressTimeElement.innerHTML = `0:${seconds}`;
        seconds++;

        clearIntervalID = changeSeconds;

        if (seconds === 31) {
            clearInterval(changeSeconds);
            seconds = 1;
        }
    }, 1000);

    if (fillerBarElement.className.includes("paused-animation_filler-bar")) {
        fillerBarElement.classList.remove("paused-animation_filler-bar");
    }
}

function setPauseFillerBar() {
    let fillerBarElement = document.querySelector("#filler_bar-time");

    fillerBarElement.classList.toggle("paused-animation_filler-bar");

    clearInterval(clearIntervalID);
}

function setNameArtistSong(traccia) {
    document.querySelector("#cover-player").src = traccia.album.cover_xl;
    document.querySelector("#sub-test_player").innerHTML = `<a href="artist.html" onclick='localStorage.setItem("id_artist", ${traccia.artist.id})'>${traccia.artist.name}</a>`;
    document.querySelector("#title-song").innerHTML = traccia.title_short;
}

let newObj;

function getAudioObj(audioPreview) {
    newObj = new Audio(audioPreview);
}

function changeVolume(rangeValue) {
    let playerElement = document.querySelector(".player");
    playerElement.volume = rangeValue;
}

let audioState = false;
function mutedAudio() {
    let playerElement = document.querySelector(".player");

    if (audioState === false) {
        playerElement.muted = true;
        audioState = true;
    } else {
        playerElement.muted = false;
        audioState = false;
    }
}