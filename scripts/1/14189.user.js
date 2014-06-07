// ==UserScript==
// @name           Modified Gmail Macros v. 2.0
// @namespace      http://groups-beta.google.com/group/gmail-power-users
// @description	   Extra (customizable) keyboard shortcuts and macros for Gmail 2.0.  Based on the work of Mihai @ persistent.info.  Version(date): 20081021.1
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==
//

// Auto-update code
var scriptVersion=20081021.1;

window.addEventListener('load', function() {
	(function(){
	  var gmailapi = typeof unsafeWindow != "undefined" && unsafeWindow.gmonkey 
	                 || (frames.js ? frames.js.gmonkey : null);
		if (gmailapi == null) {
			setTimeout(arguments.callee, 0);
			return;
		}
    gmailapi.load('1.0', init);
	})();
}, false);


// Add Missing GM_ API functions for GreaseKit
//
if (typeof(GM_addStyle) != 'function') {
	function GM_addStyle(css) {
		var head = document.getElementsByTagName('head');
		if (!!head) {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.textContent = css;
			head[0].appendChild(style);
		}
	}
}
if (typeof(GM_setValue) != 'function' && typeof(GM_getValue) != 'function') {
	function GM_setValue(name, value) {
		document.cookie = [
			name, '=', escape(value),
			';expires=', (new Date(new Date().getTime() + 365 * 1000 * 60 * 60 * 24)).toGMTString()
		].join('');
	}
	function GM_getValue(name, value) {
		var r = new RegExp(name + '=([^;]*)'), m;
		if (m = document.cookie.match(r)) {
			return unescape(m[1]);
		}
		return value;
	}
	function GM_delValue(name, value) {
		if (GM_getValue(name, false))
			document.cookie = name + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
	}
} else {
	var GM_delValue = GM_setValue;
}


// Add Missing Iterator function
//
if (typeof(Iterator) != 'function') {
	function Iterator(o) {
	    var r = [];
	    for (x in o) {
	      r.push(x);
	    }
	    return r;
	}
}


/** Brent's Functions **/
var MACRO_MAPPING = {
  'g': 'GOTO',
  'l': 'APPLYLABEL',
  'L': 'REMOVELABEL',
  'N': 'NEWLABEL',
  'e': 'ARCHIVE',
  'E': 'READARCHIVE',
  'f': 'FOCUS',
  'i': 'MOVEINBOX',
  'T': 'READTRASH',
  't': 'TRASH',
  'r': 'READ',
  'R': 'UNREAD',
  'X': 'SELECT',
  'Z': 'KEYS',
  'h': 'HELP',
  ',': 'CATCHUP',
  'U': 'UPDATECON',
  'O': 'EXPANDCOLLAPSE',
  'q': 'ADDQUICKLINK',
};

// Map selectors to 'selector' attribute
const SELECTORS = {
   'a': 'all',
   'n': 'none',
   'r': 'read',
   's': 'starred',
   'S': 'unstarred',
   'u': 'unread'
};

// To find additional keymappings: http://javascript.js-x.com/key_codes/
const KEY_MAP = {
   '65':'a', '65s':'A',
   '66':'b', '66s':'B',
   '67':'c', '67s':'C',
   '68':'d', '68s':'D',
   '69':'e', '69s':'E',
   '70':'f', '70s':'F',
   '71':'g', '71s':'G',
   '72':'h', '72s':'H',
   '73':'i', '73s':'I',
   '74':'j', '74s':'J',
   '75':'k', '75s':'K',
   '76':'l', '76s':'L',
   '77':'m', '77s':'M',
   '78':'n', '78s':'N',
   '79':'o', '79s':'O',
   '80':'p', '80s':'P',
   '81':'q', '81s':'Q',
   '82':'r', '82s':'R',
   '83':'s', '83s':'S',
   '84':'t', '84s':'T',
   '85':'u', '85s':'U',
   '86':'v', '86s':'V',
   '87':'w', '87s':'W',
   '88':'x', '88s':'X',
   '89':'y', '89s':'Y',
   '90':'z', '90s':'Z',
   '49':'1', '49s':'!',
   '50':'2', '50s':'@',
   '51':'3', '51s':'#',
   '52':'4', '52s':'$',
   '53':'5', '53s':'%',
   '54':'6', '54s':'^',
   '55':'7', '55s':'&',
   '56':'8', '56s':'*',
   '57':'9', '57s':'(',
   '48':'0', '48s':')',
   '188':',', '188s':'<',
   '190':'.', '190s':'>',
   '191':'/', '191s':'?',
   '116s':'shift+F5',
   '27':'escape',
   '37':'left',
   '38':'up',
   '39':'right',
   '40':'down',
};


var timeout_value  = 500;
var selectAction   = false;
var helpAction     = false;
var debugVar       = false;
var ignoreNext     = false;
var Action         = null;
var currentMacro   = null;
var currentCat     = null;
var menus          = ['GENERAL','THREADLIST','CONVERSATION','LABELS','SELECT','GMAIL'];
// don't remember what oricqc is, but URTWZe = New Label
var IGNORE_TARGETS = {'oricqc':1,'URTWZe':1,'rtm-task-card-container':1};
var IGNORENEXTKEY  = ' *';

// Utility functions
function getTranslatedEventCode (event) {
  eventCode = event.keyCode;
  eventCode += (event.shiftKey) ? "s" : "";
  debug("getTranslatedEventCode - heard key: "+eventCode);
  return ( KEY_MAP[eventCode] ) ? KEY_MAP[eventCode] : 0;
}

function getMacro (macro) {
  if (macro != 0) return MACRO_MAPPING[macro];
  else return 0;
}

