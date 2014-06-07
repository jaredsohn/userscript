// ==UserScript==
// @name			Cha-Ching for Envato Authors
// @creator			userscripts@revaxarts.com
// @namespace		revaxarts.com
// @description		Sales Notification for Envato Authors
// @date			2012-01-04
// @version			0.3
// @include			http://activeden.net/*
// @include			http://audiojungle.net/*
// @include			http://themeforest.net/*
// @include			http://videohive.net/*
// @include			http://graphicriver.net/*
// @include			http://3docean.net/user/*
// @include			http://codecanyon.net/*
// @include			http://marketplace.tutsplus.com/*
// @include			http://photodune.net/*
// ==/UserScript==
(function () {



	function chaching() {
		
		var username = $('#user_username').html();
			if(!username) return false;
			
		var interval = 10,
			now = new Date().getTime(),
			lastcheck = getCookie('cha-ching_lastcheck'),
			lastsales = getCookie('cha-ching_lastsales'),
			mp3 = 'http://dl.dropbox.com/u/9916342/cha-ching/cha-ching.mp3',
			ogg = 'http://dl.dropbox.com/u/9916342/cha-ching/cha-ching.ogg',
			$userbalance = $('.user_balance');
			
			setTimeout(start,Math.max(0,interval*60000-(now-lastcheck)));
		
		function chachingIT(){
			if($('#cha-ching').length) $('#cha-ching').remove();
			$('<audio id="cha-ching" autoplay><source src="'+ogg+'" type="audio/ogg"></source><source src="'+mp3+'" type="audio/mpeg"></source></audio>').appendTo('body');	
		}

		function start() {
			checkForSales();
			setInterval(function(){
				checkForSales();
			}, interval*60000);
		}

		function checkForSales() {
			$.get('/user/'+username, function(data){
				//get current sales
				var sales = data.match(/<div class="sales">\W+<strong>([^<]+)<\/strong>/);
				//could fetch sales
				if(!sales[1]) return;
				//sales are different then the last ones
				if(lastsales != sales[1]){
					//save new sales
					setCookie('cha-ching_lastsales',sales[1],365);
					//get current deposit
					var balance = data.match(/<span class="user_balance">([^<]+)<\/span>/);
					//if we have last sales and lastcheck is set or the balance isn't equal the current balance
					if(lastsales && !lastcheck || $userbalance.html() != balance[1]){
						$userbalance.html('New Sale! '+balance[1]);
						chachingIT();
					}
					//our new lastsales
					lastsales = sales[1];
				}
				//lastcheck was now
				lastcheck = new Date().getTime();
				//save lastcheck but remove it if browser is closed (force check on restart)
				setCookie('cha-ching_lastcheck',lastcheck);
			});
		}

		function setCookie(cookieName, value, daysToExpire, path, domain, secure) {
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
		
		function getCookie(cookieName) {
			var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)'),
				cookieMatch = cookiePattern.exec(document.cookie);
				if(cookieMatch){
					return cookieMatch[2];
				}
				return 0;
		};
	}

	var inject = document.createElement("script");

	inject.setAttribute("type", "text/javascript");
	inject.appendChild(document.createTextNode("(" + chaching + ")()"));

	(document.head || document.documentElement).appendChild(inject);


})();