// ==UserScript==
// @name           911wheel revamp
// @namespace       
// @description    An attempt to make Thomas blog looks better until the new website is up
// @include        http://www.911wheel.de/*
// @version	1.0
// @author		Madcat
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////////// FONCTIONS //////////////////////////////////////////////////////////////////////////////////////

function $(id) {
	return document.getElementById(id);
}

function currentPoster(j) {
	var contenuSubmit = postsComm[j].getElementsByClassName('submitted')[0].innerHTML;
	var k=18;
	var currentPosterName = '';
	while (k < (contenuSubmit.length-30)) {
	currentPosterName = currentPosterName+contenuSubmit.charAt(k); k++;
	}
	return currentPosterName
}

function forumReponses() {
	comm = $('comments')
	comm.style.marginLeft = '10px';
	comm.style.width = '600px';
	comm.style.borderColor = '#E2CDC0';
	comm.getElementsByClassName('comments')[0].style.backgroundColor = '#E2CDC0'
	postsComm = comm.getElementsByClassName('comment clear-block')
	
	for (var i = 0; i < postsComm.length; i++) {	
		if (i/2 == Math.round(i/2)) {
			postsComm[i].style.backgroundColor = '#A0A0A0';
			postsComm[i].getElementsByClassName('submitted')[0].style.backgroundColor = '#A0A0A0';
			postsComm[i].getElementsByClassName('links')[0].style.backgroundColor = '#A0A0A0';
			postsComm[i].getElementsByClassName('links')[0].style.borderColor = '#A0A0A0';
			
			if (postsComm[i].getElementsByClassName('first last comment_reply')[0]) {
				postsComm[i].getElementsByClassName('first last comment_reply')[0].style.backgroundColor = '#A0A0A0';
			}
			
			else {
				postsComm[i].getElementsByClassName('first comment_edit')[0].style.backgroundColor = '#A0A0A0';
				postsComm[i].getElementsByClassName('last comment_reply')[0].style.backgroundColor = '#A0A0A0';
			}
		}
		
		else {
			postsComm[i].style.backgroundColor = '#C0C0C0';
			postsComm[i].getElementsByClassName('submitted')[0].style.backgroundColor = '#C0C0C0';
			postsComm[i].getElementsByClassName('links')[0].style.backgroundColor = '#C0C0C0';
			postsComm[i].getElementsByClassName('links')[0].style.borderColor = '#C0C0C0';
			
			if (postsComm[i].getElementsByClassName('first last comment_reply')[0]) {
				postsComm[i].getElementsByClassName('first last comment_reply')[0].style.backgroundColor = '#C0C0C0';
			}
			
			else {
				postsComm[i].getElementsByClassName('first comment_edit')[0].style.backgroundColor = '#C0C0C0';
				postsComm[i].getElementsByClassName('last comment_reply')[0].style.backgroundColor = '#C0C0C0';
			}
		}
	}
	
	for (var i = 0; i < postsComm.length; i++) {
		postsComm[i].removeChild(postsComm[i].getElementsByTagName('H3')[0]);
		postsComm[i].getElementsByClassName('submitted')[0].style.cssFloat = 'none';
				
		if (currentPoster(i) == 'Thomas' || currentPoster(i) == 'Armin') {
			postsComm[i].style.backgroundColor = '#FFAE7D';
			postsComm[i].getElementsByClassName('submitted')[0].style.backgroundColor = '#FFAE7D';
			postsComm[i].getElementsByClassName('submitted')[0].style.color = 'darkblue';
			postsComm[i].getElementsByClassName('links')[0].style.backgroundColor = '#FFAE7D';
			postsComm[i].getElementsByClassName('links')[0].style.borderColor = '#FFAE7D';
			
			if (postsComm[i].getElementsByClassName('first last comment_reply')[0]) {
				postsComm[i].getElementsByClassName('first last comment_reply')[0].style.backgroundColor = 'black';
				postsComm[i].getElementsByClassName('first last comment_reply')[0].style.borderColor = 'black';
				postsComm[i].getElementsByClassName('first last comment_reply')[0].firstChild.style.color = '#FFAE7D';
			}
			
			else {
				postsComm[i].getElementsByClassName('first comment_edit')[0].style.backgroundColor = 'black';
				postsComm[i].getElementsByClassName('last comment_reply')[0].style.backgroundColor = 'black';
				postsComm[i].getElementsByClassName('first comment_edit')[0].style.borderColor = 'black';
				postsComm[i].getElementsByClassName('last comment_reply')[0].style.borderColor = 'black';
				postsComm[i].getElementsByClassName('first comment_edit')[0].firstChild.style.color = '#FFAE7D';
				postsComm[i].getElementsByClassName('last comment_reply')[0].firstChild.style.color = '#FFAE7D';
			}
		}
		
		if (currentPoster(i) == openingPosterName && currentPoster(i) != 'Thomas' && currentPoster(i) != 'Armin') {
			postsComm[i].style.backgroundColor = '#606060';
			postsComm[i].style.color = 'lightgray';
			postsComm[i].getElementsByClassName('submitted')[0].style.backgroundColor = '#606060';
			postsComm[i].getElementsByClassName('submitted')[0].style.color = '#FF9E3F';
			postsComm[i].getElementsByClassName('links')[0].style.backgroundColor = '#606060';
			postsComm[i].getElementsByClassName('links')[0].style.borderColor = '#606060';
			
			if (postsComm[i].getElementsByClassName('first last comment_reply')[0]) {
				postsComm[i].getElementsByClassName('first last comment_reply')[0].style.backgroundColor = '#606060';
				postsComm[i].getElementsByClassName('first last comment_reply')[0].style.borderColor = '#FCAA78';
				postsComm[i].getElementsByClassName('first last comment_reply')[0].firstChild.style.color = '#FCAA78';
			}
			
			else {
				postsComm[i].getElementsByClassName('first comment_edit')[0].style.backgroundColor = '#606060';
				postsComm[i].getElementsByClassName('last comment_reply')[0].style.backgroundColor = '#606060';
				postsComm[i].getElementsByClassName('first comment_edit')[0].style.borderColor = '#FCAA78';
				postsComm[i].getElementsByClassName('last comment_reply')[0].style.borderColor = '#FCAA78';
				postsComm[i].getElementsByClassName('first comment_edit')[0].firstChild.style.color = '#FCAA78';
				postsComm[i].getElementsByClassName('last comment_reply')[0].firstChild.style.color = '#FCAA78';
			}
		}
	}
}

