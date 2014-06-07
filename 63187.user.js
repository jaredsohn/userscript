// ==UserScript==
// @name          Lost item wars
// @namespace     http://userscripts.org/users/110369
// @description   Return several lost items at once
// @include       http://*twilightheroes.com/return-lost.php*
// ==/UserScript==
//
//Modified from the original to work with any 'returnable' item type.
//  ie: any *ouch item, or snow day items, etc.

var inputs = document.getElementsByTagName('input');
var submit = inputs[2];
submit.value = 'Send the item(s) back';

var wrapper = document.createElement('span');
submit.parentNode.insertBefore(wrapper, submit);

var quantity = document.createElement('input');
quantity.setAttribute('size', 3);
quantity.setAttribute('maxlength', 3);
quantity.value = 1;
submit.parentNode.insertBefore(quantity, submit);

var div = document.createElement('div');
div.innerHTML = 'Quantity:';
quantity.parentNode.insertBefore(div, quantity);

submit.type = 'button';
submit.addEventListener('click', parseData, true);

if (GM_getValue('usemsg', '') != '') {
	var raw_text = GM_getValue('usemsg');
	var resultPattern = new RegExp("<h2>Results:<\\/h2>(.+?)<BR><HR.+");	
	var resultMatch = resultPattern.exec(raw_text)[1];
	var first = resultMatch.split("Added for ")[0];
	var last = resultMatch.split(" minutes.)")[1];
	var resultNode = createResultNode();
	var total=GM_getValue('usednum');
	GM_log(resultMatch);
	GM_log(last);
	if (last){ 
		var newResult = first+"Added for "+(30*total)+" minutes.)"+last;
		resultNode.innerHTML = newResult;}
	else
		resultNode.innerHTML = resultMatch+'(x'+GM_getValue('usednum')+')';
	GM_setValue('usednum', 0);
	GM_setValue('usemsg', '');}

function parseResults(msg, num) {
	var oldNum = GM_getValue('usednum', 0);
	if (oldNum<1)
		GM_setValue('usemsg', msg);
	GM_setValue('usednum', num+oldNum);}

function parseData() {
	if (!quantity.value.match(/^\d+$/)) {
		alert("Invalid number");
		return;}
	var num = quantity.value;
	var menu = document.getElementsByTagName('select')[0];
	var item = menu.options[menu.options.selectedIndex].value;
	var pwd = inputs[0].value;
	var target = inputs[1].value;
	var data = encodeURI("pwd="+pwd+"&which="+item+"&bufftarget="+target);
		returnItems(data, num);
	//window.location = 'http://www.twilightheroes.com/return-lost.php?which='+item;
	setTimeout("window.location = 'return-lost.php?which="+item+"'", num*750);}

function returnItems(data, num) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.twilightheroes.com/return-lost.php?'+data,
		onload: function(responseDetails) {
				parseResults(responseDetails.responseText, 1);
				if (--num > 0)
					returnItems(data, num);},});}

function createResultNode() {
	var myH1 = document.getElementsByTagName('h1')[0];
	var myRuler = document.createElement('hr');
	myRuler.setAttribute('size', 2);
	myRuler.setAttribute('color', 'eeeef5');
	myRuler.setAttribute('width', '75%');
	myH1.parentNode.insertBefore(myRuler, myH1);
	var myDiv = document.createElement('div');
	myRuler.parentNode.insertBefore(myDiv, myRuler);
	var myH2 = document.createElement('h2');
	myH2.innerHTML = 'Results:';
	myDiv.parentNode.insertBefore(myH2, myDiv);
	return myDiv;}
