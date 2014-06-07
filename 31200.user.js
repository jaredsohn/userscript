// ==UserScript==
// @name           ContactClean Email Autocomplete
// @namespace      http://www.contactclean.com
// @description    Version: 2008080620 Creates an autocompleter next to email input boxes on web pages from your address history stored at ContactClean.com
// @include        *
// ==/UserScript==

var scriptVersion = 2008080620;

///////////////////////
// Grabs your email list from your ContactClean email history
// Update your list at https://www.contactclean.com/user
//
//
// Like all good FLOSS projects, this script contains code sourced from many places:
//	- Google Contacts Autocomplete
//  - YousableTubeFix
//  - Travian Task Queue 


///////////////////////////////////////////////////////////////////////
// settings - you can edit these
//


var seconds_to_hide = 2;
var max_suggestions = 20;
var min_suggestions_width = 250; // px

// 0 - no output, 1 - error messages, 2 - debugging, 3 - verbose, 4 - mind-numbingly verbose
var log_level = 1;

//
// don't edit below here
///////////////////////////////////////////////////////////////////////


var useragent = window.navigator.userAgent + ' Greasemonkey Autocomplete v:' + scriptVersion;

// URLs related to the script
// http://userscripts.org/scripts/show/31200
var scriptFileURL = "https://www.contactclean.com/download/greasemonkey_autocomplete.user.js";
var scriptHomepageURL = "http://www.contactclean.com/docs/Downloads/Greasemonkey";


var contacts_url = "https://www.contactclean.com/ws/me.php";

var contact_entries = [];
var contact_err = '';

var scriptLastRemoteVersion = parseInt(GM_getValue("scriptLastRemoteVersion", "0"), 10);
var scriptLastCheck = parseInt(GM_getValue("scriptLastCheck", "0"), 10);

// don't change this. Setting it shorter will just slow down your browser for no benefit
var check_interval = 86400000; // one day

function debug(level, str) {
	if (level <= log_level) GM_log(str);
}


// Helper functions from YousableTubeFix

// Shortcut to document.getElementById
function $(id) {
	return document.getElementById(id);
}

// Returns a node from its id or a reference to it
function $ref(idRef) {
	return (typeof(idRef) == "string") ? $(idRef) : idRef;
}

// Creates a new node with the given attributes and properties (be careful with XPCNativeWrapper limitations)
function createNode(type, attributes, props) {
	var node = document.createElement(type);
	if (attributes) {
		for (var attr in attributes) {
			node.setAttribute(attr, attributes[attr]);
		}
	}
	if (props) {
		for (var prop in props) {
			if (prop in node) node[prop] = props[prop];
		}
	}
	return node;
}

// Shows/hides an update notice to the user (according to the boolean parameter scriptShowMessage)
// The scriptNewVersion parameters is used to display the new version number/date in Date.prototype.getTime() format
function scriptShowUpdateMessage(scriptShowMessage, scriptNewVersion) {

	// Gets the notice box and the script new version date in UTC format
	var messageDiv = $("ccacscriptVersionMessage");
	// var scriptNewVersionDate = (new Date(scriptNewVersion)).toUTCString();

	// Shows/creates/hides the update notice
	if (scriptShowMessage == false) {
		// Hides the notice if it exists
		if (messageDiv) messageDiv.style.display = "none";
	} else {
		if (messageDiv) {
			// Shows the notice
			messageDiv.style.display = "";
		} else {
			// Creates the notice
			messageDiv = createNode("div", {id: "ccacscriptVersionMessage", title: "A new ContactClean Autocomplete version is available"});
			// messageDiv.innerHTML = "A new version of ContactClean Autocomplete (" + scriptNewVersionDate + ") is available<br><br>" +
			messageDiv.innerHTML = "A new version of ContactClean Autocomplete is available<br><br>" +
				"<a id='ccacscriptVersionMessageInstall' href='" + scriptFileURL + "' title='Install the script update'>Install</a>" +
				" | <a href='" + scriptHomepageURL + "' target='_blank' title='Go to ContactClean Autocomplete homepage'>Go to web page</a>" +
				" | <a id='ccacscriptVersionMessageHide' href='javascript:void(null)' title='Hide this notice'>Hide</a>";
			document.body.appendChild(messageDiv);
			// Adds an event listener to the hide notice link
			$("ccacscriptVersionMessageHide").addEventListener("click", function(evt) {scriptShowUpdateMessage(false, null)}, false);
			$("ccacscriptVersionMessageInstall").addEventListener("click", function(evt) {scriptShowUpdateMessage(false, null)}, false);
		}
	}
}



