// ==UserScript==
// @name        Auto Page Refresher
// @namespace   Refresher 
// @description easy editable refresher
// @version     1
// @grant       none
// ==/UserScript==
//===[Settings]===\\
		var StRefTime = '30';  //==[Set Time (seconds)]
	//===[/Settings]===\\
    
    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);