// ==UserScript==
// @name           	Yahoo Football Football - Pts Against Rank
// @include        	*football.fantasysports.yahoo.com/*
// @description    	Display opposing defensive team 'points against rank' by position for Yahoo fantasy football leagues. This script is similar to previous matchup scripts, but it breaks down the matchup strength by the player's specific position, rather than just passing & rushing.
//@version			2012.09.05
// ==/UserScript==
//
// Credit goes to Glenn Carr and his Fantasy Football Matchup script (http://userscripts.org/scripts/show/15590) for much of 
// the coding procedures & styles included in this script. 

(function() {

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

// Find the player tables
var playerTables = document.evaluate("//table[contains(@id,'statTable')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//GM_log(playerTables.snapshotLength);
if ( playerTables.snapshotLength == 0 )
    return;

//Determine the week number
var selected = document.evaluate("//div[@id='statsubnav']//li[contains(@class,'first')]/*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//Deals with quirky behavior of Yahoo site
if ( selected.snapshotLength == 0 ){
  var mySelected = "";	  
}
else{
	//Grab the week number from the left (above the table) 
	var mySelected = selected.snapshotItem(0).innerHTML;
	var weekString = mySelected.toLowerCase();
	var currentWeekNumber = weekString.match(/\d{1,2}/);
}
	
//Find date information for later use
var today = new Date();
var year = today.getFullYear();
var day = today.getDate();

//Get important URL information for later use
var currentURL = document.URL;
var leagueCode = currentURL.match(/\d\d\d\d\d\d/);

//Set the proper URLs for finding pts against rank (and stats)
var QB_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+year+'&pos=QB&mode=average';
var RB_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+year+'&pos=RB&mode=average';
var WR_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+year+'&pos=WR&mode=average';
var TE_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+year+'&pos=TE&mode=average';
var K_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+year+'&pos=K&mode=average';
var DEF_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+year+'&pos=DEF&mode=average';

var lastYear = null;
//If it is only week 1 or week 2, use last year's stats
if ( currentWeekNumber == 1 || currentWeekNumber == 2 )
{
	var lastYear = year - 1;
	var QB_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+lastYear+'&pos=QB&mode=average';
	var RB_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+lastYear+'&pos=RB&mode=average';
	var WR_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+lastYear+'&pos=WR&mode=average';
	var TE_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+lastYear+'&pos=TE&mode=average';
	var K_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+lastYear+'&pos=K&mode=average';
	var DEF_VS_URL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/pointsagainst?season='+lastYear+'&pos=DEF&mode=average';
}


var tables = new Array();
for ( var i = 0; i < playerTables.snapshotLength; i++ )
{
    var table = playerTables.snapshotItem( i );
    tables.push( table );
}
playerTables = tables;

var legendIMG = 'data:image/pjpeg;base64,' +
		'/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkK' +
		'DA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQ' +
		'EBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAhAVgDAREAAhEBAxEB/8QA' +
		'HwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIh' +
		'MUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVW' +
		'V1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXG' +
		'x8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQF' +
		'BgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAV' +
		'YnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOE' +
		'hYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq' +
		'8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD73+P/AMfLL4Ir4YtXn8FQ3nia9ntopfF3ixfD2nwRQwNK8jXJ' +
		't5yWyI0CCPkyDkYrJVOav7C6+Fy1faUI2Stq3z36aRk+ho4Wpe1ab95R0V7NqUrt30XuNX11aVtbqfS/' +
		'2g/Dlv4X8Oa5460jV9HudfiMhOmaPqWsabbp5xiWZ9QgtRFFbyYEkc04hDRsHIUZx1OnetHDq6nJQ0ku' +
		'VqU0vcd9OdS9xxvzc1k0m0jmjVToSxDs4rn1i+ZOML+8rauLiuZO1mtU2lctSfHvwXdePNM+Hfhz7bqu' +
		'p3msTaRcTCwuobKJ4Leea48q7aH7PcvE0BjkjikZo3ba+0gisqC+se9D4eVyvt7qajdJ6yTk4rmWmt77' +
		'J7V/9nTU/i92y7uTTs3snyN1FF6uMW0rXaqa/wDtRfBDwz4xu/AWseLLyPW7C5SzuIYdC1CeNJmNv8nn' +
		'RQNESovLUvhz5azoz7Qc0qL+sOKp/akorpq5OC36OacOZ+7z2jfmlFNVl9XjKVTRRXM+tly8+y11inJL' +
		'dxjJpNRlbT1z48/Dzw7qes6Pqv8AwksF1odnd30zP4V1Rba4S2jMky2t01uILqRUBPlwyOx2tgfK2Mat' +
		'fkw9SvBX5E3bZ6NRvZ68vM0nK3Kk027NM2p0XOtTo3s5tRT3V2nJK6vrZN230atfQwNJ/aj+G93oUN5q' +
		'h1TTtVGif2tfWEuj36Q2Uy2RvJLGS7lt44UulhUyeRIUmMe1/LCsDWuZSWAp16sfeVJSfbm5f5b7u7s0' +
		'ruMrxklKMks8Gvrk6UVp7RxtfWylJxi5Wukm1ZO/LJ25XJSi3ofDn9ojwF8QNN0Ys2paRrOqyWlmdMvt' +
		'H1C2YXk9rLciOJ7i3i8+Ly7e4ZbhV8phESG5ArrrYf2dWVOD5lFzXZ+5yuV09Y6TjpKz95Ld2OajXVWn' +
		'7Rq3uxl392cuSLutHeWnutpO+ttSW/8A2k/gzp1xp1rP4quZJdUtBqEAttGvrjZZee8Bu5jHCwgt1kjY' +
		'NPLtjX5SzAMpPLh2sVKMaWvMqbXRWqpunq9LzS0jfmvZWu0jer+4jKdTTldRPvek0qiS3fK30vdaq6TZ' +
		'uaB8XPAfibxlf+AdH1O9fWdOFwzpNpV3b284t5EiuPs9zLEsF15UkiJJ5Lv5bMA208U6X76m6sNla/R6' +
		'8yTs9bPldnazto9Vd1E6M+Se+nprFSSbWibi+ZRbu1d20duxoEFABQAUAFABQAUAFABQAUAFABQAUAFA' +
		'BQAUAFABQAUAFABQAUAFABQBy3xD8Z3fgzSLZ9H0Ftc1zV7xNN0fTPtK2y3V0yO/7yZgRFEkccksjhXY' +
		'JG21JG2o0Nyc1CNru7bbslFauTaTaS0S0d5OMdL3Lio8spzekV0V27tJJK6u22t2ktW2kmzgPB37TPhb' +
		'UfDGo694vv8AwsZbDVU0hE8Ca8/jCO7unQuLeFLS3W7e4VUkZ4vswKohcFlDMtpwnThOnd817aXTsk3J' +
		'NXTjaSu3az0as4SnChUVSpTmkuRJvW1rvltJOzUuZWS1Tukm5c0Y7N5+0p8HLG20u7l8SahJFqtsLwNb' +
		'6BqM/wBhgMzQ+bf+XAf7OQSpKha78kBoZgcGN9twpyqVVRhq3y2d1ytzScEpfC3JNOKTu7qy1V5lNQoy' +
		'ry0jHnv3Xs/4mm/ufadrLruSSfHvwXdePNM+Hfhz7bqup3msTaRcTCwuobKJ4Leea48q7aH7PcvE0Bjk' +
		'jikZo3ba+0giooL6x70Ph5XK+3upqN0nrJOTiuZaa3vsndf/AGdNT+L3bLu5NOzeyfI3UUXq4xbStdqp' +
		'r/7UXwQ8M+MbvwFrHiy8j1uwuUs7iGHQtQnjSZjb/J50UDREqLy1L4c+Ws6M+0HNKi/rDiqf2pKK6auT' +
		'gt+jmnDmfu89o35pRTVZfV4ylU0UVzPrZcvPstdYpyS3cYyaTUZW09c+PPw88O6nrOj6r/wksF1odnd3' +
		'0zP4V1Rba4S2jMky2t01uILqRUBPlwyOx2tgfK2Matfkw9SvBX5E3bZ6NRvZ68vM0nK3Kk027NM2p0XO' +
		'tTo3s5tRT3V2nJK6vrZN230atfQwNJ/aj+G93oUN5qh1TTtVGif2tfWEuj36Q2Uy2RvJLGS7lt44Uulh' +
		'UyeRIUmMe1/LCsDWuZSWAp16sfeVJSfbm5f5b7u7s0ruMrxklKMks8Gvrk6UVp7RxtfWylJxi5Wukm1Z' +
		'O/LJ25XJSi3ofDn9ojwF8QNN0Ys2paRrOqyWlmdMvtH1C2YXk9rLciOJ7i3i8+Ly7e4ZbhV8phESG5Ar' +
		'rrYf2dWVOD5lFzXZ+5yuV09Y6TjpKz95Ld2OajXVWn7Rq3uxl392cuSLutHeWnutpO+ttSW//aT+DOnX' +
		'GnWs/iq5kl1S0GoQC20a+uNll57wG7mMcLCC3WSNg08u2NflLMAyk8uHaxUoxpa8yptdFaqm6er0vNLS' +
		'N+a9la7SN6v7iMp1NOV1E+96TSqJLd8rfS91qrpNm5oHxc8B+JvGV/4B0fU719Z04XDOk2lXdvbzi3kS' +
		'K4+z3MsSwXXlSSIknku/lswDbTxTpfvqbqw2Vr9HrzJOz1s+V2drO2j1V3UToz5J76emsVJJtaJuL5lF' +
		'u7V3bR25H4vaF4NvfG2h+I9Q/aEv/htr+kaZd2dutleaMjT2l1LC0haPUrW44L2kYDIF+4Rk1zSxNHCz' +
		'nz1FHnUbptL4XKz11+0762enY9fB5JmubYdSwWFqVYRk9YQnJc1rWbSauk9OqUn3PKvEvwF/ZI8V+JPD' +
		'/ibVfjPpMtx4fWxKCbUtCupJ5ba7a7EpuLi2kubcyTOzSJaywRvkjYASCYbMsFhKyrUqkFyuLiuZe7yR' +
		'jCKTvzNKMEkpSlreXxtyOirwhxFVw8qFXA13zc926U9XUu5Sty8ik3Ju8Yp7L4YwUe08J6N8DvCnjyDx' +
		'sv7SS6pb6cNS/snQb/xDpR03S2vpxNO8IjiSd3yGVWmmkKJI6jANTh8xwmHp+zVWLfLGCbkrqELWirNK' +
		'3uxu7XlyRcm2rhW4Sz+s7/UayXO6jSpT1nJSu3eLernJ2TSTbsktCG+8H/s16jrUuvXfxo057ibUX1KQ' +
		'f8JHYbWkbUrXUGQjGdhksraLGc+Um3OSWpYXMcHhFFQqxaTT1kt060r7/wA1eUvJxhayjZzW4Vz2tKUn' +
		'gqy5lKLtTntKnTpP7O/JTST6c07bq3HQfs/fso23ijxT4wtfjjp8Gp+K7DWNNmuIL/w/FPBFqUge4b7Q' +
		'loJ7pwVARryS4KjI53NmcNj8JhKMaNKtFcvJrzRv+7lGUbr4XrFczteV25NuzVV+G88r1FUqYKrdO/8A' +
		'DqaNwlDRtc0UlJtKLUYtRUUoxUV1ereC/gNrsniW11P9pGeXRfFMc/27Q4/E2mQ2PnTwxw3E+2OJZJGk' +
		'RDlJXkiUyMY40IQrpTzPBUnFxqQ9yanG8k1H977ZxV3qnPdu8+W8VNJyvhLhfPLXWFrRbjZtU5pt+zdJ' +
		'Suo6SjC1lHljzRjJxckmaHi3RPgf4o1v/hJbH9oaPw9q66wmsR3ml6/pTPEVsDY/Z0W5ilRYjE0h4XeH' +
		'kdldc4GKx2CScfbRtJTUveXvc7g3d3unanCKcWmoxSvu25cNZy4KKwdRcqiov2cvd5HNx0ceV2dSWklK' +
		'O2mityegfDf4S2GpXNhe/tGWkHhK107R/D9rotr4msJF1bS7CEFU1GSSLzgzXEt0XFvJGJEf94WDlF6I' +
		'5vhOd1p1YX9p7RRTSjFqMIwtZpvl9mpJP3U3y8rSblFbhvNqmkcLVScWpPkm23OdSVTdNe9GUVzfGraS' +
		'TSZ23w/0/wCCXw+8a+I/HVr8fLbVrzxIcTRajrumGOJA5KKXhjjmuSi7Y45LuSeSONQiOqlg2VDM8FQw' +
		'6wyrQa0d3JXula+9ry3nK3NNpObk0rKvw/m1WsqzwtRNJq3JO2r5uqbsndxjflhzSUIxUmj0b/hbfwp/' +
		'6Kb4T/8AB1bf/F0v7TwX/P6H/gS/zE8hzVb4ap/4BL/IP+Ft/Cr/AKKb4T/8HVt/8XR/aeC/5/Q/8CX+' +
		'Yv7DzT/oGqf+AS/yF/4Wz8K/+il+FP8Awc23/wAXR/amB/5/Q/8AAl/mT/Y2Zf8AQPP/AMAl/kH/AAtj' +
		'4Wf9FL8K/wDg5tv/AIul/amB/wCf0P8AwJf5ieUZit6E/wDwGX+Qv/C1/haenxK8K/8Ag5tv/i6P7UwP' +
		'/P6H/gS/zE8px63oT/8AAZf5B/wtf4W/9FJ8K/8Ag5t//i6P7UwP/P8Ah/4FH/Mn+y8cv+XM/wDwF/5C' +
		'/wDC1fhf/wBFI8Lf+Di3/wDi6P7VwH/P+H/gUf8AMn+zsZ/z6l/4C/8AIP8Ahanww/6KP4X/APBxb/8A' +
		'xdL+1sB/z/h/4FH/ADF9Qxf/AD6l/wCAv/IX/hanww/6KP4X/wDBxb//ABdH9rZf/wA/4f8AgUf8xPBY' +
		'lb05fc/8g/4Wn8Mf+ijeF/8Awb2//wAXR/a2X/8AP+H/AIFH/Ml4TELenL7mH/C0vhl/0UXwx/4N7f8A' +
		'+Lo/tfL/APn/AA/8Cj/mL6tX/kf3MX/haPwz/wCiieGP/Bvb/wDxdL+18v8A+f8AD/wKP+ZPsKv8r+5h' +
		'/wALQ+Gh6fETwz/4N7f/AOLo/tfLv+f8P/Ao/wCYnSqLeL+4X/hZ/wANf+ih+Gf/AAbW/wD8XR/bGXf9' +
		'BEP/AAOP+ZLhJboP+FnfDb/ooXhr/wAG1v8A/F0f2xl3/QRD/wADj/mKzF/4WZ8N/wDooPhr/wAG0H/x' +
		'dL+2Mu/6CIf+Bx/zJug/4WX8OD0+IHhv/wAGsH/xdH9s5b/0EQ/8Dj/mJzit2L/wsv4c/wDQ/wDhv/wa' +
		'wf8AxVH9s5b/ANBEP/A4/wCZLq01vJfeH/Cyvhz/AND/AOG//BrB/wDFUf2zlv8A0EQ/8Dj/AJi9vS/m' +
		'X3oX/hZPw6/6H7w5/wCDWD/4ql/bWW/9BFP/AMDj/mT9aofzr70H/CyPh2enj3w5/wCDSD/4qj+2ss/6' +
		'CKf/AIHH/MTxeHW9SP3oX/hY/wAPP+h88O/+DSD/AOKo/trLP+gin/4HH/Ml43DLepH70H/Cxvh7/wBD' +
		'34d/8GkH/wAVR/beWf8AQTT/APA4/wCYvr+E/wCfsf8AwJf5i/8ACxfh9/0PXh7/AMGcH/xVL+28s/6C' +
		'af8A4HH/ADJ/tLBf8/o/+BL/ADOZ8eXXw18d6dZ25+K1poeoaXeLqGmatpWr2YurG5EbxmRFmEkL5jll' +
		'QrLG6EOflzgiHnOW86qRxUE1daThqnumm2mnp0umlJNSSaazbARi4SqwafeS6NNPRp6NJ9ns7xbT4xvh' +
		'98NzZx3Nv+0fq0Hioas2szeLI9T0U6jcTG0+x7Hha1NkI/s4SMKtsv3A/wB8s7W88ytW9niacVaUXacf' +
		'eUpRlK7bbu5Ri7pprlUVaOhEs2wE/wCLXg7W5byiuXl57Ws1f+JU+Lm+N9o8sLfCn4MRywwWHxu1Cy0e' +
		'a0trTWtHj16we318Qyyy77yWWJrndI80pl8maIShiHDAkGqefZXSnGUcRT5YyjKMeeNoyhGEYta8z5VT' +
		'p6SlJNwTad5c2U80y+pF82IhzSTjKXNG7jKUpSVvhV3OesYxa5vda5Ycuh4T8C/C3wp48g8bL8db7VLf' +
		'ThqX9k6Df6xpp03S2vpxNO8IjhSd3yGVWmmkKJI6jANTh89yvD0/ZrE02+WME3ON1CFrRVmlb3Y3dry5' +
		'IuTbVwrZ1llZ3+sU0ud1GlOOs5KV27tvVzk7JpJt2SWhDe/C74FalrUuvXfxMElxNqL6lIP7as9jSNqV' +
		'rqDIflzsMllbRYznyk25yS1LC57lWEUVDE03Zp6zjunWlff+avKXk4wtZRsyvnmV1pSlLE005KUX78dp' +
		'U6dJ9d+Smkn05p23VuOg/Zd/ZwtvFHirxfa/FXyNT8VafrGnTXEE2hRTwRalIHuG+0JZie6cEAI15JcF' +
		'Rkc7mzOGzzK8JRjRpYqmuXk154X/AHcoyjdX5XrFczteV25NuzVYjiHKq9RVamJp6O/xx3cJQ0blzRsp' +
		'NqMWoxaiopRiorq9X+FXwl11/Etrqnx11aTRfFMc/wBu0OPXNPhsfPnhjhuJ9scKySNIkZykryRKZGMc' +
		'aEIV0p5/lNJxccRT9yanG84tR/e+2cVeWqc927z5bxU0nK+Dz3KmvdxkIy5bNqpFNv2bpKV09JRhayjy' +
		'x5oxk4uSTNDxb4D+F3ifW/8AhJrH41Xnh3V11hNYjvNL1XTmeIrYGx+zotzDKixGJpDwu8PI7K65wMVn' +
		'WUpOP1qFpKal+8j73O4N3d7p2pwinFpqMUr7tkuIsmcVFYqkuVRUbTh7vK5uOjfK7OpLSSlHbTRW5Pw/' +
		'8FfAtjqVxYXnxvlg8I22naP4ftdFtdcs5F1fS7CEFU1GSSHzgzXEt0XFvJGJEb94WDlF3jxJlam608VS' +
		'v7T2iipxUYNRhGFrNN8vs1JJ+6m+XlaTcs8RxHkcnyrGUleLUr1Y3bnOpKpvJ/FGUVzfHppJNJnoPwu+' +
		'G/gfwt488S+MPD3xN1LxJqXiJd9xa3F7YyiGJXyuWt4UnufLBSJJLuSeSONQiOqswbTL80wNaj9SwlaF' +
		'Rqz0km9Fy3sna7uueVuabUXNyaVuujnGW5tilLCYiE5xi/dhNS0ck27Jt2Um3FfBBzkoKKlY+Z/27/8A' +
		'krukf9i3b/8ApVdV8pxN/vcf8K/Nn9eeBv8AyT1b/r9L/wBIpnzivWvnGfsFf4R1I5SWoPPJE+6KlnHV' +
		'+NkidfwqWc1b4SQdR9alnLP4WSVJwkifdFSzjq/Gx61LOOv0HL94fWpexyz+Fk9ZHCOHSpZx1fjZJH3o' +
		'OSt0HjqPrSexzT+FktZHnkg6D6VLOOXxMctSzlr9B6feFSzjq/AySpOMlHQfSpZwz+Jj4+9Szlr9CRPv' +
		'CpZx1fgZJUnGSjoPpUs5JfEyROn41LOHEfEOHWpZy1PhY6pOUmqTzx6dPxqWctf4h6feFSzlq/AySpOM' +
		'mqTzxV6VLOWv8Q9Ov4VLOSt8JJUnOS1J5hIn3RUs5anxMenX8KlnNX+EkqTlJak88sRf6sVjPc8nE/xX' +
		'/XQ9X/Zy/wCR3vv+wVL/AOjoa/QvDP8A5G1T/r2//SoH6b4Qf8jyr/16l/6XTOY/a0+BnxT+JvxG07Xv' +
		'BHhf+0rGDRIbSSX7bbQ7ZlnnYrtlkUn5XU5xjnr1r9GzzLcVjMRGpQjdcqW6XV92f6HeFXG2RcN5NVwm' +
		'aV+Sbqyklyzlo4QV7xi1un1ueKD9kj9oQH/kn/8A5VbH/wCPV4ryLMP+ff4x/wAz9Iq+KvCMlZYv/wAp' +
		'1f8A5Ad/wyT+0H/0T/8A8qtj/wDHqX9g5h/z7/GP+Zz/APEUuE/+gv8A8p1f/kCT/hkz9oH/AKED/wAq' +
		'tl/8eqf7AzH/AJ9/jH/M4/8AiJvCv/QV/wCSVP8A5Aev7Jv7QAGD4B/8qtl/8eqXkGY/8+/xj/mc1TxJ' +
		'4XlJtYr/AMkqf/IDk/ZP+P4PPgH/AMqtl/8AHqT4fzH/AJ9/jH/MwqeI3DMlZYn/AMkqf/IDx+yj8fcj' +
		'/igv/KpZf/HqX+r2Zf8APv8AGP8AmYS8Q+G2mvrP/klT/wCRJP8AhlP4+f8AQh/+VSy/+PVP+r2Zf8+/' +
		'xj/mcn+v3Dv/AEEf+ST/APkR6/sq/HoDB8B/+VSy/wDj1S+Hcy/59/jH/M5qnHfD8pNrEf8Akk//AJEc' +
		'P2Vvj0P+ZE/8qll/8epPhzM/+fX/AJNH/M5qvG+Qytav/wCSz/8AkRV/ZY+PIYE+BO//AEFLL/49Uvhz' +
		'M/8An1/5NH/MwlxnkbTXt/8AyWf/AMiTf8Mt/Hb/AKEX/wAqdn/8dqP9Ws0/59f+TR/zOT/W/Jv+f3/k' +
		's/8A5EUfsufHbH/Ijf8AlTs//jtS+Gs0/wCfX/k0f8zmqcV5RKTarf8Aksv/AJEen7L3x0Gc+Bv/ACp2' +
		'f/x2j/VnNP8An1/5NH/M56vFGVStar/5LL/IcP2X/jnkf8UP/wCVOz/+O0nwzmn/AD6/8mj/AJmEuJcr' +
		'cWlV/wDJZf5En/DMPxy/6Ej/AMqdn/8AHaj/AFYzX/n1/wCTR/zOP/WDLv8An5+Ev8h4/Zk+OGB/xRH/' +
		'AJUrP/47U/6r5t/z6/8AJo/5nNLPMA237T8Jf5Dh+zL8bx/zJP8A5UrP/wCO0nwtm3/Pr/yaP/yRhVzn' +
		'BStaf4P/ACHL+zN8bgcnwT/5UrT/AOO1L4Wzb/n1/wCTR/8AkjmqZrhJRaU/wf8AkP8A+GaPjb/0JX/l' +
		'StP/AI7S/wBVc3/58/8Ak0f/AJI5v7Rw3834P/IeP2avjXgf8UX/AOVG0/8AjtT/AKqZv/z5/wDJo/8A' +
		'yRyyxtBtvm/Bj0/Zs+NQznwX/wCVG0/+O0nwpm//AD5/8mj/APJHPVxNKVrP8x6/s3fGkHJ8Gf8AlRtP' +
		'/jtS+E84/wCfP/k0f/kjmqVoSi0mP/4Zv+NH/Qm/+VG0/wDjtL/VPOP+fP8A5NH/AOSObmQ8fs5fGbA/' +
		'4o3/AMqNp/8AHan/AFSzj/nz/wCTQ/8AkjmlFttj0/Z0+MgHPg7/AMqFr/8AHaT4Rzn/AJ8/+TQ/+SOW' +
		'tRnOV0hw/Z1+Mmf+RO/8qFr/APHal8I5z/z5/wDJof8AyRzzwtVxsl+Q7/hnb4x/9Cf/AOVC1/8AjtL/' +
		'AFQzn/nz/wCTQ/8AkjD6lX/l/FEn/DPHxh/6FD/yoWv/AMcqf9T86/58/wDk0P8A5I4/7NxX8v4r/Mcn' +
		'7PXxgA58If8AlQtf/jlJ8H51/wA+f/Jof/JHPVyrFyd1D8V/mPX9nz4vg5PhH/yftf8A45Uvg7Ov+fP/' +
		'AJND/wCSMKmT42UWlD8V/mP/AOGfvi7/ANCl/wCT9r/8cpf6m53/AM+P/Jof/JHN/YeP/wCff4x/zJP+' +
		'FAfFv/oUv/J+2/8AjlT/AKm53/z4/wDJof8AyRx/6vZl/wA+/wAY/wCYo+APxbH/ADKf/k/bf/HKT4Mz' +
		'z/nx/wCTQ/8Akjnq8NZpJ3VL/wAmj/mOT4BfFoHnwn/5P23/AMcqXwXnn/Pj/wAmh/8AJHPU4XzaSsqX' +
		'/k0f8x//AAoT4s/9Cp/5PW3/AMcpf6l55/z4/wDJof8AyRj/AKqZv/z5/wDJo/8AyRJ/wof4r/8AQq/+' +
		'T1t/8cqf9Ss9/wCfH/k0P/kjh/1Ozr/nz/5ND/5IevwI+KoGD4V/8nrb/wCOVL4Jz3/nx/5ND/5I558F' +
		'545XVD/yaH/yQ5PgV8VAefC3/k9bf/HKT4Jz3/nx/wCTQ/8AkjCrwRn0lZUP/Jof/JD/APhRnxT/AOhW' +
		'/wDJ62/+OUv9SM+/58f+TQ/+SMP9Rc//AOgf/wAnh/8AJEn/AAo74o/9Cv8A+Ttv/wDHKn/UfPv+fH/k' +
		'0P8A5I4/9QOIv+gf/wAnp/8AyRNH8EvieqAHwzz/ANftv/8AHKylwNn7f+7/APk8P/kjzq/hzxNOo5Rw' +
		'2n+On/8AJnoPwW+HnjHwl4putS8Q6P8AZLeTT3gV/tEUmXMkZAwjE9FPtxX2XA3DeaZPmM6+NpcsXBq/' +
		'NF680X0beyZ934ccJZzkOa1MTmFHkg6binzQerlB2tGTeyfke01+qn7UFABQAUAFABQAUAFABQAUAFAB' +
		'QAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAf/2Q==';


		
GM_addStyle( '\
IMG.gncTeam { padding-left: 2px } \
#gncMatchupLegend { float:right; padding-left: 10px; background: white; } \
' );

//Append the legend IMG
var legend = document.createElement( 'div' );
legend.id = 'gncMatchupLegend';
legend.innerHTML = '<img src="' + legendIMG + '"/>';
var yspcontent = document.getElementById( tables[ 0 ].id );
yspcontent.parentNode.insertBefore( legend, yspcontent.nextSibling );


var teamAbbrevs = new Array( 'Ari','Atl','Bal','Buf','Car','Chi','Cin','Cle','Dal','Den','Det','GB','Hou','Ind','Jac','KC','Mia','Min','NE','NO','NYG','NYJ','Oak','Phi','Pit','SD','Sea','SF','StL','TB','Ten','Was' );
var teamUrlAbbrevs = { Ari:'ari',Atl:'atl',Bal:'bal',Buf:'buf',Car:'car',Chi:'chi',Cin:'cin',Cle:'cle',Dal:'dal',Den:'den',Det:'det',GB:'gnb',Hou:'hou',Ind:'ind',Jac:'jac',KC:'kan',Mia:'mia',Min:'min',NE:'nwe',NO:'nor',NYG:'nyg',NYJ:'nyj',Oak:'oak',Phi:'phi',Pit:'pit',SD:'sdg',Sea:'sea',SF:'sfo',StL:'stl',TB:'tam',Ten:'ten',Was:'was' };
var teamCells = new Array();

var GOOD_COLOR = GM_getValue("good_rgb_color", "#33ff33");  //green
var BAD_COLOR = GM_getValue("bad_rgb_color", "#ff3333");   //red

var qbDResponseText, rbDResponseText, wrResponseText, teResponseText, kDresponseText, defDresponseText;

fetchRankData(); 

//This handles multiple xmlhttprequests without creating asynchronous issues with the coding
function fetchRankData()
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: QB_VS_URL,
		onload: getQBHandler(handleRB),
		});
}

function getQBHandler( responseHandler )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )		
            responseHandler( responseDetails.responseText );
    }
}

