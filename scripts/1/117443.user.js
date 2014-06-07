// ==UserScript==
// @name        Url Replacer xmedia360.hu
// @namespace   http://xmedia360.hu
// @version     v0.1
// @grant       none
// ==/UserScript==

var words = {  

    "Érdekes cikkek":"Új üzenet írás",
    "Kapcsolat":"Bejövő Üzenetek",
    "Képtár":"Kimenő Üzenetek",

    "":""};


    // read
    String.prototype.prepareRegex = function() {
        return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
    };

    // tag
    function isOkTag(tag) {
        return (new RegExp("(," + tag + ",) | (," + tag + "$)", "g").test(",pre,blockquote,code,input,button,textarea")) == false;
    }

    // convert word
    var regexs=new Array(),
        replacements=new Array();
    for(var word in words) {
        if(word != "") {
            regexs.push(new RegExp(word.prepareRegex().replace(/(\\)?\*/g, function(e) {return ((e !== "\\*") ? "[^ ]*" : "*");}), "gi"));
            replacements.push(words[word]);
        }
    }

    //
    var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="", len=regexs.length;
    for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
        if(isOkTag(this_text.parentNode.tagName) && (text=this_text.textContent)) {
            for(var x=0; x<len; x++) text = this_text.textContent = text.replace(regexs[x], replacements[x]);
        }
    }


//replace url or link

    var links = document.links;
    var link;
    for(var i=links.length-1; i >=0; i--){
      link = links[i];
      link.href = link.href.replace("http://xmedia360.hu/news.php?item.475.1", 'http://xmedia360.hu/e107_plugins/pm/pm.php?send');
      link.href = link.href.replace("http://xmedia360.hu/page.php?10", 'http://xmedia360.hu/e107_plugins/pm/pm.php?inbox');
      link.href = link.href.replace("http://xmedia360.hu/e107_plugins/sgallery/gallery.php?list.2.1", 'http://xmedia360.hu/e107_plugins/pm/pm.php?outbox');
    }