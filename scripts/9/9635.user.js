/*
	==UserScript==
	@name            StumbleVideo HTML Displayer
	@include         http://video.stumbleupon.com/*
	@description     Displays the "Embed" HTML code when watching videos on http://video.stumbleupon.com/.
	==/UserScript==
*/

(function(){
	function $(id){ return document.getElementById(id); }
	
	function getCode()
	{
		var video = $('mymovie');
		if (!video){ return ''; }
		var src = video.getAttribute('src');
		
		var html = '<embed ';
		html += 'src=' + '"' + src + '"';
		html += ' type="application/x-shockwave-flash"';
		html += ' />';
		
		return html;
	}
	
	var codeHolder = document.createElement('textarea');
	codeHolder.style.width = '100%'; // Narrow textareas aren't very useful for this purpose.
	codeHolder.setAttribute('rows', '3'); // Make it tall enough to display full codes without having to scroll.
	codeHolder.addEventListener(
		'click', // Whenever the code holder is clicked:...
		function()
		{
			// ...select its entire value.
			codeHolder.focus(); 
			codeHolder.select();
		},
		false
	);
	
	$('brdM').appendChild(codeHolder); // Put the code holder below everything in the video area.
	
	showCode(); // Go ahead and show the code of the currently playing video.
	
	function showCode()
	{
		setTimeout(
			function(){ codeHolder.value = getCode(); },
			1000 // Give the site a little time to switch videos before determining the video code.
		);
	}
	
	document.addEventListener(
		'click',
		showCode,
		false
	);
})();