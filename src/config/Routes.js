export const Routes = [
  { title: 'Sale',                              icon: 'shopping_basket',                path: '/home/dashboard' },
  {
    title: 'Products',                          icon: 'category',                       path: '/home/products',             children: [
      { title: 'Product List',                  icon: 'grid_view',                      path: '/home/products/list' },
      { title: 'Add Product',                   icon: 'add',                            path: '/home/products/add' },
      { title: 'Import Product',                icon: 'import_export',                  path: '/home/products/import' },
      { title: 'Categories',                    icon: 'list_alt',                       path: '/home/products/categories' },
      { title: 'Units',                         icon: 'bubble_chart',                   path: '/home/products/units' },
      { title: 'Brands',                        icon: 'branding_watermark',             path: '/home/products/brands' },
      { title: 'Variants',                      icon: 'hdr_strong',                     path: '/home/products/variants' },
      { title: 'Print Barcode',                 icon: 'qr_code',                        path: '/home/products/barcodes' },
      { title: 'Qty Adjustment',                icon: 'auto_fix_high',                  path: '/home/products/quantity' },
    ] 
  },
  {
    title: 'History',                           icon: 'shop',                           path: '/home/sale',               children: [
      { title: 'List Sales',                    icon: '',                               path: '/home/sale/list' },
      { title: 'POS Sales',                     icon: '',                               path: '/home/sale/list' },
      { title: 'Add Sale',                      icon: '',                               path: '/home/sale/list' },
      { title: 'Import Sale',                   icon: '',                               path: '/home/sale/list' },
      { title: 'Deliveries',                    icon: '',                               path: '/home/sale/list' },
      { title: 'Gift Cards',                    icon: '',                               path: '/home/sale/list' },
    ] 
  },
  { title: 'Purchases',                         icon: 'receipt',                        path: '/home/purchases',          children: [
    { title: 'Purchase Records',                icon: 'history',                        path: '/home/purchases/list' },
    { title: 'New Purchase',                    icon: 'add',                            path: '/home/purchases/add' },
  ]  },
  { title: 'Returns',                           icon: 'redo',                           path: '/home/returns' },
  {
    title: 'People',                            icon: 'people_alt',                     path: '/home/people',             children: [
      { title: 'Users',                         icon: 'admin_panel_settings',           path: '/home/people/list-users' },
      { title: 'Add User',                      icon: 'add',                            path: '/home/people/add-users' },
      { title: 'Customers',                     icon: 'people',                         path: '/home/people/list-customers' },
      { title: 'Add Customer',                  icon: 'person_add',                     path: '/home/people/add-customers' },
      { title: 'Suppliers ',                    icon: 'transfer_within_a_station',      path: '/home/people/list-suppliers' },
      { title: 'Add Supplier',                  icon: 'add',                            path: '/home/people/add-suppliers' },
    ] 
  },
  { title: 'Reports',                           icon: 'pie_chart',                      path: '/home/reports',            children: [
      { title: 'Monthly Report',                icon: 'calendar_today',                 path: '/home/reports/monthly' },
      { title: 'Sales Report',                  icon: 'calendar_today',                 path: '/home/reports/sales' },
    ]
  },
  { title: 'Settings',                          icon: 'settings',                       path: '/home/settings' },
]