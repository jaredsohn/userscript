// ==UserScript==
// @name           eRepublik Traditional Chinese Translation
// @namespace      Traditional Chinese Translation
// @author         BillWilson, blackca
// @description    eRepublik 正體中文版
// @version        0.3.3.1001
// @match          http://*.erepublik.com/*
// @include        http://*.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=99636&days=1&show
// ==/UserScript==

/*  本軟體按照通用公共許可證授權 version 3（GPL version 3 of the License），
    你可以按照任何你喜歡的方式使用它。 本軟體不提供任何顯式聲明的或隱含的擔保，
    也不對使用過程中產生的任何損壞或者資料丟失承擔任何責任。

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

	var lang = document.location.pathname.substr(1,2);
	var host = document.location.hostname.split('.')[0];

/*  [function] $.exact('string'); http://blog.darkthread.net/post-2009-01-24-jquery-custom-selector.aspx  */
	$.extend($.expr[":"], { exact: function(a, i, m) { return (a.textContent || a.innerText || jQuery(a).text() || '').toLowerCase() == m[3].toLowerCase(); } });

/*  只剩國家管理中心,偷懶中 @blackca 
 */

//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 共用區 Common strings
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	$('strong#foodText').css('font-family','微軟正黑體,微软雅黑');
	// header
//	$("input#search_field").attr("value","搜尋某位公民");
	// common catalog
	$('#menu ul li#menu2 a').css('background-image','url(\"https://lh6.googleusercontent.com/-E2wrlhHYh-s/TnNT2U9JBXI/AAAAAAAABQM/DfDILikdfd4/s0/map-erepublik-logged.new.png\")');
	$('#menu ul li#menu3 a').css('background-image','url(\"https://lh6.googleusercontent.com/-E2wrlhHYh-s/TnNT2U9JBXI/AAAAAAAABQM/DfDILikdfd4/s0/map-erepublik-logged.new.png\")');
	$('#menu ul li#menu4 a').css('background-image','url(\"https://lh6.googleusercontent.com/-E2wrlhHYh-s/TnNT2U9JBXI/AAAAAAAABQM/DfDILikdfd4/s0/map-erepublik-logged.new.png\")');
	$('#menu ul li#menu5 a').css('background-image','url(\"https://lh6.googleusercontent.com/-E2wrlhHYh-s/TnNT2U9JBXI/AAAAAAAABQM/DfDILikdfd4/s0/map-erepublik-logged.new.png\")');
	$('#menu > ul > li#menu3').append('<ul><li><a href=\"http://www.erepublik.com/' +lang+ '/military/campaigns" target="_self">戰役列表</a></li>'+
		'<li><a href=\"http://www.erepublik.com/' +lang+ '/newspaper/roc-ministry-of-defense-245452/1\" target="_self">國防部軍令</a></li></ul>');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Marketplace')").text('商品市場');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Monetary')").text('外匯市場');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Job')").text('就業市場');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Companies for sale')").text('二手公司拍賣市場');
	$("#menu > ul > li#menu5 > ul > li > a:contains('World Map')").text('世界地圖');
	$("#menu > ul > li#menu5 > ul > li > a:contains('My Party')").text('我的政黨');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Elections')").text('選舉中心');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Military Unit')").text('軍團');
