// ==UserScript==
// @version        1.0.0
// @date        2014-03-07
// @name        NRL Fantasy League Team Player Statuses
// @description This will add the current player status next to each players' name on for your dream team. Doesn't yet support byes or live updates. You will have to refresh the page after shuffling your team.
// @match https://fantasy.nrl.com/classic/index.html
// ==/UserScript==

(function(){

	init(function() {

		function updatePlayerStatuses(){
			$(".team-player").each(function(){ 
				var statusClass = "uncertain";
				switch($(this).scope().data.status){
					case "playing":
						statusClass = "initial";
						break;
					case "not-playing":
						statusClass = "suspended";
						break;
					case "injured":
						statusClass = "injured";
						break;
				}
				$(this).find("p:first").append("<span class=\"player-status " + statusClass + "\"></span>"); 
			});
		}

		waitForKeyElements(".team-player:first", updatePlayerStatuses);
		
		function waitForKeyElements(e,t,n,r){var i,s;if(typeof r=="undefined")i=$(e);else i=$(r).contents().find(e);if(i&&i.length>0){s=true;i.each(function(){var e=$(this);var n=e.data("alreadyFound")||false;if(!n){var r=t(e);if(r)s=false;else e.data("alreadyFound",true)}})}else{s=false}var o=waitForKeyElements.controlObj||{};var u=e.replace(/[^\w]/g,"_");var a=o[u];if(s&&n&&a){clearInterval(a);delete o[u]}else{if(!a){a=setInterval(function(){waitForKeyElements(e,t,n,r)},300);o[u]=a}}waitForKeyElements.controlObj=o}

	});

	function init(callback) {
	var script=document.createElement("script");script.setAttribute("src","https://tds-nrl-front.s3-ap-southeast-2.amazonaws.com/assets/js/jquery-1.10.2.js");script.addEventListener("load",function(){var e=document.createElement("script");e.textContent="window.jQ=jQuery.noConflict(true);("+callback.toString()+")();";document.body.appendChild(e)},false);document.body.appendChild(script);
	}

})();
