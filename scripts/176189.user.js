// ==UserScript==
// @name        Strims.pl shortURL
// @namespace strims_shorturl
// @downloadurl   http://strims.swimg.pl/js/Shorturl.user.js
// @updateurl http://strims.swimg.pl/js/Shorturl.meta.js
// @description Pokazuje diva z krótkim adresem URL w sidebarze
// @include     *strims.pl*
// @version     1.1
// ==/UserScript==
if (typeof $ == 'undefined')
{
  if (unsafeWindow.jQuery)
  {
    var $ = unsafeWindow.jQuery;
    main();
  } else
  {
    addJQuery(main);
  }
} else
{
  main();
}

function addJQuery(callback)
{
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}
function url(){
    var url = window.location.pathname;
    var reg = url.match(/\/([w]|[d]|[g]|[t])\/([0-9a-zA-Z]+)/g);

    if( !reg ){
        reg = url;
    }
    
    return reg;
}
function main(){
      $('<div />')
        .html('ShortURL:')
        .addClass('box small border border_orange background_yellow')
        .attr('id', 'shorturl')
        .css('fontWeight', 'bold')
        .prependTo($('.column.right'));
    
        $(document.createElement('input'))
            .val('http://stri.ms' + url())
            .css({ 'margin-left' : '10px', 'font-weight' : 'normal'  })
            .addClass( 'input_text' )
            .attr('id', 'shorturl_input')
            .appendTo($("#shorturl"))
            .hover( function(){ $("#shorturl_input").select(); } );
}
 
