// ==UserScript==
// @name       [NZB.SU] Alternate colors per episode
// @version    0.3
// @description  This will color the "Check" table cell a random color per episode.
// @match      http://nzb.su/series/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2013+, TomHung
// ==/UserScript==

//pre-shuffled web safe color palette
var colors = new Array ("#90C","#FC3","#090","#969","#03C","#6C9","#99F","#0C9","#3F0","#93F",
                        "#9F0","#603","#CC0","#F36","#99C","#3C3","#F6C","#F39","#69F","#C33",
                        "#03F","#C09","#9FC","#30F","#699","#FF3","#FC9","#0F3","#C3C","#9CF",
                        "#69C","#369","#FCF","#39C","#CC3","#66F","#003","#F33","#90F","#909",
                        "#906","#990","#3C6","#F09","#F00","#9CC","#F90","#093","#063","#933",
                        "#6C3","#399","#06C","#039","#6F0","#FF9","#330","#C36","#9FF","#00F",
                        "#009","#366","#F6F","#690","#0C0","#00C","#606","#96F","#F03","#006",
                        "#63C","#F63","#9C0","#F3C","#363","#639","#FF6","#0C6","#FFF","#C90",
                        "#033","#60C","#6F9","#600","#CFF","#696","#060","#FC0","#C96","#0C3",
                        "#936","#36F","#693","#0F6","#3CC","#036","#9F9","#C9C","#9C3","#939",
                        "#33C","#F9C","#F3F","#63F","#999","#CC9","#336","#CF0","#FFC","#C0F",
                        "#30C","#FF0","#339","#069","#33F","#C60","#6F6","#393","#C39","#6CF",
                        "#39F","#96C","#633","#6FF","#306","#C00","#F06","#CFC","#609","#CCF",
                        "#900","#CC6","#F99","#390","#3CF","#963","#6F3","#FC6","#36C","#636",
                        "#60F","#663","#396","#0F9","#F69","#666","#F30","#09F","#096","#930",
                        "#630","#360","#960","#93C","#C6F","#C63","#CF6","#C99","#099","#669",
                        "#CF3","#3FC","#0FF","#F0F","#903","#0F0","#C03","#09C","#3F3","#66C",
                        "#000","#C06","#F93","#F9F","#3F6","#030","#F66","#CCC","#300","#3FF",
                        "#660","#C6C","#0CF","#6FC","#6C6","#F96","#C69","#996","#F60","#3F9",
                        "#C3F","#3C0","#FCC","#993","#C0C","#0FC","#9F6","#3C9","#C9F","#CF9",
                        "#6CC","#303","#C30","#06F","#F0C","#9C9","#C93","#333","#6C0","#309",
                        "#9F3","#9C6","#966","#0CC","#066","#C66");

//alternate color per episode (Cell1)
$(function(){
    var tableRow = $('#browsetable > tbody > tr');
    var color = colors[0];
    var cell1 = '';
    var ct = Math.floor( Math.random() * ( 216 + 1 ) );
    tableRow.each(function(){
      if(ct == 217) ct = 0;
      var cellprev = cell1;
      //compare episode cells
      cell1 = $(this).find('td.static').text();
      if(cellprev != cell1){
        color = colors[ct];
      }
      $(this).find('td.check').css('background-color',color);
      ct++;
    });
});
