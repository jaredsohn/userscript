// ==UserScript==
// @name           NetflixQueueShuffle
// @namespace      com.noahsloan
// @description    Shuffles the Netflix queue.
// @include        http://www.netflix.com/Queue*
// ==/UserScript==

// choose an extremely unlikely variable name for the shuffle function
var shuffleFunc = "_com_noahsloan_netflix_shuffleQueue";

unsafeWindow[shuffleFunc] = function() {
  var $ = unsafeWindow.jQuery;
  function nextInt(max) {
    return Math.floor(Math.random() * max);
  }

  var movies = $('.qtbl tr.bd'), n = movies.length, order = [];

  order.swap = function(i,j) {
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  };

  for(var i = 1; i <= n; i++) {
    order.push(i);
  }

  while (--n > 0) {
    order.swap(n,nextInt(n + 1));
  }

  movies.find("input.o").each(function(i,input) {
    input.value = order[i];
  });
  // signal a change to the queue
  unsafeWindow.QUpdater.changeHandler({type:"queueChange"});
}

function getScript(url,callback) {
  var s=document.createElement('script');
  s.src=url;
  if(callback) {
      s.addEventListener('load',callback,false);
  }
  document.getElementsByTagName('head')[0].appendChild(s);
}

function addLink() {
    unsafeWindow.jQuery("#inqueue-header").append('<a href="#" onclick="'+
      shuffleFunc+'(); return false;">Shuffle</a>');
}

if(!unsafeWindow.jQuery) {
  getScript('http://code.jquery.com/jquery-1.1.2.js',function() {
    unsafeWindow.jQuery.noConflict();  
    addLink();   
  });  
} else {
  addLink();
}

