// ==UserScript==
// @name           Images
// @description    Change a lot of images, like the ranking stars or the country flags
// @include        http://www.cs-manager.com/csm/*
// @include        http://www.cs-manager.com/*
// @include        http://www.cs-manager.com
// ==/UserScript==
var stajl="display:block;margin:auto;";
for(var $=0;(K=document.getElementsByTagName("img")[$]);$++){
    switch(String(K.src).substr(33)){
        case"rank_u.gif":
            K.src="http://img545.imageshack.us/img545/8618/19022121.png";
            break;
        case"rank_n.gif":
            K.src="http://img405.imageshack.us/img405/9882/offlinexq.png";
            break;
        case"rank_d.gif":
            K.src="http://img268.imageshack.us/img268/5240/downh.png";
            break;
        case"report_up.gif":
            K.src="http://img545.imageshack.us/img545/8618/19022121.png";
            break;
        case"report_neutral.gif":
            K.src="http://img405.imageshack.us/img405/9882/offlinexq.png";
            break;
        case"report_down.gif":
            K.src="http://img268.imageshack.us/img268/5240/downh.png";
            break;
        case"training_map.png":
            K.src="http://img69.imageshack.us/img69/3012/trainingroom.png";
            break;
        case"star.gif":
            K.src="http://imageshack.us/a/img20/5247/estrelap.png";
            break;
        case"nation_ar.png":
            K.src="http://th07.deviantart.net/fs71/200H/i/2011/221/1/1/argentina_grunge_flag_by_think0-d1y29ne.jpg";
            break;
        case"nation_at.png":
            K.src="http://th02.deviantart.net/fs70/200H/i/2010/063/8/e/Austria_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_be.png":
            K.src="http://th03.deviantart.net/fs46/200H/i/2009/194/5/3/Belgium_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_br.png":
            K.src="http://th02.deviantart.net/fs71/200H/i/2010/239/c/0/brazil_grunge_flag___brasil_by_think0-d1rqxty.jpg";
            break;
        case"nation_dk.png":
            K.src="http://th01.deviantart.net/fs71/200H/i/2010/040/f/0/Denmark_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_ee.png":
            K.src="http://th02.deviantart.net/fs45/200H/i/2009/057/3/7/Estonia_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_fi.png":
            K.src="http://th01.deviantart.net/fs41/200H/i/2009/019/3/8/Finland_Grungy_Flag_by_think0.jpg";
            break;
        case"nation_fr.png":
            K.src="http://th06.deviantart.net/fs41/200H/i/2009/038/1/3/France_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_de.png":
            K.src="http://th03.deviantart.net/fs70/200H/i/2010/230/a/0/Germany_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_gr.png":
            K.src="http://th08.deviantart.net/fs41/200H/i/2009/013/2/a/Greece_Grungy_Flag_by_think0.jpg";
            break;
        case"nation_il.png":
            K.src="http://th00.deviantart.net/fs41/200H/i/2009/024/c/d/Israel_Grungy_Flag_by_think0.jpg";
            break;
        case"nation_lv.png":
            K.src="http://th05.deviantart.net/fs48/200H/i/2009/187/c/9/Latvia_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_nl.png":
            K.src="http://th07.deviantart.net/fs43/200H/i/2009/122/2/8/Netherlands_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_no.png":
            K.src="http://th05.deviantart.net/fs48/200H/i/2009/169/7/7/Norway_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_pl.png":
            K.src="http://th06.deviantart.net/fs41/200H/i/2009/024/a/8/Poland_Grungy_Flag_by_think0.jpg";
            break;
        case"nation_pt.png":
            K.src="http://th07.deviantart.net/fs70/200H/i/2011/124/b/f/portugal_grunge_flag_by_think0-d1sq5rt.jpg";
            break;
        case"nation_ro.png":
            K.src="http://th05.deviantart.net/fs41/200H/i/2009/007/0/4/Romanian_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_ru.png":
            K.src="http://th03.deviantart.net/fs70/200H/i/2010/147/e/a/Russia_Grungy_Flag_by_think0.jpg";
            break;
        case"nation_es.png":
            K.src="http://th09.deviantart.net/fs71/200H/i/2010/192/f/3/Spain_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_se.png":
            K.src="http://th05.deviantart.net/fs41/200H/i/2009/055/2/7/Sweden_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_ch.png":
            K.src="http://th03.deviantart.net/fs45/200H/i/2009/125/7/d/Switzerland_Grunge_Flag_by_think0.jpg";
            break;
        case"nation_uk.png":
            K.src="http://th07.deviantart.net/fs71/200H/i/2012/209/e/2/great_britain_uk_grunge_flag_by_think0-d1svcw5.png";
            break;
        case"nation_us.png":
            K.src="http://th00.deviantart.net/fs71/200H/f/2010/147/3/3/33ae254690bb094680f1e77acb07cefd.jpg";
            break;
        case"nation_cc.png":
            K.src="http://th05.deviantart.net/fs42/200H/i/2009/111/c/7/European_Union_Grunge_Flag_by_think0.jpg";
            break;
            
            
            
        case"flags/ar.png":
            K.src="http://www.fnatic.com/public/img/flags/ar.gif";
            break;
        case"flags/at.png":
            K.src="http://www.fnatic.com/public/img/flags/at.gif";
            break;
        case"flags/be.png":
            K.src="http://www.fnatic.com/public/img/flags/be.gif";
            break;
        case"flags/br.png":
            K.src="http://www.fnatic.com/public/img/flags/br.gif";
            break;
        case"flags/dk.png":
            K.src="http://www.fnatic.com/public/img/flags/dk.gif";
            break;
        case"flags/ee.png":
            K.src="http://www.fnatic.com/public/img/flags/ee.gif";
            break;
        case"flags/fi.png":
            K.src="http://www.fnatic.com/public/img/flags/fi.gif";
            break;
        case"flags/fr.png":
            K.src="http://www.fnatic.com/public/img/flags/fr.gif";
            break;
        case"flags/de.png":
            K.src="http://www.fnatic.com/public/img/flags/de.gif";
            break;
        case"flags/gr.png":
            K.src="http://www.fnatic.com/public/img/flags/gr.gif";
            break;
        case"flags/il.png":
            K.src="http://www.fnatic.com/public/img/flags/il.gif";
            break;
        case"flags/lv.png":
            K.src="http://www.fnatic.com/public/img/flags/lv.gif";
            break;
        case"flags/nl.png":
            K.src="http://www.fnatic.com/public/img/flags/nl.gif";
            break;
        case"flags/no.png":
            K.src="http://www.fnatic.com/public/img/flags/no.gif";
            break;
        case"flags/pl.png":
            K.src="http://www.fnatic.com/public/img/flags/pl.gif";
            break;
        case"flags/pt.png":
            K.src="http://www.fnatic.com/public/img/flags/pt.gif";
            break;
        case"flags/ro.png":
            K.src="http://www.fnatic.com/public/img/flags/ro.gif";
            break;
        case"flags/ru.png":
            K.src="http://www.fnatic.com/public/img/flags/ru.gif";
            break;
        case"flags/es.png":
            K.src="http://www.fnatic.com/public/img/flags/es.gif";
            break;
        case"flags/se.png":
            K.src="http://www.fnatic.com/public/img/flags/se.gif";
            break;
        case"flags/ch.png":
            K.src="http://www.fnatic.com/public/img/flags/ch.gif";
            break;
        case"flags/uk.png":
            K.src="http://www.fnatic.com/public/img/flags/uk.gif";
            break;
        case"flags/us.png":
            K.src="http://www.fnatic.com/public/img/flags/us.gif";
            break;
        case"flags/cc.png":
            K.src="http://www.fnatic.com/public/img/flags/wo.gif";
            break;
        case"flags/eu.png":
            K.src="http://www.fnatic.com/public/img/flags/wo.gif";
            break;
            
            
            
        case"flag_ar.png":
            K.src="http://www.fnatic.com/public/img/flags/ar.gif";
            break;
        case"flag_at.png":
            K.src="http://www.fnatic.com/public/img/flags/at.gif";
            break;
        case"flag_be.png":
            K.src="http://www.fnatic.com/public/img/flags/be.gif";
            break;
        case"flag_br.png":
            K.src="http://www.fnatic.com/public/img/flags/br.gif";
            break;
        case"flag_dk.png":
            K.src="http://www.fnatic.com/public/img/flags/dk.gif";
            break;
        case"flag_ee.png":
            K.src="http://www.fnatic.com/public/img/flags/ee.gif";
            break;
        case"flag_fi.png":
            K.src="http://www.fnatic.com/public/img/flags/fi.gif";
            break;
        case"flag_fr.png":
            K.src="http://www.fnatic.com/public/img/flags/fr.gif";
            break;
        case"flag_de.png":
            K.src="http://www.fnatic.com/public/img/flags/de.gif";
            break;
        case"flag_gr.png":
            K.src="http://www.fnatic.com/public/img/flags/gr.gif";
            break;
        case"flag_il.png":
            K.src="http://www.fnatic.com/public/img/flags/il.gif";
            break;
        case"flag_lv.png":
            K.src="http://www.fnatic.com/public/img/flags/lv.gif";
            break;
        case"flag_nl.png":
            K.src="http://www.fnatic.com/public/img/flags/nl.gif";
            break;
        case"flag_no.png":
            K.src="http://www.fnatic.com/public/img/flags/no.gif";
            break;
        case"flag_pl.png":
            K.src="http://www.fnatic.com/public/img/flags/pl.gif";
            break;
        case"flag_pt.png":
            K.src="http://www.fnatic.com/public/img/flags/pt.gif";
            break;
        case"flag_ro.png":
            K.src="http://www.fnatic.com/public/img/flags/ro.gif";
            break;
        case"flag_ru.png":
            K.src="http://www.fnatic.com/public/img/flags/ru.gif";
            break;
        case"flag_es.png":
            K.src="http://www.fnatic.com/public/img/flags/es.gif";
            break;
        case"flag_se.png":
            K.src="http://www.fnatic.com/public/img/flags/se.gif";
            break;
        case"flag_ch.png":
            K.src="http://www.fnatic.com/public/img/flags/ch.gif";
            break;
        case"flag_uk.png":
            K.src="http://www.fnatic.com/public/img/flags/uk.gif";
            break;
        case"flag_us.png":
            K.src="http://www.fnatic.com/public/img/flags/us.gif";
            break;
        case"flag_eu.png":
            K.src="http://www.fnatic.com/public/img/flags/wo.gif";
            break;
            
        case"flag_cc.png":
            K.src="http://www.fnatic.com/public/img/flags/wo.gif";
            break;
            
        case"star_bar_0.png":
            K.src="http://imageshack.us/a/img72/2406/starbar0.png";
            break;
        case"star_bar_1.png":
            K.src="http://imageshack.us/a/img13/4379/starbar1.png";
            break;
        case"star_bar_2.png":
            K.src="http://imageshack.us/a/img24/720/starbar2.png";
            break;
        case"star_bar_3.png":
            K.src="http://imageshack.us/a/img405/757/starbar3.png";
            break;
        case"star_bar_4.png":
            K.src="http://imageshack.us/a/img13/8085/starbar4.png";
            break;
        case"star_bar_5.png":
            K.src="http://imageshack.us/a/img208/9871/starbar5l.png";
            break;
        case"run_bar_0.png":
            K.src="http://imageshack.us/a/img24/6941/runbar0.png";
            break;
        case"run_bar_1.png":
            K.src="http://imageshack.us/a/img651/8163/runbar1.png";
            break;
        case"run_bar_2.png":
            K.src="http://imageshack.us/a/img89/274/runbar2fl.png";
            break;
        case"run_bar_3.png":
            K.src="http://imageshack.us/a/img201/1484/runbar3.png";
            break;
        case"run_bar_4.png":
            K.src="http://imageshack.us/a/img688/5278/runbar4.png";
            break;
        case"run_bar_5.png":
            K.src="http://imageshack.us/a/img818/2333/runbar5.png";
            break;
            
            
            
            
            
        case"experience_0.png":
            K.src="http://imageshack.us/scaled/landing/338/lid0.png";
            break;
            
        case"experience_1.png":
            K.src="http://imageshack.us/scaled/landing/43/lid1u.png";
            break;
            
        case"experience_2.png":
            K.src="http://imageshack.us/scaled/landing/88/lid2.png";
            break;
            
        case"experience_3.png":
            K.src="http://imageshack.us/scaled/landing/560/lid3.png";
            break;
            
        case"experience_4.png":
            K.src="http://imageshack.us/scaled/landing/819/lid4.png";
            break;
            
        case"experience_5.png":
            K.src="http://imageshack.us/scaled/landing/35/lid5.png";
            break;
            
        case"experience_6.png":
            K.src="http://imageshack.us/scaled/landing/196/lid6.png";
            break;
            
        case"experience_7.png":
            K.src="http://imageshack.us/scaled/landing/94/lid7.png";
            break;
            
        case"experience_8.png":
            K.src="http://imageshack.us/scaled/landing/802/lid8.png";
            break;
            
        case"experience_9.png":
            K.src="http://imageshack.us/scaled/landing/802/lid9.png";
            break;
            
        case"experience_10.png":
            K.src="http://imageshack.us/scaled/landing/59/lid10.png";
            break;
            
        case"experience_11.png":
            K.src="http://imageshack.us/scaled/landing/844/lid11.png";
            break;
            
        case"experience_12.png":
            K.src="http://imageshack.us/scaled/landing/15/lid12.png";
            break;
            
        case"experience_13.png":
            K.src="http://imageshack.us/scaled/landing/442/lid13.png";
            break;
            
        case"experience_14.png":
            K.src="http://imageshack.us/scaled/landing/832/lid14.png";
            break;
            
        case"experience_15.png":
            K.src="http://imageshack.us/scaled/landing/87/lid15.png";
            break;
            
        case"experience_16.png":
            K.src="http://imageshack.us/scaled/landing/440/lid16c.png";
            break;
            
        case"experience_17.png":
            K.src="http://imageshack.us/scaled/landing/16/lid17.png";
            break;
            
        case"experience_18.png":
            K.src="http://imageshack.us/scaled/landing/252/lid18.png";
            break;
            
        case"experience_19.png":
            K.src="http://imageshack.us/scaled/landing/832/lid19.png";
            break;
            
        case"experience_20.png":
            K.src="http://imageshack.us/scaled/landing/585/lid20.png";
            break;
            
            
            
            
        case"activity_0.gif":
            K.src="http://imageshack.us/a/img846/3696/lvl0.png";
            break;
            
        case"activity_1.gif":
            K.src="http://imageshack.us/a/img338/2696/lvl1z.png";
            break;  
            
        case"activity_2.gif":
            K.src="http://imageshack.us/a/img248/4104/lvl2h.png";
            break;
            
        case"activity_3.gif":
            K.src="http://imageshack.us/a/img440/6453/lvl3z.png";
            break;  
            
        case"activity_4.gif":
            K.src="http://imageshack.us/a/img196/8768/lvl4.png";
            break;
            
        case"activity_5.gif":
            K.src="http://imageshack.us/a/img88/5803/lvl5i.png";
            break;
            
            
            
            
        case"csm/buddy-list-online.png":
            K.src="http://img35.imageshack.us/img35/1810/onlinehv.png";
            break;            
            
        case"csm/buddy-list-idle.png":
            K.src="http://img580.imageshack.us/img580/580/idled.png";
            break;  
            
        case"csm/buddy-list-offline.png":
            K.src="http://img405.imageshack.us/img405/9882/offlinexq.png";
            break;     
            
            
            
        case"checkbox_true.png":
            K.src="http://img853.imageshack.us/img853/5275/dialogok.png";
            break;
            
        case"checkbox_false.png":
            K.src="http://img689.imageshack.us/img689/8128/dialogno.png";
            break;
            
            
            
        case"game_2d.gif":
            K.src="http://img195.imageshack.us/img195/4774/16411150.png";
            break;
        
        case"game_2d_new.png":
            K.src="http://img195.imageshack.us/img195/4774/16411150.png";
            break;
            
        case"game_bot.gif":
            K.src="http://img9.imageshack.us/img9/1406/botdf.png";
            break;
            
        case"game_mr.gif":
            K.src="http://img705.imageshack.us/img705/6120/37287908.png";
            break;   
            
            
            
        case"forum/unread.png":
            K.src="http://img834.imageshack.us/img834/852/newpost1.png";
            break;
            
        case"forum/read.png":
            K.src="http://img809.imageshack.us/img809/6012/newpost0.png";
            break;
            
        case"forum/poll.png":
            K.src="http://img27.imageshack.us/img27/6687/piechartr.png";
            break;
            
        case"forum/poll_closed.png":
            K.src="http://img27.imageshack.us/img27/6687/piechartr.png";
            break;
            
        case"forum/topics_count.png":
            K.src="http://img534.imageshack.us/img534/2949/bookshelfuq.png";
            break;
            
        case"forum/posts_count.png":
            K.src="http://img818.imageshack.us/img818/1609/pencil2.png";
            break;
            
        case"forum/topics.png":
            K.src="http://img534.imageshack.us/img534/2949/bookshelfuq.png";
            break;
            
        case"forum/posts.png":
            K.src="http://img818.imageshack.us/img818/1609/pencil2.png";
            break;
            
        case"forum/views_count.png":
            K.src="http://img829.imageshack.us/img829/9640/dzq9.png";
            break;
            
            
            
        case"forum/closed.png":
            K.src="http://imageshack.us/scaled/landing/405/locklp.png";
            break;
            
            
        case"csm/logout_small.png":
            K.src="http://img703.imageshack.us/img703/7174/logoutf.png";
            break; 
            
            
            
            
        case"csm/delete_tac.png":
            K.src="http://img12.imageshack.us/img12/999/trashe.png";
            break;  
            
        case"csm/tac_duplicate.png":
            K.src="http://img703.imageshack.us/img703/2323/mapwo.png";
            break;
            
        case"csm/edit_tac.png":
            K.src="http://img534.imageshack.us/img534/491/pencilandruler.png";
            break;
            
    }
}