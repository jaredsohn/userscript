// ==UserScript==
// @name           EmbedMultible
// @namespace      Magistream
// @description    Little additons to embed multiple on Magistream
// @include        http://magistream.com/embedmore*
// ==/UserScript==


//Little helper: creats a label
function makeLabel(text){
	var newLabel = document.createElement("label");
	newLabel.appendChild(document.createTextNode(text));
	newLabel.style.color = "black";
	return newLabel;
}

//breedable
var onlyKids = document.createElement("input");
onlyKids.type = "checkbox";

var borderDiv = document.body.getElementsByClassName('inner')[2];

function filter(){

	var boolOnlyKids = onlyKids.checked;
	
	var rows = borderDiv.getElementsByTagName("td");
	for(var i=0; i<rows.length; i++){
		rows[i].style.display = "";
		if(boolOnlyKids){
			var breite = rows[i].getElementsByTagName("img")[0].width;
			if(breite>70){
				rows[i].style.display = "none";
			}
		}
	}
}


//Call to filter
onlyKids.addEventListener('change', function(){filter();}, true);


var marker = borderDiv.firstChild;
borderDiv.insertBefore(onlyKids, marker);
borderDiv.insertBefore(makeLabel("Eggs and Hatchies"), marker);
