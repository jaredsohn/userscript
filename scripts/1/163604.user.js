// ==UserScript==
// @name		Unicreatures Egg pop-up
// @namespace		uceggpopup
// @author		https://userscripts.org/users/511406
// @downloadURL 	https://userscripts.org/scripts/source/163604.user.js
// @updateURL		https://userscripts.org/scripts/source/163604.meta.js
// @description		Alerts you when you find an egg while exploring
// @include		http://unicreatures.com/explore.php*
// @include		http://www.unicreatures.com/explore.php*
// @include		http://unicreatures.com/options.php*
// @include		http://www.unicreatures.com/options.php*
// @version		2.2
// @grant		none
// ==/UserScript==

//Called from options page to insert scripts into the page
function makethingshappen ()
{
	//Open the settings pop-up
	window.openpopup = function()
	{
		//Get wanted eggs from cookie, if it is set
		//Default is empty
		var eggs = "";
		if (document.cookie.indexOf("UCPOPUPEGGS") >= 0)
		{
			eggs = JSON.parse(eatCookie("UCPOPUPEGGS"));
		}
		
		//Get checkbox settings from cookies, if they are set
		//Default is true
		var normal = true;
		var noble = true;
		var exalted = true;
		if (document.cookie.indexOf("UCPOPUPNORMAL") >= 0)
		{
			normal = (eatCookie("UCPOPUPNORMAL") == "true");
		}
		
		if (document.cookie.indexOf("UCPOPUPNOBLE") >= 0)
		{
			noble = (eatCookie("UCPOPUPNOBLE") == "true");
		}
		
		if (document.cookie.indexOf("UCPOPUPEXALTED") >= 0)
		{
			exalted = (eatCookie("UCPOPUPEXALTED") == "true");
		}
	
		//Make pop-up div
		var popup = document.createElement('div');
		popup.className = 'popup';
		popup.id = 'test';	
		popup.style.position = "absolute";
		popup.style.left = "" + ((window.innerWidth / 2) - 150) + "px";
		popup.style.top = "" + ((window.innerHeight / 2) - 200) + "px";
		popup.style.width = "300px";	
		popup.style.height = "400px";
		popup.style.backgroundColor = "#E3DBB6";
		
		//Make textarea
		var box = document.createElement('textarea');
		box.type = 'text';
		box.id = 'theBox';
		box.rows = 10;
		box.style.margin = '5px 5px 5px 5px';
		
		//Only one egg per line
		var boxedText = "";
		for (var i = 0; i < eggs.length; i++)
		{
			boxedText +=  eggs[i];
			
			//No empty line at the end
			if(i < eggs.length - 1)
			{
				boxedText += "\n";
			}
		}
		box.value = boxedText;
		
		//Buttons container
		var buttons = document.createElement('div');
		
		//Checkbox container
		var checkboxes = document.createElement('div');
		
		//Checkbox for normal eggs
		var normalbox = document.createElement('input');
		normalbox.type = "checkbox";
		normalbox.id = "normalbox";
		normalbox.checked = normal;
		
		//Text for normoal checkbox
		var normalspan = document.createElement('span');
		normalspan.innerHTML = "Normal";
		normalspan.style.margin = '5px 5px 5px 5px';
		
		//Checkbox for noble eggs
		var noblebox = document.createElement('input');
		noblebox.type = "checkbox";
		noblebox.id = "noblebox";
		noblebox.checked = noble;
		
		//Text for noble checbox
		var noblespan = document.createElement('span');
		noblespan.innerHTML = "Noble";
		noblespan.style.margin = '5px 5px 5px 5px';
		
		//Checkbox for exalted eggs
		var exaltedbox = document.createElement('input');
		exaltedbox.type = "checkbox";
		exaltedbox.id = "exaltedbox";
		exaltedbox.checked = exalted;
		
		//Text for exalted checkbox
		var exaltedspan = document.createElement('span');
		exaltedspan.innerHTML = "Exalted";
		exaltedspan.style.margin = '5px 5px 5px 5px';
		
		//Save button
		var save = document.createElement('span');
		save.className = 'roundme';
		save.innerHTML = '<b>Save</b>';
		save.style.fontSize = 'larger';
		save.style.backgroundColor = "#B2FF99";
		save.style.margin = '5px 5px 5px 5px';
		save.style.padding = '2px 5px 2px 5px';
		save.onclick = function (e)
		{
			//Throw the values from the textarea in an array
			var boxContent = document.getElementById("theBox").value;
			boxContent = boxContent.split("\n");
			
			var trimmed = [];
			
			//Throw out empty lines and get rid of spaces
			for (var i = 0; i < boxContent.length; i++)
			{
				if(boxContent[i].length > 0)
				{
					trimmed.push(boxContent[i].trim());
				}
			}
			
			//Save everything delicious cookies
			trimmed = JSON.stringify(trimmed);
			bakeCookie("UCPOPUPEGGS",trimmed);
			bakeCookie("UCPOPUPNORMAL",document.getElementById("normalbox").checked);
			bakeCookie("UCPOPUPNOBLE",document.getElementById("noblebox").checked);
			bakeCookie("UCPOPUPEXALTED",document.getElementById("exaltedbox").checked);
			
			//Tell the user nothing broke
			document.getElementById("stuff").innerHTML = "Saved!";
		};
		
		//Cancel button
		var cancel = document.createElement('span');
		cancel.className = 'roundme';
		cancel.innerHTML = '<b>Close</b>';
		cancel.style.fontSize = 'larger';
		cancel.style.backgroundColor = "#EB9999";
		cancel.style.margin = '5px 5px 5px 5px';
		cancel.style.padding = '2px 5px 2px 5px';
		cancel.onclick = function (e)
		{
			popup.parentNode.removeChild(popup)
		};
		
		//Message about the textbox
		var messagemid = document.createElement('div');
		messagemid.innerHTML = "Enter the eggs you are looking for.</br>One egg per line. Leave empty to get </br>an alert for all eggs.</br><i>(This only applies to normal eggs.)</i>";
		messagemid.style.backgroundColor = "#ABE4FE";
		messagemid.className = "roundme";
		messagemid.style.margin = '5px 5px 5px 5px';
		
		//Message about the checkboxes
		var messagetop = document.createElement('div');
		messagetop.innerHTML = "Check what type of eggs to receive alerts for:";
		messagetop.style.backgroundColor = "#ABE4FE";
		messagetop.className = "roundme";
		messagetop.style.margin = '5px 5px 5px 5px';
		
		//checkboxesmessage container
		var checkboxesmessage = document.createElement('div');
		checkboxesmessage.style.margin = '0px 0px 15px 0px';
		
		//textareamessage container
		var textareamessage = document.createElement('div');
		textareamessage.style.margin = '0px 0px 15px 0px';
		
		//div for stuff
		var stuff = document.createElement('div');
		stuff.id = "stuff";
		stuff.innerHTML = "</br>";
		stuff.style.margin = '0px 0px 15px 0px';
		
		//throw em all together
		popup.appendChild(checkboxesmessage);
		checkboxesmessage.appendChild(messagetop);
		checkboxesmessage.appendChild(checkboxes);
		checkboxes.appendChild(normalbox);
		checkboxes.appendChild(normalspan);
		checkboxes.appendChild(noblebox);
		checkboxes.appendChild(noblespan);
		checkboxes.appendChild(exaltedbox);
		checkboxes.appendChild(exaltedspan);
		popup.appendChild(textareamessage);
		textareamessage.appendChild(messagemid); 
		textareamessage.appendChild(box);		
		popup.appendChild(stuff);
		popup.appendChild(buttons);
		buttons.appendChild(save);
		buttons.appendChild(cancel);
		document.body.appendChild(popup);
	};
	
	//Make a cookie
	window.bakeCookie = function(name,value)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + 365);
		var cvalue=escape(value) + "; expires="+exdate.toUTCString();
		document.cookie=name + "=" + cvalue;
	};
	
	//Get a cookie
	window.eatCookie = function(name)
	{
		var i,x,y,cookies=document.cookie.split(";");
		
		for (i=0;i<cookies.length;i++)
		{
			x=cookies[i].substr(0,cookies[i].indexOf("="));
			y=cookies[i].substr(cookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			
			if (x==name)
			{
				return unescape(y);
			}
		}
	};
}

