Page({
  data: {
    foodList: [],
    newFood: ''
  },

  onLoad() {
    // 从本地存储加载食物列表
    const foodList = wx.getStorageSync('foodList');
    this.setData({ foodList });
  },

  onInput(e) {
    this.setData({
      newFood: e.detail.value
    });
  },

  addFood() {
    const { foodList, newFood } = this.data;
    if (!newFood.trim()) {
      wx.showToast({
        title: '请输入食物名称',
        icon: 'none'
      });
      return;
    }

    const updatedList = [...foodList, newFood];
    this.setData({
      foodList: updatedList,
      newFood: ''
    });
    this.saveToStorage(updatedList);
  },

  deleteFood(e) {
    const { index } = e.currentTarget.dataset;
    const updatedList = this.data.foodList.filter((_, i) => i !== index);
    this.setData({ foodList: updatedList });
    this.saveToStorage(updatedList);
  },

  saveToStorage(foodList) {
    wx.setStorageSync('foodList', foodList);
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
  }
})