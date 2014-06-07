// ==UserScript==
// @name           Country Life Sharing
// @namespace      http://userscripts.org/users/85536
// @description    Country Life Easy Share
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @copyright      Bronx AnarchY
// @version        0.0.20
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=56379
// ==/UserScript==

var version = "1.1.21",
	enableInGalleries = false; // for fb url cleaner

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
};

// by Jordon Kalilich  http://userscripts.org/users/4093
// can't @require on chrome so I included this in the script
function checkURL(event) {
   if (reg.test(location.href)) {
      if (!(/photo\.php.*#.*photo\.php/i.test(location.href)) || enableInGalleries) { // thanks, discrete structures
         document.removeEventListener('DOMNodeInserted', checkURL, true); // we need to remove the event listener or we might cause an infinite loop apparently
         location.replace(location.href.replace(reg, '$1$3'));
      }
   }
}
if (/\.facebook\.com$/i.test(location.hostname)) {
   var reg = /^(https?:\/\/([-a-z0-9]+\.)*facebook\.com)\/[^#]*#!(\/.*)/i;
   document.addEventListener('DOMNodeInserted', checkURL, true);
}

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

try {
if(unsafeWindow.frameElement!=null && (top||parent|window).location!=location) return;
} catch(e) {}

GM_config.init("Country Life Share "+version+" Options", {
	status : {
		section : ["Main Options"],
		label : "Show debug status bar",
		type: "checkbox",
		"default" : true
	},
	box : {
		label : "Show 2 specific selection boxes on the right",
		type : "checkbox",
		"default" : true
	},
	tygift : {
		label : "Send thank you gifts if possible",
		type : "checkbox",
		"default" : true
	},
	blacklist : {
		label : "Application ID Blacklist (separated by lines)",
		title : "Application IDs put here don't get checkboxes beside their requests.",
		type : "textarea",
	},
	debug : {
		section : [ "Advanced" ],
		label : "Enable Debug Mode",
		type : "checkbox",
		"default" : false
	}
});

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\*\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

var main = {

// Created by avg, modified by JoeSimmons
create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) {
	if(prop.indexOf("on")==0 && typeof b[prop]=="function") ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop.indexOf("on")==0 && typeof b[prop]=="string") ret.setAttribute(prop, b[prop]);
		else if(",style,accesskey,id,name,src,href,accepted,ckd,type".find(","+prop.toLowerCase())) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		}
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
},

remove : function(e) {
var node = (typeof e=='string') ? document.getElementById(e) : e;
if(node&&node.parentNode&&node.nodeType==1&&node.parentNode.nodeType==1) node.parentNode.removeChild(node)
},

debug : function(s) {
if(!$g("#debugT")) document.body.insertBefore(main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(document.createTextNode(s))), document.body.firstChild);
	else $g("#debugT").innerHTML+="\n\n\n\n"+s;
if($g("#debugT").style.display=="none") $g("#debugT").style.display="";
},

// click something
click : function(e, type) {
if(!e && typeof e=='string') e=document.getElementById(e);
if(!e) return;
var evObj = e.ownerDocument.createEvent('MouseEvents');
evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
},

// get() function by JoeSimmons
// Syntax: get('http://www.google.com/', handleResponse);
get : function(url, cb) {
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    //headers: {'Accept': 'application/atom+xml,application/xml,text/xml,text/html'},
    onload: function(r) {if(cb) cb(r);}
});
},

// post() function by JoeSimmons
// Syntax: post('https://www.google.com/accounts/ServiceLoginAuth?service=youtube', 'Email=thetenfold&Passwd=catsdogs', handleResponse);
post : function(url, data, cb) {
GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    headers: {
		'Content-type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html'
    },
	data: encodeURI(data),
    onload: function(r) {if(cb) cb(r);}
});
},

addGlobalStyle : function(css) {
	if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = main.create("style", {type:"text/css"});
    document.getElementsByTagName('head')[0].appendChild(style).innerHTML=css;
},

