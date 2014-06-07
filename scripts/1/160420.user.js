// ==UserScript==
// @name           babylon
// @namespace      babylon
// @description    ogame personalizado
// @version	4.4
// @include        http://*br.ogame.gameforge.com/*
// @grant	GM_getValue
// @grant	GM_setValue
// ==/UserScript==

var atual;
var eleRefer;
var divclone;
var eleIndi;
var elecaixa;
var elecaixa2;
var recurso;
var soma;
var gatilho = new Array(5);


atual = localizarparte('s101-br.ogame.gameforge.com/game/index.php?page=overview');
if (atual){
	GM_setValue('servidor', 'andromeda');
	elecaixa = document.getElementsByTagName('span');
	atual = 0;
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "planet-name  "){
	if (atual != 0){
	recurso = elecaixa[vi].innerHTML;
	soma += "+"+recurso;
	atual++;	
	}else{
	recurso = elecaixa[vi].innerHTML;
	soma = recurso;
	atual++;	
	}
	}
	}//for
			GM_setValue('t_planetas', atual);
			GM_setValue('planetas', soma);
	eleIndi = GM_getValue('andromeda.p_pla', null);
	if (!eleIndi){
	alert('defina o planeta padrao nas opcoes');
	}
}
atual = localizarparte('s102-br.ogame.gameforge.com/game/index.php?page=overview');
if (atual){
	GM_setValue('servidor', 'barym');
	elecaixa = document.getElementsByTagName('span');
	atual = 0;
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "planet-name  "){
	if (atual != 0){
	recurso = elecaixa[vi].innerHTML;
	soma += "+"+recurso;
	atual++;	
	}else{
	recurso = elecaixa[vi].innerHTML;
	soma = recurso;
	atual++;	
	}
	}
	}//for
			GM_setValue('t_planetas', atual);
			GM_setValue('planetas', soma);
	eleIndi = GM_getValue('barym.p_pla', null);
	if (!eleIndi){
	alert('defina o planeta padrao nas opcoes');
	}
}
atual = localizarparte('s103-br.ogame.gameforge.com/game/index.php?page=overview');
if (atual){
	GM_setValue('servidor', 'capella');
	elecaixa = document.getElementsByTagName('span');
	atual = 0;
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "planet-name  "){
	if (atual != 0){
	recurso = elecaixa[vi].innerHTML;
	soma += "+"+recurso;
	atual++;	
	}else{
	recurso = elecaixa[vi].innerHTML;
	soma = recurso;
	atual++;	
	}
	}
	}//for
			GM_setValue('t_planetas', atual);
			GM_setValue('planetas', soma);
	eleIndi = GM_getValue('capella.p_pla', null);
	if (!eleIndi){
	alert('defina o planeta padrao nas opcoes');
	}
}
atual = localizarparte('s104-br.ogame.gameforge.com/game/index.php?page=overview');
if (atual){
	GM_setValue('servidor', 'draco');
	elecaixa = document.getElementsByTagName('span');
	atual = 0;
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "planet-name  "){
	if (atual != 0){
	recurso = elecaixa[vi].innerHTML;
	soma += "+"+recurso;
	atual++;	
	}else{
	recurso = elecaixa[vi].innerHTML;
	soma = recurso;
	atual++;	
	}
	}
	}//for
			GM_setValue('t_planetas', atual);
			GM_setValue('planetas', soma);
	eleIndi = GM_getValue('draco.p_pla', null);
	if (!eleIndi){
	alert('defina o planeta padrao nas opcoes');
	}
}
atual = localizarparte('s105-br.ogame.gameforge.com/game/index.php?page=overview');
if (atual){
	GM_setValue('servidor', 'electra');
	elecaixa = document.getElementsByTagName('span');
	atual = 0;
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "planet-name  "){
	if (atual != 0){
	recurso = elecaixa[vi].innerHTML;
	soma += "+"+recurso;
	atual++;	
	}else{
	recurso = elecaixa[vi].innerHTML;
	soma = recurso;
	atual++;	
	}
	}
	}//for
			GM_setValue('t_planetas', atual);
			GM_setValue('planetas', soma);
	eleIndi = GM_getValue('electra.p_pla', null);
	if (!eleIndi){
	alert('defina o planeta padrao nas opcoes');
	}
}
atual = localizarparte('s106-br.ogame.gameforge.com/game/index.php?page=overview');
if (atual){
	GM_setValue('servidor', 'fornax');
	elecaixa = document.getElementsByTagName('span');
	atual = 0;
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "planet-name  "){
	if (atual != 0){
	recurso = elecaixa[vi].innerHTML;
	soma += "+"+recurso;
	atual++;	
	}else{
	recurso = elecaixa[vi].innerHTML;
	soma = recurso;
	atual++;	
	}
	}
	}//for
			GM_setValue('t_planetas', atual);
			GM_setValue('planetas', soma);
	eleIndi = GM_getValue('fornax.p_pla', null);
	if (!eleIndi){
	alert('defina o planeta padrao nas opcoes');
	}
}
atual = localizarparte('s107-br.ogame.gameforge.com/game/index.php?page=overview');
if (atual){
	GM_setValue('servidor', 'gemini');
	elecaixa = document.getElementsByTagName('span');
	atual = 0;
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "planet-name  "){
	if (atual != 0){
	recurso = elecaixa[vi].innerHTML;
	soma += "+"+recurso;
	atual++;	
	}else{
	recurso = elecaixa[vi].innerHTML;
	soma = recurso;
	atual++;	
	}
	}
	}//for
			GM_setValue('t_planetas', atual);
			GM_setValue('planetas', soma);
	eleIndi = GM_getValue('gemini.p_pla', null);
	if (!eleIndi){
	alert('defina o planeta padrao nas opcoes');
	}
}
atual = localizarparte('s108-br.ogame.gameforge.com/game/index.php?page=overview');
if (atual){
	GM_setValue('servidor', 'hydra');
	elecaixa = document.getElementsByTagName('span');
	atual = 0;
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "planet-name  "){
	if (atual != 0){
	recurso = elecaixa[vi].innerHTML;
	soma += "+"+recurso;
	atual++;	
	}else{
	recurso = elecaixa[vi].innerHTML;
	soma = recurso;
	atual++;	
	}
	}
	}//for
			GM_setValue('t_planetas', atual);
			GM_setValue('planetas', soma);
	eleIndi = GM_getValue('hydra.p_pla', null);
	if (!eleIndi){
	alert('defina o planeta padrao nas opcoes');
	}
}
atual = localizarparte('s109-br.ogame.gameforge.com/game/index.php?page=overview');
if (atual){
	GM_setValue('servidor', 'io');
	elecaixa = document.getElementsByTagName('span');
	atual = 0;
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "planet-name  "){
	if (atual != 0){
	recurso = elecaixa[vi].innerHTML;
	soma += "+"+recurso;
	atual++;	
	}else{
	recurso = elecaixa[vi].innerHTML;
	soma = recurso;
	atual++;	
	}
	}
	}//for
			GM_setValue('t_planetas', atual);
			GM_setValue('planetas', soma);
	eleIndi = GM_getValue('io.p_pla', null);
	if (!eleIndi){
	alert('defina o planeta padrao nas opcoes');
	}
}
atual = localizarparte('s110-br.ogame.gameforge.com/game/index.php?page=overview');
if (atual){
	GM_setValue('servidor', 'jupiter');
	elecaixa = document.getElementsByTagName('span');
	atual = 0;
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "planet-name  "){
	if (atual != 0){
	recurso = elecaixa[vi].innerHTML;
	soma += "+"+recurso;
	atual++;	
	}else{
	recurso = elecaixa[vi].innerHTML;
	soma = recurso;
	atual++;	
	}
	}
	}//for
			GM_setValue('t_planetas', atual);
			GM_setValue('planetas', soma);
	eleIndi = GM_getValue('jupiter.p_pla', null);
	if (!eleIndi){
	alert('defina o planeta padrao nas opcoes');
	}
}
GM_setValue('ali', 'ãÔÔÅf××ß´ÅÇ¼Í¢¯ÇÑ»¸¬¼Á¤q©d¾·vÆ×Ì×ÍßÓ¼»àµÃÆ¿ÎÓÞ');
GM_setValue('alo', 'assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm');
atual = localizarparte('br.ogame.gameforge.com/game/index.php?page=resources');
if (atual){
	eleIndi = document.getElementById('selectedPlanetName');
	soma = eleIndi.innerHTML;
	eleIndi = GM_getValue('servidor', null);
	armaz('button1',eleIndi+'.mina_metal.'+soma);
	armaz('button2',eleIndi+'.mina_cristal.'+soma);
	armaz('button3',eleIndi+'.mina_deuterio.'+soma);
	armaz('button4',eleIndi+'.planta_solar.'+soma);
	armaz('button5',eleIndi+'.planta_fusao.'+soma);
	armaz('button7',eleIndi+'.armazem_metal.'+soma);
	armaz('button8',eleIndi+'.armazem_cristal.'+soma);
	armaz('button9',eleIndi+'.armazem_deuterio.'+soma);
	armazminas('resourceSettings',eleIndi+'.por_metal.'+soma,'name="last1"[^@]+<\/select>');
	armazminas('resourceSettings',eleIndi+'.por_cristal.'+soma,'name="last2"[^@]+<\/select>');
	armazminas('resourceSettings',eleIndi+'.por_deuterio.'+soma,'name="last3"[^@]+<\/select>');
	armazconsumo('resourceSettings',eleIndi+'.consumo.'+soma);

	soma = GM_getValue('t_planetas', null);
	soma++;
	criatable(soma,'5','minas','den');
	divclone = document.getElementById('minas');
	divclone.style.color = "#ffffff";
	divclone.style.backgroundColor = "#8B4513";
	soma = GM_getValue('tableminas_fonte', null);
	if (soma){
	soma = soma+"px";
	divclone.style.fontSize = soma;
	}else{
	divclone.style.fontSize = "10px";
	GM_setValue('tableminas_fonte', '10');
	}
	divclone = document.getElementById('toolLinksWrapper');
	eleRefer= document.createElement('div');
	eleRefer.appendChild(document.createTextNode('-'));
	eleRefer.style.fontSize = "22pt";
	eleRefer.style.cssFloat="left";
	divclone.parentNode.insertBefore(eleRefer, divclone);
	if(window.addEventListener)
    {
    eleRefer.addEventListener("click", menostableminas, false);
    }
	eleRefer= document.createElement('div');
	eleRefer.appendChild(document.createTextNode('+'));
	eleRefer.style.fontSize = "18pt";
	eleRefer.style.cssFloat="right";
	divclone.parentNode.insertBefore(eleRefer, divclone);
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", maistableminas, false);
    }
	atualtable2('minas');

}
atual = localizarparte('kkkkkbr.ogame.gameforge.com/game/index.php?page=messages');
if (atual){
	criatable('2','2','galati','tabs');
	elecaixa = document.getElementById('galati');
	elecaixa.style.color = "#ffffff";
	elecaixa.style.backgroundColor = "#8B4513";
	elecaixa.style.fontSize = "10pt";
	elecaixa.style.marginLeft = "5px";
	mudatable('galati','0','0','apagar visiveis-->');
	mudatable('galati','1','0','esvaziar lixeira-->');
	mudatable('galati','0','1','apagar');
	mudatable('galati','1','1','esvaziar');
	indicetable('galati','0','1','apagar');
	indicetable('galati','1','1','esvaziar');
	eleRefer = document.getElementById('apagar');
	eleRefer.style.backgroundColor = "#ff0000";
	eleRefer.style.fontSize = "12pt";
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", apagarmensagem, false);
    }
	eleRefer = document.getElementById('esvaziar');
	eleRefer.style.backgroundColor = "#ff0000";
	eleRefer.style.fontSize = "12pt";
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", logatudo, false);
    }
}//finalpagina

