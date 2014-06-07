// ==UserScript==
// @name          Facepunch Live Threads (no popup)
// @description   Facepunch Live Threads 1.01
// @include       http://facepunch.com/showthread.php?*
// @include       http://*.facepunch.com/showthread.php?*
// ==/UserScript==

/* lightweight Chrome compatibility thanks to a2h */

if (typeof(google) == 'undefined')
{
	ChromeKludge();
}
else
{
	// http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('(' + ChromeKludge + ')();'));
	document.head.appendChild(script);
}

function ChromeKludge()
{
  (function($) {

    var LastPost = 0;
    var RequestNum = 0;

    if (!window.console) console = {};
    console.log = console.log || function(){};
    console.warn = console.warn || function(){};
    console.error = console.error || function(){};
    console.info = console.info || function(){};

    function AddPost( post, iPostCount )
    {	
      var cur_threadid = document.getElementsByName("searchthreadid")[0].value;

      if (cur_threadid == post.threadid && RequestNum > 1) {
        reallyAddPost(post)
      }
      
    }

    function reallyAddPost(post)
    {
      var post_url = 'http://www.facepunch.com/showpost.php?p=' + post.postid;
      var post_content = '';
      var begin_string = '<!-- post #' + post.postid + ' -->';
      var end_string =   '<!-- / post #' + post.postid + ' -->';
      var spacer_div =   '<div id="edit' + post.postid + '" class="spacer">\n';
      var after_spacer = '<div class="postbitold"';

      var req = new XMLHttpRequest();
      req.open('GET', post_url, true);
      req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
          if(req.status == 200) {
            post_content = req.responseText;
            post_content = post_content.substring(post_content.indexOf(begin_string), post_content.indexOf(end_string));
            post_content = post_content.substr(post_content.indexOf(begin_string), begin_string.length) + spacer_div + post_content.substr(after_spacer);
            console.log('POST CONTENT:\n' + post_content);
            $("#lastpost").before(post_content);
          }
          else
            dump("Error loading page\n");
        }
      };
      req.send(null);
    }

    function OnRequestComplete( data, delay )
    {
      $.each( data, function(i,item)
              {
                AddPost(item, i);
                LastPost = Math.max( item.postid, LastPost );
              });

      if ( data.length == 0 )
      {
        delay = delay + 1000;
      }
      else
      {
        delay = 5000;
      }

      setTimeout( function(){ DoRequest( delay ) }, delay );
    }
    
    function DoRequest( delay )
    {
      RequestNum = RequestNum + 1;
      console.log(RequestNum);
      $.getJSON( '/fp_ticker.php?aj=1&startpost='+LastPost+'&requestnum='+RequestNum, function( r ) { OnRequestComplete( r, delay ) } );
    }

    $(document).ready(function() {
      DoRequest( 5000 );
    });

  })(typeof(google) == 'undefined' ? unsafeWindow.jQuery : jQuery);

}