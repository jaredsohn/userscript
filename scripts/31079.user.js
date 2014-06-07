// ==UserScript==
// @name           Birdz AUTO Login
// @include        http://www.birdz.sk/
// @include        http://www.birdz.sk/*
// @include        http://*.birdz.sk/
// @description    Tento skript umožňuje automatické prihlásenie na stránke Birdz.sk. || Autor skriptu: pepek92 (www.pepek92.webka.sk) || verzia 1.0
// ==/UserScript==




/* NASTAVENIA - Vyplň tieto údaje pre prihlásenie (sa) */

tajnykod = ''; // napíš do tohto políčka BIRDZSK a až potom bude možné spustiť skript

prihlmeno = '';  // vyplň svoje prihlasovacie meno

prihlheslo = ''; // vyplň svoje prihlasovacie heslo

/* POKROČILÉ NASTAVENIA - Tieto nastavenia nie je potrebné meniť, ale môžeš si ním upraviť skript podľa svojich potrieb */

automatickyodoslat = 0; // ak chceš aby bol formulár s prihlásením automaticky odoslaní, zmeň 0 na 1
// DÔLEŽITÉ: TÚTO VOĽBU NASTAV NA 1 IBA AK SI SI ÚPLNE ISTÝ/Á SVOJÍMI PRIHLASOVACÍMI ÚDAJMI.

pauzapredodoslanim = 0; // počet sekúnd, po ktorých sa má odoslať formulár ( UPOZORNENIE: Toto nastavenie je platné, iba ak je nastavené automatickyodoslat na hodnotu 1 )

/* KONIEC NASTAVENÍ */

/* ----------------------------------------------------------------------------------------------------- */

/* HLAVNÝ SKRIPT - Tu nič nemeň!!! Inak to môže prestať fungovať */

if (document.getElementById('neprihlaseny')) {

inputNick = document.getElementsByName('nick')[0];
inputHeslo = document.getElementsByName('heslo')[0];
if (tajnykod == 'BIRDZSK') {
if (inputNick && inputHeslo) {

 inputNick.value = prihlmeno;
 inputHeslo.value = prihlheslo;
 
 if (automatickyodoslat == 1) {
 
   if (pauzapredodoslanim > 0) {
   
     realpauzapredodoslanim = pauzapredodoslanim*1000;
    
     setTimeout(function(){
      document.getElementById('login').parentNode.submit();
     }, realpauzapredodoslanim);
   
   }
   else {
     document.getElementById('login').parentNode.submit();
   }
 
 }

}

}
}

/* ----------------------------------------------------------------------------------------------------- */
