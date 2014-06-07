// ==UserScript==
// @name           Meniul Aliantei Lyons v2.0
// @version        2.0
// @namespace      Meniu Alianta 
// @description    Meniu pentru alianta Lyons
// @include        http://s1.ikariam.ro/index.php*
// ==/UserScript==
// ===========================================================================
//
//
var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'
+ 'align:right;'
+ 'margin-left:750.5px;'
+ 'margin-top: -16.5px;'
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
+ 'background: RGB(246,235,188);'
+ 'border: double 3px RGB(84,44,15);'
+ 'border-left: double 3px RGB(84,44,15);'
+ 'border-right: double 3px RGB(84,44,15);'
+ 'text-decoration: none;'
+ '}'
+ '#menu a:hover {'
+ 'color: RGB(84,44,15);'
//Couleur du menu survolé
+'background: RGB(222,180,120);'
+'border: double 3px RGB(84,44,15);'
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
//acest script este facut de RazvIy. Functioneaza doar pe s1.ikariam.ro, alaturi de GreaseMonkey.
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
+ ' <li><h2>Meniu Lyons</h2>'
+ '   <ul>'
+ '     <li><center><a target="_blank" href="http://xat.com/Lyons_DKM" title="Chatul oficial al aliantei Lyons">Chat Lyons</a></li>'
+ '     <li><center><a target="_blank" href="http://lyons.forumgratuit.ro/" title="Forumul aliantei Lyons">Forum Lyons</a></li>'
+ '     <li><center><a href="http://s1.ikariam.ro/index.php?view=embassy&id=73756&position=11" title="Membrii din alianta Lyons">Alianta</a></li>'
+ '     <li><center><a href="http://s1.ikariam.ro/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50" title="Trimite un mesaj la toata alianta">Mesaj la toata alianta</a></li>'
+ '	<li><center><a target="_blank" href="http://ikariamlibrary.com/?content=IkaFight" title="Simulati o lupta aici!">Simulator de lupta</a></li>'
+ '     <li><center><a target="_blank" href="http://www.ika-world.com/ro/suche.php?view=suche_stadt&land=ro" title="Detalii despre jucatori, orase, aliante">Cautare informatii despre jucatori</a></li>'
+ '     <li><center><a target="_blank" href="http://s1.ikariam.ro/index.php?view=informations&articleId=10000&mainId=10000" title="Detalii despre jocul Ikariam">Ikipedia</a></li>'
+ '	 </ul>'
+'</DIV>';

break;
}}}
addIKOS_ToolsMenu();



// ----------------------- //
// ------- HARTA --------- //
// ----------------------- //

// ------- Setari -------- //
var type = '1';                // 0: nu arata nimic, 1: arata tipul de resursa de pe insula, 2: arata +10% minuni, 3: arata ambele
var color = 'DarkSlateBlue';   // orice culoare compatibila HTML
var opacity = '100';           // opacitate culoare (0 - invisibila - 100 - vizibila la maxim) 
// ------- /Setari ------- //



// Credit to Johan Sundström
function $x( xpath, root ) {
        var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
        var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
        switch (got.resultType) {
                case got.STRING_TYPE:
                        return got.stringValue;
                case got.NUMBER_TYPE:
                        return got.numberValue;
                case got.BOOLEAN_TYPE:
                        return got.booleanValue;
                default:
                        while (next = got.iterateNext())
                                result.push( next );
                                return result;
        }
}
function $X( xpath, root ) {
        var got = $x( xpath, root );
        return got instanceof Array ? got[0] : got;
}

// Credit to Martin Withaar
function unique(a) {
        var r = new Array();
        o:for(var i = 0, n = a.length; i < n; i++) {
                for(var x = 0, y = r.length; x < y; x++)
                        if(r[x]==a[i]) continue o;
                r[r.length] = a[i];
        }
        return r;
}

// Credit to Stephen Chapman
Array.prototype.max = function() {
        var max = this[0];
        var len = this.length;
        for (var i = 1; i < len; i++) if (this[i] > max) max = this[i];
        return max;
}
Array.prototype.min = function() {
        var min = this[0];
        var len = this.length;
        for (var i = 1; i < len; i++) if (this[i] < min) min = this[i];
        return min;
}


var cities = $x('id("memberList")/tbody/tr/td[@class="cityInfo"]//a[@class="city"]');
var server = location.host;

if(cities != "") {
        function makeMap() {
                function makeArray(elem) {
                        [coord, y, x] = elem.textContent.match(/(\d+):(\d+)/);
                        ys.push(parseInt(y));
                        xs.push(parseInt(x));
                        islands.push(coord);
                }
        
                var islands = [], ys = [], xs = [];
                cities.forEach(makeArray);
                islands = unique(islands);
                
                var yMin = ys.min(), yMax = ys.max();
                var xMin = xs.min(), xMax = xs.max();
                var width = (yMax - yMin) + 25;
                var height = (xMax - xMin) + 25;
                var center = 'y='+ Math.round((yMin + yMax) / 2) +
                            '&x='+ Math.round((xMin + xMax) / 2);

                var url = 'http://ecmanaut.googlecode.com/svn/trunk/sites/ikariam.org/kronos-utils/'+
                          'minimap.html?s='+ server +'&r='+ type +
                          '&'+ center +'&w='+ width +'&h='+ height +'&'+ color +'/'+ opacity +'='+ islands;
                window.open(url, '_blank');
        }

        var header = $X('id("memberList")/thead/tr/th[3]');
        var link = document.createElement('strong');
        link.innerHTML = ' (<a href="#">Harta</a> )';
        link.style.cursor = 'pointer';
        link.addEventListener('click', makeMap, false);
        header.appendChild(link);
}