// ==UserScript==
// @name        languageChanger
// @namespace   languageChanger
// @grant       none
// @description This user script change language to the default language
// @include     http://ted.europa.eu/udl?uri=TED:NOTICE*
// @version     1
// ==/UserScript==

function main() {
	var languageSwitcherStatus, languageSwitcherButtonValue;
		
	// Get status of language switcher. 
	// It can be enabled or disabled. 
	if (/languageSwitcherStatus=(enabled|disabled)/.test(document.cookie)) {
	    languageSwitcherStatus = RegExp.$1;
	} else {
		languageSwitcherStatus = "enabled";
	}
	
	if (languageSwitcherStatus == "enabled") {
		languageSwitcherButtonValue = "Disable language switcher";
		
		var languageTabLink = $("div#tabs > ul > li > div > a[href$='tabId=3']");
		if (languageTabLink.length == 1) {
			var lastTabUrl = languageTabLink.attr("href");
			// I don't use 
			// jquery parser because 
			// jquery constructor - ($( )) returns 
			// error here.
			$.ajax({
				url: lastTabUrl, 
				dataType: "text", 
				cache: false,
				success: function(data) {
					if (/<\s*th\s*>\s*OL\s*<\s*\/\s*th\s*>\s*<\s*td\s*>[^<]+<\s*\/\s*td\s*>\s*<\s*td\s*>([^<]+)<\s*\/\s*td\s*>\s*</.test(data)) {
						var defaultLanguage = RegExp.$1.toString().toLowerCase();
						var changeLanguageSelect = $("select#lgId");
						if (changeLanguageSelect.val() != defaultLanguage) {
							var currentDate = new Date();
							// cookie will expire after 10000
							// days
							currentDate.setDate(currentDate.getDate() + 10000);
				            // remember that language is changed and after this user must be redirected to tab 1
			                var languageIsSwitchedValue = 1;
			                document.cookie = "languageIsSwitched=" + languageIsSwitchedValue + ";expires=" + currentDate.toUTCString();
							$("select#lgId").val(defaultLanguage).trigger("change");
						};
					};
				}
			});
		};
	} else {
	   languageSwitcherButtonValue = "Enable language switcher";	
	}
	
	$(document).ready(function() {
	    // redirect to tab 1 only when language is changed
		// there is no need to redirect in other cases. 
	    if (/languageIsSwitched=\s*1\s*/.test(document.cookie)) {
		    document.cookie = "languageIsSwitched=;expires=-1";
		    window.location.href= $("div#tabs > ul > li > div > a[href$='tabId=1']").attr("href");
		} 
		
        var changeStatusButton = $("<input/>", {
	        value: languageSwitcherButtonValue,
	        type: "button"
        }).prependTo(document.body);	
        
        changeStatusButton.on("click", function() {
			var currentDate = new Date();
			// cookie will expire after 10000
			// days
			currentDate.setDate(currentDate.getDate() + 10000);
			var cookieValue = languageSwitcherStatus == "enabled" ? "disabled" : "enabled";
			document.cookie = "languageSwitcherStatus=" + cookieValue + ";expires=" + currentDate.toUTCString();
			window.location.reload(true);
		});
	});
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);