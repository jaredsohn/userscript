// ==UserScript==
// @name           Google Images - Naked link Revisit (krakenstein.cz.cc)
// @namespace      http://www.krakenstein.cz.cc
// @description    Google Images Direct Link (Strong improvement)
// @include        http://*.google.com/images*
// @original       2009-2010 Marco Pfeiffer (www.sett.xe.cx)
// @copyleft       2010 yod (krakenstein.cz.cc)
// ==/UserScript==

/**
  For FIREFOX

  Update ; http://bit.ly/9MMjMK (Please visit for other browser version)

  12:31 PM 6/9/2010
  - fix url encoded
  - fancy overlay pop up
  - optional link ; open New Window
  - scoope ; for Google dot COM only, sorry
**/

var dim = new Object();
var loadimg = ''+
'data:image/gif;base64,R0lGODlhKgAqAPUAAP///x48VuDk58XN09rf48rR156rtrnCy'+
'vz8/NXa36m0vvb3+LO9xu/x877HzqSwuq65wtDW2+rt7+Xo64KToR48VipGX1FofFtxhDZRa'+
'HKFlUtjeFZsgIeXpUFacGJ3iW2AkZSirneJmUZfdDFMZJmmso2cqX2OnWh8jQAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mb'+
'wAh+QQJCgAAACwAAAAAKgAqAAAG/0CAcEgsEh+XDaVhbDqfxktlOhVAr1gAhUr1ZL9NLtcKL'+
'gPEVDIRgQATBoNIm2hBVyREwUEBKcyhDgqCCgcLR2gfRAkGjIwMf00EDxCUEAoORRhiTEILD'+
'42NCYB8lZacQxlUokMCoI2YT3ullnh5Ux1FBK6MB1ADpJUPakMaFadCEbsGq04NgqUPzEMFH'+
'EYDu49XAgwKDw+CsEQNEUYQoA8OkE8LAgRve8dOrQcRAhLxZRPkUAgRE2YAAwoEqA5AggMMD'+
'hAY2ESPAgb7ABRwlY7hNIoAWu2CUEvgggPK3ijjFQEfPwkRFIyEM9IAgwQmnzQooHKlrl0Kh'+
'gEkUNOVKMCQoBjELNOAgSsIbRD8MqBggCGLQhDQ9ObgaacGVqEOQbAg65eCWp3oA7s1gU6iE'+
'wREALnwygQDfcxO8OoEgYNPjRSo62rEKCgFbZ8gAAoq3JAEgQ8r+/fkpqsCRhz0KqLR1WQnD'+
'pRJA9DAW0chb3GSBXBtl06gSMUp0/ukcqMHx5K9KkK4EWQotQ1EzLhr9wJzjVLzi2DpwGnRR'+
'BZEYABxtBGwfl0NhRr9Nd2wAGQXxt5kMCgI07UiSCC5wPUrQQAAIfkECQoAAAAsAAAAACoAK'+
'gAABv9AgHBILBIFAwfByGw6mYOHQvFwPK9YoeAB6UIUg6yY6VB4uwzEeC1kmM9pY0MtJjgOC'+
'fqwfFYwig8ZFRUgElgHBokGEAtEEm9dCktDHYOWFg1PEYqKB0URbwpWQwKWphRPEJyKmUQDZ'+
'gyNQw+mlh6pq4kTRQtuAkUhtYO3Tg65Br+ff0UUwhUiTxLHEXLURRjCmFcECqvLRa1EwheGW'+
'AsCCREOqslPtBkiEAXlbAAIAtZPIBD1/UIL4fwJFJPgAIMDkwYeOeAnX4FVDvQMfMjJioBjE'+
'Oj1W4AoF4EBxxIdiBAQCwIJoEIOABmSQYKSVxoU6KaSwDEF7fpxO5YAQEe5RQxg1mvAYBUEN'+
'QheGQAjS6G9mQ+qNAUAcKpTIQgWWM0i8eqTCRG6FkGQICebBhPwIUroZMKiAmUnbGWCwMEDT'+
'gq6ajVSFC9buj8VjSKS4C+ABMd2ObGZq4CRO0Yu5vJUjCe4qBoBuM2V1wnLVWY7HiXS4KZYU'+
'rkeBNwkuEjgRI6fvM4HQDIn2gtUKRr9BEGELwdCc5a4IAIDBmHHnO67SqhX5ooezPXKuqLXJ'+
'ggCQ3B+neydAtOfBAEAIfkECQoAAAAsAAAAACoAKgAABv9AgHBILBIJjkMCYWw6n0XEwEA1M'+
'BbQrBaQqFYd23CT4aU+mOI0QFE2nNVGpBI9PLQVxYmDwYhs7VUQWEMCbQVEAgqKCg9gUBFtB'+
'0UFXgx0DQwKEJsQCgRQEG0GDUWAD6RDE5qcnQOgohNFC2wJRQIPrK1QDqICRgV4RQS4rAq1T'+
'xKifkUSrkURq5sKDnROBGyVRgioRAeMihCHWwsCCREOob5Zqg4RAg3caggCEdVNCfFw2vr8/'+
'VAJBxgc+OSvCAQSFSp0QEPJC7WCQj4knHgBQKE2ECT4kzBioscHU0QZOBAhX5YGBTR4XLkhp'+
'CgG+NIk4LCSJQFRCtTpa2CgZkK9CgAAVWFgEk4CCzVJSWGjYMAgiA1UJrygcciCBk8hDpEgQ'+
'KcYe1qfTKgHBUECr2oaTKBnhyCUCQbCnZ2Q9QkCBw+8KLC3oC4AMnrdOkEg9IuRBIKFdGkT6'+
'8lNQ0aSGLlYRtITXm2ODWnw4EHVVDjBDnHpBS0gCNV43hEthHKVU0QgGe4GGUphA8tat8kNY'+
'EGoQKyHIIjQ6YDp1UQWROBDNoxowGWKhoX+2m9YALIdXm9C2AsE6dfNJilgPUsQACH5BAkKA'+
'AAALAAAAAAqACoAAAb/QIBwSCwSCY5DAmFsOp9FxMBANTAW0KwWkKhWHdtwk+GlPrDiNEBRN'+
'pyNCGYYqZQPD22FHSA4KCAFe054VRBoQgJtBURdXgyCRRFtB0UFjnYLD20JUBBtBg1FhA+hQ'+
'4ltYE+ebRNFC2ycR5+UTw6fAkYFCkaSm1ASnxFGEgNGU2WPWQRsjnClRKtmDpBNCwIJEQ6eu'+
'FmJBxECEs9qCAIR1EMIEa1qUOjt8PFFCQcMBwTyTRMO9vhCll6m5RsS4YGCgwqKnSoDQUI+K'+
'X8gSITwQMCxWRHGbWkQgUHEiRASXmzDIIHGLBwZGAQpUYEDAp8UcIsnwCPLB/gIVWFwsl0Dw'+
'QcfFdCCaCDhoYEAOv5xcHRBg6NIhSBo0DPLOwBX2004B6WBCFrwGkwwh8cflAIVKnAQYYLnF'+
'gQONFXR4woqAAtp81Z4YFXnFyMJzA4BoTcvAygwFRlJYqRE4bQkoNjyRaTBgwcOiRx4nLYqg'+
'JFVZgohBGGPAM4VPC+sQopILyqphnh4zCGLXwPCTLXJLURCYQuZn6gLeUA0gNtFi0z4YMECC'+
'M9wxnzKmo9MmQfU5b3+G9UJAr8QoEdFkCBJAbtaggAAIfkECQoAAAAsAAAAACoAKgAABv9Ag'+
'HBILBIJjkMCYWw6n0XEwEA1MBbQrBaQqFYd23CT4aU+sOI0QFE2nI0IZhiplA8PbYUdIDgoI'+
'AV7TnhVEGhCAm0FRF1eDIJFEW0HRQWOdgsPbQlQEG0GDUWED6FDiW1gT55tE0ULbJxHn5RPD'+
'p8CRgUKRpKbUBKfEUYSA0ZTZY9ZBGyOcKVEq2YOkE0LAgkRDp64WYkHEQISz2oIAhHUQwgRr'+
'WpQ6O3w7ZAJBwwHBPFOfQoMwkKWXqblIwLwC59PECQMXECoDIFjsyKM04JAQgRmbQZAbMMgw'+
'cQsDXR9ojKAwCcF3OIt+8SpIRUGH9s1IOMFAhMpbBQMODQQAALBXQ8eOOC5oAHPnukWHN3yT'+
'kjMeBPOKWMHr8EEc3jwZZGg4JsAAU/hONBURU+RcEYcKFDwYC2DlE4QuKSSikiHB0YIPIDAF'+
'8JahU9MKjJCYoORCX/6+i1Wi2WlChUWEWmQuC8/KBurwAVgAbKFIg0U87385JQXUkQwQIZ8o'+
'ciAvZb9PZkrG8CD1atNEFnAYC1bWu4i+D2wuTNuyKCzOahNscnx1ZuREnkOGbB0Ix+et77ep'+
'IHx1VS5gxZBggQI62KCAAAh+QQJCgAAACwAAAAAKgAqAAAG/0CAcEgsEgmOQwJhbDqfRcTAQ'+
'DUwFtCsFpCoVh3bcJPhpT6w4jRAUTacjQhmGKmUDw9thR0gOCggBXtOeFUQaEICbQVEXV4Mg'+
'kURbQdFBY52Cw9tCVAQbQYNRYQPoUOJbWBPnm0TRQtsnEeflE8OnwJGBQpGkptQEp8RRhIDR'+
'lNlj1kEbI5wpUSrZg6QTQsCCREOnrhZiQcRAhLPaggCEdRDCBGtalDo7fDtkAkHDAcE8U59C'+
'gzCQpZepuUjAvALn08QJAxcQKgMgWOzIozTgkBCBGZtBkBswyDBxCwNdH2iMoDAJwXc4i37x'+
'KkhFQYf2zUg4wUCEylsFAw4NBAAAr1dDx444BnnXT4EC3huWWC0pxEGKJomSNkuAYMHJ0hUK'+
'KFlggFAUycoddLgQoWzaCfGeVpGAb5fWtGe3WBEAFUhjcqwc1JCLloNxlIROVWGlhMOfs9SK'+
'NIAgoKJXvO8Q5z4QREHChQYFtLg5DsDiStQXQbBcTEiLqksetLAg9/FQxr8Ke2Y6oJoX5s2A'+
'HHWAlciA2aX5ucqAoN+TWPH9EN7eEynQjA3L508H4EHzXVCh4I5M7/n24XQiTBWSxAAIfkEC'+
'QoAAAAsAAAAACoAKgAABv9AgHBILBIJjkMCYWw6n0XEwEA1MBbQrBaQqFYd23CT4aU+sOI0Q'+
'FE2nI0IZhiplA8PbYUdIDgoIAV7TnhVEGhCAm0FRF1eDIJFEW0HRQWOdgsPbQlQEG0GDUWED'+
'6FDiW1gT55tE0ULbJxHn5RPDp8CRgUKRpKbUBKfEUYSA0ZTZY9ZBGyOcKVEq2YOkE0LAgkRD'+
'p64WYkHEQISz2oIAhHUQwgRrWpQ6O3w7ZAdFfUm8U59CgzCQij1ADeMw2fJCxgHABNWSBVvA'+
'aEyBP4pBJghBLcwCCREYNZmwIeJAEmUuLilga5PVAY8AFmBAT4Ayz5x8jCRZLwGZLxAYNLgA'+
'kC7DhJeEkGg68EDB4f4OAgqFM6CpE2jFmkQ6wmCBDbTNGhgzoGCrEYmGACEdQLUJwUYKFi7z'+
'8hTIzmrKCCgxSuEuxAUFCuSgC7fT+zy/cEL4UE/IkmMnCpDy8lGwoX9DmlglOkQsXnePSb8V'+
'RSVnUQafNLzRMDgu/vG9aLCUMjDKougqGQ7l8jiKocBLIg29t2QBAwYOAjsOjORBRGCnxMa1'+
'8tAqUKamzkLffUX6E0QvIbwHDuAq0kKUM8SBAAh+QQJCgAAACwAAAAAKgAqAAAG/0CAcEgsE'+
'gmOQwJhbDqfRcTAQDUwFtCsFpCoVh3bcJPhpT6w4jRAUTacjQjmdmHyZESS4qGtkAsFBwoQB'+
'X5ODR4ViYkCRAJtBURdXgyFRhSKih5FBZN+Cw9tCVAWmIqiRHtuDY1tBmBPpYoQRQtsp0MEr'+
'QdQF7EVIUYFCkYRrbdNDr4fRhIDRlNllFkhvpUIq0UQXg8OlU4SDxQavRWzWY4HEQIS2GoAC'+
'BAoWQgRE+5P7ff6++9GgAwHGPErAkgBgwhDIigQtNDZQCGcvIBpIAiCRQgG8+xbkKoMgQgPL'+
'l5c6EBAPi0IJChsZWAASJEWSZpM00AYy5YCKo5kIFAfAbg2oQA40KngwMl7Dch4gSBnAEYID'+
'h++E/aAG5ohR6UiWHBVqlciEyJ4I4IgQU93DSYIiLCHgJYJBgaZndD1CQIHoKr0oVUXgFK9b'+
'qEg6PjFSILAkVrZe5LrkZEk/nRBcWCsSIOqGofA5TNWCLQyZwGkYkqkQau9ThyVeZCvWGFUj'+
'qEQNoBwiGovtYUs0FaFtOAIGAPq4UxkQQQGBzs3GfvXS1avzc30/epa4tflhCE8/1o2SYHpW'+
'YIAADsAAAAAAAAAAAA=';

