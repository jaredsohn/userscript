// ==UserScript== //
// @name           Google Multi-Engine
// @namespace      http://scripting.douweikkuh.nl
// @description    Let's you search directly from Google, using other search-engines
// @include        http://www.google.*/*
// @include        http://google.*/*
// ==/UserScript== //


engines  = new Object();


//CONFIG//

/*/
 You can add more search-engines by copying the line below, 
 pasting it under the allready existing lines, and editing it:
 
 engines['QUICKNAME'] = "NAME; URL";
 
 You have to split the NAME and the URL by using '; '.
 In the URL you can use %KEYWORDS% instead of the keys searched for. As you see below.
/*/

engines['live']  = "Windows Live; http://search.live.com/results.aspx?q=%KEYWORDS%";
engines['yahoo'] = "Yahoo!; http://search.yahoo.com/search?p=%KEYWORDS%";
engines['wiki']  = "Wikipedia; http://en.wikipedia.org/wiki/Special:Search?search=%KEYWORDS%&fulltext=Search";
engines['ytube'] = "YouTube; http://www.youtube.com/results?search_query=%KEYWORDS%";

//CONFIG//


function search(engine){
  var q         = document.getElementsByName('q');
  if(engine != "" && q){
    var q       = escape(q[0].value);

    var engine2 = engines[engine].split('; ');
    var url     = engine2[1];
    var url     = url.replace("%KEYWORDS%",q);

    document.location.href = url;
  }
}

(function(){
  var select   = '&nbsp;<select id="engines">\n';
  var select   = select+'<option value="" selected>Search using:</option>\n';
  
  for (engine in engines){
    var engine2 = engines[engine].split('; ');
    var name    = engine2[0];
    var url     = engine2[1];
  
    var select = select+'<option value="'+engine+'">'+name+'</option>\n';
  }
  
  var select   = select+'</select>';
  
  
  var q = document.getElementsByName('q');
  if(document.getElementById('ap')){
    with(document.getElementById('ap').parentNode){ innerHTML = '<div style="float:left;">'+select+'</div>' + innerHTML; }
  }else if(q){
    with(q[0].parentNode){ innerHTML = innerHTML + select; }
  }
  
  
  if(document.getElementById('engines')){
    document.getElementById('engines').addEventListener('change',  function() { search(this.value); }, 'false');
  }
}());