function bogus(event) {
  if ( !keepEvent(event) ) return false;
  if (!helpAction) endLabelInput();
  if (Action) return true;
  return false;
}

function getUnusedKey(key,keyMap) {
  var it = Iterator(KEY_MAP);
  for (var pair in it) {
    if ( !(pair[1] in keyMap) && key != pair[1] ){
      return pair[1];
    }
  }
  return false;
}

function retrieveData(gmCookie, keyMap) {
  var mappings = GM_getValue(gmCookie,'');
  var tKeyMap = {};
  if (mappings && mappings.length > 0) {
    var re = RegExp("'\(.*?\)':'\(.*?\)',", "g");
    var tmp;
    while (tmp = re.exec(mappings)) {
      var key   = tmp[1];
      var macro = tmp[2];
     
      // If the macro is defined by default: keep it
      // else: ignore it
      var it = Iterator(keyMap);
      for (var pair in it) {
        if ( pair[1] == macro) {
          tKeyMap[key] = macro;
          delete keyMap[pair[0]];
          break;
        }
      }
    }
    // The remaining default keymaps are added to the stored ones.
    var it = Iterator(keyMap,true);
    for ( var key in it ){
      if (tKeyMap[key]) {
        tKeyMap[getUnusedKey(key,tKeyMap)] = keyMap[key];
      }
      else {
         tKeyMap[key] = keyMap[key];
      }
    }
    for (i in tKeyMap) {
        keyMap[i] = tKeyMap[i];
    }
  }
  debug("retrieveData - keymap: "+stringifyKeyMap(keyMap));
}


function saveMacroMappings() {
  storeData("macros","gm_key",MACRO_MAPPING);
  storeData("selectors","gm_select_key",SELECTORS);
  var ignoreInput = getNodesByTagNameAndClass(getDoc().body, "input", "gm_text");
  if (ignoreInput[1]){
    var temp = " "+ignoreInput[1].value.replace(/ /g,'');
    debug("saveMacroMappings\nignorenextkey: "+ignoreInput[1].value
        +"\ntemp: "+temp);
    IGNORENEXTKEY = temp;
    GM_setValue('ignorenextkey', temp);
  }
}

function storeData(gmCookie, inputClass, keyMap) {
  // Get current ids to change.
  var keysToChange = getNodesByTagNameAndClass(getDoc().body, "input", inputClass);
  var saveValues = [];

  // Foreach id find the MACRO in keyMap, delete it and add the new one
  for ( var i=0; i<keysToChange.length; i++) {
    var oldkey = keysToChange[i].id;
    var newkey = keysToChange[i].value;
    var macro  = keysToChange[i].alt;
    // if the value changed update the keyMap
    if (oldkey != newkey) {
      // is the new key taken?
      if ( newkey in keyMap ){
        saveValues.push(keyMap[newkey]);
        delete keyMap[newkey];
      }
      delete keyMap[oldkey];
      keyMap[newkey] = macro;
    }
  }
  for (var j=0; j<saveValues.length; ++j){
    keyMap[getUnusedKey('z',keyMap)] = saveValues[j];
  }

  // Write out the keyMap var to a greasemonkey variable
  var mapping = stringifyKeyMap(keyMap);
  debug("storeData - Storing: "+mapping);
  GM_setValue(gmCookie, mapping);
}

function stringifyKeyMap(keyMap){
  var it = Iterator(keyMap);
  var mapping = "{";
  for ( var pair in it) {
    var key = pair[0];
    var macro = pair[1];
    mapping += "'" + key + "':'" + macro + "', ";
  }
  mapping += "}";
  return mapping;
}


function helpMouseHandler(event){
  // check the target.  If none of the parents = 'banner' then end
  var good = false;
  var elem = event.target;
  
  if (menus.indexOf(elem.id) >= 0) {
    banner.update(generateHtmlHelp(elem.id));
    event.preventDefault();
    return false;
  }

  if (elem.id == 'save') {
    saveMacroMappings();
    event.preventDefault();
    return false;
  }

  //if the click doesn't find a parent of banner, it was "off the reservation".
  for(var i=0; i<11; i++) {
    if (elem) {
      if (elem.className == 'banner') {
        good = true;
        break;
      }
      elem = elem.parentNode;
    } else break;
  }
  if (!good) {
    endHelp();
    return true;
  }
  return false;
}

function helpKeyHandler(event){
  // Run the default checks on the event
  if ( !keepEvent(event) ) return false;
  var k = getTranslatedEventCode(event);

  // the calling 'h' is returned
  //   this could be ignored, but throwing it out saves a cycle or two.
  if (k == 'h') return false;

  if (k == 'escape' && helpAction) {
    endHelp();
    return true;
  }

  // Process help navigation
  if (helpAction) {
    var html;
    if ( k == 'up' ) html = generateHtmlHelp(getCat(-1));
    if ( k == 'down' ) html = generateHtmlHelp(getCat(1));
    if ( k == 'right' ) {

      var inputnodes = getNodesByTagNameAndClass(banner.foregroundNode,"input","gm_key");
      if ( !inputnodes || inputnodes.length == 0 )
        inputnodes = getNodesByTagNameAndClass(banner.foregroundNode,"input","gm_text");

      if ( inputnodes ){
        inputnodes[0].focus();
        inputnodes[0].select();
      }
    }
    if (html) banner.update(html);
  }
  return false;
}

function getCat(offset) {
  var temp_menus = menus;
  var catindex = temp_menus.indexOf((currentCat) ? currentCat : "GENERAL");
  if (catindex == 0 && offset < 0) catindex = temp_menus.length-1;
  else if (catindex == temp_menus.length-1 && offset > 0) catindex = 0;
  else catindex += offset;

  return temp_menus[catindex];
}

