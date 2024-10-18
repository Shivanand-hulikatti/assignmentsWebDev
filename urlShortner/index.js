const express = require("express");
const connect = require("./connect");
const app = express();

const urlRoutes = require("./routes/url");
const URL = require("./models/url");

const PORT = process.env.PORT || 3000;
connect(
  "mongodb+srv://shivanand:n7qhbmhrN3We30MF@testingshiva.0mtre41.mongodb.net/UrlShortner"
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url", urlRoutes);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const url = await URL.findOneAndUpdate(
    {
      shortUrl: shortId,
    },
    {
      $push: {
        visitedHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  if (url) {
    res.redirect(url.redirectUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
