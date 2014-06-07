// ==UserScript==
// @name        The West CPU
// @namespace   *
// @include     http://*.the-west.*/game.php*
// @version     1
// ==/UserScript==

(function(fn){
	var script = document.createElement ('script');
	script.setAttribute ('type', 'text/javascript');
	script.textContent = '(' + fn.toString () + ')();';
	document.head.appendChild (script);
})
(function (){		
	TWCPU = function ()
	{
		if($('.ongoing_entry').length>0)
		{
			$('.border.highlight').remove();
			return;
		}
		window.setTimeout("TWCPU()", 1000);	
	}
	TWCPU();
})