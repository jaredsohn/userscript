// ==UserScript==
// @name           category hide
// @namespace      127.0.0.1
// @include        http://boards.adultswim.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

var hide =  $('.lia-browser-category-heading').append('<font style="cursor:pointer">*</font>');

$(hide).toggle(function(){
$(this).next().hide(400);
var hidden = eval(GM_getValue("hidden", "[]"));
hidden.push($(this).find('a').html());
GM_setValue("hidden", uneval(hidden));
}, function(){
	$(this).next().show(400);
	var unhide = eval(GM_getValue("hidden", "[]"));
	var iPos=-1
	for (i=0;i<unhide.length;i++) {
	if(unhide[i]==$(this).find('a').html()) {
	iPos = i;
	break;}
	}
	unhide.splice(iPos, 1)
	GM_setValue("hidden", uneval(unhide));
	});

var hidden = eval(GM_getValue("hidden", "[]"));
$('.lia-browser-category-heading').each(function(){
	for(i=0;i<hidden.length;i++){
		if($(this).find('a').html()==hidden[i]){
			$(this).next().hide();
	
	}
}
});