//	$('#menu > ul > li#menu5 > ul > li:eq(5) > a').text('國家管理中心');
//	$('#menu > ul > li#menu5 > ul > li:eq(6) > a').text('遊戲數據排行');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Invite friends')").text('邀請朋友');
	$("#menu > ul > li#menu5 > ul > li > a:contains('My Organizations')").text('我的組織號');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Badges')").text('官方徽章圖');
	$('#menu > ul > li#menu5 > ul').prepend('<li><a href=\"http://www.erepublik.com/en/news/latest/all\" target="_self">新聞傳媒</a></li>');
	$('#menu > ul > li#menu5 > ul').append(
		'<li><a href=\"http://erep.tw/" target="_blank">台灣論譠</a></li>'+
		'<li><a href=\"http://qchat.rizon.net/?channels=PTT_formosa\" target="_blank">台灣IRC頻道</a></li>');
	// sidebar
	var Explevel = $('#experienceTooltip > strong').eq(0).text();
	var Exppoint = $('#experienceTooltip > strong').eq(1).text();
	var Nextlevel = $('#experienceTooltip > strong').eq(2).text();
	var healLimit = $('#eatFoodTooltip big.tooltip_health_limit').text();
	$('#experienceTooltip').html('<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />'+
		'經驗等級: <strong>LV. '+Explevel+'</strong><br />經驗值: <strong>'+Exppoint+'</strong><br />下次升級需: <strong>'+Nextlevel+'</strong><br />');
	$('#eatFoodTooltip > p:eq(0)').text('按此按鈕後，將會從倉庫中食用麵包，並會將體力恢復至最大值');
	$('#eatFoodTooltip > p:eq(1)').html('你目前最多可以恢復 <big>'+healLimit+'</big> 體力');
	$('#eatFoodTooltip > p:eq(1) > big').attr('class','tooltip_health_limit');
	$('#eatFoodTooltip > small').replaceText('100 more recoverable Health in','下一個100點體力值額度於')
	$('#sidebar_missions > .content > b:first').text('任務');
	$('strong#foodText').text('按此吃食物');
	// others
	$('a.logout').text('登出');
	$('a.prev').text('上一頁');
	$('a.next').text('下一頁');
	// footer
	$('#footer > p > a:eq(0)').text('遊戲論壇');
	$('#footer > p > a:eq(1)').text('遊戲百科');
	$('#footer > p > a:eq(2)').text('官方部落格');
	$('#footer > p > a:eq(3)').text('新聞發佈');
	$('#footer > p > a:eq(4)').text('聯絡管理員');
	$('#footer > p > a:eq(5)').text('工作機會');
	$('#footer > p > a:eq(6)').text('服務條款');
	$('#footer > p > a:eq(7)').text('隱私權政策');
	$('#footer > p > a:eq(8)').text('合作夥伴');
	$('#footer > p > a:eq(9)').text('遊戲規則');
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
// 首頁 www.erepublik.com/en
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if ((document.location.toString()=="http://www.erepublik.com/"+lang) || (document.location.toString().indexOf("?viewPost=")!==-1)) {
	$('h1').css('font-family','微軟正黑體,微软雅黑');
	$('#daily_pop > h2').css('font-family','微軟正黑體,微软雅黑');
	$('#daily_pop > h3').css('font-family','微軟正黑體,微软雅黑');
	// country status
	var cNews = $('#country_status h2');
	if ($("#country_status h2:contains('is at war with')").length == 1) {
		cNews.replaceText('Currently','目前').replaceText('is at war with','正在與').replaceText('and','和');
		cNews.replaceText(". We're fighting to become a superpower.",' 交戰中。我們將會持續戰鬥成為強權。');
	} else if ($("#country_status h2:contains('under foreign occupation')").length == 1) {
		// 目前 NE_ours 部分的國土遭受佔領中，請隨時注意起義戰鬥事件的發生
		cNews.replaceText('Currently','目前');
		cNews.replaceText('under foreign occupation','部分的國土遭受佔領中');
	} else if ($("#country_status h2:contains('is a peaceful place right now')").length == 1) {
		cNews.replaceText('is a peaceful place right now, we have no active wars with an enemy country.','目前處於和平狀態中, 我們沒有任何持續中的戰爭。');
	};
	// zone news
	$.each( $('#country_status .zone_news > table > tbody > tr > td > ul > li > span'), function() {
		$(this).replaceText('days ago,, ','天前，').replaceText('Yesterday','昨天').replaceText('hours ago','小時前').replaceText('minutes ago','分鐘前');
		if ($(this).is(":contains('we conquered')")) {
			$(this).replaceText('we conquered','國軍成功佔領').replaceText(' from',', 從').replaceText('.',' 的手中.');
		} else if (($(this).is(":contains('our army successfully defended')")) && ($(this).is(":contains('our army successfully defended')"))) {
			$(this).replaceText('our army successfully defended','國軍成功守下').replaceText(' against the resistance forces of',', 從').replaceText('.',' 反抗軍的手中.');
		} else if ($(this).is(":contains('our army successfully defended')")) {
			$(this).replaceText('our army successfully defended','國軍成功守下').replaceText(' against',', 從').replaceText('.',' 的手中.');
		} else if ($(this).is(":contains('our resistance forces liberated')")) {
			$(this).replaceText('our resistance forces liberated','國軍成功解放').replaceText(' from',', 脫離').replaceText('.',' 的統治.');
		};
	});
	// daily task
	$('#daily_tasks_title.title > h1').text('每日任務');
	$('#daily_tasks > ul > li.work > a').text('工作');
	$('#daily_tasks > ul > li.train > a').text('訓練');
	$('#daily_tasks > ul > li.reward > a').text('領取獎勵');
	$('#daily_pop > a').text('確定');
	$('#daily_pop > h3').text('每日任務');
	$('#daily_pop > h2').text('任務達成!');
	$('#daily_pop small:eq(0)').text('力量');
	$('#daily_pop small:eq(1)').text('經驗值');
	// battle list
	$('#homepage_feed .column:eq(0) > h1.noborder').text('戰役列表');
	$("#battle_listing > h4:exact('Campaign of the day')").text('本日戰役');
	$("#battle_listing > h4:contains('Allies')").text('目前 同盟國 的戰役');
	$("#battle_listing > h4:contains('Campaigns')").text('目前 '+$("#battle_listing > h4:contains('Campaigns')").replaceText('Campaigns','的戰役').text());
	$("#battle_listing span:exact('Fight')").text('戰鬥');
	$('#battle_listing .rest > a:eq(0)').text('更多戰役');
	$('#battle_listing .rest > a:eq(1)').text('最新事件');
	$('#battle_listing > ul.resistance_war').find('a#fundRW_btn > span').text('資助');
	$('#battle_listing > ul.resistance_war').find('.info > small').text('組織起義戰爭在');
	// citizen feed
	$('#homepage_feed .column:eq(1) > h1:first').text('公民塗鴉牆');
	$('#citizen_feed form#wall_post > textarea#shout').text('和朋友們說些有趣的東西吧');
	$('#citizen_feed a.report').text('檢舉');
	$('#citizen_feed a.post_button > b').text('分享');
	$("#citizen_feed a[trigger='reply']").text('留言');
	$("#citizen_feed a[trigger='post_like']").text('讚');
	$("#citizen_feed a[trigger='post_unlike']").text('收回讚');
//	$("#citizen_feed a[trigger='comment_like']").text('讚');
//	$("#citizen_feed a[trigger='comment_unlike']").text('收回讚');
	$("#citizen_feed span[trigger='add_comment']").text('留言');
	$('#citizen_feed textarea.comment_reply_post').text('留言吧');
	$('#citizen_feed div.fake_input').text('留言吧');
	$('#citizen_feed').find("div.vote_bar em:contains('voted this.')").each( function() {
		$(this).find('b.personal').text('你, ');
		$(this).replaceText('and','和').replaceText('voted this.','表示讚');});
	$('#citizen_feed > .previous_posts > a > span').text('看更多');
	// news list
	$('#news.box > .title > h1:first').text('新聞分類');
	$('#articles > div > a.mbutton:eq(0) > span').text('新人指導及教育');
	$('#articles > div > a.mbutton:eq(1) > span').text('軍事命令以及訊息');
	$('#articles > div > a.mbutton:eq(2) > span').text('戰略分析');
	$('#articles > div > a.mbutton:eq(3) > span').text('政治論壇及分析');
	$('#articles > div > a.mbutton:eq(4) > span').text('經濟焦點');
	$('#articles > div > a.mbutton:eq(5) > span').text('社交娛樂');
	$('#articles > div > a.mbutton:eq(6) > span').text('閱讀已訂閱報紙及管理');
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 個人 www.erepublik.com/en/main/citizen
//          www.erepublik.com/en/economy/donate-items/
//          www.erepublik.com/en/economy/donate-money/
//   - 現金 www.erepublik.com/en/economy/citizen-accounts/
//   - 朋友 www.erepublik.com/en/main/citizen-friends/
//   - 移動 www.erepublik.com/en/citizen/change-residence
//   - 密碼 www.erepublik.com/en/citizen/change-password
//   - 編輯 www.erepublik.com/en/citizen/edit/profile
// 國藉 www.erepublik.com/en/citizenship
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if ((document.location.toString().indexOf("/citizen")!==-1) || (document.location.toString().indexOf("/economy/donate-")!==-1)) {
	$('h3').css('font-family','微軟正黑體,微软雅黑');
	// layout menu
	$('.citizen_profile_header.auth > .citizen_edit > a > span').html('<img src="http://www.erepublik.com/images/modules/citizenprofile/edit.png">編輯資料');
	$('.citizen_profile_header.auth > .citizen_menu > li:eq(0) > a').text('總覽');
	$('.citizen_profile_header.auth > .citizen_menu > li:eq(1) > a').text('現金帳戶');
	$('.citizen_profile_header.auth > .citizen_menu > li:eq(2) > a').text('倉庫');
	$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Dead citizen')").replaceText('Dead citizen','死亡');
	$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Temporary banned')").replaceText('Temporary banned','暫時停權');
	$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Permanent banned')").replaceText('Permanent banned','永久停權');
	$('.citizen_profile_header.auth > .citizen_actions > a.action_friend.tip').attr('title','加為好友');
	$('.citizen_profile_header.auth > .citizen_actions > a.action_friend_remove.tip').attr('title','移除好友');
	$('.citizen_profile_header.auth > .citizen_actions > a.action_message.tip').attr('title','發送訊息');
	$('.citizen_profile_header.auth > .citizen_actions > a.action_donate.tip').attr('title','捐贈');
	$('.citizen_profile_header.auth > .citizen_status > div > small').text('經驗值點數');
	// profile sidebar
	$('.citizen_sidebar > div > small:eq(0)').html('目前所在地 <a href="http://www.erepublik.com/en/citizen/change-residence" title="">(移動)</a>');
	$('.citizen_sidebar > div > small:eq(1)').html('公民國籍 <a href="http://www.erepublik.com/en/citizenship" title="">(更改)</a>');
	$('.citizen_sidebar > div > .citizen_second > small:eq(0)').text('eRepublik 生日');
	$('.citizen_sidebar > div > .citizen_second > small:eq(1) > a').replaceText('National rank','國內等級排名');
	$('.citizen_sidebar > .citizen_activity > div.place:eq(0) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_political_activity.png">沒有加入政黨');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Party Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_member.png">政黨成員');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Party President')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_president.png">黨主席');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Congress Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/congress_member.png">國會議員');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Country President')").html('<img src="http://www.erepublik.com/images/modules/_icons/country_president.png">國家總統');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Far-left Wing')").text('極左翼政黨');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center-left Wing')").text('中間偏左翼政黨');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center Wing')").text('中間政黨');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center-right Wing')").text('中間偏右翼政黨');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Far-right Wing')").text('極右翼政黨');
	$('.citizen_sidebar > .citizen_activity > div.place:eq(1) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_mu.png">沒有加入軍團');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Recruit')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">軍團菜鳥');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">軍團成員');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Captain')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">軍團小隊長');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('2nd Commander')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">軍團副指揮官');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Commander')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">軍團指揮官');
	$('.citizen_sidebar > .citizen_activity > div.place:eq(2) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_media_activity.png">沒有創立報紙');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(2) > h3:contains('Press director')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png">報社社長');
	$(".citizen_sidebar > .citizen_activity > div.place:eq(2) > h3:contains('Create newspaper')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png"><a href="/en/create-newspaper">建立報紙</a>');
	$('.citizen_sidebar > .citizen_activity > h4.friends_title').replaceText('Friends','朋友 ');
	$('.citizen_sidebar > .citizen_activity > a.view_friends').text('查看全部');
	// profile content
	var cizName = $(".citizen_profile_header > h2").text();
	$('.citizen_content > .my_land_profile > p > strong').text(cizName+' 的產業:');
	$('.citizen_content > .my_land_profile > p').replaceText('buildings','棟建築物');
	$('.citizen_content > .my_land_profile > a > span').text("前往");
	$('.citizen_content > h3.mbot2:eq(0)').html('<br><br><br><br><br>關於我');
	$('.citizen_content > h3.mbot2:eq(1)').html('<br><br><br><br><br>成就獎章');
	// achievment
	$("ul#achievment > li:eq(0) > .hinter > span > p:eq(0) > strong").text("模範員工");
	$("ul#achievment > li:eq(0) > .hinter > span > p:eq(1)").text("連續工作30天");
	$("ul#achievment > li:eq(1) > .hinter > span > p:eq(0) > strong").text("國會議員");
	$("ul#achievment > li:eq(1) > .hinter > span > p:eq(1)").text("贏得國會大選");
	$("ul#achievment > li:eq(2) > .hinter > span > p:eq(0) > strong").text("國家元首");
	$("ul#achievment > li:eq(2) > .hinter > span > p:eq(1)").text("贏得總統大選");
	$("ul#achievment > li:eq(3) > .hinter > span > p:eq(0) > strong").text("媒體大亨");
	$("ul#achievment > li:eq(3) > .hinter > span > p:eq(1)").text("訂閱你報紙的讀者達到 1000 人");
	$("ul#achievment > li:eq(4) > .hinter > span > p:eq(0) > strong").text("戰鬥英雄");
	$("ul#achievment > li:eq(4) > .hinter > span > p:eq(1)").text("在一場戰鬥中達到最高的戰爭影響力");
	$("ul#achievment > li:eq(5) > .hinter > span > p:eq(0) > strong").text("戰役英雄");
	$("ul#achievment > li:eq(5) > .hinter > span > p:eq(1)").text("在一場戰役中達到最高的戰爭影響");
	$("ul#achievment > li:eq(6) > .hinter > span > p:eq(0) > strong").text("起義英雄");
	$("ul#achievment > li:eq(6) > .hinter > span > p:eq(1)").text("發動一場起義戰爭並成功解放該地區");
	$("ul#achievment > li:eq(7) > .hinter > span > p:eq(0) > strong").text("超級大兵");
	$("ul#achievment > li:eq(7) > .hinter > span > p:eq(1)").text("累計達到250點力量點數");
	$("ul#achievment > li:eq(8) > .hinter > span > p:eq(0) > strong").text("社交達人");
	$("ul#achievment > li:eq(8) > .hinter > span > p:eq(1)").text("邀請 10 人加入 eRepublik 並且幫助他們達到 Lv10");
	$("ul#achievment > li:eq(9) > .hinter > span > p:eq(0) > strong").text("傭兵戰神獎章");
	$("ul#achievment > li:eq(9) > .hinter > span > p:eq(1)").text("幫助50個國家除掉25個敵人");
	// military skill
	$(".citizen_content > h3:contains('Military Skills')").html('<br><br><br><br><br>軍事技能');
	$('.citizen_content > .citizen_military:eq(0) > strong:first').text('力量');
	$('.citizen_content > .citizen_military:eq(0) > div > small:first').replaceText('Super soldier:','超級大兵:');
	$('.citizen_content > .citizen_military:eq(1) > strong:first').text('軍階');
	$('.citizen_content > .citizen_military:eq(1) > div > small:first').text('軍階點數:');
	if (document.location.toString().indexOf("/economy/")!==-1) {
		if (document.location.toString().indexOf("/donate-")!==-1) {
			// donate tab
			$('.citizen_content > div > h2.special.padded').replaceText('Donate','捐贈');
			$('.citizen_content > div > h2.special.padded > img#donate_tip').attr('title','只有 食物, 武器 和 機票 能被捐贈.');
			$('.citizen_content > div > ul.tabs > li#topratedtab > a > span').text('物資');
			$('.citizen_content > div > ul.tabs > li#latesttab > a > span').text('金錢');
			$(".citizen_content > div > .donate_form > table > tbody > tr > th:contains('Your storage')").text('你的個人倉庫');
			$(".citizen_content > div > table > tbody > tr > th:contains('Your account')").text('你的現金帳戶');
			$(".citizen_content input[value='Donate']").attr('value','捐贈');
//		} else if (document.location.toString().indexOf("/citizen-accounts/")!==-1) {
		} else {
			// account money tab
			$(".citizen_content > a.fluid_blue_light_small > span:contains('Exchange currencies')").text('交換貨幣');
			$("table.info_message > tbody > tr > td:exact('Local currency accounts with a value less than 1 are not displayed.')").text('少於 1 塊錢的貨幣不會被顯示出來.');
			$('div#allaccounts > div:first > a.f_light_blue_small > span').text('購買黃金');
		};
	} else if (document.location.toString().indexOf("/citizen-friends/")!==-1) {
		// friend tab
		$("table.warning_message > tbody > tr > td:contains('Only your first 2000 friends will see your wall posts.')").text('只有前 2000 位好友能看到你發佈在公民塗鴉牆上的訊息.');
		$("table.success_message > tbody > tr > td:contains('Your friendship request has been sent.')").text('你的好友邀請已經送出.');
		$('div#friends_tab_content div.dead').text('死亡');
	} else if (document.location.toString().indexOf("/change-residence")!==-1) {
		// change-residence tab
		$("table.warning_message > tbody > tr > td:exact('You can now change location without using a moving ticket.')").text('現在不需使用任何機票, 就可以任意移動你的所在地.');
		$('.citizen_sidebar > div > .citizen_second > small:eq(2)').replaceText('Forfeit points','違規點數');
		$('.citizen_content > h2.special').text('移動目前所在地');
		$('.citizen_content > .current_location > h4').text('目前位置');
		$('.citizen_content > form > .new_location > h4').text('新的位置');
		$('.citizen_content > form > .new_location > #selects > small:eq(0)').replaceText('Moving distance:','　移動距離:　');
		$('.citizen_content > form > .new_location > #selects > small:eq(1)').replaceText('Travelling cost:','　旅行花費:　');
		$('.citizen_content > form > a#move > span').text('移動');
	} else if (document.location.toString().indexOf("/change-password")!==-1) {
		// change password tab
		$('.citizen_sidebar > div > .citizen_second > small:eq(2)').replaceText('Forfeit points','違規點數');
		$('.citizen_content > .holder > h2.special.borderedsep').text('更改密碼');
		$("form.changepassword span.fieldname.goleft:contains('Current password')").text('目前密碼');
		$('form.changepassword span#error_for_citizen_password_twin.twin-small').text('請輸入你舊的密碼.')
		$("form.changepassword span.fieldname.goleft:exact('New password')").text('新密碼');
		$("form.changepassword span.fieldname.goleft:exact('New password again')").text('確認新密碼');
		$('form.changepassword > div > input.arrowbutton').attr('value','確定更改');
	} else if (document.location.toString().indexOf("/edit/profile")!==-1) {
		// editor tab
		$('.citizen_content > .holder > h2.special.borderedsep').text('編輯個人資料');
		$("form.editprofile span.fieldname.goleft:contains('Your description')").text('關於你');
		$("form.editprofile span.fieldname.goleft:contains('Citizen Avatar')").text('個人頭像');
		$('form.editprofile span#error_for_citizen_file_twin.twin-small').html('僅允許副檔名為 <strong>.jpeg</strong> 的圖像上傳.');
		$("form.editprofile span.fieldname.goleft:contains('Your birthday')").text('你的生日');
		$("form.editprofile span.fieldname.goleft:contains('Your email here')").text('你的電子郵件信箱');
		$('form.editprofile span#error_for_citizen_email_twin.twin-small').text('認證需要使用你的電子郵件信箱, 所以請勿隨意亂填.');
		$("form.editprofile span.fieldname.goleft:contains('Your password')").text('你的密碼');
		$('form.editprofile span#error_for_password_twin.twin-small').text('如果確定更改個人資料, 請輸入你目前的密碼.');
		$('form.editprofile > .largepadded > input.arrowbutton').attr('value','確定更改');
		$('.citizen_content > div > a.dotted.change_password').text('更改密碼');
	};
};
if (document.location.toString().indexOf("/citizenship")!==-1) {
	$('h1').css('font-family','微軟正黑體,微软雅黑');
	// citizenship request
	$('h1:first').text('國藉申請');
	$("table.info_message > tbody > tr > td:contains('You are not be able to request a new citizenship while being a congress member')").text('由於你目前是國會議員, 所以不能提出國藉申請.');
	$("table.info_message > tbody > tr > td:contains('You are not be able to request a new citizenship while being a party member')").text('由於你目前是政黨成員, 所以不能提出國藉申請.');
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 領域 economy.erepublik.com/en/land/overview/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (host=="economy") {
	if (document.location.toString().indexOf("/land/")!==-1) {
		$('h1').css('font-family','微軟正黑體,微软雅黑');
		// my land
		$("h1:contains('My Land')").replaceText('My Land','我的領域');
		$("h1:contains('Land of')").text($("h1:contains('Land of')").replaceText('Land of','').text()+' 的領域');
		$("a.plain_blue_small > span:contains('Marketplace')").text('商品市場');
		$("a.plain_blue_small > span:contains('+50 Health Building')").text('+50 衛生大樓');
		$("a.plain_blue_small > span:contains('+100 Health Building')").text('+100 衛生大樓');
		$("a.plain_blue_small > span:contains('Town Center')").text('城鎮中心');
		$("a.plain_blue_small > span:contains('Training grounds')").text('訓練場');
		$("a.plain_blue_small > span:contains('Climbing Center')").text('攀岩中心');
		$("a.plain_blue_small > span:contains('Shooting Range')").text('射擊訓練場');
		$("a.plain_blue_small > span:contains('Special Forces Center')").text('特種訓練中心');
		$("a.plain_blue_small > span:contains('Storage (capacity: 1000)')").text('倉庫 (容量: 1000)');
		$("a.plain_blue_small > span:contains('Storage (capacity: 9000)')").text('大型倉庫 (容量: 9000)');
		$("a.plain_blue_small > span:contains('Storage (capacity: 20000)')").text('巨型倉庫 (容量: 20000)');
		// tooltips, hints
		$('a.plain.upgrade.tipser.health').attr('title','升級城鎮中心');
		$('a.plain.upgrade.tipser').attr('title','升級公司');
		$('a.plain.options.tipser').attr('title','公司詳情');
		$('a.plain.manage.tipser').attr('title','管理雇員');
		$('a.plain.resign.tipser').attr('title','辭職');
		$('a.main.build > span').attr('title','點擊這塊土地, 看看你可以建造那些建築物');
		$('a.buyLand.main.empty > span').attr('title','買下這塊土地, 你可以建造建築物在上面');
		$("ul.land_holder > li[title='Grain Farm']").attr('title','農場');
		$("ul.land_holder > li[title='Fruit Orchard']").attr('title','果園');
		$("ul.land_holder > li[title='Fishery']").attr('title','漁場');
		$("ul.land_holder > li[title='Cattle Farm']").attr('title','畜牧場');
		$("ul.land_holder > li[title='Hunting Lodge']").attr('title','狩獵場');
		$("ul.land_holder > li[title='Iron Mine']").attr('title','鐵礦');
		$("ul.land_holder > li[title='Oil Rig']").attr('title','油井');
		$("ul.land_holder > li[title='Aluminium Mine']").attr('title','鋁礦');
		$("ul.land_holder > li[title='Saltpeter Mine']").attr('title','硝石礦');
		$("ul.land_holder > li[title='Rubber Plantation']").attr('title','橡膠園');
		$("ul.land_holder > li[title='Food Factory']").attr('title','食物工廠');
		$("ul.land_holder > li[title='Weapons Factory']").attr('title','武器工廠');
		// work result
		$("#work_results a[title='Show details'] > span:eq(0)").text('顯示細節');
		$("#work_results a[title='Show details'] > span:eq(1)").text('隱藏細節');
		$('#work_results .wdetails_bar > #national_bonus > div:first > small').text('國家資源加成');
		$('#work_results .wdetails_bar > .list.stats > div:first > small').text('個人狀態');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Days worked in a row']").attr('title','連續工作天數');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Experience points']").attr('title','經驗值');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Health loss']").attr('title','體力值');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Raw materials used']").attr('title','使用原料');
		// train result
		$('#train_results .wdetails_content > div > div > small').text('力量');
		$("#train_results a[title='Show details'] > span:eq(0)").text('顯示細節');
		$("#train_results a[title='Show details'] > span:eq(1)").text('隱藏細節');
		$('#train_results .wdetails_bar > .list.friends_bonus > div:first > small').text('邀請好友獎勵');
		$('#train_results .wdetails_bar > .list.friends_bonus_off > div:first > small').text('邀請好友獎勵');
		$('#train_results .wdetails_bar > .list.natural_enemy_bonus > div:first > small').text('世仇戰場獎勵');
		$('#train_results .wdetails_bar > .list.natural_enemy_bonus_off > div:first > small').text('世仇戰場獎勵');
		$('#train_results .wdetails_bar > .list.stats > div:first > small').text('個人狀態');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Super soldier']").attr('title','超級大兵');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Experience points']").attr('title','經驗值');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Health loss']").attr('title','體力值');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Gold loss']").attr('title','金錢');
		// buy land
		$('#buy_land > .pop_repeat > div > .title > strong').text('購買土地');
		$('#buy_land > .pop_repeat > div > .buy_preview > strong').text('新的土地');
		$('#buy_land > .pop_repeat > div > .buy_preview > small').replaceText('Cost','花費');
		$('#buy_land > .pop_repeat > div > a#expandLand').text('擴建');
		// congrats
		$('#congrats > .wrepeat > .wcontent > .txt > h4').text('恭喜');
		$('#congrats > .wrepeat > .wcontent > .txt > p').text('你已經成功買下一塊土地!');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 市場 economy.erepublik.com/en/market/
	//   - 二手 economy.erepublik.com/en/market/company/
	//   - 就業 economy.erepublik.com/en/market/job/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/market/")!==-1) {
		$('h1').css('font-family','微軟正黑體,微软雅黑');
		$('h4').css('font-family','微軟正黑體,微软雅黑');
		// market
		$("#marketplace > h1:contains('Marketplace')").text('商品市場');
		$("#filters_expanded > h4:contains('Select product')").text('請選擇你要購買的產品類型');
		$(".product_selector > ul > li > a[title='Food'] > strong").text('食物');
		$(".product_selector > ul > li > a[title='Weapons'] > strong").text('武器');
		$(".product_selector > ul > li > a[title='House'] > strong").text('房屋');
		$(".product_selector > ul > li > a[title='Moving Tickets'] > strong").text('機票');
		$(".product_selector > ul > li > a[title='Food Raw Material'] > strong").text('食物原料');
		$(".product_selector > ul > li > a[title='Weapon Raw Material'] > strong").text('武器原料');
		$(".product_selector > ul > li > a[title='Hospital'] > strong").text('醫院');
		$(".product_selector > ul > li > a[title='Defense System'] > strong").text('防禦設施');
		$(".product_selector > ul > li.last > a > strong").text('二手公司');
		$("#filters_expanded > #minReq > h4:contains('Select quality')").text('請選擇你要購買的等級');
		$("#filters_summary > .sactual > .sattr > small:exact('Health restore')").text('可恢復體力值');
		$("#filters_summary > .sactual > .sattr > small:exact('Fire Power')").text('火力');
		$("#filters_summary > .sactual > .sattr > small:exact('Durability')").text('耐久度');
		$("#filters_summary > .sactual > .sattr > small:exact('Health')").text('體力值');
		$("#filters_summary > .sactual > .sattr > small:exact('Moving Distance')").text('移動距離');
		$("#filters_summary > .sactual > .sattr > small:exact('Uses/Player')").text("次數/每個玩家");
		$("#filters_summary > .sactual > .sattr > small:exact('Defense Budget')").text("防禦輸出");
		$("#filters_summary > .sactual > .sattr > div > span.solid.health > strong:exact('/ use')").text('/ 每次');
		$("#filters_summary > .sactual > .sattr > div > span.solid.health > strong:exact('/ day')").text('/ 每天');
		$("#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact(' uses')").text(' 次');
		$('#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact("use(s)")').text('次');
		$('#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact("day(s)")').text('天');
		$('#filters_summary > .sactual > .sattr > div > span.solid.moving_distance > strong:exact("zone(s)")').text('區域');
		$("#filters_summary > .sactual > .schange > a > span:contains('Change')").text('更改');
		$("#marketplace > table > thead > tr.m_mainh > th.m_product:contains('Product')").text('產品');
		$('#marketplace > table > thead > tr.m_mainh > th.m_provider').text('供應商');
		$('#marketplace > table > thead > tr.m_mainh > th.m_stock').text('庫存');
		$("#marketplace > table > thead > tr.m_mainh > th.m_price > a[title='Price']").text('價格');
		$('#marketplace > table > thead > tr.m_mainh > th.m_quantity').text('數量');
		$('#marketplace > table > tbody > tr > td.m_buy > a > span').text('購買');
		$("table.info_message > tbody > tr > td:contains('There are no market offers matching you search.')").text('目前沒有販售中的產品.');
		if (document.location.toString().indexOf("/company/")!==-1) {
			// company market
			$("#marketplace > h1:contains('Companies for sale')").text("二手公司拍賣市場");
			$("#marketplace > div.companies_sale > h4:contains('Select company')").text('請選擇你要購買的公司類型');
			$("#marketplace > table > thead > tr.m_mainh > th.m_product:contains('Company')").text('公司名稱');
			$("table.error_message > tbody > tr > td:contains('You can not buy a company in a country for which you do not have citizenship.')").text('你不能購買不同國藉的二手公司.');
			$("table.info_message > tbody > tr > td:contains('There are no companies for sale matching you search.')").text('目前沒有販售中的二手公司.');
		} else if (document.location.toString().indexOf("/job/")!==-1) {
			// job market
			$("#job_market > h1:contains('Job Market')").text("就業市場");
			$("table.info_message > tbody > tr > td:contains('You already have a job at')").replaceText('You already have a job at','你有一份在').replaceText('Company. To apply for this job you have to quit your current job.',"公司的工作. 如果想找新工作, 請先離開現職.");
			$('#job_market > table > thead > tr.jm_mainh > th.jm_company').text('雇主');
			$('#job_market > table > thead > tr.jm_mainh > th.jm_industry').text('公司名稱');
			$('#job_market > table > thead > tr.jm_mainh > th.jm_salary > a').text('日薪');
			$('#job_market > table > thead > tr > th.jm_apply > a > span').text('同意');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 建造 economy.erepublik.com/en/company/create
	// 公司 economy.erepublik.com/en/company/
	//   - 編輯 economy.erepublik.com/en/company/edit/
	//   - 拍賣 economy.erepublik.com/en/company/sell/
	//   - 雇員 economy.erepublik.com/en/company/employees/
	//          economy.erepublik.com/en/company/job-offers/
	//   - 更改 economy.erepublik.com/en/company/migrate/
	//   - 升級 economy.erepublik.com/en/company/customize/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/company/")!==-1) {
		if (document.location.toString().indexOf("/company/create")!==-1) {
			$('h1').css('font-family','微軟正黑體,微软雅黑');
			$('h3').css('font-family','微軟正黑體,微软雅黑');
			// create company
			$('h1:first').text('建造');
			$('.create_building > h3:first').text('請選擇要建造的建築物類型');
			$(".create_links > a[title='Food raw materials'] > span").text('食物原料');
			$(".create_links > a[title='Weapon raw materials'] > span").text('武器原料');
			$(".create_links > a[title='Factories'] > span").text('工廠');
			$(".create_links > a[title='Storage'] > span").text('倉庫');
			$(".create_links > a[title='Training Facilities'] > span").text('訓練設施');
			$('.create_building > h3#second_title').text('請決定建築物');
			$('ul.buildings > li.food:eq(0) > a > strong').text('農場');
			$('ul.buildings > li.food:eq(1) > a > strong').text('果園');
			$('ul.buildings > li.food:eq(2) > a > strong').text('漁場');
			$('ul.buildings > li.food:eq(3) > a > strong').text('畜牧場');
			$('ul.buildings > li.food:eq(4) > a > strong').text('狩獵場');
			$('ul.buildings > li.weapon:eq(0) > a > strong').text('鐵礦');
			$('ul.buildings > li.weapon:eq(1) > a > strong').text('油井');
			$('ul.buildings > li.weapon:eq(2) > a > strong').text('鋁礦');
			$('ul.buildings > li.weapon:eq(3) > a > strong').text('硝石礦');
			$('ul.buildings > li.weapon:eq(4) > a > strong').text('橡膠園');
			$("ul.buildings > li.factories > a > strong:contains('Food')").text('食物工廠');
			$("ul.buildings > li.factories > a > strong:contains('Weapons')").text('武器工廠');
			$("ul.buildings > li.storage > a > strong:contains('Normal')").text('倉庫');
			$("ul.buildings > li.storage > a > strong:contains('Large')").text('大型倉庫');
			$('ul.buildings > li.train:eq(0) > a > strong').text('訓練場');	
			$('ul.buildings > li.train:eq(1) > a > strong').text('攀岩中心');
			$('ul.buildings > li.train:eq(2) > a > strong').text('射擊訓練場');
			$('ul.buildings > li.train:eq(3) > a > strong').text('特種訓練中心');
			$('ul.buildings > li.train > .train_cost').replaceText('train','每次');
			$('form#companyCreateForm a#construct > span').text('確定建造');
		} else {
			$('h2').css('font-family','微軟正黑體,微软雅黑');
			$('h4').css('font-family','微軟正黑體,微软雅黑');
			// company profile
			$('#companyOptions > .content_part > .left_part > ul > li > a.edit').html('<img src="http://www.erepublik.com/images/modules/_icons/company_edit_details.png" alt=""> 編輯詳情');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Sell company')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_sell.png" alt=""> 拍賣公司');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Company profile')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_profile.png" alt=""> 公司資料');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Migrate company')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_migrate.png" alt=""> 更改公司類型');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total food raw material stock')").text('庫存食物原料');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total weapon raw material stock')").text('庫存武器原料');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total food stock')").text('庫存食物');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total weapons stock')").text('庫存武器');
			$("#company_info_panel > .elements > .product_stock > .stats > p:contains('This data is confidential.')").text('相關公司資料保密.');
			$('#company_info_panel > .elements > .finances > h2:first').text('資金額度');
			$('#company_info_panel > .elements > .raw_materials > h2:first').text('產品原料');
			$("#company_info_panel > .elements > .raw_materials > .stats > p:contains('This data is confidential.')").text('相關公司資料保密.');
			$('#company_info_panel > .elements > .raw_materials > .stats > p').replaceText('raw material req. per ','單位原料, 可以生產一單位').replaceText('food','食物.').replaceText('weapon','武器.');
			$('#company_info_panel > .manage_panel > .storage_actions > table > tbody > tr > td > a > span').text('查看倉庫庫存');
			$('#company_info_panel > .manage_panel > .finances_actions > table > tbody > tr > td > a > span').text('查看現金帳戶');
			$('#company_info_panel > .manage_panel > .raw_materials_actions > tbody > tr > td > a > span').text('購買產品原料');
			$('#production_status > table.stats > tbody > tr > td > .employee > big > span:last').text('雇員');
			$('#production_status > table.stats > tbody > tr > td > .employee > .recommended_employees > a.manage_link').text('管理雇員');
			$("table.info_message > tbody > tr > td:contains('You can view your market licences and sell products directly from your')").html('你可以直接檢視及販售自己 <a href="http://www.erepublik.com/en/economy/inventory" rel="noreferrer">倉庫</a> 中的產品.');
			$("table.error_message > tbody > tr > td:contains('This company name is already used by another Erpk entity. Please choose another one.')").text('這個公司名稱已被他人使用, 建議重新選擇其它的名稱.');
			if (document.location.toString().indexOf("/company/edit/")!==-1) {
				// company edit
				$('form#companyEditForm > h2:first').text('公司登記');
				$("form#companyEditForm > .container_blue_border > .company_name > strong:contains('Company name')").text('公司名稱');
				$("form#companyEditForm > .container_blue_border > strong.blued:contains('Company description')").text('關於此公司　　　');
				$("form#companyEditForm > table > tbody > tr > td > a[title='Save changes'] > span").text('確定更改');
			} else if (document.location.toString().indexOf("/company/sell/")!==-1) {
				// company sell
				$('.sell_company > h2:first').text('拍賣公司');
				$('.sell_company > .disolve_company > h2:first').text('解散公司');
				$('.sell_company > .disolve_company > table > tbody > tr > td > p').replaceText('You can dissolve your company for','解散這間公司你可以獲得');
				$(".sell_company > .disolve_company > table > tbody > tr > td > a[title='Dissolve company'] > span").text('解散公司');
				$("table.info_message > tbody > tr > td:contains('Raw Material buildings cannot be sold.')").text('原料建築無法被拍賣販售.')
				$("table.info_message > tbody > tr > td:contains('This building cannot be sold nor dissolved.')").text('這棟建築物無法被拍賣販售.')
				$("table.info_message > tbody > tr > td:contains('Dissolving a company will empty')").text('解散公司會清空土地上己有的建築物, 然後你可以再建造新的建築在上面.')
				$("table.info_message > tbody > tr > td:contains('This company can be put on sale starting with')").replaceText('This company can be put on sale starting with','這間公司在').replaceText('of the New World, at','的').replaceText("(10 days since it was created or bought).","後才能被拍賣. (十天內不能轉讓同間公司)");
			} else if ((document.location.toString().indexOf("/company/employees/")!==-1) || (document.location.toString().indexOf("/company/job-offers/")!==-1)) {
				// company employee
				$('#employee_list > h2:first').text('管理雇員');
				$("#employee_list > ul.ftabs > li > a[title='Employee list']").replaceText('Employee list','雇員清單');
				$("#employee_list > ul.ftabs > li > a[title='Job offers']").replaceText('Job offers','工作職缺');
				$('#employee_list > table > thead > tr.el_mainh > th.el_employee').text('雇員');
				$('#employee_list > table > thead > tr.el_mainh > th.el_productivity > span:first').text('單位產量');
				$('#employee_list > table > thead > tr.el_mainh > th.el_salary > a').text('日薪');
				$('#employee_list > table > tbody > tr > td.el_salary > div > a.f_red_small > span').text('開除');
				$("table.info_message > tbody > tr > td:contains('This company has no employees at the moment')").text('這間公司目前沒有任何雇員.')
				// company job offer
				$('#job_offers > h2:first').text('管理雇員');
				$("#job_offers > ul.ftabs > li > a[title='Employee list']").replaceText('Employee list','雇員清單');
				$("#job_offers > ul.ftabs > li > a[title='Job offers']").replaceText('Job offers','工作職缺');
				$('#job_offers > table > thead > tr.jo_mainh > th.jo_ammount').text('職缺');
				$('#job_offers > table > thead > tr.jo_mainh > th.jo_salary > a').text('日薪');
				$("#job_offers > table > tbody > tr > td > div > a[title='Change'] > span").text('更改');
				$("#job_offers > table > tbody > tr > td > div > a[title='Save'] > span").text('儲存');
				$("table.info_message > tbody > tr > td:contains('This company has no job offers at the moment')").text('這間公司目前沒有任何職缺.')
			} else if (document.location.toString().indexOf("/company/migrate/")!==-1) {
				// company migrate
				// -- my friend tell me this function will be removed in the future \o/ @blakcca
			} else if (document.location.toString().indexOf("/company/customize/")!==-1) {
				// company upgrade, downgrade
				$('.product_design > h2:first').text('升級公司');
				$('.product_design > .container_blue_border > h4:first').text('請選擇你想調整的公司等級');
				$('.product_design > .container_blue_border > ul.packs > li > .product_detail > span').replaceText('Refund','退還').replaceText('Cost','花費').replaceText('Owned','已擁有');
				$('.product_design > .container_blue_border > ul.packs > li > a.upgrade').text('升級');
				$('.product_design > .container_blue_border > ul.packs > li > a.downgrade').text('降級');
			};
		};
	};
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 外匯 www.erepublik.com/en/exchange
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/exchange")!==-1) {
	$('h1').css('font-family','微軟正黑體,微软雅黑');
	$("h1:contains('Monetary Market')").text('外匯市場');
