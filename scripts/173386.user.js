// ==UserScript==
// @name            NordInvasion+
// @namespace       http://nordinvasion.com
// @author          Kip
// @version         1.4.3
// @date            12.26.2013
// @description     Adds various functions to the NI website.
// @include         http://nordinvasion.com/*
// @include         http://www.nordinvasion.com/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require         https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js
// @grant           GM_addStyle
// ==/UserScript==

// Code that has to run after the page finishes loading.
$(document).ready(function(){
    
    pageUrl = window.location.href;

    // If any logged on page is loaded...
    if ($("#playerListForm").length) {
        // Add empty element for options.
        $("body").append('<div id="nipOptions" style="display:none;text-align:center;"></div>');
        // Add empty element for servers.
        $("body").append('<div id="nipServerList" style="display:none;text-align:center;"></div>');
        // Add Inventory to the Character menu
        $("ul.nav li:first").append('<ul class="sub" style="display: none;"><li><a href="http://www.nordinvasion.com/marketplace.php?b=0&mode=inventory" style="color: rgb(64, 122, 199); background: rgb(227, 227, 227);">Inventory</a></li></ul>');
        // Add the NI+ server list button to the navigation bar.
        $("ul.nav div").before('<li id="nipServers" style="float:right;border:0;"><a href="http://www.nordinvasion.com/servers" target="_blank" style="color: rgb(64, 122, 199); cursor: pointer; background: rgb(227, 227, 227);">Servers</a></li>');
        // Add the NI+ menu to the navigation bar.
        $("ul.nav div").before('<li id="nipMenu" style="float:right;border:0;"><a style="color: rgb(64, 122, 199); cursor: pointer; background: rgb(227, 227, 227);">NI+</a><ul class="sub" style="display: none;">' + nip_generateCustomLinksList("menu") + '</ul></li>');
        // Wait for a click event
        $("#nipMenu > a").click(function(){
            nip_displayOptions();
        });
        // Filter the #playerListForm
        $("#playerListText option").each(function(){
            var characterHideList = localStorage.characterHideList;
            var characterId = $(this).val();
            if (characterHideList && characterHideList.indexOf(characterId) >= 0) $(this).attr("style","display:none;");
        });
        
    }
    
    // If the main page is loaded...
    if (pageUrl.match(/http:\/\/(www\.|)nordinvasion\.com\/character\.php/)) {
        // Check if the assist list exists (user might not be logged in)
        if ($(".assist_list").length) {
            nip_assistXpAssistent();
            nip_characterXpCalculators();
        }
    }

    // If Crafting is loaded...
    if (pageUrl.match(/http:\/\/(www\.|)nordinvasion\.com\/(house_|)crafting\.php/)) {
        nip_craftingRecipeFilter();
        if (pageUrl.match(/http:\/\/(www\.|)nordinvasion\.com\/(house_|)crafting\.php$/)) {
            nip_craftingXpCalculator();
        }
    }

    // If Marketplace / Sell is loaded...
    if (pageUrl.match(/http:\/\/(www\.|)nordinvasion\.com\/marketplace\.php\?b=0\&mode=inventory/)) {
        nip_marketSellToInventory();
    }
    // If Auction Hall is loaded...
    if (pageUrl.match(/http:\/\/(www\.|)nordinvasion\.com\/auction_hall\.php/)) {
        nip_auctionHallItemCost();
    }

    // If Manage Players is loaded...
    if (pageUrl.match(/http:\/\/(www\.|)nordinvasion\.com\/house\.php\?hp=manage_members/)) {
        nip_houseMembersIds();
    }
});

