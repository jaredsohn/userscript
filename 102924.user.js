// ==UserScript==
// @name           Intellitxt Disable
// @include        *se7ensins*
// @version                1.1
// ==/UserScript==
var err = false;
var hd = false;
var i=0;
do
{
var inteltxt = document.getElementById("itxthook" + i.toString());
if (!(inteltxt == null)){
inteltxt.outerHTML = inteltxt.outerText;
hd = true;
}
else
{
if (hd = true){
err = true
}
else
{
i=i-1
}
}
i++
} while (err == false)