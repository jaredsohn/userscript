// ==UserScript==
// @name           Profil bandy DeluXe
// @description    Pokazuje pieniądze, datę rejestracji, promile, zwierzaka i płeć w profilu bandy
// @author         basti1012 & mikskape & plk, poprawki Krzychu
// @version        2.3
// @include        http://*.menelgame.pl/profil/bande:*
// ==/UserScript==
// ten skrypt jest przerobionym skryptem basti1012 (niby) Banden profil delux


var s_wersja = '2.3';
var s_info = 'http://userscripts.org/scripts/show/101301';
var s_url = 'http://userscripts.org/scripts/source/101301.user.js';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "Profil bandy DeluXe". \nProszę potwierdzić instalację.')
		window.location.href=s_url;
		}
	}
	});


var url = document.location.href;

var link = 'http://' + window.location.host
var sig = 'http://inodes.pennergame.de/pl_PL/signaturen/';


var table = document.getElementsByTagName("table")[2];
table.setAttribute('cellpadding', '1px');
var tr = table.getElementsByTagName("tr");
for (var x = 0; x < tr.length; x++) {
  if (x%2 == 0){
	  tr[x].setAttribute('style', 'background:#222222;');
	}
	var text1 = tr[x].getElementsByTagName("td")[1].innerHTML.split('/profil/id:');
	var id = text1[1].split('/"');


	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'reg'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:100px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'geld'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:100px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'promille'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:60px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'tier'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:center;width:150px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'onlinestatus'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:center;width:14px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'schlecht'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:center;width:14px;');


	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'angreifen'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:20px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'nachricht'+x);	
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:20px;');


 	Geldladen(id[0],x);
}

GM_xmlhttpRequest({
  method: 'GET',
 	url: ''+link+'/pennerbar.xml',
  onload: function(responseDetails) {
  	var parser = new DOMParser();
  	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
  	var id = dom.getElementsByTagName('uid')[0].getAttribute('value');


GM_xmlhttpRequest({
  method: 'GET',
 url: ''+link+'/dev/api/user.'+id+'.xml',
  		onload: function(responseDetails) {
  		var parser = new DOMParser();
  			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
  			var pts = parseInt(dom.getElementsByTagName('points')[0].textContent);
			var minPts = parseInt(pts - pts * 0.2);
			var maxPts = parseInt(pts + pts * 0.5);
			for (var x = 0; x < tr.length; x++) {
			var profilid = document.getElementById('angreifen'+x).getAttribute('profilid');
			var points = parseInt(document.getElementById('angreifen'+x).getAttribute('points'));
			var username = document.getElementById('angreifen'+x).getAttribute('username')
					if ((minPts <= points) && (points <= maxPts) && (parseInt(points - points * 0.2) > pts)) {
 					  document.getElementById('angreifen'+x).innerHTML = '<a href=\"'+link+'/fight/?to='+username+'\">'+
																														   "<img height=\"18px\" src=\""+getPic("blue")+"\""+
																															 " title=\"Ten menel jest w Twoim zasięgu punktowym i możesz go zaatakowac. Ty jesteś poza jego zasięgiem punktowym więc on nie może Cię zaatakowac.\"></a>";
					}else if ((minPts <= points) && (points <= maxPts) && (pts > points)) {
 					  document.getElementById('angreifen'+x).innerHTML = '<a href=\"'+link+'/fight/?to='+username+'\">'+
																														 	 "<img height=\"18px\" src=\""+getPic("green1")+"\""+
																															 " title=\"Można zaatakować tego menela - jest w Twoim zasięgu punktowym i ma mniej punktów od Ciebie.\"></a>";
					}else if ((minPts <= points) && (points <= maxPts) && (pts < points)) {
 					  document.getElementById('angreifen'+x).innerHTML = '<a href=\"'+link+'/fight/?to='+username+'\">'+
																														 	 "<img height=\"18px\" src=\""+getPic("green2")+"\""+
																															 " title=\"Tego menela można zaatakować - jest w Twoim zasięgu punktowym ale ma więcej punktów niż Ty.\"></a>";
					}else if (points == pts){
					  document.getElementById('angreifen'+x).innerHTML = "<img height=\"18px\" src=\""+getPic("red")+"\""+
																														 	 " title=\"Nie możesz zaatakować tego menela ani on Ciebie.\">";
					}else if ((parseInt(points - points * 0.2) <= pts) && (pts <= parseInt(points + points * 0.5))){
					  document.getElementById('angreifen'+x).innerHTML = "<img height=\"18px\" src=\""+getPic("yellow")+"\""+
																														 	 " title=\"Ten menel jest poza Twoim zasięgiem więc nie możesz go zaatakować ale on Ciebie tak ponieważ Ty jesteś w jego zasięgu punktowym.\">";
					}else{
					  document.getElementById('angreifen'+x).innerHTML = "<img height=\"18px\" src=\""+getPic("red")+"\""+
																														 	 " title=\"Tego menela nie możesz zaatakować i ma ma mniej punktów od Ciebie.\">";
					}
        }
				var newtr = document.createElement('tr');
        var newtd = newtr.appendChild(document.createElement('td'));
        newtd.innerHTML = "&nbsp;";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:left;');
        newtd.innerHTML = "Nazwa menela";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:right;');
        newtd.innerHTML = "Punkty";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:right;');
        newtd.innerHTML = "Data rejest.";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:right;');
        newtd.innerHTML = "Kasa";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:right;');
        newtd.innerHTML = "Promile";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:center;');
        newtd.innerHTML = "Zwierzak";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.innerHTML = "&nbsp;";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.innerHTML = "&nbsp;";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.innerHTML = "&nbsp;";
        table.getElementsByTagName('tbody')[0].insertBefore(newtr, tr[0]);
  		}
		});
  	
  }
});

var newdiv = document.getElementsByTagName('table')[2];