function changeLinks()
{
  var id = 0;
  var spalte = document.getElementById("ImgCont").getElementsByTagName("tr");
  var spalte_length = spalte.length;
  for(var i = 0; i < spalte_length; i=i+2)
  {
    var bilder = spalte[i].getElementsByTagName("td");
    var bilder_length = bilder.length;
    for(var j = 0; j < bilder_length; ++j)
    {
      var bild = bilder[j];
      var oriUrl = bild.getElementsByTagName("a")[0].href;
      var pagUrl = oriUrl.match(/imgrefurl\=([^\&]+)\&/);
      var imgUrl = oriUrl.match(/imgurl\=([^\&]+)\&/);
      if(!pagUrl || !imgUrl) continue;
      pagUrl = decodeURIComponent(pagUrl[1].replace(/\+/g,  " "));
      imgUrl = decodeURIComponent(imgUrl[1].replace(/\+/g,  " "));
      var imgarr = new Array();
      imgarr[0] = imgUrl;
      dim[id] = imgarr;
      bild = bild.getElementsByTagName("a")[0];
      bild.addEventListener('click',lightbox,false);
      bild.getElementsByTagName("img")[0].alt = id;
      bild.href = imgUrl;
      var text = spalte[i+1].getElementsByTagName("td")[j];
      text = text.getElementsByTagName("*")[0];
      var content= text.innerHTML;
      var suche  = content.search(/(\<div|\<br)/);
      var opt  = '<a href="'+imgUrl+'" target="_blank">Open in New Window</a><br /><br />';
      text.innerHTML = opt+'<a href="'+pagUrl+'" target="_blank">'+content.substr(0,suche)+'</a>'+content.substr(suche);
      ++id;
    }
  }
}

