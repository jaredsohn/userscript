// ==UserScript==
// @name		Quitar banners publicidad hotmail by [THC]Fever
// @author	       	[THC]Fever
// @description	Quita  la publicidad de la página de Windows Live Hotmail, ya sabes, el odiado banner que aparece encima, y el de abajo a la izquerda de todas las páginas de www.hotmail.com (www.mail.live.com), etc. ¡Funciona con la última actualización!
// @include         	http://*mail.live.com/mail/*
// ==/UserScript==
function do_platypus_script() {
remove_it(window.document,document.getElementById('RadAd_Banner'),null,null,null);
remove_it(window.document,document.getElementById('RadAd_TodayPage_Banner'),null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/FORM[1]/DIV[2]/DIV[2]/DIV[3]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[4]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/DIV[1]/DIV[5]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/DIV[1]/DIV[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
};
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");

function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};