// ==UserScript==
// @name Ogame: general enhacements
// @author kovan
// @description adds + -, 0 and some more buttons near text boxes, widens tables to fill all the browser, smaller images in galaxy
// @include http://ogame*.de/game/*.php*
// ==/UserScript==


(function () {

  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++)
  {
    if (inputs[i].getAttribute('type') == null || inputs[i].getAttribute('type') == 'text' ) //de tipo texto
    {
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs[i].name+"')[0];texto.value=999999999;var evt=document.createEvent('KeyboardEvent');evt.initKeyEvent('keyup', true, false, null, false, false, false, false, 0, 32);texto.dispatchEvent(evt);texto.onChange();");
        a.appendChild(document.createTextNode('*'));
        a.innerHTML = "&infin;";
        inputs[i].parentNode.insertBefore(a,inputs[i].nextSibling);

        var a = document.createElement("a");
        a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs[i].name+"')[0];texto.value=0;var evt=document.createEvent('KeyboardEvent');evt.initKeyEvent('keyup', true, false, null, false, false, false, false, 0, 32);texto.dispatchEvent(evt);texto.onChange();");
        a.appendChild(document.createTextNode("0"));
        a.innerHTML = "&bull;";
        //a.innerHTML = "0";
        inputs[i].parentNode.insertBefore(a,inputs[i].nextSibling); 

        var a = document.createElement("a");
        a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs[i].name+"')[0];if (texto.value>0){ texto.value--;var evt=document.createEvent('KeyboardEvent');evt.initKeyEvent('keyup', true, false, null, false, false, false, false, 0, 32);texto.dispatchEvent(evt);}texto.onChange();");
        a.appendChild(document.createTextNode('-'));
        a.innerHTML = "&minus;";
        inputs[i].parentNode.insertBefore(a,inputs[i].nextSibling);

        var a = document.createElement("a");
        a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs[i].name+"')[0];texto.value++;var evt=document.createEvent('KeyboardEvent');evt.initKeyEvent('keyup', true, false, null, false, false, false, false, 0, 32);texto.dispatchEvent(evt);texto.onChange();");
        a.appendChild(document.createTextNode('+'));
        inputs[i].parentNode.insertBefore(a,inputs[i].nextSibling);




    }
  }
  var tablas = document.getElementsByTagName('table');
  //for (var i = 0; i < tablas.length; i++)
  //{
  //  if (tablas[i].getAttribute('width') == '519' || tablas[i].getAttribute('width') == '569'|| tablas[i].getAttribute('width') == '530')
  //     tablas[i].setAttribute('width','100%');
  //}
  var imagenes = document.getElementsByTagName('img');
  for (var i = 0; i < imagenes.length; i++)
  {
    if (imagenes[i].getAttribute('width') == '50' || imagenes[i].getAttribute('width') == '30')
    {
       imagenes[i].setAttribute('width','20');
       imagenes[i].setAttribute('height','20');
    }
    else if (imagenes[i].getAttribute('width') == '120')
    {
       imagenes[i].setAttribute('width','60');
       imagenes[i].setAttribute('height','60');
    }
  }


})();