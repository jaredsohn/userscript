// For a shortcut, just enter this URL:  http://www.orkut.com/CommTopics.aspx?cmm=xxxx
// Replace xxxx with your community ID.
//
// 
//
// ==UserScript==
// @name          Multiple Topic Selective deletion script V1.0
// @namespace     sumit aka duke
// @description   Adds checkboxes for multiple topic selection and a button for deleting the selected topics.
// @include       http://*orkut.com/CommTopics.aspx*
// ==/UserScript==

window.addEventListener("load", function(e) 
{
	//Find if manage link is available(to know if user has moderator rights to this community).
	for(var i=0;i<document.links.length;i++)
	{
		var linkIsProfile=/Profile/.test(document.links[i]);
		if(linkIsProfile)
		{
			var moderatorRightsAvailable=/manage/.test(document.links[i+1].innerHTML);
			if(  !  moderatorRightsAvailable )
				return;
		}
	}


	//Add the checkboxes to select individual topics.
	for(i=2;i<document.forms.length;i++)
	{
		var mytd=document.createElement("td");
		mytd.innerHTML="<input type='checkbox';name='delete_select';>";
		document.forms[i].appendChild(mytd);
	}

	//Add a link to delete selected topics.
	var delButton=document.createElement('a');
	delButton.href="javascript:scriptObj=document.createElement('script');scriptObj.src = 'http://sumitkalra.110mb.com/DelSelected.js';document.getElementsByTagName('head')[0].appendChild(scriptObj);void(0);" ;
	delButton.innerHTML='Delete selected Topics'; 
	document.forms[1].appendChild(delButton);

},false);