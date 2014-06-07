// ==UserScript==
// @name Улучшения для rutor.org
// @description 
// - Добавляет сортировку по размеру и сидам на странице результатов поиска. Для сортировки кликай по заголовку столбца в таблице результатов.
// - Добавляет возможность голосового ввода в поле поиска (для Chrome)
// - Устанавливает курсор в поле поиска при загрузке страницы
// @author lenikita
// @license MIT
// @version 1.1
// @include http://rutor.org/*
// ==/UserScript==

/*
    Partly code is borrowed from "Stupid jQuery Table Sort" plugin:
    https://github.com/joequery/Stupid-Table-Plugin
*/
 
// wrap the script in a closure (opera, ie)
// do not spoil the global scope
// The script can be transformed into a bookmarklet easily :)
(function(window, undefined ) {
 
    // normalized window
    var w;
    if (unsafeWindow != "undefined"){
            w = unsafeWindow
    } else {
            w = window;    
    }

    // do not run in frames
    if (w.self != w.top){
        return;
    }

    // additional url check.
    // Google Chrome do not treat @match as intended sometimes.
    if (!/http:\/\/rutor.org/.test(w.location.href))
        return;

    // a function that loads jQuery and calls a callback function when jQuery has finished loading
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
     
    // the guts of this userscript
    function main() {

        var sortFns = {
            peers: function(a, b) {
                a = a.find('.green').text().replace(/\D/g, '');
                b = b.find('.green').text().replace(/\D/g, '');
                return parseInt(a, 10) - parseInt(b, 10);
            },
            size: function(a, b) {
                var map = {
                    'KB': 1000,
                    'MB': 1000000,
                    'GB': 1000000000,
                    'TB': 1000000000000
                };
                var regexp = /^([0-9.]+)\s*(.*?)$/,
                    m1 = regexp.exec(a.text()),
                    m2 = regexp.exec(b.text());
                if (m1 === null || m2 === null) return 0;
                return parseFloat(m1[1]) * map[m1[2]] - parseFloat(m2[1]) * map[m2[2]];
            }
        };                

        // Return the resulting indexes of a sort so we can apply
        // this result elsewhere. This returns an array of index numbers.
        // return[0] = x means "arr's 0th element is now at x"
        var sort_map = function(arr, sort_function, reverse_column) {
            var map = [];
            var index = 0;
            if (reverse_column) {
                for (var i = arr.length-1; i >= 0; i--) {
                    map.push(i);
                }
            }
            else {
                var sorted = arr.slice(0).sort(sort_function);
                for (var i=0; i<arr.length; i++) {
                    index = jQ.inArray(arr[i], sorted);

                    // If this index is already in the map, look for the next index.
                    // This handles the case of duplicate entries.
                    while (jQ.inArray(index, map) != -1) {
                        index++;
                    }
                    map.push(index);
                }
            }
            return map;
        };

        // Apply a sort map to the array.
        var apply_sort_map = function(arr, map) {
            var clone = arr.slice(0),
                newIndex = 0;
            for (var i=0; i<map.length; i++) {
                newIndex = map[i];
                clone[newIndex] = arr[i];
            }
            return clone;
        };

        jQ('table[width="100%"]').each(function(){

            var $table = jQ(this);
            if ($table.find('tr.backgr').length == 0)
                return true; // continue to next elm

            var html = '<thead>'
                +'<tr class="backgr">'
                    +$table.find('tr.backgr').html().replace(/(<\/?)td/g, '$1th')
                +'</tr>'
            +'</thead>';
            //$table.find('tr').wrapAll('tbody');
            jQ(html).insertBefore($table.find('tbody'));
            $table.find('tbody .backgr').remove();
            $table.find('th').css({
                cursor: 'pointer',
                'font-size': 12,
                'white-space':'nowrap',
                'padding-top': 5,
                'padding-bottom': 0              
            });
            //return;

            $table.on('click', 'th', function(){
                var trs = $table.children("tbody").children("tr");
                var $this = $(this);
                var th_index = 0;
                var dir = {ASC: "asc", DESC: "desc"};

                $table.find("th").slice(0, $this.index()).each(function() {
                    var cols = $(this).attr("colspan") || 1;
                    th_index += parseInt(cols,10);
                });   

                // Determine (and/or reverse) sorting direction, default `asc`
                var sort_dir = $this.data("sort-dir") === dir.ASC ? dir.DESC : dir.ASC;

                var type = null;
                switch (th_index) {
                    case 3:
                        type = 'size';
                        break;
                    case 4:
                        type = 'peers';
                        break;
                }

                // Prevent sorting if no type defined
                if (type === null) {
                    return;
                }     

                // Run sorting asynchronously on a timout to force browser redraw after
                // `beforetablesort` callback. Also avoids locking up the browser too much.
                setTimeout(function() {
                    // Gather the elements for this column
                    var column = [];
                    var col_debug = [];
                    var sortMethod = sortFns[type];

                    trs.each(function(index,tr) {
                        // 2nd column may have 'colspan' attr
                        var idx = $(tr).children().eq(1).attr('colspan') == '2' ? th_index - 1 : th_index;
                        var $e = $(tr).children().eq(idx);
                        column.push($e);
                        col_debug.push($e.text())
                    });

                    // Create the sort map. This column having a sort-dir implies it was
                    // the last column sorted. As long as no data-sort-desc is specified,
                    // we're free to just reverse the column.
                    var reverse_column = !!$this.data("sort-dir") && !$this.data("sort-desc");
                    //reverse_column = false;
                    var theMap = sort_map(column, sortMethod, reverse_column);

                    // Reset siblings
                    $table.find("th")
                        .data("sort-dir", null) // <--- this does not work by some reason, so we update by using each()
                        .removeClass("sorting-desc sorting-asc");
                    $table.find("th").each(function(idx,elm){
                        $(this).data('sort-dir', null)
                    });
                    $this.data("sort-dir", sort_dir).addClass("sorting-"+sort_dir);
                    //
                    $table.find("th .sort-indicator").empty();
                    if ($this.find('span.sort-indicator').length == 0)
                        $this.append(' <span class="sort-indicator"></span>')
                    $this.find('span.sort-indicator').html((sort_dir == 'asc' ? '&uarr;' : '&darr;'));

                    // Replace the content of tbody with the sortedTRs. Strangely (and
                    // conveniently!) enough, .append accomplishes this for us.
                    var sortedTRs = $(apply_sort_map(trs, theMap));
                    $table.children("tbody").append(sortedTRs);
                }, 10);
                
            });
        });

        // add google speech recognition into search input
        $('#in').attr('x-webkit-speech', '').trigger('focus');
        
    }
     
    // load jQuery and execute the main function
    addJQuery(main);


})(window);