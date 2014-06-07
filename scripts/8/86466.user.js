// ==UserScript==
// @name          Go Fluently I2S2 for Firefox
// @namespace     http://www.gofluently.com/
// @description   Corrects a few CSS and HTML problems in Fluency's I2S2 Interpreter Scheduler tool (http://www.gofluently.com/interpreter-scheduling-overview.htm) so that it renders as intended in Firefox
// @include       https://www.gofluently.com/*
// @include       https://gofluently.com/*
// ==/UserScript==
form_elements = document.forms[0].elements;
number_of_elements = form_elements.length;
for (i=0; i < number_of_elements; i++)
{
  if (form_elements[i].type=="text") form_elements[i].size=form_elements[i].maxLength;
}

GM_addStyle('.inputElement input { width: auto; }');
GM_addStyle('tr.selectedItem { background-color:#999; }');
GM_addStyle('tr.alternating { background-color:#eee; }');
