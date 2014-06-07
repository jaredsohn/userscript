// ==UserScript==
// @name           24kpwn.Smile.Ph03n1x
// @namespace      http://plurk.com/
// @description    Hungarian plurkers rulz.
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About==
// author: Mani & Kris7topher & Arpi
// ExChanged : ad ad ad ad
// Email: mail@klasszik.us
// blog: http://www.arpi.bz

// Ezen verzio legyen ajanlva Wildgica-nak,hogy muljanak el azok a rohadt kiutesek!  - Meg mindig :) |2009.08.04.//

// ********** Main Script ***********
var smileData = [];
 
smileData.push([
	'<img src="http://obp.owind.com:801/emoji/emoji-E006.png" height="13" width="13">',
	'http://obp.owind.com:801/emoji/emoji-E',
	[
'001.png','002.png','003.png','004.png','005.png','006.png','007.png','008.png','009.png','00A.png','00B.png','00C.png','00D.png','00E.png','00F.png','010.png','011.png','012.png','013.png','014.png','015.png','016.png','017.png','018.png','019.png','01A.png','01B.png','01C.png','01D.png','01E.png','01F.png','020.png','021.png','022.png','023.png','024.png','025.png','026.png','027.png','028.png','029.png','02A.png','02B.png','02C.png','02D.png','02E.png','02F.png','030.png','031.png','032.png','033.png','034.png','035.png','036.png','037.png','038.png','039.png','03A.png','03B.png','03C.png','03D.png','03E.png','03F.png','040.png','041.png','042.png','043.png','044.png','045.png','046.png','047.png','048.png','049.png','04A.png','04B.png','04C.png','04D.png','04E.png','04F.png','050.png','051.png','052.png','053.png','054.png','055.png','056.png','057.png','058.png','059.png','05A.png','101.png','102.png','103.png','104.png','105.png','106.png','107.png','108.png','109.png','10A.png','10B.png','10C.png','10D.png','10E.png','10F.png','110.png','111.png','112.png','113.png','114.png','115.png','116.png','117.png','118.png','119.png','11A.png','11B.png','11C.png','11D.png','11E.png','11F.png','120.png','121.png','122.png','123.png','124.png','125.png','126.png','127.png','128.png','129.png','12A.png','12B.png','12C.png','12D.png','12E.png','12F.png','130.png','131.png','132.png','133.png','134.png','135.png','136.png','137.png','138.png','139.png','13A.png','13B.png','13C.png','13D.png','13E.png','13F.png','140.png','141.png','142.png','143.png','144.png','145.png','146.png','147.png','148.png','149.png','14A.png','14B.png','14C.png','14D.png','14E.png','14F.png','150.png','151.png','152.png','153.png','154.png','155.png','156.png','157.png','158.png','159.png','15A.png','201.png','202.png','203.png','204.png','205.png','206.png','207.png','208.png','209.png','20A.png','20B.png','20C.png','20D.png','20E.png','20F.png','210.png','211.png','212.png','213.png','214.png','215.png','216.png','217.png','218.png','219.png','21A.png','21B.png','21C.png','21D.png','21E.png','21F.png','220.png','221.png','222.png','223.png','224.png','225.png','226.png','227.png','228.png','229.png','22A.png','22B.png','22C.png','22D.png','22E.png','22F.png','230.png','231.png','232.png','233.png','234.png','235.png','236.png','237.png','238.png','239.png','23A.png','23B.png','23C.png','23D.png','23E.png','23F.png','240.png','241.png','242.png','243.png','244.png','245.png','246.png','247.png','248.png','249.png','24A.png','24B.png','24C.png','24D.png','24E.png','24F.png','250.png','251.png','252.png','253.png','301.png','302.png','303.png','304.png','305.png','306.png','307.png','308.png','309.png','30A.png','30B.png','30C.png','30D.png','30E.png','30F.png','310.png','311.png','312.png','313.png','314.png','315.png','316.png','317.png','318.png','319.png','31A.png','31B.png','31C.png','31D.png','31E.png','31F.png','320.png','321.png','322.png','323.png','324.png','325.png','326.png','327.png','328.png','329.png','32A.png','32B.png','32C.png','32D.png','32E.png','32F.png','330.png','331.png','332.png','333.png','334.png','335.png','336.png','337.png','338.png','339.png','33A.png','33B.png','33C.png','33D.png','33E.png','33F.png','340.png','341.png','342.png','343.png','344.png','345.png','346.png','347.png','348.png','349.png','34A.png','34B.png','34C.png','34D.png','401.png','402.png','403.png','404.png','405.png','406.png','407.png','408.png','409.png','40A.png','40B.png','40C.png','40D.png','40E.png','40F.png','410.png','411.png','412.png','413.png','414.png','415.png','416.png','417.png','418.png','419.png','41A.png','41B.png','41C.png','41D.png','41E.png','41F.png','420.png','421.png','422.png','423.png','424.png','425.png','426.png','427.png','428.png','429.png','42A.png','42B.png','42C.png','42D.png','42E.png','42F.png','430.png','431.png','432.png','433.png','434.png','435.png','436.png','437.png','438.png','439.png','43A.png','43B.png','43C.png','43D.png','43E.png','43F.png','440.png','441.png','442.png','443.png','444.png','445.png','446.png','447.png','448.png','449.png','44A.png','44B.png','44C.png','501.png','502.png','503.png','504.png','505.png','506.png','507.png','508.png','509.png','50A.png','50B.png','50C.png','50D.png','50E.png','50F.png','510.png','511.png','512.png','513.png','514.png','515.png','516.png','517.png','518.png','519.png','51A.png','51B.png','51C.png','51D.png','51E.png','51F.png','520.png','521.png','522.png','523.png','524.png','525.png','526.png','527.png','528.png','529.png','52A.png','52B.png','52C.png','52D.png','52E.png','52F.png','530.png','531.png','532.png','533.png','534.png','535.png','536.png','537.png'
         ],300
]);



