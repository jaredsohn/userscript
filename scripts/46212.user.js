// GMC GML Syntax Coloring
// Version 2.1.2!
// January 3, 2010
// Copyright © 2010, Caleb Helbling
//
//	Updates for this version:
//		Switched to GM8 syntax coloring
//		Comments made italic
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools>Greasemonkey>Manage User Scripts,
// select "GMC GML Syntax Coloring", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GMC GML Syntax Coloring
// @description   Colors GML on the Game Maker Community
// @include       http://www.gmc.yoyogames.com/*
// @include       http://gmc.yoyogames.com/*
// ==/UserScript==

var gm8_coloring,guess_prefix,gm_coloring,c_functions,c_resources,line_height,tokens,tokens_regexp,variables,constants,functions,logical,prefix,variables_length,constants_length,functions_length,logical_length,prefix_length,variables_lookup_table,constants_lookup_table,functions_lookup_table,check_token_i,string_to_check_length,get_color_i,test_prefix,browser_class_selection,allcodesections,code_boxes_i,thiscodesection,replacement_text,replacement_div,replacement_text_tokenized,token_replace_i,result,index,first_initeration,token_index,token_type,next_char,end_comment_index,end_string_index,next_token_index,inbetween;

// Attempt to guess if something is a resource by looking for a prefix.
// You can turn this off here by changing this to false
guess_prefix = true;

// Use Game Maker 8 Syntax Coloring
// You can revert this back to GM7 by setting this to false
gm8_coloring = true;

// Keywords: if, else, return, switch, etc.
// Values: Strings; ' and "
// Comment: // and /*
// Constants: c_blue, true, pi, etc.
// Variables: argument0, x, image_angle, etc.
// Functions: point_distance, place_empty, etc.
// Script Names: self explanatory
// Resource Names: self explanatory

var c_keywords,c_values,c_comments,c_constants,c_variables,c_scripts,c_resouces;
if (gm8_coloring===true) {
	c_keywords = '#000080';
	c_values = '#0000FF';
	c_comments = '#008000';
	c_constants = '#800000';
	c_variables = '#800000';
	c_functions = '#800000';
	c_scripts = '#800080';
	c_resources = '#808000';
	line_height = '17px';
} else {
	c_keywords = '#000000';
	c_values = '#000000';
	c_comments = '#008000';
	c_constants = '#800000';
	c_variables = '#0000FF';
	c_functions = '#000080';
	c_scripts = '#800080';
	c_resources = '#800080';
	line_height = '16px';
}

// Ord function
function ord(string) {
	return (string.charCodeAt(0));
}

// Special Characters list:
// 2: Special token that is removed after everything is done
// 6: Token reference point
// 7: >
// 8: <
// 160: Non-breaking space

// Chr function
function chr(string) {
	return (String.fromCharCode(string));
}

