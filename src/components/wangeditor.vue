<template>
    <div id="wangeditor">
        <div ref="editorElem" style="text-align: left"></div>
    </div>
</template>
<script>
import E from "wangeditor";
export default {
    name: "Editor",
    data() {
        return {
            editor: null,
            // editorContent: ''
        };
    },
    // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
    // props: ['catchData'], // 接收父组件的方法
    mounted() {
        let _this = this;
        this.editor = new E(this.$refs.editorElem);
        // 编辑器的事件，每次改变会获取其html内容
        this.editor.config.onchange = html => {
            this.editorContent = html;
            // this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
        };
        this.editor.config.uploadImgServer = '/article/editorUpload';//服务器端上传图片的接口路径
        this.editor.config.uploadImgMaxLength = 6 ;// 限制一次最多上传 6张图片
        this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024 ;// 将图片大小限制为 2M
        this.editor.config.uploadImgHeaders = {'Content-Type': 'multipart/form-data' };// 自定义 header  上传文件格式为file文件，用form-data格式
        this.editor.config.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
        this.editor.config.uploadFileName='upload-img';//配置文件参数名
        this.editor.config.pasteIgnoreImg = true;//忽略粘贴内容中的图片
        this.editor.config.pasteFilterStyle = false;//忽略粘贴的样式
        this.editor.config.uploadImgHooks = {
          fail: (xhr, editor, result) => {
            // 插入图片失败回调
             console.log(xhr, editor,result)
          },
          success: (xhr, editor, result) => {
            // 图片上传成功回调
            console.log(xhr, editor)
          },
          timeout: (xhr, editor) => {
            // 网络超时的回调
            console.log(xhr, editor)
          },
          error: (xhr, editor) => {
            console.log(xhr, editor)
            // 图片上传错误的回调
          }
        }
        this.editor.config.menus = [
            // 菜单配置
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            'image', // 插入图片
            'table', // 表格
            'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
        ];

        this.editor.config.customUploadImg = (files, insert) => {
            let formData = new FormData();
            files.forEach((file, index) => {
                let name = this.editor.config.uploadFileName || file.name
                if (files.length > 1) {
                    // 多个文件时，filename 不能重复
                    name = name + (index + 1)
                }
                formData.append(name, file)
            })

            console.log(formData)
            _this.$axios.post('/article/editorUpload',files,result =>{
                console.log(result)
            })
            // this.upload(files)

        };
        this.editor.create(); // 创建富文本实例
    },
    methods:{
        
    },
    computed: {
		editorContent: {
			get () {
				return this.$store.state.editorData
			},
			set (value) {
				this.$store.commit('setMsg', value)
			}
		}
	},
}
</script>