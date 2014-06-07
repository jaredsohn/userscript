// ==UserScript==
// @id             tumblrEPB
// @name           Tumblr Easy Page Browsing
// @description    Adds buttons for newer and older page links even if the blog decides to exclude these buttons from template
// @include        http*://*.tumblr.com/*
// ==/UserScript==


/* avoid running on frames (exception for scm player) */

(function start_tumblrEPB(){
		try{
			if ((top == self) || (GM_getValue('id', id)== 'scmframe')) navTumblr();
		return;
		}catch(e){
			return;
		} 
})();


		
		
function navTumblr() {
		
		init_css();
		

		
		var older
			, newer
			, path = location.pathname
			, base = '/page/'
			, baseN = '/page/null'
			, noLinkpage = false
			, pagenone = linked(baseN)
			, page = path.match('^/page/(\\d+)');
		  
		if (page) page = Number(page[1]);
		else 
		if ('/' === path) page = 1;
		
		if (page) {
		
		var newid = page - 1;
		var oldid = page + 1;
		
		if ((older = linked(base + oldid))) older=older.href;
		if ((newer = linked(base + newid))) newer=newer.href;
		
		if (older == pagenone && newer == pagenone) noLinkpage=true;
		
		var uriNewer = '/page/'+ newid;
		var uriOlder = '/page/'+ oldid;
		
		var textNewer = 'Newer';
		var textOlder = 'Older';
		
		var newerElem = document.createElement('p');
		newerElem.classList.add('thoughtbot');
		newerElem.classList.add('btn-tumblr_no-newer');
		newerElem.innerHTML ='<a href="' + uriNewer + '">'+ textNewer +'</a>';
		
		var olderElem = document.createElement('p');
		olderElem.classList.add('thoughtbot');
		olderElem.classList.add('btn-tumblr_no-older');
		olderElem.innerHTML ='<a href="' + uriOlder + '">'+ textOlder +'</a>';
		
		if (noLinkpage) document.body.appendChild(olderElem);
		else 
		if (older != pagenone) document.body.appendChild(olderElem);
		if (page!= 1) document.body.appendChild(newerElem);
		}
}

function linked(url) {
  return document.querySelector('a[href="'+ url +'"]');
}

//add css for button
function init_css()
{
	GM_addStyle(
	
		'@import url(http://fonts.googleapis.com/css?family=Merienda:700);'+
		
		'*.btn-tumblr_no-older { '+
		'top:130px; !important;'+
		'left:50px;!important;'+
		'display: block !important;'+
		'position: fixed !important;'+
		'float: none !important;'+
		'}'+
		
		'*.btn-tumblr_no-newer { '+
		'top:130px !important;'+
		'left:145px !important;'+
		'display: block !important;'+
		'position: fixed !important;'+
		'float: none !important;'+
		'}'+
		
		'.thoughtbot a:link { color: #fff!important; text-decoration: none !important; background: none !important;}'+
		'.thoughtbot a:hover { color: #fff !important; text-decoration: none !important; background: none !important;}'+
		'.thoughtbot a:active { color: #fff !important; text-decoration: none !important; background: none !important;}'+
		'.thoughtbot a:visited { color: #fff !important; text-decoration: none !important; background: none !important;}'+
		
		'.thoughtbot {'+
		'background-color: #ee432e;'+
		'background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ee432e), color-stop(50%, #c63929), color-stop(50%, #b51700), color-stop(100%, #891100));'+
		'background-image: -webkit-linear-gradient(top, #ee432e 0%, #c63929 50%, #b51700 50%, #891100 100%);'+
		'background-image: -moz-linear-gradient(top, #ee432e 0%, #c63929 50%, #b51700 50%, #891100 100%);'+
		'background-image: -ms-linear-gradient(top, #ee432e 0%, #c63929 50%, #b51700 50%, #891100 100%);'+
		'background-image: -o-linear-gradient(top, #ee432e 0%, #c63929 50%, #b51700 50%, #891100 100%);'+
		'background-image: linear-gradient(top, #ee432e 0%, #c63929 50%, #b51700 50%, #891100 100%);'+
		'border: 1px solid #951100;'+
		'border-radius: 5px;'+
		'-webkit-box-shadow: inset 0px 0px 0px 1px rgba(255, 115, 100, 0.4), 0 1px 3px #333333;'+
		'box-shadow: inset 0px 0px 0px 1px rgba(255, 115, 100, 0.4), 0 1px 3px #333333;'+
		'color: #fff !important;'+
		'font-size: 24px !important;'+
		'font-family: "Merienda", cursive !important;'+
		'padding: 12px 0 14px 0 !important;'+
		'margin: 0 !important;'+
		'text-align: center !important;'+
		'text-shadow: 0 -1px 1px rgba(19,65,88,.8);'+
		'line-height: 100% !important;'+
		'width: 90px !important; }'+
		  
		'.thoughtbot:hover {'+
			'background-color: #f37873;'+
			'background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f37873), color-stop(50%, #db504d), color-stop(50%, #cb0500), color-stop(100%, #a20601));'+
			'background-image: -webkit-linear-gradient(top, #f37873 0%, #db504d 50%, #cb0500 50%, #a20601 100%);'+
			'background-image: -moz-linear-gradient(top, #f37873 0%, #db504d 50%, #cb0500 50%, #a20601 100%);'+
			'background-image: -ms-linear-gradient(top, #f37873 0%, #db504d 50%, #cb0500 50%, #a20601 100%);'+
			'background-image: -o-linear-gradient(top, #f37873 0%, #db504d 50%, #cb0500 50%, #a20601 100%);'+
			'background-image: linear-gradient(top, #f37873 0%, #db504d 50%, #cb0500 50%, #a20601 100%);'+
			'cursor: pointer; }'+
			
		'.thoughtbot:active {'+
			'background-color: #d43c28;'+
			'background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #d43c28), color-stop(50%, #ad3224), color-stop(50%, #9c1500), color-stop(100%, #700d00));'+
			'background-image: -webkit-linear-gradient(top, #d43c28 0%, #ad3224 50%, #9c1500 50%, #700d00 100%);'+
			'background-image: -moz-linear-gradient(top, #d43c28 0%, #ad3224 50%, #9c1500 50%, #700d00 100%);'+
			'background-image: -ms-linear-gradient(top, #d43c28 0%, #ad3224 50%, #9c1500 50%, #700d00 100%);'+
			'background-image: -o-linear-gradient(top, #d43c28 0%, #ad3224 50%, #9c1500 50%, #700d00 100%);'+
			'background-image: linear-gradient(top, #d43c28 0%, #ad3224 50%, #9c1500 50%, #700d00 100%);'+
			'-webkit-box-shadow: inset 0px 0px 0px 1px rgba(255, 115, 100, 0.4);'+
			'box-shadow: inset 0px 0px 0px 1px rgba(255, 115, 100, 0.4); }'
	);
}