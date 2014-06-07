// ==UserScript==
// @name            Favicon f�r reimlige battle arena
// @namespace       http://www.somegas.de
// @description     Das wei�t nur du O_o
// @include         *r-b-a.de*
// ==/UserScript==



(function() {
	var link = document.createElement('link');
	link.setAttribute('rel', 'shortcut icon');
	link.setAttribute('href', 
	'data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP////jz9P/9/v37/LOmsPv7/fn5+ghVlRpinTJvozRwoWmStI2jtqS90gxalBBbkxRfmRRelhdhmxljmhpimB5lnB5lmx5lmh9lmSFlmTZnjjpsk26Xt3advLPL3g9bkBNflhljmCFnl1mOsnioyoGnwkCCrUN+pLfP3rbM2t/n7J67zLDDzdjl6/v+//D09fn//+vx8fv///z///3///n7+/7///z9/fj//vn9+/r/+v7//vz9/Pv8+/3//P3+/Pr7+f///f///vby7//x7fGnof3Dvu97dPTBvvzc2vAdF/AlIMNIQ8ZOS+xybvWJhO4dGPEeHOsfHPIjIO8nJPMtKcQuLeZCQcU8OuRIRfNTUNZKScNPT+xsaf38/P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGAALAAAAAAQABAAAAeVgBeCghsNLQVcVIqLgxccKwEBNUlVi4qNDgFfPT4zXlOWjR9DOAQGM0hSoYMMQUM6L0RallSNCx4wQDkCWEyrgwgdATs0T1G/ghMjLj83RkvIFwkgJgE8SlbRFSIKMkI2W9EXGhAsATFQ4hcRKAc0R1eMjYIYISoBRVnyjRYZEiSRuuybd+FBigFNBg6iIOhECSeLAgEAOw==');
	link.setAttribute('height', '16px');
	link.setAttribute('width', '16px');
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
	
	// Original by nake
})();