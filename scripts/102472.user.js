// ==UserScript==
// @name           t3-Faltaparatop
// @namespace      t3-Faltaparatop
// @description    t3-Faltaparatop
// @include        http://*.travian.*/statistiken.php?id=7
// ==/UserScript==


var tabled = document.getElementById('top10_raiders').getElementsByTagName('tbody')[0]
var me = tabled.rows[11].cells[1].getElementsByTagName('a')[0].innerHTML


var lostop10=''

for (i=0;i<10;i++){
var playerz = tabled.rows[i].cells[1].getElementsByTagName('a')[0].innerHTML
if(playerz!=me){


var robo_10 = tabled.rows[9].cells[2].innerHTML
var tobo_yo = tabled.rows[11].cells[2].innerHTML
var difeR = ((robo_10*1)-(tobo_yo*1))+''
}
}

var nums = (difeR+'').length
var ez = difeR

for (h=1;h<=Math.round(nums/3);h++){
	k = (h)*3
	if(nums>k){
	var re = nums-k
	difeR = difeR.replace(ez[re-1],ez[re-1]+'.')
}}






var te = '<font color="red">'
var ta = '</font>'
tabled.insertRow(12).insertCell(0)
tabled.rows[12].insertCell(1).innerHTML=te+'Falta:'+ta
tabled.rows[12].insertCell(2).innerHTML=te+difeR+ta