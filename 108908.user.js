// ==UserScript==
// @name          Blogger del.icio.us publishing and post categorizing helper (with trackback) for the new Blogger with New Post Editor
// @namespace     http://www.dorajistyle.pe.kr
// @description   Helps keep your notes in sync with your Del.icio.us categories according to the tags you used. Also, if you go to http://pingoat.com/ and/or http://pingomatic.com/, http://pinger.blogflux.com/, http://nyligen.se/pinga.php or http://svensk.lemonad.org/pingman.php after installing this script, and point either ping tool to your blog, you will get additional links here from your publish pages. Note that you need to do this for every blog you want links to separately (figuring you might want to change options for where to ping posts for each blog). Clicking these additional icons will ping the appropriate site, flashing the icon while doing so. If the flashing stops on a semi-transparent button, the pinging failed, if it stops in a solid state, it was successful. The URLs of the "Details..." view also get made into clickable URLs. Trackback functionality is also added. Some of this functionality is also made available via Blogger's BlogThis! page. Version 2.1m.(origin by Singpolyma, and modified version for new post editor by dorajistyle)
// @include       http://*blogger.com/post-*
// @include       http://*blogger.com/blog-this.g*
// @include       http://*blogger.com/publish-confirmation.g*
// @include       http://pingoat.com/index.php?pingoat=go&*
// @include       http://svensk.lemonad.org/pingman.php?url=*
// @include       http://nyligen.se/pinga.php?*url=*
// @include       http://pinger.blogflux.com/pings.php?*url=*
// @include       http://pingomatic.com/ping/?*blogurl=*
// ==/UserScript==

// The tag sites configuration is moved into saveData() for security reasons.
var name;
try{name = getName();}catch(e){}
var site = 'http://del.icio.us/'+ name +'/'+ name +'+${tag}';

var plugins = {
  pingoat:
  { host: /pingoat\.com$/i,
    title: 'Ping at Pingoat.com',
    //image: 'http://pingoat.com/images/pix/pingoat_1.gif',
    style: { padding:'6px 6px 0 0' },
    configure: register_from_queryarg( 'blog_url' ),
    accesskey: 'p'
  },
  pingomatic:
  { host: /pingomatic\.com$/i,
    title: 'Ping at ping-o-matic',
    style: { padding:'6px 8px 10px 0' },
    configure: register_from_queryarg( 'blogurl' ),
    accesskey: 'm'
  },
  blogflux:
  { host: /pinger\.blogflux\.com$/i,
    title: 'Ping at the Blog Flux pinger',
    style: { padding:'6px 8px 11px 0' },
    configure: register_from_queryarg( 'url' ),
    accesskey: 'b'
  },
  nyligen:
  { host: /nyligen\.se$/i,
    title: 'Ping at nyligen.se', method:'POST', extra_data:'pingeling=japp',
    style: { padding:'0 8px 0 0' },
    configure: register_from_queryarg( 'url' ),
    accesskey: 'n'
  },
  svensk_lemonad:
  { //url: 'http://svensk.lemonad.org/pingman.php?url=',
    host: /svensk\.lemonad\.org$/i,
    title: 'Ping at Var \344r du?',
    //image: 'http://svensk.lemonad.org/lib/images/varardu.png',
    style: { padding:'8px 8px 9px 0' },
    configure: register_from_queryarg( 'url' ),
    accesskey: 'h'
  }
};

