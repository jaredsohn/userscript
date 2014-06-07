// ==UserScript==
// @name           SHJS - Syntax Highlighting in JavaScript 1.7 (sh_javascript.min.js)
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
// @description    Minified SHJS - Syntax Highlighting in JavaScript 1.7 (sh_javascript.min.js)
// @exclude *
// @build     9
//
// ==/UserScript==
if(!this.sh_languages){this.sh_languages={}}sh_languages.javascript=[[{next:1,regex:/\/\/\//g,style:"sh_comment"},{next:7,regex:/\/\//g,style:"sh_comment"},{next:8,regex:/\/\*\*/g,style:"sh_comment"},{next:14,regex:/\/\*/g,style:"sh_comment"},{regex:/\/(?:\\.|[^\\\/])+\/[gim]*(?![*\/])/g,style:"sh_regexp"},{regex:/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,style:"sh_number"},{next:15,regex:/"/g,style:"sh_string"},{next:16,regex:/'/g,style:"sh_string"},{regex:/\b(?:break|case|catch|class|const|continue|default|delete|do|each|else|enum|export|extends|false|final|finally|for|function|if|import|in|instanceof|let|new|null|return|super|switch|throw|this|true|try|typeof|var|while|with|yield)\b/g,style:"sh_keyword"},{regex:/\b(?:int|byte|boolean|char|long|float|double|short|void)\b/g,style:"sh_type"},{regex:/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,style:"sh_symbol"},{regex:/\{|\}/g,style:"sh_cbracket"},{regex:/(?:[A-Za-z]|_|\$)[A-Za-z0-9_\$]*[ \t]*(?=\()/g,style:"sh_function"}],[{exit:true,regex:/$/g},{regex:/(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,style:"sh_url"},{regex:/(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,style:"sh_url"},{next:2,regex:/<!DOCTYPE/g,state:1,style:"sh_preproc"},{next:4,regex:/<!--/g,style:"sh_comment"},{regex:/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,style:"sh_keyword"},{next:5,regex:/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,state:1,style:"sh_keyword"},{regex:/&(?:[A-Za-z0-9]+);/g,style:"sh_preproc"},{regex:/@[A-Za-z]+/g,style:"sh_type"},{regex:/(?:TODO|FIXME)(?:[:]?)/g,style:"sh_todo"}],[{exit:true,regex:/>/g,style:"sh_preproc"},{next:3,regex:/"/g,style:"sh_string"}],[{regex:/\\(?:\\|")/g},{exit:true,regex:/"/g,style:"sh_string"}],[{exit:true,regex:/-->/g,style:"sh_comment"},{next:4,regex:/<!--/g,style:"sh_comment"}],[{exit:true,regex:/(?:\/)?>/g,style:"sh_keyword"},{regex:/[^=" \t>]+/g,style:"sh_type"},{regex:/=/g,style:"sh_symbol"},{next:6,regex:/"/g,style:"sh_string"}],[{regex:/\\(?:\\|")/g},{exit:true,regex:/"/g,style:"sh_string"}],[{exit:true,regex:/$/g}],[{exit:true,regex:/\*\//g,style:"sh_comment"},{regex:/(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,style:"sh_url"},{regex:/(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,style:"sh_url"},{next:9,regex:/<!DOCTYPE/g,state:1,style:"sh_preproc"},{next:11,regex:/<!--/g,style:"sh_comment"},{regex:/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,style:"sh_keyword"},{next:12,regex:/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,state:1,style:"sh_keyword"},{regex:/&(?:[A-Za-z0-9]+);/g,style:"sh_preproc"},{regex:/@[A-Za-z]+/g,style:"sh_type"},{regex:/(?:TODO|FIXME)(?:[:]?)/g,style:"sh_todo"}],[{exit:true,regex:/>/g,style:"sh_preproc"},{next:10,regex:/"/g,style:"sh_string"}],[{regex:/\\(?:\\|")/g},{exit:true,regex:/"/g,style:"sh_string"}],[{exit:true,regex:/-->/g,style:"sh_comment"},{next:11,regex:/<!--/g,style:"sh_comment"}],[{exit:true,regex:/(?:\/)?>/g,style:"sh_keyword"},{regex:/[^=" \t>]+/g,style:"sh_type"},{regex:/=/g,style:"sh_symbol"},{next:13,regex:/"/g,style:"sh_string"}],[{regex:/\\(?:\\|")/g},{exit:true,regex:/"/g,style:"sh_string"}],[{exit:true,regex:/\*\//g,style:"sh_comment"},{regex:/(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,style:"sh_url"},{regex:/(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,style:"sh_url"},{regex:/(?:TODO|FIXME)(?:[:]?)/g,style:"sh_todo"}],[{exit:true,regex:/"/g,style:"sh_string"},{regex:/\\./g,style:"sh_specialchar"}],[{exit:true,regex:/'/g,style:"sh_string"},{regex:/\\./g,style:"sh_specialchar"}]];
