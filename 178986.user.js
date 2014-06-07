// ==UserScript==
// @author         FlyingEagle
// @name           ImprovedMgHockey
// @namespace      ImprovedMgHockeyProject
// @description    Elevating MgHockey to another level
// @version        Alpha 0.2o
// @include        http://mghockey.playsics.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require        http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @grant unsafeWindow	
// @grant GM_addStyle
// @grant GM_getResourceText
// ==/UserScript==

$(function()
  {		
      $("#mainContent").css("background-image","url(http://imageshack.com/a/img89/2476/r4q9.jpg)");
      $(".tablehighlight").css("background","green");
      $("::selection").css("background-color","#00a8ff");
      $("::selection").css("text-shadow","none");
      $("::selection").css("color","#000a32");
      $("#imgNews").css("width","790px");
	  $("#imgNews").css("height","13px");
	  $("#imgNews").css("background-color","aliceblue");
	  $("#imgNews").css("border","3px ridge blue");
	  $("#imgNews").css("position","relative");
	  $("#imgNews").css("overflow","hidden");
      $("#imgNews").css("margin","0");
	  
	  $("::-webkit-scrollbar-thumb").css("border-radius","10px");	
	  
      $('img').hover(function()
      {
          	//http://shared.playsics.com/managergames/hockey_player_"
        if(this.getAttribute("src").indexOf("images.powerplaymanager.com")!=-1 /*|| this.getAttribute("src").indexOf("player")!=-1*/ /*&&
          this.getAttribute("src") != "img/cs/player_picture_blank.jpg"*/) ///ppm/player_faces/
        {
            //alert(this.getAttribute("src"));
            $("#faceViewer").remove();
			var faceViewer = document.createElement("img");
   			faceViewer.id = "faceViewer";
    		faceViewer.style.top = "250px";
            faceViewer.style.left = "100px";
  		  	faceViewer.style.width = "135px"; 
    		faceViewer.style.height = "180px"; 
    		faceViewer.style.position = "fixed";
			faceViewer.style.opacity = "0.9";
            faceViewer.style.border = "3px ridge brown";
            faceViewer.src = this.getAttribute("src");
			document.getElementById("mainContent").appendChild(faceViewer); 
	    }
      });
      $('img').mouseleave(function()
        { 
            if(this.getAttribute("src").indexOf("/ppm/player_faces/")!=-1)
        	{
        	$("#faceViewer").remove();
            }
        });
             
   var maxEntries = 1; // if 0 then there will be no limit
      /*NHL.COM:
 $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http://www.nhl.com/rss/news.xml%22&format=json", */
 $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http://www.nhl.cz/rss/%22&format=json", 
  function(d) {
  var count = 0;
  $(d.query.results.rss.channel.item).each(function() {
    if(maxEntries == 0 || maxEntries>count){
     var rand = Math.floor((Math.random()*9)+0);
     var title = d.query.results.rss.channel.item[rand].title; 
     var link = d.query.results.rss.channel.item[rand].link;
     var description = d.query.results.rss.channel.item[rand].description;
     var pubDate = d.query.results.rss.channel.item[rand].pubDate;

     var anItem = "<a href='"+link+"' target='_blank'>"+title+"</a><br>";
     $("#imgNews").append(anItem);
	 
	 $("#imgNews>a").css("text-decoration","none");
	 $("#imgNews>a").css("color","black");
	 $("#imgNews>a").css("font-weight","bold");
	 //$("#imgNews>a").css("padding-left","600px");
	 $("#imgNews>a").css("position","relative");
	 $("#imgNews>a").css("font-size","9px");
	 $("#imgNews>a").css("font-family","Lucida Grande");
	 $("#imgNews>a").css("bottom","0.5px");
     $("#imgNews>a").css("float","right");
        
     setInterval(scroll(),2000);
     function scroll() {
     $("#imgNews>a").css("color","black");
     $("#imgNews>a").animate({
    right: "+=900",
  }, 15000, function() {
     $("#imgNews>a").css("float","left");
  	});
     $("#imgNews>a").animate({
    left: "+=900",
  	}, 15000, scroll);
    }
        
     count++;
    }
  	 });
 	});
      
      //Odstranění zebry, změna barvy gradient pozadí
      //zebry:
      tdTags = document.getElementsByTagName("td");
      for(var i = 0;i<tdTags.length; i++)
      {
       if(document.URL != "http://mghockey.playsics.com/indexInternal.es?action=internalTeamLineUp&type=pro" && 
          document.URL != "http://mghockey.playsics.com/indexInternal.es?action=internalTeamLineUp&type=youth" &&
          document.URL != "http://mghockey.playsics.com/indexInternal.es?action=internalTeamLineUp&type=cup" &&
          document.URL != "http://mghockey.playsics.com/indexInternal.es?action=internalTeamLineUp&type=clan")
      	{
      	if(tdTags[i].getAttribute("background") == "img/de/main_zebra.gif")
        {
        	$(tdTags[i]).remove();
        }
         }
         //gradient:
          if(tdTags[i].getAttribute("background") == "img/de/main_gradient_dark.gif")
          {
              tdTags[i].setAttribute("background","");
              $(tdTags[i]).css("background-color","brown");
          }
      }
      
      var imgs = document.getElementsByTagName("img");
      for(var i = 0; i<imgs.length; i++)
      {									/*src="http://shared.playsics.com/managergames/hockey_player_284767906.gif?default=hockey_player_default.gif"*/
      	if(imgs[i].getAttribute("src").indexOf("http://shared.playsics.com/managergames/hockey_player_")!=-1)
        {
        	var url = imgs[i].getAttribute("src");
            var playerId = url.match(/[0-9]{1,20}/g);
            imgs[i].setAttribute("src","http://images.powerplaymanager.com/ppm/player_faces/ppm_player_face.dpng?id=" + playerId);
        }
        
        if(imgs[i].getAttribute("src").indexOf("http://shared.playsics.com/managergames/hockey_playersmall_")!=-1)
        {
            var url = imgs[i].getAttribute("src");
            var playerId = url.match(/[0-9]{1,20}/g);
            imgs[i].setAttribute("src","http://images.powerplaymanager.com/ppm/player_faces/ppm_player_face.dpng?id=" + playerId);
        }
       
        if(imgs[i].getAttribute("src").indexOf("?default=hockey_player_default.gif")!=-1)
        {
            var url = imgs[i].getAttribute("src");
            var playerId = url.match(/[0-9]{1,20}/g);
            imgs[i].setAttribute("src","http://images.powerplaymanager.com/ppm/player_faces/ppm_player_face.dpng?id=" + playerId);
        }
          
           if(imgs[i].getAttribute("src").indexOf("hockey_player_")!=-1)
        {
            var url = imgs[i].getAttribute("src");
            var playerId = url.match(/[0-9]{1,20}/g);
            imgs[i].setAttribute("src","http://images.powerplaymanager.com/ppm/player_faces/ppm_player_face.dpng?id=" + playerId);
        } 
      }
      
       $('img').hover(function()
      {
          //alert(this.getAttribute("src"));										  http://shared.playsics.com/managergames/hockey_player_"
        if(this.getAttribute("src").indexOf("images.powerplaymanager.com")!=-1 || this.getAttribute("src").indexOf("hockey_player")!=-1 /*&&
          this.getAttribute("src") != "img/cs/player_picture_blank.jpg"*/) ///ppm/player_faces/
        {
            $("#faceViewer").remove();
			var faceViewer = document.createElement("img");
   			faceViewer.id = "faceViewer";
    		faceViewer.style.top = "250px";
            faceViewer.style.left = "100px";
  		  	faceViewer.style.width = "135px"; 
    		faceViewer.style.height = "180px"; 
    		faceViewer.style.position = "fixed";
			faceViewer.style.opacity = "0.9";
            faceViewer.style.border = "3px ridge brown";
            faceViewer.src = this.getAttribute("src");
			document.getElementById("mainContent").appendChild(faceViewer); 
	    }
      });
      
      $('img').mouseleave(function()
        { 
            if(this.getAttribute("src").indexOf("/ppm/player_faces/")!=-1)
        	{
        	$("#faceViewer").remove();
            }
        });
		    
      //Při změně velikosti prohližeče:
       if(window.innerWidth != screen.width && window.innerHeight != screen.height)
       $("#leftPlayer").hide();
       else
       $("#leftPlayer").show();
      $(window).resize(function()
      {
        if(window.innerWidth != screen.width && window.innerHeight != screen.height)
      	$("#leftPlayer").hide();
     	else
        $("#leftPlayer").show();
      });
      
      //DESIGN NAVIGACE:
		$("#imgNavSen").hide();
		$("#imgNavJun").hide();
		$("#imgNavTym").hide();
		$("#imgNavKan").hide();
		$("#imgNavTab").hide();
		$("#imgNavKlub").hide();
		$("#imgNavPoh").hide();
		$("#imgNavProf").hide();

		$("#imgNav").css("width","800px");
		$("#imgNav").css("font-size","12.4px");
        $("#imgNav").css("height","28px");
        $("#imgNews").css("margin-top","-8px");
      	$("#imgNews").css("margin-bottom","0px !important");
		$("#imgNav ul").css("list-style-type","none");		
		$("#imgUL li a").css("text-decoration","none");
		$("#imgUL li a").css("color","white");
		$("#imgUL li").css("font-weight","bold");
		$("#imgUL li").css("color","white");
		$("#imgUL li").css("padding-left","15px");
		$("#imgUL li").css("position","relative");
		$("#imgUL li").css("background-color","blue");
		$("#imgUL li").css("padding","5px");
		$("#imgUL li").css("border","3px ridge");
		$("#imgNav ul li").css("display","table-cell"); /*table-cell*/
		$("#imgUL ul").css("position","absolute");
		$("#imgUL ul").css("left","-10px");
		$("#imgUL ul").css("top","25px");
		$("#imgUL ul li").css("padding-left","20px");
		$("#imgUL ul li").css("padding-right","20px");
		$("#imgUL ul li").css("display","block");
      	$("#imgUL ul li").css("z-index","300");

		$("#imgNav ul li").hover(function()
			{
				if($(this).html().indexOf("Senioři")>-1)
				$("#imgNavSen").slideDown("fast");
				if($(this).html().indexOf("Junioři")>-1)
				$("#imgNavJun").slideDown("fast");
				if($(this).html().indexOf("Řízení týmu")>-1)
				$("#imgNavTym").slideDown("fast");
				if($(this).html().indexOf("Kancelář")>-1)
				$("#imgNavKan").slideDown("fast");
				if($(this).html().indexOf("Tabulky a termíny")>-1)
				$("#imgNavTab").slideDown("fast");
				if($(this).html().indexOf("Klub")>-1)
				$("#imgNavKlub").slideDown("fast");
				if($(this).html().indexOf("Světový pohár")>-1)
				$("#imgNavPoh").slideDown("fast");
				if($(this).html().indexOf("Profil")>-1)
				$("#imgNavProf").slideDown("fast");
			});
      
		$("#imgNav ul li").mouseleave(function()
			{
				
				if($(this).html().indexOf("Senioři")>-1)
				$("#imgNavSen").slideUp("fast");
				if($(this).html().indexOf("Junioři")>-1)
				$("#imgNavJun").slideUp("fast");
				if($(this).html().indexOf("Řízení týmu")>-1)
				$("#imgNavTym").slideUp("fast");
				if($(this).html().indexOf("Kancelář")>-1)
				$("#imgNavKan").slideUp("fast");
				if($(this).html().indexOf("Tabulky a termíny")>-1)		
				$("#imgNavTab").slideUp("fast");
				if($(this).html().indexOf("Klub")>-1)
				$("#imgNavKlub").slideUp("fast");
				if($(this).html().indexOf("Světový pohár")>-1)
				$("#imgNavPoh").slideUp("fast");
				if($(this).html().indexOf("Profil")>-1)
				$("#imgNavProf").slideUp("fast");
			});
  });

