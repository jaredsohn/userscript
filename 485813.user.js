// ==UserScript==
// @name       Seek job ads tool
// @version    0.1
// @description  Filter ads from recruiment agents for Seek; tested with Chrome and Tampermonkey
// @match      http://www.seek.com.au/*
// @copyright  2014, wiserfirst
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

var agentNames = ["sirius",
    "The Network",
    "TRA Global",
    "Ethos Corporation",
    "Randstad",
    "TRC Group",
    "Harvey Nash",
    "Pro-Perspective",
    "Recruitment",
    "Power IT Consultancy Services",
    "Greythorn",
    "Paxus Australia",
    "2XM Technology",
    "inDmand Career Solutions",
    "Apex Resource Solutions Holdings",
    "Hays",
    "Progressive",
    "Attribute Consulting",
    "PRA",
    "Has Consultancy",
    "M&T Resources",
    "Xpand Group",
    "Talent International",
    "Pro-Active Human Resources",
    "Just Digital People",
    "ITechniche",
    "Sigma Resourcing",
    "Interpro",
    "Mitchellake Consulting",
    "Naviro",
    "ninetwenty",
    "Genesis IT&T",
    "Peoplebank Australia",
    "Ambition Technology",
    "Robert Half Technology",
    "Robert Walters",
    "Northbridge IT Recruitment",
    "Skillquest",
    "Data Talent",
    "Cubic Resources",
    "Tenth House",
    "HCM Australia",
    "Tardis Group",
    "Ashdown Consulting",
    "Integrated Workforce",
    "Hudson",
    "DistinctConnect",
    "Miller Gold Search & Select",
    "Enterprise IT Resources",
    "Chandler Macleod Group",
    "s2m",
    "ecareer employment services",
    "Interactiveinc",
    "Clarius Group",
    "Hydrogen Group",
    "IBIT Solutions",
    "BI & DW",
    "ETE Group",
    "Career Corporation",
    "eMerge Talent",
    "ITCOM",
    "Ajilon",
    "recruit"
];

var filterHandler = function() {
        var Ads = jQuery("article");

        Ads.each(function() {
            var item = $(this)
            var advertiser = item.find(".advertiser-name").text();
            console.log(advertiser);
            jQuery.each(agentNames, function(index, str) {
                var regex = new RegExp(str.replace(/\s+/g, "\\s+"), "i");
                if (advertiser.match(regex)) {
                    item.remove();
                }
            });
        })

        jQuery("div.mod-pagination a").click(updateHandler);
        jQuery("select#SortMode").change(updateHandler);

        var count = jQuery("article").length;
        if (count <= 0) {
            // if no ad left, goto next page
            jQuery("#next-page > a").click();
        } else {
            console.log("Ads number after removal: " + count);
        }
};

var pagerLinkSelector = "div.mod-pagination a";
var updateHandler = function() {
    console.log("\n\nNew Page\nupdateHandler called\n\n");
    jQuery("div.mod-pagination a").off('click');
    setTimeout(function() {
        jQuery("div.mod-pagination a").click(updateHandler);
        jQuery("div.mod-pagination a").on('click');
        filterHandler();
    }, 3000);
};

jQuery(document).ready(function() {
    console.log("Loaded job ads tool");
    setTimeout(filterHandler, 3000);
});
