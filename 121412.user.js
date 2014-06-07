// ==UserScript==
// @name           EKT
// @namespace      Korean Translation
// @description    http://*.erepublik.com/*
// @match          http://*.erepublik.com/*
// @include        http://www.erepublik.com/en
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=113187&days=3&uso
// ==/UserScript==

/* 
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

/* Day1422 快完成最後的責任了，加油 @blackca 
 */

//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// Common strings
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	$('strong#foodText').css('font-family','Arial,Arial');
	// header
//	$("input#search_field").attr("value","시민 검색");
	// common catalog
	$('#menu ul li#menu2 a').css('background-image','url(\"http://dl.dropbox.com/u/44219975/erepublik_edited.png\")');
	$('#menu ul li#menu3 a').css('background-image','url(\"http://dl.dropbox.com/u/44219975/erepublik_edited.png\")');
	$('#menu ul li#menu4 a').css('background-image','url(\"http://dl.dropbox.com/u/44219975/erepublik_edited.png\")');
	$('#menu ul li#menu5 a').css('background-image','url(\"http://dl.dropbox.com/u/44219975/erepublik_edited.png\")');
	//$('#menu > ul > li#menu3').append('<ul>' +
//		'<li><a href=\"http://www.erepublik.com/' +lang+ '/newspaper/roc-ministry-of-defense-245452/1\" target="_self">ROC 國防部軍令</a></li>' +
//		'<li><a href=\"http://www.erepublik.com/' +lang+ '/newspaper/ministry-of-sinodefence-196717/1\" target="_self">China 國防部軍令</a></li></ul>');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Marketplace')").text('상품시장');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Monetary')").text('통화시장');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Job')").text('노동시장');
	$("#menu > ul > li#menu4 > ul > li > a:contains('Companies for sale')").text('회사 옥션');
	$("#menu > ul > li#menu5 > ul > li > a:contains('World Map')").text('세계지도');
	$("#menu > ul > li#menu5 > ul > li > a:contains('My Party')").text('정당');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Elections')").text('선거');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Military Unit')").text('부대');
