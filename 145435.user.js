// ==UserScript==
// @name		[HFR] Vos smileys favoris
// @namespace	http://forum.hardware.fr
// @description	Permet d'afficher une liste illimitée de smileys favoris personnels, ainsi que des statistiques sur leur utilisation (historique et les plus utilisés)
// @include		http://forum.hardware.fr/*
// @version		1.4.6
// @require		http://forum-images.hardware.fr/compressed/editPost.js?v=11102781422
// @require		http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/redips-drag-min.js
//
// @resource	Script_CSS http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/styles.css
// @resource	JQuery http://code.jquery.com/jquery-1.6.2.min.js
// @resource	JQueryUI_JS http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/jquery-ui-1.8.16.custom.min.js
// @resource	JQueryUI_CSS http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/jquery-ui-1.8.16.custom.css
//
// @resource    ui-bg_diagonals-thick_18_b81900_40x40.png       http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-bg_diagonals-thick_18_b81900_40x40.png
// @resource    ui-bg_glass_100_f6f6f6_1x400.png                http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-bg_glass_100_f6f6f6_1x400.png
// @resource    ui-bg_diagonals-thick_20_666666_40x40.png       http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-bg_diagonals-thick_20_666666_40x40.png
// @resource    ui-bg_glass_65_ffffff_1x400.png                 http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-bg_glass_65_ffffff_1x400.png
// @resource    ui-bg_gloss-wave_35_f6a828_500x100.png          http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-bg_gloss-wave_35_f6a828_500x100.png
// @resource    ui-icons_222222_256x240.png                     http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-icons_222222_256x240.png
// @resource    ui-bg_flat_10_000000_40x100.png                 http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-bg_flat_10_000000_40x100.png
// @resource    ui-icons_ef8c08_256x240.png                     http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-icons_ef8c08_256x240.png
// @resource    ui-icons_ffd27a_256x240.png                     http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-icons_ffd27a_256x240.png
// @resource    ui-bg_glass_100_fdf5ce_1x400.png                http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-bg_glass_100_fdf5ce_1x400.png
// @resource    ui-icons_228ef1_256x240.png                     http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-icons_228ef1_256x240.png
// @resource    ui-icons_ffffff_256x240.png                     http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-icons_ffffff_256x240.png
// @resource    ui-bg_highlight-soft_75_ffe45c_1x100.png        http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-bg_highlight-soft_75_ffe45c_1x100.png
// @resource    ui-bg_highlight-soft_100_eeeeee_1x100.png       http://fred.82.free.fr/hfr_greasemonkey/VSF/libs/jquery-ui-1.8.16/images/ui-bg_highlight-soft_100_eeeeee_1x100.png
//
// ==/UserScript==

// Création : 15/09/2010
// Dernière MAJ : 22/11/2012
// Auteur : Fred82

// Attention : si le script est renommé, les statistiques de smileys ne seront plus associées au script et sembleront perdues. Il sera cependant possible de les récupérer via le menu about:config de Firefox.

/* Chaque smiley est mémorisé sous une forme déterminée dont voici un exemple (format "Json") :
	":love:":{"c":":love:","s":2,"d":"2011/11/22 8:53:10","fav":true}
	
	c : code du smiley en format entier (string). ex : [:toto:1].
	s : nombre d'utilisations (entier).
	d : date de dernière utilisation (string) ex: 2011/10/5 21:52:33.
	fav : indique le status favoris (bool).
*/

// =============================================================== //
// Variables
// =============================================================== //

// Réglages système
var configWindowHeight = "460px";
var configWindowWidth = "720px";
var favoriteWindowHeight = "200px";
var favoriteWindowWidth = "300px";
var i_tab_yoursmileys = 2; // Indice de l'onglet "Vos smileys" dans le système d'onglets de la fenêtre de configuration
var panelMaxHeight = "200px"; // Hauteur de chaque contenu d'onglet en "réponse classique"

var image_general_url = "http://forum-images.hardware.fr/icones/"; // Url pour les smileys de base généraux (:o)
var image_base_url = "http://forum-images.hardware.fr/icones/smilies/"; // Url pour les smileys de base (:ouch:)
var image_utilisateur_url = "http://forum-images.hardware.fr/images/perso/"; // Url pour les smileys utilisateur

// Variables de stockage temporaire
var root = null; // Elément HTML correspondant à la racine du panneau d'édition d'un message sur la page HFR
var smileys_stats = {}; // Conteneur des statistiques de smiley (format Json)
var initial_message = null; // Stockage du post HFR initial
var initial_messageFastReply = null; // Stockage du post HFR initial du mode "Fast Reply"
var resizeTimer = null; // Timer pour l'enregistrement des dimensions du panneau des favoris
var includeChoiceChanged; // Indique si l'utilisateur a changé le choix "Intégration des smileys favoris HFR"

// Clés des objets HTML
var key_top = "top_";
var key_history = "history_";
var key_fav = "fav";
var key_fav_img = "fav_img";
var key_favmsg = "favmsg_";

// Identifiants systèmes d'onglets
var key_tabberSmileysPanel = "tabberSmileysPanel"; // Onglets {top, historique, favoris}
var key_tabberSmileysParameters = "tabberSmileysPanel_Parameters"; // Onglets {top, historique, favoris}, dans la fenêtre des paramètres
var key_tabberConfigWindow = "tabberConfigWindow"; // Onglets de la fenêtre des paramètres

// Identifiants onglets
var key_tab_settings = "tab_settings"; // Paramètres
var key_tab_backup = "tab_backup"; // Sauvegarde
var key_tab_yoursmileys = "tab_yoursmileys"; // Vos smileys
var key_tab_top = "tab_top"; // Top
var key_tab_history = "tab_history"; // Historique
var key_tab_favorite = "tab_favorite"; // Favoris

var key_favoritePanel = "favoritePanel";

var id_tab_top = "id_tab_top";
var id_tab_history = "id_tab_history";
var id_tab_favorite = "id_tab_favorite";

var keyWindowConfig = "WindowConfig";
var keyWindowFavorite = "WindowFavorite";
var keyFavoritesList = "FavoritesList";

var keyFavWordIconShow = "keyFavWordIconShow";

var keyDraggablePanel = "keyDraggablePanel";
var keyDroppableTable = "keyDroppableTable";

var keyDroppableCellTopLeft = "keyDroppableCellTopLeft";
var keyDroppableCellTopRight = "keyDroppableCellTopRight";
var keyDroppableCellTopMiddle = "keyDroppableCellTopMiddle";
var keyCellMiddle = "keyCellMiddle";
var keyRowTop = "keyRowTop";
var keyRowBottom = "keyRowBottom";

var position_left = "left";
var position_up = "up";
var position_right = "right";
var position_down = "down";

// Textes
var script_name = "Vos smileys favoris";
var tab_top_title = "Top";
var tab_history_title = "Historique";
var tab_favorite_title = "Favoris";

// Réglages utilisateur (modifiables dans la fenêtre de configuration). Les valeurs indiquées ci-dessous sont les valeurs par défaut.
var sm_count = 10; // // Nombre maximal de smileys affichés sur le panneau
var sm_confirm_delete = true; // Confirmer la suppression de smileys
var sm_include_fav = true; // Inclure les favoris dans les panneaux "Top" et "Historique"
var sm_fav_world = true; // Permettre de définir des favoris sur toutes les pages du forum
var sm_fav_world_icon = null; // Icône affichée à côté de chaque message pour afficher ses smileys
var sm_notify_new = false; // Être notifié quand un nouveau smiley est trouvé dans votre nouveau message
var sm_fast_reply = true; // Afficher le panneau de smileys à côté de la réponse rapide
var sm_current_tab = key_tab_top; // Onglet affiché par défaut
var sm_config_tab = key_tab_settings; // Onglet affiché par défaut dans la fenêtre de configuration
var sm_config_smiley_tab = key_tab_top; // Onglet affiché par défaut dans la fenêtre de configuration, onglet "Vos smileys"
var sm_fav_panel_width = "500px"; // Largeur du panneau des favoris
var sm_fav_panel_height = "100px"; // Hauteur du panneau des favoris
var sm_fav_position = position_up; // Position du panneau des favoris
var sm_include_hfr_fav = null; // Inclure les 10 smileys favoris prévus dans HFR

// Clés des variables utilisateur. "sm" pour "smiley".
var key_sm_smiley_stats = "sm_smiley_stats";
var key_sm_count = "sm_count";
var key_sm_confirm_delete = "sm_confirm_delete";
var key_sm_include_fav = "sm_include_fav";
var key_sm_fav_world = "sm_fav_world";
var key_sm_fav_world_icon = "sm_fav_world_icon";
var key_sm_notify_new = "sm_notify_new";
var key_sm_fast_reply = "sm_fast_reply";
var key_sm_current_tab = "sm_current_tab";
var key_sm_config_tab = "sm_config_tab";
var key_sm_config_smiley_tab = "sm_config_smiley_tab";
var key_sm_fav_panel_width = "sm_fav_panel_width";
var key_sm_fav_panel_height = "sm_fav_panel_height";
var key_sm_fav_position = "sm_fav_position";
var key_sm_include_hfr_fav = "sm_include_hfr_fav";

// Images incorporées
var icon_fav_active = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6lJREFUeNq0VdtLFFEc%2FmZmXfO2FnaxC8XGhmFZRjeCgiDqJXoIeqkoCIQICnos7Km%2FoKinQAgCX3qIHoIg6ClQhMguCJa6XrKsLTPNdtu5nL7fnDPuaqv71GG%2BOTNzzvl%2B999Y6vVq%2FDMswubN4VxBfAqAnLoMhVYE6jo2OBk4XPcVsP0Llhox%2BCXIraLnGZJMqwOwcSf85iOOr8F5rKH0wEK5YYebIqhotvWz4CsFeGhH9XJg514KsM5gGk3IFWuylACfZIFTgJLZ1kJ%2Bk%2BAndiNvHcemJiDPb3aVA9e6hozS%2B8oKkMuytM9Dv9vaiiwxoUTjdlTWkhwaTdtl%2FRxmkMJsWX7GIMt7lkH0hAx65oUg9HcLcRKpZpIrfUIUsCsd%2BPl2jPsXylvwiaw%2FldbYjfxvb6SWB6n9LcRrJAZci8A9zTvEsnOM0VE8XJdaSoClHqzbB6VO0T1JxiwZpqJigkoK1tYDyS20RmnApG%2BMGElTse8I01XHuo%2FnxrkvTYVeYKXTiRNjvqUeb%2FyN76hCXQJIEKtW6tAIoa%2Fmk4cqGUInipm8cH1ykinNoExNA%2FEcuZyLOD58L8YMmUBdLInGzZowDFygyZSBMKqi2pirl7kNFMQ0TtDihhVMjgG6nNaEqrrWEbj%2BKD72ac2zSqoW%2BGOyxjWx8Qyid1mTPbJXzsh7QO3GBmX9Ck4NPzEC7DRxCPlgAMPvqAl7g2treGUQCuMsteSRfHxE3i%2FidPpuIYukePL2KHGIB%2Frw7pU5WKT9YsibefIHyUeFpw3nB%2B%2FNT9PCgQniMNO1F0NjBZeUg9RH%2F4jPsxfQ9qHj3zrw5mmVoT9v4PM344Yy5OKaAbolh0e49P5%2B6Ur2rELGyMixkflR08P8NSzIJBk1zJzMVGqJZsfm5psm54eBa0F1AqEQz8TCMwi%2FmYr2jBL1DVL5zbi5NV5aQHjQEOTD1tyMBHPZVYX%2BVBED1lLTtWx6Ncs0sazJHsvR%2F4hs0FTaRW6RvTmakacA6f3yPc7DDexF75m%2B%2FTOyQ1pjFfbtZ5ugGbN%2FtPukBmzVwvvb0j%2BcyAKbFR1zalFdTeI6lj5%2Fhz3dLP9fz7lvD7GBuI3uniz63wCNtKqqkhbSO%2FFY6yIuijIi%2FIMlUc8DPovmZQ%2FwOdPL78eII8RLYpK4SmyBG3Sgq9vHcD%2BQWi9uTC3yyzStR6OLeIrBoV7OZ4ldxLMFewTsmmgjtmE224mJL2k%2Bd5Ru10rhfw4b%2F3n8FWAAwna8wfz7wJUAAAAASUVORK5CYII%3D";

var icon_fav_inactive = "data:binary;base64,R0lGODlhGAAYAOZNAP%2F%2F%2F%2Fj4%2BPv7%2B%2Ff39%2Fn5%2Bfr6%2Bvb29vLy8vT09PPz8%2F7%2B%2Fvz8%2FN3d3c3Nze%2Fv762trevr6%2F39%2Fefn5%2Bzs7O3t7bi4uNDQ0PHx8dXV1ejo6MnJyeXl5dzc3KioqN7e3sfHx9LS0r6%2Bvrq6utnZ2fDw8MzMzOrq6sXFxbm5ueTk5OPj4%2BLi4tHR0bCwsMHBwbW1tdvb28vLy%2B7u7sPDw%2FX19crKytjY2Le3t6SkpKurq7S0tOHh4ebm5tbW1qenp56enunp6aysrK6urtra2sLCws%2FPz8DAwL29vby8vN%2Ff37Ozs9PT09fX1%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAE0ALAAAAAAYABgAAAf%2FgE2Cg4QcJQGEiYqJEwwkNYuRiTUAAAwXkpIUHpUBMZmRGgaVACMHoIkOnKQDDaiCNBA9AaSVGxkIixMsSyNJEjIFtaQJJjtDGBYeCk0vJsLDCtLDlQIOGkxNQhkDC6QKERELC%2BEKpAsEBx%2BuISgSBgEEAvP09QQBARcWORBNBkc3eMArUM8evgtFHqwYNMDIixQ0AhSYSHHigAEOGjxQkYiAiwpABhAYSXKkgQMgHqRYRKAChwH4YsYcAKHCBkknGAS4aKCngYsDKIjIJEJCAAMIkiqFZ%2BBEBEkiKCBIQDXBgaoIBljot0hBCBkHDjhQwSIGjAlhD2AAEenaARIbPTQqQdHBBQMKBzggiQSDyAoLLVqUuFDARoUOMxhgeBApw48OQT5MIBQAgw4fOEJEWtDgg4RICEDM4PqqdCAAOw%3D%3D";

var icon_cancel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184%2Bd18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX%2BAv2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30%2BNlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2%2BDl1h7IdA%2Bi97A%2FgeP65WhbmrnZZ0GIJpr6OqZqYAd5%2FgJpKox4Mg7pD2YoC2b0%2F54rJQuJZdm6Izcgma4TW1WZ0h%2By8BfbyJMwBmSxkjw%2BVObNanp5h%2FadwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1%2FvwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY%2BP8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok%2BnsNTipIEVnkywo%2FFHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa%2BDt9XfxoFSNYF%2FBh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs%2FQZyu6TH2%2B2%2BFAAAAABJRU5ErkJggg%3D%3D";

var icon_validate = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVDjLpZPrS1NhHMf9O3bOdmwDCWREIYKEUHsVJBI7mg3FvCxL09290jZj2EyLMnJexkgpLbPUanNOberU5taUMnHZUULMvelCtWF0sW%2Fn7MVMEiN64AsPD8%2Fn83uucQDi%2Fid%2FDBT4Dolypw%2Fqsz0pTMbj%2FWHpiDgsdSUyUmeiPt2%2BV7SrIM%2BbSss8ySGdR4abQQv6lrui6VxsRonrGCS9VEjSQ9E7CtiqdOZ4UuTqnBHO1X7YXl6Daa4yGq7vWO1D40wVDtj4kWQbn94myPGkCDPdSesczE2sCZShwl8CzcwZ6NiUs6n2nYX99T1cnKqA2EKui6%2BTwphA5k4yqMayopU5mANV3lNQTBdCMVUA9VQh3GuDMHiVcLCS3J4jSLhCGmKCjBEx0xlshjXYhApfMZRP5CyYD%2BUkG08%2Bxt%2B4wLVQZA1tzxthm2tEfD3JxARH7QkbD1ZuozaggdZbxK5kAIsf5qGaKMTY2lAU%2FrH5HW3PLsEwUYy%2BYCcERmIjJpDcpzb6l7th9KtQ69fi09ePUej9l7cx2DJbD7UrG3r3afQHOyCo%2BV3QQzE35pvQvnAZukk5zL5qRL59jsKbPzdheXoBZc4saFhBS6AO7V4zqCpiawuptwQG%2BUAa7Ct3UT0hh9p9EnXT5Vh6t4C22QaUDh6HwnECOmcO7K%2B6kW49DKqS2DrEZCtfuI%2B9GrNHg4fMHVSO5kE7nAPVkAxKBxcOzsajpS4Yh4ohUPPWKTUh3PaQEptIOr6BiJjcZXCwktaAGfrRIpwblqOV3YKdhfXOIvBLeREWpnd8ynsaSJoyESFphwTtfjN6X1jRO2%2BFxWtCWksqBApeiFIR9K6fiTpPiigDoadqCEag5YUFKl6Yrciw0VOlhOivv%2FFf8wtn0KzlebrUYwAAAABJRU5ErkJggg%3D%3D";