// Main page - Assist XP spending assistent
function nip_assistXpAssistent() {
    // Set click event for an assist XP label
    $(".assist_list .label").click(function() {
        // Check for an input sibling (verify it is an xp type clicked on)
        if ($(this).siblings("input").length) {
            // Get the total assist available
            var assistAvailable = Number($(".assist_list li:first").text().match(/([0-9]*) xp/)[1]);
            // Get the assist purpose
            var assistPurpose = $(this).text().match(/(Ranged|Melee|Mounted|Gold)/)[1];
            // Set the conversion factor
            if (assistPurpose === "Ranged")       var conversionFactor = 5;
            else if (assistPurpose === "Melee")   var conversionFactor = 2;
            else if (assistPurpose === "Mounted") var conversionFactor = 10;
            else if (assistPurpose === "Gold")    var conversionFactor = 5;
            // Clear the other input boxes
            $(this).parents(".assist_list").find("input[type='text']").val(0);
            // Calculate and set the xp to spend
            $(this).siblings("input").val(assistAvailable - assistAvailable % conversionFactor);
        }
    });
}

// Main page - XP / class points till next level / class upgrade
function nip_characterXpCalculators() {
    // Get the Melee xp, Ranged xp, Total xp, and Class Points
    var meleeXp = $(".halfpane ul:nth-of-type(1) li:nth-of-type(3)").text().match(/([0-9]*) xp/)[1];
    var rangedXp = $(".halfpane ul:nth-of-type(1) li:nth-of-type(4)").text().match(/([0-9]*) xp/)[1];
    var totalXp = $(".halfpane ul:nth-of-type(1) li:nth-of-type(5)").text().match(/([0-9]*) \/ ([0-9]*) xp/);
    var classPts = $(".halfpane ul:nth-of-type(2) li:nth-of-type(3)").text().match(/[0-9]*$/);
    // Calculate the xp till next level
    var totalXpRequired = totalXp[2] - totalXp[1];
    // Insert the xp till next level
    if (totalXpRequired < 0) totalXpRequired = 0;
    $(".halfpane > ul:nth-of-type(1)").append("<li><span class=\"label\">XP to Level:</span>" + totalXpRequired + " xp</li>");
    // Loop through each upgrade option
    $(".progBxReqTbl").each(function(){
        // Get the xp, class point, and gold requirements for each upgrade option
        var classPtRequirement = $("tr:nth-of-type(1) td:nth-of-type(2)", this).text();
        var meleeXpRequirement = $("tr:nth-of-type(2) td:nth-of-type(2)", this).text();
        var rangedXpRequirement = $("tr:nth-of-type(3) td:nth-of-type(2)", this).text();
        var goldRequirement = $("tr:nth-of-type(4) td:nth-of-type(2)", this).text();
        // Calculate the xp, class points, and gold remaining till next upgrade
        var classPtsRemaining = classPtRequirement - classPts;
        var meleeXpRemaining = meleeXpRequirement - meleeXp;
        var rangedXpRemaining = rangedXpRequirement - rangedXp;
        //var goldRemaining = gold - goldRequirement;
        // If the remaing is negative, override with zero
        if (classPtsRemaining < 0) classPtsRemaining = 0;
        if (meleeXpRemaining < 0) meleeXpRemaining = 0;
        if (rangedXpRemaining < 0) rangedXpRemaining = 0;
        // Widen the upgrade option tables
        $(this).parent().css("width","220px");
        // Insert the xp, class points, and gold remaining till next upgrade
        $("tr:nth-of-type(1) td:nth-of-type(2)", this).text(classPtRequirement + " (" +  classPtsRemaining + ")");
        $("tr:nth-of-type(2) td:nth-of-type(2)", this).text(meleeXpRequirement + " (" + meleeXpRemaining + ")");
        $("tr:nth-of-type(3) td:nth-of-type(2)", this).text(rangedXpRequirement + " (" + rangedXpRemaining + ")");
    });
}

