/*
Fuck You, World - (c) 2007+, Mario Lewin, based on Hello, world

This Greasemonkey User Script is designed to show the basic structure/outline
of an anonymous GM script and to test out the posting options
available on http://userscripts.org/

***** THIS IS NOT INTENDED TO BE USED ON A FULL TIME BASIS *****

LICENSE
=======
This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; version 3 of the License or any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA


CHANGELOG
=========
http://userscripts.org/topics/23565

*/

// ==UserScript==
// @name          Fuck You, World
// @namespace     http://localhost
// @description   JavaScript alert box saying Hello, world
// @copyright     2007+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/ 
// @version       0.0.12
// @include       http://*
// @exclude
// @uso:script    13701
// ==/UserScript==

(function()
/* NOTE: It's important to encapsulate a user script in an anonymous
         function to minimize the namespace pollution. 

         This is usually handled by most versions of Greasemonkey, however 
         in version 0.8.0 this was temporarily removed. Better to be safe. */
{  
  alert( 'Hello, World!' );

  /* NOTE: Why would I want to torture myself this way by installing
           this script instead of clicking view script source?       */
}
)();

