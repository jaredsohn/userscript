// ==UserScript==
// @name           Travian Common Links
// @description    Gives links to commonly used buildings under your village
// @version     5.5
// @include     http://*.travian*.*/*
// @exclude     http://*.travian*.*/
// ==/UserScript==


        function xpath(query, object) {if(!object) var object = document;return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}
        
        function linkInsert(){var re = /logout.php/i;if (re.test(window.location.href)) {return false;}
    		    
	    dtest=xpath("id('side_info')");
    
    	if(dtest.snapshotItem(0)){
	
	    newInside = '<table style="padding: 1px; border: 1px solid rgb(192, 192, 192); width: 0px;">' +
		'<tr>'+
		'<td align="center"><a href="build.php?gid=17"><img src="img/un/g/g17.gif" title="GOTO YOUR MARKETPLACE"/></a></td>'+
		'<td align="center"><a href="build.php?gid=19"><img src="img/un/g/g19.gif" title="GOTO YOUR BARRACKS"/></a></td>'+
		'<td align="center"><a href="allianz.php"><img src="img/un/g/g18.gif" title="GOTO YOUR ALLIANCE"/></td>'+
	    '</tr>'+
		'<tr>'+
		'<td align="center"><a href="build.php?gid=20"><img src="img/un/g/g20.gif" title="GOTO YOUR STABLES"/></a></td>'+
		'<td align="center"><a href="build.php?gid=16"><img src="img/un/g/g16.gif" title="GOTO YOUR RALLY POINT"/></a></td>'+
		'<td align="center">&nbsp;</td>'+
	    '</tr>'
    	'</table>';
		
		dtest=xpath("id('side_info')");
		
		if(dtest.snapshotItem(0))
		
		{var inside=dtest.snapshotItem(0).innerHTML,fStart=inside.indexOf('<ul ');
		
		//alert("first part: "+inside.substring(0,fStart+16));
		
		}else{
		
		newInside='<div id="side_info">'+newInside+'</div>';}
		
		dtest.snapshotItem(0).innerHTML=dtest.snapshotItem(0).innerHTML+newInside;}
       
        }window.addEventListener( 'load', linkInsert, false);