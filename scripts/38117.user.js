// ==UserScript==
// @name           CERPv1
// @namespace      Donald Stern
// @description    Company Environmental Rating Popup
// @include        http://www.bestbuy.com/*
// @include        http://*.bestbuy.com/
// ==/UserScript==


var greenpeaceWebsites, regex, key, textnodes, node, s, count, companyList, companyURLList, companyRatings, testON;
count = 0;                //all purpose counter
testON = 0;                //0=off   1=on    2=alert for all blocks of text starts the alerts
//runON = 0;                //0=all on        1=convertNameToLink() on        2=convertLinkToRealLink()        3=createBanner()
if (testON == 1) alert("Search and Replace Status: Running");                //test to see if script is actually running

//Regexp array of Greenpeace websites
greenpeaceWebsites = {
//    "quotes": "http://www.google.com",                                //'<a href="http://www.google.com">',
//    "Quotes": "asdf",                     //test
//    "Nokia": "http://www.greenpeace.org/international/press/reports/greener-electronics-nokia-rank-5",
    "Sony Ericsson": "http://www.greenpeace.org/international/press/reports/greener-electronics-sony-erics-5",
    "Toshiba": "http://www.greenpeace.org/international/press/reports/greener-electronics-toshiba-ra-5",
    "Samsung": "http://www.greenpeace.org/international/press/reports/greener-electronics-samsung-ra-5",
    "Fujitsu": "http://www.greenpeace.org/international/press/reports/greener-electronics-fujitsu-si-4",
    "LG": "http://www.greenpeace.org/international/press/reports/greener-electronics-lg-electro-4",
    "Motorola": "http://www.greenpeace.org/international/press/reports/greener-electronics-motorola-r-5",
    "Sony": "http://www.greenpeace.org/international/press/reports/greener-electronics-sony-ranki-5",
    "Panasonic": "http://www.greenpeace.org/international/press/reports/greener-electronics-panasonic-5",
    "Sharp": "http://www.greenpeace.org/international/press/reports/greener-electronics-sharp-rank-3",
    "Acer": "http://www.greenpeace.org/international/press/reports/greener-electronics-acer-ranki-6",
    "Dell": "http://www.greenpeace.org/international/press/reports/greener-electronics-dell-ranki-5",
    "HP": "http://www.greenpeace.org/international/press/reports/greener-electronics-hp-ranking-5",
    "Apple": "http://www.greenpeace.org/international/press/reports/greener-electronics-apple-rank-5",
    "Philips": "http://www.greenpeace.org/international/press/reports/greener-electronics-philips-ra-3",
    "Lenovo": "http://www.greenpeace.org/international/press/reports/greener-electronics-lenovo-ran-5",
    "Microsoft": "http://www.greenpeace.org/international/press/reports/greener-electronics-microsoft-3",
    "Nintendo": "http://www.greenpeace.org/international/press/reports/greener-electronics-nintendo-r-3"
};

//Array of company names from Greenpeace website
companyList = new Array("Nokia",
                        "Sony Ericsson",
                        "Toshiba",
                        "Samsung",
                        "Fujitsu",
                        "LG",
                        "Motorola",
                        "Sony",
                        "Panasonic",
                        "Sharp",
                        "Acer",
                        "Dell",
                        "HP",
                        "Apple",
                        "Philips",
                        "Lenovo",
                        "Microsoft",
                        "Nintendo");

//Array of ratings out of 10 from Greenpeace website
companyRatings = new Array(7, 4.7, 5.9, 5.7, 5.5, 4.9, 3.7, 5.3, 4.5, 3.1, 4.5, 4.7, 4.7, 4.1, 4.3, 4.1, 2.2, 0.8);
//companyRatings = new Array();
//Array of the company websites
companyURLList = new Array("http://www.greenpeace.org/international/press/reports/greener-electronics-nokia-rank-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-sony-erics-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-toshiba-ra-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-samsung-ra-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-fujitsu-si-4",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-lg-electro-4",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-motorola-r-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-sony-ranki-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-panasonic-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-sharp-rank-3",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-acer-ranki-6",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-dell-ranki-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-hp-ranking-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-apple-rank-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-philips-ra-3",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-lenovo-ran-5",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-microsoft-3",
                           "http://www.greenpeace.org/international/press/reports/greener-electronics-nintendo-r-3");

//attempts to retreive the necessary information from the Greenpeace website to be stored into arrays

