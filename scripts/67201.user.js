// ==UserScript==
// @name           Tesco Clean Print
// @namespace      http://userscripts.org/users/127643
// @description    Removes cruft from Tesco product page for clearer printing
// @include        http://direct.tesco.com/q/R*
// ==/UserScript==

var prod = document.getElementById("ancActualContent");
var cat_after = prod.getElementsByClassName("cat")[0].nextSibling;
node = document.createElement("p");
node.id = "addedLink";
node.innerHTML='<a href="#" onclick="gm_Tesco_test()">Remove clutter for printing</a>';
cat_after.parentNode.insertBefore(node, cat_after);

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "function gm_Tesco_test (){\n" +
    "document.getElementById('inc-product-category-banner').style.display='none';\n" +
    "document.getElementById('top-navigation').style.display='none';\n" +
    "document.getElementById('header').style.display='none';\n" +
    "document.getElementById('ftr').style.display='none';\n" +
    "document.getElementById('reevoomark_badge_0').style.display='none';\n" +
    "document.getElementById('addedLink').style.display='none';\n" +
    "document.getElementById('inc-page-footer').style.display='none';\n" +
    "var div=document.getElementById('csAlternatives');\n" +
    "if (div) {\n" +
    "   div.style.display='none';\n" +
    "}\n" +
    "div=document.getElementById('ancActualContent');\n" +
    "div.style.width='100%';\n" +
    "div=document.body.getElementsByClassName('productImages')[0];\n" +
    "list=div.getElementsByTagName('a');\n" +
    "for (i=1;i<list.length;i++) {\n" +
    "   list[i].style.display='none';\n" +
    "}\n" +
    "document.body.getElementsByClassName('message')[0].style.display='none';\n" +
    "div=document.body.getElementsByClassName('sft');\n" +
    "if (div.length > 0) {\n" +
    "   div[0].style.display='none';\n" +
    "}\n" +
    "div=document.body.getElementsByClassName('discontinued');\n" +
    "if (div.length > 0) {\n" +
    "   div[0].style.display='none';\n" +
    "}\n" +
    "document.body.getElementsByClassName('hborder')[0].style.display='none';\n" +
    "document.body.getElementsByClassName('left')[0].style.display='none';\n" +
    "document.body.getElementsByClassName('right')[0].style.display='none';\n" +
    "document.body.getElementsByClassName('left backToTop')[0].style.display='none';\n" +
    "list=document.body.getElementsByClassName('general');\n" +
    "for (i=0;i<list.length;i++){\n" +
    "   list[i].style.display='none';\n" +
    "}\n" +
    "list=document.body.getElementsByClassName('cat');\n" +
    "for (i=0;i<list.length;i++){\n" +
    "   if (list[i].tagName == 'li') {\n" +
    "      list[i].style.display='none';\n" +
    "   }\n" +
    "}\n" +
    "list=document.body.getElementsByClassName('section');\n" +
    "for (i=0;i<list.length;i++){\n" +
    "   head=list[i].getElementsByTagName('h4')[0].textContent;\n" +
    "   if (head === 'Features') {\n" +
    "      list[i].style.display='block';\n" +
    "   }\n" +
    "   else {\n" +
    "      list[i].style.display='none';\n" +
    "   }\n" +
    "}\n" +
    "list=document.body.getElementsByClassName('section-header')[0].childNodes;\n" +
    "for (i=0;i<list.length;i++){\n" +
    "   head=list[i].getElementsByTagName('h4')[0].textContent;\n" +
    "   if (head !== 'Features') {\n" +
    "      list[i].style.display='none';\n" +
    "   }\n" +
    "}\n" +
    "list=document.body.getElementsByClassName('e');\n" +
    "for (i=0;i<list.length;i++){\n" +
    "   list2=list[i].getElementsByTagName('td');\n" +
    "   for (j=0;j<list2.length;j++) {\n" +
    "       list2[j].style.backgroundColor='#ccc';\n" +
    "       list2[j].style.media='print';\n" +
    "   }\n" +
    "}\n" +
    "list=document.body.getElementsByClassName('pAttrib')[0].getElementsByTagName('a');\n" +
    "for (i=0;i<list.length;i++){\n" +
    "   list[i].style.display='none';\n" +
    "}\n" +
    // didn't need to do this as what was wrong was firefox's
    // print settings (background colours) but left the code
    // here commented out for future reference 
    /*"var styleElement = document.createElement('style');\n" +
    "styleElement.setAttribute('type', 'text/css');\n" +
    "styleElement.setAttribute('media', 'print');\n" +
    "document.getElementsByTagName('head')[0].appendChild(styleElement);\n" +
    "var sty = document.styleSheets[2];\n" +
    "sty.insertRule('tr.e td {background-color: yellow !important}', sty.cssRules.length);\n" +*/
"}\n";

document.body.appendChild(script);

