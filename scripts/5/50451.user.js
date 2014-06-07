// ==UserScript==
// @name          Delicious CSS
// @namespace     http://www.openfusion.net/tags/delicious_css
// @description   Apply user stylesheets defined using delicious tags
// @include       *
// @author        Gavin Carr <gavin@openfusion.com.au>
// @version       0.02
// ==/UserScript==

// This user script is a hack to allow the user to define simple user 
// stylesheets to apply to a domain using delicious tags. 


// Usage: create a bookmark for top-level domain, tag it with 
// 'delicious_css', and 'delicious_css=<domain>', and then add any number 
// of delicious_css style tags. Style tags have the format 
// 
//    ELEMENT[,ELEMENT]=STYLE[;STYLE]
//
// where ELEMENT is a CSS selector (e.g. div#foo, p.bar etc.), and STYLE is
// one or more css styles (without spaces!), separated by semicolons e.g.
// 
//   div#sidebar=display:none div#content=width:80%;line-height:20px
//
//
// A bookmarklet to help with this is:
//
//   javascript:(function(){f='http://delicious.com/save?url='+encodeURIComponent(window.location.host)+'&title='+encodeURIComponent(window.location.host)+'&tags=delicious_css%2520delicious_css%253d'+encodeURIComponent(window.location.host)+'&v=5&';a=function(){if(!window.open(f+'noui=1&jump=doclose','deliciousuiv5','location=yes,links=no,scrollbars=no,toolbar=no,width=550,height=550'))location.href=f+'jump=yes'};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})()
//   
// also available (more usefully) at:
// 
//   http://www.openfusion.net/web/delicious_css
//
// This bookmarklet requires the following greasemonkey script installed as 
// well to work:
//
//   http://userscripts.org/scripts/show/37076
//


(function() {

  // Set the following to a list of one or more delicious usernames whose 
  // styles you want to use. You should typically add your own username if
  // you have one, typically to the end of the list (before the final ']').
  var usernames = [ 'gavincarr' ];

  // Log debug output to error console
  var DEBUG_LOG = 1;

  // ----------------------------------------------------------------------
  // Shouldn't need to change anything below here

  // Do nothing for anything except top-level windows
  if (window.top && window.top != window) return;

  var domain = window.location.host;
  var elements = [];
  for (u = 0; u < usernames.length; u++) {
    var deliciousURL = "http://feeds.delicious.com/v2/json/" + usernames[u] +
      "/delicious_css=" + window.location.host;
    if (DEBUG_LOG) GM_log("fetching " + deliciousURL);

    GM_xmlhttpRequest({
      method: 'GET',
      url: deliciousURL,
      onload: function(response) {
        var data, tag, match, squatter_redirect, style;
        if (response.status == 200) {
          data =  eval('(' + response.responseText + ')');
          if (data.length > 0 && data[0].t && typeof(data[0].t) == 'object') {
            // Iterate over tags, looking for style tags
            for (i in data[0].t) {
              tag = data[0].t[i];
              if (match = tag.match(/^(.+)=(.+:.+)$/)) {
                elements.push(match[1].replace(/%20/g,' ') + ' { ' + match[2] + '; }');
              }
            }
          }
          // If style elements found, insert into <head>
          if (elements.length) {
            if (DEBUG_LOG) GM_log("styles inserting:\n" + elements.join("\n"));
            style = document.createElement('style');
            style.className = 'delicious_css';
            style.setAttribute('type', 'text/css');
            style.setAttribute('media', 'all');
            style.innerHTML = '<!--\n' + elements.join("\n") + '\n-->';
            document.getElementsByTagName('head')[0].appendChild(style);
          }
        }
      },
    });
  }
})()

