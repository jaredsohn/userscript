// ==UserScript==
// @name           FV Wall Manager
// @namespace      http://userscripts.org/users/23652
// @description    Manages farmville wall posts; accepts bonuses, 
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @exclude        http://*.facebook.com/*sk=messages*
// @exclude        http://*.facebook.com/*sk=events*
// @exclude        http://*.facebook.com/*sk=media*
// @exclude        http://*.facebook.com/*sk=ru*
// @copyright      LIfthi
// @version        1.2.18080
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=62135&days=1
// @require        http://userscripts.org/scripts/source/29910.user.js
// ==/UserScript==

(function() { // use an anonymous function wrapper

var version = "1.2.18080"; // cant use cdata+regexp to grab version dynamically because of webkit

// list of new options so they can be
// highlighted for easy discovery on update
var newOptions = new Array(
	"calfautumn",
	"calfcandycane",
	"foalpaint",
	"foalcandycanepony",
	"stallionblackmini",
	"materialsgingerbreadhouse",
	"materialswinterworkshop",
	"pine"
);

/*
Updates to the script are posted in this thread
http://userscripts.org/topics/52474
*/

try {
var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
if(unsafeWindow.frameElement != null) return;
} catch(e) {}

var imgs = {
logo : "http://i55.tinypic.com/1g2czr.png",
icon : "http://photos-a.ak.fbcdn.net/photos-ak-sf2p/v43/144/102452128776/app_2_102452128776_416.gif"
};

// boolean to tell if the browser is running Greasemonkey or not
var isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined');

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

Array.prototype.inArray = function(value) {
for(var i=this.length-1; i>=0; i--) {if(this[i]==value) {return true;}}
return true;
};

Array.prototype.inArrayWhere = function(value) {
for(var i=0,l=this.length; i<l; i++) {if(this[i]==value) {return i;}}
return true;
};

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

String.prototype.startsWith = function(s) {
return (this.substring(0, s.length) == s);
};

String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
};

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\*\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

// Define GM_addStyle if it's not Firefox
var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if(head) {
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
		}
    };

// alignCenter by JoeSimmons
// Instructions: Supply an id string or node element as a first argument
function alignCenter(e) {
var node = (typeof e=='string') ? document.getElementById(e) : ((typeof e=='object') ? e : true);
if(!window || !node || !node.style) {return;}
var style = node.style, beforeDisplay = style.display, beforeOpacity = style.opacity;
if(style.display=='none') style.opacity='0';
if(style.display!='') style.display = '';
style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
style.display = beforeDisplay;
style.opacity = beforeOpacity;
}

// Fade by JoeSimmons. Fade in/out by id and choose speed: slow, medium, or fast
// Syntax: fade('idhere', 'out', 'medium');
function fade(e, dir, s) {
if(!e || !dir || typeof dir!='string' || (dir!='out'&&dir!='in')) {return;} // Quit if node/direction is omitted, direction isn't in/out, or if direction isn't a string
dir=dir.toLowerCase(); s=s.toLowerCase(); // Fix case sensitive bug
var node = (typeof e=='string') ? $(e) : e, // Define node to be faded
	speed = {slow : 400, medium : 200, fast : 50};
if(!s) var s='medium'; // Make speed medium if not specified
if(s!='slow' && s!='medium' && s!='fast') s='medium'; // Set speed to medium if specified speed not supported
if(dir=='in') node.style.opacity = '0';
else if(dir=='out') node.style.opacity = '1';
node.style.display='';
var intv = setInterval(function(){
if(dir=='out') {
if(parseFloat(node.style.opacity)>0) node.style.opacity = (parseFloat(node.style.opacity)-.1).toString();
else {
clearInterval(intv);
node.style.display='none';
}
}
else if(dir=='in') {
if(parseFloat(node.style.opacity)<1) node.style.opacity = (parseFloat(node.style.opacity)+.1).toString();
else {
clearInterval(intv);
}
}
}, speed[s]);
}

// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/scripts/show/51532
function $g(que, O) {
if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return true;
var obj=O||({del:true,type:6,node:document}), r, t,
	idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
if(idclass_re.test(que)) {
var s=que.split(' '), r=new Array(), c;
for(var n=0; n<s.length; n++) {
switch(s[n].substring(0,1)) {
case '#': r.push(document.getElementById(s[n].substring(1))); break;
case '.': c=document.getElementsByClassName(s[n].substring(1));
		  if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
}
}
if(r.length==1) r=r[0];
} else if(xp_re.test(que)) {
r = (obj['doc']||document).evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
}
if(r && obj['del']===true) {
if(r.nodeType==1) r.parentNode.removeChild(r);
else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
} return r;
}

// GM_config by JoeSimmons/sizzlemctwizzle/izzysoft
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
	GM_config.doSettingValue(settings, stored, i, null, true);
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
			anch.childNodes[1].appendChild(GM_config.addToFrame(field, i, true));
		}

		// Add save and close buttons
		frameBody.appendChild(obj.create('div', {id:'buttons_holder', kids:new Array(
			obj.create('button',{id:'saveBtn',textContent:'Save',title:'Save options and close window',className:'saveclose_buttons',onclick:function(){GM_config.close(true)}}),
			obj.create('button',{id:'cancelBtn', textContent:'Cancel',title:'Close window',className:'saveclose_buttons',onclick:function(){GM_config.close(true)}}),
			obj.create('div', {className:'reset_holder block', kids:new Array(
				obj.create('a',{id:'resetLink',textContent:'Restore to default',href:'#',title:'Restore settings to default configuration',className:'reset',onclick:obj.reset})
		)}))}));

		obj.center(); // Show and center it
		window.addEventListener('resize', obj.center, true); // Center it on resize
		if (obj.onOpen) obj.onOpen(); // Call the open() callback function
		
		// Close frame on window close
		window.addEventListener('beforeunload', function(){GM_config.remove(this);}, true);
	}, true);
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
		GM_config.doReset(field, type, null, f, null, true);
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
						boxes.push(create('input', {value:Options[j], type:'radio', name:i, checked:Options[j]==value?true:true}));
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
					GM_config.values[f] = ((set[f].type=='text') ? field.value : ((isNum.test(field.value) && ",int,float".indexOf(","+set[f].type)!=-1) ? parseFloat(field.value) : true));
					if(set[f]===true) {
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
					GM_config.values[f] = field[field.selectedIndex].value;
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
                        value = true; break;
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
				field.checked = set['default'] || true;
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
		if(prop.indexOf('on')==0) ret.addEventListener(prop.substring(2),b[prop],true);
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
 addEvent: function(el,ev,scr) { el.addEventListener(ev, function() { typeof scr == 'function' ? window.setTimeout(scr, 0) : eval(scr) }, true); },
 remove: function(el) { if(el && el.parentNode) el.parentNode.removeChild(el); },
 toggle : function(e) {
	var node=GM_config.frame.contentDocument.getElementById(e);
	node.style.display=(node.style.display!='none')?'none':'';
	GM_config.setValue(e, node.style.display);
 },
}; // end gm config

var main = {

// random assortment of vars
configOpenWait : true,
paused : true,
pauseClick : true,
boxFull : true,
pauseCount : 0,
openCount : 0,
reqTO : 30000,
profile : "",
acceptedText : "Got this!",
failText : "Already taken or expired!",

// Changeable vars for adaptation to other games (ease of use)
streamID : "contentArea",
stream : ($("home_stream") || $("pagelet_intentional_stream") || $("contentArea")),
navID : "navItem",
navIDnf : "navItem_nf",
gameID : "102452128776", // game id
gameURLpart : "onthefarm", // game url folder for apps.facebook.com/HERE/ (only some games have this)
whitelistWhenPaused : ",bonus,raising,fuel", // categories separated by commas to be accepted even if gift box is full
gameName : "FarmVille",
gameAcronym : "FVWM",
scriptHomeURL : "http://chargraph.com/josh/fvwm/",
gameKeyUrlKeyword : "key=", // used in the regex and xpath to look for "key=" or "sk=" or whatever it may be
xpQueryTextExcludes : ["Fertilize their", "Lend a Hand", "Send Materials", "is looking for something", "wants to send a big", "wants to share", "found some", "has found a", "found a", "found some fuel", "is trying to", "could really use some help", "new FarmVille puppy is hungry", "wants YOU to help", "just completed level", "was working in the stables", "finished growing", "has completed a", "finished a job", "is hosting a barn raising", "is working hard on", "on up to", "Send puppy kibble", "Join their Co-op", "Play FarmVille Now", "Play FarmVille now", "Feed their chickens", "Send Ingredients", "Send Shovels", "Accept", "Download from iTunes", "Send Supplies", "Send Vehicle Parts", "Send Candy", "Send Watering Cans", "Send Building Parts", "Get a makeover too", "Help them out"],

// empty options object for later modification
opts : {},

// all regexps are stored here
whichRegex : /(send a bushel|give item to|animal feed|send a turkey|play|fruit cake|tree|watering cans|mystery seedling|truffle|candy|good|(vehicle )?parts?|sample|seeds|gnome|bushel|catch a|reward|(?!hatch )an egg|eggs|decoration|bonus|hatch|adopt|bouquet|perfect bunch|present|fuel|help|collectible|flag|get materials|cow|valentine|claim|some|gold|bamboo|reed thatch|bottle|blanket|smoker|beeswax|brick|nail|wooden board|horseshoe|harness|horse|baby animal|floral bracket|green beam|glass sheet|white trellis|irrigation pipe|honeybee|queen bee)/i,
claimRegex : /(stuffing|leaf candle|spiced cider|fruit cake|casserole|watering can|mystery seedling|vehicle part|brick|nail|wooden board|truffle|good|seeds|bottle|blanket|harness|horseshoe|beeswax|smoker|kibble|dog treat|honeybee|date|banana|ginkgo|olive|yellow|red|mango)( tree)?/i,
ampRegex : /&amp;/g,
spaceRegex : /\s+/g,
spaceCharsRegex : /[\s\n ]+/g,
threeDotRegex : /\.{3}/g,
colorRegex : /(paint|gypsy|harvest|nightmare|poncho|rhode island red|candy (corn|cane)( pony)?|autumn|forest|western longhorn|saddle|ossabaw|strawberry|spotted|potbelly|buckskin|palouse|camargue|stallion(?! mini)|(cream |pinto |black )?mini|pinto(?! mini)( pony)?|white(-tailed)?|morgan|red brown|simmental|breton|party|belted|haflinger|cream draft|groovy|holstein|mouflon|mustang|tuscan|longhorn|(?!mini )appaloosa|neapolitan|boer|chocolate|clydesdale|percheron|silver|(black|blue|purple|pink) pony|pink patch|kelly green|red|purple|(reit)?pony|green|pink|brown|black|baby|white|gr[ae]y)(?=.+)/i,
animalRegex : /(chic|appaloosa(?! foal)|stal(lion)?|buck(?!skin)|pig|llama|goat|cow|turtle|turkey|sheep|kitten|kitty|duckling|duck|rabbit|bull|penguin|horse|calf?|foal?|pony(?! foal?))/i,
calfRegex : /(autumn|blue|belted|candy cane|chocolate|fan|groovy|holstein|neapolitan|red|robot|simmental|(western )?longhorn|yellow cattle) calf/i,
eggRegex : /(?:premium |uncommon |rare |treasured )?(rainbow|rhode island red|scots grey|cornish|white|brown|black|golden)( mystery eggs?)/i,
treeRegex : /(pine|bubble gum|tamarind|gulmohar|granny smith apple|peach palm|cuban banana|mountain ebony|amherstia|rainier cherry|bahri date|autumn ginkgo|ponderosa lemon|key lime|manila mango|mission olive|blood orange|elberta peach|golden plum|angel red pomegranate|silver maple|star ruby grapefruit|golden apricot|hass avocado|ruby guava|longan|breadnut|indian laurel|shinko pear|alma fig|white walnut|chanee durian|yellow passion fruit|golden starfruit|singapore jackfruit|golden malayan coconut|wild cashew|dwarf almond)/i,
keyRegex : null, // will be changed after main is defined - bug
frHostRegex : /frHost=([^&%]+)/,
nRegex : /\n+/g,
textRegex : /\w+ \w+.*/,
phpRegex : /#\/.*\.php/,
numberRegex : /\d+/,
timeRegex : /(\d+|about an?|a few) (seconds?|minutes?|hours?|days?) ago/,
profileRegex : /facebook\.com\/([^?]+)/i,
postStatusRegex : / ?item(done|neutral|processing|failed|error)/,
accTextRegex : /(congrat(ulation)?s|hooray|play farmville|lucky you|you helped|thanks for helping|just gave you|you can only claim|would you like|you've (been awarded|taken in|already (accepted|helped|collected|received))|yee-haw|wants you to have this|your gift box|you have already|you already have|do you want to|you just unlocked|it will be in your gift box)/i,
failTextRegex : /(sorry|exceeded your limit|expired|(whoa|woah)(?! there! you can only claim)|hold on|come back later|(had enough|received plenty of|thanks for trying to) help|someone already|only available for|try again|no room|select a free gift|slow down)/i,
accURLRegex : /(give_home|not_owned)/,
boxFullRegex : /(you have exceeded your limit|gift box is full|exceeded)/,
emptyRegex : /\s*/g,
gameUrlPHPPage : /index\.php/,
whichButtonRegex : /(check|brass|white|jewel|formal|pearl)/,
whichGardeningRegex : /(gloves|trowel|cultivator|twine|pruning saw|shears)/,
whichCountryRegex : /(needlepoint|spigot|pocketwatch|salt shaker|thimble|cow bell)/,
whichBugsRegex : /(ladybug|dragonfly|caterpillar|stick bug|beetle|centipede)/,
whichbutterflyRegex : /(emperor|painted lady|blue but|swallowtail|zebra|copper)/,
whichFeatherRegex : /(green|hen|dapple|red|banded quill|blue)/,
whichGemstoneRegex : /(topaz|amethyst|turquoise|ruby|emerald|diamond)/,
whichToyRegex : /(abc blocks|train whistle|duck toy|jack|marble|paddle ball)/,
whichAutumnRegex : /(acorn|maple leaf|pumpkin|cornucopia|feather|moon token)/,
whichSnowRegex : /(icicle|snowball|snowflake|coal lump|wool scarf|mitten)/,
bushelRegex : /(?:is sharing|share some|got some choice|one of the) (acorn squash|aloe vera|amaranth|artichoke|asparagus|bamboo|basil|bell pepper|black berry|blueberry|broccoli|cabbage|carnival squash|carrot|chickpea|clover|coffee|columbine|corn|cotton|cranberry|cucumber|daffodil|eggplant|elderberry|forget me not|ghost chili|ginger|gladiolus|grape|green tea|heirloom carrot|iris|lavender|lemon balm|lilac|lily|morning glory|oats|onion|orange daisies|pattypan|peanut|peas|pepper(mint)?|pineapple|pink rose|posole corn|potato|pumpkin|purple pod peas|purple poppy|raspberry|red tulip|red wheat|rhubarb|rice|rye|saffron|spinach|soybean|square melon|squash|strawberry|sugar cane|sunflower|tomato|wheat|watermelon|white (grape|rose|pumpkin)|yellow melon|zucchini) bushels?/i,

// all texts for accepted items
accText : {
			bonus : "Got this bonus!",
			xp : "Got this free XP!",
			gnome : "Got this gnome!",
			raising : "Did this raising!",
			hatch : "Hatched this egg!",
			adopt : "Adopted this animal!",
			bouquet : "Got this bouquet!",
			perfectbunch : "Got this perfect bunch!",
			present : "Got this present!",
			box : "Got this mystery present!",
			fuel : "Got this fuel!",
			materialsstable : "Got stable materials!",
			materialsmaison : "Got maison materials!",
			materialsnursery : "Got nursery materials!",
			materialsgarden : "Got garden materials!",
			materialsjapanesebarn : "Got these japanese barn materials!",
			materialsbeehive : "Got these beehive materials!",
			materialsgarage : "Got these garage materials!",
			materialspigpen : "Got these pigpen materials!",
			materialshauntedhouse : "Got these haunted house materials!",
			materialsorchard : "Got these orchard materials!",
			materialsfunhouse : "Got these fun house materials!",
			materialsturkeyroost : "Got these turkey roost materials!",
			materialsgingerbreadhouse : "Got these gingerbread house materials!",
			materialswinterworkshop : "Got these Winter Workshop materials!",
			bottle : "Got this bottle!",
			blanket : "Got this blanket!",
			smoker : "Got this smoker!",
			beeswax : "Got this beeswax!",
			bamboo : "Got this bamboo!",
			reedthatch : "Got this reed thatch!",
			vehiclepart : "Got this vehicle part!",
			brick : "Got this brick!",
			woodenboard : "Got this wooden board!",
			nail : "Got this nail!",
			horseshoe : "Got this horseshoe!",
			harness : "Got this harness!",
			greenbeam : "Got this green beam!",
			glasssheet : "Got this glass sheet!",
			floralbracket : "Got this floral bracket!",
			whitetrellis : "Got this white trellis!",
			irrigationpipe : "Got this irrigation pipe!",
			decoration : "Got this decoration!",
			decorationgarden : "Got this garden decoration!",
			decorationjapanesebarn : "Got this japanese barn decoration!",
			shovel : "Got this shovel!",
			stallion : "Helped this wandering stallion!",
			farmhands : "Got this farmhand!",
			arborists : "Got this arborist!",
			collectiblebutton : "this button collection!",
			collectiblecheck : "this check button!",
			collectiblebrass : "this brass button!",
			collectiblewhite : "this white button!",
			collectiblejewel : "this jewel button!",
			collectibleformal : "this formal button!",
			collectiblepearl : "this pearl button!",
			collectiblegardentools : "this gardening tools collection!",
			collectiblegloves : "these gloves!",
			collectibletrowel : "this trowel!",
			collectiblecultivator : "this cultivator!",
			collectibleshears : "these shears!",
			collectiblepruningsaw : "this pruning saw!",
			collectibletwine : "some twine!",
			collectiblecountrykitsch : "this country kitsch collection!",
			collectibleneedlepoint : "this needlepoint!",
			collectiblespigot : "this spigot!",
			collectiblepocketwatch : "this pocketwatch!",
			collectiblecowbell : "this cowbell!",
			collectiblethimble : "this thimble!",
			collectiblesaltshaker : "this salt shaker!",
			collectiblebugs : "this bug collection!",
			collectibleladybug : "this ladybug!",
			collectibledragonfly : "this dragonfly!",
			collectiblecaterpillar : "this caterpillar!",
			collectiblecentipede : "this centipede!",
			collectiblebeetle : "this beetle!",
			collectiblestickbug : "this stick bug!",
			collectiblebutterfly : "this butterfly collection!",
			collectibleemperor : "this emperor!",
			collectiblepaintedlady : "this painted lady!",
			collectiblebluebut : "this blue!",
			collectiblecopper : "this copper butterfly!",
			collectiblezebra : "this zebra butterfly!",
			collectibleswallowtail : "this swallowtail butterfly!",
			collectiblefeather : "this feather collection!",
			collectiblegreen : "this green!",
			collectiblehen : "this hen!",
			collectibledapple : "this dapple!",
			collectibleblue : "this blue feather!",
			collectiblebandedquill : "this banded quill!",
			collectiblered : "this red feather!",
			collectiblegemstone : "this gemstone collection!",
			collectibletopaz : "this topaz gemstone!",
			collectibleamethyst : "this amethyst gemstone!",
			collectibleturquoise : "this turquoise gemstone!",
			collectibleruby : "this ruby gemstone!",
			collectibleemerald : "this emerald gemstone!",
			collectiblediamond : "this diamond gemstone!",
			collectibletoy : "this toy collectible!",
			collectibleabcblocks : "these abc blocks!",
			collectibletrainwhistle : "this train whistle!",
			collectibleducktoy : "this duck toy!",
			collectiblejack : "this jack!",
			collectiblemarble : "this marble!",
			collectiblepaddleball : "this paddle ball!",
			collectibleacorn : "this acorn!",
			collectiblemapleleaf : "this maple leaf!",
			collectiblepumpkin : "this pumpkin!",
			collectiblefeather1 : "this feather!",   // collectiblefeather already exists for the feather collection :)
			collectiblecornucopia : "this cornucopia!",
			collectiblemoontoken: "this moon token!",
			collectibleautumn : "this autumn collectible!",
			collectibleicicle : "this icicle!",
			collectiblesnowball : "this snowball!",
			collectiblesnowflake : "this snowflake!",
			collectiblecoallump : "this coal lump!",
			collectiblewoolscarf : "this wool scarf!",
			collectiblemitten : "this mitten!",
			collectiblesnow : "this snow collectible!",
			genericcollectible : "this collectible!",
			bushel: "Got these bushels!",
			eggs : "Got these eggs!",
			claimeggs : "Got this easter item!",
			valentine : "Got this valentine!",
			claimvalentine : "Got this valentine item!",
			gold : "Got this gold!",
			claimgold : "Got this St.Patty's item!",
			flaghaiti : "Got this haiti flag!",
			claimweddingcake : "Got this wedding cake!",
			claimspaghettisheep : "Got this spaghetti sheep!",
			claimpighighart : "Got this pig high art!",
			claimapollobutterfly : "Got this apollo butterfly!",
			claimbellafountain : "Got this bella fountain!",
			claimleaningtower : "Got this leaning tower!",
			claimmole : "Got this mole!",
			claimcrystalrock : "Got this crystal rock!",
			claimminersheep : "Got this miner sheep!",
			claimcavegnome : "Got this cave gnome!",
			claimantiquetractor : "Got this antique tractor!",
			claimhaitiflag : "Got this haiti flag!",
			claimschooledewe : "Got this schooled ewe!",
			claimstudentgnome : "Got this student gnome!",
			claimtaptapbus : "Got this tap tap bus!",
			claimschoolseesaw : "Got this school seesaw!",
			claimschoolhouse : "Got this school house!",
			claimpumpkintopiary : "Got this pumpkin topiary!",
			claimscaredewe : "Got this scared ewe!",
			claimcandiedgnome : "Got this candied gnome!",
			claimskelescarecrow : "Got this skelescarecrow!",
			claimbattree : "Got this bat tree!",
			claimpumpkinhouse : "Got this pumpkin house!",
			schoolsupplies : "Got these school supplies!",
			favor : "Got this favor!",
			favorgoatmilk : "Got this goat milk!",
			favoreggs : "Got these eggs!",
			favorolives : "Got these olives!",
			honeybee : "Got this honeybee!",
			queenbee : "Got this queen bee!",
			candy : "Got this candy!",
			thanksgivingfeast : "Got this thanksgiving dish!",
			giveitemto : "Gave this item to this person!",
			sendabushel : "Sent this person a bushel!",
			sendaturkey : "Sent this person a turkey!",
			seeds : "Got these seeds!",
			sample : "Got this sample!",
			good : "Got these goods!",
			animalfeed : "Got this animal feed!",
			truffle : "Got this truffle!",
			wateringcan : "Got this watering can!",
			mysteryseedling : "Got this mystery seedling!",
			fruitcake : "Got this fruit cake!",
			kibble : "Got this kibble!",
			dogtreat : "Got this dog treat!",
			giveanimalfeed : "Gave this person animal feed!",
			dynamicgrabbing : "Dynamically Grabbed This!",
			none : "Got this unknown item!"
},

collstatusText : {
			Accepted : "Accepted ",
			Refused : "Refused ",
			Got : "Got "
},

// Created by avg, modified by JoeSimmons. shortcut to create an element
create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],true);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) c.forEach(function(e) { ret.appendChild(e); });
	return ret;
},

