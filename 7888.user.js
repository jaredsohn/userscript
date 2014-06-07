// ==UserScript==
// @name           Shelfari - Big Bookmenu
// @namespace      http://mathiasbaert.be/userscripts/shelfari.com/bigbookmenu
// @description    Puts all options of the bookmenu in 1 list and adds icons in front of them
// @include        http://www.shelfari.com/*
// ==/UserScript==

// startpoint of this script
makePlace();
prepareMenu();


// functions
//--> setup
function makePlace(){
	if ( window.location.href.match(/^http:\/\/www.shelfari.com\/books\/opinions\/.*$/) ) {
		addGlobalStyle(
			'div.leftNavMenuPositionBookDetails{top:468px !important;}'+
			'#selectedElement{top:452px !important;}'
		);
	} else if ( window.location.href.match(/^http:\/\/www.shelfari.com\/books\/answers\/.*$/) ) {
		addGlobalStyle(
			'div.leftNavMenuPositionBookDetails{top:468px !important;}'+
			'#selectedElement{top:490px !important;}'
		);
	} else if ( window.location.href.match(/^http:\/\/www.shelfari.com\/books\/details\/.*$/) ) {
		addGlobalStyle(
			'div.leftNavMenuPositionBookDetails{top:468px !important;}'+
			'#selectedElement{top:528px !important;}'
		);
	} else if ( window.location.href.match(/^http:\/\/www.shelfari.com\/bookrecommendation.*$/) ) {
		addGlobalStyle(
			'div.leftNavMenuPositionBookDetails{top:468px !important;}'
		);
	}
}
function prepareMenu(){
	var toShow = [
		'addToMultiple',
		'tagBookModal',
		'askQuestion',
		'addOpinion',
		'recommendBook',
		'viewAnswers',
		'viewOpinions',
		'bookDetails',
		'purchaseBook',
		'removeFromShelf'
	];
	var toHide = [
		'bookOptionsPrimary',
		'bookOptionsSecondary',
		'recommendBookModal'
	];
	addGlobalStyle(
		makeSpecific(toHide).join(',')+'{display:none !important;}'+
		makeSpecific(toShow).join(',')+'{display:block !important;background:transparent url(/images/popup-middle.png) no-repeat scroll 0%;cursor:pointer;height:27px;line-height:27px;position:relative;width:157px;text-align:left}'+
		makeSpecific(toShow).join(':hover,')+':hover{background-image:url(/images/popup-middle-active.png)}'+
		makeSpecific(toShow).join(':before,')+':before{vertical-align:middle;padding:2px 2px 2px 3px}'+
		makeSpecific(toShow[0]).join(',')+'{background-image:url(/images/popup-top.png)}'+
		makeSpecific(toShow[0]).join(':hover,')+':hover{background-image:url(/images/popup-top-active.png)}'+
		makeSpecific(toShow[toShow.length-1]).join(',')+'{background-image:url(/images/popup-bottom.png)}'+
		makeSpecific(toShow[toShow.length-1]).join(':hover,')+':hover{background-image:url(/images/popup-bottom-active.png)}'+
		makeSpecific('addToMultiple').join(':before,')+':before{'+getDataUrlBookEdit()+';}'+
		makeSpecific('tagBookModal').join(':before,')+':before{content:'+getDataUrlTag()+';}'+
		makeSpecific('askQuestion').join(':before,')+':before{content:'+getDataUrlComment()+';}'+
		makeSpecific('addOpinion').join(':before,')+':before{content:'+getDataUrlComment()+';}'+
		makeSpecific('recommendBook').join(':before,')+':before{content:'+getDataUrlThumbsUp()+';}'+
		makeSpecific('viewAnswers').join(':before,')+':before{content:'+getDataUrlComments()+';}'+
		makeSpecific('viewOpinions').join(':before,')+':before{content:'+getDataUrlComments()+';}'+
		makeSpecific('bookDetails').join(':before,')+':before{content:'+getDataUrlBookOpen()+';}'+
		makeSpecific('purchaseBook').join(':before,')+':before{content:'+getDataUrlBuy()+';}'+
		makeSpecific('removeFromShelf').join(':before,')+':before{content:'+getDataUrlBookRemove()+';}'
	);
}
	/**
	 * @mixed  1 array of strings or 1 or more strings
	 * @return array
	 */
