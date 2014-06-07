// ==UserScript==
// @name           neoGAF - Extra Three Buttons
// @version        0.9.8
// @namespace      http://www.neogaf.com/
// @description    This script adds three extra buttons to NeoGAF's reply area.
// @include        http://www.neogaf.*/forum/newreply.php*
// @include        http://www.neogaf.*/forum/editpost.php*
// @include        http://www.neogaf.*/forum/newthread.php*
// ==/UserScript==

//<!-- begin hide
	
function three(){

	this.src = document.getElementById('vB_Editor_001_cmd_bold').parentNode.parentNode;
	this.td = document.createElement('td');
	this.src.appendChild(this.td);
	
	this.button = Array('Spoiler','Highlight','Strike');
	this.images = Array('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');
	var obj = document.getElementById('vB_Editor_001_textarea');
	
 	this.insert = function(e){
		// based on: http://parentnode.org/javascript/working-with-the-cursor-position/
		// gecko parts only
		
		var t = e.title.toUpperCase();
		if(obj.selectionStart >= 0){
			start = obj.selectionStart ? obj.selectionStart : 0;
			end   = obj.selectionEnd ? obj.selectionEnd : 0;
			
			pos = obj.value.substr(0, start) + '[' + t + ']' + obj.value.substr(start, (parseInt(end)-parseInt(start)));
			pos = pos.length;
			
			obj.value = obj.value.substr(0, start)
			+ '[' + t + ']'
			+ obj.value.substr(start, (parseInt(end)-parseInt(start)))
			+ '[/' + t + ']'
			+ obj.value.substr(end, obj.value.length);

			obj.focus();
			obj.setSelectionRange(pos, pos);
		}
	}
		
	this.add = function(){
		for(i in this.button){
			// oh dom
			var elem = document.createElement('img');
			elem.height = elem.width = 24;
			elem.className = 'imagebutton';
			elem.src = 'data:image/png;base64,'+this.images[i];
			elem.alt = elem.title = this.button[i];
			elem.addEventListener('click', function(){ T.insert(this); }, false);
			this.td.appendChild(elem);
		}
	}
}

var T = new three;
T.add();

// end hide -->