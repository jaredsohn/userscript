// ==UserScript==
// @name           MySpace - No proceed check.
// @description    This gets rid of the proceed question.
// @include        http://groups.myspace.com/index.cfm?fuseaction=groups.categories*
// @include        http://groups.myspace.com/index.cfm?fuseaction=groups.myGroups*
// @Version/Date    1.0.0 9-11-2006
// ==/UserScript==

var allElements, thisElement;
allElements = document.getElementsByTagName('a');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    
		GM_log(thisElement.innerHTML + ' ' + thisElement.href);						 
	if(thisElement.href.indexOf('groups.myspace.com/index.cfm?fuseaction=groups.groupProfile') > 0)
		{
		
		thisElement.href = thisElement.href + '&redirect=1';
								 
		GM_log(thisElement.href);
	    }
		
   
    }

