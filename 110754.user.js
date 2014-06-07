// ==UserScript==
// @name           GameSpy/FilePlanet fixes
// @namespace      SiPlus
// @description    Fixes user-submitted errors on GameSpy site and FilePlanet (v0.1.2, August 20, 2011).
// @include        http://*.gamespy.com/*
// @include        http://*.fileplanet.com/error/error_file_download.shtml*
// @include        http://thewavelength.net/oldcontent/*
// @include        http://www.thewavelength.net/oldcontent/*
// ==/UserScript==

if (document.location.host.match(/gamespy.com/i)!=null)
{
	//Fix for gamespy.com
	//Redirect from dl.asp to hosteddl.aspx
	if (document.location.pathname.search(/\/dl\/dl.asp/i) == 0)
		document.location.href = 'http://fileplanet.com/hosteddl.aspx'+document.location.search;
	if (document.location.host.match(/planethalflife/i)!=null)
	{
		//Wavelength
		if (document.location.pathname.search(/\/wavelength/i) == 0)
			document.location.href = 'http://thewavelength.net/oldcontent'+document.location.href.substr(document.location.href.search(/\/wavelength/i)+11);
	}
}
else if (document.location.host.match(/fileplanet.com/i)!=null)
{
	//Fix for fileplanet.com
	//Redirects from missing files
	if (document.location.search.split('url&')[1]!=null)
	{
		var filePath = encodeURI(decodeURIComponent(document.location.search.split('url&')[1]));
		var filePathStart = (filePath[0] == '/') ? 1 : 0;
		//Wavelength
		if (filePath.search(/planethalflife\/wavelength\//i) == filePathStart)
			document.location.href = 'http://thewavelength.net/oldcontent/files/'+filePath.substr(26+filePathStart);
	}
}
else if (document.location.host.match(/wavelength.net/i)!=null)
{
	//Offtopic: fix for wavelength.net download pages
	for (var i=0;i<document.links.length;i++)
	{
		if (document.links[i].href.split('/')[3] != null)
		{
			if (document.links[i].href.split('/')[3].toLowerCase() == 'oldsite')
				document.links[i].href = 'http://'+document.location.host+'/oldcontent/'+document.links[i].href.substr(document.links[i].href.search(/\/oldsite\//i)+9);
		}
	}
}