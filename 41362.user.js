// ==UserScript==
// @name           last.fm One-click paste Taste-O-Meter
// @namespace      http://z3c.info/
// @description    Inserts results of Teste-O-Meter between you and the last user who replied on the same topic
// @include        http://www.last.fm/group/*/forum/*
// @include        http://www.lastfm.*/group/*/forum/*
// ==/UserScript==

//
// As the code below demonstrates I love chaining function calls :)
//

$ = unsafeWindow.$;
$$ = unsafeWindow.$$;
uwd = unsafeWindow.document;

function getUserTasteOMaticUrl() {
  return $$("a[name='last']")[0]
          .next()
          .select(".userName a")[0]
          .href + "/tasteomatic";
}

function insertTasteOMaticResults(details) {
  $("message").insert(
    details.responseText
      .replace(/<strong.*?>/g, '[b]')
      .replace(/<\/strong>/g, '[/b]')
      .replace(/<a.*?>/g, '[artist]')
      .replace(/<\/a>/g, '[/artist]')
      .replace(/<.*?>/g, '')
      .replace(/^\s+/g, '')
      .replace(/\s+$/g, '')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/\n\n+/g, '\n\n')
  );
}

function requestTaste(event) {
  GM_xmlhttpRequest({
    method: "GET",
    url: getUserTasteOMaticUrl(),
    headers: {
      "User-Agent":"Greasemokey script",
      "Accept":"text/monkey,text/xml",
    },
    onload: insertTasteOMaticResults
  });
}

$$("#bbbuttons ul:first-child")[0].insert(
  $(uwd.createElement("li"))
    .writeAttribute("id", "texttaste")
    .addClassName("lfm")
    .writeAttribute("title", "Taste comparison")
    .insert(
      $(uwd.createElement("span"))
        .insert("Taste-o-meter")
        .observe("click", function () {
          setTimeout(requestTaste, 0);
        })
    )
);
