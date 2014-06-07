// ==UserScript==
// @name	craigslist beautify
// @namespace	http://kulldox.info
// @description	add features to craiglist.org
// @include	http*://*craigslist.org*
// @exclude	
// @version	0.0.1
// @date	2010-12-25
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
  // Check if jQuery's loaded
  var loadFlag = 0;// a flag to check if the jquery file has been inserted into <head>
  var checker=setInterval(function(){
    $ = unsafeWindow.jQuery;
	if(typeof ($) == "function" ) {
          if(loadFlag ==1){
			clearInterval(checker);
			letsJQuery();
			return;
		  }
		loadFlag = 1;  
     } else {
		    if(loadFlag ==0){
				document.getElementsByTagName('HEAD')[0].appendChild(GM_JQ);
				loadFlag = 1;
			}
	 }
   },100);

//---[ START:	All GM code must be inside this function
    function letsJQuery() {
		var 
			AppVersion		= '0.0.1',
			$my_head = $('head'),
			$my_head_style = $my_head.find('style'),
			page = window.location.href,// get the location href to find out what page is loaded
			page_uri = window.location.pathname.substr(10)+window.location.search,//grab the page URI
			a;
			console.log(page_uri);
		if($my_head_style.length <1)
		{
			$my_head.append('<style/>');
			$my_head_style = $my_head.find('style');
		}
		$my_head_style.append(''+
		'body { margin: 0px 8px 8px 8px; background-color: #EEEEEE}; '+
		'.versionCPbox { '+
			'border:1px solid #ffffff;'+
			'top: 2px;'+
			'margin: auto'+
			'-moz-box-shadow: 0px 0px 5px #808080;'+
			'background: #808080;'+
			'padding: 0 5px;'+
			'height: 15px;'+
		'}'+
		'.versionCPbox { '+
			'color: #ffffff;'+
			'text-decoration: none;'+
			'background: #808080;'+
		'}'+
		'.versionCPbox:hover { '+
			'color: #0000FF;'+
			'text-decoration: underline;'+
			//'background: #808080;'+
		'}'+
		'.round { '+
			'border: 1px solid #ffffff;'+
			'-moz-border-radius: 6px;'+
			'-moz-box-shadow: 0px 3px 10px #535353;'+
			'color:#ffffff;'+
			'top: 3px;'+
			'-moz-box-shadow: 0px 0px 5px #808080;'+
			'background: #808080;'+
			'padding: 0 5px;'+
		'}'+
		'.row a { '+
			'color: #ffffff;'+
			'text-decoration: none;'+
			'background: #808080;'+
		'}'+
		'.row a:hover { '+
			'color: #ffffff;'+
			'text-decoration: underline;'+
			'background: #808080;'+
		'}'+
		'');
		function showMyImgs(images){
			$.each(images,function(k,v){
				$(v)
					.mouseover(function(){
						$('#floater').html('<img src="'+v.src+'">').show();
					})
					.mouseout(function(){ $('#floater').hide(); })
					.mousemove(function(e){
						$('#floater').css({'left':e.pageX+15+'px','top':e.pageY+15+'px'});
					})
			});
		}
		$('#satabs').append('<a class="versionCPbox round" href="http://userscripts.org/scripts/show/93517" target="_blank">v. '	+ AppVersion + '</a>');
		var $items = $('p.row');
		$items.addClass('round');
		$.each($items, function(key, value) {
			var pI = value;
			var h=$('a',pI);
			$(pI).append('<div class="itemInfo" id="'+key+'_itemInfo"></div>');
			$(pI).click(function(){
				if(!$(pI).hasClass('updated')){
					$(pI).append('<div id="'+key+'_itemRawInfo" style="display: none;"></div>');
					$.get(h[0].href, function(data) { 
						//add the responce data to a storage div
						$('#'+key+'_itemRawInfo').html(data); 
						
						var sourceData = $('#'+key+'_itemRawInfo'),
							dataBody = [],
							imgsBody = [],
							imgG = $('<div id="'+key+'_gal"></div>'),
							imgs = $("img", sourceData),
							mail = $("a[href^=mailto]",sourceData),
							text = $("#userbody",sourceData),
							itemDate = $('<span class="intemDate">'+$('#'+key+'_itemRawInfo').text().match(/Date:(.*)/g)+'</span>')
						;
						
						dataBody.push(itemDate[0]); 
						dataBody.push(text[0]);
						dataBody.push(mail[0]);
						$.each(imgs,function(k,v){ 
							if(v.width > 200) { w=200; } else { w=v.width; }
							var imgWraper=$('<img class="'+key+'_img" width="'+w+'px" src="'+v.src+'"/>');
							imgsBody.push(imgWraper[0]); 
						});
						$(imgG).append(imgsBody);
						$(pI).addClass("updated");
						$('#'+key+'_itemInfo').append(dataBody);
						$('#'+key+'_itemInfo').append(imgG);
						//$('#'+key+'_itemInfo #userbody img').remove();
						showMyImgs($('#'+key+'_itemInfo img.'+key+'_img'));
					});
				} else {
					$('.itemInfo',pI).toggle();
				}
			});
		});
	}

//---[ END:	That's all GM folks
