// ==UserScript==
// @name          UnFuck Facebook
// @namespace     sizzlemctwizzle
// @description	  Fix recent activity removal
// @version       2.7.2
// @require       http://sizzlemctwizzle.com/updater.php?id=11992
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==

// Start of Graphical Settings code
var GM_config = {
 storage: 'GM_config', // This needs to be changed to something unique for localStorage
 init: function() {
	for(var i=0,l=arguments.length,arg; i<l; ++i) {
		arg=arguments[i];
		switch(typeof arg) {
			case 'object': for(var j in arg) {
				if (typeof arg[j] == 'function') {
					if (j=='open') 
                                          this.onOpen=arg[j];
					else if (j=='close')
                                          this.onClose=arg[j];
					else if (j=='save') 
                                          this.onSave=arg[j];
				} else var settings = arg;
			} break;
			case 'function': this.onOpen = arg; break;
			case 'string': if(arg.indexOf('{')!=-1&&arg.indexOf('}')!=-1) var css = arg;
				else this.title = arg;
				break;
		}
	}
	if(!this.title) this.title = 'Settings - Anonymous Script';
	var stored = this.read(),
		passed_settings = {},
		passed_values = {},
		typewhite = /number|string|boolean/;
	for (var i in settings) {
		passed_settings[i] = settings[i];
		passed_values[i] = (typeof stored[i] == "undefined" ? settings[i]['default'] : (stored[i]=='false' && settings[i]['default']===true) ? false : (typewhite.test(typeof stored[i]) ? stored[i] : (typeof settings[i]['default'] == "undefined" ? '' : settings[i]['default'])));
	}
	this.settings = passed_settings;
	this.values = passed_values;
	if (css) this.css.stylish = css;
 },
 open: function() {
 var that=GM_config;
 if(document.evaluate("//iframe[@id='GM_config']",document,null,9,null).singleNodeValue) return;
	// Create frame
	document.body.appendChild((that.frame=that.create('iframe',{id:'GM_config', style:'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto;'})));
        that.frame.src = 'about:blank'; // In WebKit src can be set until it is added to the page
	that.frame.addEventListener('load', function(){
		var obj = GM_config, frameBody = this.contentDocument.getElementsByTagName('body')[0], create=obj.create, settings=obj.settings;
		obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(obj.create('style',{type:'text/css',textContent:obj.css.basic+obj.css.stylish}));

		// Add header and title
		frameBody.appendChild(obj.create('div', {id:'header',className:'config_header block center', textContent:obj.title}));

		// Append elements
		var anch = frameBody, secNo = 0; // anchor to append elements
		for (var i in settings) {
			var type, field = settings[i], Options = field.options, label = field.label, value = obj.values[i];
			if (field.section) {
				anch = frameBody.appendChild(create('div', {className:'section_header_holder', kids:[
				  create('div', {className:'section_header center',innerHTML:field.section[0]})],
				  id:'section_'+secNo}));
				if(field.section[1]) anch.appendChild(create('p', {className:'section_desc center',innerHTML:field.section[1]}));
				secNo++;
			}
			switch(field.type) {
				case 'textarea':
					anch.appendChild(create('div', {title:field.title||'',kids:[
						create('span', {textContent:label, className:'field_label'}),
						create('textarea', {id:'field_'+i,innerHTML:value,cols:(field.cols?field.cols:20),rows:(field.rows?field.rows:2)})
					], className: 'config_var'}));
					break;
				case 'radio':
					var boxes = [];
					for (var j = 0,len = Options.length; j<len; j++) {
						boxes.push(create('span', {textContent:Options[j]}));
						boxes.push(create('input', {value:Options[j],type:'radio',name:i,checked:Options[j]==value?true:false}));
					}
					anch.appendChild(create('div', {title:field.title||'',kids:[
						create('span', {textContent:label, className:'field_label'}),
						create('div', {id:'field_'+i,kids:boxes})
					], className: 'config_var'}));
					break;
				case 'select':
					var options = new Array();
					for (var j in Options) options.push(create('option',{textContent:Options[j],value:j,selected:(value?(value==j):(Options[j]==field['default']))}));
					anch.appendChild(create('div', {title:field.title||'',kids:[
						create('span', {textContent:label, className:'field_label'}),
						create('select',{id:'field_'+i,kids:options})
					], className: 'config_var'}));
					break;
				case 'checkbox':
					anch.appendChild(create('div', {title:field.title||'',kids:[
						create('label', {textContent:label, className:'field_label', "for":'field_'+i}),
						create('input', {id:'field_'+i,type:'checkbox',value:value,checked:!value||value==''?false:true})
					], className: 'config_var'}));
					break;
				case 'button':
				var tmp;
					anch.appendChild(create('div', {kids:[
						(tmp=create('input', {id:'field_'+i,type:'button',value:label,size:(field.size?field.size:25),title:field.title||''}))
					], className: 'config_var'}));
					if(field.script) obj.addEvent(tmp, 'click', field.script);
					break;
				case 'hidden':
				anch.appendChild(create('div', {title:field.title||'',kids:[
						create('input', {id:'field_'+i,type:'hidden',value:value})
					], className: 'config_var'}));
					break;
				default:
					anch.appendChild(create('div', {title:field.title||'',kids:[
						create('span', {textContent:label, className:'field_label'}),
						create('input', {id:'field_'+i,type:'text',value:value,size:(field.size?field.size:25)})
					], className: 'config_var'}));
			}
		}

		// Add save and close buttons
		frameBody.appendChild(obj.create('div', {id:'buttons_holder', kids:[
			obj.create('button',{id:'saveBtn',textContent:'Save',title:'Save options and close window',className:'saveclose_buttons',onclick:function(){GM_config.close(true)}}),
			obj.create('button',{id:'cancelBtn', textContent:'Cancel',title:'Close window',className:'saveclose_buttons',onclick:function(){GM_config.close(false)}}),
			obj.create('div', {className:'reset_holder block', kids:[
			obj.create('a',{id:'resetLink',textContent:'Restore to default',href:'#',title:'Restore settings to default configuration',className:'reset',onclick:obj.reset})
		]})]}));

		obj.center(); // Show and center it
		window.addEventListener('resize', obj.center, false); // Center it on resize
		if (obj.onOpen) obj.onOpen(); // Call the open() callback function
		
		// Close frame on window close
		window.addEventListener('beforeunload', function(){GM_config.remove(this);}, false);
	}, false);
 },
 close: function(save) {
	if(save) {
		var type, fields = this.settings, isNum=/^[\d\.]+$/, typewhite=/radio|text|hidden|checkbox/;
		for(f in fields) {
			var field = this.frame.contentDocument.getElementById('field_'+f);
			if(typewhite.test(field.type)) type=field.type;
			else type=field.tagName.toLowerCase();
			switch(type) {
				case 'text':
					this.values[f] = (this.settings[f].type=='text') ? field.value : (((isNum.test(field.value||field.value=='0'))&&(this.settings[f].type=='int'||this.settings[f].type=='float'))?parseFloat(field.value):false);
					if(this.values[f]===false) {
                                          alert('Invalid type for field: '+f+'\nPlease use type: '+this.settings[f].type);
                                          return;
                                        }
					break;
				case 'hidden':
					this.values[f] = field.value.toString();
					break;
				case 'textarea':
					this.values[f] = field.value;
					break;
				case 'checkbox':
					this.values[f] = field.checked;
					break;
				case 'select':
					this.values[f] = field[field.selectedIndex].value;
					break;
				case 'div':
					var radios = field.getElementsByTagName('input');
					if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
						if(radios[i].checked) this.values[f] = radios[i].value;
					}
					break;
			}
		}
                if(this.onSave) this.onSave(); // Call the save() callback function
                this.save();
	}
	if(this.frame) this.remove(this.frame);
	delete this.frame;
        if(this.onClose) this.onClose(); //  Call the close() callback function
 },
 set: function(name,val) {
	this.values[name] = val;
 },
 get: function(name) {
	return this.values[name];
 },
 isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',
 log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),
 save: function(store, obj) {
    try {
      var val = JSON.stringify(obj||this.values);
      (this.isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))((store||this.storage),val);
    } catch(e) {
      this.log("GM_config failed to save settings!");
    }
 },
 read: function(store) {
    try {
      var val = (this.isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))((store||this.storage), '{}'), rval;
      rval = JSON.parse(val);
    } catch(e) {
      this.log("GM_config failed to read saved settings!");
      rval = {};
    }
    return rval;
 },
 reset: function(e) {
	e.preventDefault();
	var type, obj = GM_config, fields = obj.settings;
	for(f in fields) {
		var field = obj.frame.contentDocument.getElementById('field_'+f);
		if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
		switch(type) {
			case 'text':
				field.value = obj.settings[f]['default'] || '';
				break;
			case 'hidden':
				field.value = obj.settings[f]['default'] || '';
				break;
			case 'textarea':
				field.value = obj.settings[f]['default'] || '';
				break;
			case 'checkbox':
				field.checked = obj.settings[f]['default'] || false;
				break;
			case 'select':
				if(obj.settings[f]['default']) {
					for(var i=field.options.length-1; i>=0; i--)
					if(field.options[i].value==obj.settings[f]['default']) field.selectedIndex=i;
				}
				else field.selectedIndex=0;
				break;
			case 'div':
				var radios = field.getElementsByTagName('input');
				if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
					if(radios[i].value==obj.settings[f]['default']) radios[i].checked=true;
				}
				break;
		}
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
 '.config_var {margin:0 0 4px 0;}\n' +
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
    var script=this.getAttribute('script');
    if(script && typeof script=='string' && script!='') {
      func = new Function(script);
      setTimeout(func, 0);
    }
 },
 addEvent: function(el,ev,scr) { el.addEventListener(ev, function() { typeof scr == 'function' ? setTimeout(scr, 0) : eval(scr) }, false); },
 remove: function(el) { if(el && el.parentNode) el.parentNode.removeChild(el); }
};
// End of Graphical Settings code


