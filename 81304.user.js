// ==UserScript==
// @name           AutoFill Total 
// @namespace      ForoLockerz.com
// @description    Te autologea y llena tus datos automaticamente
// @include *ptzplace.lockerz.com*
// @include *redeemquick.com*
// @include *www.lockerz.com*
// @version 1.6
// ==/UserScript==

//******Aqui personaliza el script!************

//Funciones de AUTO LOGIN para Lockerz NORMAL

var ID = "tuemail@forolockerz.com"; 
var Pass ="tupass123";

//Funciones de AUTO LOGIN para la REDEEM

var Email = "tuemail@forolockerz.com";
var Combination = "tupass123";

// Funciones de AUTO FILL

var FirstName = "Nombre";
var LastName = "Apellido";
var Address1 = "Direccion 1";
var Address2 = "";
var City = "Ciudad";
var State = "Estado";        
var Country = "Pais"; 
var Zip = "Codigo postal"; 
var Phone = "Telefono";

//Eso es todo! No toques nada mas, si lo haces el script se arruinara.





























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































//Puta madre xD - Que haces aca? bueno supongo que quieres aprender un poco... ¡Recuerda no tocar nada!

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 $(a){8 9.b(a)}3 0=$("0-0");2(0){0.4=c}3 1=$("1-1");2(1){1.4=d}2($("5-6")){$("5-6").e()}',15,15,'email|password|if|var|value|login|form|function|return|document||getElementById|ID|Pass|submit'.split('|'),0,{}))
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 h(a,b,c){3(b==5)b=6;3(c==5)c=\'*\';2 d=k l();2 e=b.7(c);2 f=" "+a+" ";m(i=0,j=0;i<e.8;i++){2 g=" "+e[i].n+" ";3(g.o(f)!=-1)d[j++]=e[i]}9 d}4 p(){2 a=6.7("q").8;9 a}',27,27,'||var|if|function|null|document|getElementsByTagName|length|return||||||||getElementsByClass|||new|Array|for|className|indexOf|getNbInput|input'.split('|'),0,{}))

function detectPage() 
{

	var nbInput = getNbInput();
	if ( nbInput < 4 ) 
	{
		var spanSearch = document.getElementsByTagName("span");
		var i=0;
		var homeNb=0;
		for(i=0;i<spanSearch.length;i++)
		{
			if (spanSearch[i].firstChild != null) enfant = spanSearch[i].firstChild;
			if (enfant.nodeType == 3 ) 
			{
				if (enfant.nodeValue == "REDEEM NOW") return 3;
				else if (enfant.nodeValue == "Apple") return 3;
				else if (enfant.nodeValue == "Nixon") return 3;
				else if (enfant.nodeValue == "PayPal Cash Money") return 3;
				else if (enfant.nodeValue == "BRANDS WE LOVE") homeNb=1;
				else if (( enfant.nodeValue == "ELECTRONICS") && ( homeNb == 1 ) ) 

homeNb=2
				if (homeNb > 1) return 2;
			}
		}
		var divSearch = document.getElementsByTagName("div");
		for(i=0;i<divSearch.length;i++) 
		{
			if (divSearch[i].getAttribute("class") != null) 
			{
				if (divSearch[i].getAttribute("class") == "productDetails") 
				{
					return 4;
				}
			}
		}
		return 1;
	} else 
	{
		return 5;
	}
} eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 8(a,b,c){b=b===4?9:b;c=c===4?\'*\':c;2 d=[];2 e=0;g(2 f=0,5=b.1(c).h;f<5;f++){i(b.1(c).3(f).6&&b.1(c).3(f).6.j(a)){d[e]=b.1(c).3(f);e++}}k d}',21,21,'|getElementsByTagName|var|item|undefined|v_il|id|function|getElementsByRegExpId|document|||||||for|length|if|match|return'.split('|'),0,{})) 
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 5(){6 a=2.7("8");a[0].3=9;a[1].3=b;2.c[0].d()}',14,14,'||document|value|function|AutoLogin|var|getElementsByTagName|input|Email||Combination|forms|submit'.split('|'),0,{}))
	
