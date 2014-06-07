// ==UserScript==
// @name           Emoji!!!
// @namespace      http://phpz.org/
// @description    Display/Insert iPhone's Emoji icon on webpages. 显示/插入 iPhone 的 emoji 表情。
// @version        2.0.2
// @author         Seven Yu
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// define css
GM_addStyle(<><![CDATA[
#currently {
    width: 350px;
}
#emoji_icons_bar {
    overflow: hidden;
    border: 1px solid #aaa;
    padding: 7px;
}
#emoji_icons_btn {
    float: right;
}
]]></>);

var $;
var emoji_code = [
'001','002','003','004','005','006','007','008','009','00A','00B',
'00C','00D','00E','00F','010','011','012','013','014','015','016',
'017','018','019','01A','01B','01C','01D','01E','01F','020','021',
'022','023','024','025','026','027','028','029','02A','02B','02C',
'02D','02E','02F','030','031','032','033','034','035','036','037',
'038','039','03A','03B','03C','03D','03E','03F','040','041','042',
'043','044','045','046','047','048','049','04A','04B','04C','04D',
'04E','04F','050','051','052','053','054','055','056','057','058',
'059','05A','101','102','103','104','105','106','107','108','109',
'10A','10B','10C','10D','10E','10F','110','111','112','113','114',
'115','116','117','118','119','11A','11B','11C','11D','11E','11F',
'120','121','122','123','124','125','126','127','128','129','12A',
'12B','12C','12D','12E','12F','130','131','132','133','134','135',
'136','137','138','139','13A','13B','13C','13D','13E','13F','140',
'141','142','143','144','145','146','147','148','149','14A','14B',
'14C','14D','14E','14F','150','151','152','153','154','155','156',
'157','158','159','15A','201','202','203','204','205','206','207',
'208','209','20A','20B','20C','20D','20E','20F','210','211','212',
'213','214','215','216','217','218','219','21A','21B','21C','21D',
'21E','21F','220','221','222','223','224','225','226','227','228',
'229','22A','22B','22C','22D','22E','22F','230','231','232','233',
'234','235','236','237','238','239','23A','23B','23C','23D','23E',
'23F','240','241','242','243','244','245','246','247','248','249',
'24A','24B','24C','24D','24E','24F','250','251','252','253','301',
'302','303','304','305','306','307','308','309','30A','30B','30C',
'30D','30E','30F','310','311','312','313','314','315','316','317',
'318','319','31A','31B','31C','31D','31E','31F','320','321','322',
'323','324','325','326','327','328','329','32A','32B','32C','32D',
'32E','32F','330','331','332','333','334','335','336','337','338',
'339','33A','33B','33C','33D','33E','33F','340','341','342','343',
'344','345','346','347','348','349','34A','34B','34C','34D','401',
'402','403','404','405','406','407','408','409','40A','40B','40C',
'40D','40E','40F','410','411','412','413','414','415','416','417',
'418','419','41A','41B','41C','41D','41E','41F','420','421','422',
'423','424','425','426','427','428','429','42A','42B','42C','42D',
'42E','42F','430','431','432','433','434','435','436','437','438',
'439','43A','43B','43C','43D','43E','43F','440','441','442','443',
'444','445','446','447','448','449','44A','44B','44C','501','502',
'503','504','505','506','507','508','509','50A','50B','50C','50D',
'50E','50F','510','511','512','513','514','515','516','517','518',
'519','51A','51B','51C','51D','51E','51F','520','521','522','523',
'524','525','526','527','528','529','52A','52B','52C','52D','52E',
'52F','530','531','532','533','534','535','536','537'];

var emoji_begin = '<img src="http://obp.owind.com:801/emoji/emoji-E';
var emoji_end   = '.png" />';

var emoji_count;
var emoji_regs = '';
for(var n in emoji_code)
{
    emoji_regs += '\\uE' + emoji_code[n];
}
var emoji_regx = new RegExp('[' + emoji_regs + ']');

// run
function loading()
{
    // loading...
    unsafeWindow.jQuery ? init() : setTimeout(loading, 100);
}

function init()
{
    $ = unsafeWindow.jQuery;
    emoji_translate();
    emoji_createUI();
    $(document).ajaxSuccess(emoji_translate);
}

// functions
function emoji_check()
{
    if (emoji_count != $('.entry-content').length)
    {
        emoji_translate();
        emoji_count = $('.entry-content').length;
    }
    else
    {
        setTimeout(emoji_check, 500);
    }
}

function emoji_translate()
{
    $('.entry-content,.status-text').each(function()
    {
        var html = $(this).html();
        if (emoji_regx.test(html))
        {
            for(var i in emoji_code)
            {
                var regx = new RegExp('\\uE' + emoji_code[i], 'g');
                html = html.replace(regx, emoji_begin + emoji_code[i] + emoji_end);
            }
            $(this).html(html);
        }
    });
}

function emoji_createUI()
{
    if($('#status') == null) return;
    
    // bind event
    $('#status_update_form').submit(function()
    {
        emoji_count = $('.entry-content').length;
        emoji_check();
    });
    
    $.ajaxSetup(
    {
        complete: function()
        {
            emoji_count = $('.entry-content').length;
            emoji_check();
        },
    });
    
    var icon_str = '';
    for (var i in emoji_code)
    {
        icon_str += '<a href="javascript:void 0;" ' + 
        'onclick="$(\'#status\').val($(\'#status\').val()+\'&#xE'+emoji_code[i]+'\').focus();' + 
        '">' + emoji_begin+emoji_code[i]+emoji_end+'</a>';
    }

    var icon_bar = $('<div id="emoji_icons_bar"></div>').hide();
    var icon_rnd = Math.floor(Math.random() * emoji_code.length);
    var icon_btn = $('<a id="emoji_icons_btn">' +
        '<img src="http://obp.owind.com:801/emoji/emoji-E' + emoji_code[icon_rnd] + '.png" />' +
        '</a>').mouseover(function(){icon_bar.show().html() == '' && icon_bar.html(icon_str);});
    icon_bar.hover(function(){$(this).show();},function(){$(this).hide();});
    $('#status').after(icon_bar);
    $('#timeline_heading').prepend(icon_btn);
}

loading();