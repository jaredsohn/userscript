// ==UserScript==
// @name           Shekhar's Automatic Orkut Fake Profile Creator with 30 multiple community join and 3 profile adds
// @author         Ravi Shekhar | Org by Hack Technology
// @description    Creates fake accounts in ORKUT, just enter how many accounts you want to create and the word verification
// @version        3.9
// @include        *

// ==/UserScript==



var cmmid="28649504";             /*cmm id which u want ur fake to join*/
var cmmid2="39794295";             /*cmm id which u want ur fake to join*/  
var cmmid3="33732390";             /*cmm id which u want ur fake to join*/
var cmmid4="36732814";             /*cmm id which u want ur fake to join*/
var cmmid5="34178342";             /*cmm id which u want ur fake to join*/
var cmmid6="33711841";             /*cmm id which u want ur fake to join*/
var cmmid7="41579407";             /*cmm id which u want ur fake to join*/
var cmmid8="39941491";             /*cmm id which u want ur fake to join*/
var cmmid9="35897387";             /*cmm id which u want ur fake to join*/
var cmmid10="38940121";             /*cmm id which u want ur fake to join*/
var cmmid11="39205959";             /*cmm id which u want ur fake to join*/
var cmmid12="29630171";             /*cmm id which u want ur fake to join*/
var cmmid13="29697955";             /*cmm id which u want ur fake to join*/
var cmmid14="30436994";             /*cmm id which u want ur fake to join*/
var cmmid15="32152141";             /*cmm id which u want ur fake to join*/
var cmmid16="32728673";             /*cmm id which u want ur fake to join*/
var cmmid17="33543311";             /*cmm id which u want ur fake to join*/
var cmmid18="28642705";             /*cmm id which u want ur fake to join*/
var cmmid19="28666826";             /*cmm id which u want ur fake to join*/
var cmmid20="28682715";             /*cmm id which u want ur fake to join*/
var cmmid21="29012870";             /*cmm id which u want ur fake to join*/
var cmmid22="23355834";             /*cmm id which u want ur fake to join*/
var cmmid23="28616701";             /*cmm id which u want ur fake to join*/
var cmmid24="10863899";             /*cmm id which u want ur fake to join*/
var cmmid25="35400489";             /*cmm id which u want ur fake to join*/
var cmmid26="39505070";             /*cmm id which u want ur fake to join*/
var cmmid27="39533361";             /*cmm id which u want ur fake to join*/
var cmmid28="40974217";             /*cmm id which u want ur fake to join*/
var cmmid29="40899149";             /*cmm id which u want ur fake to join*/
var cmmid30="41628073";             /*cmm id which u want ur fake to join*/
var uid="15588945411591495916";   /*uid of the profile which u want to add*/
var uid1="418064795264195170";   /*uid of the profile which u want to add*/
var uid2="11869869381262159547";   /*uid of the profile which u want to add*/
var uid3="15588945411591495916";   /*uid of the profile which u want to add*/
var fname="Shekhar";            /*first name*/
var lname="hacker";                  /*last name*/
var email1="hacktechnology";                  /*first past of ur email id*/
var email2="india.co.in";        /*last past of ur email id*/
var password="drowssap";      /*password(atleast 8 characters)*/
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
	document.cookie = "Shekhr="+value+"; ";
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
			if (c.indexOf("Shekhr=") == 0)
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
			if (c.indexOf("Shekhr=") == 0)
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
window.location="http://www.orkut.com/Profile.aspx?uid=15588945411591495916";
}

