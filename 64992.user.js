// ==UserScript==
// @name           Alibaba Address Book Exporter
// @namespace      http://cuimingda.net/
// @description    Add a export link in mail.alibaba-inc.com for wiki
// @include        https://mail.alibaba-inc.com/owa/?ae=Dialog&t=AddressBook&*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

(function() {

    var exportButton = "<td class=\"dv\"><img alt=\"\" src=\"8.2.176.2/themes/base/tbdv.gif\"></td>" +
                       "<td nowrap=\"\"><a id=\"export\" title=\"\u5BFC\u51FA\" class=\"btn\" href=\"#export\">" +
                       "<img alt=\"\" src=\"8.2.176.2/themes/base/clear.gif\" class=\"noSrc\">\u5BFC\u51FA</a></td>";
alert('d');
    $(".tbhd .w100:first").before(exportButton);
    
    $("#export").click(function(ev) {
          ev.preventDefault();
          var result = "";
          $(".lvw a").each(function(link) {
              var mailListTitle = $(this).text();
              var mailListAddress = $(this).parent().parent().next().text().replace(/&nbsp;|\s/g, "");
              result += "* [mailto:" + mailListAddress + "@taobao.com " + mailListTitle + "] " + mailListAddress + "@taobao.com\n";
          });
          alert(result);
    });
  
})()