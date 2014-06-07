// ==UserScript==
// @version 1.1
// @name coolfonts
// @author DSSR
// @namespace http://www.orkut.com/Profile.aspx?uid=1767300381284563136
// @description Some cool fonts........
// @include http://www.orkut.com/CommMsgPost.aspx?*
// @include http://www.orkut.com/Scrapbook.aspx*
// @include http://www.orkut.com/CommMsgs.aspx?*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea() {
	return document.getElementsByTagName('textarea')[0];
}



//-----------------------------------------------------------
//--                     Font                             --
//-----------------------------------------------------------
function ZP() {
   o=getTextArea();
   txt=o.value;
   var crypt = new Array();
   crypt["A"]=String.fromCharCode(945);
   crypt["B"]="B";
   crypt["C"]="C";
   crypt["D"]="D";
   crypt["E"]=String.fromCharCode(1108);
   crypt["F"]="F";
   crypt["G"]="G";
   crypt["H"]=String.fromCharCode(1085);
   crypt["I"]="I";
   crypt["J"]="J";
   crypt["K"]="K";
   crypt["L"]="L";
   crypt["M"]=String.fromCharCode(1084);
   crypt["N"]=String.fromCharCode(1080);
   crypt["O"]=String.fromCharCode(963);
   crypt["P"]=String.fromCharCode(961);
   crypt["Q"]="Q";
   crypt["R"]=String.fromCharCode(1103);
   crypt["S"]=String.fromCharCode(3619);
   crypt["T"]=String.fromCharCode(1090);
   crypt["U"]=String.fromCharCode(965);
   crypt["V"]="V";
   crypt["W"]="W";
   crypt["X"]="X";
   crypt["Y"]="Y";
   crypt["Z"]="Z";
   crypt["a"]=String.fromCharCode(945);
   crypt["b"]="b";
   crypt["c"]="c";
   crypt["d"]="d";
   crypt["e"]=String.fromCharCode(1108);
   crypt["f"]="f";
   crypt["g"]="g";
   crypt["h"]=String.fromCharCode(1085);
   crypt["i"]="i";
   crypt["j"]="j";
   crypt["k"]="k";
   crypt["l"]="l";
   crypt["m"]=String.fromCharCode(1084);
   crypt["n"]=String.fromCharCode(1080);
   crypt["o"]=String.fromCharCode(963);
   crypt["p"]=String.fromCharCode(961);
   crypt["q"]="q";
   crypt["r"]=String.fromCharCode(1103);
   crypt["s"]=String.fromCharCode(3619);
   crypt["t"]=String.fromCharCode(1090);
   crypt["u"]=String.fromCharCode(965);
   crypt["v"]="v";
   crypt["w"]="w";
   crypt["x"]="x";
   crypt["y"]="y";
   crypt["z"]="z";
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
//--                     Font 1                           --
//-----------------------------------------------------------
function stl() {
         c = getTextArea();
         d = c.value;
         var coeiu = [["a","b","c","ý","d","e","f","g","h","i","j","k",
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
//--                     Font 2                           --
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
//--                      Font 3                            --
//-----------------------------------------------------------
function cerc() {
	s=getTextArea();
   txt=s.value;
   var crypt = new Array();
   crypt["A"]=String.fromCharCode(395);
   crypt["B"]=String.fromCharCode(386);
   crypt["C"]="C";
   crypt["D"]="D";
   crypt["E"]=String.fromCharCode(600);
   crypt["F"]=String.fromCharCode(402);
   crypt["G"]="G";
   crypt["H"]="H";
   crypt["I"]=String.fromCharCode(953);
   crypt["J"]="J";
   crypt["K"]="K";
   crypt["L"]="L";
   crypt["M"]=String.fromCharCode(625);
   crypt["N"]=String.fromCharCode(626);
   crypt["O"]=String.fromCharCode(493);
   crypt["P"]="P";
   crypt["Q"]="Q";
   crypt["R"]=String.fromCharCode(641);
   crypt["S"]=String.fromCharCode(423);
   crypt["T"]=String.fromCharCode(647);
   crypt["U"]="U";
   crypt["V"]="V";
   crypt["W"]="W";
   crypt["X"]="X";
   crypt["Y"]="Y";
   crypt["Z"]="Z";
   crypt["a"]=String.fromCharCode(395);
   crypt["b"]=String.fromCharCode(386);
   crypt["c"]="c";
   crypt["d"]="d";
   crypt["e"]=String.fromCharCode(600);
   crypt["f"]=String.fromCharCode(402);
   crypt["g"]="g";
   crypt["h"]="h";
   crypt["i"]=String.fromCharCode(953);
   crypt["j"]="j";
   crypt["k"]="k";
   crypt["l"]="l";
   crypt["m"]=String.fromCharCode(625);
   crypt["n"]=String.fromCharCode(626);
   crypt["o"]=String.fromCharCode(493);
   crypt["p"]="p";
   crypt["q"]="q";
   crypt["r"]=String.fromCharCode(641);
   crypt["s"]=String.fromCharCode(423);
   crypt["t"]=String.fromCharCode(647);
   crypt["u"]="u";
   crypt["v"]="v";
   crypt["w"]="w";
   crypt["x"]="x";
   crypt["y"]="y";
   crypt["z"]="z";
   var r="";
   for(x=0;x<txt.length;x++) {
      t=txt.substr(x,1);
      r+= (crypt[t] ? crypt[t] : t);
   }
   s.value=r;
}

//-----------------------------------------------------------
//--                  Font 4                              --
//-----------------------------------------------------------
function colorful() {
	s=getTextArea();
   txt=s.value;
   var crypt = new Array();
   crypt["A"]=String.fromCharCode(261);
   crypt["B"]=String.fromCharCode(1066);
   crypt["C"]=String.fromCharCode(8834);
   crypt["D"]=String.fromCharCode(1338);
   crypt["E"]=String.fromCharCode(958);
   crypt["F"]=String.fromCharCode(21315);
   crypt["G"]=String.fromCharCode(485);
   crypt["H"]=String.fromCharCode(23380);
   crypt["I"]=String.fromCharCode(302);
   crypt["J"]=String.fromCharCode(3782);
   crypt["K"]=String.fromCharCode(1181);
   crypt["L"]=String.fromCharCode(8556);
   crypt["M"]=String.fromCharCode(9807);
   crypt["N"]=String.fromCharCode(63247);
   crypt["O"]=String.fromCharCode(248);
   crypt["P"]=String.fromCharCode(961);
   crypt["Q"]=String.fromCharCode(8474);
   crypt["R"]=String.fromCharCode(345);
   crypt["S"]=String.fromCharCode(2796);
   crypt["T"]=String.fromCharCode(358);
   crypt["U"]=String.fromCharCode(9739);
   crypt["V"]=String.fromCharCode(8730);
   crypt["W"]=String.fromCharCode(969);
   crypt["X"]=String.fromCharCode(20034);
   crypt["Y"]="Y";
   crypt["Z"]="Z";
   crypt["a"]=String.fromCharCode(261);
   crypt["b"]=String.fromCharCode(1066);
   crypt["c"]=String.fromCharCode(8834);
   crypt["d"]=String.fromCharCode(1338);
   crypt["e"]=String.fromCharCode(958);
   crypt["f"]=String.fromCharCode(21315);
   crypt["g"]=String.fromCharCode(485);
   crypt["h"]=String.fromCharCode(23380);
   crypt["i"]=String.fromCharCode(302);
   crypt["j"]=String.fromCharCode(3782);
   crypt["k"]=String.fromCharCode(1181);
   crypt["l"]=String.fromCharCode(8556);
   crypt["m"]=String.fromCharCode(9807);
   crypt["n"]=String.fromCharCode(63247);
   crypt["o"]=String.fromCharCode(248);
   crypt["p"]=String.fromCharCode(961);
   crypt["q"]=String.fromCharCode(8474);
   crypt["r"]=String.fromCharCode(345);
   crypt["s"]=String.fromCharCode(2796);
   crypt["t"]=String.fromCharCode(358);
   crypt["u"]=String.fromCharCode(9739);
   crypt["v"]=String.fromCharCode(8730);
   crypt["w"]=String.fromCharCode(969);
   crypt["x"]=String.fromCharCode(20034);
   crypt["y"]="y";
   crypt["z"]="z";
   var r="";
   for(x=0;x<txt.length;x++) {
      t=txt.substr(x,1);
      r+= (crypt[t] ? crypt[t] : t);
   }
   s.value=r;
}


//-----------------------------------------------------------
//--                     Font 5                            --
//-----------------------------------------------------------
function mM() {
   o=getTextArea();
   txt=o.value;
   var crypt = new Array();
   crypt["A"]=String.fromCharCode(3588);
   crypt["B"]=String.fromCharCode(3666);
   crypt["C"]="C";
   crypt["D"]=String.fromCharCode(8706);
   crypt["E"]=String.fromCharCode(1108);
   crypt["F"]=String.fromCharCode(402);
   crypt["G"]="G";
   crypt["H"]=String.fromCharCode(1085);
   crypt["I"]=String.fromCharCode(3648);
   crypt["J"]="J";
   crypt["K"]="K";
   crypt["L"]=String.fromCharCode(8467);
   crypt["M"]=String.fromCharCode(1084);
   crypt["N"]=String.fromCharCode(3616);
   crypt["O"]=String.fromCharCode(963);
   crypt["P"]=String.fromCharCode(1385);
   crypt["Q"]="Q";
   crypt["R"]=String.fromCharCode(1103);
   crypt["S"]=String.fromCharCode(3619);
   crypt["T"]=String.fromCharCode(1090);
   crypt["U"]=String.fromCharCode(965);
   crypt["V"]=String.fromCharCode(8730);
   crypt["W"]=String.fromCharCode(3628);
   crypt["X"]="X";
   crypt["Y"]="Y";
   crypt["Z"]="Z";
   crypt["a"]=String.fromCharCode(3588);
   crypt["b"]=String.fromCharCode(3666);
   crypt["c"]="c";
   crypt["d"]=String.fromCharCode(8706);
   crypt["e"]=String.fromCharCode(1108);
   crypt["f"]=String.fromCharCode(402);
   crypt["g"]="G";
   crypt["h"]=String.fromCharCode(1085);
   crypt["i"]=String.fromCharCode(3648);
   crypt["j"]="j";
   crypt["k"]="k";
   crypt["l"]=String.fromCharCode(8467);
   crypt["m"]=String.fromCharCode(1084);
   crypt["n"]=String.fromCharCode(3616);
   crypt["o"]=String.fromCharCode(963);
   crypt["p"]=String.fromCharCode(1385);
   crypt["q"]="q";
   crypt["r"]=String.fromCharCode(1103);
   crypt["s"]=String.fromCharCode(3619);
   crypt["t"]=String.fromCharCode(1090);
   crypt["u"]=String.fromCharCode(965);
   crypt["v"]=String.fromCharCode(8730);
   crypt["w"]=String.fromCharCode(3628);
   crypt["x"]="x";
   crypt["y"]="y";
   crypt["z"]="z";
   var r="";
   for(x=0;x<txt.length;x++) {
      t=txt.substr(x,1).toLowerCase();
      r+= (crypt[t] ? crypt[t] : t);
   }
   o.value=r;
}


//-----------------------------------------------------------
//--                     Mirror                            --
//-----------------------------------------------------------
function dip() {
   o=getTextArea();
   txt=o.value;
   var crypt = new Array();
   crypt["a"]=String.fromCharCode(592);
   crypt["b"]="q";
   crypt["c"]=String.fromCharCode(596);
   crypt["d"]="p";
   crypt["e"]=String.fromCharCode(477);
   crypt["f"]=String.fromCharCode(607);
   crypt["g"]="b";
   crypt["h"]=String.fromCharCode(613);
   crypt["i"]=String.fromCharCode(305);
   crypt["j"]=String.fromCharCode(1592);
   crypt["k"]=String.fromCharCode(670);
   crypt["l"]="1";
   crypt["m"]=String.fromCharCode(623);
   crypt["n"]="u";
   crypt["o"]="o";
   crypt["p"]="d";
   crypt["q"]="b";
   crypt["r"]=String.fromCharCode(633);
   crypt["s"]="s";
   crypt["t"]=String.fromCharCode(647);
   crypt["u"]="n";
   crypt["v"]=String.fromCharCode(652);
   crypt["w"]=String.fromCharCode(653);
   crypt["x"]="x";
   crypt["y"]=String.fromCharCode(654);
   crypt["z"]="z";
   var r="";
   for(x=0;x<txt.length;x++) {
      t=txt.substr(x,1).toLowerCase();
      r+= (crypt[t] ? crypt[t] : t);
   }
   o.value=r;
}


//-----------------------------------------------------------
//--                  Written links                        --
//-----------------------------------------------------------
	
        function deafening(){
        text=getTextArea();
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("div");
	d.className="T";
	d.style.fontSize="11px";
	d.align="left";
        d.innerHTML="<b>"+"f"+String.fromCharCode(963)+String.fromCharCode(1080)+String.fromCharCode(1090)+String.fromCharCode(3619)+" </b><br />";
	d.style.marginTop="10px";
	c.appendChild(d);
		

        zp=document.createElement("a");
	zp.href="javascript:;";
	zp.innerHTML=String.fromCharCode(3619)+String.fromCharCode(1090)+"Y"+"L"+String.fromCharCode(1108);
	zp.addEventListener("click", ZP, true);
        d.appendChild(zp);


	SPA=document.createElement("b");
	SPA.innerHTML=" - ";
        d.appendChild(SPA);
	
	mm=document.createElement("a");
	mm.href="javascript:;";
	mm.innerHTML=String.fromCharCode(402)+String.fromCharCode(963)+String.fromCharCode(3616)+String.fromCharCode(1090);
	mm.addEventListener("click", mM, true);
	d.appendChild(mm);

	SPB=document.createElement("b");
	SPB.innerHTML=" - ";
        d.appendChild(SPB);

	ce=document.createElement("a");
	ce.href="javascript:;";
	ce.innerHTML=String.fromCharCode(423)+String.fromCharCode(647)+"Y"+"L"+String.fromCharCode(600);
	ce.addEventListener("click", cerc, true);
	d.appendChild(ce);

	SPC=document.createElement("b");
	SPC.innerHTML=" - ";
        d.appendChild(SPC);
	
	ss=document.createElement("a");
	ss.href="javascript:;";
	ss.innerHTML=String.fromCharCode(402)+String.fromCharCode(920)+String.fromCharCode(960)+String.fromCharCode(964);
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
	color.innerHTML=String.fromCharCode(21315)+String.fromCharCode(248)+String.fromCharCode(63247)+String.fromCharCode(358);
	color.addEventListener("click", colorful, true);
	d.appendChild(color);

	SPF=document.createElement("b");
	SPF.innerHTML=" - ";
        d.appendChild(SPF);

        di=document.createElement("a");
	di.href="javascript:;";
	di.innerHTML=String.fromCharCode(623)+String.fromCharCode(305)+String.fromCharCode(633)+String.fromCharCode(633)+String.fromCharCode(633)+"o"+String.fromCharCode(633);
	di.addEventListener("click", dip, true);
	d.appendChild(di);

	SPF=document.createElement("b");
	SPF.innerHTML=" - ";
        d.appendChild(SPF);

	def=document.createElement("a");
	def.href="http://www.orkut.com/Profile.aspx?uid=1767300381284563136";
def.innerHTML="["+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(0xD0)+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(0xA7)+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(0xA7)+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(0xAE)+String.fromCharCode(773)+String.fromCharCode(818)+"]"+" Profile";
def.target="_blank";
d.appendChild(def);
}

deafening();
}, false);

