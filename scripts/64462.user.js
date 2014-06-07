// ==UserScript==
// @name           Log4GM
// @namespace      marcoratto
// @version        0.5
// @date           2013-03-30
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @description    Logging For Greasemonkey
// @include        nowhere
// ==/UserScript==

var Log4GM = {
    
	 // Only for this class
    INTERNAL : 7,

	 // None
    NONE : 6,
    
	 // Severe errors that cause premature termination. Expect these to be immediately visible on a status console.     
    FATAL : 5,
    
	 // Other runtime errors or unexpected conditions. Expect these to be immediately visible on a status console.
    ERROR : 4,
    
	 // Use of deprecated APIs, poor use of API, 'almost' errors, other runtime situations that are undesirable or unexpected, but not necessarily "wrong". Expect these to be immediately visible on a status console.     
    WARN : 3,
    
	 // Interesting runtime events (startup/shutdown). Expect these to be immediately visible on a console, so be conservative and keep to a minimum.
    INFO : 2,

    // Detailed information on flow of through the system. Expect these to be written to logs only.    
    DEBUG : 1,

    // Detailed information on flow of through the system. Expect these to be written to logs only.     
    TRACE : 0,
	 	 	 
    LEVEL_NAMES : new Array("TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL", "NONE", "INTERNAL"),
	 	 
	 'loggingLevel' : this.TRACE, 
	 	 
	 'log' : function (level, message) {
	   if (level < this.TRACE || level > this.INTERNAL) {
         alert("Logging level must be between TRACE(" + this.TRACE + ") and NONE(" + this.NONE + ")");
       }
      if ((level < this.loggingLevel) && (level != this.INTERNAL)) {
            return;
      }
	   if (typeof GM_log == 'function') {
		   GM_log(this.LEVEL_NAMES[this.loggingLevel] + "-" + message); 
	   } else {
		   alert(this.LEVEL_NAMES[this.loggingLevel] + "-" + message);
	   }
   },
	
	'setLoggingLevel' : function (level) {
        if (level < this.TRACE || level > this.NONE) {
            return;
        }
        this.loggingLevel = level;
		this.log(this.INTERNAL, "Level set to " + this.LEVEL_NAMES[this.loggingLevel]);
   },
	
	'getLoggingLevel' : function () {
        return this.loggingLevel;
   },
	
	'trace' : function (message) {
    	this.log(this.TRACE, message);    	
   }, 
	
	'debug' : function (message) {
    	this.log(this.DEBUG, message);    	
   },
	
	'info' : function (message) {
    	this.log(this.INFO, message);    	
   }, 
	
	'warn' : function (message) {
    	this.log(this.WARN, message);    	
   },	
	'error' : function (message) {
    	this.log(this.ERROR, message);    	
   },	
	'fatal' : function (message) {
    	this.log(this.FATAL, message);    	
   },
	'internal' : function (message) {
    	this.log(this.INTERNAL, message);    	
   },
	'init' : function(level) {
		this.loggingLevel = this.INTERNAL;
		var value = this.getValue('Log4GM_level');		
		if (value == undefined) {
			this.setLoggingLevel(level);
		} else {
		  try {
			this.loggingLevel = parseInt(value, 10);
		  } catch (err) {
			this.internal("Error:" + err);
			this.setLoggingLevel(level);
		  }
		}		
		this.setValue('Log4GM_level', this.loggingLevel);
	},
	
	'setValue' : function (key, value) {
	  if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {
	        localStorage.setItem(key, value);
	  } else {
		GM_setValue(key, value);
	  }
	  this.internal(key + "=" + value);
	},

	'getValue' : function (key, defaultValue) {
	  var out = defaultValue;
	  if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {
		out = localStorage.getItem(key);
	  } else {
		out = GM_getValue(key, defaultValue);
	  }
	  this.internal(key + "=" + out);
	  return out;
	}
};

Log4GM.init(Log4GM.TRACE);
