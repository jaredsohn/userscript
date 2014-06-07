// ==UserScript==
// @name           FarmVille Wall Manager cz
// @namespace      http://userscripts.org/scripts/source/71478
// @description    Manages farmville wall posts; accepts bonuses, grabs bouquets, adopts animals, hatches eggs, and more
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @copyright      JoeSimmons + WebTuning.cz
// @version        1.2.174
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==

var version = "1.2.174"; // cant use cdata+regexp to grab version dynamically because of webkit

/*
The changelog is now on the main script page
http://userscripts.org/scripts/show/62135
*/

if(window.top && window.location != window.top.location) return;

var imgs = {
bg : "http://i45.tinypic.com/raq4x3.png",
logo : "http://fbplugin.web-tuning.cz/neplugik/fvwm.png",
icon : "http://i45.tinypic.com/a17s52.gif"
};

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
r = document.evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
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
		obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(obj.create('style',{type:'text/css',textContent:obj.css.basic+obj.css.stylish}));

		// Add header and title
		frameBody.appendChild(obj.create('div', {id:'header',className:'config_header block center', innerHTML:obj.title}));

		// Append elements
		var anch = frameBody, secNo = 0; // anchor to append elements
		for (var i in settings) {
			var type, field = settings[i], value = obj.values[i];
			if (field.section) {
				anch = frameBody.appendChild(create('div', {className:'section_header_holder', kids:new Array(
				  create('div', {className:'section_header center',innerHTML:field.section[0]})),
				  id:'section_'+secNo}));
				if(field.section[1]) anch.appendChild(create('p', {className:'section_desc center',innerHTML:field.section[1]}));
				secNo++;
			}
			anch.appendChild(GM_config.addToFrame(field, i, false));
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
 save: function(store, obj) {
    try {
      var val = JSON.stringify(obj||GM_config.values);
      (GM_config.isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))((store||GM_config.storage),val);
    } catch(e) {
      GM_config.log("GM_config failed to save settings!");
    }
 },
 read: function(store) {
    try {
      var val = (GM_config.isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))((store||GM_config.storage), '{}'), rval;
      rval = JSON.parse(val);
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
            var value = typeof stored[i] == "undefined" ? (typeof set['default'] == "undefined" ? null : set['default']) : stored[i];
            
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
 remove: function(el) { if(el && el.parentNode) el.parentNode.removeChild(el); }
}; // end gm config

// boolean to tell if the browser is running Greasemonkey or not
var isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined');

var main = {

// random assortment of vars
paused : false,
pauseClick : false,
boxFull : false,
pauseCount : 0,
profile : "",

// Changeable vars for adaptation to other games (ease of use)
streamID : "contentArea",
gameID : "102452128776", // game id
gameURLpart : "onthefarm", // game url folder for apps.facebook.com/HERE/ (only some games have this)
whitelistWhenPaused : ",bonus,raising,fuel", // categories separated by commas to be accepted even if gift box is full
gameName : "FarmVille",
gameAcronym : "FVWM",
gameKeyUrlKeyword : "key", // used in the regex and xpath to look for "key=" or "sk=" or whatever it may be
xpQueryTextExcludes : ["Fertilize their", "Give item to"],

// empty options object for later modification
opts : {},

// all regexps are stored here
whichRegex : /(decoration|bonus|hatch|adopt|bouquet|perfect bunch|present|fuel|help|collectible|get materials|horse|valentine|claim|some|gold)/,
ampRegex : /&amp;/g,
spaceRegex : /\s+/g,
colorRegex : /(baby|brown|pink|pink patch|black|kelly green|green|white|gray)/,
animalRegex : /(cow|turtle|turkey|sheep|kitten|duckling|rabbit|bull|calf|penguin|kitty|horse)/,
eggRegex : /(?:premium |uncommon |rare |treasured )?(white|brown|black|golden)( mystery eggs)/,
keyRegex : null, // will be changed after main is defined - bug
nRegex : /\n+/g,
phpRegex : /#\/.*\.php/,
profileRegex : /facebook\.com\/([^?]+)/i,

// all texts for accepted items
accText : {
			bonus : "Got this bonus!",
			xp : "Got this free XP!",
			raising : "Did this raising!",
			hatch : "Hatched this egg!",
			adopt : "Adopted this animal!",
			bouquet : "Got this bouquet!",
			present : "Got this present!",
			box : "Got this mystery present!",
			fuel : "Got this fuel!",
			collectible : "Got this collectible!",
			collectibleuncommon : "Got this uncommon collectible!",
			collectiblerare : "Got this rare collectible!",
			materialsstable : "Got stable materials!",
			materialsmaison : "Got maison materials!",
			valentine : "Got this valentine!",
			claimvalentine : "Got this valentine item!",
			gold : "Got this gold!",
			claimgold : "Got this St.Patty's item!",
			decoration : "Got this decoration!",
			farmhands : "Got this farmhand!",
			arborists : "Got this arborist!"
		},

// Created by avg, modified by JoeSimmons. shortcut to create an element
create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) c.forEach(function(e) { ret.appendChild(e); });
	return ret;
},

