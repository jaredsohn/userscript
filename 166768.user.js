// ==UserScript==
// @name         Danbooru 2 Note Assist
// @description  For danbooru.donmai (2) - experimental text-detection script to automatically fit notes to text
// @version      0.13
// @namespace    itsonlyaname
// @include      http://*.donmai.us/posts/*
// @include      http://donmai.us/posts/*
// ==/UserScript==


//==========================================================
// Basic user settings (defaults - you can only change them via the settings menu)
//==========================================================

var noteAssist_uiPositionLeft = true;  //(default:true) UI position, enabled = left side, over the tags list //disabled = top-right corner

var noteAssist_resizeDefaultOn = true; //(default:true) Dragged notes will always resize, except if shift is held  //disabled = only resize if shift if held

var noteAssist_instantNote = true;    //(default:true) disable to make "show note asssist menu" and "enter create-note mode" 2 seperate actions
                                      //useful for when you want to use 'generate-all' or just edit notes.

//==========================================================
// Advanced user settings (defaults - you can only change them via the settings menu)
//==========================================================


var noteAssist_forceEnd = 15000;  //number of miliseconds to let the code run before it's considered as "stuck".
                       //on very large images + 'generate all' you may hit this limit (gives a warning message, then force-aborts)

var noteAssist_debug = false;       //show debug text & images
var noteAssist_noteButtons = false; //adds buttons to resize already-existing notes, UI needs a major change.



//==========================================================
// Assist functions - mostly copy/pasted from other sources, and globals
//==========================================================

var startTime;        //  startTime = Date.now();
var runTime;          //    runTime = Date.now();
var benchStart;       // benchStart = Date.now();
var benchStop;        //  benchStop = Date.now();
var noteAssist_timer; //ui timer to re-hide
var noteAssist_eyedropperTarget;
var scaleModifier;
var fitToScreenRatio = 1; //Scale for when "Fit images to window" (official danbooru settings) is enabled

var noteAssist_settingsJson, noteAssist_LS_getValue, noteAssist_LS_setValue;

function addGlobalStyle(css) {
  try {
    var elmHead, elmStyle;
    elmHead = document.getElementsByTagName('head')[0];
    elmStyle = document.createElement('style');
    elmStyle.type = 'text/css';
    elmHead.appendChild(elmStyle);
    elmStyle.innerHTML = css;
  }
  catch (e) {
    if (!document.styleSheets.length) {
      document.createStyleSheet();
    }
    document.styleSheets[0].cssText += css;
  }
}

function $c(type, params) {
  if (type == "#text") {
    return document.createTextNode(params);
  } else {
    var node = document.createElement(type);
  }
  for (var i in params) if (i == "kids") {
    for (var j in params[i]) {
      if (typeof (params[i][j]) == 'object') {
        node.appendChild(params[i][j]);
      }
    }
  } else if (i == "style") {
    if (typeof (params[i]) == 'string') {
      node.style.cssText = params[i];
    } else {
      for (var j in params[i])
      node.style[j] = params[i][j];
    }
  } else if (i == "class") {
    node.className = params[i];
  } else if (i == "#text") {
    node.appendChild(document.createTextNode(params[i]));
  } else {
    node.setAttribute(i, params[i]);
  }
  return node;
}

function to_debug(a) { //purely a debug function, this pastes text to somewhere on the screen, much easier then alert's
  if (noteAssist_debug || noteAssist_settingsJson.debug) {
    document.getElementById('debug_log').innerHTML += a + '\n<br/>';
  }
}

function cancelEvent(event) { //jquery alternative to preventDefault
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}

function getMetaContents(mn) {
  var m = document.getElementsByName(mn)[0];
  if(m) m=m.content;
  else { to_log('Could not read meta-content: "'+mn+'"'); return; }
  return m;
}

/* personal preferences, for testing on local files *
(function() {
  var style=

  'body { background-color:#C4C4C4 !important; }'+
  '.post-count, .count { color:#888888!important; }'+                                  //color of post count numbers, better readability with gray background
  'span.low-post-count { color:red!important; }'+
  //from 1em - resize of the pools/search nav box
  '#nav-links { padding: 0.3em!important; margin:0.3em 0em!important; }'+
  
  // resize of the yellow parent/info box
  'div#c-posts div.notice { margin-bottom: 0.3em !important; padding: 0em 0.5em !important; }'+  //resizes yellow info box to be about the same size
  
  
  //hide the upgrade-account-notice, for good 
  '#upgrade-account-notice { display:none!important; }';
  addGlobalStyle(style);
})();
//*/

//==========================================================
// Text detection
//==========================================================


function convert_blackWhite(data, reversed) { //reversed = white text on black image.
  var cut_off = 188;
  var pixels = data.data;
  if (reversed) {
    cut_off = 255 - cut_off;
    for (var i = 0, l = pixels.length; i < l; i += 4) {
      var luma = ((pixels[i] + pixels[i+1] + pixels[i+2]) / 3) | 0;

      luma > cut_off ? luma = 0 : luma = 255;
      pixels[i] = luma;
      pixels[i+1] = 0;
      pixels[i+2] = 0;
    }
  }
  else { //copy/pasting this entire block is faster then doing "if (reversed)" several 100,000 times
    for (var i = 0, l = pixels.length; i < l; i += 4) {
      var luma = ((pixels[i] + pixels[i+1] + pixels[i+2]) / 3) | 0;

      //luma>255-cut_off ? luma=0 : luma=255; //manual reverse
      luma < cut_off ? luma = 0 : luma = 255;

      //if (pixels[i+3] === 0) luma=255; //turns transparent background white, allowing detection of dark letters
      //pixels[i+3] = 255;              //but slows down startup by 15%. text on transparent = very rare
      pixels[i] = luma;
      pixels[i+1] = 0;
      pixels[i+2] = 0;
    }
  }
}

function whiteTextOnBlack(data) { //check if the post is white text on black - returns "true" if it is.
  var total_luma = 0;
  var pixels = data.data;
  for (var x = 1; x < data.width - 1; x++) {
    for (var y = 1; y < data.height - 1; y++) { //skip outer edge, it's always 100% black.
      var i = x*4 + y*4*data.width;
      total_luma += pixels[i];
    }
  }
  
  to_debug('<br>luma: '+(((total_luma/(data.width*data.height))*100)|0)/100);
  return ((total_luma/(data.width*data.height))<130); //closer to 0 = darker = higher chance for white text
}


//does a good job at speeding up the 'findLines' function
function optimizeImage1(data) {
  var height = data.height - 2;
  var width = data.width - 2; //inside of the 1px border
  var pixels = data.data;

  if (width < 32 || height < 32) return; //no point in optimizing very small images
  
  for (var blockSize = 15; blockSize >= 4; blockSize--) {
    var repeatY = Math.floor(height / blockSize);
    var repeatX = Math.floor(width / blockSize);

    for (var y1 = 0; y1 < repeatY; y1++) {
      for (var x1 = 0; x1 < repeatX; x1++) {
        var startPointX = 4 + (x1*blockSize*4);
        var startPointY = 4 + (y1*blockSize*4);

        var totalLuma = 0;
        for (var y2 = 0; y2 < blockSize; y2++) {
          for (var x2 = 0; x2 < blockSize; x2++) {
            var i = (startPointY + y2*4)*(width + 2) + (startPointX + x2*4);
            totalLuma += pixels[i];
          }
        }
        if (totalLuma === 0) {
          for (var y2 = 1; y2 < blockSize - 1; y2++) {
            for (var x2 = 1; x2 < blockSize - 1; x2++) {
              var i = (startPointY + y2*4)*(width + 2) + (startPointX + x2*4);
              if (y2 === 1 && x2 === 1) {
                pixels[i] = 0;
                pixels[i + 1] = ((blockSize - 2)*(blockSize - 2)) - 1;
              }
              else {
                pixels[i] = 255;
              }
            }
          }
        }
      }
    }
  }
}

//further increasing speed of 'findLines' function
function optimizeImage2(data) {
  var width=data.width*4;   //DATA width
  var pixels = data.data;
  
  for(var i=0,l=pixels.length;i<l;i+=4) {
    var x=i % width;
    //               up                    left                 right                   down
    //if (pixels[i-width]==0 && pixels[i-4]==0 && pixels[i+4]==0 && pixels[i+width]==0) { pixels[i]=255; }
    if (pixels[i] === 0 && pixels[i-width]===0 && pixels[i-4]===0 && pixels[i+4]===0 && pixels[i+width]===0 && x!==0 && x!==width-4) {
      pixels[i]=120;
      pixels[i+5]+=1;
    }
  }
}


function killMain(data) {
  var width = data.width*4;  //DATA width
  var pixelsToCheck = [0]; //if startPx is specified, start from it, otherwise start from top-left corner
  var pixelsToCheckNext = [];
  var pixels = data.data;
  var c;
  
  pixels[0] = 100;
  
  while (pixelsToCheck.length > 0) {
    for(var index=0, l=pixelsToCheck.length; index < l; index++) {
      var i = pixelsToCheck[index];
      
      c=(i-width)-4;  // # UP-LEFT #
      if (pixels[c] === 0) {
        pixels[c] = 100;
        pixelsToCheckNext.push(c);
      }
      c=(i-width);    // # UP #
      if (pixels[c] === 0) {
        pixels[c] = 100;
        pixelsToCheckNext.push(c);
      }
      c=(i-width)+4;  // # UP-RIGHT #
      if (pixels[c] === 0) {
        pixels[c] = 100;
        pixelsToCheckNext.push(c);
      }
      c=i-4;            // # LEFT #
      if (pixels[c] === 0) {
        pixels[c] = 100;
        pixelsToCheckNext.push(c);
      }
      c=i+4;            // # RIGHT #
      if (pixels[c] === 0) {
        pixels[c] = 100;
        pixelsToCheckNext.push(c);
      }
      c=(i+width)-4;  // # DOWN-LEFT #
      if (pixels[c] === 0) {
        pixels[c] = 100;
        pixelsToCheckNext.push(c);
      }
      c=(i+width);    // # DOWN #
      if (pixels[c] === 0) {
        pixels[c] = 100;
        pixelsToCheckNext.push(c);
      }
      c=(i+width)+4;  // # DOWN-RIGHT #
      if (pixels[c] === 0) {
        pixels[c] = 100;
        pixelsToCheckNext.push(c);
      }
    }
    
    pixelsToCheck = pixelsToCheckNext;
    pixelsToCheckNext = [];
    
    runTime = Date.now();
    if ((runTime - startTime) > noteAssist_settingsJson.forceEnd) {
      alert('code got stuck at "killMain".')
      break;
    }
  }
}

