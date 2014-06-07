// ==UserScript==
// @name          Bloglists
// @namespace     http://sniggle.net/
// @description   adds "From:" info to Bloglines title-only mailing list display
// @include       http://www.bloglines.com/myblogs_display?sub=*
// @include       http://www.bloglines.com/myblogs_display?folder=*
// ==/UserScript==
// Purpose: append the "From:" information to the titles of mailing list
//          entries, so that you can tell who sent the item when the list is
//          in its collapsed, title-only form.

// Notes:
//   The list of articles is in a <div> of class "item"
//   The first child in that <div> is a <div> of id="items999999" (9=some #)
//   The first child in that <div> is a <table>
//   That table has one <tr>/<td> per article
//   Inside that <td> is a <div> of id="siteItem.Z.X"
//        (Z = 0..m, where m=#ofsitesonpage)
//        (X = 0..n, where n=#ofarticlesonsite)
//   That <div> has four children:
//     #text
//     <script>
//     <h3>         the title and the +/- expander
//     <div>        the article text
//   That <h3> has three children:  <a> #text <a>
//   That <div>'s first child is a <p> (class="author")
//   The first three children of the <p> are
//     #text <a> #text       <- the "by line" you're looking for

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
      siteItemAuthor = siteItemDiv.childNodes[3].childNodes[0];
      if( siteItemAuthor )
      if( siteItemAuthor.className == "author" )
      {
        siteItemTitle  = siteItemDiv.childNodes[2];
        siteItemByline = siteItemAuthor.childNodes[0].nodeValue + siteItemAuthor.childNodes[1].childNodes[0].nodeValue + siteItemAuthor.childNodes[2].nodeValue;
        var newp = document.createElement("small");
        newp.appendChild( document.createTextNode( " - "+siteItemByline ) );
        siteItemTitle.appendChild( newp );
      }
    }
    item++;
  }
}
