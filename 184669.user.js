// ==UserScript==
// @name       Lighthouse tags
// @match      *://*.lighthouseapp.com/tickets*
// @match      *://*.lighthouseapp.com/projects/*/tickets*
// @match      *://*.lighthouseapp.com/projects/*/tickets/bins/*
// ==/UserScript==

var parent, link, url = document.location.href;

if (/bins\/\d+/.test(url)) {
  url = url + "?format=json";
} else {
  url = url.replace(/\/tickets.*/, "/tickets.json");
  url = url + "?q=" + $("q").value;
}

// This is a ticket page. Ignore.
if (/projects\/[^\/]+\/tickets\/\d+/.test(document.location.href)) {
  return;
}


new Ajax.Request(url, {
  method: "GET",
    contentType: "application/json",
    requestHeaders: { "Accept": "application/json" },
    onSuccess: function(data) {
      var tickets = data.responseJSON.tickets;
      for (var i=0; i < tickets.length; i++) {
        var t = tickets[i]["ticket"];
        var a = $$("#ticket-" + t.number + " td.issue a");
          
        // Add milestone info on account search
        if (!/\/projects\//.test(document.location.href)) {
          if (t.milestone_title) {
            link = document.createElement("a");
            link.href = "/projects/" + t.project_id + "/milestones/" + t.milestone_id;
            link.innerHTML = t.milestone_title;
            a[0].insertAdjacentElement("afterend", link);
            a[0].insertAdjacentHTML("afterend", " / <strong>milestone:</strong> ");
          }
        }
          
        // Add tag info everywhere
        if (t.tag) {
          a[0].insertAdjacentHTML("afterend", " / <strong>tags:</strong> " + t.tag);
        }
      }
    }
});