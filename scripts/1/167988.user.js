// ==UserScript==

// @name          OverBlog To WordPress WXR

// @namespace     http://www.webmonkey.com

// @description   OverBlog To WordPress WXR exporter

// @include       http://xxxxxxx.over-blog.com/tag/*
// ==/UserScript==


// ------------------------------------------------------------------
// DOC
// ------------------------------------------------------------------
//	Export the visibles over-blog articles to wordpress wxr xml file
// 	To export all the blog need to go from page to page
// Tips : To minimize the number of pages to export increase your number of articles by pages in over-blog settings
// Due to the fact that greasemonkey can't create files. You have to get the result displayed in the dialog box (Ctrl-C), to put it in a text editor (Ctrl-V) in notepad for example, and to save the file (yourname.xml)
// You can now import the created file in wordpress using wordpress importer tool
// Images are not imported. So you have to manage this point by yourself. Some tools exist to do that or download them one by one.
// To that the generated datas can be imported in all blogs platforms that support wxr .xml file import!!


// ------------------------------------------------------------------
// BUGS
// ------------------------------------------------------------------
// !!In wordpress when you import images '--' encouter are converted to '-'
// !!Two articles can't have the same name in overblog
// !!Bug some times in algorithm to transform path of the images => Need to check over-blog still in the created wxr doc


// ------------------------------------------------------------------
// Known limitations:
// ------------------------------------------------------------------
// 1) Publications dates are not exported
// 2) Comments are not exported

var nameBlog = "xxxxxx";
var linkBlog = "http://xxxxxxx.wordpress.com";
var auhor = "xxxxxxx";
var mail = "xxxxxx@xxx.xx";

// If empty let the over-blog images link => Need to use a wordpress plugin to get all images
// Else change images to the wordpress directory => Images must habe been copied from over-blog to wordpress
// You can find the path just by checking the link of an uploaded images
var baseUrlImagesWordPress = "http://xxxxxx.files.wordpress.com/xxxxx/xxxxx";

var categorie = document.getElementsByClassName("list-title")[0].innerHTML;
categorie = categorie.split('Articles avec #<strong>')[1];
categorie = categorie.replace('</strong> tag' , "");
//alert(categorie);

var wrl="";
wrl += printHeader(wrl);

var post = document.getElementsByClassName("post hentry");

// Reverse to get import the articles in the right order (from older to sooner)
for(var i = (post.length - 1) ; i >= 0 ; i--) 
{
	var title = post[i].children[0].children [0];
	//var author = post[i].children[1].children [0].children [0].children [0];
	var date = post[i].children[1].children [0].children [1].children [0].children [0];
	var article = post[i].children[2].children [0];
	//alert(article.innerHTML);
    wrl += printArticle(title.innerHTML , linkBlog , i+1 , auhor , categorie , categorie , article.innerHTML , "Sat, 29 Mar 2010 11:24:05 +0000");  
	
	// I should use these methods to get images
	//col = document.selectNodes(document, "./img", article, NULL, )
}


wrl += printFooter(wrl);

copyToClipboard(wrl);


function copyToClipboard (text) 
{
  window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
}


function printHeader()
{
	var wrl = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	wrl += "<rss version=\"2.0\" ";
	wrl += "xmlns:excerpt=\"http://wordpress.org/export/1.2/excerpt/\" ";
	wrl += "xmlns:content=\"http://purl.org/rss/1.0/modules/content/\" ";
	wrl += "xmlns:wfw=\"http://wellformedweb.org/CommentAPI/\" ";
	wrl += "xmlns:dc=\"http://purl.org/dc/elements/1.1/\" ";
	wrl += "xmlns:wp=\"http://wordpress.org/export/1.2/\"";
	wrl += ">\n"

	wrl += "<channel>\n";
	wrl += "<title>" + nameBlog + "</title>\n";
	wrl += "<link>" + linkBlog + "</link>\n";
	wrl += "<description/>";
	wrl += "<pubDate>Sat, 29 Mar 2008 11:24:05 +0000</pubDate>\n";
	wrl += "<language>fr</language>\n";
	wrl += "<wp:wxr_version>1.2</wp:wxr_version>\n";
	
	wrl += "<wp:base_site_url>http://wordpress.com/</wp:base_site_url>\n";
	wrl += "<wp:base_blog_url>" + linkBlog + "</wp:base_blog_url>\n";
	wrl += "<wp:wp_author>\n";
	wrl += "<wp:author_login>" + auhor + "</wp:author_login>\n";
	wrl += "<wp:author_email>" + mail + "</wp:author_email>\n";
	wrl += "<wp:author_display_name><![CDATA[" + auhor + "]]></wp:author_display_name>\n";
	wrl += "<wp:author_first_name><![CDATA[]]></wp:author_first_name>\n";
	wrl += "<wp:author_last_name><![CDATA[]]></wp:author_last_name>\n";
	wrl += "</wp:wp_author>\n";

	wrl += "<generator>http://wordpress.com/</generator>\n\n";

	
	return wrl;
}