function findLines(data,startPx) {
  var width = data.width*4;  //DATA width
  var pixelsAll = [];
  var pixelsToCheck = [startPx]; //if startPx is specified, start from it, otherwise start from top-left corner
  var pixelsToCheckNext = [];
  var pixelsBonus = 0;
  var pixelsTotal = 0;
  var pixels = data.data;
  
  var c;
  
  pixels[startPx] = 10;
  
  var oldLength=0;
  var newLength=1; //simply a setting to allow the loop to start.
  
  while (newLength > oldLength) {
    var oldLength=pixelsAll.length;
    
    for(var index=0, l=pixelsToCheck.length; index < l; index++) {
      var i = pixelsToCheck[index];
      
      c=(i-width)-4;  // # UP-LEFT #
      if (pixels[c] === 0) {
        pixels[c] = 10;
        pixelsToCheckNext.push(c);
        pixelsAll.push(c);
        if(pixels[c+1] > 0) { pixelsBonus += pixels[c+1]; }
      }
      c=(i-width);    // # UP #
      if (pixels[c] === 0) {
        pixels[c] = 10;
        pixelsToCheckNext.push(c);
        pixelsAll.push(c);
        if(pixels[c+1] > 0) { pixelsBonus += pixels[c+1]; }
      }
      c=(i-width)+4;  // # UP-RIGHT #
      if (pixels[c] === 0) {
        pixels[c] = 10;
        pixelsToCheckNext.push(c);
        pixelsAll.push(c);
        if(pixels[c+1] > 0) { pixelsBonus += pixels[c+1]; }
      }
      c=i-4;            // # LEFT #
      if (pixels[c] === 0) {
        pixels[c] = 10;
        pixelsToCheckNext.push(c);
        pixelsAll.push(c);
        if(pixels[c+1] > 0) { pixelsBonus += pixels[c+1]; }
      }
      c=i+4;            // # RIGHT #
      if (pixels[c] === 0) {
        pixels[c] = 10;
        pixelsToCheckNext.push(c);
        pixelsAll.push(c);
        if(pixels[c+1] > 0) { pixelsBonus += pixels[c+1]; }
      }
      c=(i+width)-4;  // # DOWN-LEFT #
      if (pixels[c] === 0) {
        pixels[c] = 10;
        pixelsToCheckNext.push(c);
        pixelsAll.push(c);
        if(pixels[c+1] > 0) { pixelsBonus += pixels[c+1]; }
      }
      c=(i+width);    // # DOWN #
      if (pixels[c] === 0) {
        pixels[c] = 10;
        pixelsToCheckNext.push(c);
        pixelsAll.push(c);
        if(pixels[c+1] > 0) { pixelsBonus += pixels[c+1]; }
      }
      c=(i+width)+4;  // # DOWN-RIGHT #
      if (pixels[c] === 0) {
        pixels[c] = 10;
        pixelsToCheckNext.push(c);
        pixelsAll.push(c);
        if(pixels[c+1] > 0) { pixelsBonus += pixels[c+1]; }
      }
      
      pixels[i]=20;
    }
    
    
    //pixelsAll = pixelsAll.concat(pixelsToCheck);
    
    pixelsToCheck = pixelsToCheckNext;
    pixelsToCheckNext = [];
    
    
    newLength = pixelsAll.length;
    //alert('oldLength: '+oldLength+'\nnewLength: '+newLength);
    
    //*
    runTime = Date.now();
    if ((runTime - startTime) > noteAssist_settingsJson.forceEnd) {
      //  'code got stuck at "findLines". Debug info:'+
      //  '\n\npixelsTotal: '+pixelsTotal+'\npixelsToCheckPrev: '+pixelsToCheckPrev+'\npixelsToCheck: '+pixelsToCheck+
      //  '\n\ngive the code another '+(noteAssist_settingsJson.forceEnd/1000)+' sec to run (or cancel)';
        
      if (confirm('code got stuck at "findLines". Debug info:'+'\n\npixelsTotal: '+pixelsTotal+'\npixelsToCheckPrev: '+pixelsToCheckPrev+'\npixelsToCheck: '+pixelsToCheck+'\n\ngive the code another '+(noteAssist_settingsJson.forceEnd/1000)+' sec to run? (or cancel)')) { startTime = Date.now(); }
      else break;
    }
    //*/
  }
  
  var pixelsTotal = pixelsAll.length + pixelsBonus;
  
  
  /* experimental anti-noise */
  var matchfound = false;
  for(var i=0;i<pixelsAll.length;i++) {
    var c=pixelsAll[i];
    
    var pixelUp    = pixels[c-width];
    var pixelRight = pixels[c+4];
    var pixelDown  = pixels[c+width];
    var pixelLeft  = pixels[c-4];
    
    var total = pixelUp + pixelRight + pixelDown + pixelLeft;
    
    if (total <= 550) { //check if the image has at least 1 point that is surrounded by at least 2 other black pixels  - some dot patterns don't have this
      matchfound = true;
      break;
    }
  }
  if (matchfound === false) { pixelsTotal = 0; }
  //*/
  
  if (noteAssist_debug || noteAssist_settingsJson.debug) {
    for(var i=0;i<pixelsAll.length;i++) {
      pixels[pixelsAll[i]+2]=220; //purely visual
    }
    if (pixelsTotal < 9 && pixelsTotal > 2) {
      for(var i=0;i<pixelsAll.length;i++) {
        pixels[pixelsAll[i]+2]=120; //purely visual
      }
    }
  }
  
  return [pixelsTotal,pixelsAll];
}


function blobsToSquares(lineCount, linePixels, width, height) {
  var linePixelsSquare = [];
  width = width*4;   //pixel width -> data width
  
  for(var i=0;i<linePixels.length;i++) {
    var min_x = width;
    var max_x = 0;
    var min_y = height;
    var max_y = 0;
    for (var j = 0; j < linePixels[i].length; j++) {
      var c = linePixels[i][j];

      var x = c % width;   //is in DATA width, since it's not divided by width
      var y = (c/width)|0; //is in pixel height, since width = pixels

      if (x < min_x) min_x = x;
      if (x > max_x) max_x = x;

      if (y < min_y) min_y = y;
      if (y > max_y) max_y = y;
    }
    min_x = min_x/4; //data width -> pixels
    max_x = max_x/4; //data width -> pixels
    
    linePixelsSquare[i]=[min_x, min_y, max_x, max_y, (1+max_x-min_x), (max_y-min_y+1), ((max_x-min_x+1)*(max_y-min_y+1)), lineCount[i]];
    //                      x1     y1     x2     y2     width            height           area                               pixel count
    //                      [0]    [1]    [2]    [3]    [4]              [5]              [6]                                [7]
  }
  
  return linePixelsSquare;
}


function calculateConnect(linePixelsSquare,fullImage) {
  var lineSquareArea = [];

  for (var i = 0; i < linePixelsSquare.length; i++) {
    lineSquareArea[i] = linePixelsSquare[i][6];
  }
  lineSquareArea.sort(function(a,b){return a - b}); //sort by number

  var total = 0;
  var count = 0;
  if (lineSquareArea.length > 10) {
    var i = Math.floor(lineSquareArea.length*0.3); //don't count the bottom 30% & top 20% of the results towards the average.
    var l = Math.floor(lineSquareArea.length*0.8);
  }
  else {
    var i = 0;
    var l = lineSquareArea.length;
  }
  for (i = i; i < l; i++) {
    total += lineSquareArea[i];
    count++;
  }
  var averageArea = (total/count);
  //to_debug('averageArea: '+averageArea);
  
  maxConnect = Math.sqrt(averageArea*2); //positive weighted upper limit for what is a valid connect
  //alert('maxConnect: '+maxConnect);
  if (fullImage) maxConnect = maxConnect*2.5; //quite a bit higher, as the font size can be larger
  
  //remove the too-extreme results (larger then 1100% of average)
  for (var x = linePixelsSquare.length - 1; x >= 0; x--) { //lower then 1100% sometimes removes real letters that are linked together - may have to be raised even more
    if (linePixelsSquare[x][6] > averageArea*11) { linePixelsSquare.splice(x, 1); }
  }
  
  //calculate distance between each side
  var connectDistances=[[],[],[],[],0,0,0,0];
  for(var base=0;base<linePixelsSquare.length;base++) {
    lowest_left=-5000;
    lowest_right=5000;
    lowest_top=-5000;
    lowest_bot=5000;
    for(var comp=0;comp<linePixelsSquare.length;comp++) {
    
      //check if the to-compare blob is on the same height
      var top_y=linePixelsSquare[base][1]+linePixelsSquare[base][5]*0.15;
      var bot_y=linePixelsSquare[base][1]+linePixelsSquare[base][5]*0.85;
      var left_x =linePixelsSquare[base][0]+linePixelsSquare[base][4]*0.15;
      var right_x=linePixelsSquare[base][0]+linePixelsSquare[base][4]*0.85;
      
      if (bot_y-linePixelsSquare[comp][1] >=0 && top_y-linePixelsSquare[comp][3] <=0) {
        //check right
        if (linePixelsSquare[comp][0]-linePixelsSquare[base][2] >= 0 && linePixelsSquare[comp][0]-linePixelsSquare[base][2] < lowest_right 
         && linePixelsSquare[comp][0]-linePixelsSquare[base][2] < maxConnect) {
          lowest_right = linePixelsSquare[comp][0]-linePixelsSquare[base][2];
        }
        //check left
        if (linePixelsSquare[comp][2]-linePixelsSquare[base][0] <= 0 && linePixelsSquare[comp][2]-linePixelsSquare[base][0] > lowest_left
         && linePixelsSquare[comp][2]-linePixelsSquare[base][0] > -maxConnect) {
          lowest_left = linePixelsSquare[comp][2]-linePixelsSquare[base][0];
        }
      }
      else if (right_x-linePixelsSquare[comp][0] >=0 && left_x-linePixelsSquare[comp][2] <=0) {
        //check down
        if (linePixelsSquare[comp][1]-linePixelsSquare[base][3] >= 0 && linePixelsSquare[comp][1]-linePixelsSquare[base][3] < lowest_bot
         && linePixelsSquare[comp][1]-linePixelsSquare[base][3] < maxConnect) {
          lowest_bot = linePixelsSquare[comp][1]-linePixelsSquare[base][3];
        }
        //check up
        if (linePixelsSquare[comp][3]-linePixelsSquare[base][1] <= 0 && linePixelsSquare[comp][3]-linePixelsSquare[base][1] > lowest_top
         && linePixelsSquare[comp][3]-linePixelsSquare[base][1] > -maxConnect) {
          lowest_top = linePixelsSquare[comp][3]-linePixelsSquare[base][1];
        }
      }
      
      
    /* huge block of debug data (possibly outdated)
    alert(linePixelsSquare[base]+'\n'+linePixelsSquare[comp]+'\n'+
      (bot_y-linePixelsSquare[comp][1] >=0)+'\n'+
      (top_y-linePixelsSquare[comp][3] <=0)+'\n\n'+
      (linePixelsSquare[comp][0]-linePixelsSquare[base][2] >= 0)+'\n'+
      (linePixelsSquare[comp][0]-linePixelsSquare[base][2] < lowest_right)+'\n'+
      (linePixelsSquare[comp][2]-linePixelsSquare[base][0] <= 0)+'\n'+
      (linePixelsSquare[comp][2]-linePixelsSquare[base][0] > lowest_left)+'\n\n\n'+
      (right_x-linePixelsSquare[comp][0] >=0)+'\n'+
      (left_x-linePixelsSquare[comp][2] <=0)+'\n\n'+
      (linePixelsSquare[comp][1]-linePixelsSquare[base][3] >= 0)+'\n'+
      (linePixelsSquare[comp][1]-linePixelsSquare[base][3] < lowest_top)+'\n'+
      (linePixelsSquare[comp][3]-linePixelsSquare[base][1] <= 0)+'\n'+
      (linePixelsSquare[comp][3]-linePixelsSquare[base][1] > lowest_bot)+'\n'+
      (lowest_right)+'\n'+
      (lowest_left)+'\n\n'+
      (lowest_top)+'\n'+
      (lowest_bot)+'\n'+
      ('')+'\n'+
      ('')+'\n'+
      ('')+'\n');
      //*/
      
    }
    if (lowest_right !== 5000) connectDistances[0].push(lowest_right);
    if (lowest_left !== -5000) connectDistances[1].push(lowest_left);
    if (lowest_bot !== 5000)   connectDistances[2].push(lowest_bot);
    if (lowest_top !== -5000)  connectDistances[3].push(lowest_top);
  }
    
  connectDistances[0].sort(function(a,b){return a - b});
  connectDistances[1].sort(function(a,b){return a - b});
  connectDistances[2].sort(function(a,b){return a - b});
  connectDistances[3].sort(function(a,b){return a - b});
  
  var totalVertical = 0;
  var totalVertical2 = 0;
  var totalHorizontal = 0;
  var totalHorizontal2 = 0;

  var count = 0;
  for (var i = 0; i < 4; i++) {
    for (var x = 0, l = connectDistances[i].length; x < l; x++) {
      if (l > 5 && (x < Math.ceil(l*1/5) || x > Math.floor(l*4/5))) { continue; }
      connectDistances[i+4] += connectDistances[i][x];
      count++;
    }
    connectDistances[i+4] = connectDistances[i+4]/count;
    if (connectDistances[i+4] < 0) connectDistances[i+4] = connectDistances[i+4]*-1; //finally invert the negatives
                                    //really specific formula i made up to scale low values, rough idea; 5->*2.32 / 10->*1.72 / 15->*1.45 / 25->*1.16
    if (connectDistances[i+4] < 25) { connectDistances[i+4] = connectDistances[i+4]*(Math.pow(connectDistances[i+4],0.57)/(connectDistances[i+4]*0.215)); }
    count = 0;
  }
  var connectHorizontal = Math.round((connectDistances[4]+connectDistances[5])/.2)/10; //round to 1 digit
  var connectVertical =   Math.round((connectDistances[6]+connectDistances[7])/.2)/10;
  
  
  if (isNaN(connectHorizontal)) connectHorizontal = 0;
  if (isNaN(connectVertical)) connectVertical = 0;
  
  return [connectHorizontal, connectVertical];
}


