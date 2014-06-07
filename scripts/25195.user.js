// Gmail Auto CC/BCC Script
// http://userscripts.org/scripts/show/25195

// ==UserScript==
// @name           Gmail Auto CC/BCC
// @namespace      http://exstodot.blogspot.com
// @description    Automatically add email addresses to the Cc or Bcc field in gmail
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

const emailids='';
	/*
	Enter a comma separated list of email ids here such as
	emailids='abc@gmail.com, def@gmail.com';
	This will be copied exactly into the cc or bcc fields when you send an email
	Leave this blank if you do not want to add any email id to the field by default
	*/
const addtype='Bcc';
	/*
	Change this to 'Cc' if you wish to use the Cc field instead of the Bcc field
	Please note that this is case sensitive
	*/

////////// DO NOT EDIT ANYTHING BEYOND THIS POINT

var doc;

window.addEventListener('load', function()
{
	if(unsafeWindow.gmonkey)
	{
		unsafeWindow.gmonkey.load('1.0', function(g)
		{
			g.registerViewChangeCallback(function()
			{
				doc=top.document.getElementById('canvas_frame').contentDocument;
				if(
					(g.getActiveViewType() == 'co') ||
					(g.getActiveViewType() == 'cv')
					)
				{
					addbccemailids();
					var spans=doc.evaluate('//span', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					for(var i=0;i<spans.snapshotLength;i++)
					{
						var link=spans.snapshotItem(i);
						if(link.firstChild&&(link.firstChild.nodeValue=='Reply'||link.firstChild.nodeValue=='Forward'||link.firstChild.nodeValue=='Reply All'))
						{
							link.addEventListener('click', function(){window.setTimeout(function(){addbccemailids();}, 400);}, true);
						}
					}
				}
			});
		});
	}
}, true);

function addbccemailids()
{
	log('here');
	var spans=doc.evaluate('//span', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i=0;i<spans.snapshotLength;i++)
	{
		var link=spans.snapshotItem(i);
		if(link.firstChild&&(link.firstChild.nodeValue=='Add '+addtype))
		{
			log('found the link');
			clickme(link);
			var tds=doc.evaluate('//td', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for(var i=0;i<tds.snapshotLength;i++)
			{
				var td=tds.snapshotItem(i)
				if(td.firstChild&&(td.firstChild.nodeValue==addtype+':'))
				{
					td.nextSibling.firstChild.value=emailids;
				}
			}
		}
	}
}

const LOG_TO_CONSOLE=0;
function log(s)
{
	if(LOG_TO_CONSOLE) GM_log(s);
}

function clickme(obj){ //written by Mikado at http://userscripts.org/forums/1/topics/1682
	var evt=document.createEvent('MouseEvents');
	evt.initMouseEvent('click',true,true,window,1,0,0,0,0,false,false,false,false,0,null);
	obj.dispatchEvent(evt);
}
