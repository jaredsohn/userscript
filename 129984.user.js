// ==UserScript==
// @name          Craigslist Image Preview 3.0
// @description   View craigslist image previews [1.4]
// @include       http://*.craigslist.org/*/*
// @require        https://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=129984&days=7
// @version        1.4
// @icon           data:image/png;base64,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
// ==/UserScript==


// --------------------------------------------------
var d=document;
var craig = {
	imageRatioSize: (GM_getValue('ratio') ? GM_getValue('ratio') : 150),
	setupStyles: function() {
		GM_addStyle('.r0 { background-color: #ffffff; }');
		GM_addStyle('.r0 { background-color: #eeeeee; }');
		GM_addStyle('.row { margin: 0; padding: 5px; }');
		GM_addStyle('div.tnail { width: '+ craig.imageRatioSize +'px; height: '+ craig.imageRatioSize +'px; overflow: hidden; clear: none; display: inline-block; padding: 2px; text-align: center; }');
		GM_addStyle('div.thumbsBlock { clear: both; }');
	},
	init: function() {
		if(document.location.toString().match(/\/\d+\.html/)) return;
		GM_setValue('ratio',craig.imageRatioSize);
		craig.setupStyles();
		craig.imgPreviewSize();
		craig.itemLoader();
	},
	
	imgPreviewSize: function() {
		var v = [50,100,150,200,250,300];
		$('#efSspan').append($('<select id="sizeSelector"></select>'));
		$.each(v,function(a,b) {
			$('#sizeSelector').append($('<option value="'+ b +'" '+ (b==craig.imageRatioSize ? ' selected="selected"' : '') +'>'+ b +'</option>'));
		});
		$('#sizeSelector').bind('change',craig.changeSize);
		$('#sizeSelector').bind('keyup',craig.changeSize);
	},
	changeSize: function() {
		var val = $(this).val();
		if (craig.imageRatioSize == val) return;
		GM_setValue('ratio',val);
		window.location.reload();
	},
	itemLoader: function() {
		$('p.row').each(function(i) {
			$(this).addClass('r'+ (i%2));

			// No picture, return.
			if ($(this).find('span.p').length==0) return;

			GM_xmlhttpRequest({
				method: "GET",
				row: $(this),
				url: $(this).children('a')[0].getAttribute('href'),
				onload: function(response) {
					$(this.row).append('<div class="thumbsBlock"></div>');
					
					var row = $(this.row).find('div.thumbsBlock');
					
					var html = d.createElement('html');
						html.innerHTML = response.responseText;
					var d2 = d.implementation.createDocument("","",null);
						d2.appendChild(html);
					
					var insertedImages = [];
					
					$(d2.getElementsByTagName('img')).each(function(i) {
						if (i>5) return;
						
						var curSRC = $(this).attr('src').replace(/\/thumb/,'');

						if (insertedImages.indexOf(curSRC) == 0) return;

						insertedImages.push(curSRC);

						var img = new Image();
						$(img).attr('src',curSRC);
						$(img).bind('load',{ row:$(row) },function() {
							var ratio = (this.height>this.width) ? (this.height/this.width) : (this.width/this.height);
							if (ratio>5.5) return;
						});
					});
				}
			});
		});
	}
};

craig.init();


// --------------------------------------------------

var DEBUG = false;
var PREFIX = "*cs*.";
var SIZE_PARAM = "size";
var KEEP_ASPECT_RATIO_PARAM = "aspect.ratio";
var MAX_RESULTS_PARAM = "max.results";
var MAX_MAX_RESULTS = 50;
var CLASS = "_c";
var size = 0;
var keepAspectRatio = false;
var maxResults = 0;


function setValue(key,val) {
  GM_setValue(PREFIX + key,val);
  return val;
}

function getValue(key,defaultValue) {
  var res = GM_getValue(PREFIX + key);
  if (!res) res = defaultValue;
  return res;
}

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

/**
 * Node Node -> Void
 * Inserts newNode before target.
 * http://lists.xml.org/archives/xml-dev/200201/msg00873.html
 */
function insertBefore(newNode,target) {
  var parent   = target.parentNode;
  var refChild = target; //target.nextSibling;  
  if(refChild) parent.insertBefore(newNode, refChild);
  else parent.appendChild(newNode);  
}

