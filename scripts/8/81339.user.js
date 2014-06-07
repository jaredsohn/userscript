// ==UserScript==
// @name           Larkinor Rablás Szöveg Loggoló
// @namespace      Larkinor
// @description    Larkinor jatekban az utolso 10 rablas szoveget oldalra kiirja
// @include        http://larkinor.index.hu/*
// @author         L4rk1.F4n
// @version        1.001
// @last update    2010.07.12
// ==/UserScript==




if(!GM_getValue('log1')) GM_setValue('log1','log1 szöveg');
if(!GM_getValue('log2')) GM_setValue('log2','log2 szöveg');
if(!GM_getValue('log3')) GM_setValue('log3','log3 szöveg');
if(!GM_getValue('log4')) GM_setValue('log4','log4 szöveg');
if(!GM_getValue('log5')) GM_setValue('log5','log5 szöveg');
if(!GM_getValue('log6')) GM_setValue('log6','log6 szöveg');
if(!GM_getValue('log7')) GM_setValue('log7','log7 szöveg');
if(!GM_getValue('log8')) GM_setValue('log8','log8 szöveg');
if(!GM_getValue('log9')) GM_setValue('log9','log9 szöveg');
if(!GM_getValue('log10')) GM_setValue('log10','log10 szöveg');


var time = ''; 
var text = ''; 
var csapda1 = ''; 
var csapda2 = ''; 
var csapda3 = ''; 
var lako = ''; 
var tp = ''; 
var cucc = ''; 
var megerzes = ''; 
var gyemantszeg = ''; 



var x = document.getElementsByTagName('option');
for(var i = 0; i < x.length; i++){if (x[i].value == 'rablas')Main();}


function Main()
{
	var currentTime = new Date();
	var month = currentTime.getMonth()+1; if(month < 10){month = month.toString(); month = '0' + month;}
	var day = currentTime.getDate(); if(day < 10){day = day.toString(); day = '0' + day;}
	var hours = currentTime.getHours(); if(hours < 10){hours = hours.toString(); hours = '0' + hours;}
	var minutes = currentTime.getMinutes(); if(minutes < 10){minutes = minutes.toString(); minutes = '0' + minutes;}
	var seconds = currentTime.getSeconds(); if(seconds < 10){seconds = seconds.toString(); seconds = '0' + seconds;}
	time = month + '.' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	var x = document.getElementsByTagName('font');
	for(var i = 0; i < x.length; i++){if(x[i].size == '2.5') text = x[i].innerHTML;}
	for(var i = 1 ; i < 4; i++){if (text.match(/\([0-9]+\)/)) CsapdaSzovegAllito(i);else break;}
	if(text.match(/cuccokat tömöd/)) Cucc();
	if(text.match(/földön megcsillan/)) GySzeg();
	if(text.match(/lakik itt/)) Victim();
	if(text.match(/tapasztalati pontot kaptál/)) Tp();
	if(text.match(/Megérzésed jutalma/)) Megerzes();
	if(csapda1 || csapda2 || csapda3 || lako || tp || cucc || megerzes || gyemantszeg)Log(time,csapda1,csapda2,csapda3,lako,tp,cucc,megerzes,gyemantszeg);
	Kiiro();
}


function CsapdaSzovegAllito(hovamentsem)
{
	var csapda = '';
	var nyito = 0;
	var csuko = 0;
	var tmp = '';

	for(var i = 0; i < text.length; i++)
	{
		if(text[i] == '(')nyito = i + 1;
		if(text[i] == ')')csuko = i - 1;
		if(nyito && csuko) break;
	}
	
	tmp = text.substring(0,csuko + 1);
	if(tmp.match(/zombi/)) csapda = 'zombi' ;
	if(tmp.match(/manadémon/)) csapda = 'manadémon' ;
	if(tmp.match(/zuhanórács/)) csapda = 'zuhanórács' ;
	if(tmp.match(/pengegép/)) csapda = 'pengegép' ;
	if(tmp.match(/tövisek/)) csapda = 'tüskeköpő' ;
	if(tmp.match(/hurokzár/)) csapda = 'hurokzár' ;
	
	
	csapda += '(';
	for(var i = nyito; i < (csuko + 1); i++){csapda += text[i];}
	csapda += ')';
	
	
	switch(hovamentsem)
	{
		case 1: csapda1 = csapda; break;
		case 2: csapda2 = csapda; break;
		case 3: csapda3 = csapda; break;
	}
	
	text = text.substring(csuko + 2);

	return;
}


function Cucc()
{
	cucc = 'Cucc: ';
	var start = text.indexOf('cuccokat tömöd gyorsan hátizsákodba:') + 38;
	
	for(var i = 0; i < 3000; i++)
	{
		if(text[start+i] == '.') {break;}
		cucc += text[start+i];
	}	
}


