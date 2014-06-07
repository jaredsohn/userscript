// ==UserScript==
// @name           bazaarofmagic.nl
// @namespace      bazaarofmagic
// @include        http://www.bazaarofmagic.nl/*
// ==/UserScript==
var $=$;
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery;//.noConflict(true);
        letsJQuery();
    }
}
function letsJQuery() {
    var setimage=function(p,img){
	if(!!img && img.length>1){
            var colors=getcolor(img);
            p.css({
                border: '1px solid ' + colors[1], 
		background: colors[0] + ' url("' + img + '") no-repeat center center'
		}).html('');
	}else{p.hide();}
    }
    var getcolor=function(img){
        var colors=['#000','#000'];
	var series=['u','r','4e','5e','6e','7e','8e','9e','ch','st','p3','bd','dm']
	for(var i=0;i<series.length;i++){
	    if(img.indexOf('/cards/' + series[i] + '/')>0){ colors = ['#fff','#888']; i=100 }
        }
	return colors;
    }
    $('td.productListing-data a[href$=".html"]').hover(function(){
	var t=$(this);
	var d=this.href;
	var offset=t.offset();
	var top=offset.top - 80;
	var y1=window.pageYOffset;
	var y2=y1+window.innerHeight;
	if(top<y1){top=y1;}else if(top+310>y2){top=y2-310;}
	var p=$('#preview');
	if (p.length==0){ p=$('<div id="preview"></div>').appendTo('body').css({
	position:'absolute', width:222, height: 310,
	overflow: 'hidden', borderRadius: '12px'
    });}
    p.css({backgroundImage:'none', left:offset.left + 150, top:top}).show();
    var img = t.data('img'); 
    if(!img){
        p.load( d + ' img[src^="http://www.magicwarehouse.nl/cards/"], .product-image img', function(){
	    img = p.find('img').attr('src'); t.data('img', img ? img : 1);			
	    setimage(p,img);
        });}else{ setimage(p,img);	}
        return true;
    }, function(){$('#preview').hide();return true;});	
	$('.main2 b').append('<b> - </b>').append('<a target="_blank" href="http://www.nedermagic.nl/magic-cards.asp?ct=' + 
	escape($('a.headerNavigation:last').text().split(' ').join('+')) + '"> Bekijk op NederMagic</a>');	
}