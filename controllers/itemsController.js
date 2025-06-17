let items = [ ];

const getItems = (req, res) => {
  res.json(items);
};

const createItem = (req, res) => {
  const createItem = req.body;
  items.push(createItem);
  res.status(201).json(createItem);
};

module.exports = {
  getItems,
  createItem
};
