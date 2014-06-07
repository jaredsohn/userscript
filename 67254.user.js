// GMC Greasemonkey Extension
// Version 1.0
// January 25, 2010
// Copyright © 2010, Caleb Helbling
// --------------------------------------------------------------------
// LaTeX script courtesy of Steve Cheng.
// --------------------------------------------------------------------
// ==UserScript==
// @name          GMC Greasemonkey Extension
// @description   Provides Syntax Coloring, Youtube Videos, the old creations form, and LaTeX viewer
// @include       http://www.gmc.yoyogames.com/*
// @include       http://gmc.yoyogames.com/*
// ==/UserScript==

// CONFIG
var options = {};
options.syntax_coloring = true;
options.youtube = true;
options.old_forums = true;
options.latex = true;

// Set the color of the syntax coloring
// Possible options:
// GM8
// GM7
// CUSTOM
options.colors = {};
options.colors.color_style = 'GM8';

// All colors should be in hexadecimal
switch (options.colors.color_style) {
	// DEFINE YOUR CUSTOM COLORS HERE
	case 'CUSTOM':
		options.colors.functions = '';
		options.colors.variables = '';
		options.colors.constants = '';
		options.colors.logic = '';
		options.colors.comments = '';
		options.colors.numbers = '';
		options.colors.string = '';
	break;
	
	case 'GM8':
		options.colors.functions = '800000';
		options.colors.variables = '800000';
		options.colors.constants = '800000';
		options.colors.logic = '000080';
		options.colors.comments = '008000';
		options.colors.numbers = '0000ff';
		options.colors.string = '0000ff';
	break;
	
	case 'GM7':
		options.colors.functions = '000080';
		options.colors.variables = '0000ff';
		options.colors.constants = '800000';
		options.colors.logic = '000000';
		options.colors.comments = '008000';
		options.colors.numbers = '000000';
		options.colors.string = '000000';
	break;
}

var i, ii, iii, len;

// Get the main content wrapper
var wrapper = document.getElementById('ipbwrapper').getElementsByClassName('borderwrap')[0];

// Synchronous ajax function
function ajax(url) {
	var AJAX;
	if (window.XMLHttpRequest) {
		AJAX=new XMLHttpRequest();
	} else {
		AJAX=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (AJAX) {
		AJAX.open("GET", url, false);
		AJAX.send(null);
		return AJAX.responseText;
	} else {
		return false;
	}
}

function getUrlVars(url) {
	if (url === undefined) {
		url = window.location.href;
	}

	var map = {};
	url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		map[key] = value;
	});
	return map;
}

var get = getUrlVars();

function check_array(sub_array,data) {
	if (sub_array!==undefined && sub_array.length>0) {
		for (var b=0, len=sub_array.length; b<len; b++) {
			if (sub_array[b] === data) {
				return true;
			}
		}
	}
	
	return false;
}

function get_color(data) {
	if (data === "\n") {
		return '<br />';
	}

	if (check_array(functions[data.length],data)) {
		return '<span style="color:#'+options.colors.functions+';">'+data+'</span>';
	}
	
	if (check_array(variables[data.length],data)) {
		return '<span style="color:#'+options.colors.variables+';">'+data+'</span>';
	}
	
	if (check_array(constants[data.length],data)) {
		return '<span style="color:#'+options.colors.constants+';">'+data+'</span>';
	}
	
	if (check_array(logic[data.length],data)) {
		return '<span style="color:#'+options.colors.logic+';font-weight:bold;">'+data+'</span>';
	}
	
	// Check to see if it's a number
	if (data.match(/^[\-|\+]?[0-9]*\.?[0-9]+$/) !== null) {
		return '<span style="color:#'+options.colors.numbers+';">'+data+'</span>';
	}
	
	return data;
}

function chr(string) {
	return (String.fromCharCode(string));
}