// Checks if there is a new script version according to the version information in the source
// If the request is successful and there is a new version available, a message to the user is displayed
function scriptCheckVersion() {
	GM_xmlhttpRequest({
		method: "GET",
		url: scriptFileURL,
		headers: {
			'User-agent': useragent,
		},
		onload: function(evt) {
			if ((evt.readyState == 4) && (evt.status == 200)) {

				// Gets the remote version from the response and makes sure it is a number
				var responseMatch = evt.responseText.match(/var scriptVersion = (\d+);/);
				var remoteVersion = (responseMatch === null) ? NaN : parseInt(responseMatch[1], 10);
				if (isNaN(remoteVersion)) return;

				// Saves the more recent version according to the server and shows the update notice if the server version is newer
				scriptLastRemoteVersion = remoteVersion;
				GM_setValue("scriptLastRemoteVersion", remoteVersion.toString());
				if (remoteVersion > scriptVersion) scriptShowUpdateMessage(true, remoteVersion);

			}
		}
	});
}


/**
 *  author:		Timothy Groves - http://www.brandspankingnew.net
 *	version:	1.2 - 2006-11-17
 *              1.3 - 2006-12-04
 *              2.0 - 2007-02-07
 *              2.1.1 - 2007-04-13
 *              2.1.2 - 2007-07-07
 *              2.1.3 - 2007-07-19
 *
 */


if (typeof(bsn) == "undefined")
	_b = bsn = {};


if (typeof(_b.Autosuggest) == "undefined")
	_b.Autosuggest = {};
else
	alert("Contactclean Autocomplete is already set!");


_b.AutoSuggest = function (id, param) {
	// no DOM - give up!
	//
	if (!document.getElementById)
		return 0;
	
	// get field via DOM
	//
	this.fld = _b.DOM.gE(id);

	if (!this.fld) // should never happen
		return 0;
	
	// init variables
	//
	this.sInp 	= "";
	this.nInpC 	= 0;
	this.aSug 	= [];
	this.iHigh 	= 0;
	
	// parameters object
	//
	this.oP = param ? param : {};

	// defaults	
	//
	var k, def = {
		minchars:1, meth:"get", varname:"input", className:"cc_auto", 
		delay:500, offsety:-5, shownoresults: false, noresults:'No results', 
		maxheight: 250, cache: true
	};
	for (k in def) {
		if (typeof(this.oP[k]) != typeof(def[k]))
			this.oP[k] = def[k];
	}
	
	// set keyup handler for field
	// and prevent autocomplete from client
	//
	var p = this;

	// NOTE: not using addEventListener because UpArrow fired twice in Safari
	this.fld.addEventListener( 'keypress', function(ev){ return p.onKeyPress(ev); }, true );
	this.fld.addEventListener( 'keyup', function(ev){ return p.onKeyUp(ev); }, true );

	//this.fld.onkeypress 	= function(ev){ return p.onKeyPress(ev); };
	//this.fld.onkeyup 		= function(ev){ return p.onKeyUp(ev); };

	this.fld.setAttribute("autocomplete","off");
};


_b.AutoSuggest.prototype.onKeyPress = function(ev) {
	var key = (window.event) ? window.event.keyCode : ev.keyCode;

	// set responses to keydown events in the field
	// this allows the user to use the arrow keys to scroll through the results
	// ESCAPE clears the list
	// TAB sets the current highlighted value
	//
	var RETURN = 13;
	var TAB = 9;
	var ESC = 27;

	var bubble = 1;

	switch(key)
	{
		case RETURN:
			this.setHighlightedValue();
			bubble = 0;
			break;

		case ESC:
			this.clearSuggestions();
			break;
	}
	if (!bubble) ev.preventDefault();
	return bubble;
};