var images = {
  blogflux:		'data:image/gif;base64,R0lGODdhUAAPAKEAAAQCBASq/PyCBPz+/CwAAAAAUAAPAAACnoSPqcvtD8+YtNqLs968myGE4kgKQ4Cm6sq27gurw1fW4hnn+u7OAGir4XjE4ssHDFGUSyWLkoLiptRJAGp80m5KU2kYRQ2p13IZPM2ukKNm07kWh69SmdUMVrO53uTteSd3dkJIaJent9XV9/XkOIhnJoeYtccE5Acns2aVRlfYKagmphjUNopKZGn6l+oag9QhO0tbixGBm6u7q1AAADs=',
  delicious:		'data:image/gif;base64,R0lGODlhCgAKAPcAAAAAAAAA/93d3f///wAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zAAAACH5BAEAABAALAAAAAAKAAoAAAgrAAcIFBigYMGBBA0GQDhA4UKEDhk6BECRooCLFytaxChAIwCOHTWC9AgyIAA7',
  nyligen:		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAAgCAMAAABZ2rRdAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHjUExURf///7W1tfv7+1xcXFFRUWtra1paWqCgoNXV1WxsbNfX11tbW7a2tpSUlJeXl19fX1lZWaSkpNHR0cbGxlVVVerq6rKysmVlZevr6319fWdnZ2BgYFZWVmZmZl5eXr6+vlNTU7e3t2FhYVRUVFdXV8XFxZiYmJKSkoCAgH9/f7S0tP39/e3t7fj4+Lu7u8PDw21tbX5+fo6OjmlpaXJyctjY2EJCQnBwcOzs7IuLi4ODg729veDg4F1dXVhYWPDw8OLi4tzc3GhoaPb29qKiovn5+cHBwWJiYnNzc9TU1NbW1m5ubtDQ0J+fn9PT02pqaoWFheHh4bq6usLCwvr6+vX19U5OTmRkZJ6enoyMjLi4uOTk5OPj4+/v79vb28jIyMnJyfT09Nra2nV1ddLS0o+Pj1JSUufn53t7e8rKynZ2dt/f3/Hx8ZycnI2NjbOzs5GRkXh4eHp6eqOjo62trUxMTM3NzbCwsJaWlqenp66urmNjY93d3fz8/N7e3ujo6P7+/rGxse7u7kdHR5OTk4GBgYmJiaurq+Xl5aGhoUVFRXFxcZmZmfLy8q+vr3x8fMfHx01NTff397y8vIeHh7m5uURERISEhNnZ2YiIiHR0dMTExMDAwObm5oKCglBQUHl5eaLjoh0AAANDSURBVHjazJQFVxtBEIAndySBXOilIcRdIEJCBHd3h+LFvRR3q7u7y0/t7cbujsDjpby+zktuZHe/m92dG4BzhXimawHIsu/D5QmRJkoFWHk6eOnM0Zn5S2cmJ6WWSsgv7cmoZOxFd1U4OO7u9mBmm1KC/Ntyn6kMFldv4NFu04feEWylKuWgdvSYTrhM+teEOKQw05pcgP3t2XoUq1JRHYCZxQU3Gb8o22DT+1fz7u0yzrX2PP2crKnuLWNnfVxzNFHmita6WjZTqCosX3K9Msia1JAzoLqFYsP2L5G9p6dcZSjF+kaNS2vUyqQA3qDdqnEu0Io9AkAs8g90BlyF5VQuh2lQuWvh+J3f6AYiXWRhQt5skZLNbKAMPoCOdStiDpMhZj1h6iR7GSZFB5nzOOrSlXCY1nas76eIATJkGsY8UWnVLGZfNlWHZuzU2KUw2UV+x/OV1Eo9iO1LauTISSGHScqxzkLM+a+qagCLqBhYzOt5dDWuBI1NCqNC7eNMJC10ayWI59Lx4s98Zj7WVxATBm1PwFMie81mZuqsOBkoMUthijLoFUj0IpsaxClX8IiEz5SwmDtW52RVY6v6TOYYVZObERaH92JMz4ZRfqfiOZFo730BZu9lBkNOfPGFmLAla18odwBw72gTXwS6o0oniefBi4kZ4oLMEVWocSOTw2RqqYYpnzEnjWrpQHZ44AXIf/9m7aLM4yGdcQ+4TO+s/lDj6gzXfO2QTPfbFRAqpsvO3Dvd34x1sCAL6wZK24aZum15/NtU2cxpSo1Cir7NwUKRWa99OIUKsCCIFzX309weEj5zuTLchnzUNIG0xyQtivUQkPt8ZfCT/Iado94eUzMR7SFIciyl57W4LnKLF8oJOH8gnS/0VyfR+O52PKKFRbzgcmFFwCGRuPMqgkQSzIx+I7nr4UfHB0hGyqkHVck06JaQ/2X96XD35noo7ZNlGf4TEfB0gqGwIfiXTAH6CQRIoUfcjBjRf/wBsVkRT8CZgX6YyX1EXxULAX88Yidax1rGGYunEX4rCGJvj+wmMTM2Dc5Ilp8yK+kzmLEZrLNjuaxzjOZ7+tT55xnbVjKlkeCWT63/K2Y02Zj/R4ABAAEleU8OCkl3AAAAAElFTkSuQmCC',
  pingoat:		'data:image/gif;base64,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',
  pingomatic:		'data:image/png;base64,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',
  svensk_lemonad:	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAIAAAD8q9/YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGeYUxB9wAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAABEUlEQVR42mJMLpdgGEmAhYGBYU7H8xHi25QKSRYI6+jj0EHuVmvZ1S0zLCkxoSbjOAMDAxPDCAPU9PD8qUfQGPQBkKhDZhDIw2iOTsy2wcpmYGBA4yKLQNjEKMMUhFuEzMDUCPcVJG3DGS0zLCFehad5uM8xcwELkVGH5iC4U7AGEH5luASRAdZAxxPDaEEA9yqyCHYPQ2IJTmJGC5oImmuIVEZ8BsGqETPp4hLBjGFi83Bitg2a3VidQqQy8myEg5YZlmg+wSpCbKGFGb143ERM+YSpbP7UI2jJHk2EKiUfPG8jA8bkcok5Hc9HSD2cUiE5Wg+PhLY0JMEMfrcS064gysMpFZIjJ4YBAAAA//8DAJACtPkeSnvGAAAAAElFTkSuQmCC'
};

