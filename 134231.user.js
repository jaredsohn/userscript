// ==UserScript==
// @name          BlammoBurger
// @namespace     http://userscripts.org/users/120246
// @description   Adds silly buttons to "posted by" line
// @include       http://www.metafilter.com/*
// @include       http://metatalk.metafilter.com/*
// ==/UserScript==
//
// Blammo button inspired by Divine_Wino - http://metatalk.metafilter.com/14814/NOOOOOOOOOO#448346
// Hamburger button inspired by tzikeh - http://metatalk.metafilter.com/18349/Sarcasm-we-haz-it-but-sometimez-we-dont-haz-it
//
// Create your own tagline data using google spreadsheets
//     Column A = "Thread" with full URL to comment
//     Column B = "Tagline" comment
// Publish spreadsheet as webpage
// Copy & paste link in publish window
// Browse to published link in Firefox
// Right click to view page info
// Copy link in Feeds tab
// Chanage /basic in URL to /values
//
function Taglines() {
    this.List = new Array();
    this.URL = "http://spreadsheets.google.com/feeds/list/rEHrBdjKRJH9K-7MZ3NQMmA/od6/public/values";
    this.XML = "";
    this.Show = true; // Set to true to show taglines by clicking hamburger button
    this.Refresh = false; // Set to true to refresh taglines from spreadsheet
}

Taglines.prototype.Fill = function () {
    var xmlobject = (new DOMParser()).parseFromString(this.XML, "text/xml");
    var numTaglines = xmlobject.getElementsByTagNameNS("http://a9.com/-/spec/opensearchrss/1.0/", "totalResults")[0].textContent;
            
    // Get relative link to comment
    var i;
    var myTagline;
    var taglineEntry = xmlobject.getElementsByTagName("entry");
    for (i = 0; i < taglineEntry.length; i++) {
         myTagline = new Tagline();
         myTagline.Quote = taglineEntry.item(i).getElementsByTagNameNS("http://schemas.google.com/spreadsheets/2006/extended", "tagline")[0].textContent;
         myTagline.URL = taglineEntry.item(i).getElementsByTagNameNS("http://schemas.google.com/spreadsheets/2006/extended", "thread")[0].textContent;
         myTaglines.List.push(myTagline);
    }
}

Taglines.prototype.Retrieve = function () {
    if (!GM_xmlhttpRequest) {
        this.ShowTagLines = false;
        return;
    }
    
    // Taglines are saved as XML string
    // View saved taglines using about:config URL, filtering on greasemonkey.scriptvals
    
    // Get taglines from cache if possible
    if (GM_getValue && ! this.Refresh) {
        this.XML = GM_getValue("tagLines", "");
        if (this.XML != "") {
            this.Fill();
            return;
        }
    }
    
    // Get taglines from remote and save to cache
    GM_xmlhttpRequest({
        method: 'GET',
        url: this.URL,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {
            GM_setValue("tagLines", responseDetails.responseText);
            myTaglines.XML = responseDetails.responseText;
            myTaglines.Fill();            
        }
    });
}

function Tagline() {
    this.URL = "";
    this.Quote = "";
}    

//
//  Get a random tagline
//
function Hamburger() {
    var randomNum = Math.random();
    var randomIndex = Math.round((myTaglines.List.length - 1)* randomNum);
    
    var buttonLink = this.getElementsByTagName("a");
    buttonLink.item(0).textContent = myTaglines.List[randomIndex].Quote;
    buttonLink.item(0).setAttribute("navigate", myTaglines.List[randomIndex].URL);
    buttonLink.item(0).setAttribute("title", "Double click to goto a random tagline.");
}

//
//  Got to thread with tagline
//
function FollowLink() {
    var buttonLink = this.getElementsByTagName("a");
    var navigateLink = buttonLink.item(0).getAttribute("navigate");
    window.location = navigateLink;
}

//
// Begin main
//

// Exit if on the home page
if (document.location.pathname.length <= 1) {
    return;
}

var myTaglines = new Taglines();
myTaglines.Retrieve();

var i = 0;
var thisComment;
var blammoButton;
var hamburgerButton;

var allComments = document.evaluate ("//div[@class=\"comments\"]/span[@class=\"smallcopy\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(i = 0; thisComment = allComments.snapshotItem (i); i++) {
    blammoButton = document.createElement("span");
    blammoButton.setAttribute("class", "smallcopy");
    blammoButton.innerHTML = '[<a href="javascript:void(0);" title="Blammo!" onclick="javascript:return false;">*</a>]&nbsp;';
    thisComment.appendChild (blammoButton);

    hamburgerButton = document.createElement("span");
    hamburgerButton.setAttribute("class", "smallcopy");
    hamburgerButton.innerHTML = '{<a href="javascript:void(0);" title="HAMBURGER" onclick="javascript:return false;">\\</a>}&nbsp;';
    if (myTaglines.Show) {
        hamburgerButton.addEventListener("click", Hamburger, false);
        hamburgerButton.addEventListener("dblclick", FollowLink, false);
    }
    thisComment.appendChild (hamburgerButton);
}

