const express = require("express");
const connect = require("./connect");
const path = require("path");
const app = express();

const urlRoutes = require("./routes/url");
const URL = require("./models/url");

const PORT = process.env.PORT || 3000;
connect(
  "mongodb+srv://shivanand:n7qhbmhrN3We30MF@testingshiva.0mtre41.mongodb.net/UrlShortner"
);

app.set("view engine", "ejs");
app.set("views", path.resolve('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.render('home');
});

app.use("/url", urlRoutes);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
      const entry = await URL.findOneAndUpdate(
        { shortUrl: shortId },
        {
          $push: {
            vistedHistory: {
              timeStamp: Date.now(),
            },
          },
        }
      );
  
      if (!entry) {
        return res.status(404).send("URL not found");
      }
  
      if (!entry.redirectUrl) {
        console.error("No redirectUrl found in the entry:", entry);
        return res.status(500).send("Redirect URL not found");
      }
  
      console.log("Redirecting to:", entry.redirectUrl);
      res.redirect(entry.redirectUrl);
    } catch (error) {
      console.error("Error finding and updating URL:", error);
      res.status(500).send("Internal Server Error");
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