function connectBlobs(linePixelsSquare, linePixelsSquareSmall, width, height, connectHorizontal, connectVertical, fullImage) {
  var textBlobs = [];
  width = width*4; // pixel width -> data width
  
  //temp fix - needs some more testing to figure out the best logic to deal with them. (todo)
  //possible problems: keeps on expanding forever on certain background
  //possible fix: only allow 0-3 jumps originating from 'small' blobs, which must originate from a real letter
  linePixelsSquare = linePixelsSquare.concat(linePixelsSquareSmall);
  
  var loop = 0;
  while (true) {
    textBlobs[loop] = [];
    textBlobs[loop][0] = linePixelsSquare.splice(0, 1)[0];
    
    while (true) {
      var toRemove = [];
      for (var i = 0; i < textBlobs[loop].length; i++) {
        for (var x = 0, l = linePixelsSquare.length; x < l; x++) {
          //x1    y1    x2    y2    width           height          area                              pixel count
          //[0]   [1]   [2]   [3]   [4]             [5]             [6]                               [7]
          
          //textBlobs[loop] = collection of 'linePixelsSquare' arrays.
          
          var top_y = textBlobs[loop][i][1] + textBlobs[loop][i][5]*0.10;
          var bot_y = textBlobs[loop][i][1] + textBlobs[loop][i][5]*0.90;
          var left_x =textBlobs[loop][i][0] + textBlobs[loop][i][4]*0.10;
          var right_x=textBlobs[loop][i][0] + textBlobs[loop][i][4]*0.90;
          
          if (textBlobs[loop][i][4] < connectHorizontal) { //if the letter is smaller then the jump distance (thus, very small)
            left_x = left_x - connectHorizontal*0.5;       //otherwise jumping from too small letters is faulty
            right_x = right_x + connectHorizontal*0.5;
          }
          
          if (bot_y - linePixelsSquare[x][1] >= 0 && top_y - linePixelsSquare[x][3] <= 0) {
            //check right
            if (linePixelsSquare[x][0] >= textBlobs[loop][i][0] && linePixelsSquare[x][0] - textBlobs[loop][i][2] <= connectHorizontal) {
              if (toRemove.indexOf(x) === -1) { toRemove.push(x); }
            }
            //check left
            if (linePixelsSquare[x][2] <= textBlobs[loop][i][2] && linePixelsSquare[x][2] - textBlobs[loop][i][0] >= -connectHorizontal) {
              if (toRemove.indexOf(x) === -1) { toRemove.push(x); }
            }
          }
          else if (right_x - linePixelsSquare[x][0] >= 0 && left_x - linePixelsSquare[x][2] <= 0) {
            //check down
            if (linePixelsSquare[x][1] >= textBlobs[loop][i][1] && linePixelsSquare[x][1] - textBlobs[loop][i][3] <= connectVertical) {
              if (toRemove.indexOf(x) === -1) { toRemove.push(x); }
            }
            //check up
            if (linePixelsSquare[x][3] <= textBlobs[loop][i][3] && linePixelsSquare[x][3] - textBlobs[loop][i][1] >= -connectVertical) {
              if (toRemove.indexOf(x) === -1) { toRemove.push(x); }
            }
          }
        }
      }
      if (toRemove.length === 0) break; //no more nearby letters found.
      
      toRemove.sort(function(a,b){return a - b}); //sort by number
      for (var i = toRemove.length - 1; i >= 0; i--) {
        textBlobs[loop].push(linePixelsSquare.splice(toRemove[i],1)[0]);
      }
      
      runTime = Date.now();
      if ((runTime - startTime) > noteAssist_settingsJson.forceEnd) { alert('"connect Blobs"(inner) got stuck'); break; }
    }
    
    if (linePixelsSquare.length === 0) break;
    if (linePixelsSquare[0][7] < 9) break; //small blobs are concat'd after the normal blobs atm - if all normal blobs have run out, break, part of temp fix
    
    loop++;
    
    runTime = Date.now();
    if ((runTime - startTime) > noteAssist_settingsJson.forceEnd) { alert('"connect Blobs"(outer) got stuck'); break; }
  }
  
  //try to jump between the 2 bigger texts (connects multiple paragraphs)
  if (textBlobs.length > 1) {
    if (fullImage) { //full image generally already has higher connect limits (and more noise) - but those scanned by full image will be taken through a 2nd pass, so may not be needed?
      connectHorizontal = connectHorizontal*2;
      connectVertical = connectVertical*2;
    }
    else {
      connectHorizontal = connectHorizontal*3;
      connectVertical = connectVertical*3;
    }
    
    
    if (fullImage) { //filter out single blobs, since those cannot be jumped from/to anyway
      for (var i = textBlobs.length - 1; i >= 0; i--) {
        if (textBlobs[i].length === 1) {
          textBlobs.splice(i,1);
        }
      }
    }
    
    var jumps = [];
    for (var base = 0; base < textBlobs.length; base++) {
      var sizeBase = 0;
      for (var i = 0; i < textBlobs[base].length; i++) {
        sizeBase += textBlobs[base][i][7];
      }
      for (var comp = 0; comp < textBlobs.length; comp++) {
        if (comp === base) { continue; } //don't try to jump to itself
        var sizeComp = 0;
        for (var i = 0; i < textBlobs[comp].length; i++) { //can be improved by not having to calculate this every time (todo - perf)
          sizeComp += textBlobs[comp][i][7];
        }
        
        var sizeRatio = sizeBase/sizeComp;
        if (sizeRatio < 1 || sizeRatio > 15) { continue; } //if the target is bigger OR smaller than 15x the base, skip
        
        //now we have a larger base, and a smaller (but not too small) target to compare
        for (var i = 0; i < textBlobs[base].length; i++) {
          for (var x = 0; x < textBlobs[comp].length; x++) { //can be improved by collapsing all data in the arrays first, then checking if the 2 collapsed boxes are in range (todo - perf)
          
            var top_y  = textBlobs[base][i][1] + textBlobs[base][i][5]*0.10;
            var mid_y  = textBlobs[base][i][1] + textBlobs[base][i][5]*0.50;
            var bot_y  = textBlobs[base][i][1] + textBlobs[base][i][5]*0.90;
            var left_x = textBlobs[base][i][0] + textBlobs[base][i][4]*0.10;
            var mid_x  = textBlobs[base][i][0] + textBlobs[base][i][4]*0.50;
            var right_x= textBlobs[base][i][0] + textBlobs[base][i][4]*0.90;
            var matchFound=false;
            
            if (bot_y - textBlobs[comp][x][1] >= 0 && top_y - textBlobs[comp][x][3] <= 0) {
              //check right
              if (textBlobs[comp][x][0] >= mid_x && textBlobs[comp][x][0] - textBlobs[base][i][2] <= connectHorizontal) {
                matchFound = true;
              }
              //check left
              if (textBlobs[comp][x][2] <= mid_x && textBlobs[comp][x][2] - textBlobs[base][i][0] >= -connectHorizontal) {
                matchFound = true;
              }
            }
            else if (right_x - textBlobs[comp][x][0] >= 0 && left_x - textBlobs[comp][x][2] <= 0) {
              //check down
              if (textBlobs[comp][x][1] >= mid_y && textBlobs[comp][x][1] - textBlobs[base][i][3] <= connectVertical) {
                matchFound = true;
              }
              //check up
              if (textBlobs[comp][x][3] <= mid_y && textBlobs[comp][x][3] - textBlobs[base][i][1] >= -connectVertical) {
                matchFound = true;
              }
            }
            if (matchFound) { break; }
          }
          if (matchFound) { break; }
        }
        if (matchFound) {
          jumps.push(base);
          jumps.push(comp);
        }
      }
    }
    
    if (jumps.length > 0) {
      //alert('jumps: '+jumps+'\ntypeof: '+(typeof jumps)+'\nlength: '+(jumps.length));
      var toRemove = [];
      
      for (var i = jumps.length - 2; i >= 0; i -= 2) {
        textBlobs[jumps[i]] = textBlobs[jumps[i]].concat(textBlobs[jumps[i+1]]); //added data from 'jumped-to' arrays to the 'jumped from' ones

        if (i+1 === jumps.indexOf(jumps[i+1])) {
          toRemove.push(jumps[i+1]); //store the to-remove indexes in a seperate array
        }
      }
      
      toRemove.sort(function(a,b){return a - b}); //sort by number so the deletion doesn't mess up
      for (var i = toRemove.length - 1; i >= 0; i--) {
        textBlobs.splice(toRemove[i],1); //remove 'jumped-to' blobs
      }
    }
  }
  
  //compress each list of linePixelsSquare arrays into a single square
  for(var i=0;i<textBlobs.length;i++) {
    for(var x=1;x<textBlobs[i].length;x++) {
      //linePixelsSquare[i]  
      //x1    y1    x2    y2    width           height          area                              pixel count
      //[0]   [1]   [2]   [3]   [4]             [5]             [6]                               [7]
      if (textBlobs[i][x][0] < textBlobs[i][0][0]) { textBlobs[i][0][0] = textBlobs[i][x][0]; }
      if (textBlobs[i][x][2] > textBlobs[i][0][2]) { textBlobs[i][0][2] = textBlobs[i][x][2]; }
      if (textBlobs[i][x][1] < textBlobs[i][0][1]) { textBlobs[i][0][1] = textBlobs[i][x][1]; }
      if (textBlobs[i][x][3] > textBlobs[i][0][3]) { textBlobs[i][0][3] = textBlobs[i][x][3]; }
    }
    //recalculate width/height/area & dump all other useless data.
    textBlobs[i][0][4] = textBlobs[i][0][2]-textBlobs[i][0][0]+1;
    textBlobs[i][0][5] = textBlobs[i][0][3]-textBlobs[i][0][1]+1;
    textBlobs[i][0][6] = textBlobs[i][0][4]*textBlobs[i][0][5];
    
                  //x1                 y1                 x2                 y2                 width              height             area               blob count
    textBlobs[i] = [textBlobs[i][0][0], textBlobs[i][0][1], textBlobs[i][0][2], textBlobs[i][0][3], textBlobs[i][0][4], textBlobs[i][0][5], textBlobs[i][0][6], textBlobs[i].length]
    
  }
  
  return textBlobs;
}


function ghostRightclick(e) {
  cancelEvent(e);
  var noteBox = this;
  var noteBoxInner = noteBox.getElementsByClassName('unsaved')[0];

  if (noteBoxInner && noteBoxInner.className.indexOf('-disabled') === -1) {
    //note-box ui-draggable ui-resizable ghostNote ghostNote ui-resizable-disabled ui-state-disabled ui-draggable-disabled

    var noteDataId = this.getAttribute('data-id');
    var noteElements = document.getElementById('note-container').childNodes;
    var removedCount = 0;

    for (var i = noteElements.length - 1; i >= 0; i--) {
      if (noteElements[i].getAttribute('data-id') === noteDataId) {
        noteElements[i].parentNode.removeChild(noteElements[i]);
        removedCount++;
      }
      if (removedCount === 2) break;
    }
  }
}

function ghostNote(target, notePositions) {
  var notes_all = document.getElementById('note-container').getElementsByClassName('note-box');
  if (target === 'last') { //last one in the note-container
    var noteBox = notes_all[notes_all.length-1];

    noteBox.className += ' ghostNote';
    noteBox.addEventListener('contextmenu', ghostRightclick, false); //rightclick
  }
  else if (target === 'createAll') {
    for (var i = 0; i < notePositions.length; i++) {
      Danbooru.Note.create(notePositions[i][0], notePositions[i][1], notePositions[i][2], notePositions[i][3]); //5th parameter, event, = undefined -> no resize
      ghostNote('last'); //also fire ghost, it's packed together with resize in Note.create, which we don't fire
    }
  }
}


