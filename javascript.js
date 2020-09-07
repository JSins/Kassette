const song = new Howl({
    src: ['audio/volume4.mp3'],
    html5: true
});

const play = new Howl({
    src: ['audio/play3.mp3'],
    html5: true
})

const pause = new Howl({
    src: ['audio/pause.mp3']
})

const noise = new Howl({
    src: ['audio/noise.mp3'],
    loop: true,
    html5: true,
    volume: 0.2
})

const stopsound = new Howl({
    src: ['audio/stop.mp3'],
    html5: true
})

const revsound = new Howl({
    src: ['audio/rev.mp3'],
    html5: true,
    loop: true
})

const forsound = new Howl({
    src: ['audio/for.mp3'],
    html5: true,
    loop: true
})

const play1 = new Howl({
    src: ['audio/play3_01.mp3'],
    html5: true
})

const pause1 = new Howl({
    src: ['audio/pause_01.mp3'],
    html5: true
})

const stop1 = new Howl({
    src: ['audio/stop_01.mp3'],
    html5: true
})

const revclick = new Howl({
    src: ['audio/revclick.mp3'],
    html5: true,
    volume: 0.5
})


// Laden und ausfaden ---------------------------

    
$('#loadcontent').fadeIn(1000);

song.once('load', function(){
    setTimeout(function(){
        $('#load').css("width", "100%");
        setTimeout(function(){
            $('#loading').fadeOut(1000);
        }, 1000)
    }, 2000)
})  
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

    play1.play();
    noise.play();
    stopcounters();
    playing = true;
    
    song.play();
    play.play();
    

    $('#controlsplayfor').hide();
    $('#controlsrevplay').hide();
    $('#controlsrevplayfor').hide();
    $('#controlsrevfor').show();

    playturn = setInterval(function(){
        console.log('playing');
        setsize();
        rotation2 = rotation2 + 17 - song.seek() * (12 / song.duration());
        rotation1 = rotation1 + 5 + song.seek() * (12 / song.duration());
        $('#turner1').css("transform", "rotate(" + rotation1 + "deg)");
        $('#turner2').css("transform", "rotate(" + rotation2 + "deg)");
    },50);
}

function pausemusic()
{
    pause1.play();
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
    stop1.play();
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
        song.seek(currentpos - 0.7);

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
        song.seek(currentpos + 0.7);

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

$('#switch').click(function(){
    switchmusic();
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
  
