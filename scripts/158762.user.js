// ==UserScript==
// @name           HistogramHeatGraph.user.js
// @description    Visualize comments upsurge for Nicovideo
// @version        0.20130914
// @match          http://www.nicovideo.jp/watch/*
// ==/UserScript==

(function() {
  function func() {

    function setElement() {
      var aaa = document.createElement('div');
      var bbb = document.createElement('div');
      var ccc = document.createElement('a');
      document.body.appendChild(aaa);
      document.getElementById('playerContainer').appendChild(bbb);
      document.getElementById('playerContainer').appendChild(ccc);
    }

    function setContent(barLen) {

      var aaa = WatchApp.ns.init.PlayerInitializer.commentPanelViewController.commentLists;
      var arrCmt = [];
      for (var i = aaa.length; i--;) {
        var bbb = aaa[i].comments;
        if (arrCmt.length < bbb.length) arrCmt = bbb;
      }
      var cmtLen = arrCmt.length;
      var videoLen = document.getElementById('external_nicoplayer').ext_getTotalTime();
      aaa = (videoLen + 1) * 1000;
      for (i = cmtLen; i--;) {
        if (aaa < arrCmt[i].vpos) {
          videoLen += 10;
          break;
        }
      }

      var barIdx = Math.ceil(videoLen / barLen);
      var arrMsgCmt = [];
      var arrCntCmt = [];
      var barTime = 0;
      var arrTime = [];
      var barLenLast = (videoLen % barLen | 0) - barLen;

      for (i = 0; i < barIdx; i++) {
 
        arrMsgCmt[i] = [];
        arrCntCmt[i] = 0;
        for (var j = 0; arrCmt[j]; j++) {
          aaa = arrCmt[j].vpos / 1000;
          if (barTime <= aaa && aaa < barLen + barTime) {
            arrMsgCmt[i].push(arrCmt[j]);
            arrCntCmt[i]++;
          }
        }

        arrMsgCmt[i].sort(function(a, b) { return a.vpos - b.vpos } );
        for (j = arrMsgCmt[i].length; j--;) {
          arrMsgCmt[i][j] = arrMsgCmt[i][j].message.replace(/"|<|&lt;/g, ' ').replace(/\n/g, '<br>');
        }
        arrMsgCmt[i] = arrMsgCmt[i].join('<br>');

        aaa = barTime / 60 | 0;
        bbb = barTime - aaa * 60;
        if (bbb < 10) bbb = '0' + bbb;
        arrTime[i] = aaa + ':' + bbb + '-';
        if (i > barIdx - 2) barTime += barLenLast;
        aaa = (barLen + barTime) / 60 | 0;
        bbb = barLen + barTime - aaa * 60;
        if (bbb < 10) bbb = '0' + bbb;
        arrTime[i] += aaa + ':' + bbb;
        barTime += barLen;

      }

      var playerWidth = $('#nicoplayerContainer').width();
      aaa = videoLen % barLen / barLen;
      bbb = playerWidth / (aaa + barIdx - 1);
      var arrColor = ['#126da2', '#1271a8', '#1275ae', '#1279b4', '#137dba', '#1381c0', '#1385c6', '#1489cc', '#148dd2', '#1491d8'];
      var barMax = Math.max.apply(null, arrCntCmt);
      var ccc = (arrColor.length - 1) / barMax;
      var graphBar = '';
      var barSz = 2;
      for (i = 0; i < barIdx; i++) {
        if (i > barIdx - 2) bbb *= aaa;
        var ddd = arrColor[ccc * arrCntCmt[i] | 0];
        var eee = arrMsgCmt[i] + '<br><br>' + arrTime[i] + ' comment ' + arrCntCmt[i];
        graphBar += '<div style="width:' + bbb + 'px;height:' + arrCntCmt[i] * barSz + 'px;background:' + ddd + '" title="' + eee + '"></div>';
      }

      var graphTip = $('div').last();
      graphTip
        .hide()
        .css( {
          'position': 'absolute',
          'z-index': '9999',
          'padding': '3px 4px 0',
          'border': '0',
          'background': 'rgba(0, 0, 0, .5)',
          'color': '#fff',
          'font': '12px/1.25 sans-serif'
        } );

      $('#playerContainerWrapper').css('padding-bottom', barMax * barSz + 'px');
      $('#playerContainer').css('text-align', 'left');
      $('#playerTabWrapper').css('text-align', 'center');

      aaa = barMax / 10;
      bbb = 100 / aaa;
      ccc = '';
      for (i = 1; i < aaa; i++) {
        ddd = i * bbb;
        ccc += '#111 ' + ddd + '%,#222 ' + ddd + '%,';
      }
      $('#playerTabWrapper + div')
        .html(graphBar)
        .css( {
          'float': 'left',
          'width': playerWidth,
          'height': barMax * barSz + 'px',
          'background': 'linear-gradient(to bottom, #222,' + ccc + '#111)'
        } );

      $('#playerTabWrapper + div *')
        .css( {
          'float': 'left',
          'margin': '0 0 1px'
        } )
        .hover(
          function(e) {
            barTitle = $(this).attr('title');
            barColor = $(this).css('background-color');
            graphTip
              .html(barTitle)
              .show()
              .css( {
                'top': e.pageY - graphTip.height() - 10 + 'px',
                'left': e.pageX + 'px'
              } );
            $(this)
              .attr('title', '')
              .css('background', '#2bc6f9');
          },
          function() {
            graphTip.hide();
            $(this)
              .attr('title', barTitle)
              .css('background', barColor);
          }
        )
        .mousemove(function(e) { graphTip.css( {
          'top': e.pageY - graphTip.height() - 10 + 'px',
          'left': e.pageX + 'px'
        } ) } );

      $('#playerContainer > a')
        .text(cmtLen + ' comment GET')
        .css( {
          'position': 'absolute',
          'padding': '10px',
          'cursor': 'pointer'
        } )
        .click(function(e) { e.ctrlKey ? setContent(60) : setContent(10) } );

    }

    try {
      if ($('.cell').length < 4) throw null;
      setElement();
      setContent(10);
    } catch(e) {
      setTimeout(arguments.callee, 1000);
    }

  }
  var aaa = document.createElement('script');
  aaa.textContent = '(' + func.toString() + ')()';
  document.body.appendChild(aaa);
} )();