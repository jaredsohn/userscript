// ==UserScript==
// @name           A Living Universe: Factory Controls
// @namespace      http://www.crewstopia.com
// @description    Adds an "Append?" checkbox to the Production Queue; allows you to enter ore sizes into the production queue instead of metals.
// @include        http://www.alivinguniverse.com/FactoryStatus.asp?*
// ==/UserScript==

//window.alert('alu_factory_controls');

// Add a checkbox to Append instead of Edit.
var elmAction = document.getElementsByName('Action')[0];
var newText = document.createTextNode('Append? ');
var elmParent = elmAction.parentNode.childNodes[1];
elmParent.appendChild(newText);
var newCheckbox = document.createElement('input');
newCheckbox.setAttribute('type', 'checkbox');
newCheckbox.setAttribute('value', 'Append');
newCheckbox.setAttribute('onChange', 'document.getElementsByName("Action")[0].value = this.checked ? "Append" : ""');
elmParent.appendChild(newCheckbox);

// Add a checkbox to automagically convert from raw ore to metal.
var newText2 = document.createTextNode('  Input Raw Material? ');
elmParent.appendChild(newText2);
var newCheckbox2 = document.createElement('input');
newCheckbox2.setAttribute('type', 'checkbox');
newCheckbox2.setAttribute('value', 'AutoConvert');
newCheckbox2.setAttribute('id', 'AutoConvert');
newCheckbox2.setAttribute('checked', 'checked');
elmParent.appendChild(newCheckbox2);

// Enter Ore values into the Quantity box and have them automagically converted.
var elmQuantity = document.getElementsByName('Quantity')[0];
elmQuantity.setAttribute('onChange', 'this.value = oreToMetal(this.value)');
var newScript = document.createElement('script');
newScript.innerHTML =
"function oreToMetal(oreUnits) \n" +
"{ \n" +
"   var elmItemProduced = parseInt(document.getElementsByName('ItemProduced')[0].value); \n" +
"   var ratio = 1; \n " +
"   if (document.getElementById('AutoConvert').checked == false) return oreUnits; \n" +
"   switch (elmItemProduced) \n" +
"   { \n" +
"      case 7: // Iron \n" +
"         ratio = 3; \n" +
"         break; " +
"      case 33: // Nickel \n" +
"         ratio = 4; \n" +
"         break; " +
"      case 34: // Cobalt \n" +
"         ratio = 5; \n" +
"         break; " +
"      case 35: // Titanium \n" +
"         ratio = 6; \n" +
"         break; " +
"      case 37: // Gold \n" +
"         ratio = 12; \n" +
"         break; " +
"      case 36: // Uranium \n" +
"         ratio = 20; \n" +
"         break; " +
"      default: \n" +
"         ratio = 1; \n" +
"         break; \n" +
"   } \n" +
"   var metalUnits = Math.floor(oreUnits / ratio); \n" +
"   return metalUnits; \n" +
"} \n";
document.body.appendChild(newScript);
