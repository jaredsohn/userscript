// ==UserScript==
// @name        EditFL
// @namespace   farmEasy
// @require 	http://code.jquery.com/jquery-1.10.2.min.js
// @include     http://tx3.travian.com.*/build.php?tt=99&id=39
//@include     http://tx3.travian.*/build.php?tt=99&id=39
// @version     1
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);


////////////////////////////*change troops*/////////////////////////////
$("body").on("click", ".troops", function() {
	var par = $(this).parent();
	var current = $(this);
	var currentHtml = $(this).html();
	if (current.find("textarea").length == 0) {
		
		var ta = $("<textarea></textarea>");
		ta.attr("id", "ta" + par.find("input").attr("id"));
		ta.attr("class", "taclass");
		ta.css({
			width : 73,
			height : 22
		});

		$(this).append(ta);
		var addButton = $("<a href='javascript:void(0)'>update</a>");
		$(this).append(addButton);
		addButton.on("click", function() {
			var trda = new Array();
			var villa = new Array();
			var i = 0;
			var temp = $(".taclass");
			var pars = $(this).parents();
			var slotList = pars.find(".listEntry");
			var slotLid = parseInt(slotList.attr("id").substring(4));
			temp.each(function() {
				var i = 0;
				var j = 0;
				var slotDiv = parseInt($(this).closest("tr").find("input:checkbox").attr("id").substring(4));
				var newTroops = parseInt($(this).val());
				trda.push(newTroops);
				villa.push($(this).closest("tr").find(".village label").text());
				$.ajax({
					type : "GET",
					url : 'http://tx3.travian.com.br/build.php',
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
					data : {
						gid : "16",
						tt : "99",
						action : "showSlot",
						eid : slotDiv,
						sort : "distance",
						direction : "asc"
					}
				}).done(function(ret) {
					var retfl = $($.parseHTML(ret));
					var a = retfl.find("input[name='a']").val();
					var tid = retfl.find('#target_id option:contains(' + villa[j] + ')').val();
					var xcoord = retfl.find('#xCoordInput').val();
					var ycoord = retfl.find('#yCoordInput').val();
					$.ajax({
						type : "POST",
						url : "http://tx3.travian.com.br/build.php?gid=16&tt=99",
						data : {
							a : retfl.find("input[name='a']").val(),
							action : "addSlot",
							direction : "asc",
							eid : slotDiv,
							lid : slotLid,
							lid : slotLid,
							save : "salvar",
							sort : "distance",
							t1 : "0",
							t10 : "0",
							t2 : "0",
							t3 : "0",
							t5 : trda[j],
							t6 : "0",
							t7 : "0",
							t8 : "0",
							t9 : "0",
							target_id : tid,
							x : xcoord,
							y : ycoord
						}
					}).done(function() {
						current.html(currentHtml);
						current.find('span').text(newTroops);
					});
					j++;
				});
				i++;
			});
		});
	}
});


