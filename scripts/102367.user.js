// ==UserScript==
// @name	Movie/Game Info Tooltip
// @namespace	http://userscripts.org/users/309384
// @version	1.5.4
// @description	Display tooltip with movie or game info.
// grant GM_getValue
// grant GM_setValue
// @include	http://*
// @include	https://*
// @exclude	http://mail.google.*
// @exclude	https://mail.google.*
// @require http://crypto-js.googlecode.com/svn/tags/3.0.2/build/components/core.js
// @require http://crypto-js.googlecode.com/svn/tags/3.0.2/build/components/sha1.js
// @require http://crypto-js.googlecode.com/svn/tags/3.0.2/build/components/enc-base64.js


// ==/UserScript==

/***** Init update variables *****/
script_id = '102367';
script_version = '1.5.5';
script_name = 'Movie/Game Info Tooltip';
script_url = 'http://userscripts.org/scripts/source/'+script_id+'.user.js';

/***** CHANGELOG *****/
// Version 1.5.5 (25.04.2014)
// Fixed a bug with Jeuxvideo.com
// Removed NZBMatrix and MysterBin Links
// Added NZBPlanet, NZBClub links
// Fixed issue with links

// Version 1.5.4 (08.05.2013)
// Fixed a bug by integrating scripts 51832 and 49700

// Version 1.5.3 (24.04.2012)
// Bug fix (updated Allocine's API url)

// Version 1.5.2 (27.12.2011)
// Bug fix (loop when fetching allocine's info)

// Version 1.5.1 (26.12.2011)
// Bug fix

// Version 1.5 (26.12.2011)
// Check if IMDB Api is available. If not, fetch info from Imdb website.
// Added an option to prevent from using Imdb Api
// Improved the way data are fetch from Imdb website

// Version 1.4.2 (02.11.2011)
// Open the url in a new tab when key + click

// Version 1.4.1 (14.10.2011)
// Fix : Hide picture when using the search function

// Version 1.4 (06.10.2011)
// Fixed a bug when data were not found with imdbapi
// Improved the data fetched from imdb website

// Version 1.3.1 (05.10.2011)
// Fixed a bug with title from gamespot

// Version 1.3 (05.10.2011)
// Added scroll bar if the data overflows
// Added a "maximum height" option
// Added a link to show/hide the picture

// Version 1.2.2 (24.08.2011)
// Disabled "copy" shortcut because of a small bug with webmail (ex : gmail)
// Fixed a display bug

// Version 1.2.1 (20.08.2011)
// "Disable search tooltip" became "Disable search shortcuts".

// Version 1.2 (18.08.2011)
// Added Gamespot links compatibility
// Bug fix : Jeuxactu data were not accurate
// Bug fix : refresh now works as intended

// Version 1.1 (18.08.2011)
// Bug fix : imdb ratings and rotten tomatoes info now should work as intended

// Version 1.0.2 (16.08.2011)
// Added link to ratings (text)
// Modified the link from IMDB rating

// Version 1.0.1 (16.08.2011)
// Added some options to prevent tooltips from showing

// Version 1.0 (16.08.2011)
// Added a function to save movie info in cache so it loads faster
// Added a menu on the tooltip with some new features
// - check for update
// - modify the tooltip position
// - save tooltip position by website
// Added shadow box (just for fun)
// Added a search function
// Changed the way the tooltip is displayed
// Added a minimized version of the tooltip
// Added jeuxvideo and cinema.jeuxactu.com info
// Added jeuxvideo.com and subscene links
// Resolved the bug with imdb redirection

// Version 0.6.1 (13.06.2011)
// Added an option to enable hide the tooltip on mouseout
// Changed the text of the title's link

// Version 0.6 (13.06.2011)
// Fetches Rotten Tomatoes info from imdbapi (faster)
// Now you can choose to open the tooltip by hovering the link or by clicking on it
// You can select which key you want to press in order to open the link (if click to open is enabled)
// Added links for youtube, allocine, imdb, metacritic, rottent tomatoes, nzbSites, piratebay and opensubtitles
// You can now select if you want to display rating stars, rating text and / or votes.
// You can choose to put rating right after title
// Added some format options (font size, padding)

// Version 0.5 (11.06.2011)
// You can now select :
// - what you want to display in the tooltip
// - where to display the tooltip
// - if you want to display the loading tooltip

// Version 0.4 (08.06.2011)
// The script can fetch real IMDB and Allocine ratings (it's slower but more accurate)
// Fixed some small bugs here and there

// Version 0.3 (07.06.2011)
// Added Rotten Tomatoes Info
// Due to loading performance, now the script load movie info only when the mouse is over the link

// Version 0.2 (05.06.2011)
// Added some options :
// - tooltip size, color, opacity and picture size
// - show IMDB rating on Allocine's tooltip
// - change IMDB domain
// - use combined view on IMDB
// Fixed the position of the tooltip
// Don't show the movie tooltip if the movie page is currently consulted
// To hide the tooltip you have to click anywhere on it
// Added link to ratings

/**************************************/
/***** Script integration - Begin *****/
/**************************************/

//Integrate script : http://userscripts.org/scripts/source/51832.user.js

// =====================================[ String helpers ]===
// add prototype trim (taken from [uso:script:12107]
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

// ======================================[ Array helpers ]===
/** Is the item part of the array?
 * @function in_array
 * @param mixed needle
 * @param array haystack
 * @return boolean
 */
function in_array(item,arr) {
  for(p=0;p<arr.length;p++) if (item == arr[p]) return true;
  return false;
}
/** Return all the keys of an array
 * @function array_keys
 * @param array arr
 * @return array keys
 */
function array_keys(arr) {
  var keys = new Array();
  for (key in arr) keys.push(key);
  return keys;
}
// ============================[ Common variables helper ]===
/** Is a given variable already defined?
 * Returns FALSE if any of the passed variables is not set,
 * TRUE if all passed variables are set. You can pass as many
 * arguments as you want, e.g. isset(o.var1,o.var2,o.var3)
 * REMEMBER: Checking isset(varname) when varname was not declared yields
 * an JS error "varname is not defined". Use window.varname instead.
 * @function isset
 * @param mixed varname
 * @return boolean
 */
function isset() {
  if (arguments.length===0) return false;
  for (var i=0;i<arguments.length;i++) {
    if (typeof(arguments[i])=='undefined'||arguments[i]===null) return false;
  }
  return true;
}
/** Escape RegExp special chars
 * @function escapeRegExp
 * @param string s
 * @return string escaped
 * @brief taken from Greasespot code snippets
 */
function escapeRegExp(s) {
  return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
}
/** Add style with !important rule to override page defaults
 * (adds "!important" to each rule)
 * @function addForcedStyle
 * @param string css
 * @brief taken from Greasespot code snippets
 */
function addForcedStyle(css) {
  GM_addStyle(css.replace(/;/g,' !important;'));
}
// ========================================[ DOM helpers ]===
/** Get elements by className
 * @function getElementsByClassName
 * @param string className
 * @param optional string tag restrict to specified tag
 * @param optional node restrict to childNodes of specified node
 * @return Array of nodes
 * @author Jonathan Snook, http://www.snook.ca/jonathan
 * @author Robert Nyman, http://www.robertnyman.com
 */
function getElementsByClassName(className, tag, elm){
  var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
  var tag = tag || "*";
  var elm = elm || document;
  var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
  var returnElements = [];
  var current;
  var length = elements.length;
  for(var i=0; i<length; i++){
    current = elements[i];
    if(testClass.test(current.className)){
      returnElements.push(current);
    }
  }
  return returnElements;
}
/** Get elements whose id matches the given regexp
 * @function getElementsByIdRegExp
 * @param RegExp regex
 * @param optional string tag restrict to specified tag
 * @param optional node restrict to childNodes of specified node
 * @return Array nodes
 * @author Arthaey Angosii http://userscripts.org/users/4440
 * @author Izzy http://userscripts.org/users/izzysoft
 */
function getElementsByIdRegExp(regex,tag,elm) {
  var matchingElements = [];
  if (!regex) return matchingElements;

  tag = tag || '*';
  elm = elm || document;
  var elements = (tag=='*' && elm.all)? elm.all : elm.getElementsByTagName(tag);
  for (var i = 0; i < elements.length; i++)
    if (elements[i].id.match(regex))
      matchingElements.push(elements[i]);
  return matchingElements;
}

/** Append an element to a given node
 * @function appendElement
 * @param string nodeID ID of parentNode
 * @param string tag nodeType
 * @param string id ID for the new node
 * @param string className
 * @param string textVal innerHTML
 * @param boolean retEl return the created element?
 */
function appendElement(node,tag,id,classnam,textVal,retEl) {
  if (!document.getElementById(node)) return;
  try {
    var el = document.createElement(tag);
  } catch(e) {
    return;
  }
  id ? el.id = id : null;
  classnam ? el.className = classnam : null;
  el.innerHTML = (textVal ? textVal : '');
  var retNode = document.getElementById(node).appendChild(el);
  if (retEl) return retNode;
}
/** Create new element
 * Example call: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
 * @function createElement
 * @param string type e.g. 'link', 'a', 'p'
 * @param object attributes
 * @return node
 * @brief taken from Greasespot code snippets
 */
function createElement(type, attributes){
 var node = document.createElement(type);
 for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
  node.setAttribute(attr, attributes[attr]);
 }
 return node;
}
/** Insert a node after another
 * @function insertAfter
 * @param node newNode
 * @param node before
 * @brief taken from Greasespot code snippets
 */
function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}
/** Remove an element by ID
 * @function removeElementById
 * @param mixed id string for ID or the node itself
 * @return boolean success
 */
function removeElementById(id) {
  if (!id) return;
  var node = (typeof(id)=='string') ? document.getElementById(id) : id;
  var res = node.parentNode.removeChild(node);
  if (res) return true;
  return false;
}
/** Remove an element by name
 * @function removeElementByName
 * @param string name name of the element to remove (or the node itself)
 * @return boolean success
 */
function removeElementByName(nam) {
  if (!nam) return;
  var node = (typeof(id)=='string') ? document.getElementByName(nam) : nam;
  var res = node.parentNode.removeChild(node);
  if (res) return true;
  return false;
}
/** Remove elements by className
 * @function removeElementsByClassName
 * @param string className
 * @param optional ancestor (default: document)
 * @return boolean success FALSE if one or more elements failed or none found
 */
function removeElementsByClassName(cname,node) {
  node = node || document;
  var elms = node.getElementsByClassName(cname);
  if (elms.length<1) return false;
  for (var i=0;i<elms.length;i++)
    if ( !removeElementById(elms[i]) ) return false;
  return true;
}
/** Remove elements by tag name
 * @function removeElementsByTagName
 * @param string tag name
 * @param optional node ancestor (default: document)
 * @return boolean success FALSE if one or more elements failed or none found
 */
function removeElementsByTagName(tag,node) {
  if (!tag) return false;
  var node = node || document;
  var elms = node.getElementsByTagName(tag);
  if (elms.length<1) return false;
  for (var i=0;i<elms.length;i++)
    if ( !removeElementById(elms[i]) ) return false;
  return true;
}
/** Get next sibling skipping possible whiteSpace(s) in between
 * @function nextSibling
 * @param node startSib
 * @return mixed nextSibling node when found, FALSE otherwise
 * @brief taken from Greasespot code snippets
 */
function nextSibling(startSib) {
  if (!(nextSib=startSib.nextSibling)) return false;
  while (nextSib.nodeType!=1) if (!(nextSib=nextSib.nextSibling)) return false;
  return nextSib;
}
// =======================================[ Translations ]===
/** Translation class
 * @class GM_trans
 */
GM_trans = {
  /** Set desired language
   * @method setLang
   * @param string lang 2-char language code
   */
  setLang: function(lng) {
    this.trans.useLang = lng;
  },
  /** Translations
   * @attribute object trans
   */
  trans: {
    useLang: 'en'
  },
  /** Translate a given string
   * @method lang
   * @param string term to translate
   * @param optional array replaces
   * @return string translated term
   */
  lang: function(term) {
    if (!term) return '';
    var res;
    if (this.trans[this.trans.useLang][term]) res = this.trans[this.trans.useLang][term];
    else if (this.trans['en'][term]) res = this.trans['en'][term];
    else return term;
    if (typeof(arguments[1])!="object") return res;
    for (var i=0;i<arguments[1].length;i++) {
      res = res.replace('%'+(i+1),arguments[1][i]);
    }
    return res;
  },
  /** Set translations for a given language
   * @method setTranslations
   * @param string lang 2-char language code
   * @param object trans translations { string term: string translation }
   */
  setTranslations: function(lang,trans) {
    if (typeof(this.trans[lang])!="object") { // new language?
      this.trans[lang] = trans;
      return;
    }
    for (attrname in trans) { this.trans[lang][attrname] = trans[attrname]; }
  }
}
// ========================[ GreaseMonkey specific stuff ]===
/** Generate a toggle menu entry in the user script menu
 * Useful for booleans, like toggling a feature on/off
 * @function makeMenuToggle
 * @param string key name of the variable to toggle
 * @param boolean defaultVal default value if variable did not exist
 * @param string toggleOn what to display for toggleOn
 * @param string toggleOf what to display for toggleOff
 * @param optional string prefix what to display in front of toggleOn/toggleOff
 * @brief taken from Greasespot code snippets
 */
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}

// ==============================[ Miscellaneous helpers ]===
/** Add Script element to the web page
 * @function GMT_addScript
 * @param string script
 * @return boolean success
 * @author JoeSimmons http://userscripts.org/users/JoeSimmons
 * @author Izzy http://userscripts.org/users/izzysoft
 */
function GMT_addScript(script) {
  if ( script && (h=document.getElementsByTagName('head')[0]) ) {
    var aS = document.createElement('script');
    aS.type = 'text/javascript';
    aS.innerHTML = script;
    var res = h.appendChild(aS);
    if (res) return true;
  }
  return false;
}
/** Debug logging
 * Sends the supplied arguments to GM_log only if a global variable DEBUG
 * exists and is set to TRUE or 1
 * @function debug
 * @param mixed msg what to log
 */
function debug(msg) {
  if (typeof(DEBUG)!='undefined' && DEBUG) GM_log(msg);
}



// Integrate script : http://userscripts.org/scripts/source/49700.user.js

/* Instructions
GM_config is now cross-browser compatible.

To use it in a Greasemonkey-only user script you can just @match it.

To use it in a cross-browser user script you will need to manually
include the code at the beginning of your user script. In this case
it is also very important you change the "storage" value below to
something unique to prevent collisions between scripts. Also remeber
that in this case that stored settings will only be accessable on
the same domain they were saved.
*/

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

var GM_config = {
 storage: 'GM_config', // This needs to be changed to something unique for localStorage
 init: function() {
        // loop through GM_config.init() arguements
	for(var i=0,l=arguments.length,arg; i<l; ++i) {
		arg=arguments[i];
		switch(typeof arg) {
            case 'object': for(var j in arg) { // could be a callback functions or settings object
							switch(j) {
							case "open": GM_config.onOpen=arg[j]; delete arg[j]; break; // called when frame is gone
							case "close": GM_config.onClose=arg[j]; delete arg[j]; break; // called when settings have been saved
							case "save": GM_config.onSave=arg[j]; delete arg[j]; break; // store the settings objects
							default: var settings = arg;
							}
			} break;
            case 'function': GM_config.onOpen = arg; break; // passing a bare function is set to open
                        // could be custom CSS or the title string
			case 'string': if(arg.indexOf('{')!=-1&&arg.indexOf('}')!=-1) var css = arg;
				else GM_config.title = arg;
				break;
		}
	}
	if(!GM_config.title) GM_config.title = 'Settings - Anonymous Script'; // if title wasn't passed through init()
	var stored = GM_config.read(); // read the stored settings
	GM_config.passed_values = {};
	for (var i in settings) {
	GM_config.doSettingValue(settings, stored, i, null, false);
	if(settings[i].kids) for(var kid in settings[i].kids) GM_config.doSettingValue(settings, stored, kid, i, true);
	}
	GM_config.values = GM_config.passed_values;
	GM_config.settings = settings;
	if (css) GM_config.css.stylish = css;
 },
 open: function() {
 if(document.evaluate("//iframe[@id='GM_config']",document,null,9,null).singleNodeValue) return;
	// Create frame
	document.body.appendChild((GM_config.frame=GM_config.create('iframe',{id:'GM_config', style:'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto;'})));
        GM_config.frame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
	GM_config.frame.addEventListener('load', function(){
		var obj = GM_config, frameBody = this.contentDocument.getElementsByTagName('body')[0], create=obj.create, settings=obj.settings;
		obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(create('style',{type:'text/css',textContent:obj.css.basic+obj.css.stylish}));

		// Add header and title
		frameBody.appendChild(create('div', {id:'header',className:'config_header block center', innerHTML:obj.title}));

		// Append elements
		var anch = frameBody, secNo = 0; // anchor to append elements
		for (var i in settings) {
			var type, field = settings[i], value = obj.values[i];
			if (field.section) {
				anch = frameBody.appendChild(create('div', {className:'section_header_holder', id:'section_'+secNo, kids:new Array(
				  create('a', {className:'section_header center', href:"javascript:void(0);", id:'c_section_kids_'+secNo, textContent:field.section[0], onclick:function(){GM_config.toggle(this.id.substring(2));}}),
				  create('div', {id:'section_kids_'+secNo, className:'section_kids', style:obj.getValue('section_kids_'+secNo, "none")=="none"?"display: none;":""})
				  )}));
				if(field.section[1]) anch.appendChild(create('p', {className:'section_desc center',innerHTML:field.section[1]}));
				secNo++;
			}
			anch.childNodes[1].appendChild(GM_config.addToFrame(field, i, false));
		}

		// Add save and close buttons
		frameBody.appendChild(obj.create('div', {id:'buttons_holder', kids:new Array(
			obj.create('button',{id:'saveBtn',textContent:'Save',title:'Save options and close window',className:'saveclose_buttons',onclick:function(){GM_config.close(true)}}),
			obj.create('button',{id:'cancelBtn', textContent:'Cancel',title:'Close window',className:'saveclose_buttons',onclick:function(){GM_config.close(false)}}),
			obj.create('div', {className:'reset_holder block', kids:new Array(
				obj.create('a',{id:'resetLink',textContent:'Restore to default',href:'#',title:'Restore settings to default configuration',className:'reset',onclick:obj.reset})
		)}))}));

		obj.center(); // Show and center it
		window.addEventListener('resize', obj.center, false); // Center it on resize
		if (obj.onOpen) obj.onOpen(); // Call the open() callback function
		
		// Close frame on window close
		window.addEventListener('beforeunload', function(){GM_config.remove(this);}, false);
	}, false);
 },
 close: function(save) {
	if(save) {
		var type, fields = GM_config.settings, typewhite=/radio|text|hidden|checkbox/;
		for(f in fields) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
			if(!field.className.find("separator")) {
				if(typewhite.test(field.type)) type=field.type;
					else type=field.tagName.toLowerCase();
				GM_config.doSave(f, field, type);
				if(kids) for(var kid in kids) {
					var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
					if(typewhite.test(field.type)) type=field.type;
						else type=field.tagName.toLowerCase();
					GM_config.doSave(kid, field, type, f);
				}
			}
		}
                if(GM_config.onSave) GM_config.onSave(); // Call the save() callback function
                GM_config.save();
	}
	if(GM_config.frame) GM_config.remove(GM_config.frame);
	delete GM_config.frame;
        if(GM_config.onClose) GM_config.onClose(); //  Call the close() callback function
 },
 set: function(name,val) {
	GM_config.values[name] = val;
 },
 get: function(name) {
	return GM_config.values[name];
 },
 isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',
 log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),
 getValue : function(name, def) { return (this.isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))(name, def||""); },
 setValue : function(name, value) { return (this.isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(name, value||""); },
 save: function(store, obj) {
    try {
      var val = JSON.stringify(obj||GM_config.values);
      GM_config.setValue((store||GM_config.storage),val);
    } catch(e) {
      GM_config.log("GM_config failed to save settings!");
    }
 },
 read: function(store) {
    try {
      var val = GM_config.getValue((store||GM_config.storage), '{}'), rval = JSON.parse(val);
    } catch(e) {
      GM_config.log("GM_config failed to read saved settings!");
      rval = {};
    }
    return rval;
 },
 reset: function(e) {
	e.preventDefault();
	var type, obj = GM_config, fields = obj.settings;
	for(f in fields) {
		var field = obj.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
		if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
		GM_config.doReset(field, type, null, f, null, false);
		if(kids) for(var kid in kids) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
			if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
			GM_config.doReset(field, type, f, kid, true);
			}
	}
 },
 addToFrame : function(field, i, k) {
	var elem, obj = GM_config, anch = GM_config.frame, value = obj.values[i], Options = field.options, label = field.label, create=GM_config.create, isKid = k!=null && k===true;
		switch(field.type) {
				case 'separator': elem = create("span", {textContent:label, id:'field_'+i, className:'field_label separator'});
					break;
				case 'textarea':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('textarea', {id:'field_'+i,innerHTML:value, cols:(field.cols?field.cols:20), rows:(field.rows?field.rows:2)})
					), className: 'config_var'});
					break;
				case 'radio':
					var boxes = new Array();
					for (var j = 0,len = Options.length; j<len; j++) {
						boxes.push(create('span', {textContent:Options[j]}));
						boxes.push(create('input', {value:Options[j], type:'radio', name:i, checked:Options[j]==value?true:false}));
					}
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('span', {id:'field_'+i, kids:boxes})
					), className: 'config_var'});
					break;
				case 'select':
					var options = new Array();
					if(!Options.inArray) for(var j in Options) options.push(create('option',{textContent:Options[j],value:j,selected:(j==value)}));
						else options.push(create("option", {textContent:"Error - options needs to be an object type, not an array.",value:"error",selected:"selected"}));
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('select',{id:'field_'+i, kids:options})
					), className: 'config_var'});
					break;
				case 'checkbox':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('label', {textContent:label, className:'field_label', "for":'field_'+i}),
						create('input', {id:'field_'+i, type:'checkbox', value:value, checked:value})
					), className: 'config_var'});
					break;
				case 'button':
				var tmp;
					elem = create(isKid ? "span" : "div", {kids:new Array(
						(tmp=create('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||''}))
					), className: 'config_var'});
					if(field.script) obj.addEvent(tmp, 'click', field.script);
					break;
				case 'hidden':
				elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('input', {id:'field_'+i, type:'hidden', value:value})
					), className: 'config_var'});
					break;
				default:
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('input', {id:'field_'+i, type:'text', value:value, size:(field.size?field.size:25)})
					), className: 'config_var'});
			}
	if(field.kids) {
	var kids=field.kids;
	for(var kid in kids) elem.appendChild(GM_config.addToFrame(kids[kid], kid, true));
	}
