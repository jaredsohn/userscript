// ==UserScript==
// @name           Platsbanken - Vettig titel
// @version        0.5.1
// @namespace      http://tapiren.se/category/userscripts
// @include        http://www.arbetsformedlingen.se/*
// ==/UserScript==

(function() {
	// The regexp used to remove HTML comments
	var regX = /<!(?:--.*?--\s*)?>/g;

	// If it's the standard title, run the script
	if (document.title.indexOf("Platsbanken") > -1)
	{
		// Get the job title by finding the second H1 tag
		var job = document.getElementsByTagName("H1")[1].innerHTML;
		job = job.replace(regX, '');
		
		// Get the company title by finding the p tag containing company name
		var p_all = document.getElementsByTagName("p");
		for (var i = 0; i < p_all.length; i++)
		{
			if (p_all[i].className == "employer") {
				company = p_all[i].innerHTML.replace(regX, '');
				break;
			}
		}
		
		// Set the title, and we're done! :D
		document.title = company+" :: "+job+" - Platsbanken.se";
	}
})();
