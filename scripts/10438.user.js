// ==UserScript==
// @name           Search Box Shortcut Key
// @namespace      http://userscripts.org/scripts/show/10438
// @description    Jump to search box on most web pages by pressing Alt-S.  You can jump and select contents of the search box by pressing Shift-Alt-S.
// @include        *
// ==/UserScript==
// ** CODE BORROWED FROM GOOGLE SEARCH FOCUSER AND SEARCH FOCUS SCRIPTS **
(function(){

     document.addEventListener('keydown', function(e) {
         if (e.keyCode) code = e.keyCode;
         else if (e.which) code = e.which;
         if(e.altKey && code == 83) { //83 = s

	var input = document.getElementsByTagName('input');
	if (input.length)
	{
		var pattern=/query|search|q|keywords|^for/i
		for (var i = 0; i < input.length; ++i)
		{
			if(pattern.test(input[i].name) && input[i].type=="text")
			{
                                if(e.shiftKey){input[i].select()};
				input[i].focus();
                                i=input.length;
				e.stopPropagation();
                                e.preventDefault();
}}}}}, false);
})();