function get_img(imgurl,callback){
  var xmlhttp = new XMLHttpRequest();
  var yod_content = document.getElementById("yod_content");

  if(GM_xmlhttpRequest){
    GM_xmlhttpRequest({
      method: "POST",
      url: imgurl,
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      },
      onload: callback
    });
  }
  else{
    xmlhttp.open("POST", imgurl, false);
    xmlhttp.onload = callback;
    xmlhttp.send(null);
  }
};

function close_popup(evt){
  evt.preventDefault();
  var yod_wrapper = document.getElementById("yod_wrapper");
  yod_wrapper.className = "yhide";
  return false;
}

function lightbox(evt){
  evt.preventDefault();
  var imgUrl = dim[this.getElementsByTagName("img")[0].alt];
  var yod_content = document.getElementById("yod_content");
  yod_content.innerHTML = '<img title="Click to close" src="'+loadimg+'" />';
  get_img( imgUrl[0], function(response){
    yod_content.innerHTML = '<img title="Click to close" src="'+imgUrl[0]+'" />';
  });
  yod_content.addEventListener('click',close_popup,false);
  var yod_wrapper = document.getElementById("yod_wrapper");
  yod_wrapper.className =  yod_wrapper.className !== "yhide" ? "yhide" : "yshow";
  yod_wrapper.setAttribute('style', 'width:100%;height:100%;');
}

function add_style(){
var css3 = "html, body { width: 100%;height: 100%; overflow: auto; }\
  body { margin: 0; padding: 0; }\
  div#yod_content img { padding: 10px; left:50%; top:50%; border: solid 20px black;\
  background-color: #fff; cursor: pointer; }\
  div#yod_content a { border: 0; }\
  div#yod_wrapper { z-index: 999; position: absolute; left:0;top:0;\
  background: rgb(0,0,0); background: rgba(0,0,0,0.7); }\
  div#yod_content { margin: 20px auto; }\
  div.yhide { display: none; } div.yshow { display: table; }\
  .gbh { position: static !important; top: 24px !important; }";

  GM_addStyle(css3);

  var div = document.createElement('div');
  div.className = 'yhide';
  div.id = 'yod_wrapper';
  div.innerHTML = '<div id="yod_content" valign="middle" align="center"><img src="'+loadimg+'" /></div>';
  document.getElementsByTagName('body')[0].appendChild(div);
}
add_style();
changeLinks();
var timeout = null;
document.getElementById('ImgCont').addEventListener('DOMSubtreeModified',function(){
  window.clearTimeout(timeout);
  timeout = window.setTimeout(changeLinks,100);
},false);