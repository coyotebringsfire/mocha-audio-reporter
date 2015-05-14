"use strict";
var debug=require('debug')('mocha:audioreporter'),
    Singer = require('singer'),
    sounds=require('mario-sounds');

module.exports = mocha_audio_reporter;

function mocha_audio_reporter(runner, options) {
  var failures=0,
      player, stopTest=false;

  if(!(this instanceof mocha_audio_reporter)) {
    return new mocha_audio_reporter(runner, options);
  }

  runner.on('start', function onStart(test) {
    function onDonePlaying(err, player) {
      debug('playend!');
      currentSong=player.play(onDonePlaying);
    }
    // start playing music
    singer = new Singer();
    // play now and callback when playend
    var currentSong=singer.sing();
    currentSong.on('playing', function onPlaying() {
      debug("playing");
    })
    currentSong.on('done', onDonePlaying);
    currentSong.on('stopped', function onStopped() {
      debug("stopped");    
    });
  });

  runner.on('pass', function onTestPass(test){
    // play a happy tone
    singer = new Player();
    singer.sing(sounds["smb_coin"]);
  });

  runner.on('fail', function onTestFail(test, err){
    failures++;
    // play a sad tone
    singer = new Player();
    singer.sing(sounds["smb_mariodie"]);
  });

  runner.on('end', function onTestEnd(){
    debug("runner.end");
    // stop playing music
    singer.stop();
    singer= new Singer();
    if( failures ) {
      singer.sing(sounds["smb_gameover"]);
    } else {
      singer.sing(sounds["smb_stage_clear"]);
    }
  });
}