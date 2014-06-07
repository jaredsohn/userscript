// ==UserScript==
// @name           eRepublik Simplified Chinese Translation Dev.
// @namespace      Simplified Chinese Translation
// @author         BillWilson, blackca
// @co-author      lifethinker, kyuu bee
// @description    eRepublik 简体中文版
// @version        0.3.2.1103
// @match          http://*.erepublik.com/*
// @include        http://*.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=115633&days=3&uso
// ==/UserScript==

/* 本中文化插件为无偿提供，但请尊重为这个插件努力的每一位朋友。
　 
   本软件按照通用公共许可证授权 version 3（GPL version 3 of the License），
   你可以按照任何你喜欢的方式使用它。 本软件不提供任何显式声明的或隱含的担保，
   也不对使用过程中产生的任何損坏或者资料丟失承担任何責任。

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

/* [function] $.exact('string'); http://blog.darkthread.net/post-2009-01-24-jquery-custom-selector.aspx  */
	$.extend($.expr[":"], { exact: function(a, i, m) { return (a.textContent || a.innerText || jQuery(a).text() || '').toLowerCase() == m[3].toLowerCase(); } });

/* Day1422 快完成最后的責任了，加油 @blackca 
 */

//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 共用区 Common strings
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	$('strong#foodText').css('font-family','微軟正黑体,微软雅黑');
	// header
//	$("input#search_field").attr("value","搜寻某位公民");
	// common catalog
		$("#menu ul li#menu2 a").css("background-image","url(\"http://i.imgur.com/T2tbw.png\")");
	$("#menu ul li#menu3 a").css("background-image","url(\"http://i.imgur.com/T2tbw.png\")");
	$("#menu ul li#menu4 a").css("background-image","url(\"http://i.imgur.com/T2tbw.png\")");
	$("#menu ul li#menu5 a").css("background-image","url(\"http://i.imgur.com/T2tbw.png\")");
	$("#menu ul li#menu6 a").css("background-image","url(\"http://i.imgur.com/T2tbw.png\")");
	$("#menu ul li#menu4 a").css("background-image","url(\"http://i.imgur.com/T2tbw.png\")");

	$('#menu > ul > li#menu3').append('<ul>' +
		'<li><a href=\"http://www.erepublik.com/' +lang+ '/newspaper/roc-ministry-of-defense-245452/1\" target="_self">eROC 国防部军令</a></li>' +
		'<li><a href=\"http://www.erepublik.com/' +lang+ '/newspaper/ministry-of-sinodefence-196717/1\" target="_self">eChina 国防部军令</a></li></ul>');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Marketplace')").text('商品市场');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Monetary')").text('外汇市场');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Job')").text('就业市场');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Companies for sale')").text('二手公司拍卖市场');
	$("#menu > ul > li#menu5 > ul > li > a:contains('World Map')").text('世界地图');
	$("#menu > ul > li#menu5 > ul > li > a:contains('My Party')").text('我的政党');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Elections')").text('选举中心');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Military Unit')").text('军团');
