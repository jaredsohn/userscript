// ==UserScript==
// @name       prisjakt #secretish
// @version    0.1
// @description  prisjakt unrevealing
// @match      http://www.prisjakt.nu/*
// ==/UserScript==

	var classArray = [
		'gGCO',
		'k40X',
		'a9uv',
		'W5hT',
		'QXir',
		'AuBD',
		'UxSQ',
		'G4Dx_sv'
	];
	var frame = 0;
	
	$(function() {
		animate();
	});
	
	function animate()
	{
		setTimeout(function() { 
			$('#secretish, #secretish_helper').removeClass(classArray[frame]).addClass(classArray[frame+1]);
			frame++;
			if(frame < classArray.length-1)
				animate();
		}, 1000);
	}