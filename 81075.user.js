// ==UserScript==
// @version		0.1.0
// @author		Andreas Terpotiz
// @name		Template for Scripts
// @namespace		at_tmpl_autoupd_mutlilang
// @description		It would be a Template for Scripts Generation. It will be have an Auto-Update,Debug and Multi-Language Support. At Now it is in Developmend.
// @include		http*://*
// @exclude		
// ==/UserScript==

// Code for GM_config
var GM_config = {
 storage: 'at_tmpl_autoupd_mutlilang', // This needs to be changed to something unique for localStorage
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
						else options.push(create("option", {textContent:"Error - options needs to be an object type, not an array.",value:"error",selected:true}));
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
};

// End Code for GM_config

//######################################################################################

// Code for GM_config_extender
/* =====================================================[ Adding tooltips ]===
 * int num: setting# referenced (starts from 0)
 * string nam: tooltip text */
GM_config.addTooltip = function(num,nam) {
  if ( cf=this.frame.contentWindow.document.getElementById('config_fields') ) {
    cf.childNodes[num].setAttribute('title',nam);
  }
}

/* =======================================[ Obtaining a stored preference ]===
 * THOU SHALT NOT USE THIS! It's only for the rare cases you REALLY need to
 * access a stored preference BEFORE calling init() - e.g. since you may need
 * to know the language to display menu items in.
 * string name: name of the preference to read
 * optional mixed default: value to return if the preference is not found */
GM_config.gets = function() {
  return GM_config.read()[arguments[0]] || arguments[1];
}

/* ====================================================[ XChange Settings ]===
 * These features require signed.applet.codebase_principal_support set to TRUE
 * in about:config (for Mozilla based browsers). Don't worry to much about it:
 * On each access the user will be prompted with a popup to confirm. */
// -----------------------------------[ Copy stored settings to clipboard ]---
unsafeWindow.copyToClipboard = function(text) {
  try {
    this.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
    clipboardHelper.copyString(text);
  } catch(e) {
    alert('Clipboard access not permitted, sorry. You will have to set signed.applet.codebase_principal_support to true in about:config');
  }
}
GM_config.copySettings = function() {
  var settings = GM_config.read().toSource();
  if (window.clipboardData) { // IE, Opera
    window.clipboardData.setData("Text",settings);
  } else {
    unsafeWindow.copyToClipboard(settings);
  }
}
// ---------------------------------------[ Paste settings from Clipboard ]---
unsafeWindow.pasteFromClipboard = function() {
  try {
    this.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
    settings = clipboardHelper.getData();
    return settings;
  } catch(e) {
    alert('Clipboard access not permitted, sorry. You will have to set signed.applet.codebase_principal_support to true in about:config');
  }
}
GM_config.pasteSettingsFromClipboard = function() {
  settings = unsafeWindow.pasteFromClipboard();
  ok = confirm(GM_config.lang('ConfirmOverwriteFromClipboard'));
  if (ok) {
    GM_config.settings = settings;
    GM_config.save();
    alert(GM_config.lang('SettingsSaved'));
  } else {
    alert(GM_config.lang('SaveAborted'));
  }
}
GM_config.pasteSettings = function() {
  settings = prompt(GM_config.lang('PromptSettingsPaste'));
  ok = confirm(GM_config.lang('ConfirmOverwriteFromPaste'));
  if (ok) {
    GM_setValue('GM_config', settings);
  } else {
    alert(GM_config.lang('SaveAborted'));
  }
}

