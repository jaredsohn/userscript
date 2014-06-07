// ==UserScript==
// @name Multiple Function Scraping for Orkut Freaks!
// @namespace 
// @namespace 
// @description Multiple Operations in a Single Script!
// @include http://www.orkut.com*
// ==/UserScript==

(function() {

    var i1=document.getElementsByTagName('td');
    var idx1 = i1[0].innerHTML.indexOf("|");
    var idx2 = i1[0].innerHTML.indexOf("|", idx1+1);
    var headerMenu_bar = i1[0].innerHTML.substr(0, idx1+2) + '<a href="http://www.orkut.com/Settings.aspx">settings</a> ' + i1[0].innerHTML.substr(idx2);
    i1[0].innerHTML = headerMenu_bar;

    var newMenuItem = new Array(
	             '<a class="H" href="http://orkutplus.blogspot.com" target="_blank">Orkut Plus!</a>'
		
        );

    i1[2].innerHTML += "|";
    for (var k=0; k<newMenuItem.length; k++) {
        if ( (k==6) || (k==10) ) {
            i1[2].innerHTML += " ";
            }
        i1[2].innerHTML += " " + newMenuItem[k];
        }
    i1[2].innerHTML += " ";

    }
)();

b="";
for(i=0;i<document.links.length;i++){
	if (document.links[i].innerHTML=='News'){
		document.links[i].parentNode.innerHTML=document.links[i].parentNode.innerHTML+"<a class=H href='http://orkutplus.co.nr'></a>"
	}
}
;void(0)

// ==UserScript==
// @version 1
// @name Signature Button 
// @author  <http://www.orkut.com/Profile.aspx?uid=18307299392403106850>
// @author  <http://www.orkut.com/Profile.aspx?uid=4895905875405966859>
// @namespace
// @description Signature
// @include http://www.orkut.com/Scrapbook.aspx?uid=*
// @include http://www.orkut.com/CommMsgPost.aspx?*
// ==/UserScript==

// edit The value of Signa Below for ur Own Signature... 

var signa="\n\n\n\n[b]\n---------------------\n [b][red]Best Orkut Tips and Tricks @[/red][/b][blue][b] www&#46;orkutplus&#46;blogspot&#46;com\n\---------------------[/blue][/b]";




// Dont Edit Anything Below this line


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}

//-----------------------------------------------------------
//--                           Org                         --
//-----------------------------------------------------------
	function sign(){
	sig=getTextArea(0);
	sig.value+=signa;
	}

	function sg() {
	text=getTextArea(0);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign, true);
	c.appendChild(d);
	}

