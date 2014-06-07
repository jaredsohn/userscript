// ==UserScript==
// @name           Wikipedia Compact List View
// @namespace      wikiList
// @description    Shows 'List of ...' Wikipedia pages in a compact view.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include        http://*.wikipedia.org/wiki/*
// @version        0.1
// ==/UserScript==

// Generic GM-/DOM-related functions.
(function() {
  function init() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
      GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
      };
      GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
          case 'b':
            return value == 'true';
          case 'n':
            return Number(value);
          default:
            return value;
        }
      }
    }
  }

  var option_debug = 0;
  var option_skip_empty_sets = 0;
  var option_sort = 1;

  var toc = null;
  var listName;
  var skipSections = [
    'See also', 'References', 'Other sources', 'External links', 'Notes'
  ];

  /*
   * If the page is a list,
   * get the toc.
   *
   * TOC is a hash:
   *    type_name : {
   *      ref : section_ref_for_type,
   *      members : {
   *        name : page_ref_for_member,
   *        ...
   *      }
   *    },
   *    ...
   *      
   */
  function getTOC() {
    var title = document.title;
    if (title.indexOf('List of') != 0) return;
    listName = title.replace(/List of (.*) - Wikipedia.*/, "$1");
    listName = listName.substr(0,1).toUpperCase() + listName.substr(1);
    toc = {};
    var toctable = $('#toc');
    if (!toctable.length) toctable = $('table.toc');
    if (!toctable.length) toctable = $('table.toccolours');

    var nTypes = 0;
    var s = '';
    var seenSections = {};
    $(toctable).find('a').each(function(index) {
      var type = $(this).children('.toctext').text() || $(this).text();
      if ($.inArray(type, skipSections) != -1) return true;
      var type_ref = $(this).attr('href').substr(1);
      if (!type || !type_ref) return true;
      var h2 = $(document.getElementById(type_ref)).closest('h2');
      var hid = $(h2).children('.mw-headline').attr('id');
      if (seenSections[hid]) return true;
      seenSections[hid] = 1;

      // members.
      var section = h2.nextUntil('h2');
      var members = [];
      var nMembers = 0;
      var nSkipped = 0;
      section.find('li a').each(function() {
        var cl = $(this).attr('class');
        if ((cl && cl != 'image' && cl != 'new') ||
            $(this).parent().is('sup') ||
            $(this).closest('span').is('.editsection')) {
          ++nSkipped;
        } else {
          var name = $(this).attr('title') || $(this).text();
          var name_ref = $(this).attr('href');
          if (name)
            name = name.replace(/ \(page does not exist\)/,'');
          if (name && name_ref) {
            members[name] = name_ref;
            ++nMembers;
          } else {
            ++nSkipped;
          }
        }
      });
      if (option_debug)
        s += type+':'+type_ref +
          ' -> got='+nMembers+' skipped='+nSkipped+"\n";
      if (nMembers == 0 && option_skip_empty_sets)
        return true;
      ++nTypes;
      toc[type] = { 'ref':type_ref, 'members':members };

      section.filter('ul').remove();
      section.filter('ol').remove();
      section.filter('li').remove();
      section.find('ul').remove();
      section.find('ol').remove();
      section.find('li').remove();
      section.filter('div.thumb.tright').css('float','left');
      section.filter('p').css('clear','both');
      section.add(h2).find('a').not('.image').
        replaceWith(function() {return $(this).text()});
    });
    if (option_debug) {
      alert(s);
    }
    if (nTypes == 0) toc = null;
  }

  /**
   * Show the TOC in the left side bar, after pruning the page
   * a bit.
   */
  function listView() {
    if (!toc) return;
    var tocDiv = document.createElement('div');
    var contentDiv = $('<div id="c_div" style="height:100%"></div>');
    var contentFrameHTML =
      '<iframe name="c_frame" src="%s" id="c_frame" width="100%" height="100%" frameborder="0"></iframe>';
    var s = ''; 
    var mrefs = {};
    var trefs = {};
    var mref = 0;
    var tref = 0;
    var typeKeys = option_sort ? Object.keys(toc).sort() : Object.keys(toc);
    for (var i in typeKeys) {
      type = typeKeys[i];
      var members = toc[type]['members'];
      s +=
        '<div class="portal expanded" role="navigation">' +
          '<h3 class="t_all" id="t_' + tref + '"><b>' + type + '</b> (' + Object.keys(members).length +')</h3>' +
          '<div class="body" style="display:block;"><ul>';
      trefs['t_'+tref++] = toc[type]['ref'];
      var memberKeys = option_sort ? Object.keys(members).sort() :
        Object.keys(members);
      for (var j in memberKeys) {
        var name = memberKeys[j];
        s += '<li><a id="m_'+mref+'" href="#">' + name + '</a></li>';
        mrefs['m_'+mref++] = members[name];
      }
      s += '</ul></div></div>';
    }
    tocDiv.innerHTML =
      '<h2>' +
        '<a id="newtoc" href="#">' + listName + '</a>' +
      '</h2>' +
      '<div class="portal expanded" role="navigation">' +
        '<h3 id="t_toggle"><b>Collapse/Expand All</b></h3>' +
          '<div class="body" style="display:block;">' +
            '<ul></ul>' +
          '</div>' +
        '</div>' +
      s;
    var h = $(window).height();
    $(tocDiv).css({
      'overflow':'scroll',
      'height' : h+'px'
    });
    $('body').prepend($('#mw-panel'));
    $('.toccolours').remove();
    $('.toc').remove();
    $('.editsection').remove();
    $('h2').css('clear','both');
    $('h3').css('clear','both');
    $('h4').css('clear','both');
    $('#mw-panel').empty();
    $('#mw-panel').append(tocDiv);
    $('#mw-panel').css({'top':'0', 'float':'left'});
    $('#mw-navigation').remove();
    $('#mw-head').remove();
    $('#mw-page-base').remove();
    $('#mw-head-base').remove();
    var oldContent = $('#content').html();
    $('#content').empty();
    $('#footer').remove();
    $('#content').append(contentDiv);
    $('#content').css({'height':'100%','overflow':'scroll'});
    $('body').css('overflow','hidden');
    contentDiv.html(oldContent);
    $('#newtoc').click(function() {
      contentDiv.html(oldContent);
      document.getElementById('firstHeading').scrollIntoView();
    });
    for (var tkey in trefs) {
      $('#'+tkey).click(trefs[tkey], function(e) {
        // if ($(this).parent().hasClass('expanded')) {
          contentDiv.html(oldContent);
          document.getElementById(e.data).scrollIntoView();
        // }
      });
    }
    for (var mkey in mrefs) {
      $('#'+mkey).click(mrefs[mkey], function(e) {
        contentDiv.html(contentFrameHTML.replace('%s', e.data));
      });
    }
    $('#t_toggle').css('background-color', '#ccccff');
    $('#t_toggle').click(function() {
      if ($(this).parent().hasClass('expanded')) {
        $('.t_all').parent().removeClass('collapsed').addClass('expanded');
        $('.t_all').next().css('display','block');
      } else {
        $('.t_all').parent().removeClass('expanded').addClass('collapsed');
        $('.t_all').next().css('display','none');
      }
    });
  }

  init();
  getTOC();
  listView();
})();
