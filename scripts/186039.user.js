// ==UserScript==
// @name        CoinMarketCap Improvements
// @namespace   http://rowanhenderson.com
// @description Adds some nice changes to CoinMarketCap
// @downloadURL https://userscripts.org/scripts/source/186039.user.js    
// @include     http://coinmarketcap.com/
// @include     http://coinmarketcap.com/#*
// @include     http://coinmarketcap.com/mineable.html
// @include     http://localhost/cmc/*
// @version     2.1.3
// @grant       none
// @lastUpdate  Feb, 23, 2014
// @features    remove ads, hide/show charts (list view), colored lines, moves header for more space
// @updateURL   https://userscripts.org/scripts/source/186039.meta.js
// ==/UserScript==

/*********************************************************************************************************************************************
This script (while in development) is licensed with a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license
https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US
*********************************************************************************************************************************************/

// Check settings, and add a default if it hasn't been set up before
if (localStorage.chartState == undefined) { localStorage.chartState = 1 }
if (localStorage.priceColor == undefined) { localStorage.priceColor = 1 }
if (localStorage.refreshTime == undefined) { localStorage.refreshTime = "5" }
if (localStorage.rowColor == undefined) { localStorage.rowColor = "rgba(128, 128, 128, 0.05)" }
if (localStorage.switchPrice == undefined) { localStorage.switchPrice = 1 }
if (localStorage.chartWidth == undefined) { localStorage.chartWidth = "75" }
if (localStorage.fontSize == undefined) { localStorage.fontSize = "14" }
if (localStorage.hover == undefined) { localStorage.hover = 1 }
if (localStorage.filters == undefined) { localStorage.filters = 1 }
if (localStorage.options == undefined) { localStorage.options = 1 }
if (localStorage.ripple == undefined) { localStorage.ripple = 1 }
if (localStorage.unmineable == undefined) { localStorage.unmineable = 1 }
if (localStorage.showSymbols == undefined) { localStorage.showSymbols = 1 }
if (localStorage.priceOption == undefined) { localStorage.priceOption = 1 } // 1 = USD
if (localStorage.hides == undefined) { localStorage.hides = "|" }
if (localStorage.favs == undefined) { localStorage.favs = "|" }
if (localStorage.scriptDisabled == undefined) { localStorage.scriptDisabled = 0 }
if (localStorage.lastVersion == undefined) { localStorage.lastVersion = GM_info.script.version }
if (localStorage.chromeNotice == undefined) { localStorage.chromeNotice = 0 }

localStorage.showFavs = 0;
localStorage.editMode = 0;
var currentVersion = GM_info.script.version

// Variables the user can't change via the website
localStorage.newCoinTimeout = 21600; // How long to show a coin as a new coin. Default = 6 hours
localStorage.newCoinAmount = 5; // Max new coins to show



// This event has to go first in case user has script disabled
$("body").on("click", "#disableToggle", function() {
    localStorage.scriptDisabled = (localStorage.scriptDisabled == 0) ? 1 : 0;
    location.reload()
});

// The first thing we should do is check if the user has disabled this script
if (localStorage.scriptDisabled == 1 && localStorage.lastVersion == currentVersion) {

    $("#discussion").after('<hr />'
        +'<div class="row" style="margin-top: 10px; margin-bottom: 10px">'
            +'<div class="col-md-12"><button id="disableToggle" class="btn btn-mini" style="background: #0088CC">Enable CoinMarketCap Improvements '+GM_info.script.version+'</button></div>'
        +'</div>')

    localStorage.lastVersion = currentVersion

    return false;
    
} else if (localStorage.scriptDisabled == 1 && localStorage.lastVersion != currentVersion) {

    localStorage.scriptDisabled = 0
    
}

// Show update notification
if (localStorage.lastVersion != currentVersion) {
    
    $("body").append("<div id='updated' style='display: none'>CoinMarketCap Improvements has been updated to version "+GM_info.script.version+"!</div>")
    $("#updated").fadeIn(3000).delay(6000).fadeOut('slow')
    
}

localStorage.lastVersion = currentVersion

// Check to see which page they're on
var pathName = window.location.pathname
var pathNameHash = window.location.hash


