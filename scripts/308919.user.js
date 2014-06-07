// ==UserScript==
// @name       Calculate tire wear
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  Calculate tire wear
// @match      http://motorsportmanager.de/*
// @match      http://www.motorsportmanager.de/*
// @copyright  2014, Napanee
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function(){
	var self,
		tires = { "soft": "Trocken", "hard": "Hart", "intermediate": "Intermediate", "wet": "Nass" },
		fields = [
			{ fieldText: "Reifenzustand: ", fieldClass: "rounds-wear tmiddle", fieldData: 0 },
			{ fieldText: "minimaler Zustand: ", fieldClass: "limit-wear tmiddle", fieldData: 0 },
			{ fieldText: "max. Runden: ", fieldClass: "calculate-rounds tmiddle", fieldData: 0 },
			{ fieldText: "Zustand: ", fieldClass: "calculate-wear tmiddle", fieldData: 0 }
		],
		roundOptions = { fieldText: "Runden: ", fieldClass: "", fieldData: [1, 2, 5, 10] };

	window.TireWear = function(){
		this.initialize.apply(this, arguments);
	};

	$.extend(window.TireWear.prototype, {

		initialize: function(options){
			var activeNavi = $("#menu .markedMenu td").last().text();
			self = this;
			if(activeNavi === "Rennstrecke"){
				self.createCalculateButton();
			}
			self.createCalculatorBox();
			self.bindEvents();
		},

		bindEvents: function(){
			var body = $("body");
			body.on("click", "#tire-wear-button", self.onOpenCalculator);
			body.on("click", ".closeCalculator", self.onCloseCalculator);
			body.on("keyup", ".rounds-wear, .limit-wear", self.calculateRounds);
			body.on("change", "#wearCalculator select", self.calculateRounds);

			$('#content').bind("DOMSubtreeModified", self.onChangeContent);
		},

		calculateRounds: function(){
			var parentTable = $(this).parents("table"),
				roundsWear = parentTable.find(".rounds-wear").val(),
				limitWear = parentTable.find(".limit-wear").val(),
				calculatedRounds = 0,
				calculateWear = 0,
				calculateBase = parseInt(parentTable.find("select option:selected").val());
			if(roundsWear > 0 && limitWear > 0 && calculateBase > 0){
				for (var i = 1; i <= 50; i++) {
					calculateWear = 100 - ((100-roundsWear)/(calculateBase+1)) * i;
					if(calculateWear >= limitWear){
						calculatedRounds = i;
					} else {
						parentTable.find(".calculate-rounds").val(calculatedRounds);
						parentTable.find(".calculate-wear").val((100 - ((100-roundsWear)/(calculateBase+1)) * (i-1)).toFixed(3));
						return;
					}
				}
			}

		},

		onChangeContent: function(){
			var activeNavi = $("#menu .markedMenu td").last().text();
			if($("#tire-wear-button").length === 0 && activeNavi === "Rennstrecke"){
				self.createCalculateButton();
			}
		},

		onOpenCalculator: function(event){
			event.preventDefault();
			$("#wearCalculator").show();
		},

		onCloseCalculator: function(event){
			event.preventDefault();
			$(this).parents("div").hide();
		},

		createCalculateButton: function(){
			var li = $("<li />"),
				p = $("<p />");
			li.attr("id", "tire-wear-button").addClass("right link");
			p.text("Reifenverschleiß");
			li.append(p);
			$("#submenu").css("padding-right", "40px").append(li);
		},

		createCalculatorBox: function(){
			var wrapper = $("<div />"),
				tireBox,
				head,
				content,
				table,
				renderedTableRow,
				close = $("<span />");

			close.addClass("button tmiddle mbBig right closeCalculator").text("X");

			wrapper.attr("id", "wearCalculator")
			.css({
				display: "none",
				background: "url('/gfx/interface/content.jpg')",
				borderRadius: "5px",
				border: "1px solid #292929",
				color: "#000000",
				paddingBottom: "10px",
				boxShadow: "0 0 25px black",
				width: "66%",
				position: "fixed",
				left: "17%",
				top: "5px",
				padding: "10px"
			});
			wrapper.append(close);

			$.each(tires, function( key, value ) {
				head = $("<div />");
				head.addClass("contentHead").css("clear", "both").text(value);

				table = $("<table />");
				table.addClass("tleft").css({
					width: "100%"
				});

				renderedTableRow = self.createTableRow(roundOptions, "select");
				table.append(renderedTableRow);

				$.each(fields, function( index, field ) {
					renderedTableRow = self.createTableRow(field, "input");
					table.append(renderedTableRow);
				});

				content = $("<div />");
				content.addClass("contentRow whiteGradient").append(table);

				tireBox = $("<div />");
				tireBox.addClass("contentSlot paddedQuarter left").append(head, content);
				if(key === "soft"){
					tireBox.css("clear", "both");
				}

				wrapper.append(tireBox);
			});

			$("body").append(wrapper);
		},

		createTableRow: function(field, type){
			var tr = $("<tr />"),
				label,
				data;
			label = self.createTableData("mlMiddle", field.fieldText, "label");
			tr.append(label);
			data = self.createTableData(field.fieldClass, field.fieldData, type);
			tr.append(data);
			return tr;
		},

		createTableData: function(elementClass, elementData, type){
			var td = $("<td />"),
				element;
			switch(type){
				case "label":
				element = self.createLabel(elementClass, elementData);
				break;
				case "input":
				element = self.createInput(elementClass, elementData);
				break;
				case "select":
				element = self.createSelect(elementClass, elementData);
				break;
			}
			td.append(element);
			return td;
		},

		createLabel: function(labelClass, labelText){
			var label = $("<span />");
			label.addClass(labelClass).text(labelText);
			return label;
		},

		createInput: function(inputClass, inputData){
			var input = $("<input />");
			input.attr("class", inputClass).attr("size", 4).val(inputData);
			return input;
		},

		createSelect: function(selectClass, options){
			var select = $("<select />"),
				option = $("<option />");
			option.val("").text(" - ");
			select.append(option);
			$.each(options, function( index, round ) {
				option = $("<option />");
				option.val(round).text(round);
				select.append(option);
			});
			return select;
		}
	});
})();

$(function(){
	new window.TireWear();
});