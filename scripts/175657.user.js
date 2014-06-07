// ==UserScript==
// @name           Memrise with MDBG Dictionary Data
// @description    Adds character decomposition diagrams, stroke order images, and links to other resourses to every review page in Chinese courses
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @match          http://www.mdbg.net/chindict/chindict_ajax.php*
// @version        0.6
// @updateURL      https://userscripts.org/scripts/source/175657.meta.js
// @downloadURL    https://userscripts.org/scripts/source/175657.user.js
// @grant          none
// ==/UserScript==

var onLoad = function($) {
  $("#central-area").on("DOMSubtreeModified", function() {  //trigger many times
    if ($("#otherRefs").size()==0 && MEMRISE.garden.session.category.name=="Chinese") {                         //only triggered once
      var hanzi = MEMRISE.garden.box.thing.columns[1].val;
      
      // Append the HTML
      $(".columns").append('<div class="row column  on-show-more"><div class="row-label">Other References</div><div id="otherRefs" class="row-value"><div id="strokeIcons"></div><div id="decompIcons"></div><ul style="float:left;font:0.6em sans-serif;">'+
                           '<li><a target="_blank" href="http://www.mdbg.net/chindict/chindict.php?wdqb=c:*'+ hanzi +'*">MBDG Dictionary</a></li>'+
                           '<li><a target="_blank" href="http://hanzicraft.com/character/'+ hanzi +'">HanZiCraft</a></li>'+
                           '<li><a target="_blank" href="https://en.wiktionary.org/wiki/'+ hanzi +'">Wiktionary</a></li>'+
                           '<li><a target="_blank" href="http://translate.google.com/?source=osdd#zh-CN/en/'+ hanzi +'">Google Translate</a></li>'+
                           '</ul></div></div></div>');

      if (hanzi.length<=3) for (var i=0; i<hanzi.length; i++){
        $("#strokeIcons").append('<div id="icon4stroke'+hanzi.substring(i,i+1)+'" class="tile" title="Stroke Order">'           +hanzi.substring(i,i+1)+'</div>');
        $("#decompIcons").append('<div id="icon4decomp'+hanzi.substring(i,i+1)+'" class="tile" title="Character Decomposition">'+hanzi.substring(i,i+1)+'</div>');
        $("#otherRefs"  ).append('<img id="stroke'     +hanzi.substring(i,i+1)+'" class="mdbg" src="http://www.mdbg.net/chindict/rsc/img/stroke_anim/'       + hanzi.substring(i,i+1).charCodeAt(0) +'.gif"/>'+
                                 '<iframe id="decomp'  +hanzi.substring(i,i+1)+'" class="mdbg" src="http://www.mdbg.net/chindict/chindict_ajax.php?c=cdcd&i='+ hanzi.substring(i,i+1)+'"></iframe>');
      }
      
      //Add styles & mouse events
      $("#strokeIcons .tile").css({background:"white url(\'https://openclipart.org/people/warszawianka/tango-style-paintbrush.svg\') no-repeat right top"});
      $("#decompIcons .tile").css({background:"white url(\'http://repurposed.files.wordpress.com/2009/08/scissors.jpg\'            ) no-repeat right top",textAlign:"center"});
      $("             .tile").css({float:"left",width:"50px",height:"50px",color:"red"})
                             .mouseover(function(){$( "#"+$(this).attr("id").substring(5) ).show().offset( $(this).offset() )});
        
      $(".mdbg" ).css({display:"none",position:"absolute",top:"200px",left:"200px","z-index":1000,width:"250px",height:"250px"})
                 .mouseleave(function(){console.log(this);$(this).hide()});
    
    }
  });
};

if (location.hostname=="www.mdbg.net") {
  // Handle the inline frame
  document.body.style.backgroundColor = "white";
  document.getElementsByClassName("characterdecomposition")[0].style.fontSize = "1.8em";
  var anchors = document.getElementsByTagName("a");
  for (var i=0; i<anchors.length; i++) {
    anchors[i].target = "_blank";
    anchors[i].style.color          = "#008";
    anchors[i].style.textDecoration = "none";
  }
  
}else{
  // Handle the main page at Memrise.com
  var injectWithJQ = function(f) {
    var script = document.createElement('script');
    script.textContent = '$(' + f.toString() + '($));';
    document.body.appendChild(script);
  };
  injectWithJQ(onLoad);
}