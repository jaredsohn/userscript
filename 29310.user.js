// ==UserScript==
// @name forum.inosmi.ru - hide trolls
// @namespace http://forum.inosmi.ru/
// @description collapse annoying trolls messages
// @include	http://forum.inosmi.ru/forum*
// ==/UserScript==

// Author: greenapelsin
// License: GPL == You can freely change/modify this script, untill it working )
// Version 0.22

// --- BEGIN EXECUTION ---

// Separate user name by |,
// if occure | in the end or || in middle, this like add "empty" user name == to collaps all messages
var inosmi_ignore_users = 'agent|gromowerzec|arunas|Marat|Petrow|Novod|zilgenshuher|'+
			'Masiania|voloh|NovodvorskayaVI|Liberator|Netbork|kvint|ealekhin|j8kb7|SEVA_XIV|SIVANOV|' + 
			'venmik|limit4ik|eedd|svobodofil|Me_Mikey|odessite|Pugovkin_Kosmopolitikys|Dutche|UIUIiIUIU|G_Kasparov';
var spamLinx="republic.com.ua|oboz.freetzi.com";
var markShit ="Erlik|CroN|Wadsley"; // don't f--- my brain. Who the fuck are you to lecture me?
var markGood ="ilya|Radonezh|Autodophe|guard"; // 
var inosmi_mark_users = 'greenapelsin|InoModerator'; // :)  Галантерейщик и кардинал - это сила!
unsafeWindow.manageComments = manageComments;
filter_inosmi_forum();

// --- END EXECUTION ---


function filter_inosmi_forum() {
 var ino_users_div = $x(".//div[@class='memberName']");
 var your_name=$xFirst(".//table//tr//td").textContent; 
 your_name=your_name.substring(43,your_name.indexOf('Большой Брат')-33);
 //alert ('Большой Брат помнит и приветствует тебя ['+your_name+']');
 for (var i=0; i<ino_users_div.snapshotLength; i++) 
 {	cUserDiv = ino_users_div.snapshotItem(i);
	// message header
	var messHead = cUserDiv.parentNode.parentNode;
	// add collapse/expand icon in left of header
	 cUserDiv.innerHTML = "<img src='http://inosmi.ru//i/in.gif'" +
		"onclick='manageComments("+i+")' title='Скрыть' alt='-' id='mesIcn-"+i+"'>  " + cUserDiv.innerHTML; 

	// whole message
	var messTable = messHead.parentNode;
	// message text 
	var messTx=$x(".//tr[@class='trow1' or @class='trow2']", messTable);
	if (messTx.snapshotLength)
	 {	// Текст комментария
		messTx.snapshotItem(0).id='ComTx-'+i;
		// спрятать строку [print] [link] [!!!] [Перейти наверх] [ответить] [цитировать] 
		messTx.snapshotItem(1).id='ComRepl-'+i;
		messTx.snapshotItem(1).style.display='none';
		// спрятать строку	Считаете содержание этого сообщения оскорбительным? 
		var Moderatorial=$xFirst(".//span[@class='panelBar']", messTable);
		Moderatorial.id='Moder-'+i;
		Moderatorial.style.display='none';

	 }

	var commAuthor =$xFirst(".//a[1]", cUserDiv); // comment author

	if  (commAuthor.textContent.match(inosmi_ignore_users)) // bad comment - collapse trolls
	 {	commAuthor.innerHTML ='<font style="color:black">' + commAuthor.innerHTML +'</font>';
		manageComments(i,'none');
	 }

	if  (commAuthor.textContent.match(inosmi_mark_users))  // important comment :)
	 {	commAuthor.innerHTML ='<font style="color:red">' + commAuthor.innerHTML +'</font>';
	 }
	
	if  (commAuthor.textContent.match(markGood))  // to read
	 {	commAuthor.innerHTML ='<font style="color:gold">' + commAuthor.innerHTML +'</font>';
	 }
	 
	if  (commAuthor.textContent.match(markShit))  // 
	 {	commAuthor.innerHTML ='<font style="color:sienna">' + commAuthor.innerHTML +'</font>';
		manageComments(i,'none');
	 }
	 
	if  (commAuthor.textContent==your_name) // your comment
	 {	commAuthor.innerHTML ='<font style="color:blue">' + commAuthor.innerHTML +'</font>';
	 }

	 // check for spam links
	var messLinx=$x(".//a", messTx.snapshotItem(0)); // all linx in message
	for (var j=0; j<messLinx.snapshotLength; j++) {
		var currLink=messLinx.snapshotItem(j).href;
		var currLinkHost=currLink.split('/')[2];
		// спам-ссылки, или уже поработал ИноМодератор :) - ссылка на правила общения
		if (currLink=='http://inosmi.ru/forum/themes/help#rulers' || currLinkHost.match(spamLinx)) // spamer
			{	commAuthor.innerHTML ='<font style="color:black">' + commAuthor.innerHTML +'</font>';
				manageComments(i,'none');
			}
		}
 
 } //for

var all_quotas = $x(".//span[@class='genmed']");
for (var i=0; i<all_quotas.snapshotLength; i++) 
{ var qouta = all_quotas.snapshotItem(i);
	qoutaText=qouta.textContent;
	quotaAuthor=qoutaText.substring(0,qoutaText.indexOf(" "));
	if (quotaAuthor==your_name) 
	{ qouta.innerHTML = '<font style="color:red"><b>' + quotaAuthor +'</b></font> - меня цитируют!!!'; }
}// for



}// end main function


function manageComments (CommId, actionDo) {
	var mText=$('ComTx-'+CommId);
	var mRepl=$('ComRepl-'+CommId);
	var mModer=$('Moder-'+CommId);
	var mIcon=$('mesIcn-'+CommId);

	if (!actionDo) 
	 {	if (mText&&mText.style.display=='') {actionDo='none';} 
		else {actionDo='';}
	 }

	if(mIcon) 
	  { 	if (actionDo=='') {mIcon.title='Скрыть';} 
			else {mIcon.title='Показать';}
	  }
	if (mText) {mText.style.display=actionDo;}
	if (mRepl) {mRepl.style.display=actionDo;}
	if (mModer) {mModer.style.display=actionDo;} 
}

function $(id) {return document.getElementById(id);}

function $x(xpath, contextNode, resultType) {
	contextNode = contextNode || document.body;
	resultType = resultType || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	return document.evaluate(xpath, contextNode, null, resultType, null);
}

function $xFirst(xpath, contextNode) {
	var xpr = $x(xpath, contextNode, XPathResult.FIRST_ORDERED_NODE_TYPE);
	return xpr.singleNodeValue;
}


