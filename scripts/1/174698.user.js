// ==UserScript==
// @name        Nuchan Helper
// @author      table aka tables
// @bitmessage  BM-2D8MiNXgxusBh1Wd1pBexmpcz4wkBTJZKG
// @namespace   BM-2D8MiNXgxusBh1Wd1pBexmpcz4wkBTJZKG
// @include     http://nuchan.org/*
// @grant       none
// @version     0.133
// ==/UserScript==


    // image expansion - mostly code jacked from image hover code
function imageexpand() {
$(".thumb").click(function(){
var originalw = $(this).attr('originalw');
var originalh = $(this).attr('originalh');
var maxw = screen.width / 1.5;
var maxh = screen.height / 1.5;
var imgg;
var thumbsrc;
var width;
var height;
//console.log("src: " + $(this).attr('src'));
if($(this).attr('src').indexOf('thumb') != -1)
{
    //console.log("Thumb Detected");
    imgg = $(this).attr('ilarge');
    thumbsrc = $(this).attr('src');
    // scale the image appropriately
    if( maxw < originalw || maxh < originalh ) 
    {
        var key;
        if( maxw / originalw < maxw /originalh )  {key = maxw / originalw; }
        else                        {key = maxh / originalh; }
        width  = originalw * key + 1;
        height = originalh * key + 1;
    }
    else { width = originalw; height = originalh; }   
}
else 
{
    imgg = $(this).attr('thumbsrc');
   // console.log("Expanded Image Detected");
    thumbsrc = '';
    height = '';
    width = '';
}

$(this).attr({"src" : imgg, 'ilarge' : $(this).attr('ilarge'),
              "originalw" : originalw, "originalh" : originalh,
              'thumbsrc' : thumbsrc, "width" : width, "height" : height
            });
           //console.log("imgg: " + imgg);
return false;
}); 
}
imageexpand();


    // Let's bring back the jumpboxes
var jumpboxes = document.createElement('div');
jumpboxes.id = "JumpBoxes";
jumpboxes.style.top="50px";
jumpboxes.style.right="50";
jumpboxes.innerHTML = '<div id="JumpBoxesInternal"><a href="#top">'      +
                 '<img title="Jump to top" style="padding-right:'        +
                 '2px;" src="//images.nuchan.org/img/buttons/top.png'    + 
                 '"></a><a href="#bottom"><img title="Jump to bottom"'   +
                 ' src="//images.nuchan.org/img/buttons//bottom.png"></a></div>';
document.body.appendChild(jumpboxes);

    // one-click download button, reverse image search, tools, etc
for (var i = 0; i <  document.getElementsByClassName("filesize").length; i++ ) 
{
    var element = document.getElementsByClassName("filesize")[i];
    var url  = element.children[0].href; // throws an exception, but works anyway?
    var name = element.children[0].innerHTML;
element.innerHTML += '&nbsp;<span id="helperButtons" style="font-size: 11pt;'   +
                         'letter-spacing: -1px;">'                              +
                         '<a style="text-decoration: none"'                     +
                         'title="Download Image" download="'                    +
                         name+'" href="'+url+'"><tt>[D]</tt></a>'               +
                         '<a style="text-decoration: none"'                     +
                         'title="Reverse Image Search" href="'                  +
                         'http://www.google.com/searchbyimage?image_url='       +
                         url + '"><tt>[G]</tt></a>'                             +
                         '</span>';
}

    // Thread Statistics 
// only do this if we are in a thread
if (document.getElementById('updatelink') != null)
{
    var replies = document.getElementsByClassName("doubledash").length;
    var ireplies = document.getElementsByClassName("thumb").length - 1; // -1 to account or op
    var namefags = 0;
    for(var i =0; i < document.getElementsByClassName('postername').length; i++)
    {
        if (document.getElementsByClassName('postername')[i].innerHTML != "Anonymous")
            namefags++;
    }
    var stats = document.createElement('span');
    stats.innerHTML = " [Replies: " + replies +
                      " | Image Replies: " + ireplies + 
                      " | Namenancy Posts: " + namefags + "]";
    var parent = document.getElementsByClassName('threadruler')[1];
    parent.parentNode.insertBefore(stats, parent);
}

    // inline replies, not finished
/* $(".comref").click(function() {
    comNum = $(this).html().substring(8);
    comNode = this;
    // add reply if we've not got one already
    if(comNode.parentNode.parentNode.getElementsByTagName("div").length == 0 )
    {
        var jqxhr = $.ajax( "http://nuchan.org/fetchComment?num=" + comNum + "&board=" + $(comBlock).attr("board"))
        .done(function(data) {
            // data is the post.
            var inline = document.createElement('div');
            inline.innerHTML = data;
            // dear god I'm crazy
            inline.firstChild.firstChild.firstChild.removeChild(inline.firstChild.firstChild.firstChild.firstChild);
            comNode.parentNode.parentNode.insertBefore(inline, comNode.parentNode);
        })
        .fail(function() { $("#PreviewDiv").html("err"); });
    
    }
    else 
    {
        comNode.parentNode.parentNode.removeChild(comNode.parentNode.parentNode.getElementsByTagName("div")[0]);
    }
}); */ 

    // -f-i-x-e-s- breaks reply hovering lol
/* for (var i = 0; i <  document.getElementsByClassName("comref").length; i++ ) 
{
    var element = document.getElementsByClassName("comref")[i];
    element.setAttribute('comnum', element.innerHTML.substring(8));
} */

    // The big thing - Draggable Quick Reply box!