//-----------------------------------------------------------
//--                           001                         --
//-----------------------------------------------------------
	function sign1(){
	sig=getTextArea(1);
	sig.value+=signa;
	}

	function sg1() {
	text=getTextArea(1);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign1, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           002                         --
//-----------------------------------------------------------
	function sign2(){
	sig=getTextArea(2);
	sig.value+=signa;
	}

	function sg2() {
	text=getTextArea(2);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign2, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           003                         --
//-----------------------------------------------------------
	function sign3(){
	sig=getTextArea(3);
	sig.value+=signa;
	}

	function sg3() {
	text=getTextArea(3);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign3, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           004                         --
//-----------------------------------------------------------
	function sign4(){
	sig=getTextArea(4);
	sig.value+=signa;
	}

	function sg4() {
	text=getTextArea(4);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign4, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           005                         --
//-----------------------------------------------------------
	function sign5(){
	sig=getTextArea(5);
	sig.value+=signa;
	}

	function sg5() {
	text=getTextArea(5);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign5, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           006                         --
//-----------------------------------------------------------
	function sign6(){
	sig=getTextArea(6);
	sig.value+=signa;
	}

	function sg6() {
	text=getTextArea(6);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign6, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           007                         --
//-----------------------------------------------------------
	function sign7(){
	sig=getTextArea(7);
	sig.value+=signa;
	}

	function sg7() {
	text=getTextArea(7);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign7, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           008                         --
//-----------------------------------------------------------
	function sign8(){
	sig=getTextArea(8);
	sig.value+=signa;
	}

	function sg8() {
	text=getTextArea(8);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign8, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           009                         --
//-----------------------------------------------------------
	function sign9(){
	sig=getTextArea(9);
	sig.value+=signa;
	}

	function sg9() {
	text=getTextArea(9);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign9, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           010                         --
//-----------------------------------------------------------
	function sign10(){
	sig=getTextArea(10);
	sig.value+=signa;
	}

	function sg10() {
	text=getTextArea(10);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign10, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           011                         --
//-----------------------------------------------------------
	function sign11(){
	sig=getTextArea(11);
	sig.value+=signa;
	}

	function sg11() {
	text=getTextArea(11);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign11, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           012                         --
//-----------------------------------------------------------
	function sign12(){
	sig=getTextArea(12);
	sig.value+=signa;
	}

	function sg12() {
	text=getTextArea(12);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign12, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           013                         --
//-----------------------------------------------------------
	function sign13(){
	sig=getTextArea(13);
	sig.value+=signa;
	}

	function sg13() {
	text=getTextArea(13);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign13, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           014                         --
//-----------------------------------------------------------
	function sign14(){
	sig=getTextArea(14);
	sig.value+=signa;
	}

	function sg14() {
	text=getTextArea(14);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign14, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           015                         --
//-----------------------------------------------------------
	function sign15(){
	sig=getTextArea(15);
	sig.value+=signa;
	}

	function sg15() {
	text=getTextArea(15);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign15, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           016                         --
//-----------------------------------------------------------
	function sign16(){
	sig=getTextArea(16);
	sig.value+=signa;
	}

	function sg16() {
	text=getTextArea(16);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign16, true);
	c.appendChild(d);
	}


//-----------------------------------------------------------
//--                           017                         --
//-----------------------------------------------------------
	function sign17(){
	sig=getTextArea(17);
	sig.value+=signa;
	}

	function sg17() {
	text=getTextArea(17);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign17, true);
	c.appendChild(d);
	}

//-----------------------------------------------------------
//--                           018                         --
//-----------------------------------------------------------
	function sign18(){
	sig=getTextArea(18);
	sig.value+=signa;
	}

	function sg18() {
	text=getTextArea(18);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign18, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           019                         --
//-----------------------------------------------------------
	function sign19(){
	sig=getTextArea(19);
	sig.value+=signa;
	}

	function sg19() {
	text=getTextArea(19);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign19, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           020                         --
//-----------------------------------------------------------
	function sign20(){
	sig=getTextArea(20);
	sig.value+=signa;
	}

	function sg20() {
	text=getTextArea(20);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign20, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           021                         --
//-----------------------------------------------------------
	function sign21(){
	sig=getTextArea(21);
	sig.value+=signa;
	}

	function sg21() {
	text=getTextArea(21);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign21, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           022                         --
//-----------------------------------------------------------
	function sign22(){
	sig=getTextArea(22);
	sig.value+=signa;
	}

	function sg22() {
	text=getTextArea(22);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign22, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           023                         --
//-----------------------------------------------------------
	function sign23(){
	sig=getTextArea(23);
	sig.value+=signa;
	}

	function sg23() {
	text=getTextArea(23);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign23, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           024                         --
//-----------------------------------------------------------
	function sign24(){
	sig=getTextArea(24);
	sig.value+=signa;
	}

	function sg24() {
	text=getTextArea(24);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign24, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           025                         --
//-----------------------------------------------------------
	function sign25(){
	sig=getTextArea(25);
	sig.value+=signa;
	}

	function sg25() {
	text=getTextArea(25);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign25, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           026                         --
//-----------------------------------------------------------
	function sign26(){
	sig=getTextArea(26);
	sig.value+=signa;
	}

	function sg26() {
	text=getTextArea(26);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign26, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           027                         --
//-----------------------------------------------------------
	function sign27(){
	sig=getTextArea(27);
	sig.value+=signa;
	}

	function sg27() {
	text=getTextArea(27);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign27, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           028                         --
//-----------------------------------------------------------
	function sign28(){
	sig=getTextArea(28);
	sig.value+=signa;
	}

	function sg28() {
	text=getTextArea(28);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign28, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           029                         --
//-----------------------------------------------------------
	function sign29(){
	sig=getTextArea(29);
	sig.value+=signa;
	}

	function sg29() {
	text=getTextArea(29);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign29, true);
	c.appendChild(d);
	}
//-----------------------------------------------------------
//--                           030                         --
//-----------------------------------------------------------
	function sign30(){
	sig=getTextArea(30);
	sig.value+=signa;
	}

	function sg30() {
	text=getTextArea(30);
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("a");
	d.className="T";
	d.style.marginTop="10px";
	d.style.fontSize="10px";
	d.align="Right";
	d.innerHTML="Signature";
	d.href="javascript:;";
	d.addEventListener("click", sign30, true);
	c.appendChild(d);
	}
sg();
sg1();
sg2();
sg3();
sg4();
sg5();
sg6();
sg7();
sg8();
sg9();
sg10();
sg11();
sg12();
sg13();
sg14();
sg15();
sg16();
sg17();
sg18();
sg19();
sg20();
sg21();
sg22();
sg23();
sg24();
sg25();
sg26();
sg27();
sg28();
sg29();
sg30();
}, false);

// ==UserScript==
// @version 1.2 
// @name Write(Scrap)
// @author 
// @author 
// @namespace
// @description Its Modifies Your Text...
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
	cor=new Array('maroon','red','orange','green','blue','navy');
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
//--                      Box                           --
//-----------------------------------------------------------
function box() {
	z=getTextArea();
	z.value="[b]"+"["+z.value.replace(/|/g,String.fromCharCode(773)+String.fromCharCode(818))+"]";
}


//-----------------------------------------------------------
//--                      Heart                           --
//-----------------------------------------------------------
function hea() {
	y=getTextArea();
	y.value="[b]"+"("+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(9829)+String.fromCharCode(773)+String.fromCharCode(818)+"|"+y.value.replace(/|/g,String.fromCharCode(773)+String.fromCharCode(818))+"|"+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(9829)+String.fromCharCode(773)+String.fromCharCode(818)+")";
}


//-----------------------------------------------------------
//--                      Dot                           --
//-----------------------------------------------------------

function dot() {
	e=getTextArea();
	e.value="[b]"+"("+String.fromCharCode(773)+String.fromCharCode(818)+":"+String.fromCharCode(773)+String.fromCharCode(818)+":"+String.fromCharCode(773)+String.fromCharCode(818)+"|"+e.value.replace(/|/g,String.fromCharCode(773)+String.fromCharCode(818))+"|"+String.fromCharCode(773)+String.fromCharCode(818)+":"+String.fromCharCode(773)+String.fromCharCode(818)+":"+String.fromCharCode(773)+String.fromCharCode(818)+")";
}


//-----------------------------------------------------------
//--                  Written links                        --
//-----------------------------------------------------------
	function OrkutPlusWrite() {
	text=getTextArea();
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("div");
	d.className="T";
	d.style.fontSize="11px";
	d.align="left";

d.innerHTML="<b>"+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+String.fromCharCode()+"</b><br />";	
        d.style.marginTop="7px";
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
	color.innerHTML="<span style='color:navy;'>C</span>o<span style='color:red'>l</span>o<span style='color:green'>r</span>f<span style='color:orange'>u</span>l<span style='color:blue'>l</span>";
	color.addEventListener("click", colorful, true);
	d.appendChild(color);
	
	SPE=document.createElement("b");
	SPE.innerHTML=" - ";
        d.appendChild(SPE);
	
	bo=document.createElement("a");
	bo.href="javascript:;";
	bo.innerHTML="["+String.fromCharCode(773)+String.fromCharCode(818)+"B"+String.fromCharCode(773)+String.fromCharCode(818)+"o"+String.fromCharCode(773)+String.fromCharCode(818)+"x"+String.fromCharCode(773)+String.fromCharCode(818)+"]";
	bo.addEventListener("click", box, true);
	d.appendChild(bo);
	
	SPE=document.createElement("b");
	SPE.innerHTML=" - ";
        d.appendChild(SPE);
	
	he=document.createElement("a");
	he.href="javascript:;";
	he.innerHTML="("+String.fromCharCode(9829)+String.fromCharCode(773)+String.fromCharCode(818)+"H"+String.fromCharCode(773)+String.fromCharCode(818)+"e"+String.fromCharCode(773)+String.fromCharCode(818)+"a"+String.fromCharCode(773)+String.fromCharCode(818)+"r"+String.fromCharCode(773)+String.fromCharCode(818)+"t"+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(9829)+")";
	he.addEventListener("click", hea, true);
	d.appendChild(he);
	
	SPE=document.createElement("b");
	SPE.innerHTML=" - ";
        d.appendChild(SPE);
	
	dt=document.createElement("a");
	dt.href="javascript:;";
	dt.innerHTML="("+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(58)+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(58)+String.fromCharCode(773)+String.fromCharCode(818)+"B"+String.fromCharCode(773)+String.fromCharCode(818)+"a"+String.fromCharCode(773)+String.fromCharCode(818)+"n"+String.fromCharCode(773)+String.fromCharCode(818)+"d"+String.fromCharCode(773)+String.fromCharCode(818)+"-"+String.fromCharCode(773)+String.fromCharCode(818)+"A"+String.fromCharCode(773)+String.fromCharCode(818)+"i"+String.fromCharCode(773)+String.fromCharCode(818)+"d"+String.fromCharCode(58)+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(58)+String.fromCharCode(773)+String.fromCharCode(818)+")";
	dt.addEventListener("click", dot, true);
	d.appendChild(dt);
}

OrkutPlusWrite();
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

