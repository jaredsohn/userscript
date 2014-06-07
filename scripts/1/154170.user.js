// ==UserScript==
// @name Starczy Chat
// ==/UserScript==
/* Stary Chat v2.5 by Ofkorse */
 
var oldch = {};
 
oldch.start = function()
{
		//Chat
	$("<div id='chatbox' ondblclick='oldch.copy()'></div>").css({position:'absolute', left:13, top:253, background:'url(http://desmond.imageshack.us/Himg43/scaled.php?server=43&filename=chatboxd.png&res=landing)', width:255, height:259, 'z-index':'710'}).show().appendTo("#panel");
	$("#chattxt").css({width:218, height:201, 'z-index':'301', background:'transparent', font:'10px Arial', 'z-index':'710', left:11, top:11}).appendTo("#chatbox");
	$("#inpchat").attr("onkeyup", "oldch.checkMsg()").css({width:228, height:15, 'z-index':'301', background:'transparent', font:'10px Arial', left:11, top:234, color:'white', display:'block'}).appendTo("#chatbox");
	$("#chattxt").scrollTop($("#chattxt").attr("scrollHeight"));
	$("#chatscrollbar").css({position:'absolute', left:235}).appendTo("#chatbox");
	chatScrollbar("chattxt", 500, "chatscrollbar");
 
		//Zakładki
	$("#chattabs").css({border:'3px black solid', 'z-index':'350', width:85, left:422, top:426}).appendTo("#centerbox").hide();
	$("#chattabs s").click(function(){ $(this).addClass("choosen"); });
	$("<span id='tabsbutton'>\u25c4</span>").css({'z-index':'310', color:'black', position:'absolute', left:-9, top:236, 'font-size':'15px'}).appendTo("#chatbox");
	$("#tabsbutton").click(function(){ $("#chattabs").toggle(); });
 
		//Przycisk
	$("#bchat").css({position:'absolute', left: 17, top:512, background:'url(http://img28.imageshack.us/img28/7524/chatbutton1.png)', width:68, height:20, 'background-position':'0px 0px', 'cursor':'pointer'}).appendTo("#panel");
	$("#bchat").hover(function(){ $("#bchat").css({'background-position':'0px 20px'}); }, function(){ $("#bchat").css({'background-position':'0px 0px'}); });
 
		//Dolny pasek
	$("#bottxt").remove();
	$("<div id='map_name'>"+map.name+"</div>").css({color:'#E7D798', position:'absolute', left:33, top:10, 'font-family':'Georgia', 'font-size':'12px'}).appendTo("#bottombar");
	$("#ver").css({position:'absolute', left:390, top:11}).appendTo("#bottombar");
 
		//Rozwijanie
	$(document).keypress(function(t){
		oldch.keytoggle(t);
	});
	toggleChat = function()
	{
		$("#chatbox").toggle(); 
		setTimeout('chatScrollbar("chattxt", 500, "chatscrollbar")', 50); 
		if ($("#chatbox").is(":visible")) 
		{
			$("#bchat").css({background:'url(http://img28.imageshack.us/img28/7524/chatbutton1.png)', 'background-position':'0px 20px'});
			setCookie("openChat", "0");
		}
		else 
		{
			$("#bchat").css({background:'url(http://img140.imageshack.us/img140/4097/chatbutton2.png)', 'background-position':'0px 20px'});
			setCookie("openChat", "1");
		}
	}
 
		//Sprawdzanie stanu rozwinięcia
	if (getCookie("openChat")==1) oldch.keytoggle({which:113, target:{tagName:"document"}});
 
	log("<font color='lime'>Patronem dodatku <b>Stary Chat</b> jest serwis <a href='http://margo-questy.xaa.pl' target='blank' style='color:lime;'>Margo Questy</a></font>");
}
g.loadQueue.push({fun:oldch.start, data:''});
 
 
oldch.keytoggle = function(t)
{
	if(t.which==113)
	{
		if(t.target.tagName!="INPUT" && t.target.tagName!="TEXTAREA")
		{
			if ($("#chatbox").is(":visible")) 
			{
				$("#bchat").css({background:'url(http://img140.imageshack.us/img140/4097/chatbutton2.png)'});
				setCookie("openChat", "1");
			}
			else 
			{
				$("#bchat").css({background:'url(http://img28.imageshack.us/img28/7524/chatbutton1.png)'});
				setCookie("openChat", "0");
			}
			$("#chatbox").toggle();
		}
	}
}
 
oldch.checkMsg = function()
{
	if ($("#inpchat").val().length>200) message("Wpisałeś więcej niż 200 znaków!");
}
 
	//Kopiowanie przebiegu rozmowy
oldch.copy = function()
{
	var cont = "";
	$("#chattxt>div").each(function(){
		cont+=$(this).text()+"\n";
	});
	var txtArea = $("<textarea id='chat_content_copy'>"+cont+"</textarea>").css({width:365, height:300});
	showDialog("Kopiuj przebieg rozmowy", txtArea);
}
 
	//Blokada rozwijania nowego chatu
setCookie("cy", 0);
 
	//Gwiazdka na przycisku po pojawieniu się nowej wiadomości
g.chat.parsers.push(function(ch){
	if (!$("#chatbox").is(":visible")){
		$("#bchat").css({background:'url(http://img97.imageshack.us/img97/8905/chatbutton3.png)'});
	}
});