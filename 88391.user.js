// ==UserScript==
// @name           Castle Age - Accept all gift
// @namespace      AngusCA
// @description    Accept all ca gift
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http*://apps.facebook.com/castle_age/*
// @include        http://www.ang.post/*
// @version        0.8
// ==/UserScript==

var xpath = 
{
	string : XPathResult.STRING_TYPE,
	unordered: XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	first : XPathResult.FIRST_ORDERED_NODE_TYPE
};

var nHtml =
{
	FindByAttrContains:function(obj,tag,attr,className) {
		if(attr=="className") { attr="class"; }
		className=className.toLowerCase();
		var q=document.evaluate(".//"+tag+
			"[contains(translate(@"+attr+",'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"+className+
			"')]",obj,null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
		return null;
	},
	FindByAttrXPath:function(obj,tag,className) {
		var q=null;
		try {
			var xpath=".//"+tag+"["+className+"]";
			if(obj==null) {
				GM_log('Trying to find xpath with null obj:'+xpath);
				return null;
			}
			q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		} catch(err) {
			GM_log("XPath Failed:"+xpath+","+err);
		}
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
		return null;
	},
	FindByAttr:function(obj,tag,attr,className) {
		if(className.exec==undefined) {
			if(attr=="className") { attr="class"; }
			var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
			if(q && q.singleNodeValue) { return q.singleNodeValue; }
			return null;
		}
		var divs=obj.getElementsByTagName(tag);
		for(var d=0; d<divs.length; d++) {
			var div=divs[d];
			if(className.exec!=undefined) {
				if(className.exec(div[attr])) {
					return div;
				}
			} else if(div[attr]==className) {
				return div;
			}
		}
		return null;
	},
	FindByClassName:function(obj,tag,className) {
		return this.FindByAttr(obj,tag,"className",className);
	},
	spaceTags:{'td':1,'br':1,'hr':1,'span':1,'table':1
	},
	GetText:function(obj) {
		var txt=' ';
		if(obj.tagName!=undefined && this.spaceTags[obj.tagName.toLowerCase()]) {
			txt+=" ";
		}
		if(obj.nodeName=="#text") { return txt+obj.textContent; }
		for(var o=0; o<obj.childNodes.length; o++) {
			var child=obj.childNodes[o];
			txt+=this.GetText(child);
		}
		return txt;
	},
	
	htmlRe:new RegExp('<[^>]+>','g'),
	StripHtml:function(html) {
		return html.replace(this.htmlRe,'').replace(/&nbsp;/g,'');
	},
	
	timeouts:{},
	setTimeout:function(func,millis) {
		var t=window.setTimeout(function() {
			func();
			nHtml.timeouts[t]=undefined;
		},millis);
		this.timeouts[t]=1;
	},
	clearTimeouts:function() {
		for(var t in this.timeouts) {
			window.clearTimeout(t);
		}
		this.timeouts={};
	},
	getX:function(path,parent,type) {
		switch (type) {
			case xpath.string : return document.evaluate(path,parent,null,type,null).stringValue;
			case xpath.first : return document.evaluate(path,parent,null,type,null).singleNodeValue;
			case xpath.unordered : return document.evaluate(path,parent,null,type,null);
			default :
		}
	},
	getHTMLPredicate:function(HTML){
		for (var x = HTML.length; x > 1; x--) {
			if (HTML.substr(x,1) == '/') {
				return HTML.substr(x + 1);
			}
		}
		return HTML
	},
	
	OpenInIFrame:function(url, key) {
		//if(!iframe = document.getElementById(key))
		iframe = document.createElement("iframe");
		//GM_log ("Navigating iframe to " + url);
		iframe.setAttribute("src", url);
		iframe.setAttribute("id", key);
		iframe.setAttribute("style","width:0;height:0;");
		document.body.insertBefore(iframe, document.body.firstChild);
	},
	
	ResetIFrame:function(key) {
		if(iframe = document.getElementById(key)){
			gm.log("Deleting iframe = "+key);
			iframe.parentNode.removeChild(iframe);
		}else gm.log("Frame not found = "+key);
		if(document.getElementById(key))gm.log("Found iframe");
	}
};

gm = {
	procName:"AngusFbAutoSwitch",
	gameName:'castle_age',
	
	log:function(mess) {
		//GM_log('v'+thisVersion + ': ' +mess);
		GM_log(mess);
	},
	
	debug:function(mess) {
		if(debug) { gm.log("[Debug]"+mess); }
	},

	setValue:function(n,v) {
		//gm.debug('Set ' + n + ' to ' + v);
		GM_setValue(gm.procName+"__"+n,v);
		return v;
	},
	
	getValue:function(n,v) {
		//gm.debug('Get ' +n + ' value ' + GM_getValue(gm.procName+"__"+n,v));
		return GM_getValue(gm.procName+"__"+n,v);
	},
	
	deleteValue:function(n) {
		//gm.debug('Delete ' +n + ' value ');
		return GM_deleteValue(gm.procName+"__"+n);
	},
	
	getObjVal:function(objName,label,defaultValue) {
		objStr = gm.getValue(objName);
		if (!objStr) return defaultValue;
		if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) return defaultValue;
		return itemStr.split(ls)[1];
	},
	
	getCAAPValue:function(n,v) {
		//gm.debug('Get ' +n + ' value ' + GM_getValue(gm.procName+"__"+n,v));
		return GM_getValue(gm.gameName+"__"+n,v);
	},
	
	setCAAPValue:function(n,v) {
		//gm.debug('Set ' + n + ' to ' + v);
		GM_setValue(gm.gameName+"__"+n,v);
		return v;
	},	
};

