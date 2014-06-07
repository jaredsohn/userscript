// ==UserScript==
// @name          Campanha Utils by Andre Luiz
// @autor	Andre Luiz
// @include    http://pni.datasus.gov.br/*
// @run-at document-end
// @grant GM_xmlhttpRequest
// @grantGM_log
// atualizado em 12/06/2013
// ==/UserScript==

if (document.getElementById('co_cnes') != null && document.getElementsByName('Btn_Cadastrar')[0].value != 'Alterar') {
    var objSel = document.getElementById('co_cnes');
	var swidget = document.createElement('div')
	swidget.className = 'titulo1_consulta';	
	var sinfo = document.createElement('div');
	sinfo.className =  'titulo1_consulta';
	sinfo.style.marginTop = '60px';
	sinfo.innerHTML = 'Insira parte do nome, pressione o botão "procurar" ou F4 para executar a busca.<br />Obs.: insira um termo que não seja comum a outro estabelecimento.<br /><br /><a style="font-size:8pt; font-family:Arial, Helvetica, sans-serif">Hack by AndrexterZ! <img src="http://wiki.greasespot.net/favicon.ico" /><br /><span style="font-size:7pt; font-family:Arial, Helvetica, sans-serif; color: gray50;">I Believe in the POWER of Dreams!</a></span>'

	var slabel = document.createElement('text');
	slabel.innerHTML = 'Procurar Estabelecimento: ';
	var sfield = document.createElement('input');
	sfield.size = 40;
	var sbutton = document.createElement('input');
	sbutton.type = 'button';
	sbutton.value = 'procurar';
	sbutton.style.marginLeft = '40px';
	var formObj = document.getElementsByName('frm_incluir_dados_vac')[0];
	formObj.appendChild(swidget);
	formObj.appendChild(sinfo);
	swidget.appendChild(slabel);
	swidget.appendChild(sfield)
	swidget.appendChild(sbutton);

	function sMytext() {
		for (i=0;i<objSel.length;i++) {
			if (objSel[i].text.indexOf(sfield.value.toUpperCase()) >= 0) {
				objSel.selectedIndex = i;
				break;
			}
		}
	}
	sbutton.addEventListener('click',sMytext,true);
	sfield.addEventListener("keypress",function (evt) {if (evt.keyCode == 115) {sMytext()}},true);
}

if (document.getElementsByName('Btn_Cadastrar')[0].value == 'Alterar') {
    var campanha = document.forms[0].action;
    var cnes = document.getElementById('co_cnes').value;
	var lwidget = document.createElement('div')
	lwidget.className = 'titulo1_consulta';	
	var linfo = document.createElement('div');
	linfo.className =  'titulo1_consulta';
	linfo.style.marginTop = '18px';
	linfo.innerHTML = 'When we believe, we can!<br /><br /><span style="font-size:8pt; font-family:Arial, Helvetica, sans-serif">Hack by AndrexterZ! <img src="http://wiki.greasespot.net/favicon.ico" /><br /><span style="font-size:7pt; font-family:Arial, Helvetica, sans-serif; color: gray50;">I Believe in the POWER of Dreams!</span></span><br /><strong>vers&atilde;o: 2.1</strong>'

	var loadbutton = document.createElement('input');
	loadbutton.type = 'button';
	loadbutton.value = 'carregar dados';
	loadbutton.name = 'joker_cat';
	var formObj = document.getElementsByName('frm_incluir_dados_vac')[0];
	formObj.appendChild(lwidget);
	formObj.appendChild(linfo);
	lwidget.appendChild(loadbutton);
	sub_button = document.getElementsByName('Btn_Cadastrar')[0];
	sub_button.style.visibility = 'hidden';
	fn_load_data = function () {
		GM_xmlhttpRequest({
			method: 'GET',
			url:'http://10.10.200.196/scripts/python/cheshire.py/cat?cnes=' + cnes + '&campanha=' + campanha,
			onload: function(response) {
				//my code goes here! (andrexterz)
				data_obj = eval('(' + response.responseText + ')');
				for (i=0; i < data_obj.length; i++) {
					GM_log(data_obj[i].name + ': ' + data_obj[i].value);
					eval('document.getElementsByName(\'' + data_obj[i].name + '\')\[0\]\.value = ' + data_obj[i].value);
				}
				sub_button.click();
				linfo.innerHTML = '<div><span>The mysterious Cheshire Cat did a joke!</span></div>';
			},
		})
	}
	loadbutton.addEventListener('click',fn_load_data,true);
}
