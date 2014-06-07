// ==UserScript==
// @name       TradeMe Tweaks
// @namespace  http://drsr/
// @version    0.8
// @description  Tweak TradeMe page elements, including the main menu, header, footer, and sidebar, and maps
// @include    http://www.trademe.co.nz/*
//    exclude iframe on stuff.co.nz pages
// @exclude    http://www.trademe.co.nz/iframe/*
// @copyright  public domain
// @run-at   document-end
// @require    http://drsr.site90.com/js/GM_config_mod.js
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_log
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant unsafeWindow
// ==/UserScript==
// v0.8: Click on either of the "Watching" buttons on a listing to remove it from the watchlist
// v0.7: Option to hide other ads on sidebar (although AdBlock does this anyway), fix box width for quick links
// v0.6: Wait for map to load before tweaking it
// v0.5: Add "Full map" and "Zoodle" links to map info window on Real Estate pages, hide Travelbug on homepage
// v0.4: Click the "Saved" button on a listing to remove it from the watchlist
// v0.3: Change order of extra items on "My Trade Me" dropdown to match sidebar
// v0.2: Add "Tweak My Trade Me dropdown menu items", adds "Blacklist" and "My Photos" to menu
var myJQ = unsafeWindow.jQuery;
var settings = {};
function removeDropdowns() {
    // Remove dropdowns from top menu, just go straight to the pages
    myJQ(".modal-open:not([class*='search-options'])").unbind("click");
    // deleting the dropdown arrow span makes the buttons symmetrical but looks more jumpy: myJQ(".modal-open span").remove();
    myJQ(".modal-open:not([class*='search-options']) span").css("background-image", "none"); // dropdown arrow
    
    // Same for "My Trademe"
    myJQ("#SiteHeader_SiteTabs_myTradeMeDropDownLink").unbind("click");
    // myJQ(".mytrademe span").remove(); // dropdown arrow
    myJQ(".mytrademe span").css("background-image", "none"); // dropdown arrow
}
function removeSidebarFeatures() {
    // remove unwanted sidebar features
    if (settings.hideSidebarOtherAds) {
        myJQ("#lifeDirectForm_lifeDirectDiv").hide();
        myJQ("#HomepageAdSpace").hide();
    }
    if (settings.hideSidebarFindSomeone) {
        myJQ(".sidebar-feature:not([id])").hide(); // "find someone"
    }
    if (settings.hideSidebarTreatme) {       
        myJQ("#treatMe_dailyDealsDiv").hide();
    }
    if (settings.hideSidebarTravelbug) {
        myJQ("#travelbugDeals_dailyDealsDiv").hide();
    }
}
function addQuickLinksToSidebar() {
    if (myJQ("#sidebar_tmtw_QuickLinks").length > 0 || !settings.addQuicklinksToSidebar) {
        return;
    }
    
    // TODO tweak layout, border?
    GM_addStyle("\
.tmtw_ql h3 {\
font: bold 16px Arial,Helvetica,Sans-serif;\
color: #c60;\
padding: 3px 10px 0;\
}\
.tmtw_ql a {\
padding-left:2em;\
}");
    
    myJQ('.sidebar').prepend('\
<div id="sidebar_tmtw_QuickLinks" class="old-box solid sidebar-feature" >\
	<div class="inner">\
        <div class="bd tmtw_ql">\
		<ul style="padding-bottom:10px">\
			<li><h3 id="SiteHeader_SideBar_tmtw_ql_BuyingText">Buying</h3>\
				<ul>\
					<li><a href="/MyTradeMe/Buy/Watchlist.aspx?source=sidebar" id="SiteHeader_SideBar_tmtw_ql_WatchlistLink">Watchlist</a></li>\
					<li><a href="/MyTradeMe/Buy/Won.aspx?source=sidebar" id="SiteHeader_SideBar_tmtw_ql_WonItemsLink">Items I won</a></li>\
					<li><a href="/MyTradeMe/Buy/Lost.aspx?source=sidebar" id="SiteHeader_SideBar_tmtw_ql_LostItemsLink">Items I lost</a></li>\
					<li id="SiteHeader_SideBar_tmtw_ql_FavouritesListItem"><a href="/MyTradeMe/Favourites.aspx?source=sidebar" id="SiteHeader_SideBar_tmtw_ql_FavouritesLink">My favourites</a></li>\
					<li><a href="/Browse/Latest.aspx">Latest listings</a></li>\
					<li id="SiteHeader_SideBar_tmtw_ql_RecentlyViewedListItem" class="Last"><a href="/Listings/recently-viewed.htm" id="SiteHeader_SideBar_tmtw_ql_RecentlyViewedLink">Recently viewed</a></li>\
				</ul>\
			</li>\
			<li class="Selling"><h3 id="SiteHeader_SideBar_tmtw_ql_SellingText">Selling</h3>\
				<ul>\
					<li id="SiteHeader_SideBar_tmtw_ql_ListAnItem"><a href="/Sell/Default.aspx?source=sidebar" id="SiteHeader_SideBar_tmtw_ql_ListAnItemLink">List an item</a></li>\
					<li><a href="/MyTradeMe/Sell/Current.aspx?source=sidebar" id="SiteHeader_SideBar_tmtw_ql_SellingLink">Items I\'m selling</a></li>\
					<li><a href="/MyTradeMe/Sell/Sold.aspx?source=sidebar" id="SiteHeader_SideBar_tmtw_ql_SoldItemsLink">Sold items</a></li>\
					<li id="SiteHeader_SideBar_tmtw_ql_unsoldLink" ><a href="/MyTradeMe/Sell/Unsold.aspx?source=sidebar" id="SiteHeader_SideBar_tmtw_ql_UnsoldItemsLink">Unsold items</a></li>\
					<li><a href="/MyTradeMe/MyPhotos.aspx">My Photos</a></li>\
					<li><a href="/MyTradeMe/BlackList.aspx">Blacklist</a></li>\
				</ul>\
			</li>\
		</ul>\
		</div>\
	</div>\
</div>');
}
function isHomePage() {
    return (myJQ(".sidebar").length > 0);
}
function removeTopBar() {
    /* Hide the top nav bar, which is stretched out when Adblock is operational and when zoom is less than 100% */
    myJQ(".sat-nav").hide();
}
// --------------------------------------------------------------------------------------------
function unsaveButton(evt) {
    // Unsaved:
    //   class="SaveToWatchlistButton spriteButton button30"
    // Saved:
    //   class="SaveToWatchlistButton Saved spriteButton"
    var ret = false;
    var saveButton = myJQ("#SaveToWatchlist_SaveToWatchlistButton");
    var topSaveButton = myJQ("#ListingTitle_watchlistLink");
    if (saveButton.hasClass("Saved")) {
        myJQ.ajax({
            type: 'POST',
            url: '/MyTradeMe/WatchlistDelete.aspx',
            data: {
                "refurl": window.location.href,
                "type": "watchlist",
                "postback": "0",
                "ref": "watchlist",
                "auction_id": "0", /* actual IDs are in auction_list */
                "offer_id": "",
                "auction_list": unsafeWindow.listingId, /* Listing ID global from page */
                "submit1": "Delete"
            },
            error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error while unsaving from watchlist: " + textStatus + " " + errorThrown); 
            },
            success: function(data, textStatus, jqXHR) {
                saveButton.removeClass("Saved").addClass("button30");
                topSaveButton.removeClass("saved btn-disabled").addClass("linkUnsaved");
                topSaveButton.children("span").attr("class", "watchlist-plus");
                topSaveButton.contents()[1].textContent="Watchlist";
                // these divs are generated hidden if the item is saved already
                myJQ("#SaveToWatchlist_EmailReminder, #SaveToWatchlist_TextReminder").hide();
                // page global generated by TradeMe and used by TM click event
                unsafeWindow.isSaved = false;
            }
        });
    } else {
        // call original TM click function (cheat by calling the bottom one even if the top one was clicked)
        ret = unsafeWindow.BottomListingWatchlistButtonClick(evt);
        // Make sure we still have the click captured and re-enable the top button
        tweakSavedButtonClicks();
    }
    evt.preventDefault();
    return ret;
}
function tweakSavedButtonClicks() {
    var saveButtons = myJQ("#SaveToWatchlist_SaveToWatchlistButton, #ListingTitle_watchlistLink");
    saveButtons.removeClass("btn-disabled");
    // replace click event, will chain to the original if it's not currently saved
    saveButtons.unbind().click(unsaveButton);
}

