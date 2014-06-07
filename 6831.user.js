// ==UserScript==
// @name          Last.fm: Play Statistics
// @description   Displays more detailed play statistics (tracks per hour, day, ..., year)
// @include       http://www.last.fm/user/*
// ==/UserScript==

/*
BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson arvid.jakobsson@gmail.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/

/*
** Updated 20 Dec 2006 Joe Shamah <joe@mrsomeone.com>
** Updated 12 Feb 2007 Joe Shamah <joe@mrsomeone.com>
 */

   function xpath(query, context)
   {
      return document.evaluate(query, context, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   }

   function addSeparatorsNF(nStr, inD, outD, sep) /* http://www.mredkj.com/javascript/nfbasic.html */
   {
      nStr += '';
      var dpos = nStr.indexOf(inD);
      var nStrEnd = '';
      if (dpos != -1) {
         nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
         nStr = nStr.substring(0, dpos);
      }
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(nStr)) {
         nStr = nStr.replace(rgx, '$1' + sep + '$2');
      }
      return nStr + nStrEnd;
   }

   var panel = document.getElementById("avatarPanel");
   var tracksplayed = panel.innerHTML.match(/Tracks played:[^\d]+([\d\,]+)/)[1];
   tracksplayed = tracksplayed.replace(/,/g,'');

   if (panel.innerHTML.match(/\(reset on (.*)\)/)) {
      var reg_date = panel.innerHTML.match(/\(reset on (.*)\)/)[1];
   }
   else {
      var reg_date = panel.innerHTML.match(/Registered:<\/strong>(.*)/)[1];
   }
   var reg_date_ms = Date.parse(reg_date);
   var now = new Date();
   var diff = Math.round(now - reg_date_ms)/1000;

   var hours = diff / (60*60);
   var days = diff / (60*60*24);
   var weeks = diff / (60*60*24*7);
   var months = diff / (60*60*24*31);
   var years = diff / (60*60*24*365);

   var tracks_per_hour = tracksplayed / hours;
   var tracks_per_day = tracksplayed / days;
   var tracks_per_week = tracksplayed / weeks;
   var tracks_per_month = tracksplayed / months;
   var tracks_per_year = tracksplayed / years;
   var tph = Math.round(tracks_per_hour*1000)/1000;
   var tpd = Math.round(tracks_per_day*1000)/1000;
   var tpw = Math.round(tracks_per_week*1000)/1000;
   var tpm = Math.round(tracks_per_month*1000)/1000;
   var tpy = Math.round(tracks_per_year);

   var paragraphs = xpath(".//DIV[@class='c']/P", panel);
   for (var i = 0; i < paragraphs.snapshotLength; i++)
   {
      var paragraph = paragraphs.snapshotItem(i);
      if (paragraph.innerHTML.match(/Tracks played:/))
      {
         var beg = "Tracks ";
         var p = new Array();
         p[0] = document.createElement("span");
         p[0].innerHTML = "<strong class=\"lfmlight\">" + beg + "per year:</strong> " + addSeparatorsNF(tpy, '.', '.', ',') + " <br /> ";
         p[1] = document.createElement("span");
         p[1].innerHTML = "<strong class=\"lfmlight\">" + beg + "per month:</strong> " + addSeparatorsNF(tpm.toFixed(1), '.', '.', ',') + " <br /> ";
         p[2] = document.createElement("span");
         p[2].innerHTML = "<strong class=\"lfmlight\">" + beg + "per week:</strong> " + addSeparatorsNF(tpw.toFixed(1), '.', '.', ',') + " <br /> ";
         p[3] = document.createElement("span");
         p[3].innerHTML = "<strong class=\"lfmlight\">" + beg + "per day:</strong> " + addSeparatorsNF(tpd.toFixed(1), '.', '.', ',') + " <br /> ";
         p[4] = document.createElement("span");
         p[4].innerHTML = "<strong class=\"lfmlight\">" + beg + "per hour:</strong> " + addSeparatorsNF(tph.toFixed(1), '.', '.', ',') + " <br /> ";

         for (var ii = 0; ii < 5; ii++)
         {
            paragraph.insertBefore(p[ii], paragraph.childNodes[4]);
         }
      }
   }

