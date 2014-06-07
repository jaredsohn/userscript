// ==UserScript==
// @name              Odkopywarka
// @namespace         http://kamdz.pl
// @description       Skrypt pozwala na cofnięcie zakopu w ciągu 5 minut.
// @author            Kamil "kamdz" Dzwonkowski 
// @version           1.1
// @include           http://*.wykop.pl/wykopalisko*
// @include           http://*.wykop.pl/ramka/*
// @include           http://*.wykop.pl/link/*
// ==/UserScript==

var main = function () {
	$(document).ready(function(){
		var limit = 5;
		var list = localStorage;
		
		$("body").undelegate("a.framejbury", "click").delegate("a.framejbury", "click", function () {
			var id = $(this).closest("ul.slidebutton").metadata().id;
			var query = www_base + "ajax/link/bury/type," + $(this).metadata().reason + ",link," + id + ",hash," + hash + ",group," + group_domain + "#" + ((new Date()).getTime() + 1000 * 60 * limit).toString();
			var button = $(this);
			$(".slidebutton").unbind("click");
			$("a.framediggit span.text").unbind("click");
			$("a.framediggit span.wykop").unbind("click");
			button.closest("ul.slidebutton").find("a.framediggit").attr("href", "#").addClass("cofarka");
			button.closest("ul.slidebutton").find("span.text").text("podkopane");
			button.closest("ul.slidebutton").find("span.text").next("span.icon").addClass("dnone");
			list.setItem(id.toString(), query);
			return false;
		});
			
		$(".jbury ul li").unbind("click").click(function () {
			var id = $(this).closest("article").metadata().id;
			var query = www_base + "ajax/link/bury/type," + $(this).metadata().reason + ",link," + id + ",hash," + hash + ",group," + group_domain + "#" + ((new Date()).getTime() + 1000 * 60 * limit).toString();
			var button = $(this);
			button.parent().closest("ul.jbury").fadeOut(150).replaceWith('<a href="#" class="cofarka small"><span>podkopane</span></a>');
			list.setItem(id.toString(), query);
			return false;
		});	
			
		$(".cofarka").live("click", function () {
			var decision = confirm("Definitywnie zakopać to znalezisko?");
			
			var id;
			if ($("#frame-top").length) 
				id = $("ul.slidebutton").metadata().id;
			else 
				id = $(this).closest("article").metadata().id;
				
			if (decision) {
				bury(id);
				$(this).removeClass("cofarka").text("zakopane").css('padding', '0px 4px').click(function(){
					return false;
				});
			} else {
				list.removeItem(id);
				$(this).removeClass("cofarka").text("odkopane").css('padding', '0px 4px').click(function(){
					return false;
				});
			}
			
			return false;
		});	
		
		$("a.diggit").click(function () {
			if ($(this).find("span.action").text() != "wykop") {
				$(this).parent().find("a:contains('wykopałeś')").hide();
			} else {
				var id = $(this).closest("article").metadata().id;
				if (list.getItem(id)) {
					$(this).parent().find(".cofarka").text("wykopałeś").removeClass("cofarka").click(function(){
						return false;
					});
					list.removeItem(id);
				}	
			}	
		});
		
		var bury = function(id) {
			var url = list.getItem(id).split("#")[0];
			$.getJSON(url, {}, function (v) {
				if (v.error) 
					alert(v.error);
				list.removeItem(id);
			});
		}
		
		var check = function(){	
			var ids = new Array();
			for (var i = 0; i < list.length; i++)
				if (!isNaN(list.key(i)))
					ids.push(parseInt(list.key(i)));	
			
			$(".scale article").each(function() {
				if ($.inArray($(this).metadata().id, ids) > -1) 
					$(this).find(".jbury").replaceWith('<a href="#" class="cofarka small"><span>podkopane</span></a>');
			});
			
			if($("#frame-top").length) {
				if ($.inArray($("#frame-top .slidebutton").metadata().id, ids) > -1) {
					$(".slidebutton").unbind("click");
					$("a.framediggit span.text").unbind("click");
					$("a.framediggit span.wykop").unbind("click");
					$("a.framediggit").attr("href", "#").addClass("cofarka");
					$("span.text").text("podkopane");
					$("ul.slidebutton").find("span.text").next("span.icon").addClass("dnone");
				}
			}
		};
			
		setInterval(function(){	
			for (var i = 0; i < list.length; i++){
				var id = list.key(i); 
				if (!isNaN(id) && list.getItem(id).match("^http://www.wykop.pl/ajax/link/bury/")) {
					if ((new Date()).getTime() > parseInt(list.getItem(id).split("#")[1])) {
						bury(id);
						$(".cofarka").each(function(){
							if($("#frame-top").length) {
								$(this).removeClass("cofarka").text("zakopane").css('padding', '0px 4px').click(function(){
									return false;
								});
							} else if ($(this).closest("article").metadata().id == id) {
								$(this).removeClass("cofarka").text("zakopane").css('padding', '0px 4px').click(function(){
									return false;
								});
							}
						});
					}	
				}
			}
		}, 5000);
			
		check();
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);