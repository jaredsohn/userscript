// ==UserScript==
// @name           fofo_sceaux
// @namespace      www.lesroyaumes.com
// @include        http://forum.lesroyaumes.com/posting*
// @include        http://forum.lesroyaumes.com/privmsg*
// @include        http://forum2.lesroyaumes.com/posting*
// @include        http://forum2.lesroyaumes.com/privmsg*
// @grant none
// ==/UserScript==


setTimeout(function(){
var element = document.evaluate( '//html/body/table/tbody/tr/td/form/table[2]/tbody/tr[5]/td[2]/span/table/tbody/tr[3]/td/table/tbody/tr/td/span',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue || document.evaluate( '//html/body/table/tbody/tr/td/form/table[3]/tbody/tr[4]/td[2]/span/table/tbody/tr[3]/td/table/tbody/tr/td/span',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue || document.evaluate( '//html/body/table/tbody/tr/td/form/table[2]/tbody/tr[4]/td[2]/span/table/tbody/tr[3]/td/table/tbody/tr/td/span',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue || document.evaluate( '//html/body/table/tbody/tr/td/form/table[3]/tbody/tr[5]/td[2]/span/table/tbody/tr[3]/td/table/tbody/tr/td/span',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

var texts=["[img]http://img6.imageshack.us/img6/6276/mccontour.png[/img]","[img]http://img15.hostingpics.net/pics/855665sceaumcvert.png[/img]","[img]http://img15.hostingpics.net/pics/565482sceaumcjaune.png[/img]"];

var descriptions=["Privé","Définitif","Officiel"];

var couleur_descriptions=["red","green","orange"];
var a="";

if (element != null) {  a="<select onmouseover=\"helpline('s')\" onchange=\"bbfontstyle(this.form.addbbcodemy.options[this.form.addbbcodemy.selectedIndex].value, '');this.selectedIndex=0;\" name=\"addbbcodemy\">	<option class=\"genmed\" value=\"\" style=\"color:black; background-color: #FAFAFA\">Sceau</option>"

for(i=0;i<texts.length;i++){a+="<option class=\"genmed\" value=\""+texts[i]+"\" style=\"color:"+couleur_descriptions[i]+"; background-color: #FAFAFA\">"+descriptions[i]+"</option>";}
a+="</select>";element.innerHTML+=a;}},1000);