function handleRB( responseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: RB_VS_URL,
        onload: getRBHandler( handleWR, responseText ),
        });
}

function getRBHandler( responseHandler, qbResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, qbResponseText );
    }
}

function handleWR( responseText, qbResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: WR_VS_URL,
        onload: getWRHandler( handleTE, responseText, qbResponseText ),
        });
}

function getWRHandler( responseHandler, rbResponseText, qbResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, rbResponseText, qbResponseText );
    }
}

function handleTE( responseText, rbResponseText, qbResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: TE_VS_URL,
        onload: getTEHandler( handleDEF, responseText, rbResponseText, qbResponseText ),
        });
}

function getTEHandler( responseHandler, wrResponseText, rbResponseText, qbResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, wrResponseText, rbResponseText, qbResponseText );
    }
}

function handleDEF( responseText, wrResponseText, rbResponseText, qbResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: DEF_VS_URL,
        onload: getDEFHandler( handleK, responseText, wrResponseText, rbResponseText, qbResponseText ),
        });
}

function getDEFHandler( responseHandler, teResponseText, wrResponseText, rbResponseText, qbResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, teResponseText, wrResponseText, rbResponseText, qbResponseText );
    }
}

function handleK( responseText, teResponseText, wrResponseText, rbResponseText, qbResponseText)
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: K_VS_URL,
        onload: getKHandler( displayMatchups, responseText, teResponseText, wrResponseText, rbResponseText, qbResponseText ),
        });
}

