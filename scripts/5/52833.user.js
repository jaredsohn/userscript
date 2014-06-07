// ==UserScript==
// @name     My Delicious Search Results on Google
// @namespace      jmason
// @description    Shows tag-search results from my Delicious account on Google search pages, with links to more extensive Delicious searches.  Use 'User Script Commands' -> 'Set Delicious Username' to specify your username
// @include  http://www.google.*q=*
// @date     2009-06-14
// @version  0.2
// @GM_version     0.8.20080609.0
// 
// This is almost entirely from 'Delicious Search Results on Google' (http://userscripts.org/scripts/show/43784), which in turn notes that 99% of the code for that user script comes form markcarey's userscript 'Twitter Search Results on Google' (http://userscripts.org/scripts/show/43451).
//
// ==/UserScript==

del_username = GM_getValue('mydel_username');
if (!del_username) { del_username = "jm"; }
GM_registerMenuCommand('Set Delicious Username', setUserName);

delLogo = "data:image/png;base64,AAABAAIAEBAAAAEAGABoAwAAJgAAABAQAAABACAAaAQAAI4DAAAoAAAAEAAAACAAAAABABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLT////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT////////////////////////////////////////////0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv///////////////////////////////////////////9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL////////////////////////////////////////////QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy////////////////////////////////////////////0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv///////////////////////////////////////////9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL////////////////////////////////////////////QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy////////////////////////////////////////////0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv///////////////////////////////////////////9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";

GM_DUR = {
  un : "",
  init : function()
  {
    var href = document.location.href;
    GM_DUR.un = href.match(/[&?]q=([^&]*)(?:&|$)/)[1];

    if( GM_DUR.un != "" )
    {
      GM_xmlhttpRequest({
        method:"GET",
        url:"http://feeds.delicious.com/v2/json/"+del_username+"/"+GM_DUR.un,
        headers:{
          "User-Agent":"Mozilla/5.0",
          "Accept":"text/json"
        },
        onload:GM_DUR.handle
      });
    }
  },

  handle : function(response)
  {
    var results = eval("("+response.responseText+")");
    if( results.length > 0 )
    {
      var results_section = document.getElementById("res");
      var ds = document.createElement("ol");
      results_section.insertBefore(ds, results_section.firstChild);
            
      var il, h;
      var query = unescape(GM_DUR.un).replace(/\+/g, ' ');
      h = ds.appendChild(document.createElement("li"));
      h.className = "g";
      var h3 = h.appendChild(document.createElement("h3"));
      h3.className = "r";
      h3.innerHTML = "<p><a href='http://delicious.com/search?p=" + GM_DUR.un +"'>Delicious tag-search results for <em>"+ query +"</em></a>:</p>";
      var t = h.appendChild(document.createElement("table"));
      t.className = "ts";
      var tb = t.appendChild(document.createElement("tbody"));
      var row = tb.appendChild(document.createElement("tr"));
      row.innerHTML = '<td style="padding-top: 5px; padding-right: 10px; font-size: 78%; line-height: normal; width: 43px; text-align: center;" valign="top"><img src="'+delLogo+'" alt="" height="42" width="43"></td><td style="padding-top: 3px;" valign="top">';
      
      for( var i=0; i < 5; i++ )
      {
        il = "<div class='s'>"+
        "<a href='"+results[i].u+"' class='l'>"+
          results[i].d+"</a><br/> "+
          ' <h4 class="r">'+ results[i].n +'</span><br/> '+
          ' <span class="f">'+ results[i].t +'</span></div>';
        row.innerHTML += il;
      }
      row.innerHTML += '</td><p>'+
          "» <a href='http://delicious.com/search?p=" + GM_DUR.un +"&u="+del_username+"&lc=1&context=userposts'>More results in my bookmarks</a> / "+
          "<a href='http://delicious.com/search?p=" + GM_DUR.un +"&u="+del_username+"&lc=1&context=network'>my network</a> / "+
          "<a href='http://delicious.com/search?p=" + GM_DUR.un +"&lc=1&context=all'>all of del.icio.us</a>"+
          "</p><div id='ssb'></div>";
    }
  },
};

GM_DUR.init();


function setUserName()
{
  var user = prompt('Please enter your delicious username');
  if (user) {
    GM_setValue('mydel_username', user);
  }
}

