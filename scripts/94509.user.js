/**
 * @version	1.1
 * @author	Allen Choong
 * @created	2011-01-10
 *
 * Castle Age monster auto attack.
 * Previously, using JQuery. But I break the dependency.
 * JQuery part is using http://joanpiedra.com/jquery/greasemonkey/ (MIT License).
 *
 *
 * Changelog
 * 2011-06-02	1.1	Due to the changes of the Facebook apps, Castle Age now run as
 *					iframe, which Javascript cannot work in cross-site. Therefore,
 *					I put the script in the iframe. There are some user interface problem,
 *					that is the buttons will be on overlay on top, but it works.
 * 2011-03-11	1.0	Due to the Firefox high usage problem, I need to make the script
 *					works on Chrome. Therefore, I re-write the script without using
 *					JQuery. Because JQuery does not work here. I created some functions
 *					so that can replace the JQuery functions I used previously.
 * 2011-02-10	0.3	Just a simple fix, that clear all the buttons before generating buttons
 * 0.2	Not only the dragon, but any attack. The input is labelled with a value, corresponding to the button at the left.
 * 0.1	This is still beta version. When the power attack (or attack) a monster is available,
 * 		click on the "Update" button, then there will be a list of button with number.
 * 		They are matched with the sequence 1 -> normal attack, 2 -> fortify, 3-> power attack,
 * 		4 -> fortify, or more.
 *
 * This script works in Greasemonkey.
 */

// ==UserScript==
// @name           Castle Age Auto Attack
// @namespace      http://allencch.wordpress.com/
// @description    Castle Age monster auto attack
// @include	   http*://web.castleagegame.com/castle/*
// ==/UserScript==
// @include        http*://apps.facebook.com/castle_age/*

/**
 * Simplify the DOM method
 */
function acInsertAfter(parent,node) {
	parent.parentNode.insertBefore(node,parent.nextSibling);
}

function acInsertBefore(parent,node) {
	parent.parentNode.insertBefore(node,parent);
}

/**
 * Simplify the get element
 * @param elem	The string, for id, uses prefix "#", tagname => '@', name => none
 * @param index	The index, if it is the elements by name, if not specified, it is 0	
 */
function acElement(elem,index) {
	if(!index) {
		index = 0;
	}
	
	var ret = null;
	//Check 1st character
	if(elem[0] == '#') {
		var elem2 = elem.substr(1);
		ret = document.getElementById(elem2);
	}
	else if(elem[0] == '@') {
		var elem2 = elem.substr(1);
		ret = document.getElementsByTagName(elem2)[index];
	}
	else {
		ret = document.getElementsByName(elem)[index];
	}
	return ret;
}

/**
 * Get a list of elements
 * @param elems	String
 * @param attr	Associative array
 */
function acElements(elems,attr) {
	if(!attr)
		attr = null;
	
	var ret = null;
	var arr = new Array();
	var list;
	if(elems[0] == '@') {
		var elem2 = elems.substr(1);
		list = document.getElementsByTagName(elem2);		
	}
	else {
		list = document.getElementsByName(elems);	
	}
	
	//Filter with attribute
	for(var j in attr) {
		for(var i=0;i<list.length;i++) {
			if(list[i].getAttribute(j) == attr[j]) {
				arr.push(list[i]);
			}
		}
	}
	
	if(attr != null) {
		ret = arr;
	}
	else {
		ret = list;
	}
	
	return ret;
}


/**
 * Add click event
 * @param elem	The document element
 * @param callback	The callback function
 */
function acAddClickEvent(elem,callback) {
	elem.addEventListener('click',callback,false);
}

/**
 * Create element
 * @param str	The element in string
 * @param attr	The attribute in associative array
 */
function acCreateElement(str,attr) {
	var elem = document.createElement(str);
	for(var i in attr) {
		elem.setAttribute(i,attr[i]);
	}
	return elem;
}

/**
 * Find element by tag name with attribute in JSON object
 * @param node	The node of the target, this node attribute will not be checked
 * @param str	The tag name in string
 * @param attr	The JSON object attribute (associative array)
 */
