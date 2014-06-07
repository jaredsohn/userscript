// ==UserScript==
// @name           HidingTwitterSpammer
// @namespace      http://tax4.blog115.fc2.com/
// @include        http://twitter.com/*
// ==/UserScript==

/* interval time for executing */			
var time = 2;    // sec			
var initflag = false;			

var $, $body, $document;			
var spammers;			
			
var prevcount = 0;			
var prevHeight = -1;			

var GM_KEY_SPAMMERS = "spammers";
var CSS_DELETE_TARGET = "delete_event";

function f(){
  if(!initflag){
    if(typeof $ == "undefined"){  
      $ = unsafeWindow.$;
      $body = $("body");
      $document = $(document);
      
      spammers = createSpammersList();
      spammers.init();
      GM_registerMenuCommand("Edit spammer list", function(){
        var userlist = spammers.getUsers().join(",");
        var res = prompt("input userid(comma delimiter)",userlist);
        if(res != null){
          spammers.overwrite(res.split(","));
        }
      });
      initflag = true;
    }  
    else return ;  
  }    
  if(initflag){    
     blockf();
    //どうしてprevHeightと比較してるんだっけ？  
  }
}      


function createSpammersList(){
  return {
    _users: [],
    getUsers:function(){
      return this._users;
    },
    _selector: "",
    add:function(uid){
      if(uid && $.inArray(uid, this._users)<0){
        this._users.push(uid);
        GM_setValue(GM_KEY_SPAMMERS,this._users.join(","));
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
        GM_setValue(GM_KEY_SPAMMERS, res.join(","));
      }else{
        GM_setValue(GM_KEY_SPAMMERS, "");
      }
      this.init();
    },
    init:function(){
      var store = GM_getValue(GM_KEY_SPAMMERS,"");
      this._users = store?store.split(","):[];
      if(this._users.length > 0){
        this._selector
        = $.map(this._users,function(n,i){return "div[data-screen-name='"+n+"']";}).join(",");

  //      = $.map(this._users,function(n,i){return "li.u-"+n;}).join(",");
      }else{
        this._selector = null;
      }
    },
    getSelector:function(){
      return this._selector;
    }
  };
};

var blockf =   function(){ 
  var sel = spammers.getSelector();
  if(sel){
    var x = $(sel);
    if(prevcount!=x.length){

      //修正ポイント：ユーザIDを含むDIVから消したい要素をたどって消す。
      x.parent().hide();

      prevcount = x.length;
    }
  }

//  GM_log(prevHeight +"#"+$(document).height());

  if(prevHeight!=$document.height()){
    
    //修正ポイント：ダブルクリックでイベント起動する要素を選択
    var names = $("a.js-user-profile-link").not("."+CSS_DELETE_TARGET).addClass(CSS_DELETE_TARGET);
    
//    GM_log("names.length["+names.length+"]");
    
    for(var i = 0, nm ; nm = names[i]; i++){
      nm.addEventListener("contextmenu",function(e){
        
        //修正ポイント：イベント起動の要素からユーザIDのみをテキストとして含む要素を選択してテキストを取得
        var uname = $(this).find(".username >  b").text();
        
//        GM_log("uname["+uname+"]");
        
        spammers.add(uname);
        blockf();
        return false;
      },false);
    }
    prevHeight = $body.height();
  }
};

//GM_addStyle("div[@data-screen-name='xxxxx'] {background-color:blue;}");

unsafeWindow.setInterval(f, time*1000);      
