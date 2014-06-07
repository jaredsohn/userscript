// ==UserScript==
// @name          Blogger Trackback
// @description   Enable sending trackback pings from within Blogger (Version: 0.11)
// @namespace     http://singpolyma-tech.blogspot.com/
// @include       http://www.blogger.com/post-*
// @include       http://blogger.com/post-*
// @include       http://blogger.com/blog-this.g*
// @include       http://blogger.com/publish-body*
// @include       http://www.blogger.com/blog-this.g*
// @include       http://www.blogger.com/publish-body*
// ==/UserScript==

//Author: Stephen Paul Weber a.k.a. Singpolyma <http://singpolyma-tech.blogspot.com/>
//Much of this code was borrowed from similar code by Johan Sundström <http://ecmanaut.blogspot.com/>

if( location.pathname.match( 'publish-body.g' ) ) {
   showTrackback();
} else {
   add_events();
}

function trap( node, event, handler )
{
  if(!node || typeof(node) == 'undefined') return;
  var original = node.getAttribute( 'on'+event );
  if( original )
    node.setAttribute( 'on'+event, 'setTimeout("'+original+'",100)' );
  node.addEventListener( event, handler, false );
}

function $()
{
  for( var i = 0, node; i < arguments.length; i++ )
    if( node = document.getElementById( arguments[i] ) )
      return node;
}

function getFields()
{
  var nodes = { head : $( 'titles', 'otherFields' ),
		body : $( 'textarea', 'postBody' ),
		title: $( 'f-title', 'title' ),
		link : $( 'f-address', 'url' ),
		draft: $( 'saveDraft' ),
		save : $( 'publishPost' ) }, toolbar, tds, i;
  if( !nodes.draft && (toolbar = $( 'toolbar' )) )
  {
    tds = toolbar.getElementsByTagName( 'td' );
    for( i=0; i<tds.length; i++ )
      if( tds[i].textContent.match( /draft/i ) )
	nodes.draft = tds[i];
      else if( tds[i].textContent.match( /publish/i ) )
	nodes.save = tds[i];
  }
  return nodes;
}

function stripHTML(str) {
   if(!str) return '';
   return str.replace(/(<([^>]+)>)/ig,"");
}//end striphtml

function getName()
{
  var name = $( 'blogname' );
  if( name )
    name = name.textContent;
  else if( name = $( 'stuffform' ) )
  {
    name = name.elements.namedItem( 'selBlog' );
    name = name[name.selectedIndex].text;
  }
  else
    return;
  return name;
}

function saveData(e) {
   var divs = getFields();
   var txt = $( 'textarea' ).value;
   txt = stripHTML(txt);
   txt = txt.substr(0,200);
   txt += '...';
   var data = { 'title' : divs.title ? divs.title.value : '',
	             'excerpt' : txt,
                'blog_name' : getName()
              };
   GM_setValue( 'postdata-trackback-title', data.title );
   GM_setValue( 'postdata-trackback-excerpt', data.excerpt );
   GM_setValue( 'postdata-trackback-blog_name', data.blog_name );
}//end function saveData

function add_events() {
   var divs = getFields();
   trap( divs.save, 'click', saveData );
}//end function add_events
   
function blogger_trackback_onload(data) {
   var out = document.getElementById('blogger_trackback_status');
   try {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data.responseText, "application/xml");
      var errn = xmlDoc.getElementsByTagName('error');
      if(errn[0] != 0) {
         var errm = xmlDoc.getElementsByTagName('message');
         out.innerHTML = errm[0].innerText;
      } else {
         out.innerHTML = 'Trackback Complete';
      }//end if-else errn != 0
   } catch(e) {
      out.innerHTML = 'Trackback Complete';
   }//end try-catch
}//end function blogger_trackback_onload

function getLinkByTarget( target )
{
  var i, l = document.links;
  for( i=0; i<l.length; i++ )
    if( l[i].target == target )
      return l[i];
}

function link( parent, node, match, base )
{
  var a = document.createElement( 'a' );
  a.href = base + (a.innerHTML = match[0]);
  var x = node.splitText( match.index );
  x.splitText( match[0].length );
  parent.replaceChild( a, x );
  return a.href;
}

function parseDetails( node, base )
{
  var i, c = node.childNodes, match, url, t;
  for( i=0; i<c.length; i++ ) {
    if( (c[i].nodeName == '#text') &&
        (match = /\S+/.exec( c[i].nodeValue )) )
    {
      t = link( node, c[i], match, base );
      if( match[0].match( '/' ) ) url = t;
    }
  }//end for
  return url;
}

