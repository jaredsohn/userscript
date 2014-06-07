// ==UserScript==
// @name           MouseHunt
// @namespace      mousehunt
// @description    mousehunt
// @include 	   http://apps.facebook.com/mousehunt/*
// ==/UserScript==

//////////////////TEMPORIZADOR///////////////////////////////
var secs=getCookie('secs')
if(secs=="" || secs == null)
secs=900;
var timerID = null
var timerRunning = false
var delay = 1000
/////////////////////////////////////////////////////////////
////////////////////////CRIA A DIV //////////////////////////
var divPaginaBaixo = document.getElementById('app10337532241_contentcontainer');
var divPaginaCima = document.getElementById('app10337532241_container');

var novaDiv = document.createElement('div');
	novaDiv.setAttribute('id','divContador');
	novaDiv.setAttribute('style','margin: 10px;border: 1px dashed #000000; text-align:center;');
/////////////////////////////////////////////////////////////
////////////////////////CRIA OS ELEMENTOS NA DIV/////////////
var novoButao = document.createElement('input');
	novoButao.setAttribute('id','ButaoContador');
	novoButao.setAttribute('type','button');
	novoButao.setAttribute('style','border: 1px solid #000000;');
	novoButao.setAttribute('value','Start timer...');
	novoButao.addEventListener("click", InitializeTimer, true);
	
var novaText = document.createElement('input');
	novaText.setAttribute('id','TextContador');
	novaText.setAttribute('type','text');
	novaText.setAttribute('style','border: none; width:17px;');
	novaText.setAttribute('value',secs/60);

var novaText2 = document.createElement('input');
	novaText2.setAttribute('id','TextContador');
	novaText2.setAttribute('type','text');
	novaText2.setAttribute('style','border: none; width:25px;');
	novaText2.setAttribute('value',secs);
	
var novaLabel = document.createElement('label');
	novaLabel.innerHTML='Hunter\'s Horn will be sounded in:';

var novaLabel2 = document.createElement('label');
	novaLabel2.innerHTML='m  [';

var novaLabel3 = document.createElement('label');
	novaLabel3.innerHTML=' s]';
	
var novaLabelText = document.createElement('label');
var novaLabelText2 = document.createElement('label');
	
var novaDivButao = document.createElement('div');
	novaDivButao.setAttribute('id','divContador');
	novaDivButao.setAttribute('style','margin: 10px;border: none; text-align:center;');
/////////////////////////////////////////////////////////////
//////////////////INSERE TODOS OS ELEMENTOS NA PAGINA////////
divPaginaCima.insertBefore(novaDiv,divPaginaBaixo);
novaDivButao.appendChild(novoButao);
novaLabelText.appendChild(novaText)
novaLabelText2.appendChild(novaText2)

novaDiv.appendChild(novaLabel);
novaDiv.appendChild(novaLabelText);
novaDiv.appendChild(novaLabel2);
novaDiv.appendChild(novaLabelText2);
novaDiv.appendChild(novaLabel3);
//novaDiv.innerHTML+='s'
novaDiv.appendChild(novaDivButao);

var cokval=getCookie('neverStop')
if(cokval=='true'){
	novoButao.click();
	novoButao.value='Stop timer...';
}else{
	
}
/////////////////////////////////////////////////////////////
//////////////////TEMPORIZADOR///////////////////////////////
function InitializeTimer()
{
    StopTheClock()
    if(novoButao.value=='Start timer...'){
	setCookie('neverStop','true','9999-99-99')
	novoButao.value='Stop timer...';
	StartTheTimer()
	}else{
	setCookie('neverStop','false','9999-99-99')
	setCookie('secs','900','9999-99-99')
	novoButao.value='Start timer...';
	}
}

function ResetTimer()
{
	setCookie('secs','900','9999-99-99')
}

function StopTheClock()
{
    if(timerRunning)
        clearTimeout(timerID)
    timerRunning = false
}
function StartTheTimer()
{
	//var TextBox = document.getElementById('TextContador')
    if (secs==0)
    {
        StopTheClock()
        // Here's where you put something useful that's
        // supposed to happen after the allotted time.
        // For example, you could display a message:
		window.location='http://apps.facebook.com/mousehunt/soundthehorn.php';
        //alert("You have just wasted 10 seconds of your life.")
		setCookie('secs','900','9999-99-99')
    }
    else
    {
		
		self.status = secs
        secs = getCookie('secs') - 1
        setCookie('secs',secs,'9999-99-99')
		timerRunning = true
        timerID = self.setTimeout(StartTheTimer, delay)
		novaText.value=(secs/60).toFixed(0);
		novaText2.value=secs;
    }
}
/////////////////////////////////////////////////////////////
////////GET AND SET COOKIE///////////////////////////////////
function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}
////////////////////////////////////////////////////////////

