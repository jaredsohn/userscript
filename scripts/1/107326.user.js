// ==UserScript==
// @name           Page translation
// @version        0.2.1.0725
// @description    A brief description of your script
// @author         BillWilson
// @include        http://*.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js

// ==/UserScript==
//   本軟體按照通用公共許可證授權 version 3（GPL version 3 of the License），
//   你可以按照任何你喜歡的方式使用它。 本軟體不提供任何顯式聲明的或隱含的擔保，
//   也不對使用過程中產生的任何損壞或者資料丟失承擔任何責任。

//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.

//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.

//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.



	var lang = location.pathname.substr(1,2);
	var ername = $(".user_section > .user_info >a").text();
	//http://blog.darkthread.net/post-2009-01-24-jquery-custom-selector.aspx
	$.extend($.expr[":"], { exact: function(a, i, m) { return (a.textContent || a.innerText || jQuery(a).text() || '').toLowerCase() == m[3].toLowerCase(); } });
	$("h1").css("font-family","微軟正黑體,微软雅黑");
	$("h2").css("font-family","微軟正黑體,微软雅黑");
	$("h3").css("font-family","微軟正黑體,微软雅黑");
	$("strong").css("font-family","微軟正黑體,微软雅黑");

	
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
//首頁 www.erepublik.com/en
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString()=="http://www.erepublik.com/"+lang) {

		//標題
	$("div.column:eq(0) > h1").text("戰役列表");
	$("div.column:eq(1) > h1").text("公民塗鴉牆");
	$("div#news > .title > h1:first").text("新聞分類");
		//戰爭區塊
	var NE_ours = $(".top_display h2 > strong:eq(0)").text();
	var NE_country = $(".top_display h2 > strong:eq(1)").text();
	$(".top_display h2").html("目前 <strong>"+ NE_ours+"</strong> 正在與 <strong>"+NE_country+"</strong> 交戰中。 我們將持續戰鬥成為強權");
	$("span[trigger='previous_posts']").text("看更多");
	$("#battle_listing > h4:eq(0)").text("本日戰役");
	$("#battle_listing > h4:eq(1)").text("目前本國的戰役");
	$("#battle_listing > ul > li > a > span").text("戰鬥");
	$("#battle_listing > div.rest > a:eq(0)").text("更多戰役");
	$("#battle_listing > div.rest > a:eq(1)").text("最新事件");
		//首頁新聞區塊	
	$(".mbutton:eq(0) > span").text("新人指導及教育");
	$(".mbutton:eq(1) > span").text("軍事命令以及訊息");
	$(".mbutton:eq(2) > span").text("戰略分析");
	$(".mbutton:eq(3) > span").text("政治論壇及分析");
	$(".mbutton:eq(4) > span").text("經濟焦點");
	$(".mbutton:eq(5) > span").text("社交娛樂");
	$(".mbutton:eq(6) > span").text("閱讀已訂閱報紙及管理");
		//e塗鴉牆
	$("a[rel='comment']").text("留言");
	$("a[rel='like']").text("讚");
	$("a[rel='unlike']").text("收回讚");
	$("a.report").text("檢舉");
	$("textarea[title = 'Say something to your friends']").text("和朋友說些有趣的東西吧");	
	$(".fake_input").text("留言吧");
}

