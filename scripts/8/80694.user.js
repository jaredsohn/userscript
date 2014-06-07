// ==UserScript==
// @name           JSExtractContent_Sample
// @namespace      http://tax4.blog115.fc2.com/
// @include        http://*
// ==/UserScript==
/*
 * Author :yamadatarou0123(http://tax4.blog115.fc2.com/)
 * License:BSD
 * Thanks :Ruby向けのモジュール"Extract Content"を
 *         JavaScriptで使えるようにしたものです。
 *         オリジナルの"Extract Content"の著作権などについては
 *         下記のコメントを参照ください。
 */

/*******Original Module(for Ruby)****************
 # Author:: Nakatani Shuyo
 # Copyright:: (c)2007 Cybozu Labs Inc. All rights reserved.
 # License:: BSD
 # Extract Content Module for html
 # ExtractContent : 本文抽出モジュール
 #
 # 与えられた html テキストから本文と思わしきテキストを抽出します。
 # - html をブロックに分離、スコアの低いブロックを除外
 # - 評価の高い連続ブロックをクラスタ化し、クラスタ間でさらに比較を行う
 # - スコアは配置、テキスト長、アフィリエイトリンク、フッタ等に特有のキーワードが含まれているかによって決定
 # - Google AdSense Section Target ブロックには本文が記述されているとし、特に抽出
**********************************************************/


