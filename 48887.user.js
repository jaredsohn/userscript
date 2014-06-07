// ==UserScript==
// @name           Spendenzeiger V 1.7
// @namespace      11235813[Bande:Kuestenpenner]
// @description    Zeigt aktuelle Spendenanzahl im Status.
// @include        http://*pennergame.de/*
// @exclude 	   http://newboard.pennergame.de/*
// ==/UserScript==

GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('Du hast heute')[1];
			var userid1 = document.getElementsByTagName('html')[0].innerHTML.split("http://img.pennergame.de/cache/de_DE/avatare/");
			var userid2 = userid1[1].split('_');
			var userid=userid2[0];
			var text2 = text1.split(' Spenden')[0];
			var table = document.getElementsByTagName('ul')[0];
			var li = table.getElementsByTagName('li')[0];
			if (text2 < 50) {		

			li.innerHTML = '<img class="avatar" alt="Avatar" title="1" src="http://img.pennergame.de/cache/de_DE/avatare/'+userid+'_small.jpg" ><br><br><br><br><span style="color:green">Spenden:<br>'+text2+' / 50</span>'
			} else {
							li.innerHTML = '<img class="avatar" alt="Avatar" title="1" src="http://img.pennergame.de/cache/de_DE/avatare/'+userid+'_small.jpg" ><br><br><br><br><span style="color:red">Spenden:<br>'+text2+' / 50</span>'
			}
			
			
			

			
		}
					  });

//Fixed