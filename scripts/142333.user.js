// ==UserScript==
// @name              Wykopowy atencjomentr
// @namespace         http://wykop.pl/ludzie/sylwke3100
// @description       Oblicza poziom atencji dla danego wpisu
// @author            Sylwke3100
// @version           0.1.1
// @include 	      http://www.wykop.pl/wpis/*
// @grant	      none
// @run-at            document-end
// ==/UserScript==

	
function main() {
	
	function round(number,x)
{
    var x = (!x ? 2 : x);
    return Math.round(number*Math.pow(10,x)) / Math.pow(10,x);
}
    if(parseInt(document.URL.search('wpis'))>0)
    {
        var r = 0,authors=new Array(),on,m=0;
        var cnt = new Array(1,0,0,0,0,0),tags= new Array();
        $.ajax(
        {
        url: 'http://www.wykop.pl/mikroblog/',
        }).success(function(result)
        {
            $(result).find('.lheight22 a').each(function()
            {
                
                tags[m]=$(this).text();
                m++;
            });
        });
	var plus_author = 0;
	var cout_author = 1;
        $('ul.activitiesStream').find('blockquote').each(function()
        {
            authors[r] = $(this).find('strong.fbold').text()
                         var value=$(this).find('p').text();
			 //plus_author+=parseInt($(this).find('span.fright span').text());
            if(r>0)
            {
                if(authors[r]==authors[0] && parseInt(value.search('komentarz usunięty'))==-1)
                {
                    cnt[0]++;
                    for(var i=0; i<m; i++)
                      if(parseInt(jQuery.inArray('#'+m[i],tags))>-1)cnt[5]++;
		      var wyn = (parseInt($(this).find('span.fright span').text()));
		      if (wyn!=NaN){ 
		      cout_author+=1;
		      plus_author+=wyn;}
                }
                else
                {
                    if(parseInt(value.search('komentarz usunięty'))==-1){
                    if($(this).find('a').attr('class')=='color-5')cnt[1]++;
                    if($(this).find('a').attr('class')=='color-2')cnt[1]++;
                    if($(this).find('a').attr('class')=='color-1')cnt[2]++;
                    if($(this).find('a').attr('class')=='color-0')cnt[3]++;
                    if($(this).find('a').attr('class')=='color-1002')cnt[3]++;
		    if($(this).find('a').attr('class')=='color-1001')cnt[3]++;
                    if(parseInt(value.search('@'+authors[0]))>-1)cnt[4]++;
                    }
                }
            } else {
		on = this;
		var wyn = (parseInt($(this).find('span.fright span').text()));
		if (wyn!=NaN){ 
		      cout_author+=1;
		      plus_author+=wyn;}
	    }
            r++
        });
	var avpl = plus_author/cout_author;
        var atencja = (cnt[3]*0.1)+(cnt[2]*0.2)+(cnt[1]*0.3)+(cnt[4]*0.4)+(cnt[5]*0.25)+(avpl*0.25)/(cnt[0]*0.6);
        $(on).find('small.small').text($(on).find('small.small').text()+' (poziom atencji: '+round(atencja,2)+' )');
    }
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.setAttribute("type", "text/javascript");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
	
}

if (window.addEventListener) {
	window.addEventListener('load', function() { addJQuery(main); }, false);
} else {
	addJQuery(main); 
}