var ExtractContent = {
  _utf8length:function(s){
    var res = s.length * 2;
    for(var i = s.length-1; i >= 0;i--) {
      var num = s.charCodeAt(i);
      if(num  > 0x7ff && (num < 0xd800 || num > 0xdfff)) {
        res++;
      } else if(num < 0x80) {
        res--;
      }
    }
    return res;
  },
  _default:{
    threshold: 100,
    min_length: 80,
    decay_factor: 0.73,
    continuous_factor: 1.62,
    punctuation_weight: 10,
    punctuations: /([\u3001\u3002\uFF0C\uFF0E\uFF01\uFF1F]|\.[^A-Za-z0-9]|,[^0-9]|\!|\?)/g,
    waste_expressions: /Copyright|All Rights Reserved/gi,
    debug: false
  },
  
  _CHARREF: {
    "&nbsp;": " ",
    "&lt;":    "<",
    "&gt;":    ">",
    "&amp;":   "&",
    "&laquo;": "\u226A",
    "&raquo;": "\u226B"
  },
  
  set_default:function(opt){
    for(var i in opt){
      this._default[i] = opt[i];
    }
  },
  
  analyze:function(html, opt){
    var me = this;
    if(!opt){
      opt = {};
    }
    // frameset or redirect
    if(html.match(/<\/frameset>|<meta\s+http-equiv\s*=\s*["']?refresh['"]?[^>]*url/i)){
      return ["", this.extract_title(html)];
    }

    // option parameters
    for(var i in this._default){
      if(opt[i]==undefined){
        opt[i] = this._default[i];
      }
    }
    
    var threshold = opt["threshold"];
    var min_length = opt["min_length"];
    var decay_factor = opt["decay_factor"];
    var continuous_factor = opt["continuous_factor"];
    var punctuation_weight = opt["punctuation_weight"];
    var punctuations = opt["punctuations"];
    var waste_expressions = opt["waste_expressions"];
    var debug = opt["debug"];
    // header & title
    var title = (function(){
      if(html.match(/<\/head\s*>/i)){
        html = RegExp.rightContext;
        return me.extract_title(RegExp.leftContext);
      }
      else{
        return me.extract_title(html);
      }
    })();

    // Google AdSense Section Target
    html = html.replace(/<!--\s*google_ad_section_start\(weight=ignore\)\s*-->(?:.|\n)*?<!--\s*google_ad_section_end.*?-->/g, "");
    if(html.match(/<!--\s*google_ad_section_start[^>]*-->/)){
      html = html.match(/<!--\s*google_ad_section_start[^>]*-->(?:.|\n)*?<!--\s*google_ad_section_end(?:.|\n)*?-->/g).join("\n");
    }

    // eliminate useless text
    html = this.eliminate_useless_tags(html);

    // h? block including title
    html = html.replace(
      /(<h\d\s*>\s*((?:.|\n)*?)\s*<\/h\d\s*>)/ig,
      function(a,s1,s2,offset, allDoc){
        if(s2 && me._utf8length(s2) >=3 && title.indexOf(s2,0) > 0){
          return "<div>"+s2+"</div>";
        }
        else{
          return s1;
        };
      }
    );

    // extract text blocks
    var factor , continuous;
    factor = continuous  = 1.0;
    
    var body = "";
    var score = 0;
    var bodylist = [];
    var list = html.split(/<\/?(?:div|center|td)[^>]*>|<p\s*[^>]*class\s*=\s*["']?(?:posted|plugin-\w+)['"]?[^>]*>/);
    for(var i = 0,len=list.length; i < len; i++){

      var block = list[i];
      if(!block){ continue;};
      
      block = block.replace(/^[\t\r\n\f\v]+/,"").replace(/[\t\r\n\f\v]+$/,"");
      if(this.has_only_tags(block)){continue;}
      if(this._utf8length(body) > 0){
        continuous /= continuous_factor ;
      }

      // リンク除外＆リンクリスト判定
      var notlinked = this.eliminate_link(block);
      var notlinked_length = this._utf8length(notlinked);
      if(notlinked_length < min_length){ continue; }

      // スコア算出

      var scan_cnt = function(targetStr, reg){
        var ps = targetStr.match(reg);
        return ps?ps.length:0;
      };
      
      var c = (notlinked_length + scan_cnt(notlinked, punctuations) * punctuation_weight) * factor;
      factor *= decay_factor;
      var not_body_rate = scan_cnt(block,waste_expressions) + scan_cnt(block,/amazon[a-z0-9\.\/\-\?&]+-22/gi) / 2.0;
      if(not_body_rate > 0){
        c *= Math.pow(0.72 , not_body_rate) ;
      }
      
      var c1 = c * continuous;
      if(debug){
          console.log( i+"----- "+c+"*"+continuous+"="+c1+" "+notlinked_length);
          console.log( this.strip_tags(block).substr(0,20));
      }
      // ブロック抽出＆スコア加算
      if(c1 > threshold){
        body += block + "\n";
        score += c1;
        continuous = continuous_factor;
      }
      else{
        if( c > threshold ) {
          // continuous block end
          bodylist.push( [body, score]);
          body = block + "\n";
          score = c;
          continuous = continuous_factor;
        }
      }
    }

    bodylist.push([body, score]);
    body = (function(){
      var max_x = null;
      if(bodylist.length> 0){
        max_x = bodylist[0];
      }
      else {
        return null;
      }
      
      for(i = 1; i <bodylist.length; i++){
        var b = bodylist[i];
        if(max_x[1]< b[1]){
          max_x = b;
        }
      }
      return max_x;
    })();
    return [this.strip_tags(body?body[0]:""), title];
  },

  // Extracts title.
  extract_title : function(st){
    if(st.match(/<title[^>]*>\s*(.*?)\s*<\/title\s*>/i)){
      return this.strip_tags(RegExp.$1);
    }
    else{
      return "";
    }
  },
  
  // Eliminates useless tags
  eliminate_useless_tags: function(html){
    // eliminate useless symbols
    html = 
      html.replace(/[\u2018-\u201d\u2190-\u2193\u25A0-\u2606]/g,"");
    // eliminate useless html tags
    html = 
      html.replace(/<(script|style|select|noscript)[^>]*>(?:.|\n)*?<\/\1\s*>/img, '');
    html = html.replace(/<!--(?:.|\n)*?-->/mg, '');
    html = html.replace(/<![A-Za-z].*?>/g, '');
    html = html.replace(/<div\s[^>]*class\s*=\s*['"]?alpslab-slide["']?[^>]*>(?:.|\n)*?<\/div\s*>/img, '');
    html = html.replace(/<div\s[^>]*(id|class)\s*=\s*['"]?\S*more\S*["']?[^>]*>/img, '');

    return html;
  },

  // Checks if the given block has only tags without text.
  has_only_tags: function(st){
    var resstr = 
      st.replace(/<[^>]*>/img, "").replace(/&nbsp;/g,"").replace(/\s/g,"");
    return this._utf8length(resstr) == 0;
  },
  // リンク除外＆リンクリスト判定
  eliminate_link:function(html){
    var count = 0;
    var notlinked 
      = html.replace(/<a\s[^>]*>(?:.|\n)*?<\/a\s*>/img,function(){
        count += 1;
        return "";
      });
      
    notlinked = notlinked.replace(/<form\s[^>]*>(?:.|\n)*?<\/form\s*>/img, "");
    notlinked = this.strip_tags(notlinked);
    if(this._utf8length(notlinked) < 20 * count || this.islinklist(html)){
      return "";
    }
    else{
      return notlinked;
    }
  },
  
  // リンクリスト判定
  // リストであれば非本文として除外する
  islinklist: function(st){
    if(st.match(/<(?:ul|dl|ol)((?:.|\n)+?)<\/(?:ul|dl|ol)>/im)){
      var listpart = RegExp.$1;
      var outside = st.replace(/<(?:ul|dl)((?:.|\n)+?)<\/(?:ul|dl)>/img, "").replace(/<(?:.|\n)+?>/mg, "").replace(/\s+/, " ");
      var list = listpart.split(/<li[^>]*>/);
      list.shift();
      var rate = this.evaluate_list(list);
      return this._utf8length(outside) <= this._utf8length(st) / (45 / rate);
    }
    else{
      return false;
    }
  },
  
  // リンクリストらしさを評価
  evaluate_list:function(list){
    if(list.length==0){
      return 1;
    }
    else{
    }
    var hit = 0;
    for(var i =0, len = list.length; i < len; i++){
      var line = list[i];
      if(line.match(/<a\s+href=(['"]?)([^"'\s]+)\1/im)){
        hit +=1;
      }
    }
    return 9 * Math.pow((1.0 * hit / list.length), 2) + 1;
  },

  // Strips tags from html.
  strip_tags: function(html){
    var st = html.replace(/<(?:.|\n)+?>/mg, "");
    // Convert from wide character to ascii
    st = 
    st.replace(/[\uFF01-\uFF3A\uFF3C\uFF3E-\uFF5D]/g,function(x){
        return String.fromCharCode(x.charCodeAt(0) - 0xfee0);
      }).replace(/[\u2500-\u257f]/g,"").replace(/\u3000/g, " ");
    for(var i in this._CHARREF){
      var reg = new RegExp(i,"ig");
      st = st.replace(reg,this._CHARREF[i]);
    };
    st = st.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
    st = st.replace(/[ \t]+/g, " ").replace(/\n\s*/g, "\n");
    return st;
  }
};

//====ここからは使用例です=====
//解析
var source = document.getElementsByTagName("html")[0].innerHTML;
var source_ver2 = source.replace(/\r\n/g,"\n").replace(/<\/?br\/?>/g,"\n");
var analyzed = ExtractContent.analyze(source_ver2);
//analyzed[0]･･･本文,analyzed[0]･･･タイトル

//解析結果表示
var d = document.createElement("div");
var pre = document.createElement("pre");
pre.textContent = analyzed[1]+"\n#\n"+analyzed[0];
pre.style.textAlign = "left";
d.style.backgroundColor = pre.style.backgroundColor = "pink";
d.appendChild(pre);
document.body.insertBefore(pre,document.body.firstChild);