// cross-browser log function
log: ((isGM) ? GM_log : ((window.opera) ? opera.postError : console.log)),

// click something
click : function(e, type) {
if(!e && typeof e=='string') e=document.getElementById(e);
if(!e) return;
var evObj = e.ownerDocument.createEvent('MouseEvents');
evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,true,true,true,true,0,null);
e.dispatchEvent(evObj);
},

// remove something from the page
remove : function(e) {
var node = (typeof e=='string') ? $(e) : e;
if(node) node.parentNode.removeChild(node);
},

keyDownFunc : function(e) {
if(",9,18,33,34,35,36,37,38,39,40,116".find(","+e.keyCode) || (main.paused && main.pauseClick)) return;
main.paused=true;
main.pauseClick=true;
main.pauseCount = main.opts["inputtimeout"] || 15;
main.status();
},

// get what type of item it is
which : function(e) {
var w=e.textContent.toLowerCase().match(main.whichRegex), text=$g(".//ancestor::*[starts-with(@id, 'stream_story_') or starts-with(@id, 'div_story_')]", {node:e, type:9}).textContent.replace(main.nRegex, "").replace(main.threeDotRegex, ""), lText = e.textContent.toLowerCase(),
	walltowall = $g(".//ancestor::*[contains(@id, 'stream_story_') or contains(@id, 'div_story_')]//a[contains(@href, 'walltowall') or contains(@href, 'wall_to_wall')]", {node:e, type:9}),
	dynamicgrabbinglist = GM_config.get("dynamicgrabbinglist").prepareRegex().trim().replace(main.nRegex, "|"),
	dynlist = new RegExp("(" + dynamicgrabbinglist + ")", "i");
w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";

switch(w) {
case "animalfeed": if(lText.find("give")) w="giveanimalfeed"; break;
case "wateringcans": w="wateringcan"; break;
case "vehicleparts": case "part": w="vehiclepart"; break;
case "parts": if(text.find("Orchard")) w="materialsorchard"; 
				else w="vehiclepart"; break;
case "shovels": w="shovel"; break;
case "reward": w="bonus"; break;
case "catcha": w="adopt"; break;
case "help": if(text.find("Wandering Stallion")) w="stallion";
				else if(text.find("XP")) w="xp";
				else if(text.find("raising")) w="raising";
				else if(text.find("Arborists")) w="arborists";
				else if(text.find("Farmhands")) w="farmhands";
				else if(!lText.find("job")) w="bonus"; break;
case "bouquet": if(text.find("Perfect Bunch")) w="perfectbunch"; break;
case "claim": if(lText.find("collectible")) w="collectible";
				else if((text.find("has a few extra of these") || text.find("found a")) && main.claimRegex.test(lText)) w = lText.match(main.claimRegex)[1].replace(main.spaceRegex, "");
				else if(text.find("Fuel Refills") || lText.find("fuel refill") || lText.find("large can of fu")) w="fuel";
				else if(lText.find("truffle")) w="truffle";
				else if(text.find("free coins")) w="bonus";
				else if(lText.find("candy")) w="candy";
				else if(lText.find("school supply")) w="schoolsupplies";
				else if(lText.find("fertilize all")) w="claimfertilizeall";
				else if(lText.find("item")) {
					if(text.find("Black Pig")) w="pigblack";
						else if(text.find("White Pig")) w="pigwhite";
						else if(text.find("Ossabaw Pig")) w="pigossabaw";
						else if(text.find("Strawberry Pig")) w="pigstrawberry";
						else if(text.find("Pink Pot Belly")) w="pigpinkpotbelly";
				}
				else if(text.find("Harvest Surprise")) w="claimharvestsurprise";
                    else if(text.find("Thank Ewe")) w="claimthankewe";
                    else if(text.find("Pilgrim Gnome")) w="claimpilgrimgnome";
                    else if(text.find("Harvest Fountain")) w="claimharvestfountain";
                    else if(text.find("Baby Bourbon")) w="claimbabybourbon";
                    else if(text.find("Mayflower")) w="claimmayflower";
					else if(text.find("Turkey Costume")) w="adopt";
				else if(text.find("Halloween Candy")) {
					if(text.find("Pumpkin Topiary")) w="claimpumpkintopiary";
						else if(text.find("Scared Ewe")) w="claimscaredewe";
						else if(text.find("Candied Gnome")) w="claimcandiedgnome";
						else if(text.find("Skele-scarecrow")) w="claimskelescarecrow";
						else if(text.find("Bat Tree")) w="claimbattree";
						else if(text.find("Pumpkin House")) w="claimpumpkinhouse";
				}
				else if(text.find("School Supplies")) {
					if(text.find("Haiti Flag")) w="claimhaitiflag";
						else if(text.find("Schooled Ewe")) w="claimschooledewe";
						else if(text.find("Student Gnome")) w="claimstudentgnome";
						else if(text.find("Tap Tap Bus")) w="claimtaptapbus";
						else if(text.find("School Seesaw")) w="claimschoolseesaw";
						else if(text.find("School House")) w="claimschoolhouse";
				}
				else if(text.find("Favor")) {
					if(text.find("Wedding Cake")) w="claimweddingcake";
						else if(text.find("Spaghetti Sheep")) w="claimspaghettisheep";
						else if(text.find("Pig High Art")) w="claimpighighart";
						else if(text.find("Apollo Butterfly")) w="claimapollobutterfly";
						else if(text.find("Bella Fountain")) w="claimbellafountain";
						else if(text.find("Leaning Tower")) w="claimleaningtower";
				}
				else if(text.find("Shovels")) {
					if(text.find("Mole")) w="claimmole";
						else if(text.find("Crystal Rock")) w="claimcrystalrock";
						else if(text.find("Miner Sheep")) w="claimminersheep";
						else if(text.find("Cave Gnome")) w="claimcavegnome";
						else if(text.find("Antique Tractor")) w="claimantiquetractor";
				}
				else if(text.find("Gold pieces")) w="claimgold";
				else if(text.find("Valentines for")) w="claimvalentine";
				else if(text.find("Spring Eggs")) w="claimeggs"; if(w != "collectible") break;
case "collectible": w += (
				text.find("Icicle") ? "icicle":
						text.find("Snowball") ? "snowball":
						text.find("Snowflake") ? "snowflake":
						text.find("Coal Lump") ? "coallump":
						text.find("Wool Scarf") ? "woolscarf":
						text.find("Mitten") ? "mitten":
						text.find("Snow Collection") ? "snow":
				text.find("Gardening Tools Collection") ? "gardentools":
						text.find("Shears") ? "shears":
						text.find("Pruning Saw") ? "pruningsaw":
						text.find("Twine") ? "twine":
						text.find("Country Kitsch Collection") ? "countrykitsch":
						text.find("Cow Bell") ? "cowbell":
						text.find("Thimble") ? "thimble":
						text.find("Salt Shaker") ? "saltshaker":
				text.find("Bugs Collection") ? "bugs":
						text.find("Centipede") ? "centipede":
						text.find("Beetle") ? "beetle":
						text.find("Stick Bug") ? "stickbug":
						text.find("Butterfly Collection") ? "butterfly":
						text.find("Copper") ? "copper":
						text.find("Zebra") ? "zebra":
						text.find("Swallowtail") ? "swallowtail":
				text.find("Feather Collection") ? "feather":
						text.find("Blue Feather") ? "blue":
						text.find("Banded Quill") ? "bandedquill":
						text.find("Red Feather") ? "red":
				text.find("Button Collection") ? "button":
						text.find("Check Button") ? "check":
						text.find("Brass Button") ? "brass":
						text.find("White Button") ? "white":
						text.find("Jewel Button") ? "jewel":
						text.find("Formal Button") ? "formal":
						text.find("Pearl Button") ? "pearl":
				text.find("Topaz") ? "topaz":
						text.find("Amethyst") ? "amethyst":
						text.find("Turquoise") ? "turquoise":
						text.find("Ruby") ? "ruby":
						text.find("Emerald") ? "emerald":
						text.find("Diamond") ? "diamond":
						text.find("Gemstone Collection") ? "gemstone":
				text.find("ABC Blocks") ? "abcblocks":
						text.find("Train Whistle") ? "trainwhistle":
						text.find("Duck Toy") ? "ducktoy":
						text.find("Jack") ? "jack":
						text.find("Marble") ? "marble":
						text.find("Paddle Ball") ? "paddleball":
						text.find("Toy Collection") ? "toy":
				text.find("Acorn") ? "acorn":
						text.find("Maple Leaf") ? "mapleleaf":
						text.find("Pumpkin") ? "pumpkin":
						text.find("Feather") ? "feather1":
						text.find("Cornucopia") ? "cornucopia":
						text.find("Moon Token") ? "moontoken":
						text.find("Autumn Collection") ? "autumn":
					""); break;
case "some": if(text.find("Thanksgiving")) w="thanksgivingfeast";
				else if(lText.find("slop")) w="slop";
				else if(text.find("candy") || text.find("Halloween")) w="candy";
				else if(text.find("School Supplies")) w="schoolsupplies";
				else if(text.find("Shovels")) w="shovel";
				else if((text.find("Favor")) || (text.find("Tuscan Wedding") && text.find("extras"))) w="favor";
				else if(text.find("Tuscan Wedding") && text.find("found some")) {
					if(text.find("Truffles")) w="truffle";
						else if(text.find("Eggs")) w="favoreggs";
						else if(text.find("Olives")) w="favorolives";
						else if(text.find("Goat Milk")) w="favorgoatmilk";
				}
				else if(lText.find("eggs")) w="eggs";
				else if(lText.find("gold")) w="gold";
				else if(text.find("fuel")) w="fuel"; break;
case "getmaterials": if(text.find("Winter Workshop")) w="materialswinterworkshop";
						else if(text.find("Gingerbread House")) w="materialsgingerbreadhouse";
						else if(text.find("Fun House")) w="materialsfunhouse";
						else if(text.find("Turkey Roost")) w="materialsturkeyroost";
						else if(text.find("Orchard")) w="materialsorchard";
						else if(text.find("Pigpen")) w="materialspigpen";
						else if(text.find("Haunted House")) w="materialshauntedhouse";
						else if(text.find("Garage") && text.find("finished constructing")) w="part";
						else if(text.find("Garage")) w="materialsgarage";
						else if(text.find("Maison")) w="materialsmaison";
						else if(text.find("Nursery")) w="materialsnursery";
						else if(text.find("Botanical Garden")) w="materialsgarden";
						else if(text.find("Japanese Barn")) w="materialsjapanesebarn";
						else if(text.find("Beehive")) w="materialsbeehive";
						else w="materialsstable"; break;
case "present": if(text.find("unwrapped")) w="box"; break;
case "bonus": if(text.find("Shovels")) w="shovel";
					else if(text.find("School Supplies")) w="schoolsupplies";
					else if(text.find("Valentines")) w="valentine";
					else if(text.find("Gold pieces")) w="gold";
					else if(text.find("Spring Eggs")) w="eggs"; break;
case "cow": if(text.find("Fan Cow")) w="cowfan"; break;
case "decoration": if(text.find("Botanical Garden")) w="decorationgarden";
						else if(text.find("Japanese Barn")) w="decorationjapanesebarn"; break;
case "anegg": w="eggs"; break;
case "flag": if(text.find("Haiti")) w="flaghaiti"; break;
}

if(text.find("found a surprise visitor eating their animal feed. They've adopted it")) w="adopt";

if(text.find("get this new tree")) w="tree";

// Dynamic Item Grabbing
if(dynamicgrabbinglist != "" && GM_config.get("dynamicgrabbing") === true && (dynlist.test(text) || dynlist.test(lText))) w="dynamicgrabbing";

// Wall-to-Wall Item Grabbing
if(walltowall) w="walltowall";

return w;
},

