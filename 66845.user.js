// ==UserScript==
// @name           B92 komentari
// @namespace      http://www.avramovic.info/
// @description    Unos imena i mejla u polje za komentare na b92.net sajtu
// @include        http*://*b92.net/*/vas_komentar.php*
// ==/UserScript==

function b92_podesavanja()
{
  ime = prompt("Vaše ime:", GM_getValue("b92_ime", ""));
  imejl = prompt("Vaša e-mail adresa:", GM_getValue("b92_imejl", ""));
  GM_setValue("b92_ime", ime); GM_setValue("b92_imejl", imejl);
}

function getUrlVars()
{
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
   
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function b92_url()
{
    var deloviURLa = window.location.href.split('?');
    return deloviURLa[0] + '?nav_id='+getUrlVars()['nav_id'];
}

function b92_kreiraj_link(tekst, linkParams)
{
  var theTextOfTheParagraph = document.createTextNode(tekst);
  
  var link = document.createElement('a');
  link.setAttribute('href', b92_url()+'&'+linkParams);
  link.appendChild(theTextOfTheParagraph);
  
  return link;
}

function b92_prikazi_opcije()
{
  var theNewParagraph = document.createElement('p');
  var theSmall = document.createElement('small');
  var link = b92_kreiraj_link("» Podešavanja GM skripte za komentare", "podesavanja=da");
  theSmall.appendChild(link);
  theNewParagraph.appendChild(theSmall);
  document.getElementsByName('name')[0].parentNode.appendChild(theNewParagraph);
  
  theNewParagraph = document.createElement('p');
  theSmall = document.createElement('small');
  link = b92_kreiraj_link("» Deinstalacija GM skripte za komentare", "deinstalacija=da");
  theSmall.appendChild(link);
  theNewParagraph.appendChild(theSmall);
  document.getElementsByName('name')[0].parentNode.appendChild(theNewParagraph);
}

var ime = GM_getValue("b92_ime");
var imejl = GM_getValue("b92_imejl", "");
var izmena_podesavanja = getUrlVars()['podesavanja'];
var deinstalacija = getUrlVars()['deinstalacija'];

if (deinstalacija == 'da')
{
  if (!confirm("Da li ste sigurni da želite da obrišete sačuvano ime i e-mail adresu\n(kako biste mogli da uklonite skriptu bez ostavljanja tragova iste u browseru)?"))
  {

    window.location.href = b92_url();
    return;
  }
  GM_deleteValue("b92_ime");
  GM_deleteValue("b92_imejl");
  alert("Podaci skripte su uklonjeni - možete obrisati skriptu sada.\nAko opet otvorite stranicu za komentarisanje skripta će se ponovo aktivirati.");
}
else {

  var fokus = true;

  if (ime == undefined || izmena_podesavanja == 'da')
  { 
      fokus = false;
      b92_podesavanja();
  }

  document.getElementsByName('name')[0].value = ime;
  document.getElementsByName('email')[0].value = imejl;
  if (fokus == true) document.getElementsByName('komentar')[0].focus();

  b92_prikazi_opcije();
}