// ==UserScript==
// @name        old.health.gov.il Forums
// @namespace   http://meirkriheli.com/old.health
// @description Expand www.old.health.gov.il Forums
// @include     http://www.old.health.gov.il/forums/*
// @grant	GM_log
// @version     1
// ==/UserScript==

var currDispID;
var keySwitch=0;
var layerSwitch=-1;

unsafeWindow.disp = function(id, newClass) {
	var TdSubjectName,TdUserName,TdTimeName,TdDateName,TdContentName;
	TdSubjectName="MsgSubject"+id;
	TdUserName="MsgUserName"+id;
	TdTimeName="MsgTime"+id;
	TdDateName="MsgDate"+id;
	TdContentName="MsgContentTD"+id;

	document.getElementById(TdSubjectName).className=newClass;
	document.getElementById(TdUserName).className=newClass;
	document.getElementById(TdTimeName).className=newClass;
	document.getElementById(TdDateName).className=newClass;

	if(currDispID!="")
		if(!isNaN(currDispID))
			unsafeWindow.hideContents(currDispID);
	if ((keySwitch==0 && layerSwitch==id) || layerSwitch!=id)
	{
		currdiv="MsgContent"+id;
		document.getElementById(currdiv).style.display="table-row";
		unsafeWindow.showObject(currdiv);
		keySwitch=1;
		currDispID=id;
	}
	else
	{
		keySwitch=0;
		layerSwitch=-1;
	}
	layerSwitch=id;
}


unsafeWindow.showObject = function(div)
{
	document.getElementById(div).style.visibility = "visible";
}

unsafeWindow.hideObject = function(div)
{
	document.getElementById(div).style.display = "none";
}