// get which animal it is
whichAnimal : function(e) {
	var lText=e.textContent.toLowerCase(), w=e.textContent.toLowerCase().match(main.animalRegex), color=main.whichColor(e), text=$g(".//ancestor::*[contains(@id, 'stream_story_') or contains(@id, 'div_story_')]", {node:e, type:9}).textContent.replace(main.nRegex, "").replace(main.threeDotRegex, "").toLowerCase();
	w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "unknown";

	switch(w) {
		case "stal": w="stallion"; break;
		case "chic": w="chicken"; break;
		case "foa": w="foal"; break;
		case "cal": w="calf"; break;
		case "kitten": if(text.find("black kitten")) w="kittyblack";
	}

	switch(w != "unknown" && w != "kittyblack") {case true: w += color; break;} // add color to animal if the animal is a known one

	if(text.find("turkey costume")) w="turkey";
	if(lText.find("pink pot belly")) w="pigpinkpotbelly";
	if(text.find("himalayan kitty")) w="kittyhimalayan";
	
	return w;
},

// get which color an animal is
whichColor : function(e) {
	var lText=e.textContent.toLowerCase(), w=lText.match(main.colorRegex), text=$g(".//ancestor::*[contains(@id, 'stream_story_') or contains(@id, 'div_story_')]", {node:e, type:9}).textContent.replace(main.nRegex, "").replace(main.threeDotRegex, "").toLowerCase();
		w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "";

	switch(w) {
		case "white-tailed": w="whitetailed"; break;
		case "mini": w="miniature"; break;
	}

	if(w.find("gray")) w = w.replace("gray", "grey");
	if(lText.find("calf") && main.calfRegex.test(text)) w = text.match(main.calfRegex)[1].replace(main.spaceRegex,"");

	return w;
},

// get which color egg it is
whichEgg : function(e) {
	var w=e.replace(main.nRegex,"").toLowerCase().replace(main.threeDotRegex, "").match(main.eggRegex);
		w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";
	switch(w) {
		case "golden": w="gold"; break;
	}
	switch(w=="none") {case true: w="hatch"+w; break;}
	return w;
},

failedItem : function(t) {
	return main.failTextRegex.test(t);
},

gotItem : function(d, t) {
	return (main.accTextRegex.test(t) || main.accURLRegex.test(d.URL.toLowerCase()));
},

checkCollectible : function(d, t, rx) {
    var collmatch = t.toLowerCase().match(rx);
    return ((collmatch != "null" && collmatch != null) ? "collectible" + collmatch[1].replace(main.spaceRegex,"") : "")
},

// function to debug stuff. displays in a big white textarea box
debug : function(s) {
	var d=$("debugT");
	if(!d) document.body.insertBefore(d=main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:80%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(main.create("text",s))), document.body.firstChild);
		else d.innerHTML+="\n\n\n\n"+s;
	if(d.style.display=="none") d.style.display="";
},

// get the key for the url
getKey : function(b) {
	return (b.match(main.keyRegex) || "")[1];
},

storeTypes : /^(true|true|\d+)$/,
getValue : (isGM ? GM_getValue : (function(name, def) {
				var s=localStorage.getItem(name), val = ((s=="undefined" || s=="null") ? def : s);
				if(typeof val == "string" && main.storeTypes.test(val)) val = ((new Function("return "+val+";"))());
				return val;
			})),
setValue : (isGM ? GM_setValue : (function(name, value) {return localStorage.setItem(name, value)})),
deleteValue : (isGM ? GM_deleteValue : (function(name, def) {return localStorage.setItem(name, def)})),

// get the accepted items' times they were accepted
getAcceptedTime : function() {
	return (new Function("return "+(main.getValue(main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile, "({})"))+";"))();
},

// save the accepted items' times they were accepted
setAcceptedTime : function(e) {
	var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile;
	main.setValue(store, val);
},

// get the accepted items' times they were accepted
getFailedTime : function() {
	return (new Function("return "+(main.getValue(main.gameAcronym.toLowerCase()+"_failed_time_"+main.profile, "({})"))+";"))();
},

// save the accepted items' times they were accepted
setFailedTime : function(e) {
	var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_failed_time_"+main.profile;
	main.setValue(store,val);
},

// reset the accepted items
resetAccepted : function() {
	if(confirm("Really reset accepted items?")) window.setTimeout(function(){
		var reset=main.deleteValue;
		reset(main.gameAcronym.toLowerCase()+"_accepted_"+main.profile, "({})");
		reset(main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile, "({})");
		reset(main.gameAcronym.toLowerCase()+"_failed_"+main.profile, "({})");
		reset(main.gameAcronym.toLowerCase()+"_failed_time_"+main.profile, "({})");
		reset(main.gameAcronym.toLowerCase()+"_DetlColl_"+main.profile, "({})");
	}, 0);
},

// get the accepted items
getAccepted : function() {
	return (new Function("return "+(main.getValue(main.gameAcronym.toLowerCase()+"_accepted_"+main.profile, "({})"))+";"))();
},

// save the accepted items
setAccepted : function(e) {
	var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_accepted_"+main.profile;
	main.setValue(store,val);
},

// get the accepted items
getFailed : function() {
	return (new Function("return "+main.getValue(main.gameAcronym.toLowerCase()+"_failed_"+main.profile, "({})")+";"))();
},

// save the accepted items
setFailed : function(e) {
	var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_failed_"+main.profile;
	main.setValue(store,val);
},

// get the detail collectible 
getDetlColl : function() {
	return (new Function("return "+(main.getValue(main.gameAcronym.toLowerCase()+"_DetlColl_"+main.profile, "({})"))+";"))();
},

// save the detail collectible
setDetlColl : function(e) {
	var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_DetlColl_"+main.profile;
	main.setValue(store,val);
},

// get number of current requests
get currReqs() {
	return $g("count(.//iframe)",{node:$("silent_req_holder"),type:1});
},

// go to the homepage
toHomepage : function() {
	window.location.replace(main.realURL);
},

// go to the filter page
toFilterpage : function() {
	window.location.replace(window.location.protocol+"//"+window.location.host+"/home.php?filter=app_"+main.gameID+"&show_hidden=true"+(main.realURL.find("&ignore_self=true")?"&ignore_self=true":"")+"&sk=lf");
},

// function for color coding the posts
colorCode : function(item, type) {
	switch(main.opts["colorcode"]) {
		case true: var div = $g(".//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed')) and not(contains(@class,'itemfailed')) and not(contains(@class,'itemdone')) and not(contains(@class,'itemerror'))]", {type:9, node:item});
		if(div != null && (div.className.find("itemprocessing") ? type != "neutral" : true)) div.setAttribute("class", div.getAttribute("class").replace(main.postStatusRegex, "") + " item"+(type || "neutral"));
			else if(div != null && div.className.find("itemprocessing") && type == "neutral") div.setAttribute("class", div.getAttribute("class").replace(main.postStatusRegex, "") + " itemerror");
		break;
	}
},

// generate a refresh time
get refTime() {
	var t=2;
	switch(main.opts["arinterval"]) {
		case "sixth": t = 0.1666667; break; // 10 seconds
		case "third": t = 0.3333333; break; // 20 seconds
		case "half": t = 0.5; break; // 30 seconds
		case "one": t = 1; break; // 1 minute
		case "two": t = 2; break; // 2 minutes
		case "three": t = 3; break; // 3 minutes
		case "four": t = 4; break; // 4 minutes
		case "five": t = 5; break; // 5 minutes
		case "ten": t = 10; break; // 10 minutes
		case "30s2m": t = (Math.random() * 1.5) + 0.5; break; // random between 30s and 2m
		case "2m5m": t = (Math.random() * 3) + 2; break; // random between 2m and 5m
		case "5m10m": t = (Math.random() * 5) + 5; break; // random between 5m and 10m
	}
	return Math.round((t*60000)+(Math.random()*(t*250)));
},

// get the real url of the page
get realURL() {
	var u=window.location.href, host=window.location.host, protocol=window.location.protocol+"//", hash=window.location.hash;
	if(hash!="" && main.phpRegex.test(hash)) u=protocol+host+hash.split("#")[1];
		else if(hash!="" && hash.find("#")) u=u.split("#")[0];
	return u;
},

// show config screen
config : function() {
/*
	if(main.currReqs == 0) { // if the # of requests are at 0
		GM_config.open(); // open the options menu
		main.configOpenWait = true;
		try{ $(main.gameAcronym.toLowerCase()+"_msgbox").style.display = "none"; }catch(e){} // hide msg box
	} else { // if the # of requesst are more than 0
		main.configOpenWait = true; // stop new requests, wait for existing ones to finish
		window.setTimeout(main.config, 500); // check 0.5 seconds
		main.message("Please wait... finishing requests..."); // If enabled, show "please wait" msg
	}
*/
GM_config.open(); // open the options menu
},

removeDone : function() {
	var done = $g(".//a[(contains(@href,'album.php?aid=') and contains(.,'FarmVille Photos')) or (contains(@href,'"+main.gameURLpart+"') and (starts-with(@id,'item_done_') or starts-with(@id,'item_failed_') or starts-with(@id,'item_skip_') or contains(.,'"+main.xpQueryTextExcludes.join("') or contains(.,'")+"'))) or (contains(@href,'zyn.ga/')) or (@class='actorName' and .='FarmVille') or (contains(@href, 'zynga') and .='Download from iTunes')]/ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id, '_collapsed'))]", {node:main.stream});
	for(var i=0,len=done.snapshotLength; i<len; i++) if(!$g(".//span[starts-with(@class,'UIActionLinks')]//a[starts-with(@id,'item_processing_')] | .//*[starts-with(@id,'stream_story_') and contains(@id,'_collapsed')]", {type:9, node:done.snapshotItem(i)})) main.remove(done.snapshotItem(i).id);
},

// auto click "like" buttons if enabled
like : function(id) {
	var like=$g("//a[contains(@id,'_"+id+"')]/ancestor::span/button[@name='like' and @type='submit']", {type:9});
	if(like) like.click();
},

olderPosts : function() {
	var more=$g(".//a[contains(@class, 'uiMorePager') and not(contains(@class,'async_saving'))]", {node:$("pagelet_stream_pager"), type:9});
	if(more) main.click(more);
},

expand : function() {
	var posts=$g("count(.//*[starts-with(@id,'stream_story_') and contains(@class,'"+main.gameID+"')])", {node:main.stream, type:1}),
		min = main.opts["minposts"];
	switch(min != "off") {
		case true: if(posts < parseInt(min)) main.olderPosts();
						else main.opts["minposts"] = "off"; break;
	}
},

hoursBack : function() {
	var lastPost = $g(".//*[starts-with(@id,'stream_story_') and contains(@class,'"+main.gameID+"')]", {node:main.stream, type:7});
		if(lastPost.snapshotLength == 0) return;
		lastPost = lastPost.snapshotItem(lastPost.snapshotLength-1);
	var oldestTime = $g(".//span[@class='uiStreamSource']//abbr[@class='timestamp' and @data-date]", {node:lastPost, type:9});
		if(!oldestTime) return;
	var old_date = new Date(oldestTime.getAttribute("data-date")),
		new_date = new Date();
	
	// Manipulate the date object to be the time we want from the options
	new_date.setHours(new_date.getHours() - parseInt(main.opts["hoursback"]));

	// If the oldest post isn't as old as what the user wants, click "Older Posts"
	if(new_date < old_date) main.olderPosts();
		else main.opts["hoursback"] = "off";
},

similarPosts : function() {
// Auto click "show x similar posts" links
var sp = $g(".//a[@rel='async' and contains(@ajaxify,'oldest=') and contains(@ajaxify,'newest=') and not(starts-with(@id, 'similar_post_'))] | .//a[@rel='async' and contains(.,'SHOW') and contains(.,'SIMILAR POSTS') and not(starts-with(@id, 'similar_post_'))]", {node:main.stream, type:9}),
	posts = $g("count(.//*[starts-with(@id,'stream_story_') and contains(@class,'"+main.gameID+"') and not(contains(@id,'_collapsed'))])", {node:main.stream, type:1}),
	max = main.opts["maxposts"], maxC = parseInt(max) || 9999;
if(sp && (max == "off" || (max != "off" && posts < maxC))) {
		if(max=="off" || ((parseInt(sp.textContent.match(main.numberRegex)[0]) + posts) < maxC)) {
			sp.setAttribute("id", "similar_post_"+sp.getAttribute("ajaxify").split("stream_story_")[1].split("&")[0]);
			main.click(sp);
			return;
		} else return;
}
},

// refresh function. be sure to only do it if the config isn't up, it isn't paused, and requests are finished
refresh : function() {
	if(main.currReqs==0 && !$("GM_config") && main.paused === true) {
		var i=0, refint=window.setInterval(function() {
			if(i >= 12 && main.currReqs==0) {
				window.clearInterval(runint);
				window.clearInterval(refint);
				switch(main.opts["filteronly"]) {
					case true: main.toFilterpage(); break; // if filter only option is enabled
					default: main.toHomepage(); // if filter only option is disabled or un-defined
				}
			} else if(i < 12 && main.currReqs==0) i++;
			else i=0;
		}, 250);
	} else window.setTimeout(main.refresh, (main.currReqs == 0 ? 1 : main.currReqs)*1000);
},

dropItem : function(key) {
	main.remove(key);
	var item = $g(".//a[starts-with(@id, 'item_') and contains(@id,'"+key+"')]", {type:9, node:main.stream});
	if(item != null) {
		item.setAttribute("id", "item_skip_"+key);
		main.colorCode(item, "neutral");
	}
},

// update debug status box
status : function() {
switch(main.pauseCount) {case 0: if(!main.pauseClick) main.paused=true; break;}
var statusText = !main.boxFull ? (!main.paused?"["+main.gameAcronym+"] "+main.currReqs+" requests currently ("+main.openCount+" done)":(!main.pauseClick?("["+main.pauseCount+"] "):"")+"[PAUSED] Click this box to unpause") : "[STOPPED] Gift box is full - Refresh to restart";
switch(document.title != statusText) {case true: document.title=statusText; break;}
switch($("status").textContent != statusText) {case true: $("status").textContent = statusText; break;}
if(!main.pauseClick && main.paused && main.pauseCount>0) main.pauseCount--;
},

// display a message in the middle of the screen
message : function(t) {
if(GM_config.get("newuserhints") === true) return;
var box = $(main.gameAcronym.toLowerCase()+"_msgbox");
if(box=="null" || box==null || box.nodeType !== 1) $("contentArea").insertBefore(box=main.create("div", {id:main.gameAcronym.toLowerCase()+"_msgbox",style:"background:#CAEEFF; border:2px solid #4AC5FF; z-index:998; padding:20px; -moz-border-radius:6px; -moz-appearance:none; display:none;"}, new Array(
			main.create("div", {style:"width:100%; text-align:right;"}, new Array(
				main.create("a", {textContent:"Close", style:"font-size:9pt; font-family:myriad pro,tahoma,arial,verdana; color:#000000;", href:"javascript:void(0);", onclick:function(e){ e.target.parentNode.parentNode.style.display = "none"; }})
			)),
			main.create("br"),
			main.create("span", {innerHTML:t, style:"color:#002537; font-size:16pt; font-family:myriad pro,tahoma,arial,verdana;"})
		)), $("contentArea").firstChild);
	else box.getElementsByTagName("span")[0].innerHTML = t;
if(box.style.display=="none") fade(box.id, "in", "fast");
},

goGiveItemAccepted : function(w, item, key) {
	var accTime=main.getAcceptedTime(),  acc=main.getAccepted();
	item.textContent = main.accText[w] || main.acceptedText;
	item.setAttribute("id", "item_done_"+key);
	main.colorCode(item, "done");
	accTime[w][key] = new Date().getTime();
	main.setAcceptedTime(accTime);
	acc[w].push(key);
	main.setAccepted(acc);
	main.openCount++;
},

onGiveItemLoad : function(e, w, item) {
	main.goGiveItemAccepted(w, item, e.target.getAttribute("id"));
	main.remove(e.target.getAttribute("id"));
},

