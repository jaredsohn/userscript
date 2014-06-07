// ==UserScript==
// @name            Enhanced Steam Community
// @author          onisuly & Deparsoul
// @description     Add some extra Functions to Steam Community
// @copyright       2014+, onisuly & Deparsoul
// @version         2014.02.25
// @icon            http://store.steampowered.com/favicon.ico
// @license         GPL version 3 or any later version
// @include         http*://steamcommunity.com/*
// @include         http*://store.steampowered.com/*
// @run-at          document-end
// @grant           none
// ==/UserScript==

/*
 *This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU General Public License as published by
 *the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 *
 *This program is distributed in the hope that it will be useful,
 *but WITHOUT ANY WARRANTY; without even the implied warranty of
 *MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *GNU General Public License for more details.
 *
 *You should have received a copy of the GNU General Public License
 *along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//下面用了一个将代码嵌入到网页中的技巧
function escMain(){

//Enhanced Steam Community 代码开始

//多语言支持
var escSteamLanguage = escGetCookie("Steam_Language");

//默认语言字符串
var escT = {
    Market           : "View cards in Market",
    MarketAll        : "All",
    MarketCard       : "Card",
    MarketBackground : "Background",
    MarketEmoticon   : "Emoticon",
    Inventory        : "View cards in my Inventory",
    Showcase         : "Card Showcase",
    EditBKG          : "Edit Background",
    BKGTips          : "Please enter your background image link:\n(resolution:1920x1200)",
    SearchFriends    : "Search Friends",
    WebChat          : "Web Chat",
    AutoBuy          : "Auto Buy",
    ViewMarket       : "View in Market",
    SellItem         : "Sell",
    BKGAlert         : "Please set a background in edit profile page first!",
    ViewBKG          : "View Background",
    ViewBKGSign      : "Profile Background",
	LibrarySearch 	: "Advanced Search"
}

//中文支持，可仿照此格式扩展其他语言
if( escSteamLanguage == "schinese" ) {
    escT.Market           = "在“市场”中查看卡牌";
    escT.MarketAll        = "全部";
    escT.MarketCard       = "卡牌";
    escT.MarketBackground = "背景";
    escT.MarketEmoticon   = "表情";
    escT.Inventory        = "在我的“库存”中查看卡牌";
    escT.Showcase         = "卡片展示橱窗";
    escT.EditBKG          = "编辑背景图";
    escT.BKGTips          = "请输入你的背景图链接:\n(分辨率:1920x1200)";
    escT.SearchFriends    = "搜索好友";
    escT.WebChat          = "网页聊天";
    escT.AutoBuy          = "自动购买";
    escT.ViewMarket       = "在市场中查看";
    escT.SellItem         = "出售";
    escT.BKGAlert         = "请先在编辑个人资料页面设置一个背景！";
    escT.ViewBKG          = "查看背景图";
    escT.ViewBKGSign      = "个人资料背景";
    escT.LibrarySearch 	  = "高级搜索";
}else if( escSteamLanguage == "tchinese" ) {
    escT.Market           = "在“市集”中查看卡片";
    escT.MarketAll        = "全部";
    escT.MarketCard       = "卡片";
    escT.MarketBackground = "背景";
    escT.MarketEmoticon   = "表情";
    escT.Inventory        = "在我的“物品庫”中查看卡片";
    escT.Showcase         = "卡片展示櫥窗";
    escT.EditBKG          = "編輯背景圖";
    escT.BKGTips          = "請輸入你的背景圖連結:\n(解析度:1920x1200)";
    escT.SearchFriends    = "搜索好友";
    escT.WebChat          = "網頁聊天";
    escT.AutoBuy          = "自動購買";
    escT.ViewMarket       = "在市場中查看";
    escT.SellItem         = "販賣";
    escT.BKGAlert         = "請先在編輯個人檔案頁面設置一個背景！";
    escT.ViewBKG          = "查看背景圖";
    escT.ViewBKGSign      = "個人檔案背景";
    escT.LibrarySearch 	  = "高级搜索";
}

if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/(id|profiles)\/.+\/gamecards\/[0-9]+/) ) {
    //某个游戏的徽章页面
    escEnhanceBadges();
}
else if ( location.href.match(/http[s]?:\/\/store\.steampowered\.com\/recommended\/friendactivity/) ) {
    //所有游戏页面
	escFriendActivity();
}
else if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/(id|profiles)\/.+\/games/) ) {
    //好友活动统计
	escLibrarySearch();
}
else if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/market\/listings\/.+/) ) {
    //市场商品页面
    escAutoBuy();
    escViewBackground();
}
else if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/market\/search\?.+/) ) {
    //市场搜索页面
    escEnhanceMarketSearch();
}
else if ( location.href.match(/http[s]?:\/\/store.steampowered.com\/agecheck\/app\/[0-9]+\//) ) {
    //年龄检查页面
    escSkipAgeCheck();
}
else if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/(id|profiles)\/.+\/friends/) ) {
    //好友页面
    escAddSearchFriends();
    escAddWebChat();
}
else if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/(id|profiles)\/.+\/inventory/) ) {
    //库存页面

    var match = location.href.match(/(#.*)\?filter=(.*)/);
    if (match) {
        location.hash = match[1];
        escApplyInventoryFilter(0, match[2]);
    }
    escEnhanceInventory();
}
else if ( location.href.match(/http[s]?:\/\/steamcommunity.com\/tradeoffer\/.+/) ) {
    //离线交易页面
    setTimeout('escEnhanceTradeOffer()', 500);
}
else if ( location.href.match( /http[s]?:\/\/steamcommunity.com\/(id|profiles)\/.+/ ) ) {
    if( document.getElementsByClassName("btn_profile_action btn_medium") ) {
        escCustomBackground();
    }
}

function escFriendActivity(){
    var originalRenderFriendActivityInternal = RenderFriendActivityInternal;
    window.RenderFriendActivityInternal = function( div, rgData, iStart, nMaxPlaytime ){
        originalRenderFriendActivityInternal( div, rgData, iStart, nMaxPlaytime );
        $J('img[src$="friendactivity_noimage.jpg"]').each(function(){
            var $img = $J(this);
            var $link = $J(this).parent();
            var match = $link.attr('href').match(/friendsthatplay\/(\d*)/);
            if (match) {
                var appid = match[1];
                $link.attr('href', 'http://store.steampowered.com/app/'+appid+'/?cc=hk');
                $img.attr('src', 'http://cdn4.steampowered.com/v/gfx/apps/'+appid+'/capsule_sm_120.jpg');
            }
        });
    }
}

function escLibrarySearch(){
    var match = location.href.match(/(id|profiles)\/(.+)\/games/);
    if (match) {
        var id = match[2];
        $J('.sectionTabs').append('<a class="sectionTab" target="_blank" href="http://steam.depar.me/LibrarySearch/#'+id+'"><span>'+escT.LibrarySearch+'</span></a>');
    }
}

function escEnhanceTradeOffer(){
    var match = location.href.match(/for_tradingcard=(\d+)_/);
    $J('#inventory_select_their_inventory').click();
    $J('#inventory_select_your_inventory').click();
    if (match) {
        var appid = match[1];
        setTimeout('TradePageSelectInventory(UserYou, 753, 0)', 5);
        setTimeout('escApplyInventoryFilter(0, "tag_filter_753_0_Game_app_'+appid+'")', 500);
        $J('#inventory_select_their_inventory, #inventory_select_your_inventory').click(function(){
            escApplyInventoryFilter(0, "tag_filter_753_0_Game_app_"+appid);
        });
    }
}

//为市场搜索添加类型选项
function escEnhanceMarketSearch() {
    var query = $J('#findItemsSearchBox').val();
    var match = query.match(/^(.*?)((Common|Rare|Uncommon) )?( ((Trading )?Card|(Profile )?Background|Emoticon))?$/i);
    if(match != null) {
        var name = match[1];
        name = name.trim();
        if(name){
            name = name.replace(/ /g,"+");
            var baseLink = "http://steamcommunity.com/market/search?q=" + name;
            $J('#market_search').after('<a href="'+baseLink+'">'+escT.MarketAll+'</a> | <a href="'+baseLink+'+Trading+Card'+'">'+escT.MarketCard+'</a> | <a href="'+baseLink+'+Profile+Background'+'">'+escT.MarketBackground+'</a> | <a href="'+baseLink+'+Emoticon'+'">'+escT.MarketEmoticon+'</a>');
        }
    }
}

//打开库存时自动激活指定过滤条件
function escApplyInventoryFilter(i, filter){
    if(filter){
        if($J('#'+filter).length)
            $J('#'+filter).click();
        else{
            ++i;
            if(i<20)
                setTimeout('escApplyInventoryFilter('+i+', "'+filter+'")', 500);
        }
    }
}

//为徽章页面添加在库存、市场、SCE查看的选项（似乎会覆盖原有链接）
function escEnhanceBadges() {
    var appid = location.href.match(/\d+(?!\w)/);
    var GameName = document.getElementsByClassName("profile_small_header_location")[1].textContent;
    var MarketLink = "http://steamcommunity.com/market/search?q=" + GameName.replace(/ /g,"+") + "+Trading+Card";
    var InventoryLink = document.getElementsByClassName("popup_menu_item header_notification_items")[0].href +"#753_6"+ "?filter=tag_filter_753_6_Game_app_"+appid;
    var ShowcaseLink = "http://www.steamcardexchange.net/index.php?gamepage-appid-"  +  appid;
    document.getElementsByClassName("gamecards_inventorylink")[0].innerHTML = "<a class='btn_grey_grey  btn_small_thin' target='_blank' href=" + MarketLink + "><span>" + escT.Market + "</span></a>" + "&nbsp;" + "<a class='btn_grey_grey  btn_small_thin' target='_blank' href=" + InventoryLink + "><span>" + escT.Inventory + "</span></a>" + "&nbsp;" + "<a class='btn_grey_grey  btn_small_thin' target='_blank' href=" + ShowcaseLink + "><span>" + escT.Showcase + "</span></a>";

    //highlight quantity
    var length = document.getElementsByClassName("badge_card_set_text_qty").length;
    for(var i = 0; i < length; ++i) {
        document.getElementsByClassName("badge_card_set_text_qty")[i].style.color = "#F00";
    }
}

function escAutoBuy() {

    var eLable = document.createElement("a");
    eLable.style.color = "#F00";
    eLable.onclick = function() {
        document.getElementById('auto_buy_checkbox').click()
    };
    eLable.innerHTML = escT.AutoBuy;

    var eCheckbox = document.createElement("input");
    eCheckbox.checked = escGetCookie("Auto_Buy") == null || escGetCookie("Auto_Buy") == "" ? false : escGetCookie("Auto_Buy");
    eCheckbox.type = "checkbox";
    eCheckbox.id = "auto_buy_checkbox";
    eCheckbox.onclick = function() {
        var status = this.checked == true ? "checked" : "";
        escSetCookie("Auto_Buy",status,365);
    };

    var eSpan = document.createElement("span");
    eSpan.className = "market_listing_filter_searchhint";
    eSpan.style.paddingLeft = "5px";

    eSpan.appendChild(eCheckbox);
    eSpan.appendChild(eLable);

    document.getElementById("market_listing_filter_form").appendChild(eSpan);

    //自动勾选同意协议
    document.getElementById("market_buynow_dialog_accept_ssa").checked="checked";

    if( escGetCookie("Auto_Buy") != "checked" ) return;
    var Count = 0;
    var LowestPrice = document.getElementsByClassName("market_listing_price market_listing_price_with_fee")[Count].textContent;
    while( LowestPrice.search(/Sold!/) != -1 ) {
        ++Count;
        LowestPrice = document.getElementsByClassName("market_listing_price market_listing_price_with_fee")[Count].textContent;
    }

    document.getElementsByClassName("item_market_action_button item_market_action_button_green")[Count].click();
    $J('#market_buynow_dialog_totals_total').parent().css({'font-size':'14px','color':'#F00','font-weight':'bold'});
    $J('#market_buynow_dialog_totals_total').css({'font-size':'14px','color':'#F00','font-weight':'bold'});
}

function escCustomBackground() {
    if( location.href.indexOf(document.getElementsByClassName("popup_menu_item")[document.getElementsByClassName("popup_menu_item").length - 1].href) == -1 ) return;

    var e = document.createElement("a");
    e.className = "btn_profile_action btn_medium";
    e.onclick = function fun() {
        var BackgroundImg = prompt( escT.BKGTips,escGetCookie("BackgroundImg") );
        if( BackgroundImg != null ) {
            if( BackgroundImg != "" ) {
                if( !document.getElementsByClassName("profile_background_image_content")[0] ) {
                    alert( escT.BKGAlert );
                    return;
                }
            }
            escSetCookie("BackgroundImg",BackgroundImg,365);
            location.href = location.href;
        }
    };
    e.innerHTML = "<span>" + escT.EditBKG + "</span>";
    document.getElementsByClassName("profile_header_actions")[0].appendChild(e);

    var BackgroundImg = escGetCookie("BackgroundImg");

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

//Cookie操作函数
function escGetCookie(c_name) {
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

function escSetCookie(c_name,value,expiredays) {
    var exdate = new Date();
    exdate.setDate( exdate.getDate() + expiredays );
    document.cookie = c_name + "=" + escape(value) + ( (expiredays == null) ? "" : "; expires=" + exdate.toGMTString() ) + ";path=/";
}

function escSkipAgeCheck() {
    escSetCookie("birthtime",-473356799,365);
    window.location = window.location;
}

function escAddSearchFriends() {
    var e = document.createElement("span");
    e.className = "btn_grey_black btn_details btn_small btn_manage_friends";
    e.innerHTML = "<span><a href='http://steamcommunity.com/actions/SearchFriends'>" + escT.SearchFriends + "</a></span>";

    document.getElementsByClassName("manage_friends_btn_ctn")[0].appendChild(e);
}

function escAddWebChat() {
    var eSpace = document.createTextNode(" ");
    document.getElementsByClassName("manage_friends_btn_ctn")[0].appendChild(eSpace);

    var e = document.createElement("span");
    e.className = "btn_grey_black btn_details btn_small btn_manage_friends";
    e.innerHTML = "<span><a href='http://steamcommunity.com/chat/'>" + escT.WebChat + "</a></span>";

    document.getElementsByClassName("manage_friends_btn_ctn")[0].appendChild(e);
}

function escEnhanceInventory() {
    window.escViewCurrentSelection = function(){
        var SelectedItem = window.g_ActiveInventory.selectedItem;
        var AppID = SelectedItem.appid;
        var MarketHashName = typeof SelectedItem.market_hash_name != 'undefined' ? SelectedItem.market_hash_name : SelectedItem.market_name;
        if( MarketHashName.match(/^(\d+-)?[A-Za-z0-9 \t\r\n\v\f\]\[!"#$%&'()*+,./\\:;<=>?@\^_`{|}~-]+$/) ) {
            window.open("http://steamcommunity.com/market/listings/" + AppID + "/" + encodeURIComponent(MarketHashName));
        }else{
            window.open("http://steamcommunity.com/market/search?q=" + encodeURIComponent(MarketHashName.match(/[^-\d]+/)));
        }
    }

    //覆盖物品信息显示函数
    var originalBuildHover = BuildHover;
    window.BuildHover = function(prefix, item, owner){
        originalBuildHover(prefix, item, owner);

        var $iteminfo = $J('.inventory_iteminfo:hidden');
        //如果可以出售
        if(item.marketable){
            var elViewButton = CreateMarketActionButton('green', 'javascript:escViewCurrentSelection()', escT.ViewMarket );
            $iteminfo.find('.item_market_actions').append( elViewButton ).show();
        }
        //查看背景大图
        if($iteminfo.text().indexOf(escT.ViewBKGSign) != -1){
            var imgUrl = $iteminfo.find('.item_desc_icon img').attr('src');
            imgUrl = imgUrl.substring( 0, imgUrl.lastIndexOf('/') );
            var imgName = $iteminfo.find('h1.hover_item_name').text();
            var newButton = $J('<div class="item_owner_actions"><a class="item_action">'+escT.ViewBKG+'</a></div>');
            newButton.click(function(){
                escGameCardArtDialog(imgName,imgUrl);
            });
            $iteminfo.find('.item_actions').append(newButton).show();
        }
    }

    //自动勾选同意协议
    document.getElementById("market_sell_dialog_accept_ssa").checked = "checked";

    var eDiv = $J('<div style="border-top: 1px solid rgb(93, 137, 44); padding-top: 10px; margin-top: 8px;"></div>');

    //引入显示价格列表所需要的样式表
    $J('head').append('<link type="text/css" rel="stylesheet" href="http://cdn.steamcommunity.com/public/css/skin_1/economy_market.css?v=1200606244">');

    $J(eDiv).append('<style>.market_listing_action_buttons{display:none;}</style><div class="market_content_block market_home_listing_table market_home_main_listing_table market_listing_table" id="searchResultsTable"><div id="searchResultsRows"></div></div>');
    $J('#market_sell_dialog .market_dialog_contents').append(eDiv);
    //document.getElementById("market_sell_dialog_input_area").appendChild(eDiv);

    //覆盖出售按钮函数
    var originalSell = window.SellCurrentSelection;
    window.SellCurrentSelection = function(){
        var result = $J("#searchResultsRows");
        result.hide();

        var SelectedItem = window.g_ActiveInventory.selectedItem;
        var AppID = SelectedItem.appid;
        var MarketHashName = typeof SelectedItem.market_hash_name != 'undefined' ? SelectedItem.market_hash_name : SelectedItem.market_name;
        if( MarketHashName.match(/^(\d+-)?[A-Za-z0-9 \t\r\n\v\f\]\[!"#$%&'()*+,./\\:;<=>?@\^_`{|}~-]+$/) ) {
            $J.getJSON("http://steamcommunity.com/market/listings/" + AppID + "/" + encodeURIComponent(MarketHashName) +"/render/?query=&start=0&count=20", function(data){
                result.html(data.results_html).slideDown('slow');
                result.prepend("0 - 20 / "+data.total_count);
            });
        }
        originalSell();
        $J('#market_sell_dialog').css('top', jQuery(window).scrollTop());//将出售框定位到顶部
    }
}

//查看背景大图
function escViewBackground() {
    if( document.getElementsByClassName("market_listing_game_name")[0].textContent.indexOf(escT.ViewBKGSign) == -1 ) return;

    var eDiv = document.createElement("div");
    eDiv.className = "item_actions";

    var eA = document.createElement("a");
    eA.className = "item_action";
    eA.textContent = escT.ViewBKG;
    var ImgUrl = document.getElementsByClassName("market_listing_largeimage")[0].childNodes[1].src;
    ImgUrl = ImgUrl.substring( 0, ImgUrl.lastIndexOf('/') );
    var ImgName = document.getElementsByClassName("market_listing_nav")[0].childNodes[3].textContent;
    eA.onclick = function() {
        escGameCardArtDialog(ImgName,ImgUrl);
    };

    eDiv.appendChild(eA);
    document.getElementsByClassName("item_desc_description")[0].appendChild(eDiv);
}

function escGameCardArtDialog( strName, strImgURL ) {
    var $Img = $J('<img/>' );
    var $Link = $J('<a/>', {href: strImgURL, target: '_blank' } );
    var Modal = escShowDialog( strName, $Link.append( $Img ) );
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

function escShowDialog( strTitle, strDescription, rgModalParams ) {
    var deferred = new jQuery.Deferred();
    var fnOK = function() { deferred.resolve(); };

    var Modal = _BuildDialog( strTitle, strDescription, [], fnOK, rgModalParams );
    deferred.always( function() { Modal.Dismiss(); } );
    Modal.Show();

    // attach the deferred's events to the modal
    deferred.promise( Modal );

    return Modal;
}

//Enhanced Steam Community 代码结束

}

//将上面的代码插入到网页中
var script = escMain.toString();
script = script.slice(script.indexOf('{')+1, -1);
var newElem = document.createElement('script');
newElem.type = 'text/javascript';
newElem.innerHTML = script;
document.body.appendChild(newElem);
