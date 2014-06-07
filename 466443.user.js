// ==UserScript==
// @name         quran links
// @namespace    me
// @description  Automatically adds links to a quran verse
// @version    1.1.5
// @match      http://islam.stackexchange.com/*
// @grant       none  
// ==/UserScript==
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
}

with_jquery(function($) {
$(document).ready(function(){   
var form = document.createElement("form");
form.id = "F";

var div = document.createElement("div");
div.id = "quran";

var input=document.createElement("input");
input.type="text";
input.id="b1";

var input2= document.createElement("input");
input2.type="submit";
input2.id="b2";
input2.value = "Add";


if ($(".wmd-input").length)
{
$(".wmd-input").before(form);
form.appendChild(div);
div.appendChild(input);
div.appendChild(input2);


$("#b2").css( 'display','none');
var wmd = $("#wmd-input");
var $b1 = $("#b1")
$b1.attr('placeholder', '23:52').css({ 'width': '92', 'height' : '16',});
$('#F').submit(function (e) {
 e.preventDefault();
  wmd.val( wmd.val() ?( wmd.val() + "[[" + $b1.val() + "]](http://tanzil.net/#" + $b1.val()+ ")"  ): ( "[["+ $b1.val() + "]](http://tanzil.net/#"+ $b1.val()+ ")" ));
  return false;
});

}
});
});