function getKHandler( responseHandler, defResponseText, teResponseText, wrResponseText, rbResponseText, qbResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, defResponseText, teResponseText, wrResponseText, rbResponseText, qbResponseText );
    }
}

function displayMatchups( kResponseText, defResponseText, teResponseText, wrResponseText, rbResponseText, qbResponseText )
{
    // Find all the team abbreviations
    var reTeamAbbr = new RegExp( '^@?(' + teamAbbrevs.join( '|' ) + ')$' );
    for ( var iTable = 0; iTable < playerTables.length; iTable++ )
    {
        var playerTable = playerTables[ iTable ];
        for ( var iRow = 0; iRow < playerTable.rows.length; iRow++ )
        {
            var row = playerTable.rows[ iRow ];
            if ( /^td$/i.test( row.cells[ 0 ].tagName ) )
            {
                for ( var iCell = 0; iCell < row.cells.length; iCell++ )
                {
                    var cell = row.cells[ iCell ];
                    var cellText = cell.innerHTML.stripTags();
                    var matches = cellText.match( reTeamAbbr );
                    if ( matches )
                    {
                        cell.setAttribute( "gncTeam", teamUrlAbbrevs[ matches[ 1 ] ] );
                        teamCells.push( cell );
                    }
                    if ( /^player/i.test( cell.getAttribute( "class" ) ) )
                    {
                        var span = cell.getElementsByTagName( 'span' );
                        if ( span.length > 0 )
                        {
                            span = span[ 0 ];
                            var playerPos = span.innerHTML.stripTags().replace( /\(\S{2,3}\s+-\s+(\S+)\)/i, '$1' );
                            cell.style.paddingRight = '2px';
                            cell.parentNode.setAttribute( "gncPlayerPos", playerPos );
                        }
                    }
                }
            }
        }
    }

	//Direct response to appropriate function
    var rushingStats = parseStats( rbResponseText );
    var passingStats = parseStats( qbResponseText );
    var receivingStats = parseStats( wrResponseText );
	var tightendStats = parseStats( teResponseText );
	var kickerStats = parseStats( kResponseText );
	var defenseStats = parseStats( defResponseText );

	//Find the appropriate colors
    var colors = ColorTransition( GOOD_COLOR, BAD_COLOR, rushingStats.teams.length );

    for ( var iCell = 0; iCell < teamCells.length; iCell++ )
    {
        var cell = teamCells[ iCell ];
        var teamAbbr = cell.getAttribute( "gncTeam" );
        var playerPos = cell.parentNode.getAttribute( "gncPlayerPos" ).toLowerCase();
        var tip = '';
		
		//Use functions to build tooltip and change background color based on player position
        switch( playerPos )
        {
            case 'qb':
				tip = "QB Pts Against " + buildToolTip( teamAbbr, passingStats, playerPos );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, passingStats ) - 1 ];
                break;
            case 'wr':
				tip = "WR Pts Against " + buildToolTip( teamAbbr, receivingStats, playerPos );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, receivingStats ) - 1 ];
                break;
            case 'te':
            case 'rb,te':
                tip = "TE Pts Against " + buildToolTip( teamAbbr, tightendStats, playerPos );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, tightendStats ) - 1 ];
                break;
            case 'rb':
			case 'wr,rb':
                tip = "RB Pts Against " + buildToolTip( teamAbbr, rushingStats, playerPos );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, rushingStats ) - 1 ];
                break;
			case 'k':
				tip = "K Pts Against " + buildToolTip( teamAbbr, kickerStats, playerPos );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, kickerStats ) - 1 ];
                break;
			case 'def':
				tip = "Def Pts Against " + buildToolTip( teamAbbr, defenseStats, playerPos );
                cell.style.backgroundColor = colors[ getRank( teamAbbr, defenseStats, playerPos ) - 1 ];
                break;

        }
        teamCells[ iCell ].setAttribute( "title", tip );
    }
}