onGiveItemFrameLoad : function(e) {
	var doc=e.target.contentDocument, w=e.target.getAttribute("which"), key=e.target.getAttribute("id"),
		acc=main.getAccepted(), accTime=main.getAcceptedTime(),
		failed=main.getFailed(), failedTime=main.getFailedTime(),
		item = $g("//a[contains(@id,'"+key+"')]", {type:9}),
		sendButton = $g(".//div[@class='gift_box_holder']/div[@class='recipient']//form[starts-with(@id, 'req_form_')]//input[@name='send'] | .//div[@class='submitdiv']//input[@type='button' and @name='send'] | .//input[@name='actions[accept]' and @value]", {doc:doc, node:doc, type:9}),
		shareAnimalFeedButton = $g(".//div[@class='submitdiv']//input[@type='button' and @name='shareExtraButton']", {doc:doc, node:doc, type:9}),
		returnToFarmButton = $g(".//div[@class='submitdiv']//input[@type='submit' and @value='Return To Farm' and @class='inputsubmit']", {doc:doc, node:doc, type:9}),
		okButton = $g(".//input[@type='submit' and @value='OK' and @class='inputsubmit']", {doc:doc, node:doc, type:9}),
		text=$("app_content_"+main.gameID, doc);

	// get bare text section
	if(text) text=$g(".//div[@class='giftLimit' or @class='landingText']", {node:text,doc:doc,type:9}) || $g(".//div[@class='main_giftConfirm_cont']", {node:text,doc:doc,type:9}) || text || doc.body;
	text = $g("./h3", {node:text,doc:doc,type:9}) || text;
	try { text = text.textContent; } catch(e) {} // true "try" case, just to suppress errors

	var failedItem = main.failedItem(text) || !main.textRegex.test(text);

	if(failedItem === true) {
		item.textContent = main.failText;
		item.setAttribute("id", "item_failed_"+key);
		main.colorCode(item, "failed");
		failedTime[w][key] = new Date().getTime();
		main.setFailedTime(failedTime);
		failed[w].push(key);
		main.setFailed(failed);
		main.openCount++;
		main.remove(key);
		return;
	}
	
	// auto click "like" if enabled
	if(main.opts["autolike"] === true) main.like(key);

	$(key).removeEventListener("load", main.onGiveItemFrameLoad, true);
	$(key).addEventListener("load", function(e) { main.onGiveItemLoad(e,w,item); }, true);
	
	if(sendButton || shareAnimalFeedButton || returnToFarmButton || okButton) {
		try {
			main.click(sendButton);
			main.click(shareAnimalFeedButton);
			main.click(returnToFarmButton);
			main.click(okButton);
		} catch(e) {}
		var intv = window.setInterval(function(e) {
				var send = $g(".//div[@id='pop_content']//input[@type='button' and (@name='sendit' or @name='publish')]", {doc:doc, node:doc, type:9}),
					skip = $g(".//input[@name='skip_ci_btn']", {doc:doc, node:doc, type:9});
				if(skip) { // skip button
					main.click(skip);
					window.clearInterval(intv);
				} else if(send) { // send button, brings up the skip button
					main.click(send);
				}
		}, 500);
	}
},

goAccepted : function(w, item, SpecificCollectible, key) {
	var accTime=main.getAcceptedTime(),  acc=main.getAccepted(), DetlColl=main.getDetlColl(), DetlCollectible = "";

	if(w.startsWith("collectible")) DetlCollectible = (SpecificCollectible != "") ? SpecificCollectible : "Got;" + w;
	item.setAttribute("id", "item_done_"+key);
	main.colorCode(item, "done");
	item.textContent = (DetlCollectible == "") ? (main.accText[w] || main.acceptedText) : (main.collstatusText[DetlCollectible.split(";")[0]] || main.collstatusText["Got"]) + (main.accText[DetlCollectible.split(";")[1]] || main.accText[w] || main.accText["GenericCollectible"]);
	main.openCount++;
	accTime[w][key] = new Date().getTime();
	main.setAcceptedTime(accTime);
	if (SpecificCollectible != "") {
		DetlColl[w][key] = SpecificCollectible;
		main.setDetlColl(DetlColl);
	}
	acc[w].push(key);
	main.setAccepted(acc);
},

onYesLoad : function(e, w, item, SpecificCollectible) {
	main.goAccepted(w, item, SpecificCollectible, e.target.getAttribute("id"));
	main.remove(e.target.getAttribute("id"));
},

onFrameLoad : function(e) {
var doc=e.target.contentDocument, w=e.target.getAttribute("which"), key=e.target.getAttribute("id"), acc=main.getAccepted(), accTime=main.getAcceptedTime(), failed=main.getFailed(), failedTime=main.getFailedTime(), DetlColl=main.getDetlColl(), item=$g("//a[contains(@id,'"+key+"')]", {type:9}), text=$("app_content_"+main.gameID, doc);

	// get bare text section
	if(text) text=$g(".//div[@class='giftLimit' or @class='landingText']", {node:text,doc:doc,type:9}) || $g(".//div[@class='main_giftConfirm_cont']", {node:text,doc:doc,type:9}) || text || doc.body;
	text = $g(".//h3", {node:text,doc:doc,type:9}) || text;
	try { text = text.textContent; } catch(e) {} // true "try" case, just to suppress errors

	if(!doc || !item || text.find("bits got lost on the way to your computer") || $("errorPageContainer", doc)) {
		main.dropItem(key);
		if(item) main.colorCode(item, "error");
		return;
	}

var loadgame = doc.URL.toLowerCase().find("index.php");

var failedItem = main.failedItem(text) || !main.textRegex.test(text),
	gotItem = main.gotItem(doc, text);

var yes = doc.getElementsByName("acceptReward").item(0),
	yestruffle = $g(".//input[@name='acceptReward' and @value='Yes and share Truffle back' and @type='submit']", {doc:doc, node:doc, type:9}),
	nothanks = $g(".//div[@class='submitdiv']//a[@class='skip' and contains(@href, 'skip')]", {doc:doc, node:doc, type:9}),
	no  = doc.getElementsByName("refuseReward").item(0),
	DetlCollectible = "", SpecificCollectible = "", trytoget = true;
if(gotItem==true && (yes || yestruffle || nothanks || no)) {
	trytoget = true;
	textL = text.toLowerCase();
    var whichCollectibleOffered = "";
	switch(w) {
	    case "collectiblegardentools": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichGardeningRegex); break;
	    case "collectiblecountrykitsch": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichCountryRegex); break;
	    case "collectiblebugs": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichBugsRegex); break;
	    case "collectiblebutterfly": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichbutterflyRegex); break;
	    case "collectiblefeather": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichFeatherRegex); break;
		case "collectiblebutton": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichButtonRegex); break;
		case "collectiblegemstone": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichGemstoneRegex); break;
		case "collectibletoy": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichToyRegex); break;
		case "collectibleautumn": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichAutumnRegex); break;
		case "collectiblesnow": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichSnowRegex); break;
	}
	$(key).removeEventListener("load", main.onFrameLoad, true);
	if(whichCollectibleOffered == "" || (whichCollectibleOffered != ""  && main.opts[whichCollectibleOffered]===true)) {
		if(whichCollectibleOffered != "") SpecificCollectible = "Accepted;" + whichCollectibleOffered;
		$(key).addEventListener("load", function(e) { main.onYesLoad(e,w,item,SpecificCollectible); }, true);
		if(yestruffle) yestruffle.click();
			else if(nothanks) e.target.src = nothanks.href;
			else yes.click();
	} else if(whichCollectibleOffered != "") {
		SpecificCollectible = "Refused;" + whichCollectibleOffered;
		$(key).addEventListener("load", function(e) { main.onYesLoad(e, w, item, SpecificCollectible); }, true);
		no.click();
	}
}

// auto click "like" if enabled
if(main.opts["autolike"]===true && (loadgame===true || gotItem===true || (gotItem==true && failedItem==true))) main.like(key);

if(trytoget === true) {
	switch(loadgame===true || gotItem===true || doc.URL.find("gifts.php?giftRecipient=")) {
		case true:
			main.goAccepted(w, item, SpecificCollectible, key);
			main.colorCode(item, "done");
			main.remove(key);
			break;
		case true:
			item.setAttribute("id", "item_failed_"+key);
			main.colorCode(item, "failed");
			item.textContent = main.failText;
			main.openCount++;
			failedTime[w][key] = new Date().getTime();
			main.setFailedTime(failedTime);
			failed[w].push(key);
			main.setFailed(failed);
			break;
	}
}

// remove the iframe
switch(loadgame===true || failedItem===true || (failedItem===true && gotItem===true && loadgame===true) || doc.URL.find("gifts.php?giftRecipient=")) {
	case true: main.remove(key); break;
}

if(main.opts["autostop"]===true && (doc.URL.find("max_gift") || main.boxFullRegex.test(text))) {
	// auto-pause when signal received of a full gift box
	main.boxFull =  true;
	main.pauseClick = true;
	main.paused = true;
	$("status").style.backgroundColor = "#FF0000";
	$g("//div[@id='silent_req_holder']/iframe", {del:true});
}
},

