// ==UserScript==
// @name           Basil Post#s
// @namespace      basilmarket
// @description    Displays the post numbers in basil posts. No point really
// @include        http://www.basilmarket.com/forum/*
// @include        http://www.basilmarket.com/show/screen/*
// @include        http://www.basilmarket.com/show/video/*
// @include        http://www.basilmarket.com/show/listing/*
// ==/UserScript==

function getTagsByClass(parent, tag_name, class_name) {
	var tags = parent.getElementsByTagName(tag_name);
	if(class_name == '')
		return tags;
	var out = new Array();
	for(i=0;i<tags.length;i++){
		if(tags[i].className==class_name)
			out.push(tags[i]);
	}
	return out;
}

var postHeaders = getTagsByClass(document, 'div', 'rf small normal');
for(i=0;i<postHeaders.length;i++)
{
	var tmp = postHeaders[i].getElementsByTagName('div');
	for(j=0;j<tmp.length;j++)
	{
		if(tmp[j].className=='postplus')
		{
			var re = new RegExp('(\\d+)');
			var m = re.exec(tmp[j].id);
			postHeaders[i].innerHTML = "<span class=\"sbadge sbc6\">No.<a href=\"" + window.location.toString().replace(/#.*/,'') + '#' + m[0] + "\">" + m[0] + "</a></span>" + postHeaders[i].innerHTML;
			break;
		}
	}
}