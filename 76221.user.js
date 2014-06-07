// ==UserScript==
// @name    		Gaia - Replace premium item sparkles with color-coding
// @author  		Mindset (http://www.gaiaonline.com/p/mindset)
// @description 	Replaces Gaia's new premium item sparkles with color-coded borders and backgrounds. Among other things, lets the item name hovers work again.
// @include 		http://www.gaiaonline.com/*
// @include 		http://gaiaonline.com/*
// @require 		http://code.jquery.com/jquery-1.3.2.min.js
// @require 		http://sizzlemctwizzle.com/updater.php?id=76221
// ==/UserScript==

/* Begin deprecated script update checker code - will remove next version */
var version_timestamp = 1296117134470;
/* End Script Update Checker code */

/* add css styles for no sparkles */
var head, style, tradestyle;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }

style = document.createElement('style');
style.setAttribute('type','text/css');
style.innerHTML = " /* css for no sparkles. 'ns' = 'no sparkles', 'nh' = 'no hover border' */ \
	.premium_sparkle, .lg_premium_sparkle, #large_premium_sparkle { display: none !important; } \
	.premium_ns, .premium_nh { border: 1px solid !important; } \
	.premium_ns:hover { border: 2px solid !important; } \
	.premium_ns_AQ, .premium_ns_AQ:hover { border-color: #009670 !important; } \
	.premium_ns_CS, .premium_ns_CS:hover { border-color: #FF9B18 !important; } \
	.premium_ns_EI, .premium_ns_EI:hover { border-color: #6878FF !important; } \
	.premium_ns_MC, .premium_ns_MC:hover { border-color: #FF00FF !important; } \
	.premium_ns_RIG, .premium_ns_RIG:hover { border-color: #FF0000 !important; } \
	img.equipped.premium_ns_AQ { background:url('http://i39.tinypic.com/2h2iov8.png') no-repeat -0px 0 !important; } \
	img.equipped.premium_ns_CS { background:url('http://i39.tinypic.com/2h2iov8.png') no-repeat -30px 0 !important; } \
	img.equipped.premium_ns_EI { background:url('http://i39.tinypic.com/2h2iov8.png') no-repeat -60px 0 !important; } \
	img.equipped.premium_ns_MC { background:url('http://i39.tinypic.com/2h2iov8.png') no-repeat -90px 0 !important; } \
	img.equipped.premium_ns_RIG { background:url('http://i39.tinypic.com/2h2iov8.png') no-repeat -120px 0 !important; } \
	";

/* alternate CSS in case the images don't work out */
/*
	img.equipped.premium_ns_AQ { background-image:none !important; background-color:#00FFBE !important; } \
	img.equipped.premium_ns_CS { background-image:none !important; background-color:#FFEC6E !important; } \
	img.equipped.premium_ns_EI { background-image:none !important; background-color:#BBC2FF !important; } \
	img.equipped.premium_ns_MC { background-image:none !important; background-color:#FF9EFF !important; } \
	img.equipped.premium_ns_RIG { background-image:none !important; background-color:#FF9E9E !important; } \
	.premium_ns_RIG, .premium_ns_RIG:hover { background: url(http://mindset.99k.org/premium_RIG.png); border-color: #FF00FF #FF9B18 #009670 #6878FF !important; } 
*/

head.appendChild(style); 


/* multiple functions because there's not a lot of consistency in Gaia's current code -
i.e., where the sparkle image is placed, or whether it has a class, or anything. */

function nsInv() //for the inventory and avatar pages
{
	$("img.premium_sparkle").each(function(){
		var itemclass = $(this).attr("class");
		itemclass = itemclass.replace(/premium_sparkle/gi, "premium_ns");
		var itemimg = $(this).prev();
		itemimg.addClass(itemclass);
	});
	/* note: did not bother to do a border for the inventory detail images, 
	since the description says what kind of premium item it is anyway. */
}

function nsTrade() //for the trade page
{
	tradestyle = " /* css to adjust the trade page to the no sparkles changes */ \
	.item { height: 34px !important; width: 34px !important; } \
	#left_trade, #right_trade { width: 210px !important; } \
	#right_trade { left: 35px !important; } \
	#right_gold { left: 57px !important; } \
	";
	style.innerHTML += tradestyle;
	$("img.premium_sparkle").each(function(){
		var itemclass = $(this).attr("class");
		itemclass = itemclass.replace(/premium_sparkle/gi, "premium_ns");
		var itemimg = $(this).next();
		itemimg.addClass(itemclass);
	});
}

