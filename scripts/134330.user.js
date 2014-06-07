// ==UserScript==
// @name          FG
// @namespace     http://fg.com
// @description	  FG
// @include     http://boards.4chan.org/*/res/*
// @match       http://boards.4chan.org/*/res/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
//
// ==/UserScript==
//
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

// a function that loads jQuery and calls a callback function when jQuery has finished loading

var Intensities = [
    'extremely light',
    'very light',
    'light',
    'loose',
    'medium',
    'tight',
    'hard',
    'very hard',
    'extremely hard'
];

var SpeedMap = {
    'extremely slow': 0.25,
    'very slow': 0.333,
    'slow': 0.5,
    'medium': 1.0,
    'normal': 1.0,
    'fast': 2.0,
    'very fast': 3.0,
    'extremely fast': 4.0
};

var SameAsPicTexts = [ 'speed', 'pace', 'same as' ];

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isAnyItemIn(arr, s){
    for (var i = 0; i < arr.length; i++){
        if (s.indexOf(arr[i]) != -1){
            return true;
        }
    }

    return false;
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        (new Image()).src = this;
    });
}


function translateSpeedText(t){
    if (SpeedMap.hasOwnProperty(t)){
        return SpeedMap[t];
    }
    else if (isAnyItemIn(SameAsPicTexts, t)){
        //TODO speed of gif - is that even possible in JS?
        return 1.0;
    }

    return 1.0;
}

function Random(){
    var self = this;
    self.next = function(max, min){
        var minTmp = !min ? 0 : min;
        return Math.floor(Math.random() * (max - minTmp + 1)) + minTmp;
    }
    
    self.choice = function(list){
        return list[self.next(list.length - 1)];
    }
}


RandomGen = new Random();

