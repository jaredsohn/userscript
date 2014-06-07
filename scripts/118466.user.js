// ==UserScript==
// @name           fs-following
// @namespace      formspring
// @description    Alternative pleasant design for profiles you follow
// @include        http://www.formspring.me/follow/stream
// version         2.1
// ==/UserScript==

//In case of the rare case of GM_addStyle not being there.
if( typeof(GM_addStyle)=='undefined' ){function GM_addStyle(styles){	
var S = document.createElement('style');
S.type = 'text/css';
var T = ''+styles+'';
T = document.createTextNode(T)
S.appendChild(T);
document.body.appendChild(S);
return;
}}

var modhost = document.getElementById('advertisements_sidebar');
modhost.id = 'following_sidebar';
modhost.setAttribute('style','display:block; !important');

modhost.innerHTML = "<h4>Following</h4>";
modhost.setAttribute('class', 'module following');
GM_addStyle('.following ul { margin-bottom: 10px; }');
GM_addStyle('.following ul li { display:inline;}');
GM_addStyle('.following_large img { height: 160px; width: 160px; }');
GM_addStyle('.following_med img { height: 64px; width: 64px; padding-left:8px; position:absolute;}');
GM_addStyle('.following_med2 img { height: 64px; width: 64px; position:relative; padding-left:8px; bottom:8px; }');
GM_addStyle('.following_small img { height: 32px; width: 32px; padding-right:8px; position:relative; top:8px;}');
var list = document.createElement('ul');
list.id = 'userfollowing';

scrapeFollowing();

function scrapeFollowing(){
        var followUrl = document.getElementsByClassName('stat follow')[0].firstElementChild.getAttribute('href');
	var parasite = document.createElement('div');
	GM_xmlhttpRequest({
		method: "GET",
		url: followUrl,
		onload: function(response) {		
			var res = /id="content">[\s\S]*?class="col2-sm">/.exec(response.responseText);	
			parasite.innerHTML = '<div '+res;
			parasite.id = 'followingPage';
			parasite.setAttribute('style', 'display: none'); //Hide the required page
			document.body.appendChild(parasite);
			getData();
		}
	});
}

function getData(){
	var profiles = document.getElementById('followingPage').getElementsByClassName('hovercard');
	var names = document.getElementById('followingPage').getElementsByClassName('note');
	var pics = document.getElementById('followingPage').getElementsByTagName('IMG');
	modhost.appendChild(list);
	for (i=0; i<9; i++){
		var usr = document.createElement('li');
		switch(i){
		case 0:
			usr.setAttribute('class', 'following_large');
			var tmp = pics[i].getAttribute('src');
			pics[i].setAttribute('src', tmp.replace(/large/i, "large"));
			break;
		case 1:
			usr.setAttribute('class', 'following_med');
			break;
		case 2:
			usr.setAttribute('class', 'following_med2');
			break;
		default:
			var tmp = pics[i].getAttribute('src');
			pics[i].setAttribute('src', tmp.replace(/large/i, "small"));
			usr.setAttribute('class', 'following_small');
		}
		
		usr.innerHTML = '<a title="" href="'+profiles[i].getAttribute("href")+'" _title=""><img alt="" src="'+pics[i].getAttribute("src")+'"></a>';
		//Lacking more relevant data until I can figure out how they're using hovercard
		
		list.appendChild(usr);
		//For dev purposes
		//GM_log(profiles[i].getAttribute('href'));
		//GM_log(names[i+1].textContent);
		//GM_log(pics[i].getAttribute('src'));
	}

}