function makeSpecific(){
	var i, j, specific = [];
	var names = ['TheShelf', 'LeftNav', 'BookList1'];
	var args = ( typeof(arguments[0])=='object' ? arguments[0] : arguments);
	for ( i=0; i<args.length; i++ ) {
		for ( j=0; j<names.length; j++) {
			specific.push('#ctl00_ContentPlaceHolder1_'+names[j]+'_bookDetailsMenu_'+args[i]);
		}
	}
	return specific;
}
	/**
	 * @return string
	 */
function getDataUrlBookRemove(){
	return 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJhSURBVDjLdZPda85hGMc/v+f5Pc8e2wE2QtiMyZh5K4RSpCkHxJnkSElOxJFy4kDyF3DopR15yUst2pRpJw4cSJLETCTb0mxre57f775eHPyevdBcdXfV3X19ru/36rojd+fwuZtt7n7PYQRnt+O4A+5kyaePaSAko19e3rm0GiAme3DaobV9Q2M0NDyK+1QRZDDDDX6PTlBOHPO4mWpkANjbvmFltG/TShqXteMZAXPLulrWffGCWmpLMXuOnOEvAO4L29uaePr6EyMjk7gZADalwh035/fYJJUkZXZULRDFxZi1G5toWVKPKrgbZo6qo2aIOeVK4O793rkAjqrxdWiMYq5ApVIhJCli2b2QJy4UWVRXg7nPAQBMDdFAkiQc3dGSyc/U4e7cevGBUCrwT/2MgqCGBkE0R2fve5IgiDoqhhBRKBZJJRvqnAARIw2B1MBzNUSFAuQciwwzI9WIVP8LgCCKVIQkKKJGUKvmDL5+4BFrPj5g29AAv4olujviix3dcm1GgRohCSRBMzvqpFVIa/9jdiV9tJ48Q01zG+W33bzv67nSc6AwkZttIaQZIBWjHJQ0KIkYy991sm7fMUqfe4luH6e2/yGrmhryHvn5eGphUlEkEZJgBDNUnGBKCM788UFKS5vh0IUZ75eXkbdo1fQMVB1NNbNghogh4og4Y7UNTL7pou7JWZLyTyaB8bE8mufH9AzI5di+cxMeRag6oo5V8+iWE7x71UVj/TzifIHxYWFgMFLHr08Bep51vTqV/bxZ+4+Dw3NfwX7byuZvPTSkYPncd8dvHOyWq38AFgvYQWlFsCQAAAAASUVORK5CYII=)';
}
	/**
	 * @return string
	 */
