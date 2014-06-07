// ==UserScript==
// @name           Tatoeba Merge Log with Comments
// @namespace      Jakob V. <jakov@gmx.at>
// @description    Places the log entries between the respective comments chronologically
// @include        http://anonymouse.org/cgi-bin/anon-www_de.cgi/http://tatoeba.org/*
// @include        http://tatoeba.org/*
// @require        http://code.jquery.com/jquery-1.5.js
// ==/UserScript==

$(document).ready(function(){
	GM_log('ready');
	$changes = $(".annexeLogEntry");
	$changes.each(function(){
		text = $(this).find('div:first ').text().split('-').pop().trim();
		console.log(text);
		textdate_arr = text.match(/(\w{3}) (\d{1,2})\w+? (\d\d\d\d), (\d\d):(\d\d)/);
		if(textdate_arr){
				months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				date = new Date(1*textdate_arr[3],1*months_arr.indexOf(textdate_arr[1]),1*textdate_arr[2],1*textdate_arr[4],1*textdate_arr[5]);
				console.log(date);
		}
		else{
				languages_arr = [
					/deu|vor (\d+) Minuten|vor (\d+) Stunde\(n\)|vor (\d+) Tag\(en\)|(Datum unbekannt)/,
					/eng|(\d+) mn ago|(\d+) hour\(s\) ago|(\d+) day\(s\) ago|(date unknown)/,
					/spa|hace (\d+) minutos|hace (\d+) hora\(s\)|hace (\d+) día\(s\)|(fecha desconocida)/,
					/epo|antau (\d+) minutoj|antaŭ (\d+) horo\(j\)|antaŭ (\d+) tago\(j\)|(dato nekonata)/,
					/eus|duela (\d+) hilabete|duela (\d+) ordu|duela (\d+) egun|(Data, eguna, ezezaguna)/,
					/fre|il y a (\d+) mn|il y a (\d+) heure\(s\)|il y a (\d+) jour\(s\)|(date inconnue)/,
					/ita|(\d+) minuto\/i fa|(\d+) ora\/e fa|(\d+) giorno\/i fa|(data sconosciuta)/,
					/hun|(\d+) perce|(\d+) órája|(\d+) nappal ezelőtt|(ismeretlen dátum)/,
					/nds|vör (\d+) Minuten|vör (\d+) Stünn\(en\)|vör (\d+) Daag|(Datum nich kennt)/,
					/pol|(\d+) minut temu|(\d+) godzin temu|(\d+) dni temu|(data nieznana)/,
					/pt_BR|(\d+) minuto\(s\) atrás|(\d+) hora\(s\) atrás|(\d+) dias\(s\) atrás|(Data desconhecida)/,
					/tgl|(\d+) minuto nakaraan|(\d+) oras nakaraan|(\d+) araw nakaraan|(Hindi tiyak ang petsa)/,
					/tur|(\d+) dakika önce|(\d+) saat önce|(\d+) gün önce|(tarih bilinmiyor)/,
					/rus|(\d+) мин. назад|(\d+) ч. назад|(\d+) д. назад|(дата неизвестна)/,
					/ara|منذ (\d+) دقيقة \(دقائق\)|منذ (\d+) ساعة \(ساعات\)|منذ (\d+) يوم \(أيام\)|(التاريخ غير معروف)/,
					/chi|(\d+)分钟前|(\d+)小时前|(\d+)天前|(未知日期)/,
					/jpn|(\d+)分前|(\d+)時間前|(\d+)日前|(日付不明)/,
				];
				$.each(languages_arr, function(ind, val){
						textdate_arr = text.match(val);
							if(textdate_arr){
								console.log(textdate_arr);
								if(textdate_arr[4]){
									date = new Date(0);
								}
								else {
									date = new Date(new Date()-(textdate_arr[1]||0)*60*1000-(textdate_arr[2]||0)*60*60*1000-(textdate_arr[3]||0)*24*60*60*1000);
								}
								console.log(date);
							}
				});
		}
	});
});