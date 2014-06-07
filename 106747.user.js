// ==UserScript==
// @name habracut 0.69, 13.07.2011
// @author spmbt0
// @attribution RReverser
// @description    Load content under habracut 
// @include        http://*.habrahabr.ru/*
// @include        http://habrahabr.ru/*
// ==/UserScript==
var css
  ='а.entry-info .entry-info-wrap div.btnBack, .btnBack'
    +'{margin: 1px 12px -1px 0; padding-left: 3px; border: 1px solid #9bc; cursor: pointer; '
    +'-moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; background: #cdd;}'
  +'.comments.c2{clear: both; position: relative; display: none;}'
  +'.btnBack.inln'
    +'{display: inline-block; vertical-align: middle; overflow: hidden; width: 1.2em; height: 16px; margin: 0 2px;}'
  +'div.hentry .content .percent, div.hentry .btnBack .percent{display: inline-block;}'
  +'div.hentry .content .gPercent, div.hentry .btnBack .gPercent'
    +'{display: inline-block; vertical-align: middle; width: 100px; height: 11px; border: 1px solid #9bc; margin-left: 9px; background-color: #ecefee;}'
  +'div.hentry .content .gPercent div, div.hentry .btnBack .gPercent div'
    +'{display: inline-block; height: 11px; border-right: 1px solid #9bc; background-color: #e0e5e8;}'
  +'div.hentry .content .gPercent div{background-color: #f4f8fb}'
  +'.showComm.btnBack:not(.inln), .showComm.btnBack.n2{display: none; clear: both;}'
  +'.showComm.btnBack:not(.inln):not(.n2){margin-top: 52px;}'
  +'div.hentry .showComm.btnBack.n2 .percent0{float:right;} div.hentry .showComm.btnBack.n2 .percent{vertical-align: middle; border: 1px solid #9bc; margin: -1px 5px 1px; padding: 0 15px 1px; background-color: #ecefee;}';
if(typeof GM_addStyle != "undefined"){ GM_addStyle(css);
}else if(typeof PRO_addStyle != "undefined"){ PRO_addStyle(css);
}else if(typeof addStyle != "undefined"){ addStyle(css);
}else{
  var heads = document.getElementsByTagName("head");
  if(heads.length > 0){
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    heads[0].appendChild(node);
}}
var img1 = '<img src="data:image/gif;base64,R0lGODlhEAAQALIEAAgICJeXl0xMTM/Pz/39/S4uLmlpaQAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAHACwAAAAAEAAQAAADRHi63P6NFECBMoE4WRUtQzRRSjAV2hIAxbRwATNlBbPWC/nonrXxhxnDcLjZWKkDwCB8nWLKT1IxGPWQmwAxKoV4v44EACH5BAkKAAcALAIAAAAMABAAAANEeDoQ+vAUUEY8JIAN7BsTZ2AWMRVaZxYZRUiO2UzOUdvUdmEc8F4bmiKj0KBctgKGZhoxZkiPoVeBPDeBn/W0e2g8hwQAIfkECQoABwAsAgAAAAwAEAAAA0R4ujfC8AQQGAkFaE3UyNtWEVlRDaIEFJ1qtFmlBMNxTUCkhDqhBYHOQKYqKAgGyjGm0gwupQ4utKrZqKbWTKlTCKyQBAAh+QQJCgAHACwCAAEADQANAAADP3i6fESKhAJACa+MM2j9BTUQ1KVM3xBYUOQBgwEEzAs3uDLse9t8AANjJfwIF6TZAYSRlCAAga2iUQidVMwiAQAh+QQJCgAHACwAAAIAEAAMAAADRXh6FAWgBLLqeDCXUZeRlBNRC8dUxBMc3AAYZhVAz4EBkyJmwaytOs0hAgFaDIDWYVYgKQiUGOMBahSaHdZNI11YablFAgAh+QQJCgAHACwAAAIAEAAMAAADQni6AVCBrEVCOM29MTMgElY8oaABxkSM1zF4AMc8k/O2i1N/XTDoC9bkp/EpGoWQwnASKFaPyAFUHI6qFiUlcMUtEgA7" title="подгрузка содержимого...">';
//===============================================
//document.domain ='habrahabr.ru';