//These are just some of my many attempts to access an external HTML page and convert it into DOM or put into a new iframe
//Either of these two functions (put into DOM/iFrame) is necessary as
function getInfo(){
	var remoteRatingArray = new Array();
	var stopValue = 0;			//something I am testing
	var greenpeaceString;			//where the string form of the Greenpeace website will be stored
        GM_xmlhttpRequest({
    		method: 'GET',
    		url: 'http://www.greenpeace.org/international/campaigns/toxics/electronics/how-the-companies-line-up-9/',
    		onload: function(responseDetails) {
        		if (testON == 1) alert('HTML String:\n' + responseDetails.responseText);
			if (stopValue == 0) {
				greenpeaceString = responseDetails.responseText;
				stopValue++;
				//alert(greenpeaceString);
				//alert(greenpeaceString[6000]);
				var tbodyStart = greenpeaceString.indexOf("<tbody>") + 7;
				//var tempGPS = greenpeaceString.substring(279, 600);
				//alert(greenpeaceString.substring(279, 600));
				//alert(tbodyStart);
				var tbodyEnd = greenpeaceString.indexOf("</tbody>") - 1;
				var modifiedString = greenpeaceString.substring(tbodyStart, tbodyEnd);
				//alert(modifiedString.length + "   " + greenpeaceString.length);
				//alert("Start: " + tbodyStart + " End: " + tbodyEnd + "\n" + modifiedString);
				var searchCompanyNamesLoop = 0;
				var tempSearch, tempStart, tempEnd, tempCount;
				tempCount = 0;
				while(searchCompanyNamesLoop > -1){
					tempStart = modifiedString.indexOf("<div align=");
					if (tempStart == -1) {
						searchCompanyNamesLoop = -1;
						//alert("Loop Ended"); 
						companyRatings = remoteRatingArray;
						//alert(companyRatings);
						//alert(companyRatings[1]);
						//alert(remoteRatingArray.length + ":" + remoteRatingArray);
					}
					else{
						tempStart = tempStart + 27;
					
						tempEnd = modifiedString.substring(tempStart, tempStart + 20).indexOf("</b>");
						var ratingNumber = modifiedString.substring(tempStart, tempStart + tempEnd);
						if(tempCount == 11) {
							remoteRatingArray[tempCount] = "4.3"; 
							tempCount++; 
							modifiedString = modifiedString.substring(tempStart + tempEnd);}
						else if(tempCount == 12) {
							remoteRatingArray[tempCount] = "4.1"; 
							tempCount++;
							modifiedString = modifiedString.substring(tempStart + tempEnd);}
						else if(tempCount == 10) {
							remoteRatingArray[tempCount] = "4.5"; 
							tempCount++;
							modifiedString = modifiedString.substring(tempStart + tempEnd);}
						else{
						remoteRatingArray[tempCount] = ratingNumber.substring(0, 3);
						tempCount++;
						//alert(tempStart + ": " + ratingNumber);
						modifiedString = modifiedString.substring(tempStart + tempEnd);
						//searchCompanyNamesLoop = -1;
						}
					
					}
				}

			}
			
			//alert(greenpeaceString);
    		}
     	});

	/*
	Here I need to use the string functions to break up responseDetails.responseText into the necessary information.
	Search for "<div align="right">" + "/n" + "<b>" in order to find the start location - 1 of the ranking
	Once this is found, store it to startLoc
	Then find the next "</b>" and store this to endLoc
	Substring at (startLoc
	*/
	
		
        /* var doc = iframe.document;
        if (iframe.contentDocument)
                doc = iframe.contentDocument; // For NS6
        else if(iframe.contentWindow)
                doc = iframe.contentWindow.document; // For IE5.5 and IE6
        // Put the content in the iframe
        doc.open();
        doc.writeln(content);
        doc.close();
        // and then get it out
        var storeArea = doc.getElementById("tbody");
        alert(storeArea); */

        //var container = document.createElement(”DIV”);
        //container.innerHTML = “foobar”;
        //var ul = container.firstChild;
}

regex = {};                //create new empty regexp array

