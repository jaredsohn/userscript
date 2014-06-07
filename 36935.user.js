// ==UserScript==
// @name Ikariam: Transportar mercancias
// @author Vueltero
// @include http://*.ikariam.*/index.php*
// @version 0.2
// @description Mejora para realizar envios de mercancias entre tus ciudades
// ==/UserScript==


// Add styles BEGIN
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'#transportBox { height: 30px; width: 300px; position: relative; margin:0px 0px -5px 630px; z-index:99; display:block; color:#000; font-weight:bold;}');
// Add styles END

var ikMain = document.getElementById('mainview');
var ikNewElement = document.createElement('div');
ikNewElement.setAttribute('id', 'transportBox');
ikMain.parentNode.insertBefore(ikNewElement, ikMain);


var citySelect = document.getElementById("citySelect");

var new_options = "<option value=\"\" selected>Seleccionar Ciudad</option>";
for(var i=0;i<citySelect.length;i++){
//<a href=\"index.php?view=transport&amp;destinationCityId="+citySelect[i].value+"\">T</a>
  new_options = new_options+"<option value=\""+citySelect[i].value+"\">"+citySelect[i].text+"</option>";
}

document.getElementById("transportBox").innerHTML = "<form method=\"GET\" action=\"index.php\">+ Transporte:<select name=\"destinationCityId\" style=\"width:130px;\" onchange=\"this.form.submit()\">"+new_options+"</select><input type=\"hidden\" name=\"view\" value=\"transport\" /></form>";
