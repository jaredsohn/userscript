// ==UserScript==
// @name           StudiVZ LinkHelper
// @namespace      studivzlinkhelfer
// @description    verhindert bei StudiVZ, dass man dieses "Sie verlassen StudiVz" angezeigt bekommt und macht einige Urls zu anklickbaren Links
// @include        *studivz.net/*
// @version         0.5
// ==/UserScript==

for (var i = 0; i < document.links.length; i++) 
	{
    	if(document.links[i].search && document.links[i].host=='www.studivz.net'){
	var fogli=document.links[i].search.replace('?','');
	fogli=fogli.replace(/%3A/gi,':');
	fogli=fogli.replace(/%2F/gi,'/');
	fogli=fogli.replace(/%3D/gi,'=');
	fogli=fogli.replace(/%3F/gi,'?');
	fogli=fogli.replace(/%25/gi,'%');
	fogli=fogli.replace(/%26/gi,'&');
	fogli=fogli.replace(/%3B/gi,';');
	fogli=fogli.replace(/%C4/gi,'Ä');
	fogli=fogli.replace(/%DC/gi,'Ü');
	fogli=fogli.replace(/%D6/gi,'Ö');
	fogli=fogli.replace(/%E4/gi,'ä');
	fogli=fogli.replace(/%FC/gi,'ü');
	fogli=fogli.replace(/%DF/gi,'ß');
	fogli=fogli.replace(/%%/gi,'%');
	fogli=fogli.replace(/%28/gi,'(');
	fogli=fogli.replace(/%22/gi,'"');
	fogli=fogli.replace(/%29/gi,')');
	fogli=fogli.replace(/%40/gi,'@');
	fogli=fogli.replace(/%23/gi,'#');
	document.links[i].href = fogli; 
		}
	};




 var allDivs = document.getElementsByTagName('div');
 var allDds= document.getElementsByTagName('dd');
 for (var j = 0; j < allDivs.length; j++) 
	{
    if (allDivs[j].className.match(/obj-innerbox/i)  && !(allDivs[j].className.match(/forumThreadsOverview/i)||allDivs[j].id.match(/GroupsMember/)))
        {
        var Ergebnis=allDivs[j].innerHTML.match(/..((http|https|ftp|mailto)\:\/\/)?(([A-Za-z0-9][\-]?)+[\.:@])+(de|net|org|com|at|info|co|ws|tv)(\/[A-Za-z0-9\/\.\%\+\?&\|$#;:=_@-]*)?/gi);
        
        if (Ergebnis)
            {
            for (var n = 0; n < Ergebnis.length; n++)
                {
                var toReplace=Ergebnis[n].substr(2);
                if (Ergebnis[n].match(/^(.[\äöü"\/_%;=])/i) || Ergebnis[n].match(/^(v:)/i)  ||  (Ergebnis[n].match(/^(\">)/i)  && window.location.href.match(/\/profile\//i)) || Ergebnis[n].match(/^(nline)/i))
                    {
                    isAttribute=1

                    }else{
                    isAttribute=0
                    }
                if (isAttribute==0)
                    {
                    if (toReplace.match(/^http/i) && toReplace!='http:')
                        {
                        var Replacer = '<a href="' + toReplace + '">' + toReplace + '</a>';
                        }
                        else
                        {
                        var Replacer = '<a href="http://' + toReplace + '">' + toReplace + '</a>';
                        }
                     
                    allDivs[j].innerHTML = allDivs[j].innerHTML.replace(toReplace, Replacer);
                    }else{
                    delete(isAttribute);
                    }
                  }
            delete(Ergebnis);
            }
        }
    };
