// ==UserScript==
// @name       RecoPick mall test
// @namespace  http://recopick.com/
// @version    0.4
// @description  test RecoPick collector mall.js features
// @match      http://*/*
// @copyright  mctenshi
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")(jQ);";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main($) {
    if (window.top != window.self)  //don't run on frames or iframes
    	return;

    function detectMall() {
        if (!recoPick || typeof recoPick.mall === "undefined") {
            return setTimeout(detectMall, 500);
        }
        
        var mallType = 'cafe24';
        var mallTypes = ['cafe24', 'cafe24_m', 'makeshop', 'makeshop_m', 'godomall', 'godomall_m', 'wisa', 'wisa_m'];
        var html = ""+
            "<style>.recopick_em{font-weight:bold;color:blue}</style>" +
            "<div style='position:fixed;z-index:999999;bottom:0;right:0;padding:5px;background:#fff;color:#767676;opacity:.85'>" +
            "<button type='button' onclick=\"this.parentNode.style.display='none';\" style='position:absolute;top:0;right:0;margin:0;font-size:15px;padding:5px;border:0;border-radius:3px;background:#ff8'>&times;</button>" +
                "<select id='recopick_mall_val'>";
        for (var i = 0; i < mallTypes.length; i++) {
            html += "" +
                    "<option value='" + mallTypes[i] + "'>" + mallTypes[i] + "</option>";
        }
        html += "</select>" +
                "<p>isView: <span id='recopick_mall_isview'></span>" +
                "<p>isBasket: <span id='recopick_mall_isbasket'></span>" +
                "<p>isOrder: <span id='recopick_mall_isorder'></span>" +
                "<p>getItemIdViewPage: <span id='recopick_mall_getitemidviewpage'></span>" +
                "<p>getOrderIds: <span id='recopick_mall_getorderids'></span>" +
            "</div>";
        
        var fill = function () {
            mallType = $('#recopick_mall_val').val();
            var isView = recoPick.mall[mallType].isView();
            $('#recopick_mall_isview').text(isView).toggleClass('recopick_em', isView);
            
            var isBasket = recoPick.mall[mallType].isBasket();
            $('#recopick_mall_isbasket').text(isBasket).toggleClass('recopick_em', isBasket);
            
            var isOrder = recoPick.mall[mallType].isOrder();
            $('#recopick_mall_isorder').text(isOrder).toggleClass('recopick_em', isOrder);
            
            var getItemIdViewPage = recoPick.mall[mallType].getItemIdViewPage();
            $('#recopick_mall_getitemidviewpage').text(getItemIdViewPage).toggleClass('recopick_em', !!getItemIdViewPage);
            
            var getOrderIds = recoPick.mall[mallType].getOrderIds();
            $('#recopick_mall_getorderids').text(getOrderIds).toggleClass('recopick_em', !!getOrderIds);
        }
    
        $('body').append(html);
        $('#recopick_mall_val').on('change', fill);
        fill();
    }

    //if recoPick already defined, than do not load script
    if (!window.recoPick) {
        (function(w,d,n,s,e,o) {
        w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
        e=d.createElement(s);e.async=1;e.charset='utf-8';e.src='//static.recopick.com/dist/production.min.js?t=' + new Date().valueOf();
        o=d.getElementsByTagName(s)[0];o.parentNode.insertBefore(e,o);
        })(window, document, 'recoPick', 'script');
    }

    detectMall();
}

// load jQuery and execute the main function
addJQuery(main);