function blogger_trackback_submit() {
   var trackbackurl = document.getElementById('blogger_trackback_url');
   var title = GM_getValue('postdata-trackback-title');
   var excerpt = GM_getValue('postdata-trackback-excerpt');
   var blog_name = GM_getValue('postdata-trackback-blog_name');
   var url = GM_getValue('postdata-trackback-url');
   
   var out = document.getElementById('blogger_trackback_status');
   out.innerHTML = '<i>Sending Trackback Ping...</i>';
   
   GM_xmlhttpRequest({'method':'POST',
                      'url':trackbackurl.value,
                      'headers':{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
                      'onload':blogger_trackback_onload,
                      'data':'url='+encodeURIComponent(url)
                            +'&title='+encodeURIComponent(title)
                            +'&blog_name='+encodeURIComponent(blog_name)
                            +'&excerpt='+encodeURIComponent(excerpt)
                    });
   return false;
}//end function blogger_trackback_submit

function accesskey( node, key, keys, color )
{
  var reserved = keys || { 'd':1, 'o':1, '.':1 };
  var accesskey = 'Alt+'; // browsers have different ideas about accesskeys
  if( navigator.userAgent.match( /opera/i ) )
    accesskey = 'Shift+Esc followed by ';
  else if( navigator.userAgent.match( /macintosh/i ) )
    accesskey = 'Control+';

  if( !key )
  {
    var letters = node.textContent.replace( /\W/g, '' ), i; // first word char
    for( i=0; i<letters.length; i++ )
    {
      key = letters.charAt( i ); // will this letter do?
      if( !reserved[key.toLowerCase()] ) break; // found the first free letter
      key = null; // try, try again!
    }
    if( !key ) return reserved; // too bad; don't do anything at all.
  }
  underline( node, key );
  reserved[key.toLowerCase()] = 1; // taken!
  node.title = 'Hotkey: '+ accesskey + key.toLowerCase(); // usability hint
  node.accessKey = key.toUpperCase();
  if( color ) node.style.color = color; // colorize the link as applicable
  return reserved;
}

function underline( node, key )
{
  if( !node ) return;
  var character = new RegExp( '^(<[^>]*>)*([^<'+ key +']*)*('+ key +')', 'i' );
  var hasOne = getStyle( node, 'textDecoration' ).match( 'underline' );
  var style = hasOne ? 'border-bottom:1px solid' : 'text-decoration:underline';
  var underlined = '$1$2<span style="'+ style +';">$3</span>';
  node.innerHTML = node.innerHTML.replace( character, underlined );
}

function getStyle( node, style )
{
  if( node.currentStyle )
    return node.currentStyle[ style ];
  if( window.getComputedStyle )
    return getComputedStyle( node, null )[ style ];
  return '';
}

function showTrackback() {
   
   var done = $( 'verboseStatus' );
   if(!done )
   { // reddish debug flashing:
     // $('body').style.background = '#F' + pad(parseInt(100*Math.random()));
     return setTimeout( showTrackback, 200 );
   }
   var node = done.nextSibling;
   if( node.nodeName == '#text' )
     node = node.nextSibling; // the <p> tag containing View Blog
   
   var url = false;
   
   for(var i=0; i<node.childNodes.length; i++) {
      if(stripHTML(node.childNodes[i].innerHTML) == 'View Post' || node.childNodes[i].innerHTML == 'View P<span style="border-bottom: 1px solid;">o</span>st') {
         url = node.childNodes[i].href;
         break;
      }//end if View Post
   }//end for childNodes
   
   if(!url) {
      var base = getLinkByTarget( '_blogView' ).href.replace( /\/?$/, '/' );
      url = parseDetails( done, base );
      if(!url) {
         alert('URL not found.  Trackback will not load.');
         return false;
      }//end if ! url
      var perm = document.createElement( 'a' );
      perm.href = url;
      perm.appendChild( document.createTextNode( 'View Post' ) );
      node.insertBefore( perm, node.firstChild );
      node.insertBefore( document.createTextNode( ' ' ), node.firstChild );
      accesskey( perm, 'o' );
   }//end if ! url
   
   GM_setValue( 'postdata-trackback-url', url );
   
   var trackbackform = document.createElement('form');
   trackbackform.id = 'blogger_trackback_form';
   trackbackform.style.marginTop = '3px';
   trackbackform.setAttribute('onsubmit','return false;');
   node.appendChild(trackbackform);
   trackbackform.addEventListener('submit', blogger_trackback_submit, false);
   
   var trackbackurl = document.createElement('input');
   trackbackurl.type = 'text';
   trackbackurl.id = 'blogger_trackback_url';
   trackbackform.appendChild(trackbackurl);
   
   var trackbacksubmit = document.createElement('input');
   trackbacksubmit.type = 'submit';
   trackbacksubmit.value = 'Trackback';
   trackbacksubmit.id = 'blogger_trackback_submit';
   trackbackform.appendChild(trackbacksubmit);
   
   var trackbackstatus = document.createElement('div');
   trackbackstatus.id = 'blogger_trackback_status';
   trackbackform.appendChild(trackbackstatus);
}//end function show trackback