smileData.push([
	'<img src="http://r3b0rn.tarhely.biz/skype/1.gif" height="13" width="13">',
	'http://r3b0rn.tarhely.biz/skype/',
	[
'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif','16.gif', '17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif', '29.gif', '30.gif', '31.gif', '32.gif', '33.gif', '34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif', '42.gif', '43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif', '50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif', '58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif', '66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif','83.gif','84.gif','85.gif','86.gif'


	],150
]);

smileData.push([
	'<img src="http://s194.photobucket.com/albums/z4/uchari/my/001.gif" height="13" width="13">',
	'http://s194.photobucket.com/albums/z4/uchari/my/',
	[
'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif','011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif','061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif','070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif','079.gif','080.gif','081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif','091.gif','092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif','099.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif','139.gif','140.gif','141.gif','142.gif','143.gif','144.gif','145.gif','146.gif','147.gif','148.gif','149.gif','150.gif','151.gif','152.gif','153.gif','154.gif','155.gif','156.gif','157.gif','158.gif','159.gif','160.gif','161.gif','162.gif','163.gif','164.gif','165.gif','166.gif','167.gif','168.gif','169.gif','170.gif','171.gif','172.gif','173.gif','174.gif','175.gif','176.gif','177.gif','178.gif','179.gif','180.gif','181.gif'

	],250
]); 

smileData.push([
	'<img src="http://r3b0rn.tarhely.biz/pid1/5.gif" height="13" width="13">', 'http://r3b0rn.tarhely.biz/pid1/',
	[
'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif','16.gif', '17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif', '29.gif', '30.gif', '31.gif', '32.gif', '33.gif', '34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif', '42.gif', '43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif', '50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif', '58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif', '66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','11.png','12.png','13.png','14.png','15.png','16.png', '17.png','18.png','19.png','20.png','21.png','22.png','23.png','24.png','25.png','26.png','27.png','28.png', '29.png', '30.png', '31.png', '32.png', '33.png', '34.png','35.png','36.png','37.png','38.png','39.png','40.png','41.png', '42.png', '43.png','44.png','45.png','46.png','47.png','48.png','49.png', '50.png','51.png','52.png','53.png','54.png','55.png','56.png','57.png', '58.png','59.png','60.png','61.png','62.png','63.png','64.png','65.png', '66.png','67.png','68.png','69.png','70.png','71.png','72.png','73.png','74.png','75.png','76.png','77.png','78.png','79.png','80.png','81.png','82.png','83.png','84.png','85.png','86.png','87.png','88.png','89.png','90.png','91.png','92.png','93.png','94.png','95.png','96.png','97.png','98.png'	

         ],250
]);



