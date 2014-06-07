// ==UserScript==
// @name       Neopets: Kad Feeder
// @namespace   userscripts.org
// @grant	GM_xmlhttpRequest
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_openInTab
// @grant	GM_log
// @grant	GM_listValues
// @grant	GM_deleteValue
// @require	http://code.jquery.com/jquery-1.8.3.min.js
// @require	http://userscripts.org/scripts/source/56489.user.js
// @require	http://userscripts.org/scripts/source/63808.user.js
// @require	http://userscripts.org/scripts/source/56503.user.js
// @require	http://userscripts.org/scripts/source/56562.user.js
// @include     http://www.neopets.com/games/kadoatery/index.phtml*
// @include	http://www.neopets.com/market.phtml?type=wizard*
// @include	http://www.neopets.com/market.phtml*
// @include	http://www.neopets.com/neoboards/boardlist.phtml?board=23*
// @include	http://www.neopets.com/neoboards/topic.phtml?topic=*
// @include	http://www.neopets.com/neoboards/topic.phtml?topic=*&next=*#bottom
// @include	http://www.neopets.com/games/kadoatery/*
// @include	http://www.neopets.com/browseshop.phtml?*
// @include	http://www.neopets.com/neoboards/topic.phtml*
// ==/UserScript==

$debug = false;
$test = true;
$notTest = false;
/*$clear = true;

if($clear){
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
		GM_deleteValue(key);
	}
}*/

// USER SET - ITEM PRICE LIMIT

$perItem = 10000;

$page = document.URL;

$.urlParam = function(name){
	var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
	if (results==null){
		return null;
	}else{
		return results[1] || 0;
	}
}

function play(file) {
	var embed = document.createElement("embed");
	embed.setAttribute('src', file);
	embed.setAttribute('hidden', true);
	embed.setAttribute('autostart', true);
	document.body.appendChild(embed);
}

if($page.indexOf("type=wizard") != -1){
	if($.urlParam('submit') == "true"){
		$("form[action='market.phtml']").submit();
	}
}

$("form[action*='objects.phtml']").remove();

// Make all Kad cages open in a new link

$("a[href*='feed_kadoatie.phtml']").each(function(){
	$(this).attr('target','_blank');
});

// Remove text and BRs so you can see!

$("div:contains('The Kadoatery'):last").contents().filter(function(){ return this.nodeType == 3; }).remove();
$("div:contains('The Kadoatery'):last strong:first").nextUntil('div').hide();

// Add times board link

if(typeof GM_getValue('kadding') === 'undefined'){
	GM_setValue('kadding','false');
}

if($page.indexOf("kadoatery") != -1){
$("div:contains('The Kadoatery'):last strong:first").append(" - Main: <span id='mainTime'>" + GM_getValue('main') + "</span> | <a href='http://www.neopets.com/neoboards/boardlist.phtml?board=23&kads=1' target='_blank' id='timeTopic'>Times Board</a>  | Kadding? <a href='#' id='kadding'>" + GM_getValue('kadding') +"</a><br><br>");
}

// toggle kadding GM var

if(GM_getValue('kadding') == "false"){
$('#kadding').toggle(function() {
	GM_setValue('kadding','true');
	$(this).text(GM_getValue('kadding'));
	if($debug){GM_log("kadding: " + GM_getValue('kadding'));}
}, function() {
	GM_setValue('kadding','false');
	$(this).text(GM_getValue('kadding'));
	if($debug){GM_log("kadding: " + GM_getValue('kadding'));}
});
}else{
$('#kadding').toggle(function() {
	GM_setValue('kadding','false');
	$(this).text(GM_getValue('kadding'));
	if($debug){GM_log("kadding: " + GM_getValue('kadding'));}
}, function() {
	GM_setValue('kadding','true');
	$(this).text(GM_getValue('kadding'));
	if($debug){GM_log("kadding: " + GM_getValue('kadding'));}
});
}


// If on games board, finds kad times board and redirects

if($page.indexOf("boardlist.phtml?board=23") != -1 && $.urlParam('kads') == "1"){
	$timesBoard = $("td:contains('Kadoatery Feeding Times'):last a:first").attr("href");
	$timesURL = "http://www.neopets.com/neoboards/" + $timesBoard + "&kads=1";
	window.location.href = $timesURL;
}