function endHelp(){
  helpAction = false;
  endAction();
  getDoc().removeEventListener("keyup", helpKeyHandler, false);
  getDoc().removeEventListener("click", helpMouseHandler, false);
}

function keepEvent(event) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (ignoreNext){
     ignoreNext = false;
     debug("Ignored key...");
     return false;
  }
  if (event.altKey || event.ctrlKey || event.metaKey) return false;

  // IF JUST SHIFT then return
  if (event.keyCode == 16) return false;
  
  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && 
         event.target.id && event.target.id != "gmmacrolabel" &&
         event.target.type &&
         (event.target.type.toLowerCase() == "text" ||
          event.target.type.toLowerCase() == "file"))) {
      return false;
    }
  }
  //These targets are ok...
  debug("nodeName: "+event.target.nodeName);
  if (event.target.className in IGNORE_TARGETS
   || event.target.nodeName == 'INPUT' )
//   || event.target.id.match(/^rtm/) 
     return false;

  return true;
}

// shortened clickmoreactionmenuitem
function cmami(action) {
  clickMoreActionsMenuItem(action.label, action.act);
}

function doButton(action) {
  var button = getFirstVisibleNode(
      evalXPath(".//button[@act='" + action.act + "']", getDoc().body));

  if (button) {
    simulateClick(button, "click");
    return true;
  }
  return false;
}

var htmlHelpMenu = function(cat) {
  var html = "";
  for (var i=0; i < menus.length; i++ ) {
    html += "<li>";
    html += "<a href=# id=\""+ menus[i] +"\"";
    if (cat == menus[i]) html += " class=\"selected\"";
    html += ">"+ menus[i].toLowerCase() +"</a></li>";
  }
  return html;
}

var htmlHelpHeader = function(cat) {
  return ""
    + "<style type=\"text/css\">"
    + "  .helptable { margin: 0; padding; 0; color: #fff;}"
    + "  .helptable caption { "
    + "     font-size: 32px !important; "
    + "     font-weight: normal; "
    + "     color: #fff;"
    + "     border-bottom: 1px solid #aaa;"
    + "     margin-bottom: 10px;"
    + "  }"
    + "  .help_menu { list-style-type:none; margin: 0; padding: 0; color: #fff; }"
    + "  .help_menu a { text-transform: capitalize; text-decoration: none; font-weight: normal; color: #aaa; }"
    + "  .help_menu a:hover { text-decoration: underline; color: #fff; }"
    + "  .macros a, .help_menu a.selected { color: #fff; text-decoration: underline; font-weight: bold; }"
    + "  .macros { font-size: 12px; text-align: left; color: #fff; }"
    + "  .macros input[type=text] {"
    + "    width: 20px; font-weight: bold;text-align: center;"
    + "    background: #666; border:1px solid #fff; color: #fff;"
    + "    margin: 5px;"
    + "  }"
    + "  .macros #IGNORENEXTKEY { width: 40px !important; }"
    + "  .macros td { padding:0 0 5px 0 !important; }"
    + "</style>"
    + ""
    + "<table class=\"helptable\" style=\"color: #000;font-size:12px;width:100%\">"
    + "  <caption>\n"
    + "    Available Keyboard Commands\n"
    + "  </caption>"
    + "  <tr>"
    + "    <td align=\"left\" valign=\"top\" width=90px>"
    + "      <ul class=\"help_menu\">"
    + htmlHelpMenu(cat)
    + "      </ul>"
    + "    </td>"
    + "    <td valign=\"middle\">"
    + "      <table class=\"macros\">";
}

var htmlHelpFooter = function() {
  return "</table></td></tr></table>";
}

function generateHtmlHelp(cat) {
  if (!cat) cat = "GENERAL";
  currentCat = cat;

  var it = Iterator(MACRO_MAPPING);
  var html = htmlHelpHeader(cat);
  for ( var pair in it) {
    var key = pair[0];
    var macro = pair[1];
    
    if (!ACTIONS[macro]) continue;

    if (ACTIONS[macro].cat == cat) {
      html += "<tr><td><input class=\"gm_key\" onclick='this.select();' id=\"" 
        + key +"\" type=text size=1 value=\"" + key + "\" alt=\""
        + macro +"\"></td><td><label for=\"" + key + "\">" 
        + ACTIONS[macro].desc + "</label></td></tr>";
    }
    if (cat == 'SELECT' && macro == 'SELECT') {
      var selectIt = Iterator(SELECTORS);
      for (var selectMacro in selectIt) {
        html += "<tr><td style=\"padding-left: 20px;\"><input onclick='this.select();' id=\"" 
          + selectMacro[0] + "\" type=text class=\"gm_select_key\" alt=\""
          + selectMacro[1] + "\"size=1 value=\"" + selectMacro[0]+"\"></td><td><label>" 
          + selectMacro[1] + "</label></td></tr>";
      }
    }
  }
  if (cat == 'GMAIL') {
    html += "<tr><td colspan=2 valign=\"middle\" align=\"center\"><a href=\"http://mail.google.com/support/bin/answer.py?hl=en&ctx=mail&answer=6594\">Gmail help file</a> or try pressing '?'</td></tr>";
    html += "<tr style=\"border: 1px solid #ccc;\"><td>"
      + "<input class=\"gm_text\" id=\"IGNORENEXTKEY\" type=text value=\""
      + IGNORENEXTKEY.replace(/ /g,'') 
      + "\"/></td><td><label for=\"IGNORENEXTKEY\">This box takes a string.  "
      + "Any letters in the string effectively make the next key press ignored.  "
      + "This is best used for any gmail commands that take multiple characters. "
      + "Since the default select commands start with '*', this is the default.  "
      + "If you ever change the '*' command, you have to make a corresponding change here."
      + "</label></td></tr>";
  }
  // Now the GMAIL tab has a input box...
  html += "<tr><td align=center colspan=2><input type=button value=\"Save Mapping\" id=\"save\"></td></tr>";

  html += htmlHelpFooter();
  return html;
}

