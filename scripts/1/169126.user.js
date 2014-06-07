// ==UserScript==
// @name       Piratebay torrent description image link previewer.
// @version    0.5.1
// @description Displays torrent description image links as images.
// @include     http://thepiratebay.se/torrent/*
// @include     https://thepiratebay.se/torrent/*
// @include     http://tpb.pirateparty.org.uk/torrent/*
// @include     https://tpb.pirateparty.org.uk/torrent/*
// @include     http://pirateproxy.net/torrent/*
// @include     https://pirateproxy.net/torrent/*
// @include     http://thepiratebay.se/torrent/*
// @include     https://thepiratebay.se/torrent/*
// @include     http://www.pirateproxy.me/torrent/*
// @include     http://livepirate.com/torrent/*
// @include     http://www.pirateflix.info/torrent/*
// @include     http://pirateproxy.net/torrent/*
// @include     http://thepiratebay.sx/torrent/*
// ==/UserScript==

(function () {

    var nfoPre,
        PBPreviewer = {
            init: function () {

                nfoPre =  document.getElementsByTagName('pre')[0];                  //  Get torrent description info.
                Helpers.Log(nfoPre);
                var infoLinks = Helpers.getAllLinks();                              //  Get all links.
                if (!infoLinks || infoLinks.length == 0) {                          //  Validate
                    return;
                }

                for (var i = infoLinks.length; i-- > 0;) {                          //  Loop all image links.
                    var img = Helpers.CreateImage(infoLinks[i].link);               //  Create image. 
                    nfoPre.replaceChild(img, infoLinks[i].element);                 //  Replace old link with new image preview.
                }
            }
        },
        Helpers = {                                                                 //  Helper namespace.
            getAllLinks: function () {

                var result = [];                                                    //  Create new result array, 
                if (nfoPre) {                                                       //  Validate

                    var l = nfoPre.getElementsByTagName('a');                       //  Get all a-tags in info pre.
                    if (l && l.length > 0) {                                        //  Validate...
                        for (var i = l.length; i-- > 0;) {                          //  Loop all tags.
                            var hrefLink = l[i].href;                       
                            var s = Helpers.isImageLink(hrefLink);                  //  Get SupportChecker for current link. 
                            if (s.isImage) {                                        //  Check url is pointing at image.
                                var url = hrefLink;                         
                                if (s.isHosting) {                                  //  Check if url uses custom url from supported image host.
                                    url = ImageHosters.getHosterLink(hrefLink);     //  Get custom url from image host.
                                }                                           
                                var imgLink = new Helpers.Classes.ImageLink(l[i], url); //Create new image link.
                                result.push(imgLink);
                            }
                        }
                    }
                }

                return result;                                                      // Return all supported images links.
            },
            isImageLink: function (url) {                                           // isImageLink(url) indicates if current url points at an image.

                var isImage = false,
                    isHosting = false;  

                //Check if file contains known file endings.
                for (var i = Helpers.Constants.IMG.length; i-- > 0;) {
                    if (Helpers.String.endsWith(url, Helpers.Constants.IMG[i])) {
                        isImage = true;                                             //  Return TRUE if url contains image type information.
                    }
                }                                 
                if (Helpers.isHost(url)) {                                          //  Check if url points at known image host.                       
                    isImage = true;
                    isHosting = true;
                }

                return new Helpers.Classes.SupportChecker(isImage, isHosting);      // Return false if url does not contain image type information
            },
            isHost: function (url) {
                return ImageHosters.identifyHost(url) != null ? true : false;
            },
            CreateImage: function (url) {                                           //  Create image link with dynamic width using url.
                                                                                    //  Update 0.3: Create clickable image link.
                var fullsizeLink = document.createElement('a');
                fullsizeLink.href = url;
                var img = document.createElement('img');                            //  Create img-tag.
                img.setAttribute('src', url);                                       //  set img url.
                img.setAttribute('width', "100%");                                  //  set image width.
                fullsizeLink.appendChild(img);                                      //  Append link with image.
                return fullsizeLink;                                                //  Return image link.
            },
            String: {
                endsWith: function (str, s) {
                    return str.indexOf(s, str.length - s.length) !== -1;            //Check if string ends with a specific string.
                }
            },
            Constants: {                                                            //  0.2 Update, Changed the enum namespace to a constant namespace.
                IMG: [                                   
                    "gif",
                    "jpeg",
                    "jpg",
                    "png"  
                ]
            },
            Classes: {                                                              //  Class namespace
                ImageLink: function (element, link) {                               //  Class represent a link element and its URI.
                    this.element = element;
                    this.link = link;
                },
                SupportChecker: function (isImage, isHosting) {                     //  SupportChecker class indicates if current url is pointing at image and if the url is one of the supported image hosting pages.
                    this.isImage = isImage;
                    this.isHosting = isHosting;
                }
            },
            Log: function (msg) {                                                   //  Add client console logging support.

                if (console && msg) {                                               //  Check if debug is activated and msg contains information.
                    console.log(msg);                                               //  Log to console.
                }
            }
        },
        ImageHosters ={                                                             //  Image host namespace
            SupportedHostingServices: [                                             //  Array of supported image hosting pages.
                {
                    url: "http://someimage.com/",
                    getHandledUrl: function (url) {
                        return "http://t1.someimage.com/" + (url.substring("http://someimage.com/".length)) + ".jpg";
                    }
                },
                {
                    url: "http://www.postimg.com/image/",
                    getHandledUrl: function (url) {
                        return "http://www.postimg.com/" + url.substring("http://www.postimg.com/image/".length);
                    }
                },
                {
                    url: "http://addpix.net/viewer.php?file=",
                    getHandledUrl: function (url) {
                        return "http://addpix.net/images/" + url.substring("http://addpix.net/viewer.php?file=".length);
                    }
                },
                {
                    url: "http://picbug.ru/share-",
                    getHandledUrl: function (url) {
                        url = url.substring("http://picbug.ru/share-".length);
                        url = url.slice(0, -5);
                        return "http://picbug.ru/image-" + url + ".jpg";
                    }
                }
            ],
            identifyHost: function (url) {                                          //  Check if url is one of our supported image hosters.
                if(!url || url == ""){
                    return null;
                }

                for (var i = ImageHosters.SupportedHostingServices.length; i-- > 0;) {
                    if (url.indexOf(ImageHosters.SupportedHostingServices[i].url) !== -1) {
                        return ImageHosters.SupportedHostingServices[i];
                    }
                }

                return null;
            },
            getHosterLink: function (url) {                                         //  getHosterLink() Gets image hoster custom url.
                var host = ImageHosters.identifyHost(url);
                return host != null ? host.getHandledUrl(url) : "" ;
            }
        }

    //On DOM content loaded init previewer.
    window.addEventListener('DOMContentLoaded', function () {
        PBPreviewer.init();                                                         //  Init PBPreviewer.
    });
}());