// (c) 2012 HAPblB
//
// ==UserScript==
// @name		HWM MercGuild additional links
// @version		0.0.5
// @description	HWM MercGuild additional links
// @include 	http://*heroeswm.*/mercenary_guild.php
// @include		http://178.248.235.15/mercenary_guild.php
// @include		http://www.heroeswm.ru/map.php
// @include		http://178.248.235.15/map.php
//@homepage 	http://userscripts.org/scripts/show/140486
// ==/UserScript==

var version = '0.0.5';

var script_num = 140486;
var script_name = 'HWM MercGuild additional links';
var string_upd = /140486=(\d+\.\d+\.\d+)/;

if(location.href.indexOf('map.php')>-1){
var all_embd=document.getElementsByTagName('embed');
    for (var i=0; i<all_embd.length;i++)
    {
        if(all_embd[i].src.indexOf('map.swf')>-1)
        {
        var main_tbl=all_embd[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			for (var j=0;j<main_tbl.childNodes.length;j++)
				if(main_tbl.childNodes[j].nodeName=='TD')
					if(main_tbl.childNodes[j].innerHTML.indexOf('\u0420\u0430\u0439\u043E\u043D:&nbsp;')>-1)
						{	var serch_td=main_tbl.childNodes[j];
							var k_regexp = /map\.php\?(cx=\d+\&amp\;cy=\d+)/ ;
							var sector=k_regexp.exec(serch_td.innerHTML)[1];
							var decrease=0;
							if(sector=='cx=51&amp;cy=50'){GM_setValue('sector', 1);decrease=1;/*alert('East Reaver');*/}
							if(sector=='cx=50&amp;cy=48'){GM_setValue('sector', 2);decrease=1;/*alert('Peasefull Camp');*/}
							if(sector=='cx=52&amp;cy=48'){GM_setValue('sector', 3);decrease=1;/*alert('Fairy Trees');*/}
							if(sector=='cx=52&amp;cy=53'){GM_setValue('sector', 4);decrease=1;/*alert('Fishing Village');*/}
							if(!decrease){GM_setValue('sector', 0);}
						}
		}
    }
}

if(location.href.indexOf('mercenary_guild.php')>-1){
var sector=GM_getValue('sector',0);
var mg_space=document.getElementsByTagName('embed')[2].parentNode.parentNode.nextSibling;
var mg_text=mg_space.innerHTML;
var link_prefix='http://www.witchhammer.ru/viewpage.php?page_id=';
var description_link=link_prefix+'9#tabs-';
var collection_link=link_prefix+'42#tabs-';
var task_type_d=0;
var task_type_c=0;

if(mg_text.search(/-\u0437\u0430\u0445\u0432\u0430\u0442\u0447\u0438\u043A\u0438 \{\d+\}/)!=-1){task_type_d=3;task_type_c=2}
if(mg_text.search(/-\u043C\u043E\u043D\u0441\u0442\u0440 \{\d+\}/)!=-1){task_type_d=6;task_type_c=3}
if(mg_text.search(/\'\u0410\u0440\u043C\u0438\u044F /)!=-1){task_type_d=1;}
if(mg_text.search(/\'\u041E\u0442\u0440\u044F\u0434 /)!=-1){task_type_d=2;task_type_c=5}
if(mg_text.search(/- \u0437\u0430\u0433\u043E\u0432\u043E\u0440\u0449\u0438\u043A\u0438 \{\d+\}/)!=-1){task_type_c=6}
if(mg_text.search(/\u0441\u043E\u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u044C \u043E\u0434\u0438\u043D \u0438\u0437 \u043A\u0430\u0440\u0430\u0432\u0430\u043D\u043E\u0432/)!=-1||mg_text.search(/\u0442\u0430\u0439\u043D\u0435 \u044D\u0442\u043E \u043F\u043E\u0440\u0443\u0447\u0435\u043D\u0438\u0435/)!=-1){task_type_d=4}
if(mg_text.search(/\u0411\u043E\u043B\u044C\u0448\u0430\u044F \u0430\u0440\u043C\u0438\u044F \'/)!=-1||mg_text.search(/\u0411\u043E\u043B\u044C\u0448\u043E\u0439 \u043E\u0442\u0440\u044F\u0434 \'/)!=-1){task_type_d=5;task_type_c=4}

var cssStyle="th {font-size : 12}";
GM_addStyle(cssStyle);
lspan=document.createElement( 'span' );
lspan.style.cssFloat = "right";
mg_space.appendChild(lspan);
fspan=document.createElement( 'span' );
fspan.style.cssFloat = "right";
var facilities='<table border=1 cellpadding=2 cellspacing=0><tbody><tr align="center"><td></td><th width="90">\u0410\u0440\u043C\u0438\u0438</td><th width="90">\u0417\u0430\u0433\u043E\u0432\u043E\u0440\u0449\u0438\u043A\u0438</th><th width="90">\u0417\u0430\u0445\u0432\u0430\u0442\u0447\u0438\u043A\u0438</th><th width="90">\u041C\u043E\u043D\u0441\u0442\u0440\u044B</th><th width="90">\u041D\u0430\u0431\u0435\u0433\u0438</th><th width="90">\u041E\u0442\u0440\u044F\u0434\u044B</th><th width="90">\u0420\u0430\u0437\u0431\u043E\u0439\u043D\u0438\u043A\u0438</th></tr><tr align="center" '+(sector==1 ? ' bgcolor="#ddddee" ' : '' )+'><td align="left">East River</td><td><b>24%</b></td><td>7%</td><td>7%</td><td><b>24%</b></td><td>7%</td><td><b>24</b>%</td><td>7%</td></tr><tr align="center"'+(sector==2 ? ' bgcolor="#ddddee" ' : '' )+'><td align="left">Peaceful Camp</td><td><b>24%</b></td><td>7%</td><td><b>24%</b></td><td>7%</td><td><b>24%</b></td><td>7%</td><td>7%</td></tr><tr align="center"'+(sector==3 ? ' bgcolor="#ddddee" ' : '' )+'><td align="left">Fairy Trees</td><td>7%</td><td><b>24%</b></td><td>7%</td><td>7%</td><td>7%</td><td><b>24%</b></td><td><b>24%</b></td></tr><tr align="center" '+(sector==4 ? ' bgcolor="#ddddee" ' : '' )+'><td align="left">Fishing Village</td><td><b>24%</b></td><td>7%</td><td>7%</td><td><b>24%</b></td><td>7%</td><td><b>24%</b></td><td>7%</td></tr></tbody></table><br><br>';
fspan.innerHTML=facilities;

if(task_type_d){
	a1 =  document.createElement( 'a' );
	a1.href=description_link+task_type_d;
	a1.target='_blank';
	a1.innerHTML="<b>\u0434\u0435\u0442\u0430\u043B\u0438 \u0438 \u0441\u043E\u0441\u0442\u0430\u0432</b>";
	lspan.appendChild(a1);
}

if(task_type_d&&task_type_c){lspan.appendChild(document.createTextNode( ' || ' ));}

if(task_type_c){
a2 =  document.createElement( 'a' );
a2.href=collection_link+task_type_c;
a2.target='_blank';
a2.innerHTML="<b>\u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0431\u043E\u0451\u0432</b>";
lspan.appendChild(a2);
}

mg_space.insertBefore(fspan,mg_space.childNodes[0]);
}

    
    