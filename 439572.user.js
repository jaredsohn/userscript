// ==UserScript==
// @name       Coursera 中文字幕下载
// @description  下载 Coursera 课程的中文字幕
// @match      https://class.coursera.org/*
// @version    1.0
// @auther     新浪微博: @糖醋陈皮
// ==/UserScript==


// 用了各种方法想让页面完全载入后再执行下面的代码, 但是都不行. 
// 最终还是setTimeout搞定了...


setTimeout(function() {
// setTimeour Start
    
    
    
    
    var matches = document.querySelectorAll("ul.course-item-list-section-list li.viewed  , ul.course-item-list-section-list li.unviewed");
    // 每一行都是一个<li>, 所以我们先获取到全部的<li>
    
    
    for (var i = 0, li; li = matches[i]; i++) {
    // for loop Start
      
        
        
        
        // ---------------------------------------------------------------------------------------------
        //
        // 拿到 ul -> li -> a 的 data-lecture-id 和 href 属性
        // 拼接出字幕的url
        // 
        // ---------------------------------------------------------------------------------------------
        
        var a = li.querySelector("a");
        // 拿到每个 <li> 里的那个 <a>
        
        var id = a.getAttribute("data-lecture-id");
        // 拿到 <a> 的 data-lecture-id 属性
        
        var href = a.getAttribute("href");
        // 拿到 <a> 的 href 属性
        
        var processed_url = href.replace(/[\/][0-9]+/g, '');
        // 举例:                 https://class.coursera.org/basicwriting-003/lecture/33 
        // 经过这一步之后会变成: https://class.coursera.org/basicwriting-003/lecture
        
        
        var zh_subtitle_url = processed_url + "/subtitles?q=" + id+ "_zh";
        // 拼接出中文字幕地址.
        // https://class.coursera.org/basicwriting-003/lecture/subtitles?q=33_zh
        
        
        
        // ---------------------------------------------------------------------------------------------
        //
        //  现在字幕地址已经有了，下面只需要给右边加个下载按钮就好了。
        // 
        // ---------------------------------------------------------------------------------------------
        
        var rightside_div = li.querySelector("div.course-lecture-item-resource");
        // 右边那些图标都是装在: <div class="course-lecture-item-resource">  ................. </div> 里, 所以我们先获取到它.
        
        
        var download_icon = document.createElement('a');
        download_icon.setAttribute('href', zh_subtitle_url);
        download_icon.setAttribute('target', "_blank");
        // 创建个<a>, 然后设置下 href 和 target 属性.
        
        var createAText = document.createTextNode("下载中文字幕");
        download_icon.appendChild(createAText);
        // 给 <a> 创建个文本节点并添加上去.
        
        var the_a = li.querySelector("div.course-lecture-item-resource a");
        var the_a_parent = the_a.parentNode;
        the_a_parent.insertBefore(download_icon, the_a);
        // 上面这段是为了把 <a> 添加到页面的右边.
        
        
        
    }// for loop End
    
    


    
    
// setTimeout End
}, 1000);