//	$("a#buy_selector > span.selecttags").text('買');
//	$("a#sell_selector > span.selecttags").text('賣');
//	$('table#table_list_offers > tbody > tr:first > th:eq(0)').text('供應商');
//	$('table#table_list_offers > tbody > tr:first > th:eq(1)').text('總量');
//	$('table#table_list_offers > tbody > tr:first > th:eq(2)').text('交換比例');
//	$('table#table_list_offers > tbody > tr:first > th:eq(3)').text('購買數量');
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 倉庫 www.erepublik.com/en/economy/inventory
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/economy/inventory")!==-1) {
	$('#inventory_overview span').css('font-family','微軟正黑體,微软雅黑');
	$('#inventory_overview > a > strong').css('font-family','微軟正黑體,微软雅黑');
	// storage
	$('#inventory_overview > h2:first > span').text('個人倉庫');
	$('#inventory_overview > h2:first > img.storage_tooltip').attr('title','如果想增加你的個人倉庫容量，請擴建土地，並建造額外的倉庫建築。');
	$('#inventory_overview > .items_holder > h4:eq(0)').text('產品');
	$('#inventory_overview > .items_holder > h4:eq(1)').text('資源');
	$('#inventory_overview > .items_holder > h4:eq(2)').text('收集品');
	$(".collection_list > ul > li:[title='Barrel']").attr('title','槍管');
	$(".collection_list > ul > li:[title='Scope']").attr('title','瞄準器');
	$(".collection_list > ul > li:[title='M6A3 Rocket']").attr('title','M6A3 火箭');
	$(".collection_list > ul > li:[title='Trigger Kit']").attr('title','擊發裝置');
	$(".collection_list > ul > li:[title='Stock']").attr('title','槍托');
	$(".collection_list > ul > li:[title='Hammer']").attr('title','鐵鎚');
	$(".collection_list > ul > li:[title='Pliers']").attr('title','鉗子');
	$(".collection_list > ul > li:[title='Saw']").attr('title','電鋸');
	$(".collection_list > ul > li:[title='Shovel']").attr('title','鏟子');
	$(".collection_list > ul > li:[title='Tape Measure']").attr('title','捲尺');
	$('.collection_list > a.assemble').text('組合');
	$('.collection_list > a.assemble').attr('title','組合');
	$('.collection_list > .bazooka > .details > strong').html('Bazoka 火箭筒'+
		'<img src="http://www.erepublik.com/images/modules/storage/info.png" alt="" class="storage_tooltip" original-title="你可以在戰場上發現這些收集品。戰鬥會隨機拿到其中的組件，你可以收集並組裝它。">');
	$('.collection_list > .bazooka > .details > small').text('只需一發即可擊殺對面敵人');
	$('.collection_list > .bazooka > .details > p:eq(0)').attr('title','耐久度');
	$('.collection_list > .bazooka > .details > p:eq(1)').attr('title','火力');
	$('.collection_list > .bazooka > .details > p:eq(1) > span').text('5000 / 每發');
	$('.collection_list > .toolbox > .details > strong').html('工具箱'+
		'<img src="http://www.erepublik.com/images/modules/storage/info.png" alt="" class="storage_tooltip" original-title="你可以在領域中發現這些收集品。生產原料會隨機拿到其中的組件，你可以收集並組裝它。">');
	$('.collection_list > .toolbox > .details > small').text('使你的原料產量加倍');
	$('.collection_list > .toolbox > .details > p:eq(0)').attr('title','耐久度');
	// control module
	$('#inventory_overview > a.inventory_sell > strong').text('販售');
	$('#inventory_overview > a.inventory_sell > small').text('將物品放到市場販售');
	$('#inventory_overview > a.inventory_buy > strong').text('購買');
	$('#inventory_overview > a.inventory_buy > small').text('從市場購買東西');
	$('#sell_offers th.offers_product > strong').text('產品');
	$('#sell_offers th.offers_quantity > strong').text('數量');
	$('#sell_offers th.offers_price > .relative > strong').text('價格 / 每個');
	$('#sell_offers th.offers_market > .relative > strong').text('市場');
	$('#sell_offers th.offers_market > .relative > small > a#buy_license').text('購買交易證');
	$('#sell_offers th.offers_action > a > span').text('確定販售');
	$('#sell_offers a.delete_offer').attr('title','取消');
	$('.buy_market_shell > a#buy_market_license > span').text('購買市場交易證');
	$('.buy_market_shell > a#select_buy_license_country > span#buy_license_country_name').text('請選擇一個國家');	
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 戰爭 www.erepublik.com/en/wars/
//   - 清單 www.erepublik.com/en/wars/show/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/wars/")!==-1) {
	$('h1').css('font-family','微軟正黑體,微软雅黑');
	$('h2').css('font-family','微軟正黑體,微软雅黑');
	// war
	$('h1:first').text('戰爭');
	$('#war_type_filter > div > .core > div > h2.goleft.big:first').text('請選擇戰爭形式');
	$('#war_type_filter > div > .core > ul:eq(0) > li > a').html('<img src="/images/parts/icon_warlist_war.gif" class="flag" alt="">征服戰爭');
	$('#war_type_filter > div > .core > ul:eq(1) > li > a').html('<img src="/images/parts/icon_warlist_resistancewar.gif" class="flag" alt="">起義戰爭');
	$('#war_type_filter > div > .core > ul:eq(2) > li > a').html('<img src="/images/parts/icon_warlist_allwars.gif" class="flag" alt="">所有戰爭');
	$('#war_status_filter > div > .core > div > h2.goleft.big:first').text('請選擇戰爭狀態');
	$('#war_status_filter > div > .core > ul:eq(0) > li > a').html('<img src="/images/parts/icon_warlist_active.gif" class="flag" alt="">進行中');
	$('#war_status_filter > div > .core > ul:eq(1) > li > a').html('<img src="/images/parts/icon_warlist_inactive.gif" class="flag" alt="">已結束');
	$('#war_status_filter > div > .core > ul:eq(2) > li > a').html('<img src="/images/parts/icon_warlist_allstates.gif" class="flag" alt="">所有戰爭');
	$('#war_country_filter > div > .core > div > h2.goleft.big:first').text('請選擇參戰國家');
	$.each( $(".warholder > .attacker > .nameholder:contains('Resistance Force')"), function() {
		$(this).html($(this).replaceText('Resistance Force of ','').text()+'<span id="CHT">反抗軍</span>');});
	$('.nameholder > #CHT').css('font-family','微軟正黑體,微软雅黑');
	$('.warholder > .attacker > a').replaceText('allies','盟國').replaceText('no ','沒有');;
	$('.warholder > .defender > a').replaceText('allies','盟國').replaceText('no ','沒有');;
	$('.warholder > .middle > a.details').text('詳情');
	if (document.location.toString().indexOf("/wars/show/")!==-1) {
		// choose war and battlefiled
		var rCoun = document.title.toString().split("|")[1].split(" vs ")[0];
		$('.war_list_header > .country.left_side > div > h3.resistance').css('width','160px');
		$(".war_list_header > .country.left_side > div > h3:contains('Resistance Force')").html(rCoun+' <span id="CHT">反抗軍</span>');
		$('.war_list_header > .country.left_side > div > h3 > #CHT').css('font-family','微軟正黑體,微软雅黑');
		$('.war_list_header > .country > div > a').replaceText('allies','盟國').replaceText('no ','沒有');
		$('.war_list_header > .vs > small').replaceText('Still active','戰爭持續中');
		$('.listing > a.reversed > span').replaceText('Join','加入');
		$(".listing > a.join[title='Join Resistance'] > span").text('加入起義勢力');
		$(".listing > a.join[title='Join'] > span").text('加入');
		$('.listing > small').replaceText('started on','目前戰場開啟自: ');
		$(".listing.done > small:contains('Conquered by')").replaceText('Conquered by','佔領成功:');
		$(".listing.done > small:contains('Secured by')").replaceText('Secured by','防守成功:');
		$("table.info_message > tbody > tr > td:contains('This war is no longer active.')").text('這場戰爭已經結束.');
		$("table.warning_message > tbody > tr > td:contains('is about to attack.')").replaceText('is about to attack.','即將發動攻擊.');
	};
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 戰場/戰役
//   - 戰場 www.erepublik.com/en/military/battlefield/
//   - 戰役 www.erepublik.com/en/military/campaigns
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/military/")!==-1) {
	if (document.location.toString().indexOf("/military/battlefield/")!==-1) {
		$('#pvp_header > .battle_hero.left_side').attr('title','我們的 戰鬥英雄');
		$('#pvp_header > .domination > .domibar > #left_points').attr('title','國家分數');
		$('#pvp_header > .domination > .domibar > #right_points').attr('title','敵人的 國家分數');
		$('#pvp_header > .battle_hero.right_side').attr('title','敵人的 戰鬥英雄');
		$.each( $("#pvp_header > .country > div > h3:contains('Resistance Force')"), function() {
			$(this).html($(this).replaceText('Resistance Force Of ','').text()+' <span id="CHT">反抗軍</span>');});
		$('#pvp_header > .country > div > h3 > #CHT').css('font-family','微軟正黑體,微软雅黑');
		$('#pvp_header > .country > div > a').replaceText('allies','盟國').replaceText('no ','沒有');
		$('#pvp_battle_area > table.damage_aligner > tbody > tr > td > #total_damage').attr('title','我目前累計的戰場影響力.');
		$('#pvp_battle_area > table.damage_aligner > tbody > tr > td > #total_damage > small').text('我的戰場影響力');
		$('#pvp_battle_area > .player.left_side > a#change_weapon').attr('title','更換武器');
//		$('#pvp_actions > .action_holder > a#heal_btn').attr('title','按此吃食物');
		$('#pvp_actions > .action_holder > a#fight_btn').text('戰鬥');
		$('#pvp_actions > .action_holder > a#fight_btn').attr('title','戰鬥!');
		$('#pvp > a#go_stats.battle_stats_button').attr('title','戰場統計');
		$('#pvp > a.help_button').attr('title','開啟幫助視窗');
		$('.battle_stats > .top > h3:first').text('戰役統計');
		$('.battle_stats > .repeat > .content > .lister > .head > .one').text('公民');
		$('.battle_stats > .repeat > .content > .lister > .head > .two').text('擊倒數');
		$('.battle_stats > .repeat > .content > .lister > .head > .three').text('戰場影響力');
		// defeated-pop-box
		$('#enemy_defeated > .heading > h2').text('擊倒敵人');
		$('#enemy_defeated > .content > div:eq(0) > strong').text('戰場影響力');
		$('#enemy_defeated > .content > div#natural_enemy_bonus > strong').text('世仇戰場獎勵');
		$('#enemy_defeated > .content > div:eq(2) > strong').text('軍階點數');
		$('#enemy_defeated > .content > div:eq(3) > strong').text('經驗值');
		$('#enemy_defeated > a#add_damage_btn').text('增加戰場影響力');
		// rank-up-pop-box
		$('#rank_up > .heading > p').text('恭喜, 你的軍階提升到');
		$('#rank_up > .content > div:eq(0) > strong').text('軍階獎勵加成');
		$('#rank_up > .content > div:eq(1) > strong').text('+1 能量棒');
		$('#rank_up > a#add_rank_btn').text('領取獎勵');
		// other-box
		$('#battle_loader > a.green_go').replaceText('Next battle','下場戰局');
		$('#battle_end > a.green_go').text('查看其它戰役');
		$('#collection_complete.bazooka_pop > strong').text('恭喜, 完成Bazooka火箭筒的收集!');
		$("#collection_complete.bazooka_pop > a[title='Build your Bazooka']").text('組合');
		$("#timer > div > strong:contains('Are you')").text('你還在嗎?');
		$("#timer > div > a > span:contains('still here')").text('沒錯, 被你猜對了');
		// change location
		$('#options_box > p.info').text('你需要移動至其中一個國家, 才能參與這場戰鬥. 是否決定現在就出發呢?');
		$('#options_box > a#change_location.fluid_blue_dark > span').text('移動所在地');
		$('#options_box > a#nope.plain').text('不用了, 謝謝.');
	} else if (document.location.toString().indexOf("/military/campaigns")!==-1) {
		$('h1').css('font-family','微軟正黑體,微软雅黑');
		// Military campaigns list
		$('h1:first').text('戰役列表');
		$("#battle_listing > h4:exact('Campaign of the day')").text('本日戰役');
		$("#battle_listing > h4:contains('Allies')").text('目前 同盟國 的戰役');
		$("#battle_listing > h4:contains('Campaigns')").text('目前 '+$("#battle_listing > h4:contains('Campaigns')").replaceText('Campaigns','的戰役').text());
		$('#battle_listing a.victory_flag').text('勝利');
		$("#battle_listing span:contains('Fight')").text('戰鬥');
		$("#battle_listing span:contains('Victory')").text('勝利　');
	};
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 新聞 www.erepublik.com/en/news
// 熱門 www.erepublik.com/en/news/rated/all/
// 即時 www.erepublik.com/en/news/latest/all/
// 訂閱 www.erepublik.com/en/news/subscriptions
// 國際 www.erepublik.com/en/news/international
// 事件 www.erepublik.com/en/news/military
//   - 文章 www.erepublik.com/en/article/
//   - 報紙 www.erepublik.com/en/newspaper/
//   - 編輯 www.erepublik.com/en/edit-newspaper/
//   - 修文 www.erepublik.com/en/edit-article/
//   - 寫文 www.erepublik.com/en/write-article
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/news/")!==-1) {
	$('body#media h1').css('font-family','微軟正黑體,微软雅黑');
	$('body#media h2').css('font-family','微軟正黑體,微软雅黑');
	// news area
	$("h1:first:exact(' News')").text('新聞區');
	$("h1:first:exact('First steps in eRepublik News')").text('新聞區 - 新人指導及教育');
	$("h1:first:exact('Battle orders News')").text('新聞區 - 軍事命令以及訊息');
	$("h1:first:exact('Warfare analysis News')").text('新聞區 - 戰略分析');
	$("h1:first:exact('Political debates and analysis News')").text('新聞區 - 政治論壇及分析');
	$("h1:first:exact('Financial business News')").text('新聞區 - 經濟焦點');
	$("h1:first:exact('Social interactions and entertainment News')").text('新聞區 - 社交娛樂');
	$('#filters > .rightfilters > .core > ul.news_filters > li:eq(0) > a').attr('title','新人指導及教育');
	$('#filters > .rightfilters > .core > ul.news_filters > li:eq(1) > a').attr('title','軍事命令以及訊息');
	$('#filters > .rightfilters > .core > ul.news_filters > li:eq(2) > a').attr('title','戰略分析');
	$('#filters > .rightfilters > .core > ul.news_filters > li:eq(3) > a').attr('title','政治論壇及分析');
	$('#filters > .rightfilters > .core > ul.news_filters > li:eq(4) > a').attr('title','經濟焦點');
	$('#filters > .rightfilters > .core > ul.news_filters > li:eq(5) > a').attr('title','社交娛樂');
	$('#filters > .rightfilters > .core > .your_subs').html('</br>你目前訂閱<strong>'+$("#filters > .rightfilters > .core > .your_subs > strong").text()+'</strong>份報紙<a href="javascript:;" class="fluid_blue_dark" onclick="$j(\'.asubs\').toggle();" title=""><span>變更</span></a>');
	$('#filters > .rightfilters > .asubs > .acontrols > a.aselectall').text('選擇全部');
	$('#filters > .rightfilters > .asubs > .acontrols > a#unsubscribeAction > span').text('取消訂閱');
	$('#domain_selector_holder > div > .core > div > div > h2.goleft.big:first').text('請選擇新聞類型');
	$('#domain_selector_holder > div > .core > ul > .last:eq(0)').html('<a href=\"/en/news/rated/all/Republic-of-China-Taiwan/1\"><img class="icon" src="/images/parts/icon_media_toprated.gif" alt="Icon_media_toprated"> 熱門新聞</a>');
	$('#domain_selector_holder > div > .core > ul > .last:eq(1)').html('<a href=\"/en/news/latest/all/Republic-of-China-Taiwan/1\"><img class="icon" src="/images/parts/icon_media_latest.gif" alt="Icon_media_latest"> 最新報紙</a>');
	$('#domain_selector_holder > div > .core > ul > .last:eq(2)').html('<a href=\"http://www.erepublik.com/en/news/military\"><img class="icon" src="/images/parts/icon_media_military.gif" alt="Icon_media_military"> 最新事件</a>');
	$('#domain_selector_holder > div > .core > ul > .last:eq(3)').html('<a href=\"http://www.erepublik.com/en/news/international\"><img class="icon" src="/images/parts/icon_media_international.gif" alt="Icon_media_international"> 國際焦點</a>');
	$('#domain_selector_holder > div > .core > ul > .last:eq(4)').html('<a href=\"http://www.erepublik.com/en/news/subscriptions\"><img class="icon" src="/images/parts/icon_media_subscriptions.gif" alt="Icon_media_subscriptions"> 訂閱的報紙</a>');
	$('#country_holder > div > .core > div > div > h2.goleft.big:first').text('請選擇一個國家');
	// catalog link
	$("a:contains('First steps in eRepublik')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_1.png"> 新人指導及教育');
	$("a:contains('Battle orders')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_2.png"> 軍事命令以及訊息');
	$("a:contains('Warfare analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_3.png"> 戰略分析');
	$("a:contains('Political debates and analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_4.png"> 政治論壇及分析');
	$("a:contains('Financial business')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 經濟焦點');
	$("a:contains('Social interactions and entertainment')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 社交娛樂');
} else if ((document.location.toString().indexOf("/article/")!==-1) || (document.location.toString().indexOf("/newspaper/")!==-1)) {
	// newspaper, article
	$('body#newspaper > #container > #content > h2.newspaper_section').text('關於本報');
	$('.profilemenu > li > a.houdini.subscribeToNewspaper').text('訂閱');
	$('.profilemenu > li > a.houdini.unsubscribeFromNewspaper').text('取消訂閱');
	$(".profilemenu > li > a:exact('Write article')").text('寫新文章');
	$(".profilemenu > li > a:exact('Edit newspaper details')").text('編輯詳情');		
	// catalog link
	$("a:contains('First steps in eRepublik')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_1.png"> 新人指導及教育');
	$("a:contains('Battle orders')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_2.png"> 軍事命令以及訊息');
	$("a:contains('Warfare analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_3.png"> 戰略分析');
	$("a:contains('Political debates and analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_4.png"> 政治論壇及分析');
	$("a:contains('Financial business')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 經濟焦點');
	$("a:contains('Social interactions and entertainment')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 社交娛樂');
	// other link
	$('a#comments_button_on > span').replaceText('Comments','留言');
	$('#subscribe_comments > form > .submitpost-start > .submitpost-core > p.padded').text('你的留言');
	$("#subscribe_comments > form > .submitpost-start > .submitpost-core > input.submit[name='commit']").attr('value','新增留言');
	$('a.report.newspaper').text('檢舉本報');
	$('a.report.articlereport').text('檢舉本文');
	$('a.shower.report.commentswitch').text('檢舉留言');
	$('a.report.onz.commentcontent').text('檢舉此留言');
	$('span.vroundbtnh25-start > span.vroundbtnh25-end > a.vroundbtnh25-core').text('編輯');
	$('span.vroundbtnh25_red-start > span.vroundbtnh25_red-end > a.vroundbtnh25_red-core').text('刪除');
} else if (document.location.toString().indexOf("/edit-newspaper/")!==-1) {
	$('.fieldname').css('font-family','微軟正黑體,微软雅黑');
	// edit newspaper
	$(".profilemenu > li > a:exact('Write article')").text('寫新文章');
	$(".profilemenu > li > a:exact('Edit newspaper details')").text('編輯詳情');
	$('.accountinfo > .accountdisplay > span.rightpadded').text('你的現金帳戶');
	$("form.companydetails > .largepadded > .fieldname:contains('Newspaper name')").text('報紙名稱');
	$('form.companydetails > .largepadded > span#error_for_newspaper_name_twin').text('只允許6-25個字元.');
	$("form.companydetails > .largepadded > .fieldname:contains('Description')").text('關於本報');
	$("form.companydetails > .largepadded > .fieldname:contains('Location')").text('地點');
	$('form.companydetails > .largepadded > span#error_for_country_list_twin').text('更改發報地點, 只能在自己的國家發行報紙.');
	$("form.companydetails > .largepadded > .fieldname:contains('Newspaper logo')").text('報紙標誌');
	$('form.companydetails > .largepadded > span.goleft > span#error_for_newspaper_image_twin').text('只允許上傳 JPG 圖檔.');
	$("form.companydetails > .largepadded > .fieldname:contains('Cost')").text('花費');
	$('form.companydetails > .largepadded > span.accountdisplay > a.btnGetGold').text('購買黃金');
	$("form.companydetails > .buttonalign > input.arrowbutton[name='commit']").attr('value','確定更改');
} else if ((document.location.toString().indexOf("/edit-article/")!==-1) ||(document.location.toString().indexOf("/write-article")!==-1)) {
	$('h2').css('font-family','微軟正黑體,微软雅黑');
	$('.smallpadded').css('font-family','微軟正黑體,微软雅黑');
	// edit, write article
	$(".profilemenu > li > a:exact('Write article')").text('寫新文章');
	$(".profilemenu > li > a:exact('Edit newspaper details')").text('編輯詳情');
	$(".holder > .bordersep > h2.goleft:contains('Edit article')").text('編輯文章');
	$(".holder > .bordersep > h2.goleft:contains('Write article')").text('寫新文章');
	$(".holder > .bordersep > a.btn-arrow-left.goright:exact('Back')").text('返回');
	$("form.writearticle > .inputholder > .smallpadded:contains('Title')").text('標題');
	$('form.writearticle > .inputholder > span#error_for_article_name_twin').text('只允許1-80個字元');
	$("form.writearticle > .inputholder > .smallpadded:contains('Article')").text('文章');
	$("table.info_message > tbody > tr > td:contains('By choosing a category which')").text('為你的文章內容選擇一個類別, 讓你的潛在讀者們更容易找到感興趣的文章.');
	$("form.writearticle > .inputholder > div.smallpadded:contains('Category')").text('內容分類');
	$("form.writearticle > .inputholder > select#article_category > option[value='0']").text('請選擇');
	$("form.writearticle > .inputholder > select#article_category > option[value='1']").text('- 新人指導及教育');
	$("form.writearticle > .inputholder > select#article_category > option[value='2']").text('- 軍事命令以及訊息');
	$("form.writearticle > .inputholder > select#article_category > option[value='3']").text('- 戰略分析');
	$("form.writearticle > .inputholder > select#article_category > option[value='4']").text('- 政治論壇及分析');
	$("form.writearticle > .inputholder > select#article_category > option[value='5']").text('- 經濟焦點');
	$("form.writearticle > .inputholder > select#article_category > option[value='6']").text('- 社交娛樂');
	$("form.writearticle > div > input.arrowbutton[value='Publish']").attr('value','發佈');
	$("form.writearticle > div > input.arrowbutton[value='Edit']").attr('value','編輯');
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 政黨 www.erepublik.com/en/party/
// 成員名單 www.erepublik.com/en/party-members/
// 主席名單 www.erepublik.com/en/party-candidates/
// 議員名單 www.erepublik.com/en/propose-congressman/
// 總統名單 www.erepublik.com/en/presidential-candidates/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/party/")!==-1) {
	$('h2').css('font-family','微軟正黑體,微软雅黑');
	// party
	$("h2.section:contains('Info')").text('政黨資訊');
	$(".infoholder > .largepadded > span.field:exact('Members')").text('成員');
	$(".infoholder > .largepadded > span.field:exact('Orientation')").text('政黨傾向');
	$('.infoholder > .largepadded > span.goleft').replaceText('Center','中堅').replaceText('Libertarian','自由主義');
	$("h2.section:contains('Elections')").text('選舉');
	$('.indent > .bordersep:eq(0) > h2.section').html('<img title="每個月 15 號由黨員共同選出." class="icon padded tooltip" src="/images/parts/icon_position_politics_partypresident.gif" alt="Icon_position_politics_partypresident">黨主席選舉');
	$(".infoholder > p.smallholder:contains('Party President')").text('黨主席');
	var pp_1 = $(".indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first > .special:eq(0)").text();
	var pp_2 = $(".indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first > .special:eq(1)").text();
	$('.indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first').html('下次黨主席選舉於 <span class="special">'+pp_1+'</span> 後，目前有<span class="special">'+pp_2+'</span>位候選人.');
	$('.indent > .bordersep:eq(1) > h2.section').html('<img title="每個月 25 號由各地公民共同選出." class="icon padded tooltip" src="/images/parts/icon_position_politics_congressman.gif" alt="Icon_position_politics_congressman">議員選舉');
	var cm_1 = $('.indent > .bordersep:eq(1) > .subindent > .infoholder > .field > p > span.special:first').text();
	var cm_2 = $('.indent > .bordersep:eq(1) > .subindent > .infoholder > p > span.special:first').text();
	$('.indent > .bordersep:eq(1) > .subindent > .infoholder > .field > p:first').html('本黨目前有 <span class="special">'+cm_1+'</span> 位議員，');
	$('.indent > .bordersep:eq(1) > .subindent > .infoholder > p:first').html('約佔議會 <span class="special">'+cm_2+'</span> 的席次.');
	if ($('.indent > .bordersep:eq(2) > .subindent > .infoholder > p > span.special:first').length==1) {
		var cm_3 = $('.indent > .bordersep:eq(2) > .subindent > .infoholder > p > span.special:first').text();
		$('.indent > .bordersep:eq(2) > .subindent > .infoholder > p:first').html('下次議員選舉於 <span class="special">'+cm_3+'</span> 後.');
	} else {
		$('.indent > .bordersep:eq(2) > .subindent > .infoholder > p:first').html('國會議員選舉日.');
	};
	$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > h2:first').text('參選議員');
	$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > .holder').replaceText('Do you agree to represent your party in the congress election in','請問你是否同意, 代表你的政黨參選').replaceText('?',' 區的議員?');
	$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.padded:first').text('請在下方填入你的政見連結, 來向選民們說明為何要投你一票.');
	$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.largepadded > span:last').html('可以提供 外部網頁 或 <strong>私人論譠</strong> 的連結.');
	$(".indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.goright > span > span > input[value='Agree']").attr('value','同意');
	$(".indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.goright > span > span > input[value='Cancel']").attr('value','放棄');
	$('.indent > h2.section').html('<img title="每個月 5 號由全國公民共同選出." class="icon padded tooltip" src="/images/parts/icon_position_politics_president.gif" alt="Icon_position_politics_president">總統選舉');
	$(".indent > .subindent:eq(0) > .bordersep > .infoholder > p.smallholder:contains('Winner')").text('總統當選人');
	var cp_1 = $('.indent > .subindent:eq(1) > .infoholder > p:first > span.special:first').text();
	$('.indent > .subindent:eq(1) > .infoholder > p:first').html('下次總統選舉於 <span class="special">'+cp_1+'</span> 後.');
	$(".indent > .subindent:eq(2) > .infoholder > p.smallholder:contains('No candidate proposed')").text('尚未提名總統候選人.');
	// control buttons
	$('a.report.party').text('檢舉政黨');
	$(".action a:exact('Show all members')").text('黨員名單');
	$(".action a:exact('Show results')").text('查看選舉結果');
	$(".action a:exact('Show candidate list')").text('查看候選人名單');
	$(".action a:exact('Show candidates list')").text("查看候選人名單");
	$(".action a:exact('Show proposed members of congress')").text('查看參選名單');
	$(".action a:contains('Join party')").text('加入此黨');
	$(".action a:contains('Resign')").text('離開此黨');
	$(".action a:exact('Run for congress')").text('參加議員選舉');
	$(".action a:exact('Retire')").text('退選');
	$(".action a:exact('Candidate')").text('參選');
	$(".action a:exact('Vote')").text("投票");
} else if ((document.location.toString().indexOf("/party-members/")!==-1) || (document.location.toString().indexOf("/party-candidates/")!==-1)) {
	$('h2').css('font-family','微軟正黑體,微软雅黑');
	$('p.smallholder').css('font-family','微軟正黑體,微软雅黑');
	// party members, candidates list
	$("h2.biggersection:contains('Party members')").text('黨員名單');
	$("h2.biggersection:contains('Party candidates')").text('黨主席候選人名單');
	$(".indent > .bordersep > p.smallholder:contains('Party Member')").replaceText('Party Member','政黨成員');
	$(".indent > .bordersep > p.smallholder:contains('Congress Member')").replaceText('Congress Member','國會議員');
	$(".indent > .bordersep > p.smallholder:contains('Party President')").replaceText('Party President','黨主席');
	$('.holder > .indent').replaceText('No candidates applied yet','目前尚未有候選人.');
	$('.holder > a.btn-arrow-left.goright').text('政黨頁面');
	$('a.report.party').text('檢舉政黨');
} else if (document.location.toString().indexOf("/propose-congressman/")!==-1) {
	$('h2').css('font-family','微軟正黑體,微软雅黑');
	// party congressman list
	$("h2.biggersection:contains('Congress member candidates')").text('國會議員參選名單');
	$('.infoalert > p:eq(0)').html('<strong>1.</strong> 政黨成員每月的 16 號到 23 號間，可以報名參選國會議員.');
	$('.infoalert > p:eq(1)').html('<strong>2.</strong> 黨主席可以在每月的 24 號，調整最終議員參選名單.');
	$('.infoalert > p:eq(2)').html('<strong>3.</strong> 每個政黨在每個區域，最多只能提名三名國會議員參選人.');
	$("select#region_list > option[value='0']").text('請選擇一個區域');
	$('.holder > .candidates > .list-title').replaceText('Official candidates','正式候選人');
	$('.holder > a.btn-arrow-left.goright').text('政黨頁面');
	$('a.report.party').text('檢舉政黨');
} else if (document.location.toString().indexOf("/presidential-candidates/")!==-1) {
	$('h1').css('font-family','微軟正黑體,微软雅黑');
	$('h2').css('font-family','微軟正黑體,微软雅黑');
	$('th').css('font-family','微軟正黑體,微软雅黑');
	// president candidates list
	$('body#elections h1:first').text('總統候選人名單');
//	$(".bordersep > h2:exact('Country')").text("請選擇一個國家");
	$('table.elections > tbody > tr:first > th:eq(0)').text('候選人');
	$('table.elections > tbody > tr:first > th:eq(1)').text('支持的政黨');
	$('table.elections > tbody > tr:first > th:eq(2)').text('國家目標');
	$('table.elections > tbody > tr > td.of_goals > .goal_setter > .nogoals > small').text('沒有設定任何目標');
	$("table.info_message > tbody > tr > td:contains('No candidates applied yet')").text('目前尚未有總統候選人.');
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//選舉中心 www.erepublik.com/en/elections/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/elections/")!==-1) {
	$('h1').css('font-family','微軟正黑體,微软雅黑');
	$('h2').css('font-family','微軟正黑體,微软雅黑');
	$('th').css('font-family','微軟正黑體,微软雅黑');
	// elections
	$('body#elections h1:first').text('選舉中心');
	$("#filters > .rightfilters > .core > .info > p.smallpadded > strong:exact('Next elections')").text('下次選舉');
	$("#filters > .rightfilters > .core > .info > p:last > strong:contains('Country President')").text('國家總統');
	$("#filters > .rightfilters > .core > .info > p:last > strong:contains('Party President')").text('政黨主席');
	$("#filters > .rightfilters > .core > .info > p:last > strong:contains('Congress')").text('國會議員');
	$("#country_filters > .extended-menus > .core > .bordersep > h2:contains('Country')").text('請選擇一個國家');
	$("#region_filters > .extended-menus > .core > .bordersep > h2:contains('Country')").text('請選擇一個地區');
	$("#region_filters > .extended-menus > .core > ul:first > li:first > a[id='0__All regions']").text('所有地區');
	$("#election_filters > .extended-menus > .core > .bordersep > h2:contains('Election')").text('請選擇選舉類型');
	$('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#president').text('總統選舉');
	$('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#congress').text('國會議員選舉');
	$('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#party').text('黨主席選舉');
	$("#party_filters > .extended-menus > .core > .bordersep > h2:contains('Parties')").text('請選擇一個政黨');
	$("#dateSelect_filters > .extended-menus > .core > .bordersep > h2:contains('Month/Year')").text('月份 / 年');
	$("body#elections h2.special:contains('Official Results')").text('統計結果公告');
	// president
	$(".vote_box > .vote_box_layer > .vote_box_info > h4:contains('Goals')").text('目標');
	$('.vote_box > .vote_block > p').replaceText('votes','票');
	$(".vote_totals > p > span:contains('Total votes')").replaceText('Total votes:','總投票數：');
	if ((document.location.toString().indexOf("election-congress")!==-1) || (document.location.toString().indexOf("election-party")!==-1)){
		// congress
		$("table.electiondetails th:contains('Official candidates')").replaceText('Official candidates','正式名單');
		$("table.electiondetails th:contains('Wildcards')").replaceText('Wildcards','外卡名單');
		$("table.electiondetails th:contains('Not qualified')").replaceText('Not qualified','落選');
		$("table.electiondetails th:contains('Member of')").text('所屬政黨');
		$("table.electiondetails th:contains('No. of votes')").text('得票數');
		$("table.electiondetails span.smalldotted:exact('Presentation')").text('政見發表');
		$("table.electiondetails span.smalldotted:exact('No presentation')").text('沒有政見發表');
		// party
		$("table.elections th:exact('No.')").text('編號');
		$("table.elections th:contains('Candidate')").text('候選人');
		$("table.elections th:contains('No. of votes')").text('得票數');
		$("table.elections th:contains('% of votes')").text('得票率');
		$("table.elections a:exact('Vote')").text('投票');
		// others
		$("#messagealert.infoicon > p:exact('No data available yet')").text("目前沒有任何資料");
		var v_num = $('p.regular > span#number_of_votes').text();
		$('p.regular').html('總投票數: <span class="special rightpadded" id="number_of_votes">' +v_num+ '</span>');
	};
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 軍團 www.erepublik.com/en/main/group-home/
// 創立 www.erepublik.com/en/main/group-create/
// 首頁 www.erepublik.com/en/main/group-show/
// 列表 www.erepublik.com/en/main/group-list/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/group-")!==-1) {
	$('h1').css('font-family','微軟正黑體,微软雅黑');
	if (document.location.toString().indexOf("/group-home/")!==-1) {
		// group-home
		$('body#military_units h1:first').text('軍團');
		$("table.info_message > tbody > tr > td > strong:contains('You are not a soldier of any Military Unit')").parent().html(
			'<strong>你目前不是任何軍團的成員</strong>你可以加入目前現有的軍團，或是自行創立一個自己想要的軍團。<br>加入軍團可以使你跟隨其他團員的腳步並更加團結，一同在戰場上作戰輸出。<br><a class="wicked" href="http://wiki.erepublik.com/index.php/Military_unit" target="_blank">更多軍團資訊</a>');
		$('#military_units_home > .create_military_unit > table > tbody > tr > td > a > span').text('創立軍團');
		$('#military_units_home > .join_military_unit > h3:first').text('提出申請加入軍團');
	} else if (document.location.toString().indexOf("/group-create/")!==-1) {
		$('body#create h1:first').text('創立軍團');
		$("table.warning_message > tbody > tr > td:contains('The Military Unit will be located in')").text('軍團總部將會設立在你公民國藉的國家中. 注意, 當你創立好軍團, 日後將不能更改軍團名稱及所在地點, 只能更改圖標和描述.')
		$('#create_military_unit > .holder.create_company > h2:first').text('軍團需求');
		$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(0) > div').replaceText('Funding Fee','啟動資金');
		$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(1) > div').replaceText('Military Rank','軍階等級');
		$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(2) > div').replaceText('Experience Level','經驗等級');
	} else if ((document.location.toString().indexOf("/group-show/")!==-1) || (document.location.toString().indexOf("/group-list/")!==-1)) {
		$('h3').css('font-family','微軟正黑體,微软雅黑');
		// group-show, group-list
		$('#military_group_header > .header_content > h2:first > big').replaceText('members','成員');
		$("#military_group_header > .header_content > .details > strong:contains('Location:')").text('所在地:');
		$("#military_group_header > .header_content > .details > strong:contains('Commander:')").text('指揮官:');
		$('#military_group_header > .header_content > .details > a.big_action.join > strong').text('加入');
		$("#military_group_header > .header_content > .details > a.simple > strong:contains('Resign')").text('退出軍團');
		$("#military_group_header > .header_content > .details > a:contains('View rank')").text('軍團排名');
		$("#military_group_header > .header_content > .details > a.backmu").text('返回軍團首頁');
		$("#group_right_column > .leader > h3:first:contains('Commander')").text('軍團指揮官');
		$("#group_right_column > .leader > h3:last:contains('Captain')").text('軍團小隊長');
		$('#group_right_column > .members > h3:first').replaceText('Members','軍團成員');
		$('#group_right_column > .members > a.show_all').text('查看全部');
		$('#group_orders > h3:first').text('新兵任務');
		$('#group_orders > p:first').text('完成這些任務, 就能成為這個軍團的正式隊員.');
		$('#group_orders > .requirements > ul.req_content > li:eq(0) > .details > strong').text('獲得軍階: 中士 (Sergeant)');
		$('#group_orders > .requirements > ul.req_content > li:eq(1) > .details > strong').text('以軍團成員的身份擊倒 25 個敵人');
		$('#group_orders > .requirements > ul.req_content > li:eq(2) > .details > strong').text('在 5 場不同的戰役中, 為國家和我們的同盟而戰');
		$("#group_feeds > h3:first").text('軍團塗鴉牆');
		$('#group_feeds > #citizen_feed > .shouter > form#wall_post > textarea#shout.expand').text('和軍團的朋友們說些有趣的東西吧');
		$('#group_feeds > #citizen_feed > .shouter > form#wall_post > span.controls > a.post_button > b').text('分享');
		$("#group_feeds > #citizen_feed a[trigger='reply']").text('留言');
		$("#group_feeds > #citizen_feed span[trigger='add_comment']").text('留言');
		$("#group_feeds > #citizen_feed div.fake_input").text('留言吧');
//		$("#group_feeds > #citizen_feed a[target='reportpopup']").text('檢舉');
		$("table.info_message > tbody > tr > td:contains('You must be a member of')").text('你必須加入此軍團, 才能觀看軍團塗鴉牆.');
		$("table.error_message > tbody > tr > td:contains('Sorry, you need to have the same citizenship')").text('對不起, 你必須和該軍團相同國藉才能申請加入. 試著加入其它的軍團吧.');
		if (document.location.toString().indexOf("/group-list/")!==-1) {
			//group-list
			$('#members_holder > h3:first').text('軍團成員');
		};
	};
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 國家 www.erepublik.com/en/main/country/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if ((document.location.toString().indexOf("/country")!==-1) || (document.location.toString().indexOf("/law/")!==-1)) {
	$('#filters > a.btn-filters-select.goleft').text('選擇');
	$('#profileholder > p > a.vroundbtnh25-start:eq(0) > span.vroundbtnh25-end > span.vroundbtnh25-core_large').text('捐贈國庫');
	$('#profileholder > p > a.vroundbtnh25-start:eq(1) > span.vroundbtnh25-end > span.vroundbtnh25-core_large').text('查看地圖');
	$(".extended-menus > .core > .bordersep > h2.goleft.big:contains('Country')").text('請選擇一個國家');
	$('ul.ftabs > li:eq(0) > a > span').text('國家目標');
	$('ul.ftabs > li:eq(1) > a > span').text('社會地理');
	$('ul.ftabs > li:eq(2) > a > span').text('經濟統計');
	$('ul.ftabs > li:eq(3) > a > span').text('政治選舉');
	$('ul.ftabs > li:eq(4) > a > span').text('軍事資訊');
	$('ul.ftabs > li:eq(5) > a > span').text('管理中心');
	
	$("h2:exact('Current national goals')").text("當前的國家目標");
	$("a:exact('check current status')").text("檢查目前進度");
	$("p.general-text:contains('The elected president has not set any national goals for this month.')").text("總統並未設置本月的國家目標。");
	$("h2:exact('Monuments achieved')").text("紀念碑");
	
	//社會地理
	if (document.location.toString().indexOf("/country/society/")!==-1) {
		$("h2:exact('Citizens')").text("人口");
		$("span.fakeheight:eq(0)").text("活躍人口");
		$("span.fakeheight:eq(1)").text("本日新出生公民");
		$("span.fakeheight:eq(2)").text("國籍申請");
		$("span.fakeheight:eq(3)").text("公民平均等級");
		$("span.fakeheight:eq(4)").text("正在線上的公民");
		$("span.fakeheight:eq(5)").text("新生公民福利金");
		$("a.blue_arrow_small > span ").text("查看申請狀態");
		$("a.details-small").text("詳情");
	}

	//經濟統計
	if (document.location.toString().indexOf("/country/economy/")!==-1) {
		
		$("h2:exact('Country resources')").text("資源列表");
		$("h2:exact('Treasury')").text("國庫");
		$("h2:exact('Country trading embargoes')").text("國家貿易禁運資訊");
		$("td:contains('This country can trade with any other country in eRepublik.')").text("該國可以與任何國家進行貿易。");
		$("h2:exact('Taxes')").text("稅收");
		$(".resource_list > thead > tr > th:eq(0)").text("資源");
		$(".resource_list > thead > tr > th:eq(1)").text("產地");
		$("td > small:exact('Not available')").text("無");
		$("ul.profilemenu > li > a").text("國家銀行");		
	
		$(".resource_list > tbody > tr > td > span:exact('Fish')").text("魚");
		$(".resource_list > tbody > tr > td > span:exact('Grain')").text("穀物");
		$(".resource_list > tbody > tr > td > span:exact('Fruits')").text("水果");
		$(".resource_list > tbody > tr > td > span:exact('Cattle')").text("牛");
		$(".resource_list > tbody > tr > td > span:exact('Deer')").text("鹿");
		$(".resource_list > tbody > tr > td > span:exact('Iron')").text("鋼鐵");
		$(".resource_list > tbody > tr > td > span:exact('Saltpeter')").text("硝");
		$(".resource_list > tbody > tr > td > span:exact('Aluminum')").text("鋁");
		$(".resource_list > tbody > tr > td > span:exact('Oil')").text("油");
		$(".resource_list > tbody > tr > td > span:exact('Rubber')").text("橡膠");
		
		$("th:exact('Income Tax')").text("所得稅");
		$("th:exact('Import Tax')").text("進口稅");
		$("th:exact('VAT')").text("增值稅");
		$("span.fakeheight:eq(0)").text("食物");
		$("span.fakeheight:eq(1)").text("武器");
		$("span.fakeheight:eq(2)").text("房屋");
		$("span.fakeheight:eq(3)").text("機票");
		$("span.fakeheight:eq(4)").text("食物原料");
		$("span.fakeheight:eq(5)").text("武器原料");
		$("span.fakeheight:eq(6)").text("醫院");
		$("span.fakeheight:eq(7)").text("防禦設施");
		$("h2:exact('Salary')").text("工資");
		$("span.fakeheight:exact('Minimum')").text("最低薪資");
		$("span.fakeheight:exact('Average')").text("平均薪資");
		$("h2:exact('Info')").text("統計資訊");
		$("h2:exact('Revenues')").text("稅收資訊");
	}
	//政治選舉
	if (document.location.toString().indexOf("/country/politics/")!==-1) {
		$("h2:exact('President')").text("總統");
		$("h2:exact('Congress')").text("議員");
		$("span.vroundbtnh25-core:contains('Election results')").text("選舉結果");
		$("span.vroundbtnh25-core:contains('Next elections')").text("下次選舉");
	}
	
	//軍事資訊
	if (document.location.toString().indexOf("/country/military/")!==-1) {
		$("table.info_message > tbody > tr > td").text("在對抗世仇國家時，戰場上所有的國民將有 10% 的戰場影響力加成。");
		$(".nameholder:contains('No current Natural Enemy')").text("現在沒有設定世仇國家")
		$("td:contains('There are no resistance wars in this country.')").text("現在境內沒有任何起義戰爭")
		var Our = $("div#profileholder > h1").text();
		$("h2.section:eq(0)").text("世仇國家");
		$("h2.section:eq(1)").html(Our+' 正在參與的戰爭');
		$("h2.section:eq(2)").html(Our+' 正在參與的起義戰爭');
		$("h2.section:eq(3)").text("同盟國家");
		
		$("a.vroundbtnh25-core:contains('details')").text("詳情");
		$("a.vroundbtnh25-core:contains('All wars')").text("所有戰爭");
		$("a.vroundbtnh25-core:contains('All resistance wars')").text("所有起義戰爭");
		$("a.vroundbtnh25-core:contains('All Alliances')").text("各國同盟情形");
	}
	//管理中心
	if (document.location.toString().indexOf("/country-administration/")!==-1) {
		$("span:exact('You are not a president or a congress member in this country.')").text('你現在不是這個國家的總統或議員');
		$(".adminaction > .goleft > span.goleft:contains('Hello, Congress Member')").text('你好, 國會議員閣下');
		$(".adminaction > .goleft > span.vround-redbtn-h20-start > span.vround-redbtn-h20-end > form > .vround-redbtn-h20-core:contains('Resign')").text('辭職');
		$(".adminaction > .goright:contains('Your proposals')").replaceText('Your proposals','你的提案');
		$(".adminaction > table > tbody > tr > td > span.vround-btn-start-xlarge > span.vround-btn-end-xlarge > input#expandLaw,input#colapseLaw").attr('value','提出法律提案');
		$(".holder > h2.section:contains('Law proposals')").text('法律提案');
		//congressman
		$("a:exact('New Citizen Fee')").text('新生公民補助款');
		$("a:exact('Donate')").text('捐贈');
		$("a:exact('Issue Money')").text('發行貨幣');
		$("a:exact('Taxes')").text('調整稅率');
		$("a:exact('Minimum Wage')").text('最低工資');
		$("a:exact('President Impeachment')").text('總統彈劾提案');
		$("a:exact('Provide citizenship')").text('國藉審核');
		$("a:exact('Natural Enemy')").text('世仇');
		//president
		$("a:exact('Alliance')").text('同盟');
		$("a:exact('Peace Proposal')").text('和平提案');
		$("a:exact('Trading Embargo')").text('貿易禁運');
		$("a:exact('Buy Constructions')").text('國家建設');
		$("a:exact('New Citizen Message')").text('新生公民訊息');
		//others
		$("a:contains('Tax change')").replaceText('Tax change:','調整稅率: ');
		$("table.laws.largepadded > tbody > tr > td > span.vroundbtnh25-start > span.vroundbtnh25-end > a.vroundbtnh25-core:contains('details')").text('詳情');
		$("table.laws.largepadded > tbody > tr > td:exact('Pending')").replaceText('Pending','表決中');
		$("table.laws.largepadded > tbody > tr > td:exact('Accepted')").replaceText('Accepted','通過');
		$("table.laws.largepadded > tbody > tr > td:exact('Rejected')").replaceText('Rejected','否決');
	} else if (document.location.toString().indexOf("/law/")!==-1) {
		$('h2').css('font-family','微軟正黑體,微软雅黑');
		$('.holder > .indent > .bordersep.special').css('font-family','微軟正黑體,微软雅黑');
		// law proposals
		$(".holder > .indent > .bordersep.special:contains('Law proposals')").text('法律提案');
		// donate
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Donate')").text('捐贈');
		$('.holder:eq(1) > .indent > .goleft > p.largepadded').replaceText('Proposed by','提案人:').replaceText(',',', 提案時間:');
		$(".holder:eq(1) > .indent > p.largepadded:contains('Do you agree to transfer')").replaceText('Do you agree to transfer','請問你是否同意從國庫中捐贈').replaceText('from the country accounts to','到');
	};
};

//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 檢舉 www.erepublik.com/en/tickets/report/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/tickets/report/")!==-1) {
	$('h3').css('font-family','微軟正黑體,微软雅黑');
	$('div').css('font-family','微軟正黑體,微软雅黑');
	// report ticket
	$('body.reportAbuseBody > a.btn-arrow-left-small').text('取消');
	$('body.reportAbuseBody > h3').replaceText('Report ','檢舉').replaceText('a newspaper','本報').replaceText('an article','本文').replaceText('a comment','留言').replaceText('a wall post','塗鴉牆留言').replaceText('a wall comment','塗鴉牆回應').replaceText('a party','政黨');
	$('form.reportAbuse > div:first').html('依照 <a target="_blank" href="/en/laws">遊戲規則</a> 及 <a target="_blank" href="/en/terms-and-conditions">服務條款</a> 的規範，</br>你可以回報這些不適當的內容，所有的檢舉回報都受到嚴格保密.')
	$("form.reportAbuse > .reportLabel:contains('Reason for the report')").text('檢舉的理由:');
	$("form.reportAbuse > select#report_reason > option[value='6']").text('低俗內容');
	$("form.reportAbuse > select#report_reason > option[value='7']").text('公然侮辱');
	$("form.reportAbuse > select#report_reason > option[value='8']").text('種族歧視');
	$("form.reportAbuse > select#report_reason > option[value='9']").text('色情描寫');
	$("form.reportAbuse > select#report_reason > option[value='10']").text('垃圾訊息');
	$("form.reportAbuse > select#report_reason > option[value='11']").text('外部廣告');
	$("form.reportAbuse > select#report_reason > option[value='16']").text('失控狀況');
	$("form.reportAbuse > .reportMessage:contains('By submitting this report')").html('當送出這份檢舉的同時，表示你同意：</br> 如果被發現故意重覆送出無效的檢舉時，帳號願接受適當的處罰.')
	$("form.reportAbuse > .reportLabel:contains('Language in which the reported content is written')").text('檢舉內容的語言:');
	$("form.reportAbuse > div:last > input[value='Report']").attr('value','檢舉');
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// Easter egg Archive: please keep this part, it will be fun, you can edit it :3
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/citizen/profile/")!==-1) {
	var selfid = $('a#financier').attr('href').split('/')[4];
	if ((document.location.toString().indexOf("/citizen/profile/"+selfid)!==-1)===false) {
		var transIco = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAd1JREFUKFO1zk9Ik3Ecx/GBdMpDp7p0iE4d6tBpl67RwUy0kLJ/1CGDSBZqmShiNEKSTUfGao6F1Ar/tj3PdK7ctKflpFot2irTQS3xmZZurqSnP8/bnxpdgqBDv9OXL5/X7/sxGP7XA9Yl1bk9//R/PDlttPUO81ekf50t1LORmD4fjSwHX02o24oaXOIgO/6AYplP2gHpVtD8sNANyWpm3slsqvMQfDFR8BuJcF4gPplsCY9TYz5K9vEReH8BUhfRnxYjR+6ypbEfk8v7XdO00hVYfSuAf0olI3TllS5e27aCZASPkfHW7fg+LHLYPkBZSzc1HX4MIrfG/XKSscwygXJ3AsulEujfCL7NBB2HiIt91Z37mPvCVLT7MORyuQ2XR2KEZj7yjZ/sb1c4Vl+F5DrOgH0Xg8EmpgSy+SMUNndSft27gtY3P4gx+inDtLbIXvsQtVfNOIbusfaETCh0nrRAHSNRCkS9EkvnKrII9CyTJSEqHnAOcsrZhfv5G3aab+CRa1EFaht+Qqmots/6C1mVGPGFHGPqLAedMqabATHPU3zNR4Wrh88C1XkfcrpPoaytd/VSUzBKKKUiv01xpkfh7O0AibksJq/CbqvEF/0H9fIjzklhTjollgAlh3HhaTlI3QAAAABJRU5ErkJggg==';
		if (document.location.toString().indexOf("/citizen/profile/3076162")!==-1) {
			// Billwilson
			$('body#citizenprofile .citizen_profile_header.auth > .citizen_state').prepend(
				'<div class="is tip" original-title="the member of eRepublik Traditional Chinese Translation Project."><span><img src="'+transIco+'" alt>三萌主義の国父</span></div>');};
		if (document.location.toString().indexOf("/citizen/profile/4633793")!==-1) {
			// blackca
			$('body#citizenprofile .citizen_profile_header.auth > .citizen_state').prepend(
				'<div class="is tip" original-title="the member of eRepublik Traditional Chinese Translation Project."><span><img src="'+transIco+'" alt>Myu 教団の娘</span></div>');};
		if (document.location.toString().indexOf("/citizen/profile/3076913")!==-1) {
			// lifethinker
			$('body#citizenprofile .citizen_profile_header.auth > .citizen_state').prepend(
				'<div class="is tip" original-title="the member of eRepublik Simplified Chinese Translation Project."><span><img src="'+transIco+'" alt>夢想の実賎者</span></div>');};
	};
};