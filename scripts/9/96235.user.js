// ==UserScript==
// @name           FarmVille Wall Manager
// @namespace      http://userscripts.org/users/23652
// @description    Manages farmville wall posts; accepts bonuses, grabs bouquets, adopts animals, hatches eggs, and more
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @exclude        http://*.facebook.com/messages*
// @exclude        http://*.facebook.com/groups* 
// @exclude        http://*.facebook.com/events*
// @exclude        http://*.facebook.com/*sk=media*
// @exclude        http://*.facebook.com/*sk=ru*
// @exclude        http://*.facebook.com/album* 
// @exclude        http://*.facebook.com/photo*
// @copyright      JoeSimmons
// @version        1.2.235
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=96235&days=1
// @require        http://userscripts.org/scripts/source/29910.user.js
// @run-at         document-end
// ==/UserScript==

(function() { // use an anonymous function wrapper

var version = "1.2.235"; // cant use cdata+regexp to grab version dynamically because of webkit

// list of new options so they can be
// highlighted for easy discovery on update
var newOptions = new Array(
	"jackolantern",
	"mappieces",
	"sendbucket",
	"sendrope",
	"mermaidtale",
	"spyglass",
	"shell",
	"calftourist",
	"foalblackunicorn",
	"bighalloweencandle",
	"flashlight",
	"confettibomb",
	"lightstick",
	"candymap",
	"tricks",
	"foalcandycornunicorn",
	"claimheadlesshorsemangnome",
	"claimcobwebbedtree",
	"unicorncandycorn",
	"foalfireskeleton",
	"foalbutterfly",
	"foalnightmareminipegasus",
	"bigfallribbonflower",
	"giantgoldenfairy"
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
return false;
};

Array.prototype.inArrayWhere = function(value) {
for(var i=0,l=this.length; i<l; i++) {if(this[i]==value) {return i;}}
return false;
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
var node = (typeof e=='string') ? document.getElementById(e) : ((typeof e=='object') ? e : false);
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
if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
var obj=O||({del:false,type:6,node:document}), r, t,
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
					try {
						GM_config.values[f] = field.options[field.selectedIndex].value;
					} catch(e) {}
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
 '.field_label {font-weight:none; font-size:12px; margin-right:6px;}\n' +
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
}; // end gm config

var main = {

// random assortment of vars
pendingRefresh : false,
delay : false,
configOpenWait : false,
paused : false,
pauseClick : false,
boxFull : false,
pauseCount : 0,
openCount : 0,
reqTO : 30000,
profile : "",
acceptedText : "Got this!",
failText : "Already taken or expired!",

// Changeable vars for adaptation to other games (ease of use)
streamID : "contentArea",
//stream : ($("home_stream") || $("pagelet_intentional_stream") || $("contentArea")),
get stream() { return ($("home_stream") || $("pagelet_intentional_stream") || $("app_stories") || $("pagelet_wall") || $(main.streamID)); },
get realStream() { return ($("home_stream") || $("pagelet_intentional_stream") || $("app_stories") || $("pagelet_wall") || $(main.streamID)); },
navID : "navItem",
navIDnf : "navItem_nf",
gameID : "102452128776", // game id
gameURLpart : "onthefarm", // game url folder for apps.facebook.com/HERE/ (only some games have this)
gameName : "FarmVille",
gameAcronym : "FVWM",
scriptHomeURL : "http://chargraph.com/josh/fvwm/",
gameKeyUrlKeyword : "key=", // used in the regex and xpath to look for "key=" or "sk=" or whatever it may be
xpQueryTextExcludes : ["Visit", "Fertilize their", "Lend a Hand", "Send Materials", "Send materials", "is looking for something", "wants to send a big", "wants to share", "found some", "has found a", "found a", "found some fuel", "is trying to", "could really use some help", "new FarmVille puppy is hungry", "wants YOU to help", "just completed level", "was working in the stables", "finished growing", "has completed a", "finished a job", "is hosting a barn raising", "is working hard on", "on up to", "Send puppy kibble", "Join their Co-op", "Play FarmVille Now", "Play FarmVille now", "Play FarmVille", "Feed their chickens", "Send Ingredients", "Send Shovels", "Accept", "Download from iTunes", "Send Supplies", "Send Vehicle Parts", "Send Watering Cans", "Send Building Parts", "Get a makeover too", "Help them out", "Send doggie treats", "Check Out Present", "Send Parts", "Visit Model Farm now", "Send Love", "Send Gold", "Join them now", "Visit GagaVille", "Visit Trading Post", "Start Trading"],

// empty options object for later modification
opts : {},
// all regexps are stored here
whichRegex : /(license|tricks?|candy map|confetti bomb|light stick|map pieces|jack-o-lantern|flashlight|mermaid tale|shell|spyglass|send (bucket|rope)|treats|spider|ghost cupcake|vampire teeth|spooky bat|carmel apple|(pumpkin )?lollipop|halloween mask|creepy candle|goo(d)?|haunted brick|(door )?knockers?|scary decoration|banquet invitation|blindfold|(party )?favors|tasty fish|popcorn machine|blue ribbon|apple(?! wood basket)( basket| barrel)?|pinto|(red |gray )?horse|send horse (saddle|tiara|comb|shoe)|carrot on a stick|sugar cubes?|saddle|bridle|white llama|milking shorthorn|goat|brass cow bell|cow( collar| treat| tether)?|salt lick|milk bucket|boots|overalls|livestock tags|hay( bundle)?|wire|oat sack|tree fertilizer|(hobby )?horse(head)? rake|log|stone|bird (seed bunch|nest|whistle)|monkey mask|(zoo )?tickets|zookeeper hat|donate|black tabby|pet bed|chew toy|catnip|pacifier|painted wood|water pump|squirrel feeder|raccoon|(fence|scratch) post|shrub|grazing grass|scritchy brush|eau du skunk|animated butterflies|small pond|rainbow mystery|fairy wand|fruit crate|green gazing ball|fuchsia greenery|storybook|toadstool|buck|raffle (poster|ticket|drum)|fuzzy dice|wrench|clamp|pipe|white (goose|mustang)|turtle|racing stripe|picnic set|burlap sack|milk jug|manure bag|wool (blanket|bundle)|(apple wood|cherry|orange|lemon|walnut|maple syrup) basket|hinges?|sow|rope|axle|gear|flower bed|airship patch|grape juice|glitter|join team|(place )?order|magnet|flowerbed|piggy toy|vip ticket|hammer|concrete|twine|elbow grease|aster flower fence|pot of english rose|xp|praise|lemon( tree)?|boar|flowers|old books|electric torch|cheese culture|tractor|(goldeneye|warder) duck|night[ie]ngale|animated butterfly|pint glass|mouse trap|postcard|love potion|coins|calf|farmhands|sheep( shampoo)?|tree?( house)?|send (luck|sprinker|grow light)|cat|(chef |leprechaun )?gnome|irish cottage|rabbit|fertilize all|lucky|english hat|pink pig|love balloon|(send|get) one|duckling|chocolate|rsvp|firework|retaliate|revenge|magic hat|pile of snow|snowman (scarf|button)|baby (bonnets|calf|animal)|chicken|special delivery|ice sculpture|wrapping paper|boost|reindeer|holiday (lights?|treats?|gifts?)|difference|send a (bushel|turkey)|give item( to)?|animal|(send |animal )?feed|play|fruit cake|watering cans?|mystery (seedling|gift)|truffle|(wrapped )?candy( corn)?|(vehicle )?parts?|sample|seeds|bushel|catch a|reward|(?!hatch )an egg|eggs|decoration|bonus|hatch|adopt|bouquet|perfect bunch|present|fuel|help|collectible|flag|get materials|valentines?|claim|some|gold|bamboo|reed thatch|(send )?(baby )?bottle(s)?|(picnic )?blanket|smoker|beeswax|brick|nail|wooden board|horseshoe|harness|sawhorse|floral bracket|(steel|green) beam|glass sheet|white (willow|trellis)|irrigation pipe|honeybee|queen bee)/i,
claimRegex : /(vampire teeth|spooky bat|carmel apple|pumpkin lollipop|spider|ghost cupcake|apple|goo|haunted brick|creepy candle|knockers|bridle|saddle|hay bundle|wire|log|stone|steel beam|painted wood|water pump|fence post|shrub|grazing grass|wrench|clamp|pipe|hinge|tin sheet|screwdriver|spade|pail|crab|beach ball|pair of sunglasses|rope|axle|gear|hammer|concrete|twine|animal feed|lucky penny|special delivery|shovel|duck|horse|dutch rabbit|snowflake pole|holiday(?! gift)|firework|chicken|elf gnome|(mystery|holiday) gift|reindeer|stuffing|leaf candle|spiced cider|fruit cake|casserole|watering can|vehicle part|brick|nail|wooden board|truffle|good|seeds|bottle|blanket|harness|horseshoe|beeswax|smoker|kibble|dog treat|honeybee|date|banana|ginkgo|olive|yellow|red|mango|jackfruit|cashew|walnut)( tree)?/i,
ampRegex : /&amp;/g,
spaceRegex : /\s+/g,
spaceCharsRegex : /[\s\n ]+/g,
threeDotRegex : /\.{3}/g,
colorRegex : /(butterfly|candycorn|pumpkin|winged unicorn|(mini )?donkey|black dartmoor|dapplegray|thoroughbred|apple|(fire |glow )?skeleton|(mini )?bat(wing)?|tennessee|brumby|(mini )?pegasus|black (belgian|arabian)|peruvian|trotter|trakehner|draft|fall|quarter|new england|(black|zebra) unicorn|standardbred|friesian|arabian|black n white|fairy( mini| pink |unicorn)?|maremmano|flowered|comtois|vineyard( mini)?|camarillo|french( mini)?|rainbow( mini| pony)?|(?!white )(bay )?andalusian|charro|american|galiceno|azteca|golden (mini|stallion|pony)|hanoverian|swiss warmblood|clown|(mini )?party|chrome|bedazzled|zesty|welsh|hackney|royal( steed)?|king|cleveland bay|suffolk|(black |white )?shire|(small )?irish( hunter| cob)?|english|carnival|polka dots|clover|persian|dexter|falabella|knight|mongolian|yellow|valentine|icelandic|asian wild|fjord|disco|new year|holiday|paint|(black |blue mane |brown |pink )?gypsy( stallion)?|harvest( pony)?|nightmare( mini| pony)?|poncho|rhode island red|(mini )?candy (corn|cane)( pony)?|autumn|forest|western longhorn|saddle|ossabaw|strawberry|spotted|potbelly|buckskin( mini)?|palouse|camargue|(black |pink |purple |snow )?stallion( mini)?|(black )?mini(?! appaloosa)(ature)?( candycane)?|(?!new england )(red )?pinto( mini)?( pony)?|white(-tailed)?|morgan( stallion)?|red brown|simmental|breton|party|belted|haflinger|cream (draft|mini)|groovy|holstein|mouflon|(white )?mustang|tuscan|longhorn|(mini )?appaloosa|neapolitan|boer|chocolate|clydesdale|(black )?percheron|silver|(black|blue|connemara|dales|dartmoor|eriskay|exmoor|fairy|golden|merens|new forest|pottok|pink|purple|shamrock|shetland|silver|walking|yakut) pony(tail)?|(green|pink) patch|kelly green|red|purple( mini)?|(reit)?pony(?!tail)|green|pink|brown( pinto)?|black|blue|baby|white|gr[ae]y)(?=.+)/i,
animalRegex : /(palomino|pega(sus)?(?! foal)|(?!mini )appaloosa(?! foal)|(?!zebra )unicorn(?! foal)|(?!buckskin )(?!black )(?!cream )(?!fairy )(?!french )(?!golden )(?!pinto )(?!purple )(?!rainbow )(?!stallion )(?!valentine )(?!vineyard )mini(?!ature)(?! blue gypsy)(?! donkey)(?! bat)(?! party)(?! appaloosa)(?! candycane)(?! foal)|pinto(?! mini)(?! pony)(?! foal)|an egg|andalusian(?! foal)|a baby|mystery baby|quarter(?! foal)|percheron(?! foal?)|bedazzled(?! foal)|moiled|boar|piglet|lamb|thoroughbred(?! foal)|elephant|reindeer|chic|stallion(?! mini)(?! foal?)|buck(?!skin)|pig|llama|goat|cow|turtle|turkey|sheep|kitten|kitty|duck(ling)?|rabbit|bull|penguin|horse|calf?|foal?|pony(?!tail)(?! foal?))/i,
calfRegex : /(?:found a|found an|found an adorable|grew into a) (american|ayrshire|autumn|baby|belted|black angus|(black |milking )?shorthorn|blue( ox)?|b0v1n3-11|brown( swiss)?|bull|canadienne|candy cane|charolais|chocolate|chrome|devon|dexter|disco|english|fairy|fall|fan|flower|frankenstein bride|galician blond|gelbvieh|gray jersey|green( patch)?|grey oxen|groovy|guernsey|hereford|highland|holiday|holstein( bull)?|irish kerry|irish moiled( bull)?|jersey|kelly green|milky|mohawk|neapolitan|new year|nightmare|norwegian red|panda|pineywoods|pink( patch)?( bull)?|pumpkin|purple( valentine)?|rainbow|randall( bull)?|red( brown| heart)?|robot|sailor|simmental|skeleton|tourist|tuscan|valentine|vineyard|welsh black|(western )?longhorn|yellow patch|(yellow )?referee) calf/i,
foalRegex : /(?:found an adorable) (american( quarter)?|(spotted |mini )?appaloosa|apple|asian wild|autumn|azteca|(mini )?bat(wing)?|(bay |white )?andalusian|bedazzled|black( mini)?( unicorn)?( arabian| belgian| cherry| dartmoor| gypsy|n white mini| percheron| shire| stallion)?|(mini )?blue( mane)?( gypsy)?|breton|brown( gypsy)?|(brown |red |new england )?pinto( mini)?|brumby|buckskin( mini)?|butterfly|camargue|camarillo|(mini )?candy ?cane|(mini )?candy ?corn( pegasus| stallion| unicorn)?|carnival|charro|chrome( pegasus)?|cleveland bay|clown|clydesdale( stallion)?|comtois|cream (draft|mini)|dapplegray|disco|(mini )?donkey|draft|fairy( mini| pink| unicorn)?|falabella|fjord|flowered|forest|french (mini|percheron|unicorn)|galiceno|golden (mini|stallion)|green|grey|gypsy( stallion)?|hackney|haflinger|hanoverian|harvest( pony)?|high kick|icelandic|irish (cob|hunter)|lavender pegasus|king|knight|maremmano|(mini )?party|mini zebra pegasus|miniature|mongolian|morgan( stallion)?|mule baby|mustang|new year|nightmare( mini)?( pegasus| pony| unicorn| stallion)?|paint|palouse|(mini )?pegasus|percheron|peruvian|pink( gypsy| saddled| stallion| unicorn)?|pumpkin|pseudocorn|purple( bedazzled| stallion)?( mini)?( unicorn)?|quarter|rainbow( pony| mini| stallion)?|red|reitpony|royal( steed)?|saddle|silver|(fire |glow )?skeleton( unicorn)?|small irish cob|spectator|stallion mini|standardbred|suffolk|swiss warmblood|tennessee|trakehner|valentine( mini)?|vineyard( mini)?|welsh|white( mustang| pegasus)?( mini)?( unicorn)?|(white )?shire|(white )?thoroughbred|zesty|(black|blue|connemara|dales|dartmoor|eriskay|exmoor|fairy|golden|hackney palomino|merens|new forest|pottok|pink|pinto|purple|shamrock|shetland|silver|walking|yakut) pony(tail)?|(arabian|chestnut mini|cream|friesian|snow|trotter) stallion|(candycane|clover|lady gaga|mexican|winged|yellow|zebra) unicorn) foal/i,
yakRegex : /(?:found an adorable) ((gray |black )?baby) yak/i,
eggRegex : /(?:premium |uncommon |rare |treasured )?(apple|candycorn|buttercup|araucana|marans|faverolles|party|english|candycane|rainbow|rhode island red|scots grey|cornish|white|brown|black|golden)( mystery)?( eggs?)/i,
treeRegex : /(?:grew up to become a )?((big |giant )?(sugar skull|halloween( cookie| candy| candle)?|(shinko|bradford) pear|european (aspen|beech|pear)|umbrella bamboo|lombardy poplar|melaleuca|candelabra|african tulip|chicle|mossy|spider|(halloween|jack o) lantern|(dark|fire|elberta) peach|candy corn|fairy|coin|magic (orange|peach)|fleur de lis|july (confetti|ice cream)|father|ice cream|snowcone|cupcake|jewel|(red |pink )?gem( fruit)?|(fall )?ribbon flower|wedding|spring egg|lucky cookie|chocolate heart|(dark|candy|golden|rainbow|sour|crab|granny smith|caramel|honeycrisp) apple|mardi gras|mac&cheese|rainbow|(bell|star) flower|cocoa( truffle)?|french bread|monterey cypress|(july )?balloon|vera wood|mimosa silk|black locust|boom|ash|purple (hanging flower|magnolia)|royal crystal|midland hawthorn|(cork |pin )?oak|crack willow|(weeping|downy) birch|wych elm|pink dogwood|chinese (lantern|strawberry|tamarisk)|(mint|heart) candy|(red|speckled) alder|hazelnut|disco ball|holiday|mistletoe|ornament( tree ii)?|(red |umbrella |white )?pine|(purple )?bubble ?gum|tamarind|gulmohar|peach palm|cuban banana|mountain ebony|amherstia|(bird|black|chrome|rainier|rainbow) cherry|bahri date|autumn ginkgo|ponderosa lemon|key lime|manila mango|(picholine|mission) olive|blood orange|angel red pomegranate|(japanese|silver) maple|star ruby grapefruit|golden (apricot|fairy|malayan coconut|plum|starfruit)|hass avocado|(ruby|sartre) guava|longan|breadnut|(bay|indian) laurel|alma fig|white (cedar|plumeria|walnut)|chanee durian|yellow passion fruit|singapore jackfruit|wild (cashew|service)|dwarf almond))( tree)?/i,
materialRegex : /(castle duckula|count duckula's castle|horse paddock|cow pasture|cove|aviary|zoo|pet run|wildlife habitat|crafting silo|water wheel|craftshop|(botanical|spring) garden|(livestock|pig|sheep) pen|pigpen|(bedazzled|leprechaun's) cottage|greenhouse|duck pond|cupid's castle|party barn|snowman|winter workshop|(gingerbread|fun|haunted) house|turkey roost|orchard|garage|maison|japanese barn|beehive|nursery|stable)/i,
teamRegex : /(?:just started the|just finished the|just mastered a level of)?(bright yellow tractor|mechanic scarecrow|sheep topiary|apple red (harvester|seeder)|bonsai|tree house|post office|evergreen train|farmhand|yellow racer tractor|stone (wall|archway)|fertilize all|(dainty|iron|pine) fence i(i)?|shovel|(fuel|watering) can|arborist|lamp post|animal feed|vehicle part|swiss cabin|milking stool|scythe|horse sculpture|beach ball|brick|wooden board|nail|lucky penny|bottle|love potion|england postcard|modern table|puppy kibble|dog treat|moat( corner)?( i(i|ii|v)?)?|castle bridge)( recipe)?/i,
itemAllowedRegex : /(^collectible|^bushel|truffle|raising|fuel|giveitemto|sendabushel|sendfeed|sendaturkey|lovepotion)/,
keyRegex : null, // will be changed after main is defined - bug
frHostRegex : /frHost=([^&%]+)/,
nRegex : /\n+/g,
textRegex : /\w+ \w+.*/,
phpRegex : /#\/.*\.php/,
numberRegex : /\d+/,
timeRegex : /(\d+|about an?|a few) (seconds?|minutes?|hours?|days?) ago/,
profileRegex : /facebook\.com\/([^?]+)/i,
postStatusRegex : / ?item(done|neutral|processing|failed|error)/,
accTextRegex : /(congrat(ulation)?s|snowball thrown|hooray|play farmville|they want you to have this|you just agreed|lucky you|thanks for helping|just gave you|would you like|you've (been awarded|taken in|already (accepted|helped|collected|received|claimed))|yee-haw|your gift box|(wants |do )?you (already (have|hatched)|have already|collected a|just unlocked|helped|can only (claim|help)|to have this|want to|can find it in your)|it will be in your gift box)/i,
failTextRegex : /(sorry(?!, you have already received)|exceeded your limit|expired|(whoa|woah)(?! there! you can only (claim|help)| there farmer! you're already)|hold on|come back later|(had enough|received plenty of|thanks for trying to) help|someone already|only available for|try again|no room|proceed to send|slow down)/i,
accURLRegex : /(give_home|not_owned)/,
boxFullRegex : /(claimed all the rewards you can|leaving the bits in the dust|you have exceeded your limit|gift box is full|exceeded)/i,
emptyRegex : /\s*/g,
gameUrlPHPPage : /index\.php/,
whichBerriesRegex : /(fruit bar|sorbet|preserves|dried berries|berry basket)/,
whichCitrusRegex : /(bubble gum|juicer|sherbet|fruit wedges|citrus peel)/,
whichCowsRegex : /(cow bell|milking (bucket|stool)|milk bottle|more cowbell)/,
whichFlowersRegex : /(corsage|hummingbird|dried petals|butterfly|pollen)/,
whichGrainsRegex : /(grindstone|scythe|bran|chaff|flour)/,
whichSquashRegex : /(pumpkin seeds|stuffed pasta|decorative gourds|yerba mate|sitar)/,
bushelRegex : /(?:snatched up|is giving away free|is sharing|share some|some choice|one of the) (poplar wood|jack o lantern|clam|seafood|lobster|tarragon|lady slipper|hay|dill|darrow blackberry|butter & sugar corn|cauliflower|daylily|(red|purple) toadstool|chardonnay|zinfandel|snow cone|star flower|acorn squash|aloe vera|amaranth|artichoke|(purple )?asparagus|bamboo|barley|basil|(fire|bell) peppers?|birthday cake|black (berry|tea)|bluebells|(chandler )?blueberry|broccoli|cabbage|carnival squash|carrot|chickpea|chrome daisies|orange daisy|(red )?clover|coffee|columbine|crystal|(cupid )?corn(flower)?|cotton|(cove )?cranberry|cucumber|daffodil|double grain|eggplant|elderberry|electric (roses|lilies)|english (peas|roses)|field beans|forget me not|foxglove|ghost chili|ginger|gladiolus|grape|green (tea|roses)|heirloom carrot|(royal )?hops|iris|jalapenos|lavender|lemon balm|lilac( daffy)?|leeks|lily|morning glory|oat|(long )?onion|pattypan|peanut|peas|pepper(mint)?|pineapple|pink (carnation|asters|rose)|posole corn|(kennebec |cara )?potato(es)?|pumpkin|purple pod pea|(golden|purple|sun) (poppy|poppies)|radish|raspberry|red (currant|tulip)|red wheat|rhubarb|rice|rye|saffron|(red )?spinach|soybean|spring squill|square melon|squash|squmpkin|straspberry|strawberry|sugar cane|sunflower|(purple )?tomato(es)?|turnips|wheat|whisky peat|watermelon|white (grape|rose|pumpkin)|yellow melon|zucchini)( bushels?)?( baskets?)?/i,
seedRegex : /(?:successfully crossbred|special pollinated) (acorn squash|aloe vera|amaranth|artichokes|(purple )?asparagus|bamboo|basil|bell peppers|black (berries|rose)|blueberries|broccoli|cabbage|carnival squash|carrots|chickpea|clover|coffee|columbine|corn|cotton|cranberries|cucumber|daffodils|double grain|eggplant|elderberries|fire pepper|forget me not|ghost chili|ginger|gladiolus|goji berry|grapes|green tea|heirloom carrot|iris|jalapenos|lavender|lemon balm|lilac( daffy)?|leeks|(electric )?lilies|morning glory|oats|(long )?onion|orange daisies|peanuts|peas|peppers|peppermint|pineapples|pink roses|posole corn|potatoes|pumpkins|purple pod peas|(golden|sun) poppy|purple poppies|raspberries|red tulips|red wheat|rhubarb|rice|rye|saffron|(red )?spinach|soybeans|square melon|(pattypan )?squash|squmpkin|straspberry|strawberries|sugar cane|sunflowers|(purple )?tomato(es)?|wheat|whisky peat|watermelon|white (grapes|poinsettia|pumpkin|roses)|yellow melon|zucchini)( seeds?)/i,

// all texts for accepted items
accText : {
			bonus : "Got this bonus!",
			xp : "Got this free XP!",
			gnome : "Got this gnome!",
			raising : "Helped this neighbor!",
			hatch : "Hatched this egg!",
			adopt : "Adopted this animal!",
			bouquet : "Got this bouquet!",
			perfectbunch : "Got this perfect bunch!",
			box : "Got this mystery present!",
			fuel : "Got this fuel!",
			getmaterials : "Got these materials!",
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
			shovel : "Got this shovel!",
			hammer : "Got this hammer!",
			concrete : "Got this concrete!",
			twine : "Got this twine!",
			rope : "Got this rope!",
			axle : "Got this axle!",
			gear : "Got this gear!",
			stallion : "Helped this wandering stallion!",
			farmhands : "Got this farmhand!",
			arborists : "Got this arborist!",
			collectibleberries : "this berries collectible!",
			collectiblefruitbar : "this fruit bar!",
			collectiblesorbet : "this sorbet!",
			collectiblepreserves : "these preserves!",
			collectibledriedberries : "these dried berries!",
			collectibleberrybasket : "this berry basket!",
			collectiblecitrus : "this citrus collectible!",
			collectiblebubblegum : "this bubble gum!",
			collectiblejuicer : "this juicer!",
			collectiblesherbet : "this sherbet!",
			collectiblefruitwedges : "these fruit wedges!",
			collectiblecitruspeel : "this citrus peel!",
			collectiblecountrykitsch : "this cows collectible!",
			collectiblecowbell : "this cow bell!",
			collectiblemilkingbucket : "this milking bucket!",
			collectiblemilkingstool : "this milking stool!",
			collectiblemilkbottle: "this milk bottle!",
			collectiblemorecowbell : "this more cowbell!",
			collectibleflowers : "this flowers collectible!",
			collectiblecorsage : "this corsage!",
			collectiblehummingbird : "this hummingbird!",
			collectibledriedpetals : "these dried petals!",
			collectiblebutterfly : "this butterfly!",
			collectiblepollen : "this pollen!",
			collectiblegrains : "this grains collectible!",
			collectiblegrindstone : "this grindstone!",
			collectiblescythe : "this scythe!",
			collectiblebran : "this bran!",
			collectiblechaff : "this chaff!",
			collectibleflour : "this flour!",
			collectiblesquash : "this squash collectible!",
			collectiblepumpkinseeds : "these pumpkin seeds!",
			collectiblestuffedpasta : "this stuffed pasta!",
			collectibledecorativegourds : "these decorative gourds!",
			collectibleyerbamate : "this yerba mate!",
			collectiblesitar : "this sitar!",
			genericcollectible : "this collectible!",
			bushel: "Got these bushels!",
			flowers : "Got these flowers!",
			eggs : "Got these eggs!",
			valentines : "Got these valentines!",
			gold : "Got this gold!",
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
			sendcraftingmaterials : "Sent crafting materials!",
			seed : "Got these seeds!",
			sample : "Got this sample!",
			good : "Got these goods!",
			animalfeed : "Got this animal feed!",
			truffle : "Got this truffle!",
			wateringcan : "Got this watering can!",
			mysteryseedling : "Got this mystery seedling!",
			holidaygifts : "Got this holiday gift!",
			kibble : "Got this kibble!",
			dogtreat : "Got this dog treat!",
			sendfeed : "Sent this animal feed!",
			sendbabybottles : "Sent this baby bottle!",
			dynamicgrabbing : "Dynamically Grabbed This!",
			walltowall : "Got this wall-to-wall item!",
			chocolate : "Got this chocolate!",
			tree : "Got this tree!",
			jointeam : "Joined this team!",
			none : "Got this unknown item!"
},

collstatusText : {
			Accepted : "Accepted ",
			Refused : "Refused ",
			Got : "Got "
},

// get what type of item it is
which : function(e) {
var w=e.textContent.toLowerCase().match(main.whichRegex), text=$g(".//ancestor::*[starts-with(@id, 'stream_story_') or starts-with(@id, 'div_story_')]", {node:e, type:9}).textContent.replace(main.nRegex, "").replace(main.threeDotRegex, ""), lText = e.textContent.toLowerCase(),
	w2w = $g(".//ancestor::*[contains(@id, 'stream_story_')]//a[contains(@href, 'wall_to_wall') or contains(@href, 'walltowall')]", {node:e, type:9}) && $g(".//ancestor::*[contains(@id, 'stream_story_')]//span[@class='actorName']/a[2]", {node:e, type:9}) && !$g(".//ancestor::*[contains(@id, 'stream_story_')]//span[@class='actorName']/a[contains(@href, '"+main.profile+"')]", {node:e, type:9}),
	dynamicgrabbinglist = GM_config.get("dynamicgrabbinglist").prepareRegex().trim().replace(main.nRegex, "|"),
	dynlist = new RegExp("(" + dynamicgrabbinglist + ")", "i");

w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";

switch(w) {
case "license": case "trick": w="tricks"; break;
case "jack-o-lantern": w="jackolantern"; break;
case "spider": case "ghostcupcake": case "carmelapple": case "spookybat": case "pumpkinlollipop": case "vampireteeth": w="treats"; break;
case "doorknocker": w="knockers"; break;
case "tree": if(text.find("Bobbing for Apples")) w="whitewalnut";
				else w="tree"; break;
case "bushel": if(text.find("Butter & Sugar Corn")) w="bushelbuttersugarcorn";
				else w="bushel"; break;
case "donate": w="lunchbox"; break;
case "feed": if(lText.find("get")) w="animalfeed"; 
				else if(lText.find("send")) w="sendfeed"; break;
case "animal": if(text.find("finished building their Wildlife Habitat")) w="porcupine";
				else if(text.find("finished building their Pet Run")) w="kittyhimalayan";
				else if(text.find("finished building their Zoo")) w="elephantbaby";
				else if(text.find("finished building their Aviary")) w="goosefarm";
				else if(text.find("finished building their Livestock Pen")) w="goatred";
				else if(text.find("finished building their Cow Pasture")) w="moiledirish";
				else if(text.find("finished building their Horse Paddock")) w="horsecreamdraft";
				else if(lText.find("feed")) w="animalfeed";
				else w="none"; break;
case "applewoodbasket": case "walnutbasket": case "milkjug": case "woolbundle": case "manurebag": case "maplesyrupbasket": case "lemonbasket": case "cherrybasket": case "orangebasket": if(lText.find("send")) w="sendcraftingmaterials";
	else w="get"+w; break;
case "getmaterials": if(text.find("finished constructing")) w="vehiclepart"; 
						else w="getmaterials"; break;
case "babybottles": if(lText.find("send")) w="sendbabybottles";
						else if(lText.find("get")) w="bottle"; break;
case "rainbowmystery": w="hatchrainbow"; break;
case "tre": w="tree"; break;
case "coins": w="bonus"; break;
case "lucky": w="luckypenny"; break;
case "seeds": if(text.find("Forget-Me-Not")) w="seedforgetmenot";
				else if(text.find("crossbred")) {
					if(text.find("Straspberry")) w="straspberry";
						else if(text.find("Long Onion")) w="longonion";
						else if(text.find("Squmpkin")) w="squmpkin";
						else if(text.find("Red Spinach")) w="redspinach";
						else if(text.find("Lilac Daffy")) w="lilacdaffy";
						else if(text.find("Fire Pepper")) w="firepepper";
						else if(text.find("Double Grain")) w="doublegrain";
						else if(text.find("Purple Tomato")) w="purpletomato";
						else if(text.find("Sun Poppy")) w="sunpoppy";
						else if(text.find("Whisky Peat")) w="whiskypeat";
					} else w="seed"; break;
case "goldeneyeduck": case "horse": case "pinto": case "whitellama": case "milkingshorthorn": case "goat": case "blacktabby": case "buck": case "sow": case "boar": case "calf": case "sheep": case "rabbit": case "cow": case "cat": case "chicken": case "babycalf": case "catcha": case "reindeer": case "duckling": case "pinkpig": w="adopt"; break;
case "holidaygift": case "valentine": w += "s"; break;
case "anegg": if(!lText.find("adopt")) w="eggs";
case "sendone": if(text.find("Romantic Centerpieces")) w="romanticcenterpiece"; break;
case "getone": if(text.find("Huge Jack-O'Lantern") || (text.find("has collected") && text.find("Treats"))) w="treats";
				else if(text.find("Apple Barrel")) w="apple";
				else if(text.find("Sand Castle") || text.find("Beach Toys")) w="beachtoys";
				else if(text.find("Valentines")) w="valentines"; 
				else if(text.find("Flowers")) w="flowers"; 
				else w="none"; break;
case "boost": w="fertilizeall"; break;
case "difference": if(text.find("Save the Children's Japan Earthquake Emergency Fund")) w="flagjapan";
					else if(text.find("Challenge for the Children")) w="holidaybear"; break;
case "wateringcans": w="wateringcan"; break;
case "vehicleparts": case "part": w="vehiclepart"; break;
case "shovels": w="shovel"; break;
case "revenge": case "retaliate": if(text.find("snowball war")) w="disabled"; break;
case "present": if(text.find("unwrapped")) w="box"; break;
case "bouquet": if(lText.find("give")) {
					if(lText.find("rose")) w="rosebouquet";
						else w="givebouquet";
				} else if(text.find("Perfect Bunch")) w="perfectbunch"; break;
case "flag": if(text.find("Haiti")) w="flaghaiti"; break;
case "candy": if(lText.find("cotton")) w="cottoncandy";
				else w="candy"; break;
case "reward": if(text.find("Shovels")) w="shovel";
					else if(text.find("Llama")) w="llama";
					else if(text.find("Penguin")) w="penguin";
					else if(text.find("Clumsy Reindeer")) w="reindeerclumsy";
					else if(text.find("Fertilize All")) w="fertilizeall";
					else if(text.find("Farmhands")) w="farmhands";
					else if(text.find("Arborists")) w="arborists";
					else if(text.find("Brick")) w="brick";
					else if(text.find("Nail")) w="nail";
					else if(text.find("Wooden Board")) w="woodenboard";
					else if(text.find("Fuel")) w="fuel";
					else if(text.find("Honeybee")) w="honeybee";
					else w="bonus"; break;
case "parts": if(lText.find("building parts") || text.find("extra materials") || text.find("solid progress") || text.find("building parts") || text.find("halfway finished") || text.find("halfway done") || text.find("expanding") || text.find("finished")) w="getmaterials";
					else if(text.find("Wire")) w="wire";
					else if(text.find("Steel Beam")) w="steelbeam";
					else if(text.find("Water Pump")) w="waterpump";
					else if(text.find("Grazing Grass")) w="grazinggrass";
					else if(text.find("Shrub")) w="shrub";
					else if(text.find("Wrench")) w="wrench";
					else if(text.find("Pipe")) w="pipe";
					else if(text.find("Hinge")) w="hinge";
					else if(text.find("Clamp")) w="clamp";
					else if(text.find("Screwdriver")) w="screwdriver";
					else if(text.find("Painted Wood")) w="paintedwood";
					else if(text.find("Fence Post")) w="fencepost";
					else if(text.find("Stone")) w="stone";
					else if(text.find("Log")) w="log";
					else if(text.find("Tin Sheet")) w="tinsheet";
					else if(text.find("Hay Bundle")) w="haybundle";
					else if(text.find("Saddle")) w="saddle";
					else if(text.find("Bridle")) w="bridle";
					else w="vehiclepart"; break;
case "help": if(lText.find("and get one")) {
				// Farmville Second Birthday
				if(text.find("Doghouse")) w="doghouse";
					else if(text.find("Cowprint Balloon Arch")) w="cowprintballoonarch";
					else if(text.find("Lamppost")) w="lamppost";
					else if(text.find("Blue Bird")) w="bluebird";
					else if(text.find("Orange Duck")) w="orangeduck";
					else if(text.find("Bird Bath Fountain")) w="birdbathfountain";
					else if(text.find("Garden Shelter")) w="gardenshelter";
					else if(text.find("Bicycle Planter")) w="bicycleplanter";
					else if(text.find("Flower Bed")) w="flowerbed2";
					else if(text.find("Ivy Archway")) w="ivyarchway";
					else if(text.find("Bench Planter")) w="benchplanter";
					else if(text.find("FV Haybale")) w="fvhaybale";
				// Winter Countdown
				else if(text.find("White Soldier")) w="whitesoldier";
					else if(text.find("Icy Snowflake")) w="icysnowflake";
					else if(text.find("Frosty Snowflake")) w="frostysnowflake";
					else if(text.find("Blue Soldier")) w="bluesoldier";
					else if(text.find("Silver Ornament")) w="silverornament";
					else if(text.find("Gold Ornament")) w="goldornament";
					else if(text.find("Gold Soldier")) w="goldsoldier";
					else if(text.find("Cocoa Bear")) w="cocoabear";
					else if(text.find("Snow Drift")) w="snowdrift";
					else if(text.find("Snow Pile")) w="snowpile";
					else if(text.find("Gold Nutcracker")) w="goldnutcracker";
					else if(text.find("Cream Bear")) w="creambear";
				// Valentines Day Countdown
				else if(text.find("I Love You Stand")) w="iloveyoustand";
					else if(text.find("I Love You Sign")) w="iloveyousign";
					else if(text.find("XOXO")) w="xoxosign";
					else if(text.find("Purple Hay Bale")) w="purplehaybale";
					else if(text.find("Heart Teddy")) w="heartbear";
					else if(text.find("Caramel Bear")) w="caramelbear";
					else if(text.find("Fuchsia Greenery")) w="fuchsiagreenery";
					else if(text.find("Pink Greenery")) w="pinkgreenery";
					else if(text.find("Provencal Pot")) w="provencalpot";
					else if(text.find("Fancy Topiary")) w="fancytopiary";
					else if(text.find("Flax Plant")) w="flaxplant";
					else if(text.find("Dogwood Tree")) w="dogwoodtree";
				// Spring Countdown
				else if(text.find("Pastel Hay Bale")) w="pastelhaybale";
					else if(text.find("Flower Bucket")) w="flowerbucket";
					else if(text.find("Little Wagon")) w="littlewagon";
					else if(text.find("Spring Flowers")) w="springflowers";
					else if(text.find("Milk Crate")) w="milkcrate";
					else if(text.find("Azalea")) w="azalea";
					else if(text.find("Stone Archway")) w="stonearchway";
					else if(text.find("Spring Balloon Arch")) w="springballoonarch";
					else if(text.find("Weather Vane")) w="weathervane";
					else if(text.find("Fruit Crate")) w="fruitcrate";
					else if(text.find("Bouncing Horse")) w="bouncinghorse";
					else if(text.find("Green Patch Cow")) w="cowgreenpatch";
				}
				else if(text.find("Wandering Stallion")) w="stallion";
				else if(text.find("XP")) w="xp";
				else if(text.find("raising")) w="raising";
				else if(text.find("Arborist")) w="arborists";
				else if(text.find("Farmhand")) w="farmhands";
				else if(!lText.find("job")) w="bonus"; break;
case "claim": if(lText.find("collectible")) w="collectible";
				else if(text.find("Craftshop")) w="jointeam";
				else if(lText.find("love potion")) w="lovepotion";
				else if(lText.find("special prize")) {
					if(text.find("Disco")) w="cowdisco";
					else if(text.find("Purple Valentine")) w="cowpurplevalentine";
					else if(text.find("Instagrow")) w="instagrow";
				}
				else if(text.find("lamb")) w="lambbrown";
				else if((text.find("has a few extra of these") || text.find("found a") || text.find("has one to share")) && main.claimRegex.test(lText)) {
					if(text.find("Pair of Sunglasses") || text.find("Pail") || text.find("Beach Ball") || text.find("Spade") || text.find("Crab")) w="beachtoys";
					if(text.find("Vampire Teeth") || text.find("Spider") || text.find("Ghost Cupcake") || text.find("Spooky Bat") || text.find("Pumpkin Lollipop") || text.find("Carmel Apple")) w="treats";
						else w = lText.match(main.claimRegex)[1].replace(main.spaceRegex, "");
				}
				else if(text.find("Fuel Refills") || lText.find("fuel refill") || lText.find("large can of fu")) w="fuel";
				else if(lText.find("truffle")) w="truffle";
				else if(text.find("Free Coins")) w="bonus";
				else if(lText.find("candy")) w="candy";
				else if(lText.find("school supplies")) w="schoolsupplies";
				else if(lText.find("fertilize all")) w="fertilizeall";
				else if(lText.find("item")) {
					if(text.find("Black Pig")) w="pigblack";
						else if(text.find("White Pig")) w="pigwhite";
						else if(text.find("Ossabaw Pig")) w="pigossabaw";
						else if(text.find("Strawberry Pig")) w="pigstrawberry";
						else if(text.find("Pink Pot Belly")) w="pigpinkpotbelly";
				}
				else if(text.find("Beach Toys")) {
					if(text.find("Beach Umbrella")) w="claimbeachumbrella";
						else if(text.find("Beach Chair")) w="claimbeachchair";
						else if(text.find("Beach Hut")) w="claimbeachhut";
						else if(text.find("Poolside Pig")) w="claimpoolsidepig";
						else if(text.find("Scuba Sheep")) w="claimscubasheep";
						else if(text.find("Lifeguard Tower")) w="claimlifeguardtower";
				}
				else if(text.find("just redeemed")) {
					if(text.find("Fall Flowerbed")) w="claimfallflowerbed";
						else if(text.find("Autumn Fireplace")) w="claimautumnfireplace";
						else if(text.find("Harvest Gnome")) w="claimharvestgnome";
						else if(text.find("Ghost Pig")) w="pigghost";
						else if(text.find("Candy Corn Horse")) w="horsecandycorn";
				}
				else if(text.find("just redeemed") && text.find("tricked enough")) {
					if(text.find("Candycorn Unicorn")) w="unicorncandycorn";
						else if(text.find("Cobwebbed Tree")) w="claimcobwebbedtree";
						else if(text.find("Headless Horseman Gnome")) w="claimheadlesshorsemangnome";
				}
				else if(text.find("just traded") && text.find("Treats")) {
					if(text.find("Mini Jack-O'Lantern")) w="claimminijackolantern";
						else if(text.find("Pumpkin Terrier")) w="claimpumpkinterrier";
						else if(text.find("Pumpkin Cow")) w="cowpumpkin";
						else if(text.find("Big Candy Pumpkin")) w="bigcandypumpkin";
						else if(text.find("Halloween Pond")) w="claimhalloweenpond";
						else if(text.find("Nightmare Stallion")) w="stallionnightmare";
				}
				else if(text.find("Valentines")) {
					if(text.find("Red Heart Hay")) w="claimredhearthay";
						else if(text.find("Yellow Rose Stand")) w="claimyellowrosestand";
						else if(text.find("Fancy Carriage")) w="claimfancycarriage";
						else if(text.find("Luv Ewe")) w="claimluvewe";
						else if(text.find("Giant Teddy")) w="claimgiantteddy";
						else if(text.find("Valentine Ram")) w="claimvalentineram";
						else if(text.find("Pecking Ducks")) w="claimpeckingducks";
						else if(text.find("Pigs in Love")) w="claimpigsinlove";
						else if(text.find("3 Hearts Fountain")) w="claim3heartsfountain";
						else if(text.find("Pink Patch Cow")) w="cowpinkpatch";
						else if(text.find("Chocolate Fountain")) w="claimchocolatefountain";
						else if(text.find("Eiffel Tower")) w="claimeiffeltower";
						else if(text.find("Pink Swan")) w="claimpinkswan";
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
				else if(text.find("Gold")) {
					// new St. Patrick's Day items
					if(text.find("Kelly Green Hay")) w="claimkellygreenhaybale";
						else if(text.find("Clover Gnome")) w="claimclovergnome";
						else if(text.find("Clover Sheep")) w="claimcloversheep";
						else if(text.find("Clover Chicken")) w="claimcloverchicken";
						else if(text.find("Lucky Fountain")) w="claimluckyfountain";
						else if(text.find("Green Lighthouse")) w="claimgreenlighthouse";
					// old St. Patrick's Day items
						else if(text.find("Shamrock Sheep")) w="claimshamrocksheep";
						else if(text.find("Spring Flower Cart")) w="claimspringflowercart";
						else if(text.find("Leprechaun Gnome")) w="leprechaungnome";
						else if(text.find("Spring Pond")) w="claimspringpond";
						else if(text.find("Shamrock Castle")) w="claimshamrockcastle";
				}
				else if(text.find("Flowers")) {
					if(text.find("Spring Arch")) w="claimspringarch";
						else if(text.find("Flower Fountain")) w="claimflowerfountain";
						else if(text.find("Flower Tower")) w="claimflowertower";
						else if(text.find("Yellow Duck")) w="duckyellow";
						else if(text.find("Yellow Patch Cow")) w="cowyellowpatch";
						else if(text.find("Flower Sheep")) w="sheepflower";
				}
				else if(text.find("Spring Eggs")) {
					if(text.find("Mystery Egg")) w="claimmysteryegg";
						else if(text.find("Sunny Ewe")) w="claimsunnyewe";
						else if(text.find("Bunny Gnome")) w="claimbunnygnome";
						else if(text.find("Gilded Egg")) w="claimgildedegg";
						else if(text.find("Flower Fountain")) w="claimflowerfountain";
						else if(text.find("Dutch Windmill")) w="claimdutchwindmill";
				}
			//	} if(w != "collectible") break;
				else w="none"; break;
case "collectible": w += (
						text.find("Fruit Bar") ? "fruitbar":
						text.find("Sorbet") ? "sorbet":
						text.find("Preserves") ? "preserves":
						text.find("Dried Berries") ? "driedberries":
						text.find("Berry Basket") ? "berrybasket":
				text.find("Berries Collection") ? "berries":
						text.find("Bubble Gum") ? "bubblegum":
						text.find("Juicer") ? "juicer":
						text.find("Sherbet") ? "sherbet":
						text.find("Fruit Wedges") ? "fruitwedges":
						text.find("Citrus Peel") ? "citruspeel":
				text.find("Citrus Collection") ? "citrus":
						text.find("Cow Bell") ? "cowbell":
						text.find("Milking Bucket") ? "milkingbucket":
						text.find("Milking Stool") ? "milkingstool":
						text.find("Milk Bottle") ? "milkbottle":
						text.find("More Cowbell") ? "morecowbell":
				text.find("Cows Collection") ? "cows":
						text.find("Corsage") ? "corsage":
						text.find("Hummingbird") ? "hummingbird":
						text.find("Dried Petals") ? "driedpetals":
						text.find("Butterfly") ? "butterfly":
						text.find("Pollen") ? "pollen":
				text.find("Flowers Collection") ? "flowers":
						text.find("Grindstone") ? "grindstone":
						text.find("Scythe") ? "scythe":
						text.find("Bran") ? "bran":
						text.find("Chaff") ? "chaff":
						text.find("Flour") ? "flour":
				text.find("Grains Collection") ? "grains":
						text.find("Pumpkin Seeds") ? "pumpkinseeds":
						text.find("Stuffed Pasta") ? "stuffedpasta":
						text.find("Decorative Gourds") ? "decorativegourds":
						text.find("Yerba Mate") ? "yerbamate":
						text.find("Sitar") ? "sitar":
				text.find("Squash Collection") ? "squash":
					""); break;
case "some": if(text.find("seeds")) {
				if(text.find("Straspberry")) w="straspberry";
					else if(text.find("Long Onion")) w="longonion";
					else if(text.find("Squmpkin")) w="squmpkin";
					else if(text.find("Red Spinach")) w="redspinach";
					else if(text.find("Lilac Daffy")) w="lilacdaffy";
					else if(text.find("Fire Pepper")) w="firepepper";
					else if(text.find("Double Grain")) w="doublegrain";
					else if(text.find("Purple Tomato")) w="purpletomato";
					else if(text.find("Sun Poppy")) w="sunpoppy";
					else if(text.find("Whisky Peat")) w="whiskypeat";
				}
				else if(text.find("Tin Sheet")) w="tinsheet";
				else if(text.find("Hinge")) w="hinge";
				else if(text.find("Screwdriver")) w="screwdriver";
				else if(text.find("Thanksgiving")) w="thanksgivingfeast";
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
case "bonus": if(text.find("Beach Toys")) w="beachtoys";
				else if(text.find("Greenhouse")) w="specialdelivery";
				else if(text.find("Holiday Gifts")) w="holidaygifts";
				else if(text.find("Pine Tree")) w="pine";
				else if(text.find("Silver Nutcracker")) w="nutcracker";
				else if(text.find("Holly Arch")) w="hollyarch";
				else if(text.find("Shovels")) w="shovel";
				else if(text.find("School Supplies")) w="schoolsupplies";
				else if(text.find("Valentines")) w="valentine";
				else if(text.find("Gold pieces")) w="gold";
				else if(text.find("Spring Eggs")) w="eggs";
				else if(text.find("special Ram")) w="ram";
				else if(text.find("special Red Sheep")) w="sheepred";
				else if(text.find("special bonus Lamb")) w="pinklamb"; break;
case "decoration": if(text.find("Botanical Garden")) w="decorationgarden";
						else if(text.find("Japanese Barn")) w="decorationjapanesebarn";
						else w="decoration"; break;
}

// Adoption posts not labeled as "Adopt"
if(text.find("found a surprise visitor eating their animal feed. They've adopted it")) w="adopt";

// Tree posts
if(text.find("get this new tree")) w="tree";

// Dynamic Item Grabbing
if(dynamicgrabbinglist != "" && GM_config.get("dynamicgrabbing") === true && (dynlist.test(text) || dynlist.test(lText))) w="dynamicgrabbing";

// Wall-to-Wall Item Grabbing
//		if it's a wall-to-wall post and it's not for you, it is ignored
//		otherwise, it's counted as a normal item
if(w2w) w="disabled";

return w;
},

// get which animal it is
whichAnimal : function(e) {
	var lText=e.textContent.toLowerCase(), w=e.textContent.toLowerCase().match(main.animalRegex), color=main.whichColor(e), text=$g(".//ancestor::*[contains(@id, 'stream_story_') or contains(@id, 'div_story_')]", {node:e, type:9}).textContent.replace(main.nRegex, "").replace(main.threeDotRegex, "").toLowerCase();
	w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "unknown";

	switch(w) {
		case "chic": w="chicken"; break;
		case "foa": w="foal"; break;
		case "cal": w="calf"; break;
		case "pegasus": case "appaloosa": case "stallion": case "unicorn": case "quarter": case "gyps": case "palomino": case "mini": case "pinto": case "bedazzled": case "andalusian": case "thoroughbred": w="foalwhitethoroughbred"; w="foal"; break;
		case "kitten": 
			if(text.find("black kitten")) w="kittyblack"; break;
		case "duckling": 
			if(text.find("yellow")) w="ducklingyellow";
				else if(text.find("brown")) w="ducklingbrown";
				else if(text.find("ugly")) w="duckugly";
				else if(text.find("red")) w="ducklingred";
				else if(text.find("blue")) w="ducklingblue";
				else w="duckling"; break;
		case "mysterybaby": 
			if(text.find("wildlife habitat")) {
				if(text.find("rare")) w="wildlifebabyrare";
					else w="wildlifebabycommon";
			} 
			else if(text.find("pet run")) {
				if(text.find("rare")) w="mysterybabyrare";
					else w="mysterybabycommon";
			} 
			else if(text.find("zoo")) {
				if(text.find("rare")) w="zoobabyrare";
					else w="zoobabycommon";
			} else if(text.find("livestock pen")) {
				if(text.find("rare")) w="livestockrare";
					else w="livestockcommon";
			} 
			else w="unknown"; break;
		case "anegg": 
			if(text.find("rare")) w="eggrare";
				else w="eggcommon"; break;
		case "ababy": 
			if(text.find("foal")) w="foal";
				else if(text.find("calf")) w="calf";
				else if(text.find("yak")) w="yak";
				else w="unknown"; break;
	}
	
	// add color to animal if the animal is a known one
	if(w != "unknown" && w != "kittyblack") w += color;

	if(text.find("turkey costume")) w="turkey";
	if(lText.find("pink pot belly")) w="pigpinkpotbelly";
	if(lText.find("pink pig")) w="pighotpink";
	if(text.find("himalayan kitty")) w="kittyhimalayan";
	if(lText.find("dexter cow")) w="cowdexter";
	if(text.find("fan cow")) w="cowfan";
	if(text.find("persian cat")) w="catpersian";
	if(text.find("dorking")) w="chickendorking";
	if(text.find("special rabbits")) w="rabbitenglishspot";
	if(lText.find("yellow sow")) w="sowyellow";
	if(lText.find("black rabbit")) w="rabbitblack";
	if(lText.find("black tabby")) w="catblacktabby";
	if(text.find("red toggenburg goat")) w="goatredtoggenburg";
	if(text.find("milking shorthorn")) w="cowmilkingshorthorn";
	if(text.find("white llama")) w="llamawhite";
	if(text.find("red patch pinto")) w="horseredpinto";
	if(text.find("gray horse")) w="horsegray";
	if(text.find("red horse")) w="horsered";
	if(text.find("goldeneye duck")) w="duckgoldeneye";
	if(text.find("b0v1n3-11")) w="calfbovine11";
	if(text.find("giving away a free calf")) w="calfbaby";
	if(text.find("adorable calf")) w="calfbaby";
	if(text.find("mistletoe donkey")) w="foalmistletoedonkey";
	if(text.find("baby ox")) w="calfbabyox";
	if(text.find("baby mule")) w="foalmule";

	return w;
},

// get which color an animal is
whichColor : function(e) {
	var lText=e.textContent.toLowerCase(), w=lText.match(main.colorRegex), text=$g(".//ancestor::*[contains(@id, 'stream_story_') or contains(@id, 'div_story_')]", {node:e, type:9}).textContent.replace(main.nRegex, "").replace(main.threeDotRegex, "").toLowerCase();
		w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "";

	switch(w) {
		case "white-tailed": w="whitetailed"; break;
	//	case "mini": w=lText.find("miniature") ? "miniature" : "mini"; break;
	}

	if(lText.find("a baby") && main.foalRegex.test(text)) w = text.match(main.foalRegex)[1].replace(main.spaceRegex,"");
	if(lText.find("a baby") && main.yakRegex.test(text)) w = text.match(main.yakRegex)[1].replace(main.spaceRegex,"");
	if((lText.find("calf") || lText.find("a baby")) && main.calfRegex.test(text)) w = text.match(main.calfRegex)[1].replace(main.spaceRegex,"");
	if(w.find("yellowcattle")) w = w.replace("yellowcattle", "gelbvieh");
//	if(w.find("gray")) w = w.replace("gray", "grey");
	
	// changing names due to horse paddock / foalRegex
	if(lText.find("arabian stallion")) w="arabianstallion";
	if(lText.find("clydesdale stal")) w="clydesdalestallion";
	if(lText.find("friesian stallion")) w="friesianstallion";
	if(lText.find("rainbow stallion")) w="rainbowstallion";
	if(lText.find("candy corn stallion")) w="candycornstallion";
	if(lText.find("trotter stallion")) w="trotterstallion";
	if(lText.find("nightmare unicorn")) w="nightmareunicorn";
	if(lText.find("candy corn unicorn")) w="candycornunicorn";
	if(lText.find("skeleton unicorn")) w="skeletonunicorn";
	if(lText.find("purple mini unicorn")) w="purpleminiunicorn";
	if(lText.find("white mini unicorn")) w="whiteminiunicorn";
	if(lText.find("black mini unicorn")) w="blackminiunicorn";
	if(lText.find("american quarter")) w="americanquarter";
	if(lText.find("mini blue gypsy")) w="minibluegypsy";
	if(lText.find("hackney palomino")) w="hackneypalominopony";
	if(lText.find("french percheron")) w="frenchpercheron";
	if(lText.find("brown pinto mini")) w="brownpintomini";
	if(lText.find("new england pinto")) w="newenglandpinto";
	if(lText.find("purple bedazzled")) w="purplebedazzled";
	if(lText.find("white andalusian")) w="whiteandalusian";
	if(lText.find("white thoroughbred")) w="whitethoroughbred";
	if(lText.find("spotted appaloosa")) w="spottedappaloosa";
	if(lText.find("nightmare pegasus")) w="nightmarepegasus";
	if(lText.find("candycorn unicorn")) w="candycornunicorn";
	if(lText.find("nightmare mini pega")) w="nightmareminipegasus";
	
	return w;
},

// get which color egg it is
whichEgg : function(e) {
	var w=e.replace(main.nRegex,"").toLowerCase().replace(main.threeDotRegex, "").match(main.eggRegex);
		w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";
	switch(w) {
		case "golden": w="gold"; break;
	}
	switch(w=="none") {case false: w="hatch"+w; break;}
	return w;
},

// get which tree it is
whichTree : function(e) {
	var w=e.replace(main.nRegex,"").toLowerCase().replace(main.threeDotRegex, "").match(main.treeRegex);
		w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";
	switch(w) {
		case "giantmac&cheese": w="giantmacandcheese"; break;
		case "rainbowcherry": w="rainbowapple"; break;
	}
	return w;
},

// get which team to join
whichTeam : function(e) {
	var w=e.replace(main.nRegex,"").toLowerCase().replace(main.threeDotRegex, "").match(main.teamRegex);
		w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";
	switch(w=="none") {case false: w="team"+w; break;}
	
	return w;
},

// get which materials it is
whichMaterial : function(e) {
	var w=e.replace(main.nRegex,"").toLowerCase().replace(main.threeDotRegex, "").match(main.materialRegex);
		w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";
	switch(w) {
		case "leprechaun'scottage": w="leprechauncottage"; break;
		case "cupid'scastle": w="cupidscastle"; break;
		case "countduckula'scastle": w="castleduckula"; break;
	}
	switch(w=="none") {case false: w="materials"+w; break;}
		
	return w;
},

// get which seed it is
whichSeed : function(e) {
	var w=e.replace(main.nRegex,"").toLowerCase().replace(main.threeDotRegex, "").match(main.seedRegex);
		w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";
	return w;
},

checkCollectible : function(d, t, rx) {
    var collmatch = t.toLowerCase().match(rx);
    return ((collmatch != "null" && collmatch != null) ? "collectible" + collmatch[1].replace(main.spaceRegex,"") : "")
},

// Created by avg, modified by JoeSimmons. shortcut to create an element
create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
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
evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
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
main.pauseClick=false;
main.pauseCount = main.opts["inputtimeout"] || 15;
main.status();
},

failedItem : function(t) {
	return main.failTextRegex.test(t);
},

gotItem : function(d, t) {
	return (main.accTextRegex.test(t) || main.accURLRegex.test(d.URL.toLowerCase()));
},

// function to debug stuff. displays in a big white textarea box
debug : function(s) {
	var d=$("debugT");
	if(!d) document.body.insertBefore(d=main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:80%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(main.create("text",s))), document.body.firstChild);
		else d.innerHTML+="\n\n\n\n"+s;
	if(d.style.display=="none") d.style.display="";
},

clearDebug : function() {
	var d=$("debugT");
	if(d) d.innerHTML = "";
},

// get the key for the url
getKey : function(b) {
	return (b.match(main.keyRegex) || "")[1];
},

storeTypes : /^(true|false|\d+)$/,
getValue : (isGM ? GM_getValue : (function(name, def) {
				var s=localStorage.getItem(name), val = ((s=="undefined" || s=="null") ? def : s);
				if(typeof val == "string" && main.storeTypes.test(val)) val = ((new Function("return "+val+";"))());
				return val;
			})),
setValue : (isGM ? GM_setValue : (function(name, value) {localStorage.removeItem(name); return localStorage.setItem(name, value);})),
deleteValue : (isGM ? GM_deleteValue : (function(name) {return localStorage.removeItem(name);})),

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

// get the accepted items
getAccepted : function() {
	return (new Function("return "+(main.getValue(main.gameAcronym.toLowerCase()+"_accepted_"+main.profile, "([])"))+";"))();
},

// save the accepted items
setAccepted : function(e) {
	var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_accepted_"+main.profile;
	main.setValue(store,val);
},

// get the accepted items
getFailed : function() {
	return (new Function("return "+main.getValue(main.gameAcronym.toLowerCase()+"_failed_"+main.profile, "([])")+";"))();
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

// reset the accepted items
resetAccepted : function() {
	if(confirm("Really reset accepted items?")) window.setTimeout(function() {
		var reset=main.deleteValue;
		reset(main.gameAcronym.toLowerCase()+"_accepted_"+main.profile, "([])");
		reset(main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile, "({})");
		reset(main.gameAcronym.toLowerCase()+"_failed_"+main.profile, "([])");
		reset(main.gameAcronym.toLowerCase()+"_failed_time_"+main.profile, "({})");
		reset(main.gameAcronym.toLowerCase()+"_DetlColl_"+main.profile, "({})");
	}, 0);
},

// get number of current requests
get currReqs() {
	return $g("count(.//iframe)",{node:$("silent_req_holder"),type:1});
},

itemAllowed : function(w) {
	return main.itemAllowedRegex.test(w);
},

// refresh whatever page they are on
toHomepage : function() {
	window.location.replace(main.realURL);
},

// go to the filter page
toFilterpage : function() {
	var url = window.location.href;
	if(url.find("filter=app_")) window.location.replace(window.location.protocol+"//"+window.location.host+"/home.php?filter=app_"+main.gameID+"&show_hidden=true"+(main.realURL.find("&ignore_self=true")?"&ignore_self=true":"")+"&sk=lf");
		else if(url.find("sk=cg")) window.location.replace(window.location.protocol+"//"+window.location.host+"/?sk=cg");
		else if(url.find("sk=app_102452128776")) window.location.replace(window.location.protocol+"//"+window.location.host+"/?sk=app_102452128776");
		else window.location.replace(main.realURL);
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
		case "tenth": t= 0.1; break; // 6 seconds
		case "sixth": t = 0.1666667; break; // 10 seconds
		case "quarter": t = 0.25; break; // 15 seconds
		case "third": t = 0.3333333; break; // 20 seconds
		case "half": t = 0.5; break; // 30 seconds
		case "one": t = 1; break; // 1 minute
		case "two": t = 2; break; // 2 minutes
		case "three": t = 3; break; // 3 minutes
		case "four": t = 4; break; // 4 minutes
		case "five": t = 5; break; // 5 minutes
		case "ten": t = 10; break; // 10 minutes
		case "10s30s": t = (Math.random() * 0.3333333) + 0.1666667; break; // random between 10s and 30s
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
	GM_config.open(); // open the options menu
},

removeDone : function() {
	var done = $g(".//a[(contains(@href,'album.php?aid=') and contains(.,'FarmVille Photos')) or (contains(@href,'"+main.gameURLpart+"') and (starts-with(@id,'item_done_') or starts-with(@id,'item_failed_') or starts-with(@id,'item_skip_') or contains(.,'"+main.xpQueryTextExcludes.join("') or contains(.,'")+"'))) or (contains(@href,'zyn.ga/')) or (.='FarmVille' and contains(@href, 'FarmVille')) or (contains(@href, 'zynga') and .='Download from iTunes')]/ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id, '_collapsed'))]", {node:main.stream});
	for(var i=0,len=done.snapshotLength; i<len; i++) if(!$g(".//span[starts-with(@class,'UIActionLinks')]//a[starts-with(@id,'item_processing_')] | .//*[starts-with(@id,'stream_story_') and contains(@id,'_collapsed')]", {type:9, node:done.snapshotItem(i)})) main.remove(done.snapshotItem(i).id);
},

// auto click "like" buttons if enabled
like : function(id) {
	var like=$g("//a[contains(@id,'_"+id+"')]/ancestor::span/button[@name='like' and @type='submit']", {type:9});
	if(like) like.click();
},

olderPosts : function() {
	var more=$g(".//a[contains(@class, 'uiMorePagerPrimary') and not(contains(@class,'async_saving')) and @href and @onclick]", {node:$("pagelet_stream_pager"), type:9});
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
	var lastPosts = $g(".//li[starts-with(@id,'stream_story_') and contains(@class,'"+main.gameID+"')]", {node:main.realStream, type:7}),
		oldestTime = $g(".//span[@class='uiStreamSource']//abbr[contains(@class,'timestamp') and @data-date]", {node:lastPosts.snapshotItem(lastPosts.snapshotLength-1), type:9});

		if(!oldestTime) return;
	var post_date = new Date(oldestTime.getAttribute("data-date")),
		now_date = new Date();

	// Manipulate the date object to be the time we want from the options
	now_date.setHours(now_date.getHours() - parseInt(main.opts["hoursback"]));

	// If the oldest post isn't as old as what the user wants, click "Older Posts"
	if(post_date > now_date) main.olderPosts();
		else {
			main.opts["hoursback"] = "off";
			GM_config.set("hoursback", "off");
		}
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
refresh : function(override) {
	main.pendingRefresh = true;
	if(main.currReqs==0 && !$("GM_config") && (main.paused === false && !override) && main.delay === false) {
		var i=0, refint=window.setInterval(function() {
			$("status").style.background = "#D5AEFF";
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
	switch(main.pauseCount) {case 0: if(!main.pauseClick) main.paused=false; break;}
	var hideF = opts["removedone"] === true,
		shortStatusText = "["+main.gameAcronym+"] "+main.currReqs+" requests currently ("+main.openCount+" done)",
		statusText = "["+main.gameAcronym+"] "+main.currReqs+" requests currently ("+main.openCount+" done)" +
					 (hideF === false ? "<br>["+main.gameAcronym+"] "+$g("count(.//*[starts-with(@id,'stream_story_')]//a[starts-with(@id, 'item_done_')])", {node:main.stream, type:1})+" requests successful" +
					 "<br>["+main.gameAcronym+"] "+$g("count(.//*[starts-with(@id,'stream_story_')]//a[starts-with(@id, 'item_failed_')])", {node:main.stream, type:1})+" requests failed" : "") +
					 (main.paused === true ? ("<br>" + (main.pauseClick === false ? ("["+main.pauseCount+"]") : "") + "[PAUSED] Click this box to unpause") : "") +
					 (main.boxFull === true ? "<br>[STOPPED] Gift limit was hit" : "");
	switch(document.title != shortStatusText) {case true: document.title=shortStatusText; break;}
	switch($("status").innerHTML != statusText) {case true: $("status").innerHTML = statusText; break;}
	if(!main.pauseClick && main.paused && main.pauseCount>0) main.pauseCount--;
},

// display a message in the middle of the screen
message : function(t) {
if(GM_config.get("newuserhints") === false) return;
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

handleDelay : function() {
	// wait random 1-3 seconds before grabbing the next item
	main.delay = true; // set it so fvwm can't grab another yet
	window.setTimeout(function(main) { main.delay = false; }, Math.round(((Math.random() * 2) + 1) * 1000), main);
},

goGiveItemAccepted : function(w, item, key) {
	var accTime=main.getAcceptedTime(),  acc=main.getAccepted();
	item.textContent = main.accText[w] || main.acceptedText;
	item.setAttribute("id", "item_done_"+key);
	main.colorCode(item, "done");
	accTime[key] = new Date().getTime();
	main.setAcceptedTime(accTime);
	acc.push(key);
	main.setAccepted(acc);
	main.openCount++;
	main.handleDelay();
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
		sendButton = $g(".//div[@class='gift_box_holder']/div[@class='recipient']//form[starts-with(@id, 'req_form_')]//input[@name='send'] | .//form[starts-with(@id, 'req_form_')]//input[@name='send'] | .//div[@class='submitdiv']//input[@type='button' and @name='send'] | .//input[@type='button' and @name='sendit' and @value='Send']", {doc:doc, node:doc, type:9}),
		shareAnimalFeedButton = $g(".//div[@class='submitdiv']//input[@type='button' and @name='shareExtraButton']", {doc:doc, node:doc, type:9}),
		returnToFarmButton = $g(".//div[@class='submitdiv']//input[@type='submit' and @value='Return To Farm' and @class='inputsubmit']", {doc:doc, node:doc, type:9}),
		publishButton = $g(".//input[@type='button' and @name='publish' and @value='Publish']", {doc:doc, node:doc, type:9}),
		okButton = $g(".//input[@type='submit' and @value='OK' and @class='inputsubmit']", {doc:doc, node:doc, type:9}),
		throwSnowball = $g(".//input[@type='submit' and @value='Throw Snowball']", {doc:doc, node:doc, type:9}),
		text=$("app_content_"+main.gameID, doc);

	// get bare text section
	if(text) text=$g(".//div[@class='giftLimit' or @class='landingText']", {node:text,doc:doc,type:9}) || $g(".//div[@class='main_giftConfirm_cont']", {node:text,doc:doc,type:9}) || text || doc.body;
	text = $g("./h3", {node:text,doc:doc,type:9}) || text;
	try { text = text.textContent; } catch(e) {} // false "try" case, just to suppress errors

	var failedItem = main.failedItem(text) || !main.textRegex.test(text);

	if(failedItem === true) {
		item.textContent = main.failText;
		item.setAttribute("id", "item_failed_"+key);
		main.colorCode(item, "failed");
		failedTime[key] = new Date().getTime();
		main.setFailedTime(failedTime);
		failed.push(key);
		main.setFailed(failed);
		main.openCount++;
		main.remove(key);
		main.handleDelay();
		return;
	}
	
	// auto click "like" if enabled
	if(main.opts["autolike"] === true) main.like(key);

	$(key).removeEventListener("load", main.onGiveItemFrameLoad, false);
	$(key).addEventListener("load", function(e) { main.onGiveItemLoad(e,w,item); }, false);
	
	if(sendButton || shareAnimalFeedButton || returnToFarmButton || okButton || throwSnowball || publishButton) {
		try {
			main.click(sendButton);
			main.click(shareAnimalFeedButton);
			main.click(returnToFarmButton);
			main.click(okButton);
			main.click(throwSnowball);
			main.click(publishButton);
		} catch(e) {}
		var intv = window.setInterval(function(e) {
				var send = $g(".//div[@id='pop_content']//input[@type='button' and (@name='sendit' or @name='publish' or @name='error_ok')]", {doc:doc, node:doc, type:9}),
					skip = $g(".//input[@name='skip_ci_btn']", {doc:doc, node:doc, type:9});
				if(skip) { // skip button
					main.click(skip);
					window.clearInterval(intv);
				} else if($g(".//div[@id='pop_content']//h2[contains(., 'Cannot post to user')]", {type:9, node:doc, doc:doc})) {
					item.textContent = main.failText;
					item.setAttribute("id", "item_failed_"+key);
					main.colorCode(item, "failed");
					failedTime[key] = new Date().getTime();
					main.setFailedTime(failedTime);
					failed.push(key);
					main.setFailed(failed);
					main.openCount++;
					main.remove(key);
				} else if(send) { // send button, brings up the skip button
					main.click(send);
				}
		}, 500);
	} else main.onGiveItemLoad(e, w, item);
},

goAccepted : function(e, w, item, SpecificCollectible, key) {
	var accTime=main.getAcceptedTime(),  acc=main.getAccepted(), DetlColl=main.getDetlColl(), DetlCollectible = "";

	if(w.startsWith("collectible")) DetlCollectible = (SpecificCollectible != "") ? SpecificCollectible : "Got;" + w;
	item.setAttribute("id", "item_done_"+key);
	main.colorCode(item, "done");
	item.textContent = (DetlCollectible == "") ? (main.accText[w] || main.acceptedText) : (main.collstatusText[DetlCollectible.split(";")[0]] || main.collstatusText["Got"]) + (main.accText[DetlCollectible.split(";")[1]] || main.accText[w] || main.accText["GenericCollectible"]);
	main.openCount++;
	accTime[key] = new Date().getTime();
	main.setAcceptedTime(accTime);
	if(SpecificCollectible != "") {
		DetlColl[w][key] = SpecificCollectible;
		main.setDetlColl(DetlColl);
	}
	acc.push(key);
	main.setAccepted(acc);
	main.remove(key);
	main.handleDelay();
},

onYesLoad : function(e, w, item, SpecificCollectible) {
	main.goAccepted(e, w, item, SpecificCollectible, e.target.getAttribute("id"));
	main.remove(e.target.getAttribute("id"));
},

onFrameLoad : function(e) {
var doc=e.target.contentDocument, w=e.target.getAttribute("which"), key=e.target.getAttribute("id"), acc=main.getAccepted(), accTime=main.getAcceptedTime(), failed=main.getFailed(), failedTime=main.getFailedTime(), DetlColl=main.getDetlColl(), item=$g("//a[contains(@id,'"+key+"')]", {type:9}), text=$("app_content_"+main.gameID, doc);

	// get bare text section
	if(text) text=$g(".//div[@class='giftLimit' or @class='landingText']", {node:text,doc:doc,type:9}) || $g(".//div[@class='main_giftConfirm_cont']", {node:text,doc:doc,type:9}) || text || doc.body;
	text = $g(".//h3", {node:text,doc:doc,type:9}) || text;
	try { text = text.textContent; } catch(e) {} // false "try" case, just to suppress errors
	
	var full = main.boxFullRegex.test(text);

	if(!doc || !item || text.find("bits got lost on the way to your computer") || $("errorPageContainer", doc)) {
		main.dropItem(key);
		if(item) main.colorCode(item, "error");
		main.handleDelay();
		return;
	}

var loadgame = doc.URL.toLowerCase().find("index.php");

var failedItem = main.failedItem(text) || !main.textRegex.test(text),
	gotItem = main.gotItem(doc, text);

var yes = $g(".//input[@name='acceptReward' and not(contains(@value, 'Yes and')) and @type='submit']", {doc:doc, node:doc, type:9}),
	yestruffle = $g(".//input[@name='acceptReward' and @value='Yes and share Truffle back' and @type='submit']", {doc:doc, node:doc, type:9}),
	nothanks = $g(".//div[@class='submitdiv']//a[@class='skip' and contains(@href, 'skip')]", {doc:doc, node:doc, type:9}),
	no  = doc.getElementsByName("refuseReward").item(0),
	DetlCollectible = "", SpecificCollectible = "", trytoget = false;
if(gotItem==true && failedItem==false && ((yes || yestruffle || nothanks || no) || w.find("collectible"))) {
	trytoget = true;
	textL = text.toLowerCase();
    var whichCollectibleOffered = "";
	switch(w) {
	    case "collectibleberries": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichBerriesRegex); break;
	    case "collectiblecitrus": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichCitrusRegex); break;
	    case "collectiblecows": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichCowsRegex); break;
	    case "collectibleflowers": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichFlowersRegex); break;
	    case "collectiblegrains": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichGrainsRegex); break;
		case "collectiblesquash": whichCollectibleOffered = main.checkCollectible(doc, textL, main.whichSquashRegex); break;
	}
	$(key).removeEventListener("load", main.onFrameLoad, false);
	if(whichCollectibleOffered == "" || (whichCollectibleOffered != ""  && main.opts[whichCollectibleOffered]===true)) {
		if(whichCollectibleOffered != "") SpecificCollectible = "Accepted;" + whichCollectibleOffered;
		$(key).addEventListener("load", function(e) { main.onYesLoad(e, w, item, SpecificCollectible, key); }, false);
		if(yestruffle) yestruffle.click();
			else if(nothanks) e.target.src = nothanks.href;
			else if(yes) yes.click();
			else main.onYesLoad(e, w, item, SpecificCollectible, key);
	} else if(whichCollectibleOffered != "") {
		SpecificCollectible = "Refused;" + whichCollectibleOffered;
		$(key).addEventListener("load", function(e) { main.onYesLoad(e, w, item, SpecificCollectible, key); }, false);
		if(no) no.click();
			else {
				item.setAttribute("id", "item_failed_"+key);
				main.colorCode(item, "failed");
				item.textContent = main.failText;
				main.openCount++;
				failedTime[key] = new Date().getTime();
				main.setFailedTime(failedTime);
				failed.push(key);
				main.setFailed(failed);
				main.handleDelay();
			}
	}
}

// auto click "like" if enabled
if(main.opts["autolike"]===true && (loadgame===true || gotItem===true || (gotItem==false && failedItem==false))) main.like(key);

if(trytoget === false) {
//	switch(loadgame===true || gotItem===true || doc.URL.find("gifts.php?giftRecipient=")) {
	switch(loadgame===true || gotItem===true) {
		case true:
			main.goAccepted(e, w, item, SpecificCollectible, key);
			main.colorCode(item, "done");
			break;
		case false:
			item.setAttribute("id", "item_failed_"+key);
			main.colorCode(item, "failed");
			item.textContent = main.failText;
			main.openCount++;
			failedTime[key] = new Date().getTime();
			main.setFailedTime(failedTime);
			failed.push(key);
			main.setFailed(failed);
			main.handleDelay();
			break;
	}
}

// remove the iframe
switch(loadgame===true || failedItem===true || (failedItem===false && gotItem===false && loadgame===false)) {
	case true: main.remove(key); break;
}

if(full === true) {
	// auto-pause when signal received of a limit hit
	main.boxFull =  true;
	main.pauseClick = true;
	main.paused = true;
	$("status").style.backgroundColor = "#FF6F6F";
	$g("//div[@id='silent_req_holder']/iframe", {del:true});
	
	// refresh after 20-30 minutes to check again
	window.setTimeout(function() { main.refresh(true); }, (1200000 + ((Math.random() * 10) * 1000)));
}
},

// load an item url
open : function(url, key, w) {
	if(main.delay === true || (main.paused===true && !main.itemAllowed(w)) || main.currReqs >= main.opts["maxrequests"]) return;
	var item = $g(".//a[starts-with(@id, 'item_') and contains(@id,'"+key+"')]", {type:9, node:main.stream});
	item.setAttribute("id", "item_processing_"+key); // set id for post link
	main.colorCode(item, "processing"); // change post color to yellow
	$("status").style.background = "#FFFFAA"; // change status bar color to yellow
	if(",giveitemto,sendabushel,sendfeed,sendbabybottles,sendaturkey,sendluck,sendcraftingmaterials".find(","+w)) $("silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, id:key, style:"height:100%; width:100%; z-index:9995; border:0;", onload:main.onGiveItemFrameLoad}));
		else $("silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, id:key, style:"height:100%; width:100%; z-index:9995; border:0;", onload:main.onFrameLoad}));
	
	// update debug frame status which text
	$("debugwhichtype").innerHTML = "Type: " + w + "\n<br>\nKey: "+key;

	window.setTimeout(main.dropItem, main.reqTO, key);
},

// core function. this loops through posts and loads them
run : function() {
if(main.delay === true || $("GM_config") || (main.opts["removedone"] === false && main.currReqs >= main.opts["maxrequests"])) return;
		var wallposts=$g(".//span[starts-with(@class,'UIActionLinks')]/a[contains(@href,'"+main.gameURLpart+"') and not(starts-with(@id,'item_done_')) and not(starts-with(@id,'item_failed_')) and not(starts-with(@id,'item_processing_')) and not(starts-with(@id,'item_skip_')) and not(contains(.,'"+main.xpQueryTextExcludes.join("')) and not(contains(.,'")+"'))]", {type:7, node:main.stream});
		var opts=main.opts, open=main.open, accText=main.accText, getKey=main.getKey,
			which=main.which, whichAnimal=main.whichAnimal, whichEgg=main.whichEgg, whichTree=main.whichTree, whichMaterial=main.whichMaterial, whichTeam=main.whichTeam,
			DetlColl=main.getDetlColl(), collstatusText=main.collstatusText,
			acc=main.getAccepted(), accTime=main.getAcceptedTime(),
			failed=main.getFailed(), failedTime=main.getFailedTime();

// loop through and grab stuff
var ssi=wallposts.snapshotItem, i=0, len=wallposts.snapshotLength;
if(len > 0) {
do {
	var item=wallposts.snapshotItem(i), key = getKey(item.href) || "", w = which(item), wA = (w == "adopt" ? whichAnimal(item) : ""), coll=w.startsWith("collectible"), text = $g(".//ancestor::*[contains(@id, 'stream_story_') or contains(@id, 'div_story_')]", {node:item, type:9}).textContent.replace(main.nRegex, "").replace(main.threeDotRegex, "");
	
	// Special handling for non "key=" posts
	switch(item.href.find("key=") === false && item.href.find("frHost") === true) {
		case true: key = item.href.match(main.frHostRegex)[1]; break;
	}
	
switch(w) {
	case "play": if(text.find("Bull")) w="adopt"; wA="bull"; break;
	case "horse": w="adopt"; wA="horsegray"; break;
	case "babyanimal": w="adopt"; wA="foalgrey"; break;
//	case "cow": w="adopt"; wA="cowfan"; break;
}

// Error catching method for option saving
try {
	if(!accTime[w]) {
		accTime[w] = {};
		main.setAcceptedTime(accTime);
	}
	if(!failedTime[w]) {
		failedTime[w] = {};
		main.setFailedTime(failedTime);
	}
	if(!DetlColl[w]) {
		DetlColl[w] = {};
		main.setDetlColl(DetlColl);
	}
} catch(e) {
	if(accTime[w] == "undefined") {
		accTime[w] = {};
		main.setAcceptedTime(accTime);
	}
	if(failedTime[w] == "undefined") {
		failedTime[w] = {};
		main.setFailedTime(failedTime);
	}
	if(DetlColl[w] == "undefined") {
		DetlColl[w] = {};
		main.setDetlColl(DetlColl);
	}
}

// Give acceptance link an ID
item.setAttribute("id", "item_"+key);

// Make the title of the link the original text
item.setAttribute("title", item.textContent);

// Find your own name on the post
var own = $g(".//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]//a[@class='actorName' and @href] | .//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]//*[contains(@class, 'actorName')]//a[@href]", {type:9, node:item});
if(own != null ? ((own.href.find("id=") ? own.href.split("id=")[1].split("&")[0] : unescape(own.href).match(main.profileRegex)[1]) != main.profile) : null) {
switch(acc.inArray(key)) {
case false: if(failed.inArray(key)) {
	item.setAttribute("id", "item_failed_"+key);
	main.colorCode(item, "failed");
	item.textContent = main.failText;
} else if($(key) == null) {
	switch(w) {
	case "jointeam": if(opts["jointeam"] === true && opts[whichTeam(text)] === true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "getmaterials": if(opts[whichMaterial(text)] == true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "tree": if(opts["tree"] === true && opts[whichTree(text)] === true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "adopt": if(opts["adopt"] === true && (opts[wA] === true || (opts["unknown"] === true && typeof opts[wA]!="boolean"))) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "hatch": if(opts[whichEgg(text)] === true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "seed": if(opts["seedmain"] === true && opts[w + (text.match(main.seedRegex) || ["",""])[1].toLowerCase().replace(main.spaceRegex,"")] === true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "purpletomato": case "straspberry": case "longonion": case "redspinach": case "sunpoppy": case "doublegrain": case "whiskypeat": case "firepepper": case "squmpkin": case "lilacdaffy": if(opts["seedmain"] === true && opts[w] === true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "bushel": if(opts["bushelmain"] === true && opts[w + (text.match(main.bushelRegex) || ["",""])[1].toLowerCase().replace(main.spaceRegex,"")] === true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	default: switch(opts[w] === true) {
		case true: if(coll===false || (coll===true && opts["collectible"] === true)) open(item.href, key, w);
						else item.setAttribute("id", "item_skip_"+key); break;
		case false: item.setAttribute("id", "item_skip_"+key); break;
	}
	}
}
break;
case true: main.colorCode(item, "done");
		   var DetlCollectible = (coll==true) ? (DetlColl[w][key] || "Got;" + w) : "";
			item.textContent = (DetlCollectible == "") ? (accText[w] || main.acceptedText) : ((collstatusText[DetlCollectible.split(";")[0]] || collstatusText["Got"]) + (accText[DetlCollectible.split(";")[1]] || accText[w] || accText["GenericCollectible"])); // change text
		   item.setAttribute("id", "item_done_"+key); // add id so it can be styled if wanted
		   break;
} // switch(acc.inArray)
} else item.setAttribute("id", "item_skip_"+key); // own profile
} while (++i < len);
} // if(len > 0)

switch(main.opts["removedone"] === true) {case true: main.removeDone(); break;}

// change color of status bar if all requests on page are finished
if(main.currReqs == 0) window.setTimeout(function(main) {
	if(main.currReqs == 0 && main.pendingRefresh === false && main.boxFull === false) $("status").style.background = "#A6EEA2";
}, 1000, main);
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
		label : "Bonuses (Coins)",
		type : "checkbox",
		"default" : true,
		kids : {
			bouquet : {
				label : "Bouquets",
				type : "checkbox",
				"default" : false
			},
			perfectbunch : {
				label : "Perfect Bunches",
				type : "checkbox",
				"default" : false
			},
			mysterygift : {
				label : "Mystery Gifts",
				type: "checkbox",
				"default" : false
			},
			specialdelivery : {
				label : "Special Delivery",
				type : "checkbox",
				"default" : false
			}
		}
	},
	none : {
		label : "Get NEW or Unrecognized Items",
		type : "checkbox",
		title : "Use this feature to grab newly added items that aren't in the script yet.",
		"default" : false
	},
	animalfeedseparator : {
		label : "Animal Feed",
		type : "separator"
	},
	animalfeed :  {
		label : "Animal Feed",
		type : "checkbox",
		"default" : false,
		kids : {
			truffle : {
				label : "Truffles",
				type : "checkbox",
				"default" : false
			},
			kibble : {
				label : "Puppy Kibble",
				type : "checkbox",
				"default" : false
			},
			dogtreat : {
				label : "Dog Treat",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			arborists :  {
				label : "Arborists",
				type : "checkbox",
				"default" : false
			},
			xp : {
				label : "XP",
				type : "checkbox",
				"default" : false
			},
			fuel : {
				label : "Fuel",
				type: "checkbox",
				"default" : false
			},
			fertilizeall : {
				label : "Fertilize All",
				type : "checkbox",
				"default" : false
			},
			instagrow : {
				label : "Instagrow",
				type : "checkbox",
				"default" : false,
			},
			lovepotion : {
				label : "Love Potion",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			good : {
				label : "Goods",
				type : "checkbox",
				"default" : false
			}
		}
	},
	hatchseparator : {
		label : "Mystery Eggs",
		type : "separator"
	},
	hatchwhite : {
		label : "White",
		type : "checkbox",
		"default" : false,
		kids : {
			hatchbrown : {
				label : "Brown",
				type : "checkbox",
				"default" : false
			},
			hatchblack : {
				label : "Black",
				type : "checkbox",
				"default" : false
			},
			hatchgold : {
				label : "Gold",
				type : "checkbox",
				"default" : false
			},
			hatchcornish : {
				label : "Cornish",
				type : "checkbox",
				"default" : false
			},
			hatchscotsgrey : {
				label : "Scots Grey",
				type : "checkbox",
				"default" : false
			},
			hatchrhodeislandred : {
				label : "Rhode Island Red",
				type : "checkbox",
				"default" : false
			},
			hatchrainbow : {
				label : "Rainbow",
				type : "checkbox",
				"default" : false
			},
			hatchcandycane : {
				label : "Candy Cane",
				type : "checkbox",
				"default" : false
			},
			hatchenglish : {
				label : "English",
				type : "checkbox",
				"default" : false
			},
			hatchparty : {
				label : "Party",
				type : "checkbox",
				"default" : false
			},
			hatchfaverolles : {
				label : "Faverolles",
				type : "checkbox",
				"default" : false
			},
			hatchmarans : {
				label : "Marans",
				type : "checkbox",
				"default" : false
			},
			hatcharaucana : {
				label : "Araucana",
				type : "checkbox",
				"default" : false
			},
			hatchbuttercup : {
				label : "Buttercup",
				type : "checkbox",
				"default" : false
			},
			hatchcandycorn : {
				label : "Candycorn",
				type : "checkbox",
				"default" : false
			},
			hatchapple : {
				label : "Apple",
				type : "checkbox",
				"default" : false
			},
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
				"default" : false
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
			sendcraftingmaterials : {
				label : "Send Crafting Baskets",
				type : "checkbox",
				"default" : false
			},
			sendfeed : {
				label : "Send Feed",
				type : "checkbox",
				"default" : true
			},
			sendbabybottles : {
				label : "Send Baby Bottles",
				type : "checkbox",
				"default" : false
			},
			sendaturkey : {
				label : "Send Turkeys",
				type : "checkbox",
				"default" : true
			},
			sendluck : {
				label : "Send Lucky Penny & Share",
				type : "checkbox",
				"default" : false
			},
			placeorder : {
				label : "Place Orders at Trading Post",
				type : "checkbox",
				"default" : false
			}
		}
	},
	assortedquestsseparator : {
		label : "Send Help (Send One, Get One)",
		type : "separator"
	},
	airshippatch : {
		label : "Airship Patch",
		type : "checkbox",
		"default" : false,
		kids : {
			applebasket : {
				label : "Apple Basket",
				type : "checkbox",
				"default" : false
			},
			babybonnets : {
				label : "Baby Bonnets",
				type : "checkbox",
				"default" : false
			},
			banquetinvitation : {
				label : "Banquet Invitation",
				type : "checkbox",
				"default" : false
			},
			birdnest : {
				label : "Bird Nest",
				type : "checkbox",
				"default" : false
			},
			birdseedbunch : {
				label : "Bird Seed Bunch",
				type : "checkbox",
				"default" : false
			},
			birdwhistle : {
				label : "Bird Whistle",
				type : "checkbox",
				"default" : false
			},
			blindfold : {
				label : "Blindfold",
				type : "checkbox",
				"default" : false
			},
			blueribbon : {
				label : "Blue Ribbon",
				type : "checkbox",
				"default" : false
			},
			givebouquet : {
				label : "Bouquet",
				type : "checkbox",
				"default" : false
			},
			brasscowbell : {
				label : "Brass Cow Bell",
				type : "checkbox",
				"default" : false
			},
			sendbucket : {
				label : "Bucket",
				type : "checkbox",
				"default" : false
			},
			burlapsack : {
				label : "Burlap Sack",
				type : "checkbox",
				"default" : false
			},
			candycorn : {
				label : "Candy Corn",
				type : "checkbox",
				"default" : false
			},
			candymap : {
				label : "Candy Map",
				type : "checkbox",
				"default" : false
			},
			carrotonastick : {
				label : "Carrot On A Stick",
				type : "checkbox",
				"default" : false
			},
			catnip : {
				label : "Catnip",
				type : "checkbox",
				"default" : false
			},
			cheeseculture : {
				label : "Cheese Culture",
				type : "checkbox",
				"default" : false
			},
			chewtoy : {
				label : "Chew Toy",
				type : "checkbox",
				"default" : false
			},
			chocolate : {
				label : "Chocolate",
				type : "checkbox",
				"default" : false
			},
			confettibomb : {
				label : "Confetti Bomb",
				type : "checkbox",
				"default" : false
			},
			cottoncandy : {
				label : "Cotton Candy",
				type : "checkbox",
				"default" : false
			},
			cowcollar : {
				label : "Cow Collar",
				type : "checkbox",
				"default" : false
			},
			cowtether : {
				label : "Cow Tether",
				type : "checkbox",
				"default" : false
			},
			cowtreat : {
				label : "Cow Treat",
				type : "checkbox",
				"default" : false
			},
			eauduskunk : {
				label : "Eau Du Skunk",
				type : "checkbox",
				"default" : false
			},
			elbowgrease : {
				label : "Elbow Grease",
				type : "checkbox",
				"default" : false
			},
			electrictorch : {
				label : "Electric Torch",
				type : "checkbox",
				"default" : false
			},
			fairywand : {
				label : "Fairy Wand",
				type : "checkbox",
				"default" : false
			},
			boots : {
				label : "Farmer's Boots",
				type : "checkbox",
				"default" : false
			},
			overalls : {
				label : "Farmer's Overalls",
				type : "checkbox",
				"default" : false
			},
			fuzzydice : {
				label : "Fuzzy Dice",
				type : "checkbox",
				"default" : false
			},
			grapejuice : {
				label : "Grape Juice",
				type : "checkbox",
				"default" : false
			},
			sendgrowlight : {
				label : "Grow Light",
				type : "checkbox",
				"default" : false
			},
			halloweenmask : {
				label : "Halloween Mask",
				type : "checkbox",
				"default" : false
			},
			hay : {
				label : "Hay",
				type : "checkbox",
				"default" : false
			},
			horseheadrake : {
				label : "Horsehead Rake",
				type : "checkbox",
				"default" : false
			},
			hobbyhorserake : {
				label : "Hobby Horse Rake",
				type : "checkbox",
				"default" : false
			},
			sendhorsecomb : {
				label : "Horse Comb",
				type : "checkbox",
				"default" : false
			},
			sendhorsesaddle : {
				label : "Horse Saddle",
				type : "checkbox",
				"default" : false
			},
			sendhorseshoe : {
				label : "Horse Shoe",
				type : "checkbox",
				"default" : false
			},
			sendhorsetiara : {
				label : "Horse Tiara",
				type : "checkbox",
				"default" : false
			},
			jackolantern : {
				label : "Jack O-Lantern",
				type : "checkbox",
				"default" : false
			},
			flashlight : {
				label : "Jack O-Lantern Flashlight",
				type : "checkbox",
				"default" : false
			},
			lemon : {
				label : "Lemon",
				type : "checkbox",
				"default" : false
			},
			lightstick : {
				label : "Light Stick",
				type : "checkbox",
				"default" : false
			},
			livestocktags : {
				label : "Livestock Tags",
				type : "checkbox",
				"default" : false
			},
			lollipop : {
				label : "Lollipop",
				type : "checkbox",
				"default" : false
			},
			loveballoon : {
				label : "Love Balloon",
				type : "checkbox",
				"default" : false
			},
			magnet : {
				label : "Magnet",
				type : "checkbox",
				"default" : false
			},
			mappieces : {
				label : "Map Pieces",
				type : "checkbox",
				"default" : false
			},
			mermaidtale : {
				label : "Mermaid Tale",
				type : "checkbox",
				"default" : false
			},
			milkbucket : {
				label : "Milk Bucket",
				type : "checkbox",
				"default" : false
			},
			monkeymask : {
				label : "Monkey Mask",
				type : "checkbox",
				"default" : false
			},
			mousetrap : {
				label : "Mouse Trap",
				type : "checkbox",
				"default" : false
			},
			oatsack : {
				label : "Oat Sack",
				type : "checkbox",
				"default" : false
			},
			oldbooks : {
				label : "Old Books",
				type : "checkbox",
				"default" : false
			},
			pacifier : {
				label : "Pacifier",
				type : "checkbox",
				"default" : false
			},
			favors : {
				label : "Party Favors",
				type : "checkbox",
				"default" : false
			},
			petbed : {
				label : "Pet Bed",
				type : "checkbox",
				"default" : false
			},
			picnicblanket : {
				label : "Picnic Blanket",
				type : "checkbox",
				"default" : false
			},
			piggytoy : {
				label : "Piggy Toy",
				type : "checkbox",
				"default" : false
			},
			pintglass : {
				label : "Pint Glass",
				type : "checkbox",
				"default" : false
			},
			popcornmachine : {
				label : "Popcorn Machine",
				type : "checkbox",
				"default" : false
			},
			postcard : {
				label : "Postcard",
				type : "checkbox",
				"default" : false
			},
			praise : {
				label : "Praise",
				type : "checkbox",
				"default" : false
			},
			racingstripe : {
				label : "Racing Stripe",
				type : "checkbox",
				"default" : false
			},
			raffledrum : {
				label : "Raffle Drum",
				type : "checkbox",
				"default" : false
			},
			raffleposter : {
				label : "Raffle Poster",
				type : "checkbox",
				"default" : false
			},
			romanticcenterpiece : {
				label : "Romantic Centerpiece",
				type : "checkbox",
				"default" : false
			},
			sendrope : {
				label : "Rope",
				type : "checkbox",
				"default" : false
			},
			rosebouquet : {
				label : "Rose Bouquet",
				type : "checkbox",
				"default" : false
			},
			rsvp : {
				label : "RSVP",
				type : "checkbox",
				"default" : false
			},
			saltlick : {
				label : "Salt Lick",
				type : "checkbox",
				"default" : false
			},
			sawhorse : {
				label : "Sawhorse",
				type : "checkbox",
				"default" : false
			},
			scarydecoration : {
				label : "Scary Decoration",
				type : "checkbox",
				"default" : false
			},
			scratchpost : {
				label : "Scratch Post",
				type : "checkbox",
				"default" : false
			},
			scritchybrush : {
				label : "Scritchy Brush",
				type : "checkbox",
				"default" : false
			},
			sheepshampoo : {
				label : "Sheep Shampoo",
				type : "checkbox",
				"default" : false
			},
			shell : {
				label : "Shell",
				type : "checkbox",
				"default" : false
			},
			sendsprinkler : {
				label : "Sprinkler",
				type : "checkbox",
				"default" : false
			},
			spyglass : {
				label : "Spyglass",
				type : "checkbox",
				"default" : false
			},
			squirrelfeeder : {
				label : "Squirrel Feeder",
				type : "checkbox",
				"default" : false
			},
			storybook : {
				label : "Storybook",
				type : "checkbox",
				"default" : false
			},
			sugarcube : {
				label : "Sugar Cube",
				type : "checkbox",
				"default" : false
			},
			tastyfish : {
				label : "Tasty Fish",
				type : "checkbox",
				"default" : false
			},
			toadstool : {
				label : "Toadstool",
				type : "checkbox",
				"default" : false
			},
			treefertilizer : {
				label : "Tree Fertilizer",
				type : "checkbox",
				"default" : false
			},
			vipticket : {
				label : "VIP Ticket",
				type : "checkbox",
				"default" : false
			},
			woolblanket : {
				label : "Wool Blanket",
				type : "checkbox",
				"default" : false
			},
			order : {
				label : "Work Order",
				type : "checkbox",
				"default" : false
			},
			wrappedcandy : {
				label : "Wrapped Candy",
				type : "checkbox",
				"default" : false
			},
			zookeeperhat : {
				label : "Zookeeper Hat",
				type : "checkbox",
				"default" : false
			},
			zootickets : {
				label : "Zoo Tickets",
				type : "checkbox",
				"default" : false
			},
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
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
				}
			}
		}
	},
	dynamicgrabbing : {
		section : [ "Dynamic Grabbing" ],
		label : "Enable dynamic grabbing of items?",
		type : "checkbox",
		"default" : false
	},
	dynamicgrabbinginfo : {
		label : "You may type in the link or post text (separated by lines) of the item you desire.",
		type : "separator"
	},
	dynamicgrabbinglist : {
		label : "Dynamic Grabbing List, Separate By Lines",
		type : "textarea",
		cols : 50,
		rows : 10,
		"default" : "item 1\nitem 2\nitem 3\netc..."
	},
	singlematerialsseparator : {
		section : [ "Materials" ],
		label : "Single Materials",
		type : "separator"
	},
	brick : {
		label : "Bricks",
		type : "checkbox",
		"default" : false,
		kids : {
			nail : {
				label : "Nails",
				type : "checkbox",
				"default" : false
			},
			woodenboard : {
				label : "Wooden Boards",
				type : "checkbox",
				"default" : false
			},
			horseshoe : {
				label : "Horseshoes",
				type : "checkbox",
				"default" : false
			},
			harness : {
				label : "Harnesses",
				type : "checkbox",
				"default" : false
			},
			bottle : {
				label : "Bottles",
				type : "checkbox",
				"default" : false
			},
			blanket : {
				label : "Blankets",
				type : "checkbox",
				"default" : false
			},
			glasssheet : {
				label : "Glass Sheets",
				type: "checkbox",
				"default" : false
			},
			greenbeam : {
				label : "Green Beams",
				type : "checkbox",
				"default" : false
			},
			floralbracket : {
				label : "Floral Brackets",
				type : "checkbox",
				"default" : false
			},
			whitetrellis : {
				label : "White Trellises",
				type : "checkbox",
				"default" : false
			},
			irrigationpipe : {
				label : "Irrigation Pipes",
				type : "checkbox",
				"default" : false
			},
			smoker : {
				label : "Smokers",
				type : "checkbox",
				"default" : false
			},
			beeswax : {
				label : "Beeswax",
				type : "checkbox",
				"default" : false
			},
			bamboo : {
				label : "Bamboo",
				type : "checkbox",
				"default" : false
			},
			reedthatch : {
				label : "Reed Thatch",
				type : "checkbox",
				"default" : false
			},
			hammer : {
				label : "Hammers",
				type : "checkbox",
				"default" : false
			},
			twine : {
				label : "Twine",
				type : "checkbox",
				"default" : false
			},
			concrete : {
				label : "Concrete",
				type : "checkbox",
				"default" : false
			},
			rope : {
				label : "Ropes",
				type : "checkbox",
				"default" : false
			},
			axle : {
				label : "Axles",
				type : "checkbox",
				"default" : false
			},
			gear : {
				label : "Gears",
				type : "checkbox",
				"default" : false
			},
			tinsheet : {
				label : "Tin Sheets",
				type : "checkbox",
				"default" : false
			},
			hinge : {
				label : "Hinges",
				type : "checkbox",
				"default" : false
			},
			screwdriver : {
				label : "Screwdrivers",
				type : "checkbox",
				"default" : false
			},
			wrench : {
				label : "Wrenches",
				type : "checkbox",
				"default" : false
			},
			pipe : {
				label : "Pipes",
				type : "checkbox",
				"default" : false
			},
			clamp : {
				label : "Clamps",
				type : "checkbox",
				"default" : false
			},
			fencepost : {
				label : "Fence Posts",
				type : "checkbox",
				"default" : false
			},
			shrub : {
				label : "Shrubs",
				type : "checkbox",
				"default" : false
			},
			grazinggrass : {
				label : "Grazing Grass",
				type : "checkbox",
				"default" : false
			},
			paintedwood : {
				label : "Painted Wood",
				type : "checkbox",
				"default" : false
			},
			waterpump : {
				label : "Water Pump",
				type : "checkbox",
				"default" : false
			},
			log : {
				label : "Log",
				type : "checkbox",
				"default" : false
			},
			stone : {
				label : "Stone",
				type : "checkbox",
				"default" : false
			},
			steelbeam : {
				label : "Steel Beam",
				type : "checkbox",
				"default" : false
			},
			wire : {
				label : "Wire",
				type : "checkbox",
				"default" : false
			},
			haybundle : {
				label : "Hay Bundle",
				type : "checkbox",
				"default" : false
			},
			saddle : {
				label : "Saddle",
				type : "checkbox",
				"default" : false
			},
			bridle : {
				label : "Bridle",
				type : "checkbox",
				"default" : false
			},
			hauntedbrick : {
				label : "Haunted Brick",
				type : "checkbox",
				"default" : false
			},
			goo : {
				label : "Goo",
				type : "checkbox",
				"default" : false
			},
			knockers : {
				label : "Knockers",
				type : "checkbox",
				"default" : false
			},
			creepycandle : {
				label : "Creepy Candle",
				type : "checkbox",
				"default" : false
			},
			
		}
	},
	eventmaterialsseparator : {
		label : "Event Materials",
		type : "separator"
	},
	materialsstable : {
		label : "Stable",
		type : "checkbox",
		"default" : false,
		kids : {
			materialsmaison : {
				label : "La Maison",
				type : "checkbox",
				"default" : false
			},
			materialsnursery : {
				label : "Nursery",
				type : "checkbox",
				"default" : false
			},
			materialsbotanicalgarden : {
				label : "Botanical Garden",
				type : "checkbox",
				"default" : false
			},
			materialsjapanesebarn : {
				label : "Japanese Barn",
				type : "checkbox",
				"default" : false
			},
			materialsbeehive : {
				label : "Beehive",
				type : "checkbox",
				"default" : false
			},
			materialsgarage : {
				label : "Garage",
				type : "checkbox",
				"default" : false
			},
			materialspigpen : {
				label : "Pig Pen",
				type : "checkbox",
				"default" : false
			},
			materialshauntedhouse : {
				label : "Haunted House",
				type : "checkbox",
				"default" : false
			},
			materialsorchard : {
				label : "Orchard",
				type : "checkbox",
				"default" : false
			},
			materialsturkeyroost : {
				label : "Turkey Roost",
				type : "checkbox",
				"default" : false
			},
			materialsfunhouse : {
				label : "Fun House",
				type : "checkbox",
				"default" : false
			},
			materialsgingerbreadhouse : {
				label : "Gingerbread House",
				type : "checkbox",
				"default" : false
			},
			materialswinterworkshop : {
				label : "Winter Workshop",
				type : "checkbox",
				"default" : false
			},
			materialssnowman : {
				label : "Snowman",
				type : "checkbox",
				"default" : false
			},
			materialspartybarn : {
				label : "Party Barn",
				type : "checkbox",
				"default" : false
			},
			materialsduckpond : {
				label : "Duck Pond",
				type : "checkbox",
				"default" : false
			},
			materialscupidscastle : {
				label : "Cupid's Castle",
				type : "checkbox",
				"default" : false
			},
			materialsgreenhouse : {
				label : "Greenhouse",
				type : "checkbox",
				"default" : false
			},
			materialsleprechauncottage : {
				label : "Leprechaun's Cottage",
				type : "checkbox",
				"default" : false
			},
			materialssheeppen : {
				label : "Sheep Pen",
				type : "checkbox",
				"default" : false
			},
			materialsspringgarden : {
				label : "Spring Garden",
				type : "checkbox",
				"default" : false
			},
			materialscraftshop : {
				label : "Craftshop",
				type : "checkbox",
				"default" : false
			},
			materialsbedazzledcottage : {
				label : "Bedazzled Cottage",
				type : "checkbox",
				"default" : false
			},
			materialswaterwheel : {
				label : "Water Wheel",
				type : "checkbox",
				"default" : false
			},
			materialscraftingsilo : {
				label : "Crafting Silo",
				type : "checkbox",
				"default" : false
			},
			materialswildlifehabitat : {
				label : "Wildlife Habitat",
				type : "checkbox",
				"default" : false,
				title : "randomly collect fence posts, shrubs, and grazing grass."
			},
			materialspetrun : {
				label : "Pet Run",
				type : "checkbox",
				"default" : false,
				title : "randomly collect painted wood, water pumps, and fence posts."
			},
			materialszoo : {
				label : "Zoo",
				type : "checkbox",
				"default" : false,
				title : "randomly collect wrenches, shrubs, and pipes."
			},
			materialsaviary : {
				label : "Aviary",
				type : "checkbox",
				"default" : false,
				title : "randomly collect clamps, hingles, and screwdrivers."
			},
			materialscove : {
				label : "Cove",
				type : "checkbox",
				"default" : false
			},
			materialslivestockpen : {
				label : "Livestock Pen",
				type : "checkbox",
				"default" : false,
				title : "randomly collect water pumps, wire, and steel beams."
			},
			materialscowpasture : {
				label : "Cow Pasture",
				type : "checkbox",
				"default" : false,
				title : "randomly collect hay bundles, stones, and tin sheets."
			},
			materialshorsepaddock : {
				label : "Horse Paddock",
				type : "checkbox",
				"default" : false,
				title : "randomly collect logs, saddles, and bridles."
			},
			materialscastleduckula : {
				label : "Castle Duckula",
				type : "checkbox",
				"default" : false
			},
		}
	},
	snowmanmaterialsseparator : {
		label : "Snowman",
		type : "separator"
	},
	pileofsnow : {
		label : "Pile of Snow",
		type : "checkbox",
		"default" : false,
		kids : {
			snowmanscarf : {
				label : "Snowman Scarf",
				type : "checkbox",
				"default" : false
			},
			snowmanbutton : {
				label : "Snowman Button",
				type : "checkbox",
				"default" : false
			},
			magichat : {
				label : "Magic Hat",
				type : "checkbox",
				"default" : false
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
		"default" : false
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
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
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
		type : "checkbox",
		"default" : false,
		kids : {
			mysteryseedling :  {
				label : "Mystery Seedlings",
				type : "checkbox",
				"default" : false
			}
		}
	},
	treesseparator : {
		label : "Trees",
		type : "separator"
	},
	africantulip : {
		label : "African Tulip",
		type : "checkbox",
		"default" : false,
		kids : {
			almafig : {
				label : "Alma Fig",
				type : "checkbox",
				"default" : false
			},
			amherstia : {
				label : "Amherstia",
				type : "checkbox",
				"default" : false
			},
			angelredpomegranate : {
				label : "Angel Red Pomegranate",
				type : "checkbox",
				"default" : false
			},
			appletree : {
				label : "Apple",
				type : "checkbox",
				"default" : false
			},
			ash : {
				label : "Ash",
				type : "checkbox",
				"default" : false
			},
			autumnginkgo : {
				label : "Autumn Ginkgo",
				type : "checkbox",
				"default" : false
			},
			bahridate : {
				label : "Bahri Date",
				type : "checkbox",
				"default" : false
			},
			banana : {
				label : "Banana",
				type : "checkbox",
				"default" : false
			},
			baylaurel : {
				label : "Bay Laurel",
				type : "checkbox",
				"default" : false
			},
			birdcherry : {
				label : "Bird Cherry",
				type : "checkbox",
				"default" : false
			},
			blacklocust : {
				label : "Black Locust",
				type : "checkbox",
				"default" : false
			},
			bloodorange : {
				label : "Blood Orange",
				type : "checkbox",
				"default" : false
			},
			boom : {
				label : "Boom",
				type : "checkbox",
				"default" : false
			},
			bradfordpear : {
				label : "Bradford Pear",
				type : "checkbox",
				"default" : false
			},
			breadnut : {
				label : "Breadnut",
				type : "checkbox",
				"default" : false
			},
			bubblegum : {
				label : "Bubble Gum",
				type : "checkbox",
				"default" : false
			},
			candelabra : {
				label : "Candelabra",
				type : "checkbox",
				"default" : false
			},
			cashew : {
				label : "Cashew",
				type : "checkbox",
				"default" : false
			},
			chaneedurian : {
				label : "Chanee Durian",
				type : "checkbox",
				"default" : false
			},
			chicle : {
				label : "Chicle",
				type : "checkbox",
				"default" : false
			},
			chineselantern : {
				label : "Chinese Lantern",
				type : "checkbox",
				"default" : false
			},
			chinesestrawberry : {
				label : "Chinese Strawberry",
				type : "checkbox",
				"default" : false
			},
			chinesetamarisk : {
				label : "Chinese Tamarisk",
				type : "checkbox",
				"default" : false
			},
			chromecherry : {
				label : "Chrome Cherry",
				type : "checkbox",
				"default" : false
			},
			corkoak : {
				label : "Cork Oak",
				type : "checkbox",
				"default" : false
			},
			crabapple : {
				label : "Crab Apple",
				type : "checkbox",
				"default" : false
			},
			crackwillow : {
				label : "Crack Willow",
				type : "checkbox",
				"default" : false
			},
			cubanbanana : {
				label : "Cuban Banana",
				type : "checkbox",
				"default" : false
			},
			date : {
				label : "Date",
				type : "checkbox",
				"default" : false
			},
			discoball : {
				label : "Disco Ball",
				type : "checkbox",
				"default" : false
			},
			downybirch : {
				label : "Downy Birch",
				type : "checkbox",
				"default" : false
			},
			dwarfalmond : {
				label : "Dwarf Almond",
				type : "checkbox",
				"default" : false
			},
			elbertapeach : {
				label : "Elberta Peach",
				type : "checkbox",
				"default" : false
			},
			europeanaspen : {
				label : "European Aspen",
				type : "checkbox",
				"default" : false
			},
			europeanbeech : {
				label : "European Beech",
				type : "checkbox",
				"default" : false
			},
			europeanpear : {
				label : "European Pear",
				type : "checkbox",
				"default" : false
			},
			gem : {
				label : "Gem",
				type : "checkbox",
				"default" : false
			},
			ginkgotree : {
				label : "Ginkgo",
				type : "checkbox",
				"default" : false
			},
			goldenapple : {
				label : "Golden Apple",
				type : "checkbox",
				"default" : false
			},
			goldenapricot : {
				label : "Golden Apricot",
				type : "checkbox",
				"default" : false
			},
			goldenmalayancoconut : {
				label : "Golden Malayan Coconut",
				type : "checkbox",
				"default" : false
			},
			goldenplum : {
				label : "Golden Plum",
				type : "checkbox",
				"default" : false
			},
			goldenstarfruit : {
				label : "Golden Starfruit",
				type : "checkbox",
				"default" : false
			},
			grannysmithapple : {
				label : "Granny Smith Apple",
				type : "checkbox",
				"default" : false
			},
			gulmohar : {
				label : "Gulmohar",
				type : "checkbox",
				"default" : false
			},
			halloween : {
				label : "Halloween",
				type : "checkbox",
				"default" : false
			},			
			hassavocado : {
				label : "Hass Avocado",
				type : "checkbox",
				"default" : false
			},
			hazelnut : {
				label : "Hazelnut",
				type : "checkbox",
				"default" : false
			},
			heartcandy : {
				label : "Heart Candy",
				type : "checkbox",
				"default" : false
			},
			holiday : {
				label : "Holiday",
				type : "checkbox",
				"default" : false
			},
			indianlaurel : {
				label : "Indian Laurel",
				type : "checkbox",
				"default" : false
			},
			jackfruit : {
				label : "Jackfruit",
				type : "checkbox",
				"default" : false
			},
			japanesemaple : {
				label : "Japanese Maple",
				type : "checkbox",
				"default" : false
			},
			keylime : {
				label : "Key Lime",
				type : "checkbox",
				"default" : false
			},
			lemontree : {
				label : "Lemon",
				type : "checkbox",
				"default" : false
			},
			lombardypoplar : {
				label : "Lombary Poplar",
				type : "checkbox",
				"default" : false
			},
			longan : {
				label : "Longan",
				type : "checkbox",
				"default" : false
			},
			mango : {
				label : "Mango",
				type : "checkbox",
				"default" : false
			},
			manilamango : {
				label : "Manila Mango",
				type : "checkbox",
				"default" : false
			},
			melaleuca : {
				label : "Melaleuca",
				type : "checkbox",
				"default" : false
			},
			midlandhawthorn : {
				label : "Midland Hawthorn",
				type : "checkbox",
				"default" : false
			},
			mimosasilk : {
				label : "Mimosa Silk",
				type : "checkbox",
				"default" : false
			},
			mintcandy : {
				label : "Mint Candy",
				type : "checkbox",
				"default" : false
			},
			missionolive : {
				label : "Mission Olive",
				type : "checkbox",
				"default" : false
			},
			montereycypress : {
				label : "Monterey Cypress",
				type : "checkbox",
				"default" : false
			},
			mountainebony : {
				label : "Mountain Ebony",
				type : "checkbox",
				"default" : false
			},
			oak : {
				label : "Oak",
				type : "checkbox",
				"default" : false
			},
			olive : {
				label : "Olive",
				type : "checkbox",
				"default" : false
			},
			ornament : {
				label : "Ornament",
				type : "checkbox",
				"default" : false
			},
			ornamenttreeii : {
				label : "Ornament Tree II",
				type : "checkbox",
				"default" : false
			},
			peachpalm : {
				label : "Peach Palm",
				type : "checkbox",
				"default" : false
			},
			picholineolive : {
				label : "Picholine Olive",
				type : "checkbox",
				"default" : false
			},
			pinoak : {
				label : "Pin Oak",
				type : "checkbox",
				"default" : false
			},
			pine : {
				label : "Pine",
				type : "checkbox",
				"default" : false
			},
			pinkdogwood : {
				label : "Pink Dogwood",
				type : "checkbox",
				"default" : false
			},
			ponderosalemon : {
				label : "Ponderosa Lemon",
				type : "checkbox",
				"default" : false
			},
			purplehangingflower : {
				label : "Purple Hanging Flower",
				type : "checkbox",
				"default" : false
			},
			purplemagnolia : {
				label : "Purple Magnolia",
				type : "checkbox",
				"default" : false
			},
			rainbowapple : {
				label : "Rainbow Apple",
				type : "checkbox",
				"default" : false
			},
			rainiercherry : {
				label : "Rainier Cherry",
				type : "checkbox",
				"default" : false
			},
			redalder : {
				label : "Red Alder",
				type : "checkbox",
				"default" : false
			},
			redmaple : {
				label : "Red Maple",
				type : "checkbox",
				"default" : false
			},
			redpine : {
				label : "Red Pine",
				type : "checkbox",
				"default" : false
			},
			royalcrystal : {
				label : "Royal Crystal",
				type : "checkbox",
				"default" : false
			},
			rubyguava : {
				label : "Ruby Guava",
				type : "checkbox",
				"default" : false
			},
			sartreguava : {
				label : "Sartre Guava",
				type : "checkbox",
				"default" : false
			},
			shinkopear : {
				label : "Shinko Pear",
				type : "checkbox",
				"default" : false
			},
			silvermaple : {
				label : "Silver Maple",
				type : "checkbox",
				"default" : false
			},
			singaporejackfruit : {
				label : "Singapore Jackfruit",
				type : "checkbox",
				"default" : false
			},
			speckledalder : {
				label : "Speckled Alder",
				type : "checkbox",
				"default" : false
			},
			starrubygrapefruit : {
				label : "Star Ruby Grapefruit",
				type : "checkbox",
				"default" : false
			},
			tamarind : {
				label : "Tamarind",
				type : "checkbox",
				"default" : false
			},
			umbrellabamboo : {
				label : "Umbrella Bamboo",
				type : "checkbox",
				"default" : false
			},
			umbrellapine : {
				label : "Umbrella Pine",
				type : "checkbox",
				"default" : false
			},
			verawood : {
				label : "Vera Wood",
				type : "checkbox",
				"default" : false
			},
			walnut : {
				label : "Walnut",
				type : "checkbox",
				"default" : false
			},
			weepingbirch : {
				label : "Weeping Birch",
				type : "checkbox",
				"default" : false
			},
			whitecedar : {
				label : "White Cedar",
				type : "checkbox",
				"default" : false
			},
			whitepine : {
				label : "White Pine",
				type : "checkbox",
				"default" : false
			},
			whiteplumeria : {
				label : "White Plumeria",
				type : "checkbox",
				"default" : false
			},
			whitewalnut : {
				label : "White Walnut",
				type : "checkbox",
				"default" : false
			},
			wildcashew : {
				label : "Wild Cashew",
				type : "checkbox",
				"default" : false
			},
			wildservice : {
				label : "Wild Service",
				type : "checkbox",
				"default" : false
			},
			wychelm : {
				label : "Wych Elm",
				type : "checkbox",
				"default" : false
			},
			yellowmaple : {
				label : "Yellow Maple",
				type : "checkbox",
				"default" : false
			},
			yellowpassionfruit : {
				label : "Yellow Passion Fruit",
				type : "checkbox",
				"default" : false
			}
		}
	},
	gianttreeseparator : {
		label : "Giant Trees",
		type : "separator"
	},
	giantballoon : {
		label : "Balloon",
		type : "checkbox",
		"default" : false,
		kids : {
			bigbellflower : {
				label : "Bell Flower",
				type : "checkbox",
				"default" : false
			},
			giantblackcherry : {
				label : "Black Cherry",
				type : "checkbox",
				"default" : false
			},
			giantboom : {
				label : "Boom",
				type : "checkbox",
				"default" : false
			},
			giantbubblegum : {
				label : "Bubblegum",
				type : "checkbox",
				"default" : false
			},
			giantcandyapple : {
				label : "Candy Apple",
				type : "checkbox",
				"default" : false
			},
			giantcandycorn : {
				label : "Candy Corn",
				type : "checkbox",
				"default" : false
			},
			bigcaramelapple : {
				label : "Caramel Apple",
				type : "checkbox",
				"default" : false
			},
			giantchocolateheart : {
				label : "Chocolate Heart",
				type : "checkbox",
				"default" : false
			},
			bigchromecherry : {
				label : "Chrome Cherry",
				type : "checkbox",
				"default" : false
			},
			giantcocoa : {
				label : "Cocoa",
				type : "checkbox",
				"default" : false
			},
			bigcocoatruffle : {
				label : "Cocoa Truffle",
				type : "checkbox",
				"default" : false
			},
			giantcoin : {
				label : "Coin",
				type : "checkbox",
				"default" : false
			},
			giantcupcake : {
				label : "Cupcake",
				type : "checkbox",
				"default" : false
			},
			giantdarkapple : {
				label : "Dark Apple",
				type : "checkbox",
				"default" : false
			},
			giantdarkpeach : {
				label : "Dark Peach",
				type : "checkbox",
				"default" : false
			},
			giantdiscoball : {
				label : "Disco Ball",
				type : "checkbox",
				"default" : false
			},
			giantfather : {
				label : "Father",
				type : "checkbox",
				"default" : false
			},
			giantfairy : {
				label : "Fairy",
				type : "checkbox",
				"default" : false
			},
			bigfallribbonflower : {
				label : "Fall Ribbon Flower",
				type : "checkbox",
				"default" : false
			},
			giantfirepeach : {
				label : "Fire Peach",
				type : "checkbox",
				"default" : false
			},
			giantfleurdelis : {
				label : "Fleur de lis",
				type : "checkbox",
				"default" : false
			},
			bigfrenchbread : {
				label : "French Bread",
				type : "checkbox",
				"default" : false
			},
			giantgem : {
				label : "Gem",
				type : "checkbox",
				"default" : false
			},
			giantgemfruit : {
				label : "Gem Fruit",
				type : "checkbox",
				"default" : false
			},
			giantgoldenapple : {
				label : "Golden Apple",
				type : "checkbox",
				"default" : false
			},
			giantgoldenfairy : {
				label : "Golden Fairy",
				type : "checkbox",
				"default" : false
			},
			bighalloween : {
				label : "Halloween",
				type : "checkbox",
				"default" : false
			},
			bighalloweencandle : {
				label : "Halloween Candle",
				type : "checkbox",
				"default" : false
			},
			bighalloweencandy : {
				label : "Halloween Candy",
				type : "checkbox",
				"default" : false
			},
			bighalloweencookie : {
				label : "Halloween Cookie",
				type : "checkbox",
				"default" : false
			},
			gianthalloweenlantern : {
				label : "Halloween Lantern",
				type : "checkbox",
				"default" : false
			},
			giantheartcandy : {
				label : "Heart Candy",
				type : "checkbox",
				"default" : false
			},
			bighoneycrispapple : {
				label : "Honeycrisp Apple",
				type : "checkbox",
				"default" : false
			},
			gianticecream : {
				label : "Ice Cream",
				type : "checkbox",
				"default" : false
			},
			giantjackolantern : {
				label : "Jack O Lantern",
				type : "checkbox",
				"default" : false
			},
			giantjewel : {
				label : "Jewel",
				type : "checkbox",
				"default" : false
			},
			bigjulyballoon : {
				label : "July Balloon",
				type : "checkbox",
				"default" : false
			},
			giantjulyconfetti : {
				label : "July Confetti",
				type : "checkbox",
				"default" : false
			},
			giantjulyicecream : {
				label : "July Ice Cream",
				type : "checkbox",
				"default" : false
			},
			giantluckycookie : {
				label : "Lucky Cookie",
				type : "checkbox",
				"default" : false
			},
			giantmacandcheese : {
				label : "Mac & Cheese",
				type : "checkbox",
				"default" : false
			},
			giantmagicorange : {
				label : "Magic Orange",
				type : "checkbox",
				"default" : false
			},
			giantmagicpeach : {
				label : "Magic Peach",
				type : "checkbox",
				"default" : false
			},
			giantmardigras : {
				label : "Mardi Gras",
				type : "checkbox",
				"default" : false
			},
			giantmossy : {
				label : "Mossy",
				type : "checkbox",
				"default" : false
			},
			giantpinkgem : {
				label : "Pink Gem",
				type : "checkbox",
				"default" : false
			},
			giantpurplebubblegum : {
				label : "Purple Bubble Gum",
				type : "checkbox",
				"default" : false
			},
			giantrainbow : {
				label : "Rainbow",
				type : "checkbox",
				"default" : false
			},
			giantredgem : {
				label : "Red Gem",
				type : "checkbox",
				"default" : false
			},
			giantribbonflower : {
				label : "Ribbon Flower",
				type : "checkbox",
				"default" : false
			},
			giantsnowcone : {
				label : "Snowcone",
				type : "checkbox",
				"default" : false
			},
			giantsourapple : {
				label : "Sour Apple",
				type : "checkbox",
				"default" : false
			},
			giantspider : {
				label : "Spider",
				type : "checkbox",
				"default" : false
			},
			giantspringegg : {
				label : "Spring Egg",
				type : "checkbox",
				"default" : false
			},
			bigstarflower : {
				label : "Star Flower",
				type : "checkbox",
				"default" : false
			},
			giantsugarskull : {
				label : "Sugar Skull",
				type : "checkbox",
				"default" : false
			},
			giantwedding : {
				label : "Wedding",
				type : "checkbox",
				"default" : false
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
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
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
	berriesseparator : {
		label : "Berries",
		type : "separator"
	},
	collectibleberries  : {
		label : "Berries Collection",
		type : "checkbox",
		"default" : false,
		kids : {
			collectiblefruitbar : {
				label : "Fruit Bar",
				type : "checkbox",
				"default" : false
			},
			collectiblesorbet : {
				label : "Sorbet",
				type : "checkbox",
				"default" : false
			},
			collectiblepreserves : {
				label : "Preserves",
				type : "checkbox",
				"default" : false
			},
			collectibledriedberries : {
				label : "Dried Berries",
				type : "checkbox",
				"default" : false
			},
			collectibleberrybasket : {
				label : "Berry Basket",
				type : "checkbox",
				"default" : false
			}
		}
	},
	citrusseparator : {
		label : "Citrus",
		type : "separator"
	},
	collectiblecitrus : {
		label : "Citrus Collection",
		type : "checkbox",
		"default" : false,
		kids : {
			collectiblebubblegum : {
				label : "Bubble Gum",
				type : "checkbox",
				"default" : false
			},
			collectiblejuicer : {
				label : "Juicer",
				type : "checkbox",
				"default" : false
			},
			collectiblesherbet : {
				label : "Sherbet",
				type : "checkbox",
				"default" : false
			},
			collectiblefruitwedges : {
				label : "Fruit Wedges",
				type : "checkbox",
				"default" : false
			},
			collectiblecitruspeel : {
				label : "Citrus Peel",
				type : "checkbox",
				"default" : false
			}
		}
	},
	cowsseparator : {
		label : "Cows",
		type : "separator"
	},
	collectiblecows  : {
		label : "Cows Collection",
		type : "checkbox",
		"default" : false,
		kids : {
			collectiblecowbell : {
				label : "Cow Bell",
				type : "checkbox",
				"default" : false
			},
			collectiblemilkingbucket : {
				label : "Milking Bucket",
				type : "checkbox",
				"default" : false
			},
			collectiblemilkingstool : {
				label : "Milking Stool",
				type : "checkbox",
				"default" : false
			},
			collectiblemilkbottle : {
				label : "Milk Bottle",
				type : "checkbox",
				"default" : false
			},
			collectiblemorecowbell : {
				label : "More Cowbell",
				type : "checkbox",
				"default" : false
			}
		}
	},
	flowersseparator : {
		label : "Flowers",
		type : "separator"
	},
	collectibleflowers : {
		label : "Flowers Collection",
		type : "checkbox",
		"default" : false,
		kids : {
			collectiblecorsage : {
		        label : "Corsage",
		        type : "checkbox",
		        "default" : false,
		    },
	        collectiblehummingbird : {
		        label : "Hummingbird",
		        type : "checkbox",
		        "default" : false,
		    },
	        collectibledriedpetals : {
		        label : "Dried Petals",
		        type : "checkbox",
		        "default" : false,
		    },
			collectiblebutterfly : {
				label : "Butterfly",
				type : "checkbox",
				"default" : false
			},
			collectiblepollen : {
				label : "Pollen",
				type : "checkbox",
				"default" : false
			}
		}
	},
	grainsseparator : {
		label : "Grains",
		type : "separator"
	},
	collectiblegrains : {
		label : "Grains Collection",
		type : "checkbox",
		"default" : false,
		kids : {
			collectiblegrindstone : {
				label : "Grindstone",
				type : "checkbox",
				"default" : false
			},
			collectiblescythe : {
				label : "Scythe",
				type : "checkbox",
				"default" : false
			},
			collectiblebran : {
				label : "Bran",
				type : "checkbox",
				"default" : false
			},
			collectiblechaff : {
				label : "Chaff",
				type : "checkbox",
				"default" : false
			},
			collectibleflour : {
				label : "Flour",
				type : "checkbox",
				"default" : false
			}
		}
	},
	squashseparator : {
		label : "Squash",
		type : "separator"
	},
	collectiblesquash  : {
		label : "Squash Collection",
		type : "checkbox",
		"default" : false,
		kids : {
			collectiblepumpkinseeds : {
				label : "Pumpkin Seeds",
				type : "checkbox",
				"default" : false
			},
			collectiblestuffedpasta : {
				label : "Stuffed Pasta",
				type : "checkbox",
				"default" : false
			},
			collectibledecorativegourds : {
				label : "Decorative Gourds",
				type : "checkbox",
				"default" : false
			},
			collectibleyerbamate : {
				label : "Yerba Mate",
				type : "checkbox",
				"default" : false
			},
			collectiblesitar : {
				label : "Sitar",
				type : "checkbox",
				"default" : false
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
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
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
		"default" : false,
		kids : {
			flowers : {
				label : "Flowers",
				type : "checkbox",
				"default" : false
			},
			shovel : {
				label : "Shovels",
				type : "checkbox",
				"default" : false
			},
			valentines : {
				label : "Valentines",
				type : "checkbox",
				"default" : false
			},
			gold : {
				label : "Gold Pieces",
				type : "checkbox",
				"default" : false
			},
			schoolsupplies : {
				label : "School Supplies",
				type : "checkbox",
				"default" : false
			},
			candy : {
				label : "Candy",
				type : "checkbox",
				"default" : false
			},
			thanksgivingfeast : {
				label : "Extra Dishes",
				type : "checkbox",
				"default" : false
			},
			holidaygifts : {
				label : "Holiday Gifts",
				type : "checkbox",
				"default" : false
			},
			luckypenny : {
				label : "Lucky Pennies",
				type : "checkbox",
				"default" : false
			},
			beachtoys : {
				label : "Beach Toys",
				type : "checkbox",
				"default" : false
			},
			raffleticket : {
				label : "Raffle Tickets",
				type : "checkbox",
				"default" : false
			},
			apple : {
				label : "Apples",
				type : "checkbox",
				"default" : false
			},
			treats : {
				label : "Treats",
				type : "checkbox",
				"default" : false
			},
			tricks : {
				label : "Tricks",
				type : "checkbox",
				"default" : false
			},
		}
	},
	eventitemhalloweenseparator : {
		label : "Halloween",
		type : "separator"
	},
	claimminijackolantern : {
		label : "Mini Jack-O'Lantern",
		type : "checkbox",
		"default" : false,
		kids : {	
			claimpumpkinterrier : {
				label : "Pumpkin Terrier",
				type : "checkbox",
				"default" : false
			},
			cowpumpkin : {
				label : "Pumpkin Cow",
				type : "checkbox",
				"default" : false
			},
			bigcandypumpkin : {
				label : "Big Candy Pumpkin Tree",
				type : "checkbox",
				"default" : false
			},
			claimhalloweenpond : {
				label : "Halloween Pond",
				type : "checkbox",
				"default" : false
			},
			stallionnightmare : {
				label : "Nightmare Stallion",
				type : "checkbox",
				"default" : false
			},
		},
	},
	claimheadlesshorsemangnome : {
		label : "Headless Horseman Gnome",
		type : "checkbox",
		"default" : false,
		kids : {
			claimcobwebbedtree : {
				label : "Cobwebbed Tree",
				type : "checkbox",
				"default" : false
			},
			unicorncandycorn : {
				label : "Candycorn Unicorn",
				type : "checkbox",
				"default" : false
			},
		},
	},
	claimpumpkintopiary : {
		label : "Pumpkin Topiary",
		type : "checkbox",
		"default" : false,
		kids : {
			claimscaredewe : {
				label : "Scared Ewe",
				type : "checkbox",
				"default" : false
			},
			claimcandiedgnome : {
				label : "Candied Gnome",
				type : "checkbox",
				"default" : false
			},
			claimskelescarecrow : {
				label : "Skele-scarecrow",
				type : "checkbox",
				"default" : false
			},
			claimbattree : {
				label : "Bat Tree",
				type : "checkbox",
				"default" : false
			},
			claimpumpkinhouse : {
				label : "Pumpkin House",
				type : "checkbox",
				"default" : false
			}
		}
	},
	bobbingseparator : {
		label : "Bobbing For Apples",
		type : "separator"
	},
	claimfallflowerbed : {
		label : "Fall Flowerbed",
		type : "checkbox",
		"default" : false,
		kids : {
			claimautumnfireplace : {
				label : "Autumn Fireplace",
				type : "checkbox",
				"default" : false
			},
			claimharvestgnome : {
				label : "Harvest Gnome",
				type : "checkbox",
				"default" : false
			},
			pigghost : {
				label : "Ghost Pig",
				type : "checkbox",
				"default" : false
			},
			horsecandycorn : {
				label : "Candy Corn Horse",
				type : "checkbox",
				"default" : false
			},
		}
	},
	sandcastleseparator : {
		label : "Sand Castle",
		type : "separator"
	},
	claimbeachumbrella : {
		label : "Beach Umbrella",
		type : "checkbox",
		"default" : false,
		kids : {
			claimbeachchair : {
				label : "Beach Chair",
				type : "checkbox",
				"default" : false
			},
			claimbeachhut : {
				label : "Beach Hut",
				type : "checkbox",
				"default" : false
			},
			claimpoolsidepig : {
				label : "Poolside Pig",
				type : "checkbox",
				"default" : false
			},
			claimscubasheep : {
				label : "Scuba Sheep",
				type : "checkbox",
				"default" : false
			},
			claimlifeguardtower : {
				label : "Lifeguard Tower",
				type : "checkbox",
				"default" : false
			}
		}
	},
	birthdayseparator : {
		label : "Farmville Birthday 2 Countdown",
		type : "separator"
	},
	doghouse : {
		label : "Doghouse",
		type: "checkbox",
		"default" : false,
		kids : {
			cowprintballoonarch : {
				label : "Cowprint Balloon Arch",
				type : "checkbox",
				"default" : false
			},
			lamppost : {
				label : "Lamppost",
				type: "checkbox",
				"default" : false
			},
			bluebird : {
				label : "Blue Bird",
				type : "checkbox",
				"default" : false
			},
			orangeduck : {
				label : "Orange Duck",
				type : "checkbox",
				"default" : false
			},
			birdbathfountain : {
				label : "Bird Bath Fountain",
				type : "checkbox",
				"default" : false
			},
			gardenshelter : {
				label : "Garden Shelter",
				type : "checkbox",
				"default" : false
			},
			bicycleplanter : {
				label : "Bicycle Planter",
				type : "checkbox",
				"default" : false
			},
			flowerbed2 : {
				label : "Flower Bed",
				type : "checkbox",
				"default" : false
			},
			ivyarchway : {
				label : "Ivy Archway",
				type : "checkbox",
				"default" : false
			},
			benchplanter : {
				label : "Bench Planter",
				type : "checkbox",
				"default" : false
			},
			fvhaybale : {
				label : "FV Haybale",
				type: "checkbox",
				"default" : false
			}
		}
	},
	springseparator : {
		label : "Spring Basket",
		type : "separator"
	},
	claimspringarch : {
		label : "Spring Arch",
		type : "checkbox",
		"default" : false,
		kids : {
			claimflowerfountain : {
				label : "Flower Fountain",
				type : "checkbox",
				"default" : false
			},
			claimflowertower : {
				label : "Flower Tower",
				type : "checkbox",
				"default" : false
			},
			duckyellow : {
				label : "Yellow Duck",
				type : "checkbox",
				"default" : false
			},
			cowyellowpatch : {
				label : "Yellow Patch Cow",
				type : "checkbox",
				"default" : false
			},
			sheepflower : {
				label : "Flower Sheep",
				type : "checkbox",
				"default" : false
			}
		}
	},
	claimmysteryegg : {
		label : "Mystery Egg",
		type : "checkbox",
		"default" : false,
		kids : {
			claimsunnyewe : {
				label : "Sunny Ewe",
				type : "checkbox",
				"default" : false
			},
			claimbunnygnome : {
				label : "Bunny Gnome",
				type : "checkbox",
				"default" : false
			},
			claimgildedegg : {
				label : "Gilded Egg",
				type : "checkbox",
				"default" : false
			},
			claimdutchwindmill : {
				label : "Dutch Windmill",
				type : "checkbox",
				"default" : false
			}
		}
	},
	springcountdownseparator : {
		label : "Spring Countdown",
		type : "separator"
	},
	pastelhaybale : {
		label : "Pastel Hay Bale",
		type : "checkbox",
		"default" : false,
		kids : {
			flowerbucket : {
				label : "Flower Bucket",
				type : "checkbox",
				"default" : false
			},
			littlewagon : {
				label : "Little Wagon",
				type : "checkbox",
				"default" : false
			},
			springflowers : {
				label : "Spring Flowers",
				type : "checkbox",
				"default" : false
			},
			milkcrate : {
				label : "Milk Crate",
				type : "checkbox",
				"default" : false
			},
			azalea : {
				label : "Azalea",
				type : "checkbox",
				"default" : false
			},
			stonearchway : {
				label : "Stone Archway",
				type : "checkbox",
				"default" : false
			},
			springballoonarch : {
				label : "Spring Balloon Arch",
				type : "checkbox",
				"default" : false
			},
			weathervane : {
				label : "Weather Vane",
				type : "checkbox",
				"default" : false
			},
			fruitcrate : {
				label : "Fruit Crate",
				type : "checkbox",
				"default" : false
			},
			bouncinghorse : {
				label : "Bouncing Horse",
				type : "checkbox",
				"default" : false
			},
			cowgreenpatch : {
				label : "Green Patch",
				type : "checkbox",
				"default" : false
			}
		}
	},
	stpattyseparator : {
		label : "St.Patrick's Day",
		type : "separator"
	},
	claimkellygreenhaybale : {
		label : "Kelly Green Hay Bale",
		type : "checkbox",
		"default" : false,
		kids : {
			claimclovergnome : {
				label : "Clover Gnome",
				type : "checkbox",
				"default" : false
			},
			claimcloversheep : {
				label : "Clover Sheep",
				type : "checkbox",
				"default" : false
			},
			claimcloverchicken : {
				label : "Clover Chicken",
				type : "checkbox",
				"default" : false
			},
			claimluckyfountain : {
				label : "Lucky Fountain",
				type : "checkbox",
				"default" : false
			},
			claimgreenlighthouse : {
				label : "Green Lighthouse",
				type : "checkbox",
				"default" : false
			}
		}
	},
	claimshamrocksheep : {
		label : "Shamrock Sheep",
		type : "checkbox",
		"default" : false,
		kids : {
			claimspringflowercart : {
				label : "Spring Flower Cart",
				type : "checkbox",
				"default" : false
			},
			claimspringpond : {
				label : "Spring Pond",
				type : "checkbox",
				"default" : false
			},
			claimshamrockcastle : {
				label : "Shamrock Castle",
				type : "checkbox",
				"default" : false
			}
		}
	},
	wishingwellseparator : {
		label : "Wishing Well",
		type : "separator"
	},
	animatedbutterfly : {
		label : "Animated Butterfly",
		type : "checkbox",
		"default" : false,
		kids : {
			whitewillow : {
				label : "White Willow",
				type : "checkbox",
				"default" : false
			},
			nightingale : {
				label : "Nightingale",
				type : "checkbox",
				"default" : false
			},
			warderduck : {
				label : "Warder Duck",
				type : "checkbox",
				"default" : false
			},
			chefgnome : {
				label : "Chef Gnome",
				type : "checkbox",
				"default" : false
			},
			tractor : {
				label : "Double-Deck Tractor",
				type : "checkbox",
				"default" : false
			}
		}
	},
	leprechaungnome : {
		label : "Leprechaun Gnome",
		type : "checkbox",
		"default" : false,
		kids : {
			irishcottage : {
				label : "Irish Cottage",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			claimspaghettisheep : {
				label : "Spaghetti Sheep",
				type : "checkbox",
				"default" : false
			},
			claimpighighart : {
				label : "Pig High Art",
				type : "checkbox",
				"default" : false
			},
			claimapollobutterfly : {
				label : "Apollo Butterfly",
				type : "checkbox",
				"default" : false
			},
			claimbellafountain : {
				label : "Bella Fountain",
				type : "checkbox",
				"default" : false
			},
			claimleaningtower : {
				label : "Leaning Tower",
				type : "checkbox",
				"default" : false
			}
		}
	},
	favor : {
		label : "Random Favors",
		type : "checkbox",
		"default" : false,
		kids : {
			favoreggs : {
				label : "Eggs",
				type : "checkbox",
				"default" : false
			},
			favorolives : {
				label : "Olives",
				type : "checkbox",
				"default" : false
			},
			favorgoatmilk : {
				label : "Goat Milk",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			claimcrystalrock : {
				label : "Crystal Rock",
				type : "checkbox",
				"default" : false
			},
			claimminersheep : {
				label : "Miner Sheep",
				type : "checkbox",
				"default" : false
			},
			claimcavegnome : {
				label : "Cave Gnome",
				type : "checkbox",
				"default" : false
			},
			claimantiquetractor : {
				label : "Antique Tractor",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			queenbee : {
				label : "Queen Bees",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			claimschooledewe : {
				label : "Schooled Ewe",
				type : "checkbox",
				"default" : false
			},
			claimstudentgnome : {
				label : "Student Gnome",
				type : "checkbox",
				"default" : false
			},
			claimtaptapbus : {
				label : "Tap Tap Bus",
				type : "checkbox",
				"default" : false
			},
			claimschoolseesaw : {
				label : "School Seesaw",
				type : "checkbox",
				"default" : false
			},
			claimschoolhouse : {
				label : "School House",
				type : "checkbox",
				"default" : false
			}
		}
	},
	valentinesseparator : {
		label : "Valentine's Day",
		type : "separator"
	},
	claimredhearthay : {
		label : "Red Heart Hay",
		type : "checkbox",
		"default" : false,
		kids : {
			claimyellowrosestand : {
				label : "Yellow Rose Stand",
				type : "checkbox",
				"default" : false
			},
			claimfancycarriage : {
				label : "Fancy Carriage",
				type : "checkbox",
				"default" : false
			},
			claimluvewe : {
				label : "Luv Ewe",
				type : "checkbox",
				"default" : false
			},
			claimgiantteddy : {
				label : "Giant Teddy",
				type : "checkbox",
				"default" : false
			},
			claimvalentineram : {
				label : "Valentine Ram",
				type : "checkbox",
				"default" : false
			},
			claimpeckingducks : {
				label : "Pecking Ducks",
				type : "checkbox",
				"default" : false
			},
			claimpigsinlove : {
				label : "Pigs in Love",
				type : "checkbox",
				"default" : false
			},
			claim3heartsfountain : {
				label : "3 Hearts Fountain",
				type : "checkbox",
				"default" : false
			},
			claimchocolatefountain : {
				label : "Chocolate Fountain",
				type : "checkbox",
				"default" : false
			},
			claimeiffeltower : {
				label : "Eiffel Tower",
				type : "checkbox",
				"default" : false
			},
			claimpinkswan : {
				label : "Pink Swan",
				type : "checkbox",
				"default" : false
			}
		}
	},
	valentinescountdownseparator : {
		label : "Valentine's Countdown",
		type : "separator"
	},
	iloveyoustand : {
		label : "I Love You Stand",
		type : "checkbox",
		"default" : false,
		kids : {
			iloveyousign : {
				label : "I Love You Sign",
				type : "checkbox",
				"default" : false
			},
			xoxosign : {
				label : "XOXO Sign",
				type : "checkbox",
				"default" : false
			},
			purplehaybale : {
				label : "Purple Hay Bale",
				type : "checkbox",
				"default" : false
			},
			heartbear : {
				label : "Heart Teddy",
				type : "checkbox",
				"default" : false
			},
			caramelbear : {
				label : "Caramel Bear",
				type : "checkbox",
				"default" : false
			},
			fuchsiagreenery : {
				label : "Fuchsia Greenery",
				type : "checkbox",
				"default" : false
			},
			pinkgreenery : {
				label : "Pink Greenery",
				type : "checkbox",
				"default" : false
			},
			provencalpot : {
				label : "Provencal Pot",
				type : "checkbox",
				"default" : false
			},
			fancytopiary : {
				label : "Fancy Topiary",
				type : "checkbox",
				"default" : false
			},
			flaxplant : {
				label : "Flax Plant",
				type : "checkbox",
				"default" : false
			},
			dogwoodtree : {
				label : "Dogwood Tree",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			casserole : {
				label : "Casserole",
				type : "checkbox",
				"default" : false
			},
			fruitcake :  {
				label : "Fruit Cake",
				type : "checkbox",
				"default" : false
			},
			spicedcider : {
				label : "Spiced Cider",
				type : "checkbox",
				"default" : false
			},
			leafcandle : {
				label : "Leaf Candle",
				type : "checkbox",
				"default" : false
			}
		}
	},
	claimharvestsurprise : {
		label : "Harvest Surprise",
		type : "checkbox",
		"default" : false,
		kids : {
			claimthankewe : {
				label : "Thank Ewe",
				type : "checkbox",
				"default" : false
			},
			claimpilgrimgnome : {
				label : "Pilgrim Gnome",
				type : "checkbox",
				"default" : false
			},
			claimharvestfountain : {
				label : "Harvest Fountain",
				type : "checkbox",
				"default" : false
			},
			claimbabybourbon : {
				label : "Baby Bourbon",
				type : "checkbox",
				"default" : false
			},
			claimmayflower : {
				label : "Mayflower",
				type : "checkbox",
				"default" : false
			}
		}
	},
	christmasseparator : {
		label : "Christmas",
		type : "separator"
	},
	nutcracker : {
		label : "Silver Nutcracker",
		type : "checkbox",
		"default" : false,
		kids : {
			hollyarch : {
				label : "Holly Arch",
				type : "checkbox",
				"default" : false
			},
			holidaytreats : {
				label : "Treats (Cookies)",
				title : "AKA Holiday Cookies.",
				type : "checkbox",
				"default" : false
			},
			holidaylights : {
				label : "Lights",
				type : "checkbox",
				"default" : false
			},
			holidaybear : {
				label : "Holiday Bear",
				type : "checkbox",
				"default" : false
			},
			wrappingpaper : {
				label : "Wrapping Paper",
				type : "checkbox",
				"default" : false
			},
			icesculpture : {
				label : "Frozen Fantasy",
				title : "AKA Ice Sculpture.",
				type : "checkbox",
				"default" : false
			},
			snowflakepole : {
				label : "Snowflake Pole",
				type : "checkbox",
				"default" : false
			}
		}
	},
	wintercountdownseparator : {
		label : "Winter Countdown",
		type : "separator"
	},
	whitesoldier : {
		label : "White Soldier",
		type: "checkbox",
		"default" : false,
		kids : {
			icysnowflake : {
				label : "Icy Snowflake",
				type : "checkbox",
				"default" : false
			},
			frostysnowflake : {
				label : "Frosty Snowflake",
				type: "checkbox",
				"default" : false
			},
			bluesoldier : {
				label : "Blue Soldier",
				type : "checkbox",
				"default" : false
			},
			silverornament : {
				label : "Silver Ornament",
				type : "checkbox",
				"default" : false
			},
			goldornament : {
				label : "Gold Ornament",
				type : "checkbox",
				"default" : false
			},
			goldsoldier : {
				label : "Gold Soldier",
				type : "checkbox",
				"default" : false
			},
			cocoabear : {
				label : "Cocoa Bear",
				type : "checkbox",
				"default" : false
			},
			snowdrift : {
				label : "Snow Drift",
				type : "checkbox",
				"default" : false
			},
			snowpile : {
				label : "Snow Pile",
				type : "checkbox",
				"default" : false
			},
			goldnutcracker : {
				label : "Gold Nutcracker",
				type : "checkbox",
				"default" : false
			},
			creambear : {
				label : "Cream Bear",
				type: "checkbox",
				"default" : false
			}
		}
	},
	decorationseparator : {
		label : "Decorations",
		type : "separator"
	},
	decoration : {
		label : "La Maison",
		type : "checkbox",
		"default" : false,
		kids : {
			decorationgarden : {
				label : "Garden",
				type : "checkbox",
				"default" : false
			},
			decorationjapanesebarn : {
				label : "Japanese Barn",
				type : "checkbox",
				"default" : false
			},
			gnome : {
				label : "Crafting Cottage Gnomes",
				type : "checkbox",
				"default" : false
			},
			elfgnome : {
				label : "Elf Gnome",
				type: "checkbox",
				"default" : false
			},
			firework : {
				label : "Fireworks",
				type: "checkbox",
				"default" : false
			},
			englishhat : {
				label : "English Hat",
				type : "checkbox",
				"default" : false
			},
			asterflowerfence : {
				label : "Aster Flower Fence",
				type : "checkbox",
				"default" : false
			},
			potofenglishrose : {
				label : "Pot of English Rose",
				type : "checkbox",
				"default" : false
			},
			flowerbed : {
				label : "Flowerbed",
				type : "checkbox",
				"default" : false
			},
			glitter : {
				label : "Glitter",
				type : "checkbox",
				"default" : false
			},
			treehouse : {
				label : "Tree House",
				type : "checkbox",
				"default" : false
			},
			picnicset : {
				label : "Picnic Set",
				type : "checkbox",
				"default" : false
			},
			greengazingball : {
				label : "Green Gazing Ball",
				type : "checkbox",
				"default" : false
			},
			smallpond : {
				label : "Small Pond",
				type : "checkbox",
				"default" : false
			},
			animatedbutterflies : {
				label : "Animated Butterflies",
				type : "checkbox",
				"default" : false
			},
			applebarrel : {
				label : "Apple Barrel",
				type : "checkbox",
				"default" : false
			},
		}
	},
	flaghaiti : {
		label : "Sweet Seeds for Haiti Flags",
		type : "checkbox",
		"default" : false,
		kids : {
			flagjapan : {
				label : "Japanese Relief Flags",
				type : "checkbox",
				"default" : false
			},
			lunchbox : {
				label : "Edible Schoolyard Project Lunchbox",
				type : "checkbox",
				"default" : false
			}
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
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
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
	calfseparator : {
		label : "Calves",
		type : "separator"
	},
	calfamerican : {
		label : "American",
		type : "checkbox",
		"default" : false,
		kids : {
			calfayrshire : {
				label : "Ayrshire",
				type : "checkbox",
				"default" : false
			},
			calfautumn : {
				label : "Autumn",
				type : "checkbox",
				"default" : false
			},
			calfbaby : {
				label : "Baby",
				type : "checkbox",
				"default" : false,
				title : "Normal Calf"
			},
			calfbelted : {
				label : "Belted",
				type : "checkbox",
				"default" : false
			},
			calfblackangus : {
				label : "Black Angus",
				type : "checkbox",
				"default" : false
			},
			calfblackshorthorn : {
				label : "Black Shorthorn",
				type : "checkbox",
				"default" : false
			},
			calfblue : {
				label : "Blue",
				type : "checkbox",
				"default" : false
			},
			calfblueox : {
				label : "Blue Ox",
				type : "checkbox",
				"default" : false
			},
			calfbovine11 : {
				label : "B0v1n3-11",
				type : "checkbox",
				"default" : false,
				title : "AKA Honeysuckle"
			},
			calfbrown : {
				label : "Brown",
				type : "checkbox",
				"default" : false
			},
			calfbrownswiss : {
				label : "Brown Swiss",
				type : "checkbox",
				"default" : false
			},
			calfbull : {
				label : "Bull",
				type : "checkbox",
				"default" : false
			},
			calfcanadienne : {
				label : "Canadienne",
				type : "checkbox",
				"default" : false
			},
			calfcandycane : {
				label : "Candy Cane",
				type : "checkbox",
				"default" : false
			},
			calfcharolais : {
				label : "Charolais",
				type : "checkbox",
				"default" : false
			},
			calfchocolate : {
				label : "Chocolate",
				type : "checkbox",
				"default" : false
			},
			calfchrome : {
				label : "Chrome",
				type : "checkbox",
				"default" : false
			},
			calfdevon : {
				label : "Devon",
				type : "checkbox",
				"default" : false
			},
			calfdexter : {
				label : "Dexter",
				type : "checkbox",
				"default" : false
			},
			calfdisco : {
				label : "Disco",
				type : "checkbox",
				"default" : false
			},
			calfenglish : {
				label : "English",
				type : "checkbox",
				"default" : false
			},
			calffairy : {
				label : "Fairy",
				type : "checkbox",
				"default" : false
			},
			calffall : {
				label : "Fall",
				type : "checkbox",
				"default" : false
			},
			calffan : {
				label : "Fan",
				type : "checkbox",
				"default" : false
			},
			calfflower : {
				label : "Flower",
				type : "checkbox",
				"default" : false
			},
			calffrankensteinbride : {
				label : "Frankenstein Bride",
				type : "checkbox",
				"default" : false
			},
			calfgalician : {
				label : "Galician Blond",
				type : "checkbox",
				"default" : false
			},
			calfgelbvieh : {
				label : "Gelbvieh",
				type : "checkbox",
				title : "AKA. the \"Yellow Cattle Calf\"",
				"default" : false
			},
			calfgrayjersey : {
				label : "Gray Jersey",
				type : "checkbox",
				"default" : false
			},
			calfgreen : {
				label : "Green",
				type : "checkbox",
				"default" : false
			},
			calfgreenpatch : {
				label : "Green Patch",
				type : "checkbox",
				"default" : false
			},
			calfgreyoxen : {
				label : "Grey Oxen",
				type : "checkbox",
				"default" : false
			},
			calfgroovy : {
				label : "Groovy",
				type : "checkbox",
				"default" : false
			},
			calfguernsey : {
				label : "Guernsey",
				type : "checkbox",
				"default" : false
			},
			calfhereford : {
				label : "Hereford",
				type : "checkbox",
				"default" : false
			},
			calfhighland : {
				label : "Highland",
				type : "checkbox",
				"default" : false
			},
			calfholiday : {
				label : "Holiday",
				type : "checkbox",
				"default" : false
			},
			calfholstein : {
				label : "Holstein",
				type : "checkbox",
				"default" : false
			},
			calfholsteinbull : {
				label : "Holstein Bull",
				type : "checkbox",
				"default" : false
			},
			calfirishkerry : {
				label : "Irish Kerry",
				type : "checkbox",
				"default" : false
			},
			calfirishmoiled : {
				label : "Irish Moiled",
				type : "checkbox",
				"default" : false
			},
			calfirishmoiledbull : {
				label : "Irish Moiled Bull",
				type : "checkbox",
				"default" : false
			},
			calfjersey : {
				label : "Jersey",
				type : "checkbox",
				"default" : false
			},
			calfkellygreen: {
				label : "Kelly Green",
				type : "checkbox",
				"default" : false
			},
			calflonghorn : {
				label : "Longhorn",
				type : "checkbox",
				"default" : false
			},
			calfmilkingshorthorn : {
				label : "Milking Shorthorn",
				type : "checkbox",
				"default" : false
			},
			calfmilky : {
				label : "Milky",
				type : "checkbox",
				"default" : false
			},
			calfmohawk : {
				label : "Mohawk",
				type : "checkbox",
				"default" : false
			},
			calfneapolitan : {
				label : "Neapolitan",
				type : "checkbox",
				"default" : false
			},
			calfnewyear : {
				label : "New Year",
				type : "checkbox",
				"default" : false
			},
			calfnightmare : {
				label : "Nightmare",
				type : "checkbox",
				"default" : false
			},
			calfnorwegianred : {
				label : "Norwegian Red",
				type : "checkbox",
				"default" : false
			},
			calfbabyox : {
				label : "Baby Ox",
				type : "checkbox",
				"default" : false
			},
			calfpanda : {
				label : "Panda",
				type : "checkbox",
				"default" : false
			},
			calfpineywoods : {
				label : "Pineywoods",
				type : "checkbox",
				"default" : false
			},
			calfpink : {
				label : "Pink",
				type : "checkbox",
				"default" : false
			},
			calfpinkpatch : {
				label : "Pink Patch",
				type : "checkbox",
				"default" : false,
				title : "Pink Patch Calf and Pink Patch Bull Calf."
			},
			calfpinkpatchbull : {
				label : "Pink Patch Bull",
				type : "checkbox",
				"default" : false
			},
			calfpumpkin : {
				label : "Pumpkin",
				type : "checkbox",
				"default" : false
			},
			calfpurple : {
				label : "Purple",
				type : "checkbox",
				"default" : false
			},
			calfpurplevalentine : {
				label : "Purple Valentine",
				type : "checkbox",
				"default" : false
			},
			calfrainbow : {
				label : "Rainbow",
				type : "checkbox",
				"default" : false
			},
			calfrandall : {
				label : "Randall",
				type : "checkbox",
				"default" : false
			},
			calfrandallbull : {
				label : "Randall Bull",
				type : "checkbox",
				"default" : false
			},
			calfred : {
				label : "Red",
				type : "checkbox",
				"default" : false
			},
			calfredbrown : {
				label : "Red Brown",
				type : "checkbox",
				"default" : false
			},
			calfredheart : {
				label : "Red Heart",
				type : "checkbox",
				"default" : false
			},
			calfreferee : {
				label : "Referee",
				type : "checkbox",
				"default" : false
			},
			calfrobot : {
				label : "Robot",
				type : "checkbox",
				"default" : false
			},
			calfsailor : {
				label : "Sailor",
				type : "checkbox",
				"default" : false
			},
			calfshorthorn : {
				label : "Shorthorn",
				type : "checkbox",
				"default" : false
			},
			calfsimmental : {
				label : "Simmental",
				type : "checkbox",
				"default" : false
			},
			calfskeleton : {
				label : "Skeleton",
				type : "checkbox",
				"default" : false
			},
			calftourist : {
				label : "Tourist",
				type : "checkbox",
				"default" : false
			},
			calftuscan : {
				label : "Tuscan",
				type : "checkbox",
				"default" : false
			},
			calfvalentine : {
				label : "Valentine",
				type : "checkbox",
				"default" : false
			},
			calfvineyard : {
				label : "Vineyard",
				type : "checkbox",
				"default" : false
			},
			calfwelsh : {
				label : "Welsh Black",
				type : "checkbox",
				"default" : false
			},
			calfwesternlonghorn : {
				label : "Western Longhorn",
				type : "checkbox",
				"default" : false
			},
			calfyellowpatch : {
				label : "Yellow Patch",
				type : "checkbox",
				"default" : false
			},
			calfyellowreferee : {
				label : "Yellow Referee",
				type : "checkbox",
				"default" : false
			},
		}
	},
	chickenseparator : {
		label : "Chickens",
		type : "separator"
	},
	chicken : {
		label : "White",
		type : "checkbox",
		"default" : false,
		kids : {
			chickenrhodeislandred : {
				label : "Rhode Island Red",
				type : "checkbox",
				"default" : false
			},
			chickendorking : {
				label : "Dorking",
				type : "checkbox",
				"default" : false
			}
		}
	},
	cowseparator : {
		label : "Cows",
		type : "separator"
	},
	cowbrown : {
		label : "Brown",
		type : "checkbox",
		"default" : false,
		kids : {
			cowchocolate : {
				label : "Chocolate",
				type : "checkbox",
				"default" : false
			},
			cowdexter : {
				label : "Dexter",
				type : "checkbox",
				"default" : false
			},
			cowdisco : {
				label : "Disco",
				type : "checkbox",
				"default" : false
			},
			cowfan : {
				label : "Fan",
				type : "checkbox",
				"default" : false
			},
			cowgroovy : {
				label : "Groovy",
				type : "checkbox",
				"default" : false
			},
			moiledirish : {
				label : "Irish Moiled",
				type : "checkbox",
				"default" : false
			},
			cowlonghorn : {
				label : "Longhorn",
				type : "checkbox",
				"default" : false
			},
			cowmilkingshorthorn : {
				label : "Milking Shorthorn",
				type : "checkbox",
				"default" : false
			},
			cowpink : {
				label : "Pink",
				type : "checkbox",
				"default" : false
			},
			cowpinkpatch : {
				label : "Pink Patch",
				type : "checkbox",
				"default" : false
			},
			cowpurple : {
				label : "Purple",
				type : "checkbox",
				"default" : false
			},
			cowpurplevalentine : {
				label : "Purple Valentine",
				type : "checkbox",
				"default" : false
			},
			cow : {
				label : "White",
				type : "checkbox",
				"default" : false
			}
		}
	},
	ducksseparator : {
		label : "Ducks",
		type : "separator"
	},
	duckbelted : {
		label : "Belted",
		type : "checkbox",
		"default" : false,
		kids : {
			duckgoldeneye : {
				label : "Goldeneye",
				type : "checkbox",
				"default" : false
			},
			duckparty : {
				label : "Party",
				type : "checkbox",
				"default" : false
			},
			duckugly : {
				label : "Ugly",
				type : "checkbox",
				"default" : false
			}
		}
	},
	ducklingseparator : {
		label : "Ducklings",
		type : "separator"
	},
	duckling : {
		label : "Random",
		type : "checkbox",
		title : "Either brown or yellow, random",
		"default" : false,
		kids : {
			ducklingbrown : {
				label : "Brown",
				type : "checkbox",
				"default" : false
			},
			ducklingblue : {
				label : "Blue",
				type : "checkbox",
				"default" : false
			},
			ducklingred : {
				label : "Red",
				type : "checkbox",
				"default" : false
			},
			ducklingyellow : {
				label : "Yellow",
				type : "checkbox",
				"default" : false
			}
		}
	},
	foalseparator : {
		label : "Foals",
		type : "separator"
	},
	foalamerican : {
		label : "American",
		type : "checkbox",
		"default" : false,
		kids : {
			foalamericanquarter : {
				label : "American Quarter",
				type : "checkbox",
				"default" : false
			},
			foalandalusian : {
				label : "Andalusian",
				type : "checkbox",
				"default" : false
			},
			foalappaloosa : {
				label : "Appaloosa",
				type : "checkbox",
				"default" : false
			},
			foalminiappaloosa : {
				label : "Appaloosa Mini",
				type : "checkbox",
				"default" : false
			},
			foalapple : {
				label : "Apple",
				type : "checkbox",
				"default" : false
			},
			foalarabianstallion : {
				label : "Arabian Stallion",
				type : "checkbox",
				"default" : false
			},
			foalasianwild : {
				label : "Asian Wild",
				type : "checkbox",
				"default" : false
			},
			foalautumn : {
				label : "Autumn",
				type : "checkbox",
				"default" : false
			},
			foalazteca : {
				label : "Azteca",
				type : "checkbox",
				"default" : false
			},
			foalbatwing : {
				label : "Batwing",
				type : "checkbox",
				"default" : false
			},
			foalbayandalusian : {
				label : "Bay Andalusian",
				type : "checkbox",
				"default" : false
			},
			foalbedazzled : {
				label : "Bedazzled",
				type : "checkbox",
				"default" : false
			},
			foalblack : {
				label : "Black",
				type : "checkbox",
				"default" : false
			},
			foalblackarabian : {
				label : "Black Arabian",
				type : "checkbox",
				"default" : false
			},
			foalblackbelgian : {
				label : "Black Belgian",
				type : "checkbox",
				"default" : false
			},
			foalblackcherry : {
				label : "Black Cherry",
				type : "checkbox",
				"default" : false
			},
			foalblackdartmoor : {
				label : "Black Dartmoor",
				type : "checkbox",
				"default" : false
			},
			foalblackgypsy : {
				label : "Black Gypsy",
				type : "checkbox",
				"default" : false,
				title : "AKA the Black Beauty Foal."
			},
			foalblackmini : {
				label : "Black Mini",
				type : "checkbox",
				"default" : false
			},
			foalblackminiunicorn : {
				label : "Black Mini Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalblacknwhite : {
				label : "Black N White",
				type : "checkbox",
				"default" : false
			},
			foalblackpercheron : {
				label : "Black Percheron",
				type : "checkbox",
				"default" : false
			},
			foalblackpony : {
				label : "Black Pony",
				type : "checkbox",
				"default" : false 
			},
			foalblackponytail : {
				label : "Black Ponytail",
				type : "checkbox",
				"default" : false
			},
			foalblackshire : {
				label : "Black Shire",
				type : "checkbox",
				"default" : false
			},
			foalblackstallion : {
				label : "Black Stallion",
				type : "checkbox",
				"default" : false
			},
			foalblackunicorn : {
				label : "Black Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalbluemanegypsy : {
				label : "Blue Mane Gypsy",
				type : "checkbox",
				"default" : false
			},
			foalbluepony : {
				label : "Blue Pony",
				type : "checkbox",
				"default" : false 
			},
			foalblueponytail : {
				label : "Blue Ponytail",
				type : "checkbox",
				"default" : false
			},
			foalbreton : {
				label : "Breton",
				type : "checkbox",
				"default" : false
			},
			foalbrown : {
				label : "Brown",
				type : "checkbox",
				"default" : false
			},
			foalbrowngypsy : {
				label : "Brown Gypsy",
				type : "checkbox",
				"default" : false
			},
			foalbrownpintomini : {
				label : "Brown Pinto Mini",
				type : "checkbox",
				"default" : false
			},
			foalbrumby : {
				label : "Brumby",
				type : "checkbox",
				"default" : false
			},
			foalbuckskin : {
				label : "Buckskin",
				type : "checkbox",
				"default" : false
			},
			foalbuckskinmini : {
				label : "Buckskin Mini",
				type : "checkbox",
				"default" : false
			},
			foalbutterfly : {
				label : "Butterfly",
				type : "checkbox",
				"default" : false
			},
			foalcamargue : {
				label : "Camargue",
				type : "checkbox",
				"default" : false
			},
			foalcamarillo : {
				label : "Camarillo",
				type : "checkbox",
				"default" : false
			},
			foalcandycane : {
				label : "Candy Cane",
				type : "checkbox",
				"default" : false
			},
			foalcandycaneunicorn : {
				label : "Candycane Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalcandycorn : {
				label : "Candy Corn",
				type : "checkbox",
				"default" : false
			},
			foalcandycornpegasus : {
				label : "Candy Corn Pegasus",
				type : "checkbox",
				"default" : false
			},
			foalcandycornstallion : {
				label : "Candy Corn Stallion",
				type : "checkbox",
				"default" : false
			},
			foalcandycornunicorn : {
				label : "Candy Corn Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalcarnival : {
				label : "Carnival",
				type : "checkbox",
				"default" : false
			},
			foalcharro : {
				label : "Charro",
				type : "checkbox",
				"default" : false
			},
			foalchestnutministallion : {
				label : "Chestnut Mini Stallion",
				type : "checkbox",
				"default" : false
			},
			foalchrome : {
				label : "Chrome",
				type : "checkbox",
				"default" : false
			},
			foalchromepegasus : {
				label : "Chrome Pegasus",
				type : "checkbox",
				"default" : false
			},
			foalclevelandbay : {
				label : "Cleveland Bay",
				type : "checkbox",
				"default" : false
			},
			foalcloverunicorn : {
				label : "Clover Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalclown : {
				label : "Clown",
				type : "checkbox",
				"default" : false
			},
			foalclydesdale : {
				label : "Clydesdale",
				type : "checkbox",
				"default" : false
			},
			foalclydesdalestallion : {
				label : "Clydesdale Stallion",
				type : "checkbox",
				"default" : false
			},
			foalcomtois : {
				label : "Comtois",
				type : "checkbox",
				"default" : false
			},
			foalconnemarapony : {
				label : "Connemara Pony",
				type : "checkbox",
				"default" : false
			},			
			foalcreamdraft : {
				label : "Cream Draft",
				type : "checkbox",
				"default" : false
			},
			foalcreammini : {
				label : "Cream Mini",
				type : "checkbox",
				"default" : false
			},
			foalcreamstallion : {
				label : "Cream Stallion",
				type : "checkbox",
				"default" : false
			},
			foaldalespony : {
				label : "Dales Pony",
				type : "checkbox",
				"default" : false
			},
			foaldapplegray : {
				label : "Dapplegray",
				type : "checkbox",
				"default" : false
			},
			foaldartmoorpony : {
				label : "Dartmoor Pony",
				type : "checkbox",
				"default" : false
			},
			foaldisco : {
				label : "Disco",
				type : "checkbox",
				"default" : false
			},
			foaldonkey : {
				label : "Donkey",
				type : "checkbox",
				"default" : false
			},
			foaldraft : {
				label : "Draft",
				type : "checkbox",
				"default" : false
			},
			foaleriskaypony : {
				label : "Eriskay Pony",
				type : "checkbox",
				"default" : false
			},
			foalexmoorpony : {
				label : "Exmoor Pony",
				type : "checkbox",
				"default" : false
			},
			foalfairy : {
				label : "Fairy",
				type : "checkbox",
				"default" : false
			},
			foalfairymini : {
				label : "Fairy Mini",
				type : "checkbox",
				"default" : false
			},
			foalfairypink : {
				label : "Fairy Pink",
				type : "checkbox",
				"default" : false
			},
			foalfairypony : {
				label : "Fairy Pony",
				type : "checkbox",
				"default" : false
			},
			foalfairyunicorn : {
				label : "Fairy Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalfalabella : {
				label : "Falabella",
				type : "checkbox",
				"default" : false
			},
			foalfireskeleton : {
				label : "Fire Skeleton",
				type : "checkbox",
				"default" : false
			},
			foalfjord : {
				label : "Fjord",
				type : "checkbox",
				"default" : false
			},
			foalflowered : {
				label : "Flowered",
				type : "checkbox",
				"default" : false
			},
			foalforest : {
				label : "Forest",
				type : "checkbox",
				"default" : false
			},
			foalfrenchmini : {
				label : "French Mini",
				type : "checkbox",
				"default" : false
			},
			foalfrenchpercheron : {
				label : "French Percheron",
				type : "checkbox",
				"default" : false
			},
			foalfrenchunicorn : {
				label : "French Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalfriesianstallion : {
				label : "Friesian Stallion",
				type : "checkbox",
				"default" : false
			},
			foalgaliceno : {
				label : "Galiceno",
				type : "checkbox",
				"default" : false
			},
			foalglowskeleton : {
				label : "Glow Skeleton",
				type : "checkbox",
				"default" : false
			},
			foalgoldenmini : {
				label : "Golden Mini",
				type : "checkbox",
				"default" : false
			},
			foalgoldenpony : {
				label : "Golden Pony",
				type : "checkbox",
				"default" : false
			},
			foalgoldenstallion : {
				label : "Golden Stallion",
				type : "checkbox",
				"default" : false
			},
			foalgreen : {
				label : "Green",
				type : "checkbox",
				"default" : false
			},
			foalgrey : {
				label : "Grey",
				type : "checkbox",
				"default" : false
			},
			foalgypsy : {
				label : "Gypsy",
				type : "checkbox",
				"default" : false
			},
			foalgypsystallion : {
				label : "Gypsy Stallion",
				type : "checkbox",
				"default" : false
			},
			foalhackney : {
				label : "Hackney",
				type : "checkbox",
				"default" : false
			},
			foalhackneypalominopony : {
				label : "Hackney Palomino Pony",
				type : "checkbox",
				"default" : false
			},
			foalhaflinger : {
				label : "Haflinger",
				type : "checkbox",
				"default" : false
			},
			foalhanoverian : {
				label : "Hanoverian",
				type : "checkbox",
				"default" : false
			},
			foalharvest : {
				label : "Harvest",
				type : "checkbox",
				"default" : false
			},
			foalharvestpony : {
				label : "Harvest Pony",
				type : "checkbox",
				"default" : false
			},
			foalhighkick : {
				label : "High Kick",
				type : "checkbox",
				"default" : false
			},
			foalicelandic : {
				label : "Icelandic",
				type : "checkbox",
				"default" : false
			},
			foalirishcob : {
				label : "Irish Cob",
				type : "checkbox",
				"default" : false
			},
			foalirishhunter : {
				label : "Irish Hunter",
				type : "checkbox",
				"default" : false
			},
			foalladygagaunicorn : {
				label : "Lady Gaga Unicorn",
				type : "checkbox",
				"default" : false
			},
			foallavenderpegasus : {
				label : "Lavender Pegasus",
				type : "checkbox",
				"default" : false
			},
			foalking : {
				label : "King",
				type : "checkbox",
				"default" : false
			},
			foalknight : {
				label : "Knight",
				type : "checkbox",
				"default" : false
			},
			foalmaremmano : {
				label : "Maremmano",
				type : "checkbox",
				"default" : false
			},
			foalmerenspony : {
				label : "Merens Pony",
				type : "checkbox",
				"default" : false
			},
			foalmexicanunicorn : {
				label : "Mexican Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalminibat : {
				label : "Mini Bat",
				type : "checkbox",
				"default" : false
			},
			foalminibluegypsy : {
				label : "Mini Blue Gypsy",
				type : "checkbox",
				"default" : false
			},
			foalminicandycane : {
				label : "Mini Candycane",
				type : "checkbox",
				"default" : false
			},
			foalminicandycorn : {
				label : "Mini Candy Corn",
				type : "checkbox",
				"default" : false
			},
			foalminidonkey : {
				label : "Mini Donkey",
				type : "checkbox",
				"default" : false
			},
			foalminiparty : {
				label : "Mini Party",
				type : "checkbox",
				"default" : false
			},
			foalminipegasus : {
				label : "Mini Pegasus",
				type : "checkbox",
				"default" : false
			},
			foalminizebrapegasus : {
				label : "Mini Zebra Pegasus",
				type : "checkbox",
				"default" : false
			},
			foalminiature : {
				label : "Miniature",
				type : "checkbox",
				"default" : false
			},
			foalmistletoedonkey : {
				label : "Mistletoe Donkey",
				type : "checkbox",
				"default" : false
			},
			foalmongolian : {
				label : "Mongolian",
				type : "checkbox",
				"default" : false
			},
			foalmorgan : {
				label : "Morgan",
				type : "checkbox",
				"default" : false
			},
			foalmorganstallion : {
				label : "Morgan Stallion",
				type : "checkbox",
				"default" : false
			},
			foalmule : {
				label : "Mule",
				type : "checkbox",
				"default" : false
			},
			foalmustang : {
				label : "Mustang",
				type : "checkbox",
				"default" : false 
			},
			foalnewenglandpinto : {
				label : "New England Pinto",
				type : "checkbox",
				"default" : false
			},
			foalnewforestpony : {
				label : "New Forest Pony",
				type : "checkbox",
				"default" : false
			},
			foalnewyear : {
				label : "New Year",
				type : "checkbox",
				"default" : false
			},
			foalnightmare : {
				label : "Nightmare",
				type : "checkbox",
				"default" : false,
				title : "[mini] nightmare (10/2010) and nightmare [stallion] (10/2011) foals"
			},
			foalnightmareminipegasus : {
				label : "Nightmare Mini Pegasus",
				type : "checkbox",
				"default" : false
			},
			foalnightmarepegasus : {
				label : "Nightmare Pegasus",
				type : "checkbox",
				"default" : false
			},
			foalnightmarepony : {
				label : "Nightmare Pony",
				type : "checkbox",
				"default" : false
			},
			foalnightmarestallion : {
				label : "Nightmare Stallion",
				type : "checkbox",
				"default" : false
			},
			foalnightmareunicorn : {
				label : "Nightmare Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalpaint : {
				label : "Paint",
				type : "checkbox",
				"default" : false
			},
			foalpalouse : {
				label : "Palouse",
				type : "checkbox",
				"default" : false
			},
			foalparty : {
				label : "Party",
				type : "checkbox",
				"default" : false
			},
			foalpegasus : {
				label : "Pegasus",
				type : "checkbox",
				"default" : false
			},
			foalpercheron : {
				label : "Percheron",
				type : "checkbox",
				"default" : false
			},
			foalperuvian : {
				label : "Peruvian",
				type : "checkbox",
				"default" : false
			},
			foalpinkgypsy : {
				label : "Pink Gypsy",
				type : "checkbox",
				"default" : false
			},
			foalpinkpony : {
				label : "Pink Pony",
				type : "checkbox",
				"default" : false 
			},
			foalpinkponytail : {
				label : "Pink Ponytail",
				type : "checkbox",
				"default" : false
			},
			foalpinksaddled : {
				label : "Pink Saddled",
				type : "checkbox",
				"default" : false
			},
			foalpinkstallion : {
				label : "Pink Stallion",
				type : "checkbox",
				"default" : false
			},
			foalpinkunicorn : {
				label : "Pink Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalpinto : {
				label : "Pinto",
				type : "checkbox",
				"default" : false
			},
			foalpintomini : {
				label : "Pinto Mini",
				type : "checkbox",
				"default" : false
			},
			foalpintopony : {
				label : "Pinto Pony",
				type : "checkbox",
				"default" : false 
			},
			foalpony : {
				label : "Pony",
				type : "checkbox",
				"default" : false 
			},
			foalpottokpony : {
				label : "Pottok Pony",
				type : "checkbox",
				"default" : false
			},
			foalpseudocorn : {
				label : "Pseudocorn",
				type : "checkbox",
				"default" : false
			},
			foalpumpkin : {
				label : "Pumpkin",
				type : "checkbox",
				"default" : false
			},
			foalpurplebedazzled : {
				label : "Purple Bedazzled",
				type : "checkbox",
				"default" : false
			},
			foalpurplemini : {
				label : "Purple Mini",
				type : "checkbox",
				"default" : false
			},
			foalpurpleminiunicorn : {
				label : "Purple Mini Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalpurplepony : {
				label : "Purple Pony",
				type : "checkbox",
				"default" : false 
			},
			foalpurpleponytail : {
				label : "Purple Ponytail",
				type : "checkbox",
				"default" : false
			},
			foalpurplestallion : {
				label : "Purple Stallion",
				type : "checkbox",
				"default" : false
			},
			foalpurpleunicorn : {
				label : "Purple Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalquarter : {
				label : "Quarter",
				type : "checkbox",
				"default" : false
			},
			foalrainbowmini : {
				label : "Rainbow Mini",
				type : "checkbox",
				"default" : false
			},
			foalrainbowpony : {
				label : "Rainbow Pony",
				type : "checkbox",
				"default" : false
			},
			foalrainbowstallion : {
				label : "Rainbow Stallion",
				type : "checkbox",
				"default" : false
			},
			foalred : {
				label : "Red",
				type : "checkbox",
				"default" : false
			},
			foalredpinto : {
				label : "Red Pinto",
				type : "checkbox",
				"default" : false
			},
			foalreitpony : {
				label : "Reitpony",
				type : "checkbox",
				"default" : false
			},
			foalroyal : {
				label : "Royal",
				type : "checkbox",
				"default" : false
			},
			foalroyalsteed : {
				label : "Royal Steed",
				type : "checkbox",
				"default" : false
			},
			foalsaddle : {
				label : "Saddle",
				type : "checkbox",
				"default" : false
			},
			foalshamrockpony : {
				label : "Shamrock Pony",
				type : "checkbox",
				"default" : false
			},
			foalshetlandpony : {
				label : "Shetland Pony",
				type : "checkbox",
				"default" : false
			},
			foalshire : {
				label : "Shire",
				type : "checkbox",
				"default" : false
			},
			foalsilver : {
				label : "Silver Pony",
				type : "checkbox",
				"default" : false 
			},
			foalskeleton : {
				label : "Skeleton",
				type : "checkbox",
				"default" : false
			},
			foalskeletonunicorn : {
				label : "Skeleton Unicorn",
				type : "checkbox",
				"default" : false
			},			
			foalsmallirishcob : {
				label : "Small Irish Cob",
				type : "checkbox",
				"default" : false
			},
			foalsnowstallion : {
				label : "Snow Stallion",
				type : "checkbox",
				"default" : false
			},
			foalspectator : {
				label : "Spectator",
				type : "checkbox",
				"default" : false
			},
			foalspottedappaloosa : {
				label : "Spotted Appaloosa",
				type : "checkbox",
				"default" : false
			},
			foalstallionmini : {
				label : "Stallion Mini",
				type : "checkbox",
				"default" : false
			},
			foalstandardbred : {
				label : "Standardbred",
				type : "checkbox",
				"default" : false
			},
			foalsuffolk : {
				label : "Suffolk",
				type : "checkbox",
				"default" : false
			},
			foalswisswarmblood : {
				label : "Swiss Warmblood",
				type : "checkbox",
				"default" : false
			},
			foaltennessee : {
				label : "Tennessee",
				type : "checkbox",
				"default" : false
			},
			foalthoroughbred : {
				label : "Thoroughbred",
				type : "checkbox",
				"default" : false
			},
			foaltrakehner : {
				label : "Trakehner",
				type : "checkbox",
				"default" : false
			},
			foaltrotterstallion : {
				label : "Trotter Stallion",
				type : "checkbox",
				"default" : false
			},
			foalvalentine : {
				label : "Valentine",
				type : "checkbox",
				"default" : false
			},
			foalvalentinemini : {
				label : "Valentine Mini",
				type : "checkbox",
				"default" : false
			},
			foalvineyard : {
				label : "Vineyard",
				type : "checkbox",
				"default" : false
			},
			foalvineyardmini : {
				label : "Vineyard Mini",
				type : "checkbox",
				"default" : false
			},
			foalwalkingpony : {
				label : "Walking Pony",
				type : "checkbox",
				"default" : false
			},
			foalwelsh : {
				label : "Welsh",
				type : "checkbox",
				"default" : false
			},
			foalwhite : {
				label : "White",
				type : "checkbox",
				"default" : false
			},
			foalwhiteandalusian : {
				label : "White Andalusian",
				type : "checkbox",
				"default" : false
			},
			foalwhiteminiunicorn : {
				label : "White Mini Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalwhitemustang : {
				label : "White Mustang",
				type : "checkbox",
				"default" : false
			},
			foalwhitepegasus : {
				label : "White Pegasus",
				type : "checkbox",
				"default" : false
			},
			foalwhiteshire : {
				label : "White Shire",
				type : "checkbox",
				"default" : false
			},
			foalwhitethoroughbred : {
				label : "White Thoroughbred",
				type : "checkbox",
				"default" : false
			},		
			foalwhiteunicorn : {
				label : "White Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalwingedunicorn : {
				label : "Winged Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalyakutpony : {
				label : "Yakut Pony",
				type : "checkbox",
				"default" : false
			},
			foalyellowunicorn : {
				label : "Yellow Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalzebraunicorn : {
				label : "Zebra Unicorn",
				type : "checkbox",
				"default" : false
			},
			foalzesty : {
				label : "Zesty",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			goatmouflon : {
				label : "Mouflon",
				type : "checkbox",
				"default" : false
			},
			goatred : {
				label : "Red",
				type : "checkbox",
				"default" : false
			},
			goatredtoggenburg : {
				label : "Red Toggenburg",
				type : "checkbox",
				"default" : false
			}
		}
	},
	horsesepartor : {
		label : "Horses",
		type : "separator"
	},
	horse : {
		label : "Brown Horse",
		type : "checkbox",
		"default" : false,
		kids : {
			ponyblack : {
				label : "Black Pony",
				type : "checkbox",
				"default" : false
			},
			horsecreamdraft : {
				label : "Cream Draft",
				type : "checkbox",
				"default" : false
			},
			horsegray : {
				label : "Gray",
				type : "checkbox",
				"default" : false
			},
			horsered : {
				label : "Red",
				type : "checkbox",
				"default" : false
			},
			horseredpinto : {
				label : "Red Pinto",
				type : "checkbox",
				"default" : false
			},
			whitemustang : {
				label : "White Mustang",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			catblacktabby : {
				label : "Black Tabby",
				type : "checkbox",
				"default" : false
			},
			kittyhimalayan : {
				label : "Himalayan",
				type : "checkbox",
				"default" : false
			},
			catpersian : {
				label : "Persian",
				type : "checkbox",
				"default" : false
			},
			kittywhite : {
				label : "White",
				type : "checkbox",
				"default" : false
			}
		}
	},
	lambseparator : {
		label : "Lambs",
		type : "separator"
	},
	lamb : {
		label : "Lamb (Sheep Pen)",
		type : "checkbox",
		"default" : false,
		kids : {
			lambbrown : {
				label : "Brown",
				type : "checkbox",
				"default" : false
			},
			pinklamb : {
				label : "Pink",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			llamaponcho : {
				label : "Poncho",
				type : "checkbox",
				"default" : false
			},
			llamawhite : {
				label : "White",
				type : "checkbox",
				"default" : false
			}
		}
	},
	mysteryanimalseparator : {
		label : "Mystery Babies",
		type : "separator"
	},
	wildlifebabycommon : {
		label : "Common Wildlife Baby",
		type : "checkbox",
		"default" : false,
		kids : {
			wildlifebabyrare : {
				label : "Rare Wildlife Baby",
				type : "checkbox",
				"default" : false
			}
		}
	},
	mysterybabycommon : {
		label : "Common Mystery Baby",
		type : "checkbox",
		"default" : false,
		kids : {
			mysterybabyrare : {
				label : "Rare Mystery Baby",
				type : "checkbox",
				"default" : false
			}
		}
	},
	zoobabycommon : {
		label : "Common Zoo Baby",
		type : "checkbox",
		"default" : false,
		kids : {
			zoobabyrare : {
				label : "Rare Zoo Baby",
				type : "checkbox",
				"default" : false
			}
		}
	},
	eggcommon : {
		label : "Common Egg",
		type : "checkbox",
		"default" : false,
		kids : {
			eggrare : {
				label : "Rare Egg",
				type : "checkbox",
				"default" : false
			}
		}
	},
	livestockcommon : {
		label : "Common Livestock",
		type : "checkbox",
		"default" : false,
		kids :{
			livestockrare : {
				label : "Rare Livestock",
				type : "checkbox",
				"default" : false
			}
		}
	},
	pigseparator : {
		label : "Pigs",
		type : "separator"
	},
	piglet : {
		label : "Piglet (Pig Pen)",
		type : "checkbox",
		"default" : false,
		kids : {
			pig : {
				label : "Normal",
				type : "checkbox",
				"default" : false
			},
			boar : {
				label : "Boar",
				type : "checkbox",
				"default" : false
			},
			pigblack : {
				label : "Black",
				type : "checkbox",
				"default" : false
			},
			pighotpink : {
				label : "Hot Pink",
				type : "checkbox",
				"default" : false
			},
			pigossabaw : {
				label : "Ossabaw",
				type : "checkbox",
				"default" : false
			},
			pigpinkpotbelly : {
				label : "Pink Pot Belly",
				type : "checkbox",
				"default" : false
			},
			pigstrawberry : {
				label : "Strawberry",
				type : "checkbox",
				"default" : false
			},
			pigwhite : {
				label : "White",
				type : "checkbox",
				"default" : false
			},
			sowyellow : {
				label : "Yellow",
				type : "checkbox",
				"default" : false
			}
		}
	},
	rabbitseparator : {
		label : "Rabbits",
		type: "separator"
	},
	rabbitblack : {
		label : "Black",
		type : "checkbox",
		"default" : false,
		kids : {
			rabbitclover : {
				label : "Clover",
				type : "checkbox",
				"default" : false
			},
			dutchrabbit : {
				label : "Dutch",
				type : "checkbox",
				"default" : false
			},
			rabbitenglishspot : {
				label : "English Spot",
				type : "checkbox",
				"default" : false
			},
			rabbit : {
				label : "White",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			sheepmouflon : {
				label : "Mouflon",
				type : "checkbox",
				"default" : false
			},
			sheeppolkadots : {
				label : "Polka Dots",
				type : "checkbox",
				"default" : false
			},
			sheepred : {
				label : "Red",
				type : "checkbox",
				"default" : false
			},
			sheep : {
				label : "White",
				type : "checkbox",
				"default" : false
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
		"default" : false,
		kids : {
			turkeybaby : {
				label : "Baby",
				type : "checkbox",
				"default" : false
			},
			turkeywhite : {
				label : "White",
				type : "checkbox",
				"default" : false
			}
		}
	},
	reindeerseparator : {
		label : "Reindeer",
		type : "separator"
	},
	reindeer : {
		label : "Normal",
		type : "checkbox",
		"default" : false,
		kids : {
			reindeerclumsy : {
				label : "Clumsy",
				type : "checkbox",
				"default" : false
			}
		}
	},
	yaksection : {
		label : "Yaks",
		type : "separator"
	},
	yakbaby : {
		label : "Baby",
		type : "checkbox",
		"default" : false,
		kids : {
			yakblackbaby : {
				label : "Black Baby",
				type : "checkbox",
				"default" : false
			},
			yakgraybaby : {
				label : "Gray Baby",
				type : "checkbox",
				"default" : false
			}
		}
	},
	otheranimalsection : {
		label : "Other",
		type : "separator"
	},
	bull : {
		label : "Bulls",
		type : "checkbox",
		"default" : false,
		kids : {
			elephantbaby : {
				label : "Baby Elephants",
				type : "checkbox",
				"default" : false
			},
			goosefarm : {
				label : "Farm Goose",
				type : "checkbox",
				"default" : false
			},
			penguin : {
				label : "Penguins",
				type : "checkbox",
				"default" : false
			},
			porcupine : {
				label : "Porcupine",
				type : "checkbox",
				"default" : false
			},
			raccoon : {
				label : "Raccoon",
				type : "checkbox",
				"default" : false
			},
			ram : {
				label : "Rams",
				type : "checkbox",
				"default" : false
			},
			turtle : {
				label : "Turtles",
				type : "checkbox",
				"default" : false
			},
			whitegoose : {
				label : "White Goose",
				type : "checkbox",
				"default" : false
			},
			buckwhitetailed : {
				label : "White-tailed Bucks",
				type : "checkbox",
				"default" : false
			}
		}
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
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
				}
			}
		}
	},
	seedmainseparator : {
		section : [ "Seeds" ],
		label : "Master Option for Seeds",
		type : "separator"
	},
	seedmain : {
		label : "Enable Seeds",
		type : "checkbox",
		"default" : true
	},
	crossbredseparator : {
		label : "Crossbred Seeds",
		type : "separator"
	},
	doublegrain : {
		label : "Double Grain",
		type : "checkbox",
		"default" : false,
		kids : {
			firepepper : {
				label : "Fire Pepper",
				type : "checkbox",
				"default" : false
			},
			lilacdaffy : {
				label : "Lilac Daffy",
				type : "checkbox",
				"default" : false
			},
			longonion : {
				label : "Long Onion",
				type : "checkbox",
				"default" : false
			},
			purpletomato : {
				label : "Purple Tomato",
				type : "checkbox",
				"default" : false
			},
			redspinach : {
				label : "Red Spinach",
				type : "checkbox",
				"default" : false
			},
			squmpkin : {
				label : "Squmpkin",
				type : "checkbox",
				"default" : false
			},
			straspberry : {
				label : "Straspberry",
				type : "checkbox",
				"default" : false
			},
			sunpoppy : {
				label : "Sun Poppy",
				type : "checkbox",
				"default" : false
			},
			whiskypeat : {
				label : "Whisky Peat",
				type : "checkbox",
				"default" : false
			}
		}
	},
	seedfruits : {
		label : "Pollinated Seeds / Fruits",
		type : "separator"
	},
	seedbellpeppers : {
		label : "Bell Pepper",
		type : "checkbox",
		"default" : false,
		kids : {
			seedblackberries : {
				label : "Black Berry",
				type : "checkbox",
				"default" : false
			},
			seedblueberries : {
				label : "Blueberry",
				type : "checkbox",
				"default" : false
			},
			seedcranberries : {
				label : "Cranberry",
				type : "checkbox",
				"default" : false
			},
			seedeggplant : {
				label : "Eggplant",
				type : "checkbox",
				"default" : false
			},
			seedelderberries : {
				label : "Elderberry",
				type : "checkbox",
				"default" : false
			},
			seedfirepepper : {
				label : "Fire Pepper",
				type : "checkbox",
				"default" : false
			},
			seedghostchili : {
				label : "Ghost Chili",
				type : "checkbox",
				"default" : false
			},
			seedgojiberry : {
				label : "Goji Berry",
				type : "checkbox",
				"default" : false
			},
			seedgrapes : {
				label : "Grape",
				type : "checkbox",
				"default" : false
			},			
			seedjalapenos : {
				label : "Jalapenos",
				type : "checkbox",
				"default" : false
			},
			seedleeks : {
				label : "Leeks",
				type : "checkbox",
				"default" : false
			},
			seedpeppers : {
				label : "Pepper",
				type : "checkbox",
				"default" : false
			},
			seedpineapples : {
				label : "Pineapple",
				type : "checkbox",
				"default" : false
			},
			seedpurpletomatoes : {
				label : "Purple Tomato",
				type : "checkbox",
				"default" : false
			},
			seedraspberries : {
				label : "Raspberry",
				type : "checkbox",
				"default" : false
			},
			seedsquaremelon : {
				label : "Square Melon",
				type : "checkbox",
				"default" : false
			},
			seedstraspberry : {
				label : "Straspberry",
				type : "checkbox",
				"default" : false
			},
			seedstrawberries : {
				label : "Strawberry",
				type : "checkbox",
				"default" : false
			},
			seedtomatoes : {
				label : "Tomato",
				type : "checkbox",
				"default" : false
			},
			seedwatermelon : {
				label : "Watermelon",
				type : "checkbox",
				"default" : false
			},
			seedwhitegrapes : {
				label : "White Grape",
				type : "checkbox",
				"default" : false
			},
			seedyellowmelon : {
				label : "Yellow Melon",
				type : "checkbox",
				"default" : false
			}
		}
	},
	seedvegetables : {
		label : "Vegetables",
		type : "separator"
	},
	seedacornsquash : {
		label : "Acorn Squash",
		type : "checkbox",
		"default" : false,
		kids : {
			seedartichokes : {
				label : "Artichoke",
				type : "checkbox",
				"default" : false
			},
			seedasparagus : {
				label : "Asparagus",
				type : "checkbox",
				"default" : false
			},
			seedbroccoli : {
				label : "Broccoli",
				type : "checkbox",
				"default" : false
			},
			seedcabbage : {
				label : "Cabbage",
				type : "checkbox",
				"default" : false
			},
			seedcarnivalsquash : {
				label : "Carnival Squash",
				type : "checkbox",
				"default" : false
			},
			seedcarrots : {
				label : "Carrot",
				type : "checkbox",
				"default" : false
			},
			seedchickpea : {
				label : "Chickpea",
				type : "checkbox",
				"default" : false
			},
			seedcucumber : {
				label : "Cucumber",
				type : "checkbox",
				"default" : false
			},
			seedheirloomcarrot : {
				label : "Heirloom Carrot",
				type : "checkbox",
				"default" : false
			},
			seedlongonion : {
				label : "Long Onion",
				type : "checkbox",
				"default" : false
			},
			seedonion : {
				label : "Onion",
				type : "checkbox",
				"default" : false
			},
			seedpattypansquash : {
				label : "Pattypan Squash",
				type : "checkbox",
				"default" : false
			},
			seedpeas : {
				label : "Peas",
				type : "checkbox",
				"default" : false
			},
			seedpotatoes : {
				label : "Potato",
				type : "checkbox",
				"default" : false
			},
			seedpumpkins : {
				label : "Pumpkin",
				type : "checkbox",
				"default" : false
			},
			seedpurpleasparagus : {
				label : "Purple Asparagus",
				type : "checkbox",
				"default" : false
			},
			seedpurplepodpea : {
				label : "Purple Pod Peas",
				type : "checkbox",
				"default" : false
			},
			seedredspinach : {
				label : "Red Spinach",
				type : "checkbox",
				"default" : false
			},
			seedrhubarb : {
				label : "Rhubarb",
				type : "checkbox",
				"default" : false
			},
			seedspinach : {
				label : "Spinach",
				type : "checkbox",
				"default" : false
			},
			seedsoybeans : {
				label : "Soybean",
				type : "checkbox",
				"default" : false
			},
			seedsquash : {
				label : "Squash",
				type : "checkbox",
				"default" : false
			},
			seedsqumpkin : {
				label : "Squmpkin",
				type : "checkbox",
				"default" : false
			},
			seedwhitepumpkin : {
				label : "White Pumpkin",
				type : "checkbox",
				"default" : false
			},
			seedzucchini : {
				label : "Zucchini",
				type : "checkbox",
				"default" : false
			}
		}
	},
	seedgrains : {
		label : "Grains",
		type : "separator"
	},
	seedamaranth : {
		label : "Amaranth",
		type : "checkbox",
		"default" : false,
		kids : {
			seedcorn : {
				label : "Corn",
				type : "checkbox",
				"default" : false
			},
			seeddoublegrain : {
				label : "Double Grain",
				type : "checkbox",
				"default" : false
			},
			seedoats : {
				label : "Oats",
				type : "checkbox",
				"default" : false
			},
			seedposolecorn : {
				label : "Posole Corn",
				type : "checkbox",
				"default" : false
			},
			seedredwheat : {
				label : "Red Wheat",
				type : "checkbox",
				"default" : false
			},
			seedrice : {
				label : "Rice",
				type : "checkbox",
				"default" : false
			},
			seedrye : {
				label : "Rye",
				type :  "checkbox",
				"default" : false
			},
			seedwheat : {
				label : "Wheat",
				type : "checkbox",
				"default" : false
			},
			seedwhiskypeat : {
				label : "Whisky Peat",
				type : "checkbox",
				"default" : false
			}
		}
	},
	seedflowers : {
		label : "Flowers",
		type : "separator"
	},
	seedblackrose : {
		label : "Black Rose",
		type : "checkbox",
		"default" : false,
		kids : {
			seedclover : {
				label : "Clover",
				type : "checkbox",
				"default" : false
			},
			seedcolumbine : {
				label : "Columbine",
				type : "checkbox",
				"default" : false
			},
			seeddaffodils : {
				label : "Daffodil",
				type : "checkbox",
				"default" : false
			},
			seedelectriclilies : {
				label : "Electric Lilies",
				type : "checkbox",
				"default" : false
			},
			seedforgetmenot : {
				label : "Forget Me Not",
				type : "checkbox",
				"default" : false
			},
			seedgladiolus : {
				label : "Gladiolus",
				type : "checkbox",
				"default" : false
			},
			seedgoldenpoppy : {
				label : "Golden Poppy",
				type : "checkbox",
				"default" : false
			},
			seediris : {
				label : "Iris",
				type : "checkbox",
				"default" : false
			},
			seedlavender : {
				label : "Lavender",
				type : "checkbox",
				"default" : false
			},
			seedlilac : {
				label : "Lilac",
				type : "checkbox",
				"default" : false
			},
			seedlilacdaffy : {
				label : "Lilac Daffy",
				type : "checkbox",
				"default" : false
			},
			seedlilies : {
				label : "Lily",
				type : "checkbox",
				"default" : false
			},
			seedmorningglory : {
				label : "Morning Glory",
				type : "checkbox",
				"default" : false
			},
			seedorangedaisies : {
				label : "Orange Daisies",
				type : "checkbox",
				"default" : false
			},
			seedpinkroses : {
				label : "Pink Rose",
				type : "checkbox",
				"default" : false
			},
			seedpurplepoppies : {
				label : "Purple Poppy",
				type : "checkbox",
				"default" : false
			},
			seedredtulips : {
				label : "Red Tulip",
				type : "checkbox",
				"default" : false
			},
			seedsaffron : {
				label : "Saffron",
				type : "checkbox",
				"default" : false
			},
			seedsunflowers : {
				label : "Sunflower",
				type : "checkbox",
				"default" : false
			},
			seedsunpoppy : {
				label : "Sun Poppy",
				type : "checkbox",
				"default" : false
			},
			seedwhitepoinsettia : {
				label : "White Poinsettia",
				type : "checkbox",
				"default" : false
			},
			seedwhiteroses : {
				label : "White Rose",
				type : "checkbox",
				"default" : false
			}
		}
	},
	seedother : {
		label : "Other",
		type : "separator"
	},
	seedaloevera : {
		label : "Aloe Vera",
		type : "checkbox",
		"default" : false,
		kids : {
			seedbamboo : {
				label : "Bamboo",
				type : "checkbox",
				"default" : false
			},
			seedbasil : {
				label : "Basil",
				type : "checkbox",
				"default" : false
			},
			seedcoffee : {
				label : "Coffee",
				type : "checkbox",
				"default" : false
			},
			seedcotton : {
				label : "Cotton",
				type : "checkbox",
				"default" : false
			},
			seedginger : {
				label : "Ginger",
				type : "checkbox",
				"default" : false
			},
			seedgreentea : {
				label : "Green Tea",
				type : "checkbox",
				"default" : false
			},
			seedlemonbalm : {
				label : "Lemon Balm",
				type : "checkbox",
				"default" : false
			},
			seedpeanuts : {
				label : "Peanut",
				type : "checkbox",
				"default" : false
			},
			seedpeppermint : {
				label : "Peppermint",
				type : "checkbox",
				"default" : false
			},
			seedsugarcane : {
				label : "Sugar Cane",
				type : "checkbox",
				"default" : false
			}
		}
	},
	seed : {
		label : "Get unknown seeds",
		type : "checkbox",
		"default" : false
	},
	checkallseed : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_7", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallseed : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_7", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
				}
			}
		}
	},
	craftingteamseparator : {
		section : [ "Bushels & Crafting" ],
		label : "Master Option Switch for Craftshop Teams",
		type : "separator"
	},
	jointeam : {
		label : "Join Craftshop Teams",
		type : "checkbox",
		"default" : false
	},
	craftshoprecipeseparator : {
		label : "Craftshop Team Recipes To Join (get random bushels)",
		type : "separator"
	},
	teamanimalfeed : {
		label : "Animal Feed",
		type : "checkbox",
		"default" : false,
		kids : {
			teamappleredharvester : {
				label : "Apple Red Harvester",
				type : "checkbox",
				"default" : false
			},
			teamappleredseeder : {
				label : "Apple Red Seeder",
				type : "checkbox",
				"default" : false
			},
			teamarborist : {
				label : "Arborist",
				type : "checkbox",
				"default" : false
			},
			teambeachball : {
				label : "Beach Ball",
				type : "checkbox",
				"default" : false
			},
			teambonsai : {
				label : "Bonsai",
				type : "checkbox",
				"default" : false
			},
			teambottle : {
				label : "Bottle",
				type : "checkbox",
				"default" : false
			},
			teambrick : {
				label : "Brick",
				type : "checkbox",
				"default" : false
			},
			teambrightyellowtractor : {
				label : "Bright Yellow Tractor",
				type : "checkbox",
				"default" : false
			},
			teamcastlebridge : {
				label : "Castle Bridge",
				type : "checkbox",
				"default" : false
			},
			teamdaintyfence : {
				label : "Dainty Fence",
				type : "checkbox",
				"default" : false
			},
			teamdogtreat : {
				label : "Dog Treat",
				type : "checkbox",
				"default" : false
			},
			teamenglandpostcard : {
				label : "England Postcard",
				type : "checkbox",
				"default" : false
			},
			teamevergreentrain : {
				label : "Evergreen Train",
				type : "checkbox",
				"default" : false
			},
			teamfarmhand : {
				label : "Farmhand",
				type : "checkbox",
				"default" : false
			},
			teamfertilizeall : {
				label : "Fertilize All",
				type : "checkbox",
				"default" : false
			},
			teamfuelcan : {
				label : "Fuel Can",
				type : "checkbox",
				"default" : false
			},
			teamhorsesculpture : {
				label : "Horse Sculpture",
				type : "checkbox",
				"default" : false
			},
			teamironfence : {
				label : "Iron Fence",
				type : "checkbox",
				"default" : false
			},
			teamlamppost : {
				label : "Lamp Post",
				type : "checkbox",
				"default" : false
			},
			teamlovepotion : {
				label : "Love Potion",
				type : "checkbox",
				"default" : false
			},
			teamluckypenny : {
				label : "Lucky Penny",
				type : "checkbox",
				"default" : false
			},
			teammechanicscarecrow : {
				label : "Mechanic Scarecrow",
				type : "checkbox",
				"default" : false
			},
			teammilkingstool : {
				label : "Milking Stool",
				type : "checkbox",
				"default" : false
			},
			teammoati : {
				label : "Moat I",
				type : "checkbox",
				"default" : false
			},
			teammoatii : {
				label : "Moat II",
				type : "checkbox",
				"default" : false
			},
			teammoatiii : {
				label : "Moat III",
				type : "checkbox",
				"default" : false
			},
			teammoativ : {
				label : "Moat IV",
				type : "checkbox",
				"default" : false
			},
			teammoatcorneri : {
				label : "Moat Corner I",
				type : "checkbox",
				"default" : false
			},
			teammoatcornerii : {
				label : "Moat Corner II",
				type : "checkbox",
				"default" : false
			},
			teammoatcorneriii : {
				label : "Moat Corner III",
				type : "checkbox",
				"default" : false
			},
			teammoatcorneriv : {
				label : "Moat Corner IV",
				type : "checkbox",
				"default" : false
			},
			teammoderntable : {
				label : "Modern Table",
				type : "checkbox",
				"default" : false
			},
			teamnail : {
				label : "Nail",
				type : "checkbox",
				"default" : false
			},
			teampinefencei : {
				label : "Pine Fence I",
				type : "checkbox",
				"default" : false
			},
			teampinefenceii : {
				label : "Pine Fence II",
				type : "checkbox",
				"default" : false
			},
			teampostoffice : {
				label : "Post Office",
				type : "checkbox",
				"default" : false
			},
			teampuppykibble : {
				label : "Puppy Kibble",
				type : "checkbox",
				"default" : false
			},
			teamscythe : {
				label : "Scythe",
				type : "checkbox",
				"default" : false
			},
			teamsheeptopiary : {
				label : "Sheep Topiary",
				type : "checkbox",
				"default" : false
			},
			teamshovel : {
				label : "Shovel",
				type : "checkbox",
				"default" : false
			},
			teamstonearchway : {
				label : "Stone Archway",
				type : "checkbox",
				"default" : false
			},
			teamstonewall : {
				label : "Stone Wall",
				type : "checkbox",
				"default" : false
			},
			teamswisscabin : {
				label : "Swiss Cabin",
				type : "checkbox",
				"default" : false
			},
			teamtreehouse : {
				label : "Tree House",
				type : "checkbox",
				"default" : false
			},
			teamvehiclepart : {
				label : "Vehicle Part",
				type : "checkbox",
				"default" : false
			},
			teamwateringcan : {
				label : "Watering Can",
				type : "checkbox",
				"default" : false
			},
			teamwoodenboard : {
				label : "Wooden Board",
				type : "checkbox",
				"default" : false
			},
			teamyellowracertractor : {
				label : "Yellow Racer Tractor",
				type : "checkbox",
				"default" : false
			}
		}
	},
	bushelmainseparator : {
		label : "Master Option Switch for Bushels",
		type : "separator"
	},
	bushelmain : {
		label : "Enable Bushels",
		type : "checkbox",
		"default" : true
	},
	specificcraftingseparator : {
		label : "Crafting Specific",
		type : "separator"
	},
	getwinery : {
		label : "Only Winery",
		type : "button",
		script : function() {
			var boxes = $g(".//input[@type='checkbox' and @id != 'field_bushelmain']", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
			for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
			var boxes = $g(".//input[@type='checkbox' and (@id='field_bushelrice' or @id='field_bushelcranberry' or @id='field_bushelwhitegrape' or @id='field_bushelsugarcane' or @id='field_bushelstrawberry' or @id='field_bushelgrape' or @id='field_bushelraspberry' or @id='field_bushelblueberry' or @id='field_busheltomato' or @id='field_bushelpepper' or @id='field_bushelcarrot' or @id='field_bushelgreentea' or @id='field_bushellilac' or @id='field_bushelblackberry' or @id='field_bushelbasil' or @id='field_bushelginger' or @id='field_bushelpumpkin' or @id='field_bushelacornsquash' or @id='field_bushelcucumber' or @id='field_bushelsquash' or @id='field_bushelpinkrose' or @id='field_bushellavender' or @id='field_bushelmorningglory' or @id='field_bushelsunflower' or @id='field_bushelyellowmelon' or @id='field_bushelwatermelon'or @id='field_bushelzinfandel' or @id='field_bushelcovecranberry' or @id='field_busheltarragon')]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
			for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			getbakery : {
				label : "Only Bakery",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
					var boxes = $g(".//input[@type='checkbox' and (@id='field_bushelpumpkin' or @id='field_bushelwheat' or @id='field_bushelstrawberry' or @id='field_bushelcarrot' or @id='field_bushelpepper' or @id='field_bushelghostchili' or @id='field_bushelpattypan' or @id='field_bushelonion' or @id='field_bushelrice' or @id='field_bushelblueberry' or @id='field_bushelblackberry' or @id='field_bushelraspberry' or @id='field_bushelpeanut' or @id='field_bushelsugarcane' or @id='field_bushelbroccoli' or @id='field_bushelasparagus' or @id='field_bushelpeas' or @id='field_bushelcoffee' or @id='field_busheloat' or @id='field_bushelcucumber' or @id='field_bushelbasil' or @id='field_bushelpepper' or @id='field_busheltomato' or @id='field_bushelginger' or @id='field_bushelpotato' or @id='field_bushelposolecorn' or @id='field_bushelredwheat' or @id='field_bushelsoybean' or @id='field_bushelcranberry'or @id='field_bushelchardonnay' or @id='field_bushelbuttersugarcorn' or @id='field_bushelcauliflower')]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			},
			getspa : {
				label : "Only Spa",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
					var boxes = $g(".//input[@type='checkbox' and (@id='field_bushelpumpkin' or @id='field_bushelcranberry' or @id='field_bushelsunflower' or @id='field_bushelblueberry' or @id='field_bushelmorningglory' or @id='field_bushelaloevera' or @id='field_bushelgreentea' or @id='field_bushelblackberry' or @id='field_bushellilac' or @id='field_bushelbasil' or @id='field_busheliris' or @id='field_bushelpepper' or @id='field_bushelredtulip' or @id='field_bushelghostchili' or @id='field_bushellily' or @id='field_bushellemonbalm' or @id='field_bushelginger' or @id='field_bushelcoffee' or @id='field_bushellavender' or @id='field_bushelpurplepoppy' or @id='field_busheldaffodil' or @id='field_bushelstrawberry' or @id='field_bushelpinkrose' or @id='field_bushelzinfandel' or @id='field_busheldaylily' or @id='field_busheldill')]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			},
			getpub : {
				label : "Only Pub",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
					var boxes = $g(".//input[@type='checkbox' and (@id='field_bushelbarley' or @id='field_bushelblacktea' or @id='field_bushelbluebells' or @id='field_bushelhops' or @id='field_bushelroyalhops' or @id='field_bushelenglishroses' or @id='field_bushelenglishpeas' or @id='field_bushelcornflower' or @id='field_bushelredcurrant' or @id='field_bushelspringsquill' or @id='field_bushelpinkasters' or @id='field_bushelchardonnay' or @id='field_bushelkennebecpotato' or @id='field_bushelradish' or @id='field_bushelturnips' or @id='field_busheldarrowblackberry')]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			},
			getcraftshop : {
				label : "Only Craftshop",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
					var boxes = $g(".//input[@type='checkbox' and (@id='field_bushelclam' or @id='field_busheltaragon' or @id='field_busheldill' or @id='field_bushelseafood' or @id='field_bushelkennebecpotato' or @id='field_bushelladyslipper' or @id='field_bushelchandlerblueberry' or @id='field_busheldaylily' or @id='field_bushellobster' or @id='field_bushelcauliflower' or @id='field_bushelcovecranberry' or @id='field_bushelhay' or @id='field_bushelredclover' or @id='field_bushelcotton' or @id='field_bushelsoybean' or @id='field_getcherrybasket' or @id='field_getmanurebag' or @id='field_bushelcarrot' or @id='field_bushelchickpea' or @id='field_getwoolbundle' or @id='field_getmilkjug' or @id='field_bushelwheat' or @id='field_bushelstrawberry' or @id='field_busheltomato' or @id='field_busheljalapenos' or @id='field_busheldoublegrain' or @id='field_getlemonbasket' or @id='field_getmaplesyrupbasket' or @id='field_bushellilac' or @id='field_bushelpeanut' or @id='field_bushelmorningglory' or @id='field_getorangebasket' or @id='field_bushelcoffee' or @id='field_bushelsunflower' or @id='field_bushelbarley' or @id='field_getwalnutbasket' or @id='field_bushelaloevera' or @id='field_getapplewoodbasket' or @id='field_bushelblacktea' or @id='field_bushelspringsquill' or @id='field_bushelcornflower' or @id='field_bushelrice' or @id='field_bushelrye' or @id='field_bushelspinach' or @id='field_bushelpinkasters' or @id='field_bushelcranberry' or @id='field_bushelgrape' or @id='field_bushelrhubarb' or @id='field_bushelpattypan' or @id='field_bushelleeks' or @id='field_bushelfieldbeans')]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			},
			getrestraunt : {
				label : "Only Restraunt",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
					var boxes = $g(".//input[@type='checkbox' and (@id='field_busheldarrowblackberry' or @id='field_bushelchandlerblueberry' or @id='field_bushelstrawberry' or @id='field_bushelredclover' or @id='field_bushelhay' or @id='field_bushelrhubarb' or @id='field_bushelbuttersugarcorn' or @id='field_busheltarragon' or @id='field_bushelpepper' or @id='field_bushelwheat' or @id='field_bushelraspberry' or @id='field_bushelwhitegrape' or @id='field_bushelcovecranberry' or @id='field_bushelredcurrant')]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
				}
			},
			getnone : {
				label : "None",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
				}
			}
		}
	},
	basketseparator : {
		label : "Baskets",
		type : "separator"
	},
	getapplewoodbasket : {
		label : "Apple Wood Basket",
		type : "checkbox",
		"default" : false,
		kids : {
			getcherrybasket : {
				label : "Cherry Basket",
				type : "checkbox",
				"default" : false
			},
			getlemonbasket : {
				label : "Lemon Basket",
				type : "checkbox",
				"default" : false
			},
			getmanurebag : {
				label : "Manure Bag",
				type : "checkbox",
				"default" : false
			},
			getmaplesyrupbasket : {
				label : "Maple Syrup Basket",
				type : "checkbox",
				"default" : false
			},
			getmilkjug : {
				label : "Milk Jug",
				type : "checkbox",
				"default" : false
			},
			getorangebasket : {
				label : "Orange Basket",
				type : "checkbox",
				"default" : false
			},
			bushelpoplarwood : {
				label : "Poplar Wood Basket",
				type : "checkbox",
				"default" : false
			},
			getwalnutbasket : {
				label : "Walnut Basket",
				type : "checkbox",
				"default" : false
			},
			getwoolbundle : {
				label : "Wool Bundle",
				type : "checkbox",
				"default" : false
			}
		}
	},
	bushelfruits : {
		label : "Bushels / Fruits",
		type : "separator"
	},
	bushelbellpepper : {
		label : "Bell Pepper",
		type : "checkbox",
		"default" : false,
		kids : {
			bushelblackberry : {
				label : "Black Berry",
				type : "checkbox",
				"default" : false
			},
			bushelblueberry : {
				label : "Blueberry",
				type : "checkbox",
				"default" : false
			},
			bushelchandlerblueberry : {
				label : "Chandler Blueberry",
				type : "checkbox",
				"default" : false
			},
			bushelchardonnay : {
				label : "Chardonnay",
				type : "checkbox",
				"default" : false
			},
			bushelcovecranberry : {
				label : "Cove Cranberry",
				type : "checkbox",
				"default" : false
			},
			bushelcranberry : {
				label : "Cranberry",
				type : "checkbox",
				"default" : false
			},
			busheldarrowblackberry : {
				label : "Darrow Blackberry",
				type : "checkbox",
				"default" : false
			},
			busheleggplant : {
				label : "Eggplant",
				type : "checkbox",
				"default" : false
			},
			bushelelderberry : {
				label : "Elderberry",
				type : "checkbox",
				"default" : false
			},
			bushelfirepeppers : {
				label : "Fire Pepper",
				type : "checkbox",
				"default" : false
			},
			bushelghostchili : {
				label : "Ghost Chili",
				type : "checkbox",
				"default" : false
			},
			bushelgrape : {
				label : "Grape",
				type : "checkbox",
				"default" : false
			},			
			busheljalapenos : {
				label : "Jalapenos",
				type : "checkbox",
				"default" : false
			},
			bushelleeks : {
				label : "Leeks",
				type : "checkbox",
				"default" : false
			},
			bushelpepper : {
				label : "Pepper",
				type : "checkbox",
				"default" : false
			},
			bushelpineapple : {
				label : "Pineapple",
				type : "checkbox",
				"default" : false
			},
			bushelpurpletomatoes : {
				label : "Purple Tomato",
				type : "checkbox",
				"default" : false
			},
			bushelraspberry : {
				label : "Raspberry",
				type : "checkbox",
				"default" : false
			},
			bushelredcurrant : {
				label : "Red Currant",
				type : "checkbox",
				"default" : false
			},
			bushelsquaremelon : {
				label : "Square Melon",
				type : "checkbox",
				"default" : false
			},
			bushelstraspberry : {
				label : "Straspberry",
				type : "checkbox",
				"default" : false
			},
			bushelstrawberry : {
				label : "Strawberry",
				type : "checkbox",
				"default" : false
			},
			busheltomato : {
				label : "Tomato",
				type : "checkbox",
				"default" : false,
			},
			bushelwatermelon : {
				label : "Watermelon",
				type : "checkbox",
				"default" : false
			},
			bushelwhitegrape : {
				label : "White Grape",
				type : "checkbox",
				"default" : false
			},
			bushelyellowmelon : {
				label : "Yellow Melon",
				type : "checkbox",
				"default" : false
			},
			bushelzinfandel : {
				label : "Zinfandel",
				type : "checkbox",
				"default" : false
			}
		}
	},
	bushelvegetables : {
		label : "Vegetables",
		type : "separator"
	},
	bushelacornsquash : {
		label : "Acorn Squash",
		type : "checkbox",
		"default" : false,
		kids : {
			bushelartichoke : {
				label : "Artichoke",
				type : "checkbox",
				"default" : false
			},
			bushelasparagus : {
				label : "Asparagus",
				type : "checkbox",
				"default" : false
			},
			bushelbroccoli : {
				label : "Broccoli",
				type : "checkbox",
				"default" : false
			},
			bushelbuttersugarcorn : {
				label : "Butter & Sugar Corn",
				type : "checkbox",
				"default" : false
			},
			bushelcabbage : {
				label : "Cabbage",
				type : "checkbox",
				"default" : false
			},
			bushelcarapotatoes : {
				label : "Cara Potato",
				type : "checkbox",
				"default" : false
			},
			bushelcarnivalsquash : {
				label : "Carnival Squash",
				type : "checkbox",
				"default" : false
			},
			bushelcarrot : {
				label : "Carrot",
				type : "checkbox",
				"default" : false
			},
			bushelcauliflower : {
				label : "Cauliflower",
				type : "checkbox",
				"default" : false
			},
			bushelchickpea : {
				label : "Chickpea",
				type : "checkbox",
				"default" : false
			},
			bushelcucumber : {
				label : "Cucumber",
				type : "checkbox",
				"default" : false
			},
			bushelenglishpeas : {
				label : "English Peas",
				type : "checkbox",
				"default" : false
			},
			bushelfieldbeans : {
				label : "Field Beans",
				type : "checkbox",
				"default" : false
			},
			bushelheirloomcarrot : {
				label : "Heirloom Carrot",
				type : "checkbox",
				"default" : false
			},
			bushelkennebecpotato : {
				label : "Kennecbec Potato",
				type : "checkbox",
				"default" : false
			},
			bushellongonion : {
				label : "Long Onion",
				type : "checkbox",
				"default" : false
			},
			bushelonion : {
				label : "Onion",
				type : "checkbox",
				"default" : false
			},
			bushelpattypan : {
				label : "Pattypan Squash",
				type : "checkbox",
				"default" : false
			},
			bushelpeas : {
				label : "Peas",
				type : "checkbox",
				"default" : false
			},
			bushelpotato : {
				label : "Potato",
				type : "checkbox",
				"default" : false
			},
			bushelpumpkin : {
				label : "Pumpkin",
				type : "checkbox",
				"default" : false
			},
			bushelpurpleasparagus : {
				label : "Purple Asparagus",
				type : "checkbox",
				"default" : false
			},
			bushelpurplepodpeas : {
				label : "Purple Pod Peas",
				type : "checkbox",
				"default" : false
			},
			bushelradish : {
				label : "Radish",
				type : "checkbox",
				"default" : false
			},
			bushelredspinach : {
				label : "Red Spinach",
				type : "checkbox",
				"default" : false
			},
			bushelrhubarb : {
				label : "Rhubarb",
				type : "checkbox",
				"default" : false
			},
			bushelspinach : {
				label : "Spinach",
				type : "checkbox",
				"default" : false
			},
			bushelsoybean : {
				label : "Soybean",
				type : "checkbox",
				"default" : false
			},
			bushelsquash : {
				label : "Squash",
				type : "checkbox",
				"default" : false
			},
			bushelsqumpkin : {
				label : "Squmpkin",
				type : "checkbox",
				"default" : false
			},
			bushelturnips : {
				label : "Turnip",
				type : "checkbox",
				"default" : false
			},
			bushelzucchini : {
				label : "Zucchini",
				type : "checkbox",
				"default" : false
			}
		}
	},
	bushelgrains : {
		label : "Grains",
		type : "separator"
	},
	bushelamaranth : {
		label : "Amaranth",
		type : "checkbox",
		"default" : false,
		kids : {
			bushelbarley : {
				label : "Barley",
				type : "checkbox",
				"default" : false
			},
			bushelcorn : {
				label : "Corn",
				type : "checkbox",
				"default" : false
			},
			busheldoublegrain : {
				label : "Double Grain",
				type : "checkbox",
				"default" : false
			},
			bushelhops : {
				label : "Hops",
				type : "checkbox",
				"default" : false
			},
			busheloat : {
				label : "Oat",
				type : "checkbox",
				"default" : false
			},
			bushelposolecorn : {
				label : "Posole Corn",
				type : "checkbox",
				"default" : false
			},
			bushelredwheat : {
				label : "Red Wheat",
				type : "checkbox",
				"default" : false
			},
			bushelrice : {
				label : "Rice",
				type : "checkbox",
				"default" : false
			},
			bushelroyalhops : {
				label : "Royal Hops",
				type : "checkbox",
				"default" : false
			},
			bushelrye : {
				label : "Rye",
				type :  "checkbox",
				"default" : false
			},
			bushelwheat : {
				label : "Wheat",
				type : "checkbox",
				"default" : false
			},
			bushelwhiskypeat : {
				label : "Whisky Peat",
				type : "checkbox",
				"default" : false
			}
		}
	},
	bushelflowers : {
		label : "Flowers",
		type : "separator"
	},
	bushelbluebells : {
		label : "Bluebell",
		type : "checkbox",
		"default" : false,
		kids : {
			bushelclover : {
				label : "Clover",
				type : "checkbox",
				"default" : false
			},
			bushelcolumbine : {
				label : "Columbine",
				type : "checkbox",
				"default" : false
			},
			bushelcornflower : {
				label : "Cornflower",
				type : "checkbox",
				"default" : false
			},
			busheldaffodil : {
				label : "Daffodil",
				type : "checkbox",
				"default" : false
			},
			busehldaylily : {
				label : "Daylily",
				type : "checkbox",
				"default" : false
			},
			bushelelectriclilies : {
				label : "Electric Lily",
				type : "checkbox",
				"default" : false
			},
			bushelenglishroses : {
				label : "English Rose",
				type : "checkbox",
				"default" : false
			},
			bushelforgetmenot : {
				label : "Forget Me Not",
				type : "checkbox",
				"default" : false
			},
			bushelfoxglove : {
				label : "Foxglove",
				type : "checkbox",
				"default" : false
			},
			bushelgladiolus : {
				label : "Gladiolus",
				type : "checkbox",
				"default" : false
			},
			bushelgoldenpoppies : {
				label : "Golden Poppy",
				type : "checkbox",
				"default" : false
			},
			busheliris : {
				label : "Iris",
				type : "checkbox",
				"default" : false
			},
			bushelladyslipper : {
				label : "Lady Slipper",
				type : "checkbox",
				"default" : false
			},
			bushellavender : {
				label : "Lavender",
				type : "checkbox",
				"default" : false
			},
			bushellilac : {
				label : "Lilac",
				type : "checkbox",
				"default" : false
			},
			bushellilacdaffy : {
				label : "Lilac Daffy",
				type : "checkbox",
				"default" : false
			},
			bushellily : {
				label : "Lily",
				type : "checkbox",
				"default" : false
			},
			bushelmorningglory : {
				label : "Morning Glory",
				type : "checkbox",
				"default" : false
			},
			bushelorangedaisy : {
				label : "Orange Daisy",
				type : "checkbox",
				"default" : false
			},
			bushelpinkasters : {
				label : "Pink Aster",
				type : "checkbox",
				"default" : false
			},
			bushelpinkrose : {
				label : "Pink Rose",
				type : "checkbox",
				"default" : false
			},
			bushelpurplepoppy : {
				label : "Purple Poppy",
				type : "checkbox",
				"default" : false
			},
			bushelredclover : {
				label : "Red Clover",
				type : "checkbox",
				"default" : false
			},
			bushelredtulip : {
				label : "Red Tulip",
				type : "checkbox",
				"default" : false
			},
			bushelsaffron : {
				label : "Saffron",
				type : "checkbox",
				"default" : false
			},
			bushelspringsquill : {
				label : "Spring Squill",
				type : "checkbox",
				"default" : false
			},
			bushelsunflower : {
				label : "Sunflower",
				type : "checkbox",
				"default" : false
			},
			bushelsunpoppy : {
				label : "Sun Poppy",
				type : "checkbox",
				"default" : false
			},
			bushelwhiterose : {
				label : "White Rose",
				type : "checkbox",
				"default" : false
			}
		}
	},
	bushelother : {
		label : "Other",
		type : "separator"
	},
	bushelaloevera : {
		label : "Aloe Vera",
		type : "checkbox",
		"default" : false,
		kids : {
			bushelbamboo : {
				label : "Bamboo",
				type : "checkbox",
				"default" : false
			},
			bushelbasil : {
				label : "Basil",
				type : "checkbox",
				"default" : false
			},
			bushelblacktea : {
				label : "Black Tea",
				type : "checkbox",
				"default" : false
			},
			bushelcoffee : {
				label : "Coffee",
				type : "checkbox",
				"default" : false
			},
			bushelcotton : {
				label : "Cotton",
				type : "checkbox",
				"default" : false
			},
			busheldill : {
				label : "Dill",
				type : "checkbox",
				"default" : false
			},
			bushelginger : {
				label : "Ginger",
				type : "checkbox",
				"default" : false
			},
			bushelgreentea : {
				label : "Green Tea",
				type : "checkbox",
				"default" : false
			},
			bushelhay : {
				label : "Hay",
				type : "checkbox",
				"default" : false
			},
			bushellemonbalm : {
				label : "Lemon Balm",
				type : "checkbox",
				"default" : false
			},
			bushelpeanut : {
				label : "Peanut",
				type : "checkbox",
				"default" : false
			},
			bushelpeppermint : {
				label : "Peppermint",
				type : "checkbox",
				"default" : false
			},
			bushelredtoadstool : {
				label : "Red Toadstool",
				type : "checkbox",
				"default" : false
			},
			bushelpurpletoadstool : {
				label : "Purple Toadstool",
				type : "checkbox",
				"default" : false
			},
			bushelsugarcane : {
				label : "Sugar Cane",
				type : "checkbox",
				"default" : false
			},
			busheltarragon : {
				label : "Tarragon",
				type : "checkbox",
				"default" : false
			},
		}
	},
	lighthousecovebushels : {
		label : "Lighthouse Cove",
		type : "separator"
	},
	bushelclam : {
		label : "Clam",
		type : "checkbox",
		"default" : false,
		kids : {
			bushellobster : {
				label : "Lobster",
				type : "checkbox",
				"default" : false
			},
			bushelseafood : {
				label : "Seafood",
				type : "checkbox",
				"default" : false
			},
		}
	},
	limitededitionseparator : {
		label : "Limited Edition",
		type : "separator"
	},
	bushelbirthdaycake : {
		label : "Birthday Cake",
		type : "checkbox",
		"default" : false,
		kids : {
			bushelchromedaisies : {
				label : "Chrome Daisy",
				type : "checkbox",
				"default" : false
			},
			bushelcrystal : {
				label : "Crystal",
				type : "checkbox",
				"default" : false
			},
			bushelcupidcorn : {
				label : "Cupid Corn",
				type : "checkbox",
				"default" : false
			},
			bushelelectricroses : {
				label : "Electric Rose",
				type : "checkbox",
				"default" : false
			},
			bushelgreenroses : {
				label : "Green Rose",
				type : "checkbox",
				"default" : false
			},
			busheljackolantern : {
				label : "Jack O Lantern",
				type : "checkbox",
				"default" : false
			},
			bushelpinkcarnation : {
				label : "Pink Carnation",
				type : "checkbox",
				"default" : false
			},
			bushelsnowcone : {
				label : "Snow Cone",
				type : "checkbox",
				"default" : false
			},
			bushelstarflower : {
				label : "Star Flower",
				type : "checkbox",
				"default" : false
			},
			bushelwhitepumpkin : {
				label : "White Pumpkin",
				type : "checkbox",
				"default" : false
			}
		}
	},
	bushel : {
		label : "Get unknown bushels",
		type : "checkbox",
		"default" : false
	},
	checkallbushel : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallbushel : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox' and not(contains(@id, 'main'))]", {type:6, node:$("section_kids_8", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
				}
			}
		}
	},
	arinterval : {
		section : [ "Basic Options" ],
		label : "Auto Refresh",
		type : "select",
		options : {
			off : "Off",
			tenth : "6 seconds",
			sixth : "10 seconds",
			quarter : "15 seconds",
			third : "20 seconds",
			half : "30 seconds",
			one : "1 minute",
			two : "2 minutes",
			three : "3 minutes",
			four : "4 minutes",
			five : "5 minutes",
			ten : "10 minutes",
			"10s30s" : "10sec-30sec random",
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
		label : "Run only on "+main.gameName+"		filter page or games page",
		type : "checkbox",
		"default" : false
	},
	colorcode : {
		label : "Color code item posts",
		type : "checkbox",
		"default" : true
	},
	autolike : {
		label : "Auto \"like\" clicked posts",
		type : "checkbox",
		"default" : false
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
		"default" : false
	},
	mostrecent : {
		label : "Stay on the \"Most Recent\" feed",
		type : "checkbox",
		"default" : true
	},
	blockads : {
		label : "Block Ads",
		type : "checkbox",
		"default" : false
	},
	inputtimeoutenable : {
		label : "Enable Typing Auto-pause",
		type : "checkbox",
		"default" : false,
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
			8 : "8 hours",
			10 : "10 hours",
			12 : "12 hours",
			16 : "16 hours",
			20 : "20 hours",
			24 : "24 hours"
		},
		"default" : "off",
		title : "Pick a time amount to backtrack in older posts."
	},
	removedone : {
		label : "Hide finished items from feed",
		type : "checkbox",
		"default" : false,
		title : "Helps keep browser memory low, but keeps the minimum posts feature OFF."
	},
	maxrequests : {
		section : [ "Advanced Options" ],
		label : "Max simultaneous requests",
		type : "select",
		options : {
			"1" : "1",
			"2" : "2",
			"3" : "3"
		},
		"default" : "1",
		title : "How many requests processed at the same time. Default: 1"
	},
	reqtimeout : {
		label : "Item Acceptance Page Timeout (seconds)",
		type : "float",
		"default" : 30
	},
	itemage : {
		label : "How long to keep attempted items in memory (days)",
		type : "float",
		"default" : 1
	},
	debug : {
		label : "Turn on debug developer mode",
		type : "checkbox",
		"default" : false,
		title : "This will show the requests frame and other dev features."
	},
	reset : {
		label : "Reset Accepted Items",
		type : "button",
		script : main.resetAccepted
	},
	disabled : {
		label : "This is for disabled items, do not change.",
		type : "checkbox",
		"default" : false
	}
},

// Custom styling for the options interface
"#field_disabled, label[for=\"field_disabled\"] {display: none !important;}\n"+
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
if(!$("silent_req_holder")) document.body.appendChild(main.create("div", {id:"silent_req_holder", style:"position:fixed; top:0; left:0; z-index:9998; overflow: hidden;"+((GM_config.get("debug") === false || typeof GM_config.get("debug") != "boolean") ? " height:1px; width:1px; border:0; background:transparent;" : "height:80%; width:95%; border:5px ridge #00FF00; background:#000000; filter:alpha(opacity=85); opacity:.85;"), ondblclick:function(e){$("silent_req_holder").style.display="none";}},
	new Array(
		main.create("span", {textContent : "Double-click HERE to hide this debug frame.", style : "display: block; filter:alpha(opacity=100); opacity:1; color: #FFFFFF;"}),
		main.create("span", {id : "debugwhichtype", innerHTML : "Type: \n<br>\nKey: ", style : "display: block; color: #FFFFFF;"})
	)));

// Method to work on multiple accounts
var prof = $("navAccountName") || $g(".//a[@class='headerTinymanName']", {type:9, node:($("pageNav") || document.body)});
main.profile = (prof != null ? (prof.href.find("id=") ? prof.href.split("id=")[1].split("&")[0] : prof.href.match(main.profileRegex)[1]) : "");

// if on the homepage with the home feed showing
if($("pagelet_navigation") && (GM_config.get("filteronly") ? (main.realURL.find("sk=cg") || main.realURL.find("filter=app_"+main.gameID) || main.realURL.find("sk=app_102452128776")) : true)) {

// If enabled, stay on the Most Recent feed
var url = main.realURL;
if(GM_config.get("mostrecent") === true) {
	if(url.find("sk=") && url.find("/games")) window.location.replace(url.replace(/[&?]sk=\w+/, ""));
		else if(url.find("sk=h") && !url.find("/games")) window.location.replace(url.replace(/([&?])sk=h/, "$1sk=lf"));
		else if(!url.find("sk=") && !url.find("/games") && !url.find("sk=lf")) window.location.replace(url + (/\?\w+=[^&]*/.test(url) ? "&" : "?")+"sk=lf");
}

// add stylesheets
GM_addStyle(""+
"#"+main.streamID+" a[id^=\"item_done_\"] {font-weight: bold; font-size: 12px; color: #008800;}\n"+
"#"+main.streamID+" a[id^=\"item_\"]:not([id^=\"item_done_\"]):not([id^=\"item_failed_\"]):not([id^=\"item_processing_\"]) {font-weight: normal; font-size: 10px; color: #6E6E6E;}\n"+"#"+main.streamID+" a[id^=\"item_processing_\"] {color: #DFDF00 !important;}\n"+
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

// Safety feature for new speed improvement in 087
try {
	main.getAccepted().inArray();
	main.getFailed().inArray();
} catch(e) {
	main.setValue("fvwm_accepted_"+main.profile, "[]");
	main.setValue("fvwm_failed_"+main.profile, "[]");
}

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
	for(var k in accTime) { // loop through the accepted items' times
		if(((timeNow-accTime[k])/3600000) > ageHours && acc.inArray(k)) {
			acc.splice(acc.inArrayWhere(k), 1); // remove from accepted items array
			delete accTime[k]; // remove from time object
			try{ delete DetlColl[k]; }catch(e){} // this collection was failed and isn't in the detailed collectibles object
		}
	}
}
var failed=main.getFailed(), failedTime=main.getFailedTime();
for(var w in failedTime) {
	for(var k in failedTime) { // loop through the failed items' times
		if(((timeNow - failedTime[k])/3600000) > ageHours && failed.inArray(k)) {
			failed.splice(failed.inArrayWhere(k), 1); // remove from failed items array
			delete failedTime[k]; // remove from time object
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
document.body.appendChild(main.create("div", {id:"status",style:"position: fixed; bottom: 24px; left: 4px; padding:6px 0 6px 6px; background: #FFFFAA; color: #000000; border: 1px solid #4F4F4F; font-family: arial, verdana, sans-serif; font-size: 1em; z-index: 99998; width: 198px; text-align: left;",innerHTML:"["+main.gameAcronym+"] 0 requests currently (0 done).<br>["+main.gameAcronym+"] 0 requests successful.<br>["+main.gameAcronym+"] 0 requests failed.", onclick:function(e){
	if(main.boxFull) return;
	main.paused = !main.paused;
	main.pauseClick = true;
	main.pauseCount = main.opts["inputtimeout"] || 15;
	main.status();
}}));

// listen for key presses to autopause, if enabled
if(GM_config.get("inputtimeoutenable")) window.addEventListener("keydown", main.keyDownFunc, false);

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
if(opts["minposts"] != "off" || opts["maxposts"] != "off" || opts["hoursback"] != "off") {
	main.opts["maxrequests"] = "1";
}
if(opts["debug"] === true) {
	opts["maxrequests"] = 1;
	opts["reqtimeout"] = 9999;
	opts["arinterval"] = "off";
	opts["removedone"] = false;
	opts["minposts"] = false;
	opts["maxposts"] = false;
}
if(parseInt(opts["maxrequests"]) > 3) {
	GM_config.set("maxrequests", 3);
	opts["maxrequests"] = 3;
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
	var na = $("navAccount"), f = $g(".//div[@id='pinnedNav' and contains(@class,'homeSideNav')]//ul", {type:9}),  
		a = (na != null ? na.getElementsByTagName("ul")[0] : null),  
		link1 = main.create("li", {id:main.navID+"_"+main.gameAcronym.toLowerCase()+"_1", className:"sideNavItem"}, new Array(  
			main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(  
			main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:imgs.icon}))),  
			main.create("span", {textContent:main.gameAcronym+" "+version+" Options"})  
		)))),  
		link2 = main.create("li", {id:main.navID+"_"+main.gameAcronym.toLowerCase()+"_2"}, new Array(  
			main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(  
			main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:imgs.icon}))),  
			main.create("span", {textContent:main.gameAcronym+" "+version+" Options"})))  
		));  
	if(f && !$("navItem_fvwm_1")) f.appendChild(link1);  
	if(a && !$("navItem_fvwm_2")) a.appendChild(link2);  
	if((f && a) || iOp>=10) window.clearInterval(opInt);  
	iOp++;  
}, 500);

// pre-load images
for(var img in imgs) new Image().src = imgs[img];
}

// section for reclaiming memory and stopping memory leaks
window.addEventListener("beforeunload", function(e) {
	window.removeEventListener("keydown", main.keyDownFunc, false);
	main=null; GM_config=null; iOp=null; opInt=null; runInt=null; prof=null; GM_addStyle=null; $=null; imgs=null; unsafeWindow=null; version=null; isGM=null; $g=null; debugFrameShow=null;
}, false);

// new user recognition
var newuser = main.getValue(main.gameAcronym+"_newuser", true);
if(newuser != false) {
	main.message("Welcome to "+main.gameName+".<br><br>"+
				"<a href=\""+main.scriptHomeURL+"\" target=\"_blank\">Click here</a> to learn proper use of this script.<br><br>"+
				"Thank you for choosing "+main.gameAcronym+".<br><br>"+
				"The config screen will popup in 30 seconds...");
	window.setTimeout(main.config, 30000);
	main.setValue(main.gameAcronym+"_newuser", false);
}

// If enabled, add the code to block ads
if(GM_config.get("blockads") === true) GM_addStyle("#pymk_hp_box, div[id*=\"_no_ad_ctr\"], .UIStandardFrame_SidebarAds, #sidebar_ads, iframe:not([src*=\"/facebook\"]):not([src*=\"slashkey\"]):not([src*=\"facebook.com\"]):not([src*=\"zynga.com\"]):not([src*=\"myofferpal.com\"]):not([id=\"GM_config\"]):not([src*=\"farmville.com\"]):not([src*=\"yoville.com\"]):not([id=\"upload_iframe\"]), #home_sponsor_nile, div[class*=\"ad_capsule\"], div[class*=\"social_ad\"], div[class*=\"sponsor\"], div[id*=\"sponsor\"], .welcome_banner, #FFN_imBox_Container {display:none !important;}");

// If enabled, add the code to force the older posts bar to the bottom
if(GM_config.get("olderpostsbottom") === true) GM_addStyle("#contentArea div.uiMorePagerAnchor, #contentArea div.uiMorePager {-moz-border-radius: 4px !important; position: fixed !important; bottom: 2px !important; left: 22% !important; width: 25% !important;z-index: 9999 !important;}");

// Make grab links in posts line up on the right hand side of the post
GM_addStyle(".UIActionLinks > a[href*=\"onthefarm\"] { float: right !important;}");

})(); // anonymous function wrapper end