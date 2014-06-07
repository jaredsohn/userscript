(function() {

// ==UserScript==
// @name          RFC 2606§3 - loose document implementation parser Unit Test
// @namespace     http://userscripts.org/users/37004
// @description   Tests out the loose document.implementation parser
// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       0.0.11
// @include  http://www.iana.org/*
// @include  http://example.com/*
// @include  http://example.net/*
// @include  http://example.org/*
// @include  http://www.example.com/*
// @include  http://www.example.net/*
// @include  http://www.example.org/*
//
// @grant GM_log
// @grant GM_xmlhttpRequest
//
// ==/UserScript==

  GM_xmlhttpRequest({
    method: 'GET',
    url: "http://example.com",
    onload: function (xhr) {
      //////////////////////////////////////////////////////////////////////////
      // Purposely sabotage the responseText to produce
      //   an incorrect document.
      //////////////////////////////////////////////////////////////////////////
      let responseText = xhr.responseText.replace(/<\/BODY>/i, "<BR></BODY>");
      GM_log(['',
        responseText
      ].join('\n'));

      //////////////////////////////////////////////////////////////////////////
      // Create a document implementation.
      //////////////////////////////////////////////////////////////////////////
      let
        dt = document.implementation.createDocumentType(
          "html",
          "-//W3C//DTD HTML 4.01 Transitional//EN",
          "http://www.w3.org/TR/html4/loose.dtd"
        ),
        doc = document.implementation.createDocument("", "", dt),
        documentElement = doc.createElement("html")
      ;

      documentElement.innerHTML = responseText;
      doc.appendChild(documentElement);

      //////////////////////////////////////////////////////////////////////////
      // Do some minor mitigation to at least return a somewhat valid doc.
      //   Remainder of missing attributes and moving of head contents will
      //   probably be very site specific but usually those items
      //   don't change a lot.
      //
      //   Please note that the html tag attributes, head tag with attributes
      //   and body tags with attributes are stripped.
      //
      //   ScriptWrights usually know their sites DOM quite well to do some
      //   simple mitigation to readd these if it's absolutely necessary.
      //
      //     MOST OF THE TIME THIS IS UNNECESSARY.
      //////////////////////////////////////////////////////////////////////////
      let html = doc.documentElement.innerHTML;
      doc.documentElement.innerHTML = "";

      let body = doc.body || doc.getElementsByTagName("body")[0] || doc.createElement("body");
      body.innerHTML = html;
      doc.documentElement.insertBefore(body, doc.documentElement.firstChild);

      let head = doc.head || doc.getElementsByTagName("head")[0] || doc.createElement("head");
      doc.documentElement.insertBefore(head, doc.documentElement.firstChild);

      //////////////////////////////////////////////////////////////////////////
      // Do some tests with XPath.
      //////////////////////////////////////////////////////////////////////////
      let xpr = doc.evaluate(
        "//p",
        doc.body,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );

      GM_log(['',
        '> XPath'
      ].join('\n'));

      if (xpr)
        for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);)
          GM_log(['',
            thisNode.textContent
          ].join('\n'));

      GM_log(['',
        '< XPath'
      ].join('\n'));
      //////////////////////////////////////////////////////////////////////////
      // Finally dump what document.implementation created and check if a valid
      //   html document has actually been created.
      //
      // This keeps loose DOM parsing in user.js and outside of the
      //   privileged scope of Greasemonkey and should be
      //   cross-browser compatible.
      //////////////////////////////////////////////////////////////////////////
      let s = new XMLSerializer();
      GM_log(['',
        s.serializeToString(doc)
      ].join('\n'));

      GM_log(['',
        'doc == ' + doc
      ].join('\n'));
    }
  });

})();
