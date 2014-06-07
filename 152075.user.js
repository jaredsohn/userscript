// ==UserScript==
// @name        SeekJobs
// @namespace   http://www.nowitworks.eu/SeekJobs
// @description Filter-out known agencies
// @include     http://www.seek.*/jobs*
// @grant		none
// @version     13
// @icon 		http://www.seek.co.nz/favicon4.ico
// ==/UserScript==
var blackList = [
    "Capital Recruitment",
    "Red Rock Consulting",
    "Adroit People",
    "Acorva Technical Recruitment",
    "IT Recruitment",
    "PM-Partners Group",
    "Parker Bridge",
    "Absolute IT",
    "Adecco Personnel",
    "Acumen Consulting",
    "Alchemy Consulting",
    "Alexander James",
    "IT Consulting Associates Ltd",
    "Allerton Recruitment",
    "Alpha Recruitment",
    "Ambition Technology",
    "Apex Resource Solutions",
    "Arc Recruitmen",
    "Aurec",
    "Australasian Recruitment Company",
    "Babcock",
    "Beyond Services",
    "Blackcat Consulting",
    "Brand Developers",
    "BSI People",
    "Callaways",
    "Candle",
    "Career Team Limited",
    "CMPeople",
    "Comspek International",
    "Consultus Recruitment & Research NZ Ltd",
    "CP IT Solutions",
    "Crackerjacks",
    "Cubic Resource",
    "Customise Consulting Group",
    "De Winter",
    "Drake International",
    "Enterprise Recruitment",
    "Evolution Group",
    "Farrow Jamieso",
    "Flintfox International",
    "Fluid Recruitment",
    "Focus Recruitment",
    "Frog Recruitmen",
    "Fuse IT Recruitment",
    "Fusion Transactive",
    "Global Attract",
    "Global Career Link",
    "Greythorn",
    "Hays",
    "High Street Recruitment",
    "Hudson",
    "Human Recruitment",
    "Huntel Global",
    "H2R Consulting",
    "HCM Australia",
    "Infotech Consulting",
    "INSIDE EXECUTIVE RECRUITMENT",
    "IT Job Search Ltd",
    "Itcom",
    "Lawson Williams Consulting Group",
    "Live Executive",
    "Lloyd Executive",
    "Madison Recruitment",
    "Manpower Professional Auckland",
    "Manpower Professional Christchurch",
    "Manpower Professional Wellington",
    "Match 2 Technical Ltd",
    "Metro Recruitment Ltd",
    "M-Com",
    "Mindworx",
    "Morgan Campbell",
    "MTR",
    "Naked Recruitment",
    "ninetwenty",
    "OutSource",
    "People Group",
    "People Solutions",
    "Peoplebank",
    "Pinnacle IT",
    "Potentia",
    "Protocol Personnel Services",
    "pursuIT",
    "QJumpers",
    "Radius Recruitment",
    "Randstad",
    "RANN IT",
    "razzbri",
    "RDBMS Resource Solutions",
    "Ready Willing and Able",
    "Recruit IT",
    "Robert Half Technology",
    "Robert Half Technology",
    "Robert Walters",
    "Rookie Recruits",
    "Round Peg",
    "Sway Recruitment",
    "salt",
    "Sead",
    "SearchWorks Ltd",
    "SGS Consulting",
    "Skillquest",
    "Spark IT",
    "Spark Talent",
    "Stellar Consulting Group Limited",
    "Talent International",
    "Talent Propeller",
    "Talent Magnet",
    "Talent Vault",
    "TalentPoint",
    "Talon Group",
    "Ultimate Recruitment Corporation",
    "Portfolio Recruitment",
    "Kelly Executive",
    "Place Recruitment",
    "PowerHouse People",
    "Progressive",
    "Careers New Zealand",
    "Velocity Recruitment",
];

blackList = blackList.map( function(s) { return s.toLowerCase();} );
function xpath(query, object) {
    if(!object) { var object = document; }
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function logErr(err) {
    var txt="There was an error on this page at " + err.lineNumber + ".\n\n";
    txt+="Error description: " + err.message + "\n\n";
    console.log(txt);
}

function isAgent( name) {
    name = name.toLowerCase();
    console.log(name);
    for ( var i = 0; i < blackList.length; i++) {
    	if ( name.indexOf( blackList[i]) > -1) return true;
    }
    return	false;
}

function postProcessArticles() {
    if (document.body) {
        //  //[17]/dl/dd[1]/h2/em
        var tmp;
        var ad;
        var badAdList = [];
        try {
            var container = document.getElementById ("SaveJobsForm");
            var adXPathRes = document.evaluate ( '//article', container, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            var adLI = adXPathRes.iterateNext ();
            while (adLI) {
                var xPathRes = document.evaluate ('dl/dd[1]/h2/em', adLI, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                if( xPathRes.singleNodeValue) {
                    var source = xPathRes.singleNodeValue.textContent;
                    if (isAgent(source)) {
                        try {
                            badAdList.push(adLI);
                        } catch(err) {
                            logErr(err);
                            break;
                        }
                    }
                }
                try {
                    adLI = adXPathRes.iterateNext ();
                } catch(err) {
                    logErr(err);
                    break;
                }
            }
            badAdList.map( function(e) {e.style.display = "none";})
        } catch(err) {
            logErr(err);
        }
    }
}

var __applyBindings = ko.applyBindings;

// first attempt to deal with knockout :( ... pathetic!!!
ko.applyBindings = function() {
	__applyBindings.apply(this, arguments);
	postProcessArticles();
};