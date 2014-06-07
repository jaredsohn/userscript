// ==UserScript==
// @name bolaofc_ideaicm
// @description Merge dos dados do BolaoVIP com o BolaoFC
// @include http://www.bolaofc.com.br/cgi-local/rank_geral.cgi*
// ==/UserScript==


function $x() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;
    
  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }
  
  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }
  
  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }
  
  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}

var bolaovips = {}
bolaovips['rogerio_pa'] = 1
bolaovips['tuler'] = 6
bolaovips['joaocoelho'] = 5
bolaovips['viniciusdiniz'] = 5
bolaovips['marcusc'] = 9
bolaovips['roger10000'] = 9
bolaovips['FelipeSoares'] = 10
bolaovips['gustavo'] = 1
bolaovips['nchan'] = 0
bolaovips['Juliok'] = 5
bolaovips['xicojunior'] = 30
bolaovips['manoelraa'] = 9
bolaovips['lmendonca'] = 1
bolaovips['Nasu'] = 2
bolaovips['leandroalves'] = 1
bolaovips['viniciussdn'] = 1
bolaovips['JacobZuma'] = 2
bolaovips['joaocm'] = 1
bolaovips['alexander.ramos'] = 2
bolaovips['thiago.menezes'] = 0
bolaovips['guilharj'] = 1
bolaovips['valmont'] = 0


var header = $x("//table[@class='tabela_formulario']/tbody/tr[@class='linha_tabela']")
header[0].insertCell(20).innerHTML = 'Bolao VIP'
header[0].insertCell(21).innerHTML = 'Total'

var rows = $x("//table[@class='tabela_formulario']/tbody/tr")

rows.forEach(function(row) {
	// row.child[0].innerHTML = 'Hey firts'
	// row.innerHTML = row.child[5].innerHTML
	// row.cells[5]
	var person = row.cells[5].childNodes[0].innerHTML
	var bolaovip = bolaovips[person]
	if (bolaovip != null) {
		row.insertCell(20).innerHTML = bolaovip

		var p = row.cells[7].innerHTML
		var total = parseInt(p) + bolaovip
		row.insertCell(21).innerHTML = total
	}
	
});