// cross-browser log function
log: ((isGM) ? GM_log : ((window.opera) ? opera.postError : console.log)),

// click something
click : function(e, type) {
if(!e && typeof e=='string') e=document.getElementById(e);
if(!e) {return;}
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
},

// remove something from the page
remove : function(e) {
var node = (typeof e=='string') ? $(e) : e;
if(node) node.parentNode.removeChild(node);
},

// get what type of item it is
which : function(e) {
var w=e.textContent.toLowerCase().match(main.whichRegex), text=e.parentNode.parentNode.parentNode.textContent;
w = (w!=null) ? w[1] : "none";
switch(w) {
case "get materials": w="materials"+(text.find("Maison")?"maison":"stable"); break;
case "some": w=(e.textContent.find("Gold")?"gold":"fuel"); break;
case "collectible": w+=(text.find("Rare")?"rare":(text.find("Uncommon")?"uncommon":"")); break;
case "perfect bunch": w="bouquet"; break;
case "present": if(text.find("unwrapped")) w="box"; break;
case "claim": if(text.find("Gold pieces")) w="claimgold";
				else if(text.find("Valentines for")) w="claimvalentine"; break;
case "help": if(text.find("XP")) w="xp";
				else if(text.find("raising")) w="raising";
				else if(text.find("Arborists")) w="arborists";
				else if(text.find("Farmhands")) w="farmhands";
				else w="bonus"; break;
case "bonus": if(text.find("Valentines")) w="valentine";
				else if(text.find("Gold pieces")) w="gold"; break;
}
return w;
},

// get which color an animal is
whichColor : function(e) {
var w=e.toLowerCase().match(main.colorRegex);
w = (w!=null) ? w[1] : "";
switch(w) {
case "baby": w="white"; break;
case "pink patch": w="pinkpatch"; break;
case "kelly green": w="kellygreen"; break;
}
return w;
},

// get which animal it is
whichAnimal : function(e) {
var w=e.toLowerCase().match(main.animalRegex), color=main.whichColor(e.toLowerCase());
w = (w!=null) ? w[1] : "unknown";
switch(w=="unknown") {case false: w += color; break;}
return w;
},

