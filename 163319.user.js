// ==UserScript==
// @name          LIBRUS CLEANER
// @description	  Cleans LIBRUS interface to get rid of spam
// @author	  Daniel Skowroński <d.skowronski@ds.lublin.pl>
// @version       3.0.1
// @match         https://dziennik.librus.pl/*
// @match         http://dziennik.librus.pl/*
//

// ==/UserScript==

function addjQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
function pasekGorny(){
  $('.modul:contains("Twitter")').remove();
  $('.modul:contains("Pomoc")').remove();
  $('.modul:contains("Informacje")').remove();
  $('.modul:contains("publikacje")').remove();
  $('.modul:contains("e-Nauczaniu")').remove();
  $('.modul:contains("chwili")').remove();
  $('.modul:contains("elektroniczne")').remove();
  $('.modul:contains("technicznej")').remove();
  $('.modul:contains("ustawienia")').remove();
  $('.modul:contains("numerek")').remove();
  $('.modul:contains("nowego")').css('width', '400px');
  $('[id="elearning"]').remove();
  $('[href="/smsinfo"]').remove();
  $('[href="/"]').attr('href', '/uczen_index');//główny link wylogowywał
  $('h1').remove();//zbędne tytuły
  $('.slide_button2').remove();//przycisk "poznaj nowego librusa" -> swoją drogą nowy layout napsuje ostro ten skrypt :(
  
  
//footer - kopyrajty
  $('.copyright ').css('text-align', 'right')
  $('.copyright').html("optimization by Daniel Skowronski &lt;<a href='mailto:d.skwosnki@ds.lublin.pl'>d.skowronski@ds.lublin.pl</a>&gt;, 2013   <b>|</b>  my homepage: <a href='http://www.ds.lublin.pl'>www.ds.lublin.pl&nbsp;<img src='http://www.ds.lublin.pl/logo/vsmall.png'></a>")
}


//optymalizacja pierwsza: od razu przerzucamy na stronę logowania
if (
     (document.URL == "https://dziennik.librus.pl/") 
  || (document.URL == "http://dziennik.librus.pl/") //wazne - może być bez ssl na startowej
)
{ window.location.replace("https://dziennik.librus.pl/loguj"); }


//optymalizacja druga: odśmiecamy stronę logowania
//jak wywali się przez remove kejstrołka to librus na wyśmiewa, ze js ni ma, dlatego tam jest zwykły display nołn
if (
     (document.URL == "https://dziennik.librus.pl/loguj")
  || (document.URL == "https://dziennik.librus.pl/blad_logowania/1") //błąd logowania także może wsytępować
)
{
  $('.carousel').remove();
  $('.sidebarContainter').attr('float', 'right');
  $('.btn300').remove();
  $('iframe').remove();//fb
  $('.sidebarContainerBody').remove();
  $('.formularz_logowania').attr('height', 60);
  $('[name="logowanieKeystroke"]').css('display','none');
  $('.snSubmenu').remove();
  $('[id="turnOffKeyStroke"]').css('display','none');
}

//alert(document.URL)//debugger

