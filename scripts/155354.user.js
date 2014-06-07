Use 'TamperMonkey' for Chrome  - Others are using FireFox




// ==UserScript==
// @name TVGuideRigMain-Elementary
// @namespace tvrig
// @include http://www.tv.com/features/best-of-2012/vote/poll/SpecialFeatures:list:best-new-series/*
// @version 1
// ==/UserScript==
 
//default speed is 1 second between votes
var speed=1000;
 
if( window.location.search.indexOf('speed=') == -1 ) {
        speed = parseInt(prompt('Confirm this dialog to start script\n\nHow fast should this autism fest run at?\n(Lower is faster)', speed));
        window.location.href = window.location.href + (window.location.href.indexOf('?')==-1 ? '?' : '&') + 'speed=' + speed;
} else {
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
                if(attempts == 20)
                        window.location.reload();
                if(idleNum && idleNum<idleTotal)
                {
                        idleNum++;
                        return;
                }else
                        idleNum=0;
                var x = new XMLHttpRequest(),
                        msg = { 'list_id': 'SpecialFeatures:list:best-comedy-series',
                                        'id': 's:17043',
                                        'a': 'a',
                                        'v': '+1',
                                        'vote_rate_limit': '3'
                                        },
                        msg2 = {
                                        'list_id': 'SpecialFeatures:list:best-comedy-series',
                                        'id': 's:17043',
                                        'a': 'a',
                                        'v': 'd'},
                        string1 =  encodeURIComponent(JSON.stringify(msg)),
                        string2 =  encodeURIComponent(JSON.stringify(msg2)),
                        string3 = 'inp=[' + string1 +','+ string2 + ']&csrfmiddlewaretoken=' + (document.cookie.match(/csrftoken=[^;]*/i)[0].split('=')[1] || '') + '&page_token=' + (document.getElementById("page_token").getAttribute("data-value") || '');
                x.open('POST','/lists/update/',true);
                x.setRequestHeader('Content-type','application/json; charset=utf-8');
                x.setRequestHeader('Content-length', string3.length);
                x.setRequestHeader('Connection', 'close');
                x.onreadystatechange = function(){
                        if(x.readyState == 4) {
                                if(x.status != 200 && x.status != 304) {
                                        count--;
                                        idleNum++;
                                }
                        }
                };
                x.send( string3 );
                if( box ) {
                        box.innerHTML = box.innerHTML.substring(0, box.innerHTML.lastIndexOf('>') + 1) + 'Successful Posts: '+ ++count + ' - Attempts: '+ ++attempts;
                }
        }
        var count=0, attempts=0, idleNum=0, idleTotal=10, t = [].slice.call(document.getElementsByClassName('title'))[9];
        speed = parseInt(getQueryVariable('speed'));
        speed = !speed ? 1000 : speed < 100 ? 100 : speed > 100000 ? 100000 : speed;
 
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
        window.setInterval(spamVotes, speed);
}