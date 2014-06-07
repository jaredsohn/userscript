// ==UserScript==
// @name Pennergame RMenu v1.0
// @description xXx_ptown67_xXx
// @include http://*pennergame.de*
// @exclude http://newboard.pennergame.de/
// ==/UserScript==

var userid1 = document.getElementsByTagName('html')[0].innerHTML.split("http://imgberlin.pennergame.de/cache/bl_DE/avatare/");
var userid2 = userid1[1].split('_');
var userid=userid2[0];

var content = document.getElementById('content');
var ul = content.getElementsByTagName('ul')[9];
ul.innerHTML = 
'<a href="/financial/"><img src="http://i39.tinypic.com/2ahiqyv.jpg"></a>'
+
'<a href = "/messages/"><img src="http://i40.tinypic.com/2icb5mp.jpg"></a>'
+
'<a href = "/friendlist/"><img src="http://i43.tinypic.com/nd3hpz.jpg"></a>'
+
'<a href = "/gang/"><img src="http://i41.tinypic.com/wlon4i.jpg"></a>'
+
'<a href = "/awards/"><img src="http://i41.tinypic.com/de4f0p.jpg"></a>'
+
'<a href = "/profil/id:'+userid+'/"><img src="http://i43.tinypic.com/10ymnm0.jpg"></a>'
+
'<a href = "/change_please/statistics/"><img src="http://i41.tinypic.com/2vmt3f5.jpg"></a>'
+
'<a href = "/premium/"><img src="http://i42.tinypic.com/29ly45v.jpg"></a>'
+
'<a href = "/faq/"><img src="http://i39.tinypic.com/345k304.jpg"></a>'
+
'<a href = "/manual/"><img src="http://i42.tinypic.com/mha9ar.jpg"></a>'
+
'<a href = "http://pennerprofi.de.vu" target="_blank"><img src="http://i44.tinypic.com/2irrbfa.jpg"></a>';