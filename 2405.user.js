// ==UserScript==
// @name          Demonoid Ad Free
// @author        Tyler Charlesworth
// @namespace     http://www.tyworks.net
// @description   removes ads from demonoid, adds additional features
// @include       http://www.demonoid.com/*
// ==/UserScript==
/*
Line 29 tells you how to disable the pending ratings folding.
*/

(function(){
	var allTds = document.getElementsByTagName('td');
	for(i=0; i<allTds.length; i++) {
		//removes banners on top and bottom
		if(allTds[i].className=="tbltxtnb"){ allTds[i].style.display="none"; }
		//removes demonoid donate link, but dont get me wrong, you should support them; they are awesome
		//go here to donate: http://www.demonoid.com/donate.php
		if(allTds[i].innerHTML.indexOf("<td")==-1 && allTds[i].innerHTML.indexOf("donate.gif")!=-1){ allTds[i].style.visibility="hidden"; }
	}
	
	
	//removes vertical ad on right
	if(document.getElementById('bnr2')){ document.getElementById('bnr2').parentNode.style.display="none"; }
	
	
	//find the box with the ratings and give it an id
	var theTable = null;
	//IF YOU WANT TO DISABLE THE PENDING FOLDING FEATURE, COMMENT OUT THE FOLLOWING LINE (with "//")
	if(document.getElementsByName('ifratings')[0]){ theTable = document.getElementsByName('ifratings')[0].parentNode.parentNode.parentNode; theTable.id = "theTable"; }
	//make the arrow image
	//note: images used were adapted from protopage.com
	var theSwitchArrow = document.createElement('img');
	theSwitchArrow.id = "pendingArrow";
	theSwitchArrow.setAttribute('width','8');
	theSwitchArrow.setAttribute('height','13');
	theSwitchArrow.style.marginLeft = "5px";
	theSwitchArrow.setAttribute('src','data:image/gif,GIF89a%08%00%0D%00%80%01%00%00%00%00%FF%FF%FF!%F9%04%01%00%00%01%00%2C%00%00%00%00%08%00%0D%00%00%02%14%04%82az%9C%B6%92C%91%9EXa%7B%5B%FA%0F%86bP%00%00%3B');
	if(theTable){
		//make the row look clickable
		theTable.firstChild.style.cursor = "pointer";
		//add an action to the
		theTable.firstChild.setAttribute('onClick', "if(document.getElementById('theTable').getElementsByTagName('td')[1].style.display=='none'){ document.getElementById('theTable').parentNode.style.borderBottom=''; document.getElementById('pendingArrow').setAttribute('src','data:image/gif,GIF89a%08%00%0D%00%80%01%00%00%00%00%FF%FF%FF!%F9%04%01%00%00%01%00%2C%00%00%00%00%08%00%0D%00%00%02%12%8C%01%A6%88%9B%D1%9A%9B%0A2%1A%DF%D1%B5%FB%0F~%05%00%3B'); document.getElementById('theTable').getElementsByTagName('td')[1].style.display='table-cell';	} else{ document.getElementById('theTable').parentNode.style.borderBottom='#525152 solid 1px'; document.getElementById('pendingArrow').setAttribute('src','data:image/gif,GIF89a%08%00%0D%00%80%01%00%00%00%00%FF%FF%FF!%F9%04%01%00%00%01%00%2C%00%00%00%00%08%00%0D%00%00%02%14%04%82az%9C%B6%92C%91%9EXa%7B%5B%FA%0F%86bP%00%00%3B'); document.getElementById('theTable').getElementsByTagName('td')[1].style.display='none'; }");
		//insert the arrow image
		document.getElementById('theTable').getElementsByTagName('td')[0].appendChild(theSwitchArrow);
		//hide the pending display to begin with
		document.getElementById('theTable').getElementsByTagName('td')[1].style.display="none";
		document.getElementById('theTable').parentNode.style.borderBottom="#525152 solid 1px";
	}
	
	
	setTimeout('window.stop()',7000); //gets rid of annoying continuous loading thing that really bugs me
})();
