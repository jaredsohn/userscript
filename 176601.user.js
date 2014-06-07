// ==UserScript==
// @name           Strims.pl - InfiniteScrolling
// @namespace      strims_scrolling
// @downloadurl    http://userscripts.org/scripts/source/176601.user.js
// @updateurl      http://userscripts.org/scripts/source/176601.meta.js 
// @description    Laduje kolejne strony tresci/wpisow/komentarzy, gdy dojdziemy do konca aktualnej (brak potrzeby klikania)
// @include        *strims.pl*
// @version        1.1
// ==/UserScript==
// sprawdza czy uzytkownik jset na samym dole
$(window).scroll(function() {
  var busy = false;
  if( $("div.column.center ul.pagination").length > 0 ){
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100 && !busy) {
        
      busy = true;

      setTimeout(function() {					
		get_data( what() );
	  }, 500);
	  }
   }
});
// pobiera dane do i zastepuje
function get_data( type ){
    var b=$("ul.pagination a.more");
	var c=b.closest("ul.buttons_bar");
	var a=c.find("li.loader");
	var list = type + "_list";
	var pagination = type + "_pagination";
	if(b.hasClass("disabled")){return}
	b.addClass("disabled");
	a.removeClass("no_display");
	$.getJSON(b.attr("href"),function(e){
		if(e.status&&e.status=="OK"){
			$("div.column.center ul."+type).append(e.content[list]);
			$("div.column.center ul.pagination").replaceWith(e.content[pagination])
		}
	}).complete(function(){
		b.removeClass("disabled");
		a.addClass("no_display");
		busy = false;
	})
}
// gdzie sie znajdujemy i co mamy pobrac
function what(){
    var url = window.location.pathname;
    var reg = url.match(/\/([s])\/([0-9a-zA-Z]+)/g);
    var reg_entries = url.match(/\/wpisy/);
    var reg_comments = url.match(/\/komentarze/);
    console.log ( url );
    if( url == '/' ) 
		return "contents";
    if( reg )
    	return "contents"; 
    if( reg_entries) 
		return "entries";
	if( reg_comments)
		return "content_comments";
        
    return false;
}