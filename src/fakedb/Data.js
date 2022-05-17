export const categories = [
  { id: 1,        icon: 'default',      code: 'ALL',      name: 'All Items',                isActive: true },
  {
    id: 2,        icon: 'dairy',        code: 'DRY',      name: 'Dairy',                    isActive: true,      subCategories: [
      { id: 1,    icon: 'dairy',        code: 'DRY',      name: 'Liquid Milk',              isActive: true },
      { id: 1,    icon: 'dairy',        code: 'DRY',      name: 'Butter & Cream',           isActive: true },
      { id: 1,    icon: 'dairy',        code: 'DRY',      name: 'Powder Milk',              isActive: true },
      { id: 1,    icon: 'dairy',        code: 'DRY',      name: 'Yogurt',                   isActive: true },
      { id: 1,    icon: 'dairy',        code: 'DRY',      name: 'Sweet',                    isActive: true },
      { id: 1,    icon: 'dairy',        code: 'DRY',      name: 'Ghee',                     isActive: true },
      { id: 1,    icon: 'dairy',        code: 'DRY',      name: 'Laban',                    isActive: true }
    ]
  },
  {
    id: 3,        icon: 'frozen',       code: 'FRZ',      name: 'Frozen & Canned',          isActive: true,      subCategories: [
      { id: 1,    icon: 'frozen',       code: 'FRZ',      name: 'Frozen Food',              isActive: true },
      { id: 1,    icon: 'frozen',       code: 'FRZ',      name: 'Canned Food',              isActive: true },
    ]
  },
  {
    id: 4,        icon: 'meat',         code: 'MNF',      name: 'Meat & Fish',              isActive: true,      subCategories: [
      { id: 1,    icon: 'meat',         code: 'MNF',      name: 'Meat',                     isActive: true },
      { id: 1,    icon: 'meat',         code: 'MNF',      name: 'Fish',                     isActive: true },
      { id: 1,    icon: 'meat',         code: 'MNF',      name: 'Egg',                      isActive: true }
    ]
  },
  {
    id: 5,        icon: 'snacks',       code: 'SNK',      name: 'Snacks & Instant',         isActive: true,      subCategories: [
      { id: 1,    icon: 'snacks',       code: 'SNK',      name: 'Soups',                    isActive: true },
      { id: 1,    icon: 'snacks',       code: 'SNK',      name: 'Chips & Nuts',             isActive: true },
      { id: 1,    icon: 'snacks',       code: 'SNK',      name: 'Noodles & Pastas',         isActive: true },
      { id: 1,    icon: 'snacks',       code: 'SNK',      name: 'Semai',                    isActive: true },
      { id: 1,    icon: 'snacks',       code: 'SNK',      name: 'Cereals',                  isActive: true },
      { id: 1,    icon: 'snacks',       code: 'SNK',      name: 'Ice Cream',                isActive: true },
    ]
  },
  {
    id: 6,        icon: 'fruits',       code: 'FNV',      name: 'Fruits & Veg',             isActive: false,     subCategories: [
      { id: 1,    icon: 'fruits',       code: 'FNV',      name: 'Fresh Fruits',             isActive: true },
      { id: 1,    icon: 'fruits',       code: 'FNV',      name: 'Fresh Vegetables',         isActive: true },
      { id: 1,    icon: 'fruits',       code: 'FNV',      name: 'Dry Fruits',               isActive: true },
      { id: 1,    icon: 'fruits',       code: 'FNV',      name: 'Dry Vegetables',           isActive: true },

    ]
  },
  {
    id: 7,        icon: 'bread',        code: 'BKR',      name: 'Bakery',                   isActive: true,      subCategories: [
      { id: 1,    icon: 'bread',        code: 'BKR',      name: 'Biscuits',                 isActive: true },
      { id: 1,    icon: 'bread',        code: 'BKR',      name: 'Cakes',                    isActive: true },
      { id: 1,    icon: 'bread',        code: 'BKR',      name: 'Breads',                   isActive: true },

    ]
  },
  {
    id: 8,        icon: 'beverage',     code: 'BVG',      name: 'Beverage',                 isActive: false,     subCategories: [
      { id: 1,    icon: 'beverage',     code: 'BVG',      name: 'Tea',                      isActive: true },
      { id: 1,    icon: 'beverage',     code: 'BVG',      name: 'Coffee',                   isActive: true },
      { id: 1,    icon: 'beverage',     code: 'BVG',      name: 'Juice',                    isActive: true },
      { id: 1,    icon: 'beverage',     code: 'BVG',      name: 'Soft Drinks',              isActive: true },
      { id: 1,    icon: 'beverage',     code: 'BVG',      name: 'Energy Drinks',            isActive: true },
      { id: 1,    icon: 'beverage',     code: 'BVG',      name: 'Water',                    isActive: true },
      { id: 1,    icon: 'beverage',     code: 'BVG',      name: 'Syrup',                    isActive: true },
      { id: 1,    icon: 'beverage',     code: 'BVG',      name: 'Powder Drink',             isActive: true },
    ]
  },
  {
    id: 9,        icon: 'grocery',      code: 'GRC',      name: 'Cooking Essentials',       isActive: true,      subCategories: [
      { id: 1,    icon: 'grocery',      code: 'GRC',      name: 'Rice',                     isActive: true },
      { id: 1,    icon: 'grocery',      code: 'GRC',      name: 'Oil',                      isActive: true },
      { id: 1,    icon: 'grocery',      code: 'GRC',      name: 'Spices',                   isActive: true },
      { id: 1,    icon: 'grocery',      code: 'GRC',      name: 'Flour & Semolina',         isActive: true },
      { id: 1,    icon: 'grocery',      code: 'GRC',      name: 'Baking Needs',             isActive: true },
    ]
  },
  {
    id: 10,       icon: 'default',      code: 'PET',      name: 'Pet Care',                 isActive: true,      subCategories: [
      { id: 1,    icon: 'default',      code: 'PET',      name: 'Pet Food',                 isActive: true },
    ]
  },
  {
    id: 11,       icon: 'default',      code: 'CLT',      name: 'Candy & Chocolate',        isActive: false,     subCategories: [
      { id: 1,    icon: 'default',      code: 'CLT',      name: 'Chocolate',                isActive: true },
    ]
  },
  {
    id: 12,       icon: 'default',      code: 'STN',      name: 'Stationery',               isActive: true,      subCategories: [

    ]
  },
  {
    id: 13,       icon: 'default',      code: 'PER',      name: 'Personal Care',            isActive: true,      subCategories: [

    ]
  },
  {
    id: 14,       icon: 'default',      code: 'BBY',      name: 'Baby Food',                isActive: true,      subCategories: [

    ]
  },
]

