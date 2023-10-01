// sk_test_51M8pJEJgWPjDbO5a4hPHnsvU2Vzxl380nHVqoXBTOJZ3fy6gKXtRODf35txO8NnlnQTD78apWpIwlcvs6hB5IFzJ00zT0Xt4aP
const coffee_price_obj = {
  americano: "price_1NvvK7JgWPjDbO5aHn921ONz",
  espresso: "price_1NvvLLJgWPjDbO5aVVr51FBS",
  doppio: "price_1NvvREJgWPjDbO5a6XtmyPau",
  cortado: "price_1NvvSKJgWPjDbO5aTqDtCirn",
  black: "price_1NvvSzJgWPjDbO5anMGnneWL",
  latte: "price_1NvvTZJgWPjDbO5a7WBe9VLc",
  lungo: "price_1NvvU8JgWPjDbO5aqbD9gFGz",
  macchiato: "price_1NvvUnJgWPjDbO5a4JC6gdPR",
  mocha: "price_1NvvVPJgWPjDbO5avyZOnEtR",
  ristretto: "price_1NvvW8JgWPjDbO5aA6kBmbUT",
  flat_white: "price_1NvvWdJgWPjDbO5a8dof0JM7",
  affogato: "price_1NvvXIJgWPjDbO5aJrM7xpUL",
  cafeaulait: "price_1NvvZ1JgWPjDbO5a0xQQZ52Z",
  irish: "price_1NvvZeJgWPjDbO5ab8w6o3wv",
  guayoyo: "price_1NvvaRJgWPjDbO5aafalGVhB",
  cortadito: "price_1NvvbCJgWPjDbO5aii4wDhiz",
  aguapanelacoffee: "price_1NvvbsJgWPjDbO5anNX55Kwl",
  cappuccino: "price_1NvvcfJgWPjDbO5aWGF9CmQB",
  cupojoe: "price_1NvvdLJgWPjDbO5avOSgM7Su",
  redeye: "price_1NvvdmJgWPjDbO5aiVhsL46S",
  galao: "price_1NvveIJgWPjDbO5a1fNdMJYr",
};

const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51M8pJEJgWPjDbO5a4hPHnsvU2Vzxl380nHVqoXBTOJZ3fy6gKXtRODf35txO8NnlnQTD78apWpIwlcvs6hB5IFzJ00zT0Xt4aP"
);

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  /*
    req.body.items
    [
      {
        id: 1,
        quantity: 3
      }
    ]

    stripe wants
    [
      {
        price: 1,
        quantity: 3
      }
    ]

  */
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(JSON.stringify({ url: session.url }));
});

app.listen(4000, () => console.log("listening on port 4000"));
