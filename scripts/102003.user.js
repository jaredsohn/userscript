// ==UserScript==
// @author  Steven13
// @name    Make Job offers 13 and 14
// @namespace      http://www.steven13.com
// @description   Add new job 13 and 14
// @include        http://economy.erepublik.com/*/company/job-offers/*
// @data  29-04-2011
// ==/UserScript==

 addOption('13');
 addOption('14');

function addOption(Level) {
var selectElement = this.document.getElementById("skill_new");
var newOption = document.createElement('option');

newOption.value = Level;
newOption.title = Level;
newOption.skill = "<span class='skiller'><strong>14</strong></span>";
newOption.text = 'Guru'+Level;

var lastOptionIndex = selectElement.options.length;
selectElement.add(newOption, selectElement.options[lastOptionIndex]);
}