function Geldladen(id,x) {
	GM_xmlhttpRequest({
    method: 'GET',
   	url: ''+link+'/dev/api/user.' + id + '.xml',
    onload: function(responseDetails) {
    	var parser = new DOMParser();
    	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var pts = dom.getElementsByTagName('points')[0].textContent;
			var username = dom.getElementsByTagName('name')[0].textContent;
				try{
				  cash = dom.getElementsByTagName('cash')[0].textContent;
    			document.getElementById('geld'+x).innerHTML = mach(cash)+ ' zł';
					document.getElementById('promille'+x).innerHTML = '<div style="float:right;overflow: hidden; width: 40px; height: 10px;"><img style="position: relative; top: -45px; left: -120px;" src="' + sig + id + '.jpg"></div>';
				}catch(err){
        	document.getElementById('geld'+x).innerHTML = '<span style="font-size:10px; color:#555555;">N/A</span>';
					document.getElementById('promille'+x).innerHTML = '<span style="font-size:10px; color:#555555;">N/A</span>';
				}

var reg = dom.getElementsByTagName('reg_since')[0].textContent;

				document.getElementById('reg'+x).innerHTML = reg;
				

				document.getElementById('angreifen'+x).setAttribute('profilid', id);
				document.getElementById('angreifen'+x).setAttribute('points', pts);
				document.getElementById('angreifen'+x).setAttribute('username', username)
				document.getElementById('nachricht'+x).innerHTML = "<a href=\"/messages/write/?to="+id+"\"><img style\"margin:5px;\" src=\"http://media.pennergame.de/img/overview/new_msg.gif\" title=\"Wyślij wiadomość do "+username+"\"></a>";
		}
	});



GM_xmlhttpRequest({
method: 'GET',
url: ''+link+'/profil/id:' + id + '/',
onload: function(responseDetails) {
			var content = responseDetails.responseText;


	try{
    var hausi5 = content.split('margin-top:12px;">')[1];
    var hausi3 = hausi5.split('</div>')[0];

    var hausi4 = hausi3.split('<img src="')[1];
    var hausi2 = hausi4.split('"')[0];

if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/94826.jpg'){var petname = 'Słoń';}
	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/00001.jpg'){var petname = 'Karaluch';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/68930.jpg'){var petname = 'Złota rybka';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/11836.jpg'){var petname = 'Mysz';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/73308.jpg'){var petname = 'Chomik';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/52483.jpg'){var petname = 'Papuga';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/31451.jpg'){var petname = 'Gołąb';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/73684.jpg'){var petname = 'Szczur';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/77310.jpg'){var petname = 'Zając';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/21903.jpg'){var petname = 'Fretka';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/73735.jpg'){var petname = 'Kot';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/89386.jpg'){var petname = 'Sokół';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/61402.jpg'){var petname = 'Wąż';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/62474.jpg'){var petname = 'Koza';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/12758.jpg'){var petname = 'Pudel';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/48263.jpg'){var petname = 'Orzeł';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/09051.jpg'){var petname = 'Owczarek niemiecki';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/15240.jpg'){var petname = 'Pit bull';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/62456.jpg'){var petname = 'Cocker spaniel';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/32563.jpg'){var petname = 'Chihuahua';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/90385.jpg'){var petname = 'Koń';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/98962.jpg'){var petname = 'Żyrafa';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/64220.jpg'){var petname = 'Hipopotam';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/73953.jpg'){var petname = 'Krokodyl';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/43703.jpg'){var petname = 'Tygrys';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/12536.jpg'){var petname = 'Małpa';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/25834.jpg'){var petname = 'Smok';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/14896.jpg'){var petname = 'Niedźwiedź';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/73933.jpg'){var petname = 'Tresowana mysz';}
	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/00001.jpg'){var petname = 'Karaluch';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/68930.jpg'){var petname = 'Złota rybka';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/11836.jpg'){var petname = 'Mysz';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/73308.jpg'){var petname = 'Chomik';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/52483.jpg'){var petname = 'Papuga';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/31451.jpg'){var petname = 'Gołąb';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/73684.jpg'){var petname = 'Szczur';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/77310.jpg'){var petname = 'Zając';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/21903.jpg'){var petname = 'Fretka';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/73735.jpg'){var petname = 'Kot';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/89386.jpg'){var petname = 'Sokół';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/61402.jpg'){var petname = 'Wąż';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/62474.jpg'){var petname = 'Koza';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/12758.jpg'){var petname = 'Pudel';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/48263.jpg'){var petname = 'Orzeł';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/09051.jpg'){var petname = 'Owczarek niemiecki';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/15240.jpg'){var petname = 'Pit bull';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/62456.jpg'){var petname = 'Cocker spaniel';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/32563.jpg'){var petname = 'Chihuahua';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/90385.jpg'){var petname = 'Koń';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/98962.jpg'){var petname = 'Żyrafa';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/64220.jpg'){var petname = 'Hipopotam';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/73953.jpg'){var petname = 'Krokodyl';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/43703.jpg'){var petname = 'Tygrys';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/12536.jpg'){var petname = 'Małpa';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/25834.jpg'){var petname = 'Smok';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/14896.jpg'){var petname = 'Niedźwiedź';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/wr_PL/tiere/73933.jpg'){var petname = 'Tresowana mysz';}
	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/kr_PL/tiere/00001.jpg'){var petname = 'Karaluch';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/68930.jpg'){var petname = 'Złota rybka';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/11836.jpg'){var petname = 'Mysz';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/73308.jpg'){var petname = 'Chomik';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/52483.jpg'){var petname = 'Papuga';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/31451.jpg'){var petname = 'Gołąb';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/73684.jpg'){var petname = 'Szczur';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/77310.jpg'){var petname = 'Zając';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/21903.jpg'){var petname = 'Fretka';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/73735.jpg'){var petname = 'Kot';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/89386.jpg'){var petname = 'Sokół';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/61402.jpg'){var petname = 'Wąż';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/62474.jpg'){var petname = 'Koza';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/12758.jpg'){var petname = 'Pudel';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/48263.jpg'){var petname = 'Orzeł';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/09051.jpg'){var petname = 'Owczarek niemiecki';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/15240.jpg'){var petname = 'Pit bull';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/62456.jpg'){var petname = 'Cocker spaniel';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/32563.jpg'){var petname = 'Chihuahua';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/90385.jpg'){var petname = 'Koń';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/98962.jpg'){var petname = 'Żyrafa';}
     	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/64220.jpg'){var petname = 'Hipopotam';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/73953.jpg'){var petname = 'Krokodyl';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/43703.jpg'){var petname = 'Tygrys';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/12536.jpg'){var petname = 'Małpa';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/25834.jpg'){var petname = 'Smok';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/14896.jpg'){var petname = 'Niedźwiedź';}
      	else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/73933.jpg'){var petname = 'Tresowana mysz';}

var suche = content.search("selbsterstelltes Haustier");
if (suche != -1) {


    var hausi55 = content.split('selbsterstelltes Haustier')[2];
    var hausi33 = hausi55.split('Haustier zu erstellen')[0];
    var hausi555 = hausi33.split('<b>')[1];
    var hausi33 = hausi555.split('</b>')[0];


}
}catch(e){
var petname = '<span style="font-size:9px;color:orange;font-Weight:bold;font-style:bold;"><b>[ukryty]</b></span>';}







var suche = content.search("scht oder vom Spiel verbannt");
		try{
		if (suche != -1) {
		  tr[x].setAttribute('style', 'background:red;');
		}}catch(e){
}





   



try {
if (content.match("http://static.pennergame.de/img/pv4/icons/male.jpg")) {
var geschlecht_image = '<img src="http://img59.imageshack.us/img59/6356/male.png">';
}else{
var geschlecht_image = '<img src="http://img39.imageshack.us/img39/8408/femaler.png">';
}} catch(err) {
var geschlecht_image = '<img src="">';
}		



			document.getElementById('tier'+x).innerHTML = petname;
			     
document.getElementById('schlecht'+x).innerHTML = geschlecht_image;
    


var suche = content.search("Jest właśnie online");
		try{
			if (suche != -1) {
				var online2a = "<img src='http://media.pennergame.de/img/on.gif'>";
				}
			else {
				var online2a = "<img src='http://media.pennergame.de/img/off.gif'>";
			};
		}catch(e){
}
          document.getElementById('onlinestatus'+x).innerHTML = online2a;


		}
	});
}