function GySzeg()
{
	var gy = (text.indexOf('megcsillan')+11); 
	if (IsThisCharacterNumber(text[gy])) gyemantszeg = text[gy] + 'GySzeg'; 
	else
	{
		gy = (text.indexOf('megcsillan valami')+19);
		if (IsThisCharacterNumber(text[gy])) gyemantszeg = text[gy] + 'GySzeg'; 
	}
}


function Victim()
{
	var start = (text.indexOf('kiderül, hogy')+14);
	var end = (text.indexOf('lakik itt')-1);
	var melyikszero = 0;
	var fejleckep = document.getElementsByTagName('img');
	
	for(var i = 0; i < fejleckep.length; i++)
	{
		if(fejleckep[i].src == 'http://larkinor.index.hu/img/fejlec_60.jpg') {lako = '<a href="http://217.20.130.29/cgi-bin/jatek.com?oldalTipus=otKarakterlap&melyik='; melyikszero = 1;}
		if(fejleckep[i].src == 'http://larkinor.index.hu/2/img/fejlec_60.jpg') {lako = '<a href="http://217.20.130.29/cgi-bin/larkinor.run?oldalTipus=otKarakterlap&melyik='; melyikszero = 2;}
	}
	
	if(melyikszero) 
	{
		lako += text.substring(start,end);
		lako += '" target="_blank" style="color: #FFFFFF;">'
		lako += text.substring(start,end);
		lako += '</a>';
	}
	else lako = text.substring(start,end);
	
}


function Tp()
{
	var end = text.indexOf('tapasztalati pontot kaptál!') - 9;
	var start = end + 1;
	
	for(var i = 0; i < 21; i++)
	{
		if( (IsThisCharacterNumber(text[end-i])) ) start--;
	}
	
	tp = text.substring(start-2,end-1);
	tp += '.TP';
	
}

function Megerzes()
{
	megerzes = 'Megérzés: ';
	var start = text.indexOf('Megérzésed jutalma') + 39;
	
	for(var i = 0; i < 100; i++) 
	{
		if(text[start+i] == '<') {break;}
		megerzes += text[start+i];
	}	
}

function Log(time,csapda1,csapda2,csapda3,lako,tp,cucc,megerzes,gyemantszeg) 
{
	var szumma = time;
	if(csapda1){szumma +=' '; szumma += csapda1;}
	if(csapda2){szumma +=' '; szumma += csapda2;}
	if(csapda3){szumma +=' '; szumma += csapda3;}
	if(lako){szumma +=' '; szumma += lako;}
	if(tp){szumma +=' '; szumma += tp;}
	if(cucc){szumma +=' '; szumma += cucc;}
	if(megerzes){szumma +=' '; szumma += megerzes;}
	if(gyemantszeg){szumma +=' '; szumma += gyemantszeg;}
	
	
	var tmp = '';
	tmp = GM_getValue('log9'); GM_setValue('log10', tmp);
	tmp = GM_getValue('log8'); GM_setValue('log9', tmp);
	tmp = GM_getValue('log7'); GM_setValue('log8', tmp);
	tmp = GM_getValue('log6'); GM_setValue('log7', tmp);
	tmp = GM_getValue('log5'); GM_setValue('log6', tmp);
	tmp = GM_getValue('log4'); GM_setValue('log5', tmp);
	tmp = GM_getValue('log3'); GM_setValue('log4', tmp);
	tmp = GM_getValue('log2'); GM_setValue('log3', tmp);
	tmp = GM_getValue('log1'); GM_setValue('log2', tmp);
	GM_setValue('log1', szumma);
		
}


function Kiiro() 
{
	var log1 = GM_getValue('log1');
	var log2 = GM_getValue('log2');
	var log3 = GM_getValue('log3');
	var log4 = GM_getValue('log4');
	var log5 = GM_getValue('log5');
	var log6 = GM_getValue('log6');
	var log7 = GM_getValue('log7');
	var log8 = GM_getValue('log8');
	var log9 = GM_getValue('log9');
	var log10 = GM_getValue('log10');
	
	var x = document.createElement('div');
    x.innerHTML = '<div style="position: absolute; left: 810px !important; top: 10px !important; width: 400px !important; height: 500px !important;  background-color: #333333 !important; overflow-x: auto !important; color:#FFFFFF !important; font-family:Comic Sans MS !important; padding: 5px !important;"><font size="2"><b>'+log1+'<br>'+log2+'<br>'+log3+'<br>'+log4+'<br>'+log5+'<br>'+log6+'<br>'+log7+'<br>'+log8+'<br>'+log9+'<br>'+log10+'</b></font></div>';
    var body = document.getElementsByTagName('body')[0];
	body.appendChild(x);
}

function IsThisCharacterNumber(c)
{
	for (var i = 0 ; i < 10; i++)
	{
		if (c == i.toString()) return true;
	}
	return false;
}