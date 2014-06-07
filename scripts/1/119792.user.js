// ==UserScript==
// @name           隐藏MSDN里的代码成员
// @description	   在MSDN里，提供两个下拉列表，控制是否隐藏、淡化继承的成员的受保护的成员。
// @namespace      http://blog.csdn.net/gqqnb
// @include        http://msdn.microsoft.com/*/library/*
// @include        http://msdn.microsoft.com/query/dev*
// ==/UserScript==

var localizedStrings=
	{
		classIdentifier:"类",
		toInheritedMembers:"对于继承的成员：",
		toProtectedMembers:"对于受保护的成员：",
		actions: ["正常","隐藏","变淡"]
	};

function onChange(value,target)
{
	var tables = document.getElementsByClassName("members");
	for (var i = 0; i < tables.length; i++)
	{
		var table = tables[i];
		if (table.tagName == "TABLE")
		{
			for (var j = 0; j < table.rows.length; j++)
			{
				var row = table.rows[j];
				var data = row.getAttribute("data");
				if (data && data.indexOf(target) != -1 )
				{
					if(value=="fade")
					{
						row.style.display="";
						row.style.opacity = 0.2;
					}
					else if(value=="hide")
					{
						row.style.display="none";
						row.style.opacity=1;
					}
					else
					{
						row.style.opacity = 1;
						row.style.display="";
					}
				}
			}
		}
	}
}


var topic=document.getElementsByClassName("topic")[0];
var title=document.getElementsByClassName("title")[0];

var titleText=title.childNodes[0].nodeValue;

function canApply()
{
	var index=titleText.lastIndexOf(localizedStrings.classIdentifier);
	if(index!=-1 && index==titleText.length-localizedStrings.classIdentifier.length)
		return true;

	index=titleText.lastIndexOf("Class");
	if(index!=-1&& index==titleText.length-"Class".length)
		return true;

	return false;
}

if(canApply()==false)
	throw 1;

var bar=document.createElement("div");

bar.appendChild(document.createTextNode(localizedStrings.toInheritedMembers));
var select=document.createElement("select");
select.setAttribute("id","inheritCtrl");

var values=["normal","hide","fade"];
for(var i=0;i<values.length;i++)
{
	var option=document.createElement("option");
	option.setAttribute("value",values[i]);
	option.appendChild(document.createTextNode(localizedStrings.actions[i]));
	select.appendChild(option);
}
select.addEventListener("change",function (e){onChange(e.target.value,"inherited");});

bar.appendChild(select);
bar.appendChild(document.createTextNode(localizedStrings.toProtectedMembers));

select=document.createElement("select");
select.setAttribute("id","protectedCtrl");
for(var i=0;i<values.length;i++)
{
	var option=document.createElement("option");
	option.setAttribute("value",values[i]);
	option.appendChild(document.createTextNode(localizedStrings.actions[i]));
	select.appendChild(option);
}
select.addEventListener("change",function(e){onChange(e.target.value,"protected");});
bar.appendChild(select);

topic.insertBefore(bar,title);