function printFooter()
{
	var wrl = "</channel>\n</rss>";
	return wrl;
}


function printComment(num , author , site , date , msg , ref_id)
{
	var wrl = "<wp:comment>\n";
	wrl += 	"<wp:comment_id>" + num + "</wp:comment_id>\n";
	wrl += 	"<wp:comment_author><![CDATA[" + author + "]]></wp:comment_author>\n";
	wrl += 	"<wp:comment_author_email></wp:comment_author_email>\n";
	wrl += 	"<wp:comment_author_url>" + site + "</wp:comment_author_url>\n";
	wrl += 	"<wp:comment_date>" + date + "</wp:comment_date>\n";
	wrl += 	"<wp:comment_content>" + msg + "</wp:comment_content>\n";
	wrl += 	"<wp:comment_approved>1</wp:comment_approved>\n";
	wrl += 	"<wp:comment_type></wp:comment_type>\n";
	wrl += 	"<wp:comment_parent>"+ ref_id +"</wp:comment_parent>\n";
	wrl += 	"</wp:comment>\n\n";
	
	return wrl;
}

function ConvertImagePath(match, p1 , p2, p3 , offset, string){
  var Filename = p2.toLowerCase();
  var regImg = new RegExp('.*(/.*\..*)', 'gi');
  Filename = Filename.replace(regImg,'$1');
  //alert(Filename);
  
  return '<img ' + p1 + 'src="' + baseUrlImagesWordPress + /*"--" +*/ Filename /*+ "--"*/ + '" ' + p3 + ' />'
};


function printArticle(title , site_root , id , author , category_title , category_nicename , message , date)
{
		if(title == "")
			return "";
		
		//var nicetitle = @title.gsub(/\s/,"").downcase()
		var nicetitle = title;
		nicetitle = nicetitle.replace( /\s/g , "-");
		
		today = new Date();
		
		if(baseUrlImagesWordPress == "")
		{
			//Manage images that don't contain / at the end of the tag
			var regImage = new RegExp('<img (.*\")>', 'gi');
			message = message.replace(regImage,'<img $1 />');
		}
		else
		{
			var regImage1 = new RegExp('<img (.*)src="([^"]*)" ([^>]*)>', 'gi'); 
			//var regImage1 = new RegExp('<img (.*)src="(.*)" ([^>]*)>', 'gi'); 

			message = message.replace(regImage1 , ConvertImagePath);
		}
		
		var wrl = "<item>\n";
		wrl += 	 "<title>" + title + "</title>\n";
		//wrl += 	"<link>"+ site_root + category_nicename + "</link>\n";
		//wrl += 	 "<pubDate>" + date + "</pubDate>";
		wrl += 	 "<dc:creator>" + author + "</dc:creator>\n";
		//wrl += 	 "<category><![CDATA["+ category_title +"]]></category>\n";
		wrl += 	 "<guid isPermaLink=\"false\">" + site_root + "/?p=" + id + "</guid>\n";
		wrl += 	 "<description/>";
		wrl += 	 "<content:encoded><![CDATA[" + message + "]]></content:encoded>\n";
		wrl += 	 "<excerpt:encoded><![CDATA[]]></excerpt:encoded>";
		wrl += 	 "<wp:post_id>" + id + "</wp:post_id>\n";
		//wrl += 	 "<wp:post_date>" + today.toGMTString() +"</wp:post_date>\n";
		//wrl += 	 "<wp:post_date_gmt>" + today.toGMTString() +"</wp:post_date_gmt>\n";
		wrl += 	 "<wp:comment_status>open</wp:comment_status>\n";
		wrl += 	 "<wp:ping_status>open</wp:ping_status>\n";
		wrl += 	 "<wp:post_name>" + nicetitle + "</wp:post_name>\n";
		wrl += 	 "<wp:status>publish</wp:status>\n"
		wrl += 	 "<wp:post_parent>0</wp:post_parent>\n"
		wrl += 	 "<wp:menu_order>0</wp:menu_order>\n"
		wrl += 	 "<wp:post_type>post</wp:post_type>\n"
		wrl += 	 "<wp:post_password/>";
		wrl += 	 "<wp:is_sticky>0</wp:is_sticky>";
		wrl += 	 "<category domain=\"category\" nicename=\"" + category_nicename + "\"><![CDATA["+ category_title +"]]></category>\n";
		//wrl += 	 "comments.collect {|c| c.printComment(file) } Ajout des commentaire
		wrl += 	 "</item>\n\n"
		
		return wrl;
}
