// ==UserScript==
// @name           Subeta - Auto Quest
// @namespace      Subeta Bots
// @version        4.3
// @include        http://subeta.net/explore/saggitarius.php*
// @include        http://subeta.net/quests.php/saggitarius*
// @include        http://subeta.net/quests.php/wizard*
// @include        http://subeta.net/quests.php/cursed*
// @include        http://subeta.net/explore/carl.php*
// @include        http://subeta.net/quests.php/library*
// @include        http://subeta.net/quests.php/maleria*
// @include        http://subeta.net/quests.php/pete*
// @include        http://subeta.net/explore/quest_computer.php*
// @include        http://subeta.net/quests.php/quentin*
// @include        http://subeta.net/quests.php/cinthia*
// @include        http://subeta.net/explore/goddess.php*
// @require		   http://code.jquery.com/jquery-1.11.0.min.js
// @run-at         document-end
// ==/UserScript==

/*-----------------------------------------------------------
 * Script compatible only with TamperMonkey on Google Chrome
 * --------------------------------------------------------*/


// STARTREGION: CLASSES

function Quest(url, type, mode, upperLimit) {
    this.url = url;						// URL for the quest
    this.type = type;					// 0 for OLD type, 1 for NEW type, 2 for Shinwa
    this.mode = mode;					// 0: Based on upperLimit only, 1: Based on OAP, 2: Based on Rarity
    this.morinori = 0;					// 0: Undefined, 1: Mori (Dark), 2: Nori (Light)
	this.items = new Array();			// Array of items required to complete the quest
    this.upperLimit = upperLimit;		// Upper Limit to spend for quest. 1 for each different number of items required.
    this.qData = new QuestData(this.type);
}

function QuestData(type) {
    switch (type) {
        case 0:
            this.btnStart	= 'Start a Quest';
            this.btnQuit	= 'I give up!';
            this.btnFinish	= 'I have them all!';
            this.txtInit	= 'to bring me these items:';
            this.txtFinish	= 'Your Reward is:';
            this.txtMax		= 'You have already played the maximum';
            this.txtNoQuest = 'You aren\'t on a quest!';
            this.txtError	= 'You don\'t have all of the items!';
            this.txtNoTime	= 'You failed to bring me the items in time';
            break;
        case 1:
            this.btnStart	= 'Start Quest!';
            this.btnQuit	= 'Quit Quest';
            this.btnFinish	= 'Finish Quest';
            this.txtInit	= 'left to bring me:';
            this.txtFinish	= 'Thank you for bringing me these items! Here is your prize:';
            this.txtMax		= 'Try again tomorrow!';
            this.txtNoQuest = 'You aren\'t on a quest!';
            this.txtError	= 'You don\'t have all the items required for this quest!';
            this.txtNoTime	= 'Out of Time';
            break;
        case 2:
            this.btnStart = 'Start the Quest';
    }
}

function Item(name, imgURL) {
    this.name = name;
    this.imgURL = imgURL;
    
    this.shopName;
    this.shopID;
    this.shopPrice;
    this.ushopName;
    this.ushopURL;
    this.ushopID;
    this.ushopPrice = 0;
    this.itemid;
    this.cv;
    this.vercode;
    
    this.oap;
    this.rarity;
    this.isObtained = false;
    
    this.sectionSrc;
}

// ENDREGION: CLASSES

// STARTREGION: DECLARATIONS

var arrInputs = document.getElementsByTagName('input');
var arrMyShops = getMyShopIDs();
var onHandSP = getOnHandSP();

var section;
if (document.location.href.indexOf('quests.php/saggitarius') > -1 || document.location.href.indexOf('quests.php/quentin') > -1 || document.location.href.indexOf('quests.php/library') > -1 || document.location.href.indexOf('quests.php/wizard') > -1 || document.location.href.indexOf('quests.php/maleria') > -1 || document.location.href.indexOf('quests.php/cinthia') > -1 || document.location.href.indexOf('quests.php/cursed') > -1 || document.location.href.indexOf('quests.php/pete') > -1 || document.location.href.indexOf('explore/goddess.php') > -1)
    section = document.getElementsByClassName('container-fluid')[0];
