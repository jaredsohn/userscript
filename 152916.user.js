// ==UserScript==
// @name           SHJS - Syntax Highlighting in JavaScript 1.7 (sh_diff.min.js)
// @copyright      (C) 2007, 2008 gnombat@users.sourceforge.net
// @license        GPL version 3; http://www.gnu.org/copyleft/gpl.html
// @version        0.5
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// @namespace      http://userscripts.org/users/37004
// @author         Marti Martz
// @homepage       http://userscripts.org/users/37004
// @description    Minified SHJS - Syntax Highlighting in JavaScript 1.7 (sh_diff.min.js)
// @exclude *
// @build     1
//
// ==/UserScript==

if(!this.sh_languages){this.sh_languages={}}sh_languages.diff=[[{next:1,regex:/(?=^@@)/g,state:1,style:"sh_difflines"},{next:6,regex:/(?=^[*]{3})/g,state:1,style:"sh_oldfile"},{next:14,regex:/(?=^[\d])/g,state:1,style:"sh_difflines"}],[{next:2,regex:/^[-]{3}/g,style:"sh_oldfile"},{next:3,regex:/^[-]/g,style:"sh_oldfile"},{next:4,regex:/^[+]/g,style:"sh_newfile"},{next:5,regex:/^@@/g,style:"sh_difflines"}],[{exit:true,regex:/$/g}],[{exit:true,regex:/$/g}],[{exit:true,regex:/$/g}],[{exit:true,regex:/$/g}],[{next:7,regex:/^[*]{3}[ \t]+[\d]/g,style:"sh_oldfile"},{next:9,regex:/^[*]{3}/g,style:"sh_oldfile"},{next:10,regex:/^[-]{3}[ \t]+[\d]/g,style:"sh_newfile"},{next:13,regex:/^[-]{3}/g,style:"sh_newfile"}],[{next:8,regex:/^[\s]/g,style:"sh_normal"},{exit:true,regex:/(?=^[-]{3})/g,style:"sh_newfile"}],[{exit:true,regex:/$/g}],[{exit:true,regex:/$/g}],[{next:11,regex:/^[\s]/g,style:"sh_normal"},{exit:true,regex:/(?=^[*]{3})/g,style:"sh_newfile"},{exit:true,next:12,regex:/^diff/g,style:"sh_normal"}],[{exit:true,regex:/$/g}],[{exit:true,regex:/$/g}],[{exit:true,regex:/$/g}],[{next:15,regex:/^[\d]/g,style:"sh_difflines"},{next:16,regex:/^[<]/g,style:"sh_oldfile"},{next:17,regex:/^[>]/g,style:"sh_newfile"}],[{exit:true,regex:/$/g}],[{exit:true,regex:/$/g}],[{exit:true,regex:/$/g}]];