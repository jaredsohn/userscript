// ==UserScript==
// @name       Herpty Derp Comments
// @namespace  http://eric.lammertsma.com/herptyderpcomments
// @version    0.2.1
// @description  Replaces comments on YouTube, 500px, etc with less grating and more accurate "herpty derp" comments.
// @match      http://*/*
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*
// @include     http://youtube.com/*
// @include     https://youtube.com/*
// @include     https://apis.google.com/*/comments*
// @exclude		http://*.stackoverflow.com/*
// @exclude		http://stackoverflow.com/*
// @exclude		http://*.superuser.com/*
// @exclude		http://superuser.com/*
// @copyright  2012+, Eric Lammertsma
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

    var rGoogleUrl = /^https?:\/\/apis\.google\.com\/.+\/comments.+YOUTUBE.+/;

    function inFrame() {
        return window !== window.top && window.location.href.match(rGoogleUrl) != null;
    }

function randomDerp() {
  
    this.derpOriginal = $(this).html();
    this.derpDerped = '<p>herpty derp.</p>';
    this.showingDerped = true;
/*
    console.log($(this).className + ' is showing derped text? ' + this.showingDerped);
    console.log($(this).className + ' orignal text? ' + this.derpOriginal);
    console.log($(this).className + ' derped text? ' + this.derpDerped);
*/
    
    
    $(this).click(function() {
        if(this.showingDerped) {
      		$(this).html(this.derpOriginal);
            this.showingDerped = false;
    		console.log($(this).className + ' is showing derped text? ' + this.showingDerped);
    		console.log($(this).className + ' orignal text? ' + this.derpOriginal);
    		console.log($(this).className + ' derped text? ' + this.derpDerped);
        } else {
      		$(this).html(this.derpDerped);
            this.showingDerped = true;
		    console.log($(this).className + ' is showing derped text? ' + this.showingDerped);
    		console.log($(this).className + ' orignal text? ' + this.derpOriginal);
    		console.log($(this).className + ' derped text? ' + this.derpDerped);
        }
    });
    
    var randomLength = (Math.floor(Math.random()*20)+1);
    var wordArray = new Array();

    for(var x = 0; x < randomLength; x++) {

      randomBit = (Math.floor(Math.random()*2));
      randomExt = (Math.floor(Math.random()*30));

      if(randomBit == 1) {
        wordArray[x] = 'herp';
      } else {
        wordArray[x] = 'derp';
      }

      if(randomExt < 4 && x+1 < randomLength) {
        wordArray[x] += 'a';
      } else if(randomExt > 26 && x+1 < randomLength) {
        wordArray[x] += 'ty';
      } else if(randomExt == 4 && x+1 < randomLength) {
        wordArray[x] += '!';
      } else if(randomExt == 5 && x+1 < randomLength) {
        wordArray[x] += '?';
      } else if(randomExt == 6 && x+1 < randomLength) {
        wordArray[x] += '.';
      } else if(randomExt == 7 && x+1 < randomLength) {
        wordArray[x] += ',';
      }

      if(x+1 == randomLength){
          randomEnd = (Math.floor(Math.random()*30));
          if(randomExt < 15) {
            wordArray[x] += '.';
          } else if(randomExt > 25) {
            wordArray[x] += '!';
          } else if(randomExt == 16) {
            wordArray[x] += '?';
          }
      }
    
    }

    this.derpDerped = '<p>' + wordArray.join(' ') + '</p>';
    
    // add derped class
    $(this).addClass('derped');
    $(this).addClass(''+Math.floor((Math.random()*100000000)));
    
	if ( inFrame() ) {
    	return window.top.postMessage(this.derpDerped);
    } else {
    	//return 'x';
		return this.derpDerped;
		//return '<p>' + wordArray.join(' ') + '</p>';
    }
}

// only select un-derped elements
$('.comment-text, p.ctx, #comments .comment .body_text, #comments .comment-body, .ccomment div.text, div.Ct, div#comments-test-iframe').not('.derped').html(randomDerp);
//$('#watch-discussion').removeAttr('data-scrolldetect-callback');
//$('#watch-discussion').removeClass('scrolldetect');

setInterval(function() {
  // only select un-derped elements
  $('.comment-text, p.ctx, #comments .comment .body_text, #comments .comment-body, .ccomment div.text, div.Ct, div#comments-test-iframe').not('.derped').html(randomDerp);
  //$('#watch-discussion').removeAttr('data-scrolldetect-callback');
  //$('#watch-discussion').removeClass('scrolldetect');
}, 100);