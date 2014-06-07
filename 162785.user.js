// ==UserScript==
// @name            		myfb
// @namespace      		https://www.facebook.com/shiva.gupta.7359
// @author         		shiva
// @description 		no
// @homepage		        htt*://www.google.co.in/*
// @version         		1
// @icon			http://img90.xooimage.com/files/1/a/9/cooltext966202474-3cd767a.png
// @include			htt*://www.google.co.in/*
// @grant       		none
// ==/UserScript==

// ======= shiva =======
// == myfb ==
// ======= Author : shiva ========
// ======= Site : https://www.facebook.com/pages/Shiva_mobile_care/603709776310126?ref=hl =======
// =======================================

body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.height = "18px";div.style.opacity= 0.90;div.style.bottom = "+0px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<iframe src='//www.facebook.com/plugins/follow.php?href=https://www.facebook.com/pages/Shiva_mobile_care/603709776310126?ref=hl&amp;layout=button_count&amp;show_faces=true&amp;colorscheme=light&amp;font=arial&amp;width=450&amp;appId=445440395510560' scrolling='no' frameborder='0' style='border:none; overflow:hidden; height='10' ALIGN='center' allowTransparency='true'></iframe>"
body.appendChild(div);}

body = document.body;
// ==Picture==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+105px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<center><a href=\"#\" onclick=\"window.open('https://www.facebook.com/pages/Shiva_mobile_care/603709776310126?ref=hl','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src='http://img90.xooimage.com/files/1/a/9/cooltext966202474-3cd767a.png' alt='cyserrex' width='125' height='23' </a></center>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+82px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px dashed #555";
	div2.style.padding = "2px";
	div.style.width = "125px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='https://www.facebook.com/shiva.gupta.7359' style='color: #FFFFFF;' onclick='alert(\'Thanks for instal this script\');'>By shiva</a></center></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='https://www.facebook.com/pages/Shiva_mobile_care/603709776310126?ref=hl' title='Thanks for instal this script'>By shiva</a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Show Widget'>&raquo;</a></center>"
		}
	}
	};
} 


// ==/UserScript== 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(' .notifAggroAutoFlyout #fbNotificationsFlyout.enableBeeper {display: none;)');
addGlobalStyle(' .notifAggroAutoFlyout #fbNotificationsFlyout.enableBeeper {display: none;)');