function expand(a) {
  var noteBox;
  if (a.parentNode) { noteBox = a.parentNode; }
  else if (this.parentNode) { noteBox = this.parentNode; }
  else {
    var notes_all = document.getElementById('note-container').getElementsByClassName('note-box');
    noteBox = notes_all[notes_all.length-1];
  }
  
  var noteBoxInner = noteBox.getElementsByClassName('note-box-inner-border')[0];
  
  var expandDistance = 5;
  expandDistance = Math.floor(expandDistance*fitToScreenRatio);
  
  var x = parseInt(noteBox.style.left,10);
  var y = parseInt(noteBox.style.top,10);
  var noteWidth = parseInt(noteBox.style.width,10);
  var noteHeight = parseInt(noteBox.style.height,10);
  
  var imgEl = document.getElementById('image');
  imgHeight = Math.floor((imgEl.naturalHeight - 2)*fitToScreenRatio);
  imgWidth = Math.floor((imgEl.naturalWidth - 2)*fitToScreenRatio);
  
  if (x - expandDistance >= 0) noteBox.style.left = (x - expandDistance) + 'px';
  else noteBox.style.left = '0px';
  if (y - expandDistance >= 0) noteBox.style.top = (y - expandDistance) + 'px';
  else noteBox.style.top = '0px';
  
  if ((x+noteWidth) + expandDistance*2 <= imgWidth) noteBox.style.width = (noteWidth + expandDistance*2) + 'px';
  else noteBox.style.width = (imgWidth - x + expandDistance) + 'px';
  if ((y+noteHeight) + expandDistance*2 <= imgHeight) noteBox.style.height = (noteHeight + expandDistance*2) + 'px';
  else noteBox.style.height = (imgHeight - y + expandDistance) + 'px';
  
  noteBoxInner.style.width = (parseInt(noteBox.style.width) - 2) + 'px';
  noteBoxInner.style.height = (parseInt(noteBox.style.height) - 2) + 'px';
}

function noteAssist_filterOverlappingNotes(notePositions) {
  var existingNotes = document.getElementsByClassName('note-box');
  
  for(var i = notePositions.length-1; i>=0; i--) {
    var base_x1 = parseInt(notePositions[i][0]);
    var base_x2 = parseInt(notePositions[i][2]) + base_x1;
    var base_y1 = parseInt(notePositions[i][1]);
    var base_y2 = parseInt(notePositions[i][3]) + base_y1;
    var base_surface = (base_x2-base_x1+1)*(base_y2-base_y1+1);
    for(var j = existingNotes.length-1; j>=0; j--) {
      if(!existingNotes[j].style.width) { continue; }
      var comp_x1 = parseInt(existingNotes[j].style.left);
      var comp_x2 = parseInt(existingNotes[j].style.width) + comp_x1;
      var comp_y1 = parseInt(existingNotes[j].style.top);
      var comp_y2 = parseInt(existingNotes[j].style.height) + comp_y1;
      
      if ((base_x1 < comp_x2) && (base_x2 > comp_x1)) { //horizontal interlocked
      if ((base_y1 < comp_y2) && (base_y2 > comp_y1)) { //vertical interlocked
        var overlap = 0;
        var overlap_x = 0;
        var overlap_y = 0;
        if      ((base_x1 <= comp_x1) && (base_x2 >= comp_x2)) { //comp x-axis completely covered by base
          overlap_x = comp_x2 - comp_x1;
        }
        else if ((base_x1 <= comp_x1) && (comp_x2 >  base_x2)) { //comp partial overlap, centered towards ->
          overlap_x = base_x2 - comp_x1;
        }
        else if ((comp_x1 <  base_x1) && (base_x2 >= comp_x2)) { //comp partial overlap, centered towards <-
          overlap_x = comp_x2 - base_x1;
        }
        else if ((comp_x1 <  base_x1) && (comp_x2 >  base_x2)) { //comp overlaps base on the entire x-axis
          overlap_x = base_x2 - base_x1;
        }
        
        if      ((base_y1 <= comp_y1) && (base_y2 >= comp_y2)) { //comp y-axis completely covered by base
          overlap_y = comp_y2 - comp_y1;
        }
        else if ((base_y1 <= comp_y1) && (comp_y2 >  base_y2)) { //comp partial overlap, centered towards ->
          overlap_y = base_y2 - comp_y1;
        }
        else if ((comp_y1 <  base_y1) && (base_y2 >= comp_y2)) { //comp partial overlap, centered towards <-
          overlap_y = comp_y2 - base_y1;
        }
        else if ((comp_y1 <  base_y1) && (comp_y2 >  base_y2)) { //comp overlaps base on the entire y-axis
          overlap_y = base_y2 - base_y1;
        }
        
        overlap = (overlap_x+1) * (overlap_y+1);
        
        if(overlap >= base_surface*0.75) {
          notePositions.splice(i,1); //if the to-be-made ghost note is 75% covered by a existing note, do not create the ghost.
          break;
        }
      }
      }
    }
  }
}

function noteAssist_fixOutOfBounds(noteBox) { //easier then doing messy calculations before/after "adjust"
  var imgEl = document.getElementById('image');
  var imgWidth = imgEl.width;
  var imgHeight = imgEl.height;
  
  if (noteBox === 'all') { //check all ghost notes (created by generate-all)
    var notes = document.getElementsByClassName('ghostNote');
    
    for (var i = 0; i < notes.length; i++) {
      var noteX = parseInt(notes[i].style.left, 10);
      var noteY = parseInt(notes[i].style.top, 10);
      var noteW = parseInt(notes[i].style.width, 10);
      var noteH = parseInt(notes[i].style.height, 10);
      
      if (noteX < 0) {
        notes[i].style.left = '0px';
      }
      if (noteY < 0) {
        notes[i].style.top = '0px';
      }
      if (noteW > imgWidth) {
        notes[i].style.width = (imgWidth + 'px');
      }
      if (noteH > imgHeight) {
        notes[i].style.height = (imgHeight + 'px');
      }
    }
  }
  else { //check the currently resizing/created note
    var noteX = parseInt(noteBox.style.left, 10);
    var noteY = parseInt(noteBox.style.top, 10);
    var noteW = parseInt(noteBox.style.width, 10);
    var noteH = parseInt(noteBox.style.height, 10);
    
    if (noteX < 0) {
      noteBox.style.left = '0px';
    }
    if (noteY < 0) {
      noteBox.style.top = '0px';
    }
    if (noteW > imgWidth) {
      noteBox.style.width = (imgWidth + 'px');
    }
    if (noteH > imgHeight) {
      noteBox.style.height = (imgHeight + 'px');
    }
  }
}

function snap(e, noExpand, fullImage, virtualNote, x, y, width, height) { //e = mouseEvent
  //if(!startTime) startTime = Date.now(); //start point for 'noteAssist_settingsJson.forceEnd'
  startTime = Date.now(); //start point for 'noteAssist_settingsJson.forceEnd'
  /* */ benchStart = Date.now(); //time tracker for debugging stuff
  if (!noExpand) { expand(this); }
  
  var imgEl = document.getElementById('image');
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var detectionSensitivity = 1;
  var adjust = Math.round(3*fitToScreenRatio*scaleModifier); //without adjust, the note border overlaps the text

  var textColorOverride = document.getElementById('noteAssist_ui').getElementsByClassName('group2');
  if (textColorOverride[0].checked) { textColorOverride = 0 }           //Black text, never invert
  else if (textColorOverride[1].checked) { textColorOverride = 1 }      //White text, always invert
  else                                   { textColorOverride = 2 }      //Use auto-detect
    
  if (fullImage) { //generate all notes
    var x =      0;
    var y =      0;
    var width =  imgEl.naturalWidth;
    var height = imgEl.naturalHeight;
    
    var detectionSensitivity = document.getElementById('noteAssist_ui').getElementsByClassName('group1');
    if (detectionSensitivity[0].checked) { detectionSensitivity = 1 }        //detect anything of size 1 & bigger
    else if (detectionSensitivity[1].checked) { detectionSensitivity = 5 }   //detect anything of size 5 & bigger
    
  }
  else if (!virtualNote) { //resize single note
    if (e === 'last') { //last note created
      var notes_all = document.getElementById('note-container').getElementsByClassName('note-box');
      var noteBox = notes_all[notes_all.length-1];
      var noteBoxInner = noteBox.getElementsByClassName('note-box-inner-border')[0];
    }
    else { //clicked note
     var noteBox = this.parentNode;
     var noteBoxInner = noteBox.getElementsByClassName('note-box-inner-border')[0];
    }
    var x =      Math.ceil(parseInt(noteBox.style.left, 10)/fitToScreenRatio);
    var y =      Math.ceil(parseInt(noteBox.style.top, 10)/fitToScreenRatio);
    var width =  Math.ceil(parseInt(noteBox.style.width, 10)/fitToScreenRatio);
    var height = Math.ceil(parseInt(noteBox.style.height, 10)/fitToScreenRatio);
  }
  
  canvas.height = height; //debug stuff
  canvas.width = width;
  
  context.drawImage(imgEl, x, y, width, height, 0, 0, width, height); //draw only the area we need to a temp. canvas
  var data = context.getImageData(0, 0, width, height);               //extract the raw pixel data.
  
  
  if (textColorOverride === 2) { //auto-detect
    var isReverse = whiteTextOnBlack(data); //check if the post is white text on black - returns "true" if it is.
    if (isReverse) {
      convert_blackWhite(data, true);
    }
    else {
      convert_blackWhite(data);
    }
  }
  else if (textColorOverride === 1) { //White text
    convert_blackWhite(data, true);
  }
  else if (textColorOverride === 0) { //Black text
    convert_blackWhite(data);
  }
  else {
    alert('critical error, "textColorOverride" is an invalid value');
  }
  
  context.putImageData(data, 0, 0);                 ////
  context.strokeStyle = "rgb(0,0,0)";              ////
  context.lineWidth   = 2;                          //overwrite the outer border to connect all lines going outside the picture.
  context.strokeRect(0, 0, width, height);          ////
  data = context.getImageData(0, 0, width, height); ////
  
   
  optimizeImage1(data); //'compress' large blocks of pure black.
  optimizeImage2(data); //both only help for the "findLines" code
  
  
  /* */ benchStop = Date.now();
  /* */ to_debug('T: miscStart: '+(benchStop-benchStart));
  killMain(data);
  /* */ benchStop = Date.now();
  /* */ to_debug('T: killMain: '+(benchStop-benchStart));
  
  
  //detect & store connected lines (blobs)
  var lineCount = [];
  var linePixels = [];
  var small_lineCount = [];
  var small_linePixels = [];
  var pixels = data.data;
  for (var i = 0, l = pixels.length; i < l; i += 4) {
    if (pixels[i] === 0) {
      var singleLine = findLines(data, i);
      if (singleLine[0] > 8) {
        lineCount.push(singleLine[0]);
        linePixels.push(singleLine[1]);
      }
      else if (singleLine[0] < 9 && singleLine[0] > 2) {
        small_lineCount.push(singleLine[0]);
        small_linePixels.push(singleLine[1]);
      }
    }
  }
  
  if (lineCount.length === 0) {
    if (virtualNote) { //no results on 2nd snap during generate-all, keep at first size.
      return [(x - adjust) + 'px', (y - adjust) + 'px', ((width + adjust * 2) - 1) + 'px', ((height + adjust * 2) - 1) + 'px'];
    }
    else {
      to_debug('0 letters found(lineCount)');
      return;
    }
  }
  
  
  /* */ benchStop = Date.now();
  /* */ to_debug('T: findLines: ' + (benchStop - benchStart));
  
  
  var linePixelsSquare      = blobsToSquares(lineCount, linePixels, width, height);
  var linePixelsSquareSmall = blobsToSquares(small_lineCount, small_linePixels, width, height);
  
  //also does some noise-filtering & gets rid of very large non-text blobs
  var connectDistances = calculateConnect(linePixelsSquare,fullImage);
  var connectHorizontal = connectDistances[0];
  var connectVertical = connectDistances[1];
  
  to_debug('connect: H:'+connectHorizontal+' V:'+connectVertical);
  //* */ benchStop = Date.now();
  //* */ to_debug('T: calculateConnect: ' + (benchStop - benchStart));
  
  
  //================================== debug - draw single letters
  /*
  if (noteAssist_debug || noteAssist_settingsJson.debug) {
    context.putImageData(data, 0, 0);
    context.strokeStyle = "rgba(0,255,255,0.8)";
    context.lineWidth   = 1;
    for (var i = 0; i < linePixelsSquare.length; i++) {
      context.strokeRect(linePixelsSquare[i][0], linePixelsSquare[i][1], linePixelsSquare[i][4], linePixelsSquare[i][5]);
      //to_debug('<br>x: '+linePixelsSquare[i][0]+'<br>y: '+linePixelsSquare[i][1]+'<br>x2: '+linePixelsSquare[i][2]+'<br>y2: '+linePixelsSquare[i][3]+'<br>w: '+linePixelsSquare[i][4]+'<br>h: '+linePixelsSquare[i][5]);
    }
    data = context.getImageData(0, 0, width, height);
  }
  //*/
  
  
  var textBlobs = connectBlobs(linePixelsSquare, linePixelsSquareSmall, width, height, connectHorizontal, connectVertical, fullImage);
  /* */ benchStop = Date.now();
  /* */ to_debug('T: textBlobs: ' + (benchStop - benchStart));
  
  //filter out notes smaller then 10x10
  for (var i = textBlobs.length - 1; i >= 0; i--) {
    if (textBlobs[i][4] < 6 || textBlobs[i][5] < 6) { //ignore stuff smaller then 10px on one of the dimensions (+adjust)
      textBlobs.splice(i,1);
    }
  }
  
  if (textBlobs.length === 0) { to_debug('0 letters found'); return; }
  
  var largestBlob = 0;
  var largestBlobIndex;
  for (var i = 0; i < textBlobs.length; i++) {
    if (textBlobs[i][7] > largestBlob) {
      largestBlob = textBlobs[i][7];
      largestBlobIndex = i;
    }
  }
  
  
  //================================== debug - draw textBlobs
  //*
  if (noteAssist_debug || noteAssist_settingsJson.debug) {
    context.putImageData(data, 0, 0);
    context.strokeStyle = "rgba(255,255,255,0.8)";
    context.lineWidth   = 1;
    for (var i = 0; i < textBlobs.length; i++) {
      if (textBlobs[i][7] >= detectionSensitivity) {
        context.strokeRect(textBlobs[i][0], textBlobs[i][1], textBlobs[i][2] - textBlobs[i][0], textBlobs[i][3] - textBlobs[i][1]);
      }
      //to_debug('x/y: '+textBlobs[i][0]+','+textBlobs[i][1]+'-'+textBlobs[i][2]+','+textBlobs[i][3]+' L: '+textBlobs[i][7]);
      //to_debug('--'+textBlobs[i]);
    }
    data = context.getImageData(0, 0, width, height);
  }
  //*/
  
  //================================== debug - attach the data in visual form
  if (noteAssist_debug || noteAssist_settingsJson.debug) {
    if(!document.getElementById('debug-canvas-spacer')) {
      document.getElementById('image-container').appendChild($c('div',{id:'debug-canvas-spacer',style:'height:1em;width:100%'})); //so the canvases go below the image
    }
    context.putImageData(data, 0, 0);
    document.getElementById('image-container').appendChild(canvas);
  }
  
  if (fitToScreenRatio !== 1 && !fullImage) { //largestBlobIndex isn't used when scanning fullImage
    x *= fitToScreenRatio;
    y *= fitToScreenRatio;
    textBlobs[largestBlobIndex][0] *= fitToScreenRatio;
    textBlobs[largestBlobIndex][1] *= fitToScreenRatio;
    textBlobs[largestBlobIndex][4] *= fitToScreenRatio;
    textBlobs[largestBlobIndex][5] *= fitToScreenRatio;
  }
  
  if (fullImage) {
    var notePositions = [];
    for (var i = 0; i < textBlobs.length; i++) {
      if (textBlobs[i][7] >= detectionSensitivity) {
        var secondSnap = snap(null, true, false, true, textBlobs[i][0]-2, textBlobs[i][1]-2, textBlobs[i][4]+4, textBlobs[i][5]+4);
        if (secondSnap) { //is empty if the 2nd snap returns no results (only noise less then 10x10 px)
          notePositions.push(secondSnap);
        }
      }
    }
    noteAssist_filterOverlappingNotes(notePositions);
    ghostNote('createAll', notePositions);
  }
  else if (virtualNote) { //doing 2nd snap, just return the data
    return [(x + textBlobs[largestBlobIndex][0] - adjust) + 'px', (y + textBlobs[largestBlobIndex][1] - adjust) + 'px', ((textBlobs[largestBlobIndex][4] + adjust * 2) - 1) + 'px', ((textBlobs[largestBlobIndex][5] + adjust * 2) - 1) + 'px'];
  }
  else { //just resize single note
    noteBox.style.left = (x + textBlobs[largestBlobIndex][0] - adjust) + 'px';
    noteBox.style.top = (y + textBlobs[largestBlobIndex][1] - adjust) + 'px';
    noteBox.style.width = ((textBlobs[largestBlobIndex][4] + adjust * 2) - 1) + 'px';
    noteBox.style.height = ((textBlobs[largestBlobIndex][5] + adjust * 2) - 1) + 'px';

    noteBoxInner.style.width = ((textBlobs[largestBlobIndex][4] + adjust * 2) - 3) + 'px';
    noteBoxInner.style.height = ((textBlobs[largestBlobIndex][5] + adjust * 2) - 3) + 'px';
  }
  
  noteAssist_fixOutOfBounds( (noteBox ? noteBox : 'all') );
  
  runTime = Date.now();
  to_debug('Tot runtime: ' + (runTime - startTime) + '<br/>');
}