// UnFuck Facebook Settings
GM_config.init('UnFuck Facebook', {
    appReq: {
        section: ['Invite Blocking', 'Check the types of invites you want to block automatically'],
        label: 'Application',
        type: 'checkbox',
        title: 'Still broke at the moment :(',
        'default': false
    },
    fanReq: {
        label: 'Fan Page',
        type: 'checkbox',
        'default': false
    },
    groupReq: {
        label: 'Group',
        type: 'checkbox',
        'default': false
    },
    eventReq: {
        label: 'Event',
        type: 'checkbox',
        'default': false
    },
    appHide: {
        section: ['Home Settings', 'Control what appears in your stream'],
        label: 'Hide App Stories',
        type: 'checkbox',
        'default': true
    },
    appBlock: {
        label: 'Block App Stories',
        title: 'Prevent apps from showing up in your stream in the future',
        type: 'checkbox',
        'default': false
    },
    wallStory: {
        label: 'Hide Wall Stories',
        title: 'Hide the one-sided wall conversations',
        type: 'checkbox',
        'default': true
    },
    addFriend: {
        label: 'Hide New Friend Stories',
        title: 'Hide the "Someone is now friends with someone." stories',
        type: 'checkbox',
        'default': false
    },
    showStat: {
        label: 'Show status on home page',
        type: 'checkbox',
        'default': true
    },
    statOnly: {
        label: 'Default to status-only Home Feed',
        type: 'checkbox',
        'default': false
    },
    columns: {
        label: 'Number of Columns',
        title: 'Make the home page one to three columns',
        type: 'radio',
        options: ['One', 'Two', 'Three'],
        'default': 'Two'
    },
    noStuff: {
        label: 'Show right column above feed in one column mode',
        title: 'This option does nothing in two or three column mode',
        type: 'checkbox',
        'default': true
    },
    suggest: {
        label: 'Hide suggestions',
        type: 'checkbox',
        'default': true
    },
    chatSide: {
        label: 'Show Chat Sidebar',
        type: 'checkbox',
        'default': false
    },
    profBoxes: {
        section: ['Profile Settings', 'Control what appears on profiles'],
        label: 'Hide Application Boxes',
        type: 'checkbox',
        'default': true
    },
    appTabs: {
        label: 'Hide Application Tabs',
        type: 'checkbox',
        'default': false
    },
    wideCom: {
        section: ['General Settings'],
        label: 'Wide Comments',
        type: 'checkbox',
        'default': true
    },
    homeLink: {
        label: 'Show Home link in Nav Bar',
        type: 'checkbox',
        'default': true
    },
    recentHide: {
        section: ['Advance Feature'],
        label: 'Automatically remove "Recent Activity" Stories from your profile',
        type: 'checkbox',
        title: 'Remove those one-liner stories Facebook publishes automatically everytime you do anything',
        'default': false
    }
},
'.config_header { color: #3B5998 !important; } .section_header { background-color: #3B5998 !important; } .section_desc { color: #999999 !important; } .field_label, .config_var span { color: #3E5A88 !important; font-size: 12px !important; } #header a { color: #3B5998 !important; font-size: 12px !important; display: block !important; }',
{
    open: function() {
        var doc = GM_config.frame.contentDocument,
            id = doc.getElementById,
            disableOpt = function(el) {
                el.checked = false;
                el.disabled = true;
                el.parentNode.title = "This shit is broke right now :("
                el.parentNode.firstChild.setAttribute('style', 'text-decoration: line-through;');
            };
        disableOpt(id('field_appReq'));
        disableOpt(id('field_fanReq'));
        disableOpt(id('field_groupReq'));
        disableOpt(id('field_eventReq'));
        disableOpt(id('field_appBlock'));
        id('header').appendChild(create('a',{href:'http://userscripts.org/scripts/show/11992',target:'_blank', textContent:'Script Home Page'}));
   },
   save: function() { window.location.reload(); }
});

