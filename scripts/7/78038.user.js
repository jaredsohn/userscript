// ==UserScript==
// @name          gsozluk futbol
// @author        ziegfiroyt / acikfutbol.com
// @version       1.1.2
// @description	  galatasaray sozluk'teki mac basliklarini bilgiyle donatir. 

// @include        http://www.galatasaraysozluk.com/sozluk.php*
// @include        http://galatasaraysozluk.com/sozluk.php*
// @include        http://rerererarara.com/sozluk.php*
// @include        http://www.rerererarara.com/sozluk.php*
// @include        http://www.rerererarara.net/sozluk.php*
// @include        http://rerererarara.net/sozluk.php*


// @include        http://www.galatasaraysozluk.com/top.php*
// @include        http://galatasaraysozluk.com/top.php*
// @include        http://rerererarara.com/top.php*
// @include        http://www.rerererarara.com/top.php*
// @include        http://www.rerererarara.net/top.php*
// @include        http://rerererarara.net/top.php*

// ==/UserScript==
window.addEventListener("load", function() { 
	

var futbol = "" ; 
var acik = "" ; 
futbol = document.getElementsByTagName("a");
var zieg = document.getElementsByTagName("h1").item(0);
for (var i = 0; i < 12; i++) {
  var acik = futbol[i];

  if(acik.href.search("maçı") > 0 || acik.href.search("maci") > 0 || acik.href.search("ma%C3%A7%C4%B1") > 0){

    var macVar = 1 ;	
  }

}
  var gncl = futbol[0];
  var aciko = futbol[2];

if(aciko.href.search("2013") < 1 && aciko.href.search("2012") < 1 && aciko.href.search("2011") < 1 && aciko.href.search("2010") < 1 && aciko.href.search("2009") < 1){

    var macVar = 2 ;	
  }



if(macVar==1) {


 var brekle=document.createElement("br");
document.getElementsByTagName("h1")[0].appendChild(brekle);

 var simdi=document.createElement("iframe");
simdi.setAttribute("id", "acf");
simdi.setAttribute("name", "acf");
 simdi.setAttribute("style", "background-color:transparent");
  simdi.setAttribute("src", "http://www.acikfutbol.com/gs.php?v=1.1.2");
  simdi.setAttribute("frameborder", "0");
  simdi.setAttribute("width", "800");
  simdi.setAttribute("height", "52");
  simdi.setAttribute("scrolling", "no");
  document.getElementsByTagName("h1")[0].appendChild(simdi);

};




function getCalendarDate()
{
   var months = new Array(13);
   months[0]  = "ocak";
   months[1]  = "şubat";
   months[2]  = "mart";
   months[3]  = "nisan";
   months[4]  = "mayıs";
   months[5]  = "haziran";
   months[6]  = "temmuz";
   months[7]  = "ağustos";
   months[8]  = "eylül";
   months[9]  = "ekim";
   months[10] = "kasım";
   months[11] = "aralık";
   var now         = new Date();
   var monthnumber = now.getMonth();
   var monthname   = months[monthnumber];
   var monthday    = now.getDate();
  
   var dateString = monthday + ' ' + monthname
   return dateString;
}
var now = new Date();
 var year = now.getYear();
 if(year < 2000) { year = year + 1900; }

var MaclarLink = "a=ara&q=maci&yazar=&sira=y&gun=&ay=&yil="
var BugunMaclarLink = "a=ara&q="+ getCalendarDate() +"+"+year+"+maci&yazar=&sira=y&gun=&ay=&yil="
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/hayde bre güne git!/,'maçları göster',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bir gün/,'maçlar',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/a=birgun/,MaclarLink,null);


do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/geçen yıl bugün/,'bugünün maçları neler?',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/2009/,''+ getCalendarDate() +'',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/2010/,''+ getCalendarDate() +'',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/2011/,''+ getCalendarDate() +'',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/2012/,''+ getCalendarDate() +'',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/a=gecenyil/,BugunMaclarLink,null);

 }, false);

function do_modify_html_it(doc, element, acikfutbol, degistir) {
    acikfutbol = new RegExp(acikfutbol);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(acikfutbol, degistir);
    };


};