function getDataUrlBuy(){
	return 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ0SURBVDjLlZPdT9JRGMe5qFu2Lrt1a63LWv9ATRdN5xvLsnLRipzZpIVpigjyIs3XAOUHgopoWkggP5QXSRJwJQmtm/IlAWtt3XXTfubS+nZ+P1eby6ldPGdn5+zzfb7Pc57DA8DbL9rjrYxuVsXf7W5fuC2mYawpE7QRJZpDDfz/EngYVTN9qR4EPvlgXjCiKVCPWvou/0ACxDJjSbIwDefqMPxrEzC87IDUW4Pq8Vv8PQVaX7Qw5qQRgY9ePP0wDMeSFfWTUkxmPeiI61DlFOP6SAV/VwFtRMFQCwb4CdwW10IbVcK+aMHgohmPlwdBZ11oCctx1X5p/R8B9Uzzuum1ntj1Iv1tGRtb3zH2dgSa2eZtOOOCMizD5cGyzR0lGBNdx1TP5T96E4+4WttiWg6mYr3Ifk1DF1PBmxmHYlrGZkbFUDku2oSHOAFjolOuIpZ65rs5+MmKg9hWcJlZWB1UbsOhRjYz5r/MoSn4AKWWQg0nwFoyzndhijRobGWIq3XgPQU1sa2LqjCRHoc81IBK9w0OnvscRWQtBGFfEc4b8o7wNDMKOwnY3lDwZZ+h1idB/zsThpf6CezkstVN3yNwHFMrNGqCVRvlA2UQ6POkud1nTvE0EcVR1gU7JNSCnrPrWLRtw+RM7BKBXnJDP9eOYqogVNAj0Av0uTk7mtjov2+1p2yQ0hIYXnXCs+qEzF+HC9YSyIiIsK84XWTKP5tvPHdi11GupSXHW8JNW+FMAHdclSCCKDEX/iKdDgotRY17jTu31LhvHybT5RGPin5K3NWs1c0yW+lp0umc/T7b383NUdHJa44rSfJU+Qf54n/iNzi8zBtL0z1zAAAAAElFTkSuQmCC)';
}
	/**
	 * @return string
	 */
function getDataUrlBookOpen(){
	return 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIASURBVDjLpVPPaxNREJ6Vt01caH4oWk1T0ZKlGIo9RG+BUsEK4kEP/Q8qPXnpqRdPBf8A8Wahhx7FQ0GF9FJ6UksqwfTSBDGyB5HkkphC9tfb7jfbtyQQTx142byZ75v5ZnZWC4KALmICPy+2DkvKIX2f/POz83LxCL7nrz+WPNcll49DrhM9v7xdO9JW330DuXrrqkFSgig5iR2Cfv3t3gNxOnv5BwU+eZ5HuON5/PMPJZKJ+yKQfpW0S7TxdC6WJaWkyvff1LDaFRAeLZj05MHsiPTS6hua0PUqtwC5sHq9zv9RYWl+nu5cETcnJ1M0M5WlWq3GsX6/T+VymRzHDluZiGYAAsw0TQahV8uyyGq1qFgskm0bHIO/1+sx1rFtchJhArwEyIQ1Gg2WD2A6nWawHQJVDIWgIJfLhQowTIeE9D0mKAU8qPC0220afsWFQoH93W6X7yCDJ+DEBeBmsxnPIJVKxWQVUwry+XyUwBlKMKwA8jqdDhOVCqVAzQDVvXAXhOdGBFgymYwrGoZBmUyGjxCCdF0fSahaFdgoTHRxfTveMCXvWfkuE3Y+f40qhgT/nMitupzApdvT18bu+YeDQwY9Xl4aG9/d/URiMBhQq/dvZMeVghtT17lSZW9/rAKsvPa/r9Fc2dw+Pe0/xI6kM9mT5vtXy+Nw2kU/5zOGRpvuMIu0YAAAAABJRU5ErkJggg==)';
}
	/**
	 * @return string
	 */
function getDataUrlComments(){
	return 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG/SURBVDjLjZK9T8JQFMVZTUyc3IyJg4mDi87+GyYu6qB/gcZdFxkkJM66qJMGSNRBxDzigJMRQ1jQ4EcQ+SgVKB+FtuL13EdJxNDq8Ev7Xu85797T51nwhqeAH5w6cAxWwDgReX7jwYfdaCIraroptB7NLlVQrOoiGEsL1G06GZyxuILicsMUH3VTlOqGKNUMUdTacj+j1Nng0NGAT2WxYosK1bbIVVoiW27J9V8G57WWKVSczMV5iK+Tudv1vVh5yXdlLQN+os4AFZss2Ob82CCgQmhYHSnmkzf2b6rIhTAaaT2aXZALIRdCLgRtkA1WfYG4iKcVYX52JIs7EYvFmJ8wGiEXQi6EXAhdyn2MxQaPcg68zIETTvzyLsPzWnwqixVbhFwI3RFykes+A9vkIBKX4jCoIxdCLrI4/0OcUXXK4/1dbbDBS088xGGCCzAJCsiF2lanT8xdKNhHXvRarLFBqmcwCrbAhL32+kP3lHguETKRsNlbqUFPeY2OoikW62DNM+jf2ibzQNN0g5ALC75AGiT59oIReQ+cDGyTB+TC4jaYGXiRXMTD3AFogVmnOjeDMRAC025duo7wH74BwZ8JlHrTPLcAAAAASUVORK5CYII=)';
}
	/**
	 * @return string
	 */
