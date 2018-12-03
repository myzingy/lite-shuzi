// components/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    cur:'/pages/suzi/kousuan/index',
  },
  attached(){
    let pages=getCurrentPages();
    let cur='/'+pages[pages.length-1].route;
    this.setData({
      cur:cur,
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
