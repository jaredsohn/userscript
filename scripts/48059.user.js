// ==UserScript==
// @name           Userscripts.org Selection Quoting
// @namespace      sizzlemctwizzle
// @version        1.1.0
// @description    Just select the text and click "Quote". Now with vast improvements!
// @require        http://sizzlemctwizzle.com/updater.php?id=48059
// @include        http://userscripts.org/topics/*
// ==/UserScript==

// ==Begin Helper Functions==
// Smart XPath Function
function $x(x, t, r) {
    if (t && t.tagName) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case XPathResult.NUMBER_TYPE:
        p = 'numberValue';
        break;
    case XPathResult.STRING_TYPE:
        p = 'stringValue';
        break;
    case XPathResult.BOOLEAN_TYPE:
        p = 'booleanValue';
        break;
    case XPathResult.ANY_UNORDERED_NODE_TYPE: 
    case XPathResult.FIRST_ORDERED_NODE_TYPE:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}
// Optional shortcut functions I like
function $x1(x, r) { return $x(x, XPathResult.FIRST_ORDERED_NODE_TYPE , r) } 
function $xb(x, r) { return $x(x, XPathResult.BOOLEAN_TYPE, r) }
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
// Get element by id
function $(element) { return document.getElementById(element); }
// Get elements by classname
function $c(element, root) { return (root||document).getElementsByClassName(element); }
// Insert an element after another
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling);}
// A really cool element creation funtion by avg and JoeSimmons, and modified by me
function create() {
    switch(arguments.length) {
        case 1:
            var A = document.createTextNode(arguments[0]);
	    break;
        default:
            var A = document.createElement(arguments[0]),
                B = arguments[1];
            for (var b in B) {
	        if (b.indexOf("on") == 0)
		    A.addEventListener(b.substring(2), B[b], false);
		else if (",style,accesskey,id,name,src,href,which".indexOf("," +
                         b.toLowerCase()) != -1)
		    A.setAttribute(b, B[b]);
		else
		    A[b] = B[b];
            }
            for(var i = 2, len = arguments.length; i < len; ++i)
	        A.appendChild(arguments[i]);
    }
    return A;
}
// ==/End Helper Functions==

// Format the quote and append the quote to the correct box
function quote_handle(e) {
 e.preventDefault();

 var post_hentry = $x1('./ancestor::tr[contains(@class, "post hentry")]', e.target),
     post_id = post_hentry.id.split('row-')[1],
     user = $c('fn', post_hentry)[0].getElementsByTagName('a')[0],
     userName = user.getAttribute('text'),
     userUrl = '/users/'+user.getAttribute('user_id'),
     body = $("post-body-"+post_id),
     quoted = (select=window.getSelection()) && (select.focusNode) && (isPost(select, body.id)) ? 
              selectHTML(select, body) : body.innerHTML;
  
  if ( $("reply").getAttribute('style').match("display: none;") && ($("edit").offsetHeight > 0) && $("edit_post_body") ) 
    box = $("edit_post_body");
  else {
    box = $("post_body");
    
    // Reply needs to be opened
    if ($("reply").offsetHeight == 0) {
      $("reply").style.display = "block";
      $("post_body").value = '';
    }
  }

  box.focus();
  quoted = '<blockquote><strong><a href="'+userUrl+'">'+userName+'</a></strong>&nbsp;<a href="' +
    location.pathname+location.search+'#posts-'+post_id+'">wrote</a>:\n' +
    quoted.replace(/^(<p>\s*<\/p>)/g,'').replace(/^(\s*<br>\s*)*\s*/,'').replace(/^\s*/,'').replace(/<pre>((?:.|\s)*?)<\/pre>/gmi,function(str,p1){return'<pre>'+p1.replace(/\n/g,'<br>')+'</pre>'}).replace(/\n/g, '').replace(/<!--((?:.|\n)*)-->/, '').replace(/<br>/g, '\n').replace(/<p>/g, '').replace(/<\/p>/g, "\n").replace(/^\s+|\s+$/g, '').replace(/ {2,}/g,' ') +
    '</blockquote>\n';

  if (box.value == '') {
    box.value = quoted;
    box.scrollTop = box.scrollHeight;
  } else {
    var x, y;
    if ( (y=box.selectionEnd) - (x=box.selectionStart) == 0 ) { // insert quote at cursor
      box.value = (box.value).substring(0, x) + quoted + '\n' + (box.value).substring(y, (box.value).length);
      var len = ((box.value).substring(0, x) + quoted).length
      box.setSelectionRange(len, len); 
    } else { // append quote
      if(/\n$/.test(box.value)) 
        box.value = box.value.replace(/\n+$/,'');
      box.value += quoted;
      box.scrollTop = box.scrollHeight;
    }
  }
}

