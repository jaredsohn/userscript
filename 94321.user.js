// ==UserScript==
// @name          TechExcel 5.5 Web Conversation Plugin
// @version       2012.11.13.05
// @require       http://code.jquery.com/jquery-1.6.4.min.js
// @include       *support.handysoft.com*
// ==/UserScript==

(
function()
{
  // injectCSS ( 'body (font-family: Verdana, sans-serif;)'); 
  function injectCSS(cssdata)
  {
    head = document.getElementsByTagName("head")[0];
    style = document.createElement("style");
    style.setAttribute("type", 'text/css');
    style.innerHTML = cssdata;
    head.appendChild(style);
  }

  function gotoTicket(id)
  {
    alert("Go to " + id);
  }

  // find Web Conversation
  if (/swise\/buginfo\/techsupport.dll/.test(location))
  {
    var url = location.href;
    var bugid = url.replace(/.*bugid=(\d+).*/, '$1');
    if (url != bugid)
    {
      var summary = $("html body table tr td table tr td:eq(0)");
      summary.css("background-color", "yellow");

      var objCompanyName = $("table tr td table tr td:eq(1) table tr td:eq(1) font:eq(0)");
      txt = escape(objCompanyName.text());
      txt = txt .replace(/%0A/, '');
      txt = txt .replace(/%A0/, ' ');
      txt = unescape(txt );
      objCompanyName.wrap("<a href='http://wiki.handysoft.com/wiki/index.php/" + txt + "'/>");
      objCompanyName.css("background-color", "yellow");
      objCompanyName.css("text-decoration", "underline");

/*
      var username = $("html body center table tbody tr td table.DETAIL_PANEL tbody tr:eq(1) td table tbody tr td:eq(1) font:eq(1)");
      username.css("background-color", "red");
      var url = "http://support.handysoft.com/scripts/texcel/swise/buginfo/buginfo.dll?IncidentMenu?10&47&" + bugid + "&-3&47&1&1&1&1&0&0&0";
//    username.replaceWith("12345");
      username.wrap("<a href='" + url + "'/a>");
*/

/*
      var objId = $("html body table tr td table tr td:eq(1) table tr:eq(1) td:eq(0)");
      objId.css("background-color", "yellow");
*/

      var objTitle = $("html body table tr td table tr td:eq(1) table tr:eq(1) td:eq(1) font");
      var txtTitle = objTitle.text();
      txtTitle = txtTitle.replace(/PKI/, '[PKI]');
      txtTitle = txtTitle.replace(/BPS/, '<a href="http://community.handysoft.com/search.jspa?q=BPS"><font color="yellow">BPS</font></a>');
      objTitle.css("background-color", "yellow");
      objTitle.replaceWith(txtTitle);

/*
      var objDesc = $("html body table tr td table tr td:eq(1) table tr:eq(2) td:eq(1)");
      objDesc.css("background-color", "yellow");

      var objProductTypeLabel = $("html body table tr td table tr td:eq(1) table tr:eq(4) td:eq(1) table tr td:eq(0)");
      objProductTypeLabel.css("background-color", "yellow");

      var objProductTypeValue = $("html body table tr td table tr td:eq(1) table tr:eq(4) td:eq(1) table tr td:eq(1)");
      objProductTypeValue.css("background-color", "cyan");

      var objDBLabel = $("html body table tr td table tr td:eq(1) table tr:eq(4) td:eq(1) table tr td:eq(2)");
      objDBLabel.css("background-color", "yellow");

      var objDBValue = $("html body table tr td table tr td:eq(1) table tr:eq(4) td:eq(1) table tr td:eq(3)");
      objDBValue.css("background-color", "cyan");
*/
    }
  }
}
)();