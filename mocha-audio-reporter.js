"use strict";
var debug=require('debug')('mocha:audioreporter'),
    lame=require('lame'),
    Speaker=require('Speaker');

module.exports = mocha_audio_reporter;

function mocha_audio_reporter(runner, options) {
  var failures=0,
      self=this, stopTest=false;

  if(!(this instanceof mocha_audio_reporter)) {
    return new mocha_audio_reporter(runner, options);
  }
  debug("%j", options);

  self.speak=function(file) {
    var speaker=new Speaker({
      channels: 2,          // 2 channels 
      bitDepth: 16,         // 16-bit samples 
      sampleRate: 44100     // 44,100 Hz sample rate 
    });
    
    fs.createReadStream(file)
      .pipe(new lame.Decoder)
      .pipe(speaker);
    return speaker;
  };

  runner.on('start', function onStart(test) {});

  runner.on('pass', function onTestPass(test){
    // play a happy tone
    if( options.onPass ) {
      self.speak( options.onPass )
        .on('close', function speakerClosed() {
          debug("done playing");
        });
    }
    if( options.onPass === undefined ) {
      self.speak( __dirname+'/audio/testPass.mp3' )
        .on('close', function speakerClosed() {
          debug("done playing");
        });
    }
    if( options.onPass === null ) {
      debug("Not playing a sound");
    }
  });

  runner.on('fail', function onTestFail(test, err){
    failures++;
    // play a sad tone
    if( options.onFail ) {
      self.speak( options.onFail )
        .on('close', function speakerClosed() {
          debug("done playing");
        });
    }
    if( options.onFail === undefined ) {
      self.speak( __dirname+'/audio/testFail.mp3' )
        .on('close', function speakerClosed() {
          debug("done playing");
        });
    }
    if( options.onFail === null ) {
      debug("Not playing a sound");
    }
  });

  runner.on('end', function onTestEnd(){
    debug("runner.end");
    
    if( failures ) {
      debug("suite failed %j", options);
      if( options.onSuiteFail ) {
        debug('playing %s', options.onSuiteFail );
        self.speak( options.onSuiteFail )
          .on('close', function speakerClosed() {
            debug("done playing");
          });
      }
      if( options.onSuiteFail === undefined ) {
        debug('playing %s', __dirname+'/audio/suiteFail.mp3');
        self.speak( __dirname+'/audio/suiteFail.mp3' )
          .on('close', function speakerClosed() {
            debug("done playing");
          });
      }
    } else {
      debug("suite passed %j", options);
      if( options.onSuitePass ) {
        debug('playing %s', options.onSuitePass );
        self.speak( options.onSuitePass )
          .on('close', function speakerClosed() {
            debug("done playing");
          });
      }
      if( options.onSuitePass === undefined ) {
        debug('playing %s', __dirname+'/audio/suitePass.mp3');
        self.speak( __dirname+'/audio/suitePass.mp3' )
          .on('close', function speakerClosed() {
            debug("done playing");
          });
      }
    }
  });
}