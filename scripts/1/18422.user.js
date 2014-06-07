// ==UserScript==
// @name Text Editor
// @description Its Modifies Your Text...in ScrapBook!
// @include http://www.orkut.com/CommMsgPost.aspx?*
// @include http://www.orkut.com/Scrapbook.aspx*
// @include http://www.orkut.com/CommMsgs.aspx?*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea() {
	return document.getElementsByTagName('textarea')[0];
}


function mM() {
	e=getTextArea();
	s=e.value;
	r="";
	for(k=0;k<s.length;k++){
		l=s.substr(k,1);
		r+=(k%2) ? l.toLowerCase() : l.toUpperCase();
	}
	e.value=r;
}

//-----------------------------------------------------------
//--                     Encrypt                           --
//-----------------------------------------------------------
function ZP() {
   o=getTextArea();
   txt=o.value;
   var crypt = new Array();
   crypt["a"]="z";
   crypt["b"]="y";
   crypt["c"]="x";
   crypt["d"]="w";
   crypt["e"]="v";
   crypt["f"]="u";
   crypt["g"]="t";
   crypt["h"]="s";
   crypt["i"]="r";
   crypt["j"]="q";
   crypt["k"]="p";
   crypt["l"]="o";
   crypt["m"]="n";
   crypt["n"]="m";
   crypt["o"]="l";
   crypt["p"]="k";
   crypt["q"]="j";
   crypt["r"]="i";
   crypt["s"]="h";
   crypt["t"]="g";
   crypt["u"]="f";
   crypt["v"]="e";
   crypt["w"]="d";
   crypt["x"]="c";
   crypt["y"]="b";
   crypt["z"]="a";
   var r="";
   for(x=0;x<txt.length;x++) {
      t=txt.substr(x,1).toLowerCase();
      r+= (crypt[t] ? crypt[t] : t);
   }
   o.value=r;
}


//-----------------------------------------------------------
//--                     Code chk                          --
//-----------------------------------------------------------
function chr(){
   s=getTextArea();
   txt=s.value;
var n="";
  n = txt.charCodeAt(0);

   s.value=n;
}



//-----------------------------------------------------------
//--                     Style 1                           --
//-----------------------------------------------------------
function stl() {
         c = getTextArea();
         d = c.value;
         var coeiu = [["a","b","c","�","d","e","f","g","h","i","j","k",
         "l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","3","6"],
         [945, 1074, 99, 962, 8706, 949, 402, 103, 1085, 953, 106, 954, 108,
         1084, 960, 920, 961, 113, 1075, 353, 964, 956, 957, 1096, 967, 947,
         122, 1079, 1073]];
         var r="";
         for(x=0;x<d.length;x++) {
             t=d.substr(x,1).toLowerCase();
             for(y=0;y<coeiu[0].length;y++) {
                 if (t == coeiu[0][y]) {
                    t = String.fromCharCode(coeiu[1][y]);
                    break;
                 }
             }
             r+=t;
         }
         c.value=r;
}