// ========================================================[ localization ]===
// --------------------------------------------------------[ translations ]---
GM_config.trans = {
  en: {
   'ButtonSave':     'Save',
   'ButtonSaveTip':  'Save options and close window',
   'ButtonCancel':   'Cancel',
   'ButtonCancelTip':'Close window (reject changes)',
   'ResetLinkName':  'Reset to defaults',
   'ResetLinkTip':   'Reset settings to shipped defaults',
   'ConfirmOverwriteFromClipboard': 'Sure to overwrite your settings from Clipboard?',
   'SettingsSaved':  'Settings saved.',
   'SaveAborted':    'Aborted.',
   'PromptSettingsPaste': 'Please paste your settings here:',
   'ConfirmOverwriteFromPaste': 'Sure to overwrite your settings with the entered data?'
  },
  de: {
   'ButtonSave':     'Speichern',
   'ButtonSaveTip':  'Änderungen speichern und Fenster schließen',
   'ButtonCancel':   'Abbrechen',
   'ButtonCancelTip':'Fenster schließen (Änderungen verwerfen)',
   'ResetLinkName':  'Zurücksetzen',
   'ResetLinkTip':   'Alle Werte auf Defaults zurücksetzen',
   'ConfirmOverwriteFromClipboard': 'Sollen die Einstellungen wirklich mit den Daten vom Clipboard überschrieben werden?',
   'SettingsSaved':  'Einstellungen gespeichert.',
   'SaveAborted':    'Aktion abgebrochen.',
   'PromptSettingsPaste': 'Bitte Einstellungen hier hineinkopieren:',
   'ConfirmOverwriteFromPaste': 'Sicher, dass die Einstellungen mit den kopierten Daten überschrieben werden sollen?'
  },
  nl: {
   'ButtonSave': 'Opslaan',
   'ButtonSaveTip': 'Instellingen opslaan en sluit venster',
   'ButtonCancel': 'Annuleren',
   'ButtonCancelTip':'Sluit venster (wist wijzigingen)',
   'ResetLinkName': 'Standaardinstellingen herstellen',
   'ResetLinkTip': 'Herstelt alle instellingen naar de standaardwaarden',
   'ConfirmOverwriteFromClipboard': 'Weet u zeker dat u de instellen vanaf het clipboard wil overschrijven?',
   'SettingsSaved': 'Instellingen opgeslagen.',
   'SaveAborted': 'Afgebroken.',
   'PromptSettingsPaste': 'Plak uw instellingen hier:',
   'ConfirmOverwriteFromPaste': 'Weet u zeker dat u de instellingen wilt overschrijven met de ingevoerde data?'
  },
  useLang: 'en',
  fallBack: true
};
/* -------------------------------------------------[ adding translations ]---
 * can be used to overwrite existing translations and/or add new ones
 * string lang: 2 char language code
 * object trans: translations to add in the format {'code':'translation','code2':'trans2', ...) */
GM_config.setTranslations = function(lang,trans) {
  for (attrname in trans) { this.trans[lang][attrname] = trans[attrname]; }
}
/* ---------------------------------------------------[ init localization ]---
 * string lang: language to translate into
 * boolean fallback: return original (true) or empty string (false) on NoFound? */
GM_config.initLocalization = function(lang,fallback) {
  this.trans.useLang = lang;
  this.trans.fallback = fallback;
}
/* -------------------------------------------------[ translate something ]---
 * string term: term to translate */
GM_config.lang = function(term) {
  if (typeof(this.trans[this.trans.useLang])=='undefined' || !this.trans[this.trans.useLang][term]) {
    if (!this.trans['en'][term]) {
      if (this.trans.fallback) return term;
      return '';
    }
    return trans['en'][term];
  }
  return this.trans[this.trans.useLang][term];
}
/* ----------------------------------------------------[ localize Buttons ]---
 * uses setup default language for translation - see initLocalization() */
GM_config.localizeButtons = function() {
  if ( cf=this.frame.contentWindow.document.getElementById('buttons_holder') ) {
    cf.childNodes[0].innerHTML = this.lang('ButtonSave');
    cf.childNodes[0].setAttribute('title',this.lang('ButtonSaveTip'));
    cf.childNodes[1].innerHTML = this.lang('ButtonCancel');
    cf.childNodes[1].setAttribute('title',this.lang('ButtonCancelTip'));
    cf.childNodes[2].childNodes[0].innerHTML = this.lang('ResetLinkName');
    cf.childNodes[2].childNodes[0].setAttribute('title',this.lang('ResetLinkTip'));
  }
}

