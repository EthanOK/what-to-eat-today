const defaultFoodList = require("./defaultFoodList.js"); // 引入 defaultFoodList

Page({
  data: {
    foodList: [],
    selectedFood: "点击按钮开始选择",
    isSelecting: false,
    displayMode: "slot", // 默认使用老虎机模式
  },

  onShow() {
    const foodList = wx.getStorageSync("foodList");
    this.setData({
      foodList: foodList,
    });
  },

  onLoad() {
    // 从本地存储加载食物列表
    const foodList = wx.getStorageSync("foodList");
    const app = getApp(); // 获取 app 实例
    const foodList_t = foodList.length > 0 ? foodList : defaultFoodList;

    if (foodList.length == 0) {
      wx.setStorage({
        key: "foodList",
        data: defaultFoodList,
      });
    }

    this.setData({
      foodList: foodList_t,
    });
  },

  onChooseFood() {
    if (this.data.isSelecting) return;

    if (this.data.displayMode === "slot") {
      this.startSlotMachine();
    } else {
      this.startWheel();
    }
  },

  startSlotMachine() {
    this.setData({ isSelecting: true });

    let count = 0;
    const maxCount = 30;
    let interval = 50;

    const roll = () => {
      const randomIndex = Math.floor(Math.random() * this.data.foodList.length);
      const food = this.data.foodList[randomIndex];

      this.setData({ selectedFood: food });

      count++;
      if (count < maxCount) {
        // 逐渐增加间隔时间，实现减速效果
        if (count > maxCount * 0.7) {
          interval += 20;
        }
        setTimeout(roll, interval);
      } else {
        this.setData({ isSelecting: false });
      }
    };

    roll();
  },

  startWheel() {
    this.setData({ isSelecting: true });
    const wheel = this.selectComponent("#wheel");
    if (wheel) {
      wheel.startSpin();
    }
  },

  onWheelSelect(e) {
    this.setData({
      selectedFood: e.detail.food,
      isSelecting: false,
    });
  },

  switchToSlot() {
    this.setData({ displayMode: "slot" });
  },

  switchToWheel() {
    this.setData({ displayMode: "wheel" });
  },

  goToManage() {
    wx.navigateTo({
      url: "/pages/manage/manage",
    });
  },
});
