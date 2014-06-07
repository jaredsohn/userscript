// ==UserScript==
// @name           cacca
// @namespace      EX
// @description    ciax
// @include        *.grepolis.com/game/player*
// @exclude	*.css
// @exclude	*.js
// ==/UserScript==


(function(){
    var ff = (typeof unsafeWindow !== 'undefined');
    var uW = ((ff) ? unsafeWindow : window), $ = uW.jQuery;

    var player_name=$('#player_info h3').text();

    var lis=$('#player_towns LI');
    var i=lis.length;

	var str='';
	for(x=0;x<i;x++){
		var cpointsSpan = $('span', lis[x]);
		var cpt = $(cpointsSpan[0]).text(); 
		str = str + cpt.replace('(','').replace('points)','').replace(' ','');
		str = str + ' [town]';
		var cname = lis[x].childNodes[1].attributes[1].value;
		cname = cname.substr(cname.indexOf('=')+1);
		cname = cname.substr(0, cname.indexOf('&'));
		str = str + cname;
		str = str +'[/town]';
		str = str + '<br/>\n';
	}
	var lielement = '<li class="odd"><p style="text-align:center;">'
		+ 'BBCode for cites:</p>'
		+ '<p style="font-size:x-small">' + str + '</p></li>';
	$('#player_profile').append(lielement);
})();
