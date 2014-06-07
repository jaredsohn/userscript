// ==UserScript==
// @name           WeBop Thanks button
// @namespace      http://webop.me/727747325
// @description    Let's you quickly thank uploaders for a torrent.
// @include        http://webop.me/torrents/*
// @include        http://webop.me/profile/edit
// @version        1.0
// ==/UserScript==

var frm=document.getElementById('userform');
var thanksImg='<img src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVDjLlZNBaxNREMcTtTkonvwAHkQP4kHBj2LBngPiqRUPgpdiDYKlLYVKBRUU2psXQwNBCrVtaowbEjasocuGDRt2l112fUs2pFLroT8Pb22MNdAe5vDezP83M2/mpYDUkalxBjV6gG6B5i0P+UbY8IXmXaJpW8Q90M2fqM7M6QCquIAWvMX3Ie6BZvapuhMnB0AKJbrNbusXURdCAYqpsunfOAkgDZyjs3+RmjOD68gqbBvK1ms2vPOjAWpwhbo/zTdPYdf5jmbtIXrQjaUZFpT1A7b0CT546eOAuvMJz4E4hv4e9PpSGMUQdUFEYDug6pA3pijo18k3rw4AmhkQ92Sw1YFaTfYvEnEoIAglpNGAYl2jUFUGgM3GZ/JrUCqB0QLXk7AwgiAR+wF4vvSZbXi3ygCwYY5Tb8jSo64M6MYS4IfgBeAmYtuVlSy9/AuwLjLsKAdslaBchlYr6V0kWX1wEnHHAcuGuSWGx1isrlOucDT/UMj+PR+cJGvHlm/UtuD5wj+A9941KgoUP0KlIkUiktn/iNsdaLWhqcPj+R/DgBX3DCuNOxQKYBhSHAgJMkz4osDs4iG5WcjmYu7mrOOr/MpIM1+/xdzaNm9WD3mxDNNP4OGjfe5PfeXeZI7s5E3Gn46RXRj7/1+QK30WyPBs8XJyHvmZfgPxTEl50XYktwAAAABJRU5ErkJggg==" width="16" height="16" style="vertical-align:text-bottom;" alt="" />';
var cctrl=document.getElementById('commentcontrols');

if(frm){
	var tbl=frm.querySelector('table');
	var newRow=tbl.insertRow(tbl.rows.length-1);
	newRow.className='tablerow2';

	var cell1=document.createElement('th');
	cell1.innerHTML='<label for="thanks">Thanks template</label>';
	newRow.appendChild(cell1);

	var cell2=newRow.insertCell(-1);
	if(window.localStorage!==null){
		var thanksInput=document.createElement('input');
		thanksInput.id='thanks';
		thanksInput.type='text';
		thanksInput.style.width='99%';
		if( localStorage.getItem('webopThanks')!=null){
			thanksInput.value=localStorage.getItem('webopThanks');
		}
		cell2.appendChild(thanksInput);

		frm.addEventListener('submit',function(ev){
			if(thanksInput.value.replace(/\s/g,'')!=''){
				localStorage.setItem('webopThanks',thanksInput.value);
			}
		},false);
		var cell3=newRow.insertCell(-1);
		cell3.innerHTML='<p>BBCode enabled</p>';
	} else {
		cell2.appendChild(document.createTextNode("Unfortunately your browser doesn't seem to support the Storage API."));
	}
}

function getUrlParams(uri) {
	var map = {};
	var regexp=/[?&]+([^=&]+)=([^&]*)/gi;
	var parts = uri.replace(regexp, function(m,key,value) {
		map[key] = value;
	});
	return map;
}

function sayThanks(ev){
	var xhr=new XMLHttpRequest(), global=window;
	if(unsafeWindow) global =unsafeWindow;
	var userText=encodeURIComponent(localStorage.getItem('webopThanks')).replace("%20","+");
	var sendParams=global.php.csrf_token+'='+global.get_csrf()+'&format=bbcode&parentid=0&body='+userText;
	var uri='http://webop.me/ajax/newTorrentComment/'+global.php.torrentid;
	xhr.open("POST",uri,true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.onreadystatechange=function() {
		if (xhr.readyState==4 && xhr.status==200) {
			thanksEl.removeEventListener('click',sayThanks,false);
			thanksEl.innerHTML=thanksImg+" Successfully submitted";
			thanksEl.removeAttribute('style');
			window.location.href+='?#commentcontrols'; // reload
		}
	}
	xhr.send(sendParams);
	return uri;
}

function addStyles(){
	var head, styleEl, cssStr;
	head = document.getElementsByTagName('head')[0];
	styleEl= document.createElement('style');
	styleEl.id='thanks727747325';
	styleEl.setAttribute('type','text/css');
	cssStr= '#frame, div.post div.body { border-bottom:0; }'
				+'#saythanks { cursor:pointer; color:DodgerBlue; line-height:23px; }'
				+'#saythanks:hover { color:#FFD700; }'
				+'.menubox.thanks .info { margin-bottom:0; color:#999; text-align:right; }'
				+'.menubox.thanks .info q { float:left; color:#000; }';
	styleEl.appendChild(document.createTextNode(cssStr));
	head.appendChild(styleEl);
}

// add comment button
if(cctrl && localStorage.getItem('webopThanks')!=null){
	var userHref=document.querySelector('#usercontrolbox a[href*="users"]').href.substring(22);
	var userLinks=document.querySelectorAll('#torrentcomments a[href$="'+userHref+'"]').length;
	if(userLinks<1){
		var thanksEl=document.createElement('p');
		thanksEl.id='saythanks';
		thanksEl.innerHTML=thanksImg+' Say thanks';
		thanksEl.addEventListener('click',sayThanks,false);
		cctrl.appendChild(thanksEl);
	}
}

// collapse posts
var posts=document.querySelectorAll(".post");
var trimws=/^\s+|\s+$/;
if(posts.length>0){
	var wrap=document.getElementById('drawcontent');
	var msgs=document.createElement('div');
	msgs.className='menubox thanks';
	for(var ii=0; posts[ii]; ii++){
		var match=posts[ii].querySelector("h2 a");
		if(match.textContent=='Thanks!'){
			var info=posts[ii].querySelector(".info");

			var q=document.createElement('q');
			var postBody=posts[ii].querySelector(".body");
			var jj=4; while(jj--){
				postBody.removeChild(postBody.lastChild);
			}
			var ctn=posts[ii].querySelector(".body").innerHTML.replace(trimws, '');
			q.innerHTML=ctn;
			info.innerHTML=' '+info.innerHTML;
			info.insertBefore(q,info.firstChild);
			msgs.appendChild(info);
			posts[ii].parentNode.removeChild(posts[ii]);
	  }
	}
	wrap.insertBefore(msgs,wrap.getElementsByTagName('div')[0].nextSibling);
}
addStyles();
