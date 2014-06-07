// ==UserScript==
// @name        Steam Badger
// @namespace   capitalw_steam
// @description Presents more useful info in Steam UI
// @include     http://steamcommunity.com/id/*/badges/
// @include     http://steamcommunity.com/profiles/*/badges/
// @include     http://steamcommunity.com/id/*/games?tab=all*
// @include		http://steamcommunity.com/profiles/*/games?tab=all*
// @include     http://steamcommunity.com/id/*/games?tab=all&games_in_common=1
// @include		http://steamcommunity.com/profiles/*/games?tab=all&games_in_common=1
// @include     http://steamcommunity.com/id/*/wishlist/
// @include		http://steamcommunity.com/profiles/*/wishlist/
// @include		http://steamcommunity.com/id/*/inventory/*
// @include		http://steamcommunity.com/profiles/*/inventory/*
// @include		http://steamcommunity.com/groups/*
// @include		http://steamcommunity.com/id/*/friends/
// @include		http://steamcommunity.com/profiles/*/friends/
// @include		http://steamcommunity.com/id/*/friendsthatplay/*
// @include		http://steamcommunity.com/profiles/*/friendsthatplay/*
// @include		http://store.steampowered.com/app/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require		http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @version     1.0.8
// @grant       unsafeWindow
// @grant       GM_getValue
// @grant       GM_setValue
// @grant 		GM_getResourceText
// @resource	seedtag http://pastebin.com/raw.php?i=s7wFWwDS
// ==/UserScript==


var badgeGames = JSON.parse(GM_getValue("badgeGames", "[]"))
var installedGames = JSON.parse(GM_getValue("installedGames", "[]"))

var profilesData = JSON.parse(GM_getValue("profilesData", "{}"))
var giftInventoryData = JSON.parse(GM_getValue("giftInventoryData", "{}"))
var giftPrey = JSON.parse(GM_getValue("giftPrey", '[]'))

var preyImage = '<div class="preyDiv"></div>'

var badgesInstalled
var uninstalledAreVisible = true

var unresolvedConnections = 0
var MAX_CONNECTIONS = 4
var pendingAjaxCalls = []
var ajaxIntervalID = null
var AJAX_DELAY = 2000

var GRAB_INVENTORY_DELAY = 1000
var MAX_INVENTORY_TRIES = 10

var untaggedGameIDs = null
var gameTags = JSON.parse(GM_getValue("gameTags", "{}"))
var gamesToNotTag = JSON.parse(GM_getValue("gamesToNotTag", "[]"))
var gameRedirectedFrom = JSON.parse(GM_getValue("gameRedirectedFrom", "{}"))

var gamesLackingTagsOnPage = JSON.parse(GM_getValue("gamesLackingTagsOnPage", "[]"))

var filterGameTags = null


//Only games found with MMO (but not Massively Multiplayer) are 42890, 107900, 212180, 239220. None of them are MMOs.
//13630 is amazing. DLC with a messed up breadcrumb and no tags/genre.
//This array is sorted for binary search
var TAGS_TO_IGNORE = ["Early Access", "Includes Source SDK", "MMO", "Mods (require HL2)", "New releases"]
var TAGS_TO_TRASH_GAME = ["Downloadable Content", "Game demo"]

//If both 237621(batman DLC) and the puzzling 33340 (Dawn of Discover: Venice addon) both require the base game we can trash anything with the Downloadable Content tag

//214490 is  Alien: Isolation, which right now has  no genre or tags. Awkward.

Array.prototype.binarySearch = function(target) {
  var low = 0, high = this.length - 1, i, comparison
  while (low <= high) {
    i = Math.floor((low + high) / 2);
    if (this[i] < target) { low = i + 1; continue; }
    if (this[i] > target) { high = i - 1; continue; }
    return i
  }
  return -1
}

Array.prototype.numericSort = function(){
	this.sort(function(a,b){return a-b})
}


function getTextForResourcefile(){
	result =  "gameTags=" + JSON.stringify(gameTags)
	result += "\n\rgamesToNotTag="+JSON.stringify(gamesToNotTag)
	result += "\n\rgameRedirectedFrom="+JSON.stringify(gameRedirectedFrom)
	return result
}



