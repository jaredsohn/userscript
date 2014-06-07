// ==UserScript==
// @name          Blogger del.icio.us post categorizing helper
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description   Adds a tags field for Blogger posts and helps keep your notes in sync with your Del.icio.us categories according to the tags you used.
// @include       http://www.blogger.com/post-*
// @include       http://blogger.com/post-*
// @include       http://blogger.com/publish-body*
// @include       http://www.blogger.com/publish-body*
// ==/UserScript==

// make post: http://www.blogger.com/post-create.g?blogID=\d{8,}
// post page: http://www.blogger.com/post-edit.g?blogID=\d+&postID=\d{18}
// post done: http://www.blogger.com/publish-body.g?blogID=\d+&inprogress=true

// Blogger id. Used to store data between posting and publishing page, and to
// keep track of which Del.icio.us user stores tagged posts for us. Also used
// when deciding what text to prepend the <div class="tags"></div> data with.
var myid = getBlogId();

// The name of our blog, as listed in the page header. Default guess the first
// time we ask the user for her Del.icio.us account name (N/A when publishing)
var name = $( 'blogname' ) && $( 'blogname' ).textContent.replace( /\s/g, '' );

var site = 'http://del.icio.us/'+ name +'/'+ name +'+${tag}';
window.sites = [ new Site( 'Del.icio.us', GM_getValue( 'url-'+myid, site )) ];
//new Site( 'Technorati', 'http://www.technorati.com/tag/${tag}' ),

if( location.pathname.match( 'publish-body.g' ) )
  linkDelicious();
else
  moveTagsToHeader();

function $( id ){ return document.getElementById( id ); };

function getBlogId()
{
  return /blogid=(\d+)/i.exec( location.search )[1];
}

function Site( name, link )
{
  this.name = name;
  this.link = '<a href="'+ link +'" rel="tag">${tag}</a>';
}

function getLinkByText( pattern )
{
  var i, l = document.links;
  for( i=0; i<l.length; i++ )
    if( l[i].textContent.match( pattern ) )
      return l[i].href;
}