// Crafting - XP till level
function nip_craftingXpCalculator() {
    // Get the crafting xp
    var craftingXp = $(".rightContent > div:nth-of-type(2) > div > span:nth-of-type(4)").text().match(/\(([0-9]*) \/ ([0-9]*)\)/);
    // Calculate the xp required for next level
    var requiredXp = craftingXp[2] - craftingXp[1];
    // Insert the required xp on the page
    $(".rightContent > div:nth-of-type(2) > div:nth-of-type(1)").append("<br /><span class=\"label\">Required XP</span><span class=\"value\">" + requiredXp + "</span>");
}

// Crafting - Filter the recipes displayed
function nip_craftingRecipeFilter() {
    // Set classes for recipe filtering
    $(".leftMenu a").each(function(){
        var blueprintTitle = $(this).text();
        var classStr;
        // If profession header, do not add class
        if (blueprintTitle.match(/Blueprints/)) return;
        // Determin the appropriate class to each link
        if (blueprintTitle.match(/\(.*All|Inf|Sgt|Commando|Legion|Guard|Zwei.*\)/)) classStr = nip_appendList(classStr, "infantry", " ");
        if (blueprintTitle.match(/\(.*All|Archer|Long|Sniper|Warden|Sentinel|Ranger.*\)/)) classStr = nip_appendList(classStr, "archer", " ");
        if (blueprintTitle.match(/\(.*All|Cross|Man at Arms|Sharp|Marksman|Aventurier|Pavise.*\)/)) classStr = nip_appendList(classStr, "crossbowman", " ");
        if (blueprintTitle.match(/\(.*All|Militia|Skirm|Pike|Halb|Peltast|Marauder.*\)/)) classStr = nip_appendList(classStr, "skirmisher", " ");
        if (blueprintTitle.match(/\(.*Stable|Novice|Trained|Adept|Master|Rider.*\)/)) classStr = nip_appendList(classStr, "cavalry", " ");
        // If none of the above are true, it must be a mat or support item
        if (!classStr) classStr = "other";
        // Set the class
        $(this).attr("class",classStr);
    });
    // Add filter buttons
    $(".leftMenu").prepend("<input class=\"filter\" type=\"button\" name=\"archer\" value=\"Arch\"><input class=\"filter\" type=\"button\" name=\"infantry\" value=\"Inf\"><input class=\"filter\" type=\"button\" name=\"crossbowman\" value=\"Cross\"><input class=\"filter\" type=\"button\" name=\"skirmisher\" value=\"Skirm\"><br /><input class=\"filter\" type=\"button\" name=\"all\" value=\"All\"><input class=\"filter\" type=\"button\" name=\"cavalry\" value=\"Cav\"><input class=\"filter\" type=\"button\" name=\"other\" value=\"Other\">");
    // Set click event for the filter buttons
    $(".filter").click(function() {
        // Get the filter type
        var filterType = $(this).attr("name");
        // If the filter type is all, display all the blueprints and level sections
        if (filterType === "all") {
            $(".archer, .infantry, .crossbowman, .skirmisher, .cavalry, .other").css("display","inline");
            $(".leftMenu > ul > li").css("display","block");
        // If the filter is not all, display the appropriate blueprints and non-empty level sections
        } else {
            // Hide everything and then display the appropriate blueprints
            $(".archer,.infantry,.crossbowman,.skirmisher,.cavalry,.other").css("display","none");
            $("." + filterType).css("display","inline");
            // Search each level section for a visible blueprint
            $(".leftMenu > ul > li").each(function() {
                if ($(this).text().match(/Blueprints/)) return;
                if ($(this).html().match(/display: inline/)) $(this).css("display","block");
                else $(this).css("display","none");
            });
        }
    });
}