function main(){
	loadSeedTagging()
    var lastPath = getLastPath(window.location.pathname)
    var appID = getAppIDFromURL(window.location.pathname)
    if (appID) {
        if (window.location.pathname.indexOf("friendsthatplay") != -1) {
	       var owners = getFriendOwners(appID)
            addFriendsWhoOwnUI(appID)
            addFriendsWhoLackUI(appID)
            return
	   }
        else if (window.location.pathname.indexOf("app") != -1) {
            window.addEventListener("load", function(){ handleAppPage(appID) }, false)
        	addScanForTagsButton()
            return
        }
    }

    if (isMyAccount()) {
        if (lastPath == "badges") {
            scanForRemaining()
            addTrimmerButton()
        }
        else if (lastPath == "friends") {
            handleFriendsListPage()
        }
        else if (lastPath == "games") {
        	installMutationObserver( handlePersonalGames )
        }
        else if (lastPath == "inventory") {
            window.addEventListener("load", window.setTimeout(function() { scanGiftInventoryData(1) }, 0), false)
        }
        else if (window.location.hash == "#members") {
			//addScanMembersButton()
        }
	}
	else {
		if (lastPath == "games") {
			installMutationObserver(function(){ scanProfileGamesOwned(); addTagFilter()})
		}
		else if (lastPath == "wishlist") {
			installMutationObserver(scanProfileGamesWishlist)
		}
	}
}


function loadSeedTagging(){
	if (Object.keys(gameRedirectedFrom).length < 40){
		var seedTagsSource = GM_getResourceText( "seedtag" )
		baseUntaggable = loadVariableFromSource('gamesToNotTag', seedTagsSource)
		baseTags = loadVariableFromSource('gameTags', seedTagsSource)
		baseRedirects = loadVariableFromSource('gameRedirectedFrom', seedTagsSource)
		if (baseUntaggable) {
			gamesToNotTag = baseUntaggable
			GM_setValue("gamesToNotTag", JSON.stringify(gamesToNotTag))
		}
		if (baseTags) {
			gameTags = baseTags
			GM_setValue("gameTags", JSON.stringify(gameTags))
		}
		if (baseRedirects) {
			gameRedirectedFrom = baseRedirects
			GM_setValue("gameRedirectedFrom", JSON.stringify(gameRedirectedFrom))
		}
	}
}


function loadVariableFromSource(varName, source){
	try {
		var loaded = source.match(RegExp("^"+varName+"=(.*)$", "m"))
		return JSON.parse(loaded[1])
	}
	catch (err){
		return null
	}
}


function getLastPath(fullPath){
	return fullPath.match(".+\/([^\/]+)")[1]
}


function isMyAccount(){
   var userid = $("a.username").attr("href").match("\/(id|profiles)\/(.+)\/(.*)\/$")
   
   if (userid == null) {
     return false
   }
   var viewingid = $("span.profile_small_header_name > a.whiteLink").attr("href").match("\/(id|profiles)\/(.+)$")
   return (viewingid && userid[2] == viewingid[2])
}


function getSteamIDFromPage(root){
	var result = $(root).find("span.profile_small_header_name a.whiteLink")
	if (result.length > 0) {
		result = result.attr("href").match("\/profiles\/([0-9]+)$")
	}
	if (result) { return result[1] }
	result = getSteamIDByName(getProfileNameFromPage(root))
	if (result) { return result }
	result = $('body script[type="text/javascript"]:eq(2)')
	if (result.length > 0) {
		result = result.html().match(/g_steamID = "(\d*)";$/m)
		if (result) { return result[1] }
	}
	return null
}


function getProfileNameFromPage(root){
	return $(root).find("span.profile_small_header_name").text()
}


function getSteamIDByName(name){
	for (var steamID in profilesData){
		if (name == profilesData[steamID].name) {
			return steamID
		}
	}
	return null
}


function scanForRemaining(){
	var gameRows = $("div.badge_title_row")
	badgeGames = new Array()
	
	var appName
	var appID = 0
	
	gameRows.each( function(){
		if ($(this).find("div.badge_title_stats:contains('remaining'):not(:contains('No'))").length == 1) {
			appID = $(this).find('div.badge_title_stats div.badge_title_playgame a').attr("href").match(/[0-9]*$/)[0]
			appName = $(this).find("div.badge_title").contents().filter(function() {
  			  return this.nodeType === 3; //Node.TEXT_NODE
 			  }).text().trim()
			badgeGames.push([appID, appName])
		}
	})
	
	GM_setValue("badgeGames", JSON.stringify(badgeGames))
	badgesInstalled = getBadgeGamesInstalled()
}


function installMutationObserver(func){
    var observer = new MutationObserver(checkInsertForInstallResults)
    observer.eventualCallback = func
    observer.observe( document.getElementById("games_list_row_container"), { childList: true, subtree: true })
}


function checkInsertForInstallResults(mutations, observer){
    for (var i =0; i< mutations.length;i++){
        var mutant = mutations[i]
        if  (mutant.addedNodes && mutant.addedNodes[0] && (mutant.target.id=="games_list_rows")){
            window.setTimeout(observer.eventualCallback, 50)
            break
        }
    }
}


function handlePersonalGames(){
	scanForInstalledAndUpdateOwned()
	addTagFilter()
}


