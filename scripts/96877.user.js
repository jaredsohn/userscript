// ==UserScript==
// @name           KC image expander
// @namespace      Anonymous1337
// @description    Expand KC images
// @include        http://krautchan.net/*
// ==/UserScript==
var lnknode=document.getElementById('postform');
if(lnknode){
	addExpander(document);
	var link=document.createElement("a");
	link.innerHTML="I can has expand?";
	link.addEventListener('click',function (){
		var resultLinks=document.evaluate( "//img[substring(@id,1,9)='thumbnail']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
		for ( var i=0 ; i < resultLinks.snapshotLength; i++ )
		{
			var res=resultLinks.snapshotItem(i);
			res.src=flipLink(res.src);
			res.removeAttribute("width");
			res.removeAttribute("height");
		}
	},true);
	link.setAttribute("href","#");
	link.setAttribute("onclick","return false;");
	lnknode.appendChild(link);
}

function addExpander(thenode){
	var resultLinks=document.evaluate( "//img[substring(@id,1,9)='thumbnail']", thenode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
	for ( var i=0 ; i < resultLinks.snapshotLength; i++ )
	{
		var res=resultLinks.snapshotItem(i);
		res.addEventListener('click',
			function(e){
				this.src=flipLink(this.src);
				this.removeAttribute("width");
				this.removeAttribute("height");
				e.preventDefault();
			}
		,true);
	}
}


function flipLink(s){
	if(s.indexOf("thumbnails")>0){
		return s.replace("thumbnails","files");
	}
	return s.replace("files","thumbnails");
}
