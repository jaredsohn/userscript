// ==UserScript==
// Megavideo-No-Limits
// Copyright (c) 2009 Riccardo Cioncolini
// Released under the GNU GPL
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name		Megavideo-No-Limits
// @namespace	        http://userscripts.org/scripts/show/63308
// @description	        How-to per aggirare il limite dei 72 minuti di visualizzazione di megavideo
// @author		mitm[ITA]
// @version		0.1
// @include		http://*megavideo.com/*
// ==/UserScript==

var intro = ' \
I metodi per aggirare i limiti imposti da megavideo durante la visualizzazione dei filmati sono sostanzialmente i seguenti: \n \
1) utilizzare softwares di terze parti \n \
2) utilizzare particolari plug-ins per i web browsers \n \
3) appoggiarsi a siti di terze parti \n \
4) utilizzare proxy/anonymizer \n \
spesso però i vari sistemi sono a pagamento, o smettono di funzionare dopo poco tempo, o non fanno altro che allungare di poco il limite dei 72 minuti. \n\n \
L\'unico sistema ancora valido, funzionante e soprattutto gratis, è quello di cambiare ip della propria connessione, cosa fattibile ovviamente se non si è titolari di un contratto \n \
che prevede ip statico, nel qual caso anche disattivando/riattivando la connessione a internet, il provider ci assegnerà ovviamente sempre lo stesso indirizzo ip. \n\n \
Chi possiede ancora un modem adsl usb esterno o pci integrato e si collega a internet con un solo computer alla volta, può semplicemente disconnettersi/riconnettersi per avere un nuovo ip. \n\n \
Tuttavia la stragrande maggioranza degli utenti internet utilizza ormai degli apparati detti router per condividere la connessione a internet tra più computer della stessa rete domestica, \n \
quindi per cambiare indirizzo ip è spesso sufficiente spengere/riaccendere il router perchè il nostro provider ci assegni un nuovo ip che ci consentirà di non essere riconosciuti da megavideo. \n \
Spesso però non si ha accesso fisico al router per poterlo spengere, o per vari motivi può non essere possibile(o semplice) riavviarlo dall\'interfaccia di configurazione. \n \
Inoltre anche se riusciamo a riavviare il router o il collegamento a internet, il processo di disconnessione/riconnessione risulta molto lento,  \n \
ed evidentemente interrompe ogni connessione attiva in quel momento (ad esempio vengono interrotti eventuali downloads in corso) \n\n \
';
var help = ' \
Il metodo qui proposto è a mio avviso molto più rapido e indolore, in quanto non richiede alcun intervento sul router; \n \
E\' stato testato con successo con connessioni alice adsl, ma non escludo che funzioni anche per altri operatori.. \n\n \
Alice adsl di telecom italia dà infatti la possibilità di avere fino a 3 connessioni simultanee a internet con ip diversi(anche se molti non ne sono a conoscenza e non sfruttano questa potenzialità). \n \
Il router utilizza una di queste connessioni e la condivide tra i vari computer della rete domestica collegati ad esso tramite cavo ethernet o via wireless. \n \
Le altre due connessioni possono essere utilizzate da altri apparati per avere accesso internet con ip diverso da quello assegnato dal provider al router stesso. \n\n \
Quindi sarà sufficiente creare sul nostro computer una connessione a banda larga PPPoE per farci assegnare uno di questi due ip liberi;  \n \
Il processo di connessione è molto veloce(si parla di pochi secondi) ed il traffico internet di eventuali altri pc della rete non viene influenzato. \n \
Al momento del blocco dei 72/54 minuti, sarà sufficiente disattivare/riattivare la connessione a banda larga e risulteremo per megavideo un\'entità ogni volta diversa. \n\n \
Requisiti richiesti: \n \
1) PPPoE pass-through abilitato sul router(su alcuni modelli è abilitato di default) \n \
2) IP dinamico \n\n \
La procedura per creare una connessione a banda larga PPPoE varia a seconda della piattaforma e del sistema operativo utilizzati. \n \
Personalmente l\'ho testato su Windows (2000, XP, Vista) e diverse distribuzioni linux(Slackware, CentOS, Ubuntu, *BSD) \n\n \
Per ulteriori delucidazioni :  mitm@hotmail.it \n \
';

GM_registerMenuCommand("Help", function(){alert(intro); alert(help)});