function scanForInstalledAndUpdateOwned(){
	if (!isListingAllGames($("body"))){
		return
	}
	installedGames  = new Array()
	var gameRows = $("div.gameListRow")
	var appID = 0
	var steamID = getSteamIDFromPage($("body"))
	
	var allGames = []
	gameRows.each( function (){
		appID = Number($(this).find('a').attr("href").match("[0-9]*$")[0])
		allGames.push(appID)
		if ( $(this).find('div.clientConnItemTextBlock:contains("Ready to play")').length > 0) {
			installedGames.push(appID)
		}
	})
	
	if (steamID  && (allGames.length > 0)){
		allGames.sort( function(a,b){return a-b})
		var storeUpdate = {}
		storeUpdate.owned = allGames
		storeUpdate.name = getProfileNameFromPage($("body"))
		updateOneProfile(steamID, storeUpdate)
	}
	
	GM_setValue("installedGames", JSON.stringify(installedGames))
}


function isListingAllGames(root){
	try {
		var matched = $(root).find("div.info.scroll_info").html().match(/1 - (\d+) of (\d+) items/)
		if (matched[1] == matched[2]){ return true}
	} catch(err){
	}
	return false
}


function addTagFilter(){
	filterGameTags = rebuildFilterGameTags()
	$("select#tagFilter").remove()
	var options = $.map(Object.keys(filterGameTags).sort(), function(tag){
		return ('<option value="'+tag+'"'+((filterGameTags[tag].length == 0) ? ' disabled="disabled"':'a="b"') +'>'+tag+' ('+filterGameTags[tag].length+')</option>')
	})
	$("input#gameFilter").after(' Require tag:<select multiple size="6" id="tagFilter">' +options.join('')+'</select>')
	$("select#tagFilter").change(filterByTags)
	$('body').prepend('<style> div.gameListRow.hidden { display:none}</style>')
}


function getHeuristicText(steamID){
	//We assume the basic gameTags represent steam as a whole in terms of tag distribution (a lie)
	//Then for each SingleTag, we do: (SteamSingleTag*x/SteamAllTags) = (UserSingleTag/UserAllTags)
	// x = (UserSingleTag/UserAllTags)*(SteamAllTags/SteamSingleTag) = (UserSingleTag*SteamAllTags)/(UserAllTags*SteamSingleTag)
	//Also do some screening for really low-incidence tags. Regardless of how many VR-enabled games you have it means nothing.
	var tagMultipliers = {}
	var userTotal = 0
	var steamTotal = 0
	var profile = profilesData[steamID]
	var tag
	var MINIMUM_GAME_CUTOFF = 20
	var LIKE_THRESHOLD = 1.5
	var DISLIKE_THRESHOLD = 0.5
	for (tag in gameTags){
		if (gameTags[tag].length < MINIMUM_GAME_CUTOFF) { continue; }
		steamTotal += gameTags[tag].length
		tagMultipliers[tag] = $.grep(gameTags[tag], function(taggedGame){
			return (profile.owned.binarySearch(taggedGame) != -1)
		}).length
		userTotal += tagMultipliers[tag]
	}
	for (tag in tagMultipliers){
		tagMultipliers[tag] = ((tagMultipliers[tag] *steamTotal)/(userTotal*gameTags[tag].length))
	}
	var sortedTags = Object.keys(tagMultipliers).sort(function(a,b){return tagMultipliers[b] - tagMultipliers[a]})
	var output = ''
	for (var i=0; i < sortedTags.length;i++){
		tag = sortedTags[i]
		if ((tagMultipliers[tag] > LIKE_THRESHOLD) || (tagMultipliers[tag] < DISLIKE_THRESHOLD))
		output += (tag  + ":" + tagMultipliers[tag]) + '\n'
	}
	return output
}


function rebuildFilterGameTags(){
	filterGameTags = {}
	gamesOnPage = []
	$("div#games_list_rows div.gameListRow div.gameLogo a").each(function(){
		gamesOnPage.push(Number($(this).attr("href").match("[0-9]*$")[0]))
	})
	gamesOnPage.sort( function(a,b){return a-b} )
	for (var  key in gameTags){
		filterGameTags[key] = $.grep(gamesOnPage, function(appID,index){ return gameHasTag(appID, key)})
	}
	return filterGameTags
}


function filterByTags(e){
	var tagArray = []
	$(e.target).find("option:selected").each(function(){
		tagArray.push($(this).attr('value'))
	})
	
	$("div#games_list_rows div.gameListRow").each(function(){
		appID = $(this).find('a').attr("href").match("[0-9]*$")[0]
		if (gameHasAllFilterTags(appID, tagArray)){
			$(this).removeClass("hidden")
		}
		else { $(this).addClass("hidden") }
	})
}


function gameHasAllFilterTags(appID, tagArray){
	for (var i=0; i < tagArray.length; i++){
		if ((gameTags[tagArray[i]].binarySearch(appID) == -1) ) { return false }
	}
	return true
}


