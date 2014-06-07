// ==UserScript==
// @name           photofile full image links adder
// @namespace      Photofile
// @description    changes default image link to a direct image link
// @include        /^http://(www\.)?photo\.qip\.ru/(users|genres)/.*$/
// ==/UserScript==

var failCount = 0;
const MAX_FAIL_COUNT = 20;
const CHANGE_LINKS_ID = 'change_links_button';
function GetShowMore() {
	return document.getElementById('id_showmore');
}

function RunShowMore() {
	if(GetShowMore().style.visibility=='hidden') 
		failCount++;
	else
		failCount = 0;
	ShowMore();
	changeLinksElement.innerHTML = "Loading " + (MAX_FAIL_COUNT - failCount);
	if(failCount <= MAX_FAIL_COUNT)
		setTimeout(RunShowMore, 250);
	else
		ChangeLinks();
}

function ChangeLinks() {
	var i;
	var allLinks = document.getElementsByTagName('a');
	for(var i=0; i < allLinks.length; i++)
	{
		if (allLinks[i].href.match('/full_image'))
		{
			allLinks[i].href = allLinks[i].href.replace(/http:\/\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/.*/,
				"http://$3.users.photofile.ru/photo/$3/$4/$5.jpg");
			allLinks[i].onclick = null;
			continue;
		}		if(allLinks[i].href.match('/protected'))
		{
			allLinks[i].href = allLinks[i].href.replace(/http:\/\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/.*/,
				"http://$3.users.photofile.ru/photo/$3/$4/xlarge/$5.jpg");
			continue;
		}
		if(allLinks[i].title != '' && allLinks[i].href.match(/^http:\/\/.+?\/users\/.+?\/\d+\/$/))
		{
			allLinks[i].href += 'all/';
			continue;
		}
	}
	changeLinksElement.innerHTML = "Links changed";
}

var docbody = document.getElementById('frm_auth_user');
if(docbody == null)
	docbody = document.getElementById('ff_logout');
var changeLinksElement = document.createElement("button");
changeLinksElement.innerHTML = 'Change links';
changeLinksElement.id = CHANGE_LINKS_ID;
changeLinksElement.onclick = ChangeLinks;
docbody.parentNode.insertBefore(changeLinksElement, docbody);
if(GetShowMore() == null)
	ChangeLinks();
else
	RunShowMore();

//http://user__name.users.photofile.ru/photo/user__name/111111111/222222222.jpg
//       1            2     3          4         5         6
//http://photo.qip.ru/users/user__name/111111111/222222222/full_image/
