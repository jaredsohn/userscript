// ==UserScript==
// @name           Userscripts.org Sent Messages
// @namespace      sizzlemctwizzle
// @description    Actually be able to see messages you've sent
// @version        1.0.4
// @require        http://sizzlemctwizzle.com/updater.php?id=58581
// @include        http://userscripts.org/messages
// @include        http://userscripts.org/messages/new?user_id=*
// @include        http://userscripts.org/messages/new?subject=*
// @include        http://userscripts.org/messages#*
// ==/UserScript==

// Smart XPath Function
function $x(x, t, r) {
    if (t && t.tagName) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case 1:
        p = 'numberValue';
        break;
    case 2:
        p = 'stringValue';
        break;
    case 3:
        p = 'booleanValue';
        break;
    case 8: case 9:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || 6, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}

// Optional shortcut functions I like
function $x1(x, r) { return $x(x, 9, r) } 
function $xb(x, r) { return $x(x, 3, r) }
    
// A robust and universal forEach
function forEach(lst, cb) {
    if (lst.snapshotItem)
        for (var i = 0, len = lst.snapshotLength; i < len; ++i)
            cb(lst.snapshotItem(i), i, lst);
    else if (lst.iterateNext) {
        var item;
        while (item = lst.iterateNext()) 
            cb(item, lst);
    } else if (typeof lst.length != 'undefined') 
        for (var i = 0, len = lst.length; i < len; ++i)
            cb(lst[i], i, lst);
    else 
        for (var i in lst) 
            cb(lst[i], i, lst);
}

// Insert an element after another
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling);}

function create(A, B, C) {
	if (!B) 
		A = document.createTextNode(A);
	else {
		A = document.createElement(A);
		for (var b in B) {
			if (b.indexOf("on") == 0)
				A.addEventListener(b.substring(2), B[b], false);
			else if (b == "style")
				A.setAttribute(b, B[b]);
			else
				A[b] = B[b];
		}
		if (C) 
			for(var i = 0, len = C.length; i<len; i++)
				A.appendChild(C[i]);
	}
	return A;
}
// Remove an element
function remove(element) { element.parentNode.removeChild(element); }
// Get element by id
function $(element) { return document.getElementById(element); }
// Get elements by classname
function $c(element, root, result) {
  if (result && result.tagName) 
    var temp = root, root = result, result = temp;
  var root = root || document;
  element = (root.getElementsByClassName) ? root.getElementsByClassName(element) : $x(".//*[contains(concat(' ', @class, ' '), ' " + element + " ')]", root);
  if (!result && result!=0)
    return element;
  else
    return (element.length) ? element[result] : element.snapshotItem(result);
}

if (/http:\/\/userscripts\.org\/messages$/.test(window.location.href) && window.location.hash == "") {
  var recieved = $x1('./h1/child::text()[.="Received Messages"]', $('content'));
  var seperate = create(' | ');
  insertAfter(seperate, recieved);
  insertAfter(create('a', {
      href:'#sent_box',textContent:'Sent Messages', onclick: function(e) {window.location.href="http://userscripts.org/messages#sent_box";window.location.reload()}}), seperate);
 } else if (window.location.hash == "#sent_box") {
  var recieved = $x1('./h1/child::text()[.="Received Messages"]', $('content'));
  var seperate = create(' | ');
  recieved.textContent = "Sent Messages";
  recieved.parentNode.insertBefore(seperate, recieved);
  recieved.parentNode.insertBefore(create('a', {
          href:'http://userscripts.org/messages', textContent:'Received Messages'}), seperate);
  var pagination;
  forEach($x('.//table[1]//tr', $('content')), function(tr) { remove(tr) });
  if (pagination=$c('pagination')) remove(pagination[0]);

  var table = $x1('.//table[1]', $('content'));
  table.appendChild(create('tr', {}, [create('th',{textContent:'Subject'}), create('th',{textContent:'Recipient'}), create('th',{textContent:'Date'})]));
  forEach(eval(GM_getValue('Messages', '([])')), function(message, i) {
      table.appendChild(create('tr', {}, [create('td',{},[create('a',{href:'#sent_'+i,textContent:unescape(message['subject']),onclick: function(e) {window.location.href="http://userscripts.org/messages#sent_"+e.target.href.split('#sent_')[1];window.location.reload()}})]), create('td',{},[create('a',{href:'/users/'+message['user']['id'],textContent:unescape(message['user']['name'])})]), create('td',{textContent:message['date']})]));
    });
 } else if (window.location.hash.indexOf('#sent_') == 0) {
  forEach($x('.//*', $('content')), function(el) { remove(el); });
  var message;
  if (message = eval(GM_getValue('Messages', '([])'))[window.location.hash.split('#sent_')[1]]) {
    $('content').appendChild(create('h2', {textContent:unescape(message.subject)}));
    $('content').appendChild(create('p', {className:'subtitle'},[create('to '),create('a',{href:'/users/'+message.user.id,textContent:unescape(message.user.name)}),create(' sent '+message.date)]));
    $('content').appendChild(create('p',{innerHTML:unescape(message.body)}));
    $('content').appendChild(create('p',{},[create('a',{href:'#',textContent:'delete',onclick:function(){
                var messages = eval(GM_getValue('Messages', '([])'));
                var i = window.location.hash.split('#sent_')[1];
                GM_setValue('Messages', messages.slice(0,i).concat(messages.slice(i+1)).toSource());
                window.location.href="http://userscripts.org/messages";
              }})]));
  }
 } else if (/http:\/\/userscripts\.org\/messages\/new\?(user_id|subject)=.*/.test(window.location.href)) {
  var user = $x1('./h2[1]/a[1]', $('content'));
  $('message_submit').type = "button";
  $('message_submit').setAttribute('user_id', user.getAttribute('user_id'));
  $('message_submit').title = user.textContent;
  $('message_submit').addEventListener('click', function(e) {
      if ($('message_subject').value!=''&&$('message_body').value!='') {
        var messages = eval(GM_getValue('Messages', '([])'));
        messages.push({subject:escape($('message_subject').value), body:escape($('message_body').value.replace(/((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi, '<a href="$1">$1</a>').replace(/\n/g,'<br />')), user:{id:e.target.getAttribute('user_id'),name:escape(e.target.title)}, date:new Date().toLocaleString()});
        GM_setValue('Messages', messages.toSource());
      }
      $('new_message').submit();
    }, false);
 }