// ==UserScript==
// @name           Google Reader Absolutely Customizable
// @namespace      http://userscripts.org/scripts/show/58577
// @description    Allows user to choose certain page elements to be hidden, resized or modified
// @include        http://www.google.*/reader/*
// @include        https://www.google.*/reader/*
// @version        3.11.2012.220
// ==/UserScript==

// Manually included UserScript
// name           GM_config
// namespace      http://userscripts.org/users/23652
// description    GreaseMonkey Script Configurator
// copyright      JoeSimmons & Sizzlemctwizzle & IzzySoft
// version        1.2.4
// license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// /UserScript

/* Instructions
GM_config is now cross-browser compatible.

To use it in a Greasemonkey-only user script you can just @include it.

To use it in a cross-browser user script you will need to manually
include the code at the beginning of your user script. In this case
it is also very important you change the "storage" value below to
something unique to prevent collisions between scripts. Also remeber
that in this case that stored settings will only be accessable on
the same domain they were saved.
*/

var GM_config = {
storage: 'GM_config_AbsCust', // This needs to be changed to something unique for localStorage
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
           //         else use the stored value
           var value = typeof stored[i] == "undefined" ? (typeof set['defval'] == "undefined" ? null : set['defval']) : stored[i];
           
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
               field.value = set['defval'] || '';
               break;
           case 'hidden':
               field.value = set['defval'] || '';
               break;
           case 'textarea':
               field.value = set['defval'] || '';
               break;
           case 'checkbox':
               field.checked = set['defval'] || false;
               break;
           case 'select':
               if(set['defval']) {
                   for(var i=field.options.length-1; i>=0; i--)
                   if(field.options[i].value==set['defval']) field.selectedIndex=i;
               }
               else field.selectedIndex=0;
               break;
           case 'span':
               var radios = field.getElementsByTagName('input');
               if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
                   if(radios[i].value==set['defval']) radios[i].checked=true;
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
// End of GM_config code


// Begin Google Reader Absolutely Compact code
function ApplyCSS() {
    var sideNavWidth = GM_config.get("resizeSideNav") || "264";
    var sideNavSpaceSaved = parseInt(sideNavWidth) - 264;
    
    GM_addStyle( cssDefault );
    GM_addStyle( cssSideNavSize.replace(/side-nav-size/g, sideNavWidth) );
    if (GM_config.get("hideGoogNav")) {
       GM_addStyle( cssGoogNav );
    }
    if (GM_config.get("hideSearchBar")) {
       GM_addStyle( cssSearchBar );
    }
    if (GM_config.get("hideFeedControls")) {
       GM_addStyle( cssFeedControls );
    }
    if (GM_config.get("hideHomeAllItemsNav")) {
       GM_addStyle( cssHomeAllItemsNav );
    }
    if (GM_config.get("hideExploreNav")) {
       GM_addStyle( cssExploreNav );
    }
    if (GM_config.get("hideLeftNavFeedSettings")) {
       GM_addStyle( cssLeftNavFeedSettings );
    }
    if (GM_config.get("hideSideNavIcons")) {
       GM_addStyle( cssSideNavIcons );
       sideNavSpaceSaved += 21;
    }
    if (GM_config.get("hideChevrons")) {
       GM_addStyle( cssChevrons );
    }
    if (GM_config.get("hideEntryActions")) {
       GM_addStyle( cssEntryActions );
    }
    if (GM_config.get("shrinkWhiteSpace")) {
       GM_addStyle( cssWhiteSpace );
       sideNavSpaceSaved += 28;
    }
    if (GM_config.get("resizeImages")) {
       GM_addStyle( cssResizeImages );
    }
    if (GM_getValue("hideEntryStar", false)) {
       GM_addStyle( cssHideEntryStar );
    }
    if (GM_getValue("hideEntryEmail", false)) {
       GM_addStyle( cssHideEntryEmail );
    }
    if (GM_getValue("hideEntryTags", false)) {
       GM_addStyle( cssHideEntryTags );
    }
    if (GM_getValue("hideEntrySendTo", false)) {
       GM_addStyle( cssHideEntrySendTo );
    }

    if (GM_config.get("maxFeedTitles")) {
       GM_addStyle( cssMaximizeFeedTitles );
    } else {
        cssAlwaysShowUnreadCount = cssAlwaysShowUnreadCount.replace(/subfolder-name-no-unread-counts-size/g, 171 + sideNavSpaceSaved);
        cssAlwaysShowUnreadCount = cssAlwaysShowUnreadCount.replace(/subfolder-name-size/g, 125 + sideNavSpaceSaved);
        cssAlwaysShowUnreadCount = cssAlwaysShowUnreadCount.replace(/folder-name-no-unread-counts-size/g, 178 + sideNavSpaceSaved);
        cssAlwaysShowUnreadCount = cssAlwaysShowUnreadCount.replace(/folder-name-size/g, 132 + sideNavSpaceSaved);
       GM_addStyle( cssAlwaysShowUnreadCount );
    }

    GM_addStyle(GM_config.get("customCSS"));
}

GM_config.init("Absolutely Customizable Options", {
    hideGoogNav: {
       section: ['Hide the following items:'],
       label:"Google navigation bar",
       type:"checkbox",
       defval:true
    },
    hideSearchBar: {
       label:"Logo and search bar",
       type:"checkbox",
       defval:false
    },
    hideFeedControls: {
       label:"Feed Controls",
       type:"checkbox",
       defval:false
    },
    hideHomeAllItemsNav: {
       label:"Home link and 'All Items' side navigation",
       type:"checkbox",
       defval:true
    },
    hideExploreNav: {
       label:"Explore option",
       type:"checkbox",
       defval:true
    },
    hideSideNavIcons: {
       label:"Side navigation icons",
       type:"checkbox",
       defval:true
    },
    hideLeftNavFeedSettings: {
       label:"Feed settings drop down in side navigation",
       type:"checkbox",
       defval:true
    },
    hideChevrons: {
       label:"Chevron links (»)",
       type:"checkbox",
       defval:true
    },
    hideEntryActions: {
       label:"Entry actions",
       type:"checkbox",
       defval:true
    },
    shrinkWhiteSpace: {
       section: ['Other changes:'],
       label:"Super-Compact density",
       type:"checkbox",
       defval:true
    },
    resizeImages: {
       label:"Shrink images to fit horizontally",
       type:"checkbox",
       defval:true
    },
    maxFeedTitles: {
       label:"Maximize title lengths in feed list",
       type:"checkbox",
       defval:true
    },
    resizeSideNav: {
       label:"Resize side navigation (in pixels)",
       type:"int",
       cols:3,
       defval:175
    },
    customCSS: {
       label:"Custom CSS",
       type:"textarea",
       cols:50,
       rows:10
    }
}, ".indent40 { \
    margin-left: auto !important; \
    text-align: center !important; } \
#config_header { \
    font-size: 20pt !important; } \
div.section_header_holder { \
    margin-top: 0 !important; } \
h2.section_header { \
    text-align: left !important; } \
.config_var .field_label { \
    margin-left: 23px !important; } \
.config_var input[type='checkbox'] { \
    position: absolute !important; \
    left: 5px !important; } \
#field_customCSS{ \
    display: block; \
    font: 12px monospace; \
    margin-left: 25px; }",
{
    save: function() {
       location.reload();
    }
}
);

function ShowCustomizeDialog() {
    var subscriptionsMenu = document.getElementById("cust-menu-item-inner").parentNode;
    subscriptionsMenu.setAttribute("style", "display: none");
    GM_config.open();
}

function AddCustomizeMenu() {
    if (!document.getElementById("cust-menu-item-inner")) {
        var subscriptionsMenu = document.getElementById(":i").parentNode;
        var newSeparator = subscriptionsMenu.appendChild(document.createElement("div"));
        newSeparator.setAttribute("class", "goog-menuseparator");
        newSeparator.setAttribute("style", "-moz-user-select: none;");
        newSeparator.setAttribute("role", "separator");
        var customizeMenuItemOuter = subscriptionsMenu.appendChild(document.createElement("div"));
        customizeMenuItemOuter.setAttribute("class", "goog-menuitem");
        customizeMenuItemOuter.setAttribute("role", "menuitem");
        customizeMenuItemOuter.setAttribute("style", "-moz-user-select: none;");
        customizeMenuItemOuter.setAttribute("id", "cust-menu-item-inner");
        customizeMenuItemOuter.addEventListener("mouseover", function(){this.setAttribute("class", "goog-menuitem goog-menuitem-highlight")}, false);
        customizeMenuItemOuter.addEventListener("mouseout", function(){this.setAttribute("class", "goog-menuitem")}, false);
        var customizeMenuItemInner = customizeMenuItemOuter.appendChild(document.createElement("div"));
        customizeMenuItemInner.setAttribute("class", "goog-menuitem-content");
        customizeMenuItemInner.setAttribute("id", "cust-menu-item-inner");
        customizeMenuItemInner.innerHTML = "Customize...";
        customizeMenuItemInner.addEventListener("click", ShowCustomizeDialog, false);
    }
}
subscripMenuButton = document.getElementById("lhn-subscriptions-menubutton");
subscripMenuButton.addEventListener("click", AddCustomizeMenu, false);

var cssDefault = "#entries .entry-body, \
.entry .entry-title { \
    max-width: none !important; } \
.entry .entry-container { \
    padding-left: 1em !important; \
    padding-right: 1em !important; } \
#GM_config { \
    width: 500px !important; } \
#logo-section { \
    display: none !important; } \
#lhn-add-subscription { \
    top: 50% !important; } ";

var cssGoogNav = "#gb { \
    height: auto !important; } \
#gbzw, \
#gbx3 { \
    display: none !important; } \
#gbx1, \
#gbq, \
#gbu, \
#gb.gbesi #gbx1, \
#gb.gbesi #gbq, \
#gb.gbesi #gbu { \
    top: 0 !important; } \
#gbx1 { \
    position: static !important; }";

var cssSearchBar = "#gb { \
    height: auto !important; } \
#gbx1, \
#gbq, \
#gbu { \
    display: none !important; } \
#gbx3 { \
    position: static !important; }";

var cssFeedControls = "#lhn-add-subscription-section, \
#viewer-header-container { \
    display: none !important; }";

var cssHomeAllItemsNav = "#home-section, \
#lhn-selectors { \
    display: none !important; }";

var cssExploreNav = "#lhn-recommendations { \
    display: none !important; }";

var cssLeftNavFeedSettings = "a:hover .tree-item-action-container,  \
.menu-open .tree-item-action-container { \
    display: none !important; }";

var cssSideNavSize = "#nav, \
#logo-container, \
#lhn-add-subscription-section, \
#scrollable-sections-top-shadow, \
#scrollable-sections-bottom-shadow { \
    max-width: side-nav-sizepx !important; \
    width: side-nav-sizepx !important; } \
#chrome { \
    margin-left: side-nav-sizepx !important; } \
#search { \
    margin-left: side-nav-sizepx !important; \
    padding-left: 3px !important; } \
.lhn-hidden #chrome { \
    margin-left: 0px !important; }";

var cssMaximizeFeedTitles = ".name-text { \
    max-width: none !important; }";

var cssAlwaysShowUnreadCount = ".folder .folder .name-text { \
    max-width: folder-name-sizepx !important; } \
.folder .name-text, \
#reading-list-selector .label { \
    max-width: subfolder-name-sizepx !important; } \
.lhn-section-no-unread-counts .folder .folder .name-text, \
#lhn-recommendations .folder .folder .name-text { \
    max-width: subfolder-name-no-unread-counts-sizepx !important; } \
.lhn-section-no-unread-counts .folder .folder .name-text.folder-name-text { \
    max-width: folder-name-no-unread-counts-sizepx !important; }";

var cssSideNavIcons = "#lhn-selectors .selector-icon, \
.scroll-tree .icon { \
    width: 0 !important; }";

var cssChevrons = ".entry .entry-title .entry-title-go-to, \
#entries.list .collapsed .entry-main .entry-original, \
#chrome-title .chevron { \
    display: none !important; } \
\
#entries.list .collapsed .entry-secondary { \
    margin-right: 0 !important; \
    margin-right: 7em !important; } \
\
#entries .collapsed .entry-date { \
    margin: 0 2px 0 0 !important; }";

var cssEntryActions = ".card-common .card-actions, \
.entry .entry-actions { \
    height: 0 !important; \
    padding: 0 !important; } \
#current-entry.action-area-visible .entry-actions, \
#current-entry.active-action-area .entry-actions { \
    display: none !important; } \
#entries.list .entry .entry-actions > span { \
    background: none !important; }";

var cssWhiteSpace = "/* header bars */ \
#top-bar { \
    height: auto !important; } \
#logo { \
    margin-top: -13px !important; } \
#logo, \
#lhn-add-subscription { \
    margin-left: 19px !important; } \
#search { \
    padding: 2px 3px !important; } \
#lhn-add-subscription, \
#viewer-top-controls-container { \
    margin-top: -15px !important; } \
#lhn-add-subscription-section, \
#viewer-header { \
    height:33px !important; } \
\
/* side navigation area */ \
#home-section { \
    padding-top: 0 !important; \
    padding-bottom: 0 !important; } \
.lhn-section-primary, \
#recommendations-tree .lhn-section-primary { \
    height: 25px !important; } \
.selectors-footer, \
.lhn-section-footer { \
    margin-bottom: 0 !important; \
    padding-bottom: 0 !important; } \
.section-minimize { \
    left: 2px !important; } \
#overview-selector, \
#reading-list-selector, \
#star-selector, \
#trends-selector, \
#directory-selector, \
#recs-tree-item-0-name, \
#sub-tree-header { \
    padding-left: 13px !important; } \
.lhn-section-footer { \
    margin-left: 13px !important; } \
.folder .folder .folder-toggle { \
    margin-left: 5px !important; } \
.folder .folder > a > .icon, \
.folder .sub-icon, \
.folder .tag-icon { \
    margin-left: 20px !important; } \
.folder .folder > ul .icon { \
    margin-left: 27px !important; } \
#entries-status { \
    top: auto !important; } \
\
/* shrink titles, but add underlining for visual identification */ \
.entry .entry-title { \
    font-size: 100% !important; } \
.entry .entry-title .entry-title-link { \
    text-decoration: underline !important; } \
/* tighten up spacing around entries */ \
#entries { \
    padding: 0 !important; } \
/* expanded view */ \
#entries.cards .entry { \
    margin: 0 !important; } \
#entries.cards .card-content { \
    padding: 5px !important; } \
/* list view */ \
#entries.list .collapsed .entry-source-title, \
#entries.list .collapsed .entry-title, \
#entries.list .collapsed .entry-date { \
    line-height: 1.5em !important; } \
#entries.list .entry .collapsed { \
    height: 1.5em !important; } \
#entries.list .expanded .entry-secondary-snippet { \
    display: none !important; } \
/* menu items */ \
.goog-menuitem, \
.goog-tristatemenuitem, \
.goog-filterobsmenuitem, \
.goog-menuitem-highlight, \
.goog-menuitem-hover { \
    padding-top: 0px !important; \
    padding-bottom: 0px !important; \
    border-width: 0 !important; }";

var cssResizeImages = ".item-body img,  \
.item-body a img,  \
.item-body embed {  \
    max-width:100% !important;  \
    height: auto !important; }";

/* Hidden options */
var cssHideEntryStar = ".entry .entry-actions .item-star { \
    display: none !important; }";

var cssHideEntryEmail = ".entry .entry-actions .email { \
    display: none !important; }";

var cssHideEntryTags = ".entry .entry-actions .tag { \
    display: none !important; }";

var cssHideEntrySendTo = ".entry .entry-actions .item-link { \
    display: none !important; }";

ApplyCSS();