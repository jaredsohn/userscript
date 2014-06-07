// ==UserScript==
// @name           OGame Linkeador de cordenadas
// @author Editado por Lordmokuba
// @description    convierte las cordenadas en enlaces
// @include        http://ogame*.de/game/*.php*
// ==/UserScript==

(function () {

const miPlanetaCoords = "9:999:9";
const miPlanetaNombre = "Nombre Planeta";
const miServidor = "ogame443.de";

  var sesion = /session=([a-z0-9]+)/.exec(document.body.innerHTML)[0];
	const urlRegex =/(\[([1-9]):([0-9]{1,3}):(1[0-5]|[1-9])\])/ig;
    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body",
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em",
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike",
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];

    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var t0 = new Date().getTime();
    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (urlRegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;

            cand.parentNode.replaceChild(span, cand);

            urlRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = urlRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

                var a = document.createElement("a");
                a.setAttribute("href", "http://"+miServidor+"/game/galaxy.php?"+sesion+"&p1="+match[2]+"&p2="+match[3]);
                GM_setValue("ogame_planet_to_highlight",match[4]);
                a.appendChild(document.createTextNode(match[1] == miPlanetaCoords? "" : match[1]));
                span.appendChild(a);

                lastLastIndex = urlRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex))); // ese 1 para que no tome la [
            span.normalize();
        }
    }
    var t1 = new Date().getTime();
    //alert((t1 - t0) / 1000);


    var planeta = GM_getValue("ogame_planet_to_highlight");

if (false)
{
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++)
  {
    var enlace = links[i].firstChild.nodeValue + '';
    if (enlace.match(/[1-9]|1[0-5]/))
    {
      var th = document.createElement('th');
       links[i].parentNode.parentNode.insertBefore(th,links[i].parentNode.parentNode.firstChild);

       if (enlace == planeta)
          th.appendChild(document.createTextNode('>'));
    }

  }
}


})();