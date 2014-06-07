// <![CDATA[
// ==UserScript==
// @name          TinyStylereplacer
// @fullname      TinyStylereplacer with Prototype
// @author        Ardor
// @version       2010-12-10
// @namespace     *
// @description   replaces all occurences of a certain Style with a cutstom on e.g. background-color to red using prototype library
// @include       *
// ==/UserScript== 

var searchstyleHTML = "background-color";
var searchstyleJS = "backgroundColor";
var replace = "rgb(255,0,0)";

// no modification needed below this line 

// Anonymous function wrapper
(function() {
 
})(); // end anonymous function wrapper

//Injecting the Libraries 
var scripts = [
    'http://script.aculo.us/prototype.js',
    'http://script.aculo.us/effects.js',
    'http://script.aculo.us/controls.js'
];

for (i in scripts) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}

window.addEventListener('load', function(event) {

	$$ = unsafeWindow['window'].$$;

	// as we need 'bind' function for 'each' function to work
	// and $$ has it we extend d with $$
	// otherwise we get bind not defined error
	Object = unsafeWindow['window'].Object;
	Object.extend(d,$$);
	
	$$('[style*='+searchstyleHTML+']').each(d);

}, 'false');

function d(e)
{
	e.style[searchstyleJS] = replace;
}