// Marketplace / Sell - Filter the items displayed
function nip_marketSellToInventory() {
    // Set the page title
    $("title").text("Nord Invasion | Inventory");
    // Remove sell fields
    $(".mkt_item .mkt_item_buy").remove();
    // Set classes for item filtering
    $(".mkt_item", ".rightContent").each(function(){
        if ($(this).text().match(/Used in crafting/)) {
            $(this).addClass("nip_material");
        } else {
            $(this).addClass("nip_gear");
            if ($(this).text().match(/Everyone|Archer|Longbowman|Sniper|Warden|Sentinal|Ranger/)) $(this).addClass("nip_archer");
            if ($(this).text().match(/Everyone|Infantry|Sergeant|Commando|Royal Guard|Zweihander|Legionnaire/)) $(this).addClass("nip_infantry");
            if ($(this).text().match(/Everyone|Crossbowman|Man at Arms|Sharpshooter|Chosen Marksman|Adventurier|Pavise Champion/)) $(this).addClass("nip_crossbowman");
            if ($(this).text().match(/Everyone|Militia|Skirmisher|Pikeman|Master Peltast|Halberdier|Marauder/)) $(this).addClass("nip_pikeman");
            if ($(this).text().match(/Apprentice|Engineer|Nurse|Medic|Surgoon/)) $(this).addClass("nip_support");
        }
        if ($(".shiny, .ultra", this).text()) $(this).addClass("nip_valuable");
        else if ($(".rare, .veryrare", this).text()) $(this).addClass("nip_rare");
        else if ($(".legendary, .ultralegendary, .unknown", this).text()) $(this).addClass("nip_legendary");
        else $(this).addClass("nip_normal");
    });
    // Add filter title
    $(".leftMenu").append('<p><strong>Inventory Filters</strong></p>');
    // Add filter type radios
    $(".leftMenu").append('<fieldset style="border:1px solid silver;margin:0px 18px 10px 0px;">\
        <legend>Item Type</legend>\
        <input class="filter" type="radio" name="type" value="everything">Everyting<br />\
        <input class="filter" type="radio" name="type" value="gear">Gear<br />\
        <input class="filter" type="radio" name="type" value="material">Materials\
    </fieldset>');
    // Add filter class radios
    $(".leftMenu").append('<fieldset style="border:1px solid silver;margin:0px 18px 10px 0px;">\
        <legend>Usable by</legend>\
        <input class="filter" type="radio" name="class" value="everything">Everything (not filtered)<br />\
        <input class="filter" type="radio" name="class" value="archer">Archer<br />\
        <input class="filter" type="radio" name="class" value="infantry">Infantry<br />\
        <input class="filter" type="radio" name="class" value="crossbowman">Crossbowman<br />\
        <input class="filter" type="radio" name="class" value="pikeman">Pikeman<br />\
        <input class="filter" type="radio" name="class" value="support">Support<br />\
        <input class="filter" type="radio" name="class" value="cavalry">Cavalry\
    </fieldset>');
    // Add filter color checkboxes
    $(".leftMenu").append('<fieldset style="border:1px solid silver;margin:0px 18px 10px 0px;">\
        <legend>Color</legend>\
        <input class="filter" type="checkbox" name="color" value="normal">Normal<br />\
        <input class="filter" type="checkbox" name="color" value="valuable">Green / Valuable<br />\
        <input class="filter" type="checkbox" name="color" value="rare">Rare<br />\
        <input class="filter" type="checkbox" name="color" value="legendary">Legendary\
    </fieldset>');
    $(".leftMenu > ul").remove();
    // Set the default selection
    if (localStorage.lastInventoryFilters) {
        var filters = JSON.parse(localStorage.lastInventoryFilters);
        $(".filter[name='type'][value='" + filters['type'] + "']", ".leftMenu").attr("checked","");
        $(".filter[name='class'][value='" + filters['class'] + "']", ".leftMenu").attr("checked","");
        for (color in filters['color']) $(".filter[name='color'][value='" + filters['color'][color] + "']", ".leftMenu").attr("checked","");
        nip_filterInventory(localStorage.lastInventoryFilters);
    } else {
        $(".filter[name='type'][value='everything']", ".leftMenu").attr("checked","");
        $(".filter[name='class'][value='everything']", ".leftMenu").attr("checked","");
        $(".filter[name='color']", ".leftMenu").attr("checked","");
        $(".filter[name='class']").attr("disabled","");
    }
    // Set filter trigger
    $(".filter").change(function() {
        // Get the filters
        var filterType = $(".filter[name='type']:checked", ".leftMenu").val();
        var filterClass = $(".filter[name='class']:checked", ".leftMenu").val();
        var filterColorArray = [];
        $(".filter[name='color']:checked", ".leftMenu").each(function(){ filterColorArray.push($(this).val()); });
        var filters = { 'type':filterType, 'class':filterClass, 'color':filterColorArray };
        // Store the current filters
        var filters = JSON.stringify(filters);
        localStorage.lastInventoryFilters = filters;
        nip_filterInventory(filters);
    });
}
    
