// ==UserScript==
// @name           Credit Agricole Sud Rhone Alpes - Normal Form
// @namespace      http://purl.org/net/louve/2010/0123/greasemonkey/casudrhonealpes
// @description    Remove the graphical keyboard for the Credit Agricole Sud Rhone Alpes
// @include        https://www.sra-g2-enligne.credit-agricole.fr/stb/entreeBam
// ==/UserScript==
// Version 2 (2010.01.23)

var conversionTable = new Array(10);
var conversionTableReverse = new Array(10);
var myInput;
var enableChangePass = true;

function writePass(pass){
  enableChangePass = false;
  //alert(pass);
  for(var i = 0; i < 10; ++i) {
    unsafeWindow.corriger();
    unsafeWindow.effacer();
  }
  for(var i = 0; i < pass.length; ++i) {
    unsafeWindow.clicPosition(conversionTable[Number(pass[i])]);
  }
  enableChangePass = true;
}

function changePass(sequence){
  //alert("changePass()");
  if(!enableChangePass) return;
  var list = sequence.split(",");
  var pass = ""
  for(var i = 0; i < list.length; ++i){
    pass = pass + conversionTableReverse[Number(list[i])];
  }
  myInput.value = pass;
  //alert(pass);
}

(function(moncompte, monmotdepasse){
    // http://developer.mozilla.org/en/docs/Gecko_DOM_Reference

    var input_cccryc = document.getElementsByName("CCCRYC").item(0);
    var input_ccpte = document.getElementsByName("CCPTE").item(0);
    input_cccryc.setAttribute("type", "text");
    if(moncompte) {
      input_ccpte.setAttribute("value", moncompte);
    }

    // lire la table de conversion des mots de passe
    var conversionTableText = "Conversion Table :\n"
    var allTD = document.getElementsByTagName("td");
    for (var i = 0; i<allTD.length; i++) {
      if(allTD[i].getAttribute("class") == "case"){
        var js = allTD[i].getAttribute("onClick"); // javascript:CocherCase('xx')
        var a = allTD[i].getElementsByTagName("a").item(0);
        if(!js) continue;
        var code = js.substr(js.indexOf("'")+1, 2);
        var num = a.textContent.trim()
        if(code.indexOf("'") == -1){
          conversionTable[Number(num)] = code;
          conversionTableReverse[Number(code)] = Number(num);
          conversionTableText += "conversionTable[" + num + "] = " + code + "\n";
        }
      }
    }
    //alert(conversionTableText);


    // GUI
    //var input_cccryc2 = document.getElementsByName("CCCRYC2").item(0);
    // Create the label
    //input_cccryc2.parentNode.insertBefore(document.createTextNode("Code secret:"), input_cccryc2);
    // Create the input
    myInput = document.createElement("input");
    myInput.setAttribute("type", "text");
    myInput.setAttribute("maxlength", "6");
    myInput.setAttribute("size", "10");
    myInput.setAttribute("value", "");
    myInput.setAttribute("tabindex", "2");
    myInput.addEventListener("input", function(e){ writePass(e.target.value); }, false);
    //input_cccryc2.parentNode.insertBefore(myInput, input_cccryc2);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.setAttribute("class", "libelle5");
    td.setAttribute("colspan", "2");
    td.appendChild(document.createTextNode("Code secret :"));
    tr.appendChild(td);
    var td = document.createElement("td");
    td.appendChild(myInput);
    tr.appendChild(td);
    var allTD = document.getElementsByTagName("td");
    var td;
    for (var i = 0; i < allTD.length; ++i) {
      if(allTD[i].getAttribute("class") == "libelle5"){
        td = allTD[i];
        break;
      }
    }
    td.parentNode.parentNode.insertBefore(tr, td.parentNode);
    td.parentNode.parentNode.insertBefore(td.parentNode, tr);
    var allA = document.getElementsByTagName("a");
    for (var i = 0; i < allA.length; ++i) {
      if(allA[i].hasAttribute("tabindex")) {
        allA[i].setAttribute("tabindex", Number(allA[i].getAttribute("tabindex"))+1);
      }
    }

//     var allForm = unsafeWindow.document.getElementsByTagName("form");
//     allForm[0].setAttribute("onSubmit", "ValidCertif(); return true;");
//     allForm[0].addEventListener("submit", function(e){
//     allForm[0].onsubmit = function(e){
//       alert("submit");
//       unsafeWindow.ValidCertif();
//       return false;
//     };//, false);

    // Corriger function

    var old_effacer = unsafeWindow.effacer;
    var old_raf = unsafeWindow.raf;
    unsafeWindow.effacer = function() {
      var res = old_effacer();
      changePass(input_cccryc.value);
      return res;
    };
    unsafeWindow.raf = function() {
      var res = old_raf();
      changePass(input_cccryc.value);
      return res;
    };

//     var changePassEventHandler = function(e){ changePass(input_cccryc.value); };
//     input_cccryc.addEventListener("ValueChange", changePassEventHandler, true);
//     input_cccryc.addEventListener("input", changePassEventHandler, true);
//     input_cccryc.addEventListener("change", changePassEventHandler, true);
//     input_cccryc.addEventListener("DOMAttrModified", changePassEventHandler, true);

    /*
    var allA = document.getElementsByTagName("a");
    for (var i = 0; i < allA.length; ++i) {
      if(allA[i].getAttribute("class") == "numero" || allA[i].getAttribute("class") == "btnmodifier"){
        //var oldevent = allA[i].onclick;
        //alert(oldevent);
        //allA[i].onclick = function(e) {
        //  changePass(input_cccryc.value);
        //  return oldevent(e);
        //};
        //allA[i].addEventListener("click", function(e){ changePass(input_cccryc.value); }, true);
      }
    }
    */

    if(monmotdepasse.length > 0) {
      myInput.value = monmotdepasse;
      writePass(monmotdepasse);
    }

})("", "")



