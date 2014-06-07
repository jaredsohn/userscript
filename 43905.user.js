// ==UserScript==
// @name          Cityrail Timetables Reloaded
// @namespace     http://www.openfusion.net/tags/greasemonkey
// @description   Revamp Cityrail timetables
// @include       http://www.cityrail.info/timetable/ttable.jsp*
// @include       http://cityrail.info/timetable/ttable.jsp*
// @author        Gavin Carr <gavin@openfusion.com.au>
// @version       0.02
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

(function() {

  // Number of pages to load by default (set to 0 to load all, 1 to just load selected)
  // var DEFAULT_MAX = 0;
  // var DEFAULT_MAX = 1;
  var DEFAULT_MAX = 2;

  // Number of rows to keep before 'from' and after 'to' (set to 'null' to keep all)
  // var ROW_PRUNE_OFFSET = null;
  var ROW_PRUNE_OFFSET = 3;

  var tt_selector = 'table table:eq(4) td:eq(3) table table';

  function restyle() {
    var restyle = $('<style id="restyle" type="text/css">\n' +
      "div#nav table { margin: 5px; border: 0px; margin-bottom: 8px; }\n" +
      "div#nav table td { font-family: helvetica, arial, sans-serif; font-size: 12px; }\n" +
      "div#nav ul { margin: 0; }\n" +
      "div#nav ul li { list-style-type: none; }\n" +
      "img { border: 0 }\n" +
      "table.tt_table { margin: 5px; border: 2px solid #333; border-collapse: collapse; float: left }\n" +
      "tr.header { border-bottom: 5px solid #0072c6 }\n" +
      "tr.subheader { border-bottom: 2px solid #333 }\n" +
      "tr.subfooter { border-top: 2px solid #333 }\n" +
      "td.prev, td.next, td.col { text-align: center; }\n" +
      "td { white-space: nowrap }\n" +
      ".gray { background-color: #ccc }\n" +
      "tr.from, tr.to { background-color: #fc9 }\n" +
      '</style>\n');
    $('head').append(restyle);

    // Remove existing script tags
    $('head').find('script').remove();
  }

  function reembody() {
    // Create alternate view hrefs
    var href = window.location + '';
    var opposite_href;
    if (href.match(/\bdir=up\b/)) {
      opposite_href = href.replace(/\bdir=up\b/, 'dir=dn');
    }
    else {
      opposite_href = href.replace(/\bdir=dn\b/, 'dir=up');
    }
    // Swap froms and tos
    if (opposite_href.match(/\bfrom=\w+\b/)) {
      opposite_href = opposite_href.replace(/\bfrom=/, '__to__=');
    }
    if (opposite_href.match(/\bto=\w+\b/)) {
      opposite_href = opposite_href.replace(/\bto=/, '__from__=');
    }
    opposite_href = opposite_href.replace(/__(\w+)__=/g, '$1=');
    // Weekday/weekend view
    var wdwe_href;
    var wdwe_type;
    if (href.match(/\bday=wd\b/)) {
      wdwe_href = href.replace(/\bday=wd\b/, 'day=we');
      wdwe_type = 'Weekend';
    }
    else {
      wdwe_href = href.replace(/\bday=we\b/, 'day=wd');
      wdwe_type = 'Weekday';
    }

    // Create navbar element
    var nav = $('<div id="nav">\n' +
      '<table><tr>\n' +
      '<td><a href="/"><img src="/images/logo.gif" alt="Home"></a></td>\n' +
      '<td>\n' +
      '<ul>\n' +
      '<li><a href="/timetable/index.jsp">Timetables Menu</a></li>\n' +
      '<li><a href="' + opposite_href + '">Opposite Direction</a></li>\n' +
      '<li><a href="' + wdwe_href + '">' + wdwe_type + ' View</a></li>\n' +
      '<li><a href="/trackwork/trackwork.jsp">Scheduled Trackwork</a></li>\n' +
      '</ul>\n' +
      '</td>\n' +
      '</tr></table>\n' +
      '</div>\n');

    // Extract timetable table
    var tt = $(tt_selector).attr('id', 'tt1');

    // Replace body
    $('body').empty();
    $('body').append(nav);
    $('body').append(tt);
  }

  function stripName(name) {
    if (! name) return '';
    name = name.toLowerCase();
    name = name.replace(/^\s+/, '');
    name = name.replace(/\s+$/, '');
    name = name.replace(/\s+(arr|dep)\.?$/, '');
    name = name.replace(/\W+/g, '_');
    return name;
  }

  // QueryString object, encapsulating query string args and derived variables
  function QueryString() {
    // Check for 'from' and/or 'to' arguments
    var location = window.location + '';
    this.max = DEFAULT_MAX;
    this.from = null;
    this.to = null;
    this.page = 1;
    this.prev_page = null;
    this.next_page = null;
    this.prev_href = null;
    this.next_href = null;

    var match = location.match(/\bmax=(\d+)\b/);
    if (match) {
      this.max = parseInt(match[1]);
    }

    match = location.match(/\bfrom=([^&;]+)\b/);
    if (match) {
      this.from = stripName(match[1]);
    }
    match = location.match(/\bto=([^&;]+)\b/);
    if (match) {
      this.to = stripName(match[1]);
    }
    match = location.match(/\bpage=(0?(\d+))\b/);
    if (match) {
      this.page_string = match[1];
      this.page = parseInt(match[2]);
      this.prev_page = this.page - 1;
      this.next_page = this.page + 1;
      this.prev_href = location.replace(match[0], 
        'page=' + (this.prev_page > 9 ? this.prev_page : '0' + this.prev_page));
      this.next_href = location.replace(match[0], 
        'page=' + (this.next_page > 9 ? this.next_page : '0' + this.next_page));
    }
    else {
      this.next_page = 2;
      this.next_href = location + '&page=02';
    }
  }

  function remove_elts(spacer, omit_cols, header, subheader, subfooter) {
    // Remove spacers
    for (var i in spacer) {
      spacer[i].parentNode.removeChild( spacer[i] );
    }

    // If we've flagged columns to omit, add them to our CSS
    if (omit_cols.length > 0) {
      omit_cols.sort();
      var uniq_omit_cols = new Array;
      for (i in omit_cols) {
        var next = omit_cols[i];
        if (uniq_omit_cols[ uniq_omit_cols.length-1 ] != next) {
          uniq_omit_cols.push( next );
        }
      }
      omit_cols = uniq_omit_cols;
      $('#restyle').append(omit_cols.join(', ') +  " { display: none }\n");
      if (header) {
        header.setAttribute('colspan', header.getAttribute('colspan') - omit_cols.length);
      }
      if (subheader) {
        subheader.setAttribute('colspan', subheader.getAttribute('colspan') - omit_cols.length);
      }
      if (subfooter) {
        subfooter.setAttribute('colspan', subfooter.getAttribute('colspan') - omit_cols.length);
      }
    }
  }

  function remove_rows(counter, from_index, to_index, max_index) {
    if (! ROW_PRUNE_OFFSET) return;
    var remove_rows = new Array;
    if (from_index) {
      if (to_index && from_index > to_index) {
        var temp = from_index;
        from_index = to_index;
        to_index = temp;
      }
      for (var i = 1; i < from_index - ROW_PRUNE_OFFSET; i++) {
        remove_rows.push('#tt' + counter + ' tr.row' + i);
      }
    }
    if (to_index) {
      for (var i = to_index + ROW_PRUNE_OFFSET + 1; i <= max_index; i++) {
        remove_rows.push('#tt' + counter + ' tr.row' + i);
      }
    }
    if (remove_rows.length > 0) {
      $('#restyle').append(remove_rows.join(', ') + ' { display: none }\n');
    }
  }

  function retabulate(counter, qs) {
    var tt = $('#tt' + counter).removeAttr('style').addClass('tt_table').get(0);

    var spacer = [];
    var page_row = 0;
    var header = null;
    var subheader = null;
    var subfooter = null;
    var omit_cols = [];
    var from_index = null;
    var to_index = null;
    
    var tr = tt.getElementsByTagName('tr');
    for (var i in tr) {
      var td = (tr[i].getElementsByTagName('td'));
      if (i == 0) {
        tr[i].className = 'header';
        header = td[0];
      }
      else if (td.length == 1) {
        spacer.push(td[0]);
      }
      else if (td.length == 3) {
        if (i < 5) {
          tr[i].className = 'subheader text';
          subheader = td[0];
        }
        else if (td.length == 3 && i > tr.length - 3) {
          tr[i].className = 'subfooter text';
          subfooter = td[0];
        }
        td[0].className = 'subtitle';
        td[1].className = 'prev prev' + counter;
        td[2].className = 'next next' + counter;
        // Remove current previous link (except on first)
        if (td[1].innerHTML.match(/nave/)) {
          if (counter > 1) {
            td[1].innerHTML = '';
          }
          else {
            var prev_page = 1;
            if (qs.max > 0 && qs.page > qs.max) prev_page = qs.page - qs.max;
            var prev_href = qs.prev_href.replace(/\bpage=\d+\b/, 
              'page=' + (prev_page > 9 ? prev_page : '0' + prev_page));
            td[1].innerHTML = '<a class="nave" href="' + prev_href + '">&lt;Prev</a>';
          }
        }
        // Replace next link (to preserve from/to/max etc.)
        if (qs.next_href && td[2].innerHTML.match(/nave/)) {
          var next_page = qs.page + counter;
          var next_href = qs.next_href.replace(/\bpage=\d+\b/, 
            'page=' + (next_page > 9 ? next_page : '0' + next_page));
          td[2].innerHTML = '<a class="nave" href="' + next_href + '">Next&gt;</a>';
        }
        // Remove previous next link
        if (counter > 1) $('.next' + (counter-1)).empty();
        /*
        for (var j in td) {
          td[j].removeAttribute('style');
        }
        */
      }
      else {
        tr[i].removeAttribute('style');
        var fromto = 0;
        for (var j in td) {
          if (j == 0) {
            if (page_row == 0) {
              page_row = i;
            }
            var name = stripName(td[j].innerHTML);
            var row_fromto = '';
            if (qs.from && name == qs.from) {
              row_fromto = ' from';
              fromto = 1;
              from_index = i-3;
            } 
            else if (qs.to && name == qs.to) {
              row_fromto = ' to';
              fromto = 1;
              to_index = i-3;
            }
            var row_bgcolor = '';
            if (page_row > 0 && ((i - page_row) % 3 == 1)) {
              row_bgcolor = ' gray';
            }
            tr[i].className = 'row' + (i-3) + ' ' + name + ' text' + row_fromto + row_bgcolor;
            td[j].className = 'col_header';
            td[j].removeAttribute('width');
          }
          else {
            td[j].className = 'col col_' + j;
            if (fromto && td[j].innerHTML.match(/^\s*(----|[a-z])/) && i != page_row) {
              omit_cols.push('#tt' + counter + ' td.col_' + j);
            }
          }
        }
      }
    }

    // Remove extraneous elements
    remove_elts(spacer, omit_cols, header, subheader, subfooter);
    remove_rows(counter, from_index, to_index, tr.length);

    // Load next page
    if (qs.next_href && (! qs.max || counter + 1 <= qs.max)) {
      var next_page = counter + qs.page;
      var next_href = qs.next_href.replace(/\bpage=\d+\b/, 
        'page=' + (next_page > 9 ? next_page : '0' + next_page));
      if (next_href) {
        load_next(next_href, qs, counter + 1);
      }
    }
  }

  // Load timetable table from next page
  function load_next(next, qs, counter) {
    $.get(next, function (data) {
      var tt = $(tt_selector, data).attr('id', 'tt' + counter);
      $('body').append(tt);
      retabulate(counter, qs);
    });
  }

  // Main
  var qs = new QueryString();
  restyle();
  reembody();
  retabulate(1, qs);
})()
