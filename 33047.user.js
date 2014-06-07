// ==UserScript==
// @description    Let's try to count people in some inbox
// @name           inbox_member_count
// @namespace      ru.lepra.anatol
// @include        http://leprosorium.ru/my/inbox/*
// @include        http://www.leprosorium.ru/my/inbox/*
// @exclude        http://leprosorium.ru/my/inbox/
// @exclude        http://www.leprosorium.ru/my/inbox/
// ==/UserScript==

function xPathAll(s, parent){return document.evaluate(s, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)}
function xPathSingle(xpath, parent){return document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}

var numbers = new Array;
function addNumBeforeItem(n, it) {
	var span = document.createElement('span');
	span.innerHTML = '<span class="inbox_member_number">' + n + ' </span>';
  it.parentNode.insertBefore( span, it );
  numbers.push(span);
}

var members = xPathAll("//a[@class='js-inboxPerson-name']", document);
var max_n = members.snapshotLength;
for( var i = 0; i < members.snapshotLength; i++ ) {
	addNumBeforeItem( i + 1, members.snapshotItem(i) );
}

//event listeners
var inboxPeople = xPathSingle('//div[@class="js-inboxPeople"]', document);
inboxPeople.addEventListener('DOMNodeInserted', personAdded, false);
inboxPeople.addEventListener('DOMNodeRemoved', nodeRemoved, true);

function personAdded(event) {
	if( event.target.childNodes[3] ) {
		max_n++;
		addNumBeforeItem(max_n, event.target.childNodes[3]);
	}
}

function nodeRemoved(e) {
		if ( e.target.className == 'js-inboxPerson' ) {
			for ( var i = 0; i < numbers.length; i++ ) {
				if ( !numbers[i].innerHTML ) {
					numbers.splice(i, 1);
					break;
				}
			}
			max_n = numbers.length;
			for ( var i = 0; i < numbers.length; i++ ) {
				numbers[i].textContent = i+1 + ' ';
			}
		}
}
