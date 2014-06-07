// ==UserScript==
// @name           We7Twitter
// @namespace      beadza
// @description    Click to Tweet your We7 plays
// @include http://www.we7.com/player/*
// @exclude http://www.we7.com/player/box
// ==/UserScript==

//nab jQuery from the player frame
var $j = unsafeWindow.jQuery;

var tweet = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAIGNIUk0AAHolAACAgwAA%2Bf8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAIrSURBVDhPfVJfSFNxFP6NrBxRvvvSkw%2F1UlT0GvRaD%2BFbGBQRFaMHEYI10lYKuVgaC1HW9U8SiUoGQa1mRDoMZ4hgLefW%2FDfXNtdsd7t5Q9vv67uuOR%2BiA9%2B953fP%2Bc53fucek1eVVZNZ8d6801SZ3xD%2FNZNJCLmL0IVD3IzIuC8HLPwCwmtA8C9CWh7BNwOY9fYjlNERHB5E8EUPwuoaXMuk2qLARBaY0wswfANTQ24kGvcj%2FfAAoo4TSDmrELNW4pNyC0oSEDciwLiKLftA%2F2UamHRewPzlvYjWVmC5rgKLln0I1%2BzBlL2aiiQ2zAO%2BTIn4WQPerrLY42YETpVj5owZM9VmBE6XY%2Frkbox2NKCFXYqmBWCYiUWTdPJ8rGs5BC4dwcejZZvwHy7D2LlD6I9k0LJEomMRePW9RNzu6ckYJs4fx7uDO%2BA9ewyd0zG0s827FBMuyvbES%2BkjP4A%2BXn5wBXiaAFpnNbR1duH2Fw12XsvGmdwxiMo3oHsbsZd%2BbQiwfi2gfg5oJGELJLUarRpVu0jWfxdUU%2BvAGIflo%2FIosanK6xTxgB26YyQOrUj2LeHnv%2FuXpVnIzXgRCv0ncQnh4UTbSXamJDyaxNIGkKR6ijDe4z%2BBDiYW0ZuQeMZ84eeqDXCqCon3VyXq2aaFS3CVHVzjKtYRNp7tjLnSEt3Me82YCOTQ7FGl1peVaCOauADXqXKFO3uRsNC38ts9FnikSjzneSST9%2F0BGYF3DRoUpYAAAAAASUVORK5CYII=';

$j("#your-queue").css("left","229px");
$j("#your-playlists").css("left","320px");
$j("body").append("<div id='tweet' style='overflow: hidden; position: absolute; display: block; left: 241px; top: 35px; width: 22px; height: 19px;' id='tweet' class='tab'><span><img title='Tweet This' alt='Tweet This' src='"+tweet+"' /></span></div>")

$j("#tweet").click(function(){
    if (unsafeWindow.Player.trackId) {
      var message = getTwitterMessage();
      var url = "http://we7.com/api/play/track?q=" + unsafeWindow.Player.trackId;
      window.open("http://twitter.com/home/?status="+escape(message)+"♫"+ escape(" "+url)));
      unsafeWindow.Stats.event("twitterbutton");
    }
  }
).hover(function(){
  $j(this).css("left","182px").css("width","81px").addClass('tab-hover').html("<span>Tweet This! <img title='Tweet This' alt='Tweet This' src='"+tweet+"' style='vertical-align:text-top'/></span>");
},function(){
  $j(this).css("left","241px").css("width","22px").removeClass('tab-hover').html("<span><img title='Tweet This' alt='Tweet This' src='"+tweet+"' /></span>");
});

function getTwitterMessage() {
    return "Listening to " + unsafeWindow.Player.track.title + " by " + unsafeWindow.Player.track.artist.name + " on #we7 ";
};
