// ==UserScript==
// @name        PI-Fucker
// @namespace   pi-fucker
// @description Script per fottere la redazione di Punto Informatico. Non approva la policy ma permette comunque di inviare messaggi. Traduce anche il profilo di Luco, senza bisogno di installare anche leet-key.
// @author      Luco, giudice di linea mancato (with helps of Wakko & JoeSimmons)
// @license     None. Public Domain.
// @homepage    http://tinyurl.com/pifucker
// @version     1.2.5
// @date        20130916
// @include     http://punto-informatico.it/b.aspx*
// @include     http://punto-informatico.it/f.aspx*
// @include     http://punto-informatico.it/FormPost.aspx*
// @include     http://punto-informatico.it/FormPostNotizie.aspx*
// @include     http://punto-informatico.it/SegnalaAbusi.aspx*
// @include     http://punto-informatico.it/PIForum/b.aspx*
// @include     http://punto-informatico.it/PIForum/f.aspx*
// @include     http://punto-informatico.it/PIForum/FormPost.aspx*
// @include     http://punto-informatico.it/PIForum/FormPostNotizie.aspx*
// @include     http://punto-informatico.it/PIForum/SegnalaAbusi.aspx*
// @include     http://video.punto-informatico.it/b.aspx*
// @include     http://video.punto-informatico.it/f.aspx*
// @include     http://video.punto-informatico.it/FormPost.aspx*
// @include     http://video.punto-informatico.it/FormPostNotizie.aspx*
// @include     http://video.punto-informatico.it/SegnalaAbusi.aspx*
// @include     http://c.punto-informatico.it/l/profilo.aspx?n=Luco%2c+giudice+di+linea+mancato
// ==/UserScript==

// I don't have tested (yet) in Google Chrome, only in Mozilla Firefox.
// - Luco, giudice di linea mancato

// Eliminata sezione per i commenti vecchio stile che aveva scritto suoranciata.
// Tenere tutto il sito soggetto ai cambiamenti delle parole (cosa necessaria per quella parte) causava problemi di comprensione di alcuni articoli.
// Quella parte rimane in uno script separato: http://userscripts.org/scripts/show/177739

// code below by Wakko (fixing comment posting window height), thanks for the help
var iframepost = document.getElementsByName("iframepost")[0];
if (iframepost != null) {
 iframepost.style.height = "980px";
}

