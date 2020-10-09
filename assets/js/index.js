$(function() {
    getUserInfo();

    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {

            localStorage.removeItem('token');
            location.href = '/login.html'

            layer.close(index);
        });
    })
})

var layer = layui.layer
    //获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            layer.msg(res.message);
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     // console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text_avatar').hide();
    } else {
        var first = name[0].toUpperCase();
        $('.text_avatar').show().html(first);
        $('.layui-nav-img').hide();
    }

}