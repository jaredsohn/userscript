// ==UserScript==
// @name          TDWTF forums idiot remover
// @description   TDWTF forums are a cool and interesting place for people to discuss computery stuff, but there's just some people that anger up the blood.
// @include       http://forums.thedailywtf.com/forums/*/*.aspx*
// ==/UserScript==


idiots = new Array();
// If you don't want to use the handy popup menu thingymbob....
// You can add the idiots here, one after the other, like a cavalcade of fools.
// eg:
//idiots['SomeDailyWTFForumUser']=true;

GM_getValue(idiots,"").split(",").forEach(function(a){if (a!='') {a=unescape(a);idiots[a]=true;}});
GM_registerMenuCommand("Add idiot...",function(){GM_setValue(idiots,GM_getValue(idiots,"")+escape(prompt('The idiots username, case is important. :)'))+',');window.location.reload()});
 
names = $$(document,'ForumPostUserName');
targets = new Array();
for (x=0;x<names.length;x++) {
	person = names[x].firstChild.nextSibling.nextSibling.nextSibling.textContent;
	if (idiots[person]) {
//		targets.push(names[x].parentNode.parentNode.parentNode.parentNode.parentNode);
		targets.push(names[x].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
		targets[targets.length-1].___name=person;
	}
}
for(x=0;x<targets.length;x++) {
	targets[x].innerHTML='<p style="border: solid black 1px; padding: 3px;">Post removed, user <b>'+targets[x].___name+'</b> is an idiot.</p>';
}


function $$(o,a) {
	if (o.getElementsByClassName) {
		return o.getElementsByClassName(a);
	} else {
		out = new Array();
		bleugh = document.evaluate("//*[@class='"+a+"']",o,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var x=0;x<bleugh.snapshotLength;x++) {
			out.push(bleugh.snapshotItem(x));
		}
		return out;
	}
}