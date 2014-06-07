// ==UserScript==
// @name Auto Pilot [EMWI]
// @version 0.1
// @description Auto Pilot ~ Member Tim Riset EMWI.
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// ==/UserScript==

if((navigator.appName)== 'Microsoft Internet Explorer')
{
alert('This Bookmarklet Will Not Work in IE . Please Switch to Firefox or Chrome \n Thanks ');
return;
}
else if(/apps.facebook.com/.test(document.location))
{
for(var i=0;i<document.forms.length;i++){if(/^canvas_iframe_post/.test(document.forms[i].id)){document.forms[i].target='';document.forms[i].submit();return;}};
}
else if (document.getElementById('some_mwiframe')) {
		window.location.href = document.getElementById('some_mwiframe').src;
		return;
	}
else
{
alert('Please Try Again');
}

// job
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.height = "+70px";
	div.style.padding = "+0pt +3px";
	div.style.border-bottom = "1px solid rgb(51,51,51);
	div.style.padding = "2px";
	div.innerHTML = "<a class="sexy_button_new short orange sexy_energy_new impulse_buy" href="remote/html_server.php?xw_controller=job&xw_action=dojob&xw_city=1&tmp=c528bf91982798755d299b0982ba12c2&cb=53b49cc0603d11e188db2f15b6de3ba6&xw_person=53598187&job=76&tab=9" requirements="{"energy":47}" selector="#inner_page">"
	
	body.appendChild(div);
	
	unsafeWindow.AutoJob = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("job_link") >= 0)
				if(buttons[i].getAttribute("name") == "Do Job")
					buttons[i].click();
		}
		
	};
}