//Get the proper table needed for acquiring the data
function parseStats( responseText )
{
    var table = document.getElementById( 'gncStatTable' );
    if ( table == null )
    {
        table = document.createElement( 'table' );
        table.style.display = 'none';
        table.id = 'gncStatTable';
        document.body.appendChild( table );
    }
	
	//Get all tables from the xmlhttprequest data
    var tables = responseText.replace( /\r\n+/g, '' ).split( /<table[^>]+>/i );
	
	for ( var iTable = 0; iTable < tables.length; iTable++ )
    {
        //Only use table with the class mentioned
		if ( /class="headerRow0"/i.test( tables[ iTable ] ) )
        {
            table.innerHTML = tables[ iTable ].replace( /<\/table>/i, '' );
            return extractTableStats( table );
        }
    }
	//GM_log(table.innerHTML);
}

//Build arrays of stat categories and values
function extractTableStats( table )
{
    var statNames = new Array();
    var teams = new Array();
    var stats = {};
	for ( var iRow = 1; iRow < table.rows.length; iRow++ )  //starts in 2nd row to avoid spaces in first row
    {
        var row = table.rows[ iRow ];		

        //Get stat categories in second row
        if ( iRow == 1 )
        {
            statNames.push( 'Rank' );
            for ( var iCell = 1; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellText = cell.innerHTML.stripTags();
                if ( cellText.length > 0 )
                    statNames.push( cellText );
            }
        }

        //Get stat values after second row
        else
        {
            var teamStats = new Array();
            var teamAbbr = '';
            for ( var iCell = 0; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellText = cell.innerHTML.stripTags();				

                // team
                if ( iCell == 1 )
                {
                    //Get team name from second column
					var teamName = cell.innerHTML.stripTags().replace(/\svs\s\D{1,4}/,'').replace(/^\s+/,"").replace(/\s+$/,"");
					//Change team name to abbrev for matching purposes
					var teamAbbr = getTeamAbbr(teamName);
				    teamStats.push( iRow ); // rank
                    teams.push( teamAbbr );
                }
                else
                {
                    if ( cellText.length > 0 )
                        teamStats.push( cellText );
                }
            }
            stats[ teamAbbr ] = teamStats;
        }
    }

    return { teams:teams, statNames:statNames, stats:stats };
}

