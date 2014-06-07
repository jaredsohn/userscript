// ==UserScript==
// @name           removeROUserList
// @namespace      fkk
// @description    remove users from user list
// @include        http://oldtimes.ragnabr.net/online_list/whoisonline.php*
// ==/UserScript==

var removals = [
    ['anthell01', 'anthell02', 'gef_fild14', 'gl_chyard', 'gl_cas02', 'xmas_dun02', 'pay_fild10', 'moc_pryd04', 'pay_dun04', 'treasure02', 'gef_dun02', 'prt_sewb4', 'xmas_fild01', 'in_sphinx5', 'mjolnir_05', 'orcsdun02'],
    94
];

function checkCity(a){
    for(var i = 0, j = removals[0].length; i < j; i++){
        if (a.innerHTML == removals[0][i]){
           return false;
        }
    }
    return true;
}

function checkLvl(a){
  if(parseInt(a.innerHTML.substr(0,2)) < removals[1]) {
    return true;
  }
}

var table = document.getElementsByTagName('table')[1],
    tbody = table.getElementsByTagName('tbody')[0],
    rows = tbody.getElementsByTagName('tr'),
    toRemove = [];
    
for(var i = 0, j = rows.length; i < j; i++){
    var tr = rows[i];
    var cells = tr.getElementsByTagName('td'),
    cityCell = cells[cells.length -1];
    lvlCell = cells[cells.length -2];
  
    if((cityCell && checkCity(cityCell)) || (lvlCell && checkLvl(lvlCell))){
        toRemove.push(tr);
    }
}

for(var i = 0, j = toRemove.length; i < j; i++) {
    tbody.removeChild(toRemove[i]);
} 