//creates regexps out of the greenpeaceWebsites and stores it to regex array
function convertNameToLink(){
        for (key in greenpeaceWebsites) {
                regex[key] = new RegExp(key, 'g');
        }

        textnodes = document.evaluate("//text()[not(ancestor::a)]",                //text() is key for all blocks of text.  [not (ancestor::a)] restricts where it looks.
                                       document,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,                //results will be returned at random
                                       null);

        for (var i = 0; i < textnodes.snapshotLength; i++) {
                node = textnodes.snapshotItem(i);
                s = node.data;
                if (testON == 2){
                        if((s.length > 10) && (i < 100)) {alert("Text Node #" + i + ": " + s)};
                };
                for (key in greenpeaceWebsites) {
                        s = s.replace(regex[key], greenpeaceWebsites[key]);
                }
                count++;
                node.data = s;
        }
        if (testON == 1) alert("Total blocks of text: " + count);
}

function convertLinkToRealLink(){
        var urlRegexp = /\b(https?:\/\/[^\s+\"\<\>]+)/ig;
        var allHTTPElements = document.evaluate("//text()[not(ancestor::a) " +
                                        "and not(ancestor::script) and not(ancestor::style) " +                 //must have or else top bar wont load
                                        "and " +
                                        "contains(translate(., 'HTTP', 'http'), 'http')]",                                //Selects what type of identifier to search for
                                        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        //Finds all of the instances of a company name and replaces it with its html link
        //HTML link is formatted with company name as its display, company rating as its title/alt text, and links to the Greenpeace website
        for (var i = allHTTPElements.snapshotLength - 1; i >= 0; i--) {
                var newText = allHTTPElements.snapshotItem(i);
                if (urlRegexp.test(newText.nodeValue)) {
                        var newSpan = document.createElement("span");                //Starts the creation of a new span element
                        var sURLText = newText.nodeValue;
                        newText.parentNode.replaceChild(newSpan, newText);
                        urlRegexp.lastIndex = 0;

                        for (var hyperlinks = null, finalIndex = 0;
                                (hyperlinks = urlRegexp.exec(sURLText)); ) {
                                newSpan.appendChild(document.createTextNode(
                                sURLText.substring(finalIndex, hyperlinks.index)));

                                var elmLink = document.createElement("a");

                                elmLink.setAttribute("href", hyperlinks[0]);                        //Hyperlink
                                //alert(hyperlinks[0]);
                                elmLink.setAttribute("target", "_blank");                //Opens hyperlink in new tab/window
                                //Adds the Alt Tag and the Displayed Text for the hyperlink being created
                                for(var k = 0; k < companyList.length; k++){
                                        if(hyperlinks[0] == companyURLList[k]) {
                                                //alert(companyRatings[k]);
						elmLink.setAttribute("title", companyList[k] +                                 //Alt Text
                                                                     " Environmental Rating: " +
                                                                     companyRatings[k] +
                                                                     "/10.  For more information, click the link.");
                                                var temp = companyList[k] + " (" + companyRatings[k] + "/10)";                //Formatted text with company name and rating
                                                elmLink.appendChild(document.createTextNode(temp));         //Displayed Text
                                                k = companyList.length;
                                                }
                                }

                                newSpan.appendChild(elmLink);
                                finalIndex = urlRegexp.lastIndex;
                        }
                        if(testON == 1) alert("URL #" + i + ": " + sURLText);
                        newSpan.appendChild(document.createTextNode(
                                sURLText.substring(finalIndex)));
                        newSpan.normalize();
                }
        }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                BANNER                             //
//        Coppied from: fest_writeup.doc from In4matix 161 website                                                   //
//        Edited for a few mistakes and modified to no longer rely on an event to trigger                            //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createBanner(){
        var logo = document.createElement("div");
        logo.setAttribute('id', 'fest_logo');
        logo.innerHTML = '<div style="margin: 0 auto 0 auto; '
                                        + 'border-bottom: 1px solid #000000; margin-bottom: 5px; '
                                        + 'font-size: small; background-color: #44CC55; '
                                        + 'color: #000000;"><p style="margin: 2px 0 1px 0;"> '
                                        + '<b>This site is running a script from the Firefox '
                                        + 'Environmental Sustainability '
                                        + 'Toolkit (FEST). Please visit '
                                        + '<a href="http://lotus.calit2.uci.edu/fest/index.html">'
                                        + ' our homepage</a>'
                                        + ' for more information on FEST.</b>'
                                        + '</p></div>';
        document.body.insertBefore(logo, document.body.firstChild);                //forces the triggering of this element
 }

getInfo();
createBanner();                        //Creates a banner at the top of the page linking the user to the FEST information
convertNameToLink();
convertLinkToRealLink();