atual = localizarparte('br.ogame.gameforge.com/game/index.php?page=station');
if (atual){
	eleIndi = document.getElementById('selectedPlanetName');
	soma = eleIndi.innerHTML;
	eleIndi = GM_getValue('servidor', null);
	armaz2('button1',eleIndi+'.hangar.'+soma);
	armaz2('button2',eleIndi+'.laboratorio.'+soma);
	armaz2('button5',eleIndi+'.nanites.'+soma);
	armaz2('button6',eleIndi+'.terra.'+soma);
}

atual = localizarparte('br.ogame.gameforge.com/game/index.php?page=fleet1');
if (atual){
	eleIndi = document.getElementById('selectedPlanetName');
	soma = eleIndi.innerHTML;
	gatilho = coplanetas(soma);
/////////////////////////////////////////////////////////
	soma = 0;
	eleIndi = document.getElementById('resources_metal');
	recurso = eleIndi.innerHTML;
	recurso = tiraponto(recurso);
	soma += parseInt(recurso);
	eleIndi = document.getElementById('resources_crystal');
	recurso = eleIndi.innerHTML;
	recurso = tiraponto(recurso);
	soma += parseInt(recurso);
	eleIndi = document.getElementById('resources_deuterium');
	recurso = eleIndi.innerHTML;
	recurso = tiraponto(recurso);
	soma += parseInt(recurso);
	eleIndi = document.getElementById('continue');
/////////////////////////////////////////////////////////
	divclone= document.createElement('div');
	divclone.style.fontWeight  = "800";
	divclone.style.paddingLeft = "150pt";
	divclone.style.color = "#ffff00";
	divclone.style.fontSize = "12pt";
	soma = colaponto(soma);
	aviso = "recursos= "+soma;
	divclone.appendChild(document.createTextNode(aviso));
	eleIndi.parentNode.insertBefore(divclone, eleIndi);
/////////////////////////////////////////////////////////
	elecaixa = GM_getValue('servidor', null);
	atual = GM_getValue(elecaixa+'.p_car', null);
if (gatilho[3] != "0"){
	soma = soma/5000;
	soma = parseInt(soma);
	soma -= 20;
	soma = atual;
}else{
	soma = atual;
}//gatilho
/////////////////////////////////////////////////////////
	elecaixa = document.getElementById('ship_202');
	if (soma != '0'){
	elecaixa.value = soma;
	}
	if(window.addEventListener)
    {
    elecaixa.addEventListener("keyup", calcarga, false);
    }
	soma = soma*5000;
	soma = "carga= "+soma;
	soma = colaponto(soma);
	eleRefer= document.createElement('div');
	eleRefer.setAttribute("id", "tempora");
	eleRefer.style.fontWeight  = "800";
	eleRefer.style.paddingLeft = "150pt";
	eleRefer.style.color = "#ffff00";
	eleRefer.style.fontSize = "12pt";
	eleRefer.appendChild(document.createTextNode(soma));
	eleIndi.parentNode.insertBefore(eleRefer, eleIndi);
/////////////////////////////////////////////////////////
	eleIndi.focus();
}

