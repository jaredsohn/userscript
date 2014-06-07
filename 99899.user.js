// ==UserScript==
// @name          RemoveGoogleAd
// @namespace     RemoveAd
// @author        fs2186
// @version       0.0.3
// @description   Remove google advertisement
// @include       http://*.google.*
// @include       https://*.google.*
// ==/UserScript==

(function () {
	var elements = document.getElementsByTagName( '*' );
	var index = 0;
	while( index < elements.length )
	{
		var matched = false;
		
		if( elements[index].id == 'tads' || elements[index].id == 'topads' || elements[index].id == 'tadsb' || elements[index].id == 'bottomads' || elements[index].id.match( /^(mclip|ad)_/ ) )
		{
			GM_log( 'id: ' + elements[index].id );
			var parent = elements[index].parentNode;
			parent.removeChild( elements[index] );
			delete parent;
			matched = true;
		}
		else if( elements[index].id == 'rhs_block' )
		{
			matched = removeChildAdNodes( elements[index] );
		}
		
		var href = elements[index].getAttribute( 'href' );
		var hrefMatchStr = /\/aclk\?/;
		if( href != null && href.match( hrefMatchStr ) )
		{
			GM_log( 'href: ' + href );
			var parent = elements[index].parentNode;
			parent.parentNode.removeChild( parent );
			delete parent;
			matched = true;
		}
		delete hrefMatchStr;
		delete href;

		if( !matched ) { index++; }
		
		delete matched;
	}
	delete index;
	delete elements;
	
//functions
	function removeChildAdNodes( targetNode )
	{
		var matched = false;
		var childs = targetNode.childNodes;
		var index = 0;
		while( index < childs.length )
		{
			matched = false;
			
			if( childs[index].id != 'rhs_map' )
			{
				GM_log( 'id: ' + childs[index].id );
				targetNode.removeChild( childs[index] );
				matched = true;
			}
			
			if( !matched ) { index++; }
		}
		delete index;
		delete childs;
		
		return matched;
	}

})();