smileData.push(['H2', 'http://statics.plurk.com/', [
    'deda4d9f78ad528d725e3a6bfbf6352f.gif', // (Русский)
    '7256dae81d56d150120ccd0c96dd2197.gif', // (fireworks)
    '0efc4d55d28704f4370ef874ae906161.gif', // (code)
    '8855f56400a936db07f348d9290adaac.gif', // (code_okok)
    '71acd802cc931649dd9a371ccf70bad2.gif', // (hungry_okok)
    '74030f05f06547a3d26b02ccbf0bbac7.gif', // (music_okok)
    '3acbaf42504fff32c5eac4f12083ce56.gif', // (yarr_okok)
    'fcd28d7d78ec1f828c76930fa63270e6.gif', // (gym_okok)
    'bac8c8392f7ca8f5ac74612be4d08b74.gif', // (wave_okok)
    'a555399b40c379adca5b6f5bad5bf732.gif', // (dance_okok) 
    '6675254cd7449b1847a93b0024127eae.gif', // (angry_okok)
    '88fac5a4b99110a35d4e4794dad58ab4.gif', // (taser_okok) 
    'feb43dbbbf2763905571060be9a496d1.gif', // (no_dance)
    '5b51892d7d1f392d93ea7fe26e5100f4.gif', // (banana_gym)
    '47d20905d017c396d67b4a30c9ac9b10.png', // (goal)
    '129b757f2346a6e5ea782c79f0337ba9.png', // (bzzz)
    '4ad099fba019942f13058610ff3fc568.gif', // (dance_bzz)
    '4c40d16a0d369b895c08f2e33d062ec8.gif', // (yarr)
    '6de58c967f1c2797d250a713ba50eddd.gif', // (dance_yarr)
    '1a5f23ed863e70e52f239b045a48e6fb.gif', // (xmas1)
    'f5dbd5fdf5f5df69cfb024d6be76a76b.gif', // (xmas2)
    'e902170e97aee14836b5df6b0fe61ba2.gif', // (xmas3)
    'e476574723d5042f24658fa36866bd92.gif', // (xmas4)
    'b3b9856e557fcc2700fd41c53f9d4910.gif' // (droid_dance)
    ], [ 
    '(Русский)',
    '(fireworks)',
    '(code)',
    '(code_okok)',
    '(hungry_okok)',
    '(music_okok)',
    '(yarr_okok)',
    '(gym_okok)',
    '(wave_okok)',
    '(dance_okok)',
    '(angry_okok)', 
    '(taser_okok) ', 
    '(no_dance)',
    '(banana_gym)',
    '(goal)',
    '(bzzz)',
    '(dance_bzz)',
    '(yarr)',
    '(dance_yarr)', 
    '(xmas1)',
    '(xmas2)',
    '(xmas3)',
    '(xmas4)',
    '(droid_dance)'
]]);