// Get the HTML from a selected area of a post
function selectHTML(sel, body) {
  var range = sel.getRangeAt(0),
      holder = create('div', {}),
      parent = range.commonAncestorContainer,
      tag_queue = [];

  // Build the tag creation queue
  for (var node = parent; node.id ? node.id != body.id : true; node = node.parentNode) {
    if (node.tagName && node.attributes) {
      var atts = node.attributes, 
          thisTag = [], 
          thisAtts = {}, 
          auth_link, 
          wrote_link;

      thisTag.push(node.tagName.toLowerCase());

      for(var i = 0, len=atts.length; i< len; ++i)
        thisAtts[atts[i].name] = atts[i].value;

      thisTag.push(thisAtts);

      if (node.tagName == "BLOCKQUOTE" && 
          (auth_link=$x1('./strong/a[1]', node)) && 
          (/http:\/\/userscripts\.org\/users\/[^\/]+/.test(auth_link.href))) {
            var xtra = {};
            xtra.auth = [auth_link.textContent, auth_link.pathname];

            if( (wrote_link=$x1('./a[1]', node)) && 
                (/http:\/\/userscripts\.org\/topics\/\d+.*(#posts-\d+){0,1}/.test(wrote_link.href)) )
                  xtra.wrote = wrote_link.pathname+wrote_link.search+wrote_link.hash;

            thisTag.push(xtra);
      }

      tag_queue.push(thisTag);
    }
  }

  var lastNode = holder;

  // Build the wrapper elements
  if (tag_queue.length > 0)
    for (var i = tag_queue.length - 1; i >= 0; --i) {
      var newNode = create(tag_queue[i][0], tag_queue[i][1]), 
          xtra = tag_queue[i][2];

      if (xtra) { // Append nested quote attribution
        newNode.appendChild(create('strong', {innerHTML:'<a href="'+xtra.auth[1]+'">'+xtra.auth[0]+'</a>'}));
        newNode.innerHTML += '&nbsp;';
        newNode.appendChild(xtra.wrote ? create('a', {href:xtra.wrote, textContent:'wrote'}) : create('wrote'));
        newNode.appendChild(create(':'));
        newNode.appendChild(create('br', {}));
      }

      lastNode.appendChild(newNode);
      lastNode = newNode;
    }

  lastNode.appendChild(range.cloneContents()); // Append the actual quoted HTML

  range.detach(); // Free the range now that we're done with it
  return holder.innerHTML
}

// Determine if the selected portion is in a post
function isPost(sel, id) {
  return sel.getRangeAt(0).commonAncestorContainer.tagName != "TBODY" && $xb('./ancestor::td[@id="'+id+'"]', sel.focusNode);
}

if($xb("//a[@class='utility']/child::text()[.='Reply to topic']"))
  forEach($x('//td[@class="author vcard"]//span[@class="role"]'),
     function(role){
       var editLink = $x1(".//span[@class='edit']", role.parentNode);
       insertAfter(create('a', {href: '#', 
	       className: 'utility', 
	       textContent: 'Quote', 
	       style: 'display: block; clear: both; padding-top: 3px;'+(editLink?' color: #666;':''), 
	       onclick: function(e) { quote_handle(e); }}), editLink||role);
     });