// ==UserScript==
// @namespace     tag:edward.grech.name,2007:/dev/greasemonkey
// @name          Flickr linked @reply
// @description   Adds (reply) under buddy icon in every comment in a flickr photo/group discussion. Clicking (reply) inserts into the reply html-code that displays the commenter's username and backlinks to the comment being replied to.
// @author        Edward Grech | edward@grech.name | http://userscripts.org/users/20919
// @version       2.0
// @date          2007-12-09
// @include       http://flickr.com/photos/*/*
// @exclude       http://flickr.com/photos/*/*/editcomment*
// @exclude       http://flickr.com/photos/*/*/deletecomment*
// @exclude       http://flickr.com/photos/*/collections*
// @include       http://flickr.com/groups/*/discuss/*
// @exclude       http://flickr.com/groups/*/discuss/*/edit*
// @exclude       http://flickr.com/groups/*/discuss/*/*/edit*
// @include       http://flickr.com/help/forum/*
// @exclude       http://flickr.com/help/forum/*/edit*
// @exclude       http://flickr.com/help/forum/*/*/edit*
// @exclude       http://flickr.com/help/forum/*/*/*/edit*
// @include       http://www.flickr.com/photos/*/*
// @exclude       http://www.flickr.com/photos/*/*/editcomment*
// @exclude       http://www.flickr.com/photos/*/*/deletecomment*
// @exclude       http://www.flickr.com/photos/*/collections*
// @include       http://www.flickr.com/groups/*/discuss/*
// @exclude       http://www.flickr.com/groups/*/discuss/*/edit*
// @exclude       http://www.flickr.com/groups/*/discuss/*/*/edit*
// @include       http://www.flickr.com/help/forum/*
// @exclude       http://www.flickr.com/help/forum/*/edit*
// @exclude       http://www.flickr.com/help/forum/*/*/edit*
// @exclude       http://www.flickr.com/help/forum/*/*/*/edit*
// ==/UserScript==

// Version 2.0 (2007-12-09)
//   * Fixed bug related to replies to posts by group admins
//   * Fixed bug related to replies to posts by users who are no longer have a Flickr account
//   * In addition to photo comments and group discussions, script now works also in Flickr help forums and on set comment pages
//   * Added customizable reply template accessible through "Edit reply template" entry in GM script commands menu, customizable via a user prompt
//   * Reply text is now inserted at cursor position (not at the end), and leaves cursor after insertion (Hence if other scripts e.g. add footer text in a comment, they should leave the cursor in front of them)
//   * Added functionality to select text in reply, and then make it linkable to addressee by clicking on "reply"
//   * Added functionality to reply to a post that is not necessarily on the last page (clicking on it will take you to the last page and insert the reply in the box)
//   * If an error DOES occur in one row anyway, the exception will be caught so that it will not affect the remaining rows
//   * (reply) text inserted beneath buddy icon is now a link rather than normal text, and is styled the same as "permalink" so that it blends better with the page
//   * Inserted anchor now has attribute rel="start" or rel="prev", depending on whether we are replying to opening topic or to a comment/reply respectively
//   * Inserted anchor now has rel="nofollow" attribute (TODO: leave this?)
//   * Inserted anchor now has rel="author:*" attribute, where is * is user NSID or alias. This encodes the author of the post to which we are linking inside the rel attribute.
//     One possible use would be to filter the aggregated discussion feeds of all my groups for comments that are replying to me
//     i.e. that contain a[tokenize(@href, ' ')=('author:dwardu', 'author:86818294@N00')]. Another would be a GM script that would read rel attributes and show buddy icons.
//     or maybe should it be the NSID?
//   * Permalinks are now made absolute (to avoid them not being resolved well in contexts other than the original e.g. in RSS feeds)
//   * Added functionality to reply to the author of the topic/photo/photoset
//   * Makes it simple to follow replies from page to page

