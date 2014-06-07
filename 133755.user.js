// ==UserScript==
// @name         uTorrent Magnet Tracker Adder for Torrentz.eu
// @namespace    torrentzeumagnettracker
// @include      http://torrentz.eu/*
// @author       Funkpuss
// @version      1.3
// @description  Use this script to easily add all the trackers listed on torrentz.eu pages to you active download in uTorrent.
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
	var hash = $('input[name=hash]').val();
	var href = '<a style="-webkit-box-shadow:0px 0px 3px 0px rgba(0, 0, 0, 0.8), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.8);box-shadow:0px 0px 3px 0px rgba(0, 0, 0, 0.8), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.8);background: #bfd255;background: -moz-linear-gradient(top, #bfd255 0%, #8eb92a 50%, #72aa00 51%, #45771b 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#bfd255), color-stop(50%,#8eb92a), color-stop(51%,#72aa00), color-stop(100%,#45771b));background: -webkit-linear-gradient(top, #bfd255 0%,#8eb92a 50%,#72aa00 51%,#45771b 100%);background: -o-linear-gradient(top, #bfd255 0%,#8eb92a 50%,#72aa00 51%,#45771b 100%);background: -ms-linear-gradient(top, #bfd255 0%,#8eb92a 50%,#72aa00 51%,#45771b 100%);background: linear-gradient(top, #bfd255 0%,#8eb92a 50%,#72aa00 51%,#45771b 100%);border:1px solid #345a14;border-radius:5px;color:#ffffff;padding:14px 22px;font-size:15px;font-weight:bold;float:right;clear:both;margin:0 0 20px 600px;text-shadow: 1px 1px 2px #1E370A;font-family:arial,verdana,tahoma;" href="magnet:?xt=urn:btih:'+hash+'&';
	$('.trackers dt').each(function(index){
		if(index > 0) {	
			href+= 'tr='+ $(this).children(0).html() +'&';
		}
	});
	href+= '">Download or Add Trackers to uTorrent</a>';
    $('.download').css({
        'float' : 'left',
        'clear' : 'both',
        'margin-top' : '0px'
    });
	$('.download').before(href);
}
addJQuery(main);