// ==UserScript==
// @name           Facebook Sort
// @namespace      http://websiteoninternet.com/fbsorter.html
// @description    Puts a small bar on the top of facebook to allow sorting of the newsfeed
// @include        http://www.facebook.com/*
// @exclude			http://apps.facebook.com
// @exclude			http://www.facebook.com/help/*
// ==/UserScript==
/*
document.getElementById("dropmenu_container").style.height="16px";
document.getElementById("dropmenu_container").style.backgroundColor="#D8DFEA";
document.getElementById("dropmenu_container").style.marginLeft="182px";
document.getElementById("dropmenu_container").style.marginTop="1px";
document.getElementById("dropmenu_container").style.padding="3px";
document.getElementById("dropmenu_container").style.width="526px";
document.getElementById("dropmenu_container").style.border="#627AAD thin solid";
document.getElementById("dropmenu_container").style.overflow="hidden";
*/
document.getElementById("contentCol").style.paddingTop="2px";
document.getElementById("contentCol").innerHTML="<div id=\"fbsort_container\" style=\"position:relative;width:526px;height:16px;background-color:#D8DFEA;border:#627AAD thin solid;padding:3px;overflow:hidden;margin:2px\"><div id=\"sortlinks\" style=\"width:400px;float:left\"> Sort News Feed: </div> <div id=\"fbsort_settings\" style=\"float:right;\"><a id=\"fbsort_click\">settings <img src=\"http://static.ak.fbcdn.net/rsrc.php/zA6K6/hash/cnbfiri3.gif\"></a></div> <br><br><div id=\"fbsort_apps\"></div></div>"+document.getElementById("contentCol").innerHTML;

var x;
var apps = new Array();
var appicon = new Array();
apps[2915120374] = "Status&nbsp;Updates";
appicon[2915120374] = "http://b.static.ak.fbcdn.net/rsrc.php/zEVUV/hash/1bey05t2.gif";
apps[281446206569] = "Psyfi";
appicon[281446206569] = "http://photos-b.ak.fbcdn.net/photos-ak-sf2p/v43/17/281446206569/app_2_281446206569_266.gif";
apps[102452128776] = "Farmville";
appicon[102452128776] = "http://photos-a.ak.fbcdn.net/photos-ak-sf2p/v43/144/102452128776/app_2_102452128776_416.gif";
apps[14852940614] = "Birthday&nbsp;Cards";
appicon[14852940614] = "http://photos-g.ak.fbcdn.net/photos-ak-sf2p/v43/134/14852940614/app_2_14852940614_5998.gif";
apps[10979261223] = "Mafia&nbsp;Wars";
appicon[10979261223] = "http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/231/10979261223/app_2_10979261223_8090.gif";
apps[2389801228] = "Zynga&nbsp;Poker";
appicon[2389801228] = "http://photos-e.ak.fbcdn.net/photos-ak-sf2p/v43/52/2389801228/app_2_2389801228_6849.gif";
apps[56748925791] = "Farm&nbsp;Town";
appicon[56748925791] = "http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/243/56748925791/app_2_56748925791_7768.gif";
apps[26947445683] = "Country&nbsp;Life";
appicon[26947445683] = "http://photos-d.ak.fbcdn.net/photos-ak-sf2p/v43/67/26947445683/app_2_26947445683_7525.gif";
apps[167746316127] = "Zoo&nbsp;World";
appicon[167746316127] = "http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/159/167746316127/app_2_167746316127_6580.gif";
apps[163576248142] = "Petville";
appicon[163576248142] = "http://photos-g.ak.fbcdn.net/photos-ak-sf2p/v43/202/163576248142/app_2_163576248142_1990.gif";
apps[11609831134] = "Pet&nbsp;Society";
appicon[11609831134] = "http://photos-g.ak.fbcdn.net/photos-ak-sf2p/v43/118/11609831134/app_2_11609831134_7457.gif";
apps[127148832824] = "Happy&nbsp;Pets";
appicon[127148832824] = "http://photos-a.ak.fbcdn.net/photos-ak-sf2p/v43/104/127148832824/app_2_127148832824_8975.gif";
apps[151044809337] = "Fishville";
appicon[151044809337] = "http://photos-b.ak.fbcdn.net/photos-ak-sf2p/v43/9/151044809337/app_2_151044809337_7378.gif";
apps[21526880407] = "Yoville";
appicon[21526880407] = "http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/151/21526880407/app_2_21526880407_5669.gif";
apps[134920244184] = "Happy&nbsp;Aquarium";
appicon[134920244184] = "http://photos-a.ak.fbcdn.net/photos-ak-sf2p/v43/96/134920244184/app_2_134920244184_2064.gif";
apps[46755028429] = "Castle&nbsp;Age";
appicon[46755028429] = "http://photos-f.ak.fbcdn.net/photos-ak-sf2p/v43/25/46755028429/app_2_46755028429_6218.gif";
apps[101539264719] = "Cafe&nbsp;World";
appicon[101539264719] = "http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/39/101539264719/app_2_101539264719_1610.gif";
apps[43016202276] = "Restaurant&nbsp;City"
appicon[43016202276] = "http://photos-e.ak.fbcdn.net/photos-ak-sf2p/v43/96/43016202276/app_2_43016202276_3195.gif";
apps[64571521476] = "Farkle";
appicon[64571521476] = "http://photos-e.ak.fbcdn.net/photos-ak-sf2p/v43/84/64571521476/app_2_64571521476_9525.gif";
apps[40343401983] = "Bejeweled&nbsp;Blitz";
appicon[40343401983] = "http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/3/40343401983/app_2_40343401983_4588.gif";
apps[112462268161] = "Mobsters 2";
appicon[112462268161] = "http://photos-b.ak.fbcdn.net/photos-ak-sf2p/v43/229/112462268161/app_2_112462268161_8586.gif";
apps[5706713477] = "Mindjolt&nbsp;Games";
appicon[5706713477] = "http://photos-f.ak.fbcdn.net/photos-ak-sf2p/v43/101/5706713477/app_2_5706713477_8832.gif";
apps[7068221435] = "Pillow&nbsp;Fight";
appicon[7068221435] = "http://photos-d.ak.fbcdn.net/photos-ak-sf2p/v43/191/7068221435/app_2_7068221435_8606.gif";
apps[31231052697] = "Happy&nbsp;Island";
appicon[31231052697] = "http://photos-b.ak.fbcdn.net/photos-ak-sf2p/v43/201/31231052697/app_2_31231052697_7474.gif";
apps[94483022361] = "Island&nbsp;Paradise";
appicon[94483022361] = "http://photos-b.ak.fbcdn.net/photos-ak-sf2p/v43/105/94483022361/app_2_94483022361_4954.gif";