//navigace:
var tableTags = document.getElementsByTagName("table");
var strVar="";
strVar += "<nav id = \"imgNav\">";
strVar += "	<ul id = \"imgUL\">";
strVar += "		<li><a href = 'http://mghockey.playsics.com/indexInternal.es?action=internalHome'>Úvodní strana</a><\/li>";
strVar += "		<li>Senioři";
strVar += "		<ul id = \"imgNavSen\">";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamPlayer&type=pro\">Přehled<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamTraining&type=pro\">Trénink<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamLineUp&type=pro\">Sestava<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamStrategist&type=pro\">Strategie<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamAssign&type=pro\">Přiřazení<\/a><\/li>";
strVar += "		<\/ul>";
strVar += "		<\/li>";
strVar += "		<li>Junioři";
strVar += "		<ul id = \"imgNavJun\">";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamPlayer&type=youth\">Přehled<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamTraining&type=youth\">Trénink<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamLineUp&type=youth\">Sestava<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamStrategist&type=youth\">Strategie<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamAssign&type=youth\">Přiřazení<\/a><\/li>";
strVar += "		<\/ul><\/li>";
strVar += "		<li>Řízení týmu";
strVar += "			<ul id = \"imgNavTym\">";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalManagementContracts\">Smlouvy<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalManagementBonus\">Prémie<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalManagementTrainingCamp\">Tréninkový tábor<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalManagementTalk\">Rozhovory<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalFriendlyGames\">Přátelské utkání<\/a><\/li>";
strVar += "		<\/ul><\/li>";
strVar += "		<li>Kancelář";
strVar += "		<ul id = \"imgNavKan\">";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalOfficeBank\">Banka a bilance<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalOfficeStock\">Burza<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalOfficeAuction\">Aukční dům<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalOfficeTransfer\">Trh s hráči<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalOfficeMerchandising\">Výroba a prodej<\/a><\/li>";
strVar += "		<\/ul><\/li>";
strVar += "		<li><a href = 'http://mghockey.playsics.com/indexInternal.es?action=internalStadium'>Stadion<\/a><\/li>";
strVar += "		<li>Tabulky a termíny";
strVar += "		<ul id = \"imgNavTab\">";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalDateStanding&type=pro\">Tabulka seniorů<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalDateGames&type=pro\">Utkání seniorů<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalDateStanding&type=youth\">Tabulka juniorů<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalDateGames&type=youth\">Utkání juniorů<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalDateStatistics\">Statistika utkání<\/a><\/li>";
strVar += "		<\/ul><\/li>";
strVar += "		<li>Klub";
strVar += "			<ul id = \"imgNavKlub\">";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalClanOverview\">Přehled<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalDateGames&type=clan\">Klubové utkání<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamLineUp&type=clan\">Sestava<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamStrategist&type=clan\">Strategie<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamAssign&type=clan\">Přiřazení<\/a><\/li>";
strVar += "		<\/ul><\/li>";
strVar += "		<li>Světový pohár";
strVar += "			<ul id = \"imgNavPoh\">";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalCupGames\">Tabulky a rozpis<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalCupStanding\">Kvalifikace<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamLineUp&type=cup\">Sestava<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamStrategist&type=cup\">Strategie<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalTeamAssign&type=cup\">Přiřazení<\/a><\/li>";
strVar += "		<\/ul><\/li>";
strVar += "		<li>Profil";
strVar += "			<ul id = \"imgNavProf\">";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalMessages\">Zprávy<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalProfileSettings\">Nastavení<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalProfileHomepage\">Web týmu<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalProfilePromotion\">Prezentace<\/a><\/li>";
strVar += "			<li><a href=\"http://mghockey.playsics.com/indexInternal.es?action=internalProfilePromotion\">Odhlášení<\/a><\/li>";
strVar += "		<\/ul><\/li>";
strVar += "	<\/ul>";
strVar += "<\/nav>";
strVar += "<br><div id = 'imgNews'></div>";