// Changes the page based on options. These are run automatically.
setup = {

    start: function() {
    
        // See if user wants to view Unmineable currency
        this.unmineable()
    
        // Mark proper coins as favorite or hidden
        edit.identify("fav")
        edit.identify("hide")
    
        // Changes to the page layout/structure
        this.tweaks()
        
        // Color all odd table rows
        this.color() 
        
        // Checks the toggle status on Hover Effects
        this.hover()
    
        // Check if user wanted price and MC switched
        this.switchPrice()
        
        // Check if they want $ and % signs
        this.symbols()
        
        // This will check your show/hide chart settings when the page starts
        this.charts()
        
        if (localStorage.unmineable == 1) {
            // See if user wants to view Ripple
            this.checkRipple()
        }
    
        // Check for new and missing coins
        this.checkCoins()
        
        // Set the auto refresh timer
        this.setTimer(localStorage.refreshTime)
        
        // Show which options the user has set
        this.fillOptions()
        
    },

    charts: function() {

        $("#chart-options li").removeClass("active")
    
        if (localStorage.chartState == "0") {
            $("td a div").parent().parent().hide()
            $("th").eq(7).hide()
            $("td.chartLink,#chartLinkHead").show()
            $("#chart-hide").addClass("active")
        } else {
            $("td:hidden").show()
            $("th").eq(7).show()
            $("td.chartLink,#chartLinkHead").hide()
            $("#chart-show").addClass("active")
        }
    },
    
    color: function() {
        
        $("#rowColor").val(localStorage.rowColor)

        $("#priceColor-options li").removeClass("active")
        $("td a").css("color", "#000000")
        
        // Check if user wants the prices colored
        if (localStorage.priceColor == 1) {
        
            $('a.price').css("color", "#009933") // Green by default
            
            // Color the negative numbers
            var priceRow = (localStorage.switchPrice == 1) ? 3 : 2;
            
            $('td.negative_change').each(function(index, value) {
                $(this).parent().find('td:has("a.price")').addClass('negative_change')
            });
        
            // Make it so links can be red
            $('.negative_change a').css('color', '#D14836')
            
            $("#priceColor-on").addClass("active")
            
        } else {
            
            $("#priceColor-off").addClass("active")
        }
        
        setup.rowColors()
    },
    
    setTimer: function(x) {
        var thisMath = ((localStorage.refreshTime * 60) * 1000)
        clearTimeout(window.timer)
        window.timer = setTimeout(function() { location.reload() }, thisMath)
        
        // Pointless, but I like little details
        if (x == 1)
            $("#refreshMin").text("min")
        else
            $("#refreshMin").text("mins")
    },
    
    // Switch Price and Market Cap
    switchPrice: function() {

        $("#switchPrice-options li").removeClass("active")
        
        if (localStorage.switchPrice == 0 && $("th:eq(2)").text() == "Market Cap") {
            $("#switchPrice-off").addClass("active")
            return false;
        }
    
        $('tr').each(function(index, value) {
        
            // Switch every 4th column with the 3rd column
            var col3 = $(this).find("td:eq(2)")
            var col4 = $(this).find("td:eq(3)")
            $(col4).clone(true).insertBefore(col3)
            $(col4).remove()

        });
        
        // Switch the table headers too
        var col3 = $("th:eq(2)")
        var col4 = $("th:eq(3)")
        $(col4).clone(true).insertBefore(col3)
        $(col4).remove()
            
        if (localStorage.switchPrice == 1)
            $("#switchPrice-on").addClass("active")
        else
            $("#switchPrice-off").addClass("active")
        
    
    },
    
    symbols: function() {
    
        $(".symbol-option").parent().removeClass("active")
    
        // Check if they want $ and % signs
        if (localStorage.showSymbols == 0) {
        
            // Only remove the $ if they're viewing in USD
            if (localStorage.priceOption == 1) {
                $('a.price, td.market-cap, td.volume').each(function(index, value) {
                    $(this).text($(this).text().substr(1));
                });
            }
        
            
            $('td.numeric:contains("%")').each(function(index, value) {
                $(this).text($(this).text().replace(' %', ''));
            });
            
            $("#symbol-off").addClass("active")
            
        } else {
            
            // Only add $ again if they're viewing in USD
            if (localStorage.priceOption == 1) {
            
                if($("a.price:first").text().substr(0,1) != "$") {
                    $("a.price,td.market-cap,td.volume").prepend("$ ")
                    $(".numeric").append(" %")
                }
                
                $("#symbol-on").addClass("active")
                
            }
        }
    
    },
    
    hover: function() {
    
        if (localStorage.hover == 1) {
        
            $("body").on({
                mouseenter: function () {
                    $(this).addClass("hover")
                },
                mouseleave: function () {
                    $(this).removeClass("hover")
                }
            }, "tbody tr[id!='chartParent'], th"); // make sure charts can't be a selector
        
            $("#hover-on").addClass("active")
        } else {
        
            $("body").off("mouseenter mouseleave", "tbody tr[id!='chartParent'], th");
            $("#hover-off").addClass("active")
        }
    
    },
    
    rowColors: function() {
        $("tr").removeClass("odd")
        $("tr:visible:odd").addClass("odd")
        
    },
    
    fillOptions: function() {
    
        // Check if options panel should be shown/hidden
        if (localStorage.options == 0) {
            $("#sideboxOptions").hide()
            $("#sideboxOptionsShow").show()
        } else {
            $("#sideboxOptions").show()
            $("#sideboxOptionsShow").hide()
        }
        
        // Check if filters panel should be shown/hidden
        if (localStorage.filters == 0) {
            $("#sideboxFilters").hide()
            $("#sideboxFiltersShow").show()
        } else {
            $("#sideboxFilters").show()
            $("#sideboxFiltersShow").hide()
        }
        
        // Check Ripple status
        if (localStorage.ripple == 1)
            $("#ripple-on").addClass("active")
        else
            $("#ripple-off").addClass("active")
            
    
        // Check which row color they're using
        $("#rowColor").val(localStorage.rowColor)
        
        // Check the chart width
        $("#chartWidth").val(localStorage.chartWidth)
        
        // Check if they want to view USD or BTC
        if (localStorage.priceOption == 0) {
            $("#price-toggle-btc").trigger("click")
        }
        
        // Check to see if they want to go to a certain page
        if (pathNameHash != "") {
            $("#show-"+pathNameHash.substr(1)).trigger("click")
        }
        
        // Check Unmineable status
        if (localStorage.unmineable == 1)
            $("#unmineable-on").addClass("active")
        else
            $("#unmineable-off").addClass("active")
        
          
    },
    
    checkRipple: function() {
    
        // Don't do anything if you don't need to...
        if (localStorage.ripple == 1 && $("#xrp").is(":visible")) return false
        
        // Math
        var totalMarket = $("#total-marketcap").attr("data-usd").replace(/\,/g, '');
        var totalMarketBTC = $("#total-marketcap").attr("data-btc").replace(/\,/g, '');
        var rippleMarket = $("#xrp").find("td.market-cap").attr("data-usd").replace(/\,/g, '');
        var rippleMarketBTC = $("#xrp").find("td.market-cap").attr("data-btc").replace(/\,/g, '');
        var newMarket = totalMarket - rippleMarket
        var newMarketBTC = totalMarketBTC - rippleMarketBTC

        $("#total-marketcap").attr({'data-noripple': commaSeparateNumber(newMarket), 'data-noripplebtc': commaSeparateNumber(newMarketBTC)})
        
        // Detect which number Ripple is
        var ripNum = $("#xrp td:eq(0)").text()
    
        // Change every row after Ripple
        $("tr:gt("+ripNum+")").each(function(index, value) { 
                    
            if (localStorage.ripple == 1) {
                var newNum = Number($(this).find("td:first").text()) + 1
                if (localStorage.priceOption == 1) {
                    $("#total-marketcap").text("$ "+$("#total-marketcap").attr("data-usd"))
                } else {
                    $("#total-marketcap").text($("#total-marketcap").attr("data-btc")+" BTC")
                }
                $("#xrp").removeClass("isHidden").show()
                
            } else {
                var newNum = Number($(this).find("td:first").text()) - 1
                if (localStorage.priceOption == 1) {
                    $("#total-marketcap").text("$ "+$("#total-marketcap").attr("data-noripple"))
                } else {
                    $("#total-marketcap").text($("#total-marketcap").attr("data-noripplebtc")+" BTC")
                }
                $("#xrp").addClass("isHidden").hide()
            }
            
            $(this).find("td:first").text(newNum)
                    
        });
        
        this.rowColors()
        
    },
    
    unmineable: function() {
    
        // Check if they'd rather see the Ripple page
        if (pathName == "/mineable.html" && localStorage.unmineable == 1) {
            window.location = "http://coinmarketcap.com"
            return false;
        }
        
        if (pathName != "/mineable.html" && localStorage.unmineable == 0) {
            window.location = "http://coinmarketcap.com/mineable.html"
            return false;
        }
    
    },
    
    // Check which coins have been added/removed
    checkCoins: function() {
    
        
        // Fill up a list with all the current coins
        var currentCoins = []
        $("tr").each(function(i, v) {
            var x = $(this).find("a:first").text()
            currentCoins.push(x)
        });
        
        
        // Set defaults if needed
        if (localStorage.lastCoins == undefined) localStorage.lastCoins = JSON.stringify(currentCoins)
        if (localStorage.newCoins == undefined) localStorage.newCoins = JSON.stringify([])
        if (localStorage.missingCoins == undefined) localStorage.missingCoins = JSON.stringify([])
    
        // Turn stored string into JSON
        var lastCoins = JSON.parse(localStorage.lastCoins)
        var newCoins = JSON.parse(localStorage.newCoins)
        var missingCoins = JSON.parse(localStorage.missingCoins)
        
        // Timestamp
        var lastVisible = Math.round((new Date()).getTime() / 1000);
        
        // How long to show a coin on the left side
        var timeOut = lastVisible-localStorage.newCoinTimeout;
    
        // Load the new coins the script already knows about
        if (newCoins.length > 0) {
        
            $.each(newCoins, function(key, value) {
                
                // Get the current image location for coin
                var coinImage = $("tr td a:contains('"+newCoins[key]["name"]+"')").prev().attr("src")
                
                // Only show them if they were added to the newCoins list earlier than the timeOut AND they are currently on the page
                if (newCoins[key]["lastVisible"] > timeOut && $("tr td a:contains('"+newCoins[key]["name"]+"')").length > 0) {
                    $("#newCoins").append('<p><img class="currency-logo" src="'+coinImage+'"><span class="newCoinName">'+newCoins[key]["name"]+'</span>&nbsp;&nbsp;</p>').show()
                }
                
            });
            
        }
        
        // Load the missing coins the script already knows about
        if (missingCoins.length > 0) {
        
            $.each(missingCoins, function(key, value) {
            
                // Only show them if they were added to the missingCOins list earlier than the timeOut AND they aren't currently on the page.
                if (missingCoins[key]["lastVisible"] > timeOut && $("tr td a:contains('"+missingCoins[key]["name"]+"')").length == 0) {
                    $("#missingCoins").append('<p><img class="currency-logo" src="img/'+missingCoins[key]["name"].replace(" ", "-")+'.png"><span class="missingCoinName">'+missingCoins[key]["name"]+'</span>&nbsp;&nbsp;</p>').show()
                }
                
            });
            
        }

        /* Search through all the current coins and remove them from the lastCoins array as we go along
        Anything left over in the array is a coin that was removed
        Anything that returns a -1 from indexOf() is a new coin */
        $.each( currentCoins, function( key, value ) {
    
            // Find out where in the lastCoins array the current coin is
            var index = lastCoins.indexOf(value)
             
            if (index > -1) { // Check if the coin was on the list  
                 
                lastCoins.splice(index, 1) // Remove it from the lastCoins array
                
            } else { // If it wasn't on the list then it's a new coin
             
                newCoins.push({"name": value, "lastVisible": lastVisible}) // Add it to the array
                
                // Put that coin's name at the bottom of the new coins list 
                $("#newCoins").append('<p><img class="currency-logo" src="img/'+value.replace(" ", "-")+'.png"><span class="newCoinName">'+value+'</span>&nbsp;&nbsp;</p>').show()
                
                if (newCoins.length >= localStorage.newCoinAmount) { // If there are more newCoins than the allowed amount
                
                    var extraCoins = newCoins.length - localStorage.newCoinAmount // Detect how many should be removed
                    
                    newCoins.splice(0, extraCoins) // Remove them from the array
                    
                    $(".newCoinName:lt('"+extraCoins+"')").parent().remove() // Remove them from thepage
                }
            }
            
        });
        
        // The remaining coins in lastCoins are ones that are no longer on the page. These are the missing coins!
        $.each( lastCoins, function( key, value ) {
            
            missingCoins.push({"name": value, "lastVisible": lastVisible}) // Add it to the array
                
                // Put that coin's name at the bottom of the new coins list 
                $("#missingCoins").append('<p><img class="currency-logo" src="img/'+value.replace(" ", "-")+'.png"><span class="missingCoinName">'+value+'</span>&nbsp;&nbsp;</p>').show()
                
                if (missingCoins.length >= localStorage.newCoinAmount) { // If there are more missingCoins than the allowed amount
                
                    var extraCoins = missingCoins.length - localStorage.newCoinAmount // Detect how many should be removed
                    
                    missingCoins.splice(0, extraCoins) // Remove them from the array
                    
                    $(".missingCoinName:lt('"+extraCoins+"')").parent().remove() // Remove them from thepage
                }
        });

        // Save the lastCoins, newCoins, and missingCoins
        localStorage.lastCoins = JSON.stringify(currentCoins)
        localStorage.newCoins = JSON.stringify(newCoins)
        localStorage.missingCoins = JSON.stringify(missingCoins)
    
    },
    
    tweaks: function() {
    
        // Rearrange things for more space
        $("div.col-xs-12 h1:first, hr:first").remove() // Remove header and line
        $("#currencies_wrapper").css({"margin-top": -14}) // Move whitespace at top
        
        // Remove ads
        $("#leaderboard-listings").parent().parent().remove();
        $("#leaderboard,#leaderboard-bottom").remove()
        
        // Add small "Chart" links to every row for when charts are hidden
        $("th:last").after("<th id='chartLinkHead' style='display: none'></th>")
        $('td a div').each(function(index, value) {
            var thisDiv = $(this).parent().attr("href");
            $(this).parent().parent().after("<td class='chartLink' style='display: none' data-url='"+thisDiv+"'><a>Chart</a></td>")
        });
        
        // Move the price options box to the left panel
        $("#price-options").removeClass("pull-right").appendTo("#newPriceOptions");
        
        
        // Set the popup text for when hovering over table headers
        $("thead th").each(function(i, v) {
            $(this).attr("title", "Click to sort by "+$(this).text()) 
        });
        
        // Move twitter link
        $(".twitter-follow-button").remove()
        
        // Move Markets/Currencies link
        var marketsCurrencies = $("a:contains('Currencies')").parent()
        $(marketsCurrencies).removeClass("pull-right").clone(true).appendTo("#sideboxOptions")
        $(marketsCurrencies).remove()
        
        // Add script info to footer
        $("#discussion").append('<div class="col-md-12">Twitter: <a href="https://twitter.com/CoinMKTCap" target="_blank">@CoinMKTCap</a></div>').after('<hr />'
        +'<div id="scriptInfo" class="row">'
            +'<div class="col-md-12">CoinMarketCap Improvements <a href="https://userscripts.org/scripts/show/186039" target="_blank" title="Home Page / Update info">'+ GM_info.script.version+'</a></div>'
            +'<div class="col-md-12 smallText">This script is in no way related to the official development of CoinMarketCap.com, but  every donation helps-</div>'
            +'<div class="col-md-4 smallText">BTC: 1KQZTHuusuJxxSumi7UHJyAg7h3DvmxtR6</div>'
            +'<div class="col-md-4 smallText text-center">LTC: LLq4H9YP84koPEmkYwVu5LtorUzkWcCP55</div><br />'
        +'</div>')
        
        // Add area to disable this script
        $("#scriptInfo").after('<hr />'
            +'<div id="disableArea" class="row">'
                +'<div id="disableText" class="col-md-12"><a id="disableTextButton" class="disableTextButton">Is this script suddenly not working?</a></div>'
                +'<div id="disableText2" class="col-md-12" style="display: none"><p>The developer of coinmarketcap.com may eventually make changes to this website that cause CoinMarketCap Improvements to act strange. I will do my best to fix these issues as soon as possible. For now, you can choose to disable this script, and have it automatically enable itself again when an update occurs.</p>'
                    +'<button id="disableToggle" class="btn diableToggle isClicked">Disable CoinMarketCap Improvements</button> <button class="btn disableTextButton buttonBlue">Cancel</button>'
                +'</div>'
            +'</div>')
            
        // Make price links open in new tab
        $('td.numeric a, a.price').attr('target', '_blank')
        
        // Hide hidden coins and text above table
        $("tr.isHidden,.subheader:first").hide()
        
        // Change donation section slightly
        $("#donate").after("<hr />")
        $("#donate div:first").text("Donate to coinmarketcap.com")
        
        // Prevent alert boxes. Sometimes CMK spits them out even though the charts load
        window.alert = function(msg) { }; 
        
        // See if they need to view the tutorial
        if (localStorage.tutorial == undefined)
            $("body").append("<div id='tutorialScreen'><div id='tutorialText'><h1 class='text-left'><strong>&larr;</strong> Filters are on the left edge of the screen.</h1><br /><h1 class='text-right'>Options are on the right edge of the screen. <strong>&rarr;</strong></h1><br /><h2>Move your mouse to the edges of your screen to reveal the menus.</h2><p class='text-center'><button id='tutorialDone' class='btn btn-primary btn-lg'>Okay</button></div></div>")
        
        // Notify Chrome users that the charts feature is disabled
        window.isChromium = /chrome/.test( navigator.userAgent.toLowerCase() );
        
        if(localStorage.chromeNotice == 0 && window.isChromium == true){
    
            $("body").append("<div id='chromeNotice'><p>Chrome users: The inline chart loading feature will not function properly in Chrome due to what I think is a technical restriction with Userscripts. For this reason, it has been disabled. Hopefully a workaround will be found in the future.</p><p><button id='chromeDone' class='btn'>Okay</button></p></div>")
            $("body").on("click", "#chromeDone", function() { 
                $("#chromeNotice").fadeOut("slow")
                localStorage.chromeNotice = 1
            });
                
        }
        
        
    
    }


}

