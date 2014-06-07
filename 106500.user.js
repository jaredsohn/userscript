// ==UserScript==
// @name           facebook.com - nichego lishnego
// @version        1.02
// @description    Simplified (or hide) extra messages as pages, groups, new friendships, applications etc from user nichego http://facebook.com/nichego

// @namespace      http://facebook.com/nichego
// @author         Alexey Krekhalev <nichego@gmail.com>

// @include        http*://*.facebook.com/*
// @match          http://*.facebook.com/*

// @exclude        http://*.facebook.com/login.php
// @exclude        http://*.facebook.com/sharer*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/plugins/*

// @exclude        http*://apps.facebook.com/*
// @exclude        http*://facebook.com/apps/*
// ==/UserScript==

(function(d){

    const DEBUG = false;

    const script_id = 39393;
    const script_version = '1.02';

    const gm_class = ' gm_simplified_wall';

    /* default settings */
    var extras = {
        'friendships'   : {'hide':true},
        'linklikes'     : {'hide':true},
        'pagelikes'     : {'hide':true},
        'pageposts'     : {'hide':true},
        'applications'  : {'hide':true},
        'links'         : {'hide':true},
        'photos'        : {'hide':true},
        'groups'        : {'hide':true},
        'events'        : {'hide':true},
        'questions'     : {'hide':true},
        'places'        : {'hide':true},
        'friendwall'    : {'hide':true},
        'changeprofile' : {'hide':true},
    };

    var sty = {
        12  : 'friendships',
        5   : 'linklikes',
        8   : 'pagelikes',
        11   : 'pageposts',
        316 : 'groups',
        1  : 'events',
        6   : 'photos',        7    : 'photos',      60     : 'photos',
        65  : 'photos',        247  : 'photos',
        332 : 'links',         263  : 'links',
        9 : 'applications',
        32  : 'questions',
        31  : 'places',
        26  : 'friendwall',
        10  : 'changeprofile',
    };

    /* images */
    var image = {
      'friendships' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABGUlEQVR42mL89/f/fwYKAAsyZ+WO6wxv3n9n+PHzD0NxghlRBjDBGHtOPGR48OQjw5evvxj+/PnHsOfEQ9IMuHrnNYoEOp+gARSHAQsL1CxGBgaG/wh+9lprhntvr6BoUhLWYZgafBSiHBYLD55/ZFi59ToDAwMDw7FfaQy/WBBhsCPjI4oBHjP4GbanfUT1goIkPwMz1NZfLA8ZOn3XMHT6riHeC6t33WA4/C0FxWZkG7G5BG7AhCWnGX7++Au3GRnA+OWbQ7DHAkwz2bGArJntjzzcJkI2e87iZ1AS1mFg+fz1G8Ov338YGBgYGNQZehgYGBgYLvOFoihG9zuM7zGDHxGNyAA97rEFHl4D8BmGnqAYKc3OgAEAcDyFP7wFB6YAAAAASUVORK5CYII=',
      'linklikes'       : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABH0lEQVR42mL8////fwYKAAsDAwPDrFWnGa7cfkWyZh1VMYgBV26/YmjKdWRgZmIiWvPff/8Y6ibvhxjAwMDA8O/ff4Z///5iKPTLWsIgLMDFML8tCKtBeK0s6tjGcGRZOl6X4DXgzqN3DAwMDAxvP3wj3YAV2y4zWBvJExcL2MCyLRdRnO+XtYSBgYGBwdJAjqEyzQ5hQFL1WoZb99/AFcAAsmZktk3UTFQX3Lr/hiHMU5eBgYGBYdX2ywQDDasXnr78RFlKJBU0TD2AmhJJNiDTkoGBgYGBjY0N0wBYIFkbyTP4O2syWBmiRqW8lACDkJAQwgtqiiIMR889hAtsmBrDwMDAwHDmylOGDXuuM5R170DRPLHaB8VARkqzM2AAVfFZlaoTn9QAAAAASUVORK5CYII=',
      'pagelikes'       : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABH0lEQVR42mL8////fwYKAAsDAwPDrFWnGa7cfkWyZh1VMYgBV26/YmjKdWRgZmIiWvPff/8Y6ibvhxjAwMDA8O/ff4Z///5iKPTLWsIgLMDFML8tCKtBeK0s6tjGcGRZOl6X4DXgzqN3DAwMDAxvP3wj3YAV2y4zWBvJExcL2MCyLRdRnO+XtYSBgYGBwdJAjqEyzQ5hQFL1WoZb99/AFcAAsmZktk3UTFQX3Lr/hiHMU5eBgYGBYdX2ywQDDasXnr78RFlKJBU0TD2AmhJJNiDTkoGBgYGBjY0N0wBYIFkbyTP4O2syWBmiRqW8lACDkJAQwgtqiiIMR889hAtsmBrDwMDAwHDmylOGDXuuM5R170DRPLHaB8VARkqzM2AAVfFZlaoTn9QAAAAASUVORK5CYII=',
      'pageposts'       : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAMAAAD+iNU2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUE2QTcyQjVBNjg2MTFFMDlCRDBBQzQ4QzM2NkRCNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUE2QTcyQjZBNjg2MTFFMDlCRDBBQzQ4QzM2NkRCNDYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQTZBNzJCM0E2ODYxMUUwOUJEMEFDNDhDMzY2REI0NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQTZBNzJCNEE2ODYxMUUwOUJEMEFDNDhDMzY2REI0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvLyXh4AAAAYUExURf///6qqqvu0le/v8djf6mpqasLH0P///9Md7LsAAAAIdFJOU/////////8A3oO9WQAAADZJREFUeNpiYGdkRQLsDOyszEwMUMAM4jOywPkMYHkGVD4jGxMLDAwKeXT3o/mPGQkwsAMEGABk/wLlBi0bvAAAAABJRU5ErkJggg==',
      'groups'      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAA7ElEQVR42mL8////fwYKAMuWZb0MD26dJ0uzgpohA8uDW+cZkqOdyDJg7tJ9DEwMFAIWBgYGBnZJPTK174MYgAw2r1rNcPrYcQZTK0sG37BQBgYGBoaLZ84yPLp3j0FOSYlB38QYRT2GF04fO45CMzAwMDy6dw+FxmsAqQDDAGlZWRSagYGBgV9QEIXGa0BIXAwKzcDAwGBsaYFCY8QCegAyMDAwTGxtZzC1smSQU1KC+33ftu0YAcmELQCR+egBh85HcUHThD7KA5HklCgho8bQVddIlmYVLVMGxs+fP///9esXWQawsbExAAYAS9RLk0BrJx8AAAAASUVORK5CYII=',
      'events'      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABEUlEQVR42mL89/f/fwYKAMu6AD+GO5s3k6xRxdeXIWjDJgaWO5s3M9g6O5NswGGopSwMDAwMv3/9It8LlBrAUBkX958cUBkX9//f3///mZANu3DuJENsmAdDbJgHw4olsyEWFKczVBank+6CmFB3rGx0F7CgGxgb5sHAxyfA4O0XTFQQMKELLF61g2HqnBUMWzetJc8AWFjwCwgyXLpwhmFibxMDH78AQ3piCMOlC2ewRyOyxt6OegZ+AUEGGzsnBj0DEwY9AxPC6QAGDIzMGRav2kFaQnr28CHD3g0bSE4/zx4+hBggICzM8PfPHwZhMTGiNb999YpBQFgYYoCknBzDnI4Okl1gbGvLwMDAwAAYAKNFvfW9NNRIAAAAAElFTkSuQmCC',
      'photos'      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFRQTFRFhlUY8/PztHIg46lhoGYdomcdkVwa6b2Fwnwj46pjp2oe2o0t2o4u46he1YcmlF4bvnkiqmwetnQh6r6Hk5OTflAXnazL7+/v68KP////fX19////U3yTvAAAABx0Uk5T////////////////////////////////////ABey4tcAAABuSURBVHjaVM5ZEoAgDANQFPd9q23h/ve01EEkn29IiblcyuW9Nw45Bp0C3zEcIWsFyFoKTER2ryYiTnAAmPNM0ILE/oAGgPV9gawwG9j0RvgzANUwKhSIjvulbORo2QnIuHyHQL5UQFpfikeAAQDfnBU4ilUuIAAAAABJRU5ErkJggg==',
      'links'       : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADlQTFRFxM3g5eXlWXOo3drUXWqIaWZpQF2b8O/wh5m/7e3ttMDX2cOT1Lh2O1mY7OHJcF5Qj4Rv////////mSm1QAAAABN0Uk5T////////////////////////ALJ93AgAAABcSURBVHjadI9bDoAgDARbER9ApXL/wyqWjUTi/HWyabtUKvmFTBzAhDZShDgfNKYqSGQmE5aQEGSSLnGLZRPvv4n1f8dwpRNIOAh82man6ILPmXkvVq5jEJcAAwDJzQ7zfrx8lwAAAABJRU5ErkJggg==',
      'applications': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAE5QTFRF4OTv+LE1enp6i1gAhYyctra2+b1TXlE8MDAwRkZGmJiYf39/rKyswoopAAAAkZGR9fX17+/v68KPODg41tbW3NzciYmJ////a2tr////FPwI9wAAABp0Uk5T/////////////////////////////////wAUIgDaAAAAh0lEQVR42mSO2w6DMAxDA5Rx3QZt0yT//6OLCxoS+KXqiWOHikLFzEp9SHcR2dWBbpsC9CGEXjFnds/f4XNm95BKjFEccNUFHisGD0IftXYTpXVZVktWnW+A7ErJ1KNeTecr3xMQ4e9gynkyOIamQ4vN4zijlD4D6dHSIh0ZcoC2knKe8xNgAEYsFLCnqRP9AAAAAElFTkSuQmCC',
      'questions'   : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEX///+ysrJzTVxWcKhVgTNzTVxWcKiysrL///9zTVykpKRVgTNWcKhfd6x6VmSWps5ehz25fJPE2q0Y5MOyAAAAB3RSTlMA8vLy8gAApeUo5QAAAFBJREFUeF5lzFcOwDAIREFSqU67/2FjC6EoMJ8r7YNqsdBEZAKwMxgRYRl+F0Tslx2SmYdDOo/yPTA5rENcsPPoBsmq7oqoPk69UYfvEtHkBREOB5O/SjNzAAAAAElFTkSuQmCC',
      'places'      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACQUlEQVR42oyST0iTcRjHPxumWzjf5pq6WtO5Fc5/iYJQLUZ4STuEhwrqMDqIBF7KIAi0gxdv2aFDQUHHFgge0kOMioZK9saI8h+TiXvZnGyOrVy+yevbYTBnyuh7+fHw/H6f58vz/WlUVVUpUDqZwu+bYHrKjxQKY3XaOd/dRdf1qwgmI/9KUwhIJ1O8GnlMNhLHbrVhrBBIZdKEpTWOnqrGO3T3AERbWPh9E2QjcdobWzBWCAAYKwTaG1vIRuL4fRMHHOwDTE/5sVttADT0uLn0sI+GHjcAdquN6Sl/cYAUCucnW9pcHNGXYWlz5Z1IoXBxgLO1CUVRAIgFF9j5LRMLLgCgKArO1qYDgJLCos7lZCOWwGKuZnEywOJkIN/b2ExQ53IWd9Db7yUgznGYAuIcvf3e4gBTTRWOjmYi69F9lyLrURwdzZhqqooDAAZGhxGX5tmWZQC2ZRlxaZ6B0eFDnWlUVVXfvnnJ7IdJAHY1uySTvzBtmvF0nuPj5xlC1hBq7W7+UXfnDW5fvp9bYnbrJ8HZ99y59wDBXIss/2FDWsb35DVhKYLWomNk6BFl+lKkTAaAZ+NjXPP0Ua4X0C59F6mtdwBQpjOAso3BUM7NwVt8Wf6Gd9DLMb2RSoMh78B+wom4nEuo5MfXGRxnGnJFqZ7Kmr2onn9yo9HurenC6dypU828E8fxnL1CyWpoHrfnIgDRlcMj1GihyqYlurpDQk2R3kmxuBbMDT1efZIXT8f4X2V0W8SEBPWW3Bf/OwCb1c8dJvZ7AQAAAABJRU5ErkJggg==',
      'friendwall'  : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEX///+ysrJzTVxWcKhVgTNzTVxWcKiysrL///9zTVykpKRVgTNWcKhfd6x6VmSWps5ehz25fJPE2q0Y5MOyAAAAB3RSTlMA8vLy8gAApeUo5QAAAFBJREFUeF5lzFcOwDAIREFSqU67/2FjC6EoMJ8r7YNqsdBEZAKwMxgRYRl+F0Tslx2SmYdDOo/yPTA5rENcsPPoBsmq7oqoPk69UYfvEtHkBREOB5O/SjNzAAAAAElFTkSuQmCC',
      'changeprofile'  : 'data:image/gif;base64,R0lGODlhDwAQAPcAAP//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Zmf+ZZv+ZM/+ZAP9m//9mzP9mmf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8AZv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczMZszMM8zMAMyZ/8yZzMyZmcyZZsyZM8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswAM8wAAJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm/5lmzJlmmZlmZplmM5lmAJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZmmWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAGYA/2YAzGYAmWYAZmYAM2YAADP//zP/zDP/mTP/ZjP/MzP/ADPM/zPMzDPMmTPMZjPMMzPMADOZ/zOZzDOZmTOZZjOZMzOZADNm/zNmzDNmmTNmZjNmMzNmADMz/zMzzDMzmTMzZjMzMzMzADMA/zMAzDMAmTMAZjMAMzMAAAD//wD/zAD/mQD/ZgD/MwD/AADM/wDMzADMmQDMZgDMMwDMAACZ/wCZzACZmQCZZgCZMwCZAABm/wBmzABmmQBmZgBmMwBmAAAz/wAzzAAzmQAzZgAzMwAzAAAA/wAAzAAAmQAAZgAAMwAAAN9hYfz4+N+1tdpcXLQ3N6grK64xMa0xMa4yMqczM6o1Nac0NLY5Oao2Nqo5Oas6Oqo6OsBDQ8JFRcZISMxOTqtBQc5QUNVXV9VYWNhaWrlVVcFvb8V4eMyIiNytrd6xsd6zs+fHx+jKyunLy/Hf3/fs7Pv19f///yH5BAEAAP8ALAAAAAAPABAAAAiJAP8JHEiwoMB67drR6/evH72E9QbOUwfv3Tp0/sytewdP3bx//LphG4nNnTx3JLF146eNW8qSL7lps0fupU1y9vKBs/kSXL5s47bxHLktXLZ/9dINxZYu4r9s5+LxjHfuqEB933h+21fwnsuU3PAZ/KfNm9Bt3rSNvSqOXTl9awf2k8cwrt1/AQEAOw==',
    };


    /* whitelist */
    const whitelist = new Array(
        46, // statuses
        280 // questions
    );

    const whitelist_regex = new RegExp(whitelist.join("|"));

    /* app whitelist */
    const app_whitelist = new Array(
        87741124305, // youtube
        202423869273 // endomondo
    );

    const app_whitelist_regex = new RegExp(app_whitelist.join("|"));

    delete whitelist, app_whitelist;

    var content;


      /**
       * Local storage/greasemonkey Functions
       */

    var storage = 'localstorage';

    if (typeof GM_deleteValue === 'function') {
        storage = 'greasemonkey';
    }


    function setValue(key, value)
    {
        switch (storage) {
            case 'greasemonkey':
            GM_setValue(key, value);
            break;

            case 'localstorage':
            localStorage.setItem(key , value);
            break;
        }
        return false;
    }


    function getValue(key)
    {
        switch (storage) {
            case 'greasemonkey':
            return GM_getValue(key);
            break;

            case 'localstorage':
            var val = localStorage.getItem(key);
            if (val == 'true') { return true; }
            else if (val == 'false') { return false; }
            else if (val) { return val; }
            break;
        }
        return false;
    }


    function deleteValue(key)
    {
        switch (storage) {
            case 'greasemonkey':
            GM_deleteValue(key);
            break;

            case 'localstorage':
            localStorage.removeItem(key);
            break;
        }
        return false;
    }


    function log(text)
    {
        if (DEBUG === true && typeof GM_log === 'function' && text !== '') {
            GM_log(text);
        }
        return false;
    }


    function g(id, parent)
    {
        if (id && typeof id === 'string') {
            var p = parent||d;
            id = p.querySelectorAll(id);
        }
        return id||null;
    }


    function c(id, parent)
    {
        if(id && typeof id === 'string') {
            var p = parent||d;
            id = p.getElementsByClassName(id);
        }
        return id||null;
    }


    function checkWall()
    {
        isBox = createBox();
        if (!isBox) return false;

        /* get home stream container */
        content = d.getElementById('home_stream');

        /* get stories */
        var stories = g('li.uiListLight', content);
        stories_length = stories.length;
        if (stories_length == 0) return false;

        gm_class_length = c('gm_simplified_wall', content).length;

        if (stories && stories_length != gm_class_length) {
            editWall(stories);
        }

        delete stories, stories_length, content, gm_class_length;
        return false;
    }


    function editWall(stories)
    {
        var story, story_class, story_data, story_type, substories, icon_wrapper, icon, names_count, story_content, attach, pic, header;

        for (i = 0; i < stories.length; i++) {

            story = stories[i];
            story_class = story.className;

            if (story_class.indexOf(gm_class) >= 0) {
            	continue;
            }

            try {
              story_data = story.getAttribute('data-ft'); if(!story_data) continue;
              story_type = story_data.match(/\"s_obj\":(\d+)/)[1];
              substories = story_data.match(/\"substories\":(\d+)/);
              app_id = story_data.match(/\"app_id\":(\d+)/);
            } catch(e) { log(e); continue; }

            extra_type = sty[story_type];

            /* apps whitelist */
            if (app_whitelist_regex.test(app_id) === true) {
                extra_type = null;
            }

            /* add gm class */
            story.className += extra_type ? gm_class + ' gm_' + extra_type : gm_class;

            /* hide story */
            if (extra_type != null && extras[extra_type]['hide'] == true) {
                story.style.display = 'none';
            }

            if (
              story_class.indexOf('uiSubStream') >= 0
              || c('uiStreamPassive', story).length == 0
              || whitelist_regex.test(story_type) === true
            ) {
                continue;
            }

            story_content = c('UIImageBlock_Content', story)[0];

            /* count names in message */
            names_count  = c('passiveName', story_content).length;
            names_count += c('uiTooltip', story_content).length;

            try {
                /* get icon */
                icon = c('UIImageBlock_ICON_Image', story_content)[0];

                if (icon != null && !substories) {

                    if (attach = c('uiStreamAttachments', story)[0]) {
                        if (extra_type == 'friendships' || extra_type == 'groups' || extra_type == 'events' || extra_type == 'places') {
                            attach.parentNode.removeChild(attach);
                        } else if (names_count <= 1) {
                            continue;
                        }
                    }

                    story.className += ' simplified';

                    /* remove avatar */
                    pic = c('UIImageBlock_Image', story)[0];
                    pic.parentNode.removeChild(pic);

                    /* message */
                    header = c('uiStreamMessage', story_content)[0];
                    header.innerHTML = '<span class="icon"></span>' + header.innerHTML;

                    /* story type icon manipulation */
                    if (icon.className.indexOf('uiProfilePhoto') == -1) {
                        icon_wrapper = icon.parentNode;

                        header.firstChild.appendChild(icon);

                        /* remove time */
                        if (c('UIActionLinks_bottom', icon_wrapper)[0] == null) {
                            icon_wrapper.parentNode.removeChild(icon_wrapper);
                        }
                    }

                }
                else if (names_count > 1 || substories != null || story_type == 60) { // 60 = xy and x others changed their profile pictures

                    story.className += substories ? ' substories' : ' no-avatar';

                    /* remove avatar */
                    pic = c('UIImageBlock_Image', story)[0];
                    pic.parentNode.removeChild(pic);
                }

            } catch(e) {log(e); continue;}
        }


        /* update counter */
        for (extra_type in extras) {
            updateCounter(extra_type);
        }

        delete story, story_class, story_data, story_type, substories, icon_wrapper, icon, names_count, story_content, attach, pic, header;
        return false;
    }


    function updateCounter(extra_type)
    {
        var extra_class = 'gm_' + extra_type;

        if (count_el = d.getElementById('sx_' + extra_type + '_count')) {

            var count = c(extra_class, content).length;

            if (count > 0) {
                count_el.parentNode.style.display = 'inline';
                count_el.innerHTML = count;
            } else {
                count_el.parentNode.style.display = 'none';
            }
        }

        delete extra_class, count_el;
        return false;
    }


    function toggleExtras(extra_type)
    {
        var extra_class, els, length, display, parent;

        extra_class = 'gm_' + extra_type;

        els = c(extra_class, content);
        length = els.length - 1;

        if (length >= 0) {

            display = '';

            if (extras[extra_type]['hide'] == true) {
                display = 'none';
            }

    	    for (i = 0; i <= length; i++) {
                parent = els[i];
                parent.style.display = display;
            }
        }

        saveSettings();

        delete extra_class, els, length, display, parent;
        return false;
    }


    /**
     * Promo Box
     */

    function addEvents()
    {
        var extra_class;

        try {

            for (extra_type in extras) {
                extra_class = 'sx_' + extra_type;
                d.getElementById(extra_class).addEventListener('change', function (evt) { changeSettings(this.getAttribute('data-gm-type'), this); }, false);
            }

            /* More link event */
            document.getElementById('navMoreLink').addEventListener('click', toggleBox, false);
            document.getElementById('navLessLink').addEventListener('click', toggleBox, false);
        } catch (e) {
            log(e);
        }

        delete extra_class;
        return false;
    }


    function createBox()
    {
        if (!d.getElementById('home_stream')) return false;
        if (d.getElementById('pagelet_simplifiedwallbox')) { addEvents(); return true; }

        var col = d.getElementById('rightCol');

        var box = d.createElement('div');
            box.setAttribute('id', 'pagelet_simplifiedwallbox');

        var boxTitle = d.createElement('div');
            boxTitle.setAttribute('class', 'uiHeader uiHeaderTopAndBottomBorder mbs uiSideHeader');

        var boxTitle_HTML  = '<div class="clearfix uiHeaderTop">'
                           + '<div class="uiTextSubtitle uiHeaderActions rfloat"><a href="/nichego/">nichego</a> lishnego</div>'
                           + '<div><h4 class="uiHeaderTitle">Simplified wall</h4></div>'
                           + '</div>';

        boxTitle.innerHTML = boxTitle_HTML;
        box.appendChild(boxTitle);

        var boxContent = d.createElement('div');

        box.appendChild(boxContent);
        col.appendChild(box);

        delete col, boxTitle, boxTitle_HTML;

        var i = 1;

        var extra_class, section, section_HTML, input;

        for (extra_type in extras) {

            extra_class = 'sx_' + extra_type;

            section = d.createElement('div');
            section.setAttribute('class', 'UIImageBlock mbs phs clearfix');

            if (i > 3) {
                section.className += ' hidden';
            }

            section_HTML = ''
                         + '<img class="img UIImageBlock_Image UIImageBlock_ICON_Image" src="'+ image[extra_type] +'">'
                         + '<div class="UIImageBlock_Content UIImageBlock_ICON_Content">'
                         + '<input type="checkbox" id="'+ extra_class +'" data-gm-type="'+ extra_type +'">'
                         + '<label for="'+ extra_class +'">Hide '+ extra_type +'</label>'
                         + ' <small style="display: none;"><span id="'+ extra_class +'_count">0</span></small>'
                         + '</div>'

            section.innerHTML += section_HTML;

            boxContent.appendChild(section);

            if (extras[extra_type]['hide'] == true) {
                input = section.getElementsByTagName('input')[0];
                input.setAttribute('checked', 'true');
            }

            i++;
        }

        delete extra_class, section, section_HTML, input;

        var moreText;
        var lessText;

        var bookmarks_menu = d.getElementById('bookmarks_menu');

        // more text
        try { moreText = c('navMoreText', bookmarks_menu)[0].innerHTML; }
        catch (e) { moreText = 'More'; }

        // less link
        try { lessText = c('navLess', bookmarks_menu)[0].firstChild.innerHTML; }
        catch (e) { lessText = 'Less'; }

        var links_HTML  = '<div class="navMoreLess">'
                        + '<div class="navMore">'
                        + '<a href="#" class="" id="navMoreLink">'+ moreText +'</a>'
                        + '</div>'
                        + '<div class="navLess"><a href="#" id="navLessLink">'+ lessText +'</a></div>'
                        + '</div>';

        box.innerHTML += links_HTML;

        /* set events for checkboxes */
        addEvents();

        delete box, boxContent, moreText, lessText, links_HTML;
        return true;
    }


    function toggleBox(evt)
    {
        var els, el, display;

        var pagelet = d.getElementById('pagelet_simplifiedwallbox');

        try {
            els = c('hidden', pagelet);

            for (i=0; i<=els.length-1; i++) {
                el = els[i];
                display  = el.style.display;

                if (display == '' || display == 'none') {
                    el.style.display = 'block';
                } else {
                    el.style.display = 'none';
                }
            }

            if (display == '' || display == 'none') {
                c('navMore', pagelet)[0].style.display = 'none';
                c('navLess', pagelet)[0].style.display = 'inline-block';
            } else {
                c('navLess', pagelet)[0].style.display = 'none';
                c('navMore', pagelet)[0].style.display = 'block';
            }
        } catch(e) {
            log(e);
        }

        evt.preventDefault();

        delete pagelet, els, el, display;
        return false;
    }


      /**
       *  Settings functions
       */

    function saveSettings()
    {
        var source;

        for (extra_type in extras) {

            if (storage == 'greasemonkey') {
                source = extras[extra_type].toSource();
            } else { // chrome

                source = '({';

                for (val in extras[extra_type]) {
                    source += val + ':' + '"' + extras[extra_type][val] + '", ';
                }

                re = new RegExp('[, ]+$', 'g');
                source = source.replace(re, '');

                source += '})';
            }

            if (source.length <= 4) continue;

            setValue(extra_type, source);
        }

        delete source;
        return false;
    }

    function loadSettings()
    {
        var value;

        for (extra_type in extras) {

            value = getValue(extra_type);

            if (value) {
                extras[extra_type] = eval(value);

                if (extras[extra_type]['hide'] == 'true') {
                    extras[extra_type]['hide'] = true;
                }
            }
        }

        delete value;
        return false;
    }

    function changeSettings(extra_type, el)
    {
        extras[extra_type]['hide'] = el.checked;

        toggleExtras(extra_type);
        saveSettings();

        return false;
    }


    /**
     * CSS Styles
     */

    function addStyle(css)
    {
    	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
    	else if (head = d.getElementsByTagName('head')[0]) {
    		var style = d.createElement('style');
    		try { style.innerHTML = css; }
    		catch(x) { style.innerText = css; }
    		style.type = 'text/css';
    		head.appendChild(style);
    	}

        delete head, style, css;
        return false;
    }

    function cssStyles()
    {
        /* box */
        addStyle(
         ' #pagelet_simplifiedwallbox  { }'
        +' #pagelet_simplifiedwallbox div.UIImageBlock img.img { height: 16px; margin-top: 1px; width: 16px; }'
        +' #pagelet_simplifiedwallbox div.UIImageBlock_ICON_Content label { vertical-align: text-top; }'
        +' #pagelet_simplifiedwallbox div.UIImageBlock_ICON_Content small { background-color: #D8DFEA; color: #3B5998; font-size: 9px; font-weight: bold; float: right; line-height: 16px; padding: 0 4px; -moz-border-radius: 2px; border-radius: 2px; }'
        +' #pagelet_simplifiedwallbox input { cursor: pointer; margin: 0 5px 0 0; padding: 0px; position: relative; top: 2px; }'
        +' #pagelet_simplifiedwallbox .uiHeaderTitle small { font-size: smaller; font-weight: normal; }'
        +' #pagelet_simplifiedwallbox div.hidden { display: none; }'
        +' #pagelet_simplifiedwallbox div.navMoreLess { padding-left: 26px; }'
        );

        /* simplified messages */
        addStyle(
         ' .gm_simplified_wall.simplified {min-height:18px;padding:0px;}'
        +' .gm_simplified_wall.simplified.uiListLight {font-size:10px;padding:5px 2px;}'
        +' .gm_simplified_wall.simplified .hideSelector {margin:0;}'
        +' .gm_simplified_wall.simplified .uiStreamMessage {font-size: 11px !important;margin:0;padding-left:20px;margin-left:-20px;}'
        +' .gm_simplified_wall.simplified .uiStreamMessage i.img {margin:0 4px 0 0;vertical-align:text-top;}'
        +' .gm_simplified_wall.simplified .uiStreamMessage span.icon .img {margin:0 4px 0 0;vertical-align:text-top;}'
        +' .gm_simplified_wall.simplified .uiStreamMessage span.text_exposed_link {margin:5px 0;padding-left: 20px;}'
        +' .gm_simplified_wall.simplified form.commentable_item, .gm_simplified_wall.simplified .uiStreamSubstories {font-size:11px !important;margin-left: 20px;padding:2px 0 0;}'
        +' .gm_simplified_wall.simplified div.mvm {margin:3px 0 3px 20px;}'
        +' .gm_simplified_wall.simplified.normal-font div.mvm {margin: 10px 0 10px 20px;}'
        );

        /* messages without avatar */
        addStyle(
         ' .gm_simplified_wall.no-avatar {height:auto;min-height:18px;padding:0px;}'
        +' .gm_simplified_wall.no-avatar.uiListLight {font-size:10px;padding:5px 2px;}'
        +' .gm_simplified_wall.no-avatar .hideSelector {margin:0;}'
        +' .gm_simplified_wall.no-avatar a.UIImageBlock_MED_Image {display:none;}'
        +' .gm_simplified_wall.no-avatar .uiStreamMessage {font-size:11px !important;}'
        +' .gm_simplified_wall.no-avatar .uiStreamAttachments {display:none;}'
        +' .gm_simplified_wall.no-avatar .uiStreamSource {display:none;}'
        );

        /* substories */
        addStyle(
         ' .gm_simplified_wall.substories .uiStreamSubstories {padding-left: 15px;}'
        );


        return false;
    }

    /* Start script */
    cssStyles();
    loadSettings();
    checkWall();

    if (content = d.getElementById('content')) {
        setTimeout ( function () {
            var t;
            content.addEventListener('DOMNodeInserted', function () { clearTimeout(t); t = setTimeout(checkWall, 100); }, false);
        }, 2000);
    }

    /* AutoUpdater */
    if (typeof autoUpdate == 'function' && isBox) {
        autoUpdate (script_id, script_version);
    }

    return false;
})(document);