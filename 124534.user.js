// ==UserScript==
// @name		Szybka synchronizacja
// @description		Dodaje piekny guziczek
// @include        	https://secure.netpr.pl/*
// @require        	http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


jQuery.noConflict();
     
// Use jQuery via jQuery(...)
jQuery(window).load(function(){
	var syncBtn = jQuery('<li>');
	
	jQuery("#nav-first-level .lang").after(syncBtn);
	
	syncBtn.css({
		"float": "right",
		cursor: "pointer"
	}).html("<a href='#' onclick='return false'>synchronizuj ❤</a>").click(function(e){
		e.preventDefault();
		jQuery.post("/s2/synchronize?companyId="+unsafeWindow.userContext.currentCompanyId, function(data) {
			if(data.success===true) {
				jQuery.post("/admin/reloadCache.ac?c=html", function(data) {
					if (data.indexOf('Operacja powiodła się!')!==-1) {
						alert("zsynchronizowane i wyczyszczone");
					} else {
						alert("Kwas! Nie udało się wyczyścić pamięci podręcznej! ;-(");
					}
				});
			} else {
				alert("Kwas! Nie udało się zsynchronizować! ;-(");
			}
			
		});
	});
});