else {
    var arrDivs = document.getElementsByTagName('div');
    for (var i = 0 ; i < arrDivs.length; i++) {
        if (arrDivs[i].getAttribute('style') == 'width:500px')
        {
            section = arrDivs[i];
            arrDivs[i].setAttribute('id', 'aq_section');
            break;
        }
    }
}

var html;
if (section != null)
	html = section.innerHTML;
else
    html = document.getElementsByTagName('body')[0].innerHTML;
    

var q;
if (window.location.href.toString().indexOf('quests.php/quentin') > -1)
    q = new Quest('http://subeta.net/quests.php/quentin', 1, 0, new Array(60000, 60000, 60000, 60000));
else if (window.location.href.toString().indexOf('quests.php/library') > -1)
    q = new Quest('http://subeta.net/quests.php/library', 1, 0, new Array(60000, 60000, 60000, 60000));
else if (window.location.href.toString().indexOf('quests.php/wizard') > -1)
    q = new Quest('http://subeta.net/quests.php/wizard', 1, 0, new Array(60000, 60000, 60000, 60000));
else if (window.location.href.toString().indexOf('quests.php/maleria') > -1)
    q = new Quest('http://subeta.net/quests.php/maleria', 1, 0, new Array(1000000, 1000000, 1000000));
else if (window.location.href.toString().indexOf('quests.php/cinthia') > -1)
    q = new Quest('http://subeta.net/quests.php/cinthia', 1, 0, new Array(50000, 50000, 50000, 50000));
else if (window.location.href.toString().indexOf('quests.php/cursed') > -1)
{
    q = new Quest('http://subeta.net/quests.php/cursed', 1, 0, new Array(60000, 60000, 60000, 60000));
    if (document.getElementsByClassName('container-fluid')[0].innerHTML.indexOf('Mori') > -1) 
        q.morinori = 1;
    else if (document.getElementsByClassName('container-fluid')[0].innerHTML.indexOf('Nori') > -1)
        q.morinori = 2;
}
else if (window.location.href.toString().indexOf('quests.php/pete') > -1)
    q = new Quest('http://subeta.net/games/foodquest.php', 1, 0, new Array(1000000, 1000000, 1000000, 1000000));
else if (window.location.href.toString().indexOf('quests.php/saggitarius') > -1)
    q = new Quest('http://subeta.net/quests.php/saggitarius', 1, 0, new Array(50000, 80000, 100000, 200000));
else if (window.location.href.toString().indexOf('explore/quest_computer.php') > -1)
    q = new Quest('http://subeta.net/explore/quest_computer.php', 0, 0, new Array(15000, 22000, 30000, 40000));
else if (window.location.href.toString().indexOf('explore/carl.php') > -1)
    q = new Quest('http://subeta.net/explore/carl.php', 0, 0, new Array(20000, 20000, 20000, 20000));
else if (window.location.href.toString().indexOf('explore/goddess.php') > -1)
    q = new Quest('http://subeta.net/explore/goddess.php', 2, 0, new Array());

// ENDREGION: DECLARATIONS

// STARTREGION: NAVIGATION
    
