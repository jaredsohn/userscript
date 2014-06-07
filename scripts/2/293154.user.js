// ==UserScript==
//
// @name            LIBRUS CLEANER 2014 ZAMOY
// @description     Cleans LIBRUS interface to get rid of spam and make experience better
// @author          Daniel Skowroński <daniel@dsinf.net>
// @version         1.5.0 rev 122
// @match           https://dziennik.librus.pl/*
// @match           http://dziennik.librus.pl/*
//
// ==/UserScript==



function addjQuery(callback) {  //ładowanie jQueryego dla wszystkich platform
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
var ZAMOY = true;//ZamoyEdition //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function setCookie(cname,cvalue,exdays){
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
} 
function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)
    {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
  return "";
} 
function selectZastClass(){ //ustawianie cookie z klasą do zastśpstw
  var pre_klasa = prompt("Podaj swoją klasę do pobierania zastępstw (w formacie '3h')","3h");
  if (pre_klasa==null){
    alert("Wpisałeś coś nie tak, spróbuj ponownie.");
    return;
  }
  var klasa = ""+pre_klasa+"";
  if (klasa.length==2){
    setCookie("__klasa_zast",klasa,365);
    location.reload();
  }
  else{
    alert("Wpisałeś coś nie tak, spróbuj ponownie.");
  }
 
}

function pasekGorny(){  //funkcja globalna odśmiecająca nie tylko pasek górny, ale zmieniająca stopkę i ogólne style
  //zmień menu główne
  $('a:contains("Lektury")').remove();
  if (ZAMOY){
    $('a:contains("Wyniki ")').attr('href', '/uczen_index'); $('a:contains("Wyniki ")').html('Strona główna - zastępstwa');
    $('a:contains("e-Materia")').attr('href', 'http://zamoy.pl'); $('a:contains("e-Materia")').html('Strona szkolna'); 
  }
  else{
    $('a:contains("Wyniki ")').attr('href', '/uczen_index'); $('a:contains("Wyniki ")').html('Strona główna e-Dziennika');
  }
  
  $('#icon-elearning').remove();
  $('#icon-podreczniki').remove();
  $('#icon-smsinfo').remove();
 
  $('[href="/"]').attr('href', '/uczen_index');//główny link wylogowywał

  //zmień baner - tylko Zamoy Edition
  if (ZAMOY)
    $('#top-banner').css('background','url("http://zamoy.pl/media/librus_zamoy2.png") no-repeat scroll center top rgb(193, 211, 136)');
 
  $('h3').remove();//zbędne tytuły
  
  //stopka
  var footerstrr = "<hr />ulepszony widok Librusa wprowadził &copy; Daniel Skowroński - <a href='http://dsinf.net'>dsinf.net</a>, "+
  "2013-2014<span id='bottom-logo'></span>";
  if (ZAMOY)
    footerstrr = footerstrr + "<br />winieta dla Zamoy'a &copy; Daniel Skowroński, 2013";
  $('#footer').html(footerstrr);
}


//od razu przerzucamy na stronę logowania
if (
     (document.URL == "https://dziennik.librus.pl/") 
  || (document.URL == "http://dziennik.librus.pl/") //wazne - może być bez ssl na startowej
)
{ window.location.replace("https://dziennik.librus.pl/loguj"); }


//odśmiecamy stronę logowania
//jak wywali się przez remove kejstrołka to librus na wyśmiewa, ze js ni ma, dlatego tam jest zwykły display nołn
if (
     (document.URL.indexOf("/loguj")>=0)
  || (document.URL.indexOf("/blad_logowania/1")>=0) //błąd logowania także może wsytępować
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
  
  $('.loginForm').html( $('.loginForm').html()+"<br />ulepszony widok Librusa wprowadził &copy; Daniel Skowroński - "+
    "<a style='color: blue;' href='http://dsinf.net'>dsinf.net</a>, 2013-2014" );
}


//strona główna z badziewnymi newsami - przejmowana przez zastępstwa - tylko Zamoy Edition
if (document.URL.indexOf("/uczen_index")>=0){
  pasekGorny()
  if (ZAMOY){
    $('#body').html("<div id='body'  class='center main-page'><h3>Zastępstwa</h3>"+
                    "<iframe src='https://ds.mydevil.net/zast_box_osadz.php?klasa="+getCookie("__klasa_zast")+
                    "&naprzod=4' width='1000px' height='100px' style='border: 0px'></iframe>"+
                    "<br /><br />"+
                    "<b><a id='zmieniarka' href='#'>Ustaw klasę do pobierania zastęptw</a> (obecnie jest to "+
                    getCookie("__klasa_zast")+").</b>"+
                    "</div>"
                    );
    $("#zmieniarka").click(function () { selectZastClass(); });
  }
  else{
     $('#body').html("");
  }
}

