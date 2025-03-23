App({
  globalData: {
    foodList: [] // 添加食物列表数组
  },
  // 添加方法来添加食物
  addFood: function(food) {
    this.globalData.foodList.push(food);
  },
  // 添加方法来获取食物列表
  getFoodList: function() {
    return this.globalData.foodList;
  },
  // 添加方法来清空食物列表
  clearFoodList: function() {
    this.globalData.foodList = [];
  }
})