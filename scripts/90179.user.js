// ==UserScript==
// @name           12 bay forums cleanup
// @namespace      http://userscripts.org/users/33432
// @include        http://www.bay12forums.com/smf/index.php?topic=*
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


var list=get(document,"//*[@id='forumposts']/form/*");
for(var i in list){
	var elem=list[i];
	
	var name			= get(elem,"div/div/h4")[0].innerHTML;
 	var date			= get(elem,"div/div[2]/div/div/div[2]")[0].innerHTML;
	var content			= get(elem,"div/div[2]/div[2]/div")[0].innerHTML;
	
	elem.className='';
	
	elem.innerHTML=
		"<div style='padding: 0.4em 0.4em 0.4em 1em; display: inline-block'><div class='clearfix windowbg largepadding' style=''>"+
				"<h4 style='padding-bottom: 0.4em'>"+name+" "+date+"</h4>"+
				content+
		"</div></div>";
}

nuke(get(document,"/html/body/div/div[3]/div[2]/h3/span")[0]);
get(document,"//*[@id='forumposts']")[0].className='';
