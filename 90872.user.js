// ==UserScript==
// @name          modVirtualChannels
// @include       http://www.minecraftforum.net/viewforum.php?f=25
// @include       http://www.minecraftforum.net/viewforum.php?f=25*
// @include       http://www.minecraftforum.net/search.php
// @include       http://www.minecraftforum.net/search.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==



$(document).ready(function() {
	var url = document.location.href;

	var isSearchPage = url.match("/search.php") && 1; 
	var isNormalListing =  url.match("/viewforum.php") && 1; 
	
        var mode = GM_getValue("mode"," ");
	
	
	if (isSearchPage && mode=="load"){
		var param = GM_getValue("param"," ");		
		
		GM_setValue("mode", "showresults");  
		GM_setValue("param", "");  
		
		$("#wrap").hide();
		
		$("#keywords").val(param);
		$("#search_forum").html("");
		$("#search_forum").html("<option selected='selected' value='25'>MM forum</option>");
		
		$("#sf3").attr("checked","checked");
		$("#show_results2").attr("checked","checked");
		$("select[name=ch]").html("");
		$("select[name=ch]").html("<option>0<option>");		
		
		$("#page-body form[method=get]").submit();
		return;
	}
	
	//unsafeWindow.console.log("here")
	
	if (isSearchPage && mode=="showresults"){
		//alert("hi!");
		
		
		var buttonReturn = $("<input type='button'>");
		buttonReturn.attr("value","return Mapping & Modding forum");
		buttonReturn.click( function(){
			GM_setValue("mode", "returnhome");  
			GM_setValue("param", "");  
			document.location.href = "http://www.minecraftforum.net/viewforum.php?f=25";
		});	
		
		//unsafeWindow.console.log("here: HI!!!")
		
		$("#page-header").append(buttonReturn);
		
		//unsafeWindow.console.log("here: HI2!!!")
		return;
	}
	
	if ( isNormalListing){	
	
		var feelGood = $("<b style='color: white'>Quick access to filtered Topic's</b><br>")
		$(".announcement").append(feelGood);
		$(".announcement").attr("style","text-align:center");
		
		var buttonMods = $("<input type='button'>");
		buttonMods.attr("value","[MOD] modifications");
		buttonMods.click( function(){
			GM_setValue("mode", "load");  
			GM_setValue("param", "[mod]");  
			document.location.href = "http://www.minecraftforum.net/search.php";
		});
		
		var buttonTex = $("<input type='button'>");
		buttonTex.attr("value","[TEXTURE] texture packs ");
		buttonTex.click( function(){
			GM_setValue("mode", "load");  
			GM_setValue("param", "[texture]");  
			document.location.href = "http://www.minecraftforum.net/search.php";
		});
		
		$(".announcement").append(buttonMods);
		$(".announcement").append(buttonTex);

		var button;
		
		button = $("<input type='button'>");
		button.attr("value","[REQ] requests ");
		button.click( function(){
			GM_setValue("mode", "load");  
			GM_setValue("param", "[req]");  
			document.location.href = "http://www.minecraftforum.net/search.php";
		});		
		$(".announcement").append(button);
		
		button = $("<input type='button'>");
		button.attr("value","[MMAP] maps ");
		button.click( function(){
			GM_setValue("mode", "load");  
			GM_setValue("param", '[mmap]');  
			document.location.href = "http://www.minecraftforum.net/search.php";
		});		
		$(".announcement").append(button);		
		
		button = $("<input type='button'>");
		button.attr("value","[WIP] work in progress ");
		button.click( function(){
			GM_setValue("mode", "load");  
			GM_setValue("param", "[wip]");  
			document.location.href = "http://www.minecraftforum.net/search.php";
		});		
		$(".announcement").append(button);		

		return;
	}


});

