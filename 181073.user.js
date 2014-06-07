// ==UserScript==
// @name        console++
// @namespace   consoleplus
// @description extended options of consol, description here js4.it/blog
// @include     *
// @version     1
// ==/UserScript==
(function (console) {

var i,
	global  = this,
	fnProto = Function.prototype,
	fnApply = fnProto.apply,
	fnBind  = fnProto.bind,
	bind    = function (context, fn) {
		return fnBind ?
			fnBind.call( fn, context ) :
			function () {
				return fnApply.call( fn, context, arguments );
			};
	},
	methods = 'assert count debug dir dirxml error group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd trace warn'.split(' '),
	emptyFn = function(){},
	empty   = {},
	timeCounters;

for (i = methods.length; i--;) empty[methods[i]] = emptyFn;

if (console) {
	
	if (!console.time) {
		console.timeCounters = timeCounters = {};
		
		console.time = function(name, reset){
			if (name) {
				var time = +new Date, key = "KEY" + name.toString();
				if (reset || !timeCounters[key]) timeCounters[key] = time;
			}
		};

		console.timeEnd = function(name){
			var diff,
				time = +new Date,
				key = "KEY" + name.toString(),
				timeCounter = timeCounters[key];
			
			if (timeCounter) {
				diff  = time - timeCounter;
				console.info( name + ": " + diff + "ms" );
				delete timeCounters[key];
			}
			return diff;
		};
	}
	
	for (i = methods.length; i--;) {
		console[methods[i]] = methods[i] in console ?
			bind(console, console[methods[i]]) : emptyFn;
	}
	console.disable = function () { global.console = empty;   };
	  empty.enable  = function () { global.console = console; };
	
	empty.disable = console.enable = emptyFn;
	
} else {
	console = global.console = empty;
	console.disable = console.enable = emptyFn;
}
    global.log = function(){
        fn = console.log;
        args = arguments;
  		console.log.history = log.history || []; 
  		console.log.history.push(arguments);
        // Performance optimization: http://jsperf.com/apply-vs-call-vs-invoke
      switch (args.length) {
        case  0: return fn();
        case  1: return fn(args[0]);
        case  2: return fn(args[0], args[1]);
        case  3: return fn(args[0], args[1], args[2]);
        case  4: return fn(args[0], args[1], args[2], args[3]);
        case  5: return fn(args[0], args[1], args[2], args[3], args[4]);
        case  6: return fn(args[0], args[1], args[2], args[3], args[4], args[5]);
        case  7: return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        case  8: return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        case  9: return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
        case 10: return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        default: return fn.apply(console, args);
      }
};
    log('console++ init');

})( typeof console === 'undefined' ? null : console );
