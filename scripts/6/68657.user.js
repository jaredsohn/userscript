// ==UserScript==
// @name           Ikariam Science time
// @namespace      userscripts.org
// @description    Adds timer in the science tab
// @include        http://s*.ikariam.*/index.php?view=researchAdvisor*
// ==/UserScript==

//Load prototype
var head = document.getElementsByTagName("HEAD")[0];
var jquery_src = document.createElement("SCRIPT");
jquery_src.type = "text/javascript";
jquery_src.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js";
head.appendChild(jquery_src);
		
var jquery_src = document.createElement("SCRIPT");
jquery_src.type = "text/javascript";
jquery_src.src = "http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js";
head.appendChild(jquery_src);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined' || typeof unsafeWindow.jQuery.toJSON == 'undefined') { window.setTimeout(GM_wait,100); }
	else { 
		$ = unsafeWindow.jQuery;
		jQuery = unsafeWindow.jQuery;
		init(); 
	}
}
GM_wait();

function init() {
	var points = $(".researchLeftMenu").find(".points").html();
	var pointsPerHour = $(".researchLeftMenu").find(".time").html();
	
	points 			= parseInt(points.replace(/[^0-9]/g, ""));
	pointsPerHour	= parseInt(pointsPerHour.replace(/[^0-9]/g, ""));
	
	$('.researchPoints').each(function(i, v) {
		if (pointsPerHour <= 1) {
			v.innerHTML = researchPointsTxt + "<br /><span style='font-size:10px; position: absolute; z-index:1000; width: 150px'>(~&#8734;)</span>";
		}
		
		researchPointsTxt = v.innerHTML;
		researchPoints = parseInt(v.innerHTML.replace(/[^[0-9]/g, ""));
		if (pointsPerHour > 0 && researchPoints > points) {
			pointsLeft 	= researchPoints - points;
			hoursLeft 	= pointsLeft / pointsPerHour;
			
			var t = hoursLeft*60*60;
			var days = parseInt(t/86400);
			t = t-(days*86400);
			var hours = parseInt(t/3600);
			t = t-(hours*3600);
			var minutes = parseInt(t/60);
			t = t-(minutes*60);
			var content = "";
			if(days)content+=days+" "+unsafeWindow.LocalizationStrings['timeunits']['short']['day'];
			if(hours||days){ if(content)content+=", "; content+=hours+" "+unsafeWindow.LocalizationStrings['timeunits']['short']['hour']; }
			if(content)content+=", "; content+=minutes+" "+unsafeWindow.LocalizationStrings['timeunits']['short']['minute'];
			var timeLeft = content;

			v.innerHTML = researchPointsTxt + "<br /><span style='font-size:10px; position: absolute; z-index:1000; width: 150px'>(~"+timeLeft+")</span>";
		}
	});
}