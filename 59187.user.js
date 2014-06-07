// VCH GML Syntax Coloring
// Version 2.1!
// August 4, 2009
// Copyright © 2009, Caleb Helbling
//
//	Updates for this version:
//		Fixed bugs where keywords were being displayed as constants
//
//		WARNING: Because this script interferes with the Rich Text Editor, you won't see your
//		code colored if you preview it in Rich Text Editor mode.
//		If you want to see colored code, use the standard editor, available to change in your control panel.
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "VCH GML Syntax Coloring", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          VCH GML Syntax Coloring
// @description   Colors GML on the Velkej Chytrák Community
// @include       http://www.forum.velkejchytrak.cz/*
// @include       http://forum.velkejchytrak.cz/*
// ==/UserScript==

var gm8_coloring,guess_prefix,gm_coloring,c_functions,c_resources,line_height,tokens,tokens_regexp,variables,constants,functions,logical,prefix,variables_length,constants_length,functions_length,logical_length,prefix_length,variables_lookup_table,constants_lookup_table,functions_lookup_table,check_token_i,string_to_check_length,get_color_i,test_prefix,browser_class_selection,allcodesections,code_boxes_i,thiscodesection,replacement_text,replacement_div,replacement_text_tokenized,token_replace_i,result,index,first_initeration,token_index,token_type,next_char,end_comment_index,end_string_index,next_token_index,inbetween;

// Attempt to guess if something is a resource by looking for a prefix.
// You can turn this off here by changing this to false
guess_prefix = true;

// Use Game Maker 8 Syntax Coloring
// You can revert this back to GM7 by setting this to false
gm8_coloring = false;

