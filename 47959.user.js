// ==UserScript==
// @name          Patch cf#
// @namespace     SeanSchricker
// @description   In Day Communique, the content explorer for authors opens windows with cf#/ in it. This script rewrites the openPage function so as not to include that part, so pages load faster. (Tested in CQ 5.1 only)
// @include       http://*/libs/wcm/content/siteadmin.html
// @version       1.0
// @date          2009-5-01
// @author        Sean Schricker
// ==/UserScript==

CQ=unsafeWindow.CQ
CQ.wcm.SiteAdmin.openPage=function(path,type){window.open(CQ.Util.externalize(path)+(((type!=null)&&(type=="nt:file"))?"":".html"))};void(0);
