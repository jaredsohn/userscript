// ==UserScript==
// @name         ЮкиСкрипт
// @namespace    udp://insomnia/*
// @version      0.0.8
// @description  enter something useful
// @match        http://dobrochan.com/*/*
// @match        http://dobrochan.ru/*/*
// @include      http://dobrochan.com/*/*
// @include      http://dobrochan.ru/*/*
// @copyright    2013+, You
// @updateURL    https://userscripts.org/scripts/source/176182.user.js
// @grant        none
// ==/UserScript==

var yukiSaysWeFocused = true,
    emptyIconData = '',
    dobrochanIconData = '',
    lastPostUpdate = '',
    numOfNewPosts = 0,
    originalThreadTitle = '',
    yukireplyForm = null,
    fileList = [],
    yukiIsPosting = false,
    yukiPleaseRmoveReplyForm = false,
    updateHeartBeat = null,
    threadUpdateTimer = 60,
    yukiAutoupdateThread = true,
    yukiRemoveExif = true,
    yukiRemoveFileName = true;

ParseUrl = function(url){
    m = (url || document.location.href).match( /https?:\/\/([^\/]+)\/([^\/]+)\/((\d+)|res\/(\d+)|\w+)(\.x?html)?(#i?(\d+))?/)
    return m?{host:m[1], board:m[2], page:m[4], thread:m[5], pointer:m[8]}:{};
};

var makeRandId = function(size){
    var text = "";
    var possible = "0123456789abcdef";

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var arrayBufferDataUri = function(raw) {
   var base64 = ''
   var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  
   var bytes = new Uint8Array(raw)
   var byteLength = bytes.byteLength
   var byteRemainder = byteLength % 3
   var mainLength = byteLength - byteRemainder
  
   var a, b, c, d
   var chunk
  
   // Main loop deals with bytes in chunks of 3
   for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
  
    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63 // 63       = 2^6 - 1
    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
   }
  
   // Deal with the remaining bytes and padding
   if (byteRemainder == 1) {
    chunk = bytes[mainLength]
  
    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4 // 3   = 2^2 - 1
    base64 += encodings[a] + encodings[b] + '=='
   } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
  
    a = (chunk & 16128) >> 8 // 16128 = (2^6 - 1) << 8
    b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4
    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2 // 15    = 2^4 - 1
    base64 += encodings[a] + encodings[b] + encodings[c] + '='
   }
  
   return base64
  }

var jpegStripExtra = function(input) {
          // result e.target.result;

          // Decode the dataURL    
          var binary = atob(input.split(',')[1]);
          // Create 8-bit unsigned array
          var array = [];
          for(var i = 0; i < binary.length; i++) {
              array.push(binary.charCodeAt(i));
          }

          var orig = new Uint8Array(array);
          var outData = new ArrayBuffer(orig.byteLength)
          var output = new Uint8Array(outData);
          var posO = 2, posT = 2;
   
          output[0] = orig[0];
          output[1] = orig[1];
    
          while(!(orig[posO] === 0xFF && orig[posO + 1] === 0xD9) && posO <= orig.byteLength){
            if(orig[posO] === 0xFF && orig[posO + 1] === 0xFE){
                posO += 2 + orig[posO + 2] * 256 + orig[posO + 3];                
            }else if(orig[posO] === 0xFF && (orig[posO + 1] >> 4) === 0xE ){
                posO += 2 + orig[posO + 2] * 256 + orig[posO + 3];                
            }else if(orig[posO] === 0xFF && orig[posO + 1] === 0xDA){                
                var l = (2 + orig[posO + 2] * 256 + orig[posO + 3]);
                for(var i = 0; i < l; i++){
                    output[posT++] = orig[posO++];
                }  
                while(!(orig[posO] === 0xFF && orig[posO + 1] !== 0 && orig[posO + 1] < 0xD0 && orig[posO + 1] > 0xD7) && posO <= orig.byteLength){
                    output[posT++] = orig[posO++];
                }
            }else{
                var l = (2 + orig[posO + 2] * 256 + orig[posO + 3]);
                for(var i = 0; i < l; i++){
                    output[posT++] = orig[posO++];
                }     
            }          
          }
          
          output[posT] = orig[posO];
          output[posT + 1] = orig[posO + 1];          

          output = new Uint8Array(outData, 0, posT+2);  
         
          return "data:image/Jpeg;base64,"+arrayBufferDataUri(output);
        };

var difference = function(array1, array2){
    var result = [];

    if(array2.length == 0){
        return array1;
    };

    for (var i = 0; i < array1.length; i++) {
        if(array2.indexOf(array1[i]) == -1){
            result.push(array1[i]);
        };      
    };

    return result;
};

var yukiPleaseReplyLinks2 = function () {
    'use strict';
    
    var board = Hanabira.URL.board;
    
    $('.thread').each(function(index){
        var e = $(this);
        var threadID = e.attr('id').replace('thread_', '');
        
        e.find('.post:not(.yukiLinksProcessed)').each(function(index){
            var r = $(this);
            var postID = r.attr('id').replace('post_', '');

            var replyLink = '<a href="/'+board+'/res/'+threadID+'.xhtml#i'+postID+'" onmouseover="ShowRefPost(event,\''+
                    board+'\', '+threadID+', '+postID+')" onclick="Highlight(event, \''+postID+
                    '\')" style="font-size: 66%; font-style: italic;" class="yukiReplyLinks">&gt;&gt;'+postID+'&nbsp;&nbsp;</a>'

            var links = {};

            r.find('.reply_').each(function(){
                var te = $(this);
                var oldOnClick = te.attr('onclick');
                if(oldOnClick){
                    te.off('onclick');
                    te.attr('onclick', oldOnClick.replace('GetReplyForm', 'yukiMakeReplyForm'));
                }
            });

            r.find('a.search_google').each(function(){
                $(this).attr('href', $(this).attr('href').replace('://dobrochan.ru/', '://dobrochan.com/'));
            });

            r.find('a.search_iqdb ').each(function(){
                $(this).attr('href', $(this).attr('href').replace('://dobrochan.ru/', '://dobrochan.com/'));
                $(this).after($('<a class="yukiPlayReversi icon" onclick="yukiLetsPlayReversi(this);return false;" href="#" style="margin-left: 5px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAAMFBMVEUAAQAARgAAXQEAaQEAcgAAfAAAhgAleScAkgBHhUgApAg8lDhJsktxq3FnwWj9//zBDE9UAAAAbUlEQVQI12MQNjdWAUIGj/9/vBwYwhjs//+3YGDgYKj//38GAwMbiK8Bom3+/40SYJBgUPVUMQsWCmGw6uiKWrVqBYMJA2PU+/8nGAwYGKz+///GoMDAIPX//xcQXwvENwXL72DQaMvwaHNtAwD1eicxlfzDswAAAABJRU5ErkJggg==)"><img src="/images/blank.png" title="Play Reversi!" alt="Play Reversi!"></a>'));
            });

            r.find('.message a').each(function(j){
                var l = $(this);

                if(l.attr('onmouseover') != null){
                    var ref = l.text().replace('>>', '');
                    links[ref] = ref;                   
                }else{
                    var l = $(this);

                    if(!l.hasClass('de-ytube-link') && l.text().indexOf('YouTube: ') == 0 && l.attr('href').indexOf('http://www.youtube.com/watch?v=') == 0){

                        var ytId = l.attr('href').replace('http://www.youtube.com/watch?v=','');
                        l.addClass('de-ytube-link');
                        l.on('click', function(event){
                            event.preventDefault();
                            if($(this).closest(".postbody").parent().find('.yuki_ytholder').length > 0){
                                $(this).closest(".postbody").parent().find('.yuki_ytholder').replaceWith($('<div class="yuki_ytholder"><img src="https://i.ytimg.com/vi/'+ytId+
                                    '/0.jpg" height="270" width="360" class="yuki_clickable"/><br/><span style="font-size: 50%;" class="yuki_clickable" onclick="$(this).parent().remove();">[x]</span></div>').find('img').on('click', function(ytId){
                                        return function(event){
                                            $(this).replaceWith($('<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + ytId +
                                             '" wmode="transparent" width="360" height="270">'));
                                        }
                                    }(ytId)).parent());
                            }else{
                                $(this).closest(".postbody").before($('<div class="yuki_ytholder"><img src="https://i.ytimg.com/vi/'+ytId+
                                    '/0.jpg" height="270" width="360" class="yuki_clickable"/><br/><span style="font-size: 50%;" class="yuki_clickable" onclick="$(this).parent().remove();">[x]</span></div>').find('img').on('click', function(ytId){
                                        return function(event){
                                            $(this).replaceWith($('<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + ytId +
                                             '" wmode="transparent" width="360" height="270">'));
                                        }
                                    }(ytId)).parent());
                            }
                            $(this).closest(".postbody").css('clear', 'left');
                        });
                    }
                }
            });

            $.each(links, function(key, value){
                $('#post_' + value + ' .abbrev').append($(replyLink));
            });

            r.addClass('yukiLinksProcessed');

        });
    }); 
};

var yukiPleaseExpandThread = function(e, board, thread){
  e.preventDefault();
  var th = $('#thread_'+thread);
  var html = th.html();
  if (Hanabira.ExpThreads[thread])
    th.html(Hanabira.ExpThreads[thread]);
  else
  {
    $(e.target.parentNode).html(toLoading($('<span></span>')));
    $.get('/api/thread/expand/'+board+'/'+thread, function(res) {
      th.html(res);
      BindCrosses($(".delete input", th));
      yukiPleaseReplyLinks2();
    });
  }
  Hanabira.ExpThreads[thread] = html;
};

var yukiPleaseShowNumUpdates = function(){
    if(numOfNewPosts > 0){
        document.title = '[' + numOfNewPosts + '] ' + originalThreadTitle;

    }else{
        numOfNewPosts = 0;
        document.title = originalThreadTitle;
    }
};

var yukiPleaseCheckUpdates = function(force){
    if(yukiIsPosting){
        return;
    }
    
    clearTimeout(updateHeartBeat);
    updateHeartBeat = setTimeout(yukiPleaseCheckUpdates, threadUpdateTimer * 1000);

    if(!yukiAutoupdateThread && !force){
        return true;
    }

    $.get('/api/thread/'+Hanabira.URL.board+'/'+Hanabira.URL.thread+'.json', {}, function(data){
        if(lastPostUpdate != data.last_modified){
            $.get('/api/thread/expand/'+Hanabira.URL.board+'/'+Hanabira.URL.thread, function(res) {
          yukiPleaseUpdateThread(res);
          BindCrosses($(".delete input"));
          yukiPleaseReplyLinks2();
        });

        lastPostUpdate = data.last_modified;        
        }
    },'json');
};

var yukiPleaseUpdateThread = function(newHtml){
    'use strict';

    var scrollPos = $(document).scrollTop();

    var newThread   = $('<body>'+newHtml+'</body>'),
        oldPosts    = [],
        newPosts    = [],
        postParents = {},
        prevPost    = 0;

    newThread.filter('table.replypost').each(function(i){
        var postID = $(this).attr('id').replace('post_', '');

        newPosts.push(postID);
        postParents[postID] = prevPost;
        prevPost = postID;

    });

    $('table.replypost').each(function(i){
        var postID = $(this).attr('id').replace('post_', '');

        oldPosts.push(postID);
    });

    $.each(difference(oldPosts, newPosts), function(index, item){
        $('table#post_' + item).addClass('yukiSaysPostDeleted');

    });

    $.each(difference(newPosts, oldPosts), function(index, item){
        if(postParents[item] != 0){
            var pEl = $('table#post_' + postParents[item]);
            while(pEl.next().hasClass('yukiSaysPostDeleted')){
                pEl = pEl.next();
            }
            pEl.after(newThread.filter('table#post_' + item).first().addClass('yukiSaysPostNew').mouseleave(function(e){
                $(e.delegateTarget).removeClass('yukiSaysPostNew');
                $(e.delegateTarget).off('mouseleave');
                numOfNewPosts--;
                yukiPleaseShowNumUpdates();
            }));
        }else{
            $('div.oppost').after(newThread.filter('table#post_' + item).first().addClass('yukiSaysPostNew').mouseleave(function(e){
                $(e.delegateTarget).removeClass('yukiSaysPostNew');
                $(e.delegateTarget).off('mouseleave');
                numOfNewPosts--;
                yukiPleaseShowNumUpdates();
            }));
        }

        numOfNewPosts++;        
    });

    if(yukiPleaseRmoveReplyForm){
        yukiPleaseRmoveReplyForm = false;
        yukireplyForm.remove();
        yukireplyForm = null;
        fileList = [];
    }

    yukiPleaseShowNumUpdates();

    $(document).scrollTop(scrollPos);
};

var yukiPleasSetFavicon = function(ico){
    $('link[rel="shortcut icon"]').remove();
    $('<link rel="shortcut icon" type="image/x-icon" href="' + ico + '">').appendTo("head");
};

var yukiMakeReplyForm = function(click, board, tid, pid){
    if(!yukireplyForm){
        yukireplyForm = $('<form class="reply" style="display: inline-block; text-align: left;" id="yukipostform" action="/b/post/new.xhtml" method="post" enctype="multipart/form-data" onsubmit="return yukiPleasePost()">' + 
            '<input name="thread_id" value="2412950" type="hidden"><input name="task" value="post" type="hidden"><input id="scroll_to" name="scroll_to" value="2426848" type="hidden">' + 
            '<table><tbody><tr id="trname"><td class="postblock">Имя</td><td><input name="name" size="30" value="Анонимус" type="text"><span id="yuki_sageoff" class="yuki_clickable" onclick="$(this).hide(); $(\'#yuki_sageon\').show(); $(\'#isSage\').attr(\'checked\',\'checked\');">&nbsp;<i>(no&nbsp;sage)</i></span>' + 
            '<span id="yuki_sageon" style="display: none;" class="yuki_clickable" onclick="$(this).hide(); $(\'#yuki_sageoff\').show(); $(\'#isSage\').removeAttr(\'checked\');">&nbsp;<b style="color: red;"><img src="data:image/gif;base64,R0lGODlhDgAOAIQQAAYGAxscGiEjITEyMNwaFuEjI+kxMe5KS/FcXfFqafV+fvaQj/miofisrPu2tPvDw' + 
            '////////////////////////////////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgAQACwAAAAADgAOAAAFbiCUGGRpJqLjNE/rPs6THKwz3EMALAtDsouGkNdbKEjBBW4gACgUCOSQYUxYZ0jqTdAEGBCHgoGh4FkPB8MBgSAYnksmAIB2QxU4nbeuRsD1CQVhbmwjBnMEBWIFBDNpaQSRiYoGImkGiomRYhAhACH5BAUyAB8ALAQAAgAGAAEAAAUE4COOI' + 
            'QAh+QQFMgAfACwEAAIABgADAAAFC+AgDgHwnWijLmwIACH5BAEyAB8ALAQABAAGAAMAAAUM4CAOAvCd6MIoSpKEADs="/>&nbsp;SAGE</b></span><span style="float: right;">&nbsp;<a class="close icon" title="Убрать" onclick="yukireplyForm.remove()" ><img src="/images/blank.png" alt="Remove" style="vertical-align:middle; min-height:17px"></a></span></td></tr><tr style="display: none;" id="trsage"><td class="postblock">Не поднимать тред&nbsp;</td><td><input name="sage" type="checkbox" id="isSage"></td>' + 
            '</tr><tr id="trsubject"><td class="postblock">Тема</td><td><input name="subject" size="30" maxlength="64" value="" type="text"><input name="new_post" value="Отправить" type="submit"><span style="float: right;"><span id="de-btn-quote" title="Цитировать выделенное" onclick="yukiQuoteSelected()"><input value=">" style="font-weight: bold;" type="button"></span></span>' + 
            '</td></tr><tr id="trmessage"><td class="postblock">Сообщение</td><td><textarea style="padding: 0px; resize: both; " id="yukireplyText" name="message" cols="60" rows="6" onkeyup="$(this).css(\'height\', \'auto\' ); $(this).height(this.scrollHeight + 24);"></textarea><br/><div id="gamePlaceholder"></div></td></tr><tr id="trcaptcha"><td class="postblock">Капча</td><td><span><img src="" alt="Капча" id="captcha-image" onclick="reload_captcha(event);" style="margin: 2px; vertical-align:middle">&nbsp;<span onclick="yukiAttachCapcha(this);" class="yuki_clickable" title="Прикрепить капчу" style="color: #999;">[+]</span></span><br>' + 
            '<input autocomplete="off" id="captcha" name="captcha" size="30" onfocus="reload_captcha(event);" onkeypress="CaptchaProcess(event, \'ru\')" type="text" style="display: none;">' + 
            '</td></tr><tr style="display: none;" id="trrempass"><td class="postblock">Пароль</td><td><input name="password" size="35" value="123" type="password">' + 
            '</td></tr><tr id="trfile"><td class="postblock">Файлы</td><td id="files_parent"><input id="post_files_count" name="post_files_count" value="2" type="hidden">' + 
            '<div id="file_1_div"><input id="dumb_file_field" onchange="yukiAddFile(event, this);" type="file" style="visiblity:hidden; width: 0px; height: 0px; position: absolute; left: -9001px;" multiple />' + 
            '<input value="Добавить файлы" type="button" onclick="$(\'#dumb_file_field\').click()"/>'+
            '<span style="font-size: 66%;">&nbsp;<label><input type="checkbox" id="yukiRemoveExif" onchange="yukiSetNewOptions(this);"'+(yukiRemoveExif? ' checked': '')+'> Убирать Exif</label> &nbsp;<label><input type="checkbox" id="yukiRemoveFileName" onchange="yukiSetNewOptions(this);"'+(yukiRemoveFileName? ' checked': '')+'> Убирать имя файла</label></span>'+
            '<div id="files_placeholder"></div></div></td></tr><tr style="display: none;" id="trgetback">' + 
            '<td class="postblock">Вернуться к</td><td><select name="goto"><option value="board" selected="selected">доске</option><option value="thread">треду</option>' + 
            '</select></td></tr></tbody></table></form>');
        upload_handler = $t()*10000;

        yukireplyForm.find("#captcha-image").attr('src', "/captcha/"+ Hanabira.URL.board+"/"+$t()+'.png');
        yukireplyForm.find("input[name='password']").val($(".userdelete input[name='password']").val());
        yukireplyForm.find("input[name='thread_id']").val(tid);
        yukireplyForm.find("input[name='name']").val($("#postform_placeholder input[name='name']").val());
        if($('#postFormDiv #captcha').length > 0){
            yukireplyForm.find("input[name='captcha']").show();
        }

    }
    yukireplyForm.find("input[name='scroll_to']").val(pid || 0);
    $('#post_' + pid).after(yukireplyForm);

    InsertInto(document.getElementById('yukireplyText'), ">>"+pid+"\n");

    if($(click).hasClass('yukiPlayReversi')){
        //console.log("play reversi");
        yukireplyForm.find("#gamePlaceholder").empty().append($('<span>...загружаем игру...</span>'));

        var gameData = new Image();
        gameData.onload = function(){
            ReversiGame.initBoard(gameData, true);
            $("#gamePlaceholder span").replaceWith(ReversiGame.createGameBoard());
        }

        gameData.src = $($(click).parent().find('a')[0]).attr('href');
    }
};



var bytesMagnitude = function(bytes){
    if(bytes < 1024){
        return bytes + ' B';
    }else if (bytes < 1024 * 1024){
        return (bytes / 1024).toFixed(2) + ' KB';
    }else{
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    }
}

var yukiAddFile = function(evt, b){
    var files = evt.target.files; // FileList object
    
    if(fileList.length >= 5){
            alert('Пять файлов это максимум на Доброчане.');
            return;
    }

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
        if(fileList.length >= 5){
            alert('Пять файлов это максимум на Доброчане.');
            break;
        }
        var f_name = f.name, renamed = false;
        if(yukiRemoveFileName){
            f_name = (makeRandId(32) + (f.name.match(/\.[^\.]+$/) || [''])[0]).toLowerCase();
            renamed = true;
        }     

        fileList.push({
            file: f,
            f_name: f_name,
            renamed: renamed,
            el:   $('<div class="yukiFile"><span class="yuki_clickable">[убрать]</span><br/><div class="preview_stub"></div><br/><span class="file_name">'+
                escape(f_name)+'</span><br/><span class="file_name">'+
                bytesMagnitude(f.size)+'&nbsp;</span><select name="file_1_rating" class="rating_SFW" onchange=\'$(this).attr("class", "").addClass("rating_" + $(this).children(":selected").val().replace("-",""));\'><option class="rating_SFW">SFW</option><option class="rating_R15">R-15</option><option class="rating_R18">R-18</option><option class="rating_R18G">R-18G</option></select></div>')
        });

        fileList[fileList.length - 1].el.find('.yuki_clickable').on("click", (function(data){
            return function(e){
                var idx = fileList.indexOf(data);
                data.el.remove();
                delete fileList[idx];
                fileList.splice(idx, 1)

            }
        }(fileList[fileList.length - 1])) )

        $('#files_placeholder').append(fileList[fileList.length - 1].el);

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
            // Render thumbnail.
            var span = $('<span></span>');

            if(yukiRemoveExif && theFile.file.type.toLowerCase() == 'image/jpeg'){
                theFile.dataURL = jpegStripExtra(e.target.result);
                theFile['jpegStripped'] = true;
            }else{
                theFile.dataURL = e.target.result;
                theFile['jpegStripped'] = false;
            }

            if (theFile.file.type.match('image.*')) {
                theFile.el.find('.preview_stub').replaceWith($('<img />').attr('src', theFile.dataURL));                
            }            
        };
      })(fileList[fileList.length - 1]);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
}