function addScanForTagsButton(){
	var extraButton = '<a class="btn_blue_white_innerfade btn_medium ajaxscanbtn" id="scanfortagsbutton"><span>Tag untagged games tags (' +
		(getUntaggedGameIDs().length - gamesLackingTagsOnPage.length) +')</span></a>'
	$("div.apphub_OtherSiteInfo").children().last().after(extraButton)
	$("#scanfortagsbutton").click(scanGamesForTags)
}


function scanGamesForTags(){
	if (pendingAjaxCalls.length > 0) {
		return
	}
	var uniqueAppIDs = getUntaggedGameIDs()
	console.info(uniqueAppIDs)
	pendingAjaxCalls = []
	for (var i = (uniqueAppIDs.length-1); i>= 0; i--) {
		pendingAjaxCalls.push(getAjaxForLoadAppPage(uniqueAppIDs[i]))
	}
	$("a.ajaxscanbtn span").animate({color: "#FF9966"}, 1000)
	ajaxIntervalID = setInterval(spinOffAjaxRequest, AJAX_DELAY)
}


function getUntaggedGameIDs(){
	if (untaggedGameIDs != null) {
		return untaggedGameIDs
	}
	
	var untaggedSet = {}
	var i, profile, appID
	for (var steamID in profilesData) {
		profile = profilesData[steamID]
		for (i = 0; i < profile.owned.length; i++){
			appID = profile.owned[i]
			if (!(untaggedSet.hasOwnProperty(appID)) && !(gameHasAnyTag(appID))) {
				untaggedSet[appID] = true
			}
		}
		if (profile.wishlist) {
			for (i = 0; i < profile.wishlist.length; i++){
				appID = profile.wishlist[i]
				if (!(untaggedSet.hasOwnProperty(appID)) && !(gameHasAnyTag(appID))) {
					untaggedSet[appID] = true
				}
			}
		}
	}
	for (i = 0; i < gamesToNotTag.length; i++){
		delete untaggedSet[gamesToNotTag[i]]
	}
	untaggedGameIDs = Object.keys(untaggedSet).map(Number)
	untaggedGameIDs.sort()
	return untaggedGameIDs
}


function gameHasAnyTag(appID){
	for (var tag in gameTags){
		if (gameHasTag(appID, tag)) { return true }
	}
	return false
}


function getAjaxForLoadAppPage(appID) {
	var link = "http://store.steampowered.com/app/"+appID+"/"
	return {
		url: link,
		crossDomain: true,
		xhrFields: {
         withCredentials: true 
       	},
       	error: function(){
       		//console.info("Tagging: Error loading page for " + appID)
       	},
		success: function(data, textStatus, jqXHR) {
				handleAppPageLoad(data, textStatus, jqXHR, appID) 
			},
		complete: function(jqXHR, textStatus, errorThrown){
			completeAsyncAjax()
		}
	}
}


function handleAppPageLoad(data, textStatus, jqXHR, appID) {
	scanGameTags($(data),appID)
	spotDifferingAppID($(data), appID)
}


function spotDifferingAppID(data, referringAppID){
	var redirectedAppID = getAppIDFromLinkOnPage(data)
	if  (redirectedAppID && (redirectedAppID  != referringAppID)){
		gameRedirectedFrom[redirectedAppID] = referringAppID
		GM_setValue("gameRedirectedFrom", JSON.stringify(gameRedirectedFrom))
	}
}


function getAppIDFromLinkOnPage(data){
	var link =  $(data).filter('link[rel="canonical"]').attr('href')
	if (link) {
		return (getAppIDFromURL($(data).filter('link[rel="canonical"]').attr('href')))
	}
	return null
}


function addTrimmerButton(){
	var extraButton = '<label id="trimmerbutton" class="badge_sort_option whiteLink es_badges"><span>Easy cards only ('+
	   badgesInstalled.length+") "+ "("+installedGames.length+" games installed"+')</span></label>'
	$("div.profile_badges_sortoptions").children().last().after(extraButton)
	$("#trimmerbutton").click(toggleUninstalledVisibility)
}


function toggleUninstalledVisibility(){
	uninstalledAreVisible = !uninstalledAreVisible
	if (uninstalledAreVisible) {
		$("div.badge_row").css("display", "")
		$("#trimmerbutton").text("Easy cards (" +badgesInstalled.length+") "+ " ("+installedGames.length+" games installed)")
	}
	else { hideUninstalled() }
}


function hideUninstalled(){
	var gameRows = $("div.badge_row")	
	var appID = 0

	gameRows.each( function(){
		if ($(this).find("div.badge_title_stats:contains('remaining'):not(:contains('No'))").length == 1) {
			appID = $(this).find('div.badge_title_stats div.badge_title_playgame a').attr("href").match(/[0-9]*$/)[0]
			if (badgesInstalled.indexOf(appID)  == -1) {
				$(this).css("display","none")
			}
		}
		else {
			$(this).css("display","none")
		}
	})
	$("#trimmerbutton").text("Show uninstalled")
}


