// ==UserScript==
// @name           Test
// @include        http://dolphinmania.pandaandpenguin.com/dolphinmania
// ==/UserScript==

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss ('  #rig-item {display:none ! important;} .gaiaLogo .bgAlpha a { background: url(http://www.pandaandpenguin.com/dolphin.png) no-repeat ! important; height: 100px ! important; width: 171px ! important;  margin-top: -20px ! important;} .imgAvatar #header_avatar { margin-top: 10px ! important; margin-left: 500px ! important; height:135px ! important;} #gaia_header .header_content .notificationChanges { margin-left: 530px ! important; margin-top: 50px ! important;} #gaia_header .header_content .notificationChanges .changeMessages h3 { background:url(http://pandaandpenguin.com/transparentpix.png) ! important;} #dailyReward { display:none ! important;} #gaia_header .header_content .userName li.welcome_edge {margin-left: -0px ! important;} #gaia_header .header_content .userName li.avatarName { background: url(http://www.pandaandpenguin.com/testbg.png) ! important; margin-left:-830px ! important; margin-top: 130px ! important; font-size: 12pt ! important; width:235px ! important;} body { background:url(http://pandaandpenguin.com/dolphin.png) repeat-x ! important;');
