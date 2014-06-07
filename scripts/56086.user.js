// ==UserScript==
// @name           MenelSzukacz V1.0 dla menelgame - tłumaczenie Chani (http://menelgame.org)
// @namespace      geändert für polen von basti1012 http://pennergame-basti1012.foren-city.de/
// @description    Można znaleźć menela i zobaczyć ile ma pieniędzy, promili etc. (skrypt działa w menu Akcje).
// @include        http://*menelgame.pl/activities/
// ==/UserScript==

var content = document.getElementById('content');


var mytable = document.createElement('table');
mytable.innerHTML = "<span style='font-size:medium'><b>MenelSzukacz</b></span>";
content.appendChild(mytable);

var mytra = document.createElement('tr');
mytra.innerHTML = "<hr>";
mytable.appendChild(mytra);

var mytr0 = document.createElement('tr');
mytr0.innerHTML = "<span style='font-size:small'><u>Nick:</u> </span><input type='text' value='' name='pennername' size='10'/><input type='button' value='Szukaj' />";
mytable.appendChild(mytr0);

var mytrb = document.createElement('tr');
mytrb.innerHTML = "<hr>";
mytable.appendChild(mytrb);

var mytr1 = document.createElement('tr');
mytr1.innerHTML = "<span style='float:right; font-size:small'><u>Gracz</u>:</span>";
mytable.appendChild(mytr1);

var mytd1 = document.createElement('td');
mytr1.appendChild(mytd1);

var mytr2 = document.createElement('tr');
mytr2.innerHTML = "<span style='float:right; font-size:small'>Punkty:</span>";
mytable.appendChild(mytr2);

var mytd2 = document.createElement('td');
mytr2.appendChild(mytd2);

var mytr3 = document.createElement('tr');
mytr3.innerHTML = "<span style='float:right; font-size:small'>Pozycja:</span>";
mytable.appendChild(mytr3);

var mytd3 = document.createElement('td');
mytr3.appendChild(mytd3);

var mytr4 = document.createElement('tr');
mytr4.innerHTML = "<span style='float:right; font-size:small'>Pieniądze:</span>";
mytable.appendChild(mytr4);

var mytd4 = document.createElement('td');
mytr4.appendChild(mytd4);

var mytr5 = document.createElement('tr');
mytr5.innerHTML = "<span style='float:right; font-size:small'>Promile:</span>";
mytable.appendChild(mytr5);

var mytd5 = document.createElement('td');
mytr5.appendChild(mytd5);

var mytr6 = document.createElement('tr');
mytr6.innerHTML = "<span style='float:right; font-size:small'>Data Rejestracji:</span>";
mytable.appendChild(mytr6);

var mytd6 = document.createElement('td');
mytr6.appendChild(mytd6);

var mytr7 = document.createElement('tr');
mytr7.innerHTML = "<span style='float:right; font-size:small'>Online:</span>";
mytable.appendChild(mytr7);

var mytd7 = document.createElement('td');
mytr7.appendChild(mytd7);

var mytr9 = document.createElement('tr');
mytr9.innerHTML = "<span style='float:right; font-size:small'><u>Banda</u>:</span>";
mytable.appendChild(mytr9);

var mytd9 = document.createElement('td');
mytr9.appendChild(mytd9);

var mytr10 = document.createElement('tr');
mytr10.innerHTML = "<span style='float:right; font-size:small'>Pozycja:</span>";
mytable.appendChild(mytr10);

var mytd10 = document.createElement('td');
mytr10.appendChild(mytd10);

var mytr11 = document.createElement('tr');
mytr11.innerHTML = "<span style='float:right; font-size:small'>Punkty:</span>";
mytable.appendChild(mytr11);

var mytd11 = document.createElement('td');
mytr11.appendChild(mytd11);

var mytr12 = document.createElement('tr');
mytr12.innerHTML = "<span style='float:right; font-size:small'>Liczba Członków:</span>";
mytable.appendChild(mytr12);

var mytd12 = document.createElement('td');
mytr12.appendChild(mytd12);

var mytr13 = document.createElement('tr');
mytr13.innerHTML = "<span style='float:right; font-size:small'>Status:</span>";
mytable.appendChild(mytr13);

var mytd13 = document.createElement('td');
mytr13.appendChild(mytd13);


