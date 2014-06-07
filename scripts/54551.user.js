// ==UserScript==
// @name           music reader download link generator
// @include        http://godblessyou*/music/*
// ==/UserScript==

location.assign("javascript:(" + encodeURI(uneval(function()
{
	Music.location.temp = function()
	{
		var temp = arguments[0].split('_');
		temp[2] = encodeURI(tempNum+'.')+temp[2];

		tempNum += 1;

		document.getElementById('downloader').innerHTML += '<a href="'+temp.join('_')+'">a</a>';
	};

	window.addEventListener('dblclick', function()
	{
		tempNum = 1;

		if(!document.getElementById('downloader'))
		{
			element.create.all({tag:'div',id:'downloader','style.cssText':'position:absolute; top:0; left:0; width:500px; height:500px; background-color:#fff',append:document.body});
		} else {
			$('downloader').clear();
		}

		$$('.D').each(function()
		{
			arguments[0].onclick();
		});
	}, false);
}))+ ")();");