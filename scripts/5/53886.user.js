// ==UserScript==
// @name           smf-cleanup
// @namespace      http://userscripts.org/users/33432
// @include        http://forum.project-imas.com/index.php/topic*
// @description    Removes all unnecessary things from imas-project forum
// ==/UserScript==

var url="http://forum.project-imas.com/index.php";

function get(elem,str){
	var list=[];
	var i;
	var items=document.evaluate(str,elem,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for(var i=0;i<items.snapshotLength;i++) {
		list.push(items.snapshotItem(i));
	}
	
	return list;
}

function travel(elem){
	for(var i=1;i<arguments.length;i++){
		if(arguments[i]<0){
			var no=-arguments[i]-1;
			elem=elem.childNodes[no];
		} else{
			var no=arguments[i]+1,nn=0;
			while(no){
				if((!elem.childNodes[nn]) || elem.childNodes[nn].nodeType!=3)
					no--;
				nn++;
			}
			elem=elem.childNodes[nn-1];
		}

		if(!elem) return elem;
	}
	return elem;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
	".quote{"+
		"color:#404040;"+
		"font-style:normal;"+
		"letter-spacing:0;"+
		"word-spacing:0;"+
	"}"
);

var list=get(document,"/html/body/div/div[4]/form/table/tbody/tr/td/table/tbody/tr/td/table/tbody");
for(var i in list){
	var elem=list[i];

	var name		= travel(elem,0,0,0,0).textContent;
	var date		= travel(elem,0,1,0,0,0,1,1,-3).textContent.replace(/^\s*/,"").replace(/\s*»?\s*$/,"");
	var quotelink	= travel(elem,0,1,0,0,0,2,0).href;
	var sesc		= quotelink.match(/sesc=(.{32})/)[1];
	var postno		= quotelink.match(/quote=(\d+)/)[1];
	var threadno	= quotelink.match(/topic=(\d+\.\d+)/)[1];
	var ownpost		= travel(elem,0,1,0,0,0,2,1);
	var text		= travel(elem,0,1,2).innerHTML; 

	var no=1;
	var ee;
	var attachements="";
	while((ee=travel(elem,no))){
		var eee=travel(ee,0,0,0,0,0,1,0);
		if(eee && eee.id.match(/^link_/))
			attachements+=travel(ee,0,0,0,0,0).innerHTML;
		no++;
	}

	
	elem.innerHTML=
		"<tr><td>"+
			"<span style='float:right'>"+
				"[<a href='"+url+"?action=post;quote="+postno+";topic="+threadno+";sesc="+sesc+"'>reply</a>]"+
				(ownpost?"[<a href='"+url+"?action=post;msg="+postno+";topic="+threadno+";sesc="+sesc+"'>edit</a>]":"")+
				(ownpost?"[<a href='"+url+"?action=post;msg="+postno+";topic="+threadno+";sesc="+sesc+"'>delete</a>]":"")+
			"</span>"+	
			"<strong>"+name+"</strong> "+
			date+"<br />"+
			text+
			attachements+
		"</tr></td>";
}

