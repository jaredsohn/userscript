// ==UserScript==
// @name           WBB highlighter topic clicker
// @namespace      Yawn.
// @include        http://www.warez-bb.org/viewforum.php*
// @include      http://www.warez-bb.org/privmsg.php*
// @include      http://www.warez-bb.org/search.php*
// @include      http://www.warez-bb.org/index.php*
// ==/UserScript==


(function() {
var css = "tr[id*=\"cat_id_\"]:hover > td.row1{\n   background: #FFC !important;\n}\ntr[id*=\"cat_id_\"]:hover > td.row2{\n   background: #FFC !important;\n}\ntr[id*=\"cat_id_\"]:hover > td.row3{\n   background: #FFC !important;\n}\ntr[id*=\"cat_id_\"]:hover > td.row4{\n   background: #FFC !important;\n}\n\ntable.forumline + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"2\"] > tbody > tr:not(:first-child):hover > td.row1:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ntable.forumline + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"2\"] > tbody > tr:not(:first-child):hover > td.row2:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ntable.forumline + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"2\"] > tbody > tr:not(:first-child):hover > td.row3:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ntable.forumline + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"2\"] > tbody > tr:not(:first-child):hover > td.row4:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\n\ndiv + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"2\"] > tbody > tr:not(:first-child):hover > td.row1:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ndiv + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"2\"] > tbody > tr:not(:first-child):hover > td.row2:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ndiv + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"2\"] > tbody > tr:not(:first-child):hover > td.row3:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ndiv + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"2\"] > tbody > tr:not(:first-child):hover > td.row4:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\n\ndiv + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row1:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ndiv + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row2:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ndiv + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row3:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ndiv + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row4:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\n\n\ntd > div + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row1:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #ad9 !important;\n}\ntd > div + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row2:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ntd > div + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row3:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\ntd > div + table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row4:not([width=\"22%\"]):not([width=\"78%\"]):not([valign=\"top\"]) {\n   background: #FFC !important;\n}\n\nform[name=\"privmsg_list\"] > table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row1:not([width=\"22%\"]):not([width=\"78%\"]) {\n   background: #FFC !important;\n}\nform[name=\"privmsg_list\"] > table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row2:not([width=\"22%\"]):not([width=\"78%\"]) {\n   background: #ad9 !important;\n}\nform[name=\"privmsg_list\"] > table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row3:not([width=\"22%\"]):not([width=\"78%\"]) {\n   background: #ad9 !important;\n}\nform[name=\"privmsg_list\"] > table[width=\"100%\"][cellspacing=\"2\"][cellpadding=\"2\"] + table.forumline[width=\"100%\"][cellspacing=\"1\"][cellpadding=\"3\"] > tbody > tr:not(:first-child):hover > td.row4:not([width=\"22%\"]):not([width=\"78%\"]) {\n   background: #ad9 !important;\n}";
if (typeof GM_addStyle != "undefined") {
   GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
   PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
   addStyle(css);
} else {
   var heads = document.getElementsByTagName("head");
   if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node);
   }
}
})();


var alltd = document.getElementsByTagName("td");
for(i=0;i<alltd.length;i++)
{
   var alla = alltd[i].getElementsByTagName("a");
   for(j=0;j<alla.length;j++)
   {
      if(alla[j].getAttribute("class") == "topictitle" || alla[j].parentNode.getAttribute("class") == "topictitle" || alla[j].getAttribute("class") == "nav")
      {
         if(alltd[i].getAttribute("class") == "row1" || alltd[i].getAttribute("class") == "row2")
         {
            var thehref = alla[j].getAttribute("href").replace("&view=newest", "");
            alltd[i].setAttribute("onclick", "javascript:window.location='" + thehref + "';");
            alltd[i].setAttribute("ondblclick", "javascript:window.stop();window.open('" + thehref + "', '_blank');");
            alltd[i].style.cursor="pointer";
            break;
         }
      }
   }
}


function keyPressed(e)
{
       if( e.ctrlKey )
   {
           window.stop();
       }
}
               
window.addEventListener('keydown', keyPressed, false);