for(var i = 0; i< tableTags.length; i++)
{																															/*'pozadi'*/
			if(tableTags[i].getAttribute("width") == "820") tableTags[i].setAttribute("style","margin-bottom:0px;background-color:#ecf0f1");
    //moje navigace:
    		else if(tableTags[i].getAttribute("width") == "800" && tableTags[i].getAttribute("style") == "margin-left:0px;") //tableTags[i].style.display = 'none';
    		{	 		 
             tableTags[i].parentNode.innerHTML = strVar; 
    		}
            //else i = tableTags.length;
}

//HLAVNÍ STRÁNKA  
if(document.URL.indexOf("http://mghockey.playsics.com/indexInternal.es?action=internalHome")>-1)
{  
	var tdz = document.getElementsByTagName("td");
	
	for(var i = 0; i <tdz.length; i++)
	{
		if(tdz[i].innerHTML == "Tým:")
		{
			//alert("YEP " + tdz[i].parentNode.childNodes[0].childNodes[1].innerHTML);
		}
	}

    /*nahrazení ikony credits od bigpointu*/
    
    imgTags = document.getElementsByTagName("img");
    
    for(var i = 0; i<imgTags.length; i++)
    {
        try{
            
        if(imgTags[i].getAttribute("src") == "img/cs/btn_credits.jpg" && imgTags[i].parentNode.getAttribute("href") == "indexInternal.es?action=internalPayment")
        {
			var creds = imgTags[i];
            var date = new Date();
            
            if(date.getDate() == "29" || date.getDate() == "30" || date.getDate() == "31")
            {
                var creds = imgTags[i];
                
                //creds.parentNode.setAttribute("href","");
                creds.parentNode.innerHTML = "<div id = 'newCreds' style = 'background-color:brown;color:#ffcc00;border: 3px ridge #3E0000;border-right: none;width:197px;height:94px'><div>";
                //creds.innerHTML = "<h1>Další sezóna za námi</h1>";
                var news = document.createElement("div");
                news.id = "news";
                news.width = "197px";
                news.height = "94px";
                news.innerHTML = "<h3 style = 'text-align:center'>Další sezóna je za námi</h3>"
                + "<img src = 'http://imageshack.com/a/img713/5950/5p0h.jpg' width = '52px' height = '52px' style = 'position:relative;left:5px; bottom:10px'/>"
                + "<p style = 'position:relative;bottom: 70px;left:60px;font-size:9px;'>Hráči dokončili sezónu,<br>tým přežil kontrolu,<br>"
                + "čas připravit se na další boj<br> o titul.</p>";
                document.getElementById("newCreds").appendChild(news);
           }
           else
            {			
				var teamName = getTeamName();
				var rivalName = "RivalName not loaded";
	
				AjaxRequest = new XMLHttpRequest();
				AjaxRequest.onreadystatechange = function(){
						
				if(AjaxRequest.readyState == 4){
						var doc = document.implementation.createHTMLDocument('html');
						doc.documentElement.innerHTML = AjaxRequest.responseText;
						
						stds = doc.getElementsByClassName("std");
			
						for (var i = 0; i<stds.length; i++) {
							if(stds[i].innerHTML.indexOf(teamName)!=-1 && stds[i+1].innerHTML == "<b>:</b>")
							{
								 var rivalName = stds[i+2].innerHTML;
									
							creds.parentNode.setAttribute("href","");
							creds.parentNode.innerHTML = "<div id = 'newCreds' style = 'background-color:brown;border: 3px ridge #3E0000;border-right: 										none;width:197px;height:94px'>"
							+"<table>"
							+"<th style = 'color:#ffcc00;text-align:center;font-size:10px'>Dnešní zápasy:</th>"
							+"<tr><td style = 'color:#F8F7F7;font-size:9px'>S: "+ teamName + "<sub>(D)</sub>" + " vs " + "<a style = 'color:#f39c12;font-size:9px' href = " + stds[i+2].parentNode.getAttribute("href") + "&tab=teamspy&type=pro" + ">" + rivalName + "</a>" + "</td></tr>"
							+"</table>";
							}
							
							else if(stds[i].innerHTML.indexOf(teamName)!=-1 && stds[i-1].innerHTML == "<b>:</b>")
							{
								var rivalName = stds[i-2].innerHTML;
									
							creds.parentNode.setAttribute("href","");
							creds.parentNode.innerHTML = "<div id = 'newCreds' style = 'background-color:brown;border: 3px ridge #3E0000;border-right: 										none;width:197px;height:94px'>"
							+"<table>"
							+"<th style = 'color:#ffcc00;text-align:center;'>Dnešní zápasy:</th>"
							+"<tr><td style = 'color:#F8F7F7;font-size:9px'>S: "+ teamName + "<sub>(H)</sub>" + " vs " + "<a style = 'color:#f39c12;font-size:9px' href = " + stds[i+2].parentNode.getAttribute("href") + "&tab=teamspy&type=pro"+">" + rivalName + "</a>" + "</td></tr>"
							+"</table>";
								
							}
						}
					   
            }
          }
	
    AjaxRequest.open("GET", "http://mghockey.playsics.com/indexInternal.es?action=internalDateGames&type=pro", true);
  	AjaxRequest.send(null);

				var YteamName = getTeamName();
				var YrivalName = "RivalName not loaded";
	
				YAjaxRequest = new XMLHttpRequest();
				YAjaxRequest.onreadystatechange = function(){
						
				if(YAjaxRequest.readyState == 4){
						var doc = document.implementation.createHTMLDocument('html');
						doc.documentElement.innerHTML = YAjaxRequest.responseText;
						
						stds = doc.getElementsByClassName("std");
			
						for (var i = 0; i<stds.length; i++) {
							if(stds[i].innerHTML.indexOf(teamName)!=-1 && stds[i+1].innerHTML == "<b>:</b>")
							{
								 var YrivalName = stds[i+2].innerHTML;
								document.getElementById("newCreds").innerHTML += "<table style = 'font-size:9px !important'><tr><td style = 'color:#bdc3c7 !important;font-size:9px'>J: "+ YteamName + "<sub>(D)</sub>" + " vs " + "<a style = 'color:#f39c12;font-size:9px' href = " + 					                                         stds[i+2].parentNode.getAttribute("href") + "&tab=teamspy&type=youth" + ">" + YrivalName + "</a>" + "</td></tr>";
							+"</table>"
							+"</div>";
							}
							
							else if(stds[i].innerHTML.indexOf(teamName)!=-1 && stds[i-1].innerHTML == "<b>:</b>")
							{
								var YrivalName = stds[i-2].innerHTML;
								document.getElementById("newCreds").innerHTML += "<table style = 'font-size:9px !important'><tr><td style = 'color:#bdc3c7 !important;font-size:9px'>J: "+ YteamName + "<sub>(H)</sub>" + " vs " + "<a style = 'color:#f39c12;font-size:9px' href = " + stds[i-2].parentNode.getAttribute("href") + "&tab=teamspy&type=youth" + ">" + YrivalName + "</a>" + "</td></tr>";
							+"</table>"
							+"</div>";
							}
						}
					   
            }
          }
	
    YAjaxRequest.open("GET", "http://mghockey.playsics.com/indexInternal.es?action=internalDateGames&type=youth", true);
  	YAjaxRequest.send(null);
            }
        }
            
       }
        catch(exception){
            console.log(exception);
            }
    }
     /*k-nahrazení ikony credits od bigpointu*/
    

    ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function(){
            
    if(ajaxRequest.readyState == 4){
            
            var regExp = /[0-9]{1,6000} \/ [0-9]{1,6000}/;
            
            var doc = document.implementation.createHTMLDocument('html');
      		doc.documentElement.innerHTML = ajaxRequest.responseText;
        
            trs = doc.getElementsByTagName("tr");
        	
        	var jmeno = new Array();
        	var goly = new Array();
        	var zapasy = new Array();
        	var pozice = new Array();
        	var vek = new Array();
        	var g = new Array();
        	var usp = new Array();
        	var prm = new Array();
            
            for(var i = 0; i<=trs.length; i++)
            {
                try{
                    //console.log("vypis: " + trs[i].cells[0].childNodes[0].innerHTML);
                     if(trs[i].cells[7].childNodes[0].innerHTML.match(regExp) && trs[i].cells[2].childNodes[0].innerHTML != 
                       "Brankář" && trs[i].cells[0].childNodes[0].childNodes[0].innerHTML != "Celkem")
               		 {
                         jmeno[i] = trs[i].cells[0].childNodes[0].childNodes[0].innerHTML;
                         goly[i] = parseInt(trs[i].cells[7].childNodes[0].innerHTML.split(" / ",1));
                         zapasy[i] = parseInt(trs[i].cells[6].childNodes[0].innerHTML);
                         pozice[i] = trs[i].cells[2].childNodes[0].innerHTML;
                         vek[i] = trs[i].cells[1].childNodes[0].innerHTML;

                         document.getElementById("iMGsenStats").innerHTML += "<li style = 'color:#e74c3c;font-weight:bold'>" + jmeno[i] + " " + 
                         goly[i] + " " + zapasy[i] + "<br>" + pozice[i] + " " + vek[i] + " let" + "<\li><br>";
                       
                     }
                    else console.log("Bad senior player!");

                 if(trs[i].cells[7].childNodes[0].innerHTML.match(regExp) && trs[i].cells[2].childNodes[0].innerHTML == 
                       "Brankář" && trs[i].cells[0].childNodes[0].childNodes[0].innerHTML != "Celkem")
                {
                         jmeno[i] = trs[i].cells[0].childNodes[0].childNodes[0].innerHTML;
                         g = trs[i].cells[8].childNodes[0].innerHTML.split(" / ");
                   	     //alert(g[0]); alert(g[1]);
                         zapasy[i] = parseInt(trs[i].cells[6].childNodes[0].innerHTML);
                         pozice[i] = trs[i].cells[2].childNodes[0].innerHTML;
						 vek[i] = trs[i].cells[1].childNodes[0].innerHTML;

                    if(zapasy[i] == 0)
                    {
                        goly[i] = 0;
						usp[i] = 0;
						prm[i] = 0;	
                    }
                    else
                    {
                    	 goly[i] = g[1] - g[0];
						 usp[i] = Number(g[0]/g[1]*100).toFixed(2);
						 prm[i] = Number(goly[i]/zapasy[i]).toFixed(4);
                    }
                        
                         document.getElementById("iMGsenStats").innerHTML += "<li style = 'color:#e74c3c;font-weight:bold'>" + jmeno[i] + " " + 
                         goly[i] + " " + zapasy[i] + " " + usp[i] + "%" + " " + prm[i] + "<br>" + pozice[i] + " " + vek[i] + " let" + "<\li><br>";
					
                }
                else console.log("Bad senior goalie!");
              }
                catch(exception){
                    }
            }
          }
        }
    
    ajaxRequest.open("GET", "http://mghockey.playsics.com/indexInternal.es?&action=internalDateStatistics&frmSearch_player=PRO", true);
  	ajaxRequest.send(null); 
    
    ajaxRequest2 = new XMLHttpRequest();
    ajaxRequest2.onreadystatechange = function(){
            
    if(ajaxRequest2.readyState == 4){
            
            var regExp2 = /[0-9]{1,6000} \/ [0-9]{1,6000}/;
            
            var doc = document.implementation.createHTMLDocument('html');
      		doc.documentElement.innerHTML = ajaxRequest2.responseText;
        
            trs = doc.getElementsByTagName("tr");
        	
        	var junJmeno = new Array();
        	var junGoly = new Array();
        	var junZapasy = new Array();
        	var junPozice = new Array();
            var junVek = new Array();
        	var junGoly = new Array();
        	var junZapasy = new Array();
        	var junPozice = new Array();
        	var junVek = new Array();
        
        	var jmeno = new Array();
        	var goly = new Array();
        	var zapasy = new Array();
        	var pozice = new Array();
        	var vek = new Array();
        	var g = new Array();
        	var usp = new Array();
        	var prm = new Array();
            

            
            for(var i = 0; i<=trs.length; i++)
            {
                try{
                    //console.log("vypis: " + trs[i].cells[0].childNodes[0].innerHTML);
                    if(trs[i].cells[7].childNodes[0].innerHTML.match(regExp2) && trs[i].cells[2].childNodes[0].innerHTML != 
                       "Brankář" && trs[i].cells[0].childNodes[0].childNodes[0].innerHTML != "Celkem")
               		 {
                         junJmeno[i] = trs[i].cells[0].childNodes[0].childNodes[0].innerHTML;
                         junGoly[i] = parseInt(trs[i].cells[7].childNodes[0].innerHTML.split(" / ",1));
                         junZapasy[i] = parseInt(trs[i].cells[6].childNodes[0].innerHTML);
                         junPozice[i] = trs[i].cells[2].childNodes[0].innerHTML;
                         junVek[i] = trs[i].cells[1].childNodes[0].innerHTML;


                         document.getElementById("iMGjunStats").innerHTML += "<li style = 'color:#00C055;font-weight:bold;font-family:arial, sans-serif'>" + junJmeno[i] + " " + 
                         junGoly[i] + " " + junZapasy[i] + "<br>" + junPozice[i] + " " + junVek[i] + " let" + "<\li><br>";
                      			
                     }
                    else console.log("Bad junior player!");
                            
                 if(trs[i].cells[7].childNodes[0].innerHTML.match(regExp2) && trs[i].cells[2].childNodes[0].innerHTML == 
                       "Brankář" && trs[i].cells[0].childNodes[0].childNodes[0].innerHTML != "Celkem")
                { 
                         jmeno[i] = trs[i].cells[0].childNodes[0].childNodes[0].innerHTML;
                         g = trs[i].cells[8].childNodes[0].innerHTML.split(" / ");
                   	     //alert(g[0]); alert(g[1]);
                         zapasy[i] = parseInt(trs[i].cells[6].childNodes[0].innerHTML);
                         pozice[i] = trs[i].cells[2].childNodes[0].innerHTML;
						 vek[i] = trs[i].cells[1].childNodes[0].innerHTML;

                    if(zapasy[i] == 0)
                    {
                        goly[i] = 0;
						usp[i] = 0;
						prm[i] = 0;	
                    }
                    else
                    {
                    	 goly[i] = g[1] - g[0];
						 usp[i] = Number(g[0]/g[1]*100).toFixed(2);
						 prm[i] = Number(goly[i]/zapasy[i]).toFixed(4);
                    }
                        
                         document.getElementById("iMGjunStats").innerHTML += "<li style = 'color:#00C055;font-weight:bold'>" + jmeno[i] + " " + 
                         goly[i] + " " + zapasy[i] + " " + usp[i] + "%" + " " + prm[i] + "<br>" + pozice[i] + " " + vek[i] + " let" + "<\li><br>";
		
                }
                else console.log("Bad junior goalie!");
                  }
                catch(exception){
                    }
            }
          }
          var imgs = document.getElementsByTagName("img");
      for(var i = 0; i<imgs.length; i++)
      {
                          if(imgs[i].getAttribute("src").indexOf("http://shared.playsics.com/managergames/hockey_player_")!=-1 &&
           imgs[i].getAttribute("src").indexOf("?default=hockey_player_default.gif")!=-1)
        {
            var url = imgs[i].getAttribute("src");
            var playerId = url.match(/[0-9]{1,20}/g);
            imgs[i].setAttribute("src","http://images.powerplaymanager.com/ppm/player_faces/ppm_player_face.dpng?id=" + playerId);
        }
      }
							
        }
    
    ajaxRequest2.open("GET", "http://mghockey.playsics.com/indexInternal.es?&action=internalDateStatistics&frmSearch_player=YOUTH", true);
  	ajaxRequest2.send(null); 
    
 	var imgs = document.getElementsByTagName("img");
      for(var i = 0; i<imgs.length; i++)
      {		
        if(imgs[i].getAttribute("src").indexOf("hockey_player_")!=-1)
        {
            var url = imgs[i].getAttribute("src");
            var playerId = url.match(/[0-9]{1,20}/g);
            imgs[i].setAttribute("src","http://images.powerplaymanager.com/ppm/player_faces/ppm_player_face.dpng?id=" + playerId);
        } 
      }
    var tableTags = document.getElementsByTagName("table");
    for(var i = 0; i<= tableTags.length; i++)
    {   
        if(tableTags[i].getAttribute("height") == "320")
        {
          tableTags[i].setAttribute("id","iMGtable");
          tableTags[i].innerHTML = 
         "<div id = 'iMGhomeDiv' style = 'background-image: url(http://th01.deviantart.net/fs37/PRE/f/2008/287/8/9/Black_Texture___Ray_by_Ethenyl.jpg);z-index:2"
        +"background-color : #485571;width:97.4%;height:310.4px;border-width:5px;border-style:ridge;border-color:#3E0000;position:relative'>"
          +"<div><strong><u><a href = 'http://userscripts.org/scripts/show/178986' style = 'bottom:0px;left:2px;position:absolute;font-size:9px;color:orange !important'>improvedMgHockey</a></u></strong></div>"
          +"<ul id = 'iMGsenStats' style ='overflow:scroll;font-size:9px;width:40%;height:300px;list-style-type:none;padding-left:15px;position:absolute;'><strong style = 'text-decoration:underline;color:#c0392b;font-weight:bold'>Senioři - statistiky(jm-g-z-poz-věk):</strong>"
       	  +"</ul>"
          +"<ul id = 'iMGjunStats' style ='overflow:scroll;font-size:9px;width:40%;height:300px;list-style-type:none;position:absolute;right:15px;font-weight:bold !important'><strong style = 'text-decoration:underline;color:#c0392b;font-weight:bold'>Junioři - statistiky(jm-g-z-poz-věk):</strong>"
         +"</ul>"
         +"</div>";
       }                 
    }
  }
 
