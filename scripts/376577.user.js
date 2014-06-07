// ==UserScript==
// @name           leprarender
// @namespace      http://userscripts.org/scripts/show/376577
// @homepage       http://userscripts.org/scripts/show/376577
// @include        http://leprosorium.ru/*
// @exclude        http://leprosorium.ru/my/inbox/*
// @description    trash script for local purposes do not use
// @updateURL      https://userscripts.org/scripts/source/376577.meta.js
// @downloadURL    https://userscripts.org/scripts/source/376577.user.js
// @version        0.8
// ==/UserScript==


(function() {
	addJQuery(main);
})();

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main(){
    
    function initLeprace(){
    
      var addWord = function(index, data){
        var from = $("td.fow_word", data).text();
        var to = $("td.fow_to_word", data).text();
        replacements.push([from, to]);
      }
    
    
      var loadReplacementsPage = function(page){
        var url = "http://leprosorium.ru/fraud/textomate/" + page;
        $.get(url, parseReplacements);
      }
    
    
      var parseReplacements = function(data){
        $("table.fraud_one_word", data).each(addWord);
    
        updatePreview();
    
        $("script:not([src])", data).each(function(index, data){
          var match = $(data).text().match(/pag = new Paginator\('paginator', (\d+), \d+, (\d+)/);
          if(match){
            pagesTotal = Number(match[1]);
            currentPage = Number(match[2]);
            if(currentPage < pagesTotal) loadReplacementsPage(currentPage + 1);
            return;
          }
        });
      }
    
    
    
      var applyReplacements = function(text, tags){
        var r;
        for(var i = replacements.length - 1; i >= 0; i--){
          r = replacements[i];
          text = text.split(r[0]).join(r[1]);
        };
        return text;
      }
    
    
    
      var buildEmptyTag = function(tagname){
        return "<" + tagname + "></" + tagname + ">";
      }
    
    
    
      var makeSafe = function(text, tags){
        var availableTags = "i,b,u,a,sub,sup,irony,spoiler".split(",");
        for(var i = 0; i < availableTags.length; i++){
          if(tags.indexOf(availableTags[i]) == -1){
            return text[0] + buildEmptyTag(availableTags[i]) + text.substr(1);
          }
        }
        return text[0] + buildEmptyTag("i") + text.substr(1);
      }
    
    
    
      var preventReplacements = function(text, tags){
        var from, to;
        var prevented = false;
        while(!prevented){
          prevented = true;
          for(var i = replacements.length - 1; i >= 0; i--){
            from = replacements[i][0];
            if(text.indexOf(from) >= 0){
              to = makeSafe(from, tags);
              text = text.replace(from, to);
              prevented = false;
              break;
            }
          };
        };
        return text;
      }
    
    
      var process = function(text, proc){
        var texts = [];
        var tags = [];
        var tagRegexp = /<\/?(u|i|a|b|br|sup|sub|span|spoiler|irony|img|ninja|panda|rage|fury|jarost|lopata)( \S+)*>/;
        var pos, match, i;
        var openTags = [];
        var tagSets = [''];
    
        var handleTag = function(tag){
          var tagname = tag.match(/\w+/)[0];
          var open = tag.charAt(1) != '/';
          var lastTag = openTags[openTags.length - 1];
          if(open){
            if(lastTag != tagname) openTags.push(tagname);
          } else {
            for (var i = openTags.length - 1; i >= 0; i--){
              if(openTags[i] == tagname){
                openTags.splice(i, 1);
                break;
              }
            }
          }
        }
    
    
        while((pos = text.search(tagRegexp)) >= 0) {
          texts.push(text.substr(0, pos));
          match = text.match(tagRegexp)[0];
          tags.push(match);
          handleTag(match);
          tagSets.push(openTags.join(','));
          text = text.substr(pos + match.length);
        }
    
        texts.push(text);
    
        for(i = 0; i < texts.length; i++){
          texts[i] = proc(texts[i], tagSets[i]);
        }
    
        text = '';
        for(i = 0; i < tags.length; i++){
          text += texts[i] + tags[i];
        }
        text += texts[texts.length - 1];
        return text;
      }
    
    
    
    
      var escapeSymbols = function(text){
        return text.split('<').join('&lt;');
      };
    
    
    
      var updatePreview = function(){
        var panda = "<img src='http://img.dirty.ru/lepro/panda.gif'>";
        var ninja = "<img src='http://img.dirty.ru/pics/ninja.gif'>";
        var text = process(textarea.val(), applyReplacements);
        text = text.split("\n").join("<br>");
        text = text.split("<irony>").join("<span class='irony'>").split("</irony>").join("</span>");
        text = text.split("<spoiler>").join("<span class='spoiler'><span class='inner_spoiler'>").split("</spoiler>").join("</span></span>");
        text = text.split(/<panda *\/?>/).join(panda);
        text = text.split(/<rage *\/?>/).join(panda);
        text = text.split(/<fury *\/?>/).join(panda);
        text = text.split(/<jarost *\/?>/).join(panda);
        text = text.split(/<ninja *\/?>/).join(ninja);
        text = process(text, escapeSymbols);
        preview.html(text);
      }
    
    
    
      var togglePreview = function(){
        if(preview.is(":hidden")){
          preview.slideDown("fast");
          togglePreviewLink.text("Скрыть предпросмотр");
        } else {
          preview.slideUp("fast");
          togglePreviewLink.text("Показать предпросмотр");
        }
        return false;
      }
    
    
    
      var fixText = function(){
        textarea.val(process(textarea.val(), preventReplacements));
        updatePreview();
        return false;
      }
    
    
      var $, jQuery, preview, replacements, togglePreviewLink, textarea;
    
    
      (function(){
        $ = window.jQ;
        jQuery = window.jQ;
    
        togglePreviewLink = $("<a href=''></a>");
        togglePreviewLink.css('border-bottom', '1px dashed');
        togglePreviewLink.css('text-decoration', 'none');
        togglePreviewLink.click(togglePreview);
    
        var fix = $("<a href=''>Антизамены</a>");
        fix.css('border-bottom', '1px dashed');
        fix.css('text-decoration', 'none');
        fix.click(fixText);
    
        var header = $("<div/>");
        header.css('font-size', '10px');
        header.css('margin-bottom', '0.5em');
        header.append(togglePreviewLink);
        header.append(' | ');
        header.append(fix);
    
        preview = $("<div></div>");
        preview.css('font-size', '13px');
        preview.css('margin-bottom', '0.5em');
        preview.css('color', '#000');
        preview.hide();
    
        togglePreview();
    
        textarea = $("#comment_textarea");
        textarea.parent().prepend(header, preview);
        textarea.on('input propertychange', updatePreview);
    
        replacements = [];
    
        diprf = displayInPlaceReplyForm;
        displayInPlaceReplyForm = function(replyLink, userLink){
          diprf(replyLink, userLink);
          updatePreview();
          return false;
        }
    
        var getN = function(pattern, element, defaultN){
            var result = defaultN;
            if(element instanceof jQuery && element.length>0 && element.is('[class]')){
                $(element.attr('class').split(/\s+/)).each(function(i){
                    if(this.indexOf(pattern)!=-1) {
                        var last = $(this.split(pattern)).last()[0];
                        if ($.isNumeric(last)) result = parseInt(last);
                        return false;
                    }
                });
            }
            return result;
        };
    
        loadReplacementsPage(1);
          
          jQuery('span .filter').each(function(){
              jQuery(this).on('click', function(){
                  jQuery('.post.tree:visible').each(function(){
                      if(!jQuery(this).hasClass('indent_0')){
              			  //console.log(this);
                          var indent = getN('indent_', $(this), 99);
                          var prev = jQuery(this).prev();
                          var stop = false;
                          while(prev.css('display')=='none' && !stop){
                              stop = prev.hasClass('indent_0');
                              if(getN('indent_', prev, 99)<=indent){
                                  prev.show();
                              	  //console.log('getN', getN('indent_', prev, 99));
                                  //console.log(prev[0]);
                              }
                              prev = prev.prev();
                          }
                      }
                  });
              });
          });
          
      })();
    };
    if(window.jQ) initLeprace();
    else addJQuery(initLeprace);
}