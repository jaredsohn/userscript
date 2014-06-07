// ==UserScript==
// @name       Joyreactor kill cats
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description Remove cats from joyreactor by tags
// @match      http://joyreactor.cc/*
// @copyright  2012+, Dylfin
// ==/UserScript==

if(String.prototype.contains===undefined){
  String.prototype.contains = function(str, startIndex) { return -1 !== String.prototype.indexOf.call(this, str, startIndex); };
}
function joyKillCatsClass() {
}

joyKillCatsClass.prototype = {
    start: function(){
        jQuery('.postContainer').each(function(index1, element){
            var remove = false;
            var tag = jQuery('.taglist a',element).each(function(index2, tag_link){
                if(remove) return;
                if(tag_link.text.contains('кот')) {
                    console.log(tag_link);
                    remove = true;
                }
            });
            if(remove) jQuery(element).remove();
        });
    }
};

document.joyKillCats = new joyKillCatsClass();
document.joyKillCats.start();