_b.AutoSuggest.prototype.onKeyUp = function(ev) {
	var key = (window.event) ? window.event.keyCode : ev.keyCode;

	// set responses to keydown events in the field
	// this allows the user to use the arrow keys to scroll through the results
	// ESCAPE clears the list
	// TAB sets the current highlighted value
	//
	var ARRUP = 38;
	var ARRDN = 40;
	var bubble = 1;

	// debug(4, 'keyup:' + key);
	
	switch(key)
	{
		case ARRUP:
			this.changeHighlight(1);
			bubble = 0;
			break;

		case ARRDN:
			this.changeHighlight(0);
			bubble = 0;
			break;

		default:
			this.getSuggestions(this.fld.value);
	}

   	if (!bubble) ev.preventDefault();
	return bubble;
};


_b.AutoSuggest.prototype.getSuggestions = function (val) {
	
	// if input stays the same, do nothing
	//
	if (val == this.sInp)
		return 0;
	
	// kill list
	//
	_b.DOM.remE(this.idAs);
	
	this.sInp = val;
	
	// input length is less than the min required to trigger a request
	// do nothing
	//
	if (val.length < this.oP.minchars) {
		this.aSug = [];
		this.nInpC = val.length;
		return 0;
	}
	
	var ol = this.nInpC; // old length
	this.nInpC = val.length ? val.length : 0;
	
	// if caching enabled, and user is typing (ie. length of input is increasing)
	// filter results out of aSuggestions from last request
	//
	var l = this.aSug.length;
	if (this.nInpC > ol && l && l<max_suggestions && this.oP.cache) {
		var arr = [];
		var vlen = val.length;
		var vlc = val.toLowerCase();
		for (var i=0;i<l;i++) {
			if (this.aSug[i].value_lc.substr(0,vlen) == vlc)
				arr.push( this.aSug[i] );
		}
		this.aSug = arr;

		this.createList(this.aSug);
		
		return false;
	} else {
		// create new suggestions
		//
		var pointer = this;
		var input = this.sInp;
		clearTimeout(this.ajID);
		this.ajID = setTimeout( function() { pointer.CreateSuggestions(input) }, this.oP.delay );
	}

	return false;
};

_b.AutoSuggest.prototype.CreateSuggestions = function (input) {
	// check that saved input is still the value of the field
	//
	debug(2, 'CreateSuggestions start');
	if (input != this.fld.value) {
		// input has changed, another call to here has been scheduled
		debug(3, 'input:' + input + ', value:' + this.fld.value); 
		return;
	}
	
	if (! set_contact()) {
		debug(3, 'need to wait until we get the addr list');
		return;
	}

    // only look at the text after the last comma
    var search = strim_from_last_sep(input.toLowerCase());
    
    if ('' == search) {
    	debug(3, 'nothing to search for');
    	return;
    }
    var sp_search = ' ' + search;
	debug(3, 'search: ' + search);

	var pointer = this;

	this.aSug = [];

	for (var i=0; i<contact_entries.length; i++) {
		// var name_l = contact_entries[i].Name.toLowerCase();
		// var email_l = contact_entries[i].Email.toLowerCase();
		// var name = contact_entries[i].Name;
		var email = contact_entries[i]; // .Email;
		//if (name_l.indexOf(search) == 0 || email_l.indexOf(search) == 0 
		//	|| name_l.indexOf(' ' + search) != -1 || email_l.indexOf(' ' + search) != -1
		//) this.aSug.push(  { 'id':i, 'value':email, 'info':name }  );
		if (email.indexOf(search) == 0 || email.indexOf(sp_search) != -1) {
			debug(3, 'matched email:' + email);
			this.aSug.push(  { 'id':i, 'value':email, 'value_lc':email, 'info':email }  );
		}
	}
	this.idAs = "as_"+this.fld.id;

	this.createList(this.aSug);
	debug(2, 'CreateSuggestions end');
};



