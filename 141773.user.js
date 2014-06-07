// ==UserScript==
// @name        Show Youtube Tags
// @namespace   https://www.youtube.com/
// @description Show the youtube tags
// @include     *://*.youtube.com/watch*
// @version     1
// ==/UserScript==
var interval = setInterval(DoIt, 50);
function DoIt() {
	try
	{
		if (typeof ytplayer === "undefined")
			return;

		var tags = ytplayer.config.args.keywords.replace(/,/g, ', ');
		if (!tags) {
			tags = "-";
		}
		var li = document.createElement('li')
		li.innerHTML = 
			'<h4 class="title">Tags</h4> \
			<div class="content"> \
				<p id="eow-reuse"> ' + tags + ' </p> \
			</div>'
		document.getElementById('watch-description-extras').children[0].appendChild(li);
		
		clearInterval(interval);
	}
	catch(ex)
	{
		clearInterval(interval);
	}
}