if (html.indexOf(q.qData.btnStart) > -1) {
    (getButton(arrInputs, q.qData.btnStart)).click();
}
else if (html.indexOf(q.qData.txtInit) > -1 && html.indexOf(q.qData.btnFinish) > -1 && html.indexOf(q.qData.btnQuit) > -1) {    
    var names = getItemNamesFromImgArray(section.getElementsByTagName('img'));
    var urls = getItemImgURLsFromImgArray(section.getElementsByTagName('img'));
    var arrPShopSearch = getPShopSearch(section, names);
    if (q.type == 0)
        getButton(section.getElementsByTagName('input'), q.qData.btnQuit).onclick = "return true";
    else if (q.type == 1)
        getButtonURL(section.getElementsByTagName('a'), q.qData.btnQuit).onclick = "return true";
     
    for (var i = 0; i < names.length; i++) {
        q.items[i] = new Item(names[i], urls[i]);
        arrPShopSearch[i].innerHTML = '<div id="aq_container" style="border:2px #efefef solid;width:60%;text-align:left;margin-left:auto;margin-right:auto;padding:7px;background-color:#efefef;color:#666666;line-height:16px;">Price: <b id="aq_price"></b></div>';
        if (q.mode == 1)
            arrPShopSearch[i].innerHTML = arrPShopSearch[i].innerHTML.replace('</b></div>', '</b><br>OAP: <b id="aq_oap"></b></div>');
        else if (q.mode == 2)
            arrPShopSearch[i].innerHTML = arrPShopSearch[i].innerHTML.replace('</b></div>', '</b><br>Rarity: <b id="aq_rarity"></b></div>');
        q.items[i].sectionSrc = arrPShopSearch[i];
    }
    
    $.get("http://subeta.net/inventory.php", function(invdata){
        if (invdata.indexOf('<h1 class=\'text_center\'>Inventory</h1>') > -1){
            var invhtml = invdata.substring(invdata.indexOf('<h1 class=\'text_center\'>Inventory</h1>') + 38);
            invhtml = invhtml.substring(0, invhtml.indexOf('equalHeights(\'container_Inventory'));
            
            for (var h = 0; h < q.items.length; h++) {
                if (invhtml.indexOf(q.items[h].imgURL) > -1 && invhtml.indexOf(q.items[h].name) > -1){
                    q.items[h].isObtained = true;
                    arrPShopSearch[h].innerHTML = arrPShopSearch[h].innerHTML.replace('background-color:#efefef;color:#666666;', 'background-color:Green;color:#ffffff;');
                }
            }
        }
        
        if (obtainedAllItems(q.items)) {
            if (q.type == 0)
                getButton(section.getElementsByTagName('input'), q.qData.btnFinish).click();
            else if (q.type == 1)
            	getButtonURL(section.getElementsByTagName('a'), q.qData.btnFinish).click();
        }
        else{
            for (var i = 0; i < q.items.length; i++) {
                $.get("http://subeta.net/ushop.php?act=dosearch&itemname=" + escape(q.items[i].name) + "&type=shops", function(data){
                    
                    var searchItem = data.substring(data.indexOf('Search results for <b>') + 22);
                    searchItem = searchItem.substring(0, searchItem.indexOf('</b>'));
                    var htmlsrc = data.substring(data.indexOf('<b>Shop Name</b>'));
                    htmlsrc = htmlsrc.substring(0, htmlsrc.indexOf('Agoge, Inc. All Rights Reserved.</p>'));
                    
                    var j = getIndex(q.items, searchItem);
                    
                    // Availability in Subeta Shops
                    if (htmlsrc.indexOf('a href=/shop.php?shopid=') > -1) {
                        q.items[j].shopID = htmlsrc.substring(htmlsrc.indexOf('a href=/shop.php?shopid=') + 24);
                        q.items[j].shopID = q.items[j].shopID.substring(0, q.items[j].shopID.indexOf('>'));
                        q.items[j].shopName = htmlsrc.substring(htmlsrc.indexOf('a href=/shop.php?shopid=') + 25 + q.items[j].shopID.length);
                        q.items[j].shopName = q.items[j].shopName.substring(0, q.items[j].shopName.indexOf('</a></td>'));
                        q.items[j].shopPrice = htmlsrc.substring(htmlsrc.indexOf('a href=/shop.php?shopid=') + 24);
                        q.items[j].shopPrice = q.items[j].shopPrice.substring(q.items[j].shopPrice.indexOf('<td>') + 5);
                        q.items[j].shopPrice = q.items[j].shopPrice.substring(0, q.items[j].shopPrice.indexOf('</td>'));
                    }
                    
                    // Availability in User Shops
                    if (htmlsrc.indexOf('<a href=ushop.php?shopid=') > -1) {
                        q.items[j].ushopURL = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 8);
                        q.items[j].ushopURL = q.items[j].ushopURL.substring(0, q.items[j].ushopURL.indexOf('>'));
                        q.items[j].ushopID = q.items[j].ushopURL.substring(q.items[j].ushopURL.indexOf('ushop.php?shopid=') + 17);
                        while(isMyShopId(arrMyShops, q.items[j].ushopID) == true) {
                            htmlsrc = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 8);
                            q.items[j].ushopURL = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 8);
                            q.items[j].ushopURL = q.items[j].ushopURL.substring(0, q.items[j].ushopURL.indexOf('>'));
                            htmlsrc = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 8);
                            q.items[j].ushopID = q.items[j].ushopURL.substring(q.items[j].ushopURL.indexOf('ushop.php?shopid=') + 17);
                        }
                        q.items[j].ushopName = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 9 + q.items[j].ushopURL.length);
                        q.items[j].ushopName = q.items[j].ushopName.substring(0, q.items[j].ushopName.indexOf('</a></td>'));
                        q.items[j].ushopPrice = htmlsrc.substring(htmlsrc.indexOf('<a href=ushop.php?shopid=') + 25);
                        q.items[j].ushopPrice = q.items[j].ushopPrice.substring(q.items[j].ushopPrice.indexOf('<td>') + 5);
                        q.items[j].ushopPrice = q.items[j].ushopPrice.substring(0, q.items[j].ushopPrice.indexOf('</td>'));
                        
                        q.items[j].itemid = htmlsrc.substring(htmlsrc.indexOf('name="itemid" value="') + 21);
                        q.items[j].itemid = q.items[j].itemid.substring(0, q.items[j].itemid.indexOf('" OnClick="return confirm'));
                        q.items[j].cv = htmlsrc.substring(htmlsrc.indexOf('name="cv" value="') + 17);
                        q.items[j].cv = q.items[j].cv.substring(0, q.items[j].cv.indexOf('" /><input type="hidden"'));
                        q.items[j].vercode = htmlsrc.substring(htmlsrc.indexOf('name="vercode" value="') + 22);
                        q.items[j].vercode = q.items[j].vercode.substring(0, q.items[j].vercode.indexOf('" /></form></td></tr>'));
                        
                        arrPShopSearch[j].innerHTML = arrPShopSearch[j].innerHTML.replace('<b id="aq_price"></b>', '<b id="aq_price">' + q.items[j].ushopPrice + '</b>');
                    }
                    else {
                        if (q.type == 0)
                			getButton(section.getElementsByTagName('input'), q.qData.btnQuit).click();
                        else if (q.type == 1)
                        	getButtonURL(section.getElementsByTagName('a'), q.qData.btnQuit).click();
                    }
                    
                    if (q.mode == 1 || q.mode == 2) {
                        // Quest is based on OAP or Rarity
                        $.get("http://subeta.net/hover_item.php?name=" + escape(q.items[j].name) + "&type=shops", function(datastr){
                            q.items[j].rarity = datastr.split("'>");
                            q.items[j].rarity = q.items[j].rarity[2].split("</span>");
                            q.items[j].rarity = q.items[j].rarity[0];
                            
                            q.items[j].oap = datastr.substring(datastr.indexOf('<b>Overall Average Price</b>: ') + 30);
                            q.items[j].oap = q.items[j].oap.substring(0, q.items[j].oap.indexOf('<br'));
                            
                            q.items[j].sectionSrc.innerHTML = q.items[j].sectionSrc.innerHTML.replace('border:2px #efefef solid;', 'border:2px #' + getRarityColor(q.items[j].rarity) + ' solid;');
                            
                            if (q.mode == 1)
                            {
                            	q.items[j].sectionSrc.innerHTML = q.items[j].sectionSrc.innerHTML.replace('<b id="aq_oap"></b>', '<b id="aq_oap">' + q.items[j].oap + ' sP</b>');
                                if (isQuestComplete(q.items) == true) {
                                    var limit = getEstimatedPayout(q.url, q.items);
                                    var total = getTotalPrice(q.items);
                                    
                                    if (total <= limit) {
                                        if (onHandSP < total)
                                        	alert('You don\'t have enough sP for this quest!');
                                        else
                                        	doQuest(q); 
                                    }
                                    else {
                                        for (var l = 0; l < arrPShopSearch.length; l++) {
                                            arrPShopSearch[l].innerHTML = arrPShopSearch[l].innerHTML.replace('background-color:#efefef;color:#666666;', 'background-color:darkorange;color:#ffffff;');
                                        }
                                        if (q.type == 0) 
                                            getButton(section.getElementsByTagName('input'), q.qData.btnQuit).click();
                                        else if (q.type == 1)
                                        	window.location.href = (getButtonURL(section.getElementsByTagName('a'), q.qData.btnQuit)).href;
                                    }
                                }
                            }
                            else if (q.mode == 2)
                            {
                                q.items[j].sectionSrc.innerHTML = q.items[j].sectionSrc.innerHTML.replace('<b id="aq_rarity"></b>', '<b id="aq_rarity">' + q.items[j].rarity + '</b>');
                                if (isQuestComplete(q.items) == true) {
                                    var total = getTotalPrice(q.items);
                                    var rarityIndex = getRarityIndex(q.items);
                                    
                                    if (total <= q.upperLimit[rarityIndex]){
										if (onHandSP < total)
											alert('You don\'t have enough sP for this quest!');
                                        else
                                        	doQuest(q);
                                    }
                                    else {
                                        for (var l = 0; l < arrPShopSearch.length; l++) {
                                            arrPShopSearch[l].innerHTML = arrPShopSearch[l].innerHTML.replace('background-color:#efefef;color:#666666;', 'background-color:darkorange;color:#ffffff;');
                                        }
                                        if (q.type == 0) 
                                            getButton(section.getElementsByTagName('input'), q.qData.btnQuit).click();
                                        else if (q.type == 1)
                                        	window.location.href = (getButtonURL(section.getElementsByTagName('a'), q.qData.btnQuit)).href;
                                    }
                                }
                            }
                        });
                    }
                    else {
                        var complete = isQuestComplete(q.items);
                        var total = getTotalPrice(q.items);
                        
                        if (complete == true) {
                            
                            if (total <= q.upperLimit[q.items.length - 1]) {
                                if (onHandSP < total)
									alert('You don\'t have enough sP for this quest!');
                                else
                                	doQuest(q);
                            }
                            else {
                                for (var l = 0; l < arrPShopSearch.length; l++) {
                                    arrPShopSearch[l].innerHTML = arrPShopSearch[l].innerHTML.replace('background-color:#efefef;color:#666666;', 'background-color:darkorange;color:#ffffff;');
                                }
                                if (q.type == 0) 
                                    getButton(section.getElementsByTagName('input'), q.qData.btnQuit).click();
                                else if (q.type == 1)
                                	window.location.href = (getButtonURL(section.getElementsByTagName('a'), q.qData.btnQuit)).href;
                            }
                        }
                    }
                });
            }
        }
    });
}
else if (html.indexOf('images/shinwa.gif') > -1) {
    if (html.indexOf('You\'ve managed to find all the pieces to my bracelet!') > -1) 
        window.location.href = 'http://subeta.net/explore/goddess.php';
    else if (html.indexOf('remaining until you can do another Shinwa Quest!') > -1) 
        setTimeout('window.location.href = "http://subeta.net/explore/goddess.php";', getMilliSecondsLeft(section));
    else
    	window.location.href = getQuestURL(section);
}
else if (html.indexOf(q.qData.txtFinish) > -1) {
    if (html.indexOf('explore/goddess.php') > -1)
        window.location.href = 'http://subeta.net/explore/goddess.php';
    else
    	window.location.href = q.url;
}
else if (html.indexOf(q.qData.txtNoQuest) > -1) {
    window.location.href = q.url;
}
else if (html.indexOf(q.qData.txtError) > -1) {
    window.location.href = q.url;
}
else if (html.indexOf(q.qData.txtNoTime) > -1) {
    window.location.href = q.url;
}
else if (html.indexOf(q.qData.txtMax) > -1) {
    alert('Quest Complete!');
}

