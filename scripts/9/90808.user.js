// ==UserScript==
// @name           Inline paste
// @namespace      xpsdeset
// @include        *
// @exclude        http://userscripts.org/*
// @exclude        http://codepad.org/*
// @exclude        http://paste-it.net/*
// ==/UserScript==



var links = document.getElementsByTagName( 'a' );
var element;

for ( i = 0; i < links.length; i++ )
{
    element = links[i];
  
        
            if ( element.href.indexOf( "http://codepad.org/" ) == 0 ) 
            {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: element.href+'/raw.txt',
                    theelement: element,
                    onload: function(response) 
                    {
                        
						
						x=this.theelement;
				var dld=document.createElement("div");
					dld.innerHTML="<pre>"+response.responseText+"</pre>";
					
					x.parentNode.insertBefore( dld ,x.nextSibling);

						
                    }
                });
                
            }
			
			 if ( element.href.indexOf( "http://paste-it.net" ) == 0 ) 
            {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: element.href.replace("http://paste-it.net/", "http://paste-it.net/raw/"),
                    theelement: element,
                    onload: function(response) 
                    {
                        
						
						x=this.theelement;
				var dld=document.createElement("div");
					dld.innerHTML="<pre>"+response.responseText+"</pre>";
					
					x.parentNode.insertBefore( dld ,x.nextSibling);

						
                    }
                });
                
            }

    
}
