// ==UserScript==
// @name          Multi Page Counter
// @namespace     http://www.petitnoir.net/
// @description   
// @include       *
// ==/UserScript==

///////////////////////////////////////////////////////
//表記
//日本語（例：1日と2時間34分56秒）ならja、英語（例：1d2h34m56s)ならenと入力してください
var language = "ja";
var alarm;
//指定の時間が経過したらお知らせします。単位は分です。
// 表記例：alarm = 10, alarm = "15" , alarm 1.5, alarm = 1/2など
//この機能を利用しない場合は下の行をコメントアウトするかalarm = "";としてください。
 //alarm　= "30";
///////////////////////////////////////////////////////

(function (){
	//SBMCommentsViewerを参考にした
	//埋め込みページでは作動しないようにする
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
					alert("このページを開いてから" + alarm　+"分が経過しました。");
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
		if (second != 0){ var Second = second + "秒"; if (language == "en"){Second = second + "s";}}
		if (minute != 0 || minute != '') { var Minute = minute + "分";if (language == "en"){Minute = minute + "m";}}
		if (hour != 0 || hour != ''){ var Hour = hour + "時間";if (language == "en"){Hour = hour + "h";}}
		if (day != 0 || day != '') {
			if (second == 0 && minute == 0 && hour == 0){ 
				Day = day + "日";
			}else{
				Day = day + "日と";
			}
			if (language == "en"){Day = day + "d";}
		}
		var Keika =  Day + Hour + Minute + Second;
		CountAreaSpan.textContent = Keika;
		//全てコメントアウトすると左隅でひっそりとひざを抱えながら経過時間を教えます。
		//横に動かす
			//CountArea.style.left = second +"px";
		//縦に動かす
			//CountArea.style.top = second +"px";
		//縦にダイナミックに動かす
			//CountArea.style.top= second * ((window.innerHeight -18) / 59) +"px";
	}, 1000);

})();