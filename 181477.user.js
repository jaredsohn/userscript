// ==UserScript==
// @id             a2lib
// @name           amazon to kobe city libraries
// @version        1.0
// @namespace      net.craftgear.a2lib
// @author         
// @description    
// @include        http://www.amazon.co.jp/*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
var add_link = function(){
  //欲しい物リストで著者名にリンクをつける
  var library_author_search_link = 'https://www.lib.city.kobe.jp/opac/opacs/find_books?AGE=b&ISNUMBER=isbn&author-andor=and&btype=B&dispcnt=50&author=%author%&kanname%5Ball-pub%5D=1&keyword-andor=and&lang=all&searchmode=syosai&sh-andor=and&title-andor=and&id=1'
  var link_author_string = '図書館で著者名を検索する'
  $('.authorPart').each(function(i, e){
    //console.log($(e).html())
	if($(e).html().indexOf(link_author_string) == -1){
        var author = encodeURIComponent($(e).html().trim())
        //console.log(author)
        $(e).append('<a target="blank" href="' + library_author_search_link.replace('%author%', author) + '">' + link_author_string + '</a>')
	}
  })
	
  //個別商品ページでタイトルにリンクをつける
  var library_search_link = 'https://www.lib.city.kobe.jp/opac/opacs/find_books?AGE=b&ISNUMBER=isbn&author-andor=and&btype=B&dispcnt=50&title=%title%&kanname%5Ball-pub%5D=1&keyword-andor=and&lang=all&searchmode=syosai&sh-andor=and&title-andor=and&id=1'
  var link_string = '図書館で検索する'
  var title = $('#btAsinTitle')
  var book_title = title.text()
  //不要な単語を削除する
  book_title = book_title.replace(/\[単行本.*\]|\[新書.*\]|\[文庫.*\]|\[大型.*\]|\(.*\)|［.*］|〈.*〉|～.*|\~.*|　‐.*|―.*/g, '')
  //不要な文字列を半角スペースに変換する
  book_title = book_title.replace(/[！\-―「」\[\]]/g, ' ')
  //console.log(book_title)
  if(title){
      title.children().remove()
      //console.log(title.text())
      title.append(' <a target="blank" href="' + library_search_link.replace('%title%', encodeURIComponent(book_title)) + '">' + link_string + '</a>')
  }
}

document.addEventListener('GM_AutoPagerizeNextPageLoaded', add_link)
add_link()

