// ==UserScript==
// @name						SourceFed Sidebar
// @author						jgjake2
// @namespace					jgjake2
// @description					Sidebar for SourceFed on YouTube
// @include						http://www.youtube.com/watch?*
// @include						https://www.youtube.com/watch?*
// @require						http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require						http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js
// @resource	jQueryUICss		http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css
//
// @version						0.0.5
// @unwrap
// ==/UserScript==

(function(){

if (self != window.top) { return; } // Don't run in frames




/****************************************************************************************************************************************************
  Class Prototypes
****************************************************************************************************************************************************/

// http://ejohn.org/blog/simple-javascript-inheritance/
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
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




/*
function Person(){}
function Ninja(){}
Ninja.prototype = new Person();
// Allows for instanceof to work:
(new Ninja()) instanceof Person
*/


/*
var Person = Class.extend({
  init: function(isDancing){
    this.dancing = isDancing;
  }
});

var Ninja = Person.extend({
  init: function(){
    this._super( false );
  }
});

var p = new Person(true);
p.dancing; // => true

var n = new Ninja();
n.dancing; // => false 
*/




/****************************************************************************************************************************************************
  End Class Prototypes
****************************************************************************************************************************************************/




/****************************************************************************************************************************************************
  GM_API
****************************************************************************************************************************************************/
if(typeof unsafeWindow === "undefined") unsafeWindow = window;


var Config_Class = function(defaultConfigValues, configVarName){
	
	var defaultValues = defaultConfigValues;
	var configVar = configVarName;
	
	return function(method){
		var cfgVar = unsafeWindow[configVar];
		if(typeof cfgVar !== "undefined" && cfgVar[method]) {
			if(typeof cfgVar[method] !== "function"){
				return cfgVar[method];
			} else {
				return cfgVar[method].apply(cfgVar, Array.prototype.slice.call( arguments, 1 ));
			}
		} else if(defaultValues[method]) {
			if(typeof defaultValues[method] !== "function"){
				return defaultValues[method];
			} else {
				return defaultValues[method].apply(defaultValues, Array.prototype.slice.call( arguments, 1 ));
			}
		}
		return undefined;
	}
}


/**
 * @const GM_API_Configuration_Defaults
 * @type {Object}
 */
var GM_API_Configuration_Defaults = {
	'STORAGE_PREFIX': 'CCE_',
	'VERBOSITY_LEVEL': 5,
	'FIREBUG_OUTPUT': true,
	'CONSOLE2_OUTPUT': true,
	'ADDITIONAL_LOG_CATEGORIES': {},
	'DISABLE_LOG_CATEGORIES': [],
	'COLLAPSE_LOG_GROUPS_BY_TITLE': []
}

GM_API = new function(){
	this['fn'] = this.__proto__;
};
GM_API['init'] = function(data){
	this.GM_log('init', data);
}

/**
 * The GM_API configuration variable.
 * @const GM_API_Consts
 * @type {Object}
 */
var GM_API_Consts = new Config_Class(GM_API_Configuration_Defaults, 'CCE_GM_API_Configuration');


Object.defineProperty(GM_API, "config", {
	value: function(key){return GM_API_Consts(key);},
	enumerable: false
});


unsafeWindow.GM_API = GM_API;


//if(typeof unsafeWindow === "undefined") unsafeWindow = window;
/****************************************************************************
  Script/Style Insertion
****************************************************************************/

/**
 * Adds given css to the the page.
 * @param {string} css The CSS to be added to the document.
 */
 
GM_API.fn.addStyle = function(css, src){
	if(heads = document.getElementsByTagName('head')) {
		if(typeof src !== "undefined" && src != ''){
			var style = document.createElement('link');
			style.type = 'text/css';
			style.rel = 'stylesheet';
			style.href = src;
			heads[0].appendChild(style);
		} else if(typeof css !== "undefined" && css != ''){
			var style = document.createElement('style');
			style.type = 'text/css';
			try {
				style.innerHTML = css;
			} catch (x) {
				style.innerText = css;
			}
			heads[0].appendChild(style);
		}
	}
	
}

GM_API.fn.addStyle2 = function(css, src){
		if(heads = document.getElementsByTagName('head')) {
			var style = document.createElement('style');
			style.type = 'text/css';
			if(typeof css !== "undefined" && css != ''){
				try {
					style.innerHTML = css;
				} catch (x) {
					style.innerText = css;
				}
			}
			if(typeof src !== "undefined" && src != ''){
				style.src = src;
			}
			heads[0].appendChild(style);
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
		//newScript.type = 'application/javascript;version=1.8.5';
		try{heads[0].appendChild(newScript);}catch(x){}
	}
	return null;
}

/****************************************************************************
  End Script/Style Insertion
****************************************************************************/






/****************************************************************************
  localStorage
****************************************************************************/

/**
 * Adds localStorage to GM_API as a non-enumerable property with the name "stor".
 */
Object.defineProperty(GM_API, "stor", {
	value: (function(){return (localStorage?localStorage:(unsafeWindow.localStorage?unsafeWindow.localStorage:window.localStorage));})(),
	enumerable: false
});

GM_API.fn.getValue = function(key, def){
	var name = GM_API.config('STORAGE_PREFIX') + key;
	if (this.stor[name]) {
		var value = this.stor.getItem(name);
		return value;
	}
	return def;
}

GM_API.fn.setValue = function(key, value){
	var name = GM_API.config('STORAGE_PREFIX') + key;
	return this.stor.setItem(name, value);
}

GM_API.fn.deleteValue = function(key, value){
	var name = GM_API.config('STORAGE_PREFIX') + key;
	return this.stor.removeItem(name);
}


/****************************************************************************
  End localStorage
****************************************************************************/





/****************************************************************************
  Prefs
****************************************************************************/

GM_API.PrefTypeClass = Class.extend({

	init: function(name, genFunction, getValueFunction, onCreateFunction){
		//this.height = function(){return data.heightFunction.apply(this, arguments);}
		this.name = name;
		this.gen = function(data){return genFunction.apply(this, arguments);}
		
		this.getValue = function(data){return getValueFunction.apply(this, arguments);}
		
		if(onCreateFunction) this.onCreate = function(data){return onCreateFunction.apply(this, arguments);}
		else this.onCreate = function(data){return;}
	}
	
	
});


GM_API.PrefTypes = {
	PrefTypes: {},
	add: function(name, genFunction, getValueFunction, onCreateFunction){
		this.PrefTypes[name] = new GM_API.PrefTypeClass(name, genFunction, getValueFunction, onCreateFunction);
	}
	
	
}


GM_API.PrefTypes.add('textbox',

	function(data){
		return '<input id="' + data.name + '_Pref" type="text" name="' + data.name + '" value="' + data.getValue() + '">';
	},
	
	function(data){
		var el = document.getElementById(data.name + '_Pref');
		if(typeof el === "undefined" || el == null) return undefined;
		return el.value;
	},
	
	function(data){
		return;
	}
	
);


GM_API.PrefTypes.add('select',

	function(data){
		//return '<input id="' + data.name + '_Pref" type="text" name="' + data.name + '" value="' + data.getValue() + '">';
		var o = '<select id="' + data.name + '_Pref">';
		
		for(var i in data.data){
			var tmp = data.data[i];
			o += '<option value="' + tmp.value + '" ' + (tmp.value == data.getValue() ? 'selected' : '') + '>' + tmp.text + '</option>';
			
			
		}
		
		o += '</select>';
		return o;
	},
	
	function(data){
		var el = document.getElementById(data.name + '_Pref');
		if(typeof el === "undefined" || el == null) return undefined;
		return el.value;
	},
	
	function(data){
		return;
	}
	
);

GM_API.PrefTypes.add('slider',

	function(data){
		//return '<input id="' + data.name + '_Pref" type="text" name="' + data.name + '" value="' + data.getValue() + '">';
		return '<input type="text" id="' + data.name + '_Pref_Amount" class="sliderSettingAmount" style="border: 0; color: #f6931f; font-weight: bold;" />'
			+ '<span id="' + data.name + '_Pref" class="sliderSetting"></span>';
	},
	
	function(data){
		var el2 = document.getElementById(data.name + '_Pref_Amount');
		if(typeof el2 === "undefined" || el2 == null) return undefined;
		
		//var $el2 = $( '#' + data.name + '_Pref' )
		//if(typeof $el2 === "undefined" || $el2.length <= 0) return undefined;
		if(isNaN(parseInt(el2.value))) return undefined;
		return el2.value;
		
	},
	
	function(data){
		var tmp = data.data;
		
		var sliderId = data.name + '_Pref';
		var sliderSelector = '#' + sliderId;
		
		var amountId =  data.name + '_Pref_Amount';
		var amountSelector = '#' + amountId;
		//var curVal = data.getValue();
		//var patt=/(\d+)\:(\d+)/g;
		
		
		/*
		options.slide = function( event, ui ) {
			$(amountSelector).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
		*/
		
		$(sliderSelector).slider({
			range: (typeof tmp.range !== "undefined" ? tmp.range : 'max'),
			min: (typeof tmp.min !== "undefined" ? tmp.min : 0),
			max: (typeof tmp.max !== "undefined" ? tmp.max : 10),
			value: parseInt(data.getValue(data)),
			slide: function( event, ui ) {
				$(amountSelector).val( ui.value );
			}

		});
		$(amountSelector).val( $(sliderSelector).slider( "value" ) );
	}
	
);


GM_API.PrefClass = Class.extend({
	
	//init: function(name, defaultValue, type, text, tooltip){
	init: function(name, defaultValue, type, text, tooltip, data){
		this.name = name;
		this.defaultValue = defaultValue;
		this.type = type;
		this.text = text;
		this.tooltip = tooltip;
		this.data = data;
	},
	
	getValue: function(){
		var r = GM_API.PrefTypes.PrefTypes[this.type].getValue(this);
		if(typeof r === "undefined" || r == null) return GM_API.getValue(this.name, this.defaultValue);
		return r;
		//return this.value;
	},
	
	setValue: function(val){
		return GM_API.setValue(this.name, val);
	},
	
	makePref: function(){
		return GM_API.PrefTypes.PrefTypes[this.type].gen(this);
	}
	
});


GM_API.Prefs = {
	Prefs: {},
	add: function(name, defaultValue, type, text, tooltip, data){
		this.Prefs[name] = new GM_API.PrefClass(name, defaultValue, type, text, tooltip, data);
		//this.PrefTypes[name] = new GM_API.PrefTypeClass(name, genFunction, getValueFunction, onCreateFunction);
	},
	
	getPrefValue: function(name){
		return this.Prefs[name].getValue();
	},
	
	makePref: function(pref){
		var o = ''
			+ '<li class="yt-uix-tooltip" title="' + pref.tooltip + '" style="display: block;">'
				+ '<span class="prefText">'
					+ pref.text
				+ '</span>'
				+ '<span class="prefValue">'
					+ this.Prefs[pref.name].makePref();
				+ '</span>'
				+ ''
			+ '</li>';
		return o;
	},
	
	makeAllPrefs: function(){
		var o = '';
		
		o += '<ul class="GM_API_Prefs">';
		
		for(var i in this.Prefs){
			
			o += this.makePref(this.Prefs[i]);
			
		}
		
		o += '</ul>';
		//yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-toggled
		o += '<br>'
			+ '<button id="GM_API_Prefs_Submit" title="Save Settings" class="yt-uix-button yt-uix-button-text yt-uix-tooltip" type="button" onclick="return false;">'
				+ '<span class="yt-uix-button-icon-wrapper">'
					+ '<span class="yt-uix-button-valign"></span>'
				+ '</span>'
				+ '<span class="yt-uix-button-content">Save </span>'
			+ '</button>';
			
// + '<img title="" alt="I like this" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-watch-like">'

		return o;
	},
	
	saveAllPrefs: function(){
		
		for(var i in this.Prefs){
			var tmp = this.Prefs[i];
			tmp.setValue(tmp.getValue());
			//console.log(tmp.getValue());
		}
	},
	
	saveClick: function(){
		console.log('Save');
		//this.saveAllPrefs();
		GM_API.Prefs.saveAllPrefs();
	},
	
	finish: function(){
		var el = document.getElementById('GM_API_Prefs_Submit');
		el.addEventListener('click', this.saveClick, false);
		
		
		// onCreate
		
		for(var i in this.Prefs){
			var tmp = this.Prefs[i];
			var prefType = GM_API.PrefTypes.PrefTypes[tmp.type];
			prefType.onCreate(tmp);
		}
	}
	
	
}



//console.log(GM_API.Prefs.Prefs['test']);

//console.log(GM_API.Prefs.Prefs['test'].makePref());


/****************************************************************************
  Prefs
****************************************************************************/






/****************************************************************************************************************************************************
  End GM_API
****************************************************************************************************************************************************/









//if(typeof unsafeWindow === "undefined") undafeWindow = window;
//if(typeof unsafeWindow['unsafeWindow'] === "undefined") unsafeWindow['unsafeWindow'] = window;
/*
function addScript(js, src, id){
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
		//newScript.type = 'application/javascript;version=1.8.5';
		try{heads[0].appendChild(newScript);}catch(x){}
	}
	return null;
}
*/
/*


var pref = Class.extend({
	init: function(name, defaultValue, text, toolTip){
		this.name = name;
		this.defaultValue = defaultValue;
		this.text = text;
		this.toolTip = toolTip;
	},
	
	getValue: function(){
		var r = stor.getItem(storagePrefix + this.name);
		if(typeof r !== "undefined") return r;
		return this.defaultValue;
	},
	
	setValue: function(val){
		stor.setItem(storagePrefix + this.name, val);
	}
	
});


var prefs = {
	prefs: {},
	
	add: function(p){
		this.prefs[p.name] = p;
	}
}
*/

var videoInfo = {
	getPublishedDate: function(){
		var dateStr = $('#eow-date').html();
		return new Date(dateStr);
	},
	
	getPublishedDateQuery: function(){
		var dateStr = $('#eow-date').html();
		dateStr = dateStr.replace(',', '');
		dateStr = dateStr.replace(/\s/g, '+');
		dateStr = dateStr.replace('\+\+', '+');
		return dateStr;
	},
	
	getChannelName: function(){
		var header = $('#watch7-user-header');
		
		var name = header.find('.yt-user-name:first');
		
		return name.html();
	},
	
	getSessionLink: function(){
		var t = $('#masthead-upload-button-group');
		
		var link = t.find('a.yt-uix-sessionlink:first');
		
		return link.attr('data-sessionlink');
	}
}

function getDateFromString(str){
	var patt=/([\d]{4}-[\d]{2}-[\d]{2})/; 
	var result = patt.exec(str)[0];
	return Date.parse(result);
}

function fromSameDay(date1, date2, paddingHoursLeft, paddingHoursRight){
	if(typeof paddingHoursLeft === "undefined") paddingHoursLeft = 0;
	if(typeof paddingHoursRight === "undefined") paddingHoursRight = 0;
	
	if(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()){
		return true;
	}
	
	
	var dateStart = new Date(date1.getTime());
	dateStart.setHours(0);
	dateStart.setMinutes(0);
	dateStart.setMilliseconds(0);
	
	
	var dateEnd = new Date(dateStart.getTime());
	dateEnd.setDate(dateStart.getDate() + 1);
	
	var date2_padLeft = new Date(dateStart.getTime());
	date2_padLeft.setHours(date2_padLeft.getHours() - paddingHoursLeft);
	
	var date2_padRight = new Date(dateEnd.getTime());
	date2_padRight.setHours(date2_padRight.getHours() + paddingHoursRight);
	
	if(date2 > date2_padLeft && date2 < date2_padRight){
		return true;
	}
	
	return false;
	
}

var relatedVideo = Class.extend({
	init: function(data){
		this.data = data;
	},
	
	getVideoId: function(){
		var t = this.data.id.$t;
		var patt = /http:\/\/gdata.youtube.com\/feeds\/api\/videos\/(.*?)$/i
		var result = patt.exec(t)[1];
		return result;
	},

	getTitle: function(){
		return this.data.title.$t;
	},
	
	getAuthorName: function(){
		return this.data.author[0].name.$t;
	},
	
	getAuthorUri: function(){
		//return this.data.author[0].uri.$t;
		//http://www.youtube.com/user/SourceFed?feature=watch
		return 'http://www.youtube.com/user/' + this.getAuthorName();
	},
	
	getLinkHref: function(){
		return this.data.link[0].href;
	},
	
	getPublishedDate: function(){
		//var dateString = this.data['published']['$t'];
		//return getDateFromString(dateString);
		return new Date(this.data['published']['$t']);
		//return this.data.published.$t;
	},
	
	getFormattedDate: function(){
		var d = this.getPublishedDate();
		
		return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
		//return this.data.published.$t;
	},
	
	getRawPublishedDate: function(){
		return this.data.published.$t;
	},
	
	getThumbUrl: function(num){
		if(typeof num === "undefined") num = 0;
		var mediaGroup = this.data['media$group'];
		var mediaThumbnail = mediaGroup['media$thumbnail'];
		return mediaThumbnail[num].url;
	},
	
	getDescription: function(){
		return this.data['media$group']['media$description']['$t'];
	},
	
	getDurationSeconds: function(){
		return this.data['media$group']['yt$duration']['seconds'];
	},
	
	getDuration: function(){
		var durationSeconds = this.getDurationSeconds();
		var dMinutes = parseInt(durationSeconds / 60);
		var dSecs = durationSeconds - (dMinutes * 60);
		
		return (dMinutes + ':' + dSecs);
		
	}
	
});



var relatedVideos = {
	videos: {},
	add: function(data){
		var v = new relatedVideo(data);
		this.videos[v.getTitle()] = v;
	}

}


function getYoutubeVideoFeedURI(author, date, orderby, startIndex, maxResults){
	var uri = 'https://gdata.youtube.com/feeds/api/videos?'
	if(typeof author !== "undefined") uri += 'author=' + author + '&';
	if(typeof date !== "undefined") uri += 'q=' + date + '&';
	if(typeof orderby !== "undefined") uri += 'orderby=' + orderby + '&';
	if(typeof startIndex !== "undefined") uri += 'start-index=' + startIndex + '&';
	if(typeof maxResults !== "undefined") uri += 'max-results=' + maxResults + '&';
	uri += 'alt=json';
	return uri;
}

function getYoutubeVideoFeed(callback, author, date, orderby, startIndex, maxResults){
	var uri = getYoutubeVideoFeedURI(author, date, orderby, startIndex, maxResults);
	$.get(uri, function(data) {
		callback(data);
	});
}

function getRelatedVideos(){
//https://gdata.youtube.com/feeds/api/users/SourceFed/uploads
//https://gdata.youtube.com/feeds/api/videos?q=SEARCH_TERM&key=DEVELOPER_KEY
//  https://gdata.youtube.com/feeds/api/videos?author=SourceFed&orderby=published

	return getYoutubeVideoFeed(getRelatedVideosCallback, 'SourceFed', videoInfo.getPublishedDateQuery(), 'published', '1', '10');

}



function getRelatedVideosCallback(data){
	var dataObj = JSON.parse(data);
	var feed = dataObj['feed'];
	//console.log(data);
	//if(typeof feed === "undefined") feed = dataObj[0].feed;
	var entries = feed['entry'];
	if(typeof entries === "undefined") return;
	var thisVideoDate = videoInfo.getPublishedDate();
	
	for(var i = 0; i < entries.length; i++){

		var relVideo = new relatedVideo(entries[i]);
		
		var relatedVideoPublishedDate = new Date(relVideo.getPublishedDate());
		var padLeft = GM_API.Prefs.getPrefValue('relatedVideoDateRange_Left');
		var padRight = GM_API.Prefs.getPrefValue('relatedVideoDateRange_Right');
		if(fromSameDay(thisVideoDate, relatedVideoPublishedDate, padLeft, padRight)){
			relatedVideos.add(entries[i]);
		}
	}
	
	var list = makeRelatedVideoList();
	
	$('#SourcefedRelatedVideos').html(list);
	
}

function getCleanDescription(){
	var $description = $('#eow-description');
	var descriptionHTML = $description.html();
	
	return descriptionHTML;
}

function makeRelatedVideoLi(videoId, title, linkURL, userName, userURL, thumbURL, description, date, duration){
	var o = '<div id="results">';
	
	var sessionLink = videoInfo.getSessionLink();
	
	o += '<li data-context-item-views="144,010 views" data-context-item-time="' + duration + '" data-context-item-user="SourceFed" data-context-item-title="' + title + '" data-context-item-id="' + videoId + '" data-context-item-type="video" class="yt-lockup2 yt-lockup2-video yt-uix-tile context-data-item clearfix ">'
		+ '<div class="yt-lockup2-thumbnail">'
			+ '<a data-sessionlink="' + sessionLink + '" class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto " href="' + linkURL + '">'
				+ '<span class="video-thumb ux-thumb yt-thumb-default-185 ">'
					+ '<span class="yt-thumb-clip">'
						+ '<span class="yt-thumb-clip-inner">'
							+ '<img width="185" src="' + thumbURL + '" alt="Thumbnail">'
							+ '<span class="vertical-align"></span>'
						+ '</span>'
					+ '</span>'
				+ '</span>'
				+ '<span class="video-time">' + duration + '</span>'
				+ '<button role="button" data-video-ids="' + videoId + '" onclick=";return false;" type="button" title="Watch Later" class="addto-button video-actions spf-nolink addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip">'
					+ '<span class="yt-uix-button-content">'
						+ '<img alt="Watch Later" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif">'
					+ '</span>'
				+ '</button>'
			+ '</a>'
		+ '</div>'
		+ '<div class="yt-lockup2-content">'
			+ '<h3 class="yt-lockup2-title">'
				+ '<a href="' + linkURL + '" data-sessionlink="' + sessionLink + '" title="' + title + '" dir="ltr" class="yt-uix-sessionlink yt-uix-tile-link yt-uix-contextlink ">' + title + '</a>'
			+ '</h3>'
			+ '<p class="yt-lockup2-meta">  by <a dir="ltr" data-sessionlink="' + sessionLink + '" class="yt-uix-sessionlink yt-user-name " href="' + userURL + '">' + userName + '</a>'
				+ '<span class="metadata-separator">•</span>' + date + '<span class="metadata-separator">•</span>'
			+ '</p>'
			+ '<p dir="ltr" class="yt-lockup2-description" style="overflow-y: hidden; max-height: 40px;">' + description + '</p>'
			+ '<div class="yt-lockup2-badges">'
				+ '<ul class="item-badge-line">'
					+ '<li class="item-badge-label ">NEW</li>'
					+ '<li class="item-badge-label ">HD</li>'
				+ '</ul>'
			+ '</div>'
		+ '</div>'
	+ '</li>';
	o += '</div>';
	return o;
}

function makeRelatedVideoItem(data){

	return makeRelatedVideoLi(data.getVideoId(), data.getTitle(), data.getLinkHref(), data.getAuthorName(), data.getAuthorUri(), data.getThumbUrl(), data.getDescription(), data.getFormattedDate(), data.getDuration());
	//return makeRelatedVideoLi(data.getVideoId(), data.getTitle(), data.getLinkHref(), data.getAuthorName(), data.getAuthorUri(), data.getThumbUrl(), data.getDescription(), data.getPublishedDate(), data.getDuration());

}

function makeRelatedVideoList(){


	var list = '<ol id="search-results" class="result-list context-data-container">';
	var i = 0;
	for(var video in relatedVideos.videos){
		list += makeRelatedVideoItem(relatedVideos.videos[video]);
		i++;
	}
	if(i == 0){
		return 'No Other Videos Uploaded!';
	}
	
	list += '</ol>';
	
	return list;
}

function getSourcefedRssFeedUri(year, month, day){
	var r = 'http://sourcefednews.com/feed/?';
	if(typeof year !== "undefined") r += 'yearnum=' + year + '&';
	if(typeof month !== "undefined") r += 'monthnum=' + month + '&';
	if(typeof day !== "undefined") r += 'day=' + day;
	return r;
}

function getSourcefedRssFeed(callback, fDate){

	var day = fDate.getDate();
	var month = fDate.getMonth() + 1; //months are zero based
	var year = fDate.getFullYear();
	var uri = getSourcefedRssFeedUri(year, month, day);

	
	GM_xmlhttpRequest({
		method: "GET",
		url: uri,
		onload: callback
	});
}

function makeSourcefedRssButton2(title, linkUrl, thumbUrl){
	var o = ''
		+ '<article class="post-22389 post type-post status-publish format-standard hentry category-lifestyle tag-10 tag-banjo tag-boy tag-country tag-glasses tag-hallelujah tag-music tag-old tag-performer tag-street tag-wine tag-years entry-image" id="post-22389">'
			+ '<img width="640" height="480" alt="' + title + '" data-cfsrc="' + thumbUrl + '" src="' + thumbUrl + '" data-cfloaded="true">'
			+ '<div class="image-info">'
				+ '<a class="image-link" href="' + linkUrl + '">Read more</a>'
				+ '<div class="title">'
					+ '<h2>'
						+ '<a href="' + linkUrl + '">' + title + '</a>'
					+ '</h2>'
					+ '<p class="meta-info"> Feb 14, 2013 by <a rel="author" title="Posts by Samuel B." href="http://sourcefednews.com/author/samuel-b/">Samuel B.</a></p>'
				+ '</div>'
				+ '<div class="description">'
					+ '<p>Woah! Woah! Woah! People can use wine glasses to make music!...</p>'
				+ '</div>'
				+ '<a class="readmore" href="' + linkUrl + '">Read more<span style="opacity: 1; top: 9px;"></span></a>'
			+ '</div>'
		+ '</article>';
		
	return o;
}


function makeSourcefedRssButton(data){
	//http://cdn.sourcefednews.com/wp-content/uploads/2013/02/Sight-Sci-Fi.jpg
	//pubdate
	//http://cdn.sourcefednews.com/wp-content/uploads/2013/02/Sight-Sci-Fi.jpg
	
	//http://sourcefednews.com/?p=22815
	
	//http://sourcefednews.com/?p=22815
	var pDate = new Date(data.getElementsByTagName("pubdate").innerHTML);
	
	var month = pDate.getMonth() + 1; //months are zero based
	var year = pDate.getFullYear();

	//var thumbUrl = 'http://cdn.sourcefednews.com/wp-content/uploads/' + year + '/' + month + '/'
	
	var description = data.getElementsByTagName("content:encoded")[0].innerHTML;
	//console.log(description);
	
	//var $description = $(description);
	var $description = $($.parseHTML(description));
	//console.log($description);
	
	var image = $($description).find('.aligncenter:first');
	//console.log(image);
	
	var imgsrc = image.attr('src');
	//console.log(imgsrc);
	
	return makeSourcefedRssButton2(data.getElementsByTagName("title")[0].childNodes[0].nodeValue, data.getElementsByTagName("guid")[0].childNodes[0].nodeValue, '');
}

function getSourcefedRssFeedCallback(data){
	var parser=new DOMParser();
	var xmlDoc=parser.parseFromString(data.responseText,"text/xml");
	
	var channel = xmlDoc.getElementsByTagName("channel")[0];
	
	var items = channel.getElementsByTagName("item");
	var o = '';
	for(var i = 0; i < items.length; i++){
	/*
		o += '<a href="' + items[i].getElementsByTagName("guid")[0].childNodes[0].nodeValue + '">';
		o += items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue
		o +=  '</a>';
		o +=  '<br />';
	*/
		o += makeSourcefedRssButton(items[i]);
	}
	
	$('#SourcefedSiteData').html(o);
}




// Video Player

var VideoPlayerSize = Class.extend({
	//init: function(name, heightFunction, widthFunction, topFunction, leftFunction, sideBarTopFunction, sideBarLeftFunction){
	init: function(data){
		this.name = data.name;
		
		this.height = function(){return data.heightFunction.apply(this, arguments);}
		this.width = function(){return data.widthFunction.apply(this, arguments);}
		
		
		if(data.topFunction) this.top = function(){return data.topFunction.apply(this, arguments);}
		else this.top = function(){return undefined;};
		
		if(data.leftFunction) this.left = function(){return data.leftFunction.apply(this, arguments);}
		else this.left = function(){
			var $guide = $('#guide-container');
			var gLeft = parseInt($guide.css('left'));
			var gWidth = parseInt($guide.css('width'));
			return gLeft + gWidth + 5;
			//return 0;
			
		};
		
		
		
		if(data.sideBarTopFunction) this.sideBarTop = function(){return data.sideBarTopFunction.apply(this, arguments);}
		//else this.sideBarTop = function(){return undefined;};
		
		if(data.sideBarLeftFunction) this.sideBarLeft = function(){return data.sideBarLeftFunction.apply(this, arguments);}
		else this.sideBarLeft = function(){return undefined;};
		
	},
	
	
	sideBarTop: function(){
		var watchContainer = $('#watch7-video-container');
		var watchContainerOffset = watchContainer.offset();
		
		var contentContainerTop = parseInt(watchContainerOffset.top);
		return contentContainerTop;
	}
	
});

var VideoPlayerSizes = {
	sizes: {},
	
	//add: function(name, heightFunction, widthFunction, topFunction, leftFunction, sideBarTopFunction, sideBarLeftFunction){
		//this.sizes[name] = new VideoPlayerSize(name, heightFunction, widthFunction, topFunction, leftFunction, sideBarTopFunction, sideBarLeftFunction);
	add: function(data){
		this.sizes[data.name] = new VideoPlayerSize(data);
	}
}

var VideoPlayer = {

	resize: function(height, width, left){
		console.log('resize -- height: ' + height + ' -- width: ' + width);
		$('#watch7-player').css({
			'height': height,
			'width': width,
			//'left': left
		});
		
		$('#watch7-video-container').css({
			paddingLeft: left
		});
	},
	
	changePlayerSize: function(name){
		var size = VideoPlayerSizes.sizes[name];
		if(typeof size !== "undefined"){
			var height = size.height();
			var width = size.width();
			var left = size.left();
			this.resize(height, width, left);
			var sideBarTop = size.sideBarTop();
			SideBar.moveY(sideBarTop);
		}
	},
	
	call: function(functionName, args){
		var button = '<button id="playerCommand" type="button" onclick="document.getElementById(\'movie_player\').' + functionName + '(); return false;"></button>';
		$('body').append(button);
		$('#playerCommand').trigger('click');
		$('#playerCommand').remove();
	}

}

//watch7-player

/////////////////////
// End Video Player
/////////////////////




/////////////////////
// SideBar
/////////////////////

var tab = Class.extend({
	init: function(name, id, title, content){
		this.name = name;
		this.id = id;
		this.title = title;
		this.content = (typeof content !== "undefined" ? content : '');
	},
	
	makeTabLi: function(){
		var o = ''
			+ '<li>'
				+ '<a href="#' + this.id + '">' + this.title + '</a>'
			+ '</li>';
		return o;
	},
	
	makeTabContent: function(){
		var o = ''
			+ '<div id="' + this.id + '">'
			+ this.content
			+ '</div>';
		return o;
	},
	
	updateTabContent: function(content){
		$('#' + this.id).html(content);
	}
	
});



var SideBar = {
	init: function(){
		this.addContentContainer();
		this.tabs.initalize('GM_Sourcefed_ContentContainer', 'GM_Sourcefed_Tabs');
	},
	
	addContentContainer: function(){

		var windowWidth = $(window).width();

		var watchObject = $('#watch7-main');
		var watchOffset = watchObject.offset();
		//var watchWidth = watchObject.width();
		var watchWidth = parseInt($('#watch7-content').width()) + parseInt($('#watch7-sidebar').width());
		
		
		
		var watchContainer = $('#watch7-video-container');
		var watchContainerOffset = watchContainer.offset();
		
		
		var contentContainerLeft = parseInt(watchOffset.left) + parseInt(watchWidth);
		var contentContainerTop = parseInt(watchContainerOffset.top);
		
		var contentContainerPaddingTop = parseInt(watchContainer.css('paddingTop'));
		
		var contentContainerWidth = parseInt(windowWidth) - contentContainerLeft - contentContainerPaddingTop;
		
		
		
		var contentContainerStyle = ''
			+ 'position: absolute;'
			+ 'left:' + contentContainerLeft + 'px;'
			+ 'top:' + contentContainerTop + 'px;'
			+ 'width:' + contentContainerWidth + 'px;'
			+ 'padding: ' + contentContainerPaddingTop + 'px 0 0 0'
			+ ''
			+ '';
		
		jQuery('<div/>', {
			id: 'GM_Sourcefed_ContentContainer',
			style: contentContainerStyle
		}).appendTo('body');
	},
	
	
	moveY: function(y){
		console.log('moveY: ' + y);
		$('#GM_Sourcefed_ContentContainer').css('top', y + 'px');
	},

	tabs: {
		
		tabs: {},
		
		add: function(name, id, title, content){
			this.tabs[name] = new tab(name, id, title, content);
		},
		
		getTabId: function(name){
			if(typeof this.tabs[name] !== "undefined") return this.tabs[name].id;
			return undefined;
		},
		
		getAllTabs: function(){
			var o = '';
			for(var i in this.tabs){
				o += this.tabs[i].makeTabLi();
			}
			return o;
		},
		
		getAllTabContent: function(){
			var o = '';
			for(var i in this.tabs){
				o += this.tabs[i].makeTabContent();
			}
			return o;
		},
		
		initalize: function(containerId, tabDivId){
		
			var content = ''
				+'<div id="' + tabDivId + '">'
					+ '<ul>'
						+ this.getAllTabs()
					+ '</ul>'
					+ this.getAllTabContent()
				+ '</div>';
				
			$('#' + containerId).html(content);
		
			$('#' + tabDivId).tabs({active: 1});
		}
		
	}
	
}

/////////////////////
// End SideBar
/////////////////////






function addTabs(){
	SideBar.tabs.add('VideoInfo', 'VideoInfoTab', 'Video Info', getCleanDescription());
	SideBar.tabs.add('RelatdVideos', 'SourcefedRelatedVideos', 'Other Stories', 'N/A');
	SideBar.tabs.add('SourceFedSite', 'SourcefedSiteData', 'Sourcefed.com (Not Working)', 'N/A');
	SideBar.tabs.add('Settings', 'settingsTab', 'Settings', 'N/A');
	
	//SideBar.tabs.initalize('GM_Sourcefed_ContentContainer', 'GM_Sourcefed_Tabs');
}

function addPlayerSizes(){

	/*
		Default Small
			Height: 390px
			Width: 640px
			
		Default Large
			Height: 510px
			Width: 854px
	
	*/
	
	var ratio = (640.0 / 390.0);

	VideoPlayerSizes.add({
		name: 'Default',
	
		// Height
		heightFunction: function(){
			return '';
		},
		
		// Width
		widthFunction: function(){
			return '';
		},
		
		// Top
		/*
		topFunction: function(){
			return '';
		},
		*/
		// Left
		/*
		leftFunction: function(){
			return '';
		},
		*/
		// SideBar Top
		/*
		sideBarTopFunction: function(){
			var watchContainer = $('#watch7-video-container');
			var watchContainerOffset = watchContainer.offset();
			
			var contentContainerTop = parseInt(watchContainerOffset.top);
			return contentContainerTop;
		},
		*/
		
		// SideBar Left
		/*
		sideBarLeftFunction: function(){
			return '';
		}
		*/
	});
	
	VideoPlayerSizes.add({
		name: 'Best',
	
		heightFunction: function(){
			var thisWidth = parseFloat(this.width());
			return parseInt(thisWidth / ratio);
		},

		widthFunction: function(){
			var windowHeight = parseInt($(window).height());
			var windowWidth = parseInt($(window).width());
			
			var paddingLeft = parseInt($('#watch7-video-container').css('paddingLeft'));
			
			var rWidth = windowWidth - (2 * paddingLeft);
			
			var tHeight = parseFloat(rWidth) / ratio;
			
			if(tHeight > parseFloat(windowHeight)){
				tHeight = windowHeight;
				rWidth = tHeight * ratio;
			}
			
			return parseInt(rWidth);
		},
		
		sideBarTopFunction: function(){
			var offsetTop = parseInt($('#watch7-player').offset().top);
			if(isNaN(offsetTop)) offsetTop = 0;
			var height = parseInt($('#watch7-player').css('height'));
			
			console.log('top: ' + (offsetTop + height + 70));
			return (offsetTop + height + 10);
		},

	});
	
	

	VideoPlayerSizes.add({
		name: 'FullWidth',

		heightFunction: function(){
			var thisWidth = parseFloat(this.width());
			return parseInt(thisWidth / ratio);
		},
		
		widthFunction: function(){
			var windowHeight = parseInt($(window).height());
			var windowWidth = parseInt($(window).width());
			var rWidth = windowWidth;
			
			var tHeight = parseFloat(rWidth) / ratio;
			
			if(tHeight > parseFloat(windowHeight)){
				tHeight = windowHeight;
				rWidth = tHeight * ratio;
			}
			
			return parseInt(rWidth);
		},
		
		leftFunction: function(){
			var windowWidth = parseInt($(window).width());
			var thisWidth = this.width();
			var rLeft = parseInt((windowWidth - thisWidth) / 2);
			return rLeft;
		},
		
		sideBarTopFunction: function(){
			var offsetTop = parseInt($('#watch7-player').offset().top);
			if(isNaN(offsetTop)) offsetTop = 0;
			var height = parseInt($('#watch7-player').css('height'));
			
			console.log('top: ' + (offsetTop + height + 70));
			return (offsetTop + height + 10);
		},

	});
	
}

function addPrefs(){
	//GM_API.Prefs.add('test', 'foo', 'textbox', 'bar', 'bar');

	GM_API.Prefs.add('playerSize', 'Default', 'select', 'Video Player Size', '', {
		'0': {
			'text': 'Default',
			'value': 'Default'
		},
		
		'1': {
			'text': 'Best',
			'value': 'Best'
		},
		
		'2': {
			'text': 'FullWidth',
			'value': 'FullWidth'
		}
	});


	GM_API.Prefs.add('relatedVideoDateRange_Left', '4', 'slider', 'Related Videos Range Left', 'Number of hours to pad results', {
		'range': 'max',
		'max': 24,
		'min': 0,
		
	});
	
	GM_API.Prefs.add('relatedVideoDateRange_Right', '4', 'slider', 'Related Videos Range Right', 'Number of hours to pad results', {
		'range': 'max',
		'max': 24,
		'min': 0,
	});
}

function addCss(){
	//var jQueryUICss = GM_getResourceText ("jQueryUICss");
	//GM_addStyle (jQueryUICss);
	//var uniformJsCss = GM_getResourceText ("uniformJs");
	//GM_addStyle (uniformJsCss);
	
	var css = ''
		+ '#VideoInfoTab:hover a {'
			+ 'color: #438BC5;'
		+ '}'
		+ '.prefValue {'
			+ 'float: right;'
		+ '}'
		+ '.GM_API_Prefs li{'
			+ 'clear: both;'
			+ 'padding: 10px 5px;'
		+ '}'
		+ '.GM_API_Prefs li:nth-child(even), .GM_API_Prefs li:nth-child(even) input{'
			+ 'background: #EEE;'
		+ '}'
		+ '.sliderSetting {'
			+ 'max-width: 80%;'
			+ 'width: 80%;'
			+ 'display: inline-block;'
		+ '}'
		+ '.sliderSettingAmount {'
			+ 'max-width: 10%;'
			+ 'padding: 0 0 0 10px;'
		+ '}'
		+ '';
		
	GM_addStyle (css);
	
}

function addJQueryUIResources(){
	
	
	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';
	//http://code.jquery.com/ui/1.10.1/themes/base/images/ui-bg_flat_75_ffffff_40x100.png
	var patt = /images\//gm;
	var css = GM_getResourceText ('jQueryUICss');
	
	css = css.replace( patt, 'http://code.jquery.com/ui/1.10.1/themes/base/images/');
	
	/*
	$.each(resources, function(resourceName, resourceUrl) {
		console.log(resourceName + ': ' + resourceUrl);
		css = css.replace( 'images/' + resourceName, resourceUrl);
	});
	*/
	
	style.innerHTML = css;
	head.appendChild(style);
	
}

mainCalled = false;
function main() {
	if(videoInfo.getChannelName() !== 'SourceFed' && videoInfo.getChannelName() !== 'SourceFed.com') return;
  	if(!mainCalled && $('a').length > 0){
		mainCalled = true;
		
		//addScript('', 'http://uniformjs.com/javascripts/jquery.uniform.min.js', 'uniformJsScript');
		
		// Add jQuery UI CSS
		addCss();
		addJQueryUIResources();
		addPrefs();
		
		// Add Player Sizes
		addPlayerSizes();
		
		
		// Add Tabs
		addTabs();
		
		SideBar.init();
		

		

		// Update Related Videos
		getRelatedVideos();
		
		// Update Sourcefed.com tab
		getSourcefedRssFeed(getSourcefedRssFeedCallback, videoInfo.getPublishedDate());
		
		
		var allprefs = GM_API.Prefs.makeAllPrefs();
		$('#settingsTab').html(allprefs);
		
		GM_API.Prefs.finish();
		
		VideoPlayer.changePlayerSize(GM_API.Prefs.getPrefValue('playerSize'));
		
		/*
		setTimeout(function(){
			VideoPlayer.call('stopVideo');
		}, 1000);
		*/
		//unsafeWindow.yt['playerConfig']['args']['iv_read_url'] = '';
		//unsafeWindow.yt['player']['update']()
	}
}

main();

})();