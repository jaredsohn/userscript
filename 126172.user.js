// ==UserScript==
// @name       TradeMe Real Estate filter
// @namespace  http://drsr/
// @version    1.0
// @description  Filter out listings that don't name a definite price in Real Estate search results. Works in List view only
// @include    /http://www\.trademe\.co\.nz/[Bb]rowse/[Cc]ategory[Aa]ttribute[Ss]earch[Rr]esults.aspx.*/
//    tried using params to select only real estate search results but there are too many variants
// @include    http://www.trademe.co.nz/property/*
// @include    http://www.trademe.co.nz/browse/property/regionlistings.aspx*
// @include    http://www.trademe.co.nz/members/listings.aspx*
// @grant      GM_addStyle
// @copyright  public domain
// ==/UserScript==


//-----------------------------------------------------------------------------------------------
// Listings with a "price" that matches this pattern will be hidden
var KILL_PATTERN = /(Price by negotiation)|(Enquiries Over)|(To be auctioned)|(Tender)/i;

// Some alternative kill patterns below, remove the "//" at the start of the line add a "//" before the other patterns to use them

// Any price that doesn't contain a dollar sign. This will allow "Enquiries over $nnnn" but block all auctions, tenders etc.
// var KILL_PATTERN = /^[^\$]*$/;

// Only kill "Price by negotiation"
// var KILL_PATTERN = /Price by negotiation/i;
//-----------------------------------------------------------------------------------------------

// Changes: 
// v0.3 don't fire for non-realestate searches, add clickable link to show/hide
// v0.4 fix search from favourites
// v0.5 filter out prices that are under the minimum or over the maximum for the current search
// v0.6 fix image viewer and other problems on listing view page in Firefox
// v0.7 fix $million + properties always filtered
// v0.8 Greasemonkey 1.0
// v0.9 fix for TM CSS change
// v1.0 work with "Properties from this office" page and category listing pages

var KILLED_LISTING_STYLES = 
".killedlisting {background-color:#eeeeee !important; color: #999999 !important;}\
.hiddenlisting {display:none !important;}";

GM_addStyle(KILLED_LISTING_STYLES);

// replace trademe's JS error handler
window.onerror=function(msg, url, linenumber){
    if (msg.indexOf("Uncaught TypeError") < 0) { // caused by Adblock in Chrome I think
//        console.log('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    }
    return true;
};

var $ = unsafeWindow.jQuery; // noConflict doesn't work in Greasemonkey/Firefox
var killedListingCount = 0;

function toggleListingVisibility() {
    $(".killedlisting").toggleClass("hiddenlisting");
    $("#killToggle").text($("#killToggle").text()==="show" ? "hide" : "show");
}

// keypress code borrowed from "Google reader tiny"
function REF_key(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     typing = (element.type == "text" || element.type == "password");
   } else {
     typing = (elementName == "textarea");
   }
   if (typing) return true;

    if (String.fromCharCode(event.which)=="H" && !event.ctrlKey && !event.altKey && !event.metaKey) {
     toggleListingVisibility();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
   return true;
 }
document.addEventListener("keydown", REF_key, false);

// get the max and min prices from the search form 
// values for "Any" = 0, "2M+" = 2000000
var maxPrice = parseInt($("#max-49").val());
var minPrice = parseInt($("#min-49").val());

function priceInsideRange(price) {
    if (price.indexOf('$')<0) {
        return true;
    }

    var numericPrice = parseInt(price.split('$')[1].replace(/,/g, ''));
    // catch prices accidentally listed as price/1000
    if (numericPrice < 1000) {
        numericPrice *= 1000;
    }

    // check for 2 million because this search form option is actually 2 million plus so doesn't count as a max
    var insideMax =  maxPrice <= 0 || maxPrice == 2000000 || numericPrice <= maxPrice;
    var insideMin = minPrice <=0 || numericPrice >= minPrice;

    return (insideMin && insideMax);
}

function addListingHeader() {
    if (killedListingCount > 0) {
        // add under the "nnnn listings, showing n to n" para
        var killedHeader = $('<p>' 
                             + killedListingCount + ' hidden listings, <a id="killToggle" href="javascript:void(0)">show</a>');
        
        // IDs of header text div and para in search results mode
        var listingText = $("#ListView_listingTableHeader_headerColumnListViewText");
        var tableHeader = $("#ListView_listingTableHeader_headerColumnListView");
        
        if (listingText.length==0) {
            // IDs are different in browse mode
            listingText = $("#LV_listingTableHeader_headerColumnListViewText");
            tableHeader = $("#LV_listingTableHeader_headerColumnListView");
        }
        
        if (listingText.length>0) {
            killedHeader.attr("style", listingText.attr("style"));
            listingText.css("padding-bottom", "0px");
            tableHeader.append(killedHeader);        
            $("#killToggle").click(toggleListingVisibility);
        }
    }
}

// try to check for property search results as it sometimes fires on Motors search results
// breadcrumb class is different for category listing page e.g.
// http://www.trademe.co.nz/property/residential-property-for-sale/canterbury/christchurch-city
var firstBreadCrumb = $("#mainContent .site-breadcrumbs a:first, #mainContent .category-listings-breadcrumbs a:first");
var priceColumnClass = ".listingPrice";
if (firstBreadCrumb.length == 0) {
    // "Properties from this office" page
    firstBreadCrumb = $("#BreadCrumbTrail_BreadcrumbsContainer a:first");
    priceColumnClass = ".classifyCol";
}
var isPropertySearchResult = firstBreadCrumb.text().indexOf("Property") != -1;
if (isPropertySearchResult) {
    // Class for the price field is different in gallery view so this won't find anything
    $(priceColumnClass).each(function(index, listingPrice) {
        var price = listingPrice.textContent;
        if (KILL_PATTERN.test(price) || !priceInsideRange(price)) {
            
           $(listingPrice).closest(".listingCard").addClass("killedlisting hiddenlisting");
            killedListingCount++;
            
        }});
    
    // TODO could kill ".super-features-container" if all prices inside (".super-feature-price") should be killed?
    
    addListingHeader();
}        