//==========================================================
// Hook into danbooru code
//==========================================================

function noteAssist_danbooruHooks() { //adds our own code to the Danbooru.Note functions
  //=========================
  // Hook into Note.create & TranslationMode.start & TranslationMode.create_note
  //=========================
  //*
  Danbooru.Note.TranslationMode.start = function(e) {
    e.preventDefault();

    if (Danbooru.Note.TranslationMode.active) {
      return;
    }
    Danbooru.Note.TranslationMode.active = true;
    
    // custom code starts here
    if(!$('#noteAssist_ui').is(":visible")) {
      $('#noteAssist_ui').show();
      if(!noteAssist_settingsJson.instantNote) {
        Danbooru.Note.TranslationMode.active = false;
        return;
      }
    }
    // custom code ends here
    
    $("#image").css("cursor", "crosshair");
    $(document.body).addClass("mode-translation");
    $("#original-file-link").click();
    $("#image").unbind("click", Danbooru.Note.Box.toggle_all);
    $("#image").bind("mousedown", Danbooru.Note.TranslationMode.Drag.start);
    $(window).bind("mouseup", Danbooru.Note.TranslationMode.Drag.stop);

    Danbooru.notice('Translation mode is on. Drag on the image to create notes. <a href="#">Turn translation mode off</a> (shortcut is <span class="key">n</span>).');
    $("#notice a:contains(Turn translation mode off)").click(Danbooru.Note.TranslationMode.stop);
  }
  
  Danbooru.Note.TranslationMode.create_note = function(e, x, y, w, h) {
    var offset = $("#image").offset();
    
    if (w > 9 || h > 9) { /* minimum note size: 10px */
      if (w <= 9) {
        w = 10;
      } else if (h <= 9) {
        h = 10;
      }
      Danbooru.Note.create(x - offset.left, y - offset.top, w, h, e);
    }
    
    $("#note-container").css('visibility', 'visible');
    e.stopPropagation();
    e.preventDefault();
  }
  
  Danbooru.Note.create = function(x, y, w, h, e) { // custom code - added e
    var $note_box = Danbooru.Note.Box.create(Danbooru.Note.id);
    var $note_body = Danbooru.Note.Body.create(Danbooru.Note.id);
    $note_box.css({
      top: y,
      left: x,
      width: w,
      height: h
    });
    $note_box.find(".note-box-inner-border").addClass("unsaved");
    $note_body.html("<em>Click to edit</em>");
    $("#note-container").append($note_box);
    $("#note-container").append($note_body);
    Danbooru.Note.Box.resize_inner_border($note_box);
    Danbooru.Note.id += "x";
    
    // custom code starts here
    if (e && (e === 'resize' || (!e.shiftKey && noteAssist_settingsJson.resizeDefaultOn) || (e.shiftKey && !noteAssist_settingsJson.resizeDefaultOn))) {
      snap('last');
      ghostNote('last');
    }
    // custom code ends here
  };
  //*/
  
}


//==========================================================
// Single-note specific functions
//==========================================================

function noteAssist_getActiveTextarea() {
  var textarea = document.activeElement;  //select active textarea (note edit window)
  if (textarea.nodeName !== 'TEXTAREA') { //if active element is not a textarea, select the last opened edit window
    textarea = null;
    var editWindows = document.getElementsByClassName('note-edit-dialog');
    var l = editWindows.length;
    if(l > 0) {
      for(var i=l-1; i>=0; i--) {
        var w = editWindows[i];
        if(w.style.display === 'block') {
          textarea = w.getElementsByTagName('textarea')[0];
        }
      }
    }
  }
  return textarea;
}

