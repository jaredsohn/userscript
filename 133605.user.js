// ==UserScript==
// @name           bla bla bla
// @namespace      bla bla bla
// @include        http://www.ghost-trappers.com/fb/*
// ==/UserScript==
/************ GM & H & C *************/
var TitleOver = ""
if(document.getElementsByName("captcha_id")[0])
{
	var d = new Date();
	d.setMilliseconds(d.getMilliseconds() + 1800000);
	
	var mins = d.getMinutes();
	var secs = d.getSeconds();
		
	if (mins < 10)
	{mins = "0" + mins;}
	if (secs < 10)
	{secs = "0" + secs;}

        
	TitleOver = "Captcha - Auto refreshing at " + d.getHours() + ":" + mins + ":" + secs;
         if ( document.getElementById("special_text")) 
         {document.getElementById("special_text").innerHTML = "<EMBED SRC=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" loop=\"true\" mastersound enablejavascript=\"true\" hidden=true>";}
	setTimeout(function() {document.getElementsByName("captcha_id")[0].parentNode.submit();}, 1800000)
	//name = "captcha";
	//setTimeout(function() {document.forms.captcha.submit(); }, 1800000);
	
	
	//var forms = document.getElementsByTagName('form');
    //var formid = forms[3].id
    //setTimeout(function() {document.getElementById(formid).submit();}, 1800000);
}
else
{

	if (document.getElementsByClassName("gmButton gmActiveAssistButton")[0] )
	{
		document.location = document.getElementsByClassName("gmButton gmActiveAssistButton")[0].parentNode
	}
	else if(document.location != "http://www.ghost-trappers.com/fb/ghost_monster.php" && document.location.toString().indexOf("ghost_monster.php?") != -1 && document.location.toString().indexOf("test=") != -1 && document.getElementsByClassName("gmButton gmActiveAssistButton")[0] == null)
	{
		TitleOver = "Assisted Ghost Monster, closing tab"
		setTimeout(function() {document.location ='http://dl.dropbox.com/u/13003256/site/index.html';}, 1000);
		
	}
	
	var link = document.getElementById('topHuntActive').firstElementChild.href
	if(link != -1)
	{ 
		if (document.getElementById('profile_whisky_quantity').textContent == "0")
		{
			TitleOver = "0 Magic Potions left! Please refill!";
		}
		else
		{
		if (document.getElementById('topHuntSeconds') != null)
			{
				var minutesid = document.getElementById('topHuntMinutes').innerHTML
				var secondsid = document.getElementById('topHuntSeconds').innerHTML
			} 
			else if (document.getElementById('topHuntMinutes') == null)
			{
				var minutesid = '0'
				var secondsid = '0'
			}
			minutes = parseInt(minutesid, 10);
			seconds = parseInt(secondsid, 10);
			//add 3-33 seconds onto refresh timer randomly (i hope)
			timeoutvalue = (minutes * 60 + seconds + Math.round((Math.random() * 5)) + 1) * 1000;

			//alert(timeoutvalue + "; " + link);
			setTimeout(function() {document.location = link;} , timeoutvalue);
		}
	}
	else
	{
		TitleOver = "Unable to parse hunt link. Refreshing in 30 seconds...";
		setTimeout(function() {document.location = 'http://www.ghost-trappers.com/fb/index.php';}, 30000);
	}
	
	
	if (GM_getValue("GTSAH.AutoGMPage", false) && document.location != "http://www.ghost-trappers.com/fb/ghost_monster.php")
	{
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.ghost-trappers.com/fb/ghost_monster.php',
			headers: {
				"Accept": "text/html",
				"Pragma": "no-cache",
				"Cache-Control": "no-cache"
			},
			onload: function(rD) {
				if (rD.responseText.indexOf("At the moment") == -1)
				{
					document.location = "http://www.ghost-trappers.com/fb/ghost_monster.php";
				}
			}
		});
		
	}
}

setTimeout(function() {document.location = 'http://www.ghost-trappers.com/fb/index.php';}, 2100000);

if ( document.getElementsByClassName("footerContainer")[0]) 
         {document.getElementsByClassName("footerContainer")[0].innerHTML = "<iframe src =\"http:\/\/dl.dropbox.com\/u\/13003256\/site\/regad.html\" width=\"730\" height=\"92\" frameborder=\"0\" scrolling=\"no\"><p>Your browser does not support iframes.<\/p><\/iframe>";}

if ( document.getElementsByClassName("petRightName")[0]) 
         {document.getElementsByClassName("petRightName")[0].innerHTML = "<iframe src =\"http:\/\/dl.dropbox.com\/u\/13003256\/update\/v241.html\" height=\"40\" frameborder=\"0\"><p>Your browser does not support iframes.<\/p><\/iframe>";}

UpdateTitle()

/************************* Titles *************************/
var pt = document.location.toString().search(/\?type=/);
var ptt = "";
if (pt != -1)
{
	ptt = ": " + document.location.toString().substring(pt + "?type=".length, document.location.toString().length);
}
function UpdateTitle()
{
	if (TitleOver == ""){
		if (document.getElementById('topHuntMinutes') != null)
		{
			var minutesid = document.getElementById('topHuntMinutes').innerHTML
			var secondsid = document.getElementById('topHuntSeconds').innerHTML
		} 
		else if (document.getElementById('topHuntMinutes') == null)
		{
			var minutesid = '0'
			var secondsid = '0'
		}
		
		var mins = parseInt(minutesid, 10);
		var secs = parseInt(secondsid, 10);
		
		if (mins < 10)
		{mins = "0" + mins;}
		if (secs < 10)
		{secs = "0" + secs;}
		
		document.title = "| " + document.location.pathname.toString().replace("/ghost-trappers/", "").replace("/fb/", "").replace(".php", "") + ptt + " | Hunt: " + mins + ':' + secs + " | Potions: " + document.getElementById('profile_whisky_quantity').textContent + " |";
	}
	else
	{
		document.title = TitleOver
	}
	setTimeout(UpdateTitle, 1000);
}
