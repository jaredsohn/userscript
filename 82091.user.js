// ==UserScript==
// @name           Lockerz Captcha watcher
// @namespace      http://vhssubtil.x10.bz/
// @include        http://www.lockerz.com/p/watch/*
// ==/UserScript==
timerID = self.setInterval(tick, 1000)
answed = false;
watched = window.location.href;
document.getElementById('content-video-title').innerHTML+=" - " + (GM_getValue(watched,0)+1);

function tick()
{
	if(document.getElementById('contentCaptcha'))
	{
		if(document.getElementById('contentCaptcha').style.display!='none' && answed==false)
		{
			var answer = prompt ("Captcha?","");
			document.getElementById('recaptcha_response_field').value=answer;
			document.getElementById('getPtzBtn').click();
			
			answed=true;
		
			//clearInterval(timerID);
		}
		else if(document.getElementById('contentWatched').style.display!='none')
		{
			if(answed==true)
			{
				GM_setValue(watched,GM_getValue(watched,0)+1);

				if(GM_getValue(watched,0)<5)
				{
					
					window.location.href=window.location.href;
				}
				else
				{
					GM_setValue(watched,0);
				}
				
				answed=false;
			}
		}
	}
}
///////////////////////////////////////////////////////////