function noteAssist_addCss(e,data) {
  cancelEvent(e); //don't un-focus the textarea
  
  var textarea = noteAssist_getActiveTextarea();
  if(textarea == null) { return; } //no active or visible note edit window found
  
  var value;
  if (e.target && e.target.id) { //get the targeted element
    var targetID = e.target.id;
    if(targetID === 'noteAssist_textBold') {
      value = 'bold';
    }
    else if(targetID === 'noteAssist_textItalic') {
      value = 'italic';
    }
    else if(targetID === 'noteAssist_textSizePlus') {
      value = 'sizePlus';
    }
    else if(targetID === 'noteAssist_textSizeMinus') {
      value = 'sizeMinus';
    }
    else if(targetID === 'noteAssist_textTn') {
      value = 'tn';
    }
    else {
      alert('error, invalid targetID: '+targetID);
    }
  }
  else if(typeof e === 'string') { //not an event
    if(e === 'eyedropper') {
      value = 'eyedropper';
    }
  }
  else {
    alert('"addCss" - critical error - e: '+e)
  }
  
  //get selected text
  var start = textarea.selectionStart;
  var end = textarea.selectionEnd;
  
  if(end - start === 0 && value !== 'tn') {
    start = 0;
    end = textarea.textLength;
  }
  var fullText = textarea.value;
  var selectedText = textarea.value.substring(start, end);
  
  
  var startTag;
  var endTag;
  var startTagLength;
  var endTagLength;
  if(value === 'bold' || value === 'italic' || value === 'tn') {
    if (value === 'bold') {
      startTag = '<b>';
      endTag = '</b>';
    }
    else if (value === 'italic') {
      startTag = '<i>';
      endTag = '</i>';
    }
    else { //tn
      startTag = '<tn>';
      endTag = '</tn>';
    }
    startTagLength = startTag.length;
    endTagLength = endTag.length;
    
    if((selectedText.substr(0, startTagLength) === startTag) && (selectedText.substr(selectedText.length - endTagLength) === endTag)) {
      //the text we selected already contains <b> at it's start & </b> at it's end, remove them.
      textarea.value = fullText.substr(0, start) + selectedText.substring(startTagLength, selectedText.length - endTagLength) + fullText.substr(end);
      textarea.setSelectionRange(start, (end - startTagLength - endTagLength));
    }
    else if((fullText.substr(start - startTagLength, startTagLength) === startTag) && (fullText.substr(end, endTagLength) === endTag)) {
      //the text we selected is already fully wrapped in <b> </b> tags, remove them.
      textarea.value = fullText.substr(0, start - startTagLength) + selectedText + fullText.substr(end + endTagLength);
      textarea.setSelectionRange(start - startTagLength, end - startTagLength);
    }
    else {
      if(value === 'tn' && selectedText.length === 0) { //no text selected, tack the tn to the end of the text.
        textarea.value = fullText + startTag + endTag;
        textarea.setSelectionRange(fullText.length + startTagLength, fullText.length + startTagLength);
      }
      else { //no text selected, wrap all text in the tags
        textarea.value = fullText.substr(0, start) + startTag + selectedText + endTag + fullText.substr(end);
        textarea.setSelectionRange(start, (end + startTagLength + endTagLength));
      }
    }
  }
  else if (value === 'eyedropper') {
    textarea.addEventListener('mousedown', noteAssist_eyedropperHide, false);
    data = data.toUpperCase();
    
    //update the preview text
    if(data) {
      var eyedropperText = document.getElementById('eyedropperText');
      var eyedropperTextHex = document.getElementById('eyedropperTextHex');
      if(noteAssist_eyedropperTarget === 'noteAssist_textColor') {
        eyedropperText.style.color = data;
      }
      else {
        eyedropperText.style.backgroundColor = data;
      }
      eyedropperTextHex.innerHTML = data;
    }
    
    var existingData = '';
    var existingDataLength = 0;
    var addedSpanTags = false;
    if(selectedText.substr(0, 13) !== '<span style="') { //if no <span> tag exists, add it - no need to check for closing tag.
      selectedText = '<span style="">' + selectedText + '</span>';
      addedSpanTags = true;
    }
    else {
      existingData =  selectedText.split('"')[1]; //takes the text in the first pair of quotes found.
      existingDataLength = existingData.length;
      //alert(existingData);
    }
    
    existingData = existingData.split(';');
    for(var i=existingData.length-1; i>=0; i--) {
      existingData[i] = existingData[i].trim(); //remove leading/trailing whitespace
      if(existingData[i].indexOf(noteAssist_eyedropperTarget === 'noteAssist_textColor' ? 'color:' : 'background-color:') === 0) { //find value that starts with 'color:' or 'background-color:' & remove it.
        existingData.splice(i,1);
      }
    }
    existingData = existingData.join('; ');
    existingData += (existingData.length > 0 ? '; ' : '');
      
    if(noteAssist_eyedropperTarget === 'noteAssist_textColor') {
      data = existingData + 'color:'+data;
    }
    else { //noteAssist_textBackgroundColor
      data = existingData + 'background-color:'+data;
    }
    
    selectedText = selectedText.split('"');
    selectedText[1] = data;
    selectedText = selectedText.join('"');
    
    textarea.value = fullText.substr(0, start) + selectedText + fullText.substr(end);
    //to_debug
    textarea.setSelectionRange(start, end + (data.length - existingDataLength) + (addedSpanTags ? 22 : 0)); //22 = '<span style=""></span>'
    //alert(existingData);
    
    
  }
  else if(value === 'sizeMinus' || value === 'sizePlus') {
    var existingData = '';
    var existingDataLength = 0;
    var addedSpanTags = false;
    if(selectedText.substr(0, 13) !== '<span style="') { //if no <span> tag exists, add it - no need to check for closing tag.
      selectedText = '<span style="">' + selectedText + '</span>';
      addedSpanTags = true;
    }
    else {
      existingData =  selectedText.split('"')[1]; //takes the text in the first pair of quotes found.
      existingDataLength = existingData.length;
    }
    
    var oldFontSize = 100;
    var newFontSize;
    existingData = existingData.split(';');
    for(var i=existingData.length-1; i>=0; i--) {
      existingData[i] = existingData[i].trim(); //remove leading/trailing whitespace
      if(existingData[i].indexOf('font-size:') === 0) { //find value that starts with 'color:' or 'background-color:' & remove it.
        if(existingData[i].indexOf('%') !== -1) {
          oldFontSize = parseInt(existingData[i].substring(existingData[i].indexOf(':')+1));
        }
        existingData.splice(i,1);
      }
    }
    existingData = existingData.join('; ');
    
    if(value === 'sizeMinus') {
      if(oldFontSize <= 100) {
        newFontSize = oldFontSize - 10;
      }
      else {
        newFontSize = oldFontSize - 33;
      }
    }
    else if(value === 'sizePlus') {
      if(oldFontSize < 100) {
        newFontSize = oldFontSize + 10;
      }
      else {
        newFontSize = oldFontSize + 33;
      }
    }
    if(newFontSize < 40) { return; }
    else if(newFontSize % 100 === 99) { newFontSize += 1; }
    else if(newFontSize % 100 === 1) { newFontSize -= 1; }
    if(newFontSize === 100) { //remove the tag
      data = existingData;
    }
    else { //normal
      existingData += (existingData.length > 0 ? '; ' : '');
      data = existingData + 'font-size:'+newFontSize+'%';
    }
    
    selectedText = selectedText.split('"');
    selectedText[1] = data;
    selectedText = selectedText.join('"');
    
    textarea.value = fullText.substr(0, start) + selectedText + fullText.substr(end);
    textarea.setSelectionRange(start, end + (data.length - existingDataLength) + (addedSpanTags ? 22 : 0)); //22 = '<span style=""></span>'
  }
}


function noteAssist_eyedropper(e) {
  cancelEvent(e);
  
  var textarea = noteAssist_getActiveTextarea();
  if(textarea == null) { return; } //no active or visible note edit window found
  
  noteAssist_eyedropperTarget = e.target.id; //save the last clicked button ID to a global value so we know if it's text-color or background-color
  
  var size = 9;  //area to cut out (in pixels), centered on the mouse
  var zoom = 8;  //number of times to magnify (be sure to change the ones in the other 2 functions as well when changing these)
  var canvasSize = size*zoom;
  var eyedropperSection = document.getElementById('noteAssist_eyedropperSection');
  document.getElementById('noteAssist_eyedropperHint').style.display='block';
  document.body.style.cursor = 'crosshair';
  
  if(eyedropperSection && eyedropperSection.style.display) { //already exists and is initialized (style is '' if the "else" block below has not run yet)
    if(eyedropperSection.style.display !== 'block') {
      eyedropperSection.style.display = 'block';
    }
    document.getElementById('image').addEventListener('mousedown', noteAssist_eyedropperDragStart, false);
    document.getElementById('image').addEventListener('mouseup', noteAssist_eyedropperDragStop, false);
    
    var canvas = document.getElementById('eyedropperPreview_canvas');
    var context = canvas.getContext('2d');
    context.clearRect (0, 0, canvas.width, canvas.height); //clear canvas
  }
  else { 
    var mainContainer = document.getElementById('noteAssist_eyedropperSection');
    mainContainer.style.display = "block";
    var previewContainer = $c('div', {
      id:'eyedropperPreview',
      style:'position:absolute; top:3px; right:3px; width:'+canvasSize+'px; height:'+canvasSize+'px; border:1px solid black;'
    });
    var textContainer = $c('div', {
      style:'position:absolute; top:3px; left:3px; width:'+(200 - 9 - canvasSize)+'px; height:'+canvasSize+'px; border:1px solid black;' //9 = left padding & such
    });
    var canvas = $c('canvas', {
      id:'eyedropperPreview_canvas',
      height:canvasSize+'px',
      width:canvasSize+'px'
    });
    var imgEl = document.getElementById('image');
    
    previewContainer.innerHTML = '<img id="eyedropperPreview_pointer" style="position:absolute;" width="'+canvasSize+'" height="'+canvasSize+'" src="data:image/gif;base64,R0lGODlhUQBRAPAAAAAAAEBAQCH5BAEAAAAALAAAAABRAFEAAAJ/hI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKo2BZaPpXECjiakzgM1qrcynkosAE8UGstBs7m2f2i4jDUR/vUl5fbumwutUxR751yc4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5yQlUAAA7" />';
    textContainer.innerHTML = '<p id="eyedropperText" style="color:#FFFFFF; font-size:133%; margin-top: 5px; text-align:center"><b>bold</b><br/>Lorem Ipsum<br/><span id="eyedropperTextHex">#FFFFFF</span></p>'
    
    previewContainer.appendChild(canvas); //canvas in previewContainer
    mainContainer.appendChild(previewContainer); //previewContainer in (eyedropper) mainContainer
    mainContainer.appendChild(textContainer);    //textContainer in (eyedropper) mainContainer
    
    imgEl.addEventListener('mousedown', noteAssist_eyedropperDragStart, false);
    imgEl.addEventListener('mouseup', noteAssist_eyedropperDragStop, false);
    previewContainer.addEventListener('click', noteAssist_eyedropperPickDetail, false);
    
  }
  noteAssist_addCss('eyedropper', ''); //initiate a span with blank color
}

function noteAssist_eyedropperDragStart(e) {
  cancelEvent(e);
  document.getElementById('image').addEventListener('mousemove', noteAssist_eyedropperDrag, false);
  noteAssist_eyedropperDrag(e);
}

function noteAssist_eyedropperDrag(e) {
  var size = 9;  //area to cut out (in pixels), centered on the mouse
  var zoom = 8;  //number of times to magnify (be sure to change the ones in the other 2 functions as well when changing these)
  var imgEl = document.getElementById('image');
  var canvas = document.getElementById('eyedropperPreview_canvas');
  var context = canvas.getContext('2d');
  
  
  var offset = Math.ceil(zoom/2);
  
  //'getBoundingClientRect()' seems perfered over 'offsetLeft'? However, 'getBoundingClientRect()' gives wrong values when scrolled
  
  var x = e.pageX - imgEl.offsetLeft;
  if (x > offset) { x -= offset };
  var y = e.pageY - imgEl.offsetTop;
  if (y > offset) { y -= offset };
  
  context.drawImage(imgEl, x, y, size, size, 0, 0, size, size); //draw only the area we need to a temp. canvas
  //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  var pixels = context.getImageData(0, 0, size, size).data;               //extract the unzoomed pixel data.
  
  //draw zoom*zoom pixel boxes - simply upscaling the canvas produces very blurry and unusable results
  for(var x=0; x<size;x++) {
    for(var y=0; y<size;y++) {
      var i = x*4 + y*4*size;
      context.fillStyle = 'rgb('+pixels[i]+', '+pixels[i+1]+', '+pixels[i+2]+')';
      context.fillRect (x*zoom, y*zoom, zoom, zoom);
      
      if(x === offset & y === offset) {
        noteAssist_addCss('eyedropper', context.fillStyle);
      }
    }
  }
}

function noteAssist_eyedropperDragStop() {
  var imgEl = document.getElementById('image');
  imgEl.removeEventListener('mousemove', noteAssist_eyedropperDrag, false);
  imgEl.removeEventListener('mousedown', noteAssist_eyedropperDragStart, false);
  imgEl.removeEventListener('mouseup', noteAssist_eyedropperDragStop, false);
  document.getElementById('noteAssist_eyedropperHint').style.display='none';
  document.body.style.cursor = 'auto';
}

function noteAssist_eyedropperHide() {
  this.removeEventListener('mousedown', noteAssist_eyedropperHide, false);
  
  var eyedropperSection = document.getElementById('noteAssist_eyedropperSection');
  if(eyedropperSection) {
    eyedropperSection.style.display='none';
    document.body.style.cursor = 'auto';
  }
  
  var canvas = document.getElementById('eyedropperPreview_canvas');
  var context = canvas.getContext('2d');
  context.clearRect (0, 0, canvas.width, canvas.height); //clear canvas
  
  noteAssist_eyedropperDragStop();
}

function noteAssist_eyedropperPickDetail(e) {
  var size = 9;  //area to cut out (in pixels), centered on the mouse
  var zoom = 8;  //number of times to magnify (be sure to change the ones in the other 2 functions as well when changing these)
  
  var x = e.offsetX;
  var y = e.offsetY;
  
  if(x === 0) { x = 1; } //strange bug, 1px above/left (but not below/right) of the canvas can be clicked
  if(y === 0) { y = 1; }
  
  x = Math.floor(x/zoom)*zoom; //round down to the nearest zoom value
  y = Math.floor(y/zoom)*zoom;
  
  var canvas = document.getElementById('eyedropperPreview_canvas');
  var context = canvas.getContext('2d');
  var data = context.getImageData(0, 0, size*zoom, size*zoom);               //extract the unzoomed pixel data.
  var pixels = data.data;
  
  var i = x*4 + y*4*data.width;
  
  context.fillStyle = 'rgb('+pixels[i]+', '+pixels[i+1]+', '+pixels[i+2]+')'; //trick to easily convert rgb to #hex
  
  noteAssist_addCss('eyedropper', context.fillStyle);
  
  noteAssist_eyedropperHide();
}

//==========================================================
// Settings
//==========================================================

