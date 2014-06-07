// ==UserScript==
// @name       tieba-supergirls
// @namespace  http://use.i.E.your.homepage/
// @version    1.3
// @description  加强supergirls的贴吧功能：默认按照日期进行帖子排序，可以按照回复进行排序。
// @match      http://tieba.baidu.com/f?kw=supergirls*
// @copyright  2012+, gtt116
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


function main() {
    title_pattern = /SOSI\s*│\s*(\d*)(.*)\s*│\s*.*/i
    
    get_title = function (a) {
        return $(a).find('a.j_th_tit').text()
    }
    
    shuffle = function(sortfunc){
        thread_list = $("#thread_list>li").remove();
        thread_list.sort(sortfunc);
        $('#thread_list').append(thread_list);
    }
    
    sort_by_reply = function(a, b){
        reply_a = $(a).find('.threadlist_rep_num').text();
        reply_b = $(b).find('.threadlist_rep_num').text();
        return reply_a - reply_b;
    }
    
    sort_by_date = function (a, b){
        //如果没有日期，则选择2015年12月31日
        dead_date = '151231'
        try{
            date_a = title_pattern.exec(get_title(a))[1];
        }catch(err)
        {
            date_a = dead_date;
        }
        try{
            date_b = title_pattern.exec(get_title(b))[1];
        }catch(err)
        {
            date_b = dead_date;
        }
        console.log(date_a+'-'+date_b);
        return date_b - date_a;
    }
    
    // Insert pagebar before thread list.
    $('#thread_list').before($('#frs_list_pager').clone());
    
    //直接按照日期排序
    shuffle(sort_by_date);
    
    btn_sort_by_reply = $('<li class="star_nav_good"><a href="#">回复数</a></li>');
    btn_sort_by_reply.click(function(){
        shuffle(sort_by_reply);
    })

    btn_sort_by_date = $('<li class="star_nav_good"><a href="#">日期</a></li>');
    btn_sort_by_date.click(function(){
        shuffle(sort_by_date);
    })
    $('.star_nav_good').after(btn_sort_by_date).after(btn_sort_by_reply);
}

// load jQuery and execute the main function
addJQuery(main);