// ==UserScript==
// @name           Hotfile Auto Start modded
// @namespace      Hotfile Auto Start
// @description    Hotfile Auto Start modded
// @author         algkmn | www.aligokmen.com
// @include        http://hotfile.com/dl/*
// @include        http://www.hotfile.com/dl/*
// ==/UserScript==
// modded to reload on captcha by BloodyRain2k

var objecta = document.createElement('script');
objecta.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js';
objecta.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(objecta);


function wait(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(wait, 5000);
	}
	else {
		$ = unsafeWindow.jQuery;
		main();
	}
}

wait();

function main(){

	$(document).ready(function(){	
		window.setTimeout(function() { 

			var pid = $("p#dwltmr").text();

			if (pid != 'You reached your hourly traffic limit.' && pid != 'You are currently downloading..')
			{
				setTimeout("starttimer();",0);
				var idString = $("a.click_download").attr("href");
				$("div.arrow_down").text($("div.arrow_down").text() + " <><><>  Waiting Countdown");

				$("div.arrow_down").css({
					color: '#000',
					background: 'none',
					'font-family': 'verdana',
					'letter-spacing': '0.1em',
					border: '5px solid #060',
					padding: '15px 15px 15px 35px',
					'font-size': '12px',
					'background-color': '#0C0'
				});

			}
			else
			{
				$("div.arrow_down").text($("div.arrow_down").text() + " <><><>  Waiting Hourly Limit");
				$("div.arrow_down").css({
					color: '#FFF', 
					background: 'none',
					'font-family': 'verdana',
					'letter-spacing': '0.1em',
					border: '5px solid #900',
					padding: '15px 15px 15px 35px',
					'font-size': '12px',
					'background-color': '#F00'
				});
			}

			var cpt = $('[name=action]').attr("value");

			if (cpt == 'checkcaptcha')
			{
				window.location.href = window.location.href;
				//window.location.reload();
				//document.reload();
				
				// $("div.arrow_down").text('Please Fill The Captcha...');
				// $("div.arrow_down").css({
					// color: '#000',
					// background: 'none',
					// 'font-family': 'verdana',
					// 'letter-spacing': '0.1em',
					// border: '5px solid #060',
					// padding: '15px 15px 15px 35px',
					// 'font-size': '12px',
					// 'background-color': '#0C0'
				// });
			}



			if (idString != undefined)
			{
				$("div.arrow_down").text('Download Has Been Started...');
				$("div.arrow_down").css({
					color: '#000',
					background: 'none',
					'font-family': 'verdana',
					'letter-spacing': '0.1em',
					border: '5px solid #060',
					padding: '15px 15px 15px 35px',
					'font-size': '12px',
					'background-color': '#0C0'
				});
				window.location = idString;
			}
		}, 0); 
	});
}