_b.AutoSuggest.prototype.createList = function(arr) {
	var pointer = this;

	debug(2, 'createList start');
	// get rid of old list
	// and clear the list removal timeout
	//
	_b.DOM.remE(this.idAs);
	this.killTimeout();
	
	// if no results, shownoresults is false, and no error do nothing
	//
	if (arr.length == 0 && !this.oP.shownoresults && contact_err == '') {
		debug(3, 'nothing to show');
		return false;
	}

	// create holding div
	//
	var div = _b.DOM.cE("div", {id:this.idAs, className:this.oP.className});
	var header = _b.DOM.cE("div", {className:"as_header"});
	header.appendChild(_b.DOM.cE("div", {className:"as_corner"}));
	header.appendChild(_b.DOM.cE("div", {className:"as_bar"}));
	div.appendChild(header);

	// create and populate ul
	//
	var ul = _b.DOM.cE("ul", {id:"as_ul"});

    var input = strim_from_last_sep(this.sInp);
	var myRe = new RegExp ("^(" + input + ")(.*)", "i");
	var myRe2 = new RegExp ("^(.*)( " + input + ")(.*)", "gi");

	// loop throught arr of suggestions
	// creating an LI element for each suggestion
	//
	for (var i=0; i<arr.length; i++) {
		// format output with the input enclosed in a EM element
		// (as HTML, not DOM)
		//
		var output = "";

		if (arr[i].info != "") {
			var for_output = arr[i].info;
			for_output = for_output.replace(myRe, "<em>$1</em>$2");
			for_output = for_output.replace(myRe2, "$1<em>$2</em>$3");
			output = for_output;
		}

		var span = _b.DOM.cE("span", {}, output, true);

		if (arr[i].info != "") {
			var br = _b.DOM.cE("br", {});
			span.appendChild(br);
		}

		var for_small_output = arr[i].value
		for_small_output = for_small_output.replace(myRe, "<em>$1</em>$2");
		for_small_output = for_small_output.replace(myRe2, "$1<em>$2</em>$3");

		var small		= _b.DOM.cE("small", {}, '');
		small.innerHTML = for_small_output;
		span.appendChild(small);

		var a 			= _b.DOM.cE("a", { href:"#" });
		
		var tl 		= _b.DOM.cE("span", {className:"tl"}, " ");
		var tr 		= _b.DOM.cE("span", {className:"tr"}, " ");
		a.appendChild(tl);
		a.appendChild(tr);
		
		a.appendChild(span);
		
		a.name = i+1;
		a.addEventListener( 'click', function(){ pointer.setHighlightedValue(); return false; }, false );
		a.addEventListener( 'mouseover', function(){ pointer.setHighlight(this.name) }, false );

		var li = _b.DOM.cE(  "li", {}, a  );
		
		ul.appendChild( li );
	}
	
	// no results
	//
	if (arr.length == 0 && this.oP.shownoresults) {
		var li = _b.DOM.cE(  "li", {className:"as_warning"}, this.oP.noresults  );
		ul.appendChild( li );
	}
	if (contact_err != '') {
		debug(3, 'showing error');
		var li = _b.DOM.cE(  "li", {className:"as_warning"}, contact_err, true);
		ul.appendChild( li );
	}
		
	div.appendChild( ul );
		
	var footer = _b.DOM.cE("div", {className:"as_footer"});
	footer.appendChild(_b.DOM.cE("div", {className:"as_corner"}));
	footer.appendChild(_b.DOM.cE("div", {className:"as_bar"}));
	div.appendChild(footer);
		
	// get position of target textfield
	// position holding div below it
	// set width of holding div to width of field
	//
	var pos = _b.DOM.getPos(this.fld);
	
	div.style.left 		= pos.x + "px";
	div.style.top 		= ( pos.y + this.fld.offsetHeight + this.oP.offsety ) + "px";
	div.style.width 	= (this.fld.offsetWidth > min_suggestions_width 
							? this.fld.offsetWidth 
							: min_suggestions_width) + "px";
	
	// set mouseover functions for div
	// when mouse pointer leaves div, set a timeout to remove the list after an interval
	// when mouse enters div, kill the timeout so the list won't be removed
	//
	div.addEventListener( 'mouseover', function(){ pointer.killTimeout() }, false );
	div.addEventListener( 'mouseout', function(){ pointer.resetTimeout() }, false );

	// add DIV to document
	//
	document.getElementsByTagName("body")[0].appendChild(div);
	
	// currently no item is highlighted
	//
	this.iHigh = 0;
	
	pointer.resetTimeout();
	// remove list after an interval
	//
	// var pointer = this;
	// this.toID = setTimeout(function () { pointer.clearSuggestions() }, this.oP.timeout);
	
	debug(2, 'createList end');
};


