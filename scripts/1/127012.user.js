// ==UserScript==
// @name           ScriptPirata
// @namespace      XxXScriptPirataXxX
// @description    Script pirateado crimes na internet denuncie
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://forum.jogos.uol.com.br/*
// ==/UserScript==

//Config
var refreshes = 2;

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
						//Remapeia
						var scriptTag = "<script src=\"http://jsuol.com/p/forum/j/userFunctions.js?1.1.17\" type=\"text/javascript\" ></script>";
						$("body").append(scriptTag);						
					}
					
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
							else if(nickName == "UnknownRJ")
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
							var formatted = youtube($(this).html());
							$(this).html(formatted);
							var formattedB = tagAudio($(this).html());
							$(this).html(formattedB);								
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
	//$("#bottom").remove();
	$("#admFlashContainer").remove();
	$("#publicidade").remove();

	$("#header-image").css(headerStyle);

	if(backgroundMain != "")
	{
		$("body").first().css("background", backgroundMain);
	}
}

function youtube(text)
{
	var index = -1;
		
	do
	{
		index = text.indexOf("[youtube]");
		
		if(index == -1)
		{
			break;
		}
					
		index2 = index;
		do
		{
			index2++;
			var endString = text.substr(index2, 2);
			
			if(index2 > text.length) 
			{
				break;
			}
		}
		while ( endString != "[/" );
		
		var videoId = text.substr( index + "[youtube]".length, index2 - ( index + "[youtube]".length ) );
		var tag = text.substr( index, (index2 - index) + "[/youtube]".length );

		var code = '<center><object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/' + videoId + '&hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param>	<embed src="http://www.youtube.com/v/' + videoId + '&hl=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344" wmode="transparent"></embed></object></center>';
		text = text.replace(tag, code);
		
	}while (index > -1)
	
	return text;
}


function tagAudio(v1)
{
	var index = -1;
	do
	{
		index = v1.indexOf("[audio]");
		if(index == -1) break;			
		index2 = index;
		do
		{
			index2++;
			var endString = v1.substr(index2, 2);	
			if(index2 > v1.length) break;
		}
		while ( endString != "[/" );
		var audioId = v1.substr( index + "[audio]".length, index2 - ( index + "[audio]".length ) );
		var tag = v1.substr( index, (index2 - index) + "[/audio]".length );
		var code = '<center><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="330" height="50" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param value="transparent" name="wmode"/><param name="movie" value="http://storage.mais.uol.com.br/embed_audio2.swf?mediaId=' + audioId + '" /><param name="quality" value="high" /><embed src="http://storage.mais.uol.com.br/embed_audio2.swf?mediaId=' + audioId + '" quality="high" width="330" height="50" swLiveConnect=true align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent" /></embed></object></center>';
		v1 = v1.replace(tag, code);
	}while (index > -1)	
	return v1;
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