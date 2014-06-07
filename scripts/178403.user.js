// ==UserScript==
// @name           amazon zoom image patcher
// @version 0.1.1
// @uso:version  0.1.1
// @namespace      com.ruocaled.amazon
// @description    auto enlarge amazon japan product picture to max size
// @include        http://www.amazon.co.jp/gp/product/images/*


// ==/UserScript==


var drawCanvasImage = function (ctx, grid, row, col, x, y) {
    return function () {
        //console.log('row:' + row + ' col:' + col);
        ctx.drawImage(grid[row][col], x, y);
    }
}


function init() {
    var e = 400;
    var markup = document.documentElement.innerHTML;
    var re = /DynAPI.addZoomViewer.*",.*,.*,(.*),(.*),.*,.*,.*/gm
    re.exec(markup);
    var w = RegExp.$1;
    var h = RegExp.$2;

    if (isNaN(w) || isNaN(h)){
        return;
    }

   // console.log('w: '+w+', h: '+h);


    //http://www.amazon.co.jp/gp/product/images/B00D3DKMCW/ref=dp_image_z_0?ie=UTF8&n=2250738051&s=digital-text
    var src = window.location.href;
    var re = /images\/(B00.*)\//g
    re.exec(src);
    var id = RegExp.$1;
   // console.log(id);


    var grid = new Array();
    var totalRows = Math.ceil(h/e);
    var totalCols = Math.ceil(w/e);
    for (var i = 0; i < totalRows; i++) {
        grid[i] = new Array();
    }
    var pieceWidth = e;
    var pieceHeight = e;
    var canvas = document.createElement('canvas');
    canvas.height = h;
    canvas.width = w;

    var holder = document.getElementById('imagePlaceHolder');
    holder.innerHTML = "";
    holder.appendChild(canvas);
    //document.body.appendChild(canvas);


    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        for (var row = 0; row < totalRows; row++) {
            for (var col = 0; col < totalCols; col++) {
                console.log('(' + row + ',' + col + ')');
                grid[row][col] = new Image();
                var x = col * pieceWidth;
                var y = row * pieceHeight;
                grid[row][col].onload = drawCanvasImage(ctx, grid, row, col, x, y);
                grid[row][col].src = "http://z2-ec2.images-amazon.com/R/1/a=" + id + "+d=_SCR(3," + col + "," + row + ")_+o=01+s=RMTILE+va=MAIN+ve=383077132+e=.jpg";


            }
        }
    }
}

init();