var id, done;
for( id in plugins )
  if( location.hostname.match( plugins[id].host ) )
  {
    //GM_log( 'Configuring plugin '+id );
    plugins[id].configure( id );
    done = true;
    break;
  }
if( !done ) {
  if( location.pathname.match( 'publish-confirmation.g' ) ) {
    try{linkDelicious();}catch(e){alert(e);}
  } else {
    moveTagsToHeader();
    setTimeout(function(){$('postingEditor').style.position = 'static';}, 500);
    setTimeout(function(){$('postingEditor').style.position = 'static';}, 1000);
    setTimeout(function(){$('postingEditor').style.position = 'static';}, 2000);
  }//end if-else location.pathname.match publish-confirmation.g
}//end if ! done

// make post: http://www.blogger.com/post-create.g?blogID=\d{8,}
// post page: http://www.blogger.com/post-edit.g?blogID=\d+&postID=\d{18}
// post done: http://www.blogger.com/publish-body.g?blogID=\d+&inprogress=true

function register_from_queryarg( arg )
{
  return function( id )
  {
    //GM_log( 'Testing for arg '+arg );
    var u = (new RegExp('[&?]'+ arg +'=([^&]+)', 'i')).exec( location.search );
    if( u ) register_link( id, u[1] );
  };
}

function register_link( id, blogURL )
{
  blogURL = unescape( blogURL ).toLowerCase();
  blogURL = blogURL.replace( /^([^:]+:..[^\/]+).*/, '$1/' );
  GM_setValue( id +'-'+ blogURL, location.href );
  //GM_log( 'registered '+ id+'-'+ blogURL );
}

// Blogger id. Used to store data between posting and publishing page, and to
// keep track of which Del.icio.us user stores tagged posts for us. Also used
// when deciding what text to prepend the <div class="tags"></div> data with.
function getBlogId()
{
  var blogid = /blogid=(\d+)/i.exec( location.search );
  if( blogid ) return blogid[1];
  return getBlogSelector().value;
}

function getBlogSelector()
{
  var node = document.getElementsByName( 'selectedBlogId' );
  if( node.length )
    return node[0];
  if( node = $( 'stuffform' ) )
    return node.elements.namedItem( 'selBlog' );
}

