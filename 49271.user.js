// Ikariam remaining transport space
// version 1.0
// Copyright (c) 2009, iknietjij/Martynius

// ==UserScript==
// @name           Ikariam remaining transport space
// @version     1.0
// @namespace      http://www.ikariam.org/
// @author         iknietjij (http://userscripts.org/users/89132) and Martynius (http://userscripts.org/users/68307)
// @description    Lists the amount of resources used in the ship and the amount of resources still availabie in the current ships.
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://s*.ikariam.*/index.php?*view=transport*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

var goods = {wood:0, wine:0, marble:0, glass:0, sulfur:0};
function changeResource( resource, input ) {
	var value = parseInt( input );
	if ( !isNaN( value ) ) {
		goods[resource] = value;
		total = 0;
		for ( var i in goods ) total += goods[i];
		if (total % 500 == 0) {
      var shipSpace = total - (total % 500);
      var remainingResources = 0;
      var tooManyResources = 0;
    }
    else {
      var shipSpace = total - (total % 500) + 500;
      var remainingResources = shipSpace - total;
      var tooManyResources = total % 500;
    }
    
    if (document.getElementById('submit')) {
      totalTransElement = document.getElementById('submit');

      if (!document.getElementById('transportRemaining')) {
        var insertElement = document.createElement('br');
        totalTransElement.parentNode.appendChild(insertElement);
        insertElement = document.createElement('span');
        insertElement.id = 'transportRemaining';
        insertElement.style.setProperty('font-size','12px',null);
        insertElement.innerHTML = '<b>Resources</b>: ' + total + ' / ' + shipSpace + ' (remaining: ' + remainingResources + ' - too much: ' + tooManyResources + ')<br/>';
        totalTransElement.parentNode.insertBefore(insertElement,totalTransElement);
      }
      else {
        var insertedElement = document.getElementById('transportRemaining');
        insertedElement.innerHTML = '<b>Resources</b>: ' + total + ' / ' + shipSpace + ' (remaining: ' + remainingResources + ' - too much: ' + tooManyResources + ')<br/>';
      }
    }
	}
}

const resources = ["wood","wine","marble","glass","sulfur"];
var dragging = false;
for ( var i = 0; i < resources.length; i++ ) {
	$("li." + resources[i]).each( function() {
		var resource = resources[i];
		var input = $("input.textfield", this)[0];
		$("div.sliderinput", this).each( function() {
			$("div.sliderthumb", this)
				.mousedown(	function() { dragging = {r:resource, i:input}; });
			$(this)	.click( function() { changeResource( resource, input.value ); });
			$("a", this)
				.click( function() { changeResource( resource, input.value ); });
		});
		$("input.textfield", this)
			.keyup( function() { changeResource( resource, input.value ); });
	});
}
function delayDrag() {
	changeResource( dragging.r, dragging.i.value );
}
$("body").mousemove( function() {
		if (dragging !== false)
			setTimeout( delayDrag, 10 );
	})
	.mouseup   ( function() { dragging = false; });