// ENDREGION: NAVIGATION

// STARTREGION: FUNCTIONS
    
function getOnHandSP() {
    var arrAnchors = document.getElementsByTagName('a');
    for (var i = 0; i < arrAnchors.length; i++) {
        if (arrAnchors[i].href.indexOf('/explore/vaults.php?vault=bank') > -1 && arrAnchors[i].getAttribute('class') == 'widget-login-sp')
            return convertPriceToInt(arrAnchors[i].innerHTML);
    }
}
    
function getMilliSecondsLeft(sec) {
    var scrap = sec.getElementsByClassName('alert-error')[0].innerHTML;
    var hr = scrap.substring(scrap.indexOf('You have ') + 9, scrap.indexOf(' Hours, '));
    var min = scrap.substring(scrap.indexOf(' Hours, ') + 8, scrap.indexOf(' minutes, and '));
    var sec = scrap.substring(scrap.indexOf(' minutes, and ') + 14, scrap.indexOf(' seconds remaining until'));
    
    var shinwa_counter = 0;
    var totalSeconds = (parseInt(hr)*60*60 + parseInt(min)*60 + parseInt(sec));
    setInterval(function() {
        var secondsLeft = totalSeconds - shinwa_counter;
        if (secondsLeft >= 0) {
            var hLeft = parseInt(secondsLeft / 3600);
            var mLeft = parseInt((secondsLeft - hLeft * 3600) / 60);
            var sLeft = parseInt((secondsLeft - hLeft * 3600 - mLeft * 60));
            document.getElementsByClassName('alert-error')[0].innerHTML = document.getElementsByClassName('alert-error')[0].innerHTML.replace(document.getElementsByClassName('alert-error')[0].innerHTML, hLeft + 'Hour(s) ' + mLeft + 'Minute(s) ' + sLeft + 'Second(s) Left');
            shinwa_counter += 1;
        }
    }, 1000);
    
    return ((totalSeconds + 5) * 1000);
}
    