(function() {

  // some utility functions

  function get_xpath(node) {
    return {
      eval_string : function(expression) {
        return document.evaluate(expression, node, null, XPathResult.STRING_TYPE, null).stringValue;
      },
      eval_boolean : function(expression) {
        return document.evaluate(expression, node, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
      },
      eval_node : function(expression) {
        return document.evaluate(expression, node, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
      },
      eval_nodes : function(expression) {
        return document.evaluate(expression, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        //return document.evaluate(expression, node, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      }
    };
  }

  function get_query_params() {
    var params = {};
    if(location.search) {
      location.search.substring(1).split('&').forEach(function(token) {
		var key_value = token.split('=');
		params[unescape(key_value[0])] = unescape(key_value[1]);
      });
    }
    return params;
  }




  var doc_xpath = get_xpath(document);

  // TODO: replace @class='Said' with tokenize(@class)=('Said') (just in case)

  // TODO: Photo comments CAN be paged, e.g. http://www.flickr.com/photos/doc18/357533294/

  //GM_log('Script activated');
  
  var topic_replies = doc_xpath.eval_node("//*[@class='TopicReply']");
  var photo_comments = doc_xpath.eval_node("//*[@id='DiscussPhoto']");
  var set_comments = doc_xpath.eval_node("//*[@class='vsComments']");

  var replies_container = topic_replies || photo_comments || set_comments;


  
  
  if(!replies_container) {
    //GM_log('... but no discussion container found!');
    return;
  }

  var reply_box = get_xpath(replies_container).eval_node(".//textarea");
  
  if(!reply_box) { // If there is no message box
    if(topic_replies) { // and we are in a group discussion or in help forum,
      if(doc_xpath.eval_boolean("//p[@class='Locked']")) {
        //GM_log('No reply box found: "This thread was closed automatically..."'); // e.g. http://flickr.com/help/forum/en-us/53139/, http://www.flickr.com/help/forum/14560/
        return;
      } else if(!doc_xpath.eval_boolean("//div[@class='Pages']")) {
        //GM_log('No reply box found: "This thread has been closed by..."'); // e.g. http://flickr.com/groups/flickrhacks/discuss/72157603454115542/
        return;
      } else { // or because we are not on the last page.
      }
      // The only case which will go undetected is inside a multi-paged group discussion that has been closed by an admin...
      
    } else { // Otherwise we are in photo or photoset comments page, so comments must have been disabled, as on these pages reply box shows up even when one is not not on the last page.
      //GM_log('No reply box found: Comments might have been disabled on this photo or photoset.'); // TODO: Find a test case for this.
      return;
    }
  }

  // Load template from scriptvars, and add menus

  var default_reply_template = '@[*], ';
  var reply_template = default_reply_template;
  try {
    reply_template = GM_getValue('reply_template', default_reply_template);
  } catch(e) {
    //GM_log('Problem loading \'reply_template\' script value, shall use '+reply_template);
  }

  var prompt_text = 'Inside the text box below, enter the template to be used when you reply to a discussion/forum post or to a photo/photoset comment.\n\nIn this template, the characters \\ and [ and ] and * have a special meaning: write \\ to insert a line-break; what you enclose between [ and ] will become the clickable link to the post being replied to; the character * will be replaced by the username of that post\'s author. Should you want the actual characters \\ or [ or ] or * to appear in your reply, write &#92; or &#91; or &#93; or &#42; at the corresponding positions in the template.\n\nSo, the template to be used is...';

  GM_registerMenuCommand('Flickr linked @reply \u25B6 Edit template...', function(e) {
    var edited_reply_template = prompt(prompt_text, reply_template);
    if(edited_reply_template) {
      reply_template = edited_reply_template;
      GM_setValue('reply_template', reply_template);
    }
  });
  GM_registerMenuCommand('Flickr linked @reply \u25B6 Report an error', function(e) {
    location.href = 'http://flickr.com/groups/flickrhacks/discuss/72157594502445676/lastpage/?message='+escape('@<a rel="prev" href="/groups/flickrhacks/discuss/72157594502445676/">alto maltés</a>, [report your error here]');
  });


  function insert_into_reply_box(txt) {
    var s = reply_box.selectionStart;
    var e = reply_box.selectionEnd;
    reply_box.value = reply_box.value.substring(0, s) + txt + reply_box.value.substring(e, reply_box.value.length);
    reply_box.selectionStart = reply_box.selectionEnd = (s + txt.length);

    // If as a consequence of clicking on an a[@href='#reply'] the document has already scrolled to that part of the document,
    // then let's give focus to the message box.
    reply_box.focus();

    function focus_reply_box() {
      reply_box.focus();
      document.removeEventListener('focus', focus_reply_box, false);
    }
    
    // However, most probably that was useless as the document will not yet have scrolled. When it does scroll, it will then
    // give focus to the 'document' element, thus stealing it from reply_box.
    // So we register an event-listener temporarily to listen for the 'focus' event on 'document',
    // and once the 'document' gains focus, the listener will give focus to the message box and un-register itself (if not,
    // we would be taken back to the message box every time the document had to regain focus (e.g. whenever the user clicks on it).
    document.addEventListener('focus', focus_reply_box, false);
  }

  query_params = get_query_params();
  
  if(reply_box && query_params['message']) {
    insert_into_reply_box(query_params['message']);
  }


  function get_info_from_widget(a_el) {
    var containing_div_xpath = get_xpath(get_xpath(a_el).eval_node("ancestor::div[@class='Widget']"));
    var username = containing_div_xpath.eval_string("//a[@href=ancestor::div[@class='Widget']//a[contains(img/@src, 'buddyicon')]/@href and not(img)]/b");
    var permalink = 'http://flickr.com'+unsafeWindow.page_p.url;
    var photos_url = unsafeWindow.page_p.ownersUrl;
    return {
      permalink : permalink,
      photos_url : photos_url,
      username : username
    };
  }


  function get_info_from_row(a_el) {
  
    var containing_row_xpath = get_xpath(get_xpath(a_el).eval_node("ancestor::tr[1]"));

    var comment_cell_xpath = get_xpath(containing_row_xpath.eval_node("td[@class='Said' or @class='Comment']"));

    //var permalink = comment_cell_xpath.eval_string("concat('http://flickr.com', .//a[@class='Plain' and text()='permalink']/@href)"); // Would it still be "permalink" in Spanish?
    var permalink = comment_cell_xpath.eval_string("concat('http://flickr.com', .//a[@class='Plain'][1]/@href)"); // Would it still be "permalink" in Spanish?

    var photos_url = containing_row_xpath.eval_string("td[@class='Who' or @class='HeyBuddy']/a/@href");

    function username() { // lazy
      var username;
      if(photos_url) {
        username = comment_cell_xpath.eval_string("normalize-space(./h4/a[@href=ancestor::tr[1]/td[@class='Who' or @class='HeyBuddy']/a/@href])");
      } else { // Test case: http://flickr.com/groups/flickrhacks/discuss/72157594482547285/72157594484900490/
        username = comment_cell_xpath.eval_string("normalize-space(./h4)").replace(/ \[[^\[\]]+\][^\[\]]+$/gm, ''); // remove trailing ' [deleted] says:' (or whatever it might be in non-english language)
      }
      return username;
    }
    
    return {
      username : username(),
      photos_url : photos_url,
      permalink : permalink
    };
  
  }


  // Function called when user clicks on "reply"
  function reply_to(info, is_first, a_el) {


    var selected_text = '';
    if(reply_box) {
      selected_text = reply_box.value.substring(reply_box.selectionStart, reply_box.selectionEnd);
    }
    



    var nsid = info.photos_url ? info.photos_url.match(/\/photos\/([^\/]+)\//)[1] : ''; // '/photos/dwardu/' --> 'dwardu'

    var rel_values = [is_first ? 'start' : 'prev', 'nofollow'];
    if(nsid) {
      rel_values.push('author:'+nsid);
    }

    var template_to_use = selected_text ? '[*]' : reply_template; 

    var text_to_insert = template_to_use;
    // Order is important here...
    text_to_insert = text_to_insert.replace(/\\/mg, '\n');                                                                    // Replace \ with new-line (note that this doesn't insert any [s, ]s or *s)
    text_to_insert = text_to_insert.replace(/\[/mg, '<a rel="'+rel_values.join(' ')+'" href="'+encodeURI(info.permalink)+'">');    // Replace [ with opening anchor element (note that this doesn't insert any ]s or *s)
    text_to_insert = text_to_insert.replace(/\]/mg, '</a>');                                                                  // Replace ] with closing anchor element (note that this doesn't insert any *s)
    text_to_insert = text_to_insert.replace(/\*/mg, selected_text ? selected_text : info.username);                              // Replace * with either selected text, or username

    if(reply_box) {
      insert_into_reply_box(text_to_insert);
    } else { // if there is no reply-box and we arrived here, we must be in topic discussion (not in photo/photoset comments)
      var new_url = '';
      new_url += 'http://flickr.com';
      //new_url += doc_xpath.eval_string("//div[@id='DiscussTopic']//tr[td[@class='Who' and not(ancestor::table[@class='TopicReply'])]]/td[@class='Said']//a[@class='Plain' and text()='permalink']/@href"); // i.e. permalink of opening post
      new_url += doc_xpath.eval_string("//div[@id='DiscussTopic']//tr[td[@class='Who' and not(ancestor::table[@class='TopicReply'])]]/td[@class='Said']//a[@class='Plain'][1]/@href"); // i.e. permalink of opening post
      new_url += 'lastpage/'; // More info on "lastpage" at http://flickr.com/groups/flickrhacks/discuss/23362/72157603380976674/
      new_url += '?message='+escape(text_to_insert);
      new_url += '#reply'
      a_el.setAttribute('href', new_url); 
    }

  }




  function reply_to_reply() {
    reply_to(get_info_from_row(this), false, this);
  }
  
  function reply_to_first() {
    reply_to(get_info_from_row(this), true, this);
  }

  function reply_to_photo() {
    reply_to(get_info_from_widget(this), true, this);
  }
  
  
  function reply_to_set() {
    var set = location.href.match(/sets\/([^\/]+)\/comments/)[1];
    var photos_url = doc_xpath.eval_string("//table[@id='SubNav']//td[@class='Buddy']/a/@href");
    var permalink = 'http://flickr.com'+photos_url+'sets/'+set+'/comments/';
    var username = doc_xpath.eval_string("//div[@id='setCrumbs']//a[@href='"+photos_url+"']");
    reply_to({ permalink : permalink, photos_url : photos_url, username : username}, true, this);
  }
  


  function append_reply_link(container, callback_fn) {
    var a_el = document.createElement('a');
    a_el.setAttribute('class', 'Plain reply');
    a_el.setAttribute('href', '#reply');
    a_el.addEventListener('click', callback_fn, false);
    a_el.appendChild(document.createTextNode('reply'));
    var small_el = document.createElement('small');
    small_el.setAttribute('style', 'text-align: center; width: 48px; display: block;');
    small_el.appendChild(document.createTextNode('( '));
    small_el.appendChild(a_el);
    small_el.appendChild(document.createTextNode(' )'));
    //container.appendChild(document.createElement('br'));
    container.appendChild(small_el);
  }

  if(topic_replies) { // if we are in a group-discussion/help-forum topic, then insert "reply" link beneath opening post...
    append_reply_link(doc_xpath.eval_node("//div[@id='DiscussTopic']//td[(@class='Who' or @class='HeyBuddy') and not(ancestor::table[@class='TopicReply'])]"), reply_to_first);
  } else if(photo_comments) {
    append_reply_link(doc_xpath.eval_node("//div[@class='Widget']"), reply_to_photo);
  } else if(set_comments) {
    append_reply_link(doc_xpath.eval_node("//table[@id='SubNav']//td[@class='Buddy']"), reply_to_set);
  }
  
  var buddyicon_container_els = get_xpath(replies_container).eval_nodes(".//td[@class='Who' or @class='HeyBuddy']");
  for(var i = 0; i < buddyicon_container_els.snapshotLength; i++) {
    try { // so that if something goes wrong in one row, it doesn't affect the subsequent rows
      append_reply_link(buddyicon_container_els.snapshotItem(i), reply_to_reply);
    } catch(e) {
      //GM_log('Error in one of the rows!')
      //throw e;
    }
  }
  
  
})();