// ==UserScript==
// @name           Spiegel.de pure content
// @namespace      *
// @include        http://www.spiegel.de/*/*
// ==/UserScript==

function set_body_left() {
   var ebody = document.getElementsByTagName("body");
   for (var i = 0; i <= (ebody.length - 1); i++) {
      var el = ebody[i];
       if (el) {
         el.style.marginLeft = '100px';
        }
    }
}

function change_alignment(id) {
        var el = document.getElementById(id);
       if (el) {
         el.style.textAlign = 'justify';
        }
}

function change_width(id, width) {
        var el = document.getElementById(id);
       if (el) {
           el.style.width = width;
           el.style.minWidth = width;
        }
}

function remove_node_id(id) {
       var el = document.getElementById(id);
       if (el) {
          el.parentNode.removeChild(el);
       }
}

function remove_node_class(tagname, cla) {
   var ebody = document.getElementsByTagName(tagname);
   for (var i = 0; i <= (ebody.length - 1); i++) {
      var el = ebody[i];

      if (el.className == cla) {
         el.parentNode.removeChild(el);
      }
   }
}

function remove_link_target(targ) {
   var ebody = document.getElementsByTagName("a");
   for (var i = 0; i <= (ebody.length - 1); i++) {
      var el = ebody[i];

      if (el.target == targ) {
         el.parentNode.removeChild(el);
      }
   }
}

function move2end_node_class(tagname, classtype, bodyid) {
   var ebody = document.getElementsByTagName(tagname);
   var root = document.getElementById(bodyid);

   for (var i = 0; i <= (ebody.length - 1); i++) {
      var el = ebody[i];

      if (el.className == classtype) {
         if (root.lastChild.nodeName == "P") { root.removeChild(root.lastChild); }
         root.appendChild(el);
      }
   }
}

set_body_left();

change_width("spMainContent", "773px");
change_width("spArticleBody", "773px");
change_alignment("spMainContent");

remove_node_id("spColumnRight");
remove_node_id("spFooter");
remove_node_id("spBreadcrumbNoLine");
remove_node_id("spFontSizing");
remove_node_class("div", "spSpecialArticles");
remove_node_class("div", "spAssetalign");
remove_node_class("div", "spArticleCredit");
remove_node_class("div", "spRessortTeaserBottom");
remove_node_class("p", "spAutorenzeile");
remove_node_class("div", "spAsset");
remove_node_class("div", "spAsset spAssetalign");
remove_node_class("div", "spAsset spAssetAlign");
remove_node_class("div", "spTagbox spAssetAlignleft");
remove_node_class("div", "spAsset spAssetAlign");
remove_node_class("div", "spAsset spAssetAlignleft");
remove_node_class("div", "spAsset spAssetalignleft");
remove_node_class("div", "spAsset spAssetAligncenter");
remove_node_class("div", "spBlogBox");
remove_node_class("div", "spMPCBox spMPCBoxTicker");
remove_node_class("div", "spRessortTeaserBoxBottom");
remove_node_class("div", "spMPCBox spMPCBoxHintergrund spAsset");
remove_link_target("Boerse")
move2end_node_class("div", "spPhotoGallery", "spArticleBody");