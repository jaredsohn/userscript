// ==UserScript==
// @name           Duplicate Navigation for Google Search and Google Image Search
// @namespace      http://prdesignz.com
// @description    Makes next buttons at top and bottom
// @include        http://*google.*/search?*
// @include        http://images.google.*/images?*
// ==/UserScript==
/*navigation CSS
#nav2 {border-collapse:collapse;text-align:center;direction:ltr;}
#nav2 a {color:#000;}
#nav2 .b a, #nav2 .b a:visited {color:#00c;font-size:medium}
#nav2 .nr {background-position:-60px 0;width:16px;}
#nav2 td {padding:0;text-align:center;}
#np, #nf, #nc, #nn, .nr {background:url(/images/nav_logo3.png) no-repeat;height:26px;display:block}
#nav2 #np {width:44px;margin-left:auto;}
#nav2 #nf {background-position:-26px 0;width:18px}
#nav2 #nc {background-position:-44px 0;width:16px}
#nav2 #nn {background-position:-76px 0;margin-right:34px;width:66px}
#nav2 #nl {background-position:-76px 0;width:46px}*/
function addNavigation()
{
	if(document.getElementById('nav'))
	{
	var theHTML = document.getElementById('nav').innerHTML;
	var createStyle = document.createElement('style');
	document.getElementsByTagName('head')[0].appendChild(createStyle);
	createStyle.appendChild(document.createTextNode('#nav2 {border-collapse:collapse;text-align:center;direction:ltr;} #nav2 a {color:#000;} #nav2 .b a, #nav2 .b a:visited {color:#00c;font-size:medium} #nav2 .nr {background-position:-60px 0;width:16px;} #nav2 td {padding:0;text-align:center;} #np, #nf, #nc, #nn, .nr {background:url(/images/nav_logo3.png) no-repeat;height:26px;display:block} #nav2 #np {width:44px;margin-left:auto;} #nav2 #nf {background-position:-26px 0;width:18px} #nav2 #nc {background-position:-44px 0;width:16px} #nav2 #nn {background-position:-76px 0;margin-right:34px;width:66px} #nav2 #nl {background-position:-76px 0;width:46px}'));
	var createTable = document.createElement('table');
	document.body.insertBefore(createTable, document.body.lastChild);
	createTable.setAttribute('id','nav2');
	createTable.setAttribute('style','top:133px;left:50%');
	createTable.style.position = 'absolute';
	document.getElementById('nav2').innerHTML = theHTML;
	document.getElementById('nav2').style.marginLeft = -1 * (document.getElementById('nav2').offsetWidth / 2) + 'px';
	document.getElementById('ssb').style.marginBottom = 50 + 'px';
	}
	if(document.getElementById('navbar'))
	{
		var theHTML2 = document.getElementById('navbar').innerHTML;
		var createStyle2 = document.createTextNode('#navbar2 { position:absolute; } table.t.bt {margin-bottom:60px !important;}');
		document.getElementsByTagName('style')[0].appendChild(createStyle2);
		var createDiv = document.createElement('div');
		createDiv.setAttribute('id','navbar2');
		createDiv.setAttribute('class','n');
		createDiv.setAttribute('style','top:133px;left:50%');
		document.body.insertBefore(createDiv, document.body.lastChild);
		document.getElementById('navbar2').innerHTML = theHTML2;
		document.getElementById('navbar2').style.marginLeft = -1 * (document.getElementById('navbar2').offsetWidth / 2) + 'px';
	}
}
window.addEventListener("load",addNavigation,false);