// ==UserScript==
// @name                Troll Hunter
// @description	        hunt down tolls on idg.se
// @include				http://idg.se/*
// @include				http://*.idg.se/*
// @require				http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @require				http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// ==/UserScript==

var trollId = "trolls";

var user_delete_icon = 
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdB" + 
	"TUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMKSURBVH" + 
	"jaYvz//z8DJQAggFiwCWabidYqC/8rZ2b+x/3r73+Gz7+Yvt37yNK/5MyrGnS1AAHEiO6CDBPh" + 
	"cn3p/+2sXIyM/4D8X7//M3z5/o/h1Zf//299YG3ecvFNPbJ6gABiQjfRQOJvBydQ8/tPfxneff" + 
	"7L8OUHA8M/JjYGFmYWRkHWPwXo6gECCMOAD0BNkvZZDFG51QyOgUkMz7+yMLz9wcLwjUWAgYuD" + 
	"iXNxpR87snqAAMIIAxEF4Xf2gbFCv+7uY5BlYWFIzsxi4OPhYuDXcmHY2Rn2XVtDFsXPAAGEYc" + 
	"D3v9zXvz86a/2HXYRBkPsPg6CoFMOXP8wMDO9uAQOT67Zu/NRfyOoBAgjFCxI+y1gnP3S4t3Nx" + 
	"HwMfw0cGRhYOIGZn4GH+xXBgeS/D5DvWD8Xc5nAi6wEIIHgsiHmvYP/3728SJ4PEtB2zLBiuzo" + 
	"xi+M8AkWMEQqnopQyRBacZvv25X8DI8Hv2m73p30ByAAEENkDEaxXjr78M8UJs0vO3zzBiOMfA" + 
	"yXDuA9A7X4HR+J2B4Q9QqeOtaQyKZ6cw/Hp6h+ErM9t7NoZfPZ67frUBBBA4DCS4vvpLMr6Zn1" + 
	"4SzHDoLTPD1W//GX4Do+8P0LcgWvfidAa9TysYNCNSGNgVtRm+X9olePXw7ubdLqyfAQII7ILz" + 
	"tZp/ZMwDmFe9tmY4I+nDwAx0+b8//8EG/PnJwBC0Wo3BOzWTgfPuAQaGp0cYGPgFGN6wyDOc23" + 
	"X4PkAAgV3AzMjIxMLOxXDkxBsGndBvDNc/cjH8/8PA8PcXxBWCnx4ycEgoMjB4FSGir0GSgfkf" + 
	"owJAAIFjgUnVpfr+/sV/OH8//7Nx6SkGNt7/DByCDAzc4kDLZBkYPgtIMXy7sJWBAajpZzkjw3" + 
	"sg/vTyNcNf5v/PAAIIHgsPVmbxzr8kzbbomn7r/w9vvZlZuYQYGJlYGf79Zwji2MIYJH6CRUHk" + 
	"FwML0xOGz6//MDx4yfz394//dQABxEhsdj4aIVfx9d2zdOa/jPJAm58CdU133/WnDSDAAKjSJt" + 
	"OMc/NjAAAAAElFTkSuQmCC";

var user_add_icon = 
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdB" + 
	"TUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMASURBVH" + 
	"jaYvz//z8DJQAggFiwCWabidYqC/8rZ2b+x/3r73+Gz7+Yvt37yNK/5MyrGnS1AAHEiO6CDBPh" + 
	"cn3p/+2sXIyM/4D8X7//M3z5/o/h1Zf//299YG3ecvFNPbJ6gABiQjfRQOJvBydQ8/tPfxneff" + 
	"7L8OUHA8M/JjYGFmYWRkHWPwXo6gECCMOAD0BNkvZZDFG51QyOgUkMz7+yMLz9wcLwjUWAgYuD" + 
	"iXNxpR87snqAAMIIAxEF4Xf2gbFCv+7uY5BlYWFIzsxi4OPhYuDXcmHY2Rn2XVtDFsXPAAGEYc" + 
	"D3v9zXvz86a/2HXYRBkPsPg6CoFMOXP8wMDO9uAQOT67Zu/NRfyOoBAgjFCxI+y1gnP3S4t3Nx" + 
	"HwMfw0cGRhYOIGZn4GH+xXBgeS/D5DvWD8Xc5nAi6wEIIHgsiHmvYP/3728SJ4PEtB2zLBiuzo" + 
	"xi+M8AkWMEQqnopQyRBacZvv25X8DI8Hv2m73p30ByAAEENkDEaxXjr78M8UJs0vO3zzBiOMfA" + 
	"yXDuA9A7X4HR+J2B4Q9QqeTX9Qy/3mwCRul7ho9fP//4+OVd+/aO800AAQQOAwmur/6SjG/mp5" + 
	"cEMxx6y8xw9dt/ht/A6PsD9C2IZn61koFTYBeDja0pg4yQKsP+qxs4Tlw53GiRI8UHEEDgMFis" + 
	"2bVmWfw7hpfXtjOceMbA8O09I8PPzwxg/PsL0KC3ixkMNPQZ/jL9ZdCXdGX4y/ibwULXCpxoAQ" + 
	"IIbAAzIyMTCzsXw5ETbxhUWL4x/AA6+ScQ//oG8cL7z88ZWBl5GPw0c8FhUuw8i0FZTA/E5AAI" + 
	"ILABTKou1ff3L/7D+fv5n41LTzGw8f5n4BBkYOAWZ2DglwXG4OePDFefHWPo2J0INqBjVyLD3V" + 
	"eXQMwfAAEEj4UHK7N451+SZlt0Tb/1/4e33sysXEIMjEysDP/+M3ALb2RUMz3DYqVnw6AqYchw" + 
	"+8V5hmOXjjA8uf+xFyCAGInNzsAA6wBSWUDMC8TA0GGYdmLKswqAAAMAnFQdkhuzRSAAAAAASU" + 
	"VORK5CYII%3D";

