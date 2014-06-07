// ==UserScript==
// @name           Pulipuli YouTube Downloader
// @namespace      http://www.youtube.com/
// @include        http://www.youtube.com/watch?v=*
// @version        1.0.0
// ==/UserScript==

(function (d, func) {
    var h = d.getElementsByTagName('head')[0];
    var s1 = d.createElement("script");
    s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
    s1.addEventListener('load', function() {
        var s2 = d.createElement("script");
        s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
        h.appendChild(s2);
    }, false);
    h.appendChild(s1);
})(document, function($) {
    // ここにメインの処理を書く
    //$('#button').click(function(){
    //    alert('clicked!');
    //});
    
var fmt_str = new Array();
fmt_str[0]  = '(FLV, 320 x 240, Mono 22KHz MP3)'; // delete ?
fmt_str[5]  = '(FLV, 400 x 240, Mono 44KHz MP3)';
fmt_str[6]  = '(FLV, 480 x 360, Mono 44KHz MP3)'; // delete ?
fmt_str[34] = '(FLV, 640 x 360, Stereo 44KHz AAC)';
fmt_str[35] = '(FLV, 854 x 480, Stereo 44KHz AAC)';

fmt_str[13] = '(3GP, 176 x 144, Stereo 8KHz)';    // delete ?
fmt_str[17] = '(3GP, 176 x 144, Stereo 44KHz AAC)';
fmt_str[36] = '(3GP, 320 x 240, Stereo 44KHz AAC)';

fmt_str[18] = '(MP4(H.264), 640 x 360, Stereo 44KHz AAC)';
fmt_str[22] = '(MP4(H.264), 1280 x 720, Stereo 44KHz AAC)';
fmt_str[37] = '(MP4(H.264), 1920 x 1080, Stereo 44KHz AAC)';
fmt_str[38] = '(MP4(H.264), 4096 x 3072, Stereo 44KHz AAC)';
fmt_str[83] = '(MP4(H.264), 854 x 240, Stereo 44KHz AAC)';
fmt_str[82] = '(MP4(H.264), 640 x 360, Stereo 44KHz AAC)';
fmt_str[85] = '(MP4(H.264), 1920 x 520, Stereo 44KHz AAC)';
fmt_str[84] = '(MP4(H.264), 1280 x 720, Stereo 44KHz AAC)';

fmt_str[43] = '(WebM(VP8), 640 x 360, Stereo 44KHz Vorbis)';
fmt_str[44] = '(WebM(VP8), 854 x 480, Stereo 44KHz Vorbis)';
fmt_str[45] = '(WebM(VP8), 1280 x 720, Stereo 44KHz Vorbis)';
fmt_str[100] = '(WebM(VP8), 640 x 360, Stereo 44KHz Vorbis)';
fmt_str[101] = '(WebM(VP8), 854 x 480, Stereo 44KHz Vorbis)';
fmt_str[46] = '(WebM(VP8), 1920 x 540, Stereo 44KHz Vorbis)';
fmt_str[102] = '(WebM(VP8), 1280 x 720, Stereo 44KHz Vorbis)';

/*
function getYouTubeUrl(){
  var rdata = $('#videoInfo').val();
  var rdataArray = rdata.split('&');
  var succ = 0;
  for(i = 0; i < rdataArray.length; i++){
    r0 = rdataArray[i].substr(0, 11);
    if(r0 == 'fmt_url_map'){
      r1 = unescape(rdataArray[i].substr(12));
      var temp1 = r1.split(',');
      var fmt = new Array;
      var fmt_url = new Array;
      for(j = 0; j < temp1.length; j++){
        var temp2 = temp1[j].split('|');
        fmt.push(parseInt(temp2[0], 10));
        fmt_url.push(temp2[1]);
      }
      
      var dllinks = '';
      for(var k in fmt){
        if(dllinks.length > 0){
          dllinks += '<br />';
        }
        dllinks += '<a href="' + fmt_url[k] + '"><b>Download' + fmt_str[fmt[k]] + '</b></a>';
      }
      $('#result_div').remove();
      var div_dl = document.createElement('div');
      $(div_dl).html(dllinks).css('padding', '7 0 7px 0');
      $(div_dl).attr('id', 'result_div');
      $('#videoInfo').after(div_dl);
      succ = 1;
    }
  }
  if(succ == 0){
    var result;
    var rdata_status;
    var rdata_reason;
    var rdata_temp;
    for(i = 0; i < rdataArray.length; i++){
      rdata_temp = rdataArray[i].split('=');
      if(rdata_temp[0] == 'status'){
        rdata_status = rdata_temp[1];
      }
      if(rdata_temp[0] == 'reason'){
        rdata_reason = urldecode(rdata_temp[1]);
      }
    }
    result = '<b>&#28961;&#27861;&#21462;&#24471;&#24433;&#29255; URL</b><br />status : <span style="color:#f00;">' + rdata_status + '</span><br />' + 'reason : <span style="color:#f00;">' + rdata_reason + '</span>';
    $('#result_div').remove();
    var div_dl = document.createElement('div');
    $(div_dl).html(result).css('padding', '7 0 7px 0');
    $(div_dl).attr('id', 'result_div');
    $('#videoInfo').after(div_dl);
  }
}
*/

  var getYouTubeUrl = function(){
  var rdata = $('#videoInfo').val();
  var rdataArray = rdata.split('&');
  var succ = 0;
  for(i = 0; i < rdataArray.length; i++){
    r0 = rdataArray[i].substr(0, 26);
    if(r0 == 'url_encoded_fmt_stream_map'){
      r1 = unescape(rdataArray[i].substr(27));
      var temp1 = r1.split(',');
      var fmt = new Array;
      var fmt_url = new Array;
      var fmt_sig = new Array;
      for(j = 0; j < temp1.length; j++){
        /*
        temp1[j] = temp1[j].substr(4);
        var temp2 = temp1[j].split('&itag=');
        fmt.push(parseInt(temp2[1], 10));
        fmt_url.push(temp2[0]);
        */
        var temp2 = temp1[j].split('&');
        for(jj = 0; jj < temp2.length; jj++){
          var temp_itag = -1;
          var temp_type = '';
          if(temp2[jj].substr(0, 5) == 'itag='){
            temp_itag = parseInt(temp2[jj].substr(5), 10);
            fmt.push(temp_itag);
          }else if(temp2[jj].substr(0, 4) == 'url='){
            fmt_url.push(temp2[jj].substr(4));
          }else if(temp2[jj].substr(0, 4) == 'sig='){
            fmt_sig.push(temp2[jj].substr(4));
          }else if(temp2[jj].substr(0, 5) == 'type='){
            temp_type = '(' + unescape(temp2[jj].substr(5)) + ')';
          }
          
          if(fmt_str[temp_itag] == 'undefined'){
            fmt_str[temp_itag] = temp_type;
          }
        }
      }
      
      var dllinks = '';
      var webmlinks = '';
      for(var k in fmt){
        if(fmt[k] == 43 || fmt[k] == 44 || fmt[k] == 45 || fmt[k] == 46 || fmt[k] == 100 || fmt[k] == 101 || fmt[k] == 102){
          if(webmlinks.length > 0){
            webmlinks += '<br />';
          }          
          webmlinks += '<a href="' + unescape(fmt_url[k]) + "&signature=" + fmt_sig[k] + '" target="_blank"><b>Watch online&nbsp;&nbsp;&nbsp;' + fmt_str[fmt[k]] + '</b></a>';
        }else{
          if(dllinks.length > 0){
            dllinks += '<br />';
          }
          dllinks += '<a href="' + unescape(fmt_url[k]) + "&signature=" + fmt_sig[k] + '" target="_blank"><b>Download&nbsp;&nbsp;&nbsp;' + fmt_str[fmt[k]] + '</b></a>';
        }
      }
      if(webmlinks.length > 0){
        if(dllinks.length > 0){
          dllinks += '<br />';
        }
        dllinks += webmlinks;
      }
      
      $('#result_div').remove();
      var div_dl = document.createElement('div');
      $(div_dl).html(dllinks).css('padding', '7px 0 0 0');
      $(div_dl).attr('id', 'result_div');
      $('#videoInfo').after(div_dl);
      $('#downloadInfo').css('display', 'block');
      $(div_dl).css('text-align', 'left');
      succ = 1;
    }
  }
  if(succ == 0){
    var result;
    var rdata_status;
    var rdata_reason;
    var rdata_temp;
    for(i = 0; i < rdataArray.length; i++){
      rdata_temp = rdataArray[i].split('=');
      if(rdata_temp[0] == 'status'){
        rdata_status = rdata_temp[1];
      }
      if(rdata_temp[0] == 'reason'){
        rdata_reason = urldecode(rdata_temp[1]);
      }
    }
    result = '<b>&#28961;&#27861;&#21462;&#24471;&#24433;&#29255; URL</b><br />status : <span style="color:#f00;">' + rdata_status + '</span><br />' + 'reason : <span style="color:#f00;">' + rdata_reason + '</span>';
    $('#result_div').remove();
    var div_dl = document.createElement('div');
    $(div_dl).html(result).css('padding', '7 0 7px 0');
    $(div_dl).attr('id', 'result_div');
    $(div_dl).css('text-align', 'left');
    $('#videoInfo').after(div_dl);
  }
};

    var urldecode = function(str){
    // Decodes URL-encoded string  
    // 
    // version: 1004.2314
    // discuss at: http://phpjs.org/functions/urldecode    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous    // +   improved by: Orlando
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +      bugfixed by: Rob
    // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    // %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on    // %        note 2: pages served as UTF-8
    // *     example 1: urldecode('Kevin+van+Zonneveld%21');
    // *     returns 1: 'Kevin van Zonneveld!'
    // *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    // *     returns 2: 'http://kevin.vanzonneveld.net/'    // *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
    
    return decodeURIComponent(str.replace(/\+/g, '%20'));
};

    /**
     * 以下是正式文件的開始
     */
    

    var _log = function (_msg) {
        //console.log('[PULI] ' + _msg);
    };

    //配置按鈕
    var _trigger = $("<button class='yt-uix-pager-button yt-uix-pager-show-more yt-uix-button yt-uix-button-default' style='margin: 5px 0;display:block;'>" + "Get Download Link" + "</button>")
        //.appendTo($(".flash-player:first"));
        .insertAfter($("#player-api:first"));

    _log('插入按鈕');

    _trigger.click(function () {

      //http://www.youtube.com/get_video_info?video_id=p6BR6p2v9hs&eurl=http://kej.tw/
      //http://www.youtube.com/watch?v=RSRFY--5YOo
      var _link = location.href;
      var _header = "v=";
      var _pos_header = _link.indexOf(_header) + _header.length;
      var _footer = "&";
      var _pos_footer = _link.indexOf(_footer, _pos_header);
      if (_pos_footer == -1) {
          _link = _link.substr(_pos_header);
      }
      else {
          _link = _link.substr(_pos_header, _pos_footer);
      }
      _link = "http://www.youtube.com/get_video_info?video_id=" + _link + "&eurl=http://kej.tw/";

      var _video_info = $("<div></div>")
          .hide()
          .appendTo($("body"));

      _video_info.load(_link, function () {
          // 取得結果
          var _info = _video_info.text();

          // 貼在步驟三
          var _textarea = $("<textarea id='videoInfo'></textarea>")
              //.hide()
              .insertAfter(_trigger);
          $("#videoInfo").val(_info);
          
          // 送出
          //$("input[type='button']").click();
          getYouTubeUrl();

          $("#videoInfo").hide();
          //$("input[type='button']").hide();
      });

    }); //_trigger.click(function () {

    _log('trigger事件設置完畢');
});
