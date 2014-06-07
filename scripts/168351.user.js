// ==UserScript==
// @name        	eRepublik Shoutbox by Hori873
// @namespace   	By Hori873 (Mlendea Horatiu)
// @description 	Add a Shoutbox chat to eRepublik
// @include			http://www.erepublik.com/en
// @version			1.05.26.02b
// @downloadURL		http://userscripts.org/scripts/source/168351.user.js
// @updateURL		http://userscripts.org/scripts/source/168351.meta.js
// ==/UserScript==

function CreateButton()
{
    uiFeed = document.getElementById("show_party_feed").parentNode;

    liShoutbox = document.createElement("li");
    liShoutbox.setAttribute("id", "show_shoutbox_feed");
    liShoutbox.setAttribute("class", "");
    uiFeed.insertBefore(liShoutbox, document.getElementById("show_facebook_feed"));
    
    aShoutbox = document.createElement("a");
    aShoutbox.setAttribute("href", "javascript:;");
    aShoutbox.setAttribute("trigger", "get_shoutbox_feeds");
    aShoutbox.setAttribute("title", "Shoutbox");
    aShoutbox.appendChild(document.createTextNode("Crazy"));
    liShoutbox.appendChild(aShoutbox);
}

function SetShoutboxPosition()
{  
    feeds = document.getElementById("citizen_feed");
    
    var l = feeds.offsetLeft + 4;
    var t = feeds.offsetTop + 39;
        
    //fbw.parentNode.removeChild(fbw);
        
    Shoutbox.style.position = "absolute";
    Shoutbox.style.left = l + 'px';
    Shoutbox.style.top = t + 'px';
    
    Shoutbox.style.display = 'none';
}

function get_shoutbox_feeds()
{
    get_facebook_feeds();
    Shoutbox.style.display = '';
    document.getElementById("show_friends_feed").className = "";
    document.getElementById("show_regiment_feed").className = "";
    document.getElementById("show_party_feed").className = "";
    document.getElementById("show_shoutbox_feed").className = "active";
    document.getElementById("show_facebook_feed").className = "";
}

Floatdiv = document.createElement('div');
Floatdiv.setAttribute("id", "ShoutboxDiv");
Floatdiv.setAttribute("style", "position: fixed; bottom 0px; right: 0px; z-index:100");
document.getElementsByTagName("body")[0].appendChild(Floatdiv);

Shoutbox = document.getElementById('ShoutboxDiv');
Shoutbox.innerHTML += '<div><iframe src="http://www.yourshoutbox.com/shoutbox/sb.php?key=846409281" scrolling="no" frameborder="0" width="401px" height="700px" style="border:0; margin:0; padding: 0;">';
Shoutbox.innerHTML += '</iframe></div>';

CreateButton();
SetShoutboxPosition();
get_shoutbox_feeds();

// Show & Hide
document.getElementById("show_friends_feed").onclick = function()
{
    Shoutbox.style.display = 'none';
    document.getElementById("show_shoutbox_feed").className = "";
}
document.getElementById("show_regiment_feed").onclick = function()
{
    Shoutbox.style.display = 'none';
    document.getElementById("show_shoutbox_feed").className = "";
}
document.getElementById("show_party_feed").onclick = function()
{
    Shoutbox.style.display = 'none';
    document.getElementById("show_shoutbox_feed").className = "";
}
document.getElementById("show_shoutbox_feed").onclick = function()
{
    get_shoutbox_feeds();
}
document.getElementById("show_facebook_feed").onclick = function()
{
    Shoutbox.style.display = 'none';
    document.getElementById("show_shoutbox_feed").className = "";
}