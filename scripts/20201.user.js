// ==UserScript==
// @version 2.4
// @name Stylexxx 5
// @author my sweet friend DSSR
// @namespace http://www.orkut.com/Profile.aspx?uid=3994617343526165457
// @description Some styles to modify ur text in a SEXY MANNER......
// @include http://www.orkut.com/Scrapbook.aspx*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea() {
	return document.getElementsByTagName('textarea')[0];
}


//-----------------------------------------------------------
//--                      Style1                          --
//-----------------------------------------------------------

function style1() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value='<b><div style="border:1px solid #F0767C;margin:2px;padding:5px;background-color:#FAD2D4;width:95%;text-align:left"> <center><font face="Comic Sans MS" size="4" color="#F0767C">'+e+'</font></center></div></b>';
}

//-----------------------------------------------------------
//--                      Style2                          --
//-----------------------------------------------------------

function style2() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value='<font face="Comic Sans Ms" style="font-size:36pt;text-decoration:blink">'+e+'</font>';
}


//-----------------------------------------------------------
//--                      Style3                          --
//-----------------------------------------------------------

function style3() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value='<div class="para" ><font color="#C6C6C6">.</font><div style="border:9px solid GoldenRod;margin:0px;padding:5px;font-family:Comic Sans MS;font-size:14px;background-color:LightGoldenRodYellow;width:80%;text-align:left"><b><font color="#000084">'+e+'</font></b></div>';
}


//-----------------------------------------------------------
//--                      Style4                          --
//-----------------------------------------------------------

function style4() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value='<div> <br><table><tbody><tr><td bgcolor=""><div style="border:7px dashed rgb(116, 153, 222);width:442px"><div style="border:14px ridge rgb(116, 153, 222);width:414px"><div style="border:7px dotted rgb(116, 153, 222);width:400px"><center><h1><font size="4"><font color="#7499de"><font face="Comic Sans MS"><big><b><h1><b><big>[violet]<s>'+e+'</s>[/violet]</big></b></h1></b></big></font></font></font></h1></center></div></div></div></td></tr></tbody></table></div>';
}


//-----------------------------------------------------------
//--                      Style5                          --
//-----------------------------------------------------------

function style5() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value='<center><table border="20"><thead><tr bgcolor="#00FFFF"><td><font face="comic sans ms" color="#808000" size="10"><b><u>'+e+'</u></b></font></td></tr></thead></table></center>';
}


//-----------------------------------------------------------
//--                      Style6                          --
//-----------------------------------------------------------

function style6() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value='<div style="background-color:#ADDFFF"><p><font face="frosty, serif" size="60" color="#B93B8F">'+e+'</font></p></div>';
}


//-----------------------------------------------------------
//--                      Style7                         --
//-----------------------------------------------------------

function style7() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value='<center><a href="give the link here"><img src="give the image link here" title="give the title here"><br><br><font color="#9C9C9C">'+e+'</font></a></center>';
}








//-----------------------------------------------------------
//--                  Written links                        --
//-----------------------------------------------------------
	function dip() {
	text=getTextArea();
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("div");
	d.className="T";
	d.style.fontSize="11px";
	d.align="left";
	
        
        d.style.marginTop="10px";
	c.appendChild(d);


	aa=document.createElement("a");
	aa.href="javascript:;";
	aa.innerHTML="Blink";
	aa.addEventListener("click", style2, true);
	d.appendChild(aa);
	
	
	SPF=document.createElement("b");
	SPF.innerHTML=" - ";
        d.appendChild(SPF);

	mm=document.createElement("a");
	mm.href="javascript:;";
	mm.innerHTML="Template1";
	mm.addEventListener("click", style1, true);
	d.appendChild(mm);


	SPF=document.createElement("b");
	SPF.innerHTML=" - ";
        d.appendChild(SPF);

	bb=document.createElement("a");
	bb.href="javascript:;";
	bb.innerHTML="Template2";
	bb.addEventListener("click", style3, true);
	d.appendChild(bb);

	SPF=document.createElement("b");
	SPF.innerHTML=" - ";
        d.appendChild(SPF);

 	cc=document.createElement("a");
	cc.href="javascript:;";
	cc.innerHTML="Template3";
	cc.addEventListener("click", style4, true);
	d.appendChild(cc);

	SPF=document.createElement("b");
	SPF.innerHTML=" - ";
        d.appendChild(SPF);

	ff=document.createElement("a");
	ff.href="javascript:;";
	ff.innerHTML="Template4";
	ff.addEventListener("click", style5, true);
	d.appendChild(ff);

	SPF=document.createElement("b");
	SPF.innerHTML=" - ";
        d.appendChild(SPF);

	gg=document.createElement("a");
	gg.href="javascript:;";
	gg.innerHTML="Template5";
	gg.addEventListener("click", style6, true);
	d.appendChild(gg);

	SPF=document.createElement("b");
	SPF.innerHTML=" - ";
        d.appendChild(SPF);


	hh=document.createElement("a");
	hh.href="javascript:;";
	hh.innerHTML="link_maker";
	hh.addEventListener("click", style7, true);
	d.appendChild(hh);

	


	
	
}
dip();
}, false);