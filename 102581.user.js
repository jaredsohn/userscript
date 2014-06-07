// ==UserScript==
// @name Google and Yandex anti trojan by bga
// @author Bga
// @version 0.2
// @description 
// ==/UserScript==

(function()
{
  var _fRemoveAttr=function(name)
  {
    return function(v)
    {
      v[name]="";
      v.removeAttribute(name);
    };
  };

  targets=
  [
    {
      url:/^https?:\/\/(www\.)?google\.[a-z]*\/search/,
      xpath:"//a[contains(@onmousedown,'clk(')]",
      _action:_fRemoveAttr("onmousedown")
    },
    {
      url:/^https?:\/\/(www\.)?yandex\.ru\/yandsearch/,
      xpath:"//a[contains(@onmousedown,'rc(') or contains(@onmousedown,'w(')]",
      _action:_fRemoveAttr("onmousedown")
    }
  ];

  var _target=function()
  {
    var i=targets.length;
    var l=""+location;

    while(i--)
    {
      if(targets[i].url.test(l))
        return targets[i];
    }

    return null;
  };

  var target;

  if(target=_target())
  {
    document.addEventListener("DOMContentLoaded",
      function(e)
      {
        var as=document.evaluate(target.xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        var i=as.snapshotLength,_action=target._action;

        //opera.postError(i);
        while(i--)
          _action(as.snapshotItem(i));
      },
      true
    );
  }
})();