var icon_toolbox = "data:binary;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAFaUlEQVRIiZ2Ve2xUVR7HP%2FfeeU87nVcfQ6WlPAK4grVIgZbCCraIqNFSdRnAoJvNLlZ2VxdMIFY08ZGIXa34ImJArI8Yirrg%2BiJ0gWiQdailQmmxQgvttDO0Zei0nc7Mvcc%2FdLQULcRvcnNOfud7vp%2Bc3z3JkR7f%2BBgAxSUl%2FHPNGnQ6Hd4VXiaOn0BC3pUrGalV99xLXNOIRmNSopabe60Y6ZN%2FGm8DBPDHS5JG1%2FqCwlmthXNnaYWFsz8Exl4CqP%2Bmjvpv6lJyr7uWN95%2BqxbwXkHwOODF8vK%2FPTV%2F%2Fryx43NyiEYiCyxmU7i56QTDP2XqlCkAR1u%2BaxlTXFIyw%2BVOXTowEN7kdDhjibSlpaXUvP%2F%2BcEDRzl01z1nNJk40NrJt%2B%2FbDJrNlfG8gkByJRl8DdiWMumGb%2Fvpg%2BQNNT296pvKI70g%2FCCMQTSx6l130H7JsNhuappGWlsp106fn90eiE90ZnpPpY2gbbhwOAPj37OnTmw%2F6fLuP%2BHxDICRVVUFTsVotw30ZiqIQiUTQGwy4UjOwDA6enDVnDjU171WNBgDYc%2Bv8uYt27z%2F46RGfTwASwMNmC68oP1%2BSnHA4zHOVz9Ph72TDI%2Bs539PL6VOn7uv0n4sMD5P5dX12y7yCwry8GQxvU07HEBX1NzCkOpc3NzRRdvefyMzKwWSy4HS7qa3dLwPvXAkA4Munn3iyfGZ%2Bvh4IJoqiVZytalvIvuYIbacaicTj%2BzZvfvGF6up3KoHXR4aMBgB4uerZypVF84vc8dhQT0t7uL3%2B3PLMAQyse9fG5i1713Z3nNkK%2FANY%2B2sBlwMAVL9ddOP9ro0Vjr8vmzEmImvU718IgeCCjAypkhEtGSlp2oYDALhdKei1HkwGcBiNpNgthGIKdX06inZW9663N9h1mVlIRiPn9u5lX4dfygsEUIEQYDXLyDqwe1KwZaZc%2BQk620Sfr%2F4r%2B%2BFDX9O%2B9xPMhYXYrrqKLL1OnExPt1xu%2F6iA02dFb%2BDAd0mH8l%2Fi0My1hPsiHFy9GuM10yi4788YZbn%2FRHp69e8CnGoX4cMHO%2Bz0JTN5cTbbb3%2BAJ3R%2FSNJL8uovd%2BzAXFTEoooKJFh%2B1OUSLclO9xUDTp8RHV%2F8z28dbB5gnHc2ZkUj8GHdLU5TUn%2F6wMCrfZp27vNVqzAXFHBXVRVuRaFLFcGTZmfeZQFtbaKx4duwp6chRPqdCxjrgWO1vlflbOmjhGdSMJgaUlUOlZVhzM3Fu207qYpCQBW%2BVl2S%2BzcBZ1rFR36%2FeUqPrxv7TfOYdo2J%2Btpv25LGSasTno5QiF5V5YKm3eEPh6krLUU%2FaSLeHW%2FiVhQC3dFgu2yRLgGcbRVPpk7Iu9lgTSW1pJDcmS4av%2Fge9zgpGyB52xz2dH3M7S5b4hQfBFX1vz2hEA2lpRgmjMe79XVMkoT%2FeK%2BWLDtJlp0%2FArpOC3dUcmw47Ov7yprtaZtd7OH7E2H8fjW%2FM2RCvDz3ojYucdlZ7LCTEwwuORuL7YpeuEBTWRm67CyWVDzKJM8YuhTTIgDSiv%2BFacqDae5Vx8X178Z6ylviIn1NQEiOuctsQIoMdguk2BSsDgtGlw3ZZQeHHewOsNj5S1KS9%2FPMTPH15Mki6veLvt17RHBhHsGFeUhpxQ8B0H%2Fs2M60xRuXKmqU9v%2Bsq9F6%2Fr%2FeCGmSTLJkwix0iiGuGKW4rCOGrGoaQwhpkKg4T5wz2fEL67Z4PA9dPXUqKw4cuClHVj4FfgHIXcfpPPrJZAWEHrqNkKKCGQmrpmASMnqhNyiqrCcmyTFUMQQigiYNIhv69QPnAwLhENC7wmj6%2BU0Y%2BeA0KYDhx3n3yCs8moyyjNCEP452Uf0HjT8i%2FoAt5zIAAAAASUVORK5CYII%3D";

var icon_scan_smileys = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M%2F3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAq9JREFUeNpi%2FP%2F%2FPwMIMIGI5UrS%2FwECiBEmwgLi%2FfvzhwEggMAiJ5Rl%2FrPycX%2F6%2FfErHwNIQJKTg6FbQQqsFiCA4HpggOWMrvL%2FP19%2BAM1lZGCXlAxjesTJu%2BQ%2BIwPDfaDK93IKq8HKSuQkt3pJSwiALAcIILAZN13tGFk%2BvVvxj4Gxh0FO6TTzswcz%2Fv78u53Fxm4jWME2Ran%2FjExMDOiAhZu7ngXE4AkOY7yydvVboFohiNR%2FBg07e9XzX7%2FfAZvAwsgIkuD4B3Qb0NE%2FmBkYOIH8X0D8ESCAMPyBYc2D0nyG3wf3%2BTGzMnv%2FEZNOZ3z%2BxJjp%2F9%2FSP1x8UWy6ev8Yz9maB%2F188mQtA9Cv4PD68IUPFAgsXOwMLBIyjCxvPn7U%2FMMINe%2FTV7Ak2JlfvjNwfPnMwMRqaNz67vdvhg9AtyDj70LCy%2F%2FLKzIwXfv%2Bg0HC0UX53d%2F%2FDO%2BA3gDh9%2F8Y3ki6uketePKcgREUPEAxBldxEX43TrYPL%2F%2F%2B37Ho1VvPVz9%2FMTCDghpIsAFpQSBmAyr8DgoPJlBIAcMDiN8BBBjBcCAEwFFxLyeN4eflC%2FP%2Fff2U8PfHb6D5%2FxmYOVgZWKXlYhmZmP%2F9enR%2F6d%2BfvxkYgQHAxMHGwMTJvZhNUy8OFCJgFxzSVur89%2Bt3GYZrYFxGVGFGoEmMrCw9%2F%2F8zloJd8EtKbu3n27fKGLCkGBSDYNx%2Ffxl4ZRXXs%2FLwQLzArqx86r%2BUlMizkyeO%2Fvn%2BXZ0Rh0H%2F%2F%2F0DxjDXbUlTM2tOLq7XzIxQLzABGWpiYgw%2BasoM6r9%2BaPx9927bz9%2B%2FFP%2FAAgooz87K%2BvA%2FN4%2FbbU7uW1vu3Ge48%2Fo12GGw5MoBZAuAHAOMKlagxB9WoCvcBPnaQWp2v%2F9U%2Bevfv%2F%2FAoGABug1k7k9QwgLibxRHIwCCkh098PuDEQAAAABJRU5ErkJggg%3D%3D";

// Règle pour obtenir les smileys utilisateur : de la forme [:toto] ou [:toto:1]
var userSmileyRegExp = /\[:[\w\s-@:]+\]/g;

// Liste des smileys HFR de base
var baseSmileys = [":whistle:", ":wahoo:", ":vomi:", ":sweat:", ":sum:", ":spookie:", ":spamafote:", ":sol:", ":sleep:", ":sarcastic:", ":pt1cable:", ":pouah:", ":pfff:", ":ouimaitre:", ":ouch:", ":non:", ":na:", ":mouais:", ":mmmfff:", ":miam:", ":mad:", ":love:", ":lol:", ":kaola:", ":jap:", ":int:", ":hot:", ":hello:", ":heink:", ":hebe:", ":hap:", ":gun:", ":gratgrat:", ":fuck:", ":fouyaya:", ":foudtag:", ":fou:", ":evil:", ":eek2:", ":eek:", ":dtc:", ":cry:", ":crazy:", ":calimero:", ":bug:", ":bounce:", ":bic:", ":benetton:", ":ange:", ":24:", ":)", ":(", ":o", ":D", ";)", ":p", ":'(", ":??:"];



// =============================================================== //
// Traitement des smileys
// =============================================================== //


/*
	Extraction depuis le message HFR des smileys utilisateur => de la forme [:toto] ou [:toto:1]
*/
function GetUserSmileysList(message) {
	var smileysList = message.match(userSmileyRegExp);
	return smileysList;
}

/*
	Extraction depuis le message HFR  des smileys de base => de la forme :toto:
*/
function GetBaseSmileysList(message)
{
	var smileysList = new Array();
	
	baseSmileys.forEach(function(pattern)
	{
		pattern = ParseSpecialCharFromSmileyCode(pattern);
		var regExp = new RegExp(pattern, "g");
		var res = message.match(regExp);
		
		if (res != null)
		{
			// Ajout du smiley dans la liste
			smileysList = smileysList.concat(res);
			
			// Effacement du smiley dans le message, pour ne pas inter
			message = message.replace(regExp, "");
		}
	});
	
	return smileysList;
}

/*
	Obtient les statistiques de smileys à partir de la configuration GreaseMonkey, si existante.
*/
function LoadSmileyStats(forceRefresh)
{
	if (forceRefresh
		|| isEmptyObject(smileys_stats))
	{
		var smileys_stats_string = GM_getValue(key_sm_smiley_stats, "");

		if (smileys_stats_string != undefined && smileys_stats_string != "")
		{
			// Convertit la string en objet Json
			smileys_stats = BuildJsonObjectFromString(smileys_stats_string);
		}
	}
}

/*
	Convertit le code entier d'un smiley en code réduit
	
	Ne fonctionne que pour les smileys utilisateurs
	exemple :
		full_code : [:xxx]
		tiny_code : xxx ou xxx:1
*/
function ConvertFullCodeToTinyCode(full_code)
{
	var tiny_code = null;
	
	if (IsBaseSmiley(full_code))
	{
		// Smiley de base
		tiny_code = ConvertBaseSmileyCodeToString(full_code);
	}
	else
	{
		// Smiley utilisateur
		tiny_code = full_code.substring(2, full_code.length - 1);
	}
	
	return tiny_code;
}

function SortSmileysAndBuildJsonString()
{
	// Tri de la liste des smileys dans l'ordre des statistiques
	smileys_stats = sortAssocStat(smileys_stats);
	
	return BuildJsonString(smileys_stats);
}

/*
	Supprime ce smiley du dictionnaire des statistiques
*/
function RemoveSmileyStat()
{
	var full_code = this.alt;
	var smiley_tiny_code = ConvertFullCodeToTinyCode(full_code); // Tiny code
	
	if (sm_confirm_delete)
	{
		if (confirm("Etes-vous sûr de vouloir supprimer le smiley " + full_code + " ?") == false)
		{
			return;
		}
	}
	
	delete smileys_stats[full_code];
	
	RemoveSmileyStat_FromUI(smiley_tiny_code, key_top);
	RemoveSmileyStat_FromUI(smiley_tiny_code, key_history);
	RemoveSmileyStat_FromUI(smiley_tiny_code, key_fav);
	
	saveUserStats();
}

/*
	Enlève le smiley du panneau graphique
	
	smiley_tiny_code : code du smiley en format "tiny"
	key : code du panneau où enlever ce smiley
*/
function RemoveSmileyStat_FromUI(smiley_tiny_code, key)
{
	var smiley_parent_container = document.getElementById(key + smiley_tiny_code);
	if(smiley_parent_container != null)
	{
		smiley_parent_container.parentNode.removeChild(smiley_parent_container);
	}
}
/*
	Changer le status favoris du smiley
*/
function ChangeFavoriteStatus()
{
	var full_code = this.alt;
	var smiley_tiny_code = ConvertFullCodeToTinyCode(full_code); // Tiny code
	var smiley = smileys_stats[full_code];
	var favorite_img_src = null;
	
	if (smiley != null && smiley.fav == true)
	{
		// Ce smiley ne fait plus partie des favoris
		smiley.fav = false;
		favorite_img_src = icon_fav_inactive;
		RemoveSmileyStat_FromUI(smiley_tiny_code, key_fav);
		
		if (!sm_include_fav)
		{
			// L'afficher dans les autres panneaux
			ChangeDisplaying_InUI(key_top, smiley_tiny_code, "inline-block");
			ChangeDisplaying_InUI(key_history, smiley_tiny_code, "inline-block");
		}
	}
	else
	{
		// Ce smiley devient un favori
		
		if (smiley == null)
		{
			smiley = CreateSmileyDefaultObject(full_code);
			smileys_stats[full_code] = smiley;
		}
		
		smiley.fav = true;
		favorite_img_src = icon_fav_active;
		AddFavoriteToPanel(full_code);
		
		if (!sm_include_fav)
		{
			// Le cacher des autres panneaux
			ChangeDisplaying_InUI(key_top, smiley_tiny_code, "none");
			ChangeDisplaying_InUI(key_history, smiley_tiny_code, "none");
		}
	}
	
	ChangeFavoriteStatus_InUI(smiley, favorite_img_src, key_top);
	ChangeFavoriteStatus_InUI(smiley, favorite_img_src, key_history);
	ChangeFavoriteStatus_InUI(smiley, favorite_img_src, key_favmsg);
	
	saveUserStats();
}

/*
	Changer le status favoris du smiley dans le panneau indiqué par la key
*/
function ChangeFavoriteStatus_InUI(smiley, favorite_img_src, key)
{
	var tiny_code = ConvertFullCodeToTinyCode(smiley.c);
	
	var favorite_img = document.getElementById(key + key_fav_img + tiny_code);
	
	if (favorite_img != null)
	{
		favorite_img.src = favorite_img_src;
		favorite_img.title = GetFavoriteTooltip(smiley);
	}
}

/*
	Affiche ou cache un smiley dans le panneau indiqué par la key
*/
function ChangeDisplaying_InUI(key, smiley_tiny_code, display)
{
	var smiley_img = document.getElementById(key + smiley_tiny_code);
	
	if (smiley_img != null)
	{
		smiley_img.style.display = display;
	}
}

/*
	Ajouter un favori au panneau
*/
function AddFavoriteToPanel(smiley_full_code)
{
	var smiley = smileys_stats[smiley_full_code];
	var smileys_table = document.getElementById(id_tab_favorite);
	
	if (smileys_table != null)
	{
		var favorite_panel = smileys_table.parentNode;
		
		if (favorite_panel.childNodes.length == 3)
		{
			favorite_panel.removeChild(favorite_panel.childNodes[2]);
			favorite_panel.removeChild(favorite_panel.childNodes[1]);
		}
		
		AddSmileyToPanel(smiley, key_tab_favorite, smileys_table, 0, key_fav);
	}
}

/*
	 Tri du tableau associatif, à partir du champ statistique/top (stat)
*/
function sortAssocStat(o) {
	var sorted = {},
	key, a = [];

	// Conversion en format temporaire
	for (key in o) {
		if (o.hasOwnProperty(key)) {
				a.push([key , o[key ]]);
		}
	}
	
	// Tri
	a.sort(function () {return arguments[0][1].s < arguments[1][1].s});

	// Conversion à nouveau dans le format initial
	for (key = 0; key < a.length; key++) {
		sorted[a[key][0]] = a[key][1];
	}
	
	return sorted;
}

