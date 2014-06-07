// ==UserScript==
// @name           Atkins View Multi Recipes
// @namespace      http://atkins.com
// @description    Atkins View Multi Recipes
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://*.atkins.com/*
// ==/UserScript==

var AtkinsMultiViewRecipes = function(settings){
	this.settings = settings;
	var self = this;
	
	this.makeSpace = function(){
		for(var i in this.settings.removeIds){
			$(this.settings.removeIds[i]).remove();
		}
		$(this.settings.recipesContainerIds).attr("style","height:250px;").parent().attr("style","width:300px;float:left;").parent().attr("style","min-height:900px;overflow:auto;");
	}
	
	this.addIframe = function(){
		$(this.settings.recipesContainerIds).parent().parent().append(
			"<div style='float:left;margin-left:20px;width:550px;height:1000px;'><iframe src='#' id='rIframe' width='1' frameborder=0 height='1'></iframe><div id='rContents'>Please select recipe from the left.</div></div>"
		);
	}
	
	this.addMultiSearchButtons = function(){
		$(this.settings.recipesContainerIds).find("img").remove();
		$(this.settings.recipesContainerIds).find("select").attr("multiple","multiple").height(200).find('option:empty').remove();
		$(this.settings.recipesContainerIds).find("select").unbind("change").change(function(){
			//e.g. http://www.atkins.com/Recipes/ShowRecipe102/Chicken-Pesto-Pizza.aspx
			var name = $(this).find("option:selected").text().replace(" ","-");
			var url = "http://www.atkins.com/Recipes/ShowRecipe" + $(this).val() + "/" + name + ".aspx";
			$.get(url,function(data){
				$("#rContents").html($(data).find("#main-recipe").html());
			});
		});
	}
	
	this.addCloseButtons = function(){
		$(this.settings.recipesContainerIds).append($("<a href='#' class='closeButton'>[X]</a>"));
		$(".closeButton").unbind("click").click(function(){
			$(this).parent().remove();
			return false;
		})
	}
	
	this.applyEvents = function(){
		this.makeSpace();
		this.addIframe();
		this.addMultiSearchButtons();
		this.addCloseButtons();
	}
	
	this._init = function(){
		this.applyEvents();
	}
	
	this._init();

}

var aMultiR = new AtkinsMultiViewRecipes({
	recipesContainerIds : '.recipeCategorySmall',
	removeIds : ['#carbCounterCallout','.tempRightCol']
});