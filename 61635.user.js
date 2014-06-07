// ==UserScript==
// @name           showbijint
// @namespace      http://userscripts.org/users/strobolights
// @include        http://*
// ==/UserScript==

//var BIJIN_BASE = "http://www.bijint.com/m/img/clk/";
var BIJIN_BASE = "http://www.bijint.com/jp/img/clk/";
var BIJIN_SIZE_DEF = "60%";

(function(){
  	if(window.self==window.top){
			var time = new Date();
			var hours = time.getHours();
			hours = ((hours < 10) ? "0" : "") + hours;
			var minutes = time.getMinutes();
			minutes = ((minutes < 10) ? "0" : "") + minutes;
			
			var bijinURL = BIJIN_BASE + hours + minutes + ".jpg";
			
			var bijinImg = document.createElement("img");
			bijinImg.src = bijinURL;
			
			bijinImg.style.width = BIJIN_SIZE_DEF;
			bijinImg.style.height = BIJIN_SIZE_DEF;
			bijinImg.addEventListener('mouseout',  function(e){this.style.width=BIJIN_SIZE_DEF;this.style.height=BIJIN_SIZE_DEF;}, false);
			bijinImg.addEventListener('mouseover', function(e){this.style.width='100%';this.style.height='100%';}, false);
			
			var bijinStage = document.createElement("div");
			bijinStage.id = "bijin";
			bijinStage.style.zIndex = "999";
			bijinStage.style.position = "absolute";	
			bijinStage.style.top = "0";
			bijinStage.style.right = "0";
			bijinStage.style.margin = "30px";
			bijinStage.style.textAlign = "right";
			bijinStage.style.width = "590px";
			bijinStage.style.width = "450px";
			bijinStage.addEventListener('click',  function(e){bijinStage.style.visibility = "hidden"}, false );
			
			bijinStage.appendChild(bijinImg);
			document.body.appendChild(bijinStage);
			
		}
	//};
})();
