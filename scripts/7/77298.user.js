// ==UserScript==
// @name           Stack Overflow: StackPrinter
// @namespace      http://userscripts.org/users/gangsta75
// @description    Add Printer-Friendly button to question
// @include        http://stackoverflow.com/questions/*
// @include        http://serverfault.com/questions/*
// @include        http://superuser.com/questions/*
// @include        http://stackapps.com/questions/*
// @include        http://meta.stackoverflow.com/questions/*
// @include        http://*.stackexchange.com/questions/*
// @include        http://askubuntu.com/questions/*
// @include        http://answers.onstartups.com/questions/*
// @include        http://meta.mathoverflow.net/questions/*
// @include        http://mathoverflow.net/questions/*

// ==/UserScript==

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function($) {
       var re = new RegExp("^http://(.*?)\.(com|net|org)");
       var group = re.exec(window.location.href);
       var service = group[1]; 
       $('#question .vote:first').append('<div id="PrinterFriendly" style="margin-top:8px"><a alt="Printer-Friendly" title="Printer-Friendly" href="javascript:(function(){f=\'http://www.stackprinter.com/export?format=HTML&service='+service+'&question='+$('.vote').find('input[type=hidden]:first').val()+'\';a=function(){if(!window.open(f))location.href=f};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})()"><img width="33px" height="33px" src="http://www.stackprinter.com/images/printer.gif"</img></a></div>');		
});

