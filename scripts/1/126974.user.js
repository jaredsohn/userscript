// ==UserScript==
// @name          Kuban_ru_ignore_users
// @namespace     http://userscripts.org
// @description   Ingnore users for forums.kuban.ru.
// @include       http://forums.kuban.ru/*
// ==/UserScript==

/********************************************************************************
 * INFORMATION                                                                  *
 *                                                                              *
 * Version: 0.1                                                                 *
 * Last Modified: 28 February 2012 10:00  GMT+4                                 *
 * Original Authors: vxd707                                                     *
 *                                                                              *
 * LICENSE                                                                      *
 *                                                                              *
 * Released under the GPL license                                               *
 * http://www.gnu.org/copyleft/gpl.html                                         *
 *                                                                              *
 * This program is free software: you can redistribute it and/or modify it      *
 * under the terms of the GNU General Public License as published by the        *
 * Free Software Foundation, either version 3 of the License, or                *
 * (at your option) any later version.                                          *
 *                                                                              *
 * This program is distributed in the hope that it will be useful, but          *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY   *
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License     *
 * for more details.                                                            *
 *                                                                              *
 * You should have received a copy of the GNU General Public License along with *
 * this program.  If not, see <http://www.gnu.org/licenses/>.                   *
 ********************************************************************************/
 
 
(function(){
	/**************** Ignore users list ****************/
	var ignores = ['User1', 'User2'];
	
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	style.type = 'text/css';
	style.media = 'screen';
	style.appendChild(document.createTextNode('.ignored_post_hidden {display: none}'));
	head.appendChild(style);
	
	var ignoreUser = function(name) {
		for(var i = 0, size = ignores.length; i < size; i++) {
			if(ignores[i] == name) {
				return true;
			}
		}
		return false;
	}

	var post = document.querySelector("#post tbody");	
	if(post) {
		var counter = 0;
		var rows = document.querySelectorAll("#post tbody>tr");
		for(var i = 1, size = rows.length; i < size; i++) {
			if(rows[i].parentNode != post) {
				continue;
			}
			var username = rows[i].querySelector('.xxxbigusername>b').textContent;			
			if(ignoreUser(username)) {
				rows[i].classList.add('ignored_post');
				rows[i].classList.toggle('ignored_post_hidden');
				counter++;
			}		
		}
		if(counter > 0) {
			var a = document.createElement('a');
			a.setAttribute('href', '#');
			a.setAttribute('title', 'Скрыть/показать игнорируемые сообщения');
			a.style.color = 'red';
			a.textContent = '(' + counter + ')';
			a.addEventListener('click', function() {
				var posts = document.querySelectorAll("#post tbody tr.ignored_post");
				for(var i = 0, size = posts.length; i < size; i++) {
					posts[i].classList.toggle('ignored_post_hidden');
				}
			}, false);			
			document.querySelector('#pagetitle center i b').appendChild(a);
		}
	}
}) ();