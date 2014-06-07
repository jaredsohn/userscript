// ==UserScript==
// @name            Dagelijkse kost
// @namespace       een.be
// @grant           none
// @description     ABC-shortlinks voor recepten pagina
// @include         *een.be/programmas/dagelijkse-kost/recepten*
// ==/UserScript==

/*
function generateString(){
  var r = '';
  var letter = '';
 	for(var i=65; i<=90; i++){
		letter = String.fromCharCode(i);
	  r += '<a href="#' + letter + '">' + letter + '</a>';
    if(i!=90){
			r += ' <br /> ';
    }
  }
	return r;
}
*/
function getAllStartLetters(){
  var r = document.getElementsByClassName('letter');
  var len = r.length;
  var letters = '';
  for (var i=0; i<len; i++){
    letter = r[i].firstChild.innerHTML;
    link = letter;
    if (letter=='�'){
      letter = 'Î';
      link = '�';
    }
    letters += '<a href="#' + link + '">' + letter + '</a>';
    if(letter != 'Z'){
      letters += '<br />';
    }
  }
  return letters;
}
function addElement(){
  // create a new div element
  // and give it some content
  var newDiv = document.createElement("div");
  newDiv.innerHTML = getAllStartLetters();
  newDiv.setAttribute("id", "eigenSnelMenu");
  // add the newly created element and it's content into the DOM
  var my_div = document.getElementsByClassName("programPagerContent");
  var eersteDiv = document.getElementsByClassName("programOverview");
  my_div = my_div[0];
  eersteDiv = eersteDiv[0];
  my_div.insertBefore(newDiv, eersteDiv);
  addStijl();
}
function addStijl(){
  var nieuweStijl = "#eigenSnelMenu{padding-bottom:16px;font-size:111%;width:22px;text-align:center;z-index:9999;left:-2px;top:163px;position:fixed;border:2px solid #000;background-color:  rgb(30, 153, 204);}#eigenSnelMenu a{display:block;margin-bottom:-16px;color:#eee;}#eigenSnelMenu a:hover{width:100%;background-color:#eee;color:  rgb(30, 153, 204);}"; 
  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(nieuweStijl);
  } else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(nieuweStijl);
  } else if (typeof addStyle != "undefined") {
    addStyle(nieuweStijl);
  } else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(nieuweStijl));
      heads[0].appendChild(node); 
    }
  }
}

addElement();