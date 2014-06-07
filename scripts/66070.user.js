// ==UserScript==
// @name           Wikilink Highlighter
// @include        http://kol.coldfront.net/thekolwiki/*
// @include        http://th.blandsauce.com/wiki/*
// ==/UserScript==

var Links = document.evaluate(
      "//a[contains(@class,'new') or contains(@class,'mw-redirect')]",
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    ),
    URL = window.location.href,
    InsertionPoint = document.getElementById("contentSub"),
    NewNode = document.createElement("span"),
    Stubs = 0, Reds = 0, Pat = /(\/|=)(User|User_talk|Talk):/i,
    RedColour = "orange", StubColour = "yellow",
    Node, Type, Address,
    NumLinks = Links.snapshotLength;
if (NumLinks && ! /(\/|=)Special:/i.test(URL)) {
  for (let N = NumLinks - 1; N >= 0; N--) {
    Node = Links.snapshotItem(N);
    Address = Node.href;
    if (! Pat.test(Node.href)) {
      Type = (Node.getAttribute("class").indexOf("new") > -1);
      Reds += Type;
      Stubs += ! Type;
      Node.setAttribute(
        "style",
        Node.getAttribute("style") +
          "; text-decoration: blink; background-color: " +
          (Type ? RedColour : StubColour) + ";"
      );
    }
  }
}
if (Reds + Stubs) {
  InsertionPoint.parentNode.insertBefore(NewNode, InsertionPoint.nextSibling);
  if (Stubs) {
    NewNode.innerHTML += "Page has suspected " +
      "<span style='text-decoration: blink; background-color: " + StubColour +
      "'>redirect linkages</span>.";
  }
  if (Reds) {
    NewNode.innerHTML += " Page has " +
      "<span style='text-decoration: blink; background-color: " + RedColour +
      "'>red links</span>.";
  }
  NewNode.innerHTML += "<br /><br />";
}