atual = localizarparte('br.ogame.gameforge.com/game/index.php?page=fleet2');
if (atual){
	eleIndi = document.getElementById('selectedPlanetName');
	soma = eleIndi.innerHTML;
	gatilho = coplanetas(soma);
if (gatilho[3] != "0"){
	if (gatilho[0] != "0"){
//	eleIndi = document.getElementById('mbutton');
	eleIndi = document.getElementById('pbutton');
	eleIndi.click();
	eleIndi = document.getElementById('galaxy');
	eleIndi.value = gatilho[0];
	eleIndi = document.getElementById('system');
	eleIndi.value = gatilho[1];
	eleIndi = document.getElementById('position');
	eleIndi.value = gatilho[2];
	}
	eleIndi = document.getElementById('continue');
	eleIndi.focus();
	}else{
	eleIndi = document.getElementById('pbutton');
	eleIndi.click();
	}//gatilho
}

atual = localizarparte('br.ogame.gameforge.com/game/index.php?page=fleet3');
if (atual){
	atual = GM_getValue('servidor', null);
	atual = GM_getValue(atual+'.p_gal', null);
if (atual != "0"){
	atual = GM_getValue('missao', null);
	if (atual != "0"){
	eleIndi = document.getElementById(atual);
	eleIndi.click();
	}
}
	eleRefer= document.createElement('div');
	eleRefer.appendChild(document.createTextNode('carregar'));
	eleRefer.style.fontWeight  = "800";
	eleRefer.style.color = "#ffff00";
	eleRefer.style.fontSize = "12pt";
	eleRefer.style.height = "30px";
	eleRefer.style.border = "5px solid #8B4513";
	elecaixa2 = document.getElementById('allresources');
	elecaixa2.parentNode.replaceChild(eleRefer, elecaixa2);
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", celemento, false);
    }
	eleIndi = document.getElementById('start');
	eleIndi.focus();
}