function getDataUrlThumbsUp(){
	return 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVDjLlZNBaxNREMcTtTkonvwAHkQP4kHBj2LBngPiqRUPgpdiDYKlLYVKBRUU2psXQwNBCrVtaowbEjasocuGDRt2l112fUs2pFLroT8Pb22MNdAe5vDezP83M2/mpYDUkalxBjV6gG6B5i0P+UbY8IXmXaJpW8Q90M2fqM7M6QCquIAWvMX3Ie6BZvapuhMnB0AKJbrNbusXURdCAYqpsunfOAkgDZyjs3+RmjOD68gqbBvK1ms2vPOjAWpwhbo/zTdPYdf5jmbtIXrQjaUZFpT1A7b0CT546eOAuvMJz4E4hv4e9PpSGMUQdUFEYDug6pA3pijo18k3rw4AmhkQ92Sw1YFaTfYvEnEoIAglpNGAYl2jUFUGgM3GZ/JrUCqB0QLXk7AwgiAR+wF4vvSZbXi3ygCwYY5Tb8jSo64M6MYS4IfgBeAmYtuVlSy9/AuwLjLsKAdslaBchlYr6V0kWX1wEnHHAcuGuSWGx1isrlOucDT/UMj+PR+cJGvHlm/UtuD5wj+A9941KgoUP0KlIkUiktn/iNsdaLWhqcPj+R/DgBX3DCuNOxQKYBhSHAgJMkz4osDs4iG5WcjmYu7mrOOr/MpIM1+/xdzaNm9WD3mxDNNP4OGjfe5PfeXeZI7s5E3Gn46RXRj7/1+QK30WyPBs8XJyHvmZfgPxTEl50XYktwAAAABJRU5ErkJggg==)';
}
	/**
	 * @return string
	 */
function getDataUrlComment(){
	return 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEvSURBVDjLY/j//z8DJZiBagZEtO8QAuKlQPwTiP/jwbuAWAWbARtXHrz1//efv//xgS0n74MMuQ3EbHADgBweIP7z99+//x++/fv/8tO//88+/vv/5P2//w/f/ft/782//7df/f1/5xXE8OoFx0GGmCEbIJcz9QBY8gVQ47MP//4/Bmp+8Pbf/7tQzddf/P1/9RnEgM5VZ0EGeGM14ClQ86N3UM2v//2/9RKi+QpQ88UnuA2AewHk/PtAW++8/vv/JlDzted//18Gar7wBGTAH7ABtYtOgAywxBqIIEOQAcg1Fx7/BRuMFoicuKLxDyzK5u64Cjfo/ecfYD5Q/DLWaMSGgQrvPH/3FabxOxDXEp0SgYp7Z267AtL4BYgLSUrKQA1KQHwPiFPolxcGzAAA94sPIr7iagsAAAAASUVORK5CYII=)';
}
	/**
	 * @return string
	 */
