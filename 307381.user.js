// ==UserScript==
// @name        Best Buy Path To Excellence search links and Learning Lounge search auto-launch
// @namespace   bbyp2esearch
// @description Creates search links for BBY LL P2E badges
// @include     //bbypathtoexcellence.com/*
// @include		//search2.bestbuylearninglounge.com/*
// @version     1.3.0
// @copyright  2014+, Jupiter
// ==/UserScript==

//Mouse click function
function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initEvent('click', true, true);
	elm.dispatchEvent(evt);
}

if (location.href.indexOf("bbypathtoexcellence.com") != -1) {
	//Setup function to create link
    function CreateBadgeReqLinks() {
        //Find the div that holds the badge requirements, there might be 2
        var divs = document.getElementsByClassName("badge_description");
        console.log("div num: " + divs.length);
        
        for (var dl=0; dl<divs.length; dl++) {
            //Get each <li> list item from the <ul> unordered list inside the div
            var li = divs[dl].getElementsByTagName("li");
            console.log("li num: " + li.length);
            for (var num=0; num<li.length; num++) {
                //For each <li> list item, replace the innerHTML with the search code
                li[num].innerHTML = "<a href='http://search2.bestbuylearninglounge.com/?q=" + li[num].innerHTML + ";q1=eLearning;x=0;x1=type;y=0' style='color:blue;' target='_blank'>" + li[num].innerHTML + "</a>";
                console.log("replaced html with link");
            }
        }
    }

	//Setup function to delay link creation since clicking each tab/badge caused a reload
    function SetDelay() {
        setTimeout(function(){CreateBadgeReqLinks();},3000); //3 seconds
        console.log("setting timout");
    }

    //Attach a even listener for clicks to update auto-magically without a button
	if (document.addEventListener) {
	    document.addEventListener('click' , SetDelay , false);	//Badge click
	    //FIXME: tab clicks do not work even with focus
	    //document.addEventListener('focus', SetDelay , false); 	//Tab click
	    console.log("added event listener");
	}
	//This would be for IE8 and lower, not necessary but let's keep it for now in case
	else if (document.attachEvent) {
	    document.attachEvent('click' , SetDelay , false);
	    console.log("added older attach event");
	}
	//Create an onload function for first load
	window.onload = SetDelay;
}
else if (location.href.indexOf("search2.bestbuylearninglounge.com") != -1) {
	var body = document.getElementById("page_body");
    var search_term = body.getElementsByTagName("a")[0].innerHTML;

    var search_results_table = document.getElementById("search_results");
    var search_results_body = search_results_table.getElementsByTagName("tbody")[0];
    var search_results = search_results_body.getElementsByTagName("a");
    
    for (var i=0; i<search_results.length; i++) {
        if (search_results[i].innerHTML.indexOf(search_term) != -1) {
        	click(search_results[i]);
        }
    }
}