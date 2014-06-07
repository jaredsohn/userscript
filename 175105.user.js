// ==UserScript==
// @name        DoubanReplyNewFollower
// @namespace   http://www.douban.com
// @version     0.2
// @description Add Markdown support to douban
// @match       http://www.douban.com/contacts/rlist*
// @author      http//huisecheng.com
// ==/UserScript==

$(document).ready(function() {

  localStorage.DoubanReplyNewFollowerMsg = localStorage.DoubanReplyNewFollowerMsg || "谢谢关注！"
  var msg = localStorage.DoubanReplyNewFollowerMsg

  var userList = $('.user-list li');
  if(!userList.length) {
      return;
  }
  var currentUserList = userList.filter('.current')

  var rPeopleLink = /^http:\/\/www.douban.com\/people\//;
  userList.each(function() {
    var user = {}
    var dom = $(this)
    dom.find('a').each(function() {
      var link = $(this).attr('href')
      if(rPeopleLink.test(link)) {
        user.url = link
      }
    })
    if(!user.url) {
      return
    }
    dom.find('.info').append(createForm(user.url))
  })


  function createForm (url) {
    var form = $('<form method="POST" action="' + url + 'board" style="padding-bottom:20px;margin:10px 0 0 0;">')
    form.append('<input type="hidden" value="'+ get_cookie('ck') +'" name="ck">')
    form.append('<input style="width: 80%;" value="'+msg+'" name="bp_text">')
    form.append('<input type="submit" value=" 留言 " name="bp_submit">')

    var container = $('<div>')
    container.append(form)

    form.submit(function(e) {
      e.preventDefault()
      $.ajax({
        type: 'post',
        url: url+'/board',
        dataType: 'text',
        data: form.serialize(),
        success: function (data) {
          container.html('done')
        }
      })
      form.find('input').attr('disabled', 'disabled')
    })
    return container
  }


  var aside = $('.aside')
  var pluginSettingForm = $('<div class="mod plugin-setting-form">')
  pluginSettingForm.append('<h2>猫司令の批量回复插件の设置</h2><legend style="margin-bottom: 3px;">默认文案:</legend>')
  var defaultReplyTextarea = $('<textarea style="width: 97%; height:100px; margin-bottom: 5px;"></textarea>')
  defaultReplyTextarea.val(msg)
  pluginSettingForm.append(defaultReplyTextarea)
  var updateReplyBtn = $('<span class="bn-flat"><input type="button" value="更新"></span>')
  pluginSettingForm.append(updateReplyBtn)
  var updatedHint = $('<p style="color: #666;display:none;">更新成功，刷新后默认文案即被修改</p>')
  pluginSettingForm.append(updatedHint)
  updateReplyBtn.one('click', function() {
    localStorage.DoubanReplyNewFollowerMsg = defaultReplyTextarea.val()
    updatedHint.show()
  })

  aside.prepend(pluginSettingForm)

})
