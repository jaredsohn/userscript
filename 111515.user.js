// ==UserScript==
// @name           Foresee Skills FS
// @namespace      http://www.footstar.org/ver_jogador.asp?jog_id=*
// @description    Modifica l'interfaccia della pagina del player su footstar permettendo di calcolare il tempo necessario per raggiungere un certo valore in una o più skills. 
// @include        http://www.footstar.org/ver_jogador.asp?jog_id=*
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent =  fn ;
    document.body.appendChild(script); // run the script
   // document.body.removeChild(script); // clean up
}

function parteGrafica()
	{
	
	function generaCampoScelta(nmin)
		{
		campoScelta='<select class="FSfs" style="font-size: 14px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;" onchange="execPrevDay(this);">';
		campoScelta+='<option value='+100+' style="color: blue">'+100+'</option>';
		if(nmin==100)
			campoScelta+='<option value='+99.75+' style="color: black" selected="selected">'+100+'</option>';
		else
			campoScelta+='<option value='+99.75+' style="color: black">'+100+'</option>';
			
		if(nmin<100)
			{
			for(var i=99; i>nmin; i--)
				campoScelta+='<option value='+i+' style="color: black">'+i+'</option>';
			campoScelta+='<option value='+nmin+' style="color: black" selected="selected">'+nmin+'</option>';
			}
		campoScelta+='</select>';
		return campoScelta;
		}
	
	for(i=1; i<12; i++)
		{
		if(document.getElementById('skills').children[0].children[0].children[0].children[0].children[0].children[0].children[i].children[3].children[0].children[0].className!='skill_blue')
			{
			skillAttuale=parseInt(document.getElementById('skills').children[0].children[0].children[0].children[0].children[0].children[0].children[i].children[3].textContent);
			document.getElementById('skills').children[0].children[0].children[0].children[0].children[0].children[0].children[i].children[1].innerHTML=generaCampoScelta(skillAttuale);
			}
		}
		
		
	for(i=1; i<=2; i++)
		{
		if(document.getElementById('skills').children[0].children[0].children[0].children[2].children[0].children[0].children[i].children[3].children[0].children[0].className!='skill_blue')
			{
			skillAttuale=parseInt(document.getElementById('skills').children[0].children[0].children[0].children[2].children[0].children[0].children[i].children[3].textContent);
			document.getElementById('skills').children[0].children[0].children[0].children[2].children[0].children[0].children[i].children[1].innerHTML=generaCampoScelta(skillAttuale);
			}
		}
	
	}


exec(
function mostra()
	{
		document.getElementById('FSfsCSS').textContent='';
		document.getElementById('btnTNscript').setAttribute('value', 'Nascondi');
		document.getElementById('btnTNscript').setAttribute('onclick', 'nascondi();');
	}

);

exec(
function nascondi()
	{
		document.getElementById('FSfsCSS').textContent='.FSfs{display:none;}';
		document.getElementById('btnTNscript').setAttribute('value', 'Mostra');
		document.getElementById('btnTNscript').setAttribute('onclick', 'mostra();');
	}

);


//FUNGE dataNascita
exec(
function leggiDataNascita()
	{
	strData=document.getElementsByClassName('tool').item(0).textContent;
	day=parseInt(strData.substring(1, strData.indexOf('/')));
	month=parseInt(strData.substring(strData.indexOf('/')+1, strData.length-1));
	return data=(month-1)*112+day;
	}
);
	
	
//FUNGE dataAttuale
exec(
function leggiDataAttuale()
	{
	strData=document.getElementById('nav_top_bar').children[0].children[0].children[0].textContent;
	day=parseInt(strData.substring(strData.indexOf('(')+1, strData.lastIndexOf('/')));
	month=parseInt(strData.substring(strData.lastIndexOf('/')+1, strData.lastIndexOf(')')));
	return data=(month-1)*112+day;
	}
);

	
//FUNGE skillAttuale
exec(
function calcolaSkillAttuali()
	{
	totaleSkill=0;
	for(i=0; i<11; i++)
		if(document.getElementsByClassName('skill_text').item(i).firstChild.className=='skill_blue')
			totaleSkill+=100;
		else	if(parseInt(document.getElementsByClassName('skill_text').item(i).textContent)==100)
					totaleSkill+=99.75;
				else if(parseInt(document.getElementsByClassName('skill_text').item(i).textContent)!=0)
						totaleSkill+=parseInt(document.getElementsByClassName('skill_text').item(i).textContent);

	for(i=20; i<=21; i++)
		if(document.getElementsByClassName('skill_text').item(i).firstChild.className=='skill_blue')
			totaleSkill+=100;
		else	if(parseInt(document.getElementsByClassName('skill_text').item(i).textContent)==100)
					totaleSkill+=99.75;
				else if(parseInt(document.getElementsByClassName('skill_text').item(i).textContent)!=0)
					totaleSkill+=parseInt(document.getElementsByClassName('skill_text').item(i).textContent);
	return totaleSkill;
	}
);