function endLabelInput(){
  if (labelInput) labelInput.blur();
}

function isQuickLink(label){
  var re = RegExp("^\([a-z]*\)/?\(.*\)*", "g");
  var tmp = re.exec(label);
  var quicklinkarray = {'search':1,'label':1};

  debug("quicklink: label: '"+label+"'");

  // create quicklinkarray
  var it = Iterator(SPECIAL_LABELS);
  for ( var pair in it) {
    quicklinkarray[pair[1]] = 1;
  }
  
  // Error in regexp...
  if (!tmp) {
     debug("ERROR IN REGEXP: "+re);
     return false;
  }

  if ( tmp[1] in quicklinkarray )
  {
    debug("isQuickLink - true: ");
    return true;
  }

  debug("default: "+label+"\ntmp[1]: "+tmp[1]+"\ntmp[2]: '"+tmp[2]+"'");
  return false;
}

function debug(str){
  if (debugVar){
    GM_log(str);
  }
}

/** END Brent's Functions **/





var UNREAD_COUNT_RE = /\s+\(\d+\)?$/;

var MORE_ACTIONS_MENU_HEADER_CLASS = "QOD9Ec";
var MORE_ACTIONS_MENU_BODY_CLASS = "Sn99bd";
var MORE_ACTIONS_MENU_ITEM_CLASS = "SenFne";

var LABEL_ITEM_CLASS_NAME = "zD5BAe";
var QUICK_LINKS_DIV_CLASS = "KnF38d";
var ADD_QL_CLASS          = "Qj7Rff";

var UPDATE_MESSAGE_CLASS   = "Gf76kb";
var EXPAND_MSG_IMG_CLASS   = "kPoXId";
var COLLAPSE_MSG_IMG_CLASS = "Dm2exe";
var NEW_LABEL_CLASS        = "URTWZe";

var MARK_AS_READ_ACTION    = { act: "1",  label: "Mark as read" };
var MARK_AS_UNREAD_ACTION  = { act: "2",  label: "Mark as unread" };
var ARCHIVE_ACTION         = { act: "7",  label: "Archive" };
var MOVE_TO_INBOX_ACTION   = { act: "8",  label: "Move to inbox" };
var TRASH_ACTION           = { act: "10", label: "Delete" };
var ADD_LABEL_ACTION       = { act: "12", label: "Apply label" };
var REMOVE_LABEL_ACTION    = { act: "13", label: "Remove label" };
var NEW_LABEL_ACTION       = { act: "14", label: "New label..." };

// Map from nav pane names to location names
var SPECIAL_LABELS = {
  "Inbox": "inbox",
  "Starred": "starred",
  "Chats": "chats",
  "Sent Mail": "sent",
  "Drafts": "drafts",
  "All Mail": "all",
  "Spam": "spam",
  "Trash": "trash",
  "Contacts": "contacts",
  "Settings": "settings",
}