//	$('#menu > ul > li#menu5 > ul > li:eq(5) > a').text('国会議員センター');
//	$('#menu > ul > li#menu5 > ul > li:eq(6) > a').text('순위');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Invite friends')").text('친구 초대');
	$("#menu > ul > li#menu5 > ul > li > a:contains('Badges')").text('배너');
	$('#menu > ul > li#menu5 > ul').prepend('<li><a href=\"http://www.erepublik.com/en/news/latest/all\" target="_self">신문</a></li>');
	$('#menu > ul > li#menu5 > ul').append(
		'<li><a href=\"http://cafe.naver.com/erepublikesk" target="_blank">eSK 포럼 (한)</a></li>'+
		'<li><a href=\"http://chat.mibbit.com/#esk" target="_blank">IRC (English)</a></li>');
	// sidebar
	var Explevel = $('#experienceTooltip > strong').eq(0).text();
	var Exppoint = $('#experienceTooltip > strong').eq(1).text();
	var Nextlevel = $('#experienceTooltip > strong').eq(2).text();
	var healLimit = $('#eatFoodTooltip big.tooltip_health_limit').text();
	$('#experienceTooltip').html('<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />'+
		'경험 레벨: <strong>LV. '+Explevel+'</strong><br />경험치: <strong>'+Exppoint+'</strong><br />필요 레벨: <strong>'+Nextlevel+'</strong><br />');
	$('#eatFoodTooltip > p:eq(0)').text('창고의 빵 먹기, 최대 히트 포인트를 회복');
	$('#eatFoodTooltip > p:eq(1)').html('최대 히트 포인트 회복치 <big>'+healLimit+'</big>');
	$('#eatFoodTooltip > l, p:eq(1) > big').attr('class','tooltip_health_limit');
	$('#eatFoodTooltip > small').replaceText('100 more recoverable Health in','다음 HP 100점 회복량 필요시간')
	$('#sidebar_missions > .content > b:first').text('임무');
	$('strong#foodText').text('체력 회복');
	// others
	$('a.logout').text('로그아웃');
	$('a.prev').text('이전 페이지');
	$('a.next').text('다음 페이지');
	// footer
	$('#footer > p > a:eq(0)').text('포럼');
	$('#footer > p > a:eq(1)').text('위키');
	$('#footer > p > a:eq(2)').text('블로그');
	$('#footer > p > a:eq(3)').text('공식 블로그');
	$('#footer > p > a:eq(4)').text('GM 메일 접수');
	$('#footer > p > a:eq(5)').text('서비스 조건');
	$('#footer > p > a:eq(6)').text('개인정보 정책');
	$('#footer > p > a:eq(7)').text('개인정보 정책');
	$('#footer > p > a:eq(8)').text('제휴');
	$('#footer > p > a:eq(9)').text('게임 규칙');
	// remove kosovo ad
	$('#large_sidebar > .banner_place').remove();
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
// www.erepublik.com
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (host==='www') {
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
	// 메인 페이지 www.erepublik.com/en
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if ((document.location.toString()=="http://www.erepublik.com/"+lang) || (document.location.toString().indexOf("?viewPost=")!==-1)) {
		$('h1').css('font-family','Arial,Arial');
		$('#daily_pop > h2').css('font-family','Arial,Arial');
		$('#daily_pop > h3').css('font-family','Arial,Arial');
		// daily order Fight for ________ in  _______ XYZ 국가를 위해 ABC 지역에서 싸워주세요 
		$('#orderContainer > h1').text('부대 임무');
		$('#orderContainer > div > strong').text($('#orderContainer > div > strong').text().replace('Fight for ','').replace(' in ','를 위해 ') + ' 지역에서 싸워주세요');
		$('#orderContainer > div > a.blue_beauty').text('전장으로 가기');
		$('#orderContainer > div > a.green_beauty').text('수상');
		// daily task
		$('.column > .boxes.daily_tasks > h1').text('일일명령');
		$('.column > .boxes.daily_tasks > div > strong').text('일과 훈련');
		$('.column > .boxes.daily_tasks > div > a.blue_beauty').text('나의 영지');
		$('.column > .boxes.daily_tasks > div > a.green_beauty').text('수상');
		// daily task pop-box
		$('#daily_pop > h3').text('일일명령');
		$('#daily_pop > h2').text('임무 종료!');
		$('#daily_pop small:eq(0)').text('힘');
		$('#daily_pop small:eq(1)').text('경험치');
		$('#daily_pop > a').text('예');
		// battle list
		$('#homepage_feed .column:eq(0) > h1.noborder').text('전투 일람');
		$("#battle_listing > h4:exact('Campaign of the day')").text('오늘의 전투');
		$("#battle_listing > h4:contains('Allies')").text('동맹 전투');
		$("#battle_listing > h4:contains('Campaigns')").text('현재 '+$("#battle_listing > h4:contains('Campaigns')").replaceText('Campaigns','전투').text());
		$("#battle_listing span:exact('Fight')").text('싸우기');
		$('#battle_listing .rest > a:eq(0)').text('전투 일람');
		$('#battle_listing .rest > a:eq(1)').text('최신 뉴스');
		$('#battle_listing > ul.resistance_war').find('a#fundRW_btn > span').text('원조하기');
		$('#battle_listing > ul.resistance_war').find('.info > small').text('저항전을 시작합니다');
		// citizen feed
		$('#homepage_feed .column:eq(1) > h1:first').text('내 피드');
		$('#citizen_feed form#wall_post > textarea#shout').text('이곳에 적어주세요...');
		$('#citizen_feed a.report').text('신고하기');
		$('#citizen_feed a.post_button > b').text('투고');
		$('#citizen_feed a.previous_comments').text('이전 댓글 보기');
		$("#citizen_feed a[trigger='reply']").text('투고');
		$("#citizen_feed a[trigger='post_like']").text('좋아요');
		$("#citizen_feed a[trigger='post_unlike']").text('취소');
		$("#citizen_feed a[trigger='comment_like']").text('좋아요');
		$("#citizen_feed a[trigger='comment_unlike']").text('취소');
		$("#citizen_feed span[trigger='add_comment']").text('댓글 달기');
		$('#citizen_feed textarea.comment_reply_post').text('댓글 달기');
		$('#citizen_feed div.fake_input').text('댓글을 작성해주세요...');
		$('#citizen_feed').find("div.vote_bar em:contains('voted this.')").each( function() {
			$(this).find('b.personal').text('당신, ');
			$(this).replaceText('and','과').replaceText('voted this.','가 이 글을 추천했습니다');});
		$('#citizen_feed > .previous_posts > a > span').text('이전 댓글 보기');
		// news list
		$('#news.box > .title > h1:first').text('신문 분류');
		$('#articles > div > a.mbutton:eq(0) > span').text('뉴비 지도, 교육');
		$('#articles > div > a.mbutton:eq(1) > span').text('군명령');
		$('#articles > div > a.mbutton:eq(2) > span').text('생존전략---!');
		$('#articles > div > a.mbutton:eq(3) > span').text('정치평론');
		$('#articles > div > a.mbutton:eq(4) > span').text('경제 초점');
		$('#articles > div > a.mbutton:eq(5) > span').text('사교, 오락');
		$('#articles > div > a.mbutton:eq(6) > span').text('구독');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 개인 www.erepublik.com/en/main/citizen
	//          www.erepublik.com/en/economy/donate-items/
	//          www.erepublik.com/en/economy/donate-money/
	//   - 통화 www.erepublik.com/en/economy/citizen-accounts/
	//   - 친구 www.erepublik.com/en/main/citizen-friends/
	//   - 이동 www.erepublik.com/en/citizen/change-residence
	//   - 비밀번호 www.erepublik.com/en/citizen/change-password
	//   - 편집 www.erepublik.com/en/citizen/edit/profile
	// 국적 www.erepublik.com/en/citizenship
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if ((document.location.toString().indexOf("/citizen")!==-1) || (document.location.toString().indexOf("/economy/donate-")!==-1)) {
		$('h3').css('font-family','Arial,Arial');
		// layout menu
		$('.citizen_profile_header.auth > .citizen_edit > a > span').html('<img src="http://www.erepublik.com/images/modules/citizenprofile/edit.png">편집');
		$('.citizen_profile_header.auth > .citizen_menu > li:eq(0) > a').text('개요');
		$('.citizen_profile_header.auth > .citizen_menu > li:eq(1) > a').text('구좌');
		$('.citizen_profile_header.auth > .citizen_menu > li:eq(2) > a').text('창고');
		$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Dead citizen')").replaceText('Dead citizen','사망');
		$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Temporary banned')").replaceText('Temporary banned','일정기간 밴');
		$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Permanent banned')").replaceText('Permanent banned','영구 밴');
		$('.citizen_profile_header.auth > .citizen_actions > a.action_friend.tip').attr('title','친구 초대');
		$('.citizen_profile_header.auth > .citizen_actions > a.action_friend_remove.tip').attr('title','친구 삭제');
		$('.citizen_profile_header.auth > .citizen_actions > a.action_message.tip').attr('title','메일');
		$('.citizen_profile_header.auth > .citizen_actions > a.action_donate.tip').attr('title','기부하기');
		$('.citizen_profile_header.auth > .citizen_status > div > small').text('경험치');
		// profile sidebar
		$('.citizen_sidebar > div > small:eq(0)').html('소재지 <a href="http://www.erepublik.com/en/citizen/change-residence" title="">(이동)</a>');
		$('.citizen_sidebar > div > small:eq(1)').html('국적 <a href="http://www.erepublik.com/en/citizenship" title="">(변경)</a>');
		$('.citizen_sidebar > div > .citizen_second > small:eq(0)').text('eRepublik 생일');
		$('.citizen_sidebar > div > .citizen_second > small:eq(1) > a').replaceText('National rank','국내 순위');
		$('.citizen_sidebar > .citizen_activity > div.place:eq(0) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_political_activity.png">무소속');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Party Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_member.png">당원');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Party President')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_president.png">당대표');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Congress Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/congress_member.png">국회의원');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Country President')").html('<img src="http://www.erepublik.com/images/modules/_icons/country_president.png">대통령');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Far-left Wing')").text('좌익');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center-left Wing')").text('중도 좌파');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center Wing')").text('중도 정당');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center-right Wing')").text('중도 우파');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Far-right Wing')").text('우익');
		$('.citizen_sidebar > .citizen_activity > div.place:eq(1) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_mu.png">부대원이 아닙니다');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Recruit')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">신병');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">부대원');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Captain')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">부대장');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('2nd Commander')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">부대 부사령관');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Commander')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">부대 사령관');
		if ($('.citizen_sidebar > .citizen_activity > div.place:eq(2) > h3.noactivity > a').length==1) {
			$('.citizen_sidebar > .citizen_activity > div.place:eq(2) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_media_activity.png"><a href="http://www.erepublik.com/en/create-newspaper">신문 창간하기</a>');
		} else {
			$('.citizen_sidebar > .citizen_activity > div.place:eq(2) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_media_activity.png">신문 창간하기');};
		$(".citizen_sidebar > .citizen_activity > div.place:eq(2) > h3:contains('Press director')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png">신문사 사장');
		$(".citizen_sidebar > .citizen_activity > div.place:eq(2) > h3:contains('Create newspaper')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png"><a href="/en/create-newspaper">신문 창간하기</a>');
		$('.citizen_sidebar > .citizen_activity > h4.friends_title').replaceText('Friends','친구 ');
		$('.citizen_sidebar > .citizen_activity > a.view_friends').text('전부 보기');
		// profile content
		var cizName = $(".citizen_profile_header > h2").text();
		$('.citizen_content > .my_land_profile > p > strong').text(cizName+'의 건물:');
		$('.citizen_content > .my_land_profile > p').replaceText('buildings','건물');
		$('.citizen_content > .my_land_profile > a > span').text("입력");
		$('.citizen_content > h3.mbot2:eq(0)').html('<br><br><br><br><br>자기소개');
		$('.citizen_content > h3.mbot2:eq(1)').html('<br><br><br><br><br>성취');
		// achievment
		$("ul#achievment > li:eq(0) > .hinter > span > p:eq(0) > strong").text("성실한 노동 메달");
		$("ul#achievment > li:eq(0) > .hinter > span > p:eq(1)").text(" 30일간 일 했습니다.");
		$("ul#achievment > li:eq(1) > .hinter > span > p:eq(0) > strong").text("국회의원 메달");
		$("ul#achievment > li:eq(1) > .hinter > span > p:eq(1)").text("국회의원 선거에서 당선되었습니다.");
		$("ul#achievment > li:eq(2) > .hinter > span > p:eq(0) > strong").text("대통령 메달");
		$("ul#achievment > li:eq(2) > .hinter > span > p:eq(1)").text("대통령 선거에서 당선되었습니다");
		$("ul#achievment > li:eq(3) > .hinter > span > p:eq(0) > strong").text("언론인");
		$("ul#achievment > li:eq(3) > .hinter > span > p:eq(1)").text("구독자 1000명을 달성하세요.");
		$("ul#achievment > li:eq(4) > .hinter > span > p:eq(0) > strong").text("전투 영웅");
		$("ul#achievment > li:eq(4) > .hinter > span > p:eq(1)").text("한 전투에서 가장 높은 영향력을 달성하세요");
		$("ul#achievment > li:eq(5) > .hinter > span > p:eq(0) > strong").text("전쟁 영웅");
		$("ul#achievment > li:eq(5) > .hinter > span > p:eq(1)").text("한 전쟁에서 가장 높은 영향력을 달성하세요");
		$("ul#achievment > li:eq(6) > .hinter > span > p:eq(0) > strong").text("저항전쟁 영웅");
		$("ul#achievment > li:eq(6) > .hinter > span > p:eq(1)").text("저항전쟁을 통해 지역을 해방시키세요");
		$("ul#achievment > li:eq(7) > .hinter > span > p:eq(0) > strong").text("강력한 병사");
		$("ul#achievment > li:eq(7) > .hinter > span > p:eq(1)").text("힘을 250 상승시키세요");
		$("ul#achievment > li:eq(8) > .hinter > span > p:eq(0) > strong").text("사회 건설");
		$("ul#achievment > li:eq(8) > .hinter > span > p:eq(1)").text("10명의 친구를 이리퍼블릭에 초대하고 레벨 10까지 키우도록 도와주세요");
		$("ul#achievment > li:eq(9) > .hinter > span > p:eq(0) > strong").text("용병 메달");
		$("ul#achievment > li:eq(9) > .hinter > span > p:eq(1)").text("50개의 나라를 위해 각 25명의 적군을 물리치세요");
		$("ul#achievment > li:eq(10) > .hinter > span > p:eq(0) > strong").text("최고의 전사 메달");
		$("ul#achievment > li:eq(10) > .hinter > span > p:eq(1)").replaceText("Have one of the highest daily influences in eRepublik for 30 different days.","총 30일간 전세계 하루 영향력 100위 안에 진입하세요.");
		$("ul#achievment > li:eq(10) > .hinter > span > p:eq(1) > b > a").replaceText('Top Fighters','최고의 전사 메달');
		
		// military skill
		$(".citizen_content > h3:contains('Military Skills')").html('<br><br><br><br><br>전투 기술');
		$('.citizen_content > .citizen_military:eq(0) > strong:first').text('힘');
		$('.citizen_content > .citizen_military:eq(0) > div > small:first').replaceText('Super soldier:','강력한 병사:');
		$('.citizen_content > .citizen_military:eq(1) > strong:first').text('계급');
		$('.citizen_content > .citizen_military:eq(1) > div > small:first').text('계급 점수:');
		if (document.location.toString().indexOf("/economy/")!==-1) {
			if (document.location.toString().indexOf("/donate-")!==-1) {
				// donate tab
				$('.citizen_content > div > h2.special.padded').replaceText('Donate','기부');
				$('.citizen_content > div > h2.special.padded > img#donate_tip').attr('title','음식이나 무기만 기부 가능합니다.');
				$('.citizen_content > div > ul.tabs > li#topratedtab > a > span').text('소지품');
				$('.citizen_content > div > ul.tabs > li#latesttab > a > span').text('돈');
				$(".citizen_content > div > .donate_form > table > tbody > tr > th:contains('Your storage')").text('당신의 창고');
				$(".citizen_content > div > table > tbody > tr > th:contains('Your account')").text('당신의 화폐');
				$(".citizen_content input[value='Donate']").attr('value','기부');
//			} else if (document.location.toString().indexOf("/citizen-accounts/")!==-1) {
			} else {
				// account money tab
				$(".citizen_content > a.fluid_blue_light_small > span:contains('Exchange currencies')").text('환전');
				$("table.info_message > tbody > tr > td:exact('Local currency accounts with a value less than 1 are not displayed.')").text('지역 화폐를 1 이하로 보유할 경우 표시되지 않습니다..');
				$('div#allaccounts > div:first > a.f_light_blue_small > span').text('금 구입');
			};
		} else if (document.location.toString().indexOf("/citizen-friends/")!==-1) {
			// friend tab
			$("table.warning_message > tbody > tr > td:contains('Only your first 2000 friends will see your wall posts.')").text('첫 2000명의 친구들만 당신의 피드를 볼 수 있습니다..');
			$("table.success_message > tbody > tr > td:contains('Your friendship request has been sent.')").text('친구 요청을 보냈습니다.');
			$('div#friends_tab_content div.dead').text('죽음');
		} else if (document.location.toString().indexOf("/change-residence")!==-1) {
			// change-residence tab
			$("table.warning_message > tbody > tr > td:exact('You can now change location without using a moving ticket.')").text('당신은 이동권이 없어도 지역을 이동할 수 있습니다.');
			$('.citizen_sidebar > div > .citizen_second > small:eq(2)').replaceText('Forfeit points','몰수 포인트');
			$('.citizen_content > h2.special').text('지역 변경');
			$('.citizen_content > .current_location > h4').text('현재 위치');
			$('.citizen_content > form > .new__location > h4').text('새 위치');
			$('.citizen_content > form > .new__location > #selects > small:eq(0)').replaceText('Moving distance:','이동 거리:　');
			$('.citizen_content > form > .new__location > #selects > small:eq(1)').replaceText('Travelling cost:','이동 비용:　');
			$('.citizen_content > form > a#move > span').text('이동');
		} else if (document.location.toString().indexOf("/change-password")!==-1) {
			// change password tab
			$('.citizen_sidebar > div > .citizen_second > small:eq(2)').replaceText('Forfeit points','몰수 포인트');
			$('.citizen_content > .holder > h2.special.borderedsep').text('비밀번호 변경');
			$("form.changepassword span.fieldname.goleft:contains('Current password')").text('현재 비밀번호');
			$('form.changepassword span#error_for_citizen_password_twin.twin-small').text('당신의 이전 비밀번호를 입력하세요.')
			$("form.changepassword span.fieldname.goleft:exact('New password')").text('새 비밀번호');
			$("form.changepassword span.fieldname.goleft:exact('New password again')").text('새 비밀번호 확인');
			$('form.changepassword > div > input.arrowbutton').attr('value','변경 사항 확인');
		} else if (document.location.toString().indexOf("/edit/profile")!==-1) {
			// editor tab
			$('.citizen_content > .holder > h2.special.borderedsep').text('개인정보 수정');
			$("form.editprofile span.fieldname.goleft:contains('Your description')").text('나에 대해');
			$("form.editprofile span.fieldname.goleft:contains('Citizen Avatar')").text('아바타');
			$('form.editprofile span#error_for_citizen_file_twin.twin-small').html('<strong>jpeg</strong> 형식의 파일만 사용할 수 있습니다.');
			$("form.editprofile span.fieldname.goleft:contains('Your birthday')").text('탄생일');
			$("form.editprofile span.fieldname.goleft:contains('Your email here')").text('이메일 주소');
			$('form.editprofile span#error_for_citizen_email_twin.twin-small').text('이메일 주소를 확인하고, 잘못된 이메일을 기입하지 마세요..');
			$("form.editprofile span.fieldname.goleft:contains('Your password')").text('당신의 비밀번호');
			$('form.editprofile span#error_for_password_twin.twin-small').text('개인정보의 변화시키려 한다면, 비밀번호를 기입하세요.');
			$('form.editprofile > .largepadded > input.arrowbutton').attr('value','확인');
			$('.citizen_content > div > a.dotted.change_password').text('비밀번호 변경');
		};
	};
	if (document.location.toString().indexOf("/citizenship")!==-1) {
		$('h1').css('font-family','Arial,Arial');
		// citizenship request
		$('h1:first').text('시민권 신청');
		$("table.info_message > tbody > tr > td:contains('You are not be able to request a new citizenship while being a congress member')").text('국회의원이면, 다른 시민권을 신청할 수 없습니다.');
		$("table.info_message > tbody > tr > td:contains('You are not be able to request a new citizenship while being a party member')").text('어떠한 정당의 소속원이면, 다른 시민권을 신청할 수 없습니다.');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 환전 www.erepublik.com/en/exchange
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/exchange")!==-1) {
		$('h1').css('font-family','Arial,Arial');
		$("h1:contains('Monetary Market')").text('통화시장');
	//	$("a#buy_selector > span").text('구입'); NOTE: NOT TOO SURE, IT WORKS FOR A BIT, BUT CHANGED BACK
	//	$("a#sell_selector > span").text('판매');
	//	$('table#table_list_offers > tbody > tr:first > th:eq(0)').text('제안자');
	//	$('table#table_list_offers > tbody > tr:first > th:eq(1)').text('수량');
	//	$('table#table_list_offers > tbody > tr:first > th:eq(2)').text('환율');
	//	$('table#table_list_offers > tbody > tr:first > th:eq(3)').text('구입 수량');
  //  $('table.offers > tbody > tr > th:eq(0)').replaceText('Provider','Hello');
		
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 창고 www.erepublik.com/en/economy/inventory
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/economy/inventory")!==-1) {
		$('#inventory_overview span').css('font-family','Arial,Arial');
		$('#inventory_overview > a > strong').css('font-family','Arial,Arial');
		// storage
		$('#inventory_overview > h2:first > span').text('개인창고');
		$('#inventory_overview > h2:first > img.storage_tooltip').attr('title','창고 크기를 늘리고 싶다면, 새 땅에 창고시설을 확장하세요.');
		$('#inventory_overview > .items_holder > h4:eq(0)').text('생산물');
		$('#inventory_overview > .items_holder > h4:eq(1)').text('원자재');
		$('#inventory_overview > .items_holder > h4:eq(2)').text('수집품');
		$(".collection_list > ul > li:[title='Barrel']").attr('title','총신');
		$(".collection_list > ul > li:[title='Scope']").attr('title','조준경');
		$(".collection_list > ul > li:[title='M6A3 Rocket']").attr('title','M6A3 로켓');
		$(".collection_list > ul > li:[title='Trigger Kit']").attr('title','방아쇠');
		$(".collection_list > ul > li:[title='Stock']").attr('title','개머리판');
		$(".collection_list > ul > li:[title='Hammer']").attr('title','망치');
		$(".collection_list > ul > li:[title='Pliers']").attr('title','펜치');
		$(".collection_list > ul > li:[title='Saw']").attr('title','톱');
		$(".collection_list > ul > li:[title='Shovel']").attr('title','삽');
		$(".collection_list > ul > li:[title='Tape Measure']").attr('title','줄자');
		$('.collection_list > a.assemble').text('줄자');
		$('.collection_list > a.assemble').attr('title','줄자');
		$('.collection_list > .bazooka > .details > strong').html('Bazooka 바주카'+
			'<img src="http://www.erepublik.com/images/modules/storage/info.png" alt="" class="storage_tooltip" original-title="당신은 전투 페이지에서 부품을 찾을 수 있습니다. 그리고 전투에서 무작위 확률로 획득할 수 있습니다.">');
		$('.collection_list > .bazooka > .details > small').text('한번에 적을 사살한다');
		$('.collection_list > .bazooka > .details > p:eq(0)').attr('title','내구도');
		$('.collection_list > .bazooka > .details > p:eq(1)').attr('title','공격력');
		$('.collection_list > .bazooka > .details > p:eq(1) > span').text('1회당 10000');
		$('.collection_list > .toolbox > .details > strong').html('도구상자'+
			'<img src="http://www.erepublik.com/images/modules/storage/info.png" alt="" class="storage_tooltip" original-title="당신은 영지에서 부품을 찾을 수 있습니다. 그리고 노동을 해서 무작위 확률로 획득할 수 있습니다.">');
		$('.collection_list > .toolbox > .details > small').text('원자재 수집의 양이 2배로 증가합니다');
		$('.collection_list > .toolbox > .details > p:eq(0)').attr('title','내구도');
		// control module
		$('#inventory_overview > a.inventory_sell > strong').text('판매');
		$('#inventory_overview > a.inventory_sell > small').text('새로운 조건으로 판매');
		$('#inventory_overview > a.inventory_buy > strong').text('구입');
		$('#inventory_overview > a.inventory_buy > small').text('시장에서 구입');
		$('#sell_offers th.offers_product > strong').text('생산품');
		$('#sell_offers th.offers_quantity > strong').text('품질');
		$('#sell_offers th.offers_price > .relative > strong').text('가격 / 단위');
		$('#sell_offers th.offers_market > .relative > strong').text('시장');
		$('#sell_offers th.offers_market > .relative > small > a#buy_license').text('수출 라이센스 구매');
		$('#sell_offers th.offers_action > a > span').text('확인');
		$('#sell_offers a.delete_offer').attr('title','취소');
		$('.buy_market_shell > a#buy_market_license > span').text('라이센스 구입');
		$('.buy_market_shell > a#select_buy_license_country > span#buy_license_country_name').text('국가를 선택하세요.');	
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 전쟁 www.erepublik.com/en/wars/ PROBABLY OBSELETED
	//   - 목록 www.erepublik.com/en/wars/show/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/wars/")!==-1) {
		$('h1').css('font-family','Arial,Arial');
		$('h2').css('font-family','Arial,Arial');
		// war
		$('h1:first').text('전쟁');
		$('#war_type_filter > div > .core > div > h2.goleft.big:first').text('전쟁 유형을 선택하세요.');
		$('#war_type_filter > div > .core > ul:eq(0) > li > a').html('<img src="/images/parts/icon_warlist_war.gif" class="flag" alt="">정복 전쟁');
		$('#war_type_filter > div > .core > ul:eq(1) > li > a').html('<img src="/images/parts/icon_warlist_resistancewar.gif" class="flag" alt="">저항 전쟁');
		$('#war_type_filter > div > .core > ul:eq(2) > li > a').html('<img src="/images/parts/icon_warlist_allwars.gif" class="flag" alt="">모든 전쟁');
		$('#war_status_filter > div > .core > div > h2.goleft.big:first').text('전쟁 상태를 선택하세요.');
		$('#war_status_filter > div > .core > ul:eq(0) > li > a').html('<img src="/images/parts/icon_warlist_active.gif" class="flag" alt="">진행');
		$('#war_status_filter > div > .core > ul:eq(1) > li > a').html('<img src="/images/parts/icon_warlist_inactive.gif" class="flag" alt="">종료');
		$('#war_status_filter > div > .core > ul:eq(2) > li > a').html('<img src="/images/parts/icon_warlist_allstates.gif" class="flag" alt="">전부');
		$('#war_country_filter > div > .core > div > h2.goleft.big:first').text('전쟁 국가를 선택하세요');
		$.each( $(".warholder > .attacker > .nameholder:contains('Resistance Force')"), function() {
			$(this).html($(this).replaceText('Resistance Force of ','').text()+'<span id="CHT">저항군</span>');});
		$('.nameholder > #CHT').css('font-family','Arial,Arial');
		$('.warholder > .attacker > a').replaceText('allies','동맹').replaceText('no ','동맹 없음');;
		$('.warholder > .defender > a').replaceText('allies','동맹').replaceText('no ','동맹 없음');;
		$('.warholder > .middle > a.details').text('상세');
		if (document.location.toString().indexOf("/wars/show/")!==-1) {
			// choose war and battlefiled
			var rCoun = document.title.toString().split("|")[1].split(" vs ")[0];
			var oCoun = document.title.toString().split("|")[1].split(" vs ")[1];
			$('.war_list_header > .country.left_side > div > h3.resistance').css('width','160px');
			$(".war_list_header > .country.left_side > div > h3:contains('Resistance Force')").html(rCoun+' <span id="CHT">저항군</span>');
			$('.war_list_header > .country.left_side > div > h3 > #CHT').css('font-family','Arial,Arial');
			$('.war_list_header > .country > div > a').replaceText('no allies','동맹 없음').replaceText('allies','동맹');
			$('.war_list_header > .vs > small').replaceText('Still active','활성 전투');
			$('.listing > a.reversed > span').html(oCoun+'로 진입');
			$(".listing > a.join[title='Join Resistance'] > span").text('저항군으로 진입');
			$(".listing > a.join[title='Join'] > span").text('진입');
			$('.listing > small').replaceText('started on','현재 전투가 ').append('에 시작');
			//$(".listing.done > small:contains('Conquered by')").replaceText('Conquered by','佔領成功:');
			//$(".listing.done > small:contains('Secured by')").replaceText('Secured by','防守成功:');
			$("table.info_message > tbody > tr > td:contains('This war is no longer active.')").text('이 전쟁은 종료된 전투입니다');
			$("table.warning_message > tbody > tr > td:contains('is about to attack.')").replaceText('is about to attack.','는 공격에 대해서');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 전장 / 캠페인
	//   - 전장 www.erepublik.com/en/military/battlefield/
	//   - 캠페인 www.erepublik.com/en/military/campaigns
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/military/")!==-1) {
		if (document.location.toString().indexOf("/military/battlefield/")!==-1) {
			$('#pvp_header > .battle_hero.left_side').attr('title','우리측의 전투영웅');
			$('#pvp_header > .domination > .domibar > #left_points').attr('title','우리측의 전투점수');
			$('#pvp_header > .domination > .domibar > #right_points').attr('title','상대측의 전투점수');
			$('#pvp_header > .battle_hero.right_side').attr('title','상대측의 전투영웅');
			$.each( $("#pvp_header > .country > div > h3:contains('Resistance Force')"), function() {
				$(this).html($(this).replaceText('Resistance Force Of ','').text()+' <span id="CHT">저항군</span>');});
			$('#pvp_header > .country > div > h3 > #CHT').css('font-family','Arial,Arial');
			$('#pvp_header > .country > div > a').replaceText('no allies','동맹 없음').replaceText('allies','동맹');
			$('#pvp_battle_area > table.damage_aligner > tbody > tr > td > #total_damage').attr('title','이번 라운드의 총 데미지');
			$('#pvp_battle_area > table.damage_aligner > tbody > tr > td > #total_damage > small').text('이번 라운드의 총 데미지');
			$('#pvp_battle_area > .player.left_side > a#change_weapon').attr('title','무기 변경');
//			$('#pvp_actions > .action_holder > a#heal_btn').attr('title','음식을 먹으세요');
			$('#pvp_actions > .action_holder > a#fight_btn').text('전투');
			$('#pvp_actions > .action_holder > a#fight_btn').attr('title','전투!');
			$('#pvp > a#go_stats.battle_stats_button').attr('title','전투 통계');
			$('#pvp > a.help_button').attr('title','도움말');
			$('.battle_stats > .top > h3:first').text('캠페인 통계치');
			$('.battle_stats > .repeat > .content > .lister > .head > .one').text('전투 참가자');
			$('.battle_stats > .repeat > .content > .lister > .head > .two').text('사살');
			$('.battle_stats > .repeat > .content > .lister > .head > .three').text('총 데미지');
			// defeated-pop-box
			$('#enemy_defeated > .heading > h2').text('사살 수');
			$('#enemy_defeated > .content > div:eq(0) > strong').text('전쟁 데미지');
			$('#enemy_defeated > .content > div#natural_enemy_bonus > strong').text('주적 설정 보너스');
			$('#enemy_defeated > .content > div:eq(2) > strong').text('계급 점수');
			$('#enemy_defeated > .content > div:eq(3) > strong').text('경험치');
			$('#enemy_defeated > a#add_damage_btn').text('영향력(데미지) 추가');
			// rank-up-pop-box
			$('#rank_up > .heading > p').text('축하합니다. 당신은 진급하였습니다. 당신의 새로운 계급: ');
			$('#rank_up > .content > div:eq(0) > strong').text('승진 보너스');
			$('#rank_up > .content > div:eq(1) > strong').text('+1 에너지바');
			$('#rank_up > a#add_rank_btn').text('수집');
			// other-box
			$('#battle_loader > a.green_go').replaceText('Next battle','다음 전투');
			$('#battle_end > a.green_go').text('다른 캠페인 찾기');
			$('#collection_complete.bazooka_pop > strong').text('축하합니다. 당신은 바주카를 조합할 수 있습니다!');
			$("#collection_complete.bazooka_pop > a[title='Build your Bazooka']").text('조합');
			$("#timer > div > strong:contains('Are you')").text('자리에 있습니까?');
			$("#timer > div > a > span:contains('still here')").text('자리에 있습니다');
			// change location
			$('#options_box > p.info').text('이 전투가 있는 나라나 전투에 연루된 나라와 동맹을 맺은 나라로 이동해야 합니다. 지금 이동 하시겠습니까?');
			$('#options_box > a#change_location.fluid_blue_dark > span').text('지역 변경');
			$('#options_box > a#nope.plain').text('괜찮아요.');
		} else if (document.location.toString().indexOf("/military/campaigns")!==-1) {
			$('h1').css('font-family','Arial,Arial');
			// Military campaigns list
			$('h1:first').text('캠페인 리스트');
			$("#battle_listing > h4:exact('Campaign of the day')").text('오늘의 캠페인');
			$("#battle_listing > h4:contains('Campaigns')").text(''+$("#battle_listing > h4:contains('Campaigns')").replaceText('Campaigns',' 캠페인').text());
			$("#battle_listing > p.campaigns_header.allies.toggled:contains('Allies')").html('<span class="arrow"></span>동맹국의 캠페인');
			$("#battle_listing > p.campaigns_header.allbattles.toggled:contains('All')").html('<span class="arrow"></span>모든 캠페인');
			$('#battle_listing a.victory_flag').text('승리');
			$("#battle_listing span:contains('Fight')").text('전투');
			$("#battle_listing span:contains('Victory')").text('승리');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 뉴스 www.erepublik.com/en/news
	// 인구 www.erepublik.com/en/news/rated/all/
	// 최근 www.erepublik.com/en/news/latest/all/
	// 구독 www.erepublik.com/en/news/subscriptions
	// 국제 www.erepublik.com/en/news/international
	// 사건 www.erepublik.com/en/news/military
	//   - 기사 www.erepublik.com/en/article/
	//   - 신문 www.erepublik.com/en/newspaper/
	//   - 작성 www.erepublik.com/en/create-newspaper
	//   - 수정 www.erepublik.com/en/edit-newspaper/
	//   - 기사 수정 www.erepublik.com/en/edit-article/
	//   - 기사 작성 www.erepublik.com/en/write-article
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/news/")!==-1) {
		$('body#media h1').css('font-family','Arial,Arial');
		$('body#media h2').css('font-family','Arial,Arial');
		// news area
		$("h1:first:exact(' News')").text('뉴스 유형');
		$("h1:first:exact('First steps in eRepublik News')").text('뉴스 - 기초&복지');
		$("h1:first:exact('Battle orders News')").text('뉴스 - 전투&명령');
		$("h1:first:exact('Warfare analysis News')").text('뉴스 - 국방&외교');
		$("h1:first:exact('Political debates and analysis News')").text('뉴스 - 정치&국회');
		$("h1:first:exact('Financial business News')").text('뉴스 - 경제&금융');
		$("h1:first:exact('Social interactions and entertainment News')").text('뉴스 - 사회&오락');
		$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(0) > a').attr('title','기초&복지');
		$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(1) > a').attr('title','전투&명령');
		$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(2) > a').attr('title','국방&외교');
		$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(3) > a').attr('title','정치&국회');
		$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(4) > a').attr('title','경제&금융');
		$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(5) > a').attr('title','사회&오락');
		$('#filters > .rightfilters > .core > .your_subs').html('</br>당신은 신문 <strong>'+$("#filters > .rightfilters > .core > .your_subs > strong").text()+'</strong>만큼 구독 중<a href="javascript:;" class="fluid_blue_dark" onclick="$j(\'.asubs\').toggle();" title=""><span>변경</span></a>');
		$('#filters > .rightfilters > .asubs > .acontrols > a.aselectall').text('모두 선택');
		$('#filters > .rightfilters > .asubs > .acontrols > a#unsubscribeAction > span').text('구독 해제');
		$('#domain_selector_holder > div > .core > div > div > h2.goleft.big:first').text('뉴스 유형을 선택하세요.');
		$('#domain_selector_holder > div > .core > ul > .last:eq(0)').html('<a href=\"/en/news/rated/all/Republic-of-China-Taiwan/1\"><img class="icon" src="/images/parts/icon_media_toprated.gif" alt="Icon_media_toprated"> 인기 뉴스</a>');
		$('#domain_selector_holder > div > .core > ul > .last:eq(1)').html('<a href=\"/en/news/latest/all/Republic-of-China-Taiwan/1\"><img class="icon" src="/images/parts/icon_media_latest.gif" alt="Icon_media_latest"> 최근 뉴스</a>');
		$('#domain_selector_holder > div > .core > ul > .last:eq(2)').html('<a href=\"http://www.erepublik.com/en/news/military\"><img class="icon" src="/images/parts/icon_media_military.gif" alt="Icon_media_military"> 최근 사건</a>');
		$('#domain_selector_holder > div > .core > ul > .last:eq(3)').html('<a href=\"http://www.erepublik.com/en/news/international\"><img class="icon" src="/images/parts/icon_media_international.gif" alt="Icon_media_international"> 세계 뉴스</a>');
		$('#domain_selector_holder > div > .core > ul > .last:eq(4)').html('<a href=\"http://www.erepublik.com/en/news/subscriptions\"><img class="icon" src="/images/parts/icon_media_subscriptions.gif" alt="Icon_media_subscriptions"> 구독 뉴스</a>');
		$('#country_holder > div > .core > div > div > h2.goleft.big:first').text('국가 선택');
		// catalog link
		$("a:contains('First steps in eRepublik')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_1.png"> 기초&복지');
		$("a:contains('Battle orders')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_2.png"> 전투&명령');
		$("a:contains('Warfare analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_3.png"> 국방&외교');
		$("a:contains('Political debates and analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_4.png"> 정치&국회');
		$("a:contains('Financial business')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 경제&금융');
		$("a:contains('Social interactions and entertainment')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 사회&오락');
	} else if ((document.location.toString().indexOf("/article/")!==-1) || (document.location.toString().indexOf("/newspaper/")!==-1)) {
		// newspaper, article
		$('body#newspaper > #container > #content > h2.new_spaper_section').text('우리 신문');
		$('.profilemenu > li > a.houdini.subscribeToNewspaper').text('구독');
		$('.profilemenu > li > a.houdini.unsubscribeFromNewspaper').text('구독 취소');
		$(".profilemenu > li > a:exact('Write article')").text('신규 기사 읽기');
		$(".profilemenu > li > a:exact('Edit newspaper details')").text('기사 수정');		
		// catalog link
		$("a:contains('First steps in eRepublik')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_1.png"> 기초&복지');
		$("a:contains('Battle orders')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_2.png"> 전투&명령');
		$("a:contains('Warfare analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_3.png"> 국방&외교');
		$("a:contains('Political debates and analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_4.png"> 정치&국회');
		$("a:contains('Financial business')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 경제&금융');
		$("a:contains('Social interactions and entertainment')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> 사회&오락');
		// other link
		$('a#comments_button_on > span').replaceText('Comments','기사 댓글');
		$('#subscribe_comments > form > .submitpost-start > .submitpost-core > p.padded').text('당신의 댓글');
		$("#subscribe_comments > form > .submitpost-start > .submitpost-core > input.submit[name='commit']").attr('value','신규 댓글');
		$('a.report.new_spaper').text('신문 신고');
		$('a.report.articlereport').text('기사 신고');
		$('a.shower.report.commentswitch').text('댓글들 신고');
		$('a.report.onz.commentcontent').text('댓글 신고');
		$('span.vroundbtnh25-start > span.vroundbtnh25-end > a.vroundbtnh25-core').text('수정');
		$('span.vroundbtnh25_red-start > span.vroundbtnh25_red-end > a.vroundbtnh25_red-core').text('삭제');
	} else if (document.location.toString().indexOf("/create-newspaper")!==-1) {
		$('h1').css('font-family','Arial,Arial');
		$('h2').css('font-family','Arial,Arial');
		$('.fieldname').css('font-family','Arial,Arial');
		// create newspaper
		$('.holder > h1:first').text('창간');
		$('.holder > a.wikiicon.largepadded').text('도움말');
		$('.accountinfo.largepadded > .accountdisplay > span.rightpadded:first').text('당신의 계정');
		$(".holder > h2:first:contains('Requirements')").text('요구');
		$(".holder > .smallhoderleft.goleft > p:contains('Level')").text('레벨');
		$(".holder > .smallhoderleft.goleft > p:contains('Cost')").text('비용');
		$('.holder > .smallholderright.goleft > a.btnGetGold').text('금 구입');
		$(".holder > h2.section:contains('Newspaper details')").text('신문 세부사항');
		$('form.companydetails > p.largepadded:eq(0) > span.fieldname').text('신문 이름');
		$('form.companydetails > p.largepadded:eq(0) > span#error_for_newspaper_name_twin').text('6-25자 이내.');
		$('form.companydetails > p.largepadded:eq(1) > span.fieldname').text('신문 로고');
		$('form.companydetails > p.largepadded:eq(1) > span.goleft > span#error_for_newspaper_image_twin').text('JPG 형식만 가능.');
		$("form.companydetails > .buttonalign > input.arrowbutton[name='commit']").attr('value','창간 확인');
	} else if (document.location.toString().indexOf("/edit-newspaper/")!==-1) {
		$('.fieldname').css('font-family','Arial,Arial');
		// edit newspaper
		$(".profilemenu > li > a:exact('Write article')").text('신규 기사작성');
		$(".profilemenu > li > a:exact('Edit newspaper details')").text('세부사항 수정');
		$('.accountinfo > .accountdisplay > span.rightpadded').text('당신의 계정');
		$("form.companydetails > .largepadded > .fieldname:contains('Newspaper name')").text('신문 이름');
		$('form.companydetails > .largepadded > span#error_for_newspaper_name_twin').text('6-25자 이내.');
		$("form.companydetails > .largepadded > .fieldname:contains('Description')").text('이 신문에 대해서');
		$("form.companydetails > .largepadded > .fieldname:contains('Location')").text('위치');
		$('form.companydetails > .largepadded > span#error_for_country_list_twin').text('신문의 위치를 변경하려면, 그 나라의 시민권을 획득해야만 가능합니다.');
		$("form.companydetails > .largepadded > .fieldname:contains('Newspaper logo')").text('신문 로고');
		$('form.companydetails > .largepadded > span.goleft > span#error_for_newspaper_image_twin').text('JPG 형식만 허용됩니다.');
		$("form.companydetails > .largepadded > .fieldname:contains('Cost')").text('비용');
		$('form.companydetails > .largepadded > span.accountdisplay > a.btnGetGold').text('금 구매');
		$("form.companydetails > .buttonalign > input.arrowbutton[name='commit']").attr('value','변경 확인');
	} else if ((document.location.toString().indexOf("/edit-article/")!==-1) ||(document.location.toString().indexOf("/write-article")!==-1)) {
		$('h2').css('font-family','Arial,Arial');
		$('.smallpadded').css('font-family','Arial,Arial');
		// edit, write article
		$(".profilemenu > li > a:exact('Write article')").text('기사 작성');
		$(".profilemenu > li > a:exact('Edit newspaper details')").text('세부사항 수정');
		$(".holder > .bordersep > h2.goleft:contains('Edit article')").text('기사 수정');
		$(".holder > .bordersep > h2.goleft:contains('Write article')").text('기사 작성');
		$(".holder > .bordersep > a.btn-arrow-left.goright:exact('Back')").text('되돌리기');
		$("form.writearticle > .inputholder > .smallpadded:contains('Title')").text('기사 제목');
		$('form.writearticle > .inputholder > span#error_for_article_name_twin').text('1-80자 이내');
		$("form.writearticle > .inputholder > .smallpadded:contains('Article')").text('기사');
		$("table.info_message > tbody > tr > td:contains('By choosing a category which')").text('기사가 해당 되는 유형을 골라주세요. 독자가 관심 있는 글을 찾는데 도움이 될 것 입니다.');
		$("form.writearticle > .inputholder > div.smallpadded:contains('Category')").text('기사 유형');
		$("form.writearticle > .inputholder > select#article_category > option[value='0']").text('선택하세요');
		$("form.writearticle > .inputholder > select#article_category > option[value='1']").text('- 기초&복지');
		$("form.writearticle > .inputholder > select#article_category > option[value='2']").text('- 전투&명령');
		$("form.writearticle > .inputholder > select#article_category > option[value='3']").text('- 국방&외교');
		$("form.writearticle > .inputholder > select#article_category > option[value='4']").text('- 정치&국회');
		$("form.writearticle > .inputholder > select#article_category > option[value='5']").text('- 경제&금융');
		$("form.writearticle > .inputholder > select#article_category > option[value='6']").text('- 사회&오락');
		$("form.writearticle > div > input.arrowbutton[value='Publish']").attr('value','발행');
		$("form.writearticle > div > input.arrowbutton[value='Edit']").attr('value','수정');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 정당 www.erepublik.com/en/party/
	// 당원 목록 www.erepublik.com/en/party-members/
	// 당대표 후보 www.erepublik.com/en/party-candidates/
	// 국회의원 후보 www.erepublik.com/en/propose-congressman/
	// 대통령 후보 www.erepublik.com/en/presidential-candidates/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/party/")!==-1) {
		$('h2').css('font-family','Arial,Arial');
		// party
		$("h2.section:contains('Info')").text('정당 정보');
		$(".infoholder > .largepadded > span.field:exact('Members')").text('당원');
		$(".infoholder > .largepadded > span.field:exact('Orientation')").text('정치 성향');
		$('.infoholder > .largepadded > span.goleft').replaceText('Far-Left','좌익').replaceText('Center-Left','중도 좌파').replaceText('Center','중도').replaceText('Center-Right','중도 우파').replaceText('Far-Right','우익').replaceText('Libertarian','자유주의자').replaceText('Totalitarian','전체주의의').replaceText('Authoritarian','권위주의의').replaceText('Anarchist','무정부 주의자');
		$("h2.section:contains('Elections')").text('선거');
		$('.indent > .bordersep:eq(0) > h2.section').html('<img title="당대표는 각 달의 15일에 선거를 통하여 결정합니다." class="icon padded tooltip" src="/images/parts/icon_position_politics_partypresident.gif" alt="Icon_position_politics_partypresident">당대표 선거');
		$(".infoholder > p.smallholder:contains('Party President')").text('당대표');
		var pp_1 = $(".indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first > .special:eq(0)").text();
		var pp_2 = $(".indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first > .special:eq(1)").text();
		$('.indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first').html('다음 선거는 <span class="special">'+pp_1+'</span> 후에 시작하며, <span class="special">'+pp_2+'</span>의 후보자가 있습니다.');
		$('.indent > .bordersep:eq(1) > h2.section').html('<img title="국회의원은 각 달의 25일에 선거를 통하여 결정합니다." class="icon padded tooltip" src="/images/parts/icon_position_politics_congressman.gif" alt="Icon_position_politics_congressman">국회의원 선거');
		var cm_1 = $('.indent > .bordersep:eq(1) > .subindent > .infoholder > .field > p > span.special:first').text();
		var cm_2 = $('.indent > .bordersep:eq(1) > .subindent > .infoholder > p > span.special:first').text();
		$('.indent > .bordersep:eq(1) > .subindent > .infoholder > .field > p:first').html('우리 정당에는 <span class="special">'+cm_1+'</span> 명의 국회의원이 있습니다 ');
		$('.indent > .bordersep:eq(1) > .subindent > .infoholder > p:first').html(', 국회의 <span class="special">'+cm_2+'</span> 의석을 보유하고 있습니다.');
		if ($('.indent > .bordersep:eq(2) > .subindent > .infoholder > p > span.special:first').length==1) {
			var cm_3 = $('.indent > .bordersep:eq(2) > .subindent > .infoholder > p > span.special:first').text();
			$('.indent > .bordersep:eq(2) > .subindent > .infoholder > p:first').html('다음 국회의원 선거는 <span class="special">'+cm_3+'</span> 후에 시작됩니다.');
		} else {
			$('.indent > .bordersep:eq(2) > .subindent > .infoholder > p:first').html('오늘은 국회의원 선거 날입니다.');
		};
		$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > h2:first').text('국회의원 선거 후보자');
		$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > .holder').replaceText('Do you agree to represent your party in the congress election in','당신은 ').replaceText('?',' 지역의 국회의원 선거에 이 정당의 이름을 표시하는 것에 동의합니까?');
		$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.padded:first').text('당신의 출마관련 게시물의 링크를 입력하세요.');
		$('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.largepadded > span:last').html('당신은 외부 웹사이트나 개인 포럼의 링크를 사용할 수 있습니다.');
		$(".indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.goright > span > span > input[value='Agree']").attr('value','동의');
		$(".indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.goright > span > span > input[value='Cancel']").attr('value','철회');
		$('.indent > h2.section').html('<img title="대통령 선거는 각 달의 5일에 시민들에 의해 결정됩니다." class="icon padded tooltip" src="/images/parts/icon_position_politics_president.gif" alt="Icon_position_politics_president">대통령 선거');
		$(".indent > .subindent:eq(0) > .bordersep > .infoholder > p.smallholder:contains('Winner')").text('대통령 선거의 우승자');
		var cp_1 = $('.indent > .subindent:eq(1) > .infoholder > p:first > span.special:first').text();
		$('.indent > .subindent:eq(1) > .infoholder > p:first').html('다음 대통령 선거는 <span class="special">'+cp_1+'</span>  후에 개최됩니다.');
		$(".indent > .subindent:eq(2) > .infoholder > p.smallholder:contains('No candidate proposed')").text('아직 정당에서 대통령 후보를 지명하지 않았습니다.');
		// control buttons
		$('a.report.party').text('정당 신고');
		$(".action a:exact('Show all members')").text('당원 목록');
		$(".action a:exact('Show results')").text('선거결과 보기');
		$(".action a:exact('Show candidate list')").text('후보자 보기');
		$(".action a:exact('Show candidates list')").text("후보자 보기");
		$(".action a:exact('Show proposed members of congress')").text('후보자 보기');
		$(".action a:contains('Join party')").text('정당 참가');
		$(".action a:contains('Resign')").text('정당 탈퇴');
		$(".action a:exact('Run for congress')").text('국회의원 후보가 되었습니다.');
		$(".action a:exact('Retire')").text('후보 철회');
		$(".action a:exact('Candidate')").text('후보 지원');
		$(".action a:exact('Vote')").text("투표");
	} else if ((document.location.toString().indexOf("/party-members/")!==-1) || (document.location.toString().indexOf("/party-candidates/")!==-1)) {
		$('h2').css('font-family','Arial,Arial');
		$('p.smallholder').css('font-family','Arial,Arial');
		// party members, candidates list
		$("h2.biggersection:contains('Party members')").text('당원 목록');
		$("h2.biggersection:contains('Party candidates')").text('당대표 후보자 목록');
		$(".indent > .bordersep > p.smallholder:contains('Party Member')").replaceText('Party Member','당원');
		$(".indent > .bordersep > p.smallholder:contains('Congress Member')").replaceText('Congress Member','국회의원');
		$(".indent > .bordersep > p.smallholder:contains('Party President')").replaceText('Party President','당대표');
		$('.holder > .indent').replaceText('No candidates applied yet','지금 후보자가 없습니다..');
		$('.holder > a.btn-arrow-left.goright').text('파티 메인 페이지');
		$('a.report.party').text('정당 신고');
	} else if (document.location.toString().indexOf("/propose-congressman/")!==-1) {
		$('h2').css('font-family','Arial,Arial');
		// party congressman list
		$("h2.biggersection:contains('Congress member candidates')").text('국회의원 후보자');
		$('.infoalert > p:eq(0)').html('<strong>1.</strong> 당원은 16~23일에 국회의원 후보에 지원할 수 있습니다.');
		$('.infoalert > p:eq(1)').html('<strong>2.</strong> 당대표는 24일에 국회의원 후보자를 최종결정 합니다.');
		$('.infoalert > p:eq(2)').html('<strong>3.</strong> 이 정당에는 각 지역에 X명의 후보를 지정할 수 있습니다.');
		$("select#region_list > option[value='0']").text('지역을 선택하세요.');
		$('.holder > .candidates > .list-title').replaceText('Official candidates','공식후보');
		$('.holder > a.btn-arrow-left.goright').text('파티 메인 페이지');
		$('a.report.party').text('정당 신고');
	} else if (document.location.toString().indexOf("/presidential-candidates/")!==-1) {
		$('h1').css('font-family','Arial,Arial');
		$('h2').css('font-family','Arial,Arial');
		$('th').css('font-family','Arial,Arial');
		// president candidates list
		$('body#elections h1:first').text('대통령 후보자 목록');
//		$(".bordersep > h2:exact('Country')").text("이 국가에 있어야 합니다.");
		$('table.elections > tbody > tr:first > th:eq(0)').text('후보자');
		$('table.elections > tbody > tr:first > th:eq(1)').text('우호정당');
		$('table.elections > tbody > tr:first > th:eq(2)').text('국가목표');
		$('table.elections > tbody > tr > td.of_goals > .goal_setter > .nogoals > small').text('목표 미설정');
		$("table.info_message > tbody > tr > td:contains('No candidates applied yet')").text('지금 후보자가 없습니다.');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	//선거 센터 www.erepublik.com/en/elections/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/elections/")!==-1) {
		$('h1').css('font-family','Arial,Arial');
		$('h2').css('font-family','Arial,Arial');
		$('th').css('font-family','Arial,Arial');
		// elections
		$('body#elections h1:first').text('선거 센터');
		$("#filters > .rightfilters > .core > .info > p.smallpadded > strong:exact('Next elections')").text('다음 선거');
		$("#filters > .rightfilters > .core > .info > p:last > strong:contains('Country President')").text('대통령');
		$("#filters > .rightfilters > .core > .info > p:last > strong:contains('Party President')").text('당대표');
		$("#filters > .rightfilters > .core > .info > p:last > strong:contains('Congress')").text('국회의원');
		$("#country_filters > .extended-menus > .core > .bordersep > h2:contains('Country')").text('국가를 선택하세요');
		$("#region_filters > .extended-menus > .core > .bordersep > h2:contains('Country')").text('지역을 선택하세요');
		$("#region_filters > .extended-menus > .core > ul:first > li:first > a[id='0__All regions']").text('모든 지역');
		$("#election_filters > .extended-menus > .core > .bordersep > h2:contains('Election')").text('선거를 선택하세요');
		$('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#president').text('대통령 선거');
		$('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#congress').text('국회의원 선거');
		$('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#party').text('당대표 선거');
		$("#party_filters > .extended-menus > .core > .bordersep > h2:contains('Parties')").text('정당을 선택하세요.');
		$("#dateSelect_filters > .extended-menus > .core > .bordersep > h2:contains('Month/Year')").text('월 / 년');
		$("body#elections h2.special:contains('Official Results')").text('선거 결과');
		// president
		$(".vote_box > .vote_box_layer > .vote_box_info > h4:contains('Goals')").text('목표');
		$('.vote_box > .vote_block > p').replaceText('votes','투표');
		$(".vote_totals > p > span:contains('Total votes')").replaceText('Total votes:','투표 수:');
		if ((document.location.toString().indexOf("election-congress")!==-1) || (document.location.toString().indexOf("election-party")!==-1)){
			// congress
			$("table.electiondetails th:contains('Official candidates')").replaceText('Official candidates','당선자');
			$("table.electiondetails th:contains('Wildcards')").replaceText('Wildcards','와일드카드');
			$("table.electiondetails th:contains('Not qualified')").replaceText('Not qualified','비당선자');
			$("table.electiondetails th:contains('Member of')").text('정당');
			$("table.electiondetails th:contains('No. of votes')").text('투표');
			$("table.electiondetails span.smalldotted:exact('Presentation')").text('소개');
			$("table.electiondetails span.smalldotted:exact('No presentation')").text('소개 없음');
			// party
			//$("table.elections th:exact('No.')").text('No.');
			$("table.elections th:contains('Candidate')").text('후보자');
			$("table.elections th:contains('No. of votes')").text('투표 수');
			$("table.elections th:contains('% of votes')").text('투표 비율');
			$("table.elections a:exact('Vote')").text('투표하다');
			// others
			$("#messagealert.infoicon > p:exact('No data available yet')").text("지금 아무 정보도 없습니다");
			var v_num = $('p.regular > span#number_of_votes').text();
			$('p.regular').html('총 투표 수: <span class="special rightpadded" id="number_of_votes">' +v_num+ '</span>');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 군대 www.erepublik.com/en/main/group-home/
	// 창설 www.erepublik.com/en/main/group-create/
	// 메인 페이지 www.erepublik.com/en/main/group-show/
	// 목록 www.erepublik.com/en/main/group-list/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/group-")!==-1) {
		$('h1').css('font-family','Arial,Arial');
		if (document.location.toString().indexOf("/group-home/")!==-1) {
			// group-home
			$('body#military_units h1:first').text('군대');
			$("table.info_message > tbody > tr > td > strong:contains('You are not a soldier of any Military Unit')").parent().html(
				'당신은 군대의 일원이 아니며, 군대에 가입하거나, 창설할 수 있습니다。<br>당신에 군대에 가입하면, 당신과 당신의 군대는 전투에서 더 효과적이고, 협동적인 전투를 수행할 수 있습니다.<br><br><a class="wicked" href="http://wiki.erepublik.com/index.php/Military_unit" target="_blank">더 많은 정보</a>');
			$('#military_units_home > .create_military_unit > table > tbody > tr > td > a > span').text('군대 창설');
			$('#military_units_home > .join_military_unit > h3:first').text('군대 지원');
		} else if (document.location.toString().indexOf("/group-create/")!==-1) {
			$('body#create h1:first').text('군대 창설');
			$("table.warning_message > tbody > tr > td:contains('The Military Unit will be located in')").text('군대 본부(HQ)는 당신의 시민권과 같은 나라에 위치하게 됩니다. <strong>참고 : 군대 창설 후에, 당신의 군대 위치는 재조정할 수 없습니다. 당신은 군대의 아바타나 설명 등을 변경할 수 있습니다.</strong>')
			$('#create_military_unit > .holder.create_company > h2:first').text('요구사항');
			$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(0) > div').replaceText('Funding Fee','요금');
			$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(1) > div').replaceText('Military Rank','군사계급');
			$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(2) > div').replaceText('Experience Level','레벨');
		} else if ((document.location.toString().indexOf("/group-show/")!==-1) || (document.location.toString().indexOf("/group-list/")!==-1)) {
			$('h3').css('font-family','Arial,Arial');
			// group-show, group-list
			$('#military_group_header > .header_content > h2:first > big').replaceText('members','부대원');
			$("#military_group_header > .header_content > .details > strong:contains('Location:')").text('위치:');
			$("#military_group_header > .header_content > .details > strong:contains('Commander:')").text('부대장:');
			$('#military_group_header > .header_content > .details > a.big_action.join > strong').text('가입');
			$("#military_group_header > .header_content > .details > a.simple > strong:contains('Resign')").text('부대 탈퇴');
			$("#military_group_header > .header_content > .details > a:contains('View rank')").text('계급 보기');
			$("#military_group_header > .header_content > .details > a.backmu").text('부대 홈페이지로 돌아가기');
			$("#group_right_column > .leader > h3:first:contains('Commander')").text('부대장');
			$("#group_right_column > .leader > h3:last:exact('Captain')").text('연대장');
			$("#group_right_column > .leader > h3:last:exact('No Captain')").text('연대장이 없습니다.');
			$('#group_right_column > .members > h3:first').replaceText('Members','부대원');
			$('#group_right_column > .members > a.show_all').text('모든 판매');
			$('#orderContainer > h3').replaceText('Order of the day','오늘의 부대명령');
			$('#orderContainer > .requirements.fight > ul.req_content > li.condition0 > .details > strong').text($('#orderContainer > .requirements.fight > ul.req_content > li.condition0 > .details > strong').text().replace('Fight for','').replace(' in ','를 위해 ')+' 지역에서 싸워주세요');
			$('#group_orders > h3:first').text('신병 임무');
			$('#group_orders > p:first').text('미션 완수로 부대의 공식 부대원이 되었습니다.');
//			$('#group_orders > .requirements > ul.req_content > li:eq(0) > .details > strong').text('獲得軍階: 中士 (Sergeant)');
			$('#group_orders > .requirements > ul.req_content > li:eq(1) > .details > strong').text('부대원이 되기 위해 25명을 사살하라');
			$('#group_orders > .requirements > ul.req_content > li:eq(2) > .details > strong').text('자국 혹은 동맹국에서 5개의 캠페인에 참가하라');
			$("#group_feeds > h3:first").text('부대 채팅');
			$('#group_feeds > #citizen_feed > .shouter > form#wall_post > textarea#shout.expand').text('당신의 부대원들에게 말하세요');
			$('#group_feeds > #citizen_feed > .shouter > form#wall_post > span.controls > a.post_button > b').text('전송');
			$("#group_feeds > #citizen_feed a[trigger='reply']").text('답변');
			$("#group_feeds > #citizen_feed span[trigger='add_comment']").text('답변 추가');
			$("#group_feeds > #citizen_feed div.fake_input").text('답변 추가...');
//			$("#group_feeds > #citizen_feed a[target='reportpopup']").text('신고');
			$("table.info_message > tbody > tr > td:contains('You must be a member of')").text('부대 채팅을 보기위해선 부대에 가입해야 합니다.');
			$("table.error_message > tbody > tr > td:contains('Sorry, you need to have the same citizenship')").text('죄송합니다. 이 부대와 같은 국적을 가져야 합니다. 당신은 다른 부대에 참여할 수 있습니다.');
			if (document.location.toString().indexOf("/group-list/")!==-1) {
				//group-list
				$('#members_holder > h3:first').text('부대원');
			};
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 나라 www.erepublik.com/en/main/country/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if ((document.location.toString().indexOf("/country")!==-1) || (document.location.toString().indexOf("/law/")!==-1)) {
		$('#filters > a.btn-filters-select.goleft').text('선택');
		$('#profileholder > p > a.vroundbtnh25-start:eq(0) > span.vroundbtnh25-end > span.vroundbtnh25-core_large').text('국고로 기부');
		$('#profileholder > p > a.vroundbtnh25-start:eq(1) > span.vroundbtnh25-end > span.vroundbtnh25-core_large').text('지도 보기');
		$(".extended-menus > .core > .bordersep > h2.goleft.big:contains('Country')").text('국가를 선택하세요.');
		$('ul.ftabs > li:eq(0) > a > span').text('국가목표');
		$('ul.ftabs > li:eq(1) > a > span').text('사회');
		$('ul.ftabs > li:eq(2) > a > span').text('경제');
		$('ul.ftabs > li:eq(3) > a > span').text('정치');
		$('ul.ftabs > li:eq(4) > a > span').text('군사');
		$('ul.ftabs > li:eq(5) > a > span').text('법안');
		$("h2:exact('Current national goals')").text("현재 국가목표");
		$("a:exact('check current status')").text("현상태 확인");
		$("p.general-text:contains('The elected president has not set any national goals for this month.')").text("대통령은 국가목표를 설정하지 않았습니다.");
		$("h2:exact('Monuments achieved')").text("기념비 달성");
		//사회
		if (document.location.toString().indexOf("/country/society/")!==-1) {
			$("h2:exact('Citizens')").text("인구");
			$("span.fakeheight:eq(0)").text("활동 국민");
			$("span.fakeheight:eq(1)").text("오늘의 신규 국민");
			$("span.fakeheight:eq(2)").text("국적 요청");
			$("span.fakeheight:eq(3)").text("국민 평균레벨");
			$("span.fakeheight:eq(4)").text("현재 온라인");
			$("span.fakeheight:eq(5)").text("국민비용");
			$("a.blue_arrow_small > span ").text("요청들 보기");
			$("a.details-small").text("세부 사항");
		};
		//경제
		if (document.location.toString().indexOf("/country/economy/")!==-1) {
			
			$("h2:exact('Country resources')").text("국가 자원");
			$("h2:exact('Treasury')").text("국고");
			$("h2:exact('Country trading embargoes')").text("무역금지");
			$("td:contains('This country can trade with any other country in eRepublik.')").text("이 나라는 이리퍼블릭의 다른 나라들과는 무역을 할 수 있습니다.");
			$("h2:exact('Taxes')").text("세금");
			$(".resource_list > thead > tr > th:eq(0)").text("자원");
			$(".resource_list > thead > tr > th:eq(1)").text("지역");
			$("td > small:exact('Not available')").text("소유하지 않음");
			$("ul.profilemenu > li > a").text("국고");		
		
			$(".resource_list > tbody > tr > td > span:exact('Fish')").text("물고기");
			$(".resource_list > tbody > tr > td > span:exact('Grain')").text("곡식");
			$(".resource_list > tbody > tr > td > span:exact('Fruits')").text("과일");
			$(".resource_list > tbody > tr > td > span:exact('Cattle')").text("가축");
			$(".resource_list > tbody > tr > td > span:exact('Deer')").text("사슴");
			$(".resource_list > tbody > tr > td > span:exact('Iron')").text("철");
			$(".resource_list > tbody > tr > td > span:exact('Saltpeter')").text("초석");
			$(".resource_list > tbody > tr > td > span:exact('Aluminum')").text("알루미늄");
			$(".resource_list > tbody > tr > td > span:exact('Oil')").text("석유");
			$(".resource_list > tbody > tr > td > span:exact('Rubber')").text("고무");
			
			$("th:exact('Income Tax')").text("소득세");
			$("th:exact('Import Tax')").text("수입세");
			$("th:exact('VAT')").text("간접세(VAT)");
			$("span.fakeheight:contains('Food')").text("음식");
			$("span.fakeheight:contains('Weapons')").text("무기");
			$("span.fakeheight:contains('House')").text("집");
			$("span.fakeheight:contains('Moving Tickets')").text("티켓");
			$("span.fakeheight:contains('Food Raw Material')").text("음식원자재");
			$("span.fakeheight:contains('Weapon Raw Material')").text("무기원자재");
			$("span.fakeheight:contains('Hospital')").text("병원");
			$("span.fakeheight:contains('Defense System')").text("방어시설");
			$("h2:exact('Salary')").text("임금");
			$("span.fakeheight:exact('Minimum')").text("최소 임금");
			$("span.fakeheight:exact('Average')").text("최대 임금");
			$("h2:exact('Info')").text("정보");
			$("h2:exact('Revenues')").text("세금 수익정보");
		};
		//선거
		if (document.location.toString().indexOf("/country/politics/")!==-1) {
			$("h2:exact('President')").text("대통령");
			$("h2:exact('Congress')").text("국회의원");
			$("span.vroundbtnh25-core:contains('Election results')").text("선거결과");
			$("span.vroundbtnh25-core:contains('Next elections')").text("다음 선거");
		};
		
		//군사
		if (document.location.toString().indexOf("/country/military/")!==-1) {
			$("table.info_message > tbody > tr > td").text("이 나라의 시민들은 주적 설정으로 10%의 영향력(데미지)을 보너스로 제공받습니다.");
			$(".nameholder:contains('No current Natural Enemy')").text("현재 주적은 없습니다")
			$("td:contains('There are no resistance wars in this country.')").text("현재 저항전쟁은 없습니다")
			var Our = $("div#profileholder > h1").text();
			$("h2.section:eq(0)").text("주적");
			$("h2.section:eq(1)").html(Our+' 진행중인 전쟁');
			$("h2.section:eq(2)").html(Our+' 진행중인 저항전쟁');
			$("h2.section:eq(3)").text("동맹국");
			
			$("a.vroundbtnh25-core:contains('details')").text("세부 사항");
			$("a.vroundbtnh25-core:contains('All wars')").text("모든 전쟁");
			$("a.vroundbtnh25-core:contains('All resistance wars')").text("모든 저항전쟁");
			$("a.vroundbtnh25-core:contains('All Alliances')").text("동맹국");
		};
		//법안
		if (document.location.toString().indexOf("/country-administration/")!==-1) {
			$("span:exact('You are not a president or a congress member in this country.')").text('당신은 이 나라의 대통령 또는 국회의원이 아닙니다.');
			$(".adminaction > .goleft > span.goleft:contains('Hello, Congress Member')").text('안녕하세요, 국회의원님');
			$(".adminaction > .goleft > span.vround-redbtn-h20-start > span.vround-redbtn-h20-end > form > .vround-redbtn-h20-core:contains('Resign')").text('사임');
			$(".adminaction > .goright:contains('Your proposals')").replaceText('Your proposals','당신의 제안');
			$(".adminaction > table > tbody > tr > td > span.vround-btn-start-xlarge > span.vround-btn-end-xlarge > input#expandLaw,input#colapseLaw").attr('value','법안 제안');
			$(".holder > h2.section:contains('Law proposals')").text('제안');
			//congressman
			$("a:exact('New Citizen Fee')").text('신규 국민비용');
			$("a:exact('Donate')").text('기부');
			$("a:exact('Issue Money')").text('화폐발행');
			$("a:exact('Taxes')").text('세율 조정');
			$("a:exact('Minimum Wage')").text('최소임금 조정');
			$("a:exact('President Impeachment')").text('대통령 탄핵');
			$("a:exact('Provide citizenship')").text('시민권 제공');
			$("a:exact('Natural Enemy')").text('주적(NE) 설정');
			//president
			$("a:exact('Alliance')").text('동맹 조약');
			$("a:exact('Peace Proposal')").text('평화 조약');
			$("a:exact('Trading Embargo')").text('무역금지 조약');
			$("a:exact('Buy Constructions')").text('건물 구입');
			$("a:exact('New Citizen Message')").text('신규 국민메시지');
			//others
			$("a:contains('Tax change')").replaceText('Tax change:','세율 조정: ');
			$("table.laws.largepadded > tbody > tr > td > span.vroundbtnh25-start > span.vroundbtnh25-end > a.vroundbtnh25-core:contains('details')").text('세부 사항');
			$("table.laws.largepadded > tbody > tr > td:exact('Pending')").replaceText('Pending','대기 중');
			$("table.laws.largepadded > tbody > tr > td:exact('Accepted')").replaceText('Accepted','통과');
			$("table.laws.largepadded > tbody > tr > td:exact('Rejected')").replaceText('Rejected','거절');
		} else if (document.location.toString().indexOf("/law/")!==-1) {
			$('h2').css('font-family','Arial,Arial');
			$('.holder > .indent > .bordersep.special').css('font-family','Arial,Arial');
			// law proposals
			$(".holder > .indent > .bordersep.special:contains('Law proposals')").text('제안');
			// donate
			$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Donate')").text('기부');
			$('.holder:eq(1) > .indent > .goleft > p.largepadded').replaceText('Proposed by','제안자:').replaceText(',',', 남은 시간:');
			$(".holder:eq(1) > .indent > p.largepadded:contains('Do you agree to transfer')").replaceText('Do you agree to transfer','').replaceText('from the country accounts to','를 ').replaceText('?',' 계좌로 송금하는 것에 동의하십니까? ');
			$(".voteyesdisable").text('예');
			$(".votenodisable").text('아니');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 신고 www.erepublik.com/en/tickets/report/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/tickets/report/")!==-1) {
		$('h3').css('font-family','Arial,Arial');
		$('div').css('font-family','Arial,Arial');
		// report ticket
		$('body.reportAbuseBody > a.btn-arrow-left-small').text('취소');
		$('body.reportAbuseBody > h3').replaceText('Report ','신고').replaceText('a newspaper','신문').replaceText('an article','기사').replaceText('a comment','답변').replaceText('a wall post','부대 채팅 답변').replaceText('a wall comment','부대 채팅 답변').replaceText('a party','정당');
		$('form.reportAbuse > div:first').html('당신은 이리퍼블릭 법률이나 약관에서 허용하지 않는 컨텐츠에 대해 신고하려고 합니다. 모든 신고는 비밀을 보장합니다.')
		$("form.reportAbuse > .reportLabel:contains('Reason for the report')").text('신고 사유:');
		$("form.reportAbuse > select#report_reason > option[value='6']").text('불쾌');
		$("form.reportAbuse > select#report_reason > option[value='7']").text('모욕');
		$("form.reportAbuse > select#report_reason > option[value='8']").text('인종차별');
		$("form.reportAbuse > select#report_reason > option[value='9']").text('포르노');
		$("form.reportAbuse > select#report_reason > option[value='10']").text('스팸');
		$("form.reportAbuse > select#report_reason > option[value='11']").text('외부광고');
		$("form.reportAbuse > select#report_reason > option[value='16']").text('과장');
		$("form.reportAbuse > .reportMessage:contains('By submitting this report')").html('당신이 이를 인정하며, 보고서를 제출합니다.</br> 노골적이거나 반복적으로 잘못된 보고서들은 귀하의 계정에 징계조치가 내려질 수 있습니다.')
		$("form.reportAbuse > .reportLabel:contains('Language in which the reported content is written')").text('보고서 내용에 사용된 언어:');
		$("form.reportAbuse > div:last > input[value='Report']").attr('value','신고');
	};
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// 'economy.erepublik.com
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
} else if (host==='economy') {
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 영지 economy.erepublik.com/en/land/overview/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/land/")!==-1) {
		$('h1').css('font-family','Arial,Arial');
		// my land
		$("h1:contains('My Land')").replaceText('My Land','나의 영지');
		$("h1:contains('Land of')").text($("h1:contains('Land of')").replaceText('Land of','').text()+'의 영지');
		$("a.plain_blue_small > span:contains('Marketplace')").text('시장');
		$("a.plain_blue_small > span:contains('+50 Health Building')").text('+50 체력 집');
		$("a.plain_blue_small > span:contains('+100 Health Building')").text('+100 체력 집');
		$("a.plain_blue_small > span:contains('Town Center')").text('타운센터');
		$("a.plain_blue_small > span:contains('Training grounds')").text('기초훈련');
		$("a.plain_blue_small > span:contains('Climbing Center')").text('암벽훈련');
		$("a.plain_blue_small > span:contains('Shooting Range')").text('사격훈련');
		$("a.plain_blue_small > span:contains('Special Forces Center')").text('특공훈련');
		$("a.plain_blue_small > span:contains('Storage (capacity: 1000)')").text('소-창고 (용량:1000)');
		$("a.plain_blue_small > span:contains('Storage (capacity: 9000)')").text('중-창고 (용량:9000)');
		$("a.plain_blue_small > span:contains('Storage (capacity: 20000)')").text('대-창고 (용량:20000)');
		// tooltips, hints
		$('a.plain.upgrade.tipser.health').attr('title','타운센터 확장');
		$('a.plain.upgrade.tipser').attr('title','공장 확장');
		$('a.plain.options.tipser').attr('title','공장 세부사항');
		$('a.plain.manage.tipser').attr('title','관리자');
		$('a.plain.resign.tipser').attr('title','사직');
		$('a.main.build > span').attr('title','건물을 건설할 수 있는 땅');
		$('a.buyLand.main.empty > span').attr('title','건물을 건설하기 위해 땅을 구입');
		$("ul.land_holder > li[title='Grain Farm']").attr('title','농장');
		$("ul.land_holder > li[title='Fruit Orchard']").attr('title','농장');
		$("ul.land_holder > li[title='Fishery']").attr('title','어장');
		$("ul.land_holder > li[title='Cattle Farm']").attr('title','목장');
		$("ul.land_holder > li[title='Hunting Lodge']").attr('title','목장');
		$("ul.land_holder > li[title='Iron Mine']").attr('title','철광 시설');
		$("ul.land_holder > li[title='Oil Rig']").attr('title','석유 시설');
		$("ul.land_holder > li[title='Aluminium Mine']").attr('title','알루미늄 시설');
		$("ul.land_holder > li[title='Saltpeter Mine']").attr('title','초석 시설');
		$("ul.land_holder > li[title='Rubber Plantation']").attr('title','고무 시설');
		$("ul.land_holder > li[title='Food Factory']").attr('title','음식공장');
		$("ul.land_holder > li[title='Weapons Factory']").attr('title','무기공장');
		// work result
		$("#work_results a[title='Show details'] > span:eq(0)").text('세부사항 보기');
		$("#work_results a[title='Show details'] > span:eq(1)").text('세부사항 숨기기');
		$('#work_results .wdetails_bar > #national_bonus > div:first > small').text('국가생산 보너스');
		$('#work_results .wdetails_bar > .list.stats > div:first > small').text('개인상태');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Days worked in a row']").attr('title','연속으로 일을 작업했습니다');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Experience points']").attr('title','경험치');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Health loss']").attr('title','체력');
		$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Raw materials used']").attr('title','원자재 사용');
		$('.wtexts > div#result_products > small').replaceText('Food units produced','식품 생산').replaceText('Weapons produced','무기 제작');
		//$('a#collect.green_action expand').text('YUI Rocks');
		// train result
		$('#train_results .wdetails_content > div > div > small').text('힘');
		$("#train_results a[title='Show details'] > span:eq(0)").text('세부사항 보기');
		$("#train_results a[title='Show details'] > span:eq(1)").text('세부사항 숨기기');
		$('#train_results .wdetails_bar > .list.friends_bonus > div:first > small').text('친구초대 보너스');
		$('#train_results .wdetails_bar > .list.friends_bonus_off > div:first > small').text('친구초대 보너스');
		$('#train_results .wdetails_bar > .list.natural_enemy_bonus > div:first > small').text('주적 보너스');
		$('#train_results .wdetails_bar > .list.natural_enemy_bonus_off > div:first > small').text('주적 보너스');
		$('#train_results .wdetails_bar > .list.stats > div:first > small').text('상태');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Super soldier']").attr('title','슈퍼 솔져');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Experience points']").attr('title','경험치');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Health loss']").attr('title','체력');
		$("#train_results .wdetails_bar > .list.stats > div:last > div[title='Gold loss']").attr('title','화폐');
		// buy land
		$('#buy_land > .pop_repeat > div > .title > strong').text('부지 구매');
		$('#buy_land > .pop_repeat > div > .buy_preview > strong').text('신규 부지');
		$('#buy_land > .pop_repeat > div > .buy_preview > small').replaceText('Cost','비용');
		$('#buy_land > .pop_repeat > div > a#expandLand').text('확장');
		// congrats
		$('#congrats > .wrepeat > .wcontent > .txt > h4').text('축하합니다!');
		$('#congrats > .wrepeat > .wcontent > .txt > p').text('당신은 성공적으로 부지를 구매했습니다!');
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 시장 economy.erepublik.com/en/market/
	//   - 공장판매 economy.erepublik.com/en/market/company/
	//   - 고용시장 economy.erepublik.com/en/market/job/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/market/")!==-1) {
		$('h1').css('font-family','Arial,Arial');
		$('h4').css('font-family','Arial,Arial');
		// market
		$("#marketplace > h1:contains('Marketplace')").text('시장');
		$("#filters_expanded > h4:contains('Select product')").text('당신이 구매하려는 생산품의 유형을 선택하세요');
		$(".product_selector > ul > li > a[title='Food'] > strong").text('음식');
		$(".product_selector > ul > li > a[title='Weapons'] > strong").text('무기');
		$(".product_selector > ul > li > a[title='House'] > strong").text('집');
		$(".product_selector > ul > li > a[title='Moving Tickets'] > strong").text('이동 티켓');
		$(".product_selector > ul > li > a[title='Food Raw Material'] > strong").text('음식원자재');
		$(".product_selector > ul > li > a[title='Weapon Raw Material'] > strong").text('무기원자재');
		$(".product_selector > ul > li > a[title='Hospital'] > strong").text('병원');
		$(".product_selector > ul > li > a[title='Defense System'] > strong").text('방어시설');
		$(".product_selector > ul > li.last > a > strong").text('공장');
		$("#filters_expanded > #minReq > h4:contains('Select quality')").text('공장선택');
		$("#filters_summary > .sactual > .sattr > small:exact('Health restore')").text('당신이 체력 회복할 수 있는 양');
		$("#filters_summary > .sactual > .sattr > small:exact('Fire Power')").text('공격력');
		$("#filters_summary > .sactual > .sattr > small:exact('Durability')").text('내구도');
		$("#filters_summary > .sactual > .sattr > small:exact('Health')").text('체력');
		$("#filters_summary > .sactual > .sattr > small:exact('Moving Distance')").text('이동 거리');
		$("#filters_summary > .sactual > .sattr > small:exact('Uses/Player')").text("회 / 각 플레이어");
		$("#filters_summary > .sactual > .sattr > small:exact('Defense Budget')").text("방위 예산");
		$("#filters_summary > .sactual > .sattr > div > span.solid.health > strong:exact('/ use')").text('/ 매시간');
		$("#filters_summary > .sactual > .sattr > div > span.solid.health > strong:exact('/ day')").text('/ 매일');
		$("#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact(' uses')").text(' 번');
		$('#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact("use(s)")').text('번');
		$('#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact("day(s)")').text('일');
		$('#filters_summary > .sactual > .sattr > div > span.solid.moving_distance > strong:exact("zone(s)")').text('영지');
		$("#filters_summary > .sactual > .schange > a > span:contains('Change')").text('변경');
		$("#marketplace > table > thead > tr.m_mainh > th.m_product:contains('Product')").text('생산품');
		$('#marketplace > table > thead > tr.m_mainh > th.m_provider').text('공급자');
		$('#marketplace > table > thead > tr.m_mainh > th.m_stock').text('저장');
		$("#marketplace > table > thead > tr.m_mainh > th.m_price > a[title='Price']").text('가격');
		$('#marketplace > table > thead > tr.m_mainh > th.m_quantity').text('품질');
		$('#marketplace > table > tbody > tr > td.m_buy > a > span').text('구매');
		$("table.info_message > tbody > tr > td:contains('There are no market offers matching you search.')").text('더 이상 판매하는 생산품이 없습니다.');
		if (document.location.toString().indexOf("/company/")!==-1) {
			// company market
			$("#marketplace > h1:contains('Companies for sale')").text("공장 인수");
			$("#marketplace > div.companies_sale > h4:contains('Select company')").text('당신이 구매하려는 공장의 유형을 선택하세요.');
			$("#marketplace > table > thead > tr.m_mainh > th.m_product:contains('Company')").text('공장 이름');
			$("table.error_message > tbody > tr > td:contains('You can not buy a company in a country for which you do not have citizenship.')").text('외국에서는 공장을 구매할 수 없습니다.');
			$("table.info_message > tbody > tr > td:contains('There are no companies for sale matching you search.')").text('시장에 판매되는 공장이 없습니다.');
		} else if (document.location.toString().indexOf("/job/")!==-1) {
			// job market
			$("#job_market > h1:contains('Job Market')").text("고용시장");
			$("table.info_message > tbody > tr > td:contains('You already have a job at')").replaceText('You already have a job at','').replaceText('Company. To apply for this job you have to quit your current job.'," 공장에 취직했습니다. 만약 다른 나라에서 일을 하기 원한다면, 우선 사직을 해야합니다.");
			$('#job_market > table > thead > tr.jm_mainh > th.jm_company').text('고용주');
			$('#job_market > table > thead > tr.jm_mainh > th.jm_industry').text('공장 이름');
			$('#job_market > table > thead > tr.jm_mainh > th.jm_salary > a').text('일급');
			$('#job_market > table > thead > tr > th.jm_apply > a > span').text('지원');
		};
	};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 건설 economy.erepublik.com/en/company/create
	// 공장 economy.erepublik.com/en/company/
	//   - 수정 economy.erepublik.com/en/company/edit/
	//   - 공장판매 economy.erepublik.com/en/company/sell/
	//   - 노동자 해고 economy.erepublik.com/en/company/employees/
	//          economy.erepublik.com/en/company/job-offers/
	//   - 변환 economy.erepublik.com/en/company/migrate/
	//   - 확장 economy.erepublik.com/en/company/customize/
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (document.location.toString().indexOf("/company/")!==-1) {
		if (document.location.toString().indexOf("/company/create")!==-1) {
			$('h1').css('font-family','Arial,Arial');
			$('h3').css('font-family','Arial,Arial');
			// create company
			$('h1:first').text('건설');
			$('.create_building > h3:first').text('당신이 건설하려고 하는 건물 유형을 선택하세요.');
			$(".create_links > a[title='Food raw materials'] > span").text('음식원자재 건물');
			$(".create_links > a[title='Weapon raw materials'] > span").text('무기원자재 건물');
			$(".create_links > a[title='Factories'] > span").text('공장');
			$(".create_links > a[title='Storage'] > span").text('창고시설');
			$(".create_links > a[title='Training Facilities'] > span").text('훈련시설');
			$('.create_building > h3#second_title').text('건물 유형을 선택하세요.');
			$('ul.buildings > li.food:eq(0) > a > strong').text('농장');
			$('ul.buildings > li.food:eq(1) > a > strong').text('과수원');
			$('ul.buildings > li.food:eq(2) > a > strong').text('어장');
			$('ul.buildings > li.food:eq(3) > a > strong').text('목장');
			$('ul.buildings > li.food:eq(4) > a > strong').text('사냥터');
			$('ul.buildings > li.weapon:eq(0) > a > strong').text('철광 시설');
			$('ul.buildings > li.weapon:eq(1) > a > strong').text('석유 시설');
			$('ul.buildings > li.weapon:eq(2) > a > strong').text('알루미늄 시설');
			$('ul.buildings > li.weapon:eq(3) > a > strong').text('초석 시설');
			$('ul.buildings > li.weapon:eq(4) > a > strong').text('고무 시설');
			$("ul.buildings > li.factories > a > strong:contains('Food')").text('음식공장');
			$("ul.buildings > li.factories > a > strong:contains('Weapons')").text('무기공장');
			$("ul.buildings > li.storage > a > strong:contains('Normal')").text('현재저장');
			$("ul.buildings > li.storage > a > strong:contains('Large')").text('최대저장');
			$('ul.buildings > li.train:eq(0) > a > strong').text('기초훈련');	
			$('ul.buildings > li.train:eq(1) > a > strong').text('암벽훈련');
			$('ul.buildings > li.train:eq(2) > a > strong').text('사격훈련');
			$('ul.buildings > li.train:eq(3) > a > strong').text('특공훈련');
			$('ul.buildings > li.train > .train_cost').replaceText('train','교육훈련별');
			$('form#companyCreateForm a#construct > span').text('건축 확인');
		} else {
			$('h2').css('font-family','Arial,Arial');
			$('h4').css('font-family','Arial,Arial');
			// company profile
			$('#companyOptions > .content_part > .left_part > ul > li > a.edit').html('<img src="http://www.erepublik.com/images/modules/_icons/company_edit_details.png" alt=""> 세부사항 수정');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Sell company')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_sell.png" alt=""> 공장 판매');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Company profile')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_profile.png" alt=""> 공장 세부사항');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Migrate company')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_migrate.png" alt=""> 공장 유형변경');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total food raw material stock')").text('공장 유형변경');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total weapon raw material stock')").text('무기원자재 저장');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total food stock')").text('음식 저장');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total weapons stock')").text('무기 저장');
			$("#company_info_panel > .elements > .product_stock > .stats > p:contains('This data is confidential.')").text('이 자료는 비공개입니다..');
			$('#company_info_panel > .elements > .finances > h2:first').text('재정');
			$('#company_info_panel > .elements > .raw_materials > h2:first').text('원자재');
			$("#company_info_panel > .elements > .raw_materials > .stats > p:contains('This data is confidential.')").text('이 자료는 비공개입니다..');
			$('#company_info_panel > .elements > .raw_materials > .stats > p').replaceText('raw material req. per ','100개의 원자재로 1단위의 생산품을 만들 수 있다.').replaceText('food','음식.').replaceText('weapon','무기.');
			$('#company_info_panel > .manage_panel > .storage_actions > table > tbody > tr > td > a > span').text('창고 확인');
			$('#company_info_panel > .manage_panel > .finances_actions > table > tbody > tr > td > a > span').text('자산 확인');
			$('#company_info_panel > .manage_panel > .raw_materials_actions > tbody > tr > td > a > span').text('원자재 구매');
			$('#production_status > table.stats > tbody > tr > td > .employee > big > span:last').text('직원(들)');
			$('#production_status > table.stats > tbody > tr > td > .employee > .recommended_employees > a.manage_link').text('직원 관리');
			$("table.info_message > tbody > tr > td:contains('You can view your market licences and sell products directly from your')").html('당신은 직접 <a href="http://www.erepublik.com/en/economy/inventory" rel="noreferrer">창고</a>를 보고 물건을 팔 수 있습니다.');
			$("table.error_message > tbody > tr > td:contains('This company name is already used by another Erpk entity. Please choose another one.')").text('이 이름은 다른 공장에서 사용중입니다. 다른 이름을 선택하세요.');
			if (document.location.toString().indexOf("/company/edit/")!==-1) {
				// company edit
				$('form#companyEditForm > h2:first').text('공장 등록');
				$("form#companyEditForm > .container_blue_border > .company_name > strong:contains('Company name')").text('공장 등록');
				$("form#companyEditForm > .container_blue_border > strong.blued:contains('Company description')").text('공장에 대해');
				$("form#companyEditForm > table > tbody > tr > td > a[title='Save changes'] > span").text('변경 확인');
			} else if (document.location.toString().indexOf("/company/sell/")!==-1) {
				// company sell
				$('.sell_company > h2:first').text('공장 판매');
				$('.sell_company > .disolve_company > h2:first').text('공장 철거');
				$('.sell_company > .disolve_company > table > tbody > tr > td > p').replaceText('You can dissolve your company for','이 공장 철거로 ').append(' 획득하였습니다');
				$(".sell_company > .disolve_company > table > tbody > tr > td > a[title='Dissolve company'] > span").text('공장 철거');
				$("table.info_message > tbody > tr > td:contains('Raw Material buildings cannot be sold.')").text('이 원자재 건물은 판매가 불가능 합니다.')
				$("table.info_message > tbody > tr > td:contains('This building cannot be sold nor dissolved.')").text('이 건물은 판매가 불가능 합니다.')
				$("table.info_message > tbody > tr > td:contains('Dissolving a company will empty')").text('공장을 철거하면 공터로 전환되며, 당신은 미래에 다른 건물을 지을 수 있습니다.')
				//$("table.info_message > tbody > tr > td:contains('This company can be put on sale starting with')").replaceText('This company can be put on sale starting with','이 회사는 다음 ').replaceText('of the New World, at','的').replaceText("(10 days since it was created or bought).","後才能被拍賣. (十天內不能轉讓同間公司)");
				$("table.info_message > tbody > tr > td:contains('This company can be put on sale starting with')").text('회사는 10일 안에는 주인이 바뀔 수 없습니다');
			} else if ((document.location.toString().indexOf("/company/employees/")!==-1) || (document.location.toString().indexOf("/company/job-offers/")!==-1)) {
				// company employee
				$('#employee_list > h2:first').text('직원 관리');
				$("#employee_list > ul.ftabs > li > a[title='Employee list']").replaceText('Employee list','직원 목록');
				$("#employee_list > ul.ftabs > li > a[title='Job offers']").replaceText('Job offers','구인구직');
				$('#employee_list > table > thead > tr.el_mainh > th.el_employee').text('직원');
				$('#employee_list > table > thead > tr.el_mainh > th.el_productivity > span:first').text('작업 당 생산량');
				$('#employee_list > table > thead > tr.el_mainh > th.el_salary > a').text('일급');
				$('#employee_list > table > tbody > tr > td.el_salary > div > a.f_red_small > span').text('해고');
				$("table.info_message > tbody > tr > td:contains('This company has no employees at the moment')").text('더 이상 이 회사의 직원이 아닙니다.')
				// company job offer
				$('#job_offers > h2:first').text('직원 관리');
				$("#job_offers > ul.ftabs > li > a[title='Employee list']").replaceText('Employee list','직원 목록');
				$("#job_offers > ul.ftabs > li > a[title='Job offers']").replaceText('Job offers','구인구직');
				$('#job_offers > table > thead > tr.jo_mainh > th.jo_ammount').text('공석');
				$('#job_offers > table > thead > tr.jo_mainh > th.jo_salary > a').text('일급');
				$("#job_offers > table > tbody > tr > td > div > a[title='Change'] > span").text('변경');
				$("#job_offers > table > tbody > tr > td > div > a[title='Save'] > span").text('저장');
				$("table.info_message > tbody > tr > td:contains('This company has no job offers at the moment')").text('더 이상 이 회사의 직원이 아닙니다.')
			} else if (document.location.toString().indexOf("/company/migrate/")!==-1) {
				// company migrate
				// -- my friend tell me this function will be removed in the future \o/ @blakcca
			} else if (document.location.toString().indexOf("/company/customize/")!==-1) {
				// company upgrade, downgrade
				$('.product_design > h2:first').text('공장 확장');
				$('.product_design > .container_blue_border > h4:first').text('공장의 확장수준을 정하세요.');
				$('.product_design > .container_blue_border > ul.packs > li > .product_detail > span').replaceText('Refund','환불').replaceText('Cost','환불').replaceText('Owned','소유');
				$('.product_design > .container_blue_border > ul.packs > li > a.upgrade').text('확장');
				$('.product_design > .container_blue_border > ul.packs > li > a.downgrade').text('축소');
				$('.product_design > .container_blue_border > ul.packs > li > a.downgrade').text('축소');
			};
		};
	};
};
