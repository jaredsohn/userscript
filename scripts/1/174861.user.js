// ==UserScript==
// @name Bilimsel Yaklaşım
// @description Insancil sorulara bilimsel yaklasim ile cevap verme zamazingosu
// @version 0.0.1
// @copyright Cemal Eker
// @licence GPL 
// @include http://allahvarmi.net/*
// @include http://*.allahvarmi.net/*
// ==/UserScript==


function fixReligionsPrejudice() {
	
	function textNodesUnder(root){
	  var n, a=[], walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null,false);
	  while(n=walk.nextNode()) a.push(n);
	  return a;
	}
	
	var nodes = textNodesUnder(document.body);
	
	for (var i in nodes) {
		var el = nodes[i];
		
			if (el.textContent.match(/var\./i)) {
				el.parentNode.innerHTML = 'Henüz varlığına dair bir bilimsek kanıt bulunamadı';
				el.parentNode.style.fontSize = '30px';
			}
			
			if (el.textContent.match(/en güzeli şüphesiz ve kalpten/i)) {
				console.log(el)
				el.parentNode.innerHTML = 'Malesef inanan bir insana nazikçe şunu sormanın yolu yoktur: Bütün hayatının kocaman bir yanılgıdan ibaret olma ihtimalinin olabileceğini hiç düşündün mü?';
			}
	}
	
}

fixReligionsPrejudice()
