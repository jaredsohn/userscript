// ==UserScript==
// @name           Y!kmail
// @namespace      http://userscripts.org/users/34766
// @include        http://*.mail.yahoo.com/*/welcome*
// @description    This is a hack on Yahoo! mail classic. On your welcome page, it displays all unread messages from all your folders.
// ==/UserScript==

var dbg = false;

startScript();

function startScript()
{
	var cArea = document.getElementById('pageContent');
	var info = document.getElementById('folderSummary').getElementsByTagName('a');
	
	cArea.innerHTML = "";
	if (dbg) console.log(info.length);
	
	dummy = document.createElement('div');
	dummy.id = "dummy";
	dummy.setAttribute('style', 'display: none');
	document.body.appendChild(dummy);
	
	for (var i = 0; i < info.length; i++)
	{		
		var segments = document.location.href.split('/');
		var uri = "";
		for (var j = 0; j < segments.length-1; j++)
		{
			uri += segments[j] + '/';
		}
		uri += info[i].getAttribute('href') + "&filterBy=unread";

		if (dbg) console.log(uri);
		var xhr =
		{
			method: 'GET',
			url: uri,
			Kid: info[i].getAttribute('id'),
			Ktitle: info[i].getAttribute('title'),
			KinnerHTML: info[i].innerHTML,
			onload: function(response){
				if (dbg) console.log(response.responseText);
				
				dummy.innerHTML = response.responseText.toString();
				
				// stripping starts
				
				var els = dummy.getElementsByTagName('input');
				
				var pattern = new RegExp("^selectallrows$");
				for (var k = 0; k < els.length; k++)
				{
					if (pattern.test(els[k].id) && els[k].getAttribute('type') == 'checkbox')
					{
						break;
					}
				}
				els[k].style.visibility = "hidden";
				els[k].style.display = "none";
				
				var els = dummy.getElementsByTagName('tr');
				
				var pattern = new RegExp("^msgnew$");
				for (var k = 0; k < els.length; k++)
				{
					if (pattern.test(els[k].className))
					{
						els[k].childNodes[0].style.visibility = "hidden";
						els[k].childNodes[1].style.visibility = "hidden";
						els[k].childNodes[2].style.visibility = "hidden";
					}
				}
				
				var els = dummy.getElementsByTagName('a');
				
				var pattern = new RegExp("^flagsort$");
				for (var k = 0; k < els.length; k++)
				{
					if (pattern.test(els[k].className))
					{
						break;
					}
				}
				els[k].style.visibility = "hidden";
				
				var els = dummy.getElementsByTagName('div');
				
				var pattern = new RegExp("^folderheading$");
				for (var k = 0; k < els.length; k++)
				{
					if (pattern.test(els[k].id))
					{
						break;
					}
				}
				els[k].innerHTML = "";
				els[k].style.display = "none";
				
				var pattern = new RegExp("^contentbuttonbartop$");
				for (var k = 0; k < els.length; k++)
				{
					if (pattern.test(els[k].id))
					{
						break;
					}
				}
				els[k].innerHTML = "";
				els[k].style.display = "none";
				
				var pattern = new RegExp("^contentbuttonbarbottom$");
				for (var k = 0; k < els.length; k++)
				{
					if (pattern.test(els[k].id))
					{
						break;
					}
				}
				els[k].innerHTML = "";
				els[k].style.display = "none";
				
				var pattern = new RegExp("^filterDiv$");
				for (var k = 0; k < els.length; k++)
				{
					if (pattern.test(els[k].id))
					{
						break;
					}
				}
				els[k].innerHTML = "";
				els[k].style.display = "none";
				
				var pattern = new RegExp("^checkclearall$");
				for (var k = 0; k < els.length; k++)
				{
					if (pattern.test(els[k].id))
					{
						break;
					}
				}
				els[k].innerHTML = "";
				els[k].style.display = "none";
				
				// stripping done, now for extracting the content
				
				var pattern = new RegExp("^pageContent$");
				for (var k = 0; k < els.length; k++)
				{
					if (pattern.test(els[k].id))
					{
						break;
					}
				}
				
				var el1 = document.createElement('div');
				var el2 = document.createElement('div');
				
				el1.setAttribute('id', this.Kid);
				el2.setAttribute('id', this.Kid+'_dummy');
				
				el1.setAttribute('title', this.Ktitle);
				
				el1.setAttribute('style', 'max-height: 400px; overflow-y: scroll;');
				el2.setAttribute('style', 'margin-top: 5px; padding-left: 5px; padding-top: 5px;');
				
				var tmp = this.KinnerHTML.split(' ');
				var str = tmp[tmp.length-1];
				str = str.substring(1, str.length-1);
				
				el1.innerHTML = els[k].innerHTML;
				el2.innerHTML = '<h2 title="' + this.Ktitle + '"><a href="' + this.url + '">' + this.Kid.split("folder_")[1] + ' <span style="font-size: 11pt; font-weight: normal;">- ' + str  + ' unread messages</span></a></h2>';

				cArea.appendChild(el2);
				cArea.appendChild(document.createElement('hr'));
				el2.appendChild(el1);
			}
		};
		
		GM_xmlhttpRequest(xhr);
	}
}

