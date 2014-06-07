// ==UserScript==
// @name            Technologijų kodo pavasaris: anti-troll
// @description     Hides comments by prominent trolls at forum of technologijos.lt
// @description     Paslepia komentarus ir trolius technologijos.lt forume.
// @namespace       http://userscripts.org/users/rwc
// @include         http://www.technologijos.lt/diskusijos/viewtopic.php?p=*
// @include         http://www.technologijos.lt/diskusijos/viewtopic.php?t=*
// @author          rwc
// @author          Ąžuolas
// @licence         Public domain
// @version         0.2.0
// @homepage        http://userscripts.org/scripts/show/68336
// ==/UserScript==


/* ==ChangeLog==

   LAIDŲ ISTORIJA (*-darbinė)

 Hey! Hey! Hey!
 Troliai nebegauna amnestijos perkrovus puslapį arba naršyklę!
 Viskas dabar valdoma pele, nieko konfigūruoti nereikia.

 Reikia sugalvoti, kaip su užblokuotų pranešimų saugojimu...
 
 Dar laukia:
   - WebServisas ir komunikavimo priemonės
   - Meniu

0.2.02   Suderinamumas su Opera 10.50: lentelių turinio negalima keisti su innerHTML
            (t.p. kaip IE). Dabar, jei įterpiamo fragmento kontekstas yra TBODY/
            THEAD/TFOOT, įklijuojamas tekstas aplipdomas reikiamu rėmeliu ir vėliau
            elementai išrenkami iš sugeneruotos struktūros; žr. insertHTMLAfter().

0.2.01   Buvo išjungtas Native JSON
0.2.0    Jokios amnestijos Troliams! (rwc)
        + Trolių sąrašas išlaikomas naršyklės saugykloje
        + Realizuotas GM_setValue saugyklos emuliatorius: GM_*, localStore (HTML5)
            arba Cookiuose, taip pat loadTrolls/saveTrolls pagal vardus.
        + Pritaikyta D.Crockfordo JSON biblioteka HTML5 JSON nepalaikančioms 
            naršyklėms.
        + Opera 9.52.
        
0.1.3*   Vidinių naršyklės javascript technologijų ir semantinio atskyrimo demo (rwc).
        + Komentarų slėpimas po vieną ir blokuojant autorių, atslėpimas.
            ToDo: saugojimas, komunikacija, meniu.
        + Suderinamumo bibliotekos, vėlyvas krovimas
        + Konceptų atskyrimas, komponentiškumas: navigacija su XPath, 
            automatinis CSS ir Javascript prijungimas, šablonų užpildymas.
        + Komunikacija tarp Sandbox ir realaus turinio abipusė, suderinama
            su Greasemonkey, Opera, Chrome nenaudojant papildomų bibliotekų, neoficialių
            ar nedokumentuotų sintaksės ir naršyklės priemonių.
        + Pagrindiniai deklaratyvaus programavimo principai.

0.1.2*   Struktūriniai pertvarkymai (rwc)
        - Nesilaikoma "Hello World!" minimalizmo. "Žaliems" rekomenduojama 1.0 versija:
            http://userscripts.org/scripts/version/68336/177307.user.js
        - Nebėra erzinimo susikonfigūruoti.

0.1.1*  UI prototipas. (Ąžuolas)
        + Rodoma, kad konkretus pranešimas paslėptas
        + Galimybė paspaudus nuorodą parodyti paslėptą pranešimą
        
0.1     Pradinė versija ("Hello World!). Prototipas. (rwc)
        + Pagal įprogramuotą sąrašą, slepiami visi vartotojo pranešimai
        + Erzinimas vartotojui, kad sudarytų savo trolių sąrašą
        + Minimali GM_log imitacija nesuderinamoms naršyklėms (console.log, GM_log, void())
        + GM_setValue/GM_getValue imitacijos prototipas naudojant Session Cookies.
        + Firefox 3.6 / GreaseMonkey 0.8.20100211.5
        + Chrome 4.0.249.89 beta
        + Opera 10.50 Beta

 ==/ChangeLog== */

