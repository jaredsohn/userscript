// ==UserScript==
// @name          gladi_olasz
// @description   Segítség a levélküldésben
// @include       *
// ==/UserScript==
// this function fills out form fields
//
var zTextFields = document.getElementsByTagName("input");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].name;
  if (!thefield) thefield=zTextFields[i].name;
  // Set up your auto-fill values here
  if (thefield == "messageSubject") zTextFields[i].value="Ciao!";
}
var zTextFields = document.getElementsByTagName("textarea");
for (var i=0; i<zTextFields.length; i++) {
  thefield=zTextFields[i].id;
  if (!thefield) thefield=zTextFields[i].id;
  // Set up your auto-fill values here
  if (thefield == "message") zTextFields[i].value="Ciao! La eItalia ha bisogno di te! Voglio invitarti a questo gioco online, e-sim, che e un MMOG (Mass Multiplayer Online Game) giocabile su internet e che richiede pochissimo tempo da rubare a qualsiasi altro tuo gioco.\n\nPotrai essere:\n-un soldato\n-un politico\n-un uomo d’affari\n-un giornalista\n\nLe nazioni sono in alleanze che si combattono a vicenda. Molti paesi stanno attaccando la nostra patria, e noi dobbiamo difenderla ma non possiamo farlo da soli. La nostra e-patria ha bisogno di te!\n\nPuoi registrarti qui:\n--> http://e-sim.org/lan.168475/ \n\n-Articoli che ti aiuteranno all’inizio del gioco:\n---->http://e-sim.org/article.html?id=13616\n\nSe hai altre domande, puoi andare sulla chat qui\n----->http://cbe002.chat.mibbit.com/?channel=%23e-sim.it&server=irc.rizon.net ";
}