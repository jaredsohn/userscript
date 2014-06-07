// ==UserScript==
// @name       Ragna Attribute input
// @namespace  http://blueblueblue.fool.jp/
// @version    0.6
// @description  Ragna Archives Network 2のAttribute入力サポート
// @include    http://www5.big.or.jp/~seraph/ragna/edit.cgi*
// @copyright  2012+, ebi
// ==/UserScript==

function main() {
    
    if ( !$("select[name=\"xcn\"]").length ) { retrun };

    //jsonソート用
    var sort_by = function(field, reverse, primer){
       reverse = (reverse) ? -1 : 1;
       return function(a,b){
           a = a[field];
           b = b[field];
           if (typeof(primer) != 'undefined'){
               a = primer(a);
               b = primer(b);
           }
           if (a<b) return reverse * -1;
           if (a>b) return reverse * 1;
           return 0;
       }
    }

    //tableをjsonに変換
    function tableToJson(table) {
        var data = [];
        var headers = [];
        for (var i=0; i<table.rows[0].cells.length; i++) {
             headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, "");
        }
        // go through cells
        for (var i=1; i<table.rows.length; i++) {
            var tableRow = table.rows[i]; var rowData = {};
            for (var j=0; j<tableRow.cells.length; j++) {
                rowData[ headers[j] ] = tableRow.cells[j].innerHTML.replace(/\s|<("[^"]*"|'[^']*'|[^'">])*>/gi, "");
                if ( headers[j] == "属性名" ){
                    rowData[ "Id" ] = tableRow.cells[j].innerHTML.split(/&amp;id=/)[1].split(/\"/)[0];
                }
            } data.push(rowData);
        }
        return data; 
    }
    
