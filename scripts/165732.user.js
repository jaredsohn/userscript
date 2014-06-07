// ==UserScript==
// @name Lista online
// @namespace OK
// @description Wersja rozwojowa
// @icon http://s1.cdn.imgwykop.pl/img/favicon.png
// @include http://www.wykop.pl/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version 1.0
// @author Wiceps
// ==/UserScript==

$('nav.main').last().append('<div id="onlinelist" class="quickpoint miniwall scaledrop fright rel"><a id="online" class="tip fright cfff tdnone quickicon tcenter zi2 rel" title="Lista online" href="http://www.wykop.pl/powiadomienia/do-mnie/"><span class="icon inlblk miniwall" style="background-position:-372px -33px;"><span>Powiadomienia</span></span><span id="ileonline" class="abs count x-small br3">0</span></a><div class="abs bgfff layer shadow dnone pding10"><div id="onlineContainer" class="fblock overa h100"></div></div></div>');
$('#onlineContainer').append('<ul id="listao" class="small showclose"></ul>');
/*GM_xmlhttpRequest*/
$.get('http://www.wykop.pl/wiadomosc-prywatna/', function(data) {
    //console.log($(data).find('li.marginbott5').has('a span').find('span'));
    var list = $(data).find('li.marginbott5').has('a span');
    ////console.log(list);
    var ile=0;
    for( var k=0; k<list.length; k++ ){
    	if(list[k].outerHTML.indexOf('color: green')!=-1){
    		//console.log(list[k].outerHTML);
    		var t = $(list[k].outerHTML).find('a').eq(0);
    			//console.log(t);
    		//for( var s in t[0] ){
    			//if(t[s].outerHTML.indexOf('span') != -1)
    			//console.log(t[s]);
    		//}
    		//console.log(t[0].children[0].alt);
    		//console.log(t[0].children[0].attributes[3].nodeValue);
    		//console.log(t[0].children[2].classList[1]);
    		var img = t[0].children[0].attributes[3].nodeValue;
			var nick = t[0].children[0].alt;
			var color = t[0].children[2].classList[1];
			$('#listao').append('<li class="brbotte8 rel"> <p class="c999 margin5_0 pdingleft20"><img width="14" height="14" class="avatar margintop2 abs left0" alt="Avatar" src="'+img+'"><a href="http://www.wykop.pl/ludzie/'+nick+'" title="profil '+nick+'" class="'+color+'"><b>'+nick+'</b> <span style="color: green; font-weight: bold; font-size: 25px; line-height: 15px; vertical-align: middle;">•</span></a></p></li>');
			ile++;
			$('#ileonline').html(ile);
    	}
    }
});


////console.log(GM_info);