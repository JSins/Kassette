const song = new Howl({
    src: ["audio/crosby.mp3"],
    volume: 0.5,
  });

const play = new Howl({
    src: ['audio/play3.mp3']
})

const pause = new Howl({
    src: ['audio/pause.mp3']
})

const noise = new Howl({
    src: ['audio/noise.mp3'],
    loop: true
})

const stopsound = new Howl({
    src: ['audio/Stop.mp3']
})

const revsound = new Howl({
    src: ['audio/rev.mp3'],
    loop: true
})

const forsound = new Howl({
    src: ['audio/for.mp3'],
    loop: true
})

const revclick = new Howl({
    src: ['audio/revclick.mp3'],
    volume: 0.5
})









let playing = false;
let reving = false;
let forwarding = false;
let revtimer;
let fortimer;
let revcounter = 0;
let forcounter = 0;

$('#play').click(function(){
if(playing == false)
{
    stopcounters();
    playing = true;

    song.play();
    play.play();
    noise.play();
}
else if(playing == true)
{
    playing = false;

    song.pause();
    noise.stop();
    pause.play();
}
})

$('#stop').click(function()
{
    stopcounters();
    playing = false;

    noise.stop();
    song.pause();
    stopsound.play();
})

$('#rev').click(function(){
    if(reving == false)
    {
        clearInterval(fortimer);
        reving = true;
        forwarding = false;
        playing = false;

        noise.stop();
        song.pause();

        forsound.stop();
        revsound.play();
        revclick.play();

        revtimer = setInterval(function(){
            revcounter--;
            console.log(revcounter);
        }, 500)
    } 
})

$('#for').click(function(){
    if(forwarding == false)
    {
        clearInterval(revtimer);
        forwarding = true;
        reving = false;
        playing = false;

        noise.stop();
        song.pause();

        revsound.stop();
        forsound.play();
        revclick.play();

        fortimer = setInterval(function(){
            song.seek();
            forcounter++;
            console.log(forcounter);
        }, 500)
    } 
})

let countersum;
let currentpos;

function stopcounters(){
    // Neue Zeit berechnen ---------------
    countersum = revcounter + forcounter;
    currentpos = song.seek();
    console.log(countersum);
    song.seek(currentpos + countersum);
    // -----------------------------------

    // Spulenreset -----------------------
    reving = false;
    forwarding = false;
    clearInterval(revtimer);
    clearInterval(fortimer);
    revcounter = 0;
    forcounter = 0;
    // -----------------------------------

    // Soundstop -------------------------
    revsound.stop();
    forsound.stop();
    // -----------------------------------
}

$(document).on("input", "#volslider", function () {
    song.volume($('#volslider').val() / 100);
});



song.once('load', function(){
console.log(song.duration());
});

setInterval(function(){
setsize();
},10);

let turn1size;

function setsize(){
    turn1size = 1.7 - song.seek() * 0.0033;
    console.log(turn1size);
    $('#turn1').css("transform", "scale(" + turn1size + ");")
}
  
