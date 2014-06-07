// ==UserScript==
// @name           Fetlife Simple User Photo Preview
// @version        0.1
// @updateURL      https://userscripts.org/scripts/source/146293.user.js
// @description    Displays a simple (not really) photo gallery preview under the main picture above the friends box
// @include        http*://fetlife.com/users/*
// @exclude        http*://fetlife.com/users/*/*
// ==/UserScript==

	var mainSelector = '.PhotoPreviews';
	var innerSelector = '.PhotoPreviews div.innerContent';
function insertImagePreview ()
{
	var css = mainSelector + '{height: 200px;overflow-y: scroll;}';
	$('ul.friends').parent().children().first().before('<div class="PhotoPreviews"><h4>Photo Preview</h4><div class="innerContent"><img src="/images/spinner_big.gif" alt="fetch Oubou fetch..." title="fetch Oubou fetch..." class="Loading" /></div></div>');
	LoadImages(1);

}
function LoadImages(pageNumber)
{	
	var URL = window.location.href + '/pictures?page=' + pageNumber;
	$.ajax({
		url:URL,
		dataType:'html',
		useCache:false,
		success:function(data)
		{
			var links = '';
			var linkCount = 0;
			$(innerSelector + ' .Loading').hide();
			$('ul.page li', $(data)).each(function(index,element)
			{
				linkCount++;
				$(innerSelector).children().first().after($(element).html());
			});
			$(mainSelector).css('margin-bottom', '5px');
			$(innerSelector).css('height', '200px');
			$(innerSelector).css('overflow-y', 'scroll');
			$(innerSelector + ' img').css('width','40%');
			if(linkCount == 30)
			{
				LoadImages(pageNumber+1);
			}
		}
	});
}
insertImagePreview();