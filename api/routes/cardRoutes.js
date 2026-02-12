const express = require("express");
const router = express.Router();
let tarotCards = require("../tarotCards");


// Define the '/cards' endpoint to retrieve all cards
router.get("/", (req, res) => {
  res.json(tarotCards);
});

/*
router.get("/onecard", (req, res) => {
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  const randomCard = tarotCards[randomIndex];
  res.json(randomCard);
}); */

router.get("/shuffle", (req, res) => {
  const shuffledCards = [...tarotCards]; 
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  res.json(shuffledCards || { message: "Deck will be shuffled here." });
  tarotCards = shuffledCards; // Update the original deck to the shuffled version
});

router.get("/cut", (req, res) => {
  const cutIndex = Math.floor(Math.random() * tarotCards.length);
  const cutDeck = [...tarotCards.slice(cutIndex), ...tarotCards.slice(0, cutIndex)];
  res.json(cutDeck || { message: "Deck will be cut here." });
  tarotCards = cutDeck; // Update the original deck to the cut version
});

router.get("/spread", (req, res) => {
  const type = req.query.type || "onecard";
  console.log("Spread type requested:", type);
  switch(type){
    case "onecard":
      const randomIndex = Math.floor(Math.random() * tarotCards.length);
      const randomCard = tarotCards[randomIndex];
      return res.json(randomCard);
      break;

    case "celtic_cross" :
        const spread = [...tarotCards.slice(0, 10)];
        //console.log(spread.length  +" cards drawn");
        res.json( spread || { message: "Celtic Cross spread will be implemented here." });  
        break;
    case "threecard" :
        const threeCardSpread = [...tarotCards.slice(0, 3)];
        res.json(threeCardSpread || { message: "Three Card spread will be implemented here." });
        break;
    case "relationship" :
        const relationshipSpread = [...tarotCards.slice(0, 3)];
        res.json(relationshipSpread || { message: "Relationship spread will be implemented here." });
        break;
    case "career" :
        const careerSpread = [...tarotCards.slice(0, 5)];
        res.json(careerSpread || { message: "Career spread will be implemented here." });
        break;
  default :
    return res.status(400).json({ message: "Invalid spread type. Please select a valid card spread." });
  }
});

// Define the '/cards/:id' endpoint to retrieve a card by its ID
router.get("/:id", (req, res) => {
  const cardId = parseInt(req.params.id, 10);
  const card = tarotCards.find((c) => c.id === cardId);
  res.json(card || { message: "Card not found" });
});

module.exports = router;
