"use strict";
var debug=require('debug')('mocha:audioreporter'),
    Singer = require('singer'),
    sounds=require('mario-sounds');

module.exports = mocha_audio_reporter;

function mocha_audio_reporter(runner, options) {
  var failures=0,
      self=this, stopTest=false;

  if(!(this instanceof mocha_audio_reporter)) {
    return new mocha_audio_reporter(runner, options);
  }
  debug("%j", options);

  self.singer = new Singer();

  runner.on('start', function onStart(test) {
    // start playing music
    self.singer.sing( options.onStart || "" );
    self.singer.on('singing', function() {
      debug("singing still");
    });
    self.singer.on('end', function onEnd() {
      debug("done singing");
    });
  });

  runner.on('pass', function onTestPass(test){
    // play a happy tone
    if( options.onPass ) {
      self.singer.sing( options.onPass );
    }
  });

  runner.on('fail', function onTestFail(test, err){
    failures++;
    // play a sad tone
    if( options.onFail ) {
      self.singer.sing( options.onFail );
    }
  });

  runner.on('end', function onTestEnd(){
    debug("runner.end");
    // stop playing music
    self.singer.stop();
    if( failures && options.onSuiteFail ) {
      self.singer.sing( options.onSuiteFail );
    } else  if( options.onSuitePass ) {
      self.singer.sing( options.onSuitePass );
    }
  });

}