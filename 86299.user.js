// ==UserScript==
// @name Warez-BB Custom Rank for Everyone
// @description Click user's rank to change it
// @author AncientSpirit
// @license warez
// @include http://www.warez-bb.org/viewtopic.php*
// ==/UserScript==
// this is my 1337 Code Contest entry

(function(){

var W,A,R,E,Z,BB    =[],$=null,B,_=-1,

    w    =(unsafeWindow||window).document,
    a    =GM_getValue||function(w,bb){return localStorage.getItem(w)||bb},
    r    =GM_setValue||function(w,bb){localStorage.setItem(w,bb)},
    e    =w.evaluate("//span[@class='postdetails'][descendant::img]",w,$,7,$),
    z    =w.evaluate("//span[@class='name']/strong",w,$,7,$),
    bb   =JSON.parse(a("r","{}"))

while(E=e.snapshotItem(++_)){

    W=BB [_]={}
    A    =W.bb=  E.firstChild
    R    =B=w.createElement("span")
    E    .insertBefore(R,A)
    Z    =W.Bb=  z.snapshotItem(_).textContent
    B    .style.cursor="pointer"
    B    .appendChild(A)

    W.BB =A.textContent

if(bb[Z])A.textContent=bb[Z]
R.addEventListener("click",function(w){return function(){
var W,b=prompt(

    "Custom rank for "+w,bb

[w]||""),_$=_
if(b!==$){if(!b){if(bb[w])delete bb[w]}else bb[w]=b
r("r",JSON.stringify(bb))
while(
    W=BB
        [--_$])
    W.bb
        .textContent=bb[
    W.Bb
        ]||
    W.BB
}}}(Z),false)}}())
