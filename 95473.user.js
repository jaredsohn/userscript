// ==UserScript==
// @name           Technologijos.lt minimalistine aplinka
// @description    Pasalina visus ne esminius elementus is technologijos.lt pagrindinio puslapio
// @include        http://www.technologijos.lt/*
// @include        http://www.technologijos.lt/*/*
// @include        http://www.technologijos.lt/*/*/*
// @include        http://www.technologijos.lt/*/*/*/*
// @include        http://www.technologijos.lt/*/*/*/*/*
// @run-at         document-start
// ==/UserScript==
if (document.location.href === "http://www.technologijos.lt/vardadieniai" || document.location.href.indexOf("iframe") > 0 || document.location.href.indexOf("/adclick") > 0) {
    return;
}

function getElementsByClassName(className) {
    var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
    var allElements = document.getElementsByTagName("*");
    var results = [];

    var element;
    var i;
    for (i = 0; (element = allElements[i]) != null; i++) {
        var elementClass = element.className;
        if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass)) {
            results.push(element);
        }
    }

    return results;
}

function getFramesBySrc(src) {
    var allElements = document.getElementsByTagName("iframe");
    var results = [];

    var element;
    var i;
    for (i = 0; (element = allElements[i]) != null; i++) {
        var elementSrc = element.src;
        if (elementSrc && elementSrc.indexOf(src) != -1) {
            results.push(element);
        }
    }

    return results;
}

function getChildDivs(node) {
    var nodes = node.childNodes;
    var items = [];
    var i;
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].tagName === "DIV") {
            items.push(nodes[i]);
        }
    }
    return items;
}

//frame'u apsauga
if (document.getElementById("portal_baner_750x100_td_v2") == null)
{
return;
}

try {
    var page_id = 0;
    if (document.location.href == "http://www.technologijos.lt/") {
        page_id = 1; //pagrindinis puslapis
    }
    else if (document.location.href.substring(0, 30) == "http://www.technologijos.lt/n/" && document.location.href.indexOf("straipsnis?name=") > 0) {
        page_id = 2; //straipsnis
    }
    else if (document.location.href.substring(0, 30) == "http://www.technologijos.lt/n/")
    {
        page_id = 4; //straipsniu sarasas
    }
    else if (document.location.href.indexOf("technologijos.lt/diskusijos/viewtopic.php") > 0) {
        page_id = 3; //diskusijos
    }

    document.getElementById("portal_baner_750x100_td_v2").style.display = "none";

    var tables = document.getElementsByTagName("table");
    tables[0].style.display = "none";
    var table_mid = getElementsByClassName("global_meniu_table");
    table_mid[0].deleteRow(1);

    if (page_id == 1) {
        var items = getChildDivs(document.getElementById('portal-column-one-2').childNodes[1]);
        items[1].style.display = "none";
        items[2].style.display = "none";
        items[4].style.display = "none";
        items[5].style.display = "none";
        items[6].style.display = "none";
        //items[7].style.display = "none";


        items = getChildDivs(document.getElementById('portal-column-two-2').childNodes[1]);

        items[0].style.display = "none";
        items[1].style.display = "none";
        items[3].style.display = "none";
		items[4].style.display = "none";
        items[6].style.display = "none";
		items[7].style.display = "none";
        items = getChildDivs(document.getElementById('region-content').childNodes[3]);
        items[6].style.display = "none";
    }
    else if (page_id == 2 || page_id == 4) {
        var items = getChildDivs(document.getElementById('portal-column-one-2').childNodes[1]);
        items[3].style.display = "none"; //savaites top 5
        items[5].style.display = "none"; //baneris kaireje 2
        items[6].style.display = "none"; //baneris kaireje 3

        if (page_id == 2){
			document.getElementById('portal-column-content').childNodes[1].style.display = "none"; //"jus esate cia" ir submenu
			getFramesBySrc("http://www.facebook.com/plugins/like.php")[0].parentNode.style.display = "none"; //facebook "like"
        }
        items = getChildDivs(document.getElementById('portal-column-two-2').childNodes[1]);
        items[0].style.display = "none"; //baneris is desines 1
        items[1].style.display = "none"; //baneris is desines 2
        items[2].style.display = "none"; //baneris is desines 3
		items[4].style.display = "none"; //baneris is desines 4
        items[7].style.display = "none"; //baneris is desines 5
		items[8].style.display = "none"; //facebook baneris

    }
    if (page_id == 3) {
        getFramesBySrc("http://www.technologijos.lt/upload/html/adclick_750x100.html")[0].parentNode.parentNode.parentNode.parentNode.style.display = "none"; //baneris po komentarais
    }
}
catch (err) {

    //alert(err.message);
	//alert(err.stack);
}
