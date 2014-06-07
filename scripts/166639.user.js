// ==UserScript==
// @name        Bitcurex Plus
// @version     1.5.5
// @namespace   mapo
// @include     https://pln.bitcurex.com/*

// ==/UserScript== 

var wersja = '1.5.5'; //wersja wczytywana w opcjach



/****************************************************************************************************
//Tinybox - upiększa popup
//Źródło: http://www.scriptiny.com/2011/03/javascript-modal-windows/
*****************************************************************************************************/

GM_addStyle(".tbox {position:absolute; display:none; padding:14px 17px; z-index:900}\
.tinner {padding:15px; border-radius:5px; background:#F5F5F5 url(images/preload.gif) no-repeat 50% 50%; border-right:1px solid #333; border-bottom:1px solid #333}\
.tmask {position:fixed; display:none; top:0px; left:0px; height:100%; width:100%; background:#000; z-index:100}\
.tclose {display: block;  position: absolute;  top: 8px;  right: 8px;  height: 0;  width: 18px;  padding: 18px 0 0 0;  overflow: hidden;  background: #000000 none;  border: 2.04545454545455px solid #ffffff;    border-radius: 18px;  box-shadow: 0 0 6px #000000, 1.63636363636364px 1.63636363636364px 1.63636363636364px rgba(0, 0, 0, 0.3), -1.63636363636364px 1.63636363636364px 1.63636363636364px rgba(0, 0, 0, 0.3), 1.63636363636364px -1.63636363636364px 1.63636363636364px rgba(0, 0, 0, 0.3), -1.63636363636364px -1.63636363636364px 1.63636363636364px rgba(0, 0, 0, 0.3); color: #ffffff;  cursor: pointer;    user-select: none;}\
.tclose:before {   content: 'x';   display: block;   text-align: center;   width: 18px;   position: absolute;   top: -1.8px;   left: 0;   font-size: 18px;   line-height: 18px;   font-family: 'Helvetica Neue', Consolas, Verdana, Tahoma, Calibri, Helvetica, Menlo, 'Droid Sans', sans-serif;   top: -2px;   left: 1px;");



