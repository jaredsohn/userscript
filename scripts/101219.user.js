// ==UserScript==
// @name           Search box append
// @namespace      pedro_sland
// @include        *warez-bb.org/search*
// ==/UserScript==

(function(){
	var unsafeDocument = unsafeWindow.document;
	var elems = unsafeDocument.getElementsByClassName('topictitle');
	
	function ajaxReq(url, link){		
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4){
				if(ajax.status != 200){
					link.style.color = 'red';
					link.style.fontWeight = 'bold';
				}else{
					link.style.color = '';
					link.style.fontWeight = '';
					link.parentNode.parentNode.parentNode.removeChild(link.parentNode.parentNode);
				}
			}
		};
		ajax.open('GET', url, true);
		ajax.send(null);
	}
	
	//modified from w3schools.com
	function getCookie(c_name){
		if(document.cookie.length > 0){
			c_start = document.cookie.indexOf(c_name + "=");
			if(c_start != -1){ 
				c_start = c_start + c_name.length+1; 
				c_end = document.cookie.indexOf(";", c_start);
				if(c_end == -1) c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			} 
		}
		return "";
	}

	function quarantineClicked(){
		var topicId = this.nextSibling.lastChild.href;
		var idStart = topicId.indexOf('t=')+2;
		topicId = topicId.substr(idStart, topicId.indexOf('&', idStart) - idStart);

		ajaxReq('/xyz.php?mode=1&def=1&t='+topicId+'&sid='+getCookie('phpBB_WBB_sid'), this);
	}
	function graveyardClicked(){
		var topicId = this.nextSibling.nextSibling.lastChild.href;
		var idStart = topicId.indexOf('t=')+2;
		topicId = topicId.substr(idStart, topicId.indexOf('&', idStart) - idStart);
		
		ajaxReq('/xyz.php?mode=2&t='+topicId+'&sid='+getCookie('phpBB_WBB_sid'), this);
	}

	for(var i=0; i<elems.length; i++){		
		var graveyard = unsafeDocument.createElement('a');
		graveyard.setAttribute('title', 'Send to Graveyard');
		graveyard.setAttribute('href', 'javascript:;');
		graveyard.style.width = '1em';
		graveyard.style.display = 'inline-block';
		graveyard.innerHTML = 'G';
		graveyard.onclick = graveyardClicked;
		elems[i].parentNode.insertBefore(graveyard, elems[i]);
		
		var quarantine = unsafeDocument.createElement('a');
		quarantine.setAttribute('title', 'Move to Quarantine');
		quarantine.setAttribute('href', 'javascript:;');
		quarantine.style.width = '1.1em';
		quarantine.style.display = 'inline-block';
		quarantine.innerHTML = 'Q';
		quarantine.onclick = quarantineClicked;
		elems[i].parentNode.insertBefore(quarantine, elems[i]);
	}
})();