// ==UserScript==
// @name           GPS Visualizer KML KPX converter
// @description    Original script written by James Peek, adapted by Nathanael Boehm
// @namespace      purecaffeine
// @include        http://www.gpsvisualizer.com/convert*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$().ready(function () {
	$("input[name=convert_format][value=gpx]").attr("checked","checked");
	$("#force_type").val("w");
	$("select[name=add_elevation]").val("auto");
	$("#data_input").focus(function () {
		$("#data_input").select();
	});
	$("#data_input").change(function () {
		var output = "";
		output += $("#data_input").val();
		if (output.length>0) {
			output = output.replace(/,0 /g, "\n");
			output = output.replace(",0", "");
			output = output.split("\n");
			for (var i=0; i<output.length; i++) {
				output[i] = "WP" + (i+1<10 ? "0" : "") + (i+1) + ",Waypoint," + output[i];
			};
			output = output.join("\n");
			output = "name,desc,longitude,latitude\n" + output;
			$("#data_input").val(output);
		}
	});
});