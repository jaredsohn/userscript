// ==UserScript==
// @name		howrseHelper
// @author		Ferdie_der_Hamster
// @description	Erweitert die Verwaltung von Pferden um einige Gimmicks.
// @include		http://www.howrse.de/elevage/chevaux/cheval?id=*
// ==/UserScript==
// -----------------------------------------------------------------------------

(function(){

var main = function(){
	if(document.URL.match(/http:\/\/www.howrse.de\/elevage\/chevaux\/cheval\?id=/)){
		window.onkeypress = fastChange;
		doSomething();
	}	
};

var createXY = function(){
	btName = document.createElement('a');
	btName1 = document.createElement('a');
	btName2 = document.createElement('a');
	btName3 = document.createElement('a');	
	btName4 = document.createElement('a');	
	btName.onmousedown = getGP;
	btName1.onmousedown = getFK;
	btName2.onmousedown = getS;
	btName3.onmousedown = getAge;	
	btName4.onmousedown = getGPu;
	btName.textContent = '+ GP |';
	btName4.textContent = 'GP +1,2 |';
	btName1.textContent = '+ FK |';
	btName2.textContent = '+ Siege |';
	btName3.textContent = ' Alter';
	
};

var fastChange = function(ereignis){
	if(document.activeElement.tagName != 'INPUT')
		switch(ereignis.which){ 
			case 97: 
			location.href = $i('nav-previous').href; 
			break; 
			case 100: 
			location.href = $i('nav-next').href; 
			break; 
		}  
};

var setXY = function(){
	$i('training').onmouseover = getBest;
	$i('status-body-content').onmouseover = doSomethingElse;
	tmp = $xf('//div[@id="profil-popup-content"]//span[contains(.,"Der Name muss")]');
	tmp.innerHTML = '';
	tmp.appendChild(btName);
	tmp.appendChild(btName4);
	tmp.appendChild(btName1);
	tmp.appendChild(btName2);
	tmp.appendChild(btName3);
};

var doSomething = function(){
	createXY();
	getBlupp();
	getEnergie();
	getBest();
	setXY();
};

var doSomethingElse = function(){
	getBlupp();
	getEnergie();
	getBest();
};

var getEnergie = function(){
	tmp = $xf('//div[@_theme="1"]/div').style.left;
	$i('energie').textContent = tmp.match(/(\S+)\%/)[1].substring(0,6);
};

var getFK = function(){
	fk = $xf('//div[@id="skills-body-content"]//b/b').textContent;
	$i('horseNameName').value += ' '+fk;
};

var getAge = function(){
	age = $xf('//div[@id="characteristics-body-content"]//tr[1]/td[2]').textContent.substr(7);
	$i('horseNameName').value = age;
};

var getS = function(){
	//siege erste seite
	tmp = $xo('//div[@id="achievements-0-content"]/table//th');
	s=0;
	for(a=5;a<tmp.length;a+=4) s+= parseInt(tmp[a].textContent);
	//siege zweite seite
	tmp = $xo('//div[@id="achievements-1-content"]/table//th');
	for(b=5;b<tmp.length;b+=4) s+= parseInt(tmp[b].textContent);
	tmp = $i('horseNameName').value.match(/\(\d+\/20\)/);
	if(!tmp)		$i('horseNameName').value += ' ('+s+'/20)';
	else			$i('horseNameName').value = $i('horseNameName').value.replace(/\(\d+\/20\)/, '('+s+'/20)');//substr(0,tmp-3) + '('+s+'/20)';
};

var getBlupp = function(){
	if(!$i('blubbig')){
		blubb = $xf('//div[@id="genetic-body-content"]/table[2]//b').textContent;	
		tr_1 = document.createElement('tr');
		tr_1.setAttribute('id','blubbig');
			td_1 = document.createElement('td');
			td_1.style.fontWeight = 'bold';
			td_1.textContent = 'BLUP';
		tr_1.appendChild(td_1);
			td_2 = document.createElement('td');
				div_1 = document.createElement('div');
				div_1.setAttribute('_theme','1');
				div_1.className = 'gauge gauge-style-1';
			td_2.appendChild(div_1);
					div_2 = document.createElement('div');
					div_2.style.left= (blubb<0)? '0%' : blubb+'%';
				div_1.appendChild(div_2);
		tr_1.appendChild(td_2);
			td_3 = document.createElement('td');
			td_3.className = 'text-align-right';
			td_3.style.fontWeight = 'bold';
			td_3.textContent = blubb;
		tr_1.appendChild(td_3);		
		$xf('//div[@id="status-body-content"]/table').appendChild(tr_1);
	} else return;
};

var getGP = function(){
	gp = $xf('//div[@id="genetic-body-content"]//strong').textContent.substring(7);
	$i('horseNameName').value += ' '+gp;
};

var getGPu = function(){
	gp = parseFloat($xf('//div[@id="genetic-body-content"]//strong').textContent.match(/(\d+\.\d+)/)[1]) +1.2;
	arr = getStats();
	for(a=3;a<arr.length;a++) gp += ' '+ (parseInt(arr[a].match(/\d+\.(\d+)/)[1]) +2);
	
	$i('horseNameName').value = gp;
};

var getStats = function(){
	var wurst = ['enduranceGenetique','galopGenetique','vitesseGenetique',
				 'trotGenetique','dressageGenetique','sautGenetique'];
	var brote = ['Ausdauer','Galopp','Tempo','Trab','Dressur','Springen'];
	stats = new Array();	
	for(c=0;c<6;c++){
		tmp = ($i(wurst[c]).textContent.length<6) ? '0'.concat($i(wurst[c]).textContent)+ '-'+brote[c] : $i(wurst[c]).textContent + '-'+brote[c];
		stats.push(tmp);
	}
	stats.sort();
		if(stats.length == 6) return stats;//getBest(stats);
		else return false;
	return false;
};

var getBest = function(){
	arr = getStats();
	for(a=3;a<arr.length;a++){
		markStat(arr[a].substring(arr[a].lastIndexOf('-')+1,arr[a].length),'#ff0000');
	}
};

var markStat = function(string,color){
	cells = $xo('//div[@id="training-tab-0"]//td');
	if(cells.length > 3)
		for(b=0;b<18;b++)
			if(cells[b].textContent.match(string))
				cells[b].style.color = color;
};

// xpath ordered nodes
var $xo = function(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
};
// xpath single first node
var $xf = function(p, c) {
	return document.evaluate(p, c || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
};

// getById
var $i = function(id) {
	return document.getElementById(id);
};


main();
})();
////end