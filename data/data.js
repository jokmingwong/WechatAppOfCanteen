var foods = [
  {
    id: 1,
    name: '西红柿鸡蛋盖饭',
    pic: '/images/446105925964471455.jpg',
    sold: 1014,
    price: 2
  },
  
  {
    id: 2,
    name: '青椒肉丝铁板饭',
    pic: '/images/446105925964471455.jpg',
    sold: 1029,
    price: 3
  },
  
  {
    id: 3,
    name: '地三鲜盖饭',
    pic: '/images/446105925964471455.jpg',
    sold: 1030,
    price: 2
  },
  
  {
    id: 4,
    name: '干锅羊肉',
    pic: '/images/446105925964471455.jpg',
    sold: 1059,
    price: 1
  },
  
  {
    id: 5,
    name: '干锅茶树菇牛肉',
    pic: '/images/446105925964471455.jpg',
    sold: 1029,
    price: 2
  },
  
  {
    id: 6,
    name: '火腿鸡蛋铁板饭',
    pic: '/images/446105925964471455.jpg',
    sold: 1064,
    price: 2
  },
    
  {
    id: 7,
    name: '咖喱牛肉盖饭',
    pic: '/images/446105925964471455.jpg',
    sold: 814,
    price: 3
  },
  
  {
    id: 8,
    name: '酸辣土豆丝盖饭',
    pic: '/images/446105925964471455.jpg',
    sold: 124,
    price: 3
  },
  
  {
    id: 9,
    name: '紫菜鸡蛋汤',
    pic: '/images/446105925964471455.jpg',
    sold: 102,
    price: 5
  }
];

function getFoodById(id) {
  if (id > 0 && id <= 9) {
    return foods[id - 1];
  } else {
    console.log("Id out of range");
  }
}

module.exports.foodList = foods;
module.exports.getFoodById = getFoodById;