(function(){try{

//========= DEMO DEMO DEMO ==============
function demo(){
    var trollList = GM_getValue("trolls");
    var trolls = trollList? JSON.parse(trollList) : [];

    insertHTMLAfter( document.body,
        fillTemplate(
            "<p class='no-more-amnesty'>"+
            "   <span class='title'>{title}</span>"+
            "   <span class='trollist'>{trolls}</span>"+
            "</p>",
            {
                title: "Amnestijos dar negavo: ",
                trolls: (trolls.length? trolls : "Visi gavo!")
            }
        )
    );
        
    addCSS( 
        "p.no-more-amnesty { "+
        "   position: fixed;"+
        "   left: 0px;"+
        "   bottom: 0px;"+
        "   width: auto;"+
        "   background-color: white;"+
        "   border: 1px cyan solid;"+
        "   padding: 2px;"+
        "   margin: 2px;"+
        "}"+
        "p.no-more-amnesty .title { "+
        "   color:red; "+
        "   font-size: 11px;"+
        "}"+
        "p.no-more-amnesty .trollist { "+
        "   color:black; "+
        "   font-size: 9px;"+
        "}"
    );
    
    monitorClass( "no-more-amnesty",
        function(event){
            addCSS( "p.no-more-amnesty { visibility: hidden; }" );
        },
        "click"
    )
}


// ==Configuration==
//   GLOBALŪS PARAMETRAI

//   Jei varikliukas nepalaiko GM_setValue/GM_getValue, parametrus saugosim Cookyje, kurio pavadinimas yra...
const COOKIE_NAME = "tsoc_antitroll";

//   Ir kuris galioje visame portale, 366 paras (0=išsitrins uždarius naršyklę)
const COOKIE_PARAMS = "path=/;expires="+new Date(new Date().getTime()+366*24*60*60*1000).toGMTString();

//   Kokias dėsime CSS klases ir, jei reikės, atributus
const CSS_PREFIX = "-tsoc-antitroll";

//   Dinaminių elementų konteineriai įgis bazines CSS klases, kuriomis bus susieti su
//   komentaru ir autoriumi; visas vizualus funkcionalumas bus vykdomas keičiant CSS taisykles
//   ir nesirūpinant konkrečia puslapio struktūra ar vizualumu.
//   Klasė *-msgId-* būdinga pranešimui, *-nameId-* - vartotojo Id puslapyje;
//     *-container reiškia, kad elementas ir jo turinys priklauso pranešimui msgId ir/arba vartotojui nameId.
//
//   --- ToDo: aprašyti esminių CSS klasių struktūrą ir funkcionalumą ---
const CSS_CONTAINER_CLASSES = "{CSS_PREFIX}-msgId-{msgId} {CSS_PREFIX}-nameId-{nameId} {CSS_PREFIX}-container";


//   PUSLAPIO STRUKTŪRINIAI ELEMENTAI

//   XPath išraiškos, parenkančios elementus. Jomis nurodoma, kaip puslapyje išrinkti aktyvius, 
//   priklausomus objektus, kaip juose pridėti papildomą HTML funkcionalumą, generuojamą šablonais.
//
//   --- ToDo: aprašyti, kaip veikia XPath; rasti klaidas Opera 10.50 ---
const XPATH_SELECTORS = {
        
        // kaip puslapyje surasti visus vardus prie komentarų (forumline lentelėje span name turinys)
        // užklausa: visuose table, kur klasė forumline, išrinkti span, kur klasė name
        userNamesFromRoot : "//table[@class='forumline']//span[@class='name']",
        
        // kaip rasti vartotojo ID einant nuo atitinkamo vardo (spano viduj, nuorodos atributas Name)
        // užklausa: ten pat ieškoti a su atributu name
        messageIdsFromName : "./a/@name",
        
        // sąrašas elementų, kuriuos reikia pažymėti kaip priklausančius vartotojui arba pranešimui
        // (nuo vardo); šitiems uždėsime class="-tsoc-msgId-{msgId} -tsoc-userId-{userId}"
        containersFromName : [
            // aukštyn hierarchija, iki pirmo tr
            "ancestor::tr[position()=1]",
            // tas pats, tik pasirinkti sekantį tr
            "ancestor::tr[position()=1]/following-sibling::tr[position()=1]"
        ],
        
        // Sugeneruojamas turinys kiekvienam komentarui, vardo atžvilgiu (mygtukai)
        // Nurodomas kelias nuo vartotojo vardo komentare ir šablonas, užpildomas CSS
        // klasėmis ir reikšmėmis (ID, tekstais).
        //
        // Šitie gabaliukai įterpiami naudojant insertHTMLAfter() funkciją
        generatedContent : {
        
            // Mygtukas "blokuoti"iškart po vardo
            // užklausa "." = "ten pat"
            "." :   
            
                    // stilius bet koks; nuorodos klasė - kad pasislėptų užblokavus
                    // nuo CSS taisyklių priklauso, kuri mygtukų grupė matoma ir aktyvi
                    // klases *Button aptarnaus Javascriptas
                    // išskirti puslapio semantiniai duomenys aktyvių elementų atributuose 
                    // *-name ir *id.
                    "<div class='name' style='float:right'>"+
                        "<a href='javascript:void(0)' "+
                            
                             // klasė *Button - paspaudimų apdorojimams prikabinti, klasė *-unblocked aktyvi
                             // neblokuotiems autoriams (t.y., blokuoto vartotojo atslėptiems pranešimams
                             // ji negalioja).
                            "class='{CSS_PREFIX}-blockNameButton {CSS_PREFIX}-unblocked' "+
                            
                             // Atributas, iš kurios viena JS funkcija atpažins, kas blokuojama.
                             // Negalim padavinėt parametrų atgal į Greasemonkey dėl saugumo apribojimų!
                             // Vardus ir kitus vartotojo vedamus tekstus būtina užkoduoti (escape).
                            "{CSS_PREFIX}-name='{encodedName}'>"+
                            
                        "[Blokuoti]"+
                        
                        "</a>"+
                    "</div>"+
                    "<div class='name ' style='float:right'>"+
                        "<a href='javascript:void(0)' "+
                            // klasė *-blocked galioja tik blokuotiems vartotojams;
                            // t.y. šiuo atveju matoma tik blokuotų vartotojų atslėptiems pranešimams.
                            "class='{CSS_PREFIX}-unblockNameButton {CSS_PREFIX}-blocked' "+
                            "{CSS_PREFIX}-name='{encodedName}'>"+

                        "[Atblokuoti]"+

                        "</a>"+
                    "</div>",
                    
            // mygtukas "Paslėpti komentarą" komentaro viršuj
            // užklausa: aukštyn iki pirmo tr; paskui žemyn iki pirmo span, kur klasė postdetails
            "ancestor::tr[position()=1]/descendant::span[@class='postdetails' and position()=1]" :
            
                    "<div class='name' style='margin-right:0px;margin-left:auto;float:right;'>"+      
                        "<a href='javascript:void(0)' "+
                            "class='{CSS_PREFIX}-hideMsgButton' "+
                            "{CSS_PREFIX}-msgId='{msgId}'>"+
                            
                        "[Paslėpti komentarą]"+
                        
                        "</a>"+
                    "</div>",
                
            // Papildoma juosta, kai pranešimas paslėptas.
            // Rodomas mygtukas "Rodyti". Įterpiama po antraštės eilute.
            // Užklausa: aukštyn iki pirmo tr, po jo pirmas tr dokumente
            "ancestor::tr[position()=1]/following-sibling::tr[position()=1]":
            
                    // klasė *-hidden-container galioja paslėptiems, *-blocked-container - 
                    // blokuotų vartotojų pranešimams;                    
                    // *-msgId-* atrenka pranešimo CSS, *-nameId-* -vartotojo CSS
                    //'<tr><td><table>'+
                    '<tr class="{CSS_PREFIX}-msgId-{msgId} {CSS_PREFIX}-nameId-{nameId} '+
                            '{CSS_PREFIX}-hidden {CSS_PREFIX}-blocked {CSS_PREFIX}-hidden-container {CSS_PREFIX}-blocked-container">'+
                        '<td class="row1" width="100%" height="28" valign="top" colspan="2" id="tdkomen">'+
                            '<div align="center">'+
                                '<span class="postbody ">Pranešimas ({encodedName}) nerodomas!<br />'+
                                    '<a href="javascript:void(0)" class="{CSS_PREFIX}-unhideMsgButton" {CSS_PREFIX}-msgId="{msgId}">'+
                                        'Rodyti'+
                                    '</a>'+
                                '</span>'+
                            '</div>'+
                        '</td>'+
                    '</tr>',
                    
        },
        
    }

//   Reikia išlaikyti CSS stylesheetų unikalumą - kad nebūtų tam pačiam ir "paslėpta" ir "atslėpta"
//   <style id="..."> formatai:
const CSS_MESSAGE_STYLESHEET_ID = "{CSS_PREFIX}-msgId-{msgId}";
const CSS_NAME_STYLESHEET_ID = "{CSS_PREFIX}-nameId-{nameId}";

//   Naudojami dinaminiai stiliai; visi gabaliukai įterpiami naudojant insertCSS funkciją
const CSS_STYLESHEETS = {

        //  Stilius, kuris užkraunamas pradžioj. Paslepia "atblokavimo"
        //  ir "parodymo" mygtukus, kuriuos generuosim.
        //  Standartiškai visi atblokavimo ir parodymo elementai paslėpti
        customCSS:  "*.{CSS_PREFIX}-hidden, *.{CSS_PREFIX}-blocked,"+
                    "*.{CSS_PREFIX}-hidden-container, *.{CSS_PREFIX}-blocked-container"+
                    "{"+
                        "display: none;"+
                    "}",

        //  Stilius konkrečiam pranešimui paslėpti.
        //  Pranešimas paslepiamas, parodomas atslėpimo turinys
        //  galioja tik vienas hideMsg/unhideMsg taisyklių rinkinys vienu metu 
        //  konkrečiam komentarui ir vartotojui.
        hideMsg:    "*.{CSS_PREFIX}-msgId-{msgId}.{CSS_PREFIX}-container "+
                    "{"+
                        "display: none;"+
                    "}"+
                    
                    "tr.{CSS_PREFIX}-msgId-{msgId} .{CSS_PREFIX}-hidden, "+
                    "tr.{CSS_PREFIX}-msgId-{msgId}.{CSS_PREFIX}-hidden-container "+
                    "{"+
                        "display: table-row;"+
                    "}"+
                    
                    "*.{CSS_PREFIX}-msgId-{msgId} .{CSS_PREFIX}-hidden, "+
                    "*.{CSS_PREFIX}-msgId-{msgId}.{CSS_PREFIX}-hidden-container "+
                    "{"+
                        "display: block;"+
                    "}",

        //  Stilius užblokuoto vartotojo arba paprastam pranešimui atslėpti
        //  Turi prioritetą prieš vartotojo blokavimą!
        unhideMsg:  "tr.{CSS_PREFIX}-msgId-{msgId}.{CSS_PREFIX}-container "+
                    "{"+
                        "display: table-row !important;"+
                    "}"+
                    
                    "*.{CSS_PREFIX}-msgId-{msgId}.{CSS_PREFIX}-container "+
                    "{"+
                        "display: block !important;"+
                    "}"+
                    
                    "*.{CSS_PREFIX}-msgId-{msgId} .{CSS_PREFIX}-hidden,"+
                    "*.{CSS_PREFIX}-msgId-{msgId}.{CSS_PREFIX}-hidden-container "+
                    "{"+

                        "display: none !important;"+
                    "}",

        //  Stilius užblokuoto vartotojo pranešimams.
        //  Rodomi atblokavimo mygtukai.
        blockName:  "*.{CSS_PREFIX}-nameId-{nameId}.{CSS_PREFIX}-container, "+
                    "*.{CSS_PREFIX}-nameId-{nameId} .{CSS_PREFIX}-unblocked "+
                    "{"+
                        "display: none;"+
                    "}"+
                    
                    "tr.{CSS_PREFIX}-nameId-{nameId} .{CSS_PREFIX}-blocked, "+
                    "tr.{CSS_PREFIX}-nameId-{nameId}.{CSS_PREFIX}-blocked-container "+
                    "{"+
                        "display: table-row;"+
                    "}"+
                    
                    "*.{CSS_PREFIX}-nameId-{nameId} .{CSS_PREFIX}-blocked,"+
                    "*.{CSS_PREFIX}-nameId-{nameId}.{CSS_PREFIX}-blocked-container "+
                    "{"+
                        "display: block;"+
                    "}",
                    
    }


// Globalus kintamasis. Sunumeruoti vardai, aptikti puslapyje, pvz:
//    { rwc : 1, "Vardenis Pavardenis" : 2 }
// Šitie ID bus naudojami CSS klasėms ir pan..
// Pavyzdžiui, CSS klasė *-nameId-2 būtų būdinga "Vardeniui Pavardeniui";
// Mygtukas, kuris turės atributą *-nameId = "2", žinos,
// kad jam reikia kažką daryti su Vardeniu Pavardeniu.
var nameIds = {}
var trolls = {}
var hiddenMessages = {}
var unhiddenMessages = {}

    
// Visų sugeneruotų ir perimamų paspaudimo apdorojimų valdikliai
// Nurodoma CSS klasė ir funkcija. Reikalingi parametrai paimami
// iš paties mygtuko
const CLICK_EVENT_LISTENERS = {
    "{CSS_PREFIX}-hideMsgButton":
        function( event ){
            hideMessage(
                event.target.getAttribute(
                    fillTemplate( "{CSS_PREFIX}-msgId", {CSS_PREFIX:CSS_PREFIX} )
                )
            );
            return false;
        },

    "{CSS_PREFIX}-unhideMsgButton":
        function( event ){
            unhideMessage(
                event.target.getAttribute(
                    fillTemplate( "{CSS_PREFIX}-msgId", {CSS_PREFIX:CSS_PREFIX} )
                )
            );
            return false;
        },
        
    "{CSS_PREFIX}-blockNameButton":
        function( event ){
            var name = event.target.getAttribute(
                    fillTemplate( "{CSS_PREFIX}-name", {CSS_PREFIX:CSS_PREFIX} ));
            hideName( nameIds[name] );
            trolls[name]=1;
            saveTrolls( trolls );
            return false;
        },

    "{CSS_PREFIX}-unblockNameButton":
        function( event ){
            var name = event.target.getAttribute(
                    fillTemplate( "{CSS_PREFIX}-name", {CSS_PREFIX:CSS_PREFIX} ));
            unhideName( nameIds[name] );
            trolls[name]=0;
            saveTrolls( trolls );
            return false;
        }

}  
// ==/Configuration==



// --- O ŠTAI IR KODAS ---
function onLoad()
{

    // Pradžioj užkraunam CSS, kuris paslėptų sugeneruotus "atblokavimo" ir "parodymo" fragmentus
    // Čia ir toliau fillTemplate paduodamos globalios konstantos ir vidiniai kintamieji 
    // įvilkti į parametrų objektą tais pačiais vardais.
    addCSS( fillTemplate( CSS_STYLESHEETS.customCSS, {CSS_PREFIX:CSS_PREFIX} ));
    
    
    // Vieno komentaro apdorojimas užkraunant. Paduodamas elementas su vardu.
    // Kadangi vardai laisvos formos, sugeneruosim jiems nuoseklius skaitinius ID
    var maxNameId = 0;

    function processComment( nameNode ){
        // Paimam vardą iš paduoto elemento turinio ir sugeneruojam jam ID
        var name = nameNode.textContent;
        var nameId = nameIds[name];
        if(!nameIds[name]){
            nameId = nameIds[name] = ++maxNameId;
            //GM_log(name+" "+nameId);
        }
        
        // Randam komentaro ID
        var messageId = queryFirst(nameNode, XPATH_SELECTORS.messageIdsFromName).textContent;

        // Paženklinam CSS klasėm visas komentaro dalis (konteinerius)
        for(var i=0; i<XPATH_SELECTORS.containersFromName.length; i++){
            iterateOverQuery( nameNode, XPATH_SELECTORS.containersFromName[i], processCommentContainer,
                {CSS_PREFIX:CSS_PREFIX,msgId:messageId,nameId:nameId} );
        }
        
        // Papildom visus sugeneruotu turiniu
        var gc = XPATH_SELECTORS.generatedContent;
        //GM_log(gc);
        for(var i in gc){            
            if(gc.hasOwnProperty(i)){
                iterateOverQuery( nameNode, i, insertHTMLAfter,
                    fillTemplate( gc[i],
                        {CSS_PREFIX:CSS_PREFIX,msgId:messageId,nameId:nameId,encodedName:xmlEncode(name)}
                    )
                );
            }
        }
              
    }
    
    // Sukabinam įvykių apdorojimą pagal CSS klases
    function setupClickListeners(){        
        var cel = CLICK_EVENT_LISTENERS;
        for(var i in cel){            
            if(cel.hasOwnProperty(i)){            
                var nodes = document.getElementsByClassName( fillTemplate( i, {CSS_PREFIX:CSS_PREFIX} ) );
                
                for(var j=0; j<nodes.length; j++){
                    //GM_log(nodes[j]);
                    nodes[j].addEventListener( "click", cel[i], false );
                }
            }
        } 
    }

    // Kažką padarom su kievienu elementu, priklausančiu pranešimui.
    // Šiuo atveju - pažymim pagal vartotoją, pranešimo ID ir kad konteineris.
    function processCommentContainer( containerNode, params ){    
        containerNode.className += fillTemplate(" "+CSS_CONTAINER_CLASSES, params);
    }
     
    // Užkraunam trolių sąrašą ir juos paslepiam   
    function processSavedTrolls(){
        trolls = loadTrolls();
        for(var i in trolls){
            if(trolls.hasOwnProperty(i) && trolls[i] && nameIds[i]){
                hideName( nameIds[i] );
            }
        }
    }

    // Pamatuosim ir laiką. Pradžia.
    var start=new Date().getTime();
    
    // Perbėgam per visus komentarus ir juos modifikuojam (pridedam mygtukus, CSS klases)
    iterateOverQuery( document, XPATH_SELECTORS.userNamesFromRoot, processComment );
    // Paslepiam trolius iš ankstesnės sesijos
    processSavedTrolls();
    // Sukabinam funkcijas mygtukams
    setupClickListeners();
    
    // Paskaičiuojam ir konsolėj atspausdinam laiką
    GM_log("Duration: "+(new Date().getTime() - start)+"ms");
    
    // Jei yra funkcija demo(), ją įvykdom
    if(typeof demo == "function")demo();
    
    //    Viskas ;]
    //    Žemiau tarnybinės funkcijos.

    
    
}

// Keturių rūšių mygtukų aptarnavimas

function hideMessage( msgId ){
    GM_log("Hiding message ID="+msgId);
    var stylesheetId = fillTemplate( CSS_MESSAGE_STYLESHEET_ID, {CSS_PREFIX:CSS_PREFIX,msgId:msgId} );
    var stylesheet = document.getElementById( stylesheetId );
    if(stylesheet){
        stylesheet.parentNode.removeChild( stylesheet );
    }
    
    addCSS( fillTemplate( CSS_STYLESHEETS.hideMsg, {CSS_PREFIX:CSS_PREFIX,msgId:msgId} ), stylesheetId );
}

function unhideMessage( msgId ){
    GM_log("Unhiding message ID="+msgId);
    var stylesheetId = fillTemplate( CSS_MESSAGE_STYLESHEET_ID, {CSS_PREFIX:CSS_PREFIX,msgId:msgId} );
    var stylesheet = document.getElementById( stylesheetId );
    if(stylesheet){
        stylesheet.parentNode.removeChild( stylesheet );
    }
    
    addCSS( fillTemplate( CSS_STYLESHEETS.unhideMsg, {CSS_PREFIX:CSS_PREFIX,msgId:msgId} ), stylesheetId );
}

function hideName( nameId ){
    GM_log("Hiding user ID="+nameId);
    var stylesheetId = fillTemplate( CSS_NAME_STYLESHEET_ID, {CSS_PREFIX:CSS_PREFIX,nameId:nameId} );
    var stylesheet = document.getElementById( stylesheetId );
    if(stylesheet){
        stylesheet.parentNode.removeChild( stylesheet );
    }
    
    addCSS( fillTemplate( CSS_STYLESHEETS.blockName, {CSS_PREFIX:CSS_PREFIX,nameId:nameId} ), stylesheetId );
}

function unhideName( nameId ){
    GM_log("Unhiding user ID="+nameId);
    var stylesheetId = fillTemplate( CSS_NAME_STYLESHEET_ID, {CSS_PREFIX:CSS_PREFIX,nameId:nameId} );
    var stylesheet = document.getElementById( stylesheetId );
    if(stylesheet){
        stylesheet.parentNode.removeChild( stylesheet );
    }
}

// Saugyklos aptarnavimas

function loadTrolls(){
    var trolls = {}
    var storedTrollNames = GM_getValue("trolls");
    
    GM_log("Loaded trolls: "+storedTrollNames );
    
    if(!storedTrollNames) return {};
    
    var trollList = JSON.parse(storedTrollNames);
    for(var i=0; i<trollList.length; i++){
        trolls[trollList[i]] = 1;        
    }
    
    return trolls;
}

function saveTrolls( trolls ){
    var trollList = [];
    GM_log(1);
    for(var i in trolls){
        if(trolls.hasOwnProperty(i) && trolls[i]){
            trollList.push(i);
        }
    }
    GM_log(2);    
    GM_setValue( "trolls", JSON.stringify(trollList) );
    
    GM_log("Saved trolls: ", JSON.stringify(trollList) );
}


// Bazinių funkcijų biblioteka.

// rwc tarnybinės funkcijos


function iterateOverQuery( root, query, func, params ){
    var nodes = document.evaluate(query, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
    for(var i=0; i<nodes.snapshotLength; i++){
        func( nodes.snapshotItem(i), params );
    }
}

function queryFirst( root, query ){
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


function fillTemplate( template, values ){
    for(var i in values){
        if(values.hasOwnProperty(i)){
            template = template.replace( new RegExp("{"+i+"}","g" ), values[i] );
        }
    }
    return template;
}

function insertHTMLAfter( node, html ){
    var parent = node.parentNode;
    var sibling = node.nextSibling;
    
    var tag = (parent && parent.tagName) || "html";

    var div;



    if( {"tbody":1,"tcaption":1,"tfoot":1}[tag.toLowerCase()] ){
        //var outer = document.createElement("table");
        //outer.appendChild( div = outer.createTHead() );
        div = document.createElement("div");
        div.innerHTML = fillTemplate("<table><{tag}>{html}</{tag}></table>", {tag:tag,html:html});
        div = div.firstChild.firstChild;
        
    }else{
    	div = document.createElement(tag);
        div.innerHTML = html;
    }

    while(fc = div.firstChild){
        parent.insertBefore(fc.cloneNode(true),sibling);
        div.removeChild(fc);
    }
}

function xmlEncode(string) {
    return string.replace(/\&/g,'&'+'amp;').replace(/</g,'&'+'lt;')
        .replace(/>/g,'&'+'gt;').replace(/\'/g,'&'+'apos;').replace(/\"/g,'&'+'quot;');
}


var addCSS = function( cssText, id ){
    var css = document.createElement("style");
    css.setAttribute("type","text/css");
    if(typeof id != typeof undefined){
        css.setAttribute( "id", id );
    }
    var cssTextNode = document.createTextNode(cssText);
    css.appendChild(cssTextNode);
    document.getElementsByTagName("head").item(0).appendChild(css);
    return css;
}


var monitorClass = function( cls, fn, t ){
    t = !!t || 'click';
    var nodes = document.getElementsByClassName( cls );
                
    for(var j=0; j<nodes.length; j++)
        nodes[j].addEventListener( "click", fn, false );
}

// Greasemonkey funkcijų emuliacija

var GM_log =    
    (typeof(unsafeWindow)!=typeof undefined) && (!!unsafeWindow.console) && unsafeWindow.console.log 
            && function fb$log(){unsafeWindow.console.log.apply(unsafeWindow.console,arguments)} ||
    (typeof console!=typeof undefined)  && (!!console) && console.log &&
            function fb$log(){console.log.apply(console,arguments)} ||
    (typeof opera!=typeof undefined) && (!!opera) && opera.postError ||
    (typeof GM_log!=typeof undefined) && GM_log ||
    Function();


var GM_setValue =
    (typeof GM_setValue != typeof undefined) && GM_setValue ||
    (typeof localStorage != typeof undefined) &&
        function localStorage$setItem( key, val ){
            return localStorage.setItem(key,val)
        }
    ||
    function setCookie( key, val ){
        document.cookie = COOKIE_NAME+"-"+encodeURIComponent(key) + "="+ encodeURIComponent(val)+
            ";"+COOKIE_PARAMS;
    };

var GM_getValue = (typeof GM_getValue != typeof undefined) && GM_getValue ||
    (typeof localStorage != typeof undefined) &&
        function localStorage_getItem( key ){
            return localStorage.getItem(key)
        }
    ||
	function getCookie( key )
    {
        var match = null;
        if( match = new RegExp(COOKIE_NAME+"-"+encodeURIComponent(key)+'\=([^;]*);','').exec(document.cookie+';') )
        {
            return decodeURIComponent(match[1]);
        }
	    return null;
    }
    
var GM_deleteValue = (typeof GM_deleteValue != typeof undefined) && GM_deleteValue ||
    (typeof localStorage != typeof undefined) &&
        function localStorage_getItem( key ){
            return localStorage.removeItem(key)
        }
    ||
	function deleteCookie( key ){
        document.cookie = COOKIE_NAME+"-"+encodeURIComponent(key);
    };



//  JSON palaikymas senesnėms naršyklėms.

var JSON;

if(window.JSON){
    JSON = window.JSON;
}else{
/*
    http://www.JSON.org/json2.js
    2009-08-17

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html
*/
JSON={};
(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}())
};

onLoad();}catch(e){ alert(e) };})()