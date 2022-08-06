const Membership = require("../models/membership.model");


exports.addMembership = (req, res) => {
    const { name, description, monthlyCost, numberOfClients } = req.body;
  
    const membership = new Membership(
        name.trim(),
        description.trim(),
        monthlyCost,
        numberOfClients
    );
    

    Membership.createMembership(membership, (err, data) => {
      if (err) {
        res.status(500).send({
          status: "error",
          message: err.message,
        });
      } else {
        res.status(201).send({
            status: "success",
            message: "Membership added successfully",
          });
      }
    });
  };

  exports.getMembership = (req, res) => {
    const { ID } = req.body;
   
    Membership.getMembershipById(ID, (err, data) => {
      res.status(201).send({
                status: "success",
                data: data,
              });
    });
  }

  exports.getMemberships = (req, res) => {
   
    Membership.getMemberships((err, data) => {
      res.status(201).send({
                status: "success",
                data: data,
              });
    });
  }