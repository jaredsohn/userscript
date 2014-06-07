// ==UserScript==
// @name           GoogleSearch Gabage
// @namespace      http://greasemonkey.4web8.com/
// @description    Selected web-sites aren't displayed from Google search result.
// @include        http://www.google.*
// ==/UserScript==

(function() {
	var blockurl = GM_getValue( 'erasepage', '' );
	var blocks = {};
	var tag = "a";
	var searchClass = "l";
	var classElements = new Array();	
	var els = document.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	var obj = "";

	if( blockurl != '' )
	{
		var val = blockurl.split("{{!}}");
		for( var k=0; k<val.length; k++ )
		{
			blocks[val[k]] = 1;
		}
	}

	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];

			if( blocks[ classElements[j].href ] == 1 )			
			{
				classElements[j].parentNode.firstChild.style.color = "#ccc";
				classElements[j].parentNode.nextSibling.style.color = "#ccc";
			}

			if( !!classElements[j].parentNode.nextSibling )
			{
				obj = classElements[j].parentNode.parentNode.getElementsByClassName("gl")[0];

				if( !!obj )
				{				
					DelLinkAdd( j, classElements[j], obj );
				}
			}

			j++;
		}
	}

function DelLinkAdd( count, element, obj )
{
	var haihun = document.createTextNode(' - ');
	var child = document.createElement('a'); 
	child.href = "javascript:void(0)";
	child.id = "pageerase" + count;
	child.appendChild(document.createTextNode("このページを削除"));

	var haihun2 = document.createTextNode(' - ');
	var child2 = document.createElement('a'); 
	child2.href = "javascript:void(0)";
	child2.id = "pagereverse" + count;
	child2.appendChild(document.createTextNode("このページを復活"));


	obj.appendChild(haihun);
	obj.appendChild(child);
	obj.appendChild(haihun2);
	obj.appendChild(child2);

    child.addEventListener('click',function (){ PageDel( element , child ); },false);
    child2.addEventListener('click',function (){ PageReverse( element , child2 ); },false);

}


function PageDel( element, child )
{
	var val = GM_getValue( 'erasepage', '' );
	var data = val.split("{{!}}");
	var nocheck = 0;

	for( var i=0; i<data.length; i++ )
	{
		if( data[i] == element.href )
		{
			nocheck = 1;
		}
	}

	if( nocheck == 0 )
	{
		if( val != '' ){ val = val + "{{!}}" + element.href; }
		else{ val = element.href; }

		GM_setValue( 'erasepage', val );
	
		element.parentNode.firstChild.style.color = "#ccc";
		element.parentNode.nextSibling.style.color = "#ccc";
	}
}

function PageReverse( element, child )
{
	var val = GM_getValue( 'erasepage', '' );
	var data = val.split("{{!}}");
	var nocheck = 0;

	val = "";
	for( var i=0; i<data.length; i++ )
	{
		if( data[i] != element.href )
		{
			val = val + "{{!}}" + data[i];
		}
	}

	GM_setValue( 'erasepage', val );

	element.parentNode.firstChild.style.color = "blue";
	element.parentNode.nextSibling.style.color = "black";
}
})();