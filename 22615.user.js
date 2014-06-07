// ==UserScript==
// @name		Auto-ASIN finder for MusicBrainz
// @namespace	MBVA
// @include	http://musicbrainz.org/show/release/?releaseid=*
// @include	http://musicbrainz.org/release/*
// @include	http://musicbrainz.org/show/release/relationships.html*
// @include	http://musicbrainz.org/album/*
// @author                 BrianFreud
// ==/UserScript==

AmazonAccessKey = "0WDPQDZC4JM24FMBG882";

GM_registerMenuCommand('Auto-ASIN: Use .ca',menuCA);
GM_registerMenuCommand('Auto-ASIN: Use .com',menuUS);
GM_registerMenuCommand('Auto-ASIN: Use .de',menuDE);
GM_registerMenuCommand('Auto-ASIN: Use .fr',menuFR);
GM_registerMenuCommand('Auto-ASIN: Use .jp',menuJP);
GM_registerMenuCommand('Auto-ASIN: Use .uk',menuUK);
function menuCA() { GM_setValue('domain', 'ca'); location.href = location.href; }
function menuUS() { GM_setValue('domain', 'us'); location.href = location.href; }
function menuDE() { GM_setValue('domain', 'de'); location.href = location.href; }
function menuFR() { GM_setValue('domain', 'fr'); location.href = location.href; }
function menuJP() { GM_setValue('domain', 'jp'); location.href = location.href; }
function menuUK() { GM_setValue('domain', 'uk'); location.href = location.href; }

AmazonDomain = GM_getValue('domain', 'us');

// Helper Functions ---------------------------------------------
// function from http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
function getReleaseID() {
	peachDiv = getElementsByClass('edit')[0];
	editTitleLink = peachDiv.getElementsByTagName("a")[0];
	releaseID = editTitleLink.href.slice(54);
	return releaseID;
}
function getReleaseEventCount() {
	eventsTable1 = getElementsByClass('releaseevents')[0];
	eventsTable2 = eventsTable1.getElementsByTagName("table")[0];
	return (eventsTable2.getElementsByTagName("tr").length-1);
}
function getReleaseUPC(eventline) {
	eventsTable1 = getElementsByClass('releaseevents')[0];
	eventsTable2 = eventsTable1.getElementsByTagName("table")[0];
	eventsRow = eventsTable2.getElementsByTagName("tr")[eventline];
	releaseUPCSpan = eventsRow.getElementsByTagName("td")[4];
	// Work around any linkified-UPC script
	if(releaseUPCSpan.innerHTML.length > 15) {
		releaseUPCCell = releaseUPCSpan.getElementsByTagName('span')[0];
		releaseUPC = releaseUPCCell.getElementsByTagName('a')[0].innerHTML;
	} else releaseUPC = releaseUPCSpan.innerHTML;
	return releaseUPC;
}
function getEventRowNode(eventline) {
	eventsTable1 = getElementsByClass('releaseevents')[0];
	eventsTable2 = eventsTable1.getElementsByTagName("table")[0];
	releaseEventRow = eventsTable2.getElementsByTagName("tr")[eventline];
	releaseEventRowNode = releaseEventRow.getElementsByTagName("td")[5];
	return releaseEventRowNode;
}
// ----------------------------------------------------------------------
function getASIN(domain,event) {
    event++;
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://xml-'+domain+'.amznxslt.com/onca/xml?Service=AWSECommerceService&SubscriptionId=\
'+AmazonAccessKey+'&IdType=UPC&Operation=ItemLookup&ResponseGroup=Tracks&SearchIndex=Musi\
c&ItemId='+getReleaseUPC(event),
        headers: { 
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText,
                "application/xml");
            var Items = dom.getElementsByTagName('Items');
            var Item = Items[0].getElementsByTagName('Item');
            if(Item[0]) {
                var asin = Item[0].getElementsByTagName('ASIN')[0].textContent;
                var AmazonNode = document.createElement('span');
                AmazonNode.innerHTML = " ";
                var AmazonAnchor = document.createElement('a');
               addURL = "http://musicbrainz.org/edit/relationship/addurl.html?id="+getReleaseID()+"&linktype=30"+"&ty\
pe=album&name=Whatever%20release%20you%20were%20looking%20at.%5Co%2F&url=http://www.amazon.";
               if(domain=="us") addURL = addURL+"com";
               else if(domain=="uk") addURL = addURL+"co.uk";
               else if(domain=="ca") addURL = addURL+"ca";
               else if(domain=="jp") addURL = addURL+"co.jp";
               else if(domain=="de") addURL = addURL+"de";
               else if(domain=="fr") addURL = addURL+"fr";
               addURL = addURL+"/gp/product/"+asin;
               AmazonAnchor.href = addURL;
                var AmazonPic = document.createElement('img');
                AmazonPic.src = "http://amazon.co.uk/favicon.ico";
               AmazonAnchor.appendChild(AmazonPic);
               AmazonNode.appendChild(AmazonAnchor);
               getEventRowNode(event).appendChild(AmazonNode);
            }
        }
    });
}
for(k=0;k<getReleaseEventCount();k++) {
	getASIN(AmazonDomain,k);
}