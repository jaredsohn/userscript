// ==UserScript==
// @name        annemum.tomsk.ru
// @namespace   com.mixey.annemum
// @description Помогает собрать заявку
// @include     http://annemum.tomsk.ru/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

(function () {
	var order = $("<table/>");
	order.css({
                float:"right",
                border:"2px solid red",
                padding: "5px",
                width:"500px",
                height:"auto",
                position:"fixed",
                top:"200px",
                right:"20px",
                display:"block",
                "background-color":"#FF6A00",
                color: "white",
				"font-size": "14px"
            });
	
    function init() {
		$(".rt-article-inner>table").css("width", "600px");
		$(".rt-article-icons").append(order);
		
		var chbox = $('<input style="width:20px" type="checkbox" name="myCheckbox" />');
		chbox.change(function (event){
			refreshData();
			// var current = $(event.target);
			// var price = current.prev();
			// var title = price.prev();
			
			// console.log(price.text());
			// console.log(title.text());
		});		

		$("tbody>tr")
			.filter(function(index) {return index > 0;})
			.append(chbox);
    }
	
	function refreshData() {
		order.empty();
		var countRow = 0;
		var totalPrice = 0;
		$("tbody>tr>input:checked").each(function (){
			var price = /\d+/.exec($(this).prev().text());
			order.append("<tr><td style='width: 480px;'>"+ $(this).prev().prev().text() +"</td><td valign='top'>"+ price +"</td></tr>");
			totalPrice += parseInt(price);
			countRow++;
		});
		
		order.append("<tr><td style='width: 480px;'></td><td valign='top'></td><td>"+ totalPrice +"</td></tr>");
	}

    $(document).ready(init);
})(jQuery);