// ==========================================================[ Stylish ]===
// ---------------------------------------------------[ CSS for Fading ]---
GM_config.fadeCSS = <><![CDATA[
  #GM_transparency_filter { background-color: #777777; }
  /* iframe[id^="GM_config"] { opacity: 1.0 !important; background-color: #ffffff !important; } */
  ]]></>.toString();
/* ------------------------------------------------------------[ Fader ]---
 * Original code by JoeSimmons - adapted for GM_config_ext by Izzy.
 * Fade in/out by id and choose speed: slow, medium, or fast
 * Syntax: fade(
 *              node,
 *              'in'|'out' [,
 *              'fast'|'medium'|'slow' [,
 *              minOpacity [, maxOpacity]]]); */
GM_config.fade = function() {
  var e = arguments[0], dir = arguments[1], s = arguments[2]||'medium',
      minOpa = arguments[3]||.5, maxOpa = arguments[4]||1;
  if(!e || !dir || typeof dir!='string' || (dir!='out'&&dir!='in')) {return;} // Quit if node/direction is omitted, direction isn't in/out, or if direction isn't a string
  dir=dir.toLowerCase(); s=s.toLowerCase(); // Fix case sensitive bug
  var node = (typeof e=='string') ? $(e) : e, // Define node to be faded
     speed = {slow : 400, medium : 200, fast : 50};
  if(!s) var s='medium'; // Make speed medium if not specified
  if(s!='slow' && s!='medium' && s!='fast') s='medium'; // Set speed to medium if specified speed not supported
  if(dir=='in') node.style.opacity = minOpa.toString();
  else if(dir=='out') node.style.opacity = maxOpa.toString();
  //node.style.display='';
  var intv = setInterval(function(){
    if(dir=='out') {
      if(parseFloat(node.style.opacity)>minOpa) node.style.opacity = (parseFloat(node.style.opacity)-.1).toString();
      else {
        clearInterval(intv);
        node.style.background = 'transparent none repeat scroll 0 0';
        //node.style.display='none';
      }
    }
    else if(dir=='in') {
      if(parseFloat(node.style.opacity)<maxOpa) node.style.opacity = (parseFloat(node.style.opacity)+.1).toString();
      else {
        clearInterval(intv);
      }
    }
  }, speed[s]);
}

/* ----------------------------------------------------------[ FadeOut ]---
 * FadeOut main page and focus on the GM_config menu
 * You can optionally pass a string containing suitable CSS to it. If you
 * don't, GM_config.fadeCSS will be used instead. */
GM_config.fadeOut = function() {
  var styl  = document.createElement('style');
  styl.innerHTML = arguments[0] || GM_config.fadeCSS;
  styl.setAttribute('id','GM_config_menu_css');
  document.getElementsByTagName('head')[0].appendChild(styl);
  window.document.body.appendChild((this.tframe=this.create('iframe',{id:'GM_transparency_filter',src:'about:blank',style:'position:fixed; top:0; left:0; opacity:0; z-index:998; width:100%; height:100%; max-height:100%; max-width:100%; border:none; overflow:auto;'})));
  this.fade(this.tframe,'in','medium',0,.8);
  var ifras = document.getElementsByTagName('iframe');
  for (i=0;i<ifras.length;i++) {
    if (/GM_config/.exec(ifras[i].id)) {
      this.fade(ifras[i],'in','fast',0,1);
    }
  }
}
// -----------------------------------------------------------[ FadeIn ]---
GM_config.fadeIn = function() {
  this.fade(this.tframe,'out','fast',0,.8);
  var intv = setTimeout(function() {
    document.getElementById('GM_config_menu_css').parentNode.removeChild(document.getElementById('GM_config_menu_css'));
    GM_config.remove(GM_config.tframe);
    delete GM_config.tframe;
  },400);
}
/* -------------------------------------------------[ Sections to Tabs ]---
 * Convert sections to tabbed pages
 */
