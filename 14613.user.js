   1. // ==UserScript==
   2. // @version 1.2
   3. // @name Gautam Fonts
   4. // @author Gautam  <http://www.orkut.com/Profile.aspx?uid=9562997129641547711>
   5. // @namespace
   6. // @description Its Modifies Your Text...
   7. // @include http://www.orkut.com/CommMsgPost.aspx?*
   8. // @include http://www.orkut.com/Scrapbook.aspx*
   9. // @include http://www.orkut.com/CommMsgs.aspx?*
  10. // ==/UserScript==
  11.
  12. addEventListener('load', function(event) {
  13. function getTextArea() {
  14.     return document.getElementsByTagName('textarea')[0];
  15. }
  16.
  17.
  18. function mM() {
  19.     e=getTextArea();
  20.     s=e.value;
  21.     r="";
  22.     for(k=0;k<s.length;k++){
  23.         l=s.substr(k,1);
  24.         r+=(k%2) ? l.toLowerCase() : l.toUpperCase();
  25.     }
  26.     e.value=r;
  27. }
  28.
  29. //-----------------------------------------------------------
  30. //--                     Encrypt                           --
  31. //-----------------------------------------------------------
  32. function ZP() {
  33.    o=getTextArea();
  34.    txt=o.value;
  35.    var crypt = new Array();
  36.    crypt["a"]="z";
  37.    crypt["b"]="y";
  38.    crypt["c"]="x";
  39.    crypt["d"]="w";
  40.    crypt["e"]="v";
  41.    crypt["f"]="u";
  42.    crypt["g"]="t";
  43.    crypt["h"]="s";
  44.    crypt["i"]="r";
  45.    crypt["j"]="q";
  46.    crypt["k"]="p";
  47.    crypt["l"]="o";
  48.    crypt["m"]="n";
  49.    crypt["n"]="m";
  50.    crypt["o"]="l";
  51.    crypt["p"]="k";
  52.    crypt["q"]="j";
  53.    crypt["r"]="i";
  54.    crypt["s"]="h";
  55.    crypt["t"]="g";
  56.    crypt["u"]="f";
  57.    crypt["v"]="e";
  58.    crypt["w"]="d";
  59.    crypt["x"]="c";
  60.    crypt["y"]="b";
  61.    crypt["z"]="a";
  62.    var r="";
  63.    for(x=0;x<txt.length;x++) {
  64.       t=txt.substr(x,1).toLowerCase();
  65.       r+= (crypt[t] ? crypt[t] : t);
  66.    }
  67.    o.value=r;
  68. }
  69.
  70.
  71. //-----------------------------------------------------------
  72. //--                     Code chk                          --
  73. //-----------------------------------------------------------
  74. function chr(){
  75.    s=getTextArea();
  76.    txt=s.value;
  77. var n="";
  78.   n = txt.charCodeAt(0);
  79.
  80.    s.value=n;
  81. }
  82.
  83.
  84.
  85. //-----------------------------------------------------------
  86. //--                     Style 1                           --
  87. //-----------------------------------------------------------
  88. function stl() {
  89.          c = getTextArea();
  90.          d = c.value;
  91.          var coeiu = [["a","b","c","?","d","e","f","g","h","i","j","k",
  92.          "l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","3","6"],
  93.          [1076, 946, 99, 155, 8706, 958, 402, 667, 689, 953, 669, 1082, 108,
  94.          3602, 3598, 148, 503, 113, 529, 1744, 1006, 944, 957, 8101, 10008, 696,
  95.          657, 1079, 1073]];
  96.          var r="";
  97.          for(x=0;x<d.length;x++) {
  98.              t=d.substr(x,1).toLowerCase();
  99.              for(y=0;y<coeiu[0].length;y++) {
 100.                  if (t == coeiu[0][y]) {
 101.                     t = String.fromCharCode(coeiu[1][y]);
 102.                     break;
 103.                  }
 104.              }
 105.              r+=t;
 106.          }
 107.          c.value=r;
 108. }
 109.
 110.
 111. //-----------------------------------------------------------
 112. //--                     Style 2                           --
 113. //-----------------------------------------------------------
 114. function ZPs() {
 115.    s=getTextArea();
 116.    txt=s.value;
 117.    var crypt = new Array();
 118.    crypt["A"]=String.fromCharCode(0xC3);
 119.    crypt["B"]=String.fromCharCode(0xDF);
 120.    crypt["C"]=String.fromCharCode(0xA9);
 121.    crypt["D"]=String.fromCharCode(0xD0);
 122.    crypt["E"]=String.fromCharCode(163);
 123.    crypt["F"]="F";
 124.    crypt["G"]="G";
 125.    crypt["H"]="|-|";
 126.    crypt["I"]="|";
 127.    crypt["J"]="J";
 128.    crypt["K"]="|<";
 129.    crypt["L"]="|_";
 130.    crypt["M"]="|V|";
 131.    crypt["N"]=String.fromCharCode(0xD1);
 132.    crypt["O"]=String.fromCharCode(0xD8);
 133.    crypt["P"]="P";
 134.    crypt["Q"]="Q";
 135.    crypt["R"]=String.fromCharCode(0xAE);
 136.    crypt["S"]=String.fromCharCode(0xA7);
 137.    crypt["T"]="T";
 138.    crypt["U"]=String.fromCharCode(0xDC);
 139.    crypt["V"]="\/";
 140.    crypt["W"]="\/\/";
 141.    crypt["X"]="><";
 142.    crypt["Y"]=String.fromCharCode(0xA5);
 143.    crypt["Z"]="Z";
 144.    crypt["a"]=String.fromCharCode(0xE3);
 145.    crypt["b"]="b";
 146.    crypt["c"]=String.fromCharCode(0xE7);
 147.    crypt["d"]="d";
 148.    crypt["e"]=String.fromCharCode(0xEA);
 149.    crypt["f"]=String.fromCharCode(402);
 150.    crypt["g"]="9";
 151.    crypt["h"]="h";
 152.    crypt["i"]=String.fromCharCode(0xEE);
 153.    crypt["j"]="j";
 154.    crypt["k"]="k";
 155.    crypt["l"]="l";
 156.    crypt["m"]="m";
 157.    crypt["n"]=String.fromCharCode(0xF1);
 158.    crypt["o"]=String.fromCharCode(0xF5);
 159.    crypt["p"]=String.fromCharCode(0xDE);
 160.    crypt["q"]=String.fromCharCode(0xB6);
 161.    crypt["r"]="r";
 162.    crypt["s"]="s";
 163.    crypt["t"]=String.fromCharCode(8224);
 164.    crypt["u"]=String.fromCharCode(0xB5);
 165.    crypt["v"]="v";
 166.    crypt["w"]="w";
 167.    crypt["x"]=String.fromCharCode(0xA4);
 168.    crypt["y"]=String.fromCharCode(0xFF);
 169.    crypt["z"]="z";
 170.    var r="";
 171.    for(x=0;x<txt.length;x++) {
 172.       t=txt.substr(x,1);
 173.       r+= (crypt[t] ? crypt[t] : t);
 174.    }
 175.    s.value=r;
 176. }
 177.
 178.
 179. //-----------------------------------------------------------
 180. //--                      lines                            --
 181. //-----------------------------------------------------------
 182. function cerc() {
 183.     v=getTextArea();
 184.     v.value=v.value.replace(/\b/gi,"|");
 185. }
 186.
 187. //-----------------------------------------------------------
 188. //--                  Colorful 1                           --
 189. //-----------------------------------------------------------
 190. function colorful() {
 191.     cor=new Array('maroon','red','pink','orange','gold','gray','green','blue','navy');
 192.     var z=0;
 193.     cl=getTextArea();
 194.     cl.value=cl.value.replace(/(.)/gi,"#$1");
 195.     cl.value=cl.value.replace(/\# /gi," ");
 196.     for(y=0;y<cl.value.length;y++){
 197.         cl.value=cl.value.replace(/\#/,'['+cor[z]+']');
 198.         z++;
 199.         if(z==cor.length)
 200.             z=0;
 201.     }
 202. var cd=cl.value;
 203. cl.value="[silver]"+cd+"[/silver]";
 204. }
 205.
 206.
 207. //-----------------------------------------------------------
 208. //--                  Written links                        --
 209. //-----------------------------------------------------------
 210.     function AamizWrite() {
 211.     text=getTextArea();
 212.     if (!text) return;
 213.     c=text.parentNode;
 214.     d=document.createElement("div");
 215.     d.className="T";
 216.     d.style.fontSize="11px";
 217.     d.align="left";
 218.     d.innerHTML="<b>"+String.fromCharCode(945)+String.fromCharCode(945)+String.fromCharCode(1084)+String.fromCharCode(953)+String.fromCharCode(122)+" !!! Write</b><br />";
 219.     d.style.marginTop="10px";
 220.     c.appendChild(d);
 221.
 222.     zp=document.createElement("a");
 223.     zp.href="javascript:;";
 224.     zp.innerHTML="Encrypt or Decrypt";
 225.     zp.addEventListener("click", ZP, true);
 226.         d.appendChild(zp);
 227.
 228.
 229.     SPA=document.createElement("b");
 230.     SPA.innerHTML=" - ";
 231.         d.appendChild(SPA);
 232.    
 233.     mm=document.createElement("a");
 234.     mm.href="javascript:;";
 235.     mm.innerHTML="aLtErNaTe";
 236.     mm.addEventListener("click", mM, true);
 237.     d.appendChild(mm);
 238.
 239.     SPB=document.createElement("b");
 240.     SPB.innerHTML=" - ";
 241.         d.appendChild(SPB);
 242.
 243.     ce=document.createElement("a");
 244.     ce.href="javascript:;";
 245.     ce.innerHTML="|Lines|";
 246.     ce.addEventListener("click", cerc, true);
 247.     d.appendChild(ce);
 248.
 249.     SPC=document.createElement("b");
 250.     SPC.innerHTML=" - ";
 251.         d.appendChild(SPC);
 252.    
 253.     ss=document.createElement("a");
 254.     ss.href="javascript:;";
 255.     ss.innerHTML=String.fromCharCode(353)+String.fromCharCode(964)+String.fromCharCode(947)+String.fromCharCode(108)+String.fromCharCode(949);
 256.     ss.addEventListener("click", stl, true);
 257.     d.appendChild(ss);
 258.
 259.     SPD=document.createElement("b");
 260.     SPD.innerHTML=" - ";
 261.         d.appendChild(SPD);
 262.
 263.     s2=document.createElement("a");
 264.     s2.href="javascript:;";
 265.     s2.innerHTML=String.fromCharCode(0xA7)+String.fromCharCode(964)+String.fromCharCode(947)+String.fromCharCode(108)+String.fromCharCode(949);
 266.     s2.addEventListener("click", ZPs, true);
 267.     d.appendChild(s2);
 268.
 269.     SPE=document.createElement("b");
 270.     SPE.innerHTML=" - ";
 271.         d.appendChild(SPE);
 272.
 273.     color=document.createElement("a");
 274.     color.href="javascript:;";
 275.     color.innerHTML="<span style='color:yellow;'>C</span>o<span style='color:red'>l</span>o<span style='color:green'>r</span>f<span style='color:orange'>u</span>l<span style='color:blue'>l</span>";
 276.     color.addEventListener("click", colorful, true);
 277.     d.appendChild(color);
 278.
 279.     SPF=document.createElement("b");
 280.     SPF.innerHTML=" - ";
 281.         d.appendChild(SPF);
 282.
 283.     az=document.createElement("a");
 284.     az.href="http://www.orkut.com/Profile.aspx?uid=17133030912712616066";
 285. az.innerHTML=String.fromCharCode(8249)+String.fromCharCode(166)+"["+String.fromCharCode(945)+String.fromCharCode(945)+String.fromCharCode(1084)+String.fromCharCode(953)+String.fromCharCode(122)+String.fromCharCode(8482)+"]"+String.fromCharCode(166)+String.fromCharCode(8250)+" Profile";
 286. az.target="_blank";
 287. d.appendChild(az);
 288.
 289.     SPG=document.createElement("b");
 290.     SPG.innerHTML=" - ";
 291.         d.appendChild(SPG);
 292.
 293.     ad=document.createElement("a");
 294.     ad.href="http://orkutrix.com";
 295.     ad.innerHTML="Orkutrix";
 296.     ad.target="_blank";
 297.     d.appendChild(ad);
 298. }
 299.
 300. AamizWrite();
 301. }, false);
 302.
 303. //-----------------------------------------------------------
 304. //--                  Change Link to Image                 --
 305. //-----------------------------------------------------------
 306.
 307. var i=0;
 308. function chngimg(){
 309. doc=document;
 310. lnk=doc.links;
 311.
 312. for (i=0;i<lnk.length;i++){
 313. getload="document.getElementById('loadi"+i+"')"
 314. this2="document.getElementById('bfimg"+i+"')"
 315.
 316. var sb=lnk[i].href.substring(lnk[i].href.length-4,lnk[i].href.length);sb=sb.toLowerCase()
 317. if(sb=='.jpg' || sb=='.gif' || sb=='.png' || sb=='jpeg'){
 318. lnk[i].innerHTML="<b id=loadi"+i+" onclick=\""+this2+".style.display='';"+getload+".style.display='none';return false;\"><font size=1 color=Blue id=load"+i+">Loading....</font></b><img onError=\"document.links["+i+"].innerHTML='<font size=1 color=red>Image Not Found</font>'\" oncontextmenu=\"if(aa"+i+"==0){if(imgh"+i+">imgw"+i+"){document.getElementById('bfimg"+i+"').height=imgh"+i+"};if(imgw"+i+">imgh"+i+"){document.getElementById('bfimg"+i+"').width=imgw"+i+"};aa"+i+"=1}else{if(this.height>200 && this.height>=this.width){this.height=200};if(this.width>200 && this.width>=this.height){this.width=200};aa"+i+"=0};return false\" src="+lnk[i].href+" style='display: none' id=bfimg"+i+" border=0 onload=\"aa"+i+"=0;imgh"+i+"=this.height;imgw"+i+"=this.width;if(this.height>200 && this.height>=this.width){this.height=200}else if(this.width>200 && this.width>=this.height){this.width=200;};this.style.display='';"+getload+".style.display='none';\">"
 319. }}
 320. }
 321. chngimg()
 322.
 323.
 324. //-----------------------------------------------------------
 325. //--                         Tags                          --
 326. //-----------------------------------------------------------
 327. function changetags(){
 328. br=document.body.innerHTML
 329. if(br.indexOf("[img]") > -1 && br.indexOf("[/img]") > -1){
 330. br=br.replace(/\[img\]/gi,'');
 331. br=br.replace(/\[\/img\]/gi,'');
 332. document.body.innerHTML = br;
 333. }
 334. }
 335. changetags()