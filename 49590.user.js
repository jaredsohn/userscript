// ==UserScript==
// @name           AlertBucks Test
// @include        http://www.alertbucks.com/index.php?option=surf
// ==/UserScript==
var processed=false;
var i=0;
function work()
{
	while(link=document.links[i++])
	{
		if(id=link.href.match(new RegExp('view.php\\?ad=(.*)')))
		{
			processed=true;
			GM_xmlhttpRequest({
				method:'GET',
				url:link.href,
				id:id[1],
				onload:function(xhr)
				{
					if(code=xhr.responseText.match(new RegExp('var code = "(.*)";')))
					{
						GM_xmlhttpRequest({
							method:'GET',
							url:'http://www.alertbucks.com/success.php?ad='+this.id+'&code='+code[1]+'&verify=1',
							onload:function(xhr)
							{
								work();
								return;
							}
						});
					}
					return;
				}
			});
			break;
		}
	}
	if(i>document.links.length&&processed)location.href=location.href;
	return;
};
work();