smileData.push(['H1', 'http://statics.plurk.com/', [
    'cfdd2accc1188f5fbc62e149074c7f29.png', // (fuu)
    '828b9819249db696701ae0987fba3638.png', // (gfuu)
    '1bd653e166492e40e214ef6ce4dd716f.png', // (yay)
    '3fe6cf919158597d7ec74f8d90f0cc9f.png', // (gyay)
    '9c5c54081547d2ad903648f178fcc595.png', // (bah)
    '2da76999ca3716fb4053f3332270e5c9.png', // (gbah)
    'f73b773aa689647cb09f57f67a83bb89.png', // (troll)
    '45beda260eddc28c82c0d27377e7bf42.png', // (gtroll)
    '8590888362ae83daed52e4ca73c296a6.png', // (aha)
    'c7551098438cc28ec3b54281d4b09cc3.png', // (gaha)
    'cfd84315ebceec0c4389c51cf69132bd.png', // (whatever)
    '0e0bf1ec2c2958799666f3995ef830ca.png', // (gwhatever)
    'e2998ca75f80c1c4a5508c549e3980a6.png', // (pokerface)
    'c6ad1c4f9e11f6859a1ba39c4341ef8b.png', // (gpokerface)
    '4a61085f1c6a639f028cd48ae97d07d0.png', // (yea)
    '53253ca60f5831f0812954213a2e9bb3.png', // (gyea)
    '6928f3117658cc38d94e70519a511005.png',  // (jazzhands)
    'af44689f789b98cfcb103844f7fbfce8.png',  // (flower)
    'dd8468c4e7af6c57e3b176a8c984fc7d.png',  // (v_love)
    '3d38ab77e8df38579df2403d382d63dd.png',  // (v_mail)
    'fe2398c09a67a416f16353af91283bd0.png',  // (v_tiffany)
    '7f42645feb6ceed6e35637eaf418306c.png'  // (v_perfume)
    ], [ 
    '(fuu)',
    '(gfuu)', 
    '(yay)', 
    '(gyay)', 
    '(bah)', 
    '(gbah)', 
    '(troll)',
    '(gtroll)',
    '(aha)',
    '(gaha)',
    '(whatever)',
    '(gwhatever)',
    '(pokerface)',
    '(gpokerface)',
    '(yea)',
    '(gyea)',
    '(jazzhands)',
    '(flower)',
    '(v_love)',
    '(v_mail)',
    '(v_tiffany)', 
    '(v_perfume)'
]]);

smileData.push([
	'<img src="http://mani.freeblog.hu/files/ad.gif" height="13" width="13">',
		 'http://mani.freeblog.hu/files/',
        [
'ad.gif','ai.gif','an.gif','as.gif','ax.gif','bc.gif','bh.gif','bm.gif','br.gif','bw.gif','cb.gif','ch.gif','cm.gif','cr.gif','cx.gif','db.gif','dg.gif','dl.gif','dr.gif','ae.gif','aj.gif','ao.gif','at.gif','ay.gif','bd.gif','bi.gif','bn.gif','bs.gif','bx.gif','cd.gif','ci.gif','cn.gif','ct.gif','cy.gif','dc.gif','dh.gif','dm.gif','ds.gif','aa.gif','af.gif','ak.gif','ap.gif','au.gif','az.gif','be.gif','bj.gif','bo.gif','bt.gif','by.gif','ce.gif','cj.gif','co.gif','cu.gif','cz.gif','dd.gif','di.gif','dn.gif','dt.gif','ab.gif','ag.gif','al.gif','aq.gif','av.gif','ba.gif','bf.gif','bk.gif','bp.gif','bu.gif','bz.gif','cf.gif','ck.gif','cp.gif','cv.gif','cs.gif','de.gif','dj.gif','do.gif','du.gif','ac.gif','ah.gif','am.gif','ar.gif','aw.gif','bb.gif','bg.gif','bl.gif','bq.gif','bv.gif','ca.gif','cg.gif','cl.gif','cq.gif','cw.gif','da.gif','df.gif','dk.gif','dp.gif','dv.gif'


        ],180
]);
smileData.push([
	'<img src="http://r3b0rn.tarhely.biz/emoticons/2.gif" height="13" width="13">',
	'http://r3b0rn.tarhely.biz/emoticons/',
	[
'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif','16.gif', '17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif', '29.gif', '30.gif', '31.gif', '32.gif', '33.gif', '34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif', '42.gif', '43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif', '50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif', '58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif', '66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif'
,'92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','X1.gif','X2.gif','X3.gif','X4.gif','X5.gif','X6.gif','X7.gif','X8.gif','X9.gif','X10.gif','X11.gif','X12.gif','X13.gif','X14.gif','X15.gif','X16.gif','X17.gif','X18.gif','X19.gif','X20.gif','X21.gif','X22.gif' 
],250
]);

