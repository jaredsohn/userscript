// ==UserScript==
// @name           Ogame menu flota para XENOM
// @author         sylkat - Modificado por MxBajista - Modificado por SPAWN
// @date           2009-04-09
// @version        0.11
// @namespace     
// @description    Script original modificado para compatibilizar  con el Skin XENOM.
// @include        http://uni*.ogame.com.*/game/index.php?page=flotten1&* 
// ==/UserScript==

(function()
{
	var inputs = document.evaluate("//input[@type='text' or not(@type)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0; i<inputs.snapshotLength; i++) {
			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value=999999;texto.onchange();");
			a.innerHTML = "&infin;";
			inputs.snapshotItem(i).parentNode.appendChild(a);

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value++;texto.onchange();");
			a.innerHTML='+';
			inputs.snapshotItem(i).parentNode.appendChild(a);

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];if (texto.value>0){ texto.value--;texto.onchange();}");
			a.innerHTML = "&minus;";
			inputs.snapshotItem(i).parentNode.appendChild(a);

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value=0;texto.onchange();");
			a.innerHTML = "&bull;";
			inputs.snapshotItem(i).parentNode.appendChild(a);
		}
	
	var element = document.evaluate('/html/body/div/center/table/tbody/tr/td[2]/table/tbody/tr[3]', document, null, 	XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('td');
	var metal = parseInt(element[0].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var cristal = parseInt(element[1].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var deuterio = parseInt(element[2].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var recursos = metal + cristal + deuterio;
	unsafeWindow.calculate = calculate;
	var infoRow = document.getElementsByTagName('tr');
	var as = infoRow[infoRow.length-3].getElementsByTagName('a');
	for (var i=0; i<as.length; i++)
		as[i].setAttribute('onclick', 'setTimeout(calculate, 20)');
	infoRow = infoRow[infoRow.length-1].firstChild;
	calculate();
	for(i=202; i<215; i++){  // quiza se podria reducir los bucles de busqueda cogiendo directamente esa columna
		x=document.getElementsByName("ship"+i);
		if(x.length){
			x[0].addEventListener('keyup',calculate,true);
			x[0].parentNode.previousSibling.previousSibling.firstChild.setAttribute('onclick', 'setTimeout(calculate, 20)');
			x[0].setAttribute('onchange', "this.value=parseInt(Math.min(parseInt('0'+this.value, 10), parseInt(getElementsByName('max'+this.name)[0].value, 10)),10);setTimeout(calculate, 10)");
	}
}	


function puntuar(numero) {
	var strNum=String(numero);
	var strNum2='';
	var i=0;
	for(i=strNum.length-4;i>=0;i-=3) {
		strNum2=(strNum[i]=='-'?'':'.')+strNum.substring(i+1, i+4)+strNum2;
	}
	strNum2=strNum.substr(0, i+4)+strNum2;
	return strNum2;
}


function calculate(){
	var capacity=0;
	var speed=0;
	var consumption=0;
		
	for(i=202; i<215; i++){
		x=document.getElementsByName("ship"+i);
		y=document.getElementsByName("capacity"+i);
		u=document.getElementsByName("speed"+i);
		v=document.getElementsByName("consumption"+i);
		if(x.length && y.length && x[0].value!=''){
			shipCount=parseInt(x[0].value, 10);
			shipCapacity=parseInt(y[0].value, 10);
			shipSpeed=parseInt(u[0].value, 10);
			shipConsumption=parseInt(v[0].value, 10);
			capacity+=shipCount*shipCapacity;
			if((speed > shipSpeed || speed == 0) && shipCount>0 ) speed=shipSpeed;
				consumption +=shipCount*shipConsumption;
		}
	}	
	if(recursos>capacity){
		surstr = puntuar(recursos-capacity);
		var cp = 0;
		var cg = 0;
		var rc = 0;
		var edlm = 0;
		try {cp = document.getElementsByName('maxship202')[0].value}
			catch (e) {}
		try {cg = document.getElementsByName('maxship203')[0].value}
			catch (e) {}
		try {rc = document.getElementsByName('maxship209')[0].value}
			catch (e) {}
                try {edlm = document.getElementsByName('maxship214')[0].value}
			catch (e) {}
		surstr += '&nbsp;&nbsp;<br /><font color="#009933" title="Cargueros pequenyos"> Necesitas: ' +
						puntuar(Math.ceil((recursos-capacity)/5000)) +
						(capacity==0?' Cargueras P. y tienes (' + cp + ')':'') + ' </font>' +
						'&nbsp;&nbsp;<br /><font color="#009933" title="Cargueros grandes"> Necesitas: ' +
						puntuar(Math.ceil((recursos-capacity)/25000)) +
						(capacity==0?' Cargueras G. y tienes (' + cg + ')':'') + '</font>'+
                                                '&nbsp;&nbsp;<br /><font color="#a17a47" title="Recicladores"> Necesitas: ' +
						puntuar(Math.ceil((recursos-capacity)/20000)) +
						(capacity==0?' Recicladores y tienes (' + rc + ')':'') + '</font>'+
						'&nbsp;&nbsp;<br /><font color="#6600FF" title="Estrella de la muerte"> Necesitas: ' +
                                                puntuar(Math.ceil((recursos-capacity)/1000000)) +
						(capacity==0?' EDLMs y tienes (' + edlm + ')':'') + '</font>';
	}else {
		surstr='0';
	}
	var s=document.getElementsByTagName('th');
	var k=s.length-1;
	s[k].innerHTML='<font color="#FF3300">Total de recursos restantes: ' + surstr + '</font>' +
						(capacity>0?'&nbsp;&nbsp;<br /><font color="#0099FF">Capacidad: '	+ puntuar(capacity) + ' unidades / </font>' +
						' <font color="#99CCFF">Velocidad MAX: ' + puntuar(speed) + ' clips</font>' +
						'&nbsp;&nbsp;<br /><font color="#33CC99">Consumo de deuterio aproximado: ' + puntuar(consumption) + ' galones</font>':'');
}
})();

