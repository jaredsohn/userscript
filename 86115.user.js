// ==UserScript==
// @name         KyubunsEn v0.1
// @namespace    http://userscripts.org/users/192057
// @include      http://kyubuns.info/ss*
// ==/UserScript==

/*
** Translating Object
*/

var trans = {

   words_so: [], //single old

   words_sn: [], //single new

   words_go: [], //global old

   words_gn: [], //global new

   
   // Add word to translate

   add: function (mode, t_old, t_new) {

      if(mode == 's') {

         this.words_so.push(t_old);

         this.words_sn.push(t_new);

      }

      else if(mode == 'g') {

         this.words_go.push(t_old);

         this.words_gn.push(t_new);

      }

   },
   
   // Translate target

   translate: function (target) {

      if(typeof target == 'string') {

         return 0;

      }

      

      // Grab html

      html = target.innerHTML;



      // Replace words in html

      for(var i = 0; i < this.words_so.length; i++) {

         html = html.replace(new RegExp(this.words_so[i]), this.words_sn[i]);

      }

      for(var i = 0; i < this.words_go.length; i++) {

         html = html.replace(new RegExp(this.words_go[i], 'g'), this.words_gn[i]);

      }



      // Shove html

      target.innerHTML = html;
      
      // Clear Wordlists

      this.words_so.length = 0; //single old

      this.words_sn.length = 0; //single new

      this.words_go.length = 0; //global old

      this.words_gn.length = 0; //global new

   }

};

/*
** Translation
*/

/* Header Bar */ {
   trans.add('s', 'ゲスト さん', 'Guest');
   trans.add('s', 'ログイン', '　Login　');
   
   trans.add('s', 'サービス', 'Service');
   
   trans.add('s', 'あなたにオススメの動画を紹介', 'NicoNicoAdvisor');
   trans.add('s', 'twitter上で同じ趣味の人を探そう！', 'Find People with Similar Interests on Twitter!');
   
   trans.translate(document.body.childNodes[0]);
}
/* Other */ {
   trans.add('s', 'スキャン', 'Scan');
   trans.translate(document.body.childNodes[7].childNodes[5]);
   
   trans.add('s', '身体検査の結果、', '');
   trans.add('s', 'さんの能力は、', ' has a capacity of');
   trans.add('s', '結果を twitter に投稿', 'Post Results on Twitter');
   trans.add('s', '参考にさせて頂いたサイト : ', 'Other Raildex Sites: ');
   trans.add('s', 'とある魔術の禁書目録　Index', 'Index Wiki');
   trans.add('s', '意見感想は', 'Feel free to tweet me on ');
   trans.add('s', 'までお気軽にどうぞ。泣いて喜びます。', 'with what you think of this site');
   trans.translate(document.body.childNodes[7]);
}
/* Powers */ {
   trans.add('s', '能力名：', 'Ability: ');
   trans.add('s', '解説：', 'Description: ');
   
   // TODO: Add Power Translations
   //trans.add('g', '能力使い ( AIMライズ ) ', 'AIM MANIP'); 
   
   trans.translate(document.body.childNodes[7].childNodes[12]);
   // TODO: Change the translate to find the table tag,
   //        rather than hardcoding the path
}