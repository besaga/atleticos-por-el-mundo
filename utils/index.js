const mongoose = require("mongoose")

module.exports= {
    isADMIN: (user) => user.role === "ADMIN",
    isOwner: (user, pena) => user._id == pena.owner?.id
}