//Populate tooltip with relevant statistical information
function buildToolTip( teamAbbr, teamStats, playerPos )
{
	if ( !teamStats.stats.hasOwnProperty( teamAbbr ) )
		return '<no stats yet for ' + teamAbbr + '>';
		
    var tip = new Array();
    var stats = teamStats.stats[ teamAbbr ];
    var statNames = teamStats.statNames;
    
	switch (playerPos)
	{
		case 'qb':
			tip.push( statNames[0] + ': ' + (33 - stats[0]));  //rank
			tip.push( statNames[4] + ': ' + stats[4]);  //yds
			tip.push( statNames[5] + ': ' + stats[5]);  //tds
			tip.push( statNames[6] + ': ' + stats[6]);  //ints
			tip.push( 'Fan Pts: ' + stats[16]);  //fan pts
			break;
		case 'wr':
		case 'te':
        case 'rb,te':
			tip.push( statNames[0] + ': ' + (33 - stats[0]));  //rank
			tip.push( statNames[9] + ': ' + stats[9]);  //catches
			tip.push( statNames[10] + ': ' + stats[10]);  //yds
			tip.push( statNames[11] + ': ' + stats[11]);  //tds
			tip.push( 'Fan Pts: ' + stats[16]);  //fan pts
			break;
		case 'rb':
		case 'wr,rb':
			tip.push( statNames[0] + ': ' + (33 - stats[0]));  //rank
			tip.push( statNames[7] + ': ' + stats[7]);  //yds
			tip.push( statNames[8] + ': ' + stats[8]);  //tds
			tip.push( 'Fan Pts: ' + stats[16]);  //fan pts
			break;		
		case 'k':
			tip.push( statNames[0] + ': ' + (33 - stats[0]));  //rank
			tip.push( 'FG Made: ' + (parseFloat(stats[2]) + parseFloat(stats[3]) + parseFloat(stats[4]) + parseFloat(stats[5]) + parseFloat(stats[6])));  //FGM
			tip.push( 'PAT Made: ' + stats[12]);  //PAT made
			tip.push( 'Fan Pts: ' + stats[14]);  //fan pts
			break;
		case 'def':
			tip.push( statNames[0] + ': ' + (33 - stats[0]));  //rank	
			tip.push( statNames[2] + ': ' + stats[2]);  //pts given up
			tip.push( statNames[3] + ': ' + stats[3]);  //sacks
			tip.push( 'Turnovers: ' + (parseFloat(stats[5]) + parseFloat(stats[6])));  //fumbles + ints
			tip.push( statNames[7] + ': ' + stats[7]);  //tds
			tip.push( 'Fan Pts: ' + stats[9]);  //fan pts
			break;
		default:
	}
	  
    return tip.join( ',   ' );
}

