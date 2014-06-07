// ==UserScript==
// @name           eRepublik - Donate Autofill
// @match          http://www.erepublik.com/*/economy/donate-items/*
// @version        1.1
// @encoding       UTF-8
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
    script.addEventListener('load', function() {
        var script = document.createElement('script');
        script.textContent = 'window.jQ=jQuery.noConflict(true);(' + callback.toString() + ')();';
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
    if (window.location.hash) {
        var hash = window.location.hash;
        // #i2q5a10.auto
        var pattern = /^#i([0-9]+)q([0-9]+)a([0-9]+)(\.auto)?$/;
        var result = hash.match(pattern);
        if (result !== null) {
            var industry = result[1],
                quality = result[2],
                amount = result[3],
                auto = result[4] !== undefined,
                input = jQ(document).find('input[industry="' + industry + '"][quality="' + quality + '"]');

            if (input.length === 1) {
                var id = input[0].id.replace('item_', '')
                jQ('#donate_item_' + id).val(amount);
                jQ('#buttonDonateItem_' + id).css('background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAgCAMAAACYXf7xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTQ5Q0FDMUM2NDAyMTFFMjhEQjk4REFCNDg2MzdERDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTQ5Q0FDMUQ2NDAyMTFFMjhEQjk4REFCNDg2MzdERDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NDlDQUMxQTY0MDIxMUUyOERCOThEQUI0ODYzN0REMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NDlDQUMxQjY0MDIxMUUyOERCOThEQUI0ODYzN0REMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiFvh7MAAAAzUExURf9JSZIAAJQAAJYAALYAALoAANwAAN4AAOIAAOQAAPIAAP8jI/8lJf8zM/83N/85Of87O/TxnX0AAAABdFJOUwBA5thmAAAAYklEQVRIx+3WSw6AMAhF0Yf2Y62l7H+1Th3rHZm+BZwQCAFJ079lhiQ5ECkIJpBi3Bfzf2YMhCllEIzZwTDWGGZvCGPbiTBWESZ3gskX0ZvUgUmlh7I2fDHvGOj4Qq8A85jcSNN4FwS8C6UAAAAASUVORK5CYII=)').css('color', 'white');
                if (auto === true) {
                    jQ('#buttonDonateItem_' + id).trigger('click');
                }
            }
        }
    }
}

addJQuery(main);