function tweakSavedButton() {
    GM_addStyle(".SaveToWatchlistButton.Saved{cursor:pointer !important}");
    tweakSavedButtonClicks();
}
// --------------------------------------------------------------------------------------------
function removeFooter() {
    /* Hide the grey site footer, which unnecessarily appears on every page and is way too big */
    myJQ(".site-footer").hide();
}
function tweakBeforeLoad() {
    if (isHomePage()) {
        if (settings.hideTopBarOnHomepage) {
            removeTopBar();
        }
        if (settings.hideFooterOnHomepage) {
            removeFooter();
        }
        removeSidebarFeatures();
        addQuickLinksToSidebar();
    } else {
        if (settings.hideTopBarOnOtherPages) {
            removeTopBar();
        }
        if (settings.hideFooterOnOtherPages) {
            removeFooter();
        }
    }
}

// Add extra links to "My Trade Me"
function tweakMyTrademeDropdown() {
    myJQ("#SiteHeader_SiteTabs_myTradeMeDropDownLink").click(function() {
        myJQ("#mtm-selling ul:eq(1) li:eq(1)").replaceWith('<li><a href="/MyTradeMe/MyPhotos.aspx">My Photos</a></li>');
        myJQ("#mtm-selling ul:eq(1) li:eq(1)").append('<li><a href="/MyTradeMe/BlackList.aspx">Blacklist</a></li>');        
    });
}