function noteAssist_settingsInit() {
  try {
    var keyPrefix='noteAssist_itsonlyaname.';
    noteAssist_LS_getValue = function (name, defaultValue) {
      var value = localStorage.getItem(keyPrefix + name);
      if (!value) return defaultValue;
      var type = value[0];
      value = value.substring(1);
      switch (type) {
        case 'b':
          return value == 'true';
        case 'n':
          return Number(value);
        default:
          return value;
      }
    }
    noteAssist_LS_setValue = function (name, value) {
      value = (typeof value)[0] + value;
      localStorage.setItem(keyPrefix + name, value);
    }
  }
  catch(e) {
    alert('Note Assist critical error.\nLocal storage could not be accessed, details:\n'+e);
    return;
  }
  noteAssist_settingsJson = noteAssist_LS_getValue('settings');
  
  if(noteAssist_settingsJson) {
    try {
      noteAssist_settingsJson = JSON.parse(noteAssist_settingsJson);
      
      var count = 0;
      for ( property in noteAssist_settingsJson ) {
        if(noteAssist_settingsJson.hasOwnProperty(property)) count++;
      }
      
      if(count !== 5) { //update this with # of object in storage - since we passed 'if(noteAssist_settingsJson)' must be at least something
                        //if count is wrong up, re-create the object with either the saved value (if available) or a default.
        var new_json =
          '{'+
          '"uiPositionLeft":'  + (noteAssist_settingsJson.uiPositionLeft  == null ? noteAssist_uiPositionLeft  : noteAssist_settingsJson.uiPositionLeft)  + ','+
          '"resizeDefaultOn":' + (noteAssist_settingsJson.resizeDefaultOn == null ? noteAssist_resizeDefaultOn : noteAssist_settingsJson.resizeDefaultOn) + ','+
          '"instantNote":'     + (noteAssist_settingsJson.instantNote     == null ? noteAssist_instantNote     : noteAssist_settingsJson.instantNote)     + ','+
          '"forceEnd":'        + (noteAssist_settingsJson.forceEnd        == null ? noteAssist_forceEnd        : noteAssist_settingsJson.forceEnd)        + ','+
          '"debug":'           + (noteAssist_settingsJson.debug           == null ? noteAssist_debug           : noteAssist_settingsJson.debug)           +
          '}';
        
        noteAssist_LS_setValue('settings', new_json);
        noteAssist_settingsJson = JSON.parse(new_json);
      }
    }
    catch (e) {
      if (noteAssist_debug) alert('warning, Note Assist settings are corrupt, deleting settings. \n details:\n<br>' +e+'\n\n<br><br>'+JSON.stringify(noteAssist_settingsJson)+'\n\n<br><br>'+noteAssist_settingsJson,true);
      noteAssist_LS_setValue('settings','');
    }
  }
  else { //no settings are saved, get defaults
    var temp_json_string =
      '{'+
      '"uiPositionLeft":'  + noteAssist_uiPositionLeft  + ','+
      '"resizeDefaultOn":' + noteAssist_resizeDefaultOn + ','+
      '"instantNote":'     + noteAssist_instantNote     + ','+
      '"forceEnd":'        + noteAssist_forceEnd        + ','+
      '"debug":'           + noteAssist_debug           +
      '}';
      
    noteAssist_settingsJson = JSON.parse(temp_json_string);
  }
}

function noteAssist_settingsMenuCreate() {
  var overlay = $c('div', {
    id:'noteAssist_settingMenuOverlay',
    style:'background-color:black; height:100%; width:100%; position:fixed; left:0px; top:0px; opacity:0.6; z-index: 9998;'
  });
  var settingMenu = $c('div', {
    id:'noteAssist_settingMenu'
  });
    
  settingMenu.innerHTML = 
    '<p style="text-align:center; font-weight:bold; font-size:130%;">Note Assist Settings</p>'+
    '<div class="section">'+
      '<strong><p>Basic Settings</p></strong>'+
      
      '<span title="If enabled => position left, over the tags list -- If disabled => position top-right. (default: enabled)">'+
      '<input type="checkbox" id="noteAssist_uiPositionLeft" '+(noteAssist_settingsJson.uiPositionLeft ? 'checked' : '')+' class="settingMenu_checkbox"/><label for="noteAssist_uiPositionLeft"> UI position: left*</label></span></br>'+
      
      '<span title="If enabled => Notes created with drag&drop will always resize, unless shift is held -- If disabled => only resize when shift is held. (default: enabled)">'+
      '<input type="checkbox" id="noteAssist_resizeDefaultOn" '+(noteAssist_settingsJson.resizeDefaultOn ? 'checked' : '')+' class="settingMenu_checkbox"/><label for="noteAssist_resizeDefaultOn"> Always resize new note</label></span></br>'+
      
      '<span title="If disabled => Pressing \'N\' to open the Note Assist window does not toggle translation mode. (default: enabled)">'+
      '<input type="checkbox" id="noteAssist_instantNote" '+(noteAssist_settingsJson.instantNote ? 'checked' : '')+' class="settingMenu_checkbox"/><label for="noteAssist_instantNote"> Always toggle translation mode</label></span></br>'+
    '</div>'+
    '<div class="section">'+
      '<strong><p>Advanced Settings</p></strong>'+
      
      '<span title="How long the code will run (freezing your browser) before giving up. (default: 15000)">'+
      '<input type="text" id="noteAssist_forceEnd" value="'+(typeof noteAssist_settingsJson.forceEnd === 'number' ? noteAssist_settingsJson.forceEnd : noteAssist_forceEnd)+'" class="settingMenu_checkbox"/><label for="noteAssist_forceEnd"> Force abort timer (ms)</label></span></br>'+
      
      '<span title="Displays additional text/images/messages about the script\'s inner workings (only for programmers). Note, debug is active if this OR the value in the script is true">'+
      '<input type="checkbox" id="noteAssist_debug" '+(noteAssist_settingsJson.debug ? 'checked' : '')+' class="settingMenu_checkbox"/><label for="noteAssist_debug"> Debug mode*</label></span></br>'+
    '</div>'+
    ''+
    ''+
    '<p style="position:absolute; bottom:0; font-size:70%;">*Requires F5</p>'+
    '<input type="button" id="settings_close" value="Done" title="Clicking outside this window also closes it"/>'+
    '';
  
  var style=
    '#noteAssist_settingMenu { background-color:#C6C6C6; height:350px; width:350px; position:absolute; left:70px; top:70px; z-index:9999; border:10px ridge #3B3EEE; padding:9px; }'+
    '#noteAssist_settingMenu p { margin-bottom:0.5em; }'+
    '#noteAssist_settingMenu div.section  { border:1px solid black; padding:4px; margin-bottom:1em; }'+
    '#noteAssist_settingMenu input[type="checkbox"] { width:16px; height:22px; }'+
    '#noteAssist_settingMenu input[type="text"]     { width:5em; margin-bottom:5px; }'+
    '#noteAssist_settingMenu #settings_close { position:absolute; bottom:5px; right:5px; }';
    
  addGlobalStyle(style);
  
  document.body.appendChild(overlay);
  document.body.appendChild(settingMenu);
  
  overlay.addEventListener('click', noteAssist_settingsMenuSave, false);
  document.getElementById('settings_close').addEventListener('click', noteAssist_settingsMenuSave, false);
  
}

function noteAssist_settingsMenuSave() {
  var new_json = [];
  
  var inputs = document.getElementById('noteAssist_settingMenu').getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++) {
    var key = inputs[i].id.replace(/^noteAssist_/, '');
    if(inputs[i].type === 'checkbox') {
      new_json.push('"'+key+'":'+inputs[i].checked);
    }
    else if(inputs[i].type === 'text') {
      var inputValue = inputs[i].value;
      if(inputValue.length > 0) {
        if (key === 'noteAssist_forceEnd') {
          inputValue = parseInt(inputValue, 10); //.value = string, convert to number
          if (isNaN(inputValue)) {
            alert('Error, "Force abort timer" must be a number');
          }
        }
        new_json.push('"'+key+'":'+inputValue);
      }
      else {
        alert('Error, input field(s) cannot be blank');
        return;
      }
    }
  }
  new_json = '{'+new_json.join(',')+'}';
  noteAssist_LS_setValue('settings', new_json);
  noteAssist_settingsJson = JSON.parse(new_json);
  
  //done saving, remove the setting menu & overlay now.
  var element = document.getElementById('noteAssist_settingMenu');
  element.parentNode.removeChild(element);
  
  element = document.getElementById('noteAssist_settingMenuOverlay');
  element.parentNode.removeChild(element);
}

//==========================================================
// UI
//==========================================================

function noteAssist_uiInit() {
  var container = $c('div', {
    id: 'noteAssist_ui'
  });
  
  container.innerHTML = 
    '<style type="text/css">'+
    '#noteAssist_ui { width:200px; position:fixed; z-index:2000; display:none; '+ //
    (noteAssist_settingsJson.uiPositionLeft ? 'top:'+(document.documentElement.clientHeight*0.32)+'px; left:5px; ' : 'top:5px; right:5px;')+                   // main container div
    'border: 6px ridge #3B3EEE; background-color:white; font-size:87.5%; padding:5px; }'+          //
    '.radiobutton { margin-left:10px; }'+
    '#noteAssist_ui p { margin-bottom:0px; }'+
    '#noteAssist_ui input { margin-bottom:7px; }'+
    '#noteAssist_ui input[type="button"] { font-size:90%; }'+
    '#noteAssist_singleNoteSection, #noteAssist_eyedropperSection { border-top: 2px solid black; position:relative; }'+
    '#noteAssist_eyedropperSection { min-height:90px; display:none; }'+
    ''+
    '</style>'+
    
    '<input type="button" id="noteAssist_generateAll" value="Generate all notes" title="Scans the image (takes 1 to 15+ seconds, based on width*height) and attempts to detect any text, automatically generating notes"/>'+
    '<p style="display:inline-block; float:right; font-weight:bold; padding-top:6px">Note Assist</p>'+
    '<p id="noteAssist_closeMain" title="Close this window" style="font-size:70%; font-weight:bold; line-height:1em; position:absolute; right:0px; top:0px; cursor:default">X</p>'+
    '<p title="To help prevent false positives, by default generate-all will ignore text shorter then 5 letters">Detection sensitivity:</p>'+
    '<span title="Generates notes for everything, no matter how small it is"><input type="radio" class="radiobutton group1" name="group1" value="1"/> Any</span>'+
    '<span title="Only allows detect texts of at least 5 letters">           <input type="radio" class="radiobutton group1" name="group1" value="2" checked/> Normal</span>'+
    '<p title="Automatic text color detected isn\'t perfect, for example, an image that is 70% dark and has black text will be detected wrongly">Text color (override):</p>'+
    '<span title="Image has black/dark text on white/light background"><input type="radio" class="radiobutton group2" name="group2" value="1"/> Black</span>'+
    '<span title="Image has white/light text on black/dark background"><input type="radio" class="radiobutton group2" name="group2" value="2"/> White</span>'+
    '<span title="Auto-detect (not always 100% accurate)">             <input type="radio" class="radiobutton group2" name="group2" value="3" checked/> Detect</span>'+
    ''+
    '<div id="noteAssist_singleNoteSection">'+
    ''+
    ''+
    '<p style="text-align:center; font-size:90%; margin-bottom: 7px;" title="A set of buttons to apply HTML/CSS styling to either the selected text (or all text, if nothing is selected)">Text decoration functions</p>'+
    '<input type="button" id="noteAssist_textBold" value="Bold"                title="Toggle boldness"/> '+
    '<input type="button" id="noteAssist_textItalic" value="Italic"            title="Toggle italics"/> '+
    '<input type="button" id="noteAssist_textColor" value="Color"              title="Activates the built-in eyedropper tool, click/drag the image to select a color - hint, you can also select a color from the zoomed preview"/> '+
    '<input type="button" id="noteAssist_textBackgroundColor" value="Bg-color" title="Activates the built-in eyedropper tool, click/drag the image to select a color - hint, you can also select a color from the zoomed preview"/>' +
    '<br/><input type="button" id="noteAssist_textSizePlus" value="size +"     title="Increase the font size"/> '+
    '<input type="button" id="noteAssist_textSizeMinus" value="size -"         title="Decrease the font size"/> '+
    '<input type="button" id="noteAssist_textTn" value="<tn>"                  title="Turns the selected text into a translation note, or adds the tags (empty) to the end of the text."/> '+
    ''+
    '<p id="noteAssist_eyedropperHint" style="text-align:center; display:none">Eyedropper tool active</p>'+
    ''+
    ''+
    '</div>'+ //end of single note section
    ''+
    '<div id="noteAssist_eyedropperSection"></div>'+
    ''+
    ''+
    //'<p style="text-align:center; color:#888888;" id="noteAssist_mouseoverInfo">more coming soon</p> '+
    '<a href="#" id="noteAssist_settings" style="font-size:80%; margin:-3px; display: block;">settings</a>'+
    '<a href="/forum_topics/9373">'+ //footer
    '<img width="15" height="15" title="Click for more info, function details or help (forum)" alt="info"  style="position:absolute; bottom:1px; right:1px;" '+
    'src="data:image/gif;base64,R0lGODlhDwAPAPMPAAAzmSpbqjF2yEZ5v0uK0Wqv6m/G/1aHw5TV/4rN+6ba/bPQ7bLg/vX4+tTp+JusxSH5BAAAAAAALAAAAAAPAA8AAASAsMm2iAiBLDclI8XmOAgxL'+
      'FOFMorCvMXwSATjsAQwKAhyDI5F4dbKERCJ3uFQc7QQvJ5BGRAQeUZDImEoYBoMKGIAECAMaEPZ2SuV091yIpwUAAhwQqBCT+QEaQ8BBw0DBQpbf2kYMwuGC1twFzMSggIgXReDHQ0OggCgAweUDREAOw" />'
    '</a>'+
    ''+
    ''+
    '';
  
  
  document.body.appendChild(container);
  
  document.getElementById('noteAssist_generateAll').addEventListener('click', function() { snap(null, true, true) }, false);
                                                                                      //mouseEvent, noExpand, fullImage
  
  document.getElementById('noteAssist_closeMain').addEventListener('click', function() { document.getElementById('noteAssist_ui').style.display = 'none'; }, false);
  
  document.getElementById('noteAssist_textBold').addEventListener('mousedown', noteAssist_addCss, false);
  document.getElementById('noteAssist_textItalic').addEventListener('mousedown', noteAssist_addCss, false);
  document.getElementById('noteAssist_textColor').addEventListener('mousedown', noteAssist_eyedropper, false);
  document.getElementById('noteAssist_textBackgroundColor').addEventListener('mousedown', noteAssist_eyedropper, false);
  document.getElementById('noteAssist_textSizePlus').addEventListener('mousedown', noteAssist_addCss, false);
  document.getElementById('noteAssist_textSizeMinus').addEventListener('mousedown', noteAssist_addCss, false);
  document.getElementById('noteAssist_textTn').addEventListener('mousedown', noteAssist_addCss, false);
  
  document.getElementById('noteAssist_settings').addEventListener('click', noteAssist_settingsMenuCreate, false);
  
}

