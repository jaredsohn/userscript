// ==UserScript==
// @name           	eRepublik monetary script 
// @namespace       www.erepublik.com
// @author         	Ignotusp 
// @description    	eRepublik monetary script 
// @version         0.0.1.5
// @include         http://www*.erepublik.com/en/exchange
// @include         http://www*.erepublik.com/en/exchange#*
// @require			http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==
(function(undefined)
{

GM_addStyle("a.changemm {background:url(\"/images/parts/icon_show-off.gif\") no-repeat scroll 4px 50% transparent; color:#3C8FA7;display:block; font-size:13px; padding:8px 0; text-align:center; text-indent:25px; width:125px;}");
GM_addStyle(".leftfilters { margin-right:20px;}");
(function($) {
	$.fn.ellipsis = function(enableUpdating){
		var s = document.documentElement.style;
		if (!('textOverflow' in s || 'OTextOverflow' in s)) {
			return this.each(function(){
				var el = $(this);
				if(el.css("overflow") == "hidden"){
					var originalText = el.html();
					var w = el.width();
					
					var t = $(this.cloneNode(true)).hide().css({
                        'position': 'absolute',
                        'width': 'auto',
                        'overflow': 'visible',
                        'max-width': 'inherit'
                    });
					el.after(t);
					
					var text = originalText;
					while(text.length > 0 && t.width() > el.width()){
						text = text.substr(0, text.length - 1);
						t.html(text + "...");
					}
					el.html(t.html());
					
					t.remove();
					
					if(enableUpdating == true){
						var oldW = el.width();
						setInterval(function(){
							if(el.width() != oldW){
								oldW = el.width();
								el.html(originalText);
								el.ellipsis();
							}
						}, 200);
					}
				}
			});
		} else return this;
	};
})(jQuery);


function main()
{

	var url = window.location.href; 
	if ((url.indexOf('exchange#') + 1) || (url == 'http://www.erepublik.com/en/exchange'))
	{
		var urll = $("div.leftfilters a.postoff").attr('href');
		var regexp = /(\d+)/g;

		var message = 'http://www.erepublik.com/en/exchange/create?account_type=citizen#buy_currencies=' + urll.match(regexp)[1] + ';sell_currencies=' + urll.match(regexp)[0] + ';page=1';
		$("div.leftfilters a.postoff").attr('href', message);
		$('div.leftfilters:first div.core').append("<br /><a href=\"http://www.erepublik.com/en/exchange#buy_currencies=" + urll.match(regexp)[1] + ";sell_currencies=" + urll.match(regexp)[0] + ";page=1\" class=\"changemm\"\"><img src=\"http://barter77.ru/IMAG/mehyau.jpg\" /></a>");

	}

}

window.addEventListener('load', function() {
	var checker = setInterval(function() {
		if(typeof ($ = jQuery.noConflict()) != 'undefined') 
		{
			clearInterval(checker);
		
			window.setTimeout(main, 50);
		}
	}
,50);}, false);

})();