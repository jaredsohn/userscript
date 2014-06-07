// ==UserScript==
// @name           Facebook Auto Like by Alienz
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and comments
// @include        http://www.facebook.com/*
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
	div.style.bottom = "+165px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#0000FF";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/fbpage.png' width='16' height='14' align='absmiddle'div style='background-color: #0000CD; '><left><a style='color: #FF0000;'onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://www.facebook.com/mutiarailiya' style='color: #FFFFFF; 'target='_blank' onclick='alert(\'Thanks for install this script\');'>Mutiara Iliya</a></div> "
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
    div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+145px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#00BFFF";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/twitter.png' width='16' height='14' align='absmiddle'div style='background-color: #00BFFF; '><left><a style='color: #FF0000;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://twitter.com/mutiarailiya' style='color: #000000; 'target='_blank' onclick='alert(\'Thanks for install this script\');'>@mutiarailiya</a></div> "
	div3 = document.createElement("div");
	div3.setAttribute('id','spoiler');
	div3.style.position = "fixed";
    div3.style.width = "125px";
	div3.style.opacity= 0.90;
	div3.style.bottom = "+125px";
	div3.style.left = "+6px";
	div3.style.backgroundColor = "#BFEFFF";
	div3.style.border = "1px solid #555";
	div3.style.padding = "2px";
	div3.innerHTML = "<img src='http://www.facebook.com/images/icons/poke.gif' width='16' height='14' align='absmiddle'div style='background-color:	#87CEFF; '><left><a style='color: #FF0000;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://www.facebook.com/pokes' style='color: #000000; 'target='_blank' onclick='alert(\'Thanks for install this script\');'>Auto Pokes</a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	body.appendChild(div3);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='https://twitter.com/mutiarailiya' title='Mutiara Iliya twitter'>twitter @mutiarailiya</a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='Click to Show Widget'> Auto Like &raquo;</a>"
		}
	}
	};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/like.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='AutoLaik()'>Like All Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLaik = function() {
	
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