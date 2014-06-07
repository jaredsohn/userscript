// ==UserScript==
// @name           Bloglines is Delicious
// @namespace      blowery.org
// @include        http://*.bloglines.com/b/view*
// ==/UserScript==

var dojo = unsafeWindow.dojo,
    dijit = unsafeWindow.dijit,
    bl = unsafeWindow.bl,
    console = unsafeWindow.console;

var ext = {
  appendSaveToDelicious: function(node){
    //console.log("appended! %o", arguments);
    var marker = dojo.query(".mark_unread_li", node)[0];
    if(!marker) return;
    var item = document.createElement("li");
    var id = node.getAttribute("subid") + "." + node.getAttribute("itemid") + ".delicious";
    item.innerHTML = "<a href='' class='bl_saveItem' id='" + id + "'>Save to Delicious</a>";
    marker.parentNode.insertBefore(item, marker);
    var link = dojo.query(".bl_title a", node)[0];
    //console.log("link is", link);
    var url = link.href;
    var title = link.textContent;

    item.addEventListener("click", function(e) {
			    e.preventDefault();
			    var labels = window.prompt("Tags?");
			    ext.saveToDelicious(url, title, labels, id); }, false);
  },
  saveToDelicious: function(url, title, labels, link){
    //console.log("saving", arguments);
    GM_xmlhttpRequest({
      method: "POST",
      url: 'https://api.del.icio.us/v1/posts/add?'
	     +'url='+encodeURIComponent(url)
	     +'&description='+encodeURIComponent(title)
	     +'&tags='+labels,
      onload: function(){
	dojo.addClass(dojo.byId(link), "bl_saveOpen");
      },
      onerror: function(){
	console.log("error saving to delicious", arguments);
      }
    });
  }
};

function init() {
  //console.log("init");
  dojo.subscribe(bl.topics.DISPLAY_ITEM_APPEND, ext, "appendSaveToDelicious");
}

dojo.addOnLoad(init);