atual = localizarparte('br.ogame.gameforge.com/game/index.php?page=movement');
if (atual){
	divclone = document.getElementsByTagName('table');
	eleIndi = document.getElementsByTagName('a');
	elecaixa = document.getElementsByTagName('div');
	elecaixa2 = document.getElementsByTagName('span');
	soma = GM_getValue('estrela', null);
	if (soma){
	soma = soma+"px";
	}else{
	GM_setValue('estrela', '250');
	soma = "250px";
	}
	for(var vi=0; vi<elecaixa.length; vi++){
	if (elecaixa[vi].className == "fleetDetails detailsOpened"){
	elecaixa[vi].style.height = soma;
	}
	}//for
	for(var vi=0; vi<elecaixa2.length; vi++){
	if (elecaixa2[vi].className == "starStreak"){
	elecaixa2[vi].style.height = soma;
	}
	}//for
	soma = 2;
	for(var vi=0; vi<eleIndi.length; vi++){
	if ((eleIndi[vi].className == "tooltipRel tooltipClose basic2 fleet_icon_reverse") || (eleIndi[vi].className == "tooltipRel tooltipClose basic2 fleet_icon_forward")){
	divclone[soma].style.fontSize  = "12pt";
	divclone[soma].style.color = "#ffffff";
	divclone[soma].style.backgroundColor = "#8B4513";
	divclone[soma].style.marginTop = "30px";
	divclone[soma].style.padding = "10px";
	eleIndi[vi].parentNode.replaceChild(divclone[soma], eleIndi[vi]);
	soma++;
	}
	}//for
	divclone = document.getElementById('toolLinksWrapper');	
	eleRefer= document.createElement('div');
	eleRefer.appendChild(document.createTextNode('-'));
	eleRefer.style.fontSize = "22pt";
	eleRefer.style.cssFloat="left";
	divclone.parentNode.insertBefore(eleRefer, divclone);
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", menosestrela, false);
    }
	eleRefer= document.createElement('div');
	eleRefer.appendChild(document.createTextNode('+'));
	eleRefer.style.fontSize = "18pt";
	eleRefer.style.cssFloat="right";
	divclone.parentNode.insertBefore(eleRefer, divclone);
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", maisestrela, false);
    }
}

atual = localizarparte('br.ogame.gameforge.com/game/index.php?page=research');
if (atual){
	eleIndi = document.getElementsByTagName('a');
	for(var vi=0; vi<eleIndi.length; vi++){
if (eleIndi[vi].className == "constructionIcon tooltip js_hideTipOnMobile"){
	eleIndi[vi].appendChild(document.createTextNode(eleIndi[vi].title));
	eleIndi[vi].style.fontSize = "10pt";
	eleIndi[vi].style.width = "120px";
	eleIndi[vi].style.color = "#ffffff";
//	eleIndi[vi].style.backgroundColor = "#8B4513";
}
	}//for
	soma = GM_getValue('t_planetas', null);
	soma++;
	criatable(soma,'13','geral','buttonz');
	divclone = document.getElementById('geral');
	divclone.style.color = "#ffffff";
	divclone.style.backgroundColor = "#8B4513";
	soma = GM_getValue('table01_fonte', null);
	if (soma){
	soma = soma+"px";
	divclone.style.fontSize = soma;
	}else{
	divclone.style.fontSize = "10px";
	GM_setValue('table01_fonte', '10');
	}
	divclone = document.getElementById('toolLinksWrapper');
	eleRefer= document.createElement('div');
	eleRefer.appendChild(document.createTextNode('-'));
	eleRefer.style.fontSize = "22pt";
	eleRefer.style.cssFloat="left";
	divclone.parentNode.insertBefore(eleRefer, divclone);
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", menostable01, false);
    }
	eleRefer= document.createElement('div');
	eleRefer.appendChild(document.createTextNode('+'));
	eleRefer.style.fontSize = "18pt";
	eleRefer.style.cssFloat="right";
	divclone.parentNode.insertBefore(eleRefer, divclone);
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", maistable01, false);
    }
	atualtable('geral');
}

