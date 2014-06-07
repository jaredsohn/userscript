// ==UserScript==
                // @name           Menu des AsA
                // @version        0.8.0
                // @namespace      Menu AsA
                // @description    Un petit menu pour les AsA du serveur Alpha d'ikariam.fr
                // @include        http://s1.fr.ikariam.*/index.php*
                // ==/UserScript==
                // ===========================================================================
                //
                // Un melange de plusieurs scripts adaptes pour les besoins des AsA (par Bagfender).
                // Ikariam and WikIkariam are copyrighted by their respective owners.
                // menu ODL
                //
                var tagsAModificar = new Array("A","SPAN");
                var diaLimite     = 2;
                var cookieIKO    = 'IKAFONT';
                var cookie_SEPARA    = '|';
                var css_MenuIKO_String = '#menu {'
                + 'align:right;'
                + 'margin-left: 810.5px;'
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
                //Couleur du menu survolÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©
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
                //questa funzione ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¿ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ quasi standard, usata in molti script greasemonkey
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
                + ' <li><h2>AsA</h2>'
                + '   <ul>'
                + '     <li><center><a target="_blank" href="http://amazonsalliance.forum-actif.net/login.forum?connexion" title="Forum de notre alliance">Forum des AsA</a></li>'
                + '     <li><center><a target="_blank" href="http://s1.fr.ikariam.com/index.php?view=sendIKMessage&receiverId=91487" title="Contacter Bagfender Chef du peuple AsA">Message au Chef</a></li>'
                + '     <li><center><a target="_blank" href="http://s1.fr.ikariam.com/index.php?view=sendIKMessage&receiverId=91487" title="Contacter Bagfender Diplomate AsA">Message au Diplomate</a></li>'
                + '     <li><center><a target="_blank" href="http://s1.fr.ikariam.com/index.php?view=sendIKMessage&receiverId=154534" title="Contacter Mersoleil Ministre AsA">Message au Ministre</a></li>'
                + '     <li><center><a target="_blank" href="http://s1.fr.ikariam.com/index.php?view=sendIKMessage&receiverId=109301" title="Contacter Insomnisiac General AsA">Message au General</a></li>'
                + '     <li><center><a target="_blank" href="http://s1.fr.ikariam.com/index.php?view=sendIKMessage&allyId=7039&msgType=51" title="Envoyer un message a tous les membres">Message a tous les membres AsA</a></li>'
                + '     <li><center><a target="_blank" href="http://ikariam.malisis.net/" title="Convertir un rapport de combat">Convertisseur de RC</a></li>'
                                + '     <li><center><a target="_blank" href="http://www.ika-world.com/search.php?view=suche_stadt" title="Rechercher des infos sur un joueur (coodonnees, villes, etc)">Chercher un joueur</a></li>'
                + '     <li><center><a target="_blank" href="http://support.ikariam.fr/" title="Contacter le Support Ikariam">Support Ikariam</a></li>'
                + '     <li><center><a target="_blank" href="http://userscripts.org/scripts/source/45504.user.js" title="Mettre a jour votre Script AsA">Mise a jour</a></li>'
                + '	 </ul>'
                +'</DIV>';
                
                break;
                }}}
                addIKOS_ToolsMenu();
