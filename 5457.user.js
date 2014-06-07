// ySearch.org haplotype comparison to Fluxus Network Y-STR datafile
// version 1.2
// 2007-08-30
// Copyright (c) 2005, Ted Kandell ted underscore kandell at yahoo dot com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// http://www.citeulike.org/user/Archaeogenetics
// --------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ySearch Y chromosome STR haplotype table to Fluxus Network Y-STR datafile", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name          ySearch Y chromosome STR haplotype table to Fluxus Network Y-STR datafile
// @namespace     http://www.citeulike.org/user/Archaeogenetics
// @description   ySearch (http://www.ysearch.org) haplotype comparison table to a Fluxus Network Y-STR data (.ych) input file. The free Fluxus Network software (http://www.fluxus-engineering.com/sharenet.htm) generates median-joining networks which can be used for the phylogenetic analysis of a set of DNA haplotypes.
// @include       http://www.ysearch.org/research_comparative.asp*
// ==/UserScript==

// Global regular expression, instantiated only once for efficiency

this.whiteSpace = new RegExp("\\s*", "g");

// Code to enable passing of a function as a parameter to another function
// Create an unnamed function as a prototype member of an object,
// then pass the object into another function which dereferences and calls it

function obj()
{
}
obj.prototype.removeWhitespace = function(s)
{
   return s.replace(whiteSpace, "");
}
function insertNullValue(s)
{
   if (!s)
   {
     s = "";
   }

   s = s.replace(whiteSpace, "");

   if (s == "")
   {
      s = "99";
   }

   return s;
}
function objectchanger(fnc, obj, param)
{
   return fnc.call(obj, param);     
}

//=========================================
// Find and concatenate the values of all text nodes contained within the
// element.

function getTextValue(element, func) 
{
   var i;
   var s;
   var o = new obj();
 
   s = "";
   
   for (i = 0; i < element.childNodes.length; i++)
   {
      if (element.childNodes[i].nodeType == document.TEXT_NODE)
      {
         s += element.childNodes[i].nodeValue;
      }
      else
      {
        // Use recursion to get text within sub-elements.
        s += getTextValue(element.childNodes[i]);
      }
    }
 
    s = objectchanger(o.removeWhitespace, o, s);

    return s;
}

function reformat()
{ 
   var o = new obj();

   var headerCells = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/th", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

   var header = "";
   var s = "";

   for (var i = 3; i < headerCells.snapshotLength; i++)
   {
      if (i > 3)
      {
         header += ",";
      }

      // number the STRs instead of naming them because of the 1 KB limitation 
      // in Network per haplotype.

      header += i-2;

      // DYS464
      if (i == 24)
      {
         i += 3;
      }

      if (i == 36)
      {
        i += 1;
     }
   }

   var dataRows = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

   document.writeln(header + "<BR/>\n<BR/>\n<BR/>\n");

   var plus = new RegExp("\\+.*$", "");
   var id = "";

   for (var i = 1; i < dataRows.snapshotLength; i++)
   {
      var row = dataRows.snapshotItem(i);

      id = row.childNodes[0].firstChild.nodeValue;

      document.writeln(id + "<BR/>\n");

      var data = "";
         
      for (var j = 3; j < row.childNodes.length; j++)
      {
         if (j > 3)
         {
            data += ",";
         }

         s = row.childNodes[j].firstChild.nodeValue;
         // calculate DYS389b
         if (j == 12) // DYS389I
         {
            DYS389I = s;
         }
         else if (j == 14) // DYS389II
         {
            s = s - DYS389I;
            s = s + "";
         }
         
         // Special handling of DYS464
         // sum the values of each allele 

         if (j == 24) 
         {           
            var allele=0, total=0;  
            for (var k = 1; k < 4; k++)
            {
                if (s)
                {
                   s = s.replace(whiteSpace, "");
                }

                allele = parseInt(s);

		if (isNaN(allele))
                {
                   break;
                }	
                    
                total += allele;               
               
                s = row.childNodes[j+k].firstChild.nodeValue;
            }

            if (isNaN(total) || total == 0)
            {
               total = 99;
            }            
            else if (total >= 99)
            {
               total = total / 2;
            }

            s = "" + Math.round(total);

            j += 3;
         }
         else if (j == 36) // sum both CDY/DYS724 values
         {
	    total = parseInt(s) + 
                    parseInt( row.childNodes[j+1].firstChild.nodeValue);

            if (isNaN(s) || s == 0)
            {
               total = 99;
            }
             
            s = "" + total;

            j += 1;
         }

         data += insertNullValue(s);                
      }       

      document.writeln(data + "<BR/>\n");

      document.writeln("1<BR/>\n");
   }

   document.close();
}

window.addEventListener("load", reformat, false);

