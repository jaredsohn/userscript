// ==UserScript==
// @name           Imob.org
// @namespace      http://userscripts.org/scripts/show/43533
// @description    Imob.org wire cleaner
// @include        https://imob.org/mod/thewire/everyone.php*
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

/* 
Script by Brian Ballsun-Stanton. Public Domain. Let me know if you like it though. DenubisX. I use gmail.
iMob code: 152850873
*/

var friendList = [];


$(".note_body").each(function (){
	var friendmatch = /(\d{3,3})(?:\D?)(\d{3,3})(?:\D?)(\d{3,3})/g;
	var friendcode = friendmatch.exec($(this).text())
	if (friendcode != null){
		friendList.push(friendcode[1]+""+friendcode[2]+""+friendcode[3]);
	}
	
});



var defaultBlacklist = {"x150657832": 0};

var oldCodes = GM_getValue("friendCodeList",defaultBlacklist.toSource());
oldCodes = eval(oldCodes);
/*for (i in oldCodes)
	alert(i + " " + oldCodes[i]);
*/	
//first, we sort the friend list so that it's ordered. This makes de-duplicating *much* easier because we just have to check the element before.
friendList.sort();			

//now we de-dupe. In order to that, we make a filter function.

function deDupe(curValue, curIndex, curArray){
	if (curIndex == 0) 
		return true; //avoid array out of bounds
	return !(curValue == curArray[curIndex-1]); // if this one matches the last one, it's a dupe.
}

friendList = friendList.filter(deDupe);

var subtractList = {};

friendList.forEach(keyAsValueTrue);
for (i in oldCodes)
	subtractList[i] = 0;
	
for (i in subtractList)
	if (subtractList[i]==1)
		alert(i.substr(1,3)+"-"+i.substr(4,3)+"-"+i.substr(7,3));

for (i in subtractList){
	subtractList[i] = 0;	
	}

//alert(subtractList.toSource());
GM_setValue("friendCodeList",subtractList.toSource());
	
//alert(subtractList);

function keyAsValueTrue(curValue, curIndex, curArray){
	subtractList["x"+curValue] = 1;
}
function keyAsValueFalse(curValue, curIndex, curArray){
	subtractList["x"+curValue] = 0;
}
function isTrue(curValue, curIndex, curArray){
	return curValue;
}



