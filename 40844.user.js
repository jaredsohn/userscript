// ==UserScript==
// @name           smushITinEPiCMS
// @namespace      icaaq.com
// @include        http://yourEpiserverSite.com/*
// ==/UserScript==
(function() {
	// Add jQuery  
		var GM_JQ = document.createElement('script');  
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';  
		GM_JQ.type = 'text/javascript';  
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);  

	// Check if jQuery's loaded  
	function GM_wait() {  
		if(typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait,100); }  
		else {
			$ = unsafeWindow.jQuery; letsJQuery();
		}  
	}  
	GM_wait();

	// All your GM code must be inside this function  
	function letsJQuery() {
		$("#browseArea tbody tr:first td:first").after("<td class=\"FM-ItemHeader\">SmushIt</td>")
		$("#browseArea tbody tr.FM-ItemRow, #browseArea tbody tr.FM-ItemRowSelected").each(function(index) {
			var td = $(this).find("td:first");
			if($(this).find("td:first a[dhtmlpath$='jpg']").size() > 0 || $(this).find("td:first a[dhtmlpath$='gif']").size() > 0){
				$.getJSON("http://smush.it/ws.php?img=http://"+document.location.hostname+"/"+$(this).find("td:first a").attr("dhtmlpath")+"&callback=?",
						function(data){
							td.after("<td><a href='http://smush.it/"+data.dest+"'>"+data.percent+"%</a></td>");
				        });
			}else{
				td.after("<td></td>")	
			}	
		});
	}
})();	