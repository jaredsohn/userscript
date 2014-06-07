// ==UserScript==
// @name           Help Forum Suggestions
// @description    See what suggestions a user was given before posting a new topic in the Flickr help forum
// @namespace      vispillo
// @require        http://vispillo.org/78952.user.js
// @include        http://www.flickr.com/help/forum/*/*/
// @version        1.0.5
// ==/UserScript==
jQuery.noConflict();
jQuery('head').append('<link type="text/css" rel="stylesheet" href="http://l.yimg.com/g/css/c_help_with.css"/>');

var title = jQuery('#GoodStuff h2').html();
var content = jQuery('<div/>').html(jQuery('#DiscussTopic table:eq(0) td.Said p').html().split('<small>')[0]).text();
var lang = window.location.href.split('forum')[1].split('/')[1];
var post_url = 'http://www.flickr.com/help/forum/new/';
var mc = unsafeWindow.global_auth_hash;
jQuery('<span id="expander" style="cursor:pointer;width:16px;color:red;font-weight:bold"><small>?</small></span><img id="expand-pulser" src="http://l.yimg.com/g/images/progress/balls-16x8-white.gif" style="display:inline">').insertBefore('#DiscussTopic table:eq(0) td.Said p small');
jQuery('#expand-pulser').hide();
jQuery('#expander').click(function(e) {
  var params = {
    'title': title,
    'body': content,
    'done': 1,
    'preview': 'PREVIEW',
    'lang': lang,
    'magic_cookie': mc
  };
  jQuery(this).hide();
  jQuery('#expand-pulser').show();
  jQuery.post(post_url, params, function(data) {
    jQuery('#expand-pulser').hide();
    jQuery('#DiscussTopic table:eq(0) tbody').append('<tr><td style="padding-top:0px" colspan="2"></td></tr>');
    jQuery('#DiscussTopic table:eq(0) tbody tr:eq(1) td').append(jQuery(data).find('div.help_faqlist'));
    jQuery('div.help_faqlist').attr('style', 'padding-top:0px;padding-left:0px;')
    jQuery('div.help_faqlist > p').text('Based on the user\'s question, Flickr suggested the following FAQ entries before allowing the new topic to be submitted:');
    jQuery('div.help_faqlist li > h3').removeAttr('onClick');
    jQuery('div.help_faqlist li > h3').append('<span style="margin-left:5px;" class="New">COPY</span>');
    if (jQuery('div.help_faqlist').length == 0) { jQuery('#DiscussTopic table:eq(0) tbody tr:eq(1) td').append('<div class="help_faqlist" style="padding-top:0px;padding-left:0px;"><p>No suggestions available. Try your own search with some new keywords below.<p></div>')  }
    jQuery('div.help_faqlist').append('<hr /><p id="searchtools"><img id="search-pulser" src="http://l.yimg.com/g/images/progress/balls-16x8-white.gif" style="float:left;margin-top:5px;display:none"><form id="faqsearch"><input type="submit" id="submitbutton" class="Butt" value="SEARCH" style="float: right;"><input id="faqsearchbox" type="text" size="40" class="Box" style="float: right;margin-right:5px;"></form></p>');
    jQuery('#faqsearch').submit(function(e) {
      e.preventDefault();
      var search = encodeURIComponent(jQuery('#faqsearchbox').val());
      if (search != '') {
        jQuery('#ulsearchresults').remove();
        jQuery('#search-pulser').fadeIn();
        jQuery('div.help_faqlist input').attr('disabled', true);
        jQuery('#submitbutton').toggleClass('Butt DisabledButt');
        jQuery.get('http://www.flickr.com/help/faq/search/?q=' + search, function(data) {
          jQuery('#search-pulser').fadeOut();
          jQuery('div.help_faqlist input').attr('disabled', false);
          jQuery('#submitbutton').toggleClass('Butt DisabledButt');
          //jQuery('div.help_faqlist input').slideUp();
          ul = jQuery('<ul id="ulsearchresults" class="dynamic"></ul>');
          jQuery(data).find('div.ThinCase h2').each(function(i, h2) {
            li = jQuery('<li class="closed"></li>');
            li.append('<h3><span class="expando_list_caret"></span><a target="_blank" href="">' + jQuery(h2).text() + '</a><span class="New" style="margin-left: 5px;">COPY</span></h3>');
            li.append('<div class="item"></div>');
            jQuery(h2).nextUntil('h2').each(function(i, p) {
              if (jQuery(p).hasClass('Separate')) {
                li.find('h3 a').attr('href', jQuery(p).find('a:eq(0)').attr('href').replace(/\?search\=[^#]+/,''));
              }
              else {
                jQuery(p).find('span').each(function() {
                  jQuery(this).replaceWith(jQuery(this).text());
                });
                jQuery(p).appendTo(li.find('div.item'));
              }
            });
            li.appendTo(ul);
          });
          ul.find('h3').click(function(e) {
            e.preventDefault();
            jQuery(this).parent().toggleClass('open closed');
          });
          ul.find('h3 a').click(function(e) {
            e.preventDefault();
          });
          ul.find('h3 > span.new').click(function(e) {
            e.stopPropagation();
            //console.log('adding link for: ',jQuery(this).parent().find('a').attr('href'));
            txtarea = document.getElementsByTagName('textarea')[0];
            scrollpos = txtarea.scrollTop;
            stringpos = txtarea.selectionStart;
            before = (txtarea.value).substring(0, stringpos);
            after = (txtarea.value).substring(stringpos, txtarea.value.length);
            link = '<b><a href="http://www.flickr.com' + jQuery(this).parent().find('a').attr('href') + '">Flickr FAQ: ' + jQuery(this).parent().find('a').text() + '</a></b>';
            txtarea.value = before + link + after;
            stringpos = stringpos + link.length;
            txtarea.selectionStart = stringpos;
            txtarea.selectionEnd = stringpos;
            txtarea.focus();
            txtarea.scrollTop = scrollpos;
          });
          ul.insertBefore('#searchtools');
        });
      }
    });
    jQuery('div.help_faqlist li > h3 > span.new').click(function(e) {
      e.stopPropagation();
      //console.log('adding link for: ',jQuery(this).parent().find('a').attr('href'));
      txtarea = document.getElementsByTagName('textarea')[0];
      scrollpos = txtarea.scrollTop;
      stringpos = txtarea.selectionStart;
      before = (txtarea.value).substring(0, stringpos);
      after = (txtarea.value).substring(stringpos, txtarea.value.length);
      link = '<b><a href="http://www.flickr.com' + jQuery(this).parent().find('a').attr('href') + '">Flickr FAQ: ' + jQuery(this).parent().find('a').text() + '</a></b>';
      txtarea.value = before + link + after;
      stringpos = stringpos + link.length;
      txtarea.selectionStart = stringpos;
      txtarea.selectionEnd = stringpos;
      txtarea.focus();
      txtarea.scrollTop = scrollpos;
    });
    jQuery('div.help_faqlist li > h3').click(function(e) {
      e.preventDefault();
      jQuery(this).parent().toggleClass('open closed');
    });
    jQuery('div.help_faqlist li > h3 a').click(function(e) {
      e.preventDefault();
    });
  });
});

