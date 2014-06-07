// ==UserScript==
// @name           YouTube Comments Sorter
// @namespace      http://griffeltavla.wordpress.com/2011/07/04/youtube-comments-sorting-and-threading/
// @description    Provides comment threading, aggregation and sorting in chronological and reverse order.
// @version        1.6.5
// @author         tinjon@gmail.com
// @include        http://www.youtube.com/watch?v=*
// @include        https://www.youtube.com/watch?v=*
// @require        http://code.jquery.com/jquery-1.7.1.js
// ==/UserScript==
// ============================================================================
// Adaptive CSS filter configuration (fixed various layout bugs caused by
// evolving youtube layout design, and interfering user scripts).
// ============================================================================
function init($) {
  var dynamicConfig = (function(){
    var getCommentsFilter = '#comments-view div ul > li.comment',
    authorFilter = [
      ".metadata .author .yt-user-name",               // DEFAULT filter for fetching comment authors, for the current youtube layout.
      ".metadata .author"                              // ALT filter to fetch a comment author in the old youtube layout (User reported feature impediment for threading).
    ].filter(function(expr){
      return $( expr, $(getCommentsFilter) )[0];
    });

    return {
      authorFilter          : authorFilter[0],
      getCommentsFilter     : getCommentsFilter
    };
  }());

  // ============================================================================
  // Global Helpers
  // ============================================================================
  var State = {
    reversed: false,
    threaded: false,
    cComments: 0
  };
  function log(){
    if(! $.browser.mozilla) return;
    var win = this.unsafeWindow || window;
    if(win.console) win.console.log.apply(this,arguments);
  }
  function getTotalComments(){
    var ret = "0", m;
    if (m=$('script:contains("COMMENTS_COUNT")').text().match(/'COMMENTS_COUNT':\s*(\d+)/) ) {
      $('<div id="total-comments">'+ m[1] +'</div>').hide().appendTo("body");
      ret = $("a strong:contains(All Comments)").parent().text().replace(/[\D]/g,'');
    }
    return parseInt(ret,10);
  }
  function getComments(doc){
    doc = doc || window.document;
    return $(dynamicConfig.getCommentsFilter,doc);
  }
  function setSeq(el,i){
    $(el).attr('oidx',-(i+1));
  }
  function getSeq(el){
    var s = $(el).attr('oidx');
    if(s) return parseInt(s,10);
  }
  function timeit(f,msg) {
    var st = new Date();
    f();
    log((msg || "duration")," :", (new Date()) - st);
  }
  function reIndent(factor){
    $('.comment[style*=margin-left]').each(function(){
      var comment = $(this), 
          indent = parseInt(comment.css('margin-left'),10);
      if(indent < 2) return;
      comment.css('margin-left',''+ Math.round(indent*factor) +'px');
    });
  }
  function showIndentControls(){
    $('.indent-control').show();
  }

  // Simple state keeping helper functions, to make the code syntax flow (communicate) intent better.
  function markThreaded(){
    State.treaded = true;
    showIndentControls();
  }
  function isThreaded(){
    return State.treaded;
  }
  function getUniqueArrayElems(arr){       // Apparently jQuery's "uniq" function is only designed for DOM elements, not arbitrary collections: http://bugs.jquery.com/ticket/7036
    var h = {}, ret=[], i, v;
    for(i=0; i<arr.length; i++){
      v = arr[i];
      if( h[v] ) continue;
      h[v] = true;
      ret.push(v);
    }
    return ret;
  }
  function getCommentScore(comment){
    return parseInt(comment.getAttribute('data-score') || "0", 10);
  }
  function filterCommentsByScore(threshold){
    getComments().each(function(){
      if(getCommentScore(this) < threshold) $(this).hide();
      else $(this).show();
    });
  }
  function populateFilterScores(){
    var comments = getComments(), scores, selected;

    if(State.cComments == comments.length) return;   // Prevent too frequent update of score filter box
    State.cComments = comments.length;

    scores = comments.map(function(){ return getCommentScore(this); });
    selected = $('#score-filter').val();

    $('#score-filter option').remove();
    getUniqueArrayElems(scores.get()).sort(function(a,b){ return a>b?1:a<b?-1:0; }).forEach(function(n){
      $('<option value="'+ n +'">'+ n +'</option>').appendTo('#score-filter');
    });
    $('#score-filter').val(selected);
  }
  // Allows processing of elements detached from the DOM (typically increases performance)
  function detached(nodes, cb){
    var parent = $(nodes).first().parent(),
        pp     = parent.parent(), ret, prev;
    if(pp.size() === 1) {
      prev     = parent.prev()[0];
      parent.remove();
      ret = cb();
      if(ret) {
        nodes.remove();
        $(ret).appendTo(parent);
      }
      if(prev) parent.insertAfter(prev);
      else     parent.prependTo(pp);
    }
    else cb();
  }
  // ============================================================================
  // Classes (object prototypes)
  // ============================================================================
  function ProgressBar(parentNode, updatePrefixText, donePrefixText) {
    var el = $('<div class="simple-progressbar" style="float:right;color:gray;padding-right:0.5em;padding-top:0.3em;"></div>');
    el.appendTo($(parentNode));
    return {
      delete: function(){
        el.remove();
      },
      update: function(pct){
        el.html( updatePrefixText.replace("{VALUE}", ""+ pct) );
      },
      done: function(processedCount){
        el.html( donePrefixText.replace("{VALUE}", ""+ processedCount) );
        el.css('color','green');
      }
    };
  }
  /**
   * Fetches all comment pages and concatinates the result onto the page from
   * which this script was triggered.
   *
   * The fetching occurs in parallel and once all pages have been retrieved,
   * the comments are re-ordered according to the page number they were found on,
   * so as to appear in the correct order (reverse chronological which Google in
   * its infinite wisdom decided was the optimal order to follow a discussion !?)
   */
  function CommentFetcher() {
    var htmlPages = [], progressBar,
        comments  = $('#all-comments .comment'),
        container = $('ul[id="all-comments"]:last')[0],
        maxPages  = Math.floor( getTotalComments() / 500 ) + 1;

    function createAllPageUrl(){
      var base = window.location.href.split("/").slice(0,3).join("/");
      if( /v=([^&]+)/.test(window.location.href) ) {
        return base + "/all_comments?v=" + RegExp.$1;
      }
    }
    function addPageSection(html, pageNo) {
      var s;
      if( /<ul id="all-comments".*?(<li class=.+<\/li>).*?<div class="comments-pagination"/.test(html.replace(/\n/g,'\0')) ) {
        s = RegExp.$1;
        htmlPages[pageNo] = s.replace(/\0/,'\n');
      }
    }

    function fetchPages(){
      var i, urls = [], baseUrl = createAllPageUrl();

      for(i=1; i <= maxPages; i++){
        urls.push( baseUrl +"&page="+ i );
      }
      urls.forEach(function(url, pageNo){
        $.get(url).success(function(html){
          var pct = Math.round( (pageNo+1) * 100 / maxPages );
          addPageSection(html, pageNo);
          updateProgress(pct);
        }).fail(function(){
          log("failed to get: "+ url);
        });
      });

      $(document).ajaxStop(function() {                         // When all ajax requests have completed.
         container.innerHTML = htmlPages.join(" ");
         progressBar.done(getComments().size());
         $('.yt-user-photo img[data-thumb]').each(function(){   // Fix the avatar thumbnail links
           this.src = this.getAttribute('data-thumb');
         });
      });
    }
    function updateProgress(pct){
      progressBar.update(pct);
    }
    return {
      start: function(){
        $('ul[id="all-comments"]:last').html("");                   // Empty the first partially filled comments list. Only applicable on the video page.
        $('.comments-pagination').remove();                 // Remove pagination UI controls
        comments.remove();                                  // Remove comments currently on the page

        updateProgress(0);
        fetchPages();
      },
      setProgressBar: function(bar) {
        progressBar = bar;
      }
    };
  }
  function CommentSorter(){
    var chronological = false;
    function assignOriginalSeqNo(comments){
      comments.each(function(i){
        if( !getSeq(this) ) {
          setSeq(this,i);
        }
      });
    }
    function sortComments(comments){
      detached(comments, function() {
        assignOriginalSeqNo(comments);         // New comments might have been added, so let's make sure we have all numbered.
        // About 4x slower than naive sort based on array-index (array position),
        // but in total, with all three steps in this function summed, only a 60%
        // latency increase is yielded.
        return comments.sort(function(a,b){
          a = getSeq(a); b = getSeq(b);
          if(chronological) {                  // Not best practice to branching in-loop, but it saves LOCs.
            return a > b ?  1 : a < b ? -1 : 0;
          } else {
            return a > b ? -1 : a < b ?  1 : 0;
          }
        });
      });
    }
    return {
      reverse: function(){
        chronological = !chronological;
        this.sort();
      },
      sort: function(){
        var comments = getComments();
        sortComments(comments);
      },
      applicable: function(){
        return getComments().size() > 0;
      },
      isChronological: function(){
        return chronological;
      }
    };
  }
  // Own implementation of the Map interface since Javascript can't store objects as keys.
  function Map(){
    var keys   = [],
        values = {};
    return {
      put: function(k,v){
        var ki;
        if((ki = keys.indexOf(k)) === -1) {
          keys.push(k);
          ki = keys.length - 1;
        } else {
          keys[ki] = k;
        }
        values[ki] = v;
      },
      get: function(k){
        var ki;
        if((ki = keys.indexOf(k)) === -1) {
          return;
        }
        return values[ki];
      },
      clear: function(){
        keys=[];
        values={};
      }
    };
  }
  function threadComments() {
    var postsByAuthor = {};
    var cache = Map();
    function getAuthor(comment){
      return $.trim($(dynamicConfig.authorFilter,comment).text());
    }
    function getAt(comment){
      var el = $(".comment-actions a.yt-user-name",comment);
      var s = el.text().trim();
      if(s.length > 0) return s;
    }
    function getParent(comment){
      var atAuthorPosts = postsByAuthor[ getAt(comment) ];
      if(! atAuthorPosts) return;
      var atAuthorPost, i, j, atPostSeq, refSeq = cache.get(comment);
      if(State.reversed) refSeq *= -1;
      for(i=0, j=-1; i < atAuthorPosts.length; i++) {  // Iterate over all the referenced author's comments
        atAuthorPost = atAuthorPosts[i];
        atPostSeq    = cache.get(atAuthorPost);  // Pick the closest at-author comment posted before *this* comment and treat it as the parent.
        if(State.reversed) atPostSeq *= -1;
        if( atPostSeq < refSeq ) {               // A parent must have been posted before *this* comment. (have a lower seq-no)
          j=i;
          break;
        }                                        // If not a parent post, then check the next comment by the at-author
      }
      return atAuthorPosts[j];                   // index will be the closest at-author comment or null of no match was found,
    }                                            // thus regarded the parent of *this* comment.
    var comments = getComments().sort(function(a,b){   // Sort chronological
      a = getSeq(a); b = getSeq(b);
      return a > b ?  1 : a < b ? -1 : 0;
    });
    comments.each(function(){
      cache.put(this,getSeq(this));
      var author = getAuthor(this);
      if(! author) return;
      if(! postsByAuthor[author] ) postsByAuthor[author] = [];
      postsByAuthor[author].push(this);
    });
    // build tree
    detached(comments,function(){          // 10% speedup in Chrome and 40% in Firefox.
      comments.each(function(){
        var atAuthor, parent, parents=[], topAncestor,node,level;
        if(atAuthor = getAt(this)) {
          if(parent = getParent(this)) {
            parents.push(this);
            while(parent) {
              parents.push(parent);
              parent = getParent(parent);
            }
            parents = parents.reverse();   // Make the order in the proper indent-order
            topAncestor = parents.shift(); // Remove top ancestor so we can build a thread underneath that node.
            $(parents).remove();           // Remove top ancestor's children from DOM so we can inject them all underneath the top parent.
            level = parents.length;
            node = topAncestor;
            while(node) {
              if(parents[0]) {                   // Check that there are still parents left to append the node to.
                $(parents[0]).insertAfter(node);
              }
              node = parents.shift();
            }
            $(this).css('margin-left',''+ level*2 +'em');
          }
        }
      });
    });
  }
  // ============================================================================
  // Wiring function
  // ============================================================================
  function createUI(){
    var uiAnchor = $('<div class="custom-controls"></div>').insertBefore('#comments-view'),
        sorter  = new CommentSorter(),
        fetcher = new CommentFetcher(function(){            // Called when all comments have been fetched
          if(isThreaded()) {
            sorter.sort();
            threadComments();
          }
        });
    $('<style type="text/css">'+
      '.custom-controls { border:1px solid #BBBBBB; margin-top:0.5em; margin-bottom:0.5em; padding:0.5em; }'+
    '</style>').appendTo('head');

    // Allways show the fetch button
    var fetchButton = $('<input type="button" class="yt-uix-button-default" value="Fetch all" title="Fetch all comments. [ Warning: On pages with thousands of comments it make your browser choke / freeze from too much information ]"></input>');
    fetchButton.appendTo(uiAnchor).click(function(){
      var bar = new ProgressBar(
        uiAnchor,
        "Comment fetching in progress: {VALUE} %",
        "Comments found: {VALUE}"
      );
      fetcher.setProgressBar(bar);
      State.reversed = true;
      fetchButton.remove();
      fetcher.start();
    });
    if( sorter.applicable() ) {
      var threadButton = $('<input type="button" class="yt-uix-button-default" value="Thread"></input>');
      threadButton.appendTo(uiAnchor).click(function(){
        sorter.sort();
        threadComments();
        markThreaded();
        threadButton.remove();
      });
    }
    if( sorter.applicable() ) {
      var sortButton = $('<input type="button" class="yt-uix-button-default" value="Reverse order"></input>');
      sortButton.appendTo(uiAnchor).click(function(){
        sorter.reverse();
        if(isThreaded()) threadComments();
      });
    }
    var removeAvatarButton = $('<input type="button" class="yt-uix-button-default" value="Hide avatars" title="Reduces noise by removing the leading avatar images in front of the comments."></input>');
    removeAvatarButton.appendTo(uiAnchor).toggle(function(){
      $('<style id="hideAvatarStyle" type="text/css">'+
           'ul .yt-user-photo {display:none !important}'+
           'ul .comment .content {margin-left:0px !important;}'+
        '</style>').appendTo('body');
      $(this).val('Show avatars');
    }, function(){
      $('#hideAvatarStyle').remove();
      $(this).val('Hide avatars');
    });

    // Threading indentation controls    
    $('<input type="button" class="yt-uix-button-default indent-control" value="&lt;" title="Decrease thread indentation"></input>')
    .appendTo(uiAnchor).hide().css('margin-left','1em')
    .click(function(){ reIndent(0.5); });

    $('<input type="button" class="yt-uix-button-default indent-control" value="&gt;" title="Increase thread indentation"></input>')
    .appendTo(uiAnchor).hide()
    .click(function(){ reIndent(2); });

    if(getComments().length > 0) {
      $('<select id="score-filter" title="Hide all comments with a thumbs score below the chosen value"></select>')
      .appendTo(uiAnchor)
      .attr('style','float:right;')
      .change(function(){
        filterCommentsByScore( parseInt(this.value,10) );
      }).mouseover(populateFilterScores);
      populateFilterScores();
    }

  }
  State.reversed = false;
  createUI();
}
// Bootstrap code
function addScript(url, cb){
  var el = document.createElement('script');
  el.setAttribute('type','text/javascript');
  el.setAttribute('src',url);
  el.addEventListener('load',cb);
  document.body.appendChild(el);
}

// As per a change to youtube in 2013 the rendering of the entire comments DOM has
// become asynchronous, which means that the neither the comments nor their container
// exist when the browser flags the document as fully loaded (usual issue with async
// operations in other words). So we need to initialize "when the time is right".
function asyncInit($) {
  if(document.getElementById('comments-view')) {  // Check whether or not comments have been loaded.
    init($)                                       // Goody, we're all set, let's go.
  } else {
    setTimeout(function(){ asyncInit($); }, 10);  // Not loaded yet, keep checking until it is.
  }
}

// If Chrome, we need to add jquery ourselves :(
if(/webkit/i.test(window.navigator.userAgent)) {
  addScript('http://code.jquery.com/jquery-1.7.1.min.js',function(){
    asyncInit(jQuery);
  });
} else asyncInit($);