const ACTIONS = {
  'GOTO': {
    cat: 'LABELS', 
    desc: "Go to label",
    label: "Go to label",
    func: function(labelName) {
      if (labelName in SPECIAL_LABELS) {
        top.location.hash = "#" + SPECIAL_LABELS[labelName];      
      } else if ( isQuickLink(labelName)){
        top.location.hash = labelName;
      } else {
        top.location.hash = "#label/" + encodeURIComponent(labelName);
      }
      endLabelInput();
    }
  },
  'APPLYLABEL': {
    cat: 'LABELS', 
    desc: "Apply label",
    label: "Apply label",
    func: function (labelName) {
      clickMoreActionsMenuItem(labelName, ADD_LABEL_ACTION.act);
    },
  },
  'REMOVELABEL': {
    cat: 'LABELS',
    desc: "Remove label",
    label: "Remove label",
    func: function (labelName) {
      clickMoreActionsMenuItem(labelName, REMOVE_LABEL_ACTION.act);
    }
  },
  'ARCHIVE': {
    cat: 'GENERAL',
    desc: 'Always archive',
    func: function() {
      if (!doButton(ARCHIVE_ACTION)) {
        cmami(ARCHIVE_ACTION);
      }
    }
  },
  'READARCHIVE': { 
    cat: 'THREADLIST',
    view: 'tl',
    desc: 'Mark as read; then archive',
    func: function() {
      ACTIONS['READ'].func();

      // Wait for the mark as read action to complete
      window.setTimeout(function() {
        // Just re-use the always archive action
        ACTIONS['ARCHIVE'].func();
      }, timeout_value);
    }
  },
  'FOCUS': {
    view: 'tl',
    cat: 'THREADLIST',
    desc: 'Show unread and inbox messages (works from label view)',
    func: function() {
      // Can only focus when in threadlist views
      if (gmail.getActiveViewType() != 'tl') return;

      var loc = top.location.hash;
      if (loc.length <= 1) return;
      loc = loc.substring(1);

      var search = getSearchForLocation(loc);

      if (search === null) {
        return;
      }

      search = search.replace(/[\/\\]/g, "-") 
         + " {in:inbox is:starred is:unread} -is:muted";

      top.location.hash = "#search/" + search;
      endLabelInput();
    }
  },
  'MOVEINBOX': {
    cat: 'GENERAL',
    desc: 'Move to inbox',
    func: function() { 
      if (!doButton(MOVE_TO_INBOX_ACTION)) {
        cmami(MOVE_TO_INBOX_ACTION); 
      }
    }
  },
  'NEWLABEL': {
    cat: 'LABELS',
    desc: 'Create and apply new label',
    func: function() { 
      cmami(NEW_LABEL_ACTION); 
    }
  },
  'TRASH': {
    cat: 'GENERAL',
    desc: 'Trash',
    func: function() {
      if (!doButton(TRASH_ACTION)) {
        cmami(TRASH_ACTION);
      }
    }
  },
  'UNREAD': {
    cat: 'GENERAL',
    desc: 'Mark as unread',
    func: function() {
      window.setTimeout(function() {
          // shift+r was opening a reply window from conversation view
          cmami(MARK_AS_UNREAD_ACTION);
          }, 0);
      }
  },
  'READ': {
    cat: 'THREADLIST',
    desc: 'Mark as read',
    view: 'tl',
    func: function() { cmami(MARK_AS_READ_ACTION); }
  },
  'READTRASH': {
    cat: 'THREADLIST',
    desc: 'Mark as read, then trash',
    view: 'tl',
    func: function() {
      ACTIONS['READ'].func();
      // Wait for the mark as read action to complete
      window.setTimeout(function() {
          // Just re-use the trash action
          ACTIONS['TRASH'].func();
          }, timeout_value);
    }
  },
  'SELECT': {
    cat: 'SELECT',
    label: "Selector",
    desc: 'SELECT all, none, starred, unstarred, read & unread',
    view: 'tl',
//    func: function(){ selectAction = true; }
    func: function(){ debug("Select Action!!"); }
  },
  'KEYS': {
    cat: 'TEST',
    desc: 'Log the macro test keys',
    func: function() {
      resetVersion();
      debugVar = (debugVar) ? false : true;
      endLabelInput();
    }
  },
  'HELP': {
    cat: 'GENERAL',
    desc: 'Generate this help',
    func: function() {
      helpAction = true;
      banner.show(true);
      banner.setFooter("Help screen");
      html = generateHtmlHelp();
      banner.update(html);
      getDoc().addEventListener("keyup", helpKeyHandler, false);
      getDoc().addEventListener("click", helpMouseHandler, false);
    }
  },
  'CATCHUP': {
    cat: 'THREADLIST',
    view: 'tl',
    desc: 'Mark as read all unread',
    func: function() {
       var selector = getFirstVisibleNode(evalXPath(".//span[@selector='unread']", getDoc().body));
       if (selector) {
//          simulateClick(selector, "mousedown");
          simulateClick(selector, "click");
          window.setTimeout( function() {
                // Wait for the mark as read action to complete?
                ACTIONS['READ'].func();
                window.setTimeout(function() {
                  var selector = getFirstVisibleNode(evalXPath(".//span[@selector='none']", getDoc().body));
                  if (selector) {
//                    simulateClick(selector, "mousedown");
                    simulateClick(selector, "click");
                  }
                  }, timeout_value);
                }, 0);
       }
    }
  },
  'EXPANDCOLLAPSE': {
    cat: 'GENERAL',
    view: 'cv',
    desc: 'Toggle expand/collapse all threads in conversation (only in conversation view)',
    func: function() {
      var selector = getFirstVisibleNode(
          getNodesByTagNameAndClass( 
            getDoc().body, "img", EXPAND_MSG_IMG_CLASS));
      if (!selector){
        debug("Unsuccessful first attempt trying for collapsed");
        selector = getFirstVisibleNode(
            getNodesByTagNameAndClass( 
              getDoc().body, "img", COLLAPSE_MSG_IMG_CLASS));
      }
      if (selector) {
        simulateClick(selector, "click");
      }
      else {
        debug("Unsuccessful second attempt...");
      }
    }
  },
  'ADDQUICKLINK': {
    cat: 'LABELS',
    desc: 'Add the current search to the quick list searches (if enabled)',
    func: function() {
      var elem = getFirstVisibleNode(getNodesByTagNameAndClass( getDoc().body, "div", ADD_QL_CLASS));
      if (elem) {
        window.setTimeout(function() {
            // Just re-use the trash action
            simulateClick(elem,"click");
            }, timeout_value);
      } 
    }
  },
  'UPDATECON': {
    cat: 'CONVERSATION',
    view: 'cv',
    desc: 'Update the current conversation (Gmail\'s &lt;shift+n&gt;)',
    func: function() {
      var elem = getFirstVisibleNode(getNodesByTagNameAndClass( document.body, "span", UPDATE_MESSAGE_CLASS));
      if (elem) {
        window.setTimeout(function() {
            // Just re-use the trash action
            simulateClick(elem,"click");
            }, timeout_value);
      } 
    }
  },
};

var LOC_TO_SEARCH = {
  "inbox": "in:inbox",
  "starred": "is:starred",
  "chats": "is:chat",
  "sent": "from:me",
  "drafts": "is:draft",
  "all": "",
  "spam": "in:spam",
  "trash": "in:trash"
};

var LABEL_PREFIX = "label/";

function getSearchForLocation(loc) {
  if (loc in LOC_TO_SEARCH) {
    return LOC_TO_SEARCH[loc];
  }
  
  if (loc.indexOf(LABEL_PREFIX) == 0) {
    var labelName = loc.substring(LABEL_PREFIX.length);
    
    // Normalize spaces to dashes, since that's what Gmail wants for searches
    labelName = labelName.replace(/\+/g, "-");

    return "label:" + labelName;
  }
  
  return null;
}

// TODO(mihaip): too many global variables, use objects
var banner = null;
var gmail = null;

var labelInput = null;
var activeLabelAction = null;
var lastPrefix = null;
var selLabelIndex = null;

