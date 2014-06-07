// ==UserScript==
// @name           Netvibes paste and add
// @namespace      http://pile0nades.wordpress.com/
// @description    Paste a feed url to any non-focused area to add it to Netvibes
// @include        http://www.netvibes.com/
// ==/UserScript==



//focus detection hack
addGlobalStyle(''
  +'input:focus,'
  +'textarea:focus {'
  +'  empty-cells: hide;'
  +'}'
);


// when Ctrl+V is pressed, create box to absorb paste action and get the URL
function h4x0r_createCatchBox(event) {
  if(event.ctrlKey && event.keyCode == 86 && !document.getElementById("h4x0r-catchURLbox")) {
    // check if any textbox has focus
    var inputs = document.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++) {
      if(document.defaultView.getComputedStyle(inputs[i], "").getPropertyValue("empty-cells") == "hide") return;
    }
    var textareas = document.getElementsByTagName("textarea");
    for(var i = 0; i < textareas.length; i++) {
      if(document.defaultView.getComputedStyle(textareas[i], "").getPropertyValue("empty-cells") == "hide") return;
    }

    // create and deploy the catchbox
    var textbox = document.createElement("input");
    textbox.setAttribute("style", "position: absolute; left: -10000px; top: -10000px; visibility: hidden");
    textbox.setAttribute("id", "h4x0r-catchURLbox");
    document.body.appendChild(textbox);
    textbox.focus();
  }
}
window.addEventListener("keydown", h4x0r_createCatchBox, false);


// add new feed to Netvibes
function h4x0r_addNewFeed(event) {
  // remove the box we used to catch the URL
  var box = document.getElementById("h4x0r-catchURLbox");
  if(box) {
    var feed = box.value;
    remove(box);
  }
  else return;

  // hack to avoid using unsafeWindow
  window.location.href = 'javascript:'
  +'var feedURL = "' + feed + '";'
  +'var keepsidebaropen = false;'

  // open the sidebar if not already open
  +'if('
  +'  !document.getElementById("addmynewfeed") ||'
  +'  document.getElementById("moduleSelection").style.display == "none"'
  +') {'
  +'  App.Nav.openCloseSelection();'
  +'}'
  +'else keepsidebaropen = true;'

  // simulate click on the Add new feed link
  +'var evt = document.createEvent("MouseEvents");'
  +'evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);'
  +'var addfeedlink = document.getElementById("addmynewfeed").firstChild;'
  +'var c = addfeedlink.dispatchEvent(evt);'

  // add the feed
  +'var thebutton = document.getElementById("pickupZone").getElementsByTagName("input");'
  +'thebutton[0].value = feedURL;'
  +'thebutton[1].click();'

  // close the sidebar if it wasn't open before
  +'if(keepsidebaropen == false) App.Nav.openCloseSelection();'
}
window.addEventListener("keyup", h4x0r_addNewFeed, false);





// helper functions
function insertAfter(referenceNode, node) {
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

function remove(node) {
  node.parentNode.removeChild(node);
}

function get(query) {
  return document.evaluate(
    query,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
}

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}