return elem;
},
 doSave : function(f, field, type, oldf) {
 var isNum=/^[\d\.]+$/, set = oldf ? GM_config.settings[oldf]["kids"] : GM_config.settings;
 switch(type) {
				case 'text':
					GM_config.values[f] = ((set[f].type=='text') ? field.value : ((isNum.test(field.value) && ",int,float".indexOf(","+set[f].type)!=-1) ? parseFloat(field.value) : false));
					if(set[f]===false) {
						alert('Invalid type for field: '+f+'\nPlease use type: '+set[f].type);
						return;
					}
					break;
				case 'hidden':
					GM_config.values[f] = field.value.toString();
					break;
				case 'textarea':
					GM_config.values[f] = field.value;
					break;
				case 'checkbox':
					GM_config.values[f] = field.checked;
					break;
				case 'select':
					GM_config.values[f] = field.options[field.selectedIndex].value;
					break;
				case 'span':
					var radios = field.getElementsByTagName('input');
					if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
						if(radios[i].checked) GM_config.values[f] = radios[i].value;
					}
					break;
			}
 },
 doSettingValue : function(settings, stored, i, oldi, k) {
		var set = k!=null && k==true && oldi!=null ? settings[oldi]["kids"][i] : settings[i];
			if(",save,open,close".indexOf(","+i) == -1) {
            // The code below translates to:
            // if a setting was passed to init but wasn't stored then 
            //      if a default value wasn't passed through init() then use null
            //      else use the default value passed through init()
            // 		else use the stored value
            try {
            var value = (stored[i]==null || typeof stored[i]=="undefined") ? ((set["default"]==null || typeof set["default"]=="undefined") ? null : (set["default"])) : stored[i];
			} catch(e) {
			var value = stored[i]=="undefined" ? (set["default"]=="undefined" ? null : set["default"]) : stored[i];
			}
            
            // If the value isn't stored and no default was passed through init()
            // try to predict a default value based on the type
            if (value === null) {
                switch(set["type"]) {
                    case 'radio': case 'select':
                        value = set.options[0]; break;
                    case 'checkbox':
                        value = false; break;
                    case 'int': case 'float':
                        value = 0; break;
                    default:
					value = (typeof stored[i]=="function") ? stored[i] : "";
                }
			}
			
			}
	GM_config.passed_values[i] = value;
 },
 doReset : function(field, type, oldf, f, k) {
 var isKid = k!=null && k==true, obj=GM_config,
	 set = isKid ? obj.settings[oldf]["kids"][f] : obj.settings[f];
 switch(type) {
			case 'text':
				field.value = set['default'] || '';
				break;
			case 'hidden':
				field.value = set['default'] || '';
				break;
			case 'textarea':
				field.value = set['default'] || '';
				break;
			case 'checkbox':
				field.checked = set['default'] || false;
				break;
			case 'select':
				if(set['default']) {
					for(var i=field.options.length-1; i>=0; i--)
					if(field.options[i].value==set['default']) field.selectedIndex=i;
				}
				else field.selectedIndex=0;
				break;
			case 'span':
				var radios = field.getElementsByTagName('input');
				if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
					if(radios[i].value==set['default']) radios[i].checked=true;
				}
				break;
		}
 },
 values: {},
 settings: {},
 css: {
 basic: 'body {background:#FFFFFF;}\n' +
 '.indent40 {margin-left:40%;}\n' +
 '* {font-family: arial, tahoma, sans-serif, myriad pro;}\n' +
 '.field_label {font-weight:bold; font-size:12px; margin-right:6px;}\n' +
 '.block {display:block;}\n' +
 '.saveclose_buttons {\n' +
 'margin:16px 10px 10px 10px;\n' +
 'padding:2px 12px 2px 12px;\n' +
 '}\n' +
 '.reset, #buttons_holder, .reset a {text-align:right; color:#000000;}\n' +
 '.config_header {font-size:20pt; margin:0;}\n' +
 '.config_desc, .section_desc, .reset {font-size:9pt;}\n' +
 '.center {text-align:center;}\n' +
 '.section_header_holder {margin-top:8px;}\n' +
 '.config_var {margin:0 0 4px 0; display:block;}\n' +
 '.section_header {font-size:13pt; background:#414141; color:#FFFFFF; border:1px solid #000000; margin:0;}\n' +
 '.section_desc {font-size:9pt; background:#EFEFEF; color:#575757; border:1px solid #CCCCCC; margin:0 0 6px 0;}\n' +
 'input[type="radio"] {margin-right:8px;}',
 stylish: ''},
 create: function(a,b) {
	var ret=window.document.createElement(a);
	if(b) for(var prop in b) {
		if(prop.indexOf('on')==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for(var i=0; i<prop.length; i++) ret.appendChild(prop[i]);
		else if(",style,accesskey,id,name,src,href,for".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	}
	return ret;
 },
 center: function() {
	var node = GM_config.frame, style = node.style, beforeOpacity = style.opacity;
	if(style.display=='none') style.opacity='0';
	style.display = '';
	style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
	style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
	style.opacity = '1';
 },
 run: function() {
    var script=GM_config.getAttribute('script');
    if(script && typeof script=='string' && script!='') {
      func = new Function(script);
      window.setTimeout(func, 0);
    }
 },
 addEvent: function(el,ev,scr) { el.addEventListener(ev, function() { typeof scr == 'function' ? window.setTimeout(scr, 0) : eval(scr) }, false); },
 remove: function(el) { if(el && el.parentNode) el.parentNode.removeChild(el); },
 toggle : function(e) {
	var node=GM_config.frame.contentDocument.getElementById(e);
	node.style.display=(node.style.display!='none')?'none':'';
	GM_config.setValue(e, node.style.display);
 },
};

/************************************/
/***** Script integration - End *****/
/************************************/

/******************************************/
/***** Movie/Game Info Tooltip Script *****/
/******************************************/

/***** IMDB Redirection *****/
if (GM_config.read()['imdb_redirect'] || GM_config.read()['imdb_combined'])
	imdbRedirect();

/***** Init Icons *****/
var loading_uri = 'data:image/gif;base64,R0lGODlhEAAQAPYAAP///wAAANTU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoKDAwMDY2Nj4+Pmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6+vtDQ0Do6OhYWFoyMjKqqqlxcXHx8fOLi4oaGhg4ODmhoaJycnGZmZra2tkZGRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKCgqioqPr6+vz8/MDAwMrKyvj4+NbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4NjY2PLy8tra2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCgoE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5ri4uH5+fpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQEAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaDERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkKE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjczrJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA';
var stars_uri = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAoCAMAAACMwkUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABgUExURQAAAP7+/fv7/Pn5+vf39/789PPz8+3t7ebm5uDg4Pn12vDqz/XssuParPLnmtbKjbGcMrqnU8O0bcixN9fAP9zNdt/IPODg4OXOQ+jVV+nZc+3ZSfLgVPXssvfnbf///6oVmaEAAAAQdFJOUwAECAsPExciLjlFW5GcvtnZ3S3RAAABKElEQVRYw+3ZzXKEIBAE4BlFEUVl1SysmOz7v2UG1/1JKtccmtq+WH63KaC1lCi/cC7W5GFUG5WFceN1DkbKe8MZGGvvf48HZqxUrXUyb+SqlMI0mcv41xiNaZIfampYSy32tBLYiMq7NgxtRM2BGtz4MR22pSfLsd2wjXRqsFKa4OXdBdGklpsiDdk8igzS5Nzch6o1tL3zzr+mysW+8jCyW8s5GMVtyMJsiFuVgdEqaKGt6lo7DOs5xMs6WNu1su0QjaqPeV6W5RxCjBdJtID2eU1rMrrEoiFhxwxqxL1zSXc++gzRJN1Nl7AWhGxEp32llmUAN+VkvMQjtlXG7RGGttQBzo3tJPo8N4hWTG6SO+5Oc49scm5uXx2Z+xHaiP/4qYhoOeQbGAy9N11bgA4AAAAASUVORK5CYII=';
var allocine_stars_uri = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAMAAAA/pq9xAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAADSUExURQAAAKYwOa1NWa9nM6+GM7GcMrdmb7d5UreSUrqnU7s0P8GObMGjbMO0bcZzN8aXN8ixN8s8SM9wdtCVmtE4QtZAStZ+QNakQNfAP9lSWduidtu2ndu7dtvFndxudNzNdtzRnd2CO92qO95ES9/IPODg4OJOVOKIROKwROWXV+W6V+XGyeXOQ+dobOimdOjDdOjVV+mtsOnZc+qRSOq6SOrYzOrgzO3ZSe3ozO+cU+/DU/HN0PLgVPSsbvTObvTRtfThtfXts/fi0vfnbffs0vn00yklNIoAAAABdFJOUwBA5thmAAACCklEQVRIx+2VbVeiQBiGMcHKd5Z4aV0NQ4SK1RSKCncVgv//l/aZmcM4CCEforOn4/3x+nBfPPPMHDjulP845lcws34G0PwKZtbKTDY1sQytjTG0RkZprez7SIqO8LNZ+jzNOtkpp9Sc94rsbwH7U8B+F7BkU43Fb3kWveZZMC+Q+JuwEvPedjnmvm5zzJiv8h/t+JsqLLa93CiR5eZGCWQjP8oaCpMKbAmS+IAtQBIdsAlIgswXh+F65viP6zBJyli82y1vbe9+uYupJ9puF1PLvVtsI+oJVqvJlWxcT1ZB6rkZDjVNmzmO7z9C/OQD9mswUFX11rY97x7iIc/Pfl9RlKllue4dxEWeH+22KIpXsmwY1xCDeHQBVUKjgwq5D9mYRxqw2EhC2KiJNGCxkIQwqYE0YJGRJB3vRRBQI64sY888jyxYk7KnZhNZsCZlD40GsmANsxXSqDnrI4xYVHvJMGJRrAXDiEWUJ+zqL/HpaFp4hF3gE1NV9qmc4xNTFPapnOETE8XMUxHgs1GlfoTxMArSjDOTgAU0o8wkYAGNdCDBndoRxuOAJivBHiUrwR6RYTq06VwPGsvZGAxjrguWPRuBYcR1wLJnEhgkrgUWRtITemQNw5dS1uW7ZDWDZ8o6zQ5ZTf+JslajRVbTfmB2TC+uXsou6GXeL+WcXub9Us7oZZa+1+/wH/4dffbd60agAAAAAElFTkSuQmCC';
var imdb_stars_uri = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAoCAMAAACMwkUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAFxUExURQAAAKYwMKdDMKlZMapuMayEMq1NUK9bTq+QM7FsT7GcMrJ9ULSQUbdmZ7eaUrhzZ7qCaLqnU7s0NLyRab1LNL6har9jNcF8NcGrbMOVNsO0bcajN8ixN8s8PMxVPc9uPs9xcNCHPtCVldE6ONGCcNGgl9NVONOiP9OrmNSUctWmc9W2mNZCQNZwOdawQNeLOdfAP9fCmthcQdi4dNlWUtnKnNp3QdqoOttuU9vDdtxvbtySQtzNdtzRnd2GVN24O95KRN6Db99kRN+fVN+tQ9/IPOCXcODg4OJWTuJ/ReKqceK3VeK9RORvT+SbRuXAcuXGV+XGxuXOQ+duaOeKUOepqOe3R+fMx+jMdOjTyOjVV+mFaemlUemvrenZc+nZyeq5rerHSOvgyuybauzAUu3Gr+3ZSe3lzO3ozO6za+7RsO/QU/DdsfHLbPHOzfLUzvLgVPLy8vPls/TZbvTcz/Xj0PXts/fnbffr0fjw0/n003k3aXEAAAABdFJOUwBA5thmAAADh0lEQVRYw+3X21cSQRzA8UVBETXN+w0ITLFABFI0CQVEEUVUMkTzAiZoSmAEBPz1/WbmMDvL8NA57oPr2d/j92k+zGUPgqCOOur850ReS4u8jgYx8lpaRPEtwo6Cm6QqujFV4Y1WxTcV8kJbROmt+YmMKL2po4466ihw/src/rRpv9q0n23ajzbte5v2tU1rPMnb6o98q93yrXLBt/IJ34oHfCvstoHknqqytsxjiWvJ2zzX4hcPXIueZLkWOkhzLbB7yf+oidyTnK0ey3BbUgsnuS2p+OLclpS9UW5Lip4QtyUFR4DfkitYTEPGlgJIvaUdAqTW0vYAUmlpOwApt7QgQIotbR0gBckvWq1ebSdy51fVRkOOVi+VUpuxzFGqVKeWWj5/uBpO7h/ma9RSeXjYW/LFt/YeKtRSzmZ3Fr3RjZ1smVqK6XRw3hNaC6aL1FK4vFyfdQSW1y8LTcuXmRmXy7WdSORy5zC5xjPb5+lpp9O5GYtlMkcwGWT5NDlps9lWw+Fkch8miSwfx8ctFsuSzxePb8HEkeXD2JjZbF70eqPRDZgosrwfGTGZTPMeTyi0BhNClndDQ0ajcdbhCASWYQLffiOJ34CWA6tJoMUQ3XPaih5RQBJDENLcOkQBSRhBSLNrEQUkPgQhbaETUUDiRRDS5joQBSQeBCHNqkEUkDgQpLlN9wYDWg1ejhztTq9HEkxpthudDkkwpdmutVokwZRmO+vsRBJMabbTjg4kwZRmO9ZokARTmFtCVuNKXMnUiMQZSzGNSGzhQ6YRicW3xzQiMXt3mEYkJk+QaURidKyz1/0tPiEuV1Wm9gafLqeT/ZT04dNls7Gfkl58uiwW9lPSg0+X2cx+Srrx6TKZ2E9JFz5dRqPkU2KAnxUtxy9T08OWIMqKZEdAAhS3ZEdAAhS7ZEdAApQFyY6ABChzkh0BCVCsLRC8HpdMTY8HKFIIttikEGyxSCHYYpZCsMUkhWCLkWl+WIlfmILVyNNWQLEiTIBEbG5QuIVRkIjNDgq7MAwSsS2AYkEYBInY5kAxJwyARGxWUFiFfpAwkCnDFDnuM/eytAn9BLkq03e0jepGyVWZvKFtWDtMrsr4NW2DnYPkqoyd0TbQMUCuysgpbf2afnJVho6Z+0ofU78s7Q19iMVL0kcfYvGS9NKHWLwkPfQhFi9JN32IxUvSRR9iq/oX7CXOP0hn0ljJajC/AAAAAElFTkSuQmCC';
var popcorn_icon_uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTM0RTNEQUFGMTA4MTFERkI2NzNCQjdDMTcxRkE2RjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTM0RTNEQUJGMTA4MTFERkI2NzNCQjdDMTcxRkE2RjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1M0E4QUQ2MUYxMDgxMURGQjY3M0JCN0MxNzFGQTZGMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1M0E4QUQ2MkYxMDgxMURGQjY3M0JCN0MxNzFGQTZGMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhSeLgcAAAGgSURBVHjanJNLSwJRFMf/txcVraKUooXgByioRFCMoMcqWrho065o1zfoE7RqH20jsIVWi5AgKiPRkoRIWhQuzHepiY9sZm537jTjDAY9LnM451zO754HZwilFP89HapBCNEu6y8HFFT+BEBqMP2OHskLMuzVguSkRM2swrWch3ZT39eLIoOZkC7FbxRBRo6ICrfpyyhzcL95QdsVUKxwN5O4Qzpo0frU4KtbP/qq2yx1QbmoZZu6Ufm2Z61sVrdiZJeReQpw02wZRyZ+YwDM9rjaNOG1c4nF5Gd+JaLXR6niKfCOZxOlx/sfwWIwSFsGNutwc/26uKCEsZOrl/EWiXC7FAohPzcDKkloGdjehfvPS6LBVqsJ1WwO/b5DJOS5TU+h8zoKqVJB1uWEVKthwH8CqV7H7vGWEU5GXeg1DSLjdKDKfNPpGZuMwESE6TwAKghI2Sa5H39IGuH1lQ0I+TLMgUuU8YG03cYAkUvKNsEgCUOhMFsYEfPOpeaO6n+Ogm6yeb+fi37a+t1ugfmaejz0eWzUAIXXVg1BMvMpwADZ1h6h7FNupgAAAABJRU5ErkJggg%3D%3D';
var fresh_icon_uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTNBOEFENUJGMTA4MTFERkI2NzNCQjdDMTcxRkE2RjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTNBOEFENUNGMTA4MTFERkI2NzNCQjdDMTcxRkE2RjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1M0E4QUQ1OUYxMDgxMURGQjY3M0JCN0MxNzFGQTZGMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1M0E4QUQ1QUYxMDgxMURGQjY3M0JCN0MxNzFGQTZGMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PstthmQAAAIzSURBVHjapFNNaBNBFP5mssmmiZHYpE1DLUVlpQgelGJRKD1pbx71oIeiB62KoHjqtYhe66WggqCnCnrSi2h78iDpsQaLmui2CbHmr91udrK7s8+hUmoQL/bB8ObNvO9735vHMCLC/xrHLkzb3gxfOIJ3L22M3kpj9EQvLHPznF7356woZjOp6PWZq99o+nYGE6+bSFV9xNa+7FQOvttbvkey00xntqvrc5+eFVCuupNxQYvmULT/n7JfFDWU01poLC+ml/LN2CZjqEwYSJ5MI1JoHb9zo2c1ZQXvnQjT/wL3gmsbffqb8TYbWZgy0Z0kTFoS5Pk43OZ4fm0Z2bx9anEgbLrh3wRs+7Xr+43L4SR/3D6o4cFIAhWd4eGjNciCj/E5A28vFUGS0IoxiAifSq18vrcDHjRy3IgMh44lEB/KgNcEnNUqul41sJDugtHwsccOgBAggSUFPsr/6P4QIgxc18AG0/CMbnhhhkY2guFlgS4RIKSAnkrdIOrvGJWic2DJfUFVQOS+glQRqGq0rvqOcujqAa2A0FAXPwPZPtABDjAfVORFaC0ENVfFCl3yodUIvspqqvbq6qwsPZQ88WGsA8xwHw6dDYr+Xlb2wRRWOgSHMzRVsCYlSm4bRWGLhivudsoGPiqC8/DpiSLvc0HYUKumZFZ8D2a7hWLLrjY998pTolznqAaMLa+igU2im6qvMz8CmS17gpmOXVkRzvw60UwcKCQ4x6xSwnbzq34JMADbAxsCfDsyXwAAAABJRU5ErkJggg%3D%3D';
var rotten_icon_uri = 'data:image/gif;base64,R0lGODlhEAAQANUAAECdJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///yH5BAEAAD8ALAAAAAAQABAAAAY2wJ/wBygOj0hiEZBMLpnN43O4pBqrSqwW+uQas1PptRvtQstm59e83jLJ2Kz1K6bT6+eoPBkEADs=';
var comment_bubble_uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAHdElNRQfZBwsVChqBpMw9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAABa0lEQVQoz2NgQAKxreuYY1vXBsS1rlsJxA+B+D8Qfwbik0DcDMRSDNgAUEI6qmnN0f6Vx/6fuPbk/5sPX/+DwPefv//fffru/4bD1//nTtz2C6iuCF2jHBC/vXT3xX984OuPX/+X7Lr4P6R2ZSdQPSPQqWtZg2pWrD9z4+l/YkHPiqO/w+pXaTEEVC2TnbX57Of/JIB7z979z5+0bSJDeMMqg4MX7pOi9/83oPNLpu28yAAMJLNDFx+QpPkrRPM5oLOXy0xbf+oDKZrvPH37P2/itn5w3IbUrliw9fgtojW3Lzn0LrRupQIsqtiA+N7pG0/+//v3D6em95+//5+75SwoqsrR41oI6P8drYsO/dtz5u7/O0/e/v/5+w9Y020ge8bG0/9TuzZ+BKpLZsAFgJL2QDwN6J0TQPrbRWDCAQbOMSA/FsjnZiAWABUb18ze+7946o6JDOQAoAHxQPwdiJnJNGCtJVCzF7o4AIvXFqgzJp23AAAAAElFTkSuQmCC';

var arrow_up_uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sGDREGFnZtsKEAAAIVSURBVDjLjVMxa/JQFD0GpVLEpYOTU9yUSNOhWDOJShcRFUxx6qAExMnBn9Chu9A/4CAiOlnRoYroIFSyRJCIdpF0KFJKBwsh7xsepPn8tF/v9N55995z7+E8kOORyWQEQfghAcceZrPZycmJw+F4eno6lmMjhOBQSJK0Wq28Xu92u2232wdz9pkNwyCEvL6+MgwznU5VVbXZbPP53Hz6aWyakUgkBEHY7Xa6ricSifPz89/uPJvNADSbTXodDocAOp3Of4oNw9B1PZvNchxnxWOxWDQa/fr62pt8n/nl5QWALMtWUNM0AIqiHGWmXfP5fCQSscpDD7lcLh6P78n2F7OqqgAeHx//XW88HjMMMxwOj459fX0dCAR0XT+orSAIPM8fLqYi9/t967TWg6IoAKyG+y6WJOnq6srauNfrNRoNKyKKYjKZ/C6mjTVNo5ai6GazKRQKdrv99PRUFMXlcknxxWIBwDQcTEuFw+HdbkcIqdfrZ2dnLMvKsrxYLILBoNvtfnh4IIRQw5mbgxDy/PwMoNVqfXx8FItFALe3t9Zpy+UygJubm7e3t9FoZBoO1FKhUKjVank8HpZlB4OBKZWp1nQ65Xne5XLVarV0Ok0Nh/V67XQ6/X4/gEqlQn6M+/t7ADRZURSUSiUAHMd1u909toMfbjKZXF5eAkilUri4uLi7u3t/fye/js/Pz2q16vP5/gBSj5ZiN8DWhQAAAABJRU5ErkJggg==';
var arrow_down_uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sGDREGOkS13EIAAAIdSURBVDjLjZM/a+pgFMYfQ4tFxEEH9+pmUYxDUTOJFhfpH6GKU4eKIJ0c/AgO7gX9AA4iJZuKHWwo7RBoyZKCWKggpR0cRDpECDkd3kuuN8313jPlPe95cp5z8guCweD19fXX1xf9dyyXy0ajEYvFcHp6CuDw8PDx8ZGIDMOwFRiGwa6Gw2E4HAZwdXUFVVUBhEIhAM1mc3vPer3Oivf29t7e3rBer9Pp9NnZWafTcbvdPM/LsmzpRkR3d3eBQMDv94uiGI/Hz8/PdV0HEfX7fQD39/eLxaJYLAKo1WqbDS8uLgBUq9XVaiWKIoCnpyciArvmeT6Xy+m6TkStVsvj8UQikclkoihKIBDw+XzdbpeINE1LJpO5XI75AjP28vICYDKZsHe9vr4WCgWXy7Wzs1Mul9/f31lelmWO4z4+Pn6JTW/Hx8eFQmHTba/XG41Gm5lEIlGpVMzjb/F4PAagqqq5LcvD7e0tgOfnZxsxm1wQBNuPpOv6wcFBNpvdTP4hliSJ47iHh4ef4sFgAGA6ndqLmb2jo6NSqfTTdiqVury8tCAISwcGHNunGYqiAJjNZpZiWABmwGUymc18OBxmSFnIx8/xGHCSJLHjzc2NZcnbxEQUjUYZcJqmCYJgIvUPsQmcw+GYTqcMqc/PT1uxg4hgFycnJ16vdz6f7+/vt9tt2xr87dcdj8e7u7tOp9N22m0zsxAEIZ/Pbyn4BkZQk2LT0N0FAAAAAElFTkSuQmCC';
var arrow_right_uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sGDREFKwUor3MAAAH6SURBVDjLlZPPyzFRFMePafKjpGRhZcVuRMZCfqyEbCahjKws/ChZWfgTLOyVf8DCQrNDLJjEYopsRoliI5QFsqCmmWcxb/N4vfPwvN/NvXXO995zPvdccDqdxWJxs9lwHCcIAs/zPM8LvxNUKhUAUKvViURiOp0K/yM4n882mw3DMLfbDQAEQez3+9+aBUHodrsAQFEURVFerxdBkHw+P5vNxIw3XYC4lMtlo9F4vV7v9zvDMB6PBwDC4fBqtXpzBEgBs9lcKBSkQL/ft1qtAJDJZLbbrSzOb/NwOASAZrMpxTiO63Q6fr8fABKJhNTIa9mi0um0wWDY7XYvSfP53GaziTgPh4O8WSw+m80+NyltWq2Wz+dDECSXy4lVfJvFpPl8jqJor9eTxSviDAQCKpUqHo8j8Lc0Go1SqbxcLiAnFEX1er3JZOJ5/ng8vpZtt9tJkpQtm6ZpgiAUCkUkEhkMBq89l0olnU63Xq9fTtzv98FgEAAcDsdisZABxjAMANTr9WfbeDxOpVIAEAgE2u32j0OC43gymZQCLMuKbEOhEMuyj8fj31H7c3O1WtVqtafTieO45XJJkiQA4DhO0/SH8ZxMJgDQaDRGoxFBEAAgIfnwMW63m8vlwjAsFouJtz0j+fAla7Wa+IaySD6YLRZLNBr9Ccl7fQGfFZeh9rXygAAAAABJRU5ErkJggg==';
var arrow_left_uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sGDREGKLcMrQoAAAIASURBVDjLlVRNy3FRFF33lpLEwMAPYEbERD5GQiY3MUBGlI8yNPATDJSh8geegSQzlAESSrmZUGKgJAaKpHx0Oc/glnTf+zyvZ412e6+9z9rrnA7IZ3g+n3xwu92m06nf79dqtSB/Qb1ed7lcAAAUi8VPm2ezmdlsBhAIBHQ6ncViOZ/P+K/Odrvt8/kAMAzT6/W+vr4ADAYDQgh+aet2u/xpoVBoPp9zHLff7+VyeT6f5wn4yRKPx0PTtMPhmE6nL044HDabzS8yfrIkEon0+/33UqlUAjAajV4ZvFtiMpkAuN3u7XYrGLpcLhUKRSaTeU/iZQlFUQzDdLtdwRZ8EAqFjEajYCIcDodEIonFYovFguM4UecrlYpMJpvP5+9DCSG0Wq2maXq9Xh8OB47jIAalUnm/3y+Xi7BACGFZNplM8t5Wq1VR2YlEQqPRCGW/ot1uxzAMAIPBMJlMBLzNZqNSqaLRqHgzD5Zlg8EgAKfT2Wg03l0ol8sAOp2OyD0/n08+xXHcarWKx+MA9Hp9q9V6cdLpNC9e/JG8b7tYLLxeLwCbzTYaja7X6+l0UqvV2WxWXPa/I1iWTaVSNE3b7fZarVar1QA0m83fmgXYbre8nVarVafTGQyG4/H4t89gPB4Hg0GpVAogl8tRhBB8AJ5GUdTj8Viv14VCYTgcfgNGvHW4QiQY5wAAAABJRU5ErkJggg==';

var show_uri = 'data:image/gif;base64,R0lGODlhDQAPANU3ANPT0yEhIQYGBvj4+P7+/vb29vv7+wICAvz8/P39/e7u7vX19fLy8t3d3dfX1w8PDwQEBNXV1ePj4+np6fHx8fDw8Ojo6NbW1u/v7yIiIt/f3yMjIwcHBxgYGBwcHBUVFfT09ODg4Nzc3PPz8+Li4iAgIOzs7BcXFwUFBRoaGhsbG9TU1BkZGQsLCwwMDBQUFBEREevr6x0dHebm5vn5+f///wAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADcALAAAAAANAA8AAAZvwJtwSCwajarAJiBLdT4wF0cYqFmtBARtIBBmrtYErQBCCUtgm6FAURyEnjSNYZrYhCyrbb+fSe43JwQJBjQ2GDMhDYAvWgsMNjMNDheADzQLFTEzGg4AAIAtAyMKFiQiEQArgAICEAd8sUeztENBADs=';
var hide_uri = 'data:image/gif;base64,R0lGODlhDQAPANUAACEhIQYGBubm5tPT0/X19fz8/Pj4+AICAvv7+/7+/v39/e/v7/b29vLy8u7u7t3d3RERER0dHePj4+np6ejo6PDw8AQEBNzc3AwMDOzs7A8PD/Pz8xgYGBoaGiMjIwsLC9XV1SIiIhkZGdTU1Ovr6+Dg4BUVFfT09BwcHBQUFNbW1uLi4gUFBRcXF/Hx8QcHByAgIBsbG9fX1/n5+QAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAANAA8AAAZuQJtwSCwajTGABxDpcEwQzEsIqFmticLMEBCGrlbFjHFiCWHgGoLhchyEqPSskZnQhCIrbb8XSO42LQkKCDMLCwIlD4ApWgQNMgIPMiqAGjMEFSQynAMDgB8GGw4UKxcgAyOAAQEWB3ywR7KzQ0EAOw==';

/***** Debug variables *****/
var debug = false;
var table_border = 0;

/***** Init variables *****/
var show = new Object();
var load = new Object();
var data = new Object();
var website_config = new Object();
var movieImage = new Image();

initGMTranslations();
initGMConfigMenu();
updateCheck(false);

/***** Check IMDB Api connection *****/
var pingImdbApi = false;
var imgPreload = new Image();
var connectionTimer = null;

checkImdbApiConnection();

/***** Initialisation *****/
function init() {
	initMGIT();
	initLinks();
}

function initMGIT() {
	if (document.body != null) {
		MGIT_tooltip = document.body.appendChild(document.createElement('div'));
		MGIT_tooltip.id = 'MGIT_tooltip';
		MGIT_tooltip.style.visibility = 'hidden';
		MGIT_tooltip.style.position = 'fixed';
		MGIT_tooltip.style.zIndex = '100000';
		MGIT_tooltip.style.border = '1px solid #aaa';
		MGIT_tooltip.style.overflow = 'auto';
		MGIT_tooltip.style.maxWidth = GM_config.read()['tooltip_max_width'];
		MGIT_tooltip.style.maxHeight = GM_config.read()['tooltip_max_height'];
		MGIT_tooltip.style.fontSize = GM_config.read()['tooltip_font_size'];
		MGIT_tooltip.style.backgroundColor = GM_config.read()['tooltip_color'];
		MGIT_tooltip.style.opacity = GM_config.read()['tooltip_opacity'];
		
		MGIT_minimized_tooltip = document.body.appendChild(document.createElement('div'));
		MGIT_minimized_tooltip.id = 'MGIT_minimized_tooltip';
		MGIT_minimized_tooltip.style.visibility = 'hidden';
		MGIT_minimized_tooltip.style.position = 'fixed';
		MGIT_minimized_tooltip.style.zIndex = '100000';
		MGIT_minimized_tooltip.style.border = '1px solid #aaa';
		MGIT_minimized_tooltip.style.padding = '5px';
		MGIT_minimized_tooltip.style.width = GM_config.read()['minimized_picture_width'] + 'px';
		MGIT_minimized_tooltip.style.fontSize = GM_config.read()['tooltip_font_size'];
		MGIT_minimized_tooltip.style.backgroundColor = GM_config.read()['tooltip_color'];
		MGIT_minimized_tooltip.style.opacity = GM_config.read()['tooltip_opacity'];
	}
	
	// Get display options
	if (GM_getValue('MGIT_show'))
		show = deserialize('MGIT_show');
	else
	{
		show.arrows = false;
		show.config = false;
		show.config_1 = false;
		show.config_2 = false;
		show.tooltip = true;
		show.minimized = false;
		show.plot = true;
		if (GM_config.read()['display_picture'])
			show.picture = true;
		else
			show.picture = false;
		serialize('MGIT_show', show);
	}
	
	show.id = null;
	show.info = true;
	show.search = false;
	show.setup = false;
	
	init_tooltip = false;
	init_preload = false;
	preloading = false;
	
	// Get tooltip position if it has been saved for the website
	if (GM_getValue('MGIT_' + document.location.hostname))
	{
		website_config = deserialize('MGIT_' + document.location.hostname);
		positionSaved = true;
	}
	else
	{
		website_config.v_pos = GM_config.read()['tooltip_v_pos'];
		website_config.h_pos = GM_config.read()['tooltip_h_pos'];
		positionSaved = false;
	}
	
	// Set default tooltip position
	if (website_config.v_pos == 'auto')
		v_pos = 'top';
	else
		v_pos = website_config.v_pos;
	
	if (website_config.h_pos == 'auto')
		h_pos = 'left';
	else
		h_pos = website_config.h_pos;
		
	// Events
	if (GM_config.read()['click_to_hide'])
		document.addEventListener('mousedown', function(e) { if (e.button == 0) hideTooltip(e); }, false);
	
	if (!GM_config.read()['disable_search_tooltip'])
	{
		//document.addEventListener('mouseup', getSelectedText, false);
		document.addEventListener('click', getSelectedLink, false);
		//document.addEventListener('copy', searchCopiedText, false);
	}
}

function initLinks() {
	if (GM_config.read()['preload_info'])
	{
		load.saved = 0;
		load.index = 0;
		load.links = [];
	}
	
	links = document.links;
	data = {};
	
	for(i=0; i < links.length; i++)
	{
		link = links[i];
		url = link.href.replace(/^http:\/\/.*?\/.*?(?:\?url=|\?)http:\/\//, 'http://');
		
		if (GM_config.read()['remove_redirection'])
			link.href = url;
			
		data = checkLink(url);
		
		if (data.id != null)
		{
			addEventToLinks(link);
			
			if (GM_config.read()['preload_info'])
			{
				if (GM_getValue(data.save_id))
					load.saved++;
				else
				{
					load.links[load.index] = data.url;
					load.index++;
				}
			}
			
			if (data.source == 'imdb')
			{
				if (GM_config.read()['imdb_redirect'] || GM_config.read()['imdb_combined'])
					link.href = changeImdbLink(link.href);
			}
		}
	}

	if (GM_config.read()['preload_info'] && load.links.length != 0)
	{
		initPreload();
		preload();
	}
	
	data = checkLink(document.location.href);
	if (data.id != null)
	{
		show.minimized = true;
		getInfo(data.url, 'show');
	}
}

function checkLink(url) {
	data = {};
	data.id = null;
	
	url = url.replace('https://', 'http://').replace(/^http:\/\/.*?\/.*?(?:\?url=|\?)http:\/\//, 'http://');
	
	//if (debug) GM_log('checkLink url : ' + url);
	
	if (url.match(/http:\/\/.*imdb.+\/title\/(tt[0-9]+).*/) && GM_config.read()['enable_imdb_link'])
	{
		data.source = 'imdb';
		data.url = url.match(/http:\/\/.*imdb.+\/title\/(tt[0-9]+).*/)[0];
		data.id = url.match(/http:\/\/.*imdb.+\/title\/(tt[0-9]+).*/)[1];
		data.save_id = data.source + '_' + data.id;
	}
	else if (url.match(/http:\/\/.*allocine.+\/film\/fichefilm_gen_cfilm=([0-9]+).html/) && GM_config.read()['enable_allocine_link'])
	{
		data.source = 'allocine';
		data.id = url.match(/http:\/\/.*allocine.+\/film\/fichefilm_gen_cfilm=([0-9]+).html/)[1];
		data.url = 'http://www.allocine.fr/film/fichefilm_gen_cfilm=' + data.id + '.html';
		data.save_id = data.source + '_' + data.id;
	}
	else if (url.match(/http:\/\/.*allocine.fr\/seance\/salle_gen_csalle=.+.html#movie([0-9]+)/) && GM_config.read()['enable_allocine_link'])
	{
		data.source = 'allocine';
		data.id = url.match(/http:\/\/.*allocine.fr\/seance\/salle_gen_csalle=.+.html#movie([0-9]+)/)[1];
		data.url = 'http://www.allocine.fr/film/fichefilm_gen_cfilm=' + data.id + '.html';
		data.save_id = data.source + '_' + data.id;
	}
	else if (url.match(/http:\/\/.*jeuxvideo.com\/jeux\/.+\/[0-9]+-(.+).htm/) && GM_config.read()['enable_jeuxvideo_link'])
	{
		data.source = 'jeuxvideo';
		data.url = url.match(/http:\/\/.*jeuxvideo.com\/jeux\/.+\/[0-9]+-(.+).htm/)[0];
		data.id = url.match(/http:\/\/.*jeuxvideo.com\/jeux\/.+\/[0-9]+-(.+).htm/)[1];
		data.save_id = data.source + '_' + data.id;
	}
	else if (url.match(/http:\/\/.*jeuxvideo.com\/jeux\/.+\/[0-9]+-(.+)/) && GM_config.read()['enable_jeuxvideo_link'])
	{
		data.source = 'jeuxvideo';
		data.url = url.match(/http:\/\/.*jeuxvideo.com\/jeux\/.+\/[0-9]+-(.+)/)[0] + '.htm';
		data.id = url.match(/http:\/\/.*jeuxvideo.com\/jeux\/.+\/[0-9]+-(.+)/)[1];
		data.save_id = data.source + '_' + data.id;
	}
	else if (url.match(/http:\/\/.*jeuxvideo.com\/articles\/[0-9]+\/[0-9]+-(.+)-test.htm/) && GM_config.read()['enable_jeuxvideo_link'])
	{
		data.source = 'jeuxvideo';
		data.url = url.match(/http:\/\/.*jeuxvideo.com\/articles\/[0-9]+\/[0-9]+-(.+)-test.htm/)[0];
		data.id = url.match(/http:\/\/.*jeuxvideo.com\/articles\/[0-9]+\/[0-9]+-(.+)-test.htm/)[1];
		data.save_id = data.source + '_' + data.id;
	}
	else if (url.match(/http:\/\/cinema.jeuxactu.com\/film-(news-)?(.+)-[0-9]+.htm/) && GM_config.read()['enable_jeuxactu_link'])
	{
		data.source = 'cinema.jeuxactu';
		data.url = url.match(/http:\/\/cinema.jeuxactu.com\/film-(news-)?(.+)-[0-9]+.htm/)[0];
		data.id = url.match(/http:\/\/cinema.jeuxactu.com\/film-(news-)?(.+)-[0-9]+.htm/)[2];
		data.save_id = data.source + '_' + data.id;
	}
	else if (url.match(/http:\/\/cinema.jeuxactu.com\/critique-cinema-(critique-)?(.+)-[0-9]+.htm/) && GM_config.read()['enable_jeuxactu_link'])
	{
		data.source = 'cinema.jeuxactu';
		data.url = url.match(/http:\/\/cinema.jeuxactu.com\/critique-cinema-(critique-)?(.+)-[0-9]+.htm/)[0];
		data.id = url.match(/http:\/\/cinema.jeuxactu.com\/critique-cinema-(critique-)?(.+)-[0-9]+.htm/)[2];
		data.save_id = data.source + '_' + data.id;
	}
	else if (url.match(/http:\/\/www.gamespot.com\/.+\/.+\/(.+)\/.+.html/) && GM_config.read()['enable_gamespot_link'])
	{
		data.source = 'gamespot';
		data.url = url.match(/http:\/\/www.gamespot.com\/.+\/.+\/(.+)\/.+.html/)[0];
		data.id = url.match(/http:\/\/www.gamespot.com\/.+\/.+\/(.+)\/.+.html/)[1];
		data.save_id = data.source + '_' + data.id;
	}

	return data;
}

function initPreload() {
	MGIT_load_tooltip = document.body.appendChild(document.createElement('div'));
	MGIT_load_tooltip.id = 'MGIT_load_tooltip';
	MGIT_load_tooltip.style.visibility = 'visible';
	MGIT_load_tooltip.style.position = 'fixed';
	MGIT_load_tooltip.style.zIndex = '100000';
	MGIT_load_tooltip.style.border = '1px solid #aaa';
	MGIT_load_tooltip.style.maxWidth = GM_config.read()['tooltip_max_width'];
	MGIT_load_tooltip.style.fontSize = GM_config.read()['tooltip_font_size'];
	MGIT_load_tooltip.style.backgroundColor = GM_config.read()['tooltip_color'];
	MGIT_load_tooltip.style.opacity = GM_config.read()['tooltip_opacity'];
	
	MGIT_load_tooltip.style.top = '';
	MGIT_load_tooltip.style.bottom = '5px';
	MGIT_load_tooltip.style.left = '';
	MGIT_load_tooltip.style.right = '5px';
	
	MGIT_load_tooltip_HTML = '<table border='+table_border+' cellspacing=0 style="box-shadow:10px 10px 5px #888; padding:5px">';
	MGIT_load_tooltip_HTML += '<tr><td valign="top" align="left">';
	MGIT_load_tooltip_HTML += '<center><b>' + script_name + '</b></center><br>';
	MGIT_load_tooltip_HTML += (load.links.length + load.saved) + ' movie/game links were found.<br>';
	MGIT_load_tooltip_HTML += load.saved + ' were already saved.<br>';
	MGIT_load_tooltip_HTML += '<div id="MGIT_load_info"></div>';
	MGIT_load_tooltip_HTML += '<div id="MGIT_load_error"></div>';
	MGIT_load_tooltip_HTML += '</td></tr></table>';
	MGIT_load_tooltip.innerHTML = MGIT_load_tooltip_HTML;
	
	MGIT_load_info = document.getElementById('MGIT_load_info');
	MGIT_load_error = document.getElementById('MGIT_load_error');
	
	MGIT_load_tooltip.addEventListener('click', doNothing, false);
	MGIT_load_tooltip.addEventListener('mousedown', doNothing, false);
	MGIT_load_tooltip.addEventListener('mouseup', doNothing, false);
	
	if (GM_config.read()['disable_preloading_tooltip'])
		MGIT_load_tooltip.style.visibility = 'hidden';
		
	if (load.links.length > 0)
	{
		MGIT_load_info.innerHTML = 'Preloading : <span id="MGIT_load_count"></span>/' + load.links.length + ' (<a id="MGIT_toggle_preload" href="javascript:void(0)">Pause</a> / <a id="MGIT_cancel_preload" href="javascript:void(0)">Cancel</a>)';
	
		MGIT_load_count = document.getElementById('MGIT_load_count');
		MGIT_toggle_preload = document.getElementById('MGIT_toggle_preload');
		MGIT_toggle_preload.addEventListener('click', togglePreload, false);
		
		MGIT_cancel_preload = document.getElementById('MGIT_cancel_preload');
		MGIT_cancel_preload.addEventListener('click', cancelPreload, false);
	}

	load.index = 0;
	load.error = 0;
	preloading = true;
	init_preload = true;
}

function preload() {
	if (!init_preload)
		initPreload();
			
	if (load.index < load.links.length)
	{	
		if (preloading)
		{
			url = load.links[load.index];
			load.index++;
			MGIT_load_count.innerHTML = load.index;
			
			if (load.error > 0)
				MGIT_load_error.innerHTML = load.error + ' errors';
			
			getInfo(url, 'preload');
		}
	}
	else
	{
		cancelPreload();
	}
}

function togglePreload() {
	preloading = !preloading;
	
	if (preloading)
	{
		MGIT_toggle_preload.innerHTML = 'Pause';
		preload();
	}
	else
	{
		MGIT_toggle_preload.innerHTML = 'Resume';
	}
}

function cancelPreload() {
	preloading = false;
	MGIT_load_tooltip.style.visibility = 'hidden';
}

function addEventToLinks(link) {
	
	if (GM_config.read()['how_to_show'] != 'mouseover') // click or key + click
	{
		link.removeAttribute('title');
		link.removeAttribute('alt');
				
		//Compatibility with Better Usenet script
		if (GM_config.read()['better_usenet_compatibility'] && document.location.hostname.indexOf('binnews') != -1)
			link.parentNode.addEventListener('click', linkOver, false);
		else
			link.addEventListener('click', linkOver, false);
			
		if (link.getElementsByTagName('img')[0])
			element = link.getElementsByTagName('img')[0];
		else
			element = link;
		
		if (GM_config.read()['how_to_show'] == 'click')
		{
			if (GM_config.read()['language'] == 'en')
				element.setAttribute('title', 'Movie\Game Info Tooltip : Left click to show the tooltip, ' + GM_config.read()['pressed_key'] + ' + Left Click to open the link');
			else
				element.setAttribute('title', 'Movie\Game Info Tooltip : Cliquer pour afficher le tooltip, ' + GM_config.read()['pressed_key'] + ' + Clique pour ouvrir le lien');
		}
		else
		{
			if (GM_config.read()['language'] == 'en')
				element.setAttribute('title', 'Movie\Game Info Tooltip : ' + GM_config.read()['pressed_key'] + ' + Left Click to show the tooltip');
			else
				element.setAttribute('title', 'Movie\Game Info Tooltip : ' + GM_config.read()['pressed_key'] + ' + Clique pour afficher le tooltip');
		}
	}
	else // mouseover
	{
		// Compatibility with Better Usenet script
		if (GM_config.read()['better_usenet_compatibility'] && document.location.hostname.indexOf('binnews') != -1)
			link.parentNode.addEventListener('mouseover', linkOver, false);
		else
			link.addEventListener('mouseover', linkOver, false);
	}
	
	if (!GM_config.read()['click_to_hide'])
	{
		if (GM_config.read()['better_usenet_compatibility'] && document.location.hostname.indexOf('binnews') != -1)
			link.parentNode.addEventListener('mouseout', hideInfo, false);
		else
			link.addEventListener('mouseout', hideInfo, false);
	}
}

function initTooltip() {
	MGIT_tooltip_HTML = '<table border='+table_border+' width="100%" cellspacing=0 style="box-shadow:10px 10px 5px #888; padding:'+GM_config.read()['tooltip_padding']+'">';
	MGIT_tooltip_HTML += '<tr>';
	MGIT_tooltip_HTML += '<td></td>';
	MGIT_tooltip_HTML += '<td align="center"><span id="MGIT_arrow_up"><img width="10" src="' + arrow_up_uri + '"></span></td>';
	MGIT_tooltip_HTML += '<td></td>';
	MGIT_tooltip_HTML += '</tr><tr>';
	MGIT_tooltip_HTML += '<td valign="center"><span id="MGIT_arrow_left"><img width="10" src="' + arrow_left_uri + '"></span></td>';
	MGIT_tooltip_HTML += '<td valign="top" align="center">';
	MGIT_tooltip_HTML += '<span id="MGIT_tooltip_title"><b>' + script_name + '</b></span>';
	MGIT_tooltip_HTML += '<div style="white-space:nowrap;" id="MGIT_search"></div>';
	MGIT_tooltip_HTML += '<div id="MGIT_tooltip_body"></div>';
	MGIT_tooltip_HTML += '</div></td>';
	MGIT_tooltip_HTML += '<td valign="center"><span id="MGIT_arrow_right"><img width="10" src="' + arrow_right_uri + '"></span></td>';
	MGIT_tooltip_HTML += '</tr><tr>';
	MGIT_tooltip_HTML += '<td></td>';
	MGIT_tooltip_HTML += '<td align="center"><span id="MGIT_arrow_down"><img width="10" src="' + arrow_down_uri + '"></span></td>';
	MGIT_tooltip_HTML += '<td></td>';
	MGIT_tooltip_HTML += '</tr></table>';
	MGIT_tooltip.innerHTML = MGIT_tooltip_HTML;
	
	MGIT_tooltip_title = document.getElementById('MGIT_tooltip_title');
	MGIT_tooltip_body = document.getElementById('MGIT_tooltip_body');
	
	MGIT_arrow_up = document.getElementById('MGIT_arrow_up');
	MGIT_arrow_left = document.getElementById('MGIT_arrow_left');
	MGIT_arrow_right = document.getElementById('MGIT_arrow_right');
	MGIT_arrow_down = document.getElementById('MGIT_arrow_down');
	
	// init Info
	MGIT_tooltip_body_HTML = '<table cellspacing=0 border='+table_border+'><tr>';
	
	if (GM_config.read()['links_position'] == 'left')
		MGIT_tooltip_body_HTML += '<td nowrap valign="top"><div id="MGIT_links"></div></td>';
		
	MGIT_tooltip_body_HTML += '<td valign="top" align="center">';
	MGIT_tooltip_body_HTML += '<div id="MGIT_picture"></div>';
	
	if (GM_config.read()['links_position'] == 'center')
		MGIT_tooltip_body_HTML += '<td nowrap valign="top"><div id="MGIT_links"></div></td>';
		
	MGIT_tooltip_body_HTML += '<td valign="top"><div id="MGIT_info">';
	
	if (GM_config.read()['links_position'] == 'top')
		MGIT_tooltip_body_HTML += '<div id="MGIT_links"></div>';
		
	MGIT_tooltip_body_HTML += '<table cellspacing=0 border='+table_border+'><tr><td>';
		
	MGIT_tooltip_body_HTML += '<span id="MGIT_title"></span>';
	
	if (GM_config.read()['display_imdb_rating_in_title'])
		MGIT_tooltip_body_HTML += '</td><td valign="top"><span id="MGIT_rating"></span>'; //</td><td> <td> </td>
	
	MGIT_tooltip_body_HTML += '</td></tr></table>';
	
	MGIT_tooltip_body_HTML += '<div id="MGIT_original_title"></div>';
		
	if (!GM_config.read()['display_imdb_rating_in_title'])
		MGIT_tooltip_body_HTML += '<div id="MGIT_rating"></div>';
	
	MGIT_tooltip_body_HTML += '<div id="MGIT_rotten_tomatoes"></div>';
	
	if (GM_config.read()['add_separation'])
		MGIT_tooltip_body_HTML += '<br>';
		
	if (GM_config.read()['links_position'] == 'middle')
		MGIT_tooltip_body_HTML += '<div id="MGIT_links"></div>';
		
	MGIT_tooltip_body_HTML += '<div id="MGIT_details"></div>';
	
	if (GM_config.read()['links_position'] == 'bottom')
		MGIT_tooltip_body_HTML += '<div id="MGIT_links"></div>';
	
	MGIT_tooltip_body_HTML += '</div>'; // MGIT_Info
	MGIT_tooltip_body_HTML += '<div id="MGIT_config"></div>';
	MGIT_tooltip_body_HTML += '</td>';
	
	if (GM_config.read()['links_position'] == 'right')
		MGIT_tooltip_body_HTML += '<td nowrap valign="top"><div id="MGIT_links"></div></td>';

	MGIT_tooltip_body_HTML += '</tr></table>';
	MGIT_tooltip_body.innerHTML = MGIT_tooltip_body_HTML;
	
	MGIT_search = document.getElementById('MGIT_search');
	MGIT_info = document.getElementById('MGIT_info');
	MGIT_config = document.getElementById('MGIT_config');
	
	MGIT_picture = document.getElementById('MGIT_picture');
	MGIT_title = document.getElementById('MGIT_title');
	MGIT_original_title = document.getElementById('MGIT_original_title');
	MGIT_rating = document.getElementById('MGIT_rating');
	MGIT_rotten_tomatoes = document.getElementById('MGIT_rotten_tomatoes');
	MGIT_details = document.getElementById('MGIT_details');
	MGIT_links = document.getElementById('MGIT_links');


	// init Search
	MGIT_search_HTML = '<form action="javascript:void(0)" id="MGIT_search_form">';
	MGIT_search_HTML += '<input size="' + GM_config.read()['tooltip_max_width'] +'" id="MGIT_search_text" type="text" />';
	MGIT_search_HTML += '<input type="submit" value="Ok">';
	MGIT_search_HTML += '<input type="submit" id="MGIT_search_imdb" value="Imdb">';
	MGIT_search_HTML += '</form></div>';
	MGIT_search_HTML += '<div id="MGIT_search_links">';
	MGIT_search.innerHTML = MGIT_search_HTML;
	
	MGIT_search_form = document.getElementById('MGIT_search_form');
	MGIT_search_text = document.getElementById('MGIT_search_text');
	MGIT_search_imdb = document.getElementById('MGIT_search_imdb');
	MGIT_search_links = document.getElementById('MGIT_search_links');
		
		
	// init Config
	MGIT_config_HTML = '<table cellspacing=0 border='+table_border+'><tr><td align="center" valign="top">';
	MGIT_config_HTML += '<span title="Show/Hide" id="show_hide_config"></span>';
	MGIT_config_HTML += '</td><td>';
	
	MGIT_config_HTML += '<span id="MGIT_setup"><a href="javascript:void(0)">'+GM_trans.lang('setup')+'</a></span>&nbsp;|&nbsp;';
	MGIT_config_HTML += '<span id="MGIT_update"><a href="javascript:void(0)">'+GM_trans.lang('update_check')+'</a></span>&nbsp;|&nbsp;';
	MGIT_config_HTML += '<span id="show_search"><a href="javascript:void(0)">'+GM_trans.lang('search')+'</a></span>&nbsp;|&nbsp;';
	MGIT_config_HTML += '<span id="show_arrows"><a href="javascript:void(0)">'+GM_trans.lang('arrows')+'</a></span>&nbsp;|&nbsp;';
	MGIT_config_HTML += '<span id="show_picture"><a href="javascript:void(0)">'+GM_trans.lang('display_picture')+'</a></span>';
	
	MGIT_config_HTML += '</td></tr><tr><td></td><td>';
	MGIT_config_HTML += '<div id="MGIT_config_sub">';
	MGIT_config_HTML += '<table cellspacing=1 border='+table_border+'><tr><td valign="top">';
	MGIT_config_HTML += '<span title="Show/Hide" id="show_hide_config_1"></span>';
	MGIT_config_HTML += '</td><td>';
	MGIT_config_HTML += '<div id="MGIT_config_1"></div>';
	MGIT_config_HTML += '<div id="MGIT_config_sub_1"></div>';
	MGIT_config_HTML += '</td></tr><tr><td valign="top">';
	MGIT_config_HTML += '<span title="Show/Hide" id="show_hide_config_2"></span>';
	MGIT_config_HTML += '</td><td>';
	MGIT_config_HTML += '<div id="MGIT_config_2"></div>';
	MGIT_config_HTML += '<div id="MGIT_config_sub_2"></div>';
	MGIT_config_HTML += '</td></tr></table></div></table>';
	MGIT_config.innerHTML = MGIT_config_HTML;
	
	show_hide_config = document.getElementById('show_hide_config');
	MGIT_setup = document.getElementById('MGIT_setup');
	MGIT_update = document.getElementById('MGIT_update');
	show_search = document.getElementById('show_search');
	show_arrows = document.getElementById('show_arrows');
	show_picture = document.getElementById('show_picture');
	
	MGIT_config_sub = document.getElementById('MGIT_config_sub');
	show_hide_config_1 = document.getElementById('show_hide_config_1');
	MGIT_config_1 = document.getElementById('MGIT_config_1');
	MGIT_config_sub_1 = document.getElementById('MGIT_config_sub_1');
	show_hide_config_2 = document.getElementById('show_hide_config_2');
	MGIT_config_2 = document.getElementById('MGIT_config_2');
	MGIT_config_sub_2 = document.getElementById('MGIT_config_sub_2');
	
	// init config_1
	MGIT_config_1.innerHTML = '<span id="MGIT_save_position"></span>';
	
	MGIT_config_sub_1_HTML = '&nbsp;-&nbsp;'+GM_trans.lang('vertical')+' : ';
	MGIT_config_sub_1_HTML += '<span id="MGIT_vpos_top"></span>';
	MGIT_config_sub_1_HTML += ' | ';
	MGIT_config_sub_1_HTML += '<span id="MGIT_vpos_bottom"></span>';
	MGIT_config_sub_1_HTML += ' | ';
	MGIT_config_sub_1_HTML += '<span id="MGIT_vpos_auto"></span>';
	MGIT_config_sub_1_HTML += '<br>';
	MGIT_config_sub_1_HTML += '&nbsp;-&nbsp;'+GM_trans.lang('horizontal')+' : ';
	MGIT_config_sub_1_HTML += '<span id="MGIT_hpos_left"></span>';
	MGIT_config_sub_1_HTML += ' | ';
	MGIT_config_sub_1_HTML += '<span id="MGIT_hpos_right"></span>';
	MGIT_config_sub_1_HTML += ' | ';
	MGIT_config_sub_1_HTML += '<span id="MGIT_hpos_auto"></span>';
	MGIT_config_sub_1.innerHTML = MGIT_config_sub_1_HTML;
			
	MGIT_vpos_top = document.getElementById('MGIT_vpos_top');
	MGIT_vpos_bottom = document.getElementById('MGIT_vpos_bottom');
	MGIT_vpos_auto = document.getElementById('MGIT_vpos_auto');
	MGIT_hpos_left = document.getElementById('MGIT_hpos_left');
	MGIT_hpos_right = document.getElementById('MGIT_hpos_right');
	MGIT_hpos_auto = document.getElementById('MGIT_hpos_auto');
	MGIT_save_position = document.getElementById('MGIT_save_position');
	
	MGIT_config_2_HTML = '';
	if (!GM_config.read()['last_update'])
		MGIT_config_2_HTML += '<span id="MGIT_refresh"><a href="javascript:void(0)">' + GM_trans.lang('refresh') + '</a></span>&nbsp;|&nbsp;';
	
	if (GM_config.read()['use_cache'])
		MGIT_config_2_HTML += '<span id="MGIT_cache_info"></span>';
		
	MGIT_config_2.innerHTML = MGIT_config_2_HTML;
	
	if (!GM_config.read()['last_update'])
		MGIT_refresh = document.getElementById('MGIT_refresh');
	
	MGIT_cache_info = document.getElementById('MGIT_cache_info');
	
	// Minimized Tooltip
	MGIT_minimized_tooltip_HTML = '<center>';
	MGIT_minimized_tooltip_HTML += '<div id="MGIT_minimized_title"></div>';
	MGIT_minimized_tooltip_HTML += '<div id="MGIT_minimized_picture"></div>';
	MGIT_minimized_tooltip_HTML += '<div id="MGIT_minimized_rating"></div>';
	MGIT_minimized_tooltip_HTML += '<div id="MGIT_minimized_links"></div>';
	MGIT_minimized_tooltip_HTML += '</center>';
	MGIT_minimized_tooltip.innerHTML = MGIT_minimized_tooltip_HTML;

	MGIT_minimized_title = document.getElementById('MGIT_minimized_title');
	MGIT_minimized_picture = document.getElementById('MGIT_minimized_picture');
	MGIT_minimized_rating = document.getElementById('MGIT_minimized_rating');
	MGIT_minimized_links = document.getElementById('MGIT_minimized_links');
	
	if (!GM_config.read()['minimized_picture'])
		MGIT_minimized_picture.style.display = 'none';
			
	if (!GM_config.read()['minimized_rating'])
		MGIT_minimized_rating.style.display = 'none';
		
	if (!GM_config.read()['minimized_links'])
		MGIT_minimized_links.style.display = 'none';
		
	init_tooltip = true;
	addTooltipEvents();
}

function addTooltipEvents() {
	
	// Prevent event when clicking on tooltips
	MGIT_tooltip.addEventListener('click', doNothing, false);
	MGIT_tooltip.addEventListener('mousedown', doNothing, false);
	MGIT_tooltip.addEventListener('mouseup', doNothing, false);
	
	MGIT_minimized_tooltip.addEventListener('click', doNothing, false);
	MGIT_minimized_tooltip.addEventListener('mousedown', doNothing, false);
	MGIT_minimized_tooltip.addEventListener('mouseup', doNothing, false);
	
	MGIT_search_text.addEventListener('copy', doNothing, false);
	
	MGIT_search_form.addEventListener('submit', searchText, false);
	MGIT_search_imdb.addEventListener('click', function(e) { getImdbInfoByTitle(MGIT_search_text.value, {}, 'search');	showInfo(); }, false);
	
	MGIT_tooltip_title.addEventListener('click', minimizeTooltip, false);
	MGIT_tooltip_title.style.cursor = 'pointer';
	
	MGIT_title.addEventListener('click', minimizeTooltip, false);
	MGIT_title.style.cursor = 'pointer';
	
	MGIT_minimized_title.addEventListener('click', minimizeTooltip, false);
	MGIT_minimized_title.style.cursor = 'pointer';
	
	MGIT_arrow_up.addEventListener('click', function(e) { website_config.v_pos = 'top'; v_pos = 'top'; refreshTooltip(); }, false);
	MGIT_arrow_up.style.cursor = 'pointer';
	
	MGIT_arrow_down.addEventListener('click', function(e) { website_config.v_pos = 'bottom'; v_pos = 'bottom'; refreshTooltip(); }, false);
	MGIT_arrow_down.style.cursor = 'pointer';
	
	MGIT_arrow_left.addEventListener('click', function(e) { website_config.h_pos = 'left'; h_pos = 'left'; refreshTooltip(); }, false);
	MGIT_arrow_left.style.cursor = 'pointer';
	
	MGIT_arrow_right.addEventListener('click', function(e) { website_config.h_pos = 'right'; h_pos = 'right'; refreshTooltip(); }, false);
	MGIT_arrow_right.style.cursor = 'pointer';

	show_hide_config.addEventListener('click', toggleConfig, false);
	show_hide_config.style.cursor = 'pointer';
	
	show_hide_config_1.addEventListener('click', toggleConfig_1, false);
	show_hide_config_1.style.cursor = 'pointer';
	
	show_hide_config_2.addEventListener('click', toggleConfig_2, false);
	show_hide_config_2.style.cursor = 'pointer';
	
	MGIT_setup.addEventListener('click', GM_config.open, false );
	MGIT_setup.title = 'Configuration';
	MGIT_setup.style.cursor = 'pointer';
	
	MGIT_update.innerHTML = '<a href="javascript:void(0)">' + GM_trans.lang('update_check') + '</a>';
	MGIT_update.addEventListener('click', function(e) { updateCheck(true); }, false );
	MGIT_update.title = GM_trans.lang('last_check') + ' : ' + formatDate(GM_getValue('GMSUC_last_check', now()));
	
	show_search.addEventListener('click', toggleSearch, false);
	show_search.title = GM_trans.lang('show_hide_search');
	show_search.style.cursor = 'pointer';
	
	show_arrows.addEventListener('click', function(e) { show.arrows = !show.arrows; setArrowPosition(); }, false);
	show_arrows.title = GM_trans.lang('show_hide_arrows');
	show_arrows.style.cursor = 'pointer';
	
	show_picture.addEventListener('click', togglePicture, false);
	show_picture.title = GM_trans.lang('show_hide_picture');
	show_picture.style.cursor = 'pointer';
	
	MGIT_vpos_top.addEventListener('click', function(e) { website_config.v_pos = 'top'; v_pos = 'top'; refreshTooltip(); }, false);
	MGIT_vpos_top.style.cursor = 'pointer';
	
	MGIT_vpos_bottom.addEventListener('click', function(e) { website_config.v_pos = 'bottom'; v_pos = 'bottom';  refreshTooltip(); }, false);
	MGIT_vpos_bottom.style.cursor = 'pointer';

	MGIT_vpos_auto.addEventListener('click', function(e) { website_config.v_pos = 'auto'; refreshTooltip(); }, false);
	MGIT_vpos_auto.style.cursor = 'pointer';

	MGIT_hpos_left.addEventListener('click', function(e) { website_config.h_pos = 'left'; h_pos = 'left';  refreshTooltip(); }, false);
	MGIT_hpos_left.style.cursor = 'pointer';

	MGIT_hpos_right.addEventListener('click', function(e) { website_config.h_pos = 'right'; h_pos = 'right';  refreshTooltip(); }, false);
	MGIT_hpos_right.style.cursor = 'pointer';

	MGIT_hpos_auto.addEventListener('click', function(e) { website_config.h_pos = 'auto'; refreshTooltip(); }, false);
	MGIT_hpos_auto.style.cursor = 'pointer';
	
	MGIT_save_position.addEventListener('click', function(e){ saveTooltipPosition(!positionSaved); }, false );
	MGIT_save_position.style.cursor = 'pointer';
	
	if (!GM_config.read()['last_update'])
		MGIT_refresh.addEventListener('click', function(e){ getInfo(data.url, 'refresh'); }, false );
}

function refreshTooltip() {
		
	if (!init_tooltip)
		initTooltip();
	
	setTooltipPosition();
	
	if (show.tooltip)
	{
		if (show.minimized)
		{
			MGIT_tooltip.style.visibility = 'hidden';
			MGIT_minimized_tooltip.style.visibility = 'visible';
		}
		else
		{
			MGIT_tooltip.style.visibility = 'visible';
			MGIT_minimized_tooltip.style.visibility = 'hidden';
		}
		
		if (GM_config.read()['disable_tooltip_title'])
			MGIT_tooltip_title.style.display = 'none';
		else
			MGIT_tooltip_title.style.display = '';
		
		// Hide / Show Search
		if (show.search)
			MGIT_search.style.display = '';
		else
			MGIT_search.style.display = 'none';
				
		if (show.info)
		{
			MGIT_info.style.display = '';
			MGIT_links.style.display = '';
			MGIT_config.style.display = '';
			
			if (show.picture)
				MGIT_picture.style.display = '';
			else
				MGIT_picture.style.display = 'none';
		}
		else
		{
			MGIT_info.style.display = 'none';
			MGIT_links.style.display = 'none';
			MGIT_config.style.display = 'none';
			MGIT_picture.style.display = 'none';
		}
				
		// Hide / Show Config
		if (show.config)
		{
			show_hide_config.innerHTML = '<img src="' + hide_uri + '">';
			MGIT_config_sub.style.display = '';
		}
		else
		{
			show_hide_config.innerHTML = '<img src="' + show_uri + '">';
			MGIT_config_sub.style.display = 'none';
		}
		
		// Hide / Show Config_1
		if (show.config_1)
		{
			show_hide_config_1.innerHTML = '<img src="' + hide_uri + '">';
			MGIT_config_sub_1.style.display = '';
		}
		else
		{
			show_hide_config_1.innerHTML = '<img src="' + show_uri + '">';
			MGIT_config_sub_1.style.display = 'none';
		}
		
		// Hide / Show Config_2
		if (show.config_2)
		{
			show_hide_config_2.innerHTML = '<img src="' + hide_uri + '">';
			MGIT_config_sub_2.style.display = '';
		}
		else
		{
			show_hide_config_2.innerHTML = '<img src="' + show_uri + '">';
			MGIT_config_sub_2.style.display = 'none';
		}
	}
	else
	{
		MGIT_tooltip.style.visibility = 'hidden';
		MGIT_minimized_tooltip.style.visibility = 'hidden';
	}
	
	
	// Update available
	if (GM_getValue('GMSUC_remote_version', 0) > script_version)
	{
		MGIT_update.innerHTML = '<a target="_blank" href="'+script_url+'">' + GM_trans.lang('update') + '</a>';
		MGIT_update.title = '';
	}
	// Cache info
	if (GM_config.read()['use_cache'])
	{
		cacheSize = countSavedInfo();
		if (cacheSize != 0)
		{
			MGIT_cache_info.innerHTML = cacheSize + ' ' + GM_trans.lang('saved_data') + ' (<span id="delete_cache"><a href="javascript:void(0)">'+GM_trans.lang('delete')+'</a></span>)';
			deleteSavedInfoLink = document.getElementById('delete_cache');
			deleteSavedInfoLink.addEventListener('click', function(){ deleteSavedInfo(); }, false );
			deleteSavedInfoLink.style.cursor = 'pointer';				
		}	
		else
		{
			MGIT_cache_info.innerHTML = GM_trans.lang('cache_empty');
		}
	}
		
	// tooltip position
	if (website_config.v_pos == 'top')
		MGIT_vpos_top.innerHTML = '<b>'+GM_trans.lang('top')+'</b>';
	else
		MGIT_vpos_top.innerHTML = '<span id="v_pos_top"><a href="javascript:void(0)">'+GM_trans.lang('top')+'</a></span>';
	
	if (website_config.v_pos == 'bottom')
		MGIT_vpos_bottom.innerHTML = '<b>'+GM_trans.lang('bottom')+'</b>';
	else
		MGIT_vpos_bottom.innerHTML = '<span id="v_pos_bottom"><a href="javascript:void(0)">'+GM_trans.lang('bottom')+'</a></span>';
		
	if (website_config.v_pos == 'auto')
		MGIT_vpos_auto.innerHTML = '<b>'+GM_trans.lang('auto')+'</b>';
	else
		MGIT_vpos_auto.innerHTML = '<span id="v_pos_auto"><a href="javascript:void(0)">'+GM_trans.lang('auto')+'</a></span>';
		
	if (website_config.h_pos == 'left')
		MGIT_hpos_left.innerHTML = '<b>'+GM_trans.lang('left')+'</b>';
	else
		MGIT_hpos_left.innerHTML = '<span id="h_pos_left"><a href="javascript:void(0)">'+GM_trans.lang('left')+'</a></span>';
		
	if (website_config.h_pos == 'right')
		MGIT_hpos_right.innerHTML = '<b>'+GM_trans.lang('right')+'</b>';
	else
		MGIT_hpos_right.innerHTML = '<span id="h_pos_right"><a href="javascript:void(0)">'+GM_trans.lang('right')+'</a></span>';
		
	if (website_config.h_pos == 'auto')
		MGIT_hpos_auto.innerHTML = '<b>'+GM_trans.lang('auto')+'</b>';
	else
		MGIT_hpos_auto.innerHTML = '<span id="h_pos_auto"><a href="javascript:void(0)">'+GM_trans.lang('auto')+'</a></span>';
		
	// website position save status
	if (positionSaved)
		MGIT_save_position.innerHTML = GM_trans.lang('position_saved')+' (<span><a href="javascript:void(0)">'+GM_trans.lang('reset')+'</a></span>)';
	else
		MGIT_save_position.innerHTML = '<span><a href="javascript:void(0)">'+GM_trans.lang('save_position')+'</a></span> ('+document.location.host+')';
}

/**** Events ****/
function keyPressed(e) {
	if (GM_config.read()['pressed_key'] == 'Alt')
		var keyPressed = e.altKey;
	if (GM_config.read()['pressed_key'] == 'Ctrl')
		var keyPressed = e.ctrlKey;
	if (GM_config.read()['pressed_key'] == 'Shift')
		var keyPressed = e.shiftKey;
	
	return keyPressed;
}

function doNothing(e) {
	e.stopPropagation();
}

function getSelectedLink(e) {
	if (e.button == 0 && keyPressed(e))
	{
		e.stopPropagation();
		e.preventDefault();
		
		if (debug) GM_log('getSelectedLink ' + keyPressed(e) + ' ' + e.target.tagName);
		
		if (!init_tooltip)
			initTooltip();
			
		MGIT_search_text.value = ltrim(rtrim(e.target.innerHTML));
		show.tooltip = true;
		show.search = true;
		show.info = false;
		refreshTooltip();
		searchText();
	}
}

function searchCopiedText() {

	if (!init_tooltip)
		initTooltip();
			
	MGIT_search_text.value = ltrim(rtrim(document.getSelection().toString()));
	
	show.tooltip = true;
	show.search = true;
	refreshTooltip();
	searchText();
}

function getSelectedText(e) {
	if (e.button != 0) // right click
		return false;
	
	if (document.getSelection().toString() != '')
		searchCopiedText(document.getSelection().toString());
}

function searchText() {

	if (ltrim(rtrim(MGIT_search_text.value)) == '')
		return;

	title = (MGIT_search_text.value).replace(/\+/g, '%2B').replace(/&/g, '%26').replace(/#/g, '%23');
	titleReq = title.replace(/ /g, '+');
	
	allocineUrl = 'http://www.allocine.fr/recherche/?q=' + titleReq;
	imdbUrl = 'http://www.imdb.com/find?s=all&q=' + titleReq;
	rottenTomatoesURL = 'http://www.rottentomatoes.com/search/full_search.php?search=' + titleReq;
	metacriticUrl = 'http://www.metacritic.com/search/movie/' + titleReq + '/results';
	
	nzbplanetUrl = 'http://nzbplanet.net/search/' + titleReq;
	binsearchUrl = 'http://binsearch.info/?q=' + titleReq + '&max=100&adv_age=1100&server=';
	nzbclubUrl = 'http://www.nzbclub.com/search.aspx?q=' + titleReq;
	piratebayUrl = 'http://thepiratebay.org/search/' + title + '/0/99/0';
	
	jeuxvideoUrl = 'http://www.jeuxvideo.com/recherche/jeux/' + title + '.htm';
	gamespotUrl = 'http://www.gamespot.com/search.html?qs=' + titleReq;
	
	jeuxActuUrl = 'http://www.jeuxactu.com/recherche/?q=' + titleReq;
	
	youtubeUrl = 'http://www.youtube.com/results?search_query=trailer+' + titleReq;
	
	subsceneUrl = 'http://subscene.com/s.aspx?q=' + titleReq;
	
	if (GM_config.read()['language'] == 'en')
		opensubtitlesUrl = 'http://www.opensubtitles.org/en/search2/sublanguageid-eng/moviename-' + titleReq;
	else
		opensubtitlesUrl = 'http://www.opensubtitles.org/fr/search2/sublanguageid-fre/moviename-' + titleReq;
	
	googleUrl = 'http://www.google.com/#q=' + titleReq;
	
	right_separator = '&nbsp;';
	
	var linksHTML = '';
	
	if (GM_config.read()['display_youtube_link']) {
		linksHTML += '<span><a target="_blank" title="Youtube" alt="Youtube" href="' + youtubeUrl + '"><img src="http://www.youtube.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_imdb_link']) {
		linksHTML += '<span><a target="_blank" title="IMDB" alt="IMDB" href="' + imdbUrl + '"><img src="http://imdb.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_allocine_link']) {
		linksHTML += '<span><a target="_blank" title="Allocine" alt="Allocine" href="' + allocineUrl + '"><img src="http://www.allocine.fr/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_rotten_link']) {
		linksHTML += '<span><a target="_blank" title="Rotten Tomatoes" alt="Rotten Tomatoes" href="' + rottenTomatoesURL + '"><img src="' + fresh_icon_uri +'"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_metacritic_link']) {
		linksHTML += '<span><a target="_blank" title="Metacritic" alt="Metacritic" href="' + metacriticUrl + '"><img src="http://www.metacritic.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_jeuxvideo_link']) {
		linksHTML += '<span><a target="_blank" title="jeuxvideo.com" alt="jeuxvideo.com" href="' + jeuxvideoUrl + '"><img src="http://www.jeuxvideo.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_gamespot_link']) {
		linksHTML += '<span><a target="_blank" title="Gamespot" alt="Gamespot" href="' + gamespotUrl + '"><img src="http://www.gamespot.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_nzbplanet_link']) {
		linksHTML += '<span><a target="_blank" title="NZBPlanet" alt="NZBPlanet" href="' + nzbplanetUrl + '"><img src="http://nzbplanet.net/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_binsearch_link']) {
		linksHTML += '<span><a target="_blank" title="Binsearch" alt="Binsearch" href="' + binsearchUrl + '"><img src="http://binsearch.info/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_nzbclub_link']) {
		linksHTML += '<span><a target="_blank" title="NZBClub" alt="NZBClub" href="' + nzbclubUrl + '"><img src="http://nzbclub.com/images/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_piratebay_link']) {
		linksHTML += '<span><a target="_blank" title="PirateBay" alt="PirateBay" href="' + piratebayUrl + '"><img src="http://thepiratebay.org/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_subscene_link']) {
		linksHTML += '<span><a target="_blank" title="Subscene" alt="Subscene" href="' + subsceneUrl + '"><img src="http://subscene.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_opensubtitles_link']) {
		linksHTML += '<span><a target="_blank" title="OpenSubtitles" alt="OpenSubtitles" href="' + opensubtitlesUrl + '"><img src="http://www.opensubtitles.org/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	if (GM_config.read()['display_google_link']) {
		linksHTML += '<span><a target="_blank" title="Google" alt="Google" href="' + googleUrl + '"><img src="http://www.google.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
	}
	
	MGIT_search_links.innerHTML = linksHTML;
}