// Keywords: if, else, return, switch, etc.
// Values: Strings; ' and "
// Comment: // and /*
// Constants: c_blue, true, pi, etc.
// Variables: argument0, x, image_angle, etc. DONE
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
functions = ["d3d_model_vertex_normal_texture_color","background_set_alpha_from_background","d3d_model_vertex_normal_texture","d3d_vertex_normal_texture_color","d3d_transform_add_rotation_axis","d3d_transform_set_rotation_axis","draw_text_ext_transformed_color","d3d_set_projection_perspective","d3d_model_vertex_texture_color","background_create_from_surface","d3d_model_vertex_normal_color","background_create_from_screen","background_replace_background","d3d_transform_add_translation","mplay_message_send_guaranteed","draw_background_stretched_ext","d3d_transform_set_translation","export_include_file_location","ds_grid_multiply_grid_region","part_system_automatic_update","d3d_transform_add_rotation_z","action_set_timeline_position","draw_primitive_begin_texture","d3d_transform_add_rotation_y","d3d_transform_set_rotation_x","d3d_transform_set_rotation_y","d3d_transform_set_rotation_z","action_draw_text_transformed","d3d_transform_add_rotation_x","sprite_set_alpha_from_sprite","action_draw_ellipse_gradient","sound_3d_set_sound_position","mouse_check_button_released","sound_3d_set_sound_distance","draw_text_transformed_color","part_particles_create_color","ds_priority_change_priority","sound_3d_set_sound_velocity","d3d_transform_stack_discard","d3d_primitive_begin_texture","action_create_object_random","action_create_object_motion","background_create_gradient","variable_global_array2_set","variable_global_array2_get","sprite_create_from_surface","sound_set_search_directory","d3d_transform_set_identity","instance_deactivate_object","d3d_light_define_direction","draw_surface_stretched_ext","part_system_automatic_draw","mouse_check_button_pressed","part_attractor_destroy_all","instance_deactivate_region","part_deflector_destroy_all","part_destroyer_destroy_all","draw_background_tiled_ext","draw_background_stretched","draw_set_circle_precision","draw_text_ext_transformed","sprite_create_from_screen","action_replace_background","background_add_background","action_parttype_secondary","action_draw_gradient_vert","d3d_transform_stack_clear","d3d_transform_set_scaling","d3d_transform_add_scaling","action_set_timeline_speed","texture_set_interpolation","draw_vertex_texture_color","d3d_vertex_normal_texture","d3d_transform_stack_empty","d3d_model_primitive_begin","draw_sprite_stretched_ext","ds_priority_find_priority","variable_local_array2_get","registry_write_string_ext","variable_global_array_set","variable_global_array_get","variable_local_array2_set","room_set_background_color","ds_grid_value_disk_exists","d3d_model_vertex_texture","mp_potential_path_object","ds_priority_delete_value","environment_get_variable","action_draw_gradient_hor","d3d_vertex_texture_color","window_views_mouse_get_x","d3d_set_projection_ortho","d3d_transform_stack_push","mp_potential_step_object","part_changer_destroy_all","window_views_mouse_get_y","instance_activate_region","variable_local_array_get","variable_local_array_set","instance_activate_object","draw_background_part_ext","registry_read_string_ext","part_emitter_destroy_all","window_get_region_height","highscore_set_background","background_create_color","d3d_model_vertex_normal","action_draw_life_images","splash_set_close_button","part_attractor_position","d3d_model_primitive_end","window_set_region_scale","window_get_region_scale","draw_set_blend_mode_ext","draw_background_general","instance_deactivate_all","ds_grid_add_grid_region","ds_grid_set_grid_region","keyboard_check_released","registry_write_real_ext","window_get_region_width","sound_3d_set_sound_cone","d3d_vertex_normal_color","d3d_transform_stack_top","d3d_transform_stack_pop","date_get_minute_of_year","date_get_second_of_year","part_deflector_friction","sound_effect_compressor","mp_grid_clear_rectangle","ds_grid_multiply_region","window_view_mouse_get_y","window_view_mouse_get_x","action_partemit_destroy","action_partsyst_destroy","sprite_add_from_surface","action_if_previous_room","action_sprite_transform","action_parttype_gravity","sound_effect_equalizer","sprite_get_bbox_bottom","window_views_mouse_set","sound_background_tempo","ds_priority_delete_max","ds_priority_delete_min","variable_global_exists","part_destroyer_destroy","file_text_write_string","d3d_model_vertex_color","part_system_draw_order","action_partemit_create","part_deflector_destroy","draw_surface_tiled_ext","action_partsyst_create","action_parttype_create","action_highscore_clear","action_draw_background","d3d_set_projection_ext","display_get_colordepth","action_partemit_stream","action_splash_settings","draw_surface_stretched","sprite_add_from_screen","d3d_light_define_point","window_set_region_size","keyboard_check_pressed","background_get_texture","part_attractor_destroy","registry_read_real_ext","display_set_colordepth","mp_potential_settings","instance_activate_all","draw_surface_part_ext","highscore_add_current","part_attractor_exists","ds_grid_multiply_disk","date_get_hour_of_year","keyboard_check_direct","room_set_view_enabled","sprite_get_bbox_right","draw_sprite_stretched","part_attractor_create","display_get_frequency","action_execute_script","draw_sprite_tiled_ext","background_get_height","draw_background_tiled","action_potential_step","variable_local_exists","highscore_set_strings","part_deflector_create","mp_grid_add_rectangle","mp_grid_add_instances","draw_text_transformed","action_parttype_color","splash_set_stop_mouse","sprite_collision_mask","date_current_datetime","ds_grid_get_disk_mean","window_get_fullscreen","action_highscore_show","mp_linear_step_object","action_partsyst_clear","part_deflector_exists","action_draw_rectangle","mp_linear_path_object","display_set_frequency","action_parttype_speed","timeline_moment_clear","splash_set_fullscreen","joystick_check_button","part_destroyer_region","part_destroyer_exists","file_text_open_append","registry_write_string","window_set_fullscreen","window_get_showborder","part_particles_create","object_set_persistent","window_view_mouse_set","cd_set_track_position","action_replace_sprite","draw_line_width_color","sprite_replace_sprite","object_get_persistent","part_destroyer_create","action_timeline_start","window_set_showborder","action_timeline_pause","part_type_orientation","mplay_message_receive","action_partemit_burst","part_deflector_region","date_compare_datetime","file_text_read_string","date_get_day_of_year","date_create_datetime","draw_background_part","action_previous_room","discard_include_file","action_parttype_life","action_replace_sound","sound_effect_flanger","action_path_position","set_program_priority","string_lettersdigits","part_emitter_destroy","keyboard_get_numlock","part_system_position","keyboard_set_numlock","date_datetime_string","part_particles_count","texture_set_priority","draw_roundrect_color","draw_sprite_part_ext","keyboard_key_release","draw_rectangle_color","part_particles_clear","draw_primitive_begin","part_destroyer_clear","texture_set_blending","draw_surface_general","tile_layer_delete_at","ds_grid_get_disk_sum","file_text_write_real","mplay_session_create","path_get_point_speed","window_set_rectangle","action_timeline_stop","part_attractor_clear","action_kill_position","background_get_width","mplay_message_player","file_text_open_write","ds_priority_find_min","ds_map_find_previous","registry_read_string","splash_set_interrupt","part_changer_destroy","surface_reset_target","ds_priority_find_max","color_get_saturation","mplay_session_status","ds_grid_value_exists","sprite_get_bbox_left","ds_grid_get_disk_max","ds_grid_get_disk_min","ds_grid_value_disk_y","window_set_stayontop","action_create_object","highscore_set_colors","window_set_showicons","window_get_showicons","part_deflector_clear","action_change_object","action_draw_variable","highscore_set_border","background_duplicate","ds_grid_value_disk_x","window_get_stayontop","part_attractor_force","event_perform_object","mplay_connect_status","file_bin_write_byte","effect_create_above","registry_exists_ext","effect_create_below","ds_priority_destroy","export_include_file","action_if_next_room","action_another_room","part_emitter_stream","action_move_contact","file_text_open_read","part_type_color_rgb","part_type_color_mix","part_type_direction","room_set_persistent","room_set_background","font_replace_sprite","part_type_color_hsv","draw_vertex_texture","draw_text_ext_color","part_changer_create","tile_set_background","filename_change_ext","draw_sprite_general","registry_write_real","set_synchronization","timeline_moment_add","surface_get_texture","variable_global_set","draw_triangle_color","room_instance_clear","part_system_destroy","file_text_read_real","draw_set_blend_mode","variable_global_get","display_mouse_get_x","d3d_model_ellipsoid","action_set_friction","action_if_collision","mplay_message_count","background_get_name","action_sprite_color","part_deflector_kind","sound_effect_reverb","action_timeline_set","sound_effect_chorus","part_changer_region","sound_effect_gargle","mplay_message_value","mplay_message_clear","action_splash_video","window_get_sizeable","splash_set_stop_key","action_set_timeline","action_draw_ellipse","action_current_room","action_splash_image","d3d_set_perspective","d3d_primitive_begin","sprite_get_bbox_top","sound_global_volume","window_set_position","part_emitter_region","message_input_color","message_mouse_color","part_emitter_create","window_set_sizeable","action_reverse_xdir","display_mouse_get_y","part_changer_exists","draw_background_ext","part_emitter_exists","collision_rectangle","action_reverse_ydir","action_restart_game","date_valid_datetime","tile_get_background","message_button_font","surface_get_height","object_set_visible","registry_read_real","window_mouse_get_x","window_mouse_get_y","object_event_clear","room_goto_previous","object_get_visible","clipboard_has_text","path_get_precision","action_if_variable","clipboard_set_text","action_splash_text","window_get_visible","d3d_set_projection","mplay_session_name","window_set_caption","mplay_session_find","splash_set_caption","d3d_model_cylinder","mplay_message_send","d3d_draw_ellipsoid","ds_priority_create","mplay_session_join","mplay_message_name","action_draw_health","file_bin_read_byte","ds_list_find_index","ds_list_find_value","action_move_random","mplay_session_mode","object_is_ancestor","ds_grid_set_region","mp_grid_clear_cell","set_automatic_draw","message_input_font","part_changer_clear","message_background","draw_primitive_end","show_debug_message","string_replace_all","action_set_caption","texture_set_repeat","part_system_exists","action_linear_step","part_system_drawit","window_set_visible","part_emitter_burst","joystick_direction","sprite_get_texture","draw_ellipse_color","keyboard_unset_map","distance_to_object","keyboard_key_press","path_set_precision","sprite_get_xoffset","window_get_caption","part_emitter_clear","part_system_create","display_get_height","sprite_get_yoffset","part_changer_types","action_if_question","variable_local_get","part_system_update","move_towards_point","ini_section_delete","mouse_check_button","surface_set_target","action_kill_object","highscore_set_font","action_draw_sprite","ds_grid_add_region","highscore_show_ext","clipboard_get_text","action_set_gravity","d3d_vertex_texture","texture_get_height","variable_local_set","draw_surface_tiled","date_days_in_month","ini_section_exists","move_contact_solid","background_replace","move_outside_solid","object_get_sprite","path_insert_point","path_change_point","path_clear_points","object_set_parent","surface_copy_part","file_bin_position","path_delete_point","object_set_sprite","get_open_filename","action_fullscreen","mp_grid_clear_all","texture_get_width","mp_potential_path","get_save_filename","mp_potential_step","get_directory_alt","move_bounce_solid","action_if_aligned","part_system_clear","tile_layer_delete","part_system_depth","instance_position","message_text_font","instance_furthest","tile_set_position","surface_save_part","mplay_player_name","mplay_player_find","mplay_session_end","surface_get_width","transition_define","object_get_parent","file_text_writeln","file_write_string","part_type_destroy","part_changer_kind","mplay_init_serial","font_get_fontname","timeline_get_name","part_type_gravity","transition_exists","ds_priority_clear","splash_set_cursor","registry_set_root","ds_map_find_first","action_move_start","action_set_hspeed","d3d_vertex_normal","room_instance_add","splash_show_video","action_set_health","date_compare_date","action_cd_playing","ds_priority_write","date_current_time","ds_priority_empty","date_current_date","date_compare_time","collision_ellipse","ds_map_find_value","splash_set_border","d3d_draw_cylinder","action_show_video","action_splash_web","sprite_add_sprite","room_tile_add_ext","sprite_save_strip","splash_show_image","action_draw_arrow","d3d_primitive_end","draw_vertex_color","action_set_vspeed","action_set_motion","draw_sprite_tiled","sprite_set_offset","draw_surface_part","d3d_model_destroy","action_sprite_set","screen_wait_vsync","sound_get_preload","action_move_point","date_days_in_year","action_set_cursor","distance_to_point","sound_effect_echo","cd_track_position","sprite_get_number","sprite_get_height","display_get_width","window_set_cursor","string_height_ext","display_mouse_set","background_exists","action_path_speed","background_delete","draw_circle_color","window_get_height","action_draw_score","background_assign","window_get_cursor","action_cd_present","d3d_set_lighting","ds_grid_get_mean","d3d_vertex_color","ini_write_string","draw_surface_ext","action_set_score","directory_create","splash_show_text","date_get_weekday","date_minute_span","part_type_alpha1","part_type_alpha2","action_set_alarm","ds_grid_add_disk","directory_exists","message_position","screen_save_part","part_type_alpha3","action_save_game","date_second_span","action_show_info","date_time_string","tile_get_visible","keyboard_get_map","joystick_buttons","move_outside_all","tile_layer_depth","date_create_time","action_end_sound","sprite_duplicate","draw_point_color","show_message_ext","sprite_get_width","window_get_color","joystick_has_pov","move_contact_all","date_create_date","date_date_string","draw_sprite_part","action_if_health","draw_clear_alpha","instance_destroy","sound_effect_set","action_if_number","instance_nearest","display_set_size","action_cd_resume","tile_layer_shift","keyboard_set_map","mp_grid_add_cell","display_test_all","action_if_object","action_draw_text","external_define6","external_define7","external_define8","external_define5","external_define4","external_define1","external_define2","external_define3","object_get_solid","ds_priority_size","object_get_depth","file_open_append","ds_map_find_last","ds_map_find_next","ds_priority_copy","ds_priority_read","collision_circle","file_bin_rewrite","external_define0","splash_set_scale","ds_set_precision","position_meeting","surface_getpixel","parameter_string","action_load_game","ds_stack_destroy","action_draw_line","position_destroy","string_width_ext","object_set_solid","ds_queue_dequeue","window_mouse_set","object_set_depth","path_get_point_x","path_get_point_y","window_set_color","ds_queue_enqueue","ds_queue_destroy","object_event_add","action_inherited","action_draw_life","mplay_init_tcpip","part_type_create","part_type_exists","mplay_message_id","d3d_model_create","room_set_caption","ds_grid_set_disk","mplay_init_modem","ds_grid_multiply","mplay_data_write","part_type_color1","part_type_color2","tile_set_visible","part_type_color3","action_next_room","d3d_model_vertex","part_type_sprite","file_text_readln","window_get_width","splash_set_color","d3d_light_enable","splash_set_adapt","file_read_string","d3d_set_culling","d3d_set_shading","splash_set_size","action_snapshot","date_inc_second","date_inc_minute","mplay_data_mode","date_get_second","sound_isplaying","background_save","color_get_green","background_name","parameter_count","collision_point","mplay_data_read","mp_grid_destroy","d3d_model_floor","mplay_player_id","splash_set_main","action_set_life","move_bounce_all","texture_preload","d3d_model_clear","action_end_game","cd_track_length","object_get_name","d3d_model_block","object_get_mask","color_get_value","mplay_ipaddress","cd_set_position","object_set_mask","date_get_minute","draw_set_halign","part_type_scale","timeline_exists","font_add_sprite","timeline_delete","part_type_shape","ds_list_destroy","ds_list_shuffle","ds_list_replace","file_write_real","part_type_speed","room_set_height","ds_grid_value_y","action_cd_pause","part_type_color","room_tile_clear","ds_grid_get_sum","tile_set_region","part_type_death","ds_grid_value_x","font_get_italic","sprite_get_name","file_text_close","file_open_write","random_get_seed","execute_program","random_set_seed","registry_exists","event_inherited","event_inherited","point_direction","ds_stack_create","path_set_closed","path_get_number","path_get_length","window_set_size","ds_priority_add","file_find_close","file_find_first","splash_show_web","file_attributes","path_get_closed","ds_queue_create","external_define","ds_grid_get_min","ds_grid_shuffle","part_type_clear","tile_layer_find","date_valid_time","position_change","tile_layer_hide","date_valid_date","script_get_name","draw_set_valign","instance_sprite","script_get_text","action_path_end","tile_get_yscale","action_if_mouse","draw_background","tile_get_xscale","tile_get_height","joystick_exists","draw_line_width","draw_line_color","display_set_all","instance_number","message_caption","highscore_value","part_type_alpha","tile_layer_show","ds_grid_destroy","ds_grid_get_max","highscore_clear","part_type_blend","action_if_sound","draw_text_color","ini_read_string","action_if_score","instance_create","instance_exists","action_if_empty","date_month_span","instance_change","draw_sprite_ext","sound_get_kind","position_empty","point_distance","string_replace","string_letters","splash_set_top","path_get_speed","part_type_step","part_type_size","sound_stop_all","part_type_life","script_execute","room_set_width","screen_refresh","string_char_at","room_goto_next","surface_exists","surface_create","sprite_replace","path_duplicate","room_duplicate","path_add_point","sound_get_name","external_call4","ds_map_replace","ds_map_destroy","ds_queue_clear","ds_queue_write","ds_stack_empty","ds_stack_clear","ds_list_insert","ds_list_delete","draw_set_color","draw_set_alpha","ds_grid_create","ds_grid_height","ds_list_create","ds_grid_resize","ds_stack_write","execute_string","file_bin_close","external_call8","file_find_next","file_open_read","filename_drive","file_read_real","external_call7","external_call6","external_call1","external_call0","external_call2","external_call3","external_call5","draw_roundrect","draw_rectangle","color_get_blue","collision_line","d3d_draw_block","d3d_draw_floor","d3d_model_draw","d3d_model_cone","background_add","action_webpage","action_cd_stop","action_cd_play","action_if_dice","action_if_life","action_move_to","action_message","d3d_model_load","d3d_model_save","draw_get_alpha","date_year_span","draw_get_color","draw_healthbar","window_default","draw_highscore","date_week_span","date_leap_year","d3d_set_hidden","d3d_model_wall","date_get_month","date_hour_span","date_inc_month","timeline_clear","ds_queue_empty","tile_get_blend","highscore_name","ini_write_real","tile_set_blend","ini_key_exists","message_button","tile_set_depth","tile_get_depth","make_color_rgb","keyboard_check","tile_set_alpha","ini_key_delete","keyboard_clear","tile_get_width","make_color_hsv","highscore_show","tile_set_scale","tile_get_alpha","texture_exists","mp_grid_create","mp_linear_path","mp_linear_step","font_get_first","mplay_init_ipx","tile_delete_at","instance_place","joystick_upos","joystick_rpos","ds_list_empty","room_previous","show_question","joystick_xpos","show_menu_pos","joystick_zpos","joystick_ypos","irandom_range","joystick_vpos","window_center","filename_path","room_set_view","ds_grid_clear","screen_redraw","joystick_axes","joystick_name","ds_grid_write","draw_triangle","script_exists","room_tile_add","draw_text_ext","room_set_code","ds_list_clear","draw_set_font","sound_discard","d3d_draw_cone","color_get_red","d3d_draw_wall","sprite_exists","sound_replace","sound_restore","color_get_hue","window_handle","object_delete","action_bounce","sprite_assign","action_effect","cd_close_door","message_alpha","d3d_set_depth","date_is_today","date_inc_year","tile_get_left","display_reset","draw_getpixel","keyboard_wait","instance_find","date_inc_week","date_get_hour","date_day_span","date_get_week","date_get_year","date_inc_hour","show_question","ds_grid_width","file_bin_size","external_call","ds_queue_tail","event_perform","string_insert","ds_queue_size","timeline_name","ds_queue_head","string_format","string_height","ds_queue_read","string_length","ds_stack_copy","file_bin_open","ds_stack_size","font_get_size","string_repeat","ds_stack_read","place_meeting","file_bin_seek","ds_stack_push","place_snapped","path_set_kind","external_free","font_get_name","path_get_name","room_get_name","sprite_delete","string_delete","string_digits","execute_shell","font_get_bold","filename_name","highscore_add","get_directory","ds_list_write","ds_map_create","file_text_eof","object_exists","ds_map_exists","ini_read_real","path_get_kind","instance_copy","ds_queue_copy","ds_map_delete","font_get_last","font_replace","game_restart","timeline_add","message_size","sound_volume","cd_open_door","filename_dir","file_writeln","action_color","surface_save","filename_ext","mp_grid_path","action_sleep","window_get_x","move_contact","window_get_y","mp_grid_draw","action_sound","surface_free","sound_delete","draw_surface","ds_map_write","ds_map_empty","random_range","sprite_merge","show_message","show_message","ds_grid_copy","joystick_pov","ds_list_sort","room_restart","ds_list_size","ds_list_copy","string_count","ds_grid_read","ds_map_clear","date_date_of","ds_stack_pop","string_upper","path_reverse","date_inc_day","string_width","execute_file","surface_copy","date_get_day","sound_exists","draw_ellipse","effect_clear","ds_stack_top","date_time_of","string_lower","tile_get_top","ds_list_read","tile_exists","sprite_name","sprite_save","string_copy","tile_delete","get_integer","file_rename","place_empty","font_delete","font_exists","MCI_command","file_readln","file_exists","room_assign","ds_map_read","move_random","file_delete","path_rotate","path_mirror","object_name","merge_color","mouse_clear","move_bounce","move_random","path_append","path_assign","lengthdir_x","lengthdir_y","path_exists","path_delete","room_exists","ds_map_size","cd_position","d3d_set_fog","ds_map_copy","draw_circle","action_wrap","action_snap","action_font","action_move","action_path","draw_sprite","draw_button","ds_grid_add","script_name","ds_grid_get","draw_vertex","ds_grid_set","ds_list_add","screen_save","ds_map_add","file_close","make_color","event_user","motion_add","mouse_wait","motion_set","cd_present","get_string","draw_clear","draw_point","draw_arrow","d3d_vertex","tile_get_x","sprite_add","cd_playing","tile_get_y","path_scale","path_get_y","place_free","show_video","show_error","path_get_x","show_image","path_start","sound_fade","path_shift","sound_loop","object_add","string_pos","sound_stop","sound_name","sound_play","draw_path","draw_text","room_name","file_copy","move_snap","room_goto","room_next","show_text","cd_paused","sound_add","cd_number","cd_length","action_if","sound_pan","cd_resume","d3d_start","show_menu","show_info","font_name","disk_size","disk_free","draw_line","randomize","mplay_end","path_name","move_wrap","ini_close","is_string","tile_find","load_info","path_flip","get_color","io_handle","game_save","game_load","path_add","degtorad","cd_pause","font_add","path_end","game_end","cd_track","io_clear","room_add","file_eof","radtodeg","tile_add","ini_open","d3d_end","cd_init","arctan2","cd_stop","irandom","cd_play","is_real","median","choose","arccos","arctan","random","string","arcsin","sleep","round","floor","log10","power","mean","min3","logn","max3","log2","sqrt","real","sign","frac","ceil","max","exp","tan","abs","sqr","min","ord","cos","chr","sin","ln"];
logical = ["if","else","or","and","for","global","while","repeat","return","not","local","do","until","begin","end","switch","case","break","default","xor","mod","div","var","with","other","self","all","noone","continue","exit"];
prefix = ["spr","snd","bg","bk","bac","rm","pt","pth","scr","fnt","tml","tl","obj","rm"];

