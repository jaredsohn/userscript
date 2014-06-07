// // ==UserScript==
// @name       Gelbooru Revamped
// @namespace  westerhold78
// @version    0.5
// @description  This adds a couple of changes to the layout and behaviour of the site
// @include     *://gelbooru.com/*
// @include     *gelbooru.com/*
// @include     *://www.gelbooru.com/*
// @require     http://code.jquery.com/jquery-1.10.0.min.js
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAc5JREFUeNqMkr1rU2EUxn/nzXuv5VYEFULBQkuGCBEHl1pIdVBEHSoqrllUnMRCB1f9EwQXhTooOkpdrHQoClWkWFEoRSSK+EXQasEgaW5y73scEpNe84FnOu/HeZ7nnPMIU7UTwCRgiYCIzhDAA0zi1gEPLXAGKFAFMwC5YSE3JGwPoB5DqaysluDTmkId2JIA8S1VYvFh+qjh4kHD6E7pEKDAi4/KzaeOe8uO0DVVQWQLecOFvGEiI/QKAcZGhLGRFKvflaX3CrbxZu8UUh0FC2+Vx0Vlo67khoTJvUJ6a3cCu/kQRnB6JmLulf6VCArBIFw+kuLKcYOX6gMw/SBm7qXCYPJTJYarszGLHxylsia20QJYr8DMcwdBc0HxP1o9WHit4CdpW+mbb0qtAviQ3gb7hrv3vPxZ+fm7tYU2wK+NZlKHiYxw/6ztCnDsRsT8ijaMtdlbOwL+K2LXY4jZtOAHUAuhuAbXFx0awZ5dwuFsb48kFJwbNxDCyhfl0t2Yqdsxt5ZcX0WmPQ64dirFyf3S8HzTgqZ/R2LDiNi3DRTfwux5y7NDypOi8nVdObBb+gE4++6HPsqmBc+0yfIZYXxUKFdhwOtdDMz/GQCfgpOVo7ktkQAAAABJRU5ErkJggg==
// @copyright  2014, westerhold78
// ==/UserScript==
// 
var style = [];

// Images Gallery: Replace images when hovered (thumbnail -> original)
$(document).on("mouseover", "article a, span.thumb a, div.inner a.thumb", null, function(e) {
    $('img',this).each(function(){
        $(this).removeAttr("alt").removeAttr("title");
        var currentHeight = $(this).height();
        var origSource = $(this).attr('src');
        var source1 = origSource.replace(/thumbnail/g,'sample');
        var source2 = origSource.replace('thumbs','images').replace('thumbnail_','').replace('http://','http://simg2.');
        console.log(origSource);
        console.log(source2);
        $(this).error(function() {
            $(this).attr('src', source2);
        }).attr('src', source1);
        $(this).height(currentHeight);
    });
});

// Image Detail Page: click on image to open it
var imgElement = $( "div#post-view > div#right-col > div > img" );
$(imgElement).replaceWith( '<a href="'+ $(imgElement).attr('src') +'"><div id="img-container"><img src="'+ $(imgElement).attr('src') +'" /></div></a>' );

// Image Detail Page: Rescale image to fill screen
style.push("div#content div.content #img-container {",
			"background-size: contain;",
			"background-repeat: no-repeat;",
			"height: 100%;",
           	"position: absolute;",
"}");

style.push("div#content div.content #img-container img {",
			"max-height: 90%;",
"}");
       

// Common design fixes
style.push("div#page aside#sidebar div.sidebar3, div#content div.sidebar div.sidebar3 {width: auto;}",
"div#content div.sidebar input.secondary_search { max-width: 160px; width: 93%; }",
"div#content div.sidebar input.search_list { max-width: 154px !important; width: 90%; }",
"div#content div.content#right-col, div#content div.content {float: right;}",
"div#content div#post-view {display: flex;}",
"div#post-list { display: flex; }",
"div.sidebar { width: inherit; }",
"div#header table td { width: 100% }");

// Images Gallery: scale images to 250% when hovering //taken from dxbooru: dx's random tweaks to boorus
var val = 2.5;
style.push(
    "article:hover, span.thumb:hover, div.inner:hover {overflow: visible !important;}",
    "article:hover img, span.thumb:hover img, div.inner:hover a.thumb img.preview {",
    "  position: relative;",
    "  transform: scale("+val+");",
    "  -moz-trqansform: scale("+val+");",
    "  -webkit-transform: scale("+val+");",
    "  box-shadow: 0 0 5px rgba(0,0,0, 0.3), 0 0 15px 8px white;",
    "  z-index: 100;",
    "}"
);

GM_addStyle(style.join("\n"));