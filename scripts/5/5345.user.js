// ==UserScript==
// @name            avoid registration on monster
// @namespace       
// @description     Monster.com forwards you to a registration page when clicking on jobsearch results, which is easily bypassed.
// @include         http://jobsearch.monster.com/*
// @exlude
// ==/UserScript==

(function() 
{
	
	//object constructor
	function targetChanger()
	{
		
		//bind a document click handler
		document.addEventListener('click', function(e)
		{
			//if the target node has an href
			var node = e.target;
			if(node.getAttribute('href') != null)
			{
			
				var targ = node.getAttribute('href');
				
				
				
				
				if(targ != null && targ.indexOf('GatedLiteRegistration')>-1)
				{
					var newhref = unescape(targ.substring(targ.indexOf('=')+1));
					
					node.href = newhref;
				}
			}
		
		}, false);
	};
	


	
	//instantiate and run 
	var changer = new targetChanger();

})();