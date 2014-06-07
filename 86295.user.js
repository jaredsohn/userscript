// ==UserScript==
// @name            OAGRA fix
// @namespace       http://wy.pe/
// @description     Hace funcionar los "links" de la pagina principal de OAGRA de la UNAC, en browsers que no interpretan VBScript. Esto lo realiza reemplazando el atributo "href" de los anchors que contengan "vbscript".
// @include         http://oagra.unac.edu.pe/
// @version         0.1
// @author          Hans Roman
// @license         GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var ss = document.getElementsByTagName('script'),
    aa = document.getElementsByTagName('a'),
    rgx = /(\w+|\w+[\\]?\w+\.)(?:\(\)|aspx?|html?)/g,
    i = 0,
    vbs = [],
    dict = {};

for (; i < ss.length; i++) 
    if (!ss[i].type && ss[i].attributes[0].nodeValue.toLowerCase() === 'vbscript') {
        vbs = ss[i].text.toLowerCase()
                .split('end function')
                .map(function (x) { return x.match(rgx); });
        vbs.pop()
        break;
    }

if (vbs.length > 0) {

    vbs.forEach(function (x) { dict[x[0]] = x[1].replace('\\', '/'); });

    for (i = 0; i < aa.length; i++) 
        if (aa[i].href.match(/vbscript/)) {
            var func = aa[i].href.split(':')[1];            
            aa[i].href = dict[func];
        }
}
