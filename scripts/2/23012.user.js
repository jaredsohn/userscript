// ==UserScript==
// @name          Page_Bookmarker
// @namespace     http://gmscripts.bigsleep.net
// @description   Adds hash "bookmarks" with the middle-click
// @homepage      http://userscripts.org/scripts/show/23012
// @version       1.3
// @date          2008-03-17
// @timestamp     1205818710015
// @include       http://*
// ==/UserScript==

/* ** Configurable preferences **
   Key prefs
    button: left mouse = 0, middle = 1, right mouse = 2
    key: key or unicode number values for any key
    Modifier keys = true or false
   replaceHistory: true or false
    - true will replace "#Page_Bookmark_1" with "#Page_Bookmark_2"
    - false will add every "#Page_Bookmark_#" to your history,
      so that you can use the Back/Forward buttons
   styles: list of CSS styles to be added to a style sheet
   ! Be careful to not remove the commas !
*/
var PB_Prefs = {
  mouse: {
      button: 1,
      shiftKey: true,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
    },
  next: {
      key: "N",
      altKey: false,
      ctrlKey: false,
      metaKey: false,
    },
  prev: {
      key: "P",
      altKey: false,
      ctrlKey: false,
      metaKey: false,
    },
  replaceHistory: true,
  // Mark and Target Styles - bullet (escaped) unicode = '\u2022'
  styles: [
      "/* Page_Bookmarker Mark styles */",
      ".Page_Bookmarker_Mark:before { content: '\u2022';",
      "  color: blue; background-color: ivory; }",
      "/* Colorize the target */",
      "*:target { background-color: ivory; }",
    ] // end of styles
}; // end of prefs

/* Venture beyond at your own risk */
// current marker position
var PB_Marker = -1;
// list of markers
var PB_Markers = [];
// for creating unique ids
var PB_Count = 0;

PB_setMarker = {
  handleEvent: function(evt){
      /*GM_log(evt.type + " - button: " + evt.button + ", shiftKey: " +
            evt.shiftKey + ", nodeName: " + evt.target.nodeName);*/
      // ignore links, area
      if(document.evaluate("ancestor-or-self::*[@href]", evt.target,
          null, 3, null).booleanValue) return;
      // ignore form inputs
      if(/^(textarea|input|button)$/i .test(evt.target.nodeName)) return;
      // check which mouse button
      if(evt.button != PB_Prefs.mouse.button) return;
      // check modifier keys
      for(var meta in PB_Prefs.mouse){
        if(meta == 'button') continue;
        if(PB_Prefs.mouse[meta] != evt[meta]) return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      // check if evt.target has been bookmarked
      if(evt.target.hasAttribute('id')){
        var pbid = evt.target.id;
        // JavaScript 1.6 accessor method
        var pbindex = PB_Markers.indexOf(pbid);
        if(pbindex != -1){
          this.remove(evt.target, pbindex);
          return;
        }
      }
      this.add(evt.target);
      this.addStyle();
    },
  add: function(elm){
      PB_Count++;
      PB_Marker = PB_Markers.length;
      if(!elm.hasAttribute('id')){
        // set bookmarker id name
        var pbid = "Page_Bookmark_" + PB_Count;
        elm.id = pbid;
      }
      PB_Markers.push(elm.id);
      elm.className = (elm.hasAttribute('class'))
          ? elm.className + " Page_Bookmarker_Mark": "Page_Bookmarker_Mark";
    },
  remove: function(elm, Index){
      var pbid = elm.id;
      if(pbid.indexOf("Page_Bookmark_") != -1){
        elm.removeAttribute('id');
      }
      if(elm.className == "Page_Bookmarker_Mark"){
        elm.removeAttribute('class');
      }else{
        elm.className = elm.className.replace(" Page_Bookmarker_Mark", "");
      }
      // If its the last mark, subtract count
      if(Index == PB_Markers.length-1) PB_Count--;
      PB_Markers.splice(Index, 1);
      if(Index <= PB_Marker) PB_Marker--;
    },
  addStyle: function(){
      // So it does not add styles twice
      if(document.getElementById('page_bookmarker_styles')) return;
      // Make it readable with line breaks
      US_addStyleTag("\n" + PB_Prefs.styles.join("\n") + "\n")
          .id = "page_bookmarker_styles";
    }
}

PB_getMarker = {
  handleEvent: function(kyd){
      //GM_log("trapped key: " + kyd.charCode + ", shiftKey: " + kyd.shiftKey);
      // wrong key
      if(kyd.charCode == 0) return true;
      // ignore form inputs
      if(/^(textarea|input|button)$/i .test(kyd.target.nodeName)) return true;
      // Unicode value of any key
      switch(kyd.which){
        case PB_Prefs.next.key:
          if(this.checkMeta(PB_Prefs.next, kyd)) this.next();
          break;
        case PB_Prefs.prev.key:
          if(this.checkMeta(PB_Prefs.prev, kyd)) this.prev();
      }
    },
  checkMeta: function(pref, key){
      for(var meta in pref){
        if(meta == 'key') continue;
        if(pref[meta] != key[meta]) return false;
      }
      return true;
    },
  next: function(){
      if(PB_Markers.length == 0) return;
      PB_Marker++;
      if(PB_Marker == PB_Markers.length) PB_Marker = 0;
      this.goTo(PB_Markers[PB_Marker]);
    },
  prev: function(){
      if(PB_Markers.length == 0) return;
      if(PB_Marker == -1) PB_Marker = PB_Markers.length-1;
      this.goTo(PB_Markers[PB_Marker]);
      PB_Marker--;
    },
  goTo: function(Hash){
      if(PB_Prefs.replaceHistory){ location.replace("#" + Hash) }
      else{ location.hash = Hash }
    }
}

document.body.addEventListener("mousedown", PB_setMarker, true);

// Convert key options to char code, if not already
PB_Prefs.next.key = PB_charToCode(PB_Prefs.next.key);
PB_Prefs.prev.key = PB_charToCode(PB_Prefs.prev.key);
function PB_charToCode(Key){
  if(typeof Key == 'string'){
    // allow Unicode values
    if(/^\d\d+$/.test(Key)) return parseInt(Key, 10);
    return Key.charCodeAt(0);
  }
  return Key; // assume its already a number
}

document.addEventListener("keypress", PB_getMarker, true);

// Add a style tag, add css and return element
function US_addStyleTag(css){
  var Style = document.createElement('style');
  Style.type = 'text/css';
  if(document.contentType == "application/xhtml+xml"){
    Style.appendChild( document.createCDATASection(css) );
  }else{
    Style.appendChild( document.createTextNode(css) );
  }
  // Return element so properties can be added
  // Note: Mozilla creates head if it doesnt exist (unless XML)
  return (document.getElementsByTagName('head').length)
      ? document.getElementsByTagName('head').item(0).appendChild(Style): null;
}
