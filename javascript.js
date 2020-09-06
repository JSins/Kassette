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

const spulstop = new Howl({
    src: ['audio/spulstop.mp3']
})



let playing = false;
let reving = false;
let forwarding = false;
let revtimer;
let fortimer;
let timer;
let timerintervall;
let rotation1 = 0;
let rotation2 = 0;


timer = setInterval(function(){
    if(song.seek() < song.duration())
    {
        setsize();
    }

    if(playing == true)
    {
        rotation1 = rotation1 + 5 + 0.03 * song.seek();
        rotation2 = rotation2 + 10 - 0.03 * song.seek();
        $('#turner1').css("transform", "rotate(" + rotation1 + "deg)");
        $('#turner2').css("transform", "rotate(" + rotation2 + "deg)");
    }

    if(forwarding == true)
    {
        rotation1 = rotation1 + 25;
        rotation2 = rotation2 + 25;
        $('#turner1').css("transform", "rotate(" + rotation1 + "deg)");
        $('#turner2').css("transform", "rotate(" + rotation2 + "deg)");
    }

    if(reving == true)
    {
        rotation1 = rotation1 - 25;
        rotation2 = rotation2 - 25;
        $('#turner1').css("transform", "rotate(" + rotation1 + "deg)");
        $('#turner2').css("transform", "rotate(" + rotation2 + "deg)");
    }

    endchecker();
},50);


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
            currentpos = song.seek();
            song.seek(currentpos - 0.5);
            console.log(currentpos);
        }, 50)
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
            currentpos = song.seek();
            song.seek(currentpos + 0.5);
            console.log(currentpos);
        }, 50)
    } 
})

let countersum;
let currentpos;

function stopcounters(){
    // Spulenreset -----------------------
    reving = false;
    forwarding = false;
    clearInterval(revtimer);
    clearInterval(fortimer);
    // -----------------------------------

    // Soundstop -------------------------
    revsound.stop();
    forsound.stop();
    // -----------------------------------
}

$(document).on("input", "#volslider", function () {
    song.volume($('#volslider').val() / 100);
});



// song.once('load', function(){
// console.log(song.duration());
// });

let turn1size;
let turn2size;

function setsize(){
    turn1size = 1.3 - song.seek() * (0.6 / song.duration());
    $('#turn1').css("transform", "scale(" + turn1size + ")");

    turn2size = 0.7 + song.seek() * (0.6 / song.duration());
    $('#turn2').css("transform", "scale(" + turn2size + ")");
}

function endchecker(){
    if(song.seek() >= song.duration())
    {
        stopcounters();
        playing = false;

        noise.stop();
        song.pause();
        stopsound.play();
        song.seek(song.duration() - 2);
    }
}

song.on('end', function(){
    playing = false;
    noise.stop();
    stopsound.play();
});
  
