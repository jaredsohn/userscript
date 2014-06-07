// ==UserScript==
// @name            Flickr Exif Decorator
// @namespace       http://netcetera.org
// @include         http://*flickr.com/photos/*
// @description     Decorates photos on Flickr with Exif data (Aperture, Exposure, ISO Speed, etc)

window.addEventListener("load", function() { FED_decorate_photo() }, false);

function FED_decorate_photo() {

    var FED_isInFlickrDialog = function(obj) {
        var re = /.*DialogDiv$/;
        while (obj) {
            if (obj.id && obj.id.match(re))
                return true;
            obj = obj.parentNode;
        }
        return false;
    };

    var FED_showOverlay = function(overlay, obj) {
        var pos = FED_getPos(obj);
        overlay.style.left       = pos[0];
        overlay.style.top        = pos[1];
        overlay.style.visibility = 'visible';
    };

    var FED_getPos = function(obj) {
        var x = 0;
        var y = 0;
        if (obj.offsetParent) {
            x = obj.offsetLeft
            y = obj.offsetTop
            while (obj = obj.offsetParent) {
                x += obj.offsetLeft
                y += obj.offsetTop
            }
        }
        return [x,y];
    };

    var FED_mouseInsideObj = function(e, obj) {
        var posx = 0;
    	var posy = 0;
    	if (!e) return false;

    	if (e.pageX || e.pageY) {
    		posx = e.pageX;
    		posy = e.pageY;
    	}
    	else if (e.clientX || e.clientY) {
    		posx = e.clientX + document.body.scrollLeft
    			+ document.documentElement.scrollLeft;
    		posy = e.clientY + document.body.scrollTop
    			+ document.documentElement.scrollTop;
    	}
    	
    	// get image coordinates
    	var objpos  = FED_getPos(obj);
    	var x       = objpos[0];
    	var y       = objpos[1];
    	
    	// if the mouse pointer is within the bounds
    	// of the object, return true
    	return posx >= x 
            && posx <= (x + obj.offsetWidth - 1)
    	    && posy >= y
    	    && posy <= (y + obj.offsetHeight - 1);
    };
    
    photo_id = location.pathname.split('/')[3];
    var img = document.getElementById('photoImgDiv' + photo_id);
    
    GM_xmlhttpRequest({
        method: 'GET',
        url:    'http://api.flickr.com/services/rest/?method=flickr.photos.getExif'
               +'&api_key=45d5d4b7dff9bc653c8eb3e73271c10c'
               +'&format=json&nojsoncallback=1'
               +'&photo_id=' + photo_id,
               
        onload: function(responseDetails) {
            var data        = eval('(' + responseDetails.responseText + ')');
            var exif_array  = data.photo.exif;
            var exif        = new Array();
            var rawexif     = new Array();
            
            for (i in exif_array) {
                var e = exif_array[i];
                var key = e.label;
                
                rawexif[key] = e.raw._content;
                
                if (e.clean) {
                    exif[key] = e.clean._content;
                }
                else if (!exif[key]) {
                    exif[key] = e.raw._content;
                }
            }
            
            var exif_keys = ['Aperture', 'Exposure', 'ISO Speed', 'Focal Length'];

            // Don't decorate unless there's some Exif data worth showing
            var keep_going = exif['Model'] ? true : false;
            for (i in exif_keys) {
                if (exif[exif_keys[i]]) {
                    keep_going = true;
                }
            }
            if (!keep_going) {
                return;
            }
            
            // Main overlay element
            var overlay = document.createElement('div');
            overlay.setAttribute('id', 'FED_overlay');
            overlay.style.position      = 'absolute';
            overlay.style.top           = '0px';
            overlay.style.left          = '0px';
            overlay.style.visibility    = 'hidden';
            document.body.appendChild(overlay);

            // Add translucent background
            var obg = document.createElement('div');
            obg.setAttribute('id', 'FED_obg');
            obg.style.backgroundColor   = '#000';
            obg.style.opacity           = '0.75';
            obg.style.MozBorderRadiusBottomright = '8px';
            obg.style.position          = 'absolute';
            obg.style.top               = '0px';
            obg.style.left              = '0px';
            overlay.appendChild(obg);

            // Add overlay text element
            var ot = document.createElement('div');
            ot.setAttribute('id', 'FED_ot');
            ot.style.color              = '#fff';
            ot.style.fontSize           = '11px';
            ot.style.opacity            = '1.0';
            ot.style.position           = 'absolute';
            ot.style.top                = '0px';
            ot.style.left               = '0px';
            ot.style.fontFamily         = '"Gill Sans", "Gill Sans MT", Tahoma, Helvetica, Arial';
            ot.style.padding            = '4px 8px 4px 4px';
            ot.style.textAlign          = 'left';
            overlay.appendChild(ot);
            
            var first = true;
            var h = '<nobr>';            
            var flash_arrow_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACV0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVggMjAwNId2rM8AAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvNS8wNyp/1lcAAABcSURBVHicjY7BDYAwDAOviM7SlWBCWCmfLNJH+DRSUxWKX5Fzsp3MjF4icuScL4Ba61lKuQG2P1AAR8g9/yevVtW4ocmT997we7nxDVpWfybOoAD2G0domjiDAB4i61DU2xUj8QAAAABJRU5ErkJggg==";
            
            if (exif['Model'] || exif['Flash']) {
                if (exif['Model']) {
                    if (exif['Make'] && !exif['Model'].match(new RegExp(exif['Make'], 'i'))) {
                        h += exif['Make'] + ' ' + exif['Model'];
                    }
                    else {
                        h += exif['Model'];
                    }
                }
                // LSB of Flash Exif param's raw value is
                // 1: flash fired, 0: flash didn't fire
                if (exif['Flash'] && rawexif['Flash'] & 1) {
                    h += '<img src="' + flash_arrow_src + '" hspace="10" />';
                }
                h += '</nobr><br/><nobr>';
            }   
            
            for (i in exif_keys) {
                var key = exif_keys[i];
                if (exif[key]) {
                    if (first) { first = false;}
                    else { h += ', '; }
                    if (key == 'ISO Speed')
                        h += 'ISO ';
                    h += exif[key];
                }
            }
            h += ' (<a style="color: #fff" href="http://www.flickr.com/photo_exif.gne?id=' + photo_id + '">more</a>)';
            h += '</nobr>';
            ot.innerHTML = h;
            
            obg.style.width  = ot.offsetWidth  + 'px';
            obg.style.height = ot.offsetHeight + 'px';

            // Event listeners to display the overlay when we
            // move over an image
            function mouseMoveListener(e) {
                if (overlay.style.visibility == 'hidden') {
                    FED_showOverlay(overlay, img);
                }
                // Only want this listener to fire once - to get the
                // overlay displayed if the page loads while the mouse
                // is moving over the image. Once it's fired we can
                // remove it.
                img.removeEventListener('mousemove', mouseMoveListener, false);
            }
            
            function mouseOutListener(e) {
                // don't want to hide the overlay if the mouseout
                // event happened because we moved into another
                // element over the image, e.g. a note
                // Do hide for flickr dialogs though (e.g. Add To Group
                // drop-down) because otherwise overlay can obscure it
                // according to correspondence on Flickr Hacks group.
                if (FED_mouseInsideObj(e, img) && !FED_isInFlickrDialog(e.relatedTarget)) {
                    return;
                }            	
                overlay.style.visibility = 'hidden';
            }
            
            function mouseOverListener(e) {
                if (overlay.style.visibility == 'hidden') {
                    FED_showOverlay(overlay, img);
                }
            }
            
            img.addEventListener('mousemove', mouseMoveListener, false);
            img.addEventListener('mouseout', mouseOutListener, false);
            img.addEventListener('mouseover', mouseOverListener, false);
            overlay.addEventListener('mouseout', mouseOutListener, false);
        }
    });
}
