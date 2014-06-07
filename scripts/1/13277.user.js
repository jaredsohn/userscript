// ==UserScript==
// @name           StudiVZ: Gemeinsame Freunde ausblenden
// @description    Blendet in der Freundeliste von anderen Personen die gemeinsamen Freunde aus. (an/aus toggeln leider noch nicht möglich; leere Seiten bei 100% Übereinstimmung)
// @include        *studivz.net/*
// @include        *studivz.de/*
// @include        *studiverzeichnis.de/*
// ==/UserScript==

if(window.location.href.match(/\/friends\.php\?ids=.*category_id=0/i))
{
  var t_friends = document.evaluate(
    "//div[@class='friendtable']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
  if(t_friends.snapshotLength>0)
  {
    try
    {
      for(var i=0; i < t_friends.snapshotLength; i++)
      {
        var addfriendlink=t_friends.snapshotItem(i).getElementsByTagName("a");
        if(addfriendlink.length>0 && addfriendlink[addfriendlink.length-1].href.match(/addfriend\.php.*del=1/i))
        {
          t_friends.snapshotItem(i).style.display="none";
        }
      }
    }
    catch( e ) { }
  }
  else
  {
    // Comment out the following line to avoid alerts
    alert("No Friends?");
  }
}
