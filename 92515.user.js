// ==UserScript==
// @name           Invite all friends button for facebook(BEST)
// @namespace      Tony White
// @description    Adds a button to select all friends in the "invite friends box".
// @include        http://*facebook.*
//
// @version        1.0
//
// ==/UserScript==

(function(){
	// The code for creating and adding the button.
	function addbutton(){
		var slist=document.getElementById('_view_all')?document.getElementById('_view_all').parentNode:undefined;
			if(slist!==undefined && !document.getElementById('_select_all')){
				// This creates the button.
				var anchor=document.createElement('li');
				anchor.className='PillFilter_filter';
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
			}
	}
	
	window.addEventListener("load",function(){addbutton();},false);
	
	
	// --------------------- Check for updates ---------------------
	// Thanks a ton to Phasma: "http://userscripts.org/users/106144".
	if(typeof ScriptUpdater!=='undefined'){
		ScriptUpdater.check(89653,'1.02');
		if(GM_registerMenuCommand){
			GM_registerMenuCommand('Check for updates for "Facebook invite all friends button"',function(){
				ScriptUpdater.forceNotice(89653,'1.02');
			});
		}
	}
}());