// load an item url
open : function(url, key, w) {
	// make sure to stay under the gift box limit but still get all items that don't go into the gift box
	if(main.configOpenWait === true || (main.paused===true && !(main.whitelistWhenPaused.find(","+w))) || main.currReqs >= main.opts["maxrequests"]) return;
	var item = $g(".//a[starts-with(@id, 'item_') and contains(@id,'"+key+"')]", {type:9, node:main.stream});
	item.setAttribute("id", "item_processing_"+key);
	main.colorCode(item, "processing");
	if(",giveitemto,sendabushel,giveanimalfeed,sendaturkey".find(","+w)) $("silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, id:key, style:"height:100%; width:100%; z-index:9995; border:0;", onload:main.onGiveItemFrameLoad}));
		else $("silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, id:key, style:"height:100%; width:100%; z-index:9995; border:0;", onload:main.onFrameLoad}));
	
	// update debug frame status which text
	$("debugwhichtype").innerHTML = "Type: " + w + "\n<br>\nKey: "+key;

	window.setTimeout(main.dropItem, main.reqTO, key);
},

// core function. this loops through posts and loads them
run : function() {
if($("GM_config") || (main.opts["removedone"]===true && main.currReqs >= main.opts["maxrequests"])) return;
		var wallposts=$g(".//span[starts-with(@class,'UIActionLinks')]/a[contains(@href,'"+main.gameURLpart+"') and not(starts-with(@id,'item_done_')) and not(starts-with(@id,'item_failed_')) and not(starts-with(@id,'item_processing_')) and not(starts-with(@id,'item_skip_')) and not(contains(.,'"+main.xpQueryTextExcludes.join("')) and not(contains(.,'")+"'))]", {type:7, node:main.stream});
		var opts=main.opts, open=main.open, accText=main.accText, getKey=main.getKey,
			which=main.which, whichAnimal=main.whichAnimal, whichEgg=main.whichEgg,
			DetlColl=main.getDetlColl(), collstatusText=main.collstatusText,
			acc=main.getAccepted(), accTime=main.getAcceptedTime(),
			failed=main.getFailed(), failedTime=main.getFailedTime(),
			profileRegex = main.profileRegex, profile=main.profile;

// loop through and grab stuff
var ssi=wallposts.snapshotItem, i=0, len=wallposts.snapshotLength;
if(len > 0) {
do {
	var item=wallposts.snapshotItem(i), key = getKey(item.href) || "", w = which(item), wA = (w == "adopt" ? whichAnimal(item) : ""), coll=w.startsWith("collectible"), text = $g(".//ancestor::*[contains(@id, 'stream_story_') or contains(@id, 'div_story_')]", {node:item, type:9}).textContent.replace(main.nRegex, "").replace(main.threeDotRegex, "");
	
	// Special handling for non "key=" posts
	if(!item.href.find("key") && item.href.find("frHost")) key = item.href.match(main.frHostRegex)[1];
	
switch(w) {
	case "play": if(text.find("Bull")) w="adopt"; wA="bull"; break;
	case "horse": w="adopt"; wA="horsegrey"; break;   
	case "babyanimal": w="adopt"; wA="foalgrey"; break;  
	case "cowfan": w="adopt"; wA="cowfan"; break;
}
//if(w != "none") {
try {
if(!acc[w]) {
	acc[w] = new Array();
	main.setAccepted(acc);
}
if(!accTime[w]) {
	accTime[w] = {};
	main.setAcceptedTime(accTime);
}
if(!DetlColl[w]) {
	DetlColl[w] = {};
	main.setDetlColl(DetlColl);
}
if(!failed[w]) {
	failed[w] = new Array();
	main.setFailed(failed);
}
if(!failedTime[w]) {
	failedTime[w] = {};
	main.setFailedTime(failedTime);
}
} catch(e) {
if(acc[w] == "undefined") {
	acc[w] = new Array();
	main.setAccepted(acc);
}
if(accTime[w] == "undefined") {
	accTime[w] = {};
	main.setAcceptedTime(accTime);
}
if(DetlColl[w] == "undefined") {
	DetlColl[w] = {};
	main.setDetlColl(DetlColl);
}
if(failed[w] == "undefined") {
	failed[w] = new Array();
	main.setFailed(failed);
}
if(failedTime[w] == "undefined") {
	failedTime[w] = {};
	main.setFailedTime(failedTime);
}
}
if(item.href.find("#58")) item.href = "http://apps.facebook.com/onthefarm/track.php?" + item.href.split("track.php?")[1];
item.setAttribute("id", "item_"+key);
item.setAttribute("title", item.textContent);
var own = $g(".//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]//a[@class='actorName' and @href] | .//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]//*[contains(@class, 'actorName')]/a[@href]", {type:9, node:item});
if((own.href.find("id=") ? own.href.split("id=")[1].split("&")[0] : unescape(own.href).match(profileRegex)[1]) != profile) {
//main.colorCode(item, "neutral");
switch(acc[w].inArray(key)) {
case true: if(failed[w].inArray(key)) {
	item.setAttribute("id", "item_failed_"+key);
	main.colorCode(item, "failed");
	item.textContent = main.failText;
} else if(!$(key)) {
	switch(w) {
	case "tree": var theTree = text.match(main.treeRegex);
				if(theTree != null && opts["tree"] === true && opts[theTree[1].replace(main.spaceRegex, "").toLowerCase()] === true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "adopt": if(opts["adopt"] === true && (opts[wA] === true || (opts["unknown"] === true && typeof opts[wA]!="boolean"))) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "hatch": if(opts[whichEgg(text)] === true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "bushel": if(opts["bushelmain"] === true && opts[w + (text.match(main.bushelRegex) || ["",""])[1].toLowerCase().replace(main.spaceRegex,"")] === true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	default: switch(opts[w] === true) {
		case true: if(coll===true || (coll===true && opts["collectible"] === true)) open(item.href, key, w);
						else item.setAttribute("id", "item_skip_"+key); break;
		case true: item.setAttribute("id", "item_skip_"+key); break;
	}
	}
}
break;
case true: main.colorCode(item, "done");
		   var DetlCollectible = (coll==true) ? (DetlColl[w][key] || "Got;" + w) : "";
			item.textContent = (DetlCollectible == "") ? (accText[w] || main.acceptedText) : ((collstatusText[DetlCollectible.split(";")[0]] || collstatusText["Got"]) + (accText[DetlCollectible.split(";")[1]] || accText[w] || accText["GenericCollectible"])); // change text
		   item.setAttribute("id", "item_done_"+key); // add id so it can be styled if wanted
		   break;
} // switch(acc[w].inArray)
} else item.setAttribute("id", "item_skip_"+key); // own profile
//} else item.setAttribute("id", "item_skip_"+key); // w != "none"
} while (++i < len);
} // if(len > 0)

switch(main.opts["removedone"] == true) {case true: main.removeDone(); break;}
}
};
main.keyRegex = new RegExp("[&?](?:amp;)?"+main.gameKeyUrlKeyword+"([0-9a-zA-Z]+)", "i");

if($(main.navIDnf) || $("pagelet_navigation")) { // run script if on homepage

// new option highlighter
var newOptionsCSS = "";
for(var i=0; i<newOptions.length; i++) newOptionsCSS += "label[for=\"field_"+ newOptions[i] +"\"], #field_" + newOptions[i] + " " + (i < newOptions.length-1 ? ", " : "");
newOptionsCSS = newOptionsCSS.replace(/\n$/, "") + " {background: #027B09;}";

// pre-load the config
GM_config.init("<img src='"+imgs.logo+"'> v"+version, {
	assortedseparator : {
		section : [ "Manager Options" ],
		label : "Assorted",
		type : "separator"
	},
	bonus : {
		label : "Bonuses",
		type: "checkbox",
		"default" : true,
		kids : {
			bouquet : {
				label : "Bouquets",
				type : "checkbox",
				"default" : true
			},
			perfectbunch : {
				label : "Perfect Bunches",
				type : "checkbox",
				"default" : true
			},
			walltowall : {
				label : "Wall-to-Wall Items",
				type: "checkbox",
				"default" : true
			}
		}
	},
	none : {
		label : "Get NEW or Unrecognized Items",
		type : "checkbox",
		title : "Use this feature to grab newly added items that aren't in the script yet.",
		"default" : true
	},
	animalfeedseparator : {
		label : "Animal Feed",
		type : "separator"
	},
	animalfeed :  {
		label : "Animal Feed",
		type: "checkbox",
		"default" : true,
		kids : {
			truffle : {
				label : "Truffles",
				type : "checkbox",
				"default" : true
			},
			kibble : {
				label : "Puppy Kibble",
				type : "checkbox",
				"default" : true
			},
			dogtreat : {
				label : "Dog Treat",
				type : "checkbox",
				"default" : true
			},
			slop : {
				label : "Pig Slop",
				type : "checkbox",
				"default" : true
			}
		}
	},
	consumableseparator : {
		label : "Consumables",
		type : "separator"
	},
	farmhands :  {
		label : "Farmhands",
		type : "checkbox",
		"default" : true,
		kids : {
			arborists :  {
				label : "Arborists",
				type : "checkbox",
				"default" : true
			},
			xp : {
				label : "Free XP",
				type : "checkbox",
				"default" : true
			},
			fuel : {
				label : "Fuel",
				type: "checkbox",
				"default" : true
			},
			claimfertilizeall : {
				label : "Fertilize All",
				type : "checkbox",
				"default" : true
			}
		}
	},
	craftingseparator : {
		label : "Crafting",
		type : "separator"
	},
	sample :  {
		label : "Samples",
		type : "checkbox",
		"default" : true,
		kids : {
			good : {
				label : "Goods",
				type : "checkbox",
				"default" : true
			}
		}
	},
	hatchseparator : {
		label : "Mystery Eggs",
		type : "separator"
	},
	hatchwhite : {
		label : "White",
		type: "checkbox",
		"default" : true,
		kids : {
			hatchbrown : {
				label : "Brown",
				type : "checkbox",
				"default" : true
			},
			hatchblack : {
				label : "Black",
				type : "checkbox",
				"default" : true
			},
			hatchgold : {
				label : "Gold",
				type : "checkbox",
				"default" : true
			},
			hatchcornish : {
				label : "Cornish",
				type : "checkbox",
				"default" : true
			},
			hatchscotsgrey : {
				label : "Scots Grey",
				type : "checkbox",
				"default" : true
			},
			hatchrhodeislandred : {
				label : "Rhode Island Red",
				type : "checkbox",
				"default" : true
			},
			hatchrainbow : {
				label : "Rainbow",
				type : "checkbox",
				"default" : true
			}
		}
	},
	tasksseparator : {
		label : "Tasks",
		type : "separator"
	},
	raising : {
		label : "Participate In Barn Raisings",
		type : "checkbox",
		"default" : true,
		kids : {
			stallion : {
				label : "Help Wandering Stallions",
				type : "checkbox",
				"default" : true
			}
		}
	},
	giveitemto : {
		label : "Send gifts on \"give item to\" links",
		type : "checkbox",
		"default" : true,
		kids : {
			sendabushel : {
				label : "Send Bushels",
				type : "checkbox",
				"default" : true
			},
			giveanimalfeed : {
				label : "Give Animal Feed & Share",
				type : "checkbox",
				"default" : true
			},
			sendaturkey : {
				label : "Send Turkeys",
				type : "checkbox",
				"default" : true
			}
		}
	},
	checkallmain : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_0", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallmain : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_0", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			}
		}
	},
	dynamicgrabbing : {
		section : [ "Dynamic Grabbing of Items" ],
		label : "Enable Dynamic Grabbing of Items?",
		type : "checkbox",
		"default" : true
	},
	dynamicgrabbinginfo : {
		label : "You may type in the link or post text (separated by lines) of the item you desire.",
		type : "separator"
	},
	dynamicgrabbinglist : {
		label : "Dynamic Grabbing List, Separate By Lines",
		type : "textarea",
		cols : 40,
		rows : 6,
		"default" : "item 1\nitem 2\nitem 3\netc..."
	},
	singlematerialsseparator : {
		section : [ "Materials & Decoration Items" ],
		label : "Single Materials",
		type : "separator"
	},
	brick : {
		label : "Bricks",
		type: "checkbox",
		"default" : true,
		kids : {
			nail : {
				label : "Nails",
				type: "checkbox",
				"default" : true
			},
			woodenboard : {
				label : "Wooden Boards",
				type: "checkbox",
				"default" : true
			},
			horseshoe : {
				label : "Horseshoes",
				type: "checkbox",
				"default" : true
			},
			harness : {
				label : "Harnesses",
				type: "checkbox",
				"default" : true
			},
			bottle : {
				label : "Bottles",
				type : "checkbox",
				"default" : true
			},
			blanket : {
				label : "Blankets",
				type : "checkbox",
				"default" : true
			},
			smoker : {
				label : "Smokers",
				type : "checkbox",
				"default" : true
			},
			beeswax : {
				label : "Beeswax",
				type : "checkbox",
				"default" : true
			},
			bamboo : {
				label : "Bamboo",
				type : "checkbox",
				"default" : true
			},
			reedthatch : {
				label : "Reed Thatch",
				type : "checkbox",
				"default" : true
			}
		}
	},
	eventmaterialsseparator : {
		label : "Event Materials",
		type : "separator"
	},
	materialsstable : {
		label : "Stable",
		type: "checkbox",
		"default" : true,
		kids : {
			materialsmaison : {
				label : "La Maison",
				type: "checkbox",
				"default" : true
			},
			materialsnursery : {
				label : "Nursery",
				type: "checkbox",
				"default" : true
			},
			materialsjapanesebarn : {
				label : "Japanese Barn",
				type: "checkbox",
				"default" : true
			},
			materialsbeehive : {
				label : "Beehive",
				type: "checkbox",
				"default" : true
			},
			materialsgarage : {
				label : "Garage",
				type: "checkbox",
				"default" : true
			},
			materialspigpen : {
				label : "Pigpen",
				type: "checkbox",
				"default" : true
			},
			materialshauntedhouse : {
				label : "Haunted House",
				type: "checkbox",
				"default" : true
			},
			materialsorchard : {
				label : "Orchard",
				type: "checkbox",
				"default" : true
			},
			materialsturkeyroost : {
				label : "Turkey Roost",
				type: "checkbox",
				"default" : true
			},
			materialsfunhouse : {
				label : "Fun House",
				type: "checkbox",
				"default" : true
			},
			materialsgingerbreadhouse : {
				label : "Gingerbread House",
				type: "checkbox",
				"default" : true
			},
			materialswinterworkshop : {
				label : "Winter Workshop",
				type: "checkbox",
				"default" : true
			}
		},
	},
	decorationseparator : {
		label : "Decoration Items",
		type : "separator"
	},
	decoration : {
		label : "La Maison",
		type : "checkbox",
		"default" : true,
		kids : {
			decorationgarden : {
				label : "Garden",
				type: "checkbox",
				"default" : true
			},
			decorationjapanesebarn : {
				label : "Japanese Barn",
				type : "checkbox",
				"default" : true
			}
		}
	},
	othermaterialsseparator : {
		label : "Other",
		type : "separator"
	},
	vehiclepart : {
		label : "Vehicle Parts",
		type : "checkbox",
		"default" : true
	},
	glasssheet : {
		label : "Glass Sheets",
		type: "checkbox",
		"default" : true,
		kids : {
			greenbeam : {
				label : "Green Beams",
				type : "checkbox",
				"default" : true
			},
			floralbracket : {
				label : "Floral Brackets",
				type : "checkbox",
				"default" : true
			},
			whitetrellis : {
				label : "White Trellises",
				type : "checkbox",
				"default" : true
			},
			irrigationpipe : {
				label : "Irrigation Pipes",
				type : "checkbox",
				"default" : true
			}
		}
	},
	checkallconstruction : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_2", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallconstruction : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_2", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			}
		}
	},
	orchardmainseparator : {
		section : [ "Orchard" ],
		label : "Master Option Switch for Trees",
		type : "separator"
	},
	tree : {
		label : "Enable Trees",
		type : "checkbox",
		"default" : true
	},
	orchardassortedseparator : {
		label : "Assorted",
		type : "separator"
	},
	wateringcan : {
		label : "Watering Cans",
		type: "checkbox",
		"default" : true,
		kids : {
			mysteryseedling :  {
				label : "Mystery Seedling",
				type: "checkbox",
				"default" : true
			}
		}
	},
	treesseparator : {
		label : "Trees",
		type : "separator"
	},
	almafig : {
		label : "Alma Fig",
		type : "checkbox",
		"default" : true,
		kids : {
			amherstia : {
				label : "Amherstia",
				type : "checkbox",
				"default" : true
			},
			angelredpomegranate : {
				label : "Angel Red Pomegranate",
				type : "checkbox",
				"default" : true
			},
			autumnginkgo : {
				label : "Autumn Ginkgo",
				type : "checkbox",
				"default" : true
			},
			bahridate : {
				label : "Bahri Date",
				type : "checkbox",
				"default" : true
			},
			banana : {
				label : "Banana",
				type : "checkbox",
				"default" : true
			},
			bloodorange : {
				label : "Blood Orange",
				type : "checkbox",
				"default" : true
			},
			breadnut : {
				label : "Breadnut",
				type : "checkbox",
				"default" : true
			},
			bubblegum : {
				label : "Bubble Gum",
				type : "checkbox",
				"default" : true
			},
			chaneedurian : {
				label : "Chanee Durian",
				type : "checkbox",
				"default" : true
			},
			cubanbanana : {
				label : "Cuban Banana",
				type : "checkbox",
				"default" : true
			},
			date : {
				label : "Date",
				type : "checkbox",
				"default" : true
			},
			dwarfalmond : {
				label : "Dwarf Almond",
				type : "checkbox",
				"default" : true
			},
			elbertapeach : {
				label : "Elberta Peach",
				type : "checkbox",
				"default" : true
			},
			ginkgotree : {
				label : "Ginkgo",
				type : "checkbox",
				"default" : true
			},
			goldenapricot : {
				label : "Golden Apricot",
				type : "checkbox",
				"default" : true
			},
			goldenmalayancoconut : {
				label : "Golden Malayan Coconut",
				type : "checkbox",
				"default" : true
			},
			goldenplum : {
				label : "Golden Plum",
				type : "checkbox",
				"default" : true
			},
			goldenstarfruit : {
				label : "Golden Starfruit",
				type : "checkbox",
				"default" : true
			},
			grannysmithapple : {
				label : "Granny Smith Apple",
				type : "checkbox",
				"default" : true
			},
			gulmohar : {
				label : "Gulmohar",
				type : "checkbox",
				"default" : true
			},
			hassavocado : {
				label : "Hass Avocado",
				type : "checkbox",
				"default" : true
			},
			indianlaurel : {
				label : "Indian Laurel",
				type : "checkbox",
				"default" : true
			},
			keylime : {
				label : "Key Lime",
				type : "checkbox",
				"default" : true
			},
			longan : {
				label : "Longan",
				type : "checkbox",
				"default" : true
			},
			mango : {
				label : "Mango",
				type : "checkbox",
				"default" : true
			},
			manilamango : {
				label : "Manila Mango",
				type : "checkbox",
				"default" : true
			},
			missionolive : {
				label : "Mission Olive",
				type : "checkbox",
				"default" : true
			},
			mountainebony : {
				label : "Mountain Ebony",
				type : "checkbox",
				"default" : true
			},
			olive : {
				label : "Olive",
				type : "checkbox",
				"default" : true
			},
			peachpalm : {
				label : "Peach Palm",
				type : "checkbox",
				"default" : true
			},
			pine : {
				label : "Pine",
				type : "checkbox",
				"default" : true
			},
			ponderosalemon : {
				label : "Ponderosa Lemon",
				type : "checkbox",
				"default" : true
			},
			rainiercherry : {
				label : "Rainier Cherry",
				type : "checkbox",
				"default" : true
			},
			redmaple : {
				label : "Red Maple",
				type : "checkbox",
				"default" : true
			},
			rubyguava : {
				label : "Ruby Guava",
				type : "checkbox",
				"default" : true
			},
			shinkopear : {
				label : "Shinko Pear",
				type : "checkbox",
				"default" : true
			},
			silvermaple : {
				label : "Silver Maple",
				type : "checkbox",
				"default" : true
			},
			singaporejackfruit : {
				label : "Singapore Jackfruit",
				type : "checkbox",
				"default" : true
			},
			starrubygrapefruit : {
				label : "Star Ruby Grapefruit",
				type : "checkbox",
				"default" : true
			},
			tamarind : {
				label : "Tamarind",
				type : "checkbox",
				"default" : true
			},
			whitewalnut : {
				label : "White Walnut",
				type : "checkbox",
				"default" : true
			},
			wildcashew : {
				label : "Wild Cashew",
				type : "checkbox",
				"default" : true
			},
			yellowmaple : {
				label : "Yellow Maple",
				type : "checkbox",
				"default" : true
			},
			yellowpassionfruit : {
				label : "Yellow Passion Fruit",
				type : "checkbox",
				"default" : true
			}
		}
	},
	checkalltree : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox' and @id != 'field_tree']", {type:6, node:$("section_kids_3", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckalltree : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and @id != 'field_tree']", {type:6, node:$("section_kids_3", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			}
		}
	},
	collectiblemainseparator : {
		section : [ "Collectibles & Collections" ],
		label : "Master Option Switch for Collectibles",
		type : "separator"
	},
	collectible : {
		label : "Enable Collectibles",
		type : "checkbox",
		"default" : true
	},
	bugsseparator : {
		label : "Bugs",
		type : "separator"
	},
	collectiblebugs  : {
		label : "Bugs Collection",
		type : "checkbox",
		"default" : true,
		kids : {
			collectibleladybug : {
				label : "Ladybug",
				type : "checkbox",
				"default" : true
			},
			collectibledragonfly : {
				label : "Dragonfly",
				type : "checkbox",
				"default" : true
			},
			collectiblecaterpillar : {
				label : "Caterpillar",
				type : "checkbox",
				"default" : true
			},
			collectiblestickbug : {
				label : "Stick Bug",
				type : "checkbox",
				"default" : true
			},
			collectiblebeetle : {
				label : "Beetle",
				type : "checkbox",
				"default" : true
			},
			collectiblecentipede : {
				label : "Centipede",
				type : "checkbox",
				"default" : true
			}
		}
	},
	countrykitschseparator : {
		label : "Country Kitsch",
		type : "separator"
	},
	collectiblecountrykitsch : {
		label : "Country Kitsch Collection",
		type : "checkbox",
		"default" : true,
		kids : {
			collectibleneedlepoint : {
				label : "Needlepoint",
				type : "checkbox",
				"default" : true
			},
			collectiblespigot : {
				label : "Spigot",
				type : "checkbox",
				"default" : true
			},
			collectiblepocketwatch : {
				label : "Pocketwatch",
				type : "checkbox",
				"default" : true
			},
			collectiblesaltshaker : {
				label : "Salt Shaker",
				type : "checkbox",
				"default" : true
			},
			collectiblethimble : {
				label : "Thimble",
				type : "checkbox",
				"default" : true
			},
			collectiblecowbell : {
				label : "Cow Bell",
				type : "checkbox",
				"default" : true
			}
		}
	},
	buttonseparator : {
		label : "Button",
		type : "separator"
	},
	collectiblebutton  : {
		label : "Button Collection",
		type : "checkbox",
		"default" : true,
		kids : {
			collectiblecheck : {
				label : "Check Button",
				type : "checkbox",
				"default" : true
			},
			collectiblebrass : {
				label : "Brass Button",
				type : "checkbox",
				"default" : true
			},
			collectiblewhite : {
				label : "White Button",
				type : "checkbox",
				"default" : true
			},
			collectiblejewel : {
				label : "Jewel Button",
				type : "checkbox",
				"default" : true
			},
			collectibleformal : {
				label : "Formal Button",
				type : "checkbox",
				"default" : true
			},
			collectiblepearl : {
				label : "Pearl Button",
				type : "checkbox",
				"default" : true
			}
		}
	},
	gardeningtoolseparator : {
		label : "Gardening Tool",
		type : "separator"
	},
	collectiblegardentools : {
		label : "Gardening Tool Collection",
		type : "checkbox",
		"default" : true,
		kids : {
			collectiblegloves : {
		        label : "Gloves",
		        type : "checkbox",
		        "default" : true,
		    },
	        collectibletrowel : {
		        label : "Trowel",
		        type : "checkbox",
		        "default" : true,
		    },
	        collectiblecultivator : {
		        label : "Cultivator",
		        type : "checkbox",
		        "default" : true,
		    },
			collectibletwine : {
				label : "Twine",
				type : "checkbox",
				"default" : true
			},
			collectiblepruningsaw : {
				label : "Pruning Saw",
				type : "checkbox",
				"default" : true
			},
			collectibleshears : {
				label : "Shears",
				type : "checkbox",
				"default" : true
			}
		}
	},
	butterflyseparator : {
		label : "Butterfly",
		type : "separator"
	},
	collectiblebutterfly : {
		label : "Butterfly Collection",
		type : "checkbox",
		"default" : true,
		kids : {
			collectibleemperor : {
				label : "Emperor",
				type : "checkbox",
				"default" : true
			},
			collectiblepaintedlady : {
				label : "Painted Lady",
				type : "checkbox",
				"default" : true
			},
			collectiblebluebut : {
				label : "Blue Butterfly",
				type : "checkbox",
				"default" : true
			},
			collectibleswallowtail : {
				label : "Swallowtail",
				type : "checkbox",
				"default" : true
			},
			collectiblezebra : {
				label : "Zebra",
				type : "checkbox",
				"default" : true
			},
			collectiblecopper : {
				label : "Copper",
				type : "checkbox",
				"default" : true
			}
		}
	},
	feathersseparator : {
		label : "Feather",
		type : "separator"
	},
	collectiblefeather  : {
		label : "Feather Collection",
		type : "checkbox",
		"default" : true,
		kids : {
			collectiblegreen : {
				label : "Green Plume",
				type : "checkbox",
				"default" : true
			},
			collectiblehen : {
				label : "Hen Feather",
				type : "checkbox",
				"default" : true
			},
			collectibledapple : {
				label : "Dapple Plume",
				type : "checkbox",
				"default" : true
			},
			collectiblered : {
				label : "Red Feather",
				type : "checkbox",
				"default" : true
			},
			collectiblebandedquill : {
				label : "Banded Quill",
				type : "checkbox",
				"default" : true
			},
			collectibleblue : {
				label : "Blue Feather",
				type : "checkbox",
				"default" : true
			}
		}
	},
	snowseparator : {
		label : "Snow",
		type : "separator"
	},
	collectiblesnow : {
		label : "Snow Collection",
		type : "checkbox",
		"default" : true,
		kids : {
			collectibleicicle : {
				label : "Icicle",
				type : "checkbox",
				"default" : true
		},
			collectiblesnowball : {
				label : "Snowball",
				type : "checkbox",
				"default" : true
			},
			collectiblesnowflake : {
				label : "Snowflake",
				type : "checkbox",
				"default" : true
			},
			collectiblecoallump : {
				label : "Coal Lump",
				type : "checkbox",
				"default" : true
			},
			collectiblewoolscarf : {
				label : "Wool Scarf",
				type : "checkbox",
				"default" : true
			},
			collectiblemitten : {
				label : "Mitten",
				type : "checkbox",
				"default" : true
			}
		}
	},
	autumnseparator : {
		label : "Autumn",
		type : "separator"
	},
	collectibleautumn : {
		label : "Autumn Collection",
		type : "checkbox",
		"default" : true,
		kids : {
			collectibleacorn : {
				label : "Acorn",
				type : "checkbox",
				"default" : true
			},
			collectiblemapleleaf : {
				label : "Maple Leaf",
				type : "checkbox",
				"default" : true
			},
			collectiblepumpkin : {
				label : "Pumpkin",
				type : "checkbox",
				"default" : true
			},
			collectiblecornucopia : {
				label : "Cornucopia",
				type : "checkbox",
				"default" : true
			},
			collectiblefeather1 : {
				label : "Feather",
				type : "checkbox",
				"default" : true
			},
			collectiblemoontoken : {
				label : "Moon Token",
				type : "checkbox",
				"default" : true
			}
		}
	},
	toyseparator : {
		label : "Toy",
		type : "separator"
	},
	collectibletoy : {
		label : "Toy Collection",
		type : "checkbox",
		"default" : true,
		kids : {
			collectibleabcblocks : {
				label : "ABC Blocks",
				type : "checkbox",
				"default" : true
			},
			collectibletrainwhistle : {
				label : "Train Whistle",
				type : "checkbox",
				"default" : true
			},
			collectibleducktoy : {
				label : "Duck Toy",
				type : "checkbox",
				"default" : true
			},
			collectiblejack : {
				label : "Jack",
				type : "checkbox",
				"default" : true
			},
			collectiblemarble : {
				label : "Marble",
				type : "checkbox",
				"default" : true
			},
			collectiblepaddleball : {
				label : "Paddle Ball",
				type : "checkbox",
				"default" : true
			}
		}
	},
	gemstonesseparator : {
		label : "Gemstone",
		type : "separator"
	},
	collectiblegemstone : {
		label : "Gemstone Collection",
		type : "checkbox",
		"default" : true,
		kids : {
			collectibletopaz : {
				label : "Topaz",
				type : "checkbox",
				"default" : true
			},
			collectibleamethyst : {
				label : "Amethyst",
				type : "checkbox",
				"default" : true
			},
			collectibleturquoise : {
				label : "Turquoise",
				type : "checkbox",
				"default" : true
			},
			collectibleruby : {
				label : "Ruby",
				type : "checkbox",
				"default" : true
			},
			collectibleemerald : {
				label : "Emerald",
				type : "checkbox",
				"default" : true
			},
			collectiblediamond : {
				label : "Diamond",
				type : "checkbox",
				"default" : true
			}
		}
	},
	checkallcollectible : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox' and @id != 'field_collectible']", {type:6, node:$("section_kids_4", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallcollectible : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and @id != 'field_collectible']", {type:6, node:$("section_kids_4", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			}
		}
	},
	limitedmaterialsseparator : {
		section : ["Limited Edition"],
		label : "Limited Materials",
		type : "separator"
	},
	eggs : {
		label : "Easter Eggs",
		type : "checkbox",
		"default" : true,
		kids : {
			present : {
				label : "Presents",
				type: "checkbox",
				"default" : true
			},
			claimeggs :  {
				label : "Spring Eggs",
				type: "checkbox",
				"default" : true
			},
			valentine :  {
				label : "Valentines",
				type: "checkbox",
				"default" : true
			},
			gold :  {
				label : "Gold",
				type: "checkbox",
				"default" : true
			},
			schoolsupplies : {
				label : "School Supplies",
				type : "checkbox",
				"default" : true
			},
			candy : {
				label : "Candy",
				type : "checkbox",
				"default" : true
			},
			thanksgivingfeast : {
				label : "Extra Dishes",
				type : "checkbox",
				"default" : true
			}
		}
	},
	tuscanweddingseparator : {
		label : "Tuscan Wedding",
		type : "separator"
	},
	claimweddingcake : {
		label : "Wedding Cake",
		type : "checkbox",
		"default" : true,
		kids : {
			claimspaghettisheep : {
				label : "Spaghetti Sheep",
				type : "checkbox",
				"default" : true
			},
			claimpighighart : {
				label : "Pig High Art",
				type : "checkbox",
				"default" : true
			},
			claimapollobutterfly : {
				label : "Apollo Butterfly",
				type : "checkbox",
				"default" : true
			},
			claimbellafountain : {
				label : "Bella Fountain",
				type : "checkbox",
				"default" : true
			},
			claimleaningtower : {
				label : "Leaning Tower",
				type : "checkbox",
				"default" : true
			},
		}
	},
	favor : {
		label : "Random Favors",
		type : "checkbox",
		"default" : true,
		kids : {
			favoreggs : {
				label : "Eggs",
				type : "checkbox",
				"default" : true
			},
			favorolives : {
				label : "Olives",
				type : "checkbox",
				"default" : true
			},
			favorgoatmilk : {
				label : "Goat Milk",
				type : "checkbox",
				"default" : true
			}
		}
	},
	storagecellarseparator : {
		label : "Storage Cellar",
		type : "separator"
	},
	claimmole : {
		label : "Mole",
		type : "checkbox",
		"default" : true,
		kids : {
			claimcrystalrock : {
				label : "Crystal Rock",
				type : "checkbox",
				"default" : true
			},
			claimminersheep : {
				label : "Miner Sheep",
				type : "checkbox",
				"default" : true
			},
			claimcavegnome : {
				label : "Cave Gnome",
				type : "checkbox",
				"default" : true
			},
			claimantiquetractor : {
				label : "Antique Tractor",
				type : "checkbox",
				"default" : true
			}
		}
	},
	beehiveseparator : {
		label : "Beehive",
		type : "separator"
	},
	honeybee : {
		label : "Honeybees",
		type : "checkbox",
		"default" : true,
		kids : {
			queenbee : {
				label : "Queen Bees",
				type : "checkbox",
				"default" : true,
			},
			seeds : {
				label : "Seeds From Beehives",
				type : "checkbox",
				"default" : true,
			}
		}
	},
	schoolsuppliesseparator : {
		label : "School Supplies",
		type : "separator"
	},
	claimhaitiflag : {
		label : "Haiti Flag",
		type : "checkbox",
		"default" : true,
		kids : {
			claimschooledewe : {
				label : "Schooled Ewe",
				type : "checkbox",
				"default" : true
			},
			claimstudentgnome : {
				label : "Student Gnome",
				type : "checkbox",
				"default" : true
			},
			claimtaptapbus : {
				label : "Tap Tap Bus",
				type : "checkbox",
				"default" : true
			},
			claimschoolseesaw : {
				label : "School Seesaw",
				type : "checkbox",
				"default" : true
			},
			claimschoolhouse : {
				label : "School House",
				type : "checkbox",
				"default" : true
			}
		}
	},
	eventitemhalloweenseparator : {
		label : "Halloween",
		type : "separator"
	},
	claimpumpkintopiary : {
		label : "Pumpkin Topiary",
		type : "checkbox",
		"default" : true,
		kids : {
			claimscaredewe : {
				label : "Scared Ewe",
				type : "checkbox",
				"default" : true
			},
			claimcandiedgnome : {
				label : "Candied Gnome",
				type : "checkbox",
				"default" : true
			},
			claimskelescarecrow : {
				label : "Skele-scarecrow",
				type : "checkbox",
				"default" : true
			},
			claimbattree : {
				label : "Bat Tree",
				type : "checkbox",
				"default" : true
			},
			claimpumpkinhouse : {
				label : "Pumpkin House",
				type : "checkbox",
				"default" : true
			}
		}
	},
	thanksgivingseparator : {
		label : "Thanksgiving",
		type : "separator"
	},
	stuffing : {
		label : "Stuffing",
		type : "checkbox",
		"default" : true,
		kids : {
			casserole : {
				label : "Casserole",
				type : "checkbox",
				"default" : true
			},
			fruitcake :  {
				label : "Fruit Cake",
				type : "checkbox",
				"default" : true
			},
			spicedcider : {
				label : "Spiced Cider",
				type : "checkbox",
				"default" : true
			},
			leafcandle : {
				label : "Leaf Candle",
				type : "checkbox",
				"default" : true
			}
		}
	},
	claimharvestsurprise : {
		label : "Harvest Surprise",
		type : "checkbox",
		"default" : true,
		kids : {
			claimthankewe : {
				label : "Thank Ewe",
				type : "checkbox",
				"default" : true
			},
			claimpilgrimgnome : {
				label : "Pilgrim Gnome",
				type : "checkbox",
				"default" : true
			},
			claimharvestfountain : {
				label : "Harvest Fountain",
				type : "checkbox",
				"default" : true
			},
			claimbabybourbon : {
				label : "Baby Bourbon",
				type : "checkbox",
				"default" : true
			},
			claimmayflower : {
				label : "Mayflower",
				type : "checkbox",
				"default" : true
			}
		}
	},
	eventitemsotherseparator : {
		label : "Other",
		type : "separator"
	},
	shovel : {
		label : "Shovels",
		type : "checkbox",
		"default" : true,
		kids : {
			flaghaiti : {
				label : "Sweet Seeds for Haiti Flags",
				type: "checkbox",
				"default" : true
			},
			gnome : {
				label : "Crafting Cottage Gnomes",
				type : "checkbox",
				"default" : true
			},
		}
	},
	checkallseasonal : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_5", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallseasonal : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_5", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			}
		}
	},
	adoptionmainseparator : {
		section : ["Specific Animal Adoption"],
		label : "Master Option Switch for Adoption",
		type : "separator"
	},
	adopt : {
		label : "Enable Adoption",
		type: "checkbox",
		"default" : true
	},
	unknown : {
		label : "Adopt Unrecognized Animals",
		type: "checkbox",
		"default" : true
	},
	cowseparator : {
		label : "Cows",
		type : "separator"
	},
	cowbrown : {
		label : "Brown",
		type : "checkbox",
		"default" : true,
		kids : {
			cowchocolate : {
				label : "Chocolate",
				type : "checkbox",
				"default" : true
			},
			cowfan : {
				label : "Fan",
				type : "checkbox",
				"default" : true
			},
			cowgroovy : {
				label : "Groovy",
				type : "checkbox",
				"default" : true
			},
			cowlonghorn : {
				label : "Longhorn",
				type : "checkbox",
				"default" : true
			},
			cowpink : {
				label : "Pink",
				type : "checkbox",
				"default" : true
			},
			cowpurple : {
				label : "Purple",
				type : "checkbox",
				"default" : true
			},
			cow : {
				label : "White",
				type : "checkbox",
				"default" : true
			}
		}
	},
	calfseparator : {
		label : "Calves",
		type : "separator"
	},
	calfautumn : {
		label : "Autumn",
		type : "checkbox",
		"default" : true,
		kids : {
			calfbaby : {
				label : "Baby",
				type : "checkbox",
				"default" : true,
				title : "Normal Calf"
			},
			calfbelted : {
				label : "Belted",
				type : "checkbox",
				"default" : true
			},
			calfblue : {
				label : "Blue",
				type : "checkbox",
				"default" : true
			},
			calfbrown : {
				label : "Brown",
				type : "checkbox",
				"default" : true
			},
			calfcandycane : {
				label : "Candy Cane",
				type : "checkbox",
				"default" : true
			},
			calfchocolate : {
				label : "Chocolate",
				type : "checkbox",
				"default" : true
			},
			calffan : {
				label : "Fan",
				type : "checkbox",
				"default" : true
			},
			calfyellowcattle : {
				label : "Gelbvieh",
				type : "checkbox",
				title : "AKA. the \"Yellow Cattle Calf\"",
				"default" : true
			},
			calfgreen : {
				label : "Green",
				type : "checkbox",
				"default" : true
			},
			calfgroovy : {
				label : "Groovy",
				type : "checkbox",
				"default" : true
			},
			calfholstein : {
				label : "Holstein",
				type : "checkbox",
				"default" : true
			},
			calfkellygreen: {
				label : "Kelly Green",
				type : "checkbox",
				"default" : true
			},
			calflonghorn : {
				label : "Longhorn",
				type : "checkbox",
				"default" : true
			},
			calfneapolitan : {
				label : "Neapolitan",
				type : "checkbox",
				"default" : true
			},
			calfpink : {
				label : "Pink",
				type : "checkbox",
				"default" : true
			},
			calfpinkpatch : {
				label : "Pink Patch",
				type : "checkbox",
				"default" : true
			},
			calfpurple : {
				label : "Purple",
				type : "checkbox",
				"default" : true
			},
			calfred : {
				label : "Red",
				type : "checkbox",
				"default" : true
			},
			calfredbrown : {
				label : "Red Brown",
				type : "checkbox",
				"default" : true
			},
			calfrobot : {
				label : "Robot",
				type : "checkbox",
				"default" : true
			},
			calfsimmental : {
				label : "Simmental",
				type : "checkbox",
				"default" : true
			},
			calftuscan : {
				label : "Tuscan",
				type : "checkbox",
				"default" : true
			},
			calfwesternlonghorn : {
				label : "Western Longhorn",
				type : "checkbox",
				"default" : true
			},
		}
	},
	foalseparator : {
		label : "Foals",
		type : "separator"
	},
	foalappaloosa : {
		label : "Appaloosa",
		type : "checkbox",
		"default" : true,
		kids : {
			appaloosaminiature : {
				label : "Appaloosa Mini",
				type : "checkbox",
				"default" : true
			},
			foalautumn : {
				label : "Autumn",
				type : "checkbox",
				"default" : true
			},
			foalblack : {
				label : "Black",
				type : "checkbox",
				"default" : true
			},
			foalblackpony : {
				label : "Black Pony",
				type : "checkbox",
				"default" : true 
			},
			stallionblackmini : {
				label : "Black Mini Stallion",
				type : "checkbox",
				"default" : true
			},
			stallionblack : {
				label : "Black Stallion",
				type : "checkbox",
				"default" : true
			},
			foalbluepony : {
				label : "Blue Pony",
				type : "checkbox",
				"default" : true 
			},
			foalbreton : {
				label : "Breton",
				type : "checkbox",
				"default" : true
			},
			foalbrown : {
				label : "Brown",
				type : "checkbox",
				"default" : true
			},
			foalbuckskin : {
				label : "Buckskin",
				type : "checkbox",
				"default" : true
			},
			foalcamargue : {
				label : "Camargue",
				type : "checkbox",
				"default" : true
			},
			foalcandycane : {
				label : "Candy Cane",
				type : "checkbox",
				"default" : true
			},
			foalcandycanepony : {
				label : "Candy Cane Pony",
				type : "checkbox",
				"default" : true
			},
			foalcandycorn : {
				label : "Candy Corn",
				type : "checkbox",
				"default" : true
			},
			foalclydesdale : {
				label : "Clydesdale",
				type : "checkbox",
				"default" : true
			},
			foalcreamdraft : {
				label : "Cream Clydesdale",
				type : "checkbox",
				"default" : true
			},
			foalcreammini : {
				label : "Cream Mini",
				type : "checkbox",
				"default" : true
			},
			foalforest : {
				label : "Forest",
				type : "checkbox",
				"default" : true
			},
			foalgrey : {
				label : "Grey",
				type : "checkbox",
				"default" : true
			},
			foalgreen : {
				label : "Green",
				type : "checkbox",
				"default" : true
			},
			foalgypsy : {
				label : "Gypsy",
				type : "checkbox",
				"default" : true
			},
			foalharvest : {
				label : "Harvest",
				type : "checkbox",
				"default" : true
			},
			foalhaflinger : {
				label : "Haflinger",
				type : "checkbox",
				"default" : true
			},
			foalminiature : {
				label : "Miniature",
				type : "checkbox",
				"default" : true
			},
			foalmorgan : {
				label : "Morgan",
				type : "checkbox",
				"default" : true
			},
			foalmustang : {
				label : "Mustang",
				type : "checkbox",
				"default" : true 
			},
			foalnightmare : {
				label : "Nightmare",
				type : "checkbox",
				"default" : true
			},
			foalpaint : {
				label : "Paint",
				type : "checkbox",
				"default" : true
			},
			foalpalouse : {
				label : "Palouse",
				type : "checkbox",
				"default" : true
			},
			foalpercheron : {
				label : "Percheron",
				type : "checkbox",
				"default" : true
			},
			foalpinkpony : {
				label : "Pink Pony",
				type : "checkbox",
				"default" : true 
			},
			foalpinto : {
				label : "Pinto",
				type : "checkbox",
				"default" : true
			},
			foalpintomini : {
				label : "Pinto Mini",
				type : "checkbox",
				"default" : true
			},
			foalpintopony : {
				label : "Pinto Pony",
				type : "checkbox",
				"default" : true 
			},
			foalpony : {
				label : "Pony",
				type : "checkbox",
				"default" : true 
			},
			foalpurplepony : {
				label : "Purple Pony",
				type : "checkbox",
				"default" : true 
			},
			foalred : {
				label : "Red",
				type : "checkbox",
				"default" : true
			},
			foalreitpony : {
				label : "Reitpony",
				type : "checkbox",
				"default" : true
			},
			foalsaddle : {
				label : "Saddle",
				type : "checkbox",
				"default" : true
			},
			foalsilver : {
				label : "Silver Pony",
				type : "checkbox",
				"default" : true 
			},
			stallionminiature : {
				label : "Stallion Miniature",
				type : "checkbox",
				"default" : true
			},
			foalwhite : {
				label : "White",
				type : "checkbox",
				"default" : true
			},
		}
	},
	pigseparator : {
		label : "Pigs",
		type : "separator"
	},
	pig : {
		label : "Normal",
		type : "checkbox",
		"default" : true,
		kids : {
			pigblack : {
				label : "Black",
				type : "checkbox",
				"default" : true
			},
			pigossabaw : {
				label : "Ossabaw",
				type : "checkbox",
				"default" : true
			},
			pigpinkpotbelly : {
				label : "Pink Pot Belly",
				type : "checkbox",
				"default" : true
			},
			pigpotbelly : {
				label : "Pot Belly",
				type : "checkbox",
				"default" : true
			},
			pigspotted : {
				label : "Spotted",
				type : "checkbox",
				"default" : true
			},
			pigstrawberry : {
				label : "Strawberry",
				type : "checkbox",
				"default" : true
			},
			pigwhite : {
				label : "White",
				type : "checkbox",
				"default" : true
			}
		}
	},
	sheepseparator : {
		label : "Sheep",
		type : "separator"
	},
	sheepblack : {
		label : "Black",
		type : "checkbox",
		"default" : true,
		kids : {
			sheepmouflon : {
				label : "Mouflon",
				type : "checkbox",
				"default" : true
			},
			sheep : {
				label : "White",
				type : "checkbox",
				"default" : true,
			}
		}
	},
	kittensseparator : {
		label : "Kittens",
		type : "separator"
	},
	kittyblack : {
		label : "Black",
		type : "checkbox",
		"default" : true,
		kids : {
			kittyhimalayan : {
				label : "Himalayan",
				type : "checkbox",
				"default" : true
			},
			kittywhite : {
				label : "White",
				type : "checkbox",
				"default" : true
			}
		}
	},
	ducksseparator : {
		label : "Ducks",
		type : "separator"
	},
	duckparty : {
		label : "Party",
		type : "checkbox",
		"default" : true,
		kids : {
			duckling : {
				label : "Ugly",
				type : "checkbox",
				"default" : true
			}
		}
	},
	goatsseparator : {
		label : "Goats",
		type : "separator"
	},
	goatboer : {
		label : "Boer",
		type : "checkbox",
		"default" : true,
		kids : {
			goatmouflon : {
				label : "Mouflon",
				type : "checkbox",
				"default" : true
			}
		}
	},
	llamaseparator : {
		label : "Llamas",
		type : "separator"
	},
	llama : {
		label : "Normal",
		type : "checkbox",
		"default" : true,
		kids : {
			llamaponcho : {
				label : "Poncho",
				type : "checkbox",
				"default" : true
			}
		}
	},
	turkeysection : {
		label : "Turkeys",
		type : "separator"
	},
	turkey : {
		label : "Normal",
		type : "checkbox",
		"default" : true,
		kids : {
			turkeybaby : {
				label : "Baby",
				type : "checkbox",
				"default" : true
			},
			turkeywhite : {
				label : "White",
				type : "checkbox",
				"default" : true
			}
		}
	},
	chickenseparator : {
		label : "Chickens",
		type : "separator"
	},
	chicken : {
		label : "White",
		type : "checkbox",
		"default" : true,
		kids : {
			chickenrhodeislandred : {
				label : "Rhode Island Red",
				type : "checkbox",
				"default" : true
			}
		}
	},
	otheranimalsection : {
		label : "Other",
		type : "separator"
	},
	ponyblack : {
		label : "Black Ponies",
		type : "checkbox",
		"default" : true
	},
	bull : {
		label : "Bulls",
		type : "checkbox",
		"default" : true
	},
	horsegrey : {
		label : "Grey Horses",
		type : "checkbox",
		"default" : true
	},
	penguin : {
		label : "Penguins",
		type : "checkbox",
		"default" : true
	},
	rabbit : {
		label : "Rabbits",
		type : "checkbox",
		"default" : true
	},
	reindeer : {
		label : "Reindeer",
		type : "checkbox",
		"default" : true
	},
	turtle : {
		label : "Turtles",
		type : "checkbox",
		"default" : true
	},
	buckwhitetailed : {
		label : "White-Tailed Bucks",
		type : "checkbox",
		"default" : true
	},
	checkallanimal : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox' and @id != 'field_adopt' and @id != 'field_unknown']", {type:6, node:$("section_kids_6", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallanimal : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and @id != 'field_adopt' and @id != 'field_unknown']", {type:6, node:$("section_kids_6", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			}
		}
	},
	bushelmainseparator : {
		section : [ "Bushels" ],
		label : "Master Option Switch for Bushels",
		type : "separator"
	},
	bushelmain : {
		label : "Enable Bushels",
		type : "checkbox",
		"default" : true
	},
	specificbushelseparator : {
		label : "Crafting Specific Bushels",
		type : "separator"
	},
	getwinery : {
		label : "Only Winery",
		type : "button",
		script : function() {
			var boxes = $g(".//input[@type='checkbox' and @id != 'field_bushelmain']", {type:6, node:$("section_kids_7", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
			for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
			var boxes = $g(".//input[@type='checkbox' and (@id='field_bushelrice' or @id='field_bushelcranberry' or @id='field_bushelwhitegrape' or @id='field_bushelsugarcane' or @id='field_bushelstrawberry' or @id='field_bushelgrape' or @id='field_bushelraspberry' or @id='field_bushelblueberry' or @id='field_busheltomato' or @id='field_bushelpepper' or @id='field_bushelcarrot' or @id='field_bushelgreentea' or @id='field_bushellilac' or @id='field_bushelblackberry' or @id='field_bushelbasil' or @id='field_bushelginger' or @id='field_bushelpumpkin' or @id='field_bushelacornsquash' or @id='field_bushelcucumber' or @id='field_bushelsquash' or @id='field_bushelpinkrose' or @id='field_bushellavender' or @id='field_bushelmorningglory' or @id='field_bushelsunflower' or @id='field_bushelyellowmelon' or @id='field_bushelwatermelon')]", {type:6, node:$("section_kids_7", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
			for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			getbakery : {
				label : "Only Bakery",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_7", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
					var boxes = $g(".//input[@type='checkbox' and (@id='field_bushelpumpkin' or @id='field_bushelwheat' or @id='field_bushelstrawberry' or @id='field_bushelcarrot' or @id='field_bushelpepper' or @id='field_bushelghostchili' or @id='field_bushelpattypan' or @id='field_bushelonion' or @id='field_bushelrice' or @id='field_bushelblueberry' or @id='field_bushelblackberry' or @id='field_bushelraspberry' or @id='field_bushelpeanut' or @id='field_bushelsugarcane' or @id='field_bushelbroccoli' or @id='field_bushelasparagus' or @id='field_bushelpeas' or @id='field_bushelcoffee' or @id='field_busheloats' or @id='field_bushelcucumber' or @id='field_bushelbasil' or @id='field_bushelpepper' or @id='field_busheltomato' or @id='field_bushelginger' or @id='field_bushelpotato' or @id='field_bushelposolecorn' or @id='field_bushelredwheat' or @id='field_bushelsoybean' or @id='field_bushelcranberry')]", {type:6, node:$("section_kids_7", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			},
			getspa : {
				label : "Only Spa",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_7", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
					var boxes = $g(".//input[@type='checkbox' and (@id='field_bushelpumpkin' or @id='field_bushelcranberry' or @id='field_bushelsunflower' or @id='field_bushelblueberry' or @id='field_bushelmorningglory' or @id='field_bushelaloevera' or @id='field_bushelgreentea' or @id='field_bushelblackberry' or @id='field_bushellilac' or @id='field_bushelbasil' or @id='field_busheliris' or @id='field_bushelpepper' or @id='field_bushelredtulip' or @id='field_bushelghostchili' or @id='field_bushellily' or @id='field_bushellemonbalm' or @id='field_bushelginger' or @id='field_bushelcoffee' or @id='field_bushellavender' or @id='field_bushelpurplepoppy' or @id='field_busheldaffodil' or @id='field_bushelstrawberry' or @id='field_bushelpinkrose')]", {type:6, node:$("section_kids_7", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			}
		}
	},
	bushelseparatora : {
		label : "A",
		type : "separator"
	},
	bushelacornsquash : {
		label : "Acorn Squash",
		type : "checkbox",
		"default" : true,
		kids : {
			bushelaloevera : {
				label : "Aloe Vera",
				type : "checkbox",
				"default" : true
			},
			bushelamaranth : {
				label : "Amaranth",
				type : "checkbox",
				"default" : true
			},
			bushelartichoke : {
				label : "Artichoke",
				type : "checkbox",
				"default" : true
			},
			bushelasparagus : {
				label : "Asparagus",
				type : "checkbox",
				"default" : true
			}
		}
	},
	bushelseparatorb : {
		label : "B",
		type : "separator"
	},
	bushelbamboo : {
		label : "Bamboo",
		type : "checkbox",
		"default" : true,
		kids : {
			bushelbasil : {
				label : "Basil",
				type : "checkbox",
				"default" : true,
			},
			bushelbellpepper : {
				label : "Bell Pepper",
				type : "checkbox",
				"default" : true
			},
			bushelblackberry : {
				label : "Black Berry",
				type : "checkbox",
				"default" : true
			},
			bushelblueberry : {
				label : "Blueberry",
				type : "checkbox",
				"default" : true
			},
			bushelbroccoli : {
				label : "Broccoli",
				type : "checkbox",
				"default" : true
			}
		}
	},
	bushelseparatorc : {
		label : "C",
		type : "separator"
	},
	bushelcabbage : {
		label : "Cabbage",
		type : "checkbox",
		"default" : true,
		kids : {
			bushelcarnivalsquash : {
				label : "Carnival Squash",
				type : "checkbox",
				"default" : true
			},
			bushelcarrot : {
				label : "Carrot",
				type : "checkbox",
				"default" : true
			},
			bushelchickpea : {
				label : "Chickpea",
				type : "checkbox",
				"default" : true
			},
			bushelclover : {
				label : "Clover",
				type : "checkbox",
				"default" : true
			},
			bushelcoffee : {
				label : "Coffee",
				type : "checkbox",
				"default" : true
			},
			bushelcolumbine : {
				label : "Columbine",
				type : "checkbox",
				"default" : true
			},
			bushelcorn : {
				label : "Corn",
				type : "checkbox",
				"default" : true
			},
			bushelcotton : {
				label : "Cotton",
				type : "checkbox",
				"default" : true
			},
			bushelcranberry : {
				label : "Cranberry",
				type : "checkbox",
				"default" : true
			},
			bushelcucumber : {
				label : "Cucumber",
				type : "checkbox",
				"default" : true
			}
		}
	},
	bushelseparatorde : {
		label : "DE",
		type : "separator"
	},
	busheldaffodil : {
		label : "Daffodil",
		type : "checkbox",
		"default" : true,
		kids : {
			busheleggplant : {
				label : "Eggplant",
				type : "checkbox",
				"default" : true
			},
			bushelelderberry : {
				label : "Elderberry",
				type : "checkbox",
				"default" : true
			},
			bushelelectriclilies : {
				label : "Electric Lilies",
				type : "checkbox",
				"default" : true
			}
		}
	},
	bushelseparatorfg : {
		label : "FG",
		type : "separator"
	},
	bushelforgetmenot : {
		label : "Forget Me Not",
		type : "checkbox",
		"default" : true,
		kids : {
			bushelgladiolus : {
				label : "Gladiolus",
				type : "checkbox",
				"default" : true
			},
			bushelghostchili : {
				label : "Ghost Chili",
				type : "checkbox",
				"default" : true
			},
			bushelginger : {
				label : "Ginger",
				type : "checkbox",
				"default" : true
			},
			bushelgrape : {
				label : "Grape",
				type : "checkbox",
				"default" : true
			},
			bushelgreentea : {
				label : "Green Tea",
				type : "checkbox",
				"default" : true
			}
		}
	},
	bushelseparatorhijkl : {
		label : "HIJKL",
		type : "separator"
	},
	bushelheirloomcarrot : {
		label : "Heirloom Carrot",
		type : "checkbox",
		"default" : true,
		kids : {
			busheliris : {
				label : "Iris",
				type : "checkbox",
				"default" : true
			},
			bushellavender : {
				label : "Lavender",
				type : "checkbox",
				"default" : true
			},
			bushellemonbalm : {
				label : "Lemon Balm",
				type : "checkbox",
				"default" : true
			},
			bushellilac : {
				label : "Lilac",
				type : "checkbox",
				"default" : true
			},
			bushellily : {
				label : "Lily",
				type : "checkbox",
				"default" : true
			}
		}
	},
	bushelseparatormno : {
		label : "MNO",
		type : "separator"
	},
	bushelmorningglory : {
		label : "Morning Glory",
		type : "checkbox",
		"default" : true,
		kids : {
			busheloats : {
				label : "Oats",
				type : "checkbox",
				"default" : true
			},
			bushelonion : {
				label : "Onion",
				type : "checkbox",
				"default" : true
			},
			bushelorangedaisies : {
				label : "Orange Daisies",
				type : "checkbox",
				"default" : true
			}
		}
	},
	bushelseparatorpq : {
		label : "PQ",
		type : "separator"
	},
	bushelpattypan : {
		label : "Pattypan Squash",
		type : "checkbox",
		"default" : true,
		kids : {
			bushelpeanut : {
				label : "Peanut",
				type : "checkbox",
				"default" : true
			},
			bushelpeas : {
				label : "Peas",
				type : "checkbox",
				"default" : true
			},
			bushelpepper : {
				label : "Pepper",
				type : "checkbox",
				"default" : true
			},
			bushelpineapple : {
				label : "Pineapple",
				type : "checkbox",
				"default" : true
			},
			bushelpinkrose : {
				label : "Pink Rose",
				type : "checkbox",
				"default" : true
			},
			bushelposolecorn : {
				label : "Posole Corn",
				type : "checkbox",
				"default" : true
			},
			bushelpotato : {
				label : "Potato",
				type : "checkbox",
				"default" : true
			},
			bushelpumpkin : {
				label : "Pumpkin",
				type : "checkbox",
				"default" : true
			},
			bushelpurpleasparagus : {
				label : "Purple Asparagus",
				type : "checkbox",
				"default" : true
			},
			bushelpurplepodpeas : {
				label : "Purple Pod Peas",
				type : "checkbox",
				"default" : true
			},
			bushelpurplepoppy : {
				label : "Purple Poppy",
				type : "checkbox",
				"default" : true
			}
		}
	},
	bushelseparatorr : {
		label : "R",
		type : "separator"
	},
	bushelraspberry : {
		label : "Raspberry",
		type : "checkbox",
		"default" : true,
		kids : {
			bushelredtulip : {
				label : "Red Tulip",
				type : "checkbox",
				"default" : true
			},
			bushelredwheat : {
				label : "Red Wheat",
				type : "checkbox",
				"default" : true
			},
			bushelrhubarb : {
				label : "Rhubarb",
				type : "checkbox",
				"default" : true
			},
			bushelrice : {
				label : "Rice",
				type : "checkbox",
				"default" : true
			},
			bushelrye : {
				label : "Rye",
				type :  "checkbox",
				"default" : true
			}
		}
	},
	bushelseparators : {
		label : "S",
		type : "separator"
	},
	bushelsaffron : {
		label : "Saffron",
		type : "checkbox",
		"default" : true,
		kids : {
			bushelsoybean : {
				label : "Soybean",
				type : "checkbox",
				"default" : true
			},
			bushelspinach : {
				label : "Spinach",
				type : "checkbox",
				"default" : true
			},
			bushelsquaremelon : {
				label : "Square Melon",
				type : "checkbox",
				"default" : true
			},
			bushelsquash : {
				label : "Squash",
				type : "checkbox",
				"default" : true
			},
			bushelstrawberry : {
				label : "Strawberry",
				type : "checkbox",
				"default" : true
			},
			bushelsugarcane : {
				label : "Sugar Cane",
				type : "checkbox",
				"default" : true
			},
			bushelsunflower : {
				label : "Sunflower",
				type : "checkbox",
				"default" : true
			}
		}
	},
	bushelseparatortuvwxyz : {
		label : "TUVWXYZ",
		type : "separator"
	},
	busheltomato : {
		label : "Tomato",
		type : "checkbox",
		"default" : true,
		kids : {
			bushelwatermelon : {
				label : "Watermelon",
				type : "checkbox",
				"default" : true
			},
			bushelwheat : {
				label : "Wheat",
				type : "checkbox",
				"default" : true
			},
			bushelwhitegrape : {
				label : "White Grape",
				type : "checkbox",
				"default" : true
			},
			bushelwhitepumpkin : {
				label : "White Pumpkin",
				type : "checkbox",
				"default" : true
			},
			bushelwhiterose : {
				label : "White Rose",
				type : "checkbox",
				"default" : true
			},
			bushelyellowmelon : {
				label : "Yellow Melon",
				type : "checkbox",
				"default" : true
			},
			bushelzucchini : {
				label : "Zucchini",
				type : "checkbox",
				"default" : true
			}
		}
	},
	bushel : {
		label : "Get unknown bushels",
		type : "checkbox",
		"default" : true
	},
	checkallbushel : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_7", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallbushel : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_7", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			}
		}
	},
	arinterval : {
		section : [ "Basic Tech Options" ],
		label : "Auto Refresh",
		type : "select",
		options : {
			off : "Off",
			sixth : "10 seconds",
			third : "20 seconds",
			half : "30 seconds",
			one : "1 minute",
			two : "2 minutes",
			three : "3 minutes",
			four : "4 minutes",
			five : "5 minutes",
			ten : "10 minutes",
			"30s2m" : "30sec-2min random",
			"2m5m" : "2min-5min random",
			"5m10m" : "5min-10min random"
		},
		"default" : "30s2m"
	},
	newuserhints : {
		label : "Enable pop-up hints (for new users)",
		type : "checkbox",
		"default" : true
	},
	filteronly : {
		label : "Run only on "+main.gameName+"		filter page",
		type : "checkbox",
		"default" : true
	},
	colorcode : {
		label : "Color Code Item Posts",
		type : "checkbox",
		"default" : true
	},
	autolike : {
		label : "Auto \"like\" clicked posts",
		type : "checkbox",
		"default" : true
	},
	similarposts : {
		label : "Autoclick \"Show Similar Posts\" links",
		type : "checkbox",
		"default" : true
	},
	status : {
		label : "Show debug status bar",
		type : "checkbox",
		"default" : true
	},
	olderpostsbottom : {
		label : "Force older posts bar to bottom",
		type : "checkbox",
		"default" : true
	},
	mostrecent : {
		label : "Stay on the \"Most Recent\" feed",
		type : "checkbox",
		"default" : true
	},
	blockads : {
		label : "Block Ads",
		type : "checkbox",
		"default" : true
	},
	inputtimeoutenable : {
		label : "Enable Typing Auto-pause",
		type : "checkbox",
		"default" : true,
		kids : {
			inputtimeout : {
				label : "Timeout (length of pause)",
				type : "float",
				"default" : 30
			}
		}
	},
	minposts : {
		label : "Minimum number of posts to show:",
		type : "select",
		options : {
			off : "Off",
			5 : "5",
			10 : "10",
			20 : "20",
			30 : "30",
			40 : "40",
			50 : "50",
			100 : "100",
			150 : "150"
		},
		"default" : "off"
	},
	maxposts : {
		label : "Maximum number of posts to process:",
		type : "select",
		options : {
			off : "Unlimited",
			5 : "5",
			10 : "10",
			20 : "20",
			30 : "30",
			40 : "40",
			50 : "50",
			100 : "100"
		},
		"default" : "off"
	},
	hoursback : {
		label : "Backtrack posts this far in time:",
		type : "select",
		options : {
			off : "Off",
			1 : "1 hour",
			2 : "2 hours",
			4 : "4 hours",
			6 : "6 hours",
			12 : "12 hours",
			24 : "1 day",
			48 : "2 days",
			72 : "3 days",
			120 : "5 days",
			168 : "1 week",
			336 : "2 weeks"
		},
		"default" : "off",
		title : "Pick a time amount to backtrack in older posts."
	},
	removedone : {
		label : "Hide finished items from feed",
		type : "checkbox",
		"default" : true,
		title : "Helps keep browser memory low. BUT, keep the minimum posts feature OFF."
	},
	maxrequests : {
		section : ["Advanced Tech Options"],
		label : "Max simultaneous requests",
		type : "float",
		"default" : 1,
		title : "WARNING: ONLY 3 IS RECOMMENDED UNLESS YOU WANT TO RISK BEING BANNED."
	},
	reqtimeout : {
		label : "Item Acceptance Page Timeout (seconds)",
		type : "float",
		"default" : 30
	},
	itemage : {
		label : "How long to keep tried items in memory (days)",
		type : "float",
		"default" : 2
	},
	autostop : {
		label : "Autostop script when gift box is full?",
		type : "checkbox",
		"default" : true
	},
	debug : {
		label : "Turn on debug developer mode?",
		type : "checkbox",
		"default" : true,
		title : "This will show the requests frame and other dev features."
	},
	reset : {
		label : "Reset Accepted Items",
		type : "button",
		script : main.resetAccepted
	}
},

// Custom styling for the options interface
"body {color: #EEEEEE !important; margin:0 !important; background:#000000 !important;}\n"+
".section_header {background:#333333 !important; display:block; font-size: 11pt !important;}\n"+
".section_header_holder {padding:0 6px 0 6px !important; margin-top:6px !important;}\n"+
"#header {font-size:18px !important;}\n"+
"div.config_var span.config_var {display:inline-block !important; margin-left:10px !important;}\n"+
"div.config_var {border-top: 1px solid #1D6092; margin:0 !important; padding: 2px 0 2px 0 !important;}"+
".field_label {font-size:11px !important;}\n"+
"span.separator {font-size: 11px !important; font-color:#AED3EE !important; margin:0 !important; padding:1px 0 1px 2px !important; display:block !important; background:#1D6092 !important;}"+
"span.field_label:not([class*=\"separator\"]) {margin-right:8px !important;} label.field_label {margin:0 !important;}"+
"span > label.field_label {margin-right:0 !important;}\n"+
"#resetLink {color: #EEEEEE !important; margin-right:6px !important;}"+
"#saveBtn, #cancelBtn {position:fixed; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+
"#saveBtn {color: #5B9337 !important; bottom:4px; right:80px;}\n"+
"#cancelBtn {color: #BB0000 !important; bottom:4px; right:6px;}\n"+
"input[type=\"text\"] {text-align: center !important;width: 34px !important; color: #CCCCCC !important; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}"+
newOptionsCSS
);

if(main.realURL.find("filter=app_"+main.gameID)) GM_addStyle("#contentArea *[id*=\"_story_\"]:not([class*=\"aid_"+main.gameID+"\"]):not([id*=\"_collapsed\"]) {display:none !important;}");

// add options shortcut to user script commands
try {GM_registerMenuCommand(main.gameName+" Wall Manager "+version+" Options", main.config);}catch(e){}

// add div that holds the iframes for requests
if(!$("silent_req_holder")) document.body.appendChild(main.create("div", {id:"silent_req_holder", style:"position:fixed; top:0; left:0; z-index:9998; overflow: hidden;"+((GM_config.get("debug") === true || typeof GM_config.get("debug") != "boolean") ? " height:1px; width:1px; border:0; background:transparent;" : "height:80%; width:95%; border:5px ridge #00FF00; background:#000000; filter:alpha(opacity=85); opacity:.85;"), ondblclick:function(e){$("silent_req_holder").style.display="none";}},
	new Array(
		main.create("span", {textContent : "Double-click HERE to hide this debug frame.", style : "display: block; filter:alpha(opacity=100); opacity:1; color: #FFFFFF;"}),
		main.create("span", {id : "debugwhichtype", innerHTML : "Type: \n<br>\nKey: ", style : "display: block; color: #FFFFFF;"})
		)));

// Method to work on multiple accounts
var prof = $("navAccountName") || document.evaluate(".//a[.='Profile' or .='Profilo' or .='Profiel' or .='Profil' or .='Perfil']", ($("pageNav") || document.body), null, 9, null).singleNodeValue;
main.profile = prof.href.find("id=") ? prof.href.split("id=")[1].split("&")[0] : prof.href.match(main.profileRegex)[1];

// If enabled, stay on the Most Recent feed
var mostrecent = $g(".//a[contains(@href, 'sk=lf')]", {node:$("pagelet_stream_header"), type:9});
if(GM_config.get("mostrecent") === true && mostrecent != null) {
	if(main.realURL.find("sk=h")) window.location.replace(main.realURL.replace(/([&?])sk=h/, "$1sk=lf"));
		else if(/\?\w+=[^&]*/.test(main.realURL)) window.location.replace(main.realURL + "&sk=lf");
		else window.location.replace(main.realURL + "?sk=lf");
}

// if on the homepage with the home feed showing
if($("pagelet_navigation") && (GM_config.get("filteronly") ? main.realURL.find("filter=app_"+main.gameID) : true)) {

// add stylesheets
GM_addStyle(""+
"#"+main.streamID+" a[id^=\"item_done_\"] {font-weight: bold; font-size: 12px; color: #008800;}\n"+
"#"+main.streamID+" a[id^=\"item_\"]:not([id^=\"item_done_\"]):not([id^=\"item_failed_\"]):not([id^=\"item_processing_\"]) {font-weight: normal; font-size: 10px; color: #6E6E6E;}\n"+
"#"+main.streamID+" a[id^=\"item_processing_\"] {color: #DFDF00 !important;}\n"+
"#"+main.streamID+" a[id^=\"item_failed_\"] {font-weight: bold; font-size: 12px; color: #D70000;}"+

(GM_config.get("colorcode")===true ? "\n\n"+
"*[id^=\"stream_story_\"], .itemneutral , .itemneutral div[id$=\"_collapsed\"] {background-color: #E8E8E8;}"+
".itemdone, .itemdone div[id$=\"_collapsed\"] {background-color: #91FF91 !important;}\n"+
".itemprocessing, .itemprocessing div[id$=\"_collapsed\"] {background-color: #FFFF7D !important;}\n"+
".itemfailed, .itemfailed div[id$=\"_collapsed\"] {background-color: #FF7171 !important;}"+
".itemerror, .itemerror div[id$=\"_collapsed\"] {background-color: #95C4DF !important;}"+
"#"+main.streamID+" a[id^=\"item_\"] {color: #000000 !important;}" : "")
);

// new option highlighter
var newOptionsCSS = "";
for(var i=0; i<newOptions.length; i++) newOptionsCSS += "#GM_config label[for=\"field_"+ newOptions[i] +"\"]" + (i < newOptions.length-1 ? ", " : "");
GM_addStyle(newOptionsCSS.replace(/\n$/, "") + " {background: #549102;}");

// method to speed up script considerably
var tempopts={}, settings=GM_config.settings;
for(var thing in settings) { // go through the options making cached options copy
	var g=GM_config.get(thing), kids=settings[thing].kids;
	switch(typeof g) {
		case "boolean": tempopts[thing] = g; break;
		case "number": tempopts[thing] = g || 0; break;
		case "text": tempopts[thing] = g || ""; break;
		default: tempopts[thing] = g;
	}
	if(kids && typeof kids=="object") for(var kid in kids) { // go through the extended settings also
		var k=GM_config.get(kid);
		switch(typeof k) {
			case "boolean": tempopts[kid] = k; break;
			case "number": tempopts[kid] = k || 0; break;
			case "text": tempopts[kid] = k || ""; break;
			default: tempopts[kid] = k;
		}
	}
}
main.opts = tempopts; tempopts=null; k=null; g=null; settings=null;

// another method to speed up - keep about:config clean
var acc=main.getAccepted(), accTime=main.getAcceptedTime(), DetlColl=main.getDetlColl(), timeNow=new Date().getTime(), ageHours=parseInt(main.opts["itemage"]) * 24;
for(var w in accTime) {
	var accTimew=accTime[w], accw=acc[w];
	for(var k in accTimew) { // loop through the accepted items' times
		if(((timeNow-accTimew[k])/3600000) > ageHours && accw.inArray(k)) {
			accw.splice(accw.inArrayWhere(k), 1); // remove from accepted items array
			delete accTimew[k]; // remove from time object
			try{ delete DetlColl[k]; }catch(e){} // this collection was failed and isn't in the detailed collectibles object
		}
	}
}
var failed=main.getFailed(), failedTime=main.getFailedTime();
for(var w in failedTime) {
	var failedTimew=failedTime[w], failedw=failed[w];
	for(var k in failedTimew) { // loop through the failed items' times
		if(((timeNow - failedTimew[k])/3600000) > ageHours && failedw.inArray(k)) {
			failedw.splice(failedw.inArrayWhere(k), 1); // remove from failed items array
			delete failedTimew[k]; // remove from time object
		}
	}
}
main.setAccepted(acc);
main.setAcceptedTime(accTime);
main.setFailed(failed);
main.setFailedTime(failedTime);
main.setDetlColl(DetlColl);
acc=null; accTime=null; DetlColl=null; timeNow=null; ageHours=null; failed=null; failedTime=null;

// add debug status bar to page
document.body.appendChild(main.create("div", {id:"status",style:"position: fixed; bottom: 24px; left: 4px; padding:2px; background: #FFFFFF; color: #000000; border: 1px solid #4F4F4F; font-family: arial, verdana, sans-serif; font-size: 1em; z-index: 99998; width: 192px; text-align: center;",textContent:"["+main.gameAcronym+"] 0 requests currently (0 done)", onclick:function(e){
	if(main.boxFull) return;
	main.paused = !main.paused;
	main.pauseClick = true;
	main.pauseCount = main.opts["inputtimeout"] || 15;
	main.status();
}}));

// listen for key presses to autopause, if enabled
if(GM_config.get("inputtimeoutenable")) window.addEventListener("keydown", main.keyDownFunc, true);

// prevent users from picking options that don't go together
var opts = main.opts;
if(opts["removedone"] == true && (opts["minposts"] != "off" || opts["hoursback"] != "off")) { // 'min posts' and 'hide finished items' are on
	GM_config.set("removedone", "off"); main.opts["removedone"] = "off";
	GM_config.save();
	alert("Error:\n\nThe 'minimum posts' and/or 'backtrack' options cannot be on while the 'hide finished items' option is on because it will cause an infinite loop of clicking the 'Older Posts' link.\n\nThe 'hide finished items' option has been disabled.");
}
if(opts["minposts"] != "off" && opts["maxposts"] != "off" && parseInt(opts["minposts"])>parseInt(opts["maxposts"])) { // 'min posts' is higher than 'max posts'
	GM_config.set("minposts", "off"); main.opts["minposts"] = "off";
	GM_config.set("maxposts", "off"); main.opts["maxposts"] = "off";
	GM_config.save();
	alert("Error:\n\nThe 'minimum posts' option is higher than the 'maximum posts' option.\n\nBoth the 'minimum posts' and 'maximum posts' options have been turned off.");
}
if(opts["hoursback"] != "off") {
	main.opts["arinterval"] = "off";
	GM_config.set("hoursback", "off");
}
if(opts["debug"] === true) {
	opts["maxrequests"] = 1;
	opts["reqtimeout"] = 9999;
	opts["arinterval"] = "off";
	opts["removedone"] = true;
	opts["minposts"] = true;
	opts["maxposts"] = true;
}

// Set the time out length on a request
main.reqTO = Math.round(main.opts["reqtimeout"]*1000);

// make script run every second, update debug bar, and click similar posts links
var runint = window.setInterval(function(e) {
	window.setTimeout(function(){main.run();},0);
	switch(main.opts["status"] == true) {case true: main.status(); break;}
	switch(main.opts["similarposts"] == true) {case true: main.similarPosts(); break;}
	switch(main.opts["minposts"] != "off") {case true: main.expand(); break;}
	switch(main.opts["hoursback"] != "off") {case true: main.hoursBack(); break;}
}, 1000);

// add autorefresh if enabled
if(main.opts["arinterval"] != "off") window.setTimeout(main.refresh, main.refTime);
} else if(document.title=="Problem loading page") main.refresh();

// add another shortcut to the config, this time as a link on the page
var iOp=0, opInt = window.setInterval(function() {
	var na = $("navAccount"), f = $(main.navIDnf),
		a = (na != null ? na.getElementsByTagName("ul")[0] : null),
		link1 = main.create("li", {id:main.navID+"_"+main.gameAcronym.toLowerCase()+"_1"}, new Array(
	main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
		main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:imgs.icon}))),
		main.create("span", {textContent:main.gameAcronym+" "+version+" Options"})
		)))),
		link2 = main.create("li", {id:main.navID+"_"+main.gameAcronym.toLowerCase()+"_2"}, new Array(
			main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
			main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:imgs.icon}))),
			main.create("span", {textContent:main.gameAcronym+" "+version+" Options"})))
		));
	if(f && !$("navItem_fvwm_1")) f.parentNode.appendChild(link1);
	if(a && !$("navItem_fvwm_2")) a.appendChild(link2);
	if((f && a) || iOp>=10) window.clearInterval(opInt);
	iOp++;
}, 500);