function $()
{
  for( var i = 0, node; i < arguments.length; i++ )
    if( node = document.getElementById( arguments[i] ) )
      return node;
}

// The name of our blog, as listed in the page header. Default guess the first
// time we ask the user for her Del.icio.us account name (N/A when publishing)
function getBlogName() {
  var bname = $( 'blogname' );
  if( bname )
    bname = bname.textContent;
  else if( (bname = getBlogSelector()) )
    bname = bname[bname.selectedIndex].text;
  else
    return;
  return bname;
}//end function getFullName

function getName()
{
  return getBlogName().replace( /\s/g, '' );
}

function Site( name, link )
{
  this.name = name;
  this.link = '<a href="'+ link +'" rel="tag">${tag}</a>';
}

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

function doCleanup() {//clean up GM_vars
   var myid = getBlogId();
   GM_setValue( 'posttrackback-'+myid, '' );//clear tracbacks so we don't send them twice
}//end function doCleanup

function blogger_trackback_onload(data) {
   var out = document.getElementById('blogger_trackback_status');
   try {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data.responseText, "application/xml");
      var errn = xmlDoc.getElementsByTagName('error');
      if(errn[0].firstChild.nodeValue != 0) {
         var errm = xmlDoc.getElementsByTagName('message');
         out.innerHTML += 'Error #' + errn[0].firstChild.nodeValue + ' : ' + errm[0].firstChild.nodeValue + '<br />';
      } else {
         out.innerHTML += 'Trackback Complete<br />';
      }//end if-else errn != 0
   } catch(e) {
      out.innerHTML += 'Trackback Complete<br />';
   }//end try-catch
}//end function blogger_trackback_onload

function blogger_trackback_submit(trackbackurl,title,excerpt,url) {
   var out = document.getElementById('blogger_trackback_status');
   out.innerHTML += '<i>Sending Trackback Ping to '+trackbackurl+'...</i><br />';
   
   GM_xmlhttpRequest({'method':'POST',
                      'url':trackbackurl,
                      'headers':{'User-Agent': 'Trackback',
                                 'Content-Type':'application/x-www-form-urlencoded; charset=utf8'},
                      'onload':blogger_trackback_onload,
                      'data':'url='+encodeURIComponent(url)
                            +'&title='+encodeURIComponent(title)
                            +'&blog_name='+encodeURIComponent(getBlogName())
                            +'&excerpt='+encodeURIComponent(excerpt)
                    });
}//end function blogger_trackback_submit

function doTrackback(title,excerpt,url) {
   var myid = getBlogId();
   name = getBlogName();
   var trackbacks = GM_getValue( 'posttrackback-'+myid, '' ).split(/\n/);
alert(trackbacks);
   if(!trackbacks || !trackbacks[0] || !url)
      return;
   for(i in trackbacks)
      blogger_trackback_submit(trackbacks[i],title,excerpt,url);
   var out = document.getElementById('blogger_trackback_status');
}//end function doTrackback

function parseDetailsCallback(data) {
   data = eval('(' + data.responseText + ')');
   var myid = getBlogId();
   var url = '';
   for(var i in data.entry.link) {
      if(data.entry.link[i].type == 'text/html' && data.entry.link[i].rel == 'alternate') {
         url = data.entry.link[i].href;
         break;
      }
   }
   var title = data.entry.title['$t'];
   var excerpt = '';
   if(GM_getValue('extstyle-'+myid, 'postbody') == 'postbody')
      excerpt = stripHTML(data.entry.content['$t']).substr(0,200) + '...';
   else {
      var dt = data.entry.updated['$t'].match(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)\.(\d+)([+-]\d+):(\d+)$/);
      var time = 0;
      if(dt) {
         time = new Date(parseInt(dt[1],10), parseInt(dt[2],10)-1 /*since January==0 in Date lingo*/, parseInt(dt[3],10), parseInt(dt[4],10), parseInt(dt[5],10), parseInt(dt[6],10), parseInt(dt[7],10)).getTime();
         time = time + -(60*60*1000*parseInt(dt[8],10)) + -(60*1000*parseInt(dt[9],10));//adjust to GMT
      }//end if dt
      time = time + -(60*1000*(new Date()).getTimezoneOffset());
      time = new Date(time);
      excerpt = formatTime(time);
   }//end if-else extstyle
   var tags = [];
   for(var i in data.entry.category) {
      tags.push(data.entry.category[i].term.replace(/ /g,'_'));
   }//end for i in category

   finishLinkDelicious(url,title,excerpt,tags);
}//end function parseDetailsCallback

