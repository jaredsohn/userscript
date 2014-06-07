// ==UserScript==
// @name            hamalin SW
// @author          hamalin (compilation version)
// @description     Sofiawars GUI++
// @namespace       *
// @version         5.0.0 
// @date            19.01.2014 г.
// @include         http://*classic.sofiawars.com/*
// @exclude         http://www.classic.sofiawars.com/thimble/*
// @run-at          document-end
// ==/UserScript==
//http://userscripts.org/scripts/show/113942 ??
//*http://forum.theabyss.ru/index.php?showtopic=330157&st=40*/
/*var SUC_script_num = 140690;
try {
	function updateCheck(forced) {
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) {
			try {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp) {
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1){
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version){
								if(confirm('Нова версия "'+script_name+'."\n Инсталирай?')) {
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							} else if (forced)
								alert('Новата версия "'+script_name+'." е в разработка');
						} else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			} catch (err) {
				if (forced)
					alert('Тъпня някаква:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Sofiawars') + ' - Обнови скрипта', function() {
		updateCheck(true);
	});
	updateCheck(false);
} catch(err){}
*/
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery;}
}
GM_wait();
function myfunc(){
    //musicURL =  "http://www.ndrr.com/rmr_faq/Sounds/alarm.wav";
    //http://soundjax.com/alarm-4.html - ЗВУЦИ
    $('<embed src="'+musicURL+'" hidden="true" autostart="true" loop="false" />').appendTo("body");
};
$(document).ready(function(){
    $("#servertime").css('color', 'black');
    if ($("#timeout").attr('timer') > 3) {
        setTimeout(function() {
            myfunc();}, $("#timeout").attr('timer')*1000);}
    
    /*ресурси*/
    var all_money=parseInt($('span[rel="money"]').text().replace(",",""));
    var all_ore=parseInt($('span[rel="ore"]').text().replace(",",""));
    var all_neft=parseInt($('span[rel="oil"]').text().replace(",",""));
    $('span[rel="money"]').text(kFormatter(all_money));$('span[rel="ore"]').text(kFormatter(all_ore));
    $('span[rel="oil"]').text(kFormatter(all_neft));
    
    
    var url_1 = encodeURIComponent(window.location);
    var url_2 = 'http%3A%2F%2Fclassic.sofiawars.com%2Fplayer%2F';
    if (url_1 === url_2) {
        /*Събличане/Обличане и Зобене*/
        window.addEventListener('load', function() {
            function $c(){var d,b,t,e,r,m,o,p,n,a;$dD();$(".object-thumbs").css({height:"auto",overflow:"hidden"});$(".hint").remove();$("dl#dopings-accordion div.object-thumbs div.object-thumb div.action:not(.disabled)").each(function(){o=(/(?!\/player\/use\/)[0-9]+(?=\/';(\n)?)/g).exec(String($(this)[0].getAttribute("onclick")));if(o.length>0){var a=(/(?=\/?)[a-zA-Z0-9-]+(?=\.png(\n)?$)/g).exec(String($(this).parents("div.object-thumb").find("img:first").attr("src")))[0];if(a!="drugs5"&&a!="drugs4"){o="checked"}else{o=""}n=$("<div />").css({bottom:"0",left:"0",position:"absolute"}).append("<input type=\"checkbox\" class=\"m4w\" "+o+" />");$(this).parents("div.object-thumb").css({"height":"64px","margin-bottom":"22px"}).append(n).click(function(e){if(e.target.type!='checkbox')$(':checkbox',this).attr('checked',function(){return!this.checked})})}});p=$("div#content table.inventary td.equipment-cell div[rel='normal'] div.object-thumbs div.object-thumb");p.each(function(){if($(this).find("div.action").length==0||!String($(this).find("div.action:first")[0].getAttribute("onclick")).match(/\/player\/dress\/[0-9]+\/';/g)){$(this).remove()}else{n=$("<div />").css({bottom:"0",left:"0",position:"absolute"}).append("<input type=\"checkbox\" checked=\"checked\" class=\"m3w\" />");$(this).css({"height":"64px","margin-bottom":"22px"}).append(n).click(function(e){if(e.target.type!='checkbox')$(':checkbox',this).attr('checked',function(){return!this.checked})})}});$("#content table.layout td.slots-cell ul.slots").find("li").not(".avatar,.slot-pet").each(function(){if($(this).find("img").length>0){d=$("<div />").css({bottom:"0",left:"0",position:"absolute"}).append("<input type=\"checkbox\" checked=\"checked\" class=\"m1w\" />");$(this).append(d).click(function(e){if(e.target.type!='checkbox')$(':checkbox',this).attr('checked',function(){return!this.checked})})}});b=$("<button />").addClass("button").css("margin","0 10px 7px 0").append("<span class=\"f\"><i class=\"rl\"></i><i class=\"bl\"></i><i class=\"brc\"></i><div class=\"c\">Съблечи избраното</div></span>");b2=b.clone(true);b3=b.clone(true);b3.click(function(){$(".button").addClass("disabled").unbind('click');a=new Array();$(".m4w:checked").each(function(){l=(/\/player\/use\/[0-9]+\/(?=';(\n)?$)/g).exec(String($(this).parents(".object-thumb").find("div.action:first")[0].getAttribute("onclick")));a.push(l[0])});$mt(a)}).find("div.c").text("Изяж избраното");b2.click(function(){$(".button").addClass("disabled").unbind('click');a=new Array();$(".m3w:checked").each(function(){l=(/\/player\/dress\/[0-9]+\/(?=';(\n)?$)/g).exec(String($(this).parents(".object-thumb").find("div.action:first")[0].getAttribute("onclick")));a.push(l[0])});$mt(a)}).find("div.c").text("Облечи избраното");b.click(function(){$(".button").addClass("disabled").unbind('click');a=new Array();$(".m1w:checked").each(function(){m=$(this).parents("li").find("img").attr("src");$(p).find("div.action").each(function(){if($(this).parents("div.padding").find("img").attr("src")==m){l=(/\/player\/withdraw\/[0-9]+\/(?=';(\n)?$)/g).exec(String($(this)[0].getAttribute("onclick")));a.push(l[0])}})});$mt(a)});t=$("<b />").css({"color":"#945903","font":"bold 90% Tahoma,sans-serif,Arial"}).html("Изпълнено");e=$("<div />").addClass("exp").html("<div class='bar' style='width:100%'><div><div class='percent' style='width:0%' id='m2w'></div></div></div>");r=$("<tr />").append("<td align='center' /><td align='center' /><td class='progress' />");$(r).find("td:nth-child(1)").append(b3).end().find("td:nth-child(2)").append(b,b2).end().find("td:nth-child(3)").append(t,e);$("#content table.layout tbody").append(r)}function $dD(){var v,h,s,c,i,a;v="dl.vtabs div.object-thumbs";h=function(e){return $(e).parents("div.object-thumb").find("div.count")};$(v).each(function(){$(this).find("div.object-thumb img").each(function(){s=String(/(?=\/)?[a-zA-Z0-9-]+\.png$/g.exec(String($(this).attr("src"))));i=$(v).find("img[src*='"+s+"']");if(i.length>1){c=0;i.each(function(){a=h(this);if(!a.html()){c+=1}else{c+=Number(a.html().replace("#",""))}});if(!h(i[0]).html())$("<div class='count' />").insertAfter($(i[0]));h(i[0]).html("#"+c);i.not(":first").parents("div.object-thumb").remove();return}})})}function $mt(a){if(a.length>0){var p=Math.round(100/a.length);$.get(a.pop(),function(d){$("#m2w").css("width",p+"%");$mt(a)})}else{window.location.reload(true)}};
            b=$("<button />")
            .addClass("button")
            .append("<span class=\"f\"><i class=\"rl\"></i><i class=\"bl\"></i><i class=\"brc\"></i><div class=\"c\">Допинги. Дрехи</div></span>").click(function(){
                $c()
            }).insertAfter("#personal")
        }, false);
        /**/
        
        
        
        
        $("#statistics-accordion > dd").css('height', '300px');
        /*Говорител*/govoritel = "http://picbg.net/u/69645/52419/658803.png";
        /*Къртач*/kartach = "http://picbg.net/u/69645/52419/658805.png";        
        /*Каска*/kaska = "http://picbg.net/u/69645/52419/658804.png";       
        /*Ютия*/utia = "http://picbg.net/u/69645/52419/658806.png";
        /*Нанознайки експрес*/expr = "http://picbg.net/u/69645/52419/658807.png";
        /*Нанознайки двойни*/x2 = "http://picbg.net/u/69645/52419/684226.png";
        /*Клещи 21-ва модификация*/m21 = "http://picbg.net/u/69645/52419/658809.png";
        /*Клещи +3*/bp = "http://picbg.net/u/69645/52419/658808.png";
        /*Ключ за сандък*/keyURL = "http://picbg.net/u/69645/52419/658821.png";
        /*Купон за отстъпка*/kup = "http://picbg.net/u/69645/52419/658810.png";
        /*Лиценз за наемник*/naemnik = "http://picbg.net/u/69645/52419/658811.png";
        /*Подкова*/podk = "http://picbg.net/u/69645/52419/658812.png";
        /*Златен зъб*/zol_zub = "http://picbg.net/u/69645/52419/658813.png";
        /*Бял зъб*/bel_zub = "http://picbg.net/u/69645/52419/658815.png";
        /*Значки от ловен клуб*/badge = "http://picbg.net/u/69645/52419/658814.png";   
        /*Мобилни*/mobilki = "http://picbg.net/u/69645/52419/658816.png";
        /*Звезди*/star = "http://picbg.net/u/69645/52419/658820.png";
        /*Билет за Монката*/mon9 = "http://picbg.net/u/69645/52419/658818.png";
        /*Пагони*/pogon = "http://picbg.net/u/69645/52419/658817.png";
        /*Сертификат за руда*/rudsert = "http://picbg.net/u/69645/52419/658819.png";
        /*Кроасани*/pelm = "";  
        /*Камера*/photo = "http://picbg.net/u/69645/52419/658827.png";
        /*Снимка на мъж*/nabor = "http://picbg.net/u/69645/52419/658826.png";
        /*========Целувки/Дъвки========*/
        /*Здраве*/zef_zdr = "http://picbg.net/u/69645/52419/658999.png";        
        /*Сила*/zef_sila = "http://picbg.net/u/69645/52419/659003.png";
        /*Ловкост*/zef_lvk = "http://picbg.net/u/69645/52419/659001.png";
        /*Издръжливост*/zef_vyn = "http://picbg.net/u/69645/52419/659000.png"; 
        /*Хитрост*/zef_hitr = "http://picbg.net/u/69645/52419/659004.png";
        /*Предпазливост*/zef_vnim = "http://picbg.net/u/69645/52419/659002.png";
        /*Здраве*/zhv_zdr = "http://picbg.net/u/69645/52419/658993.png";
        /*Сила*/zhv_sila = "http://picbg.net/u/69645/52419/658997.png";
        /*Ловкост*/zhv_lvk = "http://picbg.net/u/69645/52419/658995.png";
        /*Издръжливост*/zhv_vyn = "http://picbg.net/u/69645/52419/658994.png";
        /*Хитрост*/zhv_hitr = "http://picbg.net/u/69645/52419/658998.png";
        /*Предпазливост*/zhv_vnim = "http://picbg.net/u/69645/52419/658996.png";
        /*Здраве*/new_zdr = "http://picbg.net/u/69645/52419/729362.png";
        /*Сила*/new_sila = "http://picbg.net/u/69645/52419/729363.png";
        /*Ловкост*/new_lvk = "http://picbg.net/u/69645/52419/729365.png";
        /*Издръжливост*/new_vyn = "http://picbg.net/u/69645/52419/729364.png";
        /*Хитрост*/new_hitr = "http://picbg.net/u/69645/52419/729366.png";
        /*Предпазливост*/new_vnim = "http://picbg.net/u/69645/52419/729367.png";		
        /*Глупава Бонбонка*/t_bon = "http://picbg.net/u/69645/52419/729360.png";
        /*Умна Бонбонка*/u_bon = "http://picbg.net/u/69645/52419/729361.png";
        /*Бонбонки*/pjani = "http://picbg.net/u/69645/52419/658824.png";
        /*Пудинг*/tvorog = "http://picbg.net/u/69645/52419/658825.png";
        /*Шоколад Критически Удар*/
        drugs25 = "http://picbg.net/u/69645/52419/659014.png";
        drugs22 = "http://picbg.net/u/69645/52419/659018.png";
        drugs28 = "http://picbg.net/u/69645/52419/659016.png";
        drugs149 = "http://picbg.net/u/69645/52419/659017.png";
        /*Шоколад Защита*/
        drugs27 = "http://picbg.net/u/69645/52419/659082.png";
        drugs24 = "http://picbg.net/u/69645/52419/659083.png";
        drugs30 = "http://picbg.net/u/69645/52419/659084.png";
        drugs151 = "http://picbg.net/u/69645/52419/659085.png";
        /*Шоколад Гъвкавост*/
        drugs26 = "http://picbg.net/u/69645/52419/659086.png";
        drugs23 = "http://picbg.net/u/69645/52419/659087.png";
        drugs29 = "http://picbg.net/u/69645/52419/659088.png";
        drugs150 = "http://picbg.net/u/69645/52419/659089.png";
        /*Чай Щета*/
        drugs31 = "http://picbg.net/u/69645/52419/659097.png";
        drugs34 = "http://picbg.net/u/69645/52419/659098.png";
        drugs37 = "http://picbg.net/u/69645/52419/659099.png";
        drugs152 = "http://picbg.net/u/69645/52419/659100.png";
        /*Чай Защита от Критически Удар*/
        drugs32 = "http://picbg.net/u/69645/52419/659103.png";
        drugs35 = "http://picbg.net/u/69645/52419/659104.png";
        drugs38 = "http://picbg.net/u/69645/52419/659105.png";
        drugs153 = "http://picbg.net/u/69645/52419/659106.png";
        /*Чай Точност*/
        drugs33 = "http://picbg.net/u/69645/52419/659107.png";
        drugs36 = "http://picbg.net/u/69645/52419/659108.png";
        drugs39 = "http://picbg.net/u/69645/52419/659109.png";
        drugs154 = "http://picbg.net/u/69645/52419/659110.png";
        
        var drugs22_count = 0;
        var drugs23_count = 0;
        var drugs24_count = 0;
        var drugs25_count = 0;
        var drugs26_count = 0;
        var drugs27_count = 0;
        var drugs28_count = 0;
        var drugs29_count = 0;
        var drugs30_count = 0;
        var drugs149_count = 0;
        var drugs150_count = 0;
        var drugs151_count = 0;
        var drugs31_count = 0;
        var drugs32_count = 0;
        var drugs33_count = 0;
        var drugs34_count = 0;
        var drugs35_count = 0;
        var drugs36_count = 0;
        var drugs37_count = 0;
        var drugs38_count = 0;
        var drugs39_count = 0;
        var drugs152_count = 0;
        var drugs153_count = 0;
        var drugs154_count = 0;
        var pjani_count = 0;
        var tvorog_count = 0;
        var zef_lvk_count = 0;
        var zef_sila_count = 0;
        var zef_vnim_count = 0;
        var zef_vyn_count = 0;
        var zef_hitr_count = 0;
        var zef_zdr_count = 0;
        var new_lvk_count = 0;
        var new_sila_count = 0;
        var new_vnim_count = 0;
        var new_vyn_count = 0;
        var new_hitr_count = 0;
        var new_zdr_count = 0;
        var t_bon_count = 0;
        var u_bon_count = 0;	
        var zhv_lvk_count = 0;
        var zhv_sila_count = 0;
        var zhv_vnim_count = 0;
        var zhv_vyn_count = 0;
        var zhv_hitr_count = 0;
        var zhv_zdr_count = 0;
        var bel_zub_count = 0;
        var zol_zub_count = 0;
        var nabor_count = 0;
        var badge_count = 0;
        var star_count = 0;
        var mobilki_count = 0;
        var rudsert_count = 0;
        var naemnik_count = 0;
        var expr_count = 0;
        var kup_count = 0;
        var mon9_count = 0;
        var m21_count = 0;
        var x2_count = 0;
        var bp_count = 0;
        var podk_count = 0;
        var pogon_count = $('img[src="/@/images/obj/shoulderstrap.png"]').size()/2;
        var photo_count = $('img[src="/@/images/obj/photocamera.png"]').size()/2;
        var key_count = $('img[src="/@/images/obj/key1.png"]').size()/2;
        var pelm_count = 0;
        var kaska_count = $('img[src="/@/images/obj/underground4.png"]').size()/2;
        var utia_count = 0;
        var kartach_count = $('img[src="/@/images/obj/underground5.png"]').size()/2;
        var govoritel_count = $('img[src="/@/images/obj/rupor.png"]').size(); 
        /*Шоко/Чай*/
        if ($('img[src="/@/images/obj/drugs22.png"]').size() > 0) {
            drugs22_count =  $('img[src="/@/images/obj/drugs22.png"]').next().text();
            drugs22_count = drugs22_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs23.png"]').size() > 0) {
            drugs23_count =  $('img[src="/@/images/obj/drugs23.png"]').next().text();
            drugs23_count = drugs23_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs24.png"]').size() > 0) {
            drugs24_count =  $('img[src="/@/images/obj/drugs24.png"]').next().text();
            drugs24_count = drugs24_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs25.png"]').size() > 0) {
            drugs25_count =  $('img[src="/@/images/obj/drugs25.png"]').next().text();
            drugs25_count = drugs25_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs26.png"]').size() > 0) {
            drugs26_count =  $('img[src="/@/images/obj/drugs26.png"]').next().text();
            drugs26_count = drugs26_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs27.png"]').size() > 0) {
            drugs27_count =  $('img[src="/@/images/obj/drugs27.png"]').next().text();
            drugs27_count = drugs27_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs28.png"]').size() > 0) {
            drugs28_count =  $('img[src="/@/images/obj/drugs28.png"]').next().text();
            drugs28_count = drugs28_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs29.png"]').size() > 0) {
            drugs29_count =  $('img[src="/@/images/obj/drugs29.png"]').next().text();
            drugs29_count = drugs29_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs30.png"]').size() > 0) {
            drugs30_count =  $('img[src="/@/images/obj/drugs30.png"]').next().text();
            drugs30_count = drugs30_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs31.png"]').size() > 0) {
            drugs31_count =  $('img[src="/@/images/obj/drugs31.png"]').next().text();
            drugs31_count = drugs31_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs32.png"]').size() > 0) {
            drugs32_count =  $('img[src="/@/images/obj/drugs32.png"]').next().text();
            drugs32_count = drugs32_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs33.png"]').size() > 0) {
            drugs33_count =  $('img[src="/@/images/obj/drugs33.png"]').next().text();
            drugs33_count = drugs33_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs34.png"]').size() > 0) {
            drugs34_count =  $('img[src="/@/images/obj/drugs34.png"]').next().text();
            drugs34_count = drugs34_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs35.png"]').size() > 0) {
            drugs35_count =  $('img[src="/@/images/obj/drugs35.png"]').next().text();
            drugs35_count = drugs35_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs36.png"]').size() > 0) {
            drugs36_count =  $('img[src="/@/images/obj/drugs36.png"]').next().text();
            drugs36_count = drugs36_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs37.png"]').size() > 0) {
            drugs37_count =  $('img[src="/@/images/obj/drugs37.png"]').next().text();
            drugs37_count = drugs37_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs38.png"]').size() > 0) {
            drugs38_count =  $('img[src="/@/images/obj/drugs38.png"]').next().text();
            drugs38_count = drugs38_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs149.png"]').size() > 0) {
            drugs149_count =  $('img[src="/@/images/obj/drugs149.png"]').next().text();
            drugs149_count = drugs149_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs150.png"]').size() > 0) {
            drugs150_count =  $('img[src="/@/images/obj/drugs150.png"]').next().text();
            drugs150_count = drugs150_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs151.png"]').size() > 0) {
            drugs151_count =  $('img[src="/@/images/obj/drugs151.png"]').next().text();
            drugs151_count = drugs151_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs152.png"]').size() > 0) {
            drugs152_count =  $('img[src="/@/images/obj/drugs152.png"]').next().text();
            drugs152_count = drugs152_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs153.png"]').size() > 0) {
            drugs153_count =  $('img[src="/@/images/obj/drugs153.png"]').next().text();
            drugs153_count = drugs153_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs154.png"]').size() > 0) {
            drugs154_count =  $('img[src="/@/images/obj/drugs154.png"]').next().text();
            drugs154_count = drugs154_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs39.png"]').size() > 0) {
            drugs39_count =  $('img[src="/@/images/obj/drugs39.png"]').next().text();
            drugs39_count = drugs39_count.replace(/\#+/g,' ');}
        /*Умна и Глупава бонбонка*/			
        if ($('img[src="/@/images/obj/lamp-pack.png"]').size() > 0) {
            u_bon_count =  $('img[src="/@/images/obj/lamp-pack.png"]').next().text();
            u_bon_count = u_bon_count.replace(/\#+/g,' ');}			
        if ($('img[src="/@/images/obj/anti-lamp.png"]').size() > 0) {
            t_bon_count =  $('img[src="/@/images/obj/anti-lamp.png"]').next().text();
            t_bon_count = t_bon_count.replace(/\#+/g,' ');}		
        /*Дъвки*/    
        if ($('img[src="/@/images/obj/drugs8.png"]').size() > 0) {
            zhv_lvk_count =  $('img[src="/@/images/obj/drugs8.png"]').next().text();
            zhv_lvk_count = zhv_lvk_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs7.png"]').size() > 0) {
            zhv_sila_count =  $('img[src="/@/images/obj/drugs7.png"]').next().text();
            zhv_sila_count = zhv_sila_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs11.png"]').size() > 0) {
            zhv_vnim_count =  $('img[src="/@/images/obj/drugs11.png"]').next().text();
            zhv_vnim_count = zhv_vnim_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs9.png"]').size() > 0) {
            zhv_vyn_count =  $('img[src="/@/images/obj/drugs9.png"]').next().text();
            zhv_vyn_count = zhv_vyn_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs10.png"]').size() > 0) {
            zhv_hitr_count =  $('img[src="/@/images/obj/drugs10.png"]').next().text();
            zhv_hitr_count = zhv_hitr_count.replace(/\#+/g,' ');}
        if ($('img[src="/@/images/obj/drugs6.png"]').size() > 0) {
            zhv_zdr_count =  $('img[src="/@/images/obj/drugs6.png"]').next().text();
            zhv_zdr_count = zhv_zdr_count.replace(/\#+/g,' ');}
        /*Целувки*/	
        $('img[src="/@/images/obj/drugs192.png"]').next().each(function(){
            new_zdr_count = new_zdr_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs193.png"]').next().each(function(){
            new_sila_count = new_sila_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs194.png"]').next().each(function(){
            new_lvk_count = new_lvk_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs195.png"]').next().each(function(){
            new_vyn_count = new_vyn_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs196.png"]').next().each(function(){
            new_hitr_count = new_hitr_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs197.png"]').next().each(function(){
            new_vnim_count = new_vnim_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs83.png"]').next().each(function(){
            zef_zdr_count = zef_zdr_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs84.png"]').next().each(function(){
            zef_sila_count = zef_sila_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs85.png"]').next().each(function(){
            zef_lvk_count = zef_lvk_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs86.png"]').next().each(function(){
            zef_vyn_count = zef_vyn_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs87.png"]').next().each(function(){
            zef_hitr_count = zef_hitr_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs88.png"]').next().each(function(){
            zef_vnim_count = zef_vnim_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs2.png"]').next().each(function(){
            tvorog_count = tvorog_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs3.png"]').next().each(function(){
            pjani_count = pjani_count + parseInt($(this).text().replace(/\#+/g,''))});
        /*бели зъби*/
        $('img[src="/@/images/obj/tooth-white.png"]').next().each(function(){
            bel_zub_count = bel_zub_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/tooth-white.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/tooth-white.png"]').next().text('#'+bel_zub_count);   
        /*златни зъби*/
        $('img[src="/@/images/obj/tooth-gold.png"]').next().each(function(){
            zol_zub_count = zol_zub_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/tooth-gold.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/tooth-gold.png"]').next().text('#'+zol_zub_count);
        /*Значки от ловен клуб*/
        $('img[src="/@/images/obj/badge.png"]').next().each(function(){
            badge_count = badge_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/badge.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/badge.png"]').next().text('#'+badge_count);    
        /*звезди*/
        $('img[src="/@/images/obj/star.png"]').next().each(function(){
            star_count = star_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/star.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/star.png"]').next().text('#'+star_count);    
        /*мобилни*/
        $('img[src="/@/images/obj/mobile.png"]').next().each(function(){
            mobilki_count = mobilki_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/mobile.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/mobile.png"]').next().text('#'+mobilki_count);
        /*сертификат за руда*/
        $('img[src="/@/images/obj/item3-1.png"]').next().each(function(){
            rudsert_count = rudsert_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item3-1.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/item3-1.png"]').next().text('#'+rudsert_count);    
        /*сертификат за наемник*/
        $('img[src="/@/images/obj/item3-3.png"]').next().each(function(){
            naemnik_count = naemnik_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item3-3.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/item3-3.png"]').next().text('#'+naemnik_count);         
        /*купон за отсъпка*/
        $('img[src="/@/images/obj/item3.png"]').next().each(function(){
            kup_count = kup_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item3.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/item3.png"]').next().text('#'+kup_count);    
        /*сертификат за монката*/
        $('img[src="/@/images/obj/item3-2.png"]').next().each(function(){
            mon9_count = mon9_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item3-2.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/item3-2.png"]').next().text('#'+mon9_count);
        
        /*Нанознайки двойни*/
        $('img[src="/@/images/obj/item18.png"]').next().each(function(){
            x2_count = x2_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item18.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/item18.png"]').next().text('#'+x2_count);        
        
        /*клещи за М21*/
        $('img[src="/@/images/obj/item19.png"]').next().each(function(){
            m21_count = m21_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item19.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/item19.png"]').next().text('#'+m21_count);    
        /*клещи за +3*/
        $('img[src="/@/images/obj/item9.png"]').next().each(function(){
            bp_count = bp_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item9.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/item9.png"]').next().text('#'+bp_count);     
        /*нанознайки експрес*/
        $('img[src="/@/images/obj/item13.png"]').next().each(function(){
            expr_count = expr_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item13.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/item13.png"]').next().text('#'+expr_count);    
        /*подкови*/
        $('img[src="/@/images/obj/item11.png"]').next().each(function(){
            podk_count = podk_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item11.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/item11.png"]').next().text('#'+podk_count);     
        /*пагони*/
        $('img[src="/@/images/obj/item11.png"]').next().each(function(){
            pogon_count = pogon_count - podk_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item11.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/item11.png"]').next().text('#'+pogon_count);     
        /*Каска*/
        $('img[src="/@/images/obj/underground4.png"]').next().each(function(){
            kaska_count = kaska_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/underground4.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/underground4.png"]').next().text('#'+kaska_count);      
        /*Къртач*/
        $('img[src="/@/images/obj/underground5.png"]').next().each(function(){
            kartach_count = kartach_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/underground5.png"]').parent().parent().css('display','none');
        $('img[src="/@/images/obj/underground5.png"]').next().text('#'+kartach_count);         
        
        /*Ютия*/
        $('img[src="/@/images/obj/item15.png"]').next().each(function(){
            utia_count = utia_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/item15.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/item15.png"]').next().text('#'+utia_count);  
        /*Фото апарат*/
        $('img[src="/@/images/obj/photocamera.png"]').next().each(function(){
            photo_count = photo_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/photocamera.png"]').slice().parent().parent().css('display','none');
        $('img[src="/@/images/obj/photocamera.png"]').next().text('#'+photo_count);   
        
        
        /*Домашен любимец инвентар*/
        var hrana1_count = 0;   
        $('img[src="/@/images/obj/petfood1.png"]').next().each(function(){   
            hrana1_count = hrana1_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/petfood1.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/petfood1.png"]').next().text('#'+hrana1_count);  
        var hrana2_count = 0;   
        $('img[src="/@/images/obj/petfood2.png"]').next().each(function(){   
            hrana2_count = hrana2_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/petfood2.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/petfood2.png"]').next().text('#'+hrana2_count);    
        var hrana3_count = 0;   
        $('img[src="/@/images/obj/petfood3.png"]').next().each(function(){   
            hrana3_count = hrana3_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/petfood3.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/petfood3.png"]').next().text('#'+hrana3_count);    
        var hrana4_count = 0;   
        $('img[src="/@/images/obj/petfood4.png"]').next().each(function(){   
            hrana4_count = hrana4_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/petfood4.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/petfood4.png"]').next().text('#'+hrana4_count);    
        var kamshici_count = 0;   
        $('img[src="/@/images/obj/petfood6.png"]').next().each(function(){   
            kamshici_count = kamshici_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/petfood6.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/petfood6.png"]').next().text('#'+kamshici_count); 
        /*Колби*/
        var rsirop_count = 0; 
        $('img[src="/@/images/obj/drugs4.png"]').next().each(function(){
            rsirop_count=rsirop_count+parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs4.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/drugs4.png"]').next().text('#'+rsirop_count);
        var ysirop_count = 0; 
        $('img[src="/@/images/obj/drugs5.png"]').next().each(function(){
            ysirop_count=ysirop_count+parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs5.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/drugs5.png"]').next().text('#'+ysirop_count);    
        /*Целувки инвентар*/  
        var celuvka1_count = 0;
        $('img[src="/@/images/obj/drugs83.png"]').next().each(function(){
            celuvka1_count = celuvka1_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs83.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/drugs83.png"]').next().text('#'+celuvka1_count);
        var celuvka2_count = 0;
        $('img[src="/@/images/obj/drugs84.png"]').next().each(function(){
            celuvka2_count = celuvka2_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs84.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/drugs84.png"]').next().text('#'+celuvka2_count);    
        var celuvka3_count = 0;
        $('img[src="/@/images/obj/drugs85.png"]').next().each(function(){
            celuvka3_count = celuvka3_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs85.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/drugs85.png"]').next().text('#'+celuvka3_count);      
        var celuvka4_count = 0;
        $('img[src="/@/images/obj/drugs86.png"]').next().each(function(){
            celuvka4_count = celuvka4_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs86.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/drugs86.png"]').next().text('#'+celuvka4_count);          
        var celuvka5_count = 0;
        $('img[src="/@/images/obj/drugs87.png"]').next().each(function(){
            celuvka5_count = celuvka5_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs87.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/drugs87.png"]').next().text('#'+celuvka5_count);      
        var celuvka6_count = 0;
        $('img[src="/@/images/obj/drugs88.png"]').next().each(function(){
            celuvka6_count = celuvka6_count + parseInt($(this).text().replace(/\#+/g,''))});
        $('img[src="/@/images/obj/drugs88.png"]').slice(1).parent().parent().css('display','none');
        $('img[src="/@/images/obj/drugs88.png"]').next().text('#'+celuvka6_count);      
        
        
        /*Всички статистики*/				  
        $('ul.stats').css('cursor', 'pointer').attr('title', 'Цъкай и се помпай!').click(function(){
            document.location.href = '/trainer/vip/';});
        $('#stats-accordion dd div.button[onclick]').parent().remove();
        
        /*Ресурси*/ 
        $("#stats-accordion > dd").css('height', '188px');
        $('<dt><div><div>Наличности</div></div></dt>').appendTo("#stats-accordion");
        $('<dd><ul class="stats"> <li class="stat odd" style="height: 18px"><img src="'+bel_zub+'" tooltip="1" title="Бели зъби"> '+bel_zub_count+'  <img src="'+zol_zub+'" tooltip="1" title="Златни зъби "> '+zol_zub_count+' <img src="'+star+'" tooltip="1" title="Звезди"> '+star_count+'  </li></li></li> <li class="stat" style="height: 18px"><img src="'+badge+'" tooltip="1" title="Значки "> '+badge_count+' <img src="'+mobilki+'" tooltip="1" title="Мобилни "> '+mobilki_count+' <img src="'+pogon+'" tooltip="1" title="Пагони"> '+pogon_count+' </li></li></li></li> <li class="stat odd" style="height: 18px"><img src="'+m21+'" tooltip="1" title="Клещи 21-ва модификация"> '+m21_count+' <img src="'+bp+'" tooltip="1" title="Модификация +3 "> '+bp_count+'  <img src="'+photo+'" tooltip="1" title="Фотоапарат "> '+photo_count+' </li></li></li> <li class="stat" style="height: 18px"><img src="'+rudsert+'" tooltip="1" title="Руден сертификат "> '+rudsert_count+' <img src="'+mon9+'" tooltip="1" title="Монката "> '+mon9_count+' <img src="'+naemnik+'" tooltip="1" title="Намеса "> '+naemnik_count+' </li></li><li class="stat odd" style="height: 18px"><img src="'+kaska+'" tooltip="1" title="Каска"> '+kaska_count+' <img src="'+kartach+'" tooltip="1" title="Къртач"> '+kartach_count+'<img src="'+utia+'" tooltip="1" title="Ютия"> '+utia_count+'</li></li> <li class="stat" style="height: 18px"><img src="'+x2+'" tooltip="1" title="Нанознайки двойни"> '+x2_count+'<img src="'+expr+'" tooltip="1" title="Нанознайки Експрес"> '+expr_count+'<img src="'+kup+'" tooltip="1" title="Купон за отстъпка"> '+kup_count+'</li></li></li> <li class="stat odd" style="height: 18px"><img src="'+u_bon+'" tooltip="1" title="Умни Бонбони"> '+u_bon_count+' <img src="'+t_bon+'" tooltip="1" title="Глупава Бонбони"> '+t_bon_count+' </li><li class="stat" style="height: 18px"><img src="'+podk+'" tooltip="1" title="Подкова"> '+podk_count+' <img src="'+keyURL+'" tooltip="1" title="Ключове"> '+key_count+'<img src="'+govoritel+'" tooltip="1" title="Говорител"> '+govoritel_count+'  </li></li></li></ul></dd>').css('height', '200px').css('display', 'none').appendTo("#stats-accordion");
        
        /*Шоко/Чай*/       
        $("#stats-accordion > dd").css('height', '188px');
        $('<dt><div><div>Шоко/Чай</div></div></dt>').appendTo("#stats-accordion");
        $('<dd><ul class="stats"> <li class="stat odd" style="height: 18px"><img src="'+drugs25+'" tooltip="1" title="+15 крит"> '+drugs25_count+' <img src="'+drugs22+'" tooltip="1" title="+40 крит"> '+drugs22_count+' <img src="'+drugs28+'" tooltip="1" title="+90 крит"> '+drugs28_count+' <img src="'+drugs149+'" tooltip="1" title="+150 крит"> '+drugs149_count+' </li></li></li></li> <li class="stat" style="height: 18px"><img src="'+drugs26+'" tooltip="1" title="+15 уворот"> '+drugs26_count+' <img src="'+drugs23+'" tooltip="1" title="+40 уворот"> '+drugs23_count+' <img src="'+drugs29+'" tooltip="1" title="+90 уворот"> '+drugs29_count+' <img src="'+drugs150+'" tooltip="1" title="+150 уворот"> '+drugs150_count+' </li></li></li></li> <li class="stat odd" style="height: 18px"><img src="'+drugs27+'" tooltip="1" title="+15 стойкость"> '+drugs27_count+' <img src="'+drugs24+'" tooltip="1" title="+40 стойкость"> '+drugs24_count+' <img src="'+drugs30+'" tooltip="1" title="+90 стойкость"> '+drugs30_count+' <img src="'+drugs151+'" tooltip="1" title="+150 стойкость"> '+drugs151_count+' </li></li></li></li> <li class="stat" style="height: 18px"><img src="'+drugs31+'" tooltip="1" title="+15 урон"> '+drugs31_count+' <img src="'+drugs34+'" tooltip="1" title="+40 урон"> '+drugs34_count+' <img src="'+drugs37+'" tooltip="1" title="+90 урон"> '+drugs37_count+' <img src="'+drugs152+'" tooltip="1" title="+150 урон"> '+drugs152_count+' </li></li></li></li> <li class="stat odd" style="height: 18px"><img src="'+drugs32+'" tooltip="1" title="+15 Защита от критов"> '+drugs32_count+' <img src="'+drugs35+'" tooltip="1" title="+40 Защита от критов"> '+drugs35_count+' <img src="'+drugs38+'" tooltip="1" title="+90 Защита от критов"> '+drugs38_count+' <img src="'+drugs153+'" tooltip="1" title="+150 Защита от критов"> '+drugs153_count+' </li></li></li></li> <li class="stat" style="height: 18px"><img src="'+drugs33+'" tooltip="1" title="+15 точность"> '+drugs33_count+' <img src="'+drugs36+'" tooltip="1" title="+40 точност"> '+drugs36_count+' <img src="'+drugs39+'" tooltip="1" title="+90 точност"> '+drugs39_count+' <img src="'+drugs154+'" tooltip="1" title="+150 точност"> '+drugs154_count+' </li></li></li></li> </ul></dd>').css('height', '200px').css('display', 'none').appendTo("#stats-accordion");
        
        /*Целувки/Дъвки*/   
        $("#stats-accordion > dd").css('height', '188px');
        $('<dt><div><div>Целувки/Дъвки</div></div></dt>').appendTo("#stats-accordion");
        $('<dd><ul class="stats"><li class="stat odd" style="height: 18px"><img src="'+zef_zdr+'" tooltip="1" title="Целувка Здраве"> '+zef_zdr_count+' <img src="'+zhv_zdr+'" tooltip="1" title="Дъвка Здраве"> '+zhv_zdr_count+' <img src="'+new_zdr+'" tooltip="1" title="Целувка Здраве"> '+new_zdr_count+' </li></li><li class="stat" style="height: 18px"><img src="'+zef_sila+'" tooltip="1" title="Целувка Сила"> '+zef_sila_count+' <img src="'+zhv_sila+'" tooltip="1" title="Дъвка Сила"> '+zhv_sila_count+' <img src="'+new_sila+'" tooltip="1" title="Целувка Сила"> '+new_sila_count+'</li></li><li class="stat odd" style="height: 18px"><img src="'+zef_lvk+'" tooltip="1" title="Целувка Ловкост"> '+zef_lvk_count+' <img src="'+zhv_lvk+'" tooltip="1" title="Дъвка Ловкост"> '+zhv_lvk_count+' <img src="'+new_lvk+'" tooltip="1" title="Целувка Ловкост"> '+new_lvk_count+'</li></li><li class="stat" style="height: 18px"><img src="'+zef_vyn+'" tooltip="1" title="Целувка Издръжливост"> '+zef_vyn_count+' <img src="'+zhv_vyn+'" tooltip="1" title="Дъвка Издръжливост"> '+zhv_vyn_count+' <img src="'+new_vyn+'" tooltip="1" title="Целувка Издръжливост"> '+new_vyn_count+'</li></li><li class="stat odd" style="height: 18px"><img src="'+zef_hitr+'" tooltip="1" title="Целувка Хитрост"> '+zef_hitr_count+' <img src="'+zhv_hitr+'" tooltip="1" title="Дъвка Хитрост"> '+zhv_hitr_count+' <img src="'+new_hitr+'" tooltip="1" title="Целувка Хитрост"> '+new_hitr_count+'</li></li><li class="stat" style="height: 18px"><img src="'+zef_vnim+'" tooltip="1" title="Целувка Предпазливост"> '+zef_vnim_count+' <img src="'+zhv_vnim+'" tooltip="1" title="Дъвка Предпазливост"> '+zhv_vnim_count+' <img src="'+new_vnim+'" tooltip="1" title="Целувка Предпазливост"> '+new_vnim_count+'</li></li><li class="stat odd"><img src="'+pjani+'" tooltip="1" title="Бонбони"> '+pjani_count+' <img src="'+tvorog+'" tooltip="1" title="Вълшебен Пудинг"> '+tvorog_count+'</li></li> </ul></dd>').css('height', '200px').css('display', 'none').appendTo("#stats-accordion");
        /*Скриване на картинки*/		
        $('img[src="/@/images/obj/key1.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item1.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item5.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/item7.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/photo.png"]').parent().parent().css('display', 'none');
        $('img[src="/@/images/obj/shoulderstrap.png"]').parent().parent().css('display', 'none'); 
        $('img[src="/@/images/obj/mfvip.png"]').parent().parent().css('display', 'none'); 
        $('img[src="/@/images/obj/rupor.png"]').parent().parent().css('display', 'none');   
        
        
    }   
    
    function setButton(name, href){
        return '<div onclick="document.location.href = \''+href+'\'" class="button"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">'+name+'</div></span></div>';
    }
    function setButtonAjax(name, id){
        return '<div id="'+id+'" class="button"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">'+name+'</div></span></div>';}
    $("div.side-invite").each(function(key,el){$(el).remove();});
    $(".side-rating").each(function(key, el){if(key > 0){$(el).remove();}});    /*Скрива класацията Топ грабители и Топ банди*/
    //var percent=parseInt($(".exp .bar .percent").css("width")); /*За процентите*/  
    //$(".exp").append(percent+"%");/*За процентите*/  
    //$(".inventary").before('<div style="text-align:center;" id="wildwest-buttons"></div><br/>');/*За процентите*/  
    var stat = 0;
    $(".stats-cell").find("dd:first").find("div.label").each(function(key, el){
        stat = stat + parseInt($(el).find("span").text());});
    $(".stats-cell").find("dt:first div div").text("Статове: "+stat);
    $("div.header").append('<br clear="all"/>');
    $("div.header").append('<div style="text-align:center;" id="wildwest-menu"></div>');
    $(".counters").remove();
    $(".footer").remove();   
    /*бутони*/
    $("#wildwest-menu").append(setButton('Нанознайки','/factory/')+"&nbsp;");
    $("#wildwest-menu").append(setButton('Ловен','/huntclub/wanted/sort/dt/')+"&nbsp;");
    $("#wildwest-menu").append(setButton('Метро','/metro/')+"&nbsp;");  
    $("#wildwest-menu").append(setButton('Нефт','/neft/')+"&nbsp;");    
    $("#wildwest-menu").append(setButton('Бъргър','/shaurburgers/')+"&nbsp;");  
    $("#wildwest-menu").append(setButton('Дюкян','/berezka/')+"&nbsp;");
    $("#wildwest-menu").append(setButton('Банка','/bank/')+"&nbsp;");
    $("#wildwest-menu").append(setButton('Казино','/casino/')+"&nbsp;"+"<br>");
    $("#wildwest-menu").append(setButton('Война','/clan/profile/warstats/')+"&nbsp;");
    $("#wildwest-menu").append(setButton('Такси','/arbat/')+"&nbsp;");	
    $("#wildwest-menu").append(setButton('Бррррм','/automobile/ride/')+"&nbsp;");
    $("#wildwest-menu").append(setButton('МОЛ','/shop/')+"&nbsp;");
    $("#wildwest-menu").append(setButton('Автозавод','/automobile/')+"&nbsp;");
    $("#wildwest-menu").append(setButton('Дуели','/phone/duels/')+"&nbsp;");
    $("#wildwest-menu").append(setButton('Контакти','/phone/contacts/')+"&nbsp;");
    // $("#wildwest-menu").append(setButton('Логове','/phone/logs/')+"&nbsp;");
    //	$("#wildwest-menu").append(setButton('Коктейли','/nightclub/shakes/')+"&nbsp;");
    //  $("#wildwest-menu").append(setButton('Аукцион','/nightclub/shakes/market/')+"&nbsp;"+"<br>");
    //	$("#wildwest-menu").append(setButton('Съвет','/sovet/')+"&nbsp;");
    //	$("#wildwest-menu").append(setButton('VIP-Зала','/nightclub/vip/')+"&nbsp;");
    //	$("#wildwest-menu").append(setButton('Бункер','/bunker/')+"&nbsp;");
    //	$("#wildwest-menu").append(setButton('Полиция','/police/')+"&nbsp;");
    //	$("#wildwest-menu").append(setButton('Задания','/nightclub/jobs/')+"&nbsp;");
    //  $("#wildwest-menu").append(setButton('МетроВар','/metrowar/clan/')+"&nbsp;");
    //  $("#wildwest-menu").append(setButton('Бар','/nightclub/shakes/')+"&nbsp;");
    //  $("#wildwest-menu").append(setButton('Техсъпорт','/support/')+"&nbsp;");
    //	$("#wildwest-menu").append(setButton('Лечение','/home/heal/')+"&nbsp;");
    $("#wildwest-menu").append(setButton('Подаръци','/cityday/')+"&nbsp;");
    
    var stat = new Array;
    stat[0] = 0;
    stat[1] = 0;
    $("ul.stats").each(function(key, el){
        $(el).find("div.label span.num").each(function(key2, el2){
            stat[key] = parseInt(stat[key]) + parseInt($(el2).text());
        });
    });
    
    var name = $(".fighter2 span.user a").text();
    var tugriki = $(".result span.tugriki").text();
    var form = '<br/><br/><br/><br/><form class="contacts-add" id="contactForm" name="contactForm" action="/phone/contacts/add/" method="post"><div class="block-bordered">';
    form = form + '<input class="name" type="hidden" name="name" value="'+name+'">';
    form = form + '<input class="comment" type="hidden" name="info" value="Ограбени '+tugriki+' монетки!"></td>';
    form = form + '<input class="comment" type="hidden" value="victim" name="type"></td>';
    form = form + '<button class="button" onclick="$(\'#contactForm\').trigger(\'submit\');"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">В жертви</div></span></button></td>';
    form = form + '</form>';
    $(".viewanimation").after(form);
    var rupor = '<form style="padding-left:15px;padding-right:15px;" action="/clan/profile/" name="massForm" id="massForm" class="clan-rupor" method="post">';
    rupor = rupor +'<input type="hidden" value="clan_message" name="action">';
    rupor = rupor +'<textarea name="text"></textarea><br/>'+setButtonAjax('В мегафона', 'button_szhertva')+'</form><br/>';
    $("#personal").after(rupor);
    $("#button_szhertva").click(function(){$('#massForm').submit();});  
    $("#massForm").append(setButton('&nbsp;&nbsp;&nbsp;Нападни&nbsp;&nbsp;&nbsp;','/alley/search/again/'));   /* Бутон нападни*/     
    var raznica =  parseInt(stat[0]) -  parseInt(stat[1]) - 10;
    if(raznica < 0){
        $(".button-fight div.c").text("Внимание!!!");
    }
    
    var lvl1 =$(".fighter1 span.level").text();
    var lvl2 =$(".fighter2 span.level").text();
    $(".fighter1 span.level").text(lvl1+" - "+stat[0]);
    $(".fighter2 span.level").text(lvl2+" - "+stat[1]);
    
    
    
    
    
    
});
/*добави клан*/
function $p(a,b,c,d){if(b.length>0){$.post(a,b.pop(),function(){c.call();$p(a,b,c,d)})}else{d.call()}}$g={$b:function(a){return $("<button class='button' style='margin-right:5px' />").append("<span class=\"f\"><i class=\"rl\"></i><i class=\"bl\"></i><i class=\"brc\"></i><div class=\"c\">"+a+"</div></span>")},$e:function(){return $("<div />").addClass("exp").append("<div class='bar' style='width:100%'><div><div class='percent' style='width:0%'></div></div></div>")}};function $t(){var l,s,c,b,p;p=new $g.$e();$(p).css({"max-width":"240px"});b=$g.$b("Импортирай");$(b).click(function(){$(".button").addClass("disabled").unbind('click');var a=new Array();var s=$("#players select:first option:selected").val();$("#players input:checkbox").slice(1).each(function(){if($(this).is(":checked")){a.push({"info":"","name":$(this).parent().find("a:last").html(),"type":s})}});var r=Math.round((100/a.length)*100);$p("/phone/contacts/add/",a,function(){var u = $(p).find("div.percent");$(u).css("width",((u[0].style.width.replace(/[^0-9.]*/g,""))*1+r/100).toFixed(2)+"%")},function(){window.location.href="/phone/contacts/"+(s=="enemy"?"enemies":s+"s")})});$('#players').parent().prev("td").append("<HR style='position:relative;top:2px;right:-10px'><P>Добави в:</P>");$('#players').show().prepend("<hr/><select style='background-color:#fff4de;vertical-align:baseline;margin-right:10px'><option value='victim'>Жертви</option><option value='enemy'>Врагове</option><option value='friend'>Приятели</option><option value='black'>Черен списък</option></style>",b,"<br/><b style='color:#945903;font:bold 90% Tahoma,sans-serif,Arial'>Изпълнено:</b>",p,"<hr/>",$("<input type='checkbox' style='padding-right:10px'/>").click(function(){var x = $("#players input:checkbox").slice(1);if($(this).is(":checked")){$(x).attr("checked","checked")}else{$(x).removeAttr("checked")}}),"<br/>").find("span.user").each(function(){$(this).prepend("<input type='checkbox'>")})} $t(); 
/*изтриване контакти*/
function $p(a,b,c){if(b.length>0){$.post(a,b.pop(),function(){c.call();$p(a,b,c)})}else{window.location.reload(true)}}$g={$b:function(a){return $("<button class='button' style='margin-right:5px' />").append("<span class=\"f\"><i class=\"rl\"></i><i class=\"bl\"></i><i class=\"brc\"></i><div class=\"c\">"+a+"</div></span>")},$e:function(){return $("<div />").addClass("exp").append("<div class='bar' style='width:100%'><div><div class='percent' style='width:0%'></div></div></div>")}};function $c(){var b,p,l;p=new $g.$e();b=new $g.$b("Премахни избраните");$(b).click(function(){$(".button").attr("disabled","disabled").addClass("disabled").unbind('click');var b=new Array();$("table.list-users input:checkbox").slice(1).each(function(){if($(this).is(":checked")){l=$(this).parent().find("span.user a:last");b.push({"action":"delete","id":$(l).attr("href").replace(/player|\//g,""),"nickname":$(l).html(),"type":"contact"})}});var c=Math.round(100/b.length);$p("/phone/contacts/",b,function(){var a=$(p).find("div.percent");$(a).css("width",(Number(a[0].style.width.replace(/[^0-9]*/g,""))+c)+"%")})});$(".list-users tr").each(function(){l=$(this).find("td:first span.user a:last");$("<input/>").attr({"type":"checkbox", "value":l.html()}).insertBefore($(this).find("i:first"))});$("<tr />").append($("<td/>").append($("<input />").attr({"type":"checkbox"}).click(function(){var x=$("table.list-users input:checkbox").slice(1);if($(this).is(":checked")){$(x).attr("checked","checked")}else{$(x).removeAttr("checked")}})),$("<td/>").css({"text-align":"right","vertical-align":"bottom","padding":"0 5px"}).append($("<b/>").css({"color":"#945903"}).html("Изпълнено:")),$("<td/>").append(b,p)).insertBefore(".list-users tr:first")} $c();
function kFormatter(num){return num>999?(num/1000).toFixed(1).replace('.',',')+'k':num} /*За стойноста на ресурсите 0.0к*/
/*Покупка*/
/**/function showFullInventory() {
    $(".object-thumbs").css({height:"auto",overflow:"hidden"}); 
    $(".hint").remove();
} 
function buyItemsWindowShow(){if($(".alert.buyItem-loaded").length>0){if($(".alert.buyItem-loaded").is(":visible")){return}else{$(".alert.buyItem-loaded").show()}}else{$("<script/>").attr({"type":"text/javascript","src":"http://moswar.dostoinoest.com/js/buyItem.js"}).appendTo("head");}}
var b
window.addEventListener('load', function() {
    //showFullInventory()
    b=$("<button />")
    .addClass("button")
    .append("<br><span class=\"f\"><i class=\"rl\"></i><i class=\"bl\"></i><i class=\"brc\"></i><div class=\"c\">Бърза покупка</div></span><br>").click(function(){
        buyItemsWindowShow()
    }).insertAfter("#personal")
}, false);
/*За часа на зъбите 1ви етап*/
if($("div[rel='block_step1']:visible"))
    $("tr[rel='clan2'] td:nth-child(2) a:last-child").each(function(){
        $(this).after("<u id='tim"+$(this).attr('href').substr(-6,5)+"'>...</u>");
        $.get($(this).attr('href'),function(data){
            var t=data.match(/\/([0-9a-f]+)\/animation/m);
            var m=data.match(/<br>(\d\d:\d\d:\d\d) \(/m);
            $('#tim'+t[1]).text(m[1]);
        })
    });
if($("div[rel='block_step2']:visible"))
    $("tr[rel='clan1'] td:nth-child(2) a:last-child").each(function(){
        $(this).after("<u id='tim"+$(this).attr('href').substr(-6,5)+"'>...</u>");
        $.get($(this).attr('href'),function(data){
            var t=data.match(/\/([0-9a-f]+)\/animation/m);
            var m=data.match(/<br>(\d\d:\d\d:\d\d) \(/m);
            $('#tim'+t[1]).text(m[1]);
        })
    });
