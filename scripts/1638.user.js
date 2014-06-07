// ==UserScript==
// @name	SG QuickEdit
// @namespace	http://www.suicidegirls.com/members/ThePants/
// @description	adds an edit link to your journal entries
// @include http://*suicidegirls.com/*/[yourUsername]*
// @exclude
// ==/UserScript==

(function() {

  //Grab the footers of the entries.

  var xpath = "//div[@id='myJournal']//div[@class='footer']";
  var footer = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if (footer.snapshotLength > 0){
    var t;
    for (i = 0; t = footer.snapshotItem(i); ++i) {

      //if this is the list page, we can pull the ids from the 'classic view links'
      xpath = xpath = ".//a[child::img[@alt='CLASSIC STYLE']]";
      var classicLink = document.evaluate(xpath, t, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

      if (classicLink.snapshotLength > 0){
       var s = classicLink.snapshotItem(0).href.split('/')
       doEditButton(t, s[s.length-2]);

      // else this has only one entry and the only place we can get the id
      // is from the add comment form.
      }else {
        xpath = "//div[@id='addPostLittle']//input[@name='bid']";
        var formInput = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var bid = formInput.snapshotItem(0).value;
        doEditButton(t,bid);
      }
    }
  }

  function doEditButton(footer, bid){
    //find the functions div
    xpath = ".//div[@class='functions']";
    var fcnsDiv = document.evaluate(xpath, footer, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

    link = document.createElement('a');
    link.appendChild(document.createTextNode( "EDIT" ));
    link.href = "/update/edit"+bid+"/";

    p = document.createElement('p');
    p.appendChild(link)

    fcnsDiv.appendChild(p);

  }

})();