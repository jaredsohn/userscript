// ==UserScript==
// @namespace     http://dunck.us/code/greasemonkey
// @name          My Yahoo! Cleaner
// @description   Removes the clunky headers above main content in my.yahoo.com
// @include       http://*.yahoo.*
// ==/UserScript==


(function() { 
        var uw = unsafeWindow, 
            YUI, script, head, 
            YUILoaded = function() { 
                YUI = uw.YUI; 
                YUI.config.doc = uw.document; 
                YUI.config.win = uw; 
                YUI({
        logExclude: {
            'YUI': true,
            Event: true,
            Base: true,
            Attribute: true,
            augment: true
        }    
        }).use('node', 'yql', function(Y) {
            
            var q3 = new Y.yql('select * from flickr.photos.search where  text="hat"', function(r) {
            if (r.query.results) {
            var data = r.query.results;
            console.log(data);
            
            
            var randomnumber= Math.floor(Math.random()*data.photo.length);
            var selectedImage = data.photo[randomnumber];
            var imageurl = "http://farm" + selectedImage.farm + ".static.flickr.com/" +
               selectedImage.server + "/" + selectedImage.id + "_" + selectedImage.secret + ".jpg"
            var imageTag = "<img src=\'" + imageurl+ "\' alt=\'"  + selectedImage.title + "\'/>"
        ad = document.getElementById( "default-p_13923486-bd" );
        ad.style.display = 'none';
	ab = document.getElementById( "default-p_30345151-bd" );
        ab.innerHTML = '<div>' + imageTag + '</div>';
            console.log(imageTag);
            
        //    console.log(randomnumber);
        //     var aElmnt = uw.document.createElement('a');
        //     aElmnt.href=data.result[0].refererurl;
        //      aElmnt.innerHTML="my hack"
        //    body1 = uw.document.getElementsByTagName('body')[0]; 
        //    body1.appendChild(aElmnt); 
        
             
            }
        });
        });
            }; 
         
        if (!uw.YUI) { 
            script = uw.document.createElement('script'); 
            script.src = 'http:/'+'/yui.yahooapis.com/3.0.0b1/build/yui/yui-min.js'; 
            script.onload = YUILoaded; 
        head = uw.document.getElementsByTagName('head')[0]; 
            head.appendChild(script); 

        script1 = uw.document.createElement('script'); 
            script1.src = 'http:/'+'/github.com/davglass/yui-yql/raw/master/yql-min.js'; 
            script1.onload = YUILoaded;           
            
            head.appendChild(script1); 
     
        } 
     
    })();