function hideTooltip(e) {
	show.tooltip = false;
	refreshTooltip();
}

function showTooltip(e) {
	show.tooltip = true;
	refreshTooltip();
}

function minimizeTooltip(e) {
	show.minimized = !show.minimized
	serialize('MGIT_show', show);
	refreshTooltip();
}

function hideInfo() {
	show.tooltip = true;
	show.info = false;
	refreshTooltip();
}

function showInfo() {
	show.info = true;
	show.search = false;
	refreshTooltip();
}

function toggleInfo() {
	show.info = !show.info;
	refreshTooltip();
}

function toggleSearch() {
	show.search = !show.search;
	refreshTooltip();
}

function togglePicture() {
	show.picture = !show.picture;
	serialize('MGIT_show', show);
	refreshTooltip();
}

function toggleConfig() {
	show.config = !show.config;
	serialize('MGIT_show', show);
	refreshTooltip();
}

function toggleConfig_1() {
	show.config_1 = !show.config_1;
	serialize('MGIT_show', show);
	refreshTooltip();
}

function toggleConfig_2() {
	show.config_2 = !show.config_2;
	serialize('MGIT_show', show);
	refreshTooltip();
}

function togglePlot() {
	show.plot = !show.plot;
	
	if (show.plot)
		MGIT_movie_plot.style.display = '';
	else
		MGIT_movie_plot.style.display = 'none';
	
	serialize('MGIT_show', show);
}

