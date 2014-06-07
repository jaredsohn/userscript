// ==UserScript==
// @name           Title remover
// @namespace      http://userscripts.org/users/26596
// @description    Removes "paid titles" from leprosorium.ru
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// ==/UserScript==

hideTitles();

function hideTitles() {

	var comments = document.getElementById("js-commentsHolder");

	if (comments) {

		var peas = comments.getElementsByClassName("p");
		// lines under the comment

		for (var i = 0; i < peas.length; i++) {

			var pea = peas[i];
			var n = pea.childNodes[2];

			if (n.nodeValue.length > 18) {
			// there IS a title

				var old = trim(n.nodeValue).split(' ');
				var fixed = ' '+ old[0] + ' ';
				n.nodeValue = fixed;
				// title is removed from sight

				var a = pea.childNodes[3];
				a.title = old.splice(1,old.length).join(' ');
				// and stored into a title of a link

			}

		}

	}

}

function trimLeft(str) {
  return str.replace(/^\s+/, '');
}

function trimRight(str) {
  return str.replace(/\s+$/, '');
}

function trim(str) {
  return trimRight(trimLeft(str));
}