function getBadgeGamesInstalled(){
	var result = new Array()
	for  (var i = 0; i < badgeGames.length; i++) {
		if (installedGames.indexOf(badgeGames[i][0]) != -1) {
			result.push(badgeGames[i][0])
		}
	}
	return result
} 


function scanGiftInventoryData(tries){
	if (tries > MAX_INVENTORY_TRIES) {
		return
	}
	
	var steamInventory = grabRgInventory()
	
	if (null == steamInventory ) {
		window.setTimeout(function() { scanGiftInventoryData(tries+1) }, GRAB_INVENTORY_DELAY)
		return
	}
	giftInventoryData = getGiftAssociativeArray( getNumbersAndNamesFromRgInventory(steamInventory) )
	GM_setValue("giftInventoryData", JSON.stringify(giftInventoryData))
	$("div#context_selector").prepend('<div style="color:green">Gift inventory scanned</div>')
}


function getGiftAssociativeArray(giftTuples){
	var finalGifts = {}
	var lastAppID = -1
	var tuple
	for (var i=0; i< giftTuples.length; i++){
		tuple = giftTuples[i]
		if (tuple[0] == lastAppID) {
			finalGifts[lastAppID].count += 1
		}
		else {
			lastAppID = tuple[0]
			finalGifts[lastAppID] = {"name":tuple[1], "count":1}
		}
	}
	return finalGifts
}


function grabRgInventory() {
	if ((unsafeWindow.UserYou.rgAppInfo["753"].rgContexts["1"].inventory) && 
		(unsafeWindow.UserYou.rgAppInfo["753"].rgContexts["1"].inventory.rgInventory) ) {
		return unsafeWindow.UserYou.rgAppInfo["753"].rgContexts["1"].inventory
	}
	return null
}


function getNumbersAndNamesFromRgInventory(steamInventory){
	var tidyGifts = []
	var gift
	for (var i=0; i < steamInventory.rgItemElements.length; i++){
			gift = steamInventory.rgItemElements[i].rgItem
			var appIDsAndNames = getGiftItemAppIDsAndNames(gift)
			if (appIDsAndNames) {
				$.merge(tidyGifts, appIDsAndNames)
			}
		}
	tidyGifts.sort(function(a,b) { return a[0]-b[0]})
	return tidyGifts
}


function getGiftItemAppIDsAndNames(rgItem) {
	try {
		if (rgItem.actions) {
			return [ [getLastPath(rgItem.actions[0].link), rgItem.name] ]
		}
		else {
			var flattened = $(rgItem.descriptions[0].value).filter("a").map(
				function() { return [getLastPath($(this).attr("href")), $(this).text() ]}
			).get()
			var result = []
			for (var i = 0; i < (flattened.length/2); i++){
				result.push(new Array(flattened[i*2], flattened[(i*2)+1]))
			}
			return result
		}
	} catch (err) {
		//console.warn("getGiftItemAppIDsAndNames error:" + rgItem)
		return null
	}
}


function handleFriendsListPage(){
	scanFriendsList()
	addScanEachFriendButton()
	addPreyImages()
}


function scanFriendsList(){
	var friendBlocks = $("div.friendBlock.persona")
	var updatedFriends = {}
	friendBlocks.each( function () {
		var steamID = $(this).find("div.manage_friend_checkbox input.friendCheckbox").attr("data-steamid")
		var avatar = $(this).find("div.playerAvatar img").attr("src")
		var name = $(this).find("span.friendSmallText").parent("div").text().split("\n")[1].trim()
		updatedFriends[steamID.toString()] = {"avatar":avatar,"name":name, "isFriend":true}
	})
	
	updateAllFriendsData(updatedFriends)
}


function addScanEachFriendButton(){
	var extraButton = '<a class="btn_blue_white_innerfade btn_medium ajaxscanbtn" id="scaneachfriendbutton"><span>Scan everyone</span></a>'
	$("div.manage_friends_header").children().last().after(extraButton)
	$("#scaneachfriendbutton").click(scanEachFriend)
}


function addPreyImages(){
	var friendBlocks = $("div.friendBlock.persona")
	friendBlocks.append(preyImage)
	$("div.preyDiv").click(togglePreyStatus)
	friendBlocks.each( function() {
		var steamID = ($(this).find("div.manage_friend_checkbox input.friendCheckbox").attr("data-steamid"))
		if (isPrey(steamID) ) {
			$(this).find('div.preyDiv').addClass("active")
		}
	})
	$('body').prepend('<style> div.preyDiv { position:absolute; right:0; z-index:3; top:8px;}' +
	'div.preyDiv {background-image:url("http://media.steampowered.com/steamcommunity/public/images/apps/200510/b9d2d27c2fc9d188f605b4300e475e8d510c41a4.jpg");'+
		'background-size:32px 32px; padding:32px 32px 0 0; z-index:10;}'+
	'div.preyDiv.active {background-image:url("http://media.steampowered.com/steamcommunity/public/images/apps/200510/c5deca36ee53aab6eebc4e5db9d76625d4c67914.jpg")}</style>')
}


