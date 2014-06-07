// ==UserScript==
// @name        reddit blacklist voter 
// @namespace   blah
// @require
// @include     /^http://www\.reddit\.com/r/.*/comments/.*$/
// @include     /^https://pay\.reddit\.com/r/.*/comments/.*$/
// @version     1.0
// ==/UserScript==
/*
about:config settings:
extensions.greasemonkey.scriptvals.blah/reddit blacklist voter.blacklist = testuser1,testuser2,testuser3
*/
var blacklist=GM_getValue("blacklist");
if(blacklist==null || blacklist.length<1)
{
	blacklist="testuser1,testuser2";
	GM_setValue("blacklist",blacklist);
}
	
var n = document.createElement('input');
n.value=blacklist
n.type="hidden";
n.id="blacklist";
document.body.appendChild(n); 

	
location.href = "javascript:(" + function() 
{

	$(document).ready(function() 
	{
		window.blacklistusers=document.getElementById('blacklist').value.split(",");
		
		window.potential_nodes=new Array();		
		
		
		var n=document.getElementsByTagName("div");
		var k=0;
		for (var i = 0; i < n.length; i++) 
		{
			if(n[i].className=='arrow down login-required')
				window.potential_nodes[k++]=n[i];
		}
		
		window.shitlist=new Array();
		
		for (var i = 0; i < window.potential_nodes.length; i++) 
		{	
			var n=window.potential_nodes[i];
			
			var usernode=null;
			try{
			var usernode=n.parentNode.parentNode.childNodes[2].childNodes[1].childNodes[0].childNodes[1];			
			}catch(e)
			{
			}
			
			if(usernode!=null)			
			{
				var user=usernode.innerHTML;
				
				
				for(var f=0;f<window.blacklistusers.length;f++)
				{
					if(user==window.blacklistusers[f])					
					{
						window.shitlist.push(n);		
						break;
					}					
				}
			}
			
		} 
		

		var tmp, current, top = window.shitlist.length;

		/*shuffle shitlist*/
		if(top) 
			while(--top) 
			{
				current = Math.floor(Math.random() * (top + 1));
				tmp = window.shitlist[current];
				window.shitlist[current] = window.shitlist[top];
				window.shitlist[top] = tmp;
			}  
			
			
		
		window.shitproc=function(){
			if(window.shitlist.length==0)
				return;
			
			var n=window.shitlist.pop();	

			n.style.backgroundColor="gray";

			var evt = jQuery.Event("click");
			evt.target=n;			
			jQuery(n).trigger(evt);
	
			
			setTimeout(window.shitproc,2000); 
		};
		
		
		setTimeout("window.shitproc();",2000);
		
		
		
	});
		
		
} + ")();";	

