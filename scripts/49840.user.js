// ==UserScript==

// @name           PopupX

// @namespace      http://userscripts.org/users/45256

// @description    browse image(embeded a link) by a Popup Image Viewer

// @include        http://*.pixnet.net/album/*

// @include        http://photo.pchome.com.tw/*

// @include        http://www.wretch.cc/album/*

// @include        http://www.wretch.cc/album/

// @include        http://www.wretch.cc/blog/*

// @include        http://picasaweb.google.com*

// @include        http://album.blog.yam.com/*

// @include        http://gnn.gamer.com.tw/*

// @include        http://*nownews.com*/*

// @include        http://2cat.twbbs.org/*

// @include        http://komica*.dreamhosters.com/*

// @include        http://blog.roodo.com/*

// @include        http://iphonecake.com/*

// @include        http://*.flickr.com/*

// @include        http://*.engadget.com/*

// @include        http://www.facebook.com/album.php*

// @include        http://class.ruten.com.tw/*





// ==/UserScript==

// 

//  changelog:
//  2010/02/25 -
//    * support website: class.ruten.com.tw
//    * modify toolbox style

//  2009/07/23 -

//    * support website: www.facebook.com/ profile.php & album.php

//    * fixed toolbox style: set width

//  2009/06/14 -

//    * fixed website pattern: Gamer GNN

//    * some style changed.

//  2009/06/03 -

//    * support website: *.engadget.com

//  2009/05/28 -

//    * append a toolbox at top-left

//    * add a option: shrink image

//	2009/05/27 -

//	  * fixed pattern for yam

//  2009/05/24 -

//    * support website: iphonecake.com, *.flickr.com

//    * add reload button.

//    * compatible with google chrome (bookmarklet).





