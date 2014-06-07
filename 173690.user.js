// ==UserScript==
// @name          CMS detection
// @version       1.2.1
// @author        Nicolas Crocfer, rarspace01
// @namespace	  http://userscripts.org/scripts/show/173690
// @description   Detects the name and the version of several CMS
// @include       http://*
// @include       https://*
// @exclude       http://*google*
// @exclude       https://*google*
// ==/UserScript==


/************************************************************************************
 *
 * Currently this UserScript is able to find the version of the following CMS :
 *
 * WordPress / Drupal / Joomla / Dotclear
 * Typo3 / DokuWiki / Spip / Nucleus / FrogCMS
 * CMS Made Simple / ImpressCMS / phpnuke / skybluecanvas
 * XOOPS / SilverStripe / concrete5 / GetSimple / eZ Publish
 * Xaraya / webSPELL / Pixie / Elxis / Exponent / tikiwiki
 * bigace / guppy / toendaCMS / MDPro / Limmy / VBulletin
 * 
 ***********************************************************************************/


// Display the banner	
function displayBanner(cms, search) {
    var logo = document.createElement("div");
    logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
        'border-bottom: 1px solid #4B4B4B; margin-bottom: 0px;' +
        'font-size: small; background-color: #DDDDDD; color: #242424;">' +
        '<p style="margin: 0px 0 0px 0; align="left"; border-bottom:1px solid #808080;">' +
        '<img src=data:image/gif;base64,R0lGODlhDQAOAJEAANno6wBmZgAAAAAAACH5BAAAAAAA'+
        'LAAAAAANAA4AQAIjjI8Iyw3GhACSQecutsFV3nzgNi7SVEbo06lZa66LRib2UQAAOw%3D%3D />'+
        'This site was made with <a href="http://www.exploit-db.com/search/?action=search&filter_page=1&filter_description='+
        search + '">' + cms +	'</a></p></div>';
    document.body.insertBefore(logo, document.body.firstChild);
}


// One regex is sufficient to find the CMS
function findWithOneRegex(file, regex, name) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://' + window.location.host + '/' + file,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {
            if(responseDetails.statusText == "OK") {
                var re = new RegExp(regex, "g");
                var exec = re.exec(responseDetails.responseText);
                
                if(exec!=null) {
                    displayBanner(exec[0], name);
                }
            }
        }
    });
}

// We must used two regex to find it
function findWithTwoRegex(file, regex1, regex2, title, name) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://' + window.location.host + '/' + file,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {
            if(responseDetails.statusText == "OK") {
                
                var re1 = new RegExp(regex1, "g");
                var exec1 = re1.exec(responseDetails.responseText);
                if(exec1!=null) {
                    
                    var re2 = new RegExp(regex2, "g");
                    var exec2 = re2.exec(responseDetails.responseText);
                    if(exec2!=null) {
                        displayBanner(title + ' ' + exec2[0], name);
                    }
                }
            }
        }
    });
}

// Find the CMS with the generator metatag
function findGenerator() {
    var allMetas = document.evaluate("//meta[@name='generator' or @name='Generator' or @name='GENERATOR']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    // In case of the website contains (at least) 2 metatags named "generator"
    for(var i=0; i<allMetas.snapshotLength; i++) {
        var thisMeta = allMetas.snapshotItem(i);
        
        var cms = new Array();
        cms["wordpress"] = "WordPress";
        cms["joomla"] = "Joomla";
        cms["typo3"] = "TYPO3";
        cms["dokuwiki"] = "DokuWiki";
        cms["spip"] = "SPIP";
        cms["nucleus"] = "Nucleus";
        cms["limny"] = "Limny";
        cms["cms+made+simple"] = "CMS Made Simple";
        cms["impresscms"] = "ImpressCMS";
        cms["xoops"] = "XOOPS";
        cms["concrete5"] = "concrete5";
        cms["getsimple"] = "GetSimple";
        cms["xaraya"] = "Xaraya";
        cms["pixie"] = "Pixie";
        cms["elxis"] = "Elxis";
        cms["exponent"] = "Exponent";
        cms["sylverstripe"] = "SilverStripe";
        cms["tikiwiki"] = "TikiWiki";
        cms["skybluecanvas"] = "SkyBlueCanvas";
        cms["bigace"] = "BIGACE";
        cms["guppy"] = "GuppY";
        cms["phpnuke"] = "PHP-Nuke";
        cms["toendacms"] = "toendaCMS";
        cms["ez+publish"] = "eZ Publish";
        cms["mdpro"] = "MDPro";
        cms["webspell"] = "webSPELL";
        cms["vbulletin"] = "vBulletin";
        
        var valueGenerator = thisMeta.getAttribute("content");
        for(oneCMS in cms) {
            var re = new RegExp(cms[oneCMS], "g");
            if (valueGenerator.match(re)){
                displayBanner(valueGenerator, oneCMS);
            }
        }
    }
}


// Let's start
function init() {
    findWithOneRegex('CHANGELOG.txt', "(Drupal )\\d.\\d+(.\\d+)?", 'drupal'); 													// Drupal
    findWithTwoRegex('CHANGELOG', "(New wiki2xhtml with macro support|Dotclear)", "\\d(.\\d)+", 'Dotclear', 'dotclear'); 	// Dotclear
    findWithTwoRegex('changelog.txt', "(first public version with 1 week of dev)", "\\d(.\\d)+", 'Frog CMS', 'frog'); 		// FrogCMS
    findGenerator();																										// Others CMS
}

// Waiting the page loading
window.addEventListener(
    'load', 
    init(),
    true);