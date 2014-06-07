// ==UserScript==
// @name           Eveil Kryptos Report import Script
// @description    Eveil Kryptos Report import Script 
// @author         PyPe
// @include        http://fr4.grepolis.com/*
// @version	1.2.9
// @history	1.2.9   Compatibilité v2 (uniquement envoi des rapports)
// @history	1.2.8   mise en commentaire de l'autoupdater sous chrome
// @history	1.2.7	ajout des rapports en percée, correction du bug sous firefox pour voir les compos des villes
// @history	1.2.6	nouvel onglet de visualisation des compos, disponible partout (forum, message, map ...)
// @history	1.2.5	amélioration de l'affichage des unités
// @history	1.2.4	accès aux infos kryptos d'une ville depuis la fiche de la ville
// @history	1.2.3	accès aux infos kryptos depuis le profil d'un joueur
// @history	1.2.2	rapport d'espionnage
// @history	1.2.1	Script autoupdater
// @history	1.2.0	Ajout des rapport de soutien
// @history	1.1.0	Compatibilité firefox
// @history	1.0.0	Ajout des rapport d'attaque : Chrome
// ==/UserScript==

if (true)
{
var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
   function evl_ajaxComplete(e, xhr, settings) {\
		var url=settings.url.split(/&/)[0];\
		if (url=='/game/report?action=view' && settings.type=='GET') {\
			WndKryptos();\
		}\
	};\
	$('body').ajaxComplete(evl_ajaxComplete);\
	\
"));
document.body.appendChild(scriptEl);

var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\
	function decode64(input) {\
     var output = '';\
     var chr1, chr2, chr3 = '';\
     var enc1, enc2, enc3, enc4 = '';\
     var i = 0;\
	 var base64test = /[^A-Za-z0-9\+\/\=]/g;\
     if (base64test.exec(input)) {\
        alert('There were invalid base64 characters in the input text.Expect errors in decoding.');\
     }\
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');\
     do {\
        enc1 = keyStr.indexOf(input.charAt(i++));\
        enc2 = keyStr.indexOf(input.charAt(i++));\
        enc3 = keyStr.indexOf(input.charAt(i++));\
        enc4 = keyStr.indexOf(input.charAt(i++));\
        chr1 = (enc1 << 2) | (enc2 >> 4);\
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);\
        chr3 = ((enc3 & 3) << 6) | enc4;\
        output = output + String.fromCharCode(chr1);\
        if (enc3 != 64) {\
           output = output + String.fromCharCode(chr2);\
        }\
        if (enc4 != 64) {\
           output = output + String.fromCharCode(chr3);\
        }\
        chr1 = chr2 = chr3 = '';\
        enc1 = enc2 = enc3 = enc4 = '';\
		} while (i < input.length);\
     return unescape(output);\
  }\
	\
"));
document.body.appendChild(scriptEl);

var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
function sendEveilReport(event){\
	var report_sending_town = $('#report_sending_town > ul > .town_name > a').attr('href');\
	if(report_sending_town != null){\
            report_sending_town = decode64(report_sending_town.substring(1,report_sending_town.length));\
            report_sending_town = JSON.parse(report_sending_town);\
            var report_sending_town_id = report_sending_town.id;\
	}\
	var report_receiving_town = $('#report_receiving_town > ul > .town_name > a').attr('href');\
	\
	if(report_receiving_town!=null){\
            report_receiving_town = decode64(report_receiving_town.substring(1,report_receiving_town.length));\
            report_receiving_town = JSON.parse(report_receiving_town);\
            var report_receiving_town_id = report_receiving_town.id;\
	}\
	\
	var report_type_img = $('#report_arrow > img').attr('src');\
	if(report_type_img != null){\
	var reg = new RegExp('([a-zA-Z]+).png');\
	var matches = reg.exec(report_type_img);\
	var report_type=matches[1];\
	}\
\
	var unitsArr = '{';\
	var reportDate = $('#report_date').html();\
	if(report_type=='attack'){\
\
            unitsArr += '\"att_units\":{\"had\":{';\
			$('.report_side_attacker_unit > .report_side_attacker').each(function(i){\
                    console.debug($(this));\
                    $(this).removeClass('unit report_unit report_side_attacker');\
                    unitsArr += '\"'+$(this).attr('class').replace('unit_','')+'\":\"'+$(this).children('.bold').html()+'\",';\
                   $(this).addClass('unit report_unit report_side_attacker');\
		});\
            \
            unitsArr = unitsArr.substring(0,unitsArr.length-1);\
            unitsArr += '},\"lost\":{';\
            $('.report_side_attacker_unit > .report_side_attacker').each(function(i){\
                   $(this).removeClass('unit report_unit report_side_attacker');\
			unitsArr += '\"'+$(this).attr('class').replace('unit_','')+'\":\"'+$(this).next('.report_losts').html()+'\",';\
                   $(this).addClass('unit report_unit report_side_attacker');\
		});\
            unitsArr = unitsArr.substring(0,unitsArr.length-1);\
            unitsArr += '}},';\
            unitsArr += '\"def_units\":{\"had\":{';\
            $('.report_side_defender_unit > .report_side_defender').each(function(i){\
		$(this).removeClass('report_unit unit report_side_defender');\
                 if( $(this).children('.bold').html()!='?' ){\
				 unitsArr += '\"'+$(this).attr('class').replace('unit_','')+'\":\"'+$(this).children('.bold').html()+'\",';\
                 }\
                $(this).addClass('unit report_unit report_side_defender');\
		});\
            unitsArr = unitsArr.substring(0,unitsArr.length-1);\
           unitsArr += '},\"lost\":{';\
            $('.report_side_defender_unit > .report_side_defender').each(function(i){\
                $(this).removeClass('report_unit unit report_side_defender');\
                 if( $(this).children('.bold').html()!='?' ){\
			unitsArr += '\"'+$(this).attr('class').replace('unit_','')+'\":\"'+$(this).next('.report_losts').html()+'\",';\
                 }\
                 $(this).addClass('unit report_unit report_side_defender');\
		});\
            unitsArr = unitsArr.substring(0,unitsArr.length-1);\
            unitsArr += '}}}';\
		var units = unitsArr;\
	}\
	else if(report_type=='support'){\
		$('.report_unit').each(function(i){\
		unitsArr += '\"'+$(this).attr('class').replace('report_unit unit_','')+'\":\"'+$(this).children('.place_unit_black').html()+'\",';\
		});\
		var units = unitsArr.substring(0,unitsArr.length-1)+'}';\
	}\
	else if(report_type=='espionage'){\
		$('.report_unit').each(function(i){\
		if($(this).parent('#left_side')){\
			 unitsArr += '\"'+$(this).attr('class').replace('report_unit unit_','').replace('report_unit ','').replace('spy','')+'\":\"'+$(this).children('.place_unit_black').html()+'\",';\
			 }\
		});\
		var units = unitsArr.substring(0,unitsArr.length-1)+'}';\
	}\
		$.get('http://peret.info/eveil/ajaxer.php',\
		{\
		action:'reportFromGrepo',\
		units : units,\
		reportDate : reportDate,\
		sending_town : report_sending_town_id,\
		receiving_town : report_receiving_town_id,\
		reporter_id: Game.player_id,\
		report_type: report_type\
		},function(data){\
		   alert(data);\
		   }\
		);\
}\
"));
document.body.appendChild(scriptEl);

var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
	\
	function WndKryptos(){\
	var pPNG = 'data:image/png;base64,';\
	var btn_Eveil='iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAMAAAA4Nk+sAAAAAXNSR0IArs4c6QAAAftQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADxssDxwtEB0uEB0vEB0wEB4vEB4wEB8xEiI2EiI3EyM4EyQ6FCY8FCY9FSY9FSdAFShAFihBFipDFypEFytEFytFGCxGGCxIGC1JGS5JGS5KGS5LGS9MGi9NGjBMGjBNGjBOGzJQGzJRGzNSHDNSHDRTHDRUHDVUHDVVHTVWHTZWHTZXHTZYHjdZHjhZHjhaHzlcHzpdHzpeIDtfIDxgIT1hIT1iIT1jIT5kIj5kIj9lI0FoI0FpJENrJENsJURtJURuJkZxJ0h0J0l1KEt4KUx6Kk59K1CBLFKDLlaLL1eMMCsdMC0iMFmPMVuSMi8jMjAmMjEoMl2VMzIpNTEmNTMoNTYvOWqqOmyuPHCzPHC0QT8zSj8lS05HVk43WEcjWWl/WWuCWmyEW22GXG+IXHGLXXGMYHeVYXqaa1IefmEkg2QlhG06imknj20okolwmXUrmnYsoIFBrIQxrYQxr4Uys4ozt447upRHvp1bvp5cwMbOwZM3wsnTwsrVw5U3w6lww8zYxM3ZxtHfx9PiyNbnyraKytjry9ruz5470aFA0qND0qRF06VH06ZJ2Nzh2rNj3bpz3pod4MB/48eM5MiO5cmR5cuU67FI7r1k78Ju8ch888+N9tyt3MogXQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wQBCxUk/vJqzQAAAVFJREFUKM91kUtPwkAUhVnirS9EN6gYMboYahQNY22VMhhJDRofcSELN6grqc/F/INGE1+DO5Ouhk75mc5MiRvkJJNJTk6+c29uKjVEYRjyqCd4N+KhkB/ncSxtDgMSKg0/wXun8/XxEgRv35/B6zVE2n4myL28ap1X80vNmwY+1mkO7aM6Y7SvFl7rQ3zTOzAZtS03x+jpxRxwnX5EqN5glDilQoURb1PbAh7Mkx2XUdPBZq22787qygjuqmdYQojHqJNf2F3U6Rj8ckVZSjZCZB7UOj14sizXVpWMYguhLHQ1xJdlJKlEJVxc1nYMt+s1xVaVCK3ubWh2BO2ETbzDbckihf6W9wnbtcs5TCma1gNKCHH+dqe4mFQK8BXb2ZIvL9nlGZ0WsGJMZSeNsYlMJmMYxui4tv85g1qnG0uJSF1NiLgXcx6pSdIjA0oPu/svwGeA5hNWT7QAAAAASUVORK5CYII%3D';\
	var report_sending_town = '';\
	msgb = $('#report_date').parent();\
	cBt = document.createElement('A');\
	cBt.setAttribute('href','javascript:void(0);');\
	cBt.setAttribute('style','float:right');\
	cBt.setAttribute('class','button');\
	/*cBt.addEventListener('click', sendEveilReport, false);*/\
	cBt.innerHTML = '<span class=\"left\"><span class=\"right\"><span class=\"middle\" id=\"eveilBtn\" style=\"min-width:50px\">Eveil</span></span></span>';\
	msgb.append(cBt);\
	$('#eveilBtn').bind('click',sendEveilReport);\
}\
"));
document.body.appendChild(scriptEl);


}