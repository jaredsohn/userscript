// ==UserScript==
// @name           haproxy DOC indexer
// @namespace      http://haproxy.1wt.eu/
// @description    add links in haproxy docs
// @include        http://haproxy.1wt.eu/*.txt*
// ==/UserScript==

var reg =  /\n[0-9.]+\.(?=  )|\n[0-9.]+\. (?! )|section [0-9\.]+/; reg.compile;
var reg1 = /\n[0-9\.]+\. (?! )/; reg1.compile;
var reg2 = /\n\n[a-z0-9][a-z0-9\._-]+([a-z0-9\._ -]+)?(?=[^\n]*\n)|\n[a-z0-9][a-z0-9\._-]+([a-z0-9\._ -]+)?(?=[^\n]*\n  )|"[a-z0-9][a-z0-9_-]+([a-z0-9_ -]+)?"/; reg2.compile;
var reg3 = /"[a-z0-9][a-z0-9_-]+([a-z0-9_ -]+)?"/; reg3.compile;

var Nodes = Array();
var textOptionNodes = Array();
var suggetsText=new Array();

(function(d){
	GM_log('HAproxy TOC made : START');
	getNodes(document.documentElement);
	for (var i in Nodes)
	{
		var nodes = new Array(Nodes[i]);
		while (nodes.length > 0)
		{
			var node = nodes.shift();
			var Matches = node.nodeValue.match(reg);
			if (Matches == null) continue;
			var pos = node.nodeValue.indexOf(Matches[0]);
			if (pos == -1) continue;
			else if (pos == 0)
			{
				if (node.nodeValue.length > Matches[0].length)
				{
					node.splitText(Matches[0].length);
					nodes.push(node.nextSibling);
				}
				var linky = document.createElement("a");
				if (Matches[0].match(reg1) == null) //ce n'est pas le ToC
					linky.href = '#' + Matches[0].replace(/ |\n|"/g,'').replace(/section([0-9\.]+)/,'$1.');
				else
					linky.id=Matches[0].replace(/ |\n|"/g,'');
				node.parentNode.insertBefore(linky, node);
				linky.appendChild(node);
			}
			else
			{
				node.splitText(pos);
				nodes.unshift(node.nextSibling);
			}
		}
	}
	
	//recherche des options
    var textOptionNodes = document.evaluate("//text()[ preceding::a[@id='4.2.'] and following::a[@id='6.'] or preceding::a[@id='3.1.'] and following::a[@id='4.'] or preceding::a[@id='7.5.'] and following::a[@id='7.6.'] or preceding::a[@id='9.2.']]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for ( var i=0 ; i < textOptionNodes.snapshotLength; i++ )
    {
        nodes = new Array(textOptionNodes.snapshotItem(i));
        while (nodes.length > 0)
		{
			var node = nodes.shift();
			var Matches = node.nodeValue.match(reg2);
			if (Matches == null) continue;
			var pos = node.nodeValue.indexOf(Matches[0]);
			if (pos == -1) continue;
			else if (pos == 0)
			{
				if (node.nodeValue.length > Matches[0].length)
				{
					node.splitText(Matches[0].length);
					nodes.push(node.nextSibling);
				}
				var linky = document.createElement("a");
				if (Matches[0].match(reg3) != null)
					linky.href = '#' + Matches[0].replace(/ |\n|"/g,'');
				else {
				    linky.id=Matches[0].replace(/ |\n/g,'');
				    linky.className='opt';
				}
				node.parentNode.insertBefore(linky, node);
				linky.appendChild(node);
			}
			else
			{
				node.splitText(pos);
				nodes.unshift(node.nextSibling);
			}
		}
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '#search {position:fixed;top:5px;right:50px;background-color:green;} #search input { width: 300px; }';
    document.getElementsByTagName('head')[0].appendChild(style);
    
    //moteur de recherche options
    var form=document.createElement('form');
    form.id='search';
    form.action = '#';
    form.appendChild(document.createElement('input'));
    form.firstChild.type='text';
    //form.firstChild.onchange=manageEvent(event);
    window.addEventListener('keyup',function(event) { return manageEvent(event); }, true);
    document.body.appendChild(form);
    //selection des suggestions
    form.appendChild(document.createElement('ul'));
    form.getElementsByTagName('ul')[0].id="suggests";
    GM_log('HAproxy TOC made : STOP');

}(document));

function manageEvent(event) {
    var target = event.target;
    var eventType = event.type;
    //if (eventType == 'keyup') GM_log(event.keyCode);
    var form = document.getElementById('search');
    var ul = form.childNodes[1];
    var li;
    if ( eventType== 'keyup' && target == form.firstChild ) {
        switch (event.keyCode) {
        case 13:
            window.location.hash = '#'+target.value.replace(/ |\n/g,'');
            break;
        }
        while (ul.childNodes.length > 0) ul.removeChild(ul.firstChild);
        
        if (target.value != '') {
            var suggestNode = document.evaluate('//a[@class="opt" and contains(text(),"' + target.value + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var temp = new Array();
            for ( var i=0 ; i < suggestNode.snapshotLength; i++ ) {
                temp.push(suggestNode.snapshotItem(i).textContent.replace("\n",''));
            }
            temp = temp.sort();
            for (var i=0; i < temp.length; i++) {
                li = document.createElement('li');
                li.appendChild(document.createElement('a'));
                li.firstChild.href='#'+temp[i].replace(/ |\n/g,'');
                li.firstChild.textContent = temp[i];
                ul.appendChild(li);
            }
        }
    }
}

function getNodes(node)
{
	if (node.nodeType == 3)
	{
		if (node.nodeValue.search(reg) != -1)
		Nodes.push(node);
	}

	else if (node && node.nodeType == 1 && node.hasChildNodes() && !node.tagName.match(/^(a|head|object|embed|script|style|frameset|frame|iframe|textarea|input|button|select|option)$/i))
		for (var i in node.childNodes)
			getNodes(node.childNodes[i]);
}
