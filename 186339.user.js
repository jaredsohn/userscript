// ==UserScript==
// @name            Berichtenmover
// @author          Aus
// @version         2.00
// @description     Berichten makkelijk verschuiven
// @include         http://*.tribalwars.nl/game.php*screen=report*
// ==/UserScript==
(function (f) {
	var d = document,
		s = d.createElement('script');
	s.textContent = '$(document).ready(' + f.toString() + ')';
	(d.body || d.head || d.documentElement).appendChild(s);
})(function () {

	if (game_data.screen == "report") {



		var groupselect = $('<input type="button" id="groupselect" value="Groep opslaan"/>');


		var elem1 = $("input[name*='from']").closest("table").clone();
		var elem2 = $("input[name*='page_size']").closest("form").clone();
		var elem3 = $("#select_all").closest("th").html()

		$("#report_list").before(elem1, elem2);

		$("#report_list tr th:contains('Onderwerp')").prepend(elem3 + " - ");
		//  groupselect.insertAfter('#report_list');
		$('.report_filter:last').after(groupselect);




		var groep = $("select[name='group_id'] option:selected").val();

		if (!localStorage["Groepkiezer"]) {
			localStorage["Groepkiezer"] = groep;
		};

		$("select[name='group_id']").change(function () {
			groep = $(this).val();
		})

		$('#groupselect').click(function () {
			localStorage["Groepkiezer"] = groep;
		});


		groep = localStorage["Groepkiezer"];
		$('select option[value="' + groep + '"]').prop('selected', true)

		// 

		$("#report_list input:checkbox").prop("checked", true);


	}

});