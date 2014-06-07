// ==UserScript==
// @name           Pooflinger's Facebook Forum ReplyTo
// @namespace      Pooflinger
// @description    Add ReplyTo Button on Facebook Forums
// @include        http://*.facebook.com/topic.php*
// @include        http://*.facebook.com/board.php*
// @include        http://*.facebook.com/edittopic.php*
// @author 		   Peter Limpiyawon - peter [at] furoma.com
// ==/UserScript==



var currentLocation;

poo_party();
document.addEventListener('click', function() { window.setTimeout(poo_party, 5000);}, true);

function $(id)
{	return document.getElementById(id);
}

//******************************************************
//The gup function is copied from http://www.netlobo.com/url_query_string_javascript.html
//******************************************************

function gup(str, name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( str );
  if( results == null )
    return "";
  else
    return results[1];
}

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function poo_party()
{

	if (window.location.href == currentLocation)
		return;

	currentLocation = window.location.href;
	

	
	
	//************************* REMOVE FACEBOOK AJAX

	var allDivs;
	allDivs = document.evaluate(
	"//ul[@class='pagerpro']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

	if (allDivs.snapshotLength != 0)
		{
		allDivs = allDivs.snapshotItem(0);


		for (var i=1; i<allDivs.childNodes.length; i++)	
		allDivs.childNodes[i].innerHTML = allDivs.childNodes[i].innerHTML.replace(/onclick=(.+)[']>/g,'>');
		
		}
	
	
	//*/
	
	//************************ REPLY TO
	
	if ($('toggle_tabs_unused'))
	{
		var uid, topic, xid, app_id, sig, c_url, r_url;
		
		allDivs = $('toggle_tabs_unused').getElementsByTagName('a');
		for (var i=0; i<allDivs.length; i++)
			if (allDivs[i].innerHTML=='Topic View')
				{
				uid=gup(allDivs[i].href,'uid');
				topic=gup(allDivs[i].href,'topic');
				xid=gup(allDivs[i].href,'xid');
				app_id=gup(allDivs[i].href,'app_id');
				sig=gup(allDivs[i].href,'sig');
				c_url=gup(allDivs[i].href,'c_url');
				r_url=gup(allDivs[i].href,'r_url');
				break;
				}
	
		allDivs = xpath("//ul[@class='actionspro']");
		for (var i=0, txt; i<allDivs.snapshotLength; i++)
			{
			txt = allDivs.snapshotItem(i).innerHTML;
			if (txt.indexOf('Report')==-1)
				continue;
			
			allDivs.snapshotItem(i).innerHTML+=
			'<A class=actionspro_a href=http://www.facebook.com/edittopic.php?uid='+uid
			+'&topic='+topic
			+'&post=&reply_to='+allDivs.snapshotItem(i).parentNode.id.replace('post_data','')
			+'&xid='+xid
			+'&app_id='+app_id
			+'&c_url='+c_url
			+'&r_url='+r_url
			+'&sig='+sig
			+'&action=4>Reply To</A>';
			}
	//http://www.facebook.com/edittopic.php?xid=mm_tavern_1&app_id=79378246206&c_url=http%253A%252F%252Fapps.facebook.com%252Fmythmonger%252Fboards.php&r_url=http%253A%252F%252Fapps.facebook.com%252Fmythmonger%252Fboards.php&sig=acf231328f48884087db222a4d8dae13&topic=4464&action=1&post=44333
	//http://www.facebook.com/edittopic.php?uid=(board uid)&topic=(topic number)&post=&reply_to=(post number)&action=4
	}
	
}