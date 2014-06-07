// ==UserScript==
// @name       [The Pirate Bay] IMDB Rating Loader
// @namespace  http://make.us/
// @version    0.5
// @description  IMDB Rating Loader for The Pirate Bay
// @match      http://thepiratebay.sx/*
// @copyright  2013+, Makeus
// @require http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

(function($){
  $.isBlank = function(obj){
    return(!obj || $.trim(obj) === "");
  };
})(jQuery);

function parseMovieName(title){
    return title.substring(0, title.indexOf('(') );
}

function parseMovieYear(title){
    return parseInt(title.substring(title.indexOf('(') + 1, title.indexOf(')') ));
}

function showIMDB(){
    $('.imdbRating').each(function(index, obj){
        $(obj).attr('style','');
    });
}

function removeResource(text){
    var ret = text; 
    var regexp1 = /"http:\/\/[-,_a-zA-Z.\/0-9@]*\.(jpg|png|ico|js|gif)"/g;
    ret = ret.replace(regexp1,"\"\"");

    var regexp2 = /"[-_a-zA-Z.\/0-9@]*\.(jpg|png|ico|js|gif)"/g;
    ret = ret.replace(regexp2,"\"\"");

    ret = ret.replace("//d2o307dm5mqftz.cloudfront.net/1000011/1367522023705/300x125-CTA_Logo.jpg","");

    var regexp3 = /"http:\/\/aax-us-east.amazon-adsystem.com\/e\/loi\/imp\?b=[-a-zA-Z0-9]*"/g;
    ret = ret.replace(regexp3,"\"\"");

    return ret;
}

function getImdbLink(text){
    var dom = $.parseHTML( removeResource(text) );
    return $('a[title="IMDB"]', dom).attr('href');
}

function getChName(text, at){
    var dom = $.parseHTML( removeResource(text) );
    var type = $('font.at9[color="#FF0000"]', dom);
    var year = $('font.at9[color="#606060"]', dom);
    var movList = $('a.at11', dom);
    var index = 0;
    for( var aa = 0; aa < movList.length; aa++ ){
        if( "電影" === $(type[aa]).text() && at === parseInt($(year[aa]).text()) ){
            index = aa;
            break;
        }
    }
    
    return {
        name:$.trim( $(movList[index]).text() ),
        link: 'http://search.atmovies.com.tw/search/' + $(movList[index]).attr('href')
    };
}

function getImdbInfo(text){
    var rating = -1;
    var year = -1;
    var name = '';
    if(true){ // jQuery Parser
        var dom = $.parseHTML( removeResource(text) );
        rating = parseFloat( $('.star-box-giga-star', dom).text() );
        var extraName = $('h1.header > span.title-extra', dom);
        if( 0 < extraName.length ){
            var raw_text = extraName.text();
            var indexA = raw_text.indexOf('"');
            var indexB = raw_text.indexOf('"', indexA + 1);
	        name = raw_text.substring(indexA + 1, indexB);
        }else{
	        name = $('h1.header > span.itemprop', dom).text();
            console.log(name);
        }
		year = parseInt( $('h1.header > span.nobr > a', dom).text() );
    }else{ // Custom Parser
        var hhhh = '<div class="titlePageSprite star-box-giga-star">';
        var n = text.indexOf(hhhh,0);
        var m = text.indexOf('</div>\n',n);
        //imdbRating = text.substring(n + hhhh.length, m);
    }
    return {name:name, rating:rating, year:year};
}

function agentIMDB(obj){
    var aTag = $(obj).children('div.detName');
    var ll = aTag.children('a').attr('href');
    $.get(ll, null, function(responseText, textStatus, XMLHttpRequest) {
        var imdbLink = getImdbLink(responseText);
        if(imdbLink){
            $.get(imdbLink, null, function(responseText2, textStatus2, XMLHttpRequest2) {
                var imdbInfo = getImdbInfo(responseText2);
                if(!isNaN(imdbInfo.rating)){
                    aTag.after(
                        '<a target="_blank" style="text-decoration:none;" class="imdbRating" href="' + imdbLink +
                        '"><b style="border-width:1px; border-style:solid; background-color:#FFFF00; color:#000000;">IMDb</b> ' +
                        imdbInfo.rating + '</a>'
                    );
                }
                showAtMovies(imdbInfo, aTag);
            }, 'html');
        }else{
            agentAtMovies(obj);
        }
    }, 'html');
}

var tableAtMovies = {};
tableAtMovies["Hansel & Gretel: Witch Hunters"] = {
    name: '女巫獵人 Hansel and Gretel: Witch Hunters',
    keyword: 'Hansel and Gretel: Witch Hunters',
};
tableAtMovies["Texas Chainsaw 3D"] = {
    name: '德州電鋸殺人狂3D The Texas Chainsaw Massacre 3D',
    keyword: 'The Texas Chainsaw Massacre 3D',
};
tableAtMovies["The Lord of the Rings: The Fellowship of the Ring"] = {
    name: '魔戒首部曲：魔戒現身 The Lord of the Rings:The Fellowship of the Ring',
    keyword: 'The Fellowship of the Ring',
};
tableAtMovies["Lock, Stock and Two Smoking Barrels"] = {
    name: '兩根槍管 Lock,Stock and Two Smoking Barrels',
    keyword: 'Lock,Stock and Two Smoking Barrels',
};
tableAtMovies["Lincoln"] = {
    name: '林肯 Lincoln',
    keyword: 'Lincoln',
    index: 2,
    link: 'http://search.atmovies.com.tw/search/redirect.cfm?p=F&d=flen20443272'
};

function searchAtMovies(movie, cb){
    if( tableAtMovies[movie.name] && tableAtMovies[movie.name].link ){ // Use the data in table directly.
        cb(tableAtMovies[movie.name]);
    }else if( !$.isBlank(movie.name) ){
        // Convert the keyword for searching from table.
        var searchTerm = (tableAtMovies[movie.name] ? tableAtMovies[movie.name].keyword : movie.name );
        $.post('http://search.atmovies.com.tw/search/search.cfm',{
            type:'F',
            search_term:searchTerm,
            search:'%E6%8F%90%E4%BA%A4',
            action:'home',
            fr:'search'}, function(responseText, textStatus, XMLHttpRequest) {
                var chName = getChName(responseText, movie.year);
                if( !$.isBlank(chName.name) ){
                    cb(chName);
                }else if(tableAtMovies[movie.name]){
                    // Use lookup table to hadle exceptions.
                    cb(tableAtMovies[movie.name]);
                }else{
                    cb(null);
                }
            });
    }
}

function showAtMovies(imdbInfo, aTag){
	searchAtMovies(imdbInfo, function(movie){
        aTag.children('a').
        after('<a style="text-decoration:none;" target="_blank" href="' + movie.link + '"> ' + 
              '<b style="color:#000000; ">開眼</b>' + 
              '<span style="color:#008800;">[' + movie.name + ']</span></a>');
    });
}

function agentAtMovies(obj){
    var aTag = $(obj).children('div.detName');
    var title = aTag.children('a').text();
    var movieName = parseMovieName(title);
    var movieYear = parseMovieYear(title);
    showAtMovies({name:movieName, year:movieYear}, aTag);
}

var items = $('tbody > tr > td:nth-child(2)'), count = items.length;
items.each(function(as, obj){
    //agentAtMovies(obj);
    agentIMDB(obj);
});