function isPrey(steamID){
	return (giftPrey.indexOf(steamID) != -1)
}


function togglePreyStatus(){
	var steamID = $(this).parent().find("div.manage_friend_checkbox input.friendCheckbox").attr("data-steamid")
	var i = giftPrey.indexOf(steamID)
	if (i != -1){
		giftPrey.splice(i, 1)
		$(this).removeClass("active")
	}
	else {
		giftPrey.push(steamID)
		$(this).addClass("active")
	}
	GM_setValue("giftPrey", JSON.stringify(giftPrey))
}


function scanEachFriend(){
	if (pendingAjaxCalls.length > 0) {
		return
	}
	pendingFriendsProfiles = getFilteredProfiles(function(entry) {
		var now = $.now()
		return (("isFriend" in entry) && (entry.isFriend) 
		&& ((entry.lastAttempted == undefined) || ((now - entry.lastAttempted) > 300000) ) )
		} )
	pendingAjaxCalls = []
	for (var steamID in pendingFriendsProfiles) {
		pendingAjaxCalls.push(getAjaxForLoadOwnedGames(steamID))
		pendingAjaxCalls.push(getAjaxForLoadWishlistGames(steamID))
	}
	
	$("#scaneachfriendbutton span").animate({color: "#FF9966"}, 1000)
	ajaxIntervalID = setInterval(spinOffAjaxRequest, AJAX_DELAY)
}


function spinOffAjaxRequest(){
	if ((0==unresolvedConnections) && (0 == pendingAjaxCalls.length)) {
		clearInterval(ajaxIntervalID)
		ajaxIntervalID = null
		updateConnectionDisplay()
		return
	} 
	while ((unresolvedConnections < MAX_CONNECTIONS) && (pendingAjaxCalls.length != 0)) {
		var nextRequest = pendingAjaxCalls.pop()
		unresolvedConnections++
		$.ajax(nextRequest)
	}
	updateConnectionDisplay()
}


function updateConnectionDisplay(){
	if ((0 == unresolvedConnections) && (0 == pendingAjaxCalls.length)) {
		$("a.ajaxscanbtn span").text("Done scanning")
		$("a.ajaxscanbtn span").animate({color: "#99FF66"}, 1000)
	}
	else {
		$("a.ajaxscanbtn span").text(unresolvedConnections + " active requests, " + 
			pendingAjaxCalls.length + " requests remaining")
	}
}


function getAjaxForLoadOwnedGames(steamID){
	var link = "http://steamcommunity.com/profiles/"+steamID+"/games?tab=all#0|2000"
	return {
		url: link,
		type: "GET",
		ifModified: true,
		beforeSend: function(xhr) {
       		xhr.setRequestHeader(
            	'X-Requested-With',
            	{toString: function() { return ''; }
        	})
        	stampConnectionAttempt(steamID)
        },
        headers: { 
        	"Accept" : "text/plain; charset=utf-8",
        	"Content-Type": "text/plain; charset=utf-8"
    	},
		dataType: "html",
		success: function (data, textStatus, jqXHR) {
				handleOwnedGamesLoad(data, textStatus, jqXHR, steamID) 
			},
		complete: completeAsyncAjax
	}
}


function getAjaxForLoadWishlistGames(steamID){
	var link = "http://steamcommunity.com/profiles/"+steamID+"/wishlist" 
	return {
		url: link,
		ifModified: true,
		success: handleWishlistGamesLoad,
		complete: completeAsyncAjax,
		beforeSend: function(xhr) { stampConnectionAttempt(steamID) }
	}
}


function completeAsyncAjax(jqXHR, textStatus){
	unresolvedConnections--
	updateConnectionDisplay()
}


function handleWishlistGamesLoad(data, textStatus, jqXHR) {
	if (textStatus == "success") {
		scanProfileGamesList($(data), "wishlist", "wishlistRow")
	}
}


function handleOwnedGamesLoad(data, textStatus, jqXHR, steamID) {
	if (textStatus == "success") {
		var gamesList = getAppIDsFromRgGames(getRgGamesFromHTML(data))
		addGamesListToSteamID(steamID, gamesList, "owned")
	}
}


function getRgGamesFromHTML(data){
	var re =  /^<script language="javascript">([\n\s\S.]*)var rgGames =(.*);/gm
    var match = re.exec(data)
    return JSON.parse(match[2])
}


function getAppIDsFromRgGames(rgGames){
	var appIDs = []
	for (var i = 0; i < rgGames.length; i++){
		appIDs.push(rgGames[i]["appid"])
	}
	return appIDs
}