// Add "Open in Google Maps" to map's InfoWindow on Real Estate pages
// The "Powered by Google" link opens the right area, but doesn't display a marker at the property location
// Also adds a link for Zoodle, to easily get school zones
function tweakMap() {
    // mapState is a global in TM real estate pages
    var mapState = unsafeWindow.mapState;
	if (mapState && mapState.lat && mapState.lng) {
        var zoomIn = myJQ('a:contains("Zoom in")');
        if (zoomIn.length == 0) {
            // console.log("Map not loaded yet");
            setTimeout(tweakMap, 2000);
        } else {
            zoomIn.nextAll().remove();
            zoomIn.replaceWith('<a target="_blank" href="https://maps.google.co.nz?q=' + 
                               mapState.lat + ',' + mapState.lng +
                               '" title="Open Google Maps in a new window">Full map</a>' +
                               '&nbsp;|&nbsp;<a target="_blank" href="https://www.zoodle.co.nz/search?query=' +
                              escape(mapState.userEnteredLocation) +'" title="Search for this address in Zoodle">Zoodle</a>');
        }
    } else {
        console.log("No mapState in page");
    }
}    

function tweakAfterLoad() {
    if (settings.removeDropdowns) {
        myJQ(unsafeWindow.document).unbind("ready");
        removeDropdowns();
    } else {
        if (settings.tweakMyTrademeDropdown) {
            tweakMyTrademeDropdown();
        }
    }
    tweakSavedButton();

    tweakMap();
}