//Get the team's rank for the purpose of background color
function getRank( teamAbbr, teamStats )
{
	if ( !teamStats.stats.hasOwnProperty( teamAbbr ) )
		return -1;

    var stats = teamStats.stats[ teamAbbr ];
    var statNames = teamStats.statNames;
    for ( var i = 0; i < stats.length; i++ )
    {
        switch( statNames[ i ].toLowerCase() )
        {
            case 'rank':
                return parseInt( stats[ i ], 10 );
        }
    }
}

//Credit to Glenn Carr for this exact function to change colors based on matchup quality
function ColorTransition(start, end, steps)
{
    var patterns = {};
    patterns.rgb = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;
    patterns.hex = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
    patterns.hex3 = /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;

   var parseColor = function(s)
   {
      if (s.length == 3) { return s; }

      var c = patterns.hex.exec(s);
      if (c && c.length == 4)
      {
         return [ parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16) ];
      }

      c = patterns.rgb.exec(s);
      if (c && c.length == 4)
      {
         return [ parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10) ];
      }

      c = patterns.hex3.exec(s);
      if (c && c.length == 4)
      {
         return [ parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16) ];
      }

      return null;
   };

   var outputColors = [];
   var startColor = currentColor = parseColor(start);
   var endColor = parseColor(end);
   var deltas = [];
   for (var rgbIndex = 0; rgbIndex < currentColor.length; rgbIndex++)
   {
      deltas[rgbIndex] = Math.abs(currentColor[rgbIndex] - endColor[rgbIndex]) / steps;
   }

   for (var step = 0; step < steps; step++)
   {
       if (step == steps -1)
       {
          currentColor = endColor;
       }

       outputColors[step] = 'rgb('+Math.floor(currentColor[0])+','+Math.floor(currentColor[1])+','+Math.floor(currentColor[2])+')';

       for (var rgbIndex = 0; rgbIndex < currentColor.length; rgbIndex++)
       {
          if ( startColor[rgbIndex] < endColor[rgbIndex] )
            currentColor[rgbIndex] += deltas[rgbIndex];
          else
            currentColor[rgbIndex] -= deltas[rgbIndex];
       }
   }

   return outputColors;
}

