// ==UserScript==
// @name        KG_ClearProfile
// @namespace   http://klavogonki.alexzh.ru
// @description Изменяет стилевое оформление профиля
// @author      voidmain
// @license     MIT
// @version     1.2
// @include     http://klavogonki.ru/u/*
// @grant       none
// @run-at      document-end 
// ==/UserScript==


function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
}


function main() {
    $$$('body').on('DOMNodeInserted', '.hidemain', function(e) {
        $$$(e.target).children('.hidetop').click(function()
		{
			var m = this.id.match(/hidetop-(.+)/);
            if(this.nextSibling.id == 'hidecont-'+m[1]) {
				Effect.toggle(this.nextSibling, 'slide', {duration: 0.3});
            }
			this.toggleClassName('expanded');
		});
    });
    
    angular.element('body').scope().$on('routeSegmentChange', function(e, obj) {        
        if(!obj.segment || obj.segment.name != "index") {
            return;
        }
        
        obj.segment.locals.$template = "<div class='row' id='profile-index'>\n\
<div class='col-xs-9'>\n\
<style>\
#profile-index .bio { margin: initial; }\
#profile-index .bio .content { margin: initial; max-height: none; padding: initial; border-top-right-radius: initial;  border-top-left-radius: initial; box-shadow: initial; }\
#profile-index .stats { border: none; }\
#profile-index .stats .content .stats-block { margin: 0 0 20px 0; }\
#profile-index .bio .btn-edit-bio { font-size: 18px; position: absolute; top: 8px; left: -45px; color: #B8E0FF; }\
#profile-index .bio .btn-edit-bio:hover { color: #ECF7FF; }\
#profile-index .bio .btn-edit-bio .glyphicon:before { content: \"\\e065\"; }\
</style>\n\
<div class='bio' ng:if='Me &amp;&amp; Me.id == $routeSegment.$routeParams.user || data.index.bio.text &amp;&amp; data.index.bio.edited_date || data.index.bio.old_text &amp;&amp; !data.index.bio.edited_date'>\n\
<a app:jq='tipsy' tipsy:options=\"{gravity: 'w'}\" class='btn-edit-bio' ng:href='#/{{$routeSegment.$routeParams.user}}/editbio/' ng:if='Me &amp;&amp; Me.id == $routeSegment.$routeParams.user' title=\"Редактировать\">\n\
<div class='glyphicon'></div>\n\
</a>\n\
<div ng:if='data.index.bio.text &amp;&amp; data.index.bio.edited_date || data.index.bio.old_text &amp;&amp; !data.index.bio.edited_date'>\n\
<div class='content'>\n\
<div app:bind-html-compiled='data.index.bio.old_text | trust' ng:if='!data.index.bio.edited_date'></div>\n\
<div app:bind-html-compiled='data.index.bio.text | marked' ng:if='data.index.bio.edited_date'></div>\n\
</div>\n\
</div>\n\
<div class='empty' ng:if='!data.index.bio.text &amp;&amp; data.index.bio.edited_date || !data.index.bio.old_text &amp;&amp; !data.index.bio.edited_date'>\n\
Не указано.\n\
</div>\n\
</div>\n\
</div>\n\
<div class='col-xs-3'>\n\
<div class='stats'>\n\
<div class='content'>\n\
<div class='stats-block'>\n\
<div class='title'>Рейтинговый уровень</div>\n\
<div class='stats-content'>\n\
<div class='icon-icomoon icon-star'></div>\n\
<span class='lg'>{{data.index.stats.rating_level}}</span>\n\
</div>\n\
</div>\n\
<div class='stats-block'>\n\
<div class='title'>Достижений</div>\n\
<a app:jq='tipsy' class='stats-content clickable' ng:href='#/{{$routeSegment.$routeParams.user}}/achievements/' tipsy:options=\"{gravity: 'e'}\" title='Посмотреть достижения'>\n\
<div class='icon-icomoon icon-trophy'></div>\n\
<span class='lg'>{{data.index.stats.achieves_cnt}}</span>\n\
</a>\n\
</div>\n\
<div class='stats-block'>\n\
<div class='title'>Пробег</div>\n\
<a app:jq='tipsy' class='stats-content clickable' ng:href='#/{{$routeSegment.$routeParams.user}}/stats/' tipsy:options=\"{gravity: 'e'}\" title='Посмотреть статистику'>\n\
<div class='icon-icomoon icon-road'></div>\n\
<span class='sm'>{{data.index.stats.total_num_races}}</span>\n\
<span class='xs' count='data.index.stats.total_num_races' ng:pluralize when=\"{one: 'текст', few: 'текста', many: 'текстов'}\"></span>\n\
</a>\n\
</div>\n\
<div class='stats-block'>\n\
<div class='title'>Рекорд в Обычном</div>\n\
<a app:jq='tipsy' class='stats-content clickable' ng:href='#/{{$routeSegment.$routeParams.user}}/stats/normal/' tipsy:options=\"{gravity: 'e'}\" title='Посмотреть статистику'>\n\
<div class='icon-icomoon icon-meter'></div>\n\
<span ng:if='data.index.stats.best_speed'>\n\
<span class='sm'>{{data.index.stats.best_speed}}</span>\n\
<span class='xs'>зн/мин</span>\n\
</span>\n\
<span ng:if='!data.index.stats.best_speed'>\n\
&mdash;\n\
</span>\n\
</a>\n\
</div>\n\
<div class='stats-block'>\n\
<div class='title'>Друзей</div>\n\
<a app:jq='tipsy' class='stats-content clickable' ng:href='#/{{$routeSegment.$routeParams.user}}/friends/list/' tipsy:options=\"{gravity: 'e'}\" title='Посмотреть друзей'>\n\
<div class='icon-icomoon icon-users'></div>\n\
<span>{{data.index.stats.friends_cnt}}</span>\n\
</a>\n\
</div>\n\
<div class='stats-block'>\n\
<div class='title'>Использует словарей</div>\n\
<div app:jq='tipsy' class='stats-content clickable' ng:click='IndexPage.onOpenVocs()' ng:if='data.index.stats.vocs_cnt &gt; 0' tipsy:options=\"{gravity: 'e'}\" title='Посмотреть словари'>\n\
<div class='icon-icomoon icon-bookmark'></div>\n\
<span>{{data.index.stats.vocs_cnt}}</span>\n\
</div>\n\
<div class='stats-content' ng:if='data.index.stats.vocs_cnt == 0'>\n\
<div class='icon-icomoon icon-bookmark'></div>\n\
<span>0</span>\n\
</div>\n\
</div>\n\
<div class='stats-block'>\n\
<div class='title'>Машин в гараже</div>\n\
<a app:jq='tipsy' class='stats-content clickable' ng:href='#/{{$routeSegment.$routeParams.user}}/car/' tipsy:options=\"{gravity: 'e'}\" title='Посмотреть гараж'>\n\
<div class='icon-icomoon icon-automobile'></div>\n\
<span>{{data.index.stats.cars_cnt}}</span>\n\
</a>\n\
</div>\n\
<div class='stats-block'>\n\
<div class='title'>Зарегистрирован</div>\n\
<div class='stats-content'>\n\
<div class='icon-icomoon icon-signup'></div>\n\
<span class='sm'>{{data.index.stats.registered | readableDate}}</span>\n\
</div>\n\
</div>\n\
</div>\n\
</div>\n\
</div>\n\
</div>";
	});
}


window.addEventListener("load", function() {
    exec(main);
}, false);