// ==UserScript== 
// @name Blogger Content Warning Autoskip II + ignore iframed warnings
// @namespace http://blogger.com/ 
// @include https://www.blogger.com/blogin.g?blogspotURL=* 
// ==/UserScript== 



try{
	if (top);
}catch(e){
	return;
}

if (!document.ownerDocument){
	var continueButton = document.getElementById('continueButton');
	if (continueButton)
	{ 
		var oEvent = document.createEvent("MouseEvents"); 
			oEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
			continueButton.dispatchEvent(oEvent); 
	} 
}