function dataURLtoBlob(dataURL, dataType) {
  // Decode the dataURL    
  var binary = atob(dataURL.split(',')[1]);
  // Create 8-bit unsigned array
  var array = [];
  for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
  }
  // Return our Blob object
  return new Blob([new Uint8Array(array)], {type: dataType});
};

var yukiPleasePost = function(){
    var formData = $('#yukipostform').serializeArray(),
        fd = new FormData();

    for (var i = 0; i < formData.length; i++) {
        fd.append(formData[i].name, formData[i].value);        
    };

    for (var i = 0; i < fileList.length; i++) {

        if(yukiRemoveExif && fileList[i].file.type.toLowerCase() == 'image/jpeg' && !fileList[i].jpegStripped){
            fileList[i].dataURL = jpegStripExtra(fileList[i].dataURL);   
        }

        if(yukiRemoveFileName && !fileList[i].renamed){
            fileList[i].f_name = (makeRandId(32) + (fileList[i].f_name.match(/\.[^\.]+$/) || [''])[0]).toLowerCase();
        }  

        fd.append("file_" + (i+1), dataURLtoBlob(fileList[i].dataURL, fileList[i].file.type), fileList[i].f_name);
        fd.append("file_" + (i+1) + "_rating", fileList[i].el.find("select[name='file_1_rating']").val());       
    };
    fd.append("post_files_count", fileList.length);

    yukiIsPosting = true;
    clearTimeout(updateHeartBeat);  
    yukireplyForm.find("input[type=submit]").val('..Работаем...').attr("disabled", "disabled");;

    $.ajax({
        url: '/' + Hanabira.URL.board + '/post/new.xhtml' + "?X-Progress-ID=" + upload_handler,
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function(data, textStatus, jqXHR) {
            if(Hanabira.URL.thread && data.indexOf("/error/post/") == -1){
                yukiIsPosting = false;
                yukiPleaseRmoveReplyForm = true;
                yukiPleaseCheckUpdates();
            }else{
                document.location.href = data.match(/\(\'(.+)\'\)/)[1];
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
              yukiIsPosting = true;
              yukireplyForm.find("input[type=submit]").val('Отправить').removeAttr("disabled");
              alert('Не получилось отправить пост.\nПопробуйте чуть попозже ещё разок или перезагрузить страницу.\n\n-----------------------------\n' + textStatus);
            }
    });

    return false;
};

yukiQuoteSelected = function(){
  var t = document.getElementById('yukireplyText');
    InsertInto(t, '>'+window.getSelection().toString().replace(/\n/gm, '\n>')+'\n');
}

var ReversiGame = (function () {
  'use strict';

  var my = {},
      reversiBoard = [],
      blacks = 1, 
      whites = 2, 
      current = blacks,
      startedAs = current,
      moves=[], 
      startPos = reversiBoard;

  var reversiMove = function(x, y, doMove, color){
    if(!color){ 
      color = current 
    }
    if(!doMove){ 
      doMove = false 
    }

    var index = y * 8 + x;
    //console.log('check for ' +x+', ' + y + ' (' +index+')');

    if(reversiBoard[index] != 0){
      return false;
    }

    var checkDirection = function (dx, dy){
      if(dx == 0 && dy == 0){
        return false;
      }

      var cx = x + dx, cy = y + dy, cidx = cy * 8 + cx;

      if(cx < 0||  cx > 7 ||  cy < 0 ||  cy > 7 || 
          reversiBoard[cidx] == 0 || reversiBoard[cidx] == color){
        return false;
      }

      while(cx >= 0 && cx <= 7 && cy >= 0 && cy <= 7){
        if(reversiBoard[cidx] == color){
          return true;
        }
        if(reversiBoard[cidx] == 0){
          return false;
        }
        cx += dx;
        cy += dy;
        cidx = cy * 8 + cx
      }

      return false
    }

    var doDirection = function (dx, dy){
      var cx = x + dx, cy = y + dy, cidx = cy * 8 + cx;

      reversiBoard[y * 8 + x] = color;

      while(cx >= 0 && cx <= 7 && cy >= 0 && cy <= 7){
        if(reversiBoard[cidx] == color){
          return true;
        }

        reversiBoard[cidx] = color;
        
        cx += dx;
        cy += dy;
        cidx = cy * 8 + cx
      }
      
      return false
    }

    for(var i = -1; i < 2; i++){
      for(var j = -1; j < 2; j++){
        if(checkDirection(i,j)){
          if(doMove){
            doDirection(i,j);
          }else{
            return true;
          }
        }
      }    
    }

    return false;
  }

  var checkCanMove = function(color){
    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){
        if(reversiMove(i,j, false, color)){
          return true;
        }
      }    
    }
    return false;
  }

  my.initBoard = function (initMoves, fromImage) {
    reversiBoard = [0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 2, 1, 0, 0, 0, 
                    0, 0, 0, 1, 2, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0];
    blacks = 1;
    whites = 2; 
    current = 1; 
    moves=[];

    if(fromImage){
      var buffer = document.createElement('canvas');
          buffer.width = 600;
          buffer.height = 600;
      var ctxB = buffer.getContext('2d'), 
          numOfMoves = 0,
          imgMoves = [],
          colorAsNum = function(r, g, b){
            return (255 - r ) | ((255 - g) << 2) | ((255 - b) << 4);   
          };

      ctxB.drawImage(initMoves, 0, 0);
      var imageData = ctxB.getImageData(0,0,buffer.width, buffer.height);
      ctxB.putImageData(imageData, 0, 0);

      numOfMoves = colorAsNum(imageData.data[0], imageData.data[1], imageData.data[2]);

      for (var i = 0; i < numOfMoves; i++) {
        imgMoves.push(colorAsNum(imageData.data[4 + i * 4], imageData.data[5 + i * 4], imageData.data[6 + i * 4]));
      }

      initMoves = imgMoves;
    }

    if(initMoves && Object.prototype.toString.call( initMoves ) === '[object Array]' && initMoves.length > 0) {
      for (var i = 0; i < initMoves.length; i++) {
        var index = initMoves[i];

        if(reversiMove(index % 8, Math.floor(index / 8))){
          reversiMove(index % 8, Math.floor(index / 8), true);
          moves.push(index);
          
          if(checkCanMove(current == blacks?whites:blacks)){
            startedAs = current = (current == blacks?whites:blacks);
          }
        }else{
          break;
        }
      }    
    }
  };

  my.getBoard = function () {
    var result = [];
    for (var i = 0; i < reversiBoard.length; i++) {
      result.push(reversiBoard[i] == 0 ? 'empty' : reversiBoard[i] == blacks ? 'black': 'white');
    };

    return result;
  };

  my.getMoves = function () {
    return moves;
  };

  my.getCurrentColor = function () {
    return current == blacks? 'black' : 'white';
  };

  my.makeMove = function (x, y) {
   if(startedAs != current){
       return false;
   }
    if(reversiMove(x, y)){
      reversiMove(x, y, true);
      moves.push(y * 8 + x);
      
      if(checkCanMove(current == blacks?whites:blacks)){
        current = (current == blacks?whites:blacks);
      }
      return true;
    }

    return false;
  };

  var getStats = my.getStats = function () {
    var countBlacks = 0, countWhites = 0, countEmpty = 0;
    for (var i = 0; i < reversiBoard.length; i++) {
      if(reversiBoard[i] == blacks){
        countBlacks++;  
      }else if(reversiBoard[i] == whites){
        countWhites++;
      }else{
        countEmpty++;
      }
    }

    return {"blacks": countBlacks, "whites": countWhites, "empty": countEmpty};
  };

  my.drawCanvas = function(){
    var buffer = document.createElement('canvas');
        buffer.width = 600;
        buffer.height = 600;
    var ctxB = buffer.getContext('2d'),
        stats = getStats();

    ctxB.fillStyle = 'white';
    ctxB.fillRect(0, 0, 600, 600);
    ctxB.fillStyle = '#090';
    ctxB.fillRect(100, 100, 400, 400);


    ctxB.strokeStyle = 'rgba(0,0,0,0.5)';
    ctxB.lineWidth   = 2;
    ctxB.lineCap = "round";

    for(var i = 0; i < 9; i++){        

        ctxB.beginPath();
        ctxB.moveTo(100, 100 + 50 * i); 
        ctxB.lineTo(500, 100 + 50 * i);

        ctxB.stroke();
        ctxB.closePath();

        ctxB.beginPath();
        ctxB.moveTo(100 + 50 * i, 100); 
        ctxB.lineTo(100 + 50 * i, 500);

        ctxB.stroke();
        ctxB.closePath();

    }



    for (var i = 0; i < reversiBoard.length; i++) {
      if (reversiBoard[i] != 0){
        ctxB.beginPath();
        ctxB.arc(125 + (i % 8) * 50 + 2, 125 + Math.floor(i / 8) * 50 + 2, 20, 0, 2 * Math.PI, false);
        ctxB.fillStyle = 'rgba(0,0,0,0.3)';
        ctxB.fill();
        ctxB.closePath();

        ctxB.beginPath();
        ctxB.arc(125 + (i % 8) * 50, 125 + Math.floor(i / 8) * 50, 20, 0, 2 * Math.PI, false);
        ctxB.fillStyle = reversiBoard[i] == blacks ? '#000' : '#fff';
        ctxB.fill();
        ctxB.closePath();
      }
    };

    if(startedAs == current){
      ctxB.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctxB.fillStyle = 'rgba(0, 0, 0, 0.1)';
      for (var i = 0; i < reversiBoard.length; i++) {
        if(reversiMove((i % 8), Math.floor(i / 8))){
          ctxB.beginPath();
          ctxB.arc(125 + (i % 8) * 50 + 2, 125 + Math.floor(i / 8) * 50 + 2, 10, 0, 2 * Math.PI, false);
          ctxB.fill();
          ctxB.stroke();
          ctxB.closePath();
        }
      };
    }


    ctxB.fillStyle = 'black';
    ctxB.textAlign = "left";
    
    if(checkCanMove(blacks) || checkCanMove(whites)){
      ctxB.font = current == whites ? "bold 20pt Verdana": "20pt Verdana";
      ctxB.fillText((current == whites ? '> ': '') + 'Белые: ' + stats.whites, 100, 550);
      ctxB.textAlign = "right";
      ctxB.font = current == blacks ? "bold 20pt Verdana": "20pt Verdana";
      ctxB.fillText((current == blacks ? '> ': '') + 'Чёрные: ' + stats.blacks, 500, 550);
    }else{
      ctxB.fillStyle = stats.blacks < stats.whites ? 'red' : 'black';
      ctxB.font = stats.blacks < stats.whites ? "bold 20pt Verdana": "20pt Verdana";
      ctxB.fillText('Белые: ' + stats.whites, 100, 550);
      ctxB.textAlign = "right";
      ctxB.fillStyle = stats.blacks > stats.whites ? 'red' : 'black';
      ctxB.font = stats.blacks > stats.whites ? "bold 20pt Verdana": "20pt Verdana";
      ctxB.fillText('Чёрные: ' + stats.blacks, 500, 550);
      ctxB.fillStyle = 'red';
    }


    
    ctxB.font = "bold 40pt Comic Sans MS";
    ctxB.textAlign = "left";
    ctxB.fillText('Reversi', 100, 70);

    var numAsColor = function(num){
      return "rgb(" + (255 - (num & 3)) + "," + (255 - ((num >> 2 ) & 3)) + "," + (255 - ((num >> 4 ) & 3)) +')';
    }

    ctxB.fillStyle = numAsColor(moves.length);
    ctxB.fillRect(0, 0, 1, 1);

    for (var i = 0; i < moves.length; i++) {
      ctxB.fillStyle = numAsColor(moves[i]);
      ctxB.fillRect(1 + i, 0, 1, 1);
    };

    return buffer;
  };

  my.createGameBoard = function () {
    var buffer = document.createElement('canvas');
        buffer.width = 600;
        buffer.height = 600;
    var ctxB = buffer.getContext('2d'),
        elBoard = $(buffer);
    
    ctxB.drawImage(my.drawCanvas(), 0, 0);

    elBoard.on('click', function(e){
      var canvasX = e.clientX - this.getBoundingClientRect().left,
          canvasY = e.clientY - this.getBoundingClientRect().top,         
          cx = Math.floor((canvasX - 100) / 50), cy = Math.floor((canvasY - 100) / 50);

      if(my.makeMove(cx, cy)){
        ctxB.drawImage(my.drawCanvas(), 0, 0);
      }

    });

    return $('<p style="text-align: center;"></p>').append(elBoard).append($('<br/><input value="Убрать" onclick="$(this).parent().parent().empty();" type="button">&nbsp;&nbsp;<input value="Готово!" onclick="if(yukiAddGameFile(this)){$(this).parent().parent().empty();};" style="font-weight: bold;" type="button">'));
  };

  return my;
}());


var yukiLetsPlayReversi = function(el){
    yukiMakeReplyForm(el, Hanabira.URL.board, $(el).parents('.thread').attr('id').replace('thread_', ''), $(el).parents('.post').attr('id').replace('post_', ''));
}

var yukiAddGameFile = function(el){
    if(fileList.length >= 5){
            alert('Пять файлов это максимум на Доброчане.');
            return false;
    }

    var boardDataUrl = $(el).parent().find('canvas')[0].toDataURL();

    f = {"name": 'reversigameboard.png', "size": boardDataUrl.length * 6 / 8, "type": 'image/png'};

    fileList.push({
        file: f,
        renamed: false,
        f_name: 'reversigameboard.png',
        jpegStripped: true,
        el:   $('<div class="yukiFile"><span class="yuki_clickable">[убрать]</span><br/><img src="'+boardDataUrl+'"/><br/><span class="file_name">'+
            escape(f.name)+'</span><br/><span class="file_name">'+
            bytesMagnitude(f.size)+'&nbsp;</span><select name="file_1_rating" class="rating_SFW" onchange=\'$(this).attr("class", "").addClass("rating_" + $(this).children(":selected").val().replace("-",""));\'><option class="rating_SFW">SFW</option><option class="rating_R15">R-15</option><option class="rating_R18">R-18</option><option class="rating_R18G">R-18G</option></select></div>'),
        dataURL: boardDataUrl
    });


    fileList[fileList.length - 1].el.find('.yuki_clickable').on("click", (function(data){
        return function(e){
            var idx = fileList.indexOf(data);
            data.el.remove();
            delete fileList[idx];
            fileList.splice(idx, 1)

        }
    }(fileList[fileList.length - 1])) )

    $('#files_placeholder').append(fileList[fileList.length - 1].el);

    return true;
}

var yukiAttachCapcha = function(el){
    if(fileList.length >= 5){
            alert('Пять файлов это максимум на Доброчане.');
            return false;
    }

    var img = $(el).parent().find('img')[0];
    if(img.nodeName.toLowerCase() === 'img'){
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");

        f = {"name": 'talking_captcha.png', "size": dataURL.length * 6 / 8, "type": 'image/png'};

        fileList.push({
            file: f,
            renamed: false,
            f_name: 'talking_captcha.png',
            jpegStripped: true,
            el:   $('<div class="yukiFile"><span class="yuki_clickable">[убрать]</span><br/><img src="'+dataURL+'"/><br/><span class="file_name">'+
                escape(f.name)+'</span><br/><span class="file_name">'+
                bytesMagnitude(f.size)+'&nbsp;</span><select name="file_1_rating" class="rating_SFW" onchange=\'$(this).attr("class", "").addClass("rating_" + $(this).children(":selected").val().replace("-",""));\'><option class="rating_SFW">SFW</option><option class="rating_R15">R-15</option><option class="rating_R18">R-18</option><option class="rating_R18G">R-18G</option></select></div>'),
            dataURL: dataURL
        });


        fileList[fileList.length - 1].el.find('.yuki_clickable').on("click", (function(data){
            return function(e){
                var idx = fileList.indexOf(data);
                data.el.remove();
                delete fileList[idx];
                fileList.splice(idx, 1)

            }
        }(fileList[fileList.length - 1])) )

        $('#files_placeholder').append(fileList[fileList.length - 1].el);
    }
    return true;
}


var supports_html5_storagefunction = function() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

var yukiGetLocalStorageValue = function(name, deflt){
    if(supports_html5_storagefunction() && name in localStorage){
        var v = localStorage.getItem(name);
        if(v == 'false'){
            v = false;
        }
        if(v == 'true'){
            v = true;
        }
        return v;
    }else{
        return deflt;
    }
}

var yukiSetLocalStorageValue = function(name, value){
    if(supports_html5_storagefunction()){
        localStorage.setItem(name, value);
        return true;
    }else{
        return false;
    }
}

var yukiSetNewOptions = function(el){
    if($(el).attr('id') == 'yukiAutoloadOption'){
        yukiAutoupdateThread = el.checked;
        yukiSetLocalStorageValue('yukiautoupdatethread', yukiAutoupdateThread);
    }
    if($(el).attr('id') == 'yukiAutoloadPeriod'){
        threadUpdateTimer = $(el).val();
        yukiSetLocalStorageValue('yukithreadupdatetime', threadUpdateTimer);
    }
    
    if($(el).attr('id') == 'yukiRemoveExif'){
        yukiRemoveExif = el.checked;
        yukiSetLocalStorageValue('yukiRemoveExif', yukiRemoveExif);
    }
    if($(el).attr('id') == 'yukiRemoveFileName'){
        yukiRemoveFileName = el.checked;
        yukiSetLocalStorageValue('yukiRemoveFileName', yukiRemoveFileName);
    }    
}

var yukiScrolToNew = function(){
    if($('.yukiSaysPostNew').length > 0){
        var el = $($('.yukiSaysPostNew')[0]);
        $('html,body').animate({scrollTop: el.offset().top}, 1000, null, function(){            
            setTimeout(function(){
                el.trigger( "mouseleave" );
            }, 1000);
        });
    }
}

function checkEnter(e){
    e = e || event;
    return (e.keyCode || e.which || e.charCode || 0) !== 13;
}

;(function(){
    'use strict';

    $('<style type="text/css"> pre {white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;} .reply_ {height: 16px;display: inline-block;vertical-align: bottom;} .reply, .post-error, .popup {border-radius: 5px;} .yuki_ytholder {float: left;} .yukiSaysPostDeleted {opacity: .5;} .yukiSaysPostDeleted:hover {opacity: 1;} .yukiSaysPostNew {background: #ee9;} .yuki_clickable { cursor: pointer; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: -moz-none; -ms-user-select: none; user-select: none; } .yukiFile { text-align: center; font-size: 66%; display: inline-block; width: 210px; background: #eee; border-radius: 5px; margin: 5px; border: 1px solid #ccc; } #files_placeholder > * { vertical-align: top; } .yukiFile img { max-width: 200px; max-height: 200px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); margin: 5px 0; } .yukiFile span { max-width: 200px; word-wrap: break-word; } .rating_SFW { background: green; } .rating_R15 { background: yellow; } .rating_R18 { background: orange; } .rating_R18G { background: red; } .de-ytube-link:before {content:"";background:url(https://youtube.com/favicon.ico) no-repeat center;margin:0 4px;padding:0 16px 0 0;} </style>').appendTo("head");

    Hanabira.URL = ParseUrl();

    threadUpdateTimer = yukiGetLocalStorageValue('yukithreadupdatetime', threadUpdateTimer);
    yukiAutoupdateThread = yukiGetLocalStorageValue('yukiautoupdatethread', yukiAutoupdateThread);
    yukiRemoveExif = yukiGetLocalStorageValue('yukiRemoveExif', yukiRemoveExif);
    yukiRemoveFileName = yukiGetLocalStorageValue('yukiRemoveFileName', yukiRemoveFileName);

    if(Hanabira.URL.thread){
        originalThreadTitle = Hanabira.URL.board + '/ ' + document.title.match(/.+—\s.+—\s(.+)/)[1];
        document.title = originalThreadTitle;

        $('div.thread').append($('<br clear="left"><form><label><input type="checkbox" id="yukiAutoloadOption" onchange="yukiSetNewOptions(this);"'+(yukiAutoupdateThread? ' checked': '')+'> Подгружать новые посты</label> каждые <input size="4" maxlength="4" value="60" type="text" id="yukiAutoloadPeriod" onkeypress = "checkEnter()" onchange="yukiSetNewOptions(this);">(сек) <span>[<a href="#" id="yukiForceUpdate" onclick="yukiPleaseCheckUpdates(true); return false;">Обновить сейчас</a>]</span></form>'));
        $('#yukiAutoloadPeriod').val(threadUpdateTimer);
        $('<style type="text/css"> div.thread{counter-reset: pstcnt 1;} .replypost:not(.yukiSaysPostDeleted) .cpanel:after{counter-increment: pstcnt;content: counter(pstcnt);margin-right:4px;vertical-align:1px;color:#090;font:bold 11px tahoma;cursor:default;} .replypost:nth-child(n+500) .cpanel:after{color: #900;}  </style>').appendTo("head");

        $('html').append('<div id="yukiScrollToNew" class="yuki_clickable" style="background: #ddd;border: 1px solid #ccc;border-radius: 5px;position: fixed;bottom: 10px;right: 20px;box-shadow: 0 0 10px rgba(0,0,0,0.5);padding: 3px;font-size: 10px;">[к новому посту]</div>');
        $('#yukiScrollToNew').click(yukiScrolToNew);

    }

    yukiPleaseReplyLinks2();

    $('div.oppost .abbrev a').each(function(){
        var te = $(this);
        var oldOnClick = te.attr('onclick');
        if(oldOnClick){
            te.off('onclick');
            te.attr('onclick', oldOnClick.replace('ExpandThread', 'yukiPleaseExpandThread'));
        }
    });

    var icon = document.createElement('canvas');
    icon.width = 16;
    icon.height = 16;

    emptyIconData = icon.toDataURL("image/png");

    var favicon = document.createElement('img');
    favicon.src = '/favicon.ico';
    favicon.onload = function(){
            icon.getContext('2d').drawImage(favicon, 0, 0);
            dobrochanIconData = icon.toDataURL("image/png");
            $('link[rel="icon"]').remove();
            yukiPleasSetFavicon(dobrochanIconData);
    }


    setInterval(function(){
        if(window.document.hidden || window.document.webkitHidden) {
            yukiSaysWeFocused = false;
            if(numOfNewPosts != 0){
                if($('link[rel="shortcut icon"]').attr('href') == dobrochanIconData){
                    yukiPleasSetFavicon(emptyIconData);
                }else{
                    yukiPleasSetFavicon(dobrochanIconData);
                }
            }else if($('link[rel="shortcut icon"]').attr('href') != dobrochanIconData){
                yukiPleasSetFavicon(dobrochanIconData);
            }
        } else if($('link[rel="shortcut icon"]').attr('href') != dobrochanIconData){
            yukiPleasSetFavicon(dobrochanIconData);
            yukiSaysWeFocused = true;
        }
    }, 500);

    if(Hanabira.URL.thread){
        setTimeout(yukiPleaseCheckUpdates, threadUpdateTimer * 1000);       
    }

}());