//FUNGE skillPreviste
exec(
function calcolaSkillPreviste()
	{
	totaleSkill=0;

	for(i=1; i<12; i++)
		{
		if(document.getElementById('skills').children[0].children[0].children[0].children[0].children[0].children[0].children[i].children[1].children[0] != null)
			totaleSkill+=parseInt(document.getElementById('skills').children[0].children[0].children[0].children[0].children[0].children[0].children[i].children[1].children[0].value);
		else
			totaleSkill+=100;
		}

	for(i=1; i<=2; i++)
		{
		if(document.getElementById('skills').children[0].children[0].children[0].children[2].children[0].children[0].children[i].children[1].children[0] != null)
			totaleSkill+=parseInt(document.getElementById('skills').children[0].children[0].children[0].children[2].children[0].children[0].children[i].children[1].children[0].value);
		else
			totaleSkill+=100;
		}
	return totaleSkill;
	}
);
	

//FUNGE
exec(
function calcolaGiorniPrevisti(skill_week, dataAttuale, dataNascita, skillAttuali, skillPreviste)
	{
	tempoNecessario=0;
	eta=17+Math.floor((dataAttuale-dataNascita)/112);
	birthdayOffset=(dataAttuale-dataNascita)-112*(eta-17);	//giorni passati dal compimento degli anni
	if(eta>=21)
		{

		skill_week=skill_week/100*(100-(25/100*(100-birthdayOffset/(112/100))));
		}
	
	valore=skillPreviste-skillAttuali;
	skill_day=skill_week/7;
	ggFineAnno=112;
	skillFineAnno=ggFineAnno*skill_day;
	if(valore <= skillFineAnno)
		tempoNecessario=valore/skill_day;
	else
		{
		do
			{		
			valore-=skillFineAnno;
			eta++;
			if(eta>=28)
				{
				return -1;
				}
			if(eta>=21)
				skill_day=skill_day*0.75;
			
			tempoNecessario+=112;
			
			skillFineAnno=112*skill_day;
			
			}while(valore >= skillFineAnno);

		tempoNecessario+=valore/skill_day;
		}	

	return tempoNecessario;
	}
);


	newElement=document.createElement('span');
	newElement.setAttribute('id', 'tempoNecessario');
	newElement.setAttribute('class', 'FSfs');
	document.getElementById('skills').appendChild(newElement);

	newElement=document.createElement('input');
	newElement.setAttribute('type', 'button')
	newElement.setAttribute('value', 'mostra');
	newElement.setAttribute('id', 'btnTNscript');
	newElement.setAttribute('style', 'display: block; margin-top: 5px;');
	newElement.setAttribute('onclick', 'mostra();');
	document.getElementById('skills').appendChild(newElement);

	newElement=document.createElement('style');
	newElement.setAttribute('type', 'text/css');
	newElement.setAttribute('id', 'FSfsCSS');
	newElement.textContent='.FSfs{display:none;}';
	document.getElementsByTagName('head')[0].appendChild(newElement);


	parteGrafica();

exec(
function execPrevDay(obj)
	{
	if(obj.selectedIndex==0)
		obj.style.color='blue';
	else
		obj.style.color='black';
		
	dataNascita=leggiDataNascita();
	dataAttuale=leggiDataAttuale();
	skillAttuali=calcolaSkillAttuali();	
	//skill_week		
	skill_week=skillAttuali/(dataAttuale-dataNascita)*7;
		
	skillPreviste=calcolaSkillPreviste();	

	giorniPrevisti=calcolaGiorniPrevisti(skill_week, dataAttuale, dataNascita, skillAttuali, skillPreviste);
	
	if(giorniPrevisti == -1)
		document.getElementById('tempoNecessario').textContent='L\'obiettivo non sarà raggiunto entro i 28 anni';
	else if(giorniPrevisti == 0)
			document.getElementById('tempoNecessario').textContent='';
	else
		{
		dataPrevista=dataAttuale+Math.round(giorniPrevisti);
		if(dataPrevista%112==0)
			mesePrevisto=dataPrevista/112;
		else
			mesePrevisto=Math.floor(dataPrevista/112)+1;
		giornoPrevisto=dataPrevista-112*(mesePrevisto-1);
		document.getElementById('tempoNecessario').textContent='L\'obiettivo verrà raggiunto in '+Math.round(giorniPrevisti)+' giorni('+giornoPrevisto+'/'+mesePrevisto+')';
		}
	}
);