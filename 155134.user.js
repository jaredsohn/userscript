// ==UserScript==
// @name          "at" autocomplete for v2ex
// @namespace     http://theo.im
// @license       MIT License
// @author        timonwong
// @description   Weibo style @ autocomplete (poster and repliers) for v2ex.com
// @grant         none
// @include       http://*.v2ex.com/t/*
// @include       http://v2ex.com/t/*
// @version       0.7
// @updateURL     https://userscripts.org/scripts/source/155134.meta.js
// @downloadURL   https://userscripts.org/scripts/source/155134.user.js
// ==/UserScript==

(function() {
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//www.v2ex.com/static/js/jquery.js");
        script.addEventListener('load', function () {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    addJQuery(function() {
      /*
       * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
       * Author: Jim Palmer (based on chunking idea from Dave Koelle)
       */
      function naturalSort(a, b) {
        var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
          sre = /(^[ ]*|[ ]*$)/g,
          dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
          hre = /^0x[0-9a-f]+$/i,
          ore = /^0/,
          i = function(s) {
            return ('' + s).toLowerCase();
          },
          // convert all to strings strip whitespace
          x = i(a).replace(sre, '') || '',
          y = i(b).replace(sre, '') || '',
          // chunk/tokenize
          xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
          yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
          // numeric, hex or date detection
          xD = parseInt(x.match(hre), 10) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
          yD = parseInt(y.match(hre), 10) || xD && y.match(dre) && Date.parse(y) || null,
          oFxNcL, oFyNcL;
        // first try and sort Hex codes or Dates
        if (yD) {
          if (xD < yD) {
            return -1;
          } else if (xD > yD) {
            return 1;
          }
        }
        // natural sorting through split numeric strings and default strings
        for (var cLoc = 0, numS = Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
          // find floats not starting with '0', string or 0 if not defined (Clint Priest)
          oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
          oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
          // handle numeric vs string comparison - number < string - (Kyle Adams)
          if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
            return (isNaN(oFxNcL)) ? 1 : -1;
          }
          // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
          else if (typeof oFxNcL !== typeof oFyNcL) {
            oFxNcL += '';
            oFyNcL += '';
          }
          if (oFxNcL < oFyNcL) {
            return -1;
          }
          if (oFxNcL > oFyNcL) {
            return 1;
          }
        }
        return 0;
      }

      /*
       Implement Twitter/Weibo @ mentions

       Copyright (c) 2012 chord.luo@gmail.com

       Permission is hereby granted, free of charge, to any person obtaining
       a copy of this software and associated documentation files (the
       "Software"), to deal in the Software without restriction, including
       without limitation the rights to use, copy, modify, merge, publish,
       distribute, sublicense, and/or sell copies of the Software, and to
       permit persons to whom the Software is furnished to do so, subject to
       the following conditions:

       The above copyright notice and this permission notice shall be
       included in all copies or substantial portions of the Software.

       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
       EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
       MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
       NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
       LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
       OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
       WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      */
      /* -> jquery.caret.js */
      if (!jQuery.fn.caretPos) {
        (function(){var h=jQuery,f,g;f=function(b){var a,c,e,d;if(document.selection){if((c=document.selection.createRange())&&c.parentElement()===b)a=b.value.replace(/\r\n/g,"\n"),a=a.length,d=b.createTextRange(),d.moveToBookmark(c.getBookmark()),b=b.createTextRange(),b.collapse(!1),-1<d.compareEndPoints("StartToEnd",b)?e=a:(e=-d.moveStart("character",-a),d.moveEnd("character",-a))}else e=b.selectionStart;return e};g=function(b,a){var c;return document.selection?(c=b.createTextRange(),c.move("character",
        a),c.select()):b.setSelectionRange(a,a)};h.fn.caretPos=function(b){var a;a=this[0];a.focus();return b?g(a,b):f(a)}}).call(this);
      }
      /* -> jquery.atwho.js */
      if (!jQuery.fn.atWho) {
        (function(){var d=jQuery,i,k,m,f,l,n,p,g,q,r,s;m={$mirror:null,css:"overflowY height width paddingTop paddingLeft paddingRight paddingBottom marginTop marginLeft marginRight marginBottom fontFamily borderStyle borderWidth wordWrap fontSize lineHeight overflowX".split(" "),init:function(a){var b,c;b=d("<div></div>");c={position:"absolute",left:-9999,top:0,zIndex:-2E4,"white-space":"pre-wrap"};d.each(this.css,function(b,d){return c[d]=a.css(d)});b.css(c);this.$mirror=b;a.after(b);return this},setContent:function(a){this.$mirror.html(a);
        return this},getFlagRect:function(){var a,b;a=this.$mirror.find("span#flag");b=a.position();a={left:b.left,top:b.top,bottom:a.height()+b.top};this.$mirror.remove();return a}};i=function(a){var b=this,a=this.$inputor=d(a);this.options={};this.query={text:"",start:0,stop:0};this._cache={};this.pos=0;this.flags={};this.theflag=null;this.search_word={};this.view=k;this.mirror=m;a.on("keyup.inputor",function(a){if(!(40===a.keyCode||38===a.keyCode)||!b.view.isShowing())return b.lookup()});this.init();f("At.new",
        a[0]);return this};i.prototype={constructor:i,init:function(){var a=this;this.$inputor.on("keyup.inputor",function(b){return a.onkeyup(b)}).on("keydown.inputor",function(b){return a.onkeydown(b)}).on("scroll.inputor",function(){return a.view.hide()}).on("blur.inputor",function(){return a.view.hide(1E3)});return f("At.init",this.$inputor[0])},reg:function(a,b){var c,e,j;c={};d.isFunction(b)?c.callback=b:c=b;j=(e=this.options)[a]||(e[a]=d.fn.atWho["default"]);this.options[a]=d.extend({},j,c);return f("At.reg",
        this.$inputor[0],a,b)},dataValue:function(){var a;if(a=this.search_word[this.theflag])return a;a=/data-value=["']?\$\{(\w+)\}/g.exec(this.getOpt("tpl"));return this.search_word[this.theflag]=!g(a)?a[1]:null},getOpt:function(a){try{return this.options[this.theflag][a]}catch(b){return null}},rect:function(){var a,b,c,e;a=this.$inputor;if(document.selection)return b=document.selection.createRange(),e=b.boundingLeft+a.scrollLeft(),a=b.boundingTop+d(window).scrollTop()+a.scrollTop(),c=a+b.boundingHeight,
        {top:a-2,left:e-2,bottom:c-2};e="<span>"+a.val().slice(0,this.pos-1).replace(/</g,"&lt").replace(/>/g,"&gt").replace(/`/g,"&#96").replace(/"/g,"&quot").replace(/\r\n|\r|\n/g,"<br />")+"</span>";e+="<span id='flag'>@</span>";c=a.offset();b=this.mirror.init(a).setContent(e).getFlagRect();e=c.left+b.left-a.scrollLeft();a=c.top-a.scrollTop();c=a+b.bottom;a+=b.top;return{top:a,left:e,bottom:c+2}},cache:function(a){var b,c;b=this.query.text;return!this.getOpt("cache")||!b?null:(c=this._cache)[b]||(c[b]=
        a)},getKeyname:function(){var a,b,c,e,j,t=this;a=this.$inputor;e=a.val();a=a.caretPos();j=e.slice(0,a);c=null;d.each(this.options,function(a){var b;b=RegExp(a+"([A-Za-z0-9_+-]*)$|"+a+"([^\\x00-\\xff]*)$","gi").exec(j);if(!g(b))return c=b[2]?b[2]:b[1],t.theflag=a,!1});"string"===typeof c&&20>=c.length?(e=a-c.length,b=e+c.length,this.pos=e,b={text:c.toLowerCase(),start:e,end:b}):this.view.hide();f("At.getKeyname",b);return this.query=b},replaceStr:function(a){var b,c,e,d;b=this.$inputor;e=this.query;
        d=b.val();c=this.getOpt("display_flag")?0:this.theflag.length;c=d.slice(0,e.start-c);e=c+a+d.slice(e.end);b.val(e);b.caretPos(c.length+a.length);b.change();return f("At.replaceStr",e)},onkeyup:function(a){var b;b=this.view;if(b.isShowing()){switch(a.keyCode){case 27:a.preventDefault();b.hide();break;default:d.noop()}return a.stopPropagation()}},onkeydown:function(a){var b;b=this.view;if(b.isShowing()){switch(a.keyCode){case 27:a.preventDefault();b.hide();break;case 38:a.preventDefault();b.prev();
        break;case 40:a.preventDefault();b.next();break;case 9:case 13:if(!b.isShowing())return;a.preventDefault();b.choose();break;default:d.noop()}return a.stopPropagation()}},renderView:function(a){f("At.renderView",this,a);a=a.splice(0,this.getOpt("limit"));a=s(a,this.dataValue());a=q(a);a=r.call(this,a);return this.view.render(this,a)},lookup:function(){var a,b,c;if(c=this.getKeyname())return f("At.lookup.key",c),g(b=this.cache())?g(b=this.lookupWithData(c))?d.isFunction(a=this.getOpt("callback"))?a(c.text,
        d.proxy(this.renderView,this)):this.view.hide():this.renderView(b):this.renderView(b),d.noop()},lookupWithData:function(a){var b,c,e=this;b=this.getOpt("data");d.isArray(b)&&0!==b.length&&(c=d.map(b,function(b){var c,h,f;try{h=d.isPlainObject(b)?b[e.dataValue()]:b,f=RegExp(a.text.replace("+","\\+"),"i"),c=h.match(f)}catch(g){return null}return c?b:null}));return c}};k={timeout_id:null,id:"#at-view",holder:null,_jqo:null,jqo:function(){var a;a=this._jqo;return g(a)?this._jqo=d(this.id):a},init:function(){var a,
        b=this;if(g(this.jqo()))return a="<div id='"+this.id.slice(1)+"' class='at-view'><ul id='"+this.id.slice(1)+"-ul'></ul></div>",d("body").append(a),a=this.jqo().find("ul"),a.on("click",function(a){a.stopPropagation();a.preventDefault();return b.choose()})},isShowing:function(){return this.jqo().is(":visible")},choose:function(){var a;a=this.jqo().find(".cur");a=g(a)?this.holder.query.text+" ":a.attr(this.holder.getOpt("choose"))+" ";this.holder.replaceStr(a);return this.hide()},rePosition:function(){var a;
        a=this.holder.rect();a.bottom+this.jqo().height()-d(window).scrollTop()>d(window).height()&&(a.bottom=a.top-this.jqo().height());f("AtView.rePosition",{left:a.left,top:a.bottom});return this.jqo().offset({left:a.left,top:a.bottom})},next:function(){var a;a=this.jqo().find(".cur").removeClass("cur").next();a.length||(a=d(this.jqo().find("li")[0]));return a.addClass("cur")},prev:function(){var a;a=this.jqo().find(".cur").removeClass("cur").prev();a.length||(a=this.jqo().find("li").last());
        return a.addClass("cur")},show:function(){this.isShowing()||this.jqo().show();return this.rePosition()},hide:function(a){var b=this;if(isNaN(a)){if(this.isShowing())return this.jqo().hide()}else return a=function(){return b.hide()},clearTimeout(this.timeout_id),this.timeout_id=setTimeout(a,300)},clear:function(a){!0===a&&(this._cache={});return this.jqo().find("ul").empty()},render:function(a,b){var c,e;if(!d.isArray(b))return!1;if(0>=b.length)return this.hide(),!0;this.holder=a;a.cache(b);this.clear();
        c=this.jqo().find("ul");e=a.getOpt("tpl");d.each(b,function(b,d){var h;e||(e=l);h=n(e,d);f("AtView.render",h);return c.append(p(h,a.query.text))});c.delegate("li","mouseenter",function(a){c.find(".cur").removeClass("cur");d(a.currentTarget).addClass("cur")});this.show();return c.find("li:eq(0)").addClass("cur")}};q=function(a){return d.map(a,function(a,c){d.isPlainObject(a)||(a={id:c,name:a});return a})};n=function(a,b){try{return a.replace(/\$\{([^\}]*)\}/g,function(a,c){return b[c]})}catch(c){return""}};
        p=function(a,b){return g(b)?a:a.replace(RegExp(">\\s*(\\w*)("+b.replace("+","\\+")+")(\\w*)\\s*<","ig"),function(a,b,d,f){return"> "+b+"<strong>"+d+"</strong>"+f+" <"})};r=function(a){var b,c,d,f,g,h,i;b=this.dataValue();d=this.query.text;f=[];h=0;for(i=a.length;h<i;h++)c=a[h],g=c[b],-1!==g.toLowerCase().indexOf(d)&&(c.order=g.toLowerCase().indexOf(d),f.push(c));f.sort(function(a,b){return a.order-b.order});return f};s=function(a,b){var c;c=[];return d.map(a,function(a){var f;f=d.isPlainObject(a)?
        a[b]:a;if(0>d.inArray(f,c))return c.push(f),a})};g=function(a){return!a||d.isPlainObject(a)&&d.isEmptyObject(a)||d.isArray(a)&&0===a.length||a instanceof d&&0===a.length||void 0===a};l="<li id='${id}' data-value='${name}'>${name}</li>";f=function(){};d.fn.atWho=function(a,b){k.init();return this.filter("textarea, input").each(function(){var c,e;c=d(this);(e=c.data("AtWho"))||c.data("AtWho",e=new i(this));return e.reg(a,b)})};d.fn.atWho["default"]={data:[],choose:"data-value",callback:null,cache:!0,
        limit:5,display_flag:!0,tpl:l}}).call(this);
      }

      // Create stylesheet for At.js
      (function() {
        var css = '#at-view{position:absolute;top:0;left:0;display:none;margin-top:18px;background:white;border:1px solid #ddd;border-radius:3px;box-shadow:0 0 5px rgba(0,0,0,0.1);min-width:120px}#at-view .cur{background:#36f;color:white}#at-view .cur small{color:white}#at-view strong{color:#36f}#at-view .cur strong{color:white;font:bold}#at-view ul{list-style:none;padding:0;margin:auto}#at-view ul li{display:block;padding:2px 5px 2px 5px;border-bottom:1px solid #ddd;cursor:pointer}#at-view small{font-size:smaller;color:#777;font-weight:normal}';
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.stylesheet) {
          style.stylesheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
        document.body.appendChild(style);
      })();

      var users = [];
      var me = $('a.top[href^="/member/"]').attr('href');
      var op = $('div.header small.gray a[href^="/member/"]').attr('href');

      if (me) {
        me = me.slice(8);
      }
      if (op) {
        op = op.slice(8);
        if (op !== me) {
          users.push(op);
        }
      }

      $('td a.dark[href^="/member/"]').each(function() {
        var href = $(this).attr('href');
        if (href) {
          var user = href.slice(8);
          if (users.indexOf(user) === -1 && user !== me) {
            users.push(user);
          }
        }
      });

      $('textarea').atWho('@', {
        data: users.sort(naturalSort),
        limit: 8
      });
    });
})();