// ==UserScript==
// @name           The Sixteenth
// @namespace      userscripts.org
// @description    I can haz menu?
// @version        0.1
// @include        http://forums.whirlpool.net.au/
// @include        http://forums.whirlpool.net.au/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

var grabBod = document.getElementsByTagName('body')[0];

var uNumber = $('#menu+.userinfo a')[0].href.split('id=')[1];

var rClickBox = document.createElement('div');
rClickBox.id = 'rClickBox';
rClickBox.className = 'notarget';
rClickBox.setAttribute('style','position:absolute;left:-100px;');
/***http://www.cssplay.co.uk/menus/slide_definition.html***/
rClickBox.innerHTML = '<div id="dlmenu">'+
'<ul id="rclickmenu">'+
'<li>'+
'<dl class="gallery">'+
	'<dt>WP User</dt>'+
	'	<dd><a href="http://forums.whirlpool.net.au/forum-user.cfm?id='+uNumber+'">Your Posts</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/forum-user-online.cfm">People Online</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/whim-contacts.cfm">Contacts</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/forum-subs.cfm">Subscriptions</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/forum-search.cfm">Thread Search</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/profile/">Your Settings</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/profile/index.cfm?a=logout&amp;logout='+uNumber+'">Log out</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
	'<dt>Technology</dt>'+
	'	<dd><a href="/forum-threads.cfm?f=100">Broadband</a></dd> '+
	'	<dd><a href="/forum-threads.cfm?f=82">DSL Hardware</a></dd> '+
	'	<dd><a href="/forum-threads.cfm?f=9">Networking</a></dd> '+
	'	<dd><a href="/forum-threads.cfm?f=107">Voice over IP</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>IT Industry</dt>'+
'		<dd><a href="/forum-threads.cfm?f=80">IT Industry</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=125">Telecomms</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=116">Web Hosting</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=63">Web Development</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=127">Programming</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Computers</dt>'+

'		<dd><a href="/forum-threads.cfm?f=7">PC Hardware</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=10">Windows</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=38">Apple</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=39">Linux/BSD</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Internet</dt>'+
'		<dd><a href="/forum-threads.cfm?f=91">On the internet</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=87">Peer to peer</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Lounges</dt>'+
'		<dd><a href="/forum-threads.cfm?f=112">Music</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=8">Gaming</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=83">Gadgets</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=58">Movies</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=106">Television</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=126">Home Theatre</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=71">Lifestyle</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=118">Sports</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=85">In the News</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Whirlpool</dt>'+
'		<dd><a href="/forum-threads.cfm?f=35">Forum feedback</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=92">Choosing an ISP</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=117">The Pool Room</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Mobile</dt>'+
'		<dd><a href="/forum-threads.cfm?f=114">Mobile Carriers</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=123">Mobile Phones</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=18">Wireless ISPs</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Companies</dt>'+
'		<dd><a href="/forum-threads.cfm?f=14">BigPond</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=15">OptusNet</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=68">Internode</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=72">iiNet</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=69">Netspace</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=94">Westnet</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=90">TPG</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=102">aaNet</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=105">Exetel</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=109">Adam</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=119">AAPT</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Connections</dt>'+
'		<dd><a href="/forum-threads.cfm?f=67">Regional, Satellite</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=31">Other broadband</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=5">Other connections</a></dd> '+
'</dl>'+
'</li>'+
'</ul>'+
'</div>';


GM_addStyle('#dlmenu {height:10em;}'+
	'#rclickmenu {list-style-type:none; margin:0 0 10px; padding:0; position:absolute; width:9em; background:#fff; z-index:100;left:-25px;border:2px solid orange;border-top:none;}'+
	'#rclickmenu li {display:block; padding:0; margin:0; position:relative; z-index:100;}'+
	'#rclickmenu li a, #rclickmenu li a:visited {display:block; text-decoration:none;}'+
	'#rclickmenu li dd {display:none;}'+
	'#rclickmenu li:hover, #rclickmenu li a:hover {border:0;}'+
	'#rclickmenu li:hover dt a , #rclickmenu li a:hover dt a {background:#d4d8bd center center; color:#ff0; }'+
	'#rclickmenu li:hover dd, #rclickmenu li a:hover dd {display:block;}'+
	'#rclickmenu li:hover dl, #rclickmenu li a:hover dl {background:#616CA3;}'+
	'#rclickmenu table {border-collapse:collapse; padding:0; margin:-4px; font-size:1em;}'+
	'#rclickmenu dl {width: 9em; margin: 0; background: #616CA3; cursor:pointer;}'+
	'#rclickmenu dt {margin:0; padding:5px; font-size: 1.1em; border-top:2px solid orange;}'+
	'#rclickmenu dd {margin:0; padding:0; font-size: 1em; text-align:left; }'+
	'.gallery dt a, .gallery dt a:visited {display:block; color:#fff; padding:5px 5px 5px 10px; background:#949e7c url(top_grad.gif) center center;}'+
	'.gallery dd a, .gallery dd a:visited {color:#000; min-height:1em; text-decoration:none; display:block; padding:4px 5px 4px 20px; background:#DFD7CA;}'+
	'* html .gallery dd a, * html .gallery dd a:visited {height:1em;}'+
	'.gallery dd a:hover {background:#EDEDED; color:#666;}');

document.addEventListener('mouseup', function(e) {

	if(e.which==3 && e.target.tagName != 'A' && e.target.tagName != 'TEXTAREA'){

		
		rClickBox.style.left = ''+e.pageX-115+'px';
		rClickBox.style.top = ''+e.pageY+'px';
	
		grabBod.appendChild(rClickBox);
		$(rClickBox).find('*').addClass('notarget');

	}
	if(e.which==1 && $('#rClickBox')[0] && e.target.className != 'notarget'){
	
		$('#rClickBox').remove();
	
	}

			
}, false);  
  