//	$('#menu > ul > li#menu5 > ul > li:eq(5) > a').text('国家管理中心');
//	$('#menu > ul > li#menu5 > ul > li:eq(6) > a').text('游戏数据排行');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Invite friends')").text('邀请好友');
	$("#menu > ul > li#menu5 > ul > li > a:contains('My Organizations')").text('我的组织号');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Badges')").text('官方徽章图');
	$('#menu > ul > li#menu5 > ul').prepend('<li><a href=\"http://www.erepublik.com/en/news/latest/all/China/1\" target="_self">新闻媒体</a></li>');
	$('#menu > ul > li#menu5 > ul').append(
		'<li><a href=\"http://bbs.178.com/forum-457-1.html" target="_blank">178 の Erep论坛</a></li>'+
		'<li><a href=\"http://www.erepublik.com/en/article/erepublik-simplified-chinese-translation-dev-erepublik--1885943/1/20" target="_blank">报纸推荐</a></li>');
	// sidebar
	var Explevel = $('#experienceTooltip > strong').eq(0).text();
	var Exppoint = $('#experienceTooltip > strong').eq(1).text();
	var Nextlevel = $('#experienceTooltip > strong').eq(2).text();
	var healLimit = $('#eatFoodTooltip big.tooltip_health_limit').text();
	$('#experienceTooltip').html('<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />'+
		'经验等级: <strong>LV. '+Explevel+'</strong><br />经验值: <strong>'+Exppoint+'</strong><br />下次升级需: <strong>'+Nextlevel+'</strong><br />');
	$('#eatFoodTooltip > p:eq(0)').text('点击此按钮后，将会从仓库中食用面包，并会将体力恢复至最大值');
	$('#eatFoodTooltip > p:eq(1)').html('你目前最多可以恢复 <big>'+healLimit+'</big> 体力');
	$('#eatFoodTooltip > p:eq(1) > big').attr('class','tooltip_health_limit');
	$('#eatFoodTooltip > small').replaceText('100 more recoverable Health in','下一个100点体力值恢复')
	$('#sidebar_missions > .content > b:first').text('任务');
	$('strong#foodText').text('按此吃食物');
	// others
	$('a.logout').text('退出');
	$('a.prev').text('上一页');
	$('a.next').text('下一页');
	// footer
	$('#footer > p > a:eq(0)').text('游戏论坛');
	$('#footer > p > a:eq(1)').text('游戏百科');
	$('#footer > p > a:eq(2)').text('官方博客');
	$('#footer > p > a:eq(3)').text('新闻发布');
	$('#footer > p > a:eq(4)').text('联系管理员');
	$('#footer > p > a:eq(5)').text('工作机会');
	$('#footer > p > a:eq(6)').text('服务条款');
	$('#footer > p > a:eq(7)').text('隐私权政策');
	$('#footer > p > a:eq(8)').text('合作伙伴');
	$('#footer > p > a:eq(9)').text('游戏规则');
	// remove kosovo ad
	$('#large_sidebar > .banner_place').remove();
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
// www.erepublik.com
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (host==='www') {
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
	// 首页 www.erepublik.com/en
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if ((document.location.toString()=="http://www.erepublik.com/"+lang) || (document.location.toString().indexOf("?viewPost=")!==-1)) {
		$('h1').css('font-family','微軟正黑体,微软雅黑');
		$('#daily_pop > h2').css('font-family','微軟正黑体,微软雅黑');
		$('#daily_pop > h3').css('font-family','微軟正黑体,微软雅黑');
		// daily order
		$('#orderContainer > h1').text('军团任务');
		$('#orderContainer > div > strong').text($('#orderContainer > div > strong').text().replace('Defeat enemies from','击倒')+' 战场上的敌人');
		$('#orderContainer > div > a.blue_beauty').text('前往战场');
		$('#orderContainer > div > a.green_beauty').text('领取奖励');
		// daily task
		$('.column > .boxes.daily_tasks > h1').text('每日任务');
		$('.column > .boxes.daily_tasks > div > strong').text('每日的工作与训练');
		$('.column > .boxes.daily_tasks > div > a.blue_beauty').text('我的领地');
		//我的领地
		$('.column > .boxes.daily_tasks > div > a.green_beauty').text('领取奖励');
		// daily task pop-box
		$('#daily_pop > h3').text('每日任务');
		$('#daily_pop > h2').text('任务完成!');
		$('#daily_pop small:eq(0)').text('力量');
		$('#daily_pop small:eq(1)').text('经验值');
		$('#daily_pop > a').text('确定');
		// battle list
		$('#homepage_feed .column:eq(0) > h1.noborder').text('战役列表');
		$("#battle_listing > h4:exact('Campaign of the day')").text('本日战役');
		$("#battle_listing > h4:contains('Allies')").text('目前 同盟国 的战役');
		$("#battle_listing > h4:contains('Campaigns')").text('目前 '+$("#battle_listing > h4:contains('Campaigns')").replaceText('Campaigns','的战役').text());
		$("#battle_listing span:exact('Fight')").text('战斗');
		$('#battle_listing .rest > a:eq(0)').text('更多战役');
		$('#battle_listing .rest > a:eq(1)').text('最新事件');
		$('#battle_listing > ul.resistance_war').find('a#fundRW_btn > span').text('资助');
		$('#battle_listing > ul.resistance_war').find('.info > small').text('组织起义战争在');
		// citizen feed
		$('#homepage_feed .column:eq(1) > h1:first').text('公民微博');
		$('#citizen_feed form#wall_post > textarea#shout').text('和朋友们说些有趣的东西吧');
		$('#citizen_feed a.report').text('举报');
		$('#citizen_feed a.post_button > b').text('分享');
		$('#citizen_feed a.previous_comments').text('看更多');
		$("#citizen_feed a[trigger='reply']").text('留言');
		$("#citizen_feed a[trigger='post_like']").text('支持');
		$("#citizen_feed a[trigger='post_unlike']").text('取消 支持');
//		$("#citizen_feed a[trigger='comment_like']").text('支持');
//		$("#citizen_feed a[trigger='comment_unlike']").text('取消 支持');
		$("#citizen_feed span[trigger='add_comment']").text('留言');
		$('#citizen_feed textarea.comment_reply_post').text('留言吧');
		$('#citizen_feed div.fake_input').text('留言吧');
		$('#citizen_feed').find("div.vote_bar em:contains('voted this.')").each( function() {
			$(this).find('b.personal').text('你, ');
			$(this).replaceText('and','和').replaceText('voted this.','表示支持');});
		$('#citizen_feed > .previous_posts > a > span').text('看更多');
		// news list
		$('#news.box > .title > h1:first').text('新闻分类');
		$('#articles > div > a.mbutton:eq(0) > span').text('新人指导及教育');
		$('#articles > div > a.mbutton:eq(1) > span').text('军事命令以及信息');
		$('#articles > div > a.mbutton:eq(2) > span').text('战略分析');
		$('#articles > div > a.mbutton:eq(3) > span').text('政治论坛及分析');
		$('#articles > div > a.mbutton:eq(4) > span').text('经济焦点');
		$('#articles > div > a.mbutton:eq(5) > span').text('社交娱乐');
		$('#articles > div > a.mbutton:eq(6) > span').text('阅读已订阅报纸及管理');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 个人 www.erepublik.com/en/main/citizen
	//          www.erepublik.com/en/economy/donate-items/
	//          www.erepublik.com/en/economy/donate-money/
	//   - 现金 www.erepublik.com/en/economy/citizen-accounts/
	//   - 朋友 www.erepublik.com/en/main/citizen-friends/
	//   - 移动 www.erepublik.com/en/citizen/change-residence
	//   - 密码 www.erepublik.com/en/citizen/change-password
	//   - 编辑 www.erepublik.com/en/citizen/edit/profile
	// 国籍 www.erepublik.com/en/citizenship
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if ((document.location.toString().indexOf("/citizen")!==-1) || (document.location.toString().indexOf("/economy/donate-")!==-1)) {
		$('h3').css('font-family','微軟正黑体,微软雅黑');
		// layout menu
		$('.citizen_profile_header.auth > .citizen_edit > a > span').html('<img src="http://www.erepublik.com/images/modules/citizenprofile/edit.png">编辑资料');
		$('.citizen_profile_header.auth > .citizen_menu > li:eq(0) > a').text('总览');
		$('.citizen_profile_header.auth > .citizen_menu > li:eq(1) > a').text('现金账户');
		$('.citizen_profile_header.auth > .citizen_menu > li:eq(2) > a').text('仓库');
		$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Dead citizen')").replaceText('Dead citizen','死亡');
		$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Temporary banned')").replaceText('Temporary banned','临时封号');
		$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Permanent banned')").replaceText('Permanent banned','永久封号');
		$('.citizen_profile_header.auth > .citizen_actions > a.action_friend.tip').attr('title','加为好友');
		$('.citizen_profile_header.auth > .citizen_actions > a.action_friend_remove.tip').attr('title','移除好友');
		$('.citizen_profile_header.auth > .citizen_actions > a.action_message.tip').attr('title','发送信息');
		$('.citizen_profile_header.auth > .citizen_actions > a.action_donate.tip').attr('title','捐赠');
		$('.citizen_profile_header.auth > .citizen_status > div > small').text('经验值点数');
		// profile sidebar
		$('.citizen_sidebar > div > small:eq(0)').html('目前所在地 <a href="http://www.erepublik.com/en/citizen/change-residence" title="">(移动)</a>');
		$('.citizen_sidebar > div > small:eq(1)').html('公民国籍 <a href="http://www.erepublik.com/en/citizenship" title="">(更改)</a>');
		$('.citizen_sidebar > div > .citizen_second > small:eq(0)').text('eRepublik 生日');
		$('.citizen_sidebar > div > .citizen_second > small:eq(1) > a').replaceText('National rank','国内等级排名');
		$('.citizen_sidebar > .citizen_activity > div.place:eq(0) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_political_activity.png">没有加入政党');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Party Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_member.png">政党成员');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Party President')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_president.png">党主席');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Congress Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/congress_member.png">国会议员');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Country President')").html('<img src="http://www.erepublik.com/images/modules/_icons/country_president.png">国家总统');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Far-left Wing')").text('极左翼政党');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center-left Wing')").text('中间偏左翼政党');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center Wing')").text('中间政党');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center-right Wing')").text('中间偏右翼政党');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Far-right Wing')").text('极右翼政党');
		$('.citizen_sidebar > .citizen_activity > div.place:eq(1) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_mu.png">没有加入军团');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Recruit')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">军团菜鸟');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">军团成员');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Captain')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">军团小队长');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('2nd Commander')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">军团副指挥官');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Regiment Captain')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">军团上尉');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Commander')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">军团指挥官');
	
		
		if ($('.citizen_sidebar > .citizen_activity > div.place:eq(2) > h3.noactivity > a').length==1) {
			$('.citizen_sidebar > .citizen_activity > div.place:eq(2) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_media_activity.png"><a href="http://www.erepublik.com/en/create-newspaper">创立报纸</a>');
		} else {
			$('.citizen_sidebar > .citizen_activity > div.place:eq(2) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_media_activity.png">没有创立报纸');};
		$(".citizen_sidebar > .citizen_activity > div.place:eq(2) > h3:contains('Press director')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png">报社社长');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(2) > h3:contains('Create newspaper')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png"><a href="/en/create-newspaper">建立报纸</a>');
		$('.citizen_sidebar > .citizen_activity > h4.friends_title').replaceText('Friends','朋友 ');
		$('.citizen_sidebar > .citizen_activity > a.view_friends').text('查看全部');
		// profile content
		var cizName = $(".citizen_profile_header > h2").text();
		$('.citizen_content > .my_land_profile > p > strong').text(cizName+' 的产业:');
		$('.citizen_content > .my_land_profile > p').replaceText('buildings','栋建筑物');
		$('.citizen_content > .my_land_profile > a > span').text("前往");
		$('.citizen_content > h3.mbot2:eq(0)').html('<br><br><br><br><br>关于我');
		$('.citizen_content > h3.mbot2:eq(1)').html('<br><br><br><br><br>成就奖章');
		// achievment
		$("ul#achievment > li:eq(0) > .hinter > span > p:eq(0) > strong").text("模范员工");
		$("ul#achievment > li:eq(0) > .hinter > span > p:eq(1)").text("连续工作30天");
		$("ul#achievment > li:eq(1) > .hinter > span > p:eq(0) > strong").text("国会议员");
		$("ul#achievment > li:eq(1) > .hinter > span > p:eq(1)").text("赢得国会大选");
		$("ul#achievment > li:eq(2) > .hinter > span > p:eq(0) > strong").text("国家元首");
		$("ul#achievment > li:eq(2) > .hinter > span > p:eq(1)").text("赢得总统大选");
		$("ul#achievment > li:eq(3) > .hinter > span > p:eq(0) > strong").text("媒体大亨");
		$("ul#achievment > li:eq(3) > .hinter > span > p:eq(1)").text("订阅你报纸的读者达到 1000 人");
		$("ul#achievment > li:eq(4) > .hinter > span > p:eq(0) > strong").text("战斗英雄");
		$("ul#achievment > li:eq(4) > .hinter > span > p:eq(1)").text("在一场战斗中达到最高的战争影响力");
		$("ul#achievment > li:eq(5) > .hinter > span > p:eq(0) > strong").text("战役英雄");
		$("ul#achievment > li:eq(5) > .hinter > span > p:eq(1)").text("在一场战役中达到最高的战争影响");
		$("ul#achievment > li:eq(6) > .hinter > span > p:eq(0) > strong").text("起义英雄");
		$("ul#achievment > li:eq(6) > .hinter > span > p:eq(1)").text("发动一场起义战争并成功解放该地区");
		$("ul#achievment > li:eq(7) > .hinter > span > p:eq(0) > strong").text("超级大兵");
		$("ul#achievment > li:eq(7) > .hinter > span > p:eq(1)").text("累计达到250点力量点数");
		$("ul#achievment > li:eq(8) > .hinter > span > p:eq(0) > strong").text("社交达人");
		$("ul#achievment > li:eq(8) > .hinter > span > p:eq(1)").text("邀请 10 人加入 eRepublik 并且帮助他们达到 Lv10");
		$("ul#achievment > li:eq(9) > .hinter > span > p:eq(0) > strong").text("佣兵战神奖章");
		$("ul#achievment > li:eq(9) > .hinter > span > p:eq(1)").text("帮助50个国家除掉25个敌人");
		// military skill
		$(".citizen_content > h3:contains('Military Skills')").html('<br><br><br><br><br>军事技能');
		$('.citizen_content > .citizen_military:eq(0) > strong:first').text('力量');
		$('.citizen_content > .citizen_military:eq(0) > div > small:first').replaceText('Super soldier:','超级大兵:');
		$('.citizen_content > .citizen_military:eq(1) > strong:first').text('军衔');
		$('.citizen_content > .citizen_military:eq(1) > div > small:first').text('军衔点数:');
		if (document.location.toString().indexOf("/economy/")!==-1) {
			if (document.location.toString().indexOf("/donate-")!==-1) {
				// donate tab
				$('.citizen_content > div > h2.special.padded').replaceText('Donate','捐赠');
				$('.citizen_content > div > h2.special.padded > img#donate_tip').attr('title','只有 食物, 武器 和 机票 能被捐赠.');
				$('.citizen_content > div > ul.tabs > li#topratedtab > a > span').text('物资');
				$('.citizen_content > div > ul.tabs > li#latesttab > a > span').text('金钱');
				$(".citizen_content > div > .donate_form > table > tbody > tr > th:contains('Your storage')").text('你的个人仓库');
				$(".citizen_content > div > table > tbody > tr > th:contains('Your account')").text('你的现金账户');
				$(".citizen_content input[value='Donate']").attr('value','捐赠');
//			} else if (document.location.toString().indexOf("/citizen-accounts/")!==-1) {
			} else {
				// account money tab
				$(".citizen_content > a.fluid_blue_light_small > span:contains('Exchange currencies')").text('兑换货币');
				$("table.info_message > tbody > tr > td:exact('Local currency accounts with a value less than 1 are not displayed.')").text('少于 1 块钱的货币不会被显示出来.');
				$('div#allaccounts > div:first > a.f_light_blue_small > span').text('购买黃金');
			};
		} else if (document.location.toString().indexOf("/citizen-friends/")!==-1) {
			// friend tab
			$("table.warning_message > tbody > tr > td:contains('Only your first 2000 friends will see your wall posts.')").text('只有前 2000 位好友能看到你发布在公民微博上的信息.');
			$("table.success_message > tbody > tr > td:contains('Your friendship request has been sent.')").text('你的好友邀请已经送出.');
			$('div#friends_tab_content div.dead').text('死亡');
		} else if (document.location.toString().indexOf("/change-residence")!==-1) {
			// change-residence tab
			$("table.warning_message > tbody > tr > td:exact('You can now change location without using a moving ticket.')").text('现在不需使用任何机票, 就可以任意移动你的所在地.');
			$('.citizen_sidebar > div > .citizen_second > small:eq(2)').replaceText('Forfeit points','违规点数');
			$('.citizen_content > h2.special').text('移动目前所在地');
			$('.citizen_content > .current_location > h4').text('目前位置');
			$('.citizen_content > form > .new_location > h4').text('新的位置');
			$('.citizen_content > form > .new_location > #selects > small:eq(0)').replaceText('Moving distance:','　移动距离:　');
			$('.citizen_content > form > .new_location > #selects > small:eq(1)').replaceText('Travelling cost:','　旅行花费:　');
			$('.citizen_content > form > a#move > span').text('移动');
		} else if (document.location.toString().indexOf("/change-password")!==-1) {
			// change password tab
			$('.citizen_sidebar > div > .citizen_second > small:eq(2)').replaceText('Forfeit points','违规点数');
			$('.citizen_content > .holder > h2.special.borderedsep').text('更改密码');
			$("form.changepassword span.fieldname.goleft:contains('Current password')").text('目前密码');
			$('form.changepassword span#error_for_citizen_password_twin.twin-small').text('请输入你旧的密码.')
			$("form.changepassword span.fieldname.goleft:exact('New password')").text('新密码');
			$("form.changepassword span.fieldname.goleft:exact('New password again')").text('确认新密码');
			$('form.changepassword > div > input.arrowbutton').attr('value','确定更改');
		} else if (document.location.toString().indexOf("/edit/profile")!==-1) {
			// editor tab
			$('.citizen_content > .holder > h2.special.borderedsep').text('编辑个人资料');
			$("form.editprofile span.fieldname.goleft:contains('Your description')").text('关于你');
			$("form.editprofile span.fieldname.goleft:contains('Citizen Avatar')").text('个人头像');
			$('form.editprofile span#error_for_citizen_file_twin.twin-small').html('仅允许后缀名为 <strong>.jpeg</strong> 的图像上传.');
			$("form.editprofile span.fieldname.goleft:contains('Your birthday')").text('你的生日');
			$("form.editprofile span.fieldname.goleft:contains('Your email here')").text('你的电子邮件信箱');
			$('form.editprofile span#error_for_citizen_email_twin.twin-small').text('认证需要使用你的电子邮件信箱, 所以请勿随意乱填.');
			$("form.editprofile span.fieldname.goleft:contains('Your password')").text('你的密码');
			$('form.editprofile span#error_for_password_twin.twin-small').text('如果确定更改个人资料, 请输入你目前的密码.');
			$('form.editprofile > .largepadded > input.arrowbutton').attr('value','确定更改');
			$('.citizen_content > div > a.dotted.change_password').text('更改密码');
		};
	};
	if (document.location.toString().indexOf("/citizenship")!==-1) {
		$('h1').css('font-family','微軟正黑体,微软雅黑');
		// citizenship request
		$('h1:first').text('国籍申请');
		$("table.info_message > tbody > tr > td:contains('You are not be able to request a new citizenship while being a congress member')").text('由于你目前是国会议员, 所以不能提出国籍申请.');
		$("table.info_message > tbody > tr > td:contains('You are not be able to request a new citizenship while being a party member')").text('由于你目前是政党成员, 所以不能提出国籍申请.');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 外汇 www.erepublik.com/en/exchange
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/exchange")!==-1) {
		$('h1').css('font-family','微軟正黑体,微软雅黑');
		$("h1:contains('Monetary Market')").text('外汇市场');
	//	$("a#buy_selector > span.selecttags").text('买');
	//	$("a#sell_selector > span.selecttags").text('卖');
	//	$('table#table_list_offers > tbody > tr:first > th:eq(0)').text('供应商');
	//	$('table#table_list_offers > tbody > tr:first > th:eq(1)').text('总量');
	//	$('table#table_list_offers > tbody > tr:first > th:eq(2)').text('交换比例');
	//	$('table#table_list_offers > tbody > tr:first > th:eq(3)').text('购买数量');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 仓库 www.erepublik.com/en/economy/inventory
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/economy/inventory")!==-1) {
		$('#inventory_overview span').css('font-family','微軟正黑体,微软雅黑');
		$('#inventory_overview > a > strong').css('font-family','微軟正黑体,微软雅黑');
		// storage
		$('#inventory_overview > h2:first > span').text('个人仓库');
		$('#inventory_overview > h2:first > img.storage_tooltip').attr('title','如果想增加你的个人仓库容量，请扩建土地，并建造额外的仓库建筑。');
		$('#inventory_overview > .items_holder > h4:eq(0)').text('产品');
		$('#inventory_overview > .items_holder > h4:eq(1)').text('资源');
		$('#inventory_overview > .items_holder > h4:eq(2)').text('收集品');
		$(".collection_list > ul > li:[title='Barrel']").attr('title','枪管');
		$(".collection_list > ul > li:[title='Scope']").attr('title','瞄准器');
		$(".collection_list > ul > li:[title='M6A3 Rocket']").attr('title','M6A3 火箭');
		$(".collection_list > ul > li:[title='Trigger Kit']").attr('title','击发装置');
		$(".collection_list > ul > li:[title='Stock']").attr('title','枪托');
		$(".collection_list > ul > li:[title='Hammer']").attr('title','铁锤');
		$(".collection_list > ul > li:[title='Pliers']").attr('title','钳子');
		$(".collection_list > ul > li:[title='Saw']").attr('title','电锯');
		$(".collection_list > ul > li:[title='Shovel']").attr('title','产子');
		$(".collection_list > ul > li:[title='Tape Measure']").attr('title','卷尺');
		$('.collection_list > a.assemble').text('组合');
		$('.collection_list > a.assemble').attr('title','组合');
		$('.collection_list > .bazooka > .details > strong').html('Bazoka 火箭筒'+
			'<img src="http://www.erepublik.com/images/modules/storage/info.png" alt="" class="storage_tooltip" original-title="你可以在战场上发现这些收集品。战斗会随机拿到其中的组件，你可以收集并组装它。">');
		$('.collection_list > .bazooka > .details > small').text('只需一发即可击杀对面敌人');
		$('.collection_list > .bazooka > .details > p:eq(0)').attr('title','耐久度');
		$('.collection_list > .bazooka > .details > p:eq(1)').attr('title','火力');
		$('.collection_list > .bazooka > .details > p:eq(1) > span').text('10000 / 每发');
		$('.collection_list > .toolbox > .details > strong').html('工具箱'+
			'<img src="http://www.erepublik.com/images/modules/storage/info.png" alt="" class="storage_tooltip" original-title="你可以在领地中发现这些收集品。生产原料会随机拿到其中的组件，你可以收集并组装它。">');
		$('.collection_list > .toolbox > .details > small').text('使你的原料产量加倍');
		$('.collection_list > .toolbox > .details > p:eq(0)').attr('title','耐久度');
		// control module
		$('#inventory_overview > a.inventory_sell > strong').text('出售');
		$('#inventory_overview > a.inventory_sell > small').text('将物品放到市场出售');
		$('#inventory_overview > a.inventory_buy > strong').text('购买');
		$('#inventory_overview > a.inventory_buy > small').text('从市场购买东西');
		$('#sell_offers th.offers_product > strong').text('产品');
		$('#sell_offers th.offers_quantity > strong').text('数量');
		$('#sell_offers th.offers_price > .relative > strong').text('价格 / 每个');
		$('#sell_offers th.offers_market > .relative > strong').text('市场');
		$('#sell_offers th.offers_market > .relative > small > a#buy_license').text('购买交易证');
		$('#sell_offers th.offers_action > a > span').text('确定出售');
		$('#sell_offers a.delete_offer').attr('title','取消');
		$('.buy_market_shell > a#buy_market_license > span').text('购买市场交易证');
		$('.buy_market_shell > a#select_buy_license_country > span#buy_license_country_name').text('请选择一个国家');	
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 战争 www.erepublik.com/en/wars/
	//   - 清单 www.erepublik.com/en/wars/show/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/wars/")!==-1) {
		$('h1').css('font-family','微軟正黑体,微软雅黑');
		$('h2').css('font-family','微軟正黑体,微软雅黑');
		// war
		$('h1:first').text('战争');
		$('#war_type_filter > div > .core > div > h2.goleft.big:first').text('请选择战争形式');
		$('#war_type_filter > div > .core > ul:eq(0) > li > a').html('<img src="/images/parts/icon_warlist_war.gif" class="flag" alt="">征服战争');
		$('#war_type_filter > div > .core > ul:eq(1) > li > a').html('<img src="/images/parts/icon_warlist_resistancewar.gif" class="flag" alt="">起义战争');
		$('#war_type_filter > div > .core > ul:eq(2) > li > a').html('<img src="/images/parts/icon_warlist_allwars.gif" class="flag" alt="">所有战争');
		$('#war_status_filter > div > .core > div > h2.goleft.big:first').text('请选择战争状态');
		$('#war_status_filter > div > .core > ul:eq(0) > li > a').html('<img src="/images/parts/icon_warlist_active.gif" class="flag" alt="">进行中');
		$('#war_status_filter > div > .core > ul:eq(1) > li > a').html('<img src="/images/parts/icon_warlist_inactive.gif" class="flag" alt="">已结束');
		$('#war_status_filter > div > .core > ul:eq(2) > li > a').html('<img src="/images/parts/icon_warlist_allstates.gif" class="flag" alt="">所有战争');
		$('#war_country_filter > div > .core > div > h2.goleft.big:first').text('请选择参战国家');
		$.each( $(".warholder > .attacker > .nameholder:contains('Resistance Force')"), function() {
			$(this).html($(this).replaceText('Resistance Force of ','').text()+'<span id="CHT">反抗军</span>');});
		$('.nameholder > #CHT').css('font-family','微軟正黑体,微软雅黑');
		$('.warholder > .attacker > a').replaceText('allies','盟国').replaceText('no ','没有');;
		$('.warholder > .defender > a').replaceText('allies','盟国').replaceText('no ','没有');;
		$('.warholder > .middle > a.details').text('详情');
		if (document.location.toString().indexOf("/wars/show/")!==-1) {
			// choose war and battlefiled
			var rCoun = document.title.toString().split("|")[1].split(" vs ")[0];
			$('.war_list_header > .country.left_side > div > h3.resistance').css('width','160px');
			$(".war_list_header > .country.left_side > div > h3:contains('Resistance Force')").html(rCoun+' <span id="CHT">反抗军</span>');
			$('.war_list_header > .country.left_side > div > h3 > #CHT').css('font-family','微軟正黑体,微软雅黑');
			$('.war_list_header > .country > div > a').replaceText('allies','盟国').replaceText('no ','没有');
			$('.war_list_header > .vs > small').replaceText('Still active','战争持续中');
			$('.listing > a.reversed > span').replaceText('Join','加入');
			$(".listing > a.join[title='Join Resistance'] > span").text('加入起义势力');
			$(".listing > a.join[title='Join'] > span").text('加入');
			$('.listing > small').replaceText('started on','目前战场开启自: ');
			$(".listing.done > small:contains('Conquered by')").replaceText('Conquered by','占领成功:');
			$(".listing.done > small:contains('Secured by')").replaceText('Secured by','防守成功:');
			$("table.info_message > tbody > tr > td:contains('This war is no longer active.')").text('这场战争已经结束.');
			$("table.warning_message > tbody > tr > td:contains('is about to attack.')").replaceText('is about to attack.','即将发动攻击.');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 战场/战役
	//   - 战场 www.erepublik.com/en/military/battlefield/
	//   - 战役 www.erepublik.com/en/military/campaigns
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/military/")!==-1) {
		if (document.location.toString().indexOf("/military/battlefield/")!==-1) {
			$('#pvp_header > .battle_hero.left_side').attr('title','我们的 战斗英雄');
			$('#pvp_header > .domination > .domibar > #left_points').attr('title','国家分数');
			$('#pvp_header > .domination > .domibar > #right_points').attr('title','敌人的 国家分数');
			$('#pvp_header > .battle_hero.right_side').attr('title','敌人的 战斗英雄');
			$.each( $("#pvp_header > .country > div > h3:contains('Resistance Force')"), function() {
				$(this).html($(this).replaceText('Resistance Force Of ','').text()+' <span id="CHT">反抗军</span>');});
			$('#pvp_header > .country > div > h3 > #CHT').css('font-family','微軟正黑体,微软雅黑');
			$('#pvp_header > .country > div > a').replaceText('allies','盟国').replaceText('no ','没有');
			$('#pvp_battle_area > table.damage_aligner > tbody > tr > td > #total_damage').attr('title','我目前累计的战场影响力.');
			$('#pvp_battle_area > table.damage_aligner > tbody > tr > td > #total_damage > small').text('我的战场影响力');
			$('#pvp_battle_area > .player.left_side > a#change_weapon').attr('title','更换武器');
//			$('#pvp_actions > .action_holder > a#heal_btn').attr('title','按此吃食物');
			$('#pvp_actions > .action_holder > a#fight_btn').text('战斗');
			$('#pvp_actions > .action_holder > a#fight_btn').attr('title','战斗!');
			$('#pvp > a#go_stats.battle_stats_button').attr('title','战场统计');
			$('#pvp > a.help_button').attr('title','开启帮助窗口');
			$('.battle_stats > .top > h3:first').text('战役统计');
			$('.battle_stats > .repeat > .content > .lister > .head > .one').text('公民');
			$('.battle_stats > .repeat > .content > .lister > .head > .two').text('击倒数');
			$('.battle_stats > .repeat > .content > .lister > .head > .three').text('战场影响力');
			// defeated-pop-box
			$('#enemy_defeated > .heading > h2').text('击倒敌人');
			$('#enemy_defeated > .content > div:eq(0) > strong').text('战场影响力');
			$('#enemy_defeated > .content > div#natural_enemy_bonus > strong').text('世仇战场奖励');
			$('#enemy_defeated > .content > div:eq(2) > strong').text('军衔点数');
			$('#enemy_defeated > .content > div:eq(3) > strong').text('经验值');
			$('#enemy_defeated > a#add_damage_btn').text('增加战场影响力');
			// rank-up-pop-box
			$('#rank_up > .heading > p').text('恭喜, 你的军衔提升到');
			$('#rank_up > .content > div:eq(0) > strong').text('军衔奖励加成');
			$('#rank_up > .content > div:eq(1) > strong').text('+1 能量棒');
			$('#rank_up > a#add_rank_btn').text('领取奖励');
			// other-box
			$('#battle_loader > a.green_go').replaceText('Next battle','下场战局');
			$('#battle_end > a.green_go').text('查看其它战役');
			$('#collection_complete.bazooka_pop > strong').text('恭喜, 完成Bazooka火箭筒的收集!');
			$("#collection_complete.bazooka_pop > a[title='Build your Bazooka']").text('组合');
			$("#timer > div > strong:contains('Are you')").text('你还在吗?');
			$("#timer > div > a > span:contains('still here')").text('没错, 被你猜对了');
			// change location
			$('#options_box > p.info').text('你需要移动至其中一个国家, 才能参与这场战斗. 是否決定现在就出发呢?');
			$('#options_box > a#change_location.fluid_blue_dark > span').text('移动所在地');
			$('#options_box > a#nope.plain').text('不用了, 谢谢.');
		} else if (document.location.toString().indexOf("/military/campaigns")!==-1) {
			$('h1').css('font-family','微軟正黑体,微软雅黑');
			// Military campaigns list
			$('h1:first').text('战役列表');
			$("#battle_listing > h4:exact('Campaign of the day')").text('本日战役');
			$("#battle_listing > h4:contains('Campaigns')").text('目前 '+$("#battle_listing > h4:contains('Campaigns')").replaceText('Campaigns','的战役').text());
			$("#battle_listing > p.campaigns_header.allies.toggled:contains('Allies')").html('<span class="arrow"></span>目前 同盟国 的战役');
			$("#battle_listing > p.campaigns_header.allbattles.toggled:contains('All')").html('<span class="arrow"></span>目前 全部国家 的战役');
			$('#battle_listing a.victory_flag').text('胜利');
			$("#battle_listing span:contains('Fight')").text('战斗');
			$("#battle_listing span:contains('Victory')").text('胜利　');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 新闻 www.erepublik.com/en/news
	// 热门 www.erepublik.com/en/news/rated/all/
	// 即時 www.erepublik.com/en/news/latest/all/
	// 订阅 www.erepublik.com/en/news/subscriptions
	// 国际 www.erepublik.com/en/news/international
	// 事件 www.erepublik.com/en/news/military
	//   - 文章 www.erepublik.com/en/article/
	//   - 报纸 www.erepublik.com/en/newspaper/
	//   - 创立 www.erepublik.com/en/create-newspaper
	//   - 编辑 www.erepublik.com/en/edit-newspaper/
	//   - 修文 www.erepublik.com/en/edit-article/
	//   - 写文 www.erepublik.com/en/write-article
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/news/")!==-1) {
		$('body#media h1').css('font-family','微軟正黑体,微软雅黑');
		$('body#media h2').css('font-family','微軟正黑体,微软雅黑');
		// news area
		$("h1:first:exact(' News')").text('新闻区');
		$("h1:first:exact('First steps in eRepublik News')").text('新闻区 - 新人指导及教育');
		$("h1:first:exact('Battle orders News')").text('新闻区 - 军事命令以及信息');
		$("h1:first:exact('Warfare analysis News')").text('新闻区 - 战略分析');
		$("h1:first:exact('Political debates and analysis News')").text('新闻区 - 政治论坛及分析');
		$("h1:first:exact('Financial business News')").text('新闻区 - 经济焦点');
		$("h1:first:exact('Social interactions and entertainment News')").text('新闻区 - 社交娱乐');
		$('#filters > .rightfilters > .core > ul.news_filters > li:eq(0) > a').attr('title','新人指导及教育');
		$('#filters > .rightfilters > .core > ul.news_filters > li:eq(1) > a').attr('title','军事命令以及信息');
		$('#filters > .rightfilters > .core > ul.news_filters > li:eq(2) > a').attr('title','战略分析');
		$('#filters > .rightfilters > .core > ul.news_filters > li:eq(3) > a').attr('title','政治论坛及分析');
		$('#filters > .rightfilters > .core > ul.news_filters > li:eq(4) > a').attr('title','经济焦点');
		$('#filters > .rightfilters > .core > ul.news_filters > li:eq(5) > a').attr('title','社交娱乐');
		$('#filters > .rightfilters > .core > .your_subs').html('</br>你目前订阅<strong>'+$("#filters > .rightfilters > .core > .your_subs > strong").text()+'</strong>份报纸<a href="javascript:;" class="fluid_blue_dark" onclick="$j(\'.asubs\').toggle();" title=""><span>變更</span></a>');
		$('#filters > .rightfilters > .asubs > .acontrols > a.aselectall').text('选择全部');
		$('#filters > .rightfilters > .asubs > .acontrols > a#unsubscribeAction > span').text('取消订阅');
		$('#domain_selector_holder > div > .core > div > div > h2.goleft.big:first').text('请选择新闻类型');
		$('#domain_selector_holder > div > .core > ul > .last:eq(0)').html('<a href=\"/en/news/rated/all/Republic-of-China-Taiwan/1\"><img class="icon" src="/images/parts/icon_media_toprated.gif" alt="Icon_media_toprated"> 热门新闻</a>');
		$('#domain_selector_holder > div > .core > ul > .last:eq(1)').html('<a href=\"/en/news/latest/all/Republic-of-China-Taiwan/1\"><img class="icon" src="/images/parts/icon_media_latest.gif" alt="Icon_media_latest"> 最新报纸</a>');
		$('#domain_selector_holder > div > .core > ul > .last:eq(2)').html('<a href=\"http://www.erepublik.com/en/news/military\"><img class="icon" src="/images/parts/icon_media_military.gif" alt="Icon_media_military"> 最新事件</a>');
		$('#domain_selector_holder > div > .core > ul > .last:eq(3)').html('<a href=\"http://www.erepublik.com/en/news/international\"><img class="icon" src="/images/parts/icon_media_international.gif" alt="Icon_media_international"> 国际焦点</a>');
		$('#domain_selector_holder > div > .core > ul > .last:eq(4)').html('<a href=\"http://www.erepublik.com/en/news/subscriptions\"><img class="icon" src="/images/parts/icon_media_subscriptions.gif" alt="Icon_media_subscriptions"> 订阅的报纸</a>');
		$('#country_holder > div > .core > div > div > h2.goleft.big:first').text('请选择一个国家');
		// catalog link
		$("a:contains('First steps in eRepublik')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_1.png"> 新人指导及教育');
		$("a:contains('Battle orders')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_2.png"> 军事命令以及信息');
		$("a:contains('Warfare analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_3.png"> 战略分析');
		$("a:contains('Political debates and analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_4.png"> 政治论坛及分析');
		$("a:contains('Financial business')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 经济焦点');
		$("a:contains('Social interactions and entertainment')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 社交娱乐');
	} else if ((document.location.toString().indexOf("/article/")!==-1) || (document.location.toString().indexOf("/newspaper/")!==-1)) {
		// newspaper, article
		$('body#newspaper > #container > #content > h2.newspaper_section').text('关于本报');
		$('.profilemenu > li > a.houdini.subscribeToNewspaper').text('订阅');
		$('.profilemenu > li > a.houdini.unsubscribeFromNewspaper').text('取消订阅');
		$(".profilemenu > li > a:exact('Write article')").text('写新文章');
		$(".profilemenu > li > a:exact('Edit newspaper details')").text('编辑详情');		
		// catalog link
		$("a:contains('First steps in eRepublik')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_1.png"> 新人指导及教育');
		$("a:contains('Battle orders')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_2.png"> 军事命令以及信息');
		$("a:contains('Warfare analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_3.png"> 战略分析');
		$("a:contains('Political debates and analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_4.png"> 政治论坛及分析');
		$("a:contains('Financial business')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 经济焦点');
		$("a:contains('Social interactions and entertainment')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 社交娱乐');
		// other link
		$('a#comments_button_on > span').replaceText('Comments','留言');
		$('#subscribe_comments > form > .submitpost-start > .submitpost-core > p.padded').text('你的留言');
		$("#subscribe_comments > form > .submitpost-start > .submitpost-core > input.submit[name='commit']").attr('value','新增留言');
		$('a.report.newspaper').text('举报本报');
		$('a.report.articlereport').text('举报本文');
		$('a.shower.report.commentswitch').text('举报留言');
		$('a.report.onz.commentcontent').text('举报此留言');
		$('span.vroundbtnh25-start > span.vroundbtnh25-end > a.vroundbtnh25-core').text('编辑');
		$('span.vroundbtnh25_red-start > span.vroundbtnh25_red-end > a.vroundbtnh25_red-core').text('刪除');
	} else if (document.location.toString().indexOf("/create-newspaper")!==-1) {
		$('h1').css('font-family','微軟正黑体,微软雅黑');
		$('h2').css('font-family','微軟正黑体,微软雅黑');
		$('.fieldname').css('font-family','微軟正黑体,微软雅黑');
		// create newspaper
		$('.holder > h1:first').text('创立报纸');
		$('.holder > a.wikiicon.largepadded').text('更多说明');
		$('.accountinfo.largepadded > .accountdisplay > span.rightpadded:first').text('你的现金账户');
		$(".holder > h2:first:contains('Requirements')").text('报社需求');
		$(".holder > .smallhoderleft.goleft > p:contains('Level')").text('等级');
		$(".holder > .smallhoderleft.goleft > p:contains('Cost')").text('花费');
		$('.holder > .smallholderright.goleft > a.btnGetGold').text('购买黃金');
		$(".holder > h2.section:contains('Newspaper details')").text('报社详情');
		$('form.companydetails > p.largepadded:eq(0) > span.fieldname').text('报社名称');
		$('form.companydetails > p.largepadded:eq(0) > span#error_for_newspaper_name_twin').text('只允许6-25个字节.');
		$('form.companydetails > p.largepadded:eq(1) > span.fieldname').text('报社头像');
		$('form.companydetails > p.largepadded:eq(1) > span.goleft > span#error_for_newspaper_image_twin').text('只允许上传 JPG 图像.');
		$("form.companydetails > .buttonalign > input.arrowbutton[name='commit']").attr('value','确定创立');
	} else if (document.location.toString().indexOf("/edit-newspaper/")!==-1) {
		$('.fieldname').css('font-family','微軟正黑体,微软雅黑');
		// edit newspaper
		$(".profilemenu > li > a:exact('Write article')").text('写新文章');
		$(".profilemenu > li > a:exact('Edit newspaper details')").text('编辑详情');
		$('.accountinfo > .accountdisplay > span.rightpadded').text('你的现金账户');
		$("form.companydetails > .largepadded > .fieldname:contains('Newspaper name')").text('报纸名称');
		$('form.companydetails > .largepadded > span#error_for_newspaper_name_twin').text('只允许6-25个字节.');
		$("form.companydetails > .largepadded > .fieldname:contains('Description')").text('关于本报');
		$("form.companydetails > .largepadded > .fieldname:contains('Location')").text('地点');
		$('form.companydetails > .largepadded > span#error_for_country_list_twin').text('更改发报地点, 只能在自己的国家发行报纸.');
		$("form.companydetails > .largepadded > .fieldname:contains('Newspaper logo')").text('报纸标杂');
		$('form.companydetails > .largepadded > span.goleft > span#error_for_newspaper_image_twin').text('只允许上传 JPG 图像.');
		$("form.companydetails > .largepadded > .fieldname:contains('Cost')").text('花费');
		$('form.companydetails > .largepadded > span.accountdisplay > a.btnGetGold').text('购买黃金');
		$("form.companydetails > .buttonalign > input.arrowbutton[name='commit']").attr('value','确定更改');
	} else if ((document.location.toString().indexOf("/edit-article/")!==-1) ||(document.location.toString().indexOf("/write-article")!==-1)) {
		$('h2').css('font-family','微軟正黑体,微软雅黑');
		$('.smallpadded').css('font-family','微軟正黑体,微软雅黑');
		// edit, write article
		$(".profilemenu > li > a:exact('Write article')").text('写新文章');
		$(".profilemenu > li > a:exact('Edit newspaper details')").text('编辑详情');
		$(".holder > .bordersep > h2.goleft:contains('Edit article')").text('编辑文章');
		$(".holder > .bordersep > h2.goleft:contains('Write article')").text('写新文章');
		$(".holder > .bordersep > a.btn-arrow-left.goright:exact('Back')").text('返回');
		$("form.writearticle > .inputholder > .smallpadded:contains('Title')").text('标题');
		$('form.writearticle > .inputholder > span#error_for_article_name_twin').text('只允许1-80个字节');
		$("form.writearticle > .inputholder > .smallpadded:contains('Article')").text('文章');
		$("table.info_message > tbody > tr > td:contains('By choosing a category which')").text('为你的文章内容选择一个类別, 让你的潜在读者们更容易找到感兴趣的文章.');
		$("form.writearticle > .inputholder > div.smallpadded:contains('Category')").text('内容分类');
		$("form.writearticle > .inputholder > select#article_category > option[value='0']").text('请选择');
		$("form.writearticle > .inputholder > select#article_category > option[value='1']").text('- 新人指导及教育');
		$("form.writearticle > .inputholder > select#article_category > option[value='2']").text('- 军事命令以及信息');
		$("form.writearticle > .inputholder > select#article_category > option[value='3']").text('- 战略分析');
		$("form.writearticle > .inputholder > select#article_category > option[value='4']").text('- 政治论坛及分析');
		$("form.writearticle > .inputholder > select#article_category > option[value='5']").text('- 经济焦点');
		$("form.writearticle > .inputholder > select#article_category > option[value='6']").text('- 社交娱乐');
		$("form.writearticle > div > input.arrowbutton[value='Publish']").attr('value','发布');
		$("form.writearticle > div > input.arrowbutton[value='Edit']").attr('value','编辑');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 政党 www.erepublik.com/en/party/
	// 成员名单 www.erepublik.com/en/party-members/
	// 主席名单 www.erepublik.com/en/party-candidates/
	// 议员名单 www.erepublik.com/en/propose-congressman/
	// 总统名单 www.erepublik.com/en/presidential-candidates/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/party/")!==-1) {
		$('h2').css('font-family','微軟正黑体,微软雅黑');
		// party
		$("h2.section:contains('Info')").text('政党资讯');
		$(".infoholder > .largepadded > span.field:exact('Members')").text('成员');
		$(".infoholder > .largepadded > span.field:exact('Orientation')").text('政党倾向');
		$('.infoholder > .largepadded > span.goleft').replaceText('Center','中坚').replaceText('Libertarian','自由主义');
		$("h2.section:contains('Elections')").text('选举');
		$('.indent > .bordersep:eq(0) > h2.section').html('<img title="每个月 15 号由党员共同选出." class="icon padded tooltip" src="/images/parts/icon_position_politics_partypresident.gif" alt="Icon_position_politics_partypresident">党主席选举');
		$(".infoholder > p.smallholder:contains('Party President')").text('党主席');
		var pp_1 = $(".indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first > .special:eq(0)").text();
		var pp_2 = $(".indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first > .special:eq(1)").text();
		$('.indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first').html('下次党主席选举于 <span class="special">'+pp_1+'</span> 后，目前有<span class="special">'+pp_2+'</span>位候选人.');
		$('.indent > .bordersep:eq(1) > h2.section').html('<img title="每个月 25 号由各地公民共同选出." class="icon padded tooltip" src="/images/parts/icon_position_politics_congressman.gif" alt="Icon_position_politics_congressman">议员选举');
		var cm_1 = $('.indent > .bordersep:eq(1) > .subindent > .infoholder > .field > p > span.special:first').text();
		var cm_2 = $('.indent > .bordersep:eq(1) > .subindent > .infoholder > p > span.special:first').text();
		$('.indent > .bordersep:eq(1) > .subindent > .infoholder > .field > p:first').html('本党目前有 <span class="special">'+cm_1+'</span> 位议员，');
		$('.indent > .bordersep:eq(1) > .subindent > .infoholder > p:first').html('约占议会 <span class="special">'+cm_2+'</span> 的席次.');
		if ($('.indent > .bordersep:eq(2) > .subindent > .infoholder > p > span.special:first').length==1) {
			var cm_3 = $('.indent > .bordersep:eq(2) > .subindent > .infoholder > p > span.special:first').text();
			$('.indent > .bordersep:eq(2) > .subindent > .infoholder > p:first').html('下次议员选举于 <span class="special">'+cm_3+'</span> 后.');
		} else {
			$('.indent > .bordersep:eq(2) > .subindent > .infoholder > p:first').html('国会议员选举日.');
		};
		$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > h2:first').text('参选议员');
		$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > .holder').replaceText('Do you agree to represent your party in the congress election in','请问你是否同意, 代表你的政党参选').replaceText('?',' 区的议员?');
		$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.padded:first').text('请在下方填入你的政见链接, 来向选民们说明为何要投你一票.');
		$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.largepadded > span:last').html('可以提供 外部网页 或 <strong>私人论坛</strong> 的链接.');
		$(".indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.goright > span > span > input[value='Agree']").attr('value','同意');
		$(".indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.goright > span > span > input[value='Cancel']").attr('value','放弃');
		$('.indent > h2.section').html('<img title="每个月 5 号由全国公民共同选出." class="icon padded tooltip" src="/images/parts/icon_position_politics_president.gif" alt="Icon_position_politics_president">总统选举');
		$(".indent > .subindent:eq(0) > .bordersep > .infoholder > p.smallholder:contains('Winner')").text('总统当选人');
		var cp_1 = $('.indent > .subindent:eq(1) > .infoholder > p:first > span.special:first').text();
		$('.indent > .subindent:eq(1) > .infoholder > p:first').html('下次总统选举于 <span class="special">'+cp_1+'</span> 后.');
		$(".indent > .subindent:eq(2) > .infoholder > p.smallholder:contains('No candidate proposed')").text('尚未提名总统候选人.');
		// control buttons
		$('a.report.party').text('举报政党');
		$(".action a:exact('Show all members')").text('党员名单');
		$(".action a:exact('Show results')").text('查看选举结果');
		$(".action a:exact('Show candidate list')").text('查看候选人名单');
		$(".action a:exact('Show candidates list')").text("查看候选人名单");
		$(".action a:exact('Show proposed members of congress')").text('查看参选名单');
		$(".action a:contains('Join party')").text('加入此党');
		$(".action a:contains('Resign')").text('离开此党');
		$(".action a:exact('Run for congress')").text('参加议员选举');
		$(".action a:exact('Retire')").text('退选');
		$(".action a:exact('Candidate')").text('参选');
		$(".action a:exact('Vote')").text("投票");
	} else if ((document.location.toString().indexOf("/party-members/")!==-1) || (document.location.toString().indexOf("/party-candidates/")!==-1)) {
		$('h2').css('font-family','微軟正黑体,微软雅黑');
		$('p.smallholder').css('font-family','微軟正黑体,微软雅黑');
		// party members, candidates list
		$("h2.biggersection:contains('Party members')").text('党员名单');
		$("h2.biggersection:contains('Party candidates')").text('党主席候选人名单');
		$(".indent > .bordersep > p.smallholder:contains('Party Member')").replaceText('Party Member','政党成员');
		$(".indent > .bordersep > p.smallholder:contains('Congress Member')").replaceText('Congress Member','国会议员');
		$(".indent > .bordersep > p.smallholder:contains('Party President')").replaceText('Party President','党主席');
		$('.holder > .indent').replaceText('No candidates applied yet','目前尚未有候选人.');
		$('.holder > a.btn-arrow-left.goright').text('政党页面');
		$('a.report.party').text('举报政党');
	} else if (document.location.toString().indexOf("/propose-congressman/")!==-1) {
		$('h2').css('font-family','微軟正黑体,微软雅黑');
		// party congressman list
		$("h2.biggersection:contains('Congress member candidates')").text('国会议员参选名单');
		$('.infoalert > p:eq(0)').html('<strong>1.</strong> 政党成员每月的 16 号到 23 号间，可以报名参选国会议员.');
		$('.infoalert > p:eq(1)').html('<strong>2.</strong> 党主席可以在每月的 24 号，调整最終议员参选名单.');
		$('.infoalert > p:eq(2)').html('<strong>3.</strong> 每个政党在每个区域，最多只能提名三名国会议员参选人.');
		$("select#region_list > option[value='0']").text('请选择一个区域');
		$('.holder > .candidates > .list-title').replaceText('Official candidates','正式候选人');
		$('.holder > a.btn-arrow-left.goright').text('政党页面');
		$('a.report.party').text('举报政党');
	} else if (document.location.toString().indexOf("/presidential-candidates/")!==-1) {
		$('h1').css('font-family','微軟正黑体,微软雅黑');
		$('h2').css('font-family','微軟正黑体,微软雅黑');
		$('th').css('font-family','微軟正黑体,微软雅黑');
		// president candidates list
		$('body#elections h1:first').text('总统候选人名单');
//		$(".bordersep > h2:exact('Country')").text("请选择一个国家");
		$('table.elections > tbody > tr:first > th:eq(0)').text('候选人');
		$('table.elections > tbody > tr:first > th:eq(1)').text('支持的政党');
		$('table.elections > tbody > tr:first > th:eq(2)').text('国家目标');
		$('table.elections > tbody > tr > td.of_goals > .goal_setter > .nogoals > small').text('没有设定任何目标');
		$("table.info_message > tbody > tr > td:contains('No candidates applied yet')").text('目前尚未有总统候选人.');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	//选举中心 www.erepublik.com/en/elections/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/elections/")!==-1) {
		$('h1').css('font-family','微軟正黑体,微软雅黑');
		$('h2').css('font-family','微軟正黑体,微软雅黑');
		$('th').css('font-family','微軟正黑体,微软雅黑');
		// elections
		$('body#elections h1:first').text('选举中心');
		$("#filters > .rightfilters > .core > .info > p.smallpadded > strong:exact('Next elections')").text('下次选举');
		$("#filters > .rightfilters > .core > .info > p:last > strong:contains('Country President')").text('国家总统');
		$("#filters > .rightfilters > .core > .info > p:last > strong:contains('Party President')").text('政党主席');
		$("#filters > .rightfilters > .core > .info > p:last > strong:contains('Congress')").text('国会议员');
		$("#country_filters > .extended-menus > .core > .bordersep > h2:contains('Country')").text('请选择一个国家');
		$("#region_filters > .extended-menus > .core > .bordersep > h2:contains('Country')").text('请选择一个地区');
		$("#region_filters > .extended-menus > .core > ul:first > li:first > a[id='0__All regions']").text('所有地区');
		$("#election_filters > .extended-menus > .core > .bordersep > h2:contains('Election')").text('请选择选举类型');
		$('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#president').text('总统选举');
		$('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#congress').text('国会议员选举');
		$('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#party').text('党主席选举');
		$("#party_filters > .extended-menus > .core > .bordersep > h2:contains('Parties')").text('请选择一个政党');
		$("#dateSelect_filters > .extended-menus > .core > .bordersep > h2:contains('Month/Year')").text('月份 / 年');
		$("body#elections h2.special:contains('Official Results')").text('统计结果公告');
		// president
		$(".vote_box > .vote_box_layer > .vote_box_info > h4:contains('Goals')").text('目标');
		$('.vote_box > .vote_block > p').replaceText('votes','票');
		$(".vote_totals > p > span:contains('Total votes')").replaceText('Total votes:','总投票数：');
		if ((document.location.toString().indexOf("election-congress")!==-1) || (document.location.toString().indexOf("election-party")!==-1)){
			// congress
			$("table.electiondetails th:contains('Official candidates')").replaceText('Official candidates','正式名单');
			$("table.electiondetails th:contains('Wildcards')").replaceText('Wildcards','外卡名单');
			$("table.electiondetails th:contains('Not qualified')").replaceText('Not qualified','落选');
			$("table.electiondetails th:contains('Member of')").text('所属政党');
			$("table.electiondetails th:contains('No. of votes')").text('得票数');
			$("table.electiondetails span.smalldotted:exact('Presentation')").text('政见发表');
			$("table.electiondetails span.smalldotted:exact('No presentation')").text('没有政见发表');
			// party
			$("table.elections th:exact('No.')").text('编号');
			$("table.elections th:contains('Candidate')").text('候选人');
			$("table.elections th:contains('No. of votes')").text('得票数');
			$("table.elections th:contains('% of votes')").text('得票率');
			$("table.elections a:exact('Vote')").text('投票');
			// others
			$("#messagealert.infoicon > p:exact('No data available yet')").text("目前没有任何资料");
			var v_num = $('p.regular > span#number_of_votes').text();
			$('p.regular').html('总投票数: <span class="special rightpadded" id="number_of_votes">' +v_num+ '</span>');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 军团 www.erepublik.com/en/main/group-home/
	// 创立 www.erepublik.com/en/main/group-create/
	// 首页 www.erepublik.com/en/main/group-show/
	// 列表 www.erepublik.com/en/main/group-list/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/group-")!==-1) {
		$('h1').css('font-family','微軟正黑体,微软雅黑');
		if (document.location.toString().indexOf("/group-home/")!==-1) {
			// group-home
			$('body#military_units h1:first').text('军团');
			$("table.info_message > tbody > tr > td > strong:contains('You are not a soldier of any Military Unit')").parent().html(
				'<strong>你目前不是任何军团的成员</strong>你可以加入目前现有的军团，或是自行创立一个自己想要的军团。<br>加入军团可以使你跟随其他团员的脚步并更加团结，一同在战场上作战输出。<br><a class="wicked" href="http://wiki.erepublik.com/index.php/Military_unit" target="_blank">更多军团资讯</a>');
			$('#military_units_home > .create_military_unit > table > tbody > tr > td > a > span').text('创立军团');
			$('#military_units_home > .join_military_unit > h3:first').text('提出申请加入军团');
		} else if (document.location.toString().indexOf("/group-create/")!==-1) {
			$('body#create h1:first').text('创立军团');
			$("table.warning_message > tbody > tr > td:contains('The Military Unit will be located in')").text('军团总部将会设立在你公民国籍的国家中. 注意, 当你创立好军团, 日后将不能更改军团名称及所在地点, 只能更改图标和描述.')
			$('#create_military_unit > .holder.create_company > h2:first').text('军团需求');
			$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(0) > div').replaceText('Funding Fee','启动资金');
			$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(1) > div').replaceText('Military Rank','军衔等级');
			$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(2) > div').replaceText('Experience Level','经验等级');
		} else if ((document.location.toString().indexOf("/group-show/")!==-1) || (document.location.toString().indexOf("/group-list/")!==-1)) {
			$('h3').css('font-family','微軟正黑体,微软雅黑');
			// group-show, group-list
			$('#military_group_header > .header_content > h2:first > big').replaceText('members','成员');
			$("#military_group_header > .header_content > .details > strong:contains('Location:')").text('所在地:');
			$("#military_group_header > .header_content > .details > strong:contains('Commander:')").text('指挥官:');
			$('#military_group_header > .header_content > .details > a.big_action.join > strong').text('加入');
			$("#military_group_header > .header_content > .details > a.simple > strong:contains('Resign')").text('退出军团');
			$("#military_group_header > .header_content > .details > a:contains('View rank')").text('军团排名');
			$("#military_group_header > .header_content > .details > a.backmu").text('返回军团首页');
			$("#group_right_column > .leader > h3:first:contains('Commander')").text('军团指挥官');
			$("#group_right_column > .leader > h3:last:exact('Regiment Captain')").text('军团小队长');
			$("#group_right_column > .leader > h3:last:exact('No Captain')").text('没有军团小队长');
			$('#group_right_column > .members > h3:first').replaceText('Members','军团成员');
			$('#group_right_column > .members > a.show_all').text('查看全部');
			$('#orderContainer > h3').replaceText('Order of the day','每日军团任务');
			$('#orderContainer > .requirements.fight > ul.req_content > li.condition0 > .details > strong').text($('#orderContainer > .requirements.fight > ul.req_content > li.condition0 > .details > strong').text().replace('Defeat enemies from','击倒')+' 战场上的敌人');
			$('#group_orders > h3:first').text('新兵任务');
			$('#group_orders > p:first').text('完成这些任务, 就能成为这个军团的正式队员.');
			$('#group_orders > .requirements > ul.req_content > li:eq(0) > .details > strong').text('获得军衔: 中士 (Sergeant)');
			$('#group_orders > .requirements > ul.req_content > li:eq(1) > .details > strong').text('以军团成员的身份击倒 25 个敌人');
			$('#group_orders > .requirements > ul.req_content > li:eq(2) > .details > strong').text('在 5 场不同的战役中, 为国家和我们的同盟而战');
			$("#group_feeds > h3:first").text('军团微博');
			$('#group_feeds > #citizen_feed > .shouter > form#wall_post > textarea#shout.expand').text('和军团的朋友们说些有趣的东西吧');
			$('#group_feeds > #citizen_feed > .shouter > form#wall_post > span.controls > a.post_button > b').text('分享');
			$("#group_feeds > #citizen_feed a[trigger='reply']").text('留言');
			$("#group_feeds > #citizen_feed span[trigger='add_comment']").text('留言');
			$("#group_feeds > #citizen_feed div.fake_input").text('留言吧');
//			$("#group_feeds > #citizen_feed a[target='reportpopup']").text('举报');
			$("table.info_message > tbody > tr > td:contains('You must be a member of')").text('你必须加入此军团, 才能觀看军团微博.');
			$("table.error_message > tbody > tr > td:contains('Sorry, you need to have the same citizenship')").text('对不起, 你必须和该军团相同国籍才能申请加入. 试着加入其它的军团吧.');
			if (document.location.toString().indexOf("/group-list/")!==-1) {
				//group-list
				$('#members_holder > h3:first').text('军团成员');
			};
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 国家 www.erepublik.com/en/main/country/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if ((document.location.toString().indexOf("/country")!==-1) || (document.location.toString().indexOf("/law/")!==-1)) {
		$('#filters > a.btn-filters-select.goleft').text('选择');
		$('#profileholder > p > a.vroundbtnh25-start:eq(0) > span.vroundbtnh25-end > span.vroundbtnh25-core_large').text('捐赠国库');
		$('#profileholder > p > a.vroundbtnh25-start:eq(1) > span.vroundbtnh25-end > span.vroundbtnh25-core_large').text('查看地图');
		$(".extended-menus > .core > .bordersep > h2.goleft.big:contains('Country')").text('请选择一个国家');
		$('ul.ftabs > li:eq(0) > a > span').text('国家目标');
		$('ul.ftabs > li:eq(1) > a > span').text('社会地理');
		$('ul.ftabs > li:eq(2) > a > span').text('经济统计');
		$('ul.ftabs > li:eq(3) > a > span').text('政治选举');
		$('ul.ftabs > li:eq(4) > a > span').text('军事资讯');
		$('ul.ftabs > li:eq(5) > a > span').text('管理中心');
		$("h2:exact('Current national goals')").text("当前的国家目标");
		$("a:exact('check current status')").text("检查目前进度");
		$("p.general-text:contains('The elected president has not set any national goals for this month.')").text("总统并未设置本月的国家目标。");
		$("h2:exact('Monuments achieved')").text("纪念碑");
		//社会地理
		if (document.location.toString().indexOf("/country/society/")!==-1) {
			$("h2:exact('Citizens')").text("人口");
			$("span.fakeheight:eq(0)").text("活跃人口");
			$("span.fakeheight:eq(1)").text("本日新出生公民");
			$("span.fakeheight:eq(2)").text("国籍申请");
			$("span.fakeheight:eq(3)").text("公民平均等级");
			$("span.fakeheight:eq(4)").text("正在线上的公民");
			$("span.fakeheight:eq(5)").text("新生公民福利金");
			$("a.blue_arrow_small > span ").text("查看申请状态");
			$("a.details-small").text("详情");
		};
		//经济统计
		if (document.location.toString().indexOf("/country/economy/")!==-1) {
			
			$("h2:exact('Country resources')").text("资源列表");
			$("h2:exact('Treasury')").text("国库");
			$("h2:exact('Country trading embargoes')").text("国家贸易禁运资讯");
			$("td:contains('This country can trade with any other country in eRepublik.')").text("该国可以与任何国家进行贸易。");
			$("h2:exact('Taxes')").text("税收");
			$(".resource_list > thead > tr > th:eq(0)").text("资源");
			$(".resource_list > thead > tr > th:eq(1)").text("产地");
			$("td > small:exact('Not available')").text("无");
			$("ul.profilemenu > li > a").text("国家銀行");		
		
			$(".resource_list > tbody > tr > td > span:exact('Fish')").text("鱼");
			$(".resource_list > tbody > tr > td > span:exact('Grain')").text("谷物");
			$(".resource_list > tbody > tr > td > span:exact('Fruits')").text("水果");
			$(".resource_list > tbody > tr > td > span:exact('Cattle')").text("牛");
			$(".resource_list > tbody > tr > td > span:exact('Deer')").text("鹿");
			$(".resource_list > tbody > tr > td > span:exact('Iron')").text("铜铁");
			$(".resource_list > tbody > tr > td > span:exact('Saltpeter')").text("硝");
			$(".resource_list > tbody > tr > td > span:exact('Aluminum')").text("铝");
			$(".resource_list > tbody > tr > td > span:exact('Oil')").text("油");
			$(".resource_list > tbody > tr > td > span:exact('Rubber')").text("橡胶");
			
			$("th:exact('Income Tax')").text("所得税");
			$("th:exact('Import Tax')").text("进口税");
			$("th:exact('VAT')").text("增值税");
			$("span.fakeheight:contains('Food')").text("食物");
			$("span.fakeheight:contains('Weapons')").text("武器");
			$("span.fakeheight:contains('House')").text("房屋");
			$("span.fakeheight:contains('Moving Tickets')").text("机票");
			$("span.fakeheight:contains('Food Raw Material')").text("食物原料");
			$("span.fakeheight:contains('Weapon Raw Material')").text("武器原料");
			$("span.fakeheight:contains('Hospital')").text("医院");
			$("span.fakeheight:contains('Defense System')").text("防御设施");
			$("h2:exact('Salary')").text("工资");
			$("span.fakeheight:exact('Minimum')").text("最低薪资");
			$("span.fakeheight:exact('Average')").text("平均薪资");
			$("h2:exact('Info')").text("统计资讯");
			$("h2:exact('Revenues')").text("税收资讯");
		};
		//政治选举
		if (document.location.toString().indexOf("/country/politics/")!==-1) {
			$("h2:exact('President')").text("总统");
			$("h2:exact('Congress')").text("议员");
			$("span.vroundbtnh25-core:contains('Election results')").text("选举结果");
			$("span.vroundbtnh25-core:contains('Next elections')").text("下次选举");
		};
		
		//军事资讯
		if (document.location.toString().indexOf("/country/military/")!==-1) {
			$("table.info_message > tbody > tr > td").text("在对抗世仇国家時，战场上所有的国民将有 10% 的战场影响力加成。");
			$(".nameholder:contains('No current Natural Enemy')").text("现在没有设定世仇国家")
			$("td:contains('There are no resistance wars in this country.')").text("现在境内没有任何起义战争")
			var Our = $("div#profileholder > h1").text();
			$("h2.section:eq(0)").text("世仇国家");
			$("h2.section:eq(1)").html(Our+' 正在参与的战争');
			$("h2.section:eq(2)").html(Our+' 正在参与的起义战争');
			$("h2.section:eq(3)").text("同盟国家");
			
			$("a.vroundbtnh25-core:contains('details')").text("详情");
			$("a.vroundbtnh25-core:contains('All wars')").text("所有战争");
			$("a.vroundbtnh25-core:contains('All resistance wars')").text("所有起义战争");
			$("a.vroundbtnh25-core:contains('All Alliances')").text("各国同盟情形");
		};
		//管理中心
		if (document.location.toString().indexOf("/country-administration/")!==-1) {
			$("span:exact('You are not a president or a congress member in this country.')").text('你现在不是这个国家的总统或议员');
			$(".adminaction > .goleft > span.goleft:contains('Hello, Congress Member')").text('你好, 国会议员阁下');
			$(".adminaction > .goleft > span.vround-redbtn-h20-start > span.vround-redbtn-h20-end > form > .vround-redbtn-h20-core:contains('Resign')").text('辞职');
			$(".adminaction > .goright:contains('Your proposals')").replaceText('Your proposals','你的提案');
			$(".adminaction > table > tbody > tr > td > span.vround-btn-start-xlarge > span.vround-btn-end-xlarge > input#expandLaw,input#colapseLaw").attr('value','提出法律提案');
			$(".holder > h2.section:contains('Law proposals')").text('法律提案');
			//congressman
			$("a:exact('New Citizen Fee')").text('新生公民补助款');
			$("a:exact('Donate')").text('捐赠');
			$("a:exact('Issue Money')").text('发行货币');
			$("a:exact('Taxes')").text('调整税率');
			$("a:exact('Minimum Wage')").text('最低工资');
			$("a:exact('President Impeachment')").text('总统弹劾提案');
			$("a:exact('Provide citizenship')").text('国籍审核');
			$("a:exact('Natural Enemy')").text('世仇');
			//president
			$("a:exact('Alliance')").text('同盟');
			$("a:exact('Peace Proposal')").text('和平提案');
			$("a:exact('Trading Embargo')").text('贸易禁运');
			$("a:exact('Buy Constructions')").text('国家建设');
			$("a:exact('New Citizen Message')").text('新生公民信息');
			//others
			$("a:contains('Tax change')").replaceText('Tax change:','调整税率: ');
			$("table.laws.largepadded > tbody > tr > td > span.vroundbtnh25-start > span.vroundbtnh25-end > a.vroundbtnh25-core:contains('details')").text('详情');
			$("table.laws.largepadded > tbody > tr > td:exact('Pending')").replaceText('Pending','表決中');
			$("table.laws.largepadded > tbody > tr > td:exact('Accepted')").replaceText('Accepted','通过');
			$("table.laws.largepadded > tbody > tr > td:exact('Rejected')").replaceText('Rejected','否決');
		} else if (document.location.toString().indexOf("/law/")!==-1) {
			$('h2').css('font-family','微軟正黑体,微软雅黑');
			$('.holder > .indent > .bordersep.special').css('font-family','微軟正黑体,微软雅黑');
			// law proposals
			$(".holder > .indent > .bordersep.special:contains('Law proposals')").text('法律提案');
			// donate
//			$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Donate')").text('捐赠');
//			$('.holder:eq(1) > .indent > .goleft > p.largepadded').replaceText('Proposed by','提案人:').replaceText(',',', 提案時间:');
//			$(".holder:eq(1) > .indent > p.largepadded:contains('Do you agree to transfer')").replaceText('Do you agree to transfer','请问你是否同意从国库中捐赠').replaceText('from the country accounts to','到');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 举报 www.erepublik.com/en/tickets/report/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/tickets/report/")!==-1) {
		$('h3').css('font-family','微軟正黑体,微软雅黑');
		$('div').css('font-family','微軟正黑体,微软雅黑');
		// report ticket
		$('body.reportAbuseBody > a.btn-arrow-left-small').text('取消');
		$('body.reportAbuseBody > h3').replaceText('Report ','举报').replaceText('a newspaper','本报').replaceText('an article','本文').replaceText('a comment','留言').replaceText('a wall post','微博留言').replaceText('a wall comment','微博回应').replaceText('a party','政党');
		$('form.reportAbuse > div:first').html('依照 <a target="_blank" href="/en/laws">游戏规则</a> 及 <a target="_blank" href="/en/terms-and-conditions">服务条款</a> 的规范，</br>你可以举报这些不适当的内容，所有的举报都受到严格保密.')
		$("form.reportAbuse > .reportLabel:contains('Reason for the report')").text('举报的理由:');
		$("form.reportAbuse > select#report_reason > option[value='6']").text('低俗内容');
		$("form.reportAbuse > select#report_reason > option[value='7']").text('公然侮辱');
		$("form.reportAbuse > select#report_reason > option[value='8']").text('种族歧视');
		$("form.reportAbuse > select#report_reason > option[value='9']").text('色情描写');
		$("form.reportAbuse > select#report_reason > option[value='10']").text('垃圾信息');
		$("form.reportAbuse > select#report_reason > option[value='11']").text('外部广告');
		$("form.reportAbuse > select#report_reason > option[value='16']").text('制造纠纷');
		$("form.reportAbuse > .reportMessage:contains('By submitting this report')").html('当送出这份举报的同時，表示你同意：</br> 如果被发现故意重覆送出无效的举报時，帐号愿接受适当的处罚.')
		$("form.reportAbuse > .reportLabel:contains('Language in which the reported content is written')").text('举报内容的语言:');
		$("form.reportAbuse > div:last > input[value='Report']").attr('value','举报');
	};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 'economy.erepublik.com
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
} else if (host==='economy') {
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 领地 economy.erepublik.com/en/land/overview/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/land/")!==-1) {
		$('h1').css('font-family','微軟正黑体,微软雅黑');
		// my land
		$("h1:contains('My Land')").replaceText('My Land','我的领地');
		$("h1:contains('Land of')").text($("h1:contains('Land of')").replaceText('Land of','').text()+' 的领地');
		$("a.plain_blue_small > span:contains('Marketplace')").text('商品市场');
		$("a.plain_blue_small > span:contains('+50 Health Building')").text('+50 卫生大楼');
		$("a.plain_blue_small > span:contains('+100 Health Building')").text('+100 卫生大楼');
		$("a.plain_blue_small > span:contains('Town Center')").text('城镇中心');
		$("a.plain_blue_small > span:contains('Training grounds')").text('训练场');
		$("a.plain_blue_small > span:contains('Climbing Center')").text('攀岩中心');
		$("a.plain_blue_small > span:contains('Shooting Range')").text('射击训练场');
		$("a.plain_blue_small > span:contains('Special Forces Center')").text('特种训练中心');
		$("a.plain_blue_small > span:contains('Storage (capacity: 1000)')").text('仓库 (容量: 1000)');
		$("a.plain_blue_small > span:contains('Storage (capacity: 9000)')").text('大型仓库 (容量: 9000)');
		$("a.plain_blue_small > span:contains('Storage (capacity: 20000)')").text('巨型仓库 (容量: 20000)');
		// tooltips, hints
		$('a.plain.upgrade.tipser.health').attr('title','升级城镇中心');
		$('a.plain.upgrade.tipser').attr('title','升级公司');
		$('a.plain.options.tipser').attr('title','公司详情');
		$('a.plain.manage.tipser').attr('title','管理雇员');
		$('a.plain.resign.tipser').attr('title','辞职');
		$('a.main.build > span').attr('title','点击这块土地, 看看你可以建造那些建筑物');
		$('a.buyLand.main.empty > span').attr('title','买下这块土地, 你可以建造建筑物在上面');
		$("ul.land_holder > li[title='Grain Farm']").attr('title','农场');
		$("ul.land_holder > li[title='Fruit Orchard']").attr('title','果园');
		$("ul.land_holder > li[title='Fishery']").attr('title','渔场');
		$("ul.land_holder > li[title='Cattle Farm']").attr('title','畜牧场');
		$("ul.land_holder > li[title='Hunting Lodge']").attr('title','狩猎场');
		$("ul.land_holder > li[title='Iron Mine']").attr('title','铁矿');
		$("ul.land_holder > li[title='Oil Rig']").attr('title','油井');
		$("ul.land_holder > li[title='Aluminium Mine']").attr('title','鋁矿');
		$("ul.land_holder > li[title='Saltpeter Mine']").attr('title','硝石矿');
		$("ul.land_holder > li[title='Rubber Plantation']").attr('title','橡胶园');
		$("ul.land_holder > li[title='Food Factory']").attr('title','食物工厂');
		$("ul.land_holder > li[title='Weapons Factory']").attr('title','武器工厂');
		// work result
		$("#work_results a[title='Show details'] > span:eq(0)").text('显示细节');
		$("#work_results a[title='Show details'] > span:eq(1)").text('隐藏细节');
		$('#work_results .wdetails_bar > #national_bonus > div:first > small').text('国家资源加成');
		$('#work_results .wdetails_bar > .list.stats > div:first > small').text('个人状态');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Days worked in a row']").attr('title','连续工作天数');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Experience points']").attr('title','经验值');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Health loss']").attr('title','体力值');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Raw materials used']").attr('title','使用原料');
		// train result
		$('#train_results .wdetails_content > div > div > small').text('力量');
		$("#train_results a[title='Show details'] > span:eq(0)").text('显示细节');
		$("#train_results a[title='Show details'] > span:eq(1)").text('隐藏细节');
		$('#train_results .wdetails_bar > .list.friends_bonus > div:first > small').text('邀请好友奖励');
		$('#train_results .wdetails_bar > .list.friends_bonus_off > div:first > small').text('邀请好友奖励');
		$('#train_results .wdetails_bar > .list.natural_enemy_bonus > div:first > small').text('世仇战场奖励');
		$('#train_results .wdetails_bar > .list.natural_enemy_bonus_off > div:first > small').text('世仇战场奖励');
		$('#train_results .wdetails_bar > .list.stats > div:first > small').text('个人状态');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Super soldier']").attr('title','超级大兵');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Experience points']").attr('title','经验值');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Health loss']").attr('title','体力值');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Gold loss']").attr('title','金钱');
		// buy land
		$('#buy_land > .pop_repeat > div > .title > strong').text('购买土地');
		$('#buy_land > .pop_repeat > div > .buy_preview > strong').text('新的土地');
		$('#buy_land > .pop_repeat > div > .buy_preview > small').replaceText('Cost','花费');
		$('#buy_land > .pop_repeat > div > a#expandLand').text('扩建');
		// congrats
		$('#congrats > .wrepeat > .wcontent > .txt > h4').text('恭喜');
		$('#congrats > .wrepeat > .wcontent > .txt > p').text('你已经成功买下一块土地!');
		
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 市场 economy.erepublik.com/en/market/
	//   - 二手 economy.erepublik.com/en/market/company/
	//   - 就業 economy.erepublik.com/en/market/job/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/market/")!==-1) {
		$('h1').css('font-family','微軟正黑体,微软雅黑');
		$('h4').css('font-family','微軟正黑体,微软雅黑');
		// market
		$("#marketplace > h1:contains('Marketplace')").text('商品市场');
		$("#filters_expanded > h4:contains('Select product')").text('请选择你要购买的产品类型');
		$(".product_selector > ul > li > a[title='Food'] > strong").text('食物');
		$(".product_selector > ul > li > a[title='Weapons'] > strong").text('武器');
		$(".product_selector > ul > li > a[title='House'] > strong").text('房屋');
		$(".product_selector > ul > li > a[title='Moving Tickets'] > strong").text('机票');
		$(".product_selector > ul > li > a[title='Food Raw Material'] > strong").text('食物原料');
		$(".product_selector > ul > li > a[title='Weapon Raw Material'] > strong").text('武器原料');
		$(".product_selector > ul > li > a[title='Hospital'] > strong").text('医院');
		$(".product_selector > ul > li > a[title='Defense System'] > strong").text('防御设施');
		$(".product_selector > ul > li.last > a > strong").text('二手公司');
		$("#filters_expanded > #minReq > h4:contains('Select quality')").text('请选择你要购买的等级');
		$("#filters_summary > .sactual > .sattr > small:exact('Health restore')").text('可恢复体力值');
		$("#filters_summary > .sactual > .sattr > small:exact('Fire Power')").text('火力');
		$("#filters_summary > .sactual > .sattr > small:exact('Durability')").text('耐久度');
		$("#filters_summary > .sactual > .sattr > small:exact('Health')").text('体力值');
		$("#filters_summary > .sactual > .sattr > small:exact('Moving Distance')").text('移动距离');
		$("#filters_summary > .sactual > .sattr > small:exact('Uses/Player')").text("次数/每个玩家");
		$("#filters_summary > .sactual > .sattr > small:exact('Defense Budget')").text("防御输出");
		$("#filters_summary > .sactual > .sattr > div > span.solid.health > strong:exact('/ use')").text('/ 每次');
		$("#filters_summary > .sactual > .sattr > div > span.solid.health > strong:exact('/ day')").text('/ 每天');
		$("#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact(' uses')").text(' 次');
		$('#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact("use(s)")').text('次');
		$('#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact("day(s)")').text('天');
		$('#filters_summary > .sactual > .sattr > div > span.solid.moving_distance > strong:exact("zone(s)")').text('区域');
		$("#filters_summary > .sactual > .schange > a > span:contains('Change')").text('更改');
		$("#marketplace > table > thead > tr.m_mainh > th.m_product:contains('Product')").text('产品');
		$('#marketplace > table > thead > tr.m_mainh > th.m_provider').text('供应商');
		$('#marketplace > table > thead > tr.m_mainh > th.m_stock').text('库存');
		$("#marketplace > table > thead > tr.m_mainh > th.m_price > a[title='Price']").text('价格');
		$('#marketplace > table > thead > tr.m_mainh > th.m_quantity').text('数量');
		$('#marketplace > table > tbody > tr > td.m_buy > a > span').text('购买');
		$("table.info_message > tbody > tr > td:contains('There are no market offers matching you search.')").text('目前没有出售中的产品.');
		if (document.location.toString().indexOf("/company/")!==-1) {
			// company market
			$("#marketplace > h1:contains('Companies for sale')").text("二手公司拍卖市场");
			$("#marketplace > div.companies_sale > h4:contains('Select company')").text('请选择你要购买的公司类型');
			$("#marketplace > table > thead > tr.m_mainh > th.m_product:contains('Company')").text('公司名称');
			$("table.error_message > tbody > tr > td:contains('You can not buy a company in a country for which you do not have citizenship.')").text('你不能购买不同国籍的二手公司.');
			$("table.info_message > tbody > tr > td:contains('There are no companies for sale matching you search.')").text('目前没有出售中的二手公司.');
		} else if (document.location.toString().indexOf("/job/")!==-1) {
			// job market
			$("#job_market > h1:contains('Job Market')").text("就業市场");
			$("table.info_message > tbody > tr > td:contains('You already have a job at')").replaceText('You already have a job at','你有一份在').replaceText('Company. To apply for this job you have to quit your current job.',"公司的工作. 如果想找新工作, 请先离开现职.");
			$('#job_market > table > thead > tr.jm_mainh > th.jm_company').text('雇主');
			$('#job_market > table > thead > tr.jm_mainh > th.jm_industry').text('公司名称');
			$('#job_market > table > thead > tr.jm_mainh > th.jm_salary > a').text('日薪');
			$('#job_market > table > thead > tr > th.jm_apply > a > span').text('同意');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 建造 economy.erepublik.com/en/company/create
	// 公司 economy.erepublik.com/en/company/
	//   - 编辑 economy.erepublik.com/en/company/edit/
	//   - 拍卖 economy.erepublik.com/en/company/sell/
	//   - 雇员 economy.erepublik.com/en/company/employees/
	//          economy.erepublik.com/en/company/job-offers/
	//   - 更改 economy.erepublik.com/en/company/migrate/
	//   - 升级 economy.erepublik.com/en/company/customize/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/company/")!==-1) {
		if (document.location.toString().indexOf("/company/create")!==-1) {
			$('h1').css('font-family','微軟正黑体,微软雅黑');
			$('h3').css('font-family','微軟正黑体,微软雅黑');
			// create company
			$('h1:first').text('建造');
			$('.create_building > h3:first').text('请选择要建造的建筑物类型');
			$(".create_links > a[title='Food raw materials'] > span").text('食物原料');
			$(".create_links > a[title='Weapon raw materials'] > span").text('武器原料');
			$(".create_links > a[title='Factories'] > span").text('工厂');
			$(".create_links > a[title='Storage'] > span").text('仓库');
			$(".create_links > a[title='Training Facilities'] > span").text('训练设施');
			$('.create_building > h3#second_title').text('请決定建筑物');
			$('ul.buildings > li.food:eq(0) > a > strong').text('农场');
			$('ul.buildings > li.food:eq(1) > a > strong').text('果园');
			$('ul.buildings > li.food:eq(2) > a > strong').text('渔场');
			$('ul.buildings > li.food:eq(3) > a > strong').text('畜牧场');
			$('ul.buildings > li.food:eq(4) > a > strong').text('狩猎场');
			$('ul.buildings > li.weapon:eq(0) > a > strong').text('铁矿');
			$('ul.buildings > li.weapon:eq(1) > a > strong').text('油井');
			$('ul.buildings > li.weapon:eq(2) > a > strong').text('鋁矿');
			$('ul.buildings > li.weapon:eq(3) > a > strong').text('硝石矿');
			$('ul.buildings > li.weapon:eq(4) > a > strong').text('橡胶园');
			$("ul.buildings > li.factories > a > strong:contains('Food')").text('食物工厂');
			$("ul.buildings > li.factories > a > strong:contains('Weapons')").text('武器工厂');
			$("ul.buildings > li.storage > a > strong:contains('Normal')").text('仓库');
			$("ul.buildings > li.storage > a > strong:contains('Large')").text('大型仓库');
			$('ul.buildings > li.train:eq(0) > a > strong').text('训练场');	
			$('ul.buildings > li.train:eq(1) > a > strong').text('攀岩中心');
			$('ul.buildings > li.train:eq(2) > a > strong').text('射击训练场');
			$('ul.buildings > li.train:eq(3) > a > strong').text('特种训练中心');
			$('ul.buildings > li.train > .train_cost').replaceText('train','每次');
			$('form#companyCreateForm a#construct > span').text('确定建造');
		} else {
			$('h2').css('font-family','微軟正黑体,微软雅黑');
			$('h4').css('font-family','微軟正黑体,微软雅黑');
			// company profile
			$('#companyOptions > .content_part > .left_part > ul > li > a.edit').html('<img src="http://www.erepublik.com/images/modules/_icons/company_edit_details.png" alt=""> 编辑详情');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Sell company')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_sell.png" alt=""> 拍卖公司');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Company profile')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_profile.png" alt=""> 公司资料');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Migrate company')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_migrate.png" alt=""> 更改公司类型');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total food raw material stock')").text('库存食物原料');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total weapon raw material stock')").text('库存武器原料');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total food stock')").text('库存食物');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total weapons stock')").text('库存武器');
			$("#company_info_panel > .elements > .product_stock > .stats > p:contains('This data is confidential.')").text('相关公司资料保密.');
			$('#company_info_panel > .elements > .finances > h2:first').text('资金额度');
			$('#company_info_panel > .elements > .raw_materials > h2:first').text('产品原料');
			$("#company_info_panel > .elements > .raw_materials > .stats > p:contains('This data is confidential.')").text('相关公司资料保密.');
			$('#company_info_panel > .elements > .raw_materials > .stats > p').replaceText('raw material req. per ','单位原料, 可以生产一单位').replaceText('food','食物.').replaceText('weapon','武器.');
			$('#company_info_panel > .manage_panel > .storage_actions > table > tbody > tr > td > a > span').text('查看仓库库存');
			$('#company_info_panel > .manage_panel > .finances_actions > table > tbody > tr > td > a > span').text('查看现金账户');
			$('#company_info_panel > .manage_panel > .raw_materials_actions > tbody > tr > td > a > span').text('购买产品原料');
			$('#production_status > table.stats > tbody > tr > td > .employee > big > span:last').text('雇员');
			$('#production_status > table.stats > tbody > tr > td > .employee > .recommended_employees > a.manage_link').text('管理雇员');
			$("table.info_message > tbody > tr > td:contains('You can view your market licences and sell products directly from your')").html('你可以直接检视及出售自己 <a href="http://www.erepublik.com/en/economy/inventory" rel="noreferrer">仓库</a> 中的产品.');
			$("table.error_message > tbody > tr > td:contains('This company name is already used by another Erpk entity. Please choose another one.')").text('这个公司名称已被他人使用, 建议重新选择其它的名称.');
			if (document.location.toString().indexOf("/company/edit/")!==-1) {
				// company edit
				$('form#companyEditForm > h2:first').text('公司登记');
				$("form#companyEditForm > .container_blue_border > .company_name > strong:contains('Company name')").text('公司名称');
				$("form#companyEditForm > .container_blue_border > strong.blued:contains('Company description')").text('关于此公司　　　');
				$("form#companyEditForm > table > tbody > tr > td > a[title='Save changes'] > span").text('确定更改');
			} else if (document.location.toString().indexOf("/company/sell/")!==-1) {
				// company sell
				$('.sell_company > h2:first').text('拍卖公司');
				$('.sell_company > .disolve_company > h2:first').text('解散公司');
				$('.sell_company > .disolve_company > table > tbody > tr > td > p').replaceText('You can dissolve your company for','解散这间公司你可以获得');
				$(".sell_company > .disolve_company > table > tbody > tr > td > a[title='Dissolve company'] > span").text('解散公司');
				$("table.info_message > tbody > tr > td:contains('Raw Material buildings cannot be sold.')").text('原料建筑无法被拍卖出售.')
				$("table.info_message > tbody > tr > td:contains('This building cannot be sold nor dissolved.')").text('这栋建筑物无法被拍卖出售.')
				$("table.info_message > tbody > tr > td:contains('Dissolving a company will empty')").text('解散公司会清空土地上己有的建筑物, 然后你可以再建造新的建筑在上面.')
				$("table.info_message > tbody > tr > td:contains('This company can be put on sale starting with')").replaceText('This company can be put on sale starting with','这间公司在').replaceText('of the New World, at','的').replaceText("(10 days since it was created or bought).","后才能被拍卖. (十天内不能转让同间公司)");
			} else if ((document.location.toString().indexOf("/company/employees/")!==-1) || (document.location.toString().indexOf("/company/job-offers/")!==-1)) {
				// company employee
				$('#employee_list > h2:first').text('管理雇员');
				$("#employee_list > ul.ftabs > li > a[title='Employee list']").replaceText('Employee list','雇员清单');
				$("#employee_list > ul.ftabs > li > a[title='Job offers']").replaceText('Job offers','工作职缺');
				$('#employee_list > table > thead > tr.el_mainh > th.el_employee').text('雇员');
				$('#employee_list > table > thead > tr.el_mainh > th.el_productivity > span:first').text('单位产量');
				$('#employee_list > table > thead > tr.el_mainh > th.el_salary > a').text('日薪');
				$('#employee_list > table > tbody > tr > td.el_salary > div > a.f_red_small > span').text('开除');
				$("table.info_message > tbody > tr > td:contains('This company has no employees at the moment')").text('这间公司目前没有任何雇员.')
				// company job offer
				$('#job_offers > h2:first').text('管理雇员');
				$("#job_offers > ul.ftabs > li > a[title='Employee list']").replaceText('Employee list','雇员清单');
				$("#job_offers > ul.ftabs > li > a[title='Job offers']").replaceText('Job offers','工作职缺');
				$('#job_offers > table > thead > tr.jo_mainh > th.jo_ammount').text('职缺');
				$('#job_offers > table > thead > tr.jo_mainh > th.jo_salary > a').text('日薪');
				$("#job_offers > table > tbody > tr > td > div > a[title='Change'] > span").text('更改');
				$("#job_offers > table > tbody > tr > td > div > a[title='Save'] > span").text('储存');
				$("table.info_message > tbody > tr > td:contains('This company has no job offers at the moment')").text('这间公司目前没有任何职缺.')
			} else if (document.location.toString().indexOf("/company/migrate/")!==-1) {
				// company migrate
				// -- my friend tell me this function will be removed in the future \o/ @blakcca
			} else if (document.location.toString().indexOf("/company/customize/")!==-1) {
				// company upgrade, downgrade
				$('.product_design > h2:first').text('升级公司');
				$('.product_design > .container_blue_border > h4:first').text('请选择你想调整的公司等级');
				$('.product_design > .container_blue_border > ul.packs > li > .product_detail > span').replaceText('Refund','退还').replaceText('Cost','花费').replaceText('Owned','已拥有');
				$('.product_design > .container_blue_border > ul.packs > li > a.upgrade').text('升级');
				$('.product_design > .container_blue_border > ul.packs > li > a.downgrade').text('降级');
			};
		};
	};
};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// Easter egg Archive: 
// please keep this part, i think it will be fun, but you can edit it :3
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if ((host==='www') && (document.location.toString().indexOf("/citizen/profile/")!==-1)) {
	var selfid = $('a#financier').attr('href').split('/')[4];
	if ((document.location.toString().indexOf("/citizen/profile/"+selfid)!==-1)===false) {
		var transIco = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAd1JREFUKFO1zk9Ik3Ecx/GBdMpDp7p0iE4d6tBpl67RwUy0kLJ/1CGDSBZqmShiNEKSTUfGao6F1Ar/tj3PdK7ctKflpFot2irTQS3xmZZurqSnP8/bnxpdgqBDv9OXL5/X7/sxGP7XA9Yl1bk9//R/PDlttPUO81ekf50t1LORmD4fjSwHX02o24oaXOIgO/6AYplP2gHpVtD8sNANyWpm3slsqvMQfDFR8BuJcF4gPplsCY9TYz5K9vEReH8BUhfRnxYjR+6ypbEfk8v7XdO00hVYfSuAf0olI3TllS5e27aCZASPkfHW7fg+LHLYPkBZSzc1HX4MIrfG/XKSscwygXJ3AsulEujfCL7NBB2HiIt91Z37mPvCVLT7MORyuQ2XR2KEZj7yjZ/sb1c4Vl+F5DrOgH0Xg8EmpgSy+SMUNndSft27gtY3P4gx+inDtLbIXvsQtVfNOIbusfaETCh0nrRAHSNRCkS9EkvnKrII9CyTJSEqHnAOcsrZhfv5G3aab+CRa1EFaht+Qqmots/6C1mVGPGFHGPqLAedMqabATHPU3zNR4Wrh88C1XkfcrpPoaytd/VSUzBKKKUiv01xpkfh7O0AibksJq/CbqvEF/0H9fIjzklhTjollgAlh3HhaTlI3QAAAABJRU5ErkJggg==';
		if (document.location.toString().indexOf("/citizen/profile/3076162")!==-1) {
			// Billwilson
			$('body#citizenprofile .citizen_profile_header.auth > .citizen_state').prepend(
				'<div class="is tip" original-title="the member of eRepublik Traditional Chinese Translation Project."><span><img src="'+transIco+'" alt>三萌主义の国父</span></div>');};
		if (document.location.toString().indexOf("/citizen/profile/4633793")!==-1) {
			// blackca
			$('body#citizenprofile .citizen_profile_header.auth > .citizen_state').prepend(
				'<div class="is tip" original-title="the member of eRepublik Traditional Chinese Translation Project."><span><img src="'+transIco+'" alt>Myu 教団の娘</span></div>');};
		if (document.location.toString().indexOf("/citizen/profile/3076913")!==-1) {
			// lifethinker
			$('body#citizenprofile .citizen_profile_header.auth > .citizen_state').prepend(
				'<div class="is tip" original-title="the member of eRepublik Simplified Chinese Translation Project."><span><img src="'+transIco+'" alt>夢想の実賎者</span></div>');};
		if (document.location.toString().indexOf("/citizen/profile/5155527")!==-1) {
			// kyuu bee
			$('body#citizenprofile .citizen_profile_header.auth > .citizen_state').prepend(
				'<div class="is tip" original-title="the member of eRepublik Simplified Chinese Translation Project."><span><img src="'+transIco+'" alt>苦労の訳者</span></div>');};
	};
};




