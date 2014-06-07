// ==UserScript==

// @name           What.CD: Highlight your invitees

// @namespace      what.cd

// @description    What.CD: Highlight your invitees

// @include        http://what.cd/*

// @include        https://ssl.what.cd/*

// ==/UserScript==





//config



var colour = "red"; //change this if you want a different highlight colour.



var profileonly = "false"; //change to true if you only want the highlight in the profile of the invitee.





if (document.location.pathname == '/user.php' && document.location.href.indexOf('?action=invite') != -1) {



	ownUsername = document.getElementById('userinfo_username').firstChild.nextSibling.firstChild.innerHTML;



	arrayOfAllLinks = document.getElementById('content').getElementsByTagName('a');

	arrayOfUserNames = new Array();

	for (x in arrayOfAllLinks) {

		if(arrayOfAllLinks[x].href.indexOf('user.php?id') != -1) {


			if(arrayOfAllLinks[x].innerHTML != ownUsername) {







				arrayOfUserNames.push(arrayOfAllLinks[x].innerHTML);



			}



		}



	}







	userNamesString = '';







	for (y in arrayOfUserNames) {







		userNamesString += arrayOfUserNames[y] + '##SPL##';



	}







	GM_setValue('userList', userNamesString.substring(0, userNamesString.length - 7));







} else {



	arrayOfUserNames = GM_getValue('userList', '').split('##SPL##');



	newhtml = document.body.innerHTML;







	if (arrayOfUserNames != '') {







	for(z in arrayOfUserNames) {







		regexp = new RegExp("<h2>"+arrayOfUserNames[z], 'gm');//profiles



		regexp2 = new RegExp('\">'+arrayOfUserNames[z]+'</a>', 'gm');//forumposts

var loc = location.href.split('/')[3].split('=')[0];





if (loc == "user.php?id") { //user profile

		newhtml = newhtml.replace(regexp, "<h2>"+'<font color="'+colour+'">' + arrayOfUserNames[z] + '</font>');

}

if (profileonly == "false") {

if (loc == "forums.php?action") { //forum posts



		newhtml = newhtml.replace(regexp2, '\">'+'<font color="'+colour+'">'+arrayOfUserNames[z]+'</font>'+'</a>');



}

else if (loc == "userhistory.php?action") { //post history



		newhtml = newhtml.replace(regexp2, '\">'+'<font color="'+colour+'">'+arrayOfUserNames[z]+'</font>'+'</a>');



}

else if (loc == "comments.php?id") { //comment history



		newhtml = newhtml.replace(regexp2, '\">'+'<font color="'+colour+'">'+arrayOfUserNames[z]+'</font>'+'</a>');



}

else if (loc == "torrents.php?id") { //torrent comments



		newhtml = newhtml.replace(regexp2, '\">'+'<font color="'+colour+'">'+arrayOfUserNames[z]+'</font>'+'</a>');



}

else if (loc == "forums.php") { //forum front page



		newhtml = newhtml.replace(regexp2, '\">'+'<font color="'+colour+'">'+arrayOfUserNames[z]+'</font>'+'</a>');



}

}



	}







	document.body.innerHTML = newhtml;







}







}