function stampConnectionAttempt(steamID){
	var storeUpdate = {}
	storeUpdate.lastAttempted = $.now()
	updateOneProfile(steamID, storeUpdate)
}


function updateAllFriendsData(updatedFriends){
	var steamID
	for (steamID in profilesData) {
		if (!(steamID in updatedFriends)) {
			profilesData[steamID].isFriend = false
		}
	}
	for(steamID in updatedFriends) {
 		updateOneProfile(steamID, updatedFriends[steamID])
 	}
}


function updateOneProfile(steamID, updated){
	if (steamID in profilesData) {
 		for (var property in updated)
 			profilesData[steamID][property] = updated[property]
 		}
 	else {
 		profilesData[steamID] = updated
 	}
 	GM_setValue("profilesData", JSON.stringify(profilesData))
}


function scanProfileGamesOwned(){
	var root = $("body")
	if (isListingAllGames(root)){
		scanProfileGamesList(root, "owned", "gameListRow")
	}
	else{
		//console.info("Failed to get all owned games for: http://steamcommunity.com/profiles/"+steamID)
	}
}


function scanProfileGamesWishlist(){
	scanProfileGamesList($("body"), "wishlist", "wishlistRow")
}


function scanProfileGamesList(root, storageKey, rowClass){
	var steamID = getSteamIDFromPage(root)
	if (!(steamID in profilesData)) {
		return
	}
	addGamesListToSteamID(steamID, getGamesList(root, rowClass), storageKey)
}


function addGamesListToSteamID(steamID, gamesList, storageKey) {
	var storeUpdate = {}
	gamesList.sort(function(a,b){return a - b}) 
	storeUpdate[storageKey] = gamesList
	updateOneProfile(steamID, storeUpdate)
}


function getGamesList(root, rowClass){
	var listedGames = new Array()
	var appID
	$(root).find("div."+rowClass).each( function (){
		appID = $(this).find('a').attr("href").match("[0-9]*$")[0]
		listedGames.push(Number(appID))
	})
	return listedGames
}


function getAppIDFromURL(url){
	var appID = url.match("(app|friendsthatplay)\/([0-9]+)\/?$")
	if (appID != null) {
		return Number(appID[2])
	}
	return null
}


function getFriendOwners(appID){
	var refAppID = getReferringAppID(appID)
	return getFilteredProfiles(function(entry) {return (("owned" in entry) && ((entry.owned.binarySearch(appID) != -1) || (entry.owned.binarySearch(refAppID) != -1)))} )
}


//TODO: This can be a misnomer right now since we don't filter for friends.
function getFriendLackers(appID){
	var refAppID = getReferringAppID(appID)
	return getFilteredProfiles(function(entry) {
		return (("owned" in entry) && (entry.owned.binarySearch(appID) == -1) && (entry.owned.binarySearch(refAppID) == -1))
	} )
}


function getPreyLackers(appID){
	result = getFriendLackers(Number(appID))
	for (steamID in result){
		if (!(isPrey(steamID))) {
			delete(result[steamID])
		}
	}
	return result
}


function getFilteredProfiles(filterFunc){
	var filtered = {}
	for (var steamID in profilesData) {
		if (filterFunc(profilesData[steamID]) == true) {
			filtered[steamID] = profilesData[steamID]
		}
	}
	return filtered
}


function addFriendsWhoOwnUI(appID){
	var owners = getFriendOwners(appID)
	addFriendsUI(appID, "Friends who just own ", owners)
}


function addFriendsWhoLackUI(appID){
	var lackers = getFriendLackers(appID)
	addFriendsUI(appID, "Friends who lack ", lackers)
}


function addFriendsUI(appID, friendDesc, players){
	var gameLink = '<a href="http://steamcommunity.com/app/' +appID + '">'+$("div.friendListSectionHeader a").html() +'</a><span class="underscoreColor">_</span>'
	var sectionHead = '<div class="mainSectionHeader friendListSectionHeader">' + friendDesc + gameLink +'</div>'
	var friendList  = '<div class="profile_friends">'
	
	if (Object.keys(players).length > 0){
		for (var steamID in players) {
			friendList += createFriendBlock(steamID)
		}
		friendList += '</div><div style="clear: left;"></div></div>'
		$("div#memberList").children().last().after(sectionHead)
		$("div#memberList").children().last().after(friendList)
	}
}


function createFriendBlock(steamID){
	var result = '<div class="friendBlock persona"> <a class="friendBlockLinkOverlay" href="http://steamcommunity.com/profiles/'+steamID+
		'"></a><div class="playerAvatar online"><img src="'+profilesData[steamID].avatar+'"></div>'+
		'<div class="friendBlockContent">'+profilesData[steamID].name+'</div></div>'
	return result
}


function handleAppPage(appID){
	showAppGiftingTargets(appID)
	scanGameTags($("body"), appID)
}


