// ==UserScript==
// @name           Wallbase Images More Tags Viewer
// @description    Increases number of tags shown on a wallpaper from 2 to 2 rows of tags
// @include http://wallbase.cc/wallpaper/*
// ==/UserScript==







function addTags(tag,tags,hei){
    var he;
    $(".tags-sub li.item.eS").each(function(){
        he=tags.height();
        if($(this).attr("class").indexOf("tag_")!=-1 && he<=hei*2){
            var tg=tag.clone();
            tg.find(".tag-a").attr("title", $(this).find(".item-a").text());
            tg.find(".tag-a").text($(this).find(".item-a").text());
            tg.find(".tag-a").attr("href",$(this).find(".item-a").attr("href"));
            tg.find(".tag-stats").attr("href", $(this).find(".t-info").attr("href"))
            tg.find(".tag-x").attr("tid", $(this).find(".t-x").attr("tid")).click(sub);
            tg.find(".tag-a").attr("class", $(this).find(".item-a").attr("class")).removeClass("item-a").addClass("tag-a").removeClass("eS");
            tags.append(tg);     
        }
    });
    if(he>hei*2){
        tags.children().slice(tags.children().length-2,tags.children().length).remove();
    }
    tags.append(tags.children(".tag-more-wrap"));


} 
 
 
 
 
 
 
 
if($("div .row.tag").length!=0 && $(".tag-more").text() != "MORE"){
    var tag=$("div .row.tag").first().clone();
    var tags=$("div .row.tag").first().parents(".l2");
    var max_width=Math.round($(".bar-right").position().left+$(".sub-right").position().left);
    var hei=tags.height();
    tags.css("max-width",max_width+"px");
    $("div .row.tag").remove();
    addTags(tag,tags,hei);
  //  sub();
}

function sub(){
			
				var $this = $(this);
				var tid = parseInt($this.attr('tid'));

				$.ajax(
				{
					type: "GET",
					url: "index.php/wallpaper/delete_tagset/" + opt.wid + "/" + tid,
					dataType: 'json',
					success: function(m) 
					{
						if(m.status == 1)
						{
							if($('.centr .l2 > .tag_'+tid).length > 0 && $('.tags-sub .taglist .item').length >= 3)
							{
								var $x = $('.tags-sub .taglist .item:nth-child(3)');

								var id = $x.find('.t-x').attr('tid');
								var title = $x.find('.item-a').text();
								var purity = $x.find('.item-a').attr('class').substring(13);
								
								$('.centr .l2 .tag-more-wrap').before('<div class="row tag tag_'+id+' clr"><div class="tag-wrap"><span class="icn">&#xe70c;</span><a href="search?tag='+id+'" title="'+title+'" class="tag-a pur'+purity+'">'+title+'</a><div class="opts"><a href="javascript:;" class="tag-x" tid="'+id+'"><span class="wallpaper-tag-x"></span></a><a href="tags/info/'+id+'" class="tag-stats"><span class="wallpaper-tag-stats"></span></a></div></div></div>');
							}

							$('.centr .tag_'+tid).remove();

							if($('.centr .l2 .tag').length == 0)
							{
								$('.centr .l2').prepend('<span class="notags">No tags added &nbsp;</span>');
							}
							$this.parents(".tag-wrap").parent().remove();
						}
						else
							console.log('Error: ', m.error);
					}
				});
}


