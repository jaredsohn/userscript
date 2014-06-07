// ==UserScript==
// @name           remove avatars
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=4003262
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=4012225
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=4012227
// ==/UserScript==

function skip() {
	counter = counter + 2
	move_dropdown.setAttribute('src', '/game/' + identifier + '_pic.pl?' + identifier + '_id=' + parseFloat(block[counter]))

}

function remove() {
	var url = 'http://goallineblitz.com/game/' + identifier + '_pic_upload.pl?' + identifier + '_id=' + parseFloat(block[counter]) + '&action=Upload'
	GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	  	'Accept': 'application/atom+xml,application/xml,text/xml'}
	})
	counter = counter + 2
	move_dropdown.setAttribute('src', '/game/' + identifier + '_pic.pl?' + identifier + '_id=' + parseFloat(block[counter]))
}

var counter = 1
var header = document.getElementById('header')
var list = document.getElementById('post_content_35807876')
var identifier = "user"
if (list == null) {
var list = document.getElementById('post_content_35901769')
identifier = "player"
}
if (list == null) {
var list = document.getElementById('post_content_35901756')
identifier = "team"
}
var block = list.innerHTML.split(identifier + '_id=')

var move_button = document.createElement('div');
move_button.setAttribute('class', 'tab_off');
var move_input = document.createElement('input');
var move_input2 = document.createElement('input');
move_input.setAttribute('type', 'button');
move_input.setAttribute('value', 'Skip');
move_input2.setAttribute('type', 'button');
move_input2.setAttribute('value', 'Remove');

var move_dropdown = document.createElement('img');
move_dropdown.setAttribute('src', '/game/user_pic.pl?user_id=228787')
move_dropdown.setAttribute('width', '75')
move_dropdown.setAttribute('height', '75')
move_button.appendChild(move_dropdown);
move_button.appendChild(move_input);
move_button.appendChild(move_input2);

move_button.setAttribute('style', 'border-style: solid; border-width: 1px; background: url(http://goallineblitz.com/images/game/design/dark_content_container.jpg);background-repeat: repeat; width: 175px; height: 90px; position: absolute; left: 362px; top: 200px; z-index:3;');
header.appendChild(move_button)
move_input.addEventListener("click", skip, false)
move_input2.addEventListener("click", remove, false)