// Goes to bottom of last page

if($page.indexOf("?topic=") != -1){
	$lastPage = $("td:contains('Pages:'):last a:last").prev().attr("href");
	if($.urlParam('kads') == "1"){
		$timesBoard = $lastPage + "#bottom";
		GM_setValue("fullTopic","http://www.neopets.com/neoboards/" + $timesBoard);
		window.location.href = $timesBoard;
	}
}

// get timeTopic

HttpRequest.open({
	"method":"get",
	"url": "http://www.neopets.com/neoboards/boardlist.phtml?board=23",
	"onsuccess":function(params)	// don't confuse "onsuccess" and "onload"! "onload" doesn't exist here
	{
		var response2 = params.response.text; // raw, text, xml, json
		$topic = $(response2).find("td:contains('Feeding Times'):last a:first").attr("href");
		HttpRequest.open({
			"method":"get",
			"url": "http://www.neopets.com/neoboards/" + $topic,
			"onsuccess":function(params)	// don't confuse "onsuccess" and "onload"! "onload" doesn't exist here
			{
				var response3 = params.response.text; // raw, text, xml, json
				$lastTopic = $(response3).find("td:contains('Pages:'):last a:last").prev().attr("href");
				// check if it's only one page
				if(typeof $lastTopic === 'undefined'){
					$lastTopic = $topic;
				}
				GM_setValue('timeTopic',"http://www.neopets.com/neoboards/" + $lastTopic + "#bottom");
			}
		}).send();
		if($debug){GM_log("topic: " + GM_getValue('timeTopic'));}
		$("#timeTopic").attr("href",GM_getValue('timeTopic'));
	}
}).send();


// get mainTime
$full = GM_getValue('timeTopic');

HttpRequest.open({
	"method":"get",
	"url": $full,
	"onsuccess":function(params)	// don't confuse "onsuccess" and "onload"! "onload" doesn't exist here
	{
		var response = params.response.text; // raw, text, xml, json
		var last = $(response).find(".topic:contains('main'):last").text();
		if($debug){GM_log("last: " + last);}
		var main = last.match(/[0-5]+[0-9]/g);
		if(main == null){
			var last2 = $(response).find(".topic:contains('ain'):eq(-1)").text();
			main = last2.match(/[0-5]+[0-9]/g);
		}
		$mainTime = main[0].replace(/ /g,'');
		GM_setValue('main',$mainTime);
		$("#mainTime").text($mainTime);
	}
}).send();

// GM_log(GM_getValue('timeTopic'));

if(window.location.href.indexOf("kadoatery/index.phtml") != -1 && GM_getValue('kadding') == "true"){
	var t=setInterval(function(){
		$time = $("td[id='nst']").text();
		$currentTime = $time.split(":");
		$seconds = $currentTime[2].split(" ");
		$seconds = Number($seconds[0]);
		if(Number($currentTime[1]) == GM_getValue('main')){
			if($seconds >= 17 && $seconds < 20){
				// alert("time to feed!");
				play("http://www.soundjay.com/button/beep-8.wav");
				if($seconds == "20"){clearInterval(t);}
			}
		}
	},1000);
}

// buy item in shop
if($notTest){
if(window.location.href.indexOf("browseshop.phtml") != -1 && GM_getValue('kadding') == "true") {
	if($debug){GM_log("in shop");}
	if(window.location.href.indexOf("buy_obj_info_id=") != -1) {
		if($debug){GM_log("buy_obj_info_id set");}
		$url = $("div tbody img[src*='http://images.neopets.com/items/']:first").parent().attr('href');
		$item = $("div tbody img[src*='http://images.neopets.com/items/']:first").parent().next().next().text();
		/*if(typeof GM_getValue('oldStock') === 'undefined'){GM_setValue("oldStock",$("div tbody img[src*='http://images.neopets.com/items/']:first").parent().next().next().next().text());}*/
		$itemStock = $("div tbody img[src*='http://images.neopets.com/items/']:first").parent().next().next().next().text();
		if($debug){GM_log($url);}
		$buy = "http://www.neopets.com/" + $url;
		if($item == GM_getValue('itemName')){
			document.body.appendChild(document.createElement("form"));
			document.forms[document.forms.length-1].action = $buy;
			document.forms[document.forms.length-1].method = "post";
			document.forms[document.forms.length-1].submit();
			GM_openInTab(GM_getValue('kadURL') + "&lookedup=true");
			// document.title = "Item Bought!";
		}
		// $betterURL = split(GM_getValue('kadURL'),"&");
		// window.location.href = GM_getValue('kadURL') + "&lookedup=true";
	}
}
}