// Fetch data from storePostData() for Delicious link on the publishing page,
// http://www.blogger.com/publish-body.g?blogID=*&inprogress=true
function linkDelicious()
{
  var done = $( 'verboseStatus' );
  if(!done )
  { // reddish debug flashing:
    // $('body').style.background = '#F' + pad(parseInt(100*Math.random()));
    return setTimeout( linkDelicious, 200 );
  }
  var base = getLinkByText( /View Blog/i );
  var urls = done.innerHTML.split( /\s*<br *\/?>\s*/i );
  var keep = /^([^:]*:..[^\/]*.[^\/]*).*/; // keeps the first path segment
  var icio = GM_getValue( 'url-'+myid, site ).replace( keep, '$1' );
  var url, i;
  for( i=0; i<urls.length; i++ )
    if( urls[i].match( '/' ) )
      url = base.replace(/\/$/,'') +'/'+ urls[i].replace( /^\//, '' );
  if( url )
  {
    var img = document.createElement( 'img' );
    img.src = 'http://del.icio.us/static/img/delicious.small.gif';
    img.alt = 'Del.icio.us icon';
    var tag = document.createElement( 'a' );
    tag.href = icio +'?v=3&url='+ url + GM_getValue( 'postdata-'+myid, '' );
    tag.title = 'Tag this post at Del.icio.us';
    var node = done.nextSibling;
    if( node.nodeName == '#text' )
      node = node.nextSibling; // the <p> tag containing View Blog
    var perm = document.createElement( 'a' );
    perm.href = url;
    perm.appendChild( document.createTextNode( 'View Post' ) );
    node.insertBefore( perm, node.firstChild );
    node.insertBefore( document.createTextNode( ' ' ), node.firstChild );
    node.insertBefore( tag, node.firstChild );
    img.style.paddingRight = '4px';
    tag.appendChild( img );
    tag.appendChild( document.createTextNode( 'Link at Del.icio.us' ) );
  }
}

// Store away title, datestamp and tags from create/edit post page, located at
// http://www.blogger.com/post-create.g?blogID=* to be picked up on publishing
function storePostData()
{
  var blog = GM_getValue( 'extra-'+myid, name );
  var myid = getBlogId();
  var tags = $( 'tags' ).value.replace( /\s*,\s*/g, ' ' );
  if( blog ) tags = blog +' '+ tags;
  var head = $( 'f-title' ).value;
  var form = document.forms.namedItem( 'stuffform' ).elements;
  var date = form.namedItem( 'postYear' ).value +'-'+
	       pad( parseInt(form.namedItem( 'postMonth' ).value, 10)+1 ) +'-'+
	       pad( form.namedItem( 'postDay' ).value ) + ' ';
  var hour = form.namedItem( 'postHour' ).value % 12;
  var ampm = form.namedItem( 'postAMPM' ).value;
  if( ampm ) hour += 12;
  var time = pad( hour ) +':'+ pad( form.namedItem( 'postMinute' ).value );
  var data = { title:head, extended:date+time, tags:tags };
  var save = '';
  for( var i in data )
    save += '&'+ i +'='+ encodeURIComponent( data[i] );
  GM_setValue( 'postdata-'+myid, save );
}

// Zero pad number to two decimals
function pad( n )
{
  return (n < 10 ? '0' : '') + n;
}

// Let the user set up his script the way she wants to:
function configure()
{
  var myid = getBlogId();
  var had = GM_getValue( 'url-'+myid, '' ); // first time: false
  var last = GM_getValue( 'title-'+myid, 'Tags:' );
  var title = prompt( 'Title for listed tags:', last );
  if( title != last )
    GM_setValue( 'title-'+myid, title );
  last = GM_getValue( 'extra-'+myid, name );
  var extraTags = prompt( 'Tags (space separated) that you want ' +
			  'on all your blog posts:', last );
  GM_setValue( 'extra-'+myid, extraTags );
  last = GM_getValue( 'url-'+myid, 'http://del.icio.us/'+ name +'/'+
		      extraTags + '+${tag}' );
  var links = prompt( 'Tag URL to link to (where ${tag} gets replaced ' +
		      'with the tag name): ', last );
  if( links != last )
    GM_setValue( 'url-'+myid, links );
  if( !had )
    alert( 'To change this configuration later, click on the Tags: label.' );
}

// Puts all tags into the post body and stores away data in a GM variable.
function saveData()
{
  var myid = getBlogId();
  if( !GM_getValue( 'extra-'+myid, '' ) ) configure();
  storePostData();
  var text = $( 'textarea' ), sites=window.sites, html='';
  var tags = $( 'tags' ).value.split( /\s*[, ]\s*/ ), tag;
  if( tags[0] != '' )
  {
    html = '';
    for( var i=0; i<sites.length; i++ )
    {
      html += '<div class="tags">';
      if( sites.length > 1 ) html += sites[i].name +' ';
      html += GM_getValue( 'title-'+myid, 'Tags:' ) + '<ul>';
      for( var j=0; j<tags.length; j++ )
        html += '<li>'+ sites[i].link.replace(/\$\{tag\}/g, tags[j]) +'</li> ';
      html += '</ul></div>';
    }
    text.value += html;
  }
}

// Parses and removes all added <div class="tags"></div> tags from the post
// body and puts them in the header.
function moveTagsToHeader()
{
  var tags = '';
  var post = document.createElement( 'div' );
  post.innerHTML = $( 'textarea' ).value; // just to let us parse it easier:
  try
  {
    var divs = post.getElementsByTagName( 'div' );
    for( var i=0; i<divs.length; i++ )
      if( divs[i].className == 'tags' )
      {
	var tagAs = divs[i].getElementsByTagName( 'a' );
	for( var j=0; j<tagAs.length; j++ )
	{
	  tags += tagAs[j].text;
	  if( j+1 < tagAs.length ) tags += ', ';
	}
	break;
      }
  } catch(e) {}

  var re = /\n*<div class="tags">(.|\n)+<\/div>/mi;
  $( 'textarea' ).value = $( 'textarea' ).value.replace( re, '\n' );

  var tagRow = document.createElement( 'tr' );
  var link = $( 'titles' ).getElementsByTagName( 'tbody' ).item( 0 ).
	       getElementsByTagName( 'tr' ).item( 1 );
  link.parentNode.insertBefore( tagRow, link );
  tagRow.innerHTML = '<th><label id="TConfig" for="tags">Tags:</label></th>' +
    '<td><div class="errorbox-good">' +
    '<input id="tags" class="text" style="width:657px" tabindex="1" ' +
    ' value="'+ tags +'"></div></td>';
  $( 'TConfig' ).addEventListener( 'click', configure, false );
  $( 'f-title' ).style.width = '657px';
  link = $( 'f-address' );
  if( link ) link.style.width = '455px';
  $( 'saveDraft' ).addEventListener( 'click', saveData, false );
  $( 'publishPost' ).addEventListener( 'click', saveData, false );
}