if (document.URL.indexOf("/przegladaj_oceny/uczen")>=0){
//nie kasujemy całości, bo by się czytelność napsuła - to jedno firmie Librus się udało
  pasekGorny()
  $('.container-icon').remove()//box z imieniem i nazwiskiem
  
  $('tr:contains("Zachowanie") img').remove()
  $('tr:contains("Zachowanie")').css('font-size', '0pt')
  $('tr:contains("Brak ocen")').each(function( index, value ) {
    var k = $(this).html().match(/Brak ocen/g);  
  if (k == "Brak ocen,Brak ocen"){//występuje w dwóch semestrach; jak jest semI to brak ocen jest w każdym wierszu dla semII
      $(this).css('font-size', '0pt');
    $(this).find('img').remove();
  }
  });
  
//jesteśmy wredni i przeciążamy ich serwery - autopobieranie wykresu ocen
  $('#preloader-curtain').remove()
  $('#preloader').remove()
  $('[src="/images/pobierz_wykres_ocen.jpg"]').click()
}


if (document.URL.indexOf("/przegladaj_nb/uczen")>=0){
  pasekGorny()
  //ukrywanie ukrywania nieob z przedm pozalekcyjnych
  $('table:contains("Ukryj")').remove()
  //jesteśmy wredni i przeciążamy ich serwery - autopobieranie wykresu absencji
  $('#preloader-curtain').remove()
  $('#preloader').remove()
  $('[src="/images/pobierz_wykres_absencji.jpg"]').click()
  //zbędne lekcje
  $('.line0 td').each(function( index, value ) { $(this).find(':nth-child(12)').remove() } );//11 lekcja w wierzu parzystym
  $('.line0 td').each(function( index, value ) { $(this).find(':nth-child(12)').remove() } );//12 lekcja w wierzu parzystym
  $('.line1 td').each(function( index, value ) { $(this).find(':nth-child(12)').remove() } );//11 lekcja w wierzu nieparzystym
  $('.line1 td').each(function( index, value ) { $(this).find(':nth-child(12)').remove() } );//12 lekcja w wierzu nieparzystym
  $('thead').each(function( index, value ) { $(this).find(':nth-child(13)').remove() } );//11 lekcja w wierzu nagłówka
  $('thead').each(function( index, value ) { $(this).find(':nth-child(13)').remove() } );//12 lekcja w wierzu nagłówka
}

if (document.URL.indexOf("/wiadomosci")  >=0)/*wiadomości mają ID w URLach*/{
  pasekGorny()
// nic ? czyżby było ok??
}

if (document.URL.indexOf("/zrealizowane_lekcje")>=0){
  pasekGorny()
  //poprawienie merytoryczności komunikatu (if any)
  $('div.warning-content:contains("Ten widok został wyłączony przez administratora szkoły.")').html(
  "Ten widok został wyłączony z nieznanych powodów przez Sami-Wiecie-Kogo.<br /><br />"+
  "Aby ominąć głupie ograniczenia wejdź na <a href='https://m.dziennik.librus.pl/module/Common/action/Login'>https://m.dziennik.librus.pl/</a>,"+
  " przejdź do <u>Nieobecności</u> i wybierz żądaną datę - są wszsystkie godziny z tematami :)")//Zamoy edition
}

if (document.URL.indexOf("/ogloszenia")>=0){
  pasekGorny()
}
if (document.URL.indexOf("/moje_zadania")>=0){
  pasekGorny()
}
if (document.URL.indexOf("/informacja")>=0){
  pasekGorny()
}
if (document.URL.indexOf("/archiwum")>=0){
  pasekGorny()
}
if (document.URL.indexOf("/ustawienia") >=0){
  pasekGorny()
}

if (document.URL.indexOf("/terminarz")>=0){
  pasekGorny()
  //usuwamy sobotę i niedzielę (tak, wiem, ze jakiś nauczyciel może dodać sprawdzian w niedzielę ;)
  $('.kalendarz td:nth-child(6)').remove();//sb
  $('.kalendarz td:nth-child(6)').remove();//nd jest teraz 6!
  $('td').filter(function() {//wywal info, że n-la nie ma bo co mnie to obchodzi. faktycznie podwaja a nawet bardziej zawala liste
    var match = 'rgb(255, 120, 120)';
    return ( $(this).css('background-color') == match );
  }).css('display','none')

 }
}

addjQuery(main);//ładuj jQ