// Filter the items on the inventory screen
function nip_filterInventory(filters) {
    filters = JSON.parse(filters);
    var filterType, filterClass, filterColor;
    
    // Convert the filters into classes
    if (filters['type'] === "everything") filterType = ".mkt_item";
    else filterType = '.nip_' + filters['type'];
        
    if (filters['type'] === "gear") {
        // Enable the class filters
        $(".filter[name='class']").removeAttr("disabled");
        if (filters['class'] === "everything") filterClass = ".mkt_item";
        else filterClass = '.nip_' + filters['class'];
    } else {
        // Disable the class filters
        $(".filter[name='class']").attr("disabled","");
        filterClass = ".mkt_item";
    }
    filterColor = '.nip_' + filters['color'].join(",.nip_");

    // Hide everything and then display the appropriate items
    $(".mkt_item", ".rightContent").css("display","none");
    $(filterType, ".rightContent").filter(filterClass).filter(filterColor).css("display","block");
    // Reset the float clearing
    $("div[style='clear:both;']", ".rightContent").remove();
    $(".mkt_item[style='display: block;']", ".rightContent").each(function(index) {
        // Insert a clear after every three displayed items
        if ((index+1)%3 === 0) $(this).after('<div class="clear" style="clear:both;"></div>');
    });
}

// Auction Hall - add a per-item cost
function nip_auctionHallItemCost() {
    // Loop through each of the auction hall entries
    $(".ah-item-row").each(function(){
        // Get the item's row text
        var row = $(this).text();
        // Get the quantity and total cost of the item
        var quantity = row.match(/([0-9]*) x/m)[1];
        var totalCost = row.match(/([0-9]*)  Purchase/m)[1];
        // Calculate the "each" cost
        var eachCost = Math.round(totalCost / quantity);
        // Select the last span in the row (cost & purchase)
        $(this).children("span:last")
            // Format the span (fixed width & align right)
            .css("width","200px").css("text-align","right")
            // Insert a new span for the "each" cost
            .after("<span style=\"display:block; float:right;\">(" + eachCost + " each)</span>"
        );
    });
}

// Auction Hall & Trading item "Add item" filter.
function nip_addItemFilter() {
    $("script[src=\"/js/auction.js\"]")
        .removeAttr("src")
        .html(nip_auctionJsReplacement());
}

// Manage Members - format the list and add member IDs
function nip_houseMembersIds() {
    // Loop through each <li> in the .list
    $(".list li").each(function(){
        // Determine each member's rank
        rank = $(this).text().match(/Leader|Captain|Sergeant|Soldier|Recruit/);
        // Check if an <a> exists; then extract the ID from the end of the url; else set the id as "NA" (not available)
        if ($("a", this).length)  var id = $("a", this).attr("href").match(/[0-9]*$/);
        else                      var id = "NA";
        // Replace the old <li> with the new contents
        $(this).html(
            $(this).html().replace(rank,"<span class=\"rank\" style=\"display: inline-block; width: 80px;\">" + rank + "</span> - <span class=\"id\" style=\"display: inline-block; width: 80px;\">" + id + "</span>")
        );
        // Widen the first colum (some character names are quite long and there is free space)
        $(".label", this).attr("style","width:250px;");
    });
}

