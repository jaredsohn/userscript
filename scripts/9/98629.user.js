// ==UserScript==
// @name           Wikipedia: Like Button (Facebook)
// @namespace      facebook
// @description    adds a Like button to the wiki page (Enable 3rd Party Cookies!!)
// @include        *en.wikipedia.org/wiki/*
// @exclude        http://en.wikipedia.org/wiki/Main_Page
// @created        3/8/2011
// @modified       3/8/2011
// @version        0.1
// @history        created initial version. adds button above wiki page title.
// ==/UserScript==

//==========INITIATE WORK============
setTimeout(createLikeButton, 100);

var encodedUrl = getEncodedUrl();

function getEncodedUrl(){
    var x = 'http://'+unsafeWindow.location.hostname+unsafeWindow.location.pathname;
    return encodeURIComponent(x);
}

//----like button iframe-----
function createLikeButton(){
    var heading = document.getElementById("firstHeading");
    var title = heading.innerHTML;
    heading.innerHTML = '';

    //var newdiv = document.createElement('iframe');
    //newdiv.setAttribute('src','http://www.facebook.com/plugins/like.php?href='+encodedUrl+'&amp;layout=standard&amp;show_faces=false&amp;width=450&amp;action=like&amp;colorscheme=light&amp;height=25');
    //newdiv.setAttribute('frameborder','0');
    //newdiv.setAttribute('style','border:none; overflow:hidden; width:450px; height:25px;');
    //newdiv.setAttribute('allowTransparency','true');
    //heading.appendChild(newdiv);
    //node.appendChild(copy);

    heading.innerHTML = '<iframe src="http://www.facebook.com/plugins/like.php?href='+encodedUrl+'&amp;layout=standard&amp;show_faces=false&amp;width=450&amp;action=like&amp;colorscheme=light&amp;height=25" frameborder="0" style="border:none; overflow:hidden; width:450px; height:25px;" allowTransparency="true" >'
    heading.innerHTML += '<br>';
    heading.innerHTML += title;

}

/* KNOWN ISSUE:   http://www.facebook.com/topic.php?uid=14696440021&topic=16716

When clicking on a Facebook "Like" button (on external websites, not on Facebook.com itself), a problematic loop occurs. After clicking the "Like" button:

1. A popup window opens.
2. If not logged into Facebook, you see a login screen.
3. Once you're logged in, the popup window will close.
4. The popup window opens again.
5. The popup window continually opens and closes.

Also, even when you're logged into Facebook, the "Like" button (the standard version) will display as if you were not logged into Facebook. It doesn't seem to recognize that you are, in fact, logged into your account (again, this is when viewing a Like button on any website other than Facebook.com).

This doesn't seem to affect other browsers (browsers other than Firefox). Safari and Chrome do not appear to have any problems. I have only tested for this issue on a Mac (OSX 10.6.5). Somewhat recently (within the last 3 months), this problem did not exist, or, it wasn't as widespread. I have used Like buttons many times, with no problems. Only recently, have I discovered/noticed this issue.

Solution:
I do not know what specifically is causing this, however, enabling "third party cookies" in Firefox preferences does seem to correct or prevent the problem from happening.

If you're experiencing this problem, please report it at the link below. You can view a posting of this problem on Firefox's website:
- http://support.mozilla.com/oc/questions/761194

*/
