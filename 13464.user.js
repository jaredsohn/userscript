// ==UserScript==
// @name           Keshav's Automatic Orkut Fake Profile Creator
// @author         KeG aka Keshav | Org by Mr Nobody
// @description    Creates fake accounts in ORKUT, just enter how many accounts you want to create and the word verification
// @version        1.1
// @include        *

// ==/UserScript==



var cmmid="31487135";             /*cmm id which u want ur fake to join*/
var uid="13864035337638006587";   /*uid of the profile which u want to add*/
var fname="Johnny";            /*first name*/
var lname="Walker";                  /*last name*/
var email1="johnny";                  /*first part of ur email id*/
var email2="india.co.in";        /*last part of ur email id*/
var password="apassword";      /*password(atleast 8 characters)*/
var c="91";                       /*COUNTRY,91 for india,154 for pakistan */

/* dont edit anything below*/

if(window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0&hl=en-US&rm=false&passive=true" || window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0%26page%3Dhttp%253A%252F%252Fwww.orkut.com%252F&hl=en-US&rm=false&passive=true")
{
window.location="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en";
}

if(window.location=="http://www.orkut.com/Terms.aspx?mode=signup")
{
var nbb=document.forms[0].elements[2].click();void(0)
}

if(window.location=="https://www.google.com/accounts/CreateAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en")
{
window.location=window.document.links[4].href;
}

if(window.location=="http://www.orkut.com/EditSummary.aspx?mode=signup")
{
document.forms[2].elements[6].checked="true";document.forms[2].elements[36].checked="true";var newOption = document.createElement('option');newOption.selected="selected";newOption.value =c;document.getElementById('country').add(newOption, null);
window.addEventListener("load", function(e) {
document.location.href="javascript:_submitForm(document.forms[2], 'update', '');void(0)";
}, false);
}

//write cookie
function createCookie(value)
{
	document.cookie = "Keshav="+value+"; ";
}

//read cookie
function readCookie()
{
	var ca = document.cookie.split(';');
	var c;
	var val;
	var coop ;
	coop=0;
	
	for(var i=0;i < ca.length;i++)
	{
		c = ca[i];
		while (c.charAt(0)==' ')
		{
			c = c.substring(1,c.length);
			if (c.indexOf("Keshav=") == 0)
			{
				val=(c.substring(7,c.length));
				coop=1;
			}
		}
	}
	//if cookie not present
	if (coop==0)
	{
	createCookie(0);
	}
		//for the case when the cookie was not present
		var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		c = ca[i];
		while (c.charAt(0)==' ')
		{
			c = c.substring(1,c.length);
			if (c.indexOf("Keshav=") == 0)
			{
				val=(c.substring(7,c.length));
				coop=1;
			}
		}
	}
	return (val);
}


if(window.location=="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en")
{
	var i;
	i= readCookie();
	if (i<=0)
	{
		var noacc
		noacc = prompt('How many accounts do you want to create??','10');
		createCookie(noacc);
		i= readCookie();
	}
	document.forms[0].elements[7].value=email1 + i + "@" + email2 ;
	document.forms[0].elements[5].value=fname;document.forms[0].elements[6].value=lname;
	document.forms[0].elements[8].value=password;
	document.forms[0].elements[9].value=password;
	i=i-1;
	createCookie(i);

	document.forms[0].elements[20].focus();
	window.location="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en#noEm";

}

if(window.location=="http://www.google.com/accounts/TOS?hl=en-US")
{
window.location="http://www.orkut.com/EditSummary.aspx?mode=signup";
}

if(window.location=="http://www.orkut.com/Home.aspx?mode=signup")
{
window.location="http://www.orkut.com/Profile.aspx?uid=13864035337638006587";
}

if(window.location=="http://www.orkut.com/Profile.aspx?uid=13864035337638006587")
{
i=0;document.body.innerHTML+='<iframe name="nobody" width="1" height="1"/>';document.body.innerHTML+='<iframe name="nobody1" width="1" height="1"/>'; nb=document.forms[1];nb.target="nobody"; nb.action='FriendAdd.aspx?Action.yes&uid='+uid; nb.submit();nb1=document.forms[1];nb1.target="nobody1"; nb1.action='CommunityJoin.aspx?Action.join&cmm='+cmmid; nb1.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
}

if(window.location=="https://www.google.com/accounts/ResendVerifyEmail?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en&t=null")
{
window.location=window.document.links[5].href;
}