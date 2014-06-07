// ==UserScript==
// @name           Diff for gist.github
// @description    adds a diff function to http://gist.github.com/
// @namespace      http://userscripts.org/users/40991
// @include        https://gist.github.com/*
// @require        https://raw.github.com/gist/105908/diff.js
// ==/UserScript==

(function() {
  var $ = unsafeWindow.jQuery;
  var rev = $('#revisions li');
  if(+rev.length <= 1) return;
  rev.each(function() {
    var r = $(this);
    r.prepend(
      $('<input type="checkbox" />')
      .attr('name', 'diff')
      .val(r.find('.id').attr('href'))
      .bind('click', diffSelect)
    );
  });
  $('#revisions').append(
    $('<input type="button" />')
    .attr('id', 'diffExec')
    .attr('name', 'diffExec')
    .val('Compare')
    .bind('click', diffExec)
    .attr('disabled', 'disabled')
  );
  
  function diffSelect(e) {
    var me = e.target;
    var c = $('#revisions li input:checked');
    if(c.length > 2) c.each(function(i) { c[i].checked = (c[i] == me); });
    $('#diffExec').attr('disabled', (c.length != 2));
  }
  
  function diffExec() {
    if(!$('#diffView').length) $('#files').prepend('<div id="diffView"></div>');
    var diffView = $('#diffView');
    diffView.hide();
    var selected = $('#revisions').find('input:checkbox:checked');
    var link = selected.map(function(){ return this.value.replace(/^[^\d]+\//, 'https://api.github.com/gists/'); });
    var desc = selected.map(function(){ return $(this).parent().text().replace(/\s+/g, ' '); });
    var xhr = function(url) {
      return $.Deferred(function(d) {
        setTimeout(function() {
          GM_xmlhttpRequest({ method: 'GET', url: url, onload: d.resolve });
        },0);
      }).promise();
    };
    
    $.when(xhr(link[0]), xhr(link[1])).then(function(res1, res2) {
      var wrapHtml = function(s) {
        return '<div class="file"><div class="data syntax"><div class="highlight"><pre>' 
              + s + '</pre></div></div></div>'
      };
      var diffHtml = [], diffQueue = [];
      var files1 = JSON.parse(res1.responseText).files, 
          files2 = JSON.parse(res2.responseText).files;
      var listChanged = (files1.length != files2.length);
      $.each(files1, function(k) {
        if(!files2[k]) listChanged = true;
        else if(files2[k] && files1[k].raw_url != files2[k].raw_url) diffQueue.push(k);
      });
      if(listChanged) {
        var d1 = [], d2 = [];
        $.each(files1, function(n){ d1.push(n) });
        $.each(files2, function(n){ d2.push(n) });
        var diff = new Diff(d1, d2);
        diff.a.shift(), diff.b.shift(), diff.lcs.shift();
        var messages = diff.lcs.map(function(n) {
          var line = '';
          if(n > 0)      line = '<div class="gi" style="padding:2px;">' + diff.b.shift() + ' added</div>';
          else if(n < 0) line = '<div class="gd" style="padding:2px;">' + diff.a.shift() + ' removed</div>';
          else diff.a.shift(), diff.b.shift();
          return line;
        });
        diffHtml.push(wrapHtml(messages.join('')));
      }
      var format = function(contentB, contentA, includeLines, nameB, nameA) {
        this.pre = this.pre || $('<pre></pre>');
        var udiff = new UnifiedDiff(contentB, contentA, includeLines).toString();
        udiff = '--- ' + nameB + '\n' + '+++ ' + nameA + '\n' + this.pre.text(udiff).html();
        if(udiff.split(/\n/).length < 5000) { // ignore if the diff is too big.
          udiff = udiff.replace(/^(.*)\n/mg, '<div class="line">$1</div>')
                       .replace(/">\+/mg, ' gi">+')
                       .replace(/">\-/mg, ' gd">-')
                       .replace(/">\@/mg, ' gu">@');
        }
        return wrapHtml(udiff);
      };
      $.each(diffQueue, function(k) {
        var name = diffQueue[k];
        var nameA = desc[0] + ' ' + name, nameB = desc[1] + ' ' + name;
        var contentA = files1[name].content, contentB = files2[name].content;
        diffHtml.push(format(contentB, contentA, 3, nameB, nameA));
      });
      var html = diffHtml.join('') || wrapHtml('<p style="padding:2px 10px;">No difference.</p>');
      diffView.html(html).slideDown('normal');
    });
  }
})()