//-----------------------------------------------------------
//--                     Style 2                           --
//-----------------------------------------------------------
function ZPs() {
   s=getTextArea();
   txt=s.value;
   var crypt = new Array();
   crypt["A"]=String.fromCharCode(0xC3);
   crypt["B"]=String.fromCharCode(0xDF);
   crypt["C"]=String.fromCharCode(0xA9);
   crypt["D"]=String.fromCharCode(0xD0);
   crypt["E"]=String.fromCharCode(163);
   crypt["F"]="F";
   crypt["G"]="G";
   crypt["H"]="|-|";
   crypt["I"]="I";
   crypt["J"]="J";
   crypt["K"]="|<";
   crypt["L"]="|_";
   crypt["M"]="|V|";
   crypt["N"]=String.fromCharCode(0xD1);
   crypt["O"]=String.fromCharCode(0xD8);
   crypt["P"]="P";
   crypt["Q"]="Q";
   crypt["R"]=String.fromCharCode(0xAE);
   crypt["S"]=String.fromCharCode(0xA7);
   crypt["T"]="T";
   crypt["U"]=String.fromCharCode(0xDC);
   crypt["V"]="V";
   crypt["W"]="W";
   crypt["X"]="><";
   crypt["Y"]=String.fromCharCode(0xA5);
   crypt["Z"]="Z";
   crypt["a"]=String.fromCharCode(0xE3);
   crypt["b"]="b";
   crypt["c"]=String.fromCharCode(0xE7);
   crypt["d"]="d";
   crypt["e"]=String.fromCharCode(0xEA);
   crypt["f"]=String.fromCharCode(402);
   crypt["g"]="9";
   crypt["h"]="h";
   crypt["i"]=String.fromCharCode(0xEE);
   crypt["j"]="j";
   crypt["k"]="k";
   crypt["l"]="l";
   crypt["m"]="m";
   crypt["n"]=String.fromCharCode(0xF1);
   crypt["o"]=String.fromCharCode(0xF5);
   crypt["p"]=String.fromCharCode(0xDE);
   crypt["q"]=String.fromCharCode(0xB6);
   crypt["r"]="r";
   crypt["s"]="s";
   crypt["t"]=String.fromCharCode(8224);
   crypt["u"]=String.fromCharCode(0xB5);
   crypt["v"]="v";
   crypt["w"]="w";
   crypt["x"]=String.fromCharCode(0xA4);
   crypt["y"]=String.fromCharCode(0xFF);
   crypt["z"]="z";
   var r="";
   for(x=0;x<txt.length;x++) {
      t=txt.substr(x,1);
      r+= (crypt[t] ? crypt[t] : t);
   }
   s.value=r;
}


//-----------------------------------------------------------
//--                      lines                            --
//-----------------------------------------------------------
function cerc() {
	v=getTextArea();
	v.value=v.value.replace(/\b/gi,"|");
}

//-----------------------------------------------------------
//--                  Colorful 1                           --
//-----------------------------------------------------------
function colorful() {
	cor=new Array('maroon','red','pink','orange','gold','gray','green','blue','navy');
	var z=0;
	cl=getTextArea();
	cl.value=cl.value.replace(/(.)/gi,"#$1");
	cl.value=cl.value.replace(/\# /gi," ");
	for(y=0;y<cl.value.length;y++){
		cl.value=cl.value.replace(/\#/,'['+cor[z]+']');
		z++;
		if(z==cor.length)
			z=0;
	}
var cd=cl.value;
cl.value="[silver]"+cd+"[/silver]";
}


//-----------------------------------------------------------
//--                  Written links                        --
//-----------------------------------------------------------
	function AamizWrite() {
	text=getTextArea();
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("div");
	d.className="T";
	d.style.fontSize="11px";
	d.align="left";
	d.innerHTML="";
	d.style.marginTop="10px";
	c.appendChild(d);

	zp=document.createElement("a");
	zp.href="javascript:;";
	zp.innerHTML="Encrypt or Decrypt";
	zp.addEventListener("click", ZP, true);
        d.appendChild(zp);


	SPA=document.createElement("b");
	SPA.innerHTML=" - ";
        d.appendChild(SPA);
	
	mm=document.createElement("a");
	mm.href="javascript:;";
	mm.innerHTML="aLtErNaTe";
	mm.addEventListener("click", mM, true);
	d.appendChild(mm);

	SPB=document.createElement("b");
	SPB.innerHTML=" - ";
        d.appendChild(SPB);

	ce=document.createElement("a");
	ce.href="javascript:;";
	ce.innerHTML="|Lines|";
	ce.addEventListener("click", cerc, true);
	d.appendChild(ce);

	SPC=document.createElement("b");
	SPC.innerHTML=" - ";
        d.appendChild(SPC);
	
	ss=document.createElement("a");
	ss.href="javascript:;";
	ss.innerHTML=String.fromCharCode(353)+String.fromCharCode(964)+String.fromCharCode(947)+String.fromCharCode(108)+String.fromCharCode(949);
	ss.addEventListener("click", stl, true);
	d.appendChild(ss);

	SPD=document.createElement("b");
	SPD.innerHTML=" - ";
        d.appendChild(SPD);

	s2=document.createElement("a");
	s2.href="javascript:;";
	s2.innerHTML=String.fromCharCode(0xA7)+String.fromCharCode(964)+String.fromCharCode(947)+String.fromCharCode(108)+String.fromCharCode(949);
	s2.addEventListener("click", ZPs, true);
	d.appendChild(s2);

	SPE=document.createElement("b");
	SPE.innerHTML=" - ";
        d.appendChild(SPE);

	color=document.createElement("a");
	color.href="javascript:;";
	color.innerHTML="<span style='color:yellow;'>C</span>o<span style='color:red'>l</span>o<span style='color:green'>r</span>f<span style='color:orange'>u</span>l<span style='color:blue'>l</span>";
	color.addEventListener("click", colorful, true);
	d.appendChild(color);

	SPF=document.createElement("b");
	SPF.innerHTML=" - ";
        d.appendChild(SPF);

	az=document.createElement("a");
	az.href="http://www.orkut.com/Profile.aspx?uid=11655973744284854524";
az.innerHTML="Sachin's Profile";
az.target="_blank";
d.appendChild(az);

	SPG=document.createElement("b");
	SPG.innerHTML=" - ";
        d.appendChild(SPG);

	ad=document.createElement("a");
	ad.href="http://www.orkut.com/Community.aspx?cmm=32920642";
	ad.innerHTML="Orkut Fun Zone ";
	ad.target="_blank";
	d.appendChild(ad);
}

AamizWrite();
}, false);

