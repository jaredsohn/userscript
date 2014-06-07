// ==UserScript==
// @name			Facepunch Snow Editor
// @description		Edits Snow
// @include			http://*.facepunch*.com/*
//
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	//Set Default Values
	if(!window.localStorage.FP_snowParticle)
		window.localStorage.FP_snowParticle = "img/snow.png";


	//Set Snow particle to setting
	particleImage.src = window.localStorage.FP_snowParticle;


	//Add setting menu to nav bar
	$("#navbarlinks").append("<div class='navbarlink' id='SnowOptions' ><a href='javascript:;'><img src='http://www.facepunch.com/img/snow.png' /> Snow</a></div>");
	$("#SnowOptions").click(function(){
		var div = CreateFloatingDiv(MouseX,MouseY,"12","popupbox");
		$(div).html("Particle: <input type='text' id='snowParticle' />  <div class='button' style='display: inline-block;'><a id='applySnow' href='javascript:void(0);'>Apply</a></div>")
		$("#snowParticle").val(window.localStorage.FP_snowParticle);
		
		$(div).show('fast');
		$("#applySnow").click(function(){
			window.localStorage.FP_snowParticle = escape($("#snowParticle").val());
			particleImage.src = window.localStorage.FP_snowParticle;
			
		});
	});
	
}

addJQuery(main);