_b.AutoSuggest.prototype.changeHighlight = function(up) {	
	var list = _b.DOM.gE("as_ul");
	if (!list) return false;
	
	var n = this.iHigh;

	// lower indices are displayed above higher ones on the screen
	if (up) {
		if (n > 1) n--;
	} else {
		if (n < list.childNodes.length) n++;
	}
		
	this.setHighlight(n);
};


_b.AutoSuggest.prototype.setHighlight = function(n) {
	var list = _b.DOM.gE("as_ul");
	if (!list) return false;
	
	if (this.iHigh > 0) this.clearHighlight();
	
	this.iHigh = Number(n);
	
	list.childNodes[this.iHigh-1].className = "as_highlight";

	this.killTimeout();
};


_b.AutoSuggest.prototype.clearHighlight = function() {
	var list = _b.DOM.gE("as_ul");
	if (!list) return false;

	if (this.iHigh > 0) {
		list.childNodes[this.iHigh-1].className = "";
		this.iHigh = 0;
	}
};


_b.AutoSuggest.prototype.setHighlightedValue = function () {
	if (this.iHigh) {
		// get the text up until the last comma
		var input = strim_to_last_sep(this.fld.value);
		debug(2, 'value:' + this.fld.value + ', using:' + input);
		
		this.sInp = this.fld.value = input + this.aSug[ this.iHigh-1 ].value;
		
		// move cursor to end of input (safari)
		//
		this.fld.focus();
		if (this.fld.selectionStart)
			this.fld.setSelectionRange(this.sInp.length, this.sInp.length);
		
		this.clearSuggestions();
		
		// pass selected object to callback function, if exists
		//
		if (typeof(this.oP.callback) == "function")
			this.oP.callback( this.aSug[this.iHigh-1] );
	}
};


_b.AutoSuggest.prototype.killTimeout = function() {
	clearTimeout(this.toID);
};

_b.AutoSuggest.prototype.resetTimeout = function() {
	clearTimeout(this.toID);
	var pointer = this;
	this.toID = setTimeout(
		function () { pointer.clearSuggestions() },
		(contact_err == '') ? seconds_to_hide * 1000 : seconds_to_hide * 1000 * 2
	);
};

_b.AutoSuggest.prototype.clearSuggestions = function () {
	this.killTimeout();
	
	var ele = _b.DOM.gE(this.idAs);
	var pointer = this;
	if (ele) {
		var fade = new _b.Fader(ele,1,0,250,function () { _b.DOM.remE(pointer.idAs) });
	}
};



// DOM PROTOTYPE _____________________________________________


if (typeof(_b.DOM) == "undefined")
	_b.DOM = {};

/* create element */
_b.DOM.cE = function ( type, attr, cont, html ) {
	var ne = document.createElement( type );
	if (!ne)
		return 0;
		
	for (var a in attr)
		ne[a] = attr[a];

	var t = typeof(cont);

	if (t == "string" && !html)
		ne.appendChild( document.createTextNode(cont) );
	else if (t == "string" && html)
		ne.innerHTML = cont;
	else if (t == "object")
		ne.appendChild( cont );

	return ne;
};


/* get element */
_b.DOM.gE = function ( e ) {
	var t=typeof(e);
	if (t == "undefined")
		return 0;
	else if (t == "string") {
		var re = document.getElementById( e );
		if (!re)
			return 0;
		else if (typeof(re.appendChild) != "undefined" )
			return re;
		else
			return 0;
	} else if (typeof(e.appendChild) != "undefined")
		return e;
	else
		return 0;
};


/* remove element */
_b.DOM.remE = function ( ele ) {
	var e = this.gE(ele);
	
	if (!e)
		return 0;
	else if (e.parentNode.removeChild(e))
		return true;
	else
		return 0;
};


/* get position */
_b.DOM.getPos = function ( e ) {
	var obj = this.gE(e);

	var curleft = 0;
	var curtop = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	} else if (obj.x) {
		curleft += obj.x;
		curtop += obj.y;
	}

	return {x:curleft, y:curtop};
};



// FADER PROTOTYPE _____________________________________________


if (typeof(_b.Fader) == "undefined")
	_b.Fader = {};