function initSettings() {
    // TODO not working except .config_var, CSS is generated in iframe but ignored, iframe issue?
    var configCSS = 
        '\n' + " #GM_config_wrapper {margin-left: auto !important; margin-right: auto !important; width:30em !important} " + '\n' +
        "#GM_config_buttons_holder  {margin-left: 25% !important; margin-right: 25% !important; } " + '\n' + 
        "#GM_config .config_var {margin-top: 1em; margin-bottom: 1em; margin-left:10%; margin-right:10%}"; 
    
    settings = {
        hideTopBarOnHomepage: false,
        hideTopBarOnOtherPages: true,
        
        hideFooterOnHomepage: false,
        hideFooterOnOtherPages: true,
        
        removeDropdowns: false,
        tweakMyTrademeDropdown: false,
        
        addQuicklinksToSidebar: true,
        
        hideSidebarOtherAds: false,
        hideSidebarFindSomeone: false,
        hideSidebarTreatme: false,
        hideSidebarTravelbug: false
    };
    GM_config.init('TradeMe Tweaks Settings',
    {
        'hideTopBarOnHomepage': {
            'section': ['Top Bar'],
            'type': 'checkbox', 
            'label': 'Hide on home page',
                'default': settings.hideTopBarOnHomepage
         },
        
        'hideTopBarOnOtherPages': {
            'type': 'checkbox',
            'label': 'Hide on other pages',
            'default': settings.hideTopBarOnOtherPages
        },
        
         'hideFooterOnHomepage': {
            'section': ['Footer'],
                'type': 'checkbox', 
            'label': 'Hide on home page',
                'default': settings.hideFooterOnHomepage
         },
        
        'hideFooterOnOtherPages': {
            'type': 'checkbox',
            'label': 'Hide on other pages',
            'default': settings.hideFooterOnOtherPages
        },
        
        'removeDropdowns': {
            'section': ['Main menu'],
                'type': 'checkbox', 
            'label': 'Remove dropdowns from main menu',
                'default': settings.removeDropdowns
         },
         'tweakMyTrademeDropdown': {
            'type': 'checkbox', 
            'label': 'Tweak My Trade Me dropdown menu items',
            'default': settings.tweakMyTrademeDropdown
         },
       'addQuicklinksToSidebar': {
            'section': ['Home Page Sidebar'],
                'type': 'checkbox', 
            'label': 'Add Quick Links',
                'default': settings.addQuicklinksToSidebar
         },
        
        'hideSidebarFindSomeone': {
            'type': 'checkbox',
            'label': 'Hide Find Someone',
            'default': settings.hideSidebarFindSomeone
        },
        
        'hideSidebarTreatme': {
            'type': 'checkbox',
            'label': 'Hide Treatme',
            'default': settings.hideSidebarTreatme
        },
        'hideSidebarTravelbug': {
            'type': 'checkbox',
            'label': 'Hide Travelbug',
            'default': settings.hideSidebarTravelbug
        },
        'hideSidebarOtherAds': {
            'type': 'checkbox',
            'label': 'Hide Other Sidebar Ads',
            'default': settings.hideSidebarOtherAds
        },
    }, configCSS);
    
    // for..in doesn't officially work in GreaseMonkey
    var settingKeys = Object.keys(settings);
    for (var i=0; i<settingKeys.length; i++) {
        settings[settingKeys[i]] = GM_config.get(settingKeys[i]);
    }
}
function openGMConfig() {
      
    // Code included from GM_config Extender http://userscripts.org/scripts/review/50018
    GM_config.resizeFrame = function(wid,hei) {
      if(fid=this.frame.id) {
        this.frame.style.width = wid;
        this.frame.style.height = hei;
      }
    }
    // end of GM_config Extender code 
        
    GM_config.onSave = function() {GM_config.close; window.location.reload();}; // so the "Save" button also closes the dialog and reloads the page
    
    GM_config.open();
    GM_config.resizeFrame('500px', '650px');
    
}
// ---------------------------------------------------------------------------------------
initSettings();
GM_registerMenuCommand('TradeMe Tweaks: Settings',openGMConfig);
tweakBeforeLoad();
myJQ(unsafeWindow).load(tweakAfterLoad);