(function(w){
  for(i in w){
    window[i]=w[i]
  };
  if(typeof unsafeWindow !='undefined')
    unsafeWindow['blck'] = w['blck'];
})(
(function(){//выложить хеш в корень DOM
var win = (typeof unsafeWindow !='undefined')? unsafeWindow: window
  , h = { //habrAV,habracut Ajax View
parents: function(clss, elem){
  for(var to = elem; to!=null && !RegExp(clss).test(to.className); to = to.parentNode);
  return to;
},
prev: function(clss, elem){
  for(var to = elem; to!=null && !RegExp(clss).test(to.className); to = to.previousSibling);
  return to;
},
next: function(clss, elem){
  for(var to = elem; to!=null && !RegExp(clss).test(to.className); to = to.nextSibling); //to.className != clss
  return to;
},
blck: function(clss, htm, rel, fClick){ //создание кнопки (класс, название, содержимое, фун.-контр.клика)
  var o = document.createElement("DIV");
  if(clss !=null) o.className = clss;
  if(htm !=null) o.innerHTML = htm;
  if(rel !=null) o.rel = o.setAttribute('rel', rel);
  if(fClick !=null) o.addEventListener('click', fClick,!1);
  return o;
},
hideC2: function(ev){ //скрыть содержание
  var topic = parents('hentry', this); //на контейнер статьи
  var c2 = topic.querySelector('.content.c2');
  if(/ n2/.test(this.className)){ //подкрутка окна
    document.documentElement.scrollTop -= c2.offsetHeight - this.getAttribute('rel');
  }
  topic.querySelector('.content').style.display = 'block'; //показать начало статьи (до ката)
  topic.querySelector('.btnBack:not(.showComm)').style.display //скрытие верхнего "Свернуть"
    = topic.querySelector('.btnBack.n2').style.display //скрытие нижнего "Свернуть"
    = c2.style.display ='none'; //скрыть полную статью
},
hideComm: function(ev){
  var topic = parents('hentry', this);
  var c2 = topic.querySelector('.comments.c2');
  if(/ n2/.test(this.className)){ //подкрутка окна
    document.documentElement.scrollTop -= c2.offsetHeight - this.getAttribute('rel');
  }
  topic.querySelector('.showComm.btnBack:not(.inln)').style.display
    = topic.querySelector('.comments.c2').style.display
    = topic.querySelector('.showComm.btnBack.n2').style.display = 'none';
},
addHandlerVote: function(o, id){ //vote_plus vote-for-comment, vote_minus vote-for-comment
  if(!o) return;
  //win.console.log('vote')
  o.addEventListener('click', function(ev){
    var isVote = parents('(vote_plus|vote_minus|^comments$)', ev.target);
    if(!/comments/.test(isVote.className)){
      var plus = /vote_plus/.test(isVote.className);
      //alert(isVote.getAttribute('rev'));
      var win2 = new function(){this.win=this;};
      var ajaxLoadPost0 = win.ajaxLoadPost;
      win.ajaxLoadPost = function(url, data, ajaxCallB, callObject, params, ajaxCallBErr){
        ajaxLoadPost0(url, data + '&signed_id=' +id , ajaxCallB, callObject, params, ajaxCallBErr);
      }
      win.console.log(win.Voter.vote(ev, isVote, 'post_comment', plus?'plus':'minus'))
      win.ajaxLoadPost = ajaxLoadPost0;
    }
  }, !1);
},
getHourMins: function(){
  var date = new Date;
  return date.getHours() +':'+ (date.getMinutes()<=9?'0':'') + date.getMinutes();
},
showContent: function(ev){ //подгрузить и показать статью
  if(ev.ctrlKey ^ ev.shiftKey) return;
  var tLink = this;
  var topic = parents('hentry', tLink); //топик
  var clickComments = /comments|entry-info-wrap/.test(this.parentNode.className); //признак клика по ссылке/кнопке комментариев
  if(!tLink.href && clickComments) //поправка клика по кнопке комментариев
    tLink.href = prev('comments', this).querySelector('a').href;
  //if(clickComments)
  //  win.console.log('clickComments');
  /*topicState = function(annoView, articleView, commView}){ //узнать состояние вида топика - конструктор
    //влияет: видимость начала статьи, всей статьи, комментариев
    var states='ALLHIDE,ARTICBEGIN,ARTICLALL,ALLSHOW,COMMSONLY'.split(',');
    var state = i;
    this.is = states[state];
    this.roll = function(isQa, topicHaCut){ //переход на следующее состояние просмотра (в зависимости от контекста и клика)
      var newState = state +1;
      if(isQa && state ==ALLHIDE) newState = ALLSHOW;
      if(!topicHaCut && state ==ARTICBEGIN) newState = ALLSHOW;
      if(state ==COMMSONLY) newState = ALLHIDE;
      state = newState;
      this.is = states[state];
      return this;
      //влияет: место клика (заголовок, кат, комменты), состояние
    }
  }
  var state = ARTICLBEGIN;*/
  if(/ link/.test(topic.className)) //сменить ссылку для подгрузки (на ту, которая в комментариях)
    tLink = topic.querySelector('.entry-info-wrap .comments a');
  var topicTitle = topic.querySelector('.topic') || topic.querySelector('.entry-title'); //заголовок статьи
  if(!/blk2nd/.test(this.className)){ //защита от повторного клика
    try{
      var to =[]; //эмуляция querySelectorAll
      var x = topic.querySelector('div.content'); //..All не работает (??)
      if(x) to[0] = x; //начало статьи (1-й .content)
      x = topic.querySelector('div.content.c2');
      if(x) to[1] = x;
      var tContent = to[0]; //начало статьи (аннотация)
      var topicHaCut = tContent.querySelector('a.habracut');
      var tComms = topic.querySelector('div.comments.c2'); //комментарии, если есть с прежней подгр.
      //win.console.log(tComms && getComputedStyle(tComms, null).getPropertyValue('display'))
      var wasComms = tComms && getComputedStyle(tComms, null).getPropertyValue('display') =='none'; //"были ли показаны комментарии"
      this.setAttribute('class', this.className +' blk2nd'); //блокировка повторного клика
      if(to.length >1 && !clickComments && !ev.ctrlKey && !ev.shiftKey){ //просто показать ранее загруженное
        to[0].style.display ='none';
        topic.querySelector('.btnBack:not(.showComm)').style.display //показ верхней кн."Свернуть"
          = to[1].style.display //показ статьи
          = topic.querySelector('.btnBack.n2').style.display ='block'; //показ нижней кн."Свернуть"
      }
      //win.console.log(tComms, '/', clickComments, '/', wasComms)
      if(tComms && clickComments && wasComms && !ev.ctrlKey && !ev.shiftKey){
        topic.querySelector('.showComm.btnBack:not(.inln)').style.display
          = tComms.style.display //показ комментариев
          = topic.querySelector('.showComm.btnBack.n2').style.display = 'block';
      }
      if(to.length <=1 || ev.ctrlKey){ //подгрузить или пере-подгрузить страницу по ссылке - сюда заходят только при необходимости нарисовать содержимое (контент .content.c2 и .comments.c2)
        this.innerHTML = img1 + this.innerHTML; //сигнал об ожидании Ajax
        var xmlhttp = new window.XMLHttpRequest();
        var reGet = ev.ctrlKey && ev.shiftKey; //режим пере-подгрузки
        if(topic.querySelector('.btnBack.n2')){ //другой признак пере-подгрузки, как и reGet
          topic.removeChild(topic.querySelector('.content.c2'));
          topic.removeChild(topic.querySelector('.comments.c2')); //контент удалён
          xmlhttp.wasArrows =1; //(стрелки были - и остались)
        }
        var url = tLink.href || topic.querySelector('.entry-info-wrap .comments a').href || topicTitle.link;
          //-обход заголовка-ссылки, не-ссылок, отсутствия ссылки на комментарии
        xmlhttp.open('GET', url.replace(/_/g,'%5F'), true); //странно, но "_" не переваривает (FF)
        xmlhttp.link = this; //активный элемент клика мыши
        xmlhttp.onreadystatechange = function(){ //показ статьи
          
          if(this.readyState !=4) return;
          xmlhttp.link.removeChild(xmlhttp.link.querySelector('img')); //снять сигнал об ожидании Ajax
          var contHeight = tContent.offsetHeight; //для будущей подкрутки текста при сворачивании статьи

          var showComm = clickComments && !wasComms || !topicHaCut;
          //win.console.log(clickComments, !wasComms, !topicHaCut);
          var isQa = /\/qa\//.test(xmlhttp.link);
          /*var state = new defineState();//!isQa ? ARTICLBEGIN : ALLHIDE;
          stateRoll(state, isQa, topicHaCut);*/
//win.console.log(tContent.style.display,'/', to[1] && to[1].style.display,'/', wasComms, 'showComm='+showComm, topicHaCut)
          if(!showComm)
            tContent.style.display ='none'; //скрыть начало статьи
          
          //win.console.log([showComm,to])
          var o = next(!xmlhttp.wasArrows ?'tags':'btnBack n2', tContent); //контекст, перед кот.ставится содержание
          if(o == null) //если нет контекста (блока с тегами)- ориентир.на блок с подписями
            o = next(!xmlhttp.wasArrows ?'entry-info vote_holder':'btnBack n2', tContent);
          if(!xmlhttp.wasArrows){ //сделать кнопку сворачивания контента (верхнюю)
            o.parentNode.insertBefore(blck('btnBack', '&larr; Свернуть <div class="percent"></div>', 0, hideC2), o);
            if(showComm && !isQa)
              topic.querySelector('.btnBack:not(.showComm)').style.display ='none';
          }else //...или показать её
            topic.querySelector('.btnBack:not(.showComm)').style.display ='block';

          var len1 = this.responseText.match(/<div class="content">([\s\S]*?)<\/div>[\s\S]+?(<ul class="tags"|<div class="entry-info vote_holder")/m); //вся статья (до тегов или подписи)
          len1 = len1 ? len1[1] :''; //устранение ошибки пустого ответа
          if(isQa){ //раздел вопросо-ответов - свои особенности
            var len3 = this.responseText.match(/(<div class="post-comments">)([\s\S]*?)<div id="comments"/);
            len3 = len3 ? len3[1] + len3[2] :'';
          }
          o.parentNode.insertBefore( //создать блок с полной статьёй (контентом)
            blck('content c2'
              , (/<a name="habracut"><\/a>/.test(this.responseText)
                  ?'<div style="background: #efeff2; padding-left: 6px; margin-right: -6px;">'
                    + len1.replace(/<a name="habracut"><\/a>/,'</div>')
                  :(isQa || !topicHaCut ? len1 + len3 :'<i style="color: #999">(пустой блок)</i>')
              )
            )
          , o);
          if(showComm && !isQa)
            topic.querySelector('.content.c2').style.display ='none';

          var len2 = len1.replace(/<a name="habracut"><\/a>(.*|\r|\n)*/m,''); //статья до хабраката
          if(!len1) len2 ='1'; //чтобы было "0%" при отсут.текста
          var date = getHourMins();
          var percnt = Math.floor((1- len2.length / (len1.length+1))*100);
          var percent = '&nbsp;'+ percnt +'%, <i>'+ date +'</i>';
          if(topicHaCut){ //показ процентов при наличии ката
            var gPercent = blck('gPercent', '<div style="width:'+(100 - percnt)+'px"></div>');
            topicHaCut.parentNode.appendChild(gPercent);
            topicHaCut.parentNode.appendChild(blck('percent', percent));
            
            topic.querySelector('.btnBack:not(.showComm) .percent').innerHTML = '<div class="gPercent"><div style="width:'+(100 - percnt)+'px"></div></div>'+ percent;
          }
          if(win.habrKarmView) //показ кармы, если установлен HabraKarmaViewPlus.user.js
            win.habrKarmView.addHandlersKarmElem(o.previousSibling); //обработчики для показа карм

          if(!xmlhttp.wasArrows){ //создать нижнюю стрелку сворачивания контента
            o.parentNode.insertBefore(blck('btnBack n2', '&larr; Свернуть', contHeight, hideC2), o);
            if(showComm && !isQa)
              topic.querySelector('.btnBack.n2').style.display ='none';
          }else //...или показать контент
            if(!showComm || isQa)
              topic.querySelector('.content.c2').style.display ='block';

          win.console.log('trace_01')
          if(!xmlhttp.wasArrows && showComm && !topicHaCut && !isQa) //скрыть статью, если надо только комм.
            hideC2.call(tLink);
          win.console.log(!xmlhttp.wasArrows ,showComm ,!topicHaCut)

          if(!xmlhttp.wasArrows){ //вывод кнопки над комментариями
            topic.appendChild( blck('showComm btnBack', '&larr; Свернуть', 0, hideComm));
            var b = topic.parentNode.querySelector('#main-content .page-navigation + div .showComm.btnBack:not(.inln)');
            if(b) b.style.marginTop ='60px';
          }

          win.console.log('trace_02')
          var regComms = /<div id="comments">([\s\S]*?)<\/div>\s+?<div id="sidebar">/m; //комменты
          var matchComments = this.responseText.match(regComms);
          if(matchComments){
            matchComments[1] = matchComments[1].replace(/(<p class="reply">[\n\r\s]*<a[\s\S]+?)(ответить|комментировать)(<\/a>[\n\r\s]*<\/p>)/gm,'$1ответ$3').replace(/id="js-field-holder-with-help"/,'id="js-field-holder-with-help" class="hidden"');
            //win.console.log(matchComments[1])
          }
          var comments = matchComments ? blck('comments c2', matchComments[1]) : null;
          var replyA = comments.querySelectorAll('.reply a'); //коррекция комментов для FF3.6
          for(var i in replyA){
            if(!replyA.getAttribute) continue;
            replyA[i].setAttribute('onclick','return!1;'+replyA[i].getAttribute('onclick'));
            replyA[i].addEventListener('click', function(ev){
              if(win.commentForm){
                win.console.log(win.commentForm)
                win.commentForm.moveForm('reply_form_'+ this.getAttribute('onclick').replace(/\D/g,''));
              }
              ev.preventDefault();
            },!1);
          }
//commentForm.moveForm('reply_form_4049153'); return false;
          if(!xmlhttp.wasArrows){ //=====вывести комментарии=====
            topic.appendChild(comments);
            var id = url.replace(/\/([^\/]*)$/g,'').replace(/\D/g,'');
            win.console.log(id); //номер сообщения (для оценок и комментариев)
            addHandlerVote(topic.querySelector('div.hentry > .comments'), id); //обработчик оценивания
          }else if(reGet){ //или вставка перед нижней кнопкой сворачивания
            topic.insertBefore(comments, topic.querySelector('.showComm .btnBack.n2'));
          }

//win.console.log(tContent.style.display,'/', to[1] && to[1].style.display,'/', wasComms, 'showComm='+showComm, topicHaCut)
          win.console.log('trace_03', !xmlhttp.wasArrows, win.commentForm, isQa)
          if(!xmlhttp.wasArrows && (win.commentForm || isQa)){
                win.console.log('trace_04',  win.commentForm && win.commentForm.reloadCommentsOnload)
            topic.appendChild( //вывод кнопки сворачивания под комментариями
              blck('showComm btnBack n2', '&larr; Свернуть <div class="percent0"><i></i> <div class="percent">подгрузка ответов</div></div>', -26, hideComm));

            win.console.log(topic.querySelector('.showComm.btnBack.n2 .percent'))
            topic.querySelector('.showComm.btnBack.n2 .percent') //====подгрузка комментариев (обработчик)====
                .addEventListener('click', function(ev){
              win.console.log('trace_05', win.commentForm && win.commentForm.reloadCommentsOnload)
              var fLoadCommentsBack = win.commentForm.reloadCommentsOnload;
              win.commentForm.reloadCommentsOnload = function(data, contxt){ //коллбек - подгрузка комментариев
                var newComms = data.responseText.match(/<comment comment_id=/gm);
                newComms = newComms ? newComms.length :0; //число комментариев в подгрузке
              win.console.log('trace_06', getHourMins() +', '+ newComms)
                topic.querySelector('.showComm.btnBack.n2 .percent0 i').innerHTML //...и выв.дату подгрузки
                  = getHourMins() + ', (+'+ newComms+')';
              win.console.log('trace_07')
                //fLoadCommentsBack.call(win.commentForm, data, contxt); //продолжение подгрузки
              }
              win.commentForm.targetId = id;
              win.commentForm.targetType ='post';
              win.commentForm.reloadComments(); //-updateComments: добавление новых комментариев; далее это не работает, т.к. Mootools
              ev.stopPropagation();
              
              
              
              
            },!1);
            win.console.log('trace_04_1', !win.commentForm && !isQa)
  
            if(!win.commentForm && !isQa)
              win.commentForm = new win.commentFormClass();
            //topic.querySelector('#comment_form .editor .preview')
  
            //sendData(form, submitType, fCheckFormComplition, classicSerialize)
            
            //sendComment(form, submitType('comment'|'preview'), node);
  
            //('#comment_form', 'preview', '.entry-content.comment-preview')
            
            //('#comment_form', 'comment', '#comment_form')
              
            win.console.log('init.add:'+  win.tm.init.add);
            win.tm.init.add(function(){ //дубликат tm.init.add(function(){...}) под Greasemonkey для отправки коммента
              var c_form_node =topic.querySelector('#comment_form');
              win.console.log('c_form_node:'+ c_form_node, ' win.commentForm:'+ (win.commentForm ? win.commentForm :'==no=='));
              if(c_form_node){ //если есть форма ответа...
                //c_form_node.input_preview = c_form_node.getElement('input.preview');
                c_form_node.input_preview = c_form_node.querySelector('input.preview'); //определеяем кнопку предпросмотра
                if(c_form_node.input_preview){ //если она есть...
                  c_form_node.input_preview.addEventListener('click',function(){ //обработчик клика
                    //alert('preview')
                    win.commentForm.sendComment(c_form_node, 'preview', c_form_node.querySelector('input.preview'));
                    //приход данных есть, но не идёт дальше (.fireEvent)
                  },!1);
                }
                var comment_type = c_form_node.querySelector('#comment_type').getAttribute('title');
                var c_form_submit = function(){
                  win.console.log('last_text='+ c_form_node.last_text, c_form_node['comment[message]'] && c_form_node['comment[message]'].value, win.comment_type);
                  if(c_form_node.last_text && c_form_node.last_text == (c_form_node['comment[message]'] && c_form_node['comment[message]'].value) ){
                    win.console.log('--fff-')
                  }else{
                    win.commentForm.sendComment(c_form_node, comment_type, c_form_node);
                    win.console.log('win.commentForm.sendComment(c_form_node, win.comment_type, c_form_node);', comment_type);
                  }
                  this.form.stopPropagation();
                  this.form.preventDefault();
                  return false;
                }
                var postButt = c_form_node.querySelector('input.post');
                postButt.setAttribute('type','button'); //пассивность кнопки
                postButt.addEventListener('click', c_form_submit,!1);
              }
            });
            win.console.log('win.commentForm:'+ win.commentForm)
          }
          win.console.log('.showComm.', showComm);
          if(showComm){ //показ комментариев
            topic.querySelector('.showComm.btnBack:not(.inln)').style.display
              = topic.querySelector('.comments.c2').style.display
              = topic.querySelector('.showComm.btnBack.n2').style.display = 'block';
          }
          if(win.habrKarmView) //показ кармы, если установлен HabraKarmaViewPlus.user.js
            win.habrKarmView.addHandlersKarmElem(topic);
          xmlhttp.link.setAttribute('class', xmlhttp.link.className.replace(/ blk2nd/, '')); //снять блок повторного клика
          habrAV.wasAddContent =1;
        };
        xmlhttp.send(null);
      }else
        this.setAttribute('class', this.className.replace(/ blk2nd/, '')); //снять блок повторного клика
    }catch(e){alert('error_'+url +' '+ e);}
  }
  ev.preventDefault();
},
hideC2: function(ev){ //скрыть содержание
  var topic = parents('hentry', this); //на контейнер статьи
  var c2 = topic.querySelector('.content.c2');
  if(/ n2/.test(this.className)){ //подкрутка окна
    document.documentElement.scrollTop -= c2.offsetHeight - this.getAttribute('rel');
  }
  topic.querySelector('.content').style.display = 'block'; //показать начало статьи (до ката)
  topic.querySelector('.btnBack:not(.showComm)').style.display //удаление верхнего "Свернуть"
    = topic.querySelector('.btnBack.n2').style.display //удаление нижнего "Свернуть"
    = c2.style.display ='none'; //скрыть полную статью
},
hideComm: function(ev){
  var topic = parents('hentry', this);
  var c2 = topic.querySelector('.comments.c2');
  if(/ n2/.test(this.className)){ //подкрутка окна
    document.documentElement.scrollTop -= c2.offsetHeight - this.getAttribute('rel');
  }
  topic.querySelector('.showComm.btnBack:not(.inln)').style.display
    = topic.querySelector('.comments.c2').style.display
    = topic.querySelector('.showComm.btnBack.n2').style.display = 'none';
}

}
habrAV = h;
return h;})());//собрание уникальных для window имён и их внутренние имена (переименование)

