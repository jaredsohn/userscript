// ==UserScript==
// @name           Youtube draugiem say
// @namespace      ;)
// @author         jang (xlvxjang)
// @version        0.102
// @description    Pievieno iespeju Youtube.com klipus ieteikt draugiem.lv Runa sadala!
// @include        http://*.youtube.com/watch?v=*
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.innerHTML = 'function DraugiemSay( title, url, titlePrefix ){ window.open(  "http://www.draugiem.lv/say/ext/add.php?title=" + encodeURIComponent( title ) +  "&link=" + encodeURIComponent( url ) +  ( titlePrefix ? "&titlePrefix=" + encodeURIComponent( titlePrefix ) : "" ),  "",  "location=1,status=1,scrollbars=0,resizable=0,width=530,height=400" ); return false; }';
headID.appendChild(newScript);

var thebox = document.getElementById("watch-actions-area").children.item(0);
var box_elements = document.getElementById("watch-actions-area").children.item(0).children;
thebox.removeChild(box_elements.item(4));

var titleID = document.getElementsByTagName("title")[0];
title = titleID.innerHTML;
title = title.split('-')[1];
title = title.replace("'", "");
title = title.replace('"', '');
var url = window.location;

document.getElementById("watch-actions-area").children.item(0).innerHTML += '<div class="watch-tab"><a title="ieteikt draugiem - draugiem.lv" onclick="DraugiemSay(\''+title+'\', \''+url+'\', \'youtube.com\'); return false;" style="margin-left: 0px;" href="#"><img border="0" style="vertical-align: middle;" alt="Ieteikt draugiem - draugiem.lv" src="http://www.apollo.lv/images/draugiem.png"/> Ieteikt</a></div><div class="clear"/>';