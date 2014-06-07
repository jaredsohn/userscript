// ==UserScript==
// @name Happy Birthday Lepra!
// @namespace http://shtucer.ru/
// @version 0.02
// @source http://shtucer.ru/
// @description Happy Birthday!
// @exclude http://*leprosorium.ru/users/*
// @include http://*leprosorium.ru/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://shtucer.ru/trash/index_json.php',
    headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/json',
        },
    onload: function(responseDetails){

    data = eval(responseDetails.responseText);
    var greetings = document.createElement('div');
    greetings.id='domains_unread';
    greetings.innerHTML = '<strong><a href="http://boytsoff.ru/dirty/birthdays">Birthdays!</a></strong>';
     for(i=0; i< data.length; i++)
        {
           greetings.innerHTML += '<p><a href="http://leprosorium.ru/users/'+data[i]+'">'+data[i]+'</a></p>';
           
        }        
        $('.layout_left').append(greetings);
    }
 });
