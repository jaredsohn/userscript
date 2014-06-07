// ==UserScript==
// @name                        ElaKiri Post New Thread
// @namespace                   ElaKiri.com
// @description                 Adds new menu to post new threads from anywhere
// @author                      Ranhiru
// @version                     v0.0.3
// @include                     http://*.elakiri.*
// ==/UserScript==



//Beautifying all the links....
var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href=starts-with(name(),www.elakiri.com)]',  //a[@href=contains(name(),'www.elakiri.com')]   ////a[@href]  //*[starts-with(name(),'B')]
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	//removing all the underlines
    thisLink.style.textDecoration = 'none';
}


var cometchat2;

cometchat2 = document.getElementById('cometchat_trayicon_2');

if (cometchat2)
{


	var newPost6;
	
	newPost = document.createElement('div');
	newPost.className = 'cometchat_trayicon';
	newPost.id = 'cometchat_trayicon_3';
	newPost.innerHTML = '<a href="http://www.elakiri.com/forum/newthread.php?do=newthread&f=17" target="_blank"> ElaKiri Computer News </a>';
	
	cometchat2.parentNode.insertBefore(newPost, cometchat2.nextSibling);
	
//////////////////////////////////////////////////////////////////////////	
    var newPost;
	
	newPost = document.createElement('div');
	newPost.className = 'cometchat_trayicon';
	newPost.id = 'cometchat_trayicon_3';
	newPost.innerHTML = '<a href="http://www.elakiri.com/forum/newthread.php?do=newthread&f=49" target="_blank"> ElaKiri Chat! </a>';
	
	cometchat2.parentNode.insertBefore(newPost, cometchat2.nextSibling);
///////////////////////////////////////////////////////////////////////////

	var NewPost2;
	newPost2 = document.createElement('div');
	newPost2.className = 'cometchat_trayicon';
	newPost2.id = 'cometchat_trayicon_4';
	
	newPost2.innerHTML = '<a href="http://www.elakiri.com/forum/newthread.php?do=newthread&f=10" target="_blank"> ElaKiri News </a>';
	cometchat2.parentNode.insertBefore(newPost2, cometchat2.nextSibling);
//////////////////////////////////////////////////////////////////////////////


	var NewPost3;
	newPost3 = document.createElement('div');
	newPost3.className = 'cometchat_trayicon';
	newPost3.id = 'cometchat_trayicon_5';
	
	newPost3.innerHTML = '<a href="http://www.elakiri.com/forum/newthread.php?do=newthread&f=9" target="_blank"> ElaKiri Jokes </a>';
	cometchat2.parentNode.insertBefore(newPost3, cometchat2.nextSibling);

//////////////////////////////////////////////////////////////////////////////


	var NewPost4;
	newPost4 = document.createElement('div');
	newPost4.className = 'cometchat_trayicon';
	newPost4.id = 'cometchat_trayicon_6';
	
	newPost4.innerHTML = '<a href="http://www.elakiri.com/forum/newthread.php?do=newthread&f=8" target="_blank"> ElaKiri Help </a>';
	cometchat2.parentNode.insertBefore(newPost4, cometchat2.nextSibling);	

//////////////////////////////////////////////////////////////////////////////


	var NewPost5;
	newPost5 = document.createElement('div');
	newPost5.className = 'cometchat_trayicon';
	newPost5.id = 'cometchat_trayicon_7';
	
	newPost5.innerHTML = '<a href="http://www.elakiri.com/forum/newthread.php?do=newthread&f=7" target="_blank"> ElaKiri Talk </a>';
	cometchat2.parentNode.insertBefore(newPost5, cometchat2.nextSibling);	


}


//Check for new version
/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_93', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_93', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=93&version=0.0.3';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();

//Finish checking for new version




