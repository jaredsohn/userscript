// ==UserScript==
// @name           info2008
// @namespace      klavogonki
// @include        http://klavogonki.ru/gamelist*
// @author         Fenex
// @version        1.0.1
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
var s = document.createElement('script');
s.innerHTML = 'showProfile=function(id){var obj=$("popup");var content=$("popup_content");if(profilesCache[id]==undefined){content.update(strLoading);profilesCache[id]=0;new Ajax.Request("/profile/"+id+".popup",{method:"get",parameters:url_params,onSuccess:function(transport){eval("var json="+transport.responseText+";");profilesCache[json.id]=json.html;$("popup_content").update(profilesCache[json.id])}})}else{if(profilesCache[id]!=0){content.update(profilesCache[id])}}obj.style.left=mouseX+10+"px";obj.style.top=mouseY+10+"px";obj.show()}';
document.body.appendChild(s);