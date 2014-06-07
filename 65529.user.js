// ==UserScript==
// @name         amazon discount search
// @namespace    http://www.yasui-kamo.com/
// @description  amazon discount search.
// @include      http://www.amazon.*/*
// @include      https://www.amazon.*/*
// ==/UserScript==

//get display size
function getDisplaySize()
{
	var size;
	var title = document.getElementsByTagName("title")[0].text;

	if(title.indexOf("Amazon.co.jp") != -1)
	{
		size = 90;
	}
	else if(title.indexOf("Amazon.com") != -1)
	{
		size = 110;
	}
	else if(title.indexOf("Amazon.co.uk") != -1)
	{
		size = 110;
	}
	else if(title.indexOf("Amazon.de") != -1)
	{
		size = 100;
	}
	else if(title.indexOf("Amazon.fr") != -1)
	{
		size = 140;
	}
	else if(title.indexOf("Amazon.ca") != -1)
	{
		size = 110;
	}

	return size;
}

//main
(function(){
	//create discount area
	if(document.getElementById('navSearchBar'))
	{
		var searchObj = document.getElementById('navSearchBar');
		var searchTxt = searchObj.innerHTML;
		searchTxt += " <select id=\"pct-off\" name=\"pct-off\"><option value=''>None <option value='10-'>10% <option value='20-'>20% <option value='30-'>30% <option value='40-'>40% <option value='50-'>50% <option value='60-'>60% <option value='70-'>70% <option value='80-'>80% <option value='90-'>90%</select>";
		searchObj.innerHTML = searchTxt;
		var formWidth = searchObj.style.width;
		if(formWidth == "") {formWidth = "0";}
		formWidth = eval(formWidth.replace("px", "")) + getDisplaySize();
		searchObj.style.width = formWidth + "px";
	}
}
)();
