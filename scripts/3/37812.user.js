// ==UserScript==
// @name           Add previous/following years to explore/interesting/ daily pages
// @description    On Flickr explore/interesting/YYYY/MM/DD/ add links to the same date in previous/following years.
// @author         poulencfan@yahoo.com
// @include        http://www.flickr.com/explore/interesting/*/*/*/
// @include        http://flickr.com/explore/interesting/*/*/*/
// ==/UserScript==

// Version History
// ===============
//
// 0.1 Nov 28, 2008 Create script to add links to previous/following years
//     Nov 29, 2008 Upload to userscripts.org
// 0.2 Dec 08, 2008 Strip off any reference to a "page99" so that
//                  the added links go straight to the first page of the
//                  year
//                  Maybe in a later version I will add first/last links too
// 0.3 Dec 11, 2008 Add Prev yr and Next yr links amongst the Prev and Next
//                  at the bottom of the page
// 0.4 Dec 11, 2008 Set the class on our new Prev yr and Next yr buttons and
//                  make them look the same as the flickr stuff when there is
//                  no earlier/later set of shots available
//                  Maybe in a later version I will move this to the "Results"
//                  div element; but that'll mean adding some CSS stuff
//
// This only works with Firefox v3.0 or later because it relies upon 
// the DOM function getElementsByClassName

( function() {

// What are we adding to the page?
 var customhtml = 
	"<br>";

// Need to review how to test if the required API functions are in the
// version of Firefox that the user is running.
// The hack of putting the name in an if (<functionname)) {
// doesn't appear to work
/*
    if (!getElementsByClassName) {
	GM_log("Sorry this scripts needs the function getElementsByClass() in Firefox version 3 or later");
    }
*/

    // Find the element (let's hope there is only one)
    requiredElement = document.getElementsByClassName('InHere');
    //GM_log("Original date: " + requiredElement[0].innerHTML);

    // Calculate the previous year
    dateOnPage = requiredElement[0].innerHTML;
    presentYear = dateOnPage.slice(dateOnPage.length - 4);
    //GM_log("Present Year" + presentYear);
    lastYear = presentYear - 1;
    //GM_log("Previous Year: " + lastYear);
    dateLastYear = dateOnPage.slice(0, -4) + lastYear;
    //GM_log("Date last year: " + dateLastYear);

    dateToday = new Date();
    thisYear = dateToday.getFullYear();

    // Calculate the following year
    followYear = Number(presentYear) + 1;
    //GM_log("Follow year: " + followYear);
    dateFollowYear = dateOnPage.slice(0, -4) + followYear;
    //GM_log("Date follow year: " + dateFollowYear);

    // Create the new URL for last year's page
    // a What have we got?
    pageref = document.baseURI;
    //GM_log("Originaal page URL: " + pageref);

    // Check that we are at the start of the day's activity
    // if not then strip away the page99/ at the end of the url

    // Version 0.2
    if ((slicepoint = pageref.search("page[0-9]+")) > 0) {
	//GM_log("Looks like we have a URL with a page number starting at " + slicepoint);
	pageref = pageref.slice(0,slicepoint);
    }

    // Create the new URL for next year's page
    // Again current year or not?

    // Make sure that the future date actually exists;
    // there is nothing beyond today
    todayBinDate = Date.parse(dateToday);
    pageBinDate = Date.parse(dateFollowYear);
    //GM_log("Today bin date: " + todayBinDate);
    //GM_log("Page bin date: " + pageBinDate);

    if (pageBinDate < todayBinDate) {

	//if (presentYear < thisYear) {
	followYearURL =  pageref.replace(presentYear, followYear);
	//GM_log("Follow year URL: " + followYearURL);
	prehtml =  
	    '<a href="' + followYearURL + '">' 
	    + dateFollowYear + '</a>'
	    + '<br>';
    }
    else {
	prehtml = "";
	followYearURL = "";
    }
    //GM_log("Pre original HTML: " + prehtml);

    // Would the previous year be before the date (1 July 2004)
    // when the first set of these interesting shots was published
    firstBinDate = Date.parse("1 July 2004");
    prevBinDate = Date.parse(dateLastYear);
    //GM_log("First bin date: " + firstBinDate);
    //GM_log("Previous bin date: " + prevBinDate);

    if (prevBinDate >= firstBinDate) {
	lastYearURL = pageref.replace(presentYear, lastYear);
	//GM_log("Last year page URL: " + lastYearURL);
	posthtml = 
	    '<br>' 
	    + '<a href="' + lastYearURL + '">' 
	    + dateLastYear + '</a>';
    } else {
	posthtml ="";
	lastYearURL = "";
    }
    //GM_log("Post original HTML: " + posthtml);
    
    // Append our stuff to the element's text
    customhtml = "<p>" 
	+ prehtml
        + dateOnPage 
	+ posthtml + "</p>";

    //GM_log("HTML to be added: " + customhtml);

    // Now put out our stuff
    requiredElement[0].innerHTML = customhtml;

    // The top is done now we're going to fiddle with the <Prev 1 2 ... 50 Next>
    // section so that we don't have to return to the top of the page

    requiredElement = document.getElementsByClassName("Paginator");
    //GM_log(requiredElement[0].innerHTML);

    // Now we stick on the bits

    requiredElement[0].innerHTML =  
	(lastYearURL.length 
	      ? '<a href="' + lastYearURL + '" class="Prev">&lt; Prev yr</a>' 
	 : '<span class="AtStart">&lt; Prev yr</span>') 
	+ requiredElement[0].innerHTML 
	+ (followYearURL.length
	      ? '<a href="' + followYearURL + '" class="Next">Next yr &gt;</a>'
	   : '<span class="AtEnd">Next yr &gt;</span>');

})();
