// ==UserScript==
// @name           Catalanizator - Google Wave en català
// @namespace      http://www.catmidia.cat
// @description    Tradueix Google Wave al català (parcialment),basat en la seqüència :  profil word changes on facebook.Portat a tu per http://www.catmidia.cat V:16112009
// @include        *
// ==/UserScript==
(function () {

  var replacements, regex, key, textnodes, node, s;

// you can customize the script below by changing the letter "a" to a lowercase version of the word
// and the letter "B" to the uppercase version of the word. Currently, in this version you
// can only change "a" and B to a word that turns plural by just adding an "s"
// Remember: KEEP THE QUOTES when changing "a" and "B"

replacements = {
  "Navigation": "Navegació",
"New Wave": "Nou Wave",
"Delete": "Esborra",
"Done": "Fet",
"tacts": "tactes",
"Manage": "Controla",
"Inbox": "Safata d`Entrada",
"All": "Tot",
"By me": "Fet per mi",
"Requests": "Peticions",
"Spam": "Publicitat No Desitjada",
"Settings": "Configuració",
"Trash": "Paperera",
"SEARCHES": "CERQUES",
"FOLDERS": "CARPETES",
"Search": "Cerca",
"Move": "Moure",
"Add": "Afegeix",
"Follow": "Segueix",
"Unfollow": "No segueixis",
"Archive": "Arxiva",
"Reply": "Respon",
"Playback": "Reprodueix",
"Spam": "Publicitat NO desitjada",
"Read": "Llegeix",
"Unread": "Sense llegir",
"Options": "Opcions",
"Save": "Salva",
"Moure to": "Moure a",
"search": "cerca",
"More actions": "Més accions",
"Manage contacts": "Controla contactes",
"of lots": "de molts",
"Star": "Comença",
"Tags": "Etiquetes",
"Files": "Arxius",
"Terms": "Termes",
"Privacy": "Privacitat",
"Edit": "Edita",
"of": "de",
"Telefono": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
"à": "à",
    };
regex = {};
for ( key in replacements ) {
  regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
for ( var i=0 ; i<textnodes.snapshotLength ; i++ ) {
  node = textnodes.snapshotItem(i);
  s = node.data;
  for ( key in replacements ) {
    s = s.replace( regex[key] , replacements[key] );
  }
  node.data = s;
}

})();