// I've mananged to do a lot of my script in CSS
var unfuckStyle='#right_column { width: 77% !important; } '+(GM_config.get('profBoxes')?'div[id^="box_app_"]:not(#box_app_2297529396):not(#box_app_2305272732):not(#box_app_2309869772):not(#box_app_2327158227):not(#box_app_2341989679):not(#box_app_2347471856):not(#box_app_2356318349):not(#box_app_2361831622):not(#box_app_2407511955):not(#box_app_2503140832):not(#box_app_2719290516):not(#box_app_2392950137):not(#box_app_2550392059), ':'')+'.gifts_received, .wall_contextual_extra, .nextstep, .app_icon_row, .invitefriends, #ssponsor, div[class$="_ad"], .divider_bar, .more_section, .fbpage_fan, .ad_capsule, .see_more_arrow, #more_apps_divider_narrow, .platform, .profile_empty_divider, .newstuff, .app_install_story, .emu_sponsor, div[id^="emu_"], .adcolumn, .social_ad, .sponsor, #attachment_buttons_list span[style*="app_"], li[id^="bookmarked_app_"] a[href^="http://apps."], li[id^="bookmarked_app_"] a[href*="gift"], #profile_tab_add, .footer_ad, .UIComposer_More_Container, .UIComposer_Attachment a[style*="gift.gif"], '+(GM_config.get('appTabs')?'li[view="box_3"], li[view^="app_"], li[view="app_2347471856"], li[view="app_2392950137"], ':'')+'.approve_friend, .app_story, .UIComposer_Attachment a[style*="/app_"], .UIRoundedImage_CornersSprite, #home_sponsor, .hp_connect_box, .UIUpcoming_Info small, .house_sponsor, #home_sponsor_nile, div[style*="white"], '+(GM_config.get('suggest') ? '#pymk_hp_box, ':'')+'#unfucked, #ego { display: none !important; }\n' +
(GM_config.get('columns') != "Three" ? '.UITitledBox_Content { padding: 3px !important; }\n'+
'#contentArea { width: 90% !important; }\n' +
 '#rightCol { '+ (GM_config.get('columns') == "Two" || !GM_config.get('noStuff') ? 'display: none !important; width: 0% !important': 'float: left !important; margin-left: 3% !important; width: 40% !important') +' }\n' +
'#headNavOut { width: '+(GM_config.get('columns') == "Two" ? '77.5%' : '55%' )+' !important; float: right !important; }\n'+
'.fbx #globalContainer { width:auto; margin:auto 1.5%; }\n' +
'#leftCol { width: 20.8% !important; border-right: none !important;}\n'  +
(GM_config.get('columns') == "One" ? '#contentCol { margin-left: 0% !important; } ' :'#headNavOut, #contentCol { margin-left:21% !important; }\n') +
'.uiSideNav, .uiSideNav li { width: 100% !important; }\n' +
'#contentCurve, #footerContainer { width:auto !important; margin:auto !important; margin-left:5% !important; border: none !important; }\n' +
'#q { width: 100% !important; }' +
'#navSearch { width: 40% !important; }':'') +
(GM_config.get('columns') == "One" ? '#leftCol { width: 0% !important; display: none !important; padding: 0% !important }\n' +
'#contentCol, #contentArea, #headNavOut { margin-left 0px !imporatant; padding-left 0px !important; }':'') +
(GM_config.get('homeLink') ? '' : '#pageNav li a[href$="?ref=home"] { display: none !important;}') +
(GM_config.get('wideCom') ? '.UIWashFrame_SidebarAds { display: none !important; }\n' +
'.UIWashFrame_Content { width: 99% !important; }\n' +
'.UIStandardFrame_Content { width: 99% !important; }\n' +
'#wall { width: 80% !important; }\n' +
'.comments_add_box .UIProfileImage { display: none !important; }\n' +
'.notes_side_column { margin:0% !important; padding:0% !important; }' +
'#photocomment { width: 80% !important; }' +
'.album .footer .info, .note_footer { width: 100% !important; }\n' +
'.one_row_add_box textarea.DOMControl_placeholder { width: 90% !important; }\n' +
'.comments_add_box textarea, .comment_box, .ufi_section, .comment_text, .ie6 .commentable_item textarea.DOMControl_placeholder, .no_js .commentable_item .comment_box .comments_add_box textarea { width: 98% !important; }\n' +
'.request_link { padding-left: 5% !important; }': '');

