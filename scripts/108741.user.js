// ==UserScript==
// @name           eRepublik Mercenary Achievement
// @namespace      Mercenary Achievement
// @description    Help eRepublik mercenary achievement catch
// @autor          Botherlong
// @match  	   	   http://*.erepublik.com/*
// @include  	   http://*.erepublik.com/*
// @version        1.2
// @date	       2012-09-07
// ==/UserScript==

/* Changelog:
v1.2   (2012-09-07)
	- Modify shortcuts issue
v1.16  (2011-11-22)
	- Fix a bug
v1.14  (2011-11-20)
	- Fix order count show
	- Modify Chinese translation issue
v1.13  (2011-11-02)
	- Change order count in battlefield page
v1.12  (2011-10-31)
	- Add count of alliances on country military page
v1.11  (2011-10-20)
	- Improve performance
	- Modify military order count in battlefield page
v1.00  (2011-10-11)
	- Modify display in military campaigns page
*/
var MercenaryAchievementInsert = function($, window, undefined) {
	var citizen_id = $("#large_sidebar .user_section a:eq(0)").attr("href").split("/")[$("#large_sidebar .user_section a:eq(0)").attr("href").split("/").length-1];
	var lang = location.pathname.substr(1,2);
	var country, count, text;

	function requestResult(a,times){
		for(var b=0; b<country.length; b++) {
			if(a == country[b]) return ((count[b] == "25/25")?"<i style='color: blue'>Done</i>":count[b]);
		}
		return (times > 1) ? 'N/A' : requestResult(a,times+1);
	}

	if(document.location.toString().indexOf(citizen_id)!=-1) {
		var temp = $('ul[class="country_list"]').html();
		$('ul[class="country_list"]').before('<br><p align="right"><b>Hits: <a href="javascript:;"><font color="red">1-10</font></a>, <a href="javascript:;"><font color="green">11-20</font></a>, <a href="javascript:;"><font color="blue">21-24</font></a>, <a href="javascript:;"><font color="purple">Count</font></a>, <a href="javascript:;"><font color="black">Recovery</font></a></b></p>');
		$('font[color]').click(function(){
			$('ul[class="country_list"]').html(temp);
			var color = $(this).attr('color');
			if(color == "black") return;
			var a = (color == "red") ? 0 : ((color == "green") ? 1 : 2);
			$('ul[class="country_list"] li').each(function(){
				$('img',this).css('opacity',0.2);
				var count = $('em',this).text().split('/')[0];
				if(color == "purple") {
					$('img',this).css('opacity',1);
					a = (count > 0 && count < 11) ? "red" : (count > 10 && count < 21) ? "green" : (count > 20 && count < 25) ? "blue" : "purple";
					var b = $('small',this).text();
					$('small',this).html('<font color="'+a+'"><b>'+count+'</b></font>');
					$('em',this).html('<a href="http://www.erepublik.com/en/country/military/' +$('img',this).attr('src').replace('/images/flags_png/S/','').replace('.png','')+'">'+b+'</a>');
				} else if(count > a*10 && count < a*10+11 && count != 25) {
					$('small',this).css('color',color).css('font-weight','bold').css('font-size',12);
					$('img',this).css('opacity',1);
					$('em',this).html('<a href="http://www.erepublik.com/en/country/military/' +$('img',this).attr('src').replace('/images/flags_png/S/','').replace('.png','')+'">'+count+'/25</a>');
				}
			});
		});//*
	} else if (document.location.toString().indexOf('/campaigns')!=-1) {
		jQuery.get('http://www.erepublik.com/en/citizen/profile/' + citizen_id, function(data) {
		  	country = $('li', $('ul[class*="country_list"]', data)).map(function(){ return (this.title==undefined) ? null : this.title;}).get();
		 	count = $('em', $('ul[class*="country_list"]', data)).map(function(){ return (this.innerHTML==undefined) ? null : this.innerHTML;}).get();
			$('#battle_listing li[id*="battle-"]:not([class*="victory"])').each(function(){
				if(a = $('img[class*="mpp_sign"]',this).attr("title")) text = "<strong style='color: red; font-weight: normal; font-size: 10pt; float:right;position:absolute;right:140px'>"+requestResult(a,0)+"</strong>";
				else text = "<strong style='color: red; font-weight: normal; font-size: 10pt; float:right;position:absolute;right:210px'>"+requestResult($('img[class*="side_flags"]',this).eq(0).attr("title"),0)+"</strong><small style='float:right;position:absolute;right:180px'>&nbsp&nbsp&nbspvs</small><strong style='color: red; font-weight: normal; font-size: 10pt;float:right;position:absolute;right:140px'>"+requestResult($('img[class*="side_flags"]',this).eq(1).attr("title"),0)+"</strong>";
				$('a[class="county"]',this).after(text);			
			});
		});
	} else if (document.location.toString().indexOf('/wars/show/')!=-1) {
		jQuery.get('http://www.erepublik.com/en/citizen/profile/' + citizen_id, function(data) {
		  	country = $('li', $('ul[class*="country_list"]', data)).map(function(){ return (this.title==undefined) ? null : this.title;}).get();
		 	count = $('em', $('ul[class*="country_list"]', data)).map(function(){ return (this.innerHTML==undefined) ? null : this.innerHTML;}).get();
	  		if($('.listing strong').is('strong')) {
		  		var title = $("title").text().split(" vs ");
				$('.listing strong').before("<span style='color: red; font-weight: normal; font-size: 10pt; margin-left: -10pt;'>"+requestResult(title[0].split("WAR | ")[1],0)+"</span>");
				$('.listing strong').after("<span style='color: red; font-weight: normal; font-size: 10pt; margin-left: 160pt;'>"+requestResult(title[1],0)+"</span>");
			} else $('.listing a.region:first').before("<span style='color: red; font-weight: normal; font-size: 10pt; margin-left: 30pt;'>"+requestResult($('.left_side h3').attr('title'),0)+"</span>");
		});
	} else if (document.location.toString()=="http://www.erepublik.com/"+lang) {
		jQuery.get('http://www.erepublik.com/en/citizen/profile/' + citizen_id, function(data) {
		  	country = $('li', $('ul[class*="country_list"]', data)).map(function(){ return (this.title==undefined) ? null : this.title;}).get();
		 	count = $('em', $('ul[class*="country_list"]', data)).map(function(){ return (this.innerHTML==undefined) ? null : this.innerHTML;}).get();
			$('#battle_listing li[id*="battle-"]').each(function(){
				if(a = $('img[class*="mpp_sign"]',this).attr("title")) text = "<span style='display : inline-block; color: red; font-weight: normal; font-size: 8pt; position:relative;margin-top:27px;margin-left:-"+$('strong',this).text().length*3.5+"pt'>"+requestResult(a,0)+"</span>";
				else text = "<span style='display : inline-block; color: red; font-weight: normal; font-size: 8pt; position:relative;margin-top:27px;margin-left:-"+$('strong',this).text().length*5+"px'>"+requestResult($('img[class*="side_flags"]',this).eq(0).attr("title"),0)+"&nbsp&nbsp&nbspvs&nbsp&nbsp&nbsp"+requestResult($('img[class*="side_flags"]',this).eq(1).attr("title"),0)+"</span>";
				$('strong',this).after(text);
			}); 
		});
	} else if (document.location.toString().indexOf("/battlefield/")!=-1) {
		var target, order, condition_no, link, text2="", check = 0;
		var b = $('#pvp_header div[class="allies_tooltip left_side"] > ul li').toArray();
		jQuery.get('http://www.erepublik.com/en/citizen/profile/' + citizen_id, function(data) {
		  	country = $('li', $('ul[class*="country_list"]', data)).map(function(){ return (this.title==undefined) ? null : this.title;}).get();
		 	count = $('em', $('ul[class*="country_list"]', data)).map(function(){ return (this.innerHTML==undefined) ? null : this.innerHTML;}).get();
	  		target = $("#battle_details_show h3:first").attr('title').split("Resistance Force of ");
	  		text = requestResult(target[target.length-1],0);
			$('#pvp_header div.battle_hero.left_side').after("<span id='eMA' style='color: red; font-weight: bold; font-size: 12pt; margin-left: 80pt;'>"+text+"</span>");
			var my_country = $('div[class="citizen_info auth"] > a:eq(2) > img', data).attr('src').split("http://static.erepublik.com/images/flags/S/")[1].replace('.gif','');
			if($('#pvp_header div[class="country left_side"] > a > img').attr('src').indexOf(my_country)!=-1) check = 1;
			else for(var c=0; c<b.length; c++) {if(b[c].innerHTML.indexOf(my_country)!=-1) {check = 1;break;}}
			jQuery.get('http://www.erepublik.com/en', function(data2) {
				order = $('div#orderContainer',data2).html();
				condition_no = $('big',order).text();
				link = $('a.blue_beauty',order).attr('href');
				if(document.location.toString().indexOf(link)!=-1 && check == 1) {
					text2 = (condition_no == "25/25" || !condition_no) ? "<i style='color: green'>Done</i>" : condition_no;
					$("div#defenderHero").before("<div id='eMA2' style='color: purple; font-weight: bold; font-size: 12pt; margin-left: 80pt;'>"+text2+"</div>");
				}
				
				Check_status = setInterval(function(){	
					if(text.indexOf("Done")!=-1 && (document.location.toString().indexOf(link)==-1 || text2.indexOf("Done")!=-1 || check==0)) {
						clearInterval(Check_status);
						return;
					}
					if(text.indexOf("Done")==-1) {
						jQuery.get('http://www.erepublik.com/en/citizen/profile/' + citizen_id, function(data) {
						  	country = $('li', $('ul[class*="country_list"]', data)).map(function(){ return (this.title==undefined) ? null : this.title;}).get();
				 		 	count = $('em', $('ul[class*="country_list"]', data)).map(function(){ return (this.innerHTML==undefined) ? null : this.innerHTML;}).get();
							$("#pvp_header #eMA").html(requestResult(target[target.length-1],0));
						});
					}
					if(document.location.toString().indexOf(link)!=-1 && text2.indexOf("Done")==-1 && check == 1) {
						jQuery.get('http://www.erepublik.com/en', function(data) {
				      		condition_no = $('big',$('div#orderContainer',data).html()).text();
					      	text2 = (condition_no == "25/25" || !condition_no) ? "<i style='color: green'>Done</i>" : condition_no;
					        $("#pvp_header #eMA2").html(text2);
						});
					}
				}, 5000);
			});
		});
	} else if (document.location.toString().indexOf("/country/military/")!=-1) {
		jQuery.get('http://www.erepublik.com/en/citizen/profile/' + citizen_id, function(data) {
		  	country = $('li', $('ul[class*="country_list"]', data)).map(function(){ return (this.title==undefined) ? null : this.title;}).get();
		 	count = $('em', $('ul[class*="country_list"]', data)).map(function(){ return (this.innerHTML==undefined) ? null : this.innerHTML;}).get();
			$('table[class="political largepadded"] .warholder-small').each(function(){
				text = "<strong style='color: red; font-weight: normal; font-size: 10pt; margin-left: -35pt;'>"+requestResult($('.attacker img',this).eq(0).attr('title'),0)+"</strong>&nbsp&nbsp&nbspvs&nbsp&nbsp&nbsp<strong style='color: red; font-weight: normal; font-size: 10pt;'>"+requestResult($('.defender img',this).eq(0).attr('title'),0)+"</strong>";
				$('.middle',this).html(text);			
			}); 
			$('h1+p').append("<strong style='color: red; font-weight: normal; font-size: 10pt; margin-left: 30pt;'>"+requestResult($('h1').text(),0)+"</strong>");
			text = 0;
			$('table[class="political padded"] td[class="last"]').each(function(){
				if($(this).text().indexOf("Resistance Force for")!=-1) text = "<strong style='color: red; font-weight: normal; font-size: 10pt; margin-left: 40pt;'>"+requestResult($(this).text().split("Resistance Force for ")[1].split("  ")[0],0)+"</strong>";
				else if(text != 0) {
					$(this).html(text);
					text = 0;
				}
			}); 
			$('table[class="political padded"] span[class="fakeheight"]').each(function(){
				text = "<strong style='color: red; font-weight: normal; font-size: 10pt; float:right;position:absolute;right:480px'>"+requestResult($('a',this).text(),0)+"</strong>";
				$(this).append(text);
			}); 
		});
	}
};

// Script Insert
var script = document.createElement('script');
script.textContent = '(' + MercenaryAchievementInsert + ')(jQuery, window);';
document.body.appendChild(script);
