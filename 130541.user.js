// ==UserScript==
// @name           TopCoder Profile unused tab hider
// @namespace      http://userscripts.org/users/445152
// @match          http://community.topcoder.com/tc?module=MemberProfile*
// ==/UserScript==
function remove_unused_tabs()
{
    var tabs = document.getElementsByClassName('tabLinkNA');
    var n = tabs.length;
    for( var i = 0; i != n; ++i )
    {
        var td = tabs[0].parentNode;
        var tr = td.parentNode;
        tr.removeChild(td);
    }
}

function remove_unused_stats()
{
  var stats = document.getElementsByClassName('stat');
  var n = stats.length;
  var rem = [];

  for( var i = 0; i != n; ++i )
  {
      var td = stats[i];
      var content = td.innerHTML;
      if( content.indexOf("rated") != -1 )
      {
          var tr = td.parentNode;
          rem.push(tr);
      }
  }

  for( i in rem )
  {
      var tr = rem[i];
      tr.parentNode.removeChild(tr);
  }
}

remove_unused_tabs();
remove_unused_stats();