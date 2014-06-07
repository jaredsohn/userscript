   1. Source for "want to see Orkut Albuns which is locked??"
   2.
   3.    1. // ==UserScript==
   4.    2. // @name           Unlock Orkut Albuns
   5.    3. // @namespace      http://greasemonkey.sitesbr.net
   6.    4. // @description    Allows viewing photos even with padlock
   7.    5. // @include        *.orkut.com*profile.aspx*
   8.    6. // ==/UserScript==
   9.    7.
  10.    8. /*
  11.    9. * Autor: Sergio Abreu - Brasil
  12.   10. *
  13.   11. * Criação: 23/12/2007
  14.   12. * Updated: 24/12/2007 01:30h   ::  v 1.2 Bilingual - Português / Inglês
  15.   13. *
  16.   14. */
  17.   15.
  18.   16. function waitToLoad(){
  19.   17.
  20.   18. var db = document.body.innerHTML;
  21.   19. var lg = db.match(/"fotos"/) ? 1 : 0;
  22.   20.
  23.   21. var msg = lg ? "Liberadas pelo Destrava Álbuns, by Sergio Abreu" : "Unlocked by Sergio Abreu's Unlock Album script";
  24.   22. var placa = lg ? "Fotos =]" : "Photos =]";
  25.   23. var voltar = lg ? "Voltar" : "Back";
  26.   24.
  27.   25. if( db.match(/icn_privacy_private/)) {
  28.   26. address = location.href;
  29.   27. var s="", fo = db.match(/http.+medium.+\.jpg/)[0];
  30.   28. for( var i=1; i < 101; i++){
  31.   29. s += "<img onerror='esconde(this)' src='" + fo.replace(/medium/, 'milieu/' + i) + "'>";
  32.   30. }
  33.   31.
  34.   32. var magica = "document.write(\"<html><head><title>"+ msg +"<\/title>" +
  35.   33.     "<scr"+"ipt type='text/javasc"+"ript'>function esconde(o){o.style.display='none';}</sc"+"ript><\/head>"+
  36.   34.     "<body><center><br><br><table border=0 cellspacing=0 cellpadding=0><tr><td>"+
  37.   35.     "<img border=0 src='http://images3.orkut.com/img/bl.gif'></td>"+
  38.   36.     "<td valign='middle' height='20' style='background:url(http://images3.orkut.com/img/bm.gif)'><a href='" + address + "' "+
  39.   37.     "style='height:20px; cursor:pointer;color:black;font-family:arial,verdana;font-size:12px;font-weight:normal;text-decoration:none;'>"+
  40.   38.     voltar+"</a></td>"+
  41.   39.     "<td><img border=0 src='http://images3.orkut.com/img/br.gif'></td></tr></table><br><br>" + s + "<br><br><table border=0 cellspacing=0 cellpadding=0><tr><td>"+
  42.   40.     "<img border=0 src='http://images3.orkut.com/img/bl.gif'></td>"+
  43.   41.     "<td valign='middle' height='20' style='background:url(http://images3.orkut.com/img/bm.gif)'><a href='" + address + "' "+
  44.   42.     "style='height:20px; cursor:pointer;color:black;font-family:arial,verdana;font-size:12px;font-weight:normal;text-decoration:none;'>"+
  45.   43.     voltar+"</a></td>"+
  46.   44.     "<td><img border=0 src='http://images3.orkut.com/img/br.gif'></td></tr></table><\/center><\/body><\/html>\")"
  47.   45.
  48.   46. var bt = document.createElement('div');
  49.   47. bt.setAttribute('style', 'width:50px;  height:auto; margin:3px; padding:3px; border:1px solid #aaaaaa; -moz-border-radius:7px; cursor:pointer; color:red; background:#ffffcc; font-size:9px;');
  50.   48. bt.setAttribute('onclick', magica);
  51.   49. bt.setAttribute('title', msg);
  52.   50. bt.innerHTML = placa;
  53.   51.
  54.   52. var bt2 = document.createElement('div');
  55.   53. bt2.setAttribute('class', 'lf');
  56.   54. bt2.setAttribute('style', 'width:'+(lg?50:60)+'px; margin-top:5px; height:15px; padding:7px 10px 3px 10px; border:1px solid #aaaaaa; -moz-border-radius:7px; cursor:pointer; color:red; background:#ffffcc; font-size:10px;');
  57.   55. bt2.setAttribute('onclick', magica);
  58.   56. bt2.setAttribute('title', msg);
  59.   57. bt2.innerHTML = placa;
  60.   58.
  61.   59. var as, at = document.links;
  62.   60.
  63.   61. as = new Array();
  64.   62.
  65.   63. for( var i=0; i < at.length; i++){
  66.   64. if(at[i].innerHTML.match(/(f|ph)otos/) && at[i].innerHTML.match(/icn_privacy_private/)){ as[ as.length] = at[i];}
  67.   65. if( as.length > 1) break;
  68.   66. }
  69.   67.
  70.   68. as[0].parentNode.replaceChild(bt , as[0]);
  71.   69. as[1].parentNode.replaceChild(bt2, as[1]);
  72.   70. }
  73.   71.
  74.   72. }
  75.   73.
  76.   74. window.addEventListener('load', waitToLoad, false);
  77.   75.
  78.   76. /*
  79.   77. * Now, bilingual: Pt-Br / US
  80.   78. */