// ==UserScript==
// @name        pma-timestamp-rechner
// @namespace   wktools.net
// @description Berechnet aus Timestamp-Spalten bei SQL-abfragen Datum und Uhrzeit und zeigt diese als Title an
// @include     *phpMyAdmin*/*sql.php*
// @include     *phpMyAdmin*/import.php*
// @include     *phpMyAdmin*/*select.php*
// @exclude     *phpMyAdmin*/navigation.php*
// @include     *mysqladmin*/*sql.php*
// @include     *mysqladmin*/import.php*
// @include     *mysqladmin*/*select.php*
// @exclude     *mysqladmin*/navigation.php*
// @version     4

// ==/UserScript==

$('td, span, input').each(function(){
// 	console.log($(this).html(), $(this).val())
	if(!isNaN($(this).html()) && (ts=parseInt($(this).html()))>1000000000 || 
		!isNaN($(this).val()) && (ts=parseInt($(this).val()))>1000000000){
		zeit=new Date();

		zeit.setTime(ts*1000);
		datum=zeit.toLocaleString();
		$(this).attr('title', datum);
	}
});

ts=$('<div id="timestampForm">Enter Date/Time or UNIX Timestamp <span onclick="$(&quot;#timestampForm&quot;).hide();" style="border:1px solid black;padding:1px; color: #550000;">X</span><br></div>').css({'position':'absolute', 'top':'250px', 'right':'50px'});
tsInput=$('<input>').keyup(function(){
	var v=$(this).val();
	if(!isNaN(v)){
		zeit=new Date();
		zeit.setTime(v*1000);
		datum=zeit.toLocaleString();
		$(this).attr('title', datum);
		$('#tsLoesung').val(datum);
	}else if(v.match(/(\d{1,4})-(\d{1,2})-(\d{1,2})( (\d{1,2})(:(\d{1,2})(:(\d{1,2}))?)?)?/)){
		//English Date/Time-Format YYYY-MM-DD HH:mm:ss or Y-M-D H:m:s 
		var zeit=new Date();
		var jahr=parseInt(RegExp.$1, 10);
		jahr=jahr<1000?jahr+2000:jahr;
		zeit.setYear(jahr);
		var monat=parseInt(RegExp.$2, 10);
		zeit.setMonth(monat-1);
		var tag=parseInt(RegExp.$3, 10);
		zeit.setDate(tag);

		stunde=RegExp.$5==''||isNaN(RegExp.$5)?0:parseInt(RegExp.$5, 10);
		zeit.setHours(stunde);
		minute=RegExp.$7==''||isNaN(RegExp.$7)?0:parseInt(RegExp.$7, 10);
		zeit.setMinutes(minute);
		sekunde=RegExp.$9==''||isNaN(RegExp.$9)?0:parseInt(RegExp.$9, 10);
		zeit.setSeconds(sekunde);
		var stamp=Date.parse(zeit)/1000;
		$('#tsLoesung').val(stamp);
	}else if(v.match(/(\d{1,2})\.(\d{1,2})\.(\d{1,4})( (\d{1,2})(:(\d{1,2})(:(\d{1,2}))?)?)?/)){
		//German Date/Time-Format DD.MM.YYYY HH:mm:ss (es werden auch 1-stellige Datums- und Zeit-Werte erkannt, z.B. 1.2.3 für den 01.02.2003)
		var zeit=new Date();
		var jahr=parseInt(RegExp.$3, 10);
		jahr=jahr<1000?jahr+2000:jahr;
		zeit.setYear(jahr);
		var monat=parseInt(RegExp.$2, 10);
		zeit.setMonth(monat-1);
		var tag=parseInt(RegExp.$1, 10);
		zeit.setDate(tag);

		stunde=RegExp.$5==''||isNaN(RegExp.$5)?0:parseInt(RegExp.$5, 10);
		zeit.setHours(stunde);
		minute=RegExp.$7==''||isNaN(RegExp.$7)?0:parseInt(RegExp.$7, 10);
		zeit.setMinutes(minute);
		sekunde=RegExp.$9==''||isNaN(RegExp.$9)?0:parseInt(RegExp.$9, 10);
		zeit.setSeconds(sekunde);
		var stamp=Date.parse(zeit)/1000;
		$('#tsLoesung').val(stamp);
	}
});
ts.append(tsInput).append($('<br>')).append($('<input id="tsLoesung" readonly="readonly">'));
$("body").append(ts);