function menuForum() {
	subject = document.getElementsByClassName('forum');
	topics = document.getElementsByClassName('topics');
	posts = document.getElementsByClassName('posts');
	lastPost = document.getElementsByClassName('last-reply');

	if (document.getElementsByClassName('container')[0]) {

		document.getElementsByClassName('container')[0].style.backgroundColor = 'black';
		document.getElementsByClassName('container')[0].getElementsByClassName('name')[0].firstChild.style.color = '#FF9555';
		document.getElementsByClassName('name')[0].style.height = '23px';
		document.getElementsByClassName('name')[0].innerHTML = '<td style="color: rgb(255, 149, 85); padding: 0; font-weight: bold;" href="/?q=forum/">Community Forum '+new Date().getFullYear()+'</td>';
		document.getElementsByClassName('name')[5].parentNode.style.marginLeft = '30px';
		document.getElementsByClassName('name')[5].innerHTML = '<a style="color: rgb(255, 155, 95);" href="/?q=forum/55">Games and Wheel settings</a>';


		document.getElementsByClassName('f-subject')[0].style.backgroundColor = '#F49054';
		document.getElementsByClassName('f-subject')[0].style.color = 'black';
		document.getElementsByClassName('f-subject')[0].style.textAlign = 'center';

		document.getElementsByClassName('f-topics')[0].style.backgroundColor = '#F49054';
		document.getElementsByClassName('f-topics')[0].style.color = 'black';
		document.getElementsByClassName('f-topics')[0].style.textAlign = 'center';

		document.getElementsByClassName('f-posts')[0].style.backgroundColor = '#F49054';
		document.getElementsByClassName('f-posts')[0].style.color = 'black';
		document.getElementsByClassName('f-posts')[0].style.textAlign = 'center';

		document.getElementsByClassName('f-last-reply')[0].style.backgroundColor = '#F49054';
		document.getElementsByClassName('f-last-reply')[0].style.color = 'black';
		document.getElementsByClassName('f-last-reply')[0].style.textAlign = 'center';

		for (var i = 0; i < subject.length; i++) {
			if (i/2 == Math.round(i/2)) {
				subject[i].style.backgroundColor = '#575757';
				topics[i].style.backgroundColor = '#575757';
				posts[i].style.backgroundColor = '#575757';
				lastPost[i].style.backgroundColor = '#575757';	
			}
			else {
				subject[i].style.backgroundColor = '#6F6F6F'	
				topics[i].style.backgroundColor = '#6F6F6F';
				posts[i].style.backgroundColor = '#6F6F6F';	
				lastPost[i].style.backgroundColor = '#6F6F6F';	
			}
		}
		
		for (var i = 0; i < subject.length; i++) {
			subject[i].getElementsByTagName('A')[0].style.color = '#FF9B5F';
			topics[i].style.color = 'lightgrey';
			if (topics[i].getElementsByTagName('A')[0]) { // s'il y a des nouvelles r�ponses
					topics[i].getElementsByTagName('A')[0].style.color = '#FF9B5F';
				}
			posts[i].style.color = 'lightgrey';
			lastPost[i].style.color = 'lightgrey';
		}
	}
}
	