edit = {

    start: function() {
    
        $("#pageHeader").remove() // remove old headers
    
        // Figure out which mode to be in. hide and fav are the only current ones
        if (localStorage.editMode == "hide")
            this.setupHide()
        else
            this.setupFav()
        
        // List mode
        $("td a div").parent().parent().hide() // Small list mode
        $("th").eq(7).hide()
        $("td.chartLink,#chartLinkHead,tr").show()

        
        // Scroll to the top.. For now?
        $("html, body").animate({ scrollTop: 0 }, "slow");
    
        // Figure out which coins are favorited or hidden
        this.identify(localStorage.editMode)
    
    },
    
    end: function() {
    

        $("#hide-option").text("Hide Coins").removeClass("isClicked")
        $("#fav-option").text("Edit Favorites").removeClass("isClicked")
        
        $("tr.isHidden").hide()
        $("tr.rowSelect").removeClass("rowSelect")
        
        $("#pageHeader").remove()
        
        // Bring back the charts if they were in that mode
        if ($("#chart-show").hasClass("active")) {
            $("td:hidden").show()
            $("th").eq(7).show()
            $("td.chartLink,#chartLinkHead").hide()
        }
        
        localStorage.editMode = 0;
        $("td.chartLink a").text("Chart")
        
        setup.rowColors()
    
    },
    
    setupHide: function() {
    
        $("td.chartLink a").text("Hide")
        $("#hide-option").text("Done Hiding").addClass("isClicked")
        $("div.col-md-12:first").prepend('<div id="pageHeader"><h1 style="text-align: left">Hide Coins</h1><p>Click on the coins you don\'t want to see anymore.. Selected coins will be highlighted</p><p>Changes will be automatically saved, but press the Done Hiding button on the left side when you are finished.</p></div>')
        
    },
    
    setupFav: function() {
    
        $("td.chartLink a").text("Favorite")
        $("#fav-option").text("Save Favorites").addClass("isClicked")
        $("tr.isFavorite").addClass("rowSelect")
        $("div.col-md-12:first").prepend('<div id="pageHeader"><h1 style="text-align: left">Edit Favorites</h1><p>Click on the coins you would like to see on your favorites page. Selected coins will be highlighted</p><p>Changes will be automatically saved, but press the Save Favorites button on the left side when you are finished.</p></div>')
    
    },
    
    save: function() {
        
        var lookFor = (localStorage.editMode == "hide") ? "tr.isHidden" : "tr.isFavorite"
        
        var newSave = ""
        
        
        $(lookFor).each(function(index, value) { 
            
            var coin = $(this).find("a:eq(1)").text()
            newSave = newSave + coin+"|"
            
        });
        
        var saveFile = localStorage.editMode + 's'
        
        // For now i'm going to use a string that will be .split.....
        localStorage[saveFile] = newSave
        
    }, 
    
    identify: function(which) { // can be all, hide, or fav
        
        if (which == "hide") {
            // Split hides into an array
            var hides = localStorage.hides.split("|")
            $(hides).each(function(index, value) {
                var thisTr = $('tr:contains("'+value+'")')
                $(thisTr).addClass("isHidden")
                if (localStorage.editMode == "hide")
                    $(thisTr).find("td.chartLink a").text("Show")
            
            });
            
        } else if (which == "fav") {
            // Split favorites into an array
            var favorites = localStorage.favs.split("|")
            $(favorites).each(function(index, value) {
                var thisTr = $('tr:contains("'+value+'")')
                $(thisTr).addClass("isFavorite")
                if (localStorage.editMode == "fav")
                    $(thisTr).find("td.chartLink a:first").text("Unfavorite")
            
            });
            
        }
    
    }

}



