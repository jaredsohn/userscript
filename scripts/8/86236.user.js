// ==UserScript==
// @name           SHJS - Syntax Highlighting in JavaScript 1.7 (sh_html.min.js)
// @copyright      (C) 2007, 2008 gnombat@users.sourceforge.net
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
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
// @description    Minified SHJS - Syntax Highlighting in JavaScript 1.7 (sh_html.min.js)
// @exclude *
// @build     1
//
// ==/UserScript==
if(!this.sh_languages){this.sh_languages={}}sh_languages.html=[[{next:1,regex:/<!DOCTYPE/g,state:1,style:"sh_preproc"},{next:3,regex:/<!--/g,style:"sh_comment"},{regex:/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,style:"sh_keyword"},{next:4,regex:/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,state:1,style:"sh_keyword"},{regex:/&(?:[A-Za-z0-9]+);/g,style:"sh_preproc"}],[{exit:true,regex:/>/g,style:"sh_preproc"},{next:2,regex:/"/g,style:"sh_string"}],[{regex:/\\(?:\\|")/g},{exit:true,regex:/"/g,style:"sh_string"}],[{exit:true,regex:/-->/g,style:"sh_comment"},{next:3,regex:/<!--/g,style:"sh_comment"}],[{exit:true,regex:/(?:\/)?>/g,style:"sh_keyword"},{regex:/[^=" \t>]+/g,style:"sh_type"},{regex:/=/g,style:"sh_symbol"},{next:5,regex:/"/g,style:"sh_string"}],[{regex:/\\(?:\\|")/g},{exit:true,regex:/"/g,style:"sh_string"}]];