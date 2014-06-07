// ==UserScript==
// @name	TiebaAdCleaner
// @author	Eric <reallyimeric@gmail.com>
// @icon	http://en.gravatar.com/userimage/46203070/a22dfc4a57c9cd9748cd887038258765.png?size=200
// @version	1.3.1-20140423
// @updateURL   http://userscripts.org/scripts/source/189084.meta.js
// @downloadURL http://userscripts.org/scripts/source/189084.user.js
// @description	去除贴吧上各种各样的令人讨厌的东西
// @include	http://tieba.baidu.com/*
// ==/UserScript==

var n=0
var type=new Array()
var object_name=new Array()
var found=new Array()

function show_debug_info()
{
    var i,message=""
    for(i=0;i<n;i++)
    {
        message+=type[i]+" "+object_name[i]+" "+found[i]+"\n"
    }
    alert(message)
}

GM_registerMenuCommand("TiebaAdCleaner调试信息",show_debug_info,"d")

function cleaner(name,num)
{
    if(num<0)
    {
        type[n]="ID"
        object_name[n]=name
        if(child=document.getElementById(name))
        {
            found[n]=1
            child.parentNode.removeChild(child)
        }
        else
        {
            found[n]=0
        }
    }
    else
    {
        type[n]="CLASS"
        object_name[n]=name+"["+num+"]"
        if(child=document.getElementsByClassName(name)[num])
        {
            found[n]=1
            child.parentNode.removeChild(child)
        }
        else
        {
            found[n]=0
        }
    }
    n++
}

function working()
{
    /*cleaner("lucky_lottery",-1)
    cleaner("ssq_lottery",-1)
    cleaner("game_rank",-1)
    cleaner("time_gift_title",0)
    cleaner("time_gift_area",0)
    //cleaner("rand_gift",0)
    cleaner("j_ten_years",-1)
    cleaner("search_button_wrapper",-1)
    cleaner("game_spread_thread","all")
    cleaner("lot_wrap",0)
    cleaner("aside_ad",-1)
    cleaner("cproshow",-1)
    cleaner("rich_rank_mod",0)
    cleaner("game_rank_in_head",0)
    cleaner("gameListArea",-1)
    cleaner("gameRankArea",-1)
    cleaner("game_frs_head",-1)
    cleaner(" j_tbnav_tab ",4)
    cleaner("v2_tab",8)
    cleaner("pb_adbanner",-1)*/
    
    cleaner("u_wallet",0)
    cleaner("u_app",0)
    cleaner("u_tbmall",0)
    cleaner("u_tshow",0)
    cleaner("split",0)
    cleaner("split",0)
    cleaner("split",0)
    cleaner("tbmall_score_region",-1)
    cleaner("sign_title_text_bright",0)
    cleaner("cont_sign_banner",0)
    cleaner("pre_icon_wrap pre_icon_wrap_theme2 ",0)
    cleaner("profile_right user_score",0)
    cleaner("profile_right user_tbmall",0)
    cleaner("profile_bottom",0)
    cleaner("poster_rewards",0)
    cleaner("poster_rewards_detail",-1)
    cleaner("poster_rewards_disabled",-1)
    cleaner("edui-btn edui-btn-medal",0)
    cleaner("share_btn_wrapper",0)
    cleaner("tbui_fbar_props",0)
        
    found[n]=0
    type[n]="nav"
    object_name[n]="游戏"
    if(c=document.getElementsByClassName("j_tbnav_tab")){
      for(cn=0;cn<c.length&&found[n]==0;cn++){
	if(c[cn].innerHTML.search(/游戏/)!=-1){
	  c[cn].parentNode.removeChild(c[cn])
	  found[n]=1
	}
      }
    }
    n++
        
    found[n]=0
    type[n]="nav"
    object_name[n]="群组"
    if(c=document.getElementsByClassName("j_tbnav_tab")){
      for(cn=0;cn<c.length&&found[n]==0;cn++){
	if(c[cn].innerHTML.search(/群组/)!=-1){
	  c[cn].parentNode.removeChild(c[cn])
	  found[n]=1
	}
      }
    }
    n++
        
    found[n]=0
    type[n]="nav"
    object_name[n]="转转秀"
    if(c=document.getElementsByClassName("j_tbnav_tab")){
      for(cn=0;cn<c.length&&found[n]==0;cn++){
	if(c[cn].innerHTML.search(/转转秀/)!=-1){
	  c[cn].parentNode.removeChild(c[cn])
	  found[n]=1
	}
      }
    }
    n++
}
setTimeout(working,1500)