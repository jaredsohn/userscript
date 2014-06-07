// ==UserScript==
// @name           ESPN Annoying Poster Remover
// @namespace      By EkiRenrut
// @description    Remove annoying ESPM message board posters
// @include        http://boards.espn.go.com/boards/*
// ==/UserScript==
//
//  EkiRenrut  20-Apr-2009
//
//  ESPN ANNOYING POSTER REMOVER Version 0.1
//  
//  This is my first attempt at any kind of Greasemonkey scripting.  This 
//  script is designed to remove the most notorious nincompoop trolls on the
//  ESPN sports message boards by eliminating the HTML of their posts on the
//  main pages and removing any/all trace of their comments in the post 
//  itself.  It has four default annoyers...
//
//  xJokerz
//  BostonGirl524
//  TrueNiners
//  irishfan711722
//
//  You can add whomever else you want by adding them to the 'annoyers' array
//  in the code.
//
//  I wrote this up in a few hours.  It probably could be more robust and
//  efficient, so if you have any suggestions for improvement, just let me
//  know.  I usually visit the ESPN MLB, Red Sox, Yankees, NFL and Patriots
//  message boards once a day.
//
//  If you need any help installing Greasemonkey or this script, I'll be glad
//  to help you with that, too.
//
//  This script is provided free of charge and with absolutely no warranty.
//  If you screw up your computer, it's your fault.
//
//  You are free to modify and distribute this script all you want.  I ask that
//  you retain this header and all these comments if you do so.  Give me a 
//  little credit, mmmmkay?
//
//  The nature of the World Wide Web is malleable.  That means that if ESPN 
//  makes changes to their board, this script might no longer work.  If that
//  happens I'll try to keep revising this script and releasing new versions.
//
//-----------------------------------------------------------------------------


var annoyers = ['xJokerz', 'BostonGirl524', 'TrueNiners', 'irishfan711722'];

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
