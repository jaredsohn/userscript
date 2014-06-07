// ==UserScript==
// @name           Pax Republic Forum Cleaner
// @author         Nicki Heat aka kannj
// @description    Just coz I can :-)
// @namespace	   http://userscripts.org/users/Kannj69
// @homepageURL    http://userscripts.org/users/Kannj69
// @website        http://userscripts.org/scripts/show/174082
// @updateURL	   http://userscripts.org/scripts/source/174082.user.js
// @installURL	   http://userscripts.org/scripts/source/174082.user.js
// @downloadURL	   http://userscripts.org/scripts/source/174082.user.js
// @version	   1.3
// @include        http://pax-republica.guildlaunch.com/forums/*
// ==/UserScript==

try
{
	if(!(window.jQuery)) {var s = document.createElement('script');s.setAttribute('src', 'http://code.jquery.com/jquery-latest.min.js');s.setAttribute('type', 'text/javascript');document.getElementsByTagName('head')[0].appendChild(s);}

	// Do something really neat first :-)
	var msgContainer = document.createElement('div');
	msgContainer.id = 'kannj69-div';

	var online = document.createElement('div');
	online.id = 'kannj69-online';
	
	// get count of online users
	var countOfOnline = document.getElementsByClassName('widgetContainer widgetFrame widg_16')[0].children[1].children[0].children[0].children[0].children.length -1;
	online.appendChild(document.createTextNode('    ' + countOfOnline + ' users online'));

	// get count of TeamSpeak users in Main Lobby
	// now count private messages
	if(document.getElementById('user_profile_nav').children[1].children[0].children.length == 1)
	{
		online.appendChild(document.createTextNode(' - ' + 'No new messages'));
	}
	else
	{
		online.appendChild(document.createTextNode(' - ' + document.getElementById('user_profile_nav').children[1].children[0].children[1].innerHTML + ' new messages'));
	}

	// now, shift field to upper
	online.appendChild(document.getElementsByClassName('widgetContainer widgetFrame widg_16')[0].children[1].children[0].children[0].children[0]);

	var advert= document.createElement('marquee');
	advert.id = 'kannj69-advert';
	advert.setAttribute("style", "width:500px;color:blue;");
	advert.appendChild(document.createTextNode('Pax Republic Forum Cleaner brought to you by Kannj69 and the Color Blue'));

	msgContainer.appendChild(online);
	msgContainer.appendChild(advert);

	msgContainer.setAttribute("style","width:500px");

	document.getElementById('admin_bar_links').appendChild(msgContainer);


}
catch (e) {
  console.log(e.stack);
}



// cleanup time
try
{
	// Hide Recent Images
	document.getElementsByClassName('widgetFrame widg_42')[0].style.display="none";

	// remove nav player
//	document.getElementsByClassName('primaryNavPlayer')[0].removeChild(document.getElementsByClassName('primaryNavPlayer')[0].children[0]);	

	// Hide Bad guild launch stuff
	document.getElementById('admin_bar_links').children[0].style.display="none";
	document.getElementById('admin_bar_links').children[1].style.display="none";
	document.getElementById('social_sharing_links').style.display="none";

	// do magic swap
	swapSibling(document.getElementById('widg_col_1').children[3], document.getElementById('widg_col_1').children[0]);
	swapSibling(document.getElementById('widg_col_1').children[0], document.getElementById('widg_col_1').children[2]);

}
catch (e) {
  console.log(e.stack);
}

function swapSibling(node1, node2)
{
	node1.parentNode.replaceChild(node1, node2);
	node1.parentNode.insertBefore(node2, node1); 
}