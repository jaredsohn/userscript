// ==UserScript==
// @name          the quarter
// @namespace     wp
// @version       0.1
// @description   Static version of JB's original script 
// @include       http://whirlpool.net.au/*
// @include       http://*.whirlpool.net.au/*
// ==/UserScript==

var lnk = document.createElement( 'LINK' )
lnk.rel = 'stylesheet';
lnk.type = 'text/css';
lnk.href = 'http://forboden.com/coding/quarter-styles.css';
document.getElementsByTagName( 'HEAD' )[0].appendChild( lnk ); 
var userNumber = $(".nav_item_name > a > span").text(); 
var removeText = new Array();
removeText = userNumber.split(' ');		
var linker = document.createElement("div");
linker.innerHTML = '<div id="container"> ' +
					'<img style="border-style: none; background-color: transparent; width: 16px; height: 16px;" src="http://img.photobucket.com/albums/v215/thegooddale/index.png"> ' +					
					'<div class="menu"> ' +
					'<ul> ' +
					'<li><a href="#">WP User<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-user.cfm?id='+removeText[1]+'">Contributed Threads</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-user-online.cfm">People Online</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/whim.cfm?show=inbox">Inbox</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/whim.cfm?show=outbox">Outbox</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/whim-contacts.cfm">Contacts</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-subs.cfm">Subscriptions</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-search.cfm">Thread Search</a></li> ' +
					'<li><a href="http://whirlpool.net.au/user.cfm">Your Settings</a></li> ' +
					'<li><a href="http://whirlpool.net.au/login.cfm?logout='+removeText[1]+'">Log out</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Technology<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=100">Broadband General</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=82">DSL Hardware</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=9">Networking</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=63">Coding &amp; Web</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=116">Web Hosting</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=80">IT &amp; Telco</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=87">Peer to peer</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=91">On the internet</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Voice<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=107">Voice over IP</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=114">Phones</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Computers<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=7">PC Hardware</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=10">Windows</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=38">Apple</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=39">Linux/BSD</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Lounges<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=112">Music Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=8">Gaming Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=83">Gadget Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=58">Movie Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=106">TV Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=71">Lifestyle Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=118">Sports Lounge</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=85">In the News</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=117">The Pool Room</a></li> ' +					
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Whirlpool<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=35">Forum feedback</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=92">Choosing an ISP</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li><a href="#">- Companies<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=14">BigPond</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=15">OptusNet</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=68">Internode</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=72">iiNet - OzEmail</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=69">Netspace</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=94">Westnet</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=90">TPG</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=108">Primus</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=95">People Telecom</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=102">aaNet</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=105">Exetel</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=109">Adam</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=115">Wild I&amp;T</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'<li style="border-bottom:1px solid black;"><a href="#">- Connections<!--[if IE 7]><!--></a><!--<![endif]--> ' +
					'<!--[if lte IE 6]><table><tr><td><![endif]--> ' +
					'<ul> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=67">Regional, Satellite</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=31">Other broadband</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=18">Wireless ISPs</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=99">ISDN, DoV</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=5">Dial-up internet</a></li> ' +
					'<li><a href="http://forums.whirlpool.net.au/forum-threads.cfm?f=97">Peering</a></li> ' +
					'</ul> ' +
					'<!--[if lte IE 6]></td></tr></table></a><![endif]--> ' +
					'</li> ' +
					'</ul> ' +
					'</div> ' +
					'</div>';
document.body.insertBefore(linker, document.body.firstChild);