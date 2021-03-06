<?php
/**
 * 深蓝网络 Copyright (c) www.zhshenlan.com
 */

defined('IN_IA') or exit('Access Denied');

global $_GPC, $_W;
load()->func('tpl');

if ($_W['ispost']) {

	$options = array();
	$data = array();
	$photo = array();
	$tmp_pic = array();

	if ($_GPC['options']) {
		$options = $_GPC['options'];

		foreach ($options['icon'] as $k => $v) {
			$tmp_pic[$k]['icon'] = $v;
		}

		foreach ($options['title'] as $k => $v) {
			$tmp_pic[$k]['title'] = $v;
		}

		foreach ($options['page_url'] as $k => $v) {
			$tmp_pic[$k]['page_url'] = $v;
		}

		foreach ($tmp_pic as $k=>$v){
			$photo['item'][] = $v;
		}
	}
	$photo['enabled'] = $_GPC['enabled'];

	$data['setting_value'] = json_encode($photo); // 压缩

	if ($_W['slwl']['set']['menus_set_settings']) {
		$where['uniacid'] = $_W['uniacid'];
		$where['setting_name'] = 'menus_set_settings';
		pdo_update('slwl_aicard_settings', $data, $where);
	} else {
		$data['uniacid'] = $_W['uniacid'];
		$data['setting_name'] = 'menus_set_settings';
		$data['addtime'] = $_W['slwl']['datetime']['now'];
		pdo_insert('slwl_aicard_settings', $data);
	}

	sl_ajax(0, '保存成功！');
}

if ($_W['slwl']['set']['menus_set_settings']) {
	$smeta = $_W['slwl']['set']['menus_set_settings'];
}


include $this->template('web/basic/menus');