// shopwizard when kad is true
/*
if($page == "http://www.neopets.com/market.phtml" && GM_getValue('kadding') == "true"){
	if($("b:contains('I did not find anything.')").text().length != 0 && $page == "http://www.neopets.com/market.phtml"){
		alert("UB");
		window.location.href = "http://www.neopets.com/games/kadoatery/index.phtml";
	}else{
		$firstShop = $("tbody:contains('Shop Owner'):last tr:eq(1) td:eq(0) a").attr("href");
		$shopURL = "http://www.neopets.com" + $firstShop;
		$itemPrice = $("tbody:contains('Shop Owner'):last tr:eq(1) td:last b").text();
		$itemPrice = $itemPrice.replace(' NP','');
		$itemPrice = $itemPrice.replace(',','');
		if($itemPrice <= $perItem){
			window.location.href = $shopURL;
		}else{
			alert("Too Expensive!");
			window.location.href = "http://www.neopets.com/games/kadoatery/index.phtml";
		}
	}
}
*/

// Checks to see kad hasn't been fed, gets item name and makes SW link, opening in tab.

if($page.indexOf("feed_kadoatie") != -1 && GM_getValue('kadding') == "true"){
	if($("*:contains('has already been fed')").text().length != 0 || $("*:contains('It looks like you've already fed a Kadoatie.')").text().length != 0 || $("*:contains('Hoorah!')").text().length != 0 || ($.urlParam('lookedup') == "true" || $.urlParam('lookedup') == "null")){
		// kad has been fed, you've already fed, you've already looked it up
	}else{
		$itemName = $('strong:last').text();
		GM_setValue('kadURL',$page);
		if($debug){GM_log("kadURL: " + GM_getValue('kadURL'));}
		GM_setValue('itemName',$itemName);
		$item = $itemName.replace(/ /g,'+');
		if($debug){GM_log("itemName: " + $itemName);}
		if($notTest){
		//	GM_openInTab("http://www.neopets.com/market.phtml?type=wizard&string=" + $itemName +"&submit=true");
			window.location.href = "http://www.neopets.com/market.phtml?type=wizard&string=" + $itemName +"&submit=true";
		}
		if($test){
			Wizard.find({	//	<--- http://userscripts.org/scripts/show/56503
				"text" : $itemName,
				"attempts" : 2,
				"onsuccess" : function (obj) {
					if (obj.list.length) // wizard : first link exists
					setTimeout(Shop.list, 250, {
						"link" : obj.list[0].Link, // /browseshop.phtml
						"onsuccess" : function (obj2) {
						// first link should be the searched item, but it is not guaranteed
							if (obj2.list.length && obj2.list[0].Id == obj.list[0].Id) {
								obj2.link = obj2.list[0].Link;
								obj2.onsuccess = function (obj2) {
									alert("Item bought successfully!");
									window.location.reload(true);
								};
								obj2.onerror = function (obj2) {
									alert(obj2.message.textContent);
								};
								if(obj2.list[0].Price <= $perItem){
									setTimeout(Shop.buy, 250, obj2);
									
								}else{
									alert("too expensive");
									window.location.href = "http://www.neopets.com/games/kadoatery/index.phtml"
								}
							} else {
								alert(obj2.message && obj2.message.textContent || "Unknown error (1)");
							}
						}
					});
					else {
						alert(obj.message && obj.message.textContent || "Unknown error (0)");
					}
				}
			});
		}
	}
}
//wraps foods with sw links
/*
$("td:contains('is very sad.')").each(function(){
	$itemName = $(this).find('strong:last').text();
	$itemName = $itemName.replace(/ /g,'+');
	$item = $(this).find('strong:last').wrap("<a href='http://www.neopets.com/market.phtml?type=wizard&string=" + $itemName +"&submit=true' target='_blank'>");
});
*/