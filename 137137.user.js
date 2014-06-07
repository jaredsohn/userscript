// ==UserScript==
//
// @name           HSTextadder 
// @description    Adds the html for hs characters to text boxes   
// @author         SimplerUser
// @version        1.4.1
// @include        *dreamwidth.org*
//
// ==/UserScript==

//edit for ff users by janekptacijarabaci 
function detect_txtbx() {

  var txtbx = document.getElementById("body") || document.getElementById("commenttext");

  if (txtbx != null){

    clearInterval(timer);

	//get the currentusername
	var length = document.getElementsByClassName("ljuser").length;
	var user = document.getElementsByClassName("ljuser")[length-1].getAttribute("lj:user");


	var usermap = new Array('allofthelevels', 'pawsfurthought', 'fetidmustard', 'crab', 'radness', 'T1T50RGFTO', 

'asianschoolgirl', 'firstly'); //list of usernames
	var charactermap = new Array('Vriska', 'Nepeta', 'Sollux', 'Karkat', 'Terezi', 'Sollux', 'Aradia', 'Doc Scratch'); 

//characters they match to
	var character = "";

	for (var i = 0 ; i < usermap.length; i++){ //set character to username
		if (usermap[i] == user) {
			character = charactermap[i];
		}
		
	}

	//hs characters and their codes
	var htmlcharmap = new Array( 'plain', 'small', 'John', 'Rose', 'Dave', 'Jade', 'Aradia', 'Tavros', 'Sollux', 

'Karkat', 'Nepeta', 'Kanaya', 'Terezi', 'Vriska', 'Equius', 'Gamzee', 'Eridan', 'Feferi', 'Jane', 'Roxy', 'Jake', 'Dirk', 

'UU', 'uu', 'Jaspersprite', 'Doc Scratch');
	var htmlmap = new Array(
                '<span style="font: bold 1em Courier, monospace; color: #000000;">', //plain
                '<small>[]</small>', //small
		'<span style="font: bold 1em Courier, monospace; color: #0715cd;">', //john
		'<span style="font: bold 1em Courier, monospace; color: #b536da;">', //rose
		'<span style="font: bold 1em Courier, monospace; color: #e00707;">', //dave
		'<span style="font: bold 1em Courier, monospace; color: #4ac925;">', //jade
		'<span style="font: bold 1em Courier, monospace; color: #a10000;">', //aa
		'<span style="font: bold 1em Courier, monospace; color: #a15000;">', //tav
		'<span style="font: bold 1em Courier, monospace; color: #a1a100;">', //sol
		'<span style="font: bold 1em Courier, monospace; color: #626262;">', //kar
		'<span style="font: bold 1em Courier, monospace; color: #416600;"> AC: :33 <',
		'<span style="font: bold 1em Courier, monospace; color: #008141;">',
		'<span style="font: bold 1em Courier, monospace; color: #008282;">',
		'<span style="font: bold 1em Courier, monospace; color: #005682;"> AG:',
		'<span style="font: bold 1em Courier, monospace; color: #000056;">CT: D -->',
		'<span style="font: bold 1em Courier, monospace; color: #2b0057;">',
		'<span style="font: bold 1em Courier, monospace; color: #6a006a;">',
		'<span style="font: bold 1em Courier, monospace; color: #77003c;">',
		'<span style="font: bold 1em Courier, monospace; color: #00d5f2;">',
		'<span style="font: bold 1em Courier, monospace; color: #ff6ff2;">',
		'<span style="font: bold 1em Courier, monospace; color: #1f9400;">',
		'<span style="font: bold 1em Courier, monospace; color: #f2a400;">',
		'<span style="font: bold 1em Courier, monospace; color: #929292;">',
		'<span style="font: bold 1em Courier, monospace; color: #323232;">',
                '<span style="font: bold 1em Courier, monospace; color: #f141ef;">',
                '<span style="font: bold 1em Courier, monospace; color: #ffffff;">');


	var list = document.createElement('select');
	list.setAttribute('id', 'charList');
	for (var i = 0; i < htmlcharmap.length; i++){
		var nameEl = document.createElement('option');
		nameEl.setAttribute('value', htmlmap[i]);
		nameEl.innerHTML = htmlcharmap[i];
		if (htmlcharmap[i] == character) {
			nameEl.setAttribute('selected', 'selected');
		}
		list.appendChild(nameEl);
	}



	function insertAfter(newElement,targetElement) {

		var parent = targetElement.parentNode;
		 
		if(parent.lastchild == targetElement) {
				parent.appendChild(newElement);
		} else {
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	}

	//make the button
	var zNode = document.createElement ('button');
	zNode.setAttribute ('id', 'myButton');
	zNode.setAttribute ('type', 'button');
	zNode.innerHTML = 'Add Code';

	//make the button
	var end = document.createElement ('button');
	end.setAttribute ('id', 'endButton');
	end.setAttribute ('type', 'button');
	end.innerHTML = 'close tags';

	
	//make the button
	var act = document.createElement ('button');
	act.setAttribute ('id', 'actButton');
	act.setAttribute ('type', 'button');
	act.innerHTML = 'small tags';
	

	insertAfter(list, document.getElementById("subject"));
	insertAfter(zNode, document.getElementById("charList"));
	insertAfter(end, document.getElementById("myButton"));
	insertAfter(act, document.getElementById("endButton"));

	

	
	function doGetCaretPosition (ctrl) {
		var CaretPos = 0;	// IE Support
		if (document.selection) {
			ctrl.focus ();
			var Sel = document.selection.createRange ();
			Sel.moveStart ('character', -ctrl.value.length);
			CaretPos = Sel.text.length;
		}
		// Firefox support
		else if (ctrl.selectionStart || ctrl.selectionStart == '0')
			CaretPos = ctrl.selectionStart;
		return (CaretPos);
	}
	function setCaretPosition(ctrl, pos){
		if(ctrl.setSelectionRange)
		{
			ctrl.focus();
			ctrl.setSelectionRange(pos,pos);
		}
		else if (ctrl.createTextRange) {
			var range = ctrl.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
	function ButtonClickAction (zEvent)
	{	
		html = document.getElementById('charList').value
		var curPos = doGetCaretPosition(txtbx);
		var curVal = txtbx.value;
		txtbx.value = curVal.substring(0, curPos) + html + curVal.substring(curPos); //adds the stuff
		setCaretPosition(txtbx, curPos + html.length);
	}
	function EndButtonClickAction (zEvent)
	{	
		var toAdd = '</span>';
		
		var curPos = doGetCaretPosition(txtbx);
		var curVal = txtbx.value;

		txtbx.value = curVal.substring(0, curPos) + toAdd + curVal.substring(curPos); //adds the stuff
		setCaretPosition(txtbx, curPos + toAdd.length);
	}
	
	
	function ActButtonClickAction (zEvent)
	{	

		var toAdd = '<small>[]</small>';
		
		var curPos = doGetCaretPosition(txtbx);
		var curVal = txtbx.value;

		txtbx.value = curVal.substring(0, curPos) + toAdd + curVal.substring(curPos); //adds the stuff
		setCaretPosition(txtbx, curPos + 8);
	}
	
	
	
		//--- Activate the newly added button.
	document.getElementById ("myButton").addEventListener ("click", ButtonClickAction, false);

	document.getElementById ("endButton").addEventListener ("click", EndButtonClickAction, false);
	document.getElementById ("actButton").addEventListener ("click", ActButtonClickAction, false);

  }

}

timer = setInterval(detect_txtbx, 100);