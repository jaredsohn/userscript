// ==UserScript==
// @name           delete all reddit comments
// @namespace      http://blah
// @include        http://www.reddit.com/user/*
// ==/UserScript==

location.href = "javascript:(" + function() 
{



		var deleted = 0;
		var links = document.getElementsByTagName("a");
		var i = 0;
		var d = 0;
	
		for (i = 0; i < links.length; i++) 
		{
			
			var l = links[i];
			if (l.href) 
			{
				if (l.innerHTML == "delete") 
				{
					toggle(l);   
					d = 1;  
				}  
				if (d && (l.innerHTML == "yes")) 
				{ 
					deleted++;
					
					
					l.id='xxx'+i;

					var butter="document.getElementById('xxx"+i+"')";
					
					var f=function(a)
					{
						hide_thing(a);						
					};
					
					setTimeout("change_state( "+butter+", 'del', hide_thing)", 1000*deleted); 		
					
					d=0;
				} 
			} 
			
		} 
		
		if(deleted>0)
		{
			setTimeout("location.reload(true);",1000*(deleted+1));
		}
		
} + ")()";	

		
