const userModels = require("../models/user.models");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await userModels.find().select("-password");
  res.status(200).send(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown " + req.params.id);

  userModels
    .findById(req.params.id, (err, docs) => {
      if (!err) res.status(200).send(docs);
      else console.log("id unknown: +" + err);
    })
    .select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown " + req.params.id);

  try {
    userModels.findOneAndUpdate(
      { _id: req.params.id },

      {
        $set: {
          bio: req.body.bio,
          pseudo: req.body.pseudo,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown " + req.params.id);

  try {
    await userModels.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "susseccefuly deleted" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports.follow = (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  ) {
    return res
      .status(400)
      .send(
        "this ID " +
          req.body.idToFollow +
          " from body is unknown or this from : " +
          req.params.id
      );
  } else {
    userModels.findByIdAndUpdate(
        req.params.id,
      {
        $addToSet: { following: req.body.idToFollow },
      },
      { new: true },
      (err, result) => {
        if (err) {
          return res.status(422).send(err);
        } else {
          userModels.findByIdAndUpdate(
            req.body.idToFollow,
              {
                $addToSet: { followers:   req.params.id},
              },
              { new: true }
            )
            .then((result) => {
              res.status(200).json(result);
            })
            .catch((err) => {
              return res.status(500).send(err);
            });
        }
      }
    );
  }
};




module.exports.unfollow = (req, res) => {
    if (
      !ObjectId.isValid(req.params.id) ||
      !ObjectId.isValid(req.body.idToUnFollow)
    ) {
      return res
        .status(400)
        .send(
          "this ID " +
            req.body.idToFollow +
            " from body is unknown or this from : " +
            req.params.id
        );
    } else {
           userModels.findByIdAndUpdate(
          req.params.id,
        {
          $pull: { following: req.body.idToUnFollow},
        },
        { new: true },
        (err, result) => {
          if (err) {
            return res.status(400).send(err.message);
          } else {
            userModels.findByIdAndUpdate(
              req.body.idToUnFollow,
                {
                  $pull: { followers:   req.params.id},
                },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                return res.status(500).send(err);
              });
          }
        }
      );
    }
  };