_b.Fader = function (ele, from, to, fadetime, callback) {	
	if (!ele)
		return 0;
	
	this.e = ele;

	this.from = from;
	this.to = to;
	
	this.cb = callback;
	
	this.nDur = fadetime;
		
	this.nInt = 50;
	this.nTime = 0;
	
	var p = this;
	this.nID = setInterval(function() { p._fade() }, this.nInt);
};


_b.Fader.prototype._fade = function() {
	this.nTime += this.nInt;
	
	var ieop = Math.round( this._tween(this.nTime, this.from, this.to, this.nDur) * 100 );
	var op = ieop / 100;
	
	if (this.e.filters) // internet explorer
	{
		try
		{
			this.e.filters.item("DXImageTransform.Microsoft.Alpha").opacity = ieop;
		} catch (e) { 
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			this.e.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+ieop+')';
		}
	}
	else // other browsers
	{
		this.e.style.opacity = op;
	}
	
	
	if (this.nTime == this.nDur) {
		clearInterval( this.nID );
		if (this.cb != undefined)
			this.cb();
	}
};


_b.Fader.prototype._tween = function(t,b,c,d) {
	return b + ( (c-b) * (t/d) );
};

/// my stuff

function last_sep(input) {
   	var comma = -1;
    while ( input.indexOf(",", comma) >= 0 || input.indexOf(";", comma) >= 0 ) {
		comma = (input.indexOf(",", comma) > input.indexOf(";", comma))
			? input.indexOf(",", comma) + 1 
			: input.indexOf(";", comma) + 1;
    }
	return comma;
}
function strim_from_last_sep(input) {
    var comma = last_sep(input);
    if ( comma >= 0 ) input = input.substring(comma);

    input = input.replace(/^\s+|\s+$/g, "");
    
    return input;
}
function strim_to_last_sep(input) {
	var comma = last_sep(input);
    if ( comma >= 0 ) {
    	input = input.substring(0, comma);
	    input = input.replace(/^\s+|\s+$/g, "");
	} else {
		input = "";
	}
    
    return input;
}
 


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function set_contact() {
	debug(4, 'set_contact()');
	
	if (contact_entries.length > 0) {
		debug(3, 'already got contact_entries');
		return true; 
	}
		
	var cjson;
	var lastcheck = GM_getValue('lastcheck', 0);
	var now = Date.now(); 
	debug(4, 'lastcheck:' + lastcheck + ', now:' + now);
	
	if (now - lastcheck >= check_interval) { 
		// refresh cache
		debug(4, 'clearing cache');
		GM_setValue('contactcache', '');
	} else {
		cjson = GM_getValue('contactcache', '');
		if (cjson != '') {
			debug(3, 'from cache: ' + cjson);
			contact_entries = eval(cjson);
			debug(3, 'found ' + contact_entries.length + ' entries from cache');
			return true;
		}
	}

	if (now - lastcheck < 30000) { // 30 seconds
		debug(3, 'ajax fetch too recent');
		return false;
	}

	GM_setValue('lastcheck', now.toString()); 
	
	// async request. May not finish before the user starts typing again, but there's not much
	// we want to do about that.
	debug(2, 'spawing ajax');
	GM_xmlhttpRequest({
		method: 'GET',
		url: contacts_url,
		headers: {
			'User-agent': useragent,
			'Accept': 'text/x-json',
		},
		onload: function(evt) {
			if ((evt.readyState == 4) && (evt.status == 200)) {
				debug(2, 'cjson onload');
				var cjson = evt.responseText;
				if (cjson.length > 0) {
					ret = eval(cjson);
					t = typeof(ret);
					debug(3, 'ret type:' + t);
					if (t == "string") {
						// string means error
						debug(1, 'err - ' + ret);
						contact_err = ret;
						GM_setValue('lastcheck', '0');
					} else {
						// presume it's an array
						debug(3, 'cjson:' + cjson);
						contact_entries = ret; // set script global
						GM_setValue('contactcache', cjson);
						GM_setValue('lastcheck', Date.now().toString());
						debug('found ' + contact_entries.length + ' entries from ajax');
						contact_err = '';
					}
				} else {
					debug(1, 'err: nothing returned from server');
					GM_setValue('lastcheck', '0');
					contact_err = '';
				}
			} else {
				debug(3, 'ajax - readyState:' + evt.readyState + ' status:' + evt.status);
			}
		},
		onerror: function(evt) {
			if (log_level > 1) {
				contact_err = 'ajax error: ' + evt.responseText;
			}
			debug(1, 'ajax error: ' + evt.responseText);
		}
	});	
	debug(2, 'ajax request sent');
	debug(3, 'last error:' + contact_err);
	
	return(contact_err != ''); // show the error if there is one
}