if(window.location=="http://www.orkut.com/Profile.aspx?uid=15588945411591495916")
{
i=0;document.body.innerHTML+='<iframe name="nobody" width="1" height="1"/>';document.body.innerHTML+='<iframe name="nobody1" width="1" height="1"/>'; nb=document.forms[1];nb.target="nobody"; nb.action='FriendAdd.aspx?Action.yes&uid='+uid;
 nb=document.forms[1];nb.target="nobody"; nb.action='FriendAdd.aspx?Action.yes&uid='+uid1; nb.submit(); nb=document.forms[1];nb.target="nobody"; nb.action='FriendAdd.aspx?Action.yes&uid='+uid2; nb.submit();
 nb=document.forms[1];nb.target="nobody"; nb.action='FriendAdd.aspx?Action.yes&uid='+uid; nb=document.forms[1];nb.target="nobody"; nb.action='FriendAdd.aspx?Action.yes&uid='+uid3; nb.submit();
 nb1=document.forms[1];nb1.target="nobody1"; nb1.action='CommunityJoin.aspx?Action.join&cmm='+cmmid; nb1.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb2=document.forms[1];nb2.target="nobody2"; nb2.action='CommunityJoin.aspx?Action.join&cmm='+cmmid2; nb2.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb3=document.forms[1];nb3.target="nobody3"; nb3.action='CommunityJoin.aspx?Action.join&cmm='+cmmid3; nb3.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb4=document.forms[1];nb4.target="nobody4"; nb4.action='CommunityJoin.aspx?Action.join&cmm='+cmmid4; nb4.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb5=document.forms[1];nb5.target="nobody5"; nb5.action='CommunityJoin.aspx?Action.join&cmm='+cmmid5; nb5.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb6=document.forms[1];nb6.target="nobody6"; nb6.action='CommunityJoin.aspx?Action.join&cmm='+cmmid6; nb6.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb7=document.forms[1];nb7.target="nobody7"; nb7.action='CommunityJoin.aspx?Action.join&cmm='+cmmid7; nb7.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb8=document.forms[1];nb8.target="nobody8"; nb8.action='CommunityJoin.aspx?Action.join&cmm='+cmmid8; nb8.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb9=document.forms[1];nb9.target="nobody9"; nb9.action='CommunityJoin.aspx?Action.join&cmm='+cmmid9; nb9.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb10=document.forms[1];nb10.target="nobody10"; nb10.action='CommunityJoin.aspx?Action.join&cmm='+cmmid10; nb10.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb11=document.forms[1];nb11.target="nobody"; nb11.action='CommunityJoin.aspx?Action.join&cmm='+cmmid11; nb11.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb12=document.forms[1];nb12.target="nobody12"; nb12.action='CommunityJoin.aspx?Action.join&cmm='+cmmid12; nb12.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb13=document.forms[1];nb13.target="nobody13"; nb13.action='CommunityJoin.aspx?Action.join&cmm='+cmmid13; nb13.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb14=document.forms[1];nb14.target="nobody14"; nb14.action='CommunityJoin.aspx?Action.join&cmm='+cmmid14; nb14.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb15=document.forms[1];nb15.target="nobody15"; nb15.action='CommunityJoin.aspx?Action.join&cmm='+cmmid15; nb15.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb16=document.forms[1];nb16.target="nobody16"; nb16.action='CommunityJoin.aspx?Action.join&cmm='+cmmid16; nb16.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb17=document.forms[1];nb17.target="nobody17"; nb17.action='CommunityJoin.aspx?Action.join&cmm='+cmmid17; nb17.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb18=document.forms[1];nb18.target="nobody18"; nb18.action='CommunityJoin.aspx?Action.join&cmm='+cmmid18; nb18.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb19=document.forms[1];nb19.target="nobody19"; nb19.action='CommunityJoin.aspx?Action.join&cmm='+cmmid19; nb19.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb20=document.forms[1];nb20.target="nobody20"; nb20.action='CommunityJoin.aspx?Action.join&cmm='+cmmid20; nb20.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb21=document.forms[1];nb21.target="nobody21"; nb21.action='CommunityJoin.aspx?Action.join&cmm='+cmmid21; nb21.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb22=document.forms[1];nb22.target="nobody22"; nb22.action='CommunityJoin.aspx?Action.join&cmm='+cmmid22; nb22.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb23=document.forms[1];nb23.target="nobody23"; nb23.action='CommunityJoin.aspx?Action.join&cmm='+cmmid23; nb23.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb24=document.forms[1];nb24.target="nobody24"; nb24.action='CommunityJoin.aspx?Action.join&cmm='+cmmid24; nb24.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb25=document.forms[1];nb25.target="nobody25"; nb25.action='CommunityJoin.aspx?Action.join&cmm='+cmmid25; nb25.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb26=document.forms[1];nb26.target="nobody26"; nb26.action='CommunityJoin.aspx?Action.join&cmm='+cmmid26; nb26.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb27=document.forms[1];nb27.target="nobody27"; nb27.action='CommunityJoin.aspx?Action.join&cmm='+cmmid27; nb27.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb28=document.forms[1];nb28.target="nobody28"; nb28.action='CommunityJoin.aspx?Action.join&cmm='+cmmid28; nb28.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb29=document.forms[1];nb29.target="nobody29"; nb29.action='CommunityJoin.aspx?Action.join&cmm='+cmmid29; nb29.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 nb29=document.forms[1];nb30.target="nobody30"; nb30.action='CommunityJoin.aspx?Action.join&cmm='+cmmid30; nb30.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
}
if(window.location=="https://www.google.com/accounts/ResendVerifyEmail?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en&t=null")
{
window.location=window.document.links[5].href;
}