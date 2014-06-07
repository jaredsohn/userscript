// FTDNA Project to Fluxus Network Y-STR datafile
// version 2.2
// 2007-08-28
// Copyright (c) 2005, Ted Kandell ted underscore kandell at yahoo dot com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// http://www.citeulike.org/user/Archaeogenetics
// --------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  
// To install it, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script, and you will prompted to install it. 
//
// To disable, reenable, or uninstall this script, go to Tools->Greasemonkey->Manage User Scripts.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name          Family Tree DNA Project Y chromosome STR haplotype table to Fluxus Network Y-STR datafile
// @namespace     http://www.citeulike.org/user/Archaeogenetics
// @description   Convert a Family Tree DNA (http://www.familytreedna.com) haplogroup or surname project haplotype table to a Fluxus Network Y-STR data (.ych) input file. The free Fluxus Network software (http://www.fluxus-engineering.com/sharenet.htm) generates median-joining networks which can be used for the phylogenetic analysis of a set of DNA haplotypes.
// @include       http://www.familytreedna.com/ftGroups_score_frame_classic.aspx*
// @include       http://www.familytreedna.com/*/ftGroups_score_frame_classic.aspx*
// ==/UserScript==


//=========================================
// Find and concatenate the values of all text nodes contained within the
// element. Why do we have to resort to a recursive function to do this?
// The DOM parser in Java always gives the nodeValue of an element as the
// concatenated string of all the nodeValues of the elements in the subtree 
// below. Why doesn't this work in Javascript, as it should?

var whiteSpace = new RegExp("\\s*", "g");

function getTextValue(element) 
{
   var i;
   var s;

   s = "";
   
   for (var i = 0; i < element.childNodes.length; i++)
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
 
    s = s.replace(whiteSpace, "");

    return s;
}

function setMinimumSTRs()
{
   var minimumSTRs = GM_getValue("minimumSTRs", 67);
   minimumSTRs = prompt("Minimum number of STRs in haplotype: ", minimumSTRs); 
   
   minimumSTRs = parseInt(minimumSTRs);

   if (isNaN(minimumSTRs))
   {
      minimumSTRs = 67;
   }

   GM_setValue("minimumSTRs", minimumSTRs);
}

var offset = 0;

var DYS464 =
{
   start : 0,
   length : 0
};

var CDY =
{
   start : 0 
};

function parseHeader(headerCells)
{
   var str = "";
   
   for (var i = 0; i < headerCells.snapshotLength; i++)
   {
      str = getTextValue(headerCells.snapshotItem(i));
     
      if (str == "*Haplo")
      {
         offset = i+1;
      }
 
      if (str == "464a")
      {
         DYS464.start = i;
      }
      else if (DYS464.start && !DYS464.length && str.indexOf("464") == -1)
      {
         DYS464.length = i- DYS464.start;
      }
      
      if (str == "CDYa")
      {
         CDY.start = i;
         return;
      }
   }
}

