// ==UserScript==
// @name          Freemail.hu -  BoldFolders v0.8
// @description	  A lightweight enhance of freemail.hu: currently viewed folder is colored and the folders are bold if they have new messages.
// @include       http://freemail.hu/*
// @include       https://freemail.hu/*
// ==/UserScript==
//
addJS(checkFolders);
setTimeout ( 'checkFolders()', 5000 );



function addJS(js){
	var c=document.createElement('script');
	c.setAttribute('type', 'text/javascript');
	c.innerHTML=js;
	document.getElementsByTagName('head')[0].appendChild(c);
}


function checkFolders (){
   if (window.location.pathname == '/levelezes/main.fm')
	{
		var myTime = setTimeout("checkFolders()",5000);
		if ((window.location.pathname =='/levelezes/main.fm') && (typeof(current_folders_array[2]) != 'undefined'))
		{
			for (var i=0;i<current_folders_array.length;i++)
			{
				var thing = window.frames[0].document.getElementById("menuAID"+current_folders_array[i].name);
				if (current_folder == current_folders_array[i].name)
				{
					thing.parentNode.parentNode.style.background='lightblue';
				} else 
				{
					thing.parentNode.parentNode.style.background='';
				}
				if ((current_folders_array[i].mnew > 0) && (thing != null)) 
				{
					thing.innerHTML='<strong>'+thing.innerHTML+'</strong>';
				}
			}	
		}	
	}
}