function getQuestURL(sec){
    var arrAnchors = sec.getElementsByTagName('a');
    for (var i = 0; i < arrAnchors.length; i++) {
        if (arrAnchors[i].href.indexOf('explore/wizard_quests.php') > -1 || arrAnchors[i].href.indexOf('quests.php/wizard') > -1 || arrAnchors[i].href.indexOf('quests.php/library') > -1 || arrAnchors[i].href.indexOf('quests.php/maleria') > -1 || arrAnchors[i].href.indexOf('explore/maleria.php') > -1 || arrAnchors[i].href.indexOf('games/foodquest.php') > -1 || arrAnchors[i].href.indexOf('quests.php/pete') > -1 ) {
            if (arrAnchors[i].href.indexOf('quests.php/maleria') > -1)
                return 'http://subeta.net/quests.php/maleria';
            else
                return arrAnchors[i].href;
        }
    }
    return null;
}
    
function getRarityIndex(items) {
    var highestRarity = 0;
    for (var i = 0; i < items.length; i++) {
        var rarity = 0;
        switch(items[i].rarity.trim()) {
            case 'Rare': rarity = 1; break;
            case 'Super Rare': rarity = 2; break;
        }
        if (rarity > highestRarity)
            highestRarity = rarity;
    }
    return highestRarity;
}
    