if (options.syntax_coloring === true && get.showtopic !== undefined) {
	// Functions organized by length
	var functions = [[],[],["ln"],["abs","chr","cos","exp","max","min","ord","sin","sqr","tan"],["ceil","frac","log2","logn","max3","mean","min3","real","sign","sqrt"],["floor","log10","power","round","sleep"],["arccos","arcsin","arctan","choose","median","random","string"],["arctan2","cd_init","cd_play","cd_stop","d3d_end","irandom","is_real"],["cd_pause","cd_track","degtorad","file_eof","font_add","game_end","ini_open","io_clear","path_add","path_end","radtodeg","room_add","tile_add"],["action_if","cd_length","cd_number","cd_paused","cd_resume","d3d_start","disk_free","disk_size","draw_line","draw_path","draw_text","file_copy","file_eoln","font_name","game_load","game_save","get_color","ini_close","io_handle","is_string","load_info","move_snap","move_wrap","mplay_end","path_flip","path_name","randomize","room_goto","room_name","room_next","show_info","show_menu","show_text","sound_add","sound_pan","tile_find"],["cd_playing","cd_present","d3d_vertex","draw_arrow","draw_clear","draw_point","ds_map_add","event_user","file_close","get_string","make_color","motion_add","motion_set","mouse_wait","object_add","path_get_x","path_get_y","path_scale","path_shift","path_start","place_free","show_error","show_image","show_video","sound_fade","sound_loop","sound_name","sound_play","sound_stop","sprite_add","string_pos","tile_get_x","tile_get_y"],["MCI_command","action_font","action_move","action_path","action_snap","action_wrap","cd_position","d3d_set_fog","draw_button","draw_circle","draw_sprite","draw_vertex","ds_grid_add","ds_grid_get","ds_grid_set","ds_list_add","ds_map_copy","ds_map_read","ds_map_size","file_delete","file_exists","file_readln","file_rename","font_delete","font_exists","get_integer","lengthdir_x","lengthdir_y","merge_color","mouse_clear","move_bounce","move_random","move_random","object_name","path_append","path_assign","path_delete","path_exists","path_mirror","path_rotate","place_empty","room_assign","room_exists","screen_save","script_name","sprite_name","sprite_save","string_copy","tile_delete","tile_exists"],["action_color","action_sleep","action_sound","cd_open_door","date_date_of","date_get_day","date_inc_day","date_time_of","draw_ellipse","draw_surface","ds_grid_copy","ds_grid_read","ds_list_copy","ds_list_read","ds_list_size","ds_list_sort","ds_map_clear","ds_map_empty","ds_map_write","ds_stack_pop","ds_stack_top","effect_clear","execute_file","file_writeln","filename_dir","filename_ext","font_replace","game_restart","joystick_pov","message_size","move_contact","mp_grid_draw","mp_grid_path","path_reverse","random_range","room_restart","show_message","show_message","sound_delete","sound_exists","sound_volume","sprite_merge","string_count","string_lower","string_upper","string_width","surface_copy","surface_free","surface_save","tile_get_top","timeline_add","window_get_x","window_get_y"],["action_bounce","action_effect","cd_close_door","color_get_hue","color_get_red","d3d_draw_cone","d3d_draw_wall","d3d_set_depth","date_day_span","date_get_hour","date_get_week","date_get_year","date_inc_hour","date_inc_week","date_inc_year","date_is_today","display_reset","draw_getpixel","draw_set_font","draw_text_ext","draw_triangle","ds_grid_clear","ds_grid_width","ds_grid_write","ds_list_clear","ds_list_empty","ds_list_write","ds_map_create","ds_map_delete","ds_map_exists","ds_queue_copy","ds_queue_head","ds_queue_read","ds_queue_size","ds_queue_tail","ds_stack_copy","ds_stack_push","ds_stack_read","ds_stack_size","event_perform","execute_shell","external_call","external_free","file_bin_open","file_bin_seek","file_bin_size","file_text_eof","filename_name","filename_path","font_get_bold","font_get_last","font_get_name","font_get_size","get_directory","highscore_add","ini_read_real","instance_copy","instance_find","irandom_range","joystick_axes","joystick_name","joystick_rpos","joystick_upos","joystick_vpos","joystick_xpos","joystick_ypos","joystick_zpos","keyboard_wait","message_alpha","object_delete","object_exists","path_get_kind","path_get_name","path_set_kind","place_meeting","place_snapped","room_get_name","room_previous","room_set_code","room_set_view","room_tile_add","screen_redraw","script_exists","show_menu_pos","show_question","show_question","sound_discard","sound_replace","sound_restore","sprite_assign","sprite_delete","sprite_exists","string_delete","string_digits","string_format","string_height","string_insert","string_length","string_repeat","tile_get_left","timeline_name","window_center","window_handle"],["action_cd_play","action_cd_stop","action_if_dice","action_if_life","action_message","action_move_to","action_webpage","background_add","collision_line","color_get_blue","d3d_draw_block","d3d_draw_floor","d3d_model_cone","d3d_model_draw","d3d_model_load","d3d_model_save","d3d_model_wall","d3d_set_hidden","date_get_month","date_hour_span","date_inc_month","date_leap_year","date_week_span","date_year_span","draw_get_alpha","draw_get_color","draw_healthbar","draw_highscore","draw_rectangle","draw_roundrect","draw_set_alpha","draw_set_color","ds_grid_create","ds_grid_height","ds_grid_resize","ds_list_create","ds_list_delete","ds_list_insert","ds_map_destroy","ds_map_replace","ds_queue_clear","ds_queue_empty","ds_queue_write","ds_stack_clear","ds_stack_empty","ds_stack_write","execute_string","external_call0","external_call1","external_call2","external_call3","external_call4","external_call5","external_call6","external_call7","external_call8","file_bin_close","file_find_next","file_open_read","file_read_real","file_text_eoln","filename_drive","font_get_first","highscore_name","highscore_show","ini_key_delete","ini_key_exists","ini_write_real","instance_place","keyboard_check","keyboard_clear","make_color_hsv","make_color_rgb","message_button","mouse_wheel_up","mp_grid_create","mp_linear_path","mp_linear_step","mplay_init_ipx","part_type_life","part_type_size","part_type_step","path_add_point","path_duplicate","path_get_speed","point_distance","position_empty","room_duplicate","room_goto_next","room_set_width","screen_refresh","script_execute","sound_get_kind","sound_get_name","sound_stop_all","splash_set_top","sprite_replace","string_char_at","string_letters","string_replace","surface_create","surface_exists","texture_exists","tile_delete_at","tile_get_alpha","tile_get_blend","tile_get_depth","tile_get_width","tile_set_alpha","tile_set_blend","tile_set_depth","tile_set_scale","timeline_clear","window_default"],["action_cd_pause","action_end_game","action_if_empty","action_if_mouse","action_if_score","action_if_sound","action_path_end","action_set_life","action_snapshot","background_name","background_save","cd_set_position","cd_track_length","collision_point","color_get_green","color_get_value","d3d_model_block","d3d_model_clear","d3d_model_floor","d3d_set_culling","d3d_set_shading","date_get_minute","date_get_second","date_inc_minute","date_inc_second","date_month_span","date_valid_date","date_valid_time","display_set_all","draw_background","draw_line_color","draw_line_width","draw_set_halign","draw_set_valign","draw_sprite_ext","draw_text_color","ds_grid_destroy","ds_grid_get_max","ds_grid_get_min","ds_grid_get_sum","ds_grid_shuffle","ds_grid_value_x","ds_grid_value_y","ds_list_destroy","ds_list_replace","ds_list_shuffle","ds_priority_add","ds_queue_create","ds_stack_create","event_inherited","event_inherited","execute_program","external_define","file_attributes","file_find_close","file_find_first","file_open_write","file_text_close","file_write_real","font_add_sprite","font_get_italic","highscore_clear","highscore_value","ini_read_string","instance_change","instance_create","instance_exists","instance_number","instance_sprite","joystick_exists","message_caption","move_bounce_all","mp_grid_destroy","mplay_data_mode","mplay_data_read","mplay_ipaddress","mplay_player_id","object_get_mask","object_get_name","object_set_mask","parameter_count","part_type_alpha","part_type_blend","part_type_clear","part_type_color","part_type_death","part_type_scale","part_type_shape","part_type_speed","path_get_closed","path_get_length","path_get_number","path_set_closed","point_direction","position_change","random_get_seed","random_set_seed","registry_exists","room_set_height","room_tile_clear","script_get_name","script_get_text","sound_isplaying","splash_set_main","splash_set_size","splash_show_web","sprite_get_name","texture_preload","tile_get_height","tile_get_xscale","tile_get_yscale","tile_layer_find","tile_layer_hide","tile_layer_show","tile_set_region","timeline_delete","timeline_exists","window_set_size"],["action_cd_resume","action_draw_life","action_draw_line","action_draw_text","action_end_sound","action_if_health","action_if_number","action_if_object","action_inherited","action_load_game","action_next_room","action_save_game","action_set_alarm","action_set_score","action_show_info","collision_circle","d3d_light_enable","d3d_model_create","d3d_model_vertex","d3d_set_lighting","d3d_vertex_color","date_create_date","date_create_time","date_date_string","date_get_weekday","date_minute_span","date_second_span","date_time_string","directory_create","directory_exists","display_set_size","display_test_all","draw_clear_alpha","draw_point_color","draw_sprite_part","draw_surface_ext","ds_grid_add_disk","ds_grid_get_mean","ds_grid_multiply","ds_grid_set_disk","ds_map_find_last","ds_map_find_next","ds_priority_copy","ds_priority_read","ds_priority_size","ds_queue_dequeue","ds_queue_destroy","ds_queue_enqueue","ds_set_precision","ds_stack_destroy","external_define0","external_define1","external_define2","external_define3","external_define4","external_define5","external_define6","external_define7","external_define8","file_bin_rewrite","file_open_append","file_read_string","file_text_readln","ini_write_string","instance_destroy","instance_nearest","joystick_buttons","joystick_has_pov","keyboard_get_map","keyboard_set_map","message_position","mouse_wheel_down","move_contact_all","move_outside_all","mp_grid_add_cell","mplay_data_write","mplay_init_modem","mplay_init_tcpip","mplay_message_id","object_event_add","object_get_depth","object_get_solid","object_set_depth","object_set_solid","parameter_string","part_type_alpha1","part_type_alpha2","part_type_alpha3","part_type_color1","part_type_color2","part_type_color3","part_type_create","part_type_exists","part_type_sprite","path_get_point_x","path_get_point_y","position_destroy","position_meeting","room_set_caption","screen_save_part","show_message_ext","sound_effect_set","splash_set_adapt","splash_set_color","splash_set_scale","splash_show_text","sprite_duplicate","sprite_get_width","string_width_ext","surface_getpixel","tile_get_visible","tile_layer_depth","tile_layer_shift","tile_set_visible","window_get_color","window_get_width","window_mouse_set","window_set_color"],["action_cd_playing","action_cd_present","action_draw_arrow","action_draw_score","action_fullscreen","action_if_aligned","action_move_point","action_move_start","action_path_speed","action_set_cursor","action_set_health","action_set_hspeed","action_set_motion","action_set_vspeed","action_show_video","action_splash_web","action_sprite_set","background_assign","background_delete","background_exists","cd_track_position","collision_ellipse","d3d_draw_cylinder","d3d_model_destroy","d3d_primitive_end","d3d_vertex_normal","date_compare_date","date_compare_time","date_current_date","date_current_time","date_days_in_year","display_get_width","display_mouse_set","distance_to_point","draw_circle_color","draw_sprite_tiled","draw_surface_part","draw_vertex_color","ds_map_find_first","ds_map_find_value","ds_priority_clear","ds_priority_empty","ds_priority_write","file_bin_position","file_text_writeln","file_write_string","font_get_fontname","get_directory_alt","get_open_filename","get_save_filename","instance_furthest","instance_position","message_text_font","move_bounce_solid","mp_grid_clear_all","mp_potential_path","mp_potential_step","mplay_init_serial","mplay_player_find","mplay_player_name","mplay_session_end","object_get_parent","object_get_sprite","object_set_parent","object_set_sprite","part_changer_kind","part_system_clear","part_system_depth","part_type_destroy","part_type_gravity","path_change_point","path_clear_points","path_delete_point","path_insert_point","registry_set_root","room_instance_add","room_tile_add_ext","screen_wait_vsync","sound_effect_echo","sound_get_preload","splash_set_border","splash_set_cursor","splash_show_image","splash_show_video","sprite_add_sprite","sprite_get_height","sprite_get_number","sprite_save_strip","sprite_set_offset","string_height_ext","surface_copy_part","surface_get_width","surface_save_part","texture_get_width","tile_layer_delete","tile_set_position","timeline_get_name","transition_define","transition_exists","window_get_cursor","window_get_height","window_set_cursor"],["action_draw_health","action_draw_sprite","action_if_question","action_if_variable","action_kill_object","action_linear_step","action_move_random","action_set_caption","action_set_gravity","action_splash_text","background_replace","clipboard_get_text","clipboard_has_text","clipboard_set_text","d3d_draw_ellipsoid","d3d_model_cylinder","d3d_set_projection","d3d_vertex_texture","date_days_in_month","display_get_height","distance_to_object","draw_ellipse_color","draw_primitive_end","draw_surface_tiled","ds_grid_add_region","ds_grid_set_region","ds_list_find_index","ds_list_find_value","ds_priority_create","file_bin_read_byte","highscore_set_font","highscore_show_ext","ini_section_delete","ini_section_exists","joystick_direction","keyboard_key_press","keyboard_unset_map","message_background","message_input_font","mouse_check_button","move_contact_solid","move_outside_solid","move_towards_point","mp_grid_clear_cell","mplay_message_name","mplay_message_send","mplay_session_find","mplay_session_join","mplay_session_mode","mplay_session_name","object_event_clear","object_get_visible","object_is_ancestor","object_set_visible","part_changer_clear","part_changer_types","part_emitter_burst","part_emitter_clear","part_system_create","part_system_drawit","part_system_exists","part_system_update","path_get_precision","path_set_precision","registry_read_real","room_goto_previous","set_automatic_draw","show_debug_message","splash_set_caption","sprite_get_texture","sprite_get_xoffset","sprite_get_yoffset","string_replace_all","surface_get_height","surface_set_target","texture_get_height","texture_set_repeat","variable_local_get","variable_local_set","window_get_caption","window_get_visible","window_mouse_get_x","window_mouse_get_y","window_set_caption","window_set_visible"],["action_another_room","action_current_room","action_draw_ellipse","action_if_collision","action_if_next_room","action_move_contact","action_restart_game","action_reverse_xdir","action_reverse_ydir","action_set_friction","action_set_timeline","action_splash_image","action_splash_video","action_sprite_color","action_timeline_set","background_get_name","collision_rectangle","d3d_model_ellipsoid","d3d_primitive_begin","d3d_set_perspective","date_valid_datetime","display_mouse_get_x","display_mouse_get_y","draw_background_ext","draw_set_blend_mode","draw_sprite_general","draw_text_ext_color","draw_triangle_color","draw_vertex_texture","ds_priority_destroy","effect_create_above","effect_create_below","export_include_file","file_bin_write_byte","file_text_open_read","file_text_read_real","filename_change_ext","font_replace_sprite","message_button_font","message_input_color","message_mouse_color","mplay_message_clear","mplay_message_count","mplay_message_value","part_changer_create","part_changer_exists","part_changer_region","part_deflector_kind","part_emitter_create","part_emitter_exists","part_emitter_region","part_emitter_stream","part_system_destroy","part_type_color_hsv","part_type_color_mix","part_type_color_rgb","part_type_direction","registry_exists_ext","registry_write_real","room_instance_clear","room_set_background","room_set_persistent","set_synchronization","sound_effect_chorus","sound_effect_gargle","sound_effect_reverb","sound_global_volume","splash_set_position","splash_set_stop_key","sprite_get_bbox_top","surface_get_texture","tile_get_background","tile_set_background","timeline_moment_add","variable_global_get","variable_global_set","window_get_sizeable","window_set_position","window_set_sizeable"],["action_change_object","action_create_object","action_draw_variable","action_kill_position","action_parttype_life","action_path_position","action_previous_room","action_replace_sound","action_timeline_stop","background_duplicate","background_get_width","color_get_saturation","date_create_datetime","date_datetime_string","date_get_day_of_year","discard_include_file","draw_background_part","draw_primitive_begin","draw_rectangle_color","draw_roundrect_color","draw_sprite_part_ext","draw_surface_general","ds_grid_get_disk_max","ds_grid_get_disk_min","ds_grid_get_disk_sum","ds_grid_value_disk_x","ds_grid_value_disk_y","ds_grid_value_exists","ds_map_find_previous","ds_priority_find_max","ds_priority_find_min","event_perform_object","file_text_open_write","file_text_write_real","highscore_set_border","highscore_set_colors","keyboard_get_numlock","keyboard_key_release","keyboard_set_numlock","mplay_connect_status","mplay_message_player","mplay_session_create","mplay_session_status","part_attractor_clear","part_attractor_force","part_changer_destroy","part_deflector_clear","part_destroyer_clear","part_emitter_destroy","part_particles_clear","part_particles_count","part_system_position","path_get_point_speed","registry_read_string","set_program_priority","sound_effect_flanger","splash_set_interrupt","sprite_get_bbox_left","string_lettersdigits","surface_reset_target","texture_set_blending","texture_set_priority","tile_layer_delete_at","window_get_showicons","window_get_stayontop","window_set_rectangle","window_set_showicons","window_set_stayontop"],["action_draw_rectangle","action_execute_script","action_highscore_show","action_partemit_burst","action_partsyst_clear","action_parttype_color","action_parttype_speed","action_potential_step","action_replace_sprite","action_timeline_pause","action_timeline_start","background_get_height","cd_set_track_position","date_compare_datetime","date_current_datetime","date_get_hour_of_year","display_get_frequency","display_set_frequency","draw_background_tiled","draw_line_width_color","draw_sprite_stretched","draw_sprite_tiled_ext","draw_surface_part_ext","draw_text_transformed","ds_grid_get_disk_mean","ds_grid_multiply_disk","file_text_open_append","file_text_read_string","highscore_add_current","highscore_set_strings","instance_activate_all","joystick_check_button","keyboard_check_direct","mp_grid_add_instances","mp_grid_add_rectangle","mp_linear_path_object","mp_linear_step_object","mp_potential_settings","mplay_message_receive","object_get_persistent","object_set_persistent","part_attractor_create","part_attractor_exists","part_deflector_create","part_deflector_exists","part_deflector_region","part_destroyer_create","part_destroyer_exists","part_destroyer_region","part_particles_create","part_type_orientation","registry_write_string","room_set_view_enabled","set_application_title","splash_set_fullscreen","splash_set_stop_mouse","sprite_collision_mask","sprite_get_bbox_right","sprite_replace_sprite","timeline_moment_clear","variable_local_exists","window_get_fullscreen","window_get_showborder","window_set_fullscreen","window_set_showborder","window_view_mouse_set"],["action_draw_background","action_highscore_clear","action_partemit_create","action_partemit_stream","action_partsyst_create","action_parttype_create","action_splash_settings","background_get_texture","d3d_light_define_point","d3d_model_vertex_color","d3d_set_projection_ext","display_get_colordepth","display_set_colordepth","draw_surface_stretched","draw_surface_tiled_ext","ds_priority_delete_max","ds_priority_delete_min","file_text_write_string","keyboard_check_pressed","part_attractor_destroy","part_deflector_destroy","part_destroyer_destroy","part_system_draw_order","registry_read_real_ext","sound_background_tempo","sound_effect_equalizer","sprite_add_from_screen","sprite_get_bbox_bottom","variable_global_exists","window_set_region_size","window_views_mouse_set"],["action_draw_life_images","action_if_previous_room","action_partemit_destroy","action_partsyst_destroy","action_parttype_gravity","action_sprite_transform","background_create_color","d3d_model_primitive_end","d3d_model_vertex_normal","d3d_transform_stack_pop","d3d_transform_stack_top","d3d_vertex_normal_color","date_get_minute_of_year","date_get_second_of_year","draw_background_general","draw_set_blend_mode_ext","ds_grid_add_grid_region","ds_grid_multiply_region","ds_grid_set_grid_region","instance_deactivate_all","keyboard_check_released","mp_grid_clear_rectangle","part_attractor_position","part_deflector_friction","registry_write_real_ext","sound_3d_set_sound_cone","sound_effect_compressor","splash_set_close_button","sprite_add_from_surface","window_get_region_scale","window_get_region_width","window_set_region_scale","window_view_mouse_get_x","window_view_mouse_get_y"],["action_draw_gradient_hor","d3d_model_vertex_texture","d3d_set_projection_ortho","d3d_transform_stack_push","d3d_vertex_texture_color","draw_background_part_ext","ds_priority_delete_value","environment_get_variable","highscore_set_background","instance_activate_object","instance_activate_region","mp_potential_path_object","mp_potential_step_object","part_changer_destroy_all","part_emitter_destroy_all","registry_read_string_ext","variable_local_array_get","variable_local_array_set","window_get_region_height","window_views_mouse_get_x","window_views_mouse_get_y"],["action_draw_gradient_vert","action_parttype_secondary","action_replace_background","action_set_timeline_speed","background_add_background","d3d_model_primitive_begin","d3d_transform_add_scaling","d3d_transform_set_scaling","d3d_transform_stack_clear","d3d_transform_stack_empty","d3d_vertex_normal_texture","draw_background_stretched","draw_background_tiled_ext","draw_set_circle_precision","draw_sprite_stretched_ext","draw_text_ext_transformed","draw_vertex_texture_color","ds_grid_value_disk_exists","ds_priority_find_priority","registry_write_string_ext","room_set_background_color","sprite_create_from_screen","texture_set_interpolation","variable_global_array_get","variable_global_array_set","variable_local_array2_get","variable_local_array2_set"],["background_create_gradient","d3d_light_define_direction","d3d_transform_set_identity","draw_surface_stretched_ext","instance_deactivate_object","instance_deactivate_region","mouse_check_button_pressed","part_attractor_destroy_all","part_deflector_destroy_all","part_destroyer_destroy_all","part_system_automatic_draw","sound_set_search_directory","sprite_create_from_surface","variable_global_array2_get","variable_global_array2_set"],["action_create_object_motion","action_create_object_random","d3d_primitive_begin_texture","d3d_transform_stack_discard","draw_text_transformed_color","ds_priority_change_priority","mouse_check_button_released","part_particles_create_color","sound_3d_set_sound_distance","sound_3d_set_sound_position","sound_3d_set_sound_velocity"],["action_draw_ellipse_gradient","action_draw_text_transformed","action_set_timeline_position","d3d_transform_add_rotation_x","d3d_transform_add_rotation_y","d3d_transform_add_rotation_z","d3d_transform_set_rotation_x","d3d_transform_set_rotation_y","d3d_transform_set_rotation_z","draw_primitive_begin_texture","ds_grid_multiply_grid_region","export_include_file_location","part_system_automatic_update","sprite_set_alpha_from_sprite"],["background_create_from_screen","background_replace_background","d3d_model_vertex_normal_color","d3d_transform_add_translation","d3d_transform_set_translation","draw_background_stretched_ext","mplay_message_send_guaranteed"],["background_create_from_surface","d3d_model_vertex_texture_color","d3d_set_projection_perspective"],["d3d_model_vertex_normal_texture","d3d_transform_add_rotation_axis","d3d_transform_set_rotation_axis","d3d_vertex_normal_texture_color","draw_text_ext_transformed_color"],[],[],[],[],["background_set_alpha_from_background"],["d3d_model_vertex_normal_texture_color"]];
	
	// Variables organized by length
	var variables = [[],["x","y"],["id"],["fps"],["room"],["lives","score","alarm","depth","solid","speed"],["health","hspeed","vspeed","xstart","ystart"],["game_id","mouse_x","mouse_y","gravity","visible"],["argument","bbox_top","friction"],["argument0","argument1","argument2","argument3","argument4","argument5","argument6","argument7","argument8","argument9","room_last","bbox_left","direction","xprevious","yprevious"],["argument10","argument11","argument12","argument13","argument14","argument15","debug_mode","error_last","event_type","room_first","room_speed","room_width","show_lives","show_score","view_angle","view_hport","view_hview","view_wport","view_wview","view_xport","view_xview","view_yport","view_yview","bbox_right","mask_index","path_index","path_scale","path_speed","persistent"],["current_day","instance_id","room_height","secure_mode","show_health","view_hspeed","view_object","view_vspeed","bbox_bottom","image_alpha","image_angle","image_blend","image_index","image_speed"],["background_x","background_y","current_hour","current_time","current_year","event_action","event_number","event_object","keyboard_key","mouse_button","room_caption","view_current","view_enabled","view_hborder","view_vborder","view_visible","image_number","image_single","image_xscale","image_yscale","object_index","sprite_index","sprite_width"],["caption_lives","caption_score","current_month","cursor_sprite","gamemaker_pro","path_position","sprite_height","timeline_loop"],["caption_health","current_minute","current_second","error_occurred","instance_count","temp_directory","path_endaction","sprite_xoffset","sprite_yoffset","timeline_index","timeline_speed"],["current_weekday","keyboard_string","room_persistent","transition_kind"],["background_alpha","background_blend","background_color","background_index","background_width","keyboard_lastkey","mouse_lastbutton","transition_color","transition_steps","path_orientation","timeline_running"],["argument_relative","background_height","background_hspeed","background_htiled","background_vspeed","background_vtiled","background_xscale","background_yscale","gamemaker_version","keyboard_lastchar","program_directory","working_directory","gravity_direction","timeline_position"],["background_visible"],[],["background_showcolor","gamemaker_registered"],["background_foreground","path_positionprevious"]];
	
	// Constants organized by length
	var constants = [[],[],["pi"],[],["true"],["c_red","cr_no","false","vk_f1","vk_f2","vk_f3","vk_f4","vk_f5","vk_f6","vk_f7","vk_f8","vk_f9","vk_up"],["bm_add","bm_max","bm_one","c_aqua","c_blue","c_gray","c_lime","c_navy","c_teal","fa_top","mb_any","vk_add","vk_alt","vk_end","vk_f10","vk_f11","vk_f12","vk_tab"],["bm_zero","c_black","c_green","c_olive","c_white","cr_beam","cr_drag","cr_help","cr_none","ef_rain","ef_ring","ef_snow","ef_star","ev_draw","ev_step","fa_left","mb_left","mb_none","se_echo","se_none","ty_real","vk_down","vk_home","vk_lalt","vk_left","vk_ralt"],["c_dkgray","c_ltgray","c_maroon","c_orange","c_purple","c_silver","c_yellow","cr_arrow","cr_cross","ef_cloud","ef_flare","ef_smoke","ef_spark","ev_alarm","ev_mouse","ev_other","ev_user0","ev_user1","ev_user2","ev_user3","ev_user4","ev_user5","ev_user6","ev_user7","ev_user8","ev_user9","fa_right","mb_right","vk_enter","vk_nokey","vk_pause","vk_right","vk_shift","vk_space"],["bm_normal","c_fuchsia","cr_arrrow","cr_hsplit","cr_nodrop","cr_vsplit","dll_cdecl","ev_create","ev_user10","ev_user11","ev_user12","ev_user13","ev_user14","ev_user15","fa_bottom","fa_center","fa_hidden","fa_middle","mb_middle","se_chorus","se_gargle","se_reverb","ty_string","vk_anykey","vk_delete","vk_divide","vk_escape","vk_insert","vk_lshift","vk_pageup","vk_return","vk_rshift"],["cr_default","cr_size_ns","cr_size_we","cr_sqlwait","cr_uparrow","ef_ellipse","ef_smokeup","ev_destroy","ev_outside","ev_trigger","fa_archive","fa_sysfile","se_flanger","vk_control","vk_decimal","vk_numpad0","vk_numpad1","vk_numpad2","vk_numpad3","vk_numpad4","vk_numpad5","vk_numpad6","vk_numpad7","vk_numpad8","vk_numpad9"],["bm_subtract","cr_appstart","cr_size_all","dll_stdcall","ef_firework","ev_boundary","ev_game_end","ev_keyboard","ev_keypress","ev_room_end","ev_step_end","fa_readonly","fa_volumeid","pr_linelist","vk_lcontrol","vk_multiply","vk_pagedown","vk_rcontrol","vk_subtract"],["bm_src_alpha","bm_src_color","cr_handpoint","cr_hourglass","cr_multidrag","cr_size_nesw","cr_size_nwse","ef_explosion","ev_collision","ev_no_button","fa_directory","pr_linestrip","pr_pointlist","se_equalizer","vk_backspace"],["bm_dest_alpha","bm_dest_color","ev_game_start","ev_keyrelease","ev_left_press","ev_room_start","ev_step_begin","ps_change_all","ps_shape_line","pt_shape_disk","pt_shape_line","pt_shape_ring","pt_shape_snow","pt_shape_star","se_compressor"],["ev_end_of_path","ev_left_button","ev_mouse_enter","ev_mouse_leave","ev_right_press","ev_step_normal","pr_trianglefan","pt_shape_cloud","pt_shape_flare","pt_shape_pixel","pt_shape_smoke","pt_shape_spark","vk_printscreen"],["ev_close_button","ev_global_press","ev_joystick1_up","ev_joystick2_up","ev_left_release","ev_middle_press","ev_right_button","pr_trianglelist","ps_change_shape","ps_distr_linear","ps_force_linear","pt_shape_circle","pt_shape_sphere","pt_shape_square"],["bm_inv_src_alpha","bm_inv_src_color","bm_src_alpha_sat","ev_animation_end","ev_middle_button","ev_no_more_lives","ev_right_release","pr_trianglestrip","ps_change_motion","ps_shape_diamond","ps_shape_ellipse"],["bm_inv_dest_alpha","bm_inv_dest_color","ev_global_release","ev_joystick1_down","ev_joystick1_left","ev_joystick2_down","ev_joystick2_left","ev_middle_release","ev_mouse_wheel_up","ev_no_more_health","ps_distr_gaussian","ps_force_constant"],["ev_joystick1_right","ev_joystick2_right","ps_force_quadratic","ps_shape_rectangle","pt_shape_explosion"],["ev_mouse_wheel_down","ps_deflect_vertical"],["ev_global_left_press","ev_joystick1_button1","ev_joystick1_button2","ev_joystick1_button3","ev_joystick1_button4","ev_joystick1_button5","ev_joystick1_button6","ev_joystick1_button7","ev_joystick1_button8","ev_joystick2_button1","ev_joystick2_button2","ev_joystick2_button3","ev_joystick2_button4","ev_joystick2_button5","ev_joystick2_button6","ev_joystick2_button7","ev_joystick2_button8","ps_distr_invgaussian"],["ev_global_left_button","ev_global_right_press","ps_deflect_horizontal"],["ev_global_left_release","ev_global_middle_press","ev_global_right_button"],["ev_global_middle_button","ev_global_right_release"],["ev_global_middle_release"]];
	
	// Logic organized by length
	var logic = [[],["{","}"],["if","or","do"],["and","for","not","end","xor","mod","div","var","all"],["else","case","with","self","exit","then"],["while","local","until","begin","break","other","noone"],["global","repeat","return","switch"],["default"],["continue"]];
	
	var tokens = ["$"," ",".","(",")","\n",";",",",'>','<',"=","+","-","*","/","[","]","{","}",":","!","^","&","|","~",'"',"'",chr(160),chr(2)];
	
	var codeboxes = document.getElementsByClassName('codemain');
	
	var is_rich_text = false;
	var rich_text = document.getElementById('ed-0_wysiwyg_used');
	if (rich_text !== null) {
		if (rich_text.getAttribute('value')==1) {
			is_rich_text = true;
		}
	}
	
	if (is_rich_text === false) {
		for (i=0; i < codeboxes.length; i++) {
			// Get the current code section
			var this_code_box = codeboxes[i];
			var code_box_data = this_code_box.innerHTML;
			code_box_data = code_box_data.replace(/<br>/gi,"\n");
			code_box_data = code_box_data.replace(/<br \/>/gi,"\n");
			code_box_data = code_box_data.replace(/<br\/>/gi,"\n");
			code_box_data = code_box_data.replace(/&nbsp;/gi,chr(160));
			code_box_data = code_box_data.replace(/&amp;/gi,"&");
			code_box_data = code_box_data.replace(/ /g,chr(160));
			code_box_data = code_box_data.replace(/&gt;/gi,'>');
			code_box_data = code_box_data.replace(/&lt;/gi,'<');
			code_box_data = code_box_data.replace(/<!--.*?-->/gi,'');
			
			// Stop the annoying codebox scrollbars and set some other css
			this_code_box.setAttribute('style','overflow:auto;color:black;background-color:#FFF;line-height:17px;font-size:13px;font-family:\'Courier New\'');
			
			// The seperator character is used to make sure tokens are also outputted in the explosion
			var seperator = chr(6);
			var reg;
			for (ii=0, len=tokens.length; ii<len; ii++) {
				reg = new RegExp("\\"+tokens[ii],'g');
				code_box_data = code_box_data.replace(reg,seperator+tokens[ii]+seperator);
			}
			
			// Get rid of superfluous seperators
			code_box_data = code_box_data.replace(new RegExp(seperator+seperator,'g'),seperator);
			
			// Explode the code into an array
			var code = code_box_data.split(seperator);
			
			var comSingle = false;
			var comMulti = false;
			var stringD = false;
			var stringS = false;
			var result='';
			
			for (ii=0, len=code.length; ii<len; ii++) {
				if (code[ii] === '>') {
					code[ii] = '&gt;';
				} else if (code[ii] === '<') {
					code[ii] = '&lt;';
				}
			
				// Check if we're currently in a special code section
				if (comSingle === false && comMulti === false && stringD === false && stringS === false) {
					// Check if a comment is being started
					if (code[ii] === '/') {
						// Grab the next piece
						var next = code[ii+1];
						
						// Single line
						if (next === '/') {
							comSingle = true;
							result += '<span style="color:#'+options.colors.comments+';font-style:italic;">'+'//';
							ii++;
						// Multiline
						} else if (next === '*') {
							comMulti = true;
							result += '<span style="color:#'+options.colors.comments+';font-style:italic;">'+'/*';
							ii++;
						} else {
						// None
							result += get_color(code[ii]);
						}
					// Check for " string
					} else if (code[ii] === '"') {
						stringD = true;
						result += '<span style="color:#'+options.colors.string+';">"';
					// Check for ' string
					} else if (code[ii] === "'") {
						stringS = true;
						result += '<span style="color:#'+options.colors.string+';">\'';
					// Finally, check everything else
					} else {
						result += get_color(code[ii]);
					}
				} else {
					// Check to end a special code section
					
					// Check to end a single line comment
					if (comSingle === true && code[ii] === "\n") {
						comSingle = false;
						result += "<br /></span>";
					// Check to end a multiline comment
					} else if (comMulti === true && code[ii] === '*' && code[ii+1] === '/') {
						comMulti = false;
						result += '*/</span>';
						ii++;
					// Check to end a " string
					} else if (stringD === true && code[ii] === '"') {
						stringD = false;
						result += '"</span>';
					// Check to end a ' string
					} else if (stringS === true && code[ii] === "'") {
						stringS = false;
						result += "'</span>";
					// The special code section has not ended, so add in the stuff without special coloring
					} else {
						if (code[ii] === "\n") {
							result += '<br />';
						} else {
							result += code[ii];
						}
					}
				}
			}
			
			this_code_box.innerHTML = result;
		}
	}
}

