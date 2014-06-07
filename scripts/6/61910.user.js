// ==UserScript==
// @author              Reid Weatherly
// @name           	Paint it black
// @namespace      	paint it black
// @description    	Change the background of any webpage to black by clicking a box in the bottom right-hand of your firefox.
// ==/UserScript==


function paintBlack(doc){  
        $(jetpack.tabs.focused.contentDocument)
        .find("body")
        .css({backgroundColor:"black"})
        .animate({opacity:.999});
} 

jetpack.statusBar.append({
  html: "Paint it black?",
  width: 85,
  onReady: function(widget){
    $(widget).click(function(){
      jetpack.notifications.show( "Check the box to have any pages visited be black. Uncheck to not make pages visited black" );
    });
  }
});

jetpack.statusBar.append({
  html: '<input type="checkbox">',
  width: 20,
  onReady: function(widget){
    $("input", widget).click(function(){
      if( this.checked ){
         paintBlack();
         jetpack.tabs.onReady( paintBlack ); 
      }
      else {
         jetpack.tabs.onReady.unbind(paintBlack);
       } 
    });
  }
});
