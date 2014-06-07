// ==UserScript==
// @name           profil modifier
// @namespace      Travian
// @description    adds off and deff rank into user profils
// @include        http://*.travian.*/spieler.php?uid=*
// ==/UserScript==

//Translated be moudax @ www.ar-travian.com
//ترجمة مودكس ... منتديات ترافيان العربية

window.addEventListener('load', main, false);

function main()
{	var user = document.getElementById('profile').getElementsByTagName('th')[0].innerHTML;
	var player = user.search(/ /g);
	if(player!=-1)
	{	user=user.slice(player+1);
		var table = document.getElementById('profile').getElementsByTagName('table')[0].getElementsByTagName('tr')[0];

		var deff_tr = document.createElement('tr');
		var	deff_1_td = document.createElement('th');
		var	deff_2_td = document.createElement('td');
		table.parentNode.insertBefore(deff_tr,table.nextSibling);
		deff_tr.parentNode.insertBefore(deff_1_td,deff_tr);
		deff_tr.parentNode.insertBefore(deff_2_td,deff_tr);
		deff_1_td.innerHTML = '\u0631\u062A\u0628\u0629 \u0627\u0644\u062F\u0641\u0627\u0639' + ':';
		deff_2_td.innerHTML = '\u0627\u0644\u0631\u062A\u0628\u0629 (\u0627\u0644\u0646\u0642\u0627\u0637)';
		
		var off_tr = document.createElement('tr');
		var	off_1_td = document.createElement('th');
		var	off_2_td = document.createElement('td');
		table.parentNode.insertBefore(off_tr,table.nextSibling);
		off_tr.parentNode.insertBefore(off_1_td,off_tr);
		off_tr.parentNode.insertBefore(off_2_td,off_tr);
		off_1_td.innerHTML = '\u0631\u062A\u0628\u0629 \u0627\u0644\u0647\u062C\u0648\u0645' + ':';
		off_2_td.innerHTML = '\u0627\u0644\u0631\u062A\u0628\u0629 (\u0627\u0644\u0646\u0642\u0627\u0637)';
		
		var s1x = Math.ceil(Math.random()*50); //buttonpositionen
		var s1y = Math.ceil(Math.random()*20);
		
		var url = 'http://'+document.URL.split('/')[2]+'/statistiken.php?id=31';
		post(url,'rank=1234&name='+user+'&submit.x='+s1x+'&submit.y='+s1y+'&submit=submit'
		, function(text)
		{	var rank_html =  text.split('<tr class="hl" >')[1].split('</tr>')[0];
			var rank = rank_html.split('<td class="ra  fc" >')[1].split('.')[0];
			var points = rank_html.split('<td class="po  lc" >')[1].split('</td>')[0];
			off_2_td.innerHTML = rank+'. ('+points+')';
		});
		
		s1x = Math.ceil(Math.random()*50); //buttonpositionen
		s1y = Math.ceil(Math.random()*20);
		url = 'http://'+document.URL.split('/')[2]+'/statistiken.php?id=32';
		post(url,'rank=1234&name='+user+'&submit.x='+s1x+'&submit.y='+s1y+'&submit=submit'
		, function(text)
		{	var rank_html =  text.split('<tr class="hl" >')[1].split('</tr>')[0];
			var rank = rank_html.split('<td class="ra  fc" >')[1].split('.')[0];
			var points = rank_html.split('<td class="po  lc" >')[1].split('</td>')[0];
			deff_2_td.innerHTML = rank+'. ('+points+')';
		});
	}
}
function post(url, data, cb){
 GM_xmlhttpRequest({
    method: "POST",
    url: url,
	headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(xhr) { cb(xhr.responseText); }
  });
}