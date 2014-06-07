
// CaptainForum
// version 1.4.1 BETA!
// 2007-03-13
// greasemonkey.scriptvals./Ca
// Copyright (c) 2005, Yonatan Maman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.2.6 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CaptainForum", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CaptainForum
// @description   Enhance the using of Captain Internet Forum www.haarzte.co.il
// @include       http://www.haaretz.co.il/captain/pages/ForumCaptain.jhtml*
// @include       http://www.captain.co.il/captain/pages/ForumCaptain.jhtml*
// @include       http://www.haaretz.co.il/Forum/InsertMess.jhtml*
// @include       http://www.captain.co.il/Forum/InsertMess.jhtml*
// ==/UserScript==


var NumOfMessages = 0;
var lastVisitedDate = 0;

var VersionStr = "1.4.1";
var currentColorIndex = 0;

var numOfFriends = 10;
var numOfColors = 10;
var numOfDefValues = 10;
var showPrefStr = String.fromCharCode
(1488, 1508, 1513, 1512, 1493, 1497, 1493, 1514);
var hidePrefStr = String.fromCharCode
(1505, 1490, 1493, 1512, 32, 1488, 1508, 1513, 1512, 1493, 1497, 1493, 1514);

// l't
var noDataStr = "("+String.fromCharCode(1500, 1514)+") ";
var prefHtml ="";

// archey brirat mechdal
var defValuesStr = String.fromCharCode
(1506, 1512, 1499, 1497, 32, 1489, 1512, 1497, 1512, 1514, 32, 1502, 1495, 1491, 1500);

var defSearchStr = String.fromCharCode

(1495,1508, 1513, 32,1488, 1514, 32,1492, 1495, 1489, 1512, 1497, 1501, 32, 1513, 1500, 1498);
var defExpandStr = String.fromCharCode
	(1492,1512,1495,1489,32,1492,1499,1500);
// teguva L:
var respondsToStr = String.fromCharCode
(1514, 1490, 1493, 1489, 1492, 32, 1500)+" :";

var defShowLTStr = String.fromCharCode
(1492, 1510, 1490, 32)+noDataStr;

//hatzeg teguva l:
var defShowResponds = String.fromCharCode
(1492, 1510, 1490, 32) +"' "+String.fromCharCode(1514, 1490, 1493, 1489, 1492, 32, 1500)+" : ' ";

var defShowAddMessage = String.fromCharCode
(1492, 1493, 1505, 1507, 32, 1514, 1490, 1493, 1489, 1492, 32, 1489, 1513, 1493, 1512, 1514, 32, 1492, 1504, 1493, 1513, 1488);

// samen hodaot hadashot
var defMarkNewMessages =String.fromCharCode
(1505, 1502, 1503, 32, 1492, 1493, 1491, 1506, 1514, 32, 1495, 1491, 1513, 1493, 1514);

var defDisableAutoRefresh = String.fromCharCode
  (1489, 1496, 1500, 32, 1512, 1497, 1506, 1504, 1493, 1503, 32, 1488, 1493, 1496, 1493, 1502, 1488, 1496, 1497);
//sehm
var changeNameStr = String.fromCharCode
(1513, 1501);

//tzeva
var changeColorStr = String.fromCharCode
(1510, 1489, 1506);

//mechak
var removeStr = String.fromCharCode
(1502, 1495, 1511);

//mis'
var numberTitleStr = String.fromCharCode
(1502, 1505) +"'";

//shem mishtamesh
var nameTitleStr = String.fromCharCode
(1513, 1501, 32, 1502, 1513, 1514, 1502, 1513);

//peolot
var actionTitleStr = String.fromCharCode
(1508, 1506, 1493, 1500, 1493, 1514);

//bechar tzeva
var chooseColorStr =String.fromCharCode
(1489, 1495, 1512, 32,  1510, 1489, 1506)+":";

//hachnes shem
var nameToAddStr =  String.fromCharCode
(1492, 1499, 1504, 1505, 32, 1513, 1501)+":";

var divPref;

//hapes at haverim shelcha
var searchYorFriendsStr = String.fromCharCode
(1495,1508, 1513, 32,1488, 1514, 32,1492, 1495, 1489, 1512, 1497, 1501, 32, 1513, 1500, 1498);

// haser hadgasha
var hideMarkStr = String.fromCharCode
	(1492,1505,1512,32,1492,1491,1490,1513,1492);

// harhev hakol
var expandAllStr = String.fromCharCode
	(1492,1512,1495,1489,32,1492,1499,1500);

// tzamtzem hakol		
var collapsAllStr = String.fromCharCode
	(1510,1502,1510,1501,32,1492,1499,1500);
var pickedColorArea;
var friendsName = new Array(10);
var colorPalate = new Array(10);
var friendsColor = new Array(00);
var defaultValues = new Array(10);

var defValueChanged = false;