// Add commas to numbers
function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}


$("document").ready(function() {

    // I'll make my own CSS
    $("head").append('<style>'
    +'body, .currency-name { font-size: '+localStorage.fontSize+'px; }'
    +'.nav { margin-bottom: 10px; }'
    +'.hover { background: #ffff99 !important; }'
    +'#long-term-graph { margin: 0 0 25px 0; }'
    +'.rowSelect { background: #fdff7e !important; background-color: #fdff7e !important; }'
    +'.container { width: '+localStorage.chartWidth+'%; }'
    +'.odd { background: '+localStorage.rowColor+';  }'
    +'th, #newCoins p, #missingCoins p { cursor: pointer; }'
    +'.isHidden { background: rgba(255,0,0,0.4) !important; }'
    +'.isClicked { background: orange !important; }'
    +'#chartLinkHead { width: 30px; }'
    +'#twitter { margin: 5px 0; }'
    +'#scriptInfo,#disableArea { margin-top: 10px; margin-bottom: 10px; }'
    +'.smallText { font-size: 0.9em; }'
    +'#donate,#discussion,#scriptInfo { font-size: 1.0em; }'
    +'.chartClicked { text-decoration: underline; }'
    +'#chromeNotice,#updated { z-index: 92; text-shadow: 1px 2px 4px #000000; font-size: 18px; color: #ffffff; padding: 15px; position: fixed; bottom: 45px; width: 80%; left: 10%; background: rgba(0,0,0,0.8); border-radius: 8px; }'
    +'#newCoins, #missingCoins { display: none; }'
    +'.textClicked, .hidenewCoin:hover, .hidemisCoin:hover { color: #0088CC; }'
    +'.buttonBlue { background: #0088CC; }'
    +'.nav-pills > li > a { padding-top: 2px; padding-bottom: 2px; }'
    +'#boxTop select { padding: 0; }'
    +'.table > thead > tr > th { border-bottom: none }'
    +'label { font-weight: normal; }'
    +'#fontSize, #refreshTime, select { padding: 1px 3px; height: 25px; }'
    +'#sideRight .col-md-6, #sideRight .col-md-12 { margin-bottom: 10px; margin-top: 10px; }'
    +'#sideRight { overflow-y: auto; max-width: 320px; height: 100%; border-left: #0088CC 5px solid; position: fixed; top: -10px; right: 0; z-index: 97; background: #ffffff; }'
    +'#sideLeft { overflow-y: auto; max-width: 200px; height: 100%; border-right: #0088CC 5px solid; position: fixed; top: -10px; left: 0; z-index: 97; background: #ffffff; }'
    +'#sideOptionsBtn { position: absolute; top: 10px; right: 10px; }'
    +'#sideFiltersBtn { position: absolute; top: 10px; left: 10px; }'
    +'#tutorialScreen { z-index: 96; position: fixed; top: 0; left: 0; height: 100%; width: 100%; background: rgba(0,0,0,0.8); }'
        +'#tutorialText { position: relative; top: 20%  ; width: 60%; left: 20%; padding: 15px; background: #ffffff; border-radius: 8px; }'
    +'</style>')
    

    $("body").append(
        //'<p style="margin-bottom: 5px"><strong>Coin Market Cap</strong></p>'
        '<div id="sideFiltersBtn"><button class="btn btn-mini odd">Filters</button></div>'
        //+'<div id="sideboxFilters">'
        +'<div id="sideLeft" class="container" style="display: none">'
           +'<h1>Filters</h1>'
            +'<p>Show</p>'
            +'<ul id="show-options" class="nav nav-pills text-right" style="cursor: pointer">'
                +'<li id="show-show" class="active"><a href="#" class="show-option">All</a></li>'
                +'<li id="show-hide"><a id="show-favorites" href="#favorites" class="show-option">Favorites</a></li><br /><br />'
                +'<li id="show-hide"><a id="show-up" href="#up" class="show-option">Up</a></li>'
                +'<li id="show-hide"><a id="show-down" href="#down" class="show-option">Down</a></li><br /><br />'
                +'<li id="show-hide"><a id="show-hidden" href="#hidden" class="show-option">Hidden</a></li><br />'
            +'</ul>'
            +'<p>Charts</p>'
            +'<ul id="chart-options" class="nav nav-pills" style="cursor: pointer">'
                +'<li id="chart-show" ><a class="chart-option">Show</a></li>'
                +'<li id="chart-hide"><a class="chart-option">Hide</a></li>'
            +'</ul>'
            +'<p>Currency</p>'
            +'<div id="newPriceOptions"></div>'
            //+'<p><button id="hideFilters" class="btn btn-mini filtersToggle">Hide Filters</button></p>'
        +'<div id="newCoins"><br /><strong title="These will be shown for 6 hours">New Coins</strong></div>'
        +'<div id="missingCoins"><br /><strong>Missing Coins</strong></div>'
    +'</div>') // ends #sideLeft
   
    
    $("body").append(
    '<div id="sideOptionsBtn"><button class="btn btn-mini odd">Options</button></div>'
    +'<div id="sideRight" style="display: none" class="container">'
       +'<div id="sideboxOptionsShow"><button class="btn btn-mini optionsToggle">Options</button></div>'
       +'<div id="sideboxOptions">'        
        +'<h1>Options</h1>'
       
        +'<div class="row">'
        
            +'<div class="col-sm-6 col-lg-6">'
                +'<p>Price Colors</p>'
        		+'<ul id="priceColor-options" class="nav nav-pills" style="cursor: pointer">'
                    +'<li id="priceColor-on"><a class="priceColor-option">On</a></li>'
                    +'<li id="priceColor-off"><a class="priceColor-option">Off</a></li>'
                +'</ul>'
            +'</div>'
            +'<div class="col-sm-6 col-lg-6">'
                +'<p>Switch Price & MC</p>'
        		+'<ul id="switchPrice-options" class="nav nav-pills" style="cursor: pointer">'
                    +'<li id="switchPrice-on"><a class="switchPrice-option">On</a></li>'
                    +'<li id="switchPrice-off"><a class="switchPrice-option">Off</a></li>'
                +'</ul>'
            +'</div>'
        +'</div>'
        +'<div class="row">'
            +'<div class="col-sm-6 col-lg-6">'
                +'<p>Hover Effect</p>'
    			+'<ul id="hover-options" class="nav nav-pills" style="cursor: pointer">'
                    +'<li id="hover-on"><a class="hover-option">On</a></li>'
                    +'<li id="hover-off"><a class="hover-option">Off</a></li>'
                +'</ul>'
            +'</div>'
            +'<div class="col-sm-6 col-lg-6">'
                +'<p>Show Unmineable</p>'
    			+'<ul id="unmineable-options" class="nav nav-pills" style="cursor: pointer">'
                    +'<li id="unmineable-on"><a class="unmineable-option">On</a></li>'
                    +'<li id="unmineable-off"><a class="unmineable-option">Off</a></li>'
                +'</ul>'
            +'</div>'
        +'</div>'
        +'<div class="row">'
            +'<div class="col-sm-6 col-lg-6">'
                +'<p>Show Ripple</p>'
    			+'<ul id="ripple-options" class="nav nav-pills" style="cursor: pointer">'
                    +'<li id="ripple-on"><a class="ripple-option">On</a></li>'
                    +'<li id="ripple-off"><a class="ripple-option">Off</a></li>'
                +'</ul>'
            +'</div>'
            +'<div class="col-sm-6 col-lg-6">'
                +'<p>Show $ and %</p>'
        		+'<ul id="symbol-options" class="nav nav-pills" style="cursor: pointer">'
                    +'<li id="symbol-on"><a class="symbol-option">On</a></li>'
                    +'<li id="symbol-off"><a class="symbol-option">Off</a></li>'
                +'</ul>'
            +'</div>'
        +'</div>'
        +'<div class="row">'
            
            +'<div class="col-sm-6 col-lg-6">'
                
                +'<form class="form-inline" role="form">'
                
                +'<div class="form-group">'
                
                +'<label for="fontSize">Font Size</label><br />'
                
                +'<input id="fontSize" type="number" value="'+localStorage.fontSize+'" class="form-control" style="width: 80px" min="8" max="32"> px'
                +'</div>'
                
                +'</form>'
            +'</div>'
            +'<div class="col-sm-6 col-lg-6">'
                +'<form class="form-inline" role="form">'
                +'<div class="form-group">'
                +'<label for="refreshTime">Refresh Every</label><br />'
                +'<input id="refreshTime" type="number" value="'+localStorage.refreshTime+'" class="form-control" style="width: 80px" min="1"> <span id="refreshMin">min</span>'
    
                +'</div>'
                +'</form>'
            +'</div>'
       +'</div>'
       +'<div class="row">'
           +'<div class="col-sm-6 col-lg-6">'
                +'<p>Table Width</p>'
                +'<p style="margin-bottom: 5px">'
                    +'<select id="chartWidth">'
                        +'<option value="60">60</option>'
                        +'<option value="65">65</option>'
                        +'<option value="70">70</option>'
                        +'<option value="75">75</option>'
                        +'<option value="80">80</option>'
                        +'<option value="85">85</option>'
                        +'<option value="90">90</option>'
                    +'</select> percent'
                +'</p>'
            +'</div>'
            +'<div class="col-sm-6 col-lg-6">'
                +'<p>Row Color</p>'
                +'<p>'
                +'<select id="rowColor" style="width: 100px">'
        			+'<option value="rgba(0,0,255,0.2)">Blue</option>'
        			+'<option value="rgba(255, 215,0, 0.3)">Gold</option>'
        			+'<option value="rgba(128, 128, 128, 0.05)">Grey</option>'
        			+'<option value="rgba(255,164,0,0.25)">Orange</option>'
        			+'<option value="rgba(255, 192, 203, 0.3)">Pink</option>'
        			+'<option value="rgba(128, 0, 128, 0.15)">Purple</option>'
        			+'<option value="rgba(192, 192, 192, 0.3)">Silver</option>'
        			+'<option value="white">White</option>'
        		+'</select></p>'
        	+'</div>'
        +'</div>'
        +'<div class="row">'
        	+'<div class="col-sm-6 col-lg-6">'
        		+'<ul id="fav-options" class="nav nav-pills" style="cursor: pointer">'
                    +'<li id="fav-toggle" class="active"><a id="fav-option">Edit Favorites</a></li>'
                +'</ul>'
            +'</div>'
            +'<div class="col-sm-6 col-lg-6">'
                +'<ul id="hide-options" class="nav nav-pills" style="cursor: pointer">'
                    +'<li id="hide-toggle" class="active"><a id="hide-option">Hide Coins</a></li>'
                +'</ul>'
            +'</div>'
            
        		//+'<p><button class="btn btn-mini optionsToggle">Hide Options</button></p>' 
            +'</div>'  // ends #sideboxOptions
        +'</div>' // ends row
    +'</div>' // ends #sideRight
    );

    // Load basically all the option functions to get the page set up how user wants it
    setup.start()

});