function FgView(){

    function FgPost(postData){
        var self = this;
        self.imageSrc = postData.imageSrc;
        self.message = jQuery.trim(postData.message);

        self.getRandomSpeed = function(){
            var speedKeys = Object.keys(SpeedMap);
            var speedKey = RandomGen.choice(speedKeys);
            return SpeedMap[speedKey];
        }

        self.getRandomCount = function(){
            var speed = self.speed;
            if (speed < 1){
                return RandomGen.next(20, 50);
            }
            else if (speed < 2){
                return RandomGen.next(10, 30);
            }
            else if (speed < 3){ 
                return RandomGen.next(5, 20);
            }
            else{ 
                return RandomGen.next(25, 15);
            }
        }

        var fgData = postData.message.split(",");
        if (fgData.length == 3){

            self.count = parseInt(jQuery.trim(fgData[0]), 10);

            var speedTrim = jQuery.trim(fgData[1]);
            self.speed = isNumber(speedTrim) ? parseFloat(speedTrim) : translateSpeedText(speedTrim);

            self.intensity = fgData[2];
        }
        else{
            self.speed = self.getRandomSpeed();
            self.count = self.getRandomCount();
            self.intensity = RandomGen.choice(Intensities);
        }

        self.isValid = function(){
            return !isNaN(self.speed) && self.speed > 0 && self.count && self.count > 0 && self.intensity;
        }

        self.hasImage = function(){ return self.imageSrc; }
        self.isSpam = function(){ return !self.imageSrc || !self.isValid(); }
        self.views = 0;
    }

    function FgPostHistory(availablePosts, onGetNext){
        var self = this;
        self.availablePosts = availablePosts;
        self.currentIdx = -1; 
        self.onGetNext = onGetNext;
        self.history = [ ];

        self.loadNext = function(){
            var nextPost = RandomGen.choice(self.availablePosts);
            var current = self.current();
            while (nextPost == current){
                nextPost = RandomGen.choice(self.availablePosts);
            }
            
            self.history.push(nextPost);

            if (self.onGetNext){
                self.onGetNext(nextPost);
            }
        }

        self.current = function(){
            return self.history[self.currentIdx];
        }

        self.goBack = function(){
            if (self.currentIdx == 0){
                return;
            }

            self.currentIdx--;
            return self.current();
        }

        self.goForward = function(){
            if (self.currentIdx == self.history.length - 2){ //load one in advance
                self.loadNext();
            }

            self.currentIdx++;
            return self.current();
        }
    }

    var self = this;

    self.posts = [];
    
    self.isRunning = false;

    self.imageContainer = null;

    self.history = null;

    self.counter = 0;

    self.initHistory = function(){
        self.history = new FgPostHistory(self.posts, function(post){
            (new Image()).src = post.imageSrc;
        });
    } 

    self.loadPosts = function(){
        var postElements = jQuery("div.postContainer");
        var allPosts = jQuery.map(postElements, function(e, i){
           var postData = {
                imageSrc: jQuery(e).find("a.fileThumb").attr('href'),
                message: jQuery.trim(jQuery(e).find(".postMessage").text()),
            }; 

            return new FgPost(postData);
        });

        self.posts.length = 0;
        for (var j = 0; j < allPosts.length; j++){
            var singlePost = allPosts[j];
            if (!singlePost.isSpam()){
                self.posts.push(singlePost);
            }
        }
    };

    self.run = function(){
        if (self.posts.length > 1){
            self.isRunning = true;
            var b = jQuery('body');
            var centeredContainer = jQuery("<div style='display: table-cell; vertical-align: middle; text-align: center;' />")
                                .css({ height: jQuery(window).height(), width: jQuery(window).width() });
            var imgContainer = jQuery("<div style='position: relative; top: 0; left: 0; display: inline-block; margin: auto; padding: 0;' />")
                                .click(function(){ self.changePost(); return false; });
            var imgElement = jQuery("<img id='fgImage' style='margin: auto; text-align: center;' />")
                                .attr('height', jQuery(window).height());

            var msgContainer = jQuery("<div style='position: absolute; top: 0; left: 0; height: 50px; width: 100%; font-size: x-large; color: White; background-color: rgba(0, 0, 0, 0.7);' />");
            jQuery("<div id='fgCounter' style='width: 30px; padding: 10px; font-family: Arial; float:left; font-weight: bold;' />")
                .appendTo(msgContainer);
            jQuery("<div id='fgMessage' style='margin: 0px auto 0px auto; padding: 10px; font-family: Arial; font-weight: bold;' />")
                .appendTo(msgContainer);

            imgElement.appendTo(imgContainer);
            msgContainer.appendTo(imgContainer)
            imgContainer.appendTo(centeredContainer);

            jQuery("<div id='fgLayer' style='position: fixed; z-index: 10000; top: 0; left: 0; text-align: center; width:100%; height: 100%; background-color: rgba(0, 0, 0, 0.9);' />")
                .click(function(){
                    self.isRunning = false;
                    self.hide();
                })
                .append(centeredContainer)
                .prependTo(b)
                .on('fgNextImage', function(){
                    self.changePost();
                });

            $(document).bind('keydown', function(e){
                if (e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 13){ // arrows up down right, enter
                    self.changePost();
                }
                else if (e.keyCode == 8 || e.keyCode == 37) // arrow left & backspace
                {
                    self.history.goBack();
                    self.changePost(self.history.current());
                }
                else if (e.keyCode == 27){ // escape
                    self.hide();
                }

                return false;
            });
            
            self.changePost();

        } else {
            alert("No posts to go.");
        }
    };

    self.changePost = function(featuredPost){
        var post = null;
        if (featuredPost){
            post = featuredPost;    
        }
        else{
            post = self.history.goForward();
        }

        self.counter = post.count;
        var img = jQuery('#fgImage').attr('src', post.imageSrc);

        var fgCounter = jQuery('#fgCounter');
        fgCounter.stop();

        var fgMessage = jQuery('#fgMessage');
        var duration = Math.round(1000.0 / post.speed);

        var animation = function(){

            fgMessage.text(post.intensity); 
            fgCounter.text(self.counter)
                      .css('font-size', '320%')
                      .animate({ fontSize: '10%' }, duration, 'linear', function(){

                            self.counter--;

                            if (!self.isRunning){
                                return;
                            }

                            if (self.counter > 0){
                                animation();
                            } else{
                                jQuery('#fgLayer').trigger('fgNextImage');
                            }
                        });
        }
        animation();        
    }

    self.show = function(){
        self.loadPosts();
        self.initHistory();
        self.history.loadNext();

        if (jQuery('#fgLayer').length == 0){
            jQuery("<input type='button' style='width: 200px; height: 80px; font-size: large; font-weight: bold;' value='Start' />")
                .click(function(){
                    self.run();
                })
                .appendTo(jQuery(".opContainer"));
        }
    };

    self.hide = function(){
        jQuery("#fgLayer").hide();
    };
}

var view = new FgView();
view.show();