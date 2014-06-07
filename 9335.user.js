// net.gumonji.idealist.countcomment
// version 1.1
// 2007-05-18 (last updated 2007-05-26)
// by ento
//
// Copyright (c) 2007 ento
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
//
// -----------------------------------------------------------------
//
// What I can do:
//   * display the number of comments as contained in link hrefs in the form of comment_count=\d+
//
// -----------------------------------------------------------------
// changelog
//
//   v1.1 2007-05-26 : minor update
//   v1.0 2007-05-18 : first release
// -----------------------------------------------------------------
//
// ==UserScript==
// @name            net.gumonji.idealist.countcomment
// @namespace       tag:ento@ce-lab.net,2007-05-18:countcomment
// @description     for gumonji idea list; display comment counts along the ideas.
// @include         http://www.gumonji.net/cgi-bin/idea_list.cgi*
// ==/UserScript==

(function(){
    var a = document.getElementsByTagName('a');
    for(i = 0; i < a.length; i++){
        var url = a[i].getAttribute('href');
        var match = url.match(/comment_count=(\d+)/);
        
        if(match){
            var span = document.createElement('span');
            span.setAttribute('class', 'comment_count');
            span.innerHTML = match[1];
            a[i].parentNode.appendChild(span);
        }
    }
})();
