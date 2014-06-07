// ==UserScript==
// @name           PullModList
// @namespace      pml@kwierso.com
// @include        http://*.roosterteeth.com/forum/forum.php?fid=*
// @include        http://*.roosterteeth.com/forum/viewTopic.php?id=*
// ==/UserScript==

(function() {
    //get list of forum's mods
    var modslist = getElementByClass("sidebar", document)[0].childNodes[1].firstChild.childNodes[1];
    modslist = getElementByClass("web2User", modslist);
    
    //get element to append list to
    var forumbox = document.getElementById("pageContent");
    forumbox = getElementByClass("content", forumbox)[0];
            
    if(modslist.length > 0) {        
        //create everything
        var table1, tbody1, tr1, td1, table2, tbody2, tr2, td2, td3, td4, tr3;
        td4 = document.createElement("td");
        td3 = document.createElement("td");
        
        td2 = document.createElement("td");
        td2.appendChild(document.createTextNode("FORUM MOD"));
        td2.className = "title";
        td2.style.paddingLeft = "4px";
        td2.style.fontFamily = "Arial,Helvetica,sans-serif";
        td2.style.fontSize = "12px";
        
        tr2 = document.createElement("tr");
        tbody2 = document.createElement("tbody");
        table2 = document.createElement("table");
        
        td1 = document.createElement("td");
        td1.className = "box";
        
        tr1 = document.createElement("tr");
        tbody1 = document.createElement("tbody");
        
        table1 = document.createElement("table");
        table1.className = "border";
        table1.style.width = "10%";
        
        //start appending
        tr2.appendChild(td2);
        tr2.appendChild(td3);
        tr2.appendChild(td4);
        
        tbody2.appendChild(tr2);
        table2.appendChild(tbody2);
        td1.appendChild(table2);
        tr1.appendChild(td1);
        tbody1.appendChild(tr1);
        
        //insert Modlist
        tr3 = document.createElement("tr");
        for(i in modslist) {
            tr3.appendChild(modslist[i]);
        }
        tbody1.appendChild(tr3);
        table1.appendChild(tbody1);
        
        //append to document
        forumbox.insertBefore(table1, forumbox.childNodes[2]);
    }
})();

function getElementByClass(theClass, element) 
{
    var allkeywordtags = new Array();
	//Create Array of All HTML Tags
	var allHTMLTags=element.getElementsByTagName("*");

	//Loop through all tags using a for loop
	for (i=0; i<allHTMLTags.length; i++) 
	{
		//Get all tags with the specified class name.
		if (allHTMLTags[i].className==theClass) 
		{
            allkeywordtags.push(allHTMLTags[i]);
		}
	}
    return allkeywordtags;
}