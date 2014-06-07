// ==UserScript==
// @version			1.5.3
// @name           	F5Killer+ForumCleaner+SuperYoutube
// @namespace		SuperScriptsRimador
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        	http://forum.*.uol.com.br/*
// ==/UserScript==

//Config
var refreshes = 2;
var showPorn = true;

//BACKGROUND PRINCIPAL
//Ex somente imagem: var backgroundMain = "url('http://i.imgur.com/pfAPt.jpg')";
//Ex imagem repetida na horizontal mais cor fixa: var backgroundMain = "#00000 url('http://i.imgur.com/pfAPt.jpg') repeat-x";
var backgroundMain = "";

//BACKGROUND HEADER
/* Contribuição Witch King
var headerStyle = {	"background" : "transparent url(http://i.imgur.com/PIjpM.png)",
							"width" : "989px",
							"height" : "100px",
							"position" : "relative" };
*/
var headerStyle = {	"background" : "#333",
							"width" : "988px",
							"height" : "80px" };
//End Config

function f5Killer (iterations, contentId)
{	
	jQuery.ajax(
	{
		type: "get",
		url: document.URL,
		beforeSend: function()
		{
			if(iterations == 0)
			{
				$(contentId).hide();					
				$(contentId).html("<div style='text-align:center;padding:50px;border:10px solid #ccc'>Carregando conteúdo atualizado,<br /> E o Dalton parabenizo,<br /> Pelo fórum estragado.</div>");
				$(contentId).fadeTo("medium", 1);
			}
		},
		success: function(res)
		{ 
			iterations++;
			
			if(iterations < refreshes)
			{
				f5Killer(iterations, contentId);					
			}
			else
			{			
				var content = $(res).find(contentId);
									
				$(contentId).html(content.html());				
				$(contentId).fadeTo("medium", 1);
															
				
				//nao logado
				if($("#loga").length > 0)
				{		
					$(".login-link").attr("href","https://acesso.uol.com.br/login.html?skin=forum-jogos&dest=REDIR|" + document.location);						
				}
				
				//Remapeia
				var scriptTag = "<script src=\"http://jsuol.com/p/forum/j/userFunctions.js?1.1.17\" type=\"text/javascript\" ></script>";
				$("body").append(scriptTag);
				
				//Condecoracoes
				if($("#posts-container").length > 0)
				{										
					$(".descricao").each(function()
					{
						var messages = $(this).find("b").html();
						var registerDate = $(this).find(".data-cadastro > b").html();							
						var toAppend = "";
						var nickName = $(this).parent().find(".userNickname > a").html();
													
						if(nickName == "El Rimador")
						{
							$(this).find("b:first").html("over 90000");
							toAppend = condecorations("01/01/2002", messages);
						}
						else if(nickName == "UnknownRJ" || nickName == "Ainnem Agon")
						{
							toAppend = condecorations("01/01/2002", messages);
						}
						else
						{								
							toAppend = condecorations(registerDate, messages);
						}
						
						$(this).append(toAppend);
					});		
					
					$(".texto").each(function()
					{
						//Padrão wide 
						
						$(this).find("embed").each(function()
						{
						
							if($(this).attr("src").indexOf("youtube") != -1)
							{
								$(this).css({"width" : "640px", "height" : "390px"});
								var newURL = $(this).attr("src").replace("hl=en&fs=1", "version=3&feature=player_detailpage");
								$(this).attr("src", newURL);
							}
						});					
						
						var formatted = formatVideo($(this).html());
						
						if(showPorn)
						{
							formatted = formatPorn(formatted);
						}
						
						$(this).html(formatted);	

						$(this).find(".quote:odd").css("background", "#f9f9f9");						
					});
																
					if($("#loga").length == 0)
					{
						//Positivacoes
						$(".sprite-ico-thumb-up").click(function(){
							unsafeWindow.voting(this, "up", 6);
							return false;			
						});	
						//Negativacoes
						$(".sprite-ico-thumb-down").click(function(){
							unsafeWindow.voting(this, "down", 7);
							return false;			
						});
						
						unsafeWindow.checkVotedPosts();
					}
					
					
					
					//Redimensiona imagens
					unsafeWindow.processResize(".texto img",760);	
					
				}
				
				
				
				//Redireciona para o anchor
				if(document.URL.match(/#[0-9, lastPost]*$/))
				{
					document.location = document.URL;
				}
				
			}
		}
	 }); 
}


function condecorations(dataString, messages){
	if (messages < 200)
		return "<strong>Newfag</strong>";
		
	//Copiado do bugalton com a modificação de retorno
	var data = new Date();
	var dataSplit = dataString.split("/");
	var data2 = new Date(dataSplit[2],dataSplit[1]-1,dataSplit[0]);
	var meses = 0;
	var estrelas = 0;
	var coroas = 0;
	if (data.getDate() < data2.getDate()){
		meses -= 1;
	}
	meses += (data.getMonth() - data2.getMonth()) + (data.getFullYear() - data2.getFullYear())*12;
	//Corrigido bug do milênio das condecorações
	coroas = Math.floor(meses/12) > 10 ? 10 : Math.floor(meses/12);
	estrelas = Math.floor((meses%12)/2);
	var returnString = "";
	if (coroas > 0){
		returnString += "<p align=\"center\"><img src=\"http://forum.imguol.com/forum/themes/jogos/images/clear.gif\" class=\"master-sprite sprite-"+coroas+"c\"/></p>";
	}
	if (estrelas > 0){
		returnString +="<p align=\"center\"><img src=\"http://forum.imguol.com/forum/themes/jogos/images/clear.gif\" class=\"master-sprite sprite-"+estrelas+"e\"/></p>";
	}
	
	return returnString;
} 

function cleaner()
{
	$("#publicidade").remove();
	$("#footer").remove();
	$("#uolbar").remove();
	$("#bottom").remove();
	$("#admFlashContainer").remove();
	$("#publicidade").remove();

	$("#header-image").css(headerStyle);

	if(backgroundMain != "")
	{
		$("body").first().css("background", backgroundMain);
	}
}

function formatVideo(text)
{
	//Youtube
	var code = '<div align="center"><object style="height: 390px; width: 640px"><param name="movie" value="http://www.youtube.com/v/$1?version=3&feature=player_detailpage"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="http://www.youtube.com/v/$1?version=3&feature=player_detailpage" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="390"></object></div>';			
	text = text.replace(/\[youtube\](.*?)\[\/youtube\]/g, code);
	
	//Vimeo
	code = '<div align="center"><iframe src="http://player.vimeo.com/video/$1?title=1&amp;byline=0&amp;portrait=0" width="640" height="360" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';
	text = text.replace(/\[vimeo\](.*?)\[\/vimeo\]/g, code);	
	
	return text;
}

function formatPorn(text)
{
	//Xhamster
	var code = '<div align="center"><iframe width="640" height="390" src="http://xhamster.com/xembed.php?video=$1" frameborder="0" scrolling="no"></iframe></div>';
	text = text.replace(/\[xrato\](.*?)\[\/xrato\]/g, code);
			
	//Xavier
	code = '<div align="center"><iframe src="http://flashservice.xvideos.com/embedframe/$1" frameborder=0 width=640 height=390 scrolling=no></iframe></div>';
	text = text.replace(/\[xavier\](.*?)\[\/xavier\]/g, code);
	
	//Redtube
	code = '<div align="center"><object height="640" width="390"><param name="allowfullscreen" value="false"><param name="AllowScriptAccess" value="always"><param name="movie" value="http://embed.redtube.com/player/"><param name="FlashVars" value="id=$1&style=redtube&autostart=false"><embed src="http://embed.redtube.com/player/?id=$1&style=redtube" allowfullscreen="false" AllowScriptAccess="always" flashvars="autostart=false" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" height="390" width="640" /></object></div>';
	text = text.replace(/\[tubovermelho\](.*?)\[\/tubovermelho\]/g, code);
	
	return text;
	
}

$(document).ready(function()
{	
	cleaner();	
	
	if($("#profile-main").length > 0)
	{
		f5Killer(0, "#topicsDiv");
	}
	else if($("#topics").length > 0 || $("#posts-container").length > 0)
	{
		f5Killer(0, "#contentDiv");
	}						
	
});

$(document).keydown(function(e) 
{
	if((e.ctrlKey || e.metaKey) && e.keyCode == 82)
	{		
		e.preventDefault();
		if($("#profile-main").length > 0)
		{
			f5Killer(0, "#topicsDiv");
		}
		else if($("#topics").length > 0 || $("#posts-container").length > 0)
		{
			f5Killer(0, "#contentDiv");
		}		
	}
});
