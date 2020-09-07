const song = new Howl({
    src: ["audio/anna.mp3"],
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
    loop: true,
    volume: 0.7
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


// Laden und ausfaden ---------------------------
song.once('load', function(){
    console.log(song.duration());
    $('#loadcontent').fadeIn(1000);
    setTimeout(function(){
        $('#load').css("width", "100%");
        setTimeout(function(){
            $('#loading').fadeOut(1000);
        }, 2500)
    }, 2000)
});
// ----------------------------------------------


let playing = false;
let reving = false;
let forwarding = false;
let revtimer;
let fortimer;
let timer;
let timerintervall;
let rotation1 = 0;
let rotation2 = 0;
let playturn;
let revtun;
let forturn;
let currentpos;
let turn1size;
let turn2size;

function playmusic()
{
    stopcounters();
    playing = true;
    noise.play();
    song.play();
    play.play();
    

    $('#controlsplayfor').hide();
    $('#controlsrevplay').hide();
    $('#controlsrevplayfor').hide();
    $('#controlsrevfor').show();

    playturn = setInterval(function(){
        console.log('playing');
        setsize();
        rotation1 = rotation1 + 5 + (song.seek()/15);
        rotation2 = rotation2 + 5 + ((song.duration() - song.seek())/15);
        $('#turner1').css("transform", "rotate(" + rotation1 + "deg)");
        $('#turner2').css("transform", "rotate(" + rotation2 + "deg)");
    },50);
}

function pausemusic()
{
    playing = false;
    song.pause();
    noise.stop();
    pause.play();
    $('#controlsplayfor').hide();
    $('#controlsrevplay').hide();
    $('#controlsrevplayfor').show();
    $('#controlsrevfor').hide();
    clearInterval(playturn);
}

function stopmusic()
{
    stopcounters();
    playing = false;
    noise.stop();
    song.pause();
    stopsound.play();
    $('#controlsplayfor').hide();
    $('#controlsrevplay').hide();
    $('#controlsrevplayfor').show();
    $('#controlsrevfor').hide();
    clearInterval(playturn);
}

function revmusic()
{
    clearInterval(playturn);
    clearInterval(fortimer);
    reving = true;
    forwarding = false;
    playing = false;

    noise.stop();
    song.pause();

    forsound.stop();
    revsound.play();
    revclick.play();

    $('#controlsplayfor').show();
    $('#controlsrevplay').hide();
    $('#controlsrevplayfor').hide();
    $('#controlsrevfor').hide();

    revtimer = setInterval(function(){
        console.log('revving');
        setsize();
        currentpos = song.seek();
        song.seek(currentpos - 0.5);

        rotation1 = rotation1 - 25;
        rotation2 = rotation2 - 25;
        $('#turner1').css("transform", "rotate(" + rotation1 + "deg)");
        $('#turner2').css("transform", "rotate(" + rotation2 + "deg)");
    }, 50)
}

function formusic()
{
    clearInterval(playturn);
    clearInterval(revtimer);
    forwarding = true;
    reving = false;
    playing = false;

    noise.stop();
    song.pause();

    revsound.stop();
    forsound.play();
    revclick.play();

    $('#controlsplayfor').hide();
    $('#controlsrevplay').show();
    $('#controlsrevplayfor').hide();
    $('#controlsrevfor').hide();

    fortimer = setInterval(function(){    
        console.log('forwarding'); 
        endchecker();
        setsize();
        currentpos = song.seek();
        song.seek(currentpos + 0.5);

        rotation1 = rotation1 + 25;
        rotation2 = rotation2 + 25;
        $('#turner1').css("transform", "rotate(" + rotation1 + "deg)");
        $('#turner2').css("transform", "rotate(" + rotation2 + "deg)");
    }, 50)
}




$('#play').click(function(){
if(playing == false)
{
    playmusic();
}
else if(playing == true)
{
    pausemusic();
}
})

$('#stop').click(function()
{
    stopmusic();
})

$('#rev').click(function(){
    if(reving == false)
    {
        revmusic();
    } 
})

$('#for').click(function(){
    if(forwarding == false)
    {
        formusic();
    } 
})



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


// Volume ------------------------------------------
$(document).on("input", "#volslider", function () {
    song.volume($('#volslider').val() / 100);
});
// -------------------------------------------------




// Spulengröße setzen -----------------------------------------
function setsize(){
    console.log(song.seek());
    turn1size = 1.3 - song.seek() * (0.6 / song.duration());
    $('#turn1').css("transform", "scale(" + turn1size + ")");

    turn2size = 0.7 + song.seek() * (0.6 / song.duration());
    $('#turn2').css("transform", "scale(" + turn2size + ")");
}
// ------------------------------------------------------------



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
    stopmusic();
});
  