function wholeSiteDisplay() {
	document.body.style.backgroundColor = '#FE843A';

	menu = document.getElementsByClassName('menu');
	//LiensMenu = menu.getElementsByTagName('LI');

	for (var i = 0; i < menu.length; i++) {
		menu[i].style.backgroundColor = '#E2CDC0';
		liensMenu = menu[i].getElementsByTagName('LI');
		for (j = 0; j < liensMenu.length; j++) {
			if (liensMenu[j].firstChild.className == 'active') {
				liensMenu[j].firstChild.style.color = '#BB212E'
			}
			else { 
				liensMenu[j].firstChild.style.color = 'black'
			}
		}
	}

	voletGauche = document.getElementsByClassName('left_content')[0];
	voletGauche.style.backgroundColor = '#E2CDC0';

	voletCentre = document.getElementsByClassName('body_content')[0];
	voletCentre.style.backgroundColor = '#E2CDC0';

	submitByThomas = document.getElementsByClassName('submitted');
	var i=0;
	while (submitByThomas[i]) {
		submitByThomas[i].style.backgroundColor = '#E2CDC0';
		submitByThomas[i].style.color = 'darkBlue';
		i++;
	}
}

function forum() {
	icon = document.getElementsByClassName('icon');
	topic = document.getElementsByClassName('topic');
	replies = document.getElementsByClassName('replies');
	replies[0].style.width = '80px';
		
	for (var i = 0; i < replies.length; i++) {
		replies[i].style.textAlign = 'left';
		if (replies[i].innerHTML.indexOf('node') != -1) {
			var j=0;
			var postCount = '';
			var newRepliesLink = '';
			while (replies[i].innerHTML.charAt(j) != '<') {j++;}
			postCount = replies[i].innerHTML.substring(0,j)
			newRepliesLink = replies[i].innerHTML.substring(j,replies[i].innerHTML.length);
			replies[i].innerHTML = postCount+' -'+newRepliesLink+'- ';
		}
	}

	for (var i = 0; i < icon.length; i++) {
		if (i/2 == Math.round(i/2)) {
			icon[i].style.backgroundColor = '#B1B1B1';
			topic[i].style.backgroundColor = '#575757';
			replies[i].style.backgroundColor = '#575757';
		}
		else {
			icon[i].style.backgroundColor = '#C0C0C0';
			topic[i].style.backgroundColor = '#6F6F6F';
			replies[i].style.backgroundColor = '#6F6F6F';
		}
	}
	
	for (var i = 0; i < icon.length; i++) {
		topic[i].firstChild.style.color = '#FF9E3F';
		replies[i].style.color = 'lightgrey';
		if (replies[i].getElementsByTagName('A')[0]) { // s'il y a des nouvelles r�ponses
			replies[i].getElementsByTagName('A')[0].style.color = '#FF9E3F';
		}
	}
}

function forumOpeningPost() {
	op = document.getElementsByClassName('node clear-block')[0]
	op.style.marginLeft = '10px';
	op.style.width = '600px';
	op.style.backgroundColor = '#606060';
	op.getElementsByClassName('content')[0].style.color = 'lightgray';
	op.getElementsByClassName('submitted')[0].style.backgroundColor = '#606060';
	op.getElementsByClassName('submitted')[0].style.color = '#FF9E3F';
	op.getElementsByClassName('terms')[0].parentNode.removeChild(op.getElementsByClassName('terms')[0]);
	
	if (op.getElementsByTagName('A')[0]) { // s'il y a un lien dans le post
		for (var i=0; i < op.getElementsByTagName('A').length; i++) {
		op.getElementsByTagName('A')[i].style.color = '#FF9E3F';
		}
	}
	
	formItems = op.getElementsByClassName('form-item');
	
	for (var i=0; i < formItems.length; i++) {
		formItems[i].style.backgroundColor = '#606060';
		formItems[i].style.color = '#FF9E3F';
	}
}

