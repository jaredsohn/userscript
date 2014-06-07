// ==UserScript==
// @name          Blogplus
// @namespace     http://sniggle.net/
// @description   removes [+] expander if there's nothing to expand
// @include       http://www.bloglines.com/myblogs_display?sub=*
// @include       http://www.bloglines.com/myblogs_display?folder=*
// ==/UserScript==
// Purpose: On articles where only the title shows with a [+] expander next
//          to it, removes this [+] expander if there is no article underneath
//          it.  Note: this makes it impossible to clip/blog, email, or "keep
//          new" the article.

// Notes:
//   The list of articles is in a <div> of class "item"
//    (found under a div.blog-main, found under a div.content-main, under body)
//   The first child in that <div> is a <div> of id="items999999" (9=some #)
//   The first child in that <div> is a <table>
//   That table's tbody has one <tr>/<td> per article
//   Inside that <td> is a <div> of id="siteItem.Z.X"
//        (Z = 0..m, where m=#ofsitesonpage)
//        (X = 0..n, where n=#ofarticlesonsite)
//   That <div> has four children:
//     #text
//     <a> 
//     <h3>         the title and the +/- expander
//       - <a>        the expand event trigger
//         - <img>    the [+]
//     <div>        the article text
//       has multiple children, including:
//       <table><tbody><tr><td class="article">
//         if this <td> is empty (td.innerHTML == ""), kill the [+]

var site = 0;
var maxSites=0;

while( siteItemDiv = document.getElementById( "siteItem."+maxSites+".0" ) )
 maxSites++;

for( site=0; site<maxSites; site++ )
{
  var item = 0;
  while( siteItemDiv = document.getElementById( "siteItem."+site+"."+item ) )
  {
    if( siteItemDiv.childNodes[3] )
    {
      siteItemD = siteItemDiv.getElementsByTagName("td")[0];
      if( siteItemD ) if( siteItemD.className == "article" )
      if( siteItemD.innerHTML == "" )
      {
//                      div         h3             a          (img)
        siteItemA = siteItemDiv.childNodes[2].childNodes[0];
        if( siteItemA ) if( siteItemA.nodeName == "A" )
        {
          siteItemPlus = siteItemA.childNodes[0];
          if( siteItemPlus ) if ( siteItemPlus.nodeName == "IMG" )
            siteItemA.removeChild( siteItemPlus );
        }
      }
    }
    item++;
  }
}
