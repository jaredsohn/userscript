// ==UserScript==
// @name       buildweb refresher
// @namespace  http://santhosh.cc/
// @version    0.1
// @description  sandbox build page auto refresher
// @match      https://buildweb.eng.vmware.com/sb/*
// @match	   https://sandbox.eng.vmware.com/sb/*
// @copyright  2012+, Santhosh Kumar Bala Krishnan
// ==/UserScript==

setInterval(refresh,3000);

function refresh()
{
    location.reload(true);
}