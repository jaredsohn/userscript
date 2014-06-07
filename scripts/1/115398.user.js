// ==UserScript==
// @name Pinboard - Inline Save
// @namespace http://murklins.talkoncorners.net/
// @description Adds inline "save to mine" form, for enhanced copy to mine needs like adding tags or description.
// @include http://pinboard.in/*
// @include http://www.pinboard.in/*
// @include https://pinboard.in/*
// @include https://www.pinboard.in/*
// @require http://pinboard.in/js/pin-min.js?w=ar
// ==/UserScript==

// ***** CONFIGURATION *****

var addViaTag = true;
var defaultToRead = true;
var defaultPrivate = false;

// ***** CODE ******

// get the current account name from cookie
var user = "";
var cookie = document.cookie.split(";");
for (var i = 0; i < cookie.length; i++) {
  var cookieItem = cookie[i].replace(/^\s+|\s+$/g,"");
  var userRegex = new RegExp("^login=(.*?)$");
  var userArr = userRegex.exec(cookieItem);
  if (userArr) {
    user = userArr[1];
    break;
  }
}

if (user == "") {
  // not logged in, so exit
  GM_log("Not logged in. Exiting script.");
  return;
}

// are you viewing your own account?
var path = window.location.pathname;
var pathRegex = new RegExp("/u:(.*)");
var pathArr = pathRegex.exec(path);
if (pathArr) {
  var pieces = pathArr[1].split("/");
  if (pieces[0] == user) {
    if ((pieces.length == 1) || (pieces[1] != "subscriptions")) {
      // this is your account (but not the tag subs page), so don't need to do anything
      GM_log("In own account. Exiting script.");
      return;
    }
  }
}

// get all the bookmarks
var bookmarks = document.evaluate("//div[contains(@class, 'bookmark ') or (@class = 'bookmark')]", document, null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (bookmarks.snapshotLength == 0) {
  // no bookmarks on this page
  GM_log("No bookmarks on this page. Exiting script.");
  return;
}

// get the form token and user tags from the add page
var href = window.location.href;
var http = href.split(":")[0];
var postUrl = http + "://pinboard.in/add/";
GM_xmlhttpRequest({
  method: "POST",
  url: postUrl,
  onload: function(req) { 
    // parse out the token value
    var tokenRegex = new RegExp("<input type=\"hidden\" name=\"form_token\" value=\"(.*?)\"");
    var tokenArr = tokenRegex.exec(req.responseText);
    if (tokenArr) {
      // create the save form
      var form = createSaveForm(tokenArr[1]);
      
      // continue with script
      getUserTags(form);
    }
    else {
      GM_log("Could not get add form token. Exiting script.");
      return;
    }
  }
});

// need the usertags to build the autocomplete
function getUserTags(form) {
  var href = window.location.href;
  var http = href.split(":")[0];
  var url = http + "://pinboard.in/user_tag_list/";
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(req) {
      var usertags = null;
      var tagsRegex = new RegExp("^var usertags\\s*=(\[[\\s\\S]*\];)");
      var tagsArr = tagsRegex.exec(req.responseText);
      if (tagsArr) {
        usertags = eval(tagsArr[1]);
        // this call is supplied by the external pin-min.js file
        var ac = new Pin.Tags('gm_saveToMineTags', usertags, {circular: true});
      }
      
      // hide the form properly (can't be display:none during AC setup)
      form.style.visibility = "visible";
      form.style.display = "none";
        
      // add "save to mine" links to the bookmarks on the page
      addSaveLinks(bookmarks, usertags);
    }
  });
}

