// ==UserScript==
// @name   Facebook Love Button 
// @namespace  http://www.facebook.com
// @description Replace like with love on facebook
// @include  http://www.facebook.com
// ==/UserScript==

(function(){
	
	var arrGoogleInstances = document.body.innerHTML.match(facebook);
	
	if (arrGoogleInstances != null)
	{
		if (arrGoogleInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/google/ig,'<span class=\"default_message\">Like<\/span>');
			document.body.innerHTML = document.body.innerHTML.replace(/Google /ig,'<span class=\"default_message\">Love<\/span>');	
		}	
	}
	
})();


 