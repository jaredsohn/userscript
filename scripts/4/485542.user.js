// ==UserScript==
// @name        show video in fullpage
// @namespace   youtube
// @description Adds button to switch to embed view of video (full window) + some small improvements
// @include     https://www.youtube.com/watch?v=*
// @version     1
// @grant       none
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.$jQ$=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function() {
	$jQ$(".yt-masthead-logo-container").append('<div style="float: right; padding-right:8px; padding-top:3px" id="appbar-guide-button-embed"><img id="sidebar-yt-button" title="switch to fullsize/embed view" src="https://storage.googleapis.com/support-kms-prod/SNP_4E654EC7DAA1CF42A50468CE03758905C9CA_3272925_en_v1" /></div>');
	if(localStorage.yt_relativehead) {
		$jQ$("#masthead-positioner").css("position","relative");
		$jQ$("#masthead-positioner-height-offset").hide();
	}
	$jQ$("#yt-masthead-container").css("background-color","#111");
	$jQ$("#search-btn").css("background-color","#999").css("border","0");
	$jQ$("#masthead-search-terms").css("background-color","#aaa").css("box-shadow","none");
	$jQ$("#upload-btn").css("background-color","#999").css("border","0");
	$jQ$("#appbar-settings-button").css("background-color","#999").css("border","0");
	$commandline = $jQ$("#masthead-search-term");
	$commandline.attr("placeholder", "Available commands: !large, !medium, !fixed, !relative");
	setTimeout(function(){$commandline.attr("placeholder", "");}, 5000);
	
	setInterval(function () {
		if(localStorage.yt_largeplayer && $jQ$("#player").hasClass("watch-medium")) {
			$jQ$("#player").removeClass("watch-medium").addClass("watch-large");
		}
		switch ($commandline.val()) {
		  case "!large":
			localStorage.yt_largeplayer = "true";
			$commandline.val(" Large player when toggling player size. [!medium]");
			setTimeout(function(){if($commandline.val().indexOf(" ")===0) $commandline.val("");}, 3000);
			break;
		  case "!medium":
			localStorage.yt_largeplayer = "";
			$commandline.val(" Medium player when toggling player size. [!large]");
			setTimeout(function(){if($commandline.val().indexOf(" ")===0) $commandline.val("");}, 3000);
			break;
		  case "!fixed":
			localStorage.yt_relativehead = "";
			$commandline.val(" Youtube header fixed position. [!relative]");
			setTimeout(function(){if($commandline.val().indexOf(" ")===0) $commandline.val("");}, 3000);
			$jQ$("#masthead-positioner").css("position","fixed");
			$jQ$("#masthead-positioner-height-offset").show();
			break;
		  case "!relative":
			localStorage.yt_relativehead = "true";
			$commandline.val(" Youtube header relative position. [!fixed]");
			setTimeout(function(){if($commandline.val().indexOf(" ")===0) $commandline.val("");}, 3000);
			$jQ$("#masthead-positioner").css("position","relative");
			$jQ$("#masthead-positioner-height-offset").hide();
			break;
		  default:
			break;
		}
    },1000);
	
	$jQ$( "#sidebar-yt-button" ).dblclick(function() {
		window.location.href = window.location.href.replace("/watch?v=","/embed/") + "?vq=hd480&autoplay=1";
	});
	
	$jQ$( "#sidebar-yt-button" ).click(function() {
		if($jQ$("#player").hasClass("watch-fullsize")) {
			$jQ$("#player").removeClass("watch-fullsize").attr( "style", "" );
			$jQ$("#player-api").attr( "style", "" );
			$jQ$("body").attr( "style", "" );
		} else {
			$jQ$("#player").removeClass("watch-small").removeClass("watch-medium").addClass("watch-fullsize").css({
				position: "absolute",
				zIndex: 99999999,
				left: 0, right: 0, top: 40, bottom: "-10px",
				width: "auto", height: "auto"
			});
			$jQ$("#player-api").css({
				width: "100%", height: "100%"
			});
			$jQ$("body").attr( "style", "overflow:hidden" );
		}
	});
	
});

