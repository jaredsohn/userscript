// ==UserScript==
// @name           fix Discuz ToggleVisitedLinks
// @author         randull
// @namespace      http://userscripts.org/scripts/show/172852
// @description    fix ToggleVisitedLinks problem with Discuz!
// @version        1.0.0
// @include        *forum-*-*.html
// @include        *forumdisplay.php*
// @include        */forum.php*
// @updateURL      http://userscripts.org/scripts/source/172852.meta.js
// @downloadURL    http://userscripts.org/scripts/source/172852.user.js

// ==/UserScript==
(function()
{
	function checkMeta() {
	  var metas = document.getElementsByTagName('META');
	  var i;
	  for (i = 0; i < metas.length; i++)
		if (metas[i].getAttribute('NAME') == "generator")
		  break;
	  var TestVar = metas[i].getAttribute('CONTENT').match("Discuz");
	  return TestVar
	}

	if (!document.getElementById("copyright"))
	{
		if(checkMeta()=="Discuz")
		{
			var dlinks=document.links;
			for (var i=0; i<dlinks.length; i++)
			{
				if (dlinks[i].href.match(/.*&extra=page.*/))
				{
					if (dlinks[i].innerHTML.length>4)
					{
				
					//alert(dlinks[i].href);
					//dlinks[i].href=dlinks[i].href.replace(/&extra=page.*/,"");
					var temp=dlinks[i].href.replace(/&extra=page%3D\d*/,"");
					dlinks[i].href=temp;
					dlinks[i].setAttribute('target', '_blank');
					i++;
					}
				}
			}
				var boot = function(event){
					var dlinks=event.target.document.links;
					for (var i=0; i<dlinks.length; i++)
					{
						if (dlinks[i].href.match(/.*&extra=page.*/))
						{
							if (dlinks[i].innerHTML.length>4)
							{
						
							var temp=dlinks[i].href.replace(/&extra=page%3D\d*/,"");
							dlinks[i].href=temp;
							dlinks[i].setAttribute('target', '_blank');
							i++;
							}
						}
					}
				};
				window.addEventListener("AutoPatchWork.DOMNodeInserted", boot, false);
				window.addEventListener("AutoPagerize_DOMNodeInserted", boot, false);
				window.addEventListener("AutoPagerAfterInsert", boot, false);
		}
	}
	else if (document.getElementById("copyright").textContent.indexOf("Discuz!"))
	{
		if (document.location.href.match(/forum-.*-\d\.html/))
		{
			var dlinks=document.links;
			for (var i=0; i<dlinks.length; i++)
			{
				if (dlinks[i].href.match(/-1-.*.html/))
				{
					if (dlinks[i].innerHTML.length>4)
					{
				
					var temp=dlinks[i].href.replace(/-1-.*.html/,"-1-1.html");
					dlinks[i].href=temp;
					dlinks[i].setAttribute('target', '_blank');
					i++;
					}
				}
			}
				var boot = function(event){
					var dlinks=event.target.document.links;
					for (var i=0; i<dlinks.length; i++)
					{
						if (dlinks[i].href.match(/-1-.*.html/))
						{
							if (dlinks[i].innerHTML.length>4)
							{
						
							var temp=dlinks[i].href.replace(/-1-.*.html/,"-1-1.html");
							dlinks[i].href=temp;
							dlinks[i].setAttribute('target', '_blank');
							i++;
							}
						}
					}
				};
				window.addEventListener("AutoPatchWork.DOMNodeInserted", boot, false);
				window.addEventListener("AutoPagerize_DOMNodeInserted", boot, false);
				window.addEventListener("AutoPagerAfterInsert", boot, false);
		}
		else
		{
			var dlinks=document.links;
			for (var i=0; i<dlinks.length; i++)
			{
				if (dlinks[i].href.match(/.*&extra=page.*/))
				{
					if (dlinks[i].innerHTML.length>4)
					{
				
					//alert(dlinks[i].href);
					//dlinks[i].href=dlinks[i].href.replace(/&extra=page.*/,"");
					var temp=dlinks[i].href.replace(/&extra=page.*/,"");
					dlinks[i].href=temp;
					dlinks[i].setAttribute('target', '_blank');
					i++;
					}
				}
			}
				var boot = function(event){
					var dlinks=event.target.document.links;
					for (var i=0; i<dlinks.length; i++)
					{
						if (dlinks[i].href.match(/.*&extra=page.*/))
						{
							if (dlinks[i].innerHTML.length>4)
							{
						
							var temp=dlinks[i].href.replace(/&extra=page.*/,"");
							dlinks[i].href=temp;
							dlinks[i].setAttribute('target', '_blank');
							i++;
							}
						}
					}
				};
				window.addEventListener("AutoPatchWork.DOMNodeInserted", boot, false);
				window.addEventListener("AutoPagerize_DOMNodeInserted", boot, false);
				window.addEventListener("AutoPagerAfterInsert", boot, false);

		}
	}

})()