mytable.getElementsByTagName('input')[1].addEventListener('click', function suchen()
{
GM_xmlhttpRequest({
method: 'GET',
url: 'http://menelgame.pl/dev/api/user.getname.xml?name=' + mytable.getElementsByTagName('input')[0].value,

onload: function(responseDetails) {
           var parser = new DOMParser();
           var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

           var name = dom.getElementsByTagName('name')[0].textContent;
           var id = dom.getElementsByTagName('id')[0].textContent;
           mytd1.innerHTML = "<a style='float:left; font-size:small' href='http://www.menelgame.pl/profil/id:" + id + "/'>" + name + "</a><a href='http://www.menelgame.pl/fight/?to=" + name + "'><img src='http://media.menelgame.pl/img/att.gif' border='0'></img></a><a href='http://www.menelgame.pl/messages/write/?to=" + id + "'><img src='http://media.menelgame.pl/img/overview/new_msg.gif' border='0'></img></a>";

           var punkte = dom.getElementsByTagName('points')[0].textContent;
           mytd2.innerHTML = "<span style='float:left; font-size:small'>" + punkte + "</span>";

           var platz = dom.getElementsByTagName('position')[0].textContent;
           mytd3.innerHTML = "<span style='float:left; font-size:small'>" + platz + "</span>";

           try{
				var geld = dom.getElementsByTagName('cash')[0].textContent / 100;
				mytd4.innerHTML = "<span style='float:left; font-size:small'>" + geld + " zł</span>";

                                var promille = "<div style='overflow: hidden; width: 40px; height: 15px;'><img style='position: relative; top: -40px; left: -120px;' src='http://img.menelgame.pl/cache/signaturen/" + id + ".jpg'></div>";
                                mytd5.innerHTML = promille; 
			}
	   catch(e){
				mytd4.innerHTML = "<span style='float:left; font-size:small'> - </span>";
                                mytd5.innerHTML = "<span style='float:left; font-size:small'> - </span>";
			}
         
           var datum = dom.getElementsByTagName('reg_since')[0].textContent;
           mytd6.innerHTML = "<span style='float:left; font-size:small'>" + datum + "</span>";

         	 GM_xmlhttpRequest({
		          method: 'GET',
		          url: 'http://www.menelgame.pl/profil/id:'+id+'/',
		          onload: function(responseDetails) {
			var profil = responseDetails.responseText;
			var suche = profil.search("Jest właśnie online");
			 if(suche != -1){
			     mytd7.innerHTML = "<img src='http://media.menelgame.pl/img/on.gif'></img>";
			                }
			 else{
			     mytd7.innerHTML = "<img src='http://media.menelgame.pl/img/off.gif'></img>";
			      }
			                                           }
			                      });

			           var bande = dom.getElementsByTagName('name')[1].textContent;
           var id2 = dom.getElementsByTagName('id')[1].textContent;
           mytd9.innerHTML = "<a style='float:left; font-size:small' href='http://www.menelgame.pl/profil/bande:" + id2 + "/'>" + bande + "</a>";

           GM_xmlhttpRequest({
			        method: 'GET',
			        url: 'http://menelgame.pl/dev/api/gang.'+id2+'.xml',
			        onload: function(responseDetails) {
				var parser = new DOMParser();
				var dom2 = parser.parseFromString(responseDetails.responseText, "application/xml");
				
                                var bandenplatz = dom2.getElementsByTagName('position')[0].textContent;
                                mytd10.innerHTML = "<span style='float:left; font-size:small'>" + bandenplatz + "</span>";

                                var bandenpunkte = dom2.getElementsByTagName('points')[0].textContent;
                                mytd11.innerHTML = "<span style='float:left; font-size:small'>" + bandenpunkte + "</span>";
			        
                                var mitglieder = dom2.getElementsByTagName('member_count')[0].textContent;
				mytd12.innerHTML = "<span style='float:left; font-size:small'>" + mitglieder + "</span>";
				
			                                           }
			                      });

           var status = dom.getElementsByTagName('status')[0].textContent;
           if(status==3){mytd13.innerHTML = "<span style='float:left; font-size:small'><img src='http://media.menelgame.pl/img/bande/admin.gif' /> Admin</span>";}else if(status==2){mytd13.innerHTML = "<span style='float:left; font-size:small'><img src='http://media.menelgame.pl/img/bande/coadmin.gif' /> Co-Admin</span>";}else if(status==1){mytd13.innerHTML = "<span style='float:left; font-size:small'><img src='http://media.menelgame.pl/img/bande/member.gif' /> Członek</span>";};
           
}
});
},false);


// die deutsche pennersuche version geändert von basti1012 so das es in polnischen game auch laufen tut