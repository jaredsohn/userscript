// ==UserScript==
// @include http://openclipart.org/*
// @include http://openfontlibrary.org/*
// @name openclipart.org - gallery
// @author Frederik Elwert
// @version 0.7
// @description  Fixes and enhances thumbnails of svg clipart on
//      openclipart.org by turning images into objects and adding a
//      viewBox attribute to the svg when missing.
// ==/UserScript==

(function (ev) {
    $("div[id=cc_action_buttons]").each(function(){
        link = $(this).find(".cc_file_download_popup a")[0];
        if(link.type == 'image/png'){
            img = '<img src="' + link + '" height="128"/>';
            $(this).append(img);
        }
        if(link.type == 'image/svg+xml'){
            obj = '<object type="image/svg+xml" data="' + link + '" width="128" height="128"></object>';
            $(this).append(obj);
            $(this).find("object")[0].addEventListener("load",
                function (ev) {
                    var svgdoc = this.contentDocument;
                    var svg = svgdoc.documentElement;
                    var vb = svg.getAttribute("viewBox");
                    if (vb === null) {
                        var res;
                        var re = /([0-9\.]*)([a-z]*)/;
                        var wid = svg.getAttribute("width");
                        res = wid.match(re);
                        var wid_arr = [res[1], res[2]];
                        var hei = svg.getAttribute("height");
                        res = hei.match(re);
                        var hei_arr = [res[1], res[2]];
                        var dim_arr = [wid_arr, hei_arr];
                        var dim = [];
                        var fac;
                        for(i=0; i<dim_arr.length; i++){
                            switch(dim_arr[i][1]){
                                case "mm":
                                    fac = 3.5433;
                                    break;
                                case "cm":
                                    fac = 35.433;
                                    break;
                                case "cm":
                                    fac = 3543.3;
                                    break;
                                case "in":
                                    fac = 90;
                                    break;
                                case "ft":
                                    fac = 1080;
                                    break;
                                case "pt":
                                    fac = 1.25;
                                    break;
                                case "pc":
                                    fac = 15;
                                    break;
                                default:
                                    fac = 1;
                                    break;
                            }
                            dim[i] = dim_arr[i][0] * fac;
                        }
                        svg.setAttribute("viewBox", "0 0 " + dim[0] + " " + dim[1]);
                    }
                    svg.setAttribute("width", "100%");
                    svg.setAttribute("height", "100%");
                }
            , false);
        }
    });
})();
