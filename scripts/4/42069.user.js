// ==UserScript==
// @name		   Search episodes on CAT at binsearch
// @namespace      http://jimbob.tweakdsl.nl/
// @description    Adds 'search' links to every episode
// @include        http://www.pogdesign.co.uk/cat/
// ==/UserScript==
/* */
var epLinks = new xpath( "//div[contains(concat(' ', @class, ' '),' ep ')]//p/a[@rel != '' ]" );
epLinks.iterate( searchEngineLinks );

function searchEngineLinks( el )
{
	var searchElement = document.createElement('span');
	searchElement.className = 'seasep';
	searchElement.style.cursor = 'pointer';

	var br = document.createElement('br');
	el.parentNode.appendChild( br );

	var binsearch = searchElement.cloneNode( true );
	binsearch.appendChild( document.createTextNode('binsearch') );
	binsearch.addEventListener('click', function(e) { return search.call(this, e, "http://binsearch.net/index.php?q={QUERY}&max=25&adv_age=99&adv_sort=date&minsize=300&cat_id={CAT_ID}"); }, true);
	el.parentNode.appendChild( binsearch );

	var nzbindex = searchElement.cloneNode( true );
	nzbindex.appendChild( document.createTextNode(' - nzbindex') );
	nzbindex.addEventListener('click', search, true);
	nzbindex.addEventListener('click', function(e) { return search.call(this, e, "http://nzbindex.nl/search/?q={QUERY}&min=300&cat_id={CAT_ID}&hidespam=1"); }, true);
	el.parentNode.appendChild( nzbindex );	
}

function search(e, _uri)
{
	var episodeName = this.parentNode.getElementsByTagName('a')[1];
	var ep = episodeName.textContent.match(/S: ([0-9]+) - Ep: ([0-9]+)/);

	for(var i=1; i<ep.length; i++)
	{
		if(("" + ep[i]).length == 1)
		ep[i] = "0" + ep[i];
	}


	var link = new xpath( "..//a[@rel != '']", this).get(0);
	var w = window.open( _uri.replace('{QUERY}', encodeURIComponent( link.textContent + ' S'+ep[1]+'E'+ep[2] + ' 720p')).replace('{CAT_ID}', encodeURIComponent( link.getAttribute('rel').replace('q/', '') )),"search", "");
	w.focus();
}

function xpath( path, node ) 
{
	var contextNode = node || document.body;
	this.xpathResult = document.evaluate( path, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	this._offset = 0;

	this.nextElement = function()
	{
		return this.get( this._offset++ );
	};

	this.iterate = function( func )
	{
		var el;
		while(el = this.nextElement() )
		{
			func(el);
		}
	};

	this.get = function( offset )
	{
		return this.xpathResult.snapshotItem( offset );
	};

	this.setOffset = function( offset )
	{
		this._offset = 0;
	};

	this.reset = function()
	{
		this.setOffset(0);
	};
};