var sectionTabs = 0; // holds the number of tabs we have
GM_config.toggleSection = function(e) { // onClick handler for the tabs
  if ( (typeof e)=='number' ) var objNum = e;
  else var objNum = /\_(\d+)\_/.exec(e.target.id)[1], tobj;
  for (var i=0;i<sectionTabs;i++) {
    tobj = GM_config.frame.contentWindow.document.getElementById('section_'+i+'_tab');
    tdat = GM_config.frame.contentWindow.document.getElementById('section_'+i);
    tdat.setAttribute('className','section_header tab'); // does not work
    if (i==objNum) { // Activate
      // tab
      if (tobj.style.cssText.match(/font-weight/) )
        tobj.setAttribute('style',tobj.style.cssText.replace(/font-weight:[^\;]*/,'font-weight: bold !important'));
      else
        tobj.setAttribute('style',tobj.style.cssText + 'font-weight: bold !important;');
      tobj.setAttribute('selected',true);
      // content
      if (tdat.style.cssText.match(/display:/))
        tdat.setAttribute('style',tdat.style.cssText.replace(/display:[^\;]*/,'display:table !important'));
      else
        tdat.setAttribute('style',tdat.style.cssText +'display:table !important;');
    } else { // DeActivate
      // tab
      if (tobj.style.cssText.match(/font-weight/) )
        tobj.setAttribute('style',tobj.style.cssText.replace(/font-weight:[^\;]*/,'font-weight: normal !important'));
      else
        tobj.setAttribute('style',tobj.style.cssText + 'font-weight: normal !important;');
      tobj.setAttribute('selected',false);
      // content
      if (tdat.style.cssText.match(/display:/))
        tdat.setAttribute('style',tdat.style.cssText.replace(/display:[^\;]*/,'display:none !important'));
      else
        tdat.setAttribute('style',tdat.style.cssText +'display:none !important;');
    }
  }
}

GM_config.sections2tabs = function() {
  var rows = this.frame.contentWindow.document.getElementsByTagName('h2');
  if (rows.length<1) return;
  var anch = document.createElement('div');
  anch.style.cssText = 'border-bottom: 3px solid #cccccc;';
  anch.id = 'GM_config_tab_holder';
  sectionTabs = rows.length;
  for (var i=0;i<sectionTabs;i++) {
    rows[0].setAttribute('style','-moz-appearance:tab; display:inline; padding-left:5px; padding-right:5px;');
    rows[0].id = 'section_'+i+'_tab';
    rows[0].addEventListener('click', GM_config.toggleSection, false);
    anch.appendChild(rows[0]);
    GM_config.frame.contentWindow.document.getElementById('section_'+i).style.marginLeft = "auto";
    GM_config.frame.contentWindow.document.getElementById('section_'+i).style.marginRight = "auto";
  }
  this.frame.contentWindow.document.getElementById('section_0').parentNode.insertBefore(anch,this.frame.contentWindow.document.getElementById('section_0'));
  this.frame.contentWindow.document.getElementById('section_0_tab').setAttribute('selected',true);
  this.toggleSection(0);
}

/* -------------------------------------------------------------[ eCSS ]---
 * a sample style to use: eCSS can mean "example CSS" or "extended CSS", as
 * you wish to put it :-) */