var cnt=0;
function newFunction(_a) {
  var a = _a;
  return function(details) {
    if (details.responseText) {
      
      if (m = details.responseText.match(/img[^>]*src=\"([^\"]+)\"/gi)) {

        //
        // Go thru the links
        // div will hold the new div below the links parent
        //
        var div;
        var cnt = 0;
        for (var j=0; j<m.length; j++) {
          s = m[j];
          if (!s) continue;
          //
            // basically a hack, but I thought this would return 
          // an array
          s = s.replace(/id=.* /g,"");
          s = s.replace(/img src=/g,"");
          s = s.replace(/\/thumb/g,"");
          s = s.replace(/\"/g,"");
	  //
          // For the first time create the div to hold the links
          //
          if (!div) {
            var d = $n("div",a.parentNode);
            var br = $t(" ",a.parentNode);
            div = $n("div",a.parentNode);
          }
          //
          // Create the link and image and add them
          //
          var newA = $n("a",div);
          var img = $n("img",newA);
          img.className = CLASS;
          img.src = s;
          //
          // 1.5: Don't change the height if we're keeping the aspect ratio
          //
          if (!keepAspectRatio) {
            img.style.width = size + "px";
          }
          img.style.height = size + "px";
          newA.href = s;
          if (++cnt > maxResults-1) {
            var amt = m.length-maxResults;
            if (amt != 0) {
              $t(" ...",div);
              $t(amt + " more ",div);
            }
            break;
          }
          $t(" ",div);
        }
      }
    }
  };
}

function addLinkAtTop() {

  var span = $n("span");
  span.style.verticalAlign = "middle";

  $t("change size: ",span);

  var sel = $n("select",span);
  for (var i=10; i<=300; i += 10) {
    var opt = $n("option",sel);
    opt.value = i;
    if (i == size) opt.selected = true;
    opt.innerHTML = i;
  }
  sel.addEventListener("change",function() {
                         var v = sel.value;
                         size = setValue(SIZE_PARAM,v);
                         changeSizes();
                       },true);

  $t(" keep aspect ratio: ",span);

  var check = $n("input",span);
  check.type = "checkbox";
  if (keepAspectRatio) check.checked = "1";
  check.addEventListener("change",function() {
                           var v = check.checked;
                           keepAspectRatio = setValue(KEEP_ASPECT_RATIO_PARAM,v);
                           changeSizes();
                         },true);

  $t("max # of images: ",span);

  var sel2 = $n("select",span);
  for (var i=1; i<=MAX_MAX_RESULTS; i++) {
    var opt = $n("option",sel2);
    opt.value = i;
    if (i == maxResults) opt.selected = true;
    opt.innerHTML = i;
  }
  sel2.addEventListener("change",function() {
                         var v = sel2.value;
                         maxResults = setValue(MAX_RESULTS_PARAM,v);
                         document.location = document.location;
                       },true);
  
  var tab = document.getElementById("topbar");
  if (!tab) {
    tab = document.getElementsByTagName("table")[0];
  }
  tr = $n("tr",tab);
  td = $n("td",tab);
  td.appendChild(span);
  tab.insertBefore(tr,tab.firstChild);
}

function changeSizes() {
  var imgs = document.getElementsByTagName("img");
  for (var i in imgs) {
    var img = imgs[i];
    if (img.className != CLASS) continue;
    //
    // 1.5: Don't change the height if we're keeping the aspect ratio
    //
    if (!keepAspectRatio) {
      img.style.width = size + "px";
    }
    img.style.height = size + "px";
  }
}

function showImages() {
  //
  // find all the links to listings and display the images
  //
  links = document.getElementsByTagName("a");
  for (i=0; i<links.length; i++) {

    link = links[i];
    if (link.href && link.href.match(/.*craigslist.org.*\/\d+\.html$/)) {
      GM_xmlhttpRequest({
        method:"GET",
            url: link.href,
            headers:{
            "User-Agent": "monkeyagent",
              "Accept":"text/html,text/monkey,text/xml,text/plain",
              },
            onload: newFunction(link)
        });
    }
  }
}

function main() {
  size = getValue(SIZE_PARAM,120);
  keepAspectRatio = getValue(KEEP_ASPECT_RATIO_PARAM,true);
  maxResults = getValue(MAX_RESULTS_PARAM,5);
  addLinkAtTop();
  showImages();
}

try {main();} catch (e) { if (DEBUG) alert(e); }
