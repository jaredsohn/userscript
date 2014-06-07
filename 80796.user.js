// ==UserScript==
// @name          2chrv(2ch rich viwer)
// @namespace     http://fuji.jottit.com/
// @include       http://*.2ch.net/*/*/*
// @author        Makoto Fuji
// @version       0.1
// ==/UserScript==

(function(){
  function each(a,f){var l=a.length;for(var i=0;i<l;i++)f(a[i]);}
  function map(a,f){var b=[];var l=a.length;for(var i=0;i<l;i++)b[i]=f(a[i]);return b;}
  function fmap(a,p){var b=[];var r;var l=a.length;for(var i=0;i<l;i++)if(r=p(a[i]))b.push(r);return b;}
  function trim(s){return s.replace(/^[ \n]+|[ \n]+$/g, '');}
  function clone(o){var n={},k;for(k in o)n[k]=o[k];return n;}

  function han2zen(src){
    var han = "0123456789.,-+>";
    var zen = "０１２３４５６７８９．，−＋＞";
    var str = '';
    for (var i=0; i<src.length; i++) {
      c = src.charAt(i);
      n = zen.indexOf(c,0);
      if (n >= 0)
        c = han.charAt(n);
      str += c;
    }
    return str; 
  }
  function getText(elem) {
    function rec(a, elem){
      if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
        var s = trim(elem.nodeValue);
        if (s) a.push(s);
      } else if ( elem.nodeType !== 8 ) {
        if ((elem.nodeType == 1) &&
            (elem.tagName == 'BR')) {
          a.push("<<<BR>>>");
        } else {
          var elems = elem.childNodes;
          for (var i = 0; elems[i]; i++) {
            rec(a, elems[i]);
          }
        }
      }
      return a;
    }
    var arr = rec([], elem);
    for (var i = arr.length-1; i > 0; i--) {
      if (arr[i] == '<<<BR>>>') {
        arr.pop();
      } else {
        break;
      }
    }
	  return arr.join('');
  }
  function to_objs(data){
    function parse_header(dt){
      var a = getText(dt).split('：');
      a[0].match("([0-9]+)");
      return {
        id: RegExp.$1,
        name: a[1],
        date: a[2],
        comments: [],
      };
    }
    var IMAGE_SHOW_MAX = 1000;
    var image_count = 0;
    function organized_body(lst, d, body){
      var r = [];
      each(trim(body).split("<<<BR>>>"),
           function(l){
             var x;
             l = han2zen(l);
             if (l.match(/^ *>>?([0-9]+) *$/)) {
               var toid = RegExp.$1;
               var tod = lst[toid-1];
               if (tod) {
                 if (d.not_first) {
                   d.body = r.join('<br />');
                   d = clone(d);
                   tod.comments.push(d);
                   d.body = '';
                   d.not_first = false;
                   r = [];
                 } else {
                   tod.comments.push(d);
                 }
                 //r.push(RegExp.leftContext+'<a href="#x'+(toid)+'">>>'+toid+'</a>'+RegExp.rightContext);
                 d.not_first = true;
               }
             } else if (l.match(/>>?([0-9]+)/)) {
               if (lst[RegExp.$1-1]) {
                 lst[RegExp.$1-1].comments.push(d);
                 r.push(RegExp.leftContext+'<a href="#x'+(RegExp.$1)+'">>>'+RegExp.$1+'</a>'+RegExp.rightContext);
               }
             } else if ((image_count < IMAGE_SHOW_MAX) && l.match(/(h?ttps?:\/\/([\w-]+\.)+[~\w-]+(\/[~\w-.\/?%&=]*)?.jpg)/)) {
               var url = RegExp.$1;
               url = (url && (url.charAt(0) == 'h') ? '' : 'h')+url;
               r.push(RegExp.leftContext+
                 '<a href="'+url+'" target="_blank"><img src="'+url+'"></a>'+
                 RegExp.rightContext);
               image_count++;
             } else if (l.match(/(h?ttps?:\/\/([\w-]+\.)+[~\w-]+(\/[~\w-.\/?%&=]*)?)/)) {
               var url = RegExp.$1;
               url = (url && (url.charAt(0) == 'h') ? '' : 'h')+url;
               r.push(RegExp.leftContext+
                 '<a href="'+url+'" target="_blank">'+url+'</a>'+
                 RegExp.rightContext);
             } else {
               r.push(l);
             }
           });
      d.body = r.join("<br />");
    }
    var lst = [];
    each(data.getElementsByTagName('dt'), function(dt){
      var d = parse_header(dt);
      organized_body(lst, d, getText(dt.nextSibling));
      lst.push(d);
    });
    return lst;
  }
  function obj2html(obj){
    function footer(o){
      return '<span class="footer">'+
               '<span class="id">'+o.id+'</span>. '+
               '<span class="name">'+o.name+'</span> <span class="date">'+o.date+'</span>'+
             '</span>';
    }
    function blockquote(o){
      return o.comments.length ? '<blockquote>'+map(o.comments, function(comment){
        comment.show_flag = 1;
        return obj2html(comment);
      }).join('')+'</blockquote>' : '';
    }
    return '<div id="x'+obj.id+'" class="les">'+
              obj.body+
              footer(obj)+
              blockquote(obj)+
            '</div>';
  }
  function h1(){
    return '<h1>'+(document.getElementsByTagName('title')[0].innerHTML)+'</h1>';
  }
  var style = '<style type="text/css">\
body {\
  background:#fff;\
}\
* {\
  margin:0; padding:0;\
}\
h1 {\
  font-size:1.5em;\
  padding:0.5em;\
  background:#000;\
  color:#fff;\
  filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#aaa,EndColorStr=#444);\
  background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABkCAYAAABHLFpgAAABXklEQVQYlS3ExYoCUAAF0Ptxji0iInZ3d7eIiNjdnV95Z/PO4uD3+xHf75f4fD7E+/0mXq8X8Xw+icfjQdzvd+J2uxHX65W4XC7E+XwmTqcTcTweicPhQOz3e2K32xHb7ZbYbDbEer0mVqsVsVwuicViQcznc2I2mxHT6ZSYTCbEeDwmRqMRMRwOicFgIOr3+6JeryfqdruiTqdDtNttotVqEc1mk2g0GkS9XidqtRpRrVaJSqVClMtlolQqEcVikSgUCkQ+nydyuRyRzWaJTCZDpNNpIpVKEclkkkgkEkQ8HidisRgRjUaJSCRChMNhIhQKEcFgkAgEAoTf7yd8Ph/h9XoJj8dDuN1uwuVyEU6nk3A4HITdbidsNhthtVoJi8VCmM1mwmQyEUajkTAYDCK9Xi/S6XQirVYr0mg0hFqtJlQqFaFUKgmFQkHI5XJCJpMRUqmU+Pv7IyQSCf8BVMLut1CcbkoAAAAASUVORK5CYII=");\
  background-repeat:repeat-x;\
  background-color:#444;\
}\
#viewer {\
  margin-top:0.5em;\
  margin-left:0.5em;\
  font-size:0.9em;\
  line-height:1.3em;\
  list-style-type:none;\
  padding:0;\
}\
.les {\
  margin:0 0 0.3em;\
  padding:0.2em 0.5em 0.6em;\
  border-bottom:1px solid #eee;\
}\
.les:last-child {\
  border-bottom-width:0px!important ;\
}\
#viewer blockquote {\
  margin-left:0.5em;\
  padding-left:0.5em;\
  margin-top:0.5em;\
}\
#viewer blockquote { border-left:4px solid #ccc; }\
#viewer blockquote blockquote { border-left:4px solid #bbb; }\
#viewer blockquote blockquote blockquote { border-left:4px solid #aaa; }\
#viewer blockquote blockquote blockquote blockquote { border-left:4px solid #999; }\
#viewer blockquote blockquote blockquote blockquote blockquote { border-left:4px solid #888; }\
#viewer blockquote blockquote blockquote blockquote blockquote blockquote { border-left:4px solid #777; }\
#viewer .footer {\
  font-size:0.9em;\
  color:#777;\
  border-left:4px solid #eee;\
  padding-left:0.5em;\
  margin-left:0.5em;\
}\
a img {\
  border-width:0;\
}\
</style>';

//  window.onload = function(){
  var dl = document.getElementsByTagName('dl')[0];

  if (dl) {
    var text = h1()+'<div id="viewer">'+fmap(to_objs(dl), function(o){
      return !o.show_flag && obj2html(o);
    }).join('')+'</div>';
    var body = document.getElementsByTagName('body')[0];
    while (body.firstChild)
      body.removeChild(body.firstChild);

    body.innerHTML = style+text;
  }
//  }
})();
