// ==UserScript==
// @name           bookmarkMenuDevidedEach30.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @include        main
// @author         Alice0775
// @note           ブックマーク数が多く, メニューポップアップがスクロールするような場合に, ポップアップを分割して表示してみるテスト。
// @version        2008/06/19 15:00 タブで全て開くを有効に
// ==/UserScript==
// @version        2008/06/19 12:00

(function(){
  // -- config --
  var maxnn = 30;  //一度に表示するブックマーク+セパレータの数
  // -- config --

/*
  BookmarksMenu.validOpenInTabsMenuItem_old = BookmarksMenu.validOpenInTabsMenuItem;
  BookmarksMenu.validOpenInTabsMenuItem = function (aTarget)
  {
    while(aTarget){
      try{
        var rParent = RDF.GetResource(aTarget.parentNode.id);
        break;
      }catch(e){
        aTarget = aTarget.parentNode.parentNode;

      }
    }
    BookmarksMenu.validOpenInTabsMenuItem_old(aTarget);
  }

*/

  var popup = document.getElementById('bookmarksMenuPopup');
  popup.addEventListener('popupshowing',showpopup,false);

  function showpopup(event){
    var popup = event.target;
    var len = popup.childNodes.length
    if(len<=maxnn)return;
    if(popup.hasAttribute('treat'))return;

    var menu = popup.parentNode.cloneNode(false);
    var id = popup.parentNode.id;
    menu.setAttribute('label','\uFEFF\u7EE7\u7EED...');
    menu.setAttribute('dummy',true);
    menu.setAttribute('class','bookmark-item');
    menu.setAttribute("ondragenter","if (event.target == this){this.lastChild.showPopup(this.lastChild);}");
    menu.setAttribute("ondragexit","if (event.target == this){this.lastChild.hidePopup()}");

    //var menupopup = popup.cloneNode(false);
    var menupopup = document.createElement('menupopup');
    menupopup._resultNodeBack = popup._resultNodeBack ? popup._resultNodeBack : popup._resultNode;
    for(var j=maxnn; j<len; j++){
      var menus = popup.childNodes[maxnn];
      if(menus.getAttribute("oncommand") == "PlacesUIUtils.openContainerNodeInTabs(this.parentNode._resultNode, event);"){
        menus.setAttribute("oncommand", "PlacesUIUtils.openContainerNodeInTabs(this.parentNode._resultNodeBack, event);")
      }
      menupopup.appendChild(menus);
    }
    menu.appendChild(menupopup);
    popup.appendChild(menu);
    popup.setAttribute('treat',id);
  }
  popup.addEventListener('popuphiding',hidepopup,false);

  function hidepopup(event){
    event.stopPropagation();
    //event.preventDefault();
    var popup = event.target;

    var dummymenu = null;
    var len = popup.childNodes.length;
    for(var i= len-1;i>-1 && i>len-4;i--){
      var menu = popup.childNodes[i];
      if(menu.hasAttribute('dummy')){
        dummymenu = menu;
        break;
      }
    }
    if(!dummymenu)return;

    var dummypopup = dummymenu.firstChild;
    while(dummypopup.firstChild){
       var objElems = document.evaluate('*[@id="' + dummypopup.firstChild.id + '"]', popup, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
       if(objElems.snapshotLength==0)
         popup.appendChild(dummypopup.firstChild);
       else
         dummypopup.removeChild(dummypopup.firstChild);
    }
    dummymenu.removeChild(dummypopup);

    popup.removeChild( dummymenu);
    popup.removeAttribute('treat');
  }

})();
