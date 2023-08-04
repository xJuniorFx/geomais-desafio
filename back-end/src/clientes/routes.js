const { Router } = require("express");
const controler = require("./controler");

const router = Router();

router.get("/", controler.getClients);
router.post("/", controler.addClient);
router.delete("/:id", controler.deleteClient);
router.patch("/:id", controler.updateClientHandler);
router.get("/:id", controler.getClientById);

module.exports = router;