// Define tokens
tokens = ["$"," ",".","(",")","\r",";",",",chr(7),chr(8),"=","+","-","*","/","[","]","{","}",":","!","^","&","|","~",'"',"'",chr(160),chr(2)];
tokens_regexp = [/\$/g, / /g, /[.]/g, /[(]/g, /[)]/g, RegExp("\r","g"), /;/g, /,/g, RegExp(chr(7),"g"), RegExp(chr(8),"g"), /\=/g, /[+]/g, /-/g, /[*]/g, /\//g, /\[/g, /\]/g, /\{/g, /\}/g, /:/g, /!/g, /\^/g, /&/g, /\|/g, /~/g, /"/g, /'/g, RegExp(chr(160),"g"), RegExp(chr(2),"g")];

// Define gm stuff
variables = ["background_foreground","path_positionprevious","gamemaker_registered","background_showcolor","background_visible","background_height","background_vtiled","background_vspeed","background_htiled","argument_relative","keyboard_lastchar","working_directory","background_hspeed","timeline_position","gamemaker_version","gravity_direction","program_directory","background_xscale","background_yscale","keyboard_lastkey","background_index","mouse_lastbutton","transition_steps","background_width","background_color","path_orientation","timeline_running","background_alpha","background_blend","current_weekday","room_persistent","transition_kind","keyboard_string","sprite_xoffset","error_occurred","path_endaction","timeline_speed","instance_count","timeline_index","sprite_yoffset","current_second","temp_directory","caption_health","current_minute","gamemaker_pro","current_month","timeline_loop","path_position","caption_score","sprite_height","caption_lives","cursor_sprite","view_hborder","view_current","view_enabled","image_xscale","image_single","room_caption","image_number","view_visible","view_vborder","mouse_button","event_action","current_time","event_number","background_x","background_y","current_hour","current_year","event_object","image_yscale","sprite_width","sprite_index","object_index","keyboard_key","bbox_bottom","view_object","view_vspeed","show_health","view_hspeed","current_day","secure_mode","instance_id","image_speed","room_height","image_index","image_alpha","image_blend","image_angle","view_xport","view_yport","mask_index","view_xview","persistent","path_scale","path_speed","bbox_right","view_yview","path_index","room_speed","view_wview","argument11","argument10","argument14","event_type","error_last","argument15","argument13","argument12","room_width","room_first","view_angle","show_score","view_hport","view_hview","view_wport","show_lives","argument9","xprevious","argument8","argument5","argument2","argument3","argument4","argument6","argument7","bbox_left","yprevious","argument0","argument1","room_last","direction","argument","friction","bbox_top","gravity","visible","mouse_x","game_id","mouse_y","vspeed","health","hspeed","ystart","xstart","depth","score","speed","solid","lives","alarm","room","fps","id","x","y"];
constants = ["ev_global_middle_release","ev_global_right_release","ev_global_middle_button","ev_global_left_release","ev_global_middle_press","ev_global_right_button","ps_deflect_horizontal","ev_global_left_button","ev_global_right_press","ev_joystick2_button4","ev_joystick2_button3","ev_joystick2_button2","ev_joystick2_button5","ev_joystick2_button7","ev_joystick2_button8","ev_joystick2_button1","ps_distr_invgaussian","ev_joystick2_button6","ev_joystick1_button8","ev_joystick1_button3","ev_joystick1_button4","ev_global_left_press","ev_joystick1_button2","ev_joystick1_button1","ev_joystick1_button5","ev_joystick1_button6","ev_joystick1_button7","ev_mouse_wheel_down","ps_deflect_vertical","ev_joystick1_right","ev_joystick2_right","pt_shape_explosion","ps_shape_rectangle","ps_force_quadratic","ev_joystick2_left","ev_middle_release","ev_joystick1_left","ev_global_release","ev_joystick1_down","ev_no_more_health","ev_joystick2_down","ev_mouse_wheel_up","ps_distr_gaussian","ps_force_constant","bm_inv_dest_color","bm_inv_dest_alpha","ps_shape_diamond","ps_change_motion","ev_right_release","bm_src_alpha_sat","bm_inv_src_alpha","bm_inv_src_color","pr_trianglestrip","ev_animation_end","ps_shape_ellipse","ev_no_more_lives","ev_middle_button","ev_close_button","pt_shape_circle","ps_force_linear","ev_global_press","pt_shape_square","pt_shape_sphere","pr_trianglelist","ev_right_button","ev_joystick1_up","ps_change_shape","ps_distr_linear","ev_left_release","ev_joystick2_up","ev_middle_press","vk_printscreen","ev_left_button","pt_shape_spark","ev_end_of_path","ev_step_normal","pt_shape_smoke","pt_shape_pixel","pt_shape_flare","ev_mouse_enter","ev_mouse_leave","pt_shape_cloud","ev_right_press","pr_trianglefan","pt_shape_star","ev_room_start","se_compressor","pt_shape_disk","ps_change_all","ev_keyrelease","ps_shape_line","ev_left_press","pt_shape_ring","pt_shape_line","pt_shape_snow","ev_step_begin","bm_dest_color","bm_dest_alpha","ev_game_start","fa_directory","ef_explosion","pr_pointlist","cr_handpoint","cr_hourglass","cr_size_nwse","ev_no_button","cr_multidrag","cr_size_nesw","pr_linestrip","vk_backspace","ev_collision","se_equalizer","bm_src_alpha","bm_src_color","vk_lcontrol","vk_multiply","cr_size_all","ev_room_end","vk_rcontrol","vk_subtract","vk_pagedown","pr_linelist","fa_volumeid","bm_subtract","fa_readonly","ev_step_end","cr_appstart","ev_boundary","dll_stdcall","ev_keypress","ef_firework","ev_game_end","ev_keyboard","vk_numpad0","vk_numpad4","vk_numpad3","vk_numpad2","fa_archive","fa_sysfile","ef_ellipse","ef_smokeup","se_flanger","vk_control","ev_trigger","vk_decimal","vk_numpad1","cr_default","cr_uparrow","ev_destroy","cr_sqlwait","cr_size_ns","cr_size_we","vk_numpad9","ev_outside","vk_numpad7","vk_numpad8","vk_numpad6","vk_numpad5","bm_normal","vk_pageup","se_chorus","vk_rshift","cr_arrrow","se_gargle","vk_return","se_reverb","vk_divide","vk_escape","vk_insert","vk_delete","ev_create","mb_middle","ty_string","vk_anykey","vk_lshift","c_fuchsia","ev_user10","cr_vsplit","fa_hidden","dll_cdecl","fa_bottom","fa_center","cr_nodrop","fa_middle","ev_user15","cr_hsplit","ev_user14","ev_user13","ev_user12","ev_user11","ev_user9","ev_other","ef_spark","ev_user0","ev_user6","vk_enter","ev_user3","vk_nokey","ev_user2","ev_user4","ev_user5","ev_user8","ev_alarm","ev_user7","c_dkgray","ev_user1","ef_smoke","fa_right","c_orange","cr_cross","ef_flare","c_purple","cr_arrow","vk_right","c_silver","c_yellow","ev_mouse","ef_cloud","c_maroon","vk_space","vk_pause","vk_shift","mb_right","c_ltgray","vk_left","mb_left","ef_rain","vk_lalt","cr_none","vk_down","cr_beam","c_white","mb_none","ty_real","vk_home","cr_help","fa_left","ef_ring","bm_zero","c_black","c_green","ev_draw","ef_snow","se_none","cr_drag","ev_step","vk_ralt","c_olive","ef_star","se_echo","vk_tab","bm_add","vk_add","c_aqua","bm_one","bm_max","vk_alt","c_blue","c_gray","fa_top","c_teal","c_navy","c_lime","vk_end","mb_any","vk_f11","vk_f10","vk_f12","vk_f6","c_red","vk_f7","vk_f9","vk_f5","cr_no","vk_f2","vk_up","vk_f8","false","vk_f3","vk_f1","vk_f4","true","pi"];
functions = ["d3d_model_vertex_normal_texture_color","background_set_alpha_from_background","d3d_transform_set_rotation_axis","d3d_transform_add_rotation_axis","draw_text_ext_transformed_color","d3d_vertex_normal_texture_color","d3d_model_vertex_normal_texture","d3d_set_projection_perspective","d3d_model_vertex_texture_color","background_create_from_surface","d3d_model_vertex_normal_color","draw_background_stretched_ext","background_replace_background","d3d_transform_add_translation","d3d_transform_set_translation","background_create_from_screen","mplay_message_send_guaranteed","export_include_file_location","sprite_set_alpha_from_sprite","action_set_timeline_position","d3d_transform_add_rotation_z","part_system_automatic_update","draw_primitive_begin_texture","ds_grid_multiply_grid_region","d3d_transform_set_rotation_z","d3d_transform_set_rotation_y","action_draw_text_transformed","d3d_transform_set_rotation_x","d3d_transform_add_rotation_x","d3d_transform_add_rotation_y","action_draw_ellipse_gradient","draw_text_transformed_color","ds_priority_change_priority","sound_3d_set_sound_position","sound_3d_set_sound_velocity","action_create_object_random","d3d_transform_stack_discard","action_create_object_motion","d3d_primitive_begin_texture","mouse_check_button_released","part_particles_create_color","sound_3d_set_sound_distance","instance_deactivate_object","d3d_light_define_direction","part_system_automatic_draw","part_destroyer_destroy_all","part_deflector_destroy_all","instance_deactivate_region","variable_global_array2_get","d3d_transform_set_identity","variable_global_array2_set","mouse_check_button_pressed","sound_set_search_directory","background_create_gradient","part_attractor_destroy_all","draw_surface_stretched_ext","sprite_create_from_surface","action_parttype_secondary","d3d_transform_add_scaling","action_draw_gradient_vert","action_replace_background","texture_set_interpolation","variable_global_array_get","action_set_timeline_speed","variable_global_array_set","background_add_background","d3d_model_primitive_begin","d3d_transform_set_scaling","sprite_create_from_screen","variable_local_array2_get","room_set_background_color","draw_sprite_stretched_ext","draw_set_circle_precision","draw_background_tiled_ext","ds_priority_find_priority","draw_text_ext_transformed","ds_grid_value_disk_exists","draw_vertex_texture_color","d3d_transform_stack_clear","draw_background_stretched","d3d_transform_stack_empty","variable_local_array2_set","d3d_vertex_normal_texture","registry_write_string_ext","d3d_set_projection_ortho","window_views_mouse_get_y","ds_priority_delete_value","mp_potential_path_object","mp_potential_step_object","environment_get_variable","d3d_vertex_texture_color","d3d_model_vertex_texture","part_emitter_destroy_all","instance_activate_region","instance_activate_object","draw_background_part_ext","action_draw_gradient_hor","window_views_mouse_get_x","part_changer_destroy_all","highscore_set_background","registry_read_string_ext","d3d_transform_stack_push","window_get_region_height","variable_local_array_set","variable_local_array_get","mp_grid_clear_rectangle","action_partsyst_destroy","d3d_vertex_normal_color","action_partemit_destroy","action_parttype_gravity","d3d_transform_stack_pop","d3d_model_vertex_normal","sprite_add_from_surface","action_draw_life_images","splash_set_close_button","sound_effect_compressor","sound_3d_set_sound_cone","d3d_model_primitive_end","window_view_mouse_get_x","registry_write_real_ext","window_get_region_scale","action_if_previous_room","draw_set_blend_mode_ext","window_get_region_width","ds_grid_add_grid_region","part_attractor_position","part_deflector_friction","draw_background_general","date_get_second_of_year","date_get_minute_of_year","ds_grid_set_grid_region","ds_grid_multiply_region","window_view_mouse_get_y","instance_deactivate_all","background_create_color","d3d_transform_stack_top","window_set_region_scale","keyboard_check_released","action_sprite_transform","d3d_model_vertex_color","display_set_colordepth","action_parttype_create","action_draw_background","action_partsyst_create","sound_background_tempo","sound_effect_equalizer","draw_surface_stretched","sprite_add_from_screen","d3d_light_define_point","part_attractor_destroy","action_partemit_stream","action_partemit_create","action_splash_settings","ds_priority_delete_min","part_destroyer_destroy","part_system_draw_order","keyboard_check_pressed","registry_read_real_ext","sprite_get_bbox_bottom","display_get_colordepth","part_deflector_destroy","ds_priority_delete_max","window_views_mouse_set","d3d_set_projection_ext","action_highscore_clear","variable_global_exists","file_text_write_string","window_set_region_size","draw_surface_tiled_ext","background_get_texture","highscore_set_strings","set_application_title","file_text_read_string","ds_grid_get_disk_mean","part_deflector_exists","background_get_height","date_get_hour_of_year","part_type_orientation","part_deflector_create","timeline_moment_clear","draw_background_tiled","part_destroyer_create","action_parttype_speed","room_set_view_enabled","instance_activate_all","part_deflector_region","action_parttype_color","action_partsyst_clear","file_text_open_append","mp_linear_step_object","date_current_datetime","draw_line_width_color","registry_write_string","date_compare_datetime","mp_potential_settings","variable_local_exists","action_timeline_pause","action_partemit_burst","keyboard_check_direct","window_set_showborder","action_potential_step","sprite_get_bbox_right","action_execute_script","mp_linear_path_object","object_get_persistent","action_timeline_start","action_highscore_show","part_destroyer_region","window_set_fullscreen","highscore_add_current","part_attractor_create","ds_grid_multiply_disk","splash_set_stop_mouse","mp_grid_add_instances","action_replace_sprite","part_attractor_exists","joystick_check_button","draw_sprite_stretched","part_destroyer_exists","part_particles_create","mplay_message_receive","splash_set_fullscreen","mp_grid_add_rectangle","window_view_mouse_set","window_get_showborder","display_set_frequency","cd_set_track_position","sprite_replace_sprite","window_get_fullscreen","draw_sprite_tiled_ext","sprite_collision_mask","draw_surface_part_ext","display_get_frequency","action_draw_rectangle","draw_text_transformed","object_set_persistent","background_get_width","date_create_datetime","part_emitter_destroy","event_perform_object","file_text_open_write","date_datetime_string","date_get_day_of_year","ds_grid_get_disk_sum","keyboard_key_release","tile_layer_delete_at","draw_background_part","mplay_message_player","part_system_position","background_duplicate","part_destroyer_clear","path_get_point_speed","action_kill_position","discard_include_file","part_particles_clear","mplay_connect_status","ds_grid_value_exists","part_particles_count","ds_grid_value_disk_x","ds_priority_find_max","ds_grid_value_disk_y","registry_read_string","action_change_object","ds_map_find_previous","part_attractor_force","action_previous_room","sound_effect_flanger","action_replace_sound","action_path_position","texture_set_blending","ds_grid_get_disk_max","file_text_write_real","keyboard_get_numlock","part_deflector_clear","part_attractor_clear","draw_sprite_part_ext","window_get_stayontop","surface_reset_target","action_draw_variable","sprite_get_bbox_left","draw_surface_general","ds_priority_find_min","window_get_showicons","color_get_saturation","splash_set_interrupt","mplay_session_create","draw_roundrect_color","action_parttype_life","draw_primitive_begin","part_changer_destroy","window_set_stayontop","action_timeline_stop","mplay_session_status","texture_set_priority","window_set_showicons","window_set_rectangle","keyboard_set_numlock","string_lettersdigits","action_create_object","set_program_priority","ds_grid_get_disk_min","highscore_set_border","draw_rectangle_color","highscore_set_colors","draw_background_ext","action_another_room","action_if_collision","draw_triangle_color","part_changer_region","part_changer_exists","timeline_moment_add","window_get_sizeable","tile_set_background","action_set_timeline","ds_priority_destroy","part_deflector_kind","draw_set_blend_mode","part_changer_create","part_emitter_create","draw_vertex_texture","action_set_friction","draw_text_ext_color","file_bin_write_byte","mplay_message_value","action_if_next_room","draw_sprite_general","registry_write_real","part_emitter_exists","d3d_primitive_begin","action_draw_ellipse","effect_create_above","variable_global_get","variable_global_set","set_synchronization","message_input_color","action_current_room","sprite_get_bbox_top","room_set_persistent","message_button_font","d3d_set_perspective","d3d_model_ellipsoid","sound_effect_chorus","font_replace_sprite","collision_rectangle","window_set_position","filename_change_ext","action_reverse_xdir","action_restart_game","splash_set_stop_key","splash_set_position","sound_effect_reverb","sound_effect_gargle","sound_global_volume","message_mouse_color","file_text_open_read","window_set_sizeable","action_timeline_set","part_system_destroy","tile_get_background","surface_get_texture","mplay_message_count","room_set_background","mplay_message_clear","date_valid_datetime","effect_create_below","display_mouse_get_y","action_reverse_ydir","display_mouse_get_x","part_emitter_region","part_emitter_stream","part_type_color_mix","part_type_color_hsv","part_type_color_rgb","file_text_read_real","registry_exists_ext","action_splash_video","export_include_file","action_move_contact","background_get_name","room_instance_clear","action_splash_image","action_sprite_color","part_type_direction","mplay_session_join","message_background","mplay_session_mode","ds_grid_add_region","mplay_session_name","message_input_font","keyboard_unset_map","ds_list_find_value","window_set_caption","action_draw_sprite","ds_grid_set_region","window_mouse_get_y","mplay_message_send","mplay_message_name","ds_priority_create","mp_grid_clear_cell","move_contact_solid","mouse_check_button","move_outside_solid","move_towards_point","ds_list_find_index","keyboard_key_press","mplay_session_find","ini_section_delete","set_automatic_draw","d3d_set_projection","show_debug_message","d3d_model_cylinder","splash_set_caption","d3d_draw_ellipsoid","joystick_direction","window_set_visible","object_event_clear","variable_local_set","variable_local_get","room_goto_previous","action_move_random","d3d_vertex_texture","clipboard_set_text","clipboard_has_text","texture_get_height","surface_set_target","action_set_caption","texture_set_repeat","action_set_gravity","action_splash_text","surface_get_height","background_replace","sprite_get_texture","clipboard_get_text","sprite_get_xoffset","sprite_get_yoffset","string_replace_all","action_draw_health","date_days_in_month","highscore_set_font","part_emitter_burst","action_if_variable","distance_to_object","registry_read_real","part_emitter_clear","object_get_visible","object_is_ancestor","draw_surface_tiled","draw_primitive_end","part_changer_clear","part_changer_types","draw_ellipse_color","action_if_question","window_get_visible","display_get_height","ini_section_exists","window_get_caption","file_bin_read_byte","highscore_show_ext","path_set_precision","path_get_precision","object_set_visible","part_system_update","part_system_create","action_kill_object","action_linear_step","window_mouse_get_x","part_system_exists","part_system_drawit","instance_furthest","font_get_fontname","get_save_filename","instance_position","get_directory_alt","file_write_string","file_text_writeln","file_bin_position","room_instance_add","sprite_get_number","sprite_get_height","sprite_save_strip","sprite_set_offset","string_height_ext","sprite_add_sprite","splash_show_video","sound_get_preload","splash_set_border","splash_set_cursor","splash_show_image","surface_copy_part","surface_get_width","transition_exists","window_get_cursor","window_get_height","window_set_cursor","transition_define","timeline_get_name","surface_save_part","texture_get_width","tile_layer_delete","tile_set_position","sound_effect_echo","screen_wait_vsync","mplay_session_end","mplay_player_name","object_get_parent","object_get_sprite","object_set_parent","mplay_player_find","mplay_init_serial","move_bounce_solid","mp_grid_clear_all","mp_potential_path","mp_potential_step","object_set_sprite","part_changer_kind","path_delete_point","path_insert_point","registry_set_root","room_tile_add_ext","path_clear_points","path_change_point","part_system_clear","part_system_depth","part_type_destroy","part_type_gravity","message_text_font","get_open_filename","d3d_draw_cylinder","collision_ellipse","d3d_model_destroy","d3d_primitive_end","date_compare_time","d3d_vertex_normal","cd_track_position","background_exists","action_show_video","action_set_vspeed","action_splash_web","action_sprite_set","background_delete","background_assign","date_current_date","date_current_time","ds_map_find_first","draw_vertex_color","ds_priority_write","ds_map_find_value","ds_priority_clear","ds_priority_empty","draw_surface_part","draw_sprite_tiled","display_get_width","date_days_in_year","display_mouse_set","distance_to_point","draw_circle_color","action_set_motion","date_compare_date","action_move_start","action_if_aligned","action_fullscreen","action_path_speed","action_draw_arrow","action_set_cursor","action_draw_score","action_set_hspeed","action_cd_playing","action_set_health","action_cd_present","action_move_point","draw_sprite_part","draw_point_color","parameter_string","object_set_solid","object_get_solid","object_set_depth","draw_surface_ext","draw_clear_alpha","action_draw_text","display_set_size","directory_create","date_time_string","date_second_span","date_minute_span","directory_exists","window_mouse_set","window_set_color","display_test_all","object_get_depth","action_end_sound","mplay_message_id","ds_map_find_last","action_draw_life","message_position","mouse_wheel_down","keyboard_set_map","ds_map_find_next","joystick_buttons","joystick_has_pov","keyboard_get_map","action_cd_resume","move_contact_all","move_outside_all","ds_grid_multiply","ds_grid_get_mean","ds_grid_add_disk","object_event_add","part_type_alpha1","ds_grid_set_disk","mp_grid_add_cell","mplay_data_write","mplay_init_modem","mplay_init_tcpip","action_draw_line","part_type_color3","splash_set_color","splash_set_adapt","splash_set_scale","splash_show_text","collision_circle","action_load_game","sound_effect_set","d3d_model_vertex","window_get_color","d3d_model_create","d3d_light_enable","sprite_duplicate","sprite_get_width","tile_layer_depth","tile_layer_shift","tile_set_visible","action_show_info","tile_get_visible","action_set_alarm","string_width_ext","action_next_room","action_save_game","surface_getpixel","show_message_ext","action_inherited","path_get_point_x","date_get_weekday","path_get_point_y","position_destroy","position_meeting","part_type_sprite","part_type_exists","part_type_alpha3","part_type_color1","part_type_color2","action_set_score","window_get_width","date_date_string","d3d_vertex_color","room_set_caption","d3d_set_lighting","screen_save_part","action_if_object","ds_priority_copy","action_if_health","date_create_time","date_create_date","action_if_number","part_type_alpha2","part_type_create","ds_priority_size","external_define6","external_define5","ds_priority_read","ds_queue_enqueue","ds_stack_destroy","file_read_string","external_define4","external_define3","ds_queue_dequeue","external_define0","external_define1","ds_set_precision","file_open_append","external_define2","external_define7","instance_destroy","file_bin_rewrite","ini_write_string","file_text_readln","instance_nearest","ds_queue_destroy","external_define8","ds_grid_get_sum","tile_layer_hide","draw_background","tile_layer_find","ds_grid_get_min","action_set_life","action_snapshot","tile_get_xscale","date_valid_date","date_month_span","part_type_alpha","mplay_ipaddress","ini_read_string","tile_layer_show","tile_get_height","date_valid_time","display_set_all","draw_line_width","object_set_mask","event_inherited","parameter_count","highscore_value","object_get_mask","timeline_exists","draw_text_color","timeline_delete","draw_sprite_ext","part_type_blend","tile_set_region","mplay_player_id","object_get_name","ds_grid_get_max","highscore_clear","ds_grid_destroy","draw_set_valign","draw_set_halign","draw_line_color","part_type_death","file_text_close","room_set_height","d3d_set_shading","room_tile_clear","file_write_real","splash_show_web","cd_track_length","font_add_sprite","file_open_write","sprite_get_name","cd_set_position","script_get_name","script_get_text","d3d_model_floor","event_inherited","d3d_model_clear","d3d_model_block","sound_isplaying","color_get_value","splash_set_main","collision_point","d3d_set_culling","splash_set_size","color_get_green","instance_sprite","registry_exists","file_find_close","part_type_speed","file_find_first","font_get_italic","path_get_closed","part_type_shape","part_type_scale","part_type_color","texture_preload","date_inc_second","date_inc_minute","path_get_length","path_get_number","point_direction","position_change","random_get_seed","random_set_seed","date_get_minute","path_set_closed","ds_stack_create","date_get_second","background_name","background_save","part_type_clear","tile_get_yscale","ds_list_destroy","external_define","instance_create","ds_queue_create","window_set_size","mp_grid_destroy","ds_priority_add","joystick_exists","action_path_end","ds_list_replace","action_end_game","action_if_score","message_caption","action_if_mouse","action_if_empty","action_if_sound","instance_change","ds_list_shuffle","ds_grid_shuffle","move_bounce_all","instance_number","instance_exists","ds_grid_value_x","ds_grid_value_y","mplay_data_read","file_attributes","action_cd_pause","execute_program","mplay_data_mode","file_find_next","d3d_model_cone","file_text_eoln","date_hour_span","action_cd_play","d3d_model_wall","path_add_point","surface_exists","external_call6","make_color_hsv","path_get_speed","surface_create","font_get_first","make_color_rgb","d3d_draw_block","external_call5","background_add","part_type_step","external_call8","texture_exists","date_inc_month","action_if_dice","sound_get_name","tile_delete_at","action_webpage","sound_get_kind","ds_map_destroy","part_type_size","message_button","external_call7","ds_stack_write","part_type_life","d3d_draw_floor","external_call4","date_get_month","file_read_real","ds_map_replace","d3d_model_load","filename_drive","room_goto_next","keyboard_clear","execute_string","keyboard_check","d3d_model_save","screen_refresh","splash_set_top","collision_line","script_execute","room_set_width","ds_stack_empty","room_duplicate","sprite_replace","external_call2","color_get_blue","action_cd_stop","string_replace","instance_place","file_open_read","external_call3","point_distance","external_call1","sound_stop_all","string_char_at","d3d_model_draw","external_call0","position_empty","string_letters","d3d_set_hidden","path_duplicate","draw_healthbar","draw_get_color","draw_highscore","tile_set_blend","mp_linear_step","action_message","ds_list_delete","ini_key_delete","ds_queue_clear","mouse_wheel_up","window_default","tile_set_alpha","ds_queue_write","ds_list_create","tile_set_depth","action_move_to","highscore_show","ds_list_insert","tile_set_scale","highscore_name","mp_grid_create","timeline_clear","mp_linear_path","draw_roundrect","draw_rectangle","draw_set_alpha","draw_set_color","ds_queue_empty","ini_key_exists","draw_get_alpha","ini_write_real","date_week_span","file_bin_close","tile_get_alpha","tile_get_width","action_if_life","ds_grid_resize","ds_stack_clear","mplay_init_ipx","tile_get_depth","ds_grid_height","date_leap_year","date_year_span","tile_get_blend","ds_grid_create","joystick_vpos","screen_redraw","sound_restore","joystick_upos","sound_replace","draw_text_ext","room_tile_add","action_bounce","joystick_ypos","ds_queue_read","room_previous","sprite_delete","ds_queue_size","sprite_exists","ds_queue_head","sprite_assign","room_set_view","file_bin_open","joystick_zpos","room_set_code","joystick_xpos","script_exists","color_get_red","joystick_axes","show_menu_pos","color_get_hue","timeline_name","object_delete","ds_stack_push","show_question","ds_stack_read","ds_grid_write","file_bin_seek","ds_grid_clear","show_question","ds_grid_width","event_perform","irandom_range","joystick_name","ds_stack_size","joystick_rpos","draw_triangle","d3d_draw_cone","ds_list_clear","d3d_set_depth","file_bin_size","file_text_eof","sound_discard","object_exists","external_free","ini_read_real","date_day_span","draw_getpixel","ds_queue_tail","ds_list_write","date_get_week","highscore_add","ds_map_delete","execute_shell","string_repeat","ds_map_create","action_effect","path_set_kind","window_center","path_get_name","ds_queue_copy","ds_map_exists","message_alpha","display_reset","font_get_last","tile_get_left","d3d_draw_wall","date_get_year","path_get_kind","window_handle","font_get_name","date_inc_hour","get_directory","cd_close_door","ds_list_empty","filename_path","date_inc_year","date_is_today","place_meeting","font_get_size","filename_name","room_get_name","ds_stack_copy","instance_find","instance_copy","date_get_hour","date_inc_week","string_insert","string_height","string_length","font_get_bold","place_snapped","keyboard_wait","draw_set_font","string_digits","string_delete","string_format","external_call","action_sound","effect_clear","surface_save","surface_copy","cd_open_door","string_count","action_color","sprite_merge","timeline_add","execute_file","string_lower","string_upper","window_get_x","sound_volume","window_get_y","surface_free","string_width","action_sleep","tile_get_top","date_get_day","mp_grid_draw","file_writeln","mp_grid_path","ds_list_read","font_replace","move_contact","ds_list_size","date_inc_day","ds_list_copy","ds_grid_read","filename_ext","draw_surface","draw_ellipse","filename_dir","date_time_of","game_restart","room_restart","ds_grid_copy","ds_list_sort","ds_stack_pop","ds_map_write","date_date_of","random_range","path_reverse","ds_stack_top","sound_delete","ds_map_empty","message_size","show_message","ds_map_clear","joystick_pov","sound_exists","show_message","file_delete","get_integer","MCI_command","place_empty","action_snap","tile_delete","path_delete","path_append","draw_button","path_exists","file_exists","tile_exists","path_assign","path_mirror","path_rotate","ds_grid_set","merge_color","ds_map_copy","mouse_clear","move_bounce","action_font","lengthdir_y","ds_map_size","ds_map_read","lengthdir_x","move_random","move_random","ds_grid_add","draw_vertex","object_name","draw_sprite","ds_grid_get","font_exists","action_move","action_path","ds_list_add","draw_circle","action_wrap","file_rename","sprite_name","file_readln","screen_save","script_name","d3d_set_fog","sprite_save","font_delete","string_copy","room_exists","room_assign","cd_position","draw_clear","cd_present","draw_point","show_error","file_close","sprite_add","cd_playing","show_image","tile_get_x","tile_get_y","object_add","event_user","get_string","d3d_vertex","draw_arrow","sound_fade","path_scale","sound_play","path_get_y","sound_stop","path_shift","path_start","sound_loop","place_free","sound_name","string_pos","make_color","path_get_x","mouse_wait","ds_map_add","motion_set","motion_add","show_video","show_text","room_goto","io_handle","is_string","show_menu","draw_text","sound_pan","d3d_start","mplay_end","load_info","action_if","show_info","room_next","ini_close","move_snap","move_wrap","room_name","sound_add","cd_resume","get_color","path_name","randomize","file_eoln","game_save","tile_find","game_load","cd_length","path_flip","disk_free","draw_line","disk_size","file_copy","cd_number","draw_path","cd_paused","font_name","path_add","game_end","tile_add","font_add","path_end","cd_pause","room_add","radtodeg","cd_track","io_clear","ini_open","file_eof","degtorad","arctan2","cd_stop","is_real","cd_init","cd_play","d3d_end","irandom","median","random","string","arctan","arccos","arcsin","choose","power","sleep","round","floor","log10","real","frac","sign","log2","ceil","max3","logn","mean","sqrt","min3","ord","abs","chr","exp","tan","sqr","sin","max","cos","min","ln"];
logical = ["if","else","or","and","for","global","while","repeat","return","not","local","do","until","begin","end","switch","case","break","default","xor","mod","div","var","with","other","self","all","noone","continue","exit","then"];
prefix = ["spr","snd","bg","bk","bac","rm","pt","pth","scr","fnt","tml","tl","obj","rm"];

variables_length = variables.length;
constants_length = constants.length;
functions_length = functions.length;
logical_length = logical.length;
prefix_length = prefix.length;

// Lookup tables refer to the last character length
variables_lookup_table = [155,155,153,152,151,150,144,139,134,131,116,88,74,51,43,32,28,18,4,3,3,1,-1];
constants_lookup_table = [282,282,282,281,281,280,267,249,223,189,157,132,113,98,83,70,56,45,33,28,26,8,5,2,0,-1];
functions_lookup_table = [1247,1247,1247,1246,1236,1226,1221,1214,1207,1194,1158,1125,1075,1022,919,805,687,569,467,382,303,235,169,138,104,83,56,41,30,16,9,6,1,1,1,1,1,0,-1];

/*
	getElementsByClassName Internet Explorer Alternative
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName_alt = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};



// Check if a string is indeed a token
function check_token(token_to_check) {
	for (check_token_i=0; check_token_i < tokens.length; check_token_i++) {
		if (token_to_check==tokens[check_token_i]) {
			return (true);
		}
	}
	
	return (false);
}

// Get the correct color
function get_color(string_to_check) {
	string_to_check_length = string_to_check.length;
	
	// Variable Check
	if (string_to_check_length<22 && string_to_check_length>0 && string_to_check_length!=19) {
		for (get_color_i = (variables_lookup_table[string_to_check_length+1]+1); get_color_i<=variables_lookup_table[string_to_check_length]; get_color_i++) {
			if (string_to_check==variables[get_color_i]) {
				return ('<span style="color:'+c_variables+';">'+string_to_check+'</span>');
			}
		}
	}
	
	// Constants Check
	if (string_to_check_length<25 && string_to_check_length>1 && string_to_check_length!=3 && string_to_check_length!=1) {
		for (get_color_i = (constants_lookup_table[string_to_check_length+1]+1); get_color_i<=constants_lookup_table[string_to_check_length]; get_color_i++) {
			if (string_to_check==constants[get_color_i]) {
				return ('<span style="color:'+c_constants+';">'+string_to_check+'</span>');
			}
		}
	}
	
	// Functions
	if (string_to_check_length<38 && string_to_check_length>1 && !(string_to_check_length>31 && string_to_check_length<36)) {
		for (get_color_i = (functions_lookup_table[string_to_check_length+1]+1); get_color_i<=functions_lookup_table[string_to_check_length]; get_color_i++) {
			if (string_to_check==functions[get_color_i]) {
				return ('<span style="color:'+c_functions+';">'+string_to_check+'</span>');
			}
		}
	}
	
	// Keywords (Logical)
	for (get_color_i = 0; get_color_i<logical_length; get_color_i++) {
		if (string_to_check==logical[get_color_i]) {
			return ('<span style="font-weight:bold;color:'+c_keywords+';">'+string_to_check+'</span>');
		}
	}
	
	if (guess_prefix === true) {	
		for (get_color_i = 0; get_color_i<prefix_length; get_color_i++) {
			test_prefix = string_to_check.substring(0,string_to_check.indexOf("_"));
			if (test_prefix == prefix[get_color_i]) {
				if (test_prefix === 'scr') {
					return ('<span style="color:'+c_scripts+'">'+string_to_check+'</span>');
				}
				return ('<span style="color:'+c_resources+';">'+string_to_check+'</span>');
			}
		}
	}
	
	return (string_to_check);
}


// Check if the Rich Text Editor is being used
var rich_text,test_element;
rich_text = false;
test_element = document.getElementById('ed-0_wysiwyg_used');
if (test_element!==null) {
	if (test_element.getAttribute('value')==1) {
		rich_text = true;
	}
}

if (rich_text===false) {

// Begin Actual Procedure

if (document.getElementsByClassName) {
	browser_class_selection = true;
} else {
	browser_class_selection = false;
}

// Check if we can use the native browser function
if (browser_class_selection === true) {
	// Get all code boxes
	allcodesections = document.getElementsByClassName('codemain');
} else {
	// Use alternative for IE and FF2
	allcodesections = getElementsByClassName_alt('codemain','div');
}

// Loop through codeboxes
for (code_boxes_i=0; code_boxes_i < allcodesections.length; code_boxes_i++) {
	// Get the current code section
	thiscodesection = allcodesections[code_boxes_i];
	
	// Get the unchanged codebox text
	replacement_text = thiscodesection.innerHTML;
	
	replacement_text = replacement_text.replace(/<!--ec1-->/,"");
	replacement_text = replacement_text.replace(/<!--c1-->/,"");
	replacement_text = replacement_text.replace(/<!--c2-->/,"");
	replacement_text = replacement_text.replace(/<br>/gi,"\r");
	replacement_text = replacement_text.replace(/<br \/>/gi,"\r");
	replacement_text = replacement_text.replace(/&gt;/gi,chr(7));
	replacement_text = replacement_text.replace(/&lt;/gi,chr(8));
	replacement_text = replacement_text.replace(/&nbsp;/gi,chr(160));
	replacement_text = replacement_text.replace(/&amp;/gi,"&");
	replacement_text = replacement_text.replace(/ /g,chr(160));
	
	// Check if styles arn't already applied
	if (replacement_text.indexOf('<')==-1 && replacement_text.indexOf("//@codeoff=true\r")==-1) { 
	
	// Create the replacement element
	replacement_div = document.createElement("div");
	
	replacement_text = ' '+replacement_text+' ';
	
	replacement_text_tokenized = replacement_text;
	// Run through the codebox and replace tokens with a single character. Used for reference only
	for (token_replace_i = 0; token_replace_i < tokens.length; token_replace_i++) {
		replacement_text_tokenized = replacement_text_tokenized.replace(tokens_regexp[token_replace_i], chr(6));
	}

	// Create the replacement div
	replacement_div = document.createElement("div");
	
	result = "";
	
	index = 0;
	first_initeration = true;
	while (index<replacement_text.length) {
		token_index = replacement_text_tokenized.indexOf(chr(6),index);		
		token_type = replacement_text.charAt(index);
		next_char = replacement_text.charAt(token_index+1);
		
		if (token_type=="/" && (next_char=="*" || next_char=="/")) {
			// Multi-line comment
			if (next_char=="*") {
				end_comment_index = replacement_text.indexOf("*/",token_index);

				if (end_comment_index==-1) {
					end_comment_index = replacement_text.length-1;
					index = replacement_text.length;
				} else {
					index = end_comment_index+2;
				}
				replacement_text = replacement_text.substring(0,end_comment_index+2)+chr(2)+replacement_text.substring(end_comment_index+2,replacement_text.length);
				replacement_text_tokenized = replacement_text_tokenized.substring(0,end_comment_index+2)+chr(6)+replacement_text_tokenized.substring(end_comment_index+2,replacement_text.length);

				//alert("|"+'<span style="color:'+c_comments+';">'+replacement_text.substring(token_index,end_comment_index+2)+'</span>'+"|");
				result += '<span style="color:'+c_comments+';font-style:italic;">'+replacement_text.substring(token_index,end_comment_index+2)+'</span>';

			} else {
				// Single Line commnet
				if (next_char=="/") {
					end_comment_index = replacement_text.indexOf("\r",token_index);
				
					if (end_comment_index==-1) {
						end_comment_index = replacement_text.length-1;
						index = replacement_text.length;
					} else {
						index = end_comment_index;
					}
				
					//alert("|"+'<span style="color:'+c_comments+';">'+replacement_text.substring(token_index, end_comment_index)+'</span>'+"|");
					result += '<span style="color:'+c_comments+';font-style:italic;">'+replacement_text.substring(token_index, end_comment_index)+'</span>';
				}
			}
		} else {
			// " String
			if (token_type=='"') {
				end_string_index = replacement_text.indexOf('"',token_index+1);
				
				if (end_string_index==-1) {
					end_string_index = replacement_text.length-1;
				}
				
				result += '<span style="color:'+c_values+';">'+replacement_text.substring(token_index, end_string_index+1)+'</span>';
				index = end_string_index+1;
			} else {
				// ' String
				if (token_type=="'") {
					end_string_index = replacement_text.indexOf("'",token_index+1);
				
					if (end_string_index==-1) {
						end_string_index = replacement_text.length-1;
					}
				
					result += '<span style="color:'+c_values+';">'+replacement_text.substring(token_index, end_string_index+1)+'</span>';
					index = end_string_index+1;
				} else {
					// Everything else
					next_token_index = replacement_text_tokenized.indexOf(chr(6),index+1);
		
					if (next_token_index==-1) {
						next_token_index = replacement_text.length-1;
					}
		
					if (token_index == (next_token_index-1)) {
						if (token_type=="." || token_type==";" || token_type==":" || token_type=="!") {
							token_type = '<span style="font-weight:bold;">'+token_type+'</span>';
						}
						
						if (token_type=="{" || token_type=="}") {
							if (gm8_coloring===false) {
								token_type = '<span style="font-weight:bold;">'+token_type+'</span>';
							} else {
								token_type = '<span style="font-weight:bold;color:'+c_keywords+';">'+token_type+'</span>';
							}
						}
						
						result += token_type;
						index += 1;
					} else {
						if (token_type=="." || token_type==";" || token_type==":" || token_type=="!") {
							token_type = '<span style="font-weight:bold;">'+token_type+'</span>';
						}
						
						if (token_type=="{" || token_type=="}") {
							if (gm8_coloring===false) {
								token_type = '<span style="font-weight:bold;">'+token_type+'</span>';
							} else {
								token_type = '<span style="font-weight:bold;color:'+c_keywords+';">'+token_type+'</span>';
							}
						}
						
						result += token_type;
						inbetween = replacement_text.substring(index+1,next_token_index);
						index += (1+inbetween.length);
						inbetween = get_color(inbetween);
						//alert('|'+inbetween+'|');
						result += inbetween;
					}
				}
			}
		}
	}
	
	replacement_text = result;
	replacement_text = replacement_text.substring(1,replacement_text.length-1);
	
	replacement_text = replacement_text.replace(/&/g, "&amp;");
	replacement_text = replacement_text.replace(RegExp("\r","g"),"<br>");
	replacement_text = replacement_text.replace(RegExp(chr(7),"g"),"&gt;");
	replacement_text = replacement_text.replace(RegExp(chr(8),"g"),"&lt;");
	replacement_text = replacement_text.replace(RegExp(chr(2),"g"),"");
	
	// Finilize the replacement text
	replacement_text = '<div class="codemain" style="color:#000;background-color:#FFF;line-height:'+line_height+';font-size:13px;font-family:\'Courier New\'">' + replacement_text + '</div>';

	// Set it to the inner html
	replacement_div.innerHTML = replacement_text;

	// Actually Replace
	thiscodesection.parentNode.replaceChild(replacement_div, thiscodesection);
	}
}

}