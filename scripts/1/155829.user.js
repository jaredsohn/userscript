// ==UserScript==
// @name       DateSelected
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  [For TimeOffManager web application] Receives and processes the parameter ddate
// @match      https://www.timeoffmanager.com/cpanel/users/newrequest.aspx?ddate=*/*/*
// @copyright  2012+, António Ribeiro
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
//var $ = unsafeWindow.jQuery;
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
        = decodeURIComponent(tokens[2]);
    }
    return params;
}
var ddate = getQueryParams(document.location.search)["ddate"];
if (ddate != undefined || ddate != "") {
    
    $("input[name='f_txtStartDate']").val(ddate);
    $("input[name='p_txtStartDate']").val(ddate);
    $("input[name='m_txtStartDate']").val(ddate);
    
}