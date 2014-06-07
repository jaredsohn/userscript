// ==UserScript== 
// @name            Appcelerator Help Desk - Fix Suggestions
// @namespace       http://support.appcelerator.com/userscripts/ 
// @description     Some Appcelerator HD fixes 
// @include         http://support.appcelerator.com/* 
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://dl.dropbox.com/u/1498261/Team-Integra/jq-block.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString().replace('"', '\"') + ")(jQuery);";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function FixSite($) {
	
	var E = {};
	
	E.Stop = function(e) {
	    if (!e) {
	        if (window.event) { e = window.event; } else { return; }
	    }
	    if (e.cancelBubble != null) { e.cancelBubble = true; }
	    if (e.stopPropagation) { e.stopPropagation(); }
	    if (e.preventDefault) { e.preventDefault(); }
	    if (window.event) { e.returnValue = false; }
	    if (e.cancel != null) { e.cancel = true; }
	};
	
	E.AddNewWindowIcon = function() {
		$('#history_table td.t_subject').not(".SetNewWin").each(function() {
				var location = "" + $(this).closest('tbody').attr('onclick');
				location = location.substr(location.indexOf('\'') + 1);
				location = location.substr(0, location.indexOf("'"));
				var $icon = $('<img />')
					.attr("src", "http://dl.dropbox.com/u/1498261/User-Scripts/new_window.png")
					.attr("title", "Open ticket in new window")
					.css("margin-right", "4px")
					.css("cursor", "pointer")
					.click(function(e) {
						E.Stop(e);
						window.open(location);
					});
				$(this).find("span").prepend($icon);	
				$(this).addClass("SetNewWin").find("*").css("vertical-align", "middle");
		});	
	};
	setInterval(function() { E.AddNewWindowIcon(); }, 2500);	

}

(function() {
	addJQuery(FixSite);
})();