get realURL() {
var u=location.href,
host=location.host,
protocol=location.protocol+"//",
hash=location.hash;
if(hash!="" && /#!\/.*\.php/.test(hash)) u=protocol+host+hash.split("#")[1];
else if(hash!="" && hash.find("#")) u=u.split("#")[0];
return u;
},

get currReqs() {
return $g(".//iframe",{node:$g("#mass_accept_frame_holder")}).snapshotLength;
},

status : function(e) {
$g("#fvma_status").textContent = "[CTRLS] "+main.currReqs+" requests currently.";
},

onTyLoad : function(e) {
$(e.target.getAttribute("id")).removeEventListener("load", main.onTyLoad, false);
main.remove(e.target.getAttribute("id"));
},

onFrameLoad : function(e) {
	var key = e.target.getAttribute("id"), doc=e.target.contentDocument, frame = $(key),
		tygift = $g(".//div[starts-with(@id, 'app_content_')]//div[@class='thank_you_gift']//form[starts-with(@id, 'req_form_')]//input[@name='send' and (@type='button') or @type='submit']", {doc:doc, node:doc, type:9}),
		helpfriend = $g(".//a[@class='bpri_acceptButton']", {doc:doc, node:doc, type:9}),
		choose = $g(".//input[@name='send_gift' and @value='Choose' and @type='submit']", {doc:doc, node:doc, type:7});

	if(choose.snapshotLength > 0) {
		choose.snapshotItem(Math.round(Math.random()*choose.snapshotLength)).click();
		frame.removeEventListener("load", main.onFrameLoad, false);
		frame.addEventListener("load", main.onTyLoad, false);
	} else if(GM_config.get("tygift") === true && tygift) {
	try {
		frame.removeEventListener("load", main.onFrameLoad, false);
		frame.addEventListener("load", main.onTyLoad, false);
		main.click(tygift); // click the "Send thank you gift" button
		var intv = window.setInterval(function(e) {
			var send = $g(".//div[@id='pop_content']//input[@type='button' and @name='sendit']", {doc:doc, node:doc, type:9}),
				skip = $g(".//input[@name='skip_ci_btn']", {doc:doc, node:doc, type:9}),
				okay = $g(".//div[@id='pop_content']//input[@type='button' and @name='ok']", {doc:doc, node:doc, type:9});
			if(skip) { // skip button
				main.click(skip);
				window.clearInterval(intv);
			} else if(okay) {
				main.click(okay);
				window.clearInterval(intv);
			} else if(send) { // send button, brings up the skip button
				main.click(send);
			}
		}, 250);
	} catch(e) { alert(e); }
	} else if(helpfriend) {
		frame.removeEventListener("load", main.onFrameLoad, false);
		frame.addEventListener("load", main.onTyLoad, false);
		frame.src = helpfriend.href;
	} else main.remove(key);
},

open : function(url) {
	var id=Math.round(Math.random()*1000000).toString(), max_time = 30,
		mafh = $("mass_accept_frame_holder");
	mafh.appendChild(main.create("iframe", {src:url, id:id, style:"width:100%; height:100%;", onload:main.onFrameLoad}));
	window.setTimeout(main.remove, max_time * 1000, id);
},

actionsRegex : /actions\[([^\]]+)\]/,

checkall : function() {
	var array=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_')]");
	for(var i=0,item; (item=array.snapshotItem(i)); i++) {
		item.checked = true;
		item.setAttribute("ckd", "yes");
	}
},

uncheckall : function() {
	var array=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_')]");
	for(var i=0,item; (item=array.snapshotItem(i)); i++) {
		item.checked = false;
		item.setAttribute("ckd", "no");
	}
},

checkAccept : function() {
	var id = $("accept_select").options[$("accept_select").selectedIndex].value,
		type = $("accept_select_type").options[$("accept_select_type").selectedIndex].value,
		div = $g("//div"+(id != "all" ? "[contains(@id, '"+id+"') and contains(@class, 'mbl')]" : "[@id='contentArea']"), {type:7});

	for(var i=0, len=div.snapshotLength; i < len; i++) {
		var buttons = $g(".//ul[contains(@class, 'uiList') and contains(@class, 'requests')]/li[contains(@class, 'uiListItem')"+(type != "all" ? " and contains(., '"+type+"')" : "")+"]", {type:7, node:div.snapshotItem(i)});
		for(var x=0,button; (button=buttons.snapshotItem(x)); x++) if(button && button.nodeType == 1) {
			var check = $g(".//input[@type='checkbox' and starts-with(@id,'mass_accept_')]", {type:9, node:button});
			check.checked = true;
			check.setAttribute("ckd", "yes");
		}
	}
},

accept : function() {
		var total_max = 3; // maximum # of allowed requests
		if(main.currReqs >= total_max) {
			window.setTimeout(main.accept, 1000);
			return;
		}
		var maxSuddenRequests = total_max - main.currReqs,
			invites=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_') and @accepted='no' and @ckd='yes']"),
			max = invites.snapshotLength<maxSuddenRequests?invites.snapshotLength:maxSuddenRequests;
		for(var i=0,item; ((i<max) && (item=invites.snapshotItem(i))); i++) {
			var id=$g("#"+item.id.substring(12)),
				invite = $g(".//input[starts-with(@name, 'actions[http') and @type='submit' and @value and starts-with(@id, 'u')] | .//input[@name='actions[accept]' and @value='Confirm']",{type:9, node:id});
			if(item.checked && invite && invite.name != "actions[accept]") {
				var hidden=$g(".//input[@type='hidden' and @name and @value]", {type:7, node:id.parentNode}), othervars="";
				for(var x=0,op; (op=hidden.snapshotItem(x)); x++) if(op.name != "charset_test") othervars += op.getAttribute("name")+"="+op.getAttribute("value")+"&";
				othervars += invite.getAttribute("name") + "=" + invite.getAttribute("value");
				main.post("http://www.facebook.com/ajax/reqs.php", othervars);
				main.open(invite.name.match(main.actionsRegex)[1]);
				item.setAttribute("accepted", "yes");
				item.parentNode.parentNode.parentNode.removeChild(item.parentNode.parentNode);
			} else if(item.checked && invite && invite.name=="actions[accept]" && invite.value=="Confirm") invite.click();
		}
		if(max >= maxSuddenRequests) window.setTimeout(main.accept, 1000);
},

