// ==UserScript==
// @name           Linked image viewer
// @namespace      http://d.hatena.ne.jp/dgdg
// @description    Show linked images with lightbox like viewer.
// @version        0.1
// @include        http://*
// ==/UserScript==
(function() {
    var Previewer = function() {
        this.initialize.apply(this, arguments)
    }
    Previewer.prototype = {
        initialize: function() {
            this.paddingX = 20;
            this.paddingY = 20;

            this.showedImage = null;
            this.container = document.createElement('div');
            this.container.setAttribute('class', 'liviewer-container');
            this.dummy = document.createElement('div');
            this.dummy.setAttribute('class', 'liviewer-dummy');
            this.container.appendChild(this.dummy);
            document.body.appendChild(this.container);
            var self = this;
            addEvent(this.container, 'click', function() {
                self.hide();
            });
            GM_addStyle(<><![CDATA[
                div.liviewer-container {
                    display: block;
                    z-index: 9999;
                    visibility: hidden;
                }
                div.liviewer-container * {
                    padding: 0;
                    margin: 0;
                    border: 0;
                }
                div.liviewer-dummy {
                    opacity: 0.75;
                    position: fixed;
                    background: #000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
                div.liviewer-container img {
                    display: none;
                    position: absolute;
                    z-index: 10000;
                }
                a.tted:hover {
                    opacity: 0.5;
                }
                div.liviewer-container:hover {
                }
            ]]></>);
        },

        hide: function() {
            if (this.showedImage) {
                this.showedImage.style.display = '';
            }
            this.container.style.visibility = 'hidden';
        },

        show: function(img) {
            if (img) {
                if (this.showedImage) {
                    this.hide();
                }
                this.setImageStyle(img);
                this.showedImage = img;
            }
            this.container.style.visibility = 'visible';
        },

        setImageStyle: function(element) {
            element.style.display = "block";
            var w = document.body.clientWidth;
            var h = document.body.clientHeight;
            var wRate = w / element.naturalWidth;
            var hRate = h / element.naturalHeight;
            var rate;
            if (wRate < hRate) {
                rate = wRate;
            } else {
                rate = hRate;
            }
            element.style.width = Math.round(element.naturalWidth * rate) - this.paddingX * 2;
            element.style.height = Math.round(element.naturalHeight * rate) - this.paddingY * 2;
            //element.style.left = window.scrollX + this.paddingX;
            //element.style.top = window.scrollY + this.paddingY;
            element.style.left = window.scrollX + (w - element.width) / 2;
            element.style.top = window.scrollY + (h - element.height) / 2;;
        },

        bindAnchor: function(anchor) {
            var img = document.createElement('img');
            this.container.appendChild(img);
            var self = this;
            // wait for image-load.
            addEvent(img, 'load', function(e) {
                var w = img.naturalWidth + 'px';
                var h = img.naturalHeight + 'px';
                img.style.width = w;
                img.style.height = h;
                var showFunc = function(e) {
                    console.log('anchor-events-show');
                    //self.setPosition(e.pageX, e.pageY);
                    self.show(img);
                    e.preventDefault();
                    return false;
                };
                var hideFunc = function(e) {
                    console.log('anchor-events-hide');
                    console.log(img.src)
                    self.hide(img);
                    e.preventDefault();
                    return false;
                };
                addEvent(anchor, 'click', showFunc);
                //anchor.setAttribute('href', "javascript:void(0);");
                //addEvent(anchor, 'mouseover', showFunc);
            });
            img.setAttribute('src', anchor.href);
        },
    };

    function addEvent(element, type, listener, useCapture) {
        if (document.addEventListener) {
            element.addEventListener(type, listener, useCapture);
        } else {
            element.attachEvent('on' + type, listener);
        }
        return;
    }



    //main
    view = new Previewer();
    var a = document.getElementsByTagName('a')
    if (a) {
        for (i in a) {
            if (a[i].href != undefined && a[i].href.match(/.*(gif|jpg|jpeg|png|bmp)$/i)) {
                view.bindAnchor(a[i]);
            }
        }
    }
})();