GM_config.eCSS = <><![CDATA[
/* Remove the 40% wasted space to the left */
.indent40 {
  margin-left: auto !important;
}

/* Make the config fields a table */
#config_fields {
  display:table !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
div.config_var, .section_header_holder > div { display:table-row !important; }
div.config_var > *, .section_header_holder > div > * {
  display:table-cell !important;
  font-size: 12px !important;
}

/* Adjust the labels */
.field_label {
  text-align: right !important;
  padding-right: 10px !important;
  vertical-align: top !important;
}

/* Center buttons */
#buttons_holder {
  display:table !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
#buttons_holder button {
  margin-left: 20px !important;
  margin-right: 20px !important;
}
div.reset_holder { text-align:center !important; }
button, a.reset {
  font-size: 11px !important;
  font-weight: bold !important;
}

/* Format the header */
#header {
  background-color: #3e91eb !important;
  color: #ffffff !important;
  text-align: center !important;
  outline: 2px solid #eae9e8 !important;
  position: fixed !important;
  width: 100% !important;
  top: 0px !important;
  height: 25px !important;
}
#header * {
  font-size: 18px !important;
  font-weight: bold !important;
}
#header + * { margin-top: 30px !important; }
#header + div.config_var > * {
  padding-top: 35px !important;
}
#header + div.config_var > input {
  padding-top: 0px !important;
  margin-top: 35px !important;
}
body {
  margin-left: 0px !important;
  margin-right: 2px !important;
  margin-top: 2px !important;
}
/*.section_header_holder { padding-left: 40px; }*/
h2.section_header {
  font-size: 12px !important;
  font-weight: bold !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
  background-color: transparent !important;
  color: #444444 !important;
  border: 0px solid white !important;
  cursor: pointer;
  opacity: 0.99 !important;
}
/* Not tabbed */
.section_header_holder > h2.section_header {
  cursor: auto !important;
  background-color: #add8e6!important;
  font-weight: bold !important;
}
/* Tabbed */
.section_header[selected="true"] {
  position: relative !important;
  color: #000000 !important;
  top: 1px !important;
}
.section_header:not([selected]) {
  font-weight: normal !important;
}
#GM_config_tab_holder {
  margin-left:5px !important;
  margin-right:5px !important;
  border-bottom: 1px solid #B2A293 !important;
}
#section_0_tab { margin-left:3px !important; }
]]></>.toString();

/* =========================================[ Resize configuration window ]===
 * int width: new width
 * int height: new height */
GM_config.resizeFrame = function(wid,hei) {
  if(fid=this.frame.id) {
    this.frame.style.width = wid;
    this.frame.style.height = hei;
  }
}

/* ====================================[ Add a border to the config frame ]===
 * object spec { width (5px), style (ridge), color (#eae9e8) }
 */
GM_config.addBorder = function() {
  if(fid=this.frame.id) {
    spec = arguments[0] || {};
    this.frame.style.borderWidth = (spec.width || '5px');
    this.frame.style.borderStyle = (spec.style || 'ridge');
    this.frame.style.borderColor = (spec.color || '#999999');
  }
}
// End Code for GM_config_extender

//######################################################################################

var debug = (GM_config.read().debug||0.);
var wait = (GM_config.read().lang||1000);
var subDomainRegExp = /http[s]?:\/\/(.*)/;
var subDomain = '';
var debug_url = /tmpl_autoupd_mutlilang_debug=(\d+)/;
var language='';
var lang = {
	en:
	{
		'English' : 'English Test Text',
		'German' : 'German Test Text',
		'nodes returned: ' : 'nodes returned: ',
		'Debugging as been activated via URL to level ' : 'Debugging as been activated via URL to level ',
		'Current Location: ' : 'Current Location: ',
		'Unsupportet Language. Please UNINSTALL this Greasemonkey script.' : 'Unsupportet Language. Please UNINSTALL this Greasemonkey script.'
	},
	
	de:
	{
		'English' : 'Englischer Test Text',
		'German' : 'Deutscher Test Text',
		'nodes returned: ' : 'Zurückgegebene Knoten: ',
		'Debugging as been activated via URL to level ' : 'Debugging wurde über die URL gesetzt auf Level ',
		'Current Location: ' : 'Aktuelle Position: ',
		'Unsupportet Language. Please UNINSTALL this Greasemonkey script.' : 'Nicht unterstüzte Sprache. Bitte DEINSTALLIERE diese Greasemonkey Script.'
	}
}

