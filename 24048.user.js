// ==UserScript==
// @name          Multi Page Counter
// @namespace     http://www.petitnoir.net/
// @description   
// @include       *
// ==/UserScript==

///////////////////////////////////////////////////////
//è¡¨è¨˜
//æ—¥æœ¬èªžï¼ˆä¾‹ï¼š1æ—¥ã¨2æ™‚é–“34åˆ†56ç§’ï¼‰ãªã‚‰jaã€è‹±èªžï¼ˆä¾‹ï¼š1d2h34m56s)ãªã‚‰enã¨å…¥åŠ›ã—ã¦ãã ã•ã„
var language = "ja";
var alarm;
//æŒ‡å®šã®æ™‚é–“ãŒçµŒéŽã—ãŸã‚‰ãŠçŸ¥ã‚‰ã›ã—ã¾ã™ã€‚å˜ä½ã¯åˆ†ã§ã™ã€‚
// è¡¨è¨˜ä¾‹ï¼šalarm = 10, alarm = "15" , alarm 1.5, alarm = 1/2ãªã©
//ã“ã®æ©Ÿèƒ½ã‚’åˆ©ç”¨ã—ãªã„å ´åˆã¯ä¸‹ã®è¡Œã‚’ã‚³ãƒ¡ãƒ³ãƒˆã‚¢ã‚¦ãƒˆã™ã‚‹ã‹alarm = "";ã¨ã—ã¦ãã ã•ã„ã€‚
 //alarmã€€= "30";
///////////////////////////////////////////////////////

(function (){
	//SBMCommentsViewerã‚’å‚è€ƒã«ã—ãŸ
	//åŸ‹ã‚è¾¼ã¿ãƒšãƒ¼ã‚¸ã§ã¯ä½œå‹•ã—ãªã„ã‚ˆã†ã«ã™ã‚‹
    try{
        if (self.location.href!=top.location.href || !document.body) return;
    }catch(e){
        return;
    }
	var n = 0;
		var CountArea = document.createElement('div');
		CountArea.id = 'CountArea';
		with(CountArea.style) {
			border     = "1px solid gray";
			background = '#000000';
			position   = 'fixed';
			top = '0px';
			left = '0px';
			opacity = '0.7';
			zIndex = '999';
			display    = 'block';
		}
		var CountAreaSpan = document.createElement('span');
		CountAreaSpan.id = 'CountAreaSpan';
		with(CountAreaSpan.style) {
			color = '#ffffff';
			fontSize = '12px';
			margin = '10px';
			marginBottom = "2px";
			opacity = '1.0';
		}
		CountArea.appendChild(CountAreaSpan);
		document.body.appendChild(CountArea);	

		setInterval(function (){
		n = n + 1;
		if (alarm){
			if (n == alarm * 60){
				if(language =="ja"){
					alert("ã“ã®ãƒšãƒ¼ã‚¸ã‚’é–‹ã„ã¦ã‹ã‚‰" + alarmã€€+"åˆ†ãŒçµŒéŽã—ã¾ã—ãŸã€‚");
				}else{
					alert(alarm + "minutes have passed since you opened this page.");
				}
			}
		}
		var second = n;
		var minute = hour = day = Second = Minute = Hour = Day ='';
		if (second > 59){
			minute = Math.floor(second / 60 );
			second = second % 60;
		}
		if (minute > 59){
			hour = Math.floor(minute / 60);
			minute = minute % 60;
		}
		if (hour > 23){
			day = Math.floor(hour / 24);
			hour = hour % 24;
		}
		if (second != 0){ var Second = second + "ç§’"; if (language == "en"){Second = second + "s";}}
		if (minute != 0 || minute != '') { var Minute = minute + "åˆ†";if (language == "en"){Minute = minute + "m";}}
		if (hour != 0 || hour != ''){ var Hour = hour + "æ™‚é–“";if (language == "en"){Hour = hour + "h";}}
		if (day != 0 || day != '') {
			if (second == 0 && minute == 0 && hour == 0){ 
				Day = day + "æ—¥";
			}else{
				Day = day + "æ—¥ã¨";
			}
			if (language == "en"){Day = day + "d";}
		}
		var Keika =  Day + Hour + Minute + Second;
		CountAreaSpan.textContent = Keika;
		//å…¨ã¦ã‚³ãƒ¡ãƒ³ãƒˆã‚¢ã‚¦ãƒˆã™ã‚‹ã¨å·¦éš…ã§ã²ã£ãã‚Šã¨ã²ã–ã‚’æŠ±ãˆãªãŒã‚‰çµŒéŽæ™‚é–“ã‚’æ•™ãˆã¾ã™ã€‚
		//æ¨ªã«å‹•ã‹ã™
			//CountArea.style.left = second +"px";
		//ç¸¦ã«å‹•ã‹ã™
			//CountArea.style.top = second +"px";
		//ç¸¦ã«ãƒ€ã‚¤ãƒŠãƒŸãƒƒã‚¯ã«å‹•ã‹ã™
			//CountArea.style.top= second * ((window.innerHeight -18) / 59) +"px";
	}, 1000);

})();

