// ==UserScript==
// @version			1.2
// @name           	F5Killer+ForumCleaner
// @namespace		SuperScriptsRimador
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        	http://forum.jogos.uol.com.br/*
// ==/UserScript==

//Config
var refreshes = 2;

//BACKGROUND PRINCIPAL
//Ex somente imagem: var backgroundStyle = "url('http://i.imgur.com/pfAPt.jpg')";
//Ex imagem repetida na horizontal mais cor fixa: var backgroundStyle = "#00000 url('http://i.imgur.com/pfAPt.jpg') repeat-x";
var backgroundStyle = "#00000 url('var backgroundStyle = "#00000 url('http://i.imgur.com/pfAPt.jpg') repeat-x";') repeat-x";
var backgroundMain = "";

//BACKGROUND HEADER
/* Contribuição Witch King
var backgroundHeader = {	"background" : "transparent url(http://i.imgur.com/PIjpM.png)",
							"width" : "989px",
							"height" : "100px",
							"position" : "relative" };
*/
var backgroundHeader = {	"background" : "transparent url(http://i.imgur.com/PIjpM.png)",
							"width" : "988px",
							"height" : "80px" };
//End Config

function f5Killer (iterations, contentId)
{	
		jQuery.ajax({
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
					else
					{						
						//Remapeia eventos
						var scriptTag = "<script src=\"http://jsuol.com/p/forum/j/userFunctions.js?1.1.17\" type=\"text/javascript\" ></script>";
						$("body").append(scriptTag);						
					}
					
					//Condecoracoes
					if($("#posts-container").length > 0)
					{		
						
						//$(content).find(".descricao").each(function(){alert(1)});					
						$(".descricao").each(function()
						{
							var messages = $(this).find("b").html();
							var registerDate = $(this).find(".data-cadastro > b").html();							
							var toAppend = condecorations(registerDate, messages);
							
							$(this).append(toAppend);
						});
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
		return "<strong>Newfag<strong>";
		
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
	coroas = Math.floor(meses/12);
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

	$("#header-image").css(backgroundHeader);

	if(backgroundMain != "")
	{
		$("body").first().css("background", backgroundMain);
	}
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