//==========================================================
// Init script
//==========================================================

function noteAssist_initCore() {
  //===================================================
  // Load the settings from local storage (if any)
  //===================================================
  noteAssist_settingsInit();
  
  //===================================================
  // Adds buttons to resize already-existing notes, UI needs a major change.
  //===================================================
  if (noteAssist_noteButtons) {
    var noteBoxes=document.getElementsByClassName('note-box');
    var note_container=document.getElementById('note-container');
    
    var style=
      '.note-snap { background-color:red; position:absolute; right:-28px; top:1px; font-size:28px; font-weight:700; opacity:0.55; padding:4px 7px 7px; }'+
      '.note-expand { background-color:green; position:absolute; right:-28px; top:32px; font-size:22px; font-weight:700; opacity:0.6; padding:4px 4px 7px; }';
    
    addGlobalStyle(style);
    
    note_container.style.display='none';   //does not flicker as it's very fast
    for(var i=0;i<noteBoxes.length;i++) {
      var d=$c('div', { class:'note-snap' });
      d.innerHTML='-';
      d.addEventListener('click',snap,false);
      noteBoxes[i].appendChild(d);
      
      var d2=$c('div', { class:'note-expand' });
      d2.innerHTML='+';
      d2.addEventListener('click',expand,false);
      noteBoxes[i].appendChild(d2);
    }
    note_container.style.display='block';
  }
  //===================================================
  // Some global values
  //===================================================
  var img=document.getElementById('image');
  scaleModifier=parseInt(img.getAttribute('width'))/parseInt(img.getAttribute('data-large-width'));
  
  var style=
    'div#note-container .ghostNote .note-box-inner-border.unsaved { background-image:linear-gradient(-45deg, #FF0000 15%, transparent 15%, transparent 50%, rgba(255, 0, 0, 0.898) 50%, rgba(255, 0, 0, 0.898) 65%, transparent 65%, transparent); background-size:23px 23px;}'+
    'div#note-container .ghostNote.ui-state-disabled .note-box-inner-border.unsaved { background-image:none}'+
    ''+
    ''+
    ''+
    '';
  
  addGlobalStyle(style);
  
  //===================================================
  // Generate UI
  //===================================================
  noteAssist_uiInit();
  
  if (noteAssist_debug || noteAssist_settingsJson.debug) {
    document.getElementById('sidebar').appendChild($c('div',{id:'debug_log'}));
    addGlobalStyle('#content canvas { margin-right:0.5em; margin-bottom:0.5em; }');
  }
  
  
  if (getMetaContents('always-resize-images') === 'true') {
    var imgEl = document.getElementById('image');
    var t=imgEl.style.height;
    if(t) {
      fitToScreenRatio = (parseInt(imgEl.style.height)/imgEl.naturalHeight); //height used in the style (resized by JS) / real height
      
      to_debug('fitToScreenRatio: ' + fitToScreenRatio);
    }
  }
  
  
  //===================================================
  // Hook into danbooru code
  //===================================================
  noteAssist_danbooruHooks();
}


function noteAssist_injectJS() {
  if (typeof $ === 'function') {  //opera, everything is accessible, don't need to inject
    noteAssist_initCore();
  }
  else { //mirror all required functions so they are available in chrome/FF as well
    var script = document.createElement('script');
    //stuff all global vars into a string
    var noteAssist_globals=
      'var '+
      'noteAssist_uiPositionLeft='+noteAssist_uiPositionLeft    +','+
      'noteAssist_resizeDefaultOn='+noteAssist_resizeDefaultOn  +','+
      'noteAssist_instantNote='+noteAssist_instantNote          +','+
      'noteAssist_forceEnd='+noteAssist_forceEnd                +','+
      'noteAssist_debug='+noteAssist_debug                      +','+
      'noteAssist_noteButtons='+noteAssist_noteButtons          +','+
      
      'startTime, runTime, benchStart, benchStop, noteAssist_timer, noteAssist_eyedropperTarget, scaleModifier, fitToScreenRatio=1, noteAssist_settingsJson, noteAssist_LS_getValue, noteAssist_LS_setValue;';
    
    script.innerHTML += 
      noteAssist_globals + //global var's
      
      addGlobalStyle +     //helper functions
      $c +
      to_debug +
      cancelEvent +
      getMetaContents +
      
      convert_blackWhite +  //text detection functions
      whiteTextOnBlack +
      optimizeImage1 +
      optimizeImage2 +
      killMain +
      findLines +
      blobsToSquares +
      calculateConnect +
      connectBlobs +
      ghostRightclick +
      ghostNote +
      expand +
      noteAssist_filterOverlappingNotes+
      noteAssist_fixOutOfBounds+
      snap + 
      
      noteAssist_danbooruHooks + //patch
      
      noteAssist_getActiveTextarea +    //single note functions
      noteAssist_addCss +
      noteAssist_eyedropper +
      noteAssist_eyedropperDragStart +
      noteAssist_eyedropperDrag +
      noteAssist_eyedropperDragStop +
      noteAssist_eyedropperHide +
      noteAssist_eyedropperPickDetail +
      
      noteAssist_settingsInit +
      noteAssist_settingsMenuCreate +
      noteAssist_settingsMenuSave +
      
      noteAssist_uiInit +        //ui
      noteAssist_initCore;
      
    script.innerHTML +=
      'noteAssist_initCore();';
      
    document.body.appendChild(script);
  }
}

(function noteAssist_loader() {
  if (document) {
    var i=document.getElementById('image');
    if (i && i.complete) { 
      noteAssist_injectJS();
    }
    else if (i) {
      i.addEventListener('load', noteAssist_injectJS);
    }
  }
  else alert('NoteAssist - error, "document" was undefined at runtime');
})();



//=======================
// Misc info
//=======================
//red channel  : stores the image shape itself (black=0 & white=255, which was split at luma:188)
//             : killMain sets temporary to 10, then 100 - findLines sets temporary to 10, then 20
//green channel: stores data about image optimization (values 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169)
//             : which represent black squares of 4x4 to 15x15, hollowed out - or if not optimized, just 0
//blue channel : currently free, always 0 (used for debug if turned on)

//=======================
// known issues:
//=======================
//text on transparent background usually doesn't work out well. Fixing this would slow down the script too much.
//words that are too far apart are not always correctly detected - example: http://danbooru.donmai.us/posts/794002 middle-left

//=======================
//Things the script can't handle well:
//=======================
//* Words that have 0 space between them, flow into eachother, or are connected by a line. -cannot fix-
//* Text on a transparent background -won't fix-
//* Light colored text on a light background / same for dark -trying to fix- - Example: post #333297
//* Shading by dot pattern instead of gradient messes up detection and slows the script -trying to fix-  http://danbooru.donmai.us/posts/794002 (use sample)



//====================================
//TODO / bugfix / improvements:
//====================================
//improve: 2nd check for white text on light backgrounds? http://danbooru.donmai.us/posts/1374436  - don't trigger on http://danbooru.donmai.us/posts/1142744
//use dimensions of note to guess amount of text inside note boundary
//increase darkness if nothing is found (small/colored fonts)
//
// ! attempt to skip long lines of white/black.
//
//improve: find replacement for 'noteAssist_noiseFilter' //tries to remove noise such as graphics & text bubble borders by ignoring anything larger then 11x the average size of a letter.
//
//minor: browser difference - eyedropper cursor doesn't show up on chrome/firefox
//minor: browser difference - inactive selected text isn't highlighted on chrome/firefox.
//
// ! try to implement better anti background-pattern system - related, max 3 jumps from smallLines.

//====================================
//will take a while / complicated:
//====================================
//tweak the formula to be more lenient with large fonts
//TODO: improve connectVertical / connectHorizontal for <10 blobs?
//bugfix: http://danbooru.donmai.us/posts/1145745 - don't merge barcode+text, do merge other 2 small texts
//bugfix: find out why only the top of http://danbooru.donmai.us/posts/144920 gets detected
//
//perf: dot patterns like http://danbooru.donmai.us/posts/794002 take 25+ sec ~ 20x as long as normal image


//====================================
//CRITICAL (must be fixed asap):
//====================================
//
//

//====================================
//non-critical:
//====================================
//improve: add detection & cleanup of shading/backgrounds noise
//idea: try out image sharpening code
//


//====================================
//DONE:
//====================================
//random (short) text with high spacing between letters (top of image) - http://danbooru.donmai.us/posts/1357951
//improve: allow small noise to only start closeby letters instead of anywhere around the text border
//TODO: fix connectVertical / connectHorizontal
//idea:button selector for 'noteboxes on everything' - 'filter out small noise (<4)' - 'large texts only (<10)'
//improve: use average distances for connectDistances instead of based on size. (only if > 5 or > 8 letters?)
//improve: switch size detection to surface instead of px
//TODO: make sure snap doesn't go outside image borders
//words split by longer spaces, "..." or similar non-detected noise - http://danbooru.donmai.us/posts/824378
//multiple lines in a single textbubble, seperated by a large space - http://danbooru.donmai.us/posts/824378 (grant 1 jump?) (check if fully above/beside +/- few px?)
//implement ghost notes //idea: 'generate all notes' -> ghost notes, click to make semi-permanent, ghost notes not affected by save-all.
//'generate all' breaks on http://danbooru.donmai.us/posts/1145745
//perf: replace data.data with temp var
//fix: set ui top offset to fixed #px (jumps on http://danbooru.donmai.us/posts/1362314)
//write good warning/info about memory usage
//make debug fully disable-able
//remove textblobs that are 100% covered (as well as ones smaller then 10x10?)
//^^fix textblob jumping
//TODO: decide spaceing between text & note border on notes with samples
//    : (currently, spaced 5px on sample -> 5px*ratio on original -- spacing it 5px on original -> sticks very close to text on sample).
//pref: improve 'findLines' speed with concept of 'killmain'
// ! tweak canvases to reduce memory usage
// setting to change togrey on the fly?
// don't create ghost notes on top of already-saved notes
//
//