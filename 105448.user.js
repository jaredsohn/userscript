// ==UserScript==
// @name           Markiert_Reply
// @namespace      quake.ingame.de
// @include        http://quake.ingame.de/forum/*
// ==/UserScript==

/* returns function for selecting and creating quote */
function createFun(username, postid)
{
     return function() {
         var quoted = "[QUOTE=" + username + ";" + postid + "]";
         quoted += window.getSelection();
         quoted += "[/QUOTE]"
         document.getElementById("vB_Editor_QR_textarea").value += quoted;
     }
}

/* creates anchor for more convenient quoting */
var anchor = document.createElement("a");
anchor.name = "editor";
anchor.href = "#";

try {
    var old = document.getElementById("qrform");
    old.insertBefore(anchor, old.firstChild);
} catch (e) {
    ;
}



var posts = document.getElementById("posts");

if (posts != null)
{
    for(var i in posts.children)
    {
        var content  = posts.children[i].innerHTML;
     
         try {
             var postid   = content.match(/postmenu_([0-9]+)/)[1];
             var username = content.match(/class="bigusername"(?:.*?)>(.*?)</)[1];

         } catch (e) {
             continue;
         }
     
         var button = document.createElement("a");
         
         var hurl = document.URL;
         if (hurl.indexOf("#") != -1)
         {
             hurl = hurl.substring(0, hurl.indexOf("#"));
         }
         button.href = hurl + "#editor";
         button.innerHTML = "mark. Text zitieren";
         button.id = "marktext_" + postid;
         button.style.fontSize = "0.8em";

         document.getElementById('qr_' + postid).parentNode.appendChild(button);
         button.addEventListener("click", createFun(username, postid), true);
    }
}
