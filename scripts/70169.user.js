// ==UserScript==
// @name           Download Thread
// @namespace      what.cd
// @include        http*://*what.cd/forums.php?action=viewthread*
// ==/UserScript==

if ( window.location.hash == '#download-thread' )
{
  // Change media="screen" CSS
  var head = document.getElementsByTagName('head')[0];
  var style = document.getElementsByTagName('link')[25];
  style.href = 'http://dl.dropbox.com/u/124437/whatToPrint.css?v='+parseInt(new Date().getTime()/1000);

  // Add media="print" CSS for printing (to PDF I hope!)
  var printStyle = document.createElement('link');
  printStyle.href = 'http://dl.dropbox.com/u/124437/whatToPrint-print.css?v='+parseInt(new Date().getTime()/1000);
  printStyle.rel = 'stylesheet';
  printStyle.type = 'text/css';
  printStyle.media = 'print';
  head.insertBefore( printStyle, style);

  // Get HTML structure info
  var body = document.getElementsByTagName("body")[0];
  var content = document.getElementById('content');

  // Get general thread info
  var parentForum = content.getElementsByTagName('a')[1].childNodes[0].nodeValue;
  var topic = content.getElementsByTagName('a')[1].nextSibling.nodeValue.replace('>','').trim();
  var params = getQueryParams(window.location.toString());
  var page = params['page'];

  // Add thread heading
  var h1 = document.createElement('h1');
  h1.appendChild(document.createTextNode(parentForum+' > '+topic+' (page '+page+')'));
  body.appendChild(h1);

  // Make post objects and put into posts[] list
  var tables = document.getElementsByTagName('table');
  var posts;
  var colHeadSpan;
  var colHeadTD;
  var post = { 'id':'', 'date':'', 'username':'', 'text':'' };
  var posts = [];
  for ( i in tables )
  {
    if ( tables[i].id.search(/post[0-9]+/) == 0 )
    {
      post = { 'id':'', 'date':'', 'username':'', 'text':'' };

      // Get post id
      post.id = tables[i].id.replace('post','');

      // Get post date
      post.date = tables[i].getElementsByTagName('span')[1].title;

      // Get username
      post.username = tables[i].getElementsByTagName('strong')[0].getElementsByTagName('a')[0].childNodes[0].nodeValue;

      // Get post content
      post.html = document.getElementById('content'+post.id).innerHTML;
      post.text = post.html;
      post.text = post.text.replace(/<br>\n<br>/g,"\n"); // br2nl
      post.text = post.text.replace(/<br>/g,"\n");
      post.text = post.text.replace(/<blockquote>/g,'[quote]'); // show quote info
      post.text = post.text.replace(/<\/blockquote>/g,'[/quote]');
      post.text = post.text.replace(/<(?:.|\s)*?>/g,''); // strip html

      posts.push(post);
    }
  }


  // Remove original content now that we're done with scraping it
  body.removeChild(document.getElementById('wrapper'));

  // Declare for post content generation
  var h2;
  var div;
  var text;

  // Create export to .txt textarea
  var exportTXT = document.createElement('div');
  exportTXT.id = 'export-txt';

  var exportTXTheader = document.createElement('h3');
  exportTXTheader.appendChild(document.createTextNode("Copy & Paste to .txt (Note: this textarea won't print)"));
  exportTXT.appendChild(exportTXTheader);

  var exportTXTarea = document.createElement('textarea');
  exportTXTarea.addEventListener( 'click', function(){ exportTXTarea.focus(); exportTXTarea.select(); }, false );
  for ( i in posts )
  {
    // Change the post header to just relevant information
    h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(posts[i].username+" on "+posts[i].date));
    body.appendChild(h2);

    div = document.createElement('div');
    text = posts[i].text.replace(/\[quote\]/g, '<blockquote>'); // show quote info
    text = text.replace(/\[\/quote\]/g, '</blockquote>'); // show quote info

    div.innerHTML = posts[i].html;
    //div.appendChild(document.createTextNode(text));
    body.appendChild(div);

    body.appendChild(document.createElement('hr'));

    exportTXTarea.appendChild(document.createTextNode(posts[i].username+" on "+posts[i].date));
    exportTXTarea.appendChild(document.createTextNode(posts[i].text));
    exportTXTarea.appendChild(document.createTextNode("\n\n"+'----------'+"\n\n"));
  }
  exportTXT.appendChild(exportTXTarea);
  body.appendChild(exportTXT);
}

else
{
  // Display Download Thead txt
  var displayDT = document.createElement('a');

  // Set link to [Download Thread]
  var DTlink = '';
  if ( window.location.hash )
    DTlink = window.location.toString().replace(window.location.hash,'#download-thread');
  else
    DTlink = window.location.toString()+'#download-thread';

  displayDT.href = DTlink;
  displayDT.target = '_new'; // target feels so bad :(
  displayDT.appendChild(document.createTextNode('[Download Thread]'));
  displayDT.setAttribute('style', 'float:right;');
  var linkbox = document.getElementsByClassName('linkbox')[0];
  if ( linkbox.getElementsByTagName('div')[0] )
  {
    displayDT.style.marginLeft = '-75px'; // keep [Report Thread] centered
    linkbox.getElementsByTagName('div')[0].appendChild(displayDT);
  }
  else
  {
    linkbox.style.marginBottom = '10px';
    linkbox.appendChild(displayDT);
  }
}


String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

function getQueryParams ( sQuery )
{
  sQuery = sQuery.replace(/#\S+/,''); // Strip hash tag

  var aParams = new Object ();
  if ( !sQuery )
    return aParams;
  var aPairs = sQuery.split( /[&]/ );
  for ( var i=0; i < aPairs.length; i++ )
  {
    var aKeyVal = aPairs[i].split('=');
    if ( !aKeyVal || aKeyVal.length != 2 )
      continue;
    var sKey = unescape( aKeyVal[0] );
    var sVal = unescape( aKeyVal[1] );
    sVal = sVal.replace(/\+/g, ' ');
    aParams[sKey] = sVal;
  }
   return aParams;
}
