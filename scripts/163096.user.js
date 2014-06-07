// ==UserScript==
// @name       E-Dnevnik enhancer
// @namespace  -
// @version    0.6
// @description Set of enhancements for E-Dnevnik project
// @match      https://ocjene.skole.hr/pregled/ocjene/*
// @copyright  2013+, Nikola Bunjevac
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require    http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js
// @require    http://cdnjs.cloudflare.com/ajax/libs/Chart.js/0.2.0/Chart.min.js
// ==/UserScript==

$(document).ready(function () {
    var averages = [];
    var badMarks = 0;
    var toEscape = [];
    var lSA = (localStorage != "undefined"); //localStorageAvailable
    if (lSA && localStorage.getItem("markc") === null) {
        localStorage.markc = JSON.stringify([]);
    }
    

    // subject mark averages
	var markc = [];
    $(".grades > table:first-child").each(function (index) {
        var sum = 0;
        var count = 0;
        var content = $(this).html();
        content = content.replace(/, /g, ""); // for handling more marks in one <td>
        var matcher = new RegExp(">[1-5]+<");
        var resp = 1;
        while (resp !== null) {
            resp = matcher.exec(content);
            if (resp !== null) {
                var ind = resp.index + 1;
                while (content[ind] !== '<') { // ...more marks in one <td>
                    sum += parseInt(content[ind], 10);
                    count++;
                    ind++;
                }
                content = content.slice(ind + 1, content.length);
            }
        }
        if (count === 0 || parseFloat(sum / count).toFixed(2) === 0) {
            toEscape.push(index);
            return null; // no marks, leave it empty
        }
		markc.push(count);
        averages.push(parseFloat(sum / count).toFixed(2));
        $("tr:contains('ZAKLJUČENO')", this).after('<tr><td class="activity bold">PROSJEK</td> <td colspan="10" class="t-center bold">' + averages[averages.length - 1] + '</td></tr>');
    });

    if (averages.length === 0) return null; // no marks

    var sum = 0;
    for (var i = 0; i < averages.length; i++) {
        var m = averages[i];
        if (m - parseInt(m, 10) < 0.5) m = Math.floor(m);
        else m = Math.ceil(m);
        sum += m;
    }

    // adds averages beside profesor's names
    var mark = sum / averages.length;
    var offset = 0;
	var markcc = [];
	if (lSA) {
		markcc = JSON.parse(localStorage.markc);
	}
    $(".course").each(function (index) {
        for (var j = 0; j < toEscape.length; j++)
            if (index == toEscape[j]) {
                offset++;
                return null;
            }
        $(".course-info", this).append(', <span id="prosjek" style="color:#baf">Prosjek: ' + averages[index - offset] + '</span>');
        if (averages[index - offset] < 2.0) {
            badMarks++;
            $("#prosjek", this).append(', <span style="color:red; font-weight: bold;">Trenutno padaš ovaj predmet!</span>');
        }
        if (lSA && markcc.length === markc.length && markcc[index - offset] != markc[index - offset]) {
            $("#prosjek", this).append(', <span style="color: #afa">Nova ocjena!</span>'); //if there's a new mark, show it
        }
    });

    if (lSA) {
        localStorage.markc = JSON.stringify(markc); //save new averages for future checking
    }

    // final average mark and bad marks warning
    $(".sectionTitle").after('<div id="ukpros" style="color:#f55"><strong>Trenutni ukupni prosjek:</strong> ' + parseFloat(mark).toFixed(2) + '</div><br />');
    if (badMarks > 0) $("#ukpros").after('<div style="color:#f55"><strong>Trenutno imaš jedinica: ' + badMarks + '</strong></div>');

    $("#student-class").after('<div id="testovi" style="position: absolute; float: both; top: 10px; left: 10px; padding: 5px; width: 200px;"><br />' +
        '<table id="tt"><th>Pisane provjere <br><span style="font-size: 10px"><i>(povuci za premještanje)</i></span></th><tbody><tr id="prvi"></tr></tbody></table></div>');

    // exam table
    var curr_date = new Date();
    var dates = [];
	var subject_test_count = {};
	var subject_names = [];
    var month_test_count = {};
    var day_test_count = new Array(5);
    
    for (var i = 0; i < 5; i++)
    	day_test_count[i] = 0;

    $(".grades").each(function () {
        $(".tasks-title:contains('Raspored')", this).next().children("tbody").children("tr").each(function () {
            if (!($(this).hasClass("inactive")) && $(this).children().length > 0 && $(this).children().is("td")) {
                var date = $(this).children("td").eq(0).html();
                var test = $(this).children("td").eq(1).html();
                var subject = $(this).parents().eq(3).prev().attr("id");
                var date_obj = new Date(date.slice(6, 10), date.slice(3, 5) - 1, date.slice(0, 2));
                var css = "";
                if (Math.round((date_obj - curr_date) / 1000 / 60 / 60 / 24) <= 7) css = "background-color: #fbb;";
                else css = "background-color: #ddf;";
                dates.push([date_obj, '<tr style="' + css + '"><td class="datum" style="background-color: #ddf">' + date +
                    '</td><td style="background-color: #ddd">' + test + '</td><td>' + subject + "</td></tr>"]);
            } 
			if ($(this).children().length > 0 && $(this).children().is("td")) {
				var date = $(this).children("td").eq(0).html();
                var test = $(this).children("td").eq(1).html();
                var subject = $(this).parents().eq(3).prev().attr("id");
                var month = parseInt(date.slice(3, 5));
				if (subject_names.indexOf(subject) < 0)
					subject_names.push(subject);
				if (subject_test_count[subject] == undefined)
					subject_test_count[subject] = 1;
				else 
					subject_test_count[subject]++;
                
                if (month_test_count[month] == undefined)
                    month_test_count[month] = 0;
                else 
                    month_test_count[month]++;
                
                var date_obj = new Date(date.slice(6, 10), date.slice(3, 5) - 1, date.slice(0, 2));
                
                day_test_count[date_obj.getDay() - 1]++;
			}
        });
    });

    // date sorting
    var sort_asc = function (d1, d2) {
        if (d1[0] > d2[0]) return 1;
        return -1;
    };

    dates.sort(sort_asc);

    for (i = 0; i < dates.length; i++) {
        $("#prvi").append(dates[i][1]);
    }

    $("#testovi").draggable();
	
	/////////////////////////charts
	$("#courses").append("<hr>");
	
	var addCanvas = function(name, chart_name) {
		if (chart_name == undefined) chart_name = "";
		$("#courses").append('<h2>' + chart_name + '</h2></br><canvas id="' + name + '" width="600" height="400"></canvas>')
		return "#" + name;
	};
	
	var sc = [];
	for (var i = 0; i < subject_names.length; i++)
		sc.push(subject_test_count[subject_names[i]]);
	
	var tests_data = {
		labels : subject_names,
		datasets : [
			{
				fillColor : "rgba(220,120,120,1)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : sc
			}
		]
	};

	var ctx = $(addCanvas("subjects", "Broj testova po predmetima")).get(0).getContext("2d");
    var c = new Chart(ctx).Bar(tests_data, {scaleOverride : true, scaleSteps : 12,scaleStepWidth : 1,scaleStartValue : 0});
    
    var tc = [];
    var months = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
    
    for (var i = 0; i < months.length; i++) {
        tc.push(month_test_count[months[i]]);
    	if (tc[i] == undefined) tc[i] = 0;
    }
    
    
    var months_data = {
		labels : ["Rujan", "Listopad", "Studeni", "Prosinac", "Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj"],
		datasets : [
			{
				fillColor : "rgba(100,100, 250,1)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,100,220,1)",
				pointStrokeColor : "#fff",
				data : tc
			}
		]
	};
    
	var ctx = $(addCanvas("months", "Broj testova po mjesecima")).get(0).getContext("2d");
    var c = new Chart(ctx).Line(months_data, {scaleOverride : true, scaleSteps : 12,scaleStepWidth : 1,scaleStartValue : 0});
    
    var days_data = {
		labels : ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],
		datasets : [
			{
				fillColor : "rgba(100,220, 100,1)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,100,220,1)",
				pointStrokeColor : "#fff",
				data : day_test_count
			}
		]
	};
    
	var ctx = $(addCanvas("days", "Broj testova po danima u tjednu")).get(0).getContext("2d");
    var c = new Chart(ctx).Bar(days_data, {scaleOverride : true, scaleSteps : 12,scaleStepWidth : 1,scaleStartValue : 0});
});