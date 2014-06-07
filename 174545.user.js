// ==UserScript==
// @name        Unread Mail Context Script
// @include     http://*.reddit.com/message/unread/
// @version     1
// ==/UserScript==
 var $messages = $('body.loggedin.messages-page .was-comment.recipient').add('body.profile-page .comment');
 $messages.each(function (iterator, item) {
     var $this = $(item),
         $link = $this.find('a.bylink:first'),
         linkurl = $link.attr('href'),
         subreddit = $this.find('.tagline a:last').text(),
         $title = (($this.find('p.parent').children().length > 0) ? $this.find('p.parent') : $this.find('p.subject a').clone().append(' [' + subreddit + ']').wrap('<h3></h3>').parent('h3')),
         context = '?context=3';
     if (linkurl.substr(-10) != context) linkurl += context;
     if (linkurl != undefined) $this.load(linkurl + ' .sitetable.nestedlisting', function () {
         $this.prepend($title)
     });
 });