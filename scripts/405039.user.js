// ==UserScript==
// @name        ticker1
// @namespace   
// @description ticker1
// @include     *gizmodo.com/*
// @include     *jalopnik.com/*
// @include     *kotaku.com/*
// @include     *io9.com/*
// @include     *lifehacker.com/*
// @include     *kinja.com/*
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant  GM_addStyle
// ==/UserScript==


myhref = window.location.href;
ismain = false;
if(myhref=="http://jalopnik.com/") ismain = true;
if(myhref=="http://gizmodo.com/") ismain = true;
if(myhref=="http://kotaku.com/") ismain = true;
if(myhref=="http://io9.com/") ismain = true;
if(myhref=="http://lifehacker.com/") ismain = true;


if(!ismain){
    	$("link[rel='stylesheet']").remove();
    
	$("body").prepend("<div id='outbox'></div>");
	$(".post-content").each(function(){
		$(this).appendTo("#outbox");
		
	});
    
	outboxData = $("#outbox").html();


	$("body").html( outboxData);
    
    	$("img").css("width","200px");
	$("img").css("height","auto");
    
    	$("div").css("font-family","Calibri");
	$("div").css("font-size","11pt");
    $("div").css("color","#1F497D");
    
    	$("a").css("text-decoration","none");
}