function getLink(elem) {
	if (typeof elem != 'undefined' && elem != null)
	{
		if (elem.href)
			return elem.href;
		else if (elem.getElementsByTagName('a').length > 0)
			return elem.getElementsByTagName('a')[0].href;
		else
		{
			for (i=0; i < 5; i++)
			{
				if (elem.tagName == 'A')
					break;
				else
					elem = elem.parentNode;
			}
			
			if (elem.href)
				return url = elem.href;
			else
				return url = '';
		}
	}
}

function linkOver(e) {
	if (!GM_config.read()['preload_info'] && !GM_config.read()['use_cache'])
		deleteSavedInfo();
		
	url = getLink(e.target)
	
	if (url == '')
		return;
		
	if (GM_config.read()['how_to_show'] == 'click') {
		e.preventDefault();
		if (keyPressed(e)) {
			//window.content.location.replace(url);
			//GM_openInTab(url);
			window.open(url);
			return false;
		}	
	}

	data = checkLink(url);
	show.tooltip = true;
	
	if (show.id != data.save_id)
	{
		clearInfo();
		getMousePosition(e);
		getInfo(data.url, 'show');
	}
	else
	{
		showInfo();
	}
	
}

/***** Tooltip position *****/
function setTooltipPosition() {
	
	if (v_pos == 'top')
	{
		MGIT_tooltip.style.bottom = '';
		MGIT_tooltip.style.top = '5px';
		MGIT_minimized_tooltip.style.bottom = '';
		MGIT_minimized_tooltip.style.top = '5px';
	}
	else
	{
		MGIT_tooltip.style.top = '';
		MGIT_tooltip.style.bottom = '5px';
		MGIT_minimized_tooltip.style.top = '';
		MGIT_minimized_tooltip.style.bottom = '5px';
		
		// Preloading tooltip position
		if (typeof MGIT_load_tooltip != 'undefined')
		{
			if (h_pos == 'left')
			{			
				MGIT_load_tooltip.style.left = '';
				MGIT_load_tooltip.style.right = '5px';
			}
			else
			{	
				MGIT_load_tooltip.style.right = '';
				MGIT_load_tooltip.style.left = '5px';
			}
		}
	}
	
	if (h_pos == 'left')
	{
		MGIT_tooltip.style.right = '';
		MGIT_tooltip.style.left = '5px';
		MGIT_minimized_tooltip.style.right = '';
		MGIT_minimized_tooltip.style.left = '5px';
	}
	else
	{
		MGIT_tooltip.style.left = '';
		MGIT_tooltip.style.right = '5px';
		MGIT_minimized_tooltip.style.left = '';
		MGIT_minimized_tooltip.style.right = '5px';
	}
	
	setArrowPosition();
}

function setArrowPosition() {
	
	MGIT_arrow_up.style.display = 'none';
	MGIT_arrow_down.style.display = 'none';
	MGIT_arrow_left.style.display = 'none';
	MGIT_arrow_right.style.display = 'none';

	if (show.arrows)
	{
		if (v_pos == 'top')
			MGIT_arrow_down.style.display = '';
		else
			MGIT_arrow_up.style.display = '';
		
		if (h_pos == 'left')
			MGIT_arrow_right.style.display = '';
		else
			MGIT_arrow_left.style.display = '';
	}
}