function getDataUrlTag(){
	return 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHcSURBVDjLhZPZihpBFIbrJeY2wbcQmjxdIGSSTC4zQxLyAK4o7igoKm7TPW49LoiYjqLG3DWpZmx7/tQpsR1xycW5qTr/9/+n+jTTdR3dbhftdhutVgvNZhOapkFVVTQajSsA7FKxTqcDx3GOajqdSki1Wr0IYeRMAsMwpPNkMnEhdCZSoFQqnYUwikzN5EYH9XpdNU0Ttm3LcwJWKhXk8/mTEEauu0YhfhKRDcuysDBt5H5tk4zHYxSLReRyuSMII+dd5M1mAxL//uvgw8Mz3t4DWWN7NxqNKAXS6fQBhIkZ+Wq1kk3r9Rpz4XytPeNLF/iqAx8f9pDhcEgpEI/HXQir1WpvxIx8uVzKps7Kls53AvCjB3x7PIQMBgNKgUgkIiGSUi6XFTEjXywWsunxj433qoM7fQ+51oDMzy2k1+tRCoRCoSt3lkKhoIgZ+Xw+P4J8F4DPTeDm3oK92aZIJpMIBAKvD15UzKdks1k+m81cyDsB+SRGuG2tYVpPL8Ued4SXlclklFQqxWkTCaILyG3bgWXvnf1+v8d9xFPLkUgklFgsxmkTd5+YxOL8QHwWQBWNRr3ipTktWL/fPym+CKAKh8PeYDDISezz+TwnV/l/v6tw9Qrxq3P3/wBazDrstPR7KQAAAABJRU5ErkJggg==)';
}
	/**
	 * @return string
	 */
function getDataUrlBookEdit(){
	return 'content:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK/SURBVDjLbZNNaFRXFMd/72U+dDLNRItGUSeJiagTJ6IQhdhaWoopFCJiF10UBAXpSlHcddHi0oUbkXYRFURE/NiIIjSkpCpdtGoTJG20iUMsMZJokhmqee/de8/p4jmDggcuFw73/s7/nPu/nqrSe/hch6peUZhD6VYUVUCVeNPaEmcwYbn06/nv1gIkiA8cVNhQLOS96ZkyqtVLEMMEFZgvv2IhVEQTrbyJGAA7i4U13qeda8ivLKIxAVGJq0pcfVljhsyiBDt2f8s7AFSXFDuauXVvjLm516gIAFJVoYqKMl95TRBGvB1vWsBLpBKs29RMe9NSnANVQURxTnEiWFEWAsPlq4PvAyjOCRPTFVJ+kiAIMGGElThvqSORTFFID3Oy+xfqdnUyfLZHvWByX3UGiBOsM4RhyJ5t7bH8WB2qyp27fWxLP2dx8RtyrVuYL61n9Oe+EzUFxgnOWKzzuTD4F6GxWKc4K7Sk/2DPpjINuR3Mjv9Nyov4oGEF2Q/zuRrAWiEyhkhA/TReMgm+sjr1gL0bZ2lc20M4dYlUxmNiaBQTRC+Dhf+6q0PEWIcNLKFxWCcYJ6zkPl93lMi19RJM/oSfsiSzzQSzI4j1P+862v/YrylwggkNoXEExrGkfJuv2sbJtfcSTP6InzRElRaeDtzj+4EGth7tHwLw327BRDGgsXKXL/LPWN7xJdHzPupSSlhpZur2fX4Y+Yyx+XTtGf2qYSLrsKGl/lk/vflphFVMPTyFEPBqdhWlwYdcW3SYF1H2vUaKDRM5CjpA4aMzPLp0jMd3fiOd30x5ZoqbyYNkMktRxhCRp+8oUFXwfbq2d/JofIZo5Aatmz+mvn49//75D0NNh8g2tWGtoAphENbs6Kkqn+w/3afKAUVZ8eQ4W1uX0bWhhYmonqulTuZMtvYzUa7/fvHI7irgf/y+taODWkwAAAAAAElFTkSuQmCC)';
}
//<-- setup

//--> DOMhelpers
/**
 * @param string
 * @credits http://diveintogreasemonkey.org/patterns/add-css.html
 */
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
//<-- DOMhelpers