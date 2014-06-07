// ==UserScript== 
// @name              CanComment?  
// @namespace         kamdz.pl 
// @description       Pokazuje czy możemy odpisać w danym wpisie (czyli czy autor nie ma nas na #czarnolisto) 
// @author            Kamil "kamdz" Dzwonkowski  
// @version           1.1 
// @include           http://*wykop.pl/mikroblog* 
// @include           http://*wykop.pl/moj* 
// @include           http://*wykop.pl/wpis* 
// @include           http://*wykop.pl/ludzie* 
// ==/UserScript== 
  
var main = function () { 
    $(function() { 
        var key = "3bwghXB2R4";
		var nick = $("a[title='Przejdź do swojego profilu']").text();
		
		var checkEntry = function() {
			var entry = $(this);
			if (!entry.hasClass("canComment")) {
				var author = entry.find("header strong:first").text();
				if (nick != author) {
					var id = entry.attr("data-id");
					$.ajax({
						url: "http://a.wykop.pl/entries/index/" + id + "/appkey," + key + ",format,jsonp",
						type: "GET",
						dataType: "jsonp",
						jsonp : false,
						jsonpCallback: "wykopParser",
						success: function(response){
							if(!response.can_comment) { 
								entry.find(".addcommentin .mainspace").css("border", "2px solid red"); 
							} 
							entry.addClass("canComment");
						}
					});
				}	
			}
		};
		
		if (!location.pathname.indexOf("/wpis/"))
			checkEntry.apply($("li.aC"));;	
			
		$(".activitiesStream").on("focus", ".addcommentin", function() {
			checkEntry.apply($(this).closest("li.aC"));
		});
    }); 
}; 
  
var script = document.createElement("script"); 
script.textContent = "(" + main.toString() + ")();"; 
document.body.appendChild(script); 