var models = require("../models");
var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");

// Guide List
router.get("/allGuide", async function (req, res) {
  var allGuide = await models.Guide.findAll({});
  res.json(allGuide);
});

// User list
router.get("/allUsers", async function (req, res) {
  var allUsers = await models.User.findAll({});
  res.json(allUsers);
});

// Guide add
router.post("/addUser/:id", async function (req, res) {
  const { id } = req.params;
  const { firstName, lastName, company, phone } = req.body;
  var addUser = await models.User.findOne({ id: id });
  models.Guide.create({
    userId: addUser.id,
    firstName: firstName,
    lastName: lastName,
    company: company,
    phone: phone,
  })
    .then((guide) => res.status(201).send(guide))
    .catch((err) => {
      console.log("err", err);
      res.status(400).send(err);
    });
});

// Guide Update
router.put("/updateUser/:id", async function (req, res) {
  const { id } = req.params;
  const { company, phone } = req.body;

  let profileBody = {
    company: company,
    phone: phone,
  };

  await models.Guide.update(profileBody, {
    where: {
      id: id,
    },
  })
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      console.log("err", err);
      res.status(400).send(err);
    });
});

// Guide Delete
router.delete("/deleteUser/:id", function (req, res) {
  const { id } = req.params;
  models.Guide.destroy({
    where: {
      id: id,
    },
  }).then(
    function (rowDeleted) {
      if (rowDeleted === 1) {
        res.status(200).send({ message: "Deleted successfully" });
      }
    },
    function (err) {
      console.log(err);
      res.status(400).send(err);
    }
  );
});

// Guide Search
router.get("/userSearch", async function (req, res) {
  const { firstName, lastName, company, phone } = req.body;
  await models.Guide.findAll({
    where: {
      [Op.or]: [
        {
          firstName: {
            [Op.like]: `%${firstName}%`,
          },
          lastName: {
            [Op.like]: `%${lastName}%`,
          },
          company: {
            [Op.like]: `%${company}%`,
          },
          phone: {
            [Op.like]: `%${phone}%`,
          },
        },
      ],
    },
  })
    .then((findUser) => res.status(200).send(findUser))
    .catch((err) => {
      console.log("err", err);
      res.status(400).send(err);
    });
});

module.exports = router;
