// ==UserScript==
// @name           no new tab
// @namespace      111
// @include        *
// ==/UserScript==
function each(list, callback) {
	Array.prototype.forEach.call(list, callback);
};

var aelements = document.querySelectorAll('a');
	if (! aelements.length)
		return;
	each(aelements, function(e){
		if(e.target=='_blank'){
			e.setAttribute('target','');
		}
	});
