// ==UserScript==
// @name          Page Timer
// @namespace     http://pto2k.blogspot.com
// @description   nttkyk先生的Multi Page Counter（http://userscripts.org/scripts/show/19451 显示页面打开时间 ）的修改版本，增加了1）右下角的圆角样式（mozborderradius,才知道js和css的属性名还不一样，晕），2）时间文字的闪烁，3）中文选择，4）时间到一天会报警（原来就有的功能，也许应该不用会打断浏览的alert，然后可以不止执行一次）
// @include       *
// ==/UserScript==

/*
Changelog
0.6	星期六 三月22日 2008,  12:24:22
样式指定从JS转为CSS（主要是没找到JS怎么指定!important），避免在http://www.w3schools.com/等网站本身CSS指定了div=100%造成的问题。
0.51 2008-03-20
增加的字体的指定，避免因为网页的指定而变化
0.5 2008-03-18
根据时间切换白底黑字和黑底白字两种样式，参考Macosx的时钟widget，6点-18点之间算白天
0.4 2008-03-17
页面打开时也有动画了
0.3 2008-03-17
增加了鼠标移动到时间区域后自动隐藏几秒钟（为了有个动画效果搞半天...）
0.2 2008-03-16
增加了menu选项，切换语言和设置闹钟
0.1 2008-03-15
初版 ，增加了
1）右下角的圆角样式（mozborderradius,才知道js和css的属性名还不一样，晕）
2）时间文字的闪烁，
3）中文选择
4）时间到一天会报警（原来就有的功能，也许应该不用会打断浏览的alert，然后可以不止执行一次）

Todo ideas
1.出现位置的选择？
2.繁体中文版-done
3.定时提醒？
3.提醒方式选择？
4.随时间修改页面显示？例如进度条等等。原来代码中有随时间移动，不过看上去不太美观
5.在firefox中切换到其他标签，或是firefox切换到后台，有无必要和可能暂停timer?
*/


///////////////////////////////////////////////////////
//表記
//日本語（例：1日と2時間34分56秒）ならja、英語（例：1d2h34m56s)ならenと入力してください
//原来可以指定日语或英语显示，现在增加一个中文的cn参数

var language = '';

if (!GM_getValue('language')) {
	GM_setValue('language', "cn");
} else {
	language = GM_getValue('language');
}

//指定の時間が経過したらお知らせします。単位は分です。
// 表記例：alarm = 10, alarm = "15" , alarm 1.5, alarm = 1/2など
//この機能を利用しない場合は下の行をコメントアウトするかalarm = "";としてください。
//原来的定时警告功能被关掉了，现在设置的是打开1天弹出警告
var alarm;
if (!GM_getValue('alarm')) {
	GM_setValue('alarm', 60*24);
} else {
	alarm = GM_getValue('alarm');
}
///////////////////////////////////////////////////////

