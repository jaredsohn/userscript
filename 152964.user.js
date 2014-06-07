// ==UserScript==
// @name          FB Unsubscribe
// @version       0.1.0.1
// @description   Unsubscribe many people in Facebook instantly!
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

var t=document.querySelectorAll('.profileFollowButton');
if(t.length>0){
	var w=unsafeWindow; w.g={}; g=w.g;
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
	w.unSubscribe = function(){
		if(!g.tUrl){
			g.tUrl=[];
			var t=document.querySelectorAll('.unSubCkb:checked');
			g.fb_dtsg=document.querySelector('[name="fb_dtsg"]').value;
			g.__user=document.querySelector('[id^="profile_pic_header_"]').id.slice(19);
			for(var i=0;i<t.length;i++){
				var id=t[i].dataset.id;
				f='profile_id='+id+'&location=4&fb_dtsg='+g.fb_dtsg+'&__user='+g.__user+'&__a=1';
				g.tUrl[i]=f;
			}
		}
		var t=g.tUrl;
		if(t[0]){t=t[0];g.tUrl.shift();
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/ajax/follow/unfollow_profile.php', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("Connection", "close");
		xhr.onreadystatechange = function(e) {
			if (this.readyState == 4 && this.status == 200) {
				w.unSubscribe();
			}
		};
		xhr.send(f);
		}else{location.reload();}
	}
	var k=document.createElement('div');
	k.id='unSub';k.innerHTML='<a class="uiButton" role="button" onClick="unSubInit();"><span class="uiButtonText">FB Unsubscribe</span></a>';
	var t=document.querySelector('.fbProfileBrowserList');
	t.insertBefore(k,t.firstChild);
}