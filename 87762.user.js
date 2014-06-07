// ==UserScript==
                // @name           Menu Diplomatique Lirix/Daiv
                // @version        0.1.5
                // @namespace      Menu Diplomatique Lirix/Daiv
                // @description    Un petit menu pour les diplos -R-
                // @include        http://s3.fr.ikariam.*/index.php*
                // ==/UserScript==
                // ===========================================================================
                //
                // Un melange de plusieurs scripts adaptes pour les besoins des diplomates par Piwiix
                // Ikariam and WikIkariam are copyrighted by their respective owners.
                // menu ODL
                //
                var tagsAModificar = new Array("A","SPAN");
                var diaLimite     = 2;
                var cookieIKO    = 'IKAFONT';
                var cookie_SEPARA    = '|';
                var css_MenuIKO_String = '#menu {'
                + 'align:right;'
                + 'margin-left: 750.5px;'
                + 'margin-top: -16.4px;'
                + 'color:white;'
                + 'width: 60px;'
                + 'cursor: arrow;'
                + '}'
                + '#menu ul {'
                + 'list-style: none;'
                + 'margin: 0;'
                + 'padding: 0;'
                + 'width: 13em;'
                +'}'
                + '#menu a, #menu h2 {'
                + 'font: bold 11px/16px arial, helvetica, sans-serif;'
                + 'display: block;'
                + 'margin: 0;'
                + 'padding: 2px 3px;'
                + 'cursor: hand;'
                + '}'
                + '#menu a {'
                + 'color: RGB(84,44,15);'
                //Couleur du menu
                + 'background: RGB(244,230,173);'
                + 'border: double 3px RGB(84,44,15);'
                + 'border-left: double 3px RGB(84,44,15);'
                + 'border-right: double 3px RGB(84,44,15);'
                + 'text-decoration: none;'
                + '}'
                + '#menu a:hover {'
                + 'color: RGB(84,44,15);'
                //Couleur du menu survolÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©
                +'background: RGB(222,180,120);'
                +'border: double 5px RGB(84,44,15);'
                +'}'
                +'#menu li {position: relative; }'
                +'#menu ul ul {'
                +'position: relative;'
                +'z-index: 500;'
                +'}'
                +'#menu ul ul ul {'
                +'position: absolute;'
                +'top: 0;'
                +'left: 100%;'
                +'}'
                +'div#menu ul ul,'
                +'div#menu ul li:hover ul ul,'
                +'div#menu ul ul li:hover ul ul'
                +'{display: none;}'
                +'div#menu ul li:hover ul,'
                +'div#menu ul ul li:hover ul,'
                +'div#menu ul ul ul li:hover ul'
                +'{display: block;}';
                //questa funzione ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ quasi standard, usata in molti script greasemonkey
                if(!window.add_Global_Style){
                       function add_Global_Style(css) {
                               var head, style;
                               head = document.getElementsByTagName('head')[0];
                               if (!head) { return; }
                               style = document.createElement('style');
                               style.type = 'text/css';
                               style.innerHTML = css;
                               head.appendChild(style);
                       }
                }
                
                function getAlltagsAModificar(){
                
                var arrResult = new Array();
                var lastI     = 0;
                var xTags     = null;
                
                for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
                xTags = document.getElementsByTagName(tagsAModificar[tagX]);
                for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
                }
                
                return arrResult;
                
                }
                
                unsafeWindow.setFontIka = function () {
                 var FamilyIndex = document.getElementById("Family").selectedIndex;
                 var FI = document.getElementById("Family").options[FamilyIndex].text;
                 changeAllFamily(FI);
                 var SizeIndex = document.getElementById("Size").selectedIndex;
                 var SI = document.getElementById("Size").options[SizeIndex].text;
                 changeAllSize(SI);
                 var ColorIndex = document.getElementById("Color").selectedIndex;
                 var CI = document.getElementById("Color").options[ColorIndex].text;
                 changeAllColor(CI);
                 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
                }
                function createCookie(name,value,days) {
                       if (days) {
                               var date = new Date();
                               date.setTime(date.getTime()+(days*24*60*60*1000));
                               var expires = "; expires="+date.toGMTString();
                       }
                       else var expires = "";
                       document.cookie = name+"="+value+expires+"; path=/";
                }
                function readCookie(c_name) {
                       if (document.cookie.length>0)
                 {
                 c_start=document.cookie.indexOf(c_name + "=");
                 if (c_start!=-1)
                   {
                   c_start=c_start + c_name.length+1;
                   c_end=document.cookie.indexOf(";",c_start);
                   if (c_end==-1) c_end=document.cookie.length;
                   return unescape(document.cookie.substring(c_start,c_end));
                   }
                 }
                       return "";
                }
                function initFont(){
                var rC     = readCookie(cookieIKO);
                if (rC){
                var myFont = rC.split(cookie_SEPARA);
                changeAllFamily(myFont[0]);
                changeAllSize(myFont[1]);
                changeAllColor(myFont[2]);
                }
                }
                function eraseCookie(name) {
                       createCookie(name,"",-1);
                }
                function changeAllFamily(valueOfSelect){
                var dataToChange = getAlltagsAModificar();
                for (i=0;i<dataToChange.length;i++){
                 dataToChange[i].style.fontFamily = valueOfSelect;
                }
                }
                function changeAllSize(valueOfSelect){
                var dataToChange = getAlltagsAModificar();
                for (i=0;i<dataToChange.length;i++){
                 dataToChange[i].style.fontSize = valueOfSelect;
                }
                }
                function changeAllColor(valueOfSelect){
                var dataToChange = getAlltagsAModificar();
                for (i=0;i<dataToChange.length;i++){
                 dataToChange[i].style.color = valueOfSelect;
                }
                }
                unsafeWindow.clearFont = function(){
                eraseCookie(cookieIKO);
                window.location.reload();
                }
                function addIKOS_ToolsMenu(){
                
                var xTags = document.getElementsByTagName('LI');
                var xLi   = null;
                var IKOSTools_Link       = document.createElement('LI');
                IKOSTools_Link.setAttribute('id', 'IKOSTools');
                
                for(i=0;i<xTags.length;i++){
                xLi = xTags[i];
                if (xLi.className == 'help') {
                xLi.parentNode.appendChild(IKOSTools_Link,xLi);
                add_Global_Style(css_MenuIKO_String);
                document.getElementById('IKOSTools').innerHTML =
                '<div id="menu">'
                + '<ul>'
                + ' <li><h2>Menu diplomatique</h2>'
                + '   <ul>'
                + '     <li><center><a target="_blank" href="http://requins-marteaux.xooit.fr/index.php" title="Forum de notre alliance">Forum des Requins</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=922" title="Contacter Prissou diplomate RESPc">Prissou, diplo RESPc</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=40437" title="Contacter Démona diplomate T-P">Démona, diplo T-P</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=35986" title="Contacter Ajaax diplomate Valko">Ajaax, diplo Valko</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=31773" title="Contacter Mickeli diplomate Nours">Mickeli, diplo Nours</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=61886" title="Contacter Vany diplomate Lion">Vany, diplo Lion</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=5419" title="Contacter brenadon31 diplomate ODIN">brenadon31, diplo ODIN</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=62271" title="Contacter niko62 diplomate Ojah">niko62, diplo Ojah</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=104895" title="Contacter lacarabosse diplomate -LR-">lacarabosse, diplo -LR-</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=2672" title="Contacter roderic diplomate Mort">roderic, diplo Mort</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=98806" title="Contacter mora diplomate RIP">Mora, diplo RIP</a></li>'
                + '     <li><center><a target="_blank" href="http://s3.fr.ikariam.com/index.php?view=sendIKMessage&msgType=52&receiverId=15228" title="Contacter Iron diplomate Elus">Iron, diplo Elus</a></li>'
                + '     <li><center><a target="title="">Outils</a></li>'
                + '		<li><center><a target="_blank" href="http://ikariamlibrary.com/?content=IkaFight" title="Simuler un combat">Simulateur de bataille</a></li>'
                + '     <li><center><a target="_blank" href="http://www.ika-world.com/search.php?view=suche_stadt" title="Rechercher des infos sur un joueur (coordonnées, villes, etc)">Chercher un joueur</a></li>'
                + '     <li><center><a target="_blank" href="http://userscripts.org/scripts/source/87762.user.js" title="Mettre a jour votre Script --R--">Mise a jour</a></li>'
                + '	 </ul>'
                +'</DIV>';
                
                break;
                }}}
                addIKOS_ToolsMenu();