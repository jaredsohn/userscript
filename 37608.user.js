// ==UserScript==
// @author         rikuo
// @name           Popup HB comment
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://b.hatena.ne.jp/entry/*
// @include        http://b.hatena.ne.jp/entry?mode=more&url=*
// ==/UserScript==

//--- Auto user link & Auto Reply user link(true / false) -----

var AutoUserLink = true ;
var AutoReplyLink = true ;

//-------------------------------------------------------------

// http://userscripts.org/scripts/show/37608

(function(){

  var _doc = document,BUCtId = e('bookmarked_user');
  if(!BUCtId) return;
  var li = makexpath(BUCtId, 'li');
  if(li.snapshotLength <= 1)return;

  var body = _doc.getElementsByTagName('body')[0];
  var xpath = 'li[not(contains(concat(" ",@class," "),"nocomment"))]/span[@class="comment"]/a[starts-with(@href,"/")]';
  var PopupIcon = c('img'),hilight='#CCD7F9',Retext=' Reply:';
  PopupIcon.src = 'data:image/gif;base64,R0lGODlhDgAMAPABAAg5m8DAwCH5BAEAAAEALAAAAAAOAAwAAAIeTICpduwM2pvI1IhtnK9y52WX9oHStx2J5nUnmjoFADs=';
  PopupIcon.className = 'popup-icon';
  PopupIcon.height ='12';
  PopupIcon.width ='14';

  addCSS();

  var replyElm = c('span');
  replyElm.className = 'reply-block';
  replyElm.textContent = Retext;

  var replylink = c('a');
  var replyIcon = c('img');
  replyIcon.width = '16';
  replyIcon.height = '16';
  replyIcon.className = 'profile-image';
  replyIcon.alt = '';
  replylink.appendChild(replyIcon);


  var popupcomment = c('ul');
  popupcomment.className = 'popupusercomment';

  if(AutoUserLink)SearchIDlikelink();
  SearchIDcall();

  function SearchIDcall(){
    var nodes = makexpath(BUCtId, xpath);
    if(nodes.snapshotLength == 0)return;
    var rep = /^http:\/\/b.hatena.ne.jp\/([\w-_]+)\/$/;
    for(var i = 0,n = nodes.snapshotLength; i < n; ++i){
      var idcalllink = nodes.snapshotItem(i).href;
      if(rep.test(idcalllink)){
        var calledid = RegExp.$1,userid = 'bookmark-user-'+calledid;
        if(e(userid)){
          var idcall = nodes.snapshotItem(i);
          SetIDcall(idcall,userid);
          if(AutoReplyLink){
            CreateReplylink(idcall,calledid,userid);
          }
        }
      }
    }
  }

  function SetIDcall(link,id){
    link.href = '#' + id;
    var Icon = PopupIcon.cloneNode(true);
    link.insertBefore(Icon,link.firstChild);
    SetEvent(link,id);
  }

  function SetEvent(link,id){
    link.addEventListener('mouseover',PopUpUserComment,false);
    link.addEventListener('mouseout',HideUserComment,false);
    var commentid = id + '-comment';
    if(!e(commentid)){
      var liid = e(id).cloneNode(true);
      liid.id = commentid + '-PopUP';
      var p = popupcomment.cloneNode(true);
      p.id = commentid;
      p.appendChild(liid);
      body.appendChild(p);
    }
  }

  function CreateReplylink(idcall,calledid,userid){

    var perentLI = idcall.parentNode.parentNode;
    if(!/bookmark-user-([\w-]+)/.test(perentLI.id))return;
    var callid = RegExp.$1,
	ReplyIconID='reply-'+callid+'-'+calledid;
    if(e(ReplyIconID))return;
    var ReplyID = 'reply-'+calledid;
    if(!e(ReplyID)){
      var Reply = replyElm.cloneNode(true);
      Reply.id=ReplyID;
      e(userid).appendChild(Reply);
    }
    var userIcon = replylink.cloneNode(true),
    CallUserID = 'bookmark-user-' + callid;
    userIcon.href = '#' + CallUserID;
    userIcon.id = ReplyIconID;
    userIcon.childNodes[0].src = 'http://uicon.st-hatena.com/users/'+callid.substring(0,2)+'/'+callid+'/profile_s.gif#';
    e(ReplyID).appendChild(userIcon);
    SetEvent(e(ReplyIconID),CallUserID);
  }

  function PopUpUserComment(event){
    var id = this.href.replace(/.+#bookmark-user-/,'bookmark-user-');
    e(id).style.backgroundColor=hilight;
    var c = e(id + '-comment'),s = c.style;
    s.display = 'block';
    s.top = event.pageY+12+'px';
    var mouseX = event.pageX;
    if(window.innerWidth - mouseX < 245){
      s.right = window.innerWidth - mouseX - 100 + 'px';
    }else{
      s.left = mouseX-20 + 'px';
    }
  }

  function HideUserComment(){
    var id = this.href.replace(/.+#bookmark-user-/,'bookmark-user-');
    e(id).style.backgroundColor='';
    var c = e(id + '-comment'),s = c.style;
    s.display = 'none';
    s.left = 'auto';
    s.right = 'auto';
  }

  function SearchIDlikelink(){
    var commentxpath = 'li[not(contains(concat(" ",@class," "),"nocomment"))]/span[@class="comment"]/text()';
    var nodes = makexpath(BUCtId, commentxpath);
    const syntaxRE = /([a-zA-Z][\w-]{1,30}[a-zA-Z0-9])/g;
      if(nodes.snapshotLength == 0)return;
      for(var i = 0,n = nodes.snapshotLength; i < n; ++i){
        var df,item = nodes.snapshotItem(i),
        text = item.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        parent = item.parentNode, range = _doc.createRange(),
        newText = text.replace(syntaxRE,function(s){
          var userid = 'bookmark-user-' + s;
          if(!e(userid))return s;
          return '<a href="/' + s +'/">' + s + '</a>'});
        range.selectNode(item);
        df = range.createContextualFragment(newText);
        parent.replaceChild(df, item);
        range.detach();
      }
  }

  function addCSS(){

  GM_addStyle(<><![CDATA[
    img.popup-icon{
      margin: 0;
      padding: 0 2px 0 3px;
    }
    span.reply-block{
      font-size: 90%;
      color: #6666CC;
    }
    span.reply-block a{
      margin-right: 5px;
    }
    span.comment a[href^="#bookmark-user-"]:hover{
      background-color: #CCD7F9;
    }
    ul.popupusercomment{
      display: none;
      max-width: 600px;
      position: absolute;
      margin: 0;
      padding: 9px 0 0 0;
      vertical-align: baseline;
    }
    ul.popupusercomment li{
      display: block;
      margin: 0;
      background-color: #fff;
      font-size: 90%;
      border: 1px solid #888;
      line-height: 1.5;
      text-align: left;
      position: relative;
      padding: 8px 5px;
      border-width: 1px; 
      border-color: #dfd8df #a0a8a0 #a0a8a0 #dfd8df; 
      border-style: solid;
    }
    ul.popupusercomment li a img.profile-image{
      border: 0;
      display: block;
      padding: 0 0 12px 0;
    }
    ul.popupusercomment li a.username{
      position: absolute;
      top: 6px;
      left: 5px;
      display: block;
      border-bottom: 1px solid #dfd8df;
      width: 90%;
      padding: 0 0 5px 20px;
      color: #000;
      text-decoration: none;
    }
    ul.popupusercomment li span.timestamp{
      font-size: 80%;
      text-align: right;
    }
    ul.popupusercomment li span.tags,
    ul.popupusercomment li span.tags a{
      color: #6666CC;
      font-size: 90%;
    }
    ul.popupusercomment li span.comment{
      text-indent: 0.3em;
      padding: 8px 0 5px 5px;
      font-size: 90%;
    }
    ul.popupusercomment li span.comment a{
      color: #000;
    }
    ul.popupusercomment li span.hatena-star-star-container,
    ul.popupusercomment img.popup-icon,
    ul.popupusercomment span.reply-block{
      display: none;
    }
  ]]></>);
  }

  function c(tag_name) {
    return _doc.createElement(tag_name);
  }

  function e(id) {
    return _doc.getElementById(id);
  }

  function makexpath(context, query){
    return _doc.evaluate(
      query, context, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    )
  }

})();

