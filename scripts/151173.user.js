// votes fetcher addon for leprosorium.ru
// version 0.1
// Copyright (c) 2012, v0rbis
// Released under the GPL license
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Votes fetcher
// @description leprosorium.ru psto voted user fetcher
// @ujs:category site: automation
// @ujs:documentation n/a
// @ujs:download n/a
// @include        http://*.leprosorium.ru/comments/*
// @include        http://leprosorium.ru/comments/*
// ==/UserScript==

xpathOneEx = function(query, root) {
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
xpathOne = function(query) {
    return xpathOneEx(query, document);
}

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


addButton = function(onClick) {
	var elButton = document.createElement('div');
	var elButton1 = document.createElement('div');
	elButton.innerHTML = "<br/><select id='attitudeType'><option value='1'>плюсаторы</option><option value='-1'>минусаторы</option></select><a style='margin-left:2px' href='' onclick='return false'>собрать!</a>";
	elButton.childNodes[2].addEventListener("click", onClick, false);	
	var panel = xpathOne('//*[@id="tags_add"]');
	panel.appendChild(elButton);
	elButton1.innerHTML = '<br/><textarea id="fetchedUsernames_votes" wrap="hard" readonly="yes" cols=34 rows=10 style="font-size:9px"></textarea>';
	panel.appendChild(elButton1);



}


function getPostId() 
{
	return commentsHandler.post_id;
}

muumbo = function() 
{
	document.getElementById('fetchedUsernames_votes').value = '';

	var json = "";
	var postId = getPostId();

	var req = new Request.JSON({async: false, method: 'post', url: "/votesctl", data: {id: postId, type: 1 }}).send();

	var json = req.response.json;

	if(json.status != "OK") return false;

	var e = document.getElementById("attitudeType");
	var attitude = parseInt(e.options[e.selectedIndex].value, 10);
	var users = "";
	var obj = Array();

	for(i = 0; i < json.votes.length; ++i)
	{
		if(json.votes[i].attitude * attitude > 0) obj.push({username: json.votes[i].login});
	}

	if(obj.length == 0) return false;

	obj = unique_users(obj.sort(sort_users));

  	for (i = 0; i < obj.length; ++i) 
	{
		users += obj[i].username + ', ';
	}

	if(users != '')
	{
		users = users.replace(/(<([^>]+)>)/ig,"");
		users = users.substr(0, users.length - 2);	
	} 

	document.getElementById('fetchedUsernames_votes').value = users;


	return false;
}


addButton(muumbo);

