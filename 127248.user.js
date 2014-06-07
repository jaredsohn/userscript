// ==UserScript==
// @name           Goldberg Graph Theory Grades
// @namespace      http://userscripts.org/users/cxira
// @include        http://www.cs.rpi.edu/~goldberg/12-GT/*
// @match          http://www.cs.rpi.edu/~goldberg/12-GT/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(function(){
    if ($("tr>td:first").text().indexOf("Your code") == -1)
        return;

    var round_hundreds = function(n) {
        return Math.round(n * 100) / 100;
    };

    var tip = $.extend(
        $("<div>")
            .addClass('tip')
            .css({
                maxWidth: '300px',
                position: 'absolute',
                backgroundColor: '#5DACEC',
                padding: '3px 8px',
                border: '1px solid black',
            })
            .append($("<h3>").addClass('header').css('margin', '5px 0'))
            .append($("<p>").addClass('contents').css('font-size', '14px'))
            .hide()
        , {
            format: function(obj){
                $(this).show().find(".contents").text("");
                for (var i in obj) {
                    if (i == "_header_") {
                        $(this).find(".header").text(obj[i])
                    } else { 
                        $(this).find(".contents").html(
                            $(this).find(".contents").html() + "<b>"+i+"</b>: "+obj[i]+"<br>"
                        );
                    }
                }
            },
            hide: function(){
                $(this).hide();
            }, 
        }
    );
    $("body").append(tip).mousemove(function(e) {
        if (tip.is(":visible")) {
            tip.css({
                left: e.pageX + 5,
                top: e.pageY + 10,
            });
        }
    });

    var cache = [];
    var get_test_data = function(index){
        // Get stats
        var scores = [];
        $("tbody>tr").each(function(){
            var grade = parseFloat($(this).find("td").eq(index).text().trim());
            if (grade)
                scores.push(grade);
        });

        var header = $("tbody>tr:first>td").eq(index);
        var sum = scores.reduce(function(a,b){ return a+b; }, 0);
        var total = scores.length;
        var average = total > 0 ? sum / total : "";
        return {
            type: header.text().indexOf("Q") != -1 ? "Quiz" : (header.text().indexOf("1") != -1 ? "Test1" : "Test2"),
            num: parseFloat(header.text().match(/\d+/)),
            sum: sum,
            total: total,
            average: average,
            stddev: total > 0 ? Math.sqrt(scores.reduce(function(a,b){ return a+Math.pow(b-average, 2); }, 0) / total) : "",
            scores: scores,
        };
    };

    // 1. Append info about individual person
    var bounding_index;
    $("tbody>tr:first>td").each(function(){
        if ($(this).text().indexOf("Score") != -1) {
            // Found score cell, begin modifying
            $(this).text("Score");
            $(this)
                .after($("<td>").text("Percentile").css('background-color', 'white'))
                .after($("<td>").text("Rank").css('background-color', 'white'));
            bounding_index = $(this)[0].cellIndex;

            var col_score = []; // Quiz(3) or Test(30)
            var cur_score = [];

            // Add max scores for everyone
            $("tbody>tr:not(:first)").each(function(){
                var cur = 0, max_points = 0;
                $(this).find("td:not(:first)").each(function(){
                    if ($(this)[0].cellIndex == bounding_index) {
                        // Place our result and mark for later
                        var score = round_hundreds(100.0 * cur / max_points);
                        if (!(score >= 0))
                            return;
                        cur_score.push(score);
                        $(this)
                            .addClass('score')
                            .text(score + "%")
                            .data('max-score', round_hundreds(100.0 - (max_points - cur)) + '%');
                        return false;
                    }

                    // Sum result
                    var grade = parseFloat($(this).text());
                    if (grade >= 0) {
                        var col = $(this)[0].cellIndex
                        if (col_score[col] == undefined) {
                            // No need to scan the whole column, so do a quick get-type
                            var text = $("tbody>tr:first>td").eq(col).text();
                            col_score[col] = (text.indexOf("Q") != -1) ? 3 : (text.indexOf("1") != -1 ? 30 : 40);
                        }

                        cur += grade;
                        max_points += col_score[col];
                    }
                });
            });

            // Add rank/percentiles for everyone
            $("td.score").each(function(){
                var grade = parseFloat($(this).text());
                var rank_inv = cur_score.reduce(function(a,b){ return a + (b < grade ? 1 : 0); }, 0);
                var percentile = 100.0 * rank_inv / cur_score.length;
                $(this)
                    .after($("<td>").text(Math.round(percentile)))
                    .after($("<td>").text(cur_score.length - rank_inv + 1 - cur_score.filter(function(i){ return i == grade; }).length));
            });

            return false;
        }
    });

    // 2. Append row for quiz/test summaries
    var stddev_row, avg_row;
    $("tbody>tr:first")
        .after($("<tr>").append($("<td>").attr("colspan", $("tbody>tr:first")[0].cells.length)))
        .after(stddev_row = $("<tr>").append($("<td>").text("Std Dev")))
        .after(avg_row    = $("<tr>").append($("<td>").text("Average")));
    $("tbody>tr:first>td").each(function(){
        // Check if valid header node
        if ($(this).text().trim().match(/[QT].*\d/)) {
            var index = $(this)[0].cellIndex;
            cache[index] = get_test_data(index);

            // Output
            if (cache[index].average > 0) {
                stddev_row.append($("<td>").text(round_hundreds(cache[index].stddev)));
                avg_row.append($("<td>").text(round_hundreds(cache[index].average)));
            }
        }
    });

    var pin_row = function(row) {
        // Remove css
        $("tr.pinned").css('background-color', '').removeClass('pinned');
        $("tr:eq(3)").after(
            row.addClass('pinned').css('background-color', 'rgba(0, 0, 0, 0.3)')
        );
    };

    // 3. Check cookie for pin
    var code = localStorage.getItem('pin');
    if (code != null){
        // Find our name
        $("tbody>tr:gt(3)>td:first-child").each(function(){
            var this_code = $(this).text().trim();
            if (this_code == code) {
                // Pin it
                pin_row($(this).parent());
                return false;
            }
        });
    }

    // 3. Click on your name to pin
    $("body>*:first-child").before($("<p>").text("Click on a code to pin it."));
    $("tbody>tr:gt(3)>td:first-child").each(function(){
        var code = $(this).text();
        $(this).text("").append(
            $("<a>")
                .text(code)
                .attr('href', 'javascript:;')
                .click(function(){
                    localStorage.setItem('pin', $(this).text().trim());
                    pin_row($(this).parent().parent());
                })
        );
    });

    // 4. Show info on individual test hover
    $("tbody>tr:gt(3)>td:not(:first-child)").css('cursor', 'pointer').mouseover(function(){
        // Check if valid cell
        if (parseFloat($(this).text()) >= 0.0 && $(this)[0].cellIndex < bounding_index) {
            var index = $(this)[0].cellIndex;
            var entry = cache[index];

            // Output
            var grade = parseFloat($(this).text());
            var rank_inv = entry.scores.reduce(function(a,b){ return a + (b < grade ? 1 : 0); }, 0);
            tip.format({
                "_header_": entry.type + " " + entry.num,
                "Grade": round_hundreds(100.0 * grade / (entry.type == "Quiz" ? 3 : (entry.type == "Test1" ? 30 : 40))) + "%",
                // "Average Grade": entry.average,
                "Difference from Average": (grade > entry.average ? '+' : '') + round_hundreds(grade - entry.average),
                "Number of StdDevs": round_hundreds(Math.abs((grade - entry.average) / entry.stddev)),
                "Rank": entry.total - rank_inv + 1 - entry.scores.filter(function(i){ return i == grade }).length,
                "Percentile": Math.round(100.0 * rank_inv / entry.total),
            });
        } else if ($(this)[0].cellIndex == bounding_index) {
            // Show best possible grade
            tip.format({
                "_header_": "Grade Statistics",
                "Maximum Grade": $(this).data('max-score'),
            });
        }
    }).mouseout(function(){
        tip.hide();
    });

    // 5. Highlight rows
    $("tr:gt(3)").mouseover(function(){
        if (!$(this).is(".pinned"))
            $(this).css('background-color', 'rgba(255, 255, 255, 0.3)');
    }).mouseout(function(){
        if (!$(this).is(".pinned"))
            $(this).css('background-color', '');
    });

    // Display our numbers like he does
    $("tbody>tr:not(:first)>td:not(:first-child)").css("text-align", "right");
});