//===============================================
titleBase ='подгрузка статьи; Ctrl- или Shift+клик - новая страница';
titleAdd ='; Ctrl+Shift - пере-подгрузка';

loadGPlus = function(n){
  if(n===undefined) n=10;//число попыток обнаружить window.gapi
  console.log(n, window.gapi);
  if(window.gapi){
    if(!document.querySelectorAll('#comments').length){
      var divHentry = document.querySelectorAll('div.hentry'); 
      for(var i =0; i < divHentry.length; i++){
        var topicTitle = divHentry[i].querySelector('.entry-title a.topic');
        var vcard = divHentry[i].querySelector('.original-author');
        if(!vcard)
          vcard = divHentry[i].querySelector('.vcard.author.full'); 
        var gPlus = vcard.parentNode.insertBefore(blck('g-plusone', 'G+1'), vcard);
        gapi.plusone.render(gPlus, {"size": "small", "count": "true", "href": topicTitle.href});
        console.log(topicTitle.href);
      }
    }else{ 
      var vcard = document.querySelector('.vcard.author.full');
      var gPlus = vcard.parentNode.insertBefore(blck('g-plusone', 'G+1'), vcard);
      gapi.plusone.render(gPlus, {"size": "small", "count": "true", "href": location.href.replace(/#.*$/,'')});
    }
  }else if(n >0){ var f=arguments.callee; setTimeout(function(){f(--n);}, 200);}
}

document.addEventListener("DOMContentLoaded", readyLoad=function(){
  var win = (typeof unsafeWindow !='undefined')? unsafeWindow: window;
  var replyA = document.querySelectorAll('#comments .js-serv'); //'ответить'->'ответ' в одиночн.стр.
  for(var i in replyA) if(replyA[i].innerHTML && /комментировать|ответить/.test(replyA[i].innerHTML) )
    replyA[i].innerHTML ='ответ';
  if(!document.querySelectorAll('#comments').length){ //обработка, если не одиночные стр.
    var divHentry = document.querySelectorAll('div.hentry'); //articles
    for(var i =0; i < divHentry.length; i++){
      var topicTitle = divHentry[i].querySelector('.entry-title a.topic'); //заголовок
      if(/ translation/.test(divHentry[i].className))
        topicTitle.style.backgroundColor ='#f0f4fa'; //топик-перевод (подкраска)
      if(/ link/.test(divHentry[i].className))
        topicTitle.style.backgroundColor ='#f0faf4'; //топик-ссылка (подкраска)
      topicTitle.title = titleBase + titleAdd;
      topicTitle.addEventListener('click', habrAV.showContent,!1); //показ статьи или комментариев
      var topicHaCut = divHentry[i].querySelector('a.habracut');
      if(topicHaCut){ //есть хабракат
        topicHaCut.addEventListener('click', habrAV.showContent,!1); //показ статьи или комментариев
        topicHaCut.title = titleBase;
        var buttonExpand = blck('showComm btnBack inln', '&rarr;', 0, habrAV.showContent);
        buttonExpand.title = titleAdd;
        topicHaCut.parentNode.appendChild(buttonExpand); //кнопка справа от ката
        buttonExpand.addEventListener('click', habrAV.showContent,!1); //показ статьи или комментариев
      }
      var showComments = divHentry[i].querySelector('.entry-info-wrap .comments a'); //ссылка на комментарии
      if(showComments){
        showComments.addEventListener('click', habrAV.showContent,!1); //показ комментариев
        showComments.title ='подгрузка комментариев';
      }
      var o3 = blck('showComm btnBack inln', '&rarr;', 0, habrAV.showContent); //показ комментариев
      o3.title = titleAdd;
      divHentry[i].querySelector('.entry-info-wrap').appendChild(o3) ;//кнопка показа комментариев
    }
  }
  if(document.querySelector('.panel-nav-top li:first-child a')) //ссылка "Посты" - на новые (/new/)
  document.querySelector('.panel-nav-top li:first-child a').href += 'new/';
  if(win.commentForm)
    win.commentForm.sendOnEnter = function(){} //убить вредную функцию отправки по Ctrl+Enter (можно вешать свою)
  addJs('https://apis.google.com/js/plusone.js','{"parsetags": "explicit"}', loadGPlus); // добавление скрипта Google+
},!1);
if(/(Chrome\/|Opera\/)/.test(navigator.userAgent)) //для Хрома: эти события не существуют для юзер-скрипта
  readyLoad();
document.addEventListener("beforeunload", function(ev){
  if( window.habrAV && habrAV.wasAddContent && !confirm('Были подгружены данные: статьи, комментарии.\nДействительно выходим со страницы?') )
    ev.preventDefault();
});
function addJs(url, inner, callback){ //подгрузка скрипта
  if(url){
    var el = document.createElement('SCRIPT');
    el.src = url;
   //добавление кнопок Google "+1"
var inner3 ='blck='+ blck.toString()+'; loadGPlus = '+ loadGPlus.toString()  +' ;loadGPlus();'; //выкладыв. ф. в window
    if(inner){
      var txt = document.createTextNode(inner);
      el.appendChild(txt);
    }
    if(0&& typeof callback =='function'){
      el.onreadystatechange = function(){
        if(this.readyState =='loaded' || this.readyState =='complete'){
          callback();
          el.onreadystatechange = null;
        }
      }
      el.onload = function(){ callback(); el.onload = null; }
    }
    document.getElementsByTagName('head')[0].appendChild(el); //выполнить скрипт
    var el2 = document.createElement('SCRIPT');
    var txt2 = document.createTextNode(inner3);
    el2.appendChild(txt2);
    document.getElementsByTagName('head')[0].appendChild(el2); //выполнить скрипт
  }
}

//===== по клику на юзере открывается фрейм с информацией о нём. Расположение зависит от места ссылки в окне
//(внутри него все ссылки - target blank, но фрейм закрывается, если не нажать отмену в теч. 2.5 с.)


/*showVcard = function(){
  var userVcard = data.match(/(<div class="userinfo vcard">/)([\s\S]*?)<div id="sidebar/m);
  userVcard = userVcard ? userVcard[1] + userVcard[2]' :'';
  var ifrs = document.getElementsByTagName['IFRAME'];
  if(ifrs) for(var i in ifrs){
    if(ifrs[i].id =='userinfoView'){ ifrs =1; break;}
  }
  if(!ifrs || typeof ifrs =='object'){
    var ifrm = document.createElement("iframe");
    ifrm.id ='userinfoView';
    ifrm.style.position ='fixed'; ifrm.style.height ='200px'; ifrm.style.height ='80%';
  }
  ifrm.contentDocument.body.innerHTML = userVcard;
  //+кнопку закрытия, +свойства по клику на документе фрейма
}*/

//===== клик на ссылке: если юзер, то showVcard (если не откытый уже); остальные = откр в новом, если c|s, в том же, если C+S +вопрос про стирание данных


/* = document;
g = function(I){return d.getElementById(I);};
clicked =0; //признак: показывать/фиксировать цвет
F_over = function(e){
  if(clicked || (t = d.all ? event.srcElement : e.target).tagName !='TD') return; //отсечка не-ячеек
  if(t.style.backgroundColor)
    g('i'+ t.offsetParent.id).value = t.style.backgroundColor;  //для цветов, заданных в стиле
  if(t.bgColor)
    g('i'+t.offsetParent.id).value = t.bgColor; //для цвета в bgColor
}
F_click = function(e){
  if((t = d.all ? event.srcElement : e.target).tagName !='TD' && t.tagName !='TABLE') return;
  clicked = 1- clicked;
}
drwPal4 = function(p){
  String.prototype.dbl = function(){
    return this.replace(/(.)/g,'$1$1').match(/../g)
  }
s ='';
j =0;
while(j<216){
  k = (j - j %6)/6;
  r ='c90f63'.dbl()[m = k %3 + 3* (k >=18)];
  gg = ['0369cf'.dbl(), 'fc9630'.dbl()][[1,0,1,1,0,1][m]][j %6];
  b ='0369cffc9630'.dbl()[(j - j %18)/18];
s += (j %18 ?'':'<tr>') +'<td bgColor='+ r + gg + b
  +' style=font-size:4px width=6 height=6></td>'+ (++j %18 ?'':'</tr>');
  }g('s'+ p).innerHTML ='<table bgColor=black cellpadding=0 '
    +'cellspacing=1 id=t'+ p +'>'+ s +'</table><input id=it'+ p +'>';
  g('t'+ p).onmouseover = F_over;
  g('t' +p).onclick = F_click;
}
*/

//var hbspSand = /\/sandbox/.test(location.href) ? 'noindex div.hentry' : 'div.hentry';
/*window.addEventListener("DOMContentLoaded", function(){
  var divHentry = document.querySelectorAll(hbspSand); //articles
  alert(divHentry.length)
  var j = 0;
  for(var i = 0; i < divHentry.length; i++){
    divHentry[i] = divHentry[i].querySelector('a.habracut');
    if(typeof divHentry[i] !='undefined'){
      divHentry[i].addEventListener('click', habrAV.showContent,!1);
      //addEventListener('click', habrAV.showContent,!1);
      divHentry[i].title = 'Подгрузка статьи; Ctrl+Shift+клик - переход к статье';
    }else{
      divHentry[i].querySelector('.entry-info-wrap').appendChild(
        blck('showComm btnBack', '&rarr;', 0, habrAV.showContent));
      divHentry[i].querySelector('.entry-info-wrap .comments').addEventListener('click', habrAV.showContent,!1);
      divHentry[i].querySelector('.entry-info-wrap:last-child').addEventListener('click', habrAV.showContent,!1);
    }
  }
},!1);*/