function mach(zahl) {
   var j=1;
   var res=zahl.substr((zahl.length-1),1);
   i=zahl.length;
	 if (i < 3){
	   while (i < 3) {
		   zahl = "0" + zahl;
			 i++;
		 }
	 }	  
   while (j <= zahl.length) {
      if (j%3 == 0) {
         res="."+res;
      }
			if (j==2) {
         res=","+res;
				 j++;
      }
			i--;
			res=zahl.substr((i-1),1)+res;
			j++;
			
   }
   return res;
}

function getPic(color){
  switch (color) {
	  case "red":
		  var icon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%16%08%06%00%00%00%C4%B4l%3B%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%03.IDATx%DA%E4%95%5DHSa%18%C7%FF%3B_s%EE%C35%E66%9B%81%9B%91A%CE9L2%FC%A0%0D%BD%B0%BA0%F2JM%22%B0%0F%08%23%02%09%BA%0C%F2%A2%08%8A%08buW%5DXd%04%81u%11%A5%11V%AE%3Cd%E9%D4Y%C3%DC%24%3D%E2%D9v%A6%E7%1C%F5t%E12%0D%CD%BC%F0%AA%E7%EE%7D%DE%E7%FD%BF%0F%BF%E7%FF%F2%AA%14E%C1f%04%81M%8AM%13%A6%96%2Fz%0A%DD'%14%05%DD%C5%2C%CB.%25%9B%9A%08%00%8B%BC%FC%FEU%B9%F5%14%BA%DD%00Jv%F7%B2%B7V%EDX%94%A4*%86a%02%DD%05%AEC)Q2u9%01%80%40S%93%EAO%D1nW~%0D%C30%01Q%92%AA%D6DQ%FA%A5%BF%16P%DA%1C99%8FF%BC%DE%AB%00%CC%002%00%98%00X%01%AC%10%0Ey%F7%5Dv%3A%1C%ED%80%D2%B6xv%0D%14%00%E0~%DFS%F7%B9%A4D%E5p%3A%CFr%93%13%3B%8D%5BL7I%92%1C%07%10N5%B20PV%CA%E8t%BA%3Bv%BB%BDaxx%F8~%C1%BB%9E%FA%7F%1A%9Emk%D6%D1%E8%D8%D8s%E3%16S%B58%3B%7Bsf%26i%01%20%03%40%7FY%A9E%A7%D7w%D8lY%0D%DF%BE~%7B%9A%DF%FD%B6~5%0D%D5%0A%1F%2F2T%01%20%25I%CA%15E%F1%A1F%93%B6%8B%9F%E6Y%05%A8%15%84%84%40Sd%9B%D9%9CY%16%0E%87%EFNqSG%F7%F4%F5%CD%AF%EB%8Ae%A1g%18%86b%18%E6bd%EC%FBq%8B%C5%EA%9B%F8%F1%E3%81%B2%A0%90%99%99VW_%DF%A7%7B%9E%C0%87%23%1B%F51%05%40%03%20%02%60%D2b%B1%9E%1E%18%E8%7Fb%C80%14%AA%D5%8C%8Be%7B%DB%3D%81%0F%0D%1B%7B%20%BF%7D%3A%01%BF%7F%0A%C0%24%C7M%A6%D14%5D%14%0A%85%A0%D5i%91%9Dmw%0EV%94%D97%FC%F2FG%86%CFE%C7FO%01%C0%D0P%D0J%10%AA%C7Z%AD%D6%CE%F3%FC%A5%E0%40%F0%14E%D1n%93%C9%F4%86-.%AA%00%80%E8%FE%EA%E6%EF%95%BE%F3%EB2%9E%91%24eV%10Z%92%3E%AF%D3j%B14%CBss%88D%22%C7%CB%83%83~%00x%E7r%C9%DBw%E4%DEv%3A%9C%AFB%3E%EFu!)%D4jh%FA%C6%DF%5D%91%0A%D6%ED%AE%D1dd%B4%A7%EBuH%C6bgvt%BD%BE%BE%7C%7F%B0%BC%BC9%DD%A0%BF%96%8C'0%C3%F3%87%DC%2C%FBx%5D%14%91%AAJ5)%08%1E%91%E7%E5i%9E%8F%1A%0D%06%EE%CF%1A%A3A%CFM%F3%7CT%E4y%99%14%04O%A4%AAR%FDW%E1%D1%83%07%3C%09%8Ek%91I%A2%D1%98e3jHzo%3C%918)7%D4-%D5%C9G%EA%88x%22qRC%D2%7B%8DY6%A3L%12%8D%09%8Ek%19%3Dx%C0%B3%26c)%16%3FLi%D2.%D04%E5%DB%D6%F1%2C%09%20%1C%AC(%AF%99W%00%3AU3%BF%00%CC)JM%5E%E7K%0E%00%F8%3D%C5%C7(%8Az!%C5%E2j%00%1FW%15%96E%B1Uk0%A8%CD%FA%F4%F1_%B9%BC%CE%AE%15(%D2%EE%DD_%C8%03%96rf%FB%D6q9%9E%BC%22%C4b%AD%EB%0E%EF%FF%FC%9A~%0E%00c%A9D%02p5s%19%00%00%00%00IEND%AEB%60%82";
		  break;
		case "yellow":
		  var icon = 						"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%16%08%06%00%00%00%C4%B4l%3B%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%02%F8IDATx%DA%E4%95MH%14a%18%C7%FF%FB%CE8%B3%D3%E4~L%B9S%8A%BA%99%A5%9B.%B6v%0A%AAC%E2%A1%DBF%1E%82D%A2C)%84%97%40%82%EEu(%3ADt%A9n%7D%80DE%10E%60%10A%B7%A8%0Ea%B9J92%EB%EC%AE%3B%96%BB%3B%3B%1F%EF%EEtH%25%DD%B5%F2%60%97%FE%F0%5E%9E%E7y%7F%3C%EF%FF%FD%F2%B8%AE%8B%8D%10%C1%06%E9%DF%80'%A6%C2g%26%26%C3%5D%BF%C6J%E8!%25%F4xJ%E8%F1%AC%05%99%98%0AwML%85%CF%AC%09%A6%D4%E9eY%E6%ED%A7%C9%A6%A3%8BP%06%00%BBXG%AA%C1%C7%13Mq%96e%DFR%EA%F4%AE%09%DE%D3%A6%F6%01%18%AD%AB%AB%7B%98%D4%3A%AE%02%D8%0A%C0%0F%40%02%20%03X%01V%B5%8E%CBr(%F4%C8%03wtq%EE%B2%3C%D5N%C5We%D7%7DY%96%8F%5B%B6%FDL%14%C5%1B%84%10%0D%C04%80y%06cTQ%DB9%AF%97%BF%5D%5B%EB%EBOi%DA%BDpS%E2%C4_m%5EP%92N%EA%FA%FC%0BQ%14%8F8%8Es%C3%B6%ED%10%00%07%00%14%B5-%24%08%DE%E7%C1%80%D4%3F%97N%3F%AD%06%AD%E8x%D1C%0F%00%86R%BA%93R%FA%80%E3%B8%0E%A3P%F8%E0%02%7D%A6e%15XBFk%7D%BE%03%99L%E6N!%97%3F%D9%B6%5B)%AD%07%1C%00P%0F%A0C%D7%F5%D3~%BF%FF%F0%C2%F7%85%F7%0Eu%18I%92%A233%CA%DD%D6%1D_%FA%D7%7B%8EY%00%02%80%24%809%BF%3FpVU%D5'%C2%26a%2FWS%13U%A6%A7%1F%FD%09Z%01f0%B6%D4~%86%C1%98%0E%60.%97%5B%F0%B2%2C%BB%2F%95J%81%F7%F2%90%B6H-3%C9H%C3%BAo%5E6%9D%3A7%AFg%87%00%40%D3feB%F0%D8%CB%F3%0D%86Q%B8%98T%93C%0Ca%BAj7%8Bo%A6%BE%B6%1C%02%80%AC%1E%1BN%A7%A3%E7%AB-%7B%85l%EA%B8%8Ei%8DXNg%8B%DF%E7%1F.%95)%F4%F9%B9%D3%9D%91%D9%9B%00%F09%D1%ECl%DB.%DF%92C%F2%ABd%AA%F3%9AeY%7D5%2Cs%BD%A2e%D7u%2B%C6d%A29%AE%A8%117%AD%EFu%15%B5%7Dxu%5EQ%DB%87%7F%E6%22%EEd%A29%5E%8DQaE%26%13%E5%89e%C6%A8a8y%C3%98%15%05!%BB%BAF%14%84l%DE0f%A9a8%C42c%99L%94%FF%AD%C7%E9o%DD13%97%1F)%132%20%06%03%01%8E%B0%FBM%B38h%DB%07%97%EBl%E7%201%CD%E2%20G%D8%FDb0%10(%132%60%E6%F2%23%E9o%DD%B15%3D%A6%86y%8C%E1%B8%0B%84e%0E%87%B6%BC7%00L%CF%24%23%F1%F2%2F5e%17(%B9%887%D6%7F%CC%02%40%A1%D0z%8A!%CCKj%98%3C%02xW%15%5C%A2%CE%25N%10x%9F%C0kK%B1%C6%FA%F1%15Vx%B9%D7%E5%C6z%2C%C7%7CRP%A3E%EB%8A%5D%2C%5E%FA%E3%23%F4%7F~M%3F%06%00%FD%9Eu%B5%C1%95%96%CB%00%00%00%00IEND%AEB%60%82";
			break;
		case "blue":
		  var icon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%16%08%06%00%00%01%B3%B3%5C%AD%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%03%EEIDATx%DAb%FC%FF%FF%3F%03%0C01000%AC%5D%FB%E3%3F%03%03%03%03%0B%03%03%03%C3%89%C3%87%8E%AC%9Fq%FD%3E%00%00%00%FF%FFbDQ%B6y3%03Sk%CB%B9%C3%0C%0C%0C%0CL%7B%96-%A9VST%B0g%60%60%60%00%00%00%00%FF%FFb%F8%FF%FF%3FC%5C%DC%CA%3F%9B6%FDg%FB%FF%FF%3F%83o%C0%AC%80%FF%FF%FFCLV%90%10%AF%BDu%F3%EA%ED%FE%FE%5B%FF-%8D%8D%E5%18%18%18%18P%0CF%06%00%00%00%00%FF%FF%C2*%C1%04cl%DE%CC%C0%CC%C0%C0%C0%E0%E55u%0D%E3%FF%FF%FF%19V%AC%FC%A6%F1%FC%D9%B3%3F%8F%1E%DE%AF%EF%9F%E0%1A%CB%C4%C0%C0%C0%10%11%CEuc%DB%B6-%89o%DF%BD%99%0Dw%5E%5D%FDi%AE%FF%FF%FF3%14%17%EC%93%AFk%BBh%88%D5%22%00%00%00%00%FF%FF%C2%E9%2Cl%80%09%99%B3h%E1%DB%FF%EB%D6%FD%F6%D9%BC%99A%94%81%81%81%A1%B1%E1%D4%E2%D4%E4%F5K1L%DE%BC%99%81%8D%81%81%81%E7%E7%CF%9F%E2%9F%3F%7F%BC%B6c%FB%F6%F5%2BW%C5%07%A1%18%FD%FF%FF%7F8%CE%CD%DD%F5%3F7%7B%7B%1E%8C%DF%D8z%FE%7F%5C%D0%FC%00%18%1F%AE%B0%AE%EAX7%B2F%18n%9FxS3%3Ba%1D%F7%FF%FF%FF%19%00%22%DF%83D)%F6%F2%9A%BA%C6%3FpN%E0%E6%CD%0C%CCP%CC%08S%90%98%B0%E6%0FFh%A4%A5lX%AE%AD%AB%C3%AF%A4%A4R%C7%C0%C0pa%C7%F6mL%96%96%96%3Fcb%05%19Q%14CMby%F5%EA%E5%F9%2F_%3E%FFy%F5%FA%8D%A7%AE%B6%F6%B3%95%CBW%B0%AC%DF%94%FA%17%9B%9B%C5%C4%C4%C4%F3%2F%5D%BA%F4%90%87%8B%F3YD%24%2F%23%B2B%B8b__%86%FF%97%2F%9C%09%D9%B7o%0F%B3%9C%9C%9C%DF%B9%B3g3%FB%FBn%3Cd%60%60%60h%AC8%5C%81%11)%B1A%F3%03%1A%5B%CF%FF%87%F1%F3%B2w%E4%E5%E5%EE%FA%8F%1C%E6L%0C%0C%0C%0C%F5%ED%97%0C%FF%7D%FA%D8%FF%E9%F5%7B%85%D5K%DE11000%B0%B10%86%0A%08%09r%E7G.%A9E19%3Ba%1Dw%FB%C4%9B%9A%D8b%109fI%8AA%80HRL%0A%60A%E6%84%86.Hg%F8%CFpb%F5%9A%84%8BH9%95%89%81%81%E1%3F%2C%84%B1%19%12%1A%BAP%9F%81%E1%BF%C5%EA%D5%093q%BA8%3E~%E52mm%9D%C87%AF%5E%F7%DB%DA%3Bt200%FC%83J%B1200%BC%F0%F5%85%F3%19J%8A%F7u%8BKH%94%5C%BBzy%F9%FC%05%E1Q%04%83b%E2%C4%7B%EC%8F%1E%3C%D8dmk%E3%F6%F9%F3%E7%C7LLL%19%02%02%82%C7%18%18%18%BEl%DF%BEUHB%5C%7C%85%B6%B6%8E%E3%FE%BD%7B%B7N%99%EE%EDC0%8C%A1%C9%94%91%81%81A%80%81%81A%8A%81%81A%FB%E2%C5%F3i%EA%EA%1AN%B7o%DE%BA%F0%F9%CB%17fCC%03%DD%8D%1B7%2C%5D%BA%2C%3A%86%E8%EC%07%0DC%16%06%06%86%2F%BE%BE%0CW%18%18%18n%B0%B2%B0%96%1C%3Ax%F0%E9%ED%3B%B7%0C%94%94%E4u%EF%DD%BBsQDD%B8%9C%E4T%91%9F%B3%B5%E2%D3%F7%1F%B9BB%C2k4%94%95%F3%BE%FF%FA%C1pp%FF%E1%B4%B5%EB%93f3000%04%05%CEMvt%B2%9F%C3%C1%C6%C1p%EB%EE%DDIo%DF%BE%0D%E1%E3%E4%982a%8AW%3B%DE%02C%94_%A0%9F%F9%DE%FD9%1F%EE%3F%C8%3Cq%E9%D2%F3%9F_%BE%C5%C0%0Ce%60%60%60X%B7%3Ey%EE%CF%CF_cN%5C%BC%F8%FC%DD%BD%07%99L%F7%EE%CD%11%E1%E7%EF%C3%1B%14%A5%F9%7BZ%3E%BD%7D%F7%E3%BF%82%FC%81%B9k%12%D8%E6N%F3%96z%F4%E2%C5%8E%A5%8B%DE%C1%D5-%5D%F4%8E%E9%E1%8B%17%3B%E6N%F3%96%9A%BB%26%9E%ED%BF%82%FC%81Oo%DF%FD(%CD%DF%D3B%97%0C%C2%C4%40%23%00%18%005N%0C%224Od%F7%00%00%00%00IEND%AEB%60%82";
			break;
		case "green1":
		  var icon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%16%08%06%00%00%01%B3%B3%5C%AD%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%06%07IDATx%DAbd%C8ae%60%60%60%E0d%60%60%F8%C3%C4%C0%C0%C0%B1%A0w%D67%06%06%86Nf%063f%06%1E%26%D6%14%25V%5E%13%00%00%00%00%FF%FFb%60%C8aeb%C8a%E5%F9%FF%FF%3F%03%13%0B3KTFx%C2m%C6%5C6%15%26%3F%03K%FBY%AB%17mb%60%60%F8%08%00%00%00%FF%FFbf%C8ae%8A%A8%0A%F9%7DO%F6%C9%C3%DFF%FF%EC%0C%A2%0D%9C%5E%A8%BC9%C3%C2%C0%C0%C0%F5%E3%D7%97m%F9qiSx%B8xy%0E%9E%3C%7C%94%E16%C36F%A8%FD%1C%0C%0C%0C2%0C%0C%0C%5C%0C%0C%0C%CF%19%18%18%DE%02%00%00%00%FF%FF%82I%B0200%B0100%FCe%60%60%F8%C5%02Ui%CC%CA%C2b%F2%FB%CF%9F7%8E%FAVQ%2C%0C%0C%0C%D2%EAJ%AAi%DF%BE%7Fg3T%D75%DEt%60%7B%23%13%03%03%03%F7%CD%7B%B7%BF%F30s%A8_%B8q%E9%06%03%03%83%103%83%19%F3_.N.%D9%E7%EF%5E%FE%60ce%FFn%A4gt%97%91!%87%95%89%81%81A%88%81%81A%8A%81%81%E1%2B%03%03%C3S%00%CDs%AC%92%40%1C%00%60%FC%3B%FF*%1DQ%20D%8B%D0%F9%02%0EB%1C%06%BD%81k%82%14n!%04%82%8B%824%FA%02.%D2%20%0E%0E%0D%D1%1C%04%0D-%85K.N%0E%92x%9E%9C%8A%9C%A6%E7)y%FF%C1A%FD%5E%E0%E3%A7%90%0D(%80%B2%BF%9F%00%A7%C01%BB%5C%60%01%2C%81%7F%81.%02%40%08%88%3E%95%CA%ED%8D%94%9A%E3.c%AB%F5*v%9B%B8y%BC8%0F'%3Bf%B7%05%AC%05%BAP%01M%3DR%AF%BF%9B%8D%91%E7y%BEB%26w%E7%CE%16go_%1F%9F%1D%B3k%01~%C0%16%E8B%00%AA%942%94N%A4J%8E3%9FW_%EB%EF%C6x%F0%5B%7C%C8g%26%965%B4%9D%BF%26%D0%3B%40%82%D9%D4%7D%B9%F2R%7B%06%22%7B%18%C0%F4%EA2%CE%C00~%CC%C9%B0%BF%A5%93%EEA%DA%8C%A20%8E%FF%EF%BD1%89%F5%A3%A1%19%82%1F%A0Q1T%91%24%05C%8A%18%FC%16%B5H%D0%C5%3A%89S%BAI%E9%16%9C%8A%90%C9%60%85R%E3Ph)%B5%D0%A2%83h%11%DC%04%05Apqh%05)%85b%F2%A2%C1%0A%D5%C4%F8%BE%5Dn%06%07%B7%B3%1C%CE%E1%F7%3CE%5E%01H%7DN%E9%D9%D4%DC%05%C0%B4%16%F3VQ%C3%A6%8B%F2P%8B%D8%81%1B%E0Bk%5C%15K%A4z%02%1D_C%8F%9FL9%EC%F6%60%89%CD%16%11Bt%01%1D%40%E0%F9%C0%D8%B9%A6T%8A%90*%3D9%FD%BD%DB%DE%12%88%F7Ez%C7r7%F9%07%C6%99Q)%85%F4%BC%7D%9D%9CO%2C''%B4%F3%3F%098%95TU%9B%7B%DB%9B%8F%5Cnw_%B8%AB%BB%BC%AC%C2%F9nn!%F6bv%26%054%02%1E%C0%A9%08)%97%10%A2%A1%DAS%15%CC%FE%CD%5Ef%8D3W%B4%7F%24%F2*%11Oi%11%01%A4%81%8C%040M%D3j%F56%FB%8CLF%F8%5B%DB%EA%BEm%AC%ED%C4c%2F'%01%86%9Fv%87%F5%12%8A%90r%00%15%0ES%FAFG%A2%E3%89%D4%7C%CA%B887%0A%B9%825%DC9%18%5D%D9Z%5D%02~%00i%09%5C%0D%F5%0C%B9%9B%2B%DD%83%EF%BF%7Cx%23%A5%BC%05%AC%86%9AZ%EF%C7%F5%CF%89g%FE%B0_%BFqm%03%F2%BF%8E%7F%EEW%7B%EB%A7%D3G%19t%25K%3F%7D_%3D%00%FE%D44%F9%3C%1C%EE%19%40%EE%BEPJtrwB%F9OE%B5%F44%11%85%D133%9Dv%A6%0E%8F%16%9A%06D%03A%A3%5D4%05%13y%0B%12m%08%E0B%DC%18%E3%D2%05%1B%A2%EC%5C%9A%F0%2F%88%2B0%C1%98%F8%22D%82D1%3C%A2%14%D3Z%B1%D2%8A%88%98*%02%A5%14%A6%EF%99%CE%AD%9B%3Bq%B8%C9%CD%97%9B%7B%EF%F7%3A%E7%7C%3A%DCz%D5%3A%EC%9C%01z%9EZ%8E%DE%17)%0D4%8A%B2N%09%8DR%A4h%A4%06%03%80%EBo%F5%0E%CA%A9dp%F1%CB%F2%26%00%09%80%C4%F3%BCD4%22%16Q4%13B%18%FAY%A1%99%A5%00%A4%9B%5D%17N%DBJ%CB%DD3%BE%B9Q%3D%18%83!%5E%CF%CE%02%40%1A%E8%EC%7D%E8%F14%F4%ADE%C2%AF%3EF%82%0B%8A%AA%94%10B%AC%26%CE%24l%EF%FE%CDjD%D3%A8%E3%CC%F5%EE%FE%EEF%B7%C7%1B%08%FA%DFN.%BC%BE%0B%20AU%9Bg0%C4%5B%A8%D32%00%0E%00%D5%A2%20%D6%0Et%F5%0D%F7%F4%F4%D6%EF%C6vSSo%A6%97B%EB_wR%E9TA%B0%08%96%9B%BD7%AEt%B4tTON%BD%DCz1%3F%FD%08%C06%80%DF%D4%EE%01%90%19%0C%F1VZ%B6%83c%B9%1A0%A8%B5%97%DB%CF%3A%2B%1D'%EBN%D59%9C%B6JW%7Bs%5Bu%20%10%88grY%A6%BD%A5%D5%3E61%BE1%1F%FC0G%B1)%008%00%10%05%B0E%03%EC%9B%8C%60iD%B3%08%16A%92%932%1B%8B%C7d%96a%F9%F0zxY%C9%E6%7BTE%A9hj%BA%88%CF%A1%60%7Cus%CD%87%FFK%9F%9C%22%B5f%00%26%93A%EC*%80%5CWcs%7B%A9T~5%9D%CFny%2F%5Dv%E7%94%1C%C6%9EL%2CD%A2%1B%91%C7%B3%CFq%AE%A6%FE%FC%FD%C1%E1%DB%82Y%C0%EC%E2%BB%90%D5%2C%D6%1D%24b%2Bs%FE%F7%DF%01%E4h%FF5%0EM%1Ck%88%CE%EC%EC%EF%FD%B2g%95%8AJ%C9%D6%16%3D%3A%CC%7C%0A%05%96%FC%91%D5u%FDA%5CN%EC%AB%F9%FCQ%22%99qZ%D3J%D5%F6%8F%88%CF%F7%F3%DB%B3%82%A6E%A9%3A%12%00%D2%C7Xq%E7%DA%AD%11%2B%83%7B%BE%8D%F0%F0J8%F8%07%80%A3L*%ADJfR%2C!%84%07%C0%B2%2C%5B%94%C4%13%AC%9CN%C6%01%1Cz%CE%B8%9C%9D%AE%86%07G%AA%3A%3A%3E%F3tD%9F%E1%C7xl%A0%9D%95N%AA%12jE%DA%3B%D6%C0%E3%0C%DDI%EA%2C%0B%20%AF%8B%C5D%95%04%83zT%FA%E8%90%062*O_F%E5%15%0Cg%A2%FB%FB7%00%FEB4%F24%7B%C6%BC%00%00%00%00IEND%AEB%60%82";
			break;
		case "green2":
		  var icon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%16%08%06%00%00%01%B3%B3%5C%AD%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%06%07IDATx%DAb%CCa%60%60%60%60%60%E0d%60%60%F8%C3%C4%C0%C0%C0a%F2s%FE7%06%06%86Nf3%06%06%86g%1A%EC)%AFl%F9M%00%00%00%00%FF%FFb%C8a%60%60%CAa%60%E0%F9%FF%FF%3F%03%13%23%1BK%14%EF%A6%94%DB%B9%8C%8C*L%BFZl%ED%BF%04%CE%DB%C4%C0%C0%F0%11%00%00%00%FF%FFb%CEa%60%60R%DA%10%F6%DBe%C7%FD%87%26%3F~%DB%C9%E5%1A89%9Dzq%86%85%81%81%81K%FA%FA%E7m%7C%BB%B3%A7%B0%08%F1%F2p%CD%3Cx%F4%1B%03%C36F%A8%FD%1C%0C%0C%0C2%0C%0C%0C%5C%0C%0C%0C%CF%19%18%18%DE%02%00%00%00%FF%FF%82I%B0200%B0100%FCe%60%60%F8%C5%02Ui%CC%C4%CEj%F2%EF%E7%EF7%B7%A6%DAG%B1000H%F3%D8%AA%A7%FD%FC%FC%8D%EDw%A2%BE%B1Z%F6%96F%26%06%06%06%EE%2F%87o~%BFo%C4%A5%FEg%CD%C5%1B%0C%0C%0CB%CCf%0C%0C%7F%19%85%B8d%F9%8E%BD%F8%C1%C2%C9%FE%9D5%D2%E4.c%0E%03%03%13%03%03%83%10%03%03%83%14%03%03%C3W%06%06%86%A7%001%E60002%400%1B%03%03%03%2F%03%03%03%1F%03%03%037%C4Q%0C_%19%18%18%3E100%7Ca%60%60%F8%C9l%06q%A6%20%03%03%83%AE%D6%BB)%D7%99%BE%FE%96%FF%FB%FA%B3%E1%9F%0F%DF%0C9%E6FT%7Dp%95%0De%DB~%E7%22%03%03%C3wf3H%60%CB3%F3q%DA%7C%9C%7F%F4%C5%DF%1F%BF%99d%F7%15G_%E7%FD%22%C2%5E%B0m%1F%DB%F6%3B%CF%18%18%18X%18%18%18%DE2%9B100300p%FE%FF%F9G%F0%FB%C6%D8%A6_o%3E~%7C%176g%3B%F7%FEGwy%AEV%A6%7D%7C%F0%FC9%EB%ED%F7g%18%18%18%1E%C0%3C%C2%C6%B1%3B%A3%FF%87%EB%8C%25%0C%0C%0C%0AP%8F1000%BC%E3H%B5f%F8v%FE%FEi%A63%CF%1E%01%B8%A4%7B%90%B6%A20%8C%E3%FFs%EE5%1F*z!%EAU%2B%D6%8FA%A1%F5%1BBQ%91(B%17%91b)%16%D1R%3A%D8B)tJ%A9%22.J%8B%83%83-%053%B8%B8%95%E2%20%82%E0%D2EpP%5C%A4%82%22%98)%125%D1b0%9A%DE%E4t%C8%89%83%FB%7Bx%DF%F3%7B%9E%1C%AF%20%FB%C8%24%BBI%02%19%CD%ED%00%99oJ)S%0F%9A%BA(%C5Z%C4%05%FC%03%FEj%8D%E4%07!%1C%09%18%07%8B%81_%91%CF%FE%D72%DF%DD%26%DDy%3DH%11%00%BA%80%D6%D8%EAp%5CS%1A%86%1F%BC%25k%E1-%F1%AA%7D%F2%C1%DB%FE!W%3C%95%7F%7B%7CV%A4Li%3F%8E%7D%9FO%B4%CC%BD%D4%CE%D7%12%F0%08%D3%A8(%FA%B8%B1%5E%60%FB%7C%AEO%7D%BD%AA%BC%D0%D3%1A%FB%F1n%CF%F7%3E%04%D4%036%E01%FC%60%09!%EA%BC%8D%95m%22%7Cqu%E4%C4-%7Bz%B0'%5C%15%0C%09u%F7%F9(p*%01T%3A%A3%D4%60cC%F4%FCTT%F45%3F%3C%9EY%D9%B4w%82%23%00%EE%A9%FE'%9A%11%13H%01%97%B1%3F%E1%93%B2%B9%E7%A3%89G_B%16%10%B1%2C%99%FE%3D%3ENoh%02%B8%04R%12H%BAf%07%7C%89%40%E9%D3%C4%8B%A5%05a%C84%A0%8C%CE%EAZ%F7%B3%E5%AF%CEtw%8B%3E%E3%C6%04R%C9%AD%C3%ED%9A%A6%9A7%D7%FBQT%B6%92%5E%C6~%EE*%88%14v4%D87l%9E%01%B7%B9%8A%DE%0F%25O'w%17%0A%E0%FC%A7%A2jB%A2%88%E2%F8o%3Evvf%1D%BFvQ%D3%22%AC%C0%AC%14%24P%C3%E8%20%25%99%07%83(%88%04!%3A%08a%25%F4q%2C%90%0EA%B7%0A%CC%02k%ADC%05a%14%1E%0A%3D%B8%89f%B5i%A4bjfi%8B%BAN%AB%EB%EE%CC%EE%CE%BC%99%0E%BE%D1i%E0%F1gxo%FE%EF%3F%BF%2F%9Bn%FB%AFm%DA9%07%F5.Z9%BAoQ%19%10%CA%B2-%09B%25b9%A5%C1%00%E0%E6%1F%1Fk%E2%7F%AF%8Dl%B9%DE%3F%03%40%06%20%B3%A2K%B6%0CS%82e%09%161%19%FAq%8AN%16%03%10_%BE%5C%BE%3DU%94%5DZ%D0%F4%AE%1D%80~%81a%08%D3%BC9%9D%1B%80%FC%B7%B3%FEaQeY%9D%D27%DE%ED%B9%1F%0C%98Z*%1D%C4%F40%02%2Fj%13!%CD2%08%A1%8DU%EB%CE%F1%EA%DC%DA%B2%9A%A9%F7%9F%7B%B3%CEu_%04%10%A1%AEM2%CD%EB%0D%DD%14%B3%1C%00%05l%A6TH%EE%D6%B7T%9C%AE%DB%B5%3A%B7%18%0B%DF%7C%D3%1F%7F%3B%BA%60(1%83%F8Dw%DA%BDS%87%F7%D6%1D*%18%E8%E8%9A%15%CE%BF~%02%20%04%60%9E%D6%25%00Q%1BG%11%40%06%C3s9%60%B0U%F0%CA%85n%FF%D8%A7%D0%A8%3A%BBz%20w%CF%EE%B6%B3%B5S%7DAEMhLYM%95%B7%E7%B6%7FZ%3D%D1%F1%40X%E7%C6G%A1%B4!J%D8%A9%B7A%96e%107%97.%CA%FAR%94M%FC%0CG%19%8Eu%25%07%C7%3F%0C%B0%C9%A31V%F7UT%96cfpD%C9%EE%F86%B4%C99%EC%E4%94h%15%00%F0%BC%C3%EC%3A%80D%EAj%D5%C1h%B1%F7H%D6%8C%3A%EBk%AC.MK%25%B0t%EDi%C0%F7%E2%FB%C4%0F%3C%C7%CA%C9%A2%E2%92%C0%95%06Q%101%ED%EF%1D%8D%EC%F4%EC%C8%F8%12%FE%C8%DD%0AL%D9%D3%02%20%5C%C5%FA%C4%1B%92%E3%BE.%FE%22%B2%EE%8B%EF%F3V-%84%23*%FF(%D8%CFw%0EO%DA%07%C4qe%99h%C9%D5IQ%CB%D3%24%3D_%E8%99%18%12%FDc%2F%91%24s%D4%1D%11%00%F1%FFU%D1%D5%D8%CAxpI%7D5%D6%22%B5%05%FF%00%C8%B1%B6e%E6%B3%0Bk%ACe%98.%00%2C%C3%B3%96%99%2B%B3L(%AA%00XI4%94%E4I%8D%FBoXJ%AA%1Dg%9E%B5%DA%19%EE%0C%7C%A7%EC%3C4%A9%D2i%95(v%AC%83%24%95%AE5%DAL%03%90%B4%CD%C2S'%C1%E1%1E%9D%1EZ%A1%179%9Dg%3FN%E7%19%8Ew%D3%EE%F7o%00_%DD%2Bz6%22z%D7%00%00%00%00IEND%AEB%60%82";
			break;
		case "off":
		  var icon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0C%00%00%00%0C%08%04%00%00%00%FC%7C%94l%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%03%1BiCCPPhotoshop%20ICC%20profile%00%00x%DAc%60%60%9E%E0%E8%E2%E4%CA%24%C0%C0PPTR%E4%1E%E4%18%19%11%19%A5%C0~%9E%81%8D%81%99%81%81%81%81%81!1%B9%B8%C01%20%C0%87%81%81%81!%2F%3F%2F%95%01%15020%7C%BB%C6%C0%C8%C0%C0%C0pY%D7%D1%C5%C9%95%814%C0%9A%5CPT%C2%C0%C0p%80%81%81%C1(%25%B58%99%81%81%E1%0B%03%03CzyIA%09%03%03c%0C%03%03%83HRvA%09%03%03c%01%03%03%83HvH%903%03%03c%0B%03%03%13OIjE%09%03%03%03%83s~AeQfzF%89%82%A1%A5%A5%A5%82cJ~R%AABpeqIjn%B1%82g%5Er~QA~QbIj%0A%03%03%03%D4%0E%06%06%06%06%5E%97%FC%12%05%F7%C4%CC%3C%05CSU%06*%83%88%C8(%05%08%0B%11%3E%081%04H.-*%83%07%25%03%83%00%83%16%83%1FC%25%C3*%86%07%8C%D2%8CQ%8C%F3%18%9F2%19250%5Db%D6%60nd%BE%CBb%C32%8F%95%995%9B%F5*%9B%13%DB%26v%15%F6%99%1C%02%1C%9D%9C%AC%9C%CD%5C%CC%5Cm%DC%DC%DC%13y%A4x%96%F2%1A%F3%1E%E2%0B%E6%7B%C6_-%20%24%B0Z%D0M%F0%91P%A3%B0%A2%F0a%91tQ%5E%D1%ADbq%E2%9C%E2%5B%25R%24%85%25%8FJUH%EBJ%3F%91%99%23%1B*'(wV%BEG%C1G%91W%F1%82%D2%14%E5(%15%25%95%D7%AA%5B%D5%1A%D5%FD4d5%DEj%EE%D3%9A%A8%9D%AAc%AD%2B%A4%FBJ%EF%88%FE%7C%83%1A%C3(%23KcI%E3%DF%26%F7L%0F%9B%AD0%EF%B7%A8%B0L%B4%F2%B1%B6%B0Q%B5%15%B1c%B1%FBj%FF%DC%E1%B6%E3%05%A7c%CE%7B%5D%B6%BA%AEw%5B%E9%BE%D4c%91%E7B%AF%05%DE%0B%7D%16%FB.%F3%5B%E5%BF%3E%60k%E0%DE%A0c%C1%E7Cn%85%3E%0B%FB%12%C1%14)%18%A5%14m%1C%E3%16%1B%15%97%17%DF%920%3Bqs%D2%D9%E4%E7%A9Lir%E96%19Q%99UY%B3%B2%F7%E4%DC%CBc%CAW%2F%F0)%2C.%9A%5D%7C%B8%E4m%99D%B9KEa%E5%BC%AA%B3%D5%7Fk%F5%EA%E2%EB'5%1Ck%FC%DDl%D0%92%DE%3A%AF%EDz%87%60%A7wW%7B%F7%E1%5E%86%3E%FB%FE%BA%09%FB%26%FE%9F%EC8%A5u%EA%89%E9%BC3%82g%CE%9A%F5h%8E%D6%DC%92y%FB%16p-%0C%5B%B4x%F1%C7%A5%0E%CB%26%2C%7F%B8%D2xU%EB%EA%9Bku%D75%AD%BF%B9%D1%60S%C7%E6%07%5B%AD%B6M%DD%FEa%A7%EF%AEU%7B8%F6%A6%EF%3B~%40%FD%60%E7%A1%D7G%FC%8En%3E.~%A2%F6%E4%93%D3%DEg%B6%9C%93%3D%DF~%E1%D3%A5%B8%CB%A7%AEZ%5C%5BvC%F4f%EB%AD%AFw%D2%EF%DE%BC%EF%F3%E0%C0%23%D3%C7%AB%9F*%3E%9B%F9B%F0e%D7k%E67uo%7F%BE%2F%FD%F0%E9S%C1%E7w_%F3%BE%BD%FB%91%FF%F3%C3%EF%E2%3F%DF%FEU%FD%FF%0F%00.%0C%1D%8B%A0%3C%091%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%00%DAIDATx%DAl%8F%C1J%02Q%18F%CF%0CC%20h%DB%5E%20D%10%D1%D5%85Y%F8%0C%B3K%F0!%EC%91%22%02%C1%95%A8%D8.H%B0%04%19%25%E8N%EE%EA%09Z%CC%BDw%B8%83%05%BF%8B%896u6%DF%E2%2C%0E_%20%FCOT%CD%40%C5IW%7D%7D%BF%ED7%B3%C9%16%00A%18%0D%B5%CEd'%2B%D9%89%D6%D7CA%40%B8RZg%92%CA%A3%CCe%25%A9dz%A0%84%10%E2%84%B6%A7%C0b18%7C%3BN%20%82%AE*qX%0C%E6'%DC%EAA%04%C7%A3%C3%91cp%00%04%94%1EB%D8%3E%19r%2C%16%8F%C5%90%B3%DF%40%08%E9%C2N%0D%16OY%A9%DB%97%7B%08a%F6%FAps%3E%ADS%E3%8C%1A%8D%BB%F5xy%80%A0z%9Et.%FB%17%CD%A2%F8%7C%FFx%5E%1E%E0W%FC%E54%00%8A%DBhqZ%1C%8B%AB%00%00%00%00IEND%AEB%60%82";
			break;
	}
  return icon;
}