(function(){



var __fit = false;

var PopupImage = 

{

  

  //樣式集

  data : 

  [

    //Pixnet相簿

    [ 

      /.*\.pixnet\.net\/album\//,

      /\/thumb_/,

      '/',

      '//*[@id="contentBody"]//img[@class="thumb"]' 

    ],

    //PCHome Photo

    [

      /photo\.pchome\.com\.tw/,

      /s\./,

      '.',

      '//span[@class="PostponeImg Cover"]'

//      '//span/img[1]'

    ],

    

    //無名個人相簿

    [

      /www\.wretch\.cc\/album\/.+/,

      /thumbs\/t/,

      '',

      '//*[@class="side"]/a/img[1]' 

    ],

    //無名相簿首頁

    [

      /www\.wretch\.cc\/album\/$/,

      /thumbs\/t/,

      '',

      '//*[@class="image_link"]/a/img[1]'    //'.image_link >a>img:first-child'

    ],

    //無名blog頁面

    [

      /www\.wretch\.cc\/blog\/.+/,

      /http:\/\/([\w\W]+cover\/)([\w\W]+)_\w+([\w\W]*)$/,

      'http://cover.wretch.cc/$2$3',

      "//*[@class='boxMySpaceImg' or @class='bighead' or @id='whowrapper']//img[1]"

      //'a.bighead>img:first-child, #whowrapper a img, #boxMySpace .boxMySpaceImg a img'      

    ],

    //Picasaweb

    [

      /picasaweb\.google\.com(\.tw)?\/\w+/,

      /\/(s\d{2,4})(\-\w+)?\//,

      '/s640/',

      "//a/img[1]"    //'a>img:first-child'

    ],

    //Yam   

    [

      /album\.blog\.yam\.com\/\w+/,

      /\/album\/[\w]_/,

      '/album/',

      "//*[@class='photoimg' or @class='albumShow' or @id='sideBlock' or @id='albumList']//a/img"  //'.photoimg a>img, .albumShow a>img, #sideBlock a>img, #albumList a>img';

    ],

    //Gamer GNN

    [

      /gnn\.gamer\.com\.tw\//,

      /\/(M|S)\//,

      '/B/',

      "//img[@class='gnnPIC']" //"//a[starts-with(@href,'javascript:showpic(')]/img"  //'a[href^="javascript:showpic("]>img'

    ],

    //NowNews

    [

      /www\.nownews\.com\//,

      /s(\d+\.(jpg|JPG))/,

      'i$1',

      "//a/img"    //'a>img:first-child'

    ],

    

    //2cat (no frameset)

    [

      /2cat\.twbbs\.org\//,

      /thumb\/(\d+)s/,

      'src/$1',

      "//div[@class='threadpost' or @class='reply']/a/img"         

    ],

    //komica*.dreamhosters (no frameset)

    [

      /komica\d+\.dreamhosters\.com\//,

      /thumb\/(\d+)s/,

      'src/$1',

      "//*[contains(name(),'FORM') or contains(name(),'form') or contains(name(),'TABLE')]//a/img"

    ],

    //Roodo Blog

    //sample: http://blog.roodo.com/ace_kaha/

    [

      /blog\.roodo\.com\//,

      /(\w+)_s/,

      '$1',

      "//div[@class='pict']//img"

    ],

    //iphonecake.com

    [

      /iphonecake\.com/,

      /(?:\-\w+)(\.jpg)/,

      '$1',

      "//img[@class='attachment-thumbnail']"

    ],

    //www.flickr.com

    [

      /flickr\.com/,

      /_[a-z](\.jpg)$/,

      '$1',

      "//img[@class='pc_img' or @class='setThumb' or @class='nextprev_thumb' ]"

    ],

    //mining.tw

    // [

      // /mining\.tw/,

      // /http:\/\/([\w\W]+cover\/)([\w\W]+)_\w+([\w\W]*)$/,

      // 'http://cover.wretch.cc/$2$3',

      // "//div[@class='mPic']/a/img"

    // ],

	//http://chinese.engadget.com

    [

      /\w+\.engadget\.com/,

      /_thumbnail/,

      '',

      "//*[@class='thumb' or @class='postgallery']//a/img"

    ],

    //facebook album  

    //facebook profile

    [

      /www\.facebook\.com\/(album|profile)\.php/,

      /s([\d_]+)?\.jpg/,

      'n$1.jpg',

      "//div[@id='photos_of_wrapper' or @id='album_container' or @id='tab_content']//a/img"

    ],
    //ruten.com

    [

      /\.ruten\.com\.tw/,

      /_\w\.jpg$/,

      "_m.jpg",

      "//div[@id='bestgoods_div']/parent::td//a/img | //*[@class='featured-first' or @class='all-products']//a/img"

    ]

],

    

  

  //樣式組

  //針對不同網站有個別的設定

  PatternSet: function()

  {

    this.urlExpression = //;

    this.patternBefore = //;

    this.patternAfter = '';

    this.imgSelector = '';

    

    // self 指物件本身

    var self = this;

    

    //插入真實圖片元素

    this.appendTrueImage =

      function(srcImgNode, patternSet)

      {

        

        patternSet = self;

        

        var imgSrc = srcImgNode.getAttribute('src');

        //if (imgSrc == null)

          //imgSrc = srcImgNode.src;

        if (imgSrc == null || imgSrc == "")

        {

          if (location.href.match(/photo\.pchome/))

          {

            imgSrc = srcImgNode.getAttribute('id');         

            imgSrc = imgSrc.replace(/Img\[([\w\/\.\-]+)\]/, '$1');

          }

          else if (location.href.match(/www\.wretch\.cc\/blog\/.+/))

          {

            var re = /\/blog\/(\w+)/;

            var after = 'http://cover.wretch.cc/$1.jpg';

            var href = srcImgNode.parentNode.getAttribute('href');

            imgSrc = href.replace(re, after).toLowerCase();

          }

        }

        imgSrc = imgSrc.replace(patternSet.patternBefore, patternSet.patternAfter);

        var imgNode = document.createElement('img');

        imgNode.setAttribute('class', 'trueImg');

        imgNode.setAttribute('src', imgSrc);

        imgNode.style.display = 'none';



        srcImgNode.parentNode.appendChild(imgNode);



        srcImgNode.addEventListener('mouseover', 

          function(ev)

          {

            PopupImage.show();            

            var true_nodes = PopupImage.getElementsByClassName(ev.target.parentNode, 'trueImg'); 

            if (true_nodes.length == 0)

              true_nodes = PopupImage.getElementsByClassName(ev.target.parentNode.parentNode, 'trueImg');

              

            if (true_nodes.length > 0)

            {

              var srcNode = true_nodes[0];

              var get_src = srcNode.getAttribute('src');

              //顯示圖片

              PopupImage.setViewerSrc(get_src);



              //自動縮放

              //if (PopupImage.isFitWindow)



              if (__fit)

              {

                var sW = srcNode.width;

                var sH = srcNode.height;

                var iW = window.innerWidth;

                var iH = window.innerHeight;



                var dx = sW/iW;

                var dy = sH/iH;



                console.log('dx: '+dx+', dy:' +  dy);

                // alert('dx: '+dx+', dy:' +  dy);

                if (dx > 1 || dy > 1)

                {

                  var fixed_ratio = 0.95;

                  var ratio = dx > dy ? dx : dy;

                  console.log('ratio: ' + ratio + ' after w,h: '+ (sW/ratio)*fixed_ratio + ',' + (sH/ratio)*fixed_ratio );

                  PopupImage.setWidth((sW/ratio)*fixed_ratio);

                  PopupImage.setHeight((sH/ratio)*fixed_ratio);

                }

                else

                {

                  PopupImage.setWidth("");

                  PopupImage.setHeight("");

                }

              }

              else

              {

                  PopupImage.setWidth("");

                  PopupImage.setHeight("");

              }

              

            }

          },

          false);

          

        srcImgNode.addEventListener('mouseout',         

          function(ev)

          {

            PopupImage.hide();

          },

          false);



        srcImgNode.addEventListener('mousemove', 

          function(ev)

          {     

            var viewportWidth = window.innerWidth;

            var viewportHeight = window.innerHeight;

            var x,y;

            var paddingX= 100;

            var paddingY = 100;

            var imgWidth = PopupImage.getWidth();

            var imgHeight = PopupImage.getHeight();

            

            if(ev.pageX >= viewportWidth/2)

            {

                x = ev.pageX - imgWidth - paddingX;

                offsetX = (typeof(window.pageXOffset)=='undefined') ? ev.pageX - ev.clientX : window.pageXOffset;

                x = (x >= offsetX) ? x: offsetX;

            }

            else

            {

                x = eval(ev.pageX + paddingX);

                var dx = (ev.pageX + imgWidth + paddingX) - viewportWidth;

                x = (dx > 0) ? x-dx : x;

            }

            

            if (ev.clientY >= viewportHeight/2)

            {

                y = ev.pageY - imgHeight - paddingY;

                offsetY = (typeof(window.pageYOffset)=='undefined') ? ev.pageY - ev.clientY : window.pageYOffset;

                y = (y >= offsetY) ? y : offsetY;

            }

            else

            {

                y = eval(ev.pageY + paddingY);

                dy = (viewportHeight -( ev.clientY + imgHeight) - paddingY);

                y = (dy >= 0) ? y : y+dy-50;

            }



            PopupImage.setViewerPos(x, y);

          },

          false);

          

        

      },

      

    //列舉元素

    this.selectNodes = 

      function(xpathExpr)

      {

        var nodes = new Array(); 

        var iters = document.evaluate(xpathExpr, document, null, XPathResult.ANY_TYPE, null); 

        var node; 

        while (node = iters.iterateNext()) 

        { 

          nodes.push(node); 

        };

        return nodes;   

      },

     

    //檢查網址

    this.check = function() 

      {

        if (location.href.match(self.urlExpression))

          self.set();

      },

    

    //建立所有物件及連結

    this.set = function()

    {

      PopupImage.isGetProfile = true;

      var nodes = this.selectNodes(this.imgSelector);

      for(var i=0;i<nodes.length;i++)

      {

        //建立原始圖片元素

        this.appendTrueImage(nodes[i], this);



      }

    }

    

  },

  

  //存放所有樣式組

  patterns : null,

  

  //頁面不支援的訊息

  NOT_SUPPORT_MSG : 'Not support this page !',



  //載入樣式

  loadPatterns :

    function()

    {

      var d = this.data;

      var aList = [];

      

      for (var i=0; i<d.length; i++)

      {

        var set = d[i];

        var p = new this.PatternSet();

        p.urlExpression = set[0];

        p.patternBefore = set[1];

        p.patternAfter = set[2];

        p.imgSelector = set[3];

          

        aList.push(p);

      }

      

      this.patterns = aList;

      return d.length;

    },

  

  //viewer flag

  isViewerShow: false,

  

  //match profile

  isGetProfile: false,

  

  //show not support alert

  isAlert : true,

  

  //auto fit

  isFitWindow: true, 

  

  //viewer hide or show

  hide: function()

  {

    var viewer = document.getElementById('pi_viewer');

    if (viewer)

    {

      viewer.style.display = 'none';

      viewer.style.zIndex = 0;

    }  

  },

  

  show: function()

  {

    var viewer = document.getElementById('pi_viewer');

    if (viewer)

    {

      viewer.style.display = 'block';

      viewer.style.zIndex = 65535;

    }

  },

  

  //設定位置

  setViewerPos: function(x,y)

  {

    var viewer = document.getElementById('pi_viewer');

    if (viewer)

    {

      viewer.style.top = eval(y + 10) + 'px';

      viewer.style.left = eval(x+ 10) + 'px';

    }    

  },



  //取得寬度

  getWidth: function()

  {

    return document.getElementById('pi_viewer').offsetWidth;

  },



  //取得高度

  getHeight: function()

  {

    return document.getElementById('pi_viewer').offsetHeight;

  },

  

  setWidth: function(val)

  {

    var p = document.getElementById('pi_viewer');

    if (val)

    {

      p.style.width = val + ' px';

      p.width = val;

    }

    else  //val = ''

    {

      p.style.removeProperty('width');

      p.removeAttribute('width');

    }

  },

  

  setHeight: function()

  {

   var p = document.getElementById('pi_viewer');

    if (val)

    {

      p.style.height = val + ' px';

      p.height = val;

    }

    else  //val = ''

    {

      p.style.removeProperty('height');

      p.removeAttribute('height');

    }

  },



  getElementsByClassName : function (parentElement,className){

    var elems = parentElement.getElementsByTagName("*");

    var result=[];

    for (i=0; j=elems[i]; i++){

      if ((" "+j.className+" ").indexOf(" "+className+" ")!=-1)

      {

        result.push(j);

      }

    }

    return result;

  },



  //改變顯示路徑

  setViewerSrc: function(src)

  {

    //alert(src);

                  

    var viewer = document.getElementById('pi_viewer');

    if (viewer)

    {

      viewer.setAttribute('src', src);

    }    

  },

    

  //create PopupViewer Element

  setViewer: function()

  {

    var viewerNode = document.getElementById('pi_viewer');

    if (!viewerNode )

    {

      viewerNode = document.createElement('img');

      viewerNode.setAttribute('id', 'pi_viewer');

      viewerNode.setAttribute('style', 'background: white;display: none;z-index:99;top:0;left:0;color:black;position:absolute;border:#888 dashed 2px');



      document.body.appendChild(viewerNode);



      viewerNode.addEventListener('mouseover', function() {PopupImage.show();}, false);

      viewerNode.addEventListener('mouseout', function() {PopupImage.hide();}, false);

      viewerNode.addEventListener('click', function(){PopupImage.hide();}, false);



    }

  },

  

  //append a tool box

  setToolTip: function()

  {

    if (document.getElementById('pi_tooltip') == null)

    {

      var toolBox = document.createElement('div');

      toolBox.setAttribute('style', 'width: 60px; position:fixed; top:3px;left:3px;border:dashed gray 1px;padding:2px;background:#F2A531;opacity:0.5;font:8px verdana !important;');

      toolBox.setAttribute('id', 'pi_tooltip');

      document.body.appendChild(toolBox);

    }  

  },

  

  //append a reload button

  setReloadButton: function()

  {



    if (document.getElementById('pi_reload') == null)

    {

      var reloadImg = document.createElement('img');

      reloadImg.setAttribute('style', 'border:0;');

      reloadImg.src="data:;base64,R0lGODlhFwAYAPf/ANTQyJqmyWB+yjdt1hxj35+qyQA6zLm9yGB+yR1o4B557yOD9SaJ+GKDzIyeyhVl4xBb3bm8x091yhhu5h9/8B157RRm4Rx47Bt26yCB8hJg3mB8wxRq4Bt66hRo3093yI6cxL/BxlJ+zBh15h6D7w9c15qkxBVd0BV04xBj2GqCwZ+qxRJr3Rh96AxY0V95vQ5m1Q9q2E5zwJ+owglUyhBw3BJ34DFfvAtq1Ahcy46avwAurgVKwAZQxAI3tA5Nuwdq0QRSwb/AxAxLtwNmzAJPvS9bswFgxwFTv46Yu191tAFYwgFcxUxutaCnv5qivQpPuAFSvmp9tWp8tQFCsyhSsKKov2B2tAFUv7/AwwFfxwFLuWB1s7m7w0xrtAFNuwFkygxLtQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABL4BAAAALgAAHyTABXb2PjQAEEAEnyTABUTeABdAAB8kwAAAJL/LQAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMkAAHRpDQCv7/YgAAAAEgAVABL5xOkgALB8knyTO////zun/7p8kwAB0AAARfgUAIAAEsAQABL5xOkgAGB8knyTAP///wAA/y0AAHyS/xL5SAmvAAB8gQAAAOkNjP//AIwA5ADpDQAAGAAAADAAAAAS+QAAQAAAABQAAAAS+QAAAAAAAAAAAAAAAAAADAACAAEAAHySAf3cANxqf4B8knyBDAACbPlkAGwAEgAS+QAACAAOACwAAADnjgAAAAJsAFMAAHyAGgACbAAAAADAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAJLcaiCifGx8gwAAAhL5mCH5BAkAAAAALAAAAAAXABgAAAjjAAEIHEiwoMGDCBMqXMiwocOHAwMIGECAwAABAQQWMJDwAIIEChYwYLBAQYIGDh5AQBhBwgQKFSZYsDChAoULGDJoQLiBQwcPH0CECAFCxAgSSEscNHECRQoVBVewaEHVxcEXMGLIKDiDRg0bYGkcvIEjh46CO3j0WNvDx8EfQIIIgThwCJEic+kCMHIESRK9AJQsYdIEoROFT6AciSLF4BQqVawkvIJlcZMkWbIkaRJFyxYuCbt4qcwEyZcvSJgcweKli8IuV6AsOQIGzJElUK64ZvhEiZEwYYwoeQK4uHGIAQEAIf4AOw==";

//      reloadImg.setAttribute('style', "position:fixed; top:20px;left:10px;border:0;cursor:pointer;");

      reloadImg.setAttribute('style', "border:0;cursor:pointer;");

      reloadImg.setAttribute('title', 'PopupX reload');

      reloadImg.setAttribute('id', 'pi_reload');

      reloadImg.addEventListener('click', function(){PopupImage.load(); }, false);

      document.getElementById('pi_tooltip').appendChild(reloadImg);

    }

  },

  

  //append a checkbox

  setFitCheckbox: function()

  {

    if (document.getElementById('pi_fit') == null)

    {

      var fit = document.createElement('label');

      fit.setAttribute('fit', '1');

      fit.setAttribute('id', 'pi_fit');

      fit.setAttribute('style', 'color:black !important;cursor:pointer;');

      fit.textContent = 'Shrink: ' + (__fit ? "on" : "off");

      fit.setAttribute('title', fit.textContent);

      fit.addEventListener('click', function(){

        __fit = fit.getAttribute('fit') == '1' ? true : false;

        this.isFitWindow = __fit;



        fit.setAttribute('fit', (!this.isFitWindow)*1+'');

        fit.textContent = 'Shrink: ' + (this.isFitWindow ? "on" : "off");

        fit.setAttribute('title', fit.textContent);

      }, false);

      

      document.getElementById('pi_tooltip').appendChild(document.createElement('hr'));

      document.getElementById('pi_tooltip').appendChild(fit);      

    }

  },

    

  //check browser

  CheckBrowser: function()

  {

    if (navigator.userAgent)

    {

      if (typeof String.prototype.replace_regx == 'function')

      //if Google Chrome

        String.prototype.replace = String.prototype.replace_regx;

    }

  },



  //init

  init: function()

  {

    this.CheckBrowser();

    this.setViewer();

    this.setToolTip();

    this.setReloadButton();

    this.setFitCheckbox();

    

  },

  

  //load all

  load : function()

  {

    this.init();

    

    var count = this.loadPatterns();

    for(var i=0;i<count;i++)

    {

      this.patterns[i].check();

    }

    

    if (!PopupImage.isGetProfile && PopupImage.isAlert)

    {

      alert(this.NOT_SUPPORT_MSG);

    }

  }

  

  

};



(function()

{

  PopupImage.isAlert = false;

  PopupImage.load();

  

})();





})();