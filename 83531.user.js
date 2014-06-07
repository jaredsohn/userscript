// ==UserScript==
// @name           Dashboard Refresher
// @namespace      TehNrd
// @include        https://*.salesforce.com/*
// ==/UserScript==
	var $;

	// Add jQuery
	(function(){
		if(typeof unsafeWindow.jQuery == 'undefined'){
			var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
				GM_JQ = document.createElement('script');
			GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
			GM_JQ.type = 'text/javascript';
			GM_JQ.async = true;
			GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
		}
		GM_wait();
	})();

	//Check if jQuery's loaded
	function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined'){
			window.setTimeout(GM_wait, 100);
		}else{
			$ = unsafeWindow.jQuery.noConflict(true);
			load();
		}
	}

	//Get the id of the dashboard from url
	var url = window.location.href;
	var id = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('/') + 16);

	//All your GM code must be inside this function
	function load(){
		//Check to see if this window is the logout popup, close the window if it is
		if(window.location.href.indexOf('timeout') > -1){
			self.close();
		}
	
		var db = $(".dashboardNote");
		
		//Only proceed if on dashboard page
		if(db.length > 0){

			//Check to see if jquery was loaded inside iframe instead of main page, if so refresh entire page.
			//Must check to see if jquery was loaded in iframe, if so need to refresh page, there is no tab panel in iframe
			var tabs = $(".tabNavigation");
			
			if(tabs.length == 0){
				//If not tab panel was found jquery was loaded in iframe need to refresh the parent page so jquery loads in main page.
				window.top.location = '/' + id + '?customAutoRefresh=1';
			}else{
				//Check to see if URL contains 'customAutoRefresh', if it does this is a page load after auto refrhes, need to auto start
				var url = window.location.href;

				if(url.indexOf('customAutoRefresh') == -1){
					//Create a new button on the dashboard to start auto refresh
					$(".dashboardHeader div:first").append('<input id="customAutoRefresh" type="button" title="Start" class="btn" value=" Start Fullscreen Auto Refresh " style="margin-left: 5px;">');
					
					//Attached event handler to new button we added.
					$("#customAutoRefresh").click(function(){
						start();
					});
				}else{
					start();
				}
			}
		}
	}

	function start() {
		//Create a stop button
		$("body .bPageTitle .ptBody").append('<input id="customAutoRefreshStop" type="button" title="Stop" class="btn" value=" Stop Auto Refresh " style="float: right;">');
		//$("body").prepend('<div id="debug">sup</div>');

		//Attached event handler to stop button we added.
		$("#customAutoRefreshStop").click(function(){
			window.top.location = '/' + id;
		});

		//Hide unecessary items
		$("#AppBodyHeader").hide();
		$("#section_header").hide();
		$(".ptBreadcrumb").hide();
		$("body .bPageTitle .ptBody .links").hide();
		$("#thePage\\:pb\\:j_id21").hide();
		$("body .bPageFooter a, body .bPageFooter").hide();

		//Apply custom styles to tighten up the layout
		$("#componentContentArea").css('margin-top', -20);
		$("body .bPageBlock").css('margin-bottom', -15);

		//Check to see what window jquery is in and refresh entire screen if necessary
		//Start checking for refresh
		checkForUpdate();
	}

	var direction;

	function checkForUpdate() {
		//Get the current time in minuets
		var d = new Date();
		var min = d.getMinutes();

		//Get time in minutes of last refresh
		var lastRefresh = $("#db_refresh_time").text();
		lastRefresh = lastRefresh.substring(lastRefresh.indexOf(':') + 1, lastRefresh.indexOf(':') + 3);

		//See if dashboard is currently refreshing
		var refreshStatus = $("#db_refresh_comment").text();

		//$("#debug").html(d.toString() + ' - ' + refreshStatus.length);
		if(refreshStatus.length != 22 && refreshStatus.length != 1){
			//Page is currently refereshing, wait 20 more seconds.
			setTimeout(checkForUpdate, 20000);

		}else if((min == 0 && lastRefresh != 00) || (min == 20 && lastRefresh != 20) || (min == 40 && lastRefresh != 40)){
			//Refresh the dashboard
			
			//Remove refresh script if it exists.
			$("#doCustomRefresh").remove();

			//Add div with inline script to refresh dashboard
			$(".pbHeader").append('<div id="doCustomRefresh"><script>sfdc.analytics.quickfind.refresh(false);</script></div>');

			//Scroll to the top of the page
			$('html, body').animate({scrollTop: 0}, 4000);

			setTimeout(checkForUpdate, 20000);
		}else if(refreshStatus.length == 22 || refreshStatus.length == 1){ //Only start scroll if page is not currently refreshing
			//Scroll logic
			
			var docHeight = $(document).height();
			var winHeight = $(window).height();
			var top = $(window).scrollTop();

			//Scroll down logic
			if (direction == null || direction == ''){
				//Page has first loaded, don't scroll and set direction as down
				direction = 'down';

			}else if(direction == 'down'){
				if ((docHeight - (top + winHeight)) < winHeight){
					//Scroll to bottom, reverse direction
					$('html, body').animate({scrollTop: docHeight - winHeight}, 3000);
					direction = 'up';
				}else{
					//Scroll down 
					$('html, body').animate({scrollTop: top + winHeight}, 3000);
				}
			}else{
				//Scroll up logic
				//if(top < winHeight){
					//Scroll to top, reverse direction
					$('html, body').animate({scrollTop: 0}, 3000);
					direction = 'down';
				//}else{
					//Scroll up
					//$('html, body').animate({scrollTop: top - winHeight},4000);	
				//}
			}

			//Check again in 20 seconds
			setTimeout(checkForUpdate, 20000);
		}
	}