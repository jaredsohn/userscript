// ==UserScript==



// @name           Google search addon



// @namespace      google search addon



// @include        http://www.google.*/



// @include        http://www.google.*/webhp?*

// @include       http://www.google.*/ig*

// @include       http://www.google.*/ig*

// ==/UserScript==


main = window.location+"";
var mainlocation = main.split("/")
mainloc = mainlocation[3].split("?");

if (mainloc[0] == "ig") {
afterid=document.getElementById("btnI");

} else {
afterid=document.getElementsByTagName('input')[4];

}
// Google Search Addon Number Search = The number of items that you have in the list for each new item increace by 1s
GM_setValue('gsans',2);
// First custom search the ending numbers indicate the position on the list so 2 will be the 2nd one on the list.
GM_setValue('gsas2',"http://en.wikipedia.org/wiki/Special:Search")  // The action of the form  Google Search Addon Search
GM_setValue('gsain2','search')  // The get varible of the form to replace Google Search Addon Input Varible
GM_setValue('gsasn2','Wikipedia')  // Title  Google Search Addon Name

GM_setValue('gsas1','search')
GM_setValue('gsain1','q')
GM_setValue('gsasn1','Google Search')
// End user defined vars

addmore="<style type=\"text/css\">td{border-style:solid;border-width:1px;}</style><table><tr><td>Name</td><td>Action</td><td>Query Get Var</td></tr>"
whilegsans = GM_getValue('gsans');
var loop=1;
	while (whilegsans>=loop) {
addmore=addmore+"<tr><td>"+GM_getValue('gsasn'+loop)+"</td><td>"+GM_getValue('gsas'+loop)+"</td><td>"+GM_getValue('gsain'+loop)+"</td></tr>";
loop++
}
addmore=addmore+"</table><br>Sorry but to add more you must edit the script between lines 17 and 27, comments have been provided."


if (afterid) {
    newElement = document.createElement('select');
newElement.innerHTML=newElement.innerHTML+"<script type=\"text/javascript\">function changeform(naction,nname,ngetvar) {\n"+
"var forms = document.getElementsByTagName('form');\n"+
"forms[0].action=naction;\n"+
"forms[0].q.name=ngetvar;"+
"document.f.btnG.value=nname;\n"+
"}\n\n"+
"function addnew() {document.body.innerHTML='"+addmore+"'}"+
"</script>";
var loop=1;
	while (whilegsans>=loop) {
newElement.innerHTML=newElement.innerHTML+"<option onclick=\"changeform('"+GM_getValue('gsas'+loop)+"','"+GM_getValue('gsasn'+loop)+"','"+GM_getValue('gsain'+loop)+"')\">"+GM_getValue('gsasn'+loop)+"</option>"
loop++
}
	newElement.innerHTML=newElement.innerHTML+'<option onclick="addnew()">Add More</option>';
    afterid.parentNode.insertBefore(newElement, afterid.nextSibling);
}

