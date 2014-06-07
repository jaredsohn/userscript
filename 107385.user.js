// ==UserScript==
// @name			Comment Notification Badge
// @creator			userscripts@revaxarts.com
// @namespace		revaxarts.com
// @description		Adds a badge with number of unread comments of your item description
// @date			2012-05-25
// @version			1.2
// @include			http://activeden.net/*
// @include			http://audiojungle.net/*
// @include			http://themeforest.net/*
// @include			http://videohive.net/*
// @include			http://graphicriver.net/*
// @include			http://3docean.net/*
// @include			http://codecanyon.net/*
// @include			http://marketplace.tutsplus.com/*
// @include			http://photodune.net/*

// ==/UserScript==

(function () {
		function notification() {
			
			var notifications,
				interval = 5, //check interval in minutes
				$badge;
				
			var color = {};
				var marketplace = location.hostname.split('.').shift();
				if(marketplace == 'marketplace') marketplace = 'tutsplus';
				color['activeden'] = 'e86223';
				color['audiojungle'] = '65992e';
				color['themeforest'] = '69472a';
				color['videohive'] = 'f4950c';
				color['graphicriver'] = '0568b3';
				color['3docean'] = '802836';
				color['codecanyon'] = 'db592b';
				color['tutsplus'] = 'e86223';
				color['photodune'] = '499ba1';
				
				color = color[marketplace] || '333333';
			
			init = function(){
				
				var now = new Date().getTime(),
					lastcheck = getCookie('notification_lastcheck');
					
				//get saved notifications	
				notifications = getCookie('notification_count');
				
				//print them if some exists
				if(notifications) printNotifications();

				//clear notifications if the mark all as unread button is pressed
				if(/author_dashboard/.test(location.pathname)){
					$('input[name=commit]').bind('click',function(){
						setCookie('notification_count',0);
						setCookie('notification_lastcheck',0);
						printNotifications();
					});	
				}

				setTimeout(start,Math.max(0,interval*60000-(now-lastcheck)));
				
			};
		
			start = function() {
				checkForNotifications();
				setInterval(function(){
					checkForNotifications();
				}, interval*60000);
			};
		
			checkForNotifications = function() {
				
				//get the Url
				$.get(getURL(), function(data){
										 
					//count unread posts on the dashboard
					var posts = data.match(/<div id="comment_\d+" class="post"/g) || [];
					notifications = posts.length;
					
					//check for more than 20 comments (multi pages)
					if(notifications == 20){
						var more = data.match(/class="page_number/g).length/2-2;
						if(more) notifications = parseInt(more,10)*20+'+';
					}
					
					//we made a check, lets save it
					setCookie('notification_lastcheck',new Date().getTime());
					
					//save notifications for later
					setCookie('notification_count',notifications,365);
					
					//print
					printNotifications();
					
				});
			};
		
			printNotifications = function() {
				
				//badge element must be made
				if(!$badge){
					$badge = $('<a>',{
						id: 'notification_badge'		  
					}).css({
						'display': 'block',
						'position': 'absolute',
						'left': '-9px',
						'top': '-5px',
						'font-size': '10px',
						'line-height': '10px',
						'font-weight': '700',
						'padding': '4px 4px 5px',
						'text-align': 'center',
						'min-width': '10px',
						'z-index': '100',
						'border': '0',
						'cursor': 'pointer',
						'-webkit-border-radius': '36px',
						'-moz-border-radius': '36px',
						'border-radius': '36px',
						'border-radius': '6px',
						'background-color': ' #'+color,
						'color': '#fff',
						'text-shadow': '0px 1px 0px #333',
						'-webkit-box-shadow': '0px 1px 0 #1d1d1d',
						'-moz-box-shadow': '0px 1px 0 #1d1d1d',
						'box-shadow': '0px 1px 0 #1d1d1d',
						'z-index': '5000',
						'text-decoration': 'none'
					})
					.hide()
					.bind('click', function(){
						location.href="/author_dashboard"
						return false;
					})
					.prependTo('.account-wrapper');
					
				}
				
				//remove any (XX) from the title
				document.title = document.title.replace(/^\(\d+\+?\)/,'');
				
				//we have notifications
				if(parseInt(notifications, 10)){
					$badge.html(notifications).show();
					//prepend it to the titel
					document.title = '('+notifications+') '+document.title;
				}else{
					//hide badge
					$badge.html(notifications).hide();
				}
				
			};
			
			getURL = function() {
				return 'http://'+location.hostname+'/author_dashboard';
			};
		
			setCookie = function(cookieName, value, daysToExpire, path, domain, secure) {
				var expiryDate;
			
				if (daysToExpire) {
					expiryDate = new Date();
					expiryDate.setTime(expiryDate.getTime() + (daysToExpire * 8.64e7));
				}
			
				document.cookie = cookieName + '=' + (value.toString()) +
				(daysToExpire ? ';expires=' + expiryDate.toGMTString() : '') +
				';path=' + (path ? path : '/') +
				(domain ? ';domain=' + domain : '') +
				(secure ? ';secure' : '');
				return getCookie(cookieName);
			};
			
			getCookie = function(cookieName) {
				var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)'),
					cookieMatch = cookiePattern.exec(document.cookie);
					if(cookieMatch){
						return cookieMatch[2];
					}
					return 0;
			};
			init();
		
		}
		
		var inject = document.createElement("script");

		inject.setAttribute("type", "text/javascript");
		inject.appendChild(document.createTextNode("(" + notification + ")()"));
		
		(document.head || document.documentElement).appendChild(inject);
		
		
})();