// Generate a check list of characters
function nip_generateCharacterList() {
    var characterList = "";
    var characterHideList = localStorage.characterHideList;
    $("#playerListText option").each(function(){
        var characterId = $(this).val();
        var characterName = $(this).text();
        if (characterHideList && characterHideList.indexOf(characterId) >= 0) var checkedProp = " checked=\"True\"";
        else var checkedProp = "";
        characterList += "<input type=\"checkbox\" name=\"characters\" value=\"" + characterId + "\"" + checkedProp + ">" + characterName + "<br />";
    });
    return characterList;
}

// Read the list of links from local storage and output the html version [type === "options" or "menu"]
function nip_generateCustomLinksList(type) {
    // Read the list from storage.
    var customLinksArray = localStorage.customLinksArray;
    if (customLinksArray) {
        var customLinksArray = JSON.parse(customLinksArray);
        customLinksList = "";
        var link;
        for (x in customLinksArray) {
            if (type === "options") {
                // Inline JavaScript that hides and shows the default values
                var hideInputTitleCode = "if($(this).val() === $(this).attr('title')) $(this).val('').css('color','');";
                var showInputTitleCode = "if($(this).val() === '') $(this).val($(this).attr('title')).css('color','silver');";
                link = '\
                <input type="text" class="title" title="Title" value="' + customLinksArray[x].title + '" style="width:210px;margin-bottom:1px" onfocus="' + hideInputTitleCode + '" onblur="' + showInputTitleCode + '"></input>\
                <input type="text" class="url" title="URL" value="' + customLinksArray[x].url + '" style="width:210px;margin-bottom:10px" onfocus="' + hideInputTitleCode + '" onblur="' + showInputTitleCode + '"></input><br />';
            } else if (type === "menu") link = '<li><a href="' + customLinksArray[x].url + '" target="_blank" style="background: rgb(227, 227, 227);">' + customLinksArray[x].title + '</a></li>';
            customLinksList += link;
        }
    } else {
        customLinksList = "";
    }
    return customLinksList;
}