var img_loader = 'data:image/gif;base64,'+
    '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'+
    'Cwg1RAAAOwAAAAAAAAAAAA==';    
    
    var mystring =
      "<style type=\"text/css\">" +
      "   div#us-ragna-attr-wrapper {" +
      "     font-size:1.1em !important;" +
      "     width:300px;" +
      "     position:fixed;" +
      "     right:5px;" +
      "     top:5px;" +
      "     background:none;" +
      "     border:none;" +
      "     margin:0px 3px;" +
      "     padding:0px;" +
      "   }" +
      "   div.us-ragna-attr {" +
      "     display:inline-block;" +
      "     background: #eeeeee;" +
      "     border:2px solid #7c7c7c;" +
      "     margin:0px;" +
      "     padding:0px 3px 6px 3px;" +
      "     border-bottom-left-radius: 6px;" +
      "     border-bottom-right-radius: 6px;" +
      "     -webkit-border-bottom-left-radius: 6px;" +
      "     -webkit-border-bottom-right-radius: 6px;" +
      "     -moz-border-radius-bottomleft: 6px;" +
      "     -moz-border-radius-bottomright: 6px;" +
      "   }" +
      "   h2.us-ragna-attr {" +
      "     font-size: 98%;" +
      "     height:19px;" +
      "     display:block;" +
      "     color:#fcfcfc;" +
      "     background:#4f4f4f;" +
      "     border:2px solid #7c7c7c;" +
      "     margin:0px;" +
      "     padding:3px;" +
      "     border-top-left-radius: 6px;" +
      "     border-top-right-radius: 6px;" +
      "     -webkit-border-top-left-radius: 6px;" +
      "     -webkit-border-top-right-radius: 6px;" +
      "     -moz-border-radius-topleft: 6px;" +
      "     -moz-border-radius-topright: 6px;" +
      "   }" +
      "   h2.us-ragna-attr span.us-left {" +
      "     float:left;" +
      "   }" +
      "   h2.us-ragna-attr span.us-right {" +
      "     font-size: 80%;" +
      "     background:#4f4f4f;" +
      "     float:right;" +
      "     margin: 0px 3px 0px 0px;" +
      "     padding:1px 2px;" +
      "     cursor: pointer;" +
      "     border:1px solid #7c7c7c;" +
      "   }" +
      "   h3.us-ragna-attr {" +
      "     font-size: 95%;" +
      "     width:130px;" +
      "     display:block;" +
      "     float:left;" +
      "     color:#4f4f4f;" +
      "     background:#fafafa;" +
      "     border:2px solid #7c7c7c;" +
      "     margin:0px 2px;" +
      "     padding:2px;" +
      "     border-radius: 6px;" +
      "     -webkit-border-radius: 6px;" +
      "     -moz-border-radius: 6px;" +
      "     cursor: pointer;" +
      "   }" +
      "   h3.us-selected {" +
      "     color:#fafafa !important;" +
      "     background:#4f4f4f !important;" +
      "   }" +
      "   ul.us-ragna-attr {" +
      "     width:98%;" +
      "     display:none;" +
      "     margin:0px 0px 1em 0px;" +
      "     padding:2px;" +
      "     line-height:1.45em;" +
      "     border-bottom:1px dotted #7c7c7c;" +
      "     float:right;" +
      "     overflow:visible !important;" +
      "   }" +
      "   li.us-ragna-attr, div.us-ragna-attr-cnt {" +
      "     font-size: 92%;" +
      "     display:inline-block;" +
      "     list-style-type:none;" +
      "     color:#ffffff;" +
      "     background:#999999;" +
      "     margin:1px 5px 0px 0px;" +
      "     padding:0px 3px;" +
      "     white-space: nowrap;" +
      "     border-radius: 4px;" +
      "     -webkit-border-radius: 4px;" +
      "     -moz-border-radius: 4px;" +
      "     cursor: pointer;" +
      "   }" +
      "   li.us-selected {" +
      "     background:#0c7eb2 !important;" +
      "   }" +
      "   td.us-ragna-attr-selected {" +
      "     background:#fcfccc !important;" +
      "   }" +
      "   h2.us-ragna-attr span:hover, h3.us-ragna-attr:hover, li.us-ragna-attr:hover {" +
      "     color:#4f4f4f !important;" +
      "     background:#b4fffb !important;" +
      "   }" +
      "   div#us-ragna-description {" +
      "     position:fixed;" +
      "     right:310px;" +
      "     top:5px;" +
      "     display:none;" +
      "     opacity:0;" +
      "     text-align:center;" +
      "     background:none;" +
      "     border:none;" +
      "     margin:0px;" +
      "     padding:0px;" +
      "   }" +
      "   div#us-ragna-description iframe {" +
      "     overflow:scroll-y;" +
      "   }" +
      "</style>";

      document.getElementsByTagName("head")[0].innerHTML += mystring;
    
    var pageurl = "http://www5.big.or.jp/~seraph/zero/attribute.cgi";
    
    $.ajax({
        method: 'GET',
        url: pageurl,
        success: function (x,status) {
            var parse = document.createElement("div");
            parse.innerHTML = x;
            var mytable = parse.getElementsByTagName("table")[0];
            var json = tableToJson(mytable);
            json = json.sort(sort_by('小分類', true, function(a){return a.toUpperCase()}));
            
            var mystring = "<div id=\"us-ragna-attr-wrapper\"><h2 class=\"us-ragna-attr\"><span class=\"us-left\">Attribute入力サポート</span><span class=\"us-ragna-toggle-sub us-right\">↑↓</span><span id=\"us-ragna-mode\" class=\"us-right us-ragna-description-open\">　入力　</span></h2><div class=\"us-ragna-attr\">";
            var tmp1 = "";
            var tmp2 = "";
            for (var i=0; i < json.length; i++) {
                if (tmp1 == "") {
                    mystring += 
                        "<h3 class=\"us-ragna-attr us-ragna-toggle\">" + json[i].小分類 + "</h3><ul class=\"us-ragna-attr\">" +
                        "<li class=\"us-ragna-attr\" data-id=\"" + json[i].Id + "\">" + json[i].属性名 + "</li>";
                } else if (json[i].大分類 == tmp1 && json[i].小分類 == tmp2) {
                    mystring += 
                        "<li class=\"us-ragna-attr\" data-id=\"" + json[i].Id + "\">" + json[i].属性名 + "</li>";
                } else if (json[i].大分類 == tmp1 && json[i].小分類 !== tmp2) {
                    mystring += 
                        "</ul><h3 class=\"us-ragna-attr us-ragna-toggle\">" + json[i].小分類 + "</h3><ul class=\"us-ragna-attr\">" +
                        "<li class=\"us-ragna-attr\" data-id=\"" + json[i].Id + "\">" + json[i].属性名 + "</li>";
                } else if (json[i].大分類 !== tmp1) {
                    mystring += 
                        "</ul><h3 class=\"us-ragna-attr us-ragna-toggle\">" + json[i].小分類 + "</h3><ul class=\"us-ragna-attr\">" +
                        "<li class=\"us-ragna-attr\" data-id=\"" + json[i].Id + "\">" + json[i].属性名 + "</li>";
                }
                tmp1 = json[i].大分類;
                tmp2 = json[i].小分類;
            }
            mystring += "</ul></div><br style=\"clear:both;\"></div>";
            mystring += "<div id=\"us-ragna-description\"><h2 class=\"us-ragna-attr\"><span class=\"us-left\">Attribute<span id=\"us-ragna-attribute-name\"></span>の説明</span><span class=\"us-ragna-description-close us-right\">　×　</span></h2><div class=\"us-ragna-attr\"><iframe src=\"\"></iframe></div></div>";
            //alert(mystring);
            document.getElementsByTagName("body")[0].innerHTML += mystring;
            
            $("#us-ragna-description iframe").css({"width" : Math.floor($(window).width() - $("#us-ragna-attr-wrapper").width() - 30) });
            $("#us-ragna-description iframe").css({"height" : Math.floor($(window).height() / 1.5) });
            $("#us-ragna-description div").css({
                                           "background-image" : "url(" + img_loader + ")" ,
                                           "background-repeat" : "no-repeat" ,
                                           "background-position" : "center center"
                                           });
        }
    });
    
    $(".us-ragna-toggle, .us-ragna-toggle-sub").live('click', function() {
        var e = $(this);
        if ( $(this).hasClass("us-ragna-toggle-sub") ) {
            e = $(this).parent();
        }
        e.next().toggle(100);
        e.toggleClass("us-selected");
		check_select();
    });
  
    $(".us-ragna-description-close").live('click', function() {
        $(this).parent().parent().css({"opacity": 1}).animate({opacity: "0"},{queue: true, duration: 400, easing: "swing", complete: function(){ $(this).hide() }});
        $(".us-ragna-description-open").removeClass("us-selected");
        $("#us-ragna-mode").html("　入力　");
    });
  
    $(".us-ragna-description-open").live('click', function() {
        $(this).toggleClass("us-selected");
        if ( $("#us-ragna-mode").html() == "　説明　" ) {
            $("#us-ragna-mode").html("　入力　");
        } else {
            $("#us-ragna-mode").html("　説明　");
        }
    });
  
    $("li.us-ragna-attr").live('click', function() {
        if ( $(".us-ragna-description-open").hasClass("us-selected") ) {
            $("#us-ragna-attribute-name").html( "『" + $(this).text() + "』" );
            $("#us-ragna-description iframe").attr("src", "http://www5.big.or.jp/~seraph/zero/attribute.cgi?mode=detail&id=" + $(this).attr("data-id") );
            if ( $("#us-ragna-description:visible").length == 0 ) {
                $("#us-ragna-description").show();
                $("#us-ragna-description")
                    .css({"opacity": 0})  
                    .animate({opacity: "1"},{queue: true, duration: 400, easing: "swing", complete: function(){}});  
            }
        } else {
            var match_str = "select[name=\"attributes\"]";
            var set_value = $(this).html();
      
            for (var i = 0; i < $(match_str).length; i++) {
                if ( $(match_str)[i].selectedIndex == 0) {
                    $(match_str)[i].id = "attr-select";
                    $("#attr-select").val(set_value);
                    break;
                } else {
                    $(match_str)[i].id = "";
                }
            }
			check_select();
        }
    });
	
	function check_select () {
		$("li.us-ragna-attr").removeClass("us-selected");
		$("select[name='attributes'] option:selected").each( function() {
			var str = "li.us-ragna-attr:contains('" + $(this).text() + "')";
			$(str).addClass("us-selected");
		})
	}

}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
    script.addEventListener('load', function() {
      var script = document.createElement("script");
      script.textContent = "(" + callback.toString() + ")();";
      document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

addJQuery(main);
