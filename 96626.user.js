// ==UserScript==
// @name           Jeopardy score keeper
// @namespace      http://www.j-archive.com/
// @description    Score keeper for jeopardy
// @include        http://www.j-archive.com/showgame.php?*
// ==/UserScript==

var divTag = document.createElement("div");
divTag.id = "outerScore";
divTag.setAttribute("align","center");
var dollarTag = document.createElement("span");
dollarTag.id = "dollar";
dollarTag.innerHTML = '$';
var scoreTag = document.createElement("span");
scoreTag.id = "score";
scoreTag.innerHTML = '0';
divTag.appendChild(dollarTag);
divTag.appendChild(scoreTag);
			
document.body.insertBefore(divTag, document.body.firstChild);
divTag.style.position = 'fixed';
divTag.style.top = '100px';
divTag.style.right = '10px';
divTag.style.float = 'left';
divTag.style.width = '300px';
divTag.style.overflow = 'hidden';
divTag.style.fontSize = '30px';

for (var double = 0; double < 2; double++) {
	for (var row = 1; row < 6; row++) {
	  for (var col = 1; col < 7; col++) {
		var clueId = '';
		if (double == 0) {
			clueId += 'clue_J_' + col + '_' + row;
	    } else {
			clueId += 'clue_DJ_' + col + '_' + row;
		}
		var clueTd = document.getElementById(clueId);
		if (clueTd != null) {
		  var tr = document.createElement("tr");
		  var td = document.createElement("td");
		  
		  var r = document.createElement("a");
		  r.id = clueId + '_r';
		  r.setAttribute('href', 'javascript:void(0)');
		  r.innerHTML = 'Right';
		  r.addEventListener("click", score_func(r, clueId), false); 
		  
		  var w = document.createElement("a");
		  w.id = clueId + '_w';
		  w.setAttribute('href', 'javascript:void(0)');
	      w.innerHTML = 'Wrong';
		  w.style.marginLeft = '10px';
		  w.addEventListener("click", score_func(w, clueId), false); 
		  
		  var p = document.createElement("a");
		  p.id = clueId + '_p';
		  p.setAttribute('href', 'javascript:void(0)');
		  p.innerHTML = 'Pass';
		  p.style.marginLeft = '10px';
		  p.addEventListener("click", score_func(p, clueId), false); 
		  
		  td.appendChild(r);
		  td.appendChild(document.createTextNode('   '));
		  td.appendChild(w);
		  td.appendChild(document.createTextNode('   '));
		  td.appendChild(p);
		  
		  tr.appendChild(td);
		  clueTd.parentNode.parentNode.appendChild(tr);
		}
	  }
	}
}

function score_func(element, id) {
	return function() { score(element, id) };
}

function score(element, clueId) {
   var children = element.parentNode.children;
   for (var i = 0; i < children.length; i++) {     
	 children[i].style.visibility = 'hidden';   
   }
   
   var clueParts = element.id.split('_');
   // clue_J_6_1_r
   var dollarValue = clueParts[3] * 200;
   if (clueParts[1] == 'DJ') {
     dollarValue *= 2;
   }
   if (clueParts[4] == 'w') {
     dollarValue *= -1;
   }
   if (clueParts[4] == 'p') {
     dollarValue = 0;
   }
   //alert(dollarValue);
   
   var scoreDiv = document.getElementById('score');
   var newScore = Number(scoreDiv.innerHTML) + dollarValue;
   scoreDiv.innerHTML = newScore;
   
}

//alert("Done");