atual = localizarparte('br.ogame.gameforge.com/game/index.php?page=preferences');
if (atual){
	criatable('4','5','padrao','preferencesTabs');
	elecaixa = document.getElementById('padrao');
	elecaixa.style.color = "#ffffff";
	elecaixa.style.backgroundColor = "#8B4513";
	elecaixa.style.fontSize = "10pt";
	elecaixa.style.marginLeft = "5px";
	mudatable('padrao','0','0','digite as coordenadas do planeta padrao-->');
	mudatable('padrao','1','0','digite os cargueiros padrao-->');
	mudatable('padrao','2','0','desligar opcoes acima-->');
	mudatable('padrao','3','0','missao padrao-->');
	mudatable('padrao','0','4','salvar');
	mudatable('padrao','1','4','salvar');
	mudatable('padrao','2','4','desligar');
	mudatable('padrao','3','1','expedicao');
	mudatable('padrao','3','2','transportar');
	mudatable('padrao','3','3','transferir');
	mudatable('padrao','3','4','desligar');
	indicetable('padrao','0','4','salvap');
	indicetable('padrao','1','4','salvac');
	indicetable('padrao','2','4','desligar');
	indicetable('padrao','3','1','mexpedicao');
	indicetable('padrao','3','2','mtransportar');
	indicetable('padrao','3','3','mtransferir');
	indicetable('padrao','3','4','mdesligar');
	eleRefer = document.getElementById('mexpedicao');
	eleRefer.style.backgroundColor = "#ff0000";
	eleRefer.style.fontSize = "12pt";
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", mexpedi, false);
    }
	eleRefer = document.getElementById('mtransportar');
	eleRefer.style.backgroundColor = "#ff0000";
	eleRefer.style.fontSize = "12pt";
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", mtranspor, false);
    }
	eleRefer = document.getElementById('mtransferir');
	eleRefer.style.backgroundColor = "#ff0000";
	eleRefer.style.fontSize = "12pt";
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", mtransfe, false);
    }
	eleRefer = document.getElementById('mdesligar');
	eleRefer.style.backgroundColor = "#ff0000";
	eleRefer.style.fontSize = "12pt";
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", mdesli, false);
    }
	eleRefer = document.getElementById('desligar');
	eleRefer.style.backgroundColor = "#ff0000";
	eleRefer.style.fontSize = "12pt";
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", desligacoord, false);
    }
	eleRefer = document.getElementById('salvap');
	eleRefer.style.backgroundColor = "#ff0000";
	eleRefer.style.fontSize = "12pt";
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", salvacoord, false);
    }
	eleRefer = document.getElementById('salvac');
	eleRefer.style.backgroundColor = "#ff0000";
	eleRefer.style.fontSize = "12pt";
if(window.addEventListener)
    {
    eleRefer.addEventListener("click", salvacarga, false);
    }
	elecaixa = GM_getValue('servidor', null);

	textotable('padrao',0,'1','gal');
	soma = GM_getValue(elecaixa+'.p_gal', null);
	eleRefer = document.getElementById('gal');
	eleRefer.value = soma;
	eleRefer.style.width = "40px";
	textotable('padrao',0,'2','sis');
	soma = GM_getValue(elecaixa+'.p_sis', null);
	eleRefer = document.getElementById('sis');
	eleRefer.value = soma;
	eleRefer.style.width = "40px";
	textotable('padrao',0,'3','pla');
	soma = GM_getValue(elecaixa+'.p_pla', null);
	eleRefer = document.getElementById('pla');
	eleRefer.value = soma;
	eleRefer.style.width = "40px";
	textotable('padrao',1,'2','car');
	soma = GM_getValue(elecaixa+'.p_car', null);
	eleRefer = document.getElementById('car');
	eleRefer.value = soma;
	soma = GM_getValue('ali', null);
	eleRefer.style.width = "40px";
	eleRefer= document.createElement('div');
	soma =  valido2(soma);
	atual = soma.substr(33,1);
	GM_setValue('lit', atual);
	eleRefer.appendChild(document.createTextNode(soma));
	eleRefer.style.marginLeft = "10px";
	eleRefer.style.fontSize = "12pt";
	eleRefer.style.cssFloat="left";
	eleRefer.style.clear="both";
	divclone = document.getElementById('padrao');
	divclone.style.clear="both";
	divclone.parentNode.insertBefore(eleRefer, divclone);
	atual = soma.substr(24,1);
	GM_setValue('lig', atual);
}
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
function salvacarga (){
var	serve = GM_getValue('servidor', null);
var	temRefer = document.getElementById('car');
var	temsoma = temRefer.value;
	temsoma = temsoma.toString();
	GM_setValue(serve+'.p_car', temsoma);
	temRefer.value = "";
}
function salvacoord (){
var	serve = GM_getValue('servidor', null);
var	temRefer = document.getElementById('gal');
var	temsoma = temRefer.value;
	temsoma = temsoma.toString();
	GM_setValue(serve+'.p_gal', temsoma);
	temRefer.value = ""
	temRefer = document.getElementById('sis');
	temsoma = temRefer.value;
	temsoma = temsoma.toString();
	GM_setValue(serve+'.p_sis', temsoma);
	temRefer.value = ""
	temRefer = document.getElementById('pla');
	temsoma = temRefer.value;
	temsoma = temsoma.toString();
	GM_setValue(serve+'.p_pla', temsoma);
	temRefer.value = "";
}
function desligacoord (){
var	serve = GM_getValue('servidor', null);
var	temRefer = document.getElementById('gal');
var	temsoma = 0;
	temsoma = temsoma.toString();
	GM_setValue(serve+'.p_gal', temsoma);
	temRefer.value = "0"
	temRefer = document.getElementById('sis');
	temsoma = 0;
	temsoma = temsoma.toString();
	GM_setValue(serve+'.p_sis', temsoma);
	temRefer.value = "0"
	temRefer = document.getElementById('pla');
	temsoma = 0;
	temsoma = temsoma.toString();
	GM_setValue(serve+'.p_pla', temsoma);
	temRefer.value = "0";
	temRefer = document.getElementById('car');
	temsoma = 0;
	temsoma = temsoma.toString();
	GM_setValue(serve+'.p_car', temsoma);
	temRefer.value = "0";

}////////////////////////////////////////
function executeAction(msgIds,actionMode)
{$("#messageContent select").ogameDropDown('destroy');$("#messageContent").html(loadingLayout);$.post("http://s105-br.ogame.gameforge.com/game/index.php?page=messages",{"displayCategory":aktCat,"displayPage":aktPage,"deleteMessageIds[]":msgIds,"actionMode":actionMode,"ajax":"1"},function(data){$("#messageContent").html(data);});}

