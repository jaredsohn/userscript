// ==UserScript==
// @namespace     http://sanjayprabhu.blogspot.com
// @name          Reddit comment colorizer
// @description   Colors reddit comments based on score
// @include       http://*.reddit.com/*comments/*
// @version       0.1
// ==/UserScript==

(function() {
    //from http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
    function getElementsByClassName(oElm, strTagName, strClassName){
        /*
            Written by Jonathan Snook, http://www.snook.ca/jonathan
            Add-ons by Robert Nyman, http://www.robertnyman.com
        */
        var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
        var arrReturnElements = new Array();
        strClassName = strClassName.replace(/\-/g, "\\-");
        var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
        var oElement;
        for(var i=0; i<arrElements.length; i++){
            oElement = arrElements[i];
            if(oRegExp.test(oElement.className)){
                arrReturnElements.push(oElement);
            }
        }
        return (arrReturnElements)
    }

    //from http://jsres.blogspot.com/2008/01/convert-hsv-to-rgb-equivalent.html
    function hsv2rgb(h,s,v) {
        // Adapted from http://www.easyrgb.com/math.html
        // hsv values = 0 - 1, rgb values = 0 - 255
        var r, g, b;
        var RGB = new Array();
        if(s==0){
          RGB['red']=RGB['green']=RGB['blue']=Math.round(v*255);
        }else{
          // h must be < 1
          var var_h = h * 6;
          if (var_h==6) var_h = 0;
          //Or ... var_i = floor( var_h )
          var var_i = Math.floor( var_h );
          var var_1 = v*(1-s);
          var var_2 = v*(1-s*(var_h-var_i));
          var var_3 = v*(1-s*(1-(var_h-var_i)));
          if(var_i==0){
            var_r = v;
            var_g = var_3;
            var_b = var_1;
          }else if(var_i==1){
            var_r = var_2;
            var_g = v;
            var_b = var_1;
          }else if(var_i==2){
            var_r = var_1;
            var_g = v;
            var_b = var_3
          }else if(var_i==3){
            var_r = var_1;
            var_g = var_2;
            var_b = v;
          }else if (var_i==4){
            var_r = var_3;
            var_g = var_1;
            var_b = v;
          }else{
            var_r = v;
            var_g = var_1;
            var_b = var_2
          }
          //rgb results = 0 � 255
          RGB['red']=Math.round(var_r * 255);
          RGB['green']=Math.round(var_g * 255);
          RGB['blue']=Math.round(var_b * 255);
          }
        return RGB;
    };

    //from http://www.csgnetwork.com/csgcolorsel4.html
    function hexify(number) {
        var digits = '0123456789ABCDEF';
        var lsd = number % 16;
        var msd = (number - lsd) / 16;
        var hexified = digits.charAt(msd) + digits.charAt(lsd);
        return hexified;
    }



    function hsv2rgbString(h,s,v) {
        rgb = hsv2rgb(h,s,v);
        return "#"+hexify(rgb['red'])+"" +hexify(rgb['green'])+"" +hexify(rgb['blue']);
    }

    function isValidScore(scoreSpan) {
        return scoreSpan.innerHTML.split(" ")[1] == "points";

    }

    function score(scoreSpan)  {
        function getScore() {
            if(isValidScore(scoreSpan)) {
                var score = parseInt(scoreSpan.innerHTML.split(" ")[0]);
                return score > 0 ? score : 0;
            }
            return -1;
        }

        this.span = scoreSpan;
        this.scoreBackground
        this.points = getScore();

        this.setBackgroundColor = function(color) {
            this.span.style.backgroundColor = color;
        }
    }

    function scores() {
        this.allScoreSpans = getElementsByClassName(document, "span", "score");

        this.allScores = new Array();
        for(var i=0; i<this.allScoreSpans.length; i++) {
            if(isValidScore(this.allScoreSpans[i])) {
                this.allScores.push(new score(this.allScoreSpans[i]))
            }
        }


        this.getMaximumScore = function() {
            var max = -1;
            for(var i = 0; i<this.allScores.length; i++) {
                c = this.allScores[i];
                if(c.points > max) {
                    max = c.points;
                }
            }
            return max;
        };
    }

    commentScores = new scores();

    maxScore = commentScores.getMaximumScore();

    for(var i = 0; i< commentScores.allScores.length;i++) {
        s = commentScores.allScores[i];
        s.setBackgroundColor(hsv2rgbString(0,s.points/maxScore,1));

    }

})();