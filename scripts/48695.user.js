// Created by Graziano
// ngx_graz@hotmail.com
//
// Version 1.4
//
//**************************************************************//
// ==UserScript==
// @name           Super Nexopia Ignore
// @description    Ignore posts by specific users, with the option to show the post
// @include        http://www.nexopia.com/forumviewthread.*
// ==/UserScript==
//**************************************************************//

// For chrome to have persistent settings
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

function addIgnoreLinks()
{
	x=document.getElementsByClassName('forum_post_footer_container');

	for(i=0;i<x.length;i++)
	{
		// Find the username
		var user = x[i].previousSibling.previousSibling.childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[3].childNodes[0].innerHTML.replace(/<a.+">/,"").replace(/<\/a>/,"").replace(/<b>/,"").replace(/<\/b>/,"");

		// Find forum option links
		var muteBar = x[i].childNodes[1].childNodes[1].childNodes[0].childNodes[x[i].childNodes[1].childNodes[1].childNodes[0].childNodes.length-2];
		
		a1 = document.createElement('a');
		a1.setAttribute('class','small');
		a1.setAttribute('href','javascript:void(0)');
		a1.innerHTML = "Ignore";
		a1.addEventListener("click", ignore(user), true);
		a2 = document.createTextNode('\u00A0 \u00A0');
		muteBar.insertBefore(a1,muteBar.childNodes[muteBar.childNodes.length-1]);
		muteBar.insertBefore(a2,a1);
	}
}

addIgnoreLinks();

var ign;

function updateIgnoreList()
{
	ign = GM_getValue("ignoredUsers", "").split(',');
	if (ign[0] == "")
		ign = Array();  //splitting an empty string doesnt return an empty array
}

updateIgnoreList();

function ignorePosts() 
{
	var c=0;
	var ignorebar;
	x=document.getElementsByClassName('forum_post_body_container');

	for(i=0;i<x.length;i++)
	{
		var user = x[i].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[3].childNodes[0].innerHTML.replace(/<a.+">/,"").replace(/<\/a>/,"").replace(/<b>/,"").replace(/<\/b>/,"");
		
		for(j=0;j<ign.length;j++)
		{

			if (user == ign[j] && x[i].style.display != 'none')
			{
				//alert('Found post to ignore from user '+ign[j]);
				
				// Setup the toggle link
				ignorebar=document.createElement('div');
				ignorebar.setAttribute('style', 'margin-bottom:6px;');
				//ignorebar.setAttribute('style','background-color:#868686;color:#000000;margin-bottom:6px;padding:2px;');
				ignorebar.setAttribute('class', 'small');
				ignoretable=document.createElement('table');
				ignoretable.setAttribute('width', '100%');
				ignoretable.setAttribute('cellspacing', '0');
				ignoretable.setAttribute('cellpadding', '3');
				ignoretbody=document.createElement('tbody');
				ignorerow=document.createElement('tr');
				ignorecell1=document.createElement('td');
				ignorecell1.setAttribute('class', 'small');
				ignorecell2=document.createElement('td');
				ignorecell2.setAttribute('class', 'small');
				ignorecell2.setAttribute('align', 'right');
				
				x[i].style.display='none'; // Hide the post
				x[i].nextSibling.nextSibling.style.display='none'; // Hide the footer
				x[i].setAttribute('id','ignp'+c);
				
				ignorebar.setAttribute('id','ign'+c);

				// Form the ignore string/links
				a1=document.createTextNode("Ignored Post by: "+ign[j]+" ");
				a2=document.createElement('a');
				a2.setAttribute('href', "javascript:togglePost('ignp"+c+"')");
				a2.setAttribute('class', "small");
				a2.innerHTML = "Show/Hide";
				a3 = document.createTextNode('\u00A0 \u00A0');
				a4=document.createElement('a');
				a4.setAttribute('href', 'javascript:void(0)');
				a4.setAttribute('class', "small");
				a4.innerHTML = "Unignore";
				a4.addEventListener("click", unignore(ign[j]), true);
				//a4=document.createElement('br');
				ignorebar.insertBefore(ignoretable,null);
				ignoretable.insertBefore(ignoretbody,null);
				ignoretbody.insertBefore(ignorerow,null);
				ignorerow.insertBefore(ignorecell2, null)
				ignorerow.insertBefore(ignorecell1, ignorecell2);
				ignorecell1.insertBefore(a1, null);
				ignorecell2.insertBefore(a4, null);
				ignorecell2.insertBefore(a3, a4);
				ignorecell2.insertBefore(a2, a3);
				//ignorebar.insertBefore(a4,null);
				//ignorebar.insertBefore(a3,a4);
				//ignorebar.insertBefore(a2,a3);
				//ignorebar.insertBefore(a1,a2);
				//>>> ignorebar.innerHTML="<b>Ignored Post by:"+ign[j]+"</b> <a href=\"javascript:showDiv('ignp'+c)\">Show</a> <a href=\"javascript:hideDiv('ignp'+c)\">Hide</a><br>";
				// Insert it just above the post
				x[i].parentNode.insertBefore(ignorebar,x[i]);

				c++;i++;break;
			}
		}
	}

}
 
 ignorePosts();
 
function ignore(un)
{
	return function() { 
		if (confirm("Do you really want to ignore "+un+"?"))
		{
			// Sloppy :s
			for (var i = 0; i < ign.length; i++)
			{
				if (ign[i] == un) 	// User is already ignored
					return;			// Do nothing
			}
			ign.push(un);
			GM_setValue("ignoredUsers", ign.join(','));
			updateIgnoreList();
			ignorePosts();
		}
	};	
}

function unignore(un)
{
	return function() { 
		if (confirm("Do you really want to unignore "+un+"?"))
		{
			// Sloppy but oh well
			var new_ign = new Array();
			// Remove user from ign list
			for (var i = 0; i < ign.length; i++)
			{
				if (ign[i] != un)
					new_ign.push(ign[i]);
			}
			ign = new_ign; // Replace old ignore list
			GM_setValue("ignoredUsers", ign.join(','));
			// Refresh frame
			location.reload(true);
		}
	};	
}
 
   //alert('Adding show/hidescripts');

bb=document.createElement('script');
h=document.getElementsByTagName('head')[0];
bb.setAttribute('type','text/javascript');
bb.innerHTML=
"function togglePost(id){"+
  "if (document.getElementById(id).style.display == 'none'){"+
    "document.getElementById(id).style.display = '';"+
    "document.getElementById(id).nextSibling.nextSibling.style.display = '';"+
  "}else{"+
    "document.getElementById(id).style.display = 'none';"+
    "document.getElementById(id).nextSibling.nextSibling.style.display = 'none';"+
  "}"+
"}";

h.appendChild(bb);