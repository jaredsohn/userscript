// ==UserScript==
// @name           Zooomr Photostream Enhanced
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Adds views, comments, faves counts in the photostream. Also allows you to fav photos without leaving the photostream (as was in MkII).
// @include        http://*.zooomr.com/photos/*/*
// @include        http://*.zooomr.com/photos/*/page*/
// ==/UserScript==

(function() {

var ZAPI = unsafeWindow.ZAPI;
var json_parse = unsafeWindow.json_parse;
var global_nsid = unsafeWindow.global_nsid;

unsafeWindow.toggleFave = function(pid) {
	var ele = document.getElementById('faver_' + pid);
	if (ele.getAttribute('isfavorite') == 1) {
		ZAPI.callMethodJSON( 'zooomr.favorites.remove', {photo_id:pid} , {});
		ele.firstChild.src = 'http://assets2.zooomr.com/images/silk/heart_open.png';
		ele.setAttribute('isfavorite', 0);
	} else {
		ZAPI.callMethodJSON( 'zooomr.favorites.add', {photo_id:pid} , {});
		ele.firstChild.src = 'http://assets2.zooomr.com/images/silk/heart.png';
		ele.setAttribute('isfavorite', 1);
	}
}

var success = function(t) {
		var data = json_parse(t.responseText);		
		var divDetailBit = document.getElementById('photoprivacy_' + data.photo.id).parentNode.parentNode;
		var divMetaPlus = divDetailBit.appendChild(document.createElement('div'));
		divMetaPlus.innerHTML = data.photo.views + ((data.photo.views == 1) ? ' view' : ' views')
			+ ' / ' 
			+ ((data.photo.faves._content == 0) ? ''  : '<a style="text-decoration: none" href="'+ data.photo.urls.url[0]._content +'faves/">') 
			+ data.photo.faves._content 
			+ ((data.photo.faves._content == 1) ? ' fave'  : ' faves')
			+ ((data.photo.faves._content == 0) ? ''  : '</a>') 
			+ ' / ' 
			+ data.photo.comments._content + ((data.photo.comments._content == 1) ? ' comment'   : ' comments' )
			
		if (data.photo.owner.nsid != global_nsid) {
		
			var extraspace = document.evaluate('div/div/div[@class="ImagePitBox"]'
				, divDetailBit
				, null
				, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
				, null);
			
			var faver = extraspace.snapshotItem(0).appendChild(document.createElement('a'));
			faver.setAttribute('class','iconlink');
			faver.id = 'faver_' + data.photo.id;
			faver.setAttribute('pid', data.photo.id);
			faver.setAttribute('isfavorite', data.photo.isfavorite);
			faver.href = "javascript: toggleFave(" + data.photo.id + ");";
			
			var favIcon = faver.appendChild(document.createElement('img'));
			if (data.photo.isfavorite) {
				favIcon.src = 'http://assets0.zooomr.com/images/silk/heart.png';
			} else {
				favIcon.src = 'http://assets0.zooomr.com/images/silk/heart_open.png';
			}
		}
}



doMain =  function() {
	var detailBits = document.evaluate(
		'//div[@class="DetailBit"]'
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		, null);
	
	if (detailBits && detailBits.snapshotLength > 0) {		
		for (var i = 0; i < detailBits.snapshotLength; i++) {
			pid = detailBits.snapshotItem(i).getElementsByTagName('p')[0].id.substring(10);
			ZAPI.callMethodJSON( 'zooomr.photos.getInfo', {'photo_id' : pid} , {onSuccess: success } );
		}
	}
}

unsafeWindow.setTimeout(doMain, 1);

})();