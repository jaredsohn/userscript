// ==UserScript==
// @name           02 Auto Refesh
// @description    Reloads O2 Ireland every 12 minutes so it will keep you logged in.
// @include        https://www.o2online.ie/amserver/UI/*
// @include        http://www.o2online.ie/amserver/UI/*
// @include        http://messaging.o2online.ie*
// @license Free
// @version 1.0.0
// ==/UserScript==

	
		var StRefTime = '840'; 
	
    
    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);