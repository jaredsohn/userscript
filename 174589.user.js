// ==UserScript==
// @name            Enhanced Steam Community for Chrome
// @author          onisuly
// @description     Add some extra Functions to Steam Community
// @copyright       2013+, onisuly
// @version         2013.08.06
// @icon            http://store.steampowered.com/favicon.ico
// @license         GPL version 3 or any later version
// @include         http*://steamcommunity.com/*
// @include         http*://store.steampowered.com/*
// @run-at          document-end
// @grant           unsafeWindow
// @namespace       http://userscripts.org/users/501327
// @downloadURL     http://userscripts.org/scripts/source/174589.user.js
// @updateURL       http://userscripts.org/scripts/source/174589.meta.js
// ==/UserScript==

var SteamLanguage = getCookie("Steam_Language");

var InventoryText = new String();
var MarketText = new String();
var ShowcaseText = new String();
var EditBKGText = new String();
var BKGTipsText = new String();
var SearchFriendsText = new String();
var WebChatText = new String();
var AutoBuyText = new String();
var CheckPriceText = new String();
var ViewMarketText = new String();
var SellItemText = new String();
var BKGAlertText = new String();
var ViewBKGText = new String();
var ViewBKGSign = new String();

if( SteamLanguage == "schinese" ) {
	InventoryText = "在我的“库存”中查看卡牌";
	MarketText = "在“市场”中查看卡牌";
	ShowcaseText = "卡片展示橱窗";
	EditBKGText = "编辑背景图";
	BKGTipsText = "请输入你的背景图链接:\n(分辨率:1920x1200)";
	SearchFriendsText = "搜索好友";
	WebChatText = "网页聊天";
	AutoBuyText = "自动购买";
	CheckPriceText = "查看当前市场价格";
	ViewMarketText = "在市场中查看";
	SellItemText = "出售";
	BKGAlertText = "请先在编辑个人资料页面设置一个背景！";
	ViewBKGText = "查看背景图";
	ViewBKGSign = "个人资料背景";
}
else {
	MarketText = "View cards in Market";
	InventoryText = "View cards in my Inventory";
	ShowcaseText = "Card Showcase";
	EditBKGText = "Edit Background";
	BKGTipsText = "Please enter your background image link:\n(resolution:1920x1200)";
	SearchFriendsText = "Search Friends";
	WebChatText = "Web Chat";
	AutoBuyText = "Auto Buy";
	CheckPriceText = "Check Current Price in Market";
	ViewMarketText = "View in Market";
	SellItemText = "Sell";
	BKGAlertText = "Please set a background in edit profile page first!";
	ViewBKGText = "View Background";
	ViewBKGSign = "Profile Background";
}

if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/(id|profiles)\/.+\/gamecards\/[0-9]+/) ) {
	enhanceBadges();
}
else if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/market\/listings\/.+/) ) {
	autoBuy();
	viewBackground();
}
else if ( location.href.match(/http[s]?:\/\/store.steampowered.com\/agecheck\/app\/[0-9]+\//) ) {
	skipAgeCheck();
}
else if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/(id|profiles)\/.+\/friends/) ) {
	addSearchFriends();
	addWebChat();
}
else if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/(id|profiles)\/.+\/inventory/) ) {
	enhanceInventory();
}
else if ( location.href.match( /http[s]?:\/\/steamcommunity.com\/(id|profiles)\/.+/ ) ) {
	if( document.getElementsByClassName("btn_profile_action btn_medium") ) {
		customBackground();
	}
}

function enhanceBadges() {
	var GameName = document.getElementsByClassName("profile_small_header_location")[1].textContent;
	var MarketLink = "http://steamcommunity.com/market/search?q=" + GameName.replace(/ /g,"+") + "+Card";
	var InventoryLink = document.getElementsByClassName("popup_menu_item header_notification_items")[0].href + "#753_6";
	ShowcaseLink = "http://www.steamcardexchange.net/index.php?gamepage-appid-"  +  location.href.match(/\d+\/(?!\w)/);
	document.getElementsByClassName("gamecards_inventorylink")[0].innerHTML = "<a class='btn_grey_grey  btn_small_thin' target='_blank' href=" + MarketLink + "><span>" + MarketText + "</span></a>" + "&nbsp;" + "<a class='btn_grey_grey  btn_small_thin' target='_blank' href=" + InventoryLink + "><span>" + InventoryText + "</span></a>" + "&nbsp;" + "<a class='btn_grey_grey  btn_small_thin' target='_blank' href=" + ShowcaseLink + "><span>" + ShowcaseText + "</span></a>";
	
	//highlight quantity
	var length = document.getElementsByClassName("badge_card_set_text_qty").length;
	for(var i = 0; i < length; ++i) {
		document.getElementsByClassName("badge_card_set_text_qty")[i].style.color = "#F00";
	}
}

