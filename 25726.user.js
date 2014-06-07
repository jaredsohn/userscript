// ==UserScript==
// @name           MySpace - Faster Bulletins
// @namespace      CstrzRock (cstrzrock@gmail.com)
// @description    Automatically checks the allow bulletin comments box and places the cursor in the subject box.
// @include        http://bulletins.myspace.com/index.cfm?fuseaction=bulletin.edit*
// ==/UserScript==
if (
	document.getElementById("ctl00_ctl00_cpMain_cpMain_BulletinPost_chkAllowBulletinComments")
)
{	document.getElementById("ctl00_ctl00_cpMain_cpMain_BulletinPost_chkAllowBulletinComments").click();
};

if (
	document.getElementById("ctl00_ctl00_cpMain_cpMain_BulletinPost_Subject_Textbox") 
)
{	document.getElementById("ctl00_ctl00_cpMain_cpMain_BulletinPost_Subject_Textbox").focus();
};
