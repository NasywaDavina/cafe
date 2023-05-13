const express = require(`express`);
const app = express();

// load a controller of meja
const menuController = require(`../controllers/menu-controller`);

// route to add new meja
app.post(`/menu`, menuController.addMenu);

// route for get all menu
app.get(`/menu`, menuController.getMenu);

// route to add new meja
app.post(`/menu/find`, menuController.findMenu);

// create route for update menu
app.put(`/menu/:id_menu`, menuController.updateMenu)

// create route for delete menu
app.delete(`/menu/:id_menu`, menuController.deleteMenu)

// export app object
module.exports = app
