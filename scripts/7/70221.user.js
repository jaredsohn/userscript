// ==UserScript==
// @name           The West Avatare Pictate
// @namespace      http://userscripts.org/users/132272
// @description    Un script amuzant care o sa va picteze actualele avatare invechite si plictisitoare. Vechile avatare vor prinde o forma noua, noi peisaje, noi haine, noi infatisari. Acest script este creat doar pt. amuzament si nu afecteaza in nici un mod jocul.
// @include        http://*.the-west.*/game.php*
// @include        http://*.innogames.*/game.php*
// ==/UserScript==

var Greenhorn={
changeAvatar:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("/images/avatars/greenhorn_woman.jpg", "i");
var r2=new RegExp("/images/avatars/greenhorn_woman_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i44.tinypic.com/k9j02g.png";
if(r2.test(img[i].src)){
img[i].src="http://i44.tinypic.com/2evg11i.png";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("/images/avatars/greenhorn.jpg", "i");
var r2=new RegExp("/images/avatars/greenhorn_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i44.tinypic.com/35ddmww.png";
if(r2.test(img[i].src)){
img[i].src="http://i42.tinypic.com/2vkhwz7.png";
}
}
var r1=new RegExp("/images/avatars/trapper.jpg", "i");
var r2=new RegExp("/images/avatars/trapper_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i40.tinypic.com/9kup0y.png";
if(r2.test(img[i].src)){
img[i].src="http://i40.tinypic.com/5a3jip.png";
}
}
var r1=new RegExp("/images/avatars/vagabond.jpg", "i");
var r2=new RegExp("/images/avatars/vagabond_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i45.tinypic.com/sy6peb.jpg";
if(r2.test(img[i].src)){
img[i].src="http://i46.tinypic.com/2ugc7ev.jpg";
}
}
var r1=new RegExp("/images/avatars/indian.jpg", "i");
var r2=new RegExp("/images/avatars/indian_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i46.tinypic.com/2crksnl.png";
if(r2.test(img[i].src)){
img[i].src="http://i50.tinypic.com/30j2ts5.png";
}
}
var r1=new RegExp("/images/avatars/indian_woman.jpg", "i");
var r2=new RegExp("/images/avatars/indian_woman_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://img32.picoodle.com/img/img32/3/2/20/f_4m_75b800f.png";
if(r2.test(img[i].src)){
img[i].src="http://i47.tinypic.com/6xxb7t.png";
}
}
var r1=new RegExp("/images/avatars/goldseeker.jpg", "i");
var r2=new RegExp("/images/avatars/goldseeker_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i45.tinypic.com/2vvui6a.png";
if(r2.test(img[i].src)){
img[i].src="http://i49.tinypic.com/2vt2icy.png";
}
}
var r1=new RegExp("/images/avatars/bountyhunter.jpg", "i");
var r2=new RegExp("/images/avatars/bountyhunter_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i45.tinypic.com/2mcvd5i.png";
if(r2.test(img[i].src)){
img[i].src="http://i49.tinypic.com/29d8fex.png";
}
}
var r1=new RegExp("/images/avatars/gunslinger.jpg", "i");
var r2=new RegExp("/images/avatars/gunslinger_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i40.tinypic.com/3fmgi.png";
if(r2.test(img[i].src)){
img[i].src="http://i44.tinypic.com/20qm136.png";
}
}
var r1=new RegExp("/images/avatars/bandit.jpg", "i");
var r2=new RegExp("/images/avatars/bandit_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i40.tinypic.com/110x5yo.png";
if(r2.test(img[i].src)){
img[i].src="http://i39.tinypic.com/o56qed.png";
}
}
var r1=new RegExp("/images/avatars/cowboy.jpg", "i");
var r2=new RegExp("/images/avatars/cowboy_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i32.tinypic.com/9ss3m8.jpg";
if(r2.test(img[i].src)){
img[i].src="http://i38.tinypic.com/2rh4m1g.png";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("/images/avatars/hangdog_woman.jpg", "i");
var r2=new RegExp("/images/avatars/hangdog_woman_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i46.tinypic.com/2niw8jl.png";
if(r2.test(img[i].src)){
img[i].src="http://i45.tinypic.com/29m3wg7.png";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("/images/avatars/pilgrim_woman.jpg", "i");
var r2=new RegExp("/images/avatars/pilgrim_woman_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i50.tinypic.com/245deu1.png.jpg";
if(r2.test(img[i].src)){
img[i].src="http://i46.tinypic.com/ix812d.png";
}
}
var r1=new RegExp("/images/avatars/worker.jpg", "i");
var r2=new RegExp("/images/avatars/worker_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i48.tinypic.com/2ngzrr4.png";
if(r2.test(img[i].src)){
img[i].src="http://i50.tinypic.com/1o7vqa.png";
}
}
var r1=new RegExp("/images/avatars/worker_woman.jpg", "i");
var r2=new RegExp("/images/avatars/worker_woman_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i47.tinypic.com/315zlex.png";
if(r2.test(img[i].src)){
img[i].src="http://i46.tinypic.com/2la4sbt.png";
}
}
var r1=new RegExp("/images/avatars/undertaker.jpg", "i");
var r2=new RegExp("/images/avatars/undertaker_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i45.tinypic.com/2u74rk2.png";
if(r2.test(img[i].src)){
img[i].src="http://i50.tinypic.com/svosv7.png";
}
}
var r1=new RegExp("/images/avatars/cavalry.jpg", "i");
var r2=new RegExp("/images/avatars/cavalry_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i49.tinypic.com/zja4hw.png";
if(r2.test(img[i].src)){
img[i].src="http://i46.tinypic.com/eporyg.png";
}
}
var r1=new RegExp("/images/avatars/mexican.jpg", "i");
var r2=new RegExp("/images/avatars/mexican_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i47.tinypic.com/33ooej9.png";
if(r2.test(img[i].src)){
img[i].src="http://i48.tinypic.com/5mmmti.png";
}
}
var r1=new RegExp("/images/avatars/mexican_woman.jpg", "i");
var r2=new RegExp("/images/avatars/mexican_woman_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i40.tinypic.com/24qlufl.png";
if(r2.test(img[i].src)){
img[i].src="http://i39.tinypic.com/bkbyg.png";
}
}
var r1=new RegExp("/images/avatars/mercenary.jpg", "i");
var r2=new RegExp("/images/avatars/mercenary_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i44.tinypic.com/29wa937.png";
if(r2.test(img[i].src)){
img[i].src="http://i40.tinypic.com/r20ub8.png";
}
}
var r1=new RegExp("/images/avatars/mercenary_woman.jpg", "i");
var r2=new RegExp("/images/avatars/mercenary_woman_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i36.tinypic.com/aujph.jpg";
if(r2.test(img[i].src)){
img[i].src="http://i36.tinypic.com/10xrkad.png";
}
}
var r1=new RegExp("/images/avatars/iroquois.jpg", "i");
var r2=new RegExp("/images/avatars/iroquois_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i48.tinypic.com/21dq3jc.png";
if(r2.test(img[i].src)){
img[i].src="http://i50.tinypic.com/29makur.png";
}
}
var r1=new RegExp("/images/avatars/iroquois_woman.jpg", "i");
var r2=new RegExp("/images/avatars/iroquois_woman_small.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i47.tinypic.com/nzk8iu.png";
if(r2.test(img[i].src)){
img[i].src="http://i50.tinypic.com/11lqwjt.png";
}
}



},


changeWestFunction:function(){
  var loc = document.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		Greenhorn.changeAvatar(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
  unsafeWindow.AjaxWindow.setJSHTML = f;
  },
  changePlayerAvatar:function(){
   
var r=new RegExp("images/avatars/greenhorn_woman_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i44.tinypic.com/2evg11i.png";
   }
var r=new RegExp("images/avatars/greenhorn_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i42.tinypic.com/2vkhwz7.jpg";
   }
var r=new RegExp("/images/avatars/trapper_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i40.tinypic.com/5a3jip.png";
   }
var r=new RegExp("/images/avatars/vagabond_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i46.tinypic.com/2ugc7ev.jpg";
   }
var r=new RegExp("/images/avatars/indian_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i50.tinypic.com/30j2ts5.png";
   }
var r=new RegExp("/images/avatars/indian_woman_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i47.tinypic.com/6xxb7t.png";
   }
var r=new RegExp("/images/avatars/goldseeker_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i47.tinypic.com/2ep7o13.png";
   }
var r=new RegExp("/images/avatars/bountyhunter_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i49.tinypic.com/29d8fex.png";
   }
var r=new RegExp("/images/avatars/gunslinger_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i44.tinypic.com/20qm136.png";
   }
var r=new RegExp("/images/avatars/bandit_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i39.tinypic.com/o56qed.png";
   }
var r=new RegExp("/images/avatars/cowboy_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i38.tinypic.com/2rh4m1g.png";
   }
var r=new RegExp("/images/avatars/hangdog_woman_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i45.tinypic.com/29m3wg7.png";
   }     
var r=new RegExp("/images/avatars/pilgrim_woman_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i46.tinypic.com/ix812d.png";
   }
var r=new RegExp("/images/avatars/worker_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i50.tinypic.com/1o7vqa.png";
   }
var r=new RegExp("/images/avatars/worker_woman_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i46.tinypic.com/2la4sbt.png";
   }
var r=new RegExp("/images/avatars/undertaker_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i50.tinypic.com/svosv7.png";
   }
var r=new RegExp("/images/avatars/cavalry_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i46.tinypic.com/eporyg.png";
   }  
var r=new RegExp("/images/avatars/mexican_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i48.tinypic.com/5mmmti.png";
   }  
var r=new RegExp("/images/avatars/mexican_woman_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i39.tinypic.com/bkbyg.png";
   }  
var r=new RegExp("/images/avatars/mercenary_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i40.tinypic.com/r20ub8.png";
   } 
var r=new RegExp("/images/avatars/mercenary_woman_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i36.tinypic.com/10xrkad.png";
   } 
var r=new RegExp("/images/avatars/iroquois_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i50.tinypic.com/29makur.png";
   }  
var r=new RegExp("/images/avatars/iroquois_woman_small.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i50.tinypic.com/11lqwjt.png";
   }  
 


}
};



Greenhorn.changeWestFunction();
Greenhorn.changePlayerAvatar();