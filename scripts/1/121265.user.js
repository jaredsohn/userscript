// ==UserScript==
// @name           Simple 500px Download
// @version        1.2
// @namespace      http://twitter.com/CoderedTr
// @copyright      Tran Nguyen Hai Thanh @ http://twitter.com/CoderedTr
// @include        http://500px.com/photo/*
// ==/UserScript==

var url = window.location + "";

var rsTest = url.search('(500px.com/photo)');

if (rsTest !== "-1") {

    var get_id = document.getElementById("thephoto").childNodes;

    var get_link = get_id[1].href;		 

	        var a = document.createElement('a');
            var div = document.createElement('div');

            a.appendChild(div);
            document.getElementById('voting_controls_container').appendChild(a);
			document.getElementById('voting_controls_container').setAttribute('style', 'height: 100px');

            //a.setAttribute('class', 'button like');
            a.setAttribute('href', get_link);
			div.setAttribute('class', 'button red');
			div.setAttribute('target', '_blank');
			div.setAttribute('style', 'margin: 10px auto');
            div.appendChild(document.createTextNode("Download"));		
	
			 get_id = null;
			 get_link = null;
	
}
