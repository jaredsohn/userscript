// ==UserScript==
// @name TVGuideRig Edited
// @namespace tvrigedit
// @include http://www.tv.com/lists/SpecialFeatures:list:best-animated-series-2013/widget/poll/*
// @version 3.1e
// ==/UserScript==

//default speed is .5 seconds between votes
var speed = 500;

// A shitty edit made by me
var otherShows = [];
otherShows[0] = 's:79149';
otherShows[1] = 's:138801';
otherShows[2] = 's:58193';
otherShows[3] = 's:133459';
otherShows[4] = 's:192315';
otherShows[5] = 's:4204';
otherShows[6] = 's:70615';
otherShows[7] = 's:3944';

/*
 * 79149 - Young Justice
 * 138801 - The Last Airbender: Legend of Korra
 * 58193 - Adventure Time
 * 133459 - Gravity Falls
 * 192315 - Steven Universe
 * 4204 - Star Wars: The Clone Wars
 * 70615 - Regular Show
 * 3944 - Phineas and Ferb
 */

if (window.location.search.indexOf('speed=') == -1 ) {
	speed = parseInt(prompt('Confirm this dialog to start script\n\nHow fast do you want to run at?\n(Lower is faster)', speed));
	window.location.href = window.location.href + (window.location.href.indexOf('?')==-1 ? '?' : '&') + 'speed=' + speed;
} else {
	var token=document.getElementById('page_token'),box = [].slice.call(document.getElementsByClassName('title'))[3];
	if(!box)
	{
		var box=document.createElement('div');
		box.style.border='1px solid';
		box.style.zIndex='20';
		box.style.backgroundColor='#FFF';
		box.style.position='fixed';
		box.style.padding='10px';
		box.style.borderRadius='8px';
		box.style.marginLeft='60px';
		box.style.right='35px';
		box.style.top='35px';
		document.body.appendChild(box);
	}
	if(token)
	{
		token=token.getAttribute('data-value');
		function getQueryVariable(variable)
		{
			var query = window.location.search.substring(1), vars = query.split('&');
			for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split('=');
				if (pair[0] == variable) {
					return pair[1];
				}
			}
		}
		function spamVotes()
		{
            for (var oShowNum = 0; oShowNum < otherShows.length; oShowNum++) {
                if(attempts == 20)
                    window.location.reload();
                if(idleNum && idleNum<idleTotal)
                {
                    idleNum++;
                    return;
                }else
                    idleNum=0;
                var x = new XMLHttpRequest(),
                    msg = {	'list_id': 'SpecialFeatures:list:best-animated-series-2013',
                            'id': otherShows[oShowNum],
                            'a': 'a',
                            'v': '+1',
                            'vote_rate_limit': '3' },
                    string = 'inp=' + encodeURIComponent(JSON.stringify(msg)) + '&csrfmiddlewaretoken=' + (document.cookie.match(/csrftoken=[^;]*/i)[0].split('=')[1] || '') + '&page_token=' + token;
                
                x.open('POST','/lists/update/',true);
                x.setRequestHeader('Content-type','application/json; charset=utf-8');
                x.setRequestHeader('Content-length', string.length);
                x.setRequestHeader('Connection', 'close');
                x.onreadystatechange = function(){
                    if(x.readyState == 4) {
                        if(x.status != 200 && x.status != 304 /*|| x.responseText.length < 30 */) {
                            count--;
                            idleNum++;
                        }
                    }
                };
                x.send( string );
                if( box ) {
                    box.innerHTML = box.innerHTML.substring(0, box.innerHTML.lastIndexOf('>') + 1) + 'Successful Posts: '+ ++count + ' - Attempts: '+ ++attempts;
                }
            }
		}
		var count=0, attempts=0, idleNum=0, idleTotal=10;
		speed = parseInt(getQueryVariable('speed'));
		speed = !speed ? 1000 : speed < 100 ? 100 : speed > 100000 ? 100000 : speed;
	
		window.setInterval(spamVotes, speed);
	}
	else
	{
		var c=20;
		function re()
		{
			box.innerHTML='page will reload in ' + c-- +' second(s)';
			if(c==0)window.location.reload();
		}
		window.setInterval(re, 1000);
	}
}