function go() {
	debug(2, 'starting ' + scriptVersion);
	// xpath //input[@type=text and (contains(@name, 'mail') or contains(@name, 'to') or contains(@name, 'from')) ]
	var inputs = document.getElementsByTagName("input");
	var ids = new Array();
	for (var i = 0; i < inputs.length; i++) {
		type = inputs[i].getAttribute("type");
		if (type == "text") {
			name = inputs[i].getAttribute("name") + " " + inputs[i].getAttribute("label");
			if (/mail/i.test(name) || /to/i.test(name) || /from/i.test(name)) {
				if (inputs[i].getAttribute("id") == null) 
					inputs[i].setAttribute("id", "contacts_" + i);
				ids[ids.length] = inputs[i].getAttribute("id");
			}
		}
	}
	if (ids.length == 0) return;
	
	var options = {
		json: true,
		cache: false
	};
	// add listener to each input object
	for (var j = 0; j < ids.length; j++) {
		var as = new bsn.AutoSuggest(ids[j], options);
	}

	addGlobalStyle('\
		div.cc_auto { position: absolute; background-image: url(data:image/gif,GIF89a%14%00%0A%00%80%00%00333%FF%FF%FF!%F9%04%01%07%00%01%00%2C%00%00%00%00%14%00%0A%00%00%02%19%8C%7F%00%C8m%AA%9C%84P2J%ED%C3yr%EC%7C%DF%25%8E%5B9%A2h%01%00%3B); background-position: top; background-repeat: no-repeat; padding: 10px 0 0 0; } \
		div.cc_auto div.as_header, div.cc_auto div.as_footer { position: relative; height: 6px; padding: 0 6px; background-image: url(data:image/gif,GIF89a%06%00%06%00%80%00%00333%FF%FF%FF!%F9%04%00%07%00%FF%00%2C%00%00%00%00%06%00%06%00%00%02%09%04%82a%86%CB~%A0%04%05%00%3B); background-position: top right; background-repeat: no-repeat; overflow: hidden; } \
		div.cc_auto div.as_footer { background-image: url(data:image/gif,GIF89a%06%00%06%00%80%00%00333%FF%FF%FF!%F9%04%00%07%00%FF%00%2C%00%00%00%00%06%00%06%00%00%02%08%84%8Fi%91%7C%E1%20%2C%00%3B); } \
		div.cc_auto div.as_header div.as_corner, div.cc_auto div.as_footer div.as_corner { position: absolute; top: 0; left: 0; height: 6px; width: 6px; background-image: url(data:image/gif,GIF89a%06%00%06%00%80%00%00333%FF%FF%FF!%F9%04%00%07%00%FF%00%2C%00%00%00%00%06%00%06%00%00%02%09%8C%03%60%99%C8%FA%A2L%05%00%3B); background-position: top left; background-repeat: no-repeat; } \
		div.cc_auto div.as_footer div.as_corner { background-image: url(data:image/gif,GIF89a%06%00%06%00%80%00%00333%FF%FF%FF!%F9%04%00%07%00%FF%00%2C%00%00%00%00%06%00%06%00%00%02%08%84%8F%16%B9%18%AD%5E%2B%00%3B); } \
		div.cc_auto div.as_header div.as_bar,div.cc_auto div.as_footer div.as_bar { height: 6px; overflow: hidden; background-color: #333; } \
		div.cc_auto ul { list-style: none; margin: 0 0 -4px 0; padding: 0; overflow: hidden; background-color: #333; } \
		div.cc_auto ul li { color: #ccc; padding: 0; margin: 0 4px 4px; text-align: left; } \
		div.cc_auto ul li a { color: #ccc; display: block; text-decoration: none; background-color: transparent; text-shadow: #000 0px 0px 5px; position: relative; padding: 0; width: 100%; } \
		div.cc_auto ul li a:hover { background-color: #444; } \
		div.cc_auto ul li.as_highlight a:hover { background-color: #1B5CCD; } \
		div.cc_auto ul li a span { display: block; padding: 3px 6px; font-weight: bold; } \
		div.cc_auto ul li a span small { font-weight: normal; color: #999; } \
		div.cc_auto ul li.as_highlight a span small { color: #ccc; } \
		div.cc_auto ul li.as_highlight a { color: #fff; background-color: #1B5CCD; background-image: url(data:image/gif,GIF89a%06%00%06%00%A2%00%00%1B%5C%CD*Bl%20T%B025%3C%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%04%00%2C%00%00%00%00%06%00%06%00%00%03%0EH%0A%AC%C4%C2%B1%C0%E0%A8b%5C%11%F4H%00%3B); background-position: bottom right; background-repeat: no-repeat; } \
		div.cc_auto ul li.as_highlight a span { background-image: url(data:image/gif,GIF89a%06%00%06%00%A2%00%00%1B%5C%CD*Bl%20T%B025%3C%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%04%00%2C%00%00%00%00%06%00%06%00%00%03%0E%08J%2C%CB%E1%91%E1%14%18%D4%E2%11%5C%02%00%3B); background-position: bottom left; background-repeat: no-repeat; } \
		div.cc_auto ul li a .tl, div.cc_auto ul li a .tr { background-image: transparent; background-repeat: no-repeat; width: 6px; height: 6px; position: absolute; top: 0; padding: 0; margin: 0; } \
		div.cc_auto ul li a .tr { right: 0; } \
		div.cc_auto ul li.as_highlight a .tl { left: 0; background-image: url(data:image/gif,GIF89a%06%00%06%00%A2%00%00%1B%5C%CD*Bl%20T%B016%3D%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%04%00%2C%00%00%00%00%06%00%06%00%00%03%0E8%1A%02%DA%C0%C1%18%22%B9%F0%92%08t%02%00%3B); background-position: bottom left; } \
		div.cc_auto ul li.as_highlight a .tr { right: 0; background-image: url(data:image/gif,GIF89a%06%00%06%00%A2%00%00%1B%5C%CD*Bl%20T%B016%3D%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%04%00%2C%00%00%00%00%06%00%06%00%00%03%0E%08%12%D3%F0%C2%3D5%88%7D%C1%12%A8g%02%00%3B); background-position: bottom right; } \
		div.cc_auto ul li.as_warning { font-weight: bold; text-align: center; } \
		div.cc_auto ul em { font-style: normal; color: #6EADE7; } \
		#ccacscriptVersionMessage {background-color:#90DD43; border:1px solid #000000; color:#000000; padding:5px 10px; z-index:100; position: fixed; top: 2px; right: 2px; -moz-border-radius:5px; text-align: center;} \
		#ccacscriptVersionMessage a {font-weight: bold; text-decoration: none; margin: 0px 5px; color:#000000;} \
		#ccacscriptVersionMessage a:hover {color:#F64809} \
	');
	 
	// Checks for script updates
	if (Date.now() - scriptLastCheck >= check_interval) {
		debug(2, 'Check for new version');
		// At least a day has passed since the last check. Sends a request to check for a new script version
		GM_setValue("scriptLastCheck", Date.now().toString());
		scriptCheckVersion();
	} else {
		// If a new version was previously detected the notice will be shown to the user
		// This is to prevent that the notice will only be shown once a day (when an update check is scheduled)
		if (scriptLastRemoteVersion > scriptVersion) {
			scriptShowUpdateMessage(true, scriptLastRemoteVersion);
		}
	}

	debug(2, 'init finished'); 
}

// TODO auto script update

if (/contactclean.com\/user/i.test(document.location.href)) {
	// we're in the user's contactclean account page, so clear the local caches
	debug(2, 'Clearing cache');
	GM_setValue('contactcache', '');
	GM_setValue('lastcheck', '0');
	contact_err = '';
} else {
	// everywhere else install the autocomplete listeners once the page has loaded
	window.addEventListener('load', function(e) { go() }, false);
}
