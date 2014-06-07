// ==UserScript==
// @name        DW: Private By Default
// @namespace   http://xtina.dreamwidth.org
// @description Set the new entry page to private by default.
// @include     http://www.dreamwidth.org/entry/new
// @include     http://www.dreamwidth.org/update
// @version     1
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
		$("select#security").val('private');
});