var quickreply = document.createElement('div');
var posx = (window.screen.availWidth - 491) +'px';
var posy = '90px';
//if this is a thread we want the quickreply auto open, otherwise we don't
if (document.getElementById('updatelink') == null) 
{
    posx = '-10000px';
    posy = '-1000px';
}
$(quickreply).attr({ "style" : "top: "+posy+"; left: "+posx+"; position:fixed; z-index:50 ",
                  "class" : "drag", "id" : "quickreply" });
// add head to quickreply
quickreply.innerHTML = '<div style="margin:auto; display:block; width: 150px;' +
                       'text-align:center;"><strong>Quicky Reply</strong> [<a' +
                       ' href="#" onclick="Close(\'quickreply\'); return fals' + 
                       'e;">Close</a>]</div>';
// clone the reply form
var clone = document.getElementsByName('contribute')[0].cloneNode(true);
// put Noko, Sage and Submit on new row
var noko = clone.getElementsByTagName('td')[2].cloneNode(true);
clone.getElementsByTagName('td')[2].innerHTML = '';
clone.getElementsByTagName('tr')[4].innerHTML = '';
noko.setAttribute('colspan',2);
noko.style.textAlign='right';
var submit = clone.getElementsByTagName('input')[4].cloneNode(true);
var remove = clone.getElementsByTagName('input')[4];
remove.parentNode.removeChild(remove);
clone.getElementsByTagName('input')[3].style.width='';
var row = document.createElement('tr');
noko.appendChild(submit);
row.appendChild(noko);
var p = clone.getElementsByTagName('tr')[1];
p.parentNode.insertBefore(row, p);
// add cloned reply form to quick reply div
quickreply.appendChild(clone);
document.body.appendChild(quickreply);

// add style for the quick reply box 
var style = document.createElement('style');
style.innerHTML='#quickreply { background-color: #CCEECC; border: 1px solid green;' +
                'padding: 4px; border-color: #90AC8F;min-width: 435px } .drag { position:fixed; z-index:50; }';
document.getElementsByTagName('head')[0].appendChild(style);

// stuff for dragging the reply box ---------
var _startX = 0;        // mouse starting positions
var _startY = 0;
var _offsetX = 0;       // current element offset
var _offsetY = 0;
var _dragElement;       // needs to be passed from OnMouseDown to OnMouseMove
var _oldZIndex = 0;     // we temporarily increase the z-index during drag

InitDragDrop();

function InitDragDrop()
{
   document.onmousedown = OnMouseDown;
   document.onmouseup = OnMouseUp;
}

function OnMouseDown(e)
{
   // IE is retarded and doesn't pass the event object
   if (e == null) 
      e = window.event; 
   
   // IE uses srcElement, others use target
   var target = e.target != null ? e.target : e.srcElement;

   // for IE, left click == 1
   // for Firefox, left click == 0
   if ((e.button == 1 && window.event != null ||  
      e.button == 0) &&  
      target.className == 'drag')
   {   
      // grab the mouse position
      _startX = e.clientX;
      _startY = e.clientY;
    
      // grab the clicked element's position
      _offsetX = ExtractNumber(target.style.left);
      _offsetY = ExtractNumber(target.style.top);
    
      // bring the clicked element to the front while it is being dragged
      _oldZIndex = target.style.zIndex;
      target.style.zIndex = 10000;
    
      // we need to access the element in OnMouseMove
      _dragElement = target;
      
      // tell our code to start moving the element with the mouse
      document.onmousemove = OnMouseMove;

      // cancel out any text selections
      document.body.focus();

      // prevent text selection in IE
      document.onselectstart = function () { return false; };
      // prevent IE from trying to drag an image
      target.ondragstart = function() { return false; };

      // prevent text selection (except IE)
      return false;
   }
}

function ExtractNumber(value)
{
   var n = parseInt(value);

   return n == null || isNaN(n) ? 0 : n;
}

function OnMouseMove(e)
{
   if (e == null)
      var e = window.event;

   // this is the actual "drag code"
   _dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
   _dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
}

function OnMouseUp(e)
{
   if (_dragElement != null)
   {
      _dragElement.style.zIndex = _oldZIndex;

      // we're done with these events until the next OnMouseDown
      document.onmousemove = null;
      document.onselectstart = null;
      _dragElement.ondragstart = null;
      }
}
      
// -----------------------------------------------------------------------

// we need to overwrite some functions to do the reply box
var script = document.createElement('script'); 
script.type = "text/javascript"; 

// overwrite addtext for so that the quickreply opens on click and gets the quote
script.innerHTML = (''+
'function Close(id) { _dragElement = document.getElementById(id); _dragElement.style.left="-10000px"; '+
'_dragElement.style.top="-1000px"; }' +
'function Open(id) { _dragElement = document.getElementById(id); if(_dragElement.style.left == \'-10000px\')' +
'{ _dragElement.style.left = (window.screen.availWidth - 491) + \'px\'; } if' +
'(_dragElement.style.top == \'-1000px\') { _dragElement.style.top =\'90px\'; }}'+
'function addtext(txttoadd,com){ '+
'txttoadd += \'\\r\\n\'; ' +
'document.getElementsByTagName("textarea")[1].value += txttoadd; '+
'Open("quickreply");' +
'return false; '+ 
'}').toString();
        
//append new scripts.    
document.getElementsByTagName('head')[0].appendChild(script);