function getDoc() {
  return gmail.getNavPaneElement().ownerDocument;
}

function newNode(tagName) {
  return getDoc().createElement(tagName);
}

function getNode(id) {
  return getDoc().getElementById(id);
}

function getFirstVisibleNode(nodes) {
  for (var i = 0, node; node = nodes[i]; i++) {
    if (node.offsetHeight) return node;
  }
  return null;
}

function simulateClick(node, eventType) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent(eventType,
                       true, // can bubble
                       true, // cancellable
                       node.ownerDocument.defaultView,
                       1, // clicks
                       50, 50, // screen coordinates
                       50, 50, // client coordinates
                       false, false, false, false, // control/alt/shift/meta
                       0, // button,
                       node);

  node.dispatchEvent(event);
}

function clickMoreActionsMenuItem(menuItemText, menuItemAction) {
  var moreActionsMenu = getFirstVisibleNode(getNodesByTagNameAndClass(
      getDoc().body, "div", MORE_ACTIONS_MENU_HEADER_CLASS));
  
  if (!moreActionsMenu) {
    alert("Couldn't find the menu header node");
    return;  
  }
  
  simulateClick(moreActionsMenu, "mousedown");
  
  var menuBodyNodes = getNodesByTagNameAndClass(
      getDoc().body, "div", MORE_ACTIONS_MENU_BODY_CLASS);
  var menuBodyNode = getFirstVisibleNode(menuBodyNodes);
  
  if (!menuBodyNode) {
    alert("Couldn't find the menu body node");
    return;
  }
  
  var menuItemNodes = getNodesByTagNameAndClass(
      menuBodyNode, "div", MORE_ACTIONS_MENU_ITEM_CLASS);
  
  for (var i = 0; menuItemNode = menuItemNodes[i]; i++) {
    if (menuItemNode.textContent == menuItemText &&
        menuItemNode.getAttribute("act") == menuItemAction) {
      simulateClick(menuItemNode, "mouseup");
      return; 
    }
  }
  
//  alert("Couldn't find the menu item node '" + menuItemText + "'");
  simulateClick(getDoc().body,"mousedown");
}

function init(g) {
  gmail = g;  
  banner = new Banner();

  window.setTimeout( function(){
      retrieveData('macros',MACRO_MAPPING);
      retrieveData('selectors',SELECTORS);
      IGNORENEXTKEY = GM_getValue('ignorenextkey',IGNORENEXTKEY);
      debug("init: "+stringifyKeyMap(MACRO_MAPPING)
        +"\nignore: "+IGNORENEXTKEY);
  }, 0);

  getDoc().defaultView.addEventListener('keydown', keyHandler, false);

  window.setTimeout(checkVersion,100);
}

function keyHandler(event) {
  if (labelInput) return false;
  if ( !keepEvent(event) ) return false;
  
  var k = getTranslatedEventCode(event);

  if ( IGNORENEXTKEY.indexOf(k) > 0 ) {
     debug("keyHandler - Should ignore next key");
     ignoreNext = true;
  }

  currentMacro = getMacro(k);

  if (!currentMacro || currentMacro == 0) {
    return false;
  }
  else if (currentMacro in ACTIONS){
    beginAction();
    debug("kH - Macro: "+currentMacro);
  }
  
  if (currentMacro in ACTIONS) {
    if (ACTIONS[currentMacro].label) {
      endAction();
      if (activeLabelAction) {
        endLabelAction();
      } else {
        activeLabelAction = ACTIONS[currentMacro];
        beginLabelAction();
      }
      return true;
    }
  
    if (ACTIONS[currentMacro].view &&
        ACTIONS[currentMacro].view != gmail.getActiveViewType()) {
      endAction();
      return false;
    }
    Action = ACTIONS[currentMacro].func;
    window.setTimeout(Action,0);
    return true;
  }
  
  endAction();
  return false;
}

function beginAction() {
  labelInput = makeLabelInput();
  labelInput.addEventListener("keyup", bogus, false);
  labelInput.addEventListener("blur", endAction, false);
}

function endAction() {
  if(helpAction) return;
  helpAction = false;
  banner.hide();

  if (labelInput) {
    labelInput.parentNode.removeChild(labelInput);
    labelInput = null;
  }
  
  Action = null;
}

function beginLabelAction() {
  if (currentMacro == 'SELECT') selectAction = true;

  // TODO(mihaip): make sure the labels nav pane is open
  
  banner.show();
  banner.setFooter(activeLabelAction.label);

  lastPrefix = null;
  selLabelIndex = 0;
  dispatchedActionTimeout = null;

  labelInput = makeLabelInput();
  labelInput.addEventListener("keyup", updateLabelAction, false);
  // we want escape, clicks, etc. to cancel, which seems to be equivalent to the
  // field losing focus
  labelInput.addEventListener("blur", endLabelAction, false);
}

function makeLabelInput() {
  labelInput = newNode("input");
  labelInput.type = "text";
  labelInput.id = "gmmacrolabel";
  labelInput.setAttribute("autocomplete", "off");
  with (labelInput.style) {
    position = "fixed"; // We need to use fixed positioning since we have to ensure
                        // that the input is not scrolled out of view (since
                        // Gecko will scroll for us if it is).
    top = "0";
    left = "-300px";
    width = "200px";
    height = "20px";
    zIndex = "1000";
  }

  getDoc().body.appendChild(labelInput);
  labelInput.focus();
  labelInput.value = "";
  
  return labelInput;
}

function endLabelAction() {
  if (dispatchedActionTimeout) return;
  
  // TODO(mihaip): re-close label box if necessary
  
  banner.hide();

  if (labelInput) {
    labelInput.parentNode.removeChild(labelInput);
    labelInput = null;
  }
  
  activeLabelAction = null;
}

