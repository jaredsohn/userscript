// ==UserScript==
// @name       Save My Tickets!
// @version    0.1
// @description  Make those tickets save!
// @include        http://cp.volusion.com/WhitePage.aspx?*
// @include        http://cp.volusion.com/whitepage.aspx?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
                var wpdn = $("#Label_DomainName").html();
                var wpcid = $('#Label_CustomerID').html();
                $("#verified a").click(function() {
                                                $("#UpdatePanel_New_Ticket").html('<iframe src="http://www.andrewv11.com/v/builtin.html?domain=' + wpdn + '&customerid=' + wpcid + '" id="iframeforcrm" frameborder="0" width="690px" height="475px" scrolling="no"></iframe>');
                });
}); 
