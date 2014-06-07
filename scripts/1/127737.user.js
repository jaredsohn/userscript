// ==UserScript==
// @name        ipeen
// @namespace   ipeen_pick
// @include     http://www.ipeen.com.tw/search/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// ==/UserScript==

var txt="";
for(var i=0;i<$(".serShop").length;i++)
{
	if(i==0){continue;}
	var store_name=$(".serShop").eq(i).find("h3 a").html();
	var store_tel="http://www.ipeen.com.tw"+$(".serShop").eq(i).find(".serData img").attr("src");
	var store_addr=$(".serShop").eq(i).find(".serData .basic span").html().replace(/\<a.*/ ,"");
	var store_cost=$(".serShop").eq(i).find(".serData .costEmpty").html();

	var store_cate_obj=$(".serShop").eq(i).find(".serData .cate a");
	var store_cate="";
	for(var j=0;j<store_cate_obj.length;j++)
	{	
		store_cate+=(store_cate=="") ? store_cate_obj.eq(j).html() : "/"  +store_cate_obj.eq(j).html();
	}	
	
	
	
	txt+="<tr>";
	txt+="<td>"+store_name+"</td>"+"<td><img src='"+store_tel+"' border='0'></td>"+"<td>"+store_cost+"</td>"+"<td>"+store_cate+"</td>"+"<td>"+store_addr+"</td>";
	txt+="</tr>";
	

}








//var out_txt="<!DOCTYPE html><html lang=\"zh-tw\" ><head><meta charset=\"utf-8\"/></head><body><table>"+txt+"</table></body>";
var out_txt="<div><table>"+txt+"</table></div>"
$("hgroup ").after(out_txt);