function getMousePosition(e) {

	arrayPageSize = getPageSize();
	
	if (website_config.v_pos == 'auto') {
		if (e.clientY < (arrayPageSize[3] / 2))
			v_pos = 'bottom';
		else
			v_pos = 'top';
	}
	else
		v_pos = website_config.v_pos;
	
	if (website_config.h_pos == 'auto') {
		if (e.clientX > arrayPageSize[0] / 2)
			h_pos = 'left';
		else
			h_pos = 'right';
	}
	else
		h_pos = website_config.h_pos;
}

function saveTooltipPosition(save) {
	if (save)
	{
		serialize('MGIT_' + document.location.host, website_config);
		positionSaved = true;
		GM_log('Position saved for ' + document.location.host + ' : ' + website_config.v_pos + '-' + website_config.h_pos);
	}
	else
	{
		GM_deleteValue('MGIT_' + document.location.host);
		positionSaved = false;
		GM_log('Position deleted for ' + document.location.host);
	}
	refreshTooltip();
}

/***** Get Info *****/
function getInfo(url, options) {
	data = checkLink(url);
	if (debug) GM_log('getInfo ' + options + ' save_id : ' + data.save_id + ' source : ' + data.source + ' url : ' + data.url);
		
	if (options == 'show' || options == 'refresh')
	{
		showInfo();
	}
	
	if (data.source == 'imdb')
	{
		getImdbInfoById(data, options);
	}
	else if (data.source == 'allocine')
	{
		getAllocineInfoById(data, options);
	}
	else if (data.source == 'jeuxvideo')
	{
		getJeuxVideoInfo(data, options);
	}
	else if (data.source == 'cinema.jeuxactu')
	{
		getJeuxActuInfo(data, options);
	}
	else if (data.source == 'gamespot')
	{
		getGamespotInfo(data, options);
	}
}

// Based on http://userscripts.org/scripts/show/95746
// Get info from IMDB Api by id
function getImdbInfoById(data, options) {
	if (debug) GM_log('getImdbInfoById ' + options + ' save_id : ' + data.save_id + ' source : ' + data.source + ' url : ' + data.url);
	
	if (GM_getValue(data.save_id) && options != 'refresh') // Get Saved Imdb Info
	{
		if (options == 'preload')
		{
			getImdbRating(data, options);
			getRottenTomatoesInfo(data, options);
			preload();
		}
		if (options == 'show')
		{
			data = deserialize(data.save_id);
			show.id = data.save_id;
			displayInfo(data);
			displayLinks(data);
			displayPicture(data);
			getImdbRating(data, options);
			getRottenTomatoesInfo(data, options);
		}
	}
	else // Fetch info from Imdb Api
	{
		requestUrl = 'http://www.imdbapi.com/?i=' + data.id + '&tomatoes=true';
		
		if (!pingImdbApi || GM_config.read()['dont_use_imdb_api'])
			getImdbInfoFromWebsite(data.id, requestUrl, options);
		else
		{
			try
			{
				GM_xmlhttpRequest({
					method: 'GET',
					url: requestUrl,
					onerror: function(response)
					{
						GM_log('getImdbInfoById - GM_xmlhttpRequest error. save_id : ' + data.save_id + ' options : ' + options + ' requestUrl : ' + requestUrl);
						if (options == 'preload')
						{
							load.error++;
							preload();
						}
						else
						{
							GM_log('Trying to get info from IMDB website');
							getImdbInfoFromWebsite(data.id, requestUrl, options);
						}
					},
					onload: function(response)
					{
						var res = eval('(' + response.responseText + ')');

						if (res.Response=='True')
						{
							var picture = '';
							if (res.Poster == 'N/A')
								picture = 'http://www.iphonity.fr/iphonity/images/stories/img/img_applications/IMDB/IMDB_1.png';
							else
								picture = res.Poster;
							
							if (data.url)
								url = changeImdbLink(data.url);
							else
								url = getImdbUrl(data.id);
							
							data.imdbId = res.ID;
							data.title = res.Title;
							data.original_title = data.title;
							data.year = res.Year;
							data.genre = res.Genre;
							data.runtime = res.Runtime;
							data.director = res.Director;
							data.writer = res.Writer;
							data.actors = res.Actors;
							data.plot = res.Plot;
							data.picture = picture;
							data.url = url;
							data.requestUrl = requestUrl;
							data.source = 'imdb';
							data.dataSource = 'IMDB Api';
							data.update = now();
							data.rating = res.Rating;
							data.votes = res.Votes;
							data.tomatoMeter = res.tomatoMeter;
							data.tomatoImage = res.tomatoImage;
							data.tomatoRating = res.tomatoRating;
							data.tomatoReviews = res.tomatoReviews;
							data.tomatoFresh = res.tomatoFresh;
							data.tomatoRotten = res.tomatoRotten;
							data.tomatoUrl = 'http://www.rottentomatoes.com/alias?type=imdbid&s=' + (data.imdbId).match(/tt([0-9]+)/)[1];
							
							// Save
							if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
							{
								data.save_id = data.source + '_' + data.id;
								serialize(data.save_id, data);
							}
							
							if (options == 'preload')
							{
								getImdbRating(data, options);
								getRottenTomatoesInfo(data, options);
								preload();
							}
							else
							{
								show.id = data.save_id;
								
								// Display movie info
								displayInfo(data);
								displayLinks(data);
								displayPicture(data);
								getImdbRating(data, options);
								getRottenTomatoesInfo(data, options);
							}
						}
						else // Get info from Imdb Website
						{
							GM_log('Couldn\'t find info from IMDB Api : ' + requestUrl);
							if (options == 'preload')
							{
								load.error++;
								preload();
							}
							else
							{
								GM_log('Trying to get info from IMDB website');
								getImdbInfoFromWebsite(data.id, requestUrl, options);
							}
						}
					}
				});
			}
			catch (err)
			{
				GM_log('getImdbInfoById error : ' + err + ' save_id : ' + data.save_id + ' options : ' + options + ' requestUrl : ' + requestUrl);
				if (options == 'preload')
				{
					load.error++;
					preload();
				}
				else
				{
					GM_log('Trying to get info from IMDB website');
					getImdbInfoFromWebsite(data.id, requestUrl, options);
				}
			}
		}
	}
}

// Gets IMDB info from IMDB Api (with Allocine Id)
function getImdbInfoByTitle(title, data, options) {
	requestUrl = 'http://www.imdbapi.com/?t=' + title + '&tomatoes=true';
	
	if (pingImdbApi)
	{
		try
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: requestUrl,
				onerror: function(response)
				{
					GM_log('getImdbInfoByTitle GM_xmlhttpRequest error. title : ' + title + ' requestUrl : ' + requestUrl + ' options : ' + options);
				},
				onload: function(response) {
				
					if (debug) GM_log('getImdbInfoByTitle title : ' + title + ' requestUrl : ' + requestUrl + ' options : ' + options);
					
					var res = eval('(' + response.responseText + ')');

					if (res.Response=='True')
					{
						url = getImdbUrl(res.ID);
						
						if (options != 'search')
						{
							if (data.director == 'N/A')
								data.director = res.Director;
						
							if (data.year == 'N/A')
								data.year = res.Year;
							
							if (data.genre == 'N/A')
								data.genre = res.Genre;
							
							if (data.runtime == 'N/A')
								data.runtime = res.Runtime;
							
							if (data.writer == 'N/A')
								data.writer = res.Writer;
							
							if (data.actors == 'N/A')
								data.actors = res.Actors;
							
							if (data.plot == 'N/A')
								data.plot = res.Plot;
								
							data.imdbId = res.ID;
							data.imdbUrl = url;
							data.writer = res.Writer;
							data.rating = res.Rating;
							data.votes = res.Votes;
							data.update = now();
							data.tomatoMeter = res.tomatoMeter;
							data.tomatoImage = res.tomatoImage;
							data.tomatoRating = res.tomatoRating;
							data.tomatoReviews = res.tomatoReviews;
							data.tomatoFresh = res.tomatoFresh;
							data.tomatoRotten = res.tomatoRotten;
							
							// Save
							if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
								serialize(data.save_id, data);
						}
						
						imdbData = {};
						imdbData.id = res.ID;
						imdbData.imdbId = res.ID;
						imdbData.title = res.Title;
						
						if (data.title)
							imdbData.original_title = data.title;
						else
							imdbData.original_title = imdbData.title;
							
						imdbData.year = res.Year;
						imdbData.genre = res.Genre;
						imdbData.runtime = res.Runtime;
						imdbData.director = res.Director;
						imdbData.writer = res.Writer;
						imdbData.actors = res.Actors;
						imdbData.plot = res.Plot;
						imdbData.picture = res.Poster;
						imdbData.url = url;
						imdbData.source = 'imdb';
						data.dataSource = 'IMDB Api';
						imdbData.update = now();
						imdbData.rating = res.Rating;
						imdbData.votes = res.Votes;
						imdbData.tomatoMeter = res.tomatoMeter;
						imdbData.tomatoImage = res.tomatoImage;
						imdbData.tomatoRating = res.tomatoRating;
						imdbData.tomatoReviews = res.tomatoReviews;
						imdbData.tomatoFresh = res.tomatoFresh;
						imdbData.tomatoRotten = res.tomatoRotten;
						imdbData.tomatoUrl = 'http://www.rottentomatoes.com/alias?type=imdbid&s=' + (imdbData.imdbId).match(/tt([0-9]+)/)[1];
						imdbData.save_id = imdbData.source + '_' + imdbData.id;
						
						if (imdbData.picture == 'N/A')
							imdbData.picture = 'http://www.iphonity.fr/iphonity/images/stories/img/img_applications/IMDB/IMDB_1.png';
							
						// Save
						if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
							serialize(imdbData.save_id, imdbData);
						
						if (options == 'preload')
						{
							getImdbRating(data, options);
							getRottenTomatoesInfo(data, options);
							preload();
						}
						else if (options == 'search')
						{
							data = imdbData;
							displayInfo(data);
							displayLinks(data);
							displayPicture(data);
							getImdbRating(data, options);
							getRottenTomatoesInfo(data, options);
						}
						else
						{
							displayInfo(data);
							getImdbRating(data, options);
							getRottenTomatoesInfo(data, options);
						}
					}
				}
			});
		}
		catch (err)
		{
			GM_log('getImdbInfoByTitle error : ' + err + ' title : ' + title + ' requestUrl : ' + requestUrl + ' options : ' + options);
		}
	}
}

function getImdbRating(data, options) {
	if (GM_config.read()['enable_loading'] && options != 'preload')
		MGIT_rating.innerHTML = '<img src="' + loading_uri + '"> '+GM_trans.lang('loading');
		
	if (data.original_title)
		title = data.original_title;
	else if (data.title)
		title = data.title;
	else
		return;
	
	if (debug) GM_log('getImdbRating title : ' + data.title + ' data.rating : ' + data.rating + ' data.url ' + data.url);
	
	if (GM_config.read()['display_rating_stars'] || GM_config.read()['display_rating_text'])
	{
		if (data.realRating && options != 'preload')
			displayImdbRating(data);
		else if (GM_config.read()['real_imdb_rating'] && data.imdbId)
			getImdbRatingFromWebsite(data, options);
		else if (GM_config.read()['real_imdb_rating']  && pingImdbApi)
			getImdbInfoByTitle(title, data, options);
		else if (data.rating && options != 'preload')
			displayImdbRating(data);
		else if (!data.rating && pingImdbApi)
			getImdbInfoByTitle(title, data, options);
		else
			return;
	}
}

