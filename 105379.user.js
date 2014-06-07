// ==UserScript==
// @name           ShowRepliesBooster
// @namespace      showrepliesbooster
// @description    Boost showreplies() function on 0chan.ru imageboard (it could work with any imageboard based on the kusaba engine, but not tested)
// @include        http://*0chan.ru/*
// ==/UserScript==

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
script.textContent = "showreplies = function(root) {"+
"  if (!Settings.showReplies()) return;"+
"  root = root ? root : 'body';"+
"  $(root).find('.replieslist').remove();"+
"  var replies = [];"+
"  var messages = [];"+
"  $(root).find('.postmessage').each(function(index, element) {"+
"    var node = $(this).parents('.postnode').first();"+
"    var postlink = node.find('span.reflink').find('a').first().attr('href');"+
"    replies[postlink] = [];"+
"    messages.push($(this));"+
"  });"+
"  for(j = messages.length - 1; j != 0; j--) {"+
"    var message = messages[j];"+
"    var node = message.parents('.postnode').first();"+
"    var postlink = node.find('span.reflink').find('a').first().attr('href');"+
"    message.find('a').each(function(index, element) {"+
"      var href = $(this).attr('href');"+
"      if(replies[href]!=null)"+
"      {"+
"        replies[href].push(postlink);"+
"      }"+
"    });"+
"    var myreplies = $.unique(replies[postlink]);"+
"    if (myreplies.length > 0) {"+
"      var repliesString = '<div \class=\"replieslist\"><br />'+_.replies+': ';"+
"      for (i = 0; i < myreplies.length; i++) {"+
"        var replypostlink = myreplies[i];"+
"        var replypostid = replypostlink.split('#')[1];"+
"        repliesString += '<a href=\"'+replypostlink+'\" onclick=\"javascript:highlight(\\''+replypostid+'\\', true);\">&gt;&gt;'+replypostid+\"</a>\";"+
"        if (i != myreplies.length - 1) repliesString += ', ';"+
"      }"+
"      node.find('.postmessage').append(repliesString);"+
"      PostPreviews.setupPreviews(node.find('.replieslist').get());"+
"    }"+
"  }"+
"};";
document.body.appendChild(script);
