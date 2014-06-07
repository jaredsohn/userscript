// This is far from a polished solution.  It's more of an itch-scratching in progress.
// If it doesn't scratch yours, then improve it... and send me the results.
// Current features:
//    + Keep relative time stamps up-to-date
//    + Change reply to a "quick" (AJAX-style) reply link for all messages (CTRL+click to use old message form)
//    + Change modify to a "quick" (AJAX-style) modify link for all messages (CTRL+click to use old message form)
//    + Change new to a "quick" (AJAX-style) new thread link for forums that support it
//    + Multiple signatures for Quick Reply
//    + Shortcut keys for moving between posts and threads
//    + WYSIWYG post composition
//
// You'll note that the code itself is fairly brief. This is because the bulk of the code is loaded from a file stored on the Code Project server. 
// This is done to allow me to fix bugs or add small features without requiring everyone to update to a new version of this script. 
//
// Latest Changes:
// [6/1/2005]
//    + Ensure posts are visible when first expanded
//    + Fixed extraction of subject and usernames
//    + Added Linkification buttons
//    + Rework quick reply form (takes up less space)
// [6/6/2005]
//    + Initial sig rotation implementation
//    + Improved tab order of quick reply form
// [6/7/2005]
//    + Improved random sig selection
// [6/15/2005]
//    + Fix problem where Re: wouldn't be added to some reply subjects.
// [8/25/2005]
//    + Added support for new message board feature (message type)
//    + Added "Quick thread" feature
// [8/26/2005]
//    + Fixed problems when running under Deer Park Alpha 2
// [11/30/2005]
//    + Fixed problems with Firefox 1.5
// [2/1/2006]
//    + Added preferences for editing format, sig state
// [5/19/2006]
//    + New preferences system
// [5/25/2006]
//    + Fixed code that retrieves username and email
//    + Added non-www domain names to default include list
// [7/12/2006]
//    + Work around "issues" w/ Fx 2 Beta 1
// [8/2/2006]
//    + Retrieve username and email every time - avoid annoying problems with cached credentials.
//
// - Joshua Heyer, May 24th, 2006
//   shognine@gmail.com
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.4 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CPhog", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CPhog
// @author        Joshua Heyer
// @namespace  http://shog9.com/greasemonkey/scripts/
// @description   deal with things that annoy me on the Code Project website
// @version        1.8.2
// @include       http://*.codeproject.com/*
// @include       http://*.codetools.com/*
// @include       http://*.thecodeproject.com/*
// @include       http://codeproject.com/*
// @include       http://codetools.com/*
// @include       http://thecodeproject.com/*
// ==/UserScript==
//

// no sense loading anything if this isn't even a forum - do a quick test for a forum table
var forumTable = document.evaluate("//table[@id='ForumTable']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( forumTable && forumTable.snapshotLength > 0 )
{      
   // load author information 
   var AuthorName = GM_getValue("AuthorName", "");
   var AuthorEmail = GM_getValue("AuthorEmail", "");
   // update 'em if they've changed
   var strAction = "/script/comments/user_reply.asp?forumid=5137&select=1302912";
   GM_xmlhttpRequest({
      method: 'GET',
      url: "http://" + document.location.host + strAction,
      onload: function(responseDetails) 
      {
         if ( responseDetails.status == 200 )
         {
            var tmpDiv = document.createElement("DIV");
            tmpDiv.style.display = "none";
            tmpDiv.innerHTML = responseDetails.responseText;
            AuthorName = document.evaluate(".//input[@name='AuthorName']/@value", tmpDiv, null, XPathResult.STRING_TYPE, null).stringValue;
            AuthorEmail = document.evaluate(".//input[@name='AuthorEmail']/@value", tmpDiv, null, XPathResult.STRING_TYPE, null).stringValue;
            GM_setValue("AuthorName", AuthorName);
            GM_setValue("AuthorEmail", AuthorEmail);
         }
      }
   });      
   
   // signatures
   var Signatures = GM_getValue("Signatures", "");
   if ( !Signatures )
   {
      var aSigSet = new Array();
      var i=0;
      do
      {
         var sig = GM_getValue("Sig" + i, "");
         if ( sig != "" )
            aSigSet.push(sig);
         else
            break;
         i++;
      } while (true);
      Signatures = aSigSet.join("\n%\n");
      GM_setValue("Signatures", Signatures);
   }
   
   GM_setValue("CPhogVersion", "10812");
      
  var greaseSrc = "http://www.codeproject.com/script/profile/upload/20101/FreshGrease.txt";
   
   // load our code
   var theScript = document.createElement("script");
   theScript.src = greaseSrc;
   theScript.language = "javascript";
   document.body.insertBefore(theScript, document.body.firstChild);
   
   var formStateEl = document.createElement("DIV");
   formStateEl.id = "CPhogformState";
   formStateEl.style.display = "none";
   document.body.appendChild(formStateEl);
   
   // load value
   formStateEl.addEventListener('refresh', function(ev)
      {
         var prefName = formStateEl.getAttribute("prefName");
         var el = document.getElementById(prefName);
         if ( !el )
         {
            el = document.createElement("DIV");
            el.id = "CPhog" + prefName;
            el.style.display = "none";
            document.body.appendChild(el);
         }
         el.textContent = GM_getValue(prefName, "");
      }, false);
      
   // save value
   formStateEl.addEventListener('changed', 
      function(ev) 
      { 
         var prefName = formStateEl.getAttribute("prefName");
         var el = document.getElementById("CPhog"+prefName);
         if ( el )
            GM_setValue(prefName, el.textContent);
      },
      false);
}
