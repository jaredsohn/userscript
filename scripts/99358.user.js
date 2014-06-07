// ==UserScript==
// @name           Yahoo Emoticon For New Blogger
// @namespace      http://www.adhi90.blogspot.com
// @description	   This is emoticon assistant for now blogger editor
// @include        http://*blogger.com/post-edit.g?*
// @include        http://*blogger.com/post-create.g?*
// @include        http://*blogger.com/post-create.do
// ==/UserScript==


buttons = "<tr>";
for(i = 1; i < 115; i++) {
   if (i >= 80 && i < 100) {continue;}
   img = "<img src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/" + i + ".gif'>";
   buttons += "<td style=\"text-align: center;\" onclick=\"document.getElementById('postingComposeBox').contentWindow.document.body.innerHTML +='&lt;img src=http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/" + i + ".gif&gt;'\">" + img + "</td>";
  if (i % 5 == 0) {
    buttons += "</tr><tr>";
  }
}
buttons += "</tr>";

style = "position: absolute; top: 203px; left: 730px; width: 250px; height: 335px; background-color: #D8C9B6; padding: 3px;";

content = "<div class=\"goog-toolbar goog-toolbar-horizontal\" style = \"height: 23px; text-size: 20px;\">Insert Emoticon</div><div style=\"height: 300px;overflow: auto;\"><table>" + buttons + "</table></div>"

toolbar = document.createElement("div");
toolbar.id = "emoticonbar_container";
toolbar.innerHTML = content;
toolbar.setAttribute("style", style);
document.getElementById("body").appendChild(toolbar);