<?php
global $_GPC, $_W;
$GLOBALS['frames'] = $this->getMainMenu();

$info=pdo_get('mzhk_sun_system',array('uniacid'=>$_W['uniacid']));
if($info){
    $item = unserialize($info["showorderset"]);
}

if(checksubmit('submit')){
    $formdata=$_GPC['formdata'];
    $data["showorderset"] = serialize($formdata);
    $data['uniacid']=trim($_W['uniacid']);

    if($_GPC['id']==''){                
        $res=pdo_insert('mzhk_sun_system',$data,array('uniacid'=>$_W['uniacid']));
        if($res){
            message('添加成功',$this->createWebUrl('orderset',array()),'success');
        }else{
            message('添加失败','','error');
        }
    }else{
        $res = pdo_update('mzhk_sun_system', $data, array('id' => $_GPC['id'],'uniacid'=>$_W['uniacid']));
        if($res){
            message('编辑成功',$this->createWebUrl('orderset',array()),'success');
        }else{
            message('编辑失败','','error');
        }
    }
}
include $this->template('web/setting/orderset');