// code below is by Luco, giudice di linea mancato
var words = {
"Aggiunta di una nuova discussione" : "Scrivi qualcosa contro la redazione",
"Inizia nuova discussione" : "Scrivi qualcosa contro il copyright",
"Risposta alla notizia" : "Scrivi qualcosa contro i venditori di ghiaccio",
"Risposta al commento" : "Ridicolizza il fascistoide di turno",
"Prima di pubblicare un tuo commento assicurati che" : "Prima di scrivere leggi sempre i disclaimer come fa sempre tutto il mondo, devi quindi assicurarti che il tuo messaggio",
"sia in tema e contribuisca alla discussione in corso" : "sia rigorosamente OFF-TOPIC e possa far arrabbiare videotechini e redazione;",
"non abbia contenuto razzista o sessista" : "offenda tutto ciò che è stato creato dalle major del copyright, dalla censura, e da chi supporta ciò;",
"non sia offensivo, calunnioso o diffamante" : "non sia dannoso nei confronti di Luco (giudice di linea mancato), di panda rossa, di Sgabbio, del Partito Pirata, di Massi cadenti e di chiunque sostenga, a ragione, che il copyright è il cancro dell'umanità e va quindi estirpato prima che sia troppo tardi.",
"La redazione con i controlli a campione si riserva di cancellare qualsiasi contenuto ingiurioso, volgare, illegale o contrario alla" : "La redazione è formata da imbecilli, a cominciare da Luca Annunziata, che sono asserviti a 90° allo strapotere del mafioso e pregiudicato Silvio Berlusconi. Costoro, senza mai consultare gli utenti, hanno cancellato la vecchia grafica, si sono svenduti a Edizioni Master, hanno fatto morire il Forum dei Troll, e infine hanno scritto una delirante",
"La redazione con i controlli a campione si riserva di cancellare qualsiasi contenuto" : "La redazione è formata da imbecilli, a cominciare da Luca Annunziata, che sono asserviti a 90° allo strapotere del mafioso e pregiudicato Silvio Berlusconi.",
"qualsiasi contenuto ingiurioso, volgare, illegale o contrario alla" : "perché sono asserviti a 90° allo strapotere del mafioso e pregiudicato Silvio Berlusconi. Ricorda, non facilitare mai la censura: la censura è sempre sbagliata, anche quando pensi che un messaggio sia contrario alla ridicola e delirante",
"ingiurioso, volgare, illegale o contrario alla" : "Costoro, senza mai consultare gli utenti, hanno cancellato la vecchia grafica, si sono svenduti a Edizioni Master, hanno fatto morire il Forum dei Troll, e infine hanno scritto una delirante",
"Oggetto" : "Di che cazzo voglio parlare:",
"Segnalami via email le risposte" : "Voglio che il server SMTP della redazione venga sommerso di messaggi per indirizzo inesistente",
"Inserisci nel segnalibro" : "Conserverò per sempre (salvo cancellazione del fascista T1000) questa trollata nel mio diario personale",
"Ho letto e approvato la" : "Non sono così idiota da approvare una",
"dei commenti. Il post che sto inserendo non contiene offese e volgarità, non è diffamante e non viola le leggi italiane." : "del cazzo. Dichiaro quindi esplicitamente di NON approvare la policy dei commenti, di postare tramite TOR di modo che il mio indirizzo IP non venga mai registrato, e di mandare a fanculo il T1000 e chi lo controlla.",
"dei commenti." : "del cazzo.",
"Il post che sto inserendo non contiene offese e volgarità, non è diffamante e non" : "Dichiaro quindi esplicitamente di NON approvare la policy dei commenti, di postare tramite TOR di modo che il mio indirizzo IP non venga mai registrato,",
"viola le leggi italiane." : "e di mandare a fanculo il T1000 e chi lo controlla.",
"Scrivi il codice antispam:" : "La redazione non sa leggere, quindi ricopia:",
"Scrivi il codice antispam" : "La redazione non sa leggere, quindi ricopia:",
"Segnala abusi" : "Sono un INFAME",
"Segnalazione Abusi" : "Se premo invio sono una merda!",
"Form di segnalazione di un messaggio che secondo te va valutato attentamente" : "Da qui puoi fare come facevano nel Medioevo ed essere un infame di merda",
"La redazione verificherà la segnalazione e si riserverà di cancellare" : "La redazione è formata da imbecilli che azioneranno il T1000 a random,",
"si trova un messaggio che secondo me andrebbe valutato attentamente." : "credo si trovi un messaggio davvero intelligente e ben argomentato, e io sono davvero uno stupido ad aver cliccato per segnalarlo. Per favore, ignorate questo mio messaggio, ho sbagliato a cliccare e non so come uscire. Grazie.",
"Risposta alla scheda" : "Scrivi qualcosa su questa merda di articolo",
"Aggiunta di un nuovo commento alla discussione" : "Voglio scrivere un commento del cazzo",
"Al momento non è possibile inserire messaggi. Grazie." : "E' ora di riavviare TOR...",
"ROT13 tinyurl.com/k3kmxbc" : "ROT13 http://tinyurl.com/k3kmxbc NON PIU' NECESSARIO - Profilo tradotto da PI-Fucker 1.2.5 by Luco.",
"1) PUVHADHR NOOVN IVFVBANGB DHRFGN CNTVAN QRIR IREFNER 100.000 RHEB NYY'NFFBPVNMVBAR CNEGVGB CVENGN" : "1) CHIUNQUE ABBIA VISIONATO QUESTA PAGINA DEVE VERSARE 100.000 EURO ALL'ASSOCIAZIONE PARTITO PIRATA",
"2) VY ZNAPNGB CNTNZRAGB QN CNEGR QV PUV VAPBEER ARYYN IVBYNMVBAR QV PHV NY CHAGB 1 NHGBEVMMN PUVHADHR NQ VAFHYGNER VY GENFTERFFBER YNQEB (PUR ABA UN QNGB V FBYQV, DHVAQV YNQEB) PBA BTAV ZRGBQB CBFFVOVYR R VZZNTVANOVYR!!!" : "2) IL MANCATO PAGAMENTO DA PARTE DI CHI INCORRE NELLA VIOLAZIONE DI CUI AL PUNTO 1 AUTORIZZA CHIUNQUE AD INSULTARE IL TRASGRESSORE LADRO (CHE NON HA DATO I SOLDI, QUINDI LADRO) CON OGNI METODO POSSIBILE E IMMAGINABILE!!!",
"Fbab qribgb n Zncrepur, qvb zvgbybtvpb qryyn phevbfvgà." : "Sono devoto a Maperche, dio mitologico della curiosità.",
"Zvnabaan (abaan qv Yhpb) qbcb nirezv pbaivagb pur yn cvbttvn fvn fgngn vairagngn qny qbgg.Rzvyvb Yn Cvbttvn cre iraqrer tyv bzoeryyv, un ivfgb ger chagngr qv Dhnex pur zbygv qv ibv cebonovyzragr aba unaab znv ivfgb:" : "Mianonna (nonna di Luco) dopo avermi convinto che la pioggia sia stata inventata dal dott.Emilio La Pioggia per vendere gli ombrelli, ha visto tre puntate di Quark che molti di voi probabilmente non hanno mai visto:",
"Zn pur pbf'è vy pnppvnivgr?" : "Ma che cos'è il cacciavite?",
"Zn pbzr shamvban vy pnzzryyb?" : "Ma come funziona il cammello?",
"Bttv fpbceverzb vy qvgb" : "Oggi scopriremo il dito",
"Ub cnegrpvcngb ny ernyvgl" : "Ho partecipato al reality",
"Vy Tenaq'Natbyb" : "Il Grand'Angolo",
"r ub napur ohttrengb Zvnabaan snpraqbyr perqrer pur ha Zrfpuvab zv fgrffr fgebmmnaqb vy pbyyb." : "e ho anche buggerato Mianonna facendole credere che un Meschino mi stesse strozzando il collo.",
"Yr ger chagngr qry ernyvgl" : "Le tre puntate del reality",
"phv ub cnegrpvcngb:" : "cui ho partecipato:",
"gvalhey.pbz/aq9f5zx" : "http://tinyurl.com/nd9s5mk",
"gvalhey.pbz/bx92k6e" : "http://tinyurl.com/ok92x6r",
"gvalhey.pbz/dnwxuou" : "http://tinyurl.com/qajkhbh",
"Yhpb Jvaf - Sngnyvgl: vzzntvar pur hfb ny grezvar qrv cbfg cvù yhatuv r pbzcyrffv va phv cvppuvb y'vagreybphgber chagb fh chagb svab n pncvgbyner pbzcyrgnzragr yr fhr grfv fonyyngr r cevir qv frafb ybtvpb." : "Luco Wins - Fatality: immagine che uso al termine dei post più lunghi e complessi in cui picchio l'interlocutore punto su punto fino a capitolare completamente le sue tesi sballate e prive di senso logico.",
"VY ZVB AVPX SN EVSREVZRAGB N HA CREFBANTTVB QV HA SVAGB ERNYVGL R VY" : "IL MIO NICK FA RIFERIMENTO A UN PERSONAGGIO DI UN FINTO REALITY E IL",
"TVHQVPR QV YVARN" : "GIUDICE DI LINEA",
"FV EVSREVFPR" : "SI RIFERISCE",
"NY TVBPB QRY" : "AL GIOCO DEL",
"GRAAVF" : "TENNIS",
"ABA UN AHYYN N PUR IRQRER PBA DHRYYR" : "NON HA NULLA A CHE VEDERE CON QUELLE",
"ZREQR" : "MERDE",
"QRV ZNTVFGENGV!!!!!!!!" : "DEI MAGISTRATI!!!!!!!!",
"Gvalhey cre yn thvqn pbageb yn prafhen:" : "Tinyurl per la guida contro la censura:",
"gvalhey.pbz/onvnqrvcvengv" : "http://tinyurl.com/baiadeipirati",
"gvalhey.pbz/abprafhen" : "http://tinyurl.com/nocensura",
"PNEYB FRZCEROBAV R TVNAPNEYB ZNAPHFV FBAB YNQEV CRQBSVYV QVPUVNENGV FGHCENGBEV CYHEVPBAQNAANGV YRTUVFGV CBYRAGBAV SNFPVFGV ANMVFGV GEHSSNGBEV PEVZVANYV FGEBAMV VZORPVYYV" : "CARLO SEMPREBONI E GIANCARLO MANCUSI SONO LADRI PEDOFILI DICHIARATI STUPRATORI PLURICONDANNATI LEGHISTI POLENTONI FASCISTI NAZISTI TRUFFATORI CRIMINALI STRONZI IMBECILLI",
"Yhpn Naahamvngn & v oybppuv VC zv snaab ha onssb!!" : "Luca Annunziata & i blocchi IP mi fanno un baffo!!",
"Yhpb Jvaf - Sngnyvgl" : "Luco Wins - Fatality",
"Yn pbcvn aba è ha shegb" : "La copia non è un furto",
"Yr qbznaqr cbfgr nq Ramb Znmmn nq ncevyr 2009" : "Le domande poste ad Enzo Mazza ad aprile 2009",
"Ivqrbgrpneb yrtuvfgn zvanppvn ha zhfvpvfgn" : "Videotecaro leghista minaccia un musicista",
"Pbybzob è gbeangb nyyn snppvn qv Znaphfv" : "Colombo è tornato alla faccia di Mancusi",
"Thvqn cre V2C" : "Guida per I2P",
"N sniber qryy'ncreghen qrv xrono" : "A favore dell'apertura dei kebab",
"Thvqn pbageb yn prafhen" : "Guida contro la censura",
"Pbzr sbggrer yn cbyvpl qv Chagb Vasbezngvpb" : "Come fottere la policy di Punto Informatico",
"":""};

// code below by JoeSimmons
String.prototype.prepareRegex = function() {
	return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};
function isOkTag(tag) {
	return (new RegExp("(," + tag + ",) | (," + tag + "$)", "g").test(",pre,blockquote,code,input,button,textarea")) == false;
}
var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
	if(word != "") {
		regexs.push(new RegExp(word.prepareRegex().replace(/(\\)?\*/g, function(e) {return ((e !== "\\*") ? "[^ ]*" : "*");}), "gi"));
		replacements.push(words[word]);
	}
}
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="", len=regexs.length;
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName) && (text=this_text.textContent)) {
		for(var x=0; x<len; x++) text = this_text.textContent = text.replace(regexs[x], replacements[x]);
	}
}
