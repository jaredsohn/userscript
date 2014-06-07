// ==UserScript== 
// @name          Virginia.edu, Search "UVa Web"
// @namespace     http://www.virginia.edu
// @description   Makes the default search option "UVa Web" instead of "People"
// @include       http://www.virginia.edu/
// ==/UserScript== 


(function() 
{
	//object constructor
	function bar()
	{
		//remove the 'checked' attribute from the people search radio
		var inpPeople = document.getElementById('people');
		inpPeople.removeAttribute('checked');
		
		//add the 'checked' attribute to the uva web search radio
		var inpUvaWeb = document.getElementById('uva_web');
		inpUvaWeb.setAttribute('checked','checked');
		
	};

	//instantiate and run 
	var foo = new bar();

})();