////////////////////
//     EVENTS     //
////////////////////



// Take the chart off the page for a second when table is being sorted
$(document).on("mousedown", "th", function(e) {
    setTimeout(setup.rowColors, 100)
    if ($("#chartParent").length == 0) return false
    var beforeParent = $("#chartParent").prev().addClass("chartAdd")
    window.chartParent = $("#chartParent").detach()
    setTimeout(chartBack, 500)

});
function chartBack() {
    $("tr.chartAdd").after(window.chartParent).removeClass(".chartAdd")
}



// Check if user hovered over the Options button
$(document).on({
    mouseenter: function () {
        mouseMoveHandler(1) // Force option menu
    }
}, "#sideOptionsBtn");

// Check if user hovered over the Filters button
$(document).on({
    mouseenter: function () {
        mouseMoveHandler(2) // Force filter menu
    }
}, "#sideFiltersBtn");

// Detect mouse movement to check if user wants a side menu
$(window).on('mousemove', mouseMoveHandler);

// Show side menus
var menuTimeout;
function mouseMoveHandler(e) {

    var rightPos = $("body").width() - e.pageX
    if (rightPos < 35 || $("#sideRight:hover").length > 0 || e == 1) {
        clearTimeout(menuTimeout);
        menuTimeout = null;
        $("#sideRight").fadeIn()
    } else if (e.pageX < 35 || $("#sideLeft:hover").length > 0 || e == 2) {
        clearTimeout(menuTimeout);
        menuTimeout = null;
        $("#sideLeft").fadeIn()
    } else if (!menuTimeout) {
        menuTimeout = setTimeout(hideMenu, 150);
    }
}