// Display the options dialog
function nip_displayOptions() {
    // If the jQuery UI style is not present, load it.
    if(!$('link[href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/redmond/jquery-ui.css"]').length)
        $('<link media="all" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/redmond/jquery-ui.css" rel="stylesheet"></link>').appendTo("head");
    // Pre-configure the options dialog.
    $("#nipOptions").dialog({
        autoOpen: false,
        height: 360,
        width: 600,
        modal: true,
        resizable: false,
        title: 'NordInvasion+ Options'
    });
    // If the options pane contents are already configured, skip the creation steps.
    if(!$("#nipOptions").html()) {
        // Create the two option panes.
        $("#nipOptions")
            .append('<div id="nipCharacterHiderOptions" class="ui-corner-all"></div>')
            .append('<div id="nipCustomLinksOptions" class="ui-corner-all"></div>');
        // Insert contents of the left Character Hider option pane
        $("#nipCharacterHiderOptions")
            .append('<p><strong>Character Hider</strong></p>')
            .append('<p>Check the boxes for the<br />characters you wish to hide.</p>')
            .append('<p style="text-align:left;margin:10px 45px">' + nip_generateCharacterList() + '<p>')
            .append('<a id="nipCharacterHiderSave" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" style="border:1px solid rgb(204, 204, 204);"><span class="ui-button-text">Save</span></a>')
            .css({
                "width":"255px",
                "float":"left",
                "margin":"2px",
                "border":"1px solid #ccc",
                "padding":"4px 4px 12px 4px",
                "margin-left":"10px"
            });
        // Insert contents of the right Custom Links option pane
        $("#nipCustomLinksOptions")
            .append('<p><strong>Custom Links</strong></p>')
            .append('<p>Add custom links to the NI+ menu.<br />To remove a link, clear its title.</p>')
            .append('<p id="nipCustomLinksFields" style="text-align:center;margin:10px">' + nip_generateCustomLinksList('options') + '</p>')
            .append('<a id="nipCustomLinksAdd" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" style="border:1px solid rgb(204, 204, 204);"><span class="ui-button-text">Add Link</span></a>')
            .append('<a id="nipCustomLinksSave" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" style="border:1px solid rgb(204, 204, 204);"><span class="ui-button-text">Save</span></a>')
            .css({
                "width":"255px",
                "float":"left",
                "margin":"2px",
                "border":"1px solid #ccc",
                "padding":"4px 4px 12px 4px",
                "margin-left":"10px"
            });
    }
    // Display the options dialog.
    $("#nipOptions")
        .dialog('open')
        .dialog('option', 'height', 360)
        .dialog('option', 'position', 'center');
    // Create click event for saving the Character Hider options.
    $("#nipCharacterHiderSave").click(function(){
        // Set an empty list of characters
        var characterHideArray = [];
        // Append each checked character to the array
        $("#nipCharacterHiderOptions input:checked").each(function(){ characterHideArray.push($(this).val()); });
        // Store the character list
        localStorage.characterHideList = characterHideArray.join(',');
        // Close the NI+ Options and reload the page
        $("#nipOptions").dialog("close");
        window.location.href = pageUrl;
    });
    // Add a new set of fields for a custom link
    $("#nipCustomLinksAdd").click(function(){
        // Inline JavaScript that hides and shows the default values
        var hideInputTitleCode = "if($(this).val() === $(this).attr('title')) $(this).val('').css('color','');";
        var showInputTitleCode = "if($(this).val() === '') $(this).val($(this).attr('title')).css('color','silver');";
        // Insert the new title and url fields
        $("#nipCustomLinksFields").append('<input type="text" class="title empty" title="Title" value="Title" style="color:silver;width:210px;margin-bottom:1px" onfocus="' + hideInputTitleCode + '" onblur="' + showInputTitleCode + '"></input>');
        $("#nipCustomLinksFields").append('<input type="text" class="url empty" title="URL" value="URL" style="color:silver;width:210px;margin-bottom:10px" onfocus="' + hideInputTitleCode + '" onblur="' + showInputTitleCode + '"></input><br />');
    });
    // Save the list of custom links
    $("#nipCustomLinksSave").click(function(){
        var customLinksArray = [];
        var title, url;
        // Check each set of title/url fields for a link
        $("#nipCustomLinksFields input.title").each(function(){
            // Skip empty fields
            if ($(this).val() !== "" && $(this).val() !== "Title") {
                // Add this title and url to the array
                title = $(this).val();
                url = $(this).next("input.url").val();
                customLinksArray.push({ "title":title, "url":url });
            };
        });
        // Save the array of custom links
        localStorage.customLinksArray = JSON.stringify(customLinksArray);
        // Close the NI+ Options and reload the page
        $("#nipOptions").dialog("close");
        window.location.href = pageUrl;
    });
}

// Appends a new class to the class string with proper spacing
function nip_appendList(list, newItem, delimiter) {
    // Set the default delimiter
    if (typeof(delimiter)==="undefined") delimiter = ",";
    // If the list is not empty, add the next item with a delimiter
    if (list) list = list + delimiter + newItem;
    // If the list is empty, just set the new item
    else list = newItem;
    // Return the new list
    return list;
}

// Makes drop-down menus drop down
$(function(){
    $('.nav li').hover(function(){
        $(this).children('.sub').slideDown(250);
		$(this).children('a').css('background', '#ccc');
    }, function(){
        $(this).children('.sub').slideUp(250);
		$(this).children('a').css('background', '#E3E3E3');
    });
});