//optymalizacja trzecia: uczen_index
if (document.URL == "https://dziennik.librus.pl/uczen_index"){
 pasekGorny()

  var t ;

  t =  $('.modul_ocena:contains("ieobecno")').text();/*nieobecności -> pewność, ze żadna wielkość liter ani końcówki*/
  if (t.indexOf(": 0") == -1 /*są jakieś zdarzenia*/){
    $('.modul_ocena:contains("ieobecno")').css('font-size', '15pt')
    $('.modul_ocena:contains("ieobecno")').css('color', 'red')
    $('.modul_naglowek_tekst:contains("nowego")').removeClass("modul_zielony").addClass("modul_niebieski");
  }

  t =  $('.modul_ocena:contains("cen")').text();/*oceny - j.w.*/
  if (t.indexOf(": 0") == -1 /*są jakieś zdarzenia*/){
    $('.modul_ocena:contains("cen")').css('font-size', '15pt')
    $('.modul_ocena:contains("cen")').css('color', 'red')
    $('.modul_naglowek_tekst:contains("nowego")').removeClass("modul_zielony").addClass("modul_niebieski");
  }

  t =  $('.modul_ocena:contains("iadomo")').text();/*wiadomości - j.w.*/
  if (t.indexOf(": 0") == -1 /*są jakieś zdarzenia*/){
    $('.modul_ocena:contains("iadomo")').css('font-size', '15pt')
    $('.modul_ocena:contains("iadomo")').css('color', 'red')
    $('.modul_naglowek_tekst:contains("nowego")').removeClass("modul_zielony").addClass("modul_niebieski");
  }

  t =  $('.modul_ocena:contains("osze")').text();/*ogłoszenia - j.w.*/
  if (t.indexOf(": 0") == -1 /*są jakieś zdarzenia*/){
    $('.modul_ocena:contains("osze")').css('font-size', '15pt')
    $('.modul_ocena:contains("osze")').css('color', 'red')
    $('.modul_naglowek_tekst:contains("nowego")').removeClass("modul_zielony").addClass("modul_niebieski");
  }

}
if (document.URL == "https://dziennik.librus.pl/przegladaj_oceny/uczen"){
//wywalanie zbędnych przedmiotów - konfig działa w 100% tylko dla 2H Zamoy Lublin
//krótka instrukcja: wiersz1 i  wiersz2 to naprzemienne szare i białe kolory wierszy, żeby było czytelnie
//trzeba wstawić swoje przedmioty i kolorki
//nie kasujemy całości, bo by się czytelność napsuła - to jedno firmie Librus się udało
 pasekGorny()
  $('tr.wiersz1:contains("SKS") img').remove()
  $('tr.wiersz1:contains("SKS")').css('font-size', '1pt')

  $('tr.wiersz1:contains("Chór") img').remove()
  $('tr.wiersz1:contains("Chór")').css('font-size', '1pt')

  $('tr.wiersz2:contains("Czytelnia") img').remove()
  $('tr.wiersz2:contains("Czytelnia")').css('font-size', '1pt')

  $('tr.wiersz2:contains("niemiecki") img').remove()/*ruski też 2*/
  $('tr.wiersz2:contains("niemiecki")').css('font-size', '1pt')/*ruski też 2*/


//jesteśmy wredni i przeciążamy ich serwery - autopobieranie wykresu ocen
  $('[src="/images/pobierz_wykres_ocen.jpg"]').click()
}


if (document.URL == "https://dziennik.librus.pl/przegladaj_nb/uczen"){
 pasekGorny()
//ukrywanie ukrywania nieob z przedm pozalekcyjnych
  $('div.hidden:contains("ukryj")').remove()
//jesteśmy wredni i przeciążamy ich serwery - autopobieranie wykresu absencji
  $('[src="/images/pobierz_wykres_absencji.jpg"]').click()
}

if (document.URL == "https://dziennik.librus.pl/wiadomosci"){
 pasekGorny()
//wywalanie nowego systemu wiad
  $('[src="/images/wiadomosci/nowe_wiadomosci.png"]').remove()
//sciesnianie kolumny "usuń" - marnuje ponad 100px
  $('td [style="width: 154px;"]').css('width', '50px');
}

if (document.URL == "https://dziennik.librus.pl/zrealizowane_lekcje"){
 pasekGorny()
//poprawienie merytoryczności komunikatu (if any)
  $('p.TekstKomunikatu2:contains("Ten widok został wyłączony przez administratora szkoły.")').text("Nauczyciele nie wpisują tematów, a administracja, żeby ukryć ten fakt postanowiła wyłączyć ten widok.")
}

if (document.URL == "https://dziennik.librus.pl/terminarz"){
 pasekGorny()
//usuwamy sobotę i niedzielę (tak, wiem, ze jakiś nauczyciel może dodać sprawdzian w niedzielę ;)
  $('.kalendarz td:nth-child(6)').remove();//sb
  $('.kalendarz td:nth-child(6)').remove();//nd jest teraz 6!
  $('.kalendarz td.dzien').css('width', '210px');//okna na dni
  $('.kalendarz :contains(":")').css('width', '210px');//same wpisy
  $('td').filter(function() {//wywal info, że n-la nie ma bo co mnie to obchodzi. faktycznie podwaja a nawet bardziej zawala liste
    var match = 'rgb(255, 120, 120)';
    return ( $(this).css('background-color') == match );
  }).remove()

 }
}
addjQuery(main);
