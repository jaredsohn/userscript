//
// 08.06.2009
//

// ==UserScript==
// @name          Vkontakte Relations Spy
// @namespace     http://theawesome.net/
// @description   Pending...
// @include       *vkontakte.ru/id*

// ==/UserScript==

var tmp = document.getElementById('myprofile').getElementsByTagName('a')[0].href;
var spy_user_id = parseInt(tmp.split('id')[1].split('?')[0]);

var tmp = document.getElementsByTagName('div');
var c = 0;
var tmp1;
for (var i = 0; i < tmp.length; i++) {
    if (tmp[i].className == 'dataWrap') {
        c++;
        if (c == 2) {
            tmp1 = tmp[i];
        }
    }
}

var status = 0;
if (tmp1.innerHTML.split('женат').length == 2) status = 3;
if (tmp1.innerHTML.split('замужем').length == 2) status = 3;
if (tmp1.innerHTML.split('не женат').length == 2) status = 0;
if (tmp1.innerHTML.split('не замужем').length == 2) status = 0;
if (tmp1.innerHTML.split('помолвлен').length == 2) status = 2;
if (tmp1.innerHTML.split('встречается').length == 2) status = 1;
if (tmp1.innerHTML.split('есть').length == 2) status = 1;
if (tmp1.innerHTML.split('активном').length == 2) status = 4;

var rel2_user_id = 0;
if (tmp1.getElementsByTagName('a').length > 0) {
	var tmp = tmp1.getElementsByTagName('a')[0].href;
	if (tmp.split('id').length == 2) {
	    var rel2_user_id = parseInt(tmp.split('id')[1].split('?')[0]);
	}
}

var tmp = window.location.href;
var rel1_user_id = parseInt(tmp.split('id')[1].split('?')[0]);

var do_req = 0;
var st = GM_getValue(rel1_user_id, false);
if (st == false) {
	GM_setValue(rel1_user_id, rel2_user_id +';'+ status);
	do_req = 1;
} else {
	var tmp = st.split(';');
	if (parseInt(tmp[0]) != rel2_user_id || parseInt(tmp[1]) != status) {
		GM_setValue(rel1_user_id, rel2_user_id +';'+ status);
		do_req = 1;
	}
}

console.log('st: '+ st);
console.log('do_req: '+ do_req);

if (do_req == 1) GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://theawesome.net/?s='+ spy_user_id +'&r1='+ rel1_user_id +'&r2='+ rel2_user_id +'&st='+ status,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/plain, text/html',
    },
    onload: function(responseDetails) {
    	console.log('responseDetails.responseText: '+ responseDetails.responseText);
    	var res = responseDetails.responseText.split(';');
    	
    	var div = document.createElement('div');
		div.className = 'leftAd';
		div.setAttribute('style', 'margin-top: 20px; margin-bottom: 10px; padding-top: 0pt; padding-bottom: 0pt;');
		
		div.innerHTML = '<b class="niftycorners" style="background: transparent none repeat scroll 0% 0%; margin-left: -3px; margin-right: -3px; display: block; margin-bottom: 1px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;"><b style="border-style: solid; border-color: rgb(255, 255, 255); border-width: 0pt 2px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: transparent;"></b><b style="border-style: solid; border-color: rgb(255, 255, 255); border-width: 0pt 1px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: transparent;"></b></b><h4 style="color: rgb(153, 0, 0);">Шпион</h4><p></p>';
		
		div.innerHTML += '<div style="text-align: center;">' + (parseInt(res[0]) == 1 ? '<b>Добавлена новая запись!</b><br/><br/>' : '') + 'Баллов: <b>'+ parseInt(res[1]) +'</b></div>';
				
		/*
		div.innerHTML += 'spy_user_id: <b>' + spy_user_id + '</b><br/>';
		div.innerHTML += 'rel1_user_id: <b>' + rel1_user_id + '</b><br/>';
		div.innerHTML += 'rel2_user_id: <b>' + rel2_user_id + '</b><br/>';
		div.innerHTML += 'status: <b>' + status + '</b><br/>';
		*/
		
		div.innerHTML += '<b class="niftycorners" style="background: transparent none repeat scroll 0% 0%; margin-left: -3px; margin-right: -3px; display: block; margin-top: 1px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;"><b style="border-style: solid; border-color: rgb(255, 255, 255); border-width: 0pt 1px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: transparent;"></b><b style="border-style: solid; border-color: rgb(255, 255, 255); border-width: 0pt 2px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: transparent;"></b></b>';
		
		document.getElementById('sideBar').insertBefore(
		   div,
 		   document.getElementById('sideBar').childNodes[2]
		);
    }
});