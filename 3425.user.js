// ==UserScript==
// @name          MoTownit
// @namespace     http://sniggle.net/
// @description   makes myfamily.com more betterer
// @include       http://www.myfamily.com/isapi.dll?c=site&htx=m*
// @include       http://motown.myfamily.com/isapi.dll?c=site&htx=m*
// @include       http://fandango.myfamily.com/isapi.dll?c=site&htx=m*
// @include       http://www.myfamily.com/isapi.dll?c=s&htx=m*
// @include       http://motown.myfamily.com/isapi.dll?c=s&htx=m*
// @include       http://fandango.myfamily.com/isapi.dll?c=s&htx=m*
// ==/UserScript==

// Remove the "powered by MyFamily" logo:
MyFamilyImg = document.getElementsByTagName("img")[0];
MyFamilyImg.parentNode.removeChild( MyFamilyImg );

// Make table width 100% instead of fixed-width
// Tables = document.getElementsByTagName("table");
// for( var i = Tables.length-1; i >= 0; i-- )
// {
//   ThisTable = Tables[i];
//   if(   ( ThisTable.width == '760' )
//      || ( ThisTable.width == '475' ) )
//   {
//     ThisTable.width = '100%';
//   }
// }

// Remove the My Site / MyFamily.com / Ancestry.com / People Finder tabs
TabTables = document.getElementsByTagName("table");
for( var i = TabTables.length-1; i >= 0; i-- )
{
  ThisTable = TabTables[i];
  if(   ( ThisTable.className == 'ATabBG' )
     || ( ThisTable.className == 'ITabBG' ) )
  {
    ThisTable.parentNode.removeChild( ThisTable );
  }
}

// remove line break from first "small" table with site contents.
TableCells = document.getElementsByTagName("td");
outerloop:
for( var i = 0; i < TableCells.length; i++ )
{
  ThisCell = TableCells[i];
  if( ThisCell.className == 'small' )
  {
    CellKids = ThisCell.childNodes;
    for( var j = 0; j < CellKids.length; j++ )
    {
      ThisKid = CellKids[j];
      if( ThisKid.nodeName == "BR" )
      {
        ThisCell.removeChild( ThisKid );
        break outerloop;
      }
    }
  }
}

// get rid of the superfluous Yahoo! search box
CellSiblings = ThisCell.parentNode.childNodes;
for( var i = 0; i < CellSiblings.length; i++ )
{
  ThisKid = CellSiblings[i];
  if( ThisKid.nodeName == "FORM" )
  {
    ThisCell.parentNode.removeChild( ThisKid );
  }
  if( ThisKid.className == "bodybold" )
  {
    ThisCell.parentNode.removeChild( ThisKid );
  }
}

// get rid of the "Like a good challenge?..." crap
// Look for a <span> with class="b10b"
// eliminate the <table> in the sequence:
//  table->tbody->tr->td->a->span
Spans = document.getElementsByTagName("span");
for( var i = 0; i < Spans.length; i++ )
{
  Span = Spans[i];
  if( Span.className == "b10b" ) break;
}
//                       A          TD         TR        TBODY      TABLE  
EnclosingTable = Span.parentNode.parentNode.parentNode.parentNode.parentNode
EnclosingTable.parentNode.removeChild( EnclosingTable );

// eliminate the "Search billions..." sections of the Family Tree area
// look for a <span> with a #text child containing
// "  Search billions of names for ancestors:"
// eliminate that <span>'s TR->TD->SPAN grandparent
// and that grandparents three next TR siblings (nextSibling x 2)
for( var i = 0; i < Spans.length; i++ )
{
  Span = Spans[i];
  if( Span.className == "sb" )
  {
    Kid = Span.childNodes[0];
    if( Kid.nodeValue.indexOf( "Search billions of names for ancestors:" ) >= 0 )
    {
//                            TD         TR
      ContainingRow    = Span.parentNode.parentNode;
      FirstSiblingRow  = ContainingRow.nextSibling.nextSibling;
      SecondSiblingRow = FirstSiblingRow.nextSibling.nextSibling;
      ThirdSiblingRow  = SecondSiblingRow.nextSibling.nextSibling;
      ContainingRow.parentNode.removeChild( ContainingRow );
      FirstSiblingRow.parentNode.removeChild( FirstSiblingRow );
      SecondSiblingRow.parentNode.removeChild( SecondSiblingRow );
      ThirdSiblingRow.parentNode.removeChild( ThirdSiblingRow );
      break;
    }
  }
}

// Get rid of the "Custom Photo Calendar" bit
// Look for a <span> with class="y"
// TR->TD->SPAN   remove the TR grandparent

for( var i = 0; i < Spans.length; i++ )
{
  Span = Spans[i];
  if( Span.className == "y" )
  {
    ContainingRow = Span.parentNode.parentNode;
    ContainingRow.parentNode.removeChild( ContainingRow );
    break;
  }
}

// Get rid of the "Access your site @ motown.myfamily.com" box
// Look for a <span> with class="explain"
// TR.TD.TABLE.TBODY.TR.TD.TABLE.TBODY.TR.TD.SPAN can all go
for( var i = 0; i < Spans.length; i++ )
{
  Span = Spans[i];
  if( Span.className == "explain" )
  {
    ContainingTable = Span.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    ContainingTable.parentNode.removeChild( ContainingTable );
    break;
  }
}

// Get rid of "Do you have a success story you would like to share"
// Look for a <span> class="small" with a first child text element
//  that includes the above string
for( var i = 0; i < Spans.length; i++ )
{
  Span = Spans[i];
  if( Span.className == "small" )
  {
    Kid = Span.childNodes[0];
    if( Kid.nodeValue )
     if( Kid.nodeValue.indexOf( "Do you have a success story you would like to share" ) >= 0 )
    {
      Span.parentNode.removeChild( Span );
      break;
    }
  }
}

// Get rid of the lines "Everyone's a budding photographer..."
//   "Keep your family in the loop..."
//   "Store and access family files..."
//   "Make your opinion known..."
//   "Create an online family recipe book..."
//   "Curious about the family's opinion?..."
// it's another embedded table TR->TD->#text - dump the #text

Cells = document.getElementsByTagName("td");
for( var i = 0; i < Cells.length; i++ )
{
  Cell = Cells[i];
  Kid = Cell.childNodes[0];
  if( Kid ) if( Kid.nodeValue )
  {
    if( Kid.nodeValue.indexOf( "a budding photographer" ) >= 0 )
      Kid.parentNode.removeChild( Kid );
    if( Kid.nodeValue.indexOf( "Keep your family in the loop" ) >= 0 )
      Kid.parentNode.removeChild( Kid );
    if( Kid.nodeValue.indexOf( "Store and access family files" ) >= 0 )
      Kid.parentNode.removeChild( Kid );
    if( Kid.nodeValue.indexOf( "Make your opinion known" ) >= 0 )
      Kid.parentNode.removeChild( Kid );
    if( Kid.nodeValue.indexOf( "Create an online family recipe book" ) >= 0 )
      Kid.parentNode.removeChild( Kid );
    if( Kid.nodeValue.indexOf( "Curious about the family" ) >= 0 )
      Kid.parentNode.removeChild( Kid );
  }
}
