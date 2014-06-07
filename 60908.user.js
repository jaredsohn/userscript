// ==UserScript==
// @name           SBM Counter - Link to Bookmarker
// @namespace      http://profile.livedoor.com/ronekko/
// @description    SBMカウンタのユーザ名にリンクを付加する
// @include        http://*
// ==/UserScript==

var init = function(){
	var sbms = [{name : 'hatebu', site : 'http://b.hatena.ne.jp/'},
				{name : 'delicious', site : 'http://delicious.com/'},
				{name : 'ldclip', site : 'http://clip.livedoor.com/clips/'},
				{name : 'pookmark', site : 'http://pookmark.jp/user/'},
				{name : 'buzzurl', site : 'http://buzzurl.jp/user/'},
				{name : 'nifty', site : 'http://clip.nifty.com/users/'},
				];
	var smbCounterComments;
	var smbCounterCommentsArea;
	var userId;
	var link;
	var div;
	var site;
	var subDir;
	var comments;
	
	GM_addStyle('#SBMCounterCommentsArea a:link{ color:#FFFFFF;}');
	GM_addStyle('#SBMCounterCommentsArea a:visited{ color:#DD00DD;}');
	GM_addStyle('#SBMCounterCommentsArea a:hover{ background:#000000;}');
	
	smbCounterComments = document.getElementById('SBMCounterComments');	
	smbCounterCommentsArea = document.getElementById('SBMCounterCommentsArea');
	smbCounterComments.addEventListener('mouseover',function(event){
		if(event.explicitOriginalTarget.id != 'SBMCounterComments'){ return; }
		if(smbCounterCommentsArea.getElementsByTagName('a').length != 0){ return; }
		for(var i=0; i<sbms.length; i++){
			div = smbCounterCommentsArea.getElementsByClassName(sbms[i].name)[0];
			site = sbms[i].site;
			subDir = sbms[i].name == 'buzzurl' ? '/all' : '';
			comments = div.childNodes;
			for(var j=0, len=comments.length; j<len; j++){
				userId = comments[j].childNodes[0].firstChild;
				link = document.createElement('a');
				link.href = site + userId.textContent + subDir;
				link.target = '_blank';
				userId.parentNode.insertBefore(link, userId);
				link.appendChild(userId);
			}
		}
	}, false);
}

var ovserve = function(event){
	var time = 0;
	const INTERVAL = 600;
	const TIMEOUT = 3000;
	
	document.removeEventListener('mouseover', ovserve, true);
	setTimeout(function wait(){
		var ready = document.getElementById('SBMCounterComments');
		if(ready){
			init();
		}else{
			time += INTERVAL;
			if(time <= TIMEOUT){
				setTimeout(wait, INTERVAL);
			}
		}
	}, INTERVAL);
}

document.addEventListener('mouseover', ovserve, true);