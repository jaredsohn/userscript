// ==UserScript==
// @name	EnlaceOgamator 
// @version	2.9
// @updateURL	http://userscripts.org/scripts/source/136162.meta.js
// @downloadURL	https://userscripts.org/scripts/source/136162.user.js
// @description	Enlace a la informacion de jugador en OGamator
// @include	http://*es.ogame.gameforge.com/game/index.php?page=galaxy*
// @include	http://*es.ogame.gameforge.com/game/index.php?page=highscore*
// @icon	http://www.ogamator.com/Media/ojito12.gif
// ==/UserScript==

	var $,j;
	var img = "http://www.ogamator.com/Media/ojito12.gif";
	var id = "";

	try { $ = unsafeWindow.$; }
	catch(e) { $ = window.$; }

	var uni = document.URL.match(/s([0-9a-zA-Z]+)/)[0].replace("s","");
	var u = $("meta[name='ogame-player-id']").attr("content");
	
	if(document.URL.indexOf("page=galaxy") > 0)
	{
		$(document).ajaxSuccess(function(e,xhr,settings){	
			if (settings.url.indexOf("page=galaxyContent") == -1) return;	

			$("#Enlace").remove();		
			$("<div id='Enlace' style='font-size:9px;background-color:#330000'>Enlace a OGamator: Click en nombre de jugador</div>").appendTo('#cutty');
			
			$("#galaxytable td.playername").each(function(i, e){

				if($(e).children("a:visible").length > 0)
				{
					id = $(e).children("a").attr("rel");		
					id = id.split("player")[1].split('"')[0];
					id = id.replace(/\D/g, '');

					if(id>0)
					{
						var eData = {idogame: id, uogame: u};					
						j = i + 1;
							
						$(".js_playerName" + j).click(function(){
							$(".frame").remove();
							$("#Enlace").remove();
							$("<iframe />", {
								id:		"frInfoJug",
								src:	"http://www.ogamator.com/miniinfo.aspx?id="+eData.idogame+"&u="+eData.uogame,
								style:	"overflow:hidden; top:100px; height:440px; width:200px; float:left",
								class: 	"frame"
							}).appendTo('#rechts');
						});			
					}
				}			
			});	
		});	
	}

	else
	{
		if(document.URL.indexOf("page=highscore") > 0)
		{	
			$(document).ajaxSuccess(function(e,xhr,settings)
			{
				$("#Enlace").remove();
				$("<div id='Enlace' style='font-size:9px;background-color:#330000'>Click en el ojito para ver info de OGamator</div>").appendTo('#cutty');
				if (settings.url.indexOf("page=highscoreContent") == -1) return;

				MostrarEnSTD();	
			});		
			MostrarEnSTD();			
		}	
	}

	function MostrarEnSTD()
	{
		$("#highscoreContent .sendmsg .sendmsg_content").each(function(i, e)
		{
			if($(e).children("a").length > 0)
			{
				id = $(e).children("a").attr("href").split("&to=")[1].split('&')[0];
			
				$(e).parent().parent().children("td.position").append("<span><img id='ogamator" + i + "' src='" + img + "' alt='o' /></span>");
				var eData = {idogame: id, uogame: u};
				
				$("#ogamator" + i).css({cursor: 'pointer'});
				$("#ogamator" + i).click(function(){
					$("#Enlace").remove();
					$(".frame").remove();
					$("<iframe />", {
						name:	"InfoJugador",
						id:		"frInfoJug",
						src:	"http://www.ogamator.com/miniinfo.aspx?uni="+uni+"&id="+eData.idogame+"&u="+eData.uogame,
						style:	"overflow:hidden; top:100px; height:440px; width:200px; float:left",
						class:	"frame"
					}).appendTo('#rechts');
				});
			}			
		});		
	}
