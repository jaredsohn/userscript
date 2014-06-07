// ==UserScript==

// @name           PopupX - Flickr Tweak (Only Tiny Design Tweak for Flickr + Autopager support)

// @namespace      http://userscripts.org/users/45256

// @description    browse image(embeded a link) by a Popup Image Viewer ( Original version by NIO, Tweaked Design version by decembre)

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
/*
________________________________________________
________________________________________________

>>> Original Author : nio
// @name           PopupX
// @namespace      http://userscripts.org/users/45256
// @description    browse image(embeded a link) by a Popup Image Viewer
Go here for more information....

>>> Thanks to Alesa Dam for her help!
________________________________________________
________________________________________________

is Tweaked version for Flickr:
________________________________________________

>> 2010-/08/18 : (Thanks to Alesa Dam ) : Press the shift (MAJ) while hovering a thumbnail, if I you want shows the preview  . This way you can decide yourself when to see a bigger picture or not.

>> 2010-/08/16
- Added support to Autopager ...by inserting at the end of the script :
  window.addEventListener('AutoPagerAfterInsert', function(){PopupImage.load(); }, false);
  Now no needs to click on the blue button (must find a way to convert it in a On/Off button...)

>> 2010/08/13
- Idea of Alesa Dam :  changed line 314 from this:"//img[@class='pc_img' or @class='setThumb' or @class='nextprev_thumb' ]"
  into this:"//img[(@class='pc_img' or @class='setThumb' or @class='nextprev_thumb') and not(contains(@src,'/cols/') or contains(@src,'_z.jpg'))]"
  to make it ignore collection mozaics (which contain '/cols/' in the src attribute) and 640px wide medium images (which contain '_z.jpg' int the src)
 
  
>> 2010/08/12
- just tweak Design by decembre (no new functions)


*/

//CHANGE LOG in the Original Version 

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

      "//img[(@class='pc_img' or @class='setThumb' or @class='nextprev_thumb') and not(contains(@src,'/cols/') or contains(@src,'_z.jpg'))]"

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
// Alesa Dam change :  only shows the preview if I press shift (MAJ) while hovering a thumbnail. This way y can decide yourself when to see a bigger picture or not.
          {
		  if (!ev.shiftKey) {
    return;
          }

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
///decembre change : de dashed à solid 20px
      viewerNode.setAttribute('style', 'background: white;display: none;z-index:99;top:0;left:0;color:black;position:absolute;border:#888 solid 20px');



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
/// decembre Change : width de 20px à 5px ; position fixed à ; top: de 300px à 500px, left à right , border de solid gray 1px à 0, padding de 2px à 0px, background : de #F2A531 (orange) à #FFFFFF (blanc)
      toolBox.setAttribute('style', 'width:5px; position:fixed; top:350px;right:10px;border:0;padding:0px;background:#FFFFFF;opacity:0.5;font:8px verdana !important;');

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
/// decembre change image reload par bouton bleu
      reloadImg.src="data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABc0lEQVQ4je2Tz27TQByEv7XXSYgtIqWh4U9aop7gCThxgCOvwIG34EF4KlQJVQhUJLhUpCRumjiOY9fuZnd/HMqpROoZiZFGc5pvTqM+ffOtH5kMvlwy/pwxOitlP7c8MI6OqbFmw+Z6TupmTMlJsUGGoyCiQWP1zMv7gwPehUMOkxL9aEMwqWDRQLUF5yDw2LYhjzO+d+f+2K042VR8LYrgXP+qebW3x7glaB1AqBShAqUgjqAfC8976Gc9BoOI/nbF4XLC+GxCki78sRYI2CEFhAruacWgA09i4WGboBK6sub+MpZuWarOzvJt0M5UNwN3Au7Sf8A/AZDbFrwA4sEJ6K3HWI8X+btkPKyN8LMEDUxDrMso8pTFbKnyNFNX6uUH92b0lLdJT143in5uaK3MzZFqA8aB3WKpyfUFp9GEj5Jx0tTqtKrUVPHCBwzptB/LKNnnqBXLkYoYWkdiGrzZsL6ek7oLzln+ubOnQHOFxv4Gzp29cH1mY9IAAAAASUVORK5CYII=";
/// decembre Change : 
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
///decembre change : black à red
      fit.setAttribute('style', 'color:red !important;cursor:pointer;');

      fit.textContent = 'S: ' + (__fit ? "O" : "X");

      fit.setAttribute('title', fit.textContent);

      fit.addEventListener('click', function(){

        __fit = fit.getAttribute('fit') == '1' ? true : false;

        this.isFitWindow = __fit;



        fit.setAttribute('fit', (!this.isFitWindow)*1+'');

        fit.textContent = 'S: ' + (this.isFitWindow ? "O" : "X");

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
//decembre change : Added support to Autopager
  PopupImage.isAlert = false;

  PopupImage.load();

  window.addEventListener('AutoPagerAfterInsert', function(){PopupImage.load(); }, false);

})();





})();


