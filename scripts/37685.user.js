// ==UserScript==
// @name           suppression
// @namespace      [travian] suppression des rapports
// @description    suppression des rapports affichés en un click sur travian
// @include        http://s*.travian.*/berichte.php*
// ==/UserScript==

var tr = document.getElementsByTagName("form")[0].getElementsByTagName("table")[0].getElementsByTagName("tr");

function efface_tout()
{
 for (i=1;i<tr.length-1;i++)
 {
  tr[i].getElementsByTagName("td")[0].getElementsByTagName("input")[0].checked=1
 }

}

//tr[tr.length-1].getElementsByTagName("td")[0].innerHTML=tr[tr.length-1].getElementsByTagName("td")[0].innerHTML+'&nbsp;<input class="std" name="del" type="submit" value="tout effacer" onclick="tr=document.getElementsByTagName(\'form\')[0].getElementsByTagName(\'table\')[0].getElementsByTagName(\'tr\');for (i=1;i<tr.length-1;i++){ tr[i].getElementsByTagName(\'td\')[0].getElementsByTagName(\'input\')[0].checked=1}">';

nouveauinput=document.createElement("input");
with(nouveauinput)
{
 className="std";
 name="del"
 setAttribute('type', 'submit');
 setAttribute('value', 'tout effacer');
 addEventListener("click", efface_tout, true);
}

suiv=null;
point=document.getElementsByTagName("form")[0].getElementsByTagName("table")[0].getElementsByTagName("tr")
p2=point[point.length-1].getElementsByTagName("td")
p1=p2[0].childNodes
p2[0].insertBefore(nouveauinput,p1[1]);