variables_length = variables.length;
constants_length = constants.length;
functions_length = functions.length;
logical_length = logical.length;
prefix_length = prefix.length;

// Lookup tables refer to the last character length
variables_lookup_table = [155,155,153,152,151,150,144,139,134,131,116,88,74,51,43,32,28,18,4,3,3,1,-1];
constants_lookup_table = [282,282,282,281,281,280,267,249,223,189,157,132,113,98,83,70,56,45,33,28,26,8,5,2,0,-1];
functions_lookup_table = [1241,1241,1241,1240,1230,1220,1215,1208,1201,1188,1153,1120,1070,1017,914,802,684,567,465,380,302,234,169,138,104,83,56,41,30,16,9,6,1,1,1,1,1,0,-1];

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
	allcodesections = document.getElementsByClassName('codecontent');
} else {
	// Use alternative for IE and FF2
	allcodesections = getElementsByClassName_alt('codecontent','div');
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
				result += '<span style="color:'+c_comments+';">'+replacement_text.substring(token_index,end_comment_index+2)+'</span>';

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
					result += '<span style="color:'+c_comments+';">'+replacement_text.substring(token_index, end_comment_index)+'</span>';
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
	replacement_text = '<div class="codecontent" style="color:#000;background-color:#FFF;line-height:'+line_height+';font-size:13px;font-family:\'Courier New\'">' + replacement_text + '</div>';

	// Set it to the inner html
	replacement_div.innerHTML = replacement_text;

	// Actually Replace
	thiscodesection.parentNode.replaceChild(replacement_div, thiscodesection);
	}
}

}
