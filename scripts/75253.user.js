// ==UserScript==
// @name           Larki-Piac
// @namespace      http://larkinor.index.hu
// @include        http://larkinor.index.hu/cgi-bin/larkinor.run
// @include        http://wanderlust2.index.hu/cgi-bin/jatek.com
// ==/UserScript==

//  A programot írta Trigal (Wolf) a LArkinor Védelmezői klán (LVK) klán tagja
//  A program a larkionor szabályzatával nem ütközik!
//  nem cselekszik, nem tesz helyetted semmit!!
//  Egyetlen hasznos tulajdonsága, hogy a piacon a hátizsákod tartalmát átáthatóbbá teszi.
// Jó játékot mindenkinek.
// A programom ne módosítsd, ha mégis, akkor jelezd hogy ki az eredeti alkotó,
// esetleg még egy elérhetőséget is tehetsz az eredeti scriptre. 
//
//                                                             Köszi: Trigal / Wolf

var piac="n";
var img=document.getElementsByTagName("img");
for(var i=0; i<img.length; i++)
	{
	if(img[i].src=="http://larkinor.index.hu/2/epulet/54piac.gif") {piac="y";}
if(img[i].src=="http://wanderlust2.index.hu/epulet/54piac.gif") {piac="y";}
if(img[i].src=="http://wanderlust2.index.hu/epulet/-1627piac.gif") {piac="y";}		
	}

if(piac=="y")
{
var select=document.forms[1].elements[0].innerHTML;

var T=select.split("</option>");
var code=new Array();
var db=new Array();
var nev=new Array();
var str,csere;


for(var i=0; i<T.length; i++)
	{
	T[i]+="</options>";
	str=T[i].substring(T[i].indexOf("\">")+2,T[i].indexOf("</"));
	code[i]=T[i].substring(T[i].indexOf("\"")+1,T[i].indexOf("\">"));	
	db[i]=str.substring(0,str.indexOf(" "));
	nev[i]=str.substring(str.indexOf(" "),str.length);
	nev[i]=nev[i].toLowerCase();	
	}
	
	
for(var i=0; i<T.length-1; i++)
	{
	for(var j=i+1; j<T.length; j++)
		{
		if(nev[i]>nev[j])
			{
			csere=nev[i];nev[i]=nev[j];nev[j]=csere;
			csere=db[i];db[i]=db[j];db[j]=csere;
			csere=code[i];code[i]=code[j];code[j]=csere;			
			}
		}
	}	
	
var er="";
for(var i=0; i<T.length; i++)
	{
	if(nev[i]=="") {nev[i]="www.lvk.fw.hu"; db[i]="&nbsp;&nbsp;&nbsp; -Trigal- &nbsp;&nbsp;&nbsp;";}
	er+="<option value="+code[i]+">"+nev[i]+" ( "+db[i]+" )</option>";
	}
document.forms[1].elements[0].innerHTML=er;	
}