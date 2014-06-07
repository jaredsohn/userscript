// ==UserScript==
// @name           DoubanPreviewer
// @namespace      http://wangii.life365.com
// @description    Show personal detail of one member
// @include        http://www.douban.com/*
// ==/UserScript==

/**
 * First crack on douban.com, to know people easier.
 * It's also my first greasemonkey code.
 *
 * Email: wang dot linan at gmail
 */

// Functions
function GM_XPathQuery(query,node,doc){
	return doc.evaluate(
		query, 
		node,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
}

function CallDocFromURL(url,callback){
	//
	// Based on greasemonkey official blog.
	// Changes
	// 1, Wrap it in a callback style, which is more flexible
	// 2, Change line:
	// 		iframe.contentWindow.location.href=location.href;
	// to:
	// 		iframe.contentWindow.location.href='about:blank';
	// so that it could avoid reload the current page a second time, save time and bandwidth :)
	//
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(details){
			// create an IFRAME to write the document into. the iframe must be added
			// to the document and rendered (eg display != none) to be property 
			// initialized.
			var iframe = document.createElement("IFRAME");
			iframe.style.visibility = "hidden";
			iframe.style.position = "absolute";
			iframe.style.width="1px";
			iframe.style.width="1px";
			document.body.appendChild(iframe);
			
			// give it 'about:blank' so that it will create a .contentDocument property.
			iframe.contentWindow.location.href ='about:blank';
			
			// write the received content into the document
			iframe.contentDocument.open("text/html");
			iframe.contentDocument.write(details.responseText);
			iframe.contentDocument.close();
			
			// wait for the DOM to be available, then do something with the document
			iframe.contentDocument.addEventListener("DOMContentLoaded", function(){
				callback(iframe.contentDocument);
				document.body.removeChild(iframe);
		  		}, false);
		}
	});
};

// Hookers
unsafeWindow.get_profile=function(url,img_id){
	var img=document.getElementById(img_id);
	var div=document.getElementById('__DIV_'+img.id);
	if(div!=null){
		div.style.visibilty='visible';
	}else{
		CallDocFromURL(url,function(doc){
			render_quickview(doc,img);
			});
	}	
};

unsafeWindow.remove_quickview=function(div_id){
	var div=document.getElementById(div_id);
	if(div!=null)
		div.style.visibility='hidden';
};

// Helper functions
function render_quickview(doc,img){
	var td=GM_XPathQuery("/html/body/form/table/tbody/tr/td[3]/table[1]/tbody/tr/td",doc,doc);
	var reads=GM_XPathQuery("/html/body/form/table/tbody/tr/td[1]/div[3]/a/img",doc,doc);
	GM_log(td.snapshotLength+':'+reads.snapshotLength);

	if(td.snapshotLength>0){
		
		// Add DIV
		var div=document.createElement('div');
		div.id='__DIV_'+img.id;
		div.style.cssText="position:absolute;z-index:100;border:1px dotted black;background-color:#d0d0ff;";
		document.body.appendChild(div);

		// Grab readed books
		var html='<ul style="border:1px solid #ffffd0;">';
		for(var i=0;i<reads.snapshotLength;i++){
			var item=reads.snapshotItem(i);
			html+='<li><a href="'+item.parentNode.href+'">'+item.title+'</a></li>';
		}
		html+='</ul>';
		var intro=td.snapshotItem(0);
		
		// Grab self introduce.
		div.innerHTML=intro.innerHTML+html+'<div style="text-align:right"><a href="javascript:remove_quickview(\''+div.id+'\')"><b>X</b></a>&nbsp;&nbsp;</div>';

		// Position
		if(img.x>450){
			div.style.right=(document.width-img.x-img.width-20)+'px';
		}else{
			div.style.left=img.x+'px';
		}
		div.style.top=img.y+'px;';
	}
}

// Change the page.
function modify_page(){
	var images=GM_XPathQuery("//a[starts-with(@href,'/people/')]/img[starts-with(@src,'/icon/')]",document,document);
	for(var i=0;i<images.snapshotLength;i++){
		var image=images.snapshotItem(i);
		var id='__IMG_'+i;
		image.id=id;
		var a=image.parentNode;
		var href=a.href;
		var node=document.createElement('div');
		node.style.cssText="text-align:center;border:1px solid blue;background-color:#d0d0ff;vertical-align:middle";
		node.innerHTML=a.parentNode.innerHTML+'<a href="javascript:get_profile(\''+a.href+'\',\''+id+'\')"><b>&gt;&gt;</b></a>';
		a.parentNode.replaceChild(node,a);
	}
}

modify_page();