function addSaveLinks(bookmarks) {
  // is this a popular page?
  var displayDiv = "";
  var isPopPage = false;
  var path = window.location.pathname.split("/");
  if ((path.length > 1) && (path[1] == "popular")) {
    isPopPage = true
  }
  else {
    // popular pages don't have the display div
    displayDiv = "/div[contains(@class, 'display')]";
  }
    
  for (var i = 0; i < bookmarks.snapshotLength; i++) {      
    var b = bookmarks.snapshotItem(i);
    
    // get the copy to mine link
    var copy = document.evaluate("." + displayDiv + "/div[contains(@class, 'edit_links')]/a[contains(@onclick, 'grab_bmark')]", 
                                    b, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (copy.snapshotLength == 1) {
      copy = copy.snapshotItem(0);
      var editLinksDiv = copy.parentNode;
      
      // is this a bookmark that's saved in your account?
      var saved = document.evaluate("." + displayDiv + "/a[contains(@class, 'has_bmark')]", 
                                      b, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);                  
      if (saved.snapshotLength > 0) {
        // show the saved text
        var span = createSavedSpan();
        editLinksDiv.appendChild(span);
        
        // hide the copy to mine link
        copy.style.display = "none";
      }
      else {
        // not already saved, so need to add the "save to mine" link       
        var a = document.createElement("a");
        a.href = "";
        a.id = "gm_saveToMineLink_" + b.id;
        a.className = "gm_saveToMineLink";
        a.innerHTML = "save to mine";
        a.style.marginLeft = "10px";
        editLinksDiv.appendChild(a);
        
        // open the inline save form when "save to mine" is clicked
        a.addEventListener("click",
          function(event) {
            event.stopPropagation()
            event.preventDefault();
            
            // show all the save to mine links (they get hidden when this form is revealed,
            // and the form can jump around the page, hiding links as it jumps)
            showAllSaveToMineLinks();
            
            // make sure the form's save/cancel links are visible and the alert span is empty
            document.getElementById("gm_saveToMineDoSave").style.display = "inline";
            document.getElementById("gm_saveToMineDoCancel").style.display = "inline";
            document.getElementById("gm_saveToMineAlert").innerHTML = "";
            
            var id = this.id.split("_");
            id = id[id.length-1];
            var bookmark = document.getElementById(id);
            
            // find out who saved it to create the "via" tag
            var viaTag = "";
            var savedBy = "";
            if (addViaTag) {
              if (isPopPage) {
                savedBy = "popular";
              }
              else {
                var when = document.evaluate("./div[contains(@class, 'display')]/a[contains(@class, 'when')]", 
                                                bookmark, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
                if (when.snapshotLength > 0) {
                  // format is "/u:accountname/b:bookmarkid" so just take the username
                  var savedByRegex = new RegExp("/u:(.*?)/");
                  var savedByArr = savedByRegex.exec(when.snapshotItem(0).href);
                  if (savedByArr) {
                    savedBy = savedByArr[1];
                  }
                }
              }
              viaTag = savedBy != "" ? "via:" + savedBy + " " : "";
            }
              
            var bookmarkLink = document.evaluate("." + displayDiv + "/a[contains(@class, 'bookmark_title')]", 
                                                  bookmark, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);           
            if (bookmarkLink.snapshotLength > 0) {
              var url = bookmarkLink.snapshotItem(0).href;
              var title = bookmarkLink.snapshotItem(0).innerHTML.replace(/^\s+|\s+$/g,"");
             
              // hide the link we just clicked
              this.style.display = "none";
              
              // remove the save form from the DOM
              var form = document.getElementById("gm_saveToMineForm");
              var bmarkIdInput = document.getElementById("gm_saveToMineBookmarkId");
              var urlInput = document.getElementById("gm_saveToMineUrl");
              var titleInput = document.getElementById("gm_saveToMineTitle");
              var descInput = document.getElementById("gm_saveToMineDesc");
              var tagsInput = document.getElementById("gm_saveToMineTags");
              var privateInput = document.getElementById("gm_saveToMinePrivate");
              var toreadInput = document.getElementById("gm_saveToMineToRead");
              form.parentNode.removeChild(form);
              
              // append the form to the local node
              form.style.display = "block";
              this.parentNode.appendChild(form); 
              
              // focus the tags input
              tagsInput.focus();

              // populate the save form with this bookmark's values and the defaults
              bmarkIdInput.value = id;
              urlInput.value = url;
              titleInput.value = title;
              descInput.value = "";
              tagsInput.value = viaTag;
              privateInput.checked = defaultPrivate;
              toreadInput.checked = defaultToRead;
            }
          },
          false
        );
      }
    }
  }
}

function createSaveForm(token) {
  var formToken = token;
  
  var bookmarkIdInput = document.createElement("input");
  bookmarkIdInput.id = "gm_saveToMineBookmarkId";
  bookmarkIdInput.type = "hidden";
  
  var urlInput = document.createElement("input");
  urlInput.id = "gm_saveToMineUrl";
  urlInput.className = "url";
  urlInput.setAttribute("size", "60");
  urlInput.disabled = true;
  
  var titleInput = document.createElement("input");
  titleInput.id = "gm_saveToMineTitle";
  titleInput.classname = "title";
  titleInput.setAttribute("size", "60");
  
  var descLabel = document.createElement("p");
  descLabel.innerHTML = "description";
  
  var descInput = document.createElement("textarea");
  descInput.id = "gm_saveToMineDesc";
  descInput.classname = "description";
  descInput.setAttribute("rows", "5");
  descInput.setAttribute("cols", "60");
  
  var tagsLabel = document.createElement("p");
  tagsLabel.innerHTML = "tags";
  
  var tagsInput = document.createElement("input");
  tagsInput.id = "gm_saveToMineTags";
  tagsInput.classname = "tags";
  tagsInput.setAttribute("autocomplete", "off");
  tagsInput.setAttribute("size", "60");
  
  var privateInput = document.createElement("input");
  privateInput.type = "checkbox";  
  privateInput.id = "gm_saveToMinePrivate";
  privateInput.classname = "private";
  
  var toreadInput = document.createElement("input");
  toreadInput.type = "checkbox";  
  toreadInput.id = "gm_saveToMineToRead";
  toreadInput.classname = "toread";
  
  var saveLink = document.createElement("a");
  saveLink.id = "gm_saveToMineDoSave";
  saveLink.innerHTML = "save";
  saveLink.href = "";
  
  var cancelLink = document.createElement("a");
  cancelLink.id = "gm_saveToMineDoCancel";
  cancelLink.innerHTML = "cancel";
  cancelLink.href = "";
  
  var alertSpan = document.createElement("span");
  alertSpan.id = "gm_saveToMineAlert";
  alertSpan.innerHTML = "";
  
  var formNode = document.createElement("form");
  formNode.id = "gm_saveToMineForm";
  formNode.style.visibility = "hidden";
  
  formNode.appendChild(bookmarkIdInput);
  formNode.appendChild(urlInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(titleInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(descLabel);
  formNode.appendChild(descInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(tagsLabel);
  formNode.appendChild(tagsInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(document.createTextNode("private"));
  formNode.appendChild(privateInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(document.createTextNode("to read"));
  formNode.appendChild(toreadInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(saveLink);
  formNode.appendChild(document.createTextNode(" "));
  formNode.appendChild(cancelLink);
  formNode.appendChild(document.createTextNode(" "));
  formNode.appendChild(alertSpan);
  
  // stick the form into the DOM
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(formNode);
  
  cancelLink.addEventListener("click",
    function(event) {
      event.preventDefault();
      event.stopPropagation();
      formNode.style.display = "none";
      showAllSaveToMineLinks();
    },
    false
  );
  
  saveLink.addEventListener("click",
    function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      // hidethe save/cancel links, show "saving..." message
      saveLink.style.display = "none";
      cancelLink.style.display = "none";
      alertSpan.innerHTML = "saving...";
      
      var href = window.location.href;
      var http = href.split(":")[0];
      var getUrl = http + "://pinboard.in/add?url=" + encodeURIComponent(urlInput.value);
      
      var req = new XMLHttpRequest();  
      req.open("GET",  getUrl, true);  
      req.onreadystatechange = function (aEvt) { 
        if (req.readyState == 4) {  
          var prevSavedRegex = new RegExp("<div class=\"alert\">previously saved ");
          var prevSavedArr = prevSavedRegex.exec(req.responseText);
          if (prevSavedArr) {  
            // already saved, so just show as saved
            showSaveResult(true, bookmarkIdInput.value);
          }
          else {
            var r = toreadInput.checked ? 1 : 0;
            var params = "";
            params += "form_token=" + encodeURIComponent(formToken) + "&";
            params += "url=" + encodeURIComponent(urlInput.value) + "&";
            params += "next=&";
            params += "title=" + encodeURIComponent(titleInput.value) + "&";
            params += "description=" + encodeURIComponent(descInput.value) + "&";
            params += "tags=" + encodeURIComponent(tagsInput.value) + "&";
            params += privateInput.checked ? "private=1&" : "";
            params += "toread=" + encodeURIComponent(r);
      
            var postUrl = http + "://pinboard.in/add/";
            
            GM_xmlhttpRequest({
              method: "POST",
              url: postUrl,
              data: params,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              onload: function(response) {
                var saved = false;
      
                // a successful save has <div class="alert">The bookmark has been saved.</div>
                var successRegex = new RegExp("<div class=\"alert\">The bookmark has been saved.</div>");
                var successArr = successRegex.exec(response.responseText);
                if (successArr) {
                  if (response.finalUrl) {
                    if (response.finalUrl == postUrl) {
                      // if the api supports finalURL, do additional check
                      saved = true;
                    }
                  }
                  else {
                    saved = true;
                  }
                }
                showSaveResult(saved, bookmarkIdInput.value);
              }
            });
          
          }
        }  
      };  
      req.send(null);
    },
    false
  );
  
  return formNode;
}

function createSavedSpan() {
  var span = document.createElement("span");
  span.className = "gm_saveToMineSaved";
  span.innerHTML = "saved";
  return span;
}

function showAllSaveToMineLinks() {
  var saveLinks = document.evaluate(".//a[contains(@class, 'gm_saveToMineLink')]", 
                                      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
  for (var i = 0; i < saveLinks.snapshotLength; i++) {
    saveLinks.snapshotItem(i).style.display = "inline";
  }
}

function showSaveResult(saved, bookmarkID) {
  if (saved) {
    // hide the form
    formNode = document.getElementById("gm_saveToMineForm");
    formNode.style.display = "none"; 
    
    // get the "save to mine" link for this bookmark
    var link = document.getElementById("gm_saveToMineLink_" + bookmarkID);
    
    // remove the save to mine link
    var editLinksDiv = link.parentNode;
    editLinksDiv.removeChild(link);
    
    // hide the copy to mine link
    var childNode = editLinksDiv.firstChild;
    while (childNode != null) {
      if ((childNode.innerHTML) && (childNode.innerHTML.indexOf("copy to mine") != -1)) {
        childNode.style.display = "none";
        break;
      }
      childNode = childNode.nextSibling;
    }
    
    // add the saved span
    var span = createSavedSpan();
    editLinksDiv.appendChild(span);
  }
  else {
    // not successful, so show a message
    var alertSpan = document.getElementById("gm_saveToMineAlert");
    alertSpan.innerHTML = "Something went wrong; bookmark was not saved.";
  }
}

GM_addStyle(
  'div.edit_links { opacity:1!important; }' +
  '#gm_saveToMineForm { border: 1px solid #aaa; background:#fff; width:450px; padding:4px; padding-left:10px; color:#888; font-size:90%;}' +
  '#gm_saveToMineForm p { line-height:100%; margin-bottom:0px; color:#888; }' +
  '#gm_saveToMineForm input { font-size:90%; border:1px solid #ddd; margin-bottom:3px; }' +
  '#gm_saveToMineForm textarea { font-size:90%; border:1px solid #ddd; margin-bottom:3px; }' +
  '#gm_saveToMineForm {position: relative;}' +
  '.gm_saveToMineLink { color: #aaa!important; }' +
  '.gm_saveToMineSaved { color: #aaa!important; }' +
  '.pin-ac {position: absolute;outline: none;z-index: 1;}' +
  '.pin-ac .bd {position: relative;margin-left:8px;background: #fff;border: 1px solid #aaa;_width: 300px;min-width: 200px;-webkit-box-shadow: 1px 1px 3px rgba(0,0,110,0.33);-moz-box-shadow: 1px 1px 3px rgba(0,0,110,0.33); }' +
  '.pin-ac .hd {height: 0px;overflow: hidden;}' +
  '.pin-ac .hd span {margin-left: 20px;display: block;height: 1px;width: 12px;}' +
  '.pin-ac.off {display: none;z-index: 0;}' +
  '.pin-ac ul {margin: 0;padding: 0;}' +
  '.pin-ac li {padding: 3px 5px;margin: 0;background: #fff;border-bottom: 0px solid #fff;color: #25a;z-index: 1000;}' +
  '.pin-ac .active {background: rgb(150,150,150);color: #fff;}' +
  '.pin-ac li.exclude,.pin-ac li.selected {display: none;}'
);