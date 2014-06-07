// ==UserScript==
// @name           Dossergame drop down menu - by Pennerhilfe.de
// @namespace      pennerhilfe.de
// @description    Adds a drop down menu to reach every page of the game by just hovering the navigation bar an clicking the link
// @include        http://*.dossergame.co.uk/*
// @include        http://dossergame.co.uk/*
// ==/UserScript==

//define function to set styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//set styles
addGlobalStyle('#navigation ul li{	position: relative;}#navigation ul li:hover div{	display: block;	z-index: 5;}#navigation ul li div{	display: none;	position: absolute;	top: 16px;	left: -1px;}#navigation ul li div ul li, #navigation ul li div ul li a, #navigation ul li div ul li a:visited{	border-color:#5D5D5D;	border-style:solid;	border-width: 0;	color:#C3C3C3;	background-color: #262626;	display:block;	font-family:Verdana,Helvetica,Arial,sans-serif;	font-size:11px;	margin: 0;	padding-bottom:0;	padding-top:0;	text-align:center;	text-decoration:none;	top:0;	left: -10px;	width: 141px;}#navigation ul li div ul li{	border-width: 0 1px 1px;}#navigation ul li div ul li ul{	display: none;	width: 120px;	position:absolute; top:-1px; left: 140px; z-index: 9;}#navigation ul li div ul li ul li{	border-width: 0;	height: 16px;	width: 120px;}#navigation ul li div ul li:hover ul{	display: block;}#navigation ul li div ul li ul li a, #navigation ul li div ul li ul li a:visited{	font-size: 9px;	width: 139px;	height:16px;	position: relative;	left:-2px;	padding-top: 0px;	}#navigation ul li div ul li a,#navigation ul li div ul li a:visited{	height: 20px;	padding-top: 2px;}#navigation ul li div ul li a:hover{	background-color:#3B3B3B;	background-image: none;	color:white;}#navigation ul li div ul li ul li a,#navigation ul li div ul li ul li a:visited{border-width: 1px}');

//set the menus text
navi_inhalt = new Array(
			'',
			'<li><a href="/financial/" alt="Balance sheet" title="Balance sheet">Balance sheet</a></li><li><a href="/messages/" alt="Messages" title="Messages">Messages</a><ul><li><a href="/messages/" alt="List of messages" title="List of messages">Messages in</a></li><li><a href="/messages/out/" alt="List of messages" title="List of messages">Messages out</a></li><li><a href="/messages/write/" alt="Write message" title="Write message">Write message</a></li></ul></li><li><a href="/friendlist/" alt="Friends and blocked players" title="Friends and blocked players">Friends and blocked</a></li><li><a href="/gang/" alt="Your gang" title="Your gang">Your gang</a><ul><li><a href="/gang/" alt="Gang" title="Gang">Gang</a></li><li><a href="/gang/credit/" alt="Gang kitty" title="Gang kitty">Gang kitty</a></li><li><a href="/gang/upgrades/" alt="Gang property" title="Gang property">Gang property</a></li><li><a href="/gang/memberlist/" alt="Members" title="Members">Members</a></li><li><a href="/gang/forum/" alt="Gang forum" title="Gang forum">Gang forum</a></li><li><a href="/gang/pact/" alt="Alliances" title="Alliances">Alliances</a></li><li><a href="/gang/fight/" alt="Fights" title="Fights">Gang fights</a></li></ul></li><li><a href="/awards/" alt="Awards" title="Awards">Awards</a></li><li><a href="/change_please/statistics/" alt="Donations statistics" title="Donations statistics">Donations statistics</a></li>',
			'<li><a href="/skills/" alt="Go on further education course" title="Go on further education course">Tramp</a></li><li><a href="/skills/pet/" alt="Pet" title="Send your pet to a further education course">Pet</a></li>',
			'',
			'<li><a href="/city/map/" alt="Map" title="Map">Map</a></li><li><a href="/city/district/" alt="Districts" title="Districts">Districts</a></li><li><a href="/city/home/" alt="Hobo homes" title="Hobo homes">Hobo homes</a></li><li><a href="/city/scrounge/" alt="Work places" title="Work places">Work places</a></li><li><a href="/city/games/" alt="Gambling" title="Gambling">Gambling</a></li> <li><a href="/city/weapon_store/" alt="Weapon shop" title="Weapon shop">Weapon shop</a><ul><li><a href="/city/weapon_store/" alt="Attack" title="Attack">› Attack</a></li> <li><a href="/city/weapon_store/def/" alt="Defense" title="Defense">› Defense</a></li></ul></li><li><a href="/city/pet_store/" alt="Pet shop" title="Pet shop">Pet shop</a></li><li><a href="/city/supermarket/" alt="Supermarket" title="Supermarket">Supermarket</a><ul><li><a href="/city/supermarket/drinks/" alt="Drinks" title="Drinks">› Drinks</a></li><li><a href="/city/supermarket/food/" alt="Food" title="Food">› Food</a></li></ul></li><li><a href="/city/music_store/" alt="Music shop" title="Music shop">Music shop</a></li><li><a href="/city/stuff/" alt="Accessories" title="Accessories">Accessories</a></li><li><a href="/city/medicine/" alt="Medicine" title="Medicine">Medicine</a></li><li><a href="/city/washhouse/" alt="Wash house" title="Wash house">Wash house</a></li>',
			'<li><a href="/stock/foodstuffs/" alt="Groceries" title="Groceries">Groceries</a><ul><li><a href="/stock/foodstuffs/food/" alt="Food" title="Food">› Food</a></li><li><a href="/stock/foodstuffs/drinks/" alt="Drinks" title="Drinks">› Drinks</a></li></ul></li><li><a href="/stock/plunder/" alt="Stuff" title="Stuff">Stuff</a><ul><li><a href="/stock/plunder/craft/" alt="crafting" title="crafting">› Crafting</a></li></ul></li><li><a href="/stock/bottle/" alt="Junk" title="Junk">Junk</a><ul><li><a href="/stock/bottlechart/" alt="Junk chart" title="Junk chart">› Junk chart</a></li></ul></li><li><a href="/stock/instruments/" alt="Instruments" title="Instruments">Instruments</a></li><li><a href="/stock/armoury/" alt="Armoury" title="Armoury">Armoury</a></li>',
			'<li><a href="/fight/overview/" alt="Fights" title="Fights">Fights</a></li><li><a href="/fight/pet/" alt="Pet fights" title="Pet fights">Pet fights</a></li>'
);

//read navigationlist
var navi = document.getElementById('navigation').getElementsByTagName('li');
if( navi[1].innerHTML.search(/(.*)Summary(.*)/) != -1 ){//Check if you see the Navi for logged in
	for(var j = 0;j < navi_inhalt.length;j++){//name the entries of the bar (needed cause the number of the points to get by getElementsByTagName() changes because of the new lists)
		navi[j].id = 'navi_'+j;
	}	
	for(var i = 0;i < navi_inhalt.length;i++){//insert the menus step by step...
		if(navi_inhalt[i] != ''){
			document.getElementById('navi_'+i).innerHTML += '<div class="submenu_shop"><div class="content"><ul>' + navi_inhalt[i] +'<li style="height: 14px;"><a style="font-size: 9px;height:14px;" href="http://pennerhilfe.de/" title="Pennerhilfe.de - Spendensystem" target="_blank" alt="Pennerhilfe.de - Spendensystem">Pennerhilfe.de</a></li><li style="height: 3px;"><img style="position:relative;left:-3px;" src="http://media.pennergame.de/img/menu_buttom.png" alt=""/></li></ul></div></div>';
		}
	}
}