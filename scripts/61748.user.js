// ==UserScript==
// @name          Travian Safe Links
// @author        Orekaria
// @description   Converts most of the links within Travian to be safe when playing a multiaccount.
// @version       1.0
// @include       http://s*.travian.*/*
// ==/UserScript==

// This is the frankensteinian way of coding

var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var dom = new DOMUtils();


var loadedVillageNewdid;
// get the village id that loaded the page
var td = dom.find('//td[contains(@class, "dot hl")]', XPFirst);
if (td){
	var huu = td.parentNode.childNodes[1].getElementsByTagName("A")[0].href;
	huu = huu.match(/newdid\=(\d+)/).pop();
	loadedVillageNewdid = huu;
	// GM_log(huu);

	// haz todos los links, seguros
	// cosecha todos los elementos que hay que asegurar y su nombre de atributo
	var asegurarEstosElementos = new Array();
	// GM_log("links en la página = " + document.links.length);
	//var linkCount = document.links.length;
	for (var i = 0; i < document.links.length; i++){
		var link = document.links[i];
		var href = link.getAttribute("href");
		// GM_log(href);
		var flAsegurar = false;
		if (href.indexOf("dorf1.php") > -1)
			flAsegurar = true;
		if (href.indexOf("dorf2.php") > -1)
			flAsegurar = true;
		if (href.indexOf("build.php") > -1)
			flAsegurar = true;
		if (href.indexOf("a2b.php") > -1)
			flAsegurar = true;
		if (href.indexOf("karte.php") > -1)
			flAsegurar = true;
		
		if (flAsegurar){
			asegurarEstosElementos[asegurarEstosElementos.length] = [link, "href"];
			// GM_log("link encontrado = " + href + ", " + flAsegurar + ", " + asegurarEstosElementos[asegurarEstosElementos.length -1]);
		}

	}

	// GM_log("asegurarEstosElementos.length = " + flAsegurar + asegurarEstosElementos.length);
	
	var forms = document.getElementsByTagName("form");
	// GM_log(document.getElementsByTagName("form").length);
	
	for (var i = 0; i < forms.length; i++){
		form = forms[i];
		// GM_log(form);
		asegurarEstosElementos[asegurarEstosElementos.length] = [form, "action"];
		// GM_log("form Action = " + form.getAttribute("action"));
	}
	
	// GM_log("cantidad a asegurar = " + asegurarEstosElementos.length);
	
	// asegura todos los links
	for (var i = 0; i < asegurarEstosElementos.length; i++){
		var link = asegurarEstosElementos[i][0];
		var attrib = asegurarEstosElementos[i][1];
		// GM_log("elAAsegurar = " + elAAsegurar + ", " + attrib);
		var linkAsegurado = link.getAttribute(attrib);
		if (linkAsegurado.indexOf("newdid") < 0)
		{
			if (linkAsegurado.indexOf("?") < 0)
				linkAsegurado += "?";
			else
				linkAsegurado += "&";
			linkAsegurado += "newdid=" + loadedVillageNewdid;
			link.setAttribute(attrib, linkAsegurado);
			// GM_log("elAAsegurar = " + elAAsegurar);
		}
		// // para desarrollo activa esto
		// msg(linkAsegurado);
		// link.AttachEventHandler("onclick", linkAseguradoEvent);
		// elAAsegurar.Key.AttachEventHandler("onmouseover", linkAseguradoEvent);
		// elAAsegurar.Key.SetAttribute("style", "");
	}
}

//DOM functions
function DOMUtils(doc, ctxt, html) { // from FranMod
    this.cn = function(tag, html) {
        var elem = this.document.createElement(tag);
        if (html)
            elem.innerHTML = html;
        return elem;
    }

    this.id = function(id) {
        return this.document.getElementById(id);
    }

    this.find = function(xpath, xpres, doc) {
        if (!doc)
            doc = document;
        else if (typeof doc == 'string')
            doc = cn('div', doc);
	if(!xpres)
		xpres = XPList;
        var ret = document.evaluate(xpath, doc, null, xpres, null);

        return xpres == XPFirst ? ret.singleNodeValue : ret;
    }

    if (!doc)
        doc = document;
    if (!ctxt)
        ctxt = doc;
    if (html) {
        this.document = doc.implementation.createDocument('', '', null);
        this.context = doc.createElement('div');
        this.context.innerHTML = html;
        ansDoc.appendChild(this.context);
    } else {
        this.document = doc;
        this.context = ctxt;
    }
}