// GM_addStyle if not available
if(typeof GM_addStyle == 'undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], 
        style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        style.textContent = css;
        head.appendChild(style);
    }

// Inject a script into the page
function addScript(js) {
    var body = document.body, script = document.createElement('script');
    if (!body) {return}
    script.type = 'text/javascript';
    try {script.innerHTML = js}
    catch(x) {script.innerText = js}
    body.appendChild(script);
}

function $x(x, t, r) {
    if (t && t.nodeType) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case 1:
        p = 'numberValue';
        break;
    case 2:
        p = 'stringValue';
        break;
    case 3:
        p = 'booleanValue';
        break;
    case 8: case 9:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || 6, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}

// Optional shortcut functions I like
function $x1(x, r) { return $x(x, 9, r) } 
function $xb(x, r) { return $x(x, 3, r) }
    
// A robust and universal forEach
function forEach(lst, cb) {
    if(!lst) 
        return;
    if (lst.snapshotItem)
        for (var i = 0, len = lst.snapshotLength; i < len; ++i)
            cb(lst.snapshotItem(i), i, lst);
    else if (lst.iterateNext) {
        var item, next = lst.iterateNext;
        while (item = next()) 
            cb(item, lst);
    } else if (typeof lst.length !== 'undefined') 
        for (var i = 0, len = lst.length; i < len; ++i)
            cb(lst[i], i, lst);
    else if (typeof lst === "object")
        for (var i in lst) 
            cb(lst[i], i, lst);
}

