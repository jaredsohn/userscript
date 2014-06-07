// ==UserScript==
// @name      simple_guestures 
// @namespace http://looxu.blogspot.com/
// @description opera like mouse guesture for google chrome
// @author    Gomita / Arc Cosine 
// @version   1.2
// ==/UserScript==
// This code is inspired by Gomita's Code
// Look => http://www.xuldev.org/misc/script/MouseGestures.uc.js 
// license      http://0-oo.net/pryn/MIT_license.txt (The MIT license)
(function(){
    var simpleMouseGuesture = {
        _lastX: 0,
        _lastY: 0,
        _directionChain : "",
        _isMousedown : false,
        _suppressContext : false,
        init : function(){
            window.addEventListener("mousedown", this, false);
            window.addEventListener("mousemove", this, false);
            window.addEventListener("mouseup", this, false);
            window.addEventListener("contextmenu", this, false);
        },
        handleEvent : function(e){
            switch(e.type){
                case "mousedown":
                    if( e.button == 2){
                        this._isMousedown = true;
                        this._startGuesture(e);
                    }else{
                        this._isMousedown = false;
                        this._stopGuesture(e);
                    }
                    break;
                case "mousemove":
                    if( this._isMousedown ){
                        this._progressGesture(e);
                    }
                    break;
                case "mouseup":
                    if( this._isMousedown ){
                        this._isMousedown = false;
                        this._suppressContext = !this._directionChain;
                    }
                    break;
                case "contextmenu":
                    if( this._directionChain.length > 0 ){  //if not mouse guesture
                        e.preventDefault();
                        e.stopPropagation();
                        this._stopGuesture(e);
                    }
                    break;
            }
        },
        _startGuesture : function(e){
            this._lastX = e.screenX;
            this._lastY = e.screenY;
            this._directionChain = "";

            //add canvas
            this.canvas = document.createElement("canvas");
            this.canvas.style.position = "absolute";
            this.ctx = this.canvas.getContext("2d");
            document.documentElement.appendChild(this.canvas);

            this.canvas.style.left = 0 + "px";
            this.canvas.style.top =  0 + "px";
            this.canvas.width = Math.max(document.documentElement.scrollWidth, window.innerWidth);
            this.canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
            this.ctx.strokeStyle = "rgba(18,89,199,1)";     //like delicious link color
            this.startX = e.pageX;
            this.startY = e.pageY;
        },
        _progressGesture : function(e){
            var x = e.screenX;
            var y = e.screenY;
            var dx = Math.abs(x-this._lastX);
            var dy = Math.abs(y-this._lastY);
            const tolerance = 10;
            if( dx < tolerance && dy <tolerance ) return;
            var direction;
            if( dx > dy ){
                direction = x < this._lastX ? "L" : "R";
            }else{
                direction = y < this._lastY ? "U" : "D";
            }
            var lastDirection = this._directionChain.charAt(this._directionChain.length - 1);
            if( direction != lastDirection ){
                this._directionChain += direction;
            }
            this._lastX = x;
            this._lastY = y;

            this.ctx.moveTo(this.startX, this.startY);
            this.startX = e.pageX;
            this.startY = e.pageY;
            this.ctx.lineTo(this.startX, this.startY);
            this.ctx.stroke();
        },
        _stopGuesture : function(e){
            try{
                if( this._directionChain ){
                    this._performAction(e);
                }
            }catch(ex){
            }
            this._directionChain = "";
            document.documentElement.removeChild(this.canvas);
        },
        _performAction : function(e){
            switch(this._directionChain){
                case "L" : history.back(); break;
                case "R" : history.forward(); break;
                case "D" : this._newTab(); break;
                case "DR" : this._delTab(); break;
                case "UD" : location.reload(); break;
            }
        },
        _delTab : function(){
            window.opener = window;
            var win = window.open(location.href, "_self");
            win.close();
        },
        _newTab : function() {
            var w = window.open("chrome-ui://newtab","_blank");
        }
    };
    simpleMouseGuesture.init();
 })();
