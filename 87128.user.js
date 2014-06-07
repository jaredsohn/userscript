// ==UserScript==
// @name           HidingYahooAuctionUser
// @namespace      http://tax4.blog115.fc2.com/
// @include        http://*auctions*yahoo.co.jp/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

/* interval time for executing */
var time = 2;    // sec

var $body = $("body");

var spammers = {
  _users: [],
  getUsers:function(){
    return this._users;
  },
  _selector: "",
  add:function(uid){
    if(uid && $.inArray(uid, this._users)<0){
      this._users.push(uid);
      GM_setValue("spammers",this._users.join(","));
      this.init();
    }
  },
  overwrite:function(users){
    var res = null;
    if(users && users.length > 0){
      res = $.unique(users);
      //trim
      res = $.map(res, function(n,i){ return $.trim(n);});
      //
      res = $.grep(res,function(n,i){ return n.length > 0;});
    }

    if(res && res.length > 0){
      GM_setValue("spammers",res.join(","));
    }else{
      GM_setValue("spammers","");
    }
    this.init();
  },
  init:function(){
    var store = GM_getValue("spammers","");
    this._users = store?store.split(","):[];
    if(this._users.length > 0){
      this._selector
      = $.map(this._users,function(n,i){return "span[userid='"+n+"']";}).join(",");
    }else{
      this._selector = null;
    }
  },
  getSelector:function(){
    return this._selector;
  }
};
spammers.init();

var prevcount = 0;
var prevHeight = -1;

var blockf =   function(){
  var sel = spammers.getSelector();
  if(sel){
    var x = $(sel);
    if(prevcount!=x.length){
      x.filter(":visible").parent().parent().parent().hide().next().hide()
      ;//.next().hide();
      prevcount = x.length;
    }
  }
  
  if(prevHeight!=$body.height()){
    var names = $("a[href]").not(".hidable").addClass("hidable")
    .each(function(){
      var userid = $(this).attr("href").match(/[^/]+$/);
      if(userid){
        $(this).attr("userid",userid);
      }
    }).filter(function(){ return this.href.match(/^http\:\/\/openuser\.auctions\.yahoo\.co\.jp\/jp\/user\/[^\?/#]+$/);});

    for(var i = 0, nm ; nm = names[i]; i++){
      var uname = $(nm).text();
      $("<span userid='"+uname+"'>[NG]</span>").insertBefore(nm)[0]
      .addEventListener("click",function(e){
        spammers.add($(this).attr("userid"));
        blockf();
        return false;
      },false);
    }
    prevHeight = $body.height();
  }
};

blockf();
setInterval(blockf, time*1000);

//
GM_registerMenuCommand("Edit spammer list", function(){
  var userlist = spammers.getUsers().join(",");
  var res = prompt("input userid(comma delimiter)",userlist);
  if(res != null){
    spammers.overwrite(res.split(","));
  }
});