export const products = [
  { id: 1, type: 'Standard', brand: 'Aarong', category: 'Dairy', name: 'Butter (Unsalted)', price: 100, qty: 3 },
  { id: 2, type: 'Standard', brand: 'Aarong', category: 'Dairy', name: 'Yogurt', price: 130, qty: 2 },
  { id: 3, type: 'Standard', brand: 'Local', category: 'Fruits & Veg', name: 'Lemon (Dozen)', price: 90, qty: 1 },
  { id: 4, type: 'Standard', brand: 'Coca-Cola', category: 'Beverage', name: 'Tea Bag', price: 10, qty: 3 },
  { id: 5, type: 'Standard', brand: 'Kazi Farm', category: 'Frozen', name: 'Parata', price: 260, qty: 2 },
  { id: 6, type: 'Standard', brand: 'BD Food', category: 'Snacks', name: 'Tip Biscuit', price: 15, qty: 4 },
  { id: 7, type: 'Standard', brand: 'Pran', category: 'Beverage', name: 'Lemon Juice', price: 35, qty: 1 },
  { id: 8, type: 'Standard', brand: 'Kazi Farm', category: 'Frozen', name: 'Sausage', price: 230, qty: 2 },
  { id: 9, type: 'Standard', brand: 'Jhotpot', category: 'Frozen', name: 'Kebab', price: 260, qty: 2 },
  { id: 10, type: 'Standard', brand: 'Pran', category: 'Dairy', name: 'Par. Cheese', price: 130, qty: 2 },
  { id: 11, type: 'Standard', brand: 'Local', category: 'Meat & Fish', name: 'Eggs (Dozen)', price: 90, qty: 1 },
  { id: 12, type: 'Standard', brand: 'Davidoff', category: 'Beverage', name: 'Coffee', price: 10, qty: 3 },
  { id: 13, type: 'Standard', brand: 'Lays', category: 'Snacks', name: 'Chips', price: 15, qty: 4 },
  { id: 14, type: 'Standard', brand: 'Coca-Cola', category: 'Beverage', name: 'Diet Coke', price: 35, qty: 1 },
  { id: 15, type: 'Standard', brand: 'Golden Harvest', category: 'Frozen', name: 'Samosa', price: 120, qty: 2 },
]

export const productTypes = [
  { key: 'Standard', value: 'Standard', text: 'Standard' },
  { key: 'Raw Material', value: 'Raw Material', text: 'Raw Material' }
]

export const brands = [
  { id: 1, key: 'Aarong', value: 'Aarong', text: 'Aarong', isActive: true },
  { id: 2, key: 'Coca-Cola', value: 'Coca-Cola', text: 'Coca-Cola', isActive: true },
  { id: 3, key: 'Kazi Farm', value: 'Kazi Farm', text: 'Kazi Farm', isActive: true },
  { id: 4, key: 'Jhotpot', value: 'Jhotpot', text: 'Jhotpot', isActive: true },
  { id: 5, key: 'Pran', value: 'Pran', text: 'Pran', isActive: true },
  { id: 6, key: 'Davidoff', value: 'Davidoff', text: 'Davidoff', isActive: true },
  { id: 7, key: 'Lays', value: 'Lays', text: 'Lays', isActive: true },
  { id: 8, key: 'Golden Harvest', value: 'Golden Harvest', text: 'Golden Harvest', isActive: true },
  { id: 9, key: 'Marico', value: 'Marico', text: 'Marico', isActive: false },
  { id: 9, key: 'Unilever', value: 'Unilever', text: 'Unilever', isActive: true },
  { id: 9, key: 'Local', value: 'Local', text: 'Local', isActive: true },
]

