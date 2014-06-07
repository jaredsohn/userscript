// ==UserScript==
// @name           fast ldc
// @namespace      http://looxu.blogspot.com/
// @description    Fast post to livedoor clip
// @include        http://*
// @exclude        http://mail.google.com/*
// @exclude        http://www.rememberthemilk.com/*
// @author         Arc Cosine
// @version        1.6
// ==/UserScript==
// License : Public Domain
// Get Post key bookmarklet;
// javascript:(function(){ var n=document.getElementsByTagName('input');var p;for( var i=0,l=n.length; i<l; i++ ){ if(n[i].name.match(/postkey/)){ p=n[i].value;break;}}window.prompt('Your postkey',p);})();
(function(){
    var LDC = {
      //postkey : 'Your Post Key',
      /* config ここから */
      postkey : 'Your postkey',
      firekey : 'c',  //クリップを動かすショートカットキー。使用できるのは0-9a-zA-Zだと思う。A-ZはShift+a-zと解釈される
      pub     : 'on', //公開|非公開の設定。公開の場合はon 非公開の場合はoff
      /* config ここまで*/
      init : function(){
        LDC.preLoad();
        window.addEventListener( 'keypress', function(e){
            LDC.addKeyBind( LDC.firekey , function(){ LDC.postBox() }, e );
        },false );
        window.addEventListener( 'mousemove', function(e){ LDC.dragMove(e); }, false );
      },  
      imgList : [],
      preLoad : function(){
        for( var i=0; i<6; i++ ){
          LDC.imgList[i] = new Image();
          LDC.imgList[i].src = 'http://clip.livedoor.com/img/rate/pad/' + i + '.gif';
        }
      },
      addKeyBind : function( keyChar, func, eve ){
        var t=eve.target;
        var n=t.tagName.toLowerCase();
        if( t.nodeType != 1 || n == 'input' || n == 'textarea' ){
          return;
        }
        var pressKey = eve.which;
        keyChar = keyChar.charCodeAt(keyChar);
        if( pressKey == keyChar ){
          eve.preventDefault();    //Stop Default Event 
          func.apply();
        }
      },
      rate : 0,
      rate_change : function(arg){
        var t_div = document.getElementById('t_div');
        if( !t_div ) return;
        LDC.rate = parseInt(document.getElementById('rate').value) + arg;
        if( LDC.rate < 0 ) LDC.rate = 0;
        if( LDC.rate > 5 ) LDC.rate = 5;
        var el = document.getElementById('rate_img');
        el.src = LDC.imgList[LDC.rate].src;
        document.getElementById('rate').value = LDC.rate;
      },
      postBox : function(){
          var t_div = document.getElementById('t_div');
          if( !t_div ){
            t_div = document.createElement('div');
            t_div.id = 't_div';
            t_div.style.position = 'absolute';
            t_div.style.top = (window.pageYOffset || window.scrollY)+ 20 + 'px';
            t_div.style.left = '60px';
            t_div.style.margin = '0px';
            t_div.style.padding = '0px';
            t_div.style.overflow = 'hidden';

            var o_div = t_div.appendChild(document.createElement('div'));
            o_div.id = 'o_div';
            o_div.style.margin = '0px';
            o_div.style.padding = '0px';
            o_div.style.position = 'relative';
            o_div.style.top = '0px';
            o_div.style.left = '0px';
            o_div.style.width = '420px';
            o_div.style.height = '180px';
            o_div.style.border = '3px solid #aaaaaa';
            o_div.style.backgroundColor = '#f0f0f0';
            o_div.style.zIndex = '99993';

            o_div.addEventListener( 'mousedown', function(e){ LDC.dragStart(e); }, false );
            o_div.addEventListener( 'mouseup', function(e){ LDC.dragEnd(e); }, false );

            var myForm = document.createElement('form');
            myForm.style.fontSize = '12px';
            myForm.style.backgroundColor= '#fefefe';
            myForm.style.zIndex = '99999';
            myForm.style.color = '#000000';
            myForm.style.position = 'absolute';
            myForm.style.top = '35px';
            myForm.style.left= '15px';
            myForm.style.padding= '5px';
            myForm.style.margin= '0px';
            myForm.style.textAlign = 'center'

            //quote text
            var quote = window.getSelection().toString();
            quote = (quote.length>0)?('『' + quote + '』'):'';

            var url = 'http://clip.livedoor.com/clip/add';
            myForm.method = 'POST';
            myForm.target = 'crossIframe';
            myForm.innerHTML = 'LDC Fast Clip<dl style="margin:0px;padding:0px;font-size:12px;"><dt style="width: 390px; margin: 0px 0px 2px 0px; padding: 0px;"><label style="font-weight:normal;font-size:12px; width: 48px; float:left; margin:0px; padding:0px;  display: block; line-height: 1;">レート</label><img id="rate_img" src="http://clip.livedoor.com/img/rate/pad/0.gif">&nbsp;&nbsp;w key:rate up,q key:reate down</dt><dt style="width: 390px; margin: 0px 0px 2px 0px; padding:0px; "><label style="font-weight:normal;font-size:12px; width: 48px; float:left; margin:0px; padding:0px; display: block; line-height: 1;">タグ</label><input style="font-size: 12px; border: 1px solid #aaaaaa; width:300px; margin:0px; padding:0px;" tabindex=1 type="text" id="tagArea" value=""></dt><dt style="width: 390px; margin: 0px 0px 2px 0px; padding: 0px;"><label style="font-weight:normal;font-size:12px; width: 48px; float:left; margin:0px; padding:0px; display: block; line-height: 1;">コメント</label><textarea tabindex=2 style="padding:0px; margin: 0px; font-weight:normal;font-size: 12px; border:1px solid #aaaaaa; width:300px; height: 50px;" id="clipTextNote">'+quote+'</textarea></dt></dl><input tabindex=3 type="submit" value="送信"><input type="hidden" name="link" value="' + location.href +'"><input type="hidden" name="rate" id="rate" value="0">';
            t_div.appendChild(myForm);
            document.body.appendChild(t_div);

            var crossIframe= document.createElement('iframe');
            crossIframe.name = 'crossIframe';
            crossIframe.id = 'crossIframe';
            crossIframe.src = 'about:blank';
            crossIframe.style.display = 'none';

            myForm.addEventListener( 'submit', function(){
              var text = encodeURIComponent(document.getElementById('clipTextNote').value);
              var tags = encodeURIComponent(document.getElementById('tagArea').value);
              myForm.action = url + '?title=' + encodeURIComponent(document.title) + '&notes=' + text + '&tags=' + tags + '&public=' + LDC.pub + '&postkey=' + LDC.postkey;
              var cnt = 0;
              crossIframe.addEventListener( 'load', function(){
                if( cnt++ == 0 ){
                  myForm.submit();
                }else{
                  crossIframe.parentNode.removeChild(crossIframe);
                  t_div.parentNode.removeChild(t_div);
                }
              }, false );
            }, false );
            document.body.appendChild(crossIframe);

            close_div = document.createElement('div');
            close_div.style.backgroundColor = '#dee3ea';
            close_div.style.color= '#000000';
            close_div.style.fontSize = '12px';
            close_div.style.lineHeight= '1';
            close_div.style.position = 'absolute';
            close_div.style.top = '10px';
            close_div.style.right = '10px';
            close_div.style.width = '60px';
            close_div.style.margin= '0px';
            close_div.style.padding = '3px 10px';
            close_div.style.cursor = 'pointer';
            close_div.style.border = '1px solid #0f0f0f';
            close_div.style.zIndex = '99998';
            close_div.style.textAlign = 'center'
            close_div.innerHTML='閉じる';
            t_div.appendChild(close_div);
            close_div.addEventListener( 'click', function(){
              crossIframe.parentNode.removeChild(crossIframe);
              t_div.parentNode.removeChild(t_div);
            }, false);

            window.addEventListener( 'keypress', LDC['setKey'],false);
          }else{
            var flg = t_div.style.display;
            if( flg == 'none' ){
              t_div.style.display = 'block';
              window.addEventListener( 'keypress', LDC['setKey'],false);
            }else{
              t_div.style.display = 'none';
              window.removeEventListener( 'keypress', LDC['setKey'],false);
            }
          }
      },
      moving  : null,
      targetX : null,
      targetY : null,
      startX  : null,
      startY  : null,
      dragStart : function(e){
        LDC.moving = document.getElementById('t_div');
        LDC.targetY = parseInt(LDC.moving.style.top.replace('px',''));
        LDC.targetX = parseInt(LDC.moving.style.left.replace('px',''));
        LDC.startX = e.pageX; 
        LDC.startY = e.pageY;
        e.preventDefault();
        e.stopPropagation();
      },
      dragMove : function(e) {
        if( LDC.moving ){
          LDC.moving.style.top = e.pageY - LDC.startY + LDC.targetY + 'px';
          LDC.moving.style.left= e.pageX - LDC.startX + LDC.targetX + 'px';
        }
      },
      dragEnd : function(e){
        LDC.moving = null;
      },
      setKey : function(e){
        LDC.addKeyBind( 'q', function(){ LDC.rate_change(-1); }, e);
        LDC.addKeyBind( 'w', function(){ LDC.rate_change(1);}, e);
        LDC.addKeyBind( 'h' , function(){ LDC.leftMove() }, e );
        LDC.addKeyBind( 'j' , function(){ LDC.downMove() }, e );
        LDC.addKeyBind( 'k' , function(){ LDC.upMove() }, e );
        LDC.addKeyBind( 'l' , function(){ LDC.rightMove() }, e );
      },

      leftMove  : function(){ LDC.boxMove( -10,   0 ); },
      downMove  : function(){ LDC.boxMove(   0,  10 ); },
      upMove    : function(){ LDC.boxMove(   0, -10 ); },
      rightMove : function(){ LDC.boxMove(  10,   0 ); }, 
      boxMove : function( x, y ){
        var t_div = document.getElementById('t_div');
        t_div.style.top  = parseInt(t_div.style.top.replace('px','')) + y + 'px';
        t_div.style.left = parseInt(t_div.style.left.replace('px',''))+ x + 'px';
      }

    };
    LDC.init();
 })();
