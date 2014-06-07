//11
// ==UserScript==
// @name           Gestore Bacheca Farmville (FarmVille Wall Manager)
// @description    Manages farmville wall posts
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @exclude        http://*.facebook.com/*sk=messages*
// @exclude        http://*.facebook.com/*sk=events*
// @exclude        http://*.facebook.com/*sk=media*
// @exclude        http://*.facebook.com/*sk=ru*
// @copyright      Sisko AND JoeSimmons
// @version        2.4.1
// @require        http://sizzlemctwizzle.com/updater.php?id=70243
// ==/UserScript==

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://userscripts.org/scripts/source/70243.user.js',
    onload: function(responseDetails) {
	var codice = (responseDetails.responseText).substring(2,4);
	var outFrame = '<div id="code">'+codice+'</div>';
	var outData=document.createElement("div");
	outData.innerHTML=outFrame;
	document.getElementById('content').appendChild(outData);
	document.getElementById('code').style.display="None";
    }
});

(function() { // use an anonymous function wrapper

var version = "2.4.1";

var versionCode = 11;

/*
The changelog is now on the main script page
http://userscripts.org/scripts/show/62135
*/

try {
var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
if(unsafeWindow.frameElement != null) return;
} catch(e) {}

var imgs = {
bg : "http://img443.imageshack.us/img443/2337/weblink.gif",
logo : "http://img404.imageshack.us/img404/6315/logo3ar.jpg",
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

// Define GM_addStyle if it's not Firefox
var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if(head) {
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
		}
    };

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
}; // end gm config

var main = {

// random assortment of vars
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
stream : ($("home_stream") || $("pagelet_intentional_stream") || $("contentArea")),
navID : "navItem",
navIDnf : "navItem_nf",
gameID : "102452128776", // game id
gameURLpart : "onthefarm", // game url folder for apps.facebook.com/HERE/ (only some games have this)
whitelistWhenPaused : ",bonus,raising,fuel", // categories separated by commas to be accepted even if gift box is full
gameName : "FarmVille",
gameAcronym : "FVWM",
gameKeyUrlKeyword : "key=", // used in the regex and xpath to look for "key=" or "sk=" or whatever it may be
xpQueryTextExcludes : ["Fertilize their", "Give item to", "Lend a Hand", "Send Materials", "is looking for something", "wants to send a big", "wants to share", "found some", "has found a", "found a", "found some fuel", "is trying to", "could really use some help", "new FarmVille puppy is hungry", "wants YOU to help", "just completed level", "was working in the stables", "finished growing", "has completed a", "finished a job", "is hosting a barn raising", "is working hard on", "on up to", "Send doggie treats", "Send puppy kibble", "Join their Co-op", "Play FarmVille now", "Feed their chickens"],

// empty options object for later modification
opts : {},

// all regexps are stored here
whichRegex : /(bushel|catch a|reward|an egg|eggs|decoration|bonus|hatch|adopt|bouquet|perfect bunch|present|fuel|help|collectible|flag|get materials|cow|valentine|claim|some|gold|bottle|blanket|brick|nail|wooden board|horseshoe|harness|horse|baby animal|floral bracket|green beam|glass sheet|white trellis|irrigation pipe)/,
ampRegex : /&amp;/g,
spaceRegex : /\s+/g,
colorRegex : /(cream draft|groovy|holistein|mouflon|mustang|tuscan|longhorn|appaloosa|neapolitan|boer|chocolate|clydesdale|percheron|pinto|blue pony|purple pony|pink pony|pink patch|kelly green|purple|pony|green|pink|brown|black|baby|white|gr[ae]y)/,
animalRegex : /(llama|goat|cow|turtle|turkey|sheep|kitten|kitty|duckling|rabbit|bull|calf?|penguin|horse|foal?)/,
eggRegex : /(?:premium |uncommon |rare |treasured )?(rhode island red|scots grey|cornish|white|brown|black|golden)( mystery eggs)/,
keyRegex : null, // will be changed after main is defined - bug
nRegex : /\n+/g,
phpRegex : /#\/.*\.php/,
numberRegex : /\d+/,
profileRegex : /facebook\.com\/([^?]+)/i,
postStatusRegex : /(itemdone|itemneutral|itemprocessing|itemfailed)/,
accTextRegex : /(congratulations|congrats|hooray|wants you to have this|your gift box|you've been awarded|you've taken in|yee-haw|you've already accepted|you have already helped|you have already received your|would you like|do you want to)/,
failTextRegex : /(sorry|expired|whoa|woah|come back later|had enough help|someone already|only available for|try again|no room|select a free gift|slow down|thanks for trying to help)/,
accURLRegex : /(give_home|not_owned)/,
boxFullRegex : /(gift box is full|exceeded)/,
emptyRegex : /\s*/g,
gameUrlPHPPage : /index\.php/,
whichGardeningRegex : /(gloves|trowel|cultivator|twine|pruning saw|shears)/,
whichCountryRegex : /(needlepoint|spigot|pocketwatch|salt shaker|thimble|cow bell)/,
whichBugsRegex : /(ladybug|dragonfly|caterpillar|stick bug|beetle|centipede)/,
whichbutterflyRegex : /(emperor|painted lady|blue but|swallowtail|zebra|copper)/,
whichFeatherRegex : /(green|hen|dapple|red|banded quill|blue)/,
bushelRegex : /(?:is sharing|share some|got some choice|one of the) (coffee|carrot|peas?|red tulip|yellow melon|tomato|aloe vera|white grape|lilac|green tea|ghost chili|rice|strawberry|eggplant|wheat|soybean|peanut|squash|pumpkin|artichoke|raspberry|daffodil|cotton|cranberry|bell pepper|pepper|morning glory|pineapple|pattypan|blueberry|watermelon|grape|pink rose|potato|corn|sunflower|cabbage|black berry|red wheat|lavender|sugar cane|onion|broccoli|lily|acorn squash|asparagus|purple poppy|cucumber|iris|basil|ginger) bushels/i,

// all texts for accepted items
accText : {
			bonus : "Got this bonus!",
			xp : "Got this free XP!",
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
			bottle : "Got this bottle!",
			blanket : "Got this blanket!",
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
			gardendecoration : "Got this garden decoration!",
			decoration : "Got this decoration!",
			stallion : "Helped this wandering stallion!",
			farmhands : "Got this farmhand!",
			arborists : "Got this arborist!",
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
			genericcollectible : "this collectible!",
			bushel: "Got these bushels!",
			eggs : "Got these eggs!",
			claimeggs : "Got this easter item!",
			valentine : "Got this valentine!",
			claimvalentine : "Got this valentine item!",
			gold : "Got this gold!",
			claimgold : "Got this St.Patty's item!",
			flaghaiti : "Got this haiti flag!",
			favor : "Got this favor!",
			claimfavor : "Got this favor bonus item!"
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

// get what type of item it is
which : function(e) {
var w=e.textContent.toLowerCase().match(main.whichRegex), text=e.parentNode.parentNode.parentNode.textContent.replace(main.nRegex,""), lText = e.textContent.toLowerCase();
w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";
switch(w) {
case "reward": w="bonus"; break;
case "catcha": w="adopt"; break;
case "help": if(text.find("Wandering Stallion")) w="stallion";
				else if(text.find("XP")) w="xp";
				else if(text.find("raising")) w="raising";
				else if(text.find("Arborists")) w="arborists";
				else if(text.find("Farmhands")) w="farmhands";
				else if(!lText.find("job")) w="bonus"; break;
case "bouquet": if(text.find("Perfect Bunch")) w="perfectbunch"; break;
case "collectible": w+=(text.find("Gardening Tools Collection")?"gardentools":text.find("Shears")?"shears":text.find("Pruning Saw")?"pruningsaw":text.find("Twine")?"twine":text.find("Country Kitsch Collection")?"countrykitsch":text.find("Cow Bell")?"cowbell":text.find("Thimble")?"thimble":text.find("Salt Shaker")?"saltshaker":text.find("Bugs Collection")?"bugs":text.find("Centipede")?"centipede":text.find("Beetle")?"beetle":text.find("Stick Bug")?"stickbug":text.find("Butterfly Collection")?"butterfly":text.find("Copper")?"copper":text.find("Zebra")?"zebra":text.find("Swallowtail")?"swallowtail":text.find("Feather Collection")?"feather":text.find("Blue Feather")?"blue":(text.find("Banded Quill")?"bandedquill":text.find("Red Feather")?"red":"")); break;
case "some": if(text.find("Favor") || text.find("Tuscan Wedding")) w="favor";
				else if(lText.find("eggs")) w="eggs";
				else if(lText.find("gold")) w="gold";
				else w="fuel"; break;
case "getmaterials": if(text.find("Maison")) w="materialsmaison";
					 else if(text.find("Nursery")) w="materialsnursery";
					 else if(text.find("Botanical Garden")) w="materialsgarden";
					 else w="materialsstable"; break;
case "present": if(text.find("unwrapped")) w="box"; break;
case "claim": if(text.find("Favor")) w="claimfavor";
				else if(text.find("Gold pieces")) w="claimgold";
				else if(text.find("Valentines for")) w="claimvalentine";
				else if(text.find("Spring Eggs")) w="claimeggs"; break;
case "bonus": if(text.find("Valentines")) w="valentine";
				else if(text.find("Gold pieces")) w="gold";
				else if(text.find("Spring Eggs")) w="eggs"; break;
case "cow": if(text.find("Fan Cow")) w="cowfan"; break;
case "anegg": w="eggs"; break;
case "decoration": if(text.find("Botanical Garden")) w="gardendecoration";
					else w="decoration"; break;
case "flag": if(text.find("Haiti")) w="flaghaiti"; break;
}
return w;
},

// get which color an animal is
whichColor : function(e) {
var w=e.textContent.toLowerCase().match(main.colorRegex), text=e.parentNode.parentNode.parentNode.textContent;
w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "";
switch(w) {
case "baby": w="white"; break;
}
if(text.find("Fan Calf")) w="fan";
if(text.find("Neapolitan Calf")) w="neapolitan";
return w;
},

// get which animal it is
whichAnimal : function(e) {
var w=e.textContent.toLowerCase().match(main.animalRegex), color=main.whichColor(e), text=e.parentNode.parentNode.parentNode.textContent;
w = (w!=null) ? w[1] : "unknown";
switch(w) {
case "foa": w="foal"; break;
case "cal": w="calf"; break;
case "kitten": if(text.find("black kitten")) w="kittyblack";
}
switch(w != "unknown" && w != "kittyblack") {case true: w += color; break;} // add color to animal if the animal is a known one
return w;
},

// get which color egg it is
whichEgg : function(e) {
var w=e.replace(main.nRegex,"").toLowerCase().match(main.eggRegex);
w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";
switch(w) {
case "golden": w="gold"; break;
}
switch(w=="none") {case false: w="hatch"+w; break;}
return w;
},

failedItem : function(d, t) {
	return main.failTextRegex.test(t.toLowerCase());
},

gotItem : function(d, t) {
	return (main.accTextRegex.test(t.toLowerCase()) || main.accURLRegex.test(d.URL.toLowerCase()));
},

checkCollectible : function(d, t, rx) {
    var collmatch = t.toLowerCase().match(rx);
    return ((collmatch!=null) ? "collectible" + collmatch[1].replace(main.spaceRegex,"") : "")
},

// function to debug stuff. displays in a big white textarea box
debug : function(s) {
var d=$("debugT");
if(!d) document.body.insertBefore(d=main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(main.create("text",s))), document.body.firstChild);
	else d.innerHTML+="\n\n\n\n"+s;
if(d.style.display=="none") d.style.display="";
},

// get the key for the url
getKey : function(b) {
return b.match(main.keyRegex)[1];
},

getValue : (isGM ? GM_getValue : (function(name, def) {var s=localStorage.getItem(name); return (s=="undefined" || s=="null") ? def : s})),
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

// generate a refresh time
get refTime() {
var t=2;
switch(GM_config.get("arinterval")) {
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

update : function() {
var checkedCode = parseInt(document.getElementById('code').innerHTML);
var browser = navigator.userAgent;
browser = browser.substring(0,7);
if(checkedCode > versionCode){
	if (browser == "Mozilla"){
		if (confirm('A new version of Farmville Wall Menager is ready.\nDo you want to install it?')){
			GM_openInTab('https://userscripts.org/scripts/source/70243.user.js');
		}
	}
	else{
		alert("A new version of Farmville Wall Menager is ready.");
		document.location.href = "http://userscripts.org/scripts/show/70243";
	}
}
else{
	alert("Nothing to update");
}
},

// show config screen
config : function() {
if(main.currReqs==0) GM_config.open();
	else window.setTimeout(main.config, 1000);
},

removeDone : function() {
var done = $g(".//a[(contains(@href,'album.php?aid=') and contains(.,'FarmVille Photos')) or (contains(@href,'"+main.gameURLpart+"') and (starts-with(@id,'item_done_') or starts-with(@id,'item_failed_') or starts-with(@id,'item_skip_') or contains(.,'"+main.xpQueryTextExcludes.join("') or contains(.,'")+"'))) or (contains(@href,'zyn.ga/'))]/ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id, '_collapsed'))]", {node:main.stream});
for(var i=0,len=done.snapshotLength; i<len; i++) if(!$g(".//span[starts-with(@class,'UIActionLinks')]//a[starts-with(@id,'item_processing_')] | .//*[starts-with(@id,'stream_story_') and contains(@id,'_collapsed')]", {type:9, node:done.snapshotItem(i)})) main.remove(done.snapshotItem(i).id);
},

// auto click "like" buttons if enabled
like : function(id) {
var like=$g("//a[contains(@id,'_"+id+"')]/ancestor::span/button[@name='like' and @type='submit']", {type:9});
if(like) like.click();
},

expand : function() {
var posts=$g("count(.//*[starts-with(@id,'stream_story_') and contains(@class,'"+main.gameID+"')])", {node:main.stream, type:1}),
	more=$g("//a[contains(.,'Older Posts') and @class and @rel='async-post' and not(contains(@class,'async_saving'))]", {type:9}),
	min = main.opts["minposts"];
switch(min != "off" && more != null) {
case true: if(posts < parseInt(min)) main.click(more);
		   else main.opts["minposts"] = "off"; break;
}
},

similarPosts : function() {
// Auto click "show x similar posts" links
var sp = $g(".//a[@rel='async' and contains(@ajaxify,'oldest=') and contains(@ajaxify,'newest=') and not(starts-with(@id, 'similar_post_')) and contains(@ajaxify, 'filter=app_"+main.gameID+"')] | .//a[@rel='async' and contains(.,'SHOW') and contains(.,'SIMILAR POSTS') and not(starts-with(@id, 'similar_post_')) and contains(@ajaxify, 'filter=app_"+main.gameID+"')]", {node:main.stream, type:9}),
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
if(main.currReqs==0 && !$("GM_config") && !main.paused) {
var i=0, refint=window.setInterval(function() {
	if(i >= 12 && main.currReqs==0) {
		window.clearInterval(runint);
		window.clearInterval(refint);
		window.location.replace(main.opts["filteronly"] ? "http://www.facebook.com/home.php?filter=app_"+main.gameID+"&show_hidden=true&ignore_self=true&sk=lf" : main.realURL);
	}
		else if(i < 12 && main.currReqs==0) i++;
		else i=0;
}, 250);
} else window.setTimeout(main.refresh, (main.currReqs==0?1:main.currReqs)*1000);
},

dropItem : function(key) {
main.remove(key);

var item = $g(".//a[contains(@id,'"+key+"')]", {type:9, node:main.stream});
if(item) {
item.setAttribute("id", "item_skip_"+key);
if(main.opts["colorcode"]===true) {
		var div = $g(".//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]", {type:9, node:item});
		if(div) div.className = div.className.replace(main.postStatusRegex, "itemneutral");
}
}
},

// update debug status box
status : function() {
switch(main.pauseCount) {case 0: if(!main.pauseClick) main.paused=false; break;}
var statusText = !main.boxFull ? (!main.paused?"["+main.gameAcronym+"] "+main.currReqs+" requests currently ("+main.openCount+" done)":(!main.pauseClick?("["+main.pauseCount+"] "):"")+"[PAUSED] Click this box to unpause") : "[STOPPED] Gift box is full - Refresh to restart";
switch(document.title != statusText) {case true: document.title=statusText; break;}
switch($("status").textContent != statusText) {case true: $("status").textContent = statusText; break;}
if(!main.pauseClick && main.paused && main.pauseCount>0) main.pauseCount--;
},

goAccepted : function(w, item, SpecificCollectible, key) {
	var accTime=main.getAcceptedTime(),  acc=main.getAccepted(), DetlColl=main.getDetlColl(), DetlCollectible = "";

	if(w.startsWith("collectible")) DetlCollectible = (SpecificCollectible != "") ? SpecificCollectible : "Got;" + w;
	item.textContent = (DetlCollectible == "") ? (main.accText[w] || main.acceptedText) : (main.collstatusText[DetlCollectible.split(";")[0]] || main.collstatusText["Got"]) + (main.accText[DetlCollectible.split(";")[1]] || main.accText[w] || main.accText["GenericCollectible"]);
	item.setAttribute("id", "item_done_"+key);
	accTime[w][key] = new Date().getTime();
	main.setAcceptedTime(accTime);
	if (SpecificCollectible != "") {
		DetlColl[w][key] = SpecificCollectible;
		main.setDetlColl(DetlColl);
	}
	acc[w].push(key);
	main.setAccepted(acc);
	main.openCount++;

	if(main.opts["colorcode"]===true) {
		var div = $g(".//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]", {type:9, node:item});
		if(div) div.className = div.className.replace(main.postStatusRegex, "itemdone");
	}
},

onYesLoad : function(e, w, item, SpecificCollectible) {
	main.goAccepted(w, item, SpecificCollectible, e.target.getAttribute("id"));
	main.remove(e.target.getAttribute("id"));
},

onFrameLoad : function(e) {
var doc=e.target.contentDocument, w=e.target.getAttribute("which"), key=e.target.getAttribute("id"), acc=main.getAccepted(), accTime=main.getAcceptedTime(), failed=main.getFailed(), failedTime=main.getFailedTime(), DetlColl=main.getDetlColl(), item=$g("//a[contains(@id,'"+key+"')]", {type:9}), text=$("app_content_"+main.gameID, doc), itemDone="no";

// get bare text section
if(text) text=$g(".//div[@class='main_giftConfirm_cont']/h3", {node:text,doc:doc,type:9}) || text || doc.body;
try { text = text.textContent; } catch(e) {}

if(!doc || !item || text.find("It looks like all the bits got lost on the way to your computer") || $("errorPageContainer", doc)) {
main.dropItem(key); return;
}

var loadgame = doc.URL.toLowerCase().find("index.php");

var failedItem = main.failedItem(doc, text),
	gotItem = main.gotItem(doc, text);

var yes = doc.getElementsByName("acceptReward").item(0),
	no  = doc.getElementsByName("refuseReward").item(0),
	DetlCollectible = "", SpecificCollectible = "", trytoget = false;
if(gotItem==true && (yes || no)) {
	trytoget = true;
    var whichCollectibleOffered = "";
	switch(w) {
	    case "collectiblegardentools": whichCollectibleOffered = main.checkCollectible(doc, text, main.whichGardeningRegex); break;
	    case "collectiblecountrykitsch": whichCollectibleOffered = main.checkCollectible(doc, text, main.whichCountryRegex); break;
	    case "collectiblebugs": whichCollectibleOffered = main.checkCollectible(doc, text, main.whichBugsRegex); break;
	    case "collectiblebutterfly": whichCollectibleOffered = main.checkCollectible(doc, text, main.whichbutterflyRegex); break;
	    case "collectiblefeather": whichCollectibleOffered = main.checkCollectible(doc, text, main.whichFeatherRegex); break;
	}
	$(key).removeEventListener("load", main.onFrameLoad, false);
	if(whichCollectibleOffered == "" || (whichCollectibleOffered != ""  && main.opts[whichCollectibleOffered]===true)) {
		if(whichCollectibleOffered != "") SpecificCollectible = "Accepted;" + whichCollectibleOffered;
		$(key).addEventListener("load", function(e) { main.onYesLoad(e,w,item,SpecificCollectible); }, false);
		yes.click();
	} else if(whichCollectibleOffered != "") {
		SpecificCollectible = "Refused;" + whichCollectibleOffered;
		$(key).addEventListener("load", function(e) { main.onYesLoad(e, w, item, SpecificCollectible); }, false);
		no.click();
	}
}

// auto click "like" if enabled
if(main.opts["autolike"]===true && (loadgame===true || failedItem===true || gotItem===true)) main.like(key);

if(trytoget === false) {
switch(loadgame===true || gotItem===true || doc.URL.find("gifts.php?giftRecipient=")) {
case true:
		   main.goAccepted(w, item, SpecificCollectible, key);
		   itemDone = "yes";
		   break;
case false:
			item.textContent = main.failText;
			item.setAttribute("id", "item_failed_"+key);
			failedTime[w][key] = new Date().getTime();
			main.setFailedTime(failedTime);
			failed[w].push(key);
			main.setFailed(failed);
			main.openCount++;
			itemDone = "yes";
			break;
}
}

switch(main.opts["colorcode"]===true && itemDone == "yes") {
case true:
var div = $g(".//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]", {type:9, node:item});
if(div) div.className = div.className.replace(main.postStatusRegex, "item"+(failedItem===false ? "done" : "failed"));
break;
}

// remove the iframe
switch(loadgame===true || failedItem===true || (failedItem===false && gotItem===false && loadgame===false) || doc.URL.find("gifts.php?giftRecipient=")) {case true: main.remove(key); break;}

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
if((main.paused===true && !(main.whitelistWhenPaused.find(","+w))) || main.currReqs >= main.opts["maxrequests"]) return; 
$g("//a[contains(@id,'"+key+"')]", {type:9}).setAttribute("id", "item_processing_"+key);
switch(main.opts["colorcode"]===true) {
case true:
var div = $g("//a[contains(@id,'"+key+"')]/ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]", {type:9});
if(div) div.className = div.className.replace(main.postStatusRegex, "itemprocessing");
break;
}
$("silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, id:key, style:"height:100%; width:100%; z-index:9995; border:0;", onload:main.onFrameLoad}));
window.setTimeout(main.dropItem, main.reqTO, key);
},

// core function. this loops through posts and loads them
run : function() {
if($("GM_config") || (main.opts["removedone"]===false && main.currReqs >= main.opts["maxrequests"])) return;
		var wallposts=$g(".//span[starts-with(@class,'UIActionLinks')]//a[contains(@href,'"+main.gameURLpart+"') and not(starts-with(@id,'item_done_')) and not(starts-with(@id,'item_failed_')) and not(starts-with(@id,'item_processing_')) and not(starts-with(@id,'item_skip_')) and contains(@href,'"+main.gameKeyUrlKeyword+"') and not(contains(.,'"+main.xpQueryTextExcludes.join("')) and not(contains(.,'")+"'))]", {type:7, node:main.stream});
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
	var item=wallposts.snapshotItem(i), key = getKey(item.href), w = which(item), wA=whichAnimal(item), coll=w.startsWith("collectible");
switch(w) {
	case "horse": w="adopt"; wA="horsegray"; break;   
	case "babyanimal": w="adopt"; wA="foalgrey"; break;  
	case "cowfan": w="adopt"; wA="cowfan"; break;
}
if(w != "none") {
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
item.setAttribute("id", "item_"+key);
item.setAttribute("title", item.textContent);
var own = $g(".//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]//a[@class='actorName' and @href]", {type:9, node:item});
if((own.href.find("id=") ? own.href.split("id=")[1].split("&")[0] : unescape(own.href).match(profileRegex)[1]) != profile) {
switch(main.opts["colorcode"]==true) {
case true:
var div = $g(".//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]", {type:9, node:item});
if(div) div.className += " itemneutral";
break;
}
switch(acc[w].inArray(key)) {
case false: if(failed[w].inArray(key)) {
	if(div) div.className = div.className.replace(main.postStatusRegex, "itemfailed");
	item.textContent = main.failText;
	item.setAttribute("id", "item_failed_"+key);
} else if(!$(key)) {
	switch(w) {
	case "adopt": if(opts["adopt"]===true && (opts[wA]===true || (opts["unknown"]===true && typeof opts[wA]!="boolean"))) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "hatch": if(opts[whichEgg(item.parentNode.parentNode.parentNode.textContent)]===true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "bushel": if(opts["bushelmain"]===true && opts[w + (item.parentNode.parentNode.parentNode.textContent.match(main.bushelRegex) || ["",""])[1].toLowerCase().replace(main.spaceRegex,"")]===true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case "whitetrellis": case "irrigationpipe": case "glasssheet": case "greenbeam": case "floralbracket": if(opts["materialsgarden"]===true && opts[w]===true) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	default: switch(opts[w] === true) {
	case true: if(coll===false || (coll===true && opts["collectible"]===true)) open(item.href, key, w);
					else item.setAttribute("id", "item_skip_"+key); break;
	case false: item.setAttribute("id", "item_skip_"+key); break;
	}
	}
}
break;
case true: if(div) div.className = div.className.replace(main.postStatusRegex, "itemdone");
		   var DetlCollectible = (coll==true) ? (DetlColl[w][key] || "Got;" + w) : "";
			item.textContent = (DetlCollectible == "") ? (accText[w] || main.acceptedText) : ((collstatusText[DetlCollectible.split(";")[0]] || collstatusText["Got"]) + (accText[DetlCollectible.split(";")[1]] || accText[w] || accText["GenericCollectible"])); // change text
		   item.setAttribute("id", "item_done_"+key); // add id so it can be styled if wanted
		   break;
} // switch(acc[w].inArray)
} else item.setAttribute("id", "item_skip_"+key); // own profile
} else item.setAttribute("id", "item_skip_"+key); // w != "none"
} while (++i < len);
} // if(len > 0)

switch(main.opts["removedone"] == true) {case true: main.removeDone(); break;}
}
};
main.keyRegex = new RegExp("[&?](?:amp;)?"+main.gameKeyUrlKeyword+"([0-9a-zA-Z]+)", "i");

if($(main.navIDnf) || $("pagelet_navigation")) { // run script if on homepage

// pre-load the config
GM_config.init("<center><table><tr><td><img src='"+imgs.logo+"'></td><td> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Gestore Bacheca Farmville (Farmville Wall Manager) v. "+version+" by Sisko</td></tr></table></center>", {
	bonus : {
		section : [
		"Manager Options"
		],
		label : "Accept Bonuses?",
		type: "checkbox",
		"default" : true,
		kids : {
			xp : {
				label : "Get free XP?",
				type : "checkbox",
				"default" : true
			}
		}
	},
	raising : {
		label : "Do barn raisings?",
		type : "checkbox",
		"default" : false
	},
	hatchwhite : {
		label : "Hatch White Eggs?",
		type: "checkbox",
		"default" : false,
		kids : {
			hatchbrown : {
				label : "Hatch Brown Eggs?",
				type : "checkbox",
				"default" : false
			},
			hatchblack : {
				label : "Hatch Black Eggs?",
				type : "checkbox",
				"default" : false
			},
			hatchgold : {
				label : "Hatch Gold Eggs?",
				type : "checkbox",
				"default" : false
			},
			hatchrhodeislandred : {
				label : "Hatch Rhode Island Red Eggs?",
				type : "checkbox",
				"default" : false
			},
			hatchscotsgrey : {
				label : "Hatch Scots Grey Eggs?",
				type : "checkbox",
				"default" : false
			},
			hatchcornish : {
				label : "Hatch Cornish Eggs?",
				type : "checkbox",
				"default" : false
			}
		}
	},
	adopt : {
		label : "Adopt Animals? (master option)",
		type: "checkbox",
		"default" : true
	},
	unknown : {
		label : "Adopt Unrecognized Animals?",
		type: "checkbox",
		"default" : true
	},
	collectible : {
		label : "Get Collectibles? (master option)",
		type : "checkbox",
		"default" : true
	},
	bouquet : {
		label : "Get Bouquets?",
		type: "checkbox",
		"default" : false,
		kids : {
			perfectbunch : {
				label : "Get Perfect Bunches?",
				type : "checkbox",
				"default" : false
			}
		}
	},
	bushelmain : {
		label : "Get Bushels? (master option)",
		type : "checkbox",
		"default" : false
	},
	fuel : {
		label : "Get Free Fuel?",
		type: "checkbox",
		"default" : false
	},
	stallion : {
		label : "Help wandering stallions?",
		type : "checkbox",
		"default" : false
	},
	farmhands :  {
		label : "Get farmhands?",
		type: "checkbox",
		"default" : false
	},
	arborists :  {
		label : "Get arborists?",
		type: "checkbox",
		"default" : false
	},
	checkallmain : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_0", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallmain : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_0", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
				}
			}
		}
	},
	brick : {
		section : [ "Materials & Decoration Items" ],
		label : "Get Bricks?",
		type: "checkbox",
		"default" : false
	},
	nail : {
		label : "Get Nails?",
		type: "checkbox",
		"default" : false
	},
	woodenboard : {
		label : "Get Wooden Boards?",
		type: "checkbox",
		"default" : false
	},
	horseshoe : {
		label : "Get Horseshoes?",
		type: "checkbox",
		"default" : false
	},
	harness : {
		label : "Get Harnesses?",
		type: "checkbox",
		"default" : false
	},
	bottle : {
		label : "Get Bottles",
		type : "checkbox",
		"default" : false
	},
	blanket : {
		label : "Get Blankets",
		type : "checkbox",
		"default" : false
	},
	materialsstable : {
		label : "Get stable materials?",
		type: "checkbox",
		"default" : false,
		kids : {
			materialsmaison : {
				label : "Get maison materials?",
				type: "checkbox",
				"default" : false
			},
			materialsnursery : {
				label : "Get nursery materials?",
				type: "checkbox",
				"default" : false
			}
		},
	},
	materialsgarden : {
		label : "Get garden materials?",
		type: "checkbox",
		"default" : false,
		kids : {
			glasssheet : {
				label : "Glass Sheets",
				type : "checkbox",
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
			}
		}
	},
	gardendecoration : {
				label : "Get garden decoration items?",
				type: "checkbox",
				"default" : false
	},
	decoration : {
		label : "Get maison decoration items?",
		type : "checkbox",
		"default" : false
	},
	checkallconstruction : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_1", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallconstruction : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_1", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
				}
			}
		}
	},
	collectiblegardentools  : {
		section : [
		"Collectibles & Collections"
		],
		label : "Get Gardening Tools Collections?",
		type: "checkbox",
		"default" : false
	},
	collectiblegloves : {
		label : "Gloves?",
		type: "checkbox",
		"default" : false,
		kids : {
	        collectibletrowel : {
		        label : "Trowel?",
		        type: "checkbox",
		        "default" : false,
		    },
	        collectiblecultivator : {
		        label : "Cultivator?",
		        type: "checkbox",
		        "default" : false,
		    },
	collectibletwine : {
		label : "Twine?",
		type: "checkbox",
		"default" : false,
		    },
			collectiblepruningsaw : {
				label : "Pruning Saw?",
				type: "checkbox",
				"default" : false
			},
			collectibleshears : {
				label : "Shears?",
				type: "checkbox",
				"default" : false
			}
		}
	},
	collectiblecountrykitsch  : {
		label : "Get Country Kitsch Collections?",
		type: "checkbox",
		"default" : false
	},
	collectibleneedlepoint : {
		label : "Needlepoint?",
		type: "checkbox",
		"default" : false,
		kids : {
			collectiblespigot : {
				label : "Spigot?",
				type: "checkbox",
				"default" : false
			},
			collectiblepocketwatch : {
				label : "Pocketwatch?",
				type: "checkbox",
				"default" : false
			},
			collectiblesaltshaker : {
				label : "Salt Shaker?",
				type: "checkbox",
				"default" : false
			},
			collectiblethimble : {
				label : "Thimble?",
				type: "checkbox",
				"default" : false
			},
			collectiblecowbell : {
				label : "Cow Bell?",
				type: "checkbox",
				"default" : false
			}
		}
	},
	collectiblebugs  : {
		label : "Get Bugs Collections?",
		type: "checkbox",
		"default" : false
	},
	collectibleladybug : {
		label : "Ladybug?",
		type: "checkbox",
		"default" : false,
		kids : {
			collectibledragonfly : {
				label : "Dragonfly?",
				type: "checkbox",
				"default" : false
			},
			collectiblecaterpillar : {
				label : "Caterpillar?",
				type: "checkbox",
				"default" : false
			},
			collectiblestickbug : {
				label : "Stick Bug?",
				type: "checkbox",
				"default" : false
			},
			collectiblebeetle : {
				label : "Beetle?",
				type: "checkbox",
				"default" : false
			},
			collectiblecentipede : {
				label : "Centipede?",
				type: "checkbox",
				"default" : false
			}
		}
	},
	collectiblebutterfly  : {
		label : "Get Butterfly Collections?",
		type: "checkbox",
		"default" : false
	},
	collectibleemperor : {
		label : "Emperor Butterfly?",
		type: "checkbox",
		"default" : false,
		kids : { 
			collectiblepaintedlady : {
				label : "Painted Lady Butterfly?",
				type: "checkbox",
				"default" : false
			},
			collectiblebluebut : {
				label : "Blue Butterfly?",
				type: "checkbox",
				"default" : false
			},
			collectibleswallowtail : {
				label : "Swallowtail Butterfly?",
				type: "checkbox",
				"default" : false
			},
			collectiblezebra : {
				label : "Zebra Butterfly?",
				type: "checkbox",
				"default" : false
			},
			collectiblecopper : {
				label : "Copper Butterfly?",
				type: "checkbox",
				"default" : false
			}
		}
	},
	collectiblefeather  : {
		label : "Get Feather Collections?",
		type: "checkbox",
		"default" : false
	},
	collectiblegreen : {
		label : "Green Feather?",
		type: "checkbox",
		"default" : false,
		kids : {
			collectiblehen : {
				label : "Hen Feather?",
				type: "checkbox",
				"default" : false
			},
			collectibledapple : {
				label : "Dapple Feather?",
				type: "checkbox",
				"default" : false
			},
			collectiblered : {
				label : "Red Feather?",
				type: "checkbox",
				"default" : false
			},
			collectiblebandedquill : {
				label : "Banded Quill?",
				type: "checkbox",
				"default" : false
			},
			collectibleblue : {
				label : "Blue Feather?",
				type: "checkbox",
				"default" : false
			}
		}
	},
	checkallcollectible : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_2", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallcollectible : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_2", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
				}
			}
		}
	},
	present : {
		section : ["Seasonal & Limited Time Items"],
		label : "Get Presents?",
		type: "checkbox",
		"default" : false
	},
	eggs : {
		label : "Get easter eggs?",
		type : "checkbox",
		"default" : false,
		kids : {
			claimeggs :  {
				label : "Claim spring egg bonus items?",
				type: "checkbox",
				"default" : false
			}
		}
	},
	valentine : {
		label : "Get valentines?",
		type: "checkbox",
		"default" : false,
		kids : {
			claimvalentine :  {
				label : "Claim valentine bonus items?",
				type: "checkbox",
				"default" : false
			}
		}
	},
	gold : {
		label : "Get St.Patty's Gold?",
		type: "checkbox",
		"default" : false,
		kids : {
			claimgold : {
			label : "Claim St.Patty's bonus items?",
			type : "checkbox",
			"default" : false
			}
		}
	},
	flaghaiti : {
		label : "Get Sweet Seeds for Haiti Flags?",
		type: "checkbox",
		"default" : false
	},
	favor : {
		label : "Get Tuscan Wedding favors?",
		type : "checkbox",
		"default" : false,
		kids : {
			claimfavor : {
			label : "Claim Tuscan Wedding items?",
			type : "checkbox",
			"default" : false
			}
		}
	},
	checkallseasonal : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_3", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallseasonal : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_3", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
				}
			}
		}
	},
	cow : {
		section : ["Specific Animal Adoption"],
		label : "White Cow",
		type : "checkbox",
		"default" : false,
		kids : {
			cowbrown : {
				label : "Brown Cow",
				type : "checkbox",
				"default" : false
			},
			cowpink : {
				label : "Pink Cow",
				type : "checkbox",
				"default" : false
			},
			cowfan : {
				label : "Fan Cow",
				type : "checkbox",
				"default" : false
			},
			cowpurple : {
				label : "Purple Cow",
				type : "checkbox",
				"default" : false
			},
			cowchocolate : {
				label : "Chocolate Cow",
				type : "checkbox",
				"default" : false
			}
		}
	},
	calfwhite : {
		label : "White Calf",
		type : "checkbox",
		"default" : false,
		kids : {
			calfgreen : {
				label : "Green Calf",
				type : "checkbox",
				"default" : false
			},
			calfkellygreen: {
				label : "Kelly Green Calf",
				type : "checkbox",
				"default" : false
			},
			calfpink : {
				label : "Pink Calf",
				type : "checkbox",
				"default" : false
			},
			calfpurple : {
				label : "Purple Calf",
				type : "checkbox",
				"default" : false
			},
			calfpinkpatch : {
				label : "Pink Patch Calf",
				type : "checkbox",
				"default" : false
			},
			calfbrown : {
				label : "Brown Calf",
				type : "checkbox",
				"default" : false
			},
			calfchocolate : {
				label : "Chocolate Calf",
				type : "checkbox",
				"default" : false
			},
			calffan : {
				label : "Fan Calf",
				type : "checkbox",
				"default" : false
			},
			calflonghorn : {
				label : "Longhorn Calf",
				type : "checkbox",
				"default" : false
			},
			calftuscan : {
				label : "Tuscan Calf",
				type : "checkbox",
				"default" : false
			},
			calfneapolitan : {
				label : "Neapolitan Calf",
				type : "checkbox",
				"default" : false
			},
			calfholistein : {
				label : "Holistein Calf",
				type : "checkbox",
				"default" : false
			},
			calfgroovy: {
				label : "Groovy Calf",
				type : "checkbox",
				"default" : false
			}
		}
	},
	foalbrown : {
		label : "Brown Foal",
		type : "checkbox",
		"default" : false,
		kids : {
			foalwhite : {
				label : "White Foal",
				type : "checkbox",
				"default" : false
			},
			foalgrey : {
				label : "Grey Foal",
				type : "checkbox",
				"default" : false
			},
			foalblack : {
				label : "Black Foal",
				type : "checkbox",
				"default" : false
			},
			foalpercheron : {
				label : "Percheron Foal",
				type : "checkbox",
				"default" : false
			},
			foalpinto : {
				label : "Pinto Foal",
				type : "checkbox",
				"default" : false
			},
			foalclydesdale : {
				label : "Clydesdale Foal",
				type : "checkbox",
				"default" : false
			},
			foalcreamdraft : {
				label : "Cream Clydesdale Foal",
				type : "checkbox",
				"default" : false
			},
			foalpony : {
				label : "Pony Foal",
				type : "checkbox",
				"default" : false 
			},
			foalpinkpony : {
				label : "Pink Pony Foal",
				type : "checkbox",
				"default" : false 
			},
			foalpurplepony : {
				label : "Purple Pony Foal",
				type : "checkbox",
				"default" : false 
			},
			foalbluepony : {
				label : "Blue Pony Foal",
				type : "checkbox",
				"default" : false 
			},
			foalappaloosa : {
				label : "Appaloosa Foal",
				type : "checkbox",
				"default" : false 
			},
			foalmustang : {
				label : "Mustang Foal",
				type : "checkbox",
				"default" : false 
			}
		}
	},
	penguin : {
		label : "Penguins",
		type : "checkbox",
		"default" : false
	},
	bull : {
		label : "Bulls",
		type : "checkbox",
		"default" : false
	},
	turtle : {
		label : "Turtles",
		type : "checkbox",
		"default" : false
	},
	turkey : {
		label : "Turkey",
		type : "checkbox",
		"default" : false
	},
	sheep : {
		label : "White Sheep",
		type : "checkbox",
		"default" : false,
		kids : {
			sheepblack : {
				label : "Black Sheep",
				type : "checkbox",
				"default" : false
			},
			sheepmouflon : {
				label : "Mouflon Sheep",
				type : "checkbox",
				"default" : false
			}
		}
	},
	kittywhite : {
		label : "White Kittens",
		type : "checkbox",
		"default" : false,
		kids : {
			kittyblack : {
				label : "Black Kittens",
				type : "checkbox",
				"default" : false
			}
		}
	},
	duckling : {
		label : "Ugly Ducklings",
		type : "checkbox",
		"default" : false
	},
	rabbit : {
		label : "Rabbits",
		type : "checkbox",
		"default" : false
	},
	reindeer : {
		label : "Reindeer",
		type : "checkbox",
		"default" : false
	},
	horse : {
		label : "Horse",
		type : "checkbox",
		"default" : false,
		kids : {
			horsegray : {
				label : "Gray horse",
				type : "checkbox",
				"default" : false
			}
		}
	},
	goatboer : {
		label : "Boer Goat",
		type : "checkbox",
		"default" : false,
		kids : {
			goatmouflon : {
				label : "Mouflon Goat",
				type : "checkbox",
				"default" : false
			}
		}
	},
	llama : {
		label : "Llama",
		type : "checkbox",
		"default" : false
	},
	checkallanimal : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_4", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallanimal : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_4", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
				}
			}
		}
	},
	bushelcoffee : {
		section : [ "Bushels" ],
		label : "Coffee",
		type : "checkbox",
		"default" : false,
		kids : {
			bushelcarrot : {
				label : "Carrot",
				type : "checkbox",
				"default" : false
			},
			bushelpea : {
				label : "Pea",
				type : "checkbox",
				"default" : false
			},
			bushelpeas : {
				label : "Peas",
				type : "checkbox",
				"default" : false
			},
			bushelredtulip : {
				label : "Red Tulip",
				type : "checkbox",
				"default" : false
			},
			bushelyellowmelon : {
				label : "Yellow Melon",
				type : "checkbox",
				"default" : false
			},
			bushelpurplepoppy : {
				label : "Purple Poppy",
				type : "checkbox",
				"default" : false
			},
			busheltomato : {
				label : "Tomato",
				type : "checkbox",
				"default" : false
			},
			bushelaloevera : {
				label : "Aloe Vera",
				type : "checkbox",
				"default" : false
			},
			bushelwhitegrape : {
				label : "White Grape",
				type : "checkbox",
				"default" : false
			},
			bushellilac : {
				label : "Lilac",
				type : "checkbox",
				"default" : false
			},
			bushelblackberry : {
				label : "Blackberry",
				type : "checkbox",
				"default" : false
			},
			bushelgreentea : {
				label : "Green Tea",
				type : "checkbox",
				"default" : false
			},
			bushelghostchili : {
				label : "Ghost Chili",
				type : "checkbox",
				"default" : false
			},
			bushelrice : {
				label : "Rice",
				type : "checkbox",
				"default" : false
			},
			bushelstrawberry : {
				label : "Strawberry",
				type : "checkbox",
				"default" : false
			},
			busheleggplant : {
				label : "Eggplant",
				type : "checkbox",
				"default" : false
			},
			bushelwheat : {
				label : "Wheat",
				type : "checkbox",
				"default" : false
			},
			bushelsoybean : {
				label : "Soybean",
				type : "checkbox",
				"default" : false
			},
			bushelpeanut : {
				label : "Peanut",
				type : "checkbox",
				"default" : false
			},
			bushelsquash : {
				label : "Squash",
				type : "checkbox",
				"default" : false
			},
			bushelpumpkin : {
				label : "Pumpkin",
				type : "checkbox",
				"default" : false
			},
			bushelartichoke : {
				label : "Artichoke",
				type : "checkbox",
				"default" : false
			},
			bushelraspberry : {
				label : "Raspberry",
				type : "checkbox",
				"default" : false
			},
			busheldaffodil : {
				label : "Daffodil",
				type : "checkbox",
				"default" : false
			},
			bushelcotton : {
				label : "Cotton",
				type : "checkbox",
				"default" : false
			},
			bushelcranberry : {
				label : "Cranberry",
				type : "checkbox",
				"default" : false
			},
			bushelbellpepper : {
				label : "Bell Pepper",
				type : "checkbox",
				"default" : false
			},
			bushelpepper : {
				label : "Pepper",
				type : "checkbox",
				"default" : false
			},
			bushelmorningglory : {
				label : "Morning Glory",
				type : "checkbox",
				"default" : false
			},
			bushelpineapple : {
				label : "Pineapple",
				type : "checkbox",
				"default" : false
			},
			bushelpattypan : {
				label : "Pattypan Squash",
				type : "checkbox",
				"default" : false
			},
			bushelblueberry : {
				label : "Blueberry",
				type : "checkbox",
				"default" : false
			},
			bushelwatermelon : {
				label : "Watermelon",
				type : "checkbox",
				"default" : false
			},
			bushelgrape : {
				label : "Grape",
				type : "checkbox",
				"default" : false
			},
			bushelpinkrose : {
				label : "Pink Rose",
				type : "checkbox",
				"default" : false
			},
			bushelpotato : {
				label : "Potato",
				type : "checkbox",
				"default" : false
			},
			bushelcorn : {
				label : "Corn",
				type : "checkbox",
				"default" : false
			},
			bushelsunflower : {
				label : "Sunflower",
				type : "checkbox",
				"default" : false
			},
			bushelcabbage : {
				label : "Cabbage",
				type : "checkbox",
				"default" : false
			},
			bushelredwheat : {
				label : "Red Wheat",
				type : "checkbox",
				"default" : false
			},
			bushellavender : {
				label : "Lavender",
				type : "checkbox",
				"default" : false
			},
			bushelsugarcane : {
				label : "Sugar Cane",
				type : "checkbox",
				"default" : false
			},
			bushelonion : {
				label : "Onion",
				type : "checkbox",
				"default" : false
			},
			bushelbroccoli : {
				label : "Broccoli",
				type : "checkbox",
				"default" : false
			},
			bushellily : {
				label : "Lily",
				type : "checkbox",
				"default" : false
			},
			bushelacornsquash : {
				label : "Acorn Squash",
				type : "checkbox",
				"default" : false
			},
			bushelasparagus : {
				label : "Asparagus",
				type : "checkbox",
				"default" : false
			},
			bushelcucumber : {
				label : "Cucumber",
				type : "checkbox",
				"default" : false
			},
			busheliris : {
				label : "Iris",
				type : "checkbox",
				"default" : false
			},
			bushelbasil : {
				label : "Basil",
				type : "checkbox",
				"default" : false
			},
			bushelginger : {
				label : "Ginger",
				type : "checkbox",
				"default" : false
			},
			bushel : {
				label : "Unknown",
				type : "checkbox",
				"default" : false
			}
		}
	},
	checkallbushel : {
		label : "Check All",
		type : "button",
		script : function() {
		var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_5", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
		for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = true;
		},
		kids : {
			uncheckallbushel : {
				label : "Uncheck All",
				type : "button",
				script : function() {
					var boxes = $g(".//input[@type='checkbox']", {type:6, node:$("section_kids_5", $("GM_config").contentDocument), doc:$("GM_config").contentDocument});
					for(var i=0,box; (box=boxes.snapshotItem(i)); i++) box.checked = false;
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
	
	filteronly : {
		label : "Run only on "+main.gameName+"		filter page?",
		type : "checkbox",
		"default" : false
	},
	colorcode : {
		label : "Color Code Item Posts?",
		type : "checkbox",
		"default" : true
	},
	autolike : {
		label : "Auto \"like\" clicked posts? (buggy; use at own risk)",
		type : "checkbox",
		"default" : false
	},
	similarposts : {
		label : "Autoclick \"Show Similar Posts\" links?",
		type : "checkbox",
		"default" : true
	},
	status : {
		label : "Show debug status bar?",
		type : "checkbox",
		"default" : true
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
		label : "Minimum number of posts to show",
		type : "select",
		options : {
			off : "Off",
			5 : "5",
			10 : "10",
			20 : "20",
			30 : "30",
			40 : "40",
			50 : "50"
		},
		"default" : "off"
	},
	maxposts : {
		label : "Maximum number of posts to process",
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
	removedone : {
		label : "Hide finished items from feed?",
		type : "checkbox",
		"default" : false,
		title : "Helps keep browser memory low. BUT, keep the minimum posts feature OFF."
	},
	maxrequests : {
		section : ["Advanced Tech Options"],
		label : "Max simultaneous requests",
		type : "float",
		"default" : 3,
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
		"default" : false,
		title : "This will show the requests frame and other dev features."
	},
	reset : {
		label : "Reset Accepted Items",
		type : "button",
		script : main.resetAccepted,
		kids : {
			update : {
				label : "Check for Update",
				type : "button",
				script : main.update
			}
		}
	}
},

// Custom styling for the options interface
"body {color:#005500 !important; margin:0 !important; background:transparent url('"+imgs.bg+"') !important;}\n"+
".section_header {background:#FFFFCC !important; color: #BB0000 !important; display:block;}\n"+
".section_header_holder {padding:0 6px 0 6px !important; margin-top:8px !important;}\n"+
".field_label {font-size:11px !important;}\n"+
"span>label.field_label {margin-right:3px !important;}\n"+
"#header {font-size:18px !important;}\n"+
"span.config_var {display:inline !important; margin-left:14px !important;}\n"+
"#resetLink {color: #005500 !important; margin-right:6px !important;}"+
"#saveBtn, #cancelBtn {position:fixed; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+
"#saveBtn {color: #5B9337 !important; bottom:4px; right:80px;}\n"+
"#cancelBtn {color: #BB0000 !important; bottom:4px; right:6px;}\n"+
"input[type=\"text\"] {text-align: center !important;width: 34px !important; color: #005500 !important; background-color: #99CCFF !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}"
);

if(GM_config.get("filteronly") && main.realURL.find("filter=app_"+main.gameID)) GM_addStyle("#contentArea *[id*=\"_story_\"]:not([class*=\"aid_"+main.gameID+"\"]):not([id*=\"_collapsed\"]) {display:none !important;}");

// add options shortcut to user script commands
try {GM_registerMenuCommand(main.gameName+" Wall Manager "+version+" Options", main.config);}catch(e){}

var debug = GM_config.get("debug");
if(debug === true) {
GM_config.set("maxrequests", 1);
GM_config.set("reqtimeout", 9999);
GM_config.set("arinterval", "off");
GM_config.set("removedone", false);
}
// add div that holds the iframes for requests
if(!$("silent_req_holder")) document.body.appendChild(main.create("div", {id:"silent_req_holder", textContent:"Double-click HERE to hide this debug frame.", style:"position:fixed; top:0; left:0; z-index:9998; overflow: hidden;"+((debug === false || typeof debug != "boolean") ? " height:1px; width:1px; border:0; background:transparent;" : "height:80%; width:95%; border:5px ridge #00FF00; background: #FFFFFF;"), ondblclick:function(e){e.target.style.display="none";}}));

// Method to work on multiple accounts
var prof = $("navAccountName") || document.evaluate(".//a[.='Profile' or .='Profilo' or .='Profiel' or .='Profil' or .='Perfil']", ($("pageNav") || document.body), null, 9, null).singleNodeValue;
main.profile = prof.href.find("id=") ? prof.href.split("id=")[1].split("&")[0] : prof.href.match(main.profileRegex)[1];

// if on the homepage with the home feed showing
if($("pagelet_navigation") && (GM_config.get("filteronly")?main.realURL.find("filter=app_"+main.gameID):true)) {

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
"#"+main.streamID+" a[id^=\"item_\"] {color: #000000 !important;}" : "")+

(GM_config.get("removedone")===true ? "\n\n"+
".itemdone, .itemfailed {display: none !important;}" : "")
);

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
main.reqTO = Math.round(tempopts["reqtimeout"]*1000);
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
document.body.appendChild(main.create("div", {id:"status",style:"position: fixed; bottom: 4px; left: 4px; padding:2px; background: #FFFFFF; color: #000000; border: 1px solid #4F4F4F; font-family: arial, verdana, sans-serif; font-size: 1em; z-index: 99998; width: 192px; text-align: center;",textContent:"["+main.gameAcronym+"] 0 requests currently (0 done)", onclick:function(e){
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
if(opts["removedone"] == true && opts["minposts"] != "off") { // 'min posts' and 'hide finished items' are on
GM_config.set("minposts", "off"); main.opts["minposts"] = "off";
GM_config.save();
alert("Error:\n\nThe 'minimum posts' option cannot be on while the 'hide finished items' option is on because it will cause an infinite loop of clicking the 'Older Posts' link.\n\nThe 'minimum posts' option has been turned off.");
}
if(opts["minposts"] != "off" && opts["maxposts"] != "off" && parseInt(opts["minposts"])>parseInt(opts["maxposts"])) { // 'min posts' is higher than 'max posts'
GM_config.set("minposts", "off"); main.opts["minposts"] = "off";
GM_config.set("maxposts", "off"); main.opts["maxposts"] = "off";
GM_config.save();
alert("Error:\n\nThe 'minimum posts' option is higher than the 'maximum posts' option.\n\nBoth the 'minimum posts' and 'maximum posts' options have been turned off.");
}
opts=null;

// make script run every second, update debug bar, and click similar posts links
var runint = window.setInterval(function(e){
switch(main.opts["status"] == true) {case true: main.status(); break;}
window.setTimeout(function(){main.run();},0);
switch(main.opts["similarposts"] == true) {case true: main.similarPosts(); break;}
switch(main.opts["minposts"] != "off") {case true: main.expand(); break;}
},1000);

// add autorefresh if enabled
if(main.opts["arinterval"] != "off") window.setTimeout(main.refresh, main.refTime);
} else if(document.title=="Problem loading page") main.refresh();

// add another shortcut to the config, this time as a link on the page
var iOp=0, opInt = window.setInterval(function() {
var na = $("navAccount");
var f = $(main.navIDnf),
	a = (na != null ? na.getElementsByTagName("ul")[0] : null),
	link1 = main.create("li", {id:main.navID+"_"+main.gameAcronym.toLowerCase()+"_1"}, new Array(
main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
	main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:imgs.icon}))),
	main.create("span", {textContent:main.gameAcronym+" "+version+" Options"}))))),
	link2 = main.create("li", {id:main.navID+"_"+main.gameAcronym.toLowerCase()+"_2"}, new Array(
main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
	main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:imgs.icon}))),
	main.create("span", {textContent:main.gameAcronym+" "+version+" Options"})))));
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
window.removeEventListener("keydown", main.keyDownFunc, false);
main=null; GM_config=null; iOp=null; opInt=null; runInt=null; prof=null; GM_addStyle=null; $=null; imgs=null; unsafeWindow=null; version=null; isGM=null; $g=null; debugFrameShow=null;
}, false);

})(); // anonymous function wrapper end