//this function actually grabs info about the published post from JSONP feeds
function parseDetails() {
   var blogurl = document.getElementById('nav-viewblog').getElementsByTagName('a')[0].href;
   var postid = /postid=(\d+)/i.exec(location.search);
   postid = postid[1];
   GM_xmlhttpRequest({'method':'GET',
                      'url':blogurl + 'feeds/posts/full/' + postid + '?alt=json',
                      'onload':parseDetailsCallback
                    });
}//end function parseDetails

// Fetch data from storePostData() for Delicious link on the publishing page,
// http://www.blogger.com/publish-body.g?blogID=*&inprogress=true
function linkDelicious()
{

  parseDetails();

}

document.getElementsByClassName = function( className, nodeName )
{
  var result = [], tag = nodeName||'*', node, seek, i;
  var rightClass = new RegExp( '(^| )'+ className +'( |$)' );
  seek = document.getElementsByTagName( tag );
  for( i=0; i<seek.length; i++ )
    if( rightClass.test( (node = seek[i]).className ) )
      result.push( seek[i] );
  return result;
};

function finishLinkDelicious(url,title,excerpt,tags) {

  var myid = getBlogId();
  var blogurl = document.getElementById('nav-viewblog').getElementsByTagName('a')[0].href;
  var icio = GM_getValue( 'icio-'+myid, '' );
  if(icio) icio = 'http://del.icio.us/' + icio + '/'
  var anchor = GM_getValue( 'anchor-'+myid, '' );
  anchor = anchor != '' ? anchor + ' ' : '';

  if( url )
  {
    var img = document.createElement( 'img' );
    img.src = images.delicious;
    img.alt = 'Del.icio.us icon';
    var tag = document.createElement( 'a' );
    tag.href = icio +'?v=3&url='+ encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&notes=' + encodeURIComponent(excerpt) + '&tags=' + encodeURIComponent(anchor + tags.join(' '));
    tag.title = 'Tag this post at Del.icio.us';
    var node = document.getElementsByClassName('main')[0];
    thenode = node;
    if(icio)
       node.appendChild(tag);
    node.appendChild(document.createTextNode( ' ' ));
    var perm = document.createElement( 'a' );
    perm.href = url;
    perm.appendChild( document.createTextNode( 'View Post' ) );
    node.appendChild(perm);
    img.style.paddingRight = '4px';
    tag.appendChild( img );
    tag.appendChild( document.createTextNode( 'Link at Del.icio.us' ) );
    accesskey( perm, 'o' );
    accesskey( tag, 'd' );
    processPlugins( blogurl, node );
    var trackbackstatus = document.createElement('div');
    trackbackstatus.id = 'blogger_trackback_status';
    thenode.appendChild(trackbackstatus);
    try{doTrackback(title,excerpt,url);}catch(e){alert(e);}//fire trackback

  }

  doCleanup();//do cleanup on GM_vars

}//end function finishLinkDelicious


