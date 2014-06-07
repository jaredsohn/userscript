// ==UserScript==
// @name			WSO sale
// @namespace		aa-team.name
// @creator			Andrei Dinca
// @description		Sales Notification for WSO
// @date			2012-03-24
// @include			http://www.warriorplus.com/wsopro/my-listings*
// @version			1.5
// ==/UserScript==
(function () {
	function chaching() {
		
		var interval = 10,
			now = new Date().getTime(),
			lastcheck = getCookie('wso-bell_lastcheck'),
			lastsales = getCookie('wso-bell_lastsales'),
			mp3 = 'http://dl.dropbox.com/u/16799220/wso/coin.mp3',
			ogg = 'http://dl.dropbox.com/u/16799220/wso/coin.ogg',
			$userbalance = jQuery('#mylisting_table').find('tr').eq(1).find('td').last();
       
		//console.log( 'init'  );
        setTimeout(start,Math.max(0, 10000-(now-lastcheck)));
		
		function chachingIT(){
			//console.log( 'chachingIT: ' );
			if($('#wso-bell').length) $('#wso-bell').remove();
			$('<audio id="wso-bell" autoplay><source src="'+ogg+'" type="audio/ogg"></source><source src="'+mp3+'" type="audio/mpeg"></source></audio>').appendTo('body');	
		}

		function start() {
			//console.log( 'start'  );
			checkForSales();
			setInterval(function(){
				checkForSales();
			}, 40000);
		}

		function checkForSales() {
           // console.log( 'checksales'  );
			$.get('http://www.warriorplus.com/wsopro/my-listings', function(data){
				var row 	= $(data).find('#mylisting_table').find('tr').eq(1),
					sales	= row.find('td').last().text();

                //console.log( row  );

				//console.log( 'sales: ' + sales  );
				//console.log( 'lastsales: ' + lastsales  );
				
				// could fetch sales
				if(!sales) return;

				// sales are different then the last ones
				if(lastsales != sales){
					//save new sales
					setCookie('wso-bell_lastsales', sales, 365);
                    
					chachingIT();
					
					// update the table
					jQuery('#mylisting_table').find('tr').eq(1).replaceWith(row);
					
					//our new lastsales
					lastsales = sales;
				}

				// lastcheck was now
				lastcheck = new Date().getTime();

				// save lastcheck but remove it if browser is closed (force check on restart)
				setCookie('wso-bell_lastcheck', lastcheck);
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