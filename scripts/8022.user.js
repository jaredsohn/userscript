// ==UserScript==
// @name           Radio Times Wide
// @namespace      userscripts.org/alien_scum/
// @description    extends lisitngs to from 3 to six hours
// @include        http://www.radiotimes.com/*
// ==/UserScript==

function $x(xpath, root) { // From Johan Sundström
  xpath=xpath.replace(/((^|\|)\s*)(?!\s)([^/|]+)/g,'$2//$3').replace(/([^.])\.(\w+)/g,'$1[@class="$2"]').replace(/#(\w+)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
  var got = document.evaluate(xpath, root||document, null, null, null), result = [];
  while(next = got.iterateNext()) result.push(next);
  return result;
}

function forall(xpath,f) {
  $x(xpath).forEach(f);
}

function addStyle(s) {GM_addStyle(s.replace(/;/g,' !important;'))};

forall('comment()',del);
function del(node) {if (node) node.parentNode.removeChild(node);}

path='.gridChannel/ul';
tp='.times/ul';

function gettables(node) {
   var result =new Array();
   forall(node,function (ul) {
       var h=ul.parentNode.getElementsByTagName('h4')
         if(h.length) {a=h[0].getElementsByTagName('a')[0];
           if(a) ul.name=a.firstChild.data; } 
       result.push(ul); 
   });
   return result;
}

function named(node) {
   var result = new Array;
   gettables(node).forEach(function(v){if(v.name) result.push(v)});
   return result;
}


function isthere(table,tables) {
  for (var i=tables.length-1;i>0;i--)
    if(table.name==tables[i].name) return true;
  return false;
}
function dd(n) {return n<10? '0'+n :n};
r=/(Time=)(\d\d)/;

forall('//img[contains(@alt,"forward one")]/..',function(node){nxt=node.href.replace(r,'$1'+dd(parseInt(r.exec(node.href)[2],10)+2));});

forall('#header//.bottom | #ask | #banner | #ads_wide',del);

if (nxt) {
       addStyle('.gridBanner,.gridChannel .previous,.gridChannel .next {display:none;}                                                        \
                 #header h1 {margin-top:10px;}                                                                                                \
                 #header p,#header form {margin-top:43px;}                                                                                    \
                 #header {background:#FFC500 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADlCAMAAAClHm0vAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA%2FUExURf6xA%2F64Af2lA%2F2iA%2F%2FDAf2eA%2F2ZBf2oAv6uA%2F%2FFAf%2B%2FAf%2B8Af%2B0Af%2FBAP%2FAAPyaA%2FuVBPyWA%2FyWBf2UBfyTBNo1LggAAABDSURBVHja1MhZDoAgDEXRIuCA4oT7X6uRJk37ugLv%2Bbv00L81cIIbXGAEB%2BCTlegM3QRmhducIFajiF1UIynL5xVgANUQDOjdWqRtAAAAAElFTkSuQmCC") 0px -120px repeat-x;}\
                 #headWrap {background:url(../images/rtdf2/masthead_bg.jpg) 0px -115px no-repeat; height:75px;}                               \
                 #loginButtons{background:url(../images/rtdf2/masthead_bg.jpg) 0px -190px no-repeat; margin:0px; padding:10px ; width:800px;} \
                 .search p {display: none}                                                                                                    \
                 #timeline {margin-left:340px;}                                                                                               \
                 #controlBox {left:1085px;}                                                                                                   \
                 h2.tv, h2.radio  {background:url(../images/rtdf2/title_tvListings.gif) 400px 0px;width:1200px;}                              \
                 #listingDates {width:1200px;}                                                                                                \
                 #subnav {background-repeat:repeat-x; background-position: 338px 0px; width:1260px;}                                          \
                 #subnav ul {background: url(../images/rtdf2/subnav_bg.gif) repeat-x; background-position: 0px 0px; width:600px;}             \
                 .left {background-color:#FAF8F4; min-height:1px;}                                                                            \
                 .gridChannel h4 {width:150px; height:32px;}                                                                                  \
                 .gridChannel h4:after {clear:both;background: url(../images/rtdf2/grid_chnl_bgBtm.gif) no-repeat; margin:-10px; padding:0px 80px; content:"";}\
                 .gridChannel h4 span {width:0px; height:34px; margin:0px; float:left;}                                                       \
                 .gridChannel h4 a {max-width:149px; float:left;}                                                                             \
                 .gridChannel{width:1249px;}                                                                                                  \
                 #container,#contentLinks{width:1260px;}                                                                                      \
                 #content {background:white;}                                                                                                 \
                 .times {margin-left:154px;}                                                                                                  \
      ');
  resObj = document.body.appendChild(document.createElement('div'));
  resObj.innerHTML = 'LOADING...';
  resObj.setAttribute('id','next3h');
  resObj.setAttribute('style','position: fixed; right:20px; top:10px; color: black;');
  if (/tv\/now/i.test(window.location.href)) window.location.replace("http://www.radiotimes.com/ListingsServlet?event=13&broadcastType=1&jspGridLocation=/jsp/tv_listings_grid.jsp&jspListLocation=/jsp/tv_listings_single.jsp&jspError=/jsp/error.jsp");
  else GM_xmlhttpRequest({
     method: 'get',
     headers: {
       'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
       'Content-type': 'application/x-www-form-urlencoded'
     },
     url: nxt,
     onload: function(result) {
       var cnt=0;
       $x('#timeline//li//li').forEach(function(n){if (n.getAttribute('class')=='current') cnt=4; if(cnt-->0) n.setAttribute('class','current');});
       //alert('found');
       res=result.responseText
       resObj.style.display = 'none';
       chnls=named(path);
       forall(path+'/br | '+path+'/p | '+path+'/div',del);
       times=gettables(tp);
       resObj.innerHTML = res.slice(res.indexOf('<body')+20,res.indexOf('</body>'));
       forall('//text()',function(node){if(!/\S/.test(node.data))del(node)});
       extras=named('#next3h//'+path);
       exttimes=gettables('#next3h//'+tp);
       j=0;     
       for (var i=0;(chnl=chnls[i+j])&&(extra=extras[i]);i++){
         extra.getElementsByTagName('li')[0].setAttribute('class','vevent');
         if (chnl.name != extra.name){
           if(isthere(chnl,extras)){
             chnl.parentNode.parentNode.insertBefore(extra.parentNode,chnl.parentNode);
             f=extra.childNodes[0];
             m=f.getAttribute('style').match(/(.*-left: )(\d+)(.*)/)
             if(m) f.setAttribute('style',m[1]+(540+parseInt(m[2]))+m[3]);
             else f.setAttribute('style',f.getAttribute('style')+' margin-left:540px;');
             j--;         
           } else {
             j++;
             i--;
           }
         } else {
           end=chnl.childNodes[chnl.childNodes.length-1];
           beg=extra.childNodes[0];
           function ti(n) {return n.getElementsByTagName('p')[0].innerHTML};
           if(ti(end)==ti(beg)) {
             bw=parseInt(getComputedStyle(beg,'').width);
             ew=parseInt(getComputedStyle(end,'').width);
             if (bw<ew)
               beg.innerHTML=end.innerHTML;
             beg.style.width=(bw+ew)+'px'
             del(end)
           }
           chnl.innerHTML+=extra.innerHTML;
        }
       }
       for (var i=0;(time=times[i])&&(extra=exttimes[i]);i++){
         tlis=time.getElementsByTagName('li');
         del(tlis[tlis.length-1]);
         del(extra.getElementsByTagName('li')[0]);
         time.innerHTML+=extra.innerHTML;
       }
       del(resObj);
                 
       forall('.gridChannel//img[contains(@src,"key_film")] | .gridChannel//img[contains(@src,"key_p_")]',function(n){
         var a=document.createElement('a');
         n.parentNode.replaceChild(a,n);
         a.appendChild(n);
         a.href='http://www.google.com/search?btnI=I%27m+Feeling+Lucky&q='+escape(a.nextSibling.innerHTML)+' site:http://imdb.com/title'; // has issues with movies of the same name
         //a.href='http://www.imdb.com/find?s=tt&q='+escape(a.nextSibling.innerHTML); //i don't like this it doesn't always get to the right page
       });
    } //GM_xhr anon fnct
  });//GM_xhr
} //if (nxt)