function processPlugins( base, parent )
{
  var div = document.createElement( 'div' ), keys, id;
  div.className = 'buttonRow';
  parent.appendChild( div );
  for( id in plugins )
    if( (url = GM_getValue( id +'-'+ (base.toLowerCase()), '' )) )
    {
      var plugin = plugins[id];
      var title = plugin.title;
      var key = plugin.accesskey;
      var link = document.createElement( 'a' );
      if( plugin.image || images[id] )
      {
	var image = document.createElement( 'img' );
	image.id = id = id.replace( /\s/g, '_' );
	image.src = plugin.image || images[id];
	image.style.padding = '0 4px';
	link.appendChild( image );
	if( plugin.style )
	  for( var what in plugin.style )
	    image.style[what] = plugin.style[what];
      }
      if( plugin.text )
	link.appendChild( document.createTextNode( plugin.text ) );
      if( plugin.title )
	link.title = plugin.title;
      div.appendChild( link );
      keys = accesskey( link, plugin.accesskey, keys );
      addonclick( link, url, (plugin.image || images[id]) && id );
    }
}

function load( url, id )
{
  return function( event )
  {
    if( !event.button ) // only on left mousebutton or keyboard event
    {
      event.stopPropagation();
      event.preventDefault();
      var img = document.getElementById( id );
      if( img.className == 'loading' ) return;
      img.className = 'loading';
      img.parentNode.title = 'Loading; please wait.';
      pulsate( img );
      var what = plugins[id], method = what.method||'GET', data = '';
      var request = { url:url, method:method, onload:function( http )
		      { img.parentNode.title = 'Completed OK.';
			img.className = 'ok'; }, onerror:function( http )
		      { img.parentNode.title = 'Failed!';
			img.className = 'die'; } };
      if( method == 'POST' )
      {
	url = /^([^?]+)\??(.*)/.exec( url );
	request.url = url[1];
	request.data = url[2];
	if( what.extra_data )
	  request.data = request.data +'&'+ what.extra_data;
	request.headers = {'Content-Type':'application/x-www-form-urlencoded'};
      }
      GM_xmlhttpRequest( request );
    }
  };
}

function addonclick( link, url, id )
{
  //GM_log( 'onclick '+id+': '+link );
  link.href = url;
  if( id )
  {
    link.addEventListener( 'click', load( url, id ), false );
    link.addEventListener( 'keypress', load( url, id ), false );
  }
}

function pulsate( image, halfpulse /*, frequency, pulseTime*/ )
{
  //GM_log( 'pulsating '+image.id );
  var frequency = 50; // update frequency (iterations per second)
  var pulseTime = 2.0; // how long each pulse takes (in seconds)

  var delay = 1e3 / frequency;
  var period = frequency * pulseTime;
  var increment = (Math.PI * 2) / period;
  var start = !halfpulse ? 0 : Math.floor( period/2 );
  iterate( image, delay, increment, start, period, halfpulse );
}

function iterate( image, delay, increment, alpha, period, die )
{
  alpha = ++alpha % period;
  var pct = (1 + Math.cos( alpha * increment )) / 2;
  image.style.opacity = 0.5 + pct/2;
  if( image.className.match( /ok$/ ) && !alpha )
    return image.className = /^(.*) ?ok/.exec( image.className )[1];
  if( image.className.match( /die$/ ) && (alpha == Math.ceil(period/2)) )
    return image.className = /^(.*) ?die/.exec( image.className )[1];
  setTimeout( iterate, delay, image, delay, increment, alpha, period, die );
}

function stripHTML(str) {
   if(!str) return '';
   return str.replace(/(<([^>]+)>)/ig,"");
}//end striphtml

// Store away title, datestamp and tags from create/edit post page, located at
// http://www.blogger.com/post-create.g?blogID=* to be picked up on publishing
function storePostData()
{
  var myid = getBlogId();
  var divs = getFields();
  GM_setValue( 'posttrackback-'+myid, divs.trackback.value );
  GM_setValue('trackbackSave' + divs.title.value, '');
}

// Zero pad number to two decimals
function pad( n )
{
  return (n < 10 ? '0' : '') + n;
}

