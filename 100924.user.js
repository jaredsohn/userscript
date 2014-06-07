// ==UserScript==
// @name           MegaUpload auto download
// @namespace      wj
// @description    How long is 45s, short or long. It's forgetful to human. With this script, download run automatically when time's up.
// @include        *megaupload.com/*d*
// ==/UserScript==
// version = "1.01"
// Update Chrome support.


function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("id", "jQueryScript");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js");
	
	script.addEventListener("load", function() {
    var script = document.createElement("script"),
		style = document.createElement("style");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);

	style.textContent = ".rew_main_bg4 .done{background:#FFFFFF;border-radius: 6px;box-shadow: 0px 0px 7px #FD6B00;height: 135px;margin-left: 8px;width: 306px;}";
	document.head.appendChild(style);

  }, false);
  document.body.appendChild(script);
 
}
function inject(){
var ML = {
	downloadLink : $('.down_butt1').attr('href'),
	mainLoad: function(){
	// Get true file link.
	$("<a />",{
					href:ML.downloadLink,
					id:"trigerME",
					text:'download it here'
				}).appendTo($('.down_txt_pad1'));
	// Lisenting to DOMModified (fire after 45s)

	// Glow donwload box after successfull Lisenting
	$('.down_butt_bg3').toggleClass("done");
	$(".rew_main_bg4").children().last().remove();
	ML.countdown();
	},
	countdown : function (){		  
		if (count >= 0){				 
		  if(count === 0) {
		  	$(function(){window.open(ML.downloadLink)})
		  }
		  if(count > 0){
		  console.log(count)
			setTimeout(ML.countdown,1000);
		  }
		}
	}
	}
	ML.mainLoad();
}
addJQuery(inject)