function autoBuy() {
	
	var eLable = document.createElement("a");
	eLable.style.color = "#F00";
	eLable.onclick = function() {
		document.getElementById('auto_buy_checkbox').click()
	};
	eLable.innerHTML = AutoBuyText;
	
	var eCheckbox = document.createElement("input");
	eCheckbox.checked = getCookie("Auto_Buy") == null || getCookie("Auto_Buy") == "" ? false : getCookie("Auto_Buy");
	eCheckbox.type = "checkbox";
	eCheckbox.id = "auto_buy_checkbox";
	eCheckbox.onclick = function() {
		var status = this.checked == true ? "checked" : "";
		setCookie("Auto_Buy",status,365);
	};
	
	var eSpan = document.createElement("span");
	eSpan.className = "market_listing_filter_searchhint";
	eSpan.style.paddingLeft = "5px";
	
	eSpan.appendChild(eCheckbox);
	eSpan.appendChild(eLable);
	
	document.getElementById("market_listing_filter_form").appendChild(eSpan);
	
	
	
	if( getCookie("Auto_Buy") != "checked" ) return;
	var Count = 0;
	var LowestPrice = document.getElementsByClassName("market_listing_price market_listing_price_with_fee")[Count].textContent;
	while( LowestPrice.search(/Sold!/) != -1 ) {
		++Count;
		LowestPrice = document.getElementsByClassName("market_listing_price market_listing_price_with_fee")[Count].textContent;
	}
	
	document.getElementsByClassName("item_market_action_button item_market_action_button_green")[Count].click();
	document.getElementById("market_buynow_dialog_accept_ssa").checked="checked";
	document.getElementsByClassName("market_dialog_totals_label")[4].innerHTML = "<font style='font-size:14px;color:#F00;font-weight:bold'>" + document.getElementsByClassName("market_dialog_totals_label")[4].innerHTML + "</font>";
	document.getElementById("market_buynow_dialog_totals_total").innerHTML = "<font style='font-size:14px;color:#F00;font-weight:bold'>" + document.getElementById("market_buynow_dialog_totals_total").innerHTML + "</font>";
}

function customBackground() {
	if( location.href.indexOf(document.getElementsByClassName("popup_menu_item")[document.getElementsByClassName("popup_menu_item").length - 1].href) == -1 ) return;
	
	var e = document.createElement("a");
	e.className = "btn_profile_action btn_medium";
	e.onclick = function fun() { setBackground(); };
	e.innerHTML = "<span>" + EditBKGText + "</span>";
	document.getElementsByClassName("profile_header_actions")[0].appendChild(e);
	
	var BackgroundImg = getCookie("BackgroundImg");
	
	if( BackgroundImg != null && BackgroundImg != "" ) {
		if( !document.getElementsByClassName("profile_background_image_content")[0] ) {
			return;
		}
		else {
			document.getElementsByClassName("profile_background_image_content")[0].setStyle({backgroundImage: "url( " + BackgroundImg + ")"});
			document.getElementsByClassName("no_header profile_page has_profile_background")[0].setStyle({backgroundImage: "url( " + BackgroundImg + ")"});
		}
	}
}

function setBackground() {
	var BackgroundImg = prompt( BKGTipsText,getCookie("BackgroundImg") );
	if( BackgroundImg != null ) {
		if( BackgroundImg != "" ) {
			if( !document.getElementsByClassName("profile_background_image_content")[0] ) {
				alert( BKGAlertText );
				return;
			}
		}
		setCookie("BackgroundImg",BackgroundImg,365);
		location.href = location.href;
	}
}


function getCookie(c_name) {
	if (document.cookie.length > 0) { 
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) { 
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";",c_start);
			if(c_end == -1) c_end = document.cookie.length;
			return unescape( document.cookie.substring(c_start,c_end) );
		}
	}
	return ""
}

function setCookie(c_name,value,expiredays) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays );
	document.cookie = c_name + "=" + escape(value) + ( (expiredays == null) ? "" : "; expires=" + exdate.toGMTString() ) + ";path=/";
}

function skipAgeCheck() {
	setCookie("birthtime",-473356799,365);
	unsafeWindow.location = unsafeWindow.location;
}

function addSearchFriends() {
	var e = document.createElement("span");
	e.className = "btn_grey_black btn_details btn_small btn_manage_friends";
	e.innerHTML = "<span><a href='http://steamcommunity.com/actions/SearchFriends'>" + SearchFriendsText + "</a></span>";

	document.getElementsByClassName("manage_friends_btn_ctn")[0].appendChild(e);
}

function addWebChat() {
	var eSpace = document.createTextNode(" ");
	document.getElementsByClassName("manage_friends_btn_ctn")[0].appendChild(eSpace);
	
	var e = document.createElement("span");
	e.className = "btn_grey_black btn_details btn_small btn_manage_friends";
	e.innerHTML = "<span><a href='http://steamcommunity.com/chat/'>" + WebChatText + "</a></span>";

	document.getElementsByClassName("manage_friends_btn_ctn")[0].appendChild(e);
}