// Insert an element after another
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling) }

// A really cool element creation funtion by avg and JoeSimmons, and modified by me
function create() {
    switch(arguments.length) {
        case 1:
            var A = document.createTextNode(arguments[0]);
	    break;
        default:
            var A = document.createElement(arguments[0]),
                B = arguments[1];
            for (var b in B) {
	        if (b.indexOf("on") == 0)
		    A.addEventListener(b.substring(2), B[b], false);
		else if (",style,accesskey,id,name,src,href,which".indexOf("," +
                         b.toLowerCase()) != -1)
		    A.setAttribute(b, B[b]);
		else
		    A[b] = B[b];
            }
            for(var i = 2, len = arguments.length; i < len; ++i)
	        A.appendChild(arguments[i]);
    }
    return A;
}

// Remove an element
function destroy(element) { element.parentNode.removeChild(element); }
// Get element by id
function $(element) { return document.getElementById(element); }
// Some crap I wrote to support browser without getElementsByClassName
function $c(element, root) { return (root||document).getElementsByClassName(element); }
// Destroy elements that are retrieved with xpath
function seekAndDestroy(xpath, root) {
  forEach($x(xpath, root), destroy);
}
// Add a new class to an element
function addClass(el,cls) {
    if (!el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))) 
        el.className += " "+cls;
}
// Remove a particular class from an element
function removeClass(el,cls) {
    if (el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        el.className = el.className.replace(reg,' ');
    }
}

// Get the actual Facebook url
function realUrl() {
     if (window.location.hash.match(/\.php/)) {
        return 'http://'+window.location.host+window.location.hash.split('#')[1];
     } else if (window.location.href.indexOf('#') != -1) {
        return window.location.hash.split('#')[0];
     } else {
       return window.location.href;
     }
}

// Same domain
function xhr(url, cb, data) {
  var res =  new XMLHttpRequest();
  res.onreadystatechange = function() { if (res.readyState==4 && res.status==200) cb(res.responseText) };
  res.open(data ? 'POST' : 'GET', url, true);
  res.setRequestHeader('User-agent', window.navigator.userAgent);
  if (data) {
    res.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    res.setRequestHeader("Connection", "close");
    res.setRequestHeader("Content-length", data.length);
  }
  res.send(data||null);
}

