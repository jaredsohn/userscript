// GSPB Images
// Version 1.01
// Copyright (c)2007 by Ivo Wetzel aka DarkCraft

// ==UserScript==
// @name			GSPB Images
// @namespace		http://www.darkcraft.net/images
// @description		Zeigt Bilder im GSPB an.
// @include			http://*gamestar.de/community/gspinboard/show*
// @include			http://*gamestar.de/community/gspinboard/private.php*
// ==/UserScript==

var Images={
	window : this.opera ? window : unsafeWindow,
	names : true,
	size : 700,
	max : 1600,
	
	Init : function(){
		var url=document.location.href.split('?')[0];
		if(url.match(/show.*\.php$|private\.php$/))this.Thread();
	},

	Thread : function(){
		var links=this.XPath("//div[starts-with(@id,'post_message_')]/a",this.Get('posts'));
		var length=links.snapshotLength;
		for(var i=0;i<length;i++){
			var link=links.snapshotItem(i);
			var img=link.textContent;
			if((img.substr(0,7)=='http://' || this.names==true) && (link.href.match(/\.jpg$|\.png$|\.gif$|\.bmp$|\.php$/) || link.href.indexOf('imgshack')!=-1)){
				var img=document.createElement('img');
				var div=document.createElement('div');
				img.src=link.href;
				div.appendChild(img);
				link.parentNode.insertBefore(div,link.nextSibling);
				this.Preview(img);
			}
		}
	},
	
	Show : function(img){
		img.setAttribute('style','max-width:'+this.max+'px;cursor:pointer');
		img.setAttribute('onclick','Images.Preview(this);')
	},
	
	Preview : function(img){
		img.setAttribute('style','max-width:'+this.size+'px;max-height:'+this.size+'px;cursor:pointer');
		img.setAttribute('onclick','Images.Show(this);')
	},

	XPath : function(exp,node){return document.evaluate(exp,(node ? node : document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);},
	Get : function(id){return document.getElementById(id);}
}
Images.Init();
unsafeWindow.Images=Images;