// Gets IMDB info from IMDB website (used when infos where not found via ImdbApi)
function getImdbInfoFromWebsite(id, imdbApiRequest, options) {
	
	if (GM_config.read()['enable_loading'] && options != 'preload')
		MGIT_rating.innerHTML = '<img src="' + loading_uri + '"> '+GM_trans.lang('loading');
	
	url = 'http://www.imdb.com/title/' + id;
	
	if (debug) GM_log('getImdbInfoFromWebsite id : ' + id + ' imdbApiRequest : ' + imdbApiRequest);
	
	GM_xmlhttpRequest({
		method: 'get',
		url: url,
		onerror: function (response)
		{
			GM_log('getImdbInfoFromWebsite error. id : ' + id + ' options : ' + options);
			if (options != 'preload')
				MGIT_rating.innerHTML = 'An error as occured while fetching IMDB info from IMDB website. Try to <a href="javascript:void(0)">refresh</a>';
		},
		onload: function (response)
		{
			if (debug) GM_log('getImdbInfoFromWebsite onload id : ' + id + ' imdbApiRequest : ' + imdbApiRequest + ' options : ' + options);
			
			data.id = id;
			data.imdbId = id;
			data.url = getImdbUrl(data.id);
			
			docHTML = document.createElement('div');
			docHTML.innerHTML = response.responseText;
			
			if (response.responseText.match(/<title>(.*)<\/title>/))
			{
				title_year = response.responseText.match(/<title>(.*)<\/title>/)[1].replace(/imdb - /i, '').replace(/ - imdb/i, '');
				
				if (title_year.match(/(.*)\(\d{4}\)/))
					title = title_year.match(/(.*)\(\d{4}\)/)[1];
				else
					title = title_year;
				
				if (title_year.match(/\((\d{4})\)/))
					year = title_year.match(/\((\d{4})\)/)[1];
				else
					year = 'N/A';
			}
			else
			{
				title = 'N/A';
				year = 'N/A';
			}
			
			if (typeof docHTML.getElementsByClassName('title-extra')[0] != 'undefined')
				data.original_title = docHTML.getElementsByClassName('title-extra')[0].innerHTML.replace(/\n/g, '').replace(/<i>.*<\/i>/g, '').replace(/^\s+/,"").replace(/\s+$/,"");

			if (response.responseText.match(/(\d+[\.,]\d)\/10/))
				rating = response.responseText.match(/(\d+[\.,]\d)\/10/)[1];
			else
				rating = 'N/A';
			
			if (response.responseText.match(/([0-9.,]+) votes/))
				votes = response.responseText.match(/([0-9.,]+) votes/)[1];
			else
				votes = 'N/A';

			for (i=0; i < docHTML.getElementsByClassName('txt-block').length; i++)
			{
				if (docHTML.getElementsByClassName('txt-block')[i].innerHTML.match(/Directors?:/))
					data.director = ltrim(rtrim(docHTML.getElementsByClassName('txt-block')[i].innerHTML.replace(/\n/g, '').replace(/<h4.*<\/h4>/, '').replace(/href="/g, 'target="blank" href="http://www.imdb.com')));
				
				if (docHTML.getElementsByClassName('txt-block')[i].innerHTML.match(/Writers?:/))
					data.writer = ltrim(rtrim(docHTML.getElementsByClassName('txt-block')[i].innerHTML.replace(/\n/g, '').replace(/<h4.*<\/h4>/, '').replace(/href="/g, 'target="blank" href="http://www.imdb.com')));
				
				if (docHTML.getElementsByClassName('txt-block')[i].innerHTML.match(/Stars?:/))
					data.actors = ltrim(rtrim(docHTML.getElementsByClassName('txt-block')[i].innerHTML.replace(/\n/g, '').replace(/<h4.*<\/h4>/, '').replace(/href="/g, 'target="blank" href="http://www.imdb.com')));
				
				if (docHTML.getElementsByClassName('txt-block')[i].innerHTML.match(/Runtime:/))
					data.runtime = ltrim(rtrim(docHTML.getElementsByClassName('txt-block')[i].innerHTML.replace(/\n/g, '').replace(/<h4.*<\/h4>/, '').replace(/href="/g, 'target="blank" href="http://www.imdb.com')));
			}
			
			for (i=0; i < docHTML.getElementsByClassName('see-more inline canwrap').length; i++)
			{
				if (docHTML.getElementsByClassName('see-more inline canwrap')[i].innerHTML.match(/Genres?:/))
					data.genre = ltrim(rtrim(docHTML.getElementsByClassName('see-more inline canwrap')[i].innerHTML.replace(/\n/g, '').replace(/<h4.*<\/h4>/, '').replace(/href="/g, 'target="blank" href="http://www.imdb.com')));
			}
			
			if (response.responseText.match(/<p itemprop="description">\n(.*)\n<\/p>/))
				data.plot = response.responseText.match(/<p itemprop="description">\n(.*)\n<\/p>/)[1].replace(/href="/g, 'target="blank" href="' + data.url);
			
			data.picture = 'http://www.iphonity.fr/iphonity/images/stories/img/img_applications/IMDB/IMDB_1.png';
			
			for (i=0; i < docHTML.getElementsByTagName('img').length; i++)
			{
				if (docHTML.getElementsByTagName('img')[i].title.match(/poster/i))
					data.picture = docHTML.getElementsByTagName('img')[i].src;
			}
			
			/*
			if (GM_config.read()['language'] == 'en')
				data.comment = 'Movie information have not been found on <a target="_blank" href="'+imdbApiRequest+'">imdbapi</a>.';
			else
				data.comment = 'Les informations concernant le film n\'ont pas été trouvé sur <a target="_blank" href="'+imdbApiRequest+'">imdbapi</a>.';
			*/
			
			data.title = title;
			
			if (typeof data.original_title == 'undefined')
				data.original_title = data.title;
				
			data.year = year;
			data.realRating = rating;
			data.realVotes = votes;
			data.requestUrl = url;
			data.source = 'imdb';
			data.dataSource = 'IMDB';
			data.update = now();
			data.tomatoUrl = 'http://www.rottentomatoes.com/alias?type=imdbid&s=' + (data.imdbId).match(/tt([0-9]+)/)[1];
			
			if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
			{
				data.save_id = data.source + '_' + data.id;
				serialize(data.save_id, data);
			}

			if (options == 'preload')
			{
				preload();
			}
			else
			{
				show.id = data.save_id;
				
				if (debug) GM_log('getImdbInfoFromWebsite display data id : ' + id + ' imdbApiRequest : ' + imdbApiRequest + ' options : ' + options);
			
				displayPicture(data);
				displayInfo(data);
				displayLinks(data);
				
				if (GM_config.read()['display_rating_stars'] || GM_config.read()['display_rating_text'])
					displayImdbRating(data);
				
				getRottenTomatoesInfo(data, options);
			}
		}
	});
}

// Gets IMDB rating from IMDB website
function getImdbRatingFromWebsite(data, options) {
	
	if (debug) GM_log('getImdbRatingFromWebsite ' + data.imdbId);
	
	if (GM_config.read()['enable_loading'] && options != 'preload')
		MGIT_rating.innerHTML = '<img src="' + loading_uri + '"> '+GM_trans.lang('loading');
	
	requestUrl = 'http://akas.imdb.com/title/' + data.imdbId + '/combined';
	
	GM_xmlhttpRequest({
		method: 'get',
		url: requestUrl,
		onerror: function (response)
		{
			GM_log('getImdbRatingFromWebsite error. id : ' + data.id + ' options : ' + options);
			if (options != 'preload')
				MGIT_rating.innerHTML = 'An error as occured while fetching real IMDB rating. Try to <a href="javascript:void(0)">refresh</a>';
		},
		onload: function (response)
		{
			if (response.responseText.match(/(\d+[\.,]\d)\/10/))
				rating = response.responseText.match(/(\d+[\.,]\d)\/10/)[1];
			else
				rating = 'N/A';
			
			if (response.responseText.match(/([0-9.,]+) votes/))
				votes = response.responseText.match(/([0-9.,]+) votes/)[1];
			else
				votes = 'N/A';
			
			data.update = now();
			data.realRating = rating;
			data.realVotes = votes;
			
			// Save
			if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
			{
				data.save_id = data.source + '_' + data.id;
				serialize(data.save_id, data);
			}
			
			if (options != 'preload')
			{
				if (GM_config.read()['display_rating_stars'] || GM_config.read()['display_rating_text'])
					displayImdbRating(data);
			}
		}
	});
}

// Gets info from Allocine Api
function getAllocineInfoById(data, options) {
	if (GM_getValue(data.save_id) && options != 'refresh') // Get Saved Allocine Info
	{
		if (options == 'preload')
		{
			if (GM_config.read()['use_imdb_rating_instead_allocine'] && pingImdbApi)
				getImdbRating(data, options);
			else
				getAllocineRating(data, options);
			
			if (GM_config.read()['display_rotten_info'])
				getRottenTomatoesInfo(data, options);
				
			preload();
		}
		if (options == 'show')
		{
			data = deserialize(data.save_id);
			show.id = data.save_id;
			displayInfo(data);
			displayLinks(data);
			displayPicture(data);
			
			if (GM_config.read()['use_imdb_rating_instead_allocine'] && pingImdbApi)
				getImdbRating(data, options);
			else
				getAllocineRating(data, options);
			
			if (GM_config.read()['display_rotten_info'])
				getRottenTomatoesInfo(data, options);
		}
	}
	else
	{
		var date = new Date();
var pad = function pad(num) { var s = num + ""; return (s.length < 2) ? "0" + s : s; }
var sed = '' + date.getFullYear().toString() + pad(date.getMonth()+1) + pad(date.getDate());
 
var buildUrl = function(route, tokens) {
        tokens.push({"name" : "partner", "value" : "V2luZG93czg"}, {"name" : "format", "value" : "json"});
        tokens.sort(function (a, b) { if (a.name < b.name) return -1; if (a.name > b.name) return 1; return 0; });
        for (var i = 0; i < tokens.length; i++) {
                tokens[i] = tokens[i].name + "=" + encodeURIComponent(tokens[i].value);
        }
        var sig = encodeURIComponent(CryptoJS.SHA1('e2b7fd293906435aa5dac4be670e7982' + tokens.join("&") + "&sed=" + sed).toString(CryptoJS.enc.Base64));
        return 'http://api.allocine.fr/rest/v3/' + route + '?' + tokens.join("&") + "&sed=" + sed + "&sig=" + sig;
}
		//requestUrl = 'http://api.allocine.fr/rest/v3/movie?partner=YW5kcm9pZC12M3M&format=json&code=' + data.id;
		requestUrl = buildUrl('movie', [
        {"name" : "code", "value" : data.id},
        {"name" : "profile", "value" : "small"},
        {"name" : "mediafmt", "value" : "mp4-lc"}
]);
		/*
		define( 'URL_API', 'http://api.allocine.fr/rest/v3/' );
define('PARTNER_ID', '100043982026');
define('PARTNER_KEY', '29d185d98c984a359e6e6f26a0474269');
 
function createURL($route, $tokens)
{
	$sed = date("Ymd");
	$tokens[] = "partner=" . PARTNER_ID;
	$tokens[] = "count=25";
	$tokens[] = "page=1";
	$tokens[] = "format=json";
	sort($tokens);
	$tokensUrl = implode("&", $tokens);
	$sig = rawurlencode(base64_encode(sha1(PARTNER_KEY . $tokensUrl.'&sed='.$sed, true)));
	
	return URL_API . $route . '?' . $tokensUrl . "&sed=" . $sed . "&sig=" . $sig;
}

function recupAllocine($url){
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_USERAGENT, "Dalvik/1.6.0 (Linux; U; Android 4.0.3; SGH-T989 Build/IML74K)");
	$return = curl_exec($curl);
	//print_r(curl_getinfo($curl, CURLINFO_HTTP_CODE));
	curl_close($curl);
	return json_decode($return, true);
}

A utiliser de cette manière :

$nomFilm = "Avatar";
$urlAPI = createURL("search", array("q=" . urlencode($nomFilm), "filter=movie"));
$array_infos = recupAllocine($urlAPI);
*/
		//requestUrl = 'http://api.allocine.fr/rest/v3/movie?partner=YW5kcm9pZC12M3M&format=json&code=' + data.id;
		if (debug) GM_log('getAllocineInfoById requestUrl : ' + requestUrl);
		try
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: requestUrl,
				onerror: function(response)
				{
					GM_log('getAllocineInfoById GM_xmlhttpRequest error. save_id : ' + data.save_id + ' url : ' + data.url + 'options : ' + options);
					
					if (preloading)
					{
						load.error++;
						preload();
					}
				},
				onload: function(response) {
					
					if (debug) GM_log('getAllocineInfoById id : ' + data.save_id + ' url : ' + data.url + ' options : ' + options);
					
					var res = eval('(' + response.responseText + ')');
					
					if (typeof res.movie != 'undefined') {
						
						if (typeof res.movie.runtime != 'undefined' || res.movie.runtime == '0') {
							runtime = res.movie.runtime/60;
							runtime = Math.floor(runtime/60) + ' hrs ' + (runtime - Math.floor(runtime/60)*60) + ' mins';
						}
						else
							runtime = 'N/A';
						
						if 	(typeof res.movie.genre != 'undefined') {
							genre = res.movie.genre[0].$;
							for(i=1; i<res.movie.genre.length; i++) {
								genre += ', ';
								genre += res.movie.genre[i].$;
							}
						}
						else
							genre = 'N/A';
						
						if 	(typeof res.movie.castingShort != 'undefined') {
							if (typeof res.movie.castingShort.directors != 'undefined')
								directors = res.movie.castingShort.directors;
							else
								directors = 'N/A';

							if 	(typeof res.movie.castingShort.actors != 'undefined')
								actors = res.movie.castingShort.actors;
							else
								actors = 'N/A';
						} else {
							directors = 'N/A';
							actors = 'N/A';
						}
						
						if 	(typeof res.movie.statistics != 'undefined') {
							if (typeof res.movie.statistics.pressRating != 'undefined')
								pressRating = res.movie.statistics.pressRating;
							else
								pressRating = 'N/A';

							if 	(typeof res.movie.statistics.userRating != 'undefined')
								userRating = res.movie.statistics.userRating;
							else
								userRating = 'N/A';
						} else {
							pressRating = 'N/A';
							userRating = 'N/A';
						}
					
						if (typeof res.movie.poster == 'undefined')
							picture = 'http://images.allocine.fr/r_160_214/b_1_cfd7e1/commons/emptymedia/AffichetteAllocine.gif';
						else
							picture = res.movie.poster.href;
						
						data.title = typeof res.movie.title != 'undefined'?res.movie.title:'N/A';
						data.original_title = typeof res.movie.originalTitle != 'undefined'?res.movie.originalTitle:'N/A';
						data.year = typeof res.movie.productionYear != 'undefined'?res.movie.productionYear:'N/A';				
						data.genre = genre;
						data.runtime = runtime;
						data.director = directors;
						data.writer = 'N/A';
						data.actors = actors;
						data.plot = typeof res.movie.synopsis != 'undefined'?res.movie.synopsis:'N/A';
						data.picture = picture;
						data.update = now();
						data.pressRating = pressRating;
						data.userRating = userRating;
						
						// Save
						if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
						{
							//data.save_id = data.source + '_' + data.id;
							serialize(data.save_id, data);
						}
						
						if (options == 'preload')
						{
							if (GM_config.read()['use_imdb_rating_instead_allocine'] && pingImdbApi)
								getImdbRating(data, options);
							else
								getAllocineRating(data, options);
							
							if (GM_config.read()['display_rotten_info'])
								getRottenTomatoesInfo(data, options);
											
							preload();
						}
						
						if (options != 'preload')
						{
							show.id = data.save_id;
							displayInfo(data);
							displayLinks(data);
							displayPicture(data);
							
							if (GM_config.read()['use_imdb_rating_instead_allocine'] && pingImdbApi)
								getImdbRating(data, options);
							else
								getAllocineRating(data, options);
							
							if (GM_config.read()['display_rotten_info'])
								getRottenTomatoesInfo(data, options);
						}
					}
				}
			});
		}
		catch (err)
		{
			GM_log('getAllocineInfoById error requestUrl : ' + requestUrl);
		}
	}
}

function getAllocineRating(data, options) {
	if (GM_config.read()['display_rating_stars'] || GM_config.read()['display_rating_text'])
	{
		if (data.realPressRating && data.realUserRating && options != 'preload')
			displayAllocineRating(data);
		else if (GM_config.read()['real_allocine_rating'])
			getAllocineRatingFromWebsite(data, options);
		else if (data.pressRating && data.userRating && options != 'preload')
			displayAllocineRating(data);
		//else
			//getAllocineInfoById(data, options);
	}
}

// Gets Allocine rating from Allocine website
function getAllocineRatingFromWebsite(data, options) {
	
	if (debug) GM_log('getAllocineRatingFromWebsite ' + data.id);
	
	if (GM_config.read()['enable_loading'] && options != 'preload')
		MGIT_rating.innerHTML = '<img src="' + loading_uri + '"> '+GM_trans.lang('loading');
	
	allocineUrl = 'http://www.allocine.fr/film/fichefilm_gen_cfilm=' + id + '.html';
	
	GM_xmlhttpRequest({
		method: 'get',
		url: allocineUrl,
		onerror: function (response)
		{
			GM_log('getAllocineRatingFromWebsite error. id : ' + id);
			if (options != 'preload')
				MGIT_rating.innerHTML = 'An error as occured while fetching Allocine real rating. Try to <a href="javascript:void(0)">refresh</a>';
		},
		onload: function (response) {
			allocineHTML = document.createElement('div');
			allocineHTML.innerHTML = response.responseText;
			stars = allocineHTML.getElementsByClassName('withstars');
			
			if (stars[0].innerHTML.match(/\((\d[\.,]\d)\)/))
				pressRating = (stars[0].innerHTML.match(/\((\d[\.,]\d)\)/)[1]).replace(',', '.');
			else
				pressRating = 'N/A';

			if (stars[1].innerHTML.match(/\((\d[\.,]\d)\)/))
				userRating = (stars[1].innerHTML.match(/\((\d[\.,]\d)\)/)[1]).replace(',', '.');
			else
				userRating = 'N/A';
			
			data.update = now();
			data.realPressRating = pressRating;
			data.realUserRating = userRating;
			
			// Save
			if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
			{
				data.save_id = data.source + '_' + data.id;
				serialize(data.save_id, data);
			}

			if (options != 'preload')
			{
				if (GM_config.read()['display_rating_stars'] || GM_config.read()['display_rating_text'])
					addAllocineRating(pressRating, userRating, allocineUrl, id);
			}
		}
	});
}

function getRottenTomatoesInfo(data, options) {
	if (data.original_title)
		title = data.original_title;
	else if (data.title)
		title = data.title;
	else
		return;
	
	if (debug) GM_log('getRottenTomatoesInfo title : ' + data.title + ' data.rating : ' + data.rating + ' data.url ' + data.url);
	
	if (GM_config.read()['display_rotten_info'])
	{
		if (data.realTomatoMeter && options != 'preload')
			displayRottenTomatoesInfo(data);
		else if (GM_config.read()['real_rotten_info'] && data.imdbId)
			getRottenTomatoesInfoFromWebsite(data, options);
		else if (GM_config.read()['real_rotten_info'] && pingImdbApi)
			getImdbInfoByTitle(title, data, options);
		else if (data.tomatoMeter && options != 'preload')
			displayRottenTomatoesInfo(data);
		else if (data.dataSource == 'IMDB' && data.imdbId)
			getRottenTomatoesInfoFromWebsite(data, options);
		else if (!data.tomatoMeter && pingImdbApi)
			getImdbInfoByTitle(title, data, options);
		else
			return;
	}
}

// Based on http://userscripts.org/scripts/show/12897
// Gets Rotten Tomatoes info from Rotten Tomatoes website
function getRottenTomatoesInfoFromWebsite(data, options) {
	if (data.imdbId)
		imdbId = data.imdbId;
	else
		imdbId = data.id;
		
	data.tomatoUrl = 'http://www.rottentomatoes.com/alias?type=imdbid&s=' + imdbId.match(/tt([0-9]+)/)[1];
	
	if (GM_config.read()['enable_loading'] && options != 'preload')
		MGIT_rotten_tomatoes.innerHTML = '<img src="' + loading_uri + '"> '+GM_trans.lang('loading');
	
	GM_xmlhttpRequest({
		url: data.tomatoUrl,
		method: 'GET',
		onerror: function (response)
		{
			GM_log('getRottenTomatoesInfoFromWebsite error. id : ' + imdbId + ' options : ' + options);
			if (options != 'preload')
				MGIT_rating.innerHTML = 'An error as occured while fetching Allocine real rating. Try to <a href="javascript:void(0)">refresh</a>';
		},
		onload: function(response)
		{	
			doc = document.createElement('div');
			doc.innerHTML = response.responseText;

			var findPattern = '//meta[@property="og:url"]';
			var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			if (results.snapshotItem(0) != null)
			{
				URL_split = results.snapshotItem(0).content.split('.com')
				data.tomatoUrl = 'http://www.rottentomatoes.com'+URL_split[1];
			}

			var findPattern = '//p[@class="critic_stats"]';
			var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			if (results.snapshotItem(0) != null)
			{
				var has_br = results.snapshotItem(0).innerHTML.match(/<br>/);
			
				if (has_br != null)
				{
					line_split = results.snapshotItem(0).innerHTML.split('<br>');
					
					average_count = line_split[0].split('<span>');
					data.realTomatoRating = parseFloat(average_count[1]);

					if (line_split[1] != null)
					{
						review_count = line_split[1].split('<span itemprop="reviewCount">');
						data.realTomatoReviews = parseInt(review_count[1]);
					}
					
					if (line_split[2] != null)
					{
						fresh_rotten_count = line_split[2].split(": ");
						data.realTomatoFresh = parseInt(fresh_rotten_count[1]);
						data.realTomatoRotten = parseInt(fresh_rotten_count[2]);
					}
				}
			}
			
			// get tomato-meter rating
			var findPattern = '//span[@id="all-critics-meter"]';
			var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			if (results.snapshotItem(0) != null)
			{
				data.realTomatoMeter = results.snapshotItem(0).innerHTML;
				if (data.realTomatoMeter == 'No Reviews Yet...')
					data.realTomatoMeter = 'n/a';
			}
			
			// Save
			if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
			{
				serialize(data.save_id, data);
			}
			
			if (options != 'preload')
				displayRottenTomatoesInfo(data);
		}
	});
}

function getJeuxActuInfo(data, options) {
	if (GM_getValue(data.save_id) && options != 'refresh')
	{
		if (options == 'preload')
		{
			preload();
		}
		if (options == 'show')
		{
			data = deserialize(data.save_id);
			show.id = data.save_id;
			displayInfo(data);
			displayPicture(data);
			displayLinks(data);
		}	
	}
	else
	{		
		GM_xmlhttpRequest({
			method: 'get',
			url: data.url,
			onerror: function(response)
			{
				GM_log('getJeuxActuInfo error. save_id : ' + data.save_id + ' options : ' + options);
				if (options == 'preload')
				{
					load.error++;
					preload();
				}
			},
			onload: function (response) {
				jaHtml = document.createElement('div');
				jaHtml.innerHTML = response.responseText;
				
				data.title = response.responseText.match(/<title>(.*)<\/title>/)[1].toString();
				
				if (response.responseText.match(/Titre en VO<.*> (.*)</))
					data.original_title = response.responseText.match(/Titre en VO<.*>(.*)</)[1].toString();
				else
					data.original_title = data.title;
					
				if (response.responseText.match(/Ann&eacute;e<.*> : (\d+)</))
					data.year = response.responseText.match(/Ann&eacute;e<.*> : (\d+)</)[1].toString();
				else
					data.year = 'N/A';
					
				if (response.responseText.match(/Genre<.*> : (.*)</))
					data.genre = response.responseText.match(/Genre<.*> : (.*)</)[1].toString();
				else
					data.genre = 'N/A';
				
				if (response.responseText.match(/Dur&eacute;e<.*> : (.*)</))
					data.runtime = response.responseText.match(/Dur&eacute;e<.*> : (.*)</)[1].toString();
				else
					data.runtime = 'N/A';
				
				data.director = 'N/A';
				data.writer = 'N/A';
				data.actors = 'N/A';
				
				if (response.responseText.match(/<h2>Synopsis du film .*<\/h2> (.*)</))
					data.plot = response.responseText.match(/<h2>Synopsis du film .*<\/h2> (.*)</)[1].toString();
				else
					data.plot = 'N/A';
				
				if (response.responseText.match(/<img\nsrc="(.*)" .* class="imfull" \/>/))
					data.picture = response.responseText.match(/<img\nsrc="(.*)" .* class="imfull" \/>/)[1].toString();
				else if (response.responseText.match(/<img\nsrc="(.*)" .* class="imfull" \/>/))
					data.picture = response.responseText.match(/<img\nclass="imfull" .* src="(.*)" \/>/)[1].toString();
				else
					data.picture = 'http://images.allocine.fr/r_160_214/b_1_cfd7e1/commons/emptymedia/AffichetteAllocine.gif';
					
				data.source = 'cinema.jeuxactu';
				data.dataSource = 'cinema.jeuxactu';
				data.update = now();
				
				// Save
				if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
				{					
					serialize(data.save_id, data);
				}
				
				if (options == 'preload')
				{
					getImdbInfoByTitle(data.original_title, data, options);
					preload();
				}
				else
				{
					MGIT_rating.innerHTML = '';
					show.id = data.save_id;
					getImdbInfoByTitle(data.original_title, data, options);
					displayPicture(data);
					displayLinks(data);
				
					
				}
			}
		});
	}
}

function getJeuxVideoInfo(data, options) {
	if (GM_getValue(data.save_id) && options != 'refresh')
	{
		if (options == 'preload')
		{
			preload();
		}
		if (options == 'show')
		{
			data = deserialize(data.save_id);
			show.id = data.save_id;
			displayPicture(data);
			displayJeuxVideoInfo(data);
			displayLinks(data);
		}
	}
	else if (data.url.match(/http:\/\/.*jeuxvideo.com\/articles\/[0-9]+\/[0-9]+-(.+)-test.htm/))
	{
		GM_xmlhttpRequest({
			method: 'get',
			url: data.url,
			onload: function (response) {
				jvHtml = document.createElement('div');
				jvHtml.innerHTML = response.responseText;
				
				if (jvHtml.getElementsByClassName('onglet_fiche')[0])
				{
					data.url = jvHtml.getElementsByClassName('onglet_fiche')[0].getElementsByTagName('a')[0].href;
					getJeuxVideoInfo(data, options);
				}
				else if (options != 'preload')
				{
					GM_log('JV not found : ' + data.url);
					data.picture = 'http://image.jeuxvideo.com/pics/pasjaquette.gif';
					displayPicture(data);
					MGIT_title.innerHTML = '<b>Game info not found</b>';
					MGIT_details.innerHTML = '<a href="' + data.url + '">Check JeuxVideo</a>';
				}
			}
		});
	}
	else
	{
		GM_xmlhttpRequest({
			method: 'get',
			url: data.url,
			overrideMimeType: 'text/html; charset=ISO-8859-1',
			onerror: function(response)
			{
				GM_log('getJeuxVideoInfo error. id : ' + id + ' options : ' + options);
				if (options == 'preload')
				{
					load.error++;
					preload();
				}
			},
			onload: function (response)
			{
				jvHtml = document.createElement('div');
				jvHtml.innerHTML = response.responseText;
				url = data.url;
				
				data = {};
				data.id = url.match(/http:\/\/.*jeuxvideo.com\/jeux\/.+\/[0-9]+-(.+).htm/)[1];
				data.title = 'N/A';
				data.picture = 'http://image.jeuxvideo.com/pics/pasjaquette.gif';
				data.noteRedac = 'Note rédaction : N/A';
				data.noteMoy = 'Note moyenne des Lecteurs : N/A';
				data.info = 'N/A';
				data.update = now();
				data.url = url;
				data.source = 'jeuxvideo';
				data.dataSource = 'jeuxvideo';
				
				if (typeof jvHtml.getElementsByClassName('jaquette')[0] != 'undefined' && typeof jvHtml.getElementsByClassName('jaquette')[0].getElementsByTagName('img')[0] != 'undefined')
					data.picture = jvHtml.getElementsByClassName('jaquette')[0].getElementsByTagName('img')[0].src;
				
				if (typeof jvHtml.getElementsByClassName('bloc1 fiche_tech')[0] != 'undefined' && typeof jvHtml.getElementsByClassName('bloc1 fiche_tech')[0].getElementsByClassName('bloc_inner')[0] != 'undefined')
					data.info = jvHtml.getElementsByClassName('bloc1 fiche_tech')[0].getElementsByClassName('bloc_inner')[0].innerHTML;
				
				if (typeof jvHtml.getElementsByClassName('note_redac')[0] != 'undefined')
					data.noteRedac = jvHtml.getElementsByClassName('note_redac')[0].innerHTML; //.match(/d+\/20/);
				
				if (typeof jvHtml.getElementsByClassName('moy_lecteurs')[0] != 'undefined' && typeof jvHtml.getElementsByClassName('moy_lecteurs')[0].getElementsByTagName('a')[0] != 'undefined')
					data.noteMoy = jvHtml.getElementsByClassName('moy_lecteurs')[0].getElementsByTagName('a')[0].innerHTML;
					
				if (typeof jvHtml.getElementsByTagName('h1')[0] != 'undefined' && typeof jvHtml.getElementsByTagName('h1')[0].getElementsByTagName('a')[0] != 'undefined' && typeof jvHtml.getElementsByTagName('h1')[0].getElementsByTagName('a')[0].getElementsByTagName('strong')[0] != 'undefined')
					data.title = jvHtml.getElementsByTagName('h1')[0].getElementsByTagName('a')[0].getElementsByTagName('strong')[0].innerHTML;
				else if (typeof jvHtml.getElementsByTagName('h1')[0] != 'undefined' && typeof jvHtml.getElementsByTagName('h1')[0].getElementsByTagName('a')[0] != 'undefined')
					data.title = jvHtml.getElementsByTagName('h1')[0].getElementsByTagName('a')[0].innerHTML;
				
				data.save_id = data.source + '_' + data.id;
				
				// Save
				if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
				{	
					serialize(data.save_id, data);
				}
				
				if (options == 'preload')
				{
					preload();
				}
				else
				{
					show.id = data.save_id;
					displayPicture(data);
					displayJeuxVideoInfo(data);
					displayLinks(data);
				}
			}
		});
	}
}

function getGamespotInfo(data, options) {
	if (GM_getValue(data.save_id) && options != 'refresh')
	{
		if (options == 'preload')
		{
			preload();
		}
		if (options == 'show')
		{
			data = deserialize(data.save_id);
			show.id = data.save_id;
			
			displayGamespotInfo(data);
			displayPicture(data);
			displayLinks(data);
		}	
	}
	else
	{
		requestUrl = data.url.replace(/\/[a-z]+.html/, '/tech_info.html?tag=tabs%3Bsummary');
		
		GM_xmlhttpRequest({
			method: 'get',
			url: requestUrl,
			onerror: function(response)
			{
				GM_log('getGamespotInfo error. save_id : ' + data.save_id + ' options : ' + options);
				if (options == 'preload')
				{
					load.error++;
					preload();
				}
			},
			onload: function (response) {
				docHTML = document.createElement('div');
				docHTML.innerHTML = response.responseText;
				
				data.title = 'N/A';
				data.picture = 'http://image.jeuxvideo.com/pics/pasjaquette.gif';
				data.gamespotScore = 'N/A';
				data.criticScore = 'N/A';
				data.userScore = 'N/A';
				data.info = 'N/A';
				data.update = now();
				
				if (response.responseText.match(/<a class="open_toggle_panel" href=".*">(.*)<\/a>/))
					data.title = response.responseText.match(/<a class="open_toggle_panel" href=".*">(.*)<\/a>/)[1];
				
				if (typeof docHTML.getElementsByClassName('boxshot')[0] != 'undefined' && typeof docHTML.getElementsByClassName('boxshot')[0].getElementsByTagName('img')[0] != 'undefined')
					data.picture = docHTML.getElementsByClassName('boxshot')[0].getElementsByTagName('img')[0].src;
				
				if (typeof docHTML.getElementsByClassName('game_info')[0] != 'undefined')
					data.info = docHTML.getElementsByClassName('game_info')[0].innerHTML;
				
				if (typeof docHTML.getElementsByClassName('data')[0] != 'undefined' && typeof docHTML.getElementsByClassName('data')[0].getElementsByTagName('a')[0] != 'undefined')
					data.gamespotScore = docHTML.getElementsByClassName('data')[0].getElementsByTagName('a')[0].innerHTML;
				
				if (typeof docHTML.getElementsByClassName('data')[1] != 'undefined' && typeof docHTML.getElementsByClassName('data')[1].getElementsByTagName('a')[0] != 'undefined')
					data.criticScore = docHTML.getElementsByClassName('data')[1].getElementsByTagName('a')[0].innerHTML;
				
				if (typeof docHTML.getElementsByClassName('data')[2] != 'undefined' && typeof docHTML.getElementsByClassName('data')[2].getElementsByTagName('a')[0] != 'undefined')
					data.userScore = docHTML.getElementsByClassName('data')[2].getElementsByTagName('a')[0].innerHTML;
				
				// Save
				if (GM_config.read()['use_cache'] || GM_config.read()['preload_info'])
				{
					if (data.title != 'N/A')
						serialize(data.save_id, data);
				}
				
				if (options == 'preload')
				{
					preload();
				}
				else
				{
					MGIT_rating.innerHTML = '';
					show.id = data.save_id;
					displayGamespotInfo(data);
					displayPicture(data);
					displayLinks(data);
				}
			}
		});
	}
}

/***** Display info *****/
function clearInfo() {
	if (!init_tooltip)
		initTooltip();
		
	MGIT_picture.innerHTML = '';
	MGIT_title.innerHTML = '';
	MGIT_original_title.innerHTML = '';
	MGIT_details.innerHTML = '';
	MGIT_links.innerHTML = '';
	MGIT_rating.innerHTML = '';
	MGIT_rotten_tomatoes.innerHTML = '';

	// Minimized version
	MGIT_minimized_picture.innerHTML = '';
	MGIT_minimized_title.innerHTML = '';
	MGIT_minimized_rating.innerHTML = '';
	MGIT_minimized_links.innerHTML = '';
}


function displayInfo(data) {
	
	// Minimized Version
	MGIT_minimized_title.innerHTML = '<b>' + cleanstr(data.title) + '</b> (' + data.year + ')';
	
	MGIT_title.innerHTML = '<b>' + cleanstr(data.title) + '</b> (' + data.year + ')';
	
	if (GM_config.read()['movie_original_title'] && data.original_title != data.title)
		MGIT_original_title.innerHTML = '<b>'+GM_trans.lang('movie_original_title')+'</b> : '+cleanstr(data.original_title);
	else
		MGIT_original_title.innerHTML = '';
	
	if (typeof data.dataSource == 'undefined')
		data.dataSource = data.source;
	
	if (typeof data.requestUrl == 'undefined')
		data.requestUrl = data.url;
		
	var infoHTML = '';
	if (GM_config.read()['movie_runtime'])
		infoHTML += '<b>'+GM_trans.lang('movie_runtime')+'</b> : '+data.runtime+'<br>';
	if (GM_config.read()['movie_genre'])
		infoHTML += '<b>Genre</b> : '+cleanstr(data.genre)+'<br>';
	if (GM_config.read()['movie_director'])
		infoHTML += '<b>'+GM_trans.lang('movie_director')+'</b> : '+cleanstr(data.director)+'<br>';
	if (GM_config.read()['movie_writer'] && typeof data.writer != 'undefined' && data.writer != 'N/A')
		infoHTML += '<b>'+GM_trans.lang('movie_writer')+'</b> : '+cleanstr(data.writer)+'<br>';
	if (GM_config.read()['movie_actors'])
		infoHTML += '<b>'+GM_trans.lang('movie_actors')+'</b> : '+cleanstr(data.actors)+'<br>';
	if (GM_config.read()['movie_plot'])
		infoHTML += '<b><u id="MGIT_plot_link">'+GM_trans.lang('movie_plot')+'</u></b><span id="MGIT_movie_plot"> : '+cleanstr(data.plot)+'</span><br>';
	if (GM_config.read()['last_update'])
		infoHTML += '<b>' + GM_trans.lang('last_update') + '</b> : ' + formatDate(data.update) + ' (<a href="' + data.requestUrl + '" target="blank">' + data.dataSource + '</a>) (<span id="MGIT_refresh"><a href="javascript:void(0)">' + GM_trans.lang('refresh') + '</a></span>)<br>';
	if (data.comment)
		infoHTML += '<b>' + GM_trans.lang('comment') + '</b> : ' + data.comment;
	
	MGIT_details.innerHTML = infoHTML;
	
	if (GM_config.read()['last_update'])
	{
		MGIT_refresh = document.getElementById('MGIT_refresh');
		MGIT_refresh.addEventListener('click', function(e){ getInfo(data.url, 'refresh'); }, false );
	}
	
	if (GM_config.read()['movie_plot'])
	{
		MGIT_movie_plot = document.getElementById('MGIT_movie_plot');
		
		if (MGIT_movie_plot)
		{
			if (show.plot)
				MGIT_movie_plot.style.display = '';
			else
				MGIT_movie_plot.style.display = 'none';
		
			MGIT_plot_link = document.getElementById('MGIT_plot_link');
			MGIT_plot_link.style.cursor = 'pointer';
			MGIT_plot_link.addEventListener('click', togglePlot, false );
		}
	}
}

function displayPicture(data) {
	if (debug) GM_log('displayPicture imgsrc : ' + data.picture + ' url : ' + data.url);
	
	if (GM_config.read()['enable_loading'])
		MGIT_picture.innerHTML = '<img src="' + loading_uri + '"> '+GM_trans.lang('loading');
	
	loadPicture(data.picture);
	
	movieImage.addEventListener('load', function(e){
		picture_width = GM_config.read()['picture_width'];
		picture_height = movieImage.height / movieImage.width * picture_width;
		minimized_picture_width = GM_config.read()['minimized_picture_width'];
		minimized_picture_height = movieImage.height / movieImage.width * minimized_picture_width;
		MGIT_picture.innerHTML = '<a target="_blank" href="' + data.url + '"><img src="' + movieImage.src + '"  style=\'width:' + picture_width + 'px;height:' + picture_height + 'px;\'></a>';
		MGIT_minimized_picture.innerHTML = '<a target="_blank" href="' + data.url + '"><img src="' + movieImage.src + '"  style=\'width:' + minimized_picture_width + 'px;height:' + minimized_picture_height + 'px;\'></a>';
	}, false);
	
	movieImage.src = data.picture;
}

function displayLinks(data) {

	if (debug) GM_log('displayLinks data.id : ' + data.id + ' data.original_title : ' + data.original_title + ' data.title : ' + data.title);
			
	if (data.original_title)
		title = data.original_title;
	else if (data.title)
		title = data.title;
	else
		return;

	title = title.replace(/\+/g, '%2B').replace(/&/g, '%26').replace(/#/g, '%23').replace(/"/g, '').replace(/'/g, '');
	titleReq = title.replace(/ /g, '+');
	
	if (debug) GM_log('displayLinks titleReq : ' + titleReq);
	
	youtubeUrl = 'http://www.youtube.com/results?search_query=trailer+' + titleReq;
	allocineUrl = 'http://www.allocine.fr/recherche/?q=' + titleReq;
	imdbUrl = 'http://akas.imdb.com/find?s=all&q=' + titleReq;
	rottenTomatoesURL = 'http://www.rottentomatoes.com/search/full_search.php?search=' + titleReq;
	metacriticUrl = 'http://www.metacritic.com/search/movie/' + titleReq + '/results';
	jeuxvideoUrl = 'http://www.jeuxvideo.com/recherche/jeux/' + title + '.htm'
	gamespotUrl = 'http://www.gamespot.com/search.html?qs=' + titleReq;
	
	nzbplanetUrl = 'http://nzbplanet.net/search/' + titleReq;
	binsearchUrl = 'http://binsearch.info/?q=' + titleReq + '&max=100&adv_age=1100&server=';
	nzbclubUrl = 'http://www.nzbclub.com/search.aspx?q=' + titleReq;
	piratebayUrl = 'http://thepiratebay.org/search/' + title + '/0/99/0';
	
	subsceneUrl = 'http://subscene.com/s.aspx?q=' + titleReq;
	
	if (GM_config.read()['language'] == 'en')
		opensubtitlesUrl = 'http://www.opensubtitles.org/en/search2/sublanguageid-eng/moviename-' + titleReq;
	else
		opensubtitlesUrl = 'http://www.opensubtitles.org/fr/search2/sublanguageid-fre/moviename-' + titleReq;
	
	googleUrl = 'http://www.google.com/#q=' + titleReq;
	
	if (data.source == 'allocine')
		allocineUrl = data.url;
			
	if (data.source == 'imdb') {
		imdbUrl = data.url;
		if ((data.id).match(/tt([0-9]+)/))
			rottenTomatoesURL = 'http://www.rottentomatoes.com/alias?type=imdbid&s=' + (data.id).match(/tt([0-9]+)/)[1];
	}
	
	if (data.source == 'jeuxvideo')
		jeuxvideoUrl = data.url;
		
	left_separator = '';
	right_separator = '&nbsp;';
	
	var linksHTML = '';
	var minimized_linksHTML = '';
	
	if (GM_config.read()['links_position'] == 'left')
	{
		left_separator = '';
		right_separator = '&nbsp;<br>';
	}
	else if (GM_config.read()['links_position'] == 'center')
	{
		left_separator = '&nbsp;';
		right_separator = '&nbsp;<br>';
	}
	else if (GM_config.read()['links_position'] == 'right')
	{
		left_separator = '&nbsp;';
		right_separator = '<br>';
	}
	
	if (GM_config.read()['display_youtube_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="Youtube" alt="Youtube" href="' + youtubeUrl + '"><img src="http://www.youtube.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="Youtube" alt="Youtube" href="' + youtubeUrl + '"><img src="http://www.youtube.com/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_imdb_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="IMDB" alt="IMDB" href="' + imdbUrl + '"><img src="http://imdb.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="IMDB" alt="IMDB" href="' + imdbUrl + '"><img src="http://imdb.com/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_allocine_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="Allocine" alt="Allocine" href="' + allocineUrl + '"><img src="http://www.allocine.fr/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="Allocine" alt="Allocine" href="' + allocineUrl + '"><img src="http://www.allocine.fr/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_rotten_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="Rotten Tomatoes" alt="Rotten Tomatoes" href="' + rottenTomatoesURL + '"><img src="' + fresh_icon_uri +'"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="Rotten Tomatoes" alt="Rotten Tomatoes" href="' + rottenTomatoesURL + '"><img src="' + fresh_icon_uri +'"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_metacritic_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="Metacritic" alt="Metacritic" href="' + metacriticUrl + '"><img src="http://www.metacritic.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="Metacritic" alt="Metacritic" href="' + metacriticUrl + '"><img src="http://www.metacritic.com/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_jeuxvideo_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="jeuxvideo.com" alt="jeuxvideo.com" href="' + jeuxvideoUrl + '"><img src="http://www.jeuxvideo.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="jeuxvideo.com" alt="jeuxvideo.com" href="' + jeuxvideoUrl + '"><img src="http://www.jeuxvideo.com/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_gamespot_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="Gamespot" alt="Gamespot" href="' + gamespotUrl + '"><img src="http://www.gamespot.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="Gamespot" alt="Gamespot" href="' + gamespotUrl + '"><img src="http://www.gamespot.com/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_nzbplanet_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="NZBPlanet" alt="NZBPlanet" href="' + nzbplanetUrl + '"><img src="http://nzbplanet.net/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="NZBPlanet" alt="NZBPlanet" href="' + nzbplanetUrl + '"><img src="http://nzbplanet.net/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_binsearch_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="Binsearch" alt="Binsearch" href="' + binsearchUrl + '"><img src="http://binsearch.info/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="Binsearch" alt="Binsearch" href="' + binsearchUrl + '"><img src="http://binsearch.info/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_nzbclub_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="NZBClub" alt="NZBClub" href="' + nzbclubUrl + '"><img src="http://nzbclub.com/images/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="NZBClub" alt="NZBClub" href="' + nzbclubUrl + '"><img src="http://nzbclub.com/images/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_piratebay_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="PirateBay" alt="PirateBay" href="' + piratebayUrl + '"><img src="http://thepiratebay.org/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="PirateBay" alt="PirateBay" href="' + piratebayUrl + '"><img src="http://thepiratebay.org/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_subscene_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="Subscene" alt="Subscene" href="' + subsceneUrl + '"><img src="http://subscene.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="Subscene" alt="Subscene" href="' + subsceneUrl + '"><img src="http://subscene.com/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_opensubtitles_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="OpenSubtitles" alt="OpenSubtitles" href="' + opensubtitlesUrl + '"><img src="http://www.opensubtitles.org/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="OpenSubtitles" alt="OpenSubtitles" href="' + opensubtitlesUrl + '"><img src="http://www.opensubtitles.org/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	if (GM_config.read()['display_google_link']) {
		linksHTML += left_separator;
		linksHTML += '<span><a target="_blank" title="Google" alt="Google" href="' + googleUrl + '"><img src="http://www.google.com/favicon.ico"></a></span>';
		linksHTML += right_separator;
		
		minimized_linksHTML += '<span><a target="_blank" title="Google" alt="Google" href="' + googleUrl + '"><img src="http://www.google.com/favicon.ico"></a></span>';
		minimized_linksHTML += ' ';
	}
	
	linksHTML += '';
	minimized_linksHTML += '';
	
	MGIT_links.innerHTML = linksHTML;
	MGIT_minimized_links.innerHTML = minimized_linksHTML;
}

function displayImdbRating(data) {
	if (data.imdbUrl)
		url = data.imdbUrl;
	else
		url = data.url;
		
	if (data.realRating && data.realVotes)
	{
		rating = data.realRating;
		votes = data.realVotes;
	}
	else
	{
		rating = data.rating;
		votes = data.votes;
	}
		
	var ratingHTML = '<table cellspacing=0 border='+table_border+'><tr><td nowrap>';
	
	if (GM_config.read()['display_rating_stars']) {
		ratingHTML += '<a href="' + url + '" title="IMDB" target="_blank">';
		ratingHTML += '<span style="width:200px; height:20px; float:left; background:url(' + imdb_stars_uri + ') no-repeat 0px 0px;">';
		ratingHTML += '<span style="width:' + 20 * rating + 'px; height:20px; float:left; background:url(' + imdb_stars_uri + ') no-repeat 0px -20px;"></span>';
		ratingHTML += '</span>';
		ratingHTML += '</a>&nbsp;';
		ratingHTML += '</td><td nowrap>';
	}

	if (rating != 'N/A')
		rating += '/10';
			
	if (GM_config.read()['display_rating_text'])
		ratingHTML += '<b><a href="' + url + '" title="IMDB" target="_blank">' + rating + '</a></b>&nbsp;';
	
	if (GM_config.read()['display_rating_votes'] && votes != 'N/A')	
		ratingHTML += '(' + formatVotes(votes) + ' votes)';
		
	ratingHTML += '</td></tr></table>';
	
	MGIT_rating.innerHTML = ratingHTML;
	
	// minimized version
	minimized_rating_HTML = '<b><a href="' + url + '" title="IMDB" target="_blank">' + rating + '</a></b>';
			
	if (GM_config.read()['minimized_votes'] && votes != 'N/A')
		minimized_rating_HTML += ' (' + formatVotes(votes) + ' votes)';
		
	MGIT_minimized_rating.innerHTML = minimized_rating_HTML;
}

function displayAllocineRating(data) {
	if (data.realPressRating && data.realUserRating)
	{
		pressRating = data.realPressRating;
		userRating = data.realUserRating;
	}
	else
	{
		pressRating = data.pressRating;
		userRating = data.userRating;
	}
	
	var ratingHTML = '<table cellspacing=0 border='+table_border+'><tr><td>';
	
	if (GM_config.read()['display_rating_stars'] || GM_config.read()['display_rating_text'])
		ratingHTML += '<b>Presse :</b></td><td>';
	
	if (GM_config.read()['display_rating_stars']) {
		ratingHTML += '<a href="' + data.url + '" title="Allocine" target="_blank">';
		ratingHTML += '<div style="width:100px; height:20px; float:left; background:url(' + allocine_stars_uri + ') no-repeat 0px 0px;">';
		ratingHTML += '<div style="width:' + 20 * pressRating + 'px; height:20px; float:left; background:url(' + allocine_stars_uri + ') no-repeat 0px -20px;"></div>';
		ratingHTML += '</div>';
		ratingHTML += '</a>';
	}
	
	if (pressRating != 'N/A')
		pressRating += '/5';
			
	if (GM_config.read()['display_rating_text'])
		ratingHTML += '&nbsp;<span style="font-size:smaller;">(' + pressRating + ')</span>';
	
	if (GM_config.read()['display_rating_stars'] || GM_config.read()['display_rating_text'])
		ratingHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><b>Spectateurs :</b></td><td>';
	
	if (GM_config.read()['display_rating_stars']) {
		ratingHTML += '<a href="' + data.url + '" title="Allocine url" target="_blank">';
		ratingHTML += '<div style="width:100px; height:20px; float:left; background:url(' + allocine_stars_uri + ') no-repeat 0px 0px;">';
		ratingHTML += '<div style="width:' + 20 * userRating + 'px; height:20px; float:left; background:url(' + allocine_stars_uri + ') no-repeat 0px -20px;"></div>';
		ratingHTML += '</div>';
		ratingHTML += '</a>';
	}
	
	if (userRating != 'N/A')
		userRating += '/5';
			
	if (GM_config.read()['display_rating_text'])
		ratingHTML += '&nbsp;<span style="font-size:smaller;">(' + userRating + ')</span>';
	
	ratingHTML += '</td></tr></table>';
	
	MGIT_rating.innerHTML = ratingHTML;
	
	// minimized version
	MGIT_minimized_rating.innerHTML = '<b>Presse</b> : <a href="' + data.url + '" title="Allocine" target="_blank">' + pressRating + '</a><br><b>Spectateurs</b> : <a href="' + data.url + '" title="Allocine" target="_blank">' + userRating + '</a>';
}

function displayRottenTomatoesInfo(data) {
	if (data.realTomatoMeter)
		tomatoMeter = data.realTomatoMeter;
	else
		tomatoMeter = data.tomatoMeter;
	
	if (data.realTomatoRating)
		tomatoRating = data.realTomatoRating;
	else
		tomatoRating = data.tomatoRating;
		
	if (data.realTomatoReviews)
		tomatoReviews = data.realTomatoReviews;
	else
		tomatoReviews = data.tomatoReviews;
		
	if (data.realTomatoFresh)
		tomatoFresh = data.realTomatoFresh;
	else
		tomatoFresh = data.tomatoFresh;
		
	if (data.realTomatoRotten)
		tomatoRotten = data.realTomatoRotten;
	else
		tomatoRotten = data.tomatoRotten;
	
	
	if (tomatoMeter != 'N/A')
	{
		if (tomatoMeter >= 60) // it's fresh
		{
			rotten_rating_image_uri = fresh_icon_uri;
			rotten_rating_text = 'Fresh';
		}
		else // it's rotten
		{
			rotten_rating_image_uri = rotten_icon_uri;
			rotten_rating_text = 'Rotten';
		}
		tomatoMeter = tomatoMeter + '%';
		
		rottenTomatoesInfoHTML = '<div><div><a target="_blank" title="Rotten Tomatoes url" href="' + data.tomatoUrl + '">' + tomatoMeter + '</a>';
		rottenTomatoesInfoHTML += ' <img src="' + rotten_rating_image_uri + '" alt="' + rotten_rating_text + '" title="' + rotten_rating_text + '">';
		
		if (GM_config.read()['display_rotten_average'])
			rottenTomatoesInfoHTML += ' <span style="font-size:smaller;">(' + tomatoRating + '/10)</span>';

		if (GM_config.read()['display_rotten_review']) {
			rottenTomatoesInfoHTML += ' <span class="ghost"> | </span>';
			rottenTomatoesInfoHTML += ' <span title="' + tomatoReviews + ' Total Reviews"><img style="width:12px;" src="' + comment_bubble_uri + '" alt="Reviews"> <a href="' + data.tomatoUrl + '?critic=columns&sortby=name&name_order=asc&view=#contentReviews">' + tomatoReviews + '</a></span>';
			rottenTomatoesInfoHTML += ' <span title="' + tomatoFresh + ' Fresh Reviews"><img style="width:12px;" src="' + fresh_icon_uri + '" alt="Fresh"> <a href="' + data.tomatoUrl + '?critic=columns&sortby=fresh&name_order=asc&view=#contentReviews">' + tomatoFresh + '</a></span>';
			rottenTomatoesInfoHTML += ' <span title="' + tomatoRotten + ' Rotten Reviews"><img style="width:12px;" src="' + rotten_icon_uri + '" alt="Rotten"> <a href="' + data.tomatoUrl + '?critic=columns&sortby=rotten&name_order=asc&view=#contentReviews">' + tomatoRotten + '</a></span>';
		}
		
		rottenTomatoesInfoHTML += '</div></div>';
	}
	else
		rottenTomatoesInfoHTML = '<div><a target="_blank" title="Rotten Tomatoes" href="' + data.tomatoUrl + '">Not enough reviews for a rating</a></div>';
	
	MGIT_rotten_tomatoes.innerHTML = rottenTomatoesInfoHTML;
}

function displayJeuxVideoInfo(data) {
	data.info = data.info.replace(/<ul>\n<li>/g, '').replace(/<\/li>\n<\/ul>/g, '').replace(/<\/li>\n<li>/g, '<br>');

	if (GM_config.read()['last_update'])
		data.info += '<br><b>' + GM_trans.lang('last_update') + '</b> : ' + formatDate(data.update) + ' (<span id="MGIT_refresh"><a href="javascript:void(0)">' + GM_trans.lang('refresh') + '</a></span>)';
	
	MGIT_title.innerHTML = '<b>' + data.title + '</b>';
	if (debug) MGIT_original_title.innerHTML = data.save_id;
	MGIT_details.innerHTML = data.info;
	MGIT_rating.innerHTML = '<b>' + data.noteRedac + '</b><br><b>' + data.noteMoy + '</b>';
	
	if (GM_config.read()['last_update'])
	{
		MGIT_refresh = document.getElementById('MGIT_refresh');
		MGIT_refresh.addEventListener('click', function(e){ getInfo(data.url, 'refresh'); }, false );
	}
	
	// minimized version
	MGIT_minimized_title.innerHTML = '<b>' + data.title + '</b>';	
	MGIT_minimized_rating.innerHTML = '<b>' + data.noteRedac.replace('Note rédaction', 'Rédaction') + '</b><br><b>' + data.noteMoy.replace('Note moyenne des Lecteurs', 'Lecteurs') + '</b>';
}

function displayGamespotInfo(data) {
	data.info = ltrim(rtrim(data.info));
	data.info = data.info.replace(/<dt>/g, '').replace(/<\/dt>/g, '').replace(/<dd>/g, '').replace(/<\/dd>/g, '<br>');

	if (GM_config.read()['last_update'])
		data.info += '<b>' + GM_trans.lang('last_update') + '</b> : ' + formatDate(data.update) + ' (<span id="MGIT_refresh"><a href="javascript:void(0)">' + GM_trans.lang('refresh') + '</a></span>)';
	
	MGIT_title.innerHTML = '<b>' + data.title + '</b>';
	if (debug) MGIT_original_title.innerHTML = data.save_id;
	MGIT_details.innerHTML = data.info;
	MGIT_rating.innerHTML = '<b>Gamespot Score : ' + data.gamespotScore + '</b><br><b>Critic Score : ' + data.criticScore + '</b><br><b>User Score : ' + data.userScore + '</b>';
	
	if (GM_config.read()['last_update'])
	{
		MGIT_refresh = document.getElementById('MGIT_refresh');
		MGIT_refresh.addEventListener('click', function(e){ getInfo(data.url, 'refresh'); }, false );
	}
	
	// minimized version
	MGIT_minimized_title.innerHTML = '<b>' + data.title + '</b>';	
	MGIT_minimized_rating.innerHTML = '<b>Gamespot : ' + data.gamespotScore + '</b><br><b>Critic : ' + data.criticScore + '</b><br><b>User : ' + data.userScore + '</b>';
}

function loadPicture(imgsrc) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: imgsrc,
		onload: function (response) {},
	});
}

/***** Saving function *****/
function serialize(name, val) {
  GM_setValue(name, uneval(val));
}

function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function deleteSavedInfo() {
	var keys = GM_listValues();
	var tmp = [];
	for (var i=0; i < keys.length; i++)
	{
		if (keys[i].indexOf('GMSUC_') == -1 && keys[i].indexOf('GM_') == -1 && keys[i].indexOf('section_') == -1 && keys[i].indexOf('MGIT_') == -1)
		{
			GM_deleteValue(keys[i]);
			tmp.push(keys[i]);
		}
	}
	
	if (tmp.length > 0)
		GM_log(GM_trans.lang('cache_deleted'));
	
	if (GM_config.read()['preload_info'] || GM_config.read()['use_cache'])
		MGIT_cache_info.innerHTML = GM_trans.lang('cache_deleted');
}

function countSavedInfo() {
	var keys = GM_listValues();
	var tmp = [];
	
	for (var i=0; i < keys.length; i++)
	{
		if (keys[i].indexOf('GMSUC_') == -1 && keys[i].indexOf('GM_') == -1 && keys[i].indexOf('section_') == -1 && keys[i].indexOf('MGIT_') == -1)
		{
			tmp.push(keys[i]);
		}
	}
	return tmp.length;
}

/***** Other functions *****/
function checkImdbApiConnection() {

	connectionTimer = setTimeout(connectionTimeout, 10000);
	
	imgPreload.addEventListener('load', function(e){
		clearTimeout(connectionTimer);
		connectionTimer = null;
		pingImdbApi = true;
		init();
	}, false);
	
	imgPreload.addEventListener('error', function(e){
		clearTimeout(connectionTimer);
		connectionTimer = null;
		imgPreload = null;
		pingImdbApi = false;
		GM_log('Ping to Imdb Api failed');
		init();
	}, false);
	
	imgPreload.src = "http://imdbapi.com/header.png";
}

function connectionTimeout() {
	clearTimeout(connectionTimer);
	connectionTimer = null;
	imgPreload = null;
	pingImdbApi = false;
	GM_log('Ping to Imdb Api failed');
	init();
}

function imdbRedirect() {
	website_url = window.location.href;
	if (website_url.indexOf('.imdb.') != -1 && window.location.href == top.location.href)
	{
		if (window.location.href != changeImdbLink(window.location.href) && typeof changeImdbLink(window.location.href) != 'undefined')
		{
			window.content.location.replace(changeImdbLink(window.location.href));
			GM_log('IMDB Redirect, from : ' + window.location.href + ' to : ' + changeImdbLink(window.location.href));
		}
	}
}

function changeImdbLink(url) {
	imdb_domain = url.match(/([a-z]+).imdb.([a-z]+)/);

	if (imdb_domain) {
		if (GM_config.read()['imdb_redirect'] && imdb_domain[0] != GM_config.read()['imdb_domain'])
			url = url.replace(imdb_domain[0], GM_config.read()['imdb_domain']);
		
		if (GM_config.read()['imdb_combined'] && url.match(/title\/tt([0-9]+)\/$/)) 
			url += 'combined';
			
		if (GM_config.read()['imdb_combined'] && url.match(/title\/tt([0-9]+)$/)) 
			url += '/combined';
	}
	return url;
}

function getImdbUrl(id) {
	if (GM_config.read()['imdb_redirect'])
		imdb_domain = GM_config.read()['imdb_domain'];
	else
		imdb_domain = 'www.imdb.com';

	url = 'http://' + imdb_domain + '/title/' + id + '/';
	
	if (GM_config.read()['imdb_combined'])
		url += 'combined';
		
	return url;
}

// Based on http://userscripts.org/scripts/show/1868
function getPageSize(){
	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}

	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
}

/***** String functions *****/
function ltrim(str) {
	if (typeof str != 'undefined')
		str = str.replace(/^\s+/,'');
	
	return str;
}

function rtrim(str) {
	if (typeof str != 'undefined')
		str = str.replace(/\s+$/,'');
		
	return str;
}

function cleanstr(str) {

	if (typeof str != 'undefined')
		str = str.replace(/Ã§/g, 'ç')
				.replace(/Ã¿/g, 'ÿ')
				.replace(/Ãœ/g, 'ý')
				.replace(/Ã¹/g, 'ù')
				.replace(/Ã»/g, 'û')
				.replace(/ÃŒ/g, 'ü')
				.replace(/Ã²/g, 'ò')
				.replace(/ÃŽ/g, 'ô')
				.replace(/Ã¶/g, 'ö')
				.replace(/Ãž/g, 'ø')
				.replace(/Ã­/g, 'í')
				.replace(/Ã¬/g, 'ì')
				.replace(/Ã®/g, 'î')
				.replace(/Ã¯/g, 'ï')
				.replace(/Ã©/g, 'é')
				.replace(/Ãš/g, 'è')
				.replace(/Ãª/g, 'ê')
				.replace(/Ã«/g, 'ë')
				.replace(/Ã¡/g, 'á')
				.replace(/Ã /g, 'à')
				.replace(/Ã¥/g, 'å')
				.replace(/Ã¢/g, 'â')
				.replace(/Ã€/g, 'ä');
	return str;
}

function formatVotes(nvotes){
	nvotes = nvotes.replace(',', '');
	
	if (isNaN(nvotes)) return;
	
	var sRegExp=/([0-9]+)([0-9]{3})/i;
	while(sRegExp.test(nvotes)) {
		if (GM_config.read()['language'] == 'en')
			nvotes = nvotes.replace(sRegExp, '$1,$2');
		else
			nvotes = nvotes.replace(sRegExp, '$1 $2');
	}
	return nvotes;
}

/***** Date function *****/
function formatDate(fulldate) {
	
	/* date */
	date = fulldate.split(' ')[0];
	time = fulldate.split(' ')[1];
	
	day = date.split('/')[0];
	month = date.split('/')[1];
	year = date.split('/')[2];
	
	hours = time.split(':')[0];
	mins = time.split(':')[1];
	
	if (GM_config.read()['date_separator'])
		separator = GM_config.read()['date_separator'];
	else
		separator = '/';
	
	if (GM_config.read()['date_format'] == 'mmjjaaaa')
		date = month + separator + day + separator + year;
	else if (GM_config.read()['date_format'] == 'aaaammjj')
		date = year + separator + month + separator + day;
	else // 'jjmmaaaa'
		date = day + separator + month + separator + year;
	
	date += ' ';
	
	/* hours */
	if (GM_config.read()['hours_format'] == '12h')
	{
		var ap = 'am';
		if (hours > 11) { ap = 'pm'; }
		if (hours > 12) { hours = hours - 12; }
		if (hours == 0) { hours = 12; }
		if (hours < 10) { hours = '0' + hours; }
		
		time = hours + ':' + mins + ' ' + ap;
	}
	
	date += time;
	
	return date;
}

function now() {
	var date = new Date();
	day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
	month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
	year = date.getFullYear();
	hours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
	minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
	
	return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;
}

/***** Update control *****/
// Based on http://userscripts.org/scripts/review/20145  and  http://userscripts.org/scripts/review/35611
function updateCheck(forced) {
	update_delay = typeof GM_config.read()['update_delay'] != 'undefined'?GM_config.read()['update_delay']:7;
	update_delay = update_delay*24*60*60*1000 // (number of days*24 h * 60 m * 60 s * 1000 ms)
	
	request_url = 'http://userscripts.org/scripts/source/'+script_id+'.meta.js';
	
	if ((forced) || (parseInt(GM_getValue('GMSUC_last_update', '0')) + update_delay <= (new Date().getTime())))
	{
		try
		{
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: request_url,
				headers: {'Cache-Control': 'no-cache'},
				onload: function(resp)
				{
					var remote_version, rt;
					
					rt = resp.responseText;
					GM_setValue('GMSUC_last_update', new Date().getTime()+'');
					GM_setValue('GMSUC_last_check', now());
					
					remote_version = /\/\/\s*@version\s*(.*)\s*\n/i.exec(rt);
					
					if (remote_version == null){ //Ce test est nécessaire car userscripts est quelque fois inaccessible
						if (forced) {
							MGIT_update.innerHTML = 'Userscripts ' + GM_trans.lang('unavailable');
							MGIT_update.title = '';
							
							if (GM_config.read()['update_alert'])
								alert('Userscripts.org is not accessible right now.');
						}
						return false;
					}
					remote_version = remote_version[1];
					GM_setValue('GMSUC_remote_version', remote_version);
					
					if (remote_version > script_version) {
						MGIT_update.innerHTML = '<a target="_blank" href="'+script_url+'">' + GM_trans.lang('update') + '</a>';
						MGIT_update.title = '';
						
						if (GM_config.read()['update_alert'])
							if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								GM_openInTab(script_url);
					}
					else if (forced)
					{
						MGIT_update.innerHTML = GM_trans.lang('no_update');
						MGIT_update.title = '';
						
						if (GM_config.read()['update_alert'])
							alert('No update is available for "'+script_name+'."');
					}
				}
			});
		}
		catch (err)
		{
			if (forced)
				alert('An error occurred while checking for updates:\n'+err);
		}
	}
}

/****** Config ******/
function initGMTranslations() {
	GM_trans.setTranslations('en',{
		'main_options':'General options',
		'language':'Language',
		'date_format':'Date format',
		'date_separator':'Date separator',
		'hours_format':'Hours format',
		'update_alert':'Display a popup if an update is available',
		'update_delay':'Delay for update checking (days)',
		
		'remove_redirection':'Remove redirection (ex : http://anonym.to?)',
		'imdb_redirect':'Enable IMDB redirection',
		'imdb_domain':'IMDB domain',
		'imdb_combined':'Combined View',

		'tooltip_behaviour':'Tooltip behaviour',
		'preload_info':'Preload data when page loads',
		'use_cache':'Save data in cache',
		'how_to_show':'Way to show the tooltip',
		'pressed_key':'Key',
		'click_to_hide':'Click anywhere to hide the tooltip',
		'disable_preloading_tooltip':'Don\'t show the preloading tooltip',
		'disable_search_tooltip':'Disable search shortcuts (text copy & key + click)',
		'enable_loading':'Display loading message',
		'enable_imdb_link':'Enable tooltip for IMDB links',
		'dont_use_imdb_api':'Don\'t use IMDB Api',
		'enable_allocine_link':'Enable tooltip for Allocine links',
		'enable_jeuxvideo_link':'Enable tooltip for Jeuxvideo links',
		'enable_jeuxactu_link':'Enable tooltip for Jeux Actu links',
		'enable_gamespot_link':'Enable tooltip for Gamespot links',
		'better_usenet_compatibility':'Better Usenet compatibility',
		
		'tooltip_options':'Tooltip options',
		'tooltip_h_pos':'Horizontal position',
		'tooltip_v_pos':'Vertical position',
		'tooltip_max_width':'Max width',
		'tooltip_max_height':'Max height',
		'tooltip_padding':'Padding',
		'tooltip_font_size':'Font size',
		'opacity':'Opacity',
		'color':'Color',
		'disable_tooltip_title':'Don\'t show tooltip title',
		
		'display_movie_info':'Display infos',
		'display_picture':'Picture',
		'picture_width':'Picture width',
		'movie_original_title':'Original Title',
		'display_rating_stars':'Rating (stars)',
		'display_rating_text':'Rating (text)',
		'display_rating_votes':'Votes',
		'add_separation':'Add a separation',
		'movie_runtime':'Runtime',
		'movie_director':'Director',
		'movie_writer':'Writers',
		'movie_actors':'Actors',
		'movie_plot':'Plot',
		'comment':'Comment',
		
		'display_minimized_info':'Display movie info (minimized version)',
		'display_title':'Title',
		'display_rating':'Rating',
		
		'rating_options':'Rating options',
		'display_imdb_rating_in_title':'Display IMDB rating with the title',
		'real_imdb_rating':'Get real IMDB rating (slower but more accurate)',
		'real_allocine_rating':'Get real Allocine rating (slower but more accurate)',
		'use_imdb_rating_instead_allocine':'Replace Allocine\'s rating by IMDB\'s rating',
		'display_rotten_info':'Add Rotten Tomatoes Info',
		'display_rotten_average':'Display Rotten Tomatoes average rating',
		'display_rotten_review':'Display Rotten Tomatoes review count',
		'real_rotten_info':'Get real Rotten Tomatoes data (slower but more accurate)',

		'external_links':'External links',
		'links_position':'Links position',

		'tooltip_position':'Tooltip position',
		'vertical':'Vertical',
		'horizontal':'Horizontal',
		'top':'Top',
		'bottom':'Bottom',
		'middle':'Middle',
		'right':'Right',
		'left':'Left',
		'center':'Center',
		'auto':'Auto',
		
		'move_up':'Move on top',
		'move_left':'Move on left side',
		'move_right':'Move on right side',
		'move_down':'Move on bottom',
		
		'arrows':'Arrows',
		'show_hide_arrows':'Show/Hide arrows',
		'show_hide_search':'Show/Hide search section',
		'show_hide_picture':'Show/Hide picture',
		
		'delete':'Delete',
		'reset':'Reset',
		'loading':'Loading',
		'refresh':'Refresh',
		'search':'Search',
		'setup':'Setup',
		'update':'Update',
		'no_update':'No update',
		'unavailable':'unavailable',
		'update_check':'Check for update',
		'last_update':'Last update',
		'last_check':'Last check',

		'save_position':'Save tooltip position for this website',
		'position_saved':'The tooltip position has been saved for this website',

		'saved_data':'saved data',
		'delete_cache':'Delete cache',
		'cache_deleted':'Cache deleted',
		'cache_empty':'The cache is empty',
		
		'click':'Click',
		'key_plus_click':'Key + Click',
		'hovering':'Hovering',
		'click_anywhere':'Click anywhere',
		'automatically':'Automatically',

		'get_imdb_rating':'Get IMDB rating',
		'get_real_imdb_rating':'Get real IMDB rating',
		'get_real_allocine_rating':'Get real Allocine rating',
		'get_rotten_info':'Get Rotten Tomatoes Info',
		'get_real_rotten_info':'Get real Rotten Tomatoes Info',

		'get_imdb_rating_error':'An error occured while fetching IMDB real rating. Try to refresh.',
		'get_real_imdb_rating_error':'An error occured while fetching IMDB real rating. Try to refresh.',
		'get_real_allocine_rating_error':'An error occured while fetching Allocine real rating. Try to refresh.',
		'get_rotten_info_error':'An error occured while fetching Rotten Tomatoes Info. Try to refresh.',
		'get_real_rotten_info_error':'An error occured while fetching real Rotten Tomatoes Info. Try to refresh.',

		'youtube_search':'Search on Youtube',
		'allocine_search':'Search on Allocine',
		'imdb_search':'Search on IMDB',
		'rotten_search':'Search on Rotten Tomatoes',
		'metacritic_search':'Search on Metacritic',
		'nzbplanet_search':'Search on NZBPlanet',
		'binsearch_search':'Search on Binsearch',
		'nzbclub_search':'Search on NZBClub',
		'piratebay_search':'Search on Piratebay',
		'opensubtitles_search':'Search on OpenSubtitles',
	});

	GM_trans.setTranslations('fr',{
		'main_options':'Options générales',
		'language':'Langue',
		'date_format':'Format de date',
		'date_separator':'Separateur de date',
		'hours_format':'Format de l\'heure',
		'update_alert':'Afficher un popup si une mise à jour est dispo',
		'update_delay':'Délai de vérification des mises à jour (jours)',
		
		'remove_redirection':'Supprimer les redirections (ex : http://anonym.to?)',
		'imdb_redirect':'Activer la redirection IMDB',
		'imdb_domain':'Domaine IMDB',
		'imdb_combined':'Vue détails combinés',
		
		'tooltip_behaviour':'Comportement du tooltip',
		'preload_info':'Charger les data au chargement de la page',
		'use_cache':'Mettre en cache les fiches visionnées',
		'how_to_show':'Manière d\'afficher le tooltip',
		'pressed_key':'Touche',
		'click_to_hide':'Cliquer n\'importe où pour cacher le tooltip',
		'disable_preloading_tooltip':'Ne pas afficher le tooltip de préchargement',
		'disable_search_tooltip':'Désactiver les raccourcis (copier du texte & touche + clique) de la recherche',
		'enable_loading':'Afficher le message de chargement',
		'enable_imdb_link':'Activer le tooltip pour les liens IMDB',
		'dont_use_imdb_api':'Ne pas utiliser IMDB Api',
		'enable_allocine_link':'Activer le tooltip pour les liens Allociné',
		'enable_jeuxvideo_link':'Activer le tooltip pour les liens Jeux Video',
		'enable_jeuxactu_link':'Activer le tooltip pour les liens Jeux Actu',
		'enable_gamespot_link':'Activer le tooltip pour les liens Gamespot',
		'better_usenet_compatibility':'Compatibilité avec Better Usenet',
		
		'tooltip_options':'Options du tooltip',
		'tooltip_h_pos':'Position horizontale',
		'tooltip_v_pos':'Position verticale',
		'tooltip_max_width':'Largeur maximale',
		'tooltip_max_height':'Hauteur maximale',
		'tooltip_padding':'Marge',
		'opacity':'Transparence',
		'color':'Couleur',
		'disable_tooltip_title':'Ne pas afficher le titre du tooltip',
		
		'display_movie_info':'Infos à afficher',
		'display_picture':'Image',
		'picture_width':'Largeur de l\'image',
		'movie_original_title':'Titre original',
		'display_rating_stars':'Note (étoiles)',
		'display_rating_text':'Note (texte)',
		'display_rating_votes':'Nombre de votes',
		'add_separation':'Ajouter une séparation',
		'movie_runtime':'Durée',
		'movie_director':'Réalisateur',
		'movie_writer':'Scénaristes',
		'movie_actors':'Acteurs',
		'movie_plot':'Intrigue',
		'comment':'Remarque',
		
		'display_minimized_info':'Info à afficher (version minimisé)',
		'display_title':'Titre',
		'display_rating':'Note',
		
		'rating_options':'Options des notes',
		'display_imdb_rating_in_title':'Afficher la note IMDB avec le titre',
		'real_imdb_rating':'Récupérer la vraie note IMDB (plus lent mais plus précis)',
		'real_allocine_rating':'Récupérer la vraie note Allociné (plus lent mais plus précis)',
		'use_imdb_rating_instead_allocine':'Remplacer la note Allociné par la note IMDB',
		'display_rotten_info':'Ajouter les data issues de Rotten Tomatoes',
		'display_rotten_average':'Afficher la note moyenne de Rotten Tomatoes',
		'display_rotten_review':'Afficher le nombre de critiques de Rotten Tomatoes',
		'real_rotten_info':'Récupérer les vraies data Rotten Tomatoes (plus lent mais plus précis)',

		'external_links':'Liens externes',
		'links_position':'Position des liens',
		
		'tooltip_position':'Position du tooltip',
		'vertical':'Verticale',
		'horizontal':'Horizontale',
		'top':'En haut',
		'bottom':'En bas',
		'middle':'Au milieu',
		'right':'A droite',
		'left':'A gauche',
		'center':'Au centre',
		'auto':'Auto',
		
		'move_up':'Déplacer vers le haut',
		'move_left':'Déplacer vers la gauche',
		'move_right':'Déplacer vers la droite',
		'move_down':'Déplacer vers le bas',
		
		'arrows':'Flèches',
		'show_hide_arrows':'Afficher/Cacher les flèches',
		'show_hide_search':'Afficher/Cacher la recherche',
		'show_hide_picture':'Afficher/Cacher l\'image',
		
		'delete':'Supprimer',
		'reset':'Réinitialiser',
		'loading':'Chargement',
		'refresh':'Actualiser',
		'search':'Recherche',
		'setup':'Configuration',
		'update':'Mettre à jour',
		'no_update':'Pas de mise à jour',
		'unavailable':'indisponible',
		'update_check':'Vérifier si Maj.',
		'last_update':'Dernière mise à jour',
		'last_check':'Dernière vérification',

		'save_position':'Sauvegarder la position du tooltip pour ce site',
		'position_saved':'La position du tooltip a été sauvegardé pour ce site',
		
		'saved_data':'fiches enregistrées',
		'delete_cache':'Supprimer le cache',
		'cache_deleted':'Cache supprimé',
		'cache_empty':'Le cache est vide',
		
		'click':'Clique',
		'key_plus_click':'Touche + Clique',
		'hovering':'Survol',
		'click_anywhere':'Cliquer n\'importe où',
		'automatically':'Automatiquement',
		
		'get_imdb_rating':'Récupérer la note IMDB',
		'get_real_imdb_rating':'Récupérer la vraie note IMDB',
		'get_real_allocine_rating':'Récupérer la vraie note Allocine',
		'get_rotten_info':'Récupérer les data Rotten Tomatoes',
		'get_real_rotten_info':'Récupérer les vraies data Rotten Tomatoes',

		'get_imdb_rating_error':'Une erreur est survenue lors de la récupération de la note IMDB. Essayez d\'actualiser.',
		'get_real_imdb_rating_error':'Une erreur est survenue lors de la récupération de la vraie note IMDB. Essayez d\'actualiser.',
		'get_real_allocine_rating_error':'Une erreur est survenue lors de la récupération de la vraie note Allocine. Essayez d\'actualiser.',
		'get_rotten_info_error':'Une erreur est survenue lors de la récupération des data Rotten Tomatoes. Essayez d\'actualiser.',
		'get_real_rotten_info_error':'Une erreur est survenue lors de la récupération des vraies data Rotten Tomatoes. Essayez d\'actualiser.',

		'youtube_search':'Recherche sur Youtube',
		'allocine_search':'Recherche sur Allocine',
		'imdb_search':'Recherche sur IMDB',
		'rotten_search':'Recherche sur Rotten Tomatoes',
		'metacritic_search':'Recherche sur Metacritic',
		'nzbplanet_search':'Recherche sur NZBPlanet',
		'binsearch_search':'Recherche sur Binsearch',
		'nzbclub_search':'Recherche sur NZBClub',
		'piratebay_search':'Recherche sur Piratebay',
		'opensubtitles_search':'Recherche sur OpenSubtitles',
	});
}

function initGMConfigMenu() {
	//Setting Language (if language not set yet, use EN)
	if (GM_config.read()['language'])
		GM_trans.setLang(GM_config.read()['language']);
	else
		GM_trans.setLang('en');

	/* Remove the 40% wasted space to the left */
	var configStyle = ".field_label {padding-left:10px;}";
	configStyle = configStyle.toString();

	GM_config.init('Movie Info Tooltip',
	{
		'language': {
			section : [GM_trans.lang('main_options')],
			label: GM_trans.lang('language'),
			type:'select',
			options:{'fr':'Français','en':'English'},
			default:'en'
		},
		'date_format': {
			label: GM_trans.lang('date_format'),
			type:'select',
			options:{'jjmmaaaa':'jjmmaaaa','mmjjaaaa':'mmjjaaaa','aaaammjj':'aaaammjj'},
			default:'jjmmaaaa'
		},
		'date_separator': {
			label: GM_trans.lang('date_separator'),
			type:'select',
			options:{'/':'/','-':'-','.':'.',' ':' '},
			default:'/'
		},
		'hours_format': {
			label: GM_trans.lang('hours_format'),
			type:'select',
			options:{'12h':'12h','24h':'24h'},
			default:'24h'
		},
		'update_alert': {
			label: GM_trans.lang('update_alert'), 
			type: 'checkbox',
			default: false
		},
		'update_delay': {
			label: GM_trans.lang('update_delay'), 
			type: 'text',
			default: 7
		},


		'remove_redirection': {
			section: ['Redirection'],
			label: GM_trans.lang('remove_redirection'), 
			type: 'checkbox',
			default: false
		},
		'imdb_redirect': {
			label: GM_trans.lang('imdb_redirect'), 
			type: 'checkbox',
			default: false
		},
		'imdb_domain': {
			label: GM_trans.lang('imdb_domain'), 
			type: 'select',
			options:{'www.imdb.com':'www.imdb.com','akas.imdb.com':'akas.imdb.com','www.imdb.fr':'www.imdb.fr'},
			default: 'www.imdb.com'
		},
		'imdb_combined': {
			label: GM_trans.lang('imdb_combined'), 
			type: 'checkbox',
			default: false
		},
		
		
		'preload_info': {
			section : [GM_trans.lang('tooltip_behaviour')],
			label: GM_trans.lang('preload_info'), 
			type: 'checkbox',
			default: true
		},
		'use_cache': {
			label: GM_trans.lang('use_cache'),
			type:'checkbox',
			default: true
		},
		'how_to_show': {
			label: GM_trans.lang('how_to_show'), 
			type: 'select',
			options:{'click':GM_trans.lang('click'), 'key':GM_trans.lang('key_plus_click'), 'mouseover':GM_trans.lang('hovering')},
			default: true
		},
		'pressed_key': {
			label: GM_trans.lang('pressed_key'), 
			type: 'select',
			options:{'Alt':'Alt', 'Ctrl':'Ctrl', 'Shift':'Shift'},
			default: 'Shift'
		},
		'click_to_hide': {
			label: GM_trans.lang('click_to_hide'), 
			type: 'checkbox',
			default: true
		},
		'disable_preloading_tooltip': {
			label: GM_trans.lang('disable_preloading_tooltip'), 
			type: 'checkbox',
			default: false
		},
		'disable_search_tooltip': {
			label: GM_trans.lang('disable_search_tooltip'), 
			type: 'checkbox',
			default: false
		},
		'enable_loading': {
			label: GM_trans.lang('enable_loading'), 
			type: 'checkbox',
			default: true
		},
		'enable_imdb_link': {
			label: GM_trans.lang('enable_imdb_link'), 
			type: 'checkbox',
			default: true 
		},
		'dont_use_imdb_api': {
			label: GM_trans.lang('dont_use_imdb_api'), 
			type: 'checkbox',
			default: true 
		},
		'enable_allocine_link': {
			label: GM_trans.lang('enable_allocine_link'), 
			type: 'checkbox',
			default: true 
		},
		'enable_jeuxvideo_link': {
			label: GM_trans.lang('enable_jeuxvideo_link'), 
			type: 'checkbox',
			default: true 
		},
		'enable_jeuxactu_link': {
			label: GM_trans.lang('enable_jeuxactu_link'), 
			type: 'checkbox',
			default: true 
		},
		'enable_gamespot_link': {
			label: GM_trans.lang('enable_gamespot_link'), 
			type: 'checkbox',
			default: true 
		},
		'better_usenet_compatibility': {
			label: GM_trans.lang('better_usenet_compatibility'), 
			type: 'checkbox',
			default: false 
		},
		
		
		'tooltip_v_pos': {
			section : [GM_trans.lang('tooltip_options')],
			label: GM_trans.lang('tooltip_v_pos'), 
			type: 'select',
			options:{'top':GM_trans.lang('top'),'bottom':GM_trans.lang('bottom'),'auto':GM_trans.lang('auto')},
			default: 'top' 
		},
		'tooltip_h_pos': {
			label: GM_trans.lang('tooltip_h_pos'), 
			type: 'select',
			options:{'left':GM_trans.lang('left'),'right':GM_trans.lang('right'),'auto':GM_trans.lang('auto')},
			default: 'left' 
		},
		'tooltip_max_width': {	
			label: GM_trans.lang('tooltip_max_width'), 
			type: 'select',
			options:{'20%':'20%','30%':'30%','40%':'40%','50%':'50%'},
			default: '50%' 
		},
		'tooltip_max_height': {	
			label: GM_trans.lang('tooltip_max_height'), 
			type: 'select',
			options:{'20%':'20%','30%':'30%','40%':'40%','50%':'50%','60%':'60%','70%':'70%','80%':'80%'},
			default: '50%' 
		},
		'tooltip_padding': {	
			label: GM_trans.lang('tooltip_padding'), 
			type: 'select',
			options:{'0px':'0px','5px':'5px','10px':'10px','15px':'15px','20px':'20px'},
			default: '5px' 
		},
		'tooltip_font_size': {	
			label: GM_trans.lang('tooltip_font_size'), 
			type: 'select',
			options:{'10px':'10px','12px':'12px','14px':'14px','16px':'16px','18px':'18px','20px':'20px'},
			default: '14px' 
		},
		'tooltip_opacity': {
			label: GM_trans.lang('opacity'), 
			type: 'select',
			options:{'0.5':'0.5','0.6':'0.6','0.7':'0.7','0.8':'0.8','0.9':'0.9','1.0':'1.0'},
			default: '1.0'
		},
		'tooltip_color': {
			label: GM_trans.lang('color'), 
			type: 'text',
			default: '#FFFFFF'
		},
		'disable_tooltip_title': {
			label: GM_trans.lang('disable_tooltip_title'), 
			type: 'checkbox',
			default: false
		},
		
		
		'display_picture': {
			section : [GM_trans.lang('display_movie_info')],
			label: GM_trans.lang('display_picture'), 
			type: 'checkbox',
			default: true 
		},
		'picture_width': {
			label: GM_trans.lang('picture_width'), 
			type: 'select',
			options:{96:'96px',128:'128px',160:'160px',192:'192px'},
			default: 128
		},
		'movie_original_title': {
			label: GM_trans.lang('movie_original_title'), 
			type: 'checkbox',
			default: true 
		},
		'display_rating_stars': {
			label: GM_trans.lang('display_rating_stars'), 
			type: 'checkbox',
			default: true
		},
		'display_rating_text': {
			label: GM_trans.lang('display_rating_text'), 
			type: 'checkbox',
			default: true
		},
		'display_rating_votes': {
			label: GM_trans.lang('display_rating_votes'), 
			type: 'checkbox',
			default: true
		},
		'add_separation': {
			label: GM_trans.lang('add_separation'), 
			type: 'checkbox',
			default: true
		},
		'movie_runtime': {
			label: GM_trans.lang('movie_runtime'), 
			type: 'checkbox',
			default: true 
		},
		'movie_genre': {
			label: 'Genre', 
			type: 'checkbox',
			default: true 
		},
		'movie_director': {
			label: GM_trans.lang('movie_director'), 
			type: 'checkbox',
			default: true 
		},
		'movie_writer': {
			label: GM_trans.lang('movie_writer'), 
			type: 'checkbox',
			default: true 
		},
		'movie_actors': {
			label: GM_trans.lang('movie_actors'), 
			type: 'checkbox',
			default: true 
		},
		'movie_plot': {
			label: GM_trans.lang('movie_plot'), 
			type: 'checkbox',
			default: true 
		},
		'last_update': {
			label: GM_trans.lang('last_update'), 
			type: 'checkbox',
			default: true
		},
		  

		'minimized_picture': {
			section : [GM_trans.lang('display_minimized_info')],
			label: GM_trans.lang('display_picture'), 
			type: 'checkbox',
			default: true 
		},
		'minimized_picture_width': {
			label: GM_trans.lang('picture_width'), 
			type: 'select',
			options:{96:'96px',128:'128px',160:'160px',192:'192px'},
			default: 128
		},
		'minimized_rating': {
			label: GM_trans.lang('display_rating'), 
			type: 'checkbox',
			default: true
		},
		'minimized_links': {
			label: GM_trans.lang('external_links'), 
			type: 'checkbox',
			default: true
		},
		
				
		'display_imdb_rating_in_title': {
			section: [GM_trans.lang('rating_options')],
			label: GM_trans.lang('display_imdb_rating_in_title'), 
			type: 'checkbox',
			default: false
		},
		'use_imdb_rating_instead_allocine': {
			label: GM_trans.lang('use_imdb_rating_instead_allocine'), 
			type: 'checkbox',
			default: false 
		},
		'real_imdb_rating': {
			label: GM_trans.lang('real_imdb_rating'), 
			type: 'checkbox',
			default: false
		},
		'real_allocine_rating': {
			label: GM_trans.lang('real_allocine_rating'), 
			type: 'checkbox',
			default: false
		},
		'display_rotten_info': {
			label: GM_trans.lang('display_rotten_info'), 
			type: 'checkbox',
			default: false 
		},
		'display_rotten_average': {
			label: GM_trans.lang('display_rotten_average'), 
			type: 'checkbox',
			default: false  
		},
		'display_rotten_review': {
			label: GM_trans.lang('display_rotten_review'), 
			type: 'checkbox',
			default: false  
		},
		'real_rotten_info': {
			label: GM_trans.lang('real_rotten_info'), 
			type: 'checkbox',
			default: false  
		},
		
		
		'links_position': {
			section: [GM_trans.lang('external_links')],
			label: GM_trans.lang('links_position'), 
			type: 'select',
			options:{'top':GM_trans.lang('top'),'middle':GM_trans.lang('middle'),'bottom':GM_trans.lang('bottom'),'left':GM_trans.lang('left'),'center':GM_trans.lang('center'),'right':GM_trans.lang('right')},
			default: 'bottom'
		},
		'display_youtube_link': {
			label: 'Youtube', 
			type: 'checkbox',
			default: true  
		},
		'display_imdb_link': {
			label: 'IMDB',
			type: 'checkbox',
			default: true  
		},
		'display_allocine_link': {
			label: 'Allocine', 
			type: 'checkbox',
			default: true  
		},
		'display_rotten_link': {
			label: 'Rotten Tomatoes',
			type: 'checkbox',
			default: true  
		},
		'display_metacritic_link': {
			label: 'Metacritic',
			type: 'checkbox',
			default: true  
		},
		'display_jeuxvideo_link': {
			label: 'jeuxvideo.com',
			type: 'checkbox',
			default: true  
		},
		'display_gamespot_link': {
			label: 'Gamespot',
			type: 'checkbox',
			default: true  
		},
		'display_nzbplanet_link': {
			label: 'NZBPlanet',
			type: 'checkbox',
			default: true  
		},
		'display_binsearch_link': {
			label: 'Binsearch',
			type: 'checkbox',
			default: true  
		},
		'display_nzbclub_link': {
			label: 'NZBClub',
			type: 'checkbox',
			default: true  
		},
		'display_piratebay_link': {
			label: 'Piratebay',
			type: 'checkbox',
			default: true  
		},
		'display_subscene_link': {
			label: 'Subscene',
			type: 'checkbox',
			default: true  
		},
		'display_opensubtitles_link': {
			label: 'OpenSubtitles',
			type: 'checkbox',
			default: true  
		},
		'display_google_link': {
			label: 'Google',
			type: 'checkbox',
			default: true  
		},
		
	},
	configStyle,
	{
		open: function()
		{
			MGIT_tooltip.style.visibility = 'hidden';
			MGIT_minimized_tooltip.style.visibility = 'hidden';
			show_setup = true;
		},
		save: function()
		{ 
			location.reload();
			show_setup = false;
		},
		close: function()
		{
			refreshTooltip();
			show_setup = false;
		}
	});

	GM_registerMenuCommand(script_name, GM_config.open);
}