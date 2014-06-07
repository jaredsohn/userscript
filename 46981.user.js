// ==UserScript==
// @name           Hongfire Cleanup
// @namespace      http://userscripts.org/users/33432
// @description    Remove all unnecessary things from hongfire forum
// @include        http://www.hongfire.com/forum/showthread.php*
// ==/UserScript==

function get(elem,str){
	var list=[];
	var i;
	var items=document.evaluate(str,elem,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for(var i=0;i<items.snapshotLength;i++) {
		list.push(items.snapshotItem(i));
	}
	
	return list;
}

function nuke(elem){
	elem.parentNode.removeChild(elem);
}

var list=get(document,"//*[@id='posts']/*");
for(var i in list){
	var elem=list[i];
	
	if(elem.id.match(/post_thanks_box/)){
		nuke(elem);
		continue;
	}
	
	var id				= get(elem,"div/div/label/span[2]/span/a")[0].name;
	var date			= get(elem,"div/div/label/span/span")[0].textContent;
	var link			= get(elem,"div/div/label/span[2]/span/a[2]")[0];
	var uri				= link.href;
	var num				= link.textContent;
	var name			= get(elem,"div/div[2]/div/div/div/a")[0].textContent;
	var content			= get(elem,"div[2]/div/div[contains(@class,'content')]")[0].innerHTML;
	var title			= get(elem,"div[2]/div/h2")[0];
	
	title=title?title.textContent+" ":"";	
	content=content.replace(/<img[^>]*\/smilies\/[^>]*>/g,"");

	elem.innerHTML=
		"<div id='"+id+"' class='postbody' style='padding: 0.4em 0.4em 0.4em 1em;'>"+
				"<h2 style='font-size: 1.15em; font-weight: bold; padding-bottom: 0.3em'>"+title+"</h2>"+
				"<a href='"+uri+"' style='font-weight: bold'>"+name+"</a> "+
				date+"<br />"+
				content+
		"</div>";
}

if(location.href.match(/#/)) location.href=location.href;



