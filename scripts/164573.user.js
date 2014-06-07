// ==UserScript==
// @name           Youtube Storyboard
// @namespace      hbb_works
// @description    mouse-over video thumbnail to preview video by cycling through the storyboard
// @version        1.1
// @include        http://*youtube.com*
// @include        https://*youtube.com*
// @grant          none
// ==/UserScript==

const INTERVAL = 450; // default interval in milliseconds
const OFFSET_X = 100; // offset of wrapping html element
const OFFSET_Y = 100;

document.addEventListener('mouseover', onMouseOver, false);

function onMouseOver (event) {
    var target = event.target;
    var src = target.src;
    if (target.nodeName == 'IMG' && 
        src && (/default\.jpg$/.exec(src) || /0\.jpg$/.exec(src)))
    {            
        var a = new Animator(target);
        
        var onMouseOut = function () {
            a.stop();
            target.removeEventListener('mouseout', onMouseOut);
        };        
        target.addEventListener('mouseout', onMouseOut);
        
        a.getStoryboardSpecs(function () {
            a.start();
        });
    }
}

var Animator = function (target) {
    this.target = target;
    this.frame = 0;
    this.sheet = 0;
    this.interval = INTERVAL;
    this.src = target.src
    this.isMouseOver = true;
    // get video id
    this.v = (/vi\/(.*?)\//.exec(this.src) || [])[1];
    if (this.v) {
        this.width  = target.width;
        this.height = target.height;
    }
};
Animator.prototype.parseSpec = function (storyboard_spec) {
    var lines = storyboard_spec.split('|');
    var q;
    //this.quality = this.quality || lines.length - 2; // default to best quality
    if (!this.quality) {
        this.quality = -1;
        do {
            this.quality++;
            q = lines[this.quality + 1].split('#');
        } while(parseInt(q[0], 10) < this.width && this.quality + 2 < lines.length);
    }
    var q = lines[this.quality + 1].split('#');
    var s = {
        url: lines[0].replace('$L', this.quality).replace('$N', q[6]),
        width: parseInt(q[0], 10),
        height: parseInt(q[1], 10),
        count: parseInt(q[2], 10),
        cols: parseInt(q[3], 10),
        rows: parseInt(q[4], 10),
        sigh: q[7]
    };
    s.sheetSize = s.cols * s.rows;
    s.sheetCount = ((s.count / s.sheetSize) | 0) + 1; // bitwise OR to loose decimals
    s.countOnLastSheet = ((s.count - 1) % s.sheetSize) + 1;
    return this.spec = s;    
};
Animator.prototype.loadImage = function (callback) {
    clearInterval(this.token);
    var onLoad = (function () {     
        this.target.removeEventListener('load', onLoad);             
        callback.apply(this);            
    }).bind(this);            
    this.target.addEventListener('load', onLoad);
    this.target.src = this.spec.url.replace('$M', this.sheet) + "?sigh=" + this.spec.sigh;
};
Animator.prototype.getStoryboardSpecs = function (callback) {        
    this.xhr = new XMLHttpRequest();
    this.xhr.onreadystatechange = (function () {
        if (this.isMouseOver && this.xhr.readyState == 4 && this.xhr.status == 200) {
            var spec = (/&storyboard_spec=(.*?)&/.exec(this.xhr.responseText) || [])[1];
            if (spec) {
                this.parseSpec(decodeURIComponent(spec));         
                callback.apply(this);
            }
        }
    }).bind(this);
    this.xhr.open('GET', '/get_video_info?video_id=' + this.v, true);
    this.xhr.send();
};
Animator.prototype.start = function () {
    this.frame = 0;
    this.sheet = 0;
    
    var lastTick;
    var next = function () {
        if (this.isMouseOver) {
            // TODO properly center image if aspect ratio is off
            this.target.style.left = (OFFSET_X - (this.frame % this.spec.cols) * this.width) + 'px';
            this.target.style.top = (OFFSET_Y - ((this.frame / this.spec.cols) | 0) * this.spec.height * this.width / this.spec.width) + 'px'; // bitwise OR with 0 to loose decimals
            this.frame++;
            if ((this.frame == this.spec.sheetSize) ||
                (this.sheet == this.spec.sheetCount - 1 && this.frame == this.spec.countOnLastSheet)) 
            {
                this.frame = 0;
                this.sheet = (this.sheet + 1) % this.spec.sheetCount;                
                this.loadImage(function () {
                    this.token = setInterval(next, this.interval);  
                });
            }
        }
        else {
            this.stop();
        }
    }.bind(this);    
    
    this.target.style.opacity = '0';
    this.loadImage(function () {
        this.target.style.opacity = '1';
        this.target.width = this.width * this.spec.cols;
        this.target.style.position = 'absolute'; 
        next(); 
        this.token = setInterval(next, this.interval);  
    });
};
Animator.prototype.stop = function () {
    this.isMouseOver = false;
    clearInterval(this.token);
    this.target.src = this.src;
    this.target.style.position = null;
    this.target.style.left = null;
    this.target.style.top = null;
    this.target.width = this.width;
}