function hideMenu() {
    $("#sideRight,#sideLeft").fadeOut()
}



// When a chart is clicked load it below the current row
$("body").on("click", "td a div, #long-term-graph-timespans a", function(e) {

    if ($(this).attr("href") != undefined) {
        // Get URL to load
        var getHref = $(this).attr("href")
        // Find the coin name
        var coinName = $(this).parent().parent().parent().prev().find("td a div").attr("id")
        // Find the parent table row
        var theParent = $(this).parent().parent().parent().prev()
        $("#chartParent").remove()

    } else {
        var getHref = $(this).closest("a").attr("href")
        var coinName = $(this).attr("id")
        var theParent = $(this).closest("tr")
        // Remove currently open chart
        if ($("#chartParent:visible").length > 0) {
            if ($("#chart"+coinName).length == 1) {
                $("#chartParent").remove()
               return false
            } else {
                $("#chartParent").remove()
            }
            
        }
    }
    if ($("#chartLoad").length > 0) return false // prevent doubleclick
    

    // Remove the hover class to make sure chart gets proper background color
    $(theParent).removeClass("hover")
    
    // Find out which color the row is
    var rowBg = theParent.css("background-color")
    
    // Make an area to put the chart
    $(theParent).after("<tr id='chartLoad' style='background: "+rowBg+"'><td colspan='8' style='text-align: center'>Loading chart...</td></tr>"
        +"<tr id='chartParent' style='display: none; background: "+rowBg+"'><td id='chart"+coinName+"' colspan='8'></td></tr>")
    
    // Place the data and remove the junk
    $.get( getHref, function( data ) {
        data = data.split("</h2>")[1] // Split data at the end of h2 to remove all the redundant info
        $("#chartParent td").html(data)
        $("#chartParent td").find("#donate, p:contains('BTC'), hr, #discussion").remove()
        $("#chartParent,#chart"+coinName).fadeIn("slow")
        $("#chartLoad").remove()
        // Scroll to chart
        $('html, body').animate({scrollTop: theParent.offset().top - 100}, 500)
        $('a[href="'+getHref+'"]').addClass("chartClicked")
        $(".textClicked").removeClass("textClicked")
    });

    e.preventDefault()

    
});