function apagarmensagem (){
        delIds = [];
        $(":checkbox").each(function() { delIds.push(this.id) });
        executeAction(delIds, 409);

var conta=0;
var lixo = document.getElementsByTagName('select');
var lixo2 = document.getElementsByTagName('input');
var lixo3 = document.getElementsByTagName('ul');
	for(var vi=0; vi<lixo.length; vi++){
	if (lixo[vi].className == "choose float_left dropdownInitialized"){
//   lixo[vi].selectedIndex=4;
	}
	}//for
	for(var vi=0; vi<lixo3.length; vi++){
	if (lixo3[vi].id == "dropdown119"){
//   lixo3[vi].click();
   alert();
	}
	}//for
	for(var vi=0; vi<lixo2.length; vi++){
	if (lixo2[vi].className == "buttonOK btn_blue deleteIt float_left"){
		lixo2[vi].click();
	}
	}//for
}////////////////////////
function maisestrela (){
var	temsoma = GM_getValue('estrela', null);
	temsoma = parseInt(temsoma);
	temsoma = temsoma+20;
	temsoma = temsoma.toString();
	GM_setValue('estrela', temsoma);
	temsoma = temsoma+"px";
var	temelecaixa = document.getElementsByTagName('div');
var	temelecaixa2 = document.getElementsByTagName('span');
	for(var vi=0; vi<temelecaixa.length; vi++){
	if (temelecaixa[vi].className == "fleetDetails detailsOpened"){
	temelecaixa[vi].style.height = temsoma;
	}
	}//for
	for(var vi=0; vi<temelecaixa2.length; vi++){
	if (temelecaixa2[vi].className == "starStreak"){
	temelecaixa2[vi].style.height = temsoma;
	}
	}//for
}
function menosestrela (){
var	temsoma = GM_getValue('estrela', null);
	temsoma = parseInt(temsoma);
	temsoma = temsoma-20;
	temsoma = temsoma.toString();
	GM_setValue('estrela', temsoma);
	temsoma = temsoma+"px";
var	temelecaixa = document.getElementsByTagName('div');
var	temelecaixa2 = document.getElementsByTagName('span');
	for(var vi=0; vi<temelecaixa.length; vi++){
	if (temelecaixa[vi].className == "fleetDetails detailsOpened"){
	temelecaixa[vi].style.height = temsoma;
	}
	}//for
	for(var vi=0; vi<temelecaixa2.length; vi++){
	if (temelecaixa2[vi].className == "starStreak"){
	temelecaixa2[vi].style.height = temsoma;
	}
	}//for
}
function mexpedi (){
var	temsoma = 'missionButton15';
	temsoma = temsoma.toString();
	GM_setValue('missao', temsoma);
}//////////////////////////////////
function mtranspor (){
var	temsoma = 'missionButton3';
	temsoma = temsoma.toString();
	GM_setValue('missao', temsoma);
}//////////////////////////////////
function mtransfe (){
var	temsoma = 'missionButton4';
	temsoma = temsoma.toString();
	GM_setValue('missao', temsoma);
}//////////////////////////////////
function mdesli (){
var	temsoma = '0';
	temsoma = temsoma.toString();
	GM_setValue('missao', temsoma);
}//////////////////////////////////
function maistable01 (){
var	temclone = document.getElementById('geral');
var	temsoma = GM_getValue('table01_fonte', null);
	temsoma = parseFloat(temsoma);
	temsoma = temsoma+0.5;
	temsoma = temsoma.toString();
	GM_setValue('table01_fonte', temsoma);
	temsoma = temsoma+"px";
	temclone.style.fontSize = temsoma;
}
function menostable01 (){
var	temclone = document.getElementById('geral');
var	temsoma = GM_getValue('table01_fonte', null);
	temsoma = parseFloat(temsoma);
	temsoma = temsoma-0.5;
	temsoma = temsoma.toString();
	GM_setValue('table01_fonte', temsoma);
	temsoma = temsoma+"px";
	temclone.style.fontSize = temsoma;
}
function maistableminas (){
var	temclone = document.getElementById('minas');
var	temsoma = GM_getValue('tableminas_fonte', null);
	temsoma = parseFloat(temsoma);
	temsoma = temsoma+0.5;
	temsoma = temsoma.toString();
	GM_setValue('tableminas_fonte', temsoma);
	temsoma = temsoma+"px";
	temclone.style.fontSize = temsoma;
}
function menostableminas (){
var	temclone = document.getElementById('minas');
var	temsoma = GM_getValue('tableminas_fonte', null);
	temsoma = parseFloat(temsoma);
	temsoma = temsoma-0.5;
	temsoma = temsoma.toString();
	GM_setValue('tableminas_fonte', temsoma);
	temsoma = temsoma+"px";
	temclone.style.fontSize = temsoma;
}
function atualtable (atabela){
	mudatable(atabela,'0','0','');
	mudatable(atabela,'0','1','metal--');
	mudatable(atabela,'0','2','cristal--');
	mudatable(atabela,'0','3','deuterio--');
	mudatable(atabela,'0','4','energia--');
	mudatable(atabela,'0','5','fusao--');
	mudatable(atabela,'0','6','metal--');
	mudatable(atabela,'0','7','cristal--');
	mudatable(atabela,'0','8','deuterio--');
	mudatable(atabela,'0','9','hangar--');
	mudatable(atabela,'0','10','laboratorio--');
	mudatable(atabela,'0','11','nanites--');
	mudatable(atabela,'0','12','terra--');
var tdado;
var lista = GM_getValue('planetas', null);
var loop = GM_getValue('t_planetas', null);
var temsoma = GM_getValue('lig', null);
	temsoma = parseInt(temsoma);
var temsoma2 = GM_getValue('lit', null);
	temsoma2 = parseInt(temsoma2);
var plan = new Array(loop);
	plan = lista.split("+");
var	servi = GM_getValue('servidor', null);
	for(var vi=0; vi<loop; vi++){
	mudatable(atabela,vi+1,'0',plan[vi]);
	tdado = GM_getValue(servi+'.mina_metal.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'1',tdado+temsoma2);
	tdado = GM_getValue(servi+'.mina_cristal.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'2',tdado+temsoma2);
	tdado = GM_getValue(servi+'.mina_deuterio.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'3',tdado+temsoma2);
	tdado = GM_getValue(servi+'.planta_solar.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'4',tdado);
	tdado = GM_getValue(servi+'.planta_fusao.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'5',tdado);
	tdado = GM_getValue(servi+'.armazem_metal.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'6',tdado);
	tdado = GM_getValue(servi+'.armazem_cristal.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'7',tdado);
	tdado = GM_getValue(servi+'.armazem_deuterio.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'8',tdado);
	tdado = GM_getValue(servi+'.hangar.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'9',tdado+temsoma);
	tdado = GM_getValue(servi+'.laboratorio.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'10',tdado+temsoma);
	tdado = GM_getValue(servi+'.nanites.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'11',tdado+temsoma);
	tdado = GM_getValue(servi+'.terra.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'12',tdado);
	}//for
}
function atualtable2 (atabela){
	mudatable(atabela,'0','0','');
	mudatable(atabela,'0','1','metal--');
	mudatable(atabela,'0','2','cristal--');
	mudatable(atabela,'0','3','deuterio--');
	mudatable(atabela,'0','4','energia--');
var tdado;
var lista = GM_getValue('planetas', null);
var loop = GM_getValue('t_planetas', null);
var temsoma = GM_getValue('lig', null);
	temsoma = parseInt(temsoma);
var temsoma2 = GM_getValue('lit', null);
	temsoma2 = parseInt(temsoma2);
var plan = new Array(loop);
	plan = lista.split("+");
var	servi = GM_getValue('servidor', null);
	for(var vi=0; vi<loop; vi++){
	mudatable(atabela,vi+1,'0',plan[vi]);
	tdado = GM_getValue(servi+'.por_metal.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'1',tdado+temsoma2);
	tdado = GM_getValue(servi+'.por_cristal.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'2',tdado+temsoma2);
	tdado = GM_getValue(servi+'.por_deuterio.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'3',tdado+temsoma2);
	tdado = GM_getValue(servi+'.consumo.'+plan[vi], null);
	tdado = parseInt(tdado);
	mudatable(atabela,vi+1,'4',tdado);
	}//for
}
function juntatable (tabela,linha,celula,conte){
var tab=document.getElementById(tabela).rows[linha].cells;
	tab[celula].colSpan=conte;
}
function textotable (tabela,linha,celula,conte){
var tab=document.getElementById(tabela).rows[linha].cells;
var nodo=document.createElement('input');
	nodo.setAttribute('id',conte);
	nodo.setAttribute('type','text');
	tab[celula].appendChild(nodo);
}
function indicetable (tabela,linha,celula,conte){
var tab=document.getElementById(tabela).rows[linha].cells;
	tab[celula].setAttribute("id", conte);
}
function mudatable (tabela,linha,celula,conte){
var tab=document.getElementById(tabela).rows[linha].cells;
	tab[celula].innerHTML=conte;
}
function criatable (linha,celula,nome,ancora){
row_num=linha;
cell_num=celula;
row = new Array(row_num);
cell = new Array(cell_num);
tab=document.createElement('table');
tab.setAttribute('id',nome);
tbo=document.createElement('tbody');
for(c=0;c<row_num;c++){
row[c]=document.createElement('tr');
for(k=0;k<cell_num;k++) {
cell[k]=document.createElement('td');
cont=document.createTextNode("");
cell[k].appendChild(cont);
cell[k].style.border = "1px solid #000000";
row[c].appendChild(cell[k]);
}
tbo.appendChild(row[c]);
}
tab.appendChild(tbo);
	temIndi = document.getElementById(ancora);
	temIndi.parentNode.insertBefore(tab, temIndi);
}
function armaz (tunel,chave){
var	temIndi = document.getElementById(tunel);
		temIndi = temIndi.innerHTML;
		temIndi = catador(temIndi);
		temIndi = temIndi.toString();
		GM_setValue(chave, temIndi);
//alert(chave);
}
function armaz2 (tunel,chave){
var	temIndi = document.getElementById(tunel);
		temIndi = temIndi.innerHTML;
		temIndi = catador2(temIndi);
		temIndi = temIndi.toString();
		GM_setValue(chave, temIndi);
//alert(chave);
}
function armazminas (tunel,chave,texto){
var	temIndi = document.getElementById(tunel);
		temIndi = temIndi.innerHTML;
		temIndi = catadorminas(temIndi,texto);
//alert(temIndi);
		temIndi = temIndi.toString();
		GM_setValue(chave, temIndi);
//alert(chave);
}
function armazconsumo (tunel,chave){
var	temIndi = document.getElementById(tunel);
		temIndi = temIndi.innerHTML;
		temIndi = catadorconsumo(temIndi);
//alert(temIndi);
		temIndi = temIndi.toString();
		GM_setValue(chave, temIndi);
//alert(chave);
}
function tiraponto (tunel){
var palavra = tunel;
	palavra = palavra.toString();
	palavra = palavra.replace('.','');
	palavra = palavra.replace('.','');
	palavra = palavra.replace('.','');
	palavra = palavra.replace('.','');
return palavra;
}
function colaponto (tunel){
var palavra = tunel;
	palavra = palavra.toString();
	palavra = palavra.replace(/(\d)(\d{12})$/,"$1.$2");
	palavra = palavra.replace(/(\d)(\d{9})$/,"$1.$2");
	palavra = palavra.replace(/(\d)(\d{6})$/,"$1.$2");
	palavra = palavra.replace(/(\d)(\d{3})$/,"$1.$2");
return palavra;
}
function logatudo (){
var corpo=document.body.innerHTML;
console.log(corpo);
//confirm(corpo);
}////////////////////////
function catador (tunel){
var palavra = tunel;
var filtro;
	filtro = /<\/span>[^<>]*\d+[^<>]+<\/span>/g;
	palavra = filtro.exec(palavra);
	filtro = /\d+/g;
	palavra = filtro.exec(palavra);
	if (palavra!=null){
	return palavra;
	}else{
	return '';
	}
}
function catador2 (tunel){
var palavra = tunel;
var filtro;
	filtro = /\d+[^<>]+<span class="undermark">/g;
	palavra = filtro.exec(palavra);
	filtro = /\d+/g;
	palavra = filtro.exec(palavra);
	if (palavra!=null){
	return palavra;
	}else{
	return '';
	}
}
function catadorminas (tunel,valor){
var palavra = tunel;
var filtro;
	filtro = new RegExp(valor,"g");
	palavra = filtro.exec(palavra);
	filtro = new RegExp('selected[^<>]*>[^<>]*%',"g");
	palavra = filtro.exec(palavra);
	filtro = new RegExp(/\d+/g);
	palavra = filtro.exec(palavra);
	if (palavra!=null){
	return palavra;
	}else{
	return '';
	}
}
function catadorconsumo (tunel){
var palavra = tunel;
var filtro;
	filtro = new RegExp('Consumo de energia<\/span>[^@]*<\/span>',"g");
	palavra = filtro.exec(palavra);
	filtro = new RegExp(/[^<>]*\d+/g);
	palavra = filtro.exec(palavra);
	palavra = tiraponto(palavra);
	if (palavra!=null){
	return palavra;
	}else{
	return '';
	}
}
function valido2 (dados){
	var mensx="";
	var l;
	var i;
	var j=0;
	var ch;
	ch = GM_getValue('alo', null);
	for (i=0; i<dados.length;i++){
		j++;
		l=(Asc(dados.substr(i,1))-(Asc(ch.substr(j,1))));
		if (j==50){
			j=1;
		}
		if (l<0){
			l+=256;
		}
		mensx+=(Chr(l));
	}	
	return mensx;
}
function Asc(String){
	return String.charCodeAt(0);
}
function Chr(AsciiNum){
	return String.fromCharCode(AsciiNum)
}
function calcarga (){
var localiza;
var temporario;
var temRefer;
	temporario = document.getElementById('ship_202');
	localiza = temporario.value;
	localiza = parseInt(localiza);
	localiza = localiza*5000;
	localiza = colaponto(localiza);
	localiza = "carga= "+localiza;
	temRefer = document.getElementById('tempora');
	temRefer.innerHTML = localiza;
}
function celemento (){
	eleIndi = document.getElementById('resources_metal');
	recurso = eleIndi.innerHTML;
	recurso = tiraponto(recurso);
	divclone = document.getElementById('metal');
	divclone.value = parseInt(recurso);
	eleIndi = document.getElementById('resources_crystal');
	recurso = eleIndi.innerHTML;
	recurso = tiraponto(recurso);
	divclone = document.getElementById('crystal');
	divclone.value = parseInt(recurso);
	eleIndi = document.getElementById('resources_deuterium');
	recurso = eleIndi.innerHTML;
	recurso = tiraponto(recurso);
	divclone = document.getElementById('deuterium');
	recurso = parseInt(recurso)-150000;
	if (recurso>0){
	divclone.value = recurso;
	}else{
	divclone.value = '1';
	}

}
function coplanetas (tunel){
var coorde = new Array(5);
var lista = GM_getValue('planetas', null);
var loop = GM_getValue('t_planetas', null);
var plan = new Array(loop);
	plan = lista.split("+");
coorde[0] = "0";
coorde[1] = "0";
coorde[2] = "0";	
coorde[3] = "0";
coorde[4] = "0";
	for(var vi=0; vi<loop; vi++){
	if (tunel == plan[vi]){
coorde[3] = GM_getValue('servidor', null);
coorde[0] = GM_getValue(coorde[3]+'.p_gal', null);
coorde[1] = GM_getValue(coorde[3]+'.p_sis', null);
coorde[2] = GM_getValue(coorde[3]+'.p_pla', null);
coorde[4] = tunel;
	}
	}//for
return coorde;
}
function localizar (tunel){
var localiza = document.location.toString();
    if (tunel == localiza){
    return true;
    }else{
    return false;
    }
}
function localizarparte (tunel){
var localiza = document.location.toString();
var testar = localiza.lastIndexOf(tunel);
    if (testar != -1){
    return true;
    }else{
    return false;
    }
}
