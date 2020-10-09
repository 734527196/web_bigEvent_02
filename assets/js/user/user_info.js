$(function() {
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                {
                    return '昵称长度为 1 ~ 6 位之间！'
                }
            }
        }
    })

    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)
                }
                // console.log(res)
                form.val("formUserInfo", res.data)
            }
        })
    }

    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo()
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                window.parent.getUserInfo();
            }
        })
    })


})