export const units = [
  { key: 'Kilogram', value: 'Kilogram', text: 'Kilogram' },
  { key: 'Litre', value: 'Litre', text: 'Litre' },
  { key: 'Meter', value: 'Meter', text: 'Meter' },
  { key: 'Piece', value: 'Piece', text: 'Piece' },
]

export const purchaseUnits = {
  'Kilogram': [
    { key: 'Kilogram', value: 'Kilogram', text: 'Kilogram' },
  ],
  'Litre': [
    { key: 'Litre', value: 'Litre', text: 'Litre' },
  ],
  'Meter': [
    { key: 'Meter', value: 'Meter', text: 'Meter' },
    { key: 'Foot', value: 'Foot', text: 'Foot' },
    { key: 'Centimeter', value: 'Centimeter', text: 'Centimeter' },
  ],
  'Piece': [
    { key: 'Piece', value: 'Piece', text: 'Piece' },
    { key: 'Dozen', value: 'Dozen', text: 'Dozen' },
  ],
}

export const saleUnits = {
  'Kilogram': [
    { key: 'Kilogram', value: 'Kilogram', text: 'Kilogram' },
  ],
  'Litre': [
    { key: 'Litre', value: 'Litre', text: 'Litre' },
  ],
  'Meter': [
    { key: 'Meter', value: 'Meter', text: 'Meter' },
    { key: 'Foot', value: 'Foot', text: 'Foot' },
    { key: 'Centimeter', value: 'Centimeter', text: 'Centimeter' },
  ],
  'Piece': [
    { key: 'Piece', value: 'Piece', text: 'Piece' },
    { key: 'Dozen', value: 'Dozen', text: 'Dozen' },
  ],
}

export const customers = [
  { id: 1, username: 'samiul', name: 'Samiul Alam', gender: 'Male', customerId: '01719112233', contactNumber: '01719112233', address: { line1: 'Jessica Tower (2nd Floor)', line2: '12 D.I.T Extention, East Avenue', thana: '', district: 'Dhaka', postCode: '1211' }, role: [{ roleName: 'Admin' }] },
  { id: 2, username: 'zerin', name: 'Zerin Ahmed', gender: 'Female', customerId: '01719334455', contactNumber: '01719334455', address: { line1: '5/7-A, Road #1', line2: 'Block A, Lalmatia', thana: 'Lalmatia', district: 'Dhaka', postCode: '1212' }, role: [{ roleName: 'Manager' }] },
  { id: 3, username: 'anupam', name: 'Anupam Roy', gender: 'Male', customerId: '01719223344', contactNumber: '01719223344', address: { line1: 'Sector-44', line2: 'Road# 10, House# 39', thana: 'Uttara', district: 'Dhaka', postCode: '1207' }, role: [{ roleName: 'Salesperson' }] },
  { id: 4, username: 'apala', name: 'Apala Sen', gender: 'Female', customerId: '01719556677', contactNumber: '01719556677', address: { line1: '13c/2c (Ground Floor), Block - B', line2: 'Babar Road', thana: 'Mohammadpur', district: 'Dhaka', postCode: '1020' }, role: [{ roleName: 'Salesperson' }] },
  { id: 5, username: 'ali', name: 'Mohammad Ali', gender: 'Male', customerId: '01719887755', contactNumber: '01719887755', address: { line1: '205/5, Fakirapool', line2: '', thana: 'motijheel', district: 'Dhaka', postCode: '1433' }, role: [{ roleName: 'Salesperson' }] },
  { id: 6, username: 'rono', name: 'Rono Shikder', gender: 'Male', customerId: '01719226677', contactNumber: '01719226677', address: { line1: '30 Avenue ', line2: 'Hossain Market', thana: 'Badda', district: 'Dhaka', postCode: '1333' }, role: [{ roleName: 'Salesperson' }] },
]

export const mfs = [
  { key: 'bKash', value: 'bKash', text: 'bKash' },
  { key: 'Rocket', value: 'Rocket', text: 'Rocket' },
  { key: 'Nagad', value: 'Nagad', text: 'Nagad' },
  { key: 'Upay', value: 'Upay', text: 'Upay' },
  { key: 'SureCash', value: 'SureCash', text: 'SureCash' },
]

export const supplier = [
  { key: 'Squae Food & Beverages', value: 'Squae Food & Beverages', text: 'Squae Food & Beverages' },
  { key: 'Pran Agro Ltd.', value: 'Pran Agro Ltd.', text: 'Pran Agro Ltd.' },
  { key: 'Sheba Consumer Services', value: 'Sheba Consumer Services', text: 'Sheba Consumer Services' },
  { key: 'Aloka Trading', value: 'Aloka Trading', text: 'Aloka Trading' },
]