// Let the user set up his script the way she wants to:
function configure( e )
{
  var myid = getBlogId();
  var had = GM_getValue( 'extstyle-'+myid, '' ); // first time: false
  var last = GM_getValue('icio-'+myid, '');
  var icio = prompt( 'Enter your del.icio.us username (optional, for del.icio.us link)', last );
  GM_setValue( 'icio-'+myid, icio );
  var last = GM_getValue('anchor-'+myid, '');
  var anchor = prompt( 'Enter your del.icio.us anchor tag (optional, for del.icio.us link)', last );
  GM_setValue( 'anchor-'+myid, anchor );
  last = GM_getValue('extstyle-'+myid, 'postbody');
  var extstyle = prompt( 'Style of extended field on del.icio.us (postbody or dtstamp):', last );
  GM_setValue( 'extstyle-'+myid, extstyle );
  if( !had )
    alert( 'To change this configuration later, click on the Trackback: label.' );
}

function getFields()
{
  var nodes = { 'trackback' : $( 'trackback' ),
		'draft': $( 'saveButton', 'saveDraft', 'saveDraftButton' ),
		'save' : $( 'publishButton', 'publishPost', 'publishPostButton' ),
                'title' : $( 'postingTitleField' )
              };
  var toolbar, tds, i;
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

function formatTime( t )
{
  var date = [t.getFullYear(), pad( t.getMonth()+1 ), pad( t.getDate() )];
  var time = [pad( t.getHours() ), pad( t.getMinutes() )];
  return date.join( '-' ) +' '+ time.join( ':' );
}

// Puts all tags into the post body and stores away data in a GM variable.
function saveData(e)
{
  var myid = getBlogId();
  if( typeof GM_getValue( 'icio-'+myid, null ) != 'string' ) configure();
  var sites = [ new Site( 'Del.icio.us', GM_getValue( 'url-'+myid, site )) ];
  //new Site( 'Technorati', 'http://www.technorati.com/tag/${tag}' ),
  storePostData();
}

function firstAncestor( node, type )
{
  if( !type )
    return node && node.parentNode;
  while( (node = node.parentNode) )
    if( node.nodeName == type )
      return node;
}

function saveTrackback(e) {
   var divs = getFields();
   GM_setValue('trackbackSave' + divs.title.value, divs.trackback.value);
}

// Parses and removes all added <div class="tags"></div> tags from the post
// body and puts them in the header.
function moveTagsToHeader()
{
  var tags = '';
  var divs = getFields();
  injectTagsField(divs);
  divs = getFields();
  divs.trackback.value = GM_getValue('trackbackSave' + divs.title.value, divs.trackback.value);
  trap(divs.save, 'click', saveData);
  trap(divs.draft, 'click', saveTrackback);
}

function injectTagsField(divs)
{
  var blogthis = location.href.indexOf( 'blogger.com/blog-this.g' ) > 0;
  var trackbackRow = document.createElement( blogthis ? 'div' : 'tr' );
  $('postingEditor').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].appendChild( trackbackRow );
  if( blogthis ) {
    trackbackRow.innerHTML = '<label id="TagsConfig" for="trackback" style="color:blue;cursor:hand;">Trackback:</label>' +
      '<span class="errorbox-good">' +
      '<textarea id="trackack" class="titlefield" ' +
      ' style="font-size:11px;width:180px;" tabindex="2">' +
      '</textarea>' +
      '</span>';
  } else {
    trackbackRow.innerHTML = '<th><label id="TagsConfig" for="trackback" style="color:blue;cursor:hand;">Trackback:' +
      '</label></th><td><div class="errorbox-good">' +
      '<textarea id="trackback" class="text" style="width:457px" tabindex="2">' +
      '</textarea>' +
      '</div></td>';
  }//end if-else blogthis
  $( 'TagsConfig' ).addEventListener( 'click', configure, false );
}

function trap( node, event, handler )
{
/*  var original = node.getAttribute( 'on'+event );
  if( original )
  {
    original = original.replace( /;\s*$/, '' ).split( ';' );
    var last = original.pop();
    var next = 'setTimeout("'+ original.join(';') +'",100);' + last;
    node.setAttribute( 'on'+event, next );
  }
*/
  node.addEventListener( event, handler, false );
}

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
