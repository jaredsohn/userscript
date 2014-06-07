// ==UserScript==
// @name           DoubanQuickDoumail
// @namespace      
// @description    Quick Doumail
// @include        http://www.douban.com/*
// ==/UserScript==

// Functions
function GM_XPathQuery(query,node,doc){
	return doc.evaluate(
		query, 
		node,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
}

// Hookers
unsafeWindow.get_profile=function(uname,img_id){
	var img=document.getElementById(img_id);
	var div=document.getElementById('__DIV_'+img.id);
	if(div!=null){
		div.style.visibility='visible';
	}else{
	  GM_xmlhttpRequest({
  		method: "GET",
  		url: 'http://www.douban.com/doumail/write?to='+uname,
  		onload: function(details){
  			// create an IFRAME to write the document into. the iframe must be added
  			// to the document and rendered (eg display != none) to be property 
  			// initialized.
  			var iframe = document.createElement("IFRAME");
  			iframe.style.visibility = "hidden";
  			iframe.style.position = "absolute";
  			document.body.appendChild(iframe);
  			
  			// give it 'about:blank' so that it will create a .contentDocument property.
  			iframe.contentWindow.location.href ='about:blank';
  			
  			// write the received content into the document
  			iframe.contentDocument.open("text/html");
  			iframe.contentDocument.write(details.responseText);
  			iframe.contentDocument.close();
  			
  			// wait for the DOM to be available, then do something with the document
  			iframe.contentDocument.addEventListener("DOMContentLoaded", function(){
  				var doc = iframe.contentDocument;
  				var uid = GM_XPathQuery('//input[@name="to"]', doc, doc).snapshotItem(0).value;	
  				render_sendmaildiv(uid, img);
  				document.body.removeChild(iframe);
  		  		}, false);
  		}
  	});
	}	
};

unsafeWindow.remove_quickview=function(div_id){
	var div=document.getElementById(div_id);
	if(div!=null)
		div.style.visibility='hidden';
};

// Helper functions
function render_sendmaildiv(uid, img){
		var div=document.createElement('div');
		div.id='__DIV_'+img.id;
		div.style.cssText="position:absolute;z-index:100;border:1px dotted black;background-color:#d0d0ff;";
		document.body.appendChild(div);
		
		div.innerHTML='<div style="text-align:right"><a href="javascript:remove_quickview(\''+div.id+'\')"><b>X</b></a>&nbsp;&nbsp;</div>';
		var title = document.createElement('input');
		div.appendChild(title);
		div.appendChild(document.createElement('br'));
		var text = document.createElement('textarea');
		div.appendChild(text);
		div.appendChild(document.createElement('br'));
		var submit = document.createElement('input');
		submit.type='submit';
		submit.value=decodeURI('%E5%AF%84%E5%87%BA%E5%8E%BB');
		div.appendChild(submit);
		div.appendChild(document.createElement('br'));
		var tn = document.createTextNode(decodeURI('%E5%B7%B2%E5%AF%84%E5%87%BA0%E5%B0%81%E8%B1%86%E9%82%AE'));
		tn.count = 0;
		div.appendChild(tn);
		submit.addEventListener('click', function () {
		  var tovalue = uid;
		  var titlevalue = title.value;
		  var textvalue = text.value;
		  var submitvalue = '%E5%A5%BD%E4%BA%86%EF%BC%8C%E5%AF%84%E5%87%BA%E5%8E%BB';
		  var pars = 'to='+tovalue+'&m_title='+titlevalue+'&m_text='+textvalue+'&m_submit='+submitvalue;
		  GM_xmlhttpRequest({
    		method: "POST",
    		headers: {'Content-Type':'application/x-www-form-urlencoded'},
    		data: pars,
    		url: 'http://www.douban.com/doumail/write',
    		onload:function (responseDetails){
    		  if (responseDetails.status == 200) {
    		    ++tn.count;
    		    tn.textContent = decodeURI('%E5%B7%B2%E5%AF%84%E5%87%BA')+tn.count+decodeURI('%E5%B0%81%E8%B1%86%E9%82%AE');
    		  }
    		}
    	});
		}, true);

		// Position
		if(img.x>450){
			div.style.right=(document.width-img.x-img.width-20)+'px';
		}else{
			div.style.left=img.x+'px';
		}
		div.style.top=img.y+'px;';
}

// Change the page.
function modify_page(){
	var images=GM_XPathQuery("//a[starts-with(@href,'/people/')]/img[starts-with(@src,'/icon/')]",document,document);
	for(var i=0;i<images.snapshotLength;i++){
		var image=images.snapshotItem(i);
		image.id='__IMG_'+i;
		var a=image.parentNode;
		var tmp = a.href.split('/');
	  var uname = tmp[tmp.length-2]; 
		a.href="javascript:get_profile('"+uname+"','"+image.id+"');";
	}
}

modify_page();