run : function() {

		if(!main.realURL.find("reqs.php")) return;
		
		var box = GM_config.get("box"), debugMode = GM_config.get("debug") === true; // debug mode, showing the reqs frame

		document.body.appendChild(main.create("div", {id:"mass_accept_div",style:"position:fixed; bottom:26px; right:200px;"},new Array(
			main.create('select', {id:"accept_select_type", size:"13", style:"width: 160px; display:"+(box===false ? " block;" : " none;"), ondblclick:main.checkAccept}, new Array(
				main.create("option", {value:"all", textContent:"All", selected:"yes"}),
				main.create("option", {value:"all", textContent:"------------------------------"}),
				main.create("option", {value:"all", textContent:"Below are FarmVille ONLY"}),
				main.create("option", {value:"all", textContent:"------------------------------"}),
				main.create("option", {value:"Special Delivery", textContent:"Special Delivery"}),
				main.create("option", {value:"Mystery Gift", textContent:"Mystery Gifts"}),
				main.create("option", {value:"m collecting') or contains(., 'm trying to') or contains(., 'm collecting') or contains(., 'working on') or contains(., 'help me out') or contains(., 'I need your help') or contains(., 'could really use your help", textContent:"Help Requests"}),
				main.create("option", {value:"Animal Feed", textContent:"Animal Feed"}),
				main.create("option", {value:"Farmhands", textContent:"Farmhands"}),
				main.create("option", {value:"Arborists", textContent:"Arborists"}),
				main.create("option", {value:"Seeds", textContent:"Seeds"}),
				main.create("option", {value:"Bottle", textContent:"Bottles"}),
				main.create("option", {value:"Lucky Penny", textContent:"Lucky Penny"}),
				main.create("option", {value:"Tree", textContent:"Trees"}),
				main.create("option", {value:"Watering Can", textContent:"Watering Cans"}),
				main.create("option", {value:"Brick') or contains(., 'Wooden Board') or contains(., 'Nail", textContent:"Bricks, Boards, Nails"}),
				main.create("option", {value:"Hammer') or contains(., 'Concrete') or contains(., 'Spool of Twine", textContent:"Hammer, Concrete, Spool of Twine"})
			)),
			main.create('select', {id:"accept_select", size:"12", style:"width: 160px; display:"+(box===false ? " block;" : " none;"), ondblclick:main.checkAccept}, new Array(
				main.create("option", {value:"all", textContent:"All", selected:"yes"}),
				main.create("option", {value:"event_invite", textContent:"Events"}),
				main.create("option", {value:"group_invite", textContent:"Group Invites"}),
				main.create("option", {value:"fbpage_fan_confirm", textContent:"Page Reqs"}),
				main.create("option", {value:"confirm_2318966938", textContent:"Causes"}),
				main.create("option", {value:"confirm_102452128776", textContent:"FarmVille"}),
				main.create("option", {value:"confirm_151044809337", textContent:"FishVille"}),
				main.create("option", {value:"confirm_163576248142", textContent:"PetVille"}),
				main.create("option", {value:"confirm_21526880407", textContent:"YoVille"}),
				main.create("option", {value:"confirm_10979261223", textContent:"MafiaWars"}),
				main.create("option", {value:"confirm_101539264719", textContent:"Cafe World"}),
				main.create("option", {value:"confirm_56748925791", textContent:"Farm Town"}),
				main.create("option", {value:"confirm_167746316127", textContent:"Zoo World"}),
				main.create("option", {value:"confirm_234860566661", textContent:"Treasure Isle"}),
				main.create("option", {value:"confirm_94483022361", textContent:"Island Paradise"}),
				main.create("option", {value:"confirm_163965423072", textContent:"Social City"}),
				main.create("option", {value:"confirm_26947445683", textContent:"Country Life"}),
				main.create("option", {value:"confirm_134920244184", textContent:"Happy Aquarium"}),
				main.create("option", {value:"confirm_44856213161", textContent:"Cupcake Corner"}),
				main.create("option", {value:"confirm_425755285303", textContent:"Birdland"}),
				main.create("option", {value:"confirm_101628414658", textContent:"Wild Ones"}),
				main.create("option", {value:"confirm_114335335255741", textContent:"City of Wonder"})
			)),
			main.create("input", {type:"button", value:"Check All", onclick:main.checkall}),
			main.create("input", {type:"button", value:"Uncheck All", onclick:main.uncheckall}),
			main.create("input", {type:"button", value:"Mass Accept", onclick:main.accept, style:"display: block;"}),
			main.create("input", {type:"button", value:"Options", onclick:GM_config.open, style:"display: block;"}),
			main.create("div", {id:"mass_accept_frame_holder",style:(debugMode===true ? "width:75%; height:60%; background: #FFFFFF; border:2px solid #000000;" : "width:1px; height:1px; background:transparent; border:0;")+" position:fixed; bottom:4px; left:4px; -moz-border-radius:6px; "})
		)));

		var accepts = new Array(),
			blacklist_entries = GM_config.get("blacklist").prepareRegex().replace(/^\s+|\s+$/g,"").replace(/\n+/g, "|"),
			blacklist = new RegExp("app_("+(blacklist_entries != "" ? blacklist_entries : "25287267406")+")_", "i"),
			id = $("accept_select").options[$("accept_select").selectedIndex].value,
			type = $("accept_select_type").options[$("accept_select_type").selectedIndex].value,
			div = $g("//div"+(id != "all" ? "[contains(@id, '"+id+"')]" : "[@id='contentArea']"), {type:7});
		
		for(var i=0, len=div.snapshotLength; i < len; i++) {
			var buttons = $g(".//ul[contains(@class, 'uiList') and contains(@class, 'requests')]/li[contains(@class, 'uiListItem')"+(type != "all" ? "and contains(., '"+type+"')" : "")+"]/form", {type:7, node:div.snapshotItem(i)});
			for(var x=0,button; (button=buttons.snapshotItem(x)); x++) if(button && button.nodeType == 1) accepts.push(button);
		}

		if(accepts.length > 0) for(var q=0, len=accepts.length; q < len; q++) if(accepts[q].offsetHeight > 0) {
			var item = accepts[q],
				acc=$g(".//input[starts-with(@name, 'actions[http') and @type='submit' and @value] | .//input[@name='actions[accept]' and @value='Confirm']", {type:9, node:item}),
				postID = $g(".//input[@name='status_div_id' and @value]", {type:9, node:item});
				if(postID == null) return;
					else postID = postID.value;
			if(!blacklist.test(postID)) {
				item.parentNode.insertBefore(main.create("div", {style:"display: block;"}, new Array(main.create("input",{type:"checkbox", id:"mass_accept_"+postID, accepted:"no", ckd:"no", style:"width: 2em; height: 2em;", onchange:function(e){this.setAttribute("ckd", (this.checked ? "yes" : "no"));}}))), item);
				if(acc) acc.parentNode.parentNode.insertBefore(main.create("a", {href:acc.name.match(main.actionsRegex)[1], textContent:"Accept with link", target:"_blank", style:"margin-right: 10px;"}), acc.parentNode);
			}
		}

		if(GM_config.get("status") === true) {
			document.body.insertBefore(main.create("div", {id:"fvma_status",style:"position:fixed; bottom:20px; left:2px; padding:2px 8px; color:#000000; background-color:#FFFFFF; font-family: arial, verdana, sans-serif; font-size:1em; z-index:99998; border:1px solid #000000;",textContent:"[FBMAR] 0 requests currently."}), document.body.firstChild);
			window.setInterval(main.status, 1000); // update status every second
		}
}

};

function hideFinished() {
	// Delete ignored requests
	$g("//div[@id='contentArea']//ul[contains(@class, 'uiList') and contains(@class, 'requests')]/li[contains(@class, 'uiListItem') and contains(., 'You hid a') and contains(., 'request') and contains(@class, 'byScript')]", {del:true});
}

if(location.href=="http://www.facebook.com/reqs.php") {
main.run();
// add options shortcut to user script commands
GM_registerMenuCommand("Facebook Mass Accept Requests "+version+" Options", GM_config.open);
main.addGlobalStyle(".status_confirm {display:none !important;} #mass_accept_div input[type=\"button\"] {display:block;}");
}

window.addEventListener("DOMNodeInserted", function(e) {
if(location.href!="http://www.facebook.com/reqs.php" && (location.href.find("#!/reqs.php") || location.href.find("#confirm_")) && main.realURL.find("reqs.php")) window.location.replace("http://www.facebook.com/reqs.php");
}, false);

window.setInterval(hideFinished, 500);