function acFindByTagName(node,str,attr) {
	var ret;
	
	//Checking
	if(node.nodeName.toLowerCase() == str) {
		var match = true;
		for(var i in attr) {
			if(node.getAttribute(i) != attr[i]) {
				match = false;
				break;
			}
		}
		if(match) {
			return node;
		}
	}
	
	if(node.children.length == 0) { //base step
		return null;
	}
	for(var i=0;i<node.children.length;i++) { //recursive
		ret = acFindByTagName(node.children[i],str,attr);
		if(ret)
			break;
	}
	return ret;
}



function showAllInput() {
	//Empty everything first
	acElement('#gmButtons').innerHTML = '';
	
	
	var attackInputs = acElements('@input',{'type':'image'});
	//var attackInputs = $('input[name=Attack Dragon]');
	
	var attackTimer;
	var attackNum;

	function attackStart(n) {
		attackNum = n;
		
		//Clone the form
		//var attackCurrent = $( $('input[type=image]')[attackNum] ).parent().parent().clone().get();
		var attackCurrent = acElements('@input',{'type':'image'})[attackNum].parentNode.parentNode.cloneNode(true);
		
		//$(attackCurrent).attr('id','gmCurrent');
		attackCurrent.setAttribute('id','gmCurrent');
		
		//$('#gmButtons').append(attackCurrent);
		acElement('#gmButtons').appendChild(attackCurrent);
		
		
		function attackAuto() {
			//$('input[name=Attack Dragon]')[attackNum].click(); //Don't know why cannot use attackInputs
			//$('#gmCurrent').find('input[type=image]').click();
			
			acFindByTagName(acElement('#gmCurrent'),'input',{'type':'image'}).click();
		
			attackTimer = setTimeout(attackAuto,20*1000);
		}
		
		attackAuto();
	}

	function attackStop() {
		clearTimeout(attackTimer);
	}

	
	
	if(attackInputs.length>0){		
		acElement('#gmButtons').innerHTML += '<button id="gmStop">Stop</button><br/>';
		//$('#gmStop').bind('click',window.attack.stop);
		
	}
		
	for(var i=0;i<attackInputs.length;i++) {
		acElement('#gmButtons').innerHTML += '<button name="gmAttacks">'+ (i+1) +'</button>';
		var span = acCreateElement('span',{'style':'color:#2594b4'});
		acInsertBefore(attackInputs[i],span);
		span.innerHTML = (i+1);
		
		
		//$($('button[name=gmAttacks]')[i]).bind('click',function() { window.attack.start(attackInputs[this.innerHTML - 1]) });
		//$($('button[name=gmAttacks]')[i]).bind('click',function() { 
			//attackStart(this.innerHTML-1);
		//} );
		
		
		//$('#gmButtons').append('<br/>');
		acElement('#gmButtons').innerHTML += '<br/>';
	}
	
	if(attackInputs.length > 0) {
		acAddClickEvent(acElement('#gmStop'),attackStop);
		//Register the click, after the buttons are shown, not during
		var buttons = acElements('gmAttacks');
		for(var i=0;i<buttons.length;i++) {
			acAddClickEvent(buttons[i],function() {
				attackStart(this.innerHTML-1);;
			});
		}
	}	
}

window.generateButton = function() {
	var gmControl = acCreateElement('div',{'id':'gmControl','style':'position:absolute;left:10px'});
	gmControl.innerHTML = '<button id="gmUpdate">Update</button><br/>';
	
	gmControl.innerHTML += 'Buttons:<br/>';
	gmControl.innerHTML += '<div id="gmButtons"></div>';
	
	
	//acInsertBefore(acElement('#app_content_46755028429'),gmControl);
	acInsertBefore(acElement('#globalContainer'),gmControl);
	acAddClickEvent(acElement('#gmUpdate'),showAllInput);
}


window.setTimeout(function() {
	var script = document.createElement('script');
	script.setAttribute('id','gmScript');
	script.appendChild(document.createTextNode(acInsertAfter + "\n"));
	script.appendChild(document.createTextNode(acInsertBefore + "\n"));
	script.appendChild(document.createTextNode(acElement + "\n"));
	script.appendChild(document.createTextNode(acElements + "\n"));
	script.appendChild(document.createTextNode(acAddClickEvent + "\n"));
	script.appendChild(document.createTextNode(acCreateElement + "\n"));
	
	
	script.appendChild(document.createTextNode(showAllInput + "\n"));
	
	document.getElementsByTagName('head')[0].appendChild(script);
	
	generateButton();
},1*1000);