// Disable chrome loading charts   
if (window.isChromium == true) {
    $("body").off("click", "td a div, #long-term-graph-timespans a")
    $("tr td a").attr("target", "_blank")
}


// If the small "Chart" links are clicked run the event above
$("body").on("click", "td.chartLink", function(e) {
    
    var linkClicked = $(this).attr("data-url")
    var linkText = $(this).find("a").text()
    
    if (linkText == "Chart") {
            $('a[href="'+linkClicked+'"]').parent().find("div").trigger('click');
    } else if (linkText == "Hide" || linkText == "Show") {
        $(this).parent().toggleClass("isHidden")
        var newText = (linkText == "Hide") ? "Show" : "Hide"
        $(this).find("a").text(newText)
        edit.save()
    } else if (linkText == "Favorite" || linkText == "Unfavorite") {
        $(this).parent().toggleClass("isFavorite rowSelect")
        var newText = (linkText == "Favorite") ? "Unfavorite" : "Favorite"
        $(this).find("a").text(newText)
        edit.save()
    
    }
    


});


// Hover over a newCoin or missingCoin to see an X to hide it
$("body").on({

    mouseenter: function () {
        $(this).append('<span class="hide'+$(this).parent().attr("id").substr(0, 3)+'Coin" title="Hide from this list">X</span>')
    },
    mouseleave: function () {
        $(this).find(".hide"+$(this).parent().attr("id").substr(0, 3)+"Coin").remove()
    }
}, "#newCoins p, #missingCoins p");



// Click the X to remove coin from newCoins or missingCoins list
$("body").on("click", ".hidenewCoin,.hidemisCoin", function() {

    var x = ($(this).hasClass("hidenewCoin")) ? "newCoins" : "missingCoins"

    var thisCoin = $(this).prev().text()
    
    var coins = JSON.parse(localStorage[x])
    
    $(coins).each(function(index, value) {
    
        if (coins[index]["name"] == thisCoin)  {
            coins[index]["lastVisible"] = 0
        }
    
    });
    
    localStorage[x] = JSON.stringify(coins)
    $(this).parent().fadeOut()

});


// Options toggle
$('body').on('click', '.optionsToggle', function(e) {
    if ($("#sideboxOptions").is(":visible")) {
        localStorage.options = 0; 
        $("#sideboxOptions").slideUp()
        $("#sideboxOptionsShow").show()
        
    } else {
        localStorage.options = 1;
        $("#sideboxOptions").slideDown()
        $("#sideboxOptionsShow").hide()
    }

});

// Filters toggle
$('body').on('click', '.filtersToggle', function(e) {
    if ($("#sideboxFilters").is(":visible")) {
        localStorage.filters = 0; 
        $("#sideboxFilters").slideUp()
        $("#sideboxFiltersShow").show()
        $("#hideFilters").hide()
    
    } else {
        localStorage.filters = 1;
        $("#sideboxFilters").slideDown()
        $("#sideboxFiltersShow").hide()
        $("#hideFilters").show()
    }

});


// The entire tr should toggle the chart.. IF a url wasn't clicked in it
$('body').on('click', 'tr', function(e) {
    if (localStorage.editMode != 0) return false; // don't let this happen on edit mode
    var tag = e.target.nodeName;
    if(tag != 'A') $(this).find("a div").trigger("click")
    
});

// Disable chrome loading charts   
if (window.isChromium == true) {
    $("body").off("click", "tr")
}


// Hide/show charts button
$('body').on('click', 'a.chart-option', function() {
    
    if ($(this).parent().hasClass("active")) return false;
    
    // Reverse whatever the current chartState is and run setup() again 
    localStorage.chartState = ($(this).text() == "Show") ? 1 : 0;
    setup.charts()
    
});

// Hover effect option
$("body").on('click', 'a.hover-option', function() {
    
    if ($(this).parent().hasClass("active")) return false;
    
    $("a.hover-option").parent().removeClass("active")
    
    // Reverse whatever the current chartState is and run setup() again 
    localStorage.hover = ($(this).text() == "On") ? 1 : 0;

    $(this).parent().addClass("active")
    
    setup.hover()
    
});

// Click a new coin name to view the chart
$("body").on("click", "span.newCoinName", function() {

    $(this).addClass("textClicked")

    var coinName = $(this).text()
    
    var coinLoc = $('td a:contains("'+coinName+'")')

    
    $(coinLoc).parent().parent().find(".chartLink").trigger("click")
});

// Show/hide Ripple
$("body").on('click', 'a.ripple-option', function() {
    
    if ($(this).parent().hasClass("active")) return false;
    
    $("a.ripple-option").parent().removeClass("active")
    
    localStorage.ripple = ($(this).text() == "On") ? 1 : 0;
    
    // Only function if the user is showing unmineable coins...
    if (localStorage.unmineable == 1) setup.checkRipple()
    
    $(this).parent().addClass("active")
    
});

// Show/hide Unmineable
$("body").on('click', 'a.unmineable-option', function() {
    
    if ($(this).parent().hasClass("active")) return false;
    
    $("a.unmineable-option").parent().removeClass("active")
    
    localStorage.unmineable = ($(this).text() == "On") ? 1 : 0;
    
    setup.unmineable()
    
    $(this).parent().addClass("active")
    
});


