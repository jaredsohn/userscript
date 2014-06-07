// ==UserScript==
// @name 	Jeckbox
// @version 	1
// @author	blablubbb et al. (Code snippits from Travian4 Beyond - SSE: npocmu (Black_Cat, ms99, Nux, Lux, onetmt, Velonis Petros, Richard Laffers, Szabka, Victor Garcia-aka Croc-) )
// @namespace 	T4
// @description	untick red attacks in farmlist
// @source 	somewhere
// @identifier 	nowhere
// @copyright	© blablubbb 2012  (Code snippits from Travian4 Beyond - SSE : © npocmu 2012, © Black_Cat 2010 © ms99, 2008-2011 (parts of this script © Nux, Lux, onetmt, Velonis Petros, Richard Laffers, Szabka, Victor Garcia-aka Croc-))
// @license 	Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License
// @include 	http://tx3*.travian*.*/*.php*
// @exclude 	http://tx3*.travian*.*/
// @exclude 	http://tx3*.travian*.*/hilfe.php*
// @exclude	http://tx3*.travian*.*/log*.php*
// @exclude 	http://tx3*.travian*.*/index.php*
// @exclude 	http://tx3*.travian*.*/anleitung.php*
// @exclude 	http://tx3*.travian*.*/impressum.php*
// @exclude 	http://tx3*.travian*.*/anmelden.php*
// @exclude 	http://tx3*.travian*.*/gutscheine.php*
// @exclude 	http://tx3*.travian*.*/spielregeln.php*
// @exclude 	http://tx3*.travian*.*/links.php*
// @exclude 	http://tx3*.travian*.*/geschichte.php*
// @exclude 	http://tx3*.travian*.*/gold.php*
// @exclude 	http://tx3*.travian*.*/tutorial.php*
// @exclude 	http://tx3*.travian*.*/manual.php*
// @exclude 	http://tx3*.travian*.*/manual.php*
// @exclude 	http://tx3*.travian*.*/ajax.php*
// @exclude 	http://tx3*.travian*.*/ad/*
// @exclude 	http://tx3*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude  	http://analytics.traviangames.com/*
// @exclude 	http://*.traviantoolbox.com/*
// @exclude 	http://*.traviandope.com/*
// @exclude 	http://*.travianteam.com/*
// @exclude 	http://*.getter-tools.*
// @exclude 	http://travianutility.netsons.org/*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==

//Start  (Code snippits from Travian4 Beyond - SSE)
//////////////////////////////////////////////////////////////////////
//   call syntax:
//   1)   $at(node)
//   2)   $at(node, [])
//   3)   $at(node, [name,value])
//   4)   $at(node, [[name1,value1],...,[nameN,valueN]])
// It's also possible add events listeners uses syntax  $at(node, [type, listener, useCapture]) and so on.

function $at(aElem, attributes)
{
   function processAttribute(aElem, name, value)
   {
      if ( value !== null && value !== undefined && value !== "" )
      {
         if ( name === 'class' && value.charAt(0) === '+' )
         {
            addClass(aElem, value.slice(1));
         }
         else
         {
            aElem.setAttribute(name, value);
            if ( name.toUpperCase() === 'TITLE' ) 
            {
               aElem.setAttribute('alt', value);
            }
         }
      }
      else
      {
         aElem.removeAttribute(name);
      }
   }

   function processEventListener(aElem, type, listener, useCapture)
   {
      aElem.addEventListener(type, listener, useCapture);
   }

   if ( attributes )
   {
      var xi;
      for ( xi = 0; xi < attributes.length; xi++ )
      {
         var attribute = attributes[xi];
         if ( attribute instanceof Array )
         {
            if ( attribute.length === 2 )
            {
               processAttribute(aElem, attribute[0], attribute[1]);
            }
            else if ( attribute.length === 3 )
            {
               processEventListener(aElem, attribute[0], attribute[1], attribute[2]);
            }
         }
         else if ( xi === 0 ) // called as $at(node, [name,value])
         {
            if ( attributes.length === 2 )
            {
               processAttribute(aElem, attribute, attributes[1]);
            }
            else if ( attribute.length === 3 )
            {
               processEventListener(aElem, attribute, attributes[1], attributes[2]);
            }
            break;
         }
      }
   }
}


//////////////////////////////////////////////////////////////////////
// Create a new element of the DOM
//   call syntax:
//   1)   $e(type)
//   2)   $e(type, innerHTML)
//   3)   $e(type, childNode)
//   4)   $e(type, [attributes])
//   5)   $e(type, [attributes], innerHTML)
//   6)   $e(type, [attributes], childNode)
//   7)   $e(type, [attributes], [children])
//   8)   $e(type, null,         one of above)

function $e(aType, attributes, content)
{
   var node = document.createElement(aType); 

   /*
   if ( arguments.length === 2 && 
        ( !(attributes instanceof Array) || typeof attributes === "string" ) )
   {
      content = attributes;
      attributes = null;
   }
   */  
   if ( !(attributes instanceof Array) && !(attributes === null || attributes === undefined) )
   {
      content = attributes;
      attributes = null;
   }

   $at(node, attributes);
   
   if ( content !== null && content !== undefined )
   {
      if ( typeof content === "object" ) 
      {
         addChildren(node,content);
      }
      else if ( content !== "" ) 
      {
         node.innerHTML = content; 
      }
   }
   return node;
}

//////////////////////////////////////////////////////////////////////
function $i(att)
{
   var aInput = document.createElement("input");
   $at(aInput, att);
   return aInput;
}
//End (Code snippits from Travian4 Beyond - SSE)

var listen = document.getElementsByClassName("markAll");
for (var i=0;i<listen.length;i++){
var inputg = $i([['type', 'checkbox'], ['id', 'mark_green'+i]]);
var inputgl = $e("label","uncheck red");
inputg.addEventListener("click", function() 
	{var entrees = document.getElementsByClassName("slotRow");
	for (var k=0;k<entrees.length;k++)
	{
	try{
	if (entrees[k].getElementsByClassName("lastRaid")[0].getElementsByTagName("img")[0].getAttribute('class') == "iReport iReport3")
	{entrees[k].getElementsByTagName("input")[0].checked=false;
	}
	}
	catch(err){	
	//alert("Error description: " + err.message + "and k ="+k + "and innerhtml ="+entrees[k].innerHTML);
	}
	}
	}
, true);
listen[i].appendChild(inputg);
listen[i].appendChild(inputgl);
}