function reformat()
{ 
   var headerCells = document.evaluate('//tr[2]/th|//tr[2]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

   parseHeader(headerCells);

   var header = "";
   var s1 = "";

   GM_registerMenuCommand("Set minimum STRs", setMinimumSTRs);

   var minimumSTRs = GM_getValue("minimumSTRs", 67);

   var haplotypeLength = minimumSTRs;

   minimumSTRs += offset-1;
  
   if (minimumSTRs >= DYS464.start && 
       minimumSTRs < DYS464.start + DYS464.length)
   {
      minimumSTRs = DYS464.start;
   }
 
   // after DYS464 add on the extra DYS464 values over 4
   if (minimumSTRs > DYS464.start + DYS464.length)
   {
      minimumSTRs += DYS464.length - 4;
   }

   if (minimumSTRs > headerCells.snapshotLength-1)
   {
      minimumSTRs = headerCells.snapshotLength-1;
   }

   for (var i = offset; i < headerCells.snapshotLength; i++)
   {
      if (haplotypeLength > 0 && i > minimumSTRs)
      {
         break;   
      }

      if (i > offset)
      {
         header += ",";
      }

      // number the STRs instead of naming them because of the 1 KB limitation 
      // in Network per haplotype.
 
      header += i-offset+1;

      if (i == DYS464.start) // DYS464
      {
         i += DYS464.length-1;
      }

      if (i == CDY.start) // CDY/DYS724
      {
         i += 1;
      }
   }
  
   var dataRows = document.evaluate('//tr[count(td) > 2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

   document.writeln(header + "<BR/>\n<BR/>\n<BR/>\n");

   var plus = new RegExp("\\+.*$", "");
   var kit = "", oldkit = "";
   var count = 0;

   for (var i = 1; i < dataRows.snapshotLength; i++)
   {
      var row = dataRows.snapshotItem(i);

      kit = row.childNodes[1].firstChild.nodeValue;

      if ((haplotypeLength == 0 && row.childNodes.length < offset) ||
          (haplotypeLength > 0 &&
           (!row.childNodes[minimumSTRs] ||
            row.childNodes[minimumSTRs].firstChild.nodeValue == 0)))
      {
          continue;
      }

      // test the middle panels to make sure none are missing

      // Panel 2 - we can use DYS464.start
      if (haplotypeLength >= 25 &&
          (!row.childNodes[DYS464.start] ||
           row.childNodes[DYS464.start].firstChild.nodeValue == 0))
      {
          continue;
      }

      // Panel 3 - we can use CDY.start
      if (haplotypeLength >= 37 &&
          (!row.childNodes[CDY.start] ||
           row.childNodes[CDY.start].firstChild.nodeValue == 0))
      {
          continue;
      }

      // Panel 4 - 38-47
      if (haplotypeLength > 37 &&
          (!row.childNodes[CDY.start+4] ||
           row.childNodes[CDY.start+4].firstChild.nodeValue == 0))
      {
          continue;
      }
           
      // Panel 5 - 48-59 - +15 to avoid DYS425 at +14
      if (haplotypeLength > 37 &&
          (!row.childNodes[CDY.start+15] ||
           row.childNodes[CDY.start+15].firstChild.nodeValue == 0))
      {
          continue;
      }

      // handle duplicate rows in the table
      if (kit == oldkit)
      {
         continue;
      }
      oldkit = kit;

      document.writeln(kit + "<BR/>\n");

      var data = "";
      var DYS389I = 0;
         
      for (var j = offset; j < row.childNodes.length; j++)
      {
         if (haplotypeLength > 0 && j > minimumSTRs)
         {
            break;   
         }

         if (j > offset)
         {
            data += ",";
         }

         s = row.childNodes[j].firstChild.nodeValue;
       
         // calculate DYS389b
         if (j == offset+9) // DYS389I
         {
            DYS389I = s;
         }
         else if (j == offset+11) // DYS389II
         {
            s = s - DYS389I;
            s = s + "";
         }
         
         // Special handling of DYS464
         // sum the values of each (allele * 1.5), then round the result
         // if the value >= 99, divide it by 2 

         if (j == DYS464.start) 
         {           
            var allele=0, total=0;  
            for (var k = 1; k < 5; k++)
            {
                s = s.replace(whiteSpace, "");
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

            s = Math.round(total);

            j += DYS464.length-1;
         }
         else if (j == CDY.start) // sum both CDY/DYS724 values
         {
	    s = parseInt(s) + 
                parseInt( row.childNodes[j+1].firstChild.nodeValue);

            if (isNaN(s) || s == 0)
            {
               s = 99;
            }
             
            j += 1;
         }
         else
         {
            // handling of "null DYS439" as <SPAN color=blue><STRONG>
            if (s == null)
            {
               s = "99";
            }
               
            if (s != null)
            {
               s = s.replace(plus, "");
               s = s.replace(whiteSpace, "");
            }
            else
            {
               GM_log("row.childNodes[" + j + "] has no properties!");
            }

            // Null DYS425 and other null values become 99
            // this is to bypass the stepwise mutation model of Network
            // which creates STR alleles from 0 upward and therefore
            // creates very inaccurate networks unless null values are ignored

   	    if (s == "" || s == "  " || s == "0")
            {
               s = "99";
            }
         }

         data += s;    
      }                   

      document.writeln(data + "<BR/>\n");
      document.writeln("1<BR/>\n");
      count++;
   }

   document.close();
   window.alert("Number of " + haplotypeLength + " STR haplotypes found: " + count);
}

window.addEventListener("load", reformat, true);