//GM also gets to eat cookies
function eatCookie(name)
{
	var i,x,y,cookies=document.cookie.split(";");
	
	for (i=0;i<cookies.length;i++)
	{
		x=cookies[i].substr(0,cookies[i].indexOf("="));
		y=cookies[i].substr(cookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		
		if (x==name)
		{
			return unescape(y);
		}
	}
}

//Are we on the options page?
if(document.URL.indexOf("options") > 0)
{
	//Add the settings button to the page
	var y = document.getElementsByClassName("content")[0].innerHTML;
	var i = y.indexOf("bottom_bar.php");
	i += (y.substr(i, y.length - i).indexOf("</tr>") + 5);
	
	before = y.substr(0, i);
	after = y.substr(i, y.length - i);
	
	document.getElementsByClassName("content")[0].innerHTML = before + "<td align='center' valign='bottom' width='100' height='85'><a href='#' onclick=\"openpopup();\"><img src='./images/components/supplies.png' border='0' /></a><br />Pop-up settings</td>" + after;
	
	//Add the scripts/etc to the page
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ makethingshappen +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = "#test { border-radius: 15px; border: 1px outset; } .roundme { border-radius: 5px;}";
	document.body.appendChild(css);
}
//We are exploring
else
{
	var y = document.getElementsByClassName("content")[0].innerHTML;
	
	//Get wanted eggs from cookie, if it is set
	//Default is empty
	var eggs = "";
	if (document.cookie.indexOf("UCPOPUPEGGS") >= 0)
	{
		eggs = JSON.parse(eatCookie("UCPOPUPEGGS"));
	}
	
	//Get checkbox settings from cookies, if they are set
	//Default is true
	var normal = true;
	var noble = true;
	var exalted = true;
	if (document.cookie.indexOf("UCPOPUPNORMAL") >= 0)
	{
		normal = (eatCookie("UCPOPUPNORMAL") == "true");
	}
	
	if (document.cookie.indexOf("UCPOPUPNOBLE") >= 0)
	{
		noble = (eatCookie("UCPOPUPNOBLE") == "true");
	}
	
	if (document.cookie.indexOf("UCPOPUPEXALTED") >= 0)
	{
		exalted = (eatCookie("UCPOPUPEXALTED") == "true");
	}
	
	if((y.indexOf("You find a Noble") > 0) && noble)
	{
	alert('Noble Egg found!');
	}
	else if((y.indexOf("You find an Exalted") > 0) && exalted)
	{
	alert('Exalted Egg found!!!');
	}
	else if((y.indexOf("egg nearby!") > 0) && normal)
	{
		//No eggs set, alert for everything
		if(eggs.length == 0)
		{
			alert("Egg found");
		}
		//Alert only if the egg is in the eggs
		else
		{		
			for (var i = 0; i < eggs.length; i++)
			{
				if(y.indexOf(eggs[i] + " egg nearby!") > 0)
				{
					alert(eggs[i] + ' egg found');
				}
			}
		}
	}
}