GiftHelper = {
	recv_timeout_count:0,
	
	CheckForImage:function(image, webSlice) 
	{
			if (!webSlice)
				webSlice = document.body;
	
			if (imageSlice = nHtml.FindByAttrContains(webSlice,'input','src',image))
				return imageSlice;
			if (imageSlice = nHtml.FindByAttrContains(webSlice,'img','src',image))
				return imageSlice;
			if (imageSlice = nHtml.FindByAttrContains(webSlice,'div','style',image))
				return imageSlice;
		
			return false;
	},

	RecvAllGift:function()
	{
		//gm.log("recv_timeout_count="+recv_timeout_count);
		if ( !GiftHelper.CheckForImage('invite_on.gif') ) {
			gm.log("Go to invate page");
			gm.setValue("TransCompleted", 0);
			document.location.href = 'http://apps.facebook.com/castle_age/army.php';
			return;
		}
		
		if ( gm.getValue("TransCompleted", 0) == 0 ) { 
			GiftHelper.recv_timeout_count++;
			if ( GiftHelper.recv_timeout_count > 20 ) {
				alert("Recv All Timeout!");
				return;
			}
			
			setTimeout(GiftHelper.RecvAllGift, 500);
			return;
		}
	
		var ss = document.evaluate(".//a[contains(@href,'http://apps.facebook.com/castle_age/gift_accept.php?act=acpt&rqtp=gift&uid=')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var s = 0; s < ss.snapshotLength ; s++) {
			var recv_url = ss.snapshotItem(s).href;	
			gm.log("Run recv url [" + recv_url + "]");
			gm.setValue("TransCompleted", 0);
			document.location.href = recv_url;
			return;
		}	
		
		gm.setValue("RecvAllGift", 0);	
		alert("Recv All Completed");				
	},
	
	CheckGiftPage:function() 
	{
		if ( !GiftHelper.CheckForImage('invite_on.gif') ) {
			gm.log("No at Gift Page");
			return;
		}	
		
		var ss = document.evaluate(".//a[contains(@href,'http://www.facebook.com/reqs.php#confirm_46755028429_0')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var s = 0; s < ss.snapshotLength ; s++) {
			var item = ss.snapshotItem(s).parentNode.parentNode;//parentNode.parentNode.parentNode;
			if ( !item )
			continue;
					
			var profile = nHtml.FindByAttrContains(item,'a','href','http://www.facebook.com/profile.php?id=').href;
			if ( !profile )
				continue;
					
			var uid = profile.replace('http://www.facebook.com/profile.php?id=','');
			if ( !uid )
				continue;
				
			ss.snapshotItem(s).href = 'http://apps.facebook.com/castle_age/gift_accept.php?act=acpt&rqtp=gift&uid=' + uid;
			//gm.log("Accept gift from uid=" + uid);
			//document.location.href = 'http://apps.facebook.com/castle_age/gift_accept.php?act=acpt&rqtp=gift&uid=' + uid;
			//break;
		}	
		
		ss = document.evaluate(".//a[contains(@href,'')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var s = 0; s < ss.snapshotLength ; s++) {
			var txt = nHtml.GetText(ss.snapshotItem(s));
			if ( !txt )
				continue;
			txt = txt.replace(' ', '');
			//gm.log("["+txt+"]");
			if ( txt.indexOf('Accept All') == 1 ) {
				var recvListener = 	function(e) 
														{ 
															gm.setValue("RecvAllGift", 1);
															setTimeout(GiftHelper.RecvAllGift, 0); 
														};		
				
				var recvAll = document.createElement('a');
				recvAll.innerHTML = '| Recv All';
				recvAll.addEventListener('click', recvListener, false);
				ss.snapshotItem(s).parentNode.appendChild(recvAll);						
				break;
			}
		}
			
		gm.setValue("TransCompleted", 1);
	},
	
	Main:function() 
	{
		if ( document.location.href.indexOf('apps.facebook.com/castle_age/gift.php&angpost=') >= 0 ) {
				var para = document.location.href.substring(document.location.href.indexOf('apps.facebook.com/castle_age/gift.php&angpost='));
				para = para.replace('apps.facebook.com/castle_age/gift.php&angpost=', '');
				var cur_link = 'http://apps.facebook.com/castle_age/gift_accept.php?act=create&gift=' + para;
				var uid_idx = cur_link.indexOf('ids=');
				var gift_link = cur_link.substring(0, uid_idx-1); 
				var gift_idx = cur_link.substring(uid_idx-2, uid_idx-1);
				var uid = cur_link.substring(uid_idx+4);
				
				//alert(cur_link);
				//alert(gift_link);
				//alert(gift_idx);
				//alert(uid);
				$.post(gift_link, {'ids[]': uid}, function() {
					alert("Send CA Gift index[" + gift_idx + "] to user[" + uid + "] completed");
      	});
      	
				return;
		}

		var post_url = 'www.ang.post/';
		if ( document.location.href.indexOf(post_url) >= 0 ) {
			var cur_link = document.location.href.substring(document.location.href.indexOf(post_url));
			cur_link = cur_link.replace(post_url, '');
			
			if ( cur_link.indexOf('ca_gift=') == 0 ) {
				var gift_idx_start = 8;
				var gift_idx_end = cur_link.indexOf('?id=');
				var gift_idx = cur_link.substring(gift_idx_start, gift_idx_end);
				var uid = cur_link.substring(gift_idx_end+4);
				//alert('gift_idx=' + gift_idx + ", uid=" + uid);
				document.location.href = 'http://apps.facebook.com/castle_age/gift.php&angpost=' + gift_idx + '&ids=' + uid;
			} else {
				alert("Link Error");
			}
			
			return;
		}
		
		if ( document.location.href.indexOf('apps.facebook.com/castle_age/army.php') >= 0 )
			GiftHelper.CheckGiftPage();
			
		if ( gm.getValue("RecvAllGift", 0) )	
			setTimeout(GiftHelper.RecvAllGift, 500);
	}
};

/////////////////////////////////////////////////////////////////////////////////////////
// Entry Point
/////////////////////////////////////////////////////////////////////////////////////////
var globalContainer = document.querySelector('#app46755028429_globalContainer')
var clickUrl        = window.location.href;

if ( globalContainer ) {
	globalContainer.addEventListener('click', function(event) {
	    var obj = event.target;
	    while(obj && !obj.href)
		    obj = obj.parentNode;
	
	    if(obj && obj.href) {
				clickUrl = obj.href;
				//GM_log("clickUrl: " + clickUrl);
				
				if ( clickUrl.indexOf('apps.facebook.com/castle_age/army.php') >= 0 ) {
					document.location.href = 'http://apps.facebook.com/castle_age/army.php';
				}
	    }
	}, true);
}

$(document).ready(function() {
    GiftHelper.Main();
});
