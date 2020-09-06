const song = new Howl({
    src: ["audio/crosby.mp3"],
    volume: 0.5,
  });

const play = new Howl({
    src: ['audio/play3.mp3']
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

let playing = false;
let reving = false;
let forwarding = false;

$('#play').click(function(){
    revsound.stop();
if(playing == false)
{
    playing = true;
    play.play();
    noise.play();
}
else if(playing ==true)
{
    playing = false;
    song.pause();
    noise.stop();
}
})

$('#stop').click(function(){
    noise.stop();
    song.stop();
    stopsound.play();
    revsound.stop();
    playing = false;
    reving = false;
})

$('#rev').click(function(){
    reving = true;
    playing = false;
    noise.stop();
    song.pause();
    revsound.play();
    
})