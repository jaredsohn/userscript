// ==UserScript==
// @name           NUEsers
// @namespace      NUEsers
// @description    Indicates users that are actually NUEsers on the LtUaE board.
// @include        http://www.gamefaqs.com/boards/402-*
// @include        http://www.gamefaqs.com/pm/*
// ==/UserScript==

var sFlair = "";
var bChange = true;
var bShowOld = false;

var hsUsers = new Array();
var asUsersOld = new Array();
var asUsersNew = new Array();
function vBuildList(s)
{
	var asUsers = s.split('\n');
	for ( var i = 0; i < asUsers.length; i++ )
	{
		var a = asUsers[i].split('\t');
		hsUsers[a[0]] = {"Old": a[1], "New": a[2]};
		asUsersOld.push(a[1]);
		asUsersNew.push(a[2]);
	}
	GM_setValue("sUsers", s);
}
var iTimestamp = Math.round(( new Date().getTime() / 1000 ));
if ( GM_getValue("iLoadTime", 0) == 0 || ( iTimestamp - GM_getValue("iLoadTime", iTimestamp) ) > 3600 )
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: "http://www.fubonis.com/ltuaestats/NewUserNames.txt",
		onload: function (o)
		{
			vBuildList(o.responseText);
			GM_setValue("iLoadTime", Math.round(( new Date().getTime() / 1000 )));
		}
	});
}
else
{
	vBuildList(GM_getValue("sUsers", ''));
}

function vTagUsers()
{
	var aRawInfo = document.getElementsByClassName("name");
	if ( aRawInfo.length > 1 )
	{
		for ( var i = 1; i < aRawInfo.length; i++ )
		{
			var iUserID = parseInt(aRawInfo[i].toString().replace(/^http:\/\/www\.gamefaqs\.com\/boards\/user\.php\?board=\d+&topic=\d+&user=(\d+)$/, "$1"));
			if ( iUserID > 888113 || hsUsers[iUserID] )
			{
				var o = document.createElement("span");
				o.innerHTML += sFlair;
				aRawInfo[i].parentNode.insertBefore(o, aRawInfo[i].nextSibling);
				if ( hsUsers[iUserID] && bChange == true )
				{
					aRawInfo[i].innerHTML = hsUsers[iUserID]["Old"];
				}
				if ( hsUsers[iUserID] && bShowOld == true )
				{
					aRawInfo[i].innerHTML += " (" + hsUsers[iUserID]["Old"] + ')';
				}
			}
		}
	}
	else
	{
		var oRows = document.getElementsByClassName("board topics")[0].rows;
		for ( var i = 1; i < oRows.length; i++ )
		{
			if ( oRows.item(i).cells.length < 5 )
			{
				continue;
			}
			if ( document.location.toString().match(/^http:\/\/www\.gamefaqs\.com\/pm\/.*?$/) )
			{
				oUsername = oRows.item(i).cells.item(1);
			}
			else
			{
				oUsername = oRows.item(i).cells.item(2).childNodes[0];
			}
			var iIndex = asUsersNew.indexOf(oUsername.innerHTML);
			if ( iIndex > -1 )
			{
				oUsername.innerHTML = ( ( ( bChange == true ) ? asUsersOld[iIndex] : asUsersNew[iIndex] ) + ( ( bShowOld == true ) ? " (" + asUsersOld[iIndex] + ')' : '' ) + sFlair );
			}
		}
	}
}

if ( sFlair.length == 0 )
{
	vTagUsers();
}
else
{
	window.addEventListener("load", vTagUsers, false);
}