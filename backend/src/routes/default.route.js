import { Router } from "express";

const routerDefault = Router();

routerDefault.get("/", (req, res) => {
  res.json({
    massage: "EtherNova - NFTs Marketplace backend server working !",
  });
});

export { routerDefault };
