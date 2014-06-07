// ==UserScript==
// @name          Discog Power Shopping
// @description   Restore old shopping design with some enhancements.
// @include       http://www.discogs.com/release/*
// @include       http://www.discogs.com/*/release/*
// @include       http://www.discogs.com/master/*
// @include       http://www.discogs.com/*/master/*
// @include       http://www.discogs.com/artist/*
// @include       http://www.discogs.com/label/*
// April 2010 - November 2011 by Articuno
// ==/UserScript==


/*** Saved for reference in case Discogs removes the old CSS/images. ***

a.ybt {
    float:left;
    height:27px;
    text-decoration:none;
    color:#009;
}
a.ybt:visited {color:#009;}
a.ybt.rec {
    background:transparent url(/images/ybt_rec.gif) no-repeat scroll top left;
    width:25px;
    text-indent:-5000px;
}
// MIRRORED IMAGE: http://img697.imageshack.us/img697/8198/ybtrec.gif

a.ybt.main {
    background:transparent url(/images/ybt_main.gif) no-repeat scroll top right;
    font-weight:bold;
    padding:6px 12px 0 7px;
    margin-left:-1px;
}
// MIRRORED IMAGE: http://img697.imageshack.us/img697/6564/ybtmain.gif

div.section.shopping div.aff {float:right;font-size:12px;}

***/

(function(){
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "a.ybt { float:left; height:27px; text-decoration:none; color:#009;} a.ybt:visited {color:#009;} a.ybt.rec {  background:transparent url(http://i.imgur.com/Tz40F.gif) no-repeat scroll top left;width:25px; text-indent:-5000px;} a.ybt.main { background:transparent url(http://i.imgur.com/oB0YZ.gif) no-repeat scroll top right; font-weight:bold; padding:6px 20px 0 7px; margin-left:-1px;}";
document.body.appendChild(css);

var r=false,m=false,a=false;
var W=window.location.href;
if (W.indexOf("/release")!=-1) r=true;
else if (W.indexOf("/master")!=-1) m=true;
else a=true;

function getElementsByClass(searchClass,node,tag) {var classElements = new Array();if ( node == null )node = document;if ( tag == null )tag = '*';var els = node.getElementsByTagName(tag);var elsLen = els.length;var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");for (i = 0, j = 0; i < elsLen; i++) {if ( pattern.test(els[i].className) ) {classElements[j] = els[i];j++;}}return classElements;}

var pan2=getElementsByClass("no_style mpBoxLinks group rounded",document,"ul");
if (pan2.length<1) return;
var pan=pan2[0];

/*** Extract Informations ***/

var id=W.substr(W.lastIndexOf("/")+1);
if (id.indexOf("?")!=-1) id=id.substr(0,id.indexOf("?"));
var sale_numb;
var ins=pan.innerHTML;
var t1=ins.indexOf(" For Sale");
var t2=ins.substr(0,t1).lastIndexOf(">");
if (t1==-1) sale_numb="Buy Similar";
else sale_numb=ins.substr(t2+1,t1-t2-1)+" For Sale";
var l=W.indexOf("/label/")!=-1;
var qq="(";
if (!r){
 m?qq="at":l?qq="- CDs":qq="Discogra";
}
var search_qry=document.title.substr(0,document.title.lastIndexOf(qq)-1);
search_qry=search_qry.replace(/Various - /g,"");
search_qry=search_qry.replace(/ \([0-9]+\)/g," ");
search_qry=search_qry.replace(/ -/g," ");
search_qry=search_qry.replace(/[*&/\+,.]/g,"");
search_qry=search_qry.replace(/  /g," ");

/*** Create Elements ***/

// INPUT BOX
var new_qry=document.createElement("input");
new_qry.type="text/plain";
new_qry.style.width="100%";
new_qry.id="dfix_qry";
new_qry.value=search_qry;
new_qry.addEventListener("change",function(){x=document.getElementsByName("dfix_link");for(var i=0;i<x.length;u=i++)x[i].href=x[i].id+this.value;},false);

// ANCHORS
var a1="http://www.amazon.";
var a2="/s/ref=nb_sb_noss?url=search-alias%3Dpopular&field-keywords=";
var e1="http://music.shop.ebay.";
var e2="/?&_sacat=11233&_nkw=";
var yt="http://www.youtube.com/results?aq=f&search_query=";


function make_br(){return document.createElement("br");}
function make_anchor(x1,m,x2,w){var n=document.createElement("a");n.name="dfix_link";n.innerHTML=w+" ";n.id=x1+m+x2;n.href=n.id+search_qry;return n;}

// CREATE OUR LINKS
amazon_com=make_anchor(a1,"com",a2,"Amazon");
amazon_co=make_anchor(a1,"co.uk",a2,".uk");
amazon_de=make_anchor(a1,"de",a2,".de");
ebay_com=make_anchor(e1,"com",e2,"eBay");
ebay_co=make_anchor(e1,"co.uk",e2,".uk");
youtube=make_anchor(yt,"","","YouTube");

// CLASSIC FOR SALE IMAGE
var lbut=document.createElement("a");
var rbut=document.createElement("a");
lbut.className="ybt rec";
rbut.className="ybt main";
rbut.href=lbut.href="/sell/list?"+(r?"release_id":(m?"master_id":l?"label":"artist"))+"="+id;
lbut.innerHTML="X";
rbut.innerHTML=sale_numb;

// RIGHT DIV
var rsd=document.createElement("div");
rsd.className="fright";
rsd.innerHTML="Search for this:";

/*** Build Layout ***/

// RIGHT DIV
rsd.appendChild(make_br());
rsd.appendChild(new_qry);
rsd.appendChild(make_br());
rsd.appendChild(amazon_com);
rsd.appendChild(amazon_co);
rsd.appendChild(amazon_de);
rsd.appendChild(make_br());
rsd.appendChild(ebay_com);
rsd.appendChild(ebay_co);
rsd.appendChild(make_br());
rsd.appendChild(youtube);

// BOTTOM LEFT DIV
if (r){
 var sti=document.createElement("div");
 sti.style.clear="fleft";
 sta=document.createElement("a");
 sta.href="http://www.discogs.com/sell/post/"+id;
 sta.innerHTML="Sell This Item";
 sti.appendChild(sta);
}

// ENTIRE SECTION
var new_div=document.createElement("div");
new_div.className="section content";
new_div.style.padding="5px";
new_div.appendChild(lbut);
new_div.appendChild(rbut);
new_div.appendChild(rsd);
if (r) new_div.appendChild(sti);

/*** Bye Bye New Shopping Design ***/

if (!l && !a)
 pan.childNodes[5].style.display="none";
if (pan.childNodes[7])
 pan.childNodes[7].style.display="none";
pan.replaceChild(new_div,pan.childNodes[3]/*.childNodes[r?5:3]*/);
})();