// get which color egg it is
whichEgg : function(e) {
var w=e.replace(main.nRegex,"").toLowerCase().match(main.eggRegex);
w = (w!=null) ? w[1] : "none";
switch(w) {
case "golden": w="gold"; break;
}
switch(w=="none") {case false: w="hatch"+w; break;}
return w;
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

// get the accepted items' times they were accepted
getAcceptedTime : function() {
return (new Function("return "+((isGM?GM_getValue:(function(name,def){var s=localStorage.getItem(name); return s==null||s=="undefined"?def:s;}))(main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile, "({})"))+";"))();
},

// save the accepted items' times they were accepted
setAcceptedTime : function(e) {
var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile;
(isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(store,val);
},

// reset the accepted items
resetAccepted : function() {
if(confirm("Really reset accepted items?")) window.setTimeout(function(){
var reset=(isGM?GM_deleteValue:(function(name,def){return localStorage.setItem(name)}));
reset(main.gameAcronym.toLowerCase()+"_accepted_"+main.profile, "({})");
reset(main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile, "({})");
}, 0);
},

// get the accepted items
getAccepted : function() {
return (new Function("return "+((isGM?GM_getValue:(function(name,def){var s=localStorage.getItem(name); return s==null||s=="undefined"?def:s;}))(main.gameAcronym.toLowerCase()+"_accepted_"+main.profile, "({})"))+";"))();
},

// save the accepted items
setAccepted : function(e) {
var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_accepted_"+main.profile;
(isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(store,val);
},

// get number of current requests
get currReqs() {
return $g("count(.//iframe)",{node:$("silent_req_holder"),type:1});
},

// generate a refresh time
get refTime() {
var t=2;
switch(GM_config.get("arinterval")) {
case "half": t=0.5; break;
case "one": t=1; break;
case "two": t=2; break;
case "three": t=3; break;
case "four": t=4; break;
case "five": t=5; break;
case "ten": t=10; break;
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

// auto click "like" buttons if enabled
like : function(id) {
var like=$g("//a[@id='"+id+"']/ancestor::span/button[@name='like' and @type='submit']", {type:9});
if(like) like.click();
},

// show config screen
config : function() {
if(main.currReqs==0) GM_config.open();
	else window.setTimeout(main.config, 250);
},

similarPosts : function() {
// Auto click "show x similar posts" links
var similarposts=$g(".//a[@rel='async' and contains(@href,'oldest=') and contains(@href,'newest=') and contains(@href,'expand_story_uid=')]", {node:$(main.streamID)});
var i=0, l=similarposts.snapshotLength;
if(l==0) return;
do {
main.click(similarposts.snapshotItem(i));
} while(++i < l);
},

// refresh function. be sure to only do it if the config isn't up, it isn't paused, and requests are finished
refresh : function(bypass) {
if(!main.paused && !$("GM_config") && main.currReqs==0) {
window.setTimeout(function(main) {
if(main.currReqs==0) window.location.replace(GM_config.get("filteronly")?"http://www.facebook.com/home.php?filter=app_"+main.gameID+"&show_hidden=true&ignore_self=true":main.realURL);
}, (bypass||3000), main);
} else window.setTimeout(main.refresh, (main.currReqs==0?1:main.currReqs)*1000);
},

// update debug status box
status : function() {
switch(main.pauseCount) {
case 0: if(!main.pauseClick) main.paused=false; break;
}
var statusText = !main.boxFull ? (!main.paused?"["+main.gameAcronym+"] "+main.currReqs+" requests currently.":(!main.pauseClick?("["+main.pauseCount+"] "):"")+"[PAUSED] Click this box to unpause") : "[STOPPED] Gift box is full - Refresh to restart";
document.title=statusText;
$("status").textContent = statusText;
if(!main.pauseClick && main.paused && main.pauseCount>0) main.pauseCount--;
},

// load an item url
open : function(url, key, w) {
// make sure to stay under the gift box limit but still get all items that don't go into the gift box
if((main.paused && !(main.whitelistWhenPaused.find(","+w))) || (main.opts["maxrequests"]-main.currReqs) == 0) {
return; 
}
$("silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, id:key, style:"display:none;visibility:hidden;width:0;height:0;", onload:function(e) {
var doc=e.target.contentDocument, w=e.target.getAttribute("which"), key=e.target.getAttribute("id"), acc=main.getAccepted(), accTime=main.getAcceptedTime(), item=$("item_"+key);
if(!doc.body.textContent.find("bits got lost on the way to your computer") && !$("errorPageContainer",doc)) {
accTime[w][key] = new Date().getTime();
main.setAcceptedTime(accTime);
acc[w].push(key);
main.setAccepted(acc);
item.setAttribute("id", "item_done_"+key);
item.textContent = main.accText[w] || "Got this!"; // change text, or use a backup default
main.remove(key);

// auto click "like" if enabled
if(main.opts["autolike"]) main.like("item_done_"+key);
} else main.remove(key);
if(doc.URL.find("max_gift") || doc.body.textContent.find("gift box is full")) { // auto-pause when signal received of a full gift box
main.boxFull =  true;
main.pauseClick = true;
main.paused = true;
$("status").style.backgroundColor = "#FF0000";
$g("//div[@id='silent_req_holder']/iframe", {del:true});
}
}}));
window.setTimeout(main.remove, Math.round(main.opts["reqtimeout"]*1000), key);
},

// core function. this loops through posts and loads them
run : function() {
if($("GM_config") || main.currReqs >= main.opts["maxrequests"]) {return;}
		var opts=main.opts, wallposts=$g(".//a[contains(@href,'"+main.gameURLpart+"') and not(starts-with(@id,'item_done_')) and contains(@href,'"+main.gameKeyUrlKeyword+"=') and not(contains(.,'"+main.xpQueryTextExcludes.join("')) and not(contains(.,'")+"'))]", {type:7, node:$(main.streamID)});
		if(wallposts.snapshotLength==0) {return;}
		var open=main.open, accText=main.accText, getKey=main.getKey,
			which=main.which, whichAnimal=main.whichAnimal, whichEgg=main.whichEgg, acc=main.getAccepted(), accTime=main.getAcceptedTime();

// loop through and grab stuff
var ssi=wallposts.snapshotItem, i=0, len=wallposts.snapshotLength;
do {
	var item=wallposts.snapshotItem(i), key = getKey(item.href), w = which(item), wA=whichAnimal(item.textContent);
switch(w) {
case "horse": w="adopt"; wA="grayhorse"; break;
}
try {
if(w!="none" && !acc[w]) {
acc[w] = new Array();
main.setAccepted(acc);
}
if(w!="none" && !accTime[w]) {
accTime[w] = {};
main.setAcceptedTime(accTime);
}
} catch(e) {
if(acc[w]=="undefined") {
acc[w] = new Array();
main.setAccepted(acc);
}
if(accTime[w]=="undefined") {
accTime[w] = {};
main.setAcceptedTime(accTime);
}
}
if(w!="none") switch(acc[w].inArray(key)) {
case false: if(!$(key)) {
	item.setAttribute("id", "item_"+key);
	switch(w) {
	case "adopt": if(opts[wA]) open(item.href, key, w); break; // open request in iframe
	case "hatch": if(opts[whichEgg(item.parentNode.parentNode.parentNode.textContent)]) open(item.href, key, w); break; // open request in iframe
	default: switch(opts[w]) {case true: open(item.href, key, w); break;} // open request in iframe
	}
} break;
default: item.textContent = accText[w] || "Got this!"; // change text, or use a backup default
}
} while (++i < len);
}
};
main.keyRegex = new RegExp("&(?:amp;)?"+main.gameKeyUrlKeyword+"=([^&]+)", "i");

if($("navigation_item_nf")) { // run script if on homepage

// pre-load the config
GM_config.init("<img src='"+imgs.logo+"'> v"+version, {
	bonus : {
		section : [
		"Manager Options"
		],
		label : "Accept Bonuses?",
		type: "checkbox",
		"default" : false,
		kids : {
			xp : {
				label : "Get free XP?",
				type : "checkbox",
				"default" : false
			}
		}
	},
	raising : {
		label : "Do barn raisings?",
		type : "checkbox",
		"default" : false
	},
	hatchwhite : {
		label : "White egg?",
		type: "checkbox",
		"default" : false,
		kids : {
			hatchbrown : {
				label : "Brown egg?",
				type : "checkbox",
				"default" : false
			},
			hatchblack : {
				label : "Black egg?",
				type : "checkbox",
				"default" : false
			},
			hatchgold : {
				label : "Gold egg?",
				type : "checkbox",
				"default" : false
			}
		}
	},
	unknown : {
		label : "Adopt unrecognized animals?",
		type: "checkbox",
		"default" : false
	},
	bouquet : {
		label : "Get Bouquets?",
		type: "checkbox",
		"default" : false
	},
	fuel : {
		label : "Get Free Fuel?",
		type: "checkbox",
		"default" : false
	},
	present : {
		label : "Get Presents?",
		type: "checkbox",
		"default" : false
	},
	collectible : {
		label : "Get collectibles?",
		type: "checkbox",
		"default" : false,
		kids : {
			collectibleuncommon  : {
				label : "Get uncommon collectibles?",
				type: "checkbox",
				"default" : false
			},
			collectiblerare  : {
				label : "Get rare collectibles?",
				type: "checkbox",
				"default" : false
			}
		}
	},
	materialshorse : {
		label : "Get stable materials?",
		type: "checkbox",
		"default" : false,
		kids : {
			materialsmaison : {
				label : "Get maison materials?",
				type: "checkbox",
				"default" : false
			}
		},
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
	gold :  {
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
	decoration : {
		label : "Get maison decoration items?",
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
	cow : {
		section : [
		"Specific Animal Adoption"
		],
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
			calfpinkpatch : {
				label : "Pink Patch Calf",
				type : "checkbox",
				"default" : false
			},
			calfbrown : {
				label : "Brown Calf",
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
			}
		}
	},
	kittenwhite : {
		label : "White Kittens",
		type : "checkbox",
		"default" : false,
		kids : {
			kittenblack : {
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
	arinterval : {
			section : [ "Other Options" ],
			label : "Auto Refresh",
			type : "select",
			options : {
				off : "Off",
				half : "30 seconds",
				one : "1 minute",
				two : "2 minutes",
				three : "3 minutes",
				four : "4 minutes",
				five : "5 minutes",
				ten : "10 minutes"
			},
			"default" : "2 minutes"
	},
	
	filteronly : {
		label : "Run only on "+main.gameName+"		filter page?",
		type : "checkbox",
		"default" : false
	},
	autolike : {
		label : "Auto \"like\" clicked posts?",
		type : "checkbox",
		"default" : false
	},
	status : {
		label : "Show debug status bar?",
		type : "checkbox",
		"default" : true
	},
	reqtimeout : {
		label : "Item Acceptance Page Timeout (seconds)",
		type : "float",
		"default" : 30
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
	maxrequests : {
		label : "Max simultaneous requests",
		type : "float",
		"default" : 1,
		title : "WARNING: ONLY 1 IS RECOMMENDED UNLESS YOU WANT TO RISK BEING BANNED."
	},
	reset : {
		label : "Reset Accepted Items",
		type : "button",
		script : main.resetAccepted
	}
},

// Custom styling for the options interface
"body {color:#EEEEEE !important; margin:0 !important; background:transparent url('"+imgs.bg+"') !important;}\n"+
".section_header {background:#333333 !important;}\n"+
".section_header_holder {padding:0 6px 0 6px !important; margin-top:8px !important;}\n"+
".field_label {font-size:11px !important;}\n"+
"span>label.field_label {margin-right:3px !important;}\n"+
"#header {font-size:18px !important;}\n"+
"span.config_var {display:inline !important; margin-left:14px !important;}\n"+
"#saveBtn, #cancelBtn {position:fixed; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+
"#saveBtn {color: #5B9337 !important; bottom:4px; right:80px;}\n"+
"#cancelBtn {color: #BB0000 !important; bottom:4px; right:6px;}\n"+
"input[type=\"text\"] {text-align: center !important;width: 34px !important; color: #CCCCCC !important; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}"
);

// add options shortcut to user script commands
GM_registerMenuCommand(main.gameName+" Wall Manager "+version+" Options", main.config);

// add div that holds the iframes for requests
document.body.insertBefore(main.create("div", {id:"silent_req_holder",style:"display:none;visibility:hidden;width:0;height:0;"}), document.body.firstChild);

// Method to work on multiple accounts
var prof=document.evaluate("//a[@href and .='Profile']", document, null, 9, null).singleNodeValue;
if(prof) main.profile = prof.href.find("id=") ? prof.href.split("id=")[1].split("&")[0] : prof.href.match(main.profileRegex)[1];

// if on the homepage with the home feed showing
if($("navigation_item_nf") && (GM_config.get("filteronly")?main.realURL.find("filter=app_"+main.gameID):true)) {

// method to speed up script considerably
var tempopts={}, settings=GM_config.settings;
for(var thing in settings) { // go through the options making cached options copy
var g=GM_config.get(thing), kids=settings[thing].kids;
switch(typeof g) {
case "boolean": tempopts[thing] = g ? true : false; break;
case "number": tempopts[thing] = g || 0; break;
case "text": tempopts[thing] = g || ""; break;
default: tempopts[thing] = g;
}
if(kids && typeof kids=="object") for(var kid in kids) { // go through the extended settings also
var k=GM_config.get(kid);
switch(typeof k) {
case "boolean": tempopts[kid] = k ? true : false; break;
case "number": tempopts[kid] = k || 0; break;
case "text": tempopts[kid] = k || ""; break;
default: tempopts[kid] = k;
}
}
}
main.opts = tempopts; tempopts=null; k=null; g=null;

// another method to speed up - keep about:config clean
var acc=main.getAccepted(), accTime=main.getAcceptedTime(), timeNow=new Date().getTime();
for(var w in accTime) {
var accTimew=accTime[w], accw=acc[w];
for(var k in accTimew) { // loop through the accepted items' times
var days=(timeNow - accTimew[k]) / 1000 / 60 / 60; // get the existance time in hours
if(days > 48 && accw.inArray(k)) { // an old accepted item is over 48 hours (2 days) old
accw.splice(accw.inArrayWhere(k), 1); // remove from accepted items array
delete accTimew[k]; // remove from time object
}
}
}
main.setAccepted(acc);
main.setAcceptedTime(accTime);

// add debug status bar to page
document.body.appendChild(main.create("div", {id:"status",style:"position: fixed; bottom: 4px; left: 4px; padding: 4px; background: #FFFFFF; color: #000000; border: 1px solid #4F4F4F; font-family: arial, verdana, sans-serif; font-size: 1em; z-index: 99998; width: 156px; text-align: center;",textContent:"["+main.gameAcronym+"] 0 requests currently.", onclick:function(e){
if(main.boxFull) return;
main.paused = !main.paused;
main.pauseClick = true;
main.pauseCount = main.opts["inputtimeout"] || 15;
main.status();
}}));

// listen for key presses to autopause, if enabled
if(GM_config.get("inputtimeoutenable")) {
window.addEventListener("keydown", function(e) {
if(",9,18,33,34,35,36,37,38,39,40,116".find(","+e.keyCode) || (main.paused && main.pauseClick)) return;
main.paused=true;
main.pauseClick=false;
main.pauseCount = main.opts["inputtimeout"] || 15;
main.status();
}, false);
}

// make script run every second, update debug bar, and click similar posts links
window.setInterval(function(e){
window.setTimeout(function(){main.run();},0);
switch(main.opts["status"]) {case true: main.status(); break;}
main.similarPosts();
},1000);

// add autorefresh if enabled
if(GM_config.get("arinterval") != "off") window.setTimeout(main.refresh, main.refTime);
} else if(document.title=="Problem loading page") main.refresh();

// add another shortcut to the config, this time as a link on the page
var f=$g("//li[starts-with(@id, 'navigation_item_')]", {type:9});
if(f) {
f.parentNode.appendChild(main.create("li", {id:"navigation_item_"+main.gameAcronym.toLowerCase()}, new Array(
main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
	main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:imgs.icon}))),
	main.create("span", {textContent:main.gameAcronym+" "+version+" Options"})
))
)));
}

// pre-load images
for(var img in imgs) new Image().src = imgs[img];
}