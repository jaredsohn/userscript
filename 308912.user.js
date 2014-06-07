// ==UserScript==
// @name       Calculate gasoline consumption
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  Calculate gasoline consumption
// @match      http://motorsportmanager.de/*
// @match      http://www.motorsportmanager.de/*
// @copyright  2014, Napanee
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function(){
	var self,
		calculatedConsumption;
	
	window.Gasoline = function(){
		this.initialize.apply(this, arguments);
	};
	
	$.extend(window.Gasoline.prototype, {
		
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
			body.on("click", "#gasoline-button", self.onOpenCalculator);
			body.on("click", ".closeCalculator", self.onCloseCalculator);			
			body.on("click", "#add-fuel-driver-one", {driver: 1},  self.addFuel);
			body.on("click", "#add-fuel-driver-two", {driver: 2},  self.addFuel);
			body.on("click", "#add-fuel-driver-three", {driver: 3},  self.addFuel);
			body.on("keyup", "#round-count, #round-consumption", self.calculateConsumption);

			$('#content').bind("DOMSubtreeModified", self.onChangeContent);
		},
		
		addFuel: function(event){
			if($("#fuel" + event.data.driver).length === 1){
				$("#fuel" + event.data.driver).val(calculatedConsumption);
				$("#carSubmit").click();
			}
		},
		
		calculateConsumption: function(){
			var roundCount = $("#round-count").val(),
				roundConsumption = $("#round-consumption").val();
			if(roundCount > 1 && roundConsumption > 1){
				calculatedConsumption = (roundCount * roundConsumption + 0.15).toFixed(3);
				$("#calculate-consumption").val(calculatedConsumption);
			}
		},
		
		onChangeContent: function(){
			var activeNavi = $("#menu .markedMenu td").last().text();
			if($("#gasoline-button").length === 0 && activeNavi === "Rennstrecke"){
				self.createCalculateButton();
			}
		},
		
		onOpenCalculator: function(event){
			event.preventDefault();
			$("#calculator").show();
		},
		
		onCloseCalculator: function(event){
			event.preventDefault();
			$(this).parents("div").hide();
		},
		
		createCalculateButton: function(){
			var li = $("<li />"),
				p = $("<p />");
			li.attr("id", "gasoline-button").addClass("right link");
			p.text("Benzinverbrauch");
			li.append(p);
			$("#submenu").css("padding-right", "40px").append(li);
		},
		
		createCalculatorBox: function(){
			var wrapper = $("<div />"),
				head = $("<div />"),
				content = $("<div />"),
				table = $("<table />"),
				tr,
				td,
				labelRoundConsumption = $("<span />"),
				inputRoundConsumption = $("<input />"),
				labelCalculatedConsumption = $("<span />"),
				inputCalculatedConsumption = $("<input />"),
				labelRoundCount = $("<span />"),
				inputRoundCount = $("<input />"),
				addFuelDriverOne = $("<span />"),
				addFuelDriverTwo = $("<span />"),
				addFuelDriverThree = $("<span />"),
				close = $("<span />");
			
			head.addClass("contentHead mtBig").css("clear", "both").text("Tankrechner");

			table.css({
				width: "100%"
			});

			labelRoundCount.addClass("mlMiddle").text("Rundenanzahl: ");
			inputRoundCount.attr("id", "round-count").attr("size", 4).addClass("tmiddle mtBig").val(0);
			labelRoundConsumption.addClass("mlMiddle").text("Verbrauch pro Runde: ");
			inputRoundConsumption.attr("id", "round-consumption").attr("size", 4).addClass("tmiddle mtBig").val(0);
			labelCalculatedConsumption.addClass("mlMiddle").text("Gesamtverbauch: ");
			inputCalculatedConsumption.attr("id", "calculate-consumption").attr("size", 4).attr("disabled", true).addClass("tmiddle mtBig").val(0);
			
			tr = $("<tr />");
			td = $("<td />");
			td.append(labelRoundCount, inputRoundCount);
			tr.append(td);
			td = $("<td />");
			td.append(labelRoundConsumption, inputRoundConsumption);
			tr.append(td);
			td = $("<td />");
			td.append(labelCalculatedConsumption, inputCalculatedConsumption);
			tr.append(td);
			table.append(tr);
			
			addFuelDriverOne.attr("id", "add-fuel-driver-one").addClass("button tmiddle mrSmall mlSmall mtBig mbBig").text("Fahrer 1 befüllen");
			addFuelDriverTwo.attr("id", "add-fuel-driver-two").addClass("button tmiddle mrSmall mlSmall mtBig mbBig").text("Fahrer 2 befüllen");
			addFuelDriverThree.attr("id", "add-fuel-driver-three").addClass("button tmiddle mrSmall mlSmall mtBig mbBig").text("Fahrer 3 befüllen");
			tr = $("<tr />");
			td = $("<td />");
			td.attr("colspan", 3).append(addFuelDriverOne, addFuelDriverTwo, addFuelDriverThree);
			tr.append(td);
			table.append(tr);

			content.addClass("contentRow whiteGradient").append(table);
			
			close.addClass("button tmiddle mbBig right closeCalculator").text("X");
			
			wrapper.attr("id", "calculator")
			.addClass("contentSlot")
			.css({
				display: "none",
				background: "url('/gfx/interface/content.jpg')",
				borderRadius: "5px",
				border: "1px solid #292929",
				color: "#000000",
				paddingBottom: "10px",
				boxShadow: "0 0 25px black",
				width: "50%",
				position: "absolute",
				left: "25%",
				top: "5px",
				padding: "10px"
			})
            .append(close, head, content);
			
			$("body").append(wrapper);
		}
	});
})();

$(function(){
	new window.Gasoline();
});