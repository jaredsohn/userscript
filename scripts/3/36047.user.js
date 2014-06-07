// ==UserScript==
// @name 	block big chat ad in gay.com
// @namespace	http://userscripts.org/scripts/
// @description	remove chat ad
// @include	http://www.gay.com/*
// @author	Fall Of Night
// @version	1.0
// ==/UserScript==


window.addEventListener('load',changepage,false); 
window.addEventListener('resize',layoutGroupChat,false); 





function embedFunctions(arr) {
document.body.appendChild(document.createElement('script')).innerHTML=arr.join("\n\n").replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function closeGroupMini() {
	
}


function popUnderCheck(){
	
}

function loadPopUnder(){
	
}

function firePopUnder() {
	
}

function checkAdBanner() {
	
}

function refreshAd(iframeId, containerId) {
	
}
function gotoExitChat(arg) {
	
}

function changeInnerHTML(){
	var orig = document.getElementById('chatUI').innerHTML;


}



function layoutGroupChat() {
	var po = 0;
	var winWidth = document.body.clientWidth;
	var winHeight = document.body.clientHeight;
	var envWidth = winWidth - po ;
	var envHeight = winHeight ;
	var cuiWidth = envWidth - 11;
	var availWidth = cuiWidth - 256;
	var cuiHeight = envHeight ;
	var miniHeight = 0;

	if(window.showingMini) miniHeight = 135;
	miniHeight = 135;
	var spyListHeight = cuiHeight - miniHeight - 110;
	if(window.showingMini) spyListHeight -= 28;
	spyListHeight -= 28;
	var memberListHeight = cuiHeight - miniHeight - 63;
	
	if(envWidth < 100) envWidth = 100;
	if(envHeight < 100) envHeight = 100;
	if(cuiWidth < 100) cuiWidth = 100;
	if(cuiHeight < 100) cuiHeight = 100;
	if(availWidth < 100) availWidth = 100;
	if(spyListHeight < 30) spyListHeight = 100;
	if(memberListHeight < 30) memberListHeight = 100;
	document.getElementById("chatEnvelope").style.width = winWidth + "px";
	
	document.getElementById("chatUI").style.width = envWidth + "px";
	document.getElementById("chatEnvelope").style.height =  envHeight + "px";
	document.getElementById("chatUI").style.height = envHeight + "px";
	document.getElementById("grpTabBar").style.width = cuiWidth + "px";
	document.getElementById("chatLobby").style.width = cuiWidth + "px";
	document.getElementById("chatRoom").style.width = cuiWidth + "px";
	document.getElementById("chatLobby").style.height = cuiHeight + "px";
	document.getElementById("chatRoom").style.height = cuiHeight + "px";
	
	document.getElementById("chatLobbySidebar").style.height = cuiHeight + "px";
	document.getElementById("chatRoomMemberStack").style.height = spyListHeight + "px";
	document.getElementById("chatRoomListDiv").style.height = cuiHeight + "px";
	document.getElementById("chatRoomListDiv").style.width = (availWidth - 30) + "px";
	document.getElementById("loadingRoomIndicator").style.width = (availWidth - 30) + "px";
	
	
	document.getElementById("grpChatListStack").style.height = memberListHeight + "px";
	document.getElementById("chatRoomArea").style.width = (availWidth - 15) + "px";
	document.getElementById("chatRoomArea").style.height = (cuiHeight - 5) + "px";
	document.getElementById("chatRoomSidebar").style.height = (cuiHeight - 5) + "px";
	document.getElementById("mainChatIframe").style.height = (cuiHeight - 87) + "px";
	document.getElementById("mainChatIframe").style.width = (availWidth - 15) + "px";
	document.getElementById("grpChatInputLine").style.width = (availWidth - 15) + "px";
	document.getElementById("grpChatTextInput").style.width = (availWidth - 70) + "px";

	if(document.getElementById("liteBoxBGDiv")) {
		document.getElementById("liteBoxBGDiv").style.width = winWidth + "px";
		document.getElementById("liteBoxBGDiv").style.height = winHeight + "px";
	}

	
	document.getElementById("chatAd").style.display = "none";
	document.getElementById("msgHeader").style.display = "none";
	document.getElementById("grpAdContainer").style.display = "none";
	document.getElementById("grpMiniProfileMsg").style.display = "none";
	document.getElementById("grpChatFooter").style.display = "none";
document.getElementById("grpTabBar").style.display = "none";
document.getElementById("grpChatTabBase_inRoom").style.display = "none";
document.getElementById("addToFavesLinks").style.display = "none";






	document.getElementById("grpMiniProfile").style.display = "block";



//doStyles();
	
}


function changepage() {
layoutGroupChat();


embedFunctions([refreshAd, gotoExitChat, closeGroupMini, layoutGroupChat, popUnderCheck, loadPopUnder, firePopUnder, checkAdBanner ]);

doStyles();
changeInnerHTML();
}


function doStyles() {


GM_addStyle("" + <><![CDATA[

html, body {
	height:100%;
	width:100%;
	padding:0;
	margin:0;
	border:0;
	font: normal 0.8em Verdana;
	color:#555555;
	background: #ffffff;	 
}

a:link, a:visited {
	color: #3480bb;
	text-decoration: none;
}

a:hover {
	color: #3480bb;
	text-decoration: underline;
}

.audioSpan {
	width: 300px;
	height: 300px;
}

.chatPane {
	width: 786px;
	height: 584px;
	position: absolute;
	top: 0px;
	left:300px;
}

.chatCatcher {
	width: 365px;
	height: 344px;
	position: absolute;
	top: 10px;
	left:300px;
}

.chatMessenger {
	width: 265px;
	height: 555px;
	position: absolute;
	top: 120px;
	left:20px;
}

.chatRequests {
	text-decoration: underline;
}

.adTD {
	vertical-align: top;
	width: 200px;
}

.sessions {
	text-align: center;
	background: #7596c6;
	width: 100%;
	height: 65px;
}

.sessions-groupChat {
	text-align: center;
	background: #7596c6;
	width: 100%;
	height: 100%;
}

.sessionTitle {
	padding-top: 5px;
	background: #7596c6;
}

.mainPane {
	width: 280px;
	background: #ffffff;
	border: 0px;
	height: 350px;
}

.ie .mainPane {
	width: 26px;
}

.mainPane-noMsg {
	background: #ffffff;
	border: 0px;
	width: 100%;
	height: 350px;
}

.mainPane-groupChat {
	background: #ffffff;
	border: 0px;
	width: 100%;
	height: 450px;
}

.chatTable {
	height: 70%;
	width: 100%;
}

.chatTable td {
	margin: 0px;
}

.sessionTD {
	width: 100px;
	//max-width: 100px;
}

.chatContainer {
	background: #ffffff;
}

.typingArea {
	background: #ffffff;
	width: 100%;
	height: 50px;
}

.textInput {
	width: 95%;
}

.textInput-groupChat {
	width: 92%;
}

.chatForm {
	margin-left: 2px;
	margin-top: 2px;
	height: 15px;
}

.formTable {
	width: 100%;
	height: 20px;
}

.formTableTd1 {
	width: 99%;
}

.formTableTd2 {
	padding-top: 5px;
	vertical-align: top;
	width: 1%;
}

.loginId {
	color: #ff0000;
}

.userFmt {
	color: #000000;
	margin-right: 20px;
	margin-left: 20px;
}

.timeFmt {
	color: #7596c6;
}

.previewFmt {
	float: right;
	margin-top: -14px;
	cursor: pointer;
}

.previewFmt a:link { color: #000040; text-decoration:none; }
.previewFmt a:visited { color: #000040; text-decoration:none; }
.previewFmt a:active { color: #000040; text-decoration:none; }
.previewFmt a:hover { color: #000040; text-decoration:underline; }

.messageFmt {
	background: #ff0000;
	color: #ff0000;
}

.switchSession-groupChat {
	cursor: pointer;
	color: #000000;

}

.switchSessionSelect-groupChat {
	cursor: pointer;
	color: #ff0000;
}

.switchSession {
	cursor: pointer;
	color: #000000;
	font-size: 0.6em;
	margin-top: 38px;
	position: absolute;
}

.switchSessionSelect {
	cursor: pointer;
	color: #ff0000;
	font-size: 0.6em;
	margin-top: 38px;
	position: absolute;
}

.arrow {
	height: 25px;
	width: 25px;
	cursor: pointer;
}

.groupDiv {
	margin-bottom: 10px;
}

.`Div h4 {
	margin-top: -25px;
	margin-left: 30px;
}

.groupDiv div {
	margin-bottom: 0px;
	padding-top: 0px;
	padding-bottom: 0px;
	font-weight: normal;
	
}

.addBuddy {
	
}

.promoSlot {
	height: 60px;
	margin-left: 65px;
	width: 120px;
	border: 0px solid #c0c0c0;
}

.promoSlot h4 {
	font-size: 1em;
	margin-top: -90px;
	margin-left: 100px;
}

.promoSlot h3 {
	font-size: 1em;
	font-weight: normal;
	margin-left: 100px;
	margin-top: -10px;
}

.listUser {
	cursor: pointer;
	color: #0000aa;
	text-decoration: none;
}

.groupDiv a:hover {
	text-decoration: underline;
}

.closeButton {
	cursor: pointer;
	position: absolute;
	z-index: 10;
}

.closeButton-groupChat {
	cursor: pointer;
}

.addUser {
	background: #ffffff;
	width: 125px;
}

.groupChatList {
	margin-top: 10px;
	width: 200px;
	height: 175px;
}

.sessionHolder {
	width: 100%;
	white-space: nowrap;
	display: inline;
}

.groupChatImg img {
	float: right;
	width: 90px;
	margin-top: -175px;
}

.groupChatImg span {
	float: right;
	width: 90px;
	margin-top: -65px;	
}

.IMImgimg {
	margin-top: 10px;
	height: 120px;
}

.IMImg span {
	font-size: 0.9em;
}

.groupChatUserInfo {
	font-size: 0.9em;
}

.emoticons {
	margin: 10px;
	font-size: 0.9em;
	color: #ff0000;
}

.emoteDiv {
	z-index:1000;
	background: #ffffff;
	// left:460px;
	// position:absolute;
	// top:403px;
	// _top:401px;
}


.emoteDiv table {
	border-collapse: collapse;
}
.emoteDiv table td {
	border: 1px solid #999;
	padding: 3px;
}
.emoteDiv table td.devilEmoticon {
	padding-top: 0px;
}

.clickableImg {
	cursor: pointer;
}

.mainIframe {
	border: 0px;
	width: 100%;
	height: 2500px;
}

.startMsgDiv {
	position: absolute;
	top: 10px;
	left: 10px;
	background: #ffffff;
}

.imageNavArrow {
	width: 15px;
	height: 15px;
	margin: 10px;
	margin-bottom: 50px;
}

.imageStatus {
	font-size: 0.9em;
	margin-top: 15px;
}

.closeImg {
	cursor:pointer;
	width:9px;
	height:9px;
}

.closeImgMsg {
	float: right;
	margin-right: 2px;
	margin-left: 175px;
	margin-top: 1px;
	cursor:pointer;
	z-index: 1000;
}

.ie .closeImgMsg {
	position: absolute;
	margin-left: 131px;
	margin-right: 3px;

}

.userNameDiv {
	margin-top: -1px;
	margin-left: 35px;
}


#main {
	width: 100%;
	height:100%;
	_height:380px; /*ie7*/
}

.label {
	cursor:pointer;
}

.label a:hover {
	cursor: pointer;
	text-decoration:underline;
}

.label .editLink, .label .editLink a {
	display:inline;
	float:right;
}

.accBody {
	background: #fbfbfb;
}

.accBody div { 
	overflow-y:auto;	
}

.accBody div div {
	overflow: none;	
}

.unlockIcon {
	float: right;
	height: 20px;
	width: 20px;
	margin-top: -17px;
	margin-right: 5px;
}

.listDiv {
	color: #333333;
	text-decoration: none;	
	font: bold 1.1em Verdana;
	border-bottom:solid 2px #bbbbbb;
	display:block;	
	vertical-align:middle;	
	overflow: show;
	background: #ffffff;
	padding-top: 1px;
	padding-bottom: 1px;
	height: 39px;
	overflow:hidden;
}

.listDiv a {
	color: #333333;
	text-decoration: none;
	overflow: hidden;	
}

.listDiv a:hover {
	color: #333333;
	text-decoration: underline;
}

.roomTab .listDiv { /*for messenger*/
	height:33px;
	line-height:27px;
	width:100%;
}

.roomTab .listDiv a { /*for messenger*/
	margin-left:5px;
}

.rightBuddyListSpan {
	float: right;
	margin-top: -20px;
	padding: 1px;
}

.miniIcon {
	height: 28px;
	width: 28px;
	border:0;
	margin-left:3px;
	margin-right:7px;
}

.invisibleImg {
	display: none;	
}

.rightCloseButton {
	float: right;
	margin-top: -15px;
	margin-bottom: 5px;
}


.chatRequestsDiv {
	background: #000000;
	padding-left: 5px;
	font-size: 0.9em;
	font-weight: bold;
	color: #ffffff;
}

.incomingChatBar {
	background: #c0c0c0;
	padding-left: 5px;
	font-size: 0.9em;
	font-weight: bold;
	color: #000000;
}

.mailLink {
	right:10px;
	position:absolute;
	top:5px;
	z-index:10;
}

.botGuardBar {
	background: #000000;
	padding-left: 5px;
	font-size: 0.8em;
	font-weight: bold;
	color: #ffffff;
}

.botGuardBar a {
	color: #ffffff;
	text-decoration: none;
}

.botGuardBar div input {
	background: #c0c0c0;
	width: 240px;
}

.botGuardBar a:hover {
	text-decoration: underline;
}

.botguardEditSpan {
	float: right;
	margin-top: -15px;
	margin-right: 5px;
}

.helpMenu {
	background: #ffffff;
	padding-left: 10px;
}

.shoppingCartIcon {
	height: 40px;
}

.chatReqUpArrow {
	height: 15px;
	width: 15px;	
}

.chatReqDownArrow {
	height: 15px;
	width: 15px;
	background: #333333;
	margin:0;
	padding:0;
	border:0;
}

#statusDiv {
	border: 1px solid #cccccc;
	width:175px;
	font: normal .7em Verdana;
}

.statusDivVisible {
	display: inline;
	position: absolute;
	left: 60px;
	width: 210px;
	background: #ffffff;
	z-index: 100000;
}

.statusDivHidden {
	display: none;
}

.statusDivVisible input {
	width: 150px;
}

.borGuardStatus {
	color:#bcbcbc;
	font-weight:bold;
}

.incomingRequestClickActionSpan {
	display:block;
	margin-right: 0px;
	margin-top:0px;
}

.ie .incomingRequestClickActionSpan {
	margin-left: 0px;
	margin-top: 2px;
}

.incomingRequestDiv {
	color:#666666;
	margin-left: 0px;
	display:block;
	margin-top:5px;
}

.requestThumb {
	height: 28px;
	width: 28px;
	margin-left: 0px;
	margin-top: 0px;
	cursor: pointer;
}

.ie .requestThumb {
	height: 28px;
	width: 28px;
	margin-left: 0px;
	margin-right: 3px;
	margin-top: 5px;
}

.requestNameSpan {
	display:block;
	margin-left: 0px;
	margin-top: 0px;
	font-weight: bold;
	color: #555555;
}

.requestNameSpan a:hover {
	text-decoration: none;
	color: #000000;
}

.ie .requestNameSpan {
	margin-left: 0px;
	margin-top: 5px;
	font-weight: bold;
	color: #555555;
}

.newRequest {
	background-color:#3480BB;
	color:white;
	display:inline;
	float:right;
	font: normal 0.8em verdana;
	height:23px;
	line-height:10px;
	margin-top:-3px;
	text-align:center;
	width:50px;
	margin-bottom: -5px;
	margin-right: 5px;
}

.newRequestMsg {
	background-color:#3480BB;
	color:white;
	display:inline;
	float:right;
	font: normal 0.8em verdana;
	height:20px;
	line-height:10px;
	text-align:center;
	width:50px;
	padding: 5px;
	margin-left: 127px;
	margin-top:-29px;
}

.ie .newRequestMsg {
	margin-left: 84px;
	height:33px;
	margin-top: -33px;
}

.turnOffAdsLink {
	color:#3366CC;
}

.helpLink {
	padding-top:7px;
	width:100px;
	float:right;
}

.hidden {
	display:none;
}


#scrollLeftLink {
	padding-right:15px;
}

.grpEnvelopeTop {
	border-top:solid 1px #bbbbbb;
	margin-top:-5px;
	float:left;
}

.grpAdContainer {
	background-image:url(/imgs/lightGradient.jpg);
	padding:5px;
	margin-bottom:1px;
	text-align: center;
}

.grpChatArea {
	font: normal 1.1em verdana;
}

.grpChatMainAreaEnvelope {
	width:565px;
	_width:577px;
	margin-left:3px;
	height:382px;
	_height:360px;
	background:#F2F2F2;
	border-bottom:solid 1px #bbbbbb;
	border-left:solid 1px #bbbbbb;
	border-right:solid 1px #bbbbbb;
}

.grpChatPhoto {
	float:left;	
	border:0;
	margin-right:8px;
}

.pvtChatPhotoDiv {
	float:left;	
	border:0;
	margin-right:8px;
	margin-top: -9px;
	margin-left: 2px;
}

.ie .pvtChatPhotoDiv {
	margin-top: 0px;
	padding: 2px;
}

.grpChatFindRoomEnvelope {
	width:580px;
	height:100%;
}

.grpChatMainArea {
	width:300px;
	float:left;	
}

.chatRoomMemberListOutline {
	background: #F1F1F1 url(/imgs/findRoom_leftBg.jpg) repeat-y left top;
	height:364px;
	_height:357px;
	width:260px;
	_width:268px;
	padding-left:5px;
	border:solid 1px #B4B4B4;
}

.chatRoomMemberListArea {
	width:270px;
	height:370px;
	font-size:1.1em;
	color:#333333;
	float:right;
}

.chatRoomListArea {
	width:301px;
	height:370px;
}

.grpChatListArea {
	width:262px;
	height:377px;
	float:left;
	border-right: solid 1px #bbbbbb;
}

.addToFavesLinks {
	font: bold 1em verdana;
	float:right;
}

.grpChatAdSpot {
	float:left;
	width:314px;
	height:446px;
	padding-left:4px;
	background-color:#bbbbbb;
	border-left:solid 2px #ffffff;
}

.grpChatCopy {
	margin-left:3px;
}

.grpChatCopy2 {
	margin-left:10px;
	height:38px;
	_height:53px;
}


.grpStackTitle {
	font:bold 1em verdana;
	color: #333333;
	position:relative;
	top:-15px;
	width:90px;
	overflow:hidden;
}

.grpChatCloseChat img {
	cursor: pointer;
	width:9px;
	border:0;
	height:9px;
	padding-left:5px;
}

.grpChatWhoHereTitle {
	float:right;
	font-weight:bold;
	padding-right:10px;
	padding-top:11px;
	padding-bottom:9px;
}

.enterChatButton {
	float:right;
	padding-top:11px;
	padding-right:8px;
}

.exitChatButton {
	float:right;
	margin-right:13px;
}

.grpChatPhoto {
	float:left;
	margin-right:8px;
	border:0;
}

.grpChatPhoto img {
	border:0;
}

.grpChatNameArea,.grpChatCountArea {
	font-weight:normal;
}

.grpChatTabBase_findRoom {
	height:5px;
	margin-left:3px;
	margin-right:7px;
	background-color:#a5c5de;
	overflow:hidden;
}

.grpChatTabBase_inRoom {
	width:566px;
	_width:576px;
	height:5px;	
	background-color:#1377B7;
	overflow:hidden;
}

.grpChatList {
	height:309px;
	background-color:white;
	width:240px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;
	margin-bottom:7px;
	overflow-y:scroll;
	overflow-x:none;
	margin-left:8px;
	clear:both;
}
.grpChatListShort {
	height:175px;
	background-color:white;
	width:240px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;
	margin-bottom:7px;
	overflow-y:scroll;
	overflow-x:none;
	margin-left:8px;
	clear:both;
}

.grpMiniProfileMsg {
	width:235px;
	height:10px;
	border-style:solid;
	border-width:0px;
	border-color:#bbbbbb;
	margin-top:10px;
	margin-bottom:13px;
	margin-left:11px;
	margin-right:10px;
	font:11px verdana;
	color:#555555;
}

.pvtChatList {
	background-color:white;
	width:207px;
	height:160px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;
	margin-bottom: 0px;
	margin-left: 0px;
	overflow-y:scroll;
	overflow-x:none;
	clear:both;
}

.pvtChatListPaid {
	background-color:white;
	width:207px;
	height:260px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;
	margin-bottom: 0px;
	margin-left: 0px;
	overflow-y:scroll;
	overflow-x:none;
	clear:both;
}

.miniProfileDiv {
	height: 174px;
	margin-left: 20px;
}

.chatRoomMemberListArea select {
	font: bold 1.1em verdana;
	color:#f16a27;
	background:#F1F1F1;
	border:0;
	padding:0;
}

.grpChatMainArea select {
	font: bold 1.1em verdana;
	color:#f16a27;
	background:#F1F1F1;
	border:0;
	padding:0;
	position:relative;
	top:12px;
}

.grpChatFindRoomEnvelope .chatRoomInstanceDiv {	
	font:bold .9em verdana;
	position:relative;
	clear:both;
	top:2px;
	padding-left:5px;

}

.grpChatMainAreaEnvelope .chatRoomInstanceDiv {
	font:bold 1em verdana;
	color:#333333;
	position:relative;
	padding-left:8px;
	top:1px;
	_top:-2px;
	padding-bottom:9px;
	_padding-bottom:-34x;
	clear:both;

}

.ie #lobbyInstanceWidgetDiv {
	margin-top: 15px;
}

.lobbyFavesLink {
	float:right;
	font: normal .9em Verdana;
	padding-right:12px;
	padding-top:4px;
}

.grpFavesLink {
	font: normal .9em Verdana;
	padding-right:12px;
	padding-top:4px;
}

.grpChatFindRoomEnvelope .lobbyFavesLink {
	padding-right: 5px;
}

.chatRoomMemberListArea .lobbyFavesLink {
	font: normal .8em verdana;
	_margin-bottom:-18px;
}

.chatRoomMemberStack {
	background-color:white;
	width:245px;
	margin-left:7px;
	height:266px;
	_height:256px;	
	overflow-y:scroll;
	overflow-x:hidden;
	margin-top:12px;
}


.grpChatFooter a {
	cursor:pointer;
	color:#3480bb;
}

.chatRoomList {
	background-color:white;
	width:301px;
	_width:303px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;	
	overflow:scroll;	
	margin-left:3px;
}

.grpChatListRoom {
	font-size:1.1em;
	color:#333333;	
}

.grpChatListRoom a:hover {
	text-decoration: none;
	color: #000000;
}

.grpTabBar {
	width:575px;
	height:20px;
	overflow:hidden;
	margin-left:3px;
}

.groupTabActive {
	margin-left:3px;
	background:url(/imgs/tabBgBlue-right.gif) no-repeat right top;
	float:left;
	height:22px;
	color:white;
	font-weight:bold;
	cursor:pointer;
}

.groupTabActive .groupTab-inner {
	padding-top: 3px; 
	padding-right: 7px; 
	padding-left:3px; 
	background:url(/imgs/tabBgBlue-left.gif) no-repeat left top;
}

.groupTabActive a {
	color:#ffffff;
	padding-left:3px;
}

.groupTabInactive  {
	margin-left:3px;
	background:url(/imgs/tabBgGray-right.gif) no-repeat right top;
	float:left;
	height:22px;
	color:white;
	font-weight:bold;
	cursor:pointer;
}

.groupTabInactive a {
	color:#ffffff;
	padding-left:3px;
}

.groupTabInactive .groupTab-inner {
	padding-top: 3px; 
	padding-right: 7px; 
	padding-left:3px; 
	background:url(/imgs/tabBgGray-left.gif) no-repeat left top;
}

.grpChatIframe {
	background-color:white;
	margin-left:10px;
	_margin-left:13px;
	width:277px;
	height:278px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;
	margin-bottom:0px;
	_margin-top:-15px;
	overflow-y:scroll;
	_overflow-y:auto;	
}

.grpChatInput {
	width:220px;
	height:20px;
	border-width:0px;
	margin:0px;
}

.grpChatInputLine {
	margin-top:8px;
	width:277px;
	margin-left:10px;
	_margin-left:13px;
	background-color:white;
	border:solid 1px #bbbbbb;
}

.grpChatUserName {
	font-weight:bold;
	line-height:15px;
}

.groupChatListMember {
	padding:1px;
	background-color:#ffffff;
	border-style:solid;
	border-width:0px;
	border-bottom-width:1px;
	border-bottom-color:#bbbbbb;
	height:35px;
	font-weight:normal;
}

.groupChatListMemberNewMessage {
	border-style:solid;
	border-width:2px;
	background-color:#ffffff;
	border-color:#3480BB;
	font-weight:normal;
}

.listDiv.chatListMemberSelected,
.groupChatListMemberSelected {
	border-style:solid;
	border-width:2px;
	background-color:#ffffff;
	border-color:#FF6633;


}
.listDiv.chatListMemberSelected {
	padding-top: 0px;
	padding-bottom: 0px;
}
.listDiv.chatListMemberSelected .miniIcon{
	margin-left: 1px
}
.groupChatListMemberOffline {
	border-style:solid;
	border-width:2px;
	background-color:#EEEEEE;
	border-color:#CCCCCC;
	height:30px;
	filter:alpha(opacity=50);
	-moz-opacity:0.5;
	opacity: 0.5;
}

.floatLeft {
	float:left;
}

.floatRight {
	float:right;
}

.lobbyTopLevelOpen {
	background-image:url(/imgs/lobbyHeteroGradient.JPG);
	background-color:#eeeeee;
	font-weight:bold;
	color:#333333;
	background-repeat:repeat-x;
	height:19px;	
	line-height:19px;
	cursor:pointer;
}

.lobbyTopLevelClosed {
	background-image:url(/imgs/lobbyHeteroGradient.JPG);
	background-color:#eeeeee;	
	font-weight:bold;	
	background-repeat:repeat-x;
	height:19px;
	border-bottom:solid 1px #B4B4B4;
	line-height:19px;
	color:#333333;	
	cursor:pointer;
}

.lobbySubLevel {
	line-height:19px;
}

.lobbyMidLevelOpen {
	background-color:#FFFFFF;
	color:#f16a27;
	height:18px;
	cursor:pointer;
}

.lobbyMidLevelClosed {
	background-color:#FFFFFF;
	color:#555555;
	height:18px;
	cursor:pointer;
}

.lobbyRoom {
	background:#ffffff url(/imgs/arrowSubRight.jpg) no-repeat left center;	
	color:#666666;
	height:18px;
	cursor:pointer;	
	padding-left:12px;
}
	
.lobbyRoomHover {
	background:#ffffff url(/imgs/arrowSubRightOn.jpg) no-repeat left center;	
	background-color:#eeeeee;
	color:#FF6633;
	height:18px;
	cursor:pointer;
	padding-left:12px;
}

.lobbyRoomSelected {
	background:#ffffff url(/imgs/arrowSubRightOn.jpg) no-repeat left center;	
	background-color:#eeeeee;
	color:#FF6633;
	height:18px;
	cursor:pointer;
	padding-left:12px;
}

.chatListMemberName {	
	font-weight:bold;
	line-height:15px;
}

.chatListMemberBio {	
	font-weight:normal;
	font-size: .925em;
}



/*-------------- Private Chat specific ------------*/


.pvtChatDiv .msgHeader {
	background-image:url(/imgs/hairspray/chat_header_bg.gif);
	height: 32px;	
}

.PvtChatContentPaneDiv {
	margin-left: -8px;
	width: 100%;
}

.pvtChatDiv {
	height:100%;
	width:100%;
	background-color:#eeeeee;
	font: normal 1.1em Verdana;
}

.pvtChatHdr {
	height:25px;
	margin-bottom:5px;
	background-color:#333333;
	background-image:url(/imgs/chatGradient.jpg);
}

.pvtChatMgrArea {
	margin-top:9px;
	float:right;
}

.pvtChatMgrBar {
	width:216px;
	background-color:white;
	background-image:url(/imgs/dropShadowLeft.jpg);
	background-repeat:repeat-y;	
}

.pvtChatReqHdr {
	height:20px;
	background-color:#999;
	color:white;
	padding-left:6px;
	padding-top:3px;
	text-align:left;	
}

.pvtChatReqHdrNewReq {
	height:20px;
	background-color: #3480BB;
	color:white;
	padding-left:6px;
	padding-top:3px;
	text-align:left;	
}

.pvtChatReqs {
	margin-left:7px;
	margin-top:10px;
}

.pvtChatPhoto {
	float:left;
	margin-right:5px;
	background-color:white;
	border:solid 1px #cccccc;
	padding:2px;
}

.pvtChatPhoto-noMsg {
	float:left;
	margin-right:5px;
	background-color:white;
	border:solid 1px #cccccc;
	padding:2px;
	display:none;
}

.pvtChatPhoto img {
	width:34px;
	height:34px;
	border:solid 2px #ffffff;
}

.pvtChatUser {
	padding-top:5px;
	padding-left:9px;	
}

.pvtChatActions {
	clear:left;
	float:left;
	padding-left:7px;
	padding-top:5px;
	padding-bottom:7px;
	text-align:left;
	height:23px;
	_height:29px;
	width:275px;
	overflow:hidden;
}

.pvtChatActions-noMsg {
	clear:left;
	float:left;
	padding-left:7px;
	padding-top:5px;
	padding-bottom:7px;
	text-align:left;
	height:23px;
	_height:29px;
	width:275px;
	overflow:hidden;
	display:none;
}

.pvtChatMemberName {
	font: bold 1.7em Verdana;
	color:#f16a27;
}
		
.pvtChatBioLine {
	font: normal 1.3em Verdana;
	padding-top:3px;
}

.pvtChatBioLine a, .pvtChatBioLine a:hover, a.pvtChatBioLine, a:hover.pvtChatBioLine {
	text-decoration:none;
	color:#555555;
}

.ie .pvtChatBioLine {
	position:relative;
	font: normal 1.3em Verdana;
	padding-top:3px;
}

.pvtChatInputLine {
	margin-top:10px;

	position:relative;
	width:281px;
	_width:272px;
	margin-left:7px;
	float:left;
	background-color:white;
	border-style:solid;
	border-width:1px;
	border-left-color:#bbbbbb;
	border-top-color:#bbbbbb;
	border-right-color:#bbbbbb;
	border-bottom-color:#bbbbbb;
}

.ie .pvtChatInputLine {
	width: 270px;	
}

.pvtChatInput {
	width:215px;
	border-width:0px;
	margin:0px;
	font:normal 1em verdana;
	background-color: #fff;
}

.pvtChatFooter {
	position:relative;
	top:15px;
	_left:18px;
}

.pvtChatOpenCell {
	width:80px;
	height:110px;
	float:left;	
	margin-left:2px;
	margin-right:6px;
	text-align:center;
}

.pvtChatOpenImgAreaActive .shoppingCartIcon, .pvtChatOpenImgArea .shoppingCartIcon  {
	width:54px;
	height:54px;
	margin-top:6px;
}

.pvtChatOpenImgAreaNew .shoppingCartIcon {
	height:55px;
	width:44px;
	margin-top:6px;
}

.pvtChatOpenImgArea {	
	width:87px;
	height:86px;
	overflow:hidden;
	background: url(/imgs/hairspray/pvtChatImgBg.gif) no-repeat left top;
}

.pvtChatOpenImgAreaActive {
	width:87px;
	height:86px;
	overflow:hidden;
	background: url(/imgs/hairspray/pvtChatImgBg-on.gif) no-repeat left top;
}

.pvtChatOpenImgAreaNew {
	width:87px;
	height:86px;
	overflow:hidden;
	background: url(/imgs/hairspray/pvtChatImgBg-new.gif) no-repeat left top;
}

.pvtChatCloseChat img {
	cursor: pointer;
	width:9px;
	border:0;
	height:9px;
	width:9px;
	float:right;
	margin-right:5px;
	margin-right:2px;
}

.pvtChatOpenName {
	color:#bbbbbb;
	font-size:1.1em;
	text-decoration:none;
}

.pvtChatOpenNameActive {
	color:#3480bb;
	font-size:1.1em;
	text-decoration:none;
}

.pvtChatOpenNameActive a {
	color:#3480bb;
}

.pvtChatOpenNameNew {
	color:#3480bb;
	font-size:1.1em;
	text-decoration:none;
}

.pvtChatOpenNameNew a {
	color:#3480bb;
}

.pvtChatBtmAd {
	background:#ececed;
	border-bottom:10px solid #ffffff;
	border-top:10px solid #ffffff;	
	margin-left:10px;
	text-align: center;
display:none ! important;
}

.pvtChatSessionDiv {
	overflow-y:scroll;
	overflow-x:hidden;
	padding-top:5px;
	style:inline;
	height:190px;
}
.ie .pvtChatSessionDiv {
	height:197px;
}
.res600h .pvtChatSessionDiv {
	height:100px;
}
.ie .res600h .pvtChatSessionDiv {
	height:107px;
}
.paid .pvtChatSessionDiv {
	height:283px;
}
.paid .ie .pvtChatSessionDiv {
	height:289px;
}
.paid .res600h .pvtChatSessionDiv {
	height:183px;
}
.paid .ie .res600h .pvtChatSessionDiv {
	height:189px;
}

.pvtChatFromName {
	font: bold 1.2em Verdana;
	color:#6699cc;
}

.pvtChatFromMsg {
	margin-left: 3px;
	font: normal 1.1em Verdana;
	color:#555555;
}

.chatMessageDivGrp {
	clear:both;
	display:block;
 	margin-left:5px;
 	margin-right:5px;
 	padding-top:1px;
 	padding-bottom:1px;
 	padding-left:9px;
 	background:#fff;
}
.chatMessageDiv {
	border-bottom:dashed 1px #bbbbbb;
	clear:both;
	display:block;
	margin-left:5px;
	margin-right:5px;
	padding-top:1px;
	padding-bottom:7px;
	padding-left:9px;
	background:#fff;
}
.chatMessageSingle {
	padding-top:3px;
}
.pvtChatSystemMsg {
	font: bold 1.0em Verdana;
	color:#333333;
	background:#fff;
	margin-left:5px;
	margin-right:5px;
	padding-top:3px;
	padding-bottom:3px;
	padding-left:9px;
}
.pvtChatToName {
	font: bold 1.2em Verdana;
	color:#f17c27;
}
.grpChatToName {
	font: bold 1.2em Verdana;
	color:#f17c27;
	background:#fff;
	cursor:pointer;
}
.pvtChatToMsg {
	font: normal 1.1em Verdana;
	color:#555555;
	margin-left: 3px;
}

.incomingChatDiv {
	height:73px;
	overflow-y:scroll;
	overflow-x:hidden;
}

/*--------------Messenger specific------------*/

#listMain {
	height:100%;
}

.buddyListFrame {
	margin:0 5px;
	padding:0;
	border:0;
}
.buddySlot {
	margin-top: 5px;
}

.buddyTextInput {
	width: 196px;
	color: #c0c0c0;
}

.buddyTextInputType {
	width: 196px;
	color: #000000;
}


/*--- messenger height mess ---*/
#MessengerContentPaneDiv,
.buddyListFrame { height: 394px; }

.paid #MessengerContentPaneDiv,
.paid .buddyListFrame { height: 457px; }

.res600h #MessengerContentPaneDiv,
.res600h .buddyListFrame { height: 183px; }

.paid .res600h #MessengerContentPaneDiv,
.paid .res600h .buddyListFrame { height: 241px; }


/*--- end messenger height mess ---*/

.dojoLayoutContainer {
	background: #eeeeee;
	margin:0;
	padding:0;
	height: 100%;
}

.safariMarginFix {
	margin:0;
	padding:0;
}

#msgWinAd {
	background: #bcbcbc;
	text-align: center;
	padding: 10px;
}

.msgHeader {
	background:#333333;
	background-image:url(/imgs/hairspray/msg_header_bg.gif);
	height: 32px;	
}

.pvtChatDiv .msgHeader .ttl {
	float: right;
	margin-right:31px;
	_margin-right:0px;
}

#messengerChatWindow .msgHeader .ttl {
	float:right;
	margin-right: 9px;
}

.msgHeader .logo {
	float: left;
	margin-top:10px;
	margin-left:10px;
	border: none;
}

.msgAdContainer {
	background:url(/imgs/hairspray/msgAdBg.gif) repeat-x top left;
	text-align: center;
	position:relative;
	width:100%;
	clear:both;
}
.msgAdContainerForPromo {
	padding-top:5px;
	height:40px;
}
.msgAdContainerForMiniAd {
	padding-top:3px;
	height:60px;
	_height:63px; /* ie7 for padding bug */
}

.msgIMShieldOptions {
	height:35px;
	_height:37px;
	background:#fff;
	border:solid 1px #bbbbbb;
}

.msgIMShieldOptionsInner {
	padding-top:5px;
	padding-left:23px;
}


img.imShieldImg {
	border:0;
	width:15px;
	height:15px;
	padding-top:3px;
	padding-right:5px;
	float:left;
}

.messengerContentPaneMainDiv {
	background: #ffffff;
}

.msgOptions2 {
	top:10px;
	left:150px;
	position:absolute;
}

.msgContentPaneDiv {
	float:left;
	display:block;
}

.msgFooter {
	padding-top:4px;
	height:17px;
	_height:21px; /* ie */
	width:100%;
	margin-top: 3px;
	text-align:right;
	background:url(/imgs/hairspray/msgFooterBg.gif) repeat-x top left;
}

.MessengerContentPaneHeader {
	margin:0;
	padding:0;
	width:100%;
	height:79px;
}

.messengerEditLink {
	text-align:right;
	float:right;
	position:relative;
	display:block;
	margin-top:-10px;
	font-weight:normal;
}


.userStatusImg { 
	width:34px;
	height:34px;
	background:url(/imgs/hairspray/msgUserThumbBg.gif) no-repeat top left;
}

.userStatusImg .userStatusThumb {	
	border:0;
	margin-top:3px;
	width:28px;
	height:28px;
}

.msgStatusSelectArrow {
	padding-top:6px;
	_padding-top:0;
}

.optionsSpan {	
	text-decoration: none;
	width:90px;
}

.optionsSpan a, .optionsSpan a:visited, .optionsSpan a:link {
	text-decoration: none;
}

.userStatusSpan {
	margin-top:8px;
	padding-left:6px;
	
}
.msgrTopWrapper {
	width:215px;
	overflow:hidden;
}	
.userStatusSpan .memberName {
	color:#FB7C30;
	font: bold .9em Verdana;
	overflow: hidden;
}
.userStatusSpan .memberName,
.userStatusSpan .msgrSignOutDiv {
	padding-bottom:5px;
}
.userStatusSpan .line {
	border-bottom:  1px solid #bbbbbb;
	clear: both;
}
.userStatusSpan .msgrSignOutDiv {
	float: right;
	margin-top: 2px;
	font-size: 0.7em;
}

.currentStatusDiv, #currentStatusDiv {
	cursor:pointer;
	margin-top:3px;
	color: #3480bb;
	font: normal .7em Verdana;
}

.unSelectedStatus {
	cursor:pointer;
	padding-left: 20px;
	padding-top:3px;
	padding-bottom:3px;
	border-bottom:  1px solid #cccccc;	
}

.unSelectedStatusHover {
	background: #eeeeee;
	cursor:pointer;
	padding-left: 20px;
	padding-top:3px;
	padding-bottom:3px;
	border-bottom:  1px solid #cccccc;	
}

.selectedStatus {
	cursor:pointer;
	padding-left: 20px;
	padding-top:3px;
	padding-bottom:3px;
	background:url(/imgs/hairspray/statusSelectedCheck.gif) no-repeat left top;
	border-bottom:  1px solid #cccccc;
}

.selectedStatusHover {
	background: #eeeeee;
	cursor:pointer;
	padding-left: 20px;
	background:url(/imgs/hairspray/statusSelectedCheck.gif) no-repeat left top;
	padding-top:3px;
	padding-bottom:3px;
	border-bottom:  1px solid #cccccc;	
}

.chatBioDiv {
	background: #eeeeee;
	height:26px;
	padding-top:2px;
}

.chatBioDiv input {
	overflow: hidden;
	border: 1px solid #eee;
	background-color: #eee;
	margin: 0px;
	width: 100%;
	cursor: pointer;
	font-size:0.7em;
}
.chatBioDiv input.emptyChatBio,
.chatBioDiv input:hover,
.chatBioDiv .ieHover input {
	border-color: #bbb;
}
.chatBioDiv input.emptyChatBio {
	color: #666;
}
.chatBioDiv input:hover,
.chatBioDiv .ieHover input {
	text-decoration: underline;
}
.chatBioDiv input.activeChatBio,
.chatBioDiv input.activeChatBio:hover,
.chatBioDiv .ieHover input.activeChatBio {
	background-color: #fff;
	border-color: #bbb;
	text-decoration: none;
}


/*--------------Messenger Ads------------*/

#msgMiniAd,
#pvtMiniAd,
#pvtMiniSecondaryAd {
	border: 0;
}

.mini-ad {
	width: 120px;
	height: 60px;
}

#grpTextAd {
	width: 570px;
	height: 34px;
	background:#FE4800;
	border: 0;
}

#grpBigBoxAd {
	width: 300px;
	height: 250px;
	border: 0;
	margin: 55px 5px 5px 5px;
}

.msgWinAd {
	text-align:center;
	background:#bfbfbf;
	clear:both;		
}

.msgWinAd img {
	border:solid 5px #bcbcbc;
	width:110px;
	height:50px;	
}

.msgWinHeader {
	background-color:#eeeeee;
	padding:5px;
	clear:both;	
}

.msgTextAdBg {
	width:100%;
	height:40px;
	clear:both;
}

.text-ad-chat {
	background: #fe4800;
	color: #ffffff;
	font: 16pt verdana;
	overflow:hidden;
	height:34px;
	text-align: center;
}

.text-ad-chat img {
	border:0;
	position:relative;
	top:2px;
	left:8px;
}

.text-ad-chat a,
.text-ad-chat a:link,
.text-ad-chat a:active,
.text-ad-chat a:visited,
.text-ad-chat a:hover {
	color: #ffffff;
	position:relative;
	top:-3px;
	font-size: 16px;
}

.msgTextAd {
	width:100%;	
	height:35px;
	text-align: center;
}

.text-ad {
	font: 13pt verdana;
	background: #fe4800;
	overflow:hidden;
	height:34px;
	text-align: center;
}

.text-ad img {
	float: right;	
	position:relative;
	top:-22px;
}

.text-ad a,
.text-ad a:link,
.text-ad a:active,
.text-ad a:visited,
.text-ad a:hover {
	color: #fff;
	font-size: 18px;
	text-decoration: none;
}

.ie .text-ad a,
.ie .text-ad a:link,
.ie .text-ad a:active,
.ie .text-ad a:visited,
.ie .text-ad a:hover {
	line-height: 13px;
}

.messengerTextAd a,
.messengerTextAd a:link,
.messengerTextAd a:active,
.messengerTextAd a:visited,
.messengerTextAd a:hover {
	font-size: 13px;
}

/*--------------Module: Intercept Lite Box------------*/
.liteBoxContainer {
	top: 0px;
	left: 0px;
	position: absolute;
	z-index: 10; /* place it over the other DIV */
}

.liteBoxBG {
	background-color: black;
	filter:alpha(opacity=50);
	-moz-opacity:0.5;
	opacity: 0.5;
}

.liteBoxContent {
	background-color: white;
	position: absolute;
	z-index: 12; /* place it over the other DIV */
	font: normal 1.2em verdana;
	text-align: left;
	padding: 10px;
}

.liteBoxContent .closeBtn2 {
	float: right;
	left: 10px;
	position: relative;
	top: -10px;
}

#messengerChatWindow .liteBoxBG {
	width: 285px;
	height: 760px;
}

#messengerChatWindow .liteBoxContent {
	position:absolute;
	left: 40px;
	top: 100px;
	background-color:white;
	width:200px;
	height:100px;
}

#messengerChatWindow .disconnected {
	height:250px;
}

#messengerChatWindow .liteBoxContent.whoThinksImHot,
#messengerChatWindow .liteBoxContent.whosViewedMe {
	width: 210px;
	font-size: 1.12em;
	height:200px;
}
#messengerChatWindow .liteBoxContent.whoThinksImHot {
	top: 297px; /* place the litebox on the whoThinksImHot list */
}

#messengerChatWindow .liteBoxContent.whosViewedMe {
	top: 317px; /* place the litebox on the whosViewedMe list */
}

#messengerChatWindow.res600h .liteBoxContent.whoThinksImHot,
#messengerChatWindow.res600h .liteBoxContent.whosViewedMe {
	top: 183px; /* move up for small screen */
}


/*--------------Module: IM Shield Lite Box------------*/
#messengerChatWindow .liteBoxContent.imShield {
	width: 218px;
	height:380px;
	text-align: left;
	background-color: #f8f8f8;
	border: 1px #bcbcbc solid;
	margin-top: -50px;
	left:22px;
}
.ie .imShield {
	width: 238px;
}
.imShield .innerIMShield {
	font-size: 11px;
}
.imShield .smallIntro,
.imShield .title {
	text-align: center;
}
.imShield .title {
	margin: 10px 0 12px;
}
.imShield .titleSpan {
	background: url('/imgs/hairspray/imShield-on.gif') no-repeat left; 
	font-weight: bold;
	font-size: 14px;
	color: #f17c27;
	padding: 0 20px;
}
.closeButton img {
	vertical-align: middle;
}
.imShield .closeButton {
	position: absolute;
	top: 4px;
	right: 4px;
}
.imShield .closeButton img {
	width: 9px;
	height: 9px;
	margin-left: 3px;
	border: 0 none;
}
.imShield .spacerline {
	height: 0;
	border-bottom: 1px solid #d6daec;
	margin: 10px 2px 12px 2px;
}
.ie .imShield .spacerline {
	margin-top: -10px;
}
.imShield #turnOnIMShield {
	margin: 0;
	margin-top: 2px;
	padding: 0;
	width: 10px;
	height: 10px;
	float: left;
}
.imShield #turnOnIMShieldLabel {
	margin-left: 18px;
	margin-bottom: 14px;
}
.imShield h4{
	margin-bottom: 11px;
	font-size: 1em;
}
.imShield .description {
	font-size: 10px;
	margin-bottom: 11px;
}

.imShield .textInputWrapper {
	height: 19px;
	width: 207px;
	margin: 4px 0 9px 0;
}
.imShield #imShieldQuestion,
.imShield #imShieldAnswer {
	height: 19px;
	width: 203px;
	font-size: 1em;
	position: fixed;
	margin: 0;

}
.imShield #imShieldSubmit {
	margin-left: 1px;
	background-color: #90a7bb;
	border: 1px solid #466d8e;
	width: 50px;
	height: 21px;
	padding: 0;
	color: #ffffff;
	font-weight: bold;
}

.liteBoxContent.imShield {
	top: 107px;
}

.roomTab {
	background: #ffffff;
}

.seeAllRooms {
	background: #d9d9d9;
	padding-top: 5px;
	padding-bottom: 5px;
	text-align:center;
}

.seeAllRooms a {
	color: #3480BB;
	font-weight:bold;
	cursor: pointer;
}

.seeAllRooms a:hover {
	cursor: pointer;
}

/* ------------------- chatMemberStatus ------------------- */
.groupChatMemberStatusContainer {
	height: 16px;
	border-top: 1px solid #bbbbbb;
	margin-top: 15px;
	margin-bottom: 48px;
	padding-top: 4px;
}
.groupChatMemberStatusText,.groupChatMemberStatus {
	float: left;
}
.groupChatMemberStatusText {
	margin-right: 10px;
	margin-top: 3px;
	height: 16px;
}
/* ------------------- buttons ------------------- */

.chatLinkBtnContainer {	
	background: transparent no-repeat left top;
	height:29px;
	float:left;
	margin:3px;
	margin-left: -6px;
}

.chatLinkBtnContainer .linkBtn, .chatLinkBtnContainer .linkBtn a  {
	position:relative;
	left:3px;
	float:left;
	color:#fff;
	font:bold .95em verdana;
	height:29px;
}

.chatLinkBtnContainer .linkBtn a {
	background: transparent no-repeat right top;
	padding-right:30px;
	padding-top:5px;
	padding-left:6px;
	color:#fff;
	text-decoration:none;	
}

.chatLinkBtnContainer .linkBtn a:hover {
	right:150px;
}

a.noUnderline, a.noUnderline2 {
	text-decoration: none;
	margin-left: 0px;
	white-space: nowrap;
	color: #333333;
	font-weight:normal;
}

a.noUnderline:hover, a.noUnderline2:hover, a.chatListMemberBio, a.chatListMemberBio:hover  {
	text-decoration: none;
	color: #333333;
	font-weight:normal;
}

.noUnderline2 {
	margin-left:0px;
	font-weight:normal;
	text-decoration: none;
	color: #333333;
}

.noUnderline2 a, .noUnderline2 a:hover, a.noUnderline2, a:hover.noUnderline2, a:hover.chatListMemberBio, .chatListMemberBio a, .chatListMemberBio a:hover{
	font-weight:normal;
	text-decoration: none;
	color: #333333;
}

.chatLinkBtnContainer.subscribe,
.chatLinkBtnContainer.subscribe .linkBtn a
	{
	height: 29px;
}

.chatLinkBtnContainer.subscribe {
	background-image: url(/imgs/css/chatBtnlink-bg-trans-left.png);
}

.chatLinkBtnContainer.subscribe .linkBtn a {
	background-image: url(/imgs/css/chatBtnlink-bg-trans.png);
}

.chatLinkBtnContainer.subscribe .linkBtn a:hover {
	background-image: url(/imgs/css/chatBtnlink-bg-trans-over.png);
}

.chatLinkBtnContainer.submit,
.chatLinkBtnContainer.cancel {
	background-image: url(/imgs/css/btnlink-bg-left.gif);
}

.chatLinkBtnContainer.submit .linkBtn a {
	padding-right: 24px;
	margin-right: 10px;
	background-image: url(/imgs/css/btnlink-bg.gif);
}

.chatLinkBtnContainer.submit .linkBtn a:hover {
	background-image: url(/imgs/css/btnlink-bg-over.gif);
}

.chatLinkBtnContainer.cancel .linkBtn a {
	padding-right: 6px;
	background-image: url(/imgs/css/btn-cancel-blue.gif);
}

.chatLinkBtnContainer.cancel .linkBtn a:hover {
	background-image: url(/imgs/css/btn-cancel-blue-over.gif);
}

.chatLinkBtnContainer.submit,
.chatLinkBtnContainer.cancel,
.chatLinkBtnContainer.submit .linkBtn,
.chatLinkBtnContainer.cancel .linkBtn,
.chatLinkBtnContainer.submit .linkBtn a,
.chatLinkBtnContainer.cancel .linkBtn a {
	height: 21px;
	font-size: 10px;
}

/* ------------------- grp chat instance dropdown ------------------- */

.grpChatMainAreaEnvelope .prettyMenuContainer {
	padding-top:14px;
	padding-bottom:2px;
}

.grpChatFindRoomEnvelope .prettyMenuContainer {
	padding-left:5px;
	padding-top:7px;
	padding-bottom:2px;
}

.selectedOptionDiv {
	color:#F16A27;	
	line-height:14px;
	font: normal 1em verdana;
	cursor:pointer;
	margin-top:3px;
	overflow:hidden;
	white-space:nowrap;
}
.grpChatMainAreaEnvelope .selectedOptionDiv {
	color:#333333;
}

.selectedOptionLobbyDiv {
	color:#F16A27;	
	font: normal .9em verdana;
	cursor:pointer;	
	margin-top:12px;
	overflow:hidden;
	white-space:nowrap;
}
.grpChatMainAreaEnvelope .selectedOptionLobbyDiv {
	color:#333333;
}

.selectedOptionSpan {
	padding-top: 5px;
}
.selectedOptionDiv .selectedOptionSpan {
	font-weight:bold;
}
.selectedOptionSpan a {
	text-decoration:none;
	color:#F16A27;
}
.grpChatMainAreaEnvelope .selectedOptionSpan a {
	color:#333333;
}

.allOptionsDiv {
	position:absolute;
	background-color: #e1e1e1;
	cursor:pointer;
	z-index:1;
	line-height:18px;
	padding-top:3px;
	padding-bottom:3px;
	padding-right:5px;
	margin-top:3px;
}
.allLobbyOptionsDiv {
	position:absolute;
	background-color: #e1e1e1;
	z-index:1;
	line-height:18px;	
	cursor:pointer;
	padding-top:3px;
	padding-bottom:3px;
	padding-right:5px; 
	margin-top:3px;
}
.grpChatFindRoomEnvelope .allLobbyOptionsDiv {
	font-size:.925em;
	overflow:hidden;
	white-space:nowrap;
}
.unSelectedMenuOption {
	color:#666666;
	cursor:pointer;
	background-color:none;
}
.unSelectedMenuHover {
	color:#666666;
	background-color:#F3F3F3;
	cursor:pointer;
}
.selectedMenuOption, .selectedMenuOption a {
	color:#F16A27;
	font-size:1em;
	cursor:pointer;
}

.grpChatMainAreaEnvelope .selectedMenuOption, .grpChatMainAreaEnvelope .selectedMenuOption a {
	color:#333333;
}

.grpChatFindRoomEnvelope .selectedMenuHover, .grpChatFindRoomEnvelope .selectedMenuHover a {
	color:#333333;
	cursor:pointer;
}

.grpChatMainAreaEnvelope .selectedMenuHover, .grpChatMainAreaEnvelope .selectedMenuHover a {
	color:#FF6633;
	cursor:pointer;
}

#tab2 {
	overflow-y: auto;
}



.thumb {
	background: transparent url(/imgs/css/thumbBg-trans.png) no-repeat left top;	
	line-height:85px;
	height:88px;
	width:89px;
	font-family:arial;
	text-align:center;	
}

.miniBoundBox {
	width: 34px;
	height: 34px;
	float: left;
	background: transparent url(/imgs/hairspray/msgUserThumbBg.gif) no-repeat scroll left top;
	text-align: center;
	padding-top: 3px;
	margin-right: 8px;


}

.miniThumbDesc {
	_height: 35px;
	height: 35px;

}

#spyMiniProfile {
	width: 250px;
	height: 155px;
	margin-bottom: 0px;
	margin-top: 8px;
}

#grpMiniProfile {
	width: 240px;
	height: 155px;
	margin-bottom: 3px;
	margin-top: 8px;
}

.ie #grpMiniProfile {
	width: 240px;
	height: 160px;
	margin-bottom: 0px;
	margin-top: 8px;
}
.ie #spyMiniProfile {
	width: 250px;
	height: 155px;
	margin-bottom: 0px;
	margin-top: 8px;
}
.faveRoomDiv {
	float:left;
	width:94%;
	overflow:hidden;
}
.closeImgDiv {
	float:left;
	width:9px;
	height:9px;
	padding-top:9px;
}


#msgrMiniProfile {
	position: absolute;
	top: 26px;
	left: 0px;
	width: 96%;
	z-index: 10;
	background-color:white;
	margin-top:8px;
	margin-bottom:8px;
	margin-right:8px;
	margin-left:5px;
	height: 150px;
	border-width: 1px;
	border-color: #999999;
	border-style: solid;
	color: #555555;
	font-family: Arial;
	font-size: 11px;
	text-align: left;
	display:none;
}
#mpLinks {
	border-width:0px;
	border-top-width:1px;
	border-color:silver;
	border-style:solid;
	margin-left: 5px;
	margin-right: 5px;
}
#mpLinks a {
	color: #3480BB;
	text-decoration: none;
}
#mpLinks a:hover {
 	text-decoration: underline;
}

#mpPhotoDiv {
	float:left;
	background: transparent url(/imgs/css/thumbBg-trans.png) no-repeat left top;	
	height:88px;
	width:89px;
	text-align:center;
	margin-left:4px;	
}
#mpPhotoDiv a {
	text-decoration:none;
}

#mpPhotoDiv img {	
	max-width: 77px;
	max-height: 77px;
	vertical-align:middle;
	position:relative;
	border:0;
	margin-top: 3px;
}

#mpProfileDiv {
	float:left;
	margin-left:8px;
	width:160px;
}
#mpLeftLinks {
	float:left;
	margin-top:5px;
	margin-left:8px;
}
#mpRightLinks {
	margin-top:5px;
	float:left;
	margin-left:10px;
}
.ie #mpLeftLinks {
	margin-top: 0px;
}
.ie #mpRightLinks {
	margin-top: 0px;
}


a.profileHeadline {
	color: #FB7C30;
	font-weight: bold;
}


.memberStatus {
	color: #61b21b;
	padding: 0 0 0 13px;
	background: url(/imgs/css/greendot.gif) no-repeat;
	margin-top: 5px;
}
.memberStatusRed {
	color: #555555;
	padding: 0 0 0 13px;
	background: url(/imgs/css/RedDot.png) no-repeat;
	margin-top: 5px;
}
#reconDiv {
	margin-top:10px;
	margin-bottom:10px;
}

#reconDivv .submitBtnContainevr {	
	background: transparent url(/imgs/css/btn-lt.png) no-repeat left -66px;
	height:29px;
	padding-left:6px;
	margin:3px;	
	float:right;
	margin-left:55px;
}
#reconDiv .submitBtnContainer input.submitBtn {
	float:right;
	color:#fff;
	font-weight:bold;
	border:0;	
	height:29px;
	padding-right:27px;
	padding-left:6px;	
	padding-bottom:7px;	
	background: transparent url(/imgs/css/btn-rt.png) no-repeat right -42px;
	cursor:pointer;
}

.listOnlineNoChat {
	height:42px;
	border-style:solid;
	border-width:2px;
	background-color:#EEEEEE;
	border-color:#CCCCCC;
	filter:alpha(opacity=50);
	-moz-opacity:0.5;
	opacity: 0.5;
	overflow-y:hidden;
}
.ie .listOnlineNoChat {
	height:42px;
}

/* IE PNG Support */
.logo { 
	behavior: url(/js/iepngfix.htc)
}





body {
	padding:0px;
	margin:0px;
	border:0px;
	font: normal 11px Verdana;
	color:#555555;
	background: #C6C6C6 url(/imgs/grpGradient.jpg) repeat-x left top;
}

.miniBoundBox {
	width: 34px;
	height: 34px;
	float: left;
	background: transparent url(/imgs/hairspray/msgUserThumbBg.gif) no-repeat scroll left top;
	text-align: center;
	padding-top: 3px;
	margin-right: 8px;
}

.miniThumbDesc {
	_height: 35px;
	height: 35px;
}


.ie {
	margin-top:-15px;
}
#mainWinGrpChat {
	
}
#msgHeader {
	background-image:url(/imgs/hairspray/chat_header_bg.gif);
	height: 32px;	
}

#msgHeader .ttl {
	float: right;
	padding-right:10px;
	margin-right:10px;
	border:0px;
}
#msgHeader .logo {
	float: left;
	margin-top:10px;
	margin-left:10px;
	border: none;
}

#grpAdContainer {
	background-image:url(/imgs/lightGradient.jpg);
	padding:5px;
	margin-bottom:1px;
	text-align: center;
}

#grpTextAd {
	width: 570px;
	height: 34px;
	background:#FE4800;
	border: 0;
}

#grpBigBoxAd {
	width: 300px;
	height: 250px;
	border: 0;
	margin: 55px 5px 5px 5px;
}

#grpBigBoxAdTxt #bigbox {
	display: none;	
}

#chatEnvelope {

}
#chatUI {
	margin-left:5px;
}
#chatAd {
	width:313px;
	float:right;
	background-color:#bbbbbb;
	border-left:solid 2px #ffffff;
}
#grpTabBar {
	height:20px;
	overflow:hidden;
	margin-left:5px;
}
#chatLobby {
	margin-left:4px;
}
#chatRoomListDiv {
	background-color:white;
	width:271px;
	height:365px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;	
	overflow:scroll;	
	
}
#chatLobbySidebar {
	float:right;
	width:281px;
	height:365px;
	background: #F1F1F1 url(/imgs/findRoom_leftBg.jpg) repeat-y left top;
	border:solid 1px #B4B4B4;
}
#chatLobbySidebar .groupChatListMember {
	font-size:1.1em;
	color:#333333;
}
#chatRoom {
	border-style:solid;
	border-color:#cccccc;
	border-width:1px;
	border-top-width:0px;
	margin-left:4px;
	background-color:#F2F2F2;
}
#chatRoomSidebar {
	float:left;
	width:251px;
	height:377px;
	border-right: solid 1px #bbbbbb;
}
#chatRoomMemberList {

}
#chatRoomArea {
	margin-left:11px;
	float:left;
}
#chatRoomTranscript {

}
#chatRoomInputLine {

}
#grpChatTabBase_findRoom {
	height:5px;
	background-color:#a5c5de;
}

#grpChatTabBase_inRoom {
	height:5px;	
	background-color:#1377B7;
}
.faveLink {
	font: normal 10px Verdana;
	color: #3480BB;
	
}

.chatRoomInstanceDiv {	
	font:bold 1.0em verdana;
display:none;
}
.chatRoomMemberStack {
	background-color:white;
	width:259px;
	height:266px;
	overflow-y:scroll;
	overflow-x:hidden;
	margin-top:12px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;	
}
.enterChatButton {
	float:right;
	padding-top:11px;
	padding-right:8px;
}
.grpChatFooter {
	margin-top:14px;
	margin-bottom:13px;
	font-size:11px;
}
.grpChatFooter a {
	cursor:pointer;
	color:#3480bb;
}
.chatRoomListDiv {
	background-color:white;
	width:271px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;	
	overflow:scroll;	
	margin-left:3px;
}

.lobbyTopLevelOpen {
	background-image:url(/imgs/lobbyHeteroGradient.JPG);
	background-color:#eeeeee;
	font-weight:bold;
	color:#333333;
	background-repeat:repeat-x;
	height:19px;	
	line-height:19px;
	cursor:pointer;
}

.lobbyTopLevelClosed {
	background-image:url(/imgs/lobbyHeteroGradient.JPG);
	background-color:#eeeeee;	
	font-weight:bold;	
	background-repeat:repeat-x;
	height:19px;
	border-bottom:solid 1px #B4B4B4;
	line-height:17px;
	font-size:
	color:#333333;	
	cursor:pointer;
}

.lobbySubLevel {
	line-height:19px;
}

.lobbyMidLevelOpen {
	background-color:#FFFFFF;
	color:#f16a27;
	height:18px;
	cursor:pointer;
}

.lobbyMidLevelClosed {
	background-color:#FFFFFF;
	color:#555555;
	height:18px;
	cursor:pointer;
}

.lobbyRoom {
	background:#ffffff url(/imgs/arrowSubRight.jpg) no-repeat left center;	
	color:#666666;
	height:18px;
	cursor:pointer;	
	padding-left:12px;
}
	
.lobbyRoomHover {
	background:#ffffff url(/imgs/arrowSubRightOn.jpg) no-repeat left center;	
	background-color:#eeeeee;
	color:#FF6633;
	height:18px;
	cursor:pointer;
	padding-left:12px;
}

.lobbyRoomSelected {
	background:#ffffff url(/imgs/arrowSubRightOn.jpg) no-repeat left center;	
	background-color:#eeeeee;
	color:#FF6633;
	height:18px;
	cursor:pointer;
	padding-left:12px;
}



/* ------------------- grp chat instance dropdown ------------------- */

.selectedOptionDiv {
	color:#F16A27;	
	line-height:14px;
	font: normal 1em verdana;
	cursor:pointer;
	margin-top:3px;
	overflow:hidden;
	white-space:nowrap;
}
#chatRoomArea .selectedOptionDiv {
	color:#333333;
}
#lobbyInstanceWidgetDiv {
	color:#F16A27;	
	font: normal verdana;
	font-weight:bold;
	margin-top:4px;
	margin-bottom:7px;
	width:220px;
	font-size:1.0em;
	overflow:visible;
}
.selectedOptionLobbyDiv {
	color:#F16A27;	
	font: normal .9em verdana;
	cursor:pointer;	
	margin-top:12px;
	overflow:hidden;
	width:230px;
	white-space:nowrap;
}
#chatRoomArea .selectedOptionLobbyDiv {
	color:#333333;
}

.selectedOptionSpan {
	padding-top: 5px;
}
.selectedOptionDiv .selectedOptionSpan {
	font-weight:bold;
}
.selectedOptionSpan a {
	text-decoration:none;
	color:#F16A27;
}
#chatRoomArea .selectedOptionSpan a {
	color:#333333;
}

.allOptionsDiv {
	position:absolute;
	background-color: #e1e1e1;
	cursor:pointer;
	z-index:1;
	line-height:18px;
	padding-top:3px;
	padding-bottom:3px;
	padding-right:5px;
	margin-top:3px;
}
.allLobbyOptionsDiv {
	position:absolute;
	background-color: #e1e1e1;
	z-index:1;
	line-height:18px;	
	cursor:pointer;
	padding-top:3px;
	padding-bottom:3px;
	padding-right:5px; 
	margin-top:3px;
}
#chatRoomArea .allLobbyOptionsDiv {
	font-size:.925em;
	overflow:hidden;
	white-space:nowrap;
}
.unSelectedMenuOption {
	color:#666666;
	cursor:pointer;
	background-color:none;
}
.unSelectedMenuHover {
	color:#666666;
	background-color:#F3F3F3;
	cursor:pointer;
}
.selectedMenuOption, .selectedMenuOption a {
	color:#F16A27;
	font-size:1em;
	cursor:pointer;
}

#chatRoomArea .selectedMenuOption, #chatRoomArea .selectedMenuOption a {
	color:#333333;
}

#chatLobby .selectedMenuHover, #chatLobby .selectedMenuHover a {
	color:#333333;
	cursor:pointer;
}

#chatRoomArea .selectedMenuHover, #chatRoomArea .selectedMenuHover a {
	color:#FF6633;
	cursor:pointer;
}

.groupTabActive {
	margin-left:3px;
	background:url(/imgs/tabBgBlue-right.gif) no-repeat right top;
	float:left;
	height:22px;
	color:white;
	font-weight:bold;
	cursor:pointer;
}

.groupTabActive .groupTab-inner {
	padding-top: 3px; 
	padding-right: 7px; 
	padding-left:3px; 
	background:url(/imgs/tabBgBlue-left.gif) no-repeat left top;
}

.groupTabActive a {
	color:#ffffff;
	padding-left:3px;
}

.groupTabInactive  {
	margin-left:3px;
	background:url(/imgs/tabBgGray-right.gif) no-repeat right top;
	float:left;
	height:22px;
	color:white;
	font-weight:bold;
	cursor:pointer;
}

.groupTabInactive a {
	color:#ffffff;
	padding-left:3px;
}

.groupTabInactive .groupTab-inner {
	padding-top: 3px; 
	padding-right: 7px; 
	padding-left:3px; 
	background:url(/imgs/tabBgGray-left.gif) no-repeat left top;
}

.grpChatUserName {
	font-weight:bold;
	line-height:15px;
}

.groupChatListMember {
	padding:1px;
	background-color:#ffffff;
	border-style:solid;
	border-width:0px;
	border-bottom-width:1px;
	border-bottom-color:#bbbbbb;
	height:35px;
	font-weight:normal;
}

.groupChatListMemberNewMessage {
	border-style:solid;
	border-width:2px;
	background-color:#ffffff;
	border-color:#3480BB;
	height:35px;
	font-weight:normal;
}

.listDiv.chatListMemberSelected,
.groupChatListMemberSelected {
	border-style:solid;
	border-width:2px;
	background-color:#ffffff;
	border-color:#FF6633;
	height:35px;
}
.listDiv.chatListMemberSelected {
	height:33px;
	_height: 34px;
	padding-top: 1px;
}
.listDiv.chatListMemberSelected .miniIcon{
	margin-left: 1px
}
#chatLobbySidebar .groupChatListMemberSelected {
	font-size:1.1em;
}

.groupChatListMemberOffline {
	border-style:solid;
	border-width:2px;
	background-color:#EEEEEE;
	border-color:#CCCCCC;
	height:35px;
	filter:alpha(opacity=50);
	-moz-opacity:0.5;
	opacity: 0.5;
}
.grpChatPhoto {
	float:left;	
	border:0;
	margin-right:8px;
}


.chatListMemberName {	
	font-weight:bold;
	line-height:15px;
	font-size: .925em;
}

#grpMiniProfileMsg {
	height:10px;
	border-width:0px;
	margin-top:10px;
	margin-bottom:13px;
	font:11px verdana;
	color:#555555;
}
#grpChatListStack {
	height:309px;
	background-color:white;
	width:229px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;
	margin-bottom:7px;
	overflow-y:scroll;
	overflow-x:none;
	clear:both;
}
.grpChatIframe {
	background-color:white;
	width:277px;
	height:278px;
	border-style:solid;
	border-width:1px;
	border-color:#bbbbbb;
	margin-bottom:0px;
	_margin-top:-15px;
	overflow-y:scroll;
	_overflow-y:auto;	
}
.grpChatInputLine {
	margin-top:8px;
	width:277px;
	background-color:white;
	border:solid 1px #bbbbbb;
}
.grpChatInput {
	width:220px;
	height:20px;
	border-width:0px;
	margin:0px;
	float:left;
}
#spyMiniProfile {
	background-color:white;
	margin-top:8px;
	margin-bottom:8px;
	width: 257px;
	height: 150px;
	border-width: 1px;
	border-color: #999999;
	border-style: solid;
	color: #555555;
	font-family: Arial;
	font-size: 11px;
	text-align: left;
}
#grpMiniProfile {
	background-color:white;
	margin-top:8px;
	margin-bottom:8px;
	width: 227px;
	height: 150px;
	border-width: 1px;
	border-color: #999999;
	border-style: solid;
	color: #555555;
	font-family: Arial;
	font-size: 11px;
	text-align: left;
}

#mpLinks {
	border-width:0px;
	border-top-width:1px;
	border-color:silver;
	border-style:solid;
	margin-left: 5px;
	margin-right: 5px;
	padding-top:1px;
}
#mpLinks a {
	color: #3480BB;
	text-decoration: none;
}
#mpLinks a:hover {
 	text-decoration: underline;
}

#mpPhotoDiv {
	float:left;
	background: transparent url(/imgs/css/thumbBg-trans.png) no-repeat left top;	
	height:88px;
	width:89px;
	text-align:center;
	margin-left:4px;	
}
#mpPhotoDiv a {
	text-decoration:none;
}

#mpPhotoDiv img {	
	max-width: 77px;
	max-height: 77px;
	vertical-align:middle;
	position:relative;
	border:0;
	margin-top: 3px;
}

#mpProfileDiv {
	float:left;
	margin-left:8px;
	width:120px;
}
#spyMiniProfile #mpProfileDiv {
	width:150px;
}
#mpLeftLinks {
	margin-top:2px;
	margin-left:8px;
}
#mpRightLinks {
	margin-top:2px;
	float:right;
	margin-left:8px;
}
.ie #mpLinks {
	margin-top: -6px;
}


a.profileHeadline {
	color: #FB7C30;
	font-weight: bold;
	text-decoration:none;
}
a.profileHeadline:hover {
	text-decoration:underline;
}


.memberStatus {
	color: #61b21b;
	padding: 0 0 0 13px;
	background: url(/imgs/css/greendot.gif) no-repeat;
	margin-top: 0px;
	font-size:10px;
}
.memberStatusRed {
	color: #555555;
	padding: 0 0 0 13px;
	background: url(/imgs/css/RedDot.png) no-repeat;
	margin-top: 5px;
	font-size:10px;
}
/*--------------Module: Intercept Lite Box------------*/
.liteBoxContainer {
	top: 0px;
	left: 0px;
	position: absolute;
	z-index: 10; /* place it over the other DIV */
}

.liteBoxBG {
	background-color: black;
	filter:alpha(opacity=50);
	-moz-opacity:0.5;
	opacity: 0.5;
}

.liteBoxContent {
	background-color: white;
	position: absolute;
	z-index: 12; /* place it over the other DIV */
	font: normal 1.0em verdana;
	text-align: left;
	padding: 10px;
}

.liteBoxContent .closeBtn2 {
	float: right;
	left: 10px;
	position: relative;
	top: -10px;
}


.liteBoxContainer{
	top: 33px;
}

.liteBoxContent .closeBtn2 img {
	border: 0px;
	width: 62px;
	height: 18px;	
}

.liteBoxContent .memberInfoLink {
	font: normal .9em verdana;
	margin-top:13px;
}

.liteBoxBG {
	width: 900px;
	height: 490px;
}

.premWindow .liteBoxBG {
	width:100%;
}

.liteBoxContent {
	height:179px;
	left:338px;
	padding:10px;
	top:125px;
	width:220px;
	border:solid 1px #bbbbbb;
	color:#333333;
}
.ie .liteBoxContent {
	width:240px;
	height: auto;
}
.liteBoxContent #privateChatName {
	display: none;
}
.premWindow .liteBoxContent {
	left:185px;
}
#loadingRoomIndicator {
	font-size:0.9em;
	margin-left:5px;
	display:none;
}
/* ------------------- buttons ------------------- */

.chatLinkBtnContainer {	
	background: transparent no-repeat left top;
	height:29px;
	float:left;
	margin:3px;
	margin-left: -6px;
}

.chatLinkBtnContainer .linkBtn, .chatLinkBtnContainer .linkBtn a  {
	position:relative;
	left:3px;
	float:left;
	color:#fff;
	font:bold .95em verdana;
	height:29px;
}

.chatLinkBtnContainer .linkBtn a {
	background: transparent no-repeat right top;
	padding-right:30px;
	padding-top:5px;
	padding-left:6px;
	color:#fff;
	text-decoration:none;	
}

.chatLinkBtnContainer .linkBtn a:hover {
	right:150px;
}

a.noUnderline, a.noUnderline2 {
	text-decoration: none;
	margin-left: 0px;
	white-space: nowrap;
	color: #333333;
	font-weight:normal;
}

a.noUnderline:hover, a.noUnderline2:hover, a.chatListMemberBio, a.chatListMemberBio:hover  {
	text-decoration: none;
	color: #333333;
	font-weight:normal;
}

.noUnderline2 {
	margin-left:0px;
	font-weight:normal;
	text-decoration: none;
	color: #333333;
}

.noUnderline2 a, .noUnderline2 a:hover, a.noUnderline2, a:hover.noUnderline2, a:hover.chatListMemberBio, .chatListMemberBio a, .chatListMemberBio a:hover{
	font-weight:normal;
	text-decoration: none;
	color: #333333;
}

.chatLinkBtnContainer.subscribe,
.chatLinkBtnContainer.subscribe .linkBtn a
	{
	height: 29px;
}

.chatLinkBtnContainer.subscribe {
	background-image: url(/imgs/css/chatBtnlink-bg-trans-left.png);
}

.chatLinkBtnContainer.subscribe .linkBtn a {
	background-image: url(/imgs/css/chatBtnlink-bg-trans.png);
}

.chatLinkBtnContainer.subscribe .linkBtn a:hover {
	background-image: url(/imgs/css/chatBtnlink-bg-trans-over.png);
}

.chatLinkBtnContainer.submit,
.chatLinkBtnContainer.cancel {
	background-image: url(/imgs/css/btnlink-bg-left.gif);
}

.chatLinkBtnContainer.submit .linkBtn a {
	padding-right: 24px;
	margin-right: 10px;
	background-image: url(/imgs/css/btnlink-bg.gif);
}

.chatLinkBtnContainer.submit .linkBtn a:hover {
	background-image: url(/imgs/css/btnlink-bg-over.gif);
}

.chatLinkBtnContainer.cancel .linkBtn a {
	padding-right: 6px;
	background-image: url(/imgs/css/btn-cancel-blue.gif);
}

.chatLinkBtnContainer.cancel .linkBtn a:hover {
	background-image: url(/imgs/css/btn-cancel-blue-over.gif);
}

.chatLinkBtnContainer.submit,
.chatLinkBtnContainer.cancel,
.chatLinkBtnContainer.submit .linkBtn,
.chatLinkBtnContainer.cancel .linkBtn,
.chatLinkBtnContainer.submit .linkBtn a,
.chatLinkBtnContainer.cancel .linkBtn a {
	height: 21px;
	font-size: 10px;
}
.turnOffAdsLink {
	font-size:.9em;

}

/* IE PNG Support */
.logo { 
	behavior: url(/js/iepngfix.htc)
}


#grpChatListStack .chatListMemberBio {
	width:150px;
}

.chatListMemberBio {	
	width:170px;
	overflow:hidden;
	font-weight:normal;
	font-size: .925em;
}








]]></>);




}



