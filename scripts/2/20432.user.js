// ==UserScript==
// @name           ibdof newposts filter
// @namespace      http://www.ibdof.com/
// @description    replaces "ibdof search_exclude-forum" - (FF,IE7,Opera)  select a forum to exclude from "View posts since last visit", saves/reads the forumID (Opera=cookie)
// @include        http://www.ibdof.com/*
// @version     20080619
// ==/UserScript==

(function() {
  var namespace="gollum.greg.";var setValue,getValue,remValue;/*if(window.globalStorage){var D=globalStorage.namedItem(namespace+document.domain);setValue=function(A,B){D.setItem(A,B);};getValue=function(A,C){var B=D.getItem(A);return(B)?B.value:C;};remValue=function(A){D.removeItem(A);};}else */if((typeof GM_setValue!="undefined")&&(typeof GM_getValue!="undefined")){setValue=function(A,B){GM_setValue(namespace+A,B);};getValue=function(A,C){var B=GM_getValue(namespace+A,C);return(B)?B:C;};remValue=function(A){GM_setValue(namespace+A,"");};}else if((typeof PRO_setValue!="undefined")&&(typeof PRO_getValue!="undefined")){setValue=function(A,B){PRO_setValue(namespace+A,B);};getValue=function(A,C){var B=PRO_getValue(namespace+A);return(B)?B:C;};remValue=function(A){PRO_setValue(namespace+A,"");};}else{setCookie=function(A,C,B){if(!A){return;}document.cookie=escape(namespace+A)+"="+escape(C)+";expires="+(new Date((new Date()).getTime()+(1000*B))).toGMTString()+";path=/";};setValue=function(A,B){setCookie(A,B,31536000);};getValue=function(A,B){A=(new RegExp(namespace+A+"=([^;]*)")).exec(document.cookie+";");if(A[1]!="undefined"){return A[1];}else{return B;}};remValue=function(A){setCookie(A,"",-10);};}

  /* x-browser event register */
  function addListener(obj, ev, fn, p) {
    if (obj.addEventListener) obj.addEventListener(ev, fn, p);
    else obj.attachEvent("on"+ev, fn);
  }

  /* x-browser detection of event target */
  function getTarget(e) {
    var targ;
    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug (from ppk) 
    return targ;
  }
  
  /* for each forum in the table insert a clickable graphic(trashcan)
      the user clicks one of these to store that forum id
      as the forum they wish to exclude form "View posts since last visit" */
  function filterSetup() {
    var forum = document.getElementsByTagName('a');
    for ( var i = 0; i < forum.length; i++ ) {
      var fmatch = forum[i].href.match( /viewforum\.php\?f=(\d+).*$/  );
      if ( fmatch )  {
        var fsave = document.createElement('img');
        fsave.title = "Exclude this forum from 'View posts since last visit'.";
        fsave.src ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVBgZBcE9b01hAADg55x72mrdnqrE1SCkCUEivu7SxGKppGMHNhKj2KRisYkY2MTcRFQMGh8/QGLxMRikJklJkN5B0N72cu95z3uO50lqAAAAQAYACxP16KF8vhotvxSPNgfF/QFJDWBhOF7Yfyk9EXemRn73P359GJce1BkA1Y1918+MtxSiRmtrtjfzc9qtpAYvkmhl4/L4pNKGnglDfng6uLMt42WjOhD3xOGTzQ/acpVa0PDe5AgZ1eF4szxbNvvJlHeCTKEhOOUVsmfNeO/Y3G5D1q3giERUWreuQFqea81N+acvN2Pcqu0SYzpqAWm4Mu2XTV1bEm2raqmGQi0gDbsy3/X19fzV1PUHFKKAtPjWc1THJ109DAxUKkGlRFo8+azpuNNyBNEOlVrDmID06uOV5ddyuVFj3jioZa/crI5yjYzi/Nvl7nxbJXheN5O7SqUY4lpsk9Tg2sVwu+yUm+XS4iIA8B+6i5xffIyBpQAAAABJRU5ErkJggg==';
        fsave.setAttribute('id', fmatch[1]);
        fsave.style.marginRight = '5px';
        fsave.style.cursor = 'crosshair';
        forum[i].parentNode.insertBefore(fsave, forum[i]);
        addListener(fsave, "click", function(e) {setValue('forum-exclude', getTarget(e).id)}, false);
      }
    }
  }

  /* select a Forum to exclude
      when a forum listing is displayed [index.php] then prepend all the forum titles with a trashcan and 'listen' for a click event
      clicking on the trashcan saves that forum ID for use by the "newposts" filter
      */
  if (/^\/$/.test(location.pathname) || /index.php/i.test(location.pathname)) {
    if ( window.opera ) // load event already happened when Opera calls(loads) the script
      filterSetup();
    else
      addListener( window, "load", filterSetup, false );
  }
  
  /* newposts link
      find the "newposts" link and 'listen' for a click event
      when clicked, retrieve the saved filter ID and rebuild the link to use the forum-filter as an exclusion
      */
  if (/^\/$/.test(location.pathname) || /(index|portal|viewtopic).php/i.test(location.pathname)) {
    var a = false;
    if (/^\/$/.test(location.pathname) || /index.php/i.test(location.pathname))
      a = document.getElementsByTagName('table')[2].getElementsByTagName('td')[1].getElementsByTagName('a')[0];
    else if (/portal.php/i.test(location.pathname))
      a = document.getElementsByTagName('table')[19].getElementsByTagName('a')[2]
    else if (/viewtopic.php/i.test(location.pathname))
      a = document.getElementsByTagName('table')[3].getElementsByTagName('td')[2].getElementsByTagName('a')[0];

    if (a) {
      addListener( a, "mouseover", function(e) { // display a hover tip showing the link as it will be executed (includes the forum being excluded)
        getTarget(e).title = 'http://www.ibdof.com/search.php?search_id=newposts&excl_forum=' + getValue('forum-exclude', '')
      }, false );
      addListener( a, "click", function(e) { // a simple click on "View posts..." construct the link
        getTarget(e).href = 'http://www.ibdof.com/search.php?search_id=newposts&excl_forum=' + getValue('forum-exclude', '')
      }, false );
      addListener( a, "mousedown", function(e) { // a click plus modifier keys ie. ctrl/shift/alt-click --- same as above, construct the link
        var ek = (e) ? e : window.event;
        if (ek.altKey||ek.ctrlKey||ek.shiftKey)
          getTarget(e).href = 'http://www.ibdof.com/search.php?search_id=newposts&excl_forum=' + getValue('forum-exclude', '')
      }, false );

      /* create a reset graphic(trashcan) so the user can drop(clear) any pre-existing filter
                    insert in front of the "View posts..." link */
      var fdel = document.createElement('img');
      fdel.title = "Clear the 'forum-exclude' filter";
      fdel.src ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVBgZBcE9b01hAADg55x72mrdnqrE1SCkCUEivu7SxGKppGMHNhKj2KRisYkY2MTcRFQMGh8/QGLxMRikJklJkN5B0N72cu95z3uO50lqAAAAQAYACxP16KF8vhotvxSPNgfF/QFJDWBhOF7Yfyk9EXemRn73P359GJce1BkA1Y1918+MtxSiRmtrtjfzc9qtpAYvkmhl4/L4pNKGnglDfng6uLMt42WjOhD3xOGTzQ/acpVa0PDe5AgZ1eF4szxbNvvJlHeCTKEhOOUVsmfNeO/Y3G5D1q3giERUWreuQFqea81N+acvN2Pcqu0SYzpqAWm4Mu2XTV1bEm2raqmGQi0gDbsy3/X19fzV1PUHFKKAtPjWc1THJ109DAxUKkGlRFo8+azpuNNyBNEOlVrDmID06uOV5ddyuVFj3jioZa/crI5yjYzi/Nvl7nxbJXheN5O7SqUY4lpsk9Tg2sVwu+yUm+XS4iIA8B+6i5xffIyBpQAAAABJRU5ErkJggg==';
      fdel.style.marginRight = '5px';
      fdel.style.cursor = 'crosshair';
      addListener(fdel, "click", function() {remValue('forum-exclude');}, false); // clear any saved filter
      a.parentNode.insertBefore(fdel, a);
    }
  }
})();

