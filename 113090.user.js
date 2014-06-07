// ==UserScript==
// @name sickyd
// @description Redditscriptthingy
// ==/UserScript==

var selected = 0;
var loadingMore = false;
var padding = 5;
$(document).ready(function() {
   console.log("loaded");
   styleit();
   $('body').keypress(function(event) {
      switch(event.which)
      {
      case 106: // j = next
         selected ++;
         if ($('#siteTable .thing').length === selected + 1 && !loadingMore) {
            loadingMore = true;
            loadMore(selected);            
         }
         break;
      case 107: // k = previous
         if (selected > 0)
            selected --;
         break;
      case 118: // v = view now
         var link = $($('#siteTable .thing')[selected]).find('.title a').attr('href');
         var newWindow = window.open(link, '_blank');
         break;
      case 111: // o = open background tab
         var link = $($('#siteTable .thing')[selected]).find('.title a').attr('href');
         var newWindow = window.open(link, '_blank');
         window.focus();
         break;
      case 99: // c = comments
         var link = $($('#siteTable .thing')[selected]).find('.comments').attr('href');
         var newWindow = window.open(link, '_blank');
         break;
      case 117: // u = up vote
         $($('#siteTable .thing')[selected]).find('.up').click();
         break;
      case 100: // d = down vote
         $($('#siteTable .thing')[selected]).find('.down').click();
         break;
      case 43: // + = increase padding
         padding += 20;
         break;
      case 95: // - = decrease padding
         padding += 20;
         break;
      case 115: // s = share article
         var shares = $($('#siteTable .thing')[selected]);
         if ( shares.find('.child>form').length == 0) {
            console.log("share");
            $($(shares).find('.share-button>a')[0]).click();
         } else {
            console.log("cancel");
            $($(shares).find('.share-button>a')[1]).click();
         }
         break;
      case 97: // a = save article
         $($('#siteTable .thing')[selected]).find('.save-button>span>a').click();
         break;
      case 104: // h = hide article
         $($('#siteTable .thing')[selected]).find('.hide-button>span>a').click();
         padding += 10;
         break;
      default:
         console.log(event.which); 
      }
      styleit();      
   });
});

function styleit() {
   //Reset all other styles
   $($('#siteTable .thing')).css({'border-style':'none'});
   var nonjqueryObject = $('#siteTable .thing')[selected];
   if (nonjqueryObject == null)
      return;
   var selectedThing = $(nonjqueryObject);
   selectedThing.css({'border-style':'dashed', 'border-color':'grey','border-width':'1px'  });
   
   //Check if off screen
   if ($("body").scrollTop() + $(window).height() < selectedThing.position().top + selectedThing.height() + padding) {
      //Off the bottom
      var scrollTo = selectedThing.position().top - $(window).height() + selectedThing.height() + padding;
      $('html, body').stop().animate({scrollTop: scrollTo}, 400);
   } else if (selectedThing.position().top < $("body").scrollTop()) {
      //off the top
      $('html, body').stop().animate({scrollTop: selectedThing.position().top}, 400);
   }
}

function loadMore(nextCount) {
   //?count=25&after=t3_h7048
   var context = $($('#siteTable .thing')[nextCount]);
   var classes = context.attr('class');
   var split = classes.split('-', 2);
   split = split[1].split(' ', 2);
   var id = split[0];
   console.log('running after ' + id);
   $(".nextprev").prepend("<div class='loading'>Loading more.....<br></div>");
   $.ajax({
      url: "/?count=25&after="+id,
      context: context,
      success: function(data){
         loadingMore = false;
         console.log('appending...');
         var topped = data.split('<div id="siteTable" class="sitetable linklisting">')[1];
         topped = topped.split('</div><p class="nextprev">')[0];
         $('#siteTable').append(topped);
         $(".loading").remove();
         styleit();
         
      }
   });
}
