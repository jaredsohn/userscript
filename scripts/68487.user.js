// ==UserScript==
// @name          FriendFeedHideByKeyword
// @namespace     http://www.mcalamelli.net
// @description   Hide posts using keywords
// @include       http*://friendfeed.com/*
// @exclude       http*://friendfeed.com/filter/direct
// @version       0.7.2.2
// ==/UserScript==

// Fix Chrome bug, looks like that Chrome reloads the script (dunno why)
//if ((document.getElementById("hbkw") == null) || (window.chrome)) {

// hide posts using selected keyword
// kw: the keyword
// fresh: is this a new hide, or we're hiding using an existing keyword?
function hide(kw, fresh) {
   var posts = document.getElementsByClassName("text");
   var re = new RegExp(kw, "i");
   var hideCount = 0;

   // walking through posts to search unwanted keyword
   for (var i = 0; i <= posts.length - 1; i++) {
      var entry = posts[i].innerHTML;
      if ((entry.search(re) != -1) && (kw != "")){
         // keyword found
         hideCount++;
         // get the post
         var hiddenEntry = posts[i].parentNode.parentNode.parentNode.parentNode;
         
         // set a fake id
         hiddenEntry.setAttribute("name", kw);
         
         // and hide it
         hiddenEntry.style.visibility="hidden";
         hiddenEntry.style.display="none";
      } else {
         if (fresh == false) {
            // keyword not found, but fresh is false, so this call came from 
            // a page refresh & cookie. i've to remove unmatched keyword
            /* This piece of code could be useful, i'll keep commented
            var ii = keywordArray.indexOf(kw);
            keywordArray.splice(ii, 1);
            storeKeywordsInCookie(keywordArray.join(","));
            */
         }
      }
   }

   if (hideCount != 0) {
      // unwanted keyword detected, add keyword to the keyword's list
      if (true == fresh) {
         if (!window.chrome) {
            // Firefox
            document.getElementById("hbkw").innerHTML += "<p id=\"id" + kw + "\" class=\"hkw\" style=\"margin:0pt\">" + kw + " (" + hideCount + ")  [<a href=\"#\" onclick=\"unhide('" + kw + "')\">Unhide</a>]</p>";
         } else {
            // Chrome
            var hbkw = document.getElementById('kw').parentNode;
            var _p = document.createElement("p");
            _p.setAttribute("id", "id" + kw);
            _p.setAttribute("class", "hkw");
            _p.setAttribute("style", "margin:0pt");
            _p.innerHTML = kw + " (" + hideCount + ")  [";
            var _a = document.createElement("a");
            _a.setAttribute("href","#");
            _a.setAttribute("onclick","unhide('" + kw +"')");
            _a.innerText += "Unhide";
            _p.appendChild(_a);
            _p.innerHTML += "]";
            hbkw.appendChild(_p);
         }
      } else {
         // we're hiding a new post using existing keyword, we've to update hidden count
         //var hiddenTmp = document.getElementById("id" + kw).innerHTML.match(/\([0-9]+\)/);
         //var hiddenCount = parseInt(hiddenTmp.toString().match(/[0-9]+/));
         if (document.getElementById("id" + kw) == null) {
            if (!window.chrome) {
               // Firefox
               document.getElementById("hbkw").innerHTML += "<p id=\"id" + kw + "\" class=\"hkw\" style=\"margin:0pt\">" + kw + " (1)  [<a href=\"#\" onclick=\"unhide('" + kw + "')\">Unhide</a>]</p>";
            } else {
               // Chrome
               var hbkw = document.getElementById('kw').parentNode;
               var _p = document.createElement("p");
               _p.setAttribute("id", "id" + kw);
               _p.setAttribute("class", "hkw");
               _p.setAttribute("style", "margin:0pt");
               _p.innerHTML = kw + " (1)  [";
               var _a = document.createElement("a");
               _a.setAttribute("href","#");
               _a.setAttribute("onclick","unhide('" + kw +"')");
               _a.innerText += "Unhide";
               _p.appendChild(_a);
               _p.innerHTML += "]";
               hbkw.appendChild(_p);
            }
         } else {
            var hiddenTmp = document.getElementById("id" + kw).innerHTML.match(/\([0-9]+\)/);
            var hiddenCount = parseInt(hiddenTmp.toString().match(/[0-9]+/));
            document.getElementById("id" + kw).innerHTML = document.getElementById("id" + kw).innerHTML.replace(/\([0-9]+\)/, "(" + (hiddenCount + 1).toString() + ")");
         }
      }
      // and reset text entry
      document.getElementById("kw").value = "";
      
      // place here the writing of persistent storage
      window.localStorage.setItem(kw, kw);
      return true;
   }
   return false;
}

// unhide previously hidden posts
function unhide(kw) {
   // get posts affected by keyword
   var hiddenElements = document.getElementsByName(kw);
   
   // and unhide it
   for (var i = 0; i < hiddenElements.length; i++) {
      hiddenElements[i].style.visibility = "visible";
      hiddenElements[i].style.display = "block";
      //hiddenElements[i].removeAttribute("name"); // removing it not all hidden elements will be shown again
   }
   
   // remove the keyword from the list
   var currentKeyword = document.getElementById("id" + kw);
   currentKeyword.parentNode.removeChild(currentKeyword);
   
   // update the array of keywords
   window.localStorage.removeItem(kw);
}

