// ==UserScript==
// @name			Facebook Suka N dop Suke
// @namespace		        Auto Like And Confirm 
// @version			0.5
// @copyright		        marr
// @description		        WELCOME... Tima Kasih ENjoy !!
// @author			crew_bmi
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @exclude			https://developers.facebook.com/*
// Auto_Suke and Auto_Dopsuke

// ==/UserScript==
// ==Profile==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+82px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#CCD3E3";
	div.style.border = "1px dashed #FF00FF";
	div.style.padding = "2px";
	div.innerHTML =  "<img src='http://fc08.deviantart.net/fs50/f/2009/262/7/7/Cute_Cat_Icon_by_RandomDraggon.gif' width='16' height='14' align='absmiddle' color: #000000;' onclick='spoiler()' title='Click jeww..''>&laquo;</a><a href='/umarsyimir' style='color: #000000;' onclick='alert(\'TIMA KASIH for instal this script\');'>~welcoOme^_^V~</a></div> "
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+62px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px dashed #FF00FF";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px dashed #BF00FF;'><a style='color: #FF00FF;' onclick='spoiler()' title='Click jeww..''>&laquo;</a> &#8226; <a href='/umarsyimir' style='color: #FFFFFF;' onclick='alert(\'TIMA KASIH for instal this script\');'>By_meow_catsz^^v</a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Click jeww..''>&laquo;</a> &#8226; <a href='/umarsyimir' title='My FRiEND'>Timo_Kasih^^v</a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='Click jeww..''> auto_Like &raquo;</a>"
		}
	}
	};
}

// ==============
// ==Like All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #FF00FF";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>Nop Like smua !!</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #FF00FF";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://static.unplugged.rcrwireless.com/wp-content/uploads/2010/09/facebook-300x281.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlike()'>xboh LiKE smua LoL</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisUnlike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Confirm All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #FF00FF";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisKonfirm();' >Confim smua</a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' >xboh cofim smua</a>"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisKonfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	

	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};

}

