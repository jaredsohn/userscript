// ==UserScript==
// @name           Pixiv Stacc AutoPager
// @namespace      http://d.hatena.ne.jp/kiyo_hoge/
// @include        http://www.pixiv.net/stacc/*
// @version        0.3.20100918
// ==/UserScript==

(function() {
  var setAutoPaging = function() {
    var BASE_REMAIN_HEIGHT = 400;
    var COLOR = {
      on:         '#00ff00',
      off:        '#cccccc',
      loading:    '#00ffff',
      terminated: '#0000ff',
      error:      '#ff00ff'
    };
    
    var state = 'off';
    var loadedPageNumber = 0;
    var loadEnable = true;
    
    var changeIconColor = function(newState) {
      state = newState;
      return $j('#pixiv_stacc_autopagerize_icon').css({
        backgroundColor: COLOR[newState]
      });
    };
    
    var pageLoad = function(pageElmContainer, continueButton, callback) {
      loadEnable = false;
      $j(pageElmContainer).get(0)
        .addEventListener('DOMNodeInserted', function(e) {
        if (loadEnable) {
          return;
        }
        loadEnable = true;
        loadedPageNumber++;
        
        setTimeout(function() {
          if (!$j(continueButton).length) {
            changeIconColor('terminated');
            
            setTimeout(function() {
              $j('#pixiv_stacc_autopagerize_icon').remove();
            }, 1500);
            
            $j(window).unbind('scroll');
            return;
          }
          changeIconColor('on');
        }, 0);
        
        if (typeof callback == 'function') {
          callback();
        }
        
        e.currentTarget.removeEventListener(e.type, arguments.callee);
      }, false);
      
      changeIconColor('loading');
      $j(continueButton).eq(0).click();
    };
    
    var initAutoPaging = function() {
      if ($j('#insert_status, #insert_comment').length == 0 || 
        $j('.next_comment_open, .bt_more').length == 0) {
        return;
      }
      
      $j('head, body').eq(0).append($j('<style />', {
        type: 'text/css',
        text: [
          '',
          '@media print {',
          '  #pixiv_stacc_autopagerize_icon,',
          '  #pixiv_stacc_autopagerize_help {',
          '    display: none !important;',
          '  }',
          '}'].join('\n')
      }));
      
      $j('<div />', {
        id: 'pixiv_stacc_autopagerize_icon',
        css: {
          color:    '#ffffff',
          fontSize: '12px',
          position: 'fixed',
          top:      '3px',
          right:    '3px',
          height:   '10px',
          width:    '10px',
          zIndex:   '255'
        },
        mouseover: function() {
          $j('#pixiv_stacc_autopagerize_help').css({
            top: '3px'
          });
        }
      }).appendTo(document.body);
      
      changeIconColor('on');
      
      $j('<div />', {
        id: 'pixiv_stacc_autopagerize_help',
        css: {
          backgroundColor: '#ffffff',
          border:          '1px solid #cccccc',
          color:           '#000000',
          font:            '10px normal verdana',
          lineHeight:      '120%',
          padding:         '5px',
          position:        'fixed',
          top:             '-200px',
          right:           '3px',
          textAlign:       'left',
          zIndex:          '256'
        },
        mouseleave: function() {
          $j(this).css({
            top: '-200px'
          });
        }
      }).append(function() {
        var html = '<div><div style="width: 100px; float: left;">';
        for (var s in COLOR) {
          html += '<div style="float: left; width: 1em; height: 1em;' +
                    'margin: 0 3px; background-color: ' + COLOR[s] + ';' +
                    '"></div><div style="margin: 0 3px">' + s + '</div>';
        }
        html += '</div></div>';
        return html;
      }).append(
        $j('<div />').css({
          clea:      'both',
          textAlign: 'center',
          margin:    '0 0 0 3px'
        }).append(
          $j('<a />', {
            text: 'on/off',
            href: 'javascript:void(0)',
            css: {
              color:          '#00ff00',
              textDecoration: 'underline'
            },
            'class': 'autopagerize_link',
            click: function() {
              if (state == 'on' || state == 'loading') {
                changeIconColor('off');
              }
              else if (state == 'off') {
                changeIconColor('on');
              }
              $j('#pixiv_stacc_autopagerize_help').css({
                top: '-200px'
              });
            }
          })
        )
      ).appendTo(document.body);
      
      if ($j("#STACC_action").val() == 'status') {
        $j('.status-btn2').each(function() {
          this.addEventListener('click', function() {
            if ($j('#insert_comment_1').length) {
              loadEnable = false;
              changeIconColor('off');
              $j('#insert_comment').attr({
                id: 'insert_comment_'
              });
              
              $j('#insert_comment_1').attr({
                id: 'insert_comment'
              }).get(0).addEventListener('DOMNodeInserted', function(e) {
                if (loadEnable) {
                  return;
                }
                loadEnable = true;
                setTimeout(function() {
                  $j('#insert_comment').attr({
                    id: 'insert_comment_1'
                  });
                  
                  $j('#insert_comment_').attr({
                    id: 'insert_comment'
                  });
                  
                  changeIconColor('on');
                  STACC_comment_now = loadedPageNumber - 1;
                }, 0);
                e.currentTarget.removeEventListener(e.type, arguments.callee);
              }, false);
            }
          }, false);
        })
      }
      
      $j(window).scroll(function() {
        if (loadEnable && state == 'on' &&
          $($j('#insert_comment, #insert_status').get(0)).positionedOffset()[1] + 
          $j('#insert_comment, #insert_status').outerHeight() - 
          window.innerHeight - window.scrollY <=
          BASE_REMAIN_HEIGHT) {
          if ($j('#insert_comment').length) {
            $j("#swap_comm_btn_top, #swap_comm_btn_bottom").hide();
            
            $j('#insert_comment').attr({
              id: 'insert_comment_' + loadedPageNumber
            }).after($j('<div />').attr({
              id: 'insert_comment'
            }));
            
            $j('.message_simple').removeClass('message_simple');
            
            pageLoad('#insert_comment', '.next_comment_open', function() {
              $j('#insert_comment').prepend($j('<p />', {
                'class': 'autopagerize_page_info',
                text:    'page: ' + loadedPageNumber
              }));
            });
          }
          else if ($j('#insert_status').length) {
            pageLoad('#insert_status', '.bt_more');
          }
        }
      });
    };
    
    if ($j('.next_comment_open, .bt_more').length == 0) {
      $j('#insert_status, #insert_comment').get(0)
        .addEventListener('DOMNodeInserted', function(e) {
        if (loadedPageNumber == 0) {
          loadedPageNumber++;
          setTimeout(initAutoPaging, 0);
          e.currentTarget.removeEventListener(e.type, arguments.callee);
        }
      }, false);
    }
    else {
      loadedPageNumber++;
      initAutoPaging();
    }
  };
  
  location.href = 'javascript:(' + setAutoPaging.toString() + ')();';
  
  var disableAutoPagerize = function() {
    var styleParent = document.getElementsByTagName('head')[0] || document.body;
    var style = document.createElement('style');
    style.type = 'text/css';
    var styleText = document
      .createTextNode('#autopagerize_icon, #autopagerize_help { display: none; }');
    style.appendChild(styleText);
    styleParent.appendChild(style);
    
    window.AutoPagerize.addRequestFilter(function(opt) {
      opt.url = '0.0.0.0';
    });};
  
  if (window.AutoPagerize) {
    disableAutoPagerize();
  }
  else {
    window.addEventListener('GM_AutoPagerizeLoaded', disableAutoPagerize, false);
  }
})();