$(function() {

    initArtCate()

    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章列表失败')
                }
                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)

            }
        })
    }

    var layer = layui.layer
    $('#addArtCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog_add').html()
        });

    })

    var indexAdd = null
    var indexEdit = null
    $('body').on('submit', '#form_add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                initArtCate()
                layer.close(indexAdd)
            }
        })
    })

    var form = layui.form
    $('body').on('click', '#btnEditCate', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog_edit').html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val("form_edit", res.data)
            }

        })
    })

    $('body').on('submit', '#form_edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                initArtCate()
                layer.close(indexEdit)
            }
        })
    })

    $('body').on('click', '#btnDelete', function() {
        var id = $(this).attr('data-id')

        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg(res.message)
                    initArtCate()
                }
            })
            layer.close(index);
        });
    })
})