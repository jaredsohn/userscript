/*
 *  This file is part of NoCountdown!
 *  Copyright (C) 2006 Unbrained (josuicida@gmail.com)
 *  Source code at http://userscripts.org/scripts/show/5949
 *
 *  This script is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public
 *  License as published by the Free Software Foundation; either
 *  version 2 of the License, or (at your option) any later version.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  General Public License for more details.
 *  http://www.gnu.org/copyleft/gpl.html
 */

// ==UserScript== 
// @name			NoCountdown!
// @author			Unbrained
// @description			Deletes countdowns in upload sites like Megaupload, filesend...
// @include			http://www.filesend.net/*
// @include			http://depositfiles.com/*/files/*
// @include			http://www.badongo.com/*/file/*
// @include			http://www.megaupload.com/*
// ==/UserScript==

if (location.hostname=='www.filesend.net') {
	unsafeWindow.time=0;
}

else if (location.hostname=='depositfiles.com') {
	unsafeWindow.show_url(1);
	//unsafeWindow.show_url='';
}

else if (location.hostname=='www.badongo.com') {
	unsafeWindow.check_n=0;
}

else if (location.hostname=='www.megaupload.com') {
	try {
		var x=document.body.innerHTML.replace(/\n/g, '').match(/(x\d+)=46/)[1];
		unsafeWindow.setTimeout(x+'=1', 1);
		var box = document.getElementById("floatingbox");
		box.parentNode.removeChild(box);
	}
	catch(e){}
}
