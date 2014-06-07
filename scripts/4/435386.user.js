// ==UserScript==
// @name        Minus Gallery Download Helper
// @description This is a simple $uery-powered script that scrapes a minus gallery for image download links on demand. It's designed to work with another tool that does the actual downloading (like jDownloader or wget).
// @author      http://reddit.com/u/slampisko/
// @namespace   http://min.us/
// @include     *minus.com*
// @version     1.1
// @grant       none
// ==/UserScript==

function main($) {
    'use strict';
    jQuery.noConflict();
    
    // reload
    var iconRefresh = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMiSURBVDiNbVJNbFRlFD33e++V+a0zbQdbqLYKhhKmoaIzjX/RmEY3xGBYqLxEjJCB8LNhBxsMTQwRdGGi4AOjMUwlmDQBN/wEIZLUwqtx0dCS1NLGAUY7tB3ozLTz3vu+66LzkllwkpvcxT0nJ+dcYmb4SGWyzzTo2hEQ3vSkatWEmCfCuOPKEwAu2Jbp1t0eBHCCfIF0JrtF08RAT9cqfV1ns9HWFAGYUShWMDJ2v3xn+qEnFe+2LfNselc2w4zvAMSImZHKZNcbuhjZ2tcdiseC0InQHA0gHNARDRkIGgIzxUUczw5XCsWKHQ019D4uVw1mNBEz49U9Z0/1rGv7NBgwxK3RHKquB0PX5JrVscW+9PPh3vWtpAmCEIRfrk2ot15sFwe+vuo4rmzRAYCZP7wzXRCup1gxLzLjM8eVZ8anZ5MT9+aPXu9o7tq3dVMoEQvh43e7RC0GAqAEAEipwlXH85IvPPuDlOoRgEHbMvO2ZV7549uPXhqdLOzdfewS7j8sYXqmDKkYAAMACyyvqumpSH9jJPBVZ/vKbgBTdWnruiZ2bnsn6XY+HUWicQU0Qb4D1mt38V8/37yAJ+O0J9VrF4cnq1ftqSXfvOOqAAD2W6gCMGoErpvfAOwE4D5BWLct854v4J0/+r4GEJgZF+1/1Knzf+WkVD22ZRbrWYezY6tK5aWO30fGbwCI6QBABBAR7v5XhiEYJwf/JABf1JNTmWyYiO72blx7Jj8zlwKgAagKABBEBAAdiRBWt4Tx5f63qa0lcuyVPT/fSmWy6ZrG9hWGrufyswfyheLrmkaubZmuWHZAeFxxcWFoij2P0b4yisM73gh90Jd8ubU5ci29a8A1dPGNVDI+92gBTY1B0oQYBAD/kaj/x6Glidzc5KXhyc7Mlk3hRCyI7rUJeq49HiqWXfw7W4LjeBQJGjh3ebTiSXUEAJYfSTFN5OZO3zy5LfmgsPBJ//c35o8P3CwN384jP1tG1ZUQRCjMl+S5y6OLUqmMbZljAOC38BOA7bZlci0wA8B7DYa2VzFvkFLFDV2bIcJQ1ZGHbMv82w/3fy5VdmoTZczGAAAAAElFTkSuQmCC"
    // search
	, iconSearch = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH1QYdERIIyN9seAAAAzRJREFUOMulk1toVHcQxmf+57LnnM3e4m42qRs0iBqLlzYbW7NUraQ+GHxQNBQUopJCqautDzVNNVRaNETBEqRUaGsVpIUmL32qtMYQL0isaECjwVvEZJPN3rebze6ePTnz9yUbWvGtHwwzzMOPbxg+hFfU1n74N72Q34qIKnFCzvmMzWa/2Hm86xN4jcTS8EX74Q25fP6v5p3NssNRjkXD5CYHkAW0TmdSH2cy03vtdltj5/Gum/8GIADAsa871qbT6VvB/Z9h393J4khSLCiapprEpVw2m/G/AUrj2z65+8xpqvBU1HccPTb0HweJRHLg0wOH8PfbUWNKt0u7NvmyCxdo/5hErqHn6cSNkdii6b/DxYPBQ3L3mW+vAYCtBBA6vjrS5q+r3zyaFM3RGU36qHFJpMqloiIziQhk1SKmcvrsw+dJqrFQzvC6FFy9ZlX26sC1WwAALJGIn/TX+aXBF4YcWO42BAZu3TCdeX1WM4kE0zTdkZTuQcDwcATkd9a+q0Sjke75EyRJ4gQMrXYHKLJ4L5M3mGJyXRSwSMSX9twInTSIyoCDK22In6uqBpIk8XkAEc1aJFGSGOdPJqanGNqYqwxMvWiGx2K5kE4UFzgSMK7MGoap67pARMY8wOv13pmYmKh3yDI+Ho+Xj8dzNzmDKCKLIHG3ADADyK3JWHR97aJyTCYTemVl1WAJwERR/LF/4Ep4q98rqFY1YHKyAUcGnIscyEEIcqFQqHB5PO9vecvDfr5wLpNOp/rnv3Clr39oxZu1bVaLqK9cVqONxov1sXDIo6rqM+JUGxl/sd3ldu/esUqEwet/clXRMBaLNdQsWXzh4YORrAAAsGPn9svDD+7v57nU1K6mgN0AsXKmyD/gKKypW1pRtc3vhnNnT1NgXYBNTk1KRKbEGGtpaFjXhyUrXadOrB4bG//D4/YUnM5y2V/nd1ZXV9t6ensePXn6SNXzxjdOl/2npi1NcG/4Pmx4byP98utFhq+Go+vUiX0A0BwKhTYCgObz+S4BQG9729HzwWCwExn/ck/LXrBay+D7s98BviZgbK6wlJW5zgEAWltbW1TN8sPc7kP4v3oJO6lmk2hPogUAAAAASUVORK5CYII="
    // select all
	, iconSelectAll = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFLSURBVDiNlZM9TsNAEIXfWLaUjhMgEA2FHcUuEAiJEyAQ9yAFBMENkKJAoEkuQQkXoITaieQSDhEpsXf3UYQ1/okVMs2svTPfvDfSCkk8Pg1GWqtLbBCu645vru+6IIn+4N5orWmMoTGGWmtqramUolKKWZYxyzKmaco0TblYLPgw7BuScH+BAgAv7wlEZPmjkotxdriT91gARAQigiRJSsW+72M6nZa+S1bsgeTKaSKCIAiad9F4U4HYONnfKt05/1EQxzHiOM5tNioQEfi+nxfa4k6n8zfRcZoBFlJsruZGAEkAwGQyqdmwEUURHMfJa1daaLfbJQUXx3t4/fjC+dEu3j6/1yuoAm3zbDZbueS1FsIwBLD0LiK1QbUlBkFQW2RRUVWtBZCknB5s1yS2Wi3M5/M8F0AEACGJ4fNgpNRmz9nzvHHv6rb7A0Yyl67zdA2qAAAAAElFTkSuQmCC"
    // plus
	, iconPlus = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH1gELEAARlER4oQAAANBJREFUOMvNkb0OwWAUhh/SxWC3cgfSuoHGYDZbO3RxB0TSxGQXsVoNJoOEG+hnN1osVmnip98xEIr6iwTvdvKdvPme58Cvk7j3YDk9HzCPo/K7FStuL/mg3PRcG8+1iRS9VfBSPi4w7jDHOZHIeHJiRJlb1SJbLSSAbXje91wbERA5WK93xubNDwBW65D5MkAEtBa0QLARwlDYaUFryGVS8QiAanQmFwjlUgGAwci/JlJP5VhOT4bThTT7M7ni//IZ89n0a2eMiaq1T7YVf5s9VHJLC4uyd44AAAAASUVORK5CYII="
    // minus
    , iconMinus = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH1gELDzsiAFwSwgAAAIRJREFUOMvtkbEJg1AQhr8HadzAOivoCBkjrW1GCBkgC4itc8QFdIjUtiJE8+5PIcqzszOFHxwcB/93HAcH++PmJs3KGkg25pq6uKYAp2CYPG8XRhMOGL1WCWkqB9zz17IoFNB9PO+2RwIzYYJ+EN6LrwkzOMfRShwKmkdebT7h+P4/8QOsUy3bRuSA2AAAAABJRU5ErkJggg=="
    // stop
    , iconDismiss = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QoRFy0Na8CcwAAAAsFJREFUOMttk7tPU2EYh59z6QVtjcbI4CWGxkAreGlquAmpNoiamJC4sRBY/A9cOjgYaRwcTByMC3HQwbsxuJhQJJqwiMHEDg4otdQWSmmhB+G05zufA6WC8iZfvuRNnt97+eVV2BKPwmE9PTHxRMBVdggNxgRcjkJlM6f8Az9r9PkuXbx2za1oGgBSShACaVl8ePjQ/DIz817AlShYNYEq/MLv8/VGhobc8+PjmPn8tupOr5f6jg4+PH1qJpLJMQF9UbC0kVDIkZ2cfBk4dqw3Mji4Aa+ugmVtExCqylo6TSAS0Vfn5o4slUpnBsPh51pnJvPmeGNjz/mBAXc2Hseqr0ePxSCZRGazG7OfOMHeu3epJBIYX79yPBzWjVTq6I9EIqj1qOrj/uvX9cy7d5QLBdS+PtSWFpSODvj+HXX/fvYMD+Patw9FSkrj4/wuFGgOh/Wpz58DuqIoICXlQmGj1ZERcLlw9fbivnEDXVFwejyY8Tj5O3ewgXXDQAqBAqj/eSUl4v595NQUzl27cHq9WNPT5GIxhG1jAzYgqztSd/S7uRl3KISu6zgcDnYHg9SFQsgqLMplxNzcXwEpRA1WW1rw3rqF0+tlPR5ndXQUp8eD7949PO3tmLkcxrdvyJUVAHQp5YaaYSAsi7q2NlxVeHF4GNs00YAD/f3UnTrF+oMHoGnY1aLaBSm7K8Xi4UBbm1ZKJCi9fk3l508Wbt6knMlQXlwk9+oVa7OzJG/fRtE0fH4/6aUl+8fycl6JgVODtycbGrpbg0FXKh5nrVisLWvrUxwOGpqaSBcK4mM6vWBDpzYGIgJPcsVil2kYhwKtrXppfp6KaW6DVYeDBr+f2XxeTP76lbKhPQqp2jFtduI/eLD77OnTLkUIbMtCWlbtTyST1qdsdsaGrigsbrvGrSICenayV4VpG85FYXkz9wfHTVL214b3FAAAAABJRU5ErkJggg==";

    var controlStrip = ""
    , content = ""
    , contentExpanded = false
    , styles = {
        'border': '1px solid #e8e8e8',
        'padding': '15px 25px',
        '-webkit-border-top-left-radius': '5px',
        '-webkit-border-top-right-radius': '5px',
        '-webkit-border-bottom-right-radius': '5px',
        '-webkit-border-bottom-left-radius': '5px',
        '-moz-border-radius-topleft': '5px',
        '-moz-border-radius-topright': '5px',
        '-moz-border-radius-bottomright': '5px',
        '-moz-border-radius-bottomleft': '5px',
        'border-top-left-radius': '5px',
        'border-top-right-radius': '5px',
        'border-bottom-right-radius': '5px',
        'border-bottom-left-radius': '5px',
        'margin': '16px 0px 16px 0px',
    };
    
    function SelectText(element) {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection
        ;    
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();        
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    
    function getLinks() {
        content = "";
        $(".item").each( function(i) {
            var link = $(this).find("a.btn-download").attr('href');
            if (link.length > 0) {
                content = content + "<a href='" + link + "'>" + link + "</a><br/>";
            }
        });
    }
    
    function clearControls() {
        controlStrip = "";
    }
    
    function addControl(control) {
        var oldStripContent = controlStrip;
        var newStripContent = (oldStripContent == "" ? "" : " | ");
        
        newStripContent += "<a style='cursor:pointer' id='" + control + "'><img src='";
        if (control == "search")
        {
            newStripContent += iconSearch + "' title='Search' alt='Search'/> Search</a>";
        }
        if (control == "refresh")
        {
            newStripContent += iconRefresh + "' title='Refresh' alt='Refresh'/> Refresh</a>"
        }
        if (control == "expand")
        {
            newStripContent += iconPlus + "' title='Expand' alt='Expand'/></a>";
        }
        if (control == "contract")
        {
         	newStripContent += iconMinus + "' title='Contract' alt='Contract'/></a>";
        }
        if (control == "selectall")
        {
            newStripContent += iconSelectAll + "' title='Select all' alt='Select all'/>Select all</a>";
        }
        if (control == "dismiss")
        {
            newStripContent += iconDismiss + "' title='Dismiss' alt='Dismiss'/></a>";
        }
        
        controlStrip = oldStripContent + newStripContent;
    }
    
    function setControls(controls) {
        var arrayLength = controls.length;
        clearControls();
        for (var i = 0; i < arrayLength; i++) {
            addControl(controls[i]);
        }
    }
    
    function buttonize() {
        var contentelem = $("#imagedownloadlinks");
        contentelem.find('a#search').click(function() {
            getLinks();
            contentExpanded = true;
            setControls(["contract", "refresh", "selectall", "dismiss"]);
            constructElement();
        });
        contentelem.find('a#refresh').click(function() {
            getLinks();
            clearControls();
            setControls(["contract", "refresh", "selectall", "dismiss"]);
            constructElement();
        });
        contentelem.find('a#expand').click(function() {
            contentExpanded = true;
            clearControls();
            setControls(["contract", "refresh", "selectall", "dismiss"]);
            constructElement();
        });
        contentelem.find('a#contract').click(function() {
            contentExpanded = false;
            clearControls();
            setControls(["expand", "dismiss"]);
            constructElement();
        });
        contentelem.find('a#selectall').click(function() {
            SelectText('idl-content');
        });
        contentelem.find('a#dismiss').click(function() {
            $("#imagedownloadlinks").remove();
        });
    }
    
    function constructElement() {
        var contentelem = $("#imagedownloadlinks");
        contentelem.html("<div id='idl-controlStrip'>" + controlStrip + "</div>" + (contentExpanded ? "<br/><br/><div id='idl-content'>" + content + "</div>" : ""));
        buttonize();
    }
    
    $(".masonry").first().before("<div id='imagedownloadlinks'></div>");
    var contentelem = $("#imagedownloadlinks");
    contentelem.css(styles);
    controlStrip += "Minus Gallery Download Helper 1.1 – click Search to start";
    addControl("search");
    addControl("dismiss");
    constructElement();
}

!function loader(i) {
    var script
      , requires = [ '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'
                   ]
      , head = document.getElementsByTagName('head')[0]
      , makeScript = function () {
            script = document.createElement('script');
            script.type = 'text/javascript';
      }
      , loadLocal = function (fn) {
            makeScript();
            script.textContent = '(' + fn.toString() + ')(jQuery);';
            head.appendChild(script);
      }
      ;
    (function (i) {
        makeScript();
        script.src = requires[i];
        script.addEventListener('load', function () {
            ++i !== requires.length ? loader(i) : (loadLocal(main));
        }, true);
        head.appendChild(script);
    })(i || 0);
}();