function toggleTroll(form) {
	$(form).find(".originalHeader").toggle();
	$(form).find(".trollHeader").toggle();
	
	$(form).find("img.resurrectTroll").toggle();
	$(form).find("img.slayToll").toggle();
	
	$(form).find("div.divCommentsContent").slideToggle();
	$(form).find("div.divCommentsFooter").slideToggle();
}

function resurrectTroll(name) {
    $("form.commentContainer").each(function(){
        if (name == getNameFromForm($(this))) {
			toggleTroll($(this));
        }
    });
}

function slayTrolls(){
    $("form.commentContainer").each(function(){
        if (commenterIsTroll(getNameFromForm($(this)))) {
			toggleTroll($(this));
        }
    });
}

function slayTroll(name) {
    $("form.commentContainer").each(function(){
        if (name == getNameFromForm($(this))) {
			toggleTroll($(this));
        }
    });
}

function findTrolls(){
    return GM_getValue(trollId, "").split(";");
}

function tagAsTroll(name){
	if (!commenterIsTroll(name)) {
		GM_setValue(trollId, GM_getValue(trollId, "") + name + ";");
	}
}

function unTagAsTroll(name) {
	var trolls = findTrolls();
	
	trolls = $.grep(trolls, function(value){
		return value != name && value != "";
	})
	
	var semiColonSeperatedString = "";
	
	$.each(trolls, function(index, value){
		semiColonSeperatedString += (value + ";");
	})
	
	GM_setValue(trollId, semiColonSeperatedString);
}

function commenterIsTroll(name){
    return ($.inArray(name, findTrolls()) > -1);
}

function getNameFromForm(form){
	var name = form.find("span.commentAuthor").text();

	if (name.length > 0) {
		return name;
	}
	else {
		return "CommenterNameIsMissing";
	}
}

function getImg(src, width, height, altText, classname){
	return '<img src=\"' + src + '\" \" width=\"'+ width + '\" height=\"' + height + '\" alt=\"' + altText + '\" class=\"' + classname + '\" style=\"cursor: pointer;\"  />';
};

$(document).ready(function() {
	var slayTrollImage = getImg(user_add_icon, '16', '16', 'Resurrect troll', 'resurrectTroll');
	$("div.divCommentsContentHeaderTop p.right span").append(slayTrollImage);
	$("div.divCommentsContentHeader p.right span").append(slayTrollImage);
	$("div.divCommentsFooter p.right").append(getImg(user_delete_icon, '16', '16', 'Slay troll', 'slayToll'));
	$("img.resurrectTroll").hide();
	
	$("div.divCommentsContentHeaderTop p.left").addClass("originalHeader");
	$("div.divCommentsContentHeader p.left").addClass("originalHeader");
	
	$("form.commentContainer").each(function(){
		var trollHeaderText = "<p class='trollHeader left' style='display: none;'>(Trollet \'" + getNameFromForm($(this)) + "\' är infångat av Troll Hunter)</p>";
		
		$(this).find("div.divCommentsContentHeaderTop").append(trollHeaderText);
		$(this).find("div.divCommentsContentHeader").append(trollHeaderText);
	});
	
	$("img.slayToll").live("click", function(){
		tagAsTroll($(this).parents("div.divCommentsFooter").find("span.commentAuthor").text());
        $(this).parents("form").find("div").effect("highlight", {}, 500);
        slayTroll(getNameFromForm($(this).parents("form.commentContainer")));
	})
	
	$("img.resurrectTroll").live("click", function(){
		unTagAsTroll($(this).parents("form.commentContainer").find("span.commentAuthor").text());
		resurrectTroll(getNameFromForm($(this).parents("form.commentContainer")));
	})
	
	slayTrolls();
});