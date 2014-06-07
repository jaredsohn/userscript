// ==UserScript==
// @name        this_is_leboncoin
// @namespace   this_is_leboncoin
// @description change le skin leboncoin
// @include     *.leboncoin.fr/*
// @version     0.1.1
// ==/UserScript==


document.getElementById('searchbutton').focus();

$('#header_logo').hide();
$('#headermain').css({
    'width':"100%",
    "height":"10px"
    });

$("*").css({
	"border-radius":"inherit"
	});
	
$("form").css({
	"margin":"0",
	"padding":"0"
	});

$('#page_width').css({
        'margin':'0', 
        'width':'inherit',
        "position":"inherit",
        'padding':'0'
    });
    
$('#ContainerMain').css({
	'padding':'0',
	'margin':'0',
});  

$('#headermain').hide();
    
$('.content-color').css({
    'padding':'0'
}); 
$('.list-gallery').css('display', "none");

$('.date').css({
	"padding":"0",
	"float":"none",
	"font-size":"10px"
	});
	
$('.date').find('div').css({
	"float":"left",
	"width":"200px"
	});
	
$('.image').css({
	"padding":"0",
	"display":"block",
	"width":"inherit",
	"height":'125px',
	"min-height":'125px'

});
$('.category').css('display', 'none');
$('.price').css({
    'height': '20px',
    'line-height': "inherit",
    'float':'left',
    'padding':'0',
    'margin':'0',
    'width':'200px',
    'background':'gray',
    "text-align":"center"
    });
$('.nb').css({"display":"none"});
$('.placement').css({
	"display":"block",
    "font-size":"10px",
    "float":"left",
    "height":"15px"
});

$('.lbc').css({
	"display":"block",
    "float":"left",
    "width":"200px",
    "height":"220px",
    "border":"inherit",
    "padding":"inherit"
});

$(".title").css({
    "font-size":"10px",
    "float":"left",
    "width":"200px",
    'height':"28px"
});

$('.list-lbc').css({
    "width":"100%",
    "margin":"0"
});

$('.detail').css({
    "float":"none",
    "overflow":"inherit",
    "padding":"0",
    "width":"inherit",
});

$('.clear').hide();

$('searcharea').css({
	
	});

$('.search_box').css({
    'padding':'0'
    });

$('#footer').css({
    'padding':'0',
});

$('#categories_container').css({
    "display":"none"
});