/*
	 Tri du tableau associatif, à partir du champ historique (date)
*/
function sortAssocHistory(o) {
	var sorted = {},
	key, a = [];

	// Conversion en format temporaire
	for (key in o) {
		if (o.hasOwnProperty(key)) {
				a.push([key , o[key ]]);
		}
	}
	
	// Tri
	a.sort(function () {return new Date(arguments[0][1].d) < new Date(arguments[1][1].d)});

	// Conversion à nouveau dans le format initial
	for (key = 0; key < a.length; key++) {
		sorted[a[key][0]] = a[key][1];
	}
	
	return sorted;
}

/*
	Retire les citations en code BB du message HFR
*/
function RemoveBBQuotes(msg)
{
    return msg.replace(/\[quotemsg(.+?)\[\/quotemsg\]/g, '' , "");
}

/*
	Construit une liste de smileys avec leur nombre d'occurence associé.
	
	En sortie, la liste contient chaque smiley de façon unique
*/
function BuildSmileyListFromMessage(message)
{
	var smileysListExt = {};
	var smileysListExt2 = {};
	
	if (message != null)
	{
		// Suppression des blocs de citation
		message = RemoveBBQuotes(message);
		
		// 1) Smileys utilisateur : obtention de la liste des smileys, éventuellement en plusieurs exemplaires
		var smileysList = GetUserSmileysList(message);
		
		if (smileysList != null)
		{
			// Comptage de chaque smiley
			smileysListExt = CountSmileyOccurence(message, smileysList);
		}
		
		
		// 2) Smileys de base : obtention de la liste des smileys
		
		// Suppression des smileys utilisateur dans le message
		message = message.replace(userSmileyRegExp, "");
		
		// Remplacement des smileys de base à codes multiples
		message = message.replace(/:O/g, ":o").replace(/:P/g, ":p").replace(/:d/g, ":D");
		
		// Obtention de la liste des smileys
		var smileysList2 = GetBaseSmileysList(message);
		
		if (smileysList2 != null)
		{
			// Comptage de chaque smiley
			smileysListExt2 = CountSmileyOccurence(message, smileysList2);
		}
	}
	
	return MergeTwoAssociativeArrays(smileysListExt, smileysListExt2);
}

/*
	Comptage des occurences des smileys
*/
function CountSmileyOccurence(message, smileysList)
{
	var smileysListExt = {};
	
	for(var i = 0; i < smileysList.length; i++)
	{
		var smiley_full_code = smileysList[i];
		
		// Comptage
		var result = message.match(new RegExp(ParseSpecialCharFromSmileyCode(smiley_full_code), "g"));
		var count = result ? result.length : 0;
		
		// Vérification que le smiley n'a pas été déjà trouvé et compté
		var smiley = smileysListExt[smiley_full_code];
		
		if (smiley == null)
		{
			// Stockage
			smiley = {};
			smiley.code = smiley_full_code;
			smiley.count = count;
			smileysListExt[smiley_full_code] = smiley;
		}
	}
	
	return smileysListExt;
}

function putSmiley(tt,src) {
	TAinsert(" "+tt+" ","");
}

/*
	Protège les caractères spéciaux éventuellement présents dans la chaine de caractère du code de smiley,
	dans le but d'être utilisé dans une RegEx
*/
function ParseSpecialCharFromSmileyCode(smiley_code)
{
	return smiley_code.replace("[","\\[").replace(")", "\\)").replace("(", "\\(").replace("?", "\\?");
}

/*
	Détermine si c'est un smiley de base ou un smiley utilisateur
*/
function IsBaseSmiley(smiley_code)
{
	return smiley_code.indexOf("[") == -1;
}

/*
	Convertit le code d'un smiley de base en chaine de caractères HFR
*/
function ConvertBaseSmileyCodeToString(smiley_code)
{
	var hfr_string = null;
	
	switch(smiley_code)
	{
		case ":)":
			hfr_string = "smile";
			break;
		case ":(":
			hfr_string = "frown";
			break;
		case ":D":
			hfr_string = "biggrin";
			break;
		case ";)":
			hfr_string = "wink";
			break;
		case ":o":
			hfr_string = "redface";
			break;
		case ":??:":
			hfr_string = "confused";
			break;
		case ":p":
			hfr_string = "tongue";
			break;
		default:
			hfr_string = smiley_code.substring(1, smiley_code.length - 1);
			break;
	}
	
	return hfr_string;
}

/*
	Obtient l'adresse internet de l'image correspondant au smiley de base dont le code est fourni.
*/
function GetUrlForBaseSmiley(smiley_code)
{
	var url = null;
	var hfr_string = ConvertBaseSmileyCodeToString(smiley_code);
	
	switch(smiley_code)
	{
		case ":)":
		case ":(":
		case ":D":
		case ";)":
		case ":o":
		case ":??:":
		case ":p":
			url = image_general_url + hfr_string;
			break;
		default:
			url = image_base_url + hfr_string;
			break;
	}
	
	url = url + ".gif";
	
	return url;
}

/*
	Création d'un objet smiley
*/
function CreateSmileyObject(full_code, count, date)
{
	var smiley = {};
	smiley.c = full_code;
	smiley.s = count;
	smiley.d = date;
	
	return smiley;
}

/*
	Création d'un objet smiley, avec un compteur à 1 et une date à celle de maintenant
*/
function CreateSmileyDefaultObject(full_code)
{
	return CreateSmileyObject(full_code, 1, GetCurrentFormatedDate());
}

/*
	Intégration des smileys favoris HFR dans la liste du script VSF.
*/
function IncludeHFRFavoriteSmileys()
{
	var url = "http://forum.hardware.fr/user/editprofil.php";
	var args = "config=hfr.inc&page=5";
	
	// Chargement de la page du profil contenant les smileys favoris
	toyoAjaxLib.loadDoc(url, 'get', args, function(pageContent)
	{
		var dumpDiv = document.createElement('div');
		dumpDiv.style.display = 'none';
		document.body.appendChild(dumpDiv);
		dumpDiv.innerHTML = pageContent;
		
		var smileyAddCount = 0;
		var smileyAddList = [];
		
		var favoriteAddLabel = document.getElementByXPath('.//a[text()="Ajouter des smilies favoris"]', dumpDiv);
		
		// Obtention de chaque smiley favori (image)
		document.getElementsByXPath('.//img', favoriteAddLabel.parentNode).forEach(function(img)
		{
			var smiley_code = img.alt;
			
			if (smiley_code != "")
			{
				var smiley = smileys_stats[smiley_code];
				
				if (smiley == null)
				{
					// Ajout de ce smiley dans la liste
					smiley = CreateSmileyDefaultObject(smiley_code);
					smileys_stats[smiley_code] = smiley;
				}
				
				// Marquage en favoris
				smiley.fav = true;
				
				smileyAddCount++;
				smileyAddList.push(smiley_code);
			}
		});
		
		saveUserStats();
		
		var alertMessage = null;
		
		if (smileyAddCount == 0)
		{
			alertMessage = "Aucun smiley favori HFR n'a été trouvé.";
		}
		else
		{
			ReloadSmileysFullPanel();
			alertMessage = smileyAddCount + " smileys ont été marqués en favoris : " + smileyAddList.join(" ");
		}
		
		alert(alertMessage);
	});
}





// =============================================================== //
// Outils génériques
// =============================================================== //

var GM_consoleLineOffset = 10; /* current line number */

try
{
	generateError();
}
catch (error)
{
	GM_consoleLineOffset = (error.lineNumber - GM_consoleLineOffset);
}

/*
	Loguer une donnée (du texte ou un objet).
*/
var GM_log = function() {
	if (unsafeWindow.console == undefined)
	{
		return;
	}
	else
	{
		unsafeWindow.console.log(arguments[0]);
	}
};

/*
	Loguer une erreur.
*/
var GM_log_error = function()
{
	if (unsafeWindow.console == undefined)
	{
		return;
	}
	
	unsafeWindow.console.error(
	((typeof(arguments[0].method) == "undefined") ? "" : arguments[0].method + ": ")
	+ arguments[0].name + " - "
	+ arguments[0].message
	+ ", line " + (arguments[0].lineNumber - GM_consoleLineOffset));
};

document._evaluate = document.evaluate;
document.evaluate = function(xpathExpression, contextNode, resultType) {
	if (resultType == undefined) {
		resultType = XPathResult.ANY_TYPE
	}
	if (contextNode == null) {
		contextNode = this
	}
	var result = this._evaluate(xpathExpression, contextNode, null, resultType, null);
	switch (resultType) {
	case XPathResult.NUMBER_TYPE:
		return result.numberValue;
	case XPathResult.STRING_TYPE:
		return result.stringValue;
	case XPathResult.BOOLEAN_TYPE:
		return result.booleanValue;
	case XPathResult.ANY_UNORDERED_NODE_TYPE:
	case XPathResult.FIRST_ORDERED_NODE_TYPE:
		return result.singleNodeValue;
	default:
		return result
	}
	return result
};

/*
	Obtenir UN élément HTML à partir de son XPath
	
	Exemples de documentation XPath :
		http://fr.wikipedia.org/wiki/XPath
*/
document.getElementByXPath = function(xpathExpression, contextNode) {
	var x = this.evaluate(xpathExpression, contextNode || this, XPathResult.FIRST_ORDERED_NODE_TYPE);
	return x
};

/*
	Obtenir DES éléments HTML à partir de leur XPath
	
	Exemples de documentation XPath :
		http://fr.wikipedia.org/wiki/XPath
*/
document.getElementsByXPath = function(xpathExpression, contextNode) {
	var x = this.evaluate(xpathExpression, contextNode || this, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
	var result = [],
		next;
	while (next = x.iterateNext()) {
		result.push(next)
	}
	return result
};

document.removeElementsByXPath = function(xpathExpression, contextNode) {
	var x = this.evaluate(xpathExpression, contextNode || this, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	for (var i = 0; i < x.snapshotLength; i++) {
		x.snapshotItem(i).parentNode.removeChild(x.snapshotItem(i))
	}
	return i
};

/*
	Construit un objet JSON à partir d'une string
*/
function BuildJsonObjectFromString(JSON_string)
{
	var JSON_object = JSON.parse(JSON_string);

	return JSON_object;
}

/*
	Construit une string à partir d'un format JSON
*/
function BuildJsonString(JSON_object)
{
	JSON_string = JSON.stringify(JSON_object);
	
	return JSON_string;
}

// Génère une string représente la date et l'heure à partir de la date fournie, en format destiné à l'affichage
function getDateTimeStringForDisplay(dateString)
{
	var d = new Date(dateString);
	return d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate() + " à " + d.getHours() + ":" + d.getMinutes().toString();
}
// Génère une string représente la date et l'heure à partir de la date fournie
function getDateTimeString(dateString)
{
	var d = new Date(dateString);
	return d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate() + " " + d.getHours() + ":" + d.getMinutes().toString() +  ":" + d.getSeconds().toString();
}

/*
	Obtient la date courante, formatée pour le script
*/
function GetCurrentFormatedDate()
{
	return getDateTimeString(new Date().toString());
}

// Fin de ligne
function getLineBreak()
{
	return document.createElement('br');
}

// // Fin de ligne et ligne vide
function getLineBreakBlankLine()
{
	return document.createElement('p');
}

/*
	Obtient la boîte d'édition de message
*/
function GetMessageEditingBox()
{
	return document.getElementById("content_form");
}

/*
	Compter le nombre d'occurences du pattern donné
*/
String.prototype.count = function(pattern) {
	return (this.length - this.replace(new RegExp(pattern,"g"), '').length) / pattern.length;
}

/*
	Déterminer si le tableau contient cet élément
*/
Array.prototype.contains = function (element)
{
	for (var i = 0; i < this.length; i++)
	{
		if (this[i] == element) {
			return true;
		}
	}
	
	return false;
}

/*
	Teste si l'objet est vide, objet Json notamment. Basé sur l'implémentation "isEmptyObject" de JQuery.
*/
function isEmptyObject( obj )
{
	for (var name in obj)
	{
		return false;
	}
	
	return true;
};

/*
	Filtre le tableau en éliminant les doublons.
	
	Exemple : array.getUnique());
*/
Array.prototype.getUnique = function(fieldNameCompare) {
    var sMatchedItems = "";
    var foundCounter = 0;
    var newArray = [];
    
    for (var i = 0; i < this.length; i++) {
        var item = eval("this[i]." + fieldNameCompare);
        var match = "|" + item.toLowerCase() + "|";
        
        if (sMatchedItems.indexOf(match) == -1 ) {
            sMatchedItems += match;
            newArray[foundCounter++] = item;
        }
    }
    
    return newArray;
}

function MergeTwoAssociativeArrays(array1, array2)
{
	for (attr in array1)
	{
		array2[attr] = array1[attr];
	}
	
	return array2;
}





// =============================================================== //
// Outils d'enregistrement, backup et reset
// =============================================================== //

/*
	Enregistrement des statistiques de smiley
*/
function saveUserStats()
{
	// Construction de la string Json
	var JSON_string = SortSmileysAndBuildJsonString();
	
	saveUserStatsFromJsonString(JSON_string);
	
	if (cmScript.isOpened)
	{
		// Mise à jour du panneau des smileys qui est en background
		ReloadSmileysFullPanel();
	}
}

/*
	Enregistrement des statistiques de smiley, à partir de la string JSON
*/
function saveUserStatsFromJsonString(JSON_string)
{
	// Mise à jour de la configuration GreaseMonkey
	GM_setValue(key_sm_smiley_stats, JSON_string);
}

/*
	Charge la configuration utilisateur
*/
function loadUserConfig()
{
	sm_count = GM_getValue(key_sm_count, sm_count);
	sm_confirm_delete = GM_getValue(key_sm_confirm_delete, sm_confirm_delete);
	sm_include_fav = GM_getValue(key_sm_include_fav, sm_include_fav);
	sm_fast_reply = GM_getValue(key_sm_fast_reply, sm_fast_reply);
	sm_fav_world = GM_getValue(key_sm_fav_world, sm_fav_world);
	sm_fav_world_icon = GM_getValue(key_sm_fav_world_icon, icon_scan_smileys);
	sm_notify_new = GM_getValue(key_sm_notify_new, sm_notify_new);
	sm_current_tab = GM_getValue(key_sm_current_tab, sm_current_tab);
	sm_config_tab = GM_getValue(key_sm_config_tab, sm_config_tab);
	sm_config_smiley_tab = GM_getValue(key_sm_config_smiley_tab, sm_config_smiley_tab);
	sm_fav_panel_width = GM_getValue(key_sm_fav_panel_width, sm_fav_panel_width);
	sm_fav_panel_height = GM_getValue(key_sm_fav_panel_height, sm_fav_panel_height);
	sm_fav_position = GM_getValue(key_sm_fav_position, sm_fav_position);
}

/*
	Charge l'option "Intégration des favoris HFR"
*/
function LoadAndSaveOptionIncludeHFRFavorites()
{
	sm_include_hfr_fav = GM_getValue(key_sm_include_hfr_fav);
	
	if (typeof(sm_include_hfr_fav) == "undefined")
	{
		if (confirm("[ Message du script Greasemonkey : \"" + script_name + "\" ]\n\n"
		+ "Souhaitez-vous intégrer vos favoris HFR (10 max) parmi les favoris du script ?"))
		{
			IncludeHFRFavoriteSmileys();
			sm_include_hfr_fav = true;
		}
		else
		{
			sm_include_hfr_fav = false;
		}
	}
	
	GM_setValue(key_sm_include_hfr_fav, sm_include_hfr_fav);
	
	var key_sm_include_hfr_fav_CheckBox = document.getElementById(key_sm_include_hfr_fav);
	
	if(key_sm_include_hfr_fav_CheckBox != null)
	{
		key_sm_include_hfr_fav_CheckBox.checked = sm_include_hfr_fav;
	}
	
	if (sm_include_hfr_fav)
	{
		// Suppression dans l'interface des 10 smileys HFR
		var dynamic_smilies = document.getElementById("dynamic_smilies");
		
		if (dynamic_smilies != null)
		{
			while (dynamic_smilies.hasChildNodes()) {
				dynamic_smilies.removeChild(dynamic_smilies.lastChild);
			}
		}
	}
}

/*
	Recharge les réglages enregistrés précédemment
*/
function reloadUserConfig()
{
	loadUserConfig();
	document.getElementById(key_sm_count).value = sm_count;
	document.getElementById(key_sm_confirm_delete).checked = sm_confirm_delete;
	document.getElementById(key_sm_include_fav).checked = sm_include_fav;
	document.getElementById(key_sm_fast_reply).checked = sm_fast_reply;
	document.getElementById(key_sm_fav_world).checked = sm_fav_world;
	document.getElementById(key_sm_fav_world_icon).value = sm_fav_world_icon;
	document.getElementById(key_sm_notify_new).checked = sm_notify_new;
	document.getElementById(key_sm_include_hfr_fav).checked = sm_include_hfr_fav;
}

// Supprimer toutes les statistiques de smileys
function ResetAllStats()
{
	if(confirm("Etes-vous sûr de vouloir supprimer toutes les statistiques ?") == true)
	{
		GM_setValue(key_sm_smiley_stats, ""); // Suppression des stats
		location.reload(false); // Rechargement de la page
	}
}

/*
	Réinitialise l'icône placée à côté de chaque message.
*/
function ResetIconFavWorld()
{
	sm_fav_world_icon = icon_scan_smileys;
	GM_setValue(key_sm_fav_world_icon, sm_fav_world_icon);
	
	// Rafraichissement icône
	document.getElementById(keyFavWordIconShow).src = sm_fav_world_icon;
	
	// Rafraichissement inputBox
	document.getElementById(key_sm_fav_world_icon).value = sm_fav_world_icon;
}

/*
	Rechargement de l'icône associée à chaque message, affichée pour exemple.
*/
function ReloadIconFavWorld()
{
	setTimeout(function()
	{
		// Rafraichissement icône
		document.getElementById(keyFavWordIconShow).src = document.getElementById(key_sm_fav_world_icon).value;
	}, 0);
}

/*
	Construire un fichier de backup des statistiques de smiley
*/
function DoBackupFile()
{
	LoadSmileyStats();
	
	var blobBuilder = new MozBlobBuilder();
	blobBuilder.append(SortSmileysAndBuildJsonString());
	var objectURL = window.URL.createObjectURL(blobBuilder.getBlob("application/octet-stream"));
	window.open(objectURL);
	window.URL.revokeObjectURL(objectURL);
}

var fileReader = null;

/*
	Charge un fichier de backup des statistiques de smiley
*/
function LoadBackupFile(evt)
{
	var file = evt.target.files[0];
	fileReader = new FileReader();
    fileReader.onload = readBackupFile;
    fileReader.readAsText(file);
}

/*
	Lit le fichier de backup
*/
function readBackupFile()
{
	var JSON_string = fileReader.result;
	
	if (!CheckFormatBackupFile(JSON_string))
	{
		alert("Format du fichier non reconnu.");
	}
	else if (confirm("Cet import va écraser toutes les données actuelles de smiley. Voulez-vous continuer ?") == true)
	{
		saveUserStatsFromJsonString(JSON_string);
		
		if (confirm("Import réalisé avec succès.\nSouhaitez-vous actualiser la page ?") == true)
		{
			location.reload(false); // Rechargement de la page
		}
	}
}

/*
	Vérification du format de fichier de backup
*/
function CheckFormatBackupFile(JSON_string)
{
	try
	{
		var jsonObj = BuildJsonObjectFromString(JSON_string);
		return true;
	}
	catch(err)
	{
		return false;
	}
}



// =============================================================== //
// Modifications de l'interface HFR
// =============================================================== //

/*
	Point d'entrée du script Greasemonkey
*/
function Main()
{
	// Chargement de la configuration utilisateur
	loadUserConfig();
	
	Load_Script_CSS();
	
	// Chargement du CSS JQuery UI
	LoadJQuery_UI_CSS();
	
	// Préparation de la fenêtre de configuration
	cmScript.setUp();
	cmScript.createConfigMenu();
	
	// Obtient l'élément HTML racine de la page HFR
	root = document.getElementById("mesdiscussions");
	
	var current_url = document.URL;
	var editingMessagePage = false;
	
	// Switch suivant la page affichée
	if(
		current_url.match('http://forum.hardware.fr/message.php*')
		|| current_url.match('http://forum.hardware.fr/hfr/.*/nouveau_sujet.htm')
		|| current_url.match('http://forum.hardware.fr/hfr/.*/nouveau_sondage.htm')
		|| current_url.match('http://forum.hardware.fr/hfr/.*/repondre.*'))
	{
		// Page édition de message
		editingMessagePage = true;
		HandleEditingMessagePage();
	}
	else
	{
		// Autres pages, notamment les pages de topic, contenant un "fast answer".
		HandleTopicPage();
	}
	
	// Initialisation du système d'onglets du panneau des smileys
	InitTabSystem_ForFullAnswer();
	
	if (editingMessagePage)
	{
		//  Page édition de message
		
		// Affichage de l'onglet dernièrement utilisé
		SwitchTab(sm_current_tab);
	}
	
	setTimeout(function()
	{
		LoadAndSaveOptionIncludeHFRFavorites();
	}, 0);
}

function LoadJQuery_UI_CSS()
{
	var head = document.getElementsByTagName('head')[0];
	
	var script = document.createElement('script');
	script.type = 'text/javascript';
	
	var jQuery = GM_getResourceText('JQuery');
	var jQueryUI = GM_getResourceText('JQueryUI_JS');
	script.innerHTML = jQuery + jQueryUI;
	head.appendChild(script);
	
	$ = unsafeWindow.$;
	
	var resources = {
		'ui-bg_diagonals-thick_18_b81900_40x40.png': GM_getResourceURL('ui-bg_diagonals-thick_18_b81900_40x40.png'), 
		'ui-bg_glass_100_f6f6f6_1x400.png': GM_getResourceURL('ui-bg_glass_100_f6f6f6_1x400.png'),
		'ui-bg_diagonals-thick_20_666666_40x40.png': GM_getResourceURL('ui-bg_diagonals-thick_20_666666_40x40.png'),
		'ui-bg_glass_65_ffffff_1x400.png': GM_getResourceURL('ui-bg_glass_65_ffffff_1x400.png'),
		'ui-bg_gloss-wave_35_f6a828_500x100.png': GM_getResourceURL('ui-bg_gloss-wave_35_f6a828_500x100.png'),
		'ui-icons_222222_256x240.png': GM_getResourceURL('ui-icons_222222_256x240.png'),
		'ui-bg_flat_10_000000_40x100.png': GM_getResourceURL('ui-bg_flat_10_000000_40x100.png'),
		'ui-icons_ef8c08_256x240.png': GM_getResourceURL('ui-icons_ef8c08_256x240.png'),
		'ui-icons_ffd27a_256x240.png': GM_getResourceURL('ui-icons_ffd27a_256x240.png'),
		'ui-bg_glass_100_fdf5ce_1x400.png': GM_getResourceURL('ui-bg_glass_100_fdf5ce_1x400.png'),
		'ui-icons_228ef1_256x240.png': GM_getResourceURL('ui-icons_228ef1_256x240.png'),
		'ui-icons_ffffff_256x240.png': GM_getResourceURL('ui-icons_ffffff_256x240.png'),
		'ui-bg_highlight-soft_75_ffe45c_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_75_ffe45c_1x100.png'),
		'ui-bg_highlight-soft_100_eeeeee_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_100_eeeeee_1x100.png')
	};
	
	var css = GM_getResourceText('JQueryUI_CSS');
	
	// Remplacement de tous les liens d'image dans le fichier CSS par l'URL.
	$.each(resources, function(resourceName, resourceUrl) {
		css = css.replace( 'images/' + resourceName, resourceUrl);
	});
	
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function Load_Script_CSS()
{
	var head = document.getElementsByTagName('head')[0];
	
	var css = GM_getResourceText('Script_CSS');
	
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}


/*
	Charger la librairie REDIPS.drag
	http://www.redips.net/javascript/drag-and-drop-table-content/
*/
function LoadREDIPS_drag()
{
	REDIPS.drag.init();
}

/*
	Traitement des pages de topic. Change l'action du bouton "Valider votre message".
*/
function HandleTopicPage()
{
	var textarea = GetMessageEditingBox();
	
	if (textarea == null)
	{
		// Il n'y a pas de "fast answer" sur cette page
	}
	else
	{
		// Pages de topic
		
		LoadSmileyStats();
		
		ChangeFastAnswerValidationButtonAction();
		
		if (sm_fast_reply)
		{
			ShowFavoriteSmileysPanel(true);
		}
		
		if (sm_fav_world)
		{
			AddScanSmileysFeature();
		}
		
		ModifyValidateFastEdit();
	}
}

/*
	Change le comportement du bouton "Valider votre message"
		Ajoute une action qui analyse le message, extrait les smileys, et met à jour les statistiques dans GreaseMonkey
*/
function ChangeFastAnswerValidationButtonAction()
{
	var validate_button_fast_answer = document.getElementById('submitreprap');
	validate_button_fast_answer.addEventListener("click", function(){ValidateFunction('');}, true);
}

/*
	Afficher le panneau des favoris à côté du "fast reply"
	
	create (bool) : true indique qu'il faut créer le panneau. false indique qu'il faut le rafraichir.
*/
function ShowFavoriteSmileysPanel(create)
{
	var textarea = GetMessageEditingBox();
	
	var container = null;
	
	if (create)
	{
		// Création du panneau
		
		// Placement du panneau
		var md_fast_search = document.getElementById("md_fast_search");
		
		// Conteneur de l'élément déplacable
		var dragContainer = document.createElement("div");
		dragContainer.id = "drag";
		
		// Tableau offrant les possibilités de déplacement du contenu
		var customTable = document.createElement("table");
		customTable.id = keyDroppableTable;
		customTable.style.borderStyle = "none";
		dragContainer.appendChild(customTable);
		
		// Contenu déplacable par l'utilisateur
		var draggableContent = document.createElement("div");
		draggableContent.className = "drag";
		draggableContent.id = keyDraggablePanel;
		
		// Construction du tableau
		for (var r = 0; r < 3; r++)
		{
			var row = document.createElement("tr");
			row.style.height = "100px";
			customTable.appendChild(row);
			
			if (r == 0)
			{
				row.id = keyRowTop;
			}
			else if (r == 2)
			{
				row.id = keyRowBottom;
			}
			
			for(var c = 0; c < 3; c++)
			{
				switch (c)
				{
					case 0:
					case 2:
						if (r == 0)
						{
							// Colonne de gauche et colonne de droite
							var col = document.createElement("td");
							col.rowSpan = "3";
							col.style.verticalAlign = "middle";
							col.style.borderStyle = "none";
							row.appendChild(col);
							
							if (c == 0)
							{
								col.id = keyDroppableCellTopLeft;
							}
							else if(c == 2)
							{
								col.id = keyDroppableCellTopRight;
							}
							
							if(c == 0 && sm_fav_position == position_left)
							{
								// Colonne de gauche
								col.appendChild(draggableContent);
							}
							else if(c == 2 && sm_fav_position == position_right)
							{
								// Colonne de droite
								col.appendChild(draggableContent);
							}
						}
						else
						{
							continue;
						}
						break;
					case 1:
						var col = document.createElement("td");
						col.style.borderStyle = "none";
						row.appendChild(col);
						
						if (r == 0)
						{
							// Cellule du haut
							col.id = keyDroppableCellTopMiddle;
						}
						
						if (r == 0 && sm_fav_position == position_up)
						{
							// Cellule du haut
							col.appendChild(draggableContent);
						}
						else if (r == 2 && sm_fav_position == position_down)
						{
							// Cellule du bas
							col.appendChild(draggableContent);
						}
						else if (r == 1)
						{
							// Celulle du milieu
							
							// Placement du contenu HFR hors script VSF
							while (md_fast_search.hasChildNodes()) {
								col.appendChild(md_fast_search.firstChild);
							}
							
							col.className = "mark"; // Marquage de cette celulle : elle ne peut pas être destination de drop.
							
							col.id = keyCellMiddle;
						}
						break;
				}
			}
		}
		
		// Panneau parent en "inline-block" et en resizable
		var parentFrame = document.createElement("div");
		parentFrame.style.display = "inline-block";
		parentFrame.style.margin = "10px 10px 0px 10px";
		parentFrame.id = "resizable";
		parentFrame.style.width = sm_fav_panel_width;
		parentFrame.style.height = sm_fav_panel_height;
		
		// Styles : bordure et couleurs
		parentFrame.style.borderColor = "#FFFFFF #C0C0C0 #C0C0C0 #FFFFFF";
		parentFrame.style.borderStyle = "solid";
		parentFrame.style.borderWidth = "1px";
		parentFrame.style.backgroundColor = "#DDDDDD";
		
		// Div pour permettre le scrolling à l'intérieur de la div resizable
		var intFrame = document.createElement("div");
		intFrame.style.overflow = "auto"; // Scrolling
		intFrame.style.overflowX = "hidden"; // Pas de scrolling horizontal
		intFrame.style.height = "100%";
		intFrame.style.width = "100%";
		parentFrame.appendChild(intFrame);
		
		// Tableau pour permettre le "cellWrapper". Dimensionnement hérité du parent.
		var frame = document.createElement("div");
		frame.style.display = "table";
		frame.style.height = "100%";
		frame.style.width = "100%";
		intFrame.appendChild(frame);
		
		// Panneau en "cellWrapper", afin de permettre l'alignement vertical
		var subFrame = document.createElement("div");
		subFrame.className = "cellWrapper";
		subFrame.style.textAlign = "center";
		frame.appendChild(subFrame);
		
		// Conteneur des smileys
		container = document.createElement("span");
		container.id = key_favoritePanel;
		container.style.textAlign = "center";
		container.style.maxHeight = "96px";
		container.style.padding = "2px";
		subFrame.appendChild(container);
		
		draggableContent.appendChild(parentFrame);
		draggableContent.appendChild(getLineBreakBlankLine());
		
		md_fast_search.appendChild(dragContainer);
		
		$(function() {
			// Ajout de la possibilité pour l'utilisateur de redimensionner le panneau des favoris
			$("#resizable").resizable(
			{
				resize: function(event, ui)
				{
					clearTimeout(resizeTimer);
					
					resizeTimer = setTimeout(
						function()
						{
							// Mémorisation des dimensions
							GM_setValue(key_sm_fav_panel_width, ui.size.width + "px");
							GM_setValue(key_sm_fav_panel_height, ui.size.height + "px");
						}, 200);
				}
			});
		});
		
		// Icône pour ouvrir le panneau des paramètres
		var img = document.createElement("img");
		img.title = "Gérer vos smileys";
		img.className = "ui-icon ui-state-highlight ui-icon-wrench";
		img.style.zIndex = "1001";
		img.style.position = "absolute";
		img.style.left = "1px";
		img.style.top = "1px";
		img.style.cursor = "pointer";
		parentFrame.appendChild(img);
		img.addEventListener('click', function(event){ cmScript.showConfigWindow(keyWindowConfig, key_tab_yoursmileys); }, false);
		 
		// Icône pour déplacer le panneau des favoris
		
		var moveIcon = document.createElement("div");
		moveIcon.className = "ui-icon ui-icon-arrow-4";
		moveIcon.title = "Déplacer le panneau";
		moveIcon.style.zIndex = "1001";
		moveIcon.style.position = "absolute";
		moveIcon.style.left = "1px";
		moveIcon.style.bottom = "1px";
		moveIcon.style.cursor = "move";
		parentFrame.appendChild(moveIcon);
		
		moveIcon.addEventListener("mousedown", function(event)
		{
			EnableDragMode();
		}, false);
		
		draggableContent.addEventListener("mouseup", function(event)
		{
			DisableDragMode();
		}, false);
		
		// Exécution du framework pour le drag and drop
		LoadREDIPS_drag();
		
		DisableDragMode();
		
		// Evènement quand l'utilisateur a déplacé le panneau
		REDIPS.drag.myhandler_dropped = function ()
		{
			// get target and source position (method returns positions as array)
			// pos[0] - target table index
			// pos[1] - target row index
			// pos[2] - target cell (column) index
			// pos[3] - source table index
			// pos[4] - source row index
			// pos[5] - source cell (column) index
			var pos = REDIPS.drag.get_position();
			
			var position = null;
			
			switch (pos[1]) // Numéro ligne
			{
				case 0: // Ligne du haut
					switch (pos[2])  // Numéro colonne
					{
						case 0: // Colonne gauche
							position = position_left;
							break;
						case 1: // Colonne milieu
							position = position_up;
							break;
						case 2: // Colonne droite
							position = position_right;
							break;
					}
					break;
				case 2: // Ligne du bas
					position = position_down;
					break;
			}
			
			sm_fav_position = position;
			
			GM_setValue(key_sm_fav_position, sm_fav_position);
			
			ChangeDroppableTable(false, sm_fav_position);
		};
	}
	else
	{
		// Mise à jour du panneau
		container = document.getElementById(key_favoritePanel);
		
		// Suppression des favoris affichés dans l'interface
		while (container.hasChildNodes()) {
			container.removeChild(container.lastChild);
		}
	}
	
	// Ajout de chaque smiley favori
	for (var k in smileys_stats)
	{
		var smiley = smileys_stats[k];
		if (smiley.fav)
		{
			var smiley_tiny_code = ConvertFullCodeToTinyCode(smiley.c); // Tiny code
			
			container.appendChild(BuildSmileyImage(smiley, smiley_tiny_code, true));
		}
	}
}

/*
	Activer le mode pour déplacer le panneau des favoris
*/
function EnableDragMode()
{
	ChangeDroppableTable(true, sm_fav_position);
	REDIPS.drag.enable_drag(true, keyDraggablePanel, 'element');
}

/*
	Désactiver le mode pour déplacer le panneau des favoris
*/
function DisableDragMode()
{
	ChangeDroppableTable(false, sm_fav_position);
	
	REDIPS.drag.enable_drag(false, keyDraggablePanel, 'element');
	var dragDiv = document.getElementById(keyDraggablePanel);
	dragDiv.style.borderStyle = "none";
}

/*
	Modifie les propriétés visuelles du tableau de drag&drop.
	
	dragEnabled (bool) : true = drag en cours.
	currentPosition (string) : position actuelle du panneau des favoris.
*/
function ChangeDroppableTable(dragEnabled, currentPosition)
{
	var topLeftWidth;
	var middleTopWidth;
	var topRightWidth;
	var middleAlign;
	var draggablePanelAlign;
	var topRowHeight;
	var bottomRowHeight;
	
	if (dragEnabled)
	{
		// Mode drag&drop activé
		
		topLeftWidth = "33%";
		middleTopWidth = "33%";
		topRightWidth = "33%";
		middleAlign = "center";
		draggablePanelAlign = "center";
		topRowHeight = "100px";
		bottomRowHeight = "100px";
	}
	else
	{
		switch (currentPosition)
		{
			case position_up:
				topLeftWidth = "0%";
				middleTopWidth = "100%";
				topRightWidth = "0%";
				middleAlign = "center";
				draggablePanelAlign = "center";
				topRowHeight = "100px";
				bottomRowHeight = "0px";
				break;
			case position_down:
				topLeftWidth = "0%";
				middleTopWidth = "100%";
				topRightWidth = "0%";
				middleAlign = "center";
				draggablePanelAlign = "center";
				topRowHeight = "0px";
				bottomRowHeight = "100px";
				break;
			case position_left:
				topLeftWidth = "50%";
				middleTopWidth = "50%";
				topRightWidth = "0%";
				middleAlign = "left";
				draggablePanelAlign = "right";
				topRowHeight = "0px";
				bottomRowHeight = "0px";
				break;
			case position_right:
				topLeftWidth = "5%";
				/* 5% au lieu de 0% pour empêcher un bug. Si 0%, alors le panneau des favoris peut être placé
				à l'emplacement du milieu, ce qui est interdit.
				*/
				middleTopWidth = "50%";
				topRightWidth = "50%";
				middleAlign = "right";
				draggablePanelAlign = "left";
				topRowHeight = "0px";
				bottomRowHeight = "0px";
				break;
		}
	}
	
	var topLeftCell = document.getElementById(keyDroppableCellTopLeft);
	var middleTopCell = document.getElementById(keyDroppableCellTopMiddle);
	var topRightCell = document.getElementById(keyDroppableCellTopRight);
	var middleCell = document.getElementById(keyCellMiddle);
	var draggablePanel = document.getElementById(keyDraggablePanel);
	var topRow = document.getElementById(keyRowTop);
	var bottomRow = document.getElementById(keyRowBottom);
	
	topLeftCell.style.width = topLeftWidth;
	middleTopCell.style.width = middleTopWidth;
	topRightCell.style.width = topRightWidth;
	middleCell.style.textAlign = middleAlign;
	draggablePanel.style.textAlign = draggablePanelAlign;
	topRow.style.height = topRowHeight;
	bottomRow.style.height = bottomRowHeight;
}

/*
	Ajout d'une icône pour scanner les smileys présents dans un message
*/
function AddScanSmileysFeature()
{
	document.getElementsByXPath('//table//tr[starts-with(@class, "message")]//div[@class="toolbar"]//div[@class="left"]', root).filter(function(toolbar)
	{
		return document.getElementsByXPath('.//a[starts-with(@href, "/message.php")]', toolbar).length > 0;
	}
	).forEach(function(toolbar)
	{
		var icon_ScanSmileys = document.createElement("img");
		icon_ScanSmileys.src = sm_fav_world_icon;
		icon_ScanSmileys.style.cursor = 'pointer';
		icon_ScanSmileys.style.marginRight = '3px';
		icon_ScanSmileys.title = "Choisir les smileys à placer en favoris";
		
		var message = document.getElementByXPath('.//div[starts-with(@id, "para")]', toolbar.parentNode.parentNode);
		icon_ScanSmileys.addEventListener("click", function(event){ ShowSmileysForFavorite(message); }, true);
		
		// Placement de l'icône dans la page
		if (toolbar.nextSibling.className == 'spacer')
		{
			var newDiv = document.createElement('div');
			newDiv.className = 'right';
			newDiv.appendChild(icon_ScanSmileys);
			toolbar.parentNode.insertBefore(newDiv, toolbar.nextSibling);
		}
		else
		{
			toolbar.nextSibling.insertBefore(icon_ScanSmileys, toolbar.nextSibling.firstChild);
		}
	});
}

/*
	Affiche une fenêtre pour choisir quel smileys placer en favoris
	
	message : message dans lequel rechercher les smileys
*/
function ShowSmileysForFavorite(message)
{
	// Récupération de tous les smileys. Ce sont tous les "img" dont l'attribut "onload" est indéfini.
	var imgList = document.getElementsByXPath('.//img[not(@onload)]', message);
	
	if (imgList.length == 0)
	{
		alert("Aucun smiley n'a été trouvé dans ce message.");
	}
	else
	{
		cmScript.showConfigWindow(keyWindowFavorite);
		cmScript.buildFavoriteWindow(imgList);
	}
}

// Mémorisation de la fonction HFR "edit_in", qui est appelée quand l'utilisateur clique sur l'icône "fast edit".
var old_edit_in = unsafeWindow.edit_in;

// Mémorisation de la fonction HFR "edit_in_post", qui est appelée quand l'utilisateur valide une édition de message en mode "fast edit".
var old_edit_in_post = unsafeWindow.edit_in_post;

var fastReplyDict = {};

/*
	Modification de la fonctionnalité HFR d'édition rapide,
	afin de pouvoir traiter les smileys de ce message édité.
*/
function ModifyValidateFastEdit()
{
	// Modification de l'évènement "clic de l'utilisateur sur l'icône 'fast edit'"
	unsafeWindow.edit_in = function(config, cat, post, numreponse, path)
	{
		// HFR
		old_edit_in(config, cat, post, numreponse, path);
		
		// Stockage d'information sur les smileys initiaux
		ScheduleModifyFastEdit(numreponse);
	}
	
	// Modification de l'évènement "clic de l'utilisateur sur le bouton de validation 'fast edit'"
	unsafeWindow.edit_in_post = function(config, cat, post, numreponse, path, session)
	{
		setTimeout(function()
		{
			/*
				Remarque : le setTimeout à 0 ms ici sert à contourner
				le problème d'interdiction d'appel à GM_setValue dans une unsafeWindow.
			*/
			
			// Traitements des smileys
			ValidateFunction('', numreponse);
			
			// HFR
			old_edit_in_post(config, cat, post, numreponse, path, session);
		}, 0);
	}
}

function GetFastEditTextArea(msgId)
{
	return document.getElementById("rep_editin_" + msgId);
}

/*
	Stockage d'information sur les smileys initiaux
*/
function ScheduleModifyFastEdit(numreponse)
{
	setTimeout(function()
	{
		var textArea = GetFastEditTextArea(numreponse);
		
		if (textArea == null)
		{
			/*	Nouvel essai, car la "textarea" n'est pas encore disponible
				(en attente traitement serveur HFR pour obtenir le BBcode)
			*/
			ScheduleModifyFastEdit(numreponse);
		}
		else
		{
			// Stockage d'informations
			var msgInfo = {};
			msgInfo.msgId = numreponse;
			msgInfo.initialText = GetFastEditTextArea(numreponse).value;
			fastReplyDict[msgInfo.msgId] = msgInfo;
		}
	}, 500);
}

/*
	Traitement des pages "édition de message". Insertion du panneau des smileys.
*/
function HandleEditingMessagePage()
{
	// Conteneur latéral gauche
	parent_container = document.getElementByXPath('//a[@class="s1Topic"]', root).parentNode;

	// Création du nouveau panneau de statistiques de smileys
	var tabberSmileysPanel = document.createElement('div');
	tabberSmileysPanel.id = key_tabberSmileysPanel;
	tabberSmileysPanel.className = "tabber";
	
	// Ajout de ce panneau au conteneur latéral gauche
	parent_container.appendChild(tabberSmileysPanel);
	
	BuildYourSmileysPanel(tabberSmileysPanel);

	// Lien pour ouvrir la fenêtre de configuration
	var link_config = document.createElement('a');
	link_config.className = "s1Topic"; // Style
	link_config.href = "javascript:void(null);";
	link_config.addEventListener("click", function(event){ cmScript.showConfigWindow(keyWindowConfig, null); }, true);
	link_config.innerHTML = "Configuration des smileys";
	link_config.title = 'Cliquez ici pour configurer le script "' + script_name + '"';
	parent_container.appendChild(link_config);

	ChangeValidateButtonAction();
	
	// Mémorisation du TextArea.
	initial_message = GetMessageEditingBox().value;
}

/*
	Construction du panneau des smileys avec les trois onglets {top, historique, favoris)
*/
function BuildYourSmileysPanel(parentPanel)
{
	LoadSmileyStats();
	
	// 1) Panneau Top
	
	displaySmileysInPanel(smileys_stats, key_tab_top, id_tab_top, key_top, tab_top_title, "Vos " + sm_count + " smilies les plus utilisés", parentPanel);
	
	// 2) Panneau Historique
	
	var smileys_history_stats = sortAssocHistory(smileys_stats);
	displaySmileysInPanel(smileys_history_stats, key_tab_history, id_tab_history, key_history, tab_history_title, "Vos " + sm_count + " smilies les plus récents", parentPanel);
	
	// 3) Panneau Favoris
	
	displaySmileysInPanel(smileys_stats, key_tab_favorite, id_tab_favorite, key_fav, tab_favorite_title, null, parentPanel);
}

/* Affiche la liste des smileys dans le panneau indiqué

	smileysList : liste des smileys
	tab_key : type du panneau
	id_panel : id du sous-panneau à créer
	prefix_id : préfixe de l'id du conteneur de chaque image
	tab_title : texte du header de l'onglet
	tips_title : texte en haut du sous-panneau décrivant son utilité,
	parentPanel : panneau parent hébergeant le sous-panneau
*/
function displaySmileysInPanel(smileysList, tab_key, id_panel, prefix_id, tab_title, tips_title, parentPanel)
{
	var panel = document.createElement('div');
	panel.id = tab_key;
	panel.className = "tabbertab";
	panel.title = tab_title;
	
	parentPanel.appendChild(panel);
	
	if (tips_title != null)
	{
		var tips_titleItem = document.createElement('span');
		tips_titleItem.className = "s1Topic";
		tips_titleItem.innerHTML = tips_title;
		panel.appendChild(tips_titleItem);
	}
	
	var j = 0;
	var smileys_table = document.createElement('div');
	smileys_table.id = id_panel;
	smileys_table.style.overflow = "auto";
	smileys_table.style.maxHeight = panelMaxHeight;
	
	var i = 0;
	
	// Construction du panneau de smileys. Bouclage sur la liste des statistiques de smileys (issue de la configuration GreaseMonkey)
	for(var k in smileysList)
	{
		if (tab_key != key_tab_favorite && i == sm_count)
		{
			// Pour les panneaus autres que celui des favoris, une limite de nombre de smiley est appliquée
			break;
		}
		
		var smiley = smileys_stats[k];
		
		var displayThisSmiley = false;
		
		// Détermination si on affiche ce smiley
		switch (tab_key)
		{
			case key_tab_top:
			case key_tab_history:
				if (!smiley.fav || sm_include_fav)
				{
					// Si ce n'est pas un favoris : on l'affiche
					// Si c'est un favoris et qu'il est spécifié de les inclure : on l'affiche
					displayThisSmiley = true;
				}
				break;
			case key_tab_favorite:
				if (smiley.fav == true)
				{
					displayThisSmiley = true;
				}
				break;
		}
		
		if (displayThisSmiley)
		{
			// Ajout du smiley dans le panneau
			AddSmileyToPanel(smiley, tab_key, smileys_table, i, prefix_id);
			
			i++;
		}
	}
	
	panel.appendChild(smileys_table);
	
	if (i == 0 && sm_count != 0)
	{
		// Pas de statistique existante dans la configuration GreaseMonkey
		
		panel.appendChild(getLineBreak());
		
		var none_text = document.createElement('span'); // Elément de texte
		none_text.className = "small"; // Style
		none_text.innerHTML = "aucun"; // Texte
		panel.appendChild(none_text);
	}
}

/*
	Ajoute un smiley au panneau désigné
	smiley : objet smiley
	tab_key : type du panneau
	smileys_table : objet graphique contenant les smileys graphiques du panneau
	i : numéro de smiley dans la liste des smileys
	prefix_id : préfixe de l'id du conteneur de chaque image
*/
function AddSmileyToPanel(smiley, tab_key, smileys_table, i, prefix_id)
{
	var smiley_tiny_code = ConvertFullCodeToTinyCode(smiley.c); // Tiny code
	
	// Conteneur racine de description d'un smiley
	var smiley_parent_container = document.createElement('li');
	smileys_table.appendChild(smiley_parent_container);
	
	smiley_parent_container.style.display = "-moz-inline-stack";
	smiley_parent_container.style.display = "inline-block";
	smiley_parent_container.style.verticalAlign = "middle";
	smiley_parent_container.style.margin = "2px";
	smiley_parent_container.style.zoom = "1";
	smiley_parent_container.id = prefix_id + smiley_tiny_code;
	
	// Conteneur de description du smiley
	var smiley_container = document.createElement('div');
	smiley_parent_container.appendChild(smiley_container);
	
	// 1) Conteneur de l'image
	var img_container = document.createElement('div');
	img_container.style.verticalAlign = "middle";
	smiley_container.appendChild(img_container);
	
	// Définition de l'image
	img_container.appendChild(BuildSmileyImage(smiley, smiley_tiny_code, true));
	
	// 2) Conteneur d'édition (en-dessous du smiley)
	var manager_container = document.createElement('div');
	smiley_container.appendChild(manager_container);
	manager_container.style.verticalAlign = "middle";
	
	if (tab_key != key_tab_favorite)
	{
		// 2.2) Statistique
		var stat_container = document.createElement('span');
		manager_container.appendChild(stat_container);
		
		var statInfoText = null;
		var statInfoToolTipText = null;
		
		switch (tab_key)
		{
			case key_tab_top:
				statInfoText = smiley.s;
				statInfoToolTipText = smiley.s + " fois";
				break;
			case key_tab_history:
				statInfoText = (i + 1);
				statInfoToolTipText = getDateTimeStringForDisplay(smiley.d);
				stat_container.style.cursor = "help";
				break;
		}
		
		stat_container.innerHTML = statInfoText;
		stat_container.style.cssFloat = "left";
		stat_container.style.fontSize = "x-small"; // Taille du nombre statistique
		stat_container.style.margin = "1px";
		stat_container.title = statInfoToolTipText;
	}
	
	// 2.2) Contrôles d'édition du smiley
	var edit_control = document.createElement('span');
	edit_control.style.cssFloat = "right";
	manager_container.appendChild(edit_control);
	
	// Icône étoile
	edit_control.appendChild(BuildFavoriteIcon(smiley, smiley_tiny_code, prefix_id));
	
	if (tab_key != key_tab_favorite)
	{
		// Conteneur pour l'icône de suppression
		var remove_container = document.createElement('input');
		edit_control.appendChild(remove_container);
		
		remove_container.value = "X";
		remove_container.type = "button";
		remove_container.style.margin = "1px";
		remove_container.style.fontSize = "8px";
		remove_container.style.width = "10px";
		remove_container.style.fontWeight = "bold";
		remove_container.style.color = "red";
		remove_container.style.verticalAlign = "middle";
		remove_container.title = "Supprimer le smiley " + smiley.c;
		remove_container.alt = smiley.c;
		remove_container.addEventListener("click", RemoveSmileyStat, true);
	}
}

/*
	Construit l'icône interactive "favoris", en forme d'étoile.
*/
function BuildFavoriteIcon(smiley, smiley_tiny_code, prefix_id)
{
	var img_favorite = document.createElement('img');
	
	var favorite_icon_url = "";
	if(smiley.fav == true)
	{
		favorite_icon_url = icon_fav_active;
	}
	else
	{
		favorite_icon_url = icon_fav_inactive;
	}
	
	img_favorite.id = prefix_id + key_fav_img + smiley_tiny_code;
	img_favorite.width = 16;
	img_favorite.height = 16;
	img_favorite.style.verticalAlign = "middle";
	img_favorite.src = favorite_icon_url;
	
	AddClickEventHandlerForFavoriteStatusChange(smiley, img_favorite);
	
	return img_favorite;
}

/*
	Ajoute un gestionnaire d'évènement sur le clic de l'utilisateur,
	pour changer le status favoris du smiley
*/
function AddClickEventHandlerForFavoriteStatusChange(smiley, element)
{
	element.addEventListener("click", ChangeFavoriteStatus, true);
	element.alt = smiley.c;
	element.style.cursor = "pointer";
	element.title = GetFavoriteTooltip(smiley);
}

/*
	Construction de l'image représentant le smiley
*/
function BuildSmileyImage(smiley, smiley_tiny_code, clickable)
{
	var img = document.createElement('img');
	
	var icon_path = null;
	
	if (IsBaseSmiley(smiley.c))
	{
		// Smiley de base
		icon_path = GetUrlForBaseSmiley(smiley.c);
	}
	else
	{
		// Smiley utilisateur
		if (smiley_tiny_code.count(':') == 1)
		{
			// Smiley perso numéroté
			var splitCode = smiley_tiny_code.split(':');
			var tiny_code = splitCode[0];
			var numeroSmileyPerso = splitCode[1];
			
			icon_path = image_utilisateur_url + numeroSmileyPerso + "/" + tiny_code + ".gif";
		}
		else
		{
			// Le smiley du forumeur
			icon_path = image_utilisateur_url + smiley_tiny_code + ".gif";
		}
	}
	
	img.src = icon_path;
	img.alt = smiley.c; // Texte alternatif (quand l'image n'est pas chargée)
	img.title = smiley.c; // Tooltip
	img.style.margin = "1px";
	
	if (clickable)
	{
		img.addEventListener('click', function(event){ putSmiley(this.alt, this.src); }, false);
		img.style.cursor = "pointer";
	}
	
	return img;
}

function GetFavoriteTooltip(smiley)
{
	var tooltip = null;
	
	if(smiley.fav)
	{
		tooltip = "Enlever le marqueur favori du smiley " + smiley.c;
	}
	else
	{
		tooltip = "Marquer en favori le smiley " + smiley.c;
	}
	
	return tooltip;
}

/*
	Change le comportement du bouton "Valider votre message"
		Ajoute une action qui analyse le message, extrait les smileys, et met à jour les statistiques dans GreaseMonkey
*/
function ChangeValidateButtonAction()
{
	var validate_button = document.getElementByXPath('//td[@class="repCase2"]/input[@name="submit"]', root);
	
	if (validate_button == null)
	{
		validate_button = document.getElementByXPath('//div[@id="moderne"]/div[@class="toolbar"]/input[@accesskey="s"]', root);
		GM_log(validate_button);
	}
	
	var onclick_init = validate_button.getAttribute("onclick");
	validate_button.addEventListener("click", function(){ValidateFunction(onclick_init);}, true);
	//validate_button.removeEventListener("click", validate_button.onclick, true); // Commenté car cette ligne crée une erreur. A virer peut-être.
}

/*
	Mise à jour des statistiques de smileys
	
	Arguments :
		onclick_init : évènement existants au onclick
*/
function ValidateFunction(onclick_init, fastReplyMsgId)
{
	// Contournement GreaseMonkey pour appeler les évènements
	var onclick_init_GM = "unsafeWindow." + onclick_init.replace('return', '');
	
	if (false && !eval(onclick_init_GM))// Exécute les évènements existants
	{
		/* if false => rustine temporaire car il y a un bug dans le code HFR dans la fonction JS "verif_not_empty"
			qui fait : if (document.getElementById('delete').checked == true) => plantage JS
			Cette rustine a comme inconvénient de traiter les smileys pour ce script GM même s'il y a une erreur dans le formulaire.
		*/
	
		// Arrêt du script car les évènements ont renvoyés une erreur
		return false;
	}
	else
	{
		// Le message est prêt à être envoyé au serveur. Avant cela, analyse le message pour les smileys.
		
		var textarea = null;
		var initial_message2 = null;
			
		// Extraction de la liste des smileys à partir du message
		if (fastReplyMsgId == null)
		{
			textarea = GetMessageEditingBox();
			initial_message2 = initial_message;
		}
		else
		{
			// Mode "édition rapide"
			var msgInfo = fastReplyDict[fastReplyMsgId];
			textarea = GetFastEditTextArea(msgInfo.msgId);
			initial_message2 = msgInfo.initialText;
		}
		
		var smileysList_Old = BuildSmileyListFromMessage(initial_message2); // Liste des smileys avant édition
		var smileysList_New = BuildSmileyListFromMessage(textarea.value); // Liste des smileys actuels
		
		if (smileysList_New == null)
		{
			// Aucun smiley trouvé
		}
		else
		{
			// Des smileys ont été trouvés :  mise à jour de la configuration GreaseMonkey
			
			LoadSmileyStats();
			
			// Construction de la date actuelle
			var date = GetCurrentFormatedDate();
			
			var newSmileyList = "";
			var newSmileyCount = 0;
			
			for(var i in smileysList_New) // Pour chaque smiley trouvé
			{
				var smiley_New = smileysList_New[i];
				
				// Recherche si ce smiley était déjà présent avant l'édition
				var smiley_Old = smileysList_Old[smiley_New.code];
				
				if (smiley_Old != null)
				{
					var diff = smiley_New.count - smiley_Old.count;
					
					if (diff <= 0)
					{
						// Ce smiley n'a pas été utilisé à nouveau dans le message
						continue;
					}
					else
					{
						smiley_New.count = diff;
					}
				}
				
				// Obtention de la statistique précédente, si existante
				var smiley = smileys_stats[smiley_New.code];
				
				if (smiley == null)
				{
					newSmileyList += smiley_New.code + " ";
					newSmileyCount++;
					
					// Nouveau smiley, nouvelle entrée
					
					smiley = CreateSmileyObject(smiley_New.code, smiley_New.count, null);
				}
				else
				{
					smiley.s += smiley_New.count; // Incrémente la statistique existante
				}
				
				smiley.d = date;
				
				smileys_stats[smiley_New.code] = smiley; // Mise à jour ou ajout de la statisque dans la liste Json
			}
			
			if (sm_notify_new && newSmileyCount > 0)
			{
				var msg = null;
				
				if(newSmileyCount == 1)
				{
					msg = "1 nouveau smiley trouvé";
				}
				else
				{
					msg = newSmileyCount + " nouveaux smileys trouvés";
				}
				msg += " :\n" + newSmileyList;
				
				alert(msg);
			}
			
			saveUserStats();
		}
		
		// Envoi du message au serveur HFR
		return true;
	}
}

/*
	Recharge le panneau des smileys en fast reply
*/
function ReloadSmileysFullPanel()
{
	var favoritePanelItem = document.getElementById(key_favoritePanel);
	
	if (favoritePanelItem != null)
	{
		// Page "fast reply"
		ShowFavoriteSmileysPanel(false);
	}
}

















// =============================================================== //
// CSS Manager
// =============================================================== //

var cssManager = 
{
	cssContent : '',
	
	addCssProperties : function (properties)
	{
		cssManager.cssContent += properties;
	},
	
	insertStyle : function()
	{
		GM_addStyle(cssManager.cssContent);
		cssManager.cssContent = '';
	}
}











// =============================================================== //
// Fenêtre de configuration
// =============================================================== //

var cmScript =
{
	backgroundDiv : null,
	
	configDiv : null,
	
	favoriteDiv : null,
	
	timer : null,
	
	isOpened : false,
	
	setDivsPosition : function ()
	{
		cmScript.setBackgroundPosition();
		cmScript.setConfigWindowPosition();
	},
	
	setBackgroundPosition : function ()
	{
		cmScript.backgroundDiv.style.width = document.documentElement.clientWidth + 'px';
		cmScript.backgroundDiv.style.height = document.documentElement.clientHeight + 'px';
		cmScript.backgroundDiv.style.top = window.scrollY + 'px';
	},

	setConfigWindowPosition : function ()
	{
		cmScript.configDiv.style.left = (document.documentElement.clientWidth / 2) - (parseInt(cmScript.configDiv.style.width) / 2) + window.scrollX + 'px';
		cmScript.configDiv.style.top = (document.documentElement.clientHeight / 2) - (parseInt(cmScript.configDiv.clientHeight) / 2) + window.scrollY + 'px';
		cmScript.favoriteDiv.style.left = (document.documentElement.clientWidth / 2) - (parseInt(cmScript.favoriteDiv.style.width) / 2) + window.scrollX + 'px';
		cmScript.favoriteDiv.style.top = (document.documentElement.clientHeight / 2) - (parseInt(cmScript.favoriteDiv.clientHeight) / 2) + window.scrollY + 'px';
	},
	
	disableKeys : function (event)
	{
		var key = event.which;
		if (key == 27)
		{
			clearInterval(cmScript.timer);
			cmScript.hideConfigWindow();
		}
		else if (key == 13) cmScript.validateConfig();
		else if (event.altKey || (event.target.nodeName.toLowerCase() != 'input' && key >= 33 && key <= 40)) event.preventDefault();
	},
	
	disableTabUp : function (elt)
	{
		elt.addEventListener('keydown', function(event)
		{
			var key = event.which;
			if (key == 9 && event.shiftKey) event.preventDefault();
		}
		, false);
	},
	
	disableTabDown : function (elt)
	{
		elt.addEventListener('keydown', function(event)
		{
			var key = event.which;
			if (key == 9 && !event.shiftKey) event.preventDefault();
		}
		, false);
	},
	
	disableScroll : function ()
	{
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', cmScript.disableKeys, false);
	},
	
	enableScroll : function ()
	{
		document.body.style.overflow = 'visible';
		window.removeEventListener('keydown', cmScript.disableKeys, false);
	},
	
	alterWindow : function (opening)
	{
		this.isOpened = opening;
		
		if (opening)
		{
			// On fige la fenêtre
			cmScript.disableScroll();
			// A chaque resize, repositionnement des divs
			window.addEventListener('resize', cmScript.setDivsPosition, false);
			// On cache les iframes de m%$!§
			document.getElementsByXPath('//iframe', document.body).forEach(function(iframe){ iframe.style.visibility = 'hidden'; });
		}
		else
		{
			cmScript.enableScroll();
			window.removeEventListener('resize', cmScript.setDivsPosition, false);
			document.getElementsByXPath('//iframe', document.body).forEach(function(iframe){ iframe.style.visibility = 'visible'; });
		}
	},
	
	buildBackground : function ()
	{
		if (!document.getElementById('sm_back'))
		{
			cmScript.backgroundDiv = document.createElement("div");
			cmScript.backgroundDiv.id = 'sm_back';
			cmScript.backgroundDiv.addEventListener('click', function()
			{
				clearInterval(cmScript.timer);
				cmScript.hideConfigWindow();
			}
			, false);
			cssManager.addCssProperties("#sm_back { display: none; position: absolute; left: 0px; top: 0px; background-color: #242424; z-index: 1001;}");
			document.body.appendChild(cmScript.backgroundDiv);
		}
	},
	
// =============================================================== //
// Construction de la fenêtre de configuration
// =============================================================== //

	buildConfigWindow : function ()
	{
		// Styles de la fenêtre
		cssManager.addCssProperties(".sm_front { display: none; vertical-align: bottom; position: absolute; background-color: #F7F7F7; z-index: 1002; border: 1px dotted #000; padding: 8px; text-align: center; font-family: Verdana;}");
		cssManager.addCssProperties(".sm_front select { border: 1px solid black; font-family: Verdana; font-size: 0.75em;}");
		cssManager.addCssProperties(".sm_front div { bottom: 8px; right: 8px;}");
		cssManager.addCssProperties(".sm_front dt { float: left; width: 70%; text-align:right;    margin-right:10px; font-size:14px; margin-bottom:10px; }");
		cssManager.addCssProperties(".sm_front dd { float: left;}");
		
		// Construction de la fenêtre
		var configWindow = document.createElement("div");
		configWindow.id = 'sm_configWindow';
		configWindow.className = "sm_front";
		configWindow.style.width = configWindowWidth;
		configWindow.style.height = configWindowHeight;
		
		// Bouton Fermer la fenêtre
		configWindow.appendChild(this.buildCloseButton());
		
		var windowTitle = document.createElement("legend");
		windowTitle.innerHTML = 'Configuration du script : "' + script_name + '"';
		windowTitle.style.fontWeight = "bold";
		configWindow.appendChild(windowTitle);
		
		var tabs = document.createElement('div');
		tabs.className = "tabber";
		tabs.id = key_tabberConfigWindow;
		
		// 1) Construction de l'onglet Paramètres
		this.buildParametersTab(tabs);
		
		// 2) Onglet Backup
		this.buildBackupTab(tabs);
		
		// 3) Onglet "Vos smileys"
		this.buildYourSmileysTab(tabs);
		
		configWindow.appendChild(tabs);

		// Insertion de la fenêtre dans la page globale
		cmScript.configDiv = configWindow;
		document.body.appendChild(cmScript.configDiv);
	},
	/*
		Construire un bouton pour fermer la fenêtre
	*/
	buildCloseButton : function()
	{
		var inputClose = document.createElement('input');
		inputClose.type = 'image';
		inputClose.src = icon_cancel;
		inputClose.title = 'Fermer';
		inputClose.style.cssFloat = "right";
		inputClose.style.margin = "5px";
		inputClose.addEventListener('click', cmScript.hideConfigWindow, false);
		cmScript.disableTabDown(inputClose);
		
		return inputClose;
	},
	/*
		Onglet paramètres
	*/
	buildParametersTab : function(tabs)
	{
		var configTab = document.createElement('div');
		configTab.className = "tabbertab";
		configTab.style.padding = "15px";
		configTab.title = "Paramètres";
		configTab.id = key_tab_settings;
		
		tabs.appendChild(configTab);
		
		// Formulaire
		var formular = document.createElement("fieldset");
		configTab.appendChild(formular);
		
		// Titre
		var titre = document.createElement("legend");
		titre.innerHTML = "Paramètres";
		titre.style.fontWeight = "bold";
		formular.appendChild(titre);
		
		// Liste des réglages
		
		this.addTextBoxField(formular, "Nombre de smileys affichés par panneau (hors favoris - illimité)", key_sm_count, sm_count, 3);
		
		this.addCheckBoxField(formular, "Confirmer la suppression des smileys", key_sm_confirm_delete, sm_confirm_delete, true);
		
		this.addCheckBoxField(formular, 'Inclure les favoris dans les panneaux "Top" et "Historique"', key_sm_include_fav, sm_include_fav, true);
		
		this.addCheckBoxField(formular, "Afficher le panneau de smileys à côté de la réponse rapide", key_sm_fast_reply, sm_fast_reply, true);
		
		this.addCheckBoxField(formular, "Afficher une boite de dialogue quand des nouveaux smileys sont trouvés dans votre post", key_sm_notify_new, sm_notify_new, true);
		
		this.addCheckBoxField(formular, "Permettre de marquer les smileys en favori depuis n'importe quel message sur le forum", key_sm_fav_world, sm_fav_world, true);
		
		this.addCheckBoxField(formular, "Intégrer vos 10 smileys persos HFR", key_sm_include_hfr_fav, sm_include_hfr_fav, true);

		// Définition de l'icône associée à chaque message
		this.addTextBoxFieldIconChoice(formular, "Icône à côté de chaque message : ", key_sm_fav_world_icon, sm_fav_world_icon, 10);
		
		// Remarque
		var note = document.createElement("span");
		note.innerHTML = "Remarque : si vous changez ces réglages, il faudra cliquer sur l'icône \"valider\" ci-dessous, puis actualiser la page afin qu'ils soient appliqués.";
		note.style.cssFloat = "left";
		note.style.fontSize = "10px";
		
		formular.appendChild(note);

		// Boutons de contrôle
		var buttonsContainer = document.createElement('div');
		buttonsContainer.style.cssFloat = "right";
		buttonsContainer.style.position = "relative";
		
		// Enregistrer cette configuration
		var inputOk = document.createElement('input');
		inputOk.type = 'image';
		inputOk.src = icon_validate;
		inputOk.title = 'Valider';
		inputOk.addEventListener('click', cmScript.validateConfig, false);
		
		buttonsContainer.appendChild(inputOk);
		
		// Annuler cette configuration
		var inputCancel = document.createElement('input');
		inputCancel.type = 'image';
		inputCancel.src = icon_cancel;
		inputCancel.title = 'Annuler';
		inputCancel.addEventListener('click', cmScript.hideConfigWindow, false);
		cmScript.disableTabDown(inputCancel);
		
		buttonsContainer.appendChild(inputCancel);
		
		formular.appendChild(buttonsContainer);
		
		// Lien pour réinitialiser les statistiques
		var link_reset = document.createElement('a');
		link_reset.className = "s1Topic"; // Style
		link_reset.href = "javascript:void(null);";
		link_reset.style.lineHeight = "25px";
		link_reset.addEventListener("click", ResetAllStats, true);
		link_reset.innerHTML = "Réinitialiser toutes les infos de smileys";
		link_reset.title = "Cliquez ici pour effacer toutes les infos de smileys (après confirmation)";
		configTab.appendChild(link_reset);
	},
	/*
		Onglet Backup
	*/
	buildBackupTab : function(tabs)
	{
		var backupTab = document.createElement('div');
		backupTab.className = "tabbertab";
		backupTab.title = "Sauvegardes";
		backupTab.id = key_tab_backup;
		
		backupTab.appendChild(getLineBreakBlankLine());
		
		// Instruction
		var backupTitle = document.createElement("div");
		backupTitle.innerHTML = "En cas de réinstallation de Firefox, si vous voulez conserver les smileys, il faut faire une sauvegarde avant de désinstaller Firefox.";
		backupTitle.style.fontSize = "12px";
		
		backupTab.appendChild(backupTitle);
		
		backupTab.appendChild(getLineBreakBlankLine());
		
		// Lien pour sauvegarder les données
		var saveSpan = document.createElement("span");
		saveSpan.innerHTML = "- ";
		backupTab.appendChild(saveSpan);
		
		var link_save = document.createElement('a');
		link_save.className = "s1Topic"; // Style
		link_save.href = "javascript:void(null);";
		link_save.style.fontSize = "14px";
		link_save.addEventListener("click", DoBackupFile, true);
		link_save.innerHTML = "Faire une sauvegarde de tous vos smileys";
		link_save.title = "Cliquez ici pour construire un fichier de backup contenant toutes les infos de smileys.";
		backupTab.appendChild(link_save);
		
		backupTab.appendChild(getLineBreakBlankLine());
		
		// Lien pour charger les données
		var loadTitle = document.createElement("div");
		loadTitle.innerHTML = "- Charger un fichier de sauvegarde :";
		loadTitle.style.fontSize = "14px";
		backupTab.appendChild(loadTitle);
		
		var inputLoad = document.createElement("input");
		inputLoad.type = "file";
		inputLoad.name = "files[]";
		backupTab.appendChild(inputLoad);
		backupTab.addEventListener('change', LoadBackupFile, false);
		
		var linkLoadDiv = document.createElement("div");
		backupTab.appendChild(linkLoadDiv);
		
		backupTab.appendChild(getLineBreakBlankLine());
		
		tabs.appendChild(backupTab);
	},
	/*
		Onglet "Vos smileys"
	*/
	buildYourSmileysTab : function(tabs)
	{
		var yourSmileysTab = document.createElement('div');
		yourSmileysTab.className = "tabbertab";
		yourSmileysTab.title = "Vos smileys";
		yourSmileysTab.id = key_tab_yoursmileys;
		
		BuildYourSmileysContentTab(yourSmileysTab);
		
		tabs.appendChild(yourSmileysTab);
	},
	/*
		Ajoute un champ de type TextBox
		formular : conteneur
	*/
	addTextBoxField : function(formular, field_title, field_id, field_value, maxlength)
	{
		var dl = document.createElement("dl");
		formular.appendChild(dl);
		
		var dt = document.createElement("dt");
		dt.innerHTML = field_title + " :";
		dl.appendChild(dt);
		
		var dd = document.createElement("dd");
		dl.appendChild(dd);
		
		var input_field = document.createElement("input");
		input_field.type = "text";
		input_field.id = field_id;
		input_field.maxlength = maxlength; // maximum length (in characters) of an input field
		input_field.size = maxlength; // number of characters that should be visible
		input_field.value = field_value;
		dd.appendChild(input_field);
	},
	/*
		Ajoute un champ de type TextBox pour choisir une icône
		formular : conteneur
	*/
	addTextBoxFieldIconChoice : function(formular, field_title, field_id, field_value, maxlength)
	{
		var dl = document.createElement("dl");
		formular.appendChild(dl);
		
		var dt = document.createElement("dt");
		
		// Texte
		var divText = document.createElement("span");
		divText.innerHTML = field_title;
		dt.appendChild(divText);
		
		// Aide
		var divHelp = document.createElement("a");
		divHelp.innerHTML = "(?)";
		divHelp.href = "http://fred.82.free.fr/hfr_greasemonkey/VSF/#changerIconeCoeur";
		divHelp.target = "_blank";
		divHelp.style.marginRight = "5px";
		divHelp.title = "Pour savoir comment changer ce champ, cliquez ici (documentation du script).";
		dt.appendChild(divHelp);
		
		// Icône
		var iconShow = document.createElement('img');
		iconShow.id = keyFavWordIconShow;
		iconShow.src = field_value;
		iconShow.title = "Icône effective";
		iconShow.style.verticalAlign = "middle";
		iconShow.style.marginRight = "4px";
		dt.appendChild(iconShow);
		
		// Image pour réinitialiser l'icône
		var inputReset = document.createElement('input');
		inputReset.type = 'image';
		inputReset.src = icon_cancel;
		inputReset.title = "Réinitialiser l'icône";
		inputReset.style.verticalAlign = "middle";
		inputReset.style.marginRight = "4px";
		inputReset.addEventListener('click', ResetIconFavWorld, false);
		dt.appendChild(inputReset);
		
		dl.appendChild(dt);
		
		var dd = document.createElement("dd");
		dl.appendChild(dd);
		
		// Définition éditable de l'icône
		var input_field = document.createElement("input");
		input_field.type = "text";
		input_field.id = field_id;
		input_field.maxlength = maxlength; // maximum length (in characters) of an input field
		input_field.size = maxlength; // number of characters that should be visible
		input_field.value = field_value;
		input_field.addEventListener('paste', ReloadIconFavWorld, false);
		input_field.addEventListener('click', function()
		{
			// Sélection de tout le contenu de la inputBox quand on clique dessus
			input_field.select();
		}, false);
		dd.appendChild(input_field);
	},
	/*
		Ajoute un champ de type CheckBox
		formular : conteneur
	*/
	addCheckBoxField : function(formular, field_title, field_id, checked, enabled)
	{
		var dl = document.createElement("dl");
		formular.appendChild(dl);
		
		var dt = document.createElement("dt");
		dt.innerHTML = field_title + " :";
		dl.appendChild(dt);
		
		var dd = document.createElement("dd");
		dl.appendChild(dd);
		
		var input_field = document.createElement("input");
		input_field.type = "checkbox";
		input_field.id = field_id;
		input_field.disabled = !enabled;
		input_field.checked = checked;
		dd.appendChild(input_field);
	},
	/*
		Initialisation de la fenêtre "Choix des favoris"
	*/
	initFavoriteWindow : function ()
	{
		var favoriteWindow = document.createElement("span");
		favoriteWindow.className = "sm_front";
		favoriteWindow.style.width = favoriteWindowWidth;
		favoriteWindow.style.height = favoriteWindowHeight;
		
		// Bouton Fermer la fenêtre
		favoriteWindow.appendChild(this.buildCloseButton());
		
		// Texte d'en-tête
		var headerText = document.createElement("span");
		headerText.style.fontSize = "12px";
		headerText.innerHTML = "Choisissez ci-dessous les smileys à mettre en favoris";
		favoriteWindow.appendChild(headerText);
		
		favoriteWindow.appendChild(getLineBreakBlankLine());
		
		var contentHeight = "130px";
		
		// Encadré
		var container = document.createElement("div");
		container.className = "cellWrapper";
		container.style.border = "2px groove #F0F0F0";
		container.style.width = "100%";
		container.style.height = contentHeight;
		favoriteWindow.appendChild(container);
		
		// Conteneur des smileys
		var favoritesList = document.createElement("div");
		favoritesList.id = keyFavoritesList;
		favoritesList.style.textAlign = "center";
		favoritesList.style.overflow = "auto"; // Scrolling
		favoritesList.style.maxHeight = contentHeight;
		container.appendChild(favoritesList);
		
		cmScript.favoriteDiv = favoriteWindow;
		document.body.appendChild(cmScript.favoriteDiv);
	},
	/*
		Construction de la fenêtre "Choix des favoris"
	*/
	buildFavoriteWindow : function(smileysList)
	{
		LoadSmileyStats();
		
		var favoritesList = document.getElementById(keyFavoritesList);
		
		// Suppression des favoris éventuellement déjà affichés précédemment.
		while (favoritesList.hasChildNodes()) {
			favoritesList.removeChild(favoritesList.lastChild);
		}
		
		smileysList = smileysList.getUnique("alt");
		
		for(var i = 0; i < smileysList.length; i++)
		{
			var smiley_code = smileysList[i];
			var smiley = smileys_stats[smiley_code];
			
			if (smiley == null)
			{
				smiley = CreateSmileyDefaultObject(smiley_code);
			}
			
			var smiley_tiny_code = ConvertFullCodeToTinyCode(smiley.c);
			
			// Container du smiley
			var favoriteContainer = document.createElement("div");
			favoriteContainer.style.display = "inline-block";
			favoriteContainer.style.margin = "1px";
			
			// Ajout image du smiley
			var smileyImage = BuildSmileyImage(smiley, smiley_tiny_code, false);
			AddClickEventHandlerForFavoriteStatusChange(smiley, smileyImage);
			favoriteContainer.appendChild(smileyImage);
			
			// Ajout icône pour changer le status favoris
			var favoriteIcon = BuildFavoriteIcon(smiley, smiley_tiny_code, key_favmsg);
			favoriteIcon.style.display = "block";
			favoriteIcon.style.textAlign = "center";
			favoriteIcon.style.marginLeft = "auto";
			favoriteIcon.style.marginRight = "auto";
			favoriteContainer.appendChild(favoriteIcon);
			
			favoritesList.appendChild(favoriteContainer);
		}
	},
	validateConfig : function()
	{
		document.getElementsByXPath('.//*[starts-with(@id, "sm_")]', document.getElementById('sm_configWindow')).forEach(function(input)
		{
			var value = null;
			
			switch(input.type)
			{
				case "checkbox":
					value = input.checked;
					break;
				case "text":
					value = input.value;
					break;
			}
			
			if (input.id == key_sm_include_hfr_fav)
			{
				if (value && !sm_include_hfr_fav)
				{
					IncludeHFRFavoriteSmileys();
				}
				
				sm_include_hfr_fav = value;
			}
			
			// Enregistrement du réglage
			GM_setValue(input.id, value);
		}
		);
		cmScript.hideConfigWindow();
	},
	
	initBackAndFront : function()
	{
		if (document.getElementById('sm_back'))
		{
			cmScript.setBackgroundPosition();
			cmScript.backgroundDiv.style.opacity = 0;
			cmScript.backgroundDiv.style.display = 'block';
		}
	},
	
	/*
	windowToShow : nom de la fenêtre à afficher
	*/
	showConfigWindow : function (windowToShow)
	{
		cmScript.alterWindow(true);
		cmScript.initBackAndFront();
		var opacity = 0;
		cmScript.timer = setInterval(function()
		{
			opacity = Math.round((opacity + 0.1) * 100) / 100;
			cmScript.backgroundDiv.style.opacity = opacity;
			if (opacity >= 0.8)
			{
				clearInterval(cmScript.timer);
				
				switch(windowToShow)
				{
					case keyWindowConfig:
						cmScript.configDiv.style.display = 'block';
						SwitchTab(sm_config_tab);
						SwitchTab(sm_config_smiley_tab);
						break;
					case keyWindowFavorite:
						cmScript.favoriteDiv.style.display = 'block';
						break;
				}
				
				cmScript.setConfigWindowPosition();
			}
		}
		, 1);
	},
	
	/*
		Cache la fenêtre de configuration, et annule les saisies éventuelles
	*/
	hideConfigWindow : function ()
	{
		reloadUserConfig(); // Rechargement des réglages

		cmScript.configDiv.style.display = 'none';
		cmScript.favoriteDiv.style.display = 'none';
		var opacity = cmScript.backgroundDiv.style.opacity;
		cmScript.timer = setInterval(function()
		{
			opacity = Math.round((opacity - 0.1) * 100) / 100;
			cmScript.backgroundDiv.style.opacity = opacity;
			if (opacity <= 0)
			{
				clearInterval(cmScript.timer);
				cmScript.backgroundDiv.style.display = 'none';
				cmScript.alterWindow(false);
			}
		}
		, 1);
	},
	
	setUp : function()
	{
		if (top.location != self.document.location) {
			return;
		}
		
		// Arrière-plan
		cmScript.buildBackground();
		
		// Fenêtre de config
		cmScript.buildConfigWindow();
		
		// Fenêtre des favoris d'un message
		cmScript.initFavoriteWindow();
		
		// CSS
		cssManager.insertStyle();
	},
	
	createConfigMenu : function ()
	{
		GM_registerMenuCommand("[HFR] " + script_name + " -> Configuration", function(event){ cmScript.showConfigWindow(keyWindowConfig, null); });
	}
};

/*
	Onglet "Vos smileys" : définition du contenu
*/
function BuildYourSmileysContentTab(yourSmileysTab)
{
	yourSmileysTab.appendChild(getLineBreakBlankLine());
	
	var yourSmileysTabs = document.createElement('div');
	yourSmileysTabs.className = "tabber";
	yourSmileysTabs.id = key_tabberSmileysParameters;
	
	yourSmileysTab.appendChild(yourSmileysTabs);
	
	BuildYourSmileysPanel(yourSmileysTabs);
	
	return yourSmileysTabs;
}




// =============================================================== //
// Script pour faire apparaitre des onglets
// =============================================================== //

var tabberOptions = {
	/* Optional: instead of letting tabber run during the onload event, 
	we'll start it up manually. This can be useful because the onload
	even runs after all the images have finished loading, and we can
	run tabber at the bottom of our page to start it up faster. See the
	bottom of this page for more info. Note: this variable must be set
	BEFORE you include tabber.js.   */
	"manualStartup": true,

	/* Optional: code to run after each tabber object has initialized */
	"onLoad": function(argsObj) {
		/* Exemple
		if (argsObj.tabber.id == 'tab2') {
			alert('Finished loading tab2!');
		}
		*/
	},

	/* Optional: code to run when the user clicks a tab. If this
	function returns boolean false then the tab will not be changed
	the click is canceled). If you do not return a value or return
	something that is not boolean false, */
	"onClick": function(argsObj) {
		var t = argsObj.tabber; /* Tabber object */
		var id = t.id; /* ID of the main tabber DIV */
		var i = argsObj.index; /* Which tab was clicked (0 is the first tab) */
		var e = argsObj.event; /* Event object */
		
		SaveCurrentShownTab(t.tabs[i].id)
	},

	/* Optional: set an ID for each tab navigation link */
	'addLinkId': true
};

// Source : http://www.barelyfitz.com/projects/tabber/
/*==================================================
  $Id: tabber.js,v 1.9 2006/04/27 20:51:51 pat Exp $
  tabber.js by Patrick Fitzgerald pat@barelyfitz.com

  Documentation can be found at the following URL:
  http://www.barelyfitz.com/projects/tabber/

  License (http://www.opensource.org/licenses/mit-license.php)

  Copyright (c) 2006 Patrick Fitzgerald

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  ==================================================*/

function tabberObj(argsObj)
{
  var arg; /* name of an argument to override */

  /* Element for the main tabber div. If you supply this in argsObj,
     then the init() method will be called.
  */
  this.div = null;

  /* Class of the main tabber div */
  this.classMain = "tabber";

  /* Rename classMain to classMainLive after tabifying
     (so a different style can be applied)
  */
  this.classMainLive = "tabberlive";

  /* Class of each DIV that contains a tab */
  this.classTab = "tabbertab";

  /* Class to indicate which tab should be active on startup */
  this.classTabDefault = "tabbertabdefault";

  /* Class for the navigation UL */
  this.classNav = "tabbernav";

  /* When a tab is to be hidden, instead of setting display='none', we
     set the class of the div to classTabHide. In your screen
     stylesheet you should set classTabHide to display:none.  In your
     print stylesheet you should set display:block to ensure that all
     the information is printed.
  */
  this.classTabHide = "tabbertabhide";

  /* Class to set the navigation LI when the tab is active, so you can
     use a different style on the active tab.
  */
  this.classNavActive = "tabberactive";

  /* Elements that might contain the title for the tab, only used if a
     title is not specified in the TITLE attribute of DIV classTab.
  */
  this.titleElements = ['h2','h3','h4','h5','h6'];

  /* Should we strip out the HTML from the innerHTML of the title elements?
     This should usually be true.
  */
  this.titleElementsStripHTML = true;

  /* If the user specified the tab names using a TITLE attribute on
     the DIV, then the browser will display a tooltip whenever the
     mouse is over the DIV. To prevent this tooltip, we can remove the
     TITLE attribute after getting the tab name.
  */
  this.removeTitle = true;

  /* If you want to add an id to each link set this to true */
  this.addLinkId = false;

  /* If addIds==true, then you can set a format for the ids.
     <tabberid> will be replaced with the id of the main tabber div.
     <tabnumberzero> will be replaced with the tab number
       (tab numbers starting at zero)
     <tabnumberone> will be replaced with the tab number
       (tab numbers starting at one)
     <tabtitle> will be replaced by the tab title
       (with all non-alphanumeric characters removed)
   */
  this.linkIdFormat = '<tabberid>nav<tabnumberone>';

  /* You can override the defaults listed above by passing in an object:
     var mytab = new tabber({property:value,property:value});
  */
  for (arg in argsObj) { this[arg] = argsObj[arg]; }

  /* Create regular expressions for the class names; Note: if you
     change the class names after a new object is created you must
     also change these regular expressions.
  */
  this.REclassMain = new RegExp('\\b' + this.classMain + '\\b', 'gi');
  this.REclassMainLive = new RegExp('\\b' + this.classMainLive + '\\b', 'gi');
  this.REclassTab = new RegExp('\\b' + this.classTab + '\\b', 'gi');
  this.REclassTabDefault = new RegExp('\\b' + this.classTabDefault + '\\b', 'gi');
  this.REclassTabHide = new RegExp('\\b' + this.classTabHide + '\\b', 'gi');

  /* Array of objects holding info about each tab */
  this.tabs = new Array();

  /* If the main tabber div was specified, call init() now */
  if (this.div) {

    this.init(this.div);

    /* We don't need the main div anymore, and to prevent a memory leak
       in IE, we must remove the circular reference between the div
       and the tabber object. */
    this.div = null;
  }
}


/*--------------------------------------------------
  Methods for tabberObj
  --------------------------------------------------*/


tabberObj.prototype.init = function(e)
{
  /* Set up the tabber interface.

     e = element (the main containing div)

     Example:
     init(document.getElementById('mytabberdiv'))
   */

  var
  childNodes, /* child nodes of the tabber div */
  i, i2, /* loop indices */
  t, /* object to store info about a single tab */
  defaultTab=0, /* which tab to select by default */
  DOM_ul, /* tabbernav list */
  DOM_li, /* tabbernav list item */
  DOM_a, /* tabbernav link */
  aId, /* A unique id for DOM_a */
  headingElement; /* searching for text to use in the tab */

  /* Verify that the browser supports DOM scripting */
  if (!document.getElementsByTagName) { return false; }

  /* If the main DIV has an ID then save it. */
  if (e.id) {
    this.id = e.id;
  }

  /* Clear the tabs array (but it should normally be empty) */
  this.tabs.length = 0;

  /* Loop through an array of all the child nodes within our tabber element. */
  childNodes = e.childNodes;
  for(i=0; i < childNodes.length; i++) {

    /* Find the nodes where class="tabbertab" */
    if(childNodes[i].className &&
       childNodes[i].className.match(this.REclassTab)) {
      
      /* Create a new object to save info about this tab */
      t = new Object();
      
      /* Save a pointer to the div for this tab */
      t.div = childNodes[i];
      
      /* Add the new object to the array of tabs */
      this.tabs[this.tabs.length] = t;

      /* If the class name contains classTabDefault,
	 then select this tab by default.
      */
      if (childNodes[i].className.match(this.REclassTabDefault)) {
	defaultTab = this.tabs.length-1;
      }
    }
  }

  /* Create a new UL list to hold the tab headings */
  DOM_ul = document.createElement("ul");
  DOM_ul.className = this.classNav;
  
  /* Loop through each tab we found */
  for (i=0; i < this.tabs.length; i++) {

    t = this.tabs[i];

    /* Get the label to use for this tab:
       From the title attribute on the DIV,
       Or from one of the this.titleElements[] elements,
       Or use an automatically generated number.
     */
    t.headingText = t.div.title;
	t.id = t.div.id;

    /* Remove the title attribute to prevent a tooltip from appearing */
    if (this.removeTitle) { t.div.title = ''; }

    if (!t.headingText) {

      /* Title was not defined in the title of the DIV,
	 So try to get the title from an element within the DIV.
	 Go through the list of elements in this.titleElements
	 (typically heading elements ['h2','h3','h4'])
      */
      for (i2=0; i2<this.titleElements.length; i2++) {
	headingElement = t.div.getElementsByTagName(this.titleElements[i2])[0];
	if (headingElement) {
	  t.headingText = headingElement.innerHTML;
	  if (this.titleElementsStripHTML) {
	    t.headingText.replace(/<br>/gi," ");
	    t.headingText = t.headingText.replace(/<[^>]+>/g,"");
	  }
	  break;
	}
      }
    }

    if (!t.headingText) {
      /* Title was not found (or is blank) so automatically generate a
         number for the tab.
      */
      t.headingText = i + 1;
    }

    /* Create a list element for the tab */
    DOM_li = document.createElement("li");

    /* Save a reference to this list item so we can later change it to
       the "active" class */
    t.li = DOM_li;

    /* Create a link to activate the tab */
    DOM_a = document.createElement("a");
    DOM_a.appendChild(document.createTextNode(t.headingText));
    DOM_a.href = "javascript:void(null);";
    DOM_a.title = t.headingText;
	DOM_a.addEventListener("click", this.navClick, true);
	
    /* Add some properties to the link so we can identify which tab
       was clicked. Later the navClick method will need this.
    */
    DOM_a.tabber = this;
    DOM_a.tabberIndex = i;

    /* Do we need to add an id to DOM_a? */
    if (this.addLinkId && this.linkIdFormat) {

      /* Determine the id name */
      aId = this.linkIdFormat;
      aId = aId.replace(/<tabberid>/gi, this.id);
      aId = aId.replace(/<tabnumberzero>/gi, i);
      aId = aId.replace(/<tabnumberone>/gi, i+1);
      aId = aId.replace(/<tabtitle>/gi, t.headingText.replace(/[^a-zA-Z0-9\-]/gi, ''));

      DOM_a.id = aId;
    }

    /* Add the link to the list element */
    DOM_li.appendChild(DOM_a);

    /* Add the list element to the list */
    DOM_ul.appendChild(DOM_li);
  }

  /* Add the UL list to the beginning of the tabber div */
  e.insertBefore(DOM_ul, e.firstChild);

  /* Make the tabber div "live" so different CSS can be applied */
  e.className = e.className.replace(this.REclassMain, this.classMainLive);

  /* Activate the default tab, and do not call the onclick handler */
  this.tabShow(defaultTab);

  /* If the user specified an onLoad function, call it now. */
  if (typeof this.onLoad == 'function') {
    this.onLoad({tabber:this});
  }

  return this;
};


tabberObj.prototype.navClick = function(event)
{
  /* This method should only be called by the onClick event of an <A>
     element, in which case we will determine which tab was clicked by
     examining a property that we previously attached to the <A>
     element.

     Since this was triggered from an onClick event, the variable
     "this" refers to the <A> element that triggered the onClick
     event (and not to the tabberObj).

     When tabberObj was initialized, we added some extra properties
     to the <A> element, for the purpose of retrieving them now. Get
     the tabberObj object, plus the tab number that was clicked.
  */

  var
  rVal, /* Return value from the user onclick function */
  a, /* element that triggered the onclick event */
  self, /* the tabber object */
  tabberIndex, /* index of the tab that triggered the event */
  onClickArgs; /* args to send the onclick function */

  a = this;
  if (!a.tabber) { return false; }

  self = a.tabber;
  tabberIndex = a.tabberIndex;

  /* Remove focus from the link because it looks ugly.
     I don't know if this is a good idea...
  */
  a.blur();

  /* If the user specified an onClick function, call it now.
     If the function returns false then do not continue.
  */
  if (typeof self.onClick == 'function') {

    onClickArgs = {'tabber':self, 'index':tabberIndex, 'event':event};

    /* IE uses a different way to access the event object */
    if (!event) { onClickArgs.event = window.event; }

    rVal = self.onClick(onClickArgs);
    if (rVal === false) { return false; }
  }

	self.tabShow(tabberIndex);
	
	return false;
};


tabberObj.prototype.tabHideAll = function()
{
  var i; /* counter */

  /* Hide all tabs and make all navigation links inactive */
  for (i = 0; i < this.tabs.length; i++) {
    this.tabHide(i);
  }
};


tabberObj.prototype.tabHide = function(tabberIndex)
{
  var div;

  if (!this.tabs[tabberIndex]) { return false; }

  /* Hide a single tab and make its navigation link inactive */
  div = this.tabs[tabberIndex].div;

  /* Hide the tab contents by adding classTabHide to the div */
  if (!div.className.match(this.REclassTabHide)) {
    div.className += ' ' + this.classTabHide;
  }
  this.navClearActive(tabberIndex);

  return this;
};


tabberObj.prototype.tabShow = function(tabberIndex)
{
  /* Show the tabberIndex tab and hide all the other tabs */

  var div;

  if (!this.tabs[tabberIndex]) { return false; }

  /* Hide all the tabs first */
  this.tabHideAll();

  /* Get the div that holds this tab */
  div = this.tabs[tabberIndex].div;

  /* Remove classTabHide from the div */
  div.className = div.className.replace(this.REclassTabHide, '');

  /* Mark this tab navigation link as "active" */
  this.navSetActive(tabberIndex);

  /* If the user specified an onTabDisplay function, call it now. */
  if (typeof this.onTabDisplay == 'function') {
    this.onTabDisplay({'tabber':this, 'index':tabberIndex});
  }

  return this;
};

tabberObj.prototype.navSetActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that only one nav item can be active at a time.
  */

  /* Set classNavActive for the navigation list item */
  this.tabs[tabberIndex].li.className = this.classNavActive;

  return this;
};


tabberObj.prototype.navClearActive = function(tabberIndex)
{
  /* Note: this method does *not* enforce the rule
     that one nav should always be active.
  */

  /* Remove classNavActive from the navigation list item */
  this.tabs[tabberIndex].li.className = '';

  return this;
};

/*
	Change l'onglet affiché par défaut
*/
function SwitchTab(tab_key)
{
	var tabberKey = null;
	
	switch(tab_key)
	{
		case key_tab_top:
		case key_tab_history:
		case key_tab_favorite:
			tabberKey = key_tabberSmileysParameters;
			break;
		case key_tab_settings:
		case key_tab_backup:
		case key_tab_yoursmileys:
			tabberKey = key_tabberConfigWindow;
			break;
	}
	
	// Obtention du système d'onglets
	
	// Onglets triptique {top, historique, favoris} de la page de réponse classique
	var tabber = document.getElementById(key_tabberSmileysPanel);
	
	if (tabber == null)
	{
		// Onglets de la fenêtre des paramètres
		tabber = document.getElementById(tabberKey);
	}
	
	for (var i = 0; i < tabber.tabber.tabs.length; i++)
	{
		if (tabber.tabber.tabs[i].id == tab_key)
		{
			tabber.tabber.tabShow(i);
			break;
		}
	}
}

/*
	Sauvegarde de l'onglet actuellement affiché
*/
function SaveCurrentShownTab(id)
{
	var configTab = false;
	var smileyTab = false;
	var smileyConfigTab = false;
	
	switch (id)
	{
		case key_tab_top:
		case key_tab_history:
		case key_tab_favorite:
			if (cmScript.isOpened)
			{
				smileyConfigTab = true;
			}
			else
			{
				smileyTab = true;
			}
			break;
		case key_tab_settings:
		case key_tab_backup:
		case key_tab_yoursmileys:
			configTab = true;
			break;
	}
	
	if (smileyTab)
	{
		sm_current_tab = id;
		GM_setValue(key_sm_current_tab, sm_current_tab);
	}
	else if (configTab)
	{
		sm_config_tab = id;
		GM_setValue(key_sm_config_tab, sm_config_tab);
	}
	else if (smileyConfigTab)
	{
		sm_config_smiley_tab = id;
		GM_setValue(key_sm_config_smiley_tab, sm_config_smiley_tab);
	}
}

/*==================================================*/

/*
	Création du système d'onglet
	
	tabberArgs : options des onglets
	
	rootDiv : élément racine à partir du quel chercher où placer le système d'onglets (ex : document)
*/
function InitTabSystem(tabberArgs, rootDiv)
{
	/* This function finds all DIV elements in the document where
	 class=tabber.classMain, then converts them to use the tabber
	 interface.
	 
	 tabberArgs = an object to send to "new tabber()"
	*/
	var tempObj, /* Temporary tabber object */
	divs, /* Array of all divs on the page */
	i; /* Loop index */
	
	if (!tabberArgs)
	{
		tabberArgs = {};
	}
	
	/* Create a tabber object so we can get the value of classMain */
	tempObj = new tabberObj(tabberArgs);
	
	/* Find all DIV elements in the document that have class=tabber */
	
	/* First get an array of all DIV elements and loop through them */
	divs = rootDiv.getElementsByTagName("div");
	
	for (i=0; i < divs.length; i++)
	{
		/* Is this DIV the correct class? */
		if (divs[i].className && divs[i].className.match(tempObj.REclassMain))
		{
			/* Now tabify the DIV */
			tabberArgs.div = divs[i];
			divs[i].tabber = new tabberObj(tabberArgs);
		}
	}
	
	return this;
}

/*
	Prépare le système d'onglets pour le panneau des smileys
*/
function InitTabSystem_ForFullAnswer()
{
	InitTabSystem(tabberOptions, document);
}

// =============================================================== //
// Fin script pour faire apparaitre des onglets
// =============================================================== //




// ================================================================ //
// Librairie de Toyonos pour charger une page web
// ================================================================ //
var toyoAjaxLib = (function()
{
	function loadPage(url, method, arguments, responseHandler)
	{
		var req;
		method = method.toUpperCase();
		if (method == 'GET' && arguments != null) url += '?' + arguments;

		req = new XMLHttpRequest();
		req.onreadystatechange = processReqChange(req, responseHandler);
		req.open(method, url, true);
		if (method == 'POST') req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		arguments = method == 'POST' ? arguments : null;
		req.send(arguments);
	}

	function processReqChange(req, responseHandler)
	{
		return function ()
		{
			try
			{
				// only if req shows "loaded"
				if (req.readyState == 4)
				{
					// only if "OK"
					if (req.status == 200)
					{
						var content = req.responseXML != null && req.responseXML.documentElement != null  ? req.responseXML.documentElement : req.responseText;
						if (responseHandler != null) responseHandler(content);
					}
					else
					{
						// Erreur de téléchargement
					}
				}
			}
			catch(e)
			{
				// Erreur de traitement
				GM_log("Erreur de traitement : " + e);
			}
		}
	}

	// Public members

	return {
		"loadDoc" : function(url, method, arguments, responseHandler)
		{
			try
			{
				loadPage(url, method, arguments, responseHandler);
			}
			catch(e)
			{
				// Erreur de téléchargement
				GM_log_error("Erreur de téléchargement : " + e);
			}
		}
	};
})();





Main(); // Exécution du script GreaseMonkey