TINY={};TINY.box=function(){var j,m,b,g,v,p=0;return{show:function(o){v={opacity:70,close:1,animate:1,fixed:1,mask:1,maskid:'',boxid:'',topsplit:2,url:0,post:0,height:0,width:0,html:0,iframe:0};for(s in o){v[s]=o[s]}if(!p){j=document.createElement('div');j.className='tbox';p=document.createElement('div');p.className='tinner';b=document.createElement('div');b.className='tcontent';m=document.createElement('div');m.className='tmask';g=document.createElement('div');g.className='tclose';g.v=0;document.body.appendChild(m);document.body.appendChild(j);j.appendChild(p);p.appendChild(b);m.onclick=g.onclick=TINY.box.hide;window.onresize=TINY.box.resize}else{j.style.display='none';clearTimeout(p.ah);if(g.v){p.removeChild(g);g.v=0}}p.id=v.boxid;m.id=v.maskid;j.style.position=v.fixed?'fixed':'absolute';if(v.html&&!v.animate){p.style.backgroundImage='none';b.innerHTML=v.html;b.style.display='';p.style.width=v.width?v.width+'px':'auto';p.style.height=v.height?v.height+'px':'auto'}else{b.style.display='none';if(!v.animate&&v.width&&v.height){p.style.width=v.width+'px';p.style.height=v.height+'px'}else{p.style.width=p.style.height='100px'}}if(v.mask){this.mask();this.alpha(m,1,v.opacity)}else{this.alpha(j,1,100)}if(v.autohide){p.ah=setTimeout(TINY.box.hide,1000*v.autohide)}else{document.onkeyup=TINY.box.esc}},fill:function(c,u,k,a,w,h){if(u){if(v.image){var i=new Image();i.onload=function(){w=w||i.width;h=h||i.height;TINY.box.psh(i,a,w,h)};i.src=v.image}else if(v.iframe){this.psh('<iframe src="'+v.iframe+'" width="'+v.width+'" frameborder="0" height="'+v.height+'"></iframe>',a,w,h)}else{var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');x.onreadystatechange=function(){if(x.readyState==4&&x.status==200){p.style.backgroundImage='';TINY.box.psh(x.responseText,a,w,h)}};if(k){x.open('POST',c,true);x.setRequestHeader('Content-type','application/x-www-form-urlencoded');x.send(k)}else{x.open('GET',c,true);x.send(null)}}}else{this.psh(c,a,w,h)}},psh:function(c,a,w,h){if(typeof c=='object'){b.appendChild(c)}else{b.innerHTML=c}var x=p.style.width,y=p.style.height;if(!w||!h){p.style.width=w?w+'px':'';p.style.height=h?h+'px':'';b.style.display='';if(!h){h=parseInt(b.offsetHeight)}if(!w){w=parseInt(b.offsetWidth)}b.style.display='none'}p.style.width=x;p.style.height=y;this.size(w,h,a)},esc:function(e){e=e||window.event;if(e.keyCode==27){TINY.box.hide()}},hide:function(){TINY.box.alpha(j,-1,0,3);document.onkeypress=null;if(v.closejs){v.closejs()}},resize:function(){TINY.box.pos();TINY.box.mask()},mask:function(){m.style.height=this.total(1)+'px';m.style.width=this.total(0)+'px'},pos:function(){var t;if(typeof v.top!='undefined'){t=v.top}else{t=(this.height()/v.topsplit)-(j.offsetHeight/2);t=t<20?20:t}if(!v.fixed&&!v.top){t+=this.top()}j.style.top=t+'px';j.style.left=typeof v.left!='undefined'?v.left+'px':(this.width()/2)-(j.offsetWidth/2)+'px'},alpha:function(e,d,a){clearInterval(e.ai);if(d){e.style.opacity=0;e.style.filter='alpha(opacity=0)';e.style.display='block';TINY.box.pos()}e.ai=setInterval(function(){TINY.box.ta(e,a,d)},20)},ta:function(e,a,d){var o=Math.round(e.style.opacity*100);if(o==a){clearInterval(e.ai);if(d==-1){e.style.display='none';e==j?TINY.box.alpha(m,-1,0,2):b.innerHTML=p.style.backgroundImage=''}else{if(e==m){this.alpha(j,1,100)}else{j.style.filter='';TINY.box.fill(v.html||v.url,v.url||v.iframe||v.image,v.post,v.animate,v.width,v.height)}}}else{var n=a-Math.floor(Math.abs(a-o)*.5)*d;e.style.opacity=n/100;e.style.filter='alpha(opacity='+n+')'}},size:function(w,h,a){if(a){clearInterval(p.si);var wd=parseInt(p.style.width)>w?-1:1,hd=parseInt(p.style.height)>h?-1:1;p.si=setInterval(function(){TINY.box.ts(w,wd,h,hd)},20)}else{p.style.backgroundImage='none';if(v.close){p.appendChild(g);g.v=1}p.style.width=w+'px';p.style.height=h+'px';b.style.display='';this.pos();if(v.openjs){v.openjs()}}},ts:function(w,wd,h,hd){var cw=parseInt(p.style.width),ch=parseInt(p.style.height);if(cw==w&&ch==h){clearInterval(p.si);p.style.backgroundImage='none';b.style.display='block';if(v.close){p.appendChild(g);g.v=1}if(v.openjs){v.openjs()}}else{if(cw!=w){p.style.width=(w-Math.floor(Math.abs(w-cw)*.6)*wd)+'px'}if(ch!=h){p.style.height=(h-Math.floor(Math.abs(h-ch)*.6)*hd)+'px'}this.pos()}},top:function(){return document.documentElement.scrollTop||document.body.scrollTop},width:function(){return self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},height:function(){return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},total:function(d){var b=document.body,e=document.documentElement;return d?Math.max(Math.max(b.scrollHeight,e.scrollHeight),Math.max(b.clientHeight,e.clientHeight)):Math.max(Math.max(b.scrollWidth,e.scrollWidth),Math.max(b.clientWidth,e.clientWidth))}}}();

/****************************************************************************************************
//Koniec - Tinybox
*****************************************************************************************************/

/****************************************************************************************************
//Okienko informacyjne
*****************************************************************************************************/
function oknoFirst() { 
TINY.box.show({html:"<style type='text/css'> "+
	" .box1{ padding: 6px; background-color: #EBEBEB;  border-radius: 10px;text-align:left;  }"+
	"</style>"+
	"<p><h1>Informacja - skrypt Bitcurex Plus</h1><p>"+
	"<p><div id='okienkoTekstInformacja' style='text-align:center; font-size:8pt;'>Okienko informacji pojawia się jednorazowo przy pierwszym uruchomieniu strony ze skryptem Bitcurex Plus, w przypadku ponownego uruchomienia tego okienka, będzie ono znajdować się w opcjach skryptu pod przyciskiem 'Informacje'.</div><p>"+
	"<p><b>Wyłączenie odpowiedzialności za straty</b><br/>Autor skryptu 'Bitcurex Plus' wyłącza odpowiedzialność za jakiekolwiek straty poniesione w wyniku działania skryptu. </br> Skrypt używasz na własną odpowiedzialność.<p>"+
	"<p><b>Ogólne informacje dotyczące skryptu</b><br/>- Przycisk opcji skryptu jest umieszczony nad logiem strony, czyli w lewym górnym rogu. </br>- Dane dotyczące opcji skryptu zapisywane są za pomocą HTML5 localStorage, które nięzbędne są do poprawnego działania skryptu. (<i>Informacje dotyczące kompatybilności localStorage z wersją twojej przeglądarki można znaleźć</i> <a href='http://caniuse.com/#search=localstorage'>tutaj</a>.)</br>- Po pierwszym uruchomieniu skryptu wprowadzane są podstawowe ustawienia opcji, dla łatwiejszej orientacji działania skryptu.<p>"+
	"<p><b>Funkcjonalność skryptu</b><ul style='text-align:left;'><li>Wyłączenie zakładki 'Pomoc' (<i>po jego wyłączeniu aktywuje się automatycznie zakładka 'Kup BTC'</i>)"+
	"</li><li>Zmiana tytułu strony: </br><ul> <li> na najlepszą ofertę BID, ASK</br> <li> obie oferty BID oraz ASK w jednym miejscu (<i>układ modyfikowalny według własnych potrzeb  np. [B wartośćBID | A wartośćASK PLN] lub [wartośćBID, wartośćASK PLN] i wiele innych. Kolejność wyświetlania wartości BID oraz ASK jest stała</i>) </br> <li> średnia wartość obu ofert, czyli <i>(BID+ASK)/2</i></ul>"+
	""+
	"<li>'Kopiowanie' za pomocą przycisku najlepszej oferty BID lub ASK do pola tekstowego (Cena PLN za 1BTC) - dla zakładki 'Kup BTC' przypisuje najlepszą ofertę ASK, a dla zakładki/box 'Sprzedaj BTC' przypisuje najlepszą ofertę BID. </li>"+
	"<li>'Kopiowanie' za pomocą przycisku procentowej ilości BTC - można ustawić 4 przyciski w tym dla każdego przycisku ustawić inną wartość procentową. </li>"+
	"<li>Możliwość wyboru ile krotnie można kliknąć przyciskiem, aby się uaktywnił, do wyboru jest jednokrotne i dwukrotne kliknięcie(dotyczy to wszystkich przycisków w zakładce 'Kup BTC' oraz 'Sprzedaj BTC')</li>"+
	"<li>Możliwość wyboru przedziału czasowego, czyli w jakim odstępie czasowym ma sprawdzać cenę oferty BID/ASK do aktualizacji tytułu strony. Czas mierzony jest w milisekundach (1s=1000ms). </li>"+
	"</ul>"+
	"<div class='box1' ><p style='color:red; font-weight: bold; '>Ważne!</p>"+
	"Problemem 'kopiowania' za pomocą przycisków jest to, że po dodaniu wartości do pola tekstowego, kalkulator ich nie czyta, przez co można wysłać transakcje z niechcianymi wartościami."+
	"</br></br>Problem ten rozwiązałem na inny sposób, otóż po kliknięciu przycisku automatycznie aktywuje się pole tekstowe, czyli, po prostu pokazuje się wskaźnik pisania w danym polu, dzięki czemu wystarczy nacisnąć np. spację, aby kalkulator mógł odczytać przypisaną wartość. O zapominalskich również pomyślałem, a dokładnie po kliknięciu przycisku robi się on czerwony, co jest oznaką tego, że należy w danym polu tekstowym nacisnąć np. spację, po owej czynności przycisk wraca do swojego domyślnego koloru czarnego."+
	"</br></br>Podsumowanie: Kalkulator nie czyta wartości od razu po kliknięciu przycisku, więc wystarczy nacisnąć na przycisk przypisujący wartość i po tym na spację, aby kalkulator poprawnie odczytał wartość przypisaną w odpowiednim polu tekstowym."+
	"</div></br>"+
	""
,boxid:'frameless', fixed:false, opacity:30});

//****************************************
//Początkowe ustawienia opcji przy pierwszym uruchomieniu skryptu
//****************************************
if (localStorage.getItem('opcje_oknoFirstAutorun')!='off'){
  localStorage.setItem("opcje_tytulLiczba", '1');
  localStorage.setItem("opcje_tytulTekst0", 'BID ');
  localStorage.setItem("opcje_tytulTekst1", ' | ASK ');
  localStorage.setItem("opcje_tytulTekst2", ' PLN');
  
  localStorage.setItem('opcje_check0', true);
  
  localStorage.setItem('opcje_procentBTC0', '100');
  localStorage.setItem('opcje_procentBTC1', '75');
  localStorage.setItem('opcje_procentBTC2', '50');
  localStorage.setItem('opcje_procentBTC3', '25');  
  
  localStorage.setItem('opcje_buttonClick', 'click');
  localStorage.setItem('opcje_buttonClickLiczba', '0');
  
  localStorage.setItem('opcje_tytulInterwal', '1000');
  
  localStorage.setItem('opcje_oknoFirstAutorun','off');
  }

}
//Uruchamia okno informacyjne za pierwszym włączeniem skryptu
if (localStorage.getItem('opcje_oknoFirstAutorun')!= 'off'){
oknoFirst();
}

/****************************************************************************************************
//Koniec - Okienko informacyjne
*****************************************************************************************************/

/****************************************************************************************************
//Funkcje zmieniające tytuł strony
*****************************************************************************************************/

// Funkcja - zaokrąglanie po przecinku
function round(number,x) {
    var x = (!x ? 2 : x);
    return Math.round(number*Math.pow(10,x)) / Math.pow(10,x);
}

//Funkcja - Tytuł jako średnia kursu
function titleAsAvarage()
{

var sredniakursu =  (parseFloat(document.getElementsByClassName('ask')[0].textContent) 
+ parseFloat(document.getElementsByClassName('bid')[0].textContent)) /2 ;

document.title = round(sredniakursu,2) + " PLN - Średnia";
}
//Funkcja - Tytuł jako BID oraz ASK
function titleAsBIDASK(){
document.title = localStorage.getItem('opcje_tytulTekst0')+
document.getElementsByClassName('bid')[0].textContent + 
localStorage.getItem('opcje_tytulTekst1') +
document.getElementsByClassName('ask')[0].textContent + 
localStorage.getItem('opcje_tytulTekst2');

}

//Funkcja - Tytuł jako ASK
function titleAsASK()
{
document.title = document.getElementsByClassName('ask')[0].textContent + " PLN - ASK";
}

//Funkcja - Tytuł jako BID

function titleAsBID()
{
document.title = document.getElementsByClassName('bid')[0].textContent + " PLN - BID";
}

/****************************************************************************************************
//Koniec - Funkcje zmieniające tytuł strony
*****************************************************************************************************/

/****************************************************************************************************
//BOX - Kupowanie i sprzedawanie BTC
*****************************************************************************************************/

//****************************************
//Nasłuchiwanie klawiszy w textboxach
//****************************************

//Funkcja słuchania klawiszy - BID Kurs
function listenSpacjaBK(event) {
			
			if(event.keyCode == 32 || 8) {
				for (var count in BIDKursButton)	
				{
				newBIDKursButton[count].setAttribute('style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; color: black;');
				}
			}
		
}


//Funkcja słuchania klawiszy - BID ilosc BTC
function listenSpacjaBI(event) {
			
			if(event.keyCode == 32 || 8) {
				for (var count in BIDIloscButton)	
				{
				if(localStorage.getItem('opcje_procentBTC'+count) != 0 || null){
				newBIDIloscButton[count].setAttribute('style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; color: black;');
				}
				}
			}
		
}


//Funkcja słuchania klawiszy - ASK Kurs
function listenSpacjaAK(event) {
			
			if(event.keyCode == 32 || 8) {
				for (var count in ASKKursButton)	
				{
				newASKKursButton[count].setAttribute('style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; color: black;');
				}
			}
		
}


//Funkcja słuchania klawiszy - ASK ilosc BTC
function listenSpacjaAI(event) {
			
			if(event.keyCode == 32 || 8) {
				for (var count in ASKIloscButton)	
				{
				if(localStorage.getItem('opcje_procentBTC'+count) != 0 || null){
				newASKIloscButton[count].setAttribute('style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; color: black;');
				}
				}
			}
		
}


//****************************************
//Zakładka - Kup BTC
//****************************************

//Funkcja - wprowadzanie danych ASK
function bidKursAktualny() {
document.getElementById('bid_currency').value=document.getElementsByClassName('ask')[0].firstChild.nodeValue;
document.getElementById('bid_currency').focus();
this.setAttribute('style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; color: red; border-color:red;');
document.getElementById('bid_currency').addEventListener('keydown',listenSpacjaBK );
}

//Tablica - nazwa przycisku
var BIDKursButton = new Array()
BIDKursButton[0] = 'Aktualny';

//Tablica - funkcja przycisku
var BIDKursButton_funkcja = new Array()
BIDKursButton_funkcja[0] = bidKursAktualny;


//Tworzenie oraz wyświetlanie przycisku kurs
var newBIDKursButton = new Array()
for(var count in BIDKursButton)
{ 
	
    newBIDKursButton[count] = document.createElement('input');
	with(newBIDKursButton[count]){
		addEventListener(localStorage.getItem('opcje_buttonClick'), BIDKursButton_funkcja[count] ,false);
		setAttribute( 'value', BIDKursButton[count] );
		setAttribute( 'style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; ' );
		setAttribute( 'type', 'button' ); 
		}
   
  
    document.getElementById( 'bid_currency_container' ).appendChild( newBIDKursButton[count] );
       
}


//Pobieranie wyznaczonej ilości BTC

function bidIlosc() {
var nr = parseFloat(this.id);
document.getElementById('bid_bitcoin').value= round(parseFloat(document.getElementsByClassName('max')[0].textContent) * (localStorage.getItem('opcje_procentBTC'+nr)/100.0),8);
document.getElementById('bid_bitcoin').focus();
this.setAttribute('style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; color: red; border-color:red;');
document.getElementById('bid_bitcoin').addEventListener('keydown',listenSpacjaBI );
}

//Tablica - nazwa przycisku
var BIDIloscButton = new Array()

BIDIloscButton[0] = localStorage.getItem('opcje_procentBTC0')+'%';
BIDIloscButton[1] = localStorage.getItem('opcje_procentBTC1')+'%';
BIDIloscButton[2] = localStorage.getItem('opcje_procentBTC2')+'%';
BIDIloscButton[3] = localStorage.getItem('opcje_procentBTC3')+'%';

//Tworzenie oraz wyświetlanie przycisku BTC
var newBIDIloscButton = new Array()
for(var count in BIDIloscButton)
{ 
		newBIDIloscButton[count] = document.createElement('input');
		with(newBIDIloscButton[count]){
		
		addEventListener(localStorage.getItem('opcje_buttonClick'), bidIlosc,false);
		setAttribute( 'value', BIDIloscButton[count] );
		setAttribute( 'type', 'button' ); 
		setAttribute( 'style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; ' );
		setAttribute( 'id', count+'bidilosc' );
		
		}
    
	document.getElementById( 'bid_bitcoin_container' ).appendChild( newBIDIloscButton[count] );

}


//****************************************
//Zakładka - Sprzedaj BTC
//****************************************

function askKursAktualny() {
document.getElementById('ask_currency').value=document.getElementsByClassName('bid')[0].firstChild.nodeValue;
document.getElementById('ask_currency').focus();
this.setAttribute('style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; color: red; border-color:red;');
document.getElementById('ask_currency').addEventListener('keydown',listenSpacjaAK );
}



//Tablica - nazwa przycisku
var ASKKursButton = new Array()
ASKKursButton[0] = 'Aktualny';

//Tablica - funkcja przycisku
var ASKKursButton_funkcja = new Array()
ASKKursButton_funkcja[0] = askKursAktualny;


//Tworzenie oraz wyświetlanie przycisku kurs
var newASKKursButton = new Array()
for(var count in ASKKursButton)
{ 
	
    newASKKursButton[count] = document.createElement('input');
	with(newASKKursButton[count]){
		addEventListener(localStorage.getItem('opcje_buttonClick'), ASKKursButton_funkcja[count] ,false);
		setAttribute( 'value', ASKKursButton[count] );
		setAttribute( 'style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; ' );
		setAttribute( 'type', 'button' ); 
		}
   
  
    document.getElementById( 'ask_currency_container' ).appendChild( newASKKursButton[count] );
       
}
	
//Ilość BTC
function askIloscAll() {
var nr = parseFloat(this.id);
document.getElementById('ask_bitcoin').value=round(document.getElementsByClassName('max')[1].textContent * (localStorage.getItem('opcje_procentBTC'+nr)/100.0),8); //Wynik zaokrąglany do 8 miejsc po przecinku
document.getElementById('ask_bitcoin').focus();
this.setAttribute('style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; color: red; border-color:red;');
document.getElementById('ask_bitcoin').addEventListener('keydown',listenSpacjaAI );
}

//Tablica - nazwa przycisku

var ASKIloscButton = new Array()
ASKIloscButton[0] = localStorage.getItem('opcje_procentBTC0')+'%';
ASKIloscButton[1] = localStorage.getItem('opcje_procentBTC1')+'%';
ASKIloscButton[2] = localStorage.getItem('opcje_procentBTC2')+'%';
ASKIloscButton[3] = localStorage.getItem('opcje_procentBTC3')+'%';

//Tworzenie oraz wyświetlanie przycisku BTC
var newASKIloscButton = new Array()
for(var count in ASKIloscButton)
{ 
		newASKIloscButton[count] = document.createElement('input');
		with(newASKIloscButton[count]){
		addEventListener(localStorage.getItem('opcje_buttonClick'), askIloscAll ,false);
		setAttribute( 'value', ASKIloscButton[count] );
		setAttribute( 'style', 'width: auto; cursor: pointer; margin-top: 5px; margin-right: 3px; ' );
		setAttribute( 'type', 'button' ); 
		setAttribute( 'id', count+'askilosc' );
		}
    
	document.getElementById( 'ask_bitcoin_container' ).appendChild( newASKIloscButton[count] );
       
}

/****************************************************************************************************
//Koniec BOX - Kupowanie i sprzedawanie BTC
*****************************************************************************************************/



/****************************************************************************************************
//Sprawdzanie ustawień opcji
*****************************************************************************************************/

//Zmienia tytul strony na cene BTC
	if (localStorage.getItem("opcje_tytulLiczba")==0){
	setInterval(titleAsAvarage,localStorage.getItem('opcje_tytulInterwal'));
	}
	else if (localStorage.getItem("opcje_tytulLiczba")==1){
	setInterval(titleAsBIDASK,localStorage.getItem('opcje_tytulInterwal'));
	}
	else if (localStorage.getItem("opcje_tytulLiczba")==2){
	setInterval(titleAsBID,localStorage.getItem('opcje_tytulInterwal'));
	}
	else if (localStorage.getItem("opcje_tytulLiczba")==3){
	setInterval(titleAsASK,localStorage.getItem('opcje_tytulInterwal'));
	}
	else { 
	}

//Sprawdzanie pól tekstowych
	for(var count in BIDIloscButton)
		{
			
			if(BIDIloscButton[count] == "undefined%" )
			{
				newBIDIloscButton[count].setAttribute( 'style', 'display: none;');
				newASKIloscButton[count].setAttribute( 'style', 'display: none;');
			}
			
			if(localStorage.getItem('opcje_procentBTC'+count)== 0 || null || "" )
			{
				newBIDIloscButton[count].setAttribute( 'style', 'display: none;');
				newASKIloscButton[count].setAttribute( 'style', 'display: none;');
			}
		}

	

//Wyłącza box Pomoc
	if(localStorage.getItem('opcje_check0')=='true')
	{
	//chrome
	function setHash(newHash) {
    location.hash = 'someHashThatDoesntExist';
    location.hash = newHash;
	}

	setHash('#bid');
	//firefox
	window.location.hash='#bid';
	
	
	document.getElementById('tradeLabel').childNodes[1].setAttribute( 'style', 'display: none;');
	}


//Wyłącza wszystkie przyciski
	if(localStorage.getItem('opcje_check1')=='true')
	{
	for(var count in BIDIloscButton)
		{
			
			newBIDIloscButton[count].setAttribute( 'style', 'display: none;');
			newASKIloscButton[count].setAttribute( 'style', 'display: none;');
			
		}
	for(var count in BIDKursButton)
		{ 
			newBIDKursButton[count].setAttribute( 'style', 'display: none;');
			newASKKursButton[count].setAttribute( 'style', 'display: none;');
		}
	}
//Wyłącza przycisk Aktualny
	if(localStorage.getItem('opcje_check2')=='true')
	{
	for(var count in BIDKursButton)
		{ 
			
			newBIDKursButton[count].setAttribute( 'style', 'display: none;');
			newASKKursButton[count].setAttribute( 'style', 'display: none;');
		}
	}
//Wyłącza przyciski "Procent ilości BTC"
	if(localStorage.getItem('opcje_check3')=='true')
	{
	for(var count in BIDIloscButton)
		{
			newBIDIloscButton[count].setAttribute( 'style', 'display: none;');
			newASKIloscButton[count].setAttribute( 'style', 'display: none;');
		}
	}
	


/****************************************************************************************************
//Koniec sprawdzania ustawień opcji
*****************************************************************************************************/

/****************************************************************************************************
//Opcje
*****************************************************************************************************/

//****************************************
//Funkcja odpowiadająca za wczytanie ustawień w okienku opcji
//****************************************

function opcjeWczytaj() {
var form = document.getElementById('formOpcje');
    //Interwał czasowy 
	document.getElementById('opcje_tytulInterwal').value = localStorage.getItem('opcje_tytulInterwal');
	
	//Wczytuje opcje checkbox
	for(var i=0; i<form.opcjeCheck.length; i++)
	{	
		if (localStorage.getItem('opcje_check'+i)=='true'){
		document.getElementById('opcje_check'+i).checked=true;
        }
		else {
		document.getElementById('opcje_check'+i).checked=false;
		}
	}
	
	//Wczytuje opcje radio (kurs jak tytuł strony)
	var liczba = localStorage.getItem("opcje_tytulLiczba");
	if (liczba != null){
	document.getElementById('opcje_tytul'+liczba).checked = true;
	}
	
	//Wczytuje opcje dla pola tekstowego tytul jako kurs
	var liczba2 = localStorage.getItem('opcje_buttonClickLiczba');
	if (liczba2 != null){
	document.getElementById('opcje_buttonClick'+liczba2).selected = true;
	}
	//Wczytuje opcje tekstowe - kurs BID|ASK jako tytul 
	for(var i=0; i<form.opcjeTytulTekst.length; i++){
			document.getElementById('opcje_tytultekst'+i).value = localStorage.getItem("opcje_tytulTekst"+i);
	}
	
	//Wczytuje opcje procent BTC w pole tekstowe
	
	for(var i=0; i<form.opcjeTekstIlosc.length; i++){
	
	document.getElementById('opcje_procentBTC'+i).value= localStorage.getItem('opcje_procentBTC'+i);
	
	}
	
}

//****************************************
//Funkcja odpowiadająca za zapis ustawień w okienku opcji
//****************************************

function opcjeZapisz() {
var form = document.getElementById('formOpcje');
//Interwał czasowy 
localStorage.setItem('opcje_tytulInterwal',document.getElementById('opcje_tytulInterwal').value);
//Tworzenie zapisu dla opcji radio (kurs jak tytuł strony)

for (var i=0; i<form.opcjeTytul.length; i++) {
	if (form.opcjeTytul[i].checked== true) {    
			localStorage.setItem("opcje_tytulLiczba", i);
    }
}
//Tworzenie zapisu dla pola tekstowego tytul jako kurs
for(var i=0; i<form.opcjeTytulTekst.length; i++){
			localStorage.setItem("opcje_tytulTekst"+i, document.getElementById('opcje_tytultekst'+i).value);
	}
	
//Tworzenie zapisu dla opcji ilosc klikniec	
	for(var i=0; i<2; i++){
	if(document.getElementById('opcje_buttonClick'+i).selected == true){
	localStorage.setItem('opcje_buttonClick', document.getElementById('opcje_buttonClick'+i).value);
	localStorage.setItem('opcje_buttonClickLiczba', i);
	
	}
	}
//Tworzenie zapisu dla opcji chceckbox
	for(var i=0; i<form.opcjeCheck.length; i++){
			
			 //Tworzy zapis
			 if (document.getElementById('opcje_check'+i).checked==true) {
			localStorage.setItem('opcje_check'+i, true);
			}
			else {
			localStorage.setItem('opcje_check'+i, false);
			
			}			
	}


	//Tworzenie zapis
	for(var i=0; i<form.opcjeTekstIlosc.length; i++){
			localStorage.setItem('opcje_procentBTC'+i, document.getElementById('opcje_procentBTC'+i).value);
		}

}

//****************************************
//Przycisk do okienka opcji
//****************************************
var parentElement = document.getElementById('top-menu');


var opcjebutton2 = document.createElement("input"); 
with (opcjebutton2){
addEventListener('click', opcjeOkno ,false); 
setAttribute('type',"button");
setAttribute('style',"float: left;");
setAttribute( 'value', 'Opcje skryptu' );
}
parentElement.insertBefore(opcjebutton2,parentElement.firstChild);

//****************************************
//Funkcje opcji
//****************************************
function zapiszRefresh(){
opcjeZapisz();
window.location = "";
}

function opcjeFunkcja(){
opcjeWczytaj();
	document.getElementById('oOpcjeZapiszButton').addEventListener('click', zapiszRefresh ,false);
	document.getElementById('infoButton').addEventListener('click', oknoFirst ,false);
}


//****************************************
//Okienko opcji
//****************************************
function opcjeOkno() { 
TINY.box.show({html:"<style type='text/css'> .opcjeTytul{font-size:250%;}"+
" .boxBTC { padding: 6px; background-color: #D6D5B8; box-shadow: 3px 3px 5px 6px #ccc;  border-radius: 10px;  opacity: 0.5;}"+
"  .shadow { box-shadow: 3px 3px 5px 6px #ccc;  border-radius: 10px;}"+
"  .boxOpcje { padding: 5px; background-color:  #EBEBEB; box-shadow: 3px 3px 5px 6px #ccc;  border-radius: 10px;}"+
" .box1{ padding: 6px; background-color: #F5F5EB;  border-radius: 10px; box-shadow: 3px 3px 5px 6px #ccc; }"+
" .boxButton{   width: 250px; padding: 5px; background-color:  #EDEDF0;  border-radius: 10px; box-shadow: 3px 3px 5px 6px #ccc; }"+
".boxInfo{   width: 150px; padding: 5px; background-color:    #EDEDF0;  border-radius: 10px; box-shadow: 3px 3px 5px 6px #ccc; }"+
".left{margin-left:0px; margin-right:auto;}"+
"</style>"+

"<table >"+
"<td class='boxOpcje' ><div class='opcjeTytul'>Opcje</div><center> Bitcurex Plus <b>"+ wersja+
"</b></center>"+
"</td>"+
"<td width='150px'></td>"+
"<td><div  class='shadow'><div class='boxBTC'>Darowizna BTC:</br> 1EBhh5Z5QK6WCYuHJh3Be3fsWgZpPK18in</div></td></div>"+
"</table><p>"+

"<form id='formOpcje'>"+
"<table  align='left' class='box1' cellspacing='5' >"+
"<td align='left' >"+
"<fieldset>"+
"<legend>Tytuł strony jako kurs BTC</legend>"+
"<div style='margin-left: 0px;'>"+

"<input type='radio' name='opcjeTytul' id='opcje_tytul0'/> Średnia <i>(BID+ASK)/2</i></br>"+
"<input type='radio' name='opcjeTytul' id='opcje_tytul1'/> Najlepsza oferta BID oraz ASK</i></br>"+
"<input type='text' name='opcjeTytulTekst' style='width:35px;' id='opcje_tytultekst0'/> BID "+
"<input type='text'  name='opcjeTytulTekst' style='width:35px;' id='opcje_tytultekst1'/> ASK "+
"<input type='text'  name='opcjeTytulTekst' style='width:35px;' id='opcje_tytultekst2'/> </br>"+
"<input type='radio' name='opcjeTytul' id='opcje_tytul2'/> Najlepsza oferta BID </br>"+
"<input type='radio' name='opcjeTytul' id='opcje_tytul3'/> Najlepsza oferta ASK </br>"+
"<input type='radio' name='opcjeTytul' id='opcje_tytul4'/> Wyłącz kurs w tytule </br>"+
"Przedział czasowy: <input type='text' style='width:35px;' id='opcje_tytulInterwal'/> (ms)</br>"+

"</div>"+
"</fieldset>"+

"</td>"+

"<td align='left'>"+

"<input type='checkbox' name='opcjeCheck' id='opcje_check0' /> Wyłącz box <b>Pomoc</b><br/>"+
"<input type='checkbox' name='opcjeCheck' id='opcje_check1'/> Wyłącz wszystkie przyciski<br/>"+
"<input type='checkbox' name='opcjeCheck' id='opcje_check2'/> Wyłącz przycisk <b>Aktualny</b> z obu boxów <br/>"+
"Kliknięcie przycisku:<select>"+
"<option name='opcjebuttonClick' id='opcje_buttonClick0' value='click'>Jednokrotne</option>"+
"<option name='opcjebuttonClick' id='opcje_buttonClick1' value='dblclick'>Dwukrotne</option></select><font size='1'><i>(Nie dotyczy przycisków opcji)</i> </font>"+
"</td>"+
"</tr>"+
"<tbody>"+
"<td align='left' colspan='2'>"+


"<fieldset>"+
"<legend>Przyciski wprowadzania procentowych ilości BTC</legend>"+



"Nr 1<input type='text' name='opcjeTekstIlosc' style='width:35px;' id='opcje_procentBTC0'/>"+
" Nr 2<input type='text'  name='opcjeTekstIlosc' style='width:35px;' id='opcje_procentBTC1'/>"+
" Nr 3<input type='text'  name='opcjeTekstIlosc' style='width:35px;' id='opcje_procentBTC2'/>"+
" Nr 4<input type='text'  name='opcjeTekstIlosc' style='width:35px;' id='opcje_procentBTC3'/></br>"+

"<font size='1'><i>Wartości należy wpisać bez procentów, czyli zamiast 75% po prostu 75.</i></br>"+
"<i>Jeżeli nie chcesz, aby któryś z przycisków był wyświetlany pozostaw pole tekstowe puste lub przypisz wartość 0.</i></br></font>"+
"</div>"+
"<br/>"+
"<input type='checkbox' name='opcjeCheck' id='opcje_check3'/> Wyłącz przyciski wprowadzania BTC z obu boxów<br/>"+
"</div> "+
"</fieldset>"+
"</div>"+
"</td>"+
"</table>"+
"</form>"+
"</br>"+

"<table>"+
"<td class='boxInfo'><div align='center'><input type='button' id='infoButton' value='Informacje'/></div></td>"+
"<td width='150px'></td>"+
"<td class='boxButton'><center><div >"+
"<div align='center'><input type='button' id='oOpcjeZapiszButton' value='Zapisz'/></div>"+
"<div style='text-align:center; font-size:8pt;'><i>Przy zapisie strona zostanie odświeżona.</i></div>"+
"</div> </center></td>"+
"</table>"+
""

,boxid:'frameless', fixed:false, opacity:30,openjs:function(){opcjeFunkcja()}});

}

/****************************************************************************************************
//Koniec opcji
*****************************************************************************************************/