// Price color option
$("body").on('click', 'a.priceColor-option', function() {

    if ($(this).parent().hasClass("active")) return false;
    
    // Reverse whatever the current chartState is and run setup() again 
    localStorage.priceColor = ($(this).text() == "On") ? 1 : 0;
    setup.color()
    
});


/*
// Keep options open option (COMING SOON)
$("body").on('click', 'a.options-option', function() {

    if ($(this).parent().hasClass("active")) return false;
    
    // debug/test stuff
    // Reverse whatever the current chartState is and run setup() again 
    //localStorage.priceColor = ($(this).text() == "On") ? 1 : 0;
    //setup.color()
    //$(".col-lg-6").removeClass("col-lg-6").addClass("col-lg-12")
    //$("#topBox").css({"min-width" : "100%", "height" : "auto", "top" : 0, "left" : 0})
    //$("#topBox .col-lg-").removeClass("col-md-12").addClass("col-md-2")
    
});
*/



// Currency change option
$("body").on('click', 'a.price-option', function() {

    localStorage.priceOption = ($(this).text() == "USD") ? 1 : 0;
    setup.checkRipple() // Check Ripple settings for the Total Market Cap number
    
});


// Switch price and market cap option
$("body").on('click', 'a.switchPrice-option', function() {
    
    if ($(this).parent().hasClass("active")) return false;
    
    // Reverse whatever the current chartState is and run setup() again 
    localStorage.switchPrice = ($(this).text() == "On") ? 1 : 0;
    setup.switchPrice()
    
});

$("body").on("click", ".disableTextButton", function() {

    $("#disableText,#disableText2").slideToggle("slow")
    $("html, body").animate({ scrollTop: 9999 }, "slow");
    
});

// Show/sort by All or Favorites
$("body").on('click', 'a.show-option', function() {
    
    if ($('#fav-option').text() == "Save Favorites") $('#fav-option').trigger("click") // Make sure favorites were saved
    if ($('#hide-option').text() == "Done Hiding") $('#hide-option').trigger("click") // Make sure hides were saved
    
    if ($(this).parent().hasClass("active")) return false;
    
    $("a.show-option").parent().removeClass("active")
    
    var choice = $(this).text()
    
    localStorage.showFavs = (choice == "Favorites") ? 1 : 0;
    
    if (localStorage.showFavs == 1) {
        
        edit.identify("fav") // Mark which coins are favorites
        $('tr:hidden').show()
        $('tbody tr:not(".isFavorite")').hide()
        $(".col-md-12:first").prepend("<h1 id='pageHeader' style='text-align: left'>Favorites</h1>")
        
        if ($("tr.isFavorite").length == 0) {
            $("#pageHeader").after("<p id='favError'>You don't have any favorites! Click the Edit Favorites link on the right side of the page.</p>")
        }
        $("#total_market_cap,#donate,#discussion,tr.isHidden").hide()
        

        $("html, body").animate({ scrollTop: 0 }, "slow");

    } else {
    
        if (choice == "All") {
            $('tr:not(".isFavorite"),#total_market_cap,#donate,#discussion').show()
            $(".negative_change").parent().show()
            $(".positive_change").parent().show()
            $("#pageHeader,#favError").remove()
            $("tr.isHidden").hide()
        } else if (choice == "Up") {
            $("td:not('negative_change')").parent().show()
            $("td.negative_change").parent().hide()
            $("#pageHeader,#favError").remove()
            $("tr.isHidden").hide()
        } else if (choice == "Down") {
            $("td:not('negative_change')").parent().hide()
            $("td.negative_change").parent().show()
            $("#pageHeader,#favError").remove()
            $("tr.isHidden").hide()
        } else if (choice == "Hidden") {
            $("#pageHeader,#favError").remove()
            $(".col-md-12:first").prepend("<h1 id='pageHeader' style='text-align: left'>Hidden Coins</h1>")
            if ($("tr.isHidden").length == 0) {
                $("#pageHeader").after("<p id='favError'>You don't have any hidden coins! Click the Hide Coins link on the right side of the page.</p>")
            }
            $('tbody tr:not(".isHidden"),#total_market_cap,#donate,#discussion').hide()
            $("tr.isHidden").show()
        }

    }
    
    $(this).parent().addClass("active")
    
    setup.rowColors()
});

// Show symbol option
$("body").on('click', 'a.symbol-option', function(e) {
    
    if ($(this).parent().hasClass("active")) return false;
    
    // Reverse whatever the current chartState is and run setup() again 
    localStorage.showSymbols = ($(this).text() == "On") ? 1 : 0;

    setup.symbols()
     
});


// Refresh time option
$("body").on('change keyup', '#refreshTime', function() {
    
    var x = $(this).val()
    
    // Check to make sure it was a number
    if ($.isNumeric(x) && x >= 1) {
        // All is well. Store the value.
        localStorage.refreshTime = x;
        setup.setTimer(x)
    }
    
});


// Font size
$("body").on('change keyup', '#fontSize', function() {
    var x = $(this).val()
    // Check to make sure it was a number
    if ($.isNumeric(x) && x > 7 && x < 32) {
        // All is well. Store the value.
        localStorage.fontSize = $(this).val();
        $("body").css("font-size", localStorage.fontSize+"px")
    }
    
});


// Chart width
$("body").on('change keyup', '#chartWidth', function() {
    var x = $(this).val()
    // Check to make sure it was a number
    if ($.isNumeric(x) && x >= 60 && x <= 90) {
        // All is well. Store the value.
        localStorage.chartWidth = $(this).val();
        $(".container").css("width", localStorage.chartWidth+"%")
    }
    
});

// Change color  
$('body').on('change keyup', '#rowColor', function() {

    localStorage.rowColor = $(this).val()
    $("head").append("<style>.odd { background: "+localStorage.rowColor+"; } </style>")
    //$("#sideLeft, #sideRight").css("border-color", localStorage.rowColor) // don't color the border for now
    setup.color()

});

$("body").on("click", "#tutorialDone", function() {
    
    $("#tutorialScreen").fadeOut()
    localStorage.tutorial = 1
    
});


// Edit Mode. Favorites and Hides
$("body").on('click', '#hide-option,#fav-option', function() {
    
    var isMode = ($(this).attr("id") == "hide-option") ? "hide" : "fav";
    
    var isBlue = ($(this).hasClass("isClicked")) ? 0 : 1;
    
    if ($(".isClicked").is(":visible")) edit.end()
    
    localStorage.editMode = isMode
    
    if (isBlue == 1) edit.start()
    
    
});


