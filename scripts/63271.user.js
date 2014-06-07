// ==UserScript==
// @name           ESPN Chargers Board troll filter
// @namespace      By sdguy67
// @description    Remove Trolls from Chargers board
// @include        http://boards.espn.go.com/boards/*
// ==/UserScript==
//
//  sdguy67  23-Aug-2010
//
//  Remove Trolls from Chargers board
//  
//
//  You can add whomever else you want by adding them to the 'annoyers' array
//  in the code.
//
//
//  If you need any help installing Greasemonkey or this script, I'll be glad
//  to help you with that, too.
//
//-----------------------------------------------------------------------------


var annoyers = ['CantStopDaChiefs', 'Benjee68', 'swamiknows222', 'TooNisSEXY'
, 'fitznoes', 'THECOACHROB'];

// get rid of annoying posters on main pages

var trs = document.getElementsByTagName('tr');
for (i=0; i<trs.length; i++)
{

  var name      = trs[i].firstChild.nextSibling.textContent;

   for (var counter=0; counter<annoyers.length; counter++)
   {
         if (name == annoyers[counter])
         {
                 trs[i].innerHTML = '';
         }
    }
}


// get rid of annoying posters on sub-pages
//
//  first mark the table rows to kill

var trs = document.getElementsByTagName('tr');
for (i=0; i<trs.length; i++)
{

  var content      = trs[i].textContent;
  var classname    = trs[i].firstChild.className;
  var author       = trs[i].firstChild.textContent;

  for (var counter=0; counter<annoyers.length; counter++)
  {
          if (author == annoyers[counter])
          {
                   trs[i].id = 'kill';
                   trs[i].nextSibling.id = 'kill';
          }
  }

}


// then kill the rows

var trs = document.getElementsByTagName('tr');
for (i=0; i<trs.length; i++)
{

  var id           = trs[i].id;

  if (id == 'kill')
  {
          trs[i].innerHTML = '';
  }

}