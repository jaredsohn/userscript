// ==UserScript==
// @name       JL&U Hacks
// @namespace    stackexchange
// @description  JL&U Hacks
// @include    http://*japanese.stackexchange.com/*
// ==/UserScript==

(function () {
  var start = function () {
    //add menu
    if (!$("#upopup").length){
      $("#footer-menu").prepend(
        '<a onclick="$(\'#upopup\').toggle()">options</a>'+
        '<div id="upopup" style="color:black;position:absolute;display:none;background-color:#fff;border:1px solid #ccc;margin-top:3px;padding:5px;z-index:500;box-shadow:1px 1px 2px rgba(0,0,0,0.2);"/> |'
      );
    }
    //add options box
    $("#upopup").append(
    '<div>'+
      '<h4>ruby mode</h4>' +
        '<input type="radio" name="urubymode" value=1> strict → [漢字]{かんじ}</input><br>' +
        '<input type="radio" name="urubymode" value=2 checked> recommended → + 漢字{かんじ}, 漢字【かんじ】</input><br>' +
        '<input type="radio" name="urubymode" value=3> extended → + 漢字(かんじ), 漢字[かんじ] and some more</input><br>' +
      '<h4>other options</h4>' +
        '<input type="checkbox" id="uhideruby"> hide ruby texts, only show when hover on kanji</input><br>' +
        '<input type="checkbox" id="uhideromaji"> hide rōmaji ruby texts </input><br>' +
      '<h4>ruby transformation (not working yet)</h4>' +
        '<input type="radio" name="utransruby" value=1 checked> as is </input>' +
        '<input type="radio" name="utransruby" value=1 disabled> rōmaji </input>' +
        '<input type="radio" name="utransruby" value=1 disabled> ひらがな </input>' +
        '<input type="radio" name="utransruby" value=1 disabled> カタカナ </input><br>' +
        '<input type="button" id="usave" value="save and reload"/> <input type="button" onclick="$(\'#upopup\').hide()" value="close"/>' +
    '</div>'
     ).find("a,input").css({ 'color': '#00f', 'text-shadow': 'none', 'vertical-align': 'middle', 'font-weight': 'normal' });
    //load settings
    localStorage["urubymode"] ? $("input[name=urubymode]").val([localStorage["urubymode"]]) : localStorage["urubymode"] = 2;
    if (localStorage["uhideruby"] == 1)
      $("#uhideruby").attr("checked", true);
    if (localStorage["uhideromaji"] == 1)
      $("#uhideromaji").attr("checked", true);
    //save settings
    $("#usave").click(function () {
      localStorage["urubymode"] = $("input[name=urubymode]:checked").val();
      localStorage["uhideruby"] = $("#uhideruby").attr("checked") ? 1 : 0;
      localStorage["uhideromaji"] = $("#uhideromaji").attr("checked") ? 1 : 0;
      location.reload();
    });
    //add css for non Chrome & IE
    if (!/Chrome|IE/.test(navigator.userAgent)) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = 'ruby{display:inline-table;text-align:center;text-indent:0;white-space:nowrap;margin:0;padding:0;line-height:1;height:1em;vertical-align:text-bottom;border:none;}' +
        'rb{display:table-row-group;line-height:1;text-align:center;border:none;margin:0;padding:0;white-space:nowrap;}' +
        'rt{display:table-header-group;font-size:0.75em;line-height:1.1;text-align:center;white-space:nowrap;border:none;margin:0;padding:0;}';
      document.getElementsByTagName('head')[0].appendChild(style);
    };
    //ruby mode regexes
    var replaces = [
      /(?:&#91;|\[)([^\]]+)\]\{([^}]+)\}/g,
      /(?:&#91;|\[)([^\]]+)\]\{([^}]+)\}|([\u4e00-\ufeed][\u4e00-\ufeed\u3041-\u30fe]*)\s*[{\u3010]([.\u3001\u3002\u3041-\u30fe\uff0d-\uff0f\uff61]+)[}\u3011]|([\u3041-\u30fe]+)\s*[{\u3010]([a-zA-Z\u0101-\u014d' ]+)[}\u3011]/g,
      /(?:&#91;|\[)([^\]]+)\]\{([^}]+)\}|(?:&#91;|&quot;|&ldquo;|["\u201c\[])?([\u4e00-\ufeed][\u4e00-\ufeed\u3041-\u30fe]*)(?:&#91;|&quot;|&rdquo;|["\u201d\]])?\s*[\[{(\uff08\uff5b\u3008-\u301a]([.\u3001\u3002\u3041-\u30fe\uff0d-\uff0f\uff61]+)[\]})\uff09\uff5c\uff5d\u3009-\u301b]|(?:&#91;|&quot;|&ldquo;|["\u201c\[])?([\u3041-\u30fe]+)(?:&#91;|&quot;|&rdquo;|["\u201d\]])?\s*[\[{(\uff08\uff5b\u3008-\u301a]([a-zA-Z\u0101-\u014d' ]+)[\]})\uff09\uff5c\uff5d\u3009-\u301b]/g
    ][localStorage["urubymode"] - 1],
    cache = [],
    rubyize = function(kanji, furigana){
      return '<ruby><rb>' + kanji + '</rb><rt>' + furigana + '</rt></ruby>';
    },
    parse = function () {
      $("span,code,p,li,b,i,a,em,strong")
      .contents()
      .filter(function () {
        return (this.nodeType == 3 || this.nodeType == 1) && /[\u3000-\ufeed]/.test(this.data);
      })
      .each(function () {
        for (var i = 0; i < cache.length; i++)
          if (cache[i] == this) return;
          var data_escaped = this.data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          var data = data_escaped.replace(replaces, function ($0, $1, $2, $3, $4, $5, $6, $7, $8) {
          var kanji = $1 || $3 || $5 || $7, furigana = $2 || $4 || $6 || $8;
          if (localStorage["uhideromaji"] == 1 && /^[a-zA-Z\u0101-\u014d' ]+$/.test(furigana))
            furigana = "";
          if (localStorage["uhideruby"] == 1)
            return '<span title="' + furigana + '">' + kanji + '</span>';
          var kanjis = kanji.split(''), furiganas = furigana.split(/[.\u3001\u3002\u30fb\uff0d-\uff0f\uff61]/);
          if (kanjis.length == furiganas.length){
            return $.map(kanjis, function(k, i){
              return rubyize(k,furiganas[i]);
            }).join('');
          }
          return rubyize(kanji, furigana);
        });
        if (data != data_escaped)
          $(this).replaceWith(data);
        cache.push(this);
      });
    };
    parse();
    setInterval(parse, 400);
  };

  if (window.$ && $("#footer-menu").length) {
    start();
    $("#upopup").css('top', $("#footer-menu").offset().top - $("#upopup").height() - 10);
  } else {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + start + ")();";
    document.getElementsByTagName("head")[0].appendChild(script);
  };
})();