var CheckForUpdates = function(name,version,id) {
	var today = new Date();
	today = today.getDate();
	var lastupdate = GM_getValue('lastupdate',1000);
	var dif = today - lastupdate;
	var updatedays = (GM_config.read().updatedays||7); //how many days between update checks (set to 0 to check every time you visit userscripts.org)
	var uurl = 'http://userscripts.org/scripts/review/'+id+'?format=txt';
	
	this.init = function()
	{
		if(dif>=updatedays || dif<=-updatedays)
		{
			GM_setValue('lastupdate',today);
			this.check();	
		}
	}

	this.check = function()
	{
		GM_xmlhttpRequest({method:"GET",url:uurl,onreadystatechange:this.doupdate});
	}

	this.doupdate = function(o)
	{
		if(o.readyState == 4)
		{
			checkver = o.responseText.substr(0,100);
			checkver = checkver.split('@version')[1];
			checkver = parseInt(checkver.replace(/\./g,''))+100;
			thisver = parseInt(version.replace(/\./g,''))+100;
			if(checkver>thisver)
			{
				if(confirm('Update '+name+'?'))
				{
					window.location = 'http://userscripts.org/scripts/source/'+id+'.user.js';
				}
			}
			
		}
	}

this.init();
}

// Get a string in the current language, or default to english
function $choose_lang(key) {
	var string;
	
	if (lang[language][key])
	{
		string = lang[language][key];
	} else {
		string = lang['en'][key];
	}

	if ( string == null)
		string = 'Text not found: ' + key;
	
	return string;
}

function get_browser_lang(){
	if (navigator.appName == 'Netscape') {
		var language_browser = navigator.language
	} else {
		var language_browser = navigator.browserLanguage
	}
	return language_browser;
}

function get_site_lang(){
	var language_lang = document.getElementsByTagName("html")[0].getAttribute("lang");
	return language_lang;
}

function get_site_lang_xml(){
	var language_lang_xml = document.getElementsByTagName("html")[0].getAttribute("xml:lang");
	return language_lang_xml;
}

language = get_browser_lang();
	
if (subDomainRegExp.exec(document.location) != 0)
     subDomain = RegExp.$1;

if ((debug_url.exec(document.location) != 0) && (RegExp.$1 > debug)) {
     debug = RegExp.$1;
     alert($choose_lang('Debugging as been activated via URL to level ') + debug);
     GM_log($choose_lang('Debugging as been activated via URL to level ') + debug);
}

if (debug > 0) GM_log($choose_lang('Current Location: ') + document.location);
	
//setTimeout(init, wait);
init();

//Functions
function init() {
	GM_config.init('Configuration for Template',{
	        debug:{ label:'Debug Level:', type:'int', default:0.},
		wait:{ label:'Refresh Milli-Seconds:', type:'int', default:1000},
		updatedays:{ label:'Days after the Update would be checked:', type:'int', default:7}
	},
  GM_config.eCSS, // to add your CSS - replace this with configStyle
  {
    open: function() {
      GM_config.addBorder(); // add a fancy border
      GM_config.resizeFrame('480px','360px'); // resize the config window - oh, far too large ;)
    },
    save: function() { location.reload(); } // reload the page when configuration was changed
  }
);
	GM_registerMenuCommand('Template for Scripts: Configuration',GM_config.open);

	html_tag = evaluate_xpath('.//html');

	if (!lang[language]) {
		alert($choose_lang('Unsupportet Language. Please UNINSTALL this Greasemonkey script.'));
		return 1;
    } else {
		if (debug > 0) {
		}
		start_script();
	}
}

function evaluate_xpath(xpath_query) {
     if (debug >= 2) GM_log(xpath_query);
     var nodes = document.evaluate(xpath_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
     if (debug >= 1) GM_log($choose_lang('nodes returned: ') + nodes.snapshotLength);
     return nodes;
}

function start_script() {
	wloc = ''+window.location;
	pattern = /userscripts/;
	result = wloc.match(pattern);
	if(result)
	CheckForUpdates('tmpl_autoupd_mutlilang','0.0.1',81075);
	
	alert($choose_lang('German'));
	return 0;
}
