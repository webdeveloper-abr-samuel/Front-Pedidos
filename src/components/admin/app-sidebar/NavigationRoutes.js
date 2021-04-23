export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [{
    name: 'dashboard',
    displayName: 'Estadísticas',
    meta: {
      iconClass: 'vuestic-iconset vuestic-iconset-statistics',
    },
  },
  {
    name: 'pedidos',
    displayName: 'Pedidos',
    meta: {
      iconClass: 'vuestic-iconset vuestic-iconset-tables',
    },
    children: [{
      name: 'pedidos',
      displayName: 'Todos',
    },
    {
      name: 'proceso',
      displayName: 'Proceso',
    },
    {
      name: 'despachado',
      displayName: 'Despachados',
    },
    {
      name: 'nodespachado',
      displayName: 'No Despachados',
    },
    ],
  },
  ],
}