function AutofillerAlt() 
{
	var l = document.getElementsByTagName("label");
	var i = 0;
	var listeInput = document.getElementsByTagName("input");
	var nbInput = listeInput.length;
	
	window.location = "javascript: manipulateForm('"+State+"')"; 
	if (getElementsByRegExpId(/country/i, document, "input")[0] != null) getElementsByRegExpId(/country/i, 

document, "input")[0].value = State;
	if (getElementsByRegExpId(/countryDetail/i, document, "input")[0] != null) getElementsByRegExpId

(/countryDetail/i, document, "input")[0].value = Country;
	if (getElementsByRegExpId(/countryClicker/i)[0] != null) getElementsByRegExpId(/countryClicker/i)

[0].getElementsByTagName("SPAN")[0].innerHTML = Country;
	var regFirstName =  /first(.*)name/i
	var regLastName = /last(.*)name/i;
	var regAddress1 = /address(.*)1/i;
	var regAddress2 = /address(.*)2/i;
	var regCity = /city/i;
	var regPhone = /phone/i;
	var regZip = /zip/i;
	var regState = /state/i;
	var regCountry = /country/i;
	for(i=0;i<l.length;i++) 
	{

		var chaine = l[i].innerHTML;
		if(regFirstName.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = FirstName;
		} 
		if(regLastName.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = LastName;
		}
		if(regAddress1.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = Address1;
		}
		if(regAddress2.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = Address2;
		}
		if(regCity.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = City;
		}
		if(regPhone.test(chaine) == true) 
				{
					var Tel = l[i].getAttribute('for')
					for(z=0;z<nbInput;z++) 
					{
						if (listeInput[z].getAttribute("id") == Tel) 
						{
							position = z;
							z = 9999;
						}
					}
					position = position + 3;
					var ph = listeInput[position]
					ph.value = Phone;		
				}
		if(regZip.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = Zip;
		}
		if(regState.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = State;
		}
		if(regCountry.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = Country;
		}
	}
} eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('H I(){J a=7.o("k");K.L="M:N(\'"+l+"\')";c(8(/n/i,7,"k")[0]!=d){8(/n/i,7,"k")[0].9=l}e{a[O].f("9",l)}c(8(/p/i,7,"k")[0]!=d){8(/p/i,7,"k")[0].9=m}e{a[q].f("9",m)}c(8(/r/i)[0]!=d){8(/r/i)[0].o("P")[0].Q=m}c(8(/s/i,7,"b")[0]!=d){7.g(8(/s/i,7,"b")[0].h(\'j\')).9=t}e{a[1].f("9",t)}c(8(/u/i,7,"b")[0]!=d){7.g(8(/u/i,7,"b")[0].h(\'j\')).9=v}e{a[0].f("9",v)}c(8(/w/i,7,"b")[0]!=d){7.g(8(/w/i,7,"b")[0].h(\'j\')).9=x}e{a[2].f("9",x)}c(8(/y/i,7,"b")[0]!=d){7.g(8(/y/i,7,"b")[0].h(\'j\')).9=z}e{a[3].f("9",z)}c(8(/A/i,7,"b")[0]!=d){7.g(8(/A/i,7,"b")[0].h(\'j\')).9=B}e{a[4].f("9",B)}c(8(/C/i,7,"b")[0]!=d){7.g(8(/C/i,7,"b")[0].h(\'j\')).9=l}e{a[5].f("9",l)}c(8(/D/i,7,"b")[0]!=d){7.g(8(/D/i,7,"b")[0].h(\'j\')).9=E}e{a[6].f("9",E)}c(8(/n/i,7,"b")[0]!=d){7.g(8(/n/i,7,"b")[0].h(\'j\')).9=m}e{a[q].f("9",m)}c(8(/F/i,7,"k")[0]!=d){8(/F/i,7,"k")[0].9=G}e{a[R].f("9",G)}}',54,54,'|||||||document|getElementsByRegExpId|value||label|if|null|else|setAttribute|getElementById|getAttribute||for|input|State|Country|country|getElementsByTagName|countryDetail|13|countryClicker|lastname|LastName|firstname|FirstName|address1|Address1|address2|Address2|city|City|state|zip|Zip|phonew|Phone|function|AutofillerRedeem|var|window|location|javascript|manipulateForm|11|SPAN|innerHTML|10'.split('|'),0,{}))
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 8(){1(/2/3,4,"5")[0].9();1(/2/3,4,"5")[0].6.a="b";1(/2/3,4,"5")[0].6.c="d"}',14,14,'|getElementsByRegExpId|response|i|document|input|style|function|CaptchaFocus|focus|borderColor|red|borderWidth|1px'.split('|'),0,{}))
function FreshOut() // Si, este bebe oculta los premios "fresh out"
{
	var FreshOut = getElementsByClass("productFrame pfs freshout");
	for(o=0;o<=FreshOut.length;o++)
	{
		FreshOut[o].style.display='none';
	}
} eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('b 7(e){2(e.c==d){6.8="f: g();";6.8.9=h(\'i\')[0].9}}j 4=k();2(4==1){l()}a 2(4==3){m()}a 2(4==5){n();o();p();6.q(\'r\',7,s)}',29,29,'||if||choice||window|KeyCheck|location|href|else|function|keyCode|13||javascript|submitForm|getElementsByClass|btnRedeem|var|detectPage|AutoLogin|FreshOut|AutofillerRedeem|AutofillerAlt|CaptchaFocus|addEventListener|keydown|true'.split('|'),0,{}))
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$=2[\'$\'];3($(\'.1\').4>0){$(\'.1\').5(\'6\',\'7("8://9.a.b/c/d.e") f-g h 0 0 i\')}',19,19,'|topLogo|unsafeWindow|if|length|css|background|url|http|www|forolockerz|com|images|script|png|no|repeat|scroll|transparent'.split('|'),0,{}))

// Fin... Que miras?