function getTotalPrice(items) {
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total += convertPriceToInt(items[i].ushopPrice);
    }
    return total;
}
    
function isQuestComplete(items) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].ushopPrice == 0)
            return false;
    }
    return true;
}
    
function getEstimatedPayout(url, items) {
    var estimatedPayout = 0;
    for (var i = 0; i < items.length; i++)
        estimatedPayout += convertPriceToInt(items[i].oap);
    
    if (url.indexOf('cinthia') > -1) 
        estimatedPayout *= 1.35;
    else if (url.indexOf('saggitarius') > -1)
       	estimatedPayout *= 1.15;
    else if (url.indexOf('cursed') > -1) {
        if (q.morinori == 1) {		// Mori (Dark)
        	if (getTotalPrice(items) < 1000000)
            	estimatedPayout = (estimatedPayout * 0.8);
            else
                estimatedPayout = (estimatedPayout * 0.6);
        }
        else if (q.morinori == 2) {	// Nori (Light)
            if (getTotalPrice(items) < 1000000)
            	estimatedPayout = (estimatedPayout * 0.8);
            else
                estimatedPayout = (estimatedPayout * 0.6);
        }
    }
    
    return estimatedPayout;
}
    
function getRarityColor(rarity) {
    switch (rarity) {
        case 'Really Common': return '999999'; break;
        case 'Mundane': return '666666'; break;
        case 'Common': return '333333'; break;
        case 'Normal': return '000000'; break;
        case 'Super Rare': return 'dd00ff'; break;
        case 'Rare': return '0099ff'; break;
        case 'Retired': return '6da877'; break;
        case 'Special': return '00cc00'; break;
        case 'Game Prize': return '99cc99'; break;
    }
}
    
function doQuest(quest) {
    var first = true;
    var counter = 0;
    for (var i = 0; i < quest.items.length; i++) {
        if (quest.items[i].isObtained == false) {
            if (first == true)
            {
            	purchaseItem(quest.items[i]);
                first = false;
                counter += 1;
            }
            else
            {
                delayedPurchaseItem(quest.items[i], i);
                counter += 1;
            }
        }
    }
    
    setTimeout(function() { if (q.type == 0) { getButton(section.getElementsByTagName('input'), q.qData.btnFinish).click(); } else if (q.type == 1) { getButtonURL(document.getElementsByTagName('a'), quest.qData.btnFinish).click();} }, counter * 1000 + 1000);
}

