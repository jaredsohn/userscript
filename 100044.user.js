// ==UserScript==
// @name           	Remover Spam
// @namespace	        http://stive.knoxx.net
// @require        	http://code.jquery.com/jquery-1.3.2.min.js
// @include        	http://*.orkut.tld/CommTopics?cmm=*
// ==/UserScript==

var spans = new Array("SELO da PASCOA , liberado hoje !");

$("table.displaytable tr").each(function(){
    var title;
    title = $("td:eq(1) a", this).text();
    IsASpam = (spans.join().indexOf(title)>=0);
    if(IsASpam){
        $(".normcheck:eq(0)", this).attr('checked', true);
    }
    IsASpam=false;
});

var button;
button =  '<span class="grabtn"><a id="removespam" class="btn" href="javascript: void(0);">Remover Spam</a></span><span class="btnboxr"><img height="1" width="5" alt="" src="http://static1.orkut.com/img/b.gif"></span>';

$(".parabtns").append(button);

$("#removespam").live('click', function(){
    console.log("Aff");
    $("table.displaytable tr").each(function(){
        IsChecked = $(".normcheck:eq(0)", this).attr('checked');
        if(IsChecked){
            Uid = $("td:eq(2) a:eq(1)", this).attr('href');;
            console.log(Uid);
            window.open(Uid);
            with(unsafeWindow){
                deleteTopics(document.topicsForm);
            }
        }
    });
    return false;
});