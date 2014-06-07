// ==UserScript==
// @id             zpovednice tabulka
// @name           zpovednice tabulka
// @version        1.1
// @namespace      daemonicky
// @author         daemonicky
// @description    
// @include        http://zpovednice.cz/index.php*
// @include        http://zpovednice.cz/*
// @include        http://www.zpovednice.cz/index.php*
// @include        http://www.zpovednice.cz/*
// @include        http://www.spovednica.sk/index.php*
// @include        http://www.spovednica.sk/*
// @include        http://spovednica.sk/index.php*
// @include        http://spovednica.sk/*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==
//console.log("console");

function iota( n/*int0*/ ) { a=[]; for(i=0;i<n;i++)a[i]=i; return a; }
function reorder( items/*JQ*/, order/*int1*/ ) /*JQ*/ {
    // console.log("order.length: " + order.length);
    
    var clones=[];
    for(i=0;i<order.length;i++){
        var clone = items.eq(order[i]).clone();
        clones.push( clone );
    }
    for(i=0;i<order.length;i++){
        items.eq(i).replaceWith(clones[i]);
    }
}

function array( items/*JQ*/ ) /*text1*/{ 
    a=[]; 
    $(items).each(function(_,item){
        a.push( $(item).text() );
    });
    //for(i=0;i<a.length;i++) {
    //    console.log(a);
    return a;
}

// 4 buttons trigger sorting
var headers_neutral = {
    2:"id ",
    3:"zpověď ",
    4:"autor ",
    5:"příspěvků ",
    6:"věk "
};
var headers_smaller = {
    2:"id &#9650;",
    3:"zpověď &#9650;",
    4:"autor &#9650;",
    5:"příspěvků &#9650;",
    6:"věk &#9650;"
};
var headers_larger = {
    2:"id &#9660;",
    3:"zpověď &#9660;",
    4:"autor &#9660;",
    5:"příspěvků &#9660;",
    6:"věk &#9660;"
};
//#0A386B url(grafika/bar2b.gif) repeat-x scroll left center
// #0A386B url(grafika/bar2b.gif) repeat-x
//console.log($(".sectheader").css());
//$(".sectheader").css("border","red 1px solid");
$(".sectheader").css("background-position","top left"); // musi byt validni !!!
$(".sectheader").css("height","auto");
$(".sectheader")
	.append("<br>"); // odsad srovnavaci tlacitka
//console.log($(".sectheader").css());
var headers_reorder = {
    2:2,
    3:3,
    4:4,
    5:6,
    6:5
};

for(var i = 2; i <= 6; i++ ) {
    var ii = headers_reorder[ i ] ;
    $(".sectheader")
    	.append("<button header_id="+ii+">" + headers_neutral[ii] + "</button>");      // make outer i a local variable inside callback
}

// sort inside of a day
$(".sectheader").each(function(i,_){
    $(this).addClass( "day" + i );
});
var days = $(".sectheader").size(); 
for(i=0;i< days;i++) {
	$(".sectheader.day" + i + " + #conflist ul").addClass( "day" + i );
    $(".sectheader.day" + i + "  button").each(function(){
        $(this).attr( "day" , i );
    });
}

//console.log(reorder("",iota(8)));
//console.log("7,6 ... 2,1,0:");
//reorder("", iota(8).sort(function(i,j){ return j-i; }));

function age(s) {
    var m;
    return (( m = (s).match(/\((\d+)\)/) ) != null ? m[1] : 0);
}
//console.log("w");

function work(button) { // JQ            
        	var header_id = $(button).attr("header_id");         
            var day = $(button).attr("day");
            var rows = $("#conflist ul.day" + day );          // tlacitko nema dite ul; selectory neumi zpet
            var headers = { 
                2: "c2",
                3: "c3l",
                4: "c4u",
                5: "c5u",
                6: "c4u"
            };
            var header = headers[header_id];
            var column = $("#conflist ul.day" + day + " ." + header ); // sorted column
            // console.log( "#conflist ul.day" + day + " ." + header );
            var a = array( column );        
            if( rows.size() != column.size() || rows.size() != a.length ) {
                //console.log( "chyba selektoru" );
            }
            // console.log(a);
            
            var sort_f = {
                2:function(i,j){ /*console.log(a[i] + ";" + a[j] + "=" + (a[i] - a[j]) );*/ return a[i] - a[j]; },
                3:function(i,j){ return a[i].localeCompare(a[j]);},
                4:function(i,j){ return a[i].localeCompare(a[j]);},
                5:function(i,j){ return a[i] - a[j]; },
                6:function(i,j){ return age(a[i]) - age(a[j]); }
        	};
            
            if( $(button).attr("sort_from") == undefined || $(button).attr("sort_from") == "larger" ) {
                $(button).attr("sort_from","smaller");
                // jen jedna s sipeckou
                //console.log(".sectheader button[day=\""+day+"\"]");
                $(".sectheader button[day=\""+day+"\"]").each(function(i,item){
                    var header_id = $(this).attr("header_id");
                    $(this).html(headers_neutral[header_id]);
                });
                $(button).html(headers_smaller[header_id]);
                reorder( rows
                // make new order and sort it by : 
                        , iota( a.length ) 
                           . sort(            // jquery does not have .sort() ?  
                                    sort_f[header_id]
                               )
                );
            } else {
                $(button).attr("sort_from","larger");
                // jen jedna s sipeckou
                $(".sectheader button[day="+day+"]").each(function(){
                    var header_id = $(this).attr("header_id");
                    // console.log(":" + day);
                    $(this).html(headers_neutral[header_id]);
                });
                $(button).html(headers_larger[header_id]);
                reorder( rows
                // make new order and sort it by : 
                        , iota( a.length ) 
                           . sort(            // jquery does not have .sort() ?  
                                    sort_f[header_id]
                               ).reverse()
                );
            }
            //console.log("sorted!");
}

$(".sectheader button")
        .click(function(){
            work($(this));
        });


// skryj tlačítko pod SMS reklamou
$(".sectheader").each(function(){
    //console.log($(this).text());
    if($(this).text().match(/SMS/)){ // there is date otherwise
        //$(this).css("display","border","red 1px solid");
        //$(this).next().css("border","red 2px solid"); //.conflist
        $(this).find("button").css("display","none");//css("border","red 5px solid"); 
    }
});

// defaultni razeni
$(".sectheader button[header_id="+2+"]").each(function(){
    work($(this));
});
