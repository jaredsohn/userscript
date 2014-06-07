// ==UserScript==
// @name           OKC Easy Comment
// @namespace      blah
// @description    Bigger comment box below comments, comment twice without refreshing, auto-BR tags
// @include        http://www.okcupid.com/profile/*/journal*
// @include        http://www.okcupid.com/journal?tuid=*&pid=*
// @exclude        http://www.okcupid.com/profile/*/journal
// @exclude        http://www.okcupid.com/profile/*/journal/
// ==/UserScript==

//alert(autocolor("blah"));

var debug=false;

function autocolor(s){
  //automatically add a color if no manual tags
  if(s.indexOf("oknotice")==-1){
    var cs=["'","_success","_error"];
    s="<p class='oknotice"+cs[Math.floor(Math.random()*2)]+"'>"+s+"</p>";
  }
  return(s);
}

function autolink(s){

  if(s.indexOf("href=")==-1){ //no links already
    var hlink=/https?:\/\/(?:www\.)?[a-z0-9.\-]+\.(?:com|edu|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|travel|[a-z]{2})[\.\-\/\?&#%@\s]{0,}[\*\d\w\.\-\/\?&#%@='"_+\:~-]{0,}/gi;

    //alert(s);
    //alert(s.match(hlink));
    return(s.replace(hlink,
      function($0){
        s=$0; 
        return s.replace(s,"<a target=_new href="+s+">"+s+"</a>");
      })
    );
  }else{
    return(s);
  }
}

document.body.appendChild(document.createElement("script")).innerHTML=autolink.toString();

var blah=getElementsByAttribute(document,"class","actions_container",false);
if(blah[0]!=null){
  var str=blah[0].innerHTML;

  var pid=document.getElementsByName("extra")[0].value;
  var uid=document.getElementsByName("uservar")[0].value;
  var authcode=document.getElementsByName("authcode")[0].value;
  
  blah[0].innerHTML="&nbsp;"; 

  //<br> tags
  var addbrs="getElementById('textarea_"+pid+"').value=autolink(getElementById('textarea_"+
  pid+"').value"+
  
  ".replace(/<bp>/gi,'<p class=\\'oknotice\\'>')"+
  ".replace(/<gp>/gi,'<p class=\\'oknotice_success\\'>')"+
  ".replace(/<rp>/gi,'<p class=\\'oknotice_error\\'>')"+
  ".replace(/<\\/[b|r|g]p>/gi,'</p>')"+
  ".replace(/<q>/gi,'<p class=\\'post_time\\'><i>')"+
  ".replace(/<\\/q>/gi,'</i></p>')"+
  ".replace(/<s>/gi,'<del>')"+
  ".replace(/<\\/s>/gi,'</del>')"+
  ".replace(/\\n/g,'<br>')"+
  ".replace(/<\\/p><br>/gi,'</p>'));";
  

  if(debug) addbrs=addbrs+"alert($0);" //stops script before submit

//"boards.add_comment('14458811861822709088','5635919527913008291',0,0,true,'1,0,1270342130,0xb7ab3a5effd67093;68d8144770cadad45f9320ab110e3db2755a57e9'); return false;"
//getElementById('textarea_233663202086745424').value=autolink(getElementById('textarea_233663202086745424').value.replace(/<bp>/gi,'<p class=\'oknotice\'>').replace(/<gp>/gi,'<p class=\'oknotice_success\'>').replace(/<rp>/gi,'<p class=\'oknotice_error\'>').replace(/<\/[b|r|g]p>/gi,'</p>').replace(/\n/g,'<br>'));alert($0);boards.add_comment('233663202086745424','13321866016015018535',0,0,true,'1,0,1328151376,0xb8e0c68f2dec6a27;f57585cd58159487c1125a40f320a46c274bccc1');return false;
  var submitcommentlink=addbrs+"boards.add_comment('" + pid + "','" + uid + "',0,0,true,'"+authcode+"');return false;";

//replaces the following line (use debug to print out str instead of looking at the source of the page)
//<a href="#submit" id="" class="" style="" onclick="boards.add_comment('233663202086745424','13321866016015018535',0,7,true,'1,0,1328151376,0xb8e0c68f2dec6a27;f57585cd58159487c1125a40f320a46c274bccc1'); return false;"
  var pl=str.indexOf("<a href=\"#submit\" id=\"\" class=\"\" style=\"\" onclick=")+51;
  str=str.substring(0,pl) + submitcommentlink + str.substring(pl);

  //GM_log(pl);

  //bigger textarea
  //str=str.replace("class=\"addform_ta\"","class=\"addform_ta\" style='height: 300px; width: 400px;'");

  //fix add comment link after submit
  str=str.replace("<li id=\"comment_add_link_"+pid,"<li id=\"blah");

  //separate status box
  str=str.replace(">Add a Comment</a>",">Add a Comment</a></li><li id='comment_add_link_"+pid+"'><span class='holder'></span>");

  //kill twitter
  str=str.replace("<a class=\"tweet\"","<!---");
  str=str.replace("Tweet this post</a>","--->");

  //kill track journal
  str=str.replace("<a href=\"/journal?","<!---");
  str=str.replace("Track Journal</a>","--->");

  //Top link
  str=str.replace(">Add a Comment</a>",">Add a Comment</a></li><li><a href='javascript:window.scrollBy(0,-99999);'>Top</a>");

  //scroll down after clicking add comment
  //str=str.replace("return false;\">Add a Comment</a>","window.scrollBy(0,300);return false;\">Add a Comment</a>");


  var newdiv=document.createElement('DIV');
  newdiv.innerHTML=str;
  var aftercomments=getElementsByAttribute(document,"class","journal_actions",false)[0];
  aftercomments.appendChild(newdiv);
}

function getElementsByAttribute(frst,attrN,attrV,multi){
  attrV=attrV.replace(/\|/g,'\\|').replace(/\[/g,'\\[').replace(/\(/g,'\\(').replace(/\+/g,'\\+').replace(/\./g,'\\.').replace(/\*/g,'\\*').replace(/\?/g,'\\?').replace(/\//g,'\\/');
    	var multi=typeof multi!='undefined'?
            multi:
            false,
        cIterate=frst.getElementsByTagName('*'),
        aResponse=[],
        attr,
        re=new RegExp(multi?'\\b'+attrV+'\\b':'^'+attrV+'$'),
        i=0,
        elm;
    while((elm=cIterate.item(i++))){
        attr=elm.getAttributeNode(attrN);
        if(attr &&
            attr.specified &&
            re.test(attr.value)
        )
            aResponse.push(elm);
    }
    return aResponse;
}