function getOpeningPosterName() {
	op = document.getElementsByClassName('node clear-block')[0]
	var contenuSubmit = op.getElementsByClassName('submitted')[0].innerHTML;
	var i=16; 

	while (i < (contenuSubmit.length-28)) {
		openingPosterName = openingPosterName+contenuSubmit.charAt(i); i++;
	}
	return openingPosterName;
	//alert(openPosterName); // debug //
}

function urlLock() {
	
	// test si node est present dans l'url
	if (url.indexOf('node') != -1) {
		var nodeNumber = ''; var i = 31;
		while (url.charAt(i) != '') {
			nodeNumber=nodeNumber+url.charAt(i); i++;
		}
	}

	// test si l'url est une url lock�e
	for (var i = 0; i < lockedNodesList.length; i++) {
		if (nodeNumber == lockedNodesList[i]) {lockedNode = 1};
	}
}

function correctTechIssueForumBug() {
	divForum = document.getElementById('forum');
	divForumTables = divForum.getElementsByTagName('table');
	if (divForumTables.length > 1) {
		divForum.removeChild(divForumTables[0]);
	}
}

////////////////////////////////////////////////////////////////////////////////////// FIN FONCTIONS //////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////////////////////////////////////////
var lockedNodesList = ['49', '106', '125', '59', '64', '1154'];
var url = window.location.href;
var lockedNode = 0;
var openingPosterName = '';
var bread = document.getElementById('breadc');
if (bread) {
	var aBread = bread.getElementsByTagName('A');
}
////////////////////////////////////////////////////////////////////////////////////// FIN VARIABLES //////////////////////////////////////////////////////////////////////////////////////


/////// RETRAIT DE COMMUNITY FORUM 2008 DES LIENS RAPIDES/////////
if (bread && aBread.length > 2 && aBread[2].innerHTML == 'Community Forum 2008') {
	bread.removeChild(aBread[2]);
}
////// FIN RETRAIT DE COMMUNITY FORUM 2008 DES LIENS RAPIDES//////

//// CORRECTION DU BUG DANS LE FORUM TECHNICAL ISSUES ///////////
if (url == 'http://www.911wheel.de/?q=forum/54') {
	correctTechIssueForumBug();
	document.getElementsByClassName('icon')[0].style.width = '20px';
}
///// FIN CORRECTION DU BUG DANS LE FORUM TECHNICAL ISSUES /////

/////////////////////////////////////////// BLOCAGE D'URL ///////////////////////////////////////////
urlLock();
//////////////////////////////////////// FIN BLOCAGE D'URL ////////////////////////////////////////


/////////////////////////////////////////// ENSEMBLE DU SITE ///////////////////////////////////////////
wholeSiteDisplay();
///////////////////////////////////////  FIN ENSEMBLE DU SITE ////////////////////////////////////////
	
	
/////////////////////////////////////////// MENU FORUM ///////////////////////////////////////////	
if (url == 'http://www.911wheel.de/?q=forum') {
	menuForum();
}
//////////////////////////////////////// FIN MENU FORUM ////////////////////////////////////////


/////////////////////////////////////////// FORUM ///////////////////////////////////////////
if (window.location.href.indexOf('http://www.911wheel.de/?q=forum/5') != -1) {
	forum();
}
//////////////////////////////////////// FIN FORUM ////////////////////////////////////////


/////////////////////////////////////////// THREADS ///////////////////////////////////////////
if (url.indexOf('node') != -1 && lockedNode != 1 && url.indexOf('comments') == -1 && url.indexOf('attachments') == -1 && url.indexOf('new') == -1)  {

	// Post d'ouverture
	if (aBread[1] && aBread[1].innerHTML != 'Thomas BLOG') {
		forumOpeningPost();
		getOpeningPosterName();
	}
	
	// R�ponses
	forumReponses();
}
//////////////////////////////////////// FIN THREADS ////////////////////////////////////////


/////////////////////////////////////////// COMMENTAIRES ACTUALIT� ///////////////////////////////////////////
if (url.indexOf('comments') != -1 || url.indexOf('attachments') != -1 || url.indexOf('#new') != -1) {
	//alert('commentaires actualit� !'); // debug //
	forumReponses();
}
//////////////////////////////////////// FIN COMMENTAIRES ACTUALIT� ////////////////////////////////////////