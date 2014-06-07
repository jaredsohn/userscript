// ==UserScript==
// @name           NoImages-NoBackgrounds
// @namespace      Privacy
// @description    Hides all images and css backgrounds in HTML pages
// @include        *
// ==/UserScript==

	//hide document before elments loop begin
	document.getElementsByTagName('body')[0].style.display='none';
	var allElements  = document.getElementsByTagName('*'); // for FF
	for (i=0;i<allElements.length;i++)
	{
		//get rid of all element backgrounds & text colors
		try {
			allElements[i].style.background='none';
			allElements[i].style.color='#000000';
		} catch(ex) {
			//for debug
			alert(ex.message);
		}
		
		// hide images with src property not empty
		try {
			if (allElements[i].nodeName=='IMG' && allElements[i].src!='')
			{
				allElements[i].style.display='none';
			}
		} catch(ex) {
			//for debug
			alert(ex.message);
		}
		
	}
	//show document after elments loop is complete
	document.getElementsByTagName('body')[0].style.display='';