//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//個人頁 www.erepublik.com/en/main/citizen
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/citizen")!=-1) {
	$("ul.citizen_menu > li:eq(0) > a").text("總覽");
	$("ul.citizen_menu > li:eq(1) > a").text("現金帳戶");
	$("ul.citizen_menu > li:eq(2) > a").text("倉庫");
	$(".citizen_edit > a > span").html('<img src="http://www.erepublik.com/images/modules/citizenprofile/edit.png">編輯資料');
	$(".citizen_sidebar > div > small:eq(0)").html('目前所在地 <a href="http://www.erepublik.com/en/citizen/change-residence" title="">(移動)</a>');
	$(".citizen_sidebar > div > small:eq(1)").html('國籍 <a href="http://www.erepublik.com/en/citizenship" title="">(更改)</a>');
	$(".citizen_second > small:eq(0)").text("eRepublik 生日");
	var na_rank = $(".citizen_second > small:eq(1) > strong").text();
	$(".citizen_second > small:eq(1)").html("國內排名 <strong>"+ na_rank +"</strong>");
	$(".citizen_activity > div.place:eq(0) > h3.noactivity").html('<img src="http://www.erepublik.com/images/modules/_icons/no_political_activity.png">沒有加入政黨');
	$(".citizen_activity > div.place:eq(1) > h3.noactivity").html('<img src="http://www.erepublik.com/images/modules/_icons/no_mu.png">沒有加入軍團');
	$(".citizen_activity > div.place:eq(2) > h3.noactivity").html('<img src="http://www.erepublik.com/images/modules/_icons/no_media_activity.png">沒有創立報紙');
	$(".citizen_activity > div.place:eq(0) > h3:contains('Party Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_member.png">政黨成員');
	$(".citizen_activity > div.place:eq(0) > h3:contains('Party President')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_president.png">黨主席');
	$(".citizen_activity > div.place:eq(0) > h3:contains('Country President')").html('<img src="http://www.erepublik.com/images/modules/_icons/country_president.png">總統');
	$(".citizen_activity > div.place:eq(1) > h3:contains('Military Unit Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">軍團成員');
	$(".citizen_activity > div.place:eq(1) > h3:contains('Military Unit Leader')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">軍團團長');
	$(".citizen_activity > div.place:eq(2) > h3:contains('Press director')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png">報社社長');

	$(".citizen_experience > small").text("經驗值點數");
	var profile_name = $(".citizen_profile_header > h2").text();
	$(".my_land_profile > p > strong").text(profile_name + " 的產業:");
	$("a.fluid_blue_dark > span").text("前往");
	
	$(".citizen_content > h3:contains('About me')").html("<br><br><br><br><br>關於我");
	$(".citizen_content > h3:contains('Achievements')").html("<br><br><br><br><br>成就獎章");
	$(".citizen_content > h3:contains('Military Skills')").html("<br><br><br><br><br>軍事技能");

	$(".achiev > li:eq(0) > .hinter > span > p:eq(0) > strong").text("模範員工");
	$(".achiev > li:eq(0) > .hinter > span > p:eq(1)").text("連續工作30天");
	$(".achiev > li:eq(1) > .hinter > span > p:eq(0) > strong").text("國會議員");
	$(".achiev > li:eq(1) > .hinter > span > p:eq(1)").text("贏得國會大選");
	$(".achiev > li:eq(2) > .hinter > span > p:eq(0) > strong").text("國家元首");
	$(".achiev > li:eq(2) > .hinter > span > p:eq(1)").text("贏得總統大選");
	$(".achiev > li:eq(3) > .hinter > span > p:eq(0) > strong").text("媒體大亨");
	$(".achiev > li:eq(3) > .hinter > span > p:eq(1)").text("訂閱您報紙的讀者達到 1000 人");
	$(".achiev > li:eq(4) > .hinter > span > p:eq(0) > strong").text("戰鬥英雄");
	$(".achiev > li:eq(4) > .hinter > span > p:eq(1)").text("在一場戰鬥中達到最高的戰爭影響力");
	$(".achiev > li:eq(5) > .hinter > span > p:eq(0) > strong").text("戰役英雄");
	$(".achiev > li:eq(5) > .hinter > span > p:eq(1)").text("在一場戰役中達到最高的戰爭影響");
	$(".achiev > li:eq(6) > .hinter > span > p:eq(0) > strong").text("起義英雄");
	$(".achiev > li:eq(6) > .hinter > span > p:eq(1)").text("發動一場起義戰爭並成功解放該地區");
	$(".achiev > li:eq(7) > .hinter > span > p:eq(0) > strong").text("超級大兵");
	$(".achiev > li:eq(7) > .hinter > span > p:eq(1)").text("累計達到250點力量點數");
	$(".achiev > li:eq(8) > .hinter > span > p:eq(0) > strong").text("社交達人");
	$(".achiev > li:eq(8) > .hinter > span > p:eq(1)").text("邀請 10 人加入 eRepublik 並且幫助他們達到 Lv10");
	$(".citizen_military:eq(0) > strong:first").text("力量");
	$(".citizen_military:eq(1) > strong:first").text("軍階");
	//好友
	$(".warning_message > tbody > tr > td").text("只會顯示前200位好友");
	$(".dead").text("死了");
	//帳戶
	$(".citizen_content up > .info_message > tbody > tr > td").text("少於1塊錢的貨幣不會被顯示出來");
	//$("ul.citizen_menu > li:eq(2) > a").text("倉庫");
	//$("ul.citizen_menu > li:eq(2) > a").text("倉庫");
	//$("ul.citizen_menu > li:eq(2) > a").text("倉庫");
	//$("ul.citizen_menu > li:eq(2) > a").text("倉庫");
	//$("ul.citizen_menu > li:eq(2) > a").text("倉庫");
	//$("ul.citizen_menu > li:eq(2) > a").text("倉庫");
	//$("ul.citizen_menu > li:eq(2) > a").text("倉庫");
}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
//報紙 www.erepublik.com/news & article
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if ((document.location.toString().indexOf("/news")!=-1) || (document.location.toString().indexOf("/article/")!=-1)) {
	
	$("h1:exact(' news')").text("新聞區");
	$("h2:exact('Country')").text("請選擇國家");
	$("h2:exact('news')").text("請選擇新聞類型");
	$("a:contains('First steps in eRepublik')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_1.png">新人指導及教育');
	$("a:contains('Battle orders')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_2.png">軍事命令以及訊息');
	$("a:contains('Warfare analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_3.png">戰略分析');
	$("a:contains('Political debates and analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_4.png">政治論壇及分析');
	$("a:contains('Financial business')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png">經濟焦點');
	$("a:contains('Social interactions and entertainment')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png">社交娛樂');
	$("a:contains('Report article')").text("檢舉本文");
	$("a:contains('Report comments')").text("檢舉留言");
	var comment_count = $("a#comments_button_on > span > font").text();
	$("a#comments_button_on > span").html('留言(<font style="font-weight:bold; color:#fff;">'+comment_count+'</font>)');
	$("p.padded").text("你的留言");
	$(".submitpost-core > input[name='commit']").attr('value','新增留言');
	$(".profilemenu > li > a:exact('Write article')").text("寫新文章");
	$(".profilemenu > li > a:exact('Edit newspaper details')").text("編輯文章");
	$(".profilemenu > li > a:exact('Subscribe')").text("訂閱");
	$(".profilemenu > li > a:exact('Unsubscribe')").text("取消訂閱");
	var sub_count = $(".your_subs > strong").text();
	$(".your_subs").html('你目前有訂閱<strong>'+sub_count+'</strong>份報紙<a href="javascript:;" class="fluid_blue_dark" onclick="$j(\'.asubs\').toggle();" title=""><span>變更</span></a>');
	$(".acontrols > .fluid_blue_dark > span").text("取消訂閱");
	$(".aselectall").text("選擇全部");
	$(".core > ul > .last:eq(0)").html('<a href="/en/news/rated/all/Republic-of-China-Taiwan/1"><img class="icon" src="/images/parts/icon_media_toprated.gif" alt="Icon_media_toprated"> 熱門新聞</a>');
	$(".core > ul > .last:eq(1)").html('<a href="/en/news/latest/all/Republic-of-China-Taiwan/1"><img class="icon" src="/images/parts/icon_media_latest.gif" alt="Icon_media_latest"> 最新報紙</a>');
	$(".core > ul > .last:eq(2)").html('<a href="http://www.erepublik.com/en/news/military"><img class="icon" src="/images/parts/icon_media_military.gif" alt="Icon_media_military"> 最新事件</a>');
	$(".core > ul > .last:eq(3)").html('<a href="http://www.erepublik.com/en/news/international"><img class="icon" src="/images/parts/icon_media_international.gif" alt="Icon_media_international"> 國際焦點</a>');
	$(".core > ul > .last:eq(4)").html('<a href="http://www.erepublik.com/en/news/subscriptions"><img class="icon" src="/images/parts/icon_media_subscriptions.gif" alt="Icon_media_subscriptions"> 訂閱的報紙</a>');



}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//市場 www.erepublik.com/en/market/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/market/")!=-1) {
	$("h1:exact('Marketplace')").text("商品市場");
	$("#filters_expanded > h4").text("選擇你要購買的產品類型");
	$("small:exact('Food')").text("食物");
	$("small:contains('Weapons')").text("武器");
	$("small:contains('House')").text("房屋");
	$("small:contains('Moving Tickets')").text("機票");
	$("small:contains('Food Raw Material')").text("食物原料");
	$("small:contains('Weapon Raw Material')").text("武器原料");
	$("small:contains('Hospital')").text("醫院");
	$("small:contains('Defense System')").text("防禦設施");
	$("#minReq > h4").text("請選擇你要購買的等級");
	$(".m_mainh > .m_product").text("產品");
	$(".m_mainh > .m_provider").text("供應商");
	$(".m_mainh > .m_stock").text("庫存");
	$(".m_mainh > .m_price > a").text("價格");
	$(".m_mainh > .m_quantity").text("數量");
	$(".price_sorted > tr > .m_buy > a > span").text("購買");
	$(".schange > a > span").text("更改");
	$("#marketplace > .info_message  > tbody > tr > td").text("目前沒有販售中的產品");
	$("small:contains('Health restore')").text("可恢復體力值");
	$(".attributes > div > b:contains('Health restore')").text("可恢復體力值");
	$("small:contains('Fire Power')").text("火力");
	$("small:contains('Durability')").text("耐久度");
	$(".attributes > div > b:contains('Fire Power')").text("火力");
	$(".attributes > div > b:contains('Durability')").text("耐久度");


}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//外匯市場 www.erepublik.com/en/exchange
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/exchange")!=-1) {
	$("h1:exact('Monetary Market')").text("外匯市場");
	//$(".selecttags:eq(0)").text("買進"); 
	//$(".selecttags:eq(1)").text("賣出"); 
	//$("#table_list_offers > tbody > tr > th:eq(0)").text("供應商"); 
	//$("#table_list_offers > tbody > tr > th:eq(0)").text("總量"); 
	//$("#table_list_offers > tbody > tr > th:eq(0)").text("交換比例"); 
	//$("#table_list_offers > tbody > tr > th:eq(0)").text("購買數量"); 

}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//就業市場 www.erepublik.com/en/market/job/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/job/")!=-1) {
	$("h1:exact('Job Market')").text("就業市場");
	$("td:contains('You already have a job ')").text("您目前已經有工作了，如需轉換公司，請離開現職");
	$("tr.jm_mainh > th:eq(0)").text("雇主");
	$("tr.jm_mainh > th:eq(1)").text("公司名稱");
	$("tr.jm_mainh > th:eq(3)").text("日薪");

}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//二手公司市場 www.erepublik.com/en/market/company
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("market/company")!=-1) {
	$("h1:exact('Companies for sale')").text("二手公司市場");
	$("h4:contains('Select company')").text("請選擇產業種類");

}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//政黨 www.erepublik.com/en/party/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/party/")!=-1) {
	$("h2:exact('Info')").text("資訊");
	//$("h4:contains('Select company')").text("請選擇產業種類");
	$("span:exact('Members')").text("成員");
	$("span:exact('Orientation')").text("政黨傾向");
	$("a:exact('Show all members')").text("成員清單");
	$(".indent > div > form > span > span > a").text("離開此黨");
	$("h2:exact('Elections')").text("選舉");
	$(".bordersep:eq(0) > h2").html('<img title="Elected by the party members on the 15th of each month" class="icon padded tooltip" src="/images/parts/icon_position_politics_partypresident.gif" alt="Icon_position_politics_partypresident">黨主席選舉(每個月<strong>15</strong>號由黨員選出)');
	$(".bordersep:eq(2) > h2").html('<img title="Elected by the country citizens on the 25th of each month" class="icon padded tooltip" src="/images/parts/icon_position_politics_congressman.gif" alt="Icon_position_politics_congressman">議員選舉(每個月<strong>25</strong>號由各地公民選出)');
	$(".indent > h2").html('<img title="Elected by the country citizens on the 5th of each month" class="icon padded tooltip" src="/images/parts/icon_position_politics_president.gif" alt="Icon_position_politics_president">總統選舉(每個月<strong>5</strong>號由全國公民選出)');
	$("p.smallholder:exact('Party President')").text("黨主席");
	var pp_1 = $(".infoholder:eq(2) > p > .special:eq(0)").text();
	var pp_2 = $(".infoholder:eq(2) > p > .special:eq(1)").text();
	$(".indent > .bordersep > .subindent > .infoholder:eq(0) > p").html('下次選舉於 <span class="special">'+pp_1+'</span> 後，目前有位<span class="special">'+pp_2+'</span> 候選人');
	var cm_1 = $(".bordersep > .subindent > div > div > p > span.special ").text();
	var cm_2 = $(".bordersep > .subindent > div > p > span.special:eq(2) ").text();
	var cm_3 = $(".bordersep > .subindent > .infoholder > p > span:eq(3)").text();
	$(".bordersep > .subindent > div > div > p:eq(1)").html('本黨目前有<span class="special">'+cm_1+'</span> 位議員 ，');
	$(".bordersep > .subindent > div > p:eq(1)").html('約佔議會<span class="special">'+cm_2+'</span> 的席次 ');
	$(".bordersep > .subindent > .infoholder > p:eq(2)").html('下次選舉於 <span class="special">'+cm_3+'</span> 後');
	$("#candidate_for_congress_template > h2").text('參加議員選舉');
	//$("#candidate_for_congress_template > div").text();
	$("#candidate_for_congress_template > form > p.padded").text('請在下方填入政見的連結，來向選民說明為何要投你一票');
	var cp_1 = $(".indent > .subindent > div > p:eq(0) > .special").text();
	$("p.smallholder:exact('Winner')").text("總統當選人");
	$(".indent > .subindent > div > p:eq(0)").html('下次選舉於 <span class="special">'+cp_1+'</span> 後');
	$("p.smallholder:exact('No candidate proposed')").text("尚未提名總統候選人");
	$("a:exact('Show results')").text("查看選舉結果");
	$("a::contains('Show candidate list')").text("查看候選人清單");
	$("a::contains('Show candidates list')").text("查看候選人清單");
	$("a:exact('Candidate')").text("參選");
	$("a:contains('Show proposed members')").text("查看參選名單");
	$("a:exact('Run for congress')").text("參加議員選舉");

}

//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//選舉中心 www.erepublik.com/en/elections/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/elections/")!=-1) {
	$("h1:exact('Elections')").text("選舉中心");
	$("h2:exact('Official Results')").text("統計結果公告");
	//$("h4:contains('Select company')").text("請選擇產業種類");
	//$("span:exact('Members')").text("成員");
	

}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//軍團 www.erepublik.com/en/main/group-
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/group")!=-1) {
	$("h1:exact('Military Unit')").text("軍團");
	$("#military_units_home > table > tbody > tr >td").html('<strong>您目前不是任何軍團的成員</strong>你可以加入目前現有的軍團，或是自行創立一個自己想要的軍團。加入軍團可以使你跟隨其他團員的腳步並更加團結，並得到更多的影響力<br><a class="wicked" href="http://wiki.erepublik.com/index.php/Military_unit" target="_blank">更多軍團資訊</a>');
	$("span:exact('Create a Military Unit')").text("創立軍團");
	$("h3:exact('Apply for membership in a Military Unit')").text("提出加入軍團申請");
	$("strong:exact('Join')").text("加入");
	$(".info_message > tbody > tr > td").text("你必須加入此軍團才能觀看");
	$("h3:exact('Leader')").text("軍團長");
}



//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//共用區 Common strings
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

	//中文目錄圖
	$("#menu ul li#menu2 a").css("background-image","url(\"http://i.imgur.com/u1h0F.png\")");
	$("#menu ul li#menu3 a").css("background-image","url(\"http://i.imgur.com/u1h0F.png\")");
	$("#menu ul li#menu4 a").css("background-image","url(\"http://i.imgur.com/u1h0F.png\")");
	$("#menu ul li#menu5 a").css("background-image","url(\"http://i.imgur.com/u1h0F.png\")");
	$("#menu ul li#menu4 a").css("background-image","url(\"http://i.imgur.com/u1h0F.png\")");
	$("#menu ul li#menu4 a").css("background-image","url(\"http://i.imgur.com/u1h0F.png\")");
	$("#menu > ul > li#menu4 > ul > li:eq(0) > a").text("商品市場");
	$("#menu > ul > li#menu4 > ul > li:eq(1) > a").text("外匯市場");
	$("#menu > ul > li#menu4 > ul > li:eq(2) > a").text("就業市場");
	$("#menu > ul > li#menu4 > ul > li:eq(3) > a").text("二手公司拍賣區");
	$("#menu > ul > li#menu5 > ul > li:eq(0) > a").text("世界地圖");
	$("#menu > ul > li#menu5 > ul > li:eq(1) > a").text("新聞傳媒");
	$("#menu > ul > li#menu5 > ul > li:eq(2) > a").text("我的政黨");
	$("#menu > ul > li#menu5 > ul > li:eq(3) > a").text("選舉中心");
	$("#menu > ul > li#menu5 > ul > li:eq(4) > a").text("軍團");
	$("#menu > ul > li#menu5 > ul > li:eq(5) > a").text("遊戲數據排行");
	$("#menu > ul > li#menu5 > ul > li:eq(6) > a").text("國家管理中心");
	$("#menu > ul > li#menu5 > ul > li:eq(7) > a").text("邀請朋友");
	$("#menu > ul > li#menu5 > ul > li:eq(8) > a").text("我的組織號");
	$("#menu > ul > li#menu5 > ul > li:eq(9) > a").text("官方徽章圖");
	$("input[value = 'Search citizen']").attr("value","搜尋某位公民");

	//側欄
	var Experiencelevel = $("div#experienceTooltip > strong").eq(0).text();
	var Experiencepoints = $("div#experienceTooltip > strong").eq(1).text();
	var Nextlevelat = $("div#experienceTooltip > strong").eq(2).text();
	$("div#experienceTooltip").html(
					"<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />"+
					"經驗等級: <strong>LV. "+ Experiencelevel +"</strong><br />"+
					"經驗值: <strong>"+ Experiencepoints +"</strong><br />"+
					"下一個等級需: <strong>"+ Nextlevelat +"</strong><br />"
					);
	$("div#eatFoodTooltip > p:eq(0)").text("按此按鈕後，將會從倉庫中食用麵包，並會將體力恢復至最大值");
	var healthe_limit = $(".tooltip_health_limit").text();
	$("div#eatFoodTooltip > p:eq(1)").html("你目前最多可以恢復 <big>"+healthe_limit+"</big> 體力");
	$("div#eatFoodTooltip > p:eq(1) > big").attr("class","tooltip_health_limit");
	var next_100 = $("div#eatFoodTooltip > small#foodResetHoursContainer > em").text();
      //$(".time_left > small").html("下一個100點體力值額度於<em>"+ next_100 +"</em>");
      //$("div#eatFoodTooltip > small#foodResetHoursContainer > em").attr("id","pop_timer");

	$("#foodText").text("按此吃食物");
	$("#sidebar_missions > .content > b:first").text("任務");
	$(".logout").text("登出");
	//頁尾
	$("#footer > p > a:eq(0)").text("遊戲論壇");
	$("#footer > p > a:eq(1)").text("遊戲百科");
	$("#footer > p > a:eq(2)").text("官方部落格");
	$("#footer > p > a:eq(3)").text("新聞發佈");
	$("#footer > p > a:eq(4)").text("聯絡管理員");
	$("#footer > p > a:eq(5)").text("工作機會");
	$("#footer > p > a:eq(6)").text("服務條款");
	$("#footer > p > a:eq(7)").text("隱私權政策");
	$("#footer > p > a:eq(8)").text("合作夥伴");
	$("#footer > p > a:eq(9)").text("遊戲規則");
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//PIN www.erepublik.com/en/pin
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/pin")!=-1) {
	$("h2:exact('Please insert your Personal Security PIN')").text("請輸入你的個人安全PIN碼");
	$("input[value ='Unlock']").attr("value","解鎖");
	$("span#error_for_pin").text("你的個人安全PIN碼必須是4個位數的數字");
}



	
	


