// ==UserScript==
// @name Google+ AA Tweak[Use jQuery]
// @version 1.2.3
// @include https://plus.google.com/*
// @match https://plus.google.com/*
// ==/UserScript==

(function (d, func) {
    var h = d.getElementsByTagName('head')[0];
    var s1 = d.createElement("script");
    s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
    s1.addEventListener('load', function() {
        var s2 = d.createElement("script");
        s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
        h.appendChild(s2);
    }, false);
    h.appendChild(s1);
})(document, function($) {
	var target_post = '.vg';
	var target_com = '.zj';
	var flag = 'AAflg';

	var re = new Array();
	for(var i=0;i<=3;i++){
		re[i] = new RegExp();
	}
	re[0].compile(flag);
	re[1].compile('[|:;, 　]{2}[|!:;.,]');
	re[2].compile('([ 　"-*,./:-<@\]-`]{3,}["-*,./:-<@\]-`{-~／].*){2}');
	re[3].compile('([蠶笵醴蹟黼鬱黌麌鬣蠻鼎面髟米]{3,}|[>]{3,}.+[#]{3,})');
	
	$('<style>\
		.AA_post {\
			font-family: "MaruGoR-AA","IPAモナーPゴシック","ＭＳ Ｐゴシック",sans-serif;\
			font-size: 10px;\
			line-height: 1.2;\
			}\
		.AA_com {\
			font-family: "MaruGoR-AA","IPAモナーPゴシック","ＭＳ Ｐゴシック",sans-serif;\
			font-size: 8px;\
			line-height: 1.2;\
			}\
		</style>').appendTo('head');

	function AATweak(){
		for(var i=0; i<2; i++){
		switch (i){
			case 0:
					var elements= $(target_post);
					break;
				case 1:
					var elements = $(target_com);
					break;
			}
		for(var j=0; j<elements.length; j++){
			if( !(elements[j].getAttribute('class').match(re[0]))){
				var e = elements[j].innerText;
				for(var k=1; k<re.length; k++){
					if(e.match(re[k])){
						if(i == 0){
							$(elements[j]).addClass('AA_post');
							break;
						}else{
							$(elements[j]).wrapInner("<div></div>");
							$(elements[j]).find('div').addClass('AA_com');
							break;
						}
					}
				}
				$(elements[j]).addClass(flag);
			}
		}
	}
}

	setInterval(function(){AATweak();}, '1000');
});