function delayedPurchaseItem(itemdata, i) {
    setTimeout(function() { purchaseItem(itemdata); }, i * 1000);
}

function purchaseItem(itemdata) {
    var xmlhttp_custom = new XMLHttpRequest();
    xmlhttp_custom.open("POST", "/" + itemdata.ushopURL + "&act=buy", true);
    xmlhttp_custom.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp_custom.send("itemid=" + itemdata.itemid + "&cv=" + itemdata.cv + "&vercode=" + itemdata.vercode);
    itemdata.sectionSrc.innerHTML = itemdata.sectionSrc.innerHTML.replace('background-color:#efefef;color:#666666;', 'background-color:green;color:#ffffff;');
}
    
function convertPriceToInt(priceStr) {
    var cleanedStr = '';
    for (var i = 0; i < priceStr.length; i++) {
        if (priceStr[i] == '0' || priceStr[i] == '1' || priceStr[i] == '2' || priceStr[i] == '3' || priceStr[i] == '4' || priceStr[i] == '5' || priceStr[i] == '6' || priceStr[i] == '7' || priceStr[i] == '8' || priceStr[i] == '9')
            cleanedStr = cleanedStr.concat(priceStr[i]);
    }
    return(parseInt(cleanedStr));
}
    
function obtainedAllItems(items){
    for (var i = 0; i < items.length; i++) {
        if (items[i].isObtained == false)
            return false;
    }
    
    return true;
}
    
function getPShopSearch(sec, names) {
    var arrPValid = new Array();
    if (q.type == 0) {
        for (var i = 0; i < names.length; i++) {
            sec.innerHTML = sec.innerHTML.replace(names[i] + '</center>', names[i] + '<br><p><a href="http://subeta.net/ushop.php?act=dosearch&itemname=' + escape(names[i]) + '&type=shops">Shop Search</a></p></center>');
        }
    }
    var arrP = sec.getElementsByTagName('p');
    for (var i = 0; i < arrP.length; i++) {
        if (arrP[i].innerHTML.indexOf('Shop Search') > -1 && arrP[i].getElementsByTagName('a').length > 0)
            arrPValid.push(arrP[i]);
    }
    
    return arrPValid;
}
    
function getIndex(arrItems, search) {
    for (var i = 0; i < arrItems.length; i++) {
        if (arrItems[i].name == search)
            return i;
    }
    return -1;
}
    
function isMyShopId(myShopIDs, shopID) {
    for (var i = 0; i < myShopIDs.length; i++) {
        if (myShopIDs[i] == shopID)
            return true;
    }
    return false;
}
    
function getMyShopIDs(){
    var arrShopLI = document.getElementById('menu-sub-shops').getElementsByTagName('li');
    var shopIDs = new Array();
    for (var i = 0; i < arrShopLI.length; i++) {
        var shopURL = arrShopLI[i].getElementsByTagName('a')[0];
        shopIDs.push(shopURL.href.substring(shopURL.href.indexOf('myshop.php?shopid=') + 18));
    }
    return shopIDs;
}
    
function getButton(inputs, searchstring) {
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == searchstring)
            return inputs[i];
    }
}

function getButtonURL(anchors, search) {
    for (var i = 0; i < anchors.length; i++) {
        if (anchors[i].innerHTML == search)
            return anchors[i];
    }
}

function getItemNamesFromImgArray(arrImgs) {
    var names = new Array();
    for (var i = 0; i < arrImgs.length; i++) {
        if (arrImgs[i].alt != null && arrImgs[i].alt != '')
            names.push(arrImgs[i].alt);
    }
    return names;
}

function getItemImgURLsFromImgArray(arrImgs) {
    var urls = new Array();
    for (var i = 0; i < arrImgs.length; i++) {
        if (arrImgs[i].alt != null && arrImgs[i].alt != '')
            urls.push(arrImgs[i].src);
    }
    return urls;
}
    
// ENDREGION: FUNCTIONS