function scanGameTags(root,appID){
	if (!onGamePage(root)){
		if ($(root).find("div#supernav").length != 0){
			addToGamesToNotTag(appID)
		}
		return
	}
	var potentialTags = []
	$(root).find('div.details_block div.game_area_details_specs div.name, div.glance_details a[href^="http://store.steampowered.com/genre/"]').each( function(){
		potentialTags.push($(this).text())
	})
	
	if (potentialTags.length > 0) {
		removeFromGamesLackingTagsOnPage(appID)
		for (var i=0; i < TAGS_TO_TRASH_GAME.length; i++){
			if (potentialTags.indexOf(TAGS_TO_TRASH_GAME[i]) != -1){
				addToGamesToNotTag(appID)
				return
			}
		}
	
		for (var i=0; i < potentialTags.length; i++){
			addAppIDToTag(appID, potentialTags[i])
		}
		GM_setValue("gameTags", JSON.stringify(gameTags))
	}
	else {
		addToGamesLackingTagsOnPage(appID)
	}
}


function addToGamesLackingTagsOnPage(appID){
	if (gamesLackingTagsOnPage.indexOf(appID) == -1){
		gamesLackingTagsOnPage.push(appID)
		GM_setValue("gamesLackingTagsOnPage", JSON.stringify(gamesLackingTagsOnPage))
	}
}


function removeFromGamesLackingTagsOnPage(appID){
	var removeIndex = gamesLackingTagsOnPage.indexOf(appID)
	if (removeIndex != -1){
		gamesLackingTagsOnPage.splice(removeIndex,1)
		GM_setValue("gamesLackingTagsOnPage", JSON.stringify(gamesLackingTagsOnPage))
	}
}


function addToGamesToNotTag(appID){
	gamesToNotTag.push(appID)
	gamesToNotTag.sort()
	GM_setValue("gamesToNotTag", JSON.stringify(gamesToNotTag))
}

function onGamePage(root){
	if ($(root).find('div.breadcrumbs div.blockbg a[href="http://store.steampowered.com/search/?term=&snr=1_5_9__205"]').length != 1){
		return false
	}
	if ($(root).find('div.breadcrumbs div.blockbg a[href^="http://store.steampowered.com/dlc/"]').length != 0){
		return false
	}
	if ($(root).find('div.notice_box_content a[href^="http://www.steampowered.com/v/index.php?area=game&AppId="]').length != 0){
		return false
	}
	return true
}


function addAppIDToTag(appID, tagText){
	if (gameTags[tagText]){
		if (gameHasTag(appID, tagText)){ return }
		gameTags[tagText].push(Number(appID))
		gameTags[tagText].sort(function(a,b){return a-b})
	}
	else{
		if (!(TAGS_TO_IGNORE.binarySearch(tagText) != -1)){
			gameTags[tagText] = [Number(appID)]
		}
	}
}


function gameHasTag(appID, tagText){
	return (gameTags[tagText].binarySearch(appID) != -1) 
}


function showAppGiftingTargets(appID){
	var giftCount = getGiftInventoryCount(appID)
	if (giftCount > 0) {
		var  giftText =  " (" +giftCount + " gift" +((giftCount> 1) ?"s" : "")  +" in inventory)"
		$("div.apphub_AppName").first().append(giftText)
	}
	
	var prey = getPreyLackers(appID)
	if  (Object.keys(prey).length > 0){
		var preyDiv = '<div class="preyDiv">'
		$.each(prey, function(key, value) {
				preyDiv += ' <a href="http://steamcommunity.com/profiles/' + key + '"' +
				((value["wishlist"] && (value.wishlist.binarySearch(appID) != -1)) ?" class='wished'" : "")+
				'>' + value.name + '</a>'
			})
		preyDiv += '</div>'
		$("div.apphub_AppName").append(preyDiv)
		$('body').prepend('<style> div.preyDiv a { font-size: 14px; color:#FFFFFF;} '+
			'div.preyDiv a.wished{color:#32CD32;font-size:16px; animation: glow .75s infinite alternate;}'+
			'@keyframes glow { to { text-shadow: 0 0 4px #00FF00; } }'+
			'div.preyDiv a[href$="/76561198024962141"]{color:#FFCCFF;}'+
			'div.preyDiv a[href$="/76561198024962141"].wished {color:#FF00FF;animation: pinkglow .75s infinite alternate;}'+
			'@keyframes pinkglow { to { text-shadow: 0 0 4px #FFCCFF; } }' +
			'</style>')
	}
}


function getReferringAppID(appID){
	if (appID in gameRedirectedFrom){
		return gameRedirectedFrom[appID]
	}
	return appID
}


function getGiftInventoryCount(appID){
	return ( (appID in giftInventoryData) ? giftInventoryData[appID].count : 0)
}



main()