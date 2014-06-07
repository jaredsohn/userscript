// ==UserScript==
// @name       BGG Img Viewer
// @namespace    BGGImgViewer
// @description  browse BGG image(embeded a link) by a Popup Image Viewer
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @include    http://boardgamegeek.com/*
// @include    http://www.boardgamegeek.com/*
// ==/UserScript==
// 
//  changelog:

BGGIV = 
{
  thumbImgs: [],

  mdImgs: [],

  imgSelector : "#module_10 a>img, #main_content .forum_table a>img, #minigallery_status a>img",

  v : null,

  isMouseOver: false,

  margin: 20,

  imageSize: {ORIGINAL: '', MIDDLE: '_md', LARGE: '_lg'},

  tryRules: function(size) 
  {
    if (undefined == size) size = BGGIV.imageSize.MIDDLE;
    var replace_str = size + '.';
    return [
      [/_mt\./, replace_str],
      [/_t\./, replace_str],
      [/_sq\./, replace_str],
      [/_t\./, replace_str]
    ]
  },

  initjQuery: function()
  {
    var s=document.createElement('script');
    s.src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js';
    document.body.appendChild(s);
  },

  init : function()
  {
    var viewer = $("#bggiv");
    if (viewer == undefined || viewer.length === 0)
    {
      viewer = $('<div id="bggiv" style="display:none;padding:2px;background-color:gray;"><img style="" /></div>');
      $("body").append(viewer);
      $('img', viewer).click(function(){ viewer.hide(); });

      BGGIV.v=viewer;

      //bind mousemove
      $(document).bind('mousemove', function getCursorPos(e)
      {
        if (BGGIV.isMouseOver)
        {
          //console.log('e-x:'+e.pageX + ', e-y:'+ e.pageY);
          var p = BGGIV.calcViewerPos({x:e.pageX, y:e.pageY});
          BGGIV.v.css({position: 'absolute', top : p.y + 'px', left: p.x + 'px' });
          BGGIV.v.show();
        }
        else
          BGGIV.v.hide();
      });
    }
    else
      BGGIV.v=viewer;

    document.addEventListener('DOMNodeInserted', BGGIV.loadWhenDOMNodeInserted, false);
    //document.addEventListener('DOMNodeInserted', BGGIV.load, false);

  },

  loadWhenDOMNodeInserted : function(e)
  {
    //load script when Autopagerize or AutoPatchWork actived !
    if (e.target && e.target.nodeName.toUpperCase() !== 'IMG')
      BGGIV.load();
  },

  calcViewerPos : function(cursorPos)
  {
    var x = cursorPos.x, y = cursorPos.y;
    var viewWidth = window.innerWidth,
        viewHeight = window.innerHeight,
        offsetY = window.pageYOffset;
    //console.log('cursor X = ' + x + ' ,cursor Y = ' + y);
    var _x = (x > viewWidth/2) ?  x - BGGIV.margin - BGGIV.v.width() : x + BGGIV.margin;
    var _y ; 
    //console.log('c-y = ' + (y - offsetY));
    if (y - offsetY < viewHeight/4)  // 1/4
    {
      _y = y + BGGIV.margin;
      //console.log(1);
    }
    else if (y - offsetY > viewHeight*3/4)  // 3/4
    {
      _y = y - BGGIV.margin - BGGIV.v.height() 
      //console.log(3);
    }
    else
    {
      _y = y - BGGIV.v.height()/2; 
      //console.log(2);
    }

//console.log(_x + ',' + _y);
    return {x:_x, y:_y};
  },

  setImgPath : function(s)
  {
    BGGIV.v.find('img').attr('src', s);
    //BGGIV.v.css({position: 'fixed', 'top': '0px', 'right' : '0px'});
    //BGGIV.v.show("fast");
  },

  go : function()
  {
    //if (false === /Firefox/i.test(navigator.userAgent))
    //  BGGIV.initjQuery();
    BGGIV.init();
    BGGIV.load();
  },

  load : function(img)
  {
    var imgs = $(BGGIV.imgSelector);
    $(imgs).each(function(){
      BGGIV.tryToGetTargetImgSrc($(this));
    });

    imgs.hover(
      function()
      {
        //BGGIV.getTargetImgSrc($(this));
        BGGIV.setImgPath(BGGIV.tryToGetTargetImgSrc($(this)));
        BGGIV.isMouseOver = true;
      }, 
      function()
      {
        //BGGIV.v.hide();
        BGGIV.isMouseOver = false;
    });
  },

  tryToGetTargetImgSrc : function(imgNode)
  {
    var tImgSrc = $(imgNode).attr('src');
    var origImgSrc = tImgSrc.replace(/_\w*\./, '.');
    $.each(BGGIV.tryRules(), function()
    {
      var rule = $(this);
      if (rule[0].test(tImgSrc))
      {
        tImgSrc = tImgSrc.replace(rule[0], rule[1]);
        return false;
      }
    });

    var imgAnchor = $(imgNode).closest('a');
    if (0 == imgAnchor.find('.bggiv').length)
    {
      $('<img class="bggiv" style="display:none;" />')
        .attr('src', tImgSrc)
        .bind('error', function() {
          //if target image does not exist, show original img
          $(this).attr('src', origImgSrc);
          //console.log('[BGGIV] Target image does not exist!. Try to load original image : ' + origImgSrc);
        })
        .appendTo(imgAnchor);
    }
    else
      tImgSrc = $('.bggiv', imgAnchor).attr('src');

    return tImgSrc;
  },

  // retrieve true image uri immediately
  getTargetImgSrc : function(imgNode)
  {
    var link = BGGIV.getLink(imgNode);
    /\/image\/(\d+)\//.test(link);
    var n = RegExp.$1;
    var content = "";
    var callback = function(o)
    {
      var _true_img = $(o).find('#main_content img').filter(function()
      {
        return (new RegExp(n)).test($(this).attr('src'));
      }).eq(0);
      BGGIV.setImgPath(_true_img.attr('src'));
    };
    $.get(link, callback);
  },

  getLink : function(img)
  {
    return (img == undefined) ? "" : $(img).closest('a').attr('href');
  },

  getLinks : function(imgs)
  {
    if (imgs == undefined) imgs = this.thumbImgs;

    var links = [];
    for (var i=0,len=imgs.length; i<len; i++)
    {
      links.push($(imgs[i]).closest('a').attr('href'));
    }
    return links;
  },

  getImgNodes : function()
  {
     $(BGGIV.imgSelector).each(function(){
       thumbImgs.push(this);
     }); 
     return thumbImgs;
  }
};
BGGIV.go();

// load jQuery and execute the main function
//addJQuery(BGGIV.go);