function updateLabelAction(event) {
  if (dispatchedActionTimeout) return;
  
  var tempLabels = getLabels();

  var realLabels = tempLabels[0];
  var labels = tempLabels[1];

  var selectedLabels = [];
  var selectedRealLabels = [];
  
  // We need to skip the label shortcut that got us here
  var labelPrefix = labelInput.value.substring(1).toLowerCase();

  if ( selectAction && labelPrefix.length > 0) {
    debug("In selectAction code");
    debug("updatelabelaction: "+labelPrefix);
    selectAction = false;
    endLabelAction();
    if ( labelPrefix in SELECTORS ) {
      window.setTimeout(function(){
        debug("updatelabelaction - selectAction: "+SELECTORS[labelPrefix]);
        //click Selector
        var selector = getFirstVisibleNode(evalXPath(".//span[@selector='" 
                                                   + SELECTORS[labelPrefix] 
                                                   + "']", getDoc().body));
        if (selector) {
           debug("selector found...");
//           simulateClick(selector, "mousedown");
           simulateClick(selector, "click");
        } 
        else {
           debug("No selector found...");
        }
      },100);
    }
    return;
  }

  // We always want to reset the cursor position to the end of the text
  // field, since some of the keys that we support (arrows) would
  // otherwise change it
  labelInput.selectionStart = labelInput.selectionEnd = labelPrefix.length + 1;

  if (labelPrefix.length == 0) {
    banner.update("");
    return;
  }

  for (var i = 0; i < labels.length; i++) {
    label = labels[i];
    
    if (label.toLowerCase().indexOf(labelPrefix) == 0) {
      selectedLabels.push(label);
      selectedRealLabels.push(realLabels[i]);
    } 
  }
  
  if (labelPrefix != lastPrefix) {
    lastPrefix = labelPrefix;
    selLabelIndex = 0;
  }
  
  if (selectedLabels.length == 0) {
    banner.update(labelPrefix);
    return;
  }
  
  if (event.keyCode == 13 || selectedLabels.length == 1) {
    // if it's a quick link use the title instead of the label...
    var selectedLabelName = ( isQuickLink(selectedRealLabels[selLabelIndex]) ) ?
      selectedLabels[selLabelIndex]:
      selectedRealLabels[selLabelIndex];
  
    // Tell the user what we picked
    banner.update(selectedLabelName);

    // Invoke the action straight away, but keep the banner up so the user can
    // see what was picked, and so that extra typing is caught.
    dispatchedActionTimeout = window.setTimeout(function() {
      activeLabelAction.func(selectedRealLabels[selLabelIndex]);
      dispatchedActionTimeout = null;
      endLabelAction()
    }, timeout_value);
    return;
  } else if (event.keyCode == 40) { // down
    selLabelIndex = (selLabelIndex + 1) % selectedLabels.length;
  } else if (event.keyCode == 38) { // up
    selLabelIndex = (selLabelIndex + selectedLabels.length - 1) %
        selectedLabels.length;
  }

  var realLabelName = selectedRealLabels[selLabelIndex];
  var selectedLabelName = selectedLabels[selLabelIndex];
  var html;
  
  var highlightedSelectedLabelName = selectedLabelName.replace(
      new RegExp("(" + labelPrefix + ")", "i"), "<u>$1</u>");
  var labelPosition = " <small>(" + 
      (selLabelIndex + 1) + "/" + selectedLabels.length + ")</small>";
  html = highlightedSelectedLabelName + labelPosition;
  html = (realLabelName != selectedLabelName ) ?
     "<div><small>"+realLabelName+"</small></div>" + html :
     html;

  debug(html);
  banner.update(html);
}

function getLabels() {  
  var navPaneNode = gmail.getNavPaneElement();
  
  var labelNodes = getNodesByTagNameAndClass(
      navPaneNode, "a", LABEL_ITEM_CLASS_NAME);

  var labels = [];
  var fakeLabels = [];

  for (var i = 0, labelNode; labelNode = labelNodes[i]; i++) {
    var realLabelName = labelNode.title.replace(UNREAD_COUNT_RE, "");
    var fakeLabelName;
    if (realLabelName in SPECIAL_LABELS) 
      fakeLabelName = realLabelName;
    else {
      fakeLabelName = realLabelName.substring(realLabelName.lastIndexOf("/")+1);
      fakeLabelName = fakeLabelName.substring(fakeLabelName.lastIndexOf("\\")+1);
    }
//    debug("getLabels\nREAL: "+realLabelName+"\nFAKE: "+fakeLabelName);
    labels.push(realLabelName);
    fakeLabels.push(fakeLabelName);
  }
  // Contacts special case
  labels.push("Contacts");
  fakeLabels.push("Contacts");

  // Quick links
  if ( currentMacro == 'GOTO' ){

    var quickLinksNode = getNodesByTagNameAndClass(navPaneNode, "div", QUICK_LINKS_DIV_CLASS);
    var quickLinks = getNodesByTagNameAndClass(quickLinksNode[0], 'a','');
    if(quickLinks){
       for (var j=0; j<quickLinks.length; ++j){
          // Already URI encoded
          var realLabelName = quickLinks[j].title;
          var fakeLabelName = quickLinks[j].innerHTML;
//          debug("getLabels\nREAL: "+realLabelName+"\nFAKE: "+fakeLabelName);

          labels.push(realLabelName);
          fakeLabels.push(fakeLabelName);
       }
    }
  }
  
  return [labels,fakeLabels];
}

