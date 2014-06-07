// ==UserScript==
// @name           Ogame menu flota
// @author         sylkat
// @date           2007-02-19
// @version        0.1
// @namespace     
// @description    Anyade nuevas funciones al menu flota, sacado de ogame++ funciona con el nuevo Ogame
// @include        http://ogame*.de/game/flotten1.php?*
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
	
	var element = document.evaluate('/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[3]', document, null, 	XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('td');
	var metal = parseInt(element[1].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var cristal = parseInt(element[2].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var deuterio = parseInt(element[3].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
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
		try {cp = document.getElementsByName('maxship202')[0].value}
			catch (e) {}
		try {cg = document.getElementsByName('maxship203')[0].value}
			catch (e) {}
		surstr += '&nbsp;&nbsp;<font color="orangered" title="Cargueros pequenyos"> CP: ' +
						puntuar(Math.ceil((recursos-capacity)/5000)) +
						(capacity==0?' (' + cp + ')':'') + '</font>' +
						'&nbsp;&nbsp;<font color="orange" title="Cargueros grandes"> CG: ' +
						puntuar(Math.ceil((recursos-capacity)/25000)) +
						(capacity==0?' (' + cg + ')':'') + '</font>';
	}else {
		surstr='0';
	}
	var s=document.getElementsByTagName('th');
	var k=s.length-11;
	s[k].innerHTML='<font color="#9999FF">Recursos restantes: ' + surstr + '</font>' +
						(capacity>0?'&nbsp;&nbsp;<font color="#00FF66">Capacidad: '	+ puntuar(capacity) + '</font>' +
						'<br /><font color="lightblue">Velocidad max: ' + puntuar(speed) + '</font>' +
						'&nbsp;&nbsp;<font color="#77bb22">Consumo: ' + puntuar(consumption) + '</font>':'');		
}
})();