//-----------------------------------------------------------
//--                  Change Link to Image                 --
//-----------------------------------------------------------

var i=0;
function chngimg(){
doc=document;
lnk=doc.links;

for (i=0;i<lnk.length;i++){
getload="document.getElementById('loadi"+i+"')"
this2="document.getElementById('bfimg"+i+"')"

var sb=lnk[i].href.substring(lnk[i].href.length-4,lnk[i].href.length);sb=sb.toLowerCase()
if(sb=='.jpg' || sb=='.gif' || sb=='.png' || sb=='jpeg'){
lnk[i].innerHTML="<b id=loadi"+i+" onclick=\""+this2+".style.display='';"+getload+".style.display='none';return false;\"><font size=1 color=Blue id=load"+i+">Loading....</font></b><img onError=\"document.links["+i+"].innerHTML='<font size=1 color=red>Image Not Found</font>'\" oncontextmenu=\"if(aa"+i+"==0){if(imgh"+i+">imgw"+i+"){document.getElementById('bfimg"+i+"').height=imgh"+i+"};if(imgw"+i+">imgh"+i+"){document.getElementById('bfimg"+i+"').width=imgw"+i+"};aa"+i+"=1}else{if(this.height>200 && this.height>=this.width){this.height=200};if(this.width>200 && this.width>=this.height){this.width=200};aa"+i+"=0};return false\" src="+lnk[i].href+" style='display: none' id=bfimg"+i+" border=0 onload=\"aa"+i+"=0;imgh"+i+"=this.height;imgw"+i+"=this.width;if(this.height>200 && this.height>=this.width){this.height=200}else if(this.width>200 && this.width>=this.height){this.width=200;};this.style.display='';"+getload+".style.display='none';\">"
}}
}
chngimg()


//-----------------------------------------------------------
//--                         Tags                          --
//-----------------------------------------------------------
function changetags(){
br=document.body.innerHTML
if(br.indexOf("[img]") > -1 && br.indexOf("[/img]") > -1){
br=br.replace(/\[img\]/gi,'');
br=br.replace(/\[\/img\]/gi,'');
document.body.innerHTML = br;
}
}
changetags()