function nsMP() //for the marketplace
{
	if ( document.getElementById("large_premium_sparkle") != null )
	{
		var sparkleimg = $("#large_premium_sparkle").attr("src");
		var sparkletype = sparkleimg.substring(sparkleimg.lastIndexOf("_"),sparkleimg.lastIndexOf("."));
		var itemclass = "premium_nh premium_ns" + sparkletype;
		var itemimg = $("#large_premium_sparkle").next();
		itemimg.addClass(itemclass);
	}
	
	$("img.premium_sparkle").each(function(){
		var sparkleimg = $(this).attr("src");
		var sparkletype = sparkleimg.substring(sparkleimg.lastIndexOf("_"),sparkleimg.lastIndexOf("."));
		var itemclass = "premium_nh premium_ns" + sparkletype;
		var itemimg = $(this).siblings().children("img");
		itemimg.addClass(itemclass);
	});
}

function nsStore() //for the MP inventory
{
	$("img.premium_sparkle").each(function(){
		var sparkleimg = $(this).attr("src");
		var sparkletype = sparkleimg.substring(sparkleimg.lastIndexOf("_"),sparkleimg.lastIndexOf("."));
		var itemclass = "premium_nh premium_ns" + sparkletype;
		var itemimg = $(this).prev();
		itemimg.addClass(itemclass);
	});
}

function nsPro() //for profiles 
{
	style.innerHTML += " img.premium_nb { height: 28px !important; width: 28px !important; }";
	/* Has to be a different CSS class because otherwise the item images don't fit on the lines properly. 
	Resizing is a slightly half-assed method, but it looks better than negative margins or outlines. */
	$("img.premium_sparkle").each(function(){
		var sparkleimg = $(this).attr("src");
		var sparkletype = sparkleimg.substring(sparkleimg.lastIndexOf("_"),sparkleimg.lastIndexOf("."));
		var itemclass = "premium_nb premium_nh premium_ns" + sparkletype;
		var itemimg = $(this).prev();
		itemimg.addClass(itemclass);
	});
}

function nsEquip() //for the equipped items modal
{
	/* 'this' is the item image that triggered the function */
	var itemimg = $(this);
	var sparkler = itemimg.prev();
	if ( sparkler.is("img[src*='sparkle']") )
	{
		sparkler.css("display","none");
		var sparkleimg = sparkler.attr("src");
		var sparkletype = sparkleimg.substring(sparkleimg.lastIndexOf("_"),sparkleimg.lastIndexOf("."));
		var itemclass = "premium_nh premium_ns" + sparkletype;
		itemimg.addClass(itemclass);
	}
}

function nsEquipDetail() // for the equipped items modal detail
{
	/* 'this' is the sparkly image that triggered the function */
	var sparkler = $(this);
	var itemimg = sparkler.prev();
	sparkler.css("display","none");
	var sparkleimg = sparkler.attr("src");
	var sparkletype = sparkleimg.substring(sparkleimg.lastIndexOf("_"),sparkleimg.lastIndexOf("."));
	var itemclass = "premium_nh premium_ns" + sparkletype;
	itemimg.addClass(itemclass);
}

/* the equipped items modal may be on just about any page, including avatar, profile, forums, guilds, & arenas */
$("#equipped-list div.itemIcon img[src*='thumbnails']").live("DOMNodeInserted", nsEquip);
$("#itemIcon img[src*='sparkle']").live("DOMNodeInserted", nsEquipDetail);

/* load the other functions depending on what page we're on */
var loc = document.URL;

if ( loc.indexOf("gaiaonline.com/inventory") != -1 || loc.indexOf("gaiaonline.com/avatar") != -1 ) 
{
	$(window).load(nsInv);
	$("div.yui-content div.item-list").live("DOMNodeInserted", nsInv); //for the ajax tabs and pagination
}
else if ( loc.indexOf("/bank.php") != -1 )
{
	$(window).load(nsTrade);
}
else if ( loc.indexOf("gaiaonline.com/marketplace") != -1 && loc.indexOf("/showinventory") == -1 ) 
{
	$(window).load(nsMP);
}
else if ( loc.indexOf("/mystore/showinventory") != -1 )
{
	$(window).load(nsStore);
}
else if ( loc.indexOf("gaiaonline.com/p/") != -1 || loc.indexOf("gaiaonline.com/profiles/") != -1 )
{
	$(window).load(nsPro);
}