function evalXPath(expression, rootNode) {
  try {
    var xpathIterator = rootNode.ownerDocument.evaluate(
      expression,
      rootNode,
      null, // no namespace resolver
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null); // no existing results
  } catch (err) {
    debug("Error when evaluating XPath expression '" + expression + "'" +
           ": " + err);
    return null;
  }
  var results = [];

  // Convert result to JS array
  for (var xpathNode = xpathIterator.iterateNext(); 
       xpathNode; 
       xpathNode = xpathIterator.iterateNext()) {
    results.push(xpathNode);
  }
    
  return results;
}

function getNodesByTagNameAndClass(rootNode, tagName, className) {
  var expression = 
      ".//" + tagName + 
      "[contains(concat(' ', @class, ' '), ' " + className + " ')]";
  
  return evalXPath(expression, rootNode);
}

function Banner() {
  function getNodeSet() {
    var boxNode = newNode("div");
    boxNode.className = "banner";
    with (boxNode.style) {
      display = "none";
      position = "fixed";
      left = "10%";
      margin = "0 10% 0 10%";
      width = "60%";
      textAlign = "center";
      MozBorderRadius = "10px";
      webkitBorderRadius = "10px";
      padding = "10px";
      color = "#fff";
    }
    
    var messageNode = newNode("div");
    with (messageNode.style) {
      fontSize = "24px";
      fontWeight = "bold";
      fontFamily = "Lucida Grande, Trebuchet MS, sans-serif";
      margin = "0 0 10px 0";
    }
    boxNode.appendChild(messageNode);
  
    var taglineNode = newNode("div");
    with (taglineNode.style) {
      fontSize = "13px";
      margin = "0";
      position = "absolute";
      right = "0.2em";
      bottom = "0";
      MozOpacity = "0.5";
      webkitOpacity = "0.5";
    }
    taglineNode.innerHTML = 'ModifiedMacros:<span style="color:#f44;font-weight:bold;letter-spacing: -.25pt;">'+scriptVersion+'</span>';
    boxNode.appendChild(taglineNode);
    
    var footerNode = newNode("div");
    with (footerNode.style) {
      fontSize = "13px";
    }
    boxNode.appendChild(footerNode);
    
    return boxNode;
  }

  this.backgroundNode = getNodeSet();
  this.backgroundNode.style.background = "#000";
  this.backgroundNode.style.MozOpacity = "0.70";
  this.backgroundNode.style.webkitOpacity = "0.70";
  this.backgroundNode.style.zIndex = 100;
  for (var child = this.backgroundNode.firstChild; 
       child; 
       child = child.nextSibling) {
    child.style.visibility = "hidden";
  }
  
  this.foregroundNode = getNodeSet();
  this.foregroundNode.style.zIndex = 101;
}

Banner.prototype.hide = function() {
  this.backgroundNode.style.display = 
    this.foregroundNode.style.display = "none";
}

Banner.prototype.show = function(opt_isBottomAnchored) {
  this.update("");
  getDoc().body.appendChild(this.backgroundNode);
  getDoc().body.appendChild(this.foregroundNode);

  this.backgroundNode.style.top = this.foregroundNode.style.top = 
    opt_isBottomAnchored ? "10%" : "50%";

  this.backgroundNode.style.display = 
    this.foregroundNode.style.display = "block";
}

Banner.prototype.update = function(message) {
  if (message.length) {
    this.backgroundNode.firstChild.style.display = 
      this.foregroundNode.firstChild.style.display = "inline";
  } else {
    this.backgroundNode.firstChild.style.display = 
      this.foregroundNode.firstChild.style.display = "none";
  }
  this.backgroundNode.firstChild.innerHTML = 
    this.foregroundNode.firstChild.innerHTML = message;
}

Banner.prototype.setFooter = function(text) {
  this.backgroundNode.lastChild.innerHTML = 
    this.foregroundNode.lastChild.innerHTML = text;  
}

function resetVersion(){
   debug("Reset all version information...");
   GM_setValue('lastCheck',0);
   GM_setValue('lastVersion',0);
}


function checkVersion() {
   // ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
   // This auto update-notification script was made by Seifer
   // You can find it at http://userscripts.org/scripts/show/12193
   // ========================================================
   var lastCheck = GM_getValue('lastCheck', 0);
   var lastVersion = GM_getValue('lastVersion', 0);
   var d = new Date();
   var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
   debug("lastCheck: "+lastCheck+
         "\nlastCheck+86400: "+(lastCheck+86400)+
         "\ncurrentTime: "+currentTime);

   if (currentTime > (lastCheck + 86400)) { //24 hours after last check
      GM_setValue('lastCheck',currentTime);
      var the_url = 'http://snipr.com/4kf4a';
      debug(the_url);
      GM_xmlhttpRequest({
         method: 'GET',
         url: the_url,
         headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
         onload: function(responseDetails) {
            var text = responseDetails.responseText;
            debug("\ntext: '"+text);
            // Get & fill VERSION_INFO var.
            eval(text);
            if (!VERSION_INFO){
               debug("versioninfo problems...");
               return;
            }
            if(VERSION_INFO['latestVersion'] > scriptVersion && VERSION_INFO['latestVersion'] > lastVersion) {
              if(confirm("ModifiedMacro Update available: " +
                    VERSION_INFO['latestVersion'] +"\n" + 
                    VERSION_INFO['updateText'] +
                    "\n\nWould you like to download it now?")) {
                GM_openInTab(VERSION_INFO['url']);
              }
              else {
                if (!confirm("Would you like to be reminded in 24 hours?"+
                    "  (If you cancel, you will not be reminded until a newer version is available)")) {
                  GM_setValue("lastVersion",VERSION_INFO['latestVersion']);
                }
              } 
            }
         }
      });
   }
}
