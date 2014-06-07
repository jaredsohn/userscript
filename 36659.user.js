// ==UserScript==
// @name           Gandul.info comment spam filter
// @namespace      http://userscripts.org/users/71720
// @include        http://*.gandul.info/*
// ==/UserScript==

(function(){
	
	var Ob = {
	subtext : function (div){
		var ret="";
		if(div.nodeValue!=null && div.nodeValue!=undefined){
			ret = div.nodeValue;
		}
		if(div.childNodes!=undefined && div.childNodes!=null && div.childNodes.length>0){
			//GM_log("children:"+div.nodeName+" "+div.childNodes.length+" ret:"+ret);
			for(var i=0;i<div.childNodes.length;i++){
				//GM_log("ret "+ret);
				ret = ret + Ob.subtext(div.childNodes[i]);
			}
		}
		return ret;
	},

	afterLoad: function () {
		var divs = document.getElementsByTagName('div');
		var formz = document.getElementsByTagName('form');
	
		GM_log("Found "+divs.length+" items");
		
		var count = 0;
		var toRemove = new Array();
		
		for(var i=0;i<formz.length;i++){
			var f = formz[i];
			
			if("newsletter"==f.getAttribute("name")){
				toRemove.push(f);
			}
		}
    
		for(var i=0;i<divs.length;i++){
			var div = divs[i];
	
			//GM_log(div.getAttribute("class")+" "  + ("user_comments_white"==div.getAttribute("class")) );
			if("mdcCC"==div.getAttribute("id")){
				toRemove.push(div);
			}
			
			if("user_comments_white"==div.getAttribute("class") || "user_comments_gray"==div.getAttribute("class")){
				var text = Ob.subtext(div);
				//GM_log("Text is :"+text);
				if(/intrebi\.ro/.test(text)
				|| /doamna cu pensiile/.test(text)
				|| /comenzipc\.ro/.test(text)
				|| /khris\.ro/.test(text)
				|| /politicienii\.ro/.test(text) 
				|| /sondaje\.php0h\.com/.test(text)
				|| /0722344841/.test(text)
				|| /pariorul-sportiv\.com/.test(text)
				|| /e adevarat nea primare ca intarzii extinderea de pug/.test(text)
				|| /miculpret\.ro/.test(text)
				|| /levent feizi/.test(text)
				|| /leventit/.test(text)
				|| /anunturigratuitepro\.com/.test(text)
				){				
					toRemove.push(div);
					count++;
				}
			}
			
		}
		
		var foundComments = null, foundCommentsNode;
		var foundCommentsParent = null;
		//<p class="box_brief_title" style="background: none; margin: 0 0 20px 0;">NN COMENTARII <span class="box_brief_title_gray">CITITORI</span></p>
		var comments = document.evaluate("//p[@class='box_brief_title']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	    var para, i;
	    for(para = null, i = 0; (para = comments.snapshotItem(i)); i++) {
	    	var text = Ob.subtext(para);
	    	if(/COMENTARII CITITORI/.test(text)){
	    		foundCommentsNode = para;
	    		foundComments = text.split(" ")[0];
	    		foundCommentsParent = para.parentNode;
	    	}
	    	GM_log("Para text:"+text);
	    }
		
		for(var i=0;i<toRemove.length;i++){
			toRemove[i].parentNode.removeChild(toRemove[i]);
		}
		
		if(foundComments!=null && count > 0){
			var div = document.createElement('div');
	    	var s = '<p class="box_brief_title" style="background: none; margin: 0 0 20px 0;"><!--<strike>-->'+foundComments+'<!--</strike>--> COMENTARII <span class="box_brief_title_gray">CITITORI</span> ('+count+' comentarii spam sterse automat)</p>';
	    	div.innerHTML = s;

			foundCommentsParent.replaceChild(div, foundCommentsNode);
		}
		
		
		
		if(count > 0){
			GM_log("Removed "+count+" items");
		}
		
	}
	};

	window.addEventListener('load',function(){Ob.afterLoad()},true);

})();
