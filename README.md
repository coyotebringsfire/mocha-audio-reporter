#mocha-audio-reporter
##Description
A reporter for mocha that plays mp3 tunes on mocha events

##Tests
The automated tests for this reporter are in mocha-audio-reporter-test repo
```sh
$ git clone https://github.com/coyotebringsfire/mocha-audio-reporter-test.git
...
$ cd mocha-audio-reporter-test
mocha-audio-reporter-test $ npm install
...
mocha-audio-reporter-test$ npm test
...
```

##Usage

```sh
var mocha = new Mocha({
    ui: 'bdd',
    reporter: "mocha-audio-reporter",
    reporterOption: {
    	onStart: __dirname+"/audio/start.mp3",
    	onPass: __dirname+"/audio/pass.mp3",
    	onFail: __dirname+"/audio/fail.mp3",
    	onSuiteFailure: __dirname+"/audio/suite_failure.mp3",
    	onSuitePass: __dirname+"/audio/suite_pass.mp3"
	}
});
mocha.addFile("test/one.js");
mocha.run(...);
```

I like to use this with mocha-multi reporter, using spec to print test results, something like this
```sh
$ npm install mocha-multi
...
$ npm install mocha-audio-reporter
...
```

```sh
var mocha = new Mocha({
    ui: 'bdd',
    reporter: "mocha-multi",
    reporterOption: {
	    mocha-audio-reporter: {
		    stdout: '/dev/null',
	        options: {
		        onStart: __dirname+"/audio/start.mp3",
		        onPass: __dirname+"/audio/pass.mp3",
		        onFail: __dirname+"/audio/fail.mp3",
		        onSuiteFailure: __dirname+"/audio/suite_failure.mp3",
		        onSuitePass: __dirname+"/audio/suite_pass.mp3"
		    }
	    },
	    spec: {
		    stdout: "-"
		}
	}
});
mocha.addFile("test/one.js");
mocha.run(...);
```