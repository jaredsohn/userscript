// ==UserScript==
// @name 「ぽぷぽぽぽっぷん」でクリア分かりやすくする。
// @description 主にカラーリングや、クリアメダル別検索を実装した。
// @namespace http://shioneko.sakura.ne.jp/
// @version 1.10
// @include http://popupopupopnp.com/alldata/?level*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.min.js
// ==/UserScript==

// 未クリアのグラーデーションは　濃 > 薄
// クリアしてるものは 薄 のから 濃 にしてます。

$(document).ready(function () {

	// No play (タグのみ)
	$("tr td:empty").each(function(){
		$(this).parent().attr('class','C_0')
	});

	// 未クリアの場合 （灰色）
	$("img[src*='1.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_1')
		$(this).parent().parent().css({'background':'#b2b2b2'});
	});

	// もう少しでクリアの場合 （灰色）
	$("img[src*='2.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_2')
		$(this).parent().parent().css({'background':'#bfbfbf'});
	});

	// かなり惜しい場合 （灰色）
	$("img[src*='3.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_3')
		$(this).parent().parent().css({'background':'#cbcbcb'});
	});

	// 通常クリアの場合　（橙色）
	$("img[src*='4.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_4')
		$(this).parent().parent().css({'background':'#ffe8e0'});
	});

	// 罰20以下クリアの場合　（橙色）
	$("img[src*='5.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_5')
		$(this).parent().parent().css({'background':'#ffd5c7'});
	});

	// 罰5以下クリアの場合　（橙色）
	$("img[src*='6.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_6')
		$(this).parent().parent().css({'background':'#ffc2ad'});
	});

	// フルコンの場合　（水色）
	$("img[src*='7.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_7')
		$(this).parent().parent().css({'background':'#e0f7ff'});
	});

	// フルコンでなおかつGood 20以下（水色）
	$("img[src*='8.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_8')
		$(this).parent().parent().css({'background':'#c7f0ff'});
	});

	// フルコンでなおかつGood 5以下（水色）
	$("img[src*='9.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_9')
		$(this).parent().parent().css({'background':'#adeaff'});
	});

	// パフェ（黄色）
	$("img[src*='10.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_10')
		$(this).parent().parent().css({'background':'#ffecad'});
	});
	
	// チェックボックスフォーラムを作る。
	$('form').eq(1).after('<div style="width:100%; margin:5px;" id="Mf"></div>');
	$('#Mf').append('<img src="/img/mark/1.gif">No Clear : <input type="checkbox" checked="checked" id="C1" />　');
	$('#Mf').append('<img src="/img/mark/2.gif">No Clear : <input type="checkbox" checked="checked" id="C2" />　');
	$('#Mf').append('<img src="/img/mark/3.gif">No Clear : <input type="checkbox" checked="checked" id="C3" />　');
	$('#Mf').append('<img src="/img/mark/4.gif">Clear : <input type="checkbox" checked="checked" id="C4" />　');
	$('#Mf').append('<img src="/img/mark/5.gif">Clear : <input type="checkbox" checked="checked" id="C5" />　');
	$('#Mf').append('<img src="/img/mark/6.gif">Clear : <input type="checkbox" checked="checked" id="C6" /> <br>');
	$('#Mf').append('<img src="/img/mark/7.gif">Clear : <input type="checkbox" checked="checked" id="C7" />　');
	$('#Mf').append('<img src="/img/mark/8.gif">Clear : <input type="checkbox" checked="checked" id="C8" />　');
	$('#Mf').append('<img src="/img/mark/9.gif">Clear : <input type="checkbox" checked="checked" id="C9" />　');
	$('#Mf').append('<img src="/img/mark/10.gif">Parfect : <input type="checkbox" checked="checked" id="C10" />　');
	$('#Mf').append('No Play : <input type="checkbox" checked="checked" id="C0" />　<br>');

	//$('#Mf').append('No Clear : <input type="checkbox" checked="checked" id="NoClear" />　');
	

	// チェックボックスのシステム部分
	$('#C0').click(function(){
        $(".C_0").each(function(){
            $(this).toggle();
        });
    });
	$('#C1').click(function(){
        $(".C_1").each(function(){
            $(this).toggle();
        });
    });
    $('#C2').click(function(){
        $(".C_2").each(function(){
            $(this).toggle();
        });
    });
    $('#C3').click(function(){
        $(".C_3").each(function(){
            $(this).toggle();
        });
    });
	$('#C4').click(function(){
        $(".C_4").each(function(){
            $(this).toggle();
        });
    });
    $('#C5').click(function(){
        $(".C_5").each(function(){
            $(this).toggle();
        });
    });
    $('#C6').click(function(){
        $(".C_6").each(function(){
            $(this).toggle();
        });
    });
    $('#C7').click(function(){
        $(".C_7").each(function(){
            $(this).toggle();
        });
    });
    $('#C8').click(function(){
        $(".C_8").each(function(){
            $(this).toggle();
        });
    });
    $('#C9').click(function(){
        $(".C_9").each(function(){
            $(this).toggle();
        });
    });

    $('#C10').click(function(){
        $(".C_10").each(function(){
            $(this).toggle();
        });
    });

});