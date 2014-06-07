// PHPDN Rules Inserter

// version 0.2

// 01-19-2010

// Copyright (c) 2010, Jonah Dahlquist

// Released under the GPL license

// http://www.gnu.org/copyleft/gpl.html

//

// ==UserScript==

// @name           PHPDN Rules Inserter

// @namespace      phpdn-rules-inserter

// @description    A simple script to show a dropdown menu to insert forum rules into a post

// @include        http://forums.devnetwork.net/posting.php*

// ==/UserScript==



document.getElementById('format-buttons').innerHTML += "<select onchange=\"insert_text(this.value);this.getElementsByTagName('option')[0].selected='true';\">" +

"<option id=\"reset_inserter\" value=''>Insert Rule...</option>"+

"<option value='[quote=\"[url=http://forums.devnetwork.net/viewtopic.php?t=30037]Forum Rules[/url]\"]1. Select the correct board for your query. Take some time to read the guidelines in the sticky topic.[/quote]'>Post in correct board...</option>" +

"<option value='[quote=\"[url=http://forums.devnetwork.net/viewtopic.php?t=30037]Forum Rules[/url]\"]2. Use descriptive subjects when you start a new thread. Vague titles such as \"Help!\", \"Why?\" are misleading and keep you from receiving an answer to your question.[/quote]'>Descriptive subjects...</option>" +

"<option value='[quote=\"[url=http://forums.devnetwork.net/viewtopic.php?t=30037]Forum Rules[/url]\"]2.1 When asking a question, be as specific as you can be, provide the relevant code and any other information that is helpful in a concise and coherent manner.[/quote]'>Post code...</option>" +

"<option value='[quote=\"[url=http://forums.devnetwork.net/viewtopic.php?t=30037]Forum Rules[/url]\"]11. Please use proper, complete spelling when posting in the forums. AOL Speak, leet speak and other abbreviated wording can confuse those that are trying to help you (or those that you are trying to help). Please keep in mind that there are many people from many countries that use our forums to read, post and learn. They do not always speak English as well as some of us, nor do they know these aberrant abbreviations. Therefore, use as few abbreviations as possible, especially when using such simple words.[/quote]'>Grammar/spelling...</option>"+

"</select>";