// ==UserScript==
// @name           Helper
// @namespace      Helper
// @include        http://forum.travian.it/newreply.php*
// ==/UserScript==



    var scriptCode = new Array();   // this is where we are going to build our new script
    
    // here's the build of the new script, one line at a time
    scriptCode.push('function scrivi(argomento){'        );

   scriptCode.push('   document.getElementById("vB_Editor_001_textarea").innerHTML= "x";    '  );
    scriptCode.push('   var stringa="Ciao!";   '  ); 
    scriptCode.push('   switch(argomento){    '  );


    scriptCode.push('   case "rispostadata":  '  );
    scriptCode.push('   stringa="Risposta data.\\n [B]Chiudo[/B]";  '  );
    scriptCode.push('   break;  '  );


    scriptCode.push('   case "tastocerca1":  '  );
    scriptCode.push('   stringa="Domande comuni come queste possono essere facilmente risolte usando il [URL=http://forum.travian.it/showthread.php?t=85583][B]Tasto Cerca[/B][/URL] oppure consultando le [URL=http://answers.travian.it/][B]FAQ del T3.6[/B][/URL]. \\n [B]Chiudo[/B] ";  '  );
    scriptCode.push('   break;  '  );


    scriptCode.push('   case "tastocerca2":  '  );
    scriptCode.push('   stringa="Domande comuni come queste possono essere facilmente risolte usando il [URL=http://forum.travian.it/showthread.php?t=85583][B]Tasto Cerca[/B][/URL] oppure consultando le [URL=http://t4.answers.travian.it/][B]FAQ del T4[/B][/URL]. \\n [B]Chiudo[/B] ";  '  );
    scriptCode.push('   break;  '  );


    scriptCode.push('   case "comerichiesto":  '  );
    scriptCode.push('   stringa="Come richiesto,\\n [B]Chiudo[/B]";  '  );
    scriptCode.push('   break;  '  );

    scriptCode.push('   case "bugvisualizzazione":  '  );
    scriptCode.push('   stringa="Gentile utente, \\n Il suo problema sembra riconducibile a un problema di browser. Provi ad eliminare cookies, files temporanei e cache. [URL=http://forum.travian.it/showthread.php?t=45664][B]Qui[/B][/URL] può trovare delle semplici istruzioni. Mi faccia sapere se ha risolto, grazie! \\n \\n La ringraziamo, ";  '  );
    scriptCode.push('   break;  '  );

    scriptCode.push('   case "bugdilentezza":  '  );
    scriptCode.push('   stringa="Se il server risulta lento o inaccessibile, potete aiutarci seguendo [URL=http://forum.travian.it/showthread.php?t=146809][B]queste[/B][/URL] istruzioni. Le informazioni raccolte aiuteranno i tecnici a risolvere il problema e a prevenirne di futuri. \\n Grazie :)";  '  );
    scriptCode.push('   break;  '  );


    scriptCode.push('   case "bugrichiestadati":  '  );
    scriptCode.push('   stringa="Salve, per effettuare il controllo avrei bisogno del suo nickname, il server in cui gioca e tutte le informazioni utili. \\n Può scriverli qui o, se preferisce, inviarli via Messaggio Privato.";  '  );
    scriptCode.push('   break;  '  );


    scriptCode.push('   case "nobug":  '  );
    scriptCode.push('   stringa="Il problema in questione [B][COLOR=red]non è un bug[/COLOR][/B]. \\nChiudo. Per maggiori informazioni può mandarmi un Messaggio Privato.";  '  );
    scriptCode.push('   break;  '  );


    scriptCode.push('   case "presavisione":  '  );
    scriptCode.push('   stringa="Il problema è stato segnalato ai tecnici, grazie per la segnalazione. Attendiamo notizie e vi faremo sapere al più presto! \\n Grazie,";  '  );
    scriptCode.push('   break;  '  );


    scriptCode.push('   case "fixed":  '  );
    scriptCode.push('   stringa="Il problema è già noto ai tecnici e sarà [B]fixato[/B] al più presto. \\n Ringraziamo per la segnalazione.";  '  );
    scriptCode.push('   break;  '  );

    scriptCode.push('   }   '  );
   scriptCode.push('   document.getElementById("vB_Editor_001_textarea").innerHTML= stringa;    '  );
    scriptCode.push('   }   '  );

    // now, we put the script in a new script element in the DOM
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script    
    // this is sort of hard to read, because it's doing 2 things:
    // 1. finds the first <head> tag on the page
    // 2. adds the new script just before the </head> tag
    document.getElementsByTagName('head')[0].appendChild(script); 






var controllo = '<div style="margin: 0 auto; margin-bottom: 5px; width: 627px; height: 80px; background: transparent;"  >  ' +
' <select style="border: 2px solid green; height: 100%; width: 175px;"  size="4" multiple="multiple"><option onclick=scrivi("rispostadata")>Risposta data</option><option onclick=scrivi("tastocerca1")>Tasto cerca (3.6)</option><option onclick=scrivi("tastocerca2")>Tasto cerca (4)</option><option onclick=scrivi("comerichiesto")>Come richiesto</option></select> ' +
' <select style="border: 2px solid blue; height: 100%; width: 175px;"  size="4" multiple="multiple"><option onclick=scrivi("bugvisualizzazione")>Bug di visualizzazione</option><option onclick=scrivi("bugdilentezza")>Bug di lentezza</option><option onclick=scrivi("bugrichiestadati")>Bug richiesta dati</option></select> ' +
' <select style="border: 2px solid red; height: 100%; width: 175px;" name="drop1" id="Select1" size="4" multiple="multiple"><option onclick=scrivi("nobug")>Bug: no bug</option><option onclick=scrivi("presavisione")>Bug: presa visione</option><option onclick=scrivi("fixed")>Bug: fixed</option></select>  </div>';
document.getElementById("pagetitle").innerHTML= controllo;

//document.getElementById("vB_Editor_001_textarea").innerHTML= "<b>sei</b>";
