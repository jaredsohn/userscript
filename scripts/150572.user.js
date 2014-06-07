// inbox username fetcher addon for leprosorium.ru
// version 0.2c
// Copyright (c) 2012, v0rbis inspired by karmadroch script
// inspiration source is http://userscripts.org/scripts/show/97086
// Released under the GPL license
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Inbox username fetcher
// @description leprosorium.ru inbox alive/active/banned user fetcher
// @ujs:category site: automation
// @ujs:documentation n/a
// @ujs:download n/a
// @include        http://leprosorium.ru/my/inbox/*
// @include        http://www.leprosorium.ru/my/inbox/*
// ==/UserScript==


function sort_users(a,b){
		return (a.username < b.username) ? -1 : 1;
}

function unique_users(arr) {  
     var ret = [arr[0]];  
     if(arr.length<2) return ret;

     for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate  
         if (arr[i-1].username !== arr[i].username) {  
             ret.push(arr[i]);  
         }  
     }  
     return ret;  
 }  


function Match(text, pattern){
	var m = text.match(pattern);
	if (m == null) 
		return null;
	return m[1];
}

xpathOneEx = function(query, root) {
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
xpathOne = function(query) {
    return xpathOneEx(query, document);
}
xpathMany = function(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

addButton = function(onClick) {
	var elButton = document.createElement('div');
	var elButton1 = document.createElement('div');
	elButton.innerHTML = "<br/><select id='fetchAction'><option value='0'>собрать живчиков</option><option value='1'>показать с доступом</option><option value='2'>банный лист</option></select><a style='margin-left:2px' href='' onclick='return false;'>выполнить!</a>";
	elButton.childNodes[2].addEventListener("click", onClick, false);
	panel = xpathOne('//*[@class="inbox-tools-static"]')
	panel.appendChild(elButton);
	elButton1.innerHTML = '<br/><textarea id="fetchedUsernames" wrap="hard" readonly="yes" cols=34 rows=10 style="font-size:9px"></textarea>';
	panel.appendChild(elButton1);


}

function getActive() {

	var comments = xpathMany("//div[@id='js-commentsHolder']/div[contains(@class,'post')]");

	var ret = Array();
	var cnt = 0;

	for (var i = 0; i < comments.snapshotLength; i++) 
	{
		var elm = comments.snapshotItem(i);
		var username = xpathOneEx("div//div[@class='p']/a", elm);
		if(username == null) continue;
		
		ret[cnt] = {'username': username.innerHTML};
		cnt++;
	}

	return ret;
}

function getAccessed() {

	var users = xpathMany("//div[@class='js-inboxPeople']/div[@class='js-inboxPerson']");

	var ret = Array();
	var cnt = 0;

	for (var i = 0; i < users.snapshotLength; i++) 
	{
		var elm = users.snapshotItem(i);
		if(elm == null) continue;

		var username = xpathOneEx("a[@class='js-inboxPerson-name']/span[not(contains(@class,'irony'))]", elm);

		if(username == null) continue;

		ret[cnt] = {'username': username.innerHTML};
		cnt++;
	}

	return ret;
}

function getBanned() {

	var users = xpathMany("//div[@class='js-inboxPeople']/div[@class='js-inboxPerson']");

	var ret = Array();
	var cnt = 0;

	for (var i = 0; i < users.snapshotLength; i++) 
	{
		var elm = users.snapshotItem(i);
		if(elm == null) continue;

		var username = xpathOneEx("a[@class='js-inboxPerson-name']/span[contains(@class, 'irony')]", elm);
		if(username == null) continue;

		ret[cnt] = {'username': username.innerHTML};

		cnt++;
	}

	return ret;
}

mumboJumbo = function() {

	var e = document.getElementById("fetchAction");
	var action = parseInt(e.options[e.selectedIndex].value, 10);
	var users = "";
	var obj = Array();

	document.getElementById('fetchedUsernames').value = '';


	switch(action)
	{
		case 1: 
			obj = getAccessed(); 
			break;

		case 2: 
			obj = getBanned();
			break;
		
		case 0:
			obj = getActive();
			break;
	}

	
	obj = unique_users(obj.sort(sort_users));

  	for (i = 0; i < obj.length; ++i) {
		users += obj[i].username + ', ';
	}

	if(users != '')
	{
		users = users.replace(/(<([^>]+)>)/ig,"");
		users = users.substr(0, users.length - 2);	
	} 

	document.getElementById('fetchedUsernames').value = users;

	return false;

}

addButton(mumboJumbo);