/* 修改样式表 */
var addCSS = function(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addCSS("#CountArea{-moz-Border-radius:0% 0% 6px 0% !important;border:1px solid gray !important;background:#000000;position:fixed;top:-22px;left:-1px !important;height:15px !important;width:auto !important;opacity:0.85 !important;padding:4px 9px 0px 9px !important;display:block !important;z-index:9999999 !important;verticle-align:center !important;}");
addCSS("#CountAreaSpan{font-family:'Lucida Grande', Tahoma, Verdana, arial, sans-serif, hei !important;color:#ffffff;font-size:10px !important;padding:0px !important;margin-top:0px !important;margin-bottom:0px!important;opacity:1.0 !important;line-height:14px !important;font-weight:700 !important;vertical-align:top !important;}");

var CAcolor;
CAcolor = "";
var CABcolor;
CABcolor = "";
var to_date=new Date();
var to_hours=to_date.getHours();

GM_registerMenuCommand("PagerTime-日本語", function() {
	GM_setValue('language', "ja");
	language = GM_getValue('language');
   }
);
GM_registerMenuCommand("PagerTime-English", function() {
	 GM_setValue('language', "en");
	 language = GM_getValue('language');	 
	 }
);
GM_registerMenuCommand("PagerTime-简体中文", function() {
	GM_setValue('language', "cn");
	language = GM_getValue('language');
  }
);
GM_registerMenuCommand("PagerTime-繁体中文", function() {
	GM_setValue('language', "zhtw");
	language = GM_getValue('language');
	}
);
GM_registerMenuCommand("PagerTime-SetAlarm", function() {
	alarm=prompt("Set Alarm Timing in Miniutes");
	GM_setValue('alarm', alarm);
	alarm = GM_getValue('alarm');
	}
);

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
/*
		with(CountArea.style) {
			MozBorderRadius = "0% 0% 6px 0%";
			border     = "1px solid gray";
			background = '#000000';
			position   = 'fixed';
			top = '-23px';
			left = '-3px';
			height = '20px';
			width - 'auto';
			opacity = '0.85';
			padding = "4px 5px 0px 9px"
			display    = 'block';
			zIndex = "9999999";
		}
*/
		var CountAreaSpan = document.createElement('span');
		CountAreaSpan.id = 'CountAreaSpan';
/*
		with(CountAreaSpan.style) {
			fontFamily:"'Lucida Grande', Tahoma, Verdana, arial, sans-serif, hei";
			color = '#ffffff';
			fontSize = '10px';
			marginTop = '1px';
			marginBottom = "1px";
			opacity = '1.0';
		}
*/
		CountArea.appendChild(CountAreaSpan);
		setTimeout(document.body.appendChild(CountArea),10000);	
		
		var caDisplay = true;
		var caHideStart = n;
		var caTop = -3;
		var caInMove = false;
		var showCAInt;
		var showCAInt;
		var toggleHide = function(e){
				caDisplay = false;
				caHideStart = n;
			}
		CountArea.addEventListener('mouseover', toggleHide, false);
		
		var moveCACountStart = 1;
		var newPos;
/* 移动的操作 */
		var showCA = function(){
			moveCACountStart = 0;
			showCAInt = window.setInterval(moveCADown,20);
		}
		var hideCA = function(){
			moveCACountStart = 0;
			hideCAInt = window.setInterval(moveCAUp,20);
			}
		var moveCAUp = function(){
			moveCACountStart = moveCACountStart + 1;
			newPos = -3-moveCACountStart;
			CountArea.style.top = newPos + "px";
			if(newPos<-25){
				window.clearInterval(hideCAInt);
				caInMove = false;
				caTop = newPos
				}
			}
		var moveCADown = function(){
			moveCACountStart = moveCACountStart + 1;
			newPos = -25+moveCACountStart;
			CountArea.style.top = newPos + "px";
			if(newPos>-4){
				window.clearInterval(showCAInt);
				caInMove = false;
				caTop = newPos;
			}
			}
/* 		每秒执行的操作	 */
		setInterval(function (){
		n = n + 1;
		if (alarm){
			if (n == alarm * 60){
				if(language =="ja"){
					alert("このページを開いてから" + alarm　+"分が経過しました。");
				}else{
					if (language =="en"){alert(alarm + "minutes have passed since you opened this page.");}
					if (language =="cn"){alert("本页面已打开了" + alarm + "分钟！");}
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
		if (second != 0){ var Second = second + "秒"; if (language == "en"){Second = second + "s";}; if (language == "cn" || language == "zhtw"){Second = second + "秒";}}
		if (minute != 0 || minute != '') { var Minute = minute + "分";if (language == "en"){Minute = minute + "m";};if (language == "cn"){Minute = minute + "分";}}
		if (hour != 0 || hour != ''){ var Hour = hour + "時間";if (language == "en"){Hour = hour + "h";};if (language == "cn"){Hour = hour + "小时";};if (language == "zhtw"){Hour = hour + "小時";}}
		if (day != 0 || day != '') {
			if (second == 0 && minute == 0 && hour == 0){ 
				Day = day + "日";
			}else{
				Day = day + "日と";
			}
			if (language == "en"){Day = day + "d";}
			if (language == "cn" || language == "zhtw"){Day = day + "天";}
		}
		var Keika =  Day + Hour + Minute + Second;
		CountAreaSpan.textContent = Keika;

		//如果一米阳光
		if(to_hours<=18 && to_hours>=6){
			CAcolor="#EFEFEF";
			if (CABcolor==""){
				CABcolor="black";
			}else{
			if (CABcolor=="black"){
				CABcolor="#bbbbbb";
			}else{
				if (CABcolor=="#bbbbbb"){
				CABcolor="black";
			}
			}
			}

		}//如果晚风习习
		else{
		CAcolor="#000000"
			if (CABcolor==""){
				CABcolor="white";
			}else{
			if (CABcolor=="grey"){
				CABcolor="white";
			}else{
				if (CABcolor=="white"){
				CABcolor="grey";
			}
			}
			}
		}
		CountArea.style.background = CAcolor;//背景色
		CountAreaSpan.style.color = CABcolor;//字色
		//启动隐藏，3秒钟恢复
		if (caDisplay == true){
			if (newPos < -3  && caInMove==false){
				showCA();
				caInMove = true;
			}
			}else{
				if (caInMove==false && caTop == -3){
				hideCA();
				caInMove = true;
				}
				}			
		if (caHideStart + 2 == n){
			caDisplay = true;
			}
		if(n==2){showCA();caInMove = true;}
		//CountArea.style.border = "2px solid " +CAcolor;
		//全てコメントアウトすると左隅でひっそりとひざを抱えながら経過時間を教えます。
		//横に動かす
			//CountArea.style.left = second +"px";
		//縦に動かす
			//CountArea.style.top = second +"px";
		//縦にダイナミックに動かす
			//CountArea.style.top= second * ((window.innerHeight -18) / 59) +"px";
	}, 1000);

})();