// check for keywords in a new post
function checkNewPost(txt) {
   if (window.chrome)
      win = window;
   else
      win = unsafeWindow;
   for (var ii = 0; ii < win.localStorage.length; ii++) {
      var kw1 = window.localStorage.key(ii);
      var re1 = new RegExp(kw1, "i");
      if (txt.search(re1) != -1) {
         console.debug("checkNewPost => FOUND");
         hide(kw1, false);
         break;
      }
   }
}

// iterate into stored keywords and try to hide annoying posts
function hidePostsFromStoredKeywords() {
   if (window.chrome)
      win = window;
   else
      win = unsafeWindow;
   if (win.localStorage.length > 0) {
      for (var i = 0; i < win.localStorage.length; i++) {
         k = window.localStorage.key(i);
         hide(window.localStorage.getItem(k), true);
      }
   }
}

// create the Hide box
function createHideBox() {
   // Detect useful DOM elements
   var FFSidebar = document.getElementById("sidebar");
   var FFBox = FFSidebar.getElementsByClassName("box");
   var FFBoxBody = FFBox[0].getElementsByClassName("box-body");
   var FFSection = FFBoxBody[0].childNodes[1];

   // Create a new section...
   var hbkwSect = document.createElement("div");
   // ...and set up class and ID...
   hbkwSect.setAttribute("class", "section");
   hbkwSect.setAttribute("id", "hbkw");
   // ...and add HTML elements...
   hbkwSect.innerHTML = "<input type=\"text\" id=\"kw\" size=\"11\" onkeypress=\"keyGrab(event)\">";
   hbkwSect.innerHTML += "&nbsp;<a href=\"#\" onclick=\"hide(document.getElementById('kw').value, true)\">Hide</a>";
   if (!window.chrome) {
      // Firefox
      hbkwSect.innerHTML += "<script language=\"Javascript\">hidePostsFromStoredKeywords();</script>";
   } else {
      // Chrome
      var _s_hbkwSect = document.createElement("script");
      _s_hbkwSect.setAttribute("type","text/javascript");
      _s_hbkwSect.innerText = "hidePostsFromStoredKeywords();";
      hbkwSect.appendChild(_s_hbkwSect);
   }
   // ...and insert into the DOM...
   FFBoxBody[0].insertBefore(hbkwSect, FFSection.nextSibling);
}

// Simple keygrabber to handle Enter key
function keyGrab(e) {
   var characterCode = e.keyCode ? e.keyCode : e.charCode;

   switch (characterCode) {
      case 13:
         hide(document.getElementById('kw').value, true);
         break;
      default:
      //nothing
   }
}


// Simple keygrabber to handle "h" key
function hGrab(e) {
   var characterCode = e.keyCode ? e.keyCode : e.charCode;

   switch (characterCode) {
      case 72:
      case 104:
         //hide(document.getElementById('kw').value, true);
         var hl = "";
         if (window.getSelection) {
            hl = window.getSelection();
         } else if (document.getSelection) {
            hl = document.getSelection();
         } else if (document.selection) {
            hl = document.selection.createRange().text;
         }
         //alert(hl);
         document.getElementById('kw').value = hl;
         hide(document.getElementById('kw').value, true);
         break;
      default:
      //nothing
   }
}

// push local function into DOM 
function embedInDOM(s) {
   var scpt = document.createElement('script');
   scpt.setAttribute("type","text/javascript");
   scpt.innerHTML = s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
   document.body.appendChild(scpt);
}

//******************************************

// Push hide(kw) into the DOM
embedInDOM(hide);
// Push unhide(kw) into the DOM
embedInDOM(unhide);
// Push checkNewPost(txt) into the DOM
embedInDOM(checkNewPost);
// Push hidePostsFromStoredKeywords() into the DOM
embedInDOM(hidePostsFromStoredKeywords);
// Push createHideBox() into the DOM
embedInDOM(createHideBox);
// Push keyGrab() into the DOM
embedInDOM(keyGrab);
// Push hGrab() into the DOM
embedInDOM(hGrab);

// Create the Hide box
createHideBox();

// add "h" helper
document.addEventListener('onkeypress', hGrab, true);

// add a listener for DOM changes
document.addEventListener('DOMNodeInserted', function (event) {
   var eventTarget = event.target;
   if ((eventTarget.toString().search("Div")) && (eventTarget.nodeType != 3)) {
      var targetClass = eventTarget.getAttribute("class");
      if (("l_entry entry" == targetClass) || ("l_entry entry private" == targetClass)) {
         // new post. ok, a rescan is needed now
         checkNewPost(eventTarget.getElementsByClassName("body")[0].getElementsByClassName("ebody")[0].getElementsByClassName("title")[0].getElementsByClassName("text")[0].innerHTML);
      }
   }
}, false);

//}
