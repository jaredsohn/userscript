// ==UserScript==
// @name           Definr
// @namespace      http://adityamukherjee.com/geekaholic/
// @description    Get a definr box for instant word definitions
// @include        *
// ==/UserScript==

function $(el){
	return document.getElementById(el);
}

function definr_makeRequest(val){
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.definr.com/definr/show/'+encodeURI(val),
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(response) {
	        $('definr_result').innerHTML = response.responseText;
	        timeout = 0;
	    }
	});
}

function definr_createElements(){
	inp = document.createElement('input');
	inp.id = 'definr_input';
	timeout = 0;
	{//set all event listeners
		inp.addEventListener('keyup', function(){
			if($('definr_input').value != ''){
				window.clearTimeout(timeout);//clear existing
				timeout = window.setTimeout(function(){
						$('definr_result').innerHTML = "Looking up <b>"+$('definr_input').value+"</b>";
						$('definr_result').style.display = 'block';
						definr_makeRequest($('definr_input').value);
					}, 1000);
			} else {
				$('definr_result').style.display = 'none';
				window.clearTimeout(timeout);
			}
		}, true);
		inp.addEventListener('focus', function(){
			if($('definr_input').value != ""){
				timeout = window.setTimeout(function(){
						$('definr_result').innerHTML = "Looking up <b>"+$('definr_input').value+"</b>";
						$('definr_result').style.display = 'block';
						definr_makeRequest($('definr_input').value);
					}, 1000);
			}
			$('definr_container').style.left = '0px'; 
			$('definr_input').style.borderColor = 'gray';
		}, true);
		inp.addEventListener('blur', function(){
			this.value = "";
			window.clearTimeout(timeout);
			$('definr_container').style.left = '-128px'; 
			$('definr_input').style.borderColor = 'silver';
			$('definr_result').style.display = 'none';
		}, true);
	}
	inp.setAttribute('style','padding:2px;font:11px Verdana,sans-serif;border:1px solid silver;width:128px');
	inp.setAttribute('accesskey','s');
	
	res = document.createElement('div');
	res.id = 'definr_result';
	res.setAttribute('style','font:11px Verdana,sans-serif;padding:10px;background:white;display:none');
	res.addEventListener('click', function(){ this.style.display = 'none'}, true);
	
	container = document.createElement('div');
	container.id = 'definr_container';
	container.setAttribute('style','position:fixed;bottom:0px;left:-125px;padding:5px;opacity:0.8;z-index:10000');
	container.appendChild(res);
	container.appendChild(inp);
		top.document.getElementsByTagName('body')[0].appendChild(container);
}

definr_createElements();