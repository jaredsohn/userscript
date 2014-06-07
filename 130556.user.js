// ==UserScript==
// @name           Troll
// @namespace      Trololol
// @description    Trol?
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


function main(){
	console.log = function() {};
	$(document).ready(function(){
		$('body').append('<object height="0px" width="10px" data="http://nyan.cat/music/nyan.mp3">');
		var images=$('img');
		for(j=0;j<images.length;j++){
			images[j].src="http://i0.kym-cdn.com/photos/images/original/000/096/044/trollface.jpg";
		}
		$('body').css({"background":"#0F4D8F"});
		function add_nyan(){
			var nyan=$("<div class='nyan'><img src='http://nyan.cat/cats/nyancat.gif' width='100' /></div>");
			var x,y;
			x=0;
			var i=Math.random();
			y = i*$(window).height()-80;
			nyan.css({"position":"absolute"});
			nyan.css({"top":y+"px","left":x+"px"});
			$("body").append(nyan);
			nyan.animate({
				"left":$(window).width()-100+"px",
				"top" : Math.random()*$(window).height()-80 + "px",
			},3000,"linear",function(){$(this).remove();
			});
			setTimeout(add_nyan,Math.random()*50);}
			add_nyan();
		});
}


addJQuery(main);