// ==UserScript==
// @name        clickRow
// @namespace   zaonce.com
// @description Makes entire row clickable in a bug list (search results). 
// @include     *
// @author      nige@zaonce.com
// ==/UserScript==

document.getElementsByClassName = function(cl) 
{
    var retnode = [];
    var myclass = new RegExp('\\b'+cl+'\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) 
    {
        var classes = elem[i].className;
        if (myclass.test(classes)) retnode.push(elem[i]);
    }
    return retnode;
};

function openBug( row )
{
  var content = row.innerHTML;
  var re = /href="(.*)"/ig;
  if( re.exec( content ) )
  {
    var link = document.location.protocol + '//' + document.location.host + '/' + RegExp.$1;
    document.location.href = link;
  }
}

(
function () 
{
  if( document.title.substring( 0, 8 ) == 'Bug List' )
  {
      var rows = document.getElementsByClassName( 'bz_bugitem' );            
      for( i = 0; i < rows.length;i++ )
      {
        rows[ i ].onclick=function(){ openBug( this ) };
      }
  }
}
)();