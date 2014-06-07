// ==UserScript==
// @name        baozoumanhua
// @namespace   dabei
// @version    2.0
// @description 快捷设置帖子发布时间
// @match http://admin2.baozoumanhua.com/*
// @copyright   2012+, You
// ==/UserScript==
//引入jquery-ui库
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// the guts of this userscript
function main() {
  function add_edit_link() {
      //引入jquery-ui.css
      $("<link href='http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/black-tie/jquery-ui.min.css' media='screen' rel='stylesheet' type='text/css' />").appendTo($("head"));
     //初始化修改帖子的dialog
    
      var $dialog = $('<div></div>')
			.html('<div class="dialog">\
                  <form accept-charset="UTF-8" action="/admin/articles/1" class="edit_article" enctype="multipart/form-data" id="edit_article_" method="post" >\
                  id<input size="12"  type="text" class="search-query article_id" /><br />\
                  通过时间<input size="25" name="article[published_at]" type="text" class="search-query published_at" />\
                  alt_score<input size="25" name="article[alt_score]" type="text" class="search-query alt_score" />\
                  pos_score<input size="25" name="article[pos_score]" type="text" class="search-query pos_score" />\
                  neg_score<input size="25" name="article[neg_score]" type="text" class="search-query neg_score" />\
                  status<input size="25" name="article[status]" type="text" class="search-query status" />\
                  <input type="submit" value="Edit" class="submit"></input>\
                  </fomr>\
                  </div>')
			.dialog({
				autoOpen: false,
				title: '修改帖子',
                draggable: true
			});
      
		//点击修改帖子，初始化输入框内帖子的数值
      
		$('.opener').live("click",function() {
			$dialog.dialog('open');
            var article = $(this).parents("li.entry-item:first");
            var article_id = article.attr("id").split("-")[1];
            $(".dialog .article_id").val(article_id);
            var dislog_form = $(".dialog form");
            dislog_form.attr("action","/admin/articles/"+article_id+".json");
            $.ajax({
              type: "GET",
              url: "/articles/"+article_id+".json?time="+(new Date().getTime()),
             // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
             // data: params,
              dataType: 'json', // format of the response
                success: function(msg) {
                    dislog_form.find("input[name='article[alt_score]']").val(msg.alt_score);
                    dislog_form.find("input[name='article[published_at]']").val(msg.published_at);
                    dislog_form.find("input[name='article[pos_score]']").val(msg.pos);
                    dislog_form.find("input[name='article[neg_score]']").val(msg.neg);
                    dislog_form.find("input[name='article[status]']").val(msg.status);
               }
             })
			return false;
		});
      //点击Edit，提交数据
      $(".dialog input.submit").live("click",function(){
          var form =  $(".dialog form");
          var params = {};
          
          $.each(["article[alt_score]","article[pos_score]","article[neg_score]","article[published_at]","article[status]"], function(i, item){
              if($("input[name='" +item+"']").val().trim().length > 0 ){
                 params[item] = $("input[name='" +item+"']").val();
              }
          });
          params["_method"] = "PUT";
          params["authenticity_token"] = $('meta[name="csrf-token"]').attr('content');
         
          $.ajax({
              type: "PUT",
              url: form.attr("action"),
              beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
              data: params,
              dataType: 'json', // format of the response
              success: function(msg) {
                //关闭修改dialog
                $dialog.dialog('close');
                var text="帖子的属性已经被修改为：<br />";
                text+="alt_score" + msg.alt_score+"<br />";
                text+="顶" + msg.pos+"<br />";
                text+="拍" + msg.neg+"<br />";
                text+="发布时间" + msg.published_at+"<br />";
                  text+="状态" + msg.status+"<br />";
                  text+="alt_score" + msg.alt_score+"<br />";
                //显示修改结果的dialog
                var $dialog2 = $('<div></div>').html(text).dialog({}).dialog('open');
                return false;
              }
         });
          return false;
      });
      $("<a href='#' class='opener'>修改帖子</a>").appendTo($("#entry-list-ul li.entry-item .sticky-items"));

  }
  $(document).ready(function(){
    add_edit_link();
  })
}

// load jQuery and execute the main function
addJQuery(main);