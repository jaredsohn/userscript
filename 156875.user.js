// ==UserScript==
// @name           Baidu search on site
// @namespace      http://userscripts.org/users/490204
// @description    在每个页面使用百度站内搜索
// @include        *
// ==/UserScript==


//*NOTE* Use hotkey ctrl+shift+0 to invoke the search form. Hide it by pressing escape within the form. Press Enter in input field or click on 'Baidu' button or 'on' text to do search (hold Shift key if you wish to open search in a new tab).
//	A currently selected text will be inserted into search field if you invoke the form first time.
//	TIP: (for Firefox users) Did you know that you can do multiregion selection by holding Ctrl key and doubleclicking on words in text?
//	Known BUGS: If you cancel (hide) the search form in Firefox then current window will lose a keyboard focus and all keyboard bindings will not work at all (including firefox interface). Just click somewhere on a page with mouse to restore keyboard behaviour.

(function(){  // Anonymous wrapper for Opera

// Configureble variables
var MaxSelectionLength = 100;  // Max length of selected text which will be catched first time

// Global variables
var framebox;
var selection;
var currentPathPart;
var inputfield;

// Injection of iframe into current document
function injectBox() {
  var framecss = 'position:fixed; z-index:99999; display:none; bottom:0px; left:0px; width:100%; margin:0px; padding:0px; overflow:hidden;'
    + 'background-color: white; border:none; height:29px; min-width:300px; '; //border-width:2px 0px; 

  // Trying to get selection on early stage because
  // after manipulations with DOM selection will not be available
  selection = window.getSelection().toString();
  if (selection.length > MaxSelectionLength)
    selection = selection.substr(0, MaxSelectionLength);
    

  // Creating iframe
  framebox = document.createElement('iframe');
  framebox.src = 'about:blank';
  framebox.setAttribute('style', framecss);
  framebox.addEventListener('load', function() {fillBox(framebox); showBox()}, false);
  document.body.appendChild(framebox);
}

// Filling content of iframe
function fillBox(framebox) {
  //var parentdoc = window.document;
  var document = framebox.contentDocument;

  // Style node in iframe <head>
  var style = document.createElement('style');
  style.innerHTML =    //#e5ecf9 #F0F7F9
    'BODY {background-color:#F0F7F9; border:1px solid #6B90DA; font-size:16px; font-family:Arial, Sans-serif; padding: 3px; margin: 0px;} \
     #bodyBox {display:table; width:100%; padding: 0px; margin: 0px;} \
     #searchButton {padding:0px; color:#4272DB} /* #1111CC */ \
     #searchBtnBox {display:table-cell; width:1px; padding-right:4px} \
     #searchField  {display:table-cell; width:100%; min-width:100px;} \
     #pathBox      {display:table-cell; width:1px; white-space: nowrap;} \
     #conjunction  {display:table-cell; width:1px; padding:0px 0.5em; color:#333; cursor:default;} \
     span {color:#0E3B77; padding-left:0px; cursor:pointer;} \
     span b {color: #650;} \
     .selected span b {color: gold;} \
     .selected span {color: #89a; padding-left:4px; font-size:12px; line-height:inherit;} \
     .selected > span {padding-left:10px} \
     .host {font-weight: bold; color:#0E3B77} \
     /*span:hover > span {padding-left:12px;} */\
     span:hover, span:hover .host {color: #0E774A; padding-left:0px;} /*008000*/ \
     span:hover b {color: #d33;} \
    ';
  document.getElementsByTagName('head')[0].appendChild(style);


  // Body
  //var bodybox = framebox.contentDocument.body;
  var bodybox = document.createElement('div');
  bodybox.id = 'bodyBox';
  document.body.appendChild(bodybox);

  appendHTML(bodybox, '<div id="searchBtnBox"><input id="searchButton" type="button" value="Baidu" /></div>');
  appendHTML(bodybox, '<input id="searchField" type="text" name="q" value="'+selection+'" />');
  appendHTML(bodybox, '<div id="conjunction">on</div>');

  //-- Create links from path parts
  var pathparts = window.location.pathname.split('/');
  pathparts[0] = '<strong class="host">'+window.location.host+'</strong>';
  // Remove last path part if it seems like page (contain dot) or empty
  if ((pathparts.length > 1) && pathparts[pathparts.length - 1].match(/^$|\./)) {
    pathparts.pop();  // usually last part is a filename
  }

  // Calculate limits for shorten path parts
  var maxlen = 22 - pathparts.length*2;
  var reducedlen = 18 - pathparts.length*2;
  if (maxlen < 6)
    maxlen = 6;
  if (reducedlen < 4)
    reducedlen = 4;

  var parentblock = document.createElement('span');
  parentblock.id = 'pathBox';
  bodybox.appendChild(parentblock);

  for (var i=0; i < pathparts.length; i++) {
    var pathpart = decodeURIComponent(pathparts[i]);
    var subblock = document.createElement('span');
    if (i==0) {  // first path block (hostname)
      subblock.className = 'selected';
      currentPathPart = subblock;
    }

    subblock.title = i ? pathpart : null;
    if (i != 0 && pathpart.length > maxlen) {
      var re = new RegExp ('^(.{'+ (reducedlen/2) +'}).*?(.{'+ (reducedlen/2) +'})$');
      pathpart = pathpart.replace(re, '$1...$2'); // Shorten path parts
    }

    subblock.innerHTML = (i ? '<b>/</b>':'') + pathpart;
    subblock.setAttribute('PIdx', i);  // our index mark
    //subblock.id = 'PIdx-'+ i;
    subblock.addEventListener('click', pathClickHandler, false);

    parentblock.appendChild(subblock);
    parentblock = subblock;
  }
  //--END Create links from path parts
  

  // Add event listeners to elements
  inputfield = document.getElementById('searchField');
  document.getElementById('searchButton').addEventListener('click', go, false);
  document.getElementById('conjunction').addEventListener('click', go, false);
  inputfield.addEventListener('keypress', function(event) {
      if (event.keyCode == 13) go(event);   // 13 == Enter
    }, false);
  document.addEventListener('keypress', function(event) {
      if (event.keyCode == 27) hideBox();   // 27 == Esc
    }, false);
  document.addEventListener('keydown', invokeWatcher, false); // invokeWatcher on iframe (works in Opera)

  framebox.style.display = 'block';
  framebox.style.height = document.body.offsetHeight + "px"; // correct height of iframe
}

// Select (user clicks on) path part
function pathClickHandler (event) {
  // event.currentTarget - currently registered target for the event.
  // event.target - target to which the event was originally dispatched.
  //console.log(event.currentTarget.tagName, event.target.tagName, event.currentTarget.getAttribute('PIdx'), event.currentTarget.id, event.currentTarget.className, event.currentTarget.innerHTML);
  currentPathPart.className = '';
  currentPathPart = event.currentTarget;
  currentPathPart.className = 'selected';
  event.stopPropagation();
}

// Main invocation callback
// charCodes for numbers 0,1..8,9 are 48,49..56,57
// keydown will return keyCode independent of language and caps lock (as opposite to keypress)
function invokeWatcher(ev) {
  //console.log('keypress %s, %s, | %s %s', ev.charCode, ev.keyCode, ev.ctrlKey?'ctrl':'.', ev.altKey?'alt':'.', ev.shiftKey?'shift':'.');
  // --- Defenition of hot key ---
  if (ev.keyCode == 48 && ev.ctrlKey && ! ev.altKey && ev.shiftKey) {
    ev.preventDefault();
    showBox();
  }
}

// Do search
function go(event) {
  var request = inputfield.value.replace(/^\s+|\s+$/g, '');
  if (request == '') return;

  // Get search path according to selected deepness
  var pidx = currentPathPart.getAttribute('PIdx');
  var re = new RegExp ('^((?:\\/[^\\/]+){'+pidx+'})');
  var path = window.location.pathname.match(re)[1];

  request = encodeURIComponent('site:'+window.location.host + decodeURIComponent(path) +'  '+ request);
  //alert('Go ' + request);
  request = 'http://www.baidu.com/s?wd='+ request;
  if (event.shiftKey)
    openInTab(request);
  else
    top.location = request;
  event.preventDefault();
}

function showBox() {
  if (!framebox) {
    injectBox();
    return;
  }

  framebox.style.display = 'block';
  inputfield.focus();
}

function hideBox() {
  //window.focus();
  window.document.body.focus();  // This does not work :)
  if (framebox)
    framebox.style.display = 'none';
}

// Use this function to gracefully append HTML to element
// inerHTML+= will break/remove event listeners on previous elements
function appendHTML (element, html) {
  var newcontent = element.ownerDocument.createElement('div');
  newcontent.innerHTML = html;
  while (newcontent.firstChild) {
    element.appendChild(newcontent.firstChild);
  }
  /*if (element.parentNode)
    element.parentNode.removeChild(element);  // cleanup */
}

// Emulate Greasemonkey's openInTab for Opera
var openInTab = typeof GM_openInTab == 'function' ? GM_openInTab : function(url) {
    top.open(url);
    //top.location = url;
  }

document.addEventListener('keydown', invokeWatcher, false);

})();
