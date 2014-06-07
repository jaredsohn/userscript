// ==UserScript==
// @name           fetch-last-activity
// @namespace      stackoverflow
// @description    Fetch last activity in question overview
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// @author         Benjamin Dumke
// ==/UserScript==

// Thanks to Shog9 for this idea for making the script work in both
// Chrome and Firefox:
// http://meta.stackoverflow.com/questions/46562
function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function($) {
  function callback_factory(id)
  {
      return function(data)
      {
          $("#activity-"+id).html("parsing &hellip;");
          // The <center> cannot hold it is too late.
          start = data.search(/<div id="mainbar-full"/);
          end = data.search(/<\/div>\s*<\/div>\s*<div\s+id="footer">/);
          if (start + 30000 <= end)
          {
            end = data.slice(start + 25000).search(/<\/tr>/) + start + 25000;
            data = data.slice(start, end) + "</table></div></div>"
          } else
          { data = data.slice(start, end); }
          
          last_activity_row = $(".timeline", data).children("table").find("tr:even").not(".row-vote").eq(0);
          time = last_activity_row.find(".td-date").text().replace(/^\s*(.*\S)\s*$/, "$1");
          what = last_activity_row.find(".td-action").text().replace(/^\s*(.*\S)\s*$/, "$1");
          who = last_activity_row.find(".td-user").text().replace(/^\s*(.*\S)\s*$/, "$1");
          $("#activity-"+id).replaceWith("<br><span style='color:#777;'>Last activity: " + what + " by " + who + " (" + time + ")</span>");
      }
  }

  function last_activity_on_question(id)
  {
      $.get("/posts/" + id + "/timeline", callback_factory(id));
  }
  
  function requested()
  {
      id = $(this).attr("id").replace("activity-", "");
      $(this).html("fetching &hellip;")
      last_activity_on_question(id);
  }
      
  
  $(".question-summary").each(function()
  {
      id = $(this).attr("id").replace("question-summary-", "");
      reqlink = $("<a id='activity-"+id+"' style='color:#777;' title='fetch last activity'>&empty;</a>").unbind("click").click(requested);
      $(this).find(".tags").append(reqlink);
  });
   
   
});