// Begin Youtube video

if (options.youtube && get.showtopic !== undefined) {

// Get only the posts
var posts = document.getElementsByClassName('postcolor');

// Loop through the posts
for (i=0; i <posts.length; i++) {
	
	// In each post, get all the links
	var links = posts[i].getElementsByTagName('a');
	for (ii=0; ii < links.length; ii++) {
		// Set the current link we're looking at right now
		var thisLink = links[ii];
		
		// Grab the link location
		var thisHref = thisLink.href;
		
		// Get the variables stored in the youtube url
		var getYt = getUrlVars(thisHref);
		if (getYt.v !== undefined) {			
			thisLink.innerHTML = '<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/'+getYt.v+'&hl=en_US&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'+getYt.v+'&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>';
		}
	}
}

}


// Begin creation form generator
function getMonth(data) {
	var month = {};
	month.January = 0;
	month.February = 1;
	month.March = 2;
	month.April = 3;
	month.May = 4;
	month.June = 5;
	month.July = 6;
	month.August = 7;
	month.September = 8;
	month.October = 9;
	month.November = 10;
	month.December = 11;
	
	return month[data];
}

function sortMultiDimensional(a,b) {
    // this sorts the array using the first element
    return ((a[0] > b[0]) ? -1 : ((a[0] < b[0]) ? 1 : 0));
}

if (options.old_forums) {

// If we're at the main index, inject some html to show a link to the "forum"
if (get.showforum === undefined && get.showtopic === undefined && (get.act === 'idx' || get.act === undefined)) {
	var new_tr = document.createElement('tr');
	var tbody = document.getElementById('fo_25').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
	var this_tr = tbody.insertBefore(new_tr,tbody.getElementsByTagName('tr')[1]);
	
	this_tr.innerHTML = '<td class="row1"><img border="0" alt="New Posts" src="style_images/chronicpro/bf_new.gif"/></td><td colspan="4" class="row2"><b><a href="http://gmc.yoyogames.com/index.php?showforum=999">All Creations</a></b><br /><span class="forumdesc">View all topics in a single forum</span></td>';
} else if (get.showforum === '999') {
	// Change the document title
	document.title = 'All Creations';
	
	// Get the navstrip element and change it
	var navstrip = document.getElementById('navstrip');
	navstrip.innerHTML = navstrip.innerHTML + ' > <a href="http://gmc.yoyogames.com/index.php?showforum=25">Games</a> > <a href="http://gmc.yoyogames.com/index.php?showforum=999">All Creations</a>';
	
	// Inject in the table used in the forums
	wrapper.innerHTML = '<div class="maintitle"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td width="99%"><div>All Creations</div></td><td width="1%" nowrap="nowrap" align="right"><div id="forummenu-options" class="popmenubutton" style="cursor: pointer;"><a href="#forumoptions">Forum Options</a> <img border="0" title="Open Menu" alt="V" src="style_images/chronicpro/menu_action_down.gif"/></div><div style="display: none; z-index: 100; position: absolute; left: 0px; top: 0px;" id="forummenu-options_menu" class="popupmenu"><div class="popupmenu-item"><img border="0" style="vertical-align: middle;" alt="V" src="style_images/chronicpro/menu_item.gif"/> <a href="http://gmc.yoyogames.com/index.php?act=Login&amp;CODE=04&amp;f=44&amp;fromforum=44">Mark forum as read and return</a></div><div class="popupmenu-item"><img border="0" style="vertical-align: middle;" alt="V" src="style_images/chronicpro/menu_item.gif"/> <a href="http://gmc.yoyogames.com/index.php?act=Login&amp;CODE=04&amp;f=44&amp;fromforum=0">Mark forum as read and return to board index</a></div><div class="popupmenu-item-last"><img border="0" style="vertical-align: middle;" alt="V" src="style_images/chronicpro/menu_item.gif"/> <a href="http://gmc.yoyogames.com/index.php?act=usercp&amp;CODE=start_subs&amp;method=forum&amp;fid=44">Subscribe to this forum</a></div></div></td></tr></tbody></table></div><table cellspacing="0" class="ipbtable"><tbody><tr> <th align="center"> </th><th align="center"> </th><th width="50%" nowrap="nowrap">Topic Title</th><th width="7%" nowrap="nowrap" style="text-align: center;">Replies</th><th width="14%" nowrap="nowrap" style="text-align: center;">Topic Starter</th><th width="7%" nowrap="nowrap" style="text-align: center;">Views</th><th width="22%" nowrap="nowrap">Last Action</th></tr></tbody></table>';
	
	// Get the table to inject our rows into
	var games_table = wrapper.getElementsByTagName('table')[1].getElementsByTagName('tbody')[0];
	
	var topics = [];
	
	// Loop through all the game maker creation forums
	for (i=44; i<=51; i++) {
		// Grab the correct forum
		var data = ajax('/index.php?showforum='+i);
		
		// Get rid of the line breaks to work with future regular expressions
		data = data.replace(/\n/g,"").replace(/\r/g,"");
		
		// Get all the topics
		data = data.match(/<!-- Begin Topic Entry .*?<!-- End Topic Entry [0-9]* -->/g);
		
		// Loop through all the topics
		for (ii=0; ii<data.length; ii++) {
			var topic_row = data[ii];
			topic_row = topic_row.replace(/<tr>/gi,'');
			topic_row = topic_row.replace(/<tr \/>/gi,'');
			
			// Get the date info from the topic
			var dateInfo = topic_row.match(/<span class="lastaction">.*?<br \/>/)[0];
			
			var date = new Date();
			
			if (dateInfo.indexOf('Today') !== -1) {
				// Set the current day, year, and month to the user's local machine
				date.setDate(date.getDate());
			} else if (dateInfo.indexOf('Yesterday') !== -1) {
				// Set yesterday day, year, and month to the user's local machine
				date.setDate(date.getDate()-1);
			} else {
				// Extract the day, year, and month from the topic info
				var year = dateInfo.match(/[0-9]{4}/)[0];
				year = parseInt(year,10);
				
				var day = dateInfo.match(/[0-9]{1,2}[a-z]{2}/)[0];
				day = day.match(/[0-9]{1,2}/)[0];
				day = parseInt(day,10);
				
				var month = dateInfo.match(/[A-Z]{1}[a-z]+/)[0];
				month = getMonth(month);
				
				date.setFullYear(year,month,day);
			}
			
			// Time stores the hours and minutes
			var time = dateInfo.match(/[0-9]{2}:[0-9]{2}/)[0];
			time = time.match(/[0-9]{2}/g);
			
			var hour = parseInt(time[0],10);
			
			var minute = parseInt(time[1],10);
			
			// xm stores PM or AM
			var xm = dateInfo.match(/[A|P]{1}M/)[0];
			
			// If it's PM, add 12 hours (because javascript uses the 24 hour system)
			if (xm === 'PM') {
				hour += 12;
			}
			
			// Set the hours and minutes to the date object
			date.setHours(hour,minute,0,0);
			
			// Build the unix timestamp
			var unix_time = Math.floor(date.getTime()/1000);
			
			// Add the timestamp and topic data to the topic array
			topics.push([unix_time,topic_row]);
		}
	}
	
	// Sort the topic array based on the timestamp
	topics.sort(sortMultiDimensional);
	
	var this_class = 1;
	var this_display = 'table-row';
	
	// Loop through the topic array and add it to the page
	for (i=0; i<topics.length; i++) {
		if (((i % 30) === 0) && (i !== 0)) {
			this_class += 1;
			this_display = 'none';
		}
		
		var newElem = document.createElement('tr');
		
		var topicElem = games_table.appendChild(newElem);
		
		topicElem.innerHTML = topics[i][1];
		topicElem.setAttribute('class',this_class);
		topicElem.style.display = this_display;
	}
}

if (get.showforum === '999') {
	// The key is located at the bottom of the page and gives definitions of the icons
	key = wrapper.parentNode.insertBefore(document.createElement('div'), wrapper.nextSibling);
	key.innerHTML = '<div class="activeusers"><div class="row2"><table cellspacing="0" class="ipbtable"><tbody><tr><td width="5%" nowrap="nowrap"><img border="0" alt="New Posts" src="style_images/chronicpro/f_norm.gif">&nbsp;&nbsp;<span class="desc">New Replies</span><br><img border="0" alt="No New Posts" src="style_images/chronicpro/f_norm_no.gif">&nbsp;&nbsp;<span class="desc">No New Replies</span><br><img border="0" alt="Hot topic" src="style_images/chronicpro/f_hot.gif">&nbsp;&nbsp;<span class="desc">Hot Topic (New)</span><br><img border="0" alt="No new" src="style_images/chronicpro/f_hot_no.gif">&nbsp;&nbsp;<span class="desc">Hot Topic (No New)</span>&nbsp;</td><td width="5%" nowrap="nowrap"><img border="0" alt="Poll" src="style_images/chronicpro/f_poll.gif">&nbsp;&nbsp;<span class="desc">Poll (New)</span><br><img border="0" alt="No new votes" src="style_images/chronicpro/f_poll_no.gif">&nbsp;&nbsp;<span class="desc">Poll (No New)</span><br><img border="0" alt="Closed" src="style_images/chronicpro/f_closed.gif">&nbsp;&nbsp;<span class="desc">Locked Topic</span><br><img border="0" alt="Moved" src="style_images/chronicpro/f_moved.gif">&nbsp;&nbsp;<span class="desc">Moved Topic</span></td><td width="90%" align="right"><form name="jumpmenu" method="get" action="http://gmc.yoyogames.com/index.php?act=SF" onsubmit="if(document.jumpmenu.f.value == -1){return false;}"><input type="hidden" value="SF" name="act"><input type="hidden" value="" name="s"><select class="dropdown" onchange="if(this.options[this.selectedIndex].value != -1){ document.jumpmenu.submit() }" name="f"><optgroup label="Site Jump"><option value="sj_home">Forum Home</option><option value="sj_search">Search</option><option value="sj_help">Help</option></optgroup><optgroup label="Forum Jump"><option value="23">General</option><option value="1">&nbsp;&nbsp;|-- Announcements</option><option value="19">&nbsp;&nbsp;|-- Forum Rules and Regulations</option><option value="3">&nbsp;&nbsp;|-- The Community</option><option value="40">&nbsp;&nbsp;|---- Spam Box</option><option value="20">&nbsp;&nbsp;|-- Web Site Announcements</option><option value="39">&nbsp;&nbsp;|-- Team Requests</option><option value="24">Working with Game Maker</option><option value="28">&nbsp;&nbsp;|-- Tutorials and Examples</option><option value="43">&nbsp;&nbsp;|---- Staff Choice</option><option value="2">&nbsp;&nbsp;|-- Novice and Intermediate Users</option><option value="4">&nbsp;&nbsp;|-- Advanced Users Only</option><option value="29">&nbsp;&nbsp;|-- 3D Game Techniques</option><option value="41">&nbsp;&nbsp;|---- 3D Editable Examples</option><option value="6">&nbsp;&nbsp;|-- Extending Game Maker</option><option value="33">&nbsp;&nbsp;|---- Extensions [GEX]</option><option value="34">&nbsp;&nbsp;|---- Scripts [GML]</option><option value="35">&nbsp;&nbsp;|---- Libraries [LIB]</option><option value="36">&nbsp;&nbsp;|---- DLLs [DLL]</option><option value="5">&nbsp;&nbsp;|-- GML and Mathematics Discussion</option><option value="25">Games</option><option value="12">&nbsp;&nbsp;|-- Game Maker Creations</option><option selected="selected" value="44">&nbsp;&nbsp;|---- Arcade</option><option value="45">&nbsp;&nbsp;|---- Adventure &amp; RPG</option><option value="46">&nbsp;&nbsp;|---- Platform</option><option value="47">&nbsp;&nbsp;|---- Puzzle</option><option value="48">&nbsp;&nbsp;|---- Shooter</option><option value="49">&nbsp;&nbsp;|---- Strategy</option><option value="50">&nbsp;&nbsp;|---- Simulation &amp; Sports</option><option value="51">&nbsp;&nbsp;|---- Tools &amp; Applications</option><option value="38">&nbsp;&nbsp;|---- Open Source</option><option value="52">&nbsp;&nbsp;|---- Cage Match</option><option value="11">&nbsp;&nbsp;|-- Work in Progress</option><option value="10">&nbsp;&nbsp;|-- Game Ideas and Design</option><option value="13">&nbsp;&nbsp;|-- Distributing Games</option><option value="42">&nbsp;&nbsp;|-- Games in General</option><option value="26">Resources</option><option value="14">&nbsp;&nbsp;|-- Graphics</option><option value="15">&nbsp;&nbsp;|-- Sound and Music</option><option value="54">Game Maker Community Game</option><option value="55">&nbsp;&nbsp;|-- GMCG Project Discussion</option><option value="66">&nbsp;&nbsp;|---- Weekly Vote</option><option value="60">&nbsp;&nbsp;|-- GMCG Design and Ideas</option><option value="64">&nbsp;&nbsp;|---- Design Documents</option><option value="67">&nbsp;&nbsp;|---- Discussions</option><option value="59">&nbsp;&nbsp;|-- GMCG Storyline</option><option value="57">&nbsp;&nbsp;|-- GMCG Graphics</option><option value="63">&nbsp;&nbsp;|---- Concept Art</option><option value="65">&nbsp;&nbsp;|---- Sprites</option><option value="68">&nbsp;&nbsp;|---- Discussions</option><option value="56">&nbsp;&nbsp;|-- GMCG Sound and Music</option><option value="69">&nbsp;&nbsp;|---- Discussions</option><option value="58">&nbsp;&nbsp;|-- GMCG Programming</option><option value="62">&nbsp;&nbsp;|---- Programming Task - Movement Engine</option><option value="70">&nbsp;&nbsp;|---- Discussions</option><option value="71">&nbsp;&nbsp;|---- Inventory Engine</option></optgroup></select>&nbsp;<input type="submit" class="button" value="Go"></form></td></tr></tbody></table></div></div>';
	
	for (i=16; i>=1; i--) {
		
		// i values greater than 8 indicate buttons at the top
		if (i>8) {
			// Change ii to make sure the numbers on the buttons are correct
			ii = 17-i;
			
			// Insert the button before the main topic wrapper
			p_button = wrapper.parentNode.insertBefore(document.createElement('input'), wrapper);
		} else {
			ii = i;
			p_button = wrapper.parentNode.insertBefore(document.createElement('input'), wrapper.nextSibling);
		}
		
		// Create the button and set the attributes/styles
		p_button.setAttribute('type','button');
		p_button.setAttribute('value',ii);
		p_button.setAttribute('id','p'+ii);
		p_button.style.height = '19px';
		p_button.style.width = '17px';
		p_button.style.fontSize = '11px';
		p_button.style.borderWidth = '1px';
		p_button.style.borderStyle = 'solid';
		p_button.style.marginRight = '2px';
		p_button.style.marginLeft = '2px';
		p_button.style.borderColor = '#999999';
		
		// Set the 1 button to a default selected style
		if (ii === 1) {
			p_button.style.backgroundColor = '#B9C3D3';
			p_button.style.color = 'white';
		} else {
			p_button.style.backgroundColor = '#F7F7F7';
			p_button.style.color = 'black';
		}
		
		// Bind the listener
		p_button.addEventListener('click', function(event) {
			
			// Get all the topics in the page
			topics = document.getElementById('ipbwrapper').getElementsByTagName('table')[1].getElementsByTagName('tr');
			
			// Show elements of this class only
			show = this.getAttribute('value');
			
			// Loop through all the topics
			for (i=0; i<topics.length; i++) {
				// Grab the class value
				thisclass = topics[i].getAttribute('class');
				
				// If the class is correct, show it. If not, hide it
				if (thisclass == show) {
					topics[i].style.display = 'table-row';
				} else if (thisclass !== null) {
					topics[i].style.display = 'none';
				}
			}
			
			input = document.getElementsByTagName('input');
			
			// Loop through all the input tags
			for (i=0; i<input.length; i++) {
				if (input[i].value.match(/[0-9]*/) !== '') {
					if (input[i].value == show) {
						input[i].style.backgroundColor = '#B9C3D3';
						input[i].style.color = 'white';
					} else {
						input[i].style.backgroundColor = '#F7F7F7';
						input[i].style.color = 'black';
					}
				}
			}
			
			// Scroll to the top of the page
			window.scroll(0,0);
		}, false);
	}
}
}

