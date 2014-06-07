// ==UserScript==
// @name           Torrific show download as zip
// @namespace      http://coexistentrandom.wordpress.com/torrific-show-download-as-zip
// @description    Script to show torrific's download as zip feature
// @author         kyuuCR
// @version        0.3
// @license        GNU General Public License
// @include        http://torrific.com/*
// @exclude        http://torrific.com/login/*
// @exclude        http://torrific.com/home/*
// @exclude        http://torrific.com/account/*
// @exclude        http://torrific.com/logout/*
// @exclude        http://torrific.com/faq/*
// @exclude        http://torrific.com/feedback/*
// @exclude        http://torrific.com/about/*
// @exclude        http://torrific.com/help/*
// @exclude        http://torrific.com/privacy/*
// @exclude        http://torrific.com/tou/*
// ==/UserScript==

if (isTorrentAvailable())
	if (isSingleFile())
		makeZipLink();
	else makeCheckboxes();

function isTorrentAvailable()
{
	var available = document.querySelector('.state');
	return (available == null);
}

function isSingleFile()
{
	var folder = document.querySelector('tr[class^="dotted hand folder"]');
	return !folder;
}

function makeZipLink()
{
	var file = document.querySelector('tr[class^="dotted file"]');
	file.setAttribute('class','dotted file alt');
	var link = file.querySelector('a').getAttribute('href');
	link = link.match("^http://[a-z0-9]*.btaccel.com/.+/[a-z0-9]{40}") + "_1.zip";
	var ziplink = document.createElement('a');
	ziplink.setAttribute('id','zip_download_link');
	ziplink.setAttribute('href',link);
	ziplink.innerHTML = 'download file as .zip';
	var td = document.createElement('td');
	td.setAttribute('colspan','3');
	td.appendChild(ziplink);
	var newfile = document.createElement('tr');
	newfile.appendChild(td);
	var parent = file.parentNode;
	parent.insertBefore(newfile,file);
}

function makeCheckboxes()
{
	var rows = document.querySelectorAll('tr[class^="dotted files"] > td:first-child');
	for (var i = 0; i < rows.length; i++)
	{
		if (!rows[i].innerHTML)
		{
			var checkbox = document.createElement('input');
			checkbox.setAttribute('class','zip_subset');
			checkbox.setAttribute('type','checkbox');
			checkbox.setAttribute('checked','checked');
			checkbox.setAttribute('name','file');
			checkbox.setAttribute('checked','checked');
			checkbox.setAttribute('value',i);
			rows[i].appendChild(checkbox);
		}
	}
	
	var folder = document.querySelector('tr[class^="dotted hand folder"] > td:first-child');
	if (folder != null && !folder.innerHTML)
	{
		var checkbox = document.createElement('input');
		checkbox.setAttribute('class','zip_subset');
		checkbox.setAttribute('type','checkbox');
		checkbox.setAttribute('checked','checked');
		checkbox.setAttribute('name','file');
		checkbox.setAttribute('id','checkall');
		checkbox.setAttribute('value','0');
		folder.appendChild(checkbox);
	}
	
	var link = document.querySelector('#files > tbody> tr> td[colspan="3"]');
	link.childNodes[1].data = "";
}
