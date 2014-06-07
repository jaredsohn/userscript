// ==UserScript==
// @name           Fix Joowz Chat
// @namespace      joowz
// @include        http://joowz.com/
// ==/UserScript==

var chatObj = document.getElementById("obj_1335748451523");
chatObj.id = "obj_1280478489709";
chatObj.innerHTML = "<param value=\"http://entstream.chatango.com/group\" name=\"movie\">" +
"<param value=\"always\" name=\"AllowScriptAccess\">" +
"<param value=\"all\" name=\"AllowNetworking\">" +
"<param value=\"true\" name=\"AllowFullScreen\">" +
"<param value=\"cid=1280478489709&b=100&c=666666&d=666666&g=333333&j=333333&k= FFFFFF&l=CCCCCC&m=FFFFFF&s=1&t=0&v=0\" name=\"flashvars\">" +
"<embed id=\"emb_1280478489709\" width=\"355\" height=\"480\" flashvars=\"cid=1280478489709&b=100&c=666666&d=666666&g=333333&j=33333 3&k=FFFFFF&l=CCCCCC&m=FFFFFF&s=1&t=0&v=0\" allowfullscreen=\"true\" type=\"application/x-shockwave-flash\" allownetworking=\"all\" allowscriptaccess=\"always\" src=\"http://entstream.chatango.com/group\">";

//JOOWZDOTCOM chat
/*
<object id="obj_1335748451523" width="355" height="480">
<param value="http://joowzdotcom.chatango.com/group" name="movie">
<param value="transparent" name="wmode">
<param value="always" name="AllowScriptAccess">
<param value="all" name="AllowNetworking">
<param value="true" name="AllowFullScreen">
<param value="cid=1335748451523&b=60&f=50&l=999999&q=999999&r=100&s=1&t=0&v=0" name="flashvars">
<embed id="emb_1335748451523" width="355" height="480" flashvars="cid=1335748451523&b=60&f=50&l=999999&q=999999&r=100&s=1&t=0&v=0" allowfullscreen="true" type="application/x-shockwave-flash" allownetworking="all" allowscriptaccess="always" wmode="transparent" src="http://joowzdotcom.chatango.com/group">
</object>
*/

//ENTSTREAM chat
/*
<object id="obj_1280478489709" width="355" height="418">
<param value="http://entstream.chatango.com/group" name="movie">
<param value="always" name="AllowScriptAccess">
<param value="all" name="AllowNetworking">
<param value="true" name="AllowFullScreen">
<param value="cid=1280478489709&b=100&c=666666&d=666666&g=333333&j=333333&k= FFFFFF&l=CCCCCC&m=FFFFFF&s=1&t=0&v=0" name="flashvars">
<embed id="emb_1280478489709" width="355" height="480" flashvars="cid=1280478489709&b=100&c=666666&d=666666&g=333333&j=33333 3&k=FFFFFF&l=CCCCCC&m=FFFFFF&s=1&t=0&v=0" allowfullscreen="true" type="application/x-shockwave-flash" allownetworking="all" allowscriptaccess="always" src="http://entstream.chatango.com/group">
</object>
*/