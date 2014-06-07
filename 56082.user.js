// ==UserScript==
// @name		Court Rivals Auto Sign-In
// @namespace		http://www.courtrivals.com/
// @description		Automatically signs back into Court Rivals when your account times out
// @include		http://www.courtrivals.com/
// @include		http://www.courtrivals.com/index.php
// @include		http://www.courtrivals.com/index.php?mess=nologin
// ==/UserScript==

if(window.location != "http://www.courtrivals.com/" && window.location != "http://www.courtrivals.com" && window.location != "http://www.courtrivals.com/index.php" && window.location != "http://www.courtrivals.com/index.php?mess=nologin")
{
	var scan, logout;
	scan = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	scan.snapshotItem(0).addEventListener('click', function()
	{
		GM_setValue("autologin","");
		GM_setValue("username","");
		GM_setValue("password","");
		window.location.replace("http://www.courtrivals.com/processing/logout.php");
	}, false);
}
else if(window.location == "http://www.courtrivals.com/index.php?mess=nologin")
{
	submitbutton = document.getElementById('button');
	var startautologin = document.createElement('div');;
	startautologin.innerHTML = '<div><input type="button" id="StartAutoLogin" value="Start AutoLogin"></div>';
	submitbutton.parentNode.insertBefore(startautologin, submitbutton.nextSibling);
	startautologin.addEventListener('click', function()
	{
		var username = document.getElementById('frmUserName');
		GM_setValue("username",username.value);
		var password = document.getElementById('frmPassword');
		GM_setValue("password",password.value);

		username = document.getElementById('frmUserName');
		username.value= GM_getValue("username");

		password = document.getElementById('frmPassword');
		password.value= GM_getValue("password");

		var oneweek = document.getElementById('oneweek');
		oneweek.checked=true;

		GM_setValue("autologin","yes");

		var tothegym = document.getElementById('loginForm');
		tothegym.submit();		
	}, false);
}
else
{
	if(GM_getValue("autologin") == "yes")
	{
		var alreadyloggedin = document.getElementById('gogym');
		if(alreadyloggedin)
		{
			window.location.replace("http://www.courtrivals.com/processing/playerSwitch.php?pid=" + document.getElementById('frmPlayerId').value);
/*
			var logoutbutton = document.evaluate(
				'//p',
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);

			for(var k = 0; k < logoutbutton.snapshotLength; k++)
			{
				if(logoutbutton.snapshotItem(k).innerHTML == '<a href="processing/logout.php">Logout</a>')
				{
					logoutbutton = logoutbutton.snapshotItem(k);
					break;
				}
			}
			//alert(logoutbutton.innerHTML);
			var newlogoutbutton = document.createElement('p');
			//newlogoutbutton.href = "processing/logout.php";
			newlogoutbutton.innerHTML = '<p class="loginBottomText" align="center"><a href="processing/logout.php">Logout</a></p>';
			logoutbutton.parentNode.insertBefore(newlogoutbutton, logoutbutton);
			logoutbutton.parentNode.removeChild(logoutbutton);

			newlogoutbutton.addEventListener('click', function()
			{
				GM_setValue("autologin","");
				GM_setValue("username","");
				GM_setValue("password","");
			}, false);
*/
		}
		else
		{
			var username = document.getElementById('frmUserName');
			username.value= GM_getValue("username");

			var password = document.getElementById('frmPassword');
			password.value= GM_getValue("password");

			var oneweek = document.getElementById('oneweek');
			oneweek.checked=true;

			var tothegym = document.getElementById('loginForm');
			tothegym.submit();
		}
	}
	else
	{
		submitbutton = document.getElementById('button');
		var startautologin = document.createElement('div');;
		startautologin.innerHTML = '<div><input type="button" id="StartAutoLogin" value="Start AutoLogin"></div>';
		submitbutton.parentNode.insertBefore(startautologin, submitbutton.nextSibling);
		startautologin.addEventListener('click', function()
		{
			var username = document.getElementById('frmUserName');
			GM_setValue("username",username.value);
			var password = document.getElementById('frmPassword');
			GM_setValue("password",password.value);

			username = document.getElementById('frmUserName');
			username.value= GM_getValue("username");

			password = document.getElementById('frmPassword');
			password.value= GM_getValue("password");

			var oneweek = document.getElementById('oneweek');
			oneweek.checked=true;

			GM_setValue("autologin","yes");

			var tothegym = document.getElementById('loginForm');
			tothegym.submit();		
		}, false);
	}
}
