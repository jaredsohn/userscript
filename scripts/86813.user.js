// ==UserScript==
// @name           Scopophobia
// @namespace      https://id.mixi.jp/asannou
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://ido.nu/ayaya/miseatter/statuses/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var script = document.createElement("script");
script.src = "http://ido.nu/ayaya/scopophobia_a.js";
document.body.appendChild(script);

var img = document.createElement("img");
img.src = "http://ido.nu/ayaya/warai.png";
img.style.display = "none";
document.body.appendChild(img);

var draw;
if (GM_getValue("laughing_man")) {
    draw = function(canvas, tag) {
        var ctx = canvas.getContext("2d");
        var cx = canvas.width * tag.center.x / 100;
        var cy = canvas.height * tag.center.y / 100;
        var size = canvas.width * tag.width / 100;
        ctx.drawImage(img, 0, 0, 52, 48, cx - size / 2, cy - size / 2, size * 52 / 48, size);
    };
    GM_registerMenuCommand("Scopophobia - big eyes", function() {
        setTimeout(function() {
            GM_setValue("laughing_man", false);
            location.reload();
        }, 0);
    });
} else {
    var drawEye = function(x, y) {
        this.beginPath();
        this.arc(x, y, 4, 0, Math.PI * 2, true);
        this.fillStyle = "rgb(255, 255, 255)";
        this.fill();
        this.stroke();
        var dx = Math.round(Math.random()) ? -1 : 1;
        var dy = Math.round(Math.random()) ? -1 : 1;
        this.beginPath();
        this.arc(x + dx, y + dy, 1, 0, Math.PI * 2, true);
        this.fillStyle = "rgb(0, 0, 0)";
        this.fill();
    };
    draw = function(canvas, tag) {
        var ctx = canvas.getContext("2d");
        ctx.drawEye = drawEye;
        if (tag.eye_left) {
            ctx.drawEye(canvas.width * tag.eye_left.x / 100,
                        canvas.height * tag.eye_left.y / 100);
        }
        if (tag.eye_right) {
            ctx.drawEye(canvas.width * tag.eye_right.x / 100,
                        canvas.height * tag.eye_right.y / 100);
        }
    };
    GM_registerMenuCommand("Scopophobia - laughing man", function() {
        setTimeout(function() {
            GM_setValue("laughing_man", true);
            location.reload();
        }, 0);
    });
}

var receiveMessage = function (e) {
    var data = JSON.parse(e.data);
    var createCanvas = function(width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = "relative";
        canvas.style.top = "-51px";
        return canvas;
    };
    for (var i = 0; i < data.photos.length; i++) {
        var photo = data.photos[i];
        if (photo.tags.length) {
            var url = location.protocol == "https:" ? photo.url.replace(/^http:/, "https:") : photo.url;
            $("img.photo[src='" + url + "']").each(function() {
                var canvas = createCanvas($(this).attr("width"), $(this).attr("height"));
                for (var j = 0; j < photo.tags.length; j++) {
                    draw(canvas, photo.tags[j]);
                }
                $(this).after(canvas);
            });
        }
    }
};

window.addEventListener("message", receiveMessage, false);

var iframe = unsafeWindow.document.createElement("iframe");
iframe.id = "_scopophobia";
iframe.src = "http://ido.nu/ayaya/scopophobia.html";
iframe.style.display = "none";

iframe.onload = function() {
    var urls = [];
    var _urls = {};
    $("#timeline img.photo").each(function() {
        if (urls.length < 30) {
            var src = $(this).attr("src");
            if (!_urls[src]) {
                src = src.replace(/^https:/, "http:");
                urls.push(src);
                _urls[src] = true;
            }
        }
    });
    if (urls.length) {
        window.wrappedJSObject._scopophobiaPostMessage(urls);
    }
};

document.body.appendChild(iframe);