var i=0;
for (x in apps) {
	i++;
		if (GM_getValue(apps[x]) == 1) {
			document.getElementById("fbsort_apps").innerHTML=document.getElementById("fbsort_apps").innerHTML+"<input type=\"checkbox\" id=\""+x+"\" CHECKED> <a href=\"http://www.facebook.com/apps/application.php?id="+x+"\" target=\"_self\"><img src=\""+appicon[x]+"\" align=\"absmiddle\" border=\"0\">&nbsp;"+apps[x]+"</a>";
		} else {
			document.getElementById("fbsort_apps").innerHTML=document.getElementById("fbsort_apps").innerHTML+"<input type=\"checkbox\" id=\""+x+"\"> <a href=\"http://www.facebook.com/apps/application.php?id="+x+"\" target=\"_self\"><img src=\""+appicon[x]+"\" align=\"absmiddle\" border=\"0\">&nbsp;"+apps[x]+"</a>";
		}
	if (i==5) {
			document.getElementById("fbsort_apps").innerHTML=document.getElementById("fbsort_apps").innerHTML+"<br>";
			i=0;
	}
}
document.getElementById("fbsort_apps").innerHTML=document.getElementById("fbsort_apps").innerHTML+"<br><a href=\"http://websiteoninternet.com/fbsorter.html\" target=\"_blank\">Facebook Sorter</a> v 1.0";

function fbsort_settings(event) {
	event.preventDefault();
	document.getElementById("fbsort_container").style.height="200px";
	document.getElementById("fbsort_settings").innerHTML="<a id=\"fbsort_noclick\">close <img src=\"http://static.ak.fbcdn.net/rsrc.php/zA6K6/hash/cnbfiri3.gif\"></a>";
	document.getElementById("fbsort_noclick").addEventListener("click", fbsort_nosettings, false);
}
function fbsort_nosettings(event) {
	document.getElementById("fbsort_container").style.height="16px";
	document.getElementById("fbsort_settings").innerHTML="<a id=\"fbsort_click\">settings <img src=\"http://static.ak.fbcdn.net/rsrc.php/zA6K6/hash/cnbfiri3.gif\"></a>";
	document.getElementById("fbsort_click").addEventListener("click", fbsort_settings, false);
	fbsort_addapp();
}
function fbsort_addapp() {
	document.getElementById("sortlinks").innerHTML = " Sort News Feed: ";
	for (x in apps) {
		if (document.getElementById(x).checked == true) {
			GM_setValue(apps[x], '1');
			document.getElementById("sortlinks").innerHTML=document.getElementById("sortlinks").innerHTML+" <a href=\"http://www.facebook.com?filter=app_"+x+"\" target=\"_self\"><img src=\""+appicon[x]+"\" align=\"absmiddle\" border=\"0\"></a>";
		} else {
			GM_setValue(apps[x], '0');
		}
	}
}
 //<a href=\"http://www.facebook.com/home.php?filter=app_10979261223\" target=\"_self\"><img src=\"http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/231/10979261223/app_2_10979261223_8090.gif\" align=\"absmiddle\" border=\"0\"> Mafia Wars</a> <a href=\"http://www.facebook.com/home.php?sk=app_2915120374\" target=\"_self\"><img src=\"http://static.ak.fbcdn.net/rsrc.php/z9Q0Q/hash/8yhim1ep.ico\" border=\"0\" align=\"absmiddle\"> Status Updates</a>";

fbsort_nosettings();