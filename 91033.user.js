// ==UserScript==
// @name           FB come my friends button
// @namespace      Aspi
// @description    Need if you want make butn to select all friends in the "invite friends box".
// @include        http://*facebook.*
// ==/UserScript==

// The code for creating and adding the button.
function addbutton(){
	var slist=document.getElementById('_view_all')?document.getElementById('_view_all').parentNode:undefined;
		if(slist!==undefined){
			// This creates the button.
			var anchor=document.createElement('li');
			anchor.className='PillFilter_filter   ';
			anchor.id='_select_all';
			
			var link=document.createElement('a');
			link.id='_select_all_anchor';
			link.setAttribute('onclick','txtc=this.firstChild.firstChild.firstChild.firstChild;if(txtc.textContent=="Select all"){txtc.textContent="Unselect all";}else{txtc.textContent="Select all";}var friends=document.getElementById("all_friends").getElementsByTagName("li");for(x=0;x<friends.length;x++){if(typeof friends[x]==="object"&&friends[x].className!="disabled"){fs.click(friends[x]);}}return false;');
			link.setAttribute('href','#');
			
			var tctl=document.createElement('div');
			tctl.className='tl';
			var tctr=document.createElement('div');
			tctr.className='tr';
			var tcbr=document.createElement('div');
			tcbr.className='br';
			var tcbl=document.createElement('div');
			tcbl.className='bl';
			
			var txt=document.createTextNode('Select all');
			
			tcbl.appendChild(txt);
			tcbr.appendChild(tcbl);
			tctr.appendChild(tcbr);
			tctl.appendChild(tctr);
			link.appendChild(tctl);
			anchor.appendChild(link);
			
			// This injects the button.
			slist.insertBefore(anchor,document.getElementById('_view_all'));
			
			// This clears the timer used by the second part of this script.
			if(window.timer){
				window.timer=window.clearInterval(window.timer);
			}
		}
}


// First part: This executes the code for when the invite friends box is in it's own tab.
addbutton();



// Second part: This executes the code for when the invite friends box is a popup in an already existing window.
var fslinks=[];

function search(){
	try{
		//Tries searching for the links to the invite friends box using XPath.
		var iterator=document.evaluate(
			"//a[@ajaxify]",
			document,
			null,
			XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
			null);
	
		var thisNode=iterator.iterateNext();
	
		while(thisNode){
			var x=0;
			if(thisNode.getAttribute('ajaxify').indexOf("invite_dialog.php")!=-1){
				fslinks[x]=thisNode;
				x++;
			}
			thisNode=iterator.iterateNext();
		}
	}
	catch(err){
		//Backupfunction for searching for the links to the invite friends box using plain JavaScript.
		GM_log("\nThere was an error using XPath.\nErrorcode:\n\n"+err);
		var links=document.getElementsByTagName('a');
		for(var i=0;i<links.length;i++){
			if(links[i].getAttribute("ajaxify")){
				if(links[i].getAttribute("ajaxify").indexOf("invite_dialog.php")!=-1){
					fslinks[i]=links[i];
				}
			}
		}
	}
}


function addtrigger(){
	if(fslinks.length!=0){
		for(var x=0;x<fslinks.length;x++){
			fslinks[x].addEventListener("click",new Function("window.timer=window.setInterval("+addbutton+",500);"),true);
		}
	}
}


window.addEventListener("load",function(){search();addtrigger();},false);


// Check for updates
// Coded by Jarett - http://userscripts.org/users/38602
var SUC_script_num = 89653;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}