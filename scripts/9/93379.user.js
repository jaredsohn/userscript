// ==UserScript==
// @name           Meteor Ireland Auto Refesh (for Adam!)
// @description    Reloads Meteor Ireland every 12 minutes so it will keep you logged in.
// @include        http://www.mymeteor.ie/
// @include        https://www.mymeteor.ie/*
// @include        https://www.meteor.ie/*
// @include        http://www.meteor.ie/*
// @license Free
// @version 1.0.0
// ==/UserScript==

	
		var StRefTime = '840'; 
	
    
    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);