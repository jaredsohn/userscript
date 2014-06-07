// ==UserScript==
// @name           twittermobileplus
// @namespace      twittermobileplus
// @include        http://m.twitter.com/*
// ==/UserScript==
//
// Auther : Yukotan （in japanese 'ゆこたん'）
// version: 0.90 : 2009-09-07T14:51:21+09:00
//
// This script adds twitter mobile site convenient function to use on your PC.
// 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

(function() {

var f = {

  // add Friend Link
  addFriendLink : function(d){
    var bdn = d.innerHTML;
    var r = /\W(@)(\w+)(\W)/g;
    d.innerHTML = bdn.replace(r, "$1<a href='/$2'>$2</a> $3" );
    //r = /(\w+)(\+\+)/g;
    //d.innerHTML = bdn.replace(r, "<a href='/$1'>$1</a>$2" );
  },

  // add textarea
  addTextArea : function(bdy){
    var s = f.$('status');
    var news;
    if (!s){
//      alert('ｲﾏｺｺ');
      //var siv = GM_getValue('siv', '' );
      var authenticity_token = GM_getValue('authenticity_token', '' );
      var ps = '<form action="/status/update" method="post">'
               +'<input type="hidden" name="authenticity_token" value="' + authenticity_token + '"/>'
               +'<input type="hidden" name="source" value="mobile"/>'
               +'<input type="text" name="status" id="status" maxlength="140" class="i" value=""/>'
               //+'<input type="hidden" name="siv" value="' + siv + '"/>'
               +'<br/><input type="submit" name="update-submit" value="update" class="b"/></form>';
//      pp.innerHTML = pp.innerHTML + ps;
      var str = bdy.innerHTML
      str = str.replace( 'alt="Twitter"/></a></div>',  'alt="Twitter"/></a></div>' + ps);
      document.body.innerHTML = str;
    }
    s = f.$('status');
    news = f.$c("textarea");
    news.id = s.id;
    news.name = s.id;
    news.className = "i";
    news.style.width = "500px";
    s.parentNode.replaceChild(news,s);
  },

  a : {
    _val : '',
    createa : function (id) {
      var obj = f.$c("a");
      obj.href='javascript:void(0);';
      obj.setAttribute("onclick","javascript:var d=document.getElementById('status'); d.value=" + f.a._val + id + " ';");
      obj.innerHTML=f.a._innerHTML;
      obj.style.color = "OliveDrab";
      return obj;
    },
    createBitlyInfo : function (lnk) {
      var obj = f.$c("a");
      obj.href=lnk.replace('bit.ly/','bit.ly/info/');
      obj.innerHTML=f.a._val;
      obj.style.color = "OliveDrab";
      obj.target = "_blank";
      return obj;
    },
  },

  // .add [RT] Link
  addRTLink : function(l){
    f.a._val = "'RT: @";
    var n = f.a.createa(l.innerHTML);
    n.innerHTML = "[RT]";
    n.style.paddingRight = "1px";
    l.parentNode.insertBefore(n,l.nextSibling);
  },

  // .add [d] Link
  addDMLink : function(l){
    f.a._val = "'d ";
    var n = f.a.createa(l.innerHTML);
    n.innerHTML = "d]";
    n.style.paddingRight = "1px";
    l.parentNode.insertBefore(n,l.nextSibling);
  },

  // .add [+] Link
  addPlusLink : function(l){
    f.a._val = "d.value+'@";
    var n = f.a.createa(l.innerHTML);
    n.innerHTML = "+";
    n.style.paddingRight = "1px";
    l.parentNode.insertBefore(n,l.nextSibling);
  },

  // add [@] Link
  addAtLink : function(l){
    f.a._val = "'@";
    var n = f.a.createa(l.innerHTML);
    n.innerHTML = "[@";
    n.style.paddingLeft = "3px";
    l.parentNode.insertBefore(n,l.nextSibling);
  },

  // add [info] Link
  addBitlyLink : function(l){
    f.a._val = "[info]";
    var n = f.a.createBitlyInfo(l.innerHTML);
//    n.innerHTML = "[info]";
    n.style.paddingLeft = "3px";
    l.parentNode.insertBefore(n,l.nextSibling);
  },

  $  : function(id){ return document.getElementById(id) },
  $c : function(id){ return document.createElement(id) },

  replacer : function (str,p1,p2){ var no = eval(p2 + '+1'); return p1 + no; },

} // end f

//get token
var frms = document.forms;
if(frms[0]){
    var surce = document.forms[0].elements[0];
    if( surce.value != 'mobile'){
//        return ;
    } else {
        var authenticity_token = document.forms[0].elements[2];
        if(authenticity_token){
            //alert('authenticity_token=' + authenticity_token.value );
            GM_setValue('authenticity_token', authenticity_token.value);
        }
    }
}
//f.addFriendLink(document.body);
f.addTextArea(document.body);

var aryLink = document.links;
var lnk;
if(aryLink){
    for(var i=0; i<aryLink.length;i++){
        lnk = aryLink[i];
        lnk.href = lnk.href.replace("http://twitter.com/", "/");
        lnk.href = lnk.href.replace("http://m.twitter.com/", "/");
        lnk.href = lnk.href.replace("http://twitter.jp/", "/");
        lnk.href = lnk.href.replace("http://m.twitter.jp/", "/");
        var hosturl = lnk.host;
        if( hosturl=="bit.ly" && lnk.href.indexOf('bit.ly/info/',0)==-1){
            f.addBitlyLink(lnk);
        }
        if( hosturl=="m.twitter.com" || hosturl=="twitter.com" || hosturl=="m.twitter.jp" || hosturl=="twitter.jp" ) {
            // add usefle link
            if (lnk.parentNode.tagName=="li") {
                //f.addRTLink(lnk);
                f.addDMLink(lnk);
                f.addPlusLink(lnk);
                f.addAtLink(lnk);
            }
            // add Older link
            if(lnk.innerHTML=='Newer' && aryLink[i+1].innerHTML!='Older'){
                var u = document.URL;
                u = u.replace(/(page=)(\d+)/, f.replacer );
                lnk.parentNode.innerHTML = lnk.parentNode.innerHTML + ' | <a href="' + u +'" accesskey="6">Older</a> 6';
            }
        //} else {
        //  if(lnk.host!=""){lnk.target = "_blank";}
        }
    }
}

})();