// Cross domain
function xXhr(url, cb, data) {
    GM_xmlhttpRequest({
          method: data ? 'POST' : 'GET',
	  url: url,
	  headers: {
	    'User-agent': window.navigator.userAgent,
	    'Accept': (data) ? 'application/x-www-form-urlencoded' : 'application/atom+xml,application/xml,text/xml',
            'Content-type': (data) ? 'application/x-www-form-urlencoded' : null
	  },
	  data: (data) ? data : null,
	  onload: function(res) { if (res.status == 200 && cb) cb(res.responseText); }
      });
}

function displayStatus(status, time) {
  var nameLink = $c('fbxWelcomeBoxName')[0];
  nameLink.setAttribute('style', 'display:inline; font-size: 11.5px;');
  destroy($c('fbxWelcomeBoxProfileLink')[0]);
  nameLink.parentNode.appendChild(create('div', {id:'UIHome_Status', style: 'padding-bottom: 5px; display:inline;'},
                        nameLink,
                        create('span',{innerHTML:'&nbsp;'}),
                        create('span',{style:'font-weight: normal; font-size: 11.5px;',innerHTML:status}),
                        create('br',{}),
                        create('span',{style:'color: #BBBBBB; font-size: 10px;',textContent:time}),
                        create('span',{innerHTML:'&nbsp;'}),
                        create('a',{href:'#',style:'font-size: 10px;',textContent:'clear',onclick:function (e) { fbAjax('http://www.facebook.com/ajax/updatestatus.php', 'clear=1&profile_id='+unsafeWindow.Env.user);GM_addStyle('#UIHome_Status { display: none !important; } .fbxWelcomeBoxName { display: block !important; }');e.preventDefault()}})
                     ));
  GM_addStyle('#UIHome_Status { display: block !important; }');
}

function getStatus() {
  if ($('navAccountName')) {
    /*if (typeof GM_xmlhttpRequest !== 'undefined')
      xXhr('http://m.facebook.com/profile.php', function(text) {
        if (stat=text.match(new RegExp('<div class="section"><div class="section_title">'+$('navAccountName').textContent+'</div><div><div id="anchor_fbid_.+?">(.+?)&nbsp;<small>\((.+?)\)</small>','i')))
          displayStatus(stat[1], stat[2]);
      });
      else */
      xhr($('navAccountName').href, function(text) {
          if ((stat=text.match(/<span id=\\"status_text\\">(.+?)<\\\/span>/i))&&(time=text.match(/<span id=\\"status_time_inner\\">(.+?)<\\\/span>/i))&&(stat[1]!=' '))
            displayStatus(stat[1], time[1]);
        });
  }
}

// Simulate Facebook's Ajax calls
function fbAjax(url, params) {
  xhr(url, function() {}, params+"&post_form_id="+unsafeWindow.Env["post_form_id"]+"&__a=1&post_form_id_source=AsyncRequest&fb_dtsg="+unsafeWindow.Env["fb_dtsg"]+"&nctr[nid]="+unsafeWindow.Env["nctrlid"]+'&nctr[ct]='+unsafeWindow.Env["start"]);
}

function statOnly() {
  var that = $('status_only_filter'),
      nf=$('navItem_nf');
  nf.className = nf.className.replace('selected', '');
  if (!that.parentNode.className.match('selected')) {
    that.parentNode.className += ' selected';
    seekAndDestroy('//i[contains(@class, "spritemap_icons") and not(contains(@class, "sx_icons_like_on")) and not(contains(@class, "sx_icons_mobile_app"))]/ancestor::li[starts-with(@id, "stream_story_")]', $('home_stream'));
  }
}

function changeRecent(type, checked) {
  var settings = GM_config.read('recentSettings');
  settings[type] = checked;
  GM_config.save('recentSettings', settings);
}

function removeActivity(doc, remove) {
  var settings = GM_config.read('recentSettings');
  forEach($x('.//div[contains(concat(" ", @class, " "), "UIRecentActivity_Stream")]//a[contains(concat(" ", @class, " "), "UIButton_Suppressed")]', doc), 
          function(recent) {
            var url = recent.getAttribute('href');
            var story_type = url.match(/story_type=(\d+)&/i)[1];
            if ((typeof settings[story_type] == "boolean" ? !settings[story_type] : GM_config.get('recentHide'))) {
              fbAjax("http://www.facebook.com/ajax/minifeed.php", "profile_fbid="+$('profile_id').value+"&ministory_key="+url.match(/story_key=(\d+)&/i)[1]+"&story_type="+story_type+"&revoke_permission=");
              if (remove)
                destroy(recent.parentNode);
            }
  });
}