//ZÁPASY SENIORŮ
if(document.URL == "http://mghockey.playsics.com/indexInternal.es?action=internalLive&gameType=PRO" || document.URL == "http://mghockey.playsics.com/indexInternal.es?action=internalLive&gameType=FRIENDLYPRO" || document.URL == "http://mghockey.playsics.com/indexInternal.es?action=internalLive&gameType=CUP" || document.URL == "http://mghockey.playsics.com/indexInternal.es?action=internalLive&gameType=CLAN")
{
    //zapasové video nahradit: 
    var embedTags = document.getElementsByTagName("embed");
   	var pictureIndex = Math.floor((Math.random()*5)+1);
    for(var i = 0; i<= embedTags.length; i++)
    {
    	if(embedTags[i].getAttribute("src") == "img/cs/premium_announce.swf") 
        {
           if(pictureIndex == 1) embedTags[i].parentNode.innerHTML = "<img src = 'http://blog.expekt.com/wp-content/uploads/2010/05/hockey.jpg' width='400px'; height='300px'/>";
       	   if(pictureIndex == 2) embedTags[i].parentNode.innerHTML = "<img src = 'http://www.wallpaperswala.com/wp-content/gallery/ice-hockey/hockey_wallpapers_img.jpg' width='400px'; height='300px'/>";
       	   if(pictureIndex == 3) embedTags[i].parentNode.innerHTML = "<img src = 'http://www.wallm.com/images/2012/12/free-chris-pronger.jpg' width='400px'; height='300px'/>";
           if(pictureIndex == 4) embedTags[i].parentNode.innerHTML = "<img src = 'http://www2.pictures.zimbio.com/gi/Ice+Hockey+Day+8+J7RFg3QWNxMl.jpg' width='400px'; height='300px'/>";
           if(pictureIndex == 5) embedTags[i].parentNode.innerHTML = "<img src = 'http://1.bp.blogspot.com/_Yl1owXI8-6Q/TKZxt5YbM7I/AAAAAAAAAA0/nRNx-7ytG5Y/s1600/Holding+Stanley+Cup.jpg' width='400px'; height='300px'/>";
        }
    } 
    
}
//ZÁPASY JUNIORŮ
if(document.URL == "http://mghockey.playsics.com/indexInternal.es?action=internalLive&gameType=YOUTH" || document.URL == "http://mghockey.playsics.com/indexInternal.es?action=internalLive&gameType=FRIENDLYYOUTH")
{
    //zapasové video nahradit: 
    var embedTags = document.getElementsByTagName("embed");
   	var pictureIndex = Math.floor((Math.random()*5)+1);
    for(var i = 0; i<= embedTags.length; i++)
    {
    	if(embedTags[i].getAttribute("src") == "img/cs/premium_announce.swf") 
        {
           if(pictureIndex == 1) embedTags[i].parentNode.innerHTML = "<img src = 'http://chl.uploads.mrx.ca/ohl/images/en/newser/2012/02/Brampton_Battalion_(1)5655.JPG' width='400px'; height='300px'/>";
       	   if(pictureIndex == 2) embedTags[i].parentNode.innerHTML = "<img src = 'http://www2.pictures.zimbio.com/gi/Ice+Hockey+Day+2+psrui9ojCMel.jpg' width='400px'; height='300px'/>";
       	   if(pictureIndex == 3) embedTags[i].parentNode.innerHTML = "<img src = 'http://www4.pictures.zimbio.com/gi/Ice+Hockey+Day+11+TxnDb4mrRmZl.jpg' width='400px'; height='300px'/>";
           if(pictureIndex == 4) embedTags[i].parentNode.innerHTML = "<img src = 'http://media.nj.com/boys_ice_hockey_blog/photo/14-hockey-faytokjpg-d0e1c433cdb6536b.jpg' width='400px'; height='300px'/>";
           if(pictureIndex == 5) embedTags[i].parentNode.innerHTML = "<img src = 'http://media.nj.com/star-ledger/photo/2013/01/-e9d8cd8db588cec0.jpg' width='400px'; height='300px'/>";
        }
    } 
    
}

function getTeamName()
{
	ems = document.getElementsByClassName("em");
				for(var i = 0; i<ems.length; i++)
				{
					if(i==69)
					{
						 teamName = ems[69].innerHTML;
					}
				}
	return teamName;
}