// pre-load images
for(var img in imgs) new Image().src = imgs[img];
}

// section for reclaiming memory and stopping memory leaks
window.addEventListener("beforeunload", function(e) {
	window.removeEventListener("keydown", main.keyDownFunc, true);
	main=null; GM_config=null; iOp=null; opInt=null; runInt=null; prof=null; GM_addStyle=null; $=null; imgs=null; unsafeWindow=null; version=null; isGM=null; $g=null; debugFrameShow=null;
}, true);

// new user recognition
var newuser = main.getValue(main.gameAcronym+"_newuser", true);
if(newuser != true) {
	main.message("Welcome to "+main.gameName+".<br><br>"+
				"<a href=\""+main.scriptHomeURL+"\" target=\"_blank\">Click here</a> to learn proper use of this script.<br><br>"+
				"Thank you for choosing "+main.gameAcronym+".<br><br>"+
				"The config screen will popup in 30 seconds...");
	window.setTimeout(main.config, 30000);
	main.setValue(main.gameAcronym+"_newuser", true);
}

// If enabled, add the code to block ads
if(GM_config.get("blockads") === true) GM_addStyle("#pymk_hp_box, div[id*=\"_no_ad_ctr\"], .UIStandardFrame_SidebarAds, #sidebar_ads, iframe:not([src*=\"/facebook\"]):not([src*=\"slashkey\"]):not([src*=\"facebook.com\"]):not([src*=\"zynga.com\"]):not([src*=\"myofferpal.com\"]):not([id=\"GM_config\"]):not([src*=\"farmville.com\"]):not([src*=\"yoville.com\"]):not([id=\"upload_iframe\"]), #home_sponsor_nile, div[class*=\"ad_capsule\"], div[class*=\"social_ad\"], div[class*=\"sponsor\"], div[id*=\"sponsor\"], .welcome_banner, #FFN_imBox_Container {display:none !important;}");

// If enabled, add the code to force the older posts bar to the bottom
if(GM_config.get("olderpostsbottom") === true) GM_addStyle("#contentArea div.uiMorePagerAnchor, #contentArea div.uiMorePager {-moz-border-radius: 4px !important; position: fixed !important; bottom: 2px !important; left: 22% !important; width: 25% !important;z-index: 9999 !important;}");

// Make grab links in posts line up on the right hand side of the post
GM_addStyle(".UIActionLinks > a[href*=\"onthefarm\"] { float: right !important;}");

})(); // anonymous function wrapper end