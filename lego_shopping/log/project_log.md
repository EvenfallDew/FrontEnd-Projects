# 项目日志

## 2021.06.06
### 1. 今日任务：
    1. 支付页面剩余3个步骤全部完成
    2. 提升部分函数复用性
    3. 密码强度的探究
    4. 支付最后增加一个动态的猜你喜欢
### 2. 完成情况：
    1. 主页--完成--debug完毕
    2. 专区页--完成--debug完毕
    2. 登录页面--完成--完善登录逻辑
    3. 注册页面--完成--增加倒计时跳转
    4. 商品详情页--完成
    5. 支付页面--70%--剩余获取用户选中地址
    6. 购物车页面--50%，剩余商品增删和价格
### 3. 遇到问题
    1.jquery获取不到display状态
        解决方案：
        写法不对：
        $("#id").css('display','block'); 
        改为： 
        $("#id")[0].style.display = 'none'; 
        $("#id")返回的是JQuery 
        它是个集合肯定有display属性
### 4. 明日计划
    1. 支付页面剩余3个步骤全部完成
    2. 提升部分函数复用性
    3. 密码强度的探究
    4. 支付最后增加一个动态的猜你喜欢

## 2021.06.05
### 1. 今日任务：
    1. 购物车的一些基本结构
    2. 主页更换轮播图插件
    3. 注册的表单验证
    4. 商品详情页的结构
### 2. 完成情况：
    1. 主页完成--95%--无语子，两个轮播图互相冲突，A动B不动
    2. 登录页面的切换--100%，修复图标丢失的bug
    3. 注册页面的表单验证--90%，剩下一个密码强度
    4. 商品详情页的结构--90%，剩下一个看大图的插件
    5. 支付页面--25%，原地踏步
    6. 购物车的一些基本结构--70%，剩余商品增删和价格
### 3. 遇到问题
    1. 图标丢失：
        切换登录方式后，background-image图标丢失，报错GET net::ERR_FILE_NOT_FOUND，但是文件存在却找不到
        解决方案：
        很神奇，在live server里预览就正常展现图片，
        但是直接在浏览器打开网页就加载不出图片。
        在编辑器内把背景图改成了前景图，就正常了。
    2. fixed问题：
        二维码的position:fixed 的元素，如果其祖先元素存在非none的transform值，那么该元素将相对于设定了transform的祖先元素进行定位。
        解决方案：
        任何非none的transform值都会导致一个堆叠上下文和包含块的创建。
        由于堆叠上下文的创建，该元素会影响其子元素的固定定位。设置了position:fixed的子元素将不会基于窗口定位，而是基于这个父元素。
    3. live server加载问题：
        live server里加载主页不完全，一直是正在连接的状态，本地直接打开就可以，与问题1完全相反，简直绝了
        GET https://s1.pstatp.com/cdn/expire-1-M/jquery/1.10.2/jquery.min.js net::ERR_CONNECTION_TIMED_OUT
        解决方案：
        加入断点发现是轮播插件的jquery有问题，怀疑两个插件互相影响，看又看不懂，打算换一个解决
### 4. 明日计划
    1. 支付页面剩余3个步骤全部完成
    2. 提升部分函数复用性
    3. 密码强度的探究
    4. 支付最后增加一个动态的猜你喜欢

## 2021.06.04
### 1. 今日任务：
    1. 主页完成
    2. 登录页面的切换
    3. 注册页面的切换
    3. 购物车的一些基本结构
    4. 修改页面一些原来用于测试的文字
### 2. 完成情况：
    1. 主页完成--95%--无语子，两个轮播图互相冲突
    2. 登录页面的切换--99%，发现一个神奇的图标丢失bug
    3. 购物车的一些基本结构--50%，剩余商品增删和价格
    4. 修改页面一些原来用于测试的文字--100%
    5. 支付页面--25%，完成步骤1
### 3. 遇到问题
    1. 切换登录方式后，background-image图标丢失，报错GET net::ERR_FILE_NOT_FOUND，但是文件存在却找不到
        解决方案：
        很神奇，在live server里预览就正常展现图片，
        但是直接在浏览器打开网页就加载不出图片。
        在编辑器内把背景图改成了前景图，就正常了。
    2. 06.03.秒杀倒计时感觉有误差
        解决方案：
        毫秒进制记错了，用parseInt重算即可
### 4. 明日计划
    1. 购物车的一些基本结构
    2. 主页更换轮播图插件
    3. 注册的表单验证


## 2021.06.03
### 1. 今日任务：
    1. 主页完成
    2. 登录页面的切换
    3. 注册页面的切换
    4. 专区页面的文字内容和手风琴效果
    5. 商品详情页的基本结构
    6. 购物车的一些基本结构
    7. 下拉时顶部固定搜索栏
    8. 主页楼层电梯效果
