// ==UserScript==
// @name			WithdrawalReminder
// @creator			golle
// @description		withdrawal Reminder for Envato Authors
// @date			2012-08-05
// @version			0.1
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

	function withdrawalReminder() {
		var daysBefore = 5;
		if (cookieCheck()) return;

		var msLeft, wthTime, container, announcement, closeBtn, interval;
		init();

		if(msLeft < daysBefore * 86400000){
			createContainer();
			displayTime(msLeft);
			interval = setInterval(updateTime, 1000);
		}else{
			return;
		}
		function init(){
			var aussieTime = getAussieTime();
			var month = aussieTime.getMonth();
			var year = aussieTime.getFullYear();
			wthTime = new Date(year,month+1,1,0,0,0,1);
			msLeft = wthTime-aussieTime;		
		}
		function cookieCheck(){
			var cookiePattern = new RegExp('(^|;)[ ]*withdrawalReminder=([^;]*)'),
			cookieMatch = cookiePattern.exec(document.cookie);
			if(cookieMatch){
				return cookieMatch[2];
			}
			return false;
		}
		function updateTime(){
			msLeft -= 1000;
			if(msLeft > 0){
				displayTime(msLeft);
			}else{
				clearInterval(interval);
				announcement.innerHTML = "Ouch !!!"
			}			
		}
		function createContainer(){
			container = document.createElement("div");
			container.className = "big-announcement";
			container.setAttribute("style", "background-repeat:no-repeat; margin-bottom: 0px;");

			announcement = document.createElement("div");
			closeBtn = document.createElement("a");
			closeBtn.setAttribute("style", "position: absolute; right: 20px; top: 20px;");
			closeBtn.setAttribute("href", "#");
			closeBtn.onclick = function(){
				closeReminder();
			}
			closeBtn.innerHTML = '<img src="/images/common/icons-buttons/close.png">'
			document.body.insertBefore(container,document.body.firstChild);
			container.appendChild(announcement);
			container.appendChild(closeBtn);

		}
		function closeReminder(){
			clearInterval(interval);
			document.body.removeChild(container);
			var expDate = wthTime;
			expDate.setHours(expDate.getHours() - 10);
			document.cookie = 'withdrawalReminder=true; expires='+expDate.toUTCString()+'; path=/'
		}
		function displayTime(ms){
			announcement.innerHTML = timeString(ms);
		}
		function timeString(ms){
			var days = Math.floor(ms/86400000);
			ms -= days * 86400000;
			var hours = Math.floor(ms/3600000);
			ms -= hours * 3600000;
			var minutes = Math.floor(ms/60000);
			ms -= minutes * 60000;
			var seconds = Math.floor(ms/1000);
			var text = "Time left to make withdrawal ";
			text += "<strong>" + days + "</strong> days " ;
			text += "<strong>" + hours + "</strong> hours " ;
			text += "<strong>" + minutes + "</strong> minutes and ";
			text += "<strong>" + seconds + "</strong> seconds";
			return text;
		}
		function getAussieTime(){
			var time = new Date();
			var offset = time.getTimezoneOffset() * 60000;
			var ms = time.getTime();
			return new Date(ms + offset + 36000000);
		}


	}

	var inject = document.createElement("script");

	inject.setAttribute("type", "text/javascript");
	inject.appendChild(document.createTextNode("(" + withdrawalReminder + ")()"));

	(document.head || document.documentElement).appendChild(inject);


})();