// ==UserScript==
// @name       Drawception Brush Cursor
// @author     Talon
// @namespace  
// @version    0.3
// @description  Makes your cursor go a round!
// @include      http://drawception.com/play/*
// @include      http://drawception.com/sandbox/
// @include      http://drawception.com/contests/play
// @exclude    http://drawception.com/play/panel/*
// @include      https://drawception.com/play/*
// @include      https://drawception.com/sandbox/
// @include      https://drawception.com/contests/play
// @exclude    https://drawception.com/play/panel/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
(function () {

    if (typeof unsafeWindow == 'undefined') {
        unsafeWindow = window;
    }
    // Since jQuery is already loaded, lets use it
    $ = unsafeWindow.jQuery;
    var drawApp = unsafeWindow.drawApp;

    // basic variables on startup
    var pointerSize = 12;
    var brushColor = 1;
    var cursorStr = 'url(http://www.thekohrs.net/dc/cursor/12.png) 5 5';
    var selectedColor = "#000000";
    var showLense = false;
    var mouseX = 0;
    var mouseY = 0;
    
    // lets add a button to turn this on and off at will
    $('<canvas id="brushCanvas" width="50" height="50" style="display:none; position:absolute; width:100px; height:100px; border: 3px solid #646464; border-top-left-radius: 13px; border-top-right-radius: 13px; border-bottom-right-radius: 13px; border-bottom-left-radius: 0px;"></canvas>')
        .appendTo(".drawingForm");
    var dcs = document.getElementById('drawingCanvas');
    var bcs = document.getElementById('brushCanvas');
    var bc = bcs.getContext("2d");
    
    // listeners on the brush sizes
    $('#brush-2').click(function () {
        pointerSize = 2;
        drawBrush(1, pointerSize);
    });
    $('#brush-5').click(function () {
        pointerSize = 5;
        drawBrush(1, pointerSize);
    });
    $('#brush-12').click(function () {
        pointerSize = 12;
        drawBrush(1, pointerSize);
    });
    $('#brush-35').click(function () {
        pointerSize = 35;
        drawBrush(1, pointerSize);
    });
    $('#drawingCanvas').bind("mousedown", handleMouseDown, !1);
    $('#drawingCanvas').css('cursor', cursorStr);

    function handleMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        e.target.style.cursor = cursorStr;
    }

    $('.colorPicker').click(function () {
        selectedColor = $(this).attr('data-color');
    });
    $(dcs).on('mousemove', moveTheMouse);


    function moveTheMouse(e) {
        mouseX = e.pageX - $(dcs).offset().left;
        mouseY = e.pageY - $(dcs).offset().top;
        drawBrush(1, pointerSize);
    }

    $(document).keypress(function (e) {

        switch (e.which) {
            case 49:
                pointerSize = 2;
                break; // 1
            case 50:
                pointerSize = 5;
                break; // 2
            case 51:
                pointerSize = 12;
                break; // 3
            case 52:
                pointerSize = 35;
                break; // 4
            case 113:
                toggleLense();
                break; // q
            case 91:
                pointerSize--;
                break; // [
            case 93:
                pointerSize++;
                break; // ]
            default:
                console.log(e.keyCode);
        }
        if (pointerSize <= 0) pointerSize = 1;

        unsafeWindow.drawApp.setSize(pointerSize);

        drawBrush(1, pointerSize);
    });

    function toggleLense() {
        showLense = !showLense;

        if (showLense) {
            $(dcs).on('mousemove', moveTheMouse);
        } else {
            $(dcs).off('mousemove', moveTheMouse);
        }
    }


    // draw the brush on the canvas element and copy it to the cursor style
    function drawBrush(size, maxsize) {

        var loops = 1;
        if (showLense) {
            loops = 2;
            bcs.style.display = 'block';
        } else {
            bcs.style.display = 'none';
        }
        for (var i = 0; i < loops; i++) {
            bc.clearRect(0, 0, 50, 50);

            if (i == 1) {
                bc.drawImage(dcs, -mouseX + 25, -mouseY + 25);
            }
            if (size != maxsize) {
                bc.fillStyle = selectedColor;
                bc.strokeStyle = (selectedColor == "#FFF" ? '#000000' : '#FFF');
                bc.beginPath();

                bc.arc(25, 25, size / 2, 0, Math.PI * 2, true);
                bc.closePath();
                if (size < 2) bc.fill();
                bc.stroke();
            }

            bc.strokeStyle = '#FFF';
            bc.beginPath();
            bc.arc(25, 25, (maxsize + 2) / 2, 0, Math.PI * 2, true);
            bc.closePath();
            bc.stroke();

            bc.strokeStyle = (size == maxsize ? '#ff0000' : '#000000');
            bc.beginPath();
            bc.arc(25, 25, maxsize / 2, 0, Math.PI * 2, true);
            bc.closePath();
            bc.stroke();

            if (i == 0) {
                cursorStr = 'url(' + bcs.toDataURL('image/png') + ') 24 24,none';
                dcs.style.cursor = cursorStr;
            } else {
                $(bcs).css({
                    'top': (mouseY - 100) + 'px',
                    'left': (mouseX + 100) + 'px'
                });
            }
        }
    }

    drawBrush(1, pointerSize);
})();