### 2. 完成情况：
    1. 主页完成--95%--轮播图效果不满意待换一个
    2. 登录页面的切换--完成
    3. 注册页面的切换--完成，表单验证未完成
    4. 专区页面的文字内容和手风琴效果--完成，可以增加电梯功能
    5. 商品详情页的基本结构--50%，动态效果拉胯
    6. 购物车的一些基本结构--0% 一点没动，来日再战
    7. 下拉时顶部固定搜索栏--完成
    8. 主页楼层电梯效果--完成
### 3. 遇到问题
    1. 缺素材
        解决方案：
        放弃治疗，都用一个图。
    2. 发现秒杀栏横向滚动插件居然是在线获取jquery，导致没有网的情况下无法实现效果
        解决方案：
        从本地引入jq文件。
    3. 二维码和账户登录切换的图标，将其设置为了背景图，鼠标移入不显示设定好的手型
        解决方案：
        改为前景图，虽然可以实现但是不太好；
        给其设定z-index大于div层级。
    4. 秒杀倒计时感觉有误差
        解决方案：
        搜索可知：造成误差的原因主要有几种可能：
        没有考虑js冻结运行耗费时间；（特别是移动端容易出现，下滑页面时倒计时不动了）
        没有考虑页面渲染和函数运行累积时间；（京东的误差貌似属于这种）
        其他代码逻辑问题（这种情况就复杂了，这里不讨论）
        总结：现在无解
### 4. 明日计划
    1. 购物车的一些基本结构
    2. 主页更换轮播图插件
    3. 专区页面的电梯导航功能
    4. 修改页面一些原来用于测试的文字


## 2021.06.02
### 1. 今日任务：
    1. 素材图片整理
    2. 专区页面的结构
    3. 注册页面的结构
    4. 登录页面非js部分弄完
    5. 主页轮播图
    6. 标签切换
### 2. 完成情况：
    1. 素材图片整理--50%--弄完是不可能弄完的
    2. 专区页面的结构--80%--需要把销量栏增加手风琴效果
    3. 注册页面的结构--99%--需要增加密码强度的样式
    4. 登录页面非js部分弄完--99%--基本完成，账密登录需要加入验证码功能
    5. 主页轮播图--99%--效果不满意再去偷一个
    6. 标签切换--90%--没有特技差评
### 3. 遇到问题
    1. 缺素材
        解决方案：
        自己抠图，我吐了，素材能不能整全。
    2. CSS修改png图标颜色
        解决方案：
        使用CSS3滤镜filter中的drop-shadow；
        filter:drop-shadow(x偏移, y偏移, 模糊大小, 色值)；
        drop-shadow滤镜可以给元素或图片非透明区域添加投影；
        但filter:drop-shadow不支持阴影叠加，不支持内阴影；
        与box-shadow区别：box-shadow本质上是盒模型的投影，而drop-shadow才是真正意义上的投影；
        最终原图标隐藏，只显示投影，看上去就好像是改变了图标的颜色。
### 4. 明日计划
    1. 主页完成
    2. 登录页面的切换
    3. 注册页面的切换
    4. 专区页面的文字内容和手风琴效果
    5. 商品详情页的基本结构
    6. 购物车的一些基本结构
    7. 下拉时顶部固定搜索栏
    8. 主页楼层电梯效果


## 2021.06.01
### 1. 今日任务：
    1. 登录页面
    2. 注册页面
    3. 主页部分
### 2. 完成情况：
    1. 登录页面--70%
    2. 注册页面--20%
    3. 主页部分--修复了关于页脚错位的bug
### 3. 遇到问题
    1. 缺素材
        解决方案：
        自己抠图。
    2. 阴影
        解决方案：
        与text-shadow不同，box-shadow有一个inset关键字可用——把它放在一个影子声明的开始，使它变成一个内部阴影，而不是一个外部阴影。
### 4. 明日计划
    1. 素材图片整理
    2. 专区页的结构
    3. 注册页面的结构
    4. 登录页面非js部分弄完

## 2021.05.31
### 1. 今日任务：
    1. 首页顶部菜单栏
    2. 通用页脚
### 2. 完成情况：
    1. 菜单栏--100%
    2. 页脚--100%
### 3. 遇到问题
    1. background-image图片路径错误，不显示
        解决方案：
        如果一个指定的图像无法被绘制，浏览器会将此情况等同于其值被设为 none。
        注意： 即使图像是不透明的，背景色在通常情况下并不会被显示，路径写错了也不知道。
        web开发者仍然应该指定background-color属性，以防如果图像无法被加载，调试困难。
        例如，在网络连接断开的情况下背景色就会被绘制，比如设置成灰色表示加载未成功。
    2. position的定位
        解决方案：
        absolute并不一定相对于浏览器，细读说明：相对于static定位以外的第一个父元素。
### 4. 明日计划
    1. 登录页面
    2. 注册页面
    3. 主页部分