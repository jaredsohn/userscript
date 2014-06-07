// ==UserScript==
// @name PoF EasyRating
// @namespace http://userscripts.org/users/73089
// @description Makes the image rating page more user friendly.
// @include http://*.pof.com/rate_newimages.aspx
// ==/UserScript==

var ratingForm = document.getElementById('form1');
var tableNode = ratingForm.parentNode.parentNode.parentNode.parentNode;

var hiddenGender = document.getElementsByName('gender')[1];
var hiddenImageId = document.getElementsByName('image_id')[0];

var submitButtons = document.getElementsByName('vote');

var newForm = '<form action="rate_newimages.aspx" method="post" target="_top" id="form1" name="form1">';
newForm += hiddenGender.outerHTML;
newForm += hiddenImageId.outerHTML;

for (var button in submitButtons)
{
    newForm += submitButtons[button].outerHTML;
}

newForm += '</form>';

ratingForm.parentNode.removeChild(ratingForm);

var newRow = tableNode.insertRow(0);
var newCell = newRow.insertCell(0);
newCell.colSpan = 4;
newCell.innerHTML = newForm;