function enhanceInventory() {
	
	unsafeWindow.PopulateMarketActions = function(elActions, item) {
		elActions.update('');
		if ( !item.marketable || ( item.is_currency && CurrencyIsWalletFunds( item ) ) )
		{
			elActions.hide();
			return;
		}
	
		if ( typeof(g_bViewingOwnProfile) != 'undefined' && g_bViewingOwnProfile )
		{
			var elSellButton = CreateMarketActionButton('green', 'javascript:SellCurrentSelection()', SellItemText );
			var elViewButton = CreateMarketActionButton('green', '#', ViewMarketText );
			elViewButton.removeAttribute("href");
			elViewButton.onclick = function(){
				var SelectedItem = unsafeWindow.g_ActiveInventory.selectedItem;
				var AppID = SelectedItem.appid;
				var MarketHashName = typeof SelectedItem.market_hash_name != 'undefined' ? SelectedItem.market_hash_name : SelectedItem.market_name;
				if( MarketHashName.match(/^(\d+-)?[A-Za-z0-9 \t\r\n\v\f\]\[!"#$%&'()*+,./\\:;<=>?@\^_`{|}~-]+$/) ) {
					unsafeWindow.open("http://steamcommunity.com/market/listings/" + AppID + "/" + MarketHashName);
				}
				else {
					unsafeWindow.open("http://steamcommunity.com/market/search?q=" + encodeURIComponent( MarketHashName.match(/[^-\d]+/) ) );
				}
			};
			elActions.appendChild( elSellButton );
			elActions.appendChild( elViewButton );
	
			if ( !g_bMarketAllowed )
			{
				var elTooltip = $('market_tip_noaccess');
				InstallHoverTooltip( elSellButton, elTooltip );
			}
		}
			else
		{
			elActions.hide();
			return;
		}
		
			
		elActions.show();
	}
	
	
	document.getElementById("market_sell_dialog_accept_ssa").checked = "checked";

	var eDiv = document.createElement("div");
	//eDiv.align = "left";
	eDiv.style.borderTop = "solid 1px";
	eDiv.style.borderTopColor = "#5D892C";
	eDiv.style.paddingTop = "10px";
	eDiv.style.marginTop = "8px";
	
	var e = document.createElement("a");
	e.className = "btn_green_white_innerfade btn_small_wide";
	e.style.opacity = 1;
	e.innerHTML = "<span>" + CheckPriceText + "</span>";
	e.onclick = function() {
		var SelectedItem = unsafeWindow.g_ActiveInventory.selectedItem;
		var AppID = SelectedItem.appid;
		var MarketHashName = typeof SelectedItem.market_hash_name != 'undefined' ? SelectedItem.market_hash_name : SelectedItem.market_name;
		if( MarketHashName.match(/^(\d+-)?[A-Za-z0-9 \t\r\n\v\f\]\[!"#$%&'()*+,./\\:;<=>?@\^_`{|}~-]+$/) ) {
			unsafeWindow.open("http://steamcommunity.com/market/listings/" + AppID + "/" + MarketHashName);
		}
		else {
			unsafeWindow.open("http://steamcommunity.com/market/search?q=" + encodeURIComponent( MarketHashName.match(/[^-\d]+/) ) );
		}
	};
	
	eDiv.appendChild(e);
	document.getElementById("market_sell_dialog_input_area").appendChild(eDiv);
}

function viewBackground() {
	if( document.getElementsByClassName("market_listing_game_name")[0].textContent.indexOf(ViewBKGSign) == -1 ) return;
	
	var eDiv = document.createElement("div");
	eDiv.className = "item_actions";
	
	var eA = document.createElement("a");
	eA.className = "item_action";
	eA.textContent = ViewBKGText;
	var ImgUrl = document.getElementsByClassName("market_listing_largeimage")[0].childNodes[1].src;
	ImgUrl = ImgUrl.substring( 0, ImgUrl.lastIndexOf('/') );
	var ImgName = document.getElementsByClassName("market_listing_nav")[0].childNodes[3].textContent;
	eA.onclick = function() {
		GameCardArtDialog(ImgName,ImgUrl);
	};
	
	eDiv.appendChild(eA);
	document.getElementsByClassName("item_desc_description")[0].appendChild(eDiv);
}

function GameCardArtDialog( strName, strImgURL )
{
	var $Img = $J('<img/>' );
	var $Link = $J('<a/>', {href: strImgURL, target: '_blank' } );
	var Modal = ShowDialog( strName, $Link.append( $Img ) );
	Modal.GetContent().hide();

	// set src after binding onload to be sure we catch it.
	$Img.load( function() { Modal.GetContent().show(); } );
	$Img.attr( 'src', strImgURL );

	Modal.OnResize( function( nMaxWidth, nMaxHeight ) {
		$Img.css( 'max-width', nMaxWidth );
		$Img.css( 'max-height', nMaxHeight );
	} );

	Modal.AdjustSizing();
}

function ShowDialog( strTitle, strDescription, rgModalParams )
{
	var deferred = new jQuery.Deferred();
	var fnOK = function() { deferred.resolve(); };

	var Modal = _BuildDialog( strTitle, strDescription, [], fnOK, rgModalParams );
	deferred.always( function() { Modal.Dismiss(); } );
	Modal.Show();

	// attach the deferred's events to the modal
	deferred.promise( Modal );

	return Modal;
}