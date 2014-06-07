// ==UserScript==
// @name       asana: project header background color
// @namespace  http://lawrencealan.com/
// @version    0.1
// @description  sets the project header background color to the project's color
// @match      http://tampermonkey.net/index.php?version=3.5.3630.14&ext=dhdg&updated=true
// @include    http://app.asana.com/*
// @include    https://app.asana.com/*
// @run-at document-end
// @copyright  2013+, lawrencealan@gmail.com
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


function main(){
    var _ischanged = true;
    var _changedebounce = null;
    
    function _darken($c,darkenPercent) {
        var red = parseInt($c[0]);
        var green = parseInt($c[1]);
        var blue = parseInt($c[2]);
        red = parseInt(red * (100 - darkenPercent) / 100);
        green = parseInt(green * (100 - darkenPercent) / 100);
        blue = parseInt(blue * (100 - darkenPercent) / 100);   
        return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    }
 
    
    
    function _asanabars(){
        
        if(!_ischanged) return;
        _ischanged = false;
        window.jQ('div.team-projects a.list-item[href]').each(function(){
            var gid = window.jQ(this).attr('href').split('.com/')[1].split('/')[1];
            var bleftc = window.jQ(this).css('border-left-color');
            if(bleftc!="rgba(0, 0, 0, 0)") {
                var c = bleftc.replace('rgb(','').replace(')','').split(', ');
                var ac = "rgba("+c[0]+", "+c[1]+", "+c[2]+", 0.8)";
                var arl = "rgba("+c[0]+", "+c[1]+", "+c[2]+", 0.1)";
                var group = window.jQ('p.group.project_group[group_id='+gid+']');
                
                
                
                var _d80 =_darken(c,80);
                group.find('div.group_header').css({
                    'color': "#ffffff",
                    'font-weight': 100,
                    'font-size': '19px',
					'line-height': '17px',
                    //  'text-shadow': '0 0 20px #000000',
                    'background-color': _darken(c,30),
                    'border-bottom': '2px solid ',
                    'border-bottom-color': _d80,
                    'position': 'relative'
                }).find('.group_header_icon').css(
                    {
                        'background-color':bleftc,
                        'background-position': "6px -889px",
                        'width': '28px',
                        'height': '37px',
                        'position': 'absolute',
                        'top': 0,
                        'left': 0
                    });
                group.find('#grid .grid-cell').css({
                    'color': "#ffffff",
                    'background-color':arl,
                    'border-right': '2px solid ',
                });
                group.find('.grid_cell_string').css({
                    'border-left': 'none',
                });
                
                group.find('.grid_cell_item_number').css({
                    'color': "#ffffff",
                    'background-color':ac,
                    'border-right': '2px solid ',
                    'border-right-color':bleftc
                });
                
                group.find('.grid-tags-and-date').css({
                    backgroundColor: 'transparent',
                    color: _d80
                    
                });
                
                group.find('.bar-container .bar').css({
                    'border-bottom-color': bleftc,
                    
                });
                
                
            }
        });   
    }
    
    
    var observer = new WebKitMutationObserver(function(mutations, observer) {
        console.log('MUTATE',mutations, observer);
        _ischanged = true;
        clearTimeout(_changedebounce);
        _changedebounce = setTimeout(_asanabars,100);
    });
    
    observer.observe(document, { "subtree": true,  "attributes": false, "characterData":true   });
    
    _asanabars();
}

if($ != null) {
    addJQuery(main);
} else {
    main();
}
