/*

	Script to put a clickable "source" label on blockquotes that 
	have addressable cite attributes
	
	Gareth Simpson (http://xurble.org/)

*/

// ==UserScript==
// @name            BlockQuote Cite
// @namespace       http://xurble.org/userscripts
// @description     Displays blockquotes cite attributes
// @include         *
// ==/UserScript==
(function () {
	

	// Append this to existing onload scripts
	// We do this to allow existing blockquote extractors to run before we do
	// otherwise we get ugly doubling up of	the source
	if(window.onload == null)
	{
		window.onload = gmBlockQuotes;
	}
	else
	{
		var str = window.onload.toString();
		var newLoadStr = str.substring(str.indexOf("{") + 1,str.lastIndexOf("}") - 1) + "\r" + ";" + "gmBlockQuotes();";
		window.onload = new Function(newLoadStr);
		
		
	}
	

})();


function gmBlockQuotes()
{
  quotes = document.getElementsByTagName('blockquote');
  for (i = 0; i < quotes.length; i++) {
    cite = quotes[i].getAttribute('cite') + "";
    
    if (cite.substring(0,7) == "http://" || cite.substring(0,8) == "https://") 
    {
    	
			var xpath = 'count(//a[@href="' + cite + '"])';
			
			var a = document.evaluate(xpath, document, null, XPathResult.NUMBER_TYPE, null);    	
			
			var nval = a.numberValue;
			
    	if(nval == "0")
    	{
    	
	      newlink = document.createElement('a');
	      newlink.setAttribute('href', cite);
	      newlink.setAttribute('title', cite);
	  
				theTitle = quotes[i].getAttribute('title');
				if(theTitle == '' || theTitle == null)
				{
					theTitle = "Source";
				}
	
				newlink.appendChild(document.createTextNode(theTitle));
	      newdiv = document.createElement('p');
	      //newdiv.className = 'blockquotesource';
	      newdiv.setAttribute("style","text-align: right;");
	      newdiv.appendChild(newlink);      
	      quotes[i].parentNode.insertBefore(newdiv, quotes[i].nextSibling);
	      
	      
	    }
    }
  }	
	
}
