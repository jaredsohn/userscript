// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by (http://trish-loves-purple.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. by Blogger-Emoticon.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	

buttons += emoticonButton(":001:", "http://i44.tinypic.com/f2itkp.jpg");
buttons += emoticonButton(":002:", "http://i42.tinypic.com/72px09.jpg");
buttons += emoticonButton(":003:", "http://i44.tinypic.com/21aaidx.jpg");
buttons += emoticonButton(":004:", "http://i42.tinypic.com/6qy9nt.jpg");
buttons += emoticonButton(":005:", "http://i41.tinypic.com/2eyues5.jpg");
buttons += emoticonButton(":006:", "http://i41.tinypic.com/152hmb4.jpg");
buttons += emoticonButton(":007:", "http://i39.tinypic.com/nqeb6o.jpg");
buttons += emoticonButton(":008:", "http://i39.tinypic.com/6e29n7.jpg");
buttons += emoticonButton(":009:", "http://i42.tinypic.com/300v6z5.jpg");
buttons += emoticonButton(":010:", "http://i41.tinypic.com/azi4ci.jpg");
buttons += emoticonButton(":011:", "http://i44.tinypic.com/nqafix.jpg");
buttons += emoticonButton(":012:", "http://i44.tinypic.com/2z70pxz.jpg");
buttons += emoticonButton(":013:", "http://i40.tinypic.com/n16scx.jpg");
buttons += emoticonButton(":014:", "http://i41.tinypic.com/qpfmrp.jpg");
buttons += emoticonButton(":015:", "http://i39.tinypic.com/5vtb8k.jpg");
buttons += emoticonButton(":016:", "http://i40.tinypic.com/14jq8h1.jpg");
buttons += emoticonButton(":017:", "http://i41.tinypic.com/2dij403.jpg");
buttons += emoticonButton(":018:", "http://i42.tinypic.com/30hqamd.jpg");
buttons += emoticonButton(":019:", "http://i39.tinypic.com/2vun1nl.jpg");
buttons += emoticonButton(":020:", "http://i40.tinypic.com/11u9ufc.jpg");
buttons += emoticonButton(":021:", "http://i44.tinypic.com/20i8jt3.jpg");
buttons += emoticonButton(":022:", "http://i44.tinypic.com/14v4eur.jpg");
buttons += emoticonButton(":023:", "http://i41.tinypic.com/11j6dkk.jpg");
buttons += emoticonButton(":127:", "http://i40.tinypic.com/23l1is2.jpg");
buttons += emoticonButton(":128:", "http://i43.tinypic.com/yg00.jpg");
buttons += emoticonButton(":129:", "http://i39.tinypic.com/30vi053.jpg");
buttons += emoticonButton(":130:", "http://i40.tinypic.com/xp7xih.jpg");
buttons += emoticonButton(":131:", "http://i42.tinypic.com/iwi536.jpg");
buttons += emoticonButton(":132:", "http://i40.tinypic.com/oian0w.jpg");
buttons += emoticonButton(":133:", "http://i39.tinypic.com/2luwis7.jpg");
buttons += emoticonButton(":134:", "http://i43.tinypic.com/10i5pjp.jpg");
buttons += emoticonButton(":135:", "http://i42.tinypic.com/2mwhz54.jpg");
buttons += emoticonButton(":136:", "http://i40.tinypic.com/6huzht.jpg");
buttons += emoticonButton(":137:", "http://i42.tinypic.com/ht8q2s.jpg");
buttons += emoticonButton(":138:", "http://i40.tinypic.com/ru5fes.jpg");
buttons += emoticonButton(":139:", "http://i41.tinypic.com/234sk8.jpg");
buttons += emoticonButton(":140:", "http://i44.tinypic.com/2ex29eh.jpg");
buttons += emoticonButton(":141:", "http://i39.tinypic.com/4jnn1l.jpg");
buttons += emoticonButton(":142:", "http://i41.tinypic.com/2vcdvdu.jpg");
buttons += emoticonButton(":144:", "http://i44.tinypic.com/dxcnbs.jpg");
buttons += emoticonButton(":145:", "http://i39.tinypic.com/20h5zxt.jpg");
buttons += emoticonButton(":146:", "http://i43.tinypic.com/24zkg87.jpg");
buttons += emoticonButton(":143:", "http://i42.tinypic.com/2q3srxt.jpg");
buttons += emoticonButton(":147:", "http://i42.tinypic.com/24bl211.jpg");
buttons += emoticonButton(":148:", "http://i43.tinypic.com/1yoexi.jpg");
buttons += emoticonButton(":149:", "http://i41.tinypic.com/2uzs87q.jpg");
buttons += emoticonButton(":150:", "http://i44.tinypic.com/1zxs7eb.jpg");
buttons += emoticonButton(":151:", "http://i41.tinypic.com/28a6o1e.jpg");
buttons += emoticonButton(":152:", "http://i40.tinypic.com/bewyu8.jpg");
buttons += emoticonButton(":153:", "http://i40.tinypic.com/1z4kao8.jpg");
buttons += emoticonButton(":154:", "http://i42.tinypic.com/1z6w4d3.jpg");
buttons += emoticonButton(":155:", "http://i42.tinypic.com/1rx6vl.jpg");
buttons += emoticonButton(":156:", "http://i44.tinypic.com/oa9e29.jpg");
buttons += emoticonButton(":157:", "http://i41.tinypic.com/2rqg2ed.jpg");
buttons += emoticonButton(":158:", "http://i44.tinypic.com/epp189.jpg");
buttons += emoticonButton(":024:", "http://i41.tinypic.com/op742.jpg");
buttons += emoticonButton(":025:", "http://i40.tinypic.com/24eruy8.jpg");
buttons += emoticonButton(":026:", "http://i39.tinypic.com/2co4jd2.jpg");
buttons += emoticonButton(":027:", "http://i40.tinypic.com/f2o7bq.jpg");
buttons += emoticonButton(":028:", "http://i42.tinypic.com/2ngrn08.jpg");
buttons += emoticonButton(":029:", "http://i39.tinypic.com/2l9qtud.jpg");
buttons += emoticonButton(":030:", "http://i43.tinypic.com/wqo3tf.jpg");
buttons += emoticonButton(":031:", "http://i44.tinypic.com/5zkymx.jpg");
buttons += emoticonButton(":032:", "http://i43.tinypic.com/29qm8g0.jpg");
buttons += emoticonButton(":033:", "http://i44.tinypic.com/3163hxt.jpg");
buttons += emoticonButton(":034:", "http://i39.tinypic.com/11ifse0.jpg");
buttons += emoticonButton(":035:", "http://i44.tinypic.com/2gtdddt.jpg");
buttons += emoticonButton(":036:", "http://i43.tinypic.com/zkfxux.jpg");
buttons += emoticonButton(":037:", "http://i43.tinypic.com/690yvl.jpg");
buttons += emoticonButton(":038:", "http://i42.tinypic.com/mct8id.jpg");
buttons += emoticonButton(":039:", "http://i42.tinypic.com/2luz47s.jpg");
buttons += emoticonButton(":040:", "http://i42.tinypic.com/v3m2a8.jpg");
buttons += emoticonButton(":041:", "http://i42.tinypic.com/e19ma9.jpg");
buttons += emoticonButton(":042:", "http://i40.tinypic.com/2mre1ko.jpg");
buttons += emoticonButton(":043:", "http://i44.tinypic.com/10z6bls.jpg");
buttons += emoticonButton(":044:", "http://i40.tinypic.com/v6kwfs.jpg");
buttons += emoticonButton(":045:", "http://i41.tinypic.com/9ay3qq.jpg");
buttons += emoticonButton(":046:", "http://i43.tinypic.com/vr6k2h.jpg");
buttons += emoticonButton(":047:", "http://i39.tinypic.com/2uejxfm.jpg");
buttons += emoticonButton(":048:", "http://i39.tinypic.com/1eu1j.jpg");
buttons += emoticonButton(":049:", "http://i39.tinypic.com/211qo7l.jpg");
buttons += emoticonButton(":050:", "http://i39.tinypic.com/al0tv6.jpg");
buttons += emoticonButton(":051:", "http://i43.tinypic.com/2v0ydqd.jpg");
buttons += emoticonButton(":052:", "http://i42.tinypic.com/2vj3p09.jpg");
buttons += emoticonButton(":053:", "http://i39.tinypic.com/2zswqbn.jpg");
buttons += emoticonButton(":054:", "http://i43.tinypic.com/opbb6t.jpg");
buttons += emoticonButton(":055:", "http://i40.tinypic.com/111i9ly.jpg");
buttons += emoticonButton(":056:", "http://i42.tinypic.com/6qcgo0.jpg");
buttons += emoticonButton(":057:", "http://i43.tinypic.com/212dfmw.jpg");
buttons += emoticonButton(":058:", "http://i44.tinypic.com/mr699l.jpg");
buttons += emoticonButton(":059:", "http://i42.tinypic.com/1z4wj0o.jpg");
buttons += emoticonButton(":060:", "http://i42.tinypic.com/23uo00.jpg");
buttons += emoticonButton(":061:", "http://i39.tinypic.com/20j1bev.jpg");
buttons += emoticonButton(":062:", "http://i44.tinypic.com/24fmej6.jpg");
buttons += emoticonButton(":063:", "http://i40.tinypic.com/sb3mmg.jpg");
buttons += emoticonButton(":064:", "http://i39.tinypic.com/erbl8k.jpg");
buttons += emoticonButton(":065:", "http://i44.tinypic.com/149v254.jpg");
buttons += emoticonButton(":066:", "http://i39.tinypic.com/308fsd1.jpg");
buttons += emoticonButton(":067:", "http://i40.tinypic.com/rlyf7o.jpg");
buttons += emoticonButton(":068:", "http://i44.tinypic.com/2r2b0aa.jpg");
buttons += emoticonButton(":069:", "http://i43.tinypic.com/2wem613.jpg");
buttons += emoticonButton(":070:", "http://i39.tinypic.com/71s106.jpg");
buttons += emoticonButton(":071:", "http://i41.tinypic.com/200v4gy.jpg");
buttons += emoticonButton(":072:", "http://i40.tinypic.com/wmmss9.jpg");
buttons += emoticonButton(":073:", "http://i42.tinypic.com/2ijtaax.jpg");
buttons += emoticonButton(":074:", "http://i43.tinypic.com/2s8gv0k.jpg");
buttons += emoticonButton(":075:", "http://i40.tinypic.com/1zveqnn.jpg");
buttons += emoticonButton(":076:", "http://i39.tinypic.com/hwev55.jpg");
buttons += emoticonButton(":077:", "http://i44.tinypic.com/s653r9.jpg");
buttons += emoticonButton(":078:", "http://i39.tinypic.com/35085ds.jpg");
buttons += emoticonButton(":079:", "http://i41.tinypic.com/aeps0h.jpg");
buttons += emoticonButton(":080:", "http://i43.tinypic.com/2rppkhz.jpg");
buttons += emoticonButton(":081:", "http://i40.tinypic.com/apjm6h.jpg");
buttons += emoticonButton(":082:", "http://i42.tinypic.com/wuqnp3.jpg");
buttons += emoticonButton(":083:", "http://i41.tinypic.com/2eaqdfb.jpg");
buttons += emoticonButton(":084:", "http://i39.tinypic.com/256u2rd.jpg");
buttons += emoticonButton(":085:", "http://i40.tinypic.com/ta6104.jpg");
buttons += emoticonButton(":086:", "http://i42.tinypic.com/2h72yh4.jpg");
buttons += emoticonButton(":087:", "http://i40.tinypic.com/28topd.jpg");
buttons += emoticonButton(":088:", "http://i39.tinypic.com/wml8v6.jpg");
buttons += emoticonButton(":089:", "http://i44.tinypic.com/fnfyub.jpg");
buttons += emoticonButton(":090:", "http://i43.tinypic.com/1zydbhl.jpg");
buttons += emoticonButton(":091:", "http://i42.tinypic.com/1o4w3m.jpg");
buttons += emoticonButton(":092:", "http://i39.tinypic.com/96hiz7.jpg");
buttons += emoticonButton(":093:", "http://i40.tinypic.com/szdfmx.jpg");
buttons += emoticonButton(":094:", "http://i41.tinypic.com/14ieh4p.jpg");
buttons += emoticonButton(":095:", "http://i43.tinypic.com/oi515j.jpg");
buttons += emoticonButton(":096:", "http://i42.tinypic.com/2q36jjd.jpg");
buttons += emoticonButton(":097:", "http://i41.tinypic.com/10hw2zb.jpg");
buttons += emoticonButton(":098:", "http://i39.tinypic.com/538u4g.jpg");
buttons += emoticonButton(":099:", "http://i44.tinypic.com/2zix11y.jpg");
buttons += emoticonButton(":100:", "http://i41.tinypic.com/nwx7ki.jpg");
buttons += emoticonButton(":101:", "http://i43.tinypic.com/2rzp1s6.jpg");
buttons += emoticonButton(":102:", "http://i40.tinypic.com/spuc92.jpg");
buttons += emoticonButton(":103:", "http://i42.tinypic.com/mcqjk6.jpg");
buttons += emoticonButton(":104:", "http://i44.tinypic.com/15hdiip.jpg");
buttons += emoticonButton(":105:", "http://i40.tinypic.com/de8k1x.jpg");
buttons += emoticonButton(":106:", "http://i44.tinypic.com/nm0sbc.jpg");
buttons += emoticonButton(":107:", "http://i40.tinypic.com/nwzipt.jpg");
buttons += emoticonButton(":108:", "http://i39.tinypic.com/4j5duv.jpg");
buttons += emoticonButton(":109:", "http://i43.tinypic.com/2mcazd2.jpg");
buttons += emoticonButton(":110:", "http://i39.tinypic.com/fjgvq1.jpg");
buttons += emoticonButton(":111:", "http://i42.tinypic.com/4hqqa1.jpg");
buttons += emoticonButton(":112:", "http://i43.tinypic.com/4sjk8k.jpg");
buttons += emoticonButton(":113:", "http://i42.tinypic.com/25tf4ud.jpg");
buttons += emoticonButton(":114:", "http://i39.tinypic.com/96ghg6.jpg");
buttons += emoticonButton(":115:", "http://i40.tinypic.com/28lunue.jpg");
buttons += emoticonButton(":116:", "http://i44.tinypic.com/9rm05y.jpg");
buttons += emoticonButton(":117:", "http://i43.tinypic.com/24zei3r.jpg");
buttons += emoticonButton(":118:", "http://i41.tinypic.com/axiu7k.jpg");
buttons += emoticonButton(":119:", "http://i43.tinypic.com/10fqgq8.jpg");
buttons += emoticonButton(":120:", "http://i44.tinypic.com/9u7nn7.jpg");
buttons += emoticonButton(":121:", "http://i43.tinypic.com/2mdi25z.jpg");
buttons += emoticonButton(":122:", "http://i41.tinypic.com/20fst9j.jpg");
buttons += emoticonButton(":123:", "http://i41.tinypic.com/2z8c3tl.jpg");
buttons += emoticonButton(":124:", "http://i41.tinypic.com/21jsl8l.jpg");
buttons += emoticonButton(":125:", "http://i43.tinypic.com/2l9s7bo.jpg");
buttons += emoticonButton(":126:", "http://i43.tinypic.com/2gtyn42.jpg");
buttons += emoticonButton(":158:", "http://i43.tinypic.com/2q0t1lg.jpg");
buttons += emoticonButton(":159:", "http://i43.tinypic.com/313hwf7.jpg");
buttons += emoticonButton(":160:", "http://i43.tinypic.com/wtb0aq.jpg");
buttons += emoticonButton(":161:", "http://i41.tinypic.com/vsnxi0.jpg");
buttons += emoticonButton(":162:", "http://i43.tinypic.com/kd0a52.jpg");
buttons += emoticonButton(":163:", "http://i44.tinypic.com/16bxe2x.jpg");
buttons += emoticonButton(":164:", "http://i41.tinypic.com/6olmpx.jpg");
buttons += emoticonButton(":165:", "http://i41.tinypic.com/14l2hae.jpg");
buttons += emoticonButton(":166:", "http://i40.tinypic.com/2r70pa8.jpg");
buttons += emoticonButton(":167:", "http://i43.tinypic.com/2db1iqf.jpg");
buttons += emoticonButton(":168:", "http://i41.tinypic.com/2po16ab.jpg");
buttons += emoticonButton(":169:", "http://i40.tinypic.com/dvlrsy.jpg");
buttons += emoticonButton(":170:", "http://i41.tinypic.com/2u59fd4.jpg");
buttons += emoticonButton(":171:", "http://i43.tinypic.com/osqwea.jpg");
buttons += emoticonButton(":172:", "http://i42.tinypic.com/fjgftv.jpg");
buttons += emoticonButton(":173:", "http://i42.tinypic.com/1tk8ll.jpg");
buttons += emoticonButton(":174:", "http://i39.tinypic.com/2mn436p.jpg");
buttons += emoticonButton(":175:", "http://i40.tinypic.com/of0sn5.jpg");
buttons += emoticonButton(":176:", "http://i41.tinypic.com/1z18u3k.jpg");
buttons += emoticonButton(":177:", "http://i44.tinypic.com/728tud.jpg");
buttons += emoticonButton(":178:", "http://i40.tinypic.com/2vd5phd.jpg");
buttons += emoticonButton(":179:", "http://i44.tinypic.com/v7yvds.jpg");
buttons += emoticonButton(":180:", "http://i43.tinypic.com/5z402r.jpg");
buttons += emoticonButton(":181:", "http://i41.tinypic.com/30avnev.jpg");
buttons += emoticonButton(":182:", "http://i43.tinypic.com/29cmkix.jpg");
buttons += emoticonButton(":183:", "http://i40.tinypic.com/nlqzic.jpg");
buttons += emoticonButton(":184:", "http://i44.tinypic.com/10p3n2q.jpg");
buttons += emoticonButton(":185:", "http://i41.tinypic.com/2445sh3.jpg");
buttons += emoticonButton(":186:", "http://i41.tinypic.com/2nqglt4.jpg");
buttons += emoticonButton(":187:", "http://i42.tinypic.com/e96lo0.jpg");
buttons += emoticonButton(":188:", "http://i39.tinypic.com/op3hno.jpg");
buttons += emoticonButton(":189:", "http://i41.tinypic.com/oa7up2.jpg");
buttons += emoticonButton(":190:", "http://i42.tinypic.com/xbze49.jpg");
buttons += emoticonButton(":191:", "http://i42.tinypic.com/xciyvm.jpg");
buttons += emoticonButton(":192:", "http://i42.tinypic.com/5vn95t.jpg");
buttons += emoticonButton(":193:", "http://i44.tinypic.com/23vwz7l.jpg");
buttons += emoticonButton(":194:", "http://i41.tinypic.com/6xyww7.jpg");
buttons += emoticonButton(":195:", "http://i42.tinypic.com/2q83s7d.jpg");
buttons += emoticonButton(":196:", "http://i39.tinypic.com/359y0ix.jpg");
buttons += emoticonButton(":197:", "http://i42.tinypic.com/14o2jk5.jpg");
buttons += emoticonButton(":198:", "http://i42.tinypic.com/25zoxgm.jpg");
buttons += emoticonButton(":199:", "http://i39.tinypic.com/a454pi.jpg");
buttons += emoticonButton(":200:", "http://i41.tinypic.com/ra4wed.jpg");
buttons += emoticonButton(":201:", "http://i40.tinypic.com/1zgt4aq.jpg");
buttons += emoticonButton(":202:", "http://i42.tinypic.com/zusi38.jpg");
buttons += emoticonButton(":203:", "http://i44.tinypic.com/do3qye.jpg");
buttons += emoticonButton(":204:", "http://i42.tinypic.com/73f1n8.jpg");
buttons += emoticonButton(":205:", "http://i39.tinypic.com/243hmyw.jpg");
buttons += emoticonButton(":206:", "http://i44.tinypic.com/s4lv7n.jpg");
buttons += emoticonButton(":207:", "http://i41.tinypic.com/2emk2lj.jpg");
buttons += emoticonButton(":208:", "http://i39.tinypic.com/4skx1x.jpg");
buttons += emoticonButton(":209:", "http://i41.tinypic.com/2mrel2v.jpg");



	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);