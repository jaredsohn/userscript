// ==UserScript==
// @name          Agash's Script
// ==/UserScript==
try {
  var wpdivs = document.getElementsByTagName('div');
  for (var i=0; i<wpdivs.length; i++) {
    if (wpdivs[i].id == 'wpdc_embed_12675578971') {
      wpdivs[i].innerHTML = "<div style=\"width: 265px; height: 200px;\"><iframe\nsrc=\"http://www.widgipedia.com/widgets/DCA-Busines" +
"s/YouTube-Search-e1263-32768_134217728.widget?__install_id=1267557897195&amp;__view=embed\" framebord" +
"er=\"0\" width=\"265\" height=\"200\" style=\"border: 1px solid black; padding: 0px; margin: 0px; width: 26" +
"5px; height: 200px;\" scrolling=\"no\" onload=\"document.body.style.margin=document.body.style.padding=\'" +
"0px\';\"></iframe></div><div style=\"width: 265px; height: 25px; background-image: url(http://www.widgi" +
"pedia.com/images/web_widgets/get_web_widget_bg.gif); background-repeat: repeat-x; margin-bottom: 7px" +
";\"><a target=\"_blank\" href=\"http://www.widgipedia.com/widgets/customize/DCA-Business/YouTube-Search_" +
"1263.html\" title=\"More Web &amp; Desktop Widgets @ Widgipedia\"><img src=\"http://www.widgipedia.com/imag" +
"es/global/spacer.gif\" width=\"121\" height=\"25\" alt=\"More Web &amp; Desktop Widgets @ Widgipedia\" titl" +
"e=\"More Web &amp; Desktop Widgets @ Widgipedia\" border=\"0\" align=\"left\" vspace=\"0\" hspace=\"0\"><img s" +
"rc=\"http://www.widgipedia.com/images/web_widgets/get_web_widget_logo.gif\" width=\"24\" height=\"25\" alt" +
"=\"More Web &amp; Desktop Widgets @ Widgipedia\" title=\"More Web &amp; Desktop Widgets @ Widgipedia\" b" +
"order=\"0\" align=\"right\" vspace=\"0\" hspace=\"0\"></a></div><img src=\"http://www.widgipedia.com/images/g" +
"lobal/embed_12675580051u_1263w.gif\" width=\"1\" height=\"1\" alt=\"\" style=\"display: none\" border=\"0\">";
;
      wpdivs[i].style.display = '';
    }
  }
} catch(e) {}