(function() {

function trim(sInString)
{
	if (sInString==null || sInString=="")
	{
		return "";
	}
	sInString = sInString.replace( /^\s+/g, "" );// strip leading
	return sInString.replace( /\s+$/g, "" );// strip trailing
} //End Function

function myLog(obj)
{
  try
  {
    GM_log("captainForum:::@@@@ "+obj);
  } 
  catch (exc0)
  {
    try
    {
      var consoleService = Components.classes['@mozilla.org/consoleservice;1']
                    .getService(Components.interfaces.nsIConsoleService);
      consoleService.logStringMessage("captainForum::: "+obj);
    }
    catch (exc)
    {
    }
  }
}


function getPersisData(name)
{
	if (GM_getValue)
	{
		return unescape(GM_getValue(name, ""));
	}
	else
	{
		return getCookie(name);
	}
}

function setPersisData(name, value)
{
	if (GM_setValue)
	{
		return GM_setValue(name, escape(value));
	}
	else
	{
		return setCookie(name, value);
	}
}



function getCookie(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}


function setCookie(name, value)
{
	var expires = new Date();
	expires.setTime(expires.getTime() + (365*24*60*60*1000));
10
	var path = "/";
	var domain = null;
	var secure= false;

    document.cookie= name + "=" + escape(value) +
        "; expires=" + expires.toGMTString() +
        "; path=" + path;
}


function deleteCookie(name)
{
	var path = "/";

    if (getCookie(name))
    {
        document.cookie = name + "=" +
            "; path=" + path +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}
function initColorPalateAndNames()
{
	for (var index =0; index <numOfFriends; index++)
	{
		friendsName[index]="";
		friendsColor[index]=-1;
	}

	for (var index = 0; index < numOfDefValues; index++)
	{
		defaultValues[index] = "false";
	}
	defaultValues[0] = "true";
	defaultValues[2] = "true";
	defaultValues[3] = "true";
	defaultValues[4] = "true";
	defaultValues[5] = "true";
	defaultValues[6] = "true";

 	colorPalate[0] = "rgb(51, 102, 255)";
	colorPalate[1] = "rgb(255, 0, 0)";
	colorPalate[2] = "rgb(51, 204, 0)";
	colorPalate[3] = "rgb(255, 255, 0)";
	colorPalate[4] = "rgb(204, 102, 204)";
	colorPalate[5] = "rgb(102, 0, 204)";
	colorPalate[6] = "rgb(255, 204, 51)";
	colorPalate[7] = "rgb(0, 153, 0)";
	colorPalate[8] = "rgb(204, 0, 0)";
	colorPalate[9] = "rgb(192, 192, 0)";

	updateFriendList();
}

unsafeWindow.defaultValueChanged=function(checkBoxID)
{
	var check = document.getElementById("checkBox_"+checkBoxID);
	setDeaultValueInDB(checkBoxID,check.checked);
	defValueChanged = true;
}
unsafeWindow.showPref=function(flag)
{
	var aShowPref = document.getElementById("showPrefElementID");
	aShowPref.setAttribute("href","javascript:showPref("+(1-flag)+");");
	if (flag)
	{
		aShowPref.innerHTML=hidePrefStr;
		divPref.setAttribute("style","display");
	}
	else
	{
		aShowPref.innerHTML=showPrefStr;
		divPref.setAttribute("style","display:none");
		if (defValueChanged)
		{
			unsafeWindow.location.href = unescape(unsafeWindow.location.pathname);
		}
	}

}

unsafeWindow.expandCollaps=function(flag)
{
	var aElmExpandCollaps = document.getElementById("expandCollpassElementID");
	aElmExpandCollaps.setAttribute("href","javascript:expandCollaps("+(1-flag)+");");
	if (flag) //expand now
	{
		aElmExpandCollaps.innerHTML="&nbsp;&nbsp;&nbsp;"+collapsAllStr+"&nbsp;&nbsp;&nbsp;";
	}
	else
	{
		aElmExpandCollaps.innerHTML="&nbsp;&nbsp;&nbsp;"+expandAllStr+"&nbsp;&nbsp;&nbsp;";
	}
	var ID;
	for(ID=1;ID<=getNomOfMsg();ID++)
	{
		try
		{
			if (flag==1)
			{
				unsafeWindow.flagspan[ID] = 0;
			}
			else
			{
				unsafeWindow.flagspan[ID] = 1;
			}
			if ((flag==0) || !isMessageNull(ID))
			{
				unsafeWindow.show_msg(ID);
			}
		}
		catch (exc)
		{
		  myLog(exc);
		}
	}
}

function addFriendToDB(index, name)
{
	setPersisData("FRIEND_"+index,name);
	updateFriendList();
}

function addColorToDB(index, colorIndex)
{
	setPersisData("COLOR_"+index,colorIndex);
	updateFriendList();
}

function setDeaultValueInDB(index, value)
{
	setPersisData("DEF_VALUE_"+index,value);
	updateFriendList();
}

function updateFriendList()
{
	var index = 0;
	for (index =0; index <numOfFriends; index++)
	{
		var friendName  = getPersisData("FRIEND_"+index);
		var colorIndex = getPersisData("COLOR_"+index);
		friendsName[index]=friendName;
		friendsColor[index]=colorIndex;
	}

	for (index = 0; index < numOfDefValues; index++)
	{
		var value = getPersisData("DEF_VALUE_"+index);

		if (value=="false")
		{
			defaultValues[index] = "false";
		}

		if (value=="true")
		{
			defaultValues[index] = "true";
		}
	}
}


function getFriendIndex(name)
{
	var index = 0;
	var res = -1;
	do
	{
		name = trim(name);
		if (name.length <=0 )
		{
			break;
		}
		for (index = 0; index < numOfFriends; index++)
		{
			if (trim(friendsName[index]).length <= 0)
			{
				continue;
			}

			var nameForComp = friendsName[index]+"&nbsp;|";

			if (name == nameForComp)
			{
				res = index;
				break;
			}
		}
	}while(false);
	return res;
}

unsafeWindow.resetAll=function()
{
	for (index = 0; index < numOfFriends; index++)
	{
		setPersisData("FRIEND_"+index,"");
		setPersisData("COLOR_"+index,0);
	}
}
var msgCounter = 0;

unsafeWindow.doAddMess=function(mesgID,currPlace,forum_type,cntr, date)
{
	var mss = new String(mesgID);
	if (defaultValues[3]=="true")
	{
	  setPersisData("ORIG_MSG_ID",mesgID);
	  setPersisData("ORIG_MSG_DATE",date);
	}
	else
	{
	  setPersisData("ORIG_MSG_ID","");
	  setPersisData("ORIG_MSG_DATE","");
	} 
	location.href ='../../Forum/InsertMess.jhtml?fat='+mesgID+'&curp='+currPlace+'&ft='+forum_type;

	var anyElm = document.getElementById("subj" + cntr);
	var date = anyElm.parentNode.nextSibling.nextSibling.nextSibling.innerHTML;


}

unsafeWindow.SubjectMessagePlus=function(mainMsg,currPlace,MessageId,cntr,Subject,UserId,date,msgid,UserName,displayNew,color1,color2,editors,editors_desc)
{
	try
	{

		var anyElm = document.getElementById("subj" + cntr);
		var elm = anyElm.parentNode.parentNode.firstChild;


		var intV = parseInt(date.substring(12, 14));
		var d = new Date(intV+2000,date.substring(9, 11)-1,
				 date.substring(6, 8),
				 date.substring(0, 2),date.substring(3, 5));

		var str =

		"<span onClick=\"javascript:doAddMess('"+MessageId+"',"+currPlace+",0,"+cntr+",'"+date+"')\""+
		"style='cursor:pointer;cursor:hand'>"+
		"<img src='data:image/gif;base64,R0lGODlhDwAPAIAAAAAAAP%2F%2F%2FyH%2BFUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh%2BQQBCgABACwAAAAADwAPAAACJIyPecDtgKAy8tlQJ8Vbw7xE3Nht4GOWJAeqn5o0sLhYjoYHBQA7' border='0'>"+
//		"height='15' width='15'>"+
//		" + "+
		"</span>";//
		elm.innerHTML="";
		if (defaultValues[4]=="true")
		{
			elm.innerHTML= str;
		}
		elm.setAttribute("width","15px");

		if (defaultValues[5]=="true")
		{
			if (lastVisitedDate==null ||  lastVisitedDate.getTime() < d.getTime())
			{
				elm.nextSibling.firstChild.setAttribute("color","red");
			}
			else
			{
				//elm.nextSibling.firstChild.setAttribute("color","#ada819");
			}
			//elm.nextSibling.nextSibling.nextSibling.nextSibling.setAttribute("class","t12B");
		}
	}
	catch (exc)
	{
	  myLog(exc);
	}

}

unsafeWindow.searchYourFriends=function(flag)
{
	var aSearchyorFriends = document.getElementById("searchYourFriendElementID");
	aSearchyorFriends.setAttribute("href","javascript:searchYourFriends("+(1-flag)+");");
	if (flag==1)
	{
		aSearchyorFriends.innerHTML = hideMarkStr;
	}
	else
	{
		aSearchyorFriends.innerHTML = searchYorFriendsStr;
	}
	for(ID=1;ID<=NumOfMessages;ID++)
	{
		try
		{
			var anyElm = document.getElementById("subj" + ID);
			var elm = anyElm.parentNode.nextSibling.nextSibling;

			var friendIndex = getFriendIndex(elm.innerHTML);

			if 
			  ((friendIndex != -1) && (friendsColor[friendIndex] >= 0) && (friendsColor[friendIndex] < 10) && 
			   (friendsColor[friendIndex] != null) &&  (friendsColor[friendIndex] != ''))
			{
				if (flag)
				{
				  elm.setAttribute("class","FIND_FRIEND_"+friendsColor[friendIndex]+"_BOLD_CLASS");
				  var color = colorPalate[friendsColor[friendIndex]];
				}
				else
				{
				  elm.setAttribute("class","t12B");
				}
			}
		}
		catch (exc)
		{
		  myLog(exc);
		}
	}
}

unsafeWindow.displayBetterURLs = function(cntr,msgid,UserId,spanContent,userName,email,currPlace,title,date,imgLink,urlLink,urlName,urlLink1,urlName1,displayEmail,forum_type){
NumOfMessages++

    unsafeWindow.msgID[cntr]="<table border='0' cellpadding='0' cellspacing='0'><tr><td><img src=/Forum/'../hasite/images/0.gif' width='15' height='1' border='0'></td><td align='right'>";


     unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + "<span class='t13B'>&#1499;&#1493;&#1514;&#1512;&#1514;:&nbsp;" + title +"</span>";

     unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + "<br><span class='t12B'>&#1514;&#1488;&#1512;&#1497;&#1498;:&nbsp;" + date +"</span>";

     unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + "<br><span class='t12B'>&#1513;&#1501;:&nbsp;" + userName +"</span>";

    if(displayEmail == 'Y') {
         unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + "<br><span class='t12B'>&#1491;&#1493;&#1488;\"&#1500;:&nbsp;" + email +"</span>";
      }
    if(spanContent != 'null')
     {
       	 unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + "<br><br><span class='t12'>" + spanContent +"</span><br><br>";
     }
    else
     {
       unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + "<br><br><br><br>";
     }

  if(imgLink != 'none')
    {
     unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + "<a href=" + imgLink + " >&#1500;&#1508;&#1514;&#1497;&#1495;&#1514; &#1511;&#1493;&#1489;&#1509; &#1502;&#1510;&#1493;&#1512;&#1507;</a>";
    }

if(urlLink != 'none')
    {
     unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + "<br><span class='t12'>&#1488;&#1514;&#1512;&#1497;&#1501; &#1511;&#1513;&#1493;&#1512;&#1497;&#1501;:</span><a href= '" + urlLink + "' class=t12ULinkBl>";
      if (urlName != 'none')
           unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + urlName +"</a>";
      else
           unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + urlLink +"</a>";
    }

if(urlLink1 != 'none')
   {
     unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + "<br><span class='t12'>&#1488;&#1514;&#1512;&#1497;&#1501; &#1511;&#1513;&#1493;&#1512;&#1497;&#1501;:</span><a href= '" + urlLink1 + "' class=t12ULinkBl>";
      if (urlName1 != 'none')
           unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + urlName1 +"</a>";
      else
           unsafeWindow.msgID[cntr]=  unsafeWindow.msgID[cntr] + urlLink1 +"</a>";
   }
 	 unsafeWindow.msgID[cntr] =  unsafeWindow.msgID[cntr] + "<br><br>";
     unsafeWindow.msgID[cntr] =  unsafeWindow.msgID[cntr] + "</td></tr></table>";

	 unsafeWindow.msgID[cntr] =  unsafeWindow.msgID[cntr] + "<table width='100%' align='center' border='0' bgcolor='#fdef0a'  cellspacing='0' height='20'><tr><td align='right' valign='baseline' class='t11'>";

	 unsafeWindow.msgID[cntr] =  unsafeWindow.msgID[cntr] + "&nbsp;&nbsp;&nbsp;<a style='cursor:hand' onClick='doAddMess(\""+msgid+"\","+currPlace+","+forum_type+","+cntr+",\""+date+"\")' style='text-decoration:none' ><img src=/Forum/images/addMessage.gif width='15' height='15' border='0'> &#1492;&#1493;&#1505;&#1508;&#1514; &#1514;&#1490;&#1493;&#1489;&#1492; </a>&nbsp;&nbsp;&nbsp;&nbsp; <a style='cursor:hand' onClick='windowPrint();'><img src=/Forum/images/print.gif width='21' height='14' border='0'>&#1492;&#1491;&#1508;&#1505;&#1492;</a> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td align='left' class='t11'><a style='cursor:hand' onclick='show_msg(" + cntr + ",-1)' style='text-decoration:none'><img src=/Forum/images/closeMessage.gif width='19' height='10' border='0'> &#1505;&#1490;&#1493;&#1512; &#1492;&#1493;&#1491;&#1506;&#1492;</a>&nbsp;&nbsp;&nbsp;" +"</td></tr></table>";


}

function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }


function setupCaptainLinks()
{
    var allAElemens, theA;
	try
     	{
		allAElemens= document.evaluate(
			"//a[@href='/Forum/InsertMess.jhtml?fat=0&curp=1&ft=0']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		if (allAElemens.snapshotLength>=1)
		{
			theA = allAElemens.snapshotItem(0);
var html=""+
"<table width='70%' border='1' cellspacing='2'><tr>"+
"<td width='34%' align='center' dir='rtl'>"+
	"<a id='expandCollpassElementID' class='t12' href='javascript:expandCollaps(1);'>" +
	expandAllStr+"</a>" +
  //        "<a id='dixEndofinElemntID'      class='t12' href='javascript:fixEncoding();'>fixEncoding</a> "+
"</td>"+
"<td width='33%' align='center' dir='rtl'>"+
	"<a id='searchYourFriendElementID' href='javascript:searchYourFriends(1);' class='t12'> "+
	searchYorFriendsStr+"</a>" +
"</td>"+
"<td width='33%' align='center' dir='rtl'>"+
	"<a id='showPrefElementID' href='javascript:showPref(1)' class='t12' >" +
	showPrefStr +"</a>"+
"</td>"+
"</tr></table>";
		var div = document.createElement('td');
		div.innerHTML = html;
		div.setAttribute("bgcolor","#eaeaea");
		div.setAttribute("width","80%");
		theA.parentNode.parentNode.insertBefore(div, theA.parentNode);

		}
	}
	catch (exc)
	{
		  myLog(exc);
	}
	setupFriendsTable(theA.parentNode);


}

unsafeWindow.changeColor=function(index)
{
	addColorToDB(index, currentColorIndex);
	var friendNameElemnt=document.getElementById("FRIEND_"+index+"_NAME");
	defValueChanged = true;
	friendNameElemnt.setAttribute("style","background-color:"+colorPalate[currentColorIndex]+";");
}

unsafeWindow.changeName=function(index)
{
	var friendName = document.getElementById("nameToAddText").value;
	addFriendToDB(index, friendName);
	var friendNameElemnt=document.getElementById("FRIEND_"+index+"_NAME");
	friendNameElemnt.innerHTML=friendsName[index];
	defValueChanged = true;
}



unsafeWindow.removeFriend=function(index)
{
	addColorToDB(index, -1);
	addFriendToDB(index, "");
	var friendNameElemnt=document.getElementById("FRIEND_"+index+"_NAME");
	friendNameElemnt.innerHTML=friendsName[index];
	friendNameElemnt.setAttribute("style","background-color:white;");
}

function setupFriendsTable(whereToPut)
{
	prefHtml =""+
"<table style=\"text-align: right; width: 620; \" "+
"border=\"1\" cellpadding=\"1\" cellspacing=\"1\"> "+
"<tr> "+
"<td dir='rtl' style=\"width: 15%; vertical-align: top;\"> "+
""+chooseColorStr+"<br>"+
"<table style=\"width: 100%; text-align: right;\" border=\"1\" "+
"cellpadding=\"2\" cellspacing=\"2\"> "+
"<tr> "+
"<td style=\"vertical-align: top; background-color: "+colorPalate[0]+";\" "+
"onclick=\"javascript:colorChoosed(0)\"><br> "+
"</td> "+
"<td style=\"vertical-align: top; background-color: "+colorPalate[1]+";\" "+
"onclick=\"javascript:colorChoosed(1)\"><br> "+
"</td> "+
"</tr> "+
"<tr> "+
"<td style=\"vertical-align: top; background-color: "+colorPalate[2]+";\" "+
"onclick=\"javascript:colorChoosed(2)\"><br> "+
"</td> "+
"<td style=\"vertical-align: top; background-color: "+colorPalate[3]+";\" "+
"onclick=\"javascript:colorChoosed(3)\"><br> "+
"</td> "+
"</tr> "+
"<tr> "+
"<td style=\"vertical-align: top; background-color: "+colorPalate[4]+";\" "+
"onclick=\"javascript:colorChoosed(4)\"><br> "+
"</td> "+
"<td style=\"vertical-align: top; background-color: "+colorPalate[5]+";\" "+
"onclick=\"javascript:colorChoosed(5)\"><br> "+
"</td> "+
"</tr> "+
"<tr> "+
"<td style=\"vertical-align: top; background-color: "+colorPalate[6]+";\" "+
"onclick=\"javascript:colorChoosed(6)\"><br> "+
"</td> "+
"<td style=\"vertical-align: top; background-color: "+colorPalate[7]+";\" "+
"onclick=\"javascript:colorChoosed(7)\"><br> "+
"</td> "+
"</tr> "+
"<tr> "+
"<td style=\"vertical-align: top; background-color: "+colorPalate[8]+";\" "+
"onclick=\"javascript:colorChoosed(8)\"><br> "+
"</td> "+
"<td style=\"vertical-align: top; background-color: "+colorPalate[9]+";\" "+
"onclick=\"javascript:colorChoosed(9)\"><br> "+
"</td> "+
"</tr> "+
"</table> "+
"<br> "+
"<table style=\"width: 100%; text-align: right;\" border=\"1\" "+
"cellpadding=\"2\" cellspacing=\"2\"> "+
"<tr> "+
"<td id=\"pickedColorArea\" style=\"vertical-align: top; background-color: "+colorPalate[0]+";\"  >"+
"<br> "+
"</td> "+
"</tr> "+
"</table> "+
"<br> "+
"<br> "+
""+nameToAddStr+""+
"<form action=\"destination_url\" method=\"get\"> "+
"<input size=\"10\" name=\"nameToAdd\" id=\"nameToAddText\"></form> "+
"<br> "+
"</td> "+
"<td style=\"width: 55; vertical-align: top;\"> "+
"<table style=\"text-align: right; width: 100%;\" border=\"1\" "+
"cellpadding=\"2\" cellspacing=\"2\"> "+
"<tr> "+
"<td style=\"vertical-align: top; text-align: center;\">"+numberTitleStr+"<br> "+
"</td> "+
"<td style=\"vertical-align: top; text-align: center;\">"+nameTitleStr+"<br> "+
"</td> "+
"<td style=\"vertical-align: top; text-align: center;\">"+actionTitleStr+"<br> "+
"</td> "+
"</tr> "+

"<tr id='FRIEND_0_LINE'> "+
"<td style=\"vertical-align: top; text-align: center;\">1</td> "+
"<td id='FRIEND_0_NAME' style=\"width: 30%; vertical-align: top; text-align: right;\"></td> "+
"<td style=\"vertical-align: top; text-align: center;\"> <table width='100%' ><tr>"+
	"<td align='center'><a href=\"javascript:changeName(0)\">"+changeNameStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:changeColor(0)\">"+changeColorStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:removeFriend(0)\">"+removeStr+"</a></td> "+
"</tr></table></td> "+
"</tr> "+

"<tr id='FRIEND_1_LINE'> "+
"<td style=\"vertical-align: top; text-align: center;\">2</td> "+
"<td id='FRIEND_1_NAME' style=\"width: 30%; vertical-align: top; text-align: right;\"></td> "+
"<td style=\"vertical-align: top; text-align: center;\"> <table width='100%' ><tr>"+
	"<td align='center'><a href=\"javascript:changeName(1)\">"+changeNameStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:changeColor(1)\">"+changeColorStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:removeFriend(1)\">"+removeStr+"</a></td> "+
"</tr></table></td> "+
"</tr> "+

"<tr id='FRIEND_2_LINE'> "+
"<td style=\"vertical-align: top; text-align: center;\">3</td> "+
"<td id='FRIEND_2_NAME' style=\"width: 30%; vertical-align: top; text-align: right;\"></td> "+
"<td style=\"vertical-align: top; text-align: center;\"> <table width='100%' ><tr>"+
	"<td align='center'><a href=\"javascript:changeName(2)\">"+changeNameStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:changeColor(2)\">"+changeColorStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:removeFriend(2)\">"+removeStr+"</a></td> "+
"</tr></table></td> "+
"</tr> "+

"<tr id='FRIEND_3_LINE'> "+
"<td style=\"vertical-align: top; text-align: center;\">4</td> "+
"<td id='FRIEND_3_NAME' style=\"width: 30%; vertical-align: top; text-align: right;\"></td> "+
"<td style=\"vertical-align: top; text-align: center;\"> <table width='100%' ><tr>"+
	"<td align='center'><a href=\"javascript:changeName(3)\">"+changeNameStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:changeColor(3)\">"+changeColorStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:removeFriend(3)\">"+removeStr+"</a></td> "+
"</tr></table></td> "+
"</tr> "+

"<tr id='FRIEND_4_LINE'> "+
"<td style=\"vertical-align: top; text-align: center;\">5</td> "+
"<td id='FRIEND_4_NAME' style=\"width: 30%; vertical-align: top; text-align: right;\"></td> "+
"<td style=\"vertical-align: top; text-align: center;\"> <table width='100%' ><tr>"+
	"<td align='center'><a href=\"javascript:changeName(4)\">"+changeNameStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:changeColor(4)\">"+changeColorStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:removeFriend(4)\">"+removeStr+"</a></td> "+
"</tr></table></td> "+
"</td> "+
"</tr> "+

"<tr id='FRIEND_5_LINE'> "+
"<td style=\"vertical-align: top; text-align: center;\">6</td> "+
"<td id='FRIEND_5_NAME' style=\"width: 30%; vertical-align: top; text-align: right;\"></td> "+
"<td style=\"vertical-align: top; text-align: center;\"> <table width='100%' ><tr>"+
	"<td align='center'><a href=\"javascript:changeName(5)\">"+changeNameStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:changeColor(5)\">"+changeColorStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:removeFriend(5)\">"+removeStr+"</a></td> "+
"</tr></table></td> "+
"</td> "+
"</tr> "+

"<tr id='FRIEND_6_LINE'> "+
"<td style=\"vertical-align: top; text-align: center;\">7</td> "+
"<td id='FRIEND_6_NAME' style=\"width: 30%; vertical-align: top; text-align: right;\"></td> "+
"<td style=\"vertical-align: top; text-align: center;\"> <table width='100%' ><tr>"+
	"<td align='center'><a href=\"javascript:changeName(6)\">"+changeNameStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:changeColor(6)\">"+changeColorStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:removeFriend(6)\">"+removeStr+"</a></td> "+
"</tr></table></td> "+
"</td> "+
"</tr> "+

"<tr id='FRIEND_7_LINE'> "+
"<td style=\"vertical-align: top; text-align: center;\">8</td> "+
"<td id='FRIEND_7_NAME' style=\"width: 30%; vertical-align: top; text-align: right;\"></td> "+
"<td style=\"vertical-align: top; text-align: center;\"> <table width='100%' ><tr>"+
	"<td align='center'><a href=\"javascript:changeName(7)\">"+changeNameStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:changeColor(7)\">"+changeColorStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:removeFriend(7)\">"+removeStr+"</a></td> "+
"</tr></table></td> "+
"</td> "+
"</tr> "+

"<tr id='FRIEND_8_LINE'> "+
"<td style=\"vertical-align: top; text-align: center;\">9</td> "+
"<td id='FRIEND_8_NAME' style=\"width: 30%; vertical-align: top; text-align: right;\"></td> "+
"<td style=\"vertical-align: top; text-align: center;\"> <table width='100%' ><tr>"+
	"<td align='center'><a href=\"javascript:changeName(8)\">"+changeNameStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:changeColor(8)\">"+changeColorStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:removeFriend(8)\">"+removeStr+"</a></td> "+
"</tr></table></td> "+
"</td> "+
"</tr> "+

"<tr id='FRIEND_9_LINE'> "+
"<td style=\"vertical-align: top; text-align: center;\">10</td> "+
"<td id='FRIEND_9_NAME' style=\"width: 30%; vertical-align: top; text-align: right;\"></td> "+
"<td style=\"vertical-align: top; text-align: center;\"> <table width='100%' ><tr>"+
	"<td align='center'><a href=\"javascript:changeName(9)\">"+changeNameStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:changeColor(9)\">"+changeColorStr+"</a></td> "+
	"<td align='center'><a href=\"javascript:removeFriend(9)\">"+removeStr+"</a></td> "+
"</tr></table></td> "+
"</td> "+
"</tr> "+

"</table> "+
"</td> "+
"<td style=\"width: 30%; vertical-align: top;\"> "+
"<table width='100%' border='0'> "+
"<tr align='center'> "+
""+defValuesStr+""+
"</tr> "+
"<tr > "+
"<br> "+
"<input type='checkbox' id='checkBox_0' "+
"onclick='javascript:defaultValueChanged(0)'>&nbsp;&nbsp;"+defSearchStr+"<br> "+
"<br> "+
"<input type='checkbox' id='checkBox_1' "+
"onclick='javascript:defaultValueChanged(1)'>&nbsp;&nbsp;"+defExpandStr+"<br> "+
"<br> "+
"<input type='checkbox' id='checkBox_2' "+
"onclick='javascript:defaultValueChanged(2)'>&nbsp;&nbsp;"+defShowLTStr+"<br> "+
"<br> "+
"<input type='checkbox' id='checkBox_3' "+
"onclick='javascript:defaultValueChanged(3)'>&nbsp;&nbsp;"+defShowResponds+"<br> "+
"<br> "+
"<input type='checkbox' id='checkBox_4' "+
"onclick='javascript:defaultValueChanged(4)'>&nbsp;&nbsp;"+defShowAddMessage+"<br> "+
"<br> "+
"<input type='checkbox' id='checkBox_5' "+
"onclick='javascript:defaultValueChanged(5)'>&nbsp;&nbsp;"+defMarkNewMessages+"<br> "+
"<br> "+
"<input type='checkbox' id='checkBox_6' "+
"onclick='javascript:defaultValueChanged(6)'>&nbsp;&nbsp;"+defDisableAutoRefresh+"<br> "+
"</tr> "+
"<tr> "+
"<td align='left' valign='bottom'>"+
"<br><br><br><br><br><br><br><br><br><br><br>"+VersionStr+"</td></tr>" +
"</td>"+
"</tr> "+
"</table> "
divPref = document.createElement("tr");
divPref.innerHTML = prefHtml;
divPref.setAttribute("style","display:none");
divPref.setAttribute("width","100%");

whereToPut.parentNode.parentNode.appendChild(divPref);
pickedColorArea = document.getElementById("pickedColorArea");

	for (var index = 0; index < numOfFriends; index++)
	{
		var friendNameElement=document.getElementById("FRIEND_"+(index)+"_NAME");
		friendNameElement.innerHTML=friendsName[index];
		//var line = document.getElementById("FRIEND_"+(index)+"_LINE");
		if ((friendsColor[index] >=0) && (friendsColor[index] < 10) &&
		    (friendsColor[index] != null)&& (friendsColor[index] != ""))

		{
		  friendNameElement.setAttribute("style","background-color:"+colorPalate[friendsColor[index]]+";");
		}
	}
	for (var index = 0; index < numOfDefValues; index++)
	{
		try
		{
			if (defaultValues[index]=="true")
			{
				var check = document.getElementById("checkBox_"+index);
				check.setAttribute("checked","true");
			}
		}
		catch (exc)
		{
		  myLog(exc);
		}
	}

}

unsafeWindow.colorChoosed=function(index)
{
	currentColorIndex = index;
	pickedColorArea.setAttribute("style","vertical-align: top;"+ "background-color:"+colorPalate[index]+";");

}
	function isMessageNull(id) {
		try
		{
		  var x = unsafeWindow.msgID[id];
			var y = x.indexOf("<span class=\"t12\">");
			if ( y == -1 ) {
				y = x.indexOf("<span class='t12'>");
			}
			// Check if there is a added file alone
			if (y == -1 ) {
				y = x.indexOf("href");
			}

			if (y == -1 ) {
				return true;
			} else {
				return false;
			}
		}
		catch (exc)
		{
		  myLog(exc);
		}
	}

function addNoDataMark(flag)
{
	//var theStyle = "color:#ff0000;font-family:Arial;font-size:12px";
	var ID;
	//for(ID=1;ID<=NumOfMessages+1;ID++)
	for(ID=1;ID<=60;ID++)
	{
		try
		{
			var isNull = isMessageNull(ID);
			addNoDataMark(ID, isNull && flag);
		}
		catch (exc)
		{
		  myLog(exc);

		}
	}
	
	// Ths function check if the element with the given id number has empty data

	// this function adds a no data mark to the message with the given id
	function addNoDataMark(id, shouldaddNoDataMark) {
		// Get the element
		var element = document.getElementById("subj"+id);

		// get the parent and the next sibling ( span-td-tr)
		var td = element.parentNode.nextSibling;
		var tr = element.parentNode.parentNode;

		// create the no data span
		var span = document.createElement("span");
		span.setAttribute("class","NO_DATA_CLASS");
		if (shouldaddNoDataMark)
		{
			span.innerHTML=noDataStr;
		}

		// create the td element
		var newTd = document.createElement("td");
		newTd.setAttribute("align","left");
		newTd.setAttribute("valign","top");
		newTd.setAttribute("width","5%");
		newTd.appendChild(span);
		tr.insertBefore(newTd,td);
	}
	

};

function argItems (theArgName)
{
	sArgs = location.search.slice(1).split('&');
    r = '';
    for (var i = 0; i < sArgs.length; i++) {
        if (sArgs[i].slice(0,sArgs[i].indexOf('=')) == theArgName) {
            r = sArgs[i].slice(sArgs[i].indexOf('=')+1);
            break;
        }
    }
    return (r.length > 0 ? unescape(r).split(',') : '')
}


function newCheckForm()
{

}


function fixInsertMsg()
{
  try
  {  
    if (argItems("fat")=="0")
    {
      setPersisData("ORIG_MSG_ID","");
      setPersisData("ORIG_MSG_DATE","");
    } 
	var msgID1 = getPersisData("ORIG_MSG_ID");


	if (msgID1 != "")
	  {
	    var divElement = document.createElement("div");
	    divElement.setAttribute("align","center");
	    divElement.setAttribute("dir","RTL");
	    divElement.innerHTML = "<br>"+respondsToStr+"</br><iframe id=\"OrigMsgIframe\"  name=\"OrigMsgIframe\" SCROLLING=AUTO FRAMEBORDER=0 width=800 height=300 src='http://www.haaretz.co.il/captain/pages/ForumMessage.jhtml?msgId="+msgID1+"'><a href='kuku'><iframe>";

	   document.body.insertBefore(divElement, document.body.firstChild);

	   var iframeElement = document.getElementById("OrigMsgIframe");


	   iframeElement.contentWindow.unsafeWindow.addEventListener("load", function () {
	          var elements = document.evaluate(
				    '//HTML/BODY/TABLE',
				    iframeElement.contentWindow.document,
				    null,
				    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				    null);
	
		  var trElm =elements.snapshotItem(0);
		  trElm.parentNode.removeChild(trElm);
		  elements = document.evaluate(
				    '//HTML/BODY/TABLE/TBODY/TR/TD[3]',
				    iframeElement.contentWindow.document,
				    null,
				    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				    null);
		  trElm =elements.snapshotItem(0);
		  trElm.parentNode.removeChild(trElm);
		  var origMSGDate = getPersisData("ORIG_MSG_DATE");
		  if (origMSGDate != "")
		  {
		     var allDates = document.evaluate(
				   "//td[@width='16%']",
				    iframeElement.contentWindow.document,
				    null,
				    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				    null);
		     try
		     {
		       for (var i=0; i < allDates.snapshotLength; i++)
			 {
			   if (allDates.snapshotItem(i).innerHTML==origMSGDate)
			     {
			       iframeElement.contentWindow.show_msg(i+1);
			     }
			 }  
		     }
		     catch (exc)
		     {
		       myLog(exc);
		     }
		  } 

	    }, false);
	  }
	}
	catch (exc)
	{
		  myLog(exc);
	}

	try
	{
	  var allSubmiters = document.evaluate(
                                        '//*[@onSubmit]',
                                       document,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                       null); 
	  for (var i = 0; i < allSubmiters.snapshotLength; i++)
	  {
	    allSubmiters.snapshotItem(i).setAttribute("onSubmit","return GMNewOnSubmit()");
	  }
	}
	catch (exc)
	{
	  myLog(exc);
	}
}

unsafeWindow.GMNewOnSubmit = function()
{
  var res = true;
  try
  {  
    setPersisData("ORIG_MSG_ID","");
    setPersisData("ORIG_MSG_DAT","");
    do
    {
      var allScripts = document.evaluate(
                                        '//script',
                                       document,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                       null);

      if (allScripts.snapshotLength<= 0)
      {
	break;
      }
      var scriptElement = allScripts.snapshotItem(0);
      var scriptStr = scriptElement.innerHTML;
      var index1 = scriptStr.indexOf("if(document.AddForm.fileName.value");
      if (index1 < 0)
      {
	break;
      }
      var index2 =  scriptStr.indexOf("/*", index1);
      if (index2 < 0)
      {
	break;
      }
      scriptStr = scriptStr.substring(0,index1-1)+" "+scriptStr.substring(index2,scriptStr.length);
      //      var newScr = window._content.document.createElement("script");
      var newScr = document.createElement("script");

      newScr.innerHTML = scriptStr;
      scriptElement.parentNode.insertBefore(newScr,scriptElement);


      res = checkForm();
    }while(false);
  }
  catch (exc)
  {
    myLog(exc);
    return false;
  }
  return (res!=false);
}

function beginTheURLFix()
{
	try
	{
		var all_scripts, this_script, replaceUrl;
		initColorPalateAndNames();
		setupCaptainLinks();
		for (var index = 0; index < numOfColors; index++)
		{
			addGlobalStyle(".FIND_FRIEND_"+index+"_CLASS {background-color :  "+colorPalate[index]+";  font-size: 12px; font-weight: normal; font-family: Arial} ");
			addGlobalStyle(".FIND_FRIEND_"+index+"_BOLD_CLASS {  background-color : "+colorPalate[index]+";  font-size: 12px; font-weight: bold; font-family: Arial} ");

		}
	addGlobalStyle(".NO_DATA_CLASS {font-size: 12px; font-weight: normal; font-family: Arial; color:#ff0000} ");

	
	var tables = document.evaluate("//tbody/tr/td[1]/div/table", document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	if ((tables == null) || (tables.snapshotLength < 3))
	{
		NumOfMessages = 60;
	}
	else
	{
		NumOfMessages = tables.snapshotLength - 3;
	}
	
	all_scripts = document.evaluate(
		"//script",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	var f = false;
	for (var i = 0; i < all_scripts.snapshotLength; i++)
	{
	  try
	  {
	    this_script = all_scripts.snapshotItem(i);
	    if (this_script.text.substr(0,14)=="DispalyMessage")
	    {
	      var elm = document.createElement("script");
		      
	      elm.innerHTML =  "displayBetterURLs"+this_script.text.substr(14);
	      this_script.insertBefore(elm, this_script.firstChild);
	    }
	    if (this_script.text.substr(0,15)=="\nSubjectMessage")
	    {
	      var elm = document.createElement("script");
	      elm.innerHTML =  "\nSubjectMessagePlus"+this_script.text.substr(15);
	      this_script.insertBefore(elm, this_script.firstChild)
	    }
	  }
	  catch (exc)
	  {
	    myLog(exc);
	  }
	}
	
	
	if (defaultValues[2]=="true")
	{
	  addNoDataMark(1);
	}
	else
	{
	  addNoDataMark(0);
	}
	if (defaultValues[0]=="true")
	{
	  unsafeWindow.searchYourFriends(1);
	}
	if (defaultValues[1]=="true")
	{
	  unsafeWindow.expandCollaps(1);
	}
	if (defaultValues[6]=="true")
	{
	  disbaleRefresh();
	}
	lastVisitedDate = new Date(getPersisData("LAST_VISITED"));
	myLog("update last visited time "+new Date());
	setPersisData("LAST_VISITED",new Date());
}
catch (exc)
{
  myLog(exc);
}

if (location.href.indexOf("InsertMess") != -1)
{
	fixInsertMsg();
}
else
{

}


}


function disbaleRefresh()
{
	try
	{
	  var results = document.evaluate(
			"//meta[@http-equiv='Refresh']",
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
			if (results.snapshotLength >= 1)
		        {
			  metaRefresh = results.snapshotItem(0);
			  var n = metaRefresh.content;
			  myLog("disabel auto refresh "+metaRefresh+" content = "+n);
			  var stopTimer = unsafeWindow.setTimeout("unsafeWindow.stop();", (n-1)*1000); 
			  unsafeWindow.addEventListener("load", function(){
			   try 
			   { 
			     unsafeWindow.clearTimeout(stopTimer); 
			   } catch(ex) {}
			   unsafeWindow.stop();
			 }, true);
			}

	}
	catch (exc)
	{
		myLog(exc);
	}
}


beginTheURLFix();


})();