/* This script was automatically generated from a literate source.  
   Do not edit this file; look at the literate source instead!
  
   Greasemonkey user script to 
   Display LaTeX in Web pages by transforming to MathML
  
   Home page: http://gold-saucer.afraid.org/mathml/greasemonkey/
  
   --------------------------------------------------------------------

   Copyright (C) 2006 Steve Cheng <stevecheng@users.sourceforge.net>

   Permission is hereby granted, free of charge, to any person obtaining
   a copy of this software and associated documentation files (the
   "Software"), to deal in the Software without restriction, including
   without limitation the rights to use, copy, modify, merge, publish,
   distribute, sublicense, and/or sell copies of the Software, and to
   permit persons to whom the Software is furnished to do so, subject to
   the following conditions:

   The above copyright notice and this permission notice shall be included
   in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
   IN NO EVENT SHALL THE AUTHOR(S) BE LIABLE FOR ANY CLAIM, DAMAGES OR
   OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
   ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
   OTHER DEALNGS IN THE SOFTWARE.


   --------------------------------------------------------------------*/

if (options.latex && get.showtopic !== undefined) {
const mmlns = 'http://www.w3.org/1998/Math/MathML';


function result_element(tag, num_attrs)
{
  var node = document.createElementNS(mmlns, tag);

  var k = 2;
  while(--num_attrs >= 0) {
    if(arguments[k+1] != null) {
      node.setAttribute(arguments[k], arguments[k+1]);
    }
    k += 2;
  }
    
  for(; k < arguments.length; k++) {
    if(arguments[k] != null) {
      if(typeof(arguments[k]) == 'string')
        node.appendChild(document.createTextNode(arguments[k]));
      else
        node.appendChild(arguments[k]);
    }
  }

  return node;
}


function result_element_append(parent, child)
{
  if(parent != null && child != null) {
    if(typeof(child) == 'string')
      parent.appendChild(document.createTextNode(child));
    else
      parent.appendChild(child);
  }
}


function result_element_prepend(parent, child, next)
{
  if(next == null)
    result_element_append(parent, child);
  else if (parent != null && child != null)
    parent.insertBefore(child, next);
}


function result_set_attr(elem, attr, value)
{
  if(elem != null && attr != null) {
    if(value != null)
      elem.setAttribute(attr, value);
    else
      elem.removeAttribute(attr);
  }
}


function result_append_attr(elem, attr, value)
{
  if(elem != null && attr != null) {
    var old_value = elem.getAttribute(elem, attr);
    if(old_value == null)
      elem.setAttribute(attr, value);
    else
      elem.setAttribute(attr, old_value + value);
  }
}


if(!this.GM_getValue) {
  this.GM_getValue = function(key, value) { return value; }
  this.GM_log = function() {}
}


if(this.GM_registerMenuCommand) {
  GM_registerMenuCommand("Enable native display of math images", 
    function() {
      GM_setValue("patch-images", true);
      do_patch_images = true;
      patch_element(document.documentElement);
    });
  GM_registerMenuCommand("Disable native display of math images",
    function() {
      GM_setValue("patch-images", false);
    });
}



const char_map = {
  'script': [
    '\uEF35', '\u212C', '\uEF36', '\uEF37', '\u2130', '\u2131', 
    '\uEF38', '\u210B', '\u2110', '\uEF39', '\uEF3A', '\u2112', 
    '\u2133', '\uEF3B', '\uEF3C', '\uEF3D', '\uEF3E', '\u211B', 
    '\uEF3F', '\uEF40', '\uEF41', '\uEF42', '\uEF43', '\uEF44', 
    '\uEF45', '\uEF46' ],

  'fraktur': [
    '\uEF5D', '\uEF5E', '\u212D', '\uEF5F', '\uEF60', '\uEF61', 
    '\uEF62', '\u210C', '\u2111', '\uEF63', '\uEF64', '\uEF65', 
    '\uEF66', '\uEF67', '\uEF68', '\uEF69', '\uEF6A', '\u211C', 
    '\uEF6B', '\uEF6C', '\uEF6D', '\uEF6E', '\uEF6F', '\uEF70', 
    '\uEF71', '\u2128' ],

  'double-struck': [
    '\uEF8C', '\uEF8D', '\u2102', '\uEF8E', '\uEF8F', '\uEF90', 
    '\uEF91', '\u210D', '\uEF92', '\uEF93', '\uEF94', '\uEF95', 
    '\uEF96', '\u2115', '\uEF97', '\u2119', '\u211A', '\u211D', 
    '\uEF98', '\uEF99', '\uEF9A', '\uEF9B', '\uEF9C', '\uEF9D', 
    '\uEF9E', '\u2124' ],
};

const uppercase_re = /[A-Z]/;

function fix_mathvariant(node, style)
{
  if(node.nodeType == node.TEXT_NODE) {
    if(style != null && style != '' && style in char_map) {
      node.data = node.data.replace(uppercase_re,
        function(s) { return char_map[style][s.charCodeAt(0)-65] });
    }
  } else if(node.nodeType == node.ELEMENT_NODE) {
    var new_style = node.getAttribute('mathvariant');
    if(new_style != null && new_style != '')
      style = new_style;

    for(var i=0; i < node.childNodes.length; i++)
      fix_mathvariant(node.childNodes.item(i), style);
  }
}

var g_punct_and_space
= { "\\quad" : "\u2003" ,
"\\qquad" : "\u2003\u2003" ,
"\\thickspace" : "\u2002" ,
"\\;" : "\u2002" ,
"\\medspace" : "\u2005" ,
"\\:" : "\u2005" ,
"\\thinspace" : "\u2004" ,
"\\," : "\u2004" ,
"\\!" : "\u200b" ,
"." : "." ,
";" : ";" ,
"?" : "?" ,
"\\qedsymbol" : "\u25a0" ,
}
;
var g_left_delimiters
= { "(" : "(" ,
"[" : "[" ,
"\\{" : "{" ,
"\\lgroup" : "(" ,
"\\lbrace" : "{" ,
"\\lvert" : "|" ,
"\\lVert" : "\u2016" ,
"\\lceil" : "\u2308" ,
"\\lfloor" : "\u230a" ,
"\\lmoustache" : "\u23b0" ,
"\\langle" : "\u2329" ,
}
;
var g_right_delimiters
= { ")" : ")" ,
"]" : "]" ,
"\\}" : "}" ,
"\\rbrace" : "}" ,
"\\rgroup" : ")" ,
"\\rvert" : "|" ,
"\\rVert" : "\u2016" ,
"\\rceil" : "\u2309" ,
"\\rfloor" : "\u230b" ,
"\\rmoustache" : "\u23b1" ,
"\\rangle" : "\u232a" ,
}
;
var g_operator_symbols
= { "\\amalg" : "\u2a3f" ,
"\\ast" : "*" ,
"\\ast" : "\u2217" ,
"\\barwedge" : "\u22bc" ,
"\\barwedge" : "\u2305" ,
"\\bigcirc" : "\u25cb" ,
"\\bigtriangledown" : "\u25bd" ,
"\\bigtriangleup" : "\u25b3" ,
"\\boxdot" : "\u22a1" ,
"\\boxminus" : "\u229f" ,
"\\boxplus" : "\u229e" ,
"\\boxtimes" : "\u22a0" ,
"\\bullet" : "\u2022" ,
"\\bullet" : "\u2219" ,
"\\cap" : "\u2229" ,
"\\Cap" : "\u22d2" ,
"\\cdot" : "\u22c5" ,
"\\centerdot" : "\u00b7" ,
"\\circ" : "\u2218" ,
"\\circledast" : "\u229b" ,
"\\circledcirc" : "\u229a" ,
"\\circleddash" : "\u229d" ,
"\\cup" : "\u222a" ,
"\\Cup" : "\u22d3" ,
"\\curlyvee" : "\u22ce" ,
"\\curlywedge" : "\u22cf" ,
"\\dagger" : "\u2020" ,
"\\ddagger" : "\u2021" ,
"\\diamond" : "\u22c4" ,
"\\div" : "\u00f7" ,
"\\divideontimes" : "\u22c7" ,
"\\dotplus" : "\u2214" ,
"\\doublebarwedge" : "\u2306" ,
"\\doublecap" : "\u22d2" ,
"\\doublecup" : "\u22d3" ,
"\\gtrdot" : "\u22d7" ,
"\\intercal" : "\u22ba" ,
"\\land" : "\u2227" ,
"\\leftthreetimes" : "\u22cb" ,
"\\lessdot" : "\u22d6" ,
"\\lor" : "\u2228" ,
"\\ltimes" : "\u22c9" ,
"\\mp" : "\u2213" ,
"\\odot" : "\u2299" ,
"\\ominus" : "\u2296" ,
"\\oplus" : "\u2295" ,
"\\oslash" : "\u2298" ,
"\\otimes" : "\u2297" ,
"\\pm" : "\u00b1" ,
"\\rightthreetimes" : "\u22cc" ,
"\\rtimes" : "\u22ca" ,
"\\setminus" : "\u2216" ,
"\\smallsetminus" : "\u2216" ,
"\\sqcap" : "\u2293" ,
"\\sqcup" : "\u2294" ,
"\\star" : "\u22c6" ,
"\\times" : "\u00d7" ,
"\\triangleleft" : "\u25c1" ,
"\\triangleright" : "\u25b7" ,
"\\uplus" : "\u228e" ,
"\\vee" : "\u2228" ,
"\\veebar" : "\u22bb" ,
"\\veebar" : "\u2a61" ,
"\\wedge" : "\u2227" ,
"\\wr" : "\u2240" ,
"+" : "+" ,
"-" : "\u2212" ,
"*" : "*" ,
"," : "," ,
"/" : "\u2215" ,
":" : ":" ,
"\\colon" : ":" ,
"|" : "|" ,
"\\vert" : "|" ,
"\\Vert" : "\u2016" ,
"\\|" : "\u2016" ,
"\\backslash" : "\\" ,
"'" : "\u2032" ,
"\\#" : "#" ,
"\\bmod" : "mod" ,
"\\mod" : "mod" ,
"\\downarrow" : "\u2193" ,
"\\Downarrow" : "\u21d3" ,
"\\uparrow" : "\u2191" ,
"\\Uparrow" : "\u21d1" ,
"\\updownarrow" : "\u2195" ,
"\\Updownarrow" : "\u21d5" ,
"\\bigcap" : "\u22c2" ,
"\\bigcup" : "\u22c3" ,
"\\bigodot" : "\u2a00" ,
"\\bigoplus" : "\u2a01" ,
"\\bigotimes" : "\u2a02" ,
"\\bigsqcup" : "\u2a06" ,
"\\biguplus" : "\u2a04" ,
"\\bigvee" : "\u22c1" ,
"\\bigwedge" : "\u22c0" ,
"\\coprod" : "\u2210" ,
"\\prod" : "\u220f" ,
"\\sum" : "\u2211" ,
"\\int" : "\u222b" ,
"\\smallint" : "\u222b" ,
"\\oint" : "\u222e" ,
"\\angle" : "\u2220" ,
"\\backprime" : "\u2035" ,
"\\bigstar" : "\u2605" ,
"\\blacklozenge" : "\u29eb" ,
"\\blacksquare" : "\u25a0" ,
"\\blacksquare" : "\u25aa" ,
"\\blacktriangle" : "\u25b4" ,
"\\blacktriangledown" : "\u25be" ,
"\\bot" : "\u22a5" ,
"\\clubsuit" : "\u2663" ,
"\\diagdown" : "\u2572" ,
"\\diagup" : "\u2571" ,
"\\diamondsuit" : "\u2662" ,
"\\emptyset" : "\u2205" ,
"\\exists" : "\u2203" ,
"\\flat" : "\u266d" ,
"\\forall" : "\u2200" ,
"\\heartsuit" : "\u2661" ,
"\\infty" : "\u221e" ,
"\\lnot" : "\u00ac" ,
"\\lozenge" : "\u25ca" ,
"\\measuredangle" : "\u2221" ,
"\\nabla" : "\u2207" ,
"\\natural" : "\u266e" ,
"\\neg" : "\u00ac" ,
"\\nexists" : "\u2204" ,
"\\prime" : "\u2032" ,
"\\sharp" : "\u266f" ,
"\\spadesuit" : "\u2660" ,
"\\sphericalangle" : "\u2222" ,
"\\square" : "\u25a1" ,
"\\surd" : "\u221a" ,
"\\top" : "\u22a4" ,
"\\triangle" : "\u25b5" ,
"\\triangledown" : "\u25bf" ,
"\\varnothing" : "\u2205" ,
"\\aleph" : "\u2135" ,
"\\Bbbk" : "\u1d55C" ,
"\\beth" : "\u2136" ,
"\\circledS" : "\u24c8" ,
"\\complement" : "\u2201" ,
"\\daleth" : "\u2138" ,
"\\ell" : "\u2113" ,
"\\eth" : "\u00f0" ,
"\\Finv" : "\u2132" ,
"\\Game" : "\u2141" ,
"\\gimel" : "\u2137" ,
"\\hbar" : "\u210f" ,
"\\hslash" : "\u210f" ,
"\\Im" : "\u2111" ,
"\\mho" : "\u2127" ,
"\\partial" : "\u2202" ,
"\\Re" : "\u211c" ,
"\\wp" : "\u2118" ,
}
;
var g_relation_symbols
= { "=" : "=" ,
"<" : "<" ,
">" : ">" ,
"\\approx" : "\u2248" ,
"\\approxeq" : "\u224a" ,
"\\asymp" : "\u224d" ,
"\\backsim" : "\u223d" ,
"\\backsimeq" : "\u22cd" ,
"\\bumpeq" : "\u224f" ,
"\\Bumpeq" : "\u224e" ,
"\\circeq" : "\u2257" ,
"\\cong" : "\u2245" ,
"\\curlyeqprec" : "\u22de" ,
"\\curlyeqsucc" : "\u22df" ,
"\\doteq" : "\u2250" ,
"\\doteqdot" : "\u2251" ,
"\\eqcirc" : "\u2256" ,
"\\eqsim" : "\u2242" ,
"\\eqslantgtr" : "\u2a96" ,
"\\eqslantless" : "\u2a95" ,
"\\equiv" : "\u2261" ,
"\\fallingdotseq" : "\u2252" ,
"\\ge" : "\u2265" ,
"\\geq" : "\u2265" ,
"\\geqq" : "\u2267" ,
"\\geqslant" : "\u2a7e" ,
"\\gg" : "\u226b" ,
"\\gg" : "\u2aa2" ,
"\\ggg" : "\u22d9" ,
"\\gggtr" : "\u22d9" ,
"\\gnapprox" : "\u2a8a" ,
"\\gneq" : "\u2a88" ,
"\\gneqq" : "\u2269" ,
"\\gnsim" : "\u22e7" ,
"\\gtrapprox" : "\u2a86" ,
"\\gtreqless" : "\u22db" ,
"\\gtreqqless" : "\u2a8c" ,
"\\gtrless" : "\u2277" ,
"\\gtrsim" : "\u2273" ,
"\\gvertneqq" : "\u2269" ,
"\\le" : "\u2264" ,
"\\leq" : "\u2264" ,
"\\leqq" : "\u2266" ,
"\\leqslant" : "\u2a7d" ,
"\\lessapprox" : "\u2a85" ,
"\\lesseqgtr" : "\u22da" ,
"\\lesseqqgtr" : "\u2a8b" ,
"\\lessgtr" : "\u2276" ,
"\\lesssim" : "\u2272" ,
"\\ll" : "\u226a" ,
"\\llless" : "\u22d8" ,
"\\lnapprox" : "\u2a89" ,
"\\lneq" : "\u2a87" ,
"\\lneqq" : "\u2268" ,
"\\lnsim" : "\u22e6" ,
"\\lvertneqq" : "\u2268" ,
"\\ncong" : "\u2247" ,
"\\ne" : "\u2260" ,
"\\neq" : "\u2260" ,
"\\ngeq" : "\u2271" ,
"\\ngeqq" : "\u2267" ,
"\\ngeqslant" : "\u2a7e" ,
"\\ngtr" : "\u226f" ,
"\\nleq" : "\u2270" ,
"\\nleqq" : "\u2266" ,
"\\nleqslant" : "\u2a7d" ,
"\\nless" : "\u226e" ,
"\\nprec" : "\u2280" ,
"\\npreceq" : "\u2aaf" ,
"\\nsim" : "\u2241" ,
"\\nsucc" : "\u2281" ,
"\\nsucceq" : "\u2ab0" ,
"\\prec" : "\u227a" ,
"\\precapprox" : "\u2ab7" ,
"\\preccurlyeq" : "\u227c" ,
"\\preceq" : "\u2aaf" ,
"\\precnapprox" : "\u2ab9" ,
"\\precneqq" : "\u2ab5" ,
"\\precnsim" : "\u22e8" ,
"\\precsim" : "\u227e" ,
"\\risingdotseq" : "\u2253" ,
"\\sim" : "\u223c" ,
"\\simeq" : "\u2243" ,
"\\succ" : "\u227b" ,
"\\succapprox" : "\u2ab8" ,
"\\succcurlyeq" : "\u227d" ,
"\\succeq" : "\u2ab0" ,
"\\succnapprox" : "\u2aba" ,
"\\succneqq" : "\u2ab6" ,
"\\succnsim" : "\u22e9" ,
"\\succsim" : "\u227f" ,
"\\thickapprox" : "\u2248" ,
"\\thicksim" : "\u223c" ,
"\\triangleq" : "\u225c" ,
"\\curvearrowleft" : "\u21b6" ,
"\\curvearrowright" : "\u21b7" ,
"\\downdownarrows" : "\u21ca" ,
"\\downharpoonleft" : "\u21c3" ,
"\\downharpoonright" : "\u21c2" ,
"\\gets" : "\u2190" ,
"\\hookleftarrow" : "\u21a9" ,
"\\hookrightarrow" : "\u21aa" ,
"\\leftarrow" : "\u2190" ,
"\\Leftarrow" : "\u21d0" ,
"\\leftarrowtail" : "\u21a2" ,
"\\leftharpoondown" : "\u21bd" ,
"\\leftharpoonup" : "\u21bc" ,
"\\leftleftarrows" : "\u21c7" ,
"\\leftrightarrow" : "\u2194" ,
"\\leftrightarrows" : "\u21c6" ,
"\\leftrightharpoons" : "\u21cb" ,
"\\leftrightsquigarrow" : "\u21ad" ,
"\\Lleftarrow" : "\u21da" ,
"\\longleftarrow" : "\u27f5" ,
"\\Longleftarrow" : "\u27f8" ,
"\\longleftrightarrow" : "\u27f7" ,
"\\Longleftrightarrow" : "\u27fa" ,
"\\looparrowleft" : "\u21ab" ,
"\\looparrowright" : "\u21ac" ,
"\\Lsh" : "\u21b0" ,
"\\mapsto" : "\u21a6" ,
"\\multimap" : "\u22b8" ,
"\\nearrow" : "\u2197" ,
"\\nleftarrow" : "\u219a" ,
"\\nLeftarrow" : "\u21cd" ,
"\\nleftrightarrow" : "\u21ae" ,
"\\nLeftrightarrow" : "\u21ce" ,
"\\nrightarrow" : "\u219b" ,
"\\nRightarrow" : "\u21cf" ,
"\\nwarrow" : "\u2196" ,
"\\restriction" : "\u21be" ,
"\\rightarrow" : "\u2192" ,
"\\Rightarrow" : "\u21d2" ,
"\\rightarrowtail" : "\u21a3" ,
"\\rightharpoondown" : "\u21c1" ,
"\\rightharpoonup" : "\u21c0" ,
"\\rightleftarrows" : "\u21c4" ,
"\\rightleftharpoons" : "\u21cc" ,
"\\rightrightarrows" : "\u21c9" ,
"\\rightsquigarrow" : "\u219d" ,
"\\Rrightarrow" : "\u21db" ,
"\\Rsh" : "\u21b1" ,
"\\searrow" : "\u2198" ,
"\\swarrow" : "\u2199" ,
"\\to" : "\u2192" ,
"\\twoheadleftarrow" : "\u219e" ,
"\\twoheadrightarrow" : "\u21a0" ,
"\\upharpoonleft" : "\u21bf" ,
"\\upharpoonright" : "\u21be" ,
"\\upuparrows" : "\u21c8" ,
"\\backepsilon" : "\u03f6" ,
"\\because" : "\u2235" ,
"\\between" : "\u226c" ,
"\\blacktriangleleft" : "\u25c0" ,
"\\blacktriangleright" : "\u25b6" ,
"\\bowtie" : "\u22c8" ,
"\\dashv" : "\u22a3" ,
"\\frown" : "\u2323" ,
"\\in" : "\u220a" ,
"\\mid" : "\u2223" ,
"\\models" : "\u22a7" ,
"\\ni" : "\u220b" ,
"\\ni" : "\u220d" ,
"\\nmid" : "\u2224" ,
"\\notin" : "\u2209" ,
"\\nparallel" : "\u2226" ,
"\\nshortmid" : "\u2224" ,
"\\nshortparallel" : "\u2226" ,
"\\nsubseteq" : "\u2286" ,
"\\nsubseteq" : "\u2288" ,
"\\nsubseteqq" : "\u2ac5" ,
"\\nsupseteq" : "\u2287" ,
"\\nsupseteq" : "\u2289" ,
"\\nsupseteqq" : "\u2ac6" ,
"\\ntriangleleft" : "\u22ea" ,
"\\ntrianglelefteq" : "\u22ec" ,
"\\ntriangleright" : "\u22eb" ,
"\\ntrianglerighteq" : "\u22ed" ,
"\\nvdash" : "\u22ac" ,
"\\nvDash" : "\u22ad" ,
"\\nVdash" : "\u22ae" ,
"\\nVDash" : "\u22af" ,
"\\owns" : "\u220d" ,
"\\parallel" : "\u2225" ,
"\\perp" : "\u22a5" ,
"\\pitchfork" : "\u22d4" ,
"\\propto" : "\u221d" ,
"\\shortmid" : "\u2223" ,
"\\shortparallel" : "\u2225" ,
"\\smallfrown" : "\u2322" ,
"\\smallsmile" : "\u2323" ,
"\\smile" : "\u2323" ,
"\\sqsubset" : "\u228f" ,
"\\sqsubseteq" : "\u2291" ,
"\\sqsupset" : "\u2290" ,
"\\sqsupseteq" : "\u2292" ,
"\\subset" : "\u2282" ,
"\\Subset" : "\u22d0" ,
"\\subseteq" : "\u2286" ,
"\\subseteqq" : "\u2ac5" ,
"\\subsetneq" : "\u228a" ,
"\\subsetneqq" : "\u2acb" ,
"\\supset" : "\u2283" ,
"\\Supset" : "\u22d1" ,
"\\supseteq" : "\u2287" ,
"\\supseteqq" : "\u2ac6" ,
"\\supsetneq" : "\u228b" ,
"\\supsetneqq" : "\u2acc" ,
"\\therefore" : "\u2234" ,
"\\trianglelefteq" : "\u22b4" ,
"\\trianglerighteq" : "\u22b5" ,
"\\varpropto" : "\u221d" ,
"\\varsubsetneq" : "\u228a" ,
"\\varsubsetneqq" : "\u2acb" ,
"\\varsupsetneq" : "\u228b" ,
"\\varsupsetneqq" : "\u2acc" ,
"\\vartriangle" : "\u25b5" ,
"\\vartriangleleft" : "\u22b2" ,
"\\vartriangleright" : "\u22b3" ,
"\\vdash" : "\u22a2" ,
"\\vDash" : "\u22a8" ,
"\\Vdash" : "\u22a9" ,
"\\Vvdash" : "\u22aa" ,
}
;
var g_named_identifiers
= { "\\arccos" : "arccos" ,
"\\arcsin" : "arcsin" ,
"\\arctan" : "arctan" ,
"\\arg" : "arg" ,
"\\cos" : "cos" ,
"\\cosh" : "cosh" ,
"\\cot" : "cot" ,
"\\coth" : "coth" ,
"\\csc" : "csc" ,
"\\deg" : "deg" ,
"\\det" : "det" ,
"\\dim" : "dim" ,
"\\exp" : "exp" ,
"\\gcd" : "gcd" ,
"\\hom" : "hom" ,
"\\ker" : "ker" ,
"\\lg" : "lg" ,
"\\ln" : "ln" ,
"\\log" : "log" ,
"\\Pr" : "Pr" ,
"\\sec" : "sec" ,
"\\sin" : "sin" ,
"\\sinh" : "sinh" ,
"\\tan" : "tan" ,
"\\tanh" : "tanh" ,
"\\inf" : "inf" ,
"\\injlim" : "inj lim" ,
"\\lim" : "lim" ,
"\\liminf" : "lim inf" ,
"\\limsup" : "lum sup" ,
"\\max" : "max" ,
"\\min" : "min" ,
"\\projlim" : "proj lim" ,
"\\sup" : "sup" ,
"\\alpha" : "\u03b1" ,
"\\beta" : "\u03b2" ,
"\\chi" : "\u03c7" ,
"\\delta" : "\u03b4" ,
"\\Delta" : "\u0394" ,
"\\digamma" : "\u03dd" ,
"\\epsilon" : "\u03f5" ,
"\\eta" : "\u03b7" ,
"\\gamma" : "\u03b3" ,
"\\Gamma" : "\u0393" ,
"\\iota" : "\u03b9" ,
"\\kappa" : "\u03ba" ,
"\\lambda" : "\u03bb" ,
"\\Lambda" : "\u039b" ,
"\\mu" : "\u03bc" ,
"\\nu" : "\u03bd" ,
"\\omega" : "\u03c9" ,
"\\Omega" : "\u03a9" ,
"\\phi" : "\u03c6" ,
"\\Phi" : "\u03a6" ,
"\\pi" : "\u03c0" ,
"\\Pi" : "\u03a0" ,
"\\psi" : "\u03c8" ,
"\\Psi" : "\u03a8" ,
"\\rho" : "\u03c1" ,
"\\sigma" : "\u03c3" ,
"\\Sigma" : "\u03a3" ,
"\\tau" : "\u03c4" ,
"\\theta" : "\u03b8" ,
"\\Theta" : "\u0398" ,
"\\upsilon" : "\u03c5" ,
"\\Upsilon" : "\u03d2" ,
"\\varepsilon" : "\u03b5" ,
"\\varkappa" : "\u03f0" ,
"\\varphi" : "\u03d5" ,
"\\varpi" : "\u03d6" ,
"\\varrho" : "\u03f1" ,
"\\varsigma" : "\u03c2" ,
"\\vartheta" : "\u03d1" ,
"\\xi" : "\u03be" ,
"\\Xi" : "\u039e" ,
"\\zeta" : "\u03b6" ,
"a" : "a" ,
"b" : "b" ,
"c" : "c" ,
"d" : "d" ,
"e" : "e" ,
"f" : "f" ,
"g" : "g" ,
"h" : "h" ,
"i" : "i" ,
"j" : "j" ,
"k" : "k" ,
"l" : "l" ,
"m" : "m" ,
"n" : "n" ,
"o" : "o" ,
"p" : "p" ,
"q" : "q" ,
"r" : "r" ,
"s" : "s" ,
"t" : "t" ,
"u" : "u" ,
"v" : "v" ,
"w" : "w" ,
"x" : "x" ,
"y" : "y" ,
"z" : "z" ,
"A" : "A" ,
"B" : "B" ,
"C" : "C" ,
"D" : "D" ,
"E" : "E" ,
"F" : "F" ,
"G" : "G" ,
"H" : "H" ,
"I" : "I" ,
"J" : "J" ,
"K" : "K" ,
"L" : "L" ,
"M" : "M" ,
"N" : "N" ,
"O" : "O" ,
"P" : "P" ,
"Q" : "Q" ,
"R" : "R" ,
"S" : "S" ,
"T" : "T" ,
"U" : "U" ,
"V" : "V" ,
"W" : "W" ,
"X" : "X" ,
"Y" : "Y" ,
"Z" : "Z" ,
"\\vdots" : "\u22ee" ,
"\\hdots" : "\u2026" ,
"\\ldots" : "\u2026" ,
"\\dots" : "\u2026" ,
"\\cdots" : "\u00b7\u00b7\u00b7" ,
"\\dotsb" : "\u00b7\u00b7\u00b7" ,
"\\dotsc" : "\u2026" ,
"\\dotsi" : "\u22c5\u22c5\u22c5" ,
"\\dotsm" : "\u22c5\u22c5\u22c5" ,
"\\dotso" : "\u2026" ,
"\\ddots" : "\u22f1" ,
}
;
var g_word_operators
= { "\\arccos" : "arccos" ,
"\\arcsin" : "arcsin" ,
"\\arctan" : "arctan" ,
"\\arg" : "arg" ,
"\\cos" : "cos" ,
"\\cosh" : "cosh" ,
"\\cot" : "cot" ,
"\\coth" : "coth" ,
"\\csc" : "csc" ,
"\\deg" : "deg" ,
"\\det" : "det" ,
"\\dim" : "dim" ,
"\\exp" : "exp" ,
"\\gcd" : "gcd" ,
"\\hom" : "hom" ,
"\\ker" : "ker" ,
"\\lg" : "lg" ,
"\\ln" : "ln" ,
"\\log" : "log" ,
"\\Pr" : "Pr" ,
"\\sec" : "sec" ,
"\\sin" : "sin" ,
"\\sinh" : "sinh" ,
"\\tan" : "tan" ,
"\\tanh" : "tanh" ,
}
;
var g_big_word_operators
= { "\\inf" : "inf" ,
"\\injlim" : "inj lim" ,
"\\lim" : "lim" ,
"\\liminf" : "lim inf" ,
"\\limsup" : "lum sup" ,
"\\max" : "max" ,
"\\min" : "min" ,
"\\projlim" : "proj lim" ,
"\\sup" : "sup" ,
}
;
var g_greek_letters
= { "\\alpha" : "\u03b1" ,
"\\beta" : "\u03b2" ,
"\\chi" : "\u03c7" ,
"\\delta" : "\u03b4" ,
"\\Delta" : "\u0394" ,
"\\digamma" : "\u03dd" ,
"\\epsilon" : "\u03f5" ,
"\\eta" : "\u03b7" ,
"\\gamma" : "\u03b3" ,
"\\Gamma" : "\u0393" ,
"\\iota" : "\u03b9" ,
"\\kappa" : "\u03ba" ,
"\\lambda" : "\u03bb" ,
"\\Lambda" : "\u039b" ,
"\\mu" : "\u03bc" ,
"\\nu" : "\u03bd" ,
"\\omega" : "\u03c9" ,
"\\Omega" : "\u03a9" ,
"\\phi" : "\u03c6" ,
"\\Phi" : "\u03a6" ,
"\\pi" : "\u03c0" ,
"\\Pi" : "\u03a0" ,
"\\psi" : "\u03c8" ,
"\\Psi" : "\u03a8" ,
"\\rho" : "\u03c1" ,
"\\sigma" : "\u03c3" ,
"\\Sigma" : "\u03a3" ,
"\\tau" : "\u03c4" ,
"\\theta" : "\u03b8" ,
"\\Theta" : "\u0398" ,
"\\upsilon" : "\u03c5" ,
"\\Upsilon" : "\u03d2" ,
"\\varepsilon" : "\u03b5" ,
"\\varkappa" : "\u03f0" ,
"\\varphi" : "\u03d5" ,
"\\varpi" : "\u03d6" ,
"\\varrho" : "\u03f1" ,
"\\varsigma" : "\u03c2" ,
"\\vartheta" : "\u03d1" ,
"\\xi" : "\u03be" ,
"\\Xi" : "\u039e" ,
"\\zeta" : "\u03b6" ,
}
;
function v_fraction_to_mathml (tokens ) {
 var v_numerator = v_piece_to_mathml (tokens ) ;
 var v_denominator = v_piece_to_mathml (tokens ) ;
 return result_element( "mfrac" ,0 , v_numerator , v_denominator ) ;
}
function v_binom_to_mathml (tokens ) {
 var v_top = v_piece_to_mathml (tokens ) ;
 var v_bottom = v_piece_to_mathml (tokens ) ;
 return result_element( "mrow" ,0 , result_element( "mo" ,0 , "(" ) , result_element( "mfrac" , 1
, "linethickness" , "0" , v_top , v_bottom ) , result_element( "mo" ,0 , ")" ) ) ;
}
function v_sqrt_to_mathml (tokens ) {
 var v_index = v_optional_arg_to_mathml (tokens ) ;
 var v_object = v_piece_to_mathml (tokens ) ;
 if( ( v_index != null ) ) {
  return result_element( "mroot" ,0 , v_object , v_index ) ;
 }
 else {
  return result_element( "msqrt" ,0 , v_object ) ;
 }
}
function v_parenthesized_operator (tokens , v_word ) {
 var v_object = v_piece_to_mathml (tokens ) ;
 if( ( v_word != null ) ) {
  return result_element( "mrow" ,0 , result_element( "mo" ,0 , "(" ) , result_element( "mo" ,0 , v_word ) , v_object , result_element( "mo" ,0 , ")" ) ) ;
 }
 else {
  return result_element( "mrow" ,0 , result_element( "mo" ,0 , "(" ) , v_object , result_element( "mo" ,0 , ")" ) ) ;
 }
}
function v_operatorname_to_mathml (tokens ) {
 var v_result = result_element( "mo" ,0 , tokens.list[tokens.index] ) ;
 tokens.index++;
 return v_result ;
}
function v_displaystyle_to_mathml (tokens ) {
 var v_result = v_subexpr_chain_to_mathml (tokens , g_hard_stop_tokens
) ;
 return result_element( "mstyle" , 2
, "displaystyle" , "true" , "scriptlevel" , "0" , v_result ) ;
}
function v_displaymath_to_mathml (tokens ) {
 var v_result = v_subexpr_chain_to_mathml (tokens , g_hard_stop_tokens
) ;
  v_finish_latex_block (tokens );
 return result_element( "mstyle" , 2
, "displaystyle" , "true" , "scriptlevel" , "0" , v_result ) ;
}
function v_font_to_mathml (tokens , v_font_name ) {
 if( ( tokens.list[tokens.index] != "{" ) ) {
  var v_result = result_element( "mi" , 1
, "mathvariant" , v_font_name , tokens.list[tokens.index] ) ;
  if( ( v_font_name == "normal" ) ) {
   result_set_attr(
v_result , "fontstyle" , "normal" );
  }
  tokens.index++;
  return v_result ;
 }
 else {
  var v_result = v_piece_to_mathml (tokens ) ;
  result_set_attr(
v_result , "mathvariant" , v_font_name );
  if( ( v_font_name == "normal" ) ) {
   result_set_attr(
v_result , "fontstyle" , "normal" );
  }
  return v_result ;
 }
}
function v_old_font_to_mathml (tokens , v_font_name ) {
 return result_element( "mstyle" , 2
, "mathvariant" , v_font_name , "fontstyle" , ( ( v_font_name == "normal" ) ? "normal" : null ) , v_subexpr_chain_to_mathml (tokens , g_hard_stop_tokens
) ) ;
}
function v_size_to_mathml (tokens , v_min_size , v_max_size ) {
 var v_result = v_piece_to_mathml (tokens ) ;
 result_set_attr(
v_result , "minsize" , v_min_size );
 result_set_attr(
v_result , "maxsize" , v_max_size );
 return v_result ;
}
function v_accent_to_mathml (tokens , v_char ) {
 return result_element( "mover" , 1
, "accent" , "true" , v_piece_to_mathml (tokens ) , result_element( "mo" ,0 , v_char ) ) ;
}
function v_matrix_to_mathml (tokens , v_open_delim , v_close_delim ) {
 var v_mtable = v_matrix_to_mtable (tokens , result_element( "mtable" ,0) ) ;
 if( ( ( v_open_delim != null )  ||  ( v_close_delim != null ) ) ) {
  var v_mrow = result_element( "mrow" ,0) ;
  if( ( v_open_delim != null ) ) {
   result_element_append( v_mrow , result_element( "mo" ,0 , v_open_delim ) );
  }
  result_element_append( v_mrow , v_mtable );
  if( ( v_close_delim != null ) ) {
   result_element_append( v_mrow , result_element( "mo" ,0 , v_close_delim ) );
  }
  return v_mrow ;
 }
 else {
  return v_mtable ;
 }
}
function v_array_to_mathml (tokens ) {
 var v_mtable = result_element( "mtable" ,0) ;
 if( ( tokens.list[tokens.index] == "{" ) ) {
  tokens.index++;
  while( ( ( tokens.list[tokens.index] != null )  &&  ( tokens.list[tokens.index] != "}" ) ) ) {
   if( ( tokens.list[tokens.index] == "c" ) ) {
    result_append_attr(
v_mtable , "columnalign" , "center " );
   }
   else if( ( tokens.list[tokens.index] == "l" ) ) {
    result_append_attr(
v_mtable , "columnalign" , "left " );
   }
   else if( ( tokens.list[tokens.index] == "r" ) ) {
    result_append_attr(
v_mtable , "columnalign" , "right " );
   }
   tokens.index++;
  }
  if( ( tokens.list[tokens.index] != null ) ) {
   tokens.index++;
  }
 }
 return v_matrix_to_mtable (tokens , v_mtable ) ;
}
function v_matrix_to_mtable (tokens , v_mtable ) {
 var v_mtr = result_element( "mtr" ,0) ;
 var v_mtd = result_element( "mtd" ,0) ;
 var v_token = tokens.list[tokens.index] ;
 result_element_append( v_mtable , v_mtr );
 result_element_append( v_mtr , v_mtd );
 while( ( ( v_token != null )  &&  ( v_token != "\\end" ) ) ) {
  if( ( v_token == "\\\\" ) ) {
    v_mtr = result_element( "mtr" ,0) ;
    v_mtd = result_element( "mtd" ,0) ;
   result_element_append( v_mtable , v_mtr );
   result_element_append( v_mtr , v_mtd );
   tokens.index++;
  }
  else if( ( v_token == "&" ) ) {
    v_mtd = result_element( "mtd" ,0) ;
   result_element_append( v_mtr , v_mtd );
   tokens.index++;
  }
  else {
   result_element_append( v_mtd , v_subexpr_chain_to_mathml (tokens , g_hard_stop_tokens
) );
  }
   v_token = tokens.list[tokens.index] ;
 }
  v_finish_latex_block (tokens );
 return v_mtable ;
}
function v_over_to_mathml (tokens , v_char ) {
 return result_element( "mover" ,0 , v_piece_to_mathml (tokens ) , result_element( "mo" ,0 , v_char ) ) ;
}
function v_under_to_mathml (tokens , v_char ) {
 return result_element( "munder" ,0 , v_piece_to_mathml (tokens ) , result_element( "mo" ,0 , v_char ) ) ;
}
function v_delimiter_to_mathml (tokens , v_end_command , v_min_size , v_max_size ) {
 var v_mrow = result_element( "mrow" ,0) ;
 result_element_append( v_mrow , result_element( "mo" , 2
, "minsize" , v_min_size , "maxsize" , v_max_size , v_read_delimiter (tokens ) ) );
 result_element_append( v_mrow , v_subexpr_chain_to_mathml (tokens , g_hard_stop_tokens
) );
 if( ( tokens.list[tokens.index] != v_end_command ) ) {
  return v_mrow ;
 }
 tokens.index++;
 result_element_append( v_mrow , result_element( "mo" , 2
, "minsize" , v_min_size , "maxsize" , v_max_size , v_read_delimiter (tokens ) ) );
 return v_mrow ;
}
function v_read_delimiter (tokens ) {
 var v_token = tokens.list[tokens.index] ;
 if( ( v_token == null ) ) {
  throw "unexpected eof" ;
 }
 else if( ( v_token == "." ) ) {
  tokens.index++;
  return "" ;
 }
 else if( ( v_token == "<" ) ) {
  tokens.index++;
  return "\u2329" ;
 }
 else if( ( v_token == ">" ) ) {
  tokens.index++;
  return "\u232a" ;
 }
 else if( ( v_token in g_punct_and_space
) ) {
  tokens.index++;
  return g_punct_and_space
[ v_token ] ;
 }
 else if( ( v_token in g_left_delimiters
) ) {
  tokens.index++;
  return g_left_delimiters
[ v_token ] ;
 }
 else if( ( v_token in g_right_delimiters
) ) {
  tokens.index++;
  return g_right_delimiters
[ v_token ] ;
 }
 else if( ( v_token in g_operator_symbols
) ) {
  tokens.index++;
  return g_operator_symbols
[ v_token ] ;
 }
 else {
  throw "invalid delimiter" ;
 }
}
function v_latex_block_to_mathml (tokens ) {
  v_cmd = tokens.list[tokens.index] ;
 if( ( v_cmd in g_tex_environments
) ) {
  tokens.index++;
  return g_tex_environments
[ v_cmd ] (tokens ) ;
 }
 else {
  throw "unknown command" ;
 }
}
function v_finish_latex_block (tokens ) {
 if( ( tokens.list[tokens.index] == null ) ) {
  throw "unexpected eof" ;
 }
 tokens.index++;
 tokens.index++;
}
function v_combining_to_mathml (tokens , v_char ) {
 var v_base = tokens.list[tokens.index] ;
 tokens.index++;
 return result_element( "mo" ,0 , v_base , v_char ) ;
}
var g_char_escape_codes
= { "93" : "#" ,
}
;
function v_char_escape_to_mathml (tokens ) {
 var v_result = null ;
 if( ( tokens.list[tokens.index] in g_char_escape_codes
) ) {
   v_result = result_element( "mtext" ,0 , g_char_escape_codes
[ tokens.list[tokens.index] ] ) ;
 }
 else {
   v_result = result_element( "merror" ,0 , "\\char" , tokens.list[tokens.index] ) ;
 }
 tokens.index++;
 return v_result ;
}
function v_text_to_mathml (tokens ) {
 if( ( tokens.list[tokens.index] != "{" ) ) {
  var v_result = result_element( "mtext" ,0 , tokens.list[tokens.index] ) ;
  tokens.index++;
  return v_result ;
 }
 tokens.index++;
 var v_result = null ;
 var v_mrow = null ;
 var v_node = null ;
 while( ( tokens.list[tokens.index] != null ) ) {
  if( ( tokens.list[tokens.index] == "}" ) ) {
   tokens.index++;
   return v_result ;
  }
  else if( ( tokens.list[tokens.index] == "$" ) ) {
   tokens.index++;
    v_node = v_subexpr_chain_to_mathml (tokens , g_hard_stop_tokens
) ;
   tokens.index++;
  }
  else {
    v_node = result_element( "mtext" ,0 , tokens.list[tokens.index] ) ;
   tokens.index++;
  }
  if( ( v_mrow != null ) ) {
   result_element_append( v_mrow , v_node );
  }
  else if( ( v_result != null ) ) {
    v_mrow = result_element( "mrow" ,0 , v_result , v_node ) ;
    v_result = v_mrow ;
  }
  else {
    v_result = v_node ;
  }
 }
 return v_result ;
}
var g_tex_commands
= { "\\frac" : v_fraction_to_mathml ,
"\\dfrac" : v_fraction_to_mathml ,
"\\tfrac" : v_fraction_to_mathml ,
"\\binom" : v_binom_to_mathml ,
"\\sqrt" : v_sqrt_to_mathml ,
"\\operatorname" : v_operatorname_to_mathml ,
"\\displaystyle" : v_displaystyle_to_mathml ,
"\\pod" : function(tokens ) { return v_parenthesized_operator (tokens , null ) ; } ,
"\\pmod" : function(tokens ) { return v_parenthesized_operator (tokens , "mod" ) ; } ,
"\\boldsymbol" : function(tokens ) { return v_font_to_mathml (tokens , "bold" ) ; } ,
"\\bold" : function(tokens ) { return v_font_to_mathml (tokens , "bold" ) ; } ,
"\\Bbb" : function(tokens ) { return v_font_to_mathml (tokens , "double-struck" ) ; } ,
"\\mathbb" : function(tokens ) { return v_font_to_mathml (tokens , "double-struck" ) ; } ,
"\\mathbbmss" : function(tokens ) { return v_font_to_mathml (tokens , "double-struck" ) ; } ,
"\\mathbf" : function(tokens ) { return v_font_to_mathml (tokens , "bold" ) ; } ,
"\\mathop" : function(tokens ) { return v_font_to_mathml (tokens , "normal" ) ; } ,
"\\mathrm" : function(tokens ) { return v_font_to_mathml (tokens , "normal" ) ; } ,
"\\mathfrak" : function(tokens ) { return v_font_to_mathml (tokens , "fraktur" ) ; } ,
"\\mathit" : function(tokens ) { return v_font_to_mathml (tokens , "italic" ) ; } ,
"\\mathscr" : function(tokens ) { return v_font_to_mathml (tokens , "script" ) ; } ,
"\\mathcal" : function(tokens ) { return v_font_to_mathml (tokens , "script" ) ; } ,
"\\mathsf" : function(tokens ) { return v_font_to_mathml (tokens , "sans-serif" ) ; } ,
"\\mathtt" : function(tokens ) { return v_font_to_mathml (tokens , "monospace" ) ; } ,
"\\EuScript" : function(tokens ) { return v_font_to_mathml (tokens , "script" ) ; } ,
"\\bf" : function(tokens ) { return v_old_font_to_mathml (tokens , "bold" ) ; } ,
"\\rm" : function(tokens ) { return v_old_font_to_mathml (tokens , "normal" ) ; } ,
"\\big" : function(tokens ) { return v_size_to_mathml (tokens , "2" , "2" ) ; } ,
"\\Big" : function(tokens ) { return v_size_to_mathml (tokens , "3" , "3" ) ; } ,
"\\bigg" : function(tokens ) { return v_size_to_mathml (tokens , "4" , "4" ) ; } ,
"\\Bigg" : function(tokens ) { return v_size_to_mathml (tokens , "5" , "5" ) ; } ,
"\\acute" : function(tokens ) { return v_accent_to_mathml (tokens , "\u0301" ) ; } ,
"\\grave" : function(tokens ) { return v_accent_to_mathml (tokens , "\u0300" ) ; } ,
"\\tilde" : function(tokens ) { return v_accent_to_mathml (tokens , "\u0303" ) ; } ,
"\\bar" : function(tokens ) { return v_accent_to_mathml (tokens , "\u0304" ) ; } ,
"\\breve" : function(tokens ) { return v_accent_to_mathml (tokens , "\u0306" ) ; } ,
"\\check" : function(tokens ) { return v_accent_to_mathml (tokens , "\u030c" ) ; } ,
"\\hat" : function(tokens ) { return v_accent_to_mathml (tokens , "\u0302" ) ; } ,
"\\vec" : function(tokens ) { return v_accent_to_mathml (tokens , "\u20d7" ) ; } ,
"\\dot" : function(tokens ) { return v_accent_to_mathml (tokens , "\u0307" ) ; } ,
"\\ddot" : function(tokens ) { return v_accent_to_mathml (tokens , "\u0308" ) ; } ,
"\\dddot" : function(tokens ) { return v_accent_to_mathml (tokens , "\u20db" ) ; } ,
"\\underbrace" : function(tokens ) { return v_under_to_mathml (tokens , "\ufe38" ) ; } ,
"\\overbrace" : function(tokens ) { return v_over_to_mathml (tokens , "\ufe37" ) ; } ,
"\\underline" : function(tokens ) { return v_under_to_mathml (tokens , "\u0332" ) ; } ,
"\\overline" : function(tokens ) { return v_over_to_mathml (tokens , "\u00af" ) ; } ,
"\\widetilde" : function(tokens ) { return v_over_to_mathml (tokens , "\u0303" ) ; } ,
"\\widehat" : function(tokens ) { return v_over_to_mathml (tokens , "\u0302" ) ; } ,
"\\not" : function(tokens ) { return v_combining_to_mathml (tokens , "\u0338" ) ; } ,
"\\left" : function(tokens ) { return v_delimiter_to_mathml (tokens , "\\right" , "1" , null ) ; } ,
"\\bigl" : function(tokens ) { return v_delimiter_to_mathml (tokens , "\\bigr" , "2" , "2" ) ; } ,
"\\Bigl" : function(tokens ) { return v_delimiter_to_mathml (tokens , "\\Bigr" , "3" , "3" ) ; } ,
"\\biggl" : function(tokens ) { return v_delimiter_to_mathml (tokens , "\\biggr" , "4" , "4" ) ; } ,
"\\Biggl" : function(tokens ) { return v_delimiter_to_mathml (tokens , "\\Biggr" , "5" , "5" ) ; } ,
"\\char" : v_char_escape_to_mathml ,
"\\!" : function(tokens ) { return null ; } ,
"\\text" : v_text_to_mathml ,
"\\textnormal" : v_text_to_mathml ,
"\\textrm" : v_text_to_mathml ,
"\\textsl" : v_text_to_mathml ,
"\\textit" : v_text_to_mathml ,
"\\texttt" : v_text_to_mathml ,
"\\textbf" : v_text_to_mathml ,
"\\hbox" : v_text_to_mathml ,
"\\mbox" : v_text_to_mathml ,
"\\begin" : v_latex_block_to_mathml ,
}
;
var g_tex_environments
= { "smallmatrix" : function(tokens ) { return v_matrix_to_mathml (tokens , "(" , ")" ) ; } ,
"pmatrix" : function(tokens ) { return v_matrix_to_mathml (tokens , "(" , ")" ) ; } ,
"bmatrix" : function(tokens ) { return v_matrix_to_mathml (tokens , "[" , "]" ) ; } ,
"Bmatrix" : function(tokens ) { return v_matrix_to_mathml (tokens , "{" , "}" ) ; } ,
"vmatrix" : function(tokens ) { return v_matrix_to_mathml (tokens , "|" , "|" ) ; } ,
"Vmatrix" : function(tokens ) { return v_matrix_to_mathml (tokens , "\u2016" , "\u2016" ) ; } ,
"cases" : function(tokens ) { return v_matrix_to_mathml (tokens , "{" , null ) ; } ,
"array" : v_array_to_mathml ,
"displaymath" : v_displaymath_to_mathml ,
}
;
var g_limit_commands
= { "\\bigcap" : "\u22c2" ,
"\\bigcup" : "\u22c3" ,
"\\bigodot" : "\u2a00" ,
"\\bigoplus" : "\u2a01" ,
"\\bigotimes" : "\u2a02" ,
"\\bigsqcup" : "\u2a06" ,
"\\biguplus" : "\u2a04" ,
"\\bigvee" : "\u22c1" ,
"\\bigwedge" : "\u22c0" ,
"\\coprod" : "\u2210" ,
"\\prod" : "\u220f" ,
"\\sum" : "\u2211" ,
"\\inf" : "inf" ,
"\\injlim" : "inj lim" ,
"\\lim" : "lim" ,
"\\liminf" : "lim inf" ,
"\\limsup" : "lum sup" ,
"\\max" : "max" ,
"\\min" : "min" ,
"\\projlim" : "proj lim" ,
"\\sup" : "sup" ,
"\\underbrace" : null ,
"\\overbrace" : null ,
"\\underline" : null ,
"\\overline" : null ,
}
;
function v_piece_to_mathml (tokens ) {
 var v_token = tokens.list[tokens.index] ;
 var v_result = null ;
 if( ( v_token == "{" ) ) {
  tokens.index++;
   v_result = v_subexpr_chain_to_mathml (tokens , g_hard_stop_tokens
) ;
  if( ( tokens.list[tokens.index] == "}" ) ) {
   tokens.index++;
  }
 }
 else if( ( v_token in g_relation_symbols
) ) {
   v_result = result_element( "mo" ,0 , g_relation_symbols
[ v_token ] ) ;
  tokens.index++;
 }
 else if( ( v_token in g_operator_symbols
) ) {
   v_result = result_element( "mo" ,0 , g_operator_symbols
[ v_token ] ) ;
  tokens.index++;
 }
 else if( ( v_token in g_left_delimiters
) ) {
   v_result = result_element( "mo" ,0 , g_left_delimiters
[ v_token ] ) ;
  tokens.index++;
 }
 else if( ( v_token in g_right_delimiters
) ) {
   v_result = result_element( "mo" ,0 , g_right_delimiters
[ v_token ] ) ;
  tokens.index++;
 }
 else if( ( v_token in g_word_operators
) ) {
   v_result = result_element( "mi" , 1
, "mathvariant" , "normal" , g_word_operators
[ v_token ] ) ;
  tokens.index++;
 }
 else if( ( v_token in g_greek_letters
) ) {
   v_result = result_element( "mi" , 1
, "fontstyle" , "normal" , g_greek_letters
[ v_token ] ) ;
  tokens.index++;
 }
 else if( ( v_token in g_named_identifiers
) ) {
   v_result = result_element( "mi" ,0 , g_named_identifiers
[ v_token ] ) ;
  tokens.index++;
 }
 else if( ( v_token in g_punct_and_space
) ) {
   v_result = result_element( "mtext" ,0 , g_punct_and_space
[ v_token ] ) ;
  tokens.index++;
 }
 else if( ( v_token in g_tex_commands
) ) {
  tokens.index++;
   v_result = g_tex_commands
[ v_token ] (tokens ) ;
 }
 else {
   v_result = result_element( "mn" ,0 , v_token ) ;
  tokens.index++;
 }
 return v_result ;
}
function v_subexpr_to_mathml (tokens ) {
 var v_result = null ;
 var v_mmultiscripts = null ;
 var v_mprescripts = null ;
 if( ( ( tokens.list[tokens.length<=tokens.index+ 0 ? tokens.length-1 : tokens.index+ 0 ]
== "{" )  &&  ( tokens.list[tokens.length<=tokens.index+ 1 ? tokens.length-1 : tokens.index+ 1 ]
== "}" )  &&  ( ( tokens.list[tokens.length<=tokens.index+ 2 ? tokens.length-1 : tokens.index+ 2 ]
== "_" )  ||  ( tokens.list[tokens.length<=tokens.index+ 2 ? tokens.length-1 : tokens.index+ 2 ]
== "^" ) ) ) ) {
   v_mmultiscripts = result_element( "mmultiscripts" ,0) ;
   v_mprescripts = result_element( "mprescripts" ,0) ;
  result_element_append( v_mmultiscripts , v_mprescripts );
  while( ( ( tokens.list[tokens.length<=tokens.index+ 0 ? tokens.length-1 : tokens.index+ 0 ]
== "{" )  &&  ( tokens.list[tokens.length<=tokens.index+ 1 ? tokens.length-1 : tokens.index+ 1 ]
== "}" )  &&  ( ( tokens.list[tokens.length<=tokens.index+ 2 ? tokens.length-1 : tokens.index+ 2 ]
== "_" )  ||  ( tokens.list[tokens.length<=tokens.index+ 2 ? tokens.length-1 : tokens.index+ 2 ]
== "^" ) ) ) ) {
   var v_subscript = null ;
   var v_superscript = null ;
   tokens.index++;
   tokens.index++;
   if( ( tokens.list[tokens.index] == "_" ) ) {
    tokens.index++;
     v_subscript = v_piece_to_mathml (tokens ) ;
   }
   else if( ( tokens.list[tokens.index] == "^" ) ) {
    tokens.index++;
     v_superscript = v_piece_to_mathml (tokens ) ;
   }
   if( ( tokens.list[tokens.index] == "_" ) ) {
    tokens.index++;
     v_subscript = v_piece_to_mathml (tokens ) ;
   }
   else if( ( tokens.list[tokens.index] == "^" ) ) {
    tokens.index++;
     v_superscript = v_piece_to_mathml (tokens ) ;
   }
   result_element_append( v_mmultiscripts , ( ( v_subscript != null ) ? v_subscript : result_element( "none" ,0) ) );
   result_element_append( v_mmultiscripts , ( ( v_superscript != null ) ? v_superscript : result_element( "none" ,0) ) );
  }
 }
 var v_limit_style = ( tokens.list[tokens.index] in g_limit_commands
) ;
 if( ( tokens.list[tokens.index] == null ) ) {
  if( ( v_mmultiscripts != null ) ) {
   result_element_prepend( v_mmultiscripts , result_element( "mrow" ,0) , v_mprescripts );
   return v_mmultiscripts ;
  }
  else {
   return result_element( "mrow" ,0) ;
  }
 }
 else if( ( tokens.list[tokens.index] in g_left_delimiters
) ) {
   v_result = v_heuristic_subexpression (tokens ) ;
 }
 else {
   v_result = v_piece_to_mathml (tokens ) ;
 }
 var v_base = v_result ;
 var v_subscript = null ;
 var v_superscript = null ;
 if( ( tokens.list[tokens.index] == "_" ) ) {
  tokens.index++;
   v_subscript = v_piece_to_mathml (tokens ) ;
 }
 else if( ( tokens.list[tokens.index] == "^" ) ) {
  tokens.index++;
   v_superscript = v_piece_to_mathml (tokens ) ;
 }
 if( ( tokens.list[tokens.index] == "_" ) ) {
  tokens.index++;
   v_subscript = v_piece_to_mathml (tokens ) ;
 }
 else if( ( tokens.list[tokens.index] == "^" ) ) {
  tokens.index++;
   v_superscript = v_piece_to_mathml (tokens ) ;
 }
 if( ( v_mmultiscripts != null ) ) {
  result_element_prepend( v_mmultiscripts , v_base , v_mprescripts );
  result_element_prepend( v_mmultiscripts , ( ( v_subscript != null ) ? v_subscript : result_element( "none" ,0) ) , v_mprescripts );
  result_element_prepend( v_mmultiscripts , ( ( v_superscript != null ) ? v_superscript : result_element( "none" ,0) ) , v_mprescripts );
 }
 while( ( ( tokens.list[tokens.length<=tokens.index+ 0 ? tokens.length-1 : tokens.index+ 0 ]
== "{" )  &&  ( tokens.list[tokens.length<=tokens.index+ 1 ? tokens.length-1 : tokens.index+ 1 ]
== "}" )  &&  ( ( tokens.list[tokens.length<=tokens.index+ 2 ? tokens.length-1 : tokens.index+ 2 ]
== "_" )  ||  ( tokens.list[tokens.length<=tokens.index+ 2 ? tokens.length-1 : tokens.index+ 2 ]
== "^" ) ) ) ) {
  if( ( v_mmultiscripts == null ) ) {
    v_mmultiscripts = result_element( "mmultiscripts" ,0 , v_base ) ;
    v_mprescripts = null ;
   if( ( ( v_superscript != null )  ||  ( v_subscript != null ) ) ) {
    result_element_append( v_mmultiscripts , ( ( v_subscript != null ) ? v_subscript : result_element( "none" ,0) ) );
    result_element_append( v_mmultiscripts , ( ( v_superscript != null ) ? v_superscript : result_element( "none" ,0) ) );
   }
  }
  var v_subscript = null ;
  var v_superscript = null ;
  tokens.index++;
  tokens.index++;
  if( ( tokens.list[tokens.index] == "_" ) ) {
   tokens.index++;
    v_subscript = v_piece_to_mathml (tokens ) ;
  }
  else if( ( tokens.list[tokens.index] == "^" ) ) {
   tokens.index++;
    v_superscript = v_piece_to_mathml (tokens ) ;
  }
  if( ( tokens.list[tokens.index] == "_" ) ) {
   tokens.index++;
    v_subscript = v_piece_to_mathml (tokens ) ;
  }
  else if( ( tokens.list[tokens.index] == "^" ) ) {
   tokens.index++;
    v_superscript = v_piece_to_mathml (tokens ) ;
  }
  result_element_prepend( v_mmultiscripts , ( ( v_subscript != null ) ? v_subscript : result_element( "none" ,0) ) , v_mprescripts );
  result_element_prepend( v_mmultiscripts , ( ( v_superscript != null ) ? v_superscript : result_element( "none" ,0) ) , v_mprescripts );
 }
 if( ( v_mmultiscripts != null ) ) {
   v_result = v_mmultiscripts ;
 }
 else if( ( ( v_subscript != null )  &&  ( v_superscript != null ) ) ) {
   v_result = result_element( ( v_limit_style ? "munderover" : "msubsup" ) ,0 , v_base , v_subscript , v_superscript ) ;
 }
 else if( ( v_subscript != null ) ) {
   v_result = result_element( ( v_limit_style ? "munder" : "msub" ) ,0 , v_base , v_subscript ) ;
 }
 else if( ( v_superscript != null ) ) {
   v_result = result_element( ( v_limit_style ? "mover" : "msup" ) ,0 , v_base , v_superscript ) ;
 }
 return v_result ;
}
function v_subexpr_chain_to_mathml (tokens , v_stop_tokens ) {
 var v_result = null ;
 var v_mrow = null ;
 var v_mfrac = null ;
 var v_wrapped_result = null ;
 while( ( ( tokens.list[tokens.index] != null )  &&  !( ( tokens.list[tokens.index] in v_stop_tokens ) ) ) ) {
  if( ( tokens.list[tokens.index] == "\\over" ) ) {
   tokens.index++;
    v_mfrac = result_element( "mfrac" ,0 , v_result ) ;
    v_wrapped_result = v_mfrac ;
    v_mrow = null ;
    v_result = null ;
  }
  else if( ( tokens.list[tokens.index] == "\\choose" ) ) {
   tokens.index++;
    v_mfrac = result_element( "mfrac" , 1
, "linethickness" , "0" , v_result ) ;
    v_wrapped_result = result_element( "mrow" ,0 , result_element( "mo" ,0 , "(" ) , v_mfrac , result_element( "mo" ,0 , ")" ) ) ;
    v_mrow = null ;
    v_result = null ;
  }
  else {
   var v_node = v_collect_precedence_group (tokens , g_relations_precedence_group
, v_stop_tokens , function(tokens , v_stop_tokens ) { return v_collect_precedence_group (tokens , g_addition_precedence_group
, v_stop_tokens , function(tokens , v_stop_tokens ) { return v_collect_precedence_group (tokens , g_multiplication_precedence_group
, v_stop_tokens , v_collect_invisible_group ) ; } ) ; } ) ;
   if( ( v_mrow != null ) ) {
    result_element_append( v_mrow , v_node );
   }
   else if( ( v_result != null ) ) {
     v_mrow = result_element( "mrow" ,0 , v_result , v_node ) ;
     v_result = v_mrow ;
   }
   else {
     v_result = v_node ;
   }
  }
 }
 if( ( v_mfrac != null ) ) {
  result_element_append( v_mfrac , v_result );
  return v_wrapped_result ;
 }
 else {
  return v_result ;
 }
}
var g_optional_arg_stop_tokens
= { "&" : null ,
"\\\\" : null ,
"}" : null ,
"$" : null ,
"\\end" : null ,
"\\right" : null ,
"\\bigr" : null ,
"\\Bigr" : null ,
"\\biggr" : null ,
"\\Biggr" : null ,
"\\choose" : null ,
"\\over" : null ,
"]" : null ,
}
;
function v_optional_arg_to_mathml (tokens ) {
 if( ( tokens.list[tokens.index] != "[" ) ) {
  return null ;
 }
 tokens.index++;
 var v_result = v_subexpr_chain_to_mathml (tokens , g_optional_arg_stop_tokens
) ;
 if( ( tokens.list[tokens.index] == "]" ) ) {
  tokens.index++;
 }
 return v_result ;
}
var g_hard_stop_tokens
= { "&" : null ,
"\\\\" : null ,
"}" : null ,
"$" : null ,
"\\end" : null ,
"\\right" : null ,
"\\bigr" : null ,
"\\Bigr" : null ,
"\\biggr" : null ,
"\\Biggr" : null ,
"\\choose" : null ,
"\\over" : null ,
}
;
var g_right_delimiter_stop_tokens
= { "&" : null ,
"\\\\" : null ,
"}" : null ,
"$" : null ,
"\\end" : null ,
"\\right" : null ,
"\\bigr" : null ,
"\\Bigr" : null ,
"\\biggr" : null ,
"\\Biggr" : null ,
"\\choose" : null ,
"\\over" : null ,
")" : ")" ,
"]" : "]" ,
"\\}" : "}" ,
"\\rbrace" : "}" ,
"\\rgroup" : ")" ,
"\\rvert" : "|" ,
"\\rVert" : "\u2016" ,
"\\rceil" : "\u2309" ,
"\\rfloor" : "\u230b" ,
"\\rmoustache" : "\u23b1" ,
"\\rangle" : "\u232a" ,
}
;
function v_heuristic_subexpression (tokens ) {
 var v_result = result_element( "mrow" ,0) ;
 result_element_append( v_result , v_piece_to_mathml (tokens ) );
 result_element_append( v_result , v_subexpr_chain_to_mathml (tokens , g_right_delimiter_stop_tokens
) );
 if( ( ( tokens.list[tokens.index] != null )  &&  !( ( tokens.list[tokens.index] in g_hard_stop_tokens
) ) ) ) {
  result_element_append( v_result , v_piece_to_mathml (tokens ) );
 }
 return v_result ;
}
var g_relations_precedence_group
= g_relation_symbols
;
var g_addition_precedence_group
= { "+" : null ,
"-" : null ,
"\\oplus" : null ,
}
;
var g_multiplication_precedence_group
= { "*" : null ,
"\\times" : null ,
"\\cdot" : null ,
"/" : null ,
}
;
function v_collect_precedence_group (tokens , v_operators , v_stop_tokens , v_reader ) {
 var v_result = v_reader (tokens , v_stop_tokens ) ;
 var v_mrow = null ;
 while( ( ( tokens.list[tokens.index] != null )  &&  !( ( tokens.list[tokens.index] in v_stop_tokens ) )  &&  ( tokens.list[tokens.index] in v_operators ) ) ) {
  if( ( v_mrow == null ) ) {
    v_mrow = result_element( "mrow" ,0 , v_result ) ;
    v_result = v_mrow ;
  }
  result_element_append( v_mrow , v_piece_to_mathml (tokens ) );
  if( ( ( tokens.list[tokens.index] != null )  &&  ( tokens.list[tokens.index] in v_stop_tokens ) ) ) {
   return v_result ;
  }
  else {
   result_element_append( v_mrow , v_reader (tokens , v_stop_tokens ) );
  }
 }
 return v_result ;
}
function v_collect_invisible_group (tokens , v_stop_tokens ) {
 var v_result = v_subexpr_to_mathml (tokens ) ;
 var v_mrow = null ;
 while( ( ( tokens.list[tokens.index] != null )  &&  !( ( tokens.list[tokens.index] in v_stop_tokens ) )  &&  ( ( tokens.list[tokens.index] in g_named_identifiers
)  ||  ( tokens.list[tokens.index] in g_left_delimiters
) ) ) ) {
  if( ( v_mrow == null ) ) {
    v_mrow = result_element( "mrow" ,0 , v_result ) ;
    v_result = v_mrow ;
  }
  result_element_append( v_mrow , result_element( "mo" ,0 , "\u2062" ) );
  if( ( ( tokens.list[tokens.index] != null )  &&  ( tokens.list[tokens.index] in v_stop_tokens ) ) ) {
   return v_result ;
  }
  else {
   result_element_append( v_mrow , v_subexpr_to_mathml (tokens ) );
  }
 }
 return v_result ;
}


const tokenize_re = /(\\begin|\\operatorname|\\mathrm|\\mathop|\\end)\s*\{\s*([A-Z a-z]+)\s*\}|(\\[a-zA-Z]+|\\[\\#\{\},:;!])|(\s+)|([0-9\.]+)|([\$!"#%&'()*+,-.\/:;<=>?\[\]^_`\{\|\}~])|([a-zA-Z])/g;

const tokenize_text_re = /[\${}\\]|\\[a-zA-Z]+|[^{}\$]+/g;

const tokenize_text_commands = {
  '\\textrm': 1,
  '\\textsl': 1,
  '\\textit': 1,
  '\\texttt': 1,
  '\\textbf': 1,
  '\\textnormal': 1,
  '\\text': 1,
  '\\hbox': 1,
  '\\mbox': 1
};

function tokenize_latex_math(input)
{
  var result = new Array();
  var in_text_mode = 0;
  var brace_level = [];
  var pos = 0;

  if(input.charAt(0) == '$' && 
     input.charAt(input.length-1) == '$')
    input = input.slice(1, input.length-1);

  while(1) {
    if(!in_text_mode) {
      tokenize_re.lastIndex = pos;
      var m = tokenize_re.exec(input);
      pos = tokenize_re.lastIndex;

      if(m == null) {
        return result;
      } else if(m[1] != null) {
        result.push(m[1], m[2]);
      } else if(m[3] == '\\sp') {
        result.push('^');
      } else if(m[3] == '\\sb') {
        result.push('_');
      } else {
        if(m[0] == '$') {
          in_text_mode = 1;
        } else if(m[4] != null) {
          continue;
        } else if(m[3] != null && m[3] in tokenize_text_commands) {
          in_text_mode = 2;
          brace_level.push(0);
        } 

        result.push(m[0]);
      }
    } else {
      tokenize_text_re.lastIndex = pos;
      var m = tokenize_text_re.exec(input);
      pos = tokenize_text_re.lastIndex;
      
      if(m == null) {
        return result;
      } else if(m[0] == '$') {
        in_text_mode = 0;
      } else if(m[0] == '{') {
        brace_level[brace_level.length-1]++;
      } else if(m[0] == '}') {
        if(--brace_level[brace_level.length-1] <= 0) {
          in_text_mode = 0;
          brace_level.pop();
        }
      }
      result.push(m[0]);
    }
  }
}


function post_process_mathml(event)
{
  var url = GM_getValue('click-post-url', null);
  if(url == null)
    return;

  var ser = new XMLSerializer();
  var xhr = GM_xmlhttpRequest({ 
    method: 'POST',
    url: url,
    headers: { 'Content-Type': 'text/xml; charset=utf-8',
               'Content-Location': document.location },
    data: ser.serializeToString(event.currentTarget),
    onerror: function(details) {
      alert("There was an error processing the request. " +
            "HTTP status code " + details.status + ' ' + details.statusText);
    },
    onload: function(details) {
      window.status = "Successfully posted MathML.  Status: " 
            + details.status + ' ' + details.statusText;
    }});

  window.status = "Posting MathML to " + url + "...";
}


function patch_img(node)
{

    if(node.currentTarget)
    node = node.currentTarget;

  var alt = node.getAttribute('alt');

  if(alt == null || 
     /^\\includegraphics|^\$\\displaystyle \\xymatrix/.test(alt))
    return;

  var latex_string = null;
  
  

  
  if((node.parentNode.tagName == 'DIV' && 
      node.parentNode.getAttribute('CLASS') == 'mathdisplay')
     || (node.parentNode.tagName == 'SPAN' &&
         node.parentNode.getAttribute('CLASS') == 'MATH'))
  {
    var parent = node.parentNode;
    var previous = parent.previousSibling;
    const non_whitespace = /[^\s]/;

        if(previous &&
       previous.nodeType == node.TEXT_NODE &&
       !non_whitespace.test(previous.data))
      previous = previous.previousSibling;

        if(previous &&
       previous.nodeType == node.ELEMENT_NODE &&
       previous.tagName == 'P' &&
       previous.lastChild) 
    {
      previous = previous.lastChild;
      if(previous &&
         previous.nodeType == node.TEXT_NODE &&
         !non_whitespace.test(previous.data))
        previous = previous.previousSibling;
    }

        if(previous &&
       previous.nodeType == node.COMMENT_NODE) {
      latex_string = previous.data.replace(/^\s*MATH\s*/, '')
                                  .replace(/\s+$/, '');
    }
  }


  if(!latex_string && /^\$.+\$$/.test(alt)
     && !(/\.{3} \.{3}/.test(alt)))
  {
    latex_string = alt;
  }

  if(latex_string == null)
    return;

  
  tokens = new Object();
  tokens.list = tokenize_latex_math(latex_string);
  tokens.list.push(null);
  tokens.index = 0;

  var mathml = null;
  try {
    var mrow = v_subexpr_chain_to_mathml(tokens, {});
    fix_mathvariant(mrow, null);

    mathml = document.createElementNS(mmlns, 'math');
    mathml.setAttribute("latex", latex_string);
    mathml.setAttribute("mathvariant", "normal");
    mathml.appendChild(mrow);

    mathml.addEventListener("click", post_process_mathml, false);

  } catch(e) {
    GM_log("Display LaTeX failed with error " + e + " on " + latex_string);
  }

  
  if(mathml == null)
    return;

  node.parentNode.replaceChild(mathml, node);
}


function patch_text(node0) 
{
  var text = node0.nodeValue;
  var results = /\$[^$]+\$|\[tex\](.+?)\[\/tex\]/.exec(text);

  if(results) {
    var latex_string = (results[1] == null ? results[0] : '$'+results[1]+'$');

    
  tokens = new Object();
  tokens.list = tokenize_latex_math(latex_string);
  tokens.list.push(null);
  tokens.index = 0;

  var mathml = null;
  try {
    var mrow = v_subexpr_chain_to_mathml(tokens, {});
    fix_mathvariant(mrow, null);

    mathml = document.createElementNS(mmlns, 'math');
    mathml.setAttribute("latex", latex_string);
    mathml.setAttribute("mathvariant", "normal");
    mathml.appendChild(mrow);

    mathml.addEventListener("click", post_process_mathml, false);

  } catch(e) {
    GM_log("Display LaTeX failed with error " + e + " on " + latex_string);
  }


    if(mathml == null)
      return;

    var node2 = node0.splitText(results.index);
    node2.deleteData(0, results[0].length);
    
    node2.parentNode.insertBefore(mathml, node2);


    patch_text(node2);
  }
}



function patch_element(node)
{
  if(node.nodeType == node.TEXT_NODE)
    patch_text(node);
  else if(node.nodeType == node.ELEMENT_NODE) {    if(node.tagName == 'TEXTAREA' || node.tagName == 'textarea' || 
       node.tagName == 'INPUT' || node.tagName == 'input' || 
       node.tagName == 'SCRIPT' || node.tagName == 'script')
      return;


    if(do_patch_images && (node.tagName == 'IMG' || node.tagName == 'img')) {
      if(!delayed_patch)
        patch_img(node);
      else
        node.addEventListener("click", patch_img, false);

      return;
    }

    var child = node.firstChild;
    while(child) {
      var next = child.nextSibling;
      patch_element(child);
      child = next;
    }
  }
}

var do_patch_images = GM_getValue("patch-images", false);
var delayed_patch = GM_getValue("delayed-patch", false);
patch_element(document.documentElement);

}