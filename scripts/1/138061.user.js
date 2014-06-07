// ==UserScript==
// @name        WorkeyRemplisCreationDemande
// @namespace   com.genwyse.workey
// @include     https://*/workey?*
// @version     1
// ==/UserScript==
function fillInput(id,value) {
  var input = document.getElementById(id);
  if (input!=null) {
    input.value = value;
  }
}
function check(id) {
  var radio = document.getElementById(id);
  if (radio!=null) {
    radio.checked = "checked";
  }
}

function fillForm (form,dem_type) {
  //var num = document.getElementById("Field_demande_nom").value;
  var num = prompt ("Numéro de lot");
  fillInput("Field_demande_nom", dem_type + " " + num);
  if (dem_type=="BPA") {
    check("demande_type_0");
  }
  else {
    check("demande_type_1");
  }
  fillInput("Field_demande_numero_lot",num);
  check("demande_nature_operation_0");
  check("demande_proprietaire_0");
  fillInput("Field_demande_surfaceboutique",num);
  fillInput("Field_demande_loyerprevuboutique",num);
  fillInput("Field_demande_indemnapayer",num);
  fillInput("Field_demande_droits_entree",num);
}

var form = document.forms["workeyForm"];
if (form!=undefined) {
  var submit_button = form.elements["$Submit"];
  if (submit_button==undefined) {
    return;
  }
  var submit_button_parent = submit_button.parentNode;
    
  var button_new_doc = form.elements["$Submit$9"];
  
  if (button_new_doc != undefined) {
    var parent = button_new_doc.parentNode;
    //parent.removeChild(button_new_doc);
    button_new_doc = button_new_doc.cloneNode(true);
    submit_button_parent.insertBefore(button_new_doc,submit_button);
  }
  else {
    var button = document.createElement("button");
    button.type = "button";
    button.name = "remplis";
    button.innerHTML = "Remplir BPA";
    button.onclick = function () { fillForm (form, "BPA"); submit_button.click(); }; 
    submit_button_parent.insertBefore(button,submit_button);
    
    var button2= document.createElement("button");
    button2.type = "button";
    button2.name = "remplis";
    button2.innerHTML = "Remplir Résil";
    button2.onclick = function () { fillForm (form, "RES"); submit_button.click(); }; 
    submit_button_parent.insertBefore(button2,submit_button);
  }
}
