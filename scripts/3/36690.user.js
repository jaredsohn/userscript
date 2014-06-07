// ==UserScript==
// @name           BrightenUp
// @namespace      http://odyniec.net/
// @description    Experimental script that uses the <canvas> element to adjust the brightness of images hosted at ImageShack
// @include        http://*.imageshack.us/*
// ==/UserScript==

function _brightenUp()
{
    var brightenUp = {
        config: {
            minWidth: 100,
            minHeight: 100
        },
        
        images: [ ],
        idToIndex: { },
    
        createPanel: function (image, c) {
            var div, buttonMore, buttonLess;
            
            div = document.createElement('div');
            
            buttonMore = document.createElement('button');
            buttonLess = document.createElement('button');
            buttonMore.appendChild(document.createTextNode('+'));
            buttonLess.appendChild(document.createTextNode('-'));
            buttonMore.className += ' brightenup_more';
            buttonLess.className += ' brightenup_less';
            
            buttonMore.addEventListener('click', brightenUp.buttonClick, true);
            buttonLess.addEventListener('click', brightenUp.buttonClick, true);
            
            div.appendChild(buttonMore);
            div.appendChild(buttonLess);
            
            div.style.fontWeight = 'bold';
            div.style.zIndex = '100';
            div.style.float = 'left';
            div.style.position = 'absolute';
            div.style.left = brightenUp.images[c].left + 10 + 'px';
            div.style.top = brightenUp.images[c].top + 10 + 'px';
            div.style.display = 'none';
        
            div.id = 'brightenup_panel_' + c;
        
            return div;
        },
        
        imgMouseOver: function (event) {
            document.getElementById('brightenup_panel_' + 
                brightenUp.idToIndex[this.id]).style.display = '';
        },
        
        imgMouseOut: function (event) {
            document.getElementById('brightenup_panel_' +
                brightenUp.idToIndex[this.id]).style.display = 'none';
        },
        
        panelMouseOver: function (event) {
            this.style.display = '';
        },
        
        buttonClick: function (event) {
            var c = parseInt(this.parentNode.id.replace(/[^0-9]/g, ''));
            var width = brightenUp.images[c].width;
            var height = brightenUp.images[c].height;
            
            if (!brightenUp.images[c].canvas) {
                var canvas = document.createElement("canvas");

                canvas.style.width = (canvas.width = width) + "px";
                canvas.style.height = (canvas.height = height) + "px";
                canvas.style.position = 'absolute';
                canvas.style.top = brightenUp.images[c].top + 'px';
                canvas.style.left = brightenUp.images[c].left + 'px';

                canvas.addEventListener('mouseover', brightenUp.imgMouseOver, true);
                canvas.addEventListener('mouseout', brightenUp.imgMouseOut, true);
                
                canvas.id = 'brightenup_canvas_' + c;
                brightenUp.idToIndex[canvas.id] = c;
                
                brightenUp.images[c].canvas = canvas;
                
                var context = canvas.getContext("2d");
                context.drawImage(brightenUp.images[c].image, 0, 0, width, height);
                        
                brightenUp.images[c].imageData = context.getImageData(0, 0, width, height);
                
                document.body.appendChild(canvas);
            }

            var context = brightenUp.images[c].canvas.getContext("2d");
            var newImageData = context.getImageData(0, 0, brightenUp.images[c].width,
                brightenUp.images[c].height);
                
            var n = d = newImageData.data;
                    
            if ((' ' + this.className + ' ').match(/ brightenup_more /))
                b = 10;
            else
                b = -10;
                    
            for (i = 0; i < width * height * 4; i++) {
                n[i] = d[i] + b;
                if (n[i] < 0) n[i] = 0; else if (n[i] > 255) n[i] = 255;
                n[++i] = d[i] + b;
                if (n[i] < 0) n[i] = 0; else if (n[i] > 255) n[i] = 255;
                n[++i] = d[i] + b;
                if (n[i] < 0) n[i] = 0; else if (n[i] > 255) n[i] = 255;
                ++i;
            }
                    
            context.putImageData(newImageData, 0, 0);
        },
    
        init: function () {
            var images = document.getElementsByTagName('img'), c = 0;

            for (var i = 0; i < images.length; i++) {
                if (images[i].offsetWidth < brightenUp.config.minWidth || 
                    images[i].offsetHeight < brightenUp.config.minHeight)
                    continue;

                var p = images[i], left = 0, top = 0;
            
                while (p) {
                    left += p.offsetLeft;
                    top += p.offsetTop;
                    p = p.offsetParent;
                }
            
                brightenUp.images[c] = {
                    image: images[i],
                    width: images[i].offsetWidth,
                    height: images[i].offsetHeight,
                    left: left,
                    top: top
                };
                
                if (!images[i].id)
                    images[i].id = 'brightenup_image_' + c;
            
                brightenUp.idToIndex[images[i].id] = c;
            
                var panel = this.createPanel(images[i], c);
                panel.addEventListener('mouseover', brightenUp.panelMouseOver, true);
                brightenUp.images[c].panel = panel;
                
                document.body.appendChild(brightenUp.images[c].panel);
                
                images[i].addEventListener('mouseover', brightenUp.imgMouseOver, true);
                images[i].addEventListener('mouseout', brightenUp.imgMouseOut, true);
                
                c++;
            }
        }
    };

    window.addEventListener('load', function () {
        brightenUp.init();
    }, true);
}

var script = document.createElement("script");
script.appendChild(document.createTextNode(_brightenUp.toString().replace(/^.*?{|}.*?$/g, '')));
document.body.appendChild(script);