var isinit = false;
var currInput = null;
var rplreg = /\[(\d+) (\d+)\]/g;
var pageState = location.href.split('/')[3];

window.addEventListener('load', function()
{
    setTimeout(function()
    {
        var selImgs = document.getElementsByClassName('smily_holder');

        // bind key up event
        if(pageState == 'p')
            getById('input_permalink').addEventListener('keyup', replaceSmile, false);
        else
        {
            getById('input_big').addEventListener('keyup', replaceSmile, false);
            getById('input_small').addEventListener('keyup', replaceSmile, false);
        }

        // create tabs
        for(var i=0; i<selImgs.length; i++)
        {
            selImgs[i].setAttribute('ref', selImgs.length - i);
            selImgs[i].addEventListener('click', function()
            {
                isinit || setTimeout(init, 1000);
                currInput = pageState != 'p' ? this.getAttribute('ref') == 2 ? getById('input_big') : getById('input_small') : getById('input_permalink');
            }, false);
        }
        
        // Show images inline
        stl = document.createElement('style');
        stl.setAttribute('type', 'text/css');
        str = '';
        for(var i=0; i<smileData.length; i++)
        {
            for(var j=0, dat = smileData[i][2], _url; j<dat.length; j++)
            {
                _url = smileData[i][1] + dat[j];
                str += '.pictureservices[href="' + _url + '"] {display: inline !important}\n'
                str += '.pictureservices img[src="' + _url + '"] {vertical-align: top; border: 0; padding: 0 !important; margin: 0 !important}\n'
            }
        }
        stl.innerHTML = str;
        document.getElementsByTagName('head')[0].appendChild(stl);
    }, 2000);
}, false);


// init
function init()
{
    isinit = true;
    // init contents
    for(var i=0; i<smileData.length; i++)
    {
        addTab(i, smileData[i]);
    }
    // init css
    getById('emoticons_show').style.width  = '100%';
    getById('emoticons_show').style.height = '150px';
    getById('emoticons_show').style.overflow = 'auto';
    getById('emoticons_tabs').style.marginRight = '-1px'; // this seems to look better
    
    // size back the panel when selecting default and extended set
    for (var i=0; i<2; i++)
    {
        ([getById('emo_basic'), getById('emo_basic').previousSibling])[i].addEventListener('click', function()
        {
            getById('emoticons_show').style.height = '150px';
        }, false);
    }
}

function replaceSmile()
{
    if(rplreg.test(this.value))
        this.value = this.value.replace(rplreg, doReplace);
}

function doReplace(str, datid, smileid)
{
    arr = smileData[datid];
    if (typeof(arr) != 'undefined')
    {
        if(typeof(arr[2][smileid]) != 'undefined')
            str = ' ' + smileData[datid][1] + smileData[datid][2][smileid] + ' ';
    }
    return str;
}

function addTab(id, data)
{
    var myli = document.createElement('li');
    myli.className = 'emoticon_selecter';
    myli.innerHTML = '<a href="javascript:void 0;">'+data[0]+'</a>';
    myli.addEventListener('click', function()
    {
        addImages(this, id);
    }, false);

    getById('emoticons_tabs').getElementsByTagName('ul')[0].appendChild(myli);
}

function addImages(obj, ind)
{
    var showDiv = getById('emoticons_show');
    var lis = getById('emoticons_tabs').getElementsByTagName('li');
    for(var i=0; i<lis.length; i++)
        lis[i].className = 'emoticon_selecter';

    obj.className += ' current';

    var data = smileData[ind];
    var baseUrl = data[1];
    var str = '<div>';
    for(var i=0, dat = data[2], _url; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']" /></a>';

    }
    str += '</div>';
    
    showDiv.style.height = data[3] + 'px'; // resize the panel
    
    showDiv.innerHTML = str;
    
    var imgs = showDiv.getElementsByTagName('img');
    for(var i=0; i<imgs.length; i++)
    {
        imgs[i].addEventListener('click', function()
        {
            currInput.value += ' ' + this.src + ' ';
            currInput.focus();
        }, false);
    }
}

function getById(oid)
{
    return document.getElementById(oid);
}