function recentActivityProcess(forced) {
  // Remove those stories from your profile that Facebook publishes anytime you do anything
  // You use to be able to turn them off but now Faceboook makes you delete them one by one
  if (GM_config.get('recentHide') && $('edit_profilepicture'))
    removeActivity($('content'), true);
}

function unfuckFeed(stream) {
  // Now may I introduce some really complicated god-like XPath that locates app and fan stories so that we can remove them
  // Wall stories = eavesdropping. Why would I care what people say to eachother?
  seekAndDestroy((GM_config.get('appHide') ? '//a[starts-with(@href, "http://apps.facebook.com/") or starts-with(@href, "http://apps.new.facebook.com/") ' + (/facebook\.com\/pages\//.test(realUrl())?'':'or starts-with(@href, "http://www.facebook.com/pages/") ') + 'or starts-with(@href, "http://quiz.applatform.com/") or contains(@href, "poll_id")]/ancestor::*[starts-with(@id, "stream_story_") or starts-with(@id, "div_story_")] | //i[contains(@class, "sx_icons_fbpage_add")]/ancestor::*[(name()="LI" and starts-with(@id, "stream_story_")) or (name()="DIV" and starts-with(@id, "div_story_"))]' : '') + (GM_config.get('wallStory') && GM_config.get('appHide') ? ' | ' : '' ) + (GM_config.get('wallStory') ? '//span[@class="actorName"]/a[@class="actorName" and position()=2]/child::text()[not(.="'+$('navAccountName').textContent+'")]/ancestor::li[starts-with(@id, "stream_story_")]' : '') + ($('status_only_filter') && $('status_only_filter').parentNode.className.match('selected') ? ' | //i[contains(@class, "spritemap_icons") and not(contains(@class, "sx_icons_like_on")) and not(contains(@class, "sx_icons_mobile_app"))]/ancestor::li[starts-with(@id, "stream_story_")]':'') + (GM_config.get('addFriend') ? ' | //i[contains(@class, "sx_icons_friend")]/ancestor::li[starts-with(@id, "stream_story_")]' : ''), stream);

  return $x('count(.//li[contains(concat(" ", @class, " "), "uiStreamStory")])', $('content'), 1)
}

function unfuckFB() {
  var numberOfStories = 0;

  // Unfuck the feeds
  if (!numberOfStories || numberOfStories < $x('count(.//li[contains(concat(" ", @class, " "), "uiStreamStory")])', $('content'), 1))
    forEach($x('.//div[contains(@class, "UIStream")]', $('content')), 
            function(stream) { 
              if (GM_config.get('appHide') || GM_config.get('wallStory')) numberOfStories = unfuckFeed(stream);
            });

  // You can access Recent Story options from the "Options" link at the top of your feed and then click "Settings" when that link appears
  if (!$('recent_activity_header') && $('profile_settings') && $('profile_settings').getAttribute('style').match('display: block;')) {
    var settings = GM_config.read('recentSettings');
    var icons = {'3':'relationship', '9':'edit_profile', '10':'event', '12':'group', '15':'note', '20':'wall_post', '21':'friend', '27':'fbpage_add', '32':'post', '43':'video', '46':'photo', '69':'like', '72':'post', '107':'wall_post'};
    var labels = {'20':'Write on a Wall', '107':'Comment on a Status', '46':'Comment on a Photo', '43':'Comment on a Video', '15':'Comment on a Note', '32':'Comment on a Link', '69':'Like a Story', '10':'Attend an Event', '12':'Join a Group', '3':'Change your Relationship Status', '9':'Edit your Profile',  '21':'Add a friend', '27':'Become a Fan',  '72':'Post a Link on a Wall'};

    $('profile_settings').insertBefore(create('div', {className:'header', id:'recent_activity_header'}, create('h3', {className:'clearfix'}, create('span',{textContent:'Recent Activity Stories'}), create('div', {className:'divider', innerHTML:'&nbsp;'}))), $c('header first_header', $('profile_settings'))[0]);
      insertAfter(create('div', {className:'minor_section', id:'recent_activity_settings'}, create('span', {className:'clearfix left', textContent:'Recent Activity will appear on your Wall when you...', style:'margin-bottom: 10px; width:100%'}), create('div', {style:'width:50%', id:'recent_activity_explain'})), $('recent_activity_header'));
    forEach(labels, function(label, i) {
    $('recent_activity_explain').appendChild(create('div', {style:'padding:5px;'}, create('i', {className:'UIImageBlock_Image UIImageBlock_ICON_Image img spritemap_icons sx_icons_'+icons[i], style:'margin-right:10px;margin-left:0px;padding:0px;'}), create('input',{type:'checkbox', checked:typeof settings[i]=="boolean"?settings[i]:!GM_config.get('recentHide'), id:'recent_activity_field_'+i, style:'margin-right:5px;', onclick:function(){changeRecent(this.id.split('recent_activity_field_')[1], this.checked)}}), create(label)));
    });
  } else if ($('recent_activity_header') && !$('profile_settings')) {
    destroy($('recent_activity_header'));
    destroy($('recent_activity_settings'));
  }

  if (!$('unfucked')) {
    var left, pokes, events, requests, chat, nf, divider, pymk;
    if(left=$('leftCol')) {
      if ((chat=$('pagelet_chat_home')) && !GM_config.get('chatSide')) destroy(chat);

      if (GM_config.get('columns') == "Two") {
        if (requests=$c('UIRequestBox')[0])
          left.appendChild(requests.parentNode.parentNode);
        if(events=$c('UIUpcoming')[0]) left.appendChild(events.parentNode.parentNode);
        if(pokes=$c('pokes')[0]) left.appendChild(pokes);
      }

      if(nf=$('navItem_nf'))
        if(nf.className.match('selected') && !$('status_only_filter')) {
          nf.appendChild(create('ul', {}, create('li', {}, create('a', {href:'#', id:'status_only_filter', className:'subitem', textContent:'Status Only', onclick: function(e) {statOnly(); e.preventDefault();}}))));
          if (GM_config.get('statOnly'))
            statOnly();
        } else if(!nf.className.match('selected') && $('status_only_filter'))
          destroy($('status_only_filter'));

      if (GM_config.get('columns') == "One") {
        var ul = $('navAccount').getElementsByTagName('ul')[0];
        forEach($x('//div[@id="leftCol"]//ul[contains(@class, "uiSideNav")][position()<3]/li'), function(li) {
            ul.appendChild(li);
          });
      }
      
      // Swap the apps and games filters for the notes and links
      if (divider=$x1('//ul[contains(@class, "uiSideNav")]/li[@class="divider"]')) {
        var notes = $('navItem_2347471856'),
            links = $('navItem_app_2309869772'),
            apps = $('navItem_apps'),
            games = $('navItem_games');
        removeClass(notes, 'hidden');
        removeClass(links, 'hidden');
        addClass(apps, 'hidden');
        addClass(games, 'hidden');
        divider.parentNode.insertBefore(notes, divider);
        divider.parentNode.insertBefore(links, divider);
        insertAfter(apps, divider);
        insertAfter(games, divider);
      }
        
      if (GM_config.get('showStat')) getStatus();
    }

    recentActivityProcess();
    ($('contentArea')||$('content')).appendChild(create('div', {id:'unfucked',style:'display:none;'}));
  }
}

// Re-run my code when the page changes, wouldn't have to do this if I could use CSS
function process() {
  $('content').removeEventListener('DOMSubtreeModified', process, false);
  setTimeout(unfuckFB, 0);
  $('content').addEventListener('DOMSubtreeModified', process, false);
}

// Wait for Facebook's content element to exist
if (self.location == top.location)
    var checker=setInterval(function(){
        if($('content')) {
          clearInterval(checker);
          GM_addStyle(unfuckStyle);
          
          // Add access to the Settings Menu from the Navigation bar
          var ul = $('navAccount').getElementsByTagName('ul')[0];
          ul.insertBefore(create('li', {}, create('a', {href:'#', textContent:'UnFuck FB Settings', onclick:function(e){GM_config.open();e.preventDefault()}})), ul.lastChild);

          // Browser compatiblity
          if(GM_config.isGM)
            GM_registerMenuCommand("UnFuck FB Options", function() {GM_config.open()});
          else
            unsafeWindow = window;

          process(); // Start the listener
        }
      }, 200);
/*
  unfuck.exe Version 1.0 
  c.1999 SHIT Industries 
*/