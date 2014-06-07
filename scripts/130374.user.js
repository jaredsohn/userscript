// ==UserScript==
// @name           HidingTweetInSearch
// @namespace      https://twitter.com/#!/yamadatarou0123
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

/* interval time for executing */			
var time = 2;    // sec			

/* REGEXP OPTION */
var REGEXP_OPTION = "i";



/* ------------------------------------------------------*/
var block_regexp_for_body = null;
var block_regexp_for_profile_name = null;
var block_set_for_screen_name = null;


var BLOCK_CHECK_ATTR ="HidingTweetInSearch_Check";
var TWEET_ROOT_SELECTOR = "div[data-item-type='tweet']";
var SCREEN_NAME_ATTR="data-screen-name";

var KEY_BLOCK_SCREEN_NAME  = "LIST_SCREEN_NAME";
var KEY_BLOCK_PROFILE_NAME = "LIST_PROFILE_NAME";
var KEY_BLOCK_TEXT         = "LIST_TEXT";

//--------------
var ACTION_UL = "ul.js-actions";


//--------------
reloadSetting();
reApplyFilter();
unsafeWindow.setInterval(f, time*1000);      


function f(){
     blockf();
}      

var blockf =   function(){
  
  var tweets = $(TWEET_ROOT_SELECTOR +":not(["+BLOCK_CHECK_ATTR+"])");
  tweets.attr(BLOCK_CHECK_ATTR,"");
  
  if(tweets.length>0){
    tweets.each(function(){
      
      var $this = $(this);
      
      if( testFilter($this) ){
        $this.hide();
      }
      
    });

    /* hide button */
    tweets.each(function(){
      var $this = $(this);
      var $elem = $("<li><a href='#'>▼hide</a></li>");
      $this.find(ACTION_UL).append($elem);
      $elem.click(function(){
        var $this = $(this);
        var $tweet = traverseParent($this, TWEET_ROOT_SELECTOR);
        var screen_name = $tweet.children("["+SCREEN_NAME_ATTR+"]").attr(SCREEN_NAME_ATTR);
        appendScreenName(screen_name);
      });
    });
  }

};

function appendScreenName(name){
  _GM_appendValue(KEY_BLOCK_SCREEN_NAME, name);
  reloadSetting();
  reApplyFilter();
}

function reApplyFilter(){
  var tweets = $(TWEET_ROOT_SELECTOR +"(["+BLOCK_CHECK_ATTR+"])");
  tweets.each(function(){
    
    var $this = $(this);
    
    if( testFilter($this) ){
      $this.hide();
    }
    else{
      $this.show();
    }
    
  });
  
}

function testFilter($aTweet){
  return ( (block_set_for_screen_name && block_set_for_screen_name[$aTweet.children(".tweet").attr(SCREEN_NAME_ATTR)])
        || (block_regexp_for_body && $aTweet.find("p.js-tweet-text").text().match(block_regexp_for_body))
        || (block_regexp_for_profile_name && $aTweet.find("strong.fullname").text().match(block_regexp_for_profile_name))
  );

}

//GM_addStyle("div[@data-screen-name='xxxxx'] {background-color:blue;}");



GM_registerMenuCommand("ChangeSetting", function(){
  var $rootDiv = $("<div></div>");
  $rootDiv.css("zIndex",99999).css("position","fixed").css("top",10).css("left",10).css("background-color","#ffffff");
  
  var textareas = [{title:"list of blocking screen-name"   , key:KEY_BLOCK_SCREEN_NAME  , check:"text"},
    {title:"list of blocking profile-name(RegExp matching)", key:KEY_BLOCK_PROFILE_NAME , check:"regexp"},
    {title:"list of blocking tweet text(RegExp matching)"  , key:KEY_BLOCK_TEXT         , check:"regexp"}
  ];
  
  for(var i = 0; i < textareas.length; i++){
    $rootDiv.append("<p>"+textareas[i].title+"</p>");
    var $ta = $("<textarea key='"+textareas[i].key+"'></textarea>");
    $rootDiv.append($ta);
    $ta.val(GM_getValue(textareas[i].key));
  }
  
  var $okb = $("<input type='button' value='apply'></input>");
  var $cancelb = $("<input type='button' value='cancel'></input>");
  $("<div></div>").append($okb).append($cancelb).appendTo($rootDiv);
  $("body").append($rootDiv);

  $okb.click(function(){
    var $textareas = $rootDiv.find("textarea[key]");
    for(var i = 0; i < $textareas.length; i++){
      var text = $textareas.eq(i).val();
      switch(textareas[i].check){
        case "text":
          text = purifyTextList(text);
          break;
        case "regexp":
          text = purifyRegExpList(text);
          break;
      }
      GM_setValue($textareas.eq(i).attr("key"), text);
    
    }
    $rootDiv.remove();
    
    reloadSetting();
    reApplyFilter();
  });
    
  $cancelb.click(function(){$rootDiv.remove();});
});

function purifyTextList(text){
  var aList = [];
  text = text.replace(/\r\n/g, "\n");
  for(var i = 0, texts = text.split("\n"); i < texts.length; i++){
    var t = texts[i];
    if(t != ""){
      aList.push(t);
    }
  }
  return aList.join("\n");
}

function purifyRegExpList(text){

  var aList = [];
  text = text.replace(/\r\n/g, "\n");
  for(var i = 0, texts = text.split("\n"); i < texts.length; i++){
    var t = texts[i];
    if(t != ""){
      try{
        new RegExp(t);
        aList.push(t);
      }
      catch(e){
        alert(t +" is ignored (not RegExp string)" );
      }
    }
  }
  return aList.join("\n");

}

function _GM_getValue(key){
  var res = GM_getValue(key);
  if(null == res || undefined == res){
    GM_setValue(key,"");
    res = "";
  }
  
  return res;
}

function _GM_appendValue(key, value){
  var val = _GM_getValue(key);
  if(val){
    val = val+"\n"+value;
  }
  else{
    val = value;
  }
  
  GM_setValue(key, val);
}


function reloadSetting(){
  block_set_for_screen_name  = textlist2Set(_GM_getValue(KEY_BLOCK_SCREEN_NAME));
  block_regexp_for_profile_name = textlist2Regexp(_GM_getValue(KEY_BLOCK_PROFILE_NAME));
  block_regexp_for_body         = textlist2Regexp(_GM_getValue(KEY_BLOCK_TEXT));
}

function textlist2Regexp(text){
  if(text){
    return new RegExp("("+text.split("\n").join(")|(") +")",REGEXP_OPTION);
  }else{
    return null;
  }
}

function textlist2Set(text){
  if(text){
    var items = text.split("\n");
    var res = {};
    for(var i = 0, len = items.length; i < len; i++){
      res[items[i]] = 1;
    }
    return res;
  }else{
    return null;
  }
}


function traverseParent($elem,selector){
  if($elem.length == 0 ) {
    return null;
  }
  
  if($elem.filter(selector).length > 0){
    return $elem;
  }
  else{
    return traverseParent($elem.parent(), selector);
  }
}
