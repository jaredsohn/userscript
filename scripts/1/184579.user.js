// ==UserScript==
// @name        YouTube Booster
// @namespace   http://userscripts.org/scripts/show/184579
// @author		jgjake2
// @description YouTube Booster adds several features to YouTube to enhance your experience - Media Resizer, Change Default Resolution, etc...
// @include     http://www.youtube.com/watch?*
// @include     http://www.youtube.com/feed/subscriptions
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     0.2.3
// @grant       GM_addStyle
// ==/UserScript==
(function(){

if (window.top != window.self) return;
if(typeof unsafeWindow === "undefined") unsafeWindow = window;
var DEBUG_MODE = "BETA";
//var DEBUG_MODE = "RELEASE";

/****************************************************************************************************************************************************
  Boolean Prototypes
*****************************************************************************************************************************************************/

function parseBoolean(str) {
  return /^true$/i.test(str);
}

function isBoolean(str) {
        return /^(?:true|false)$/i.test(str);
}

/****************************************************************************************************************************************************
  End Boolean Prototypes
****************************************************************************************************************************************************/



/****************************************************************************************************************************************************
  Array Prototypes
****************************************************************************************************************************************************/

if (!Array.prototype.forEach){
        Array.prototype.forEach = function(fun /*, thisp*/){
                var len = this.length;
                if (typeof fun != "function")
                throw new TypeError();
                var thisp = arguments[1];
                for (var i = 0; i < len; i++){
                        if (i in this) fun.call(thisp, this[i], i, this);
                }
        };
}

function newFilledArray(length, val) {
    var array = [];
    for (var i = 0; i < length; i++) {
        array[i] = val;
    }
    return array;
}

function parseSimpleArray(arr){
        //[arr, arrayData] = arr.match(/\[(.*?)\]/);
        var a = arr.match(/\[(.*?)\]/);
        var arrayData = a[1];
        var newArray = arrayData.split(',');
        for(var i in newArray) newArray[i] = String(newArray[i]).trim();
        return newArray;
}

/****************************************************************************************************************************************************
  End Array Prototypes
****************************************************************************************************************************************************/


/****************************************************************************************************************************************************
  String Prototypes
****************************************************************************************************************************************************/
String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.ltrim = function() {
        return this.replace(/^\s+/g,"");
}

String.prototype.rtrim = function() {
        return this.replace(/\s+$/g,"");
}

function isJSON(json) {
        var hasContainer = /\s*\{.*?\}\s*$/.test(json);
        json = json.replace(/\\["\\\/bfnrtu]/g, '@');
        json = json.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        json = json.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        return (/^[\],:{}\s]*$/.test(json) && hasContainer);
}

String.prototype.isJSON = function () {
        return isJSON(this);
}

function isArray(arr) {
        return (/\s*\[.*?\]\s*/.test(arr))
}

String.prototype.isArray = function () {
        return isArray(this);
}

String.prototype.isBoolean = function () {
        return isBoolean(this);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isDate(str) {
        return (isNumeric(str) && String(str).length >= 13);
}

String.prototype.isDate = function () {
        return isDate(this);
}

function isVersion(v) {
        return (/\s*((?:\d+\.)+\d)\s*$/.test(v))
}

String.prototype.isVersion = function () {
        return isVersion(this);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.capitalizeFirstOnly = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

/****************************************************************************************************************************************************
  End String Prototypes
*****************************************************************************************************************************************************/




/****************************************************************************************************************************************************
  Object Prototypes
****************************************************************************************************************************************************/

function defineGlobalProperty(proto_name, name, data){
        if (!this[proto_name].prototype[name]) Object.defineProperty(this[proto_name].prototype, name, data);
        if (!unsafeWindow[proto_name].prototype[name]) Object.defineProperty(unsafeWindow[proto_name].prototype, name, data);
}

function Object_size(){
        var size = 0, key;
        for (key in this) {
                if(this.hasOwnProperty(key)) size++;
        }
        return size;
};

//defineGlobalObjectProperty("size", {value: Object_size, enumerable: false});
defineGlobalProperty("Object", "size", {value: Object_size, enumerable: false});
//Object.defineProperty(Object.prototype, "size", {value: Object_size, enumerable: false});
//Object.defineProperty(unsafeWindow.Object.prototype, "size", {value: Object_size, enumerable: false});

/*
        SearchForKey - Search through an object by keys separated by a "."
*/
function Object_SearchForKey(str){
        var names = str.split('.');
        var tmp = this;
        for(var key in names){
                if(typeof tmp[names[key]] === "undefined") return undefined;
                tmp = tmp[names[key]];
        }
        
        return tmp;
}

defineGlobalProperty("Object", "SearchForKey", {value: Object_SearchForKey, enumerable: false});
//Object.defineProperty(Object.prototype, "SearchForKey", {value: Object_SearchForKey, enumerable: false});
//Object.defineProperty(unsafeWindow.Object.prototype, "SearchForKey", {value: Object_SearchForKey, enumerable: false});



function Object_getAllPropertyNames() {
    var allProps = []
      , curr = this
    do{
        var props = Object.getOwnPropertyNames(curr)
        props.forEach(function(prop){
            if (allProps.indexOf(prop) === -1)
                allProps.push(prop)
        })
    }while(curr = Object.getPrototypeOf(curr))
    return allProps
}

//defineGlobalProperty("Object", "getAllPropertyNames", {value: Object_getAllPropertyNames.bind(this), enumerable: false});
defineGlobalProperty("Object", "getAllPropertyNames", {value: Object_getAllPropertyNames, enumerable: false});

function Object_getAllProperties() {
    var allProps = {}
      , curr = this
    do{
        var props = Object.getOwnPropertyNames(curr)
        props.forEach(function(prop){
            //if (allProps.indexOf(prop) === -1)
                //allProps.push(prop)
			if(typeof allProps[prop] === "undefined") allProps[prop] = curr[prop];
        })
    }while(curr = Object.getPrototypeOf(curr))
    return allProps
}

//defineGlobalProperty("Object", "getAllPropertyNames", {value: Object_getAllPropertyNames.bind(this), enumerable: false});
defineGlobalProperty("Object", "getAllProperties", {value: Object_getAllProperties, enumerable: false});

function Object_setKeyValue(str, val, force, enumable){
        var names = str.split('.');
        var tmp = this;
        for(var index = 0; index < names.length -1; index++){
                if(typeof tmp[names[index]] === "undefined") {
                        if(force){
                                tmp[names[index]] = new Object();
                        } else {
                                return;
                        }
                }
                tmp = tmp[names[index]];
        }
        //tmp[names[names.length - 1]] = val;
		Object.defineProperty(tmp, names[names.length - 1], {value: val, enumerable : enumable, configurable: true});
        //return this;
}

defineGlobalProperty("Object", "setKeyValue", {value: Object_setKeyValue, enumerable: false});
//Object.defineProperty(Object.prototype, "setKeyValue", {value: Object_setKeyValue, enumerable: false});
//Object.defineProperty(unsafeWindow.Object.prototype, "setKeyValue", {value: Object_setKeyValue, enumerable: false});

function Object_forEach(callback){
        if(typeof callback !== "function") return;
        var key;
    for (key in this) {
                var r;
                if (this.hasOwnProperty(key)) r = callback(this[key]);
                if(typeof r === "boolean" && r == false) return;
        }
}

defineGlobalProperty("Object", "forEach", {value: Object_forEach, enumerable: false});

function Object_merge2(obj1, obj2, overwrite){
        //try{
                var tmp = obj1;
                
                for(var i in obj2){
                        if(typeof tmp[i] === "undefined"){
                                tmp[i] = obj2[i];
                        } else {
                                if(typeof tmp[i] === "object"){
                                        //tmp[i] = Object_merge2(tmp[i], obj2[i], overwrite, (typeof count === "undefined" ? 1 : count + 1));
                                        tmp[i] = Object_merge2(tmp[i], obj2[i], overwrite);
                                } else {
                                        if(overwrite) tmp[i] = obj2[i];
                                }
                        }
                }
                
                return tmp;
        //} catch(e){
                //console.log('Error -- Object_merge2 -- count: ' + count);
        //}
}

defineGlobalProperty("Object", "merge2", {value: Object_merge2, enumerable: false});

function Object_merge(obj2, overwrite){
        return Object_merge2(this, obj2, (typeof overwrite !== "undefined" ? overwrite : true));
}

defineGlobalProperty("Object", "mergeObj", {value: Object_merge, enumerable: false});


function Object_renameProperty(oldName, newName){
        if (this.hasOwnProperty(oldName)) {
                this[newName] = this[oldName];
                delete this[oldName];
        }
        return this;
}

defineGlobalProperty("Object", "renameProperty", {value: Object_renameProperty, writable : false, configurable : false, enumerable: false});

/*
Object.defineProperty(Object.prototype, 'renameProperty',{
        writable : false,
        enumerable : false,
        configurable : false,
        value : function (oldName, newName) {
                if (this.hasOwnProperty(oldName)) {
                        this[newName] = this[oldName];
                        delete this[oldName];
                }
                return this;
        }
});
*/
//Object.defineProperty(Object.prototype, "forEach", {value: Object_forEach, enumerable: false});
//Object.defineProperty(unsafeWindow.Object.prototype, "forEach", {value: Object_forEach, enumerable: false});

/****************************************************************************************************************************************************
  End Object Prototypes
*****************************************************************************************************************************************************/



/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
	var _super = this.prototype;
   
	// Instantiate a base class (but only create the instance,
	// don't run the init constructor)
	initializing = true;
	var prototype = new this();
	initializing = false;
   
	// Copy the properties over onto the new prototype
	for (var name in prop) {
	  // Check if we're overwriting an existing function
	  prototype[name] = typeof prop[name] == "function" &&
		typeof _super[name] == "function" && fnTest.test(prop[name]) ?
		(function(name, fn){
		  return function() {
			var tmp = this._super;
		   
			// Add a new ._super() method that is the same method
			// but on the super-class
			this._super = _super[name];
		   
			// The method only need to be bound temporarily, so we
			// remove it when we're done executing
			var ret = fn.apply(this, arguments);        
			this._super = tmp;
		   
			return ret;
		  };
		})(name, prop[name]) :
		prop[name];
	}
   
	// The dummy class constructor
	function Class() {
	  // All construction is actually done in the init method
	  if ( !initializing && this.init )
		this.init.apply(this, arguments);
	}
   
	// Populate our constructed prototype object
	Class.prototype = prototype;
   
	// Enforce the constructor to be what we expect
	Class.prototype.constructor = Class;
 
	// And make this class extendable
	Class.extend = arguments.callee;
   
	return Class;
  };
})();




YTB = {
	'config': {
		'PREFS_STORAGE_NAME': 'Prefs',
	}
};

YTB['RealTypeOf'] = function(v) {
        if (typeof(v) == "object") {
                if (v === null) return "null";
                if (v.constructor == ({}).constructor) return "map";
                if (v.constructor == (new Array).constructor) return "array";
                if (v.constructor == (new Date).constructor) return "date";
                if (v.constructor == (new RegExp).constructor) return "regex";
                return "object";
        }
        return typeof(v);
}

YTB['jumpToAnchor'] = function(el, padding, tries) {
		if($(el) === "undefined"){
			setTimeout(function(el, padding, tries){
				if(tries < 10)
					YTB['jumpToAnchor'](el, padding, (tries !== "undefined" ? tries + 1 : 1));
			}, 100, el, padding, tries);
		} else {
        /** @const */ var pageOffset = $(el).offset();
        /** @const */ var offsetTop = parseInt((typeof pageOffset !== "undefined" && pageOffset != null) ? pageOffset.top : 0);
        /** @const */ var pad = parseInt(typeof padding !== "undefined" ? padding : 0);
        //GlobalVars['log']['logFunction']('jumpToAnchor  elem: ' + el + ' -- offsetTop: ' + offsetTop + ' -- padding: ' + pad);
        //console.log('jumpToAnchor  elem: ' + el + ' -- offsetTop: ' + offsetTop + ' -- padding: ' + pad);
        $("html,body").animate(
                {
                        scrollTop: parseInt(offsetTop - pad)
                },
                100
        );
		}
}
	



/****************************************************************************************************************************************************
  GM_API
	- From my Cracked.com Enhancer script
****************************************************************************************************************************************************/

GM_API = new function(){
        this['fn'] = this.__proto__;
		this.config = {
			'STORAGE_PREFIX': 'YTB_',
		};
};
unsafeWindow.GM_API = GM_API;

YTB['GM_API'] = GM_API;



/****************************************************************************************************************************************************
  Script/Style Insertion
****************************************************************************************************************************************************/

/**
 * Adds given css to the the page.
 * @param {string} css The CSS to be added to the document.
 */
GM_API.fn.addStyle = function(css){
        if (typeof css != "undefined" && css != '') {
                if(heads = document.getElementsByTagName('head')) {
                        var style = document.createElement('style');
                        try {
                                style.innerHTML = css;
                        } catch (x) {
                                style.innerText = css;
                        }
                        style.type = 'text/css';
                        heads[0].appendChild(style);
                }
        }
        return null;
}

/**
 * Adds given css to the the page.
 * @param {string} css The CSS to be added to the document.
 */
GM_API.fn.addStyleURL = function(url, id){
        if (typeof url != "undefined" && url != '') {
                if(heads = document.getElementsByTagName('head')) {
                        var link = document.createElement('link');
						if(id !== "undefined")
						link.id   = id;
						link.rel  = 'stylesheet';
						link.type = 'text/css';
						link.href = url;
						link.media = 'all';
                        heads[0].appendChild(link);
                }
        }
        return null;
}

/**
 * Adds given js to the the page.
 * @param {string} js The js to be added to the document.
 * @param {string} src The src for the script tag.
 * @param {string} id The id for the script tag.
 */
GM_API.fn.addScript = function(js, src, id){
        if(heads = document.getElementsByTagName('head')) {
                var newScript = document.createElement('script');
                if(typeof js != "undefined" && js != ''){
                        try {
                                newScript.innerHTML = js;
                        } catch (x) {
                                newScript.innerText = js;
                        }
                }
                
                if(typeof src != "undefined" && src != ''){
                        try{newScript.src = src;}catch(x){}
                }
                
                if(typeof id !== "undefined"){
                        try{newScript.id = id;}catch(x){}
                }
                
                newScript.type = 'text/javascript';
                try{heads[0].appendChild(newScript);}catch(x){}
        }
        return null;
}

GM_API.fn.addResource = function(a){
        GM_API.addScript(GM_getResourceText(a));
}

/****************************************************************************************************************************************************
  End Script/Style Insertion
****************************************************************************************************************************************************/





/****************************************************************************************************************************************************
  localStorage
****************************************************************************************************************************************************/

/**
 * Adds localStorage to GM_API as a non-enumerable property with the name "stor".
 */
Object.defineProperty(GM_API, "stor", {
        value: (function(){return (localStorage?localStorage:(unsafeWindow.localStorage?unsafeWindow.localStorage:window.localStorage));})(),
        enumerable: false
});

GM_API.fn.getValue = function(key, def){
        var name = GM_API.config['STORAGE_PREFIX'] + key;
        if (this.stor[name]) {
                var value = this.stor.getItem(name);
                return value;
        }
        return def;
}

GM_API.fn.setValue = function(key, value){
        var name = GM_API.config['STORAGE_PREFIX'] + key;
        return this.stor.setItem(name, value);
}

GM_API.fn.deleteValue = function(key, value){
        var name = GM_API.config['STORAGE_PREFIX'] + key;
        return this.stor.removeItem(name);
}


//this['listValues'] = function(){}

/****************************************************************************************************************************************************
  End localStorage
****************************************************************************************************************************************************/










/****************************************************************************************************************************************************
  Log
****************************************************************************************************************************************************/



GM_API.LOG = Error;

GM_API.LOG.prototype.getStack = function () {return this.stack;};

GM_API.fn.log = {

	'VERBOSITY_LEVEL': 5,
	'OUTPUT_TYPES': {
		'ERROR':        {'level': 1,      'value': 'error'  },
		'WARNING':      {'level': 2,      'value': 'warn'   },
		'INFO':         {'level': 3,      'value': 'info'   },
		'LOG':          {'level': 4,      'value': 'log'    },
		'DEBUG':        {'level': 5,      'value': 'debug'  }
	},
	
	'CLASSES': {
		'PROTOTYPE':			{'type': 'DEBUG', 'enabled': true},
		'FUNCTION_START':		{'type': 'INFO', 'enabled': true}
	},
	

	
	'isFirebug': function(ptr){
		if(typeof ptr === "undefined") return false;
		if(typeof ptr['timeStamp'] !== "undefined") return true;
		return false;
	},
	
	'isConsole2': function(ptr){
		if(typeof ptr === "undefined") return false;
		if(!this.isFirebug(ptr)) {
			if(typeof ptr['dirxml'] !== "undefined") return true;
		}
		return false;
	},
	
	'isWebConsole': function(ptr){
		if(typeof ptr !== "undefined" && typeof ptr['dirxml'] === "undefined") return true;
		return false;
	},
	
	'getFB': function(){
		//if(isFirebug(console)) return console;
		//if(isFirebug(unsafeWindow.console)) return unsafeWindow.console;
		//if(isFirebug(window.console)) return window.console;
		
		if(this.isFirebug(console)) return console;
		if(this.isFirebug(this.console)) return this.console;
		if(this.isFirebug(unsafeWindow.console)) return unsafeWindow.console;
		if(this.isFirebug(unsafeWindow.window.console)) return unsafeWindow.window.console;
		if(this.isFirebug(window.console)) return window.console;
		
		return undefined;
	},
	
	'getC2': function(){
		if(this.isConsole2(console)) return console;
		if(this.isConsole2(this.console)) return this.console;
		if(this.isConsole2(unsafeWindow.console)) return unsafeWindow.console;
		if(this.isConsole2(unsafeWindow.window.console)) return unsafeWindow.window.console;
		if(this.isConsole2(window.console)) return window.console;
		
		return undefined;
	},
	
	'getWC': function(){
		if(this.isWebConsole(unsafeWindow.window.console)) return unsafeWindow.window.console;
		if(this.isWebConsole(window.console)) return window.console;
		
		return undefined;
	},
	

	'Firebug_ptr':		undefined,
	'Console2_ptr':		undefined,
	'WebConsole_ptr':	undefined,

	'updateFirebugPtr': function(new_ptr){
		if(typeof this['Firebug_ptr'] === "undefined" && this.isFirebug(new_ptr)) {
			this.Firebug_ptr = new_ptr;
		}
	},
	
	'updateConsole2Ptr': function(new_ptr){
		if(typeof this['Console2_ptr'] === "undefined" && this.isConsole2(new_ptr)) {
			this.Console2_ptr = new_ptr;
		}
	},
	
	'updateWebConsolePtr': function(new_ptr){
		if(typeof this['WebConsole_ptr'] === "undefined" && this.isWebConsole(new_ptr)) {
			this.WebConsole_ptr = new_ptr;
		}
	},
	
	'UpdateAllPtrs': function(){
		this.updateFirebugPtr(this.getFB());
		this.updateConsole2Ptr(this.getC2());
		this.updateWebConsolePtr(this.getWC());
	},
	
	
	
	'extractLineNumberFromStack': function(stack) {
			var patt = /([^\<\s]+)?[\<\/]*@file\:\/\/\/([\S]+)\:([0-9]+)\s*/gmi;
			
			var stackPieces = {};
			var c = 0;
			var tmp = [];
			while((tmp = patt.exec(stack)) !== null){
				stackPieces[c] = {};
				stackPieces[c]['function'] = tmp[1];
				stackPieces[c]['file'] = tmp[2];
				stackPieces[c]['line'] = tmp[3];
				c++;
				if(c > 20) break;
			}
			
			var line = '';//stackPieces[c - 2];
			
			var funcNamePatt = /GM_API\.fn\.log/i;
			
			var piece = 1;
			while(funcNamePatt.test(stackPieces[piece]['function']) && piece <= (c - 1)){
				piece++;
			}
			line = parseInt(stackPieces[piece].line) + '';
			return line;
	},
	
	'ConsoleCommand2': function(command, value){
		if(typeof this.Firebug_ptr !== "undefined" && typeof this.Firebug_ptr[command] !== "undefined"){
			this.Firebug_ptr[command](value);
		}
		
		if(typeof this.Console2_ptr !== "undefined" && typeof this.Console2_ptr[command] !== "undefined"){
			this.Console2_ptr[command](value);
		}
		
		if(typeof this.WebConsole_ptr !== "undefined" && typeof this.WebConsole_ptr[command] !== "undefined"){
			this.WebConsole_ptr[command](value);
		}
			
	},
	//ConsoleCommand
	'callConsoleFunction': function(functionName, args){
		var suffix = {"@": this.extractLineNumberFromStack(GM_API.LOG().getStack(args))};
		
		
		if(arguments.length > 1){
			args2 = Array.slice(arguments).splice(1, arguments.length - 1);
		} else {
			args2 = args;
			if(!Array.isArray(args2)) args2 = new Array(args);
		}
		
		
		
		
		switch(functionName){
			case 'error':
			case 'warn':
			case 'info':
			case 'log':
			case 'debug':
				args2 = args2.concat([suffix]);
				break;
			//default:
				//args2 = Array.prototype.slice.call(arguments, 1);
				//break;
		}
		
		
		if(typeof this.Firebug_ptr !== "undefined" && typeof this.Firebug_ptr[functionName] !== "undefined"){
			this.Firebug_ptr[functionName].apply(this.Firebug_ptr, (args2 ? args2 : undefined));
		}
		
		if(typeof this.Console2_ptr !== "undefined" && typeof this.Console2_ptr[functionName] !== "undefined"){
			this.Console2_ptr[functionName].apply(this.Console2_ptr, (args2 ? args2 : undefined));
		}
		
		if(typeof this.WebConsole_ptr !== "undefined" && typeof this.WebConsole_ptr[functionName] !== "undefined"){
			this.WebConsole_ptr[functionName].apply(this.WebConsole_ptr, (args2 ? args2 : undefined));
		}
		
	},
	
	'ConsoleCommand': function(){
		if(parseInt(this.VERBOSITY_LEVEL) == 0) return; //Disable completely if set to 0
		var command = undefined;
		var value = undefined;
		
		if(arguments.length == 1){
			if(typeof arguments[0] === "string"){
				command = arguments[0];
				this.callConsoleFunction(command);
			} else if(typeof arguments[0] === "object"){
				var tmp = arguments[0];
				if(tmp['command']) command = tmp['command'];
				if(tmp['value']) value = tmp['value'];
				this.callConsoleFunction(command, value);
			}
		} else if(arguments.length > 1){
			if(typeof arguments[0] === "string"){
				command = arguments[0];
				
				value = Array.slice(arguments).splice(1, arguments.length - 1);
				if(value.length == 1) value = value[0];
				this.callConsoleFunction(command, value);
			}else if(typeof arguments[0] === "object"){
				var tmp = arguments[0];
				if(tmp['command']) command = tmp['command'];
				if(tmp['value']) value = tmp['value'];
				if(!value){
					value = Array.slice(arguments).splice(1, arguments.length - 1);
				}
				this.callConsoleFunction(command, value);
			}
		}
	},
	
	'outputMessage': function(str, output_type){
		if(parseInt(output_type.level) <= parseInt(this.VERBOSITY_LEVEL)){
			this.ConsoleCommand(output_type.value, str);
		}
	},
	
	'Error': function(category, x){this['outputMessage']("YTB Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber, this.OUTPUT_TYPES['ERROR']);},
	'logError': this['Error'],
	
	'Warning': function(str){this['outputMessage']((arguments.length > 1 ? arguments : str), this.OUTPUT_TYPES['WARNING']);},
	'logWarning': this['Warning'],
	
	'Info': function(str){this['outputMessage']((arguments.length > 1 ? arguments : str), this.OUTPUT_TYPES['INFO']);},
	'logInfo': this['Info'],
	
	'Log': function(str){this['outputMessage']((arguments.length > 1 ? arguments : str), this.OUTPUT_TYPES['LOG']);},
	'logLog': this['Log'],
	
	'Debug': function(str){this['outputMessage']((arguments.length > 1 ? arguments : str), this.OUTPUT_TYPES['DEBUG']);},
	'logDebug': this['Debug'],
	
	'LogClass': function(str, className){
		var classInfo = this['CLASSES'][className];
		if(!classInfo || !classInfo.enabled) return;
		this['outputMessage'](str, this.OUTPUT_TYPES[classInfo.type]);
	},
	
	'groups': [],
	
	'startGroup': function(name){
		this.groups.push(name);
		return this.ConsoleCommand('group', name);
	},
	
	'startCollapsedGroup': function(name){
		this.groups.push(name);
		return this.ConsoleCommand('groupCollapsed', name);
	},
	
	//groupCollapsed
	
	'endGroup': function(args){
		if(typeof args === "undefined"){
			return this.ConsoleCommand('groupEnd', args);
			this.groups.pop();
		} else {
			var index = this.groups.indexOf(args);
			var len = parseInt(this.groups.length);
			for(var i = len; i > index; i--){
				this.ConsoleCommand('groupEnd', args);
				this.groups.pop();
			}
		}
	},
	
	'count': function(args){
		return this.ConsoleCommand('count', args);
	},
	
	'time': function(args){
		return this.ConsoleCommand('time', args);
	},
	
	'timeEnd': function(args){
		return this.ConsoleCommand('timeEnd', args);
	},
	
	'timeStamp': function(args){
		return this.ConsoleCommand('timeStamp', args);
	},
	
	'clear': function(args){
		return this.ConsoleCommand('clear');
	},
	
	'dir': function(args){
		return this.ConsoleCommand('dir', args);
	},
	
	'dirxml': function(args){
		return this.ConsoleCommand('dir', args);
	},
	
	'trace': function(){
		return this.ConsoleCommand('trace');
	},
	
	'table': function(args){
		return this.ConsoleCommand('table', args);
	},
	
};

if(DEBUG_MODE == "RELEASE") GM_API.log.VERBOSITY_LEVEL = 0;
GM_API.log.UpdateAllPtrs();
GM_API.log.LogClass('GM_API.log.UpdateAllPtrs', 'PROTOTYPE');

function testLog(){
	
	GM_API.log.VERBOSITY_LEVEL = 5;
	
	
	GM_API.log.time('TestTime');
	GM_API.log.LogClass('LogClass: FUNCTION_START', 'FUNCTION_START');
	GM_API.log.Debug('Test Debug');
	
	GM_API.log.startGroup('TestGroup');
	GM_API.log.startGroup('TG2');
	GM_API.log.startGroup('TG3');
	//GM_API.log.startGroup('TG4');
	//GM_API.log.startGroup('TG5');
		GM_API.log.Log('Test Log');
		GM_API.log.Info('Test Info');
	
	
	GM_API.log.Warning('Test Warning');
	GM_API.log.timeStamp('TestTimeStamp');
	
	try{
		var tmp = {foo: 'bar'};
		var tmp2 = tmp.a.b.c;
		
	}catch(e){
		GM_API.log.Error('Test', e);
	}
	
	for(var i = 0; i < 20; i++){
		GM_API.log.count('TestCount');
	}
	
	
	GM_API.log.endGroup('TestGroup');
	//GM_API.log.endGroup('TG3');
	
	var dirTest = {foo: 'bar', bar: 'foo'};
	GM_API.log.dir(dirTest);
	
	GM_API.log.trace();
	
	
	function Person(firstName, lastName, age){
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	}

	var family = {};
	family.mother = new Person("Susan", "Doyle", 32);
	family.father = new Person("John", "Doyle", 33);
	family.daughter = new Person("Lily", "Doyle", 5);
	family.son = new Person("Mike", "Doyle", 8);

	GM_API.log.table(family);
	
	setTimeout(function(){
		GM_API.log.timeEnd('TestTime');
	}, 100);
	//console.log(GM_API.log.count('TestCount'));
	
}
//testLog();

/****************************************************************************************************************************************************
  End Log
****************************************************************************************************************************************************/














/****************************************************************************************************************************************************
  Storage Class
****************************************************************************************************************************************************/

//var CCE_Storage_Class = Class.extend({
YTB['Storage_Class'] = Class.extend({

        init: function(name){
                this.storageName = name;
                this.value = {};
                this.storageUpToDate = false;
                this.load();
        },
        
        get: function(keys){
                return this.value.SearchForKey(keys);
        },
        
        set: function(keys, val, enumable){
				return this.value.setKeyValue(keys, val, true, enumable);
                this.storageUpToDate = false;
        },
        
        getNames: function(){
                var r = [];
                for(var i in this.value){
                        r.push(i);
                }
                return r;
        },
        
        insert: function(key, obj){
		
				//console.log(obj.getAllPropertyNames());
				//console.log(obj.getAllProperties());
				var props = obj.getAllProperties();
                for(var i in props){
						var enumable = obj.propertyIsEnumerable(i);
                        var fullKey = key + '.' + i;
                        this.set(fullKey, obj[i], enumable);
                }
				
				/*
				for(var i in obj){
					var enumable = obj.propertyIsEnumerable(i);
					console.log('i: ' + i + ' -- enum: '+ enumable);
					Object.defineProperty(this.value, i, {value: obj[i],enumerable: enumable});
				}
				*/
                this.storageUpToDate = false;
        },
        
        save: function(){
                GM_API['setValue'](this.storageName, JSON.stringify(this.value));
                this.storageUpToDate = true;
        },
        
        load: function(){
                var storedData = GM_API['getValue'](this.storageName);
                if(typeof storedData === "undefined") return false;
                //this.value = JSON.parse(storedData);
				var tmp = JSON.parse(storedData);
				
				for(var x in tmp){
					this.value[x] = tmp[x];
					/*
					Object.defineProperty(this.value, x, {
						value: tmp[x],
						enumerable : true,
						configurable: true
						}
					);
					*/
				}
                this.storageUpToDate = true;
                return true;
        },
        
        'delete': function(){
                return GM_API['deleteValue'](this.storageName);
        }
        
});

/****************************************************************************************************************************************************
  End Storage Class
****************************************************************************************************************************************************/


YTB['GM_API'] = GM_API;

/*
{
        'text': '',
        'type': '',
        'options': '',
        'def': '',
        'value': '',
        'tab': '',
        'section': '',
}
*/

//function CCE_PREF_CLASS(iname, itype, idef, ivalue){
//CCE['PREF_CLASS'] = function(iname, itype, idef, ivalue){
YTB['PREF_CLASS'] = function(data){
        var tPref = {};
        Object.defineProperties(tPref, {
        /*
                "name": {
                        value: name,
                        enumerable: true
                },
        */
				"text": {
					value: data.text,
					enumerable: false
				},
                "type": {
                        value: data.type,
                        enumerable: false
                },
                'options': {
                        value: data.options,
                        enumerable: false
                },
                "def": {
                        value: data.def,
                        enumerable: false
                },
                "hiddenValue": {
                        value: data.value,
                        enumerable: false
                },
                "value": {
                        //value: ivalue,
                        get: function(){return (typeof this.hiddenValue !== "undefined" ? this.hiddenValue : this.def);},
                        set: function(newValue){this.hiddenValue = newValue;},
                        enumerable: true,
						configurable: true
                },
                "tab": {
                        value: data.tab,
                        enumerable: false
                },
                "section": {
                        value: data.section,
                        enumerable: false
                }
        });
        return tPref;
}


YTB['PREFS_CLASS'] = YTB['Storage_Class'].extend({
        init: function(name){
                this._super(name);
        },
        
        addPref: function(name, data){
                //console.log('addPref: ' + name);
                //var tmp = this.get(name);
				var tmp = this.value[name];
				//console.log('add pref: ' + name)
				//console.log(tmp);
                if(typeof tmp !== "undefined"){
						//console.log();
						var tData = data;
						tData.value = tmp.value;
                        var tPref = new YTB['PREF_CLASS'](tData);
                        //if(tmp.value != tPref.def) tPref.value = tmp.value;
						//if(tmp.value !== "undefined") tPref.value = tmp.value;
						//console.log('tPref.value: ' + tPref.value);
                        this.insert(name, tPref);
                } else {
                        this.insert(name, new YTB['PREF_CLASS'](data));
                }
                this.save();
        },
        
        addPrefs: function(data){
                for(var i in data){
                        this.addPref(i, data[i]);
                }
        },
        
        getPrefProperty: function(prefName, propertyName){
                var tmp = this.get(prefName);
                return tmp[propertyName];
        },
        
        getPrefValue: function(prefName){
                return this.getPrefProperty(prefName, 'value');
        },
        
        setPrefProperty: function(prefName, propertyName, newValue){
                /*var tmp = this.get(prefName);
                tmp[propertyName] = newValue;
                this.set(prefName, tmp);
				*/
				this.value[prefName][propertyName] = newValue;
        },
        
        setPrefValue: function(prefName, newValue){
                this.setPrefProperty(prefName, 'value', newValue);
        },
        
        getListOfTabs: function(){
                //var names = this.getNames();
                var r = [];
                for(var i in this.value){
                        var tab = this.getPrefProperty(i, 'tab');
                        if(r.indexOf(tab) == -1){
                                r.push(tab);
                        }
                }
                return r;
        },
        
        getTabPrefs: function(fTab){
                var r = {};
                for(var i in this.value){
                        var tab = this.getPrefProperty(i, 'tab');
                        if(fTab == tab){
                                r[i] = this.value[i];
                        }
                }
                return r;
        }
        
        
});

YTB['prefs'] = new YTB['PREFS_CLASS'](YTB.config['PREFS_STORAGE_NAME']);


/*
{
        'text': '',
        'type': '',
        'options': '',
        'def': '',
        'value': '',
        'tab': '',
        'section': '',
}
*/

YTB['prefs'].addPrefs({
	playerSize: {
		'text': 'PlayerSize',
		'type': 'select',
		'options': {0: {name: 'Default', text: 'Default'}, 1: {name: 'Best', text: 'Best'}, 2: {name: 'BestWithGuide', text: 'Best + Guide'}, 3: {name: 'FullWidth', text: 'Full Width'}},
		'def': '1',
		'value': '1',
		'tab': 'Video',
		'section': '',
	},
	
	videoQuality: {
		'text': 'Video Quality',
		'type': 'select',
		'options': {0: {name: 'highres', text: 'highres'}, 1: {name: 'hd1080', text: 'hd1080'}, 2: {name: 'hd720', text: 'hd720'}, 3: {name: 'Large', text: 'Large'}, 4: {name: 'medium', text: 'medium'}, 4: {name: 'small', text: 'small'}, 5: {name: 'tiny', text: 'tiny'}},
		'def': '1',
		'value': '1',
		'tab': 'Video',
		'section': '',
	},
	
	removeAnnotations: {
		'text': 'Remove Annotations',
		'type': 'addremovelist',
		'options': {add: 'Add This Channel', remove: 'Remove Selected'},
		'def': '{}',
		'value': '{}',
		'tab': 'Video',
		'section': '',
	},
	
	alwaysShowMenuBar: {
		'text': 'Always Show Menu Bar',
		'type': 'boolean',
		'def': 'true',
		'value': 'true',
		'tab': 'Video',
		'section': '',
	},
	
	autoPlay: {
		'text': 'Auto Play',
		'type': 'boolean',
		'def': 'true',
		'value': 'true',
		'tab': 'Video',
		'section': '',
	}
});






var playerSize = Class.extend({
	name: "Default",
	displayName: "Default",
	init: function(name, displayName, getWidthFunction, getHeightFunction, getLeftFunction, getTopFunction){
		if(name !== "undefined") {
			this.name = name;
		} else {
			this.name = "Default";
		}
		
		if(displayName !== "undefined") {
			this.displayName = displayName;
		} else {
			this.displayName = "Default";
		}
			
		//if(getWidthFunction != "undefined" && getWidthFunction != ""){
		if(typeof getWidthFunction === "function"){
			this.getWidth = getWidthFunction.bind(this);
		}
		//if(getHeightFunction != "undefined" && getHeightFunction != ""){
		if(typeof getHeightFunction === "function"){
			this.getHeight = getHeightFunction.bind(this);
		}
		//if(getLeftFunction != "undefined" && getLeftFunction != ""){
		if(typeof getLeftFunction === "function"){
			this.getLeft = getLeftFunction.bind(this);
		}
		//if(getTopFunction != "undefined" && getTopFunction != ""){
		if(typeof getTopFunction === "function"){
			this.getTop = getTopFunction.bind(this);
		}

	},
	getWidth: function(){
		return 854;
		//854?
		//960?
	},
	getHeight: function(){
		return 510;
	},
	getLeft: function(){
		return 225;
	},
	getTop: function(){
		return 0;
	}
});

var playerSizes = {
	Default: new playerSize("Default", "Default")
};

Object.defineProperty(playerSizes, "add", {
        value: function(name, displayName, getWidthFunction, getHeightFunction, getLeftFunction, getTopFunction){
			playerSizes[name] = new playerSize(name, displayName, getWidthFunction, getHeightFunction, getLeftFunction, getTopFunction);
		},
        enumerable: false
});

Object.defineProperty(playerSizes, "selectedVal", {
        value: 'Default',
        enumerable: false,
		writable: true
});

Object.defineProperty(playerSizes, "selected", {
        //value: YTB['prefs'].getPrefValue('playerSize'),
		get: (function(){
			return this.selectedVal;
		}).bind(playerSizes),
		set: (function(val){
			if(isNumeric(val)){
				var i = 0;
				for(var x in this){
					if(i == parseInt(val)) {
						this.selectedVal = x;
					}
					i++;
				}
			} else {
				this.selectedVal = val;
			}
		}).bind(playerSizes),
        enumerable: false
});






//var YTB = {
YTB['initalized'] = false;
	
YTB['c'] = {};
	
YTB['playerSizes'] = playerSizes;
	
YTB['setWidePlayer'] = function(){
			this.c.$watchContainer.addClass('watch-wide');
			this.c.$player.addClass('watch-playlist-collapsed watch-medium');
};
	
YTB['setPlayerLocation'] = function(nTop, nLeft){
		this.c.$player.css({'padding-left': nLeft + 'px'});
};
	
YTB['setPlayerDimensions'] = function(nHeight, nWidth){
		//min-width: 960px;
		this.c.$player.css('min-width', nWidth + 'px');
		this.c.$playerApi.css({'width': nWidth + 'px', 'height': nHeight + 'px'});
};
	
YTB['setPlayerSize'] = function(name){
		var tName = name;
		if(name == null || playerSizes[tName] === "undefined") tName = "Default";
		//console.log(tName);
		if(isNumeric(tName)){
			var c = 0;
			for(var x in playerSizes){
				if(c == parseInt(tName)){
					tName = x;
					break;
				}
				c++;
			}
		}
		
		var pSize = playerSizes[tName];
		var width = pSize.getWidth();
		var height = pSize.getHeight();
		var left = pSize.getLeft();
		var top = pSize.getTop();
		
		var pad = 0;
		var windowHeight = parseInt($(window).height());
		
		if(height > windowHeight){
			pad = (height - windowHeight) / -2;
		}
		
		this.setPlayerDimensions(height, width);
		this.setPlayerLocation(top, left);
		//YTB['jumpToAnchor'](this.c.$player, pad);
		setTimeout((function(){YTB['jumpToAnchor'](this.c.$player, pad);}).bind(this),100);
};
	
YTB['addPlayerSizes'] = function(){
		playerSizes.add(
			'Best',
			'Best',
			function(){
				//width
				var windowWidth = parseFloat($(window).width());
				var windowHeight = parseFloat($(window).height());
				// 960/510
				
				var ratio = 854.0 / 510.0;
				if(windowWidth / ratio > windowHeight){
					return parseInt(windowHeight * ratio);
				}
				return windowWidth;
			},
			function(){
				//height
				var windowWidth = parseFloat($(window).width());
				var windowHeight = parseFloat($(window).height());

				var ratio = 854.0 / 510.0;
				if(windowWidth / ratio > windowHeight){
					return windowHeight;
				}
				
				return parseInt(windowWidth / ratio);
			},
			function(){
				var windowWidth = parseInt($(window).width());
				var left = (windowWidth - this.getWidth()) / 2;
				if(left > 226) left = 226;
				//left
				return left;
			},
			function(){
				//top
				return 0;
			}

		);
		
		playerSizes.add(
			'BestWithGuide',
			'Best + Guide',
			function(){
				//width
				var windowWidth = parseFloat($(window).width()) - 226.0;
				var windowHeight = parseFloat($(window).height());
				// 960/510
				
				var ratio = 854.0 / 510.0;
				if(windowWidth / ratio > windowHeight){
					return parseInt(windowHeight * ratio);
				}
				return windowWidth;
			},
			function(){
				//height
				var playerWidth = this.getWidth();
				var windowHeight = parseFloat($(window).height());

				var ratio = 854.0 / 510.0;
				if(playerWidth / ratio > windowHeight){
					return windowHeight;
				}
				
				return parseInt(playerWidth / ratio);
			},
			function(){
				return 226;
			},
			function(){
				//top
				return 0;
			}

		);
		
		playerSizes.add(
			'FullWidth',
			'Full Width',
			function(){
				//width
				return parseInt($(window).width());
			},
			function(){
				//height
				var ratio = 854.0 / 510.0;
				
				return parseInt(parseFloat(this.getWidth()) / ratio);
			},
			function(){
				return 0;
			},
			function(){
				//top
				return 0;
			}

		);
		
		
		playerSizes.selected = YTB['prefs'].getPrefValue('playerSize');
};



Object.defineProperty(YTB, "videoQuality", {
	get: function(){
		
		try{
			return unsafeWindow.yt.config_.PLAYER_REFERENCE.setPlaybackQuality(q);
		} catch(err){
			return "undefined";
		}
	},
	set: function(quality){
		try{
			//console.log('quality: ' + quality);
			//var q = quality;
			unsafeWindow.yt.config_.PLAYER_REFERENCE.setPlaybackQuality(quality);
		} catch(err){
			//console.log('err');
			//setTimeout((function(qual){this.videoQuality = qual;}).bind(this, quality), 200);
			//setTimeout(this.videoQuality.set.bind(this, quality), 200);
			setTimeout(function(qual){YTB.videoQuality = qual;}, 200, quality);
		}
	}
});
/*
	** Playback Quality **
Get: yt.config_.PLAYER_REFERENCE.getPlaybackQuality();
set: yt.config_.PLAYER_REFERENCE.setPlaybackQuality(quality);

options:
	- "highres"
	- "hd1080" (1080p)
	- "hd720" (720p)
	- "Large" (480p)
	- "medium" (360p)
	- "small" (240p)
	- "tiny" (144p)

*/
	
	
YTB['makeVideoSizeMenuOption'] = function(name, displayName, toggle){
		var o = '';
		o += '' +
				'<span>' +
					'<button role="button" data="' + name + '" type="button" class="ytb-playersize-button action-panel-trigger yt-uix-button yt-uix-button-text yt-uix-button-size-default yt-uix-tooltip' + (toggle ? ' yt-uix-tooltip yt-uix-button-toggled' : '') + '" onclick=";return false;" title="">' +
						'<span class="yt-uix-button-content">' + displayName + '</span>' +
					'</button>' +
				'</span>';
		
		return o;
};

YTB['makePrefMenuItem_Select'] = function(name, pref){
	var o = '';
		
		o += pref.text + ': ';
		
		o += '<select name="' + name + '">';
		
		for(var x in pref.options){
			o += '<option value="' + x + '" ' + (pref.value == x ? 'selected' : '') + '>' + pref.options[x].text;
			o += '</option>';
		}
		
		
		o += '</select>';
	return o;
};

YTB['makePrefMenuItem_Boolean'] = function(name, pref){
	//var o = '<form name="' + name + '" action="">';
	var o = '';
	o += pref.text + ': ';
	o += '<input type="radio" name="' + name + '" value="true" ' + (pref.value == "true" ? "checked" : '') + '>True </input>';
	o += '<input type="radio" name="' + name + '" value="false" ' + (pref.value == "false" ? "checked" : '') + '>False</input><br>';
	
	//o += '</form>';
	return o;
};

YTB['makePrefMenuItem_AddRemoveList'] = function(name, pref){
	var list = {};
	var addText = 'Add';
	var removeText = 'Remove';
	
	var o = pref.text + ':<br />';
	
	
	if(typeof pref.value === "string"){
		list = JSON.parse(pref.value);
	} else if(typeof pref.value === "object"){
		list = pref.value;
	} else {
		return '';
	}
	
	if(typeof pref.options !== "undefined"){
		if(typeof pref.options.add !== "undefined") addText = pref.options.add;
		if(typeof pref.options.remove !== "undefined") removeText = pref.options.remove;
	}
	
	o += '<select name="' + name + '" id="' + name + '_select" size="5">';
	
	for(var x in list){
		o += '<option value="' + x + '">' + list[x];
		
		o += '</option>';
	}
	
	
	
	o += '</select>';
	
	//Add Button
	o += '<button type="button" id="' + name + '_AddButton">' + addText + '</button> ';
	
	//Remove Button
	o += '<button type="button" id="' + name + '_RemoveButton">' + removeText + '</button> ';
	
	return o;
};

//addremovelist

YTB['makePrefMenuItem'] = function(name, pref){
	var item = '';
	if(pref.type == 'select'){
		item += YTB['makePrefMenuItem_Select'](name, pref);
	} else if (pref.type == 'boolean'){
		item += YTB['makePrefMenuItem_Boolean'](name, pref);
	} else if (pref.type == 'addremovelist'){
		item += YTB['makePrefMenuItem_AddRemoveList'](name, pref);
	}
	
	return item;
};



YTB['makePrefMenu'] = function(){
	var prefMenu = '';
	
	//prefMenu += '';
	for(var x in YTB['prefs'].value){
		//console.log(x);
		prefMenu += YTB['makePrefMenuItem'](x, YTB['prefs'].value[x]);
		prefMenu += '<br />';
	}
	
	prefMenu += '<br />';
	
	prefMenu += '<button id="YTBSavePrefs" type="button">Save</button>';
	
	return prefMenu;
};
	
YTB['addMenuBar'] = function(){
		var menu = '<div id="YTB_MenuBar">';
			
			// Button Group
			menu += '<div class="yt-uix-button-group">'
			for(var x in playerSizes){
				var sel = (playerSizes.selected == x ? true : false);
				menu += this.makeVideoSizeMenuOption(playerSizes[x].name, playerSizes[x].displayName, sel);
			}
			
			menu += '</div>';
			// End Button Group
			
			
			
			// Player Menu
			/*
			menu += '<div id="YTB_MenuBar_PlayerButtons" style="clear: both; margin: 5px 0px;">';
				menu += 'foo';
			menu += '</div>';
			*/
			
			menu += '<div id="YTB_MenuBar_PlayerButtons" style="border-left: 2px solid #000000; padding: 0px 5px; display: inline;">';
				menu += '<span>Loop</span>';
				menu += '<input type="checkbox" id="YTB_LoopVideo"></input>';
			menu += '</div>';
			//End Player Menu
			
			
			menu += '</div>';
			
			
			
			
			
			menu += '<div id="ytb-options">';
				//'' +
			menu += YTB['makePrefMenu']();
			
			menu += '<div id="ytb-options-statusbar" class="tyb-options-statusbar-green">';
				menu += '<span id="ytb-options-statusbar-span">';
					//menu += '<span class="ui-button-icon-primary ui-icon silk-icon-accept" style="display: inline-block;"></span>';
					menu += '<span id="ytb-options-statusbar-span-icon" class="" style="display: inline-block;"></span>';
					menu += '<span id="ytb-options-statusbar-span-text">Saved</span>';
				menu += '</span>';
			menu += '</div>';
			
			menu += '</div>';
			
			//Status Bar

			
			
			menu += '<div id="ytb-options-toggle" class="yt-uix-expander-head yt-uix-button-panel" style="padding-bottom: 2px;">' +
				'<div class="expand" id="ytb-options-expand">' +
					'<button role="button" class="metadata-inline yt-uix-button yt-uix-button-text yt-uix-button-size-default" style="margin-right: 45%;" onclick=";return false;" type="button"><span class="yt-uix-button-content">Show Options</span></button>' +
				'</div>';
				

			
			//end menu
			menu += '</div>';
				
			//menu += '</div>';

		var menuCSS = '#YTB_MenuBar {' +
			'height: 40px;' +
			'width: ' + parseInt($(window).width()) + 'px;' +
			'background: none repeat scroll 0 0 #F1F1F1;' + 
			'border-bottom: 1px solid #E8E8E8;' +
			'border-top: 1px solid #E8E8E8;' +
			'padding: 8px 0px 8px 225px;' +
			'}';
		
		
		menuCSS += '#YTB_MenuBar .yt-uix-button:hover, #YTB_MenuBar .yt-uix-button:active, #YTB_MenuBar .yt-uix-button.yt-uix-button-active, #YTB_MenuBar .yt-uix-button.yt-uix-button-toggled { ' +
			'border-bottom-color: #993300; filter: none; opacity: 1;' +
			' }';
			
		menuCSS += '#YTB_MenuBar .yt-uix-button {' +
			'-moz-border-bottom-colors: none; -moz-border-left-colors: none; -moz-border-right-colors: none; -moz-border-top-colors: none; background: none repeat scroll 0 0 rgba(0, 0, 0, 0); border-color: rgba(0, 0, 0, 0); border-image: none; border-style: solid; border-width: 3px 0; box-shadow: none; color: #333333; height: 3.6em; margin-left: 15px;' +
			'}';
			
		menuCSS += '#ytb-options {' +
			'min-height: 200px;' +
			'max-height: 500px;' +
			'display: none;' +
			'padding: 5px 0px 5px 255px;' +
			'min-width: 940px;' +
			'max-width: 1040px;' +
			'overflow-x: hidden;' +
			'}';
			
		menuCSS += '' +
		'#ytb-options-toggle {' +
			'clear: both;' +
			'text-align: center;' +
		'}' +
		'#ytb-options-expand {' +
				'display: block;' +
			'}' +
		'#ytb-options-toggle .yt-uix-button-text {' +
			'height: 18px;' +
			'padding-bottom: 0;' +
			'position: relative;' +
		'}';
		
		menuCSS += '' +
			'#ytb-options-statusbar{' +
				'width: 100%;' +
				'padding: 2px 0;' +
				'text-align: center;' +
				'display: none;' +
			'}';
			
		menuCSS += '' +
			'#ytb-options-statusbar-span {' +
				'width: 100%;' +
			'}';
			
		menuCSS += '' +
			'.tyb-options-statusbar-green {' +
				'background-color: green;' +
			'}';
			
		menuCSS += '' +
			'.tyb-options-statusbar-red {' +
				'background-color: red;' +
			'}';
		
			
		GM_addStyle(menuCSS);
		
		GM_API.addStyleURL('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/themes/base/jquery-ui.css');
		
		var silk_css = '.silk-icon-accept{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 0;}.silk-icon-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -16px;}.silk-icon-anchor{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -32px;}.silk-icon-application{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -48px;}.silk-icon-application-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -64px;}.silk-icon-application-cascade{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -80px;}.silk-icon-application-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -96px;}.silk-icon-application-double{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -112px;}.silk-icon-application-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -128px;}.silk-icon-application-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -144px;}.silk-icon-application-form{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -160px;}.silk-icon-application-form-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -176px;}.silk-icon-application-form-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -192px;}.silk-icon-application-form-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -208px;}.silk-icon-application-form-magnify{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -224px;}.silk-icon-application-get{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -240px;}.silk-icon-application-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -256px;}.silk-icon-application-home{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -272px;}.silk-icon-application-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -288px;}.silk-icon-application-lightning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -304px;}.silk-icon-application-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -320px;}.silk-icon-application-osx{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -336px;}.silk-icon-application-osx-terminal{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -352px;}.silk-icon-application-put{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -368px;}.silk-icon-application-side-boxes{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -384px;}.silk-icon-application-side-contract{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -400px;}.silk-icon-application-side-expand{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -416px;}.silk-icon-application-side-list{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -432px;}.silk-icon-application-side-tree{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -448px;}.silk-icon-application-split{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -464px;}.silk-icon-application-tile-horizontal{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -480px;}.silk-icon-application-tile-vertical{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -496px;}.silk-icon-application-view-columns{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -512px;}.silk-icon-application-view-detail{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -528px;}.silk-icon-application-view-gallery{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -544px;}.silk-icon-application-view-icons{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -560px;}.silk-icon-application-view-list{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -576px;}.silk-icon-application-view-tile{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -592px;}.silk-icon-application-xp{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -608px;}.silk-icon-application-xp-terminal{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -624px;}.silk-icon-arrow-branch{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -640px;}.silk-icon-arrow-divide{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -656px;}.silk-icon-arrow-down{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -672px;}.silk-icon-arrow-in{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -688px;}.silk-icon-arrow-in-out{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -704px;}.silk-icon-arrow-join{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -720px;}.silk-icon-arrow-left{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -736px;}.silk-icon-arrow-merge{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -752px;}.silk-icon-arrow-out{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -768px;}.silk-icon-arrow-redo{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -784px;}.silk-icon-arrow-refresh{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -800px;}.silk-icon-arrow-refresh-small{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -816px;}.silk-icon-arrow-right{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -832px;}.silk-icon-arrow-rotate-anti-clockwise{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -848px;}.silk-icon-arrow-rotate-clockwise{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -864px;}.silk-icon-arrow-switch{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -880px;}.silk-icon-arrow-turn-left{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -896px;}.silk-icon-arrow-turn-right{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -912px;}.silk-icon-arrow-undo{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -928px;}.silk-icon-arrow-up{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -944px;}.silk-icon-asterisk-orange{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -960px;}.silk-icon-asterisk-yellow{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -976px;}.silk-icon-attach{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -992px;}.silk-icon-award-star-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1008px;}.silk-icon-award-star-bronze1{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1024px;}.silk-icon-award-star-bronze2{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1040px;}.silk-icon-award-star-bronze3{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1056px;}.silk-icon-award-star-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1072px;}.silk-icon-award-star-gold1{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1088px;}.silk-icon-award-star-gold2{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1104px;}.silk-icon-award-star-gold3{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1120px;}.silk-icon-award-star-silver1{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1136px;}.silk-icon-award-star-silver2{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1152px;}.silk-icon-award-star-silver3{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1168px;}.silk-icon-basket{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1184px;}.silk-icon-basket-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1200px;}.silk-icon-basket-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1216px;}.silk-icon-basket-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1232px;}.silk-icon-basket-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1248px;}.silk-icon-basket-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1264px;}.silk-icon-basket-put{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1280px;}.silk-icon-basket-remove{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1296px;}.silk-icon-bell{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1312px;}.silk-icon-bell-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1328px;}.silk-icon-bell-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1344px;}.silk-icon-bell-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1360px;}.silk-icon-bell-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1376px;}.silk-icon-bell-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1392px;}.silk-icon-bin{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1408px;}.silk-icon-bin-closed{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1424px;}.silk-icon-bin-empty{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1440px;}.silk-icon-bomb{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1456px;}.silk-icon-book{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1472px;}.silk-icon-book-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1488px;}.silk-icon-book-addresses{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1504px;}.silk-icon-book-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1520px;}.silk-icon-book-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1536px;}.silk-icon-book-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1552px;}.silk-icon-book-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1568px;}.silk-icon-book-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1584px;}.silk-icon-book-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1600px;}.silk-icon-book-next{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1616px;}.silk-icon-book-open{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1632px;}.silk-icon-book-previous{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1648px;}.silk-icon-box{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1664px;}.silk-icon-brick{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1680px;}.silk-icon-bricks{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1696px;}.silk-icon-brick-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1712px;}.silk-icon-brick-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1728px;}.silk-icon-brick-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1744px;}.silk-icon-brick-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1760px;}.silk-icon-brick-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1776px;}.silk-icon-brick-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1792px;}.silk-icon-briefcase{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1808px;}.silk-icon-bug{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1824px;}.silk-icon-bug-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1840px;}.silk-icon-bug-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1856px;}.silk-icon-bug-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1872px;}.silk-icon-bug-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1888px;}.silk-icon-bug-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1904px;}.silk-icon-bug-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1920px;}.silk-icon-building{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1936px;}.silk-icon-building-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1952px;}.silk-icon-building-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1968px;}.silk-icon-building-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -1984px;}.silk-icon-building-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2000px;}.silk-icon-building-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2016px;}.silk-icon-building-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2032px;}.silk-icon-building-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2048px;}.silk-icon-bullet-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2064px;}.silk-icon-bullet-arrow-bottom{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2080px;}.silk-icon-bullet-arrow-down{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2096px;}.silk-icon-bullet-arrow-top{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2112px;}.silk-icon-bullet-arrow-up{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2128px;}.silk-icon-bullet-black{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2144px;}.silk-icon-bullet-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2160px;}.silk-icon-bullet-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2176px;}.silk-icon-bullet-disk{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2192px;}.silk-icon-bullet-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2208px;}.silk-icon-bullet-feed{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2224px;}.silk-icon-bullet-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2240px;}.silk-icon-bullet-green{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2256px;}.silk-icon-bullet-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2272px;}.silk-icon-bullet-orange{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2288px;}.silk-icon-bullet-picture{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2304px;}.silk-icon-bullet-pink{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2320px;}.silk-icon-bullet-purple{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2336px;}.silk-icon-bullet-red{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2352px;}.silk-icon-bullet-star{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2368px;}.silk-icon-bullet-toggle-minus{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2384px;}.silk-icon-bullet-toggle-plus{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2400px;}.silk-icon-bullet-white{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2416px;}.silk-icon-bullet-wrench{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2432px;}.silk-icon-bullet-yellow{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2448px;}.silk-icon-cake{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2464px;}.silk-icon-calculator{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2480px;}.silk-icon-calculator-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2496px;}.silk-icon-calculator-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2512px;}.silk-icon-calculator-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2528px;}.silk-icon-calculator-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2544px;}.silk-icon-calculator-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2560px;}.silk-icon-calendar{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2576px;}.silk-icon-calendar-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2592px;}.silk-icon-calendar-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2608px;}.silk-icon-calendar-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2624px;}.silk-icon-calendar-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2640px;}.silk-icon-calendar-view-day{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2656px;}.silk-icon-calendar-view-month{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2672px;}.silk-icon-calendar-view-week{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2688px;}.silk-icon-camera{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2704px;}.silk-icon-camera-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2720px;}.silk-icon-camera-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2736px;}.silk-icon-camera-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2752px;}.silk-icon-camera-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2768px;}.silk-icon-camera-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2784px;}.silk-icon-camera-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2800px;}.silk-icon-camera-small{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2816px;}.silk-icon-cancel{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2832px;}.silk-icon-car{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2848px;}.silk-icon-cart{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2864px;}.silk-icon-cart-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2880px;}.silk-icon-cart-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2896px;}.silk-icon-cart-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2912px;}.silk-icon-cart-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2928px;}.silk-icon-cart-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2944px;}.silk-icon-cart-put{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2960px;}.silk-icon-cart-remove{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2976px;}.silk-icon-car-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -2992px;}.silk-icon-car-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3008px;}.silk-icon-cd{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3024px;}.silk-icon-cd-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3040px;}.silk-icon-cd-burn{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3056px;}.silk-icon-cd-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3072px;}.silk-icon-cd-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3088px;}.silk-icon-cd-eject{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3104px;}.silk-icon-cd-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3120px;}.silk-icon-chart-bar{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3136px;}.silk-icon-chart-bar-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3152px;}.silk-icon-chart-bar-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3168px;}.silk-icon-chart-bar-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3184px;}.silk-icon-chart-bar-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3200px;}.silk-icon-chart-bar-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3216px;}.silk-icon-chart-curve{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3232px;}.silk-icon-chart-curve-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3248px;}.silk-icon-chart-curve-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3264px;}.silk-icon-chart-curve-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3280px;}.silk-icon-chart-curve-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3296px;}.silk-icon-chart-curve-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3312px;}.silk-icon-chart-curve-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3328px;}.silk-icon-chart-line{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3344px;}.silk-icon-chart-line-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3360px;}.silk-icon-chart-line-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3376px;}.silk-icon-chart-line-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3392px;}.silk-icon-chart-line-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3408px;}.silk-icon-chart-line-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3424px;}.silk-icon-chart-organisation{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3440px;}.silk-icon-chart-organisation-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3456px;}.silk-icon-chart-organisation-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3472px;}.silk-icon-chart-pie{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3488px;}.silk-icon-chart-pie-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3504px;}.silk-icon-chart-pie-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3520px;}.silk-icon-chart-pie-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3536px;}.silk-icon-chart-pie-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3552px;}.silk-icon-chart-pie-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3568px;}.silk-icon-clock{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3584px;}.silk-icon-clock-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3600px;}.silk-icon-clock-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3616px;}.silk-icon-clock-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3632px;}.silk-icon-clock-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3648px;}.silk-icon-clock-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3664px;}.silk-icon-clock-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3680px;}.silk-icon-clock-pause{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3696px;}.silk-icon-clock-play{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3712px;}.silk-icon-clock-red{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3728px;}.silk-icon-clock-stop{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3744px;}.silk-icon-cog{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3760px;}.silk-icon-cog-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3776px;}.silk-icon-cog-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3792px;}.silk-icon-cog-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3808px;}.silk-icon-cog-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3824px;}.silk-icon-cog-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3840px;}.silk-icon-coins{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3856px;}.silk-icon-coins-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3872px;}.silk-icon-coins-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3888px;}.silk-icon-colors-watch{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3904px;}.silk-icon-color-wheel{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3920px;}.silk-icon-comment{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3936px;}.silk-icon-comments{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3952px;}.silk-icon-comments-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3968px;}.silk-icon-comments-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -3984px;}.silk-icon-comment-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4000px;}.silk-icon-comment-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4016px;}.silk-icon-comment-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4032px;}.silk-icon-compress{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4048px;}.silk-icon-computer{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4064px;}.silk-icon-computer-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4080px;}.silk-icon-computer-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4096px;}.silk-icon-computer-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4112px;}.silk-icon-computer-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4128px;}.silk-icon-computer-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4144px;}.silk-icon-computer-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4160px;}.silk-icon-computer-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4176px;}.silk-icon-connect{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4192px;}.silk-icon-contrast{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4208px;}.silk-icon-contrast-decrease{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4224px;}.silk-icon-contrast-high{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4240px;}.silk-icon-contrast-increase{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4256px;}.silk-icon-contrast-low{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4272px;}.silk-icon-controller{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4288px;}.silk-icon-controller-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4304px;}.silk-icon-controller-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4320px;}.silk-icon-controller-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4336px;}.silk-icon-control-eject{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4352px;}.silk-icon-control-eject-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4368px;}.silk-icon-control-end{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4384px;}.silk-icon-control-end-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4400px;}.silk-icon-control-equalizer{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4416px;}.silk-icon-control-equalizer-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4432px;}.silk-icon-control-fastforward{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4448px;}.silk-icon-control-fastforward-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4464px;}.silk-icon-control-pause{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4480px;}.silk-icon-control-pause-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4496px;}.silk-icon-control-play{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4512px;}.silk-icon-control-play-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4528px;}.silk-icon-control-repeat{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4544px;}.silk-icon-control-repeat-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4560px;}.silk-icon-control-rewind{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4576px;}.silk-icon-control-rewind-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4592px;}.silk-icon-control-start{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4608px;}.silk-icon-control-start-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4624px;}.silk-icon-control-stop{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4640px;}.silk-icon-control-stop-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4656px;}.silk-icon-credit-cards{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4672px;}.silk-icon-cross{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4688px;}.silk-icon-css{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4704px;}.silk-icon-css-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4720px;}.silk-icon-css-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4736px;}.silk-icon-css-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4752px;}.silk-icon-css-valid{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4768px;}.silk-icon-cup{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4784px;}.silk-icon-cup-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4800px;}.silk-icon-cup-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4816px;}.silk-icon-cup-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4832px;}.silk-icon-cup-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4848px;}.silk-icon-cup-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4864px;}.silk-icon-cup-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4880px;}.silk-icon-cup-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4896px;}.silk-icon-cursor{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4912px;}.silk-icon-cut{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4928px;}.silk-icon-cut-red{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4944px;}.silk-icon-database{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4960px;}.silk-icon-database-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4976px;}.silk-icon-database-connect{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -4992px;}.silk-icon-database-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5008px;}.silk-icon-database-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5024px;}.silk-icon-database-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5040px;}.silk-icon-database-gear{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5056px;}.silk-icon-database-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5072px;}.silk-icon-database-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5088px;}.silk-icon-database-lightning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5104px;}.silk-icon-database-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5120px;}.silk-icon-database-refresh{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5136px;}.silk-icon-database-save{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5152px;}.silk-icon-database-table{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5168px;}.silk-icon-date{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5184px;}.silk-icon-date-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5200px;}.silk-icon-date-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5216px;}.silk-icon-date-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5232px;}.silk-icon-date-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5248px;}.silk-icon-date-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5264px;}.silk-icon-date-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5280px;}.silk-icon-date-magnify{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5296px;}.silk-icon-date-next{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5312px;}.silk-icon-date-previous{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5328px;}.silk-icon-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5344px;}.silk-icon-disconnect{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5360px;}.silk-icon-disk{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5376px;}.silk-icon-disk-multiple{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5392px;}.silk-icon-door{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5408px;}.silk-icon-door-in{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5424px;}.silk-icon-door-open{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5440px;}.silk-icon-door-out{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5456px;}.silk-icon-drink{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5472px;}.silk-icon-drink-empty{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5488px;}.silk-icon-drive{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5504px;}.silk-icon-drive-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5520px;}.silk-icon-drive-burn{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5536px;}.silk-icon-drive-cd{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5552px;}.silk-icon-drive-cd-empty{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5568px;}.silk-icon-drive-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5584px;}.silk-icon-drive-disk{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5600px;}.silk-icon-drive-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5616px;}.silk-icon-drive-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5632px;}.silk-icon-drive-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5648px;}.silk-icon-drive-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5664px;}.silk-icon-drive-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5680px;}.silk-icon-drive-magnify{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5696px;}.silk-icon-drive-network{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5712px;}.silk-icon-drive-rename{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5728px;}.silk-icon-drive-user{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5744px;}.silk-icon-drive-web{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5760px;}.silk-icon-dvd{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5776px;}.silk-icon-dvd-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5792px;}.silk-icon-dvd-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5808px;}.silk-icon-dvd-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5824px;}.silk-icon-dvd-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5840px;}.silk-icon-dvd-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5856px;}.silk-icon-dvd-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5872px;}.silk-icon-dvd-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5888px;}.silk-icon-email{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5904px;}.silk-icon-email-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5920px;}.silk-icon-email-attach{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5936px;}.silk-icon-email-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5952px;}.silk-icon-email-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5968px;}.silk-icon-email-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -5984px;}.silk-icon-email-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6000px;}.silk-icon-email-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6016px;}.silk-icon-email-open{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6032px;}.silk-icon-email-open-image{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6048px;}.silk-icon-emoticon-evilgrin{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6064px;}.silk-icon-emoticon-grin{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6080px;}.silk-icon-emoticon-happy{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6096px;}.silk-icon-emoticon-smile{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6112px;}.silk-icon-emoticon-surprised{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6128px;}.silk-icon-emoticon-tongue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6144px;}.silk-icon-emoticon-unhappy{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6160px;}.silk-icon-emoticon-waii{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6176px;}.silk-icon-emoticon-wink{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6192px;}.silk-icon-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6208px;}.silk-icon-error-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6224px;}.silk-icon-error-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6240px;}.silk-icon-error-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6256px;}.silk-icon-exclamation{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6272px;}.silk-icon-eye{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6288px;}.silk-icon-feed{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6304px;}.silk-icon-feed-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6320px;}.silk-icon-feed-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6336px;}.silk-icon-feed-disk{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6352px;}.silk-icon-feed-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6368px;}.silk-icon-feed-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6384px;}.silk-icon-feed-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6400px;}.silk-icon-feed-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6416px;}.silk-icon-feed-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6432px;}.silk-icon-feed-magnify{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6448px;}.silk-icon-female{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6464px;}.silk-icon-film{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6480px;}.silk-icon-film-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6496px;}.silk-icon-film-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6512px;}.silk-icon-film-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6528px;}.silk-icon-film-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6544px;}.silk-icon-film-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6560px;}.silk-icon-film-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6576px;}.silk-icon-film-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6592px;}.silk-icon-film-save{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6608px;}.silk-icon-find{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6624px;}.silk-icon-flag-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6640px;}.silk-icon-flag-green{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6656px;}.silk-icon-flag-orange{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6672px;}.silk-icon-flag-pink{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6688px;}.silk-icon-flag-purple{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6704px;}.silk-icon-flag-red{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6720px;}.silk-icon-flag-yellow{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6736px;}.silk-icon-folder{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6752px;}.silk-icon-folder-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6768px;}.silk-icon-folder-bell{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6784px;}.silk-icon-folder-brick{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6800px;}.silk-icon-folder-bug{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6816px;}.silk-icon-folder-camera{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6832px;}.silk-icon-folder-database{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6848px;}.silk-icon-folder-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6864px;}.silk-icon-folder-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6880px;}.silk-icon-folder-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6896px;}.silk-icon-folder-explore{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6912px;}.silk-icon-folder-feed{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6928px;}.silk-icon-folder-find{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6944px;}.silk-icon-folder-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6960px;}.silk-icon-folder-heart{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6976px;}.silk-icon-folder-image{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -6992px;}.silk-icon-folder-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7008px;}.silk-icon-folder-lightbulb{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7024px;}.silk-icon-folder-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7040px;}.silk-icon-folder-magnify{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7056px;}.silk-icon-folder-page{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7072px;}.silk-icon-folder-page-white{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7088px;}.silk-icon-folder-palette{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7104px;}.silk-icon-folder-picture{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7120px;}.silk-icon-folder-star{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7136px;}.silk-icon-folder-table{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7152px;}.silk-icon-folder-user{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7168px;}.silk-icon-folder-wrench{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7184px;}.silk-icon-font{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7200px;}.silk-icon-font-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7216px;}.silk-icon-font-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7232px;}.silk-icon-font-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7248px;}.silk-icon-group{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7264px;}.silk-icon-group-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7280px;}.silk-icon-group-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7296px;}.silk-icon-group-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7312px;}.silk-icon-group-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7328px;}.silk-icon-group-gear{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7344px;}.silk-icon-group-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7360px;}.silk-icon-group-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7376px;}.silk-icon-group-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7392px;}.silk-icon-heart{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7408px;}.silk-icon-heart-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7424px;}.silk-icon-heart-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7440px;}.silk-icon-help{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7456px;}.silk-icon-hourglass{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7472px;}.silk-icon-hourglass-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7488px;}.silk-icon-hourglass-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7504px;}.silk-icon-hourglass-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7520px;}.silk-icon-hourglass-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7536px;}.silk-icon-house{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7552px;}.silk-icon-house-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7568px;}.silk-icon-house-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7584px;}.silk-icon-html{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7600px;}.silk-icon-html-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7616px;}.silk-icon-html-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7632px;}.silk-icon-html-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7648px;}.silk-icon-html-valid{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7664px;}.silk-icon-image{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7680px;}.silk-icon-images{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7696px;}.silk-icon-image-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7712px;}.silk-icon-image-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7728px;}.silk-icon-image-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7744px;}.silk-icon-image-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7760px;}.silk-icon-information{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7776px;}.silk-icon-ipod{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7792px;}.silk-icon-ipodcast{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7808px;}.silk-icon-ipodcast-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7824px;}.silk-icon-ipodcast-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7840px;}.silk-icon-ipod-sound{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7856px;}.silk-icon-joystick{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7872px;}.silk-icon-joystick-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7888px;}.silk-icon-joystick-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7904px;}.silk-icon-joystick-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7920px;}.silk-icon-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7936px;}.silk-icon-keyboard{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7952px;}.silk-icon-keyboard-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7968px;}.silk-icon-keyboard-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -7984px;}.silk-icon-keyboard-magnify{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8000px;}.silk-icon-key-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8016px;}.silk-icon-key-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8032px;}.silk-icon-key-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8048px;}.silk-icon-layers{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8064px;}.silk-icon-layout{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8080px;}.silk-icon-layout-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8096px;}.silk-icon-layout-content{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8112px;}.silk-icon-layout-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8128px;}.silk-icon-layout-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8144px;}.silk-icon-layout-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8160px;}.silk-icon-layout-header{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8176px;}.silk-icon-layout-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8192px;}.silk-icon-layout-sidebar{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8208px;}.silk-icon-lightbulb{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8224px;}.silk-icon-lightbulb-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8240px;}.silk-icon-lightbulb-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8256px;}.silk-icon-lightbulb-off{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8272px;}.silk-icon-lightning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8288px;}.silk-icon-lightning-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8304px;}.silk-icon-lightning-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8320px;}.silk-icon-lightning-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8336px;}.silk-icon-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8352px;}.silk-icon-link-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8368px;}.silk-icon-link-break{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8384px;}.silk-icon-link-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8400px;}.silk-icon-link-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8416px;}.silk-icon-link-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8432px;}.silk-icon-link-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8448px;}.silk-icon-lock{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8464px;}.silk-icon-lock-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8480px;}.silk-icon-lock-break{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8496px;}.silk-icon-lock-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8512px;}.silk-icon-lock-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8528px;}.silk-icon-lock-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8544px;}.silk-icon-lock-open{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8560px;}.silk-icon-lorry{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8576px;}.silk-icon-lorry-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8592px;}.silk-icon-lorry-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8608px;}.silk-icon-lorry-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8624px;}.silk-icon-lorry-flatbed{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8640px;}.silk-icon-lorry-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8656px;}.silk-icon-lorry-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8672px;}.silk-icon-magifier-zoom-out{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8688px;}.silk-icon-magnifier{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8704px;}.silk-icon-magnifier-zoom-in{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8720px;}.silk-icon-male{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8736px;}.silk-icon-map{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8752px;}.silk-icon-map-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8768px;}.silk-icon-map-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8784px;}.silk-icon-map-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8800px;}.silk-icon-map-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8816px;}.silk-icon-map-magnify{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8832px;}.silk-icon-medal-bronze1{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8848px;}.silk-icon-medal-bronze2{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8864px;}.silk-icon-medal-bronze3{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8880px;}.silk-icon-medal-bronze-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8896px;}.silk-icon-medal-bronze-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8912px;}.silk-icon-medal-gold1{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8928px;}.silk-icon-medal-gold2{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8944px;}.silk-icon-medal-gold3{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8960px;}.silk-icon-medal-gold-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8976px;}.silk-icon-medal-gold-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -8992px;}.silk-icon-medal-silver1{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9008px;}.silk-icon-medal-silver2{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9024px;}.silk-icon-medal-silver3{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9040px;}.silk-icon-medal-silver-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9056px;}.silk-icon-medal-silver-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9072px;}.silk-icon-money{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9088px;}.silk-icon-money-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9104px;}.silk-icon-money-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9120px;}.silk-icon-money-dollar{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9136px;}.silk-icon-money-euro{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9152px;}.silk-icon-money-pound{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9168px;}.silk-icon-money-yen{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9184px;}.silk-icon-monitor{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9200px;}.silk-icon-monitor-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9216px;}.silk-icon-monitor-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9232px;}.silk-icon-monitor-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9248px;}.silk-icon-monitor-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9264px;}.silk-icon-monitor-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9280px;}.silk-icon-monitor-lightning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9296px;}.silk-icon-monitor-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9312px;}.silk-icon-mouse{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9328px;}.silk-icon-mouse-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9344px;}.silk-icon-mouse-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9360px;}.silk-icon-mouse-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9376px;}.silk-icon-music{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9392px;}.silk-icon-new{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9408px;}.silk-icon-newspaper{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9424px;}.silk-icon-newspaper-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9440px;}.silk-icon-newspaper-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9456px;}.silk-icon-newspaper-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9472px;}.silk-icon-newspaper-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9488px;}.silk-icon-note{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9504px;}.silk-icon-note-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9520px;}.silk-icon-note-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9536px;}.silk-icon-note-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9552px;}.silk-icon-note-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9568px;}.silk-icon-note-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9584px;}.silk-icon-overlays{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9600px;}.silk-icon-package{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9616px;}.silk-icon-package-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9632px;}.silk-icon-package-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9648px;}.silk-icon-package-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9664px;}.silk-icon-package-green{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9680px;}.silk-icon-package-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9696px;}.silk-icon-page{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9712px;}.silk-icon-page-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9728px;}.silk-icon-page-attach{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9744px;}.silk-icon-page-code{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9760px;}.silk-icon-page-copy{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9776px;}.silk-icon-page-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9792px;}.silk-icon-page-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9808px;}.silk-icon-page-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9824px;}.silk-icon-page-excel{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9840px;}.silk-icon-page-find{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9856px;}.silk-icon-page-gear{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9872px;}.silk-icon-page-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9888px;}.silk-icon-page-green{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9904px;}.silk-icon-page-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9920px;}.silk-icon-page-lightning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9936px;}.silk-icon-page-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9952px;}.silk-icon-page-paintbrush{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9968px;}.silk-icon-page-paste{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -9984px;}.silk-icon-page-red{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10000px;}.silk-icon-page-refresh{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10016px;}.silk-icon-page-save{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10032px;}.silk-icon-page-white{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10048px;}.silk-icon-page-white-acrobat{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10064px;}.silk-icon-page-white-actionscript{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10080px;}.silk-icon-page-white-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10096px;}.silk-icon-page-white-c{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10112px;}.silk-icon-page-white-camera{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10128px;}.silk-icon-page-white-cd{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10144px;}.silk-icon-page-white-code{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10160px;}.silk-icon-page-white-code-red{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10176px;}.silk-icon-page-white-coldfusion{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10192px;}.silk-icon-page-white-compressed{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10208px;}.silk-icon-page-white-copy{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10224px;}.silk-icon-page-white-cplusplus{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10240px;}.silk-icon-page-white-csharp{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10256px;}.silk-icon-page-white-cup{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10272px;}.silk-icon-page-white-database{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10288px;}.silk-icon-page-white-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10304px;}.silk-icon-page-white-dvd{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10320px;}.silk-icon-page-white-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10336px;}.silk-icon-page-white-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10352px;}.silk-icon-page-white-excel{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10368px;}.silk-icon-page-white-find{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10384px;}.silk-icon-page-white-flash{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10400px;}.silk-icon-page-white-freehand{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10416px;}.silk-icon-page-white-gear{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10432px;}.silk-icon-page-white-get{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10448px;}.silk-icon-page-white-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10464px;}.silk-icon-page-white-h{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10480px;}.silk-icon-page-white-horizontal{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10496px;}.silk-icon-page-white-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10512px;}.silk-icon-page-white-lightning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10528px;}.silk-icon-page-white-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10544px;}.silk-icon-page-white-magnify{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10560px;}.silk-icon-page-white-medal{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10576px;}.silk-icon-page-white-office{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10592px;}.silk-icon-page-white-paint{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10608px;}.silk-icon-page-white-paintbrush{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10624px;}.silk-icon-page-white-paste{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10640px;}.silk-icon-page-white-php{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10656px;}.silk-icon-page-white-picture{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10672px;}.silk-icon-page-white-powerpoint{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10688px;}.silk-icon-page-white-put{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10704px;}.silk-icon-page-white-ruby{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10720px;}.silk-icon-page-white-stack{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10736px;}.silk-icon-page-white-star{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10752px;}.silk-icon-page-white-swoosh{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10768px;}.silk-icon-page-white-text{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10784px;}.silk-icon-page-white-text-width{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10800px;}.silk-icon-page-white-tux{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10816px;}.silk-icon-page-white-vector{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10832px;}.silk-icon-page-white-visualstudio{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10848px;}.silk-icon-page-white-width{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10864px;}.silk-icon-page-white-word{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10880px;}.silk-icon-page-white-world{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10896px;}.silk-icon-page-white-wrench{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10912px;}.silk-icon-page-white-zip{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10928px;}.silk-icon-page-word{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10944px;}.silk-icon-page-world{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10960px;}.silk-icon-paintbrush{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10976px;}.silk-icon-paintcan{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -10992px;}.silk-icon-palette{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11008px;}.silk-icon-paste-plain{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11024px;}.silk-icon-paste-word{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11040px;}.silk-icon-pencil{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11056px;}.silk-icon-pencil-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11072px;}.silk-icon-pencil-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11088px;}.silk-icon-pencil-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11104px;}.silk-icon-phone{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11120px;}.silk-icon-phone-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11136px;}.silk-icon-phone-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11152px;}.silk-icon-phone-sound{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11168px;}.silk-icon-photo{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11184px;}.silk-icon-photos{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11200px;}.silk-icon-photo-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11216px;}.silk-icon-photo-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11232px;}.silk-icon-photo-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11248px;}.silk-icon-picture{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11264px;}.silk-icon-pictures{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11280px;}.silk-icon-picture-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11296px;}.silk-icon-picture-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11312px;}.silk-icon-picture-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11328px;}.silk-icon-picture-empty{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11344px;}.silk-icon-picture-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11360px;}.silk-icon-picture-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11376px;}.silk-icon-picture-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11392px;}.silk-icon-picture-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11408px;}.silk-icon-picture-save{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11424px;}.silk-icon-pilcrow{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11440px;}.silk-icon-pill{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11456px;}.silk-icon-pill-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11472px;}.silk-icon-pill-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11488px;}.silk-icon-pill-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11504px;}.silk-icon-plugin{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11520px;}.silk-icon-plugin-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11536px;}.silk-icon-plugin-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11552px;}.silk-icon-plugin-disabled{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11568px;}.silk-icon-plugin-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11584px;}.silk-icon-plugin-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11600px;}.silk-icon-plugin-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11616px;}.silk-icon-plugin-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11632px;}.silk-icon-printer{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11648px;}.silk-icon-printer-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11664px;}.silk-icon-printer-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11680px;}.silk-icon-printer-empty{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11696px;}.silk-icon-printer-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11712px;}.silk-icon-rainbow{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11728px;}.silk-icon-report{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11744px;}.silk-icon-report-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11760px;}.silk-icon-report-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11776px;}.silk-icon-report-disk{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11792px;}.silk-icon-report-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11808px;}.silk-icon-report-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11824px;}.silk-icon-report-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11840px;}.silk-icon-report-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11856px;}.silk-icon-report-magnify{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11872px;}.silk-icon-report-picture{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11888px;}.silk-icon-report-user{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11904px;}.silk-icon-report-word{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11920px;}.silk-icon-result-set-first{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11936px;}.silk-icon-result-set-last{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11952px;}.silk-icon-result-set-next{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11968px;}.silk-icon-result-set-previous{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -11984px;}.silk-icon-rosette{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12000px;}.silk-icon-rss{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12016px;}.silk-icon-rss-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12032px;}.silk-icon-rss-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12048px;}.silk-icon-rss-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12064px;}.silk-icon-rss-valid{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12080px;}.silk-icon-ruby{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12096px;}.silk-icon-ruby-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12112px;}.silk-icon-ruby-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12128px;}.silk-icon-ruby-gear{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12144px;}.silk-icon-ruby-get{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12160px;}.silk-icon-ruby-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12176px;}.silk-icon-ruby-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12192px;}.silk-icon-ruby-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12208px;}.silk-icon-ruby-put{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12224px;}.silk-icon-script{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12240px;}.silk-icon-script-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12256px;}.silk-icon-script-code{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12272px;}.silk-icon-script-code-red{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12288px;}.silk-icon-script-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12304px;}.silk-icon-script-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12320px;}.silk-icon-script-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12336px;}.silk-icon-script-gear{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12352px;}.silk-icon-script-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12368px;}.silk-icon-script-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12384px;}.silk-icon-script-lightning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12400px;}.silk-icon-script-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12416px;}.silk-icon-script-palette{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12432px;}.silk-icon-script-save{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12448px;}.silk-icon-server{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12464px;}.silk-icon-server-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12480px;}.silk-icon-server-chart{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12496px;}.silk-icon-server-compressed{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12512px;}.silk-icon-server-connect{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12528px;}.silk-icon-server-database{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12544px;}.silk-icon-server-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12560px;}.silk-icon-server-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12576px;}.silk-icon-server-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12592px;}.silk-icon-server-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12608px;}.silk-icon-server-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12624px;}.silk-icon-server-lightning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12640px;}.silk-icon-server-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12656px;}.silk-icon-server-uncompressed{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12672px;}.silk-icon-shading{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12688px;}.silk-icon-shape-align-bottom{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12704px;}.silk-icon-shape-align-center{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12720px;}.silk-icon-shape-align-left{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12736px;}.silk-icon-shape-align-middle{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12752px;}.silk-icon-shape-align-right{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12768px;}.silk-icon-shape-align-top{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12784px;}.silk-icon-shape-flip-horizontal{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12800px;}.silk-icon-shape-flip-vertical{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12816px;}.silk-icon-shape-group{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12832px;}.silk-icon-shape-handles{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12848px;}.silk-icon-shape-move-back{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12864px;}.silk-icon-shape-move-backwards{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12880px;}.silk-icon-shape-move-forwards{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12896px;}.silk-icon-shape-move-front{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12912px;}.silk-icon-shape-rotate-anti-clockwise{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12928px;}.silk-icon-shape-rotate-clockwise{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12944px;}.silk-icon-shape-square{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12960px;}.silk-icon-shape-square-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12976px;}.silk-icon-shape-square-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -12992px;}.silk-icon-shape-square-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13008px;}.silk-icon-shape-square-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13024px;}.silk-icon-shape-square-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13040px;}.silk-icon-shape-square-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13056px;}.silk-icon-shape-square-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13072px;}.silk-icon-shape-ungroup{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13088px;}.silk-icon-shield{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13104px;}.silk-icon-shield-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13120px;}.silk-icon-shield-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13136px;}.silk-icon-shield-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13152px;}.silk-icon-sitemap{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13168px;}.silk-icon-sitemap-color{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13184px;}.silk-icon-sound{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13200px;}.silk-icon-sound-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13216px;}.silk-icon-sound-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13232px;}.silk-icon-sound-low{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13248px;}.silk-icon-sound-mute{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13264px;}.silk-icon-sound-none{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13280px;}.silk-icon-spell-check{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13296px;}.silk-icon-sport8ball{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13312px;}.silk-icon-sport-basketball{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13328px;}.silk-icon-sport-football{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13344px;}.silk-icon-sport-golf{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13360px;}.silk-icon-sport-raquet{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13376px;}.silk-icon-sport-shuttle-cock{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13392px;}.silk-icon-sport-soccer{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13408px;}.silk-icon-sport-tennis{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13424px;}.silk-icon-star{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13440px;}.silk-icon-status-away{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13456px;}.silk-icon-status-busy{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13472px;}.silk-icon-status-off-line{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13488px;}.silk-icon-status-online{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13504px;}.silk-icon-stop{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13520px;}.silk-icon-style{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13536px;}.silk-icon-style-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13552px;}.silk-icon-style-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13568px;}.silk-icon-style-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13584px;}.silk-icon-style-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13600px;}.silk-icon-sum{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13616px;}.silk-icon-tab{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13632px;}.silk-icon-table{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13648px;}.silk-icon-table-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13664px;}.silk-icon-table-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13680px;}.silk-icon-table-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13696px;}.silk-icon-table-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13712px;}.silk-icon-table-gear{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13728px;}.silk-icon-table-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13744px;}.silk-icon-table-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13760px;}.silk-icon-table-lightning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13776px;}.silk-icon-table-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13792px;}.silk-icon-table-multiple{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13808px;}.silk-icon-table-refresh{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13824px;}.silk-icon-table-relationship{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13840px;}.silk-icon-table-row-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13856px;}.silk-icon-table-row-insert{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13872px;}.silk-icon-table-save{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13888px;}.silk-icon-table-sort{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13904px;}.silk-icon-tab-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13920px;}.silk-icon-tab-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13936px;}.silk-icon-tab-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13952px;}.silk-icon-tab-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13968px;}.silk-icon-tag{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -13984px;}.silk-icon-tag-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14000px;}.silk-icon-tag-blue-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14016px;}.silk-icon-tag-blue-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14032px;}.silk-icon-tag-blue-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14048px;}.silk-icon-tag-green{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14064px;}.silk-icon-tag-orange{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14080px;}.silk-icon-tag-pink{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14096px;}.silk-icon-tag-purple{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14112px;}.silk-icon-tag-red{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14128px;}.silk-icon-tag-yellow{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14144px;}.silk-icon-telephone{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14160px;}.silk-icon-telephone-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14176px;}.silk-icon-telephone-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14192px;}.silk-icon-telephone-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14208px;}.silk-icon-telephone-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14224px;}.silk-icon-telephone-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14240px;}.silk-icon-telephone-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14256px;}.silk-icon-telephone-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14272px;}.silk-icon-television{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14288px;}.silk-icon-television-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14304px;}.silk-icon-television-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14320px;}.silk-icon-textfield{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14336px;}.silk-icon-textfield-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14352px;}.silk-icon-textfield-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14368px;}.silk-icon-textfield-key{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14384px;}.silk-icon-textfield-rename{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14400px;}.silk-icon-text-align-center{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14416px;}.silk-icon-text-align-justify{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14432px;}.silk-icon-text-align-left{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14448px;}.silk-icon-text-align-right{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14464px;}.silk-icon-text-all-caps{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14480px;}.silk-icon-text-bold{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14496px;}.silk-icon-text-columns{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14512px;}.silk-icon-text-dropcaps{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14528px;}.silk-icon-text-heading1{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14544px;}.silk-icon-text-heading2{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14560px;}.silk-icon-text-heading3{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14576px;}.silk-icon-text-heading4{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14592px;}.silk-icon-text-heading5{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14608px;}.silk-icon-text-heading6{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14624px;}.silk-icon-text-horizontal-rule{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14640px;}.silk-icon-text-indent{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14656px;}.silk-icon-text-indent-remove{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14672px;}.silk-icon-text-italic{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14688px;}.silk-icon-text-kerning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14704px;}.silk-icon-text-letter-spacing{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14720px;}.silk-icon-text-letter-omega{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14736px;}.silk-icon-text-line-spacing{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14752px;}.silk-icon-text-list-bullets{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14768px;}.silk-icon-text-list-numbers{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14784px;}.silk-icon-text-lowercase{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14800px;}.silk-icon-text-padding-bottom{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14816px;}.silk-icon-text-padding-left{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14832px;}.silk-icon-text-padding-right{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14848px;}.silk-icon-text-padding-top{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14864px;}.silk-icon-text-replace{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14880px;}.silk-icon-text-signature{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14896px;}.silk-icon-text-smallcaps{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14912px;}.silk-icon-text-strikethrough{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14928px;}.silk-icon-text-subscript{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14944px;}.silk-icon-text-superscript{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14960px;}.silk-icon-text-under-line{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14976px;}.silk-icon-text-uppercase{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -14992px;}.silk-icon-thumb-down{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15008px;}.silk-icon-thumb-up{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15024px;}.silk-icon-tick{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15040px;}.silk-icon-time{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15056px;}.silk-icon-time-linemarker{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15072px;}.silk-icon-time-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15088px;}.silk-icon-time-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15104px;}.silk-icon-time-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15120px;}.silk-icon-transmit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15136px;}.silk-icon-transmit-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15152px;}.silk-icon-transmit-blue{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15168px;}.silk-icon-transmit-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15184px;}.silk-icon-transmit-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15200px;}.silk-icon-transmit-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15216px;}.silk-icon-transmit-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15232px;}.silk-icon-tux{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15248px;}.silk-icon-user{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15264px;}.silk-icon-user-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15280px;}.silk-icon-user-comment{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15296px;}.silk-icon-user-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15312px;}.silk-icon-user-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15328px;}.silk-icon-user-female{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15344px;}.silk-icon-user-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15360px;}.silk-icon-user-gray{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15376px;}.silk-icon-user-green{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15392px;}.silk-icon-user-orange{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15408px;}.silk-icon-user-red{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15424px;}.silk-icon-user-suit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15440px;}.silk-icon-v-card{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15456px;}.silk-icon-v-card-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15472px;}.silk-icon-v-card-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15488px;}.silk-icon-v-card-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15504px;}.silk-icon-vector{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15520px;}.silk-icon-vector-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15536px;}.silk-icon-vector-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15552px;}.silk-icon-wand{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15568px;}.silk-icon-weather-clouds{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15584px;}.silk-icon-weather-cloudy{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15600px;}.silk-icon-weather-lightning{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15616px;}.silk-icon-weather-rain{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15632px;}.silk-icon-weather-snow{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15648px;}.silk-icon-weather-sun{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15664px;}.silk-icon-webcam{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15680px;}.silk-icon-webcam-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15696px;}.silk-icon-webcam-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15712px;}.silk-icon-webcam-error{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15728px;}.silk-icon-world{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15744px;}.silk-icon-world-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15760px;}.silk-icon-world-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15776px;}.silk-icon-world-edit{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15792px;}.silk-icon-world-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15808px;}.silk-icon-world-link{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15824px;}.silk-icon-wrench{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15840px;}.silk-icon-wrench-orange{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15856px;}.silk-icon-xhtml{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15872px;}.silk-icon-xhtml-add{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15888px;}.silk-icon-xhtml-delete{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15904px;}.silk-icon-xhtml-go{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15920px;}.silk-icon-xhtml-valid{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15936px;}.silk-icon-zoom{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15952px;}.silk-icon-zoom-in{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15968px;}.silk-icon-zoom-out{background-image:url(http://michaelb.org/projects/jquery-silk-icons/silk-icons.png)!important;background-position:0 -15984px;}';
		GM_addStyle(silk_css);
		this.c.$player.after(menu);
		
		$('#YTB_MenuBar .yt-uix-button.ytb-playersize-button').click(function(e){
			//e.currentTarget
			//console.log(e);
			var $target = $(e.currentTarget);
			var data = $target.attr("data");
			$('#YTB_MenuBar .yt-uix-button.yt-uix-button-toggled').removeClass('yt-uix-button-toggled');
			//$('#YTB_MenuBar .yt-uix-button[data="' + data + '"]').addClass('yt-uix-button-toggled');
			$target.addClass('yt-uix-button-toggled');
			YTB.setPlayerSize(data);
			//console.log(data);
		});
		
		$('#ytb-options-toggle').click(function(){
			var $options = $('#ytb-options');
			var $options_text = $('#ytb-options-toggle span.yt-uix-button-content:first');
			if($options.css('display') == "none"){
				$options.css({display: 'block'});
				$options_text.html('Hide Options');;
			} else {
				$options.css({display: 'none'});
				$options_text.html('Show Options');;
			}
		
		});
		
		
		$('#YTBSavePrefs').click(function(){
			//console.log('save');
			for(var x in YTB['prefs'].value){
				var pref = YTB['prefs'].value[x];
			//$("input[name='alwaysShowMenuBar_radio']:checked");
				if(pref.type == 'select'){
					//console.log('select');
					//$("select[name='playerSize']").val();
					var val = $("select[name='" + x + "']").val();
					//var val = $("select[name='playerSize']").val();
					YTB['prefs'].setPrefValue(x, parseInt(val));
					//console.log(x + ': ' + val);
				} else if(pref.type == 'boolean'){
					//console.log('boolean');
					var val = $("input[name='" + x + "']:checked").val();
					YTB['prefs'].setPrefValue(x, val);
					//console.log(x + ': ' + val);
				} else if(pref.type == 'addremovelist'){
					//var list = $("select[name='" + x + "']");
					var val = {};
					$("select[name='" + x + "'] option").each(function(index, Element){
						val[index] = $(Element).html();
					});
					var str = JSON.stringify(val);
					YTB['prefs'].setPrefValue(x, str);
				}
			}
			
			YTB['prefs'].save();
			//$('#YTBSavePrefs').html('Saved!');
			//console.log(YTB['prefs'].value);
			YTB['Update_Options_StatusBar']('Saved!', 'green');
		});
		
};

YTB['Update_Options_StatusBar'] = function(text, class_name, timeout){
	//ytb-options-statusbar-span-icon
	$('#ytb-options-statusbar').finish();
	$('#ytb-options-statusbar-span-icon').removeClass();
	$('#ytb-options-statusbar-span-icon').addClass('ui-button-icon-primary ui-icon');
	//ui-button-icon-primary ui-icon silk-icon-accept
	//ytb-options-statusbar tyb-options-statusbar-green
	if(class_name == "green"){
		$('#ytb-options-statusbar').addClass('tyb-options-statusbar-green');
		$('#ytb-options-statusbar-span-icon').addClass('silk-icon-accept');
	} else if(class_name == "red"){
		$('#ytb-options-statusbar').addClass('tyb-options-statusbar-red');
		$('#ytb-options-statusbar-span-icon').addClass('silk-icon-cancel');
	}
	
	$('#ytb-options-statusbar-span-text').html(text);
	
	$('#ytb-options-statusbar').show();
	$('#ytb-options-statusbar').css('opacity', '1');
	
	
	setTimeout(function(){
	$('#ytb-options-statusbar').fadeOut({
		duration: 2000,
		easing: 'swing',
	});
	}, (timeout ? timeout : 3000));
};

YTB['YT_Func'] = {
	'getPageType': function(){
		var url = window.location.href;
		var videoPage = /youtube\.com\/watch\?/i;
		var subscriptionsPage = /youtube\.com\/feed\/subscriptions/i;
		if(videoPage.test(url)){
			return 'video';
		} else if(subscriptionsPage.test(url)){
			return 'subscriptions';
		}
		
		return undefined;
	},

	'getChannelName': function(){
		//g-hovercard yt-uix-sessionlink yt-user-name
		return $('.yt-user-name:first').html();
	},
	
	'getVideoThumb': function(videoID, quality, thumbNumb){
		var o = 'http://img.youtube.com/vi/' + videoID + '/';
		/*
		Low Quality:
			http://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
			
		Default Quality:
			http://img.youtube.com/vi/<insert-youtube-video-id-here>/default.jpg
			
		High Quality:
			http://img.youtube.com/vi/<insert-youtube-video-id-here>/hqdefault.jpg
		
		Medium Quality:
			http://img.youtube.com/vi/<insert-youtube-video-id-here>/mqdefault.jpg
		
		Standard Quality:
			http://img.youtube.com/vi/<insert-youtube-video-id-here>/sddefault.jpg
			
		Max Quality:
			http://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg
		
		*/
		
		switch(quality){
			case 'low':
				o += (thumbNumb ? thumbNumb : '0') + '.jpg';
				break;
			case 'high':
				o += 'hqdefault.jpg';
				break;
			case 'medium':
				o += 'mqdefault.jpg';
				break;
			case 'standard':
				o += 'sddefault.jpg';
				break;
			case 'max':
				o += 'maxresdefault.jpg';
				break;
			case 'default':
			default:
				o += 'default.jpg';
				break;
		}
		return o;
	},
	
	'getVideoIdFromURL': function(url){
		var id = '';
		
		////i1.ytimg.com/vi/yiWB7TKmLgA/default.jpg
		
		//is image url
		var imageURL = /\/vi\/([0-9a-zA-Z_-]+)\/[0-9a-zA-Z]+\.jpg/i;
		if(imageURL.test(url)){
			id = imageURL.exec(url)[1];
			return id;
		}
		
		
		return id;
	},
	
	'flashvars': {
		obj: {},
		toString: function(fv){
			var o = '';
			var arr = [];
			var fv_obj = (fv ? fv : this.obj);
			var c = 0;
			for(var x in fv_obj){
				arr[c] = x + '=' + fv_obj[x];
				
				c++;
			}
			
			o = arr.join('&');
			
			return o;
		},
		'getFlashVars': function(){
			return YTB.c.$moviePlayer.attr('flashvars');
		},
		
		'setFlashVars': function(fv_str){
			YTB.c.$moviePlayer.attr('flashvars', (fv_str ? fv_str : this.toString()));
		},
		
		'parseFlashVars': function(fv_str){
			var o = {};
			var regEx = /\&/g;
			//var str = fv_str.replace(regEx, '\r\n');
			
			var str_arr = (fv_str ? fv_str : this.getFlashVars()).split('&');
			
			for(var x = 0; x < str_arr.length; x++){
				var t = str_arr[x].split('=');
				o[t[0]] = t[1];
			}
			return o;
		},
		
		'getValue': function(key){
			return this.obj[key];
		},
		
		'setValue': function(key, val){
			this.obj[key] = val;
		},
		
		'refresh': function(){
			this.obj = this.parseFlashVars();
		},
		
		'push': function(){
			this.setFlashVars();
			var html = YTB.c.$playerApi.html();
			YTB.c.$playerApi.html('')
			YTB.c.$playerApi.html(html)
		}
	}
};

YTB['thumbnails'] = {
	'thumbTimer': undefined,

	'changeThumbnail': function(ytThumbClip_Element, quality, thumbNum){
		var $img = $(ytThumbClip_Element).find('img:first');
		
		var videoId = YTB.YT_Func.getVideoIdFromURL($img.attr('src'));
		
		var url = YTB.YT_Func.getVideoThumb(videoId, quality, thumbNum)
		
		$img.attr('src', url);
		
		//return url;
		
	},
	
	'nextThumbnail': function(ytThumbClip_Element){
		var $img = $(ytThumbClip_Element).find('img:first');
		var thumbNum = 1;
		
		if($img.attr('YTB-ThumbNumb')){
			thumbNum = parseInt($img.attr('YTB-ThumbNumb')) + 1;
			if(thumbNum > 3) thumbNum = 0;
		}
		
		$img.attr('YTB-ThumbNumb', thumbNum)
		this.changeThumbnail(ytThumbClip_Element, 'low', thumbNum);
	},
	
	'onMouseOver': function(e){
		var ytThumbClip_Element = null;
		var videoListItemElement = null;
		var feedItemContainer = null;
		if($(e.currentTarget).hasClass('video-list-item')){
			videoListItemElement = e.currentTarget;
			ytThumbClip_Element = $(videoListItemElement).find('span.yt-thumb-clip')[0];
		} else if($(e.currentTarget).hasClass('yt-thumb-clip')){
			ytThumbClip_Element = e.currentTarget;
			//videoListItemElement = $(ytThumbClip_Element).parents('li.video-list-item:first')[0];
		} else if($(e.currentTarget).hasClass('feed-item-container')){
			feedItemContainer = e.currentTarget;
			ytThumbClip_Element = $(feedItemContainer).find('.feed-item-main-content span.yt-thumb-clip')[0];
		}
		
		
		YTB['thumbnails'].thumbTimer = setInterval(function(thumbEl){
				YTB['thumbnails'].nextThumbnail(thumbEl);
			},1000, ytThumbClip_Element);
		//console.log('MouseOver: ', ytThumbClip_Element);
	},
	
	'onMouseOut': function(e){
		var ytThumbClip_Element = null;
		var videoListItemElement = null;
		var feedItemContainer = null;
		if($(e.currentTarget).hasClass('video-list-item')){
			videoListItemElement = e.currentTarget;
			ytThumbClip_Element = $(videoListItemElement).find('span.yt-thumb-clip')[0];
		} else if($(e.currentTarget).hasClass('yt-thumb-clip')){
			ytThumbClip_Element = e.currentTarget;
			//videoListItemElement = $(ytThumbClip_Element).parents('li.video-list-item:first')[0];
		} else if($(e.currentTarget).hasClass('feed-item-container')){
			feedItemContainer = e.currentTarget;
			ytThumbClip_Element = $(feedItemContainer).find('.feed-item-main-content span.yt-thumb-clip')[0];
		}
		
		if(YTB['thumbnails'].thumbTimer) clearInterval(YTB['thumbnails'].thumbTimer);
		YTB['thumbnails'].changeThumbnail(ytThumbClip_Element, 'default');
		//console.log('MouseOut: ', ytThumbClip_Element);
	},
	
	'AddEventListeners': function(){
		//console.log('AddEventListeners');
		//$('span.yt-thumb-clip').hover(this.onMouseOver, this.onMouseOut);
		if(YTB['pageType'] == 'video'){
			$('li.video-list-item').hover(this.onMouseOver, this.onMouseOut);
		} else if(YTB['pageType'] == 'subscriptions'){
			GM_API.log.Debug('obj: ', $('ul.feed-list > li.feed-item-container'));
			$('ul.feed-list > li.feed-item-container').hover(this.onMouseOver, this.onMouseOut);
		}
		//feed-list context-data-container
		//feed-item-container  legacy-style vve-check
		//addto-button video-actions spf-nolink hide-until-delayloaded yt-uix-button yt-uix-button-default yt-uix-button-size-small yt-uix-tooltip addto-watch-later-button
	}

};

YTB['start'] = function(){
	
	YTB['pageType'] = YTB['YT_Func'].getPageType();
	if(YTB['pageType'] == 'video'){
		GM_API.log.LogClass('Initalize Video Page', 'FUNCTION_START');
		YTB['initVideoPage']();
	} else if(YTB['pageType'] == 'subscriptions'){
		GM_API.log.LogClass('Initalize Subscriptions Page', 'FUNCTION_START');
		YTB['thumbnails'].AddEventListeners();
	}
};

YTB['initVideoPage'] = function(){
		if(this.initalized == false){
			this.initalized = true;
			$('#page').css({'overflow-x': 'hidden'});
			
			this.c = {
				$player: $('#player'),
				$playerApi: $('#player-api'),
				$watchContainer: $('#watch7-container'),
				$moviePlayer: $('#movie_player')
			}
			this.addPlayerSizes();
			this.setWidePlayer();
			
			this.setPlayerSize(playerSizes.selected);
			
			
			//this.videoQuality = "hd720";
			//YTB['prefs'].getPrefValue('videoQuality');
			//console.log('videoQuality: ' + YTB['prefs'].value['videoQuality'].options[parseInt(YTB['prefs'].getPrefValue('videoQuality'))].name);
			this.videoQuality = YTB['prefs'].value['videoQuality'].options[parseInt(YTB['prefs'].getPrefValue('videoQuality'))].name;
			this.addMenuBar();
			
			$('#removeAnnotations_AddButton').click(function(){
				var chan_name = YTB.YT_Func.getChannelName();
				var length = $('#removeAnnotations_select option').size() + '';
				var inList = false;
				
				$('#removeAnnotations_select option').each(function(index, Element){
					//if($(Element).html() == YTB.YT_Func.getChannelName()){
					if($(Element).html() == chan_name){
						inList = true;
					}
				});
				
				if(inList == true) {
					//break;
					YTB['Update_Options_StatusBar']('Channel Already On List', 'red');
				} else {
				$('#removeAnnotations_select').append($('<option>', { 
					value: length,
					text : chan_name
				}));
				}
			});
			
			
			$('#removeAnnotations_RemoveButton').click(function(){
				$('#removeAnnotations_select option:selected').remove();
				
			});
			
			
			YTB['YT_Func'].flashvars.refresh();
			
			
			/*
				ToDo:
				Update to use prefs instead of menu elements
			*/
			
			$('#removeAnnotations_select option').each(function(index, Element){
				if($(Element).html() == YTB.YT_Func.getChannelName()){
					YTB['YT_Func'].flashvars.setValue('iv_load_policy', '3');
				}
			});
			
			YTB['YT_Func'].flashvars.push();
			//unsafeWindow.yt.config_.PLAYER_REFERENCE.setPlaybackQuality(quality);
			//unsafeWindow.ytplayer.addEventListener("onStateChange", "onytplayerStateChange");

			unsafeWindow.addEventListener('YTB_onStateChangeEvent', YTB['onStateChange'], false);
			
			YTB['thumbnails'].AddEventListeners();
		}
};

/*
	To Do:
	Clean Up Listeners
*/
YTB['onStateChange'] = function(){
	var lastState = unsafeWindow.YTB_lastPleyrrState;
	var state = unsafeWindow.YTB_playerState;
	//console.log ('GM: In stateChanged().  LastState = ', lastState);
	//console.log ('Current State = ', state);
	if(lastState != state){
		//autoPlay
		if(lastState == -1 && state == 1){
			if(YTB['prefs'].value['autoPlay'].value == 'false'){
				var pauseVideo = function(){
					window.yt.config_.PLAYER_REFERENCE.pauseVideo();
				};
				addJS_Node (null, null, pauseVideo);
			}
		} else if(state == 0){
			//seekTo
				if($('#YTB_LoopVideo')[0].checked){
					var restartVideo = function(){
						window.yt.config_.PLAYER_REFERENCE.seekTo('0');
						window.yt.config_.PLAYER_REFERENCE.playVideo();
						
					};
					addJS_Node (null, null, restartVideo);
				}
		}
		//YTB_LoopVideo
		
	}
}


function JS_Node(){
    window.stateChanged = function (state) {
        //console.log ('GM: In stateChanged().  State = ', state);
		//console.log('window.stateChanged');
		//window.YTB_onStateChangeEvent.state = state;
		window.YTB_lastPleyrrState = (window.YTB_playerState ? window.YTB_playerState : state);
		window.YTB_playerState = state;
		
		window.dispatchEvent(window.YTB_onStateChangeEvent);
    }

    window.onYouTubePlayerReady = function (playerId) {
        /*-- playerId is not being set by Youtube. Use
            hard-coded id (movie_player) instead.
        */
        var playerNode  = document.getElementById ("movie_player");
        if (playerNode) {
            /*--- Note, inside onYouTubePlayerReady ONLY, the YouTube API
                seems to override addEventListener. Hence the nonstandard
                parameters.
            */
            playerNode.addEventListener ('onStateChange', 'stateChanged');

            //console.log ('GM: Listener installed just fine.');
        }
        else
            console.error ("GM: Player node not found!");
    }
	
	window.YTB_onStateChangeEvent = new Event('YTB_onStateChangeEvent');
}

if(YTB['YT_Func'].getPageType() == 'video') addJS_Node (null, null, JS_Node);

function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

unsafeWindow.YTB = YTB;
//unsafeWindow.onytplayerStateChange = function(newState){console.log('New State: ' + newState);};

//unsafeWindow.stateChanged = function(state){console.log ('GM: In stateChanged().  State = ', state);}

$(document).ready(YTB.start());
})();