//Converts team names
function getTeamAbbr(teamName)
{
	var teamAbbr;
	
	switch (teamName)
	{
		case 'Arizona Cardinals':
			teamAbbr = 'ari';
		break;
		case 'Atlanta Falcons':
			teamAbbr = 'atl';
		break;
		case 'Baltimore Ravens':
			teamAbbr = 'bal';
		break;
		case 'Buffalo Bills':
			teamAbbr = 'buf';
		break;
		case 'Carolina Panthers':
			teamAbbr = 'car';
		break;
		case 'Chicago Bears':
			teamAbbr = 'chi';
		break;
		case 'Cincinnati Bengals':
			teamAbbr = 'cin';
		break;
		case 'Cleveland Browns':
			teamAbbr = 'cle';
		break;
		case 'Dallas Cowboys':
			teamAbbr = 'dal';
		break;
		case 'Denver Broncos':
			teamAbbr = 'den';
		break;
		case 'Detroit Lions':
			teamAbbr = 'det';
		break;
		case 'Green Bay Packers':
			teamAbbr = 'gnb';
		break;
		case 'Houston Texans':
			teamAbbr = 'hou';
		break;
		case 'Indianapolis Colts':
			teamAbbr = 'ind';
		break;
		case 'Jacksonville Jaguars':
			teamAbbr = 'jac';
		break;
		case 'Kansas City Chiefs':
			teamAbbr = 'kan';
		break;
		case 'Miami Dolphins':
			teamAbbr = 'mia';
		break;
		case 'Minnesota Vikings':
			teamAbbr = 'min';
		break;
		case 'New England Patriots':
			teamAbbr = 'nwe';
		break;
		case 'New Orleans Saints':
			teamAbbr = 'nor';
		break;
		case 'New York Giants':
			teamAbbr = 'nyg';
		break;
		case 'New York Jets':
			teamAbbr = 'nyj';
		break;
		case 'Oakland Raiders':
			teamAbbr = 'oak';
		break;
		case 'Philadelphia Eagles':
			teamAbbr = 'phi';
		break;
		case 'Pittsburgh Steelers':
			teamAbbr = 'pit';
		break;
		case 'San Diego Chargers':
			teamAbbr = 'sdg';
		break;
		case 'Seattle Seahawks':
			teamAbbr = 'sea';
		break;
		case 'San Francisco 49ers':
			teamAbbr = 'sfo';
		break;
		case 'St. Louis Rams':
			teamAbbr = 'stl';
		break;
		case 'Tampa Bay Buccaneers':
			teamAbbr = 'tam';
		break;
		case 'Tennessee Titans':
			teamAbbr = 'ten';
		break;
		case 'Washington Redskins':
			teamAbbr = 'was';
		break;
	}
	return teamAbbr;
}

})();
