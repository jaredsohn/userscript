// ==UserScript==
// @name           myCourses Java-free equation viewer
// @namespace      http://userscripts.org/users/4699
// @description    Renders equations natively images rather than clunky Java applets on McGill's WebCT.
// @include        http://mycourses.mcgill.ca/webct/*
// @include        https://mycourses.mcgill.ca/webct/*
// ==/UserScript==

var appls=document.getElementsByTagName('applet');
var a;
var eqapplets=[]; // Gotta make a static array rather than a nodeList pseudo-array, otherwise the script can't remove a node and work with the next one properly.
for(a in appls)
{
    if(appls[a].getAttribute('archive').substr(-27)=='/webct/jar/WebEQ2Applet.jar')
    {
        eqapplets.push(appls[a]);
    }
}
function unhtml(s)
{
    var div=document.createElement('div');
    div.innerHTML=s.replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
    return div.firstChild.nodeValue;
}
function getMathMLForApplet(applet)
{
    var math=document.createElement('math');
    var result=/<param[^<>]+?name=['"]?eq['"]?[^<>]+?value=['"]?([^"']*)/i.exec(applet.innerHTML);
    if(result)
    {
        math.innerHTML=unhtml(result[1]).replace(/<\/?math>/gi,'');
    }
    return math;
}
for(a in eqapplets)
{
    eqapplets[a].parentNode.insertBefore(getMathMLForApplet(eqapplets[a]),eqapplets[a]);
    eqapplets[a].parentNode.removeChild(eqapplets[a]);
}