if(ismain){


	$("body").prepend("<div id='inbox'></div>");



	$(".post-wrapper").each(function(){
		$(this).appendTo("#inbox");
		
	});

	inboxData = $("#inbox").html();


	$("body").html( inboxData);

	$("div").css("margin","0");
	$("div").css("padding","0");
	$("div").css("font-size","9pt");

	$("body").wrapInner("<div id='inbox'></div>");

	$("#inbox").css("position","absolute");
	$("#inbox").css("top","4px");
	$("#inbox").css("height","98%");
	$("#inbox").css("overflow-y","scroll");
	$("#inbox").css("left","4px");
	$("#inbox").css("width","49%");

	$("#inbox").css("border", "1px solid #6593CF");
	$("#inbox").css("background", "white");

	$("body").append("<iframe id='framez' frameborder='0'></iframe>");



	$("body").wrapInner("<div id='gradient'></div>");

	$("#gradient").css("position","absolute");
	$("#gradient").css("top","0px");
	$("#gradient").css("height","100%");
	$("#gradient").css("left","0px");
	$("#gradient").css("width","100%");
	$("#gradient").css("background", "-moz-linear-gradient(top, #bfdbff 0%, #567db0 60%, #6591cc 100%)");



    $("#gradient").append("<div id='frameholder'></div>");
    
	$("#frameholder").css("position","absolute");
	$("#frameholder").css("top","4px");
	$("#frameholder").css("height","98%");
	$("#frameholder").css("left","50%");
	$("#frameholder").css("width","49%");
	$("#frameholder").css("border", "1px solid #6593CF");
	$("#frameholder").css("background", "white");
    

    
    
    
    $("#gradient").append("<div id='tofrom'></div>");
    
	$("#tofrom").css("position","absolute");
	$("#tofrom").css("top","5px");
	$("#tofrom").css("height","94px");
	$("#tofrom").css("left","51%");
	$("#tofrom").css("width","48%");
	$("#tofrom").css("border", "0px solid white");
	$("#tofrom").css("background", "white");  
    
    $("#tofrom").css("padding", "8px 0px 0px 0px"); 
    
    
    $("#tofrom").append("<div id='subject'>RE: bateske Kinja outlook bosskey</div>");
    

	$("#subject").css("border", "0px solid white");
	$("#subject").css("background", "white");  
	$("#subject").css("font-size", "14pt");    
 	$("#subject").css("font-weight", "BOLD");       
    
    
      $("#tofrom").append("<div id='fromline'>Kevin Bates</div>");
    

	$("#fromline").css("border", "0px solid white");
	$("#fromline").css("background", "white");  
	$("#fromline").css("font-size", "12.5pt");    
 	$("#fromline").css("font-weight", "100");         
    
    
    
	$("#framez").css("position","absolute");
	$("#framez").css("top","100px");
	$("#framez").css("height","80%");
	$("#framez").css("left","51%");
	$("#framez").css("width","48%");
	$("#framez").css("border", "0px solid white");
	$("#framez").css("background", "white");

       $("#framez").css("z-index", "200");
    
	$("body").css("background", "-moz-linear-gradient(top, #bfdbff 0%, #567db0 60%, #6591cc 100%)");



	$(".main-media").remove();
	$(".hide-for-small").remove();


	$(".medium-6").addClass("large-12");
	$(".row").css("width","100%");

	$("link[rel='stylesheet']").remove();

	$("ul").remove();


	$(".marquee-asset").remove();
    	$(".marquee").remove();



	$("div").css("font-family","Calibri");



	$("h1").css("margin","3px 0px 3px 0px ");

	$("h1").wrap("<div class='wrapper'></div");

	$("h1").css("overflow","hidden"); 
	$("h1").css("white-space","nowrap"); 
	$("h1").css("text-overflow","ellipsis"); 



	$(".wrapper").css("width","77%"); 


	$("h1").css("font-size","9pt");
	$("h1").css("font-weight","100");




	$("img").css("width","200px");
	$("img").css("height","auto");

	$("a").css("color","black");
	$("a").css("text-decoration","none");
	$("a").attr("target","rightFrame");

	var mylink = new Array();
	$(".post-wrapper").each(function(i){
		
		
		if($(this).find("h1").length){
			// it has a header
			$(this).find(".hide-on-hover").prependTo(this);
			$(this).find(".display-name").appendTo(this);
			$(".hide-on-hover").css("float","right");
			$(".hide-on-hover").css("margin-right","42px");
			$("<div style='clear: left; display: block; height: 1px; background: #E3EFFF;'></div>").insertAfter(this);
			
			
			mylink[i] = $(this).find("h1").children("a").attr("href");
			$(this).click(function(){
				$("#framez").attr("src",mylink[i]);
                $("#subject").text( $(this).find("h1").text() );
                $("#fromline").text( $(this).find(".display-name").text() );
			});
			$(this).find(".hide-on-hover").text(  $(this).find(".hide-on-hover").text().replace('Today','').replace('am',' AM').replace('pm',' PM') );
			$(this).find(".display-name").text(  $(this).find(".display-name").text() );
			$(this).find("h1").text(  $(this).find("h1").text() );
			
			$(this).prepend("<div class='mailicon'><img src='http://i.imgur.com/kDoVhnR.png'></div>");
			$(this).prepend("<div class='flagicon'><img src='http://i.imgur.com/rR6KkiD.png'></div>");
			
			
		}
		else
		{
			// its a link cloud
			$(this).remove();
		}
		
	});
	$(".post-wrapper").css("position","relative");
	$(".post-wrapper").css("cursor","default");
	$(".post-wrapper").css("padding","0px 0px 0px 26px");
	$(".mailicon").css("position","absolute");
	$(".mailicon").css("top","5px");
	$(".mailicon").css("left","5px");

	$(".flagicon").css("position","absolute");
	$(".flagicon").css("top","7px");
	$(".flagicon").css("right","3px");



	$(".post-wrapper").css("height","32px");
	$(".display-name").css("color","#808080");


	$(".item-content").remove();
	$(".meta-container").remove();
    	$(".top-meta").remove();

    
    //$(".post-wrapper").after("<div style='clear: left; display: block; height: 1px; background: #E3EFFF;'></div>");
    
   function wrapagain() {     
    $("<div style='clear: left; display: block; height: 1px; background: #E3EFFF;'></div>").insertAfter(".js_promoted.post-wrapper");
 }
    
    setTimeout(wrapagain, 1000)
			
}