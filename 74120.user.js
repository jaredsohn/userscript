// ==UserScript==
// @name           vkontakt extender
// @namespace      http://vkontakte.ru/id3991572
// @description    Vkontakte closed profile extender
// @author         Sergey Naumov
// @include        http://*vkontakte.ru/id*
// @include        http://*vkontakte.ru/profile*
// @include        http://*vk.com/id*
// @include        http://*vk.com/profile*
// ==/UserScript==

(function () {
  var w = (/a/[-1] == 'a') ? unsafeWindow : window;
  if (w == undefined && !w.geByClass) {
    var script = document.createElement('script');
    script.src = 'http://userscripts.org/scripts/source/59412.user.js';
    var p = document.getElementById('pageLayout');
    p.appendChild(script);
  } else {
  
  var d, basicInfoBlock, basicInfoTable, educationTable, user = 0, 
  alert = w.geByClass('alertmsg'), re = /addToFriends\((\d+),/, ge = w.ge, ajax = w.Ajax,
  
  InfoBlocks = (function () {
    var div = w.geByClass('basicInfo')[0], idCounter = 0, blocks = [],
    initBlock = function (id) {
      var block = (function () {
        var text = ge(id + '_text');
        
        return {
          id: id,
          header: ge(id + '_head'),
          load: ge(id + '_load'),
          setContent: function (t) {
            text.innerHTML = t;
          },
          append: function (el) {
            text.appendChild(el);
          }
        }
      })();
      
      blocks[blocks.length] = block;
      return block;
    }
    
    return {
      add: function (title, content, collapsed, loading, container) {
        var a = ['', '', false, false, div], html, i;
        
        for (i = arguments.length; i--;) {
          a[i] = arguments[i];
        }
        
        html = [

        '<div id="additional', idCounter, '" class="flexOpen">',
          '<div class="b', ((a[2]) ? 'Shut' : 'Open'), '">',
            '<div class="flexHeader clearFix" ',
                 'onfocus="blur()" ',
                 'id="additional', idCounter, '_head" ',
                 'onclick="return collapseBox(',
                                    '\'additional', idCounter, '\', ',
                                    'this, ',
                                    '0.90, ',
                                    '0.50',
            ')"><div><h2>', a[0], '</h2></div>',
              '<div style="float:right;display:', ((a[3]) ? 'block' : 'none'),'" ',
                   'id="additional', idCounter, '_load">',
                '<img src="/images/upload.gif" alt="Loading" />',
              '</div>',
            '</div>',
          '</div>',
          '<div class="c" style="display:', ((a[2]) ? 'none' : 'block'), '">',
            '<div class="flexBox clearFix" id="additional', idCounter, '_text">', 
              a[1],
            '</div>',
          '</div>',
        '</div>'

        ];
       
        a[4].innerHTML = a[4].innerHTML + html.join('');
        return initBlock('additional' + idCounter++);

      }
    }
    
  })(),
  
  profileTable = function (id) {
    var tbl = document.createElement('table'), heading;
    tbl.className = 'profileTable'; 
    tbl.cellPadding = 0;
    tbl.cellSpacing = 0;
    
    if (id) tbl.setAttribute('id', id);
    
    return {
      table: tbl,
      setHeading: function (t) {
        if (!heading) {
          heading = document.createElement('h4');
          tbl.parentNode.insertBefore(heading, tbl);
        }
        heading.innerHTML = t;
        
        return this;
      },
      addRow: function (title, content, index, rowId){
        var tr = tbl.insertRow(index || -1), td, div;
        td = tr.insertCell(-1);
        td.className = 'label';
        td.innerHTML = title;
        td = tr.insertCell(-1);
        td.className = 'data';
        td.innerHTML = '<div class="dataWrap">' + content + '</div>';
        tr.appendChild(td);
        
        return this;
      }
    };
  };
  
  if (!alert.length) return;
  user = re.exec(alert[0].innerHTML)[1] || 0;
  if (!user) return;
  basicInfoBlock = InfoBlocks.add(w.audio_edit_additionally, '', true, true);
  w.doRequest('&id=' + user + '&act=profile', function (data) {
    d = data;
    var html = '', fs, age, edu = [], pv, sx = data.sx-1, country_ajax;
    
//        FAMILY STATUS
//-------------------------

    switch (d.fs) {
      case 1: fs = sx ? 'm_not_married' : 'fm_not_married'; break;
      case 2: fs = sx ? 'm_has_friend' : 'fm_has_friend'; break;
      case 3: fs = sx ? 'm_engaged' : 'fm_engaged'; break;
      case 4: fs = sx ? 'm_married' : 'fm_married'; break;
      case 5: fs = 'complicated'; break;
      case 6: fs = 'in_search'; break;
    }
    
    fs = fs ? w['Family_' + fs] : '???';

//         POLITICAL VIEWS
//-------------------------
    switch (d.pv) {
      case 1: pv = 'com'; break;
      case 2: pv = 'soc'; break;
      case 3: pv = 'moder'; break;
      case 4: pv = 'liber'; break;
      case 5: pv = 'cons'; break;
      case 6: pv = 'mon'; break;
      case 7: pv = 'ucons'; break;
    }
    pv = pv ? w['Politics_' + pv] : '???';

    basicInfoTable = new profileTable;
    
    basicInfoTable.addRow(w.Family, fs).addRow(w.Politics, pv);
    basicInfoBlock.append(basicInfoTable.table);

    ajax.Post({
      url: 'select_ajax.php',
      query: {'act': 'a_get_country_info', 'country': d.ht.coi, 'fields': 1},
      onDone: function (obj, text) {
        var response = eval('(' + text + ')');
        w.each(response.cities, function () {
          if (this[0] == d.ht.cii) {
            basicInfoTable.addRow(w.Town, this[1] + ' [' + d.ht.con + ']');
            
            return false;
          }
        });
        w.hide(basicInfoBlock.load);
      }
      
    });

//         EDUCATION
//-------------------------
    educationTable = new profileTable;
    
    for (var i in d.edu) {
      var expr = (d.edu[i][2] < 100) ? 1 : 0;
      if (expr) { //show only schools
        educationTable.addRow(
          (expr ? w.School : w.Univ), 
          (expr ? w['select_school_type_'+data.edu[i][2]] : '') +
            ' № ' + data.edu[i][3].replace(/[^\d]*/, '') + ' \'' + data.edu[i][4]
        );
        if (!age && data.edu[i][4]) {
          var now = new Date();
          age = now.getFullYear() - data.edu[i][4] + 17;
          basicInfoTable.addRow(w.Birth_date, age);

        }
      }
    }
    
    if (educationTable.table.rows.length){
      basicInfoBlock.append(educationTable.table);
      educationTable.setHeading(w.profile_places_educ);
    }


    w.collapseBox(basicInfoBlock.id, basicInfoBlock.header, 0.90, 0.50);
  });

//         MATCHES
//-------------------------
  matchesBlock = InfoBlocks.add(w.left_matches, '', true, false, ge('leftColumn'));
  
  w.postMatch = function (dec) {
    ajax.postWithCaptcha(
      '/matches.php', 
      {
        act: 'a_sent', 
        to_id: user, 
        dec: dec
      }, 
      {
        onSuccess: function (ajaxObj, responseText) {
          ge('m_msg').style.display = '';
          ge('m_msg').innerHTML = responseText;
          if (dec) location.href = '\matches.php?act=sent';
        }
      }
    );
  }
  matchesBlock.setContent([
    '<script type="text/javascript">',
      'function postMatch() {',
         'Ajax.postWithCaptcha(\'/matches.php\', {act: \'a_sent\', to_id: ', user, 
             ', dec: dec}, {onSuccess: function(ajaxObj, responseText) {',
           'ge(\'progr8\').style.display = \'none\';',
           'ge(\'m_msg\').style.display = \'\';',
           'ge(\'m_msg\').innerHTML = responseText;',
           'location.href = \'\matches.php?act=sent\'',
         '}});',
    '} </script>',
   '<div class="r">',
    '<div style="padding: 10px 10px;">',
    '<div id="m_msg" class="msg" style="margin:2px 4px 6px 0px; display:none"></div>',
      '<div class="match">',

      '</div>',
      '<form method="POST" action="matches.php" name="postMessage" id="postMessage">',
       '<input type="hidden" id="to_m_id" name="to_m_id" value="', user,'"/>',
      '</form>',
      '<div>',
       '<ul class="nNav" style="padding:15px 0px 0px 25px; height:25px;">',
        '<li>',

         '<b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b>',
         '<span class="ncc"><a href="javascript: postMatch(0)">', w.groups_no, '</a></span>',
         '<b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b>',
        '</li>',
        '<li>',
         '<b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b>',
         '<span class="ncc"><a href="javascript: postMatch(1)"><b>', w.groups_yes, 
            '</b>&#33;</a></span>',
         '<b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b>',
        '</li>',
       '</ul>',
      '</div>',
     '</div>',
    '</div>',
   '</div>'
  
  ].join(''));
  
  
//         ADDITIONAL LINKS
//-------------------------
  var pA = w.ge('profileActions'), photos = w.left_myphotos.replace(/.*\s/, '');
  
  pA.innerHTML = pA.innerHTML + [
  '<a href="/photos.php?id=', user, '">', photos, '</a>',
  '<a href="/photos.php?id=', user, '&act=user">', w.All, ' ', photos, '</a>'
  ].join('');
  
  }
})();
