// ==UserScript==
// @name MadMenRigV3
// @namespace tvrig
// @include http://www.tv.com/lists/SpecialFeatures:list:best-overall-series/widget/poll/*
// @version 2.2
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
        if(attempts > 20)
          window.location.reload();
                    if(idleNum && idleNum<idleTotal)
                    {
                            idleNum++;
                            return;
                    }else
                            idleNum=0;
                    var x = new XMLHttpRequest(),
                            msg = {'vote_rate_limit': '3',
                                            'list_id': 'SpecialFeatures:list:best-animated-series',
                                            'id': 's:2471',
                                            'a': 'a',
                                            'v': '+1'},
                            string = 'inp=' + encodeURIComponent(JSON.stringify(msg)) + '&csrfmiddlewaretoken=' + (document.cookie.match(/csrftoken=[^;]*/i)[0].split('=')[1] || '') + '&page_token=' + (document.getElementById("page_token").getAttribute("data-value") || '');
                    x.open('POST','/lists/update/',true);
                    x.setRequestHeader('Content-type','application/json; charset=utf-8');
                    x.setRequestHeader('Content-length', string.length);
                    x.setRequestHeader('Connection', 'close');
                    x.onreadystatechange = function(){
                            if(x.readyState == 4) {
                                    if(x.status != 200 && x.status != 304) {
                                            count--;
                                            idleNum++;
                                    }
                            }
                    };
                    x.send( string );
                    if( t ) {
                            t.innerHTML = t.innerHTML.substring(0, t.innerHTML.lastIndexOf('>') + 1) + 'Successful Posts: '+ ++count + ' - Attempts '+ ++attempts;
                    }
            }
            var count=0, attempts=0, idleNum=0, idleTotal=10, t = [].slice.call(document.getElementsByClassName('title'))[8];
            speed = parseInt(getQueryVariable('speed'));
            speed = !speed ? 1000 : speed < 100 ? 100 : speed > 100000 ? 100000 : speed;
     
            window.setInterval(spamVotes, speed);
    }