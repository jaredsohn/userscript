// ==UserScript==
// @name          HWM_Medals_Degree
// @description   HWM_Medals_Degree
// @version 0.0.5
// @include        http://www.heroeswm.ru/pl_info.php?*
// @homepage      http://userscripts.org/scripts/show/75445
// ==/UserScript==
// ===================  =================================

var version = '0.0.5';

var script_num = 75445
var script_name = 'HWM_Medals_Degree';
var string_upd = /75445=(\d+\.\d+\.\d+)/;


var show_legend = true;

var all_tables=document.getElementsByTagName('tr');
var pattern=/\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F/;
var cssStyle = "";
cssStyle+=".order {background-repeat: no-repeat; background-position: center center;  }}";
GM_addStyle(cssStyle);

for(var i=0;i<all_tables.length;i++){
var cur_tb=all_tables[i];
if(cur_tb.childNodes[0])
	if(cur_tb.childNodes[0].childNodes[0])
		if(cur_tb.childNodes[0].childNodes[0].textContent)
			if(cur_tb.childNodes[0].childNodes[0].textContent.match(pattern))
	{
	
	
	var work_table=cur_tb.parentNode.parentNode;
	var all_medals=work_table.getElementsByTagName('img');

		for(var u=all_medals.length-1;u>=0;u--)
			{
				if(all_medals[u].hasAttribute('title'))		
					
				{
					var medal_title=all_medals[u].getAttribute('title');
					var medal_src=all_medals[u].getAttribute('src');
						
						if(medal_title.match(/\u0442\u0435\u043F\u0435\u043D/))
								{
								var level_div=document.createElement('div');
								var current_medal=all_medals[u].parentNode;
								all_medals[u].setAttribute('border' , '3');
								all_medals[u].setAttribute('src' , ' ');
								current_medal.style.backgroundImage= "url('"+medal_src+"')";
								current_medal.className="order";
								current_medal.setAttribute('width' , '54');
								current_medal.setAttribute('valign' , 'bottom');
								current_medal.setAttribute('height' , '54');
								current_medal.setAttribute('align' , 'right');
								current_medal.setAttribute('title',medal_title);
								level_div.style.fontSize = '12px' ;
								level_div.setAttribute('style','margin: 0px; font-weight: bold; background-image: url(http://im.heroeswm.ru/i/rewards/prs.gif); background-repeat: no-repeat; background-position: right; width: 48px; height: 15px;valign = middle; text-align: right');
								var level_order=(/\d/).exec(medal_title)[0];
								level_div.innerHTML= level_order+'&nbsp;';
								current_medal.removeChild( all_medals[u] );
								current_medal.appendChild(level_div);
								}
					
				}
		}
		
		

		if(show_legend)
			{	
				var all_tournament_medals=document.getElementsByTagName('td');
				//alert(all_tournament_medals.length);
				var legend = new Array();
				var tour_pattern = /(url\()(.*)(\);)/;
				var is_tour = /\u0443\u0440\u043D\u0438\u0440/;
				var title_pattern=/(.*)(\.)(.*)(\.)(.*)(\.)/;
				
				for(var t=0;t<all_tournament_medals.length;t++)
					{
					if(all_tournament_medals[t].hasAttribute('title'))		
						{
							var tournament_title=all_tournament_medals[t].getAttribute('title');
							if(tournament_title.match(is_tour))
								{
								tournament_title=tournament_title.replace(title_pattern,'$1$2$3$4<br>$5$6');
								var tournaments_style=all_tournament_medals[t].getAttribute('style');
								var tour_ico=tour_pattern.exec(tournaments_style)[2];
								legend.push(new Array(tournament_title,tour_ico));
								}
							
						}
					}

				if(legend.length){
					var legend_div=document.createElement("div");
					legend_div.setAttribute('id','tour_list');
					legend_div.setAttribute('align','left');
					legend_div.setAttribute('valign','center');
					var new_inner="<table width='100%' border='1'  cellspacing='0' cellpadding='0' ><tbody><tr>";
					for(var l=0;l<legend.length;l++){new_inner+="<td width=30><img src="+legend[l][1]+" width=30 height=30 border=1 align=middle></td><td align=center><b>"+legend[l][0]+"</b></td>"+(l%2 ? "</tr><tr>":""); }
					new_inner+="</tr></tbody></table>